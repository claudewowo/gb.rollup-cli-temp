/* @license 2018-11-02 16:29:28 */

(function () {
	'use strict';

	/*
	 * classList.js: Cross-browser full element.classList implementation.
	 * 1.1.20150312
	 *
	 * By Eli Grey, http://eligrey.com
	 * License: Dedicated to the public domain.
	 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
	 */

	/*global self, document, DOMException */

	/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */
	if ("document" in self) {
	  // Full polyfill for browsers with no classList support
	  // Including IE < Edge missing SVGElement.classList
	  if (!("classList" in document.createElement("_")) || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) {
	    (function (view) {

	      if (!('Element' in view)) return;

	      var classListProp = "classList",
	          protoProp = "prototype",
	          elemCtrProto = view.Element[protoProp],
	          objCtr = Object,
	          strTrim = String[protoProp].trim || function () {
	        return this.replace(/^\s+|\s+$/g, "");
	      },
	          arrIndexOf = Array[protoProp].indexOf || function (item) {
	        var i = 0,
	            len = this.length;

	        for (; i < len; i++) {
	          if (i in this && this[i] === item) {
	            return i;
	          }
	        }

	        return -1;
	      } // Vendors: please allow content code to instantiate DOMExceptions
	      ,
	          DOMEx = function (type, message) {
	        this.name = type;
	        this.code = DOMException[type];
	        this.message = message;
	      },
	          checkTokenAndGetIndex = function (classList, token) {
	        if (token === "") {
	          throw new DOMEx("SYNTAX_ERR", "An invalid or illegal string was specified");
	        }

	        if (/\s/.test(token)) {
	          throw new DOMEx("INVALID_CHARACTER_ERR", "String contains an invalid character");
	        }

	        return arrIndexOf.call(classList, token);
	      },
	          ClassList = function (elem) {
	        var trimmedClasses = strTrim.call(elem.getAttribute("class") || ""),
	            classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [],
	            i = 0,
	            len = classes.length;

	        for (; i < len; i++) {
	          this.push(classes[i]);
	        }

	        this._updateClassName = function () {
	          elem.setAttribute("class", this.toString());
	        };
	      },
	          classListProto = ClassList[protoProp] = [],
	          classListGetter = function () {
	        return new ClassList(this);
	      }; // Most DOMException implementations don't allow calling DOMException's toString()
	      // on non-DOMExceptions. Error's toString() is sufficient here.


	      DOMEx[protoProp] = Error[protoProp];

	      classListProto.item = function (i) {
	        return this[i] || null;
	      };

	      classListProto.contains = function (token) {
	        token += "";
	        return checkTokenAndGetIndex(this, token) !== -1;
	      };

	      classListProto.add = function () {
	        var tokens = arguments,
	            i = 0,
	            l = tokens.length,
	            token,
	            updated = false;

	        do {
	          token = tokens[i] + "";

	          if (checkTokenAndGetIndex(this, token) === -1) {
	            this.push(token);
	            updated = true;
	          }
	        } while (++i < l);

	        if (updated) {
	          this._updateClassName();
	        }
	      };

	      classListProto.remove = function () {
	        var tokens = arguments,
	            i = 0,
	            l = tokens.length,
	            token,
	            updated = false,
	            index;

	        do {
	          token = tokens[i] + "";
	          index = checkTokenAndGetIndex(this, token);

	          while (index !== -1) {
	            this.splice(index, 1);
	            updated = true;
	            index = checkTokenAndGetIndex(this, token);
	          }
	        } while (++i < l);

	        if (updated) {
	          this._updateClassName();
	        }
	      };

	      classListProto.toggle = function (token, force) {
	        token += "";
	        var result = this.contains(token),
	            method = result ? force !== true && "remove" : force !== false && "add";

	        if (method) {
	          this[method](token);
	        }

	        if (force === true || force === false) {
	          return force;
	        } else {
	          return !result;
	        }
	      };

	      classListProto.toString = function () {
	        return this.join(" ");
	      };

	      if (objCtr.defineProperty) {
	        var classListPropDesc = {
	          get: classListGetter,
	          enumerable: true,
	          configurable: true
	        };

	        try {
	          objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	        } catch (ex) {
	          // IE 8 doesn't support enumerable:true
	          if (ex.number === -0x7FF5EC54) {
	            classListPropDesc.enumerable = false;
	            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	          }
	        }
	      } else if (objCtr[protoProp].__defineGetter__) {
	        elemCtrProto.__defineGetter__(classListProp, classListGetter);
	      }
	    })(self);
	  } else {
	    // There is full or partial native classList support, so just check if we need
	    // to normalize the add/remove and toggle APIs.
	    (function () {

	      var testElement = document.createElement("_");
	      testElement.classList.add("c1", "c2"); // Polyfill for IE 10/11 and Firefox <26, where classList.add and
	      // classList.remove exist but support only one argument at a time.

	      if (!testElement.classList.contains("c2")) {
	        var createMethod = function (method) {
	          var original = DOMTokenList.prototype[method];

	          DOMTokenList.prototype[method] = function (token) {
	            var i,
	                len = arguments.length;

	            for (i = 0; i < len; i++) {
	              token = arguments[i];
	              original.call(this, token);
	            }
	          };
	        };

	        createMethod('add');
	        createMethod('remove');
	      }

	      testElement.classList.toggle("c3", false); // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
	      // support the second argument.

	      if (testElement.classList.contains("c3")) {
	        var _toggle = DOMTokenList.prototype.toggle;

	        DOMTokenList.prototype.toggle = function (token, force) {
	          if (1 in arguments && !this.contains(token) === !force) {
	            return force;
	          } else {
	            return _toggle.call(this, token);
	          }
	        };
	      }

	      testElement = null;
	    })();
	  }
	}

	/**
	 * Created by Liu.Jun on 2018/8/16.
	 */
	// import 'core-js/modules/es7.reflect.delete-metadata';
	// import 'core-js/modules/es7.reflect.get-metadata';
	// import 'core-js/modules/es7.reflect.get-metadata-keys';
	// import 'core-js/modules/es7.reflect.get-own-metadata';
	// import 'core-js/modules/es7.reflect.get-own-metadata-keys';
	// import 'core-js/modules/es7.reflect.has-metadata';
	// import 'core-js/modules/es7.reflect.has-own-metadata';
	// import 'core-js/modules/es7.reflect.metadata';
	// import 'core-js/modules/es7.asap';
	// import 'core-js/modules/es7.observable';
	// import 'core-js/modules/web.timers';
	// import 'core-js/modules/web.immediate';
	// import 'core-js/modules/web.dom.iterable';

	/* eslint-disable */

	if (global.$babelPolyfill) {
	  throw new Error('only one instance of babel-polyfill is allowed');
	}

	global.$babelPolyfill = true; // 定义api

	var DEFINE_PROPERTY = 'defineProperty';

	function define(O, key, value) {
	  if (!O[key]) {
	    Object[DEFINE_PROPERTY](O, key, {
	      writable: true,
	      configurable: true,
	      value: value
	    });
	  }
	} //
	// define(String.prototype, 'padLeft', ''.padStart);
	// define(String.prototype, 'padRight', ''.padEnd);


	"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
	  [][key] && define(Array, key, Function.call.bind([][key]));
	});

	/* eslint-disable no-extend-native */
	if (window.Element) {
	  if (!Element.prototype.matches) {
	    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
	  }

	  if (!Element.prototype.closest) {
	    Element.prototype.closest = function (s) {
	      // eslint-disable-line
	      var el = this;
	      if (!document.documentElement.contains(el)) return null;

	      do {
	        if (el.matches(s)) return el;
	        el = el.parentElement;
	      } while (el !== null);

	      return null;
	    };
	  }
	} // Begin dataset code


	if (!document.documentElement.dataset && ( // FF is empty while IE gives empty object
	!Object.getOwnPropertyDescriptor(Element.prototype, 'dataset') || !Object.getOwnPropertyDescriptor(Element.prototype, 'dataset').get)) {
	  var propDescriptor = {
	    get: function get() {

	      var hTML5DOMStringMap = {};
	      var attrVal;
	      var attrName;
	      var propName;
	      var attribute;
	      var attributes = this.attributes;
	      var attsLength = attributes.length;

	      var toUpperCase = function toUpperCase(n0) {
	        return n0.charAt(1).toUpperCase();
	      };

	      for (var i = 0; i < attsLength; i += 1) {
	        attribute = attributes[i]; // Fix: This test really should allow any XML Name without
	        //         colons (and non-uppercase for XHTML)

	        if (attribute && attribute.name && /^data-\w[\w-]*$/.test(attribute.name)) {
	          attrVal = attribute.value;
	          attrName = attribute.name; // Change to CamelCase

	          propName = attrName.substr(5).replace(/-./g, toUpperCase);
	          hTML5DOMStringMap[propName] = attrVal;
	        }
	      }

	      return hTML5DOMStringMap;
	    }
	  };
	  Object.defineProperty(Element.prototype, 'dataset', propDescriptor);
	} // Overwrites native 'children' prototype.
	// Adds Document & DocumentFragment support for IE9 & Safari.
	// Returns array instead of HTMLCollection.


	(function (constructor) {
	  if (constructor && constructor.prototype && constructor.prototype.children == null) {
	    Object.defineProperty(constructor.prototype, 'children', {
	      get: function get() {
	        return this.childNodes.filter(function (node) {
	          return node.nodeType === 1;
	        });
	      }
	    });
	  }
	})(window.Node || window.Element);

	/* eslint-disable no-extend-native */
	// polyfill 重复
	// if (typeof Array.prototype.forEach !== 'function') {
	//     Array.prototype.forEach = (fn, context) => {
	//         for (let k = 0, { length } = this; k < length; k += 1) {
	//             if (typeof fn === 'function' && Object.prototype.hasOwnProperty.call(this, k)) {
	//                 fn.call(context, this[k], k, this);
	//             }
	//         }
	//     };
	// }
	//
	// if (typeof Array.prototype.map !== 'function') {
	//     Array.prototype.map = (fn, context) => {
	//         const arr = [];
	//         if (typeof fn === 'function') {
	//             for (let k = 0, { length } = this; k < length; k += 1) {
	//                 arr.push(fn.call(context, this[k], k, this));
	//             }
	//         }
	//         return arr;
	//     };
	// }
	// if (typeof Array.prototype.filter !== 'function') {
	//     Array.prototype.filter = (fn, context) => {
	//         const arr = [];
	//         if (typeof fn === 'function') {
	//             for (let k = 0, { length } = this; k < length; k += 1) {
	//                 if (fn.call(context, this[k], k, this)) {
	//                     arr.push(this[k]);
	//                 }
	//             }
	//         }
	//         return arr;
	//     };
	// }
	// if (typeof Array.prototype.some !== 'function') {
	//     Array.prototype.some = (fn, context) => {
	//         let passed = false;
	//         if (typeof fn === 'function') {
	//             for (let k = 0, { length } = this; k < length; k += 1) {
	//                 if (passed === true) break;
	//                 passed = !!fn.call(context, this[k], k, this);
	//             }
	//         }
	//         return passed;
	//     };
	// }
	// if (typeof Array.prototype.every !== 'function') {
	//     Array.prototype.every = (fn, context) => {
	//         let passed = true;
	//         if (typeof fn === 'function') {
	//             for (let k = 0, { length } = this; k < length; k += 1) {
	//                 if (passed === false) break;
	//                 passed = !!fn.call(context, this[k], k, this);
	//             }
	//         }
	//         return passed;
	//     };
	// }
	// if (typeof Array.prototype.reduce !== 'function') {
	//     Array.prototype.reduce = (callback, initialValue) => {
	//         let previous = initialValue;
	//         let k = 0;
	//         const { length } = this;
	//         if (typeof initialValue === 'undefined') {
	//             [previous] = this;
	//             k = 1;
	//         }
	//
	//         if (typeof callback === 'function') {
	//             for (k; k < length; k += 1) {
	//                 if (Object.prototype.hasOwnProperty.call(this, k)) {
	//                     previous = callback(previous, this[k], k, this);
	//                 }
	//             }
	//         }
	//         return previous;
	//     };
	// }
	// if (typeof Array.prototype.reduceRight !== 'function') {
	//     Array.prototype.reduceRight = (callback, initialValue) => {
	//         const { length } = this;
	//         let k = length - 1;
	//         let previous = initialValue;
	//         if (typeof initialValue === 'undefined') {
	//             previous = this[length - 1];
	//             k -= 1;
	//         }
	//         if (typeof callback === 'function') {
	//             for (k; k > -1; k -= 1) {
	//                 if (Object.prototype.hasOwnProperty.call(this, k)) {
	//                     previous = callback(previous, this[k], k, this);
	//                 }
	//             }
	//         }
	//         return previous;
	//     };
	// }

	/* IE10等部分浏览器获取window.location.origin为undefined */
	if (!window.location.origin) {
	  var winlocation = window.location;
	  var locationPort = winlocation.port ? ":".concat(winlocation.port) : '';
	  winlocation.origin = "".concat(winlocation.protocol, "//").concat(winlocation.hostname).concat(locationPort);
	}

	/* eslint-disable */
	(function () {
	  var lastTime = 0;
	  var vendors = ['ms', 'moz', 'webkit', 'o'];

	  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
	    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	  }

	  if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
	    var currTime = new Date().getTime();
	    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	    var id = window.setTimeout(function () {
	      callback(currTime + timeToCall);
	    }, timeToCall);
	    lastTime = currTime + timeToCall;
	    return id;
	  };
	  if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
	    clearTimeout(id);
	  };
	})();

}());
//# sourceMappingURL=polyfill.dev.js.map

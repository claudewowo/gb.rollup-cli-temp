(function () {
    'use strict';

    /**
     * Created by Liu.Jun on 2018/8/16.
     */
    // import 'core-js/modules/es7.reflect.define-metadata';
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

    // 避免反复执行
    if (global.$babelPolyfill) {
        throw new Error('only one instance of babel-polyfill is allowed');
    }
    global.$babelPolyfill = true;

    // 定义api
    const DEFINE_PROPERTY = 'defineProperty';
    function define(O, key, value) {
        if (!O[key]) {
            Object[DEFINE_PROPERTY](O, key, {
                writable: true,
                configurable: true,
                value
            });
        }
    }

    //
    // define(String.prototype, 'padLeft', ''.padStart);
    // define(String.prototype, 'padRight', ''.padEnd);

    "pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
        [][key] && define(Array, key, Function.call.bind([][key]));
    });

}());
//# sourceMappingURL=bundle.js.map

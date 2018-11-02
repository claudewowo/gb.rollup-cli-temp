/* eslint-disable no-extend-native */
if (window.Element) {
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }

    if (!Element.prototype.closest) {
        Element.prototype.closest = function(s) { // eslint-disable-line
            let el = this;
            if (!document.documentElement.contains(el)) return null;
            do {
                if (el.matches(s)) return el;
                el = el.parentElement;
            } while (el !== null);
            return null;
        };
    }
}

// Begin dataset code
if (!document.documentElement.dataset &&
    // FF is empty while IE gives empty object
    (!Object.getOwnPropertyDescriptor(Element.prototype, 'dataset') ||
        !Object.getOwnPropertyDescriptor(Element.prototype, 'dataset').get)
) {
    const propDescriptor = {
        get() {
            const hTML5DOMStringMap = {};
            let attrVal;
            let attrName;
            let propName;
            let attribute;
            const { attributes } = this;
            const attsLength = attributes.length;
            const toUpperCase = n0 => n0.charAt(1).toUpperCase();
            const getter = () => this; // eslint-disable-line
            const setter = (attr, value) => { // eslint-disable-line
                let result;
                if (typeof value !== 'undefined') {
                    result = this.setAttribute(attr, value);
                } else {
                    result = this.removeAttribute(attr);
                }
                return result;
            };
            for (let i = 0; i < attsLength; i += 1) {
                attribute = attributes[i];
                // Fix: This test really should allow any XML Name without
                //         colons (and non-uppercase for XHTML)
                if (attribute && attribute.name &&
                    (/^data-\w[\w-]*$/).test(attribute.name)) {
                    attrVal = attribute.value;
                    attrName = attribute.name;
                    // Change to CamelCase
                    propName = attrName.substr(5).replace(/-./g, toUpperCase);
                    hTML5DOMStringMap[propName] = attrVal;
                }
            }
            return hTML5DOMStringMap;
        }
    };
    Object.defineProperty(Element.prototype, 'dataset', propDescriptor);
}

// Overwrites native 'children' prototype.
// Adds Document & DocumentFragment support for IE9 & Safari.
// Returns array instead of HTMLCollection.
((constructor) => {
    if (constructor &&
        constructor.prototype &&
        constructor.prototype.children == null) {
        Object.defineProperty(constructor.prototype, 'children', {
            get() {
                return this.childNodes.filter(node => node.nodeType === 1);
            }
        });
    }
})(window.Node || window.Element);

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
    const winlocation = window.location;
    const locationPort = winlocation.port ? `:${winlocation.port}` : '';
    winlocation.origin = `${winlocation.protocol}//${winlocation.hostname}${locationPort}`;
}

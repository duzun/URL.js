/**
 * Find the global scope.
 */

/*globals globalThis, window, global, self*/
const theScope =
    typeof globalThis !== 'undefined' ? globalThis :
        typeof window !== 'undefined' ? window :
            typeof global !== 'undefined' ? global :
                typeof self !== 'undefined' ? self :
                    Function('return this')() // in sloppy mode only
    ;

export default theScope;

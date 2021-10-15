export function defaultValueOfPrimitive(type) {
    if (typeof type !== 'string') throw new TypeError('Type must be a string.');
    
    // Handle simple types (primitives and plain function/object)
    switch (type) {
        case 'bigint'    : return BigInt(0);
        case 'boolean'   : return false;
        case 'function'  : return function () {};
        case 'null'      : return null;
        case 'number'    : return 0;
        case 'object'    : return {};
        case 'string'    : return "";
        case 'symbol'    : return Symbol();
        case 'undefined' : return void 0;
    }
    
    try {
        // Look for constructor in this or current scope
        var ctor = typeof this[type] === 'function'
                   ? this[type]
                   : eval(type);
        
        return new ctor;
    
    // Constructor not found, return new object
    } catch (e) { return {}; }
}
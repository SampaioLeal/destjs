export function checkObject(object:any) {
    if(Array.isArray(object)) {
        return "<array>";
    }
    else {
        switch(object.toString()) {
            case "[object Object]":
                return "<pObject>";
            
            case "[object Map]":
                return "<mapObject>";
            
            case "[object Set]":
                return "<setObject>";

            default:
                let instance:string = String();
                object instanceof RegExp ? instance = "<regexObject>" : {}
                object instanceof Date ? instance = "<dateObject>" : {}
                object instanceof Function ? instance = "<functionObject>" : {}
                return instance;
        }
    }
}
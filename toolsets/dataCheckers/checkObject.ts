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
                break;
        }
    }

    return null as unknown;
}
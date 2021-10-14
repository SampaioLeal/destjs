export class DestIterators {
    static forEachNotNullOrEmpty(target:any, callback:Function) {
        target.forEach((x) => {
            if(x != null && x != undefined && x != "" && x != 0) {
                callback(x);
            }
        });
    }
}
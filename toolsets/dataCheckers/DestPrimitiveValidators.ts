import { checkObject } from './checkObject';

interface PrimitiveCheckObject {
    objectType: string;
    object: any
}

interface IntegrityInformation {
    targetType: string;
    isUnique: boolean
}

export class DestPrimitiveValidators {
    static types = {
        string: "PrimitiveString",
        boolean: "PrimitiveBoolean",
        number: {
            float: "FloatingNumber",
            int: "IntegerNumber"
        },
        object: {
            array: "ObjectArray",
            primitive: "ObjectObject",
            map: "ObjectMap",
            set: "ObjectSet"
        }
    }
    /*
        check() returns the main type of target, it will determine the main instance
        based on JavaScript primitive types/constructors
    */
    static check(target:any) {
        switch(typeof target) {
            case "string":
                return {
                    objectType: this.types.string,
                    object: target
                } as PrimitiveCheckObject;
            
            case "boolean":
                return {
                    objectType: this.types.boolean,
                    object: target
                } as PrimitiveCheckObject;

            case "number":
                if(this.checkForFloatingNumber(target)) {
                    return {
                        objectType: this.types.number.float,
                        object: target
                    } as PrimitiveCheckObject;
                }
                else if(this.checkForIntegerNumber(target)) {
                    return {
                        objectType: this.types.number.int,
                        object: target
                    } as PrimitiveCheckObject;
                }
                break;

            case "object":
                switch(checkObject(target)) {
                    case "<array>":
                        return {
                            objectType: this.types.object.array,
                            object: target
                        } as PrimitiveCheckObject;
                    
                    case "<pObject>":
                        return {
                            objectType: this.types.object.primitive,
                            object: target
                        } as PrimitiveCheckObject;
                    
                    case "<mapObject>":
                        return {
                            objectType: this.types.object.map,
                            object: target
                        } as PrimitiveCheckObject;
                    
                    case "<setObject>":
                        return {
                            objectType: this.types.object.set,
                            object: target
                        } as PrimitiveCheckObject;
                }
        }
        return {} as PrimitiveCheckObject;
    }

    static checkForFloatingNumber(num:number) {
        return Number(num) === num && num % 1 !== 0;
    }

    static checkForIntegerNumber(num:number) {
        return Number.isInteger(num);
    }

    /*
        Returns if the selected object is healthy (holds only one type of information) and also returns its type.
    */
    static getIterableIntegrity(target:any, primitiveType:string) {
        let integrityFailures:number = 0;
        let lastPrimitiveTypeChecked:string = String();

        switch(this.check(target).objectType) {
            //Integrity checker for arrays
            case this.types.object.array:
                target.forEach((value:any) => {
                    let thisPrimitiveType:string = this.check(value).objectType;
    
                    if(thisPrimitiveType !== primitiveType) {
                        integrityFailures++;
                        lastPrimitiveTypeChecked = thisPrimitiveType;
                    }
                });
                break;
            
            //Integrity checker for primitive default objects
            case this.types.object.primitive:
                Object.entries(target).forEach((value) => {
                    let thisPrimitiveType:string = this.check(value[1]).objectType;
    
                    if(thisPrimitiveType !== primitiveType) {
                        integrityFailures++;
                        lastPrimitiveTypeChecked = thisPrimitiveType;
                    }
                });
                break;
        }

        if(integrityFailures > 0) {
            return {
                targetType: "any",
                isUnique: false
            } as IntegrityInformation;
        }
        else {
            return {
                targetType: lastPrimitiveTypeChecked,
                isUnique: true
            } as IntegrityInformation;
        }

    }
};

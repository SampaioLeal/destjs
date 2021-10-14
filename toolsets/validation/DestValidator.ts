interface ConstraintGroup {
    //Object Constraints
    objectFieldName?: string;
    //String Constraints
    maxLength?: number;
    minLength?: number;
    canHaveSideWhiteSpaces?: boolean;
    canHaveWhiteSpaces?: boolean;
    //Number Constraints
    maxSize?: number;
    minSize?: number;
    isFloating?: boolean;
    isNegative?: boolean;
}

interface ValidationResult {
    objectFieldName?: boolean;
    maxLength?: boolean;
    minLength?: boolean;
    canHaveSideWhiteSpaces?: boolean;
    canHaveWhiteSpaces?: boolean;
    maxSize?: boolean;
    minSize?: boolean;
    isFloating?: boolean;
    isNegative?: boolean;
}

type ValidationTemplate = Array<ConstraintGroup>;

class DestValidator {
    static validate(target: any, template: ValidationTemplate) {
        switch(typeof target) {
            case "string":
                return this.#validateString(target, template);
            
            default:
                return;
        }
    }

    static #validateString(target: string, template: ValidationTemplate) {
        let constraintGroup: ConstraintGroup = template[0] ;
        let allowedConstraints: ValidationResult = {
            "maxLength": false, 
            "minLength": false,
            "canHaveSideWhiteSpaces": true,
            "canHaveWhiteSpaces": true
        };

        Object.keys(constraintGroup).forEach((constraint: string) => {
            if(Object.keys(allowedConstraints).includes(constraint)) {

                switch(constraint) {
                    case "maxLength":
                        if(target.length <= constraintGroup[constraint]!) {
                            allowedConstraints["maxLength"] = true;
                        }
                        break;
                    
                    case "minLength":
                        if(target.length >= constraintGroup[constraint]!) {
                            allowedConstraints["minLength"] = true;
                        }
                        break;

                    case "canHaveSideWhiteSpaces":
                        if(!constraintGroup[constraint]) {
                            if(target[0] === " " && target[target.length - 1] === " ") {
                                allowedConstraints["canHaveSideWhiteSpaces"] = false;
                            }
                        }
                        break;

                    case "canHaveWhiteSpaces":
                        allowedConstraints["canHaveWhiteSpaces"] = true;
                        if(!constraintGroup[constraint]) {
                            if(target.split(" ").length > 1) {
                                allowedConstraints["canHaveWhiteSpaces"] = false;
                            }
                        }
                        break;
                }
            }
        });

        return allowedConstraints;
    }
}

var template: ValidationTemplate = [
    {
        maxLength: 2
    }
];

console.log(DestValidator.validate("ba", template));
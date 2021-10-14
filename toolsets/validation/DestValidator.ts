import { validateString } from "./stringOperations/validateString";

export interface ConstraintGroup {
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

export interface ValidationResult {
    //Validation Data
    //-- Object
    objectFieldName?: boolean;
    //--String
    maxLength?: boolean; //trepassMaxLength
    minLength?: boolean; //trepassMinLength
    canHaveSideWhiteSpaces?: boolean; //haveSideWhiteSpaces
    canHaveWhiteSpaces?: boolean; //haveWhiteSpaces
    //--Number
    trepassMaxSize?: boolean;
    trepassMinSize?: boolean;
    isFloating?: boolean;
    isNegative?: boolean;
}

export type ValidationTemplate = Array<ConstraintGroup>;

class DestValidator {
    static validate(target: any, template: ValidationTemplate) {
        switch(typeof target) {
            case "string":
                return validateString(target, template);
            
            default:
                return;
        }
    }
}

var template: ValidationTemplate = [
    {
        maxLength: 2
    }
];

console.log(DestValidator.validate("ba", template));
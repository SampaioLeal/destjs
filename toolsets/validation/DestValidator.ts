import { validateString } from "./methods/validateString";
import { validateBoolean } from "./methods/validateBoolean";

export interface ConstraintGroup {
    //Type Constraints
    primitiveType?: string;
    //Boolean Constraints
    isTrue?: boolean
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
    isInteger?: boolean;
}

export interface ValidationResult {
    //Validation Data
    //-- Primitive
    primitiveType?: boolean; //isTheExceptedPrimitiveType
    //-- Boolean
    isTrue?: boolean; //isTrue
    //--String
    maxLength?: boolean; //trepassMaxLength
    minLength?: boolean; //trepassMinLength
    canHaveSideWhiteSpaces?: boolean; //haveSideWhiteSpaces
    canHaveWhiteSpaces?: boolean; //haveWhiteSpaces
    //--Number
    maxSize?: boolean;
    minSize?: boolean;
    isFloating?: boolean;
    isNegative?: boolean;
    isInteger?: boolean;
}

export type ValidationTemplate = Array<ConstraintGroup>;

class DestValidator {
    static validate(target: any, template: ValidationTemplate) {
        switch(typeof target) {
            case "string":
                return validateString(target, template);

            case "boolean":
                return validateBoolean(target, template);
            
            default:
                return;
        }
    }
}

var template: ValidationTemplate = [
    {
        primitiveType: "string",
        maxLength: 2
    }
];

console.log(DestValidator.validate("ba", template));
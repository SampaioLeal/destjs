import { ConstraintGroup, ValidationTemplate, ValidationResult } from "../DestValidator";

export function validateString(target: string, template: ValidationTemplate) {
    let constraintGroup: ConstraintGroup = template[0];
    let allowedConstraints: ValidationResult = {
        "maxLength": false, 
        "minLength": false,
        "canHaveSideWhiteSpaces": false,
        "canHaveWhiteSpaces": false
    };

    Object.keys(constraintGroup).forEach((constraint: string) => {
        if(Object.keys(allowedConstraints).includes(constraint)) {
            switch(constraint) {
                case "maxLength":
                    if(target.length > constraintGroup[constraint]!) {
                        allowedConstraints["maxLength"] = true;
                    }
                    break;
                
                case "minLength":
                    if(target.length < constraintGroup[constraint]!) {
                        allowedConstraints["minLength"] = true;
                    }
                    break;

                case "canHaveSideWhiteSpaces":
                    if(!constraintGroup[constraint]!) {
                        if(target[0] === " " || target[target.length - 1] === " ") {
                            allowedConstraints["canHaveSideWhiteSpaces"] = true;
                        }
                    }
                    break;

                case "canHaveWhiteSpaces":
                    if(!constraintGroup[constraint]!) {
                        if(target.indexOf(" ") != -1) {
                            allowedConstraints["canHaveWhiteSpaces"] = true;
                        }
                    }
                    break;
            }
        }
    });

    return allowedConstraints;
}
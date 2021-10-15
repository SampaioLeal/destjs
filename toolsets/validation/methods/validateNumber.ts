import { ConstraintGroup, ValidationTemplate, ValidationResult } from "../DestValidator";

export function validateNumber(target: number, template: ValidationTemplate) {
    let constraintGroup: ConstraintGroup = template[0];
    let allowedConstraints: ValidationResult = {
        "maxSize": false,
        "minSize": false,
        "isFloating": false,
        "isNegative": false,
        "isInteger": false
    };

    Object.keys(constraintGroup).forEach((constraint: string) => {
        if(Object.keys(allowedConstraints).includes(constraint)) {
            switch(constraint) {
                case "maxSize":
                    if(target > constraintGroup["maxSize"]!) {
                        allowedConstraints["maxSize"] = true;
                    }
                    break;

                case "minSize":
                    if(target < constraintGroup["minSize"]!) {
                        allowedConstraints["minSize"] = true;
                    }
                    break;

                case "isFloating":
                    if(Number(target) === target && target % 1 !== 0) {
                        allowedConstraints["isFloating"] = true;
                    }
                    break;

                case "isInteger":
                    if(Number(target) === target && target % 1 === 0) {
                        allowedConstraints["isInteger"] = true;
                    }
                    break;
            }
        }
    });

    return allowedConstraints;
}
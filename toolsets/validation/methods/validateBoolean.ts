import { ConstraintGroup, ValidationTemplate, ValidationResult } from "../DestValidator";

export function validateBoolean(target: boolean, template: ValidationTemplate) {
    let constraintGroup: ConstraintGroup = template[0];
    let allowedConstraints: ValidationResult = {
        "isTrue": false
    };

    if(target) allowedConstraints["isTrue"] = true;

    return allowedConstraints;
}
import { DestPrimitiveValidators } from "../dataCheckers/DestPrimitiveValidators";
import { DestIterators } from "../validators/DestIterators";
import { ExceptionDictionary } from "../dictionaries/ExceptionDictionary";

export interface DataConstraints {
    fieldName: string;
    maxLength?: number;
    minLength?: number;
    primitiveType?: string;
}

export type DataTemplate = Array<DataConstraints>;

/* Tests */
var test:object = {
    a: 1,
    b: 2
}

var testTemplate:DataTemplate = 
[
    {
        fieldName: "a",
        maxLength: 2,
        minLength: 3,
        primitiveType: "ObjectObject"
    },
    {
        fieldName: "b",
        maxLength: 2,
        minLength: 3,
        primitiveType: "ObjectObject"
    }
];

/* End Tests */

export class DestValidator {
    static validateObject(target:object, template:DataTemplate) {
        let failureLevel: number = 0;
        let problems: Array<string> = [];

        template.forEach((constraint:DataConstraints) => {
            if(Object(target).hasOwnProperty(constraint.fieldName)) {

            }
            else {
                failureLevel++;
                problems.push(ExceptionDictionary(constraint.fieldName).FieldNotMatch);
            }
        });
    }

    static constraintTest(target:object, constraints:DataConstraints) {
        let constraintKeys: Array<string> = Object.keys(constraints);
        let validationStatus:object = {
            
        };
        DestIterators.forEachNotNullOrEmpty(constraintKeys, (x) => {

        });
    }
}
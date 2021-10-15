// deno-lint-ignore-file no-explicit-any
import { DestValidator, ValidationTemplate } from "../DestValidator";
import { ExceptionDictionary } from "../../dictionaries/ExceptionDictionary";
import { defaultValueOfPrimitive } from "../methods/defaultOfPrimitive";

export function DestSerialize(plain: Record<string, unknown>, className: string, template: ValidationTemplate) {
    //TODO: Add custom return messages to each validation error/failure
    if(!DestValidator.validate(plain, template)) return ExceptionDictionary().GenericSerializationFailure;

    (this as any)[className] = () => {};

    Object.entries(plain).forEach((record) => {
        (this as any)[className].prototype[record[0]] = defaultValueOfPrimitive(typeof record[1]);
    });

    let instance = eval("new " + className + "()");

    Object.entries(plain).forEach((record) => {
        instance[record[0]] = record[1];
    });

    return instance;
}

var PersonTemplate: ValidationTemplate = [
    {
        fieldName: "Nome",
        primitiveType: "string",
        minLength: 2,
        maxLength: 20
    },
    {
        fieldName: "Sobrenome",
        primitiveType: "string",
        minLength: 2,
        maxLength: 20
    },
    {
        fieldName: "Idade",
        primitiveType: "number",
        minSize: 18
    }
];
  
DestSerialize({ firstName: "Sampaio", lastName: "Leal", age: 19 }, "Person", PersonTemplate);
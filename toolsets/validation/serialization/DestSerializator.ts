// deno-lint-ignore-file no-explicit-any
import { DestValidator, ValidationTemplate } from "../DestValidator";
import { ExceptionDictionary } from "../../dictionaries/ExceptionDictionary";

export function DestSerialize(plain: Record<string, unknown>, target: new () => any, template: ValidationTemplate) {
    //TODO: Add custom return messages to each validation error/failure
    if(!DestValidator.validate(plain, template)) return ExceptionDictionary().GenericSerializationFailure;

    const instance = new target();

    const properties = Object.getOwnPropertyNames(instance);
    const methods = Reflect.ownKeys(target.prototype);
  
    methods.shift();
  
    properties.forEach((prop) => {
        instance[prop] = plain[prop];
    });

    if (Array.isArray(methods)) {
        methods.forEach((method) => {
        instance[method] = instance[method]();
        });
    }
  
    return instance;
}

export default class Person {
    firstName!: string;
    lastName!: string;
    age!: number;
  
    // Mutations
    fullName() {
      return this.firstName + " " + this.lastName;
    }
}

var PersonTemplate: ValidationTemplate = [
    {
        primitiveType: "string",
        minLength: 2,
        maxLength: 20
    },
    {
        primitiveType: "string",
        minLength: 2,
        maxLength: 20
    },
    {
        primitiveType: "number",
        minSize: 18
    }
];
  
DestSerialize({ firstName: "Sampaio", lastName: "Leal", age: 19 }, Person, PersonTemplate);
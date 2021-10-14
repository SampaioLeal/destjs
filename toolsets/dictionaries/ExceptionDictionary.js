export var ExceptionDictionary = (arg) => {
    return {
        TypeNotMatch: `Type '${arg}' does not match the type specified for the object.`,
        FieldNotMatch: `The field '${arg}' is needed in the object.`
    }
};
export var ExceptionDictionary = (arg) => {
    return {
        GenericSerializationFailure: `The object is not valid to the given template`,
        TypeNotMatch: `Type '${arg}' does not match the type specified for the object.`,
        FieldNotMatch: `The field '${arg}' is needed in the object.`
    }
};
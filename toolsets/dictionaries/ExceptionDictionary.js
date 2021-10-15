export var ExceptionDictionary = (arg1, arg2) => {
    return {
        GenericSerializationFailure: `The object is not valid to the given template`,
        MaxLengthError: `The string '${arg1}' exceeds the length of ${arg2} characters`,
        MinLengthError: `The minimum length required for the string ${arg1} is ${arg2} characters`
    }
};
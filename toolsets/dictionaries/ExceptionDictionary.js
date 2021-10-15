export var ExceptionDictionary = (arg1, arg2) => {
    return {
        GenericSerializationFailure: `The object is not valid to the given template`,
        TypeNotMatch: `The object '${arg1}' dont match with the required ${arg2} type`,

        //String Sanitization/Validation Exceptions
        MaxLengthError: `The string '${arg1}' exceeds the length of ${arg2} characters`,
        MinLengthError: `The minimum length required for the string ${arg1} is ${arg2} characters`,
        HaveSpacesError: `White spaces are not allowed in the string '${arg1}'`,
        HaveSideSpacesError: `Side white spaces are not allowed in the string '${arg1}'`,

        //Number Sanitization/Validation Exceptions
        MaxSizeError: `The number '${arg1}' exceeds the size of ${arg2}`,
    }
};
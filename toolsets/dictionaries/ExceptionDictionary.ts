export var ExceptionDictionary = (arg1: any = "", arg2: any = "") => {
    return {
        GenericSanitizationFailure: `The object is not valid to the given template or the type is unknown`,
        TypeNotMatch: `The object '${arg1}' dont match with the required ${arg2} type`,

        //String Sanitization/Validation Exceptions
        MaxLengthError: `The string '${arg1}' exceeds the length of ${arg2} characters`,
        MinLengthError: `The minimum length required for the string ${arg1} is ${arg2} characters`,
        HaveSpacesError: `White spaces are not allowed in the string '${arg1}'`,
        HaveSideSpacesError: `Side white spaces are not allowed in the string '${arg1}'`,

        //Number Sanitization/Validation Exceptions
        MaxSizeError: `The number '${arg1}' exceeds the size of ${arg2}`,
        MinSizeError: `The minimum length required for the string ${arg1} is ${arg2} characters`,
        IsFloatingError: `The number ${arg1} cannot be floating`,
        IsNotFloatingError: `The number ${arg1} must be floating`,
        IsIntegerError: `The number ${arg1} cannot be an integer`,
        IsNotIntegerError: `The number ${arg1} must be an integer`,
        IsNegativeError: `The number ${arg1} cannot be negative`,
        IsNotNegativeError: `The number ${arg1} must be negative`
    }
};
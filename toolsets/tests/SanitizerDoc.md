
# DestSanitizer

DestSanitizer is a method created to sanitize data based on a template object called **ConstraintGroup**.

## Usage

To start using DestSanitizer you will need to make the following imports:

```typescript
import { DestSanitize, ConstraintGroup } from "./toolsets/sanitization/DestSanitizer";
```

To start a sanitization process you will need a ConstraintGroup, it is an information object that will pre-determine how the variables should be:

```typescript
var NumberTemplate: ConstraintGroup = {
    primitiveType: "number",
    maxSize: 10,
    minSize: 5
};
```

This example informs that only variables of numeric type with size between 5 and 10 will be accepted. Now, to initialize the sanitization, just call the appropriate method:

````typescript
var result = DestSanitize(6, NumberTemplate);
````

This code will return a number "6", as there was no error in the comparison with the template.

## Use cases

Currently DestSanitizer can be used with numbers and strings and has the following customizable constraints:

**General Constraints**
```typescript
primitiveType //Limits the primitive type (provided by JavaScript) of the object.
```

**String Constraints**
```typescript
maxLength //Defines a maximum length for the expected string.
minLength //Defines a minimum length for the expected string.
canHaveSideWhiteSpaces; //Determines whether or not the string can have empty spaces at the ends.
canHaveWhiteSpaces; //Determines whether or not the string can have empty spaces.
```

**Number Constraints**
```typescript
maxSize;
minSize;
isFloating;
isNegative;
isInteger;
```
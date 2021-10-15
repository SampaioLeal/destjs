import { DestSanitize, ConstraintGroup } from "../sanitization/DestSanitizer";

var Teste: ConstraintGroup = {
    maxSize: 112
};

/* Excepted "TypeError": The number '113' exceeds the size of 112 */
console.log(DestSanitize(113, Teste));
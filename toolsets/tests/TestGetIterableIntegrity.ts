import { DestPrimitiveValidators } from '../dataCheckers/DestPrimitiveValidators';

/* 
Check the iterable integrity of the target variable

Usage: TestGetIterableIntegrity.checkIntegrity([1,2]) -->
{
    targetType: "IntegerNumber",
    isUnique: true
}
*/
export class TestGetIterableIntegrity {
    static checkIntegrity(target:any, primitiveType:string) {
        return DestPrimitiveValidators.getIterableIntegrity(target, primitiveType);
    }
}
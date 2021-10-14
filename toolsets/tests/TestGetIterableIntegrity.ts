import { DestPrimitiveValidators } from '../dataCheckers/DestPrimitiveValidators';

//Check the iterable integrity of the target variable
export class TestGetIterableIntegriry {
    checkIntegrity(target:any, primitiveType:string) {
        return DestPrimitiveValidators.getIterableIntegrity(target, primitiveType);
    }
}
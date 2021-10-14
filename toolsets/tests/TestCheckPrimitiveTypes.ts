import { DestPrimitiveValidators } from '../dataCheckers/DestPrimitiveValidators';

//Check the primitive type of the variable | Usage: TestCheckPrimitiveTypes.checkType([1,2,3]) --> ObjectArray
export class TestCheckPrimitiveTypes {
    static checkType(target:any) {
        return DestPrimitiveValidators.check(target);
    }
}
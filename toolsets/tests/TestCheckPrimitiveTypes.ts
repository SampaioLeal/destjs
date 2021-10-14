import { DestPrimitiveValidators } from '../dataCheckers/DestPrimitiveValidators';

//Check the primitive type of the variable
export class TestCheckPrimitiveTypes {
    checkType(target:any) {
        return DestPrimitiveValidators.check(target);
    }
}
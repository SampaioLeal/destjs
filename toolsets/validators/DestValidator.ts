export interface DataConstraint {
    fieldName: string;
    maxLength?: number;
    minLength?: number;
    primitiveType?: string;
}

export type DataTemplate = Array<DataConstraint>;

export class DestValidator {

}
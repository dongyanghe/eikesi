import { ColSize } from './ColSize';
export class FormItemColSize extends ColSize {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    formLabel: ColSize;
    formControl: ColSize;
    constructor(
        xs: number = 24,
        sm: number = 12,
        md?: number,
        lg?: number,
        xl?: number,
        formLabel: ColSize = new ColSize(24, 6),
        formControl: ColSize = new ColSize(24, 14)
    ) {
        super(xs, sm, md, lg, xl);
        this.formLabel = formLabel;
        this.formControl = formControl;
    }
}


export class ColSize{
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  constructor(xs: number = 24, sm?: number, md?: number, lg?: number, xl?: number) {
    this.xs = xs;
    this.sm = sm || this.xs;
    this.md = md || this.sm || this.xs;
    this.lg = lg || this.md || this.sm || this.xs;
    this.xl = xl || this.lg || this.md || this.sm || this.xs;
  }
}

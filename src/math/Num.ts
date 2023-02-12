import ILinearInterpolation from '@/animation/ILinearInterpolation';

class Num implements ILinearInterpolation<Num> {
  constructor(public value: number) {}

  interpolate(other: Num, t: number): Num {
    return new Num(this.value + (other.value - this.value) * t);
  }
}
import IEasing from './IEasing';
import ILinearInterpolation from './ILinearInterpolation';

class SineInOut<T extends ILinearInterpolation<T>> implements IEasing<T> {
  get start(): T {
    return this.start_;
  }

  get end(): T {
    return this.end_;
  }

  constructor(private start_: T, private end_: T) {}

  ease(t: number) {
    if (t <= 0) return this.start_;
    if (t >= 1) return this.end_;

    return this.start_.interpolate(this.end_, -(Math.cos(Math.PI * t) - 1) / 2);
  }
}

export default SineInOut;

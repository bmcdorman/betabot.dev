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
    return this.start_.interpolate(this.end_, -0.5 * (Math.cos(Math.PI * t) - 1));
  }
}

export default SineInOut;

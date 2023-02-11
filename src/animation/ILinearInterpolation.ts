interface ILinearInterpolation<T> {
  interpolate(to: T, t: number): T;
}

export default ILinearInterpolation;
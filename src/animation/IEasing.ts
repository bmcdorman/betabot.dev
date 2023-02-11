interface IEasing<T> {
  readonly start: T;
  readonly end: T;
  ease(t: number): T;
}

export default IEasing;
import ITriangle from './ITriangle';

class Triangle<T> implements ITriangle<T> {
  constructor(public a: T, public b: T, public c: T) {}
}

export default Triangle;
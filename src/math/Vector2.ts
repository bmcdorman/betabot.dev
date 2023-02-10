import IVector2 from './IVector2';

class Vector2 implements IVector2 {
  static readonly ZERO = Object.freeze(new Vector2(0, 0));
  static readonly ONE = Object.freeze(new Vector2(1, 1));

  constructor(public x: number, public y: number) {}
}

export default Vector2;
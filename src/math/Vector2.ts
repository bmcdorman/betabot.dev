import IVector2 from './IVector2';

class Vector2 implements IVector2 {
  static readonly ZERO = Object.freeze(new Vector2(0, 0));
  static readonly ONE = Object.freeze(new Vector2(1, 1));

  constructor(public x: number, public y: number) {}

  midpoint(v: IVector2): Vector2 {
    return new Vector2((this.x + v.x) / 2, (this.y + v.y) / 2);
  }

  distance(v: IVector2): number {
    return Math.sqrt((this.x - v.x) ** 2 + (this.y - v.y) ** 2);
  }
}

export default Vector2;
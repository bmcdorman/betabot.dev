import IVector3 from './IVector3';

class Vector3 implements IVector3 {
  static readonly ZERO = Object.freeze(new Vector3(0, 0, 0));
  static readonly ONE = Object.freeze(new Vector3(1, 1, 1));

  constructor(public x: number, public y: number, public z: number) {}

  multiplyScalar(scalar: number): Vector3 {
    return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
  }

  add(v: IVector3): Vector3 {
    return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  subtract(v: IVector3): Vector3 {
    return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  multiply(v: IVector3): Vector3 {
    return new Vector3(this.x * v.x, this.y * v.y, this.z * v.z);
  }

  cross(v: IVector3): Vector3 {
    return new Vector3(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  }

  normalize(): Vector3 {
    return this.multiplyScalar(1 / this.length());
  }

  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  lowPassFilter(v: Vector3, alpha: number): Vector3 {
    return this.multiplyScalar(1 - alpha).add(v.multiplyScalar(alpha));
  }
}

export default Vector3;
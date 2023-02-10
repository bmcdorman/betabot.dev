import IRgba from './IRgba';

class Rgba implements IRgba {
  constructor(public r: number, public g: number, public b: number, public a: number) {}

  static fromHex(hex: string): Rgba {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    return new Rgba(r, g, b, 1.0);
  }

  static fromRgbString(rgba: string): Rgba {
    const [r, g, b, a] = rgba
      .substr(4, rgba.length - 5)
      .split(',')
      .map((x) => parseInt(x, 10));
    return new Rgba(r, g, b, a);
  }
}

export default Rgba;
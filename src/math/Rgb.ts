import IRgb from './IRgb';

class Rgb implements IRgb {
  constructor(public r: number, public g: number, public b: number) {}

  static fromHex(hex: string): Rgb {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    return new Rgb(r, g, b);
  }

  static fromRgbString(rgb: string): Rgb {
    const [r, g, b] = rgb
      .substr(4, rgb.length - 5)
      .split(',')
      .map((x) => parseInt(x, 10));
    return new Rgb(r, g, b);
  }
}

export default Rgb;
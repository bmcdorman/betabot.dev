import ILinearInterpolation from '@/animation/ILinearInterpolation';
import IHsl from './IHsl';
import Rgb from './Rgb';

function hsl2rgb(h,s,l) 
{
  let a= s*Math.min(l,1-l);
  let f= (n,k=(n+h/30)%12) => l - a*Math.max(Math.min(k-3,9-k,1),-1);
  return [f(0),f(8),f(4)];
}

class Hsl implements IHsl, ILinearInterpolation<Hsl> {
  /**
   * @param h The hue, in degrees, in the range [0, 360)
   * @param s The saturation, in the range [0, 1]
   * @param l The lightness, in the range [0, 1]
   */
  constructor(public h: number, public s: number, public l: number) {}

  toRgb(): Rgb {
    const [r, g, b] = hsl2rgb(this.h, this.s, this.l);
    return new Rgb(r * 255, g * 255, b * 255);
  }

  interpolate(to: Hsl, t: number): Hsl {
    const { h, s, l } = this;
    const { h: toH, s: toS, l: toL } = to;
    const hDiff = toH - h;
    const sDiff = toS - s;
    const lDiff = toL - l;
    return new Hsl(h + hDiff * t, s + sDiff * t, l + lDiff * t);
  }
}

export default Hsl;
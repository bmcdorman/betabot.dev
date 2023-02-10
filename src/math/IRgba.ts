import IRgb from './IRgb';

interface IRgba extends IRgb {
  a: number;
}

namespace IRgba {
  export const toCss = ({ r, g, b, a }: IRgba): string => `rgba(${r}, ${g}, ${b}, ${a})`;
}

export default IRgba;
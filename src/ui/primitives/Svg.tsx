import * as React from 'react';

import Vector2 from '@/math/Vector2';
import AbsoluteSizer from './AbsoluteSizer';
import { styled } from 'styletron-react';
import StyleProps from '../util/StyleProps';

export interface SvgProps extends StyleProps {
  draw: (size: Vector2, ctx: CanvasRenderingContext2D) => void;
}

type Props = SvgProps;

const Container = styled('canvas', {
  position: 'absolute',
  top: 0,
  left: 0,
});

const Svg = ({ draw, style, className }: Props) => {

  const ref = React.createRef<HTMLCanvasElement>();

  React.useEffect(() => {
    if (!ref.current) return;
    const ctx = ref.current.getContext('2d');
    const size = new Vector2(ref.current.width, ref.current.height);
    draw(size, ctx);
  });

  return (
    <AbsoluteSizer
      style={style}
      className={className}
      renderChild={size => {
        if (ref.current) draw(size, ref.current.getContext('2d'));
        const { x: width, y: height } = size;
        return (
          <Container
            ref={ref}
            width={width}
            height={height}
            style={{ width: `${width}px`, height: `${height}px` }}
          />
        );
      }}
    />
  );
};

export default Svg;
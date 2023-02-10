import * as React from 'react';

import Vector2 from '@/math/Vector2';

import { styled } from 'styletron-react';
import resizeListener, { ResizeListener } from '@/ui/util/resizeListener';
import StyleProps from '@/ui/util/StyleProps';

export interface AbsoluteSizerProps extends StyleProps {
  renderChild: (size: Vector2) => React.ReactNode;
}

interface AbsoluteSizerState {
  size: Vector2;
}

type Props = AbsoluteSizerProps;
type State = AbsoluteSizerState;

const Container = styled('div', {
  position: 'relative'
});

const AbsoluteSizer = ({ renderChild, style, className }: Props) => {
  const [size, setSize] = React.useState(Vector2.ZERO);

  const ref = React.createRef<HTMLDivElement>();
  const sizeListener = React.useRef(resizeListener(setSize));

  React.useEffect(() => {
    const { width, height } = ref.current.getBoundingClientRect();
    setSize(new Vector2(width, height));
    sizeListener.current.observe(ref.current);
    return () => sizeListener.current.disconnect();
  }, [ref]);

  return (
    <Container ref={ref} style={style} className={className}>
      {renderChild(size)}
    </Container>
  );
}

export default AbsoluteSizer;
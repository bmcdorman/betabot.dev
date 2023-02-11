import IRgba from '@/math/IRgba';
import Component from '@/ui/util/Component';
import StyleProps from '@/ui/util/StyleProps';
import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { styled } from 'styletron-react';
import ThemeContext from '../theme/ThemeContext';
import ThemeProps from '../util/ThemeProps';

export interface HiddenSidebarProps extends StyleProps {
  components: Component<StyleProps & { key?: string | number }>[];

  onHide?: () => void;
}

type Props = HiddenSidebarProps;

const Container = styled('div', ({ $theme, $offset }: ThemeProps & { $offset: number }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  backdropFilter: 'blur(12px)',
  height: '100vh',
  width: '50vw',
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  right: 0,
  top: 0,
  transform: `translateX(${100 - $offset * 100}%)`,
}));

const SIDEBAR_ELEMENT = document.getElementById('sidebar');

const HiddenSidebar = ({ components, style, className }: Props) => {
  const theme = useContext(ThemeContext);

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // When first presented, bring the sidebar into view
    setOffset(1);
  });

  return createPortal(
    <Container $theme={theme} $offset={offset} style={style} className={className}>
      {components.map((component, i) =>
        Component.render(component, { key: i })
      )}
    </Container>
  , SIDEBAR_ELEMENT);
};

export default HiddenSidebar;
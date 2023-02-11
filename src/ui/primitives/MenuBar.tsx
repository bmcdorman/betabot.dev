import IRgba from '@/math/IRgba';
import Component from '@/ui/util/Component';
import StyleProps from '@/ui/util/StyleProps';
import { useContext } from 'react';
import { styled } from 'styletron-react';
import ThemeContext from '../theme/ThemeContext';
import ThemeProps from '../util/ThemeProps';

export interface MenuBarProps extends StyleProps {
  components: Component<StyleProps & { key?: string | number }>[];
}

type Props = MenuBarProps;

const Container = styled('div', ({ $theme }: ThemeProps) => ({
  display: 'flex',
  alignItems: 'center',
}));

const MenuBar = ({ components, style, className }: Props) => {
  const theme = useContext(ThemeContext)

  return (
    <Container $theme={theme} style={style} className={className}>
      {components.map((component, i) =>
        Component.render(component, { key: i })
      )}
    </Container>
  );
};

export default MenuBar;
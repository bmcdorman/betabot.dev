import IRgba from '@/math/IRgba';
import Component from '@/ui/util/Component';
import StyleProps from '@/ui/util/StyleProps';
import { useContext } from 'react';
import { styled } from 'styletron-react';
import ThemeContext from '../theme/ThemeContext';
import ThemeProps from '../util/ThemeProps';

export enum MenuBarDirection {
  Horizontal,
  Vertical
}


export interface MenuBarProps extends StyleProps {
  components: Component<StyleProps & { key?: string | number }>[];
  dir?: MenuBarDirection;
}

type Props = MenuBarProps;

const Container = styled('div', ({ $theme, $dir }: ThemeProps & { $dir: MenuBarDirection }) => ({
  display: 'flex',
  flexDirection: $dir === MenuBarDirection.Horizontal ? 'row' : 'column',
  alignItems: 'center',
}));

const MenuBar = ({ components, style, className, dir }: Props) => {
  const theme = useContext(ThemeContext)

  return (
    <Container
      $theme={theme}
      $dir={dir || MenuBarDirection.Horizontal}
      style={style}
      className={className}
    >
      {components.map((component, i) =>
        Component.render(component, { key: i })
      )}
    </Container>
  );
};

export default MenuBar;
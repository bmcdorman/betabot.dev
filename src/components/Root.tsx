import * as React from 'react';

import ThemeProps from '@/ui/util/ThemeProps';
import { styled } from 'styletron-react';
import ThemeContext from '@/ui/theme/ThemeContext';
import MenuBar from '@/ui/primitives/MenuBar';
import Component from '@/ui/util/Component';
import Title from './Title';
import IRgba from '@/math/IRgba';
import TitleBar from './TitleBar';
import FlexSpacer from '@/ui/primitives/FlexSpacer';
import Button from '@/ui/primitives/Button';
import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';

const OuterContainer = styled('div', ({ $theme }: ThemeProps) => ({
  width: '100%',
  minHeight: '100vh',
  backgroundColor: IRgba.toCss($theme.marginBackgroundColor),
  padding: '1em'
}));

const InnerContainer = styled('div', ({ $theme }: ThemeProps) => ({
  width: '768px',
  color: IRgba.toCss($theme.textColor),
  backgroundColor: IRgba.toCss($theme.backgroundColor),
  margin: '0 auto',
  borderRadius: '0.5em',
  overflow: 'hidden',
  border: `1px solid ${IRgba.toCss($theme.borderColor)}`,
  boxShadow: `0 0 0.5em #bbb`,
}));

const PageContainer = styled('div', {
  padding: '16px',
});

const MenuButton = styled(Button, ({ $selected }: { $selected: boolean }) => ({
  opacity: $selected ? 1 : 0.5,
  fontFamily: `'Montserrat', sans-serif`,
  fontSize: '24px',
}));

const Root = () => {
  const theme = React.useContext(ThemeContext);

  const path = window.location.pathname;

  return (
    <OuterContainer $theme={theme}>
      <InnerContainer $theme={theme}>
        <TitleBar
          components={[
            Component.create(Title),
            Component.create(FlexSpacer),
            Component.create(MenuButton, {
              children: 'Home',
              $selected: path === '/'
            }),
            Component.create(MenuButton, {
              children: 'Contact',
              $selected: path === '/contact'
            }),
          ]}
        />
        <PageContainer>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </PageContainer>
      </InnerContainer>
    </OuterContainer>
  )
};

export default Root;
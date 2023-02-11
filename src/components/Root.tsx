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
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from '@/pages/Home';
import Contact from '@/pages/Contact';
import DynamicBackground from './DynamicBackground';

const OuterContainer = styled('div', ({ $theme }: ThemeProps) => ({
  width: '100%',
  minHeight: '100vh',
}));

const InnerContainer = styled('div', ({ $theme }: ThemeProps) => ({
  width: '768px',
  '@media screen and (max-width: calc(768px + 1em))': { width: '100%', borderRadius: 0, margin: 0 },
  color: IRgba.toCss($theme.textColor),
  backgroundColor: 'rgba(255, 255, 255, 0.65)',
  margin: '0 auto',
  borderBottomLeftRadius: '0.5em',
  borderBottomRightRadius: '0.5em',
  overflow: 'hidden',
  backdropFilter: 'blur(10px)'
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

  const navigate = useNavigate();

  return (
    <OuterContainer $theme={theme}>
      <DynamicBackground />
      <InnerContainer $theme={theme}>
        <TitleBar
          components={[
            Component.create(Title),
            Component.create(FlexSpacer),
            Component.create(MenuButton, {
              children: 'Home',
              $selected: path === '/',
              onClick: () => navigate('/')
            }),
            Component.create(MenuButton, {
              children: 'Contact',
              $selected: path === '/contact',
              onClick: () => navigate('/contact')
            }),
          ]}
        />
        <PageContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </PageContainer>
      </InnerContainer>
    </OuterContainer>
  )
};

export default Root;
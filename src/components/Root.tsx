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
import Projects from '@/pages/Projects';
import Footer from './Footer';

const OuterContainer = styled('div', ({ $theme }: ThemeProps) => ({
  width: '100%',
  minHeight: '100vh',
  paddingTop: '1em',
  '@media screen and (max-width: calc(768px + 1em))': {
    paddingTop: 0
  },
}));

const InnerContainer = styled('div', ({ $theme }: ThemeProps) => ({
  position: 'relative',
  width: '768px',
  '@media screen and (max-width: calc(768px + 1em))': {
    width: '100%',
    borderRadius: 0,
    margin: 0
  },
  color: IRgba.toCss($theme.textColor),
  margin: '0 auto',
}));

const PageContainer = styled('div', {
  padding: '16px',
  backgroundColor: 'rgba(255, 255, 255, 0.66)',
  backdropFilter: 'blur(12px)',
  borderBottomLeftRadius: '0.5em',
  borderBottomRightRadius: '0.5em',
  '@media screen and (max-width: calc(768px + 1em))': {
    borderRadius: 0,
  },
});

const MenuButton = styled(Button, ({ $selected }: { $selected: boolean }) => ({
  opacity: $selected ? 1 : 0.5,
  // underline
  ':after': {
    content: '""',
    display: 'block',
    width: '100%',
    height: '2px',
    backgroundColor: $selected ? 'black' : 'transparent',
    transform: 'translateY(0.2em)',
    transition: 'transform 0.2s ease-in-out',
  },
  fontFamily: `'Montserrat', sans-serif`,
  fontSize: '24px',
  transition: 'opacity 0.2s ease-in-out',
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
              children: 'Projects',
              $selected: path === '/projects',
              onClick: () => navigate('/projects')
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
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </PageContainer>
        
      </InnerContainer>
    </OuterContainer>
  )
};

export default Root;
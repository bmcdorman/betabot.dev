import * as React from 'react';

import ThemeProps from '@/ui/util/ThemeProps';
import { styled } from 'styletron-react';
import ThemeContext from '@/ui/theme/ThemeContext';
import MenuBar, { MenuBarDirection } from '@/ui/primitives/MenuBar';
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
import About from '@/pages/About';
import resizeListener, { ResizeListener } from '@/ui/util/resizeListener';
import Overlay, { OVERLAY_EASING_DURATION } from '@/ui/primitives/Overlay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const TRANSITION_WIDTH = `calc(768px + 1em)`;

const OuterContainer = styled('div', ({ $theme }: ThemeProps) => ({
  width: '100%',
  minHeight: '100vh',
  paddingTop: '1em',
  [`@media screen and (max-width: ${TRANSITION_WIDTH})`]: {
    paddingTop: 0
  },
}));

const InnerContainer = styled('div', ({ $theme }: ThemeProps) => ({
  position: 'relative',
  width: '768px',
  [`@media screen and (max-width: ${TRANSITION_WIDTH})`]: {
    width: '100%',
    borderRadius: 0,
    margin: 0
  },
  color: IRgba.toCss($theme.textColor),
  margin: '0 auto',
  border: '1px solid rgba(0, 0, 0, 0.1)',
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
  borderTop: '1px solid rgba(0, 0, 0, 0.1)',
});

const MenuButton = styled(Button, ({ $selected }: { $selected: boolean }) => ({
  opacity: $selected ? 1 : 0.4,
  ':hover': $selected ? {} : {
    opacity: 0.6
  },
  fontFamily: `'Montserrat', sans-serif`,
  fontSize: '0.7em',
  transition: 'opacity 0.2s ease-in-out',
  userSelect: 'none',
  paddingLeft: '0.5em',
  paddingRight: '0.5em',
  [`@media screen and (max-width: ${TRANSITION_WIDTH})`]: {
    paddingLeft: '0.25em',
    paddingRight: '0.25em',
  },
}));

const OverlayMenuBar = styled(MenuBar, ({ $theme }: ThemeProps) => ({
  justifyContent: 'space-around',
  width: '100%',
  height: '100%',
  fontSize: '3em',
  color: '#fff'
}));

const MENU_COLLAPSE_WIDTH = 600;

enum OverlayState {
  None,
  Mounting,
  Mounted,
  Unmounting,
}

const Root = () => {
  const theme = React.useContext(ThemeContext);
  const ref = React.createRef<HTMLDivElement>();

  const [width, setWidth] = React.useState(0);
  const [overlay, setOverlay] = React.useState(OverlayState.None);

  const sizeListener = React.useRef<ResizeListener>(resizeListener(size => setWidth(size.x)));

  const path = window.location.pathname;

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!ref.current) {
      sizeListener.current.disconnect();
      return;
    }

    sizeListener.current.observe(ref.current);
    return () => sizeListener.current.disconnect();
  }, [ref.current]);

  let titleBarComponents: Component<any>[];
  let hiddenSidebarComponents: Component<any>[];

  const navigateTo = (path: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setOverlay(OverlayState.Unmounting);
    setTimeout(() => setOverlay(OverlayState.None), OVERLAY_EASING_DURATION * 1000);
    navigate(path);
  };

  const title = Component.create(Title);
  const flexSpacer = Component.create(FlexSpacer);
  const home = Component.create(MenuButton, {
    children: 'Home',
    $selected: path === '/',
    onClick: navigateTo('/')
  });
  const projects = Component.create(MenuButton, {
    children: 'Projects',
    $selected: path === '/projects',
    onClick: navigateTo('/projects')
  });
  const about = Component.create(MenuButton, {
    children: 'About',
    $selected: path === '/about',
    onClick: navigateTo('/about')
  });
  const contact = Component.create(MenuButton, {
    children: 'Contact',
    $selected: path === '/contact',
    onClick: navigateTo('/contact')
  });

  if (width > MENU_COLLAPSE_WIDTH) {
    titleBarComponents = [
      title,
      flexSpacer,
      home,
      projects,
      about,
      contact
    ];
  } else {
    titleBarComponents = [
      title,
      flexSpacer,
      Component.create(MenuButton, {
        children: <FontAwesomeIcon icon={faBars} />,
        $selected: false,
        onClick: () => {
          setOverlay(OverlayState.Mounting);
          setTimeout(() => setOverlay(OverlayState.Mounted), OVERLAY_EASING_DURATION * 1000);
        }
      }),
    ];

    hiddenSidebarComponents = [
      home,
      projects,
      about,
      contact
    ];
  }

  return (
    <>
    <OuterContainer $theme={theme} ref={ref}>
      <DynamicBackground />
      <InnerContainer $theme={theme}>
        <TitleBar components={titleBarComponents} />
        <PageContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </PageContainer>
      </InnerContainer>
    </OuterContainer>
    {width <= MENU_COLLAPSE_WIDTH && overlay !== OverlayState.None && (
      <Overlay
        invisible={overlay === OverlayState.Unmounting || overlay === OverlayState.Mounting}
        onClick={event => {
          setOverlay(OverlayState.Unmounting);
          setTimeout(() => setOverlay(OverlayState.None), OVERLAY_EASING_DURATION * 1000);
        }}
      >
        <OverlayMenuBar
          $theme={theme}
          dir={MenuBarDirection.Vertical}
          components={hiddenSidebarComponents}
        />
      </Overlay>
    )}
    </>
  )
};

export default Root;
import StyleProps from '@/ui/util/StyleProps';
import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { styled } from 'styletron-react';
import ThemeContext from '../theme/ThemeContext';
import ThemeProps from '../util/ThemeProps';

export interface OverlayProps extends StyleProps {
  children?: React.ReactNode;
  invisible?: boolean;

  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

type Props = OverlayProps;

export const OVERLAY_EASING_DURATION = 0.2;

const Container = styled('div', ({ $theme, $invisible }: ThemeProps & { $invisible: boolean }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.66)',
  backdropFilter: $invisible ? 'none' : 'blur(12px)',
  width: '100vw',
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  right: 0,
  top: 0,
  opacity: $invisible ? 0 : 1,
  transition: `all ${OVERLAY_EASING_DURATION}s`,
}));

const SIDEBAR_ELEMENT = document.getElementById('sidebar');

const Overlay = ({ children, invisible, onClick, style, className }: Props) => {
  const theme = useContext(ThemeContext);

  return createPortal(
    <Container
      $theme={theme}
      $invisible={invisible}
      style={style}
      className={`${className} fill-height`}
      onClick={onClick}
    >
      {children}
    </Container>
  , SIDEBAR_ELEMENT);
};

export default Overlay;
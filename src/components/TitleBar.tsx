import MenuBar from '@/ui/primitives/MenuBar';
import { styled } from 'styletron-react';


const TitleBar = styled(MenuBar, {
  fontSize: '32px',
  padding: '16px',
  position: 'sticky',
  top: '-1',
  backgroundColor: 'rgba(255, 255, 255, 0.66)',
  backdropFilter: 'blur(12px)',
  borderTopLeftRadius: '0.5em',
  borderTopRightRadius: '0.5em',
  '@media screen and (max-width: calc(768px + 1em))': {
    borderRadius: 0,
  },
});

export default TitleBar;
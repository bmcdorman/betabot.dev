import StyleProps from '@/ui/util/StyleProps';
import * as React from 'react';
import { styled } from 'styletron-react';

export interface TitleProps extends StyleProps {

}

type Props = TitleProps;

const Container = styled('h1', {
  fontFamily: `'Fira Mono', monospace`,
  textAlign: 'center',
  fontSize: 'inherit',
  padding: 0,
  margin: 0,
  height: '1em',
});

const FINAL_TEXTS = {
  '/': 'betabot',
  '/projects': 'projects',
  '/about': 'about',
  '/contact': 'contact',
}

const Title = ({ style, className }: Props) => {
  const [text, setText] = React.useState('');
  const timeoutHandle = React.useRef<number>();

  React.useEffect(() => {
    const finalText = FINAL_TEXTS[window.location.pathname] || '404';

    if (text === finalText) return;

    if (timeoutHandle.current) {
      clearTimeout(timeoutHandle.current);
      timeoutHandle.current = undefined;
    }

    timeoutHandle.current = setTimeout(() => {
      let nextText = text;
      if (finalText.slice(0, text.length) !== text) {
        // backspace
        nextText = nextText.slice(0, text.length - 1);
      } else {
        nextText += finalText[text.length];
      }
      setText(nextText);
    }, 50 + Math.random() * 100);
  }, [text, window.location.pathname]);
  
  const [caret, setCaret] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setCaret(!caret);
    }, 500);
  }, [caret]);

  return (
    <Container style={style} className={className}>
      {text}
      {caret ? '_' : ''}
    </Container>
  );
};

export default Title;
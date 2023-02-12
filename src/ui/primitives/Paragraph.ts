import { styled } from 'styletron-react';

const Paragraph = styled('p', {
  marginTop: '1em',
  ':first-child': {
    marginTop: 0
  }
});

export default Paragraph;
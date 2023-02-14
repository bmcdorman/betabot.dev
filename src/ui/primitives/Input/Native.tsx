import { styled } from 'styletron-react';

const Input = styled('input', {
  fontSize: 'inherit',
  fontFamily: 'inherit',
  margin: 0,
  border: `none`,
  outline: 'none',
  borderRadius: '0.5em',
  padding: '0.5em',
  backdropFilter: 'blur(12px)',
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  fontWeight: 'inherit',
  color: 'inherit',
  width: '100%',
  ':focus': {
  },
  transition: 'all 0.2s',
});

export default Input;
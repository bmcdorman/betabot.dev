import { styled } from 'styletron-react';

const Input = styled('input', {
  fontSize: 'inherit',
  fontFamily: 'inherit',
  margin: 0,
  border: `1px solid rgba(0, 0, 0, 0.1)`,
  outline: 'none',
  borderRadius: '0.5em',
  padding: '0.5em',
  backdropFilter: 'blur(12px)',
  backgroundColor: 'transparent',
  color: 'inherit',
  width: '100%',
  ':focus': {
    border: `1px solid rgba(0, 0, 0, 0.2)`,
    backgroundColor: 'rgba(255, 255, 255, 0.66)',
  },
  transition: 'all 0.2s',
});

export default Input;
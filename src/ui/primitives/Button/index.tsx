import * as React from 'react';
import { styled } from 'styletron-react';
import StyleProps from '@/ui/util/StyleProps';

export interface ButtonProps extends StyleProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

const Container = styled('button', ({ onClick }: ButtonProps) => ({
  border: 'none',
  backgroundColor: 'transparent',
  fontSize: 'inherit',
  cursor: onClick ? 'pointer' : 'default',
  color: 'inherit',
  fontWeight: 'inherit',
  fontFamily: 'inherit',
  fontStyle: 'inherit',
}));

const Button = (props: ButtonProps) => (
  <Container {...props} />
);

export default Button;
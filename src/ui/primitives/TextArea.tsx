import { styled } from 'styletron-react';

const Container = styled('textarea', {
  fontFamily: 'inherit',
  fontSize: 'inherit',
  border: 'none',
  outline: 'none',
  resize: 'none',
  width: '100%',
  padding: 0,
  margin: 0,
  backgroundColor: 'transparent',
  borderRadius: 0,
});

export interface TextAreaProps {
  value: string;
  onValueChange: (value: string, event: React.SyntheticEvent<HTMLTextAreaElement>) => void;
  style?: React.CSSProperties;
  className?: string;
}

type Props = TextAreaProps;

const TextArea = ({ value, onValueChange, style, className }: Props) => (
  <Container
    style={style}
    className={className}
    value={value}
    onChange={event => onValueChange(event.target.value, event)}
  />
);

export default TextArea;
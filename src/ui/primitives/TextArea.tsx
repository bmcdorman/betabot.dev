import { styled } from 'styletron-react';
import StyleProps from '../util/StyleProps';

const Container = styled('textarea', {
  fontFamily: 'inherit',
  fontSize: 'inherit',
  border: `1px solid rgba(0, 0, 0, 0.1)`,
  outline: 'none',
  resize: 'none',
  width: '100%',
  margin: 0,
  backgroundColor: 'transparent',
  borderRadius: '0.5em',
  padding: '0.5em',
  backdropFilter: 'blur(12px)',
  ':focus': {
    border: `1px solid rgba(0, 0, 0, 0.2)`,
    backgroundColor: 'rgba(255, 255, 255, 0.66)',
  },
  transition: 'all 0.2s',
});

export interface TextAreaProps extends StyleProps {
  placeholder?: string;
  value: string;
  onValueChange: (value: string, event: React.SyntheticEvent<HTMLTextAreaElement>) => void;

  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

type Props = TextAreaProps;

const TextArea = ({
  placeholder,
  value,
  onValueChange,
  style,
  className,
  onKeyDown
}: Props) => (
  <Container
    style={style}
    className={className}
    placeholder={placeholder}
    value={value}
    onChange={event => onValueChange(event.target.value, event)}
    onKeyDown={onKeyDown}
  />
);

export default TextArea;
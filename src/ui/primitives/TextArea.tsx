import { styled } from 'styletron-react';
import StyleProps from '../util/StyleProps';

const Container = styled('textarea', {
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  // border: `1px solid rgba(0, 0, 0, 0.1)`,
  border: 'none',
  outline: 'none',
  resize: 'none',
  width: '100%',
  margin: 0,
  backgroundColor: 'transparent',
  borderRadius: '0.5em',
  padding: '0.5em',
  backdropFilter: 'blur(12px)',
  color: 'inherit',
  ':focus': {
  },
  transition: 'all 0.2s',
});

export interface TextAreaProps extends StyleProps {
  placeholder?: string;
  value: string;
  disabled?: boolean;
  onValueChange: (value: string, event: React.SyntheticEvent<HTMLTextAreaElement>) => void;

  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

type Props = TextAreaProps;

const TextArea = ({
  placeholder,
  value,
  onValueChange,
  disabled,
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
    disabled={disabled}
    onKeyDown={onKeyDown}
  />
);

export default TextArea;
import StyleProps from '@/ui/util/StyleProps';
import * as React from 'react';
import Input from './Native';

export interface TextProps extends StyleProps {
  placeholder?: string;
  value: string;
  onValueChange: (value: string, event: React.SyntheticEvent<HTMLInputElement>) => void;

  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

type Props = TextProps;

const Text = ({
  style,
  className,
  placeholder,
  value,
  onValueChange,
  onKeyDown
}: Props) => {
  return (
    <Input
      type="text"
      style={style}
      className={className}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
      value={value}
      onChange={event => onValueChange(event.target.value, event)}
    />
  );
}

export default Text;
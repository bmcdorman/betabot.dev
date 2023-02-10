import StyleProps from '@/ui/util/StyleProps';
import * as React from 'react';
import Input from '.';

export interface TextProps extends StyleProps {
  value: string;
  onValueChange: (value: string, event: React.SyntheticEvent<HTMLInputElement>) => void;
}

type Props = TextProps;

const Text = ({ style, className, value, onValueChange }: Props) => {
  return (
    <Input
      type="text"
      style={style}
      className={className}
      value={value}
      onChange={event => onValueChange(event.target.value, event)}
    />
  );
}

export default Text;
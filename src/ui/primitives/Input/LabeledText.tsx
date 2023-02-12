import StyleProps from '@/ui/util/StyleProps';
import { styled } from 'styletron-react';
import Text from './Text';

interface LabeledText extends StyleProps {
  label: string;
  labelWidth?: number;

  placeholder?: string;

  value: string;
  onValueChange: (value: string, event: React.SyntheticEvent<HTMLInputElement>) => void;

  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

type Props = LabeledText;

const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
});

const StyledTextInput = styled(Text, {
  flex: 1,
});

const Label = styled('div', {
  marginRight: '0.5em',
});

const LabeledText = ({
  label,
  labelWidth,
  placeholder,
  value,
  onValueChange,
  onKeyDown,
  style,
  className
}: Props) => (
  <Container style={style} className={className}>
    <Label
      style={{ width: labelWidth ? `${labelWidth}px` : undefined }}
    >
      {label}
    </Label>
    <StyledTextInput
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      value={value}
      onValueChange={onValueChange}
    />
  </Container>
);

export default LabeledText;
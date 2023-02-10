import StyleProps from '@/ui/util/StyleProps';
import { styled } from 'styletron-react';
import Input from '.';

interface LabeledText extends StyleProps {
  label: string;
  labelWidth?: number;

  value: string;
  onValueChange: (value: string, event: React.SyntheticEvent<HTMLInputElement>) => void;
}

type Props = LabeledText;

const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
});

const StyledInput = styled(Input, {
  flex: 1,
});

const Label = styled('div', {
  marginRight: '0.5em',
});

const LabeledText = ({ label, labelWidth, value, onValueChange, style, className }: Props) => (
  <Container style={style} className={className}>
    <Label style={{ width: labelWidth ?? `${labelWidth}px` }}>{label}</Label>
    <StyledInput value={value} onValueChange={onValueChange} />
  </Container>
);
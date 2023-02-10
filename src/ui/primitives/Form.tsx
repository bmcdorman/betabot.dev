import * as React from 'react';

import TextArea from './TextArea';
import measureText from '@/ui/util/measureText';
import { styled } from 'styletron-react';
import Input from './Input';
import Text from './Input/Text';
import LabeledText from './Input/LabeledText';
import StyleProps from '../util/StyleProps';

export namespace FormItem {
  export enum Type {
    Text = 'text',
    LabeledText = 'labeled-text',
    TextArea = 'text-area',
  }

  export interface Text {
    type: Type.Text;
    value: string;
    onValueChange: (value: string, event: React.SyntheticEvent<HTMLInputElement>) => void;
  }

  export interface LabeledText {
    type: Type.LabeledText;
    label: string;
    value: string;
    onValueChange: (value: string, event: React.SyntheticEvent<HTMLInputElement>) => void;
  }

  export interface TextArea {
    type: Type.TextArea;
    value: string;
    onValueChange: (value: string, event: React.SyntheticEvent<HTMLTextAreaElement>) => void;
  }

  export const render = (formItem: FormItem, labelWidth?: number) => {
    switch (formItem.type) {
      case Type.Text: return (
        <Text
          value={formItem.value}
          onValueChange={formItem.onValueChange}
        />
      );
      case Type.LabeledText: return (
        <LabeledText
          label={formItem.label}
          value={formItem.value}
          labelWidth={labelWidth}
          onValueChange={formItem.onValueChange}
        />
      );
      case Type.TextArea: return (
        <TextArea
          value={formItem.value}
          onValueChange={formItem.onValueChange}
        />
      );
    }
  };
}

export type FormItem = (
  FormItem.Text |
  FormItem.LabeledText |
  FormItem.TextArea
);

export interface Form {
  items: { [id: string]: FormItem };
  rows: string[][];
}

export interface FormProps extends StyleProps {
  form: Form;
}

type Props = FormProps;

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const Form = ({ style, className, form }: Props) => {
  const ref = React.createRef<HTMLDivElement>();
  
  const [maxLabelWidth, setMaxLabelWidth] = React.useState(0);

  React.useEffect(() => {
    if (!ref.current) return;

    let maxLabelWidth = 0;
    for (const id in form.items) {
      const item = form.items[id];
      if (item.type !== FormItem.Type.LabeledText) continue;
      const labelWidth = measureText(item.label, ref.current);
      maxLabelWidth = Math.max(labelWidth, maxLabelWidth);
    }

    setMaxLabelWidth(maxLabelWidth);
  }, [ref]);

  return (
    <Container ref={ref} style={style} className={className}>
      {form.rows.map((row, i) => (
        <div key={i}>
          {row.map((id, j) => FormItem.render(form.items[id], maxLabelWidth))}
        </div>
      ))}
    </Container>
  );
};
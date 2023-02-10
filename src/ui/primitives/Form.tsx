import TextArea from './TextArea';
import measureText from '@/ui/util/measureText';
import { styled } from 'styletron-react';

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

export interface FormProps {
  form: Form;
}

type Props = FormProps;

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const Form = ({ form }: Props) => {
  let maxLabelWidth = 0;
  for (const id in form.items) {
    const item = form.items[id];
    if (item.type !== FormItem.Type.LabeledText) continue;
      const labelWidth = measureText(item.label, );
      maxLabelWidth = Math.max(labelWidth, maxLabelWidth);
  }
};
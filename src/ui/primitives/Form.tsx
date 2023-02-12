import * as React from 'react';

import TextArea from './TextArea';
import measureText from '@/ui/util/measureText';
import { styled } from 'styletron-react';
import Input from './Input/Native';
import Text from './Input/Text';
import LabeledText from './Input/LabeledText';
import StyleProps from '../util/StyleProps';
import construct from '../util/construct';

export namespace FormItemModel {
  export enum Type {
    Text = 'text',
    LabeledText = 'labeled-text',
    TextArea = 'text-area',
  }

  export interface Text extends StyleProps {
    type: Type.Text;
    value: string;
    placeholder?: string;
    onValueChange: (value: string, event: React.SyntheticEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  }

  export const text = construct<Text>(Type.Text);

  export interface LabeledText extends StyleProps {
    type: Type.LabeledText;
    label: string;
    value: string;
    placeholder?: string;
    onValueChange: (value: string, event: React.SyntheticEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  }

  export const labeledText = construct<LabeledText>(Type.LabeledText);

  export interface TextArea extends StyleProps {
    type: Type.TextArea;
    value: string;
    placeholder?: string;
    onValueChange: (value: string, event: React.SyntheticEvent<HTMLTextAreaElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  }

  export const textArea = construct<TextArea>(Type.TextArea);

  export const render = (formItem: FormItemModel, labelWidth?: number, extraProps: { key?: string | number } = {}) => {
    switch (formItem.type) {
      case Type.Text: return (
        <Text
          value={formItem.value}
          onValueChange={formItem.onValueChange}
          placeholder={formItem.placeholder}
          onKeyDown={formItem.onKeyDown}
          style={formItem.style}
          className={formItem.className}
          {...extraProps}
        />
      );
      case Type.LabeledText: return (
        <LabeledText
          label={formItem.label}
          value={formItem.value}
          labelWidth={labelWidth}
          onValueChange={formItem.onValueChange}
          placeholder={formItem.placeholder}
          onKeyDown={formItem.onKeyDown}
          style={formItem.style}
          className={formItem.className}
          {...extraProps}
        />
      );
      case Type.TextArea: return (
        <TextArea
          value={formItem.value}
          onValueChange={formItem.onValueChange}
          placeholder={formItem.placeholder}
          onKeyDown={formItem.onKeyDown}
          style={formItem.style}
          className={formItem.className}
          {...extraProps}
        />
      );
    }
  };
}

export type FormItemModel = (
  FormItemModel.Text |
  FormItemModel.LabeledText |
  FormItemModel.TextArea
);

export interface FormModel {
  items: { [id: string]: FormItemModel };
  rows: string[][];
}

export interface FormProps extends StyleProps {
  form: FormModel;
}

type Props = FormProps;

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const Row = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  marginTop: '0.5em',
  ':first-child': {
    marginTop: 0,
  },
  width: '100%'
});

const Cell = styled('div', {
  flex: 1,
  marginLeft: '0.5em',
  ':first-child': {
    marginLeft: 0,
  },
});


const Form = ({ style, className, form }: Props) => {
  const ref = React.createRef<HTMLDivElement>();
  
  const [maxLabelWidth, setMaxLabelWidth] = React.useState(0);

  React.useEffect(() => {
    if (!ref.current) return;

    let maxLabelWidth = 0;
    for (const id in form.items) {
      const item = form.items[id];
      if (item.type !== FormItemModel.Type.LabeledText) continue;
      const labelWidth = measureText(item.label, ref.current);
      maxLabelWidth = Math.max(labelWidth, maxLabelWidth);
    }

    console.log(maxLabelWidth);

    setMaxLabelWidth(maxLabelWidth);
  }, [ref.current]);

  return (
    <Container ref={ref} style={style} className={className}>
      {form.rows.map((row, i) => (
        <Row key={i}>
          {row.map((id, j) => (
            <Cell key={j}>
              {FormItemModel.render(form.items[id], maxLabelWidth)}
            </Cell>
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default Form;
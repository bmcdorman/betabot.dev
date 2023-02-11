import * as React from 'react';
import FormComponent, { FormModel, FormItemModel } from '@/ui/primitives/Form';
import { styled } from 'styletron-react';

const Container = styled('div', {
  
});


interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

const Contact = () => {
  const [data, setData] = React.useState<ContactData>({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const form: FormModel = {
    items: {
      firstName: FormItemModel.labeledText({
        label: 'First Name',
        value: data.firstName,
        onValueChange: value => setData({ ...data, firstName: value })
      }),
      lastName: {
        type: FormItemModel.Type.LabeledText,
        label: 'Last Name',
        value: data.lastName,
        onValueChange: value => setData({ ...data, lastName: value })
      },
      email: {
        type: FormItemModel.Type.LabeledText,
        label: 'Email',
        value: data.email,
        onValueChange: value => setData({ ...data, email: value })
      },
      message: {
        type: FormItemModel.Type.TextArea,
        value: data.message,
        onValueChange: value => setData({ ...data, message: value })
      }
    },
    rows: [
      ['firstName', 'lastName'],
      ['email'],
      ['message']
    ]
  };

  return (
    <Container>
      <FormComponent form={form} />
    </Container>
  );
};

export default Contact;
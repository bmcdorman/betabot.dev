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
        onValueChange: value => setData({ ...data, firstName: value }),
        placeholder: 'Jane'
      }),
      lastName: {
        type: FormItemModel.Type.LabeledText,
        label: 'Last Name',
        value: data.lastName,
        onValueChange: value => setData({ ...data, lastName: value }),
        placeholder: 'Doe'
      },
      email: {
        type: FormItemModel.Type.LabeledText,
        label: 'Email',
        value: data.email,
        onValueChange: value => setData({ ...data, email: value }),
        placeholder: 'jane.doe@gmail.com'
      },
      message: {
        type: FormItemModel.Type.TextArea,
        value: data.message,
        placeholder: 'Message',
        onValueChange: value => setData({ ...data, message: value }),
        style: { height: '10em' },
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
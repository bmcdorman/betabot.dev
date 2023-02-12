import * as React from 'react';
import FormComponent, { FormModel, FormItemModel } from '@/ui/primitives/Form';
import { styled } from 'styletron-react';
import Button from '@/ui/primitives/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import Overlay from '@/ui/primitives/Overlay';
import Paragraph from '@/ui/primitives/Paragraph';
import { CONTACT_URL, EMAIL } from '../constants';
import construct from '@/ui/util/construct';

interface ContactProps {
  width: number;
}

type Props = ContactProps;

const Container = styled('div', {
  
});

const ButtonContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
})

const SubmitButton = styled(Button, {
  backdropFilter: 'blur(12px)',
  padding: '0.5em',
  borderRadius: '0.5em',
});

interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}


namespace State {
  export enum Type {
    Incomplete,
    Complete,
    Sending,
    Sent,
    Error,
  }

  export interface Incomplete {
    type: Type.Incomplete;
  }

  export const INCOMPLETE: Incomplete = { type: Type.Incomplete };

  export interface Complete {
    type: Type.Complete;
  }

  export const COMPLETE: Complete = { type: Type.Complete };

  export interface Sending {
    type: Type.Sending;
  }

  export const SENDING: Sending = { type: Type.Sending };

  export interface Sent {
    type: Type.Sent;
  }

  export const SENT: Sent = { type: Type.Sent };

  export interface Error {
    type: Type.Error;
    error: string;
    prev: State;
  }

  export const error = construct<Error>(Type.Error);
}

type State = State.Incomplete | State.Complete | State.Sending | State.Sent | State.Error;


const Contact = ({ width }: Props) => {
  const [data, setData] = React.useState<ContactData>({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [state, setState] = React.useState<State>(State.INCOMPLETE);

  const updateData = (data: ContactData) => {
    setData(data);
    // Validate
    let valid = true;
    if (data.firstName.length === 0) valid = false;
    if (data.lastName.length === 0) valid = false;
    if (data.email.length === 0) valid = false;
    // Do a regex on email
    if (data.message.length === 0) valid = false;
    setState(valid ? State.COMPLETE : State.INCOMPLETE);
  };

  const form: FormModel = {
    items: {
      firstName: FormItemModel.labeledText({
        label: 'First Name',
        value: data.firstName,
        onValueChange: value => updateData({ ...data, firstName: value }),
        placeholder: 'Jane'
      }),
      lastName: {
        type: FormItemModel.Type.LabeledText,
        label: 'Last Name',
        value: data.lastName,
        onValueChange: value => updateData({ ...data, lastName: value }),
        placeholder: 'Doe'
      },
      email: {
        type: FormItemModel.Type.LabeledText,
        label: 'Email',
        value: data.email,
        onValueChange: value => updateData({ ...data, email: value }),
        placeholder: 'jane.doe@gmail.com'
      },
      message: {
        type: FormItemModel.Type.TextArea,
        value: data.message,
        placeholder: 'Message',
        onValueChange: value => updateData({ ...data, message: value }),
        style: { height: '10em' },
      }
    },
    rows: [
      ['firstName', 'lastName'],
      ['email'],
      ['message']
    ]
  };

  let sendWord = 'Send';
  switch (state.type) {
    case State.Type.Sending:
      sendWord = 'Sending...';
      break;
    case State.Type.Sent:
      sendWord = 'Sent!';
      break;
  }

  return (
    <>
      <Container>
        <FormComponent form={form} split={width < 768} disabled={state.type === State.Type.Sending} />
        <ButtonContainer>
          <SubmitButton disabled={state.type !== State.Type.Complete} onClick={() => {
            setState(State.SENDING);
            fetch(CONTACT_URL, {
              body: JSON.stringify(data),
              method: 'POST',
            }).then(() => {
              setState(State.SENT);
            }).catch(err => {
              setState(State.error({ error: err.message, prev: state }));
            });
          }}>
            <FontAwesomeIcon icon={faPaperPlane} /> {sendWord}
          </SubmitButton>
        </ButtonContainer>
      </Container>
      {state.type === State.Type.Error && (
        <Overlay onClick={() => setState(state.prev)}>
          <div>
            <h1>Unable to send</h1>
            <Paragraph>This error may be caused by a corporate firewall or an internal server error. Please email me at {EMAIL} instead.</Paragraph>
            <Paragraph>{state.error}</Paragraph>
          </div>
        </Overlay>
      )}
    </>
  );
};

export default Contact;
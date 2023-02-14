import Paragraph from '@/ui/primitives/Paragraph';
import { styled } from 'styletron-react';

const Container = styled('footer', {
  textAlign: 'center',
  fontSize: '16px',
  marginTop: '32px',
  color: 'white',

});

const Footer = () => {
  return (
    <Container>
      <Paragraph>
        Copyright &copy; 2023 betabot LLC
      </Paragraph>
    </Container>
  );
};

export default Footer;
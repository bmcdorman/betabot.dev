import { styled } from 'styletron-react';

const Container = styled('footer', {
  textAlign: 'center',
  fontSize: '16px',
  marginTop: '32px',
});

const Footer = () => {
  return (
    <Container>
      <p>
        Copyright &copy; 2023 betabot LLC
      </p>
    </Container>
  );
};

export default Footer;
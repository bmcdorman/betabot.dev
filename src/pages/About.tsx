import Paragraph from '@/ui/primitives/Paragraph';
import { Link } from 'react-router-dom';
import { styled } from 'styletron-react';

const Container = styled('div', {
  
});

const About = () => {
  return (
    <Container>
      <Paragraph>
        betabot is owned and operated by Braden McDorman, an expert software engineer,
        entrepreneur, and startup advisor with 20 years of experience building software
        and robots. Braden is the former co-founder and CTO of Semio, a social robotics
        startup that he is still active in advising and consulting with.
      </Paragraph>
    </Container>
  );
};

export default About;
import Paragraph from '@/ui/primitives/Paragraph';
import { Link } from 'react-router-dom';
import { styled } from 'styletron-react';

const Container = styled('div', {
  
});

const Home = () => {
  return (
    <Container>
      <Paragraph>
        betabot brings expert-level consulting and contracting services to a number of software disciplines, including:
        <ul>
          <li>Robotics</li>
          <li>Web Applications</li>
          <li>Desktop Applications</li>
          <li>Cloud/DevOps</li>
        </ul>
      </Paragraph>
      <Paragraph>
        Braden McDorman, the owner of betabot, has over 20 years of software engineering experience in a wide range of fields, and early-stage startup to Fortune 100 level experience.
        We can build a robust and customer-driven solution to your problem from the ground up, or advise an existing project.
      </Paragraph>
    </Container>
  );
};

export default Home;
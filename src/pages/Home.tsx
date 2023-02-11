import { Link } from 'react-router-dom';
import { styled } from 'styletron-react';

const Container = styled('div', {
  
});

const Paragraph = styled('p', {
  marginTop: '1em'
});

const Home = () => {
  return (
    <Container>
      <h1>Home</h1>
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
        betabot has over 20 years of software engineering experience in a wide range of fields and early-stage startup to Fortune 100 level experience.
        We can build a robust and customer-driven solution to your problem from the ground up, or advise an existing project.
      </Paragraph>
      <Paragraph>
        While our services may be more expensive than the competition, our quality of work, customer service,
        and satisfaction guarantee will leave our clients delighted.
      </Paragraph>
      <Paragraph>
        betabot is currently accepting new clients. Please <Link to='/contact'>contact us</Link> to see how we can help!
      </Paragraph>
    </Container>
  );
};

export default Home;
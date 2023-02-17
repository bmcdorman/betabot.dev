import * as React from 'react';
import { styled } from 'styletron-react';


const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
});

const UnderConstruction = () => {
  return (
    <Container>
      <h2>Under Construction</h2>
    </Container>
  );
};

export default UnderConstruction;
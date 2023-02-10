import StyleProps from '@/ui/util/StyleProps';
import * as React from 'react';
import { styled } from 'styletron-react';

export interface TitleProps extends StyleProps {

}

type Props = TitleProps;

const LOGO = `
### ### ### ###
# # #    #  # #
### ###  #  ###
# # #    #  # #
### ###  #  # #
`;

const Container = styled('h1', {
  fontFamily: `'Fira Mono', monospace`,
  textAlign: 'center',
  fontSize: 'inherit',
  padding: 0,
  margin: 0,
});

const Title = ({ style, className }: Props) => (
  <Container style={style} className={className}>
    betabot
  </Container>
);

export default Title;
import * as React from 'react';
import styled from "styled-components"
import { Box, Heading } from 'rebass/styled-components'
import MastheadSVG from '@assets/svg/masthead-circles.svg'

interface IGreetingMastheadProps {
  className: string
}

const GreetingMasthead: React.FunctionComponent<IGreetingMastheadProps> = ({className}) => {
  return(
  <section className={className}>
    <Box mb={4}>
      <Heading variant="label" textAlign="right" mb={2}>はじめまして</Heading>
        <Heading
          fontSize={[3, 4, 7]} textAlign="right">
          Hey I'm Ryosuke ✌️<br />
          Designer, developer,<br />
          &amp; influencer 💭
      </Heading>
    </Box>
    <Box mb={4}>
      <Heading variant="label" textAlign="right">わたし</Heading>
        <Heading
          fontSize={[2, 3, 5]} textAlign="right">
          full stack engineer<br />
          UI/UX designer 
      </Heading>
    </Box>
    <Box mb={4}>
        <Heading
          fontSize={[2, 3, 5]} textAlign="right" mb={2}>
          Los Angeles
      </Heading>
      <Heading variant="label" textAlign="right">`に住んでいる</Heading>
    </Box>
    <Box mb={4}>
      <Heading variant="label" textAlign="right" mb={2}>I live for </Heading>
        <Heading
          fontSize={[1,2]} textAlign="right">
          clean design, <br />
          accessible UX,<br />
          &amp; cutting-edge tech
      </Heading>
    </Box>
  </section>
  )
};


const StyledGreetingMasthead = styled(GreetingMasthead)`
  padding:4rem;
  border-bottom:1px solid ${(props) => props.theme.colors.black};

  background-image:url(${MastheadSVG});
  background-repeat:no-repeat;

  ${(props) => props.theme.mediaQueries.mobile} {
    background-size:150%;
    background-position:30% 30%;
  }

  ${(props) => props.theme.mediaQueries.tablet} {
    background-size:75%;
    background-position:-30% 30%;
  }
`

export default StyledGreetingMasthead;

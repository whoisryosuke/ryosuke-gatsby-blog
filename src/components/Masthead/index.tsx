import * as React from 'react';
import styled from "styled-components"
import { Heading } from 'rebass/styled-components'

interface IMastheadProps {
  className: string
}

const Masthead: React.FunctionComponent<IMastheadProps> = ({className}) => {
  return(
  <section className={className}>
    <span>誰ですか</span>
    <Heading>
      Hey I'm Ryosuke ✌️<br />
      Designer, developer,<br />
      &amp; influencer 💭
    </Heading>
  </section>
  )
};


const StyledMasthead = styled(Masthead)`
  padding:4rem;
`

export default StyledMasthead;

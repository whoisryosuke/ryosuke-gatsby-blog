import * as React from 'react';
import styled from "styled-components"
import { Heading } from 'rebass/styled-components'

interface IMastheadProps {
  className: string
}

const Masthead: React.FunctionComponent<IMastheadProps> = ({className}) => {
  return(
  <section className={className}>
    <Heading fontSize={[1,2,3]}>誰ですか</Heading>
      <Heading
        fontSize={[5, 6, 7]}>
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

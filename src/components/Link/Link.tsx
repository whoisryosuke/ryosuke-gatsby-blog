import * as React from 'react'
import GLink from 'gatsby-link'
import styled from 'styled-components'
import {Box} from 'rebass/styled-components'

const StyledLink = styled(GLink)`
  border-bottom:0;
  ${props => props.border && `
    border-bottom:1px;
  `}
`

interface Props {
  children: React.Node[],
  to: string,
}

export const Link: React.FC<Props> = ({children, to}) => {
  
  return (
    <StyledLink to={to}>
      {children}
    </StyledLink>
  )
}

export default Link
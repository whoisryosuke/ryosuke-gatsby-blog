import * as React from 'react';
import styled from 'styled-components'
import { Box } from 'rebass/styled-components'

const StyledCard = styled(Box)`
  box-shadow:none;
  border:1px solid #111212;
  padding:2.5em;
`

interface IBaseCardProps {
  children: JSX.Element
}

const BaseCard: React.FunctionComponent<IBaseCardProps> = ({children, ...props}) => {
  return(
    <StyledCard {...props}>
      {children}
    </StyledCard>
  )
};

export default BaseCard;

import * as React from 'react';
import styled from 'styled-components'

const StyledCard = styled.article`
  box-shadow:none;
  border:1px solid #111212;

  ${(props) => props.cols && `width:${100/parseInt(props.cols)}%;`}

  @media(max-width:${(props) => props.theme.breakpoints[0]}) {
    width:100%;
  }
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

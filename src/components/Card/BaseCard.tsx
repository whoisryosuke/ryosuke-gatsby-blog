import * as React from 'react';
import styled from 'styled-components'
import { Box } from 'rebass/styled-components'

const StyledCard = styled(Box)`
  box-shadow:none;
  border:1px solid #111212;
  padding:2.5em;
  background: linear-gradient(180deg, ${(props) => props.theme.colors.white} 0%, ${(props) => props.theme.colors.white} 100%);
  position:relative;
  z-index:10;

  transition: all 200ms linear;


  ${(props) => props.hover && `
    &:hover {
      color:#FFF;
    }

    &::before {
      content: '';
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      z-index:1;

      background: linear-gradient(180deg, rgba(0, 210, 255, 0.7) 0%, #6D59F0 100%);

      opacity:0;
      transition: opacity 300ms linear;
    }
    &:hover::before {
      opacity:1;
    }

    & * {
      position:relative;
      z-index:10;
    }
  `}
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

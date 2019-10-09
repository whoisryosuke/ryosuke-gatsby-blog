import * as React from 'react';
import Link from 'gatsby-link'
import styled from 'styled-components'
import { Box } from 'rebass/styled-components'

const StyledLink = styled(Link)`
    text-decoration:none;
    color:${(props) => props.theme.colors.black}
`

const StyledCard = styled(Box)`
  border-width:1px 1px 1px 1px;
  border-style: solid;
  border-color: ${(props) => props.theme.colors.black};
  box-shadow:none;
  padding:2.5em;
  background: ${(props) => props.theme.colors.white};
  position:relative;
  z-index:10;

  transition: all 200ms linear;

  &:hover {
    background: ${(props) => props.theme.colors.muted};
    border-bottom:2px inset ${(props) => props.theme.colors.primary};
  }

  ${(props) => props.solid && `
    border-width:1px 1px 1px 1px !important;
    box-shadow: 15px 15px 35px rgba(0, 160, 254, 0.5);
    transform:translateY(0);
    transition:all 400ms ease-in;

    &:hover {
      background: ${(props) => props.theme.colors.white};
      transform:translateY(-0.2em);
      box-shadow: 15px 15px 35px rgba(0, 160, 254, 0.5), 7px 7px 15px #00BBFF;
      border-color:${(props) => props.theme.colors.black};
    }

  `}

  ${(props) => props.theme.mediaQueries.mobile} {
    border-width:0 0 1px 0;
    
    &:last-child, &:nth-child(2n) {
      border-width:0 0 1px 0;
      
      &:hover {
        border-width:0 0 2px 0;
      }

    }
  }
  ${(props) => props.theme.mediaQueries.tablet} {
    border-width:0 0 1px 0;

    &:last-child, &:nth-child(2n) {
      border-width:0 0 1px 1px;
      
      &:hover {
        border-width:0 0 2px 1px;
      }
    }
  }
`

interface IBaseCardProps {
  children: JSX.Element
}

const BaseCard: React.FunctionComponent<IBaseCardProps> = ({children, link, ...props}) => {
  if(link) {
    return(
      <StyledCard {...props}>
        <StyledLink to={link}>
          {children}
        </StyledLink>
      </StyledCard>
    )
  }
  return(
    <StyledCard {...props}>
      {children}
    </StyledCard>
  )
};

export default BaseCard;

import * as React from 'react';
import Link from 'gatsby-link'
import styled from 'styled-components'
import { Box } from 'rebass/styled-components'

const StyledLink = styled(Link)`
    text-decoration:none;
    color:${(props) => props.theme.colors.black};
    border-bottom:0;
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
  ${props => props.cols == 2 && `
  ${props.theme.mediaQueries.mobile} {
    border-width:0 0 1px 0;
    
    &:last-child, &:nth-child(2n) {
      border-width:0 0 1px 0;
      
      &:hover {
        border-width:0 0 2px 0;
      }

    }
  }
  ${props.theme.mediaQueries.tablet} {
    border-width:0 0 1px 0;

    &:last-child, &:nth-child(2n) {
      border-width:0 0 1px 1px;
      
      &:hover {
        border-width:0 0 2px 1px;
      }
    }
  }
  `}

  ${props => props.cols == 3 && `
  ${props.theme.mediaQueries.mobile} {
    border-width:0 0 1px 0;
    
    &:last-child, &:nth-child(3n-1), &:nth-child(3n) {
      border-width:0 0 1px 0;
      
      &:hover {
        border-width:0 0 2px 0;
      }

    }
    &:not(:nth-child(3n)):last-child {
      border-right:1px;
    }
  }
  ${props.theme.mediaQueries.tablet} {
    border-width:0 0 1px 0;

    &:last-child, &:nth-child(3n-1), &:nth-child(3n) {
      border-width:0 0 1px 1px;
      
      &:hover {
        border-width:0 0 2px 1px;
      }
    }
    &:not(:nth-child(3n)):last-child {
      border-right:1px;
    }
  }
  `}

`

interface IBaseCardProps {
  children: JSX.Element
}

const BaseCard: React.FunctionComponent<IBaseCardProps> = ({children, link, href, ...props}) => {
  const LinkComponent = link ? Link : 'a';
  if(link || href) {
    return(
      <StyledCard {...props}>
        <StyledLink as={LinkComponent} to={link} href={href}>
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

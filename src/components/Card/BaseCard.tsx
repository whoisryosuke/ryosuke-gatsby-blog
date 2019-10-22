import * as React from 'react';
import Link from 'gatsby-link'
import styled from 'styled-components'
import { Box } from 'rebass/styled-components'

const StyledLink = styled(Link)`
    text-decoration:none;
    color:${(props) => props.theme.colors.black};
    border-bottom:0;

    &:hover {
      color:${(props) => props.theme.colors.black};
    }
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
    box-shadow: ${props.theme.shadows.card.light};
    transform:translateY(0);
    transition:all ${(props) => props.theme.animation.default};

    &:hover {
      background: ${props.theme.colors.white};
      transform:translateY(-0.2em);
      box-shadow: ${props.theme.shadows.card.light}, ${props.theme.shadows.card.dark};
      border-color:${props.theme.colors.black};
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

    &:last-child, &:nth-child(2n-1) {
      border-width:0 1px 1px 0;
      
      &:hover {
        border-width:0 1px 2px 0;
      }
    }
  }

  ${(props) => props.theme.mediaQueries.desktop} {
    border-width:0 0 1px 0;

    &:last-child, &:nth-child(2n-1) {
      border-width:0 0 1px 0;
    }
    &:last-child, &:nth-child(3n + 1) {
      border-width:0 0 1px 0;
    }

    &:last-child, &:nth-child(3n-1), &:nth-child(3n-2) {
      border-width:0 1px 1px 0;
      
      &:hover {
        border-width:0 1px 2px 0;
      }
    }
    &:not(:nth-child(3n)):last-child {
      border-width:0 1px 1px 0;
    }
  }

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

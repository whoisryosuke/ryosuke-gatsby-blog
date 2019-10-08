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

  ${(props) => props.grid && `
  ${(props) => props.theme.mediaQueries.tablet} {
    border-width:0 0 1px 0;
  }

  &:last-child {
    border-width:0 0 1px 1px;
  }`}
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

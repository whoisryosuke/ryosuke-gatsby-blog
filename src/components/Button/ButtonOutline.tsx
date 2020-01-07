import React from 'react'
import styled from 'styled-components'
import { Button } from 'rebass/styled-components'

const StyledButton = styled(Button)`
  position: relative;
  display: inline-block;
  transition: all 400ms ease-out;

  & > span {
    position: relative;
    z-index: 2;
  }

  &:hover,
  :focus {
    color: ${props => props.theme.colors.white};
    border-color: ${props => props.theme.colors.primary};
  }

  &:before {
    content: '';
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    background: ${props => props.theme.colors.primary};
    transform-origin: 0 50%;
    transform: scaleX(0);
    z-index: 1;
    transition: transform 300ms ease-out;
  }

  &:hover:before,
  :focus:before {
    transform: scaleX(1);
  }

  &:active:before {
    background: ${props => props.theme.colors.secondary};
    transform: scaleX(1);
  }
`

interface Props {
  children: React.node[]
}

export const ButtonOutline: React.FC<Props> = ({ as, children, ...props }) => {
  return (
    <StyledButton as={as} variant="outline" {...props}>
      <span>{children}</span>
    </StyledButton>
  )
}

export default ButtonOutline

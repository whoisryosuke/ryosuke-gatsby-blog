import React from 'react'
import styled from 'styled-components'
import {
  compose,
  space,
  layout,
  typography,
  color,
  flexbox,
} from 'styled-system'
import css, { get } from '@styled-system/css'

const sx = props => css(props.sx)(props.theme)

const StyledButton = styled.button`
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.black};
  appearance: none;
  text-align: center;
  line-height: inherit;
  text-decoration: none;
  font-size: inherit;
  border: 1px solid ${props => props.theme.colors.black};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
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

  ${sx}
  ${compose(space, layout, typography, color, flexbox)}
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

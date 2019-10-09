import React from 'react'
import styled from 'styled-components'
import {Button} from 'rebass/styled-components'

const StyledButton = styled.button`

    position:relative;
    display:inline-block;
    transition:all 400ms ease-out;

    &:hover, :focus {
      color:${(props) => props.theme.colors.white};
      border-color:${(props) => props.theme.colors.primary};
    }


    &:after {
      content:'';
      width:100%;
      height:100%;
      display:block;
      position:absolute;
      top: 0;
      left: 0;
      background:${(props) => props.theme.colors.primary};
      transform-origin: 0 50%;
      transform: scaleX(0);
      z-index: -1; 
      transition:transform 300ms ease-out;
    }

    &:hover:after, :focus:after {
      transform: scaleX(1);
    }

    &:active:after {
      background:${(props) => props.theme.colors.secondary};
      transform: scaleX(1);
    }
`

interface Props {
  children: React.node[]
}

export const ButtonOutline: React.FC<Props> = ({children, ...props}) => {
  return (
    <Button as={StyledButton} variant="outline" {...props}>
      {children}
    </Button>
  )
}

export default ButtonOutline
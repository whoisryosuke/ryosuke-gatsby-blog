import * as React from 'react'
import styled from 'styled-components'

interface IIconProps {
  width?: string
  height?: string
  viewBox?: string
  children: React.ReactNode
  className?: string
}

const Icon: React.FunctionComponent<IIconProps> = ({
  width,
  height,
  viewBox,
  children,
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox={viewBox}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      {children}
    </svg>
  )
}

Icon.defaultProps = {
  width: '30',
  height: '30',
  viewBox: '0 0 30 30',
}

const StyledIcon = styled(Icon)`
  & g,
  & path,
  & circle {
    fill: ${props => props.theme.colors.black};
  }

  & .invert {
    fill: ${props => props.theme.colors.white};
  }
`

export default StyledIcon

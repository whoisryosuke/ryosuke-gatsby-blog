import * as React from 'react'
import GLink from 'gatsby-link'
import styled from 'styled-components'
import {
  compose,
  space,
  layout,
  typography,
  color,
  flexbox,
} from 'styled-system'

const Link = styled(GLink)(
  {
    borderBottom: '0',
    display: 'block',
    boxSizing: 'border-box',
    margin: 0,
    minWidth: 0,
  },
  props => props.css,
  props =>
    props.border && {
      borderBottom: '1px',
    },
  compose(space, layout, typography, color, flexbox)
)

interface Props {
  border: boolean
  children: React.Node[]
  to: string
}

export default Link

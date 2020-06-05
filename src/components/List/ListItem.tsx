import React from 'react'
import styled from 'styled-components'
import { Text } from 'rebass/styled-components'

interface Props {}

const ListItem = ({ children, className }) => (
  <li className={className}>
    <Text variant="list">{children}</Text>
  </li>
)

const StyledListItem = styled(ListItem)`
  list-style: square;
  margin-bottom: ${(props) => props.theme.space[3]}px;

  & ul {
    margin-top: ${(props) => props.theme.space[3]}px;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`

export default StyledListItem

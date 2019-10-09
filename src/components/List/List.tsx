import React from 'react'
import styled from 'styled-components'
import {Box} from 'rebass/styled-components'

import ListItem from "./ListItem"

interface Props {
  items: string[]
}

export const List: React.FC<Props> = ({children, items}) => {
  
  return (
    <Box as="ul" p={3}>
      {items && items.map(item => <ListItem>{item}</ListItem>)}
      {children}
    </Box>
  )
}

export default List
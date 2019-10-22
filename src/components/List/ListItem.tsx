import React from 'react'
import styled from 'styled-components'
import {Text} from 'rebass/styled-components'

interface Props {
  
}

const ListItem = ({children, className}) => <li className={className}><Text variant="list">{children}</Text></li> 

const StyledListItem = styled(ListItem)`
    list-style:square;
`

export default StyledListItem
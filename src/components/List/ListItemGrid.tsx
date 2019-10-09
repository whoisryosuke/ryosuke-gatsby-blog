import React from 'react'
import styled from 'styled-components'
import {Text} from 'rebass/styled-components'

interface Props {
  
}

const ListItemGrid = ({children, className}) => <li className={className}><Text variant="list">{children}</Text></li> 

const StyledListItemGrid = styled(ListItemGrid)`
    list-style:none;
    display:inline-block;
    border-width:0 1px 1px 0;
    border-style: solid;
    border-color: ${(props) => props.theme.colors.black};
    
    &:last-child {
        border-right:1px solid;
    }
    
  }
`

export default StyledListItemGrid
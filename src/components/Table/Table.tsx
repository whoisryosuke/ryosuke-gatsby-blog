import React from 'react'
import styled from 'styled-components'

const StyledTable = styled.table`
  width: 100%;
  background: #fff;
  margin: 1em 0;
  border: 1px solid ${props => props.theme.colors.black};
  -webkit-box-shadow: none;
  box-shadow: none;
  text-align: left;
  color: ${props => props.theme.colors.black};
  border-collapse: separate;
  border-spacing: 0;

  & tr {
    border-bottom: 1px solid ${props => props.theme.colors.black};

    & th,
    & td {
      border-top: 1px solid ${props => props.theme.colors.black};
    }

    &:first-child {
      & th,
      & td {
        border-top: none;
      }
    }
  }
  & th {
    cursor: auto;
    background: ${props => props.theme.colors.muted};
    text-align: inherit;
    color: ${props => props.theme.colors.black};
    padding: 0.92857143em 0.78571429em;
    vertical-align: inherit;
    font-style: none;
    font-weight: 700;
    text-transform: none;
    border-bottom: 1px solid ${props => props.theme.colors.black};
    border-left: none;
  }
  & td,
  & th {
    border-left: 1px solid ${props => props.theme.colors.black};
    padding: ${props => props.theme.space[3]}px;

    &:first-child {
      border-left: none;
    }
  }

  ${props => props.size === 'small' && `font-size:0.8em;`}
`

interface Props {
  children: React.Node[]
}

const Table: React.FC<Props> = ({ children }) => {
  return <StyledTable>{children}</StyledTable>
}

export default Table

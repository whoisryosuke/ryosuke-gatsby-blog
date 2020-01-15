import React, { Fragment } from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import * as rebass from 'rebass/styled-components'

import { DarkTheme, LightTheme } from '@assets/themes/'
import { useThemeValue } from '../context/ThemeContext'

import List from '@components/List/List'
import ListItem from '@components/List/ListItem'
import { CodeBlock } from '@components/CodeBlock/CodeBlock'
import { Table } from '@components/Table'

const GlobalStyle = createGlobalStyle`
  html, body {
    font-family: Arial, Helvetica, sans-serif;
    margin:0;
    background: ${({ theme }) => theme.colors.background}
    color: ${({ theme }) => theme.colors.text}
  }

  h1,h2,h3,h4,h5 {
    font-family: ${props => props.theme.fonts.heading};
  }
  
  a {
    color: ${props => props.theme.colors.black};
    border-bottom:1px solid ${props => props.theme.colors.black};
    text-decoration:none;
  }

  a:hover {
    color: ${props => props.theme.colors.primary};
    border-color: ${props => props.theme.colors.primary};
  }

  p+ul {
    margin-top:-1em;
  }
`

export type ThemeMode = 'dark' | 'light'

export const THEME_OPTIONS = {
  DARK: 'dark',
  LIGHT: 'light',
}

export const ThemeOptions = {
  [THEME_OPTIONS.DARK]: DarkTheme,
  [THEME_OPTIONS.LIGHT]: LightTheme,
}

export const UIComponents = {
  h1: props => <rebass.Heading variant="heading" {...props} />,
  h2: props => <rebass.Heading variant="subheader" {...props} />,
  h3: props => <rebass.Heading variant="h3" {...props} />,
  h4: props => <rebass.Heading variant="h4" {...props} />,
  p: props => <rebass.Text as="p" variant="paragraph" {...props} />,
  hr: props => <rebass.Box as="hr" variant="hr" {...props} />,
  ul: List,
  li: ListItem,
  pre: props => <div {...props} />,
  code: CodeBlock,
  table: Table,
  ...rebass,
}

export const Theme = ({ children }) => {
  const [{ theme, selectedTheme }, dispatch] = useThemeValue()
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <GlobalStyle />
        {children}
      </Fragment>
    </ThemeProvider>
  )
}

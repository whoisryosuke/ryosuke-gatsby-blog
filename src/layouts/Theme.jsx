// @ts-check

/**
 * Since this file is shared with NetlifyCMS it must be .jsx
 */

import React, { Fragment } from "react"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"
import * as rebass from "rebass/styled-components"

import theme from "../assets/theme"

import { CodeBlock } from "../components/CodeBlock/CodeBlock"

const GlobalStyle = createGlobalStyle`
  html, body {
    font-family: Arial, Helvetica, sans-serif;
    margin:0;
  }

  h3 {
    font-family: Arial, Helvetica, sans-serif
  }
`

export const LayoutComponents = {
  h1: styled.h1`
    font-size: 20px;
  `,
  p: styled.p`
    font-size: 16px;
  `,
}

export const UIComponents = {
  pre: props => <div {...props} />,
  code: CodeBlock,
  ...rebass
}

export const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <GlobalStyle />
      {children}
    </Fragment>
  </ThemeProvider>
)
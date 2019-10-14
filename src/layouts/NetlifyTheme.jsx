// @ts-check

/**
 * Since this file is shared with NetlifyCMS it must be .jsx
 */

import React, { Fragment } from "react"
import { ThemeProvider, createGlobalStyle } from "styled-components"
import * as rebass from "rebass/styled-components"

import theme from "../assets/theme"

const GlobalStyle = createGlobalStyle`
  html, body {
    font-family: Arial, Helvetica, sans-serif;
    margin:0;
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

export const NetlifyComponents = {
  ...rebass,
  h1: props => <rebass.Heading variant="heading" {...props} />,
  h2: props => <rebass.Heading variant="subheader" {...props} />,
  h3: props => <rebass.Heading variant="h3" {...props} />,
  h4: props => <rebass.Heading variant="h4" {...props} />,
  p: props => <rebass.Text as="p" variant="paragraph" {...props} />,
  hr: props => <rebass.Box as="hr" variant="hr" {...props} />,
  pre: props => <div {...props} />,
}

export const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <GlobalStyle />
      {children}
    </Fragment>
  </ThemeProvider>
)
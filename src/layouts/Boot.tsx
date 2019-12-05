import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import ThemeProvider from '../context/providers'
import { UIComponents, Theme } from './Theme'

export const Boot: React.SFC<{ element: any }> = ({ element }) => {
  return (
    <MDXProvider components={UIComponents}>
      <ThemeProvider>
        <Theme>{element}</Theme>
      </ThemeProvider>
    </MDXProvider>
  )
}

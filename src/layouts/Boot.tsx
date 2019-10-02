import { MDXProvider } from "@mdx-js/react"
import React from "react"
import { UIComponents, Theme } from "./Theme"

export const Boot: React.SFC<{ element: any }> = ({ element }) => {
  return (
    <MDXProvider components={UIComponents}>
      <Theme>{element}</Theme>
    </MDXProvider>
  )
}
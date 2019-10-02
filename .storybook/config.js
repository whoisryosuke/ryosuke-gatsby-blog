import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { withA11y } from "@storybook/addon-a11y";
import { ThemeProvider } from "styled-components"
import theme from "../src/assets/theme"

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => { },
  hovering: () => { },
}
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = ""
// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = pathname => {
  action("NavigateTo:")(pathname)
}

// Add a11y support
addDecorator(withA11y);

addParameters({
  a11y: {
    config: {},
    options: {
      checks: { "color-contrast": { options: { noScroll: true } } },
      restoreScroll: true
    }
  },
  options: {
    hierarchyRootSeparator: /\|/
  }
});

// Rebass / Styled Components theme provider wraps app
addDecorator((story) => (
  <ThemeProvider theme={theme}>
    {story()}
  </ThemeProvider>
))

configure(require.context('../src', true, /\.stories$/), module);
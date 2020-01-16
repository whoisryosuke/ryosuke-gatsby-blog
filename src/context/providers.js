import React from 'react'
import { ThemeProvider } from './ThemeContext'
import { ThemeOptions, THEME_OPTIONS } from '../layouts/Theme'

export default ({ children }) => {
  let initialTheme = 'light'
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    initialTheme = 'dark'
  }
  const initialState = {
    theme: ThemeOptions.light,
    selectedTheme: initialTheme,
  }
  const reducer = (state, action) => {
    switch (action.type) {
      case THEME_OPTIONS.DARK:
        return {
          ...state,
          theme: ThemeOptions[THEME_OPTIONS.DARK],
          selectedTheme: THEME_OPTIONS.DARK,
        }
      case THEME_OPTIONS.LIGHT:
        return {
          ...state,
          theme: ThemeOptions[THEME_OPTIONS.LIGHT],
          selectedTheme: THEME_OPTIONS.LIGHT,
        }

      default:
        return state
    }
  }
  return (
    <ThemeProvider initialState={initialState} reducer={reducer}>
      {children}
    </ThemeProvider>
  )
}

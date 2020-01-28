import React, { createContext, useContext, useReducer } from 'react'
import { ThemeContext as StyledThemeContext } from 'styled-components';
export const ThemeContext = createContext()
export const ThemeProvider = ({ reducer, initialState, children }) => (
  <ThemeContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </ThemeContext.Provider>
)
export const useThemeValue = () => useContext(ThemeContext)
export const useTheme = () => useContext(StyledThemeContext)

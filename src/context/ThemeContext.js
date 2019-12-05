import React, { createContext, useContext, useReducer } from 'react'
export const ThemeContext = createContext()
export const ThemeProvider = ({ reducer, initialState, children }) => (
  <ThemeContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </ThemeContext.Provider>
)
export const useThemeValue = () => useContext(ThemeContext)

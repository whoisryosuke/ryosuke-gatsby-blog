import defaultTheme, { fonts } from './default'

export const colors = {
  text: '#FFF',
  background: '#000',
  primary: '#005CDD',
  secondary: '#6D59F0',
  muted: '#060609',
  gray: '#D3D7DA',
  highlight: 'hsla(205, 100%, 40%, 0.125)',
  white: '#000',
  black: '#EEE',
}

export const gradients = {
  subtle: `linear-gradient(180deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
  purple: `linear-gradient(180deg, ${colors.primary} 0%, #A000C4 100%)`,
  blue: `linear-gradient(180deg, #00D2FF 0%, ${colors.secondary} 100%)`,
}

const theme = {
  ...defaultTheme,
  colors,
  gradients,
  shadows: {
    card: {
      light: '15px 15px 35px rgba(0, 127, 255, 0.5)',
      dark: `7px 7px 15px ${colors.primary}`,
    },
  },
  // rebass variants
  text: {
    paragraph: {
      fontFamily: fonts.body,
      lineHeight: '1.75',
      fontSize: [1, 2],
      marginBottom: 4,
      color: colors.black,
      '& code': {
        py: 1,
        px: 2,
        mx: 1,
        border: '1px solid',
        borderColor: 'black',
        backgroundColor: 'rgb(1, 22, 39)',
        color: 'rgb(214, 222, 235)',
      },
    },
  },
}

export default theme

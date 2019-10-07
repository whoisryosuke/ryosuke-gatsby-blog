// const border = {
//   color: "rgba(34, 36, 38, 0.15)",
//   strong: "rgba(34, 36, 38, 0.22)",
//   internal: "rgba(34, 36, 38, 0.1)",
//   selected: "rgba(34, 36, 38, 0.35)",
//   strongSelected: "rgba(34, 36, 38, 0.5)",
//   disabled: "rgba(34, 36, 38, 0.5)",

//   solidInternal: "#FAFAFA",
//   solidBorder: "#D4D4D5",
//   solidSelected: "#BCBDBD"
// };

// const colors = {
//   offBlack: "#111",
//   fullBlack: "#000000",
//   offWhite: "#F9FAFB",
//   darkWhite: "#F3F4F5",
//   midWhite: "#DCDDDE",
//   white: "#FFFFFF",

//   red: "#DB2828",
//   orange: "#F2711C",
//   yellow: "#FBBD08",
//   olive: "#B5CC18",
//   green: "#21BA45",
//   teal: "#00B5AD",
//   blue: "#2185D0",
//   violet: "#6435C9",
//   purple: "#A333C8",
//   pink: "#E03997",
//   brown: "#A5673F",
//   grey: "#767676",

//   primary: "#CC2029",
//   secondary: "purple",

//   disabled: "rgba(40, 40, 40, 0.3)",
//   disabledInverted: "rgba(225, 225, 225, 0.3)",

//   positive: {
//     color: "green",
//     background: "#FFF6F6",
//     border: "#A3C293",
//     header: "#1A531B",
//     text: "#2C662D"
//   },
//   negative: {
//     color: "red",
//     background: "#FFF6F6",
//     border: "#E0B4B4",
//     header: "#912D2B",
//     text: "#9F3A38"
//   },
//   info: {
//     color: "#31CCEC",
//     background: "#F8FFFF",
//     border: "#A9D5DE",
//     header: "#0E566C",
//     text: "#276F86"
//   },
//   warning: {
//     color: "#F2C037",
//     background: "#C9BA9B",
//     border: "#FFFAF3",
//     header: "#794B02",
//     text: "#573A08"
//   },

//   brand: {
//     facebook: "#3B5998",
//     twitter: "#55ACEE",
//     googleplus: "#DD4B39",
//     linkedin: "#1F88BE",
//     youtube: "#FF0000",
//     pinterest: "#BD081C",
//     instagram: "#49769C"
//   }
// };

// const textColors = {
//   red: colors.red,
//   blue: colors.blue
// };

// const sizes = {
//   mini: 11 / 14,
//   tiny: 12 / 14,
//   small: 13 / 14,
//   medium: 14 / 14,
//   large: 16 / 14,
//   big: 18 / 14,
//   huge: 20 / 14,
//   massive: 24 / 14
// };

// const page = {
//   background: colors.white,
//   lineHeight: "1.4285em"
// };

// const theme = {
//   background: "#000",
//   borderColor: "#BF67AD",
//   typography: {
//     // Color of default text
//     color: colors.offBlack,
//     fonts: {
//       header: `"Heebo", Arial, Helvetica, sans-serif`,
//       page: `"Heebo", Arial, Helvetica, sans-serif`
//     },
//     // The font sizes
//     size: {
//       // Controls all em references
//       em: "14px",
//       // Base page font
//       page: "14px"
//     },

//     heading: {
//       weight: weight.bold,
//       lineHeight: "1.5em",

//       h1: `${28 / 14}rem`,
//       h2: `${24 / 14}rem`,
//       h3: `${18 / 14}rem`,
//       h4: `${15 / 14}rem`,
//       h5: `${14 / 14}rem`
//     },

//     paragraph: {
//       margin: "0em 0em 1em",
//       lineHeight: page.lineHeight
//     }
//   },
//   borderRadius: "4px",

//   links: {
//     color: colors.primary,
//     underline: "none",
//     hoverColor: colors.primary
//   },

//   // Form input
//   input: {
//     background: colors.white,
//     color: colors.offBlack,
//     placeholderColor: "#222",
//     placeholderFocusColor: "#333",

//     verticalPadding: "11px",
//     horizontalPadding: "14px",
//     inputPadding: "11px 14px",
//     lineHeight: `${17 / 14}em`,

//     focused: {
//       borderColor: "#85B7D9",
//       mutedBorderColor: "#96C8DA"
//     }
//   },

//   // Grid
//   columnCount: 16,

//   // Opacities
//   opacity: {
//     disabled: "0.45"
//   },

//   // Animation
//   animation: {
//     duration: "400ms",
//     easing: "ease"
//   },

//   // Breakpoints
//   breakpoints: {
//     mobile: "320px",
//     tablet: "768px",
//     computer: "992px",
//     desktop: "1200px",
//     widescreen: "1920px"
//   },

//   icons: {
//     width: "1.18em"
//   },

//   // Shadows
//   shadows: {
//     subtle: `0px 1px 2px 0 ${border.color}`,
//     floatingShadow: `
//   0px 2px 4px 0px rgba(34, 36, 38, 0.12),
//   0px 2px 10px 0px rgba(34, 36, 38, 0.15)
//   `,
//     floatingShadowHover: `
//   0px 2px 4px 0px rgba(34, 36, 38, 0.15),
//   0px 2px 10px 0px rgba(34, 36, 38, 0.25)
//     `
//   },

//   // Import any external objects for easy access
//   colors,
//   textColors,
//   hoverColors,
//   focusColors,
//   downColors,
//   activeColors,
//   weight,
//   sizes,
//   border,
//   page,
//   grid
// };

const breakpoints = [
  // mobile
  "320px",
  // tablet
  "768px",
  // computer
  "992px",
  // desktop
  "1200px",
  // widescreen
  "1920px"
]

const colors = {
  text: '#000',
  background: '#fff',
  primary: '#07c',
  secondary: '#30c',
  muted: '#f6f6f9',
  gray: '#dddddf',
  highlight: 'hsla(205, 100%, 40%, 0.125)',
  white: '#FFF',
  black: '#000',
}

const fonts = {
  body: 'Roboto, Helvetiva Neue, Helvetica, Aria, sans-serif',
  heading: 'Poppins, Helvetiva Neue, Helvetica, Aria, sans-serif',
  monospace: 'Menlo, monospace',
}

const theme = {
  breakpoints,
  mediaQueries: {
    mobile: `@media screen and (min-width: ${breakpoints[0]})`,
    tablet: `@media screen and (min-width: ${breakpoints[1]})`,
    computer: `@media screen and (min-width: ${breakpoints[2]})`,
    desktop: `@media screen and (min-width: ${breakpoints[3]})`,
    widescreen: `@media screen and (min-width: ${breakpoints[4]})`,
  },
  colors,
  fonts,
  fontSizes: [
    12, 14, 16, 20, 24, 32, 48, 64, 96
  ],
  fontWeights: {
    body: 400,
    heading: 500,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: {
    avatar: 48,
  },
  radii: {
    default: 4,
    circle: 99999,
  },
  shadows: {
    card: '0 0 4px rgba(0, 0, 0, .125)',
  },
  // rebass variants
  text: {
    header: {
      fontFamily: fonts.heading,
      lineHeight: '1.25',
      fontSize: [2, 3, 4],
    },
    subheader: {
      fontFamily: fonts.heading,
      lineHeight: '1.25',
      fontSize: [1,2],
    },
    label: {
      fontFamily: fonts.heading,
      lineHeight: '1.25',
      fontSize: [0],
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
    paragraph: {
      fontFamily: fonts.body,
      lineHeight: '1.5',
      fontSize: [1,2],
    },
    display: {
      fontFamily: fonts.body,
      lineHeight: '1.5',
      fontSize: [5, 6, 7],
    },
    caps: {
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
  variants: {
    avatar: {
      width: 'avatar',
      height: 'avatar',
      borderRadius: 'circle',
    },
    card: {
      p: 2,
      bg: 'background',
      boxShadow: 'card',
    },
    link: {
      color: 'primary',
    },
    nav: {
      fontSize: 1,
      fontWeight: 'bold',
      display: 'inline-block',
      p: 2,
      color: 'inherit',
      textDecoration: 'none',
      ':hover,:focus,.active': {
        color: 'primary',
      }
    },
  },
  buttons: {
    primary: {
      fontSize: 2,
      fontWeight: 'bold',
      color: 'background',
      bg: 'primary',
      borderRadius: 'default',
    },
    outline: {
      variant: 'buttons.primary',
      color: 'primary',
      bg: 'transparent',
      boxShadow: 'inset 0 0 2px',
    },
    secondary: {
      variant: 'buttons.primary',
      color: 'background',
      bg: 'secondary',
    },
  },
  styles: {
    root: {
      fontFamily: fonts.body,
      fontWeight: 'normal',
      lineHeight: '1.5',
    },
  },
}

export default theme;
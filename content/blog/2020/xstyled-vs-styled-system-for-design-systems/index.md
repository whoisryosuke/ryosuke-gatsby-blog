---
title: xStyled vs Styled System for Design Systems
date: '2020-05-26'
section: blog
tags: ['design systems', 'css', 'react']
---

Lately I've been refining my process for developing new websites from scratch. In the past, I've reached for larger component libraries and CSS frameworks to scaffold my projects, from [Bootstrap](https://getbootstrap.com/) to [Semantic UI](https://semantic-ui.com/) to [Material](https://materializecss.com/). But when I work with small to mid sized projects, these libraries can often be overkill, and an immense barrier to overcome in terms of customization. Semantic UI and Bootstrap are great, but theming them are a sinkhole of time, lost to endless LESS/SASS variables. I'm also left with loads of unused CSS unless I setup a purge process, and even those are inaccurate.

So what's my solution? Components using utility props. It's like [Tailwind](https://tailwindcss.com/) meets React props:

```jsx
<Button
  bg="primary"
  color="white"
  border="3px solid black"
  borderRadius="default"
>
  {children}
</Button>
```

I've used [Styled System](https://styled-system.com/) in the past (with [Rebass](https://rebassjs.org/)) to create a few websites (like [my blog](http://whoisryosuke.com/)) using these "utility props". I like a lot of the concepts of Styled System, but as I've used it I've been encountering issues I have with the library. I thought I'd explore the competitor, xStyled, and see how they compare.

# Getting Started with xStyled

To test out xStyled, I created a few projects on CodeSandbox to test the features. It's as easy as installing two dependencies and using it in your project:

```bash
npm install @xstyled/styled-components styled-components
```

You can also install [the Styled Components Babel plugin](https://github.com/styled-components/babel-plugin-styled-components) for more legible class names, server-side rendering compatibility, smaller bundles, and more.

## Examples

Here's a CodeSandbox with a basic button showing the "magic" shorthand (`margin: 1 3`) and theming setup.

[xStyled Button Example with Theming](https://codesandbox.io/s/xstyled-button-example-with-theming-w3ro6):

<iframe
     src="https://codesandbox.io/embed/xstyled-button-example-with-theming-w3ro6?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="xStyled Button Example with Theming"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

Here's an example of using the `styled` method with the `<Box>` component:

[xStyled Box Example with Theming](https://codesandbox.io/s/xstyled-box-example-with-theming-g1cih):

<iframe
     src="https://codesandbox.io/embed/xstyled-box-example-with-theming-g1cih?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="xStyled Box Example with Theming"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts allow-autoplay"
   ></iframe>

Here's an example of the flexbox grid (rows / columns) using `<Box>`:

[xStyled - Responsive Docs Fix](https://codesandbox.io/s/xstyled-responsive-docs-fix-l3xg6?file=/src/App.js:170-349):

<iframe
     src="https://codesandbox.io/embed/xstyled-responsive-docs-fix-l3xg6?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="xStyled - Responsive Docs Fix"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts allow-autoplay"
   ></iframe>

You can check out [the xStyled docs](https://xstyled.dev/) to see more examples of their features.

# xStyled vs Styled System

Now that we have some examples to play with, let's break down the two and see how they compare:

## Similarities

- Both offer a "system" or set of utility props (like color, margin, etc) to attach to components.
- Both can use Emotion or Styled Components
- Both have "magic" CSS property values (e.g using color names to reference theme vars - `<Button color="primary">` = `theme.colors.primary`)
- Both can parse theme variables separately with a `css` method.
- Both have (the same) opinionated theme structure to allow for use of utility props
- Both use default values for spacing and breakpoints if no theme is provided.
- Both allow you to create new components that use certain props (only color or margin instead of all utility props)

## Differences

- The bundle size of xStyled is **7.8kB** while Styled System is **4.9 kB**. But xStyled includes a base box component, much like Rebass' box. Rebass is an additional **14.4kB**.
- xStyled gives you a `<Box>` component out of the box using all utility props instead of having to download Rebass for a Styled System equivalent.
- xStyled encourages you to used the `styled` method to style props. While Styled System encourages using the `sx` prop inline with the component. xStyled lets you use a `styled.box` method to base your components off the `<Box>` component and still use utility props. Styled System discourages this, promoting the `sx` prop instead.

  **xStyled:**

  ```jsx
  import styled from '@xstyled/styled-components'
  const ButtonBase = styled.box`
  	background-color:primary;
  	color: white;
  	border: 0;
  	border-radius: default;
  	font-size: 2;
  	font-weight: bold;
  	text-decoration="none";
  	padding: 3 4;
  	box-shadow: default;
  	position: relative;
    transition: box-shadow 400ms ease-in, transform 400ms ease-in;
  	transform: translateY(0);
  
    & :hover,
  	& :focus,
  	& .active: {
      background-color: primary,
      color: white,
      box-shadow: hover,
      transform: translateY(-0.25em)
  	}
  `

  const Button = ({ ...props }) => (
    <ButtonBase as="button" {...props}></ButtonBase>
  )
  export default Button
  ```

  **Styled System + Rebass:**

  ```jsx
  import React from 'react'
  import { Button } from 'rebass/styled-components'

  interface Props {
    children: React.node[];
  }

  export const ButtonOutline: React.FC<Props> = ({ children, ...props }) => {
    return (
      <Button
        bg="primary"
        color="white"
        border="0"
        borderRadius="default"
        fontSize={2}
        fontWeight="bold"
        textDecoration="none"
        py={3}
        px={4}
        boxShadow="default"
        position="relative"
        transition="box-shadow 400ms ease-in, transform 400ms ease-in"
        transform="translateY(0)"
        sx={{
          ':hover,:focus,.active': {
            bg: 'primary',
            color: 'white',
            boxShadow: 'hover',
            transform: 'translateY(-0.25em)',
          },
        }}
        {...props}
      >
        {children}
      </Button>
    )
  }

  export default ButtonOutline
  ```

  Props are generally better for styling since they're easier to override without having to wrap the component in another `styled` wrapper. But it can be very beneficial to use the `styled` directive as the basis for a component. For design systems that feature elements that require more advanced or verbose CSS to accomplish (like psuedo selectors `:before`), it helps to write it out in a classic CSS fashion. Generally these values (like the bg color of a heavily nested pseudo box shadow) wouldn't be overriden, and can even be wired to separate props if necessary thanks to the way `styled` passed components props to the CSS (`<Button shadowColor="blue">`)

- xStyled uses it's "magic" theme values in the `styled` method. While Styled System uses them in `sx` prop. Both libraries allow for them in utility props (e.g. `<Button color="primary">`).
- xStyled defaults to Styled Components, while Styled System defaults to Emotion.
- xStyled offers more utilities than Styled System.
  - Theme getters are used in the `styled` method to quickly grab theme values (like `th('color.primary')` or `th.color('primary')`.
  - Breakpoint utilities let you quickly define breakpoints in the CSS using set points (`sm`, `lg`, etc).
- xStyled uses rows and cols (e.g. `<Box row>` ) to help create flexbox grids. You have to manually create this using a Rebass box.
- xStyled uses object syntax for it's breakpoints (`<Box col={{ xs: 1, md: 1 / 3 }} />`). Styled System has a shorter syntax, but you have less control over individual breakpoints (`<Box width={[1,1/3]}>`). [See a live example here.](https://codesandbox.io/s/xstyled-responsive-docs-fix-l3xg6?file=/src/App.js:170-349)

  ```jsx
  <Box row>
    <Box col={{ xs: 1, md: 1 / 3 }}>1/3</Box>
    <Box col={{ xs: 1, md: 1 / 3 }}>1/3</Box>
    <Box col={{ xs: 1, md: 1 / 3 }}>1/3</Box>
  </Box>
  ```

  This one was hard for me, because I personally love the Styled System shorthand as it works 90% of the time, and the other option just feels so verbose (albeit more declarative).

- xStyled uses a utility method to define "variants" (like primary vs secondary button styles). You can use these variants inside of the `styled` method. You change the component styles using a prop name you define in the variant utility (`<Button size="md">`). You can also define a "default" variant to be used when none is passed. Styled System differs a bit and uses variants from the Styled Components theme. You define them in the theme under a variants property and use the name inside a component's variant prop (e.g. `<Button variant="secondary">`).

  xStyled lets you create multiple variants per component (named whatever you want), while Styled System restricts you to one per component (named `variant`). However, neither let you "stack" variants from the same type (`<Button size="lg masthead">`).

  **xStyled**:

  ```jsx
  import { variant } from '@xstyled/system'
  const sizeVariants = variant({
    default: 'md',
    prop: 'size',
    variants: {
      md: css`
        padding: 8px;
      `,
      lg: css`
        padding: 16px;
      `
    }
  })
  const Button = styled.button`
    ${sizeVariants}
  `
  <Button size="md" />
  ```

  **Styled System**:

  ```jsx
  // theme file
  export default {
    variants: {
      badge: {
        display: 'inline-block',
        p: 1,
        color: 'white',
        bg: 'primary',
        borderRadius: 2,
      }
    },
  }

  // Component somewhere
  <Box variant='badge'>
    Badge
  </Box>
  ```

  I generally prefer the Styled System method actually, since my variant styles aren't too complex usually. But the architectural decisions behind the xStyled method make it a much more flexible option. Styled System only allows you to have one type of variant on a component at a time, so you can use it to define `primary` or `secondary` styles. But if you wanted to also make a `masthead` variant that increases the font size of the button when used in a masthead, you'd have to create a new variant that combines both `mastheadButton: { extends: "primary", fontSize: 4 }`. xStyled on the other hand, allows you to set your variants to a prop name, so you can have a `size` variant that allows for `masthead`, as well as a `styling` prop with the primary/secondary variants.

I haven't tested performance benchmarks for both libraries yet. Presumably they're fairly equivalent in performance. The author of xStyled has contributed to Styled System to introduce performance benefits in the past, so I'd assume they run similarly.

## Mixing Utility Props and CSS

One of the major issues with Styled System is trying to wrap the `<Box>` component in a `styled` method. This can cause conflicts with the CSS when utility props are used.

With xStyled, you can mix them, and the utility props will always take precedence over the `styled` CSS. You can see this in action here on CodeSandbox, where utility props make the width smaller, while the CSS is set to a different percent:

[xStyled Box Example - Mixing Props and CSS](https://codesandbox.io/s/xstyled-box-example-mixing-props-and-css-7772l?file=/src/Button.js)

```jsx
import styled, { css, breakpoints } from '@xstyled/styled-components'
const Button = styled.box`
  width: 100%;
  background-color: primary;
  color: white;
  margin: 0 3;
  padding: 1 3;

  ${breakpoints({
    xs: css`
      width: 100%;
    `,
    md: css`
      width: 100%;
      /* From md breakpoint */
    `,
    lg: css`
      /* From lg breakpoint */
    `,
  })}
`
export default Button
```

```jsx
import React from 'react'
import './styles.css'

import Button from './Button'

export default function App() {
  return (
    <div className="App">
      {/* Width defaults to utility values here -- not CSS above */}
      <Button col={{ xs: 1 / 2, md: 1 / 3 }}>Submit</Button>
    </div>
  )
}
```

# Streamline your process

If you haven't been exposed to the concept of utility props, I hope this article gets you hooked! And if you hadn't heard of xStyled, but tried Styled System, I hope you give it a shot too. I'm definitely looking forward to creating a new app with this setup!

Cheers,
Ryo

# References

- [https://xstyled.dev/docs/getting-started/](https://xstyled.dev/docs/getting-started/)
- [https://xstyled.dev/docs/responsive/](https://xstyled.dev/docs/responsive/)
- [https://github.com/smooth-code/xstyled/pull/110](https://github.com/smooth-code/xstyled/pull/110)

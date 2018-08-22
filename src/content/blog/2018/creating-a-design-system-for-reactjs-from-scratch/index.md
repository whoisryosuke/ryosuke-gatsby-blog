---
title: Creating a Design System for ReactJS from Scratch
date: "2018-08-22"
section: blog
cover_image: "./Creating-a-Design-System-pt1-1920px.jpg"
tags: [ 'design', 'design system', 'react', 'open source', 'javascript', 'tutorial' ]
---

Design systems are upon us. Everywhere you look, companies are releasing new fangled design systems with fancy names like [Polaris](https://polaris.shopify.com/), [Lightning](https://github.com/mashmatrix/react-lightning-design-system), or [Carbon](https://github.com/IBM/carbon-components-react). And you've got open source systems like [Material UI](https://github.com/mui-org/material-ui) getting used in [every other project](https://www.npmjs.com/package/@material-ui/core) because of their high quality and accessibility.

But if you're here, I don't need to convince you of the advantages of having a design system. You already know the benefits of having a single source of truth for your web components across all projects, and how empowering it is for developers to have a dedicated ecosystem to control and create a consistent style guide. 

You're probably asking yourself the same thing I did: What exactly does it take to make a design system? I wrote down traits I'd encountered across most systems that were absolutely essential and went on my way.

## Requirements for a Design System

* Components 
* Development environment to view components
* Documentation (with prop-types and examples)
* Unit testing *(and ideally visual regression)*
* Automated code linting and formatting

It's pretty simple when you distill it down. 

We need components to share. A place to build them and another place to document them. And linting and testing that ensures code is error free and working.

## The Stack

For the sake of this tutorial, I'll be going with the following stack:

* **Component system:** [ReactJS](https://reactjs.org)
* **CSS in JS:** [react-jss](https://github.com/cssinjs/react-jss)
* **Code Transpiling for Development**: [Babel](https://babeljs.io/docs/en)
* **Development Environment:** [StorybookJS](https://storybook.js.org/)
* **Component testing:** [jest](https://jestjs.io/) + [enzyme]
* **Documentation:** [react-styleguideist](https://github.com/styleguidist/react-styleguidist)(https://github.com/airbnb/enzyme)
* **Code linting + formatting:** [ESLint](https://eslint.org/) + [Prettier](https://github.com/prettier/prettier)

Let's tackle each of these needs one by one, and build this design system piece by piece. 

## Components

We'll be building our components with ReactJS, and in this case, styling them using a CSS in JS library. You can totally use CSS, SASS, LESS, or whatever you prefer in your own system. I chose CSS in JS for the benefits when used in design systems.

CSS in JS [allows for advantages](https://hackernoon.com/all-you-need-to-know-about-css-in-js-984a72d48ebc) like less dead CSS, optimized styles on demand - rather than loading an entire CSS stylesheet of stuff we don't use, and more modularity by separating the CSS on a component level. Your style logic is separated beyond simply files - since all class names are uniquely generated (`.bem--btn-1389429`), you don't have to worry about namespace collisions or leaky styles.  

This allows our components to be as **lightweight as possible**, and slip in and out of other apps without requiring global styles that would conflict with other systems.

> If you don't know what CSS in JS is, here's [everything you need to know](https://hackernoon.com/all-you-need-to-know-about-css-in-js-984a72d48ebc). And here's [why you might not want to use it.](https://medium.com/@gajus/stop-using-css-in-javascript-for-web-development-fa32fb873dcc)

I'll quickly cover how I chose the CSS in JS library in correlation to design systems. If you're not that interested in those, just skip past to *"Starting your project"*.

### The CSS in JS War

There are quite a few CSS in JS options out on the market, from [Styled Components](https://www.styled-components.com/) to [Aphrodite](https://github.com/Khan/aphrodite) to [Emotion](https://github.com/emotion-js/emotion) to JSS and everything in between. So how do you choose between all of them? 

I left it down to a few factors: Ease of use, Bundle Size, and Performance (load and render times).

If you like writing code that looks more like actual CSS, you probably want to go with **Styled Components** or **Emotion**. Or if you're looking for React Native support out of the box, you'd pick Aphrodite. And if you wanted to judge by performance, well...those numbers [seem](https://github.com/oliviertassinari/a-journey-toward-better-style#results) [all](https://medium.com/@tkh44/emotion-ad1c45c6d28b) [over](https://github.com/hellofresh/css-in-js-perf-tests) [the](http://cssinjs.org/performance/?v=v9.8.7) [place](https://github.com/A-gambit/CSS-IN-JS-Benchmarks).

### My CSS in JS choice

At the end of of the day, I chose JSS (specifically react-jss for React integration). It's got great performance, small bundle, and large system's like Material UI have shown it's worth.

I initially chose Emotion, because I liked writing real CSS instead of JSON. But theming with Emotion didn't work as well as it did with JSS. Emotion technically performs better when you don't used it's 'styled' components, but it forces you to use them when you want theme variables in your CSS. Less perf, more abstraction and dependencies-- not what I wanted for this system.

JSS was the clear winner, time to build our system.

## Starting your project

1. Create a new folder for your project: `mkdir your-design-system`
2. Inside the project folder, initialize an NPM package: `npm init`
3. Create a Git repository: `git init`
4. Install the dev dependencies: 

```bash
npm i --save-dev react react-dom babel-cli babel-core babel-preset-env babel-preset-react @storybook/react @storybook/addon-options
```

5. Install the dependencies: ` npm install react-jss`
6. Go inside your `package.json` and add peer dependencies:

```js
{
  "peerDependencies": {
    "react": "^16.0.0",
    "react-dom": "^16.0.0"
}
```

7. Create a `.babelrc` file in the project root and add these preset configurations: 

```json
{
  "presets": ["env", "react"]
}
```

8. Create a new folder in the project root called `.storybook` and create a `config.js` file in that folder with the following config:

```js
import { configure } from '@storybook/react';
import { setOptions } from "@storybook/addon-options";

// Option defaults:
setOptions({
  /**
   * Name to display in the top left corner
   * @type {String}
   */
  name: 'JSS Design System',
  /**
   * URL for name in top left corner to link to
   * @type {String}
   */
  url: 'https://github.com/whoisryosuke',
  /**
   * Show story component as full screen
   * @type {Boolean}
   */
  goFullScreen: false,
  /**
   * Display left panel that shows a list of stories
   * @type {Boolean}
   */
  showLeftPanel: true,
  /**
   * Display horizontal panel that displays addon configurations
   * @type {Boolean}
   */
  showDownPanel: false,
  /**
   * Display floating search box to search through stories
   * @type {Boolean}
   */
  showSearchBox: false,
  /**
   * Show horizontal addons panel as a vertical panel on the right
   * @type {Boolean}
   */
  downPanelInRight: false,
  /**
   * Sorts stories
   * @type {Boolean}
   */
  sortStoriesByKind: false,
  /**
   * Regex for finding the hierarchy separator
   * @example:
   *   null - turn off hierarchy
   *   /\// - split by `/`
   *   /\./ - split by `.`
   *   /\/|\./ - split by `/` or `.`
   * @type {Regex}
   */
  hierarchySeparator: null,

  /**
   * Sidebar tree animations
   * @type {Boolean}
   */
  sidebarAnimations: true,

  /**
   * ID to select an addon panel
   * @type {String}
   */
  selectedAddonPanel: undefined // The order of addons in the "Addons Panel" is the same as you import them in 'addons.js'. The first panel will be opened by default as you run Storybook
})

// This will search the /src/components/ folder (and sub-folders) for any files that match <filename>.story.js 
// (e.g /src/components/Button/Button.story.js)
const req = require.context('../src/components/', true, /(\.story\.js$)|(\.story\.jsx$)/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module)
```

And now you have a base project to start developing components! Let's break down what just happened:

We created a new project (NPM, Git, etc), installed all the dependencies, and setup default configurations for Babel and Storybook. The Storybook config specifically tells Storybook to grab all the stories from the `src/components/` folder that have the suffix `.story.js`.

> Check out the [StorybookJS' Slow Start Guide](https://storybook.js.org/basics/slow-start-guide/) for more behind the setup of that.

## Creating our first component

We'll be placing our components in the `/src/components/` folder. Each component will be stored inside it's own folder, preferably Pascal cased (ComponentNameExample). Inside will contain any components, stories, tests, and an `index.js` to provide default exports for all the components.

It should look like this:

```
components
└─┬ Button
     ├── Button.js
     ├── Button.story.js
     ├── Button.test.js
     ├── ButtonAlternate.js
     ├── ButtonAlternate.story.js
     └── ButtonAlternate.test.js
```

Let's start by creating a new component at `/src/components/Button/Button.js`:

```js
import React from "react";
// The HOC we wrap our components in to apply styles
import injectSheet from "react-jss";

// Your CSS file - in a JS object
const styles = theme => ({

  // All top level object keys are different class names
  myButton: {
    // Global style applied from theming
    color: theme.text.color,
    margin: {
      // jss-expand gives more readable syntax
      top: 5, // jss-default-unit makes this 5px
      right: 0,
      bottom: 0,
      left: "1rem"
    },

    // And we get SASS/LESS like qualities with the nested &
    "& span": {
      // jss-nested applies this to a child span
      fontWeight: "bold" // jss-camel-case turns this into 'font-weight'
    }
  },
  myLabel: {
    fontStyle: "italic"
  }
});

// Define the component using these styles and pass it the 'classes' prop.
// Use this to assign scoped class names.
const Button = ({ classes, children }) => (
  <button className={classes.myButton}>
    <span className={classes.myLabel}>{children}</span>
  </button>
);

// Export component with HOC to apply styles from above
export default injectSheet(styles)(Button)
```

Let's break this component down and understand how JSS works.

The first major thing we see is a variable for CSS styling called `styles`. In this case, the `styles` variable is a function that accepts a `theme` object, and returns an object of CSS classes. That `theme` object contains global values we place in a `theme.js` file, allowing us to set dynamic values like `theme.text.color`. 

> If you don't need to access any theme variables, the `styles` variable can be just an object (instead of a function).

Below the `styles` variable is the actual Button itself, which is just a functional React component. The `injectSheet` HOC processes the style variable and provides a `classes` prop on the Button component. We grab our class names from there, and apply them using `className={classes.buttonClassName}`.

**So basically:**

* CSS is written as a Javascript object
* We wrap our component in a "HOC" (see below)
* The HOC compiles the CSS *object* into *actual CSS* and injects it into the app (as `<style></style>` elements in the `<head>`)
* The HOC also provides our component with a `classes` prop, which contains any class names we wrote in our CSS object earlier.
* We then apply class names to our components using the `classes` object (kinda like [CSS modules](https://github.com/css-modules/css-modules))

Now that we have a component, let's actually figure out how to look at it.

## Setting up the dev environment

The problem with developing React components is having a dev environment setup to make the process possible. You'll usually find yourself using a boilerplate like **Create React App**, or creating a **custom Webpack config** to compile the JS to a page. Instead of *bloating* our project down with all the Create React App dependencies, or going through the hassle of setting up Webpack just to look at components -- we use StorybookJS.

[**StorybookJS**](http://storybook.js.org) is a live development environment for your components. Spinning up StorybookJS locally launches a component library in your browser, with live component previews (and hot reloading if you save changes). By creating *"stories"*, we can browse through our components, and even create different states (like an active or disabled button). 

> *Ironically*, StorybookJS uses Create React App to run your application. It just downloads it on demand.

## Creating stories

Our Storybook config (`/.storybook/config.js`) looks through our `src/components/` folder and finds any files with the suffix `.story.js`. 

We can create our first story by making a file in `src/components/Button/Button.story.js`:

```js
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ThemeProvider } from 'react-jss'
import theme from "../../theme/theme";

import Button from "./Button";

storiesOf('Button', module)
  .add('with text', () => (
    <ThemeProvider theme={theme}>
      <Button onClick={action('clicked')}>Hello Button</Button>
    </ThemeProvider>

  ))
  .add('with some emoji', () => (
    <ThemeProvider theme={theme}>
      <Button onClick={action('clicked')}><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Button>
    </ThemeProvider>
  ));   
```

Storybook uses a function called `storiesOf` to create stories of your component. We chain `.add(description, component)` methods to it with the variations of our component.

The only special thing we do here is wrap our components in a `<ThemeProvider>` component. This comes from `react-jss`, and uses React's Context Provider system to pass the `theme` object down to our `<Button>`.  If we didn't wrap this, we couldn't use the `theme` variable in our components.

## Running your Storybook

Starting up StorybookJS is as simple as `npm run storybook`. This will spin up a development server at http://localhost:9001/. Here you'll find the Storybook dashboard, and any stories you've created inside `src/components/`.

If you make any changes to your components and save while Storybook dev server is running, it'll re-build and reload with any changes.

## Simple as that!

You'd be surprised by how easy it can be to start developing React components and deploying them as NPM packages. 

At the end of the day, **you only need to write React code** and commit it to git. **There's no need to setup crazy build processes** like Webpack or Parcel, or even Babel really. Your components will be imported into other people's projects who will handle transpiling on their end. The simpler you keep your project, the better actually.

You can see my final [JSS Design System boilerplate here](https://github.com/whoisryosuke/jss-design-system), and also look at the branches labeled 'starter'. Or check out the [Emotion JS Design System boilerplate](https://github.com/whoisryosuke/emotion-semantic-ui) for comparison.

In the next part of the tutorial I'll cover adding testing, linting, and automated component documentation!

Rock on 🤘
Ryo

**References**

* [react-jss](https://github.com/cssinjs/react-jss)
* [Storybook for React](https://storybook.js.org/basics/guide-react/)
* [CSS in JS Performance 1](https://github.com/oliviertassinari/a-journey-toward-better-style#results)
* [CSS in JS Performance 2](https://medium.com/@tkh44/emotion-ad1c45c6d28b)
* [CSS in JS Performance 3](https://github.com/hellofresh/css-in-js-perf-tests)
* [CSS in JS Performance 4](http://cssinjs.org/performance/?v=v9.8.7)
* [CSS in JS Performance 5](https://github.com/A-gambit/CSS-IN-JS-Benchmarks)
* [CSS in JS Performance 6 - Why Material UI chose JSS over Styled Components](https://github.com/mui-org/material-ui/issues/6115)
* [circuit-ui - Design system using Emotion](https://github.com/sumup/circuit-ui)
* [Video: Siddharth Kshetrapal - We Need To Talk About Our Frontend Workflow - ReactFest ](https://www.youtube.com/watch?v=bLgZwFRYTJ4)
* [Video: Jon Gold - react-sketchapp: Design as a Function of Data](https://www.youtube.com/watch?v=iMunXpy2Ezo)
* [Style Guide Guide](http://bradfrost.github.io/style-guide-guide/)
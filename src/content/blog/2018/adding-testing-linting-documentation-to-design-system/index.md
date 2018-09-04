---
title: "Adding testing, linting, and docs to a design system 📚"
date: "2018-09-04"
section: blog
cover_image: "./Adding-testing-linting-docs-to-your-design-system-1920px.jpg"
tags: [ 'testing', 'eslint', 'prettier', 'documentation', 'design', 'design system', 'react', 'open source', 'javascript', 'tutorial' ]
---

[In the last tutorial](http://whoisryosuke.com/blog/2018/creating-a-design-system-for-reactjs-from-scratch/), we created the basis of a design system using ReactJS and CSS in JS. 

Now we can add basic testing, linting, and automated documentation to the design system. 

We'll be using:

* [**Jest**](https://jestjs.io/)
* [**Enzyme**](https://github.com/airbnb/enzyme/)
* [**Babel**](https://babeljs.io/)
* [**ESLint**](https://eslint.org/)
* [**Prettier**](https://github.com/prettier/prettier)
* [**React-Styleguidist**](https://react-styleguidist.js.org/).

You may be asking yourself: "I already have a design system. Why do this?". The benefits of this are simple:

* ✅ Guarantees our components *actually* work (with **tests**)
* 🚫 Ensures our code is error free (with **linting**)
* 🔏 Enforces code style and formatting (with **linting**)
* 📚 Allows developers and designers to easily browse your component library (with **the style guide**)

So let's get started!

## Installing Jest + Enzyme 🧙‍

Let's install Jest, Enzyme, and other necessary dependencies:

```bash
npm install -D jest enzyme enzyme-adapter-react-16 enzyme-to-json babel-jest babel-core regenerator-runtime
```
While they're installing ⏳, here's an idea of what some of these packages do:

* [jest](https://jestjs.io/) - Javascript testing framework that allows you to create tests that make assertions on functions and classes.
* [enzyme](https://github.com/airbnb/enzyme/) - This extends Jest and allows us to render our React components to test their functionality.
* [babel-jest](https://github.com/facebook/jest/tree/master/packages/babel-jest) - This allows Jest tests to compile code using Babel.
* [enzyme-adapter-react-16](https://github.com/airbnb/enzyme/tree/master/packages/enzyme-adapter-react-16) - Enzyme requires an adapter for each version of React. 
* [regenerator-runtime](https://www.npmjs.com/package/regenerator-runtime) - Enables JS Generators and Async.

### Hook up Jest

In order to use Jest, we'll run the command `jest`. We can also make Jest watch our test files for any changes by running `jest --watch`. 

To make this process a bit easier, semantic, and agnostic -- we'll add a script to our `package.json` that runs Jest for us with the command `npm run test`.

Add this to your `package.json`:

```js
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  },

  // ...other parameters...

  "jest": {
    "setupTestFrameworkScriptFile": "<rootDir>tests/setup/setupEnzyme.js",
    "testPathIgnorePatterns": [
      "<rootDir>/tests/setup/"
    ]
  }
```

### Setting up Enzyme

And finally, we have to setup Enzyme - you can see it referenced in the jest `package.json` config. 

Create a new file at `<project-root>/tests/setup/setupEnzyme.js` and add the following:

```js
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
```

## Creating your first test ⚙️

Let's create the first test in our `<Button>` component folder called `Button.test.js`. It'll be incredibly simple, only checking if the component renders:

```js
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { ThemeProvider } from "react-jss";
import Button from "./Button";
import theme from "../../theme/theme";

// Jest's describe function accepts a test description
// And a function containing assertions
describe('Button Component', () => {

  it('should render without throwing an error', () => {
    expect(shallow(<ThemeProvider theme={theme}><Button>Test</Button></ThemeProvider>).exists()).toBe(true)
  })
})
```

## Running tests ⚡️

Now that you've created a test, let's run it! `npm run test` and see if it fails or succeeds. Ideally it should succeed, but if it doesn't, you'll see any errors outputted in the console.

## Adding linting 🔏

I actually have a separate guide on this for any project in general. You can find my guide on [adding automatic code linting and formatting to your projects using ESLint and Prettier here](http://whoisryosuke.com/blog/2018/setting-up-eslint-prettier-on-project/).

## Adding Documentation 📚

We'll use [react-styleguidist](https://react-styleguidist.js.org/) to quickly add documentation to our design system. With these docs, developers will be able to quickly see all the components available, their prop types, and any specific live component examples or written guides. The docs are automatically generated from comments in your code and Markdown files you provide.

It's incredibly easy to setup, and allows us to focus on developing out our system and not setting up documentation infrastructure.

### Installing Webpack

We need to install **Webpack** (I know, I said in the last tutorial we didn't need it -- but styleguidist *requires* it 😅) and **babel-loader** to enable Webpack to transpile our JS:

```bash
npm install --save-dev webpack babel-loader
```

Create a `webpack.config.js` in your project root:

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};

```

### Installing React-Styleguidist

Now we can install react-styleguidist:

```bash
npm install --save-dev react-styleguidist
```

Add these scripts to your `package.json`:

```js
  "scripts": {
    // ...test scripts, etc...

    "docs": "npx styleguidist server",
    "docs:build": "npx styleguidist build",
  },
```

And now you can run `npm run docs` to spin up a development server for your components. 

> If you didn't want to use Storybook *(and write stories and whatnot)*, this could be an alternative to browse variations of components as well. You get hot reloading out of the box here too, allowing you to make component examples in Markdown and check live changes in the browser.

### But wait! It doesn't work with my JSS theme? 😭

Since we use a theme for our JSS components, they can't be rendered without providing a theme object in the props. We normally do this by wrapping our components in the `<ThemeProvider>` component. We could wrap every component in every Markdown file with this `<ThemeProvider>`-- or we can wrap the entire app in it, so our components have access to the theme anywhere.

Create a new file called `.styleguidist/components/Wrapper.js`:

```js
import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "react-jss";
import theme from "../../src/theme/theme";

class Wrapper extends React.Component {
  render() {
    return <ThemeProvider theme={theme}>{this.props.children}</ThemeProvider>;
  }
}

Wrapper.propTypes = {
  /**
   * Child components (array or single element)
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Wrapper;
```

This replaces the default `<Wrapper>` component in react-styleguidist with our own, which just wraps the `<ThemeProvider>` around the component's children. 

> I found this example in [the react-styleguidist docs](https://react-styleguidist.js.org/docs/thirdparties.html#redux), which shows how to integrate Redux if you ever needed that.

Now we can add this to our `styleguide.config.js`:

```js
const path = require("path");

module.exports = {
  // Sets up Styleguidist with our Webpack setup
  webpackConfig: require("./webpack.config.js"),

  // Override Styleguidist doc components
  styleguideComponents: {
    Wrapper: path.join(__dirname, ".styleguidist/components/Wrapper")
  }
};

```

Which informs react-styleguidist to override the component with our own. Feel free to change the path here, wasn't really sure where to stuff this one.

### Ignore stories 📘

You'll notice that if you spin up your docs, story component will be displayed as well. 

We can disable this by adding an ignore parameter to our `storybook.config.js`:

```js
module.exports = {

  // The other config params

  // Files to ignore from docs
  ignore: ["**/*.story.js", "**/*.test.js"]
};
```

## Testing, linting, docs done! 🙌

Piece by piece this design system has been composed to be a full CSS in JS design system, complete with development environment, documentation, testing, and linting. 

It might be intimidating to look at developed design systems like [Ant Design](https://github.com/ant-design/ant-design) or [Material UI](https://github.com/mui-org/material-ui), and even harder to glean knowledge when forced to reverse engineer the architecture. But much like any project, **every codebase starts with a single line of code** *(or copypasta boilerplates)*. Try browsing to the beginning of their commit history sometime and see how much the code has refactored.

Your own design system won't be this huge, complex net of components at first either. But just like all the other systems, it'll bolster with every feature. Start small by building only what you need, and expand using the same mentality. **Build to solve problems.** As you progressively grow, you'll find iterative changes feel immense after a week or a month.

Hope this helps!
Ryo

***


**References**

* [Setting up React with Webpack 4](https://medium.freecodecamp.org/part-1-react-app-from-scratch-using-webpack-4-562b1d231e75)
* [Creating wrappers for React-Styleguidist](https://react-styleguidist.js.org/docs/thirdparties.html#redux)
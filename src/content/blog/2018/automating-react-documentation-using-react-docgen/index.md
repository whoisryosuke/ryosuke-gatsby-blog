---
title: "Automating React Documentation using React-Docgen ⚛⚙️📚"
date: "2018-09-24"
section: blog
cover_image: "./Automating-React-Documentation-using-React-Docgen-1900w.jpg"
tags: [ 'react', 'documentation', 'node', 'tips' ]
---

In my neverending quest for making the documentation as painless and seamless as possible, I started experimenting with a library by the Facebook team called [**react-docgen**](https://github.com/reactjs/react-docgen). 

It's a CLI and API that reads your React component files, grabs any documentation left in comments, and pumps out an object with all the docs and props:

```js
{
  "props": {
    "foo": {
      "type": {
        "name": "number"
      },
      "required": false,
      "description": "Description of prop \"foo\".",
      "defaultValue": {
        "value": "42",
        "computed": false
      }
    },
    "bar": {
      "type": {
        "name": "custom"
      },
      "required": false,
      "description": "Description of prop \"bar\" (a custom validation function).",
      "defaultValue": {
        "value": "21",
        "computed": false
      }
    }
  },
  "description": "General component description."
}
```

A few design systems and frameworks use *react-docgen* as part of their process to generate documentation. Usually you take the object that's output by the CLI and save it to a JSON file to use in other scripts/tools. Great for generating content / Markdown files using SSGs (static site generators) like GatsbyJS, Jekyll, or Slate.

I tested out **two ways to use react-docgen** to document React code. My goal was to use GatsbyJS as my static site generator, and build a documentation site off the CLI's data.

> If you're interested in a more "out-of-the-box" solution, try [react-styleguidist](https://github.com/styleguidist/react-styleguidist). It uses react-docgen to create one-page documentation of all components.

Let's get started ⚡️

*** 

## The process

I described the basic process above: we want to run a script that uses the react-docgen API and generate a JSON file of React docs that we can use during the site's build process.

Let's try that out first 👇

## Tooling Script + Gatsby Output

The process is pretty simple:

1. Make script that grabs all the components and uses react-docgen API to parse files into JSON (saved as file output -- `components.json`)
1. GatsbyJS `gatsby-node.js` script to parse through the JSON and create pages.

First we make the build script:

```js
const fs = require("fs");
const path = require("path");
const reactDocs = require("react-docgen");

// The React components to load
const componentFolder = "./src/components/";

// Where the JSON file ends up
const componentJsonPath = "./docs/components.json";

const componentDataArray = [];

function pushComponent(component) {
  componentDataArray.push(component);
}

function createComponentFile() {
  const componentJsonArray = JSON.stringify(componentDataArray, null, 2);
  fs.writeFile(componentJsonPath, componentJsonArray, "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    console.log("Created component file");
  });
}

/**
 * Use React-Docgen to parse the loaded component
 * into JS object of props, comments
 *
 * @param {File} component
 * @param {String} filename
 */
function parseComponent(component, filename) {
  const componentInfo = reactDocs.parse(component);
  const splitIndex = filename.indexOf("/src/");
  const shortname = filename.substring(splitIndex + 4);

  componentInfo.filename = shortname;

  pushComponent(componentInfo);
}

/**
 * Loads a component file, then runs parsing callback
 * @param {String} file
 * @param {Promise} resolve
 */
function loadComponent(file, resolve) {
  fs.readFile(file, (err, data) => {
    if (err) {
      throw err;
    }

    // Parse the component into JS object
    resolve(parseComponent(data, file));
  });
}

/**
 * Explores recursively a directory and returns all the filepaths and folderpaths in the callback.
 *
 * @see http://stackoverflow.com/a/5827895/4241030
 * @param {String} dir
 * @param {Function} done
 */
function filewalker(dir, done) {
  let results = [];

  fs.readdir(dir, async (err, list) => {
    if (err) return done(err);

    let pending = list.length;

    if (!pending) return done(null, results);

    list.forEach(file => {
      file = path.resolve(dir, file);

      fs.stat(file, async (err, stat) => {
        // If directory, execute a recursive call
        if (stat && stat.isDirectory()) {
          filewalker(file, (err, res) => {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          // Check if is a Javascript file
          // And not a story or test
          if (
            file.endsWith(".js") &&
            !file.endsWith(".story.js") &&
            !file.endsWith(".test.js")
          ) {
            await new Promise(resolve => {
              loadComponent(file, resolve);
            });
            await results.push(file);
          }
          if (!--pending) done(null, results);
        }
      });
    });
  });
}

filewalker(componentFolder, (err, data) => {
  if (err) {
    throw err;
  }

  createComponentFile();
});
```

We use a function I found on Github called `firewalker()` that loads a folder and "walks" through each file. When we walk through each file, we check if it's a JS file (and not a test or Storybook JS file), and then run the `loadComponent()` function, which is a wrapper for Node's API for loading files. 

Once the component file is actually loaded, we run the `parseComponent()` function that actually runs **react-docgen** on our file. Finally, we "push" the generated docs data to an array. After all the files load, our `firewalker()` function has a callback that runs a `createComponentFile()` function, which outputs the actual JSON file.

### Using the script

Now we can generate a JSON file of all our components inside `/src/components/` by running the script in Node's CLI:

`node generate-documentation.js`

GatsbyJS support using JSON files as a "source" to build sites from using the [gatsby-transformer-json](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-json). When we load the file we generated, it converts the JSON into a GraphQL node we can query.

## Pure Gatsby

The last method works, but it seemed cumbersome and error-prone having to rely on a separate tooling script. After a bit of research, I discovered a second, more integrated way to handle it.

1. Use [the react-docgen plugin for Gatsby](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-react-docgen) that grabs all components from a certain folder, generates the JSON, and spins up a GraphQL endpoint for it.

We install the plugin and add it to our Gatsby config (along with a filesystem source that imports our components):

**gatsby-config.js**:

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `components`,
        // Location of your React components
        path: `../src/components/`,
      },
    },
    // "Transforms" our "source" of React/JS files with the react-docgen CLI
    // and creates a GraphQL node with the output
    `gatsby-transformer-react-docgen`,
  ],
}
```

And then displaying our data is as simple as querying GraphQL:

```js
import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

import PropsTable from '../components/propstable'

export default class ComponentPage extends Component {
  render() {
    const { children, data, tableOfContents } = this.props
    console.log('mdx', data.mdx)
    console.log('component metadata', data.componentMetadata)
    return (
      <Layout>
        <div className="content">
          {children}
          <h1>{data.componentMetadata.displayName}</h1>
          <p>{data.componentMetadata.docblock}</p>
          <h2 style={{ marginTop: '2rem' }}>Props:</h2>
          <PropsTable
            propMetaData={data.componentMetadata.childrenComponentProp}
          />
        </div>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query($name: String!) {
    componentMetadata(displayName: { eq: $name }) {
      id
      displayName
      docblock
      doclets
      childrenComponentProp {
        name
        docblock
        required
        parentType {
          name
        }
        type {
          value
        }
        defaultValue {
          value
          computed
        }
      }
      composes
    }
  }
`
```

### Bonus: Props Table

In order to display all the data from our props (the description, default value, is it required?, etc), we create a component that accepts our props from the react-docgen CLI and outputs a table. [I found this on Github](https://github.com/episodeyang/react-component-props-table/) and altered it work with the Gatsby version of react-docgen:

```js
import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Table for React props generated by react-docgen
 *
 * @see https://github.com/episodeyang/react-component-props-table/
 */
const PropsTable = props => {
  let { className = '', propMetaData = [], ..._props } = props
  if (className) className += ' component-props-table'
  return (
    <table className={className} {..._props}>
      <thead>
        <tr>
          <th>Prop Name</th>
          <th>Type</th>
          <th>Is Required</th>
          <th>Default Value</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(propMetaData).map(key => {
          const prop = propMetaData[key]
          return (
            <tr key={key}>
              <td style={{ color: 'rgb(17, 147, 154)' }}>{prop.name}</td>
              <td>{prop.parentType ? prop.parentType.name : ''}</td>
              {prop.required ? (
                <td style={{ color: 'rgb(255, 76, 34)' }}>required</td>
              ) : (
                <td style={{ color: '#c6c6c6' }}>optional</td>
              )}
              {prop.defaultValue ? (
                <td style={{ color: 'rgb(236, 171, 32)' }}>
                  {prop.defaultValue.value}
                </td>
              ) : (
                <td style={{ color: '#c6c6c6' }}>none</td>
              )}
              {prop.docblock ? <td>{prop.docblock}</td> : <td />}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

PropsTable.propTypes = {
  /** this is the `metadata.props` field of what metadata you get from the react-docgen-loader.  */
  propMetaData: PropTypes.object,
}
PropsTable.defaultProps = {
  propMetaData: {},
}

export default PropsTable
```

Much more efficient as it runs react-docgen on build, rather than requiring us to run the script separately (or hook it into our build process). 

Also imports the documentation as a GraphQL endpoint, allowing us to query the data -- instead of hard-importing a *(potentially giant)* JSON file -- or using the `gatsby-transformer-json` plugin (which doesn't format the data for GraphQL as well as the specific react-docgen plugin).

<img src="./screenshot.png" alt="Gatsby Documentation Starter using gatsby-transformer-react-docgen" />

You can download the final "pure Gatsby" version on Github here: [Gatsby Documentation Starter](https://github.com/whoisryosuke/gatsby-documentation-starter).

## Getting documentation down

I hope this helped you understand the process behind documentation, or specifically React component docs. Using the react-docgen CLI or API makes the process as simple as loading component files and feeding them through the library, pumping out structured data perfect for frontend interfaces.

There are plenty of out-of-the-box solutions out there, but it's always beneficial understanding how their work (demystifying the *magic* ✨), particularly if you're looking to create something new and fresh *(frameworks only go so far)*.

Cheers,
Ryo

***

**References**:

* [react-docgen](https://github.com/reactjs/react-docgen)
* [react-docgen Official Example](https://github.com/reactjs/react-docgen/blob/master/example/buildDocs.sh)
* [See how react-styleguidist uses react-docgen](https://github.com/styleguidist/react-styleguidist/search?q=docgen&unscoped_q=docgen)
* [gatsby-transformer-react-docgen](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-react-docgen)
* [React Component Props Table](https://github.com/episodeyang/react-component-props-table/)
* [Gatsby Documentation Starter](https://github.com/whoisryosuke/gatsby-documentation-starter)
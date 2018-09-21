---
title: Generate documentation for any React project using GatsbyJS
date: "2018-09-21"
section: blog
cover_image: "./gatsby-documentation-starter-1980px.jpg"
tags: [ 'documentation', 'boilerplate', 'react', 'mdx', 'javascript', 'jsx', 'guide' ]
---

I recently was exploring different documentation solutions for design systems, and through my experimentation I **created a template to create Gatsby documentation for any React project.**

Write your documentation inline with your components as [docblocks](http://usejsdoc.org/), and add more in-depth descriptions + live examples using [MDX](https://github.com/mdx-js/mdx).

If you're code is *already* documented, and your components are located in `src/components` -- then **you're good to go!** Clone this project into your codebase and *let it rip!* 🚀

Don't have that setup? *Don't worry!* I cover everything below 👇

## Getting started

**Install with Netlify**

1. [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/whoisryosuke/gatsby-documentation-starter/tree/example)

**Install with Gatsby CLI**

1. `gatsby new docs https://github.com/whoisryosuke/gatsby-documentation-starter/`

**Install from Github**

1. `git clone https://github.com/whoisryosuke/gatsby-documentation-starter.git`
1. Update `gatsby-config.js` with the location of your components + MDX _(see: "Changing source folder")_
1. `npm install` inside project
1. `npm run develop`
1. View your documentation: http://localhost:8000

### Creating documentation

Documentation is sourced from two places: component source code and MDX files.

```
src
└── components
    └── Button
        ├── Button.js
        └── Button.mdx
```

[**React-docgen**](https://github.com/reactjs/react-docgen) grabs any JS Docblocks you write for your React classes/functions (`Button.js`), as well as the Prop Types. These are displayed on your documentation page, with the props organized in a table.

Inside your **MDX** file you can write additional documentation with JSX examples (like React components!). You can also specify the page slug here (a **page name** and **category**). Your pages will be generated as `http://yoursite.com/<category>/<pageName>`.

In order for your component data to show up, you need an MDX file for the component - and the page name and component name in the docblock need to match. 

> If you don't want to create MDX files and generate pages directly from components/JS files -- see the Github docs section: "Creating pages from react-docgen". The reason I chose MDX foremost is the flexibility of the frontmatter, allowing you to create different "sections" for components (if you have elements vs typography for example).

```js
/**
 * ComponentTitle
**/
class ComponentName extends React.Component {}
```

```md
---
name: ComponentTitle
menu: CategoryName
---
```

> Creates a page for the component located at http://localhost:8000/categoryname/componentname

## How does it work?

Gatsby can get pretty complicated if you've never sat down and actually spun up a "Hello World" - and it can get even more complex when building a blog. 

Here's how it works on a high-level: 

1. Gatsby pulls data from your project (JS and MDX files)
1. The data gets transformed into a GraphQL data layer
1. During the build process, Gatsby generates pages for each component using the MDX files. The pages are React components that query GraphQL for our component's documentation + parsed MDX

> If you're not familiar with how Gatsby works, [check out their website](http://gatsby.org) for more info. It's basically a static-site generator that uses GraphQL during development to generate static pages from dynamic data sources (APIs, local files, etc). 

## A little slower please

Gatsby pulls data into GraphQL, transforms the data (like parsing Markdown), then builds pages based off React components.

Let's break each of those parts down.

### ♻️ The Data Part

Gatsby works by using "source" plugins to aggregate data into GraphQL. This project is setup with `gatsby-source-filesystem`, which allows you to use the project's local filesystem (grabbing any file, from TXT to JS to MDX). This creates a GraphQL endpoint with all imported files. Each queried file, or GraphQL "node", contains auto-generated ID and a stringified version document body. 

### ✨ The Transforming Part

Then Gatsby uses **"transformer"** plugins to create different GraphQL endpoints structured for specific datasets. If you query GraphQL for the data that the "source" plugin imported, you'd notice that it's pretty barebones. The transformer plugins do just that, *transform* the data into usable formats. For example, `gatsby-transformer-json` goes through each file, checks if it's JSON, then parses the body string back into an object/array.

This template uses [gatsby-mdx](https://github.com/ChristopherBiscardi/gatsby-mdx/) by [@ChristopherBiscardi](https://github.com/ChristopherBiscardi/) and [gatsby-transformer-react-docgen](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-react-docgen) by the Gatsby team. **gatsby-mdx** parses any MDX files and creates cached HTML+JS files that are imported into pages. **gatsby-transformer-react-docgen** uses [react-docgen](https://github.com/reactjs/react-docgen), a CLI tool created by the Facebook team to pull documentation from React components. It runs the CLI on any JS files you import and creates GraphQL endpoints for it.

### ⚙️ The Build Part

When Gatsby runs it's build process, it creates pages from any JS files we include inside the `src/pages/` directory. 

During the build process, it also executes additional modules we add to `gatsby-node.js`. This allows us to do things like add new nodes to GraphQL endpoints, or create pages from GraphQL queries.

For this template, I query GraphQL for all MDX files, and create pages from those. The pages are generated from a "template", which is a React component capable of running GraphQL queries. As Gatsby is a framework, it offers an API/methods for all these actions (querying GraphQL, creating pages from React components, passing data to the React components, etc).

## 🎨 The Design Process

I wanted to keep the design and actual code pretty lightweight to make it easier to repurpose. The layout of the documentation is 2-column with a header, where the sidebar column disappears on mobile (and a "toggle sidebar" button appears in the header). The snazzy animated mobile button was pulled from Codepen by [@ ainalem](https://codepen.io/ainalem/).

## What if I don't like Gatsby/JS/React/etc?

There are plenty of documentation options out there if you're looking for a different solution:

* [Docz](https://github.com/pedronauck/docz/)
* [react-styleguidist](https://github.com/styleguidist/react-styleguidist)
* [Docusaurus](https://docusaurus.io/)
* [Vuepress](https://vuepress.vuejs.org/)
* [Gitbook](https://www.gitbook.com/)
* [docsify](https://github.com/docsifyjs/docsify)

And [there are plenty more!](https://github.com/topics/documentation) Don't feel limited to one particular stack or setup. Find one that gels with your flow.

## Document everything!

I appreciate great tools that take your hard work slaving over *docblocks* and *proptypes*, and in a click of a button -- transform your codebase into a fully functioning and well-designed documentation site. 

I designed this for **design systems** in mind, but it can really work with **any project** that uses React components 🙌

I'm always looking to empower my fellow devs and designers with tools that can improve their workflow. If this helped you with your docs, let me know in the comments, or send me a tweet 👍

Cheers 🍻
Ryo

***

**References:**

- [GatsbyJS](http://gatsby.org)
- [gatsby-mdx](https://github.com/ChristopherBiscardi/gatsby-mdx/)
- [gatsby-transformer-react-docgen](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-react-docgen)
- [gatsby-transformer-remark](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-remark)
- [Style Guide Guide](http://bradfrost.github.io/style-guide-guide/)
- [Mobile Button CSS](https://codepen.io/ainalem/pen/LJYRxz)

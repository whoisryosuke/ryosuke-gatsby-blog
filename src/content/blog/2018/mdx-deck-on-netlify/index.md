---
title: Deploy MDX-Deck to Netlify 🚀
date: "2018-09-13"
section: blog
cover_image: "./mdx-deck-on-netlify-1900px.jpg"
tags: [ 'react', 'mdx', 'javascript', 'jsx', 'guide', 'tips' ]
---

As I'm starting to prepare for delivering talks and presentations, I've decided to upgrade my slideshow game to use React components 📈💁‍♀️

As a React developer, it's only natural to want to include real example of my work inside my presentations, and [MDX](https://github.com/mdx-js/mdx) makes that possible using a mix of Markdown and JSX.

But rather than building my own slideshow framework in React, I decided to utilize [**mdx-deck**](https://github.com/jxnblk/mdx-deck), a framework and CLI for creating MDX-powered slideshows. It makes creating slide decks as simple as writing Markdown, and provides indispensable features:

* 📝 Write presentations in markdown
* ⚛️ Import and use React components
* 💅 Customizable themes and components
* 0️⃣ Zero-config CLI
* 💁 Presenter mode
* 📓 Speaker notes
* [See the demo site here](https://dazzling-kepler-4cc40d.netlify.com/)

<img src="./mdx-deck boilerplate 3.gif" alt="Example of the slide deck in action" />

To make my presentation as accessible as possible, I opted to use [**Netlify**](http://netlify.com) to host it. However, the [mdx-deck export docs](https://github.com/jxnblk/mdx-deck/blob/master/docs/exporting.md) are missing some key details. To deploy on Netlify, you point it to a distribution folder that all static assets get compiled to. I couldn't find that export folder in the docs, and had to [hunt it down in the CLI's default Webpack configuration.](https://github.com/jxnblk/mdx-deck/blob/master/cli.js)

After a bit of research, I present - Deploying mdx-deck in 4 steps (or less!):

## 📄 Setting up your project

I just used the example MDX deck provided by in the mdx-deck repo. I copied it into a new folder, created a new git repo, and pushed it to Github.

You can clone my project to get started.

1. Clone the project and add to your Github
1. Add the repo to Netlify

or

1. [Click deploy here to Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/whoisryosuke/mdx-deck-netlify)

## ⚙️ Netlify settings

In order to make sure our deck deploys properly using continuous integration, we have to configure Netlify to build and display our app.  

Go to your Deploy Settings (under the Deploys tab in your Netlify project/repo) and add the following settings:

1. Set the build script to `npm run build`
1. Set the deploy folder to `dist`

We give Netlify a build script to run each time we make a commit to the repo. And the deploy folder is the place where mdx-deck exports the static HTML/JS version, and by pointing Netlify there it displays our deck after building.

## Why Netlify? 🤨

I found myself in a situation where I didn't have immediate access to a development environment (Node/NPM specifically). I thought of using something like [CodeSandbox](http://codesandbox.io), but since I was running build scripts and not just importing modules, it wasn't suitable for projects like mdx-deck.

Hosting on Netlify allows me to utilize [Github](http://github.com) as an code editor/IDE, make changes to my deck's repo, and deploy those to Netlify immediately. It gives me the power of a development environment *(on a delay)* in the cloud. 

This way, if I need to make quick changes to my talk, I can deploy them easily through web interfaces 👏👌

[See the demo site here](https://dazzling-kepler-4cc40d.netlify.com/) | [Source code](https://github.com/whoisryosuke/mdx-deck-netlify)

Hope that helps!
Ryo

***

**References**:

* [mdx-deck](https://github.com/jxnblk/mdx-deck)
* [mdx-deck CLI (where you find the default export folder)](https://github.com/jxnblk/mdx-deck/blob/master/cli.js)
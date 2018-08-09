---
title: "NextJS Tip: Hot reloading for dynamic servers"
date: "2018-07-25"
section: blog
cover_image: "./NextJS-Tips-Nodemon-1920px.jpg"
tags: [ 'nextjs', 'express', 'js', 'es6', 'tips' ]
---

Have you been developing a [NextJS](http://nextjs.org) app with dynamic routing (using maybe Express), and found that every time you make a change you have to do the tedious process of shutting down the server (CTRL+C) and restarting it? (`npm run dev`).

If you're used to working with [NodeJS](http://nodejs.org), or [ExpressJS](https://expressjs.com/), you've probably come across [nodemon](https://github.com/remy/nodemon). It's a utility that enables hot reloading on Node-based servers, so that whenever you make a change to a server file and save -- it instantly starts to restart without any prompt from your part.

But **nodemon doesn't work out of the box with NextJS** and requires a *small amount* of configuration. If you try running nodemon without a config or the proper CLI params, you'll find that your server will start acting *real wonky*. My server started restarting infinitely, because it was detecting changes each time NextJS compiled, triggering an infinite loop of compilations.

> This guide assumes you have a NextJS project with dynamic routing setup. You can find a few in [the examples section of the NextJS repo](https://github.com/zeit/next.js/tree/master/examples) 

## The solution?

Nodemon accepts a configuration file, which allows you have a greater degree of control over the process. By adding a few values to this file, we can solve all our issues.

### Install nodemon

If you haven't already, install nodemon:

`npm install --save-dev nodemon`

### Create the config file

Create a `nodemon.json` file in the project root and paste the following into it:

```json
{
    "verbose": true,
    "ignore": ["node_modules", ".next"],
    "watch": ["server/**/*", "server.js"],
    "ext": "js json"
}
```

This tells nodemon to ignore the `.next` folder, which is used as a cache for the Next compiler (and triggers the infinite reload). And we also tell it which file to watch for changes from. I keep my server file in a separate server folder, since I have stuff like routes/middleware/etc that need separate files and folders.

### Update your npm dev script

Now you can modify your `package.json` and update the 'dev' script value to use nodemon instead of the default `node server.js`:

```js
  "scripts": {
    "dev": "nodemon -w server/server.js server/server.js",
    "build": "next build",
    "start": "NODE_ENV=production node server.js"
  },
```

Now you can run `npm run dev` and you'll have yourself a hot-reloading server.

I found this solution on [the NextJS Github issues](https://github.com/zeit/next.js/issues/791), where a people were having - go figure - the same issue.

Hope that helps ✌️
Ryo

***

**References**:

* [nodemon](https://github.com/remy/nodemon)
* [NextJS Github issue - hot reloading](https://github.com/zeit/next.js/issues/791)
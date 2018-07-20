---
title: "NextJS Tip: Relative ES6 Modules"
date: "2018-07-16"
section: blog
cover_image: "./NextJS-Tip--Relative-ES6-Modules-1920px.jpg"
tags: [ 'nextjs', 'js', 'es6', 'tips' ]
---

Do your components look like this in NextJS?

```js
import ShopProfile from '../../layouts/ShopProfile/ShopProfile'
import KushyApi from '../../utils/KushyApi'
import Menu from '../../components/Menu/Menu'
```

This kind of setup is ok for smaller projects, but the second you need to shift a component around folders, it's easy to get lost in a sea of relative directories (was it two or three sets of `.../` 🤔).

## The plugin way

The babel plugin called root-import can handle this for us, and it's pretty easy to setup:

`npm install babel-plugin-root-import --save-dev`

Add a `.babelrc` to your project root:

```js
{
    "presets": [
        "next/babel"
    ],
    "plugins": [
        [
            "babel-plugin-root-import"
        ]
    ],
    "env": { // For React Native
        "production": {
            "plugins": [
                "babel-plugin-root-import"
            ]
        }
    }
}
```

That's it. You can include components by using the `~` symbol as the root path:

```js
import ShopProfile from '~/layouts/ShopProfile/ShopProfile'
import KushyApi from '~/utils/KushyApi'
import Menu from '~/components/Menu/Menu'
```

> Since NextJS uses a custom babel setup, when we provide our own setup, it overrides the default config. Which means we lose all kinds of great functionality, like [object spread](https://babeljs.io/docs/en/babel-plugin-transform-object-rest-spread/). That's why we use Next's Babel presets in the beginning of the config(`"presets": [ "next/babel" ],`), and drop our plugin underneath. Now you shouldn't get any errors during compilation.

## The better way

I looked up how to do this in general, not specifically for NexJS, and I found a site with [a pretty concise guide](https://moduscreate.com/blog/es6-es2015-import-no-relative-path-webpack/). It stated that for Webpack 2, you'd add this to your `webpack.config.js`:

```js
resolve: {
  modules: [
    path.resolve('./')
  ]
},
```

So in NextJS, I tried doing this:

```js
const withLess = require('@zeit/next-less')
const withCSS = require('@zeit/next-css')
const path = require('path')

// To add new modules, nest the function (like a HOC in React)
module.exports = withCSS(withLess({
    webpack(config, options) {
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000
                }
            }
        })

        // Here is the magic
        // We push our config into the resolve.modules array
        config.resolve.modules.push(path.resolve('./'))

        return config
    }
}))
```

This allows you to use your components and modules like this:


```js
import ShopProfile from 'layouts/ShopProfile/ShopProfile'
import KushyApi from 'utils/KushyApi'
import Menu from 'components/Menu/Menu'
```

A bit cleaner than using the `~` symbol, way easier than installing another dependency 👍

Hope that helps 🍻
Ryo

***

**References**:

* [babel-plugin-root-import](https://github.com/entwicklerstube/babel-plugin-root-import#readme)
* [ES6 Import Statement Without Relative Paths Using Webpack](https://moduscreate.com/blog/es6-es2015-import-no-relative-path-webpack/)
* [NextJS Issues - Relative modules absolutely](https://github.com/zeit/next.js/issues/342)
* [How to use .babelrc in combination with next.config.js?](https://github.com/zeit/next.js/issues/4010)
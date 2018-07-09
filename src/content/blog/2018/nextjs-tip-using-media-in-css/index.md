---
title: NextJS Tip - Using Media (Images & Fonts) in CSS
date: "2018-07-09"
section: blog
cover_image: "./NextJS-Tip-Using-Media-in-CSS.jpg"
tags: [ 'nextjs', 'react', 'js', 'css', 'tips' ]
---

Recently I was setting up a [NextJS](http://nextjs.org) project with [LESS](http://lesscss.org) and CSS, and I was having an issue where my relative media files weren't getting loaded. I was getting this odd error from webpack saying there was an unexpected character?:

Scrolling past this first chunk of error code in the server's console log showed that my PNG and SVG files weren't recognized:

```
These relative modules were not found:

* ../../assets/images/Brand/kushy-logo-short-white.svg in ./components/Header/Header.less
* ../../assets/images/Brand/Kushy API Logo.png in ./components/Header/Header.less
```

## The first solution

I found this solution on [the NextJS Github issues](https://github.com/zeit/next.js/issues/3852), where someone adds a custom Webpack config to parse media files using `url-loader`:

next.config.js:

```js
module.exports = withCSS(withSass({
  webpack (config, options) {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000
        }
      }
    })

    return config
  }
}))
```

This didn't work for me, and I started getting an error about `url-loader` not being loaded (ironically). I installed it, and got errors that `file-loader` wasn't installed? I installed that and....it worked!

`npm install url-loader file-loader --save-dev`

## Another solution

Copy your images to the `static` folder in your app's root. This allows you to access them in your CSS (`background:url('/static/image.png')`). That easy 👌

The reason you can't do this with NextJS is their webpack setup. [They don't run webpack on the server level](https://github.com/zeit/next.js/issues/1935), which doesn't allow for syncing up of files like you get with other webpack setups. You have to extend their Webpack config with your own config options (like above), or use the simple system they put in place (static files served from a single folder). 

## Isn't there a plugin?

There's a library called [next-images](https://github.com/arefaslani/next-images) which tries to solve this problem by calling a `require()` function on any media you want to import on the fly. The issue with this is adding opinionated API code to CSS. It *requires* (see what I did there?) that you add the `require()` function on every relative image URL. If I were to import my CSS from NPM to keep it consistent with my team, I'd have issues overriding any image definitions with the necessary import function.

## Real world example

I had an issue using the Semantic UI design system where it used relative font files for icons, and I was forced either setup a custom webpack config -- or manually copy them into my static folder and override the CSS definitions (`@fontPath  : '/static/assets/fonts';`). Both worked fine, and I stuck with the custom webpack setup.

> I did have a problem importing files because of bad URLs in the LESS variables (it was importing from `../../themes/themes/` instead of just `../../themes/`). This was solved with a quick variable override: `@fontPath  : '../../default/assets/fonts';`. Not a NextJS issue, but thought I'd document it.

Hope that helps,
Ryo

***

**References:**

* [NextJS](https://github.com/zeit/next.js/)
* [next-images](https://github.com/arefaslani/next-images)
* [NextJS Issue #1935 - Importing images in CSS](https://github.com/zeit/next.js/issues/1935)
* [NextJS Issue #3852 - Importing images in CSS](https://github.com/zeit/next.js/issues/3852)
* [file-loader](https://github.com/webpack-contrib/file-loader)
* [url-loader](https://github.com/webpack-contrib/url-loader)
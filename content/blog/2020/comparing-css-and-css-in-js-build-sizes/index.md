---
title: Comparing CSS vs CSS in JS bundle and load times
date: '2020-05-25'
section: blog
tags: ['css', 'css in js', 'styled components', 'optimization']
---

I made two identical apps, one with CSS in JS and one with Webpack loading CSS files. I built both and compare bundle size and load times around the app.

## 📈 2 page test

I created a hyper-simple NextJS app (so we can static export) with two pages. One NextJS app will use CSS through Zeit's CSS plugin, and the other will use CSS-in-JS through [Styled Components](https://styled-components.com/). For the actual CSS styles, I'll be using modules from the [Pure CSS](http://purecss.io/) framework.

A styled button will be used across both pages (to test styled shared across pages). The first page will have a basic stacked form (so we have a use for the alternate form styles), and the second page will feature a striped table.

So in total, we have 3 "components" that require CSS in some way.

## The results

I created both apps fairly identically (beyond adapting the CSS slightly to remove most unnecessary class names -- 🤹‍♀️ props ftw) and then exported a static version using the [NextJS build and export process](https://nextjs.org/docs/#usage). To test the files in a "production" environment, I deployed both in seconds to Zeit's Now hosting service (`cd out && now`).

[Untitled](https://www.notion.so/e4870a4848f544baa13565e5d15515fa)

The clear winner by numbers is CSS (and it's unminified!), but let's take a closer look at the numbers for a minute:

One of the files that grew was the `commons` JS bundle, which is contains all the node modules you import. And it makes sense the Styled Components bundle would be bigger, since SC will increase it. The other files that were larger in the SC bundle were `index.js` and `about.js`, which also makes sense, since both contain style objects (for the form and table).

This isn't exact math because of the way bundling works, but if we find the difference of `index.js` file sizes (2.6 kilobytes - 585 bytes), it's **2KB** (for only the Form component). In comparison, the CSS file that contains _both_ the Form and Table CSS code, is 2KB itself.

Similarly, the `about.js` is larger in the Styled Components bundle by **647 bytes** (1.3 KB - 653 B). In total, we have around **2.6KB in Styled Components code** minus the SC module itself.

## Observations

As long as you separate your Styled Component into a separate React component, Webpack will bundle it appropriately for re-use across the app without reloading the asset. So a Styled Component is the same as a CSS stylesheet, it can be used across the entire app "for free" once it's loaded once.

The only real issue is the overhead on the CSS in SC, since you're compiling Javascript functions that return CSS (rather than just running raw/minified CSS).

Best practice seems to be **make the Styled Components as small as possible**, and rather than using props to modify existing styles, create a separate component for the style option. This modularization makes loading a `<Button>` component less taxing when it's not carrying 15 different variations worth of CSS in it's bundle (`<SecondaryButton>`).

Then again, we've spent years loading stylesheets with excessive styles already, so it depends on how bloated a single styled component gets.

### Other Issues

Not sure if this was a result of using NextJS or my use of Styled Components, but occasionally on loading the first page, my components wouldn't be styled. The CSS version worked fine, but the SC version would hiccup, causing a lack of styles completely **until I hard-refreshed**.

## CSS vs CSS-in-JS: Who Wins? 🥊

**CSS clearly wins in terms of load performance** -- bundle size, actual bytes transferred, and load time. CSS-in-JS will _usually_ lose out because any CSS will be wrapped in some JS, as well as a library to process it, which weighs down the bundle.

That's not _always_ the case though. The perfect example is the Pure CSS grid. The CSS version is hard-coded with a 5 and 24 column grid, so it contains 29 extra styles just to determine different column widths. The same code with a CSS-in-JS solution like Styled Components?:

```
// Code example of width function
```

In a single function you can create a grid of any size you'd like, and return the exact width of the column on demand. You've gone from 87 lines of code to 3, and that bundle size will be significantly smaller.

However, you also require some processing power for each component with JS mixins. Unlike SASS, which is precompiled, using JS runs on each request.

And in terms of ease of use and flexibility, CSS-in-JS wins out over CSS. Unless CSS is paired with a preprocessors like SASS, you can't get the kind of functionality you receive from processing your CSS in Javascript.

## References

- [https://nextjs.org/](https://nextjs.org/)
- [https://purecss.io/](https://purecss.io/)
- [https://github.com/whoisryosuke/styled-component-perf](https://github.com/whoisryosuke/styled-component-perf)
- [https://github.com/whoisryosuke/react-css-perf](https://github.com/whoisryosuke/react-css-perf)
- [Example: CSS version](https://out-gicgvvokrg.now.sh/)
- [Example: Styled Components version](https://out-wmqxqvnuge.now.sh/)

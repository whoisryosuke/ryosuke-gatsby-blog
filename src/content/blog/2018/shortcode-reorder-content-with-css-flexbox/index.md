---
title: shortcode - Reorder content with CSS Flexbox
date: "2018-06-05"
section: blog
cover_image: "../../../../assets/img/categories/shortcode-code-snippets.jpg"
tags: [ 'laravel', 'php', 'api', 'shortcode', 'code snippet', 'tips' ]
---

Ever had a situation where you have elements side by side on desktop, but they stack in the wrong order on mobile? Maybe the image should be above the title, or vice versa. Move the image (or any element) under content if it's hardcoded above it in HTML using this bit of CSS Flexbox magic:

```html
<style>
@media (max-width: 800px) {
    .container {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    }
    .content {
    -webkit-box-ordinal-group: 1;
    -moz-box-ordinal-group: 1;
    -ms-flex-order: 1;
    -webkit-order: 1;
    order: 1;
    }
    .sidebar {
    -webkit-box-ordinal-group: 2;
    -moz-box-ordinal-group: 2;
    -ms-flex-order: 2;
    -webkit-order: 2;
    order: 2;
    }
}
</style>

<div class="container">
    <div class="sidebar"></div>
    <div class="content"></div>
</div>
```

The code works by hard-coding the "order" property, which flexbox uses to determine the order the elements should be displayed. We only hard-code it on mobile, using CSS Media Queries.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">📲 Need to put your sidebar under your content on mobile? Use <a href="https://twitter.com/hashtag/CSS?src=hash&amp;ref_src=twsrc%5Etfw">#CSS</a> <a href="https://twitter.com/hashtag/Flexbox?src=hash&amp;ref_src=twsrc%5Etfw">#Flexbox</a> and <a href="https://twitter.com/hashtag/MediaQueries?src=hash&amp;ref_src=twsrc%5Etfw">#MediaQueries</a> to reorder the elements on smaller viewports: <a href="https://t.co/SKdeseL2JB">https://t.co/SKdeseL2JB</a> <a href="https://twitter.com/hashtag/HTML?src=hash&amp;ref_src=twsrc%5Etfw">#HTML</a> <a href="https://twitter.com/hashtag/CodeSnippets?src=hash&amp;ref_src=twsrc%5Etfw">#CodeSnippets</a> <a href="https://t.co/0vXjAfBEyW">pic.twitter.com/0vXjAfBEyW</a></p>&mdash; Ryosuke (@whoisryosuke) <a href="https://twitter.com/whoisryosuke/status/1004117307411427329?ref_src=twsrc%5Etfw">June 5, 2018</a></blockquote>

Hope that helps,
Ryo

***

**References**

* [Original tweet](https://twitter.com/whoisryosuke/status/1004117307411427329)
* [See the code gist](https://gist.github.com/whoisryosuke/b8b67331d115b772c4dae99fea16fe79)
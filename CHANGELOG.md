## v1.0.10 - July 9, 2018

* Added `<title>` to `<SEO />` component using react-helmet.
* Added Codepen script to blog post component (similar implementation to Instagram). Checks if Codepen embed exists before adding the script.

## v1.0.9 - June 2, 2018

* Added new blog post
* Removed all leftover console logging

> @Protip: Clear cache if you get stuck on createPages method during build process.

## v1.0.8 - April 25, 2018

* Changed format for blog posts from `blog/date-post-title-here/` to `blog/year/post-title`.
* Fixed archive pagination ordering, now orders DESC by date.
* Changed time on blog archive card to a `nicetime()`
* Changed `nicetime()` helper function to remove 'approximately'.
* Added support for Instagram blockquotes in blog posts and project pages. `templates/blog-post.js` converted to component, added an IG script initialization to the lifecycle.

## v1.0.7 - April 13, 2018

* Adding a reading progress bar `<ReadingProgress targetEl="#Article" />` to single blog post template (`blog-post.js`)
* Fixed page number on archive pages (was referencing total page count)
* Refactored Disqus comments into `<Comments post={post} />` components. Accepts post as props (entire post, easier for all the reqs)
* Refactored the single blog post cover image into a `<Cover image={image} />` component that accepts the cover_image from the GrapQL as image props.
* Card images in the <PostLoop /> now link to the post (UX)
* Projects now display differently from blog posts using the same component template and slight CSS changes (`.ArticlePage.blog` vs `.ArticlePage.project`).
* Comments and cover image conditionally hidden from `blog-post.js` template when projects are queried.

## v1.0.6 - April 10, 2018

* Fixed pagination links between pages. They linked to just page numbers, instead of section/number, which actually works.

## v1.0.5 - April 5, 2018

* Fixed plugins in `package-json`. Some plugins are meant to be nested inside others. Images inside markdown files should now work, as well as SVG trace on image loading.
* Added `border-radius` to Featured component image.


## v1.0.4 - April 4, 2018

* Fixed header links
* Created `<SEO />` component that wraps React Helmet and accepts blog post data + image to generate a meta tags, Open Graph data, and Twitter tags.
* Added `<SEO />` component to the `blog-post.js` component.
* Added favicons to the root layout file `layouts/index.js`.
* Created a config file with basic site details (`/config/index.js`)
* Created `CNAME` file for Github Pages. Deploying to GP was causing the custom domain to break, adding the CNAME file is apparently the solution [#7538](https://github.com/travis-ci/travis-ci/issues/7538#issuecomment-290148354)


## v1.0.3 - April 3, 2018

* Installed `gatsby-plugin-feed`, google-analytics,manifest, twitter, sitemap, prismjs.
* * Syntax highliting with `prismjs`
* * PWA manifest generated on build
* * Twitter embedded using blockquotes in markdown (dont include script)
* * Sitemap and RSS feed generated on build
* Created blog and project pagination
* * Made separate functions in `gatsby-node.js` for each pagination task.
* Created tag list page + individual pages for each tag
* Added contact CTA to frontpage
* Added animations to frontpage hero text
* Swapped `<Skills />` component section with new `<ServicesGrid />`

## v1.0.2 - April 2, 2018

* Installed `react-image` and other plugins to handle responsive images. 
* * Automatically takes any image linked in Markdown files and copies to public folder + extends image GraphQL field to include file URL. 
* * Also allows for use of `<Img />` component to responsively scale images. 
* * Altered CSS to accomodate new component.
* Refactored components `<Featured />` and `<PostLoop />`
* Added `<Skills />` component to show list of languages/software I know + mobile friendly overflow and animated transition
* Added [`gatsby-paginate` plugin](https://github.com/pixelstew/gatsby-paginate) to add pagination static routes for blog, project, etc. The paginate code is added in `gatsby-node.js`. @todo: only slug get passed through to archive page, need more fields

## v1.0.1 - March 30, 2018

* Installed `react-mailchimp` + integrated
* Added CSS on-load animations
* Added tags to frontmatter on posts
* Header changed to fixed
* CSS hover animations fixed (cards + featured)
* Refined single post footer meta (author + share links)
* Added real share links for  Twitter/Tumblr
* Refactored SVG social icons into components

## 1.0.0 - March 28, 2018

* Installed from clone of my Gatsby + Github Pages blog starter.
* Added styles

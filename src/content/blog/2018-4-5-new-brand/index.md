---
title: New blog, new brand, new stack
date: "2018-04-05"
section: blog
cover_image: "./new-brand-cover.jpg"
tags: [ 'design', 'development', 'react', 'github', 'gatsbyjs', 'ssg', 'static site generator' ]
---

My new personal blog and portfolio is now online. And it's a static ReactJS progressive web application made with GatsbyJS! Let me break it down for you.

## But wait, who are you?

I'm Ryosuke, or some of you might recognize me as Oscar, the owner of WeedPornDaily, Stay Regular, and Kushy. 

I've been developing websites for over 15 years now, and I've been alive on this planet for nearly 28 now. I've created dozens of [brands and products from scratch](http://be.net/oscardiaz), but the one brand I've never been fully happy with is my own. Designers and developers are expected to create a personal brand to promote themselves, and I've never cared to stand by my name. I've always tried operating under a studio or agency, or working with another brand, never really promoting my own name. I never liked my name, never liked hearing it, and never understood why I was called it. My parents would tell you that it was my great grandfathers name, who was no one of particular note, and that's the reason. And I'd say that's **some weak branding.**

So for years I've wrestled with the mission of discovering my own personal brand. I know what I like, and I know what I don't. But one of the most difficult things to do is branding. For companies and products, it can be nearly *disposable*, with certain brands having short lifespans. But this brand was of the more literal sense, like a veritable tattoo on my existence, or a mark of ink I had to make sure I was confident with. I'll dig into the entire process of personal branding *another time*, but I wanted to preface this blog with some pretext on the present. 

From now on, Ryosuke was Oscar, Oscar became Ryosuke, and now only **Ryosuke** is all that's left looking forward.

## But why design a new website?

New personal brand = new website showing it off.

And I wanted to wrap my head around the GatsbyJS framework. I had minimal experience with it a few months ago when I was looking for static solutions for my [Stay Regular](http://stayregular.net) studio and [WeedPornDaily](http://weedporndaily.com) blog. I ended up using it for the [Kushy](http://kushy.net) documentation before switching to Slate (although I may switch back, as I prefer the JS backend over Ruby). They've come a long way since I first used it -- from much improved documentation to a trove of plugins I was dying to explore.

## PWA or Bust

My goal was to create a website that was *(mostly)* **static**, classified as a [**progressive web app** or PWA](https://developers.google.com/web/progressive-web-apps/), deployed from a [Git repository](https://github.com/whoisryosuke/ryosuke-gatsby-blog/), and **served only by CDN**. All of my content is preloaded from the API during the build process, and hard-coded into the HTML. Only things like comments are loaded from remote APIs, since the system would require a server-side application to handle authenticated requests (and I'm saving my cycles on Heroku).

> When compiled, this website is purely HTML, CSS, and JS. 

I'm able to accomplish all of this thanks to the magic of the GatsbyJS framework. It acts as a sort of **static site generator** that builds static sites from [ReactJS](http://reactjs.org) components and a [GraphQL](http://graphql.org/) API. Rather than fuss with something like [next.js](https://github.com/zeit/next.js/) to handle SSR *(and still not have route splitting or Webpack setup)*, GatsbyJS makes it simple to package a complete server-side rendered static React application.

> The GatsbyJS framework handles everything from webpack bundling, to route splitting, to server-side rendering. 

## The Featured

I come from the world of [Wordpress](http://wordpress.org), so I tried to make this blog as full featured as possible. The GatsbyJS framework provides you with a boilerplate *Hello World* style app with 2 pages, and that's it. Everything else requires a plugin or custom code. All these features are added on top of the base GatsbyJS features:

* **One-click deploy** - I simply run `npm run deploy` and the website is built and uploaded to Github Pages from my local machine.
* **Markdown** - All my content is written in Markdown with small bits of HTML sprinkled in when necessary. 
* **Syntax Highlighting** - Code is colored by PrismJS, and integrated using a Gatsby Prism plugin.
* **Responsive Images** - All the images on the website respond the user's browser size, serving smaller files for smaller viewports, making the site super data efficient.
* **Tags** - I have a [tag page](http://whoisryosuke.com/tags) where you can browse all the tags from every post, and clicking each tag takes you to the tag archive (more SEO points!).
* **Paginated Archives** - You can't have proper SEO without a way for users and robots to browse your entire content library. I was able to pull this off with a plugin and some magic.
* **Comments** - These are handled by Disqus and their React component.
* **RSS Feed** - You can't have a blog without an RSS feed for someone to feed directly into their brain as opposed to using the interface you toiled over for weeks. This was made dead simple with a plugin too.
* **SEO Optimized** - From being server-side rendered, to pumping out Structured Data using `react-helmet`, to a sitemap I installed -- this website is ready for Google.

**The only thing missing is a CMS**, but I wouldn't be able to use Github Pages, I'd have to use a service like [Netlify](http://netlify.com) to handle automated builds.

## The Design

I set stylistic standards for the brand by picking things like font and colors. I wanted something light, modern, and graphic -- with inspiration from Japanese design. Blue was the most dominant color, since it represented me. I then experimented with creating components to exemplify the direction of the design system. Heavy use of white space, rounded edges, and subtle gradients to create a soft space. And bold graphic images and colors would break up the monotony of a white wall.

Here's what I ended up with after a few rounds in Sketch:

<img src="./ryosuke-blog-page.png" alt="Ryosuke page mockup in Sketch" />
<img src="./ryosuke-blog-posts.png" alt="Ryosuke blog mockup in Sketch" />

## The Development

The GatsbyJS docs are fantastic. Most of what I was able to do was outlined pretty well in there. Although there were a few techniques that I had to really search to find in Github issues or StackOverflow answers.

I couldn't find it anywhere in the docs how to accomplish multiple GraphQL queries on a page. GatsbyJS only allows for GraphQL queries in main layout templates, not inside individual components. Everyone kept pointing to the GraphQL docs and saying to use fragments, but the GraphQL docs only describe fragments as a way to fetch fields for queries -- not entire queries. Finally I found someone on Github having a similar issue, and someone showed how to define multiple GraphQL queries on a single page:

```js
export const query = graphql`
  query IndexQuery {
    blog: allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}, 
      limit: 3
      filter:{frontmatter:{section:{eq: "blog"}}}
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            cover_image {
              publicURL
              childImageSharp {
                sizes(maxWidth: 1240 ) {
                  srcSet
                }
              }
            }
            section
          }
          fields {
            slug
          }
          excerpt
        }
      }
    },
    projects: allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}, 
      limit: 3
      filter:{frontmatter:{section:{eq: "project"}}}
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            cover_image {
              publicURL
              childImageSharp {
                sizes(maxWidth: 1240 ) {
                  srcSet
                }
              }
            }
            section
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
```

I also had an issue figuring out the GatsbyJS `createPage` method for generating static pages for nodes in the `gatsby-node.js` file. In the docs, they describe using the function by calling a promise that queries the GraphQL for data, that then gets converted into static pages (like individual blog posts). However, I needed to run multiple queries on different endpoints, such as blogs AND projects. I figured this one out by observing someone's GatsbyJS website on Github. I ended up using callback functions inside the `createPage` method and passed the callbacks the necessary variables to query GraphQL:

```js
/**
 *  Pagination for /blog/ page
 */
function createBlogPagination(graphql, createPage, resolve, reject) {
        graphql(`
      {
        allMarkdownRemark(
        filter:{frontmatter:{section:{eq: "blog"}}}
        ) {
            totalCount
            edges {
                node {
                id
                }
            }
        }
      }
    `).then(result => {

                createPaginatedPages({
                    edges: result.data.allMarkdownRemark.edges,
                    createPage: createPage,
                    pageTemplate: "src/templates/blog-archive.js",
                    pageLength: 6,
                    pathPrefix: "blog",
                    buildPath: (index, pathPrefix) => index > 1 ? `${pathPrefix}/${index}` : `/${pathPrefix}` // This is optional and this is the default
                });

            })
}

/**
 *  Create slug pages for markdown files
 *  Create pages for each tag
 */
exports.createPages = ({ graphql, boundActionCreators }) => {
    const { createPage } = boundActionCreators
    return new Promise((resolve, reject) => {
        graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
                excerpt
                }
          }
        }
      }
    `).then(result => {
                /**
                 * Create blog posts based on slugs
                 */
                result.data.allMarkdownRemark.edges.forEach(({ node }) => {

                    // Grab random tag to do related posts
                    var tag = node.frontmatter.tags[Math.floor(Math.random() * node.frontmatter.tags.length)];
                    
                    createPage({
                        path: node.fields.slug,
                        component: path.resolve(`./src/templates/blog-post.js`),
                        context: {
                            // Data passed to context is available in page queries as GraphQL variables.
                            tag: tag,
                            slug: node.fields.slug,
                        },
                    })
                });
                
                resolve()
            })
        createBlogPagination(graphql, createPage, resolve, reject);
        createProjectsPagination(graphql, createPage, resolve, reject);
    })
};
```

## JAMstacks are the future

As I observe trends in full-stack web development, I'm finding [more companies talking about switching to a microservice based architecture](https://www.youtube.com/watch?v=9-VuJTiVsCo) where the client-side application talks to several different APIs for different functions. And depending on the application, it becomes easier to push more data into the CDN, preloaded from the APIs, allowing for a more efficient global stream of content. And it's even been proven by companies like [Smashing Magazine](http://smashingmagazine.com) that [it's possible to create static websites with authentication, or e-commerce shopping carts.](https://www.youtube.com/watch?v=_3zYAMkaMf8).

I'm excited to explore the world of JAMstacks and push the capabilities of frameworks like GatsbyJS.

## Thanks for all the fish

Thanks to GatsbyJS for creating awesome framework, and thanks for Github for hosting my repo and website for free (including a custom domain!). 

Cheers,
Oscar

***

**Keep Reading:**

* [GatsbyJS](http://gatsbyjs.org)
* [The JAM Stack: The New Front-End Stack For Web Development](https://www.youtube.com/watch?v=_3zYAMkaMf8)
* [GatsbyJS](http://gatsbyjs.org)


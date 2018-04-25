/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const createPaginatedPages = require("gatsby-paginate");

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
    const { createNodeField } = boundActionCreators
    
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode, basePath: `pages` })
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })
    }
};


/**
 *  Pagination for /blog/ page
 */
function createBlogPagination(graphql, createPage, resolve, reject) {
        graphql(`
      {
        allMarkdownRemark(
            sort: {fields: [frontmatter___date], order: DESC}, 
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
 *  Pagination for /projects/ page
 */
function createProjectsPagination(graphql, createPage, resolve, reject) {
    graphql(`
      {
        allMarkdownRemark(
            sort: {fields: [frontmatter___date], order: DESC}, 
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
    `).then(result => {

            createPaginatedPages({
                edges: result.data.allMarkdownRemark.edges,
                createPage: createPage,
                pageTemplate: "src/templates/blog-archive.js",
                pageLength: 6,
                pathPrefix: "projects",
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
                frontmatter {
                    title
                    cover_image {
                        childImageSharp {
                            sizes(maxWidth: 1240 ) {
                            tracedSVG
                            src
                            srcSet
                            }
                        }
                    }
                    date(formatString: "DD MMMM, YYYY")
                    tags
                }
                fields {
                    slug
                }
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

                /**
                 * Create archive pages for tags
                 */
                let tags = [];
                // Iterate through each post, putting all found tags into `tags`
                result.data.allMarkdownRemark.edges.forEach(({ node }) => {
                    if('tags' in node.frontmatter) {
                        tags = tags.concat(node.frontmatter.tags);
                    }
                });
                // _.each(posts, edge => {
                //     if (_.get(edge, "node.frontmatter.tags")) {
                //         tags = tags.concat(edge.node.frontmatter.tags);
                //     }
                // });
                
                // Eliminate duplicate tags
                // tags = _.uniq(tags);
                tags = tags.filter(function (item, i, ar) { return ar.indexOf(item) === i; });

                // Make tag pages
                tags.forEach(tag => {
                    let tagName = tag.replace(/\s+/g, '-').toLowerCase();
                    createPage({
                        path: `/tags/${tagName}/`,
                        component: path.resolve(`./src/templates/tags.js`),
                        context: {
                            tag,
                        },
                    });
                });


                resolve()
            })
        createBlogPagination(graphql, createPage);
        createProjectsPagination(graphql, createPage);
    })
};
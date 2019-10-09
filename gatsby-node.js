/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const createPaginatedPages = require("gatsby-paginate");

/** 
 * Custom Webpack config
 * 
 * Adds aliases for paths (like components)
 * so you don't get lost in relative hell -> '../../../'
 */
exports.onCreateWebpackConfig = ({ config, actions }) => {
    actions.setWebpackConfig({
        resolve: {
            alias: {
                '@components': path.join(__dirname, './src/components'),
                '@assets': path.join(__dirname, './src/assets'),
                '@helpers': path.join(__dirname, './src/helpers'),
                '@layouts': path.join(__dirname, './src/layouts'),
                '@templates': path.join(__dirname, './src/templates'),
            },
        },
    });
};

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
    const { createNodeField } = boundActionCreators
    
    if (node.internal.type === "Mdx") {
        const value = createFilePath({ node, getNode, basePath: `pages` })
        createNodeField({
            // Name of the field you are adding
            name: "slug",
            // Individual MDX node
            node,
            // Generated value based on filepath with "blog" prefix. We
            // don't need a separating "/" before the value because
            // createFilePath returns a path with the leading "/".
            value: `${value}`,
        })
    }
};

 /**
  * Pagination for all MDX posts
  * 
  * @param {string} section 
  * @param {string} prefix
  * @param {*} graphql 
  * @param {*} createPage 
  */
async function createMdxPagination(section, prefix, graphql, createPage, reporter) {
    const result = await graphql(`
      {
        allMdx(
            sort: {fields: [frontmatter___date], order: DESC}, 
            filter:{frontmatter:{section:{eq: "${section}"}}}
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
                                fluid(maxWidth: 1240) {
                                    base64
                                    src
                                    srcSet
                                }
                            }
                        }
                        section
                        tags
                    }
                    fields {
                        slug
                    }
                }
            }
        }
      }
    `)


    if (result.errors) {
        reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
        console.log('🚨  ERROR:',    result.errors)
    }

    createPaginatedPages({
        edges: result.data.allMdx.edges,
        createPage: createPage,
        pageTemplate: "src/templates/blog-archive.js",
        pageLength: 6,
        pathPrefix: prefix,
        buildPath: (index, pathPrefix) => index > 1 ? `${pathPrefix}/${index}` : `/${pathPrefix}` // This is optional and this is the default
    });

}

exports.createPages = async ({ graphql, actions, reporter }) => {
    // Destructure the createPage function from the actions object
    const { createPage } = actions
    const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            frontmatter {
                tags
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)
    if (result.errors) {
        reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
    }
    // Create blog post pages.
    const posts = result.data.allMdx.edges
    // We'll call `createPage` for each result
    posts.forEach(({ node }, index) => {
        // Grab random tag to do related posts
        var tag = node.frontmatter.tags[Math.floor(Math.random() * node.frontmatter.tags.length)];
        createPage({
            // This is the slug we created before
            // (or `node.frontmatter.slug`)
            path: node.fields.slug,
            // This component will wrap our MDX content
            component: path.resolve(`./src/templates/blog-post.js`),
            // We can use the values in this context in
            // our page layout component
            context: { id: node.id, tag: tag },
        })
    })

    /**
     * Create archive pages for tags
     */
    let tags = [];
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(({ node }) => {
        if('tags' in node.frontmatter) {
            tags = tags.concat(node.frontmatter.tags);
        }
    });
    // Eliminate duplicate tags
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

    // Create pagination archive pages
    await createMdxPagination('project', 'projects', graphql, createPage, reporter)
    await createMdxPagination('blog', 'blog', graphql, createPage, reporter)
}
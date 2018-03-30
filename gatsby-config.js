module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
  },
  pathPrefix: "/gatsby-github-blog",
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/blog/`,
      },
    },
  ],
};

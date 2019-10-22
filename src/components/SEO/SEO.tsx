import path from 'path'
import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import config from '../../config'

/**
 * SEO React Helmet component
 * by: @jlengstorf
 * via: https://github.com/jlengstorf/lengstorf.com/blob/master/src/components/SEO.js
 */

const getSchemaOrgJSONLD = ({
  isBlogPost,
  url,
  title,
  image,
  description,
  datePublished,
}) => {
  const schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url,
      name: title,
      alternateName: config.title,
    },
  ]

  return isBlogPost
    ? [
        ...schemaOrgJSONLD,
        {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@id': url,
                name: title,
                image,
              },
            },
          ],
        },
        {
          '@context': 'http://schema.org',
          '@type': 'BlogPosting',
          url,
          name: title,
          alternateName: config.title,
          headline: title,
          image: {
            '@type': 'ImageObject',
            url: image,
          },
          description,
          author: {
            '@type': 'Person',
            name: 'Ryosuke Hana',
          },
          publisher: {
            '@type': 'Organization',
            url: 'https://ryosuke.design',
            logo: config.logo,
            name: 'Ryosuke Hana',
          },
          mainEntityOfPage: {
            '@type': 'WebSite',
            '@id': config.url,
          },
          datePublished,
        },
      ]
    : schemaOrgJSONLD
}

const SEO = ({ postData, postImage, isBlogPost, title, description, url }) => {
  const postMeta = postData && 'frontmatter' in postData ? postData.frontmatter : {}

  const pageTitle = title || postMeta.title || config.title
  const pageDescription =
    description || postMeta.description || config.description
  const image = `${config.url}${postImage}` || config.image
  const pageUrl = url || postMeta.slug
    ? `${config.url}${path.sep}${url || postMeta.slug}`
    : config.url
  const datePublished = isBlogPost ? postMeta.datePublished : false

  const schemaOrgJSONLD = getSchemaOrgJSONLD({
    isBlogPost,
    pageUrl,
    pageTitle,
    image,
    pageDescription,
    datePublished,
  })

  return (
    <Helmet>
      {/* General tags */}
      <title>{pageTitle ? pageTitle + ' - Ryosuke' : 'Ryosuke'}</title>
      <meta name="description" content={pageDescription} />
      <meta name="image" content={image} />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta property="og:url" content={pageUrl} />
      {isBlogPost ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={image} />
      <meta property="fb:app_id" content={config.fbAppID} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={config.twitter} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}

SEO.propTypes = {
  isBlogPost: PropTypes.bool,
  postData: PropTypes.shape({
    frontmatter: PropTypes.any,
    excerpt: PropTypes.any,
  }),
  postImage: PropTypes.string,
}

SEO.defaultProps = {
  isBlogPost: false,
  postImage: null,
}

export default SEO

import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import { Box } from 'rebass/styled-components'

import Layout from '../layouts/BaseLayout'
import SEO from '@components/SEO/SEO';
import SectionHeading from '../components/SectionHeading/SectionHeading'
import PostLoop from '../components/PostLoop/PostLoop'
import Link from '../components/Link/Link'
import ButtonOutline from '../components/Button/ButtonOutline'

const Tags = ({ pathContext, data }) => {
  const { tag } = pathContext
  const { edges, totalCount } = data.tags
  const skip = false
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with `

  return (
    <Layout>
      <SEO
        key={`seo-tag-${tag}`}
        title={`Posts tagged #${tag}`}
        url={`tags/${tag}`}
      />
      <SectionHeading
        emoji="#️⃣"
        heading={tag}
        subheader={`(${totalCount} post total)`}
      />

      <Box bg="muted">
        <PostLoop loop={edges} skip={skip} />
      </Box>
      <nav className="centered">
        <Link to="/tags">
          <ButtonOutline
            width="100%"
            sx={{ borderTop: 0, borderRight: 0, borderLeft: 0 }}
          >
            All tags
          </ButtonOutline>
        </Link>
      </nav>
    </Layout>
  )
}

Tags.propTypes = {
  pathContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query TagPage($tag: String) {
    tags: allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date
            tags
            cover_image {
              publicURL
              childImageSharp {
                fluid(maxWidth: 1240) {
                  ...GatsbyImageSharpFluid
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
`

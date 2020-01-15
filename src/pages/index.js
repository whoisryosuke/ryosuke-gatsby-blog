import React, { Component } from 'react'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'
import { Box, Flex } from 'rebass/styled-components'
import { useThemeValue } from '../context/ThemeContext'

import Layout from '../layouts/BaseLayout'
import ButtonOutline from '../components/Button/ButtonOutline'
import GreetingMasthead from '../components/Masthead/GreetingMasthead'
import SectionHeading from '../components/SectionHeading/SectionHeading'
import BasicCard from '../components/Card/BasicCard'
import Newsletter from '../components/Newsletter/Newsletter'
import Featured from '../components/Featured/Featured'
import PostLoop from '../components/PostLoop/PostLoop'
import Contact from '../components/Contact/Contact'

const Frontpage = ({
  data: { blog, projects, PeaceEmoji, ThoughtCloudEmoji, CoffeeEmoji },
}) => {
  const [{ theme, selectedTheme }, dispatch] = useThemeValue()

  return (
    <Layout className="Frontpage pt2">
      <GreetingMasthead />

      {/* <ServicesGrid /> */}

      {/*------- Featured image -------*/}
      <SectionHeading emoji="📓" heading="Latest writings" />
      <Featured selectedTheme={selectedTheme}>
        <BasicCard
          width={[1, 1, 2 / 3, 1 / 2]}
          solid
          title={blog.edges[0].node.frontmatter.title}
          subheader={blog.edges[0].node.frontmatter.tags}
          description={blog.edges[0].node.excerpt}
          link={blog.edges[0].node.fields.slug}
        />
      </Featured>

      {/*------- Posts loop -------*/}
      <PostLoop type="blog" loop={blog.edges} skip={true} />
      <Box
        sx={{ borderBottom: '1px solid black', borderColor: 'black' }}
        textAlign="right"
        p={3}
      >
        <Link to={'blog'}>
          <ButtonOutline>Find more reading material</ButtonOutline>
        </Link>
      </Box>

      {/*------- Projects loop -------*/}
      <SectionHeading emoji="🎨" heading="Latest projects" />
      <PostLoop type="project" loop={projects.edges} skip={false} />
      <Flex
        sx={{ borderBottom: '1px solid black', borderColor: 'black' }}
        textAlign="right"
        justifyContent="flex-end"
        p={3}
      >
        <ButtonOutline
          width={[1, 1, 1 / 3]}
          as={Link}
          to={'projects'}
          p={2}
          height="3rem"
        >
          See more eye candy
        </ButtonOutline>
      </Flex>

      <Newsletter />

      <Contact />
    </Layout>
  )
}

export const query = graphql`
  query IndexQuery {
    blog: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
      filter: { frontmatter: { section: { eq: "blog" } } }
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
          excerpt
        }
      }
    }
    projects: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 2
      filter: { frontmatter: { section: { eq: "project" } } }
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

    PeaceEmoji: file(relativePath: { regex: "/peace.png/" }) {
      ...emojiImageFields
    }
    ThoughtCloudEmoji: file(relativePath: { regex: "/thought-cloud.png/" }) {
      ...emojiImageFields
    }
    CoffeeEmoji: file(relativePath: { regex: "/coffee.png/" }) {
      ...emojiImageFields
    }
    RyosukeAvatar: file(relativePath: { regex: "/ryosuke-avatar-128.png/" }) {
      childImageSharp {
        fixed(width: 170, height: 170) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }

  fragment emojiImageFields on File {
    childImageSharp {
      fixed(width: 36, height: 36) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`
export default Frontpage

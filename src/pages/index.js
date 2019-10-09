import React, { Component } from 'react'
import { graphql } from 'gatsby'
import { Button, Box, Flex } from 'rebass/styled-components'

import config from '../config'

import Layout from "../layouts/BaseLayout"
import Link from "../components/Link/Link"
import ButtonOutline from '../components/Button/ButtonOutline'
import GreetingMasthead from '../components/Masthead/GreetingMasthead'
import SectionHeading from '../components/SectionHeading/SectionHeading'
import BasicCard from "../components/Card/BasicCard"
import Newsletter from '../components/Newsletter'
import Featured from '../components/Featured/Featured'
import PostLoop from '../components/PostLoop'
import Contact from '../components/Contact/Contact'

export default class Frontpage extends Component {
  render() {
    let { data } = this.props
    const skip = true
    const {
      blog,
      projects,
      PeaceEmoji,
      ThoughtCloudEmoji,
      CoffeeEmoji,
      RyosukeAvatar,
    } = data

    return (
      <Layout className="Frontpage pt2">
        <GreetingMasthead />
        
        {/* <ServicesGrid /> */}

        {/*------- Featured image -------*/}
        <SectionHeading emoji="📓" heading="Latest writings" />
        <Featured>
          <BasicCard width={[1,1,2/3,1/2,1/3]} solid title={blog.edges[0].node.frontmatter.title} subheader={blog.edges[0].node.frontmatter.tags} description={blog.edges[0].node.excerpt} />
        </Featured>

        {/*------- Posts loop -------*/}
        <PostLoop type="blog" loop={blog.edges} skip={skip} />
        <Box sx={{ borderBottom: '1px solid black' }} textAlign="right" p={3}>
          <Link to={'blog'}>
            <ButtonOutline>
              Find more reading material
            </ButtonOutline>
          </Link>
        </Box>

        {/*------- Projects loop -------*/}
        <SectionHeading emoji="🎨" heading="Latest projects" />
        <PostLoop type="project" loop={projects.edges} skip={!skip} />
        <Box sx={{borderBottom:'1px solid black'}} textAlign="right" p={3}>
          <Link to={'projects'}>
            <ButtonOutline>
            See more eye candy
            </ButtonOutline>
          </Link>
        </Box>

        <Newsletter />

        <Contact />
      </Layout>
    )
  }
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

    PeaceEmoji: file(relativePath: {regex: "/peace.png/"}) {
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

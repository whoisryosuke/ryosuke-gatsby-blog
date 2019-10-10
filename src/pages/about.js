import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { Box, Flex, Text, Heading, Image } from 'rebass/styled-components'

import config from '../config'

import Layout from '../layouts/BaseLayout'
import Masthead from '../components/Masthead/Masthead'
import SectionHeading from '../components/SectionHeading/SectionHeading'
import Skills from '../components/Skills'
import Newsletter from '../components/Newsletter'
import PostLoop from '../components/PostLoop'
import Contact from '../components/Contact/Contact'

import BombEmoji from '../assets/img/emoji/bomb.png'
import TeachingEmoji from '../assets/img/emoji/teaching.png'
import RyosukePortrait from '../assets/img/avatar-face-400px.png'
import RyosukeAvatar from '../assets/img/ryosuke-avatar-128.png'

const Highlight = styled.span`
  color: ${props => props.theme.colors.primary};
`

export default class Frontpage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: this.props.data,
    }
  }

  render() {
    let { data } = this.state
    const skip = false

    return (
      <Layout className="About pt2">
        <Box px={3} py={5} sx={{ borderBottom: '1px solid black' }}>
          <Heading fontSize={[1, 2, 3]}>
            Ryosuke meaning <Highlight>clear</Highlight> mediation.
          </Heading>
          <Heading fontSize={[4, 5, 6]}>
            The artist formerly known as <Highlight>Oscar</Highlight>{' '}
            <Image src={BombEmoji} alt="Bomb emoji" width="40px" />
          </Heading>
        </Box>
        <Flex
          px={3}
          py={5}
          sx={{ borderBottom: '1px solid black' }}
          flexWrap="wrap"
        >
          <Box as="figure" width={[1, 1, 1 / 3]} textAlign="center">
            <Image
              src={RyosukePortrait}
              sx={{
                width: ['100%', '50%'],
                borderRadius: 8,
              }}
            />
          </Box>

          <Box width={[1, 1, 2 / 3]}>
            <Text variant="paragraph" px={5} mt={4} mb={4}>
              I've been working as a designer and developer for{' '}
              <strong>over 15 years now</strong>, with over a decade of
              experience in the cannabis industry.
            </Text>
            <Text variant="paragraph" px={5}>
              From engineering <a href="http://kushy.net">web apps</a> and
              e-commerce solutions, to designing brands and products, to
              producing innovative digital media, and even creating{' '}
              <strong>
                famous{' '}
                <a href="http://weedporndaily.tumblr.com/tagged/gif">
                  ganja related GIFs
                </a>
              </strong>{' '}
              -- my experience as an <strong>entrepreneur</strong> has broadened
              my skillset substantially.
            </Text>
          </Box>
        </Flex>

        <Skills />

        {/*------- Featured image -------*/}
        <SectionHeading emoji="🚀" heading="My recent work" tall />
        {/*------- Posts loop -------*/}
        <PostLoop loop={data.projects.edges} skip={skip} />

        {/*------- Speaking / Workshops -------*/}
        <SectionHeading emoji="🎓" heading="Speaking and Workshops" tall />
        <Box
          as="section"
          px={3}
          py={5}
          className="Speaking"
          sx={{ borderBottom: '1px solid black' }}
        >
          <Text px={5}>
            I’m available for speaking gigs,{' '}
            <a href="mailto:ryosuke.san.hana@gmail.com">contact me anytime</a>.
            I love to speak about my experiences with full-stack development,
            entrepreneurship, or design and branding.
          </Text>
          {/* <h3 className="Title text blue">Upcoming Speaking Engagements</h3>
                    <ul>
                        <li>
                            <a href="#">Gig</a>
                        </li>
                    </ul> */}
          {/* <h3 className="Title text blue">Previous Speaking Engagements</h3> */}
        </Box>

        <Newsletter />

        <Contact />
      </Layout>
    )
  }
}

export const query = graphql`
  query AboutQuery {
    projects: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 4
      filter: { frontmatter: { section: { eq: "project" } } }
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

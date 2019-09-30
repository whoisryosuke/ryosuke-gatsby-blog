import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

import config from '../config'

import Layout from "../layouts/index"
import ServicesGrid from '../components/ServicesGrid'
import Newsletter from '../components/Newsletter'
import Featured from '../components/Featured'
import PostLoop from '../components/PostLoop'
import FrontpageContact from '../components/Frontpage/Contact'

export default class Frontpage extends Component {
  render() {
    let { data } = this.props
    const skip = true
    console.log('graphql data', data)
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
        <div className="container Frontpage__hero">
          <h1>
            Hey I'm <span className="text blue">Ryosuke</span>{' '}
            <Img fixed={PeaceEmoji.childImageSharp.fixed} alt="Peace sign emoji" />
            <br />Designer, developer,
            <br /> &amp; influencer{' '}
            <Img
              fixed={ThoughtCloudEmoji.childImageSharp.fixed}
              alt="Thought cloud emoji"
            />
          </h1>
        </div>
        <div className="container Frontpage__about">
          <figure>
            <Img
              fixed={RyosukeAvatar.childImageSharp.fixed}
              alt="Ryosuke in white Japanese font on blue background"
            />
          </figure>
          <p>
            I'm a <strong>designer</strong> and{' '}
            <strong>full stack engineer</strong> currently residing in Los
            Angeles. I live for <strong>stunning design</strong>,{' '}
            <strong>accessible UX</strong>, and{' '}
            <strong>inspiring others</strong> through my work.
          </p>
        </div>

        <ServicesGrid />

        {/*------- Featured image -------*/}
        <div className="container">
          <h2 className="Title text blue">Latest posts</h2>
        </div>
        <Featured post={blog.edges[0].node} />

        {/*------- Posts loop -------*/}
        <PostLoop loop={blog.edges} skip={skip} />
        <div className="container centered">
          <Link to={'blog'} className="btn">
            Find more reading material
          </Link>
        </div>

        {/*------- Projects loop -------*/}
        <div className="container pt4">
          <h2 className="Title text blue">Latest projects</h2>
        </div>
        <PostLoop loop={projects.edges} skip={!skip} />
        <div className="container centered">
          <Link to={'projects'} className="btn">
            See more eye candy
          </Link>
        </div>

        <Newsletter />

        <FrontpageContact CoffeeEmoji={CoffeeEmoji} />
      </Layout>
    )
  }
}

export const query = graphql`
  query IndexQuery {
    blog: allMarkdownRemark(
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
    projects: allMarkdownRemark(
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

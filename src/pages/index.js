import React, { Component } from "react";
import Link from "gatsby-link";
import Img from "gatsby-image";

import config from '../config';

import ServicesGrid from '../components/ServicesGrid';
import Newsletter from '../components/Newsletter';
import Featured from '../components/Featured';
import PostLoop from '../components/PostLoop';
import FrontpageContact from '../components/Frontpage/Contact';

export default class Frontpage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: this.props.data,
    }
  }

  render() {
    let { data } = this.state;
    const skip = true;

    const { 
      blog, 
      projects, 
      PeaceEmoji, 
      ThoughtCloudEmoji, 
      CoffeeEmoji, 
      RyosukeAvatar
    } = data;
    
    return (
      <div className="Frontpage pt2">
        <div className="container Frontpage__hero">
          <h1>
            Hey I'm <span className="text blue">Ryosuke</span> <Img resolutions={PeaceEmoji.resolutions} alt="Peace sign emoji" />
            <br />Designer, developer,
            <br /> &amp; influencer <Img resolutions={ThoughtCloudEmoji.resolutions} alt="Thought cloud emoji" />
          </h1>
        </div>
        <div className="container Frontpage__about">
          <figure>
            <Img resolutions={RyosukeAvatar.resolutions} alt="Ryosuke in white Japanese font on blue background" />
          </figure>
          <p>I'm a <strong>designer</strong> and <strong>full stack engineer</strong> currently residing in Los Angeles. I live for <strong>stunning design</strong>, <strong>accessible UX</strong>, and <strong>inspiring others</strong> through my work.</p>
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
          <Link to={'blog'} className="btn">Find more reading material</Link>
        </div>

        {/*------- Projects loop -------*/}
        <div className="container pt4">
          <h2 className="Title text blue">Latest projects</h2>
        </div>
        <PostLoop loop={projects.edges} skip={!skip} />
        <div className="container centered">
          <Link to={'projects'} className="btn">See more eye candy</Link>
        </div>
        
        <Newsletter />

        <FrontpageContact CoffeeEmoji={ CoffeeEmoji } />

      </div>
    );
  }
};

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
            date
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
      limit: 2
      filter:{frontmatter:{section:{eq: "project"}}}
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
    },
    PeaceEmoji: imageSharp (id: { regex: "/peace.png/" }) {
          ...emojiImageFields
    },
    ThoughtCloudEmoji: imageSharp (id: { regex: "/thought-cloud.png/" }) {
          ...emojiImageFields
    },
    CoffeeEmoji: imageSharp (id: { regex: "/coffee.png/" }) {
      resolutions(width: 36, height: 36) {
        ...GatsbyImageSharpResolutions
      }
    },
    RyosukeAvatar: imageSharp (id: { regex: "/ryosuke-avatar-128.png/" }) {
      resolutions(width: 170, height: 170) {
        ...GatsbyImageSharpResolutions
      }
    },
  }

  fragment emojiImageFields on ImageSharp {
    resolutions(width: 54, height: 54) {
      ...GatsbyImageSharpResolutions
    }
  }
`;
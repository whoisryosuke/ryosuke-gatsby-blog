import React, { Component } from "react";
import Link from "gatsby-link";

import ServicesGrid from '../components/ServicesGrid';
import Newsletter from '../components/Newsletter';
import Featured from '../components/Featured';
import PostLoop from '../components/PostLoop';
import FrontpageContact from '../components/Frontpage/Contact';

import PeaceEmoji from '../assets/img/emoji/peace.png';
import ThoughtCloudEmoji from '../assets/img/emoji/thought-cloud.png';
import RyosukeAvatar from '../assets/img/ryosuke-avatar-128.png';

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

    const { blog, projects } = data;

    console.log('the data');
    console.log(data);

    return (
      <div className="Frontpage pt2">
        <div className="container Frontpage__hero">
          <h1>
            Hey I'm <span className="text blue">Ryosuke</span> <img src={PeaceEmoji} alt="Peace sign emoji" />
            <br />Designer, developer,
            <br /> &amp; influencer <img src={ThoughtCloudEmoji} alt="Peace sign emoji" />
          </h1>
        </div>
        <div className="container Frontpage__about">
          <figure>
            <img src={RyosukeAvatar} />
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

        {/*------- Projects loop -------*/}
        <div className="container">
          <h2 className="Title text blue">Latest projects</h2>
        </div>
        <PostLoop loop={projects.edges} skip={!skip} />
        
        <Newsletter />

        <FrontpageContact />

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
          excerpt
        }
      }
    },
    projects: allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}, 
      limit: 3
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
`;
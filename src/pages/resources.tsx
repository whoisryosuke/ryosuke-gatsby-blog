import React, { Component } from "react";
import { graphql } from 'gatsby'
import Link from "gatsby-link";
import styled from 'styled-components'
import { Box, Flex, Text, Heading, Image } from 'rebass/styled-components'

import Layout from "../layouts/BaseLayout"
import Masthead from '../components/Masthead/Masthead';
import SectionHeading from '../components/SectionHeading/SectionHeading';
import DesignResources from '@components/DesignResources/DesignResources';
import DevResources from '../components/DevResources/DevResources';
import Newsletter from '../components/Newsletter';
import PostLoop from '../components/PostLoop';
import Contact from '../components/Contact/Contact';

import BombEmoji from '../assets/img/emoji/bomb.png';
import RyosukePortrait from '../assets/img/avatar-face-400px.png';

const Highlight = styled.span`
  color:${(props) => props.theme.colors.primary};
`

interface Props {
  data: any
}

export const resources: React.FC<Props> = ({data}) => {
  return (
    <Layout className="About pt2">
      {/*------- Design resources card grid -------*/}
      <SectionHeading emoji="🎨" heading="Design resources" />
      <DesignResources resources={data.design.edges} />

      {/*------- Dev resources data table -------*/}
      <SectionHeading tall emoji="⚙️" heading="Development resources" />
      <DevResources resources={data.development.edges} />

      {/*------- Lastest posts tagged tutorial -------*/}
      <SectionHeading emoji="🚀" heading="My recent work" tall />
      <PostLoop loop={data.projects.edges} skip={false} />

      <Newsletter />

    </Layout>
  )
}

export const query = graphql`
  query ResourcesQuery {
    projects: allMdx(
      sort: {fields: [frontmatter___date], order: DESC}, 
      limit: 4
      filter: { frontmatter: { tags: { in: ["tutorial"] } } }
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
    },
    development: allResourcesJson {
      edges {
        node {
          resources {
            development {
              categories
              link
              name
              software
              install
              description
            }
          }
        }
      }
    },
    design: allResourcesJson {
      edges {
        node {
          resources {
            design {
              category
              link
              name
              image
              description
            }
          }
        }
      }
    }
  }
`;

export default resources
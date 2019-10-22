import React, { Component } from 'react'
import styled from 'styled-components'
import GLink from 'gatsby-link'
import { Flex, Box, Text, Link as RLink } from 'rebass/styled-components'

import capitalizeFirstLetter from '../helpers/uppercase'

import MastheadSVG from '@assets/svg/masthead-circles.svg'

import Layout from '../layouts/BaseLayout'
import SEO from '@components/SEO/SEO';
import ButtonOutline from '../components/Button/ButtonOutline'
import SectionHeading from '../components/SectionHeading/SectionHeading'
import PostLoop from '../components/PostLoop/PostLoop'
import Link from '@components/Link/Link'

const StyledLink = styled(GLink)`
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  top: 0;
  left: 0;

  text-decoration: none;
  color: ${props => props.theme.colors.black};

  &:hover, &:focus {
    color: ${props => props.theme.colors.white};
  }
`

const StyledBackground = styled.section`
  background-image: url(${MastheadSVG});
  background-repeat: no-repeat;
  background-size: 50%;
  background-position: top right;
`

const NavLink = props => {
  if (!props.test) {
    return (
      <StyledLink to={props.url}>
        <Text variant="label" px={3} py={5}>
          {props.text}
        </Text>
      </StyledLink>
    )
  } else {
    return (
      <Text color="gray" variant="label">
        {props.text}
      </Text>
    )
  }
}

const IndexPage = ({ data, pathContext }) => {
  const { group, index, first, last, pageCount, pathPrefix } = pathContext
  const previousUrl =
    index - 1 == 1
      ? '/' + pathPrefix + '/'
      : '/' + pathPrefix + '/' + (index - 1).toString()
  const nextUrl = '/' + pathPrefix + '/' + (index + 1).toString()

  const emojis = {
    projects: '🎨',
    blog: '📓',
  }
  const sectionName = capitalizeFirstLetter(pathPrefix)

  return (
    <Layout className="BlogArchive">
      <SEO
        key="seo-resources"
        title={`${sectionName} Archive - Page ${index}`}
        url={pathPrefix}
      />
      <StyledBackground>
        <SectionHeading
          emoji={emojis[pathPrefix]}
          heading={`${sectionName} archive`}
          subheader={`Page ${index}`}
        />

        <Box bg="muted">
          <PostLoop type={pathPrefix} loop={group} />
        </Box>

        <Flex as="nav" justifyContent="space-between">
          <ButtonOutline
            textAlign="left"
            px={3} 
            py={5}
            width={[1 / 2, 1 / 2, 1 / 2]}
            sx={{ borderTop: 0, borderLeft: 0, borderRight: 0 }}
            ariaLabel="prev"
            height="3rem"
          >
            <NavLink test={first} url={previousUrl} text="Previous Page" />
          </ButtonOutline>
          <ButtonOutline
            textAlign="right"
            px={3} 
            py={5}
            width={[1 / 2, 1 / 2, 1 / 2]}
            sx={{ borderTop: 0, borderRight: 0 }}
            ariaLabel="next"
            height="3rem"
          >
            <NavLink test={last} url={nextUrl} text="Next Page" />
          </ButtonOutline>
        </Flex>
        <Flex>
            <ButtonOutline width={[1]} height="3rem" p={3} sx={{borderRight:0, borderLeft:0, borderTop:0}}>
              <StyledLink to="tags">
                <Text variant="label" p={3}>
                  Browse by tag
                </Text>
              </StyledLink>
            </ButtonOutline>
        </Flex>

      </StyledBackground>
    </Layout>
  )
}
export default IndexPage

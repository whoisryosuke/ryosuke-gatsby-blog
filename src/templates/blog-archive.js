import React, { Component } from 'react'
import styled from 'styled-components'
import GLink from 'gatsby-link'
import { Flex, Box, Text } from 'rebass/styled-components'

import capitalizeFirstLetter from '../helpers/uppercase'

import MastheadSVG from '@assets/svg/masthead-circles.svg'

import Layout from '../layouts/BaseLayout'
import SEO from '@components/SEO/SEO'
import ButtonOutline from '../components/Button/ButtonOutline'
import SectionHeading from '../components/SectionHeading/SectionHeading'
import PostLoop from '../components/PostLoop/PostLoop'

const StyledBackground = styled.section`
  background-image: url(${MastheadSVG});
  background-repeat: no-repeat;
  background-size: 50%;
  background-position: top right;
`

const NavLink = ({ test, text, type, url }) => {
  const textAlign = type == 'previous' ? 'left' : 'right'
  const label = type == 'previous' ? 'prev' : 'next'
  const previousBorder = {
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
    justifyContent: 'flex-start',
  }
  const nextBorder = {
    borderTop: 0,
    borderRight: 0,
    justifyContent: 'flex-end',
  }
  const sx = type == 'previous' ? previousBorder : nextBorder

  if (!test) {
    return (
      <ButtonOutline
        as={GLink}
        to={url}
        px={3}
        py={3}
        width={[1 / 2, 1 / 2, 1 / 2]}
        sx={sx}
        ariaLabel={label}
        height="3rem"
      >
        <Text variant="label">{text}</Text>
      </ButtonOutline>
    )
  } else {
    return (
      <ButtonOutline
        as="span"
        type="disabled"
        px={3}
        py={3}
        width={[1 / 2, 1 / 2, 1 / 2]}
        sx={sx}
        ariaLabel={label}
        height="3rem"
      >
        <Text variant="label">{text}</Text>
      </ButtonOutline>
    )
  }
}

const BlogArchive = ({ data, pathContext }) => {
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
          <NavLink
            test={first}
            url={previousUrl}
            type="previous"
            text="Previous Page"
          />
          <NavLink test={last} url={nextUrl} text="Next Page" />
        </Flex>
        <Flex>
          <ButtonOutline
            as={GLink}
            to="tags"
            width={[1]}
            height="3rem"
            p={3}
            sx={{
              borderRight: 0,
              borderLeft: 0,
              borderTop: 0,
              justifyContent: 'center',
            }}
          >
            <Text variant="label">Browse by tag</Text>
          </ButtonOutline>
        </Flex>
      </StyledBackground>
    </Layout>
  )
}
export default BlogArchive

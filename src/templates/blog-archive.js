import React, { Component } from 'react'
import styled from 'styled-components'
import GLink from 'gatsby-link'
import { Flex, Box, Text, Link as RLink } from 'rebass/styled-components'

import capitalizeFirstLetter from '../helpers/uppercase'

import MastheadSVG from '@assets/svg/masthead-circles.svg'

import Layout from '../layouts/BaseLayout'
import ButtonOutline from '../components/Button/ButtonOutline'
import SectionHeading from '../components/SectionHeading/SectionHeading'
import PostLoop from '../components/PostLoop/PostLoop'

const StyledLink = styled(GLink)`
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  top: 0;
  left: 0;

  text-decoration: none;
  color: ${props => props.theme.colors.black};

  &:hover {
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
        <Text variant="label" p={3}>
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

  return (
    <Layout className="BlogArchive">
      <StyledBackground>
        <SectionHeading
          emoji={emojis[pathPrefix]}
          heading={`${capitalizeFirstLetter(pathPrefix)} archive`}
          subheader={`Page ${index}`}
        />

        <Box bg="muted">
          <PostLoop type={pathPrefix} loop={group} />
        </Box>

        <Flex as="nav" justifyContent="space-between">
          <ButtonOutline
            test={first}
            textAlign="left"
            p={3}
            width={[1 / 2, 1 / 2, 1 / 2]}
            sx={{ borderTop: 0, borderLeft: 0, borderRight: 0 }}
            ariaLabel="prev"
          >
            <NavLink test={first} url={previousUrl} text="Previous Page" />
          </ButtonOutline>
          <ButtonOutline
            test={last}
            textAlign="right"
            p={3}
            width={[1 / 2, 1 / 2, 1 / 2]}
            sx={{ borderTop: 0, borderRight: 0 }}
            ariaLabel="next"
          >
            <NavLink test={last} url={nextUrl} text="Next Page" />
          </ButtonOutline>
        </Flex>
      </StyledBackground>
    </Layout>
  )
}
export default IndexPage

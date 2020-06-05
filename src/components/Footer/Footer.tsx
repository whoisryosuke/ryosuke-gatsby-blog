import React from 'react'
import styled from 'styled-components'
import { Box, Flex, Image, Text } from 'rebass/styled-components'

import Storybook from '@assets/svg/storybook.svg'
import CodePen from '@assets/svg/social-codepen.svg'
import Twitch from '@assets/svg/social-twitch.svg'
import YouTube from '@assets/svg/social-youtube.svg'
import Instagram from '@assets/svg/social-instagram.svg'
import Twitter from '@assets/svg/social-twitter.svg'
import LinkedIn from '@assets/svg/social-linkedin.svg'
import Dribbble from '@assets/svg/social-dribbble.svg'
import Behance from '@assets/svg/social-behance.svg'
import Github from '@assets/svg/social-github.svg'

import BehanceIcon from '@components/icons/Behance'
import CodePenIcon from '@components/icons/CodePen'
import DribbbleIcon from '@components/icons/Dribbble'
import GithubIcon from '@components/icons/Github'
import HashnodeIcon from '@components/icons/Hashnode'
import InstagramIcon from '@components/icons/Instagram'
import LinkedInIcon from '@components/icons/LinkedIn'
import StorybookIcon from '@components/icons/Storybook'
import TumblrIcon from '@components/icons/Tumblr'
import TwitchIcon from '@components/icons/Twitch'
import TwitterIcon from '@components/icons/Twitter'

const StyledFlex = styled(Flex)`
  padding: 3rem 4rem;

  ${(props) => props.theme.mediaQueries.mobile} {
    text-align: center;

    & .icon-nav {
      flex-wrap: wrap;
      justify-content: center;
    }
  }
  ${(props) => props.theme.mediaQueries.tablet} {
    text-align: left;
    & .icon-nav {
      justify-content: flex-end;
    }
  }
`

const StyledLink = styled.a`
  border-bottom: 0;
  margin-right: 1em;
  opacity: 0.5;
  transition: opacity ${(props) => props.theme.animation.default};

  &:hover {
    opacity: 1;
  }

  & svg {
    max-width: 30px;
    max-height: 30px;
  }
`

interface Props {}

export const Footer: React.FC<Props> = () => {
  return (
    <Box as="footer" bg="white">
      <StyledFlex justifyContent="space-between" flexWrap="wrap">
        <Box width={[1, 1, 1, 1 / 3]} mb={3}>
          <Text variant="label" color="black">
            Copyright &copy; 2019, Oscar Diaz
          </Text>
        </Box>
        <Flex className="icon-nav" width={[1, 1, 1, 2 / 3]}>
          <StyledLink
            href="https://codepen.io/whoisryosuke"
            title="See my code on CodePen"
          >
            <CodePenIcon alt="CodePen logo" />
          </StyledLink>

          <StyledLink
            href="https://twitch.tv/whoisryosuke"
            title="Watch me live code or design on Twitch"
          >
            <TwitchIcon alt="Twitch logo" />
          </StyledLink>

          {/* <StyledLink href="#comingsoon">
            <Image src={YouTube} />
          </StyledLink> */}

          <StyledLink
            href="https://instagram.com/whoisryosuke"
            title="Follow me on Instagram"
          >
            <InstagramIcon alt="Instagram logo" />
          </StyledLink>

          <StyledLink
            href="https://twitter.com/whoisryosuke"
            title="Follow me on Twitter"
          >
            <TwitterIcon alt="Twitter logo" />
          </StyledLink>

          <StyledLink
            href="https://linkedin.com/in/stoneddesigner"
            title="Join me on LinkedIn"
          >
            <LinkedInIcon alt="LinkedIn logo" />
          </StyledLink>

          <StyledLink
            href="https://dribbble.com/whoisryosuke"
            title="See me designs on Dribbble"
          >
            <DribbbleIcon alt="Dribbble logo" />
          </StyledLink>

          <StyledLink
            href="https://www.behance.net/whoisryosuke"
            title="See my designs on Behance"
          >
            <BehanceIcon alt="Behance logo" />
          </StyledLink>

          {/* <StyledLink
            href="https://hashnode.com/whoisryosuke"
            title="See my posts on HashnodeIcon"
          >
            <HashnodeIcon alt="Hashnode logo" />
          </StyledLink> */}

          <StyledLink
            href="https://github.com/whoisryosuke"
            title="See my open source code contributions on Github"
          >
            <GithubIcon alt="Github logo" />
          </StyledLink>

          <StyledLink
            href="https://storybook.whoisryosuke.com"
            title="Browse this site's Storybook component documentation"
          >
            <StorybookIcon alt="Storybook logo" />
          </StyledLink>
        </Flex>
      </StyledFlex>
    </Box>
  )
}

export default Footer

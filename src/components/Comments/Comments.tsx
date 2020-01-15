import React from 'react'
import { Flex } from 'rebass/styled-components'

import ButtonOutline from '../Button/ButtonOutline'

interface Props {
  post: {
    frontmatter: {
      title: string
      tags: string[]
    }
    fields: {
      slug: string
    }
  }
}

export const Comments: React.FC<Props> = ({ post }) => {
  return (
    <Flex className="Comments container">
      <ButtonOutline
        as="a"
        width={[1 / 2]}
        height="3rem"
        p={3}
        href={`http://twitter.com/share?text=${post.frontmatter.title}&url=http://whoisryosuke.com/${post.fields.slug}&hashtags=${post.frontmatter.tags}`}
        sx={{ borderTop: 0, borderLeft: 0, borderRight: 0 }}
      >
        🐦<sup>💬</sup> Discuss on Twitter
      </ButtonOutline>
      <ButtonOutline
        as="a"
        width={[1 / 2]}
        height="3rem"
        p={3}
        href={`http://www.tumblr.com/share/link?url=http://whoisryosuke.com${post.fields.slug}`}
        sx={{ borderTop: 0, borderRight: 0 }}
      >
        🌯<sup>💬</sup> Discuss on Tumblr
      </ButtonOutline>
    </Flex>
  )
}

export default Comments

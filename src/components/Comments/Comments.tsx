import React from 'react'
import { Box, Flex, Button } from 'rebass/styled-components'

import ButtonOutline from '../Button/ButtonOutline'

interface Props {
  post: {
    frontmatter: {
      title: string
      tags: string[]
    },
    fields: {
      slug: string
    }
  }
}

export const Comments: React.FC<Props> = ({post}) => {
  return (
    <Flex className="Comments container">
      <Box
        as="a"
        width={[1 / 2]}
        href={`http://twitter.com/share?text=${post.frontmatter.title}&url=http://whoisryosuke.com/${post.fields.slug}&hashtags=${post.frontmatter.tags}`}
      >
        <ButtonOutline width={1} sx={{ borderRight: 0 }}>
          Discuss on Twitter
        </ButtonOutline>
      </Box>
      <Box
        as="a"
        width={[1 / 2]}
        href={`http://www.tumblr.com/share/link?url=http://whoisryosuke.com${post.fields.slug}`}
      >
        <ButtonOutline width={1}>Discuss on Tumblr</ButtonOutline>
      </Box>
    </Flex>
  )
}

export default Comments
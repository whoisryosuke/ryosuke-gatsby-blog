import React from 'react'
import { Flex } from 'rebass/styled-components'
import nicetime from '../../helpers/nicetime'

import BasicCard from '../Card/BasicCard'
import ProjectCard from '../Card/ProjectCard'

export default props => {
  const links = {
    blog: 'Read post',
    project: 'View project',
  }
  let postLoop
  const currentDate = new Date()

  if (props.loop !== undefined) {
    postLoop = props.loop
      .filter(({ node }) => {
        if (props.skip === true) {
          return props.loop[0].node !== node
        } else {
          return node
        }
      })
      .map(({ node }) => {
        let postDate = new Date(node.frontmatter.date)
        switch (props.type) {
          case 'blog':
          case 'blogs':
            return (
              <BasicCard
                width={[1, 1, 1 / 2, 1/2, 1 / 3]}
                title={node.frontmatter.title}
                subheader={node.frontmatter.tags}
                description={node.excerpt}
                link={node.fields.slug}
              />
              //                 <span className="date">{ nicetime(currentDate, postDate) }</span>
            )
          case 'project':
          case 'projects':
            return (
              <ProjectCard
                width={[1, 1, 1 / 2, 1 / 2, 1/3]}
                title={node.frontmatter.title}
                subheader={node.frontmatter.tags}
                link={node.fields.slug}
              />
            )
          default:
            return (
              <BasicCard
                width={[1, 1, 1 / 2, 1 / 2, 1 / 3]}
                title={node.frontmatter.title}
                subheader={node.frontmatter.tags}
                description={node.excerpt}
                link={node.fields.slug}
              />
            )
        }
      })
  }
  return <Flex flexWrap="wrap">{postLoop}</Flex>
}

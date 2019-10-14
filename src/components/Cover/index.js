import React from 'react'
import Img from 'gatsby-image'
import { Box, Image } from 'rebass/styled-components'

export default props => {
  if(props.image !== null) {
    return (
      <Box as="figure" mb={3} className="Cover">
        {props.image.childImageSharp ? (
          <Image as={Img} fluid={props.image.childImageSharp.fluid} />
        ) : (
          <Image src={props.image.publicURL} className="static-image" />
        )}
      </Box>
    )
  }
  return (
    <div></div>
  )
}

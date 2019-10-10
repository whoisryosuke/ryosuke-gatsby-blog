import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

import arrowRight from '../../assets/img/icon-arrow-right.svg'

export default props => {
  const links = {
    blog: 'Read post',
    portfolio: 'View project',
  }
  let featured = props.post
  return (
    <figure className="Featured container">
      <div className="image">
        <Img fluid={featured.frontmatter.cover_image.childImageSharp.fluid} />
      </div>
      <figcaption>
        <Link
          to={featured.fields.slug}
          css={{ textDecoration: `none`, color: `inherit` }}
        >
          <h2 className="Title">{featured.frontmatter.title}</h2>
        </Link>
        <Link to={featured.fields.slug} className="Link">
          {featured.frontmatter.section
            ? links[featured.frontmatter.section]
            : 'See post'}
          <img src={arrowRight} className="icon arrow right" />
        </Link>
      </figcaption>
    </figure>
  )
}

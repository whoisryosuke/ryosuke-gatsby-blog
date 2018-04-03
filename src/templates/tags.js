import React from "react";
import Link from "gatsby-link";
import PropTypes from "prop-types";

// Components
import PostLoop from '../components/PostLoop';

const Tags = ({ pathContext, data }) => {
    const { tag } = pathContext;
    const { edges, totalCount } = data.allMarkdownRemark;
    const skip = false;
    const tagHeader = `${totalCount} post${
        totalCount === 1 ? "" : "s"
        } tagged with `;


    return (
        <div>
            <header>
                <h1 className="container Title">
                    #<span className="text blue">{tag}</span> <small className="normal smaller">({totalCount} post total)</small>
                </h1>
            </header>

            <PostLoop loop={edges} skip={skip} />
            {/*
              This links to a page that does not yet exist.
              We'll come back to it!
            */}
            <nav className="centered">
                <Link to="/tags" className="btn">All tags</Link>
            </nav>
        </div>
    );
};

Tags.propTypes = {
    pathContext: PropTypes.shape({
        tag: PropTypes.string.isRequired,
    }),
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            totalCount: PropTypes.number.isRequired,
            edges: PropTypes.arrayOf(
                PropTypes.shape({
                    node: PropTypes.shape({
                        frontmatter: PropTypes.shape({
                            title: PropTypes.string.isRequired,
                        }),
                        fields: PropTypes.shape({
                            slug: PropTypes.string.isRequired,                        
                        }),
                    }),
                }).isRequired
            ),
        }),
    }),
};

export default Tags;

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            cover_image {
              publicURL
              childImageSharp {
                sizes(maxWidth: 1240 ) {
                  srcSet
                }
              }
            }
            date
          }
          fields {
              slug
          }
          excerpt
        }
      }
    }
  }
`;
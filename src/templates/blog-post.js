import React from "react";
import Link from "gatsby-link";
import Img from "gatsby-image";
import nicetime from '../helpers/nicetime';
import Disqus from 'disqus-react';

import kebabCase from "lodash/kebabCase";
import 'prismjs/themes/prism-okaidia.css';

import SEO from '../components/SEO';
import PostLoop from '../components/PostLoop';
import Twitter from '../components/icons/Twitter'
import Tumblr from '../components/icons/Tumblr'
import ryosukeAvatar from '../assets/img/ryosuke-avatar-128.png'

export default ({ data }) => {
    const skip = false;
    const post = data.blog;
    let related;
    data.relatedPosts ? related = data.relatedPosts.edges : related = null;
    const currentDate = new Date();

    const tags = post.frontmatter.tags.map((tag) => (
      <li key={tag}><Link to={'/tags/' + kebabCase(tag) }>#{ tag }</Link></li>
    ));

    const postImage = post.frontmatter.cover_image.childImageSharp && post.frontmatter.cover_image.childImageSharp.sizes && post.frontmatter.cover_image.childImageSharp.sizes.src;


    const disqusShortname = 'ryosuke';
    const disqusConfig = {
      url: `http://ryosuke.design/${post.fields.slug}`,
      identifier: post.fields.slug,
      title: post.frontmatter.title,
    };

    return (
        <div className="Blog">
          <SEO 
            key={`seo-${post.fields.slug}`}
            postImage={postImage}
            postData={post}
            isBlogPost
          />
          <article className="ArticlePage">
            {/*----- Cover image -----*/}
            <figure className="Cover">
              <Img sizes={post.frontmatter.cover_image.childImageSharp.sizes} />
            </figure>
            <section className="container">

              {/*----- Post content -----*/}
              <section className="content">
                <h1 className="Title">{post.frontmatter.title}</h1>

                <div dangerouslySetInnerHTML={{ __html: post.html }} />

                <aside className="TagCloud small">
                  <ul>
                    {tags}
                  </ul>
                </aside>
                
              </section>

              {/*----- Author / Date meta data -----*/}
              <aside className="meta">
                <figure className="author">
                  <img src={ryosukeAvatar} alt="Blue square avatar white centered hiragana text reading Ryosuke" />
                  <h5>
                    @Ryosuke
                    <span className="date">{nicetime(currentDate, new Date(post.frontmatter.date))}</span>                  
                  </h5>
                </figure>
                <section className="share">
                  <a href={`http://twitter.com/share?text=${post.frontmatter.title}&url=http://whoisryosuke.github.io/ryosyke-gatsby-blog/${post.fields.slug}&hashtags=${post.frontmatter.tags }`} className="twitter">
                    Share on Twitter
                    <Twitter />
                  </a>
                  <a href={`http://www.tumblr.com/share/link?url=http://whoisryosuke.github.io/ryosyke-gatsby-blog${post.fields.slug}`} className="tumblr">
                    Share on Tumblr
                    <Tumblr />
                  </a>
                </section>
              </aside>

            </section>

        </article>

        <section className="Comments container">
          <section className="Segment content">
            <h3 className="Title">Leave a comment</h3>            
            <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
          </section>
        </section>

          { related ? 
            <nav className="RelatedPosts container">
              <h3 className="Title">Related Posts</h3>
              <PostLoop loop={related} skip={skip} />
            </nav>
            :
            ''
          }
        </div>
    );
};

export const query = graphql`
  query BlogPostQuery($slug: String!, $tag: String!) {
    blog: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        cover_image {
              childImageSharp {
                sizes(maxWidth: 1240 ) {
                  tracedSVG
                  src
                  srcSet
                }
              }
            }
        date(formatString: "DD MMMM, YYYY")
        tags
      }
      fields {
        slug
      }
    },
    relatedPosts:  allMarkdownRemark(
      limit: 2
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { 
        fields:{ slug: { ne: $slug } } 
        frontmatter: { tags: { in: [$tag] } }
      }
    ) {
      edges {
        node {
          html
          frontmatter {
            title
            cover_image {
                  childImageSharp {
                    sizes(maxWidth: 1240 ) {
                      src
                      srcSet
                    }
                  }
                }
            date(formatString: "DD MMMM, YYYY")
            tags
          }
          fields {
            slug
          }
        }
      }
    },
  }
`;
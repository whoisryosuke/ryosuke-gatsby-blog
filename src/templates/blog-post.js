import React, { Component } from "react";
import Link from "gatsby-link";
import Img from "gatsby-image";
import nicetime from '../helpers/nicetime';

import kebabCase from "lodash/kebabCase";
import 'prismjs/themes/prism-okaidia.css';

import ReadingProgress from '../components/ReadingProgress';
import SEO from '../components/SEO';
import Cover from '../components/Cover';
import Comments from '../components/Comments';
import PostLoop from '../components/PostLoop';
import Twitter from '../components/icons/Twitter'
import Tumblr from '../components/icons/Tumblr'
import ryosukeAvatar from '../assets/img/ryosuke-avatar-128.png'

export default class BlogPost extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      'instagram': false,
      'codepen': false
    };
  }

  componentDidMount() {
    // Check for Instagram script
    if (window.instgrm || document.getElementById('react-instagram-embed-script')) {
      if(this.state.instagram == false)
      {
        window.instgrm.Embeds.process()
      }
    } else {

      // Create script element with Instagram embed JS lib
      const s = document.createElement('script')
      s.async = s.defer = true
      s.src = `//www.instagram.com/embed.js`
      s.id = 'react-instagram-embed-script'
      const body: HTMLElement | null = document.body
      if (body) {
        body.appendChild(s)
      }

      // Run Instagram function to show embeds
      if (window.instgrm && this.state.instagram == false) {
        window.instgrm.Embeds.process()
      }

      // Set IG state to true so the process doesn't run again
      this.setState({
        'instagram': true
      });
    }

    // Add Codepen script to <body> if we detect a Codepen embed
    const codepen = document.getElementsByClassName('codepen');
    if (codepen.length > 0) {
      // Check if we've already embedded the script
      if (!document.getElementById('codepen-script') || !this.state.codepen) {
        // Create script element with Codepen embed JS lib
        const s = document.createElement('script')
        s.async = s.defer = true
        s.src = `//static.codepen.io/assets/embed/ei.js`
        s.id = 'codepen-script'
        const body: HTMLElement | null = document.body
        if (body) {
          body.appendChild(s)
        }

        // Set state to true so the process doesn't run again
        this.setState({
          'codepen': true
        });
      }
    }
  }

  render() {
    const skip = false;
    const post = this.props.data.blog;
    let related;
    this.props.data.relatedPosts ? related = this.props.data.relatedPosts.edges : related = null;
    const currentDate = new Date();

    const tags = post.frontmatter.tags.map((tag) => (
      <li key={tag}><Link to={'/tags/' + kebabCase(tag) }>#{ tag }</Link></li>
    ));

    let postImage = post.frontmatter.cover_image.publicURL;
    let postDate = new Date(post.frontmatter.date);

    if (post.frontmatter.cover_image.childImageSharp !== null) {
      postImage = post.frontmatter.cover_image.childImageSharp && post.frontmatter.cover_image.childImageSharp.sizes && post.frontmatter.cover_image.childImageSharp.sizes.src;
    }

    return (
        <div className="Blog">
          {/*----- Reading progress only on blog -----*/}
          { post.frontmatter.section === 'blog' && <ReadingProgress targetEl="#Article" /> }
          <SEO 
            key={`seo-${post.fields.slug}`}
            postImage={postImage}
            postData={post}
            isBlogPost
          />
          <article className={"ArticlePage " + post.frontmatter.section } id="Article">
            {/*----- Cover image only on blog -----*/}
            { post.frontmatter.section === 'blog' && <Cover image={post.frontmatter.cover_image} /> }
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
                    <span className="date">{ nicetime(currentDate, postDate) }</span>                  
                  </h5>
                </figure>
                <section className="share">
                  <a href={`http://twitter.com/share?text=${post.frontmatter.title}&url=http://whoisryosuke.com/${post.fields.slug}&hashtags=${post.frontmatter.tags }`} className="twitter">
                    { post.frontmatter.section === 'blog' ? 'Share on Twitter' : 'Share' }
                    <Twitter />
                  </a>
                  <a href={`http://www.tumblr.com/share/link?url=http://whoisryosuke.com${post.fields.slug}`} className="tumblr">
                    { post.frontmatter.section === 'blog' ? 'Share on Tumblr' : 'Share' }
                    <Tumblr />
                  </a>
                </section>
              </aside>

            </section>

        </article>

        { post.frontmatter.section === 'blog' && <Comments post={post} /> }

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
  }
};

export const query = graphql`
  query BlogPostQuery($slug: String!, $tag: String!) {
    blog: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        cover_image {
              publicURL
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
        section
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
                  publicURL
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
import React from "react";
import Link from "gatsby-link";
import Img from "gatsby-image";
import nicetime from '../../helpers/nicetime';

import arrowRight from '../../assets/img/icon-arrow-right.svg';

export default (props) => {
    const links = {
        blog: 'Read post',
        project: 'View project',
    };
    let postLoop;
    const currentDate = new Date();    
    
    if(props.loop !== undefined) {
        postLoop = props.loop.filter(({ node }) => {
                if(props.skip === true) {
                    return props.loop[0].node !== node
                } else {
                    return node;
                }
            }).map(({ node }) => {
                let postDate = new Date(node.frontmatter.date);
                return (
                    <section className="col">
                        <article className="Card small" key={node.id}>
                            <figure>
                                <Link to={node.fields.slug}>
                                    {node.frontmatter.cover_image.childImageSharp ? (
                                        <Img sizes={node.frontmatter.cover_image.childImageSharp.sizes} /> 
                                    ) : (
                                        <img src={node.frontmatter.cover_image.publicURL} />
                                    )}
                                </Link>
                            </figure>
                            <div className="content">
                                <Link
                                    to={node.fields.slug}
                                    css={{ textDecoration: `none`, color: `inherit` }}
                                >
                                    <h3 className="Title">
                                        {node.frontmatter.title}
                                    </h3>
                                </Link>
                                <p className="excerpt">{node.excerpt}</p>
                                
                                <aside className="meta">
                                    <Link
                                        to={node.fields.slug}
                                        className="Link"
                                    >
                                        {node.frontmatter.section ? links[node.frontmatter.section] : 'See post'}
                                        <img src={arrowRight} className="icon arrow right" alt="Arrow pointing right" />
                                    </Link>
                                    <span className="date">{ nicetime(currentDate, postDate) }</span>
                                </aside>
                            </div>
                        </article>
                    </section>
                )
            })
        }
    return (
        <section className="container row">
            { postLoop }
        </section>
    );
};
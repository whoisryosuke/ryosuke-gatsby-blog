import React from "react";
import Img from "gatsby-image";
import Disqus from 'disqus-react';

export default (props) => {

    const post = props.post;

    const disqusShortname = 'ryosuke';
    const disqusConfig = {
        url: `http://whoisryosuke.com/${post.frontmatter.section}/${post.fields.slug}`,
        identifier: post.fields.slug,
        title: post.frontmatter.title,
    };

    return (
        <section className="Comments container">
            <section className="Segment content">
                <h3 className="Title">Leave a comment</h3>
                <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
            </section>
        </section>
    );
};
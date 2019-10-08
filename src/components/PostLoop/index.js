import React from "react";
import Link from "gatsby-link";
import Img from "gatsby-image";
import { Flex } from 'rebass/styled-components'
import nicetime from '../../helpers/nicetime';

import BasicCard from "../../components/Card/BasicCard"
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

                    <BasicCard width={[1, 1, 1 / 2]} grid title={node.frontmatter.title} subheader={node.frontmatter.tags} description={node.excerpt} link={node.fields.slug} />
                    //                 <span className="date">{ nicetime(currentDate, postDate) }</span>
                )
            })
        }
    return (
        <Flex flexWrap="wrap">
            { postLoop }
        </Flex>
    );
};
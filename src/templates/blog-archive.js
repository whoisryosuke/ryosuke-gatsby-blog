import React, { Component } from "react";
import styled from 'styled-components'
import GLink from "gatsby-link";
import { Flex, Box, Text, Link as RLink } from 'rebass/styled-components'

import capitalizeFirstLetter from '../helpers/uppercase';

import Layout from "../layouts/BaseLayout"
import SectionHeading from '../components/SectionHeading/SectionHeading';
import PostLoop from '../components/PostLoop';

const StyledLink = styled(GLink)`
    text-decoration:none;
    color:${(props) => props.theme.colors.black};
`

const StyledBox = styled(Box)`
    border-bottom: 1px solid black;
    background:${(props) => props.theme.colors.white};
    transition: background 400ms ease-in;

    &:hover, &:focus {
        background:${(props) => props.test ? props.theme.colors.gray : props.theme.gradients.subtle};
    }
`

const NavLink = props => {
    if (!props.test) {
        return <StyledLink to={props.url}><Text variant="label">{props.text}</Text></StyledLink>;
    } else {
        return <Text color="gray" variant="label">{props.text}</Text>;
    }
};

const IndexPage = ({ data, pathContext }) => {
    const { group, index, first, last, pageCount, pathPrefix } = pathContext;
    const previousUrl = index - 1 == 1 ? '/' + pathPrefix + '/' : '/' + pathPrefix + '/' + (index - 1).toString();
    const nextUrl = '/' + pathPrefix + '/' + (index + 1).toString();

    return (
        <Layout className="BlogArchive">
            <SectionHeading emoji="📓" heading={`${capitalizeFirstLetter(pathPrefix)} archive`} subheader={`Page ${index}`} />

            <PostLoop type={pathPrefix} loop={group} />

            <Flex as="nav" justifyContent="space-between">
                <StyledBox test={first} p={3} width={[1/2,1/2,1/2]} ariaLabel="prev">
                    <NavLink test={first} url={previousUrl} text="Previous Page" />
                </StyledBox>
                <StyledBox test={last} textAlign="right" p={3} width={[1 / 2, 1 / 2, 1 / 2]} sx={{ borderLeft: "1px solid black" }} ariaLabel="next">
                    <NavLink test={last} url={nextUrl} text="Next Page" />
                </StyledBox>
            </Flex>
        </Layout>
    );
};
export default IndexPage;
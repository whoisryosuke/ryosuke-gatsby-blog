import * as React from 'react';
import styled from 'styled-components'
import Link from "gatsby-link";
import { Heading, Text } from 'rebass/styled-components'
import BaseCard from "./BaseCard"

const StyledLink = styled(Link)`
  text-decoration:none;
  color:${(props) => props.theme.colors.black};
`

interface IProjectCardProps {
  title: string,
  subheader: string,
  description: string
}

const ProjectCard: React.FunctionComponent<IProjectCardProps> = ({href, title, subheader, ...props}) => {
  return(
    <StyledLink to={href}>
      <BaseCard hover={true} {...props}>
        <Heading fontSize={[3,4,5]} mt="5" mb="2">{title}</Heading>
        <Heading variant="label" mb="4">{subheader}</Heading>
      </BaseCard>
    </StyledLink>
  )
};

export default ProjectCard;

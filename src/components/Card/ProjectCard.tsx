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

const ProjectCard: React.FunctionComponent<IProjectCardProps> = ({ title, subheader, link, ...props }) => {
  // Check if Subheader is array or string
  // return one item if array
  let subtitle = subheader
  if (Array.isArray(subheader) && subheader.length > 0) {
    subtitle = subheader[Math.floor(Math.random() * subheader.length)]
  }
  return(
    <BaseCard link={link} {...props}>
      <Heading variant="h2" mt="5" mb="2">{title}</Heading>
      <Heading variant="label" mb="4">{subtitle}</Heading>
    </BaseCard>
  )
};

export default ProjectCard;

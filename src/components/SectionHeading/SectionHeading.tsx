import * as React from 'react';
import styled from "styled-components"
import { Box, Heading } from 'rebass/styled-components'

interface ISectionHeadingProps {
  className: string,
  emnoji: string,
  heading: string,
}

const SectionHeading: React.FunctionComponent<ISectionHeadingProps> = ({className, emoji, heading, subheader}) => {
  return(
  <Box className={className}>
    <Heading variant="heading">{emoji && emoji} {heading}</Heading>
    {subheader && <Heading variant="subheader" mt={2} pl={4}>{subheader}</Heading>}
  </Box>
  )
};


const StyledSectionHeading = styled(SectionHeading)`
  padding:2rem 1rem;
  border-bottom:1px solid ${(props) => props.theme.colors.black};
`

export default StyledSectionHeading;

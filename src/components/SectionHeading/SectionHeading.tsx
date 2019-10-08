import * as React from 'react';
import styled from "styled-components"
import { Box, Heading } from 'rebass/styled-components'

interface ISectionHeadingProps {
  className: string,
  emnoji: string,
  heading: string,
}

const SectionHeading: React.FunctionComponent<ISectionHeadingProps> = ({className, emoji, heading}) => {
  return(
  <Box className={className}>
    <Heading variant="heading">{emoji && emoji} {heading}</Heading>
  </Box>
  )
};


const StyledSectionHeading = styled(SectionHeading)`
  padding:2rem 1rem;
  border-bottom:1px solid ${(props) => props.theme.colors.black};
`

export default StyledSectionHeading;

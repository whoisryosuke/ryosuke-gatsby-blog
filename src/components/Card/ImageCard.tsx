import * as React from 'react';
import styled from 'styled-components'
import { Flex, Heading, Image } from 'rebass/styled-components'
import BaseCard from "./BaseCard"
import Avatar from "../../assets/img/ryosuke-avatar-128.png"

const StyledSubheader = styled(Heading)`
  text-align:right;

  @media(max-width:${(props) => props.theme.breakpoints[0]}) {
    text-align:left;
  }
`

interface IImageCardProps {
  title: string,
  subheader: string,
  description: string
}

const ImageCard: React.FunctionComponent<IImageCardProps> = ({title, subheader, ...props}) => {
  return(
    <BaseCard cols={2} {...props}>
      <Image src={Avatar} width="100%" height="auto" variant="avatar" sx={{marginBottom:"3rem"}} />
      <Flex flexWrap='wrap'>
        <Heading variant="header" mb="4" width={[1, 1/2]}>{title}</Heading>
        <StyledSubheader variant="subheader" mb="4" width={[1, 1/2]}>{subheader}</StyledSubheader>
      </Flex>
    </BaseCard>
  )
};

export default ImageCard;

import * as React from 'react';
import styled from 'styled-components'
import { Box, Flex, Heading, Image } from 'rebass/styled-components'
import BaseCard from "./BaseCard"
import Avatar from "../../assets/img/ryosuke-avatar-128.png"

interface IImageCardProps {
  title: string,
  subheader: string,
  image: string
}

const ImageCard: React.FunctionComponent<IImageCardProps> = ({title, subheader, image, ...props}) => {
  return(
    <BaseCard {...props}>
      <Box width="100%" height={['15em', '15em', '20em']} variant="card.avatar" sx={{ backgroundImage: `url(${image})` }} />
      <Flex flexWrap='wrap'>
        <Heading variant="subheader" mb="4" width={[1, 1, 1/2]}>{title}</Heading>
        <Heading variant="label" mb="4" width={[1, 1, 1/2]} textAlign={['left','left','right']}>{subheader}</Heading>
      </Flex>
    </BaseCard>
  )
};

export default ImageCard;

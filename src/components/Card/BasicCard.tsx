import * as React from 'react';
import { Heading, Text } from 'rebass/styled-components'
import BaseCard from "./BaseCard"

interface IBasicCardProps {
  title: string,
  subheader: string,
  description: string
}

const BasicCard: React.FunctionComponent<IBasicCardProps> = ({title, subheader, description, ...props}) => {
  return(
    <BaseCard {...props}>
      <Heading variant="label" mb="4">{subheader}</Heading>
      <Heading variant="header" mb="4">{title}</Heading>
      <Text variant="paragraph">{description}</Text>
    </BaseCard>
  )
};

export default BasicCard;

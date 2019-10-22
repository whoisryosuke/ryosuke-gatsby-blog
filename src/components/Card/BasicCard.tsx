import * as React from 'react';
import { Heading, Text } from 'rebass/styled-components'
import BaseCard from "./BaseCard"

interface IBasicCardProps {
  title: string,
  subheader: string,
  description: string,
  link: string
}

const BasicCard: React.FunctionComponent<IBasicCardProps> = ({title, subheader, description, link, ...props}) => {
  // Check if Subheader is array or string
  // return one item if array
  let subtitle = subheader
  if (Array.isArray(subheader) && subheader.length > 0) {
    subtitle = subheader[Math.floor(Math.random() * subheader.length)]
  }
  return(
    <BaseCard link={link} {...props}>
      <Heading variant="label" mb="4">{subtitle}</Heading>
      <Heading variant="h2" mb="4">{title}</Heading>
      <Text variant="paragraph">{description}</Text>
    </BaseCard>
  )
};

export default BasicCard;

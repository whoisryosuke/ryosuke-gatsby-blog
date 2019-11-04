import React from 'react';
import { text } from '@storybook/addon-knobs';
import { Flex, Box, Button, Heading, Text } from 'rebass/styled-components'
import ButtonOutline from "./ButtonOutline"

// Create Knobs
const buttonTextKnob = (buttonText = 'Submit', buttonLabel = 'Name') => text(buttonLabel, buttonText)

// Stories
export default { title: 'Button' };

export const outline = () => <ButtonOutline>{buttonTextKnob('Go to blog')}</ButtonOutline>
export const filled = () => <Button><Text variant="label">{buttonTextKnob()}</Text></Button>
export const filledBigger = () => <Button><Heading variant="subheader" mb={0}>{buttonTextKnob()}</Heading></Button>
export const inline = () => <Flex>
  <Box
    as="a"
    width={[1 / 2]}
    href={`http://twitter.com/share`}
  >
    <ButtonOutline width={1} sx={{ borderRight: 0 }}>
      {buttonTextKnob('Discuss on Twitter', 'Left Button')}
        </ButtonOutline>
  </Box>
  <Box
    as="a"
    width={[1 / 2]}
    href={`http://www.tumblr.com/share/link?url=http://whoisryosuke.com`}
  >
    <ButtonOutline width={1}>{buttonTextKnob('Discuss on Tumblr', 'Right Button')}</ButtonOutline>
  </Box>
</Flex>
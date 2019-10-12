import React from 'react';
import { Flex, Box, Button, Heading, Text } from 'rebass/styled-components'
import ButtonOutline from "./ButtonOutline"

export default { title: 'Button' };

export const outline = () => <ButtonOutline>Go to blog</ButtonOutline>
export const filled = () => <Button><Text variant="label">Submit</Text></Button>
export const filledBigger = () => <Button><Heading variant="subheader" mb={0}>Submit</Heading></Button>
export const inline = () => <Flex>
  <Box
    as="a"
    width={[1 / 2]}
    href={`http://twitter.com/share`}
  >
    <ButtonOutline width={1} sx={{ borderRight: 0 }}>
      Discuss on Twitter
        </ButtonOutline>
  </Box>
  <Box
    as="a"
    width={[1 / 2]}
    href={`http://www.tumblr.com/share/link?url=http://whoisryosuke.com`}
  >
    <ButtonOutline width={1}>Discuss on Tumblr</ButtonOutline>
  </Box>
</Flex>
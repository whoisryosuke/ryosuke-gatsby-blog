import React, {useState} from 'react'
import styled from 'styled-components'
import { Heading, Flex, Button, Box } from 'rebass/styled-components'
import { Label, Input, Select } from '@rebass/forms'

const StyledLabel = styled(Label)`
  font-family:${(props) => props.theme.fonts.heading};
  display:inline-block;
`
const StyledInput = styled(Input)`
  border:0 !important;
  border-bottom:1px solid ${(props) => props.theme.colors.black} !important;
  margin-bottom:1rem !important;
`

const FlexBox = styled(Box)`
  display:flex;
`

const SectionBox = styled(Box)`
  border-bottom:1px solid ${(props) => props.theme.colors.black} !important;
  padding:3rem 0;
`

interface Props {
  
}

export const Contact: React.FC<Props> = () => {
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    service: '',
  })
  const dropdownOptions = [
    // Looking for assistance with
    {
      name: 'design systems'
    },
    {
      name: 'design tooling'
    },
    {
      name: 'UX/UI design'
    },
    {
      name: 'API development'
    },
    {
      name: 'METRC integration'
    },
    {
      name: 'something cool'
    },
  ]
  const updateContactData = (e) => {
    setContactData({...contactData, [e.target.name]: e.target.value})
  }
  const submitContactData = (e) => {
    console.log('contactData', contactData)
  }

  return (
    <SectionBox as="form">
      <Heading fontSize={[2,3,4]} mb={2}>Want to say hi? 👋</Heading>
      <Heading fontSize={1} mb={4}>Introduce yourself and I’ll do my best do get back to you timely</Heading>
      <Flex flexWrap="wrap">
        <FlexBox width={[1,1,1/2,1/2,1/3]}>
          <StyledLabel htmlFor='name' width={[1/2]} px={2}>Greetings, my name is</StyledLabel>
          <StyledInput
            id='name'
            name='name'
            type='name'
            placeholder='Squall Leonhart'
            required
            onChange={updateContactData}
            width={[1 / 2]}
            mx={2}
          />
        </FlexBox>
        <FlexBox width={[1, 1, 1 / 2, 1 / 2, 1 / 3]}>
          <StyledLabel htmlFor='service' width={1/2} px={2}>and I'm looking for assistance with</StyledLabel>
          <Box width={[1 / 2, 1 / 2]} p={2}>
            <Select
              id='service'
              name='service'
              defaultValue='design systems'
              onChange={updateContactData}>
              {Object.entries(dropdownOptions).map(([key, dropdownOption]) => (
                <option
                  key={key}>
                  {dropdownOption.name}
                </option>
              ))}
            </Select>
          </Box>
        </FlexBox>
        <FlexBox width={[1, 1, 1 / 2, 1 / 2, 1 / 3]}>
          <StyledLabel htmlFor='email' width={[1 / 4]} px={2}>you can reach me at</StyledLabel>
          <StyledInput
            id='email'
            name='email'
            type='email'
            placeholder='squall.leonhart@balambgarden.co'
            required
            onChange={updateContactData}
            width={[3 / 4]}
            mx={2}
          />
        </FlexBox>
      </Flex>
      <Flex justifyContent="flex-end" textAlign="right">
          <Button onSubmit={submitContactData} variant="outline">Reach out and touch</Button>
      </Flex>
    </SectionBox>
  )
}

export default Contact
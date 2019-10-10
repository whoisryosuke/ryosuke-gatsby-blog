import React, {useState} from 'react'
import styled from 'styled-components'
import { Heading, Flex, Button, Box } from 'rebass/styled-components'
import { Label, Input, Select } from '@rebass/forms'
import ButtonOutline from '../Button/ButtonOutline'

import ContactSVG from '../../assets/svg/contact-circles.svg'

const StyledLabel = styled(Label)`
  font-family:${(props) => props.theme.fonts.heading};
`
const StyledInput = styled(Input)`
  border:0 !important;
  border-bottom:1px solid ${(props) => props.theme.colors.black} !important;
  margin-bottom:1rem !important;
`

const SectionBox = styled(Box)`
  border-bottom:1px solid ${(props) => props.theme.colors.black} !important;
  padding:3rem 0;


  background-image:url(${ContactSVG});
  background-repeat:no-repeat;

  ${(props) => props.theme.mediaQueries.mobile} {
    background-size:150%;
    background-position:-150% 30%;
  }

  ${(props) => props.theme.mediaQueries.tablet} {
    background-size:60%;
    background-position:center right;
  }
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
      <Heading fontSize={[2,3,4]} mx={3} mb={2}>Want to say hi? 👋</Heading>
      <Heading fontSize={1} mx={3} mb={4}>Introduce yourself and I’ll do my best do get back to you timely</Heading>
      <Flex flexWrap="wrap" mx={3}>
        <Box width={[1, 3/4, 1/3]}>
            <StyledLabel htmlFor='name' px={2}>Greetings, my name is</StyledLabel>
            <StyledInput
              id='name'
              name='name'
              type='name'
              placeholder='Squall Leonhart'
              required
              onChange={updateContactData}
              mx={2}
            />
            <StyledLabel htmlFor='service' px={2}>and I'm looking for assistance with</StyledLabel>
            <Box p={2}>
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
            <StyledLabel htmlFor='email' px={2}>you can reach me at</StyledLabel>
            <StyledInput
              id='email'
              name='email'
              type='email'
              placeholder='squall.leonhart@balambgarden.co'
              required
              onChange={updateContactData}
              mx={2}
            />
          <ButtonOutline width={[1,1,1]} onSubmit={submitContactData}>Reach out and touch</ButtonOutline>
        </Box>
      </Flex>
    </SectionBox>
  )
}

export default Contact
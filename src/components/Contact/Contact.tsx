import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Heading, Flex, Box, Text } from 'rebass/styled-components'
import { Label, Input, Select } from '@rebass/forms'
import ButtonOutline from '../Button/ButtonOutline'

const fadeOut = keyframes`
  from {
    transform: scaleY(1);
    opacity: 1;
  }

  to {
    transform: scaleY(0);
    opacity: 0;
  }
`

import ContactSVG from '../../assets/svg/contact-circles.svg'

const StyledLabel = styled(Label)`
  font-family: ${(props) => props.theme.fonts.heading};
`
const StyledInput = styled(Input)`
  border: 0 !important;
  border-bottom: 1px solid ${(props) => props.theme.colors.black} !important;
  margin-bottom: 1rem !important;
`

const SectionBox = styled(Box)`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black};
  border-bottom: 1px solid ${(props) => props.theme.colors.black} !important;
  padding: 3rem 0;

  background-image: url(${ContactSVG});
  background-repeat: no-repeat;

  ${(props) => props.theme.mediaQueries.mobile} {
    background-size: 150%;
    background-position: -150% 30%;
  }

  ${(props) => props.theme.mediaQueries.tablet} {
    background-size: 60%;
    background-position: center right;
  }
`

const StyledMessage = styled(Box)`
  animation: ${fadeOut} 400ms linear;
  animation-delay: 2s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
`

interface Props {}

export const Contact: React.FC<Props> = () => {
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    service: 'design systems',
  })
  const [formStatus, setFormStatus] = useState({
    loading: false,
    status: null,
    message: '',
  })
  const dropdownOptions = [
    // Looking for assistance with
    {
      name: 'design systems',
    },
    {
      name: 'design tooling',
    },
    {
      name: 'UX/UI design',
    },
    {
      name: 'API development',
    },
    {
      name: 'METRC integration',
    },
    {
      name: 'something cool',
    },
  ]
  const updateContactData = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value })
  }
  const submitContactData = async (e) => {
    e.preventDefault()
    setFormStatus({ ...formStatus, loading: true })

    const formSubmission = await fetch(
      '/.netlify/functions/send-contact-email',
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(contactData), // body data type must match "Content-Type" header
      }
    )
    const formText = await formSubmission.text()
    setFormStatus({
      ...formStatus,
      loading: false,
      status: formSubmission.status,
      message: formText,
    })
    setTimeout(() => {
      if (!formStatus.loading)
        setFormStatus({ ...formStatus, status: null, message: '' })
    }, 3000)
  }

  return (
    <SectionBox as="form" method="POST" onSubmit={submitContactData}>
      <Heading fontSize={[2, 3, 4]} mx={3} mb={2}>
        Want to say hi? 👋
      </Heading>
      <Heading fontSize={1} mx={3} mb={4} fontWeight="400">
        Introduce yourself and I’ll do my best do get back to you timely
      </Heading>
      {!formStatus.loading && formStatus.status && (
        <StyledMessage
          bg="muted"
          p={3}
          mx={3}
          mb={4}
          sx={{
            border: '1px solid black',
            borderColor: 'black',
          }}
        >
          <Text>{formStatus.message}</Text>
        </StyledMessage>
      )}
      <Flex flexWrap="wrap" mx={3}>
        <Box width={[1, 3 / 4, 1 / 3]}>
          <StyledLabel htmlFor="name" px={2}>
            Greetings, my name is
          </StyledLabel>
          <StyledInput
            id="name"
            name="name"
            type="name"
            placeholder="Squall Leonhart"
            required
            onChange={updateContactData}
            mx={2}
          />
          <StyledLabel htmlFor="service" px={2}>
            and I'm looking for assistance with
          </StyledLabel>
          <Box p={2}>
            <Select
              id="service"
              name="service"
              defaultValue="design systems"
              onChange={updateContactData}
            >
              {Object.entries(dropdownOptions).map(([key, dropdownOption]) => (
                <option key={key}>{dropdownOption.name}</option>
              ))}
            </Select>
          </Box>
          <StyledLabel htmlFor="email" px={2}>
            you can reach me at
          </StyledLabel>
          <StyledInput
            id="email"
            name="email"
            type="email"
            placeholder="squall.leonhart@balambgarden.co"
            required
            onChange={updateContactData}
            mx={2}
          />
          <ButtonOutline
            width={[1, 1, 1]}
            p={3}
            onSubmit={submitContactData}
            disabled={formStatus.loading}
          >
            Reach out and touch
          </ButtonOutline>
        </Box>
      </Flex>
    </SectionBox>
  )
}

export default Contact

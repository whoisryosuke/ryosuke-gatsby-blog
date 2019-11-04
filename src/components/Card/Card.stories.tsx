import React from 'react';
import { text } from '@storybook/addon-knobs';
import { Flex } from 'rebass/styled-components'
import BasicCard from "./BasicCard"
import ProjectCard from "./ProjectCard"
import ImageCard from "./ImageCard"

// Knobs
const cardTitleKnob = (cardTitle = 'Kushy API Documentation', cardTitleLabel = 'Title') => text(cardTitleLabel, cardTitle)
const cardSubheaderKnob = (cardSubheader = 'UI / UX', cardSubheaderLabel = 'Subheader') => text(cardSubheaderLabel, cardSubheader)
const cardURLKnob = (cardURL = '/test-link', cardURLLabel = 'URL') => text(cardURLLabel, cardURL)

// Stories
export default { title: 'Card' };

export const basic = () => <BasicCard title={cardTitleKnob('Getting started developing Shopify themes')} description={cardSubheaderKnob(`Shopify has exploded over the past few years, becoming a near de-facto decision for any small to mid scale e-commerce project. It's become more important than ever to sharpen Shopify skills and get a handle on Liquid.`, 'Description')} />
export const project = () => <ProjectCard title={cardTitleKnob()} subheader={cardSubheaderKnob()} href={cardURLKnob()} />
export const image = () => <ImageCard title={cardTitleKnob()} subheader={cardSubheaderKnob()} />
export const imageGrid = () => <Flex flexWrap="wrap">
  <ImageCard title={cardTitleKnob()} subheader={cardSubheaderKnob()} width={[1, 1/2]} />
  <ImageCard title={cardTitleKnob()} subheader={cardSubheaderKnob()} width={[1, 1/2]} />
  <ImageCard title={cardTitleKnob()} subheader={cardSubheaderKnob()} width={[1, 1/2]} />
  <ImageCard title={cardTitleKnob()} subheader={cardSubheaderKnob()} width={[1, 1/2]} />
  </Flex>
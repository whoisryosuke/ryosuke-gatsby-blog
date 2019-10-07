import React from 'react';
import { Flex } from 'rebass/styled-components'
import BasicCard from "./BasicCard"
import ProjectCard from "./ProjectCard"
import ImageCard from "./ImageCard"

export default { title: 'Card' };

export const basic = () => <BasicCard title="Getting started developing Shopify themes" subheader="Getting Started" description="Shopify has exploded over the past few years, becoming a near de-facto decision for any small to mid scale e-commerce project. It's become more important than ever to sharpen Shopify skills and get a handle on Liquid." />
export const project = () => <ProjectCard title="Kushy API Documentation" subheader="UI / UX" href="/kushy-api-documentation" />
export const image = () => <ImageCard title="Kushy API Documentation" subheader="UI / UX" />
export const imageGrid = () => <Flex flexWrap="wrap">
  <ImageCard title="Kushy API Documentation" subheader="UI / UX" width={[1, 1/2]} />
  <ImageCard title="Kushy API Documentation" subheader="UI / UX" width={[1, 1/2]} />
  <ImageCard title="Kushy API Documentation" subheader="UI / UX" width={[1, 1/2]} />
  <ImageCard title="Kushy API Documentation" subheader="UI / UX" width={[1, 1/2]} />
  </Flex>
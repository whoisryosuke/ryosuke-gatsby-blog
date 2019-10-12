import React, { Component } from 'react'
import { Box, Heading, Text } from 'rebass/styled-components'
import DataTable from 'react-data-table-component'

import SectionHeading from '../SectionHeading/SectionHeading'

const Skills = () => {
  const skills = [
    {
      class: 'react',
      name: 'ReactJS',
      type: 'Development',
      category: 'Frontend',
    },
    {
      class: 'js',
      name: 'JavaScript (ES6)',
      type: 'Development',
      category: 'Frontend',
    },
    {
      class: 'ts',
      name: 'Typescript',
      type: 'Development',
      category: 'Full-stack',
    },
    {
      class: 'gatsby',
      name: 'GatsbyJS',
      type: 'Development',
      category: 'Frontend',
    },
    {
      class: 'nextjs',
      name: 'NextJS',
      type: 'Development',
      category: 'Full-stack',
    },
    {
      class: 'css-in-js',
      name: 'CSS in JS (Styled, Emotion, etc)',
      type: 'Development',
      category: 'Frontend',
    },
    {
      class: 'node',
      name: 'NodeJS',
      type: 'Development',
      category: 'Full-stack',
    },
    { class: 'npm', name: 'NPM', type: 'Development', category: 'Full-stack' },
    {
      class: 'html5',
      name: 'HTML5',
      type: 'Development',
      category: 'Frontend',
    },
    { class: 'css3', name: 'CSS3', type: 'Development', category: 'Frontend' },
    { class: 'sass', name: 'SASS', type: 'Development', category: 'Frontend' },
    { class: 'gulp', name: 'Gulp', type: 'Development', category: 'Frontend' },
    {
      class: 'jquery',
      name: 'jQuery',
      type: 'Development',
      category: 'Frontend',
    },
    {
      class: 'babel',
      name: 'Babel',
      type: 'Development',
      category: 'Full-stack',
    },
    {
      class: 'webpack',
      name: 'Webpack',
      type: 'Development',
      category: 'Backend',
    },
    {
      class: 'jest',
      name: 'Jest',
      type: 'Development',
      category: 'Backend',
    },
    {
      class: 'eslint',
      name: 'ESLint',
      type: 'Development',
      category: 'Backend',
    },
    {
      class: 'docker',
      name: 'Docker',
      type: 'Development',
      category: 'Backend',
    },
    { class: 'mysql', name: 'mySQL', type: 'Development', category: 'Backend' },
    {
      class: 'sqlite',
      name: 'SQLite',
      type: 'Development',
      category: 'Backend',
    },
    {
      class: 'mongo-db',
      name: 'NoSQL (Mongo DB)',
      type: 'Development',
      category: 'Backend',
    },
    { class: 'redis', name: 'Redis', type: 'Development', category: 'Backend' },
    {
      class: 'memcached',
      name: 'Memcached',
      type: 'Development',
      category: 'Backend',
    },
    { class: 'php', name: 'PHP', type: 'Development', category: 'Backend' },
    {
      class: 'laravel',
      name: 'Laravel',
      type: 'Development',
      category: 'Backend',
    },
    {
      class: 'wordpress',
      name: 'Wordpress',
      type: 'Development',
      category: 'Backend',
    },
    {
      class: 'shopify',
      name: 'Shopify',
      type: 'Development',
      category: 'Full-stack',
    },
    { class: 'api', name: 'APIs', type: 'Development', category: 'Backend' },
    { class: 'cms', name: 'CMS', type: 'Development', category: 'Full-stack' },
    {
      class: 'ecommerce',
      name: 'E-Commerce',
      type: 'Development',
      category: 'Full-stack',
    },
    { class: 'git', name: 'Git', type: 'Development', category: 'Full-stack' },
    { class: 'figma', name: 'Figma', type: 'Design', category: 'Frontend' },
    {
      class: 'invision',
      name: 'Invision',
      type: 'Design',
      category: 'Frontend',
    },
    { class: 'kactus', name: 'Kactus', type: 'Design', category: 'Frontend' },
    {
      class: 'zeppelin',
      name: 'Zeppelin',
      type: 'Design',
      category: 'Frontend',
    },
    { class: 'marvel', name: 'Marvel', type: 'Design', category: 'Frontend' },
    { class: 'sketch', name: 'Sketch', type: 'Design', category: 'Frontend' },
    {
      class: 'principle',
      name: 'Principle',
      type: 'Design',
      category: 'Frontend',
    },
    {
      class: 'photoshop',
      name: 'Adobe Photoshop',
      type: 'Design',
      category: 'Print/Digital',
    },
    {
      class: 'illustrator',
      name: 'Adobe Illustrator',
      type: 'Design',
      category: 'Print/Digital',
    },
    {
      class: 'premiere',
      name: 'Adobe Premiere',
      type: 'Design',
      category: 'Video',
    },
    {
      class: 'aftereffects',
      name: 'Adobe After Effects',
      type: 'Design',
      category: 'Video',
    },
    {
      class: 'indesign',
      name: 'Adobe InDesign',
      type: 'Design',
      category: 'Print/Digital',
    },
    {
      class: 'xd',
      name: 'Adobe XD',
      type: 'Design',
      category: 'Frontend',
    },
  ]
  const columns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
      cell: row => (
        <Heading variant="label" p={2}>
          {row.name}
        </Heading>
      ),
    },
    {
      name: 'Type',
      selector: 'type',
      sortable: true,
      cell: row => (
        <Box p={2} sx={{ border: '1px solid black' }}>
          <Text variant="label">{row.type}</Text>
        </Box>
      ),
    },
    {
      name: 'Category',
      selector: 'category',
      sortable: true,
      cell: row => (
        <Heading variant="label" p={2}>
          {row.category}
        </Heading>
      ),
    },
  ]

  return (
    <section className="Skills">
      <SectionHeading emoji="💽" heading="Technology and software I use" />
      <Box py={4} sx={{ borderBottom: '1px solid black' }}>
        <DataTable
          columns={columns}
          data={skills}
          defaultSortField="title"
          noHeader
        />
      </Box>
    </section>
  )
}

export default Skills

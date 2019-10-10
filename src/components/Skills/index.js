import React, { Component } from 'react'
import styled from 'styled-components'
import { Box, Heading, Text } from 'rebass/styled-components'
import DataTable from 'react-data-table-component'

import ListItemGrid from '../List/ListItemGrid'
import SectionHeading from '../SectionHeading/SectionHeading'

import MoneyBagEmoji from '../../assets/img/emoji/money-bag.png'

const Skills = () => {
  const skills = [
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
      class: 'js',
      name: 'JavaScript (ES6)',
      type: 'Development',
      category: 'Frontend',
    },
    {
      class: 'jquery',
      name: 'jQuery',
      type: 'Development',
      category: 'Frontend',
    },
    {
      class: 'node',
      name: 'NodeJS',
      type: 'Development',
      category: 'Full stack',
    },
    { class: 'npm', name: 'NPM', type: 'Development', category: 'Full stack' },
    {
      class: 'react',
      name: 'ReactJS',
      type: 'Development',
      category: 'Frontend',
    },
    {
      class: 'babel',
      name: 'Babel',
      type: 'Development',
      category: 'Full stack',
    },
    {
      class: 'webpack',
      name: 'Webpack',
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
      category: 'Full stack',
    },
    { class: 'api', name: 'APIs', type: 'Development', category: 'Backend' },
    { class: 'cms', name: 'CMS', type: 'Development', category: 'Full stack' },
    {
      class: 'ecommerce',
      name: 'E-Commerce',
      type: 'Development',
      category: 'Full stack',
    },
    { class: 'git', name: 'Git', type: 'Development', category: 'Full stack' },
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

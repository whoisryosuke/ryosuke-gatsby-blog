import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import kebabCase from 'lodash/kebabCase'
import DataTable from 'react-data-table-component';
import { Box, Heading, Flex, Text } from 'rebass/styled-components'

import Layout from "@layouts/BaseLayout"
import SEO from '@components/SEO/SEO';
import Link from '@components/Link/Link';
import SectionHeading from '@components/SectionHeading/SectionHeading';

const TagsPage = ({
  data: {
    allMdx: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => {
  const columns = [
    {
      name: 'Tag',
      selector: 'fieldValue',
      sortable: true,
      cell: row => <Heading variant="label" p={2}><Link to={`/tags/${kebabCase(row.fieldValue)}`}>#{row.fieldValue}</Link></Heading>,
    },
    {
      name: 'Total Posts',
      selector: 'totalCount',
      sortable: true,
    }
  ];

  return (
    <Layout>
        <SEO
          key="seo-tags"
          title="All tags"
          url="tags"
        />
      <section className="TagList">
        <SectionHeading emoji="🔖" heading="Tags" />
        <Box py={4} sx={{ borderBottom: '1px solid black' }}>
          <DataTable
            columns={columns}
            data={group}
            defaultSortField="title"
            noHeader
          />
        </Box>
      </section>
    </Layout>
  )
}

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`

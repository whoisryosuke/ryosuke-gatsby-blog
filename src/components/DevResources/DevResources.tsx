import React from 'react'
import Link from 'gatsby-link'
import { Box, Heading, Flex, Text } from 'rebass/styled-components'
import DataTable from 'react-data-table-component'
import { useThemeValue } from '../../context/ThemeContext'

interface Props {
  resources: any
}

export const DevResources: React.FC<Props> = ({ resources }) => {
  const [{ theme, selectedTheme }, dispatch] = useThemeValue()
  // Loop through GraphQL query and merge any edges of nodes together
  // Merges arrays and Filters out empty arrays
  const repos = resources
    .map(
      resource =>
        resource.node.resources.development !== null &&
        resource.node.resources.development
    )
    .flat()
    .filter(resource => resource !== false)
  const columns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
      cell: row => (
        <Heading variant="label" p={2}>
          <a href={row.link}>{row.name}</a>
        </Heading>
      ),
    },
    {
      name: 'Software',
      selector: 'software',
      sortable: true,
      cell: row => (
        <Flex flexWrap="wrap" py={3}>
          {row.software.map(software => (
            <Box
              p={2}
              mr={2}
              mb={2}
              sx={{ border: '1px solid', borderColor: 'black' }}
            >
              <Link to={`/tags/${software}`}>
                <Text variant="label">{software}</Text>
              </Link>
            </Box>
          ))}
        </Flex>
      ),
    },
    {
      name: 'Category',
      selector: 'categories',
      sortable: true,
      cell: row => (
        <Flex flexWrap="wrap" py={3} minWidth="100%">
          {row.categories.map(category => (
            <Box
              minWidth="100%"
              p={2}
              mr={2}
              sx={{
                border: '1px solid black',
                borderColor: 'black',
                color: 'black',
                '&:not(:last-child)': { borderBottom: 0 },
              }}
            >
              <Text variant="label">{category}</Text>
            </Box>
          ))}
        </Flex>
      ),
    },
    // {
    //   name: 'Quick Start',
    //   selector: 'install',
    //   cell: row => <Input type="text" disabled value={row.install} />,
    // },
  ]

  return (
    <section className="DevResources">
      <Box
        py={4}
        sx={{ borderBottom: '1px solid black', borderColor: 'black' }}
      >
        <DataTable
          columns={columns}
          data={repos}
          defaultSortField="title"
          noHeader
          theme={selectedTheme}
        />
      </Box>
    </section>
  )
}

export default DevResources

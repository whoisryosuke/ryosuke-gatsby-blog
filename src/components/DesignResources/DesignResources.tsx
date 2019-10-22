import React from 'react'
import 'array-flat-polyfill';
import { Flex } from 'rebass/styled-components'

import ImageCard from '@components/Card/ImageCard';

interface Props {
  resources: any
}

export const DesignResources: React.FC<Props> = ({ resources }) => {
  // Loop through GraphQL query and merge any edges of nodes together
  // Merges arrays and Filters out empty arrays
  let repos = resources.map(resource => resource.node.resources.design !== null && resource.node.resources.design)
  // Check if it's an array before running array methods
  if(Array.isArray(repos)) {
    repos = repos.flat().filter(resource => resource !== false)
  } else {
    repos = []
  }
  
  return (
    <section className="DesignResources">
      <Flex flexWrap="wrap" bg="muted">
        {repos.map(resource => 
        <ImageCard 
          width={[1,1,1/2,1/2,1/3]} 
          title={resource.name} 
          subheader={resource.category} 
          image={`/resources/img/${resource.image}`}
          href={resource.link}
        />
        )}
      </Flex>
    </section>
  );
}

export default DesignResources
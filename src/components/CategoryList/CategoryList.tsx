import React, {useState} from 'react'
import styled from 'styled-components'
import GLink from 'gatsby-link'
import { Box, Flex, Heading, Image, Link as RLink } from 'rebass/styled-components'

import KushyDocs from "../../../content/projects/kushy-api-docs/kushy-api-docs.png"
import KushyStyleguide from "../../../content/projects/kushy/kushy-styleguide.png"
import KushyBackend from "../../../content/projects/kushy/kushy-database-diagram2.png"
import DojaPhoto from "../../../content/projects/doja-photography/5.jpg"

const StyledFlex = styled(Flex)`
  border-bottom:1px solid ${(props) => props.theme.colors.black} !important;
`

const StyledBox = styled(Box)`
  position:relative;
  border-left:1px solid ${(props) => props.theme.colors.black} !important;
  overflow:hidden;
`

const StyledLink = styled(GLink)`
  color:${(props) => props.theme.colors.black};
  text-decoration:none !important;
  border-bottom:0 !important;
  &:hover {
    /* Need gray gradient */
    border-left:1px solid ${(props) => props.theme.colors.black} !important;
  }
  &:hover:not(:first-child) {
    border-top:1px solid ${(props) => props.theme.colors.black} !important;
  }
  &:hover:not(:last-child) {
    border-bottom:1px solid ${(props) => props.theme.colors.black} !important;
  }
`

interface Props {
  
}

export const CategoryList: React.FC<Props> = () => {
  const [currentCategory, updateCurrentCategory] = useState(0)
  const categories = [
    {
      name: 'Branding',
      url: 'branding',
      image: KushyStyleguide
    },
    {
      name: 'UI / UX',
      url: 'ui-ux',
      image: KushyDocs
    },
    {
      name: 'Backend',
      url: 'backend',
      image: KushyBackend
    },
    {
      name: 'Photography',
      url: 'photography',
      image: DojaPhoto
    },
    {
      name: 'Illustration',
      url: 'illustration',
      image: KushyStyleguide
    },
  ]
  const changeCategory = (e) => {
    updateCurrentCategory(e.currentTarget.name)
  }
  const selectedCategory = categories.filter((category) => category.name === currentCategory)
  const categoryImage = selectedCategory.length > 0 ? selectedCategory[0].image : categories[0].image
  return (
    <StyledFlex>
      <Box width={[1,1,1/4,2/8]}>
        <Heading fontSize={[1, 2]} mt={3} px={2}>See some of my work in</Heading>
      </Box>
      <Box width={[1,1,1/2,3/8]}>
        <Flex flexWrap="wrap">
          {categories && categories.map(category => 
            <Box as={StyledLink} to={`/${category.url}`} key={category.name} name={category.name} width={[1, 1, 1, 1]} textAlign="center" onMouseOver={changeCategory}>
              <Box as={Heading} fontSize={[4,5]} p={4}>
                {category.name}
              </Box>
            </Box>
          )}
        </Flex>
      </Box>
      <StyledBox width={[1, 1, 1 / 4, 3 / 8]} sx={{ backgroundImage: `url(${categoryImage})`, backgroundSize:'cover', backgroundPosition:'left'}}>
        
      </StyledBox>
    </StyledFlex>
  )
}


export default CategoryList
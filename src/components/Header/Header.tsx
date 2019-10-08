import React, { Component } from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import { Flex, Text } from 'rebass/styled-components'

const StyledHeader = styled(Flex)`
  width:100%;
  padding:1rem;
  text-align:right;
  border-bottom:1px solid ${(props) => props.theme.colors.black};

  & .logo {
    display:inline-block;
  }
`

const StyledHeaderNav = styled.nav`
  display:inline-block;
  margin-right:1em;

  & ul { 
    margin-top:1rem;
  }

  & li { 
    list-style-type:none;
    display:inline-block;
    margin-right:1.5em;

    & a {
      color: ${(props) => props.theme.colors.black};
      text-decoration:none;
    }
  }
`

class Header extends Component {

  render() {    
    return(
      <StyledHeader justifyContent="flex-end">
        <StyledHeaderNav>
          <ul>
            <li>
              <Link to={'/blog'}>
                <Text variant="label">
                  Writing
                </Text>
              </Link>
            </li>
            <li>
              <Link to={'/projects'}>
                <Text variant="label">
                  Work
                </Text>
              </Link>
            </li>
            <li>
              <Link to={'/resources'}>
                <Text variant="label">
                  Resources
                </Text>
              </Link>
            </li>
            <li>
              <Link to={'/about'}>
                <Text variant="label">
                  About
                </Text>
              </Link>
            </li>
          </ul>
        </StyledHeaderNav>
        <Link to={'/'} className="logo">
          <svg width="87px" height="42px" viewBox="0 0 140 67" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g id="ryosuke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <path d="M35.16,56.184 L35.16,42.936 L46.392,42.936 L46.392,54.24 C46.392,55.176 46.608,55.68 46.968,55.896 C47.4,56.112 48.624,56.184 50.496,56.184 C52.368,56.184 53.376,55.896 53.736,55.392 C54.096,54.816 54.456,52.944 54.672,49.776 L65.112,50.712 C64.824,54.672 64.824,56.544 64.248,58.92 C63.672,61.224 63.528,62.088 62.232,63.24 C60.864,64.392 60.144,64.608 57.624,64.968 C55.176,65.328 53.448,65.328 49.416,65.328 C47.04,65.328 45.168,65.328 43.728,65.256 C40.992,65.184 38.4,64.608 37.32,63.816 C35.592,62.448 35.16,60.432 35.16,56.184 Z M19.752,42.576 L30.696,43.512 C29.472,55.176 21.552,62.448 5.568,66.408 L0.672,57.192 C7.224,55.68 11.832,53.88 14.496,51.792 C17.232,49.704 18.96,46.608 19.752,42.576 Z M2.544,49.272 L2.544,33.36 L63.456,33.36 L63.456,48.552 L53.016,48.552 L53.016,41.208 L12.984,41.208 L12.984,49.272 L2.544,49.272 Z M27.24,5.928 L27.24,0.384 L38.76,0.384 L38.76,5.928 L65.472,5.928 L65.472,14.568 L0.528,14.568 L0.528,5.928 L27.24,5.928 Z M8.88,16.584 L57.12,16.584 L57.12,31.416 L8.88,31.416 L8.88,16.584 Z M45.816,25.512 L45.816,22.704 L20.184,22.704 L20.184,25.512 L45.816,25.512 Z M125.016,25.08 L125.016,65.472 L113.568,65.472 L113.568,23.352 L122.424,23.352 C116.232,19.32 110.4,14.568 105,9.096 C99.6,14.568 93.768,19.32 87.576,23.352 L97.512,23.352 L97.512,30.264 C97.512,52.008 93.768,58.2 79.584,66.192 L73.248,57.336 C83.904,51.576 86.28,47.616 86.28,30.264 L86.28,24.216 C82.392,26.592 78.576,28.752 74.76,30.624 L70.656,21.48 C81.168,16.008 90.168,9.6 97.8,2.04 L112.2,2.04 C119.832,9.6 128.832,16.008 139.344,21.48 L135.24,30.624 C131.568,28.824 128.184,26.952 125.016,25.08 Z" id="亮介-copy-11" fill="#000"></path>
            </g>
          </svg>
        </Link>
      </StyledHeader>
    )
  }
  
}

export default Header
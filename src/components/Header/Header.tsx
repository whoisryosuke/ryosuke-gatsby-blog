import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import { Box, Flex, Text } from 'rebass/styled-components'
import { useThemeValue } from '../../context/ThemeContext'
import { THEME_OPTIONS } from '../../layouts/Theme'
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle'

const StyledHeader = styled(Flex)`
  width: 100%;
  background-color: ${props => props.theme.colors.white};
  padding: 1rem;
  text-align: right;
  border-bottom: 1px solid ${props => props.theme.colors.black};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 710;

  & .logo {
    border: 0;
    display: inline-block;
    position: relative;

    &:hover #ryosuke path {
      transition: fill ${props => props.theme.animation.default};
    }

    &:hover #ryosuke path,
    &:focus #ryosuke path {
      fill: ${props => props.theme.colors.primary};
    }

    &:after {
      content: '';
      width: 80px;
      height: 100%;
      padding: 1em 1.25em;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      background: ${props => props.theme.colors.muted};
      border: 1px solid ${props => props.theme.colors.black};
      transform-origin: 0 50%;
      transform: translate(-1.25em, -1.05em) scaleX(0);
      z-index: -1;
      transition: transform 300ms ease-out;
    }

    &:hover:after {
      transform: translate(-1.25em, -1.05em) scaleX(1);
    }
  }

  & .MobileButton {
    margin-right: 2em;

    & svg {
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: transform ${props => props.theme.animation.default};
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    & .line {
      fill: none;
      transition: stroke-dasharray ${props => props.theme.animation.default},
        stroke-dashoffset ${props => props.theme.animation.default};
      stroke: ${props => props.theme.colors.black};
      stroke-width: 5.5;
      stroke-linecap: round;
    }

    & svg .top {
      stroke-dasharray: 40 130;
    }
    & svg .middle {
      stroke-dasharray: 40 140;
    }
    & svg .bottom {
      stroke-dasharray: 40 205;
    }
    & svg.active .top {
      stroke-dasharray: 75 130;
      stroke-dashoffset: -63px;
    }
    & svg.active .middle {
      stroke-dashoffset: -102px;
    }
    & svg.active .bottom {
      stroke-dasharray: 110 205;
      stroke-dashoffset: -86px;
    }
  }
`

interface HeaderNavProps {
  readonly mobile: boolean
  readonly visible: boolean
  theme: any
}

const StyledHeaderNav = styled.nav`
  display: inline-block;
  margin-right: 1em;

  & ul {
    margin-top: 1rem;
  }

  & li {
    list-style-type: none;
    display: inline-block;
    margin-right: 2.25em;

    & a {
      color: ${props => props.theme.colors.black};
      text-decoration: none;
      border: 0;
      position: relative;
      display: block;

      & span {
        display: none;
      }

      &:after {
        content: '';
        width: 100%;
        padding: 1.25em;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        background: ${props => props.theme.colors.muted};
        border: 1px solid ${props => props.theme.colors.black};
        transform-origin: 0 50%;
        transform: translate(-1.25em, -0.75em) scaleX(0);
        z-index: -1;
        transition: transform 300ms ease-out;
      }

      &:hover:after {
        transform: translate(-1.25em, -0.75em) scaleX(1);
      }
    }
  }

  ${(props: HeaderNavProps) =>
    props.mobile &&
    `
    transform:translateX(${props.visible ? '0' : '-120%'});
    position:fixed;
    width:100%;
    height:100vh;
    top:4.9rem;
    border-top:1px solid ${props.theme.colors.black};
    left:0;
    z-index:420;
    background:${props.theme.colors.white};

    transition:transform 300ms ease-in;

    & ul { 
      width:100%;
      margin:0;
      padding:0;
    }

    & li { 
      width:100%;
      display:block;
      border-bottom:1px solid ${props.theme.colors.black};
      
      &.toggle {
        display: flex; 
        justify-content: flex-end;
        
        & span {
          padding:4em 1em;
          text-align:right;
        }
      }

      & a {
        padding:4em 1em;
        transition:color 300ms ease-out;

        & span {
          margin-left:1em;
          display:inline-block;
        }

        &:hover, &:focus {
          color:${props.theme.colors.white};
        }

        &:after {
          content:'';
          width:100%;
          padding:4.5em 1em;
          display:block;
          position:absolute;
          top: 0;
          left: 0;
          background:${props.theme.colors.primary};
          border:0;
          transform-origin: 0 50%;
          transform: translate(-1.25em, 0) scaleX(0);
          z-index: -1; 
          transition:transform 300ms ease-out;
        }

        &:hover:after, &:focus:after  {
          transform: translate(-1.25em, 0) scaleX(1);
        }
      }
    }
  `}
`

interface HeaderProps {
  readonly mobile: boolean
  readonly visible: boolean
  toggleVisibility: () => void
}

const Header: React.SFC<HeaderProps> = React.memo(
  ({ mobile, visible, toggleVisibility }) => {
    const [{ theme, selectedTheme }, dispatch] = useThemeValue()
    return (
      <StyledHeader justifyContent="flex-end">
        <StyledHeaderNav mobile={mobile} visible={visible}>
          <ul>
            <li>
              <Link to={'/blog'}>
                <Text variant="label">
                  Writing <span>📓</span>
                </Text>
              </Link>
            </li>
            <li>
              <Link to={'/projects'}>
                <Text variant="label">
                  Work <span>🚀</span>
                </Text>
              </Link>
            </li>
            <li>
              <Link to={'/resources'}>
                <Text variant="label">
                  Resources <span>💽</span>
                </Text>
              </Link>
            </li>
            <li>
              <Link to={'/about'}>
                <Text variant="label">
                  About <span>👨‍💻</span>
                </Text>
              </Link>
            </li>
          </ul>
        </StyledHeaderNav>

        <Flex
          mr={3}
          justifyContent="center"
          flexDirection="column"
          className="toggle"
        >
          <DarkModeToggle />
        </Flex>
        {mobile && (
          <Box
            type="button"
            className="MobileButton"
            onClick={toggleVisibility}
          >
            <svg
              className={visible && 'active'}
              viewBox="0 0 100 100"
              width="50"
            >
              <path
                className="line top"
                d="m 70,33 h -40 c -11.092231,0 11.883874,13.496726 -3.420361,12.956839 -0.962502,-2.089471 -2.222071,-3.282996 -4.545687,-3.282996 -2.323616,0 -5.113897,2.622752 -5.113897,7.071068 0,4.448316 2.080609,7.007933 5.555839,7.007933 2.401943,0 2.96769,-1.283974 4.166879,-3.282995 2.209342,0.273823 4.031294,1.642466 5.857227,-0.252538 v -13.005715 16.288404 h 7.653568"
              />
              <path
                className="line middle"
                d="m 70,50 h -40 c -5.6862,0 -8.534259,5.373483 -8.534259,11.551069 0,7.187738 3.499166,10.922274 13.131984,10.922274 11.021777,0 7.022787,-15.773343 15.531095,-15.773343 3.268142,0 5.177031,-2.159429 5.177031,-6.7 0,-4.540571 -1.766442,-7.33533 -5.087851,-7.326157 -3.321409,0.0092 -5.771288,2.789632 -5.771288,7.326157 0,4.536525 2.478983,6.805271 5.771288,6.7"
              />
              <path
                className="line bottom"
                d="m 70,67 h -40 c 0,0 -3.680675,0.737051 -3.660714,-3.517857 0.02541,-5.415597 3.391687,-10.357143 10.982142,-10.357143 4.048418,0 17.88928,0.178572 23.482143,0.178572 0,2.563604 2.451177,3.403635 4.642857,3.392857 2.19168,-0.01078 4.373905,-1.369814 4.375,-3.392857 0.0011,-2.023043 -1.924401,-2.589191 -4.553571,-4.107143 -2.62917,-1.517952 -4.196429,-1.799562 -4.196429,-3.660714 0,-1.861153 2.442181,-3.118811 4.196429,-3.035715 1.754248,0.0831 4.375,0.890841 4.375,3.125 2.628634,0 6.160714,0.267857 6.160714,0.267857 l -0.178571,-2.946428 10.178571,0 -10.178571,0 v 6.696428 l 8.928571,0 -8.928571,0 v 7.142858 l 10.178571,0 -10.178571,0"
              />
            </svg>
          </Box>
        )}

        <Link
          to={'/'}
          className="logo"
          aria-label="Ryosuke Hana (the Japanese Hiragana characters for the name)"
        >
          <svg
            width="87px"
            height="42px"
            viewBox="0 0 140 67"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g
              id="ryosuke"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <path
                d="M35.16,56.184 L35.16,42.936 L46.392,42.936 L46.392,54.24 C46.392,55.176 46.608,55.68 46.968,55.896 C47.4,56.112 48.624,56.184 50.496,56.184 C52.368,56.184 53.376,55.896 53.736,55.392 C54.096,54.816 54.456,52.944 54.672,49.776 L65.112,50.712 C64.824,54.672 64.824,56.544 64.248,58.92 C63.672,61.224 63.528,62.088 62.232,63.24 C60.864,64.392 60.144,64.608 57.624,64.968 C55.176,65.328 53.448,65.328 49.416,65.328 C47.04,65.328 45.168,65.328 43.728,65.256 C40.992,65.184 38.4,64.608 37.32,63.816 C35.592,62.448 35.16,60.432 35.16,56.184 Z M19.752,42.576 L30.696,43.512 C29.472,55.176 21.552,62.448 5.568,66.408 L0.672,57.192 C7.224,55.68 11.832,53.88 14.496,51.792 C17.232,49.704 18.96,46.608 19.752,42.576 Z M2.544,49.272 L2.544,33.36 L63.456,33.36 L63.456,48.552 L53.016,48.552 L53.016,41.208 L12.984,41.208 L12.984,49.272 L2.544,49.272 Z M27.24,5.928 L27.24,0.384 L38.76,0.384 L38.76,5.928 L65.472,5.928 L65.472,14.568 L0.528,14.568 L0.528,5.928 L27.24,5.928 Z M8.88,16.584 L57.12,16.584 L57.12,31.416 L8.88,31.416 L8.88,16.584 Z M45.816,25.512 L45.816,22.704 L20.184,22.704 L20.184,25.512 L45.816,25.512 Z M125.016,25.08 L125.016,65.472 L113.568,65.472 L113.568,23.352 L122.424,23.352 C116.232,19.32 110.4,14.568 105,9.096 C99.6,14.568 93.768,19.32 87.576,23.352 L97.512,23.352 L97.512,30.264 C97.512,52.008 93.768,58.2 79.584,66.192 L73.248,57.336 C83.904,51.576 86.28,47.616 86.28,30.264 L86.28,24.216 C82.392,26.592 78.576,28.752 74.76,30.624 L70.656,21.48 C81.168,16.008 90.168,9.6 97.8,2.04 L112.2,2.04 C119.832,9.6 128.832,16.008 139.344,21.48 L135.24,30.624 C131.568,28.824 128.184,26.952 125.016,25.08 Z"
                id="亮介-copy-11"
                fill={theme.colors.black}
              ></path>
            </g>
          </svg>
        </Link>
      </StyledHeader>
    )
  }
)

export default Header

import React from 'react'
import Helmet from 'react-helmet'
import config from '../config'
import { Box } from 'rebass/styled-components'

import MobileHeader from "../components/Header/MobileHeader"
import Footer from '../components/Footer/Footer'

import appleTouchIcon from '../../static/assets/favicon/apple-touch-icon.png'
import favicon32 from '../../static/assets/favicon/favicon-32x32.png'
import favicon16 from '../../static/assets/favicon/favicon-16x16.png'

const BaseLayout = ({ children }) => (
  <div>
    <Helmet>
      <title>{ config.title }</title>
      <meta name="description" content={ config.description } />
      <meta name="keywords" content={ config.keywords } />
      <link rel="apple-touch-icon" sizes="180x180" href={ appleTouchIcon } />
      <link rel="icon" type="image/png" sizes="32x32" href={ favicon32 } />
      <link rel="icon" type="image/png" sizes="16x16" href={ favicon16 } />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </Helmet>
    <MobileHeader />

    <Box as="section" pt="4.8rem" className="App">
      {children}
    </Box>

    <Footer />
  </div>
)

export default BaseLayout

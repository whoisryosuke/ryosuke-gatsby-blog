import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/Header'
import Footer from '../components/Footer'
import './index.css'
//import '../assets/css/bootstrap-grid.min.css'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Ryosuke"
      meta={[
        { name: 'description', content: 'The portfolio and blog of Ryosuke' },
        { name: 'keywords', content: 'web designer for hire, designer for hire, ryosuke design, oscar diaz, whoisryosuke, ryosuke hana' },
      ]}
    />
    <Header />

    <section className="App">
      {children()}
    </section>

    <Footer />
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper

import React, { useState, useLayoutEffect } from 'react'
import Header from './Header'
import debounce from '../../helpers/debounce'

const MobileHeader = () => {
  const [isMobile, setMobile] = useState(false)
  const [isVisible, setVisibility] = useState(false)

  const resize = () => {
    let currentHideNav = window.innerWidth <= 650
    // Are we mobile?
    setMobile(currentHideNav)
  }

  const toggleVisibility = () => {
    setVisibility(!isVisible)
  }

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', debounce(resize, 250))
      resize()
    }
  })

  return (
    <Header
      mobile={isMobile}
      visible={isVisible}
      toggleVisibility={toggleVisibility}
    />
  )
}

export default MobileHeader

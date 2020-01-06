import React, { useState, useLayoutEffect } from 'react'
import Header from './Header'
import debounce from '../../helpers/debounce'

const MobileHeader = () => {

  const [isMobile, setMobile] = useState(false)
  const [isVisible, setVisibility] = useState(false)

  const resize = () => {
    let currentHideNav = window.innerWidth <= 600
    // Are we mobile?
    setMobile(currentHideNav)
  }

  const toggleVisibility = () => {
    setVisibility(!isVisible)
  }

  useLayoutEffect(() => {
    resize()
  })

  return (
    <Header mobile={isMobile} visible={isVisible} toggleVisibility={toggleVisibility} />
  )

}

export default MobileHeader

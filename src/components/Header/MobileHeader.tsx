import React, { useState, useEffect } from 'react'
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

  useEffect(() => {
    window.addEventListener("resize", debounce(resize, 250))
    resize()
  })

  return (
    <Header mobile={isMobile} visible={isVisible} toggleVisibility={toggleVisibility} />
  )

}

export default MobileHeader

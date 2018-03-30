import React, { Component } from 'react'
import Link from 'gatsby-link'
import { Menu } from 'semantic-ui-react'

class Header extends Component {

  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {

    const { activeItem } = this.state
    
    return(
      <Menu color={'blue'} inverted widths={3}>
        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
        <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick} />
        <Menu.Item name='friends' active={activeItem === 'friends'} onClick={this.handleItemClick} />
      </Menu>
    )
  }
  
}

export default Header

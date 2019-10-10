import React, { Component } from 'react'
import Img from 'gatsby-image'

import EmailIcon from '../../../assets/img/icons/email.svg'

export default class FrontpageContact extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let CoffeeEmojiImg = this.props.CoffeeEmoji ? (
      <Img
        fixed={this.props.CoffeeEmoji.childImageSharp.fixed}
        alt="Coffee emoji"
      />
    ) : (
      ''
    )

    return (
      <div className="cta gray very padded Frontpage__contact">
        <div className="container centered">
          <h2 className="text blue">Let's chat {CoffeeEmojiImg}</h2>
          <p>
            I'm interested in freelance projects, remote work or mentoring, feel
            free to email me.
          </p>
          <p>
            <img src={EmailIcon} alt="Email icon" />
            <a href="mailto:ryosuke.san.hana@gmail.com">
              ryosuke.san.hana@gmail.com
            </a>
          </p>
        </div>
      </div>
    )
  }
}

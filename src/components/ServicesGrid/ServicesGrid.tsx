import React, { Component } from 'react'

import InfluencerIcon from '../../assets/img/icons/influencer.svg'
import PhotoIcon from '../../assets/img/icons/photo.svg'
import UXIcon from '../../assets/img/icons/ux.svg'
import FullStackIcon from '../../assets/img/icons/fullstack.svg'

export default class ServicesGrid extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="container Frontpage__services">
        <section className="container">
          <article className="col">
            <div className="services">
              <img src={UXIcon} alt="UX icon" />
              <h3>UI/UX Designer</h3>
              <p>
                I'm a freelance UI/UX designer with 10+ years of experience
                working professionally on the web. I love designing simple, yet
                evocative web &amp; mobile interfaces.
              </p>
            </div>
          </article>

          <article className="col">
            <div className="services">
              <img src={FullStackIcon} alt="Full Stack icon" />
              <h3>Full-stack engineer</h3>
              <p>
                From the frontend to the backend, I've spent years building
                applications from scratch on the client and server side. I'm
                skilled in PHP and JS frameworks and modern workflows.
              </p>
            </div>
          </article>

          <article className="col">
            <div className="services">
              <img src={PhotoIcon} alt="Photography icon" />
              <h3>Photo + Video Production</h3>
              <p>
                I have over 15 years of experience with photography, ranging
                from products to portraits. I also shoot, edit, color correct,
                and create motion graphics for films.
              </p>
            </div>
          </article>

          <article className="col">
            <div className="services">
              <img src={InfluencerIcon} alt="Alien ship icon" />
              <h3>Influencer</h3>
              <p>
                I speak at conferences about my experiences in the design and
                cannabis industry. I also teach design and development online
                through various platforms.
              </p>
            </div>
          </article>
        </section>
      </div>
    )
  }
}

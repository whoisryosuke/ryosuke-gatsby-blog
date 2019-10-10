import React, { Component } from 'react'

export default class RecentlyFeatured extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="container Frontpage__courses">
        <h2 className="Title text blue">Latest courses</h2>
        <div className="row">
          <article className="col course">
            <h3>Course name</h3>
          </article>
          <article className="col course">
            <h3>Course name</h3>
          </article>
        </div>
      </div>
    )
  }
}

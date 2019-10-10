import React, { Component } from 'react'

export default class LatestCourses extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="container">
        <h2 className="Title text blue">Recently featured in</h2>
        <div className="row">
          <article className="col">
            <h3>LaravelNews</h3>
          </article>
          <article className="col">
            <h3>Smashing Magazine</h3>
          </article>
        </div>
      </div>
    )
  }
}

import React from 'react'
import styled from 'styled-components'
import throttle from './throttle'

const Progress = styled.progress`
  /* Reset the default appearance */
  -webkit-appearance: none;
  appearance: none;

  position: fixed;
  display: block;
  top: 5rem;
  width: 100vw;
  height: 0.4rem;
  border: 0;
  color: #005cdd;
  z-index: 810;
  border-bottom: 1px solid ${(props) => props.theme.colors.black};
  border-top: 1px solid ${(props) => props.theme.colors.black};

  &::-webkit-progress-bar {
    background-color: ${(props) => props.theme.colors.white};
  }
  &::-webkit-progress-value {
    background: ${(props) => props.theme.colors.primary};
  }
  &::-moz-progress-bar {
    background: ${(props) => props.theme.colors.primary};
  }
`

interface Props {
  targetEl: string
  className: string
  style: object
}

/**
 * Adapted from @makotot on Github
 * via: https://github.com/makotot/react-reading-progress
 */
export default class ReadingProgress extends React.Component<Props, {}> {
  constructor(props) {
    super(props)

    this.targetEl = null
    this.rootEl = null
    this.max = 0
    this.viewportH = 0
    this.targetHeight = 0

    this.state = {
      value: 0,
    }
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      const { props } = this

      this.targetEl = props.targetEl
        ? document.querySelector(props.targetEl)
        : document.body
      this.rootEl = props.rootEl ? document.querySelector(props.rootEl) : window

      this.measure()
      this.rootEl.addEventListener('scroll', this.handleScroll)
      window.addEventListener('resize', this.handleResize)
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      this.rootEl.removeEventListener('scroll', this.handleScroll)
      window.removeEventListener('resize', this.handleResize)
    }
  }

  measureViewportHeight() {
    return !this.props.rootEl
      ? Math.max(document.body.clientHeight, window.innerHeight || 0)
      : this.rootEl.clientHeight
  }

  measure() {
    this.targetHeight = this.targetEl.clientHeight
    // this.viewportH = this.measureViewportHeight()
    this.max = this.targetHeight - this.targetEl.offsetTop
  }

  handleResize = () => {
    throttle(this.measure(), 100)
  }

  handleScroll = () => {
    throttle(this.update(), 100)
  }

  update = () => {
    const value = !this.props.rootEl
      ? window.pageYOffset || document.documentElement.scrollTop
      : this.rootEl.scrollTop

    this.setState({
      value,
    })
  }

  render() {
    return (
      <Progress
        value={this.state.value}
        max={this.max}
        className={this.props.className}
        style={this.props.style}
      />
    )
  }
}

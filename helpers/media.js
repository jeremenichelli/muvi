import { css } from 'styled-components'

const breakpoints = {
  mobile: '(max-width: 950px)'
}

const media = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (styles) => css`
    @media ${breakpoints[label]} {
      ${styles}
    }
  `

  return acc
}, {})

export default media

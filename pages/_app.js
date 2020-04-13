import App from 'next/app'
import React from 'react'
import GlobalStyles from '../components/global-styles/global-styles'

export default class AppWithGlobalStyles extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <GlobalStyles />
        <Component {...pageProps} />
      </>
    )
  }
}

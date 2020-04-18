import App from 'next/app'
import React from 'react'
import GlobalStyles from '../components/global-styles/global-styles'
import Grid from '../components/grid/grid'
import GridHeader from '../components/grid/grid-header'
import AppTitle from '../components/app-title/app-title'

export default class MuviApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <GlobalStyles />
        <Grid>
          <GridHeader>
            <AppTitle>muvi</AppTitle>
          </GridHeader>
          <Component {...pageProps} />
        </Grid>
      </>
    )
  }
}

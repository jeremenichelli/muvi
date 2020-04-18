import React from 'react'
import Router from 'next/router'
import Anchor from '../anchor/anchor'

function onBackNavigation(evt) {
  evt.preventDefault()
  evt.stopPropagation()

  Router.back()
}

const BackNavigation = () => (
  <Anchor onClick={onBackNavigation}>« Go back</Anchor>
)

export default BackNavigation

import React from 'react'
import Router from 'next/router'
import Anchor from '../anchor/anchor'
import Link from 'next/link'

function onBackNavigation(evt) {
  evt.preventDefault()
  evt.stopPropagation()

  Router.back()
}

const BackNavigation = ({ referrer }) => (
  <Anchor href={referrer ? referrer : '/'} onClick={onBackNavigation}>
    « Go back
  </Anchor>
)

export default BackNavigation

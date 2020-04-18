import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Anchor from '../anchor/anchor'

const SearchAnchor = styled(Anchor)`
  margin: 1rem 0;
`

const SearchNavigation = ({ href, children }) => (
  <Link href={href} passHref>
    <SearchAnchor>{children}</SearchAnchor>
  </Link>
)

export default SearchNavigation

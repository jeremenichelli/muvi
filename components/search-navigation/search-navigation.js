import React from 'react'
import Link from 'next/link'
import Anchor from '../anchor/anchor'

const SearchNavigation = ({ href, children }) => (
  <Link href={href} passHref>
    <Anchor>{children}</Anchor>
  </Link>
)

export default SearchNavigation

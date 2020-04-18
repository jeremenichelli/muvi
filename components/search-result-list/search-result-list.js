import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { red, grey } from '../../helpers/tokens'

const Ul = styled.ul`
  list-style: none;
  padding: 0;
`

const Li = styled.li`
  font-size: 2rem;
  font-style: italic;
  font-weight: 700;

  & + & {
    margin: 1rem 0 0;
  }
`

const ResultLink = styled.a`
  color: ${red};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const ResultYear = styled.span`
  color: ${grey};
`

const SearchResultList = ({ items }) => (
  <Ul>
    {items.map((item) => (
      <Li key={item.id}>
        <Link
          key={item.id}
          href={`/movie/[id]`}
          as={`/movie/${item.id}`}
          passHref
        >
          <ResultLink>{item.title}</ResultLink>
        </Link>
        <ResultYear>{` (${item.year})`}</ResultYear>
      </Li>
    ))}
  </Ul>
)

export default SearchResultList

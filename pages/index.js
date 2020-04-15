import React, { useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import unfetch from 'isomorphic-unfetch'

const Index = (props) => {
  const { prevPage, nextPage, currentSearch, error } = props
  const [searchQuery, setSearchQuery] = useState('')

  const onSubmit = (evt) => {
    evt.preventDefault()
    const formData = new FormData(evt.target)
    const searchQuery = formData.get('search')

    Router.push(`/?search=${searchQuery}`)
  }

  const hasResults = props.pageResults && props.pageResults.length

  return (
    <main>
      <Head>
        <title>muvi</title>
      </Head>
      <h1>muvi</h1>
      <div>
        <form action="?" onSubmit={onSubmit}>
          <input
            name="search"
            value={searchQuery}
            onChange={(evt) => setSearchQuery(evt.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        {error && <p>{error}</p>}
        {hasResults && (
          <ul>
            {props.pageResults.map((result) => (
              <li key={result.id}>
                <Link
                  key={result.id}
                  href={`/movie/[id]`}
                  as={`/movie/${result.id}`}
                >
                  {`${result.title} (${result.year})`}
                </Link>
              </li>
            ))}
          </ul>
        )}
        {prevPage && (
          <Link
            href={`/?search=${currentSearch}&page=${prevPage}`}
          >{`${prevPage}`}</Link>
        )}
        {nextPage && (
          <Link
            href={`/?search=${currentSearch}&page=${nextPage}`}
          >{`${nextPage}`}</Link>
        )}
      </div>
    </main>
  )
}

const RESULTS_PER_PAGE = 10

Index.getInitialProps = async (context) => {
  const { query } = context

  if (!query.search) {
    return {}
  }

  const currentPage = query.page ? +query.page : 1
  const searchUrl = `//www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${query.search}&page=${currentPage}`

  const response = await unfetch(searchUrl)
  const results = await response.json()

  if (results.Error) {
    return { error: `No results found for ${query.search}` }
  }

  const pageResults = results.Search.map((item) => ({
    id: item.imdbID,
    title: item.Title,
    year: item.Year
  }))

  const hasNextPage = RESULTS_PER_PAGE * currentPage < results.totalResults
  const hasPrevPage = currentPage < 2

  return {
    pageResults,
    totalResults: results.totalResults,
    currentSearch: query.search,
    currentPage,
    nextPage: hasNextPage ? currentPage + 1 : null,
    prevPage: hasPrevPage ? null : currentPage - 1
  }
}

export default Index

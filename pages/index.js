import React, { useState, useEffect } from 'react'
import unfetch from 'isomorphic-unfetch'
import Router from 'next/router'
import Head from 'next/head'
import GridMain from '../components/grid/grid-main'
import GridAside from '../components/grid/grid-aside'
import SearchButton from '../components/search-button/search-button'
import SearchInput from '../components/search-input/search-input'
import MainTitle from '../components/main-title/main-title'
import SearchResultList from '../components/search-result-list/search-result-list'
import SearchNavigation from '../components/search-navigation/search-navigation'

const onSubmit = function (evt) {
  evt.preventDefault()
  const formData = new FormData(evt.target)
  const searchQuery = formData.get('search')

  Router.push(`/?search=${searchQuery}`)
}

const Index = (props) => {
  const { pageResults, prevPage, nextPage, currentSearch, error } = props
  const [searchQuery, setSearchQuery] = useState(currentSearch)
  const hasResults = pageResults && pageResults.length

  useEffect(() => {
    setSearchQuery(currentSearch)
  }, [currentSearch])

  return (
    <>
      <Head>
        <title>muvi</title>
      </Head>
      <GridAside>
        <form action="?" onSubmit={onSubmit}>
          <SearchInput
            name="search"
            value={searchQuery}
            placeholder="Insert movie title"
            onChange={(evt) => setSearchQuery(evt.target.value)}
            required
          />
          <SearchButton type="submit">Search</SearchButton>
        </form>
      </GridAside>
      <GridMain>
        {error && (
          <MainTitle highlight={`«${currentSearch}»`}>
            No results found for
          </MainTitle>
        )}
        {currentSearch && hasResults && (
          <MainTitle highlight={`«${currentSearch}»`}>Results for</MainTitle>
        )}
        {hasResults && <SearchResultList items={pageResults} />}
        {prevPage && (
          <SearchNavigation
            href={`/?search=${currentSearch}&page=${prevPage}`}
          >{`« Page ${prevPage}`}</SearchNavigation>
        )}
        {nextPage && (
          <SearchNavigation
            href={`/?search=${currentSearch}&page=${nextPage}`}
          >{`Page ${nextPage} »`}</SearchNavigation>
        )}
      </GridMain>
    </>
  )
}

const RESULTS_PER_PAGE = 10

Index.getInitialProps = async (context) => {
  const { query } = context
  const currentSearch = query.search

  if (!currentSearch) return {}

  const currentPage = query.page ? +query.page : 1
  const searchUrl = `//www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${currentSearch}&page=${currentPage}&type=movie`

  const response = await unfetch(searchUrl)
  const results = await response.json()

  if (results.Error) {
    return { error: `No results found for ${currentSearch}`, currentSearch }
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
    currentSearch,
    currentPage,
    nextPage: hasNextPage ? currentPage + 1 : null,
    prevPage: hasPrevPage ? null : currentPage - 1
  }
}

export default Index

import React from 'react'
import unfetch from 'isomorphic-unfetch'
import Head from 'next/head'
import GridMain from '../../components/grid/grid-main'

const Movie = (props) => {
  const { data, error } = props

  if (error && error === ERROR_NOT_FOUND) {
    return (
      <main>
        <Head>
          <title>muvi - Not Found</title>
        </Head>
        <h1>Movie not found</h1>
      </main>
    )
  }

  return (
    <>
      <Head>
        <title>{`muvi - ${data.title} (${data.year})`}</title>
      </Head>
      <GridMain>
        <h1>{`${data.title} (${data.year})`}</h1>
        <p>{data.plot}</p>
        <p>
          <strong>Duration</strong> {data.duration}
        </p>
        <p>
          <strong>Director</strong> {data.director}
        </p>
        <p>
          <strong>Actors</strong> {data.actors}
        </p>
        <ul>
          {data.ratings.map((rating, index) => (
            <li key={index}>
              <strong>{rating.source}</strong> {rating.value}
            </li>
          ))}
        </ul>
      </GridMain>
    </>
  )
}

const ERROR_NOT_FOUND = 404

Movie.getInitialProps = async (context) => {
  const { query } = context

  const movieUrl = `//www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${query.id}`

  const response = await unfetch(movieUrl)
  const result = await response.json()

  if (result.Error) {
    return {
      error: ERROR_NOT_FOUND
    }
  }

  const data = {
    title: result.Title,
    plot: result.Plot,
    year: result.Year,
    director: result.Director,
    duration: result.Runtime,
    actors: result.Actors,
    ratings: result.Ratings.map(processRatings)
  }

  return { data }
}

function processRatings(entry) {
  // eliminate slash and percentages from rating strings
  const regex = /\//
  const value = entry.Value.split(regex)[0].replace('%', '')

  return {
    source: entry.Source,
    value
  }
}

export default Movie

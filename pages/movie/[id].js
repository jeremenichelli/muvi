import React from 'react'
import Head from 'next/head'
import GridMain from '../../components/grid/grid-main'
import MainTitle from '../../components/main-title/main-title'
import styled from 'styled-components'
import { black, grey } from '../../helpers/tokens'
import GridAside from '../../components/grid/grid-aside'
import BackNavigation from '../../components/back-navigation/back-navigation'

const DataContent = styled.span`
  font-size: 2rem;
  color: ${grey};
`

const DataLabel = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: ${black};
`

const DataParagraph = styled.p`
  max-width: 70ch;
`

const Data = ({ label, content }) => (
  <DataParagraph>
    {label && <DataLabel>{label} </DataLabel>}
    <DataContent>{content}</DataContent>
  </DataParagraph>
)

const Movie = (props) => {
  const { data, error, referrer } = props

  return (
    <>
      <Head>
        <title>
          {error
            ? `muvi - Movie not found`
            : `muvi - ${data.title} (${data.year})`}
        </title>
      </Head>
      <GridAside>
        <BackNavigation referrer={referrer} />
      </GridAside>
      <GridMain>
        {error ? (
          <MainTitle>muvi - Movie not found</MainTitle>
        ) : (
          <>
            <MainTitle highlight={`(${data.year})`}>{data.title}</MainTitle>
            <Data content={data.plot} />
            <Data label="Duration" content={data.duration} />
            <Data label="Director" content={data.director} />
            <Data label="Actors" content={data.actors} />
            {data.ratings.map((rating, index) => (
              <Data key={index} label={rating.source} content={rating.value} />
            ))}
          </>
        )}
      </GridMain>
    </>
  )
}

const ERROR_NOT_FOUND = 404

Movie.getInitialProps = async (context) => {
  const { query, req } = context

  let referrer

  if (req) {
    referrer = req.headers.referer
  }

  const movieUrl = `//www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${query.id}`

  const response = await fetch(movieUrl)
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

  return { data, referrer }
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

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import { grey, black, lightGrey } from '../../helpers/tokens'

const Title = styled.h1`
  color: ${black};
  font-size: 3rem;
  font-weight: 900;
  margin: 0;
`

const Highlight = styled.span`
  color: ${grey};
`

const MainTitle = ({ children, highlight }) => (
  <>
    <Head>
      <title>{`${children} ${highlight}`}</title>
    </Head>
    <Title>
      {children} {highlight && <Highlight>{highlight}</Highlight>}
    </Title>
  </>
)

export default MainTitle

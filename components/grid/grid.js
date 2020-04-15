import styled from 'styled-components'
import media from '../../helpers/media'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'header main main main'
    'aside main main main';
  grid-gap: 1rem 1rem;
  gap: 1rem 1rem;

  ${media.mobile`
        grid-template-columns: auto;
        grid-template-rows: auto;
        grid-template-areas:
            "header"
            "aside"
            "main";
    `}
`

export default Grid

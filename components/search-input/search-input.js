import styled from 'styled-components'
import { grey, lightGrey } from '../../helpers/tokens'

const SearchInput = styled.input`
  border-radius: 0;
  border-width: 0;
  color: ${grey};
  display: block;
  font-size: 1.5rem;
  font-style: italic;
  font-weight: 700;
  outline: 0;
  width: 100%;

  &:placeholder {
    color: ${lightGrey};
  }
`

export default SearchInput

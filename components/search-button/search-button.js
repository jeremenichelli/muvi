import styled from 'styled-components'
import { lightGrey, red, white, black } from '../../helpers/tokens'

const SearchButton = styled.button`
  background-color: ${white};
  border-width: 3px;
  border-color: ${red};
  border-style: solid;
  border-radius: 4px;
  color: ${red};
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.05rem;
  margin: 1rem 0 0;
  padding: 0.75rem 2rem;
  text-transform: uppercase;

  &[disabled] {
    background-color: ${white};
    border-color: ${lightGrey};
    color: ${lightGrey};
    opacity: 1;
    pointer-events: none;
  }

  &:hover {
    background-color: ${red};
    color: ${white};
  }

  &:active {
    transform: scale(0.975);
  }
`

export default SearchButton

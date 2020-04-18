import styled from 'styled-components'
import { grey } from '../../helpers/tokens'

const Anchor = styled.a`
  color: ${grey};
  cursor: pointer;
  display: inline-block;
  font-size: 2rem;
  font-weight: 700;
  font-style: italic;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  & + & {
    margin-left: 2rem;
  }
`

export default Anchor

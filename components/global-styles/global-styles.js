import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
    html {
        box-sizing: border-box;
    }

    *, *::before, *::after {
        box-sizing: inherit;
    }

    body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Droid Sans", "Helvetica Neue", sans-serif;
        margin: 0;
        padding: 1rem;
    }
`

export default GlobalStyles

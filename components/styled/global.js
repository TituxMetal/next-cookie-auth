import { createGlobalStyle } from 'styled-components'

export const theme = {
  mainBg: 'hsl(0, 0%, 26%)',
  textOnMain: 'hsl(0, 0%, 96.1%)',
  primary: 'hsl(282, 68%, 38%)',
  primaryLight: 'hsl(291, 47%, 51%)',
  primaryDark: 'hsl(278.1, 100%, 22.5%)',
  secondary: 'hsl(21, 100%, 45%)',
  secondaryLight: 'hsl(22.2, 100%, 61.4%)',
  secondaryDark: 'hsl(8.7, 100%, 33.7%)',
  errorPrimary: 'hsl(0, 71.1%, 66.1%)',
  errorSecondary: 'hsl(0, 88.9%, 61.2%)'
}

export const GlobalStyle = createGlobalStyle`
  html { box-sizing: border-box; font-size: 20px; font-family: 'Lato', sans-serif; }
  *, *:before, *:after { box-sizing: inherit; outline: none; }
  *::-moz-focus-inner { border: none; }

  body {
    padding: 0;
    margin: 0;
    font-size: 1rem;
    line-height: 2;
    background-color: ${theme.mainBg};
    color: ${theme.textOnMain};
  }
`

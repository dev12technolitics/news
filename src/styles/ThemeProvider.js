import PropTypes from 'prop-types'
// @mui
import { CssBaseline } from '@mui/material'
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles'
//components styles
import ComponentsOverrides from './mui-overrides'
//constant styles
import palette from './palette'
import typography from './typography'
import shadows from './shadows'
import customShadows from './customShadows'

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node,
}

export default function ThemeProvider({ children }) {
  const themeOptions = {
    palette: palette(themeValues?.themeMode),
    typography,
    shape: { borderRadius: 8 },
    shadows: shadows(themeValues?.themeMode),
    customShadows: customShadows(themeValues?.themeMode),
    // direction: themeDirection,
  }

  const theme = createTheme(themeOptions)

  theme.components = ComponentsOverrides(theme)

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />

        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  )
}

export const themeValues = {
  themeMode: 'light',
  themeDirection: 'ltr',
  themeContrast: 'default',
  themeLayout: 'vertical',
  themeColorPresets: 'default',
  themeStretch: false,
}

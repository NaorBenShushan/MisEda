import React from 'react';
import { create } from 'jss';
import rtl from 'jss-rtl';
import {
  StylesProvider,
  jssPreset,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

// const ltrTheme = createMuiTheme({ direction: "ltr" });
const rtlTheme = createMuiTheme({ direction: 'rtl' });

function AppContent() {
  React.useLayoutEffect(() => {
    document.body.setAttribute('dir', 'rtl');
  });
  return (
    <ThemeProvider theme={rtlTheme}>
      <CssBaseline />
      <TextField variant="outlined" label={'עם ישראל חי'} />
    </ThemeProvider>
  );
}
export default function App() {
  return (
    <StylesProvider jss={jss}>
      <AppContent />
    </StylesProvider>
  );
}

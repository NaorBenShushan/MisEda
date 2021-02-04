import React from 'react';
import './App.css';

import rtl from 'jss-rtl';
import { create } from 'jss';

// import { Switch, Route } from 'react-router-dom';

import MyRests from './components/myRests';
import Reviews from './components/reviews';
import Favorites from './components/favorites';
import MyAccount from './components/reviews';
import Login from './components/login';
import Register from './components/register';
import Home from './components/home';
import Footer from './components/footer';
import Navbar from './components/navbar';
import Background from './components/common/background';
import { Route } from 'react-router-dom';
import {
  StylesProvider,
  jssPreset,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

// Set RTL from the Theme
const rtlTheme = createMuiTheme({ direction: 'rtl' });

function App() {
  // Set the RTL on the State
  React.useLayoutEffect(() => {
    document.body.setAttribute('dir', 'rtl');
  });

  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={rtlTheme}>
        <header>
          <Navbar />
        </header>

        <main className="minHeight">
          <Background />
          <Route path="/my-rests" component={MyRests} />
          <Route path="/reviews" component={Reviews} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/my-account" component={MyAccount} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" exact component={Home} />
        </main>

        <footer>
          <Footer />
        </footer>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;

import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';

import AppHeader from './AppHeader';
import Search from './Search';
import DialogueBox from './DialogueBox';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="Canvas background">
          <AppHeader />
          <Search />
          <DialogueBox />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

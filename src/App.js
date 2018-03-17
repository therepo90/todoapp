import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FacebookAuth from './FacebookAuth';
import TodoList from './TodoList';

class App extends Component {

  state ={
    loggedIn: false,
    fbLoaded: false
  }
  onFBLoad = loggedIn => {
    console.log('fb loaded');
    this.setState({fbLoaded: true, loggedIn});
  }
  onStatusChange = loggedIn => {
    console.log('status changed');
    this.setState({loggedIn});
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <FacebookAuth onLoad={this.onFBLoad} appId="153663195313957" onStatusChange={this.onStatusChange} />
          {this.state.fbLoaded && this.state.loggedIn && (
            <TodoList />
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

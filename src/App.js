import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import { APP_ID } from './constants';
import FacebookAuth from './FacebookAuth';
import TodoList from './TodoList';
import './App.css';

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
        <div className="app">
          <Paper zDepth={3} className="app-paper">
            <div className="app__login">
              <div className="app__fb-button">
                <FacebookAuth onLoad={this.onFBLoad} appId={APP_ID} onStatusChange={this.onStatusChange} />
              </div>
            </div>
            <h1 className="app__header">TODO App</h1>
            {this.state.fbLoaded && !this.state.loggedIn && <div className="app__not-logged">To see todo list please log in.</div>}
            {this.state.fbLoaded && this.state.loggedIn && (
                  <TodoList />
            )}
         </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

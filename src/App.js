import React, { Component } from 'react';
import './App.css';
import FacebookAuth from './FacebookAuth';

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
      <div className="App">
        <FacebookAuth onLoad={this.onFBLoad} appId="153663195313957" onStatusChange={this.onStatusChange} />
        {this.state.fbLoaded && this.state.loggedIn && (
          <div>
            Visible after login
          </div>
        )}
      </div>
    );
  }
}

export default App;

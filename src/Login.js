import React from 'react';
import { get } from 'lodash';
import FacebookAuth from './FacebookAuth';
export default class Login extends React.Component {

    state = {
        loggedIn: false
    }
    responseFacebook = response => {
        console.log('Got response', response);
        this.setState({loggedIn: !!get(response,'id')});
    }

    render(){
        return (
            <div>
                {this.state.loggedIn && <div>Logged in.</div>}
                {!this.state.loggedIn && <FacebookAuth callback={this.responseFacebook} />
                }
            </div>
        );
    }
}
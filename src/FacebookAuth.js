import React from 'react';
import PropTypes from 'prop-types';

export default class FacebookAuth extends React.Component {
    constructor(props) {
        super(props);
        this.buttonHTML = `<div class="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="true"></div>`;
    }
    
    componentDidMount() {
        window.fbAsyncInit = () => {
            const FB = window.FB;
            FB.init({
                appId: this.props.appId,
                cookie: true,
                xfbml: true,
                version: 'v2.12'
            });

            FB.AppEvents.logPageView();
            
            const isUserLoggedIn = response => response.status === 'connected';
            FB.getLoginStatus(response => this.props.onLoad(isUserLoggedIn(response)));
            window.FB.Event.subscribe('auth.statusChange', response => this.props.onStatusChange(isUserLoggedIn(response)));
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
    render() {
        return <div dangerouslySetInnerHTML={{ __html: this.buttonHTML}} />
    }
}

FacebookAuth.propTypes = {
    onStatusChange: PropTypes.func.isRequired,
    appId: PropTypes.string.isRequired,
    onLoad: PropTypes.func.isRequired
};
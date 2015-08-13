import React from 'react'

import Header from './header/Header'
import HeaderActions from './header/HeaderActions'
import Notification from './notification/Notification'
import WebStorage from '../services/WebStorage'
import { RouteHandler} from 'react-router'
import LoginActions from '../auth/LoginActions'

var App = React.createClass({
    statics: {
        willTransitionTo(transition) {
            HeaderActions.closeNavigation()
        }
    },
    componentWillMount() {
        this.cleanCache()
        window.addEventListener('focus', () => {
            LoginActions.getGeolocation()
        })
    },
    cleanCache() {
        let cachedShoutUrls = WebStorage.fromStore('cachedShoutUrls', [])

        for(var i = 0; i < cachedShoutUrls.length; i++) {
            WebStorage.remove(cachedShoutUrls[i])
        }

        WebStorage.remove('cachedShoutUrls')
    },
    render() {
        return (
            <div>
                <Header />
                <RouteHandler/>
                <Notification />
            </div>
        )
    }
});

export default App

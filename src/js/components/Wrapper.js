import React from 'react'

import Header from './header/Header'
import HeaderActions from './header/HeaderActions'
import Notification from './notification/Notification'
import WebStorage from '../services/WebStorage'
import { RouteHandler} from 'react-router'
import LoginActions from '../auth/LoginActions'
import LoginStore from '../auth/LoginStore'

let Wrapper = React.createClass({
    statics: {
        willTransitionTo(transition) {
            HeaderActions.closeNavigation()
        }
    },
    componentWillMount() {
        this.cleanCache()
        if (LoginStore.isLoggedIn()) {
            LoginActions.getGeolocation()
        }
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
                <Header/>
                <RouteHandler/>
                <Notification/>
            </div>
        )
    }
});

export default Wrapper

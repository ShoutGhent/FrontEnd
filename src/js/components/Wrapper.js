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
    detectIE() {
        var ua = window.navigator.userAgent

        var msie = ua.indexOf('MSIE ')
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10)
        }

        var trident = ua.indexOf('Trident/')
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:')
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10)
        }

        var edge = ua.indexOf('Edge/')
        if (edge > 0) {
            // IE 12 => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10)
        }

        // other browser
        return false
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
                {this.detectIE() ? (
                    <h1>Internet Explorer... Really?</h1>
                ) : (<RouteHandler/>)}
                <Notification/>
            </div>
        )
    }
});

export default Wrapper

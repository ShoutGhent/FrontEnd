import React from 'react'

import Header from './components/Header'
import Notification from 'components/Notification'
import WebStorage from 'WebStorage'
import { RouteHandler} from 'react-router'
import LoginActions from 'LoginActions'
import LoginStore from './screens/LoggedIn/stores/LoginStore'

let AppHandler = React.createClass({
    componentDidMount() {
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
        return this.detectIE() ? (
            <div className="center-both" style={{
                textAlign: 'center'
            }}>
                <h1>Internet Explorer... Really...</h1>

                <img src="https://res.cloudinary.com/shoutghent/image/upload/c_scale,w_500/v1445983397/trollface_transparant_ii5s0f.png"/>
            </div>
        ) : (
            <div>
                <Header/>
                <RouteHandler/>
                <Notification/>
            </div>
        )
    }
});

export default AppHandler

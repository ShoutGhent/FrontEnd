import React from 'react'

import Header from './partials/Header'
import Notification from './notification/Notification'
import WebStorage from '../services/WebStorage'
import { RouteHandler} from 'react-router'

var App = React.createClass({
    componentWillMount() {
        this.cleanCache()
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

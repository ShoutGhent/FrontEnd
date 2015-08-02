import React from 'react'

import Header from './partials/Header'
import Notification from './notification/Notification'
import { RouteHandler} from 'react-router'

var App = React.createClass({
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

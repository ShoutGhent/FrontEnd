import React from 'react'
import { RouteHandler} from 'react-router'
import Header from './partials/Header'
import Notification from './notification/Notification'

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

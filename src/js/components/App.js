import React from 'react'
import { RouteHandler} from 'react-router'
import Header from './partials/Header'
import Footer from './partials/Footer'
import Notification from './notification/Notification'

var App = React.createClass({
    render() {
        return (
            <div>
                <Header />
                <RouteHandler/>
                <Footer />
                <Notification />
            </div>
        )
    }
});

export default App

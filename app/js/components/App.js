import React from 'react'
import { RouteHandler} from 'react-router'
import Header from './Partials/Header'
import Footer from './Partials/Footer'
import injectTapEventPlugin from 'react-tap-event-plugin'

var App = React.createClass({
    render() {
        return (
            <div>
                <Header />
                <RouteHandler/>
                <Footer />
            </div>
        )
    }
});

export default App

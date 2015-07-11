import React from 'react'
import { RouteHandler} from 'react-router'
import Header from './partials/Header'
import Footer from './partials/Footer'

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

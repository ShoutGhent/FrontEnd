import React from 'react'
import { RouteHandler} from 'react-router'
import Header from './partials/Header'
import Footer from './partials/Footer'
import Notification from './notification/Notification'
import { addons } from 'react/addons'
var { PureRenderMixin } = addons

var App = React.createClass({
    mixins: [PureRenderMixin],
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

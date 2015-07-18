import React from 'react'
import ShoutList from '../../shout/ShoutList'
import { addons } from 'react/addons'
var { PureRenderMixin } = addons

var _IndexLoggedIn = React.createClass({
    mixins: [PureRenderMixin],
    render() {
        return (
            <div className="container">
                <div className="section">
                    <ShoutList url="shouts" />
                </div>
            </div>
        )
    }
})

export default _IndexLoggedIn

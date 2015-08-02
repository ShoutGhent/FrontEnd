import React from 'react'

import ShoutFeed from '../../shout/ShoutFeed'

var _IndexLoggedIn = React.createClass({
    render() {
        return (
            <div className="container">
                <ShoutFeed url="shouts" />
            </div>
        )
    }
})

export default _IndexLoggedIn

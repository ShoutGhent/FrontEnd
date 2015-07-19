import React from 'react'
import ShoutList from '../../shout/ShoutList'

var _IndexLoggedIn = React.createClass({
    render() {
        return (
            <div className="container">
                <ShoutList url="shouts" />
            </div>
        )
    }
})

export default _IndexLoggedIn

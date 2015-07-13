import React from 'react'
import ShoutList from '../../shout/ShoutList'

var _IndexLoggedIn = React.createClass({
    render() {
        return (
            <div className="container">
                <div className="section">
                    <ShoutList />
                </div>
            </div>
        )
    }
})

export default _IndexLoggedIn

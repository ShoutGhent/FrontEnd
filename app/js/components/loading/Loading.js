import React from 'react'

var Loading = React.createClass({
    render() {
        return (
            <div className="progress">
                <div className="indeterminate"></div>
            </div>
        )
    }
})

export default Loading

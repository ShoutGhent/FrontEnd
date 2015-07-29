import React from 'react'

var Maps = React.createClass({
    getInitialState() {
        return {
            clickable: false
        }
    },
    enableInteraction() {
        this.setState({
            clickable: true
        })
    },
    render() {
        let { clickable } = this.state

        let css = {
            pointerEvents: clickable ? 'all' : 'none'
        }

        return (
            <div onClick={this.enableInteraction}>
                <div style={css}>
                    {this.props.children}
                </div>
            </div>
        )
    }
})

export default Maps

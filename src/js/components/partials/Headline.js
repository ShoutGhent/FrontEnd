import React from 'react'

let Headline = React.createClass({
    render() {
        let css = {
            marginBottom: 0
        }

        return (
            <div className="section">
                <div className="container">
                    <div className="row center" style={css}>
                        <h5 className="header col s12 light white-text">{this.props.children}</h5>
                    </div>
                </div>
            </div>
        )
    }
})

export default Headline

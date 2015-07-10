import React from 'react'

var Parallax = React.createClass({
    propTypes: {
        img: React.PropTypes.string.isRequired
    },
    render() {
        var css = {
            backgroundImage: `url(${this.props.img})`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover'
        }

        return (
            <div style={css}>
                {this.props.children}
            </div>
        )
    }
});

export default Parallax

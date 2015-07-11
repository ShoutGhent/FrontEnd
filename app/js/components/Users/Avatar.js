import React from 'react'
import md5 from 'MD5'

var Avatar = React.createClass({
    propTypes: {
        email: React.PropTypes.string.isRequired,
        size: React.PropTypes.number,
        default: React.PropTypes.string,
        pixelate: React.PropTypes.number,
        greyscale: React.PropTypes.bool,
        blur: React.PropTypes.number
    },
    getDefaultProps() {
        return {
            size: 80,
            default: '',
            pixelate: 0,
            greyscale: false,
            blur: 0
        }
    },
    render() {
        var url = `https://avatarize.me/a/${md5(this.props.email)}?size=${this.props.size}`

        var x = ['default', 'pixelate', 'greyscale', 'blur']

        x.forEach((option) => {
            if (this.props[option]) {
                url += `&${option}=${this.props[option]}`
            }
        })

        return (
            <img className={`img-${this.props.size} avatar`} src={url} />
        )
    }
})

export default Avatar

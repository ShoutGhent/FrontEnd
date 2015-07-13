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
        let { email, size, round } = this.props

        let url = `https://avatarize.me/a/${md5(email)}?size=${size}`

        let x = ['default', 'pixelate', 'greyscale', 'blur']

        x.forEach((option) => {
            if (this.props[option]) {
                url += `&${option}=${this.props[option]}`
            }
        })

        let className = `img-${size} avatar ${round ? 'circle' : ''}`

        return this.props.changeAble ? (
            <img data-avatarize-invoke onClick={(event) => {event.preventDefault()}} className={className} {...this.props} src={url} />
        ) : (
            <img className={className} {...this.props} src={url} />
        )
    }
})

export default Avatar

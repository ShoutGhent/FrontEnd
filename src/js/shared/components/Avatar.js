import React, { PropTypes } from 'react'

import md5 from 'md5'
import moment from 'moment'

var Avatar = React.createClass({
    propTypes: {
        email: PropTypes.string.isRequired,
        size: PropTypes.number,
        default: PropTypes.string,
        pixelate: PropTypes.number,
        greyscale: PropTypes.bool,
        blur: PropTypes.number,
        round: PropTypes.bool
    },
    getInitialState() {
        return {
            time: moment().format('x')
        }
    },
    getDefaultProps() {
        return {
            size: 80,
            default: '',
            pixelate: 0,
            greyscale: false,
            blur: 0,
            round: false
        }
    },
    componentDidMount() {
        // Re-render on focus
        //window.addEventListener('focus', this._setTime, false)
    },
    componentWillUnmount() {
        //window.removeEventListener('focus', this._setTime)
    },
    _setTime() {
        if (this.isMounted()) {
            this.setState({
                time: moment().format('x')
            })
        }
    },
    render() {
        let { email, size, round } = this.props
        let { time } = this.state

        let url = `https://avatarize.me/a/${md5(email)}?size=${size}&time=${time}`

        let x = ['default', 'pixelate', 'greyscale', 'blur']

        x.forEach((option) => {
            if (this.props[option]) {
                url += `&${option}=${this.props[option]}`
            }
        })

        let className = `img-${size} avatar ${round ? 'circle' : ''}`

        return <img onFocus={this.focused} className={className} {...this.props} src={url} />
    }
})

export default Avatar

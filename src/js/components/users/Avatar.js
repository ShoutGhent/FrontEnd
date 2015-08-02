import React from 'react'
import md5 from 'MD5'
import moment from 'moment'

var Avatar = React.createClass({
    propTypes: {
        email: React.PropTypes.string.isRequired,
        size: React.PropTypes.number,
        default: React.PropTypes.string,
        pixelate: React.PropTypes.number,
        greyscale: React.PropTypes.bool,
        blur: React.PropTypes.number
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
            blur: 0
        }
    },
    componentWillMount() {
        window.addEventListener('focus', () => {
            if (this.isMounted()) {
                this.setState({
                    time: moment().format('x')
                })
            }
        }, false)
    },
    componentWillUnmount() {
        window.removeEventListener('focus')
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

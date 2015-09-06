import React, { PropTypes } from 'react/addons'

import CloudinaryImage from 'react-cloudinary-img'
import Icon from './Icon'

var Cloudinary = React.createClass({
    propTypes: {
        options: PropTypes.object,
        fallbackHeight: PropTypes.number,
        defaultElement: PropTypes.element
    },
    getDefaultProps() {
        return {
            image: {},
            options: {},
            fallbackHeight: 0,
            defaultElement: (<Icon className="center" icon="photo"/>)
        }
    },
    isEmpty(obj) {
        var hasOwnProperty = Object.prototype.hasOwnProperty

        if (obj == null) return true
        if (obj.length > 0) return false
        if (obj.length === 0) return true

        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false
        }

        return true
    },
    render() {
        let { image, options, fallbackHeight, defaultElement } = this.props

        if (this.isEmpty(image)) {
            image = {}
        }

        // Force Ssl
        options['secure'] = true

        return (
            <div>
            { ! this.isEmpty(image) ? (
                <CloudinaryImage
                    {...this.props}
                    image={image}
                    cloudName="shoutGhent"
                    options={options}
                />
            ) : (
                <div {...this.props} style={{
                    width: options.width || '100%',
                    height: options.height || fallbackHeight || '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    position: 'relative'
                }}>
                    {defaultElement}
                </div>
            )}
            </div>
        )
    }
})

export default Cloudinary

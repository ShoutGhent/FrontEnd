import React, { PropTypes } from 'react/addons'

import CloudinaryImage from 'react-cloudinary-img'
import Icon from './Icon'

var Cloudinary = React.createClass({
    propTypes: {
        image: PropTypes.object,
        options: PropTypes.object,
        fallbackHeight: PropTypes.number
    },
    getDefaultProps() {
        return {
            image: {},
            options: {},
            fallbackHeight: 0
        }
    },
    isEmpty(obj) {
        var hasOwnProperty = Object.prototype.hasOwnProperty;

        // null and undefined are "empty"
        if (obj == null) return true;

        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length > 0)    return false;
        if (obj.length === 0)  return true;

        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and valueOf enumeration bugs in IE < 9
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }

        return true;

    },
    render() {
        let { image, options, fallbackHeight } = this.props

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
                    backgroundColor: 'transparent',
                    position: 'relative'
                }}>
                    <Icon style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }} icon="photo"/>
                </div>
            )}
            </div>
        )
    }
})

export default Cloudinary

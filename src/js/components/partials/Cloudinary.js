import React, { PropTypes } from 'react/addons'

import CloudinaryImage from 'react-cloudinary-img'
import Icon from './Icon'

var Cloudinary = React.createClass({
    propTypes: {
        image: PropTypes.array.isRequried,
        options: PropTypes.object
    },
    getDefaultProps() {
        return {
            options: {}
        }
    },
    render() {
        let { image, options } = this.props

        let imageExists = image.length > 0

        return (
            <div>
            {imageExists ? (
                <CloudinaryImage
                    {...this.props}
                    image={image}
                    cloudName="shoutGhent"
                    options={options}
                />
            ) : (
                <div {...this.props} style={{
                    width: options.width || '100%',
                    height: options.height || '100%',
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

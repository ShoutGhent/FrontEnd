import React, { PropTypes } from 'react'

import Cloudinary from '../partials/Cloudinary'
import Icon from '../partials/Icon'
import Lightbox from 'react-images'

var ShoutImages = React.createClass({
    propTypes: {
        images: PropTypes.array.isRequired,
        size: PropTypes.number
    },
    getDefaultProps() {
        return {
            size: 30
        }
    },
    getInitialState() {
        return {
            lightboxIsOpen: false
        }
    },
    openLightbox (index, event) {
        event.preventDefault()

        this.setState({
            lightboxIsOpen: true,
            lightboxInitialImage: index
        })
    },
    closeLightbox () {
        this.setState({
            lightboxIsOpen: false
        })
    },
    renderGallery()  {
        let { images, toBeUploaded, size } = this.props

        return images && images.length > 0 ? (
            <ul style={{display: 'inline-block', margin: 10}}>
                {images.map((image, i) => (
                    <a target="_blank" href={image.data.secure_url} onClick={this.openLightbox.bind(this, i)}>
                        <li style={{display: 'inline-block', margin: '0 3px'}}>
                            <Cloudinary
                                style={{cursor: 'pointer'}}
                                image={image.data}
                                options={{width: size, height: size}}
                            />
                        </li>
                    </a>
                ))}

                {toBeUploaded.map(image => (
                    <li style={{display: 'inline-block', margin: '0 3px', width: 65, height: 65}}>
                        <div className="relative">
                            <div className="center-both" style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                width: size,
                                height: size,
                                color: '#333'
                            }}>
                                <Icon icon="loop" spinning/>
                            </div>
                            <img src={image.url} style={{width: size, height: size}}/>
                        </div>
                    </li>
                ))}
            </ul>
        ) : null
    },
    render() {
        let { images } = this.props
        let { lightboxIsOpen, lightboxInitialImage } = this.state

        return (
            <div>
                {this.renderGallery()}

                <Lightbox
                    images={images.map(img => img.data.secure_url)}
                    initialImage={lightboxInitialImage}
                    isOpen={lightboxIsOpen}
                    onClose={this.closeLightbox}
                />
            </div>
        )
    }
})

export default ShoutImages

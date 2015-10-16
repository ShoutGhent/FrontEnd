import React, { PropTypes } from 'react/addons'

import API from '../../../services/API'
import Cropper from '../../cropper/Cropper'
import GroupActions from './GroupActions'
import Icon from '../../partials/Icon'
import { Button } from '../../Material/Material'
import { Modal, ModalContent, ModalFooter } from '../../modal/Modal'

var EditImage = React.createClass({
    propTypes: {
        image: PropTypes.string.isRequired,
        isOpen: PropTypes.bool.isRequired,
        link: PropTypes.string.isRequired,
        onDone: PropTypes.func,
        ratio: PropTypes.number.isRequired
    },
    getInitialState() {
        return {
            url: this.props.image,
            uploading: false
        }
    },
    getDefaultProps() {
        return {
            onDone: () => {}
        }
    },
    upload(file, cb) {
        this.setState({
            uploading: true
        })

        API.postFile(this.props.link, { key: 'image', value: file }, (res, err) => {
            GroupActions.setGroup(res)
            this.setState({
                uploading: false
            })

            if (cb) {
                cb()
            }
        })
    },
    getFileUrl() {
        return this.state.url
    },
    setImage(event) {
        let files = event.target.files
        let file = files[0]

        if (file) {
            let reader = new FileReader()
            reader.onload = (e) => {
                this.setState({
                    url: reader.result
                })
            }
            reader.readAsDataURL(file)
        }
    },
    submit(event) {
        event.preventDefault()

        let cropped = this.refs.cropper.getCroppedCanvas().toDataURL()

        this.upload(this.toBlob(cropped), () => {
            this.props.onDone()
        })
    },
    toBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime})
    },
    render() {
        let { uploading } = this.state
        let { isOpen, onDone, ratio } = this.props

        return (
            <Modal isOpen={isOpen} onClose={onDone}>
                <ModalContent>
                    <Cropper
                        aspectRatio={ratio}
                        guides={false}
                        ref="cropper"
                        src={this.getFileUrl()}
                        style={{height: 400, width: '100%'}}
                    />
                    <div className="file-field input-field">
                        <div className="btn">
                            <span>Selecteer Afbeelding</span>
                            <input type="file" onChange={this.setImage}/>
                        </div>
                        <br/><br/>
                    </div>
                </ModalContent>
                <ModalFooter>
                    <Button onClick={this.submit} right>
                        {uploading ? (
                            <span>
                                <Icon className="right" icon="loop" spinning/>
                                Uploaden...
                            </span>
                        ) : (
                            <span>Wijzig Afbeelding</span>
                        )}
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
})

export default EditImage

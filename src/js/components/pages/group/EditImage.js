import React, { PropTypes } from 'react/addons'

import API from '../../../services/API'
import Cropper from '../../cropper/Cropper'
import GroupActions from './GroupActions'
import Icon from '../../partials/Icon'
import Ink from 'react-ink'
import { Button } from '../../button/MaterialButton'
import { Modal, ModalContent, ModalFooter } from '../../modal/Modal'

var EditImage = React.createClass({
    propTypes: {
        link: PropTypes.string.isRequired,
        ratio: PropTypes.number.isRequired,
        isOpen: PropTypes.bool.isRequired,
        image: PropTypes.string.isRequired,
        onDone: PropTypes.func,
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

        API.post(this.props.link, { image: file }, (res, err) => {
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
        
        this.upload(cropped, () => {
            this.props.onDone()
        })
    },
    render() {
        let { uploading } = this.state
        let { isOpen, onDone, ratio } = this.props

        return (
            <Modal isOpen={isOpen} onClose={onDone}>
                <ModalContent>
                    <Cropper
                        ref="cropper"
                        src={this.getFileUrl()}
                        style={{height: 400, width: '100%'}}
                        aspectRatio={ratio}
                        guides={false}
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

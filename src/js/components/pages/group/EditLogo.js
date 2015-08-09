import React, { PropTypes } from 'react'

import API from '../../../services/API'
import Cropper from 'react-cropper'
import GroupActions from './GroupActions'
import Icon from '../../partials/Icon'
import { Modal, ModalContent, ModalFooter } from '../../modal/Modal'

var EditLogo = React.createClass({
    propTypes: {
        groupId: PropTypes.string.isRequired,
        isOpen: PropTypes.bool.isRequired,
        image: PropTypes.string.isRequired,
        onDone: PropTypes.func,
    },
    getInitialState() {
        return {
            url: this.props.image,
            cropped: null,
            uploading: false
        }
    },
    getDefaultProps() {
        return {
            onDone: () => {}
        }
    },
    upload(file, cb) {
        let url = `groups/${this.props.groupId}/logo`
        this.setState({
            uploading: true
        })

        API.post(url, { logo: file }, (res, err) => {
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

        this.upload(this.state.cropped, () => {
            this.props.onDone()
        })
    },
    _crop() {
        this.setState({
            cropped: this.refs.cropper.getCroppedCanvas().toDataURL()
        })
    },
    render() {
        let { uploading } = this.state
        
        return (
            <div>
                <Modal isOpen={this.props.isOpen} onClose={this.props.onDone}>
                    <ModalContent>
                        <Cropper
                            ref="cropper"
                            src={this.getFileUrl()}
                            style={{height: 400, width: '100%'}}
                            aspectRatio={1/1}
                            guides={false}
                            crop={this._crop}
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
                        <button onClick={this.submit} disabled={ ! this.state.cropped} className="btn right">
                            {uploading ? (
                                <span>
                                    <Icon className="right" icon="loop" spinning/>
                                    Uploaden...
                                </span>
                            ) : (
                                <span>Wijzig Afbeelding</span>
                            )}
                        </button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
})

export default EditLogo

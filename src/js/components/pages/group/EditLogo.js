import React, { PropTypes } from 'react'

import API from '../../../services/API'
import GroupActions from './GroupActions'
import Cropper from 'react-cropper'
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
            cropped: null
        }
    },
    getDefaultProps() {
        return {
            onDone: () => {}
        }
    },
    upload(file) {
        let url = `groups/${this.props.groupId}/logo`

        API.post(url, { logo: file }, (res, err) => {
            GroupActions.setGroup(res)
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
    submit() {
        this.upload(this.state.cropped)
        this.props.onDone()
    },
    _crop() {
        this.setState({
            cropped: this.refs.cropper.getCroppedCanvas().toDataURL()
        })
    },
    render() {
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
                        <button onClick={this.submit} disabled={ ! this.state.cropped} className="btn right">Wijzig Afbeelding</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
})

export default EditLogo

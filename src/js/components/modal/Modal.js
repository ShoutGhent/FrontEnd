import React, { PropTypes } from 'react'

import Portal from 'react-portal'

var Modal = React.createClass({
    propTypes: {
        isOpen: PropTypes.bool,
        onClose: PropTypes.func
    },
    getDefaultProps() {
        return {
            isOpen: false,
            onClose: () => {}
        }
    },
    onClose() {
        this.props.onClose()
    },
    render() {
        let { children, isOpen } = this.props

        return (
            <Portal isOpened={isOpen} onClose={this.onClose} closeOnEsc={true} closeOnOutsideClick={true}>
                <div>
                    <div className="modal">{children}</div>
                    <div className="lean-overlay"></div>
                </div>
            </Portal>
        )
    }
})

var ModalContent = React.createClass({
    render() {
        let { children } = this.props

        return (
            <div className="modal-content">{children}</div>
        )
    }
})

var ModalFooter = React.createClass({
    render() {
        let { children } = this.props

        return (
            <div className="modal-footer">{children}</div>
        )
    }
})

export default { Modal, ModalContent, ModalFooter }

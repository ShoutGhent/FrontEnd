import React from 'react'
import Portal from 'react-portal'

var Modal = React.createClass({
    getDefaultProps() {
        isOpen: false
    },
    render() {
        let { children, isOpen } = this.props

        return (
            <Portal isOpened={isOpen} closeOnEsc={true} closeOnOutsideClick={true}>
                <div>
                    <div className="modal" style={{width: (1280/2) * 1.618}}>{children}</div>
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

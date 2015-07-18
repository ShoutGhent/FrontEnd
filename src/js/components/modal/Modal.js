import React from 'react'
import Portal from 'react-portal'
import { addons } from 'react/addons'
var { PureRenderMixin } = addons

var Modal = React.createClass({
    mixins: [PureRenderMixin],
    getDefaultProps() {
        isOpen: false
    },
    render() {
        let { children, isOpen } = this.props

        return (
            <Portal isOpened={isOpen} closeOnEsc={true} closeOnOutsideClick={true}>
                <div>
                    <div className="modal">{children}</div>
                    <div className="lean-overlay"></div>
                </div>
            </Portal>
        )
    }
})

var ModalContent = React.createClass({
    mixins: [PureRenderMixin],
    render() {
        let { children } = this.props

        return (
            <div className="modal-content">{children}</div>
        )
    }
})

var ModalFooter = React.createClass({
    mixins: [PureRenderMixin],
    render() {
        let { children } = this.props

        return (
            <div className="modal-footer">{children}</div>
        )
    }
})

export default { Modal, ModalContent, ModalFooter }

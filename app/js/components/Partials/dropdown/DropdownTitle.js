import React from 'react'
import DropdownActions from './DropdownActions'

var DropdownTitle = React.createClass({
    toggleDropdown(event) {
        event.preventDefault()
        DropdownActions.hideOthers(this.props.dropdown_id)
        DropdownActions.toggle(this.props.dropdown_id)
    },
    render() {
        return (
            <a href onClick={this.toggleDropdown}>{this.props.children}</a>
        )
    }
})

export default DropdownTitle

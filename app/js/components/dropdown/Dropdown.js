import React from 'react/addons'
import DropdownActions from './DropdownActions'
import uuid from 'node-uuid'

var Dropdown = React.createClass({
    getInitialState() {
        return {
            dropdown_id: uuid.v4()
        }
    },
    componentDidMount() {
        DropdownActions.register(this.state.dropdown_id)
    },
    toggleDropdown(event) {
        event.preventDefault()
        DropdownActions.toggle(this.props.dropdown_id)
    },
    render() {
        var renderedChildren = React.Children.map(this.props.children, (child) => {
            return React.addons.cloneWithProps(child, {
                dropdown_id: this.state.dropdown_id
            })
        })

        return <div {...this.props}>{renderedChildren}</div>
    }
})

export default Dropdown

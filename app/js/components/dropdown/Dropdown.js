import React from 'react/addons'
import DropdownStore from './DropdownStore'
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
    render() {
        var renderedChildren = React.Children.map(this.props.children, (child) => {
            return React.addons.cloneWithProps(child, {
                dropdown_id: this.state.dropdown_id
            })
        })

        return <div {...this.props}>{renderedChildren}</div>
    }
})

var DropdownTitle = React.createClass({
    toggleDropdown(event) {
        event.preventDefault()
        DropdownActions.toggle(this.props.dropdown_id)
    },
    render() {
        return (
            <a href={true} onClick={this.toggleDropdown}>{this.props.children}</a>
        )
    }
})

function getStateFromStore(key) {
    var dropdowns = DropdownStore.getState().dropdowns
    var isOpen = false

    dropdowns.forEach((item) => {
        if (item.key == key) {
            isOpen = item.isOpen
        }
    })

    return { isOpen }
}

var DropdownContent = React.createClass({
    getInitialState() {
        return getStateFromStore(this.props.dropdown_id)
    },
    componentDidMount() {
        DropdownStore.listen(this._onChange)
    },
    componentWillUnmount() {
        DropdownStore.unlisten(this._onChange)
    },
    _onChange() {
        this.setState(getStateFromStore(this.props.dropdown_id))
    },
    toggleDropdown(event) {
        event.preventDefault()
        DropdownActions.toggle(this.props.dropdown_id)
    },
    getDefaultProps() {
        return {
            right: 0,
            top: '10px'
        }
    },
    render() {
        var css = {
            opacity: this.state.isOpen ? 1 : 0,
            display: this.state.isOpen ? 'block' : 'none',
            minWidth: '200px',
            marginTop: this.props.top
        }

        if (this.props.right) {
            css.right = this.props.right
        }

        return (
            <div onMouseLeave={this.toggleDropdown} className="dropdown-content" style={css}>{this.props.children}</div>
        )
    }
})

export default { Dropdown, DropdownTitle, DropdownContent }

import React from 'react'
import DropdownStore from './DropdownStore'

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
    render() {
        var css = {
            opacity: this.state.isOpen ? 1 : 0,
            display: this.state.isOpen ? 'block' : 'none',
            minWidth: '200px'
        }
        return (
            <div className="dropdown-content" style={css}>{this.props.children}</div>
        )
    }
})

export default DropdownContent

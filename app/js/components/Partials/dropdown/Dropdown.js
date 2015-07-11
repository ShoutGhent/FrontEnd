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
    componentWillUnmount() {
        DropdownActions.unRegister(this.state.dropdown_id)
    },
    render() {
        var renderedChildren = React.Children.map(this.props.children, (child) => {
            return React.addons.cloneWithProps(child, {
                dropdown_id: this.state.dropdown_id
            })
        })

        return <div>{renderedChildren}</div>
    }
})

export default Dropdown

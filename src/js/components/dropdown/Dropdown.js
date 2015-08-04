import React from 'react/addons'

var Dropdown = React.createClass({
    getInitialState() {
        return {
            isOpen: false
        }
    },
    closeDropdown(event) {
        event.preventDefault()

        this.setState({ isOpen: false })
    },
    toggleDropdown(event) {
        event.preventDefault()

        this.setState({
            isOpen: ! this.state.isOpen
        })
    },
    render() {
        let { children } = this.props
        let { isOpen } = this.state

        var renderedChildren = React.Children.map(children, (child) => {
            return React.addons.cloneWithProps(child, {
                toggleDropdown: this.toggleDropdown,
                isOpen: isOpen
            })
        })

        let css = {
            position: 'relative'
        }

        return <div {...this.props} style={css} onMouseLeave={this.closeDropdown}>{renderedChildren}</div>
    }
})

var DropdownTitle = React.createClass({
    render() {
        let { children, toggleDropdown } = this.props

        return (
            <a href={true} onClick={toggleDropdown}>{children}</a>
        )
    }
})

var DropdownContent = React.createClass({
    propTypes: {
        isOpen: React.PropTypes.bool
    },
    getDefaultProps() {
        return {
            isOpen: false
        }
    },
    render() {
        let { isOpen, children } = this.props

        let css = {
            opacity: isOpen ? 1 : 0,
            display: isOpen ? 'block' : 'none'
        }

        return (
            <ul className="dropdown-content" style={css}>
                {children}
            </ul>
        )
    }
})

export default { Dropdown, DropdownTitle, DropdownContent }

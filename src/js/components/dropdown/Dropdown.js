import React from 'react/addons'

var Dropdown = React.createClass({
    getInitialState() {
        return {
            isOpen: true
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
                openDropdown: this.openDropdown,
                closeDropdown: this.closeDropdown,
                toggleDropdown: this.toggleDropdown,
                isOpen: isOpen
            })
        })

        return <div {...this.props}>{renderedChildren}</div>
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
        top: React.PropTypes.string,
        isOpen: React.PropTypes.bool.isRequired
    },
    getDefaultProps() {
        return {
            top: '10px'
        }
    },
    render() {
        let { top, isOpen, closeDropdown, children } = this.props

        let css = {
            opacity: isOpen ? 1 : 0,
            display: isOpen ? 'block' : 'none',
            marginTop: top
        }

        return (
            <ul className="dropdown-content" onMouseLeave={closeDropdown} style={css}>
                {children}
            </ul>
        )
    }
})

export default { Dropdown, DropdownTitle, DropdownContent }

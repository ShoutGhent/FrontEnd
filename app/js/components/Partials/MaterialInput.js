import React from 'react/addons'
import { Grid, Cell } from '../grid/Grid'

var MaterialInput = React.createClass({
    getInitialState() {
        return {
            open: false,
            value: ''
        }
    },
    componentWillMount() {
        this.setState({
            open: (this.props.value || this.props.defaultValue) ? true : false,
            value: this.props.value || this.props.defaultValue || ''
        })
    },
    openLabel() {
        this.setState({
            open: true
        })
    },
    closeLabel() {
        this.setState({
            open: false
        })
    },
    changeValue(event) {
        if (typeof this.props.onChange == "function") {
            this.props.onChange(event)
        }

        this.setState({ value: event.target.value })

        this.openLabel()
    },
    check() {
        if (this.state.value != '') {
            this.openLabel()
        } else {
            this.closeLabel()
        }
    },
    focusable(component) {
        if (this.props.focus) {
            let node = React.findDOMNode(component)

            if (node) {
                node.focus()
            }
        }
    },
    render() {
        var { label } = this.props

        var labelStyles = {
            pointerEvents: 'none'
        }

        return (
            <div className="input-field">
                <input {...this.props} onChange={this.changeValue} onBlur={this.check} ref={this.focusable}/>
                <label style={labelStyles} className={this.state.open ? 'active' : ''}>{label}</label>
            </div>
        )
    }
})

export default MaterialInput

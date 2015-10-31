import React, { PropTypes } from 'react/addons'

import Validation from '../validation/Validation'
import { Grid, Cell } from 'Grid'

let MaterialInput = React.createClass({
    propTypes: {
        rules: PropTypes.array,
        onValidate: PropTypes.func
    },
    getDefaultProps() {
        return {
            rules: [],
            onValidate: null
        }
    },
    getInitialState() {
        return {
            open: (this.props.value || this.props.defaultValue) ? true : false,
            value: this.props.value || this.props.defaultValue || ''
        }
    },
    componentWillReceiveProps(newProps) {
        if (newProps.value == "") {
            this.setState(this.getInitialState())
        }
    },
    openLabel() {
        this.setState({ open: true })
    },
    closeLabel() {
        this.setState({ open: false })
    },
    changeValue(event) {
        if (typeof this.props.onChange == "function") {
            this.props.onChange(event)
        }

        this.setState({ value: event.target.value }, this.check)
    },
    check() {
        if (this.state.value != '') {
            this.openLabel()
        } else {
            this.closeLabel()
        }
    },
    onValidate(result) {
        if (typeof this.props.onValidate == "function") {
            this.props.onValidate(result)
        }
    },
    render() {
        let { label, rules } = this.props

        let labelStyles = {
            pointerEvents: 'none'
        }

        let valid = typeof this.props.onValidate == "function"

        return (
            <div className="input-field">
                <Validation onValidate={this.onValidate} rules={rules} validate={valid} inValidClass="invalid" validClass="" onChange={this.changeValue} onBlur={this.check}>
                    <input {...this.props} value={this.props.value} autoComplete='off'/>
                </Validation>
                <label style={labelStyles} className={this.state.open ? 'active' : ''}>{label}</label>
            </div>
        )
    }
})

export default MaterialInput

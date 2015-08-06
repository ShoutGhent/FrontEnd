import React, { PropTypes } from 'react/addons'

import Validation from '../forms/Validation/Validation'
import { Grid, Cell } from '../grid/Grid'

let MaterialTextarea = React.createClass({
    propTypes: {
        validate: PropTypes.bool,
        rules: PropTypes.array,
        onValidate: PropTypes.func
    },
    getDefaultProps() {
        return {
            validate: false,
            rules: [],
            onValidate: null
        }
    },
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
                    <input {...this.props} autoComplete='off'/>
                </Validation>
                <label style={labelStyles} className={this.state.open ? 'active' : ''}>{label}</label>
            </div>
        )
    }
})

export default MaterialTextarea

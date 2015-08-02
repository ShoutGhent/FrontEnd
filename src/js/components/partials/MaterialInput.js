import React from 'react/addons'

import { Grid, Cell } from '../grid/Grid'
import Validation from '../forms/Validation/Validation'

let MaterialInput = React.createClass({
    propTypes: {
        validate: React.PropTypes.bool,
        rules: React.PropTypes.array,
        onValidate: React.PropTypes.func
    },
    getDefaultProps() {
        return {
            validate: false,
            rules: [],
            onValidate: (result) => {}
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
        this.props.onValidate(result)
    },
    render() {
        let { label, validate, rules } = this.props

        let labelStyles = {
            pointerEvents: 'none'
        }

        return (
            <div className="input-field">
                <Validation onValidate={this.onValidate} rules={rules} validate={validate} inValidClass="invalid" validClass="" onChange={this.changeValue} onBlur={this.check}>
                    <input {...this.props} autoComplete='off'/>
                </Validation>
                <label style={labelStyles} className={this.state.open ? 'active' : ''}>{label}</label>
            </div>
        )
    }
})

export default MaterialInput

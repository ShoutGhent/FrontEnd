import React from 'react'

import Validator from './Validator'

var Validation = React.createClass({
    propTypes: {
        validClass: React.PropTypes.string.isRequired,
        inValidClass: React.PropTypes.string.isRequired,
        validate: React.PropTypes.bool,
        rules: React.PropTypes.array,
        onValidate: React.PropTypes.func,
        onChange: React.PropTypes.func,
        onBlur: React.PropTypes.func
    },
    getDefaultProps() {
        return {
            validate: true,
            rules: [],
            onChange: (event) => {},
            onBlur: (event) => {}
        }
    },
    getInitialState() {
        return {
            valid: true,
            message: ""
        }
    },
    validateInput(event) {
        let { valid, message } = this.validate(event.target.value)

        this.props.onValidate(valid)

        this.setState({ valid, message })
    },
    onChange(event) {
        this.validateInput(event)
        this.props.onChange(event)
    },
    onBlur(event) {
        this.validateInput(event)
        this.props.onBlur(event)
    },
    validate(data) {
        let valid = true
        let message = ""

        for(var i = 0; i < this.props.rules.length; i++) {
            var rule = this.props.rules[i];

            let items = rule.split(':')
            let method = items[0]

            items.splice(0, 1)

            let v = Validator.validate(method, data, items)
            if ( ! v.valid) {
                return {
                    valid: v.valid,
                    message: v.message
                }
            }
        }

        return { valid, message }
    },
    render() {
        let { valid, message } = this.state
        let { children, validClass, inValidClass } = this.props
        let input = children

        if (this.props.validate) {
            input = React.addons.cloneWithProps(input, {
                className: valid ? validClass : inValidClass,
                onBlur: this.onBlur,
                onChange: this.onChange
            })
        } else {
            input = React.addons.cloneWithProps(input, {
                onBlur: this.props.onBlur,
                onChange: this.props.onChange
            })
        }

        return (
            <div>
                {input}
                { ! valid ? (
                    <span style={{
                        color: "#F44336",
                        fontSize: 12
                    }}>{message}</span>
                ) : (
                    <span>&nbsp;</span>
                )}
            </div>
        )
    }
})

export default Validation

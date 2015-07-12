import React from 'react/addons'

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
    render() {
        var { label } = this.props

        return (
            <div>
                <input {...this.props} onChange={this.changeValue} onBlur={this.check}/>
                <label className={this.state.open ? 'active' : ''}>{label}</label>
            </div>
        )
    }
})

export default MaterialInput

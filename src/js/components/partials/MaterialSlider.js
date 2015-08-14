import React, { PropTypes } from 'react'

var MaterialSlider = React.createClass({
    propTypes: {
        min: PropTypes.number,
        max: PropTypes.number,
        current: PropTypes.number,
        step: PropTypes.number,
        onChange: PropTypes.func,
    },
    getInitialState() {
        return {
            value: this.props.min
        }
    },
    getDefaultProps() {
        return {
            min: 0,
            max: 100,
            current: 0,
            step: 1,
            onChange: () => {},
            onDone: () => {}
        }
    },
    setValue(e) {
        this.setState({
            value: e.target.value
        })

        this.props.onChange(e.target.value)
    },
    done() {
        this.props.onDone(this.state.value)
    },
    render() {
        return (
            <div>
                <p className="range-field" style={{position: 'relative'}}>
                    <input
                        defaultValue={this.props.current}
                        max={this.props.max}
                        min={this.props.min}
                        onChange={this.setValue}
                        step={this.props.step}
                        type="range"
                        onMouseUp={this.done}
                    />
                </p>
            </div>
        )
    }
})

export default MaterialSlider

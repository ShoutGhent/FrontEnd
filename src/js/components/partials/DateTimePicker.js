import React from 'react'
import { Grid, Cell } from '../grid/Grid'
import MaterialInput from '../partials/MaterialInput'
import moment from 'moment'

var DateTimePicker = React.createClass({
    propTypes: {
        time: React.PropTypes.string,
        date: React.PropTypes.string
    },
    getInitialState() {
        return {
            date: this.props.date || moment().format("YYYY-MM-DD"),
            time: this.props.time || moment().format("HH:mm")
        }
    },
    setDate(event) {
        this.setState({
            date: event.target.value
        })

        this.onChange({
            date: event.target.value,
            time: this.state.time
        })
    },
    setTime(event) {
        this.setState({
            time: event.target.value
        })

        this.onChange({
            time: event.target.value,
            date: this.state.date
        })
    },
    onChange(data) {
        let { date, time } = data

        this.props.onChange({ date, time })
    },
    render() {
        let { date, time } = this.state

        return (
            <Grid>
                <Cell width={1/2}>
                    <MaterialInput label="Datum" type="date" value={date} onChange={this.setDate}/>
                </Cell>
                <Cell width={1/2}>
                    <MaterialInput label="Tijd" type="time" value={time} onChange={this.setTime}/>
                </Cell>
            </Grid>
        )
    }
})

export default DateTimePicker

import React from 'react'
import { Grid, Cell } from '../grid/Grid'
import MaterialInput from '../partials/MaterialInput'
import moment from 'moment'

var DateTimePicker = React.createClass({
    propTypes: {
        time: React.PropTypes.string,
        date: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired
    },
    getDefaultProps() {
        return {
            date: moment().format("YYYY-MM-DD"),
            time: moment().format("HH:mm")
        }
    },
    changeDate(event) {
        this.props.onChange({
            date: event.target.value,
            time: this.props.time
        })
    },
    changeTime(event) {
        this.props.onChange({
            date: this.props.date,
            time: event.target.value
        })
    },
    render() {
        let { date, time } = this.props

        return (
            <Grid>
                <Cell width={1/2}>
                    <MaterialInput label="Datum" type="date" value={date} onChange={this.changeDate}/>
                </Cell>
                <Cell width={1/2}>
                    <MaterialInput label="Tijd" type="time" value={time} onChange={this.changeTime}/>
                </Cell>
            </Grid>
        )
    }
})

export default DateTimePicker

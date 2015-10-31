import React, { PropTypes } from 'react'

import Input from 'forms/material/MaterialInput'
import moment from 'moment'
import { Grid, Cell } from 'Grid'

var DateTimePicker = React.createClass({
    propTypes: {
        time: PropTypes.string,
        date: PropTypes.string,
        onChange: PropTypes.func.isRequired
    },
    getDefaultProps() {
        return {
            date: moment().format("YYYY-MM-DD"),
            time: moment().format("HH:mm:ss")
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
                    <Input
                        label="Datum"
                        type="date"
                        value={date}
                        onChange={this.changeDate}
                    />
                </Cell>
                <Cell width={1/2}>
                    <Input
                        label="Tijd"
                        type="time"
                        value={time}
                        onChange={this.changeTime}
                    />
                </Cell>
            </Grid>
        )
    }
})

export default DateTimePicker

import React from 'react'
import ApiActions from '../../actions/ApiActions'
import Shout from './Shout'

var ShoutList = React.createClass({
    getInitialState() {
        return {
            shouts: []
        }
    },
    componentWillMount() {
        ApiActions.get('shouts', {}, (data) => {
            this.setState({
                shouts: data
            })
        })
    },
    render() {
        return (
            <div>
            {this.state.shouts.map((shout) =>
                <Shout key={shout.uuid} shout={shout}/>
            )}
            </div>
        )
    }
})

export default ShoutList


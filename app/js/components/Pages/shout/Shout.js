import React from 'react'
import Shout from '../../shout/Shout'
import API from '../../../services/API'

let ShoutPage = React.createClass({
    getInitialState() {
        return {
            shout: null
        }
    },
    componentDidMount() {
        let { shoutId } = this.props.params

        API.get(`shouts/${shoutId}`, {}, (res, err) => {
            if ( ! err) {
                if (this.isMounted()) {
                    this.setState({
                        shout: res
                    })
                }
            }
        })
    },
    render() {
        let { shout } = this.state

        return (
            <div className="container">
            {shout ? (
                <Shout key={shout.uuid} shout={shout}/>
            ) : (
                <span></span>
            )}
            </div>
        )
    }
})

export default ShoutPage

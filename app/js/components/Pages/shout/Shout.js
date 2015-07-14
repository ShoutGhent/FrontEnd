import React from 'react'
import Shout from '../../shout/Shout'
import API from '../../../services/API'
import { Link } from 'react-router'

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
    removeShout() {
        this.setState({
            shout: null
        })
    },
    render() {
        let { shout } = this.state

        return (
            <div className="container">
            {shout ? (
                <Shout key={shout.uuid} shout={shout} onRemove={this.removeShout}/>
            ) : (
                <div>
                    <h3>Shout bestaat niet meer...</h3>
                    <Link to="home" className="btn btn-large">Ga Terug</Link>
                </div>
            )}
            </div>
        )
    }
})

export default ShoutPage

import React from 'react'
import Shout from '../../shout/Shout'
import API from '../../../services/API'
import { Link } from 'react-router'
import WebStorage from '../../../services/WebStorage'
import Loading from '../../loading/Loading'

let ShoutPage = React.createClass({
    getInitialState() {
        return {
            shout: null,
            loading: true
        }
    },
    componentDidMount() {
        let { shoutId } = this.props.params

        API.get(`shouts/${shoutId}`, {}, (shout, err) => {
            if ( ! err) {
                if (this.isMounted()) {
                    let loading = false
                    this.setState({ shout, loading })
                }
            }
        })
    },
    removeShout() {
        if (this.state.shout.user.uuid != WebStorage.fromStore('user', { user: { uuid: null }}).uuid) {
            let shout = null

            this.setState({ shout })
        }
    },
    render() {
        let { shout, loading } = this.state

        return (
            <div className="container">
            {loading ? (
                <Loading />
            ) : (
                shout ? (
                    <Shout key={shout.uuid} shout={shout} onRemove={this.removeShout}/>
                ) : (
                    <div>
                        <h3>Shout bestaat niet meer...</h3>
                        <Link to="home" className="btn btn-large">Ga Terug</Link>
                    </div>
                )
            )}
            </div>
        )
    }
})

export default ShoutPage

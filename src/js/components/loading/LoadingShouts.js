import React from 'react'
import Avatar from '../users/Avatar'
import Icon from '../partials/Icon'

var LoadingShouts = React.createClass({
    render() {
        let shouts = [0, 1] // 2 'loading' shouts
        return (
            <div>
            {shouts.map((shout) => {
                let key = `loading_shout_${shout}`
                let min = 35
                let max = 80

                let width = Math.floor(Math.random() * (max - min + 1)) + min

                return (<div key={key} className="card shout">
                    <div className="card-content black-text">
                        <div className="card-title black-text">
                            <a href="#">
                                <Avatar email="email" size={35}/>
                            </a>
                            loading...
                            <div className="right">
                                <div className="more">
                                    <Icon icon="more_vert"/>
                                </div>
                            </div>
                        </div>
                        <p>loading...</p>
                    </div>
                    <div className="card-action">
                        <div className="card-action-box">
                            <a href="#" className="right"><Icon icon="grade"/></a>
                        </div>
                    </div>
                    <div className="shout-progress">
                        <div className="progress">
                            <div className="determinate" style={{width}}></div>
                        </div>
                    </div>
                </div>)
            })}
            </div>
        )
    }
})

export default LoadingShouts

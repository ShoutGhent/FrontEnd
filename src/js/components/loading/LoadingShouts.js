import React from 'react'
import Avatar from '../users/Avatar'
import Icon from '../partials/Icon'

var LoadingShouts = React.createClass({
    merge(obj1, obj2) {
        var obj3 = {}
        for (var attrname in obj1) { obj3[attrname] = obj1[attrname] }
        for (var attrname in obj2) { obj3[attrname] = obj2[attrname] }
        return obj3
    },
    getLineCss(optional) {
        return this.merge({
            backgroundColor: 'whitesmoke',
            height: 8,
            marginBottom: 10
        }, optional)
    },
    render() {
        let min = 35
        let max = 80

        let width = `${Math.floor(Math.random() * (max - min + 1)) + min}%`

        return (
            <div className="card shout">
                <div className="card-content black-text">
                    <div className="card-title black-text">
                        <a href="#">
                            <Avatar email="email" size={35}/>
                        </a>
                        <span style={this.getLineCss({
                            width: 100,
                            display: 'inline-block',
                            verticalAlign: 'middle',
                            marginTop: 8,
                            height: 20
                        })}>&nbsp;</span>
                        <div className="right">
                            <div className="more">
                                <Icon icon="more_vert"/>
                            </div>
                        </div>
                    </div>
                    <p>
                        <ul>
                            <li style={this.getLineCss({width: `${Math.floor(Math.random() * (max - min + 1)) + min}%`})}></li>
                            <li style={this.getLineCss({width: `${Math.floor(Math.random() * (max - min + 1)) + min}%`})}></li>
                            <li style={this.getLineCss({width: `${Math.floor(Math.random() * (max - min + 1)) + min}%`})}></li>
                        </ul>
                    </p>
                </div>
                <div className="shout-progress">
                    <div className="progress">
                        <div className="determinate" style={{width}}></div>
                    </div>
                </div>
            </div>
        )
    }
})

export default LoadingShouts

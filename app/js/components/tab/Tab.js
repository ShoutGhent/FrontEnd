import React from 'react/addons'
import { Grid, Cell } from '../grid/Grid'

let Tab = React.createClass({
    getInitialState() {
        return {
            activePosition: 0,
            activePanel: this.props.children[0]
        }
    },
    makeActive(child, index, event) {
        event.preventDefault()
        this.setState({
            activePosition: index,
            activePanel: child
        })
    },
    render() {
        let panelHeaders = []

        let css = {
            width: `${100 / this.props.children.length}%`
        }

        let manipulatedChildren = React.Children.map(this.props.children, (child, index) => {
            panelHeaders.push(<li key={child.props.title} className="tab col" style={css}><a href={true} onClick={this.makeActive.bind(this, child, index)}>{child.props.title}</a></li>)

            var active = false
            if (this.state.activePanel.props.title == child.props.title) {
                active = true
            }

            child = React.addons.cloneWithProps(child, {
                isActive: active
            })

            return child
        })

        var indicatorCss = {
            width: `${100 / this.props.children.length}%`,
            left: `${(100 / this.props.children.length) * this.state.activePosition}%`,
            transition: 'left .3s ease-in-out'
        }

        return (
            <div>
                <ul className="tabs">
                    {panelHeaders}
                    <div className="indicator" style={indicatorCss}></div>
                </ul>
                {manipulatedChildren}
            </div>
        )
    }
})

let TabPanel = React.createClass({
    render() {
        var css = {
            display: this.props.isActive ? 'block' : 'none'
        }
        return (
            <div style={css}>
                {this.props.children}
            </div>
        )
    }
})

export default { Tab, TabPanel }

import React from 'react/addons'

import { Grid, Cell } from '../grid/Grid'

let Tab = React.createClass({
    getInitialState() {
        let { children } = this.props
        children = [].concat(children)

        return {
            activePosition: 0,
            activePanel: children[0]
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
        let { children } = this.props
        children = [].concat(children)

        let panelHeaders = []

        let css = {
            width: `${100 / children.length}%`
        }

        let manipulatedChildren = React.Children.map(children, (child, index) => {
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
            width: `${100 / children.length}%`,
            left: `${(100 / children.length) * this.state.activePosition}%`,
            transition: 'left .6s ease-in-out'
        }

        return (
            <div style={{marginTop: 18}}>
                <ul className="tabs">
                    {panelHeaders}
                    <div className="indicator" style={indicatorCss}></div>
                </ul>
                <div className="tabs-content">
                    {manipulatedChildren}
                </div>
            </div>
        )
    }
})

let TabPanel = React.createClass({
    render() {
        let { children } = this.props

        let css = {
            display: this.props.isActive ? 'block' : 'none'
        }

        return (
            <div style={css}>{children}</div>
        )
    }
})

export default { Tab, TabPanel }

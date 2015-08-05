import React from 'react'

var Loading = React.createClass({
    propTypes: {
        type: React.PropTypes.string
    },
    getDefaultProps() {
        return {
            type: 'indeterminate'
        }
    },
    render() {
        let { type } = this.props

        return (
            <div>
                {type == 'indeterminate' ? (
                    <div className="progress">
                        <div className="indeterminate"></div>
                    </div>
                ): ''}
                {type == 'circular' ? (
                    <div className="preloader-wrapper small active">
                        <div className="spinner-layer spinner-green-only">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div>
                            <div className="gap-patch">
                                <div className="circle"></div>
                            </div>

                            <div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                ) : ''}
            </div>
        )
    }
})

export default Loading

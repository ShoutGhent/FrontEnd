import React, { PropTypes } from 'react'

import EditImage from './EditImage'

var EditHeader = React.createClass({
    propTypes: {
        groupId: PropTypes.string.isRequired,
        isOpen: PropTypes.bool.isRequired,
        image: PropTypes.string.isRequired,
        onDone: PropTypes.func,
    },
    render() {
        let link = `groups/${this.props.groupId}/header`

        return (
            <EditImage
                image={this.props.image}
                isOpen={this.props.isOpen}
                link={link}
                onDone={this.props.onDone}
                ratio={21/9}
            />
        )
    }
})

export default EditHeader

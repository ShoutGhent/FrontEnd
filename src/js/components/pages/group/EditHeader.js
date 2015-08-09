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
                ratio={16/9}
                link={link}
                isOpen={this.props.isOpen}
                onDone={this.props.onDone}
                image={this.props.image}
            />
        )
    }
})

export default EditHeader

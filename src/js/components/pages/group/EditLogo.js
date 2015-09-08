import React, { PropTypes } from 'react'

import EditImage from './EditImage'

var EditLogo = React.createClass({
    propTypes: {
        groupId: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        isOpen: PropTypes.bool.isRequired,
        onDone: PropTypes.func,
    },
    render() {
        let link = `groups/${this.props.groupId}/logo`

        return (
            <EditImage
                image={this.props.image}
                isOpen={this.props.isOpen}
                link={link}
                onDone={this.props.onDone}
                ratio={1/1}
            />
        )
    }
})

export default EditLogo

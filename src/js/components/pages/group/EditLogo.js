import React, { PropTypes } from 'react'

import EditImage from './EditImage'

var EditLogo = React.createClass({
    propTypes: {
        groupId: PropTypes.string.isRequired,
        isOpen: PropTypes.bool.isRequired,
        image: PropTypes.string.isRequired,
        onDone: PropTypes.func,
    },
    render() {
        let link = `groups/${this.props.groupId}/logo`

        return (
            <EditImage
                ratio={1/1}
                link={link}
                isOpen={this.props.isOpen}
                onDone={this.props.onDone}
                image={this.props.image}
            />
        )
    }
})

export default EditLogo

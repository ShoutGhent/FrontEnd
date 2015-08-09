import React, { PropTypes } from 'react'

import API from '../../../services/API'
import GroupActions from './GroupActions'

var EditLogo = React.createClass({
    propTypes: {
        groupId: PropTypes.string.isRequired
    },
    upload(file) {
        let url = `groups/${this.props.groupId}/logo`

        API.postFile(url, {
            key: 'logo',
            value: file
        }, (res, err) => {
            GroupActions.setGroup(res)
        })
    },
    setImage(event) {
        let files = event.target.files
        let file = files[0]

        if (file) {
            this.upload(file)
        }
    },
    render() {
        return (
            <div>
                <input type="file" onChange={this.setImage}/>
            </div>
        )
    }
})

export default EditLogo

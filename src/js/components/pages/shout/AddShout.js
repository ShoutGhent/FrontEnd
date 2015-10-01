import React, { PropTypes } from 'react'

import API from '../../../services/API'
import NotificationActions from '../../notification/NotificationActions'
import ShoutForm from '../../shout/ShoutForm'
import { Card } from '../../card/Card'

var AddShout = React.createClass({
    propTypes: {
        onDone: PropTypes.func.isRequired,
        groupId: PropTypes.string.isRequired,
        updateShout: PropTypes.func.isRequired
    },
    getInitialState() {
        return {
            cleanShout: {
                description: '',
                anonymous: false,
                forever: true,
                publish_until: null,
                group_id: this.props.groupId,
            }
        }
    },
    addShout(shout, images) {
        API.post('shouts/add', shout, (res, err) => {
            this.done(res)
            NotificationActions.success("Je shout werd geplaatst!")

            NotificationActions.info("Je afbeeldingen worden geupload, ze komen er automatisch op!")

            images.map(image => {
                API.postFile(`shouts/${res.id}/image`, { key: 'image', value: image.file }, (res, err) => {
                    this.props.updateShout(res)
                })
            })
        })
    },
    done(shout) {
        if (shout) {
            this.props.onDone(shout)
        }

        this.setState({
            cleanShout: {
                description: '',
                anonymous: false,
                forever: true,
                publish_until: null,
                group_id: this.props.groupId,
            }
        })
    },
    render() {
        let { cleanShout } = this.state

        return (
            <ShoutForm
                buttonName="Shout!"
                hasCancelButton={false}
                onDone={this.done}
                onSave={this.addShout}
                shout={cleanShout}
            />
        )
    }
})

export default AddShout

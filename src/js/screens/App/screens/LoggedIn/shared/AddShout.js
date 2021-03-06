import React, { PropTypes } from 'react'

import API from 'API'
import NotificationActions from 'NotificationActions'
import ShoutForm from 'ShoutForm'
import { Card } from 'Card'

var AddShout = React.createClass({
    propTypes: {
        groupId: PropTypes.string,
        onDone: PropTypes.func.isRequired,
        updateShout: PropTypes.func.isRequired
    },
    getDefaultProps() {
        return {
            groupId: null
        }
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
            this.done()
            NotificationActions.success("Je shout werd geplaatst!")

            if (images.length > 0) {
                NotificationActions.info("Je afbeeldingen worden geupload, ze komen automatisch bij de shout!")
            }

            images.map(image => {
                API.postFile(`shouts/${res.id}/image`, { key: 'image', value: image.file }, (res, err) => {
                    this.props.updateShout(res)
                })
            })
        })
    },
    done() {
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

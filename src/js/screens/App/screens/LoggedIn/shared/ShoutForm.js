import React, { PropTypes } from 'react/addons'

import DateTimePicker from 'DateTimePicker'
import FileDrop from "react-file-drop"
import Icon from 'Icon'
import moment from 'moment'
import { Button, Textarea } from 'forms/material/Material'
import { Grid, Cell } from 'Grid'

var ShoutForm = React.createClass({
    propTypes: {
        buttonName: PropTypes.string.isRequired,
        hasCancelButton: PropTypes.bool,
        onDone: PropTypes.func.isRequired,
        onSave: PropTypes.func.isRequired,
        shout: PropTypes.object.isRequired,
        valid: PropTypes.bool,
    },
    getInitialState() {
        var { shout } = this.props

        return {
            shout: JSON.parse(JSON.stringify(shout)),
            descriptionIsValid: this.props.valid,
            uploadedImages: [],
            showUploadImages: false
        }
    },
    getDefaultProps() {
        return {
            valid: false,
            hasCancelButton: true
        }
    },
    setDescription(event) {
        var shout = this.state.shout

        shout.description = event.target.value

        this.setState({ shout })
    },
    setAnonymous(event) {
        var shout = this.state.shout

        shout.anonymous = event.target.checked

        this.setState({ shout })
    },
    setForever(event) {
        var shout = this.state.shout

        shout.forever = event.target.checked

        if (shout.forever) {
            shout.publish_until = null
        }

        this.setState({ shout })
    },
    setPublishUntil(data) {
        var { date, time } = data

        var shout = this.state.shout

        shout.publish_until = moment(`${date} ${time}`).format("YYYY-MM-DD HH:mm:ss")

        this.setState({ shout })
    },
    validateDescription(result) {
        this.setState({ descriptionIsValid: result })
    },
    save(event) {
        event.preventDefault()

        this.props.onSave(this.state.shout, this.state.uploadedImages)
        this.setState(this.getInitialState())
    },
    cancel(event) {
        event.preventDefault()
        this.props.onDone()
    },
    isAllowedImage(file) {
        let valids = ['image/jpeg', 'image/png']

        for(var i = 0; i < valids.length; i++) {
            if (valids[i] == file.type) {
                return true
            }
        }

        return false
    },
    uploadImages(files, event) {
        for(var i = 0; i < files.length; i++) {
            let file = files.item(i)

            if (this.isAllowedImage(file)) {
                let reader = new FileReader()

                reader.onload = (e) => {
                    let { uploadedImages } = this.state

                    uploadedImages.push({
                        file: file,
                        preview: reader.result
                    })

                    this.setState({ uploadedImages })
                }

                reader.readAsDataURL(file)
            }
        }
    },
    showUploadImages(event) {
        event.preventDefault()

        this.setState({ showUploadImages: ! this.state.showUploadImages })
    },
    render() {
        var { shout, descriptionIsValid } = this.state
        var { buttonName, hasCancelButton } = this.props

        var { anonymous, forever, description } = shout

        var date = moment(shout.publish_until || moment()).format('YYYY-MM-DD')
        var time = moment(shout.publish_until || moment()).format('HH:mm')

        var isValid = descriptionIsValid

        let checkboxStyle = {
            height: 36,
            lineHeight: '36px',
            verticalAlign: 'middle'
        }

        return (
            <div style={{position: 'relative'}}>
                <FileDrop
                    targetAlwaysVisible={this.state.showUploadImages}
                    onDrop={this.uploadImages}
                >
                    <span>Sleep hier afbeelding(en) naartoe</span>
                </FileDrop>

            {this.state.showUploadImages && (
                <Button right zIndex="4" flat onClick={this.showUploadImages} padding="0 1rem">
                    <Icon icon="close"/>
                </Button>
            )}

                <form onSubmit={this.save}>
                    <div>
                        <Grid>
                            <Cell>
                                <Textarea
                                    rules={['required', 'min:3']}
                                    onValidate={this.validateDescription}
                                    placeholder="Wat wil je shouten?"
                                    className="materialize-textarea"
                                    value={description}
                                    onChange={this.setDescription}
                                />
                                <Button right flat onClick={this.showUploadImages} padding="0 1rem">
                                    <Icon icon="panorama"/>
                                </Button>
                            </Cell>
                        </Grid>

                        { ! forever && (
                            <DateTimePicker onChange={this.setPublishUntil} date={date} time={time}/>
                        )}

                        <ul style={{display: 'inline-block', margin: 10}}>
                        {this.state.uploadedImages.map((image, key) => (
                            <a target="_blank" href={image.preview}>
                                <li style={{display: 'inline-block', margin: '0 3px'}}>
                                    <img src={image.preview} style={{width: 65, height: 65, cursor: 'pointer' }}/>
                                </li>
                            </a>
                        ))}
                        </ul>

                        <Grid>
                            <Cell width={3/12}>
                                <div style={checkboxStyle}>
                                    <input type="checkbox" id={`anonymous.shout.${shout.id || 'add'}`} checked={anonymous} onChange={this.setAnonymous} />
                                    <label htmlFor={`anonymous.shout.${shout.id || 'add'}`}>Anoniem</label>
                                </div>
                            </Cell>
                            <Cell width={3/12}>
                                <div style={checkboxStyle}>
                                    <input type="checkbox" id={`forever.shout.${shout.id || 'add'}`} checked={forever} onChange={this.setForever} />
                                    <label htmlFor={`forever.shout.${shout.id || 'add'}`}>Voor altijd tonen</label>
                                </div>
                            </Cell>
                            <Cell width={6/12}>
                                <div className="right">
                                    {hasCancelButton && (
                                        <Button flat onClick={this.cancel}>Annuleren</Button>
                                    )}
                                    <Button disabled={ ! isValid}>{buttonName}</Button>
                                </div>
                            </Cell>
                        </Grid>
                    </div>
                </form>
            </div>
        )
    }
})

export default ShoutForm

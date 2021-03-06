import React, { PropTypes } from 'react'

import API from 'API'
import Icon from 'Icon'
import Loading from 'Loading'
import { Button } from 'forms/material/Material'
import { Card, CardContent } from 'Card'
import { Grid, Cell } from 'Grid'
import { Modal, ModalContent, ModalFooter } from 'Modal'

var JoinInitialGroupModal = React.createClass({
    propTypes: {
        onDone: PropTypes.func.isRequired
    },
    getInitialState() {
        return {
            open: true,
            loading: true,
            groups: [],
            selected: []
        }
    },
    componentWillMount() {
        API.get('groups/initial', {}, (response, err) => {
            if ( ! err) {
                this.setState({
                    groups: response.data,
                    loading: false
                })
            }
        })
    },
    select(event, group) {
        let selected = this.state.selected
        let inGroup = false

        for (var i = 0; i < selected.length; i++) {
            if (selected[i].id == group.id) {
                selected.splice(i, 1)
                inGroup = true
            }
        }

        if ( ! inGroup) {
            selected.push(group)
        }

        this.setState({ selected })
    },
    joinGroups() {
        this.state.selected.map((group) => {
            API.post('groups/join', { group_id: group.id }, (response, err) => {
                if ( ! err) {
                    this.setState({
                        open: false
                    })
                    this.props.onDone()
                }
            })
        })
    },
    render() {
        let { groups, open, loading, selected } = this.state

        groups = groups.sort((prev, next) => {
            let first = [prev.name, next.name].sort()[0]

            if (first == prev.name) {
                return -1;
            } else if(first == next.name) {
                return 1;
            }

            return 0;
        })

        return (
            <Modal isOpen={open}>
                <ModalContent>
                    <h4>Ga bij een groep!</h4>
                    <Grid>
                    {groups.map((group) => {
                        let cardCss = {
                            cursor: 'pointer'
                        }

                        let inGroup = false

                        for (var i = 0; i < selected.length; i++) {
                            if (selected[i].id == group.id) {
                                inGroup = true
                            }
                        }

                        return (<Cell key={group.id} width={4/12}>
                            <Card onClick={(event) => { this.select(event, group)}} style={cardCss}>
                                <CardContent>
                                    {inGroup ? (
                                        <Icon icon="check" style={{
                                            color: 'green',
                                            position: 'absolute',
                                            right: -10,
                                            top: -14
                                        }}/>
                                    ) : ''}
                                    {group.name}
                                </CardContent>
                            </Card>
                        </Cell>)
                    })}
                    </Grid>
                    {loading ? <Loading/> : ''}
                </ModalContent>
                <ModalFooter>
                    <Button disabled={true} right flat>{selected.length} geselecteerd</Button>
                    <Button disabled={selected.length == 0} onClick={this.joinGroups} right>Lid Worden</Button>
                </ModalFooter>
            </Modal>
        )
    }
})

export default JoinInitialGroupModal

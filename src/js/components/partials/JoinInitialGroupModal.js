import React from 'react'

import API from '../../services/API'
import Icon from '../partials/Icon'
import Loading from '../loading/Loading'
import { Card, CardContent } from '../card/Card'
import { Grid, Cell } from '../grid/Grid'
import { Modal, ModalContent, ModalFooter } from '../modal/Modal'

var JoinInitialGroupModal = React.createClass({
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
                                            top: -14,
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
                    <button style={{float: 'left'}} disabled={true} className="btn-flat">{selected.length} geselecteerd</button>
                    <button style={{float: 'right'}} disabled={selected.length == 0} className="waves-effect waves-green btn" onClick={this.joinGroups}>Join groepen</button>
                </ModalFooter>
            </Modal>
        )
    }
})

export default JoinInitialGroupModal

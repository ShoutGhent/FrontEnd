import React from 'react'

import Cloudinary from '../partials/Cloudinary'
import GroupActions from '../pages/group/GroupActions'
import Icon from '../partials/Icon'
import Redirect from '../../services/Redirect'
import SearchActions from './SearchActions'
import SearchStore from './SearchStore'
import { Collection, CollectionItem } from '../collection/Collection'
import { Grid, Cell } from '../grid/Grid'
import { Link } from 'react-router'

let SearchBar = React.createClass({
    getInitialState() {
        return SearchStore.getState()
    },
    componentDidMount() {
        SearchStore.listen(this._onChange)
    },
    componentWillUnmount() {
        SearchStore.unlisten(this._onChange)
    },
    _onChange(state) {
        this.setState(state)

        if ( ! this.state.isOpen) {
            this.refs.search.getDOMNode().focus()
        }
    },
    updateSearchText(event) {
        SearchActions.updateSearchText(event.target.value)
    },
    handleKeyboard(event) {
        if (event.keyCode == 27) { // Escape key
            SearchActions.closeSearch()
            SearchActions.resetResults()
        }
    },
    closeMe() {
        SearchActions.closeSearch()

        setTimeout(() => {
            SearchActions.resetResults()
        }, 200)
    },
    goToGroup(group) {
        SearchActions.closeSearch()

        Redirect.to('group', {
            groupId: group.id,
            tabId: 'shouts'
        })

        GroupActions.fetchGroupInformation(group.id)
        SearchActions.resetResults()
    },
    render() {
        let css = {
            border: 'none',
            height: 40,
            width: '100%',
            padding: '5px 10px',
            outline: 'none',
            backgroundColor: 'transparent'
        }

        let wrapStyles = {
            position: 'relative',
            transition: 'height .3s ease-in-out',
            height: this.state.isOpen ? 40 : 0
        }

        let position = {
            backgroundColor: 'white',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 0
        }

        let resultStyles = {
            position: 'fixed',
            zIndex: 2,
            left: 0,
            right: 0,
            top: 40,
            display: this.state.results.length > 0 ? 'block' : 'none'
        }

        return (
            <div style={wrapStyles} onBlur={this.closeMe}>
                <div style={position}>
                    <div className="container">
                        <input
                            style={css}
                            name="search"
                            ref="search"
                            value={this.state.searchText}
                            onChange={this.updateSearchText}
                            onKeyDown={this.handleKeyboard}
                            placeholder="Zoeken..."
                        />
                    </div>
                </div>
                <div style={resultStyles}>
                    <div className="container" style={{padding: 10, backgroundColor: 'white', border: '1px solid #ccc'}}>
                        <Collection>
                        {this.state.results.map((group) => {
                            return (
                                <CollectionItem key={group.id}>
                                    <div onClick={(event) => { this.goToGroup(group) }} style={{cursor: 'pointer'}}>
                                        <Grid>
                                            <Cell width={1/12}>
                                                <Cloudinary
                                                    image={group.logo_data}
                                                    options={{ width: 40, height: 40 }}
                                                />
                                            </Cell>
                                            <Cell width={11/12}>
                                            {group.name} <br/>
                                                <span style={{color: '#aaa'}}>{group.meta.member_count} {group.meta.member_count == 1 ? 'lid' : 'leden'}</span>
                                                <span style={{color: '#aaa', float: 'right'}}>Ik ben {group.meta.in_group ? '' : 'geen'} lid</span>
                                            </Cell>
                                        </Grid>
                                    </div>
                                </CollectionItem>
                            )
                        })}
                        </Collection>
                    </div>
                </div>
            </div>
        )
    }
})

export default SearchBar


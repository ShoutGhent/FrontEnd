import React from 'react'
import Icon from '../partials/Icon'
import SearchStore from './SearchStore'
import SearchActions from './SearchActions'

function getStateFromStore() {
    return SearchStore.getState()
}

var SearchBar = React.createClass({
    getInitialState() {
        return getStateFromStore()
    },
    componentDidMount() {
        SearchStore.listen(this._onChange)
    },
    componentWillUnmount() {
        SearchStore.unlisten(this._onChange)
    },
    _onChange() {
        this.setState(getStateFromStore())

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
        }
    },
    render() {
        var css = {
            border: 'none',
            height: '40px',
            width: '100%',
            padding: '5px 10px',
            outline: 'none'
        }

        var wrapStyles = {
            overflow: 'hidden',
            transition: 'height .3s ease-in-out',
            height: this.state.isOpen ? '40px' : '0'
        }

        return (
            <div style={wrapStyles}>
                <input style={css} name="search" ref="search" value={this.state.searchText} onChange={this.updateSearchText} onKeyDown={this.handleKeyboard} placeholder="Zoeken..." />
            </div>
        )
    }
})

export default SearchBar


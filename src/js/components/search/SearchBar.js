import React from 'react'
import Icon from '../partials/Icon'
import SearchStore from './SearchStore'
import SearchActions from './SearchActions'

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
        }
    },
    render() {
        let css = {
            border: 'none',
            height: 40,
            width: '100%',
            padding: '5px 10px',
            outline: 'none'
        }

        let wrapStyles = {
            overflow: 'hidden',
            transition: 'height .3s ease-in-out',
            height: this.state.isOpen ? 40 : 0
        }

        return (
            <div style={wrapStyles}>
                <input style={css} name="search" ref="search" value={this.state.searchText} onChange={this.updateSearchText} onKeyDown={this.handleKeyboard} placeholder="Zoeken..." />
            </div>
        )
    }
})

export default SearchBar

import alt from '../../../alt'
import DropdownActions from './DropdownActions'

class DropdownStore {
    constructor() {
        this.dropdowns = []
        this.bindActions(DropdownActions)
    }
    onToggle(dropdown_id) {
        this.dropdowns.forEach((item, key) => {
            if (item.key != dropdown_id) {
                this.dropdowns[key].isOpen = false
            } else {
                this.dropdowns[key].isOpen = ! item.isOpen
            }
        })
    }
    onRegister(key) {
        this.dropdowns.push({
            key: key,
            isOpen: false
        })
    }
    onUnRegister(dropdown_id) {
        this.dropdowns.forEach((item, key) => {
            if (item.key == dropdown_id) {
                this.dropdowns.splice(key, 1)
            }
        })
    }
}

export default alt.createStore(DropdownStore)

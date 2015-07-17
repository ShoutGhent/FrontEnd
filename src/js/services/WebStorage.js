class WebStorage {
    _storage() {
        return localStorage
    }
    fromStore(key, defaultValue) {
        let data = this._storage().getItem(key)

        if (data) {
            return JSON.parse(data) || defaultValue
        }

        return defaultValue
    }
    toStore(key, value) {
        this._storage().setItem(key, JSON.stringify(value))
    }
    remove(key) {
        this._storage().removeItem(key)
    }
}

let store = new WebStorage()

export default {
    fromStore: (key, defaultValue) =>  store.fromStore(key, defaultValue),
    toStore: (key, value) => store.toStore(key, value),
    remove: (key) => store.remove(key)
}

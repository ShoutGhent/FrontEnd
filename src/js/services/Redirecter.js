import RouterContainer from "./RouterContainer"

class Redirecter {
    to(path, data) {
        setImmediate(() => {
            console.log(path, data)
            RouterContainer.get().transitionTo(path, data || {})
        })
    }

    toNext() {
        setImmediate(() => {
            RouterContainer.get().transitionTo(
                RouterContainer.get().getCurrentQuery().nextPath || '/'
            )
        })
    }
}

export default new Redirecter

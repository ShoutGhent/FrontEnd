import RouterContainer from "./RouterContainer"

class Redirect {
    to(path, data) {
        setImmediate(() => {
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

export default new Redirect

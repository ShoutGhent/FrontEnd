import RouterContainer from "./RouterContainer"
//import setImmediate from "setimmediate"

class Redirect {
    to(path, data) {
        setTimeout(() => {
            RouterContainer.get().transitionTo(path, data || {})
        })
    }

    toNext() {
        setTimeout(() => {
            RouterContainer.get().transitionTo(
                RouterContainer.get().getCurrentQuery().nextPath || '/'
            )
        })
    }
}

export default new Redirect

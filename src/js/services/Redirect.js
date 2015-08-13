import RouterContainer from "./RouterContainer"

class Redirect {
    to(path, data) {
        setTimeout(() => {
            RouterContainer.get().transitionTo(path, data || {})
        })
    }

    replaceWith(path, data) {
        setTimeout(() => {
            RouterContainer.get().replaceWith(path, data || {})
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

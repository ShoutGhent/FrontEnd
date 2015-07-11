var AuthenticatedRoute = {
    statics: {
        willTransitionTo: (transition) => {
            if ( ! false) {
                var attemptedTransition = transition
                transition.redirect('login')
            }
        }
    }
}

export default AuthenticatedRoute

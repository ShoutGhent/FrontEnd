import Alt from 'alt'

var alt = new Alt()

alt.dispatcher.register(console.log.bind(console))

export default alt

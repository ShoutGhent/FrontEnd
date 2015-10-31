import Alt from 'alt'

var ShoutAlt = new Alt()

ShoutAlt.dispatcher.register(console.log.bind(console))

export default ShoutAlt

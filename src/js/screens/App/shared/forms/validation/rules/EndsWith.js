import Rule from '../ValidationRule'

class EndsWith extends Rule {
    init() {
        super.setName("endsWith")
        super.setMessage("Het veld moet eindigen met :ending")
    }
    validate(text, options) {
        text = text.trim()
        let passes = false

        options.map((suffix) => {
            if (text.indexOf(suffix, text.length - suffix.length) !== -1) {
                passes = true
            }
        })

        var ending = options.join(', ')

        if (options.length > 1) {
            let last = options[options.length - 1]
            ending = options.slice(0, -1).join(', ') + ' of ' + last
        }

        return super.getResult(passes, [
            { key: 'ending', value: ending }
        ])
    }
}

export default new EndsWith

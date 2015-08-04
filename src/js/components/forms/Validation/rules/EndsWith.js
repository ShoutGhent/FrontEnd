import Rule from '../Rule'

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

        return super.getResult(passes, [
            { key: 'ending', value: options.join(', ') }
        ])
    }
}

export default new EndsWith

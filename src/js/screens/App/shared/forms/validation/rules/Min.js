import Rule from '../ValidationRule'

class Min extends Rule {
    init() {
        super.setName("min")
        super.setMessage("Het veld moet minstens :min characters bevatten")
    }
    validate(text, options) {
        text = text.trim()
        let passes = text.length >= options[0]

        return super.getResult(passes, [
            { key: 'min', value: options[0] }
        ])
    }
}

export default new Min

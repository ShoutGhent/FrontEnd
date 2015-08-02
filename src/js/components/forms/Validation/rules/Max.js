import Rule from '../Rule'

class Max extends Rule {
    init() {
        super.setName("min")
        super.setMessage("Het veld mag maximum :max characters bevatten")
    }
    validate(text, options) {
        let passes = text.length <= options[0]

        return super.getResult(passes, [
            { key: 'max', value: options[0] }
        ])
    }
}

export default new Max

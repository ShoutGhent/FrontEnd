import Max from './rules/Max'
import Min from './rules/Min'
import Required from './rules/Required'

class Validator {
    constructor() {
        this.rules = []
    }

    register(rule) {
        rule.init()

        this.rules.push(rule)
    }

    validate(method, text, options) {
        let result = null

        this.rules.map((rule) => {
            if (rule.name == method) {
                result = rule.validate(text, options)
            }
        })

        return result
    }
}

let validator = new Validator()

validator.register(Max)
validator.register(Min)
validator.register(Required)

export default validator

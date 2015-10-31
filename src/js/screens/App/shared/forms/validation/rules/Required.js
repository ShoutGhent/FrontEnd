import Rule from '../ValidationRule'

class Required extends Rule {
    init() {
        super.setName("required")
        super.setMessage("Het veld moet ingevuld zijn")
    }
    validate(text, options) {
        let trimmed = text.trim()
        let passes = ! (trimmed == "" || trimmed == null)

        return super.getResult(passes)
    }
}

export default new Required

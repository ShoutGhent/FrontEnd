import Rule from '../ValidationRule'

class Email extends Rule {
    init() {
        super.setName("email")
        super.setMessage("Geen geldig e-mail adres")
    }
    validate(text, options) {
        let passes = text.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

        return super.getResult(passes)
    }
}

export default new Email

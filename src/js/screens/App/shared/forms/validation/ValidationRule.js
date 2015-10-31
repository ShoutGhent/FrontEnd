class ValidationRule {
    setName(name) {
        this.name = name
    }

    setMessage(message) {
        this.message = message
    }

    getResult(pass, replacements) {
        let message = this.message

        if (replacements) {
            replacements.map((item) => {
                message = message.replace(`:${item.key}`, item.value)
            })
        }

        return {
            valid: pass,
            message: message
        }
    }
}

export default ValidationRule

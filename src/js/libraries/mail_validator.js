export let MailValidator = {
  EMAIL_PATTERN: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  validateEmail: (email) => {
    if (email.trim() === '') return true
    let validated = MailValidator.EMAIL_PATTERN.test(email)
    return validated
  }
}

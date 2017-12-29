
export let MailChecker = {
  isAllowedIn: function (text, character, position) {
    if (text.includes('@') && character === '@') {
      return null
    }
    let thePattern = this.selectPattern(text, position)
    let isAllowed = this.matches(thePattern, character)
    return isAllowed
  },

  matches: function (pattern, character) {
    let matcher = new RegExp(pattern)
    let result = matcher.exec(character)
    return result
  },

  selectPattern: function (text, position) {
    let patterns = {
      local: /[@!#$%&'*+/=?^_`{|}~.-]|[a-z]|[0-9]/ig,
      domain: /[.-]|[a-z]|[0-9]/ig
    }
    let result = patterns.local
    let positionOfAt = text.indexOf('@')
    if (text.includes('@') && positionOfAt < position) result = patterns.domain
    return result
  }
}

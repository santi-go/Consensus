export let Service = {

  isEnterKey: function (e) {
    if (e.keyCode === 13) { return true }
    return false
  },

  isCommaKey: function (e) {
    if (e.keyCode === 188) { return true }
    return false
  },

  isBackSpaceKey: function (e) {
    if (e.keyCode === 8) { return true }
    return false
  },

  isTabKey: function (e) {
    if (e.keyCode === 9) { return true }
    return false
  },

  isDotKey: function (e) {
    if (e.keyCode === 190) { return true }
    return false
  }
}

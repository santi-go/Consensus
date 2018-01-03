export let Service = {

  isEnterKey: function (e) {
    if (e.keyCode === 13 || e.charCode === 13) { return true }
    return false
  },

  isCommaKey: function (e) {
    if (e.keyCode === 44 || e.charCode === 44) { return true }
    return false
  }
}

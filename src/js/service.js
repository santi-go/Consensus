export class Service {
  constructor(){}

  isEnterKey(e) {
    if (e.keyCode === 13) { return true }
    return false
  }

  isCommaKey(e) {
    if (e.keyCode === 188) { return true }
    return false
  }

  isBackSpaceKey(e) {
    if (e.keyCode === 8) { return true }
    return false
  }

  isTabKey(e) {
    if (e.keyCode === 9) { return true }
    return false
  }

  isDotKey(e) {
    if (e.keyCode === 190) { return true }
    return false
  }
}

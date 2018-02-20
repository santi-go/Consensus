import {KeyPressed} from '../libraries/key_mapping.js'

export let FormBehaviour = {
  avoidEnterDeleteBox: (e) => {
    if (KeyPressed.isEnter(e)) {
      e.preventDefault()
    }
  }
}

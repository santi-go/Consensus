export let Formatter = {

  formatText:(pastedText)=>{
    let text = Formatter.sanitize(pastedText)
    let newBlock = Formatter.addBlockTags(text)
    return newBlock
  },

  sanitize:(text)=>{
    let result = text.replace(/<(?:.|\n)*?>/gm, '')
    return result
  },

  addBlockTags:(text)=>{
    let newBlock = ''
    let lines = text.split('\n')
    for (let line of lines) {
      newBlock += Formatter.addTag(line)
    }
    Formatter.content = newBlock
    return newBlock
  },

  addTag:(line)=>{
    let convertedLine = ''
    let lineInProcess = line.trim()
    if (lineInProcess === '') {
      convertedLine = Formatter.addBrTag()
    } else {
      convertedLine = Formatter.addParagraphTag(lineInProcess)
    }
    return convertedLine
  },

  addBrTag:()=>{
    return '<br>\n'
  },

  addParagraphTag:(lineInProcess)=>{
    return '<p>' + lineInProcess + '</p>\n'
  }
}

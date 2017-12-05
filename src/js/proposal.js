export var Proposal = {
  inputContainer: null,
  outputContainer: null,

  initialize: function(inputContainerId) {
    let container = document.getElementById(inputContainerId);
    this.inputContainer = container.querySelector('pre');
    this.inputContainer.textContent = "Insert your proposal here...";
    this.outputContainer = container.querySelector('output');
    this.prepareEvents();
  },

  prepareEvents: function() {
    this.inputContainer.addEventListener('paste', this.pasteProposal.bind(this));
  },

  pasteProposal: function(event) {
    let pastedText = event.clipboardData.getData('text');
    let text = this.sanitize(pastedText);
    let newBlock = this.addBlockTags(text);
    this.outputContainer.innerHTML = newBlock;
  },

  sanitize: function(text) {
    let result = text.replace(/<(?:.|\n)*?>/gm, '');
    return result;
  },

  addBlockTags: function(text) {
    let newBlock = '';
    let lines = text.split("\n");
    for (let line of lines){
      newBlock += this.addTag(line);
    }
    return newBlock;
  },

  addTag: function(line) {
    let convertedLine = "";
    let lineInProcess = line.trim();
    if (lineInProcess == "") {
      convertedLine = this.addBrTag();
    } else {
      convertedLine = this.addParagraphTag(lineInProcess);
    }
    return convertedLine;
  },

  addBrTag: function() {
    return "<br>\n";
  },

  addParagraphTag: function(lineInProcess) {
    return "<p>" + lineInProcess + "</p>\n";
  },
};

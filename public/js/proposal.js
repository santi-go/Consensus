var Proposal = {
    text_box: document.getElementById('proposal'),

    initialize: function() {
        document.addEventListener('paste', this.pasteProposal.bind(this));
        this.text_box.textContent = "Insert your proposal here...";
    },

    pasteProposal: function(event) {
        var pastedText = event.clipboardData.getData('text');
        sanitizedText = this.sanitize(pastedText);

        this.text_box.textContent = sanitizedText;
        ProcessBlock.initialize();
    },

    sanitize: function(text) {
        result = text.replace(/<(?:.|\n)*?>/gm, '')

        return result;
    }
}

var ProcessBlock = {
    textBlock: document.getElementById('proposal'),
    text: '',
    paragraphs: [],

    initialize: function() {
        this.text = this.textBlock.innerText;
        this.addBlockTags();
    },

    addBlockTags: function() {
        var newBlock = '';
        this.paragraphs = this.text.split("\n");
        var lines=this.paragraphs;
        for (key in lines){
            var convertedLine = "";
            var lineInProcess = lines[key].trim();
            if (lineInProcess == "") {
                convertedLine = this.addBrTag();
            } else {
                convertedLine = this.addParagraphTag(lineInProcess);
            }
            newBlock += convertedLine;
        }
        this.textBlock.innerText = newBlock;
    },

    addBrTag: function() {
        return "<br>\n";
    },

    addParagraphTag: function(lineInProcess) {
        return "<p>" + lineInProcess + "</p>\n";
    }
}

Proposal.initialize();

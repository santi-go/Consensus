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
    },

    sanitize: function(text) {
        result = text.replace(/<(?:.|\n)*?>/gm, '')

        return result;
    }
}

Proposal.initialize();

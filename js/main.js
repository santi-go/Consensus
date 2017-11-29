
Invited.initialize('guests-email');
Proposer.initialize('proposer-email');

var Proposal = {
    text_box: document.getElementById('proposal'),

    initialize: function() {
        this.text_box.addEventListener('paste', this.pasteProposal.bind(this));
        this.text_box.textContent = "Insert your proposal here...";
    },

    pasteProposal: function(event) {
        var pastedText = event.clipboardData.getData('text');
        sanitizedText = this.sanitize(pastedText);

        ProcessBlock.initialize(sanitizedText);
    },

    sanitize: function(text) {
        result = text.replace(/<(?:.|\n)*?>/gm, '');

        return result;
    }
};

var ProcessBlock = {
    text: '',
    paragraphs: [],

    initialize: function(text) {
        this.text = text;
        this.addBlockTags();
    },

    addBlockTags: function() {
        var newBlock = '';
        this.paragraphs = this.text.split("\n");
        var lines=this.paragraphs;
        for (var key in lines){
            var convertedLine = "";
            var lineInProcess = lines[key].trim();
            if (lineInProcess == "") {
                convertedLine = this.addBrTag();
            } else {
                convertedLine = this.addParagraphTag(lineInProcess);
            }
            newBlock += convertedLine;
        }
        document.getElementById('proposal2').innerHTML = newBlock;
        console.log(newBlock);
    },

    addBrTag: function() {
        return "<br>\n";
    },

    addParagraphTag: function(lineInProcess) {
        return "<p>" + lineInProcess + "</p>\n";
    }
};

Proposal.initialize();


var InvitedEmails = {
    container: document.getElementById('invited-emails'),

    deleteEmail: function(mail){
        stringEmails = this.readInputEmails();
        arrayEmails = this.parseStringToArray(stringEmails);
        newArrayEmails = this.deleteElementToArray(mail,arrayEmails);
        newStringEmails = this.parseArrayToString(newArrayEmails);
        this.updateInputEmails(newStringEmails);
    },

    readInputEmails: function(){
        return this.container.value;
    },

    parseStringToArray: function(string){
        return string.split(',');
    },

    deleteElementToArray: function(element,arrayElements){
        var newArray=[];
        arrayElements.forEach(function(elementArray){
            if ( element != elementArray ){
                newArray.push(elementArray);
            }
        });
        return newArray;
    },

    parseArrayToString: function(array){
        return array.toString();
    },

    updateInputEmails: function(emails){
        this.container.value = emails;
    },

    createRemoveButton: function(emailBox, buttonStyle, action) {
        var removeButton = document.createElement('div');
        emailBox.appendChild(removeButton);
        if (buttonStyle != ""){
          removeButton.classList.add(buttonStyle);
        }
        removeButton.textContent = "x";
        removeButton.addEventListener("click", action);
    }
};

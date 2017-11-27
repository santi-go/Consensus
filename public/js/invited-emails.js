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

    parseStringToArray(string){
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

    parseArrayToString(array){
        return array.toString();
    },

    updateInputEmails: function(emails){
        this.container.value = emails;
    },

    createRemoveButton: function(emailBox, buttonStyle, action) {
        var removeButton = document.createElement('div');
        emailBox.appendChild(removeButton).classList.add(buttonStyle);
        removeButton.textContent = "x";
        removeButton.addEventListener("click", action);
    }
}

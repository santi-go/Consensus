var ProposerEmail = {
    container: document.getElementById('proposer-email'),

    initialize: function() {
        var input = this.container.querySelector('input');

        input.addEventListener('blur', this.checkMail.bind(this));
        input.addEventListener('keypress', this.maskInput.bind(this));
    },

    checkMail: function(event) {
        isValid = this.validateEmail(event.target.value);

        this.markValidity(isValid);
    },

    markValidity: function(isValid) {
        var mark = 'invalid';

        if(isValid) {
            this.container.classList.remove(mark);
        } else {
            this.container.classList.add(mark);
        };
    },

    validateEmail: function(email){
        var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailPattern.test(email);
    },

    maskInput: function(event) {
        var text = event.target;
        var keynum = event.which;
        if (keynum == 0 || keynum == 8 || keynum == 13) {
            return;
            };
        var character = String.fromCharCode(keynum);

        var thePattern = this.selectPattern(text.value);

        var isAllowed = this.employ(thePattern, character);

        if(!isAllowed) {
            event.preventDefault();
        };
    },

    employ: function(pattern, character) {
        var matcher = new RegExp(pattern);
        var result = matcher.exec(character);
        return result;
    },

    selectPattern: function(text) {
        var patterns = {
            local: "[ \@ | A-Z | a-z | 0-9 | \! | \# | \$ | \% | \& | \' | \* | \+ | \- | \/ | \= | \? | \^ | \_ | \` | \{ | \| | \} | \& | \,]",
            domain: "[ A-Z | a-z | 0-9 | \. |-]"
        };

        var result = patterns.local;

        if(text.includes('@')) {
            result = patterns.domain;
        };

        return result;
    },

};

var GuestsEmail = {
    container: document.getElementById('guests-email'),

    initialize: function() {
        var input = this.container.querySelector('input');
        input.addEventListener('blur', this.extractMail.bind(this));
        input.addEventListener('blur', this.parseMail.bind(this));
    },

    validateEmail: function(email){
        var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailPattern.test(email);
    },

    parseMail: function() {
        var input = this.container.querySelector('input');
        input.value.split(' ').join('');
        var emails = input.value.split(",");
        var emailsList = [];
        for(var i = 0; i < emails.length; i++){
            emailsList.push({
                email: emails[i],
                valid: this.validateEmail(emails[i])
            });
        }
        return emailsList;
    },
    extractMail: function() {
        var emailsList = this.parseMail();
        console.log(emailsList);
        for (var i = 0; i < emailsList.length; i++){
            var newEmail = document.createElement('div');
            document.querySelector('.box').appendChild(newEmail);
            newEmail.innerText = emailsList[i].email;
            if(emailsList[i].valid == true){
                newEmail.classList.add("validBox");
            } else {
                newEmail.classList.add("invalidBox");
            }
        }
    }
}


GuestsEmail.initialize();
ProposerEmail.initialize();

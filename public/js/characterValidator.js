function checkCharacter(event){
  var keynum;
  var local_part = "[ \@ | A-Z | a-z | 0-9 | \! | \# | \$ | \% | \& | \' | \* | \+ | \- | \/ | \= | \? | \^ | \_ | \` | \{ | \| | \} | \& ]";
  var domain_part = "[ A-Z | a-z | 0-9 | \. |-]";

  keynum = event.which;
  input_Email = document.getElementsByName("email")[0];

  if (input_Email.value.includes("@")) {
    if (validateCharacter(domain_part, keynum) == null) {
      event.preventDefault();
    }
  } else {
    if (validateCharacter(local_part, keynum) == null) {
      event.preventDefault();
    }
  }
}

function validateCharacter(stringPattern, keynum){
  var str = String.fromCharCode(keynum);
  var pattern = new RegExp(stringPattern);
  var result = pattern.exec(str);
  return result;
}

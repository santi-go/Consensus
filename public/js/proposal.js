
function removeFormat(proposal) {
    var text = proposal

    result = text.replace(/<(?:.|\n)*?>/gm, '')

    return result;

};
var Invited = {
    createRemoveButton: function(emailBox, buttonStyle, action) {
        var removeButton = document.createElement('div');
        emailBox.appendChild(removeButton).classList.add(buttonStyle);
        removeButton.textContent = "x";
        removeButton.addEventListener("click", action);
    }
}

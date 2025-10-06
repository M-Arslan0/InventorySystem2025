
document.getElementById('open-search-form').onclick = function() {
    document.getElementById('search-form-modal').style.display = "block";
}
document.getElementById('open-company-form').onclick = function() {
    document.getElementById('company-form-modal').style.display = "block";
}
document.getElementById('open-othCompany-form').onclick = function() {
    document.getElementById('othCompany-form-modal').style.display = "block";
}
document.getElementById('open-user-form').onclick = function() {
    document.getElementById('user-form-modal').style.display = "block";
}
document.getElementById('open-cargo-form').onclick = function() {
    document.getElementById('cargo-form-modal').style.display = "block";
}

var closeBtns = document.getElementsByClassName("close");
for (var i = 0; i < closeBtns.length; i++) {
    closeBtns[i].onclick = function() {
        var modal = this.parentElement.parentElement;
        modal.style.display = "none";
    }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "block";
    }
}



document.getElementById('open-search-form').onclick = function() {
    document.getElementById('search-form-modal').style.display = "block";
}
document.getElementById('open-findInv-form').onclick = function() {
    document.getElementById('findInv-form-modal').style.display = "block";
}

var closeBtns = document.getElementsByClassName("close");
for (var i = 0; i < closeBtns.length; i++) {
    closeBtns[i].onclick = function() {
        var modal = this.parentElement.parentElement;
        modal.style.display = "none";
    }
}



// Tab Navigation
		const tabBtns = document.querySelectorAll('.tab-btn');
		const tabPanes = document.querySelectorAll('.tab-pane');

		tabBtns.forEach((btn) => {
		  btn.addEventListener('click', () => {
			const target = btn.getAttribute('data-target');
			tabBtns.forEach((btn) => btn.classList.remove('active'));
			tabPanes.forEach((pane) => pane.classList.remove('active'));
			btn.classList.add('active');
			document.querySelector(target).classList.add('active');
		  });
		});
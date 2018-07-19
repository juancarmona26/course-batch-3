(function () {
    'use strict';

    const sidenavButtons = document.querySelectorAll('.sidenav-button');
    const sidenav = document.querySelector('.sidenav');

    for(const button of sidenavButtons) {
        button.addEventListener('click', showSidenav);
    }

    function showSidenav() {
        sidenav.classList.toggle('show');
    }

})();

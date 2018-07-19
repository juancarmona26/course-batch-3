(() => {
    'use strict';

    const showSidenav = () => {
        sidenav.classList.toggle('show');
    };

    const sidenavButtons = document.querySelectorAll('.sidenav-button');
    const sidenav = document.querySelector('.sidenav');

    for(const button of sidenavButtons) {
        button.addEventListener('click', showSidenav);
    }

})();

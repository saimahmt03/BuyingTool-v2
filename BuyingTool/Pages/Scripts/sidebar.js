$(function () {
    var $sidebar = $("#sidebarWrapper");
    var $toggle = $("#sidebarToggle");
    var maincontent = document.getElementById('main-content-wrapper');
    var pagebanner = document.getElementById('page-banner');

    // Click toggle dot to lock/pin sidebar open or close
    $toggle.on("click", function (e) {
        e.stopPropagation();
        $sidebar.toggleClass("is-pinned");
        maincontent.classList.toggle('content-pinned');
        pagebanner.classList.toggle('page-banner-pinned');
    });
});
$(function () {
    var $sidebar = $("#sidebarWrapper");
    var $toggle = $("#sidebarToggle");

    // Click toggle dot to lock/pin sidebar open or close
    $toggle.on("click", function (e) {
        e.stopPropagation();
        $sidebar.toggleClass("is-pinned");
    });
});
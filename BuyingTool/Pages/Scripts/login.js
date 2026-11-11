$(function () {
    var $form = $("#loginForm");
    var $idNumber = $("#idnumber");
    var $password = $("#password");
    var $loginButton = $("#loginButton");

    // Keep ID Number input numeric, matching the previous numeric field component.
    $idNumber.on("input", function () {
        this.value = this.value.replace(/[^0-9]/g, "");
        $(this).removeClass("is-invalid");
    });

    $password.on("input", function () {
        $(this).removeClass("is-invalid");
    });

    // Toggle password visibility without changing the submitted field name.
    $("#togglePassword").on("click", function () {
        var isPassword = $password.attr("type") === "password";
        $password.attr("type", isPassword ? "text" : "password");
        $(this).find(".toggle-label").text(isPassword ? "Hide" : "Show");
        $(this).attr("aria-label", isPassword ? "Hide password" : "Show password");
        $(this).attr("aria-pressed", isPassword ? "true" : "false");
        $password.trigger("focus");
    });

    $form.on("submit", function (event) {
        var isValid = true;

        if ($.trim($idNumber.val()) === "") {
            $idNumber.addClass("is-invalid");
            isValid = false;
        }

        if ($.trim($password.val()) === "") {
            $password.addClass("is-invalid");
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();
            ($.trim($idNumber.val()) === "" ? $idNumber : $password).trigger("focus");
            return;
        }

        // Allow the normal Razor form post; only update the button for feedback.
        $loginButton.prop("disabled", true).addClass("is-loading");
        $loginButton.find(".button-text").text("Signing in...");
    });
});

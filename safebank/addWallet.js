function convertFormToJSON(form) {
    var array = $(form).serializeArray();
    var json = {};
    $.each(array, function () {
        json[this.name] = this.value || "";
    });
    return json;
}

$('form[action="https://safebank-backend.herokuapp.com/new"]').each(function (
    i,
    el
) {
    var form = $(el);
    form.submit(function (e) {
        e.preventDefault();
        form = $(e.target);
        var data = convertFormToJSON(form);
        var action = form.attr("action");
        if(!isValidIban("iban")) {
            return 
        }
        $.ajax({
            url: action,
            method: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
            success: function () {
                var parent = $(form.parent());
                // Hide the form
                parent.children("form").css("display", "none");
                // Display the "Done" block
                parent.children(".w-form-done").css("display", "block");
            },
            error: function () {
                var parent = $(form.parent());
                // Display the "Failed" block
                parent.find(".w-form-fail").css("display", "block");
            },
        });
    });
});

$('form[action="https://safebank-backend.herokuapp.com/redeem"]').each(function (
    i,
    el
) {
    var form = $(el);
    form.submit(function (e) {
        e.preventDefault();
        form = $(e.target);
        var data = convertFormToJSON(form);
        var action = form.attr("action");
        $.ajax({
            url: action,
            method: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
            success: function () {
                console.log("Success")
                var parent = $(form.parent());
                // Hide the form
                parent.children("form").css("display", "none");
                // Display the "Done" block
                parent.children(".w-form-done").css("display", "block");
            },
            error: function () {
                console.log("error")
                var parent = $(form.parent());
                // Display the "Failed" block
                parent.find(".w-form-fail").css("display", "block");
            },
        });
    });
});
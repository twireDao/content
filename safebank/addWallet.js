function convertFormToJSON(form) {
    var array = $(form).serializeArray();
    var json = {};
    $.each(array, function () {
        json[this.name] = this.value || "";
    });
    return json;
}

$('form[action="http://sparkassebackend-env.eba-wwygbp9t.eu-central-1.elasticbeanstalk.com/new"]').each(function (
    i,
    el
) {
    var form = $(el);
    form.submit(function (e) {
        e.preventDefault();
        form = $(e.target);
        var data = convertFormToJSON(form);
        var action = form.attr("action");
        if (!isValidIban("iban")) {
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
                document.querySelector("success-iban").style.display = "flex";
            },
            error: function () {
                var parent = $(form.parent());
                // Display the "Failed" block
                document.querySelector("no-success-iban").style.display = "flex";
            },
        });
    });
});

$('form[action="http://sparkassebackend-env.eba-wwygbp9t.eu-central-1.elasticbeanstalk.com/redeem"]').each(function (
    i,
    el
) {
    var form = $(el);
    form.submit(function (e) {
        e.preventDefault();
        form = $(e.target);
        var data = convertFormToJSON(form);
        const addr = document.querySelector('#selected-account-address').value;
        data["address"] = addr;
        console.log("Testing adding stuff to data field:", data);
        var action = form.attr("action");
        if (!isValidIban("iban-3")) {
            return
        }
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
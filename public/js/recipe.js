// When the page loads, grab and display all of our chirps
$.get("/api/recipes", function (data) {

    if (data.length !== 0) {

        for (var i = 0; i < data.length; i++) {

            var row = $("<div>");
            row.addClass("chirp");

            row.append("<p>" + data[i].author + " shared.. </p>");
            row.append("<p>" + data[i].recipe + "</p>");
            row.append("<p>" + data[i].body + "</p>");
            row.append("<p>On " + new Date(data[i].created_at).toLocaleDateString() + "</p>");

            $("#chirp-area").prepend(row);

        }

    }

});

// When user chirps (clicks addBtn)
$("#chirp-submit").on("click", function (event) {
    event.preventDefault();
    
    // Make a newChirp object
    var newChirp = {
        author: $("#author").val().trim(),
        recipe: $("#recipe").val().trim(),
        body: $("#chirp-box").val().trim(),
        created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };

    console.log(newChirp);

    // Send an AJAX POST-request with jQuery
    $.post("/api/recipes", newChirp)
        // On success, run the following code
        .then(function () {

            var row = $("<div>");
            row.addClass("chirp");

            row.append("<p>" + newChirp.author + " shared: </p>");
            row.append("<p>" + newChirp.recipe + "</p>");
            row.append("<p>" + newChirp.body + "</p>");
            row.append("<p>On " + new Date(newChirp.created_at).toLocaleDateString() + "</p>");

            $("#chirp-area").prepend(row);

        });

    // Empty each input box by replacing the value with an empty string
    $("#author").val("");
    $("#recipe").val("");
    $("#chirp-box").val("");
});



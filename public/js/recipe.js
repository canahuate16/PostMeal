
// When the page loads, grab and display all of our chirps
// $.get("/api/recipes", function (data) {
//     console.log(data)
//     if (data.length !== 0) {

//         for (var i = 0; i < data.length; i++) {

//             var row = $("<div>");
//             row.addClass("chirp");

//             row.append("<p>" + data[i].author + " shared.. </p>");
//             row.append("<p>" + data[i].recipe + "</p>");
//             row.append("<p>" + data[i].body + "</p>");
//            row.append("<p>On " + new Date(data[i].created_at).toLocaleDateString() + "</p>");

//     
//         }

//     }

// });
$.get("/api/all/recipes", function (data) {
    console.log(data)
    if (data.length !== 0) {

        for (var i = 0; i < data.length; i++) {

            var row = $("<div>");
            row.addClass("chirp");

            row.append("<p>" + data[i].author + " shared.. </p>");
            row.append("<p>" + data[i].recipe + "</p>");
            row.append("<p>" + data[i].ingredients + "</p>");
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
    
        recipe: $("#recipe").val().trim(),
        ingredients: $("#ingredients").val().trim(),
        body: $("#chirp-box").val().trim(),
        created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };

    console.log(newChirp);

    // Send an AJAX POST-request with jQuery
    $.post("/api/recipes", newChirp)
        // On success, run the following code
        .then(function (dbRecipe) {
            console.log (dbRecipe);
            var row = $("<div>");
            row.addClass("chirp");

            row.append("<p>" + dbRecipe.author + " shared: </p>");
            row.append("<p>" + `Recipe: `+ newChirp.recipe + " </p>");
            row.append("<p>" + `Ingredients: `+ newChirp.ingredients + " </p>");
            row.append("<p>" + `Instructions: ` + newChirp.body + "  </p>");
            row.append("<p>On " + new Date(newChirp.created_at).toLocaleDateString() + "</p>");

            $("#chirp-area").prepend(row);

        });

    // Empty each input box by replacing the value with an empty string
    $("#author").val("");
    $("#recipe").val("");
    $("#ingredients").val("");
    $("#chirp-box").val("");
});
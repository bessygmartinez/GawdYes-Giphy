//Array to hold button names
let topics = ["RuPaul", "Alyssa Edwards", "Shangela", "Vanjie", "Laganja Estranja", "Sashay Away", "Halleloo"];
console.log(topics);

function displayGif() {
    let topics = $(this).attr("data-name");
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=O2TOc8SkB8wXOQMWrOkwyPClVZkhqA0H&limit=10";

$.ajax({
    url: queryURL,
    method: "GET"
})

.then(function(response) {
    $("#gif-div").empty();

    for (let i = 0; i < response.data.length; i++) {
        let gifDiv     = $("<div class='gif-div m-2'>");
        let rating     = String.prototype.toUpperCase.call({
            toString: function toString () {
                return response.data[i].rating;
            }
        });
        let ratingDiv  = $('<p>').html("Rating: " + rating);
        let animated   = response.data[i].images.fixed_height.url;
        let still      = response.data[i].images.fixed_height_still.url;
        let gifImg     = $("<img class='gif img-fluid'>");

        gifImg.attr('src', still);
        gifImg.attr('data-still', still);
        gifImg.attr('data-animate', animated);
        gifImg.attr('data-state', 'still');

        gifDiv.append(ratingDiv);
        gifDiv.prepend(gifImg);
        $("#gif-div").prepend(gifDiv);
    }
    
        let gifIns = $("<p><strong>Click on gifs to animate/pause.</strong></p>");
        $("#gif-div").prepend(gifIns);
});


};

$("#gif-div").on("click", ".gif", function(){
    let state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");}
    else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
});

function makeButtons() {
    $("#gif-buttons").empty();

    for (let i = 0; i < topics.length; i++) {
        let addButton = $("<button class='btn btn-warning m-1'>");
        addButton.addClass("button");
        addButton.attr("data-name", topics[i]);
        addButton.html(topics[i]);

        $("#gif-buttons").append(addButton);
    }
}

$("#add-button").on("click", function(event){
    event.preventDefault();
    let gifs = $("#button-input").val().trim();
    topics.push(gifs);
    $("#button-input").val("");
    makeButtons();
});

$(document).on("click", ".button", displayGif);

makeButtons();

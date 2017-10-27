	// array of topics which are baby animals yay
	var babies = ["puppies", " baby tigers", "baby hedgehogs"];

	// a function that renders the buttons for this array
	function renderButtons() {

	    $("#baby-view").empty();

	    // create for loop for array topic babies button which will append
	    for (var i = 0; i < babies.length; i++) {

	        var a = $("<button>");
	        a.addClass("baby");
	        a.attr("data-name", babies[i]);
	        a.text(babies[i]);
	        $("#baby-view").append(a);
	    }
	}

	// on click event add button that pushes user input
	$("#add-baby").on("click", function(event) {
	    event.preventDefault();

	    var baby = $("#user-input").val().trim();
	    babies.push(baby);
	    renderButtons();
	    $("#user-input").val("");
	});

	renderButtons();

	// this on click event button infiltrates the dom with giphy api
	$(document).on("click", "button", function() {
	    var babyButton = $(this).attr("data-name");
	    console.log(babyButton)
	    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
	        babyButton + "&api_key=dc6zaTOxFJmzC&limit=10";

	    // ajax queries the giphy URL to grab the info and the done function 
	    // and for loop loops through the users results and displays the rating
	    // for each giphy
	    $.ajax({
	        url: queryURL,
	        method: "GET"
	    })

	    .done(function(response) {
	        var results = response.data;

	        for (var i = 0; i < results.length; i++) {

	            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

	                var gifDiv = $("<div class='item'>");

	                var rating = results[i].rating;

	                var p = $("<p>").text("Rating: " + rating);

	                var babyImage = $("<img>");

	                // this is to make our giphys to be still when loaded on browser
	                babyImage.addClass("gif");
	                babyImage.attr("src", results[i].images.fixed_height_still.url);
          			babyImage.attr("data-still", results[i].images.fixed_height_still.url);
          			babyImage.attr("data-animated", results[i].images.fixed_height.url);
          			babyImage.attr("data-state", "still");
	                gifDiv.append(p);
	                gifDiv.append(babyImage);
	                $("#gifs-appear-here").prepend(gifDiv);
	            }
	        }
	    });
	});

$(document).on("click", ".gif", function() {
  var state =  $(this).attr("data-state");
  console.log(state);

// this makes our giphy still until they are clicked on
 if(state === "still"){
    $(this).attr("src", $(this).attr("data-animated"));
    $(this).attr("data-state", "animated");
  }else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
})
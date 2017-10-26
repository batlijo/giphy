	var babies = ["puppies"," baby tigers", "baby hedgehogs"];

	function renderButtons(){

		$("#baby-view").empty();

        for (var i = 0; i < babies.length; i++) {

          var a = $("<button>");
          a.addClass("baby");
          a.attr("data-name", babies[i]);
          a.text(babies[i]);
          $("#baby-view").append(a);
        }
      }

      $("#add-baby").on("click", function(event) {
        event.preventDefault();

        var baby = $("#user-input").val().trim();
        babies.push(baby);
        renderButtons();
        $("#user-input").val("");
      });

      renderButtons();

	$("button").on("click", function() {
      var babyButton = $(this).attr("data-name");
console.log(babyButton)
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        babyButton + "&api_key=dc6zaTOxFJmzC&limit=10";

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

              babyImage.attr("src", results[i].images.fixed_height.url);
              gifDiv.append(p);
              gifDiv.append(babyImage);
              $("#gifs-appear-here").prepend(gifDiv);
            }
          }
        });
    });


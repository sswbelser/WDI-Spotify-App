$(function() {
	var $newSearch = $("#spotify-search");
	var $resultsList = $("#results-list");
	var resultsTemplate = _.template($("#results-template").html());

	var Results = function(track, artist, album, albumImage) {
		this.track = track;
		this.artist = artist;
		this.album = album;
		this.albumImage = albumImage;
	}

	Results.all = [];

	Results.prototype.save = function() {
		Results.all.push(this);
	}

	Results.prototype.render = function() {
		var resultsIndex = Results.all.indexOf(this);
		var $results = $(resultsTemplate(this));
		$results.attr("data-index", resultsIndex);
		$resultsList.append($results);
	}

	$newSearch.on("submit", function () {
		event.preventDefault();
		$resultsList.empty();
		var trackSubmit = $("#track").val();
		$.get(
			"https://api.spotify.com/v1/search?type=track&q=" + trackSubmit,
			function(data) {
				console.log(data);
				for (var i=0; i < 20; i++) {
					var tracks = data.tracks.items[i];
					var newResults = new Results(tracks.name, tracks.artists[0].name, tracks.album.name, tracks.album.images[0].url);
					newResults.save();
					newResults.render();
				}
			});
	});

});
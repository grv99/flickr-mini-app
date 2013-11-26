$(document).ready(function() {
	testFunc();
});

function testFunc() {
	$('#test-div').html("sjfngsj");
}

function getUpdates(url){
	$.getJSON(url, function(data) {
		$.each(data.items, function(i, item) {
			img = item.media.m;
			author = getAuthor(item.author);
			element = "<img src=" + img + "></img><div class=\"author\"><a href=\"userpage.html?id=" + item.author_id + "\">" + author +"</a></div><br />";
			$('#feeds-div').prepend(element);
		});
	});
}

function getAuthor(authorName) {
	pattern = /nobody@flickr.com \((.+)\)/;
	//pattern = /nobody@flickr.com \((\w+)\)/;
	matched = authorName.match(pattern);
	if(matched == null) {
		// some names couldn't be read
		return "Unknown";
	}
	return matched[1];
}

function getUserPhotos () {
	path = $(location).attr('href');
	userid = path.split("=")[1];
	//userid = userid[1];
	url = "http://api.flickr.com/services/feeds/photos_public.gne?id="+ userid +"&lang=en-us&format=json&jsoncallback=?";
	//getUpdates(url);

	$('#user-details').html("Put user details here.");
	$('#friends-feed-link').html("<a href=\"friends-feed.html?id="+ userid +"\">Friends feed</a>");

	$.getJSON(url, function(data) {
		$.each(data.items, function(i, item) {
			img = item.media.m;
			element = "<img src=" + img + "></img><br />";
			$('#feeds-div').prepend(element);
		});
	});
}

function getFriendsStream () {
	path = $(location).attr('href');
	userid = path.split("=");
	userid = userid[1];
	url = "http://api.flickr.com/services/feeds/photos_friends.gne?user_id="+ userid +"&lang=en-us&format=json&jsoncallback=?";
	//getUpdates(url);

	$.getJSON(url, function(data) {
		$.each(data.items, function(i, item) {
			img = item.media.m;
			author = getAuthor(item.author);
			element = "<img src=" + img + "></img><div class=\"author\"><a href=\"userpage.html?id=" + item.author_id + "\">" + author +"</a></div><br />";
			$('#feeds-div').prepend(element);
		});
	});
}

function getPublicStream () {
	url = "http://api.flickr.com/services/feeds/photos_public.gne?lang=en-us&format=json&jsoncallback=?";
	//getUpdates(url);

	$.getJSON(url, function(data) {
		$.each(data.items, function(i, item) {
			img = item.media.m;
			author = getAuthor(item.author);
			element = "<img src=" + img + "></img><div class=\"author\"><a href=\"userpage.html?id=" + item.author_id + "\">" + author +"</a></div><br />";
			$('#feeds-div').prepend(element);
		});
	});

}
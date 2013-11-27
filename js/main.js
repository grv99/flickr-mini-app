
function getPublicStream () {
	url = "http://api.flickr.com/services/feeds/photos_public.gne?lang=en-us&format=json&jsoncallback=?";
	
	$.getJSON(url, function(data) {
	
		if(data == null || data.items == 0) {
			return noData();
		}

		$('#feeds-div').html("<ul>");
		$.each(data.items, function(i, item) {
			img = item.media.m;
			author = getAuthor(item.author);
			element = "<li class=\"span5 well\">"
						+ "<img src="+img+" class=\"img-polaroid img-rounded\" />"
						+ "<a href=\"userpage.html?id=" + item.author_id + "\">"
						+ "<div class=\"author pull-right\">" + author + "</div>"
						+ "</a>"
						+ "</li>";
			$('#feeds-div').append(element);
			sessionStorage.setItem(item.author_id, author);
		});
		$('#feeds-div').append("</ul>");
	});
}


function getUserPhotos () {
	path = $(location).attr('href');
	userid = path.split("=")[1];
	url = "http://api.flickr.com/services/feeds/photos_public.gne?id="+ userid +"&lang=en-us&format=json&jsoncallback=?";
	
	whoseFeed = sessionStorage.getItem(userid) + "'s feed";
	$('#user').html(whoseFeed);
	document.title = whoseFeed;
	$('#friends-feed-link').html("<a href=\"friends-feed.html?id="+ userid +"\">friends' feed &rarr;</a>");

	$.getJSON(url, function(data) {
	
		if(data == null || data.items == 0) {
			return noData();
		}
		
		$('#feeds-div').html("<ul>");
		$.each(data.items, function(i, item) {
			img = item.media.m;
			element = "<li class=\"span5 well\">"
						+ "<img src="+img+" class=\"img-polaroid img-rounded\" />"
						+ "</li>";
			$('#feeds-div').append(element);
		});
		$('#feeds-div').append("</ul>");
	});
}


function getFriendsStream () {
	path = $(location).attr('href');
	userid = path.split("=")[1];
	url = "http://api.flickr.com/services/feeds/photos_friends.gne?user_id="+ userid +"&lang=en-us&format=json&jsoncallback=?";
	
	whoseFeed = sessionStorage.getItem(userid) + " friends' feed";
	$('#user').html(whoseFeed);
	document.title = whoseFeed;
	
	$.getJSON(url, function(data) {
	
		if(data == null || data.items == 0) {
			return noData();
		}

		$('#feeds-div').html("<ul>");
		$.each(data.items, function(i, item) {
			img = item.media.m;
			author = getAuthor(item.author);
			element = "<li class=\"span5 well\">"
						+ "<img src="+img+" class=\"img-polaroid img-rounded\" />"
						+ "<a href=\"userpage.html?id=" + item.author_id + "\">"
						+ "<div class=\"author pull-right\">" + author + "</div>"
						+ "</a>"
						+ "</li>";
			$('#feeds-div').append(element);
			sessionStorage.setItem(item.author_id, author);
		});
		$('#feeds-div').append("</ul>");
	});
}


function getAuthor(authorName) {
	pattern = /nobody@flickr.com \((.+)\)/;
	matched = authorName.match(pattern);
	if(matched == null) {
		// some names couldn't be read
		return "";
	}
	return matched[1];
}

function noData() {
	element = "<div class=\"alert\"> <big>Sorry. This place is empty :( </big></div>"
				+ "<div style=\"text-align:center;\">"
				+ "<button class=\"btn\" onclick=\"javascript:history.back();\" type=\"button\">&larr; Go Back</button>"
				+ "</div>";
	$('#feeds-div').html(element);
	return false;
}
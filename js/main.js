var app = {

	getPublicStream : function() {
		url = "http://api.flickr.com/services/feeds/photos_public.gne?lang=en-us&format=json&jsoncallback=?";
		this.fetchAndDisplayPhotos(url, true);
	},

	getUserPhotos : function() {
		path = $(location).attr('href');
		userid = this.getUserId(path);
		url = "http://api.flickr.com/services/feeds/photos_public.gne?id="+ userid +"&lang=en-us&format=json&jsoncallback=?";
		
		this.loadBuddyIcon(userid);

		this.fetchAndDisplayPhotos(url, false);

		whoseFeed = localStorage.getItem(userid);
		whoseFeed = (whoseFeed.length > 25 ? whoseFeed.substr(0,25)+"... " : whoseFeed);
		$('#user').html(whoseFeed + "'s feed");
		document.title = whoseFeed + "'s feed";
		$('#friends-feed-link').attr('href', 'friends-feed.html?id='+ userid);
	},

	getFriendsStream : function() {
		path = $(location).attr('href');
		userid = this.getUserId(path);
		url = "http://api.flickr.com/services/feeds/photos_friends.gne?user_id="+ userid +"&lang=en-us&format=json&jsoncallback=?";
		
		this.fetchAndDisplayPhotos(url, true);

		whoseFeed = localStorage.getItem(userid);
		whoseFeed = (whoseFeed.length > 22 ? whoseFeed.substr(0,22)+"..." : whoseFeed);
		$('#user').html(whoseFeed + " friends' feed");
		document.title = whoseFeed + " friends' feed";
		$('#user-feed-link').html("&larr; " + whoseFeed + "'s feed");
		$('#user-feed-link').attr('href', 'userpage.html?id='+ userid);	
	},

	fetchAndDisplayPhotos : function (url, showLink) {
		$.getJSON(url, function(data) {
		
			if(data == null || data.items == 0) {
				return noData();
			}

			$('#feeds-div').html("<ul>");
			$.each(data.items, function(i, item) {
				img = item.media.m;
				author = app.getAuthor(item.author);
				if(showLink) {
					element = generateElement(img, item.author_id, author);
					localStorage.setItem(item.author_id, author);
				}
				else {
					element = generateElement(img);
				}
				$('#feeds-div').append(element);
			});
			$('#feeds-div').append("</ul>");
		});
	},

	getUserId : function (path) {
		return path.split("=")[1];
	},

	getAuthor : function (authorName) {
		pattern = /nobody@flickr.com \((.+)\)/;
		matched = authorName.match(pattern);
		if(matched == null) {
			// some names couldn't be read
			return "";
		}
		return matched[1];
	},

	loadBuddyIcon: function (userid) {
		url_user = "http://api.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=19c30a5af366016df533867bf518a30f&user_id=" + userid;
		$.get(url_user, function( data ) {
			user = $(data).find("person");
			if(user.attr("iconserver") > 0)
				img_src = "http://farm"+ user.attr("iconfarm") +".staticflickr.com/"+ user.attr("iconserver") +"/buddyicons/"+ userid +".jpg";
			else
				img_src = "http://www.flickr.com/images/buddyicon.gif";
			user_element = "<img src =" + img_src + " class=\"img-rounded \" style=\"border: 1px solid #f5f5f5;\" />";
			$('#user-details-div').html(user_element);
		});
	}

};

function generateElement (img, author_id, author) {
	ele = "<li class=\"span5 well\">"
		+ "<img src="+img+" class=\"img-polaroid img-rounded\" />"
		+ (typeof author_id != 'undefined' ? "<a href=\"userpage.html?id=" + author_id + "\">"
									+ "<div class=\"author pull-right\">" + author + "</div>"
									+ "</a>" : "")
		+ "</li>";
	return ele;
}

function noData () {
	element = "<div class=\"alert\"> <big>Sorry. This place is empty :( </big></div>"
				+ "<div style=\"text-align:center;\">"
				+ "<button class=\"btn\" onclick=\"javascript:history.back();\" type=\"button\">&larr; Go Back</button>"
				+ "</div>";
	$('#feeds-div').html(element);
	return false;
}



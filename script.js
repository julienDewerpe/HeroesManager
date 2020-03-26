function main(){	
	function login() {
		var Twit = require('twit');
		var endpoints = require('./node_modules/twit/lib/endpoints');
		endpoints.API_HOST      = 'https://cors-anywhere.herokuapp.com/https://api.twitter.com/';
		endpoints.REST_ROOT     = 'https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/';
		endpoints.PUB_STREAM    = 'https://cors-anywhere.herokuapp.com/https://stream.twitter.com/1.1/';
		endpoints.USER_STREAM   = 'https://cors-anywhere.herokuapp.com/https://userstream.twitter.com/1.1/';
		endpoints.SITE_STREAM   = 'https://cors-anywhere.herokuapp.com/https://sitestream.twitter.com/1.1/';
		endpoints.MEDIA_UPLOAD  = 'https://cors-anywhere.herokuapp.com/https://upload.twitter.com/1.1/';
		endpoints.OA_REQ        = 'https://cors-anywhere.herokuapp.com/https://api.twitter.com/oauth/request_token';
		endpoints.OA_ACCESS     = 'https://cors-anywhere.herokuapp.com/https://api.twitter.com/oauth/access_token';

		var T = new Twit({
  		consumer_key:         "Qb0zx5AeHmf9jzXDJjMTRUNmH",
  		consumer_secret:      "0YC9uH6HkWbDwOSYdO4MRD0I7rz3crclijr07mMZZKkQ0TVRGM",
  		access_token:         "564269211-K4joqVZIdCaySd5lMfeFMGmVizFJVjVylU2f30kb",
  		access_token_secret:  "3u9WyRsZhvSdeU0qeOYPfrCTGGIzx4IBbyGdacAG0TLHj",
  		timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
		strictSSL:            true,     // optional - requires SSL certificates to be valid.
		})
		//
		//  tweet 'uwu'
		
		T.post('statuses/update', { status: 'uwu' }, function(err, data, response) {
			console.log(data)
		})
	}
	var button = document.getElementById("but_log");
	button.addEventListener('click', login);
}

window.addEventListener('DOMContentLoaded', main);
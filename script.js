function myFunction() {
									let username = document.getElementById("login");
									let password = document.getElementById("pwd");
									alert(username.value);
									alert(password.value);
									const client = new Twitter({
  										subdomain: "api", // "api" is the default (change for other subdomains)
  										version: "1.1", // version "1.1" is the default (change for other subdomains)
  										consumer_key: "Qb0zx5AeHmf9jzXDJjMTRUNmH", // from Twitter.
  										consumer_secret: "0YC9uH6HkWbDwOSYdO4MRD0I7rz3crclijr07mMZZKkQ0TVRGM", // from Twitter.
  										access_token_key: "564269211-K4joqVZIdCaySd5lMfeFMGmVizFJVjVylU2f30kb", // from your User (oauth_token)
  										access_token_secret: "3u9WyRsZhvSdeU0qeOYPfrCTGGIzx4IBbyGdacAG0TLHj" // from your User (oauth_token_secret)
									});
									client.get("account/verify_credentials").then(results => {console.log("results", results);}).catch(console.error);
									await client.post("friendships/create", {screen_name: "js_naje"});
}

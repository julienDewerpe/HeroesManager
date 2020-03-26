function research(name){
    //todo : use fetch 
    const Http = new XMLHttpRequest();
    const corsURL = "https://cors-anywhere.herokuapp.com/";
    const url='https://superheroapi.com/api/2463499803965064/search/' + name; //with the access token of Antoine
    var urlReq = corsURL + url
    Http.open("GET", urlReq);
    Http.send();
    Http.onreadystatechange = (e) => {
        if(Http.readyState === 4 && Http.status === 200) {
           
          console.log(JSON.parse(Http.responseText))
          var response = JSON.parse(Http.responseText)
          var listChampions = response.results
          listChampions.forEach(champion => {
                addChampion(champion)
		  });

        }
    }
    

}

function clearChampList(){
	var list = document.querySelector('#champ-list');
	list.innerHTML = '';
}

function addChampion(champion){
    var list = document.querySelector('#champ-list');
	var champElmt = document.createElement("li");
	var selectButton = document.createElement("button");
	var image = document.createElement("img");
    image.src = champion.image.url;
    image.width = "50"
	selectButton.appendChild(document.createTextNode("Select"))
    selectButton.className = "btn btn-primary float-right"

	champElmt.className = "list-group-item"
	champElmt.appendChild(image)
	champElmt.appendChild(document.createTextNode(champion.name))
	champElmt.appendChild(selectButton)
    list.appendChild(champElmt)
}

var searchButton = document.getElementById("search");

searchButton.addEventListener('click', function(){
    var heroName = document.getElementById("name").value;
    clearChampList()
    research(heroName)
});
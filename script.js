window.addEventListener("DOMContentLoaded", (event) => {
    localStorage.setItem("count_p1", 0);
    localStorage.setItem("count_p2", 0);
});


function research(name) {
    //todo : use fetch 
    //todo : systeme de cache dans localstorage
    const Http = new XMLHttpRequest();
    const corsURL = "https://cors-anywhere.herokuapp.com/";
    const url = 'https://superheroapi.com/api/2463499803965064/search/' + name; //with the access token of Antoine
    var urlReq = corsURL + url;
    Http.open("GET", urlReq);
    Http.send();
    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4 && Http.status === 200) {
            console.log(JSON.parse(Http.responseText));
            var response = JSON.parse(Http.responseText);
            var listChampions = response.results;
            listChampions.forEach(champion => {
                addChampion(champion);
            });
        }
    }
    var x = document.getElementById("select_music");
    x.play()
}

function clearChampList() {
    var list = document.querySelector('#champ-list');
    list.innerHTML = '';
}



function addChampion(champion) {
    var list = document.querySelector('#champ-list');
    var champElmt = document.createElement("li");
    var selectButton = document.createElement("button");
    var image = document.createElement("img");
    image.src = champion.image.url;
    image.width = "50";
    selectButton.appendChild(document.createTextNode("Select"));
    selectButton.className = "btn mt-3 btn-success float-right";
    selectButton.setAttribute("data-id", champion.id);
    selectButton.setAttribute("data-champion", champion);

    champElmt.className = "list-group-item";
    var img = champElmt.appendChild(image);
    img.className = "mr-3"
    champElmt.appendChild(document.createTextNode(champion.name));
    champElmt.appendChild(selectButton);
    list.appendChild(champElmt);
    selectButton.addEventListener('click', function () {
        selectChamp(champion);
    });

}


function selectChamp(champion) {

    var idJoueur = document.querySelector("#player-active").getAttribute("data-id");
    var tmp = "count_p" + idJoueur;
    if (localStorage.getItem(tmp) < 3) {
        var list = document.querySelector('#list-p' + idJoueur);
        var champElmt = document.createElement("card");
        var image = document.createElement("img");
        image.src = champion.image.url;
        image.width = "100";
        var img = champElmt.appendChild(image);
        list.appendChild(champElmt);
        changePlayer();
        localStorage.setItem("count", parseInt(localStorage.getItem("count_p" + idJoueur)) + 1);
    }

}

function changePlayer() {
    var annou = document.getElementById("player-active");
    if (annou.getAttribute("data-id") == 1) {
        annou.innerHTML = "Player 2 select a champion";
        annou.setAttribute("data-id", 2);
    }
    else {
        annou.innerHTML = "Player 1 select a champion";
        annou.setAttribute("data-id", 1);
    }
}
var searchButton = document.getElementById("search");
searchButton.addEventListener('click', function () {
    var heroName = document.getElementById("name").value;
    clearChampList();
    research(heroName);
});
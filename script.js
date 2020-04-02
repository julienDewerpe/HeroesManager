window.addEventListener("DOMContentLoaded", (event) => {
    localStorage.setItem("count_p1", 0);
    localStorage.setItem("count_p2", 0);
    localStorage.setItem("champ_selected", []);
});
//todo : 
/*

//todo : use fetch 


//champ_list_selected set id champ
// if champ_id in array champ_selected -> btn disabled
// 
// algo to determine which team wins

//game mode -> solo, duo

// start fight -> new popup with stats

*/


function research(name) {

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
    //var x = document.getElementById("select_music");
    //x.play()
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

    var idPlayer = document.querySelector("#player-active").getAttribute("data-id");
    var tmp = "count_p" + idPlayer;
    console.log(tmp);
    if (localStorage.getItem(tmp) < 3) {
        var list = document.querySelector('#list-p' + idPlayer);
        var champElmt = document.createElement("card");
        champElmt.setAttribute("id", "card" + "_" + idPlayer + "_" + localStorage.getItem(tmp) + 1)
        var image = document.createElement("img");
        image.src = champion.image.url;
        image.width = "100";
        var img = champElmt.appendChild(image);
        img.setAttribute("data-id", localStorage.getItem(tmp) + 1)
        list.appendChild(champElmt);

        img.addEventListener('click', function (event) {
            removeChamp(idPlayer, event.target.getAttribute("data-id"));
        });

        changePlayer();

        localStorage.setItem(tmp, parseInt(localStorage.getItem(tmp)) + 1);
        if (localStorage.getItem("count_p1") == 3 && localStorage.getItem("count_p2") == 3) {
            teamsComplete();
        }
    }
}


function teamsComplete(){

    var annou = document.getElementById("player-active");
    annou.innerHTML = "  ";
    var startButton = document.querySelector("#fightButton");
    startButton.style.display = "inline";

   
    startButton.className = "btn mt-3 btn-danger text_center";
    //startButton.addEventListener('click', function () {
    // faire le calcul
    //});

}


function removeChamp(playerId, imageId) {
    var cardToDel = document.getElementById("card" + "_" + playerId + "_" + imageId);
    cardToDel.remove();
    var tmp = "count_p" + playerId;
    localStorage.setItem(tmp, parseInt(localStorage.getItem(tmp)) - 1);
    var startButton = document.querySelector("#fightButton");
    startButton.style.display = "none";

    var annou = document.getElementById("player-active");
    if (localStorage.getItem("count_p1") < 3 && localStorage.getItem("count_p2") == 3) {
        annou.innerHTML = "Player 1 select a champion";
        annou.setAttribute("data-id", 1);
    }
    else if (localStorage.getItem("count_p2") < 3 && localStorage.getItem("count_p1") == 3) {
        annou.innerHTML = "Player 2 select a champion";
        annou.setAttribute("data-id", 2);
    }

}

function changePlayer() {
    var annou = document.getElementById("player-active");
    if (annou.getAttribute("data-id") == 1 && localStorage.getItem("count_p2") < 3) {
        annou.innerHTML = "Player 2 select a champion";
        annou.setAttribute("data-id", 2);
    }
    else if (localStorage.getItem("count_p1") < 3) {
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
var state = {
    count_p1: 0,
    count_p2: 0,
    champSelected: []
};

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
    selectButton.setAttribute("id", "li" + champion.id);
    selectButton.setAttribute("data-champion", champion);
    if (state.champSelected.find(e => e == champion.id) != null){
        selectButton.style.display = "none";
    }

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
    if (idPlayer == 1){
        var count_p = state.count_p1;
    }
    else {
        var count_p = state.count_p2;
    }

    if (parseInt(count_p) < 3) {
        if (champIsSelected(champion)){
            addChampInPlayerList(count_p, champion, idPlayer)
        }
    }
}

function addChampInPlayerList(count_p, champion, idPlayer) {
    var list = document.querySelector('#list-p' + idPlayer);
    var champElmt = document.createElement("card");
    champElmt.setAttribute("id", "card" + "_" + idPlayer + "_" + (parseInt(count_p)+1));
    champElmt.setAttribute("data-champ", champion.id);
    var image = document.createElement("img");
    image.src = champion.image.url;
    image.width = "100";
    image.height = "150";
    var img = champElmt.appendChild(image);
    img.setAttribute("data-id", (parseInt(count_p) + 1));
    list.appendChild(champElmt);

    img.addEventListener('click', function (event) {
        removeChamp(idPlayer, event.target.getAttribute("data-id"));
    });

    changePlayer();

    if (idPlayer == 1){
        state.count_p1 = (parseInt(count_p)+1);
    }
    else {
        state.count_p2 = (parseInt(count_p)+1)
    }

    if (state.count_p1 == 3 && state.count_p2 == 3) {
        teamsComplete();
    }
}

function champIsSelected(champion){
    var champSelected = state.champSelected;
    if (champSelected.find(e => e == champion.id) == null){
        champSelected.push(champion.id);
        var buttonToDisable = document.querySelector("#li"+champion.id);
        buttonToDisable.style.display = "none";
        return true;
    }
    return false
    
}


function teamsComplete(){

    var annou = document.getElementById("player-active");
    annou.innerHTML = "  ";
    var startButton = document.querySelector("#fightButton");
    startButton.style.display = "inline";

   
    startButton.className = "btn mt-3 btn-danger text_center";
    startButton.addEventListener('click', function () {
        //faire le calcul
    });

}


function removeChamp(playerId, imageId) {
    var cardToDel = document.getElementById("card" + "_" + playerId + "_" + imageId);
    var championId = cardToDel.getAttribute("data-champ");
    var tmp = state.champSelected.indexOf(championId);
    state.champSelected.splice(tmp,1);

    var buttonToEnable = document.querySelector("#li"+championId);
    buttonToEnable.style.display = "inline";

    cardToDel.remove();

    if (playerId == 1){
        state.count_p1 = (parseInt(state.count_p1)-1);
    }
    else {
        state.count_p2 = (parseInt(state.count_p2)-1)
    }

    var startButton = document.querySelector("#fightButton");
    startButton.style.display = "none";

    var annou = document.getElementById("player-active");
    if (state.count_p1 < 3 && state.count_p2 == 3) {
        annou.innerHTML = "Player 1 select a champion";
        annou.setAttribute("data-id", 1);
    }
    else if (state.count_p2 < 3 && state.count_p1 == 3) {
        annou.innerHTML = "Player 2 select a champion";
        annou.setAttribute("data-id", 2);
    }

}

function changePlayer() {
    var annou = document.getElementById("player-active");
    if (annou.getAttribute("data-id") == 1 && state.count_p2 < 3) {
        annou.innerHTML = "Player 2 select a champion";
        annou.setAttribute("data-id", 2);
    }
    else if (state.count_p1 < 3) {
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
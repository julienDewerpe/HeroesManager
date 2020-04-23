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
    const url = 'https://superheroapi.com/api.php/2463499803965064/search/' + name; //with the access token of Antoine
    //var urlReq = corsURL + url;
    var urlReq =  url;
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
    
    // save champ powerstats
    champElmt.dataset.powerstatsCombat       = champion.powerstats.combat
    champElmt.dataset.powerstatsDurability   = champion.powerstats.durability
    champElmt.dataset.powerstatsIntelligence = champion.powerstats.intelligence
    champElmt.dataset.powerstatsPower        = champion.powerstats.power
    champElmt.dataset.powerstatsSpeed        = champion.powerstats.speed
    champElmt.dataset.powerstatsStrength     = champion.powerstats.strength

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
    if (buttonToEnable != null){
        buttonToEnable.style.display = "inline";
    }

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


document.getElementById("fightButton").addEventListener('click', function () {

    $('#fight-modal').modal()
    resetStats(1)
    resetStats(2)
    cardList1 = document.querySelector("#list-p1").children
    cardList2 = document.querySelector("#list-p2").children
    createStats(cardList1, 1)
    createStats(cardList2, 2)
    showWinner()
    
});

function resetStats(playerId){
    Array.from(document.querySelector("#stats-j" + playerId).children).forEach(
        function(bar, index, array) {
            bar.remove()
        }
    );
}
function showWinner(){
    console.log("Total p1: " + getTotalStats(1))
    console.log("Total p2: " + getTotalStats(2))
    getTotalStats(1) > getTotalStats(2) ? winner(1) : winner(2)
}
function winner(playerId){
    document.querySelector("#winner").textContent = "Le joeur " + playerId + " gagne !"
}
function getTotalStats(playerId){
    total = 0
    Array.from(document.querySelector("#stats-j" + playerId).children).forEach(
        function(bar, index, array) {
            total += parseInt(bar.querySelector(".progress-bar").dataset.value)
        }
    );
    return total
}
function createStats(cardList, playerId){
    durability=0
    combat=0
    intelligence = 0
    power=0
    speed=0
    strength=0

        Array.from(cardList).forEach(
            function(card, index, array) {
                console.log(card)
                durability +=    parseInt(card.dataset.powerstatsCombat) ? parseInt(card.dataset.powerstatsCombat) : 0
                combat +=        parseInt(card.dataset.powerstatsDurability) ? parseInt(card.dataset.powerstatsDurability) : 0
                intelligence +=  parseInt(card.dataset.powerstatsIntelligence) ? parseInt(card.dataset.powerstatsIntelligence) : 0
                power +=         parseInt(card.dataset.powerstatsPower) ? parseInt(card.dataset.powerstatsPower) : 0
                speed +=         parseInt(card.dataset.powerstatsSpeed) ? parseInt(card.dataset.powerstatsSpeed) : 0
                strength +=      parseInt(card.dataset.powerstatsStrength) ? parseInt(card.dataset.powerstatsStrength) : 0
            }
        );

    document.querySelector("#stats-j" + playerId).appendChild(createProgressBar("durability", durability/3))
    document.querySelector("#stats-j" + playerId).appendChild(createProgressBar("combat", combat/3))
    document.querySelector("#stats-j" + playerId).appendChild(createProgressBar("power", power/3))
    document.querySelector("#stats-j" + playerId).appendChild(createProgressBar("speed", speed/3))
    document.querySelector("#stats-j" + playerId).appendChild(createProgressBar("strength", strength/3))
}

function createProgressBar(statName, value){
    var parent = document.createElement("div");
    var p = document.createElement("div");
    p.classList.add("progress")
    var pBar = document.createElement("div");
    pBar.classList.add("progress-bar")
    pBar.classList.add("progress-bar-striped")
    pBar.classList.add("progress-bar-animated")
    pBar.style.width = value + "%"
    pBar.dataset.value = value
    p.appendChild(pBar)
    parent.appendChild(document.createTextNode(statName))
    parent.appendChild(p)
    return parent
}
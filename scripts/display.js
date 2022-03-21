(function() {

    let currentMarker;

    pubsub.subscribe("currentPlayerChanged", setCurrentMarker);
    pubsub.subscribe("gameStarted", bindCells);
    // Cache Dom

    let gameGrid = document.querySelector(".game");
    let gameCells = gameGrid.querySelectorAll(".cell");

    let playersContainer = document.querySelector(".players");
    let players = playersContainer.querySelectorAll(".player");
    
    let markerFactory = new MarkerFactory();
    
    //

    function bindCells() {
        gameCells.forEach(cell => {
            cell.addEventListener("click", putMarker);
        })
    }

    function putMarker(event) {
        if (this !== event.target || this.firstChild) return;
        let element = markerFactory.createMarker(currentMarker);
        event.target.append(element);
        pubsub.publish("playerMadeTurn", gameCells);
    }

    function setCurrentMarker(player) {
        currentMarker = player.marker;
    }
   
    
    return {
    
    }

})();


function MarkerFactory() {
    this.createMarker = (marker) => {
        let domElement;
        if (marker === "cross") {
            domElement = document.createElement("div");
            domElement.className = "cross";
            return domElement;
        } else if (marker === "nought") {
            domElement = document.createElement("div");
            domElement.className = "nought";
            return domElement;
        }
    }
}
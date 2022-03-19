let game = (function() {
    let gameInfo = {}

    pubsub.subscribe("markerSelected", setMarker)
    pubsub.subscribe("playerTypeSelected", setPlayerType)
    pubsub.subscribe("gameStarted", printStart)

    function setMarker(marker) {
        gameInfo.firstPlayerMarker = marker;
        gameInfo.secondPlayerMarker = marker === "X" ? "O" : "X";
        console.log(game.gameInfo)
    }

    function setPlayerType(type) {
        gameInfo.secondPlayerType = type;
        gameInfo.firstPlayerType = "human";
        console.log(game.gameInfo);
    }

    function logInfo() {
        console.log(gameInfo)
    }

    function printStart() {
        console.log("Game Just Started!");
    }
    
    return {
        gameInfo,
        setMarker,
        setPlayerType,
        logInfo,
    }
})();
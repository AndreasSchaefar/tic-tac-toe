(function() {
    let gameInfo = {
        firstPlayer: {},
        secondPlayer: {},
        winCombinations: [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ],
    }

    pubsub.subscribe("markerSelected", setMarker);
    pubsub.subscribe("playerTypeSelected", setPlayerType);
    pubsub.subscribe("gameStarted", setCurrentPlayer);
    pubsub.subscribe("playerMadeTurn", finishGame);
    pubsub.subscribe("playerMadeTurn", changeCurrentPlayer);
    // pubsub.subscribe("playerMadeTurn", )


    function setMarker(marker) {
        gameInfo.firstPlayer.marker = marker;
        gameInfo.secondPlayer.marker = marker === "cross" ? "nought" : "cross";
    }

    function setPlayerType(type) {
        gameInfo.secondPlayer.type = type;
        gameInfo.firstPlayer.type = "human";
    }

    function setCurrentPlayer() {
        gameInfo.currentPlayer = gameInfo.firstPlayer;
        pubsub.publish("currentPlayerChanged", gameInfo.currentPlayer);
    }

    function changeCurrentPlayer() {
        if (gameInfo.currentPlayer === gameInfo.firstPlayer) {
            gameInfo.currentPlayer = gameInfo.secondPlayer;
        } else {
            gameInfo.currentPlayer = gameInfo.firstPlayer;
        }
        pubsub.publish("currentPlayerChanged", gameInfo.currentPlayer);
    }


    function finishGame(cells) {
        if (checkWin(cells)) {
            console.log(`Stop, ${gameInfo.currentPlayer.marker} has won!`)
        }
    }
    

    function checkWin(cells) {
        return gameInfo.winCombinations.some(combination => {
          return combination.every(index => {
            if (cells[index].firstChild) {
                return cells[index].firstChild.classList.contains(gameInfo.currentPlayer.marker);
            }
          })
        })
    }

})();
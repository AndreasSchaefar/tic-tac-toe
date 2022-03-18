function ElementFactory() {
    this.createElement = function(type) {
        let element;
        if (type === "X") {
            element = new Cross();
        } else if (type === "O") {
            element = new Nought();
        }
        element.type = type;
        return element;
    }
}

function Cross() {
    this.shape = document.createElement("div");
    this.shape.className = "cross";
}

function Nought() {
    this.shape = document.createElement("div");
    this.shape.className = "nought";
}

let players = {
    firstPlayerMarker: "X",
    secondPlayerMarker: "O",
    init: function() {
        this.cacheDom();
    },
    cacheDOM: function() {
        this.players = document.querySelector(".players");
        this.firstPlayer = this.players.querySelector("#player-1");
        this.secondPlayer = this.players.querySelector("#player-2");
        this.firstPlayerInput = this.firstPlayer.querySelector("#player-1-selection");
        this.secondPlayerInput = this.secondPlayer.querySelector("#player-2-selection");
    },
    changeMarker: function() {
        
    }


    
}
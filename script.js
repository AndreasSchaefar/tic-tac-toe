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
    elementFactory: new ElementFactory(),
    init: function() {
        this.setPlayers();
    },
    cacheDom: function() {
        // this.players = document.querySelector(".players");
        // this.firstPlayerEle = this.players.querySelector("#playerOne");
        // this.secondPlayer = this.players.querySelector("#playerTwo");
    },
    setPlayers: function() {
        this.firstPlayer = this.elementFactory.createElement("X");
        this.secondPlayer = this.elementFactory.createElement("O");
    },
}


let gameBoard = {
    gameBoard: new Array(9),
    init: function() {
        this.currentPlayer = players.firstPlayer;
        this.cacheDom();
        this.bindEvents();
    },
    cacheDom: function() {
        this.game = document.querySelector(".game");
        this.cells = this.game.querySelectorAll(".cell");
    },
    bindEvents: function() {
        this.cells.forEach(cell => {
            cell.addEventListener("click", e => {
                this.addMarker(e);
            })
        })
    },
    getCellIndex: function(cell) {
        let parent = cell.parentNode;
        let index = Array.prototype.indexOf.call(parent.children, cell)
        return index;
    },
    addMarker: function(event) {
        let cell = event.target;
        let index = this.getCellIndex(cell);
        this.gameBoard[index] = this.currentPlayer.type;
        this.changeCurrentPlayer();
        this._render(cell);
        console.log(`current Board State: ${this.gameBoard}`);

    },
    changeCurrentPlayer: function() {
        if (this.currentPlayer === players.firstPlayer) {
            this.currentPlayer = players.secondPlayer;
        } else {
            this.currentPlayer = players.firstPlayer;
        }
    },
    _render: function(cell) {
        cell.appendChild(this.currentPlayer.shape);
    }
}
players.init()
gameBoard.init()
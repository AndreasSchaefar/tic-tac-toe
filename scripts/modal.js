let modal = (function() {

    // Cache DOM

    let modalContainer = document.querySelector(".modal-container");
    let initialModal = modalContainer.querySelector("#modal-1");
    let playerTypeModal = modalContainer.querySelector("#modal-2");
    let initialModalOptions = initialModal.querySelectorAll(".option");
    let playerTypeModalOptions = playerTypeModal.querySelectorAll(".option");


    // Bind Events

    initialModalOptions.forEach(option => {
        option.addEventListener("click", getSelectedMarker);
    })

    playerTypeModalOptions.forEach(option => {
        option.addEventListener("click", getPlayerType);
    })

    // Events functions

    function getSelectedMarker(event) {
        let selectedMarker = event.target.id === "X" ? "cross" : "nought";
        removeInitialModal();
        pubsub.publish("markerSelected", selectedMarker);
    }

    function getPlayerType(event) {
        let selectedType = event.target.id === "modal-select-human" ? "human" : "computer";
        removeModalContainer();
        pubsub.publish("playerTypeSelected", selectedType)
        pubsub.publish("gameStarted")
    }

    // Events Removing functions

    function removeInitialModal() {
        initialModalOptions.forEach(option => option.removeEventListener("click", getSelectedMarker))
        setTimeout(() => initialModal.remove(), 600)
    }

    function removeModalContainer() {
        playerTypeModalOptions.forEach(option => option.removeEventListener("click", getPlayerType))
        setTimeout(() => modalContainer.remove(), 600)
    }


})();
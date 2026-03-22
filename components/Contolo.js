class Contolo {
    constructor(ct) {
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;
        switch(ct){
            case "keys":
                this.#addListeners();
                break;
            case "dummy":
                this.forward=true;    
        }
    }

    #addListeners() {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case "ArrowUp":
                    this.forward = true;
                    break;
                case "ArrowDown":
                    this.reverse = true;
                    break;
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
            }
        };
    
        const handleKeyUp = (event) => {
            switch (event.key) {
                case "ArrowUp":
                    this.forward = false;
                    break;
                case "ArrowDown":
                    this.reverse = false;
                    break;
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
    }
}

export default Contolo;
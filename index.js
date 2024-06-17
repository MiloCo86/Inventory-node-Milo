const { validateNewGameParams } = require("./src/helpers")
const { addNewGameToData, showAll,showGame, deleteGame, updateGame,showShopCart,addToShopCart,emptyShopCart} = require('./src/inventoryController')
const print = console.log;

function run() {
    const option = process.argv[2]
    const parameters = process.argv.slice(3)
        
    switch (option) {
        case "addNewGame":
            let newGame = validateNewGameParams(parameters) //validate and return an object if the parameters are good
            if(Object.keys(newGame).length !== 0){
                addNewGameToData(newGame)
            }  
            break;
        case "showAll":
            showAll(parameters)
            break;
        case "showGame":
            showGame(parameters)
            break;
        case "deleteGame":
            deleteGame(parameters)
            break;
        case "updateGame":
            updateGame(parameters)
            break;
        case "showShopCart":
            showShopCart();
            break;
        case "addToShopCart":
            addToShopCart(parameters)
            break;
        case "emptyShopCart":
            emptyShopCart()
            break;
        default:
           
    }
    
}

run();
const { readData, writeData, validateShowAllParams, validateShowGameParams, validateDeleteParams,validateUpdateParams } = require("./helpers");
const { nanoid } = require("nanoid");
const colors = require("colors");

const print = console.log;

const data = readData('./data','gameInventory.json')
const shopCart = readData('./data','shopCart.json')



function addNewGameToData (newGame){
    
    const newGameObj = {
        id: nanoid(4),
        name: newGame.name,
        company: newGame.company,
        price: Number(newGame.price),
        inStock: Number(newGame.stock),
        inShopCart: 0
    }
    data.push(newGameObj)

    writeData('./data','gameInventory.json',data)
    print(colors.green('game added successfully'))
}

function showAll(optional){
    
    if(optional.length==0){
       console.log(data) 
    }else{
        let formatedParams = validateShowAllParams(optional)
        let filterData=[]
        if(formatedParams.inStock){
            filterData = data.filter(game=>game.inStock>0)
        }else if(formatedParams.outOfStock){
            filterData = data.filter(game=>game.inStock==0)
        }else if(formatedParams.name){
            filterData = data.filter(game=>game.name.includes(formatedParams.name))
        }else if(formatedParams.company){
            filterData = data.filter(game=>game.company == formatedParams.company)
        }

        if(filterData.length==0){
            print(colors.yellow('No games were found for your search'))
        }else{
            print(filterData)
        }
        
    }
}

function showGame(options){

    let formatedParams = validateShowGameParams(options)
    let game
    if(formatedParams!=undefined){
        if(formatedParams.name){
            game = data.find(game=>game.name ==formatedParams.name)
        }else if(formatedParams.id){
            game = data.find(game=>game.id == formatedParams.id)
        }
    
        if(game==undefined){
            print(colors.yellow('ID or Name game not found'))
        }else{
            print(game)
        }
    }
    

}

function deleteGame(options){

    let formatedParams = validateDeleteParams(options)
    let newData=[]
    let game ={}
    if (formatedParams!=undefined){
        if(formatedParams.id){
            game = data.find(game=>game.id == formatedParams.id)
            newData = data.filter(game=>game.id !=formatedParams.id)
        }

        if(game==undefined){
            print(colors.yellow('ID not found'))
        }else{
            print(colors.green(`${game.name} deleted`))
            writeData('./data','gameInventory.json',newData)
        }

    }
}

function updateGame(options){

    let formatedParams = validateUpdateParams(options)
    let newData=[]
    let game
    if (formatedParams!=undefined){
        if(formatedParams.id){
            game = data.find(game=>game.id == formatedParams.id)
            newData = data.filter(game=>game.id !=formatedParams.id)
            if(formatedParams.name){
                game.name=formatedParams.name
            }
            if(formatedParams.price){
                game.price=formatedParams.price
            }
            if(formatedParams.inStock){
                game.inStock=formatedParams.inStock
            }
            newData.push(game) 
        }

        if(game==undefined){
            print(colors.yellow('ID not found'))
        }else{
            print(colors.green(`${game.name} updated`))
            writeData('./data','gameInventory.json',newData)
        }

    }
}

function showShopCart(){
    if (shopCart.length==0){
        print(colors.yellow('ShopCart is empty'))
    }else{
        print(shopCart)
    }
}

function addToShopCart(id){
    let validID = validateShowGameParams(id)
    
}

module.exports = {
    addNewGameToData,
    showAll,
    showGame,
    deleteGame,
    updateGame,
    showShopCart
}


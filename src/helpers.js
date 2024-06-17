const { readFileSync, writeFileSync } = require("node:fs");
const colors = require("colors");

const print = console.log;

function readData(path, fileName) {
  const data = readFileSync(`${path}/${fileName}`, "utf8");
  return data ? JSON.parse(data) : [];
}

function writeData(path, fileName, data) {
  data = JSON.stringify(data,0,2);
  return writeFileSync(`${path}/${fileName}`, data, { encoding: "utf-8" });
}


//function that validate the paramaters (array) and return and object with the correct keys, used when you add a new Game
function validateNewGameParams(array){
  let newGameFormated = {}
  if (array.length != 4){
    print(colors.red('not enought parameters!'))
    print(colors.yellow('please include name= console= price= and stock='))
  }else{
    
    for (const param of array) {
      if (!param.includes("=")) {
        print(colors.red('invalid format!'))
        print(colors.yellow('correct format name=value company=value price=value and stock=value'))
        newGameFormated = {}
        break
      }else{
        const [key, value] = param.split("=");
        if(key == 'id' || key == 'name' || key == 'company' || key == 'price' || key == 'stock'){
          newGameFormated[key] = value;
        }else{
          print(colors.red(`${key} is not a valid key`))
          newGameFormated = {}
          break
        }
      } 
    }
  }
  
  return newGameFormated
}

function validateShowAllParams (array){
  let showParameters = {}
  if (array.length > 1){
    print(colors.red('Invalid format or too many parameters'))
    print(colors.yellow('correct format: name=" " or company=" " or inStock'))
  }else{
      if(array[0]==='inStock'){
        showParameters.inStock = true
      }else if(array[0]==='outOfStock') {
        showParameters.outOfStock = true
      }else if (!array[0].includes("=")) {
        print(colors.red('invalid format!'))
        print(colors.yellow('correct format: name=" " or company=" " or inStock'))
        showParameters = {}
      }else{
        const [key, value] = array[0].split("=");
        if (key=='name' || key=='company'){
          showParameters[key] = value;
        }else{
          print(colors.red(`${key} is not a valid key`))
          showParameters = {}
        }
        
      } 
    
    return showParameters
  }
}

function validateShowGameParams (array){
  let showParameters
  if (array.length == 0){
    print(colors.red('No parameters found'))
    print(colors.yellow('please add a parameter with the format: name=" " or id=" "'))
  }else if (array.length > 1){
    print(colors.red('Invalid format or too many parameters'))
    print(colors.yellow('correct format: name=" " or id=" "'))
  }else{
      if (!array[0].includes("=")) {
        print(colors.red('invalid format!'))
        print(colors.yellow('correct format: name=" " or id=" "'))
        
      }else{
        const [key, value] = array[0].split("=");
        if (key=='name' || key=='id'){
          showParameters ={}
          showParameters[key] = value;
        }else{
          print(colors.red(`${key} is not a valid key`))
        }
        
      } 
    
    return showParameters
  }
}

function validateDeleteParams (array){
  let validId
  if (array.length == 0){
    print(colors.red('No parameters found'))
    print(colors.yellow('please add a parameter with the format: id=" "'))
  }else if (array.length > 1){
    print(colors.red('Invalid format or too many parameters'))
    print(colors.yellow('correct format: id=" "'))
  }else{
      if (!array[0].includes("=")) {
        print(colors.red('invalid format!'))
        print(colors.yellow('correct format: name=" " or id=" "'))
      }else{
        const [key, value] = array[0].split("=");
        if (key=='id'){
          validId = {}
          validId[key] = value;
        }else{
          print(colors.red(`${key} is not a valid key`))
          
        }    
      } 
    return validId
  }
}


function validateUpdateParams (array){
  let validFormat ={}
  if (array.length == 0){
    print(colors.red('No parameters found'))
    print(colors.yellow('please add a parameter with the format: id=" " and then the values to update'))
  }else if (array.length > 4){
    print(colors.red('Invalid format or too many parameters'))
    print(colors.yellow('correct format: id=" " name=" " price=123 =" "'))
  }else{
      if (!array[0].includes("=")) {
        print(colors.red('invalid format!'))
        print(colors.yellow('correct format: name=" " or id=" " or price=" "'))
      }else{
        for (const param of array) {
          if (!param.includes("=")) {
            print(colors.red('invalid format!'))
            print(colors.yellow('correct format name=value company=value price=value and stock=value'))
            validFormat = undefined
            break
          }else{
            const [key, value] = param.split("=");
            if(key == 'id' || key == 'name' || key == 'company' || key == 'price' || key == 'inStock'){
              validFormat[key] = value;
            }else{
              print(colors.red(`${key} is not a valid key`))
              validFormat = undefined
            }
            
          } 
        }   
      } 
    return validFormat
  }
}

function parseToCart(game){
  return {
    id: game.id,
    name: game.name,
    company: game.company,
    price: Number(game.price),
    quantity: 1,
  }
}


module.exports = {
  readData,
  writeData,
  validateNewGameParams,
  validateShowAllParams,
  validateShowGameParams,
  validateDeleteParams,
  validateUpdateParams,
  parseToCart
};
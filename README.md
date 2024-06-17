# Game inventory 
## Description 🪧

The game inventory app allows the user to manage an inventory of games as well as a shopping cart for that inventory.

## Scripts ⌨️


`addNewGame` add a new game to the inventory.
    
parameters:  
- **name**: main title of the game (use ' ' if the title has more than 1 word )
- **company**: company name
- **price**: in USD format 
- **stock**: amount of items to add

Example:
```
npm run addNewGame name='Prince of Persia' company=Nintendo price=34.99 and stock=4
```


`showAll` show the list of all the games in the inventory, add an optional parameter to filter the results
    
parameters (optional, choose 1):  
- **name**: show all the games that include the word in the title
- **company**: show all the games of a particular company
- **inStock**: show all the games that are in stock
- **outOfStock**: show all the games that are out of stock

Examples:
```
npm run showAll
npm run showAll inStock
npm run showAll company='Play Station'
npm run showAll name=Mario
```


`showGame` show the game that match the ID or Name
    
parameters:  
- **name**: find a game by game
- **id**: find a game by id

Examples:
```
npm run showGame id=1234
npm run showGame name="Prince of Persia"
```


`deleGame` deletes or remove the game that match the ID from the inventory

parameters:  
- **id**: the id of the game to delete

Examples:
```
npm run deleteGame id=1234
```

`updateGame` find and update a game that match the id in the inventory

parameters (id is required, name, company and inStock values are optional, you can update 1 value or all of them): 

- **id**: the id of the game to update
- **name**: new Name of the game
- **company**: new company
- **inStock**: to modify the amount of copies in the inventary

Examples:
```
npm run updateGame id=8l8j name='Captain Toad' price=39.99
npm run updateGame id=QYty company=Microsoft
```

`showShopCart` prints the shop Cart


Examples:
```
npm run showShopCart
```

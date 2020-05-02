import undoable from 'redux-undo'
import { combineReducers } from 'redux'
import {getShuffledCards, getCards} from "./services/Cards.js"
import {can_move_on_card, get_card_value} from "./services/Cards.js"

let initialstate = [] 

let columns=[
    {name:"cardColumn1",count:1},
    {name:"cardColumn2",count:2},
    {name:"cardColumn3",count:3},
    {name:"cardColumn4",count:4},
    {name:"cardColumn5",count:5},
    {name:"cardColumn6",count:6},
    {name:"cardColumn7",count:7},
  ]

let finalColumns = [{name:"finalColumn1"},{name:"finalColumn2"},{name:"finalColumn3"},{name:"finalColumn4"}]

  function backPack(cards){
    let packCards = cards.filter((card)=>card.location === "packColumn")
    cards = cards.filter(card=>card.location!=="packColumn")
    packCards.forEach(card=>{card.location = "mainColumn";card.up=false;})
    cards = [...cards,...packCards]
    return cards  
  }

  function try_turn_up(location,cards){
    if(location === "mainColumn" || location === "packColumn")
    return cards
    cards = cards.slice().reverse()
    let card = cards.find(card=>card.location === location)
    cards.reverse()
    if(card){
      card.up = true
    }
    return cards
  }

  function isColumnEmpty(column,cards){
    let empty = true 
    cards.forEach(card=>{if(card.location === column) empty = false})
    return empty
  }

  function changeColumn(newColumn,oldColumn,dragCards,dropCard,cards){
      if((isColumnEmpty(newColumn, cards) && newColumn.includes("cardColumn") && dragCards[0].name.slice(0,-1) === "K") ||
         (isColumnEmpty(newColumn, cards) && newColumn.includes("finalColumn") && dragCards[0].name.slice(0,-1) === "A") ||
         can_move_on_card(dragCards[0].name,dropCard,newColumn)){
              dragCards = JSON.parse(JSON.stringify([...dragCards]))
              cards = cards.filter(card=>!dragCards.some(c => c.name === card.name))
              dragCards.map(card=>{
                card.location = newColumn;
              })

              cards = [...cards,...dragCards]
              cards = try_turn_up(oldColumn,cards) 
      }
      return cards
  }

  function getEmtyColumn(cards,columns){
    let cols = [...columns]
    cards.forEach(card=>{
      let column = cols.find(col=>col.name===card.location)
      if(column){
        let index = cols.indexOf(column)
        cols.splice(index,1)
      }
    })
    if(cols.length>0)
    return cols[0].name
  }

  function getLastCards(cards){
    let fcCards = {} 
    cards.filter(card=>{
      if(card.location.includes("cardColumn") || card.location.includes("finalColumn"))
        return true
      return false
    }).forEach(card=>{
      fcCards[card.location] = card
    })
    return Object.values(fcCards)
  }

const cards = (state = initialstate, action) => {
  let cards = [...state]
  switch (action.type) {
    case 'newGame':
        cards =  getShuffledCards().map((card)=> ({
        name:card,
        location:"mainColumn",
        up:false
          })  
    );
      let index = 0;
      columns.forEach(column=>{
        for (var i = 0; i < column.count; i++) {
          if(i === column.count-1){
            cards[index].up = true
          }
          cards[index].location = column.name
          index++
        }
      })
      return cards

    case "changeColumn":{ 
      console.log(action.arr)
      let {newColumn,oldColumn,dragCards,dropCard} = action.arr
      cards = [...state]
      cards = changeColumn(newColumn,oldColumn,dragCards,dropCard,cards)
      return cards
    }

    case "autoMove":{
      let {dragCards} = action
      cards = [...state]
      if(get_card_value(dragCards[0].name) === "A"){
        let fColumn = getEmtyColumn(cards,finalColumns)
        if(fColumn)
        return changeColumn(fColumn,dragCards[0].location,dragCards,undefined, cards)
      }
      if(get_card_value(dragCards[0].name) === "K"){
        let cColumn = getEmtyColumn(cards,columns)
        if(cColumn)
        return changeColumn(cColumn,dragCards[0].location,dragCards,undefined, cards)
      }
      

      let fcCards = getLastCards(cards).reverse()
      let moved = false
      fcCards.forEach(dropcard=>{
        if(can_move_on_card(dragCards[0].name,dropcard.name,dropcard.location) && !moved){
          cards = changeColumn(dropcard.location,dragCards[0].location,dragCards,dropcard.name, cards)
          moved = true
          return cards
        }
      })
      return cards
    }

    case "newPack":
        cards = JSON.parse(JSON.stringify([...state]))
        cards = backPack(cards)
          let count = 3
          cards = cards.map(card=>{
            if(card.location === "mainColumn" && count > 0){
              card.location = "packColumn"
              card.up = true
              count--
            }
            return card
          })
          return cards
    default:
      return state;
  }
};


export default combineReducers({
  cards:undoable(cards,{
    undoType: "UNDO_MOVE",
    ignoreInitialState: true,
    // filter: includeAction(["newPack","changeColumn"]),
    clearHistoryType:"CLEAR_HISTORY"
  })
})



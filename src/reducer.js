import {getShuffledCards, getCards} from "./services/Cards.js"

let initialstate = {cards:[],back_button:{disabled:true}} 
let history = []

let columns=[
    {name:"cardColumn1",count:1},
    {name:"cardColumn2",count:2},
    {name:"cardColumn3",count:3},
    {name:"cardColumn4",count:4},
    {name:"cardColumn5",count:5},
    {name:"cardColumn6",count:6},
    {name:"cardColumn7",count:7},
  ]


  function backPack(cards){
    let packCards = cards.filter((card)=>card.location == "packColumn")
    cards = cards.filter(card=>card.location!="packColumn")
    packCards.map(card=>{card.location = "mainColumn";card.up=false;})
    cards = [...cards,...packCards]
    return cards  
  }

  function try_turn_up(location,cards){
    if(location == "mainColumn" || location == "packColumn")
    return cards
    cards = cards.slice().reverse()
    let card = cards.find(card=>card.location == location)
    cards.reverse()
    if(card){
      card.up = true
    }
    return cards
  }


const reducer = (state = initialstate, action) => {
  let cards = [...state.cards]
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
          if(i == column.count-1){
            cards[index].up = true
          }
          cards[index].location = column.name
          index++
        }
      })
      return {cards:cards,back_button:{disabled:true}};

    case "changeColumn": 
    history.push(state.cards)
      let {newColumn,oldColumn,dragCards} = action
      cards = state.cards.filter(card=>!dragCards.some(c => c.name == card.name))
      dragCards.map(card=>{
        card.location = newColumn;
      })
      
      cards = [...cards,...dragCards]
      cards = try_turn_up(oldColumn,cards)
      return {cards:cards,back_button:{disabled:false}};

    case "newPack":
        history.push(state.cards)
        cards = JSON.parse(JSON.stringify([...state.cards]))
        cards = backPack(cards)
          let count = 3
          cards = cards.map(card=>{
            if(card.location == "mainColumn" && count > 0){
              card.location = "packColumn"
              card.up = true
              count--
            }
            return card
          })
          return{cards:cards,back_button:{disabled:false}};
    case "backStep":
      cards = history.pop()
      let disabled = history.length>0?false:true

      return {cards:cards,back_button:{disabled:disabled}}
    default:
      return state;
  }
};

export default reducer;
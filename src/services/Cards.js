const cardsOrder = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]
export function getCards(){
	return [
		"2C","2H","2D","2S",
		"3C","3H","3D","3S",
		"4C","4H","4D","4S",
		"5C","5H","5D","5S",
		"6C","6H","6D","6S",
		"7C","7H","7D","7S",
		"8C","8H","8D","8S",
		"9C","9H","9D","9S",
		"10C","10H","10D","10S",
		"JC","JH","JD","JS",
		"QC","QH","QD","QS",
		"KC","KH","KD","KS",
		"AC","AD","AH","AS",
	]
} 

export function getShuffledCards(){
	let cards = getCards()
	var j, x, i;
    for (i = cards.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = cards[i];
        cards[i] = cards[j];
        cards[j] = x;
    }
    return cards;
} 
 
function isOpposite(t1,t2){
	if((t1 == "H" || t1 == "D") && (t2 == "C" || t2 == "S"))
		return true
	if((t2 == "H" || t2 == "D") && (t1 == "C" || t1 == "S"))
		return true
	return false
}

function less_than_byOne(v1,v2){
	const index1 = cardsOrder.findIndex(i=>v1==i)
	const index2 = cardsOrder.findIndex(i=>v2==i)
	if(index2 - index1 == 1)
		return true
	return false
}

function more_than_byOne(v1,v2){
	const index1 = cardsOrder.findIndex(i=>v1==i)
	const index2 = cardsOrder.findIndex(i=>v2==i)
	if(index1 - index2 == 1)
		return true
	return false
}

function get_card_value(card){
	return card.slice(0,-1)
}

function get_card_type(card){
	return card.slice(-1)
}

export function can_move_on_card(dragCard,dropCard,location){
	
	switch(location) {
  case "cardColumn1":
  case "cardColumn2":
  case "cardColumn3":
  case "cardColumn4":
  case "cardColumn5":
  case "cardColumn6":
  case "cardColumn7":
    if(isOpposite(get_card_type(dragCard),get_card_type(dropCard))){
			if(less_than_byOne(get_card_value(dragCard),get_card_value(dropCard))){

				return true
			}else{
				return false
				
		}
		 
			}else{return false}
    break;
  case "finalColumn1":
  case "finalColumn2":
  case "finalColumn3":
  case "finalColumn4":
  	if(get_card_type(dragCard) == get_card_type(dropCard)){
			if(more_than_byOne(get_card_value(dragCard),get_card_value(dropCard))){

				return true
			}else{
				return false
				
		}
		 
			}else{return false}
    return false
    break;
  default:
    // code block
}
		
	}
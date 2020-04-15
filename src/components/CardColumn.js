import React, {Component} from "react"
import { DropTarget } from 'react-dnd'
import Card from "./Card"
// import Column from "./Column"


class CardColumn extends Component {
	getNextCards=(cardName)=>{
		let index = this.props.cards.findIndex(card=>card.name == cardName)
		if(index>=0){
			 return this.props.cards.slice(index)
		}
	}
	render(){
		// console.log(this.props)
		let top = -15
		let columnName = this.props.name 
		let changeColumn = this.props.changeColumn
									
		
		return this.props.connectDropTarget(
				<div className = "myColumn2 lowerCardColumn" id = {columnName}>

					{this.props.cards.map((card,index)=>{
						let cardStyle = {top:(top+=15)+"%"}
						return <Card name = {card.name}  
									 up = {card.up}
									 index = {index}
									 location = {card.location}
									 style = {cardStyle}
									 changeColumn = {changeColumn}
									 key = {card.name}
									 getNextCards = {this.getNextCards}
									 
									 />
					} 
					)}
									    
				</div>
			)}
			
			
			
	
} 

export default DropTarget(
  "card",
  {
    drop: (props,monitor,component) => {
    	console.log("drop");
				      const hasDroppedOnChild = monitor.didDrop()
				      if (hasDroppedOnChild) {
				        return
				      }
				    return{location:props.name,empty:true}},
    canDrop: (props)=>{
    	if(props.cards.length>0){
    		return false
    	}
    	return true
    }
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
  }),
)(CardColumn)
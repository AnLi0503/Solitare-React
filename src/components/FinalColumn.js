import React, {Component} from "react"
import { DropTarget } from 'react-dnd'
import Card from "./Card"


class FinalColumn extends Component {
	render(){
		// console.log(this.props)
		let columnName = this.props.name 
		let changeColumn = this.props.changeColumn
		
		return this.props.connectDropTarget(
				<div className = "myColumn2 finalColumn" id = {columnName}>

					{this.props.cards.map((card,index)=> <Card name = {card.name}  
													 up = {card.up}
													 index = {index}
													 location = {card.location}
													 changeColumn = {changeColumn}
													 key = {card.name}
													 
													 />)}
									    
				</div>
			)}
			
			
			
	
} 

export default DropTarget(
  "card",
  {
    drop: (props,monitor,component) => {
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
    // isOver: monitor.isOver(), 
    canDrop: monitor.canDrop(),
  }),
)(FinalColumn)
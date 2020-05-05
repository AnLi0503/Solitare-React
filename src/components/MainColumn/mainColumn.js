import React, {Component} from "react"
import "./mainColumn.css"
import Card from "../DragableCard" 




export default class Header extends Component{
	render(){
		 let {cards, onClick} = this.props
		return (
			
				<div className = "myColumn2" id = "mainColumn" onClick = {onClick}>
				
				{cards.map((card,index) => <Card name = {card.name} 
										 up = {card.up}
										 location = {card.location}
										 key = {card.name}
										 index = {index} 
									/>
								)}
			</div>
				
			
			
			)
	}
} 
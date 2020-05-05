import React, {Component} from "react"
import Card from "./DragableCard"


export default class PackColumn extends Component {

	render(){ 
		let translateSize = -16
		let columnName = this.props.name 
		let changeColumn = this.props.changeColumn	
		let count = this.props.cards.length

		return(
			<div className = "myColumn2" 
			id = {columnName}>
				{this.props.cards.map((card,index)=>{
									let divStyle = {
										transform: "translate("+(translateSize+=16)+"%)",
									}
									count--
									let last = count===0?true:false
									let autoMove = count===0?this.props.autoMove:()=>{}
									return <Card name = {card.name} 
												 up = {card.up}
												 location = {columnName}
												 changeColumn = {changeColumn}
												 autoMove = {autoMove}
												 key = {card.name}
												 style = {divStyle}
												 index = {index}
												 last = {last} 
												 isDragging = {card.isDragging}
												 beginDrag = {this.props.beginDrag}
								 				 endDrag = {this.props.endDrag}
												 />
								
							})
						}
			</div>
			)
	}
} 
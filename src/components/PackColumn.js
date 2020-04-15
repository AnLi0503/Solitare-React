import React, {Component} from "react"
import Card from "./Card"


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
									let last = count==0?true:false
									return <Card name = {card.name} 
												 up = {card.up}
												 location = {columnName}
												 changeColumn = {changeColumn}
												 key = {card.name}
												 style = {divStyle}
												 index = {index}
												 last = {last} 
												 />
								
							})
						}
			</div>
			)
	}
} 
import React, {Component} from "react"
import PlaySpace from "../PlaySpace"
import "./board.css"

export default class Board extends Component{
	render(){
		return (
			<div className = "Board">
				<PlaySpace />
			</div>
			)
	}
} 
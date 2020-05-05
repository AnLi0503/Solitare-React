import React, {Component} from "react"
import "./card.css"
import back_img from "./gray_back.png"

class Card extends Component{
	render(){
		let {name, up} = this.props
	    let img = back_img
	    if(up){
	    	img = "../../images/PNG/"+name+".png"
	    }
	    
		return (<img id = {name} src = {img}  alt = "hehe"/>)
	}
	 
	}
 

export default Card
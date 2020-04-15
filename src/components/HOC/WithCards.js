import React, {Component} from "react"
import CardDeck from "../CardDeck" 

const WithCards = (Wrapped) =>{
	return class extends Component{
		render(){
			return (<Wrapped {...this.props} cards = {<CardDeck />} />)
		}
	}
}

export default WithCards
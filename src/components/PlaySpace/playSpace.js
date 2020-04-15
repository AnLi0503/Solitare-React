import React, {Component} from "react"
import "./playSpace.css"
import CardColumn from "../CardColumn"  
import PackColumn from "../PackColumn"  
import MainColumn from "../MainColumn"  
import FinalColumn from "../FinalColumn"  
import {getShuffledCards, getCards} from "../../services/Cards.js"


class playSpace extends Component{
	constructor(props){
		super(props)			
		this.state = {
			cards:[],
			back_button:{disabled:true}
		}

	}

	history = [];
	back = false;
	ngame = false;

	columns=[
		{name:"cardColumn1",count:1},
		{name:"cardColumn2",count:2},
		{name:"cardColumn3",count:3},
		{name:"cardColumn4",count:4},
		{name:"cardColumn5",count:5},
		{name:"cardColumn6",count:6},
		{name:"cardColumn7",count:7},
	]

	getCards = ()=>{
		return getShuffledCards().map((card)=> ({
				name:card,
			 	location:"mainColumn",
			 	up:false
			    })	
		);
	}

	newGame = ()=>{
		this.history = []
		this.ngame = true
		let cards = this.getCards()
		let index = 0;
		this.columns.forEach(column=>{
			for (var i = 0; i < column.count; i++) {
				if(i == column.count-1){
					cards[index].up = true
				}
				cards[index].location = column.name
				index++
			}
		})
		this.setState({cards:cards},()=>{console.log("new game callback")})
	}
	

	backPack = (cards)=>{
		let packCards = cards.filter((card)=>card.location == "packColumn")
		cards = cards.filter(card=>card.location!="packColumn")
		packCards.map(card=>{card.location = "mainColumn";card.up=false;})
		cards = [...cards,...packCards]
		return cards	
	}

	newPack = ()=>{
		let cards = JSON.parse(JSON.stringify([...this.state.cards]))
		cards = this.backPack(cards)
			let count = 3
			cards = cards.map(card=>{
				if(card.location == "mainColumn" && count > 0){
					card.location = "packColumn"
					card.up = true
					count--
				}
				return card
			})
			this.setState({cards:cards})
	 
	}

	change_column = (newColumn,oldColumn,dragCards)=>{
		let cards = this.state.cards.filter(card=>!dragCards.some(c => c.name == card.name))
		cards = JSON.parse(JSON.stringify(cards))
		dragCards = JSON.parse(JSON.stringify(dragCards))
		dragCards.map(card=>{
			card.location = newColumn;
		})
		
		cards = [...cards,...dragCards]
		cards = this.try_turn_up(oldColumn,cards)
		this.setState({cards:cards})
		if(this.checkWin()){
					alert("WIN")
					this.newGame()
				}
	}


	try_turn_up = (location,cards)=>{
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


	checkWin=()=>{
		let count = 0
		this.state.cards.forEach(card=>{
			if(card.location.slice(0,-1) == "finalColumn")
				count++
		})
			return count==52?true:false
	}

	backStep = ()=>{
		let cards = this.history.pop()
		this.back = true
		this.setState({cards:cards})
	}

	componentDidUpdate(prevProps, prevState){		
		if(this.state.cards !== prevState.cards){
			if(!this.back && !this.ngame){
				let cards = JSON.parse(JSON.stringify(prevState.cards))
			    this.history.push(cards)
			    if(this.history.length>0)
			    this.setState({back_button:{disabled:false}})
			}else if(this.back){
				if(this.history.length==0){
					this.setState({back_button:{disabled:true}},()=>{this.back = false})
				}
				this.back = false
			}else if(this.ngame){
				this.setState({back_button:{disabled:true}},()=>{this.ngame=false})
			}
		  
		}
		// console.log("back " + this.back)
		// console.log("ngame " + this.ngame)
	}


	componentDidMount(){
		this.newGame()		
	}

	render(){
		console.log(this.state)
		return (
			<React.Fragment>
			<div className = "menu container">
				<button type = "button" className = "btn btn-secondary" onClick = {this.newGame}>New Game</button>
				<button type = "button" className = "btn btn-secondary" onClick = {this.backStep} 
				disabled = {this.state.back_button.disabled}>Back</button>

			</div>
			<div className = "playSpace container">
				<MainColumn onClick = {this.newPack} cards = {this.state.cards.filter(card=>card.location == "mainColumn")}/>	
				<PackColumn name = "packColumn" cards = {this.state.cards.filter(card=>card.location == "packColumn")} changeColumn = {this.change_column}/>
		  		
		  		<FinalColumn name = "finalColumn1" cards = {this.state.cards.filter(card=>card.location == "finalColumn1")} changeColumn = {this.change_column}/>
		  		<FinalColumn name = "finalColumn2" cards = {this.state.cards.filter(card=>card.location == "finalColumn2")} changeColumn = {this.change_column}/>
		  		<FinalColumn name = "finalColumn3" cards = {this.state.cards.filter(card=>card.location == "finalColumn3")} changeColumn = {this.change_column}/>
		  		<FinalColumn name = "finalColumn4" cards = {this.state.cards.filter(card=>card.location == "finalColumn4")} changeColumn = {this.change_column}/>
		  		
		  		<CardColumn name = "cardColumn1" cards = {this.state.cards.filter(card=>card.location == "cardColumn1")} changeColumn = {this.change_column} />		
		  		<CardColumn name = "cardColumn2" cards = {this.state.cards.filter(card=>card.location == "cardColumn2")} changeColumn = {this.change_column} />		
		  		<CardColumn name = "cardColumn3" cards = {this.state.cards.filter(card=>card.location == "cardColumn3")} changeColumn = {this.change_column} />		
		  		<CardColumn name = "cardColumn4" cards = {this.state.cards.filter(card=>card.location == "cardColumn4")} changeColumn = {this.change_column} />		
		  		<CardColumn name = "cardColumn5" cards = {this.state.cards.filter(card=>card.location == "cardColumn5")} changeColumn = {this.change_column} />		
		  		<CardColumn name = "cardColumn6" cards = {this.state.cards.filter(card=>card.location == "cardColumn6")} changeColumn = {this.change_column} />		
		  		<CardColumn name = "cardColumn7" cards = {this.state.cards.filter(card=>card.location == "cardColumn7")} changeColumn = {this.change_column} />								  	
		     </div>
		     </React.Fragment>
			
			)
	}
} 

export default playSpace
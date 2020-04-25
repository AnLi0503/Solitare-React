import React, {Component} from "react"
import "./playSpace.css"
import CardColumn from "../CardColumn"  
import PackColumn from "../PackColumn"  
import MainColumn from "../MainColumn"  
import FinalColumn from "../FinalColumn"  
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { bindActionCreators } from 'redux';

class playSpace extends Component{
	checkWin=()=>{
		let count = 0
		this.props.cards.forEach(card=>{
			if(card.location.slice(0,-1) == "finalColumn")
				count++
		})
			return count==52?true:false
	}

	componentDidUpdate(){		
		if(this.checkWin()){
            alert("WIN")
            this.props.newGame()
          }
	}

	componentDidMount(){	
		this.props.newGame()	
	}

	render(){
		console.log(this.props)
		return (
			<React.Fragment>
			<div className = "menu container">
				<button type = "button" className = "btn btn-secondary" onClick = {this.props.newGame}>New Game</button>
				<button type = "button" className = "btn btn-secondary" onClick = {this.props.backStep} 
				disabled = {this.props.back_button}>Back</button>
     
			</div>
			<div className = "playSpace container">
				<MainColumn onClick = {this.props.newPack} cards = {this.props.cards.filter(card=>card.location == "mainColumn")}/>	
				<PackColumn name = "packColumn" cards = {this.props.cards.filter(card=>card.location == "packColumn")} changeColumn = {this.props.changeColumn}/>
		  		
		  		<FinalColumn name = "finalColumn1" cards = {this.props.cards.filter(card=>card.location == "finalColumn1")} changeColumn = {this.props.changeColumn}/>
		  		<FinalColumn name = "finalColumn2" cards = {this.props.cards.filter(card=>card.location == "finalColumn2")} changeColumn = {this.props.changeColumn}/>
		  		<FinalColumn name = "finalColumn3" cards = {this.props.cards.filter(card=>card.location == "finalColumn3")} changeColumn = {this.props.changeColumn}/>
		  		<FinalColumn name = "finalColumn4" cards = {this.props.cards.filter(card=>card.location == "finalColumn4")} changeColumn = {this.props.changeColumn}/>
		  		
		  		<CardColumn name = "cardColumn1" cards = {this.props.cards.filter(card=>card.location == "cardColumn1")} changeColumn = {this.props.changeColumn} />		
		  		<CardColumn name = "cardColumn2" cards = {this.props.cards.filter(card=>card.location == "cardColumn2")} changeColumn = {this.props.changeColumn} />		
		  		<CardColumn name = "cardColumn3" cards = {this.props.cards.filter(card=>card.location == "cardColumn3")} changeColumn = {this.props.changeColumn} />		
		  		<CardColumn name = "cardColumn4" cards = {this.props.cards.filter(card=>card.location == "cardColumn4")} changeColumn = {this.props.changeColumn} />		
		  		<CardColumn name = "cardColumn5" cards = {this.props.cards.filter(card=>card.location == "cardColumn5")} changeColumn = {this.props.changeColumn} />		
		  		<CardColumn name = "cardColumn6" cards = {this.props.cards.filter(card=>card.location == "cardColumn6")} changeColumn = {this.props.changeColumn} />		
		  		<CardColumn name = "cardColumn7" cards = {this.props.cards.filter(card=>card.location == "cardColumn7")} changeColumn = {this.props.changeColumn} />								  	
		     </div>
		     </React.Fragment>
			)
	}
} 

const mapStateToProps = (state) => {
  return {
    cards: state.cards,
    back_button:state.back_button.disabled,
  };
};

export default connect(mapStateToProps,actions)(playSpace)
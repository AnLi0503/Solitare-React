import React, {Component} from "react"
import "./card.css"
import back_img from "./gray_back.png"
import { DragSource } from 'react-dnd'
import { DropTarget } from 'react-dnd'
import {can_move_on_card} from "../../services/Cards.js"

// const cache = {};

// function importAll (r) {
//   r.keys().forEach(key =>{ let img=key.slice(2,-4); cache[img] = r(key)});
// }
// importAll(require.context("../../images/PNG",false,/\.png$/))
// console.log(cache)



class Card extends Component{
	constructor(props){
		super(props)
		this.state = {img:back_img}
	}

	componentDidMount(){
		if(this.props.up){
			import("../../images/PNG/"+this.props.name+".png").then(img2=>this.setState({img:img2.default}))
		}	
	}

	render(){
		//console.log(this.props)
		let {name, up, style, index,isDragging,location} = this.props
	    // let img = back_img
	    // if(up){
	    // 	import("../../images/PNG/"+name+".png").then(img2=>img = img2.default)
	    // }
	    
		return this.props.connectDragSource(
				<div className = "play-card" ref = {this.props.connectDropTarget}
				     style = {style} id = "">
				     <img id = "as" src = {this.state.img} style = {{opacity: isDragging ? 0.5 : 1,}} alt = "hehe"/>
				</div>
				)
	}
	 
	}
 

export default DropTarget(
  "card",
  {
    drop: (props,monitor,component) => {console.log("drop");
    				  // console.log("card")
    				  // console.log(component)
				      // console.log(props)
				      // console.log(monitor.getDropResult())
				    return(props)},
	canDrop: (props) =>{
			// console.log(props)

		return props.up
	}
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    // isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
)(DragSource(
	"card",
	{
		beginDrag: (props) => {return{}},
		endDrag:(props,monitor)=>{
			const diddrop = monitor.didDrop()
			const dropResult = monitor.getDropResult()
			let cards = [{name:props.name,up:props.up}]
			if(props.getNextCards)
			   cards = props.getNextCards(props.name)
			if(diddrop && dropResult){
				if(dropResult.empty){
					console.log("empty")
					const location = dropResult.location.slice(0,-1)
					if(location == "cardColumn" && props.name.slice(0,-1) == "K")
					  props.changeColumn(dropResult.location,props.location, cards)
					if(location == "finalColumn" && props.name.slice(0,-1) == "A")
					  props.changeColumn(dropResult.location,props.location, cards)
					
				}
				else if(can_move_on_card(props.name,dropResult.name,dropResult.location)){
					props.changeColumn(dropResult.location,props.location, cards)
				}

			}

		},
		canDrag:(props)=>{
			if(props.location == "packColumn")
				return props.last	
			return props.up
		}
	},
	(connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    canDrag:monitor.canDrag(),
  }),
	)(Card))
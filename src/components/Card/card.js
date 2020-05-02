import React, {Component} from "react"
import "./card.css"
import back_img from "./gray_back.png"
import { DragSource } from 'react-dnd'
import { DropTarget } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

class Card extends Component{
	componentDidMount() {
    const { connectDragPreview } = this.props
    if (connectDragPreview) {
      connectDragPreview(getEmptyImage(), {
        captureDraggingState: true,
      })
    }
  }

	render(){
		let {name, up, style,autoMove,isDragging,location} = this.props
	    let img = back_img
	    let onDoubleClick = ()=>{}
	    if(autoMove){
	    	let cards = [{name:name,location:location,up:up}]
			if(this.props.getNextCards)
			   cards = this.props.getNextCards(name)
	    	onDoubleClick = ()=>{this.props.autoMove(cards)}
	    }
	    if(up){
	    	img = "../../images/PNG/"+name+".png"
	    }
	    let img_style = {opacity: isDragging ? 0 : 1,}
	    
		return this.props.connectDragSource(
				<div draggable = "false" 
				     id = {name+"id"}
				     className = "play-card" 
				     ref = {this.props.connectDropTarget}
				     style = {style}  
				     onDoubleClick = {onDoubleClick}>
				       <img id = {name} src = {img} style = {img_style} alt = "hehe"/>
				</div>
				)
	}
	 
	}
 

export default DropTarget(
  "card",
  {
    drop: (props,monitor,component) => {console.log("drop");
				    return(props)},
	canDrop: (props) =>{
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
		beginDrag: (props) => {
			// console.log("dragbegin")
			return props},
		endDrag:(props,monitor)=>{
			const diddrop = monitor.didDrop()
			const dropResult = monitor.getDropResult()
			let cards = [{name:props.name,up:props.up}]
			if(props.getNextCards)
			   cards = props.getNextCards(props.name)
			if(diddrop && dropResult){
				props.changeColumn({newColumn:dropResult.location,
					oldColumn:props.location,
					dragCards:cards,
					dropCard:dropResult.name})
			}

		},
		canDrag:(props)=>{
			if(props.location === "packColumn")
				return props.last	
			return props.up
		}
	},
	(connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    canDrag:monitor.canDrag(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }),
	)(Card))
import React, {Component} from "react"
import { DragSource } from 'react-dnd'
import { DropTarget } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import Card from './Card'

class DragableCard extends Component{
	componentDidMount() {
    const { connectDragPreview } = this.props
    if (connectDragPreview) {
      connectDragPreview(getEmptyImage(), {
        captureDraggingState: true,
      })
    }
  }

	render (){
		let {name, up, style,isDragging,autoMove,location} = this.props
		let onDoubleClick = ()=>{}
	    if(autoMove){
	    	let cards = [{name:name,location:location,up:up}]
			if(this.props.getNextCards)
			   cards = this.props.getNextCards(name)
	    	onDoubleClick = ()=>{this.props.autoMove(cards)}
	    }

	    if(isDragging){  	
	     	style = {...style,opacity:0,}
	    }
		return this.props.connectDragSource(
			<div id = {name+"id"}
				 className = "play-card" 
				 style = {style}  
				 onDoubleClick = {onDoubleClick}
				 ref = {this.props.connectDropTarget}
			     draggable = "false"
			     >
			 <Card {...this.props}/>
			 </div>)
	}
	 
}
 

export default DropTarget(
  "card",
  {
    drop: (props,monitor,component) => props,
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
			props.beginDrag(props.name)
			return props},
		endDrag:(props,monitor)=>{
			props.endDrag(props.name)
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
		},

	},
	(connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    canDrag:monitor.canDrag(),
    connectDragPreview: connect.dragPreview(),
    // isDragging: monitor.isDragging(),
  }),
	)(DragableCard))
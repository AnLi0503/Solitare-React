import React from 'react'
import { DragLayer } from 'react-dnd'
import Card from "./Card"

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
}

function getItemStyles(props) {
  const { currentOffset } = props
  if (!currentOffset) {
    return {
      display: 'none',
    }
  }

  const { x, y } = currentOffset
  const transform = `translate(${x}px, ${y}px)`
  return {
  	width:"8%",
    transform: transform,
    WebkitTransform: transform,
    // height:"50%"
  }
}

class CustomDragLayer extends React.Component{
  render(){
  	// console.log(this.props)
  	if (!this.props.isDragging) {
	    return null
	  }
	if (!this.props.currentOffset) {
	    return null
	  }

	let top = 85
	let cards = [{name:this.props.item.name,up:true,isDragging:true}]
	if(this.props.item.getNextCards){
		cards = this.props.item.getNextCards(this.props.item.name)
	}
	// console.log(cards)

	cards = cards.map((card,index)=>{
		let cardStyle = {transform:"translate(0%,"+(top-=85)+"%)"}
		return(
					<div className = "play-card" style = {cardStyle} key={index}>
				     <Card name = {card.name}
				     	   up = {card.up}
					 />
				    </div>
		    )
	})
			     	   
	// console.log(cards)
  	return(
  		<div style = {layerStyles}>
  			<div style = {getItemStyles(this.props)}>
  			  {cards}
  			</div>
  		</div>
  		)
  }
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    // itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }
}

export default DragLayer(collect)(CustomDragLayer)
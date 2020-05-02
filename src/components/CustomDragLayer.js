import React from 'react'
import { DragLayer } from 'react-dnd'

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
  	width:"9.5%",
    transform: transform,
    WebkitTransform: transform,
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

	let img = require("../images/PNG/"+this.props.item.name+".png")

  	return(
  		<div style = {layerStyles}>
  			<div className = "play-card"
				     style = {getItemStyles(this.props)} id = "">
				     <img id = "as" src = {img} alt = "hehe"/>
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
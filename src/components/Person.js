import React from "react"

export default class Person extends React.Component {
  render() {
    const { provided, innerRef } = this.props;
    return (
      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={innerRef}
      >
        'I am a person, I think..'
      </div>
    );
  }
}
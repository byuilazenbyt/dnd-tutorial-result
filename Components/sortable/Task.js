import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

const Container = styled.div`
  box-shadow: ${props => (props.isDragging ? '1px 50px 118px 14px rgba(0,0,0,0.63)' : 'none')};
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  background-color: ${props => (
          props.isDragDisabled
                  ? '#636b7d'
                  : props.isDragging
                          ? '#5283bc'
                          : '#eee'
  )};
  transition: background-color 0.2s ease, color 0.2s ease;
  color: ${props => (
          props.isDragDisabled
                  ? '#fff'
                  : props.isDragging
                          ? 'white'
                          : 'black'
  )};
  display: flex;
  cursor: ${props => (props.isDragDisabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.isDragDisabled ? 0.5 : 1)};
`

export default class Task extends React.Component {
  render = () => {
    return (
      <Draggable
        draggableId={this.props.task.id}
        index={this.props.index}
      >
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {this.props.task.content}
          </Container>
        )}
      </Draggable>
    )
  }
}

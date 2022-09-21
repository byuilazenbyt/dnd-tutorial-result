import React from 'react'
import { Container } from 'react-bootstrap'
import Title from './Title'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import Task from './Task'
import styled from 'styled-components'

const TaskList = styled.div`
  background-color: ${props => (props.isDraggingOver ? '#842319' : '#5283bc')};
  padding: 1rem;
  border-radius: 6px;
  color: white;
  transition: background-color 0.2s ease;
  flex-grow: 1;
  min-height: 100px;
`

export default class Column extends React.Component {
  render = () => {
    return (
          <Container
            className={'my-3 shadow rounded py-3 mx-1 d-flex flex-column'}
          >
            <Title>{this.props.column.title}</Title>
            <Droppable
              droppableId={this.props.column.id}
              isDropDisabled={this.props.isDropDisabled}
              type={"task"}
            >
              {(provided, snapshot) => (
                <TaskList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {this.props.tasks.map((task, index) => (<Task key={task.id} task={task} index={index}/>))}
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          </Container>
    )
  }
}
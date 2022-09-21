import React from 'react'
import { Container } from 'react-bootstrap'
import Column from '../Components/sortable/Column'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import styles from '../styles/sortable.module.css'

const ColumnContainer = styled.div``;
ColumnContainer.defaultProps = {className: styles.columnContainer};

export default class Sortable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tasks: {
        'task-1': { id: 'task-1', content: 'Take out the garbage' },
        'task-2': { id: 'task-2', content: 'Watch my favorite show' },
        'task-3': { id: 'task-3', content: 'Charge my phone' },
        'task-4': { id: 'task-4', content: 'Cook dinner' },
      },
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'CSV Fields',
          taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
        },
        'column-2': {
          id: 'column-2',
          title: 'First name',
          taskIds: [],
        },
      },
      columnOrder: ['column-1', 'column-2'],
    }
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    const startTaskIds = Array.from(start.taskIds);

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };

      this.setState(newState);
      return;
    }
    if (Array.from(finish.taskIds).length >= 1 && finish.id === 'column-2') {
      console.warn('Cannot add more than 1 task to this column');
      return;
    }
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    }

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    this.setState(newState);
  }

  render = () => (
    <Container className={this.props.isDragging ? styles.background : styles.notBackground}>
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
        <Droppable
          droppableId={'all-columns'}
          direction={'horizontal'}
          type={'column'}
        >
          {provided => (
            <ColumnContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {this.state.columnOrder.map((columnId, index) => {
                const column = this.state.columns[columnId]
                const tasks = column.taskIds.map((taskId) => this.state.tasks[taskId])

                return <Column key={columnId} column={column} tasks={tasks}/>
              })}
            </ColumnContainer>
            )}
        </Droppable>
      </DragDropContext>
    </Container>
  )
}

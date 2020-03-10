import React, { PureComponent, Fragment } from 'react';
import { DragDropContext  } from 'react-beautiful-dnd';

import List from './components/list';
import Header from './components/header';

import './App.css';

class App extends PureComponent {
  
  state = {
      toDo: ['Armen', 'David', 'Karen', 'Hayk', 'Karlen', ''],
      completed: ['Arman', 'Vardan', 'Suren', ''],
  };  
  
  handleChange = (e, index, dataName) => {
    const arr = [...this.state[dataName]];    
    arr.splice(index, 1, e.target.value);

    if (index === arr.length - 1) {
      arr.push('');
    } else if (e.target.value === '') {
      arr.splice(index, 1);
    }

    this.setState({ [dataName]: arr });
 }

  handleDrag = ({ source, destination }) => {

    const { index: startIndex, droppableId } = source;
    const { index: endIndex } = destination;
    const dragResult = [...this.state[droppableId]];
    const dropResult = [...this.state[destination.droppableId]];
    
    if (endIndex === dropResult.length-1 || endIndex === dropResult.length) {
      return;
    };
    
    const [removed] = dragResult.splice(startIndex, 1);
    
    this.setState(() => {

      if(droppableId !== destination.droppableId) {
        dropResult.splice(endIndex, 0, removed);
        return { [droppableId]: dragResult, [destination.droppableId]: dropResult };
      };
      dragResult.splice(endIndex, 0, removed);
      return {
        [droppableId]: dragResult
      };
    });
 
  };

  render() {
    return (
      <Fragment>
        <Header title="Users"/>
        <div className="flex">  
          <DragDropContext onDragEnd={this.handleDrag}>
            <List 
              data={this.state.toDo}
              handleChange={this.handleChange} 
              dataName="toDo" 
            />
            <List 
              data={this.state.completed}
              handleChange={this.handleChange}
              dataName="completed" 
            />
          </DragDropContext>
        </div>
      </Fragment>
    );
  }
};

export default App;

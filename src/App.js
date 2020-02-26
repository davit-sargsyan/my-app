import React, { PureComponent, Fragment } from 'react';
import { DragDropContext  } from 'react-beautiful-dnd';

import List from './components/list'
import Header from './components/header'
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
      arr.push("");
    } else if (e.target.value === "") {
      arr.splice(index, 1);
    }

    this.setState({ [dataName]: arr });
 }

  handleDrag = ({ source, destination }) => {

    const { index: startIndex, droppableId: dragColumn } = source;
    const { index: endIndex, droppableId: dropColumn } = destination;
    
    if(dragColumn === dropColumn) {
      const result = [...this.state[dragColumn]];
      
      if (endIndex === result.length -1) {
        return;
      }

      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
  
      this.setState({ [dragColumn]: result });
    } else {
      const dragResult = [...this.state[dragColumn]];
      const dropResult = [...this.state[dropColumn]];

      if (endIndex === dropResult.length -1) {
        return;
      }

      const [changed] = dragResult.splice(startIndex, 1);
      dropResult.splice(endIndex, 0, changed);
      this.setState({ [dragColumn]: dragResult, [dropColumn]: dropResult   });
    }    
  }

  render() {
    return (
      <Fragment>
        <Header title='Users'/>
        <div className='flex'>  
          <DragDropContext onDragEnd={this.handleDrag}>
            <List 
              data={this.state.toDo}
              handleChange={this.handleChange} 
              dataName='toDo' 
            />
            <List 
              data={this.state.completed}
              handleChange={this.handleChange}
              dataName='completed' 
            />
          </DragDropContext>
        </div>
      </Fragment>
    );
  }
};

export default App;

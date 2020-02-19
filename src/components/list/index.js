import React from 'react';

import { Droppable, Draggable } from 'react-beautiful-dnd';

export default class List extends React.PureComponent{
    render () {
        return (
            <Droppable droppableId={this.props.dataName}>
                {(provided) => (
                    <ol
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {this.props.data.map((value, index, arr) => (
                            <Draggable
                                key={index}
                                isDragDisabled={index === arr.length -1} 
                                draggableId={`${this.props.dataName}${index}`}
                                index={index}
                            >
                                {(provided) => (
                                    <li 
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <input
                                            className='noBorders'
                                            onChange={(event) => this.props.handleChange(event, index, this.props.dataName)}
                                            value={value}
                                        />
                                    </li>
                                )}
                            </Draggable>
                        ))}
                    </ol>
                )}
            </Droppable>
        )
    }
        
}

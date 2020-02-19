import React from 'react';

import { Droppable, Draggable } from 'react-beautiful-dnd';

const List = ({ dataName, data, handleChange }) => {

  return (
    <Droppable droppableId={dataName}>
        {provided => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {data.map((value, index, arr) => (
              <Draggable
                key={index}
                isDragDisabled={index === arr.length -1} 
                draggableId={`${dataName}${index}`}
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
                      onChange={(event) => handleChange(event, index, dataName)}
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

export default List;
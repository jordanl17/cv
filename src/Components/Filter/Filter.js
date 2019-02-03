import React from 'react';

const Filter = props => {
  return Object.entries(props.lifeEventCategories).map(([name, selected]) => {
    return (
      <button type="button" key={name} onClick={() => props.onCategorySelect(name)}>
        {name} {selected ? 'on' : 'off'}
      </button>
    );
  });
};

export default Filter;

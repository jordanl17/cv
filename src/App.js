import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import mockEvents from './mockEvents';

export default class App extends Component {
  state = {
    activeLifeEvent: undefined,
    lifeEvents: [],
    lifeEventCategories: {
      All: true
    }
  };

  componentWillMount = () => {
    const { lifeEvents } = mockEvents;
    const lifeEventCategories = new Set(lifeEvents.map(({ category }) => category));
    const stateCategories = [...lifeEventCategories].reduce(
      (categories, category) => {
        return {
          ...categories,
          [category]: false
        };
      },
      { ...this.state.lifeEventCategories }
    );
    this.setState({
      lifeEvents,
      lifeEventCategories: stateCategories
    });
  };

  onCategorySelect = selectedCategory => {
    let lifeEventCategories = {};
    Object.keys(this.state.lifeEventCategories).forEach(stateCategory => {
      lifeEventCategories = {
        ...lifeEventCategories,
        [stateCategory]: stateCategory === selectedCategory
      };
    });
    this.setState({
      lifeEventCategories
    });
  };

  renderCategoryButtons = () => {
    return Object.entries(this.state.lifeEventCategories).map(([name, selected]) => {
      return (
        <button key={name} onClick={() => this.onCategorySelect(name)}>
          {name} {selected ? 'on' : 'off'}
        </button>
      );
    });
  };

  renderLifeEvents = () => {
    // take only first element of returned array to extract name
    const [selectedCategory] = Object.entries(this.state.lifeEventCategories).find(
      ([categoryName, selected]) => selected
    );
    const selectedEvents = this.state.lifeEvents.filter(event => {
      return selectedCategory === 'All' || event.category === selectedCategory;
    });

    return selectedEvents.map(event => {
      return <div>{event.title}</div>;
    });
  };

  render() {
    return (
      <div className="App">
        {this.renderCategoryButtons()}
        {this.renderLifeEvents()}
      </div>
    );
  }
}

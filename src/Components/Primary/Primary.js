import React, { Component } from 'react';
import Filter from '../Filter';
import LifeEvent from '../LifeEvent';
import EventsTimeline from '../EventsTimeline';

import mockEvents from '../../mockEvents';

export default class Primary extends Component {
  state = {
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
      return <LifeEvent key={event.id} event={event} />;
    });
  };

  render() {
    return (
      <div className="Timeline">
        <Filter
          lifeEventCategories={this.state.lifeEventCategories}
          onCategorySelect={this.onCategorySelect}
        />
        <EventsTimeline
          lifeEvents={this.state.lifeEvents}
          lifeEventCategories={this.state.lifeEventCategories}
        />
      </div>
    );
  }
}

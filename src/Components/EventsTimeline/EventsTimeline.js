import React from 'react';

import LifeEvent from '../LifeEvent';

export default class EventsTimeline extends React.Component {
  state = {
    activeEvent: undefined
  };
  renderLifeEvents = () => {
    // take only first element of returned array to extract name
    const [selectedCategory] = Object.entries(this.props.lifeEventCategories).find(
      ([categoryName, selected]) => selected
    );
    const selectedEvents = this.props.lifeEvents.filter(event => {
      return selectedCategory === 'All' || event.category === selectedCategory;
    });

    return selectedEvents.map(event => {
      return (
        <LifeEvent
          onEventHighlight={id => this.onEventHighlight(id)}
          key={event.id}
          event={event}
        />
      );
    });
  };

  onEventHighlight = id => {
    this.setState({
      activeEvent: id
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.renderLifeEvents()}
        {this.state.activeEvent}
      </React.Fragment>
    );
  }
}

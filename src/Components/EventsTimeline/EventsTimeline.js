import React from 'react';

import LifeEvent from '../LifeEvent';

export default class EventsTimeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeEvent: undefined,
      manualDisplay: 0
    };
    this.whileNoSelection();
  }
  renderLifeEvents = () => {
    // take only first element of returned array to extract name
    const [selectedCategory] = Object.entries(this.props.lifeEventCategories).find(
      ([categoryName, selected]) => selected
    );
    const selectedEvents = this.props.lifeEvents.filter(event => {
      return selectedCategory === 'All' || event.category === selectedCategory;
    });

    return selectedEvents.map((event, index) => {
      return (
        <LifeEvent
          onEventHighlight={id => this.onEventHighlight(id)}
          key={event.id}
          event={event}
          forceShow={this.state.manualDisplay === index}
        />
      );
    });
  };

  whileNoSelection = () => {
    this.setState(prevState => {
      return {
        manualDisplay:
          prevState.manualDisplay + 1 >= this.props.lifeEvents.length
            ? 0
            : prevState.manualDisplay + 1
      };
    });
    setTimeout(() => {
      if (!this.state.activeEvent) {
        this.whileNoSelection();
      }
    }, 3000);
  };

  onEventHighlight = id => {
    this.setState({
      activeEvent: this.props.lifeEvents[id]
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.renderLifeEvents()}
        {this.state.activeEvent
          ? this.state.activeEvent.content
          : this.props.lifeEvents[this.state.manualDisplay].content}
      </React.Fragment>
    );
  }
}

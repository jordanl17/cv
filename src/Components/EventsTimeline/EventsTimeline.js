import React from 'react';

import LifeEvent from '../LifeEvent';

export default class EventsTimeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeEvent: undefined,
      lifeEvents: this.props.lifeEvents
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
          key={`${event.id}-${event.forceShow}`}
          event={event}
          forceShow={this.state.manualDisplay === index}
        />
      );
    });
  };

  whileNoSelection = () => {
    let currentActiveIndex = this.state.lifeEvents.findIndex(event => {
      return event.forceShow === true;
    });
    currentActiveIndex =
      currentActiveIndex === -1 ? this.state.lifeEvents.length - 1 : currentActiveIndex;

    let newLifeEvents = [...this.state.lifeEvents];
    newLifeEvents[currentActiveIndex].forceShow = false;
    newLifeEvents[
      currentActiveIndex + 1 === this.state.lifeEvents.length ? 0 : currentActiveIndex + 1
    ].forceShow = true;

    this.setState({
      lifeEvents: newLifeEvents
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
          : this.props.lifeEvents.find(event => event.forceShow).content}
      </React.Fragment>
    );
  }
}

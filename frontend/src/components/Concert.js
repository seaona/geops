import React, {Component} from 'react';

export default class Concert extends Component {

  constructor(props) {
    super(props);
    this.state = {...this.props};
  }

  render() {
    return (
    <div className="Viewers">
      <h1> Viewers </h1>
      {this.state.viewers.map(function(d, idx) {
          return (<li key={idx}>{d.name}</li>)}
      )}
    </div>
    );
  }

}

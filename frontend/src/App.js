import React, {Component} from 'react';
import ViewerForm from './components/ViewerForm';
import Concert from './components/Concert';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        performer: null,
        viewers: [],
    }
    this.handleCallback = this.handleCallback.bind(this);
  }

  handleCallback(newViewers) {
    this.setState({...this.state, viewers: newViewers});
    console.log("CALLBACK in App.js", this.state.viewers);
  }

  render() {
    return (
      <div className="App">
        <ViewerForm viewers={this.state.viewers} onChange={this.handleCallback}/>
        <Concert viewers={this.state.viewers} performer={this.state.performer} />
      </div>
    );
  }
  
} 

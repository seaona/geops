import React, {Component} from 'react';

export default class ViewerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props,
            newViewer: {
                name: "Name",
                walletAddress: "0x000000000000000000000000000000000000000",
                streamRatePerMinute: 0,
            }
        };
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({...this.setState, newViewer: {...this.state.newViewer, [name]: value}});
        console.log("NEW USERFORM STATE ON CHANGE: ", this.state);
    };

    handleSubmit = event => {
        event.preventDefault();
        console.log("HANDLING EVENT : ", event);
        console.log("NEW USERFORM STATE ON SUBMIT: ", this.state);
        this.addViewer();
    };

    addViewer = () => {
        var newViewers = this.state.viewers;
        newViewers.push(this.state.newViewer)
        this.setState({...this.state, viewers: newViewers})
        this.props.onChange(this.props.viewers);
        console.log("VIEWERS : ", this.props.viewers);
    }

    render() {
        return (
        <div className="submit-form">
            <h1> Add New User </h1>
            <form onSubmit={this.handleSubmit}>
                <br/>
                <label>
                Name
                <input type="text" name="name" value={this.state.newViewer.name} onChange={this.handleInputChange} />
                </label>

                <br/>
                <label>
                Wallet Address
                <input type="text" name="walletAddress" value={this.state.newViewer.walletAddress} onChange={this.handleInputChange} />
                </label>

                <br/>
                <label>
                Streaming Rate Per Minute
                <input type="text" name="streamRatePerMinute" value={this.state.newViewer.streamRatePerMinute} onChange={this.handleInputChange} />
                </label>

                <br/>
                <input type="submit" value="Start Streaming" />
            </form>
        </div>
        );
    }
}

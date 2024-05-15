import React from "react";

class Counter extends React.Component {
    constructor() {
        super();
        this.state = {
            number: 0
        };
    }

    // Method to increment the counter
    increment = () => {
        this.setState(prevState => ({
            number: prevState.number + 1
        }));
    };

    // Method to decrement the counter
    decrement = () => {
        this.setState(prevState => ({
            number: prevState.number - 1
        }));
    };

    render() {
        return (
            <div>
                <h1>Counter: {this.state.number}</h1>
                <button onClick={this.increment}>Increment</button>
                <button onClick={this.decrement}>Decrement</button>
            </div>
        );
    }
}

export default Counter;

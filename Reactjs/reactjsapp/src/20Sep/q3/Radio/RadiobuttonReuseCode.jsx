
import React, { Component } from "react";
class RadioButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            temp:''
        };
    }

    handleChanged = (evt) => {
        this.setState({ temp: [evt.target.value] });
    }

    render() {
        if (this.props.dataSource === undefined) {
            return (
                <div className="container">
                    <strong>
                        No Data Passed
                    </strong>
                </div>
            );

        } else {
            return <center>
                            <div>
                {
                    this.props.dataSource.map((rec, idx) => (
                        <td key={idx} value={this.props.stateProperty} onChange={this.handleChanged.bind(this)}>
                            <input type="radio" value={rec} name="radio"/>{rec}  
                        </td>
                    ))
                }
                <strong> selected :- </strong>
                <ul>{this.state.temp}</ul>
            </div >
            </center>

            
        }
    }
}

export default RadioButton;
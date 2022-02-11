import React, {Component} from "react";

class CheckButtonbox extends Component {
    constructor(props) {
        super(props);
        this.state ={
            temp: ''
        };
    }

    checkclick = (evt) => {
        var {name, checked} = evt.target;
        
        this.setState((e) => {
            var selected = e.cities;
            return selected[name] = checked;
        });
    };



    render(){
        {
            if (this.props.dataSource === undefined) {
                return (
                    <div className="container">
                        <strong>
                            No Data Passed
                        </strong>
                    </div>
                );
    
            } else {
    var displaycities = Object.keys(this.state.cities).filter((x) => this.state.cities[x]);
    return(
        <div>
            <center>

                <hr/>
                {this.dataSource.map((rec, idx) => (
                    <td key={idx} value={this.props.stateproperty} onChange={this.checkclick.bind(this)}></td>
                ))}
                
                <strong>{displaycities + ","}</strong>
                
            </center>
        </div>
    );
                }}}
}
export default CheckButtonbox;
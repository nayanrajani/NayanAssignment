import React, { Component } from 'react';
import RadioButton from './RadiobuttonReuseCode';
class ReuseRadio extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            states:['MH','MP', 'UP', 'GJ', 'KR', 'TN', 'TS', 'KL', 'RJ'],
            cities:['Pune', 'Vadodhara', 'Indore', 'Jaipur', 'Prayag', 'Kashi', 'Zhansi', 'Nagpur']
        };
    }
    render() { 
        return (
            <center>
                <div className="container-fluid">
                
                  <h2>Select City</h2>
                  <RadioButton dataSource={this.state.cities}></RadioButton> 

            </div>
            </center>

          );
    }
}
 
export default ReuseRadio;
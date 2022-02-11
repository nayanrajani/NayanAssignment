import React, { Component } from 'react';

import CheckboxButton from './checkbox';

class CheckButton extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            cities:{
                Pune:false , 
                Vadodhara:false , 
                Indore:false , 
                Jaipur:false , 
                Prayag:false , 
                Kashi:false , 
                Zhansi:false , 
                Nagpur:false , 
            }
        }
    }
    render() { 
        return (
            <center>
                <div className="container-fluid">
                <h2>Select Multiple</h2>
                  <CheckboxButton dataSource={this.state.cities}></CheckboxButton>
                  <hr />

            </div>
            </center>

          );
    }
}
 
export default CheckButton;
import React, {Component} from "react";

class CheckButtonbox extends Component {
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

    checkclick = (evt) => {
        var {name, checked} = evt.target;
        
        this.setState((e) => {
            var selected = e.cities;
            return selected[name] = checked;
        });
    };



    render(){
        
    var displaycities = Object.keys(this.state.cities).filter((x) => this.state.cities[x]);
    return(
        <div>
            <center><br />
                
                <h4>Checkbox</h4>
                <hr/>
                <input type="checkbox" onChange={this.checkclick} name=" Pune,"/>Pune&nbsp;&nbsp;
                <input type="checkbox" onChange={this.checkclick} name=" Vadodhara,"/>Vadodhara&nbsp;&nbsp;
                <input type="checkbox" onChange={this.checkclick} name=" Indore," />Indore&nbsp;&nbsp;
                <input type="checkbox" onChange={this.checkclick} name=" Jaipur," />Jaipur&nbsp;&nbsp;
                <input type="checkbox" onChange={this.checkclick} name=" Prayag," />Prayag&nbsp;&nbsp;
                <input type="checkbox" onChange={this.checkclick} name=" Kashi," />Kashi&nbsp;&nbsp;
                <input type="checkbox" onChange={this.checkclick} name=" Zhansi," />Zhansi&nbsp;&nbsp;
                <input type="checkbox" onChange={this.checkclick} name=" Nagpur," />Nagpur&nbsp;&nbsp;
                <hr/>
                
                <strong>You have selected: </strong>
                <ul>{displaycities}</ul>
                
            </center>
        </div>
    );
    }
}
export default CheckButtonbox;
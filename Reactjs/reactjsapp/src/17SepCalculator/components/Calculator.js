import React, {Component} from 'react';
import './calc.css'


class Calculator1 extends Component {
    
    constructor(props) {
        
        super(props);
        this.state = { getstring: ''}
    }

    getdata = (evt) => {
        const data = evt.target.value;
        
        // if(data === 'Del'){
        //     this.setState((prevstate) => ({
        //         getstring: prevstate.getstring + data,
        //     }));
        // }

        if(data === '%'){
            this.setState({
                getstring: (this.state.getstring / 100),
            });
            return;
        }
        if(data === '1/x'){
            this.setState({
                getstring: (1/this.state.getstring),
            });
            return;
        }
        
        if (data === 'x^2') {
            
            this.setState({
                getstring: Math.pow(this.state.getstring, 2),
            });
            
            return;
               
        }
        
        if (data === 'x^3') {
            
            this.setState({
                getstring: Math.pow(this.state.getstring, 3),
            });
            
            return;
               
        }

        if (data === 'sin') {
            
            this.setState({
                getstring: Math.sin(this.state.getstring * Math.PI / 180),
            });
            
            return;
               
        }

        if (data === 'cos') {
            
            this.setState({
                getstring: Math.cos(this.state.getstring * Math.PI / 180),
            });
            
            return;
               
        }

        if (data === 'tan') {
            
            this.setState({
                getstring: Math.tan(this.state.getstring * Math.PI / 180),
            });
            
            return;
               
        }

        if (data === 'ln') {
            
            this.setState({
                getstring: Math.log(this.state.getstring),
            });
            
            return;
               
        }

        if (data === 'log') {
            
            this.setState({
                getstring: Math.log10(this.state.getstring),
            });
            
            return;
               
        }

        if(data === 'sqrt'){
            this.setState({
                getstring: Math.sqrt(this.state.getstring),
            });
            return;
        }

        if(data === 'Pi'){
            this.setState({
                getstring: 3.141592653589793238,
            });
            return;
        }
                

        if( data === 'C'){
            this.setState({ getstring:"" });
            return;
        }
        if(data === "="){
            this.setState((prevstate) => ({
                getstring: eval(prevstate.getstring),
            }));      
            return;     
        }

        this.setState((prevstate) => ({
            getstring: prevstate.getstring + data,
        }));
        return;
    };

    render(){
        return(
            <center>
                <br />
                <table>
                <div id='table'>
                    <center>
                    <h2 id="title">Scientific Calculator</h2>
                    <hr />
                    </center>
                    
                    <center>
                    <input type="text" value={this.state.getstring}/>&nbsp;
                    
                        
                        <div >
                            
                            <input type="button" onClick={this.getdata} label="7" value="7" />&nbsp;
                            <input type="button" onClick={this.getdata} label="8" value="8" />&nbsp;
                            <input type="button" onClick={this.getdata} label="9" value="9" />&nbsp;
                            <input type="button" onClick={this.getdata} label="C" value="C" />
                            
                            
                        </div>
                        
                        <div>
                            
                            <input type="button" onClick={this.getdata} label="4" value="4" />&nbsp;
                            <input type="button" onClick={this.getdata} label="5" value="5" />&nbsp;
                            <input type="button" onClick={this.getdata} label="6" value="6" />&nbsp;
                            <input type="button" onClick={this.getdata} label="/" value="/" />
                            
                        </div>


                        <div >
                            
                            <input type="button" onClick={this.getdata} label="1" value="1" />&nbsp;
                            <input type="button" onClick={this.getdata} label="2" value="2" />&nbsp;
                            <input type="button" onClick={this.getdata} label="3" value="3" />&nbsp;
                            <input type="button" onClick={this.getdata} label="x" value="*" />
                        </div>

                        <div >
                        <input type="button" onClick={this.getdata} label="0" value="0" />&nbsp;
                            <input type="button" onClick={this.getdata} label="." value="." />&nbsp;
                            <input type="button" onClick={this.getdata} label="-" value="-" />&nbsp;
                            <input type="button" onClick={this.getdata} label="+" size="2" value="+" />
                            
                            
                        </div>

                        <div >
                            <input type="button" onClick={this.getdata} label="sin" value="sin" />&nbsp;
                            <input type="button" onClick={this.getdata} label="cos" value="cos" />&nbsp;
                            <input type="button" onClick={this.getdata} label="tan" value="tan" />&nbsp;
                            <input type="button" onClick={this.getdata} label="%" value="%" />
                            
                            
                        </div>

                        <div >
                            
                            <input type="button" onClick={this.getdata} label="sqrt" value="sqrt" />&nbsp;
                            {/* <input type="button" onClick={this.getdata} label="Pi" value="Pi" />&nbsp; */}
                            <input type="button" onClick={this.getdata} label="x^2" value="x^2" />&nbsp;
                            <input type="button" onClick={this.getdata} label="x^3" value="x^3" />&nbsp;
                            
                        </div>

                        <div >
                            <input type="button" onClick={this.getdata} label="1/x" value="1/x" />&nbsp;
                            <input type="button" onClick={this.getdata} label="ln" value="ln" />&nbsp;
                            {/* <input type="button" onClick={this.getdata} label="tan" value="tan" />&nbsp; */}
                            <input type="button" onClick={this.getdata} label="log10" value="log10" />
                            <br />
                            &nbsp;&nbsp;<input type="button" id="result" onClick={this.getdata} label="=" size="2" value="=" />&nbsp;
                            {/* <input type="button" onClick={this.getdata} label="Delete" value="Del" /> */}
                            
                            
                        </div>
                        
                    </center>
  
                </div>                
                </table>
                    
            </center>
        )
    }
}

export default Calculator1;
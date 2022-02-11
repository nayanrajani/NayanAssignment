import React,{Component} from "react";
import { S3SecureCall } from "./S3SecureCall";
class S3ListFile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            content : ""
         }
        
    }
    scObj = new S3SecureCall();
    componentDidMount(prevProp){
        this.scObj.getData().then(data=>{
            this.setState((prevState,prevProp)=>{
                return{content : (data)}
            })
        });
    }
    downloadFunction(evt){
        console.log(evt.target.innerHTML);
        let temp = new S3SecureCall()
        temp.test(evt.target.innerHTML)
    }
    render() { 
        console.log(typeof(this.state.content.data));
        return ( 
            <div>
                <center>
                    <br/>
                    <h1>Data From S3</h1>
                <div>
                    
                    {
                        this.state.content.length === 0 ? null :  this.state.content.data.map(item=>{return <button onClick= {this.downloadFunction}>{item}</button>})
                    }
                </div>
                </center>
            </div>
        );
    }
}
 
export default S3ListFile;
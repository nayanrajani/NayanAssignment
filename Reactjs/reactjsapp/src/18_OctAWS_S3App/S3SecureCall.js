import axios from "axios";
export class S3SecureCall{
    getData(){
        let response = axios.get("http://localhost:9080/api/getS3Data");
        return response;
    }
    test(filename){
    // test(){
        let response = axios.get(`http://localhost:9080/api/downloadObj/${filename}`);
        return response
        // console.log(filename);
    }
}
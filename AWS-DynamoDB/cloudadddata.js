// File to access the AWS dynamodb

// 1. Load the package
const aws = require('aws-sdk');
const fs = require('fs');
// 2. configure the access key and access id for authenticating
// the Node.js app (aka current Node.js Process) against the
// the AWS

aws.config.update({
    accessKey:'AKIA43UXXWMCDOOF3U5N',
    secretAccessKey:'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',
    region:'ap-southeast-1',
    endpoint:'https://dynamodb.ap-southeast-1.amazonaws.com'
});

// define an the service instance e.g. dynamodb
let dynamoDB = new aws.DynamoDB();

// defining the DocumentClient object
// this object will be used to add items as JSON Data in the Table
let documentClient = new aws.DynamoDB.DocumentClient();

// read data from the file 
let interns = fs.readFileSync('C:/Users/nayan.rajani/Development/Self-Learning/Nodejs/writeablestream.txt');
// parse the data in the JSON Objects array
let internsData = JSON.parse(interns.toString());
// iterate over the array and add data into the table
// documentClient.put(); Adding new Item
// .scan(); read all records
// .delete(); delete record
// .update(); update record
// query(); used to return records based on condition
// get(); used to read data based on the Condition
internsData.forEach((intern)=>{
    documentClient.put({
        TableName: "CloudFlare_Nayan_Rajani",
        Item:intern
    }, (error,data)=>{
        if(error){
            console.log(`Insert Failed ${error.message}`);
            return;
        }
        console.log(`Done added!!${data.ConsumedCapacity}`);
    });
});



// // File to access the AWS dynamodb

// // 1. Load the package
// const aws = require('aws-sdk');
// const fs = require('fs');
// // 2. configure the access key and access id for authenticating
// // the Node.js app (aka current Node.js Process) against the
// // the AWS

// aws.config.update({
//     accessKey:'AKIA43UXXWMCKEG6MPHB',
//     secretAccessKey:'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',
//     region:'ap-southeast-1',
//     endpoint:'https://dynamodb.ap-southeast-1.amazonaws.com'
// });

// // define an the service instance e.g. dynamodb
// let dynamoDB = new aws.DynamoDB();

// // defining the DocumentClient object
// // this object will be used to add items as JSON Data in the Table
// let documentClient = new aws.DynamoDB.DocumentClient();

// // read data from the file 
// let interns = fs.readFileSync('./patient.json');
// // parse the data in the JSON Objects array
// let internsData = JSON.parse(interns.toString());
// // iterate over the array and add data into the table
// // documentClient.put(); Adding new Item
// // .scan(); read all records
// // .delete(); delete record
// // .update(); update record
// // query(); used to return records based on condition
// // get(); used to read data based on the Condition
// internsData.forEach((intern)=>{
//     documentClient.put({
//         TableName: "Interns",
//         Item:intern
//     }, (error,data)=>{
//         if(error){
//             console.log(`Insert Failed ${error.message}`);
//             return;
//         }
//         console.log(`Yes ${data.ConsumedCapacity}`);
//     });
// });
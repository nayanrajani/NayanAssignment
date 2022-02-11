// File to access the AWS dynamodb

// 1. Load the package
const aws = require('aws-sdk');
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

deleteTable();

function deleteTable(){
    dynamoDB.deleteTable({
        TableName: "CloudFlare_Nayan_Rajani",
    },(error, data)=>{
        if(error){
            console.log(`Error Occured During the Table Creation ${error.message}`);
            return;
        }
        // return the table description
        console.log(`Table is deleted successfully`);

    });
}

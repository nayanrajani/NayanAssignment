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

createTable();

function createTable(){
    dynamoDB.createTable({
        TableName: "CloudFlare_Nayan_Rajani",
        // Primary Key Specifications: PartitionKey and RowKey
        KeySchema:[
            {
                AttributeName: "private_key",
                KeyType: "HASH" // for the Partition Key
            },
            {
                AttributeName: "public_key",
                KeyType:"RANGE" // for the Sort Key
            }
        ],
        // Set additional Attributes for the table
        AttributeDefinitions:[
            {
                AttributeName: "private_key",
                AttributeType: "S" // for the Partition Key
            },
            {
                AttributeName: "public_key",
                AttributeType:"S" // for the Sort Key
            }
        ],
        // Provision Throughput aka Read/Write Units
        ProvisionedThroughput:{
            ReadCapacityUnits:10,
            WriteCapacityUnits:10
        }
    },(error, data)=>{
        if(error){
            console.log(`Error Occured During the Table Creation ${error.message}`);
            return;
        }
        // return the table description
        console.log(`Table is created successfully ${data.TableDescription.TableName}`);

    });
}

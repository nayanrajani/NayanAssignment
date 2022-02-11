// File to access the AWS dynamodb

// 1. Load the package
const aws = require('aws-sdk');
// 2. configure the access key and access id for authenticating
// the Node.js app (aka current Node.js Process) against the
// the AWS

aws.config.update({
    accessKey:'',
    secretAccessKey:'',
    region:'ap-southeast-1',
    endpoint:'https://dynamodb.ap-southeast-1.amazonaws.com'
});

// define an the service instance e.g. dynamodb
let dynamoDB = new aws.DynamoDB();

createTable();

function createTable(){
    dynamoDB.createTable({
        TableName: "CloudChampion_Nayan_Rajani",
        // Primary Key Specifications: PartitionKey and RowKey
        KeySchema:[
            {
                AttributeName: "WardName",
                KeyType: "HASH" // for the Partition Key
            },
            {
                AttributeName: "PatientId",
                KeyType:"RANGE" // for the Sort Key
            }
        ],
        // Set additional Attributes for the table
        AttributeDefinitions:[
            {
                AttributeName: "WardName",
                AttributeType: "S" // for the Partition Key
            },
            {
                AttributeName: "PatientId",
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

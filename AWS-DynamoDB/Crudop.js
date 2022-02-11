// File to access the AWS dynamodb

// 1. Load the package
const express = require('express');
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

let port = process.env.PORT || 9070;

// define an the service instance e.g. dynamodb
let dynamoDB = new aws.DynamoDB();

// defining the DocumentClient object
// this object will be used to add items as JSON Data in the Table
let documentClient = new aws.DynamoDB.DocumentClient();

let instance = express();
instance.use(express.urlencoded({extended:false}));
instance.use(express.json());

instance.get('/api/Patientdata/read',(req,resp)=>{
    // reading all records
    documentClient.scan({
        TableName:"CloudChampion_Nayan_Rajani",
    }, (error,data)=>{
        if(error){
            resp.status(500).send({message:`Error Ocured ${error.message}`});
        }
        resp.status(200).send({message: `${JSON.stringify(data.Items)}`});
    });
});


instance.get('/api/Patientdata/read/:Hward',(req,resp)=>{
    // read Hward from header
    let Hward = req.params.Hward;
    // reading all records
    documentClient.query({
        TableName:"CloudChampion_Nayan_Rajani",
        // #Hward is the Attribute-Variable
        // :Hward is the value for the Attribute-Variable
        KeyConditionExpression: "#Hward=:Hward",  // condition
        ExpressionAttributeNames: {
            "#Hward": "WardName" // the attribute that will map with the Attribute-Variable
        },
        ExpressionAttributeValues:{
            ":Hward":Hward // read the parameter value from header for Attribute-Variable
        }
    }, (error,data)=>{
        if(error){
            resp.status(500).send({message:`Error Ocured ${error.message}`});
        }
        resp.status(200).send({message: `${JSON.stringify(data.Items)}`});
    });
});

instance.post('/api/Patientdata/create',(req,resp)=>{
    documentClient.put({
        TableName: "CloudChampion_Nayan_Rajani",
        Item: req.body
    },(error,data)=>{
        
            if(error){
                resp.status(500).send({message:`Data Addition ${error.message}`});
                return;
            }
            resp.status(200).send({message:`The Record is created ${data.ConsumedCapacity}`});
    });
});


instance.put('/api/Patientdata/update/:id',(req,resp)=>{

    documentClient.update();
})

instance.delete('/api/Patientdata/delete/:id',(req,resp)=>{
    documentClient.delete();
})


instance.listen(port,()=>{
    console.log('Express with DynamoDB Started');
});
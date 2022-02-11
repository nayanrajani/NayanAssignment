const AWS = require('aws-sdk');

// set the ACL for the S3 so that the
// connection can be done with AWS S3
// and resource operations can be staretd 

const S3 = new AWS.S3({
    accessKeyId:'',
    secretAccessKey:'',
});

// object will be used to define
// S3 Configurations so that it will be sued while creating the Bucket 
// create bucket with the configuration

S3.createBucket({
    Bucket: 'nayan-s3bucket',  // bucket name
    CreateBucketConfiguration:{ // the Location Configuration of the bucket
        LocationConstraint: 'ap-southeast-1',
    }
}, (error,data)=>{
    if(error) {
        console.log(`Error for Bucket Creation!! ${error.message} ${error.stack}`);
    }
    else{
        console.log(`Bucket Created!! ${data.Location}`);
    }
});
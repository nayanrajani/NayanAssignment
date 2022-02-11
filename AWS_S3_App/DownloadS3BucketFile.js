const AWS = require('aws-sdk');
const fs = require('fs');

const S3 = new AWS.S3({
    accessKeyId:'',
    secretAccessKey:'',
});

const bucket_name = 'nayan-s3bucket';

const download= () =>{
    // create a writable stream 
    // this steeam will be used to contain the 
    // 'fileContents' received from the download operations
    var writableStream = fs.createWriteStream('./downloadfiles/TeamArchitecturefromS3.png');
    // get the stream from the s3 bucket

    var receivedStream = S3.getObject({
        Bucket: bucket_name,
        Key: 'TeamArchitecture.png',
    }).createReadStream(); // the stream will be created from received data from the bucket 
    // write the receivedStream into the writableStream
    // pipe() the function, that is used to 
    // organized the received stream in order so that
    // the output file will be generated

    receivedStream.pipe(writableStream);
    console.log(`File Downloaded!!!`);
};

download();
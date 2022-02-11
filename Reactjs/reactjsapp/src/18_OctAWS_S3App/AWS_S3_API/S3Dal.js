const AWS = require('aws-sdk')
const fs = require('fs')
const s3 = new AWS.S3({
    // accessKeyId : "AKIAQID3PYRIPZQDTH4S",
    // secretAccessKey : "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",
    // apiVersion: '2006-03-01'
});
var bucket_name = {
    Bucket : 'nayan-s3bucket',
  };
class S3Dal{
    async showBucketObjects(req,res){
            s3.listObjects(bucket_name,(err,data)=>{
                if(err){
                    console.log(err);
                }
                else{
                    let temp = []
                    data.Contents.map((ele) => {
                        temp.push(ele.Key)
                        return true
                    })
                    console.log(temp);
                    res.status(200).send(temp)
                }
            })
    }
    async downloadObject(req,res){
        console.log(req.params.filename);
        var writableStream = fs.createWriteStream(req.params.filename)
        var receivedStream = s3.getObject({
            Bucket : "nayan-s3bucket",
            Key : req.params.filename 
        }).createReadStream();
        receivedStream.pipe(writableStream).then(res.status(200).send("ok")).catch(res.status(400).send("Error"))
        // res.status(200).send("ok");
    }
}
module.exports = S3Dal;
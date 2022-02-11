const express = require('express')
const AWS_DAL_S3 = require("./S3Dal")
const cors =  require('cors')
const app = express()
app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use(cors({
    allowedHeaders : "*"
}))


const s3_obj = new AWS_DAL_S3()
app.get("/api/getS3Data",s3_obj.showBucketObjects)
app.get("/api/downloadObj/:filename",s3_obj.downloadObject)
app.listen(9080,()=>{
    console.log('Server on 9080')
})
const AWS = require("aws-sdk");
const fs = require("fs");

const S3 = new AWS.S3({
  accessKeyId: "",
  secretAccessKey: "",
});

const bucket_name = "nayan-s3bucket";

const uploadImage = (image) => {
  // read the file
  const imagfile = fs.readFileSync(image);

  // upload the file

  S3.upload(
    {
      Bucket: bucket_name,
      Key: "TeamArchitecture.png", // the file name using which the file will be uploaded and saved
      Body: imagfile, // the file contents to be send to bucket
    },
    (error, data) => {
      if (error) {
        console.log(`Error While Uploading!! ${error.message} ${error.stack}`);
      } else {
        console.log(`File Uploaded!! ${data.Bucket} ${data.Location}`);
      }
    }
  );
};

uploadImage("./uploadfiles/TeamArchitecture.png");

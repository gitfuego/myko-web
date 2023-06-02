require('dotenv').config();
const aws = require('aws-sdk')

const region = 'us-east-1';
const bucketName = 'myko-media';
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

module.exports = {
  generateUploadURL: function() {
    const imageName = `${Math.floor(Math.random() * 100)}${Date.now()}`;

    const params = ({
      Bucket: bucketName,
      Key: imageName,
      Expires: 60
    })

    const uploadURL = s3.getSignedUrl('putObject', params)
    return uploadURL
  }
}
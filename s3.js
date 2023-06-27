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
    function  generateRandomString(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      let result = '';
    
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }
    
      return result;
    }
    const imageName = `${generateRandomString(8)}${Date.now()}`;

    const params = ({
      Bucket: bucketName,
      Key: imageName,
      Expires: 60
    })

    const uploadURL = s3.getSignedUrl('putObject', params)
    return uploadURL
  },

  deletePicture: function(key) {
    const params = ({
      Bucket: bucketName,
      Key: `${key}`,
    })
    s3.deleteObject(params, (err) => {
      if (err) console.log(err);
    });
  }
}
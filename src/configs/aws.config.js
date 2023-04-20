const AWS = require('aws-sdk')
require('dotenv').config()

const s3Config = new AWS.S3({
  accessKeyId: process.env.AWS_PUBLIC_KEY_ID,
  secretAccessKey: process.env.AWS_PRIVATE_KEY_ID,
})

module.exports = {
  s3Config,
}

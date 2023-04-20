require('dotenv').config()
const { s3Config } = require('../configs/index')

const uploadFileToS3 = async (file, directory) => {
  try {
    const params = {
      Bucket: process.env.BUCKET,
      Key: directory,
      Body: file,
    }

    const res = await s3Config.upload(params).promise()
    if (res.Location) {
      return res
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

module.exports = {
  uploadFileToS3,
}

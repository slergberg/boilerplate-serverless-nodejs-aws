const AWS = require('aws-sdk')
const crypto = require('crypto')
const fs = require('fs')
const http = require('http')
const path = require('path')

const { decrypt } = require('../../helpers/encryption')

const accessKeyId = process.env.STORAGE_ACCESS_KEY_ID
const secretAccessKey = process.env.STORAGE_SECRET_ACCESS_KEY
const endpoint = process.env.STORAGE_ENDPOINT
const defaultBucket = process.env.STORAGE_BUCKET
const defaultStorageUrl = process.env.STORAGE_URL
const defaultCloudFrontPrivateKey = process.env.AWS_CF_ENCRYPTED_PRIVATE_KEY
  ? decrypt(process.env.AWS_CF_ENCRYPTED_PRIVATE_KEY)
  : undefined
const defaultCloudFrontPrivateKeyId = process.env.AWS_CF_PRIVATE_KEY_ID

let s3Config = {}
if (accessKeyId) {
  s3Config = { ...s3Config, accessKeyId }
}
if (secretAccessKey) {
  s3Config = { ...s3Config, secretAccessKey }
}
if (endpoint) {
  s3Config = {
    ...s3Config,
    endpoint,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
  }
}

const s3 = new AWS.S3(s3Config)

const signedUrlForCloudFront = (key, options = {}) => {
  const {
    storageUrl = defaultStorageUrl,
    validityPeriod = 24 * 60 * 60,
  } = options

  let resourceUrl = `${storageUrl}/${key}`

  if (defaultCloudFrontPrivateKey) {
    const expirationTime = Math.round((new Date()).getTime() / 1000) + validityPeriod

    const policy = {
      Statement: [
        {
          Resource: resourceUrl,
          Condition: {
            DateLessThan: { 'AWS:EpochTime': expirationTime },
          },
        },
      ],
    }
    const policyJson = JSON.stringify(policy)
    const encodedPolicyJson = Buffer.from(policyJson)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/=/g, '_')
      .replace(/\//g, '~')

    const signer = crypto.createSign('RSA-SHA1')
    signer.update(policyJson)
    const signature = signer.sign(defaultCloudFrontPrivateKey, 'base64')
      .replace(/\+/g, '-')
      .replace(/=/g, '_')
      .replace(/\//g, '~')

    const params = [
      `Policy=${encodedPolicyJson}`,
      `Signature=${signature}`,
      `Key-Pair-Id=${defaultCloudFrontPrivateKeyId}`,
    ]

    const paramsString = params.join('&')

    resourceUrl = `${resourceUrl}?${paramsString}`
  }

  return resourceUrl
}

const downloadFromS3 = async (key, options = {}) => (
  new Promise((resolve, reject) => {
    const { bucket = defaultBucket } = options

    const params = {
      Bucket: bucket,
      Key: key,
    }

    const filePath = path.join('/tmp', path.basename(key))

    const s3Stream = s3.getObject(params).createReadStream()
    s3Stream.on('error', reject)

    const writeStream = fs.createWriteStream(filePath)
    writeStream.on('error', reject)
    writeStream.on('close', () => {
      if (fs.existsSync(filePath)) {
        resolve(filePath)
      } else {
        reject(new Error('failed'))
      }
    })

    s3Stream.pipe(writeStream)
  })
)

const uploadToS3 = async (key, data, options = {}) => {
  const { bucket = defaultBucket, ...extraOptions } = options

  const params = {
    ...extraOptions,
    Body: data,
    Bucket: bucket,
    Key: key,
  }

  await s3.putObject(params).promise()

  return key
}

const downloadFromUrl = url => (
  new Promise(async (resolve, reject) => {
    const filePath = path.join('/tmp', path.basename(url))

    const writeStream = fs.createWriteStream(filePath)
    writeStream.on('finish', () => {
      if (fs.existsSync(filePath)) {
        resolve(filePath)
      } else {
        reject(new Error('failed'))
      }
    })
    writeStream.on('error', reject)

    http.get(url, (response) => {
      response.pipe(writeStream)
    })
  })
)

module.exports = {
  downloadFromS3,
  downloadFromUrl,
  signedUrlForCloudFront,
  uploadToS3,
}

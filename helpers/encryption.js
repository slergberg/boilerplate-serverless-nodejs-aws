const crypto = require('crypto')

const ENCRYPTION_ALGORITHM = process.env.APP_ENCRYPTION_ALGORITHM || 'aes-256-cbc'
const ENCRYPTION_KEY = process.env.APP_ENCRYPTION_KEY
const ENCRYPTION_IV_LENGTH = process.env.APP_ENCRYPTION_IV_LENGTH || 16

const encrypt = (text) => {
  const initializationVector = crypto.randomBytes(ENCRYPTION_IV_LENGTH)

  const cipher = crypto.createCipheriv(
    ENCRYPTION_ALGORITHM,
    Buffer.from(ENCRYPTION_KEY),
    initializationVector,
  )

  let encrypted = cipher.update(text)
  encrypted = Buffer.concat([encrypted, cipher.final()])

  return `${initializationVector.toString('hex')}:${encrypted.toString('hex')}`
}

const decrypt = (text) => {
  const [initializationVectorHex, encryptedHex] = text.split(':')

  const initializationVector = Buffer.from(initializationVectorHex, 'hex')
  const encrypted = Buffer.from(encryptedHex, 'hex')

  const decipher = crypto.createDecipheriv(
    ENCRYPTION_ALGORITHM,
    Buffer.from(ENCRYPTION_KEY),
    initializationVector,
  )

  let decrypted = decipher.update(encrypted)
  decrypted = Buffer.concat([decrypted, decipher.final()])

  return decrypted.toString()
}

module.exports = {
  encrypt,
  decrypt,
}

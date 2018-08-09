const fs = require('fs')
const path = require('path')
const qs = require('qs')

const { downloadFromUrl, uploadToS3 } = require('../services/storageService')
const { formatResponse } = require('../../helpers/http')

const { CARD_GENERATOR_URL, COR_SER_CLOCON_URL } = process.env

const generateCard = async (params) => {
  const cardQuery = qs.stringify(params)
  const cloudConvertBody = {
    url: `${CARD_GENERATOR_URL}?${cardQuery}`,
  }

  const cloudConvertQuery = qs.stringify(
    {
      viewport: {
        height: 1000,
        width: 1000,
      },
    },
    {
      encodeURIComponent: true,
    },
  )

  const response = await global.fetch(
    `${COR_SER_CLOCON_URL}/url/to/png?${cloudConvertQuery}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify(cloudConvertBody),
    },
  )

  return response.json()
}

const downloadCard = async card => (
  downloadFromUrl(`${COR_SER_CLOCON_URL}${card.path}`)
)

const handler = async (event) => {
  const requestQuery = event.queryStringParameters

  const card = await generateCard({
    name: requestQuery.name,
    father: requestQuery.father,
  })

  const cardFilePath = await downloadCard(card)

  const cardUrl = await uploadToS3(path.basename(cardFilePath), fs.readFileSync(cardFilePath))

  const response = {
    url: cardUrl,
  }

  return formatResponse(response)
}

module.exports = { handler }

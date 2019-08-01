const superagent = require('superagent')
const convert = require('xml-js')

const baseURI = 'https://tfr.faa.gov/save_pages/'

// Main method / shortcut to fetch
const tfrs = (module.exports = id => {
  return tfrs.fetch(id)
})

tfrs.fetch = async id => {
  try {
    const response = await superagent
      .get(`${baseURI}/detail_${id.split('/').join('_')}.xml`)

    const result = parse(response.body
      .toString()
      .replace(/<txtDescrModern[\s\S]*txtDescrModern>/g, ''))

    return {
      id,
      ...result
    }
  } catch (err) {
    console.error(`Error fetching TFR values from ${baseURI}`, err)
  }
}

// Parse the response HTML from http://rvr.fly.faa.gov
const parse = xml => {
  const js = convert.xml2js(xml, {
    compact: true
  })

  return js
}

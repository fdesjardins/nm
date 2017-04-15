/* global describe, it */

const assert = require('chai').assert
const nm = require('./index')

describe('nm', () => {
  it('should exist', done => {
    assert(nm !== undefined)
    done()
  })
})

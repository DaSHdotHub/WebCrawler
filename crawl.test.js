const {normalizeURL} = require('./crawl.js')
const {test, expect} = require('@jest/globals')

test('normalizeURL strip https protocol', () => {
    const input = 'https://github.com/DaSHdotHub'
    const actual = normalizeURL(input)
    const expected = 'github.com/dashdothub'
    expect(actual).toEqual(expected)
    })

test('normalizeURL strip slash', () => {
    const input = 'https://github.com/DaSHdotHub/'
    const actual = normalizeURL(input)
    const expected = 'github.com/dashdothub'
    expect(actual).toEqual(expected)
    })

test('normalizeURL capitals', () => {
    const input = 'https://Github.com/DaSHdotHub/'
    const actual = normalizeURL(input)
    const expected = 'github.com/dashdothub'
    expect(actual).toEqual(expected)
    })
    
test('normalizeURL strp http protocol', () => {
    const input = 'http://Github.com/DaSHdotHub/'
    const actual = normalizeURL(input)
    const expected = 'github.com/dashdothub'
    expect(actual).toEqual(expected)
    })
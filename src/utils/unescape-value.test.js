import tap from 'tap'
import { escapeValue } from './escape-value.js'
import { unescapeValue } from './unescape-value.js'

tap.test('throws for bad input', async (t) => {
  t.throws(() => unescapeValue(42), Error('value must be a string'))
})

tap.test('reserved chars', (t) => {
  t.test('space', async (t) => {
    const input = '\\20has a leading and trailing space\\20'
    const expected = ' has a leading and trailing space '
    const result = unescapeValue(input)
    t.equal(result, expected)
  })

  t.test('leading #', async (t) => {
    t.equal(unescapeValue('\\23hashtag'), '#hashtag')
  })

  t.test('pompous name', async (t) => {
    t.equal(
      unescapeValue('James \\22Jim\\22 Smith\\2c III'),
      'James "Jim" Smith, III'
    )
  })

  t.test('carriage return', async (t) => {
    t.equal(unescapeValue('Before\\0dAfter'), 'Before\rAfter')
  })

  t.end()
})

tap.test('2-byte utf-8', (t) => {
  t.test('Lučić', async (t) => {
    const input = 'Lu\\c4\\8di\\c4\\87'
    const expected = 'Lučić'
    t.equal(unescapeValue(input), expected)
  })

  t.end()
})

tap.test('3-byte utf-8', (t) => {
  t.test('₠', async (t) => {
    const input = '\\e2\\82\\a0'
    const expected = '₠'
    t.equal(unescapeValue(input), expected)
  })

  t.end()
})

tap.test('4-byte utf-8 with leading space', (t) => {
  t.test(' 😀', async (t) => {
    const input = '\\20\\f0\\9f\\98\\80'
    const expected = ' 😀'
    t.equal(unescapeValue(input), expected)
  })

  t.end()
})

// Round-trip test to ensure escapeValue and unescapeValue are inverses
tap.test('round-trip', (t) => {
  t.test('round-trip test', async (t) => {
    const original = 'Hello, 🌍! #Test'
    const escaped = escapeValue(original)
    const unescaped = unescapeValue(escaped)
    t.equal(unescaped, original)
  })

  t.end()
})

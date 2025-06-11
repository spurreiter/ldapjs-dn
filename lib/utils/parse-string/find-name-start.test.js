import tap from 'tap'
import { findNameStart } from './find-name-start.js'

tap.test('returns correct position', async (t) => {
  const input = Buffer.from('   foo')
  t.equal(findNameStart({ searchBuffer: input, startPos: 0 }), 3)
})

tap.test('skips leading comma', async (t) => {
  const input = Buffer.from(' , foo=bar')
  t.equal(findNameStart({ searchBuffer: input, startPos: 0 }), 3)
})

tap.test('returns -1 for invalid lead char', async (t) => {
  const input = Buffer.from('   øfoo')
  t.equal(findNameStart({ searchBuffer: input, startPos: 0 }), -1)
})

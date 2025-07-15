/**
 * Converts an escaped string back into its original attribute value
 * as described in https://www.rfc-editor.org/rfc/rfc4514#section-2.4.
 *
 * This function supports up to 4 byte unicode characters.
 *
 * @param {string} value
 * @returns {string} The unescaped string.
 */
export function unescapeValue(value) {
  if (typeof value !== 'string') {
    throw Error('value must be a string')
  }

  const unescaped = []
  for (let i = 0; i < value.length; i++) {
    const char = value[i]

    // Handle escaped hex sequences (e.g., '\20', '\C3\A9' for multi-byte UTF-8).
    if (char === '\\' && i + 2 < value.length) {
      const hex = value.slice(i + 1, i + 3)
      const charCode = parseInt(hex, 16)

      if (!isNaN(charCode)) {
        // Check for multi-byte UTF-8 sequences.
        if (charCode >= 0xc0 && charCode <= 0xdf && i + 5 < value.length) {
          // 2-byte UTF-8 character.
          const nextHex = value.slice(i + 4, i + 6)
          const nextCharCode = parseInt(nextHex, 16)
          if (!isNaN(nextCharCode)) {
            const buffer = Buffer.from([charCode, nextCharCode])
            unescaped.push(buffer.toString('utf8'))
            i += 5 // Skip the next 5 characters (e.g., '\C3\A9').
            continue
          }
        } else if (
          charCode >= 0xe0 &&
          charCode <= 0xef &&
          i + 8 < value.length
        ) {
          // 3-byte UTF-8 character.
          const nextHex1 = value.slice(i + 4, i + 6)
          const nextHex2 = value.slice(i + 7, i + 9)
          const nextCharCode1 = parseInt(nextHex1, 16)
          const nextCharCode2 = parseInt(nextHex2, 16)
          if (!isNaN(nextCharCode1) && !isNaN(nextCharCode2)) {
            const buffer = Buffer.from([charCode, nextCharCode1, nextCharCode2])
            unescaped.push(buffer.toString('utf8'))
            i += 8 // Skip the next 8 characters (e.g., '\E2\9C\94').
            continue
          }
        } else if (
          charCode >= 0xf0 &&
          charCode <= 0xf7 &&
          i + 11 < value.length
        ) {
          // 4-byte UTF-8 character.
          const nextHex1 = value.slice(i + 4, i + 6)
          const nextHex2 = value.slice(i + 7, i + 9)
          const nextHex3 = value.slice(i + 10, i + 12)
          const nextCharCode1 = parseInt(nextHex1, 16)
          const nextCharCode2 = parseInt(nextHex2, 16)
          const nextCharCode3 = parseInt(nextHex3, 16)
          if (
            !isNaN(nextCharCode1) &&
            !isNaN(nextCharCode2) &&
            !isNaN(nextCharCode3)
          ) {
            const buffer = Buffer.from([
              charCode,
              nextCharCode1,
              nextCharCode2,
              nextCharCode3,
            ])
            unescaped.push(buffer.toString('utf8'))
            i += 11 // Skip the next 11 characters (e.g., '\F0\9F\98\81').
            continue
          }
        }

        // Single-byte character (e.g., ASCII or control characters).
        unescaped.push(String.fromCharCode(charCode))
        i += 2 // Skip the next 2 characters (e.g., '\20').
        continue
      }
    }

    // Append regular characters.
    unescaped.push(char)
  }

  return unescaped.join('')
}

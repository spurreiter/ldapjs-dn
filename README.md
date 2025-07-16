# dn

> 🚨 Fork from https://github.com/ldapjs/dn  
> 🚨 ESM export

Provides objects for representing and working with LDAP distinguished name
strings as defined by [RFC 4514](https://www.rfc-editor.org/rfc/rfc4514).

## Usage

```sh
npm i @spurreiter/ldapjs-dn

npm i git+ssh://git@github.com:spurreiter/ldapjs-dn#semver:^1
```

Get DN from object, string:

```js
import { DN } from '@spurreiter/ldapjs-dn'

const dn = DN.fromString('cn=foo,st=nice,dn=example,dn=com')
console.log(dn.normalize().toString())
//> 'cn=foo,dn=example,dn=com,st=nice'

const dn2 = DN.fromObject({
  cn: 'foo',
  st: 'nice',
  dn: ['example', 'com'],
})
console.log(dn.toString())
//> 'cn=foo,st=nice,dn=example,dn=com'
```

RFC 4514 escaping/ unescaping:

```js
import { escapeValue, unescapeValue } from '@spurreiter/ldapjs-dn'

console.log(escapeValue('😀'))
//> '\\f0\\9f\\98\\80'
console.log(unescapeValue('\\20\\f0\\9f\\98\\80'))
//> ' 😀'
```

## License

MIT.

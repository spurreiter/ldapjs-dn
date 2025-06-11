# dn

> 🚨 Fork from https://github.com/ldapjs/dn  
> 🚨 ESM export

Provides objects for representing and working with LDAP distinguished name
strings as defined by [RFC 4514](https://www.rfc-editor.org/rfc/rfc4514).

## Usage

```sh
npm i git+ssh://git@github.com:spurreiter/ldapjs-dn#semver:^1
```

```js
import { DN } from '@spurreiter/ldapjs-dn'

const dn = DN.fromString('cn=foo,st=nice,dn=example,dn=com')
console.log(dn.normalize().toString())
//> 'cn=foo,dn=example,dn=com,st=nice'

const dn2 = DN.fromObject({
  cn: 'foo', 
  st: 'nice',
  dn: ['example', 'com']
})
console.log(dn.toString())
//> 'cn=foo,st=nice,dn=example,dn=com'
```

## License

MIT.

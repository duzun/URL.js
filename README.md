# URL.js

[![Build Status](https://travis-ci.com/duzun/URL.js.svg?branch=master)](https://travis-ci.com/duzun/URL.js)
[![codecov](https://codecov.io/gh/duzun/URL.js/branch/master/graph/badge.svg)](https://codecov.io/gh/duzun/URL.js)

Parse and format URLs

## Install

`URL.js` uses [ESM](https://nodejs.org/api/esm.html#esm_modules_ecmascript_modules) & [UMD](https://github.com/umdjs/umd).

The simplest way is to include [`URL.js`](https://unpkg.com/url-js) in your HTML:

```html
<script src="https://unpkg.com/url-js"></script>

```

or install it with npm:

```sh
npm i -S url-js
```

then import it as ES Module or CommonJS Module:

```javascript
import URLJS from 'url-js'; // ESM
    // or
const URLJS = require('url-js'); // CommonJS
```

## Usage

```javascript
// 1. Parse full URL
var url = URLJS("https://www.duzun.me/path/index.php?var1=223#hash") ->
{
    "protocol": "https:",
    "username": "",
    "password": "",
    "host"    : "www.duzun.me",
    "hostname": "www.duzun.me",
    "port"    : "",
    "pathname": "/path/index.php",
    "search"  : "?var1=223",
    "query"   : "var1=223",
    "hash"    : "#hash",
    "path"    : "/path/index.php?var1=223",
    "origin"  : "https://www.duzun.me",
    "domain"  : "duzun.me",
    "href"    : "https://www.duzun.me/path/index.php?var1=223#hash"
}

String(url) -> "https://www.duzun.me/path/index.php?var1=223#hash"


// 2. Compute full URL for a relative URL
String( URLJS("new/?and=var", url) ) -> "https://www.duzun.me/path/new/?and=var"


// 3. Get part of an URL
URLJS.parseUrl("https://duzun.me/path/index.php", "origin") -> "https://duzun.me"
URLJS.parseUrl("https://duzun.me/path/index.php", "pathname") -> "/path/index.php"
URLJS.parseUrl("https://duzun.com/?var1=2&var2=d%27t&var3", "query", true) -> { var1: "2", var2: "d't", var3: "" }


// 4. Validation
URLJS.is_url('https://duzun.me') -> true
URLJS.is_domain('duzun.me')     -> true


// 5. GET < - > Object conversion
URLJS.fromObject({a:1,b:4}, "?")   -> "?&a=1&b=4"
URLJS.toObject('a=1&b=4')          -> { a: 1, b: 4 }

```

You can also import distinct functions as ESM:

```javascript
import toObject from 'url-js/url/toObject';
import fromObject from 'url-js/url/fromObject';
import fromLocation from 'url-js/url/fromLocation';
import parseUrl from 'url-js/url/parseUrl'; // not the same as URLJS.parseUrl(), unless invoked as parseUrl.call(URLJS, href)
import { is_url, is_domain } from 'url-js/url/helpers';
import URLJS from 'url-js/url/URL'; // the same as 'url-js'
```

## Changes in v2.0.0

Some properties of `URLJS` instances are computed from the base properties and can no longer be set to arbitrary values.
Setting these properties to any value would set the values for related base properties:

`.origin`
`.host`
`.path`
`.href`
`.domain`

## Incompatible changes in v1.0.0

When included in global scope with a `<script>` tag,
the name is `URLJS` now instead of `URL`, to avoid collision with the new `URL` API. Thus, there is no need in `URLJS.noConflict()` any more.

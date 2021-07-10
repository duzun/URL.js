# URL.js

[![Build Status](https://travis-ci.org/duzun/URL.js.svg?branch=master)](https://travis-ci.org/duzun/URL.js)
[![codecov](https://codecov.io/gh/duzun/URL.js/branch/master/graph/badge.svg)](https://codecov.io/gh/duzun/URL.js)

Parse and format URLs

## Install

`URL.js` uses [UMD](https://github.com/umdjs/umd).

The simplest way is to include [`URL.js`](https://unpkg.com/url-js) in your HTML:

```html
<script src="https://unpkg.com/url-js"></script>

```

or install it with npm:

```sh
npm i -S url-js
```


## Usage

```javascript
const URLJS = require('url-js'); // if in Node.js

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

## Incompatible changes in v1.0.0

When included in global scope with a `<script>` tag,
the name is `URLJS` now instead of `URL`, to avoid colision with the new `URL` API. Thus, there is no need in `URLJS.noConflict()` any more.

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

## Usage

```javascript
// 1. Parse full URL
    var url = URL("https://www.duzun.me/path/index.php?var1=223#hash") ->
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
    String( URL("new/?and=var", url) ) -> "https://www.duzun.me/path/new/?and=var"


// 3. Get part of an URL
    URL.parseUrl("https://duzun.me/path/index.php", "origin") -> "https://duzun.me"
    URL.parseUrl("https://duzun.me/path/index.php", "pathname") -> "/path/index.php"
    URL.parseUrl("https://duzun.com/?var1=2&var2=d%27t&var3", "query", true) -> { var1: "2", var2: "d't", var3: "" }


// 4. Validation
    URL.is_url('https://duzun.me') -> true
    URL.is_domain('duzun.me')     -> true


// 5. GET < - > Object conversion
    URL.fromObject({a:1,b:4}, "?")   -> "?&a=1&b=4"
    URL.toObject('a=1&b=4')          -> { a: 1, b: 4 }

```

Note:   If included in global scope with a `<script>` tag,
        you can `var URLJS = URL.noConflict()` to restore original `window.URL` and
        keep using `URLJS` in your module.

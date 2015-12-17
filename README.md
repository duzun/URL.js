# URL.js
Parse and format URLs


## Usage

```javascript
// 1. Parse full URL
    var url = URL("https://duzun.me/path/index.php?var1=223#hash") ->
    {
      "protocol": "https:",
      "username": "",
      "password": "",
      "host"    : "duzun.me",
      "hostname": "duzun.me",
      "port"    : "",
      "pathname": "/path/index.php",
      "search"  : "?var1=223",
      "query"   : "var1=223",
      "hash"    : "#hash",
      "path"    : "/path/index.php?var1=223",
      "origin"  : "https://duzun.me",
      "domain"  : "duzun.me",
      "href"    : "https://duzun.me/path/index.php?var1=223#hash"
    }

    String(url) -> "https://duzun.me/path/index.php?var1=223#hash"

// 2. Get part of an URL
    URL.parseUrl("https://duzun.me/path/index.php?var1=223#hash", "origin") -> "https://duzun.me"
    URL.parseUrl("https://duzun.me/path/index.php?var1=223#hash", "pathname") -> "/path/index.php"

// 3. Validation
    URL.is_url('http://duzun.me') -> true
    URL.is_domain('duzun.me')     -> true

// 4. GET < - > Object conversion
    URL.fromObject({a:1,b:4}, "?")   -> "?&a=1&b=4"
    URL.toObject('a=1&b=4')          -> {a: 1, b: 4}

```


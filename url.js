/**
 *  URL parser.
 *
 *  Usage:
 *
 *     var url = URL("https://www.example.com/path/index.php?var1=223#hash") ->
 *     {
 *       "protocol": "https:",
 *       "username": "",
 *       "password": "",
 *       "host"    : "www.example.com",
 *       "hostname": "www.example.com",
 *       "port"    : "",
 *       "pathname": "/path/index.php",
 *       "search"  : "?var1=223",
 *       "query"   : "var1=223",
 *       "hash"    : "#hash",
 *       "path"    : "/path/index.php?var1=223",
 *       "origin"  : "https://www.example.com",
 *       "domain"  : "example.com",
 *       "href"    : "https://www.example.com/path/index.php?var1=223#hash"
 *     }
 *
 *     String(url) -> "https://www.example.com/path/index.php?var1=223#hash"
 *
 *     String( URL("new/path?and=var", url) ) -> "https://www.example.com/path/new/path?and=var"
 *
 *     URL.parseUrl("https://www.example.com/path/index.php?var1=223#hash", "origin") -> "https://www.example.com"
 *     URL.parseUrl("https://www.example.com/?var1=2&var2=d%27t&var3", "query", true) -> {var1: "2", var2: "d't", var3: ""}
 *
 *     URL.is_url('http://example.com') -> true
 *     URL.is_domain('example.com')     -> true
 *
 *     URL.fromObject({a:1,b:4}, "?")   -> "?&a=1&b=4"
 *     URL.toObject('a=1&b=4')          -> {a: 1, b: 4}
 *
 *
 *
 *  @license MIT
 *  @version 0.2.5
 *  @author Dumitru Uzun (DUzun.Me)
 *  @umd AMD, Browser, CommonJs, noDeps
 */
// ---------------------------------------------------------------------------
/*jshint esversion: 6*/
/*globals define, module, global, self*/
// ---------------------------------------------------------------------------
;(function (name, global, String, Object, RegExp) {
    // ---------------------------------------------------------------------------
    // Some globals:
    const {
        encodeURIComponent,
        decodeURIComponent,
        URL: _URL, // in newer browsers there is a URL class
    } = global;

    // const hop  = ({}.hasOwnProperty);

    // UMD:
    (typeof define !== 'function' || !define.amd
        ? typeof module == 'undefined' || !module.exports
            // Browser
            ? (deps, factory) => {
                var URL = factory();
                URL.noConflict = function () {
                    if ( global[name] === URL ) global[name] = _URL;
                    return URL;
                };
                global[name] = URL;
            }
            // CommonJs
            : (deps, factory) => { module.exports = factory(); }
        // AMD
        : define
    )
    /*define*/(/*name, */[], function factory() {

        // Constructor
        function URL(url, baseURL) {
            if ( url != undefined ) {
                let _url = URL.parseUrl(url);
                if ( _url !== false ) return _url;
                if ( baseURL ) {
                    _url = URL.parseUrl(baseURL);
                    if ( _url === false ) return;
                    url = String(url);
                    if ( url.slice(0,2) == '//' ) {
                        return URL.parseUrl(_url.protocol + url);
                    }
                    let _path;
                    if ( url.slice(0,1) == '/' ) {
                        _path = url;
                    }
                    else {
                        _path = _url.pathname.split('/');
                        _path[_path.length-1] = url;
                        _path = _path.join('/');
                    }
                    return URL.parseUrl(_url.origin + _path);
                }
                throw new SyntaxError("Failed to construct 'URL': Invalid URL");
            }
        }

        if ( _URL ) {
            URL._ = _URL; // original URL implementation

            // for(let i in _URL) if( hop.call(_URL, i) ) {
            //     URL[i] = _URL[i];
            // }
        }

        // anti-`asshole effect` (eg. undefined = true;)
        var undefined; //jshint ignore:line
        // ---------------------------------------------------------------------------
        const _ = URL
        ,   __ = _.prototype
        // ---------------------------------------------------------------------------
        ,   NIL = ''
        // ---------------------------------------------------------------------------
        ,   _is_url_r_    = /^[\w.+\-]{3,20}\:\/\/[a-z0-9]/i
        ,   _is_domain_r_ = /^[a-z0-9][0-9a-z_\-]*(?:\.[a-z0-9][0-9a-z_\-]*)*$/
        ,   _excludeQueryChart_r_ = /[\t\r\n\x09]/g
        // ---------------------------------------------------------------------------
        ,   __ex = typeof Object.defineProperty == 'function'
              ? (name, func, proto) => {
                  Object.defineProperty(proto||__, name, {
                      value: func,
                      configurable: true,
                      enumerable: false,
                      writeable: true
                  });
              }
              : (name, func, proto) => {
                  // Take care with (for ... in) on strings!
                  (proto||__)[name] = func;
              }
        ;
        // ---------------------------------------------------------------------------
        const _parse_url_exp = new RegExp([
                '^([\\w.+\\-\\*]+:)//'          // protocol
              , '(([^:/?#]*)(?::([^/?#]*))?@|)' // username:password
              , '(([^:/?#]*)(?::(\\d+))?)'      // host == hostname:port
              , '(/[^?#]*|)'                    // pathname
              , '(\\?([^#]*)|)'                 // search & query
              , '(#.*|)$'                       // hash
            ].join(NIL))
        ,   _parse_url_map = {
                protocol: 1
              , username: 3
              , password: 4
              , host    : 5
              , hostname: 6
              , port    : 7
              , pathname: 8
              , search  : 9
              , query   : 10
              , hash    : 11
            }
        ;

        // ---------------------------------------------------------------------------
        function _uri_to_string_() {
            return _.fromLocation(this);
        }
        __ex('toString', _uri_to_string_);
        __ex('valueOf', _uri_to_string_);

        // ---------------------------------------------------------------------------
        _.parseUrl = function parseUrl(href, part, parseQuery) {
            href = String(href);
            var match = href.match(_parse_url_exp)
            ,   map = _parse_url_map
            ,   i, ret = false
            ;
            if(match) {
                if(part && part in map) {
                    ret = match[map[part]] || NIL;
                    if ( part == 'pathname' ) {
                        if(!ret) ret = '/';
                    }
                    if ( parseQuery && part == 'query' ) {
                        ret = _.toObject(ret||NIL);
                    }
                }
                else {
                    ret = new URL();
                    for(i in map) if(map.hasOwnProperty(i)) {
                        ret[i] = match[map[i]] || NIL;
                    }
                    if(!ret.pathname) ret.pathname = '/';
                    ret.path   = ret.pathname + ret.search;
                    ret.origin = ret.protocol + '//' + ret.host;
                    ret.domain = ret.hostname.replace(/^www./, NIL).toLowerCase();
                    if ( parseQuery ) ret.query = _.toObject(ret.query||NIL);
                    ret.href = String(href); // ??? may need some parse
                    if(part) ret = ret[part];
                }
            }
            return ret;
        };

        _.fromLocation = function (o) {
            var url = [], t;
            if(t = o.protocol) url.push(t.toLowerCase() + '//');
            if((t = o.username) || o.password) {
                url.push(t || NIL);
                if(t = o.password) url.push(':' + t);
                url.push('@');
            }
            if(t = o.hostname) {
                url.push(t.toLowerCase());
                if(t = o.port) url.push(':' + t);
            }
            else
            if(t = o.host) url.push(t.toLowerCase());

            if(t = o.pathname) url.push((t.substr(0,1) == '/' ? NIL : '/') + t);
            if(t = o.search || o.query)   {
                if(typeof t == 'object') {
                    t = _.fromObject(t);
                }
                if (t && t != '?') {
                    url.push((t.substr(0,1) == '?' ? NIL : '?') + t);
                }
            }
            if(t = o.hash) url.push((t.substr(0,1) == '#' ? NIL : '#') + t);

            return url.join(NIL);
        };
        // ---------------------------------------------------------------------------
        _.toObject = function (str, sep, eq, ndec) {
            if(sep == undefined) sep = '&';
            if(eq == undefined) eq = '=';
            var j = String(str.replace(_excludeQueryChart_r_, NIL)).split(sep)
            ,   i = j.length
            ,   a = {}
            ,   t
            ;
            ndec = ndec ? decodeAmp : urldecode;
            while(i-->0) if(t = j[i]) {
                t = t.split(eq);
                j[i] = t.splice(0,1)[0];
                t = t.join(eq);
                a[ndec(j[i])] = ndec(t);
            }
            return a;
        };

        _.fromObject = function (o, pref, nenc) {
            var r = Object.keys(o),
                i = r.length,
                n, v;

            if(!r.length) return pref ? pref + '' : '';

            r.sort();
            nenc = nenc ? encodeAmp : encodeURIComponent;
            for ( ; i--; ) {
               n = r[i];
               v = o[n];
               if(v == null) r.splice(i,1);
               else {
                  n = nenc(n);
                  if(v !== NIL) n += '=' + nenc(v);
                  r[i] = n;
               }
            }
            // Object.each(o, nenc ? function(n,v) { if(v != u) n += '=' + v; r[++i] = n } :
                // function(n,v) { n = encodeURIComponent(n); if(v != u) n += '=' + encodeURIComponent(v); r[++i] = n }
            // );
            r = r.join('&');
            if(pref) r = pref + (typeof pref != 'string' || pref.indexOf('?') < 0 ? '?' : '&') + r;
            return r;
        };
        // ---------------------------------------------------------------------------
        _.is_url     = (str) => _is_url_r_.test(str);
        _.is_domain  = (str) => _is_domain_r_.test(str);
        // ---------------------------------------------------------------------------
        // ---------------------------------------------------------------------------
        // Helpers:
        function decodeAmp(str) {
            return String(str).replace(/%26/g, '&');
        }
        function encodeAmp(str) {
            return String(str).replace(/\&/g, '%26');
        }
        function urldecode(str) {
            return decodeURIComponent(String(str).replace(/\+/g, '%20'));
        }
        // ---------------------------------------------------------------------------
        return _;
    });
    // ---------------------------------------------------------------------------
}
('URL', typeof self == 'undefined' ? typeof global == 'undefined' ? this : global : self, String, Object, RegExp));
// ---------------------------------------------------------------------------

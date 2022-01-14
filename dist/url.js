(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.URLJS = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  var NIL = '';
  var _is_url_r_ = /^[\w.+\-]{3,20}\:\/\/[a-z0-9]/i;
  var _is_domain_r_ = /^[a-z0-9][0-9a-z_\-]*(?:\.[a-z0-9][0-9a-z_\-]*)*$/;
  var _www_r_ = /^www./;
  function getDomainName(hostname) {
    return String(hostname).replace(_www_r_, NIL).toLowerCase();
  }
  function is_url(str) {
    return _is_url_r_.test(str);
  }
  function is_domain(str) {
    return _is_domain_r_.test(str);
  }
  function decodeAmp(str) {
    return String(str).replace(/%26/g, '&');
  }
  function encodeAmp(str) {
    return String(str).replace(/\&/g, '%26');
  }
  function urldecode(str) {
    return decodeURIComponent(String(str).replace(/\+/g, '%20'));
  }
  function defProp(obj, prop, get) {
    var set = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var conf = {
      configurable: true,
      enumerable: true,
      writeable: true
    };
    if (get) conf.get = get;

    if (set) {
      conf.set = set === true ? function (val) {
        delete obj[prop];
        if (this !== obj) delete this[prop]; // obj is prototype?

        this[prop] = val;
      } : set;
    }

    return Object.defineProperty(obj, prop, conf);
  }

  var _excludeQueryChart_r_ = /[\t\r\n\x09]/g;
  function toObject(str, sep, eq, ndec) {
    if (sep == undefined) sep = '&';
    if (eq == undefined) eq = '=';
    var j = String(str.replace(_excludeQueryChart_r_, NIL)).split(sep),
        i = j.length,
        a = {},
        t;
    ndec = ndec ? decodeAmp : urldecode;

    while (i-- > 0) {
      if (t = j[i]) {
        t = t.split(eq);
        j[i] = t.splice(0, 1)[0];
        t = t.join(eq);
        a[ndec(j[i])] = ndec(t);
      }
    }

    return a;
  }

  /*globals URL*/

  var _parse_url_exp = new RegExp(['^([\\w.+\\-\\*]+:)//' // protocol
  , '(([^:/?#]*)(?::([^/?#]*))?@|)' // username:password
  , '(([^:/?#]*)(?::(\\d+))?)' // host == hostname:port
  , '(/[^?#]*|)' // pathname
  , '(\\?([^#]*)|)' // search & query
  , '(#.*|)$' // hash
  ].join(NIL));

  var _parse_url_map = {
    protocol: 1,
    username: 3,
    password: 4,
    host: 5,
    hostname: 6,
    port: 7,
    pathname: 8,
    search: 9,
    query: 10,
    hash: 11
  };
  function parseUrl(href, part, parseQuery) {
    href = String(href);
    var match = href.match(_parse_url_exp),
        map = _parse_url_map,
        i,
        ret = false;

    if (match) {
      if (part && part in map) {
        ret = match[map[part]] || NIL;

        if (part == 'pathname') {
          if (!ret) ret = '/';
        }

        if (parseQuery && part == 'query') {
          ret = toObject(ret || NIL);
        }
      } else {
        var _ = this;

        if (typeof _ != 'function') {
          _ = typeof URL == 'function' && URL.createObjectURL ? URL : Object;
          ret = new _(href); // ret.toString = function _uri_to_string_() {
          //     return fromLocation(this);
          // };
        } else {
          ret = new _(); // URLJS() constructor?
        }

        for (i in map) {
          if (map.hasOwnProperty(i)) {
            ret[i] = match[map[i]] || NIL;
          }
        }

        if (part && part in ret) return ret[part];
        if (!ret.pathname) ret.pathname = '/';
        if (!ret.path) ret.path = ret.pathname + ret.search;
        if (!ret.origin) ret.origin = ret.protocol + '//' + ret.host;
        if (!ret.domain) ret.domain = getDomainName(ret.hostname);
        if (parseQuery) ret.query = toObject(ret.query || NIL);
        if (!ret.origin) ret.href = String(href); // ??? may need some parse

        if (part) ret = ret[part];
      }
    }

    return ret;
  }

  function fromObject(o, pref, nenc) {
    var r = Object.keys(o),
        i = r.length,
        n,
        v;
    if (!r.length) return pref ? pref + '' : '';
    r.sort();
    nenc = nenc ? encodeAmp : encodeURIComponent;

    for (; i--;) {
      n = r[i];
      v = o[n];
      if (v == null) r.splice(i, 1);else {
        n = nenc(n);
        if (v !== NIL) n += '=' + nenc(v);
        r[i] = n;
      }
    } // Object.each(o, nenc ? function(n,v) { if(v != u) n += '=' + v; r[++i] = n } :
    // function(n,v) { n = encodeURIComponent(n); if(v != u) n += '=' + encodeURIComponent(v); r[++i] = n }
    // );


    r = r.join('&');
    if (pref) r = pref + (typeof pref != 'string' || pref.indexOf('?') < 0 ? '?' : '&') + r;
    return r;
  }

  function fromLocation(o) {
    var url = [],
        t;
    if (t = o.protocol) url.push(t.toLowerCase() + '//');

    if ((t = o.username) || o.password) {
      url.push(t || NIL);
      if (t = o.password) url.push(':' + t);
      url.push('@');
    }

    if (t = o.hostname) {
      url.push(t.toLowerCase());
      if (t = o.port) url.push(':' + t);
    } else if (t = o.host) url.push(t.toLowerCase());

    if (t = o.pathname) url.push((t.substr(0, 1) == '/' ? NIL : '/') + t);

    if (t = o.search || o.query) {
      if (_typeof(t) == 'object') {
        t = fromObject(t);
      }

      if (t && t != '?') {
        url.push((t.substr(0, 1) == '?' ? NIL : '?') + t);
      }
    }

    if (t = o.hash) url.push((t.substr(0, 1) == '#' ? NIL : '#') + t);
    return url.join(NIL);
  }

  /**
   *  URL parser.
   *
   *  @license MIT
   *  @version 2.0.0
   *  @author Dumitru Uzun (DUzun.Me)
   *  @umd AMD, Browser, CommonJs, noDeps
   */

  function URLJS(url, baseURL, parseQuery) {
    if (url != undefined) {
      var _url = parseUrl.call(URLJS, url, undefined, parseQuery);

      if (_url !== false) return _url;

      if (baseURL) {
        _url = baseURL instanceof URLJS ? baseURL : parseUrl.call(URLJS, baseURL);
        if (_url === false) return;
        url = String(url);

        if (url.slice(0, 2) == '//') {
          return parseUrl.call(URLJS, _url.protocol + url, undefined, parseQuery);
        }

        var _path;

        if (url.slice(0, 1) == '/') {
          _path = url;
        } else {
          _path = _url.pathname.split('/');
          _path[_path.length - 1] = url;
          _path = _path.join('/');
        }

        return parseUrl.call(URLJS, _url.origin + _path, undefined, parseQuery);
      }

      throw new SyntaxError("Failed to construct 'URL': Invalid URL");
    }
  } // ---------------------------------------------------------------------------

  URLJS.parseUrl = parseUrl;
  URLJS.fromLocation = fromLocation;
  URLJS.toObject = toObject;
  URLJS.fromObject = fromObject; // ---------------------------------------------------------------------------

  URLJS.is_url = is_url;
  URLJS.is_domain = is_domain; // ---------------------------------------------------------------------------

  var __ = URLJS.prototype; // ---------------------------------------------------------------------------

  var __ex = typeof Object.defineProperty == 'function' ? function (name, func, proto) {
    Object.defineProperty(proto || __, name, {
      value: func,
      configurable: true,
      enumerable: false,
      writeable: true
    });
  } : function (name, func, proto) {
    // Take care with (for ... in) on strings!
    (proto || __)[name] = func;
  }; // ---------------------------------------------------------------------------


  function _uri_to_string_() {
    return fromLocation(this);
  }

  __ex('toString', _uri_to_string_);

  __ex('valueOf', _uri_to_string_); // ---------------------------------------------------------------------------


  if (Object.assign) {
    Object.assign(__, {
      protocol: undefined,
      username: undefined,
      password: undefined,
      host: undefined,
      hostname: undefined,
      port: undefined,
      pathname: undefined,
      search: undefined,
      query: undefined,
      hash: undefined
    });
  }

  defProp(__, 'origin', function () {
    var u = this;

    if (u.protocol || u.host || u.hostname) {
      return u.protocol + '//' + (u.host || u.hostname + (u.port ? ':' + u.port : NIL));
    }
  }, function (origin) {
    var u = this;
    if (u.origin == origin) return;
    var v = new URLJS(origin, u);
    u.protocol = v.protocol;
    u.hostname = v.hostname;
    u.port = v.port; // In the case these props have been overwritten
    // u.host = v.host;
  });
  defProp(__, 'href', function () {
    return String(this);
  }, function (href) {
    var u = this;
    if (u.href == href) return;
    var v = new URLJS(href, u);
    u.protocol = v.protocol;
    u.username = v.username;
    u.password = v.password;
    u.hostname = v.hostname;
    u.port = v.port;
    u.pathname = v.pathname;
    u.search = v.search;
    u.hash = v.hash;
    u.query = search2query(v.search, _typeof(u.query) == 'object'); // In the case these props have been overwritten
    // u.host = v.host;
    // u.origin = v.origin;
  });
  defProp(__, 'host', function () {
    var u = this;

    if (u.hostname || u.port) {
      return (u.hostname || NIL) + (u.port ? ':' + u.port : NIL);
    }
  }, function (host) {
    var u = this;
    if (u.host == host) return;
    var v = String(host).split(':');
    u.hostname = v.shift();
    u.port = v.length ? v.shift() : NIL;
  });
  defProp(__, 'path', function () {
    var u = this;
    return (u.pathname || NIL) + (u.search || NIL);
  }, function (path) {
    var u = this;
    if (u.path == path) return;
    var v = String(path).split('?');
    u.pathname = v.shift();
    if (u.pathname.slice(0, 1) != '/') u.pathname = '/' + u.pathname;
    var query = v.length ? v.join('?') : undefined;
    u.search = query != undefined ? '?' + query : NIL;
    u.query = _typeof(u.query) == 'object' ? toObject(query) : query || '';
  });
  defProp(__, 'pathname', function () {
    return '/';
  });
  defProp(__, 'domain', function () {
    var u = this;
    return getDomainName(u.hostname || NIL);
  });

  function search2query(search, asObj) {
    var query = search ? String(search).replace(/^\?/, NIL) : NIL;
    return asObj ? toObject(query) : query;
  }

  return URLJS;

}));
//# sourceMappingURL=url.js.map

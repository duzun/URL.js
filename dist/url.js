/*
 MIT
  @version 0.2.5
  @author Dumitru Uzun (DUzun.Me)
  @umd AMD, Browser, CommonJs, noDeps
*/
(function(name, global, String, Object, RegExp) {
  var $jscomp$destructuring$var0 = global;
  var encodeURIComponent = $jscomp$destructuring$var0.encodeURIComponent;
  var decodeURIComponent = $jscomp$destructuring$var0.decodeURIComponent;
  var _URL = $jscomp$destructuring$var0.URL;
  (typeof define !== "function" || !define.amd ? typeof module == "undefined" || !module.exports ? function(deps, factory) {
    var URL = factory();
    URL.noConflict = function() {
      if (global[name] === URL) {
        global[name] = _URL;
      }
      return URL;
    };
    global[name] = URL;
  } : function(deps, factory) {
    module.exports = factory();
  } : define)([], function factory() {
    function URL(url, baseURL) {
      if (url != undefined) {
        var _url = URL.parseUrl(url);
        if (_url !== false) {
          return _url;
        }
        if (baseURL) {
          _url = URL.parseUrl(baseURL);
          if (_url === false) {
            return;
          }
          url = String(url);
          if (url.slice(0, 2) == "//") {
            return URL.parseUrl(_url.protocol + url);
          }
          var _path;
          if (url.slice(0, 1) == "/") {
            _path = url;
          } else {
            _path = _url.pathname.split("/");
            _path[_path.length - 1] = url;
            _path = _path.join("/");
          }
          return URL.parseUrl(_url.origin + _path);
        }
        throw new SyntaxError("Failed to construct 'URL': Invalid URL");
      }
    }
    if (_URL) {
      URL._ = _URL;
    }
    var undefined;
    var _ = URL;
    var __ = _.prototype;
    var NIL = "";
    var _is_url_r_ = /^[\w.+\-]{3,20}:\/\/[a-z0-9]/i;
    var _is_domain_r_ = /^[a-z0-9][0-9a-z_\-]*(?:\.[a-z0-9][0-9a-z_\-]*)*$/;
    var _excludeQueryChart_r_ = /[\t\r\n\x09]/g;
    var __ex = typeof Object.defineProperty == "function" ? function(name, func, proto) {
      Object.defineProperty(proto || __, name, {value:func, configurable:true, enumerable:false, writeable:true});
    } : function(name, func, proto) {
      (proto || __)[name] = func;
    };
    var _parse_url_exp = new RegExp(["^([\\w.+\\-\\*]+:)//", "(([^:/?#]*)(?::([^/?#]*))?@|)", "(([^:/?#]*)(?::(\\d+))?)", "(/[^?#]*|)", "(\\?([^#]*)|)", "(#.*|)$"].join(NIL));
    var _parse_url_map = {protocol:1, username:3, password:4, host:5, hostname:6, port:7, pathname:8, search:9, query:10, hash:11};
    function _uri_to_string_() {
      return _.fromLocation(this);
    }
    __ex("toString", _uri_to_string_);
    __ex("valueOf", _uri_to_string_);
    _.parseUrl = function parseUrl(href, part, parseQuery) {
      href = String(href);
      var match = href.match(_parse_url_exp), map = _parse_url_map, i, ret = false;
      if (match) {
        if (part && part in map) {
          ret = match[map[part]] || NIL;
          if (part == "pathname") {
            if (!ret) {
              ret = "/";
            }
          }
          if (parseQuery && part == "query") {
            ret = _.toObject(ret || NIL);
          }
        } else {
          ret = new URL;
          for (i in map) {
            if (map.hasOwnProperty(i)) {
              ret[i] = match[map[i]] || NIL;
            }
          }
          if (!ret.pathname) {
            ret.pathname = "/";
          }
          ret.path = ret.pathname + ret.search;
          ret.origin = ret.protocol + "//" + ret.host;
          ret.domain = ret.hostname.replace(/^www./, NIL).toLowerCase();
          if (parseQuery) {
            ret.query = _.toObject(ret.query || NIL);
          }
          ret.href = String(href);
          if (part) {
            ret = ret[part];
          }
        }
      }
      return ret;
    };
    _.fromLocation = function(o) {
      var url = [], t;
      if (t = o.protocol) {
        url.push(t.toLowerCase() + "//");
      }
      if ((t = o.username) || o.password) {
        url.push(t || NIL);
        if (t = o.password) {
          url.push(":" + t);
        }
        url.push("@");
      }
      if (t = o.hostname) {
        url.push(t.toLowerCase());
        if (t = o.port) {
          url.push(":" + t);
        }
      } else {
        if (t = o.host) {
          url.push(t.toLowerCase());
        }
      }
      if (t = o.pathname) {
        url.push((t.substr(0, 1) == "/" ? NIL : "/") + t);
      }
      if (t = o.search || o.query) {
        if (typeof t == "object") {
          t = _.fromObject(t);
        }
        if (t && t != "?") {
          url.push((t.substr(0, 1) == "?" ? NIL : "?") + t);
        }
      }
      if (t = o.hash) {
        url.push((t.substr(0, 1) == "#" ? NIL : "#") + t);
      }
      return url.join(NIL);
    };
    _.toObject = function(str, sep, eq, ndec) {
      if (sep == undefined) {
        sep = "&";
      }
      if (eq == undefined) {
        eq = "=";
      }
      var j = String(str.replace(_excludeQueryChart_r_, NIL)).split(sep), i = j.length, a = {}, t;
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
    };
    _.fromObject = function(o, pref, nenc) {
      var r = Object.keys(o), i = r.length, n, v;
      if (!r.length) {
        return pref ? pref + "" : "";
      }
      r.sort();
      nenc = nenc ? encodeAmp : encodeURIComponent;
      for (; i--;) {
        n = r[i];
        v = o[n];
        if (v == null) {
          r.splice(i, 1);
        } else {
          n = nenc(n);
          if (v !== NIL) {
            n += "=" + nenc(v);
          }
          r[i] = n;
        }
      }
      r = r.join("&");
      if (pref) {
        r = pref + (typeof pref != "string" || pref.indexOf("?") < 0 ? "?" : "&") + r;
      }
      return r;
    };
    _.is_url = function(str) {
      return _is_url_r_.test(str);
    };
    _.is_domain = function(str) {
      return _is_domain_r_.test(str);
    };
    function decodeAmp(str) {
      return String(str).replace(/%26/g, "&");
    }
    function encodeAmp(str) {
      return String(str).replace(/&/g, "%26");
    }
    function urldecode(str) {
      return decodeURIComponent(String(str).replace(/\+/g, "%20"));
    }
    return _;
  });
})("URL", typeof self == "undefined" ? typeof global == "undefined" ? this : global : self, String, Object, RegExp);


import parseUrl from './parseUrl';
import fromLocation from './fromLocation';
import fromObject from './fromObject';
import toObject from './toObject';
import { is_domain, is_url } from './helpers';

/**
 *  URL parser.
 *
 *  @license MIT
 *  @version 1.0.0
 *  @author Dumitru Uzun (DUzun.Me)
 *  @umd AMD, Browser, CommonJs, noDeps
 */
export default function URLJS(url, baseURL) {
    if (url != undefined) {
        let _url = parseUrl.call(URLJS, url);
        if (_url !== false) return _url;
        if (baseURL) {
            _url = parseUrl.call(URLJS, baseURL);
            if (_url === false) return;
            url = String(url);
            if (url.slice(0, 2) == '//') {
                return parseUrl.call(URLJS, _url.protocol + url);
            }
            let _path;
            if (url.slice(0, 1) == '/') {
                _path = url;
            }
            else {
                _path = _url.pathname.split('/');
                _path[_path.length - 1] = url;
                _path = _path.join('/');
            }
            return parseUrl.call(URLJS, _url.origin + _path);
        }
        throw new SyntaxError(`Failed to construct 'URL': Invalid URL`);
    }
}

const __ = URLJS.prototype;
    // ---------------------------------------------------------------------------
const __ex = typeof Object.defineProperty == 'function'
        ? (name, func, proto) => {
            Object.defineProperty(proto || __, name, {
                value: func,
                configurable: true,
                enumerable: false,
                writeable: true
            });
        }
        : (name, func, proto) => {
            // Take care with (for ... in) on strings!
            (proto || __)[name] = func;
        }
    ;
// ---------------------------------------------------------------------------
function _uri_to_string_() {
    return fromLocation(this);
}
__ex('toString', _uri_to_string_);
__ex('valueOf', _uri_to_string_);

// ---------------------------------------------------------------------------
URLJS.parseUrl = parseUrl;
URLJS.fromLocation = fromLocation;
URLJS.toObject = toObject;
URLJS.fromObject = fromObject;
// ---------------------------------------------------------------------------
URLJS.is_url = is_url;
URLJS.is_domain = is_domain;

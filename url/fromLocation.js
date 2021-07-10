import fromObject from './fromObject';
import { NIL } from './helpers';

export default function fromLocation(o) {
    var url = [], t;
    if (t = o.protocol) url.push(t.toLowerCase() + '//');
    if ((t = o.username) || o.password) {
        url.push(t || NIL);
        if (t = o.password) url.push(':' + t);
        url.push('@');
    }
    if (t = o.hostname) {
        url.push(t.toLowerCase());
        if (t = o.port) url.push(':' + t);
    }
    else
        if (t = o.host) url.push(t.toLowerCase());

    if (t = o.pathname) url.push((t.substr(0, 1) == '/' ? NIL : '/') + t);
    if (t = o.search || o.query) {
        if (typeof t == 'object') {
            t = fromObject(t);
        }
        if (t && t != '?') {
            url.push((t.substr(0, 1) == '?' ? NIL : '?') + t);
        }
    }
    if (t = o.hash) url.push((t.substr(0, 1) == '#' ? NIL : '#') + t);

    return url.join(NIL);
}

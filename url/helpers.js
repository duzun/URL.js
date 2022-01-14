
export const NIL = '';

const _is_url_r_ = /^[\w.+\-]{3,20}\:\/\/[a-z0-9]/i;
const _is_domain_r_ = /^[a-z0-9][0-9a-z_\-]*(?:\.[a-z0-9][0-9a-z_\-]*)*$/;
const _www_r_ = /^www./;

export function getDomainName(hostname) {
    return String(hostname).replace(_www_r_, NIL).toLowerCase();
}

export function is_url(str) {
    return _is_url_r_.test(str);
}

export function is_domain(str) {
    return _is_domain_r_.test(str);
}

export function decodeAmp(str) {
    return String(str).replace(/%26/g, '&');
}

export function encodeAmp(str) {
    return String(str).replace(/\&/g, '%26');
}

export function urldecode(str) {
    return decodeURIComponent(String(str).replace(/\+/g, '%20'));
}

export function defProp(obj, prop, get, set=true) {
    const conf = {
        configurable: true,
        enumerable: true,
        writeable: true,
    };
    if (get) conf.get = get;
    if (set) {
        conf.set = set === true
        ? function (val) {
            delete obj[prop];
            if (this !== obj) delete this[prop]; // obj is prototype?
            this[prop] = val;
        }
        : set
        ;
    }
    return Object.defineProperty(obj, prop, conf);
}

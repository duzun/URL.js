
export const NIL = '';

const _is_url_r_ = /^[\w.+\-]{3,20}\:\/\/[a-z0-9]/i;
const _is_domain_r_ = /^[a-z0-9][0-9a-z_\-]*(?:\.[a-z0-9][0-9a-z_\-]*)*$/;

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

import { encodeAmp, NIL } from './helpers';

export default function fromObject(o, pref, nenc) {
    var r = Object.keys(o),
        i = r.length,
        n, v;

    if (!r.length) return pref ? pref + '' : '';

    r.sort();
    nenc = nenc ? encodeAmp : encodeURIComponent;
    for (; i--;) {
        n = r[i];
        v = o[n];
        if (v == null) r.splice(i, 1);
        else {
            n = nenc(n);
            if (v !== NIL) n += '=' + nenc(v);
            r[i] = n;
        }
    }
    // Object.each(o, nenc ? function(n,v) { if(v != u) n += '=' + v; r[++i] = n } :
    // function(n,v) { n = encodeURIComponent(n); if(v != u) n += '=' + encodeURIComponent(v); r[++i] = n }
    // );
    r = r.join('&');
    if (pref) r = pref + (typeof pref != 'string' || pref.indexOf('?') < 0 ? '?' : '&') + r;
    return r;
}

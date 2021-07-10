import { decodeAmp, urldecode, NIL } from './helpers';

const _excludeQueryChart_r_ = /[\t\r\n\x09]/g;

export default function toObject(str, sep, eq, ndec) {
    if (sep == undefined) sep = '&';
    if (eq == undefined) eq = '=';
    var j = String(str.replace(_excludeQueryChart_r_, NIL)).split(sep)
        , i = j.length
        , a = {}
        , t
        ;
    ndec = ndec ? decodeAmp : urldecode;
    while (i-- > 0) if (t = j[i]) {
        t = t.split(eq);
        j[i] = t.splice(0, 1)[0];
        t = t.join(eq);
        a[ndec(j[i])] = ndec(t);
    }
    return a;
}

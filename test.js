/*globals require, describe, it, expect*/

var URL = require('.');

describe('URL', function() {
    var completeURL = 'https://me:pass@www.duzun.me:443/playground/genpasswd?some=var&enc=don%27t&e&w=w+w#andHash';

    describe('new URL(url, baseURL)', function() {
        it('should create an instance of URL or throw', function () {
            var a = new URL("/", "https://www.duzun.me");
            var b = new URL("https://www.duzun.me");
            var c = new URL('en-US/docs', b);
            var d = new URL('/en-US/docs', b);
            var f = new URL('/en-US/docs', d);
            var g = new URL('/en-US/docs', "https://www.duzun.me/fr-FR/toto");
            var h = new URL('/en-US/docs', a);
            var k = new URL('http://www.example.com', 'https://developers.mozilla.com');
            var l = new URL('http://www.example.com', b);
            var m = new URL('//www.example.com/path/xyz?var=123', b);
            var n = new URL('zyx?u', m);

            expect(String(a)).toBe('https://www.duzun.me/');
            expect(String(b)).toBe('https://www.duzun.me/');
            expect(String(c)).toBe('https://www.duzun.me/en-US/docs');
            expect(String(d)).toBe('https://www.duzun.me/en-US/docs');
            expect(String(f)).toBe('https://www.duzun.me/en-US/docs');
            expect(String(g)).toBe('https://www.duzun.me/en-US/docs');
            expect(String(h)).toBe('https://www.duzun.me/en-US/docs');
            expect(String(k)).toBe('http://www.example.com/');
            expect(String(l)).toBe('http://www.example.com/');
            expect(String(m)).toBe('https://www.example.com/path/xyz?var=123');
            expect(String(n)).toBe('https://www.example.com/path/zyx?u');

            // Rebuild .search from .query
            delete m.search;
            expect(String(m)).toBe('https://www.example.com/path/xyz?var=123');

            try {
                var i = new URL('/en-US/docs', '');
                expect(i).toEqual(false);
            }
            catch(err) {}

            try {
                var j = new URL('/en-US/docs');
                expect(j).toEqual(false);
            }
            catch(err) {}
        });
    });

    describe('URL.parseUrl(url)', function () {
        it('should return false when url not a valid URL', function () {
            var u;
            u  = URL.parseUrl('/');
            expect(u).toBe(false);

            u = URL.parseUrl('//example.com');
            expect(u).toBe(false);

            u = URL.parseUrl('//example.com/?test=var');
            expect(u).toBe(false);

            u = URL.parseUrl('://example.com');
            expect(u).toBe(false);
        });

        it('should return an instance of URL', function () {
            var u = URL.parseUrl(completeURL);
            expect(u instanceof URL).toBe(true);

            expect(u.hash).toBe("#andHash");
            expect(u.host).toBe("www.duzun.me:443");
            expect(u.hostname).toBe("www.duzun.me");
            expect(u.href).toEqual(completeURL);
            expect(u.origin).toBe("https://www.duzun.me:443");
            expect(u.password).toBe("pass");
            expect(u.pathname).toBe("/playground/genpasswd");
            expect(u.port).toBe("443");
            expect(u.protocol).toBe("https:");
            expect(u.search).toBe("?some=var&enc=don%27t&e&w=w+w");
            expect(u.username).toBe("me");

            // non-standard
            expect(u.domain).toBe("duzun.me");
            expect(u.path).toBe("/playground/genpasswd?some=var&enc=don%27t&e&w=w+w");
            expect(u.query).toBe("some=var&enc=don%27t&e&w=w+w");
        });
    });

    describe('URL.parseUrl(url, part)', function () {
        it('should return only the requested part of the parsed URL', function () {
            expect(URL.parseUrl(completeURL, 'hostname')).toBe("www.duzun.me");
            expect(URL.parseUrl(completeURL, 'domain')).toBe("duzun.me");
            expect(URL.parseUrl(completeURL, 'query')).toBe("some=var&enc=don%27t&e&w=w+w");
        });
    });

    describe('URL.parseUrl(url, "query", true)', function () {
        it('should return an object of parsed search query', function () {
            var q = URL.parseUrl(completeURL, 'query', true);
            expect(q instanceof Object).toBe(true);
            expect(q).toEqual({w: "w w", e: "", enc: "don't", some: "var"});
        });
    });

    describe('URL.parseUrl(url, undefined, true)', function () {
        var u;
        it('should return an instance of URL, with parsed .query', function () {
            u = URL.parseUrl(completeURL, undefined, true);
            expect(u instanceof URL).toBe(true);
            expect(u instanceof Object).toBe(true);
        });

        it('should rebuild .search from .query', function () {
            // Test reconstruct from .query
            delete u.search;

            u.query = {x:123};
            expect(String(u)).toEqual(completeURL.replace(/\?[^#]*#/, '?x=123#'));

            u.query = {};
            expect(String(u)).toEqual(completeURL.replace(/\?[^#]*#/, '#'));
        });
    });

});

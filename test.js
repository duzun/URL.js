/*globals require, describe, it, expect*/

var URLJS = require('.');

describe('URL', function() {
    var completeURL = 'https://me:pass@www.duzun.me:443/playground/genpasswd?some=var&enc=don%27t&e&w=w+w& white\t = \n space\x09\r #andHash';

    describe('new URLJS(url, baseURL)', function() {
        it('should create an instance of URL or throw', function () {
            var a = new URLJS("/", "https://www.duzun.me");
            var b = new URLJS("https://www.duzun.me");
            var c = new URLJS('en-US/docs', b);
            var d = new URLJS('/en-US/docs', b);
            var f = new URLJS('/en-US/docs', d);
            var g = new URLJS('/en-US/docs', "https://www.duzun.me/fr-FR/toto");
            var h = new URLJS('/en-US/docs', a);
            var k = new URLJS('http://www.example.com', 'https://developers.mozilla.com');
            var l = new URLJS('http://www.example.com', b);
            var m = new URLJS('//www.example.com/path/xyz?var=123', b);
            var n = new URLJS('zyx?u', m);

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

            // Rebuild .search from .query and .hostname from .host
            delete m.search;
            delete m.hostname;
            expect(String(m)).toBe('https://www.example.com/path/xyz?var=123');

            try {
                var i = new URLJS('/en-US/docs', '');
                expect(i).toEqual(false);
            }
            catch(err) {}

            try {
                var j = new URLJS('/en-US/docs');
                expect(j).toEqual(false);
            }
            catch(err) {}
        });
    });

    describe('URLJS.parseUrl(url)', function () {
        it('should return false when url is not a valid URL', function () {
            var u;
            u  = URLJS.parseUrl('/');
            expect(u).toBe(false);

            u = URLJS.parseUrl('//example.com');
            expect(u).toBe(false);

            u = URLJS.parseUrl('//example.com/?test=var');
            expect(u).toBe(false);

            u = URLJS.parseUrl('://example.com');
            expect(u).toBe(false);
        });

        it('should return an instance of URL', function () {
            var u = URLJS.parseUrl(completeURL);
            expect(u instanceof URLJS).toBe(true);

            expect(u.hash).toBe("#andHash");
            expect(u.host).toBe("www.duzun.me:443");
            expect(u.hostname).toBe("www.duzun.me");
            expect(u.href).toEqual(completeURL);
            expect(u.origin).toBe("https://www.duzun.me:443");
            expect(u.password).toBe("pass");
            expect(u.pathname).toBe("/playground/genpasswd");
            expect(u.port).toBe("443");
            expect(u.protocol).toBe("https:");
            expect(u.search).toBe("?some=var&enc=don%27t&e&w=w+w& white\t = \n space\x09\r ");
            expect(u.username).toBe("me");

            // non-standard
            expect(u.domain).toBe("duzun.me");
            expect(u.path).toBe("/playground/genpasswd?some=var&enc=don%27t&e&w=w+w& white\t = \n space\x09\r ");
            expect(u.query).toBe("some=var&enc=don%27t&e&w=w+w& white\t = \n space\x09\r ");
        });
    });

    describe('URLJS.parseUrl(url, part)', function () {
        it('should return only the requested part of the parsed URL', function () {
            expect(URLJS.parseUrl(completeURL, 'hostname')).toBe("www.duzun.me");
            expect(URLJS.parseUrl(completeURL, 'domain')).toBe("duzun.me");
            expect(URLJS.parseUrl(completeURL, 'query')).toBe("some=var&enc=don%27t&e&w=w+w& white\t = \n space\x09\r ");
            expect(URLJS.parseUrl(completeURL, 'pathname')).toBe("/playground/genpasswd");
        });
    });

    describe('URLJS.parseUrl(url, "query", true)', function () {
        it('should return an object of parsed search query', function () {
            var q = URLJS.parseUrl(completeURL, 'query', true);
            expect(q instanceof Object).toBe(true);
            expect(q).toEqual({w: "w w", e: "", enc: "don't", some: "var", ' white ': '  space '});
        });
    });

    describe('URLJS.parseUrl(url, undefined, true)', function () {
        var u;
        it('should return an instance of URL, with parsed .query', function () {
            u = URLJS.parseUrl(completeURL, undefined, true);
            expect(u instanceof URLJS).toBe(true);
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

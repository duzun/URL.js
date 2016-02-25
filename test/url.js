
var URL = require('..');

describe('URL', function() {
    var completeURL = 'https://me:pass@www.duzun.me:443/playground/genpasswd?some=var&enc=don%27t&e#andHash';

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

            String(a).should.eql('https://www.duzun.me/');
            String(b).should.eql('https://www.duzun.me/');
            String(c).should.eql('https://www.duzun.me/en-US/docs');
            String(d).should.eql('https://www.duzun.me/en-US/docs');
            String(f).should.eql('https://www.duzun.me/en-US/docs');
            String(g).should.eql('https://www.duzun.me/en-US/docs');
            String(h).should.eql('https://www.duzun.me/en-US/docs');
            String(k).should.eql('http://www.example.com/');
            String(l).should.eql('http://www.example.com/');
            String(m).should.eql('https://www.example.com/path/xyz?var=123');
            String(n).should.eql('https://www.example.com/path/zyx?u');

            try {
                var i = new URL('/en-US/docs', '');
                i.should.eql(false, 'must throw');
            }
            catch(err) {}

            try {
                var j = new URL('/en-US/docs');
                j.should.eql(false, 'must throw');
            }
            catch(err) {}
        });
    });

    describe('URL.parseUrl(url)', function () {
        it('should return false when url not a valid URL', function () {
            var u = URL.parseUrl('/');
            u.should.eql(false);

            var u = URL.parseUrl('//example.com');
            u.should.eql(false);

            var u = URL.parseUrl('//example.com/?test=var');
            u.should.eql(false);

            var u = URL.parseUrl('://example.com');
            u.should.eql(false);
        });

        it('should return an instance of URL', function () {
            var u = URL.parseUrl(completeURL);
            (u instanceof URL).should.be.true();

            u.hash.should.eql("#andHash");
            u.host.should.eql("www.duzun.me:443");
            u.hostname.should.eql("www.duzun.me");
            u.href.should.eql(completeURL);
            u.origin.should.eql("https://www.duzun.me:443");
            u.password.should.eql("pass");
            u.pathname.should.eql("/playground/genpasswd");
            u.port.should.eql("443");
            u.protocol.should.eql("https:");
            u.search.should.eql("?some=var&enc=don%27t&e");
            u.username.should.eql("me");

            // non-standard
            u.domain.should.eql("duzun.me");
            u.path.should.eql("/playground/genpasswd?some=var&enc=don%27t&e");
            u.query.should.eql("some=var&enc=don%27t&e");
        });
    });

    describe('URL.parseUrl(url, part)', function () {
        it('should return only the requested part of the parsed URL', function () {
            URL.parseUrl(completeURL, 'hostname').should.eql("www.duzun.me");
            URL.parseUrl(completeURL, 'domain').should.eql("duzun.me");
            URL.parseUrl(completeURL, 'query').should.eql("some=var&enc=don%27t&e");
        });
    });

    describe('URL.parseUrl(url, "query", true)', function () {
        it('should return an object of parsed search query', function () {
            var q = URL.parseUrl(completeURL, 'query', true);
            q.should.be.an.Object();
            q.should.eql({e: "", enc: "don't", some: "var"});
        });
    });

});


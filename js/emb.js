new (function () {
  this.navigator = window.navigator;
  this.document = window.document;
  this.setTimeout = window.setTimeout.bind(window);
  var f,
    aa = aa || {},
    l = this;
  function m(a) {
    return void 0 !== a;
  }
  function ba() {}
  function n(a) {
    a.j = function () {
      return a.hc ? a.hc : (a.hc = new a());
    };
  }
  function ca(a) {
    var b = typeof a;
    if ("object" == b)
      if (a) {
        if (a instanceof Array) return "array";
        if (a instanceof Object) return b;
        var c = Object.prototype.toString.call(a);
        if ("[object Window]" == c) return "object";
        if (
          "[object Array]" == c ||
          ("number" == typeof a.length &&
            "undefined" != typeof a.splice &&
            "undefined" != typeof a.propertyIsEnumerable &&
            !a.propertyIsEnumerable("splice"))
        )
          return "array";
        if (
          "[object Function]" == c ||
          ("undefined" != typeof a.call &&
            "undefined" != typeof a.propertyIsEnumerable &&
            !a.propertyIsEnumerable("call"))
        )
          return "function";
      } else return "null";
    else if ("function" == b && "undefined" == typeof a.call) return "object";
    return b;
  }
  function p(a) {
    return "array" == ca(a);
  }
  function da(a) {
    var b = ca(a);
    return "array" == b || ("object" == b && "number" == typeof a.length);
  }
  function q(a) {
    return "string" == typeof a;
  }
  function r(a) {
    return "number" == typeof a;
  }
  function ea(a) {
    return "function" == ca(a);
  }
  function fa(a) {
    var b = typeof a;
    return ("object" == b && null != a) || "function" == b;
  }
  var ga = "closure_uid_" + ((1e9 * Math.random()) >>> 0),
    ha = 0;
  function ia(a, b, c) {
    return a.call.apply(a.bind, arguments);
  }
  function ja(a, b, c) {
    if (!a) throw Error();
    if (2 < arguments.length) {
      var d = Array.prototype.slice.call(arguments, 2);
      return function () {
        var c = Array.prototype.slice.call(arguments);
        Array.prototype.unshift.apply(c, d);
        return a.apply(b, c);
      };
    }
    return function () {
      return a.apply(b, arguments);
    };
  }
  function t(a, b, c) {
    t =
      Function.prototype.bind &&
      -1 != Function.prototype.bind.toString().indexOf("native code")
        ? ia
        : ja;
    return t.apply(null, arguments);
  }
  function ka(a, b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return function () {
      var b = c.slice();
      b.push.apply(b, arguments);
      return a.apply(this, b);
    };
  }
  var la =
    Date.now ||
    function () {
      return +new Date();
    };
  function u(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.F = b.prototype;
    a.prototype = new c();
    a.prototype.constructor = a;
    a.de = function (a, c, g) {
      for (
        var h = Array(arguments.length - 2), k = 2;
        k < arguments.length;
        k++
      )
        h[k - 2] = arguments[k];
      return b.prototype[c].apply(a, h);
    };
  }
  function ma(a) {
    a = String(a);
    if (
      /^\s*$/.test(a)
        ? 0
        : /^[\],:{}\s\u2028\u2029]*$/.test(
            a
              .replace(/\\["\\\/bfnrtu]/g, "@")
              .replace(
                /"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                "]"
              )
              .replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, "")
          )
    )
      try {
        return eval("(" + a + ")");
      } catch (b) {}
    throw Error("Invalid JSON string: " + a);
  }
  function na(a) {
    var b = [];
    oa(new pa(), a, b);
    return b.join("");
  }
  function pa() {
    this.Ya = void 0;
  }
  function oa(a, b, c) {
    switch (typeof b) {
      case "string":
        sa(b, c);
        break;
      case "number":
        c.push(isFinite(b) && !isNaN(b) ? b : "null");
        break;
      case "boolean":
        c.push(b);
        break;
      case "undefined":
        c.push("null");
        break;
      case "object":
        if (null == b) {
          c.push("null");
          break;
        }
        if (p(b)) {
          var d = b.length;
          c.push("[");
          for (var e = "", g = 0; g < d; g++)
            c.push(e),
              (e = b[g]),
              oa(a, a.Ya ? a.Ya.call(b, String(g), e) : e, c),
              (e = ",");
          c.push("]");
          break;
        }
        c.push("{");
        d = "";
        for (g in b)
          Object.prototype.hasOwnProperty.call(b, g) &&
            ((e = b[g]),
            "function" != typeof e &&
              (c.push(d),
              sa(g, c),
              c.push(":"),
              oa(a, a.Ya ? a.Ya.call(b, g, e) : e, c),
              (d = ",")));
        c.push("}");
        break;
      case "function":
        break;
      default:
        throw Error("Unknown type: " + typeof b);
    }
  }
  var ta = {
      '"': '\\"',
      "\\": "\\\\",
      "/": "\\/",
      "\b": "\\b",
      "\f": "\\f",
      "\n": "\\n",
      "\r": "\\r",
      "\t": "\\t",
      "\x0B": "\\u000b",
    },
    ua = /\uffff/.test("\uffff")
      ? /[\\\"\x00-\x1f\x7f-\uffff]/g
      : /[\\\"\x00-\x1f\x7f-\xff]/g;
  function sa(a, b) {
    b.push(
      '"',
      a.replace(ua, function (a) {
        if (a in ta) return ta[a];
        var b = a.charCodeAt(0),
          e = "\\u";
        16 > b ? (e += "000") : 256 > b ? (e += "00") : 4096 > b && (e += "0");
        return (ta[a] = e + b.toString(16));
      }),
      '"'
    );
  }
  var va;
  function wa(a) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, wa);
    else {
      var b = Error().stack;
      b && (this.stack = b);
    }
    a && (this.message = String(a));
  }
  u(wa, Error);
  wa.prototype.name = "CustomError";
  function xa(a, b) {
    for (
      var c = a.split("%s"),
        d = "",
        e = Array.prototype.slice.call(arguments, 1);
      e.length && 1 < c.length;

    )
      d += c.shift() + e.shift();
    return d + c.join("%s");
  }
  var ya = String.prototype.trim
    ? function (a) {
        return a.trim();
      }
    : function (a) {
        return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
      };
  function za(a) {
    if (!Aa.test(a)) return a;
    -1 != a.indexOf("&") && (a = a.replace(Ba, "&amp;"));
    -1 != a.indexOf("<") && (a = a.replace(Ca, "&lt;"));
    -1 != a.indexOf(">") && (a = a.replace(Da, "&gt;"));
    -1 != a.indexOf('"') && (a = a.replace(Ea, "&quot;"));
    -1 != a.indexOf("'") && (a = a.replace(Fa, "&#39;"));
    -1 != a.indexOf("\x00") && (a = a.replace(Ga, "&#0;"));
    return a;
  }
  var Ba = /&/g,
    Ca = /</g,
    Da = />/g,
    Ea = /"/g,
    Fa = /'/g,
    Ga = /\x00/g,
    Aa = /[\x00&<>"']/;
  function Ha(a, b) {
    for (
      var c = 0,
        d = ya(String(a)).split("."),
        e = ya(String(b)).split("."),
        g = Math.max(d.length, e.length),
        h = 0;
      0 == c && h < g;
      h++
    ) {
      var k = d[h] || "",
        y = e[h] || "",
        Wd = RegExp("(\\d*)(\\D*)", "g"),
        Xd = RegExp("(\\d*)(\\D*)", "g");
      do {
        var qa = Wd.exec(k) || ["", "", ""],
          ra = Xd.exec(y) || ["", "", ""];
        if (0 == qa[0].length && 0 == ra[0].length) break;
        c =
          Ia(
            0 == qa[1].length ? 0 : parseInt(qa[1], 10),
            0 == ra[1].length ? 0 : parseInt(ra[1], 10)
          ) ||
          Ia(0 == qa[2].length, 0 == ra[2].length) ||
          Ia(qa[2], ra[2]);
      } while (0 == c);
    }
    return c;
  }
  function Ia(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  function Ja(a) {
    return String(a).replace(/\-([a-z])/g, function (a, c) {
      return c.toUpperCase();
    });
  }
  function Ka(a) {
    var b = q(void 0)
      ? "undefined"
          .replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1")
          .replace(/\x08/g, "\\x08")
      : "\\s";
    return a.replace(
      new RegExp("(^" + (b ? "|[" + b + "]+" : "") + ")([a-z])", "g"),
      function (a, b, e) {
        return b + e.toUpperCase();
      }
    );
  }
  function La(a, b) {
    b.unshift(a);
    wa.call(this, xa.apply(null, b));
    b.shift();
  }
  u(La, wa);
  La.prototype.name = "AssertionError";
  function Ma(a, b) {
    throw new La(
      "Failure" + (a ? ": " + a : ""),
      Array.prototype.slice.call(arguments, 1)
    );
  }
  var v = Array.prototype,
    Na = v.indexOf
      ? function (a, b, c) {
          return v.indexOf.call(a, b, c);
        }
      : function (a, b, c) {
          c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
          if (q(a)) return q(b) && 1 == b.length ? a.indexOf(b, c) : -1;
          for (; c < a.length; c++) if (c in a && a[c] === b) return c;
          return -1;
        },
    Oa = v.forEach
      ? function (a, b, c) {
          v.forEach.call(a, b, c);
        }
      : function (a, b, c) {
          for (var d = a.length, e = q(a) ? a.split("") : a, g = 0; g < d; g++)
            g in e && b.call(c, e[g], g, a);
        },
    Pa = v.filter
      ? function (a, b, c) {
          return v.filter.call(a, b, c);
        }
      : function (a, b, c) {
          for (
            var d = a.length, e = [], g = 0, h = q(a) ? a.split("") : a, k = 0;
            k < d;
            k++
          )
            if (k in h) {
              var y = h[k];
              b.call(c, y, k, a) && (e[g++] = y);
            }
          return e;
        };
  function Qa(a) {
    var b;
    a: {
      b = Ra;
      for (var c = a.length, d = q(a) ? a.split("") : a, e = 0; e < c; e++)
        if (e in d && b.call(void 0, d[e], e, a)) {
          b = e;
          break a;
        }
      b = -1;
    }
    return 0 > b ? null : q(a) ? a.charAt(b) : a[b];
  }
  function Sa(a) {
    return v.concat.apply(v, arguments);
  }
  function Ta(a) {
    var b = a.length;
    if (0 < b) {
      for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
      return c;
    }
    return [];
  }
  function Ua(a, b) {
    for (var c in a) b.call(void 0, a[c], c, a);
  }
  function Va(a) {
    var b = [],
      c = 0,
      d;
    for (d in a) b[c++] = a[d];
    return b;
  }
  function Wa(a) {
    var b = [],
      c = 0,
      d;
    for (d in a) b[c++] = d;
    return b;
  }
  var Xa = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(
    " "
  );
  function Ya(a, b) {
    for (var c, d, e = 1; e < arguments.length; e++) {
      d = arguments[e];
      for (c in d) a[c] = d[c];
      for (var g = 0; g < Xa.length; g++)
        (c = Xa[g]),
          Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
    }
  }
  function Za(a) {
    var b = arguments.length;
    if (1 == b && p(arguments[0])) return Za.apply(null, arguments[0]);
    for (var c = {}, d = 0; d < b; d++) c[arguments[d]] = !0;
    return c;
  }
  Za(
    "area base br col command embed hr img input keygen link meta param source track wbr".split(
      " "
    )
  );
  Za(
    "action",
    "cite",
    "data",
    "formaction",
    "href",
    "manifest",
    "poster",
    "src"
  );
  Za("embed", "iframe", "link", "object", "script", "style", "template");
  var w;
  a: {
    var $a = l.navigator;
    if ($a) {
      var ab = $a.userAgent;
      if (ab) {
        w = ab;
        break a;
      }
    }
    w = "";
  }
  function x(a) {
    return -1 != w.indexOf(a);
  }
  var bb = x("Opera") || x("OPR"),
    z = x("Trident") || x("MSIE"),
    A =
      x("Gecko") &&
      -1 == w.toLowerCase().indexOf("webkit") &&
      !(x("Trident") || x("MSIE")),
    B = -1 != w.toLowerCase().indexOf("webkit"),
    cb = B && x("Mobile"),
    db = x("Macintosh"),
    eb = x("Windows"),
    fb = x("Linux") || x("CrOS"),
    gb,
    hb = l.navigator || null;
  gb = !!hb && -1 != (hb.appVersion || "").indexOf("X11");
  function ib() {
    var a = l.document;
    return a ? a.documentMode : void 0;
  }
  var jb = (function () {
      var a = "",
        b;
      if (bb && l.opera) return (a = l.opera.version), ea(a) ? a() : a;
      A
        ? (b = /rv\:([^\);]+)(\)|;)/)
        : z
        ? (b = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/)
        : B && (b = /WebKit\/(\S+)/);
      b && (a = (a = b.exec(w)) ? a[1] : "");
      return z && ((b = ib()), b > parseFloat(a)) ? String(b) : a;
    })(),
    kb = {};
  function C(a) {
    return kb[a] || (kb[a] = 0 <= Ha(jb, a));
  }
  var lb = l.document,
    D =
      lb && z
        ? ib() || ("CSS1Compat" == lb.compatMode ? parseInt(jb, 10) : 5)
        : void 0;
  function mb(a) {
    if ("function" == typeof a.Q) return a.Q();
    if (q(a)) return a.split("");
    if (da(a)) {
      for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
      return b;
    }
    return Va(a);
  }
  function nb(a, b, c) {
    if ("function" == typeof a.forEach) a.forEach(b, c);
    else if (da(a) || q(a)) Oa(a, b, c);
    else {
      var d;
      if ("function" == typeof a.X) d = a.X();
      else if ("function" != typeof a.Q)
        if (da(a) || q(a)) {
          d = [];
          for (var e = a.length, g = 0; g < e; g++) d.push(g);
        } else d = Wa(a);
      else d = void 0;
      for (var e = mb(a), g = e.length, h = 0; h < g; h++)
        b.call(c, e[h], d && d[h], a);
    }
  }
  function ob(a, b) {
    this.A = {};
    this.l = [];
    this.m = 0;
    var c = arguments.length;
    if (1 < c) {
      if (c % 2) throw Error("Uneven number of arguments");
      for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1]);
    } else if (a) {
      a instanceof ob ? ((c = a.X()), (d = a.Q())) : ((c = Wa(a)), (d = Va(a)));
      for (var e = 0; e < c.length; e++) this.set(c[e], d[e]);
    }
  }
  f = ob.prototype;
  f.Q = function () {
    pb(this);
    for (var a = [], b = 0; b < this.l.length; b++) a.push(this.A[this.l[b]]);
    return a;
  };
  f.X = function () {
    pb(this);
    return this.l.concat();
  };
  f.wa = function (a) {
    return qb(this.A, a);
  };
  f.clear = function () {
    this.A = {};
    this.m = this.l.length = 0;
  };
  f.remove = function (a) {
    return qb(this.A, a)
      ? (delete this.A[a], this.m--, this.l.length > 2 * this.m && pb(this), !0)
      : !1;
  };
  function pb(a) {
    if (a.m != a.l.length) {
      for (var b = 0, c = 0; b < a.l.length; ) {
        var d = a.l[b];
        qb(a.A, d) && (a.l[c++] = d);
        b++;
      }
      a.l.length = c;
    }
    if (a.m != a.l.length) {
      for (var e = {}, c = (b = 0); b < a.l.length; )
        (d = a.l[b]), qb(e, d) || ((a.l[c++] = d), (e[d] = 1)), b++;
      a.l.length = c;
    }
  }
  f.get = function (a, b) {
    return qb(this.A, a) ? this.A[a] : b;
  };
  f.set = function (a, b) {
    qb(this.A, a) || (this.m++, this.l.push(a));
    this.A[a] = b;
  };
  f.forEach = function (a, b) {
    for (var c = this.X(), d = 0; d < c.length; d++) {
      var e = c[d],
        g = this.get(e);
      a.call(b, g, e, this);
    }
  };
  f.clone = function () {
    return new ob(this);
  };
  function qb(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }
  function rb(a, b, c, d, e) {
    this.reset(a, b, c, d, e);
  }
  rb.prototype.qb = null;
  var sb = 0;
  rb.prototype.reset = function (a, b, c, d, e) {
    "number" == typeof e || sb++;
    this.Jc = d || la();
    this.ha = a;
    this.pc = b;
    this.oc = c;
    delete this.qb;
  };
  rb.prototype.ab = function (a) {
    this.ha = a;
  };
  function tb(a) {
    this.qc = a;
    this.Ba = this.ib = this.ha = this.Va = null;
  }
  function E(a, b) {
    this.name = a;
    this.value = b;
  }
  E.prototype.toString = function () {
    return this.name;
  };
  var ub = new E("OFF", Infinity),
    vb = new E("SHOUT", 1200),
    wb = new E("SEVERE", 1e3),
    xb = new E("WARNING", 900),
    yb = new E("INFO", 800),
    zb = new E("CONFIG", 700),
    Ab = new E("FINE", 500);
  f = tb.prototype;
  f.getName = function () {
    return this.qc;
  };
  f.getParent = function () {
    return this.Va;
  };
  f.bc = function () {
    this.ib || (this.ib = {});
    return this.ib;
  };
  f.ab = function (a) {
    this.ha = a;
  };
  function Bb(a) {
    if (a.ha) return a.ha;
    if (a.Va) return Bb(a.Va);
    Ma("Root logger has no level set.");
    return null;
  }
  f.log = function (a, b, c) {
    if (a.value >= Bb(this).value)
      for (
        ea(b) && (b = b()),
          a = new rb(a, String(b), this.qc),
          c && (a.qb = c),
          c = "log:" + a.pc,
          l.console &&
            (l.console.timeStamp
              ? l.console.timeStamp(c)
              : l.console.markTimeline && l.console.markTimeline(c)),
          l.msWriteProfilerMark && l.msWriteProfilerMark(c),
          c = this;
        c;

      ) {
        b = c;
        var d = a;
        if (b.Ba) for (var e = 0, g = void 0; (g = b.Ba[e]); e++) g(d);
        c = c.getParent();
      }
  };
  f.info = function (a, b) {
    this.log(yb, a, b);
  };
  var Cb = {},
    Db = null;
  function Eb() {
    Db || ((Db = new tb("")), (Cb[""] = Db), Db.ab(zb));
  }
  function F(a) {
    Eb();
    var b;
    if (!(b = Cb[a])) {
      b = new tb(a);
      var c = a.lastIndexOf("."),
        d = a.substr(c + 1),
        c = F(a.substr(0, c));
      c.bc()[d] = b;
      b.Va = c;
      Cb[a] = b;
    }
    return b;
  }
  function G() {
    0 != Fb && (Gb[this[ga] || (this[ga] = ++ha)] = this);
    this.ca = this.ca;
    this.ja = this.ja;
  }
  var Fb = 0,
    Gb = {};
  G.prototype.ca = !1;
  G.prototype.Ub = function () {
    if (!this.ca && ((this.ca = !0), this.p(), 0 != Fb)) {
      var a = this[ga] || (this[ga] = ++ha);
      delete Gb[a];
    }
  };
  G.prototype.p = function () {
    if (this.ja) for (; this.ja.length; ) this.ja.shift()();
  };
  function Hb(a) {
    a && "function" == typeof a.Ub && a.Ub();
  }
  var Ib = "closure_listenable_" + ((1e6 * Math.random()) | 0),
    Jb = 0;
  function Kb(a, b, c, d, e) {
    this.ia = a;
    this.Xa = null;
    this.src = b;
    this.type = c;
    this.Ma = !!d;
    this.Pa = e;
    this.key = ++Jb;
    this.ra = this.La = !1;
  }
  function Lb(a) {
    a.ra = !0;
    a.ia = null;
    a.Xa = null;
    a.src = null;
    a.Pa = null;
  }
  function H(a) {
    this.src = a;
    this.q = {};
    this.Ia = 0;
  }
  H.prototype.add = function (a, b, c, d, e) {
    var g = a.toString();
    a = this.q[g];
    a || ((a = this.q[g] = []), this.Ia++);
    var h = Mb(a, b, d, e);
    -1 < h
      ? ((b = a[h]), c || (b.La = !1))
      : ((b = new Kb(b, this.src, g, !!d, e)), (b.La = c), a.push(b));
    return b;
  };
  H.prototype.remove = function (a, b, c, d) {
    a = a.toString();
    if (!(a in this.q)) return !1;
    var e = this.q[a];
    b = Mb(e, b, c, d);
    return -1 < b
      ? (Lb(e[b]),
        v.splice.call(e, b, 1),
        0 == e.length && (delete this.q[a], this.Ia--),
        !0)
      : !1;
  };
  function Nb(a, b) {
    var c = b.type;
    if (!(c in a.q)) return !1;
    var d = a.q[c],
      e = Na(d, b),
      g;
    (g = 0 <= e) && v.splice.call(d, e, 1);
    g && (Lb(b), 0 == a.q[c].length && (delete a.q[c], a.Ia--));
    return g;
  }
  H.prototype.Fa = function (a) {
    a = a && a.toString();
    var b = 0,
      c;
    for (c in this.q)
      if (!a || c == a) {
        for (var d = this.q[c], e = 0; e < d.length; e++) ++b, Lb(d[e]);
        delete this.q[c];
        this.Ia--;
      }
    return b;
  };
  H.prototype.Aa = function (a, b, c, d) {
    a = this.q[a.toString()];
    var e = -1;
    a && (e = Mb(a, b, c, d));
    return -1 < e ? a[e] : null;
  };
  function Mb(a, b, c, d) {
    for (var e = 0; e < a.length; ++e) {
      var g = a[e];
      if (!g.ra && g.ia == b && g.Ma == !!c && g.Pa == d) return e;
    }
    return -1;
  }
  function I(a, b) {
    this.type = a;
    this.currentTarget = this.target = b;
    this.defaultPrevented = this.la = !1;
    this.Bc = !0;
  }
  I.prototype.stopPropagation = function () {
    this.la = !0;
  };
  I.prototype.preventDefault = function () {
    this.defaultPrevented = !0;
    this.Bc = !1;
  };
  function Ob(a) {
    a.preventDefault();
  }
  var Pb = !z || (z && 9 <= D),
    Qb = !z || (z && 9 <= D),
    Rb = z && !C("9");
  !B || C("528");
  (A && C("1.9b")) || (z && C("8")) || (bb && C("9.5")) || (B && C("528"));
  (A && !C("8")) || (z && C("9"));
  function Sb(a) {
    Sb[" "](a);
    return a;
  }
  Sb[" "] = ba;
  function J(a, b) {
    I.call(this, a ? a.type : "");
    this.relatedTarget = this.currentTarget = this.target = null;
    this.charCode = this.keyCode = this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.P = this.state = null;
    if (a) {
      var c = (this.type = a.type),
        d = null;
      if ("touchstart" == c || "touchmove" == c) d = a.targetTouches[0];
      else if ("touchend" == c || "touchcancel" == c) d = a.changedTouches[0];
      this.target = null === d ? a.target || a.srcElement : d.target;
      this.currentTarget = b;
      var e = a.relatedTarget;
      if (e) {
        if (A) {
          var g;
          a: {
            try {
              Sb(e.nodeName);
              g = !0;
              break a;
            } catch (h) {}
            g = !1;
          }
          g || (e = null);
        }
      } else
        "mouseover" == c
          ? (e = a.fromElement)
          : "mouseout" == c && (e = a.toElement);
      this.relatedTarget = e;
      null === d
        ? ((this.offsetX = B || void 0 !== a.offsetX ? a.offsetX : a.layerX),
          (this.offsetY = B || void 0 !== a.offsetY ? a.offsetY : a.layerY),
          (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX),
          (this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY),
          (this.screenX = a.screenX || 0),
          (this.screenY = a.screenY || 0))
        : ((this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX),
          (this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY),
          (this.screenX = d.screenX || 0),
          (this.screenY = d.screenY || 0));
      this.button = a.button;
      this.keyCode = a.keyCode || 0;
      this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
      this.ctrlKey = a.ctrlKey;
      this.altKey = a.altKey;
      this.shiftKey = a.shiftKey;
      this.metaKey = a.metaKey;
      this.state = a.state;
      this.P = a;
      a.defaultPrevented && this.preventDefault();
    }
  }
  u(J, I);
  var Tb = [1, 4, 2];
  J.prototype.stopPropagation = function () {
    J.F.stopPropagation.call(this);
    this.P.stopPropagation
      ? this.P.stopPropagation()
      : (this.P.cancelBubble = !0);
  };
  J.prototype.preventDefault = function () {
    J.F.preventDefault.call(this);
    var a = this.P;
    if (a.preventDefault) a.preventDefault();
    else if (((a.returnValue = !1), Rb))
      try {
        if (a.ctrlKey || (112 <= a.keyCode && 123 >= a.keyCode)) a.keyCode = -1;
      } catch (b) {}
  };
  var Ub = "closure_lm_" + ((1e6 * Math.random()) | 0),
    Vb = {},
    Wb = 0;
  function K(a, b, c, d, e) {
    if (p(b)) {
      for (var g = 0; g < b.length; g++) K(a, b[g], c, d, e);
      return null;
    }
    c = Xb(c);
    if (a && a[Ib]) a = a.Y(b, c, d, e);
    else {
      if (!b) throw Error("Invalid event type");
      var g = !!d,
        h = Yb(a);
      h || (a[Ub] = h = new H(a));
      c = h.add(b, c, !1, d, e);
      c.Xa ||
        ((d = Zb()),
        (c.Xa = d),
        (d.src = a),
        (d.ia = c),
        a.addEventListener
          ? a.addEventListener(b.toString(), d, g)
          : a.attachEvent($b(b.toString()), d),
        Wb++);
      a = c;
    }
    return a;
  }
  function Zb() {
    var a = ac,
      b = Qb
        ? function (c) {
            return a.call(b.src, b.ia, c);
          }
        : function (c) {
            c = a.call(b.src, b.ia, c);
            if (!c) return c;
          };
    return b;
  }
  function bc(a, b, c, d, e) {
    if (p(b)) for (var g = 0; g < b.length; g++) bc(a, b[g], c, d, e);
    else
      (c = Xb(c)),
        a && a[Ib]
          ? a.Fb(b, c, d, e)
          : a && (a = Yb(a)) && (b = a.Aa(b, c, !!d, e)) && cc(b);
  }
  function cc(a) {
    if (r(a) || !a || a.ra) return !1;
    var b = a.src;
    if (b && b[Ib]) return Nb(b.W, a);
    var c = a.type,
      d = a.Xa;
    b.removeEventListener
      ? b.removeEventListener(c, d, a.Ma)
      : b.detachEvent && b.detachEvent($b(c), d);
    Wb--;
    (c = Yb(b))
      ? (Nb(c, a), 0 == c.Ia && ((c.src = null), (b[Ub] = null)))
      : Lb(a);
    return !0;
  }
  function $b(a) {
    return a in Vb ? Vb[a] : (Vb[a] = "on" + a);
  }
  function dc(a, b, c, d) {
    var e = !0;
    if ((a = Yb(a)))
      if ((b = a.q[b.toString()]))
        for (b = b.concat(), a = 0; a < b.length; a++) {
          var g = b[a];
          g && g.Ma == c && !g.ra && ((g = ec(g, d)), (e = e && !1 !== g));
        }
    return e;
  }
  function ec(a, b) {
    var c = a.ia,
      d = a.Pa || a.src;
    a.La && cc(a);
    return c.call(d, b);
  }
  function ac(a, b) {
    if (a.ra) return !0;
    if (!Qb) {
      var c;
      if (!(c = b))
        a: {
          c = ["window", "event"];
          for (var d = l, e; (e = c.shift()); )
            if (null != d[e]) d = d[e];
            else {
              c = null;
              break a;
            }
          c = d;
        }
      e = c;
      c = new J(e, this);
      d = !0;
      if (!(0 > e.keyCode || void 0 != e.returnValue)) {
        a: {
          var g = !1;
          if (0 == e.keyCode)
            try {
              e.keyCode = -1;
              break a;
            } catch (h) {
              g = !0;
            }
          if (g || void 0 == e.returnValue) e.returnValue = !0;
        }
        e = [];
        for (g = c.currentTarget; g; g = g.parentNode) e.push(g);
        for (var g = a.type, k = e.length - 1; !c.la && 0 <= k; k--) {
          c.currentTarget = e[k];
          var y = dc(e[k], g, !0, c),
            d = d && y;
        }
        for (k = 0; !c.la && k < e.length; k++)
          (c.currentTarget = e[k]), (y = dc(e[k], g, !1, c)), (d = d && y);
      }
      return d;
    }
    return ec(a, new J(b, this));
  }
  function Yb(a) {
    a = a[Ub];
    return a instanceof H ? a : null;
  }
  var fc = "__closure_events_fn_" + ((1e9 * Math.random()) >>> 0);
  function Xb(a) {
    if (ea(a)) return a;
    a[fc] ||
      (a[fc] = function (b) {
        return a.handleEvent(b);
      });
    return a[fc];
  }
  function L() {
    G.call(this);
    this.W = new H(this);
    this.Nc = this;
    this.Bb = null;
  }
  u(L, G);
  L.prototype[Ib] = !0;
  f = L.prototype;
  f.addEventListener = function (a, b, c, d) {
    K(this, a, b, c, d);
  };
  f.removeEventListener = function (a, b, c, d) {
    bc(this, a, b, c, d);
  };
  f.dispatchEvent = function (a) {
    var b,
      c = this.Bb;
    if (c) for (b = []; c; c = c.Bb) b.push(c);
    var c = this.Nc,
      d = a.type || a;
    if (q(a)) a = new I(a, c);
    else if (a instanceof I) a.target = a.target || c;
    else {
      var e = a;
      a = new I(d, c);
      Ya(a, e);
    }
    var e = !0,
      g;
    if (b)
      for (var h = b.length - 1; !a.la && 0 <= h; h--)
        (g = a.currentTarget = b[h]), (e = gc(g, d, !0, a) && e);
    a.la ||
      ((g = a.currentTarget = c),
      (e = gc(g, d, !0, a) && e),
      a.la || (e = gc(g, d, !1, a) && e));
    if (b)
      for (h = 0; !a.la && h < b.length; h++)
        (g = a.currentTarget = b[h]), (e = gc(g, d, !1, a) && e);
    return e;
  };
  f.p = function () {
    L.F.p.call(this);
    this.W && this.W.Fa(void 0);
    this.Bb = null;
  };
  f.Y = function (a, b, c, d) {
    return this.W.add(String(a), b, !1, c, d);
  };
  f.Fb = function (a, b, c, d) {
    return this.W.remove(String(a), b, c, d);
  };
  function gc(a, b, c, d) {
    b = a.W.q[String(b)];
    if (!b) return !0;
    b = b.concat();
    for (var e = !0, g = 0; g < b.length; ++g) {
      var h = b[g];
      if (h && !h.ra && h.Ma == c) {
        var k = h.ia,
          y = h.Pa || h.src;
        h.La && Nb(a.W, h);
        e = !1 !== k.call(y, d) && e;
      }
    }
    return e && 0 != d.Bc;
  }
  f.Aa = function (a, b, c, d) {
    return this.W.Aa(String(a), b, c, d);
  };
  var M = {};
  function hc() {
    L.call(this);
    this.ba = this.Tb = null;
    this.va = !1;
    this.Zd = "*";
    this.Jb = {
      syn: this.Yd,
      cid: this.fe,
      ack: this.Mc,
      pageshow: this.me,
      keyboardup: this.jd,
      keyboarddown: this.hd,
      iframeresize: this.Od,
      setuserscalable: this.Td,
      viewporttoobig: this.ae,
      browserviewrequest: this.Pc,
      browserviewresponse: this.ee,
      buttonexpanded: this.Rc,
      buttoncollapsed: this.Qc,
      resizedone: this.ne,
      resizeondrag: this.oe,
      orientation_change: this.le,
      zoomed: this.pe,
      settitle: this.Sd,
      inittitle: this.ge,
      enableresizedragger: this.Xc,
      sendtoapp: this.Rd,
      androidcallback: this.ce,
      openpm: this.ke,
    };
  }
  n(hc);
  u(hc, L);
  f = hc.prototype;
  f.e = F("chatango.embed.LocalComm");
  f.Ga = function (a) {
    this.Tb = a;
    K(window, "message", this.xd, !1, this);
  };
  f.send = function (a, b) {
    if (!(a in this.Jb)) throw "Sending illegal command " + a;
    var c = {};
    c.chatango_cmd = a;
    this.va && (c.fid = this.za);
    b && (c.payload = b);
    c = na(c);
    this.Tb.postMessage(c, this.Zd);
  };
  f.xd = function (a) {
    a = a.P;
    if (a.data) {
      M.f && this.e.info("onMsg_ " + a.data);
      var b;
      try {
        b = ma(a.data);
      } catch (c) {
        M.f && console.log("Chatango: unexpected msg:" + a.data);
        return;
      }
      (this.va && this.za != b.fid) ||
        ((a = b.chatango_cmd) &&
          this.Jb[a].apply(this, b.payload ? [b.payload] : []));
    }
  };
  f.disconnect = function () {
    this.va = !1;
  };
  function ic() {
    this.yc = la();
  }
  var jc = new ic();
  ic.prototype.set = function (a) {
    this.yc = a;
  };
  ic.prototype.reset = function () {
    this.set(la());
  };
  ic.prototype.get = function () {
    return this.yc;
  };
  function kc(a) {
    this.Ld = a || "";
    this.Xd = jc;
  }
  f = kc.prototype;
  f.Lb = !0;
  f.Dc = !0;
  f.Vd = !0;
  f.Ud = !0;
  f.Ec = !1;
  f.Wd = !1;
  function N(a) {
    return 10 > a ? "0" + a : String(a);
  }
  function lc(a, b) {
    var c = (a.Jc - b) / 1e3,
      d = c.toFixed(3),
      e = 0;
    if (1 > c) e = 2;
    else for (; 100 > c; ) e++, (c *= 10);
    for (; 0 < e--; ) d = " " + d;
    return d;
  }
  function mc(a) {
    kc.call(this, a);
  }
  u(mc, kc);
  function nc() {
    this.Md = t(this.Oc, this);
    this.Oa = new mc();
    this.Oa.Dc = !1;
    this.Oa.Ec = !1;
    this.ic = this.Oa.Lb = !1;
    this.nc = "";
    this.Yc = {};
  }
  function oc(a) {
    if (1 != a.ic) {
      var b;
      Eb();
      b = Db;
      var c = a.Md;
      b.Ba || (b.Ba = []);
      b.Ba.push(c);
      a.ic = !0;
    }
  }
  nc.prototype.Oc = function (a) {
    if (!this.Yc[a.oc]) {
      var b;
      b = this.Oa;
      var c = [];
      c.push(b.Ld, " ");
      if (b.Dc) {
        var d = new Date(a.Jc);
        c.push(
          "[",
          N(d.getFullYear() - 2e3) +
            N(d.getMonth() + 1) +
            N(d.getDate()) +
            " " +
            N(d.getHours()) +
            ":" +
            N(d.getMinutes()) +
            ":" +
            N(d.getSeconds()) +
            "." +
            N(Math.floor(d.getMilliseconds() / 10)),
          "] "
        );
      }
      b.Vd && c.push("[", lc(a, b.Xd.get()), "s] ");
      b.Ud && c.push("[", a.oc, "] ");
      b.Wd && c.push("[", a.ha.name, "] ");
      c.push(a.pc);
      b.Ec &&
        (d = a.qb) &&
        c.push("\n", d instanceof Error ? d.message : d.toString());
      b.Lb && c.push("\n");
      b = c.join("");
      if ((c = pc))
        switch (a.ha) {
          case vb:
            qc(c, "info", b);
            break;
          case wb:
            qc(c, "error", b);
            break;
          case xb:
            qc(c, "warn", b);
            break;
          default:
            qc(c, "debug", b);
        }
      else this.nc += b;
    }
  };
  var pc = l.console;
  function qc(a, b, c) {
    if (a[b]) a[b](c);
    else a.log(c);
  }
  function O(a, b) {
    I.call(this, a);
    this.type = a;
    this.data = b;
  }
  u(O, I);
  function P() {
    var a = w.toLowerCase();
    this.xa =
      -1 != a.indexOf("mobile") &&
      -1 == a.indexOf("kindle") &&
      -1 == a.indexOf("ipad")
        ? rc
        : -1 != a.indexOf("android") ||
          -1 != a.indexOf("ipad") ||
          -1 != a.indexOf("silk")
        ? sc
        : tc;
  }
  n(P);
  var rc = "desktop",
    sc = "desktop",
    tc = "desktop";
  P.prototype.xa = "desktop";
  function uc() {
    return P.j().xa == rc;
  }
  function vc() {
    P.j();
    return w.match(/(Android)/i) ? !0 : !1;
  }
  function wc() {
    hc.call(this);
  }
  n(wc);
  u(wc, hc);
  f = wc.prototype;
  f.e = F("chatango.embed.LocalCommParent");
  f.Ga = function (a, b, c, d) {
    wc.F.Ga.call(this, a);
    this.ba = b;
    this.za = c;
    this.ya = d;
  };
  f.Yd = function () {
    if (!this.va) {
      var a = {};
      a.fid = this.za;
      a.cid = this.ba;
      a.height = this.ya.Zc;
      a.width = this.ya.ad;
      a.loc = window.location.href;
      a.window = { width: window.innerWidth, height: window.innerHeight };
      a.handle = this.ya.g.handle;
      a.styles = xc(this.ya);
      a.expandedButton = 1 == this.ya.ac;
      M.f &&
        this.e.info("syn received, sending cid " + this.ba + " to a child");
      this.send("cid", a);
    }
  };
  f.Qc = function () {
    this.dispatchEvent(new O("buttoncollapsed"));
  };
  f.Mc = function (a) {
    M.f && this.e.info("ackRcvd for " + a);
    a == this.za &&
      (M.f && this.e.info("connection established for cid " + this.za),
      (this.va = !0),
      this.dispatchEvent(new O("connestablished")));
  };
  f.jd = function () {
    this.dispatchEvent(new O("kbup"));
  };
  f.hd = function () {
    this.dispatchEvent(new O("kbdown"));
  };
  f.Rc = function () {
    this.dispatchEvent(new O("buttonexpanded"));
  };
  f.Od = function (a) {
    this.dispatchEvent(new O("resizeiframe", a));
  };
  hc.prototype.Xc = function (a) {
    this.dispatchEvent(new O("enableresizedragger", a));
  };
  f = wc.prototype;
  f.Td = function (a) {
    this.dispatchEvent(new O("setuserscalable", a));
  };
  f.ae = function () {
    this.dispatchEvent(new O("viewporttoobig"));
  };
  f.Pc = function () {
    this.dispatchEvent(new O("browserviewrequest"));
  };
  f.Sd = function (a) {
    this.dispatchEvent(new O("settitle", a));
  };
  f.Rd = function (a) {
    void 0 !== window.android &&
      void 0 !== window.android.sendToApp &&
      window.android.sendToApp(JSON.stringify(a));
  };
  var yc = null,
    yc = "alecm",
    zc = yc + ".dev2.chattanga.com";
  var Ac = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;
  function Bc(a) {
    if (Cc) {
      Cc = !1;
      var b = l.location;
      if (b) {
        var c = b.href;
        if (c && (c = Dc(c)) && c != b.hostname) throw ((Cc = !0), Error());
      }
    }
    return a.match(Ac);
  }
  var Cc = B;
  function Dc(a) {
    return (a = Bc(a)[3] || null) ? decodeURI(a) : a;
  }
  function Ec(a, b) {
    for (var c = a.split("&"), d = 0; d < c.length; d++) {
      var e = c[d].indexOf("="),
        g = null,
        h = null;
      0 <= e
        ? ((g = c[d].substring(0, e)), (h = c[d].substring(e + 1)))
        : (g = c[d]);
      b(g, h ? decodeURIComponent(h.replace(/\+/g, " ")) : "");
    }
  }
  function Fc(a, b) {
    var c;
    if (a instanceof Fc)
      (this.B = m(b) ? b : a.B),
        Gc(this, a.T),
        (c = a.ma),
        Q(this),
        (this.ma = c),
        (c = a.I),
        Q(this),
        (this.I = c),
        Hc(this, a.ka),
        (c = a.K),
        Q(this),
        (this.K = c),
        Ic(this, a.D.clone()),
        (c = a.ea),
        Q(this),
        (this.ea = c);
    else if (a && (c = Bc(String(a)))) {
      this.B = !!b;
      Gc(this, c[1] || "", !0);
      var d = c[2] || "";
      Q(this);
      this.ma = Jc(d);
      d = c[3] || "";
      Q(this);
      this.I = Jc(d, !0);
      Hc(this, c[4]);
      d = c[5] || "";
      Q(this);
      this.K = Jc(d, !0);
      Ic(this, c[6] || "", !0);
      c = c[7] || "";
      Q(this);
      this.ea = Jc(c);
    } else (this.B = !!b), (this.D = new Kc(null, 0, this.B));
  }
  f = Fc.prototype;
  f.T = "";
  f.ma = "";
  f.I = "";
  f.ka = null;
  f.K = "";
  f.ea = "";
  f.gd = !1;
  f.B = !1;
  f.toString = function () {
    var a = [],
      b = this.T;
    b && a.push(Lc(b, Mc, !0), ":");
    if ((b = this.I)) {
      a.push("//");
      var c = this.ma;
      c && a.push(Lc(c, Mc, !0), "@");
      a.push(
        encodeURIComponent(String(b)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")
      );
      b = this.ka;
      null != b && a.push(":", String(b));
    }
    if ((b = this.K))
      this.I && "/" != b.charAt(0) && a.push("/"),
        a.push(Lc(b, "/" == b.charAt(0) ? Nc : Oc, !0));
    (b = this.D.toString()) && a.push("?", b);
    (b = this.ea) && a.push("#", Lc(b, Pc));
    return a.join("");
  };
  f.resolve = function (a) {
    var b = this.clone(),
      c = !!a.T;
    c ? Gc(b, a.T) : (c = !!a.ma);
    if (c) {
      var d = a.ma;
      Q(b);
      b.ma = d;
    } else c = !!a.I;
    c ? ((d = a.I), Q(b), (b.I = d)) : (c = null != a.ka);
    d = a.K;
    if (c) Hc(b, a.ka);
    else if ((c = !!a.K)) {
      if ("/" != d.charAt(0))
        if (this.I && !this.K) d = "/" + d;
        else {
          var e = b.K.lastIndexOf("/");
          -1 != e && (d = b.K.substr(0, e + 1) + d);
        }
      e = d;
      if (".." == e || "." == e) d = "";
      else if (-1 != e.indexOf("./") || -1 != e.indexOf("/.")) {
        for (
          var d = 0 == e.lastIndexOf("/", 0), e = e.split("/"), g = [], h = 0;
          h < e.length;

        ) {
          var k = e[h++];
          "." == k
            ? d && h == e.length && g.push("")
            : ".." == k
            ? ((1 < g.length || (1 == g.length && "" != g[0])) && g.pop(),
              d && h == e.length && g.push(""))
            : (g.push(k), (d = !0));
        }
        d = g.join("/");
      } else d = e;
    }
    c ? (Q(b), (b.K = d)) : (c = "" !== a.D.toString());
    c ? Ic(b, Jc(a.D.toString())) : (c = !!a.ea);
    c && ((a = a.ea), Q(b), (b.ea = a));
    return b;
  };
  f.clone = function () {
    return new Fc(this);
  };
  function Gc(a, b, c) {
    Q(a);
    a.T = c ? Jc(b, !0) : b;
    a.T && (a.T = a.T.replace(/:$/, ""));
  }
  function Hc(a, b) {
    Q(a);
    if (b) {
      b = Number(b);
      if (isNaN(b) || 0 > b) throw Error("Bad port number " + b);
      a.ka = b;
    } else a.ka = null;
  }
  function Ic(a, b, c) {
    Q(a);
    b instanceof Kc
      ? ((a.D = b), a.D.Eb(a.B))
      : (c || (b = Lc(b, Qc)), (a.D = new Kc(b, 0, a.B)));
  }
  function Q(a) {
    if (a.gd) throw Error("Tried to modify a read-only Uri");
  }
  f.Eb = function (a) {
    this.B = a;
    this.D && this.D.Eb(a);
    return this;
  };
  function Jc(a, b) {
    return a ? (b ? decodeURI(a) : decodeURIComponent(a)) : "";
  }
  function Lc(a, b, c) {
    return q(a)
      ? ((a = encodeURI(a).replace(b, Rc)),
        c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
        a)
      : null;
  }
  function Rc(a) {
    a = a.charCodeAt(0);
    return "%" + ((a >> 4) & 15).toString(16) + (a & 15).toString(16);
  }
  var Mc = /[#\/\?@]/g,
    Oc = /[\#\?:]/g,
    Nc = /[\#\?]/g,
    Qc = /[\#\?@]/g,
    Pc = /#/g;
  function Kc(a, b, c) {
    this.u = a || null;
    this.B = !!c;
  }
  function Sc(a) {
    a.k ||
      ((a.k = new ob()),
      (a.m = 0),
      a.u &&
        Ec(a.u, function (b, c) {
          a.add(decodeURIComponent(b.replace(/\+/g, " ")), c);
        }));
  }
  f = Kc.prototype;
  f.k = null;
  f.m = null;
  f.add = function (a, b) {
    Sc(this);
    this.u = null;
    a = Tc(this, a);
    var c = this.k.get(a);
    c || this.k.set(a, (c = []));
    c.push(b);
    this.m++;
    return this;
  };
  f.remove = function (a) {
    Sc(this);
    a = Tc(this, a);
    return this.k.wa(a)
      ? ((this.u = null), (this.m -= this.k.get(a).length), this.k.remove(a))
      : !1;
  };
  f.clear = function () {
    this.k = this.u = null;
    this.m = 0;
  };
  f.wa = function (a) {
    Sc(this);
    a = Tc(this, a);
    return this.k.wa(a);
  };
  f.X = function () {
    Sc(this);
    for (var a = this.k.Q(), b = this.k.X(), c = [], d = 0; d < b.length; d++)
      for (var e = a[d], g = 0; g < e.length; g++) c.push(b[d]);
    return c;
  };
  f.Q = function (a) {
    Sc(this);
    var b = [];
    if (q(a)) this.wa(a) && (b = Sa(b, this.k.get(Tc(this, a))));
    else {
      a = this.k.Q();
      for (var c = 0; c < a.length; c++) b = Sa(b, a[c]);
    }
    return b;
  };
  f.set = function (a, b) {
    Sc(this);
    this.u = null;
    a = Tc(this, a);
    this.wa(a) && (this.m -= this.k.get(a).length);
    this.k.set(a, [b]);
    this.m++;
    return this;
  };
  f.get = function (a, b) {
    var c = a ? this.Q(a) : [];
    return 0 < c.length ? String(c[0]) : b;
  };
  f.toString = function () {
    if (this.u) return this.u;
    if (!this.k) return "";
    for (var a = [], b = this.k.X(), c = 0; c < b.length; c++)
      for (
        var d = b[c], e = encodeURIComponent(String(d)), d = this.Q(d), g = 0;
        g < d.length;
        g++
      ) {
        var h = e;
        "" !== d[g] && (h += "=" + encodeURIComponent(String(d[g])));
        a.push(h);
      }
    return (this.u = a.join("&"));
  };
  f.clone = function () {
    var a = new Kc();
    a.u = this.u;
    this.k && ((a.k = this.k.clone()), (a.m = this.m));
    return a;
  };
  function Tc(a, b) {
    var c = String(b);
    a.B && (c = c.toLowerCase());
    return c;
  }
  f.Eb = function (a) {
    a &&
      !this.B &&
      (Sc(this),
      (this.u = null),
      this.k.forEach(function (a, c) {
        var d = c.toLowerCase();
        c != d &&
          (this.remove(c),
          this.remove(d),
          0 < a.length &&
            ((this.u = null),
            this.k.set(Tc(this, d), Ta(a)),
            (this.m += a.length)));
      }, this));
    this.B = a;
  };
  f.extend = function (a) {
    for (var b = 0; b < arguments.length; b++)
      nb(
        arguments[b],
        function (a, b) {
          this.add(b, a);
        },
        this
      );
  };
  function Uc(a) {
    this.Wa = window.location.protocol;
    this.ec = window.location.hostname;
    a &&
      ((a = a instanceof Fc ? a.clone() : new Fc(a, void 0)),
      (this.Wa = a.T),
      (this.ec = a.I));
    a = Vc(this);
    a == Wc
      ? (this.aa = "chatango.com")
      : a == Xc
      ? ((this.aa = "chattanga.com"), (this.ka = Yc))
      : a == Zc
      ? (this.aa = zc)
      : M.f && a == $c && (this.aa = zc);
  }
  var Wc = "live",
    Xc = "staging",
    Zc = "dev",
    $c = "local",
    Yc = [
      { protocol: "ws", port: "8080" },
      { protocol: "wss", port: "1807" },
    ];
  Uc.prototype.aa = void 0;
  function Vc(a) {
    var b = Wc,
      c = a.ec.split(".").reverse();
    2 <= c.length &&
      "com" == c[0] &&
      "chattanga" == c[1] &&
      (b = 3 <= c.length && "dev2" == c[2] ? Zc : Xc);
    M.f && "file:" == a.Wa && (b = $c);
    return b;
  }
  function ad() {
    this.A = {};
  }
  n(ad);
  ad.prototype.e = F("chatango.managers.ManagerManager");
  function bd(a, b) {
    a.A.BASEDOMAIN = b;
  }
  function cd(a) {
    var b = a.A.BASEDOMAIN;
    b || (M.f && a.e.info("No manager found for key: BASEDOMAIN"));
    return b;
  }
  function dd() {
    cd(ad.j()).Wa.replace(":", "");
  }
  n(dd);
  dd.prototype.Pd = "st";
  function ed() {
    var a = dd.j().Pd,
      b = "";
    a && (b = ".");
    var c = cd(ad.j());
    c.Wa.replace(":", "");
    return "https://" + a + b + c.aa;
  }
  function R(a, b) {
    this.width = a;
    this.height = b;
  }
  f = R.prototype;
  f.clone = function () {
    return new R(this.width, this.height);
  };
  f.toString = function () {
    return "(" + this.width + " x " + this.height + ")";
  };
  f.ceil = function () {
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this;
  };
  f.floor = function () {
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this;
  };
  f.round = function () {
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this;
  };
  f.scale = function (a, b) {
    var c = r(b) ? b : a;
    this.width *= a;
    this.height *= c;
    return this;
  };
  var fd = !z || (z && 9 <= D),
    gd = (!A && !z) || (z && z && 9 <= D) || (A && C("1.9.1"));
  z && C("9");
  function S(a, b) {
    this.x = m(a) ? a : 0;
    this.y = m(b) ? b : 0;
  }
  f = S.prototype;
  f.clone = function () {
    return new S(this.x, this.y);
  };
  f.toString = function () {
    return "(" + this.x + ", " + this.y + ")";
  };
  f.ceil = function () {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
  };
  f.floor = function () {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  };
  f.round = function () {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  };
  f.translate = function (a, b) {
    a instanceof S
      ? ((this.x += a.x), (this.y += a.y))
      : ((this.x += a), r(b) && (this.y += b));
    return this;
  };
  f.scale = function (a, b) {
    var c = r(b) ? b : a;
    this.x *= a;
    this.y *= c;
    return this;
  };
  function hd(a) {
    return a ? new id(jd(a)) : va || (va = new id());
  }
  function kd(a) {
    var b = document,
      c = null;
    return (
      (c = b.getElementsByClassName
        ? b.getElementsByClassName(a)[0]
        : b.querySelectorAll && b.querySelector
        ? b.querySelector("." + a)
        : ld("*", a)[0]) || null
    );
  }
  function ld(a, b) {
    var c = document,
      d = a && "*" != a ? a.toUpperCase() : "";
    if (c.querySelectorAll && c.querySelector && (d || b))
      return c.querySelectorAll(d + (b ? "." + b : ""));
    if (b && c.getElementsByClassName) {
      c = c.getElementsByClassName(b);
      if (d) {
        for (var e = {}, g = 0, h = 0, k; (k = c[h]); h++)
          d == k.nodeName && (e[g++] = k);
        e.length = g;
        return e;
      }
      return c;
    }
    c = c.getElementsByTagName(d || "*");
    if (b) {
      e = {};
      for (h = g = 0; (k = c[h]); h++) {
        var d = k.className,
          y;
        if ((y = "function" == typeof d.split)) y = 0 <= Na(d.split(/\s+/), b);
        y && (e[g++] = k);
      }
      e.length = g;
      return e;
    }
    return c;
  }
  function md(a, b) {
    Ua(b, function (b, d) {
      "style" == d
        ? (a.style.cssText = b)
        : "class" == d
        ? (a.className = b)
        : "for" == d
        ? (a.htmlFor = b)
        : d in nd
        ? a.setAttribute(nd[d], b)
        : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0)
        ? a.setAttribute(d, b)
        : (a[d] = b);
    });
  }
  var nd = {
    cellpadding: "cellPadding",
    cellspacing: "cellSpacing",
    colspan: "colSpan",
    frameborder: "frameBorder",
    height: "height",
    maxlength: "maxLength",
    role: "role",
    rowspan: "rowSpan",
    type: "type",
    usemap: "useMap",
    valign: "vAlign",
    width: "width",
  };
  function od(a) {
    a = a.document;
    a = "CSS1Compat" == a.compatMode ? a.documentElement : a.body;
    return new R(a.clientWidth, a.clientHeight);
  }
  function pd(a) {
    var b =
      B || "CSS1Compat" != a.compatMode
        ? a.body || a.documentElement
        : a.documentElement;
    a = a.parentWindow || a.defaultView;
    return z && C("10") && a.pageYOffset != b.scrollTop
      ? new S(b.scrollLeft, b.scrollTop)
      : new S(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop);
  }
  function T(a, b, c) {
    var d = arguments,
      e = document,
      g = d[0],
      h = d[1];
    if (!fd && h && (h.name || h.type)) {
      g = ["<", g];
      h.name && g.push(' name="', za(h.name), '"');
      if (h.type) {
        g.push(' type="', za(h.type), '"');
        var k = {};
        Ya(k, h);
        delete k.type;
        h = k;
      }
      g.push(">");
      g = g.join("");
    }
    g = e.createElement(g);
    h &&
      (q(h)
        ? (g.className = h)
        : p(h)
        ? (g.className = h.join(" "))
        : md(g, h));
    2 < d.length && qd(e, g, d, 2);
    return g;
  }
  function qd(a, b, c, d) {
    function e(c) {
      c && b.appendChild(q(c) ? a.createTextNode(c) : c);
    }
    for (; d < c.length; d++) {
      var g = c[d];
      !da(g) || (fa(g) && 0 < g.nodeType) ? e(g) : Oa(rd(g) ? Ta(g) : g, e);
    }
  }
  function U(a, b) {
    qd(jd(a), a, arguments, 1);
  }
  function V(a, b) {
    b.parentNode && b.parentNode.insertBefore(a, b);
  }
  function sd(a) {
    var b = document.body;
    b.insertBefore(a, b.childNodes[0] || null);
  }
  function td(a) {
    return a && a.parentNode ? a.parentNode.removeChild(a) : null;
  }
  function ud(a, b) {
    var c = b.parentNode;
    c && c.replaceChild(a, b);
  }
  function jd(a) {
    return 9 == a.nodeType ? a : a.ownerDocument || a.document;
  }
  function vd(a, b) {
    var c = [];
    wd(a, b, c, !1);
    return c;
  }
  function wd(a, b, c, d) {
    if (null != a)
      for (a = a.firstChild; a; ) {
        if ((b(a) && (c.push(a), d)) || wd(a, b, c, d)) return !0;
        a = a.nextSibling;
      }
    return !1;
  }
  function rd(a) {
    if (a && "number" == typeof a.length) {
      if (fa(a))
        return "function" == typeof a.item || "string" == typeof a.item;
      if (ea(a)) return "function" == typeof a.item;
    }
    return !1;
  }
  function xd(a) {
    return yd(a, function (a) {
      if ((a = "HEAD" == a.nodeName)) a = !0;
      return a;
    });
  }
  function yd(a, b) {
    for (var c = 0; a; ) {
      if (b(a)) return a;
      a = a.parentNode;
      c++;
    }
    return null;
  }
  function id(a) {
    this.H = a || l.document || document;
  }
  f = id.prototype;
  f.createElement = function (a) {
    return this.H.createElement(a);
  };
  f.createTextNode = function (a) {
    return this.H.createTextNode(String(a));
  };
  f.appendChild = function (a, b) {
    a.appendChild(b);
  };
  f.append = U;
  f.canHaveChildren = function (a) {
    if (1 != a.nodeType) return !1;
    switch (a.tagName) {
      case "APPLET":
      case "AREA":
      case "BASE":
      case "BR":
      case "COL":
      case "COMMAND":
      case "EMBED":
      case "FRAME":
      case "HR":
      case "IMG":
      case "INPUT":
      case "IFRAME":
      case "ISINDEX":
      case "KEYGEN":
      case "LINK":
      case "NOFRAMES":
      case "NOSCRIPT":
      case "META":
      case "OBJECT":
      case "PARAM":
      case "SCRIPT":
      case "SOURCE":
      case "STYLE":
      case "TRACK":
      case "WBR":
        return !1;
    }
    return !0;
  };
  f.removeNode = td;
  f.bc = function (a) {
    return gd && void 0 != a.children
      ? a.children
      : Pa(a.childNodes, function (a) {
          return 1 == a.nodeType;
        });
  };
  f.contains = function (a, b) {
    if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
    if ("undefined" != typeof a.compareDocumentPosition)
      return a == b || Boolean(a.compareDocumentPosition(b) & 16);
    for (; b && a != b; ) b = b.parentNode;
    return b == a;
  };
  function zd(a) {
    L.call(this);
    this.Ja = a || window;
    this.Sa = K(this.Ja, "resize", this.cd, !1, this);
    this.$ = od(this.Ja || window);
  }
  u(zd, L);
  f = zd.prototype;
  f.Sa = null;
  f.Ja = null;
  f.$ = null;
  f.v = function () {
    return this.$ ? this.$.clone() : null;
  };
  f.p = function () {
    zd.F.p.call(this);
    this.Sa && (cc(this.Sa), (this.Sa = null));
    this.$ = this.Ja = null;
  };
  f.cd = function () {
    var a = od(this.Ja || window),
      b = this.$;
    a == b ||
      (a && b && a.width == b.width && a.height == b.height) ||
      ((this.$ = a), this.dispatchEvent("resize"));
  };
  function Ad() {
    this.Lc = new zd();
  }
  n(Ad);
  function Bd() {
    L.call(this);
    this.xb = !1;
  }
  u(Bd, L);
  n(Bd);
  function W() {
    L.call(this);
    this.fd = -1 != navigator.userAgent.indexOf("Android");
    this.kc = window.outerWidth;
    this.Da = window.innerHeight;
    this.L = [];
    this.Vc = 40;
    this.Uc = 30;
    this.Rb = 10;
    this.zb = this.hb = this.Db = !1;
  }
  u(W, L);
  n(W);
  W.prototype.wc = function () {
    this.dispatchEvent(new I("a"));
    this.hb = this.fd;
    Cd(this);
  };
  W.prototype.yd = function () {
    this.zb = !0;
    this.dispatchEvent(new I("a"));
    Cd(this);
  };
  W.prototype.vc = function () {
    this.Db = !0;
    Cd(this);
  };
  function Cd(a) {
    a.Pb && clearTimeout(a.Pb);
    a.L.length = 0;
    a.L = [];
    a.Qb();
  }
  W.prototype.Qb = function () {
    this.L.push({
      ow: window.outerWidth,
      iw: window.innerWidth,
      ih: window.innerHeight,
    });
    var a = this.L.length;
    if (!(a > this.Vc)) {
      if (a >= this.Rb) {
        var b = !0;
        for (i = a - this.Rb; i < a; i++)
          if (
            !(
              0 >= i ||
              (this.L[i].ow == this.L[i - 1].ow &&
                this.L[i].iw == this.L[i - 1].iw &&
                this.L[i].ih == this.L[i - 1].ih)
            )
          ) {
            b = !1;
            break;
          }
        if (b) {
          this.dispatchEvent(new I("b"));
          b = window.outerWidth;
          a = window.innerHeight;
          if (b !== this.kc || this.zb)
            (this.kc = b), (this.Da = a), this.dispatchEvent(new I("c"));
          else {
            if (this.hb && Math.abs(a - this.Da) > 0.25 * this.Da) {
              var b = Bd.j(),
                c = a < this.Da;
              c !== b.xb &&
                ((b.xb = c)
                  ? b.dispatchEvent("keyboardraised")
                  : b.dispatchEvent("keyboardlowered"));
            } else this.Db && this.dispatchEvent(new I("d"));
            this.Da = a;
          }
          this.zb = this.Db = this.hb = !1;
          return;
        }
      }
      this.Pb = setTimeout(t(this.Qb, this), this.Uc);
    }
  };
  function Dd() {
    this.lc = "0410200003";
  }
  n(Dd);
  function Ed(a) {
    this.$ = a;
    I.call(this, Fd);
  }
  u(Ed, I);
  Ed.prototype.v = function () {
    return this.$;
  };
  function Gd(a, b, c, d) {
    this.top = a;
    this.right = b;
    this.bottom = c;
    this.left = d;
  }
  f = Gd.prototype;
  f.clone = function () {
    return new Gd(this.top, this.right, this.bottom, this.left);
  };
  f.toString = function () {
    return (
      "(" +
      this.top +
      "t, " +
      this.right +
      "r, " +
      this.bottom +
      "b, " +
      this.left +
      "l)"
    );
  };
  f.contains = function (a) {
    return this && a
      ? a instanceof Gd
        ? a.left >= this.left &&
          a.right <= this.right &&
          a.top >= this.top &&
          a.bottom <= this.bottom
        : a.x >= this.left &&
          a.x <= this.right &&
          a.y >= this.top &&
          a.y <= this.bottom
      : !1;
  };
  f.expand = function (a, b, c, d) {
    fa(a)
      ? ((this.top -= a.top),
        (this.right += a.right),
        (this.bottom += a.bottom),
        (this.left -= a.left))
      : ((this.top -= a),
        (this.right += b),
        (this.bottom += c),
        (this.left -= d));
    return this;
  };
  f.ceil = function () {
    this.top = Math.ceil(this.top);
    this.right = Math.ceil(this.right);
    this.bottom = Math.ceil(this.bottom);
    this.left = Math.ceil(this.left);
    return this;
  };
  f.floor = function () {
    this.top = Math.floor(this.top);
    this.right = Math.floor(this.right);
    this.bottom = Math.floor(this.bottom);
    this.left = Math.floor(this.left);
    return this;
  };
  f.round = function () {
    this.top = Math.round(this.top);
    this.right = Math.round(this.right);
    this.bottom = Math.round(this.bottom);
    this.left = Math.round(this.left);
    return this;
  };
  f.translate = function (a, b) {
    a instanceof S
      ? ((this.left += a.x),
        (this.right += a.x),
        (this.top += a.y),
        (this.bottom += a.y))
      : ((this.left += a),
        (this.right += a),
        r(b) && ((this.top += b), (this.bottom += b)));
    return this;
  };
  f.scale = function (a, b) {
    var c = r(b) ? b : a;
    this.left *= a;
    this.right *= a;
    this.top *= c;
    this.bottom *= c;
    return this;
  };
  function Hd(a, b, c, d) {
    this.left = a;
    this.top = b;
    this.width = c;
    this.height = d;
  }
  f = Hd.prototype;
  f.clone = function () {
    return new Hd(this.left, this.top, this.width, this.height);
  };
  f.toString = function () {
    return (
      "(" +
      this.left +
      ", " +
      this.top +
      " - " +
      this.width +
      "w x " +
      this.height +
      "h)"
    );
  };
  f.contains = function (a) {
    return a instanceof Hd
      ? this.left <= a.left &&
          this.left + this.width >= a.left + a.width &&
          this.top <= a.top &&
          this.top + this.height >= a.top + a.height
      : a.x >= this.left &&
          a.x <= this.left + this.width &&
          a.y >= this.top &&
          a.y <= this.top + this.height;
  };
  f.v = function () {
    return new R(this.width, this.height);
  };
  f.ceil = function () {
    this.left = Math.ceil(this.left);
    this.top = Math.ceil(this.top);
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this;
  };
  f.floor = function () {
    this.left = Math.floor(this.left);
    this.top = Math.floor(this.top);
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this;
  };
  f.round = function () {
    this.left = Math.round(this.left);
    this.top = Math.round(this.top);
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this;
  };
  f.translate = function (a, b) {
    a instanceof S
      ? ((this.left += a.x), (this.top += a.y))
      : ((this.left += a), r(b) && (this.top += b));
    return this;
  };
  f.scale = function (a, b) {
    var c = r(b) ? b : a;
    this.left *= a;
    this.width *= a;
    this.top *= c;
    this.height *= c;
    return this;
  };
  function X(a, b, c) {
    if (q(b)) (b = Id(a, b)) && (a.style[b] = c);
    else
      for (var d in b) {
        c = a;
        var e = b[d],
          g = Id(c, d);
        g && (c.style[g] = e);
      }
  }
  var Jd = {};
  function Id(a, b) {
    var c = Jd[b];
    if (!c) {
      var d = Ja(b),
        c = d;
      void 0 === a.style[d] &&
        ((d = (B ? "Webkit" : A ? "Moz" : z ? "ms" : bb ? "O" : null) + Ka(d)),
        void 0 !== a.style[d] && (c = d));
      Jd[b] = c;
    }
    return c;
  }
  function Kd(a, b) {
    var c = jd(a);
    return c.defaultView &&
      c.defaultView.getComputedStyle &&
      (c = c.defaultView.getComputedStyle(a, null))
      ? c[b] || c.getPropertyValue(b) || ""
      : "";
  }
  function Ld(a, b) {
    return (
      Kd(a, b) ||
      (a.currentStyle ? a.currentStyle[b] : null) ||
      (a.style && a.style[b])
    );
  }
  var Md = { thin: 2, medium: 4, thick: 6 };
  function Nd(a, b) {
    if ("none" == (a.currentStyle ? a.currentStyle[b + "Style"] : null))
      return 0;
    var c = a.currentStyle ? a.currentStyle[b + "Width"] : null,
      d;
    if (c in Md) d = Md[c];
    else if (/^\d+px?$/.test(c)) d = parseInt(c, 10);
    else {
      d = a.style.left;
      var e = a.runtimeStyle.left;
      a.runtimeStyle.left = a.currentStyle.left;
      a.style.left = c;
      c = a.style.pixelLeft;
      a.style.left = d;
      a.runtimeStyle.left = e;
      d = c;
    }
    return d;
  }
  function Od(a) {
    if (z && !(z && 9 <= D)) {
      var b = Nd(a, "borderLeft"),
        c = Nd(a, "borderRight"),
        d = Nd(a, "borderTop");
      a = Nd(a, "borderBottom");
      return new Gd(d, c, a, b);
    }
    b = Kd(a, "borderLeftWidth");
    c = Kd(a, "borderRightWidth");
    d = Kd(a, "borderTopWidth");
    a = Kd(a, "borderBottomWidth");
    return new Gd(parseFloat(d), parseFloat(c), parseFloat(a), parseFloat(b));
  }
  var Fd = "resize_iframe";
  function Pd(a, b, c) {
    if (ea(a)) c && (a = t(a, c));
    else if (a && "function" == typeof a.handleEvent) a = t(a.handleEvent, a);
    else throw Error("Invalid listener argument");
    return 2147483647 < b ? -1 : l.setTimeout(a, b || 0);
  }
  var Qd = !!w.match(/\bAndroid\b/);
  function Rd(a) {
    var b = w.match(/\bAndroid\s+(\S+);/);
    return !b || 2 > b.length ? !1 : 0 <= Ha(b[1], a);
  }
  var Sd = !!w.match(/\b(iOS|iPhone|iPad|iPod)\b/);
  function Td() {}
  n(Td);
  Td.prototype.jb = [
    {
      type: "blank",
      rules: [
        [
          { styles: "jsr" },
          { platform: "IE", platform: "NOT_IEMOBILE", lessThan: 10 },
        ],
        [
          { styles: "jsr" },
          { platform: "OPERA" },
          { features: ["NOWEBSOCKET"] },
        ],
        [
          { styles: "jsr" },
          { platform: "GECKO" },
          { features: ["NOWEBSOCKET"] },
        ],
        [
          { styles: "jsr" },
          { platform: "ANDROID" },
          { features: ["NOWEBSOCKET"] },
        ],
        [{ styles: "jsr" }, { features: ["NOWEBSOCKET"] }],
      ],
    },
    { type: "jsonly", rules: [[{ styles: "jsr" }]] },
    {
      type: "flash",
      rules: [
        { param: "flash" },
        [
          { param: "js" },
          { platform: "IE", platform: "NOT_IEMOBILE", lessThan: 10 },
          { features: ["FLASH"] },
        ],
      ],
    },
    {
      type: "linkandroidchrome",
      rules: [
        [{ platform: "ANDROID", atLeast: 4 }, { features: ["NOWEBSOCKET"] }],
      ],
    },
    {
      type: "linkandroidff",
      rules: [
        {
          param: "js",
          platform: "ANDROID",
          lessThan: 4,
          features: ["NOWEBSOCKET"],
        },
        {
          platform: "ANDROID",
          lessThan: 4,
          features: ["NOFLASH"],
          platform: ["NOT_GECKO"],
        },
      ],
    },
    {
      type: "linkdesktopchrome",
      rules: [
        [
          { param: "js" },
          { platform: "IE", platform: "NOT_IEMOBILE", lessThan: 10 },
          { features: ["NOFLASH"] },
        ],
        [{ param: "js" }, { platform: "OPERA" }, { features: ["NOWEBSOCKET"] }],
        [{ param: "js" }, { platform: "GECKO" }, { features: ["NOWEBSOCKET"] }],
      ],
    },
    {
      type: "js",
      rules: [
        { param: "js" },
        { platform: "IOS" },
        { platform: "IEMOBILE" },
        [{ platform: "MOBILE" }, { platform: "CHROME" }],
        [
          { platform: "ANDROID", features: ["WEBSOCKET"] },
          { platform: "CHROME" },
        ],
        [
          { platform: "ANDROID", features: ["WEBSOCKET"] },
          { platform: "GECKO" },
        ],
      ],
    },
  ];
  Td.prototype.e = F("chatango.settings.Architecture");
  function Ud(a, b, c) {
    var d, e, g, h, k;
    a.xc = "js" === b ? "js" : null;
    a.M = c ? c : {};
    for (b = 0; b < a.jb.length; b++)
      for (c = a.jb[b].type, d = a.jb[b].rules, e = 0; e < d.length; e++)
        if (
          ((g = d[e]),
          M.f && a.e.info("Testing rule: " + na(g)),
          "undefined" !== typeof g.length)
        ) {
          k = !0;
          for (h = 0; h < g.length; h++)
            if (!Vd(a, g[h])) {
              k = !1;
              break;
            }
          if (k) return M.f && a.e.info("Rule matches: " + c), c;
        } else if (Vd(a, g)) return M.f && a.e.info("Rule matches"), c;
    M.f && a.e.info("Using default architecture");
    return "flash";
  }
  function Yd() {
    try {
      return -1 != navigator.userAgent.indexOf("MSIE")
        ? new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable(
            "$version"
          )
        : navigator.plugins["Shockwave Flash"].description;
    } catch (a) {
      return null;
    }
  }
  function Vd(a, b) {
    M.f && a.e.info("Checking rule: " + na(b));
    var c,
      d = w,
      e = new Fc(window.location.href);
    M.f && a.e.info("Checking rule platform");
    if ("undefined" != typeof b.platform)
      if ("IE" == b.platform) {
        if (!z) return !1;
      } else if ("IEMOBILE" == b.platform) {
        if (!/(iemobile)/i.test(d)) return !1;
      } else if ("NOT_IEMOBILE" == b.platform) {
        if (/(iemobile)/i.test(d)) return !1;
      } else if ("GECKO" == b.platform) {
        if (!A) return !1;
      } else if ("NOT_GECKO" == b.platform) {
        if (A) return !1;
      } else if ("WEBKIT" == b.platform) {
        if (!B) return !1;
      } else if ("CHROME" == b.platform) {
        if (!d.match(/\bChrome\b/)) return !1;
      } else if ("LINUX" == b.platform) {
        if (!fb) return !1;
      } else if ("MAC" == b.platform) {
        if (!db) return !1;
      } else if ("MOBILE" == b.platform) {
        if (!cb) return !1;
      } else if ("OPERA" == b.platform) {
        if (!bb) return !1;
      } else if ("SAFARI" == b.platform) {
        if (!B) return !1;
      } else if ("WINDOWS" == b.platform) {
        if (!eb) return !1;
      } else if ("X11" == b.platform) {
        if (!gb) return !1;
      } else if ("IOS" == b.platform) {
        if (!d || !d.match(/\b(iOS|iPod|iPad|iPhone)\b/)) return !1;
      } else if (!("ANDROID" != b.platform || (d && Qd))) return !1;
    M.f && a.e.info("Checking rule version");
    if ("ANDROID" == b.platform) {
      if (
        ("undefined" != typeof b.lessThan && Rd(b.lessThan)) ||
        ("undefined" != typeof b.atLeast && !Rd(b.atLeast))
      )
        return !1;
    } else if (
      ("undefined" != typeof b.lessThan && C(b.lessThan)) ||
      ("undefined" != typeof b.atLeast && !C(b.atLeast))
    )
      return !1;
    M.f && a.e.info("Checking rule features");
    if ("undefined" != typeof b.features)
      for (c = 0; c < b.features.length; c++) {
        if (
          "WEBSOCKET" == b.features[c] &&
          "undefined" == typeof window.WebSocket
        )
          return !1;
        if ("NOWEBSOCKET" == b.features[c]) {
          var g = !1;
          Qd && !/(chrome|opera|firefox)/i.test(d) && (g = !0);
          if ("undefined" != typeof window.WebSocket && !g) return !1;
        }
        if (
          ("FLASH" == b.features[c] && !Yd()) ||
          ("NOFLASH" == b.features[c] && Yd())
        )
          return !1;
      }
    M.f && a.e.info("Checking rule parameters");
    if (
      "undefined" !== typeof b.param &&
      (M.f &&
        (a.e.info('uri.getParameterValue(rule["param"]): ' + e.D.get(b.param)),
        a.e.info(
          'typeof uri.getParameterValue(rule["param"]): ' +
            typeof e.D.get(b.param)
        )),
      "undefined" === typeof e.D.get(b.param) && (!a.xc || a.xc != b.param))
    )
      return !1;
    M.f && a.e.info("Checking rule parameters");
    if ("undefined" !== typeof b.styles)
      if (a.M)
        switch (b.styles) {
          case "jsr":
            if (
              !(
                (a.M.cv && 0 != a.M.cv) ||
                (a.M.pos && "none" != a.M.pos) ||
                a.M.mockgroup
              )
            )
              return !1;
            break;
          case "is_cv":
            if (!((a.M.cv && 0 != a.M.cv) || (a.M.pos && "none" != a.M.pos)))
              return !1;
        }
      else return !1;
    M.f && a.e.info("Rule matches");
    return !0;
  }
  function Zd() {}
  Zd.prototype.Ob = null;
  function $d(a) {
    var b;
    (b = a.Ob) ||
      ((b = {}), ae(a) && ((b[0] = !0), (b[1] = !0)), (b = a.Ob = b));
    return b;
  }
  var be;
  function ce() {}
  u(ce, Zd);
  function de(a) {
    return (a = ae(a)) ? new ActiveXObject(a) : new XMLHttpRequest();
  }
  function ae(a) {
    if (
      !a.gc &&
      "undefined" == typeof XMLHttpRequest &&
      "undefined" != typeof ActiveXObject
    ) {
      for (
        var b = [
            "MSXML2.XMLHTTP.6.0",
            "MSXML2.XMLHTTP.3.0",
            "MSXML2.XMLHTTP",
            "Microsoft.XMLHTTP",
          ],
          c = 0;
        c < b.length;
        c++
      ) {
        var d = b[c];
        try {
          return new ActiveXObject(d), (a.gc = d);
        } catch (e) {}
      }
      throw Error(
        "Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed"
      );
    }
    return a.gc;
  }
  be = new ce();
  function Y(a, b) {
    a && a.log(Ab, b, void 0);
  }
  function ee(a) {
    L.call(this);
    this.headers = new ob();
    this.gb = a || null;
    this.o = !1;
    this.fb = this.d = null;
    this.Ca = this.jc = this.ga = "";
    this.fa = this.ub = this.Ra = this.pb = !1;
    this.Ha = 0;
    this.cb = null;
    this.zc = fe;
    this.eb = this.be = !1;
  }
  u(ee, L);
  var fe = "",
    ge = ee.prototype,
    he = F("goog.net.XhrIo");
  ge.C = he;
  var ie = /^https?$/i,
    je = ["POST", "PUT"];
  f = ee.prototype;
  f.send = function (a, b, c, d) {
    if (this.d)
      throw Error(
        "[goog.net.XhrIo] Object is active with another request=" +
          this.ga +
          "; newUri=" +
          a
      );
    b = b ? b.toUpperCase() : "GET";
    this.ga = a;
    this.Ca = "";
    this.jc = b;
    this.pb = !1;
    this.o = !0;
    this.d = this.kb();
    this.fb = this.gb ? $d(this.gb) : $d(be);
    this.d.onreadystatechange = t(this.uc, this);
    try {
      Y(this.C, Z(this, "Opening Xhr")),
        (this.ub = !0),
        this.d.open(b, String(a), !0),
        (this.ub = !1);
    } catch (e) {
      Y(this.C, Z(this, "Error opening Xhr: " + e.message));
      ke(this, e);
      return;
    }
    a = c || "";
    var g = this.headers.clone();
    d &&
      nb(d, function (a, b) {
        g.set(b, a);
      });
    d = Qa(g.X());
    c = l.FormData && a instanceof l.FormData;
    !(0 <= Na(je, b)) ||
      d ||
      c ||
      g.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
    g.forEach(function (a, b) {
      this.d.setRequestHeader(b, a);
    }, this);
    this.zc && (this.d.responseType = this.zc);
    "withCredentials" in this.d && (this.d.withCredentials = this.be);
    try {
      le(this),
        0 < this.Ha &&
          ((this.eb = me(this.d)),
          Y(
            this.C,
            Z(
              this,
              "Will abort after " +
                this.Ha +
                "ms if incomplete, xhr2 " +
                this.eb
            )
          ),
          this.eb
            ? ((this.d.timeout = this.Ha),
              (this.d.ontimeout = t(this.Kc, this)))
            : (this.cb = Pd(this.Kc, this.Ha, this))),
        Y(this.C, Z(this, "Sending request")),
        (this.Ra = !0),
        this.d.send(a),
        (this.Ra = !1);
    } catch (h) {
      Y(this.C, Z(this, "Send error: " + h.message)), ke(this, h);
    }
  };
  function me(a) {
    return z && C(9) && r(a.timeout) && m(a.ontimeout);
  }
  function Ra(a) {
    return "content-type" == a.toLowerCase();
  }
  f.kb = function () {
    return this.gb ? de(this.gb) : de(be);
  };
  f.Kc = function () {
    "undefined" != typeof aa &&
      this.d &&
      ((this.Ca = "Timed out after " + this.Ha + "ms, aborting"),
      Y(this.C, Z(this, this.Ca)),
      this.dispatchEvent("timeout"),
      this.abort(8));
  };
  function ke(a, b) {
    a.o = !1;
    a.d && ((a.fa = !0), a.d.abort(), (a.fa = !1));
    a.Ca = b;
    ne(a);
    a.oa();
  }
  function ne(a) {
    a.pb ||
      ((a.pb = !0), a.dispatchEvent("complete"), a.dispatchEvent("error"));
  }
  f.abort = function () {
    this.d &&
      this.o &&
      (Y(this.C, Z(this, "Aborting")),
      (this.o = !1),
      (this.fa = !0),
      this.d.abort(),
      (this.fa = !1),
      this.dispatchEvent("complete"),
      this.dispatchEvent("abort"),
      this.oa());
  };
  f.p = function () {
    this.d &&
      (this.o &&
        ((this.o = !1), (this.fa = !0), this.d.abort(), (this.fa = !1)),
      this.oa(!0));
    ee.F.p.call(this);
  };
  f.uc = function () {
    this.ca || (this.ub || this.Ra || this.fa ? oe(this) : this.Ad());
  };
  f.Ad = function () {
    oe(this);
  };
  function oe(a) {
    if (a.o && "undefined" != typeof aa)
      if (a.fb[1] && 4 == pe(a) && 2 == qe(a))
        Y(a.C, Z(a, "Local request error detected and ignored"));
      else if (a.Ra && 4 == pe(a)) Pd(a.uc, 0, a);
      else if ((a.dispatchEvent("readystatechange"), 4 == pe(a))) {
        Y(a.C, Z(a, "Request complete"));
        a.o = !1;
        try {
          var b = qe(a),
            c;
          a: switch (b) {
            case 200:
            case 201:
            case 202:
            case 204:
            case 206:
            case 304:
            case 1223:
              c = !0;
              break a;
            default:
              c = !1;
          }
          var d;
          if (!(d = c)) {
            var e;
            if ((e = 0 === b)) {
              var g = Bc(String(a.ga))[1] || null;
              if (!g && self.location)
                var h = self.location.protocol,
                  g = h.substr(0, h.length - 1);
              e = !ie.test(g ? g.toLowerCase() : "");
            }
            d = e;
          }
          if (d) a.dispatchEvent("complete"), a.dispatchEvent("success");
          else {
            var k;
            try {
              k = 2 < pe(a) ? a.d.statusText : "";
            } catch (y) {
              Y(a.C, "Can not get status: " + y.message), (k = "");
            }
            a.Ca = k + " [" + qe(a) + "]";
            ne(a);
          }
        } finally {
          a.oa();
        }
      }
  }
  f.oa = function (a) {
    if (this.d) {
      le(this);
      var b = this.d,
        c = this.fb[0] ? ba : null;
      this.fb = this.d = null;
      a || this.dispatchEvent("ready");
      try {
        b.onreadystatechange = c;
      } catch (d) {
        (a = this.C) &&
          a.log(
            wb,
            "Problem encountered resetting onreadystatechange: " + d.message,
            void 0
          );
      }
    }
  };
  function le(a) {
    a.d && a.eb && (a.d.ontimeout = null);
    r(a.cb) && (l.clearTimeout(a.cb), (a.cb = null));
  }
  function pe(a) {
    return a.d ? a.d.readyState : 0;
  }
  function qe(a) {
    try {
      return 2 < pe(a) ? a.d.status : -1;
    } catch (b) {
      return -1;
    }
  }
  f.cc = function () {
    return String(this.ga);
  };
  f.dc = function (a) {
    if (this.d) {
      var b = this.d.responseText;
      a && 0 == b.indexOf(a) && (b = b.substring(a.length));
      return ma(b);
    }
  };
  f.getResponseHeader = function (a) {
    return this.d && 4 == pe(this) ? this.d.getResponseHeader(a) : void 0;
  };
  f.getAllResponseHeaders = function () {
    return this.d && 4 == pe(this) ? this.d.getAllResponseHeaders() : "";
  };
  function Z(a, b) {
    return b + " [" + a.jc + " " + a.ga + " " + qe(a) + "]";
  }
  function re() {
    L.call(this);
    this.t = null;
    this.o = !1;
  }
  u(re, L);
  f = re.prototype;
  f.e = F("chatango.networking.XdrIo");
  f.dc = function (a) {
    if (this.t) {
      var b = this.t.responseText;
      a && 0 == b.indexOf(a) && (b = b.substring(a.length));
      return ma(b);
    }
  };
  f.cc = function () {
    return String(this.ga);
  };
  f.send = function (a, b, c) {
    if (this.t)
      throw Error(
        "[chatango.networking.XdrIo] Object is active with another request"
      );
    this.ga = a;
    b = b ? b.toUpperCase() : "GET";
    try {
      var d = new XDomainRequest();
    } catch (e) {
      throw Error(
        "[chatango.networking.XdrIo: Unable to create XDomainRequest: " +
          e.message
      );
    }
    this.t = d;
    this.o = !0;
    this.t.onload = t(this.wd, this);
    this.t.onerror = t(this.ud, this);
    this.t.ontimeout = t(this.Hd, this);
    try {
      M.f && this.e.info("Opening Xdr"), this.t.open(b, a);
    } catch (g) {
      this.e.log(xb, "Error opening Xdr: " + g.message, void 0);
      return;
    }
    a = c || "";
    try {
      M.f && this.e.info("Sending request"), this.t.send(a);
    } catch (h) {
      this.e.log(xb, "Send error: " + h.message, void 0);
    }
  };
  f.wd = function () {
    M.f && this.e.info("XDR Loaded");
    this.o = !1;
    this.Ac = new ActiveXObject("Microsoft.XMLDOM");
    this.Ac.async = !1;
    this.Ac.loadXML(this.t.responseText);
    this.dispatchEvent("complete");
    this.dispatchEvent("success");
    se(this);
  };
  f.ud = function () {
    M.f && this.e.info("XDR Error");
    this.o = !1;
    this.dispatchEvent("complete");
    this.dispatchEvent("error");
    se(this);
  };
  f.Hd = function () {
    M.f && this.e.info("XDR Timeout");
    this.o = !1;
    this.dispatchEvent("complete");
    this.dispatchEvent("error");
    se(this);
  };
  f.abort = function () {
    this.t &&
      this.o &&
      (M.f && this.C.log(Ab, Z(this, "Aborting"), void 0),
      (this.o = !1),
      this.t.abort(),
      this.dispatchEvent("complete"),
      this.dispatchEvent("abort"),
      se(this));
  };
  f.p = function () {
    re.F.p.call(this);
    se(this);
  };
  function se(a) {
    var b = a.t;
    a.t = null;
    b.ie = null;
    b.he = null;
    b.je = null;
  }
  function te(a, b) {
    this.Nb = !0 === b;
    ee.call(this, a);
  }
  u(te, ee);
  te.prototype.kb = function () {
    var a = te.F.kb.call(this);
    this.Nb && K(a.upload, "progress", this.dispatchEvent, !1, this);
    return a;
  };
  te.prototype.oa = function (a) {
    this.Nb && bc(this.d.upload, "progress", this.dispatchEvent, !1, this);
    te.F.oa.call(this, a);
  };
  function ue() {}
  n(ue);
  function ve(a, b) {
    b || (b = 0);
    X(a, "position", "fixed");
    switch (b) {
      case 1:
        X(a, "bottom", "0px");
        X(a, "left", "0px");
        X(a, "right", "auto");
        X(a, "top", "auto");
        break;
      case 3:
        X(a, "bottom", "0px");
        X(a, "right", "0px");
        X(a, "left", "auto");
        X(a, "top", "auto");
        break;
      case 0:
        X(a, "top", "0px");
        X(a, "left", "0px");
        X(a, "right", "auto");
        X(a, "bottom", "auto");
        break;
      case 2:
        X(a, "top", "0px"),
          X(a, "right", "0px"),
          X(a, "left", "auto"),
          X(a, "bottom", "auto");
    }
  }
  function we(a) {
    G.call(this);
    this.Qa = a;
    this.l = {};
  }
  u(we, G);
  var xe = [];
  f = we.prototype;
  f.Y = function (a, b, c, d) {
    p(b) || (b && (xe[0] = b.toString()), (b = xe));
    for (var e = 0; e < b.length; e++) {
      var g = K(a, b[e], c || this.handleEvent, d || !1, this.Qa || this);
      if (!g) break;
      this.l[g.key] = g;
    }
    return this;
  };
  f.Fb = function (a, b, c, d, e) {
    if (p(b)) for (var g = 0; g < b.length; g++) this.Fb(a, b[g], c, d, e);
    else
      (c = c || this.handleEvent),
        (e = e || this.Qa || this),
        (c = Xb(c)),
        (d = !!d),
        (b =
          a && a[Ib]
            ? a.Aa(b, c, d, e)
            : a
            ? (a = Yb(a))
              ? a.Aa(b, c, d, e)
              : null
            : null),
        b && (cc(b), delete this.l[b.key]);
    return this;
  };
  f.Fa = function () {
    Ua(this.l, cc);
    this.l = {};
  };
  f.p = function () {
    we.F.p.call(this);
    this.Fa();
  };
  f.handleEvent = function () {
    throw Error("EventHandler.handleEvent not implemented");
  };
  function ye(a, b, c) {
    L.call(this);
    this.target = a;
    this.handle = b || a;
    this.mc = c || new Hd(NaN, NaN, NaN, NaN);
    this.H = jd(a);
    this.O = new we(this);
    a = ka(Hb, this.O);
    this.ca
      ? a.call(void 0)
      : (this.ja || (this.ja = []), this.ja.push(m(void 0) ? t(a, void 0) : a));
    K(this.handle, ["touchstart", "mousedown"], this.Gc, !1, this);
  }
  u(ye, L);
  var ze = z || (A && C("1.9.3"));
  f = ye.prototype;
  f.clientX = 0;
  f.clientY = 0;
  f.screenX = 0;
  f.screenY = 0;
  f.Hc = 0;
  f.Ic = 0;
  f.deltaX = 0;
  f.deltaY = 0;
  f.$b = !0;
  f.da = !1;
  f.fc = 0;
  f.dd = !1;
  f.Hb = !1;
  f.p = function () {
    ye.F.p.call(this);
    bc(this.handle, ["touchstart", "mousedown"], this.Gc, !1, this);
    this.O.Fa();
    ze && this.H.releaseCapture();
    this.handle = this.target = null;
  };
  function Ae(a) {
    m(a.Cc) || (a.Cc = "rtl" == Ld(a.target, "direction"));
    return a.Cc;
  }
  f.Gc = function (a) {
    var b = "mousedown" == a.type;
    if (
      !this.$b ||
      this.da ||
      (b &&
        (!(Pb ? 0 == a.P.button : "click" == a.type || a.P.button & Tb[0]) ||
          (B && db && a.ctrlKey)))
    )
      this.dispatchEvent("earlycancel");
    else {
      if (0 == this.fc)
        if (this.dispatchEvent(new Be("start", this, a.clientX, a.clientY, a)))
          (this.da = !0), a.preventDefault();
        else return;
      else a.preventDefault();
      var b = this.H,
        c = b.documentElement,
        d = !ze;
      this.O.Y(b, ["touchmove", "mousemove"], this.bd, d);
      this.O.Y(b, ["touchend", "mouseup"], this.Na, d);
      ze
        ? (c.setCapture(!1), this.O.Y(c, "losecapture", this.Na))
        : this.O.Y(
            b ? b.parentWindow || b.defaultView : window,
            "blur",
            this.Na
          );
      z && this.dd && this.O.Y(b, "dragstart", Ob);
      this.Qd && this.O.Y(this.Qd, "scroll", this.Ua, d);
      this.clientX = this.Hc = a.clientX;
      this.clientY = this.Ic = a.clientY;
      this.screenX = a.screenX;
      this.screenY = a.screenY;
      this.Hb
        ? ((a = this.target),
          (b = a.offsetLeft),
          (c = a.offsetParent),
          c || "fixed" != Ld(a, "position") || (c = jd(a).documentElement),
          c
            ? (A
                ? ((d = Od(c)), (b += d.left))
                : z && 8 <= D && !(z && 9 <= D) && ((d = Od(c)), (b -= d.left)),
              (a =
                "rtl" == Ld(c, "direction")
                  ? c.clientWidth - (b + a.offsetWidth)
                  : b))
            : (a = b))
        : (a = this.target.offsetLeft);
      this.deltaX = a;
      this.deltaY = this.target.offsetTop;
      a = hd(this.H);
      this.Ab = pd(a.H);
      la();
    }
  };
  f.Na = function (a) {
    this.O.Fa();
    ze && this.H.releaseCapture();
    if (this.da) {
      this.da = !1;
      var b = Ce(this, this.deltaX),
        c = De(this, this.deltaY);
      this.dispatchEvent(new Be("end", this, a.clientX, a.clientY, a, b, c));
    } else this.dispatchEvent("earlycancel");
  };
  f.bd = function (a) {
    if (this.$b) {
      var b = (this.Hb && Ae(this) ? -1 : 1) * (a.clientX - this.clientX),
        c = a.clientY - this.clientY;
      this.clientX = a.clientX;
      this.clientY = a.clientY;
      this.screenX = a.screenX;
      this.screenY = a.screenY;
      if (!this.da) {
        var d = this.Hc - this.clientX,
          e = this.Ic - this.clientY;
        if (d * d + e * e > this.fc)
          if (
            this.dispatchEvent(new Be("start", this, a.clientX, a.clientY, a))
          )
            this.da = !0;
          else {
            this.ca || this.Na(a);
            return;
          }
      }
      c = Ee(this, b, c);
      b = c.x;
      c = c.y;
      this.da &&
        this.dispatchEvent(
          new Be("beforedrag", this, a.clientX, a.clientY, a, b, c)
        ) &&
        (Fe(this, a, b, c), a.preventDefault());
    }
  };
  function Ee(a, b, c) {
    var d;
    d = hd(a.H);
    d = pd(d.H);
    b += d.x - a.Ab.x;
    c += d.y - a.Ab.y;
    a.Ab = d;
    a.deltaX += b;
    a.deltaY += c;
    b = Ce(a, a.deltaX);
    a = De(a, a.deltaY);
    return new S(b, a);
  }
  f.Ua = function (a) {
    var b = Ee(this, 0, 0);
    a.clientX = this.clientX;
    a.clientY = this.clientY;
    Fe(this, a, b.x, b.y);
  };
  function Fe(a, b, c, d) {
    a.Hb && Ae(a)
      ? (a.target.style.right = c + "px")
      : (a.target.style.left = c + "px");
    a.target.style.top = d + "px";
    a.dispatchEvent(new Be("drag", a, b.clientX, b.clientY, b, c, d));
  }
  function Ce(a, b) {
    var c = a.mc,
      d = isNaN(c.left) ? null : c.left,
      c = isNaN(c.width) ? 0 : c.width;
    return Math.min(
      null != d ? d + c : Infinity,
      Math.max(null != d ? d : -Infinity, b)
    );
  }
  function De(a, b) {
    var c = a.mc,
      d = isNaN(c.top) ? null : c.top,
      c = isNaN(c.height) ? 0 : c.height;
    return Math.min(
      null != d ? d + c : Infinity,
      Math.max(null != d ? d : -Infinity, b)
    );
  }
  function Be(a, b, c, d, e, g, h) {
    I.call(this, a);
    this.clientX = c;
    this.clientY = d;
    this.U = e;
    this.left = m(g) ? g : b.deltaX;
    this.top = m(h) ? h : b.deltaY;
  }
  u(Be, I);
  function Ge(a, b, c) {
    G.call(this);
    this.kd = a;
    this.ed = b;
    this.Qa = c;
    this.Sc = t(this.Id, this);
  }
  u(Ge, G);
  f = Ge.prototype;
  f.bb = !1;
  f.Cb = 0;
  f.ta = null;
  f.stop = function () {
    this.ta && (l.clearTimeout(this.ta), (this.ta = null), (this.bb = !1));
  };
  f.pause = function () {
    this.Cb++;
  };
  f.p = function () {
    Ge.F.p.call(this);
    this.stop();
  };
  f.Id = function () {
    this.ta = null;
    this.bb && !this.Cb && ((this.bb = !1), He(this));
  };
  function He(a) {
    a.ta = Pd(a.Sc, a.ed);
    a.kd.call(a.Qa);
  }
  function Ie(a, b) {
    L.call(this);
    this.c = a;
    this.s = b;
    this.Fc = "size_" + this.c.id.substr(-11);
    this.Nd = new Ge(this.Wc, 30, this);
    this.nb = 14;
    this.Sb = "tr" == this.s || "bl" == this.s ? "nesw-resize" : "nwse-resize";
    this.N = T("div", {
      id: "chatangoDragEl",
      draggable: "true",
      style:
        "cursor:" +
        this.Sb +
        "; width:" +
        this.nb +
        "px; height:" +
        this.nb +
        "px; z-index:10000000000; position:fixed;",
    });
    this.ob = new ye(this.N, null, null);
    this.c.parentNode.appendChild(this.N);
    this.N.draggable = !0;
    K(this.ob, "start", this.rd, !1, this);
    K(this.ob, "drag", this.sd, !1, this);
    K(this.ob, "end", this.qd, !1, this);
  }
  u(Ie, L);
  n(Ie);
  Ie.prototype.rd = function (a) {
    document.body.style.cursor = this.Sb;
    this.Xb = a.U.screenX;
    this.Yb = a.U.screenY;
    this.Wb = this.c.offsetWidth;
    this.Vb = this.c.offsetHeight;
    Je(this, !1);
  };
  Ie.prototype.qd = function () {
    document.body.style.cursor = "auto";
    Je(this, !0);
    localStorage.setItem(this.Fc, JSON.stringify({ w: this.qa, h: this.pa }));
  };
  Ie.prototype.sd = function (a) {
    if (!(0 > a.U.P.x) && 0 != a.U.screenX) {
      switch (this.s) {
        case "tl":
        case "bl":
          this.qa = this.Wb - this.Xb + a.U.screenX;
          break;
        default:
          this.qa = this.Wb + this.Xb - a.U.screenX;
      }
      switch (this.s) {
        case "tr":
        case "tl":
          this.pa = this.Vb - this.Yb + a.U.screenY;
          break;
        default:
          this.pa = this.Vb + this.Yb - a.U.screenY;
      }
      this.qa = Math.max(this.qa, 120);
      this.pa = Math.max(this.pa, 200);
      Ke(this, this.qa, this.pa);
      this.Za = new R(this.qa, this.pa);
      a = this.Nd;
      a.ta || a.Cb ? (a.bb = !0) : He(a);
    }
  };
  Ie.prototype.Wc = function () {
    this.dispatchEvent(new Ed(this.Za));
  };
  function Ke(a, b, c) {
    var d,
      e,
      g,
      h,
      k = Math.round(a.nb / 2) + 1;
    switch (a.s) {
      case "tl":
        d = b - k;
        g = c - k;
        break;
      case "tr":
        e = b - k;
        g = c - k;
        break;
      case "bl":
        d = b - k;
        h = c - k;
        break;
      case "br":
        (e = b - k), (h = c - k);
    }
    a.N.style.left = void 0 != d ? d + "px" : "auto";
    a.N.style.right = void 0 != e ? e + "px" : "auto";
    a.N.style.top = void 0 != g ? g + "px" : "auto";
    a.N.style.bottom = void 0 != h ? h + "px" : "auto";
  }
  function Je(a, b) {
    b ? X(a.c, "pointer-events", "auto") : X(a.c, "pointer-events", "none");
  }
  function Le() {
    L.call(this);
    this.Zb = "";
    this.Mb = {};
  }
  u(Le, L);
  function Me() {
    this.ua = !1;
    this.Ea = ad.j();
    M.f &&
      ((this.Tc = new nc()),
      oc(this.Tc),
      F("goog").ab(ub),
      F("chatango").ab(ub));
    K(window, "pageshow", this.zd, !1, this);
    K(window, "orientationchange", this.tc, !1, this);
    uc() &&
      (this.Ka = document.documentElement.clientWidth / window.innerWidth);
    if ((this.n = Ne())) {
      bd(this.Ea, new Uc(this.n.src));
      var a = this.n.id;
      M.f && this.e.info("embedding " + a);
      this.ba = a.replace("cid", "").replace("_", "");
      this.n.id += "_";
      try {
        this.g = ma(this.n.innerHTML);
      } catch (b) {
        throw "Invalid Embed Code";
      }
      Oe(this, this.n);
      this.wb = void 0 != this.g.styles.pm && 1 == this.g.styles.pm;
      (a = this.g.styles.pos) && uc() && (this.g.styles.cv = 1);
      this.sb = !1;
      uc() &&
        this.g.styles.fwtickm &&
        0 != this.g.styles.fwtickm &&
        ((this.sb = !0),
        (this.g.styles.cv = 1),
        (a = new R(window.innerWidth, 0.075 * window.innerHeight)),
        (this.g.styles.cvw = a.width),
        (this.g.styles.cvh = a.height),
        (this.g.styles.ticker = 1),
        (this.g.styles.cvfntsz = "100%"),
        (a = "br"));
      this.s = a;
      this.lb = 1 == this.g.styles.cv;
      var c = Ud(Td.j(), this.g.arch, this.g.styles);
      M.f && console.log("Architecture:", c);
      "js" == c || "jsonly" == c
        ? ((this.tb = Pe(this, this.n, a)),
          (this.i = wc.j()),
          K(this.i, "resizeiframe", this.Cd, !1, this),
          K(
            this.i,
            "browserviewrequest",
            function () {
              this.i.send("browserviewresponse", this.v());
            },
            !1,
            this
          ),
          K(this.i, "buttonexpanded", this.md, !1, this),
          K(this.i, "buttoncollapsed", this.ld, !1, this),
          this.i.Ga(this.c.contentWindow, this.n.id, this.tb, this),
          K(this.i, "setuserscalable", this.Gd, !1, this),
          K(this.i, "viewporttoobig", this.Kd, !1, this),
          K(this.i, "settitle", this.Jd, !1, this),
          K(this.i, "connestablished", this.nd, !1, this),
          K(this.i, "enableresizedragger", this.td, !1, this),
          K(this.i, "kbdown", this.sc, !1, this),
          K(this.i, "kbup", this.yb, !1, this))
        : "flash" == c
        ? this.wb
          ? Qe(this, this.n)
          : Pe(this, this.n, a, c)
        : "linkandroidchrome" == c
        ? Re(this, this.n)
        : "linkandroidff" == c
        ? Se(this, this.n)
        : "linkdesktopchrome" == c && Te(this, this.n);
    }
  }
  n(Me);
  var Ue = /^cid\d{10,20}$/;
  f = Me.prototype;
  f.e = F("chatango.embed.Embed");
  f.Jd = function (a) {
    document.title = a.data;
  };
  function Oe(a, b) {
    a.width = b.style.width;
    a.height = b.style.height;
    a.ad = a.width;
    a.Zc = a.height;
  }
  f.Cd = function (a) {
    this.width = a.data.width.toString();
    this.height = a.data.height.toString();
    md(this.c, {
      width: this.width.replace("px", "") + "px",
      height: this.height.replace("px", "") + "px",
    });
    this.i.send("resizedone", this.v());
    uc() && this.Ta();
    this.ua && Ve(this);
  };
  f.td = function (a) {
    var b = a.data.enable;
    b &&
      !this.$a &&
      ((this.$a = new Ie(this.c, this.g.styles.pos)),
      K(this.$a, Fd, this.Bd, !1, this));
    if (this.$a)
      if (((a = this.$a), b))
        if (
          ((a.N.style.display = "block"),
          (b = localStorage.getItem(a.Fc)),
          (b = JSON.parse(b)))
        ) {
          var c = Ad.j().Lc,
            b = new R(
              Math.min(b.w, c.v().width - 20),
              Math.min(b.h, c.v().height - 20)
            );
          a.dispatchEvent(new Ed(b));
          Ke(a, b.width, b.height);
        } else Ke(a, a.c.offsetWidth, a.c.offsetHeight);
      else a.N.style.display = "none";
  };
  f.Bd = function (a) {
    this.Za = a.v();
    this.width = this.Za.width.toString() + "px";
    this.height = this.Za.height.toString() + "px";
    md(this.c, {
      width: this.width.replace("px", "") + "px",
      height: this.height.replace("px", "") + "px",
    });
    a = this.v();
    a.ifW = this.width;
    a.ifH = this.height;
    this.i.send("resizeondrag", a);
  };
  f.Kd = function () {
    var a = this.g.styles.pos;
    a || (a = this.g.styles.bpos);
    var b, c;
    switch (a) {
      case "tl":
        break;
      case "tr":
        b = document.width;
        break;
      case "bl":
        c = document.height;
        break;
      default:
        (c = document.height), (b = document.width);
    }
    window.scrollTo(b, c);
  };
  f.Gd = function (a) {
    switch (a.data) {
      case "disable":
        We(this);
        a = document.getElementsByTagName("HEAD");
        if (0 == a.length) break;
        a = a[0];
        var b = vd(a, function (a) {
          return 1 == a.nodeType && "META" == a.tagName && "viewport" == a.name;
        });
        if (0 == b.length)
          (this.V = T("META", {
            name: "viewport",
            content: "user-scalable=0",
          })),
            a.appendChild(this.V),
            (this.S = T("META", {
              name: "viewport",
              content: "user-scalable=1",
            }));
        else {
          this.S = b[b.length - 1];
          a = {};
          for (var c = this.S.attributes.length, b = 0; b < c; b++)
            a[this.S.attributes[b].nodeName] = this.S.attributes[b].nodeValue;
          if (a.content)
            if ((b = a.content.match(/user-scalable\s*=\s*([01yesnotrufal]*)/)))
              if ("1" == b[1] || "true" == b[1] || "yes" == b[1])
                a.content = a.content.replace(
                  /user-scalable\s*=\s*([01yesnotrufal]*)/,
                  "user-scalable=0"
                );
              else break;
            else
              md(this.S, { content: a.content + ", user-scalable=1" }),
                (a.content += ", user-scalable=0");
          else
            (a.content = "user-scalable=0"),
              (this.S.attributes.content = "user-scalable=1");
          this.V = T("META");
          md(this.V, a);
          ud(this.V, this.S);
        }
        break;
      case "restore":
        We(this);
    }
  };
  function We(a) {
    if (a.V) {
      if (a.S) {
        var b = a.V;
        b.parentNode && b.parentNode.insertBefore(a.S, b.nextSibling);
      }
      td(a.V);
      a.V = null;
    }
  }
  function Pe(a, b, c, d) {
    d = "flash" == d;
    var e = -1 != navigator.userAgent.indexOf("Android"),
      g = -1 != navigator.userAgent.indexOf("Mobile") || e;
    if (a.lb) {
      if (
        ((a.width = a.g.styles.cvw || 65),
        (a.height = a.g.styles.cvh || 20),
        g &&
          !a.R &&
          ((a.R = Bd.j()),
          K(a.R, "keyboardraised", a.yb, !1, a),
          K(a.R, "keyboardlowered", a.rc, !1, a)),
        g && !a.G)
      ) {
        a.G = W.j();
        K(a.G, "a", a.pd, !1, a);
        K(a.G, "c", a.tc, !1, a);
        K(a.G, "b", a.od, !1, a);
        K(a.G, "d", a.Ta, !1, a);
        var h = a.G;
        /ipad|ipod|iphone/gi.test(navigator.appVersion)
          ? K(document, "gestureend", h.vc, !1, h)
          : K(document, "touchend", h.vc, !1, h);
        e
          ? ((e = a.G), K(window, "resize", e.wc, !1, e))
          : ((e = a.G), K(window, "orientationchange", e.yd, !1, e));
      }
    } else
      e &&
        !a.G &&
        ((a.G = W.j()),
        (e = a.G),
        K(window, "resize", e.wc, !1, e),
        a.R ||
          ((a.R = Bd.j()),
          K(a.R, "keyboardraised", a.yb, !1, a),
          K(a.R, "keyboardlowered", a.rc, !1, a)));
    e =
      Math.floor(256 * Math.random()).toString(16) +
      String(new Date().getTime()).substr(-4, 4) +
      a.ba;
    a.width = String(a.width).split("px")[0];
    a.height = String(a.height).split("px")[0];
    h = -1 == String(a.width).indexOf("%") ? "px" : "";
    a.c = T("IFRAME", {
      frameborder: 0,
      width: a.width + h,
      height: a.height + h,
      id: e,
    });
    h = g ? "t" : "d";
    void 0 != a.g.styles.mockgroup && (h = g ? "MGt" : "MGd");
    a.wb && (h = g ? "PMt" : "PMd");
    g = "";
    d &&
      ((h = "F"),
      (g = "?" + Xe(a)),
      (g += "&ref=" + document.location.href.split("?")[0].split("#")[0]),
      (g += "&grpnm=" + a.g.handle));
    a.c.src = ed() + "/h5/gz/" + ("r" + Dd.j().lc) + "/i" + h + ".html" + g;
    c
      ? (X(a.c, "z-index", 2147483648), Ye(a), sd(a.c))
      : xd(b)
      ? sd(a.c)
      : V(a.c, b);
    b = ed() + "/cfg/nc/r.json?" + e;
    ue.j();
    c =
      z && !C(10) && Dc(b) != document.domain
        ? new re()
        : new te(void 0, void 0);
    K(c, "success", a.Ed, void 0, a);
    K(c, ["error", "timeout", "abort"], a.Dd, void 0, a);
    c.send(b);
    a.Kb = new Le();
    K(a.Kb, "url_blocked", a.vd, void 0, a);
    a = a.Kb;
    a.Zb = window.location.href;
    a.Mb = {
      "abiwins.blogspot.": !0,
      "forumlovers.com": !0,
      "jorpetz.com": !0,
      "chanchat.blog.fc2.com": !0,
      "chatango.do.am": !0,
      "greatestleak.pw": !0,
      "dropxxbox.com": !0,
      "leakedsauce.com": !0,
      "lark.ru": !0,
      "torjackan.info": !0,
      "totallynsfw.com": !0,
      "dropto.website": !0,
      "chatango-tips-and-tricks.blogspot.com": !0,
      "css-html-script-editor.blogspot.fr": !0,
      "patorjack.com": !0,
      "exe.bz": !0,
      "getxid.com": !0,
      "moresharecorp.github.io": !0,
    };
    b = !0;
    for (var k in a.Mb)
      if (-1 != a.Zb.indexOf(k)) {
        b = !1;
        break;
      }
    b || a.dispatchEvent("url_blocked");
    return e;
  }
  f.Ed = function (a) {
    var b = a.currentTarget;
    a = b.dc();
    b = b.cc();
    if ("r" + Dd.j().lc != "r" + a.r)
      if (
        ((a = "" + b.substr(b.indexOf("?") + 1)),
        (b = document.getElementById(a)),
        (b.src = "about:blank"),
        (this.c = T("IFRAME", {
          frameborder: 0,
          width: b.width,
          height: b.height,
          id: a + "_",
        })),
        (this.c.src = "about:blank"),
        ud(this.c, b),
        (a = xc(this)),
        a.cv)
      )
        X(this.c, "display", "none");
      else {
        b =
          "<html><body><span style='font:11px sans-serif;'>Please clear your browser cache and refresh to see the latest version of Chatango.</span></body></html>";
        if (window.CloudFlare && this.n.getAttribute("data-rocketsrc")) {
          var b = cd(this.Ea).aa,
            c = [],
            d = {
              cid: !0,
              ref: !0,
              ipc: !0,
              tagport: !0,
              iconport: !0,
              aimport: !0,
              msnport: !0,
            };
          for (style in a)
            a.hasOwnProperty(style) &&
              !d[style] &&
              c.push(style + ":" + a[style]);
          b =
            "<html><body><span style='font:11px sans-serif;'>This Chatango embed code is not compatible with CloudFlare. <a href=\"" +
            ("http://" +
              this.g.handle +
              "." +
              b +
              "/clonegroup?style=" +
              c.join(",")) +
            '" target="_blank">Get new embed code here.</a></span></body></html>';
        }
        this.c.contentDocument.write(b);
      }
  };
  f.Dd = function () {};
  f.vd = function () {
    this.c.contentDocument.write("<html><body></body></html>");
    this.c.style.width = "0px";
    this.c.style.height = "0px";
    this.c.style.display = "none";
  };
  function Re(a, b) {
    a.Z = T(
      "p",
      void 0,
      "This version is not available in your current browser.  "
    );
    var c = T(
      "a",
      {
        href:
          "https://play.google.com/store/apps/details?id=com.android.chrome",
      },
      "Download Chrome for Android"
    );
    U(a.Z, c);
    V(a.Z, b);
  }
  function Se(a, b) {
    a.Z = T(
      "p",
      void 0,
      "This version is not available in your current browser.  "
    );
    var c = T(
      "a",
      {
        href:
          "https://play.google.com/store/apps/details?id=org.mozilla.firefox",
      },
      "Download Firefox for Android"
    );
    U(a.Z, c);
    V(a.Z, b);
  }
  function Te(a, b) {
    a.Z = T(
      "p",
      void 0,
      "This version is not available in your current browser.  "
    );
    var c = T("a", { href: "http://google.com/chrome" }, "Download Chrome");
    U(a.Z, c);
    V(a.Z, b);
  }
  function Qe(a, b) {
    var c = a.g.handle,
      d = xc(a),
      e;
    e = cd(a.Ea).aa;
    var g = Xe(a);
    a.rb = "http://" + c + "." + e + "/group";
    a.wb && (a.rb = "http://st." + e + "/flash/SellersApp.swf");
    c = {
      src: a.rb,
      width: a.width,
      height: a.height,
      allowScriptAccess: "always",
      allowNetworking: "all",
      type: "application/x-shockwave-flash",
      allowFullScreen: "true",
      flashvars: g,
    };
    if (!("b" in d) || 100 > d.b) c.wmode = "transparent";
    var d = T("embed"),
      h;
    for (h in c) c.hasOwnProperty(h) && d.setAttribute(h, c[h]);
    z
      ? "CSS1Compat" == document.compatMode
        ? b.parentElement.insertBefore(d, b)
        : (Ze(a),
          a.J.setAttribute("type", "application/x-shockwave-flash"),
          V(a.J, b))
      : (Ze(a), U(a.J, d), V(a.J, b));
  }
  function Ze(a) {
    var b = xc(a);
    cd(a.Ea);
    var c = Xe(a);
    a.J = T("object", { id: "obj_" + a.ba, width: a.width, height: a.height });
    U(a.J, T("param", { name: "movie", value: a.rb }));
    U(a.J, T("param", { name: "AllowScriptAccess", value: "always" }));
    U(a.J, T("param", { name: "AllowNetworking", value: "all" }));
    U(a.J, T("param", { name: "AllowFullScreen", value: "true" }));
    U(a.J, T("param", { name: "flashvars", value: c }));
    ("b" in b && !(100 > b.b)) ||
      U(a.J, T("param", { name: "wmode", value: "transparent" }));
  }
  function Xe(a) {
    var b = [],
      c = xc(a),
      d;
    b.push("cid=" + a.ba);
    "undefined" != typeof c.a && b.push("a=" + c.a);
    for (d in c) c.hasOwnProperty(d) && b.push(d + "=" + c[d]);
    Vc(cd(a.Ea)) == Zc &&
      (b.push("tagport=20800"),
      b.push("iconport=1802"),
      b.push("aimport=5990"),
      b.push("msnport=2663"));
    return b.join("&");
  }
  function Ne() {
    var a;
    a = ld("script", void 0);
    for (var b = 0; b < a.length; b++) {
      var c = a[b].id.match(Ue);
      if (c) return (a = c[0]), (b = document), q(a) ? b.getElementById(a) : a;
    }
    return null;
  }
  function xc(a) {
    return a.g.styles;
  }
  f.zd = function () {
    M.f && this.e.info("onPageShow");
    this.i && this.i.send("pageshow");
  };
  f.v = function () {
    var a = Ad.j().Lc,
      b = {};
    b.vpwidth = a.v().width;
    b.vpheight = a.v().height;
    b.win_innerWidth = window.innerWidth;
    b.win_innerHeight = window.innerHeight;
    b.win_innerHeight = window.innerHeight;
    b.win_outerWidth = window.outerWidth;
    b.doc_clientWidth = document.documentElement.clientWidth;
    b.zoom = document.documentElement.clientWidth / window.innerWidth;
    return b;
  };
  f.tc = function () {
    this.sb
      ? ((this.Ka = -1), this.Ta())
      : this.i.send("orientation_change", this.v());
  };
  f.nd = function () {
    this.i.send("inittitle", document.title);
  };
  f.md = function () {
    this.na ||
      ((this.na = T("div", {
        style:
          "width:" +
          this.c.width +
          "; height:" +
          this.c.height +
          "; display:inline-block",
      })),
      V(this.na, this.c));
    this.i.disconnect();
    this.ac = !0;
    td(this.c);
    sd(this.c);
    this.i.Ga(this.c.contentWindow, this.n.id, this.tb, this);
    var a = this.na.style;
    a.position = "relative";
    z && !C("8")
      ? ((a.zoom = "1"), (a.display = "inline"))
      : (a.display = "inline-block");
    X(this.c, "z-index", 2147483648);
    a = this.g.styles.bpos;
    switch (a) {
      case "tl":
        a = 0;
        break;
      case "tr":
        a = 2;
        break;
      case "bl":
        a = 1;
        break;
      default:
        a = 3;
    }
    X(this.c, "z-index", 2147483648);
    ve(this.c, a);
  };
  f.ld = function () {
    this.na &&
      (X(this.na, "display", "none"),
      this.i.disconnect(),
      (this.ac = !1),
      td(this.c),
      V(this.c, this.na),
      this.i.Ga(this.c.contentWindow, this.n.id, this.tb, this),
      X(this.c, "position", "static"));
  };
  f.Ib = 0;
  f.Ta = function () {
    var a = document.documentElement.clientWidth / window.innerWidth;
    if (a != this.Ka) {
      this.Ka = a;
      var b, c;
      this.s &&
        (this.sb &&
          ((c = new R(window.innerWidth, 0.075 * window.innerHeight)),
          (this.width = c.width),
          (this.height = c.height),
          (this.Ib = 1 < this.Ka ? 1 : 0),
          (b = c.width + 2 * this.Ib),
          (c = c.height),
          this.c.setAttribute("width", b + "px"),
          this.c.setAttribute("height", c + "px"),
          X(this.c, "width", b + "px"),
          X(this.c, "height", c + "px")),
        Ye(this));
      a = this.v();
      b && ((a.cvWidth = b), (a.cvHeight = c));
      this.i.send("zoomed", a);
    }
  };
  function Ye(a) {
    if (a.s)
      if (P.j().xa == tc || 1 >= a.Ka) {
        switch (a.s) {
          case "br":
            ve(a.c, 3);
            break;
          case "bl":
            ve(a.c, 1);
            break;
          case "tl":
            ve(a.c, 0);
            break;
          case "tr":
            ve(a.c, 2);
        }
        a.ua &&
          (bc(window, "scroll", a.Ua, !1, a),
          a.sa && clearTimeout(a.sa),
          X(a.c, "display", "block"),
          (a.vb = !1));
        a.ua = !1;
      } else
        (a.ua = !0),
          X(a.c, "position", "absolute"),
          K(window, "scroll", a.Ua, !1, a),
          $e(a);
  }
  f.yb = function () {
    if (this.$c) {
      if (P.j().xa == sc) {
        var a = kd("bottombar");
        a && (a.style.display = "none");
      }
      vc() && (a = kd("topbar")) && (a.style.display = "none");
    }
    this.s && this.lb && af(this, !1);
  };
  f.sc = function () {
    if (this.$c) {
      if (P.j().xa == sc) {
        var a = kd("bottombar");
        a && (a.style.display = "block");
      }
      vc() && (a = kd("topbar")) && (a.style.display = "block");
    }
    this.s && this.lb && (this.Ta(), $e(this));
  };
  f.rc = function () {
    -1 != navigator.userAgent.indexOf("Android") &&
      this.i &&
      this.i.send("keyboarddown");
    this.sc();
  };
  f.Gb = !1;
  function $e(a) {
    a.Gb || ((a.Gb = !0), setTimeout(t(a.$d, a), 100));
  }
  f.$d = function () {
    this.Gb = !1;
    this.ua ? Ve(this) : af(this, !0);
  };
  function af(a, b) {
    var c = a.R && a.R.xb ? !0 : !1;
    b && !c && a.mb && !a.vb
      ? (X(a.c, "transition", "opacity .3s ease-in"), X(a.c, "opacity", 1))
      : (X(a.c, "transition", "none"), X(a.c, "opacity", 0));
  }
  f.Ua = function () {
    if (this.ua) {
      this.vb = !0;
      af(this, !1);
      this.sa && clearTimeout(this.sa);
      var a = Sd ? 1e3 : 150;
      this.sa = setTimeout(t(this.Fd, this), a);
    }
  };
  f.Fd = function () {
    this.vb = !1;
    af(this, !0);
    Ve(this);
    this.sa && clearTimeout(this.sa);
  };
  function Ve(a) {
    if (a.s) {
      X(a.c, "right", null);
      X(a.c, "bottom", null);
      var b = a.Ib || 0;
      switch (a.s[1]) {
        case "r":
          X(
            a.c,
            "left",
            window.scrollX + window.innerWidth - a.width - b + "px"
          );
          break;
        case "l":
          X(a.c, "left", window.scrollX - b + "px");
      }
      switch (a.s[0]) {
        case "b":
          X(
            a.c,
            "top",
            window.scrollY + window.innerHeight - a.height + 1 + "px"
          );
          break;
        case "t":
          X(a.c, "top", window.scrollY - 1 + "px");
      }
      af(a, !0);
    }
  }
  f.mb = !0;
  f.pd = function () {
    this.mb = !1;
    af(this, !1);
  };
  f.od = function () {
    this.mb = !0;
    $e(this);
  };
  this.chatangoembed = Me;
  this.chatangoembed.getInstance = this.chatangoembed.j;
  this.chatangoembed.getInstance();
})();

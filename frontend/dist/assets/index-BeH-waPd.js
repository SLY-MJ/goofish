(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) s(r);
  new MutationObserver((r) => {
    for (const o of r)
      if (o.type === "childList")
        for (const i of o.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && s(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(r) {
    const o = {};
    return (
      r.integrity && (o.integrity = r.integrity),
      r.referrerPolicy && (o.referrerPolicy = r.referrerPolicy),
      r.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : r.crossOrigin === "anonymous"
          ? (o.credentials = "omit")
          : (o.credentials = "same-origin"),
      o
    );
  }
  function s(r) {
    if (r.ep) return;
    r.ep = !0;
    const o = n(r);
    fetch(r.href, o);
  }
})();
/**
 * @vue/shared v3.5.32
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function yr(e) {
  const t = Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const fe = {},
  tn = [],
  _t = () => {},
  ai = () => !1,
  as = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
  fs = (e) => e.startsWith("onUpdate:"),
  Ne = Object.assign,
  br = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  au = Object.prototype.hasOwnProperty,
  oe = (e, t) => au.call(e, t),
  V = Array.isArray,
  nn = (e) => Fn(e) === "[object Map]",
  fi = (e) => Fn(e) === "[object Set]",
  zr = (e) => Fn(e) === "[object Date]",
  G = (e) => typeof e == "function",
  Re = (e) => typeof e == "string",
  et = (e) => typeof e == "symbol",
  le = (e) => e !== null && typeof e == "object",
  di = (e) => (le(e) || G(e)) && G(e.then) && G(e.catch),
  pi = Object.prototype.toString,
  Fn = (e) => pi.call(e),
  fu = (e) => Fn(e).slice(8, -1),
  hi = (e) => Fn(e) === "[object Object]",
  ds = (e) =>
    Re(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  yn = yr(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted",
  ),
  ps = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  du = /-\w/g,
  je = ps((e) => e.replace(du, (t) => t.slice(1).toUpperCase())),
  pu = /\B([A-Z])/g,
  Gt = ps((e) => e.replace(pu, "-$1").toLowerCase()),
  hs = ps((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Ns = ps((e) => (e ? `on${hs(e)}` : "")),
  yt = (e, t) => !Object.is(e, t),
  Gn = (e, ...t) => {
    for (let n = 0; n < e.length; n++) e[n](...t);
  },
  mi = (e, t, n, s = !1) => {
    Object.defineProperty(e, t, {
      configurable: !0,
      enumerable: !1,
      writable: s,
      value: n,
    });
  },
  _r = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let Jr;
const ms = () =>
  Jr ||
  (Jr =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : typeof global < "u"
            ? global
            : {});
function vr(e) {
  if (V(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        r = Re(s) ? yu(s) : vr(s);
      if (r) for (const o in r) t[o] = r[o];
    }
    return t;
  } else if (Re(e) || le(e)) return e;
}
const hu = /;(?![^(]*\))/g,
  mu = /:([^]+)/,
  gu = /\/\*[^]*?\*\//g;
function yu(e) {
  const t = {};
  return (
    e
      .replace(gu, "")
      .split(hu)
      .forEach((n) => {
        if (n) {
          const s = n.split(mu);
          s.length > 1 && (t[s[0].trim()] = s[1].trim());
        }
      }),
    t
  );
}
function wr(e) {
  let t = "";
  if (Re(e)) t = e;
  else if (V(e))
    for (let n = 0; n < e.length; n++) {
      const s = wr(e[n]);
      s && (t += s + " ");
    }
  else if (le(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const bu =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  _u = yr(bu);
function gi(e) {
  return !!e || e === "";
}
function vu(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let s = 0; n && s < e.length; s++) n = Er(e[s], t[s]);
  return n;
}
function Er(e, t) {
  if (e === t) return !0;
  let n = zr(e),
    s = zr(t);
  if (n || s) return n && s ? e.getTime() === t.getTime() : !1;
  if (((n = et(e)), (s = et(t)), n || s)) return e === t;
  if (((n = V(e)), (s = V(t)), n || s)) return n && s ? vu(e, t) : !1;
  if (((n = le(e)), (s = le(t)), n || s)) {
    if (!n || !s) return !1;
    const r = Object.keys(e).length,
      o = Object.keys(t).length;
    if (r !== o) return !1;
    for (const i in e) {
      const l = e.hasOwnProperty(i),
        c = t.hasOwnProperty(i);
      if ((l && !c) || (!l && c) || !Er(e[i], t[i])) return !1;
    }
  }
  return String(e) === String(t);
}
const yi = (e) => !!(e && e.__v_isRef === !0),
  Q = (e) =>
    Re(e)
      ? e
      : e == null
        ? ""
        : V(e) || (le(e) && (e.toString === pi || !G(e.toString)))
          ? yi(e)
            ? Q(e.value)
            : JSON.stringify(e, bi, 2)
          : String(e),
  bi = (e, t) =>
    yi(t)
      ? bi(e, t.value)
      : nn(t)
        ? {
            [`Map(${t.size})`]: [...t.entries()].reduce(
              (n, [s, r], o) => ((n[Is(s, o) + " =>"] = r), n),
              {},
            ),
          }
        : fi(t)
          ? { [`Set(${t.size})`]: [...t.values()].map((n) => Is(n)) }
          : et(t)
            ? Is(t)
            : le(t) && !V(t) && !hi(t)
              ? String(t)
              : t,
  Is = (e, t = "") => {
    var n;
    return et(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
  };
/**
 * @vue/reactivity v3.5.32
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let Ie;
class _i {
  constructor(t = !1) {
    ((this.detached = t),
      (this._active = !0),
      (this._on = 0),
      (this.effects = []),
      (this.cleanups = []),
      (this._isPaused = !1),
      (this.__v_skip = !0),
      (this.parent = Ie),
      !t &&
        Ie &&
        (this.index = (Ie.scopes || (Ie.scopes = [])).push(this) - 1));
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].pause();
    }
  }
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = Ie;
      try {
        return ((Ie = this), t());
      } finally {
        Ie = n;
      }
    }
  }
  on() {
    ++this._on === 1 && ((this.prevScope = Ie), (Ie = this));
  }
  off() {
    this._on > 0 &&
      --this._on === 0 &&
      ((Ie = this.prevScope), (this.prevScope = void 0));
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop();
      for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (((this.cleanups.length = 0), this.scopes)) {
        for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r &&
          r !== this &&
          ((this.parent.scopes[this.index] = r), (r.index = this.index));
      }
      this.parent = void 0;
    }
  }
}
function vi(e) {
  return new _i(e);
}
function wi() {
  return Ie;
}
function wu(e, t = !1) {
  Ie && Ie.cleanups.push(e);
}
let ge;
const Ds = new WeakSet();
class Ei {
  constructor(t) {
    ((this.fn = t),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 5),
      (this.next = void 0),
      (this.cleanup = void 0),
      (this.scheduler = void 0),
      Ie && Ie.active && Ie.effects.push(this));
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 &&
      ((this.flags &= -65), Ds.has(this) && (Ds.delete(this), this.trigger()));
  }
  notify() {
    (this.flags & 2 && !(this.flags & 32)) || this.flags & 8 || Si(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    ((this.flags |= 2), Qr(this), Ai(this));
    const t = ge,
      n = st;
    ((ge = this), (st = !0));
    try {
      return this.fn();
    } finally {
      (xi(this), (ge = t), (st = n), (this.flags &= -3));
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep) Ar(t);
      ((this.deps = this.depsTail = void 0),
        Qr(this),
        this.onStop && this.onStop(),
        (this.flags &= -2));
    }
  }
  trigger() {
    this.flags & 64
      ? Ds.add(this)
      : this.scheduler
        ? this.scheduler()
        : this.runIfDirty();
  }
  runIfDirty() {
    Xs(this) && this.run();
  }
  get dirty() {
    return Xs(this);
  }
}
let Ri = 0,
  bn,
  _n;
function Si(e, t = !1) {
  if (((e.flags |= 8), t)) {
    ((e.next = _n), (_n = e));
    return;
  }
  ((e.next = bn), (bn = e));
}
function Rr() {
  Ri++;
}
function Sr() {
  if (--Ri > 0) return;
  if (_n) {
    let t = _n;
    for (_n = void 0; t; ) {
      const n = t.next;
      ((t.next = void 0), (t.flags &= -9), (t = n));
    }
  }
  let e;
  for (; bn; ) {
    let t = bn;
    for (bn = void 0; t; ) {
      const n = t.next;
      if (((t.next = void 0), (t.flags &= -9), t.flags & 1))
        try {
          t.trigger();
        } catch (s) {
          e || (e = s);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function Ai(e) {
  for (let t = e.deps; t; t = t.nextDep)
    ((t.version = -1),
      (t.prevActiveLink = t.dep.activeLink),
      (t.dep.activeLink = t));
}
function xi(e) {
  let t,
    n = e.depsTail,
    s = n;
  for (; s; ) {
    const r = s.prevDep;
    (s.version === -1 ? (s === n && (n = r), Ar(s), Eu(s)) : (t = s),
      (s.dep.activeLink = s.prevActiveLink),
      (s.prevActiveLink = void 0),
      (s = r));
  }
  ((e.deps = t), (e.depsTail = n));
}
function Xs(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (
      t.dep.version !== t.version ||
      (t.dep.computed && (Oi(t.dep.computed) || t.dep.version !== t.version))
    )
      return !0;
  return !!e._dirty;
}
function Oi(e) {
  if (
    (e.flags & 4 && !(e.flags & 16)) ||
    ((e.flags &= -17), e.globalVersion === Tn) ||
    ((e.globalVersion = Tn),
    !e.isSSR && e.flags & 128 && ((!e.deps && !e._dirty) || !Xs(e)))
  )
    return;
  e.flags |= 2;
  const t = e.dep,
    n = ge,
    s = st;
  ((ge = e), (st = !0));
  try {
    Ai(e);
    const r = e.fn(e._value);
    (t.version === 0 || yt(r, e._value)) &&
      ((e.flags |= 128), (e._value = r), t.version++);
  } catch (r) {
    throw (t.version++, r);
  } finally {
    ((ge = n), (st = s), xi(e), (e.flags &= -3));
  }
}
function Ar(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (
    (s && ((s.nextSub = r), (e.prevSub = void 0)),
    r && ((r.prevSub = s), (e.nextSub = void 0)),
    n.subs === e && ((n.subs = s), !s && n.computed))
  ) {
    n.computed.flags &= -5;
    for (let o = n.computed.deps; o; o = o.nextDep) Ar(o, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Eu(e) {
  const { prevDep: t, nextDep: n } = e;
  (t && ((t.nextDep = n), (e.prevDep = void 0)),
    n && ((n.prevDep = t), (e.nextDep = void 0)));
}
let st = !0;
const Ci = [];
function Ct() {
  (Ci.push(st), (st = !1));
}
function Tt() {
  const e = Ci.pop();
  st = e === void 0 ? !0 : e;
}
function Qr(e) {
  const { cleanup: t } = e;
  if (((e.cleanup = void 0), t)) {
    const n = ge;
    ge = void 0;
    try {
      t();
    } finally {
      ge = n;
    }
  }
}
let Tn = 0;
class Ru {
  constructor(t, n) {
    ((this.sub = t),
      (this.dep = n),
      (this.version = n.version),
      (this.nextDep =
        this.prevDep =
        this.nextSub =
        this.prevSub =
        this.prevActiveLink =
          void 0));
  }
}
class xr {
  constructor(t) {
    ((this.computed = t),
      (this.version = 0),
      (this.activeLink = void 0),
      (this.subs = void 0),
      (this.map = void 0),
      (this.key = void 0),
      (this.sc = 0),
      (this.__v_skip = !0));
  }
  track(t) {
    if (!ge || !st || ge === this.computed) return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== ge)
      ((n = this.activeLink = new Ru(ge, this)),
        ge.deps
          ? ((n.prevDep = ge.depsTail),
            (ge.depsTail.nextDep = n),
            (ge.depsTail = n))
          : (ge.deps = ge.depsTail = n),
        Ti(n));
    else if (n.version === -1 && ((n.version = this.version), n.nextDep)) {
      const s = n.nextDep;
      ((s.prevDep = n.prevDep),
        n.prevDep && (n.prevDep.nextDep = s),
        (n.prevDep = ge.depsTail),
        (n.nextDep = void 0),
        (ge.depsTail.nextDep = n),
        (ge.depsTail = n),
        ge.deps === n && (ge.deps = s));
    }
    return n;
  }
  trigger(t) {
    (this.version++, Tn++, this.notify(t));
  }
  notify(t) {
    Rr();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Sr();
    }
  }
}
function Ti(e) {
  if ((e.dep.sc++, e.sub.flags & 4)) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep) Ti(s);
    }
    const n = e.dep.subs;
    (n !== e && ((e.prevSub = n), n && (n.nextSub = e)), (e.dep.subs = e));
  }
}
const es = new WeakMap(),
  Ht = Symbol(""),
  Ys = Symbol(""),
  Pn = Symbol("");
function De(e, t, n) {
  if (st && ge) {
    let s = es.get(e);
    s || es.set(e, (s = new Map()));
    let r = s.get(n);
    (r || (s.set(n, (r = new xr())), (r.map = s), (r.key = n)), r.track());
  }
}
function At(e, t, n, s, r, o) {
  const i = es.get(e);
  if (!i) {
    Tn++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if ((Rr(), t === "clear")) i.forEach(l);
  else {
    const c = V(e),
      a = c && ds(n);
    if (c && n === "length") {
      const u = Number(s);
      i.forEach((f, h) => {
        (h === "length" || h === Pn || (!et(h) && h >= u)) && l(f);
      });
    } else
      switch (
        ((n !== void 0 || i.has(void 0)) && l(i.get(n)), a && l(i.get(Pn)), t)
      ) {
        case "add":
          c ? a && l(i.get("length")) : (l(i.get(Ht)), nn(e) && l(i.get(Ys)));
          break;
        case "delete":
          c || (l(i.get(Ht)), nn(e) && l(i.get(Ys)));
          break;
        case "set":
          nn(e) && l(i.get(Ht));
          break;
      }
  }
  Sr();
}
function Su(e, t) {
  const n = es.get(e);
  return n && n.get(t);
}
function Qt(e) {
  const t = se(e);
  return t === e ? t : (De(t, "iterate", Pn), ze(e) ? t : t.map(rt));
}
function gs(e) {
  return (De((e = se(e)), "iterate", Pn), e);
}
function mt(e, t) {
  return Nt(e) ? rn(Ot(e) ? rt(t) : t) : rt(t);
}
const Au = {
  __proto__: null,
  [Symbol.iterator]() {
    return Ls(this, Symbol.iterator, (e) => mt(this, e));
  },
  concat(...e) {
    return Qt(this).concat(...e.map((t) => (V(t) ? Qt(t) : t)));
  },
  entries() {
    return Ls(this, "entries", (e) => ((e[1] = mt(this, e[1])), e));
  },
  every(e, t) {
    return wt(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return wt(
      this,
      "filter",
      e,
      t,
      (n) => n.map((s) => mt(this, s)),
      arguments,
    );
  },
  find(e, t) {
    return wt(this, "find", e, t, (n) => mt(this, n), arguments);
  },
  findIndex(e, t) {
    return wt(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return wt(this, "findLast", e, t, (n) => mt(this, n), arguments);
  },
  findLastIndex(e, t) {
    return wt(this, "findLastIndex", e, t, void 0, arguments);
  },
  forEach(e, t) {
    return wt(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Fs(this, "includes", e);
  },
  indexOf(...e) {
    return Fs(this, "indexOf", e);
  },
  join(e) {
    return Qt(this).join(e);
  },
  lastIndexOf(...e) {
    return Fs(this, "lastIndexOf", e);
  },
  map(e, t) {
    return wt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return dn(this, "pop");
  },
  push(...e) {
    return dn(this, "push", e);
  },
  reduce(e, ...t) {
    return Xr(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Xr(this, "reduceRight", e, t);
  },
  shift() {
    return dn(this, "shift");
  },
  some(e, t) {
    return wt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return dn(this, "splice", e);
  },
  toReversed() {
    return Qt(this).toReversed();
  },
  toSorted(e) {
    return Qt(this).toSorted(e);
  },
  toSpliced(...e) {
    return Qt(this).toSpliced(...e);
  },
  unshift(...e) {
    return dn(this, "unshift", e);
  },
  values() {
    return Ls(this, "values", (e) => mt(this, e));
  },
};
function Ls(e, t, n) {
  const s = gs(e),
    r = s[t]();
  return (
    s !== e &&
      !ze(e) &&
      ((r._next = r.next),
      (r.next = () => {
        const o = r._next();
        return (o.done || (o.value = n(o.value)), o);
      })),
    r
  );
}
const xu = Array.prototype;
function wt(e, t, n, s, r, o) {
  const i = gs(e),
    l = i !== e && !ze(e),
    c = i[t];
  if (c !== xu[t]) {
    const f = c.apply(e, o);
    return l ? rt(f) : f;
  }
  let a = n;
  i !== e &&
    (l
      ? (a = function (f, h) {
          return n.call(this, mt(e, f), h, e);
        })
      : n.length > 2 &&
        (a = function (f, h) {
          return n.call(this, f, h, e);
        }));
  const u = c.call(i, a, s);
  return l && r ? r(u) : u;
}
function Xr(e, t, n, s) {
  const r = gs(e),
    o = r !== e && !ze(e);
  let i = n,
    l = !1;
  r !== e &&
    (o
      ? ((l = s.length === 0),
        (i = function (a, u, f) {
          return (
            l && ((l = !1), (a = mt(e, a))),
            n.call(this, a, mt(e, u), f, e)
          );
        }))
      : n.length > 3 &&
        (i = function (a, u, f) {
          return n.call(this, a, u, f, e);
        }));
  const c = r[t](i, ...s);
  return l ? mt(e, c) : c;
}
function Fs(e, t, n) {
  const s = se(e);
  De(s, "iterate", Pn);
  const r = s[t](...n);
  return (r === -1 || r === !1) && ys(n[0])
    ? ((n[0] = se(n[0])), s[t](...n))
    : r;
}
function dn(e, t, n = []) {
  (Ct(), Rr());
  const s = se(e)[t].apply(e, n);
  return (Sr(), Tt(), s);
}
const Ou = yr("__proto__,__v_isRef,__isVue"),
  Pi = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(et),
  );
function Cu(e) {
  et(e) || (e = String(e));
  const t = se(this);
  return (De(t, "has", e), t.hasOwnProperty(e));
}
class Ni {
  constructor(t = !1, n = !1) {
    ((this._isReadonly = t), (this._isShallow = n));
  }
  get(t, n, s) {
    if (n === "__v_skip") return t.__v_skip;
    const r = this._isReadonly,
      o = this._isShallow;
    if (n === "__v_isReactive") return !r;
    if (n === "__v_isReadonly") return r;
    if (n === "__v_isShallow") return o;
    if (n === "__v_raw")
      return s === (r ? (o ? ku : Fi) : o ? Li : Di).get(t) ||
        Object.getPrototypeOf(t) === Object.getPrototypeOf(s)
        ? t
        : void 0;
    const i = V(t);
    if (!r) {
      let c;
      if (i && (c = Au[n])) return c;
      if (n === "hasOwnProperty") return Cu;
    }
    const l = Reflect.get(t, n, be(t) ? t : s);
    if ((et(n) ? Pi.has(n) : Ou(n)) || (r || De(t, "get", n), o)) return l;
    if (be(l)) {
      const c = i && ds(n) ? l : l.value;
      return r && le(c) ? er(c) : c;
    }
    return le(l) ? (r ? er(l) : Pt(l)) : l;
  }
}
class Ii extends Ni {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let o = t[n];
    const i = V(t) && ds(n);
    if (!this._isShallow) {
      const a = Nt(o);
      if (
        (!ze(s) && !Nt(s) && ((o = se(o)), (s = se(s))), !i && be(o) && !be(s))
      )
        return (a || (o.value = s), !0);
    }
    const l = i ? Number(n) < t.length : oe(t, n),
      c = Reflect.set(t, n, s, be(t) ? t : r);
    return (
      t === se(r) && (l ? yt(s, o) && At(t, "set", n, s) : At(t, "add", n, s)),
      c
    );
  }
  deleteProperty(t, n) {
    const s = oe(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return (r && s && At(t, "delete", n, void 0), r);
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return ((!et(n) || !Pi.has(n)) && De(t, "has", n), s);
  }
  ownKeys(t) {
    return (De(t, "iterate", V(t) ? "length" : Ht), Reflect.ownKeys(t));
  }
}
class Tu extends Ni {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const Pu = new Ii(),
  Nu = new Tu(),
  Iu = new Ii(!0);
const Zs = (e) => e,
  Hn = (e) => Reflect.getPrototypeOf(e);
function Du(e, t, n) {
  return function (...s) {
    const r = this.__v_raw,
      o = se(r),
      i = nn(o),
      l = e === "entries" || (e === Symbol.iterator && i),
      c = e === "keys" && i,
      a = r[e](...s),
      u = n ? Zs : t ? rn : rt;
    return (
      !t && De(o, "iterate", c ? Ys : Ht),
      Ne(Object.create(a), {
        next() {
          const { value: f, done: h } = a.next();
          return h
            ? { value: f, done: h }
            : { value: l ? [u(f[0]), u(f[1])] : u(f), done: h };
        },
      })
    );
  };
}
function qn(e) {
  return function (...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Lu(e, t) {
  const n = {
    get(r) {
      const o = this.__v_raw,
        i = se(o),
        l = se(r);
      e || (yt(r, l) && De(i, "get", r), De(i, "get", l));
      const { has: c } = Hn(i),
        a = t ? Zs : e ? rn : rt;
      if (c.call(i, r)) return a(o.get(r));
      if (c.call(i, l)) return a(o.get(l));
      o !== i && o.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return (!e && De(se(r), "iterate", Ht), r.size);
    },
    has(r) {
      const o = this.__v_raw,
        i = se(o),
        l = se(r);
      return (
        e || (yt(r, l) && De(i, "has", r), De(i, "has", l)),
        r === l ? o.has(r) : o.has(r) || o.has(l)
      );
    },
    forEach(r, o) {
      const i = this,
        l = i.__v_raw,
        c = se(l),
        a = t ? Zs : e ? rn : rt;
      return (
        !e && De(c, "iterate", Ht),
        l.forEach((u, f) => r.call(o, a(u), a(f), i))
      );
    },
  };
  return (
    Ne(
      n,
      e
        ? {
            add: qn("add"),
            set: qn("set"),
            delete: qn("delete"),
            clear: qn("clear"),
          }
        : {
            add(r) {
              const o = se(this),
                i = Hn(o),
                l = se(r),
                c = !t && !ze(r) && !Nt(r) ? l : r;
              return (
                i.has.call(o, c) ||
                  (yt(r, c) && i.has.call(o, r)) ||
                  (yt(l, c) && i.has.call(o, l)) ||
                  (o.add(c), At(o, "add", c, c)),
                this
              );
            },
            set(r, o) {
              !t && !ze(o) && !Nt(o) && (o = se(o));
              const i = se(this),
                { has: l, get: c } = Hn(i);
              let a = l.call(i, r);
              a || ((r = se(r)), (a = l.call(i, r)));
              const u = c.call(i, r);
              return (
                i.set(r, o),
                a ? yt(o, u) && At(i, "set", r, o) : At(i, "add", r, o),
                this
              );
            },
            delete(r) {
              const o = se(this),
                { has: i, get: l } = Hn(o);
              let c = i.call(o, r);
              (c || ((r = se(r)), (c = i.call(o, r))), l && l.call(o, r));
              const a = o.delete(r);
              return (c && At(o, "delete", r, void 0), a);
            },
            clear() {
              const r = se(this),
                o = r.size !== 0,
                i = r.clear();
              return (o && At(r, "clear", void 0, void 0), i);
            },
          },
    ),
    ["keys", "values", "entries", Symbol.iterator].forEach((r) => {
      n[r] = Du(r, e, t);
    }),
    n
  );
}
function Or(e, t) {
  const n = Lu(e, t);
  return (s, r, o) =>
    r === "__v_isReactive"
      ? !e
      : r === "__v_isReadonly"
        ? e
        : r === "__v_raw"
          ? s
          : Reflect.get(oe(n, r) && r in s ? n : s, r, o);
}
const Fu = { get: Or(!1, !1) },
  Uu = { get: Or(!1, !0) },
  Mu = { get: Or(!0, !1) };
const Di = new WeakMap(),
  Li = new WeakMap(),
  Fi = new WeakMap(),
  ku = new WeakMap();
function Bu(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function ju(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Bu(fu(e));
}
function Pt(e) {
  return Nt(e) ? e : Cr(e, !1, Pu, Fu, Di);
}
function Ui(e) {
  return Cr(e, !1, Iu, Uu, Li);
}
function er(e) {
  return Cr(e, !0, Nu, Mu, Fi);
}
function Cr(e, t, n, s, r) {
  if (!le(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const o = ju(e);
  if (o === 0) return e;
  const i = r.get(e);
  if (i) return i;
  const l = new Proxy(e, o === 2 ? s : n);
  return (r.set(e, l), l);
}
function Ot(e) {
  return Nt(e) ? Ot(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Nt(e) {
  return !!(e && e.__v_isReadonly);
}
function ze(e) {
  return !!(e && e.__v_isShallow);
}
function ys(e) {
  return e ? !!e.__v_raw : !1;
}
function se(e) {
  const t = e && e.__v_raw;
  return t ? se(t) : e;
}
function Tr(e) {
  return (
    !oe(e, "__v_skip") && Object.isExtensible(e) && mi(e, "__v_skip", !0),
    e
  );
}
const rt = (e) => (le(e) ? Pt(e) : e),
  rn = (e) => (le(e) ? er(e) : e);
function be(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function ie(e) {
  return Mi(e, !1);
}
function $u(e) {
  return Mi(e, !0);
}
function Mi(e, t) {
  return be(e) ? e : new Vu(e, t);
}
class Vu {
  constructor(t, n) {
    ((this.dep = new xr()),
      (this.__v_isRef = !0),
      (this.__v_isShallow = !1),
      (this._rawValue = n ? t : se(t)),
      (this._value = n ? t : rt(t)),
      (this.__v_isShallow = n));
  }
  get value() {
    return (this.dep.track(), this._value);
  }
  set value(t) {
    const n = this._rawValue,
      s = this.__v_isShallow || ze(t) || Nt(t);
    ((t = s ? t : se(t)),
      yt(t, n) &&
        ((this._rawValue = t),
        (this._value = s ? t : rt(t)),
        this.dep.trigger()));
  }
}
function Pe(e) {
  return be(e) ? e.value : e;
}
const Hu = {
  get: (e, t, n) => (t === "__v_raw" ? e : Pe(Reflect.get(e, t, n))),
  set: (e, t, n, s) => {
    const r = e[t];
    return be(r) && !be(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s);
  },
};
function ki(e) {
  return Ot(e) ? e : new Proxy(e, Hu);
}
function qu(e) {
  const t = V(e) ? new Array(e.length) : {};
  for (const n in e) t[n] = Wu(e, n);
  return t;
}
class Ku {
  constructor(t, n, s) {
    ((this._object = t),
      (this._defaultValue = s),
      (this.__v_isRef = !0),
      (this._value = void 0),
      (this._key = et(n) ? n : String(n)),
      (this._raw = se(t)));
    let r = !0,
      o = t;
    if (!V(t) || et(this._key) || !ds(this._key))
      do r = !ys(o) || ze(o);
      while (r && (o = o.__v_raw));
    this._shallow = r;
  }
  get value() {
    let t = this._object[this._key];
    return (
      this._shallow && (t = Pe(t)),
      (this._value = t === void 0 ? this._defaultValue : t)
    );
  }
  set value(t) {
    if (this._shallow && be(this._raw[this._key])) {
      const n = this._object[this._key];
      if (be(n)) {
        n.value = t;
        return;
      }
    }
    this._object[this._key] = t;
  }
  get dep() {
    return Su(this._raw, this._key);
  }
}
function Wu(e, t, n) {
  return new Ku(e, t, n);
}
class Gu {
  constructor(t, n, s) {
    ((this.fn = t),
      (this.setter = n),
      (this._value = void 0),
      (this.dep = new xr(this)),
      (this.__v_isRef = !0),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 16),
      (this.globalVersion = Tn - 1),
      (this.next = void 0),
      (this.effect = this),
      (this.__v_isReadonly = !n),
      (this.isSSR = s));
  }
  notify() {
    if (((this.flags |= 16), !(this.flags & 8) && ge !== this))
      return (Si(this, !0), !0);
  }
  get value() {
    const t = this.dep.track();
    return (Oi(this), t && (t.version = this.dep.version), this._value);
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function zu(e, t, n = !1) {
  let s, r;
  return (G(e) ? (s = e) : ((s = e.get), (r = e.set)), new Gu(s, r, n));
}
const Kn = {},
  ts = new WeakMap();
let jt;
function Ju(e, t = !1, n = jt) {
  if (n) {
    let s = ts.get(n);
    (s || ts.set(n, (s = [])), s.push(e));
  }
}
function Qu(e, t, n = fe) {
  const {
      immediate: s,
      deep: r,
      once: o,
      scheduler: i,
      augmentJob: l,
      call: c,
    } = n,
    a = (N) => (r ? N : ze(N) || r === !1 || r === 0 ? xt(N, 1) : xt(N));
  let u,
    f,
    h,
    _,
    m = !1,
    y = !1;
  if (
    (be(e)
      ? ((f = () => e.value), (m = ze(e)))
      : Ot(e)
        ? ((f = () => a(e)), (m = !0))
        : V(e)
          ? ((y = !0),
            (m = e.some((N) => Ot(N) || ze(N))),
            (f = () =>
              e.map((N) => {
                if (be(N)) return N.value;
                if (Ot(N)) return a(N);
                if (G(N)) return c ? c(N, 2) : N();
              })))
          : G(e)
            ? t
              ? (f = c ? () => c(e, 2) : e)
              : (f = () => {
                  if (h) {
                    Ct();
                    try {
                      h();
                    } finally {
                      Tt();
                    }
                  }
                  const N = jt;
                  jt = u;
                  try {
                    return c ? c(e, 3, [_]) : e(_);
                  } finally {
                    jt = N;
                  }
                })
            : (f = _t),
    t && r)
  ) {
    const N = f,
      B = r === !0 ? 1 / 0 : r;
    f = () => xt(N(), B);
  }
  const w = wi(),
    I = () => {
      (u.stop(), w && w.active && br(w.effects, u));
    };
  if (o && t) {
    const N = t;
    t = (...B) => {
      (N(...B), I());
    };
  }
  let C = y ? new Array(e.length).fill(Kn) : Kn;
  const x = (N) => {
    if (!(!(u.flags & 1) || (!u.dirty && !N)))
      if (t) {
        const B = u.run();
        if (r || m || (y ? B.some((pe, z) => yt(pe, C[z])) : yt(B, C))) {
          h && h();
          const pe = jt;
          jt = u;
          try {
            const z = [B, C === Kn ? void 0 : y && C[0] === Kn ? [] : C, _];
            ((C = B), c ? c(t, 3, z) : t(...z));
          } finally {
            jt = pe;
          }
        }
      } else u.run();
  };
  return (
    l && l(x),
    (u = new Ei(f)),
    (u.scheduler = i ? () => i(x, !1) : x),
    (_ = (N) => Ju(N, !1, u)),
    (h = u.onStop =
      () => {
        const N = ts.get(u);
        if (N) {
          if (c) c(N, 4);
          else for (const B of N) B();
          ts.delete(u);
        }
      }),
    t ? (s ? x(!0) : (C = u.run())) : i ? i(x.bind(null, !0), !0) : u.run(),
    (I.pause = u.pause.bind(u)),
    (I.resume = u.resume.bind(u)),
    (I.stop = I),
    I
  );
}
function xt(e, t = 1 / 0, n) {
  if (
    t <= 0 ||
    !le(e) ||
    e.__v_skip ||
    ((n = n || new Map()), (n.get(e) || 0) >= t)
  )
    return e;
  if ((n.set(e, t), t--, be(e))) xt(e.value, t, n);
  else if (V(e)) for (let s = 0; s < e.length; s++) xt(e[s], t, n);
  else if (fi(e) || nn(e))
    e.forEach((s) => {
      xt(s, t, n);
    });
  else if (hi(e)) {
    for (const s in e) xt(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && xt(e[s], t, n);
  }
  return e;
}
/**
 * @vue/runtime-core v3.5.32
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function Un(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    bs(r, t, n);
  }
}
function vt(e, t, n, s) {
  if (G(e)) {
    const r = Un(e, t, n, s);
    return (
      r &&
        di(r) &&
        r.catch((o) => {
          bs(o, t, n);
        }),
      r
    );
  }
  if (V(e)) {
    const r = [];
    for (let o = 0; o < e.length; o++) r.push(vt(e[o], t, n, s));
    return r;
  }
}
function bs(e, t, n, s = !0) {
  const r = t ? t.vnode : null,
    { errorHandler: o, throwUnhandledErrorInProduction: i } =
      (t && t.appContext.config) || fe;
  if (t) {
    let l = t.parent;
    const c = t.proxy,
      a = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const u = l.ec;
      if (u) {
        for (let f = 0; f < u.length; f++) if (u[f](e, c, a) === !1) return;
      }
      l = l.parent;
    }
    if (o) {
      (Ct(), Un(o, null, 10, [e, c, a]), Tt());
      return;
    }
  }
  Xu(e, n, r, s, i);
}
function Xu(e, t, n, s = !0, r = !1) {
  if (r) throw e;
  console.error(e);
}
const Be = [];
let ht = -1;
const sn = [];
let Ft = null,
  Yt = 0;
const Bi = Promise.resolve();
let ns = null;
function Pr(e) {
  const t = ns || Bi;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Yu(e) {
  let t = ht + 1,
    n = Be.length;
  for (; t < n; ) {
    const s = (t + n) >>> 1,
      r = Be[s],
      o = Nn(r);
    o < e || (o === e && r.flags & 2) ? (t = s + 1) : (n = s);
  }
  return t;
}
function Nr(e) {
  if (!(e.flags & 1)) {
    const t = Nn(e),
      n = Be[Be.length - 1];
    (!n || (!(e.flags & 2) && t >= Nn(n)) ? Be.push(e) : Be.splice(Yu(t), 0, e),
      (e.flags |= 1),
      ji());
  }
}
function ji() {
  ns || (ns = Bi.then(Vi));
}
function Zu(e) {
  (V(e)
    ? sn.push(...e)
    : Ft && e.id === -1
      ? Ft.splice(Yt + 1, 0, e)
      : e.flags & 1 || (sn.push(e), (e.flags |= 1)),
    ji());
}
function Yr(e, t, n = ht + 1) {
  for (; n < Be.length; n++) {
    const s = Be[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid) continue;
      (Be.splice(n, 1),
        n--,
        s.flags & 4 && (s.flags &= -2),
        s(),
        s.flags & 4 || (s.flags &= -2));
    }
  }
}
function $i(e) {
  if (sn.length) {
    const t = [...new Set(sn)].sort((n, s) => Nn(n) - Nn(s));
    if (((sn.length = 0), Ft)) {
      Ft.push(...t);
      return;
    }
    for (Ft = t, Yt = 0; Yt < Ft.length; Yt++) {
      const n = Ft[Yt];
      (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), (n.flags &= -2));
    }
    ((Ft = null), (Yt = 0));
  }
}
const Nn = (e) => (e.id == null ? (e.flags & 2 ? -1 : 1 / 0) : e.id);
function Vi(e) {
  try {
    for (ht = 0; ht < Be.length; ht++) {
      const t = Be[ht];
      t &&
        !(t.flags & 8) &&
        (t.flags & 4 && (t.flags &= -2),
        Un(t, t.i, t.i ? 15 : 14),
        t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; ht < Be.length; ht++) {
      const t = Be[ht];
      t && (t.flags &= -2);
    }
    ((ht = -1),
      (Be.length = 0),
      $i(),
      (ns = null),
      (Be.length || sn.length) && Vi());
  }
}
let We = null,
  Hi = null;
function ss(e) {
  const t = We;
  return ((We = e), (Hi = (e && e.type.__scopeId) || null), t);
}
function vn(e, t = We, n) {
  if (!t || e._n) return e;
  const s = (...r) => {
    s._d && is(-1);
    const o = ss(t);
    let i;
    try {
      i = e(...r);
    } finally {
      (ss(o), s._d && is(1));
    }
    return i;
  };
  return ((s._n = !0), (s._c = !0), (s._d = !0), s);
}
function ue(e, t) {
  if (We === null) return e;
  const n = Es(We),
    s = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [o, i, l, c = fe] = t[r];
    o &&
      (G(o) && (o = { mounted: o, updated: o }),
      o.deep && xt(i),
      s.push({
        dir: o,
        instance: n,
        value: i,
        oldValue: void 0,
        arg: l,
        modifiers: c,
      }));
  }
  return e;
}
function kt(e, t, n, s) {
  const r = e.dirs,
    o = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const l = r[i];
    o && (l.oldValue = o[i].value);
    let c = l.dir[s];
    c && (Ct(), vt(c, n, 8, [e.el, l, e, t]), Tt());
  }
}
function zn(e, t) {
  if (Le) {
    let n = Le.provides;
    const s = Le.parent && Le.parent.provides;
    (s === n && (n = Le.provides = Object.create(s)), (n[e] = t));
  }
}
function Ze(e, t, n = !1) {
  const s = bl();
  if (s || qt) {
    let r = qt
      ? qt._context.provides
      : s
        ? s.parent == null || s.ce
          ? s.vnode.appContext && s.vnode.appContext.provides
          : s.parent.provides
        : void 0;
    if (r && e in r) return r[e];
    if (arguments.length > 1) return n && G(t) ? t.call(s && s.proxy) : t;
  }
}
function ec() {
  return !!(bl() || qt);
}
const tc = Symbol.for("v-scx"),
  nc = () => Ze(tc);
function wn(e, t, n) {
  return qi(e, t, n);
}
function qi(e, t, n = fe) {
  const { immediate: s, deep: r, flush: o, once: i } = n,
    l = Ne({}, n),
    c = (t && s) || (!t && o !== "post");
  let a;
  if (Dn) {
    if (o === "sync") {
      const _ = nc();
      a = _.__watcherHandles || (_.__watcherHandles = []);
    } else if (!c) {
      const _ = () => {};
      return ((_.stop = _t), (_.resume = _t), (_.pause = _t), _);
    }
  }
  const u = Le;
  l.call = (_, m, y) => vt(_, u, m, y);
  let f = !1;
  (o === "post"
    ? (l.scheduler = (_) => {
        $e(_, u && u.suspense);
      })
    : o !== "sync" &&
      ((f = !0),
      (l.scheduler = (_, m) => {
        m ? _() : Nr(_);
      })),
    (l.augmentJob = (_) => {
      (t && (_.flags |= 4),
        f && ((_.flags |= 2), u && ((_.id = u.uid), (_.i = u))));
    }));
  const h = Qu(e, t, l);
  return (Dn && (a ? a.push(h) : c && h()), h);
}
function sc(e, t, n) {
  const s = this.proxy,
    r = Re(e) ? (e.includes(".") ? Ki(s, e) : () => s[e]) : e.bind(s, s);
  let o;
  G(t) ? (o = t) : ((o = t.handler), (n = t));
  const i = Mn(this),
    l = qi(r, o.bind(s), n);
  return (i(), l);
}
function Ki(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++) s = s[n[r]];
    return s;
  };
}
const rc = Symbol("_vte"),
  oc = (e) => e.__isTeleport,
  ic = Symbol("_leaveCb");
function Ir(e, t) {
  e.shapeFlag & 6 && e.component
    ? ((e.transition = t), Ir(e.component.subTree, t))
    : e.shapeFlag & 128
      ? ((e.ssContent.transition = t.clone(e.ssContent)),
        (e.ssFallback.transition = t.clone(e.ssFallback)))
      : (e.transition = t);
}
function Wi(e, t) {
  return G(e) ? Ne({ name: e.name }, t, { setup: e }) : e;
}
function Gi(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Zr(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const rs = new WeakMap();
function En(e, t, n, s, r = !1) {
  if (V(e)) {
    e.forEach((y, w) => En(y, t && (V(t) ? t[w] : t), n, s, r));
    return;
  }
  if (Rn(s) && !r) {
    s.shapeFlag & 512 &&
      s.type.__asyncResolved &&
      s.component.subTree.component &&
      En(e, t, n, s.component.subTree);
    return;
  }
  const o = s.shapeFlag & 4 ? Es(s.component) : s.el,
    i = r ? null : o,
    { i: l, r: c } = e,
    a = t && t.r,
    u = l.refs === fe ? (l.refs = {}) : l.refs,
    f = l.setupState,
    h = se(f),
    _ = f === fe ? ai : (y) => (Zr(u, y) ? !1 : oe(h, y)),
    m = (y, w) => !(w && Zr(u, w));
  if (a != null && a !== c) {
    if ((eo(t), Re(a))) ((u[a] = null), _(a) && (f[a] = null));
    else if (be(a)) {
      const y = t;
      (m(a, y.k) && (a.value = null), y.k && (u[y.k] = null));
    }
  }
  if (G(c)) Un(c, l, 12, [i, u]);
  else {
    const y = Re(c),
      w = be(c);
    if (y || w) {
      const I = () => {
        if (e.f) {
          const C = y ? (_(c) ? f[c] : u[c]) : m() || !e.k ? c.value : u[e.k];
          if (r) V(C) && br(C, o);
          else if (V(C)) C.includes(o) || C.push(o);
          else if (y) ((u[c] = [o]), _(c) && (f[c] = u[c]));
          else {
            const x = [o];
            (m(c, e.k) && (c.value = x), e.k && (u[e.k] = x));
          }
        } else
          y
            ? ((u[c] = i), _(c) && (f[c] = i))
            : w && (m(c, e.k) && (c.value = i), e.k && (u[e.k] = i));
      };
      if (i) {
        const C = () => {
          (I(), rs.delete(e));
        };
        ((C.id = -1), rs.set(e, C), $e(C, n));
      } else (eo(e), I());
    }
  }
}
function eo(e) {
  const t = rs.get(e);
  t && ((t.flags |= 8), rs.delete(e));
}
ms().requestIdleCallback;
ms().cancelIdleCallback;
const Rn = (e) => !!e.type.__asyncLoader,
  zi = (e) => e.type.__isKeepAlive;
function lc(e, t) {
  Ji(e, "a", t);
}
function uc(e, t) {
  Ji(e, "da", t);
}
function Ji(e, t, n = Le) {
  const s =
    e.__wdc ||
    (e.__wdc = () => {
      let r = n;
      for (; r; ) {
        if (r.isDeactivated) return;
        r = r.parent;
      }
      return e();
    });
  if ((_s(t, s, n), n)) {
    let r = n.parent;
    for (; r && r.parent; )
      (zi(r.parent.vnode) && cc(s, t, n, r), (r = r.parent));
  }
}
function cc(e, t, n, s) {
  const r = _s(t, e, s, !0);
  Qi(() => {
    br(s[t], r);
  }, n);
}
function _s(e, t, n = Le, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...i) => {
          Ct();
          const l = Mn(n),
            c = vt(t, n, e, i);
          return (l(), Tt(), c);
        });
    return (s ? r.unshift(o) : r.push(o), o);
  }
}
const It =
    (e) =>
    (t, n = Le) => {
      (!Dn || e === "sp") && _s(e, (...s) => t(...s), n);
    },
  ac = It("bm"),
  zt = It("m"),
  fc = It("bu"),
  dc = It("u"),
  pc = It("bum"),
  Qi = It("um"),
  hc = It("sp"),
  mc = It("rtg"),
  gc = It("rtc");
function yc(e, t = Le) {
  _s("ec", e, t);
}
const bc = "components";
function Xi(e, t) {
  return vc(bc, e, !0, t) || e;
}
const _c = Symbol.for("v-ndc");
function vc(e, t, n = !0, s = !1) {
  const r = We || Le;
  if (r) {
    const o = r.type;
    {
      const l = ra(o, !1);
      if (l && (l === t || l === je(t) || l === hs(je(t)))) return o;
    }
    const i = to(r[e] || o[e], t) || to(r.appContext[e], t);
    return !i && s ? o : i;
  }
}
function to(e, t) {
  return e && (e[t] || e[je(t)] || e[hs(je(t))]);
}
function bt(e, t, n, s) {
  let r;
  const o = n,
    i = V(e);
  if (i || Re(e)) {
    const l = i && Ot(e);
    let c = !1,
      a = !1;
    (l && ((c = !ze(e)), (a = Nt(e)), (e = gs(e))), (r = new Array(e.length)));
    for (let u = 0, f = e.length; u < f; u++)
      r[u] = t(c ? (a ? rn(rt(e[u])) : rt(e[u])) : e[u], u, void 0, o);
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let l = 0; l < e; l++) r[l] = t(l + 1, l, void 0, o);
  } else if (le(e))
    if (e[Symbol.iterator]) r = Array.from(e, (l, c) => t(l, c, void 0, o));
    else {
      const l = Object.keys(e);
      r = new Array(l.length);
      for (let c = 0, a = l.length; c < a; c++) {
        const u = l[c];
        r[c] = t(e[u], u, c, o);
      }
    }
  else r = [];
  return r;
}
const tr = (e) => (e ? (_l(e) ? Es(e) : tr(e.parent)) : null),
  Sn = Ne(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => tr(e.parent),
    $root: (e) => tr(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Zi(e),
    $forceUpdate: (e) =>
      e.f ||
      (e.f = () => {
        Nr(e.update);
      }),
    $nextTick: (e) => e.n || (e.n = Pr.bind(e.proxy)),
    $watch: (e) => sc.bind(e),
  }),
  Us = (e, t) => e !== fe && !e.__isScriptSetup && oe(e, t),
  wc = {
    get({ _: e }, t) {
      if (t === "__v_skip") return !0;
      const {
        ctx: n,
        setupState: s,
        data: r,
        props: o,
        accessCache: i,
        type: l,
        appContext: c,
      } = e;
      if (t[0] !== "$") {
        const h = i[t];
        if (h !== void 0)
          switch (h) {
            case 1:
              return s[t];
            case 2:
              return r[t];
            case 4:
              return n[t];
            case 3:
              return o[t];
          }
        else {
          if (Us(s, t)) return ((i[t] = 1), s[t]);
          if (r !== fe && oe(r, t)) return ((i[t] = 2), r[t]);
          if (oe(o, t)) return ((i[t] = 3), o[t]);
          if (n !== fe && oe(n, t)) return ((i[t] = 4), n[t]);
          nr && (i[t] = 0);
        }
      }
      const a = Sn[t];
      let u, f;
      if (a) return (t === "$attrs" && De(e.attrs, "get", ""), a(e));
      if ((u = l.__cssModules) && (u = u[t])) return u;
      if (n !== fe && oe(n, t)) return ((i[t] = 4), n[t]);
      if (((f = c.config.globalProperties), oe(f, t))) return f[t];
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: r, ctx: o } = e;
      return Us(r, t)
        ? ((r[t] = n), !0)
        : s !== fe && oe(s, t)
          ? ((s[t] = n), !0)
          : oe(e.props, t) || (t[0] === "$" && t.slice(1) in e)
            ? !1
            : ((o[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: s,
          appContext: r,
          props: o,
          type: i,
        },
      },
      l,
    ) {
      let c;
      return !!(
        n[l] ||
        (e !== fe && l[0] !== "$" && oe(e, l)) ||
        Us(t, l) ||
        oe(o, l) ||
        oe(s, l) ||
        oe(Sn, l) ||
        oe(r.config.globalProperties, l) ||
        ((c = i.__cssModules) && c[l])
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : oe(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
function no(e) {
  return V(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let nr = !0;
function Ec(e) {
  const t = Zi(e),
    n = e.proxy,
    s = e.ctx;
  ((nr = !1), t.beforeCreate && so(t.beforeCreate, e, "bc"));
  const {
    data: r,
    computed: o,
    methods: i,
    watch: l,
    provide: c,
    inject: a,
    created: u,
    beforeMount: f,
    mounted: h,
    beforeUpdate: _,
    updated: m,
    activated: y,
    deactivated: w,
    beforeDestroy: I,
    beforeUnmount: C,
    destroyed: x,
    unmounted: N,
    render: B,
    renderTracked: pe,
    renderTriggered: z,
    errorCaptured: X,
    serverPrefetch: J,
    expose: he,
    inheritAttrs: xe,
    components: Oe,
    directives: we,
    filters: Ue,
  } = t;
  if ((a && Rc(a, s, null), i))
    for (const K in i) {
      const Z = i[K];
      G(Z) && (s[K] = Z.bind(n));
    }
  if (r) {
    const K = r.call(n, n);
    le(K) && (e.data = Pt(K));
  }
  if (((nr = !0), o))
    for (const K in o) {
      const Z = o[K],
        Je = G(Z) ? Z.bind(n, n) : G(Z.get) ? Z.get.bind(n, n) : _t,
        lt = !G(Z) && G(Z.set) ? Z.set.bind(n) : _t,
        Se = Ke({ get: Je, set: lt });
      Object.defineProperty(s, K, {
        enumerable: !0,
        configurable: !0,
        get: () => Se.value,
        set: (_e) => (Se.value = _e),
      });
    }
  if (l) for (const K in l) Yi(l[K], s, n, K);
  if (c) {
    const K = G(c) ? c.call(n) : c;
    Reflect.ownKeys(K).forEach((Z) => {
      zn(Z, K[Z]);
    });
  }
  u && so(u, e, "c");
  function Y(K, Z) {
    V(Z) ? Z.forEach((Je) => K(Je.bind(n))) : Z && K(Z.bind(n));
  }
  if (
    (Y(ac, f),
    Y(zt, h),
    Y(fc, _),
    Y(dc, m),
    Y(lc, y),
    Y(uc, w),
    Y(yc, X),
    Y(gc, pe),
    Y(mc, z),
    Y(pc, C),
    Y(Qi, N),
    Y(hc, J),
    V(he))
  )
    if (he.length) {
      const K = e.exposed || (e.exposed = {});
      he.forEach((Z) => {
        Object.defineProperty(K, Z, {
          get: () => n[Z],
          set: (Je) => (n[Z] = Je),
          enumerable: !0,
        });
      });
    } else e.exposed || (e.exposed = {});
  (B && e.render === _t && (e.render = B),
    xe != null && (e.inheritAttrs = xe),
    Oe && (e.components = Oe),
    we && (e.directives = we),
    J && Gi(e));
}
function Rc(e, t, n = _t) {
  V(e) && (e = sr(e));
  for (const s in e) {
    const r = e[s];
    let o;
    (le(r)
      ? "default" in r
        ? (o = Ze(r.from || s, r.default, !0))
        : (o = Ze(r.from || s))
      : (o = Ze(r)),
      be(o)
        ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (i) => (o.value = i),
          })
        : (t[s] = o));
  }
}
function so(e, t, n) {
  vt(V(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Yi(e, t, n, s) {
  let r = s.includes(".") ? Ki(n, s) : () => n[s];
  if (Re(e)) {
    const o = t[e];
    G(o) && wn(r, o);
  } else if (G(e)) wn(r, e.bind(n));
  else if (le(e))
    if (V(e)) e.forEach((o) => Yi(o, t, n, s));
    else {
      const o = G(e.handler) ? e.handler.bind(n) : t[e.handler];
      G(o) && wn(r, o, e);
    }
}
function Zi(e) {
  const t = e.type,
    { mixins: n, extends: s } = t,
    {
      mixins: r,
      optionsCache: o,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    l = o.get(t);
  let c;
  return (
    l
      ? (c = l)
      : !r.length && !n && !s
        ? (c = t)
        : ((c = {}),
          r.length && r.forEach((a) => os(c, a, i, !0)),
          os(c, t, i)),
    le(t) && o.set(t, c),
    c
  );
}
function os(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  (o && os(e, o, n, !0), r && r.forEach((i) => os(e, i, n, !0)));
  for (const i in t)
    if (!(s && i === "expose")) {
      const l = Sc[i] || (n && n[i]);
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const Sc = {
  data: ro,
  props: oo,
  emits: oo,
  methods: gn,
  computed: gn,
  beforeCreate: Me,
  created: Me,
  beforeMount: Me,
  mounted: Me,
  beforeUpdate: Me,
  updated: Me,
  beforeDestroy: Me,
  beforeUnmount: Me,
  destroyed: Me,
  unmounted: Me,
  activated: Me,
  deactivated: Me,
  errorCaptured: Me,
  serverPrefetch: Me,
  components: gn,
  directives: gn,
  watch: xc,
  provide: ro,
  inject: Ac,
};
function ro(e, t) {
  return t
    ? e
      ? function () {
          return Ne(
            G(e) ? e.call(this, this) : e,
            G(t) ? t.call(this, this) : t,
          );
        }
      : t
    : e;
}
function Ac(e, t) {
  return gn(sr(e), sr(t));
}
function sr(e) {
  if (V(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Me(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function gn(e, t) {
  return e ? Ne(Object.create(null), e, t) : t;
}
function oo(e, t) {
  return e
    ? V(e) && V(t)
      ? [...new Set([...e, ...t])]
      : Ne(Object.create(null), no(e), no(t ?? {}))
    : t;
}
function xc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Ne(Object.create(null), e);
  for (const s in t) n[s] = Me(e[s], t[s]);
  return n;
}
function el() {
  return {
    app: null,
    config: {
      isNativeTag: ai,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let Oc = 0;
function Cc(e, t) {
  return function (s, r = null) {
    (G(s) || (s = Ne({}, s)), r != null && !le(r) && (r = null));
    const o = el(),
      i = new WeakSet(),
      l = [];
    let c = !1;
    const a = (o.app = {
      _uid: Oc++,
      _component: s,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: ia,
      get config() {
        return o.config;
      },
      set config(u) {},
      use(u, ...f) {
        return (
          i.has(u) ||
            (u && G(u.install)
              ? (i.add(u), u.install(a, ...f))
              : G(u) && (i.add(u), u(a, ...f))),
          a
        );
      },
      mixin(u) {
        return (o.mixins.includes(u) || o.mixins.push(u), a);
      },
      component(u, f) {
        return f ? ((o.components[u] = f), a) : o.components[u];
      },
      directive(u, f) {
        return f ? ((o.directives[u] = f), a) : o.directives[u];
      },
      mount(u, f, h) {
        if (!c) {
          const _ = a._ceVNode || Ce(s, r);
          return (
            (_.appContext = o),
            h === !0 ? (h = "svg") : h === !1 && (h = void 0),
            e(_, u, h),
            (c = !0),
            (a._container = u),
            (u.__vue_app__ = a),
            Es(_.component)
          );
        }
      },
      onUnmount(u) {
        l.push(u);
      },
      unmount() {
        c &&
          (vt(l, a._instance, 16),
          e(null, a._container),
          delete a._container.__vue_app__);
      },
      provide(u, f) {
        return ((o.provides[u] = f), a);
      },
      runWithContext(u) {
        const f = qt;
        qt = a;
        try {
          return u();
        } finally {
          qt = f;
        }
      },
    });
    return a;
  };
}
let qt = null;
const Tc = (e, t) =>
  t === "modelValue" || t === "model-value"
    ? e.modelModifiers
    : e[`${t}Modifiers`] || e[`${je(t)}Modifiers`] || e[`${Gt(t)}Modifiers`];
function Pc(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || fe;
  let r = n;
  const o = t.startsWith("update:"),
    i = o && Tc(s, t.slice(7));
  i &&
    (i.trim && (r = n.map((u) => (Re(u) ? u.trim() : u))),
    i.number && (r = n.map(_r)));
  let l,
    c = s[(l = Ns(t))] || s[(l = Ns(je(t)))];
  (!c && o && (c = s[(l = Ns(Gt(t)))]), c && vt(c, e, 6, r));
  const a = s[l + "Once"];
  if (a) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    ((e.emitted[l] = !0), vt(a, e, 6, r));
  }
}
const Nc = new WeakMap();
function tl(e, t, n = !1) {
  const s = n ? Nc : t.emitsCache,
    r = s.get(e);
  if (r !== void 0) return r;
  const o = e.emits;
  let i = {},
    l = !1;
  if (!G(e)) {
    const c = (a) => {
      const u = tl(a, t, !0);
      u && ((l = !0), Ne(i, u));
    };
    (!n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c));
  }
  return !o && !l
    ? (le(e) && s.set(e, null), null)
    : (V(o) ? o.forEach((c) => (i[c] = null)) : Ne(i, o),
      le(e) && s.set(e, i),
      i);
}
function vs(e, t) {
  return !e || !as(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      oe(e, t[0].toLowerCase() + t.slice(1)) || oe(e, Gt(t)) || oe(e, t));
}
function io(e) {
  const {
      type: t,
      vnode: n,
      proxy: s,
      withProxy: r,
      propsOptions: [o],
      slots: i,
      attrs: l,
      emit: c,
      render: a,
      renderCache: u,
      props: f,
      data: h,
      setupState: _,
      ctx: m,
      inheritAttrs: y,
    } = e,
    w = ss(e);
  let I, C;
  try {
    if (n.shapeFlag & 4) {
      const N = r || s,
        B = N;
      ((I = gt(a.call(B, N, u, f, _, h, m))), (C = l));
    } else {
      const N = t;
      ((I = gt(
        N.length > 1 ? N(f, { attrs: l, slots: i, emit: c }) : N(f, null),
      )),
        (C = t.props ? l : Ic(l)));
    }
  } catch (N) {
    ((An.length = 0), bs(N, e, 1), (I = Ce(Mt)));
  }
  let x = I;
  if (C && y !== !1) {
    const N = Object.keys(C),
      { shapeFlag: B } = x;
    N.length &&
      B & 7 &&
      (o && N.some(fs) && (C = Dc(C, o)), (x = on(x, C, !1, !0)));
  }
  return (
    n.dirs &&
      ((x = on(x, null, !1, !0)),
      (x.dirs = x.dirs ? x.dirs.concat(n.dirs) : n.dirs)),
    n.transition && Ir(x, n.transition),
    (I = x),
    ss(w),
    I
  );
}
const Ic = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || as(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  Dc = (e, t) => {
    const n = {};
    for (const s in e) (!fs(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
    return n;
  };
function Lc(e, t, n) {
  const { props: s, children: r, component: o } = e,
    { props: i, children: l, patchFlag: c } = t,
    a = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && c >= 0) {
    if (c & 1024) return !0;
    if (c & 16) return s ? lo(s, i, a) : !!i;
    if (c & 8) {
      const u = t.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        const h = u[f];
        if (nl(i, s, h) && !vs(a, h)) return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable)
      ? !0
      : s === i
        ? !1
        : s
          ? i
            ? lo(s, i, a)
            : !0
          : !!i;
  return !1;
}
function lo(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length) return !0;
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    if (nl(t, e, o) && !vs(n, o)) return !0;
  }
  return !1;
}
function nl(e, t, n) {
  const s = e[n],
    r = t[n];
  return n === "style" && le(s) && le(r) ? !Er(s, r) : s !== r;
}
function Fc({ vnode: e, parent: t, suspense: n }, s) {
  for (; t; ) {
    const r = t.subTree;
    if (
      (r.suspense &&
        r.suspense.activeBranch === e &&
        ((r.suspense.vnode.el = r.el = s), (e = r)),
      r === e)
    )
      (((e = t.vnode).el = s), (t = t.parent));
    else break;
  }
  n && n.activeBranch === e && (n.vnode.el = s);
}
const sl = {},
  rl = () => Object.create(sl),
  ol = (e) => Object.getPrototypeOf(e) === sl;
function Uc(e, t, n, s = !1) {
  const r = {},
    o = rl();
  ((e.propsDefaults = Object.create(null)), il(e, t, r, o));
  for (const i in e.propsOptions[0]) i in r || (r[i] = void 0);
  (n ? (e.props = s ? r : Ui(r)) : e.type.props ? (e.props = r) : (e.props = o),
    (e.attrs = o));
}
function Mc(e, t, n, s) {
  const {
      props: r,
      attrs: o,
      vnode: { patchFlag: i },
    } = e,
    l = se(r),
    [c] = e.propsOptions;
  let a = !1;
  if ((s || i > 0) && !(i & 16)) {
    if (i & 8) {
      const u = e.vnode.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        let h = u[f];
        if (vs(e.emitsOptions, h)) continue;
        const _ = t[h];
        if (c)
          if (oe(o, h)) _ !== o[h] && ((o[h] = _), (a = !0));
          else {
            const m = je(h);
            r[m] = rr(c, l, m, _, e, !1);
          }
        else _ !== o[h] && ((o[h] = _), (a = !0));
      }
    }
  } else {
    il(e, t, r, o) && (a = !0);
    let u;
    for (const f in l)
      (!t || (!oe(t, f) && ((u = Gt(f)) === f || !oe(t, u)))) &&
        (c
          ? n &&
            (n[f] !== void 0 || n[u] !== void 0) &&
            (r[f] = rr(c, l, f, void 0, e, !0))
          : delete r[f]);
    if (o !== l)
      for (const f in o) (!t || !oe(t, f)) && (delete o[f], (a = !0));
  }
  a && At(e.attrs, "set", "");
}
function il(e, t, n, s) {
  const [r, o] = e.propsOptions;
  let i = !1,
    l;
  if (t)
    for (let c in t) {
      if (yn(c)) continue;
      const a = t[c];
      let u;
      r && oe(r, (u = je(c)))
        ? !o || !o.includes(u)
          ? (n[u] = a)
          : ((l || (l = {}))[u] = a)
        : vs(e.emitsOptions, c) ||
          ((!(c in s) || a !== s[c]) && ((s[c] = a), (i = !0)));
    }
  if (o) {
    const c = se(n),
      a = l || fe;
    for (let u = 0; u < o.length; u++) {
      const f = o[u];
      n[f] = rr(r, c, f, a[f], e, !oe(a, f));
    }
  }
  return i;
}
function rr(e, t, n, s, r, o) {
  const i = e[n];
  if (i != null) {
    const l = oe(i, "default");
    if (l && s === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && G(c)) {
        const { propsDefaults: a } = r;
        if (n in a) s = a[n];
        else {
          const u = Mn(r);
          ((s = a[n] = c.call(null, t)), u());
        }
      } else s = c;
      r.ce && r.ce._setProp(n, s);
    }
    i[0] &&
      (o && !l ? (s = !1) : i[1] && (s === "" || s === Gt(n)) && (s = !0));
  }
  return s;
}
const kc = new WeakMap();
function ll(e, t, n = !1) {
  const s = n ? kc : t.propsCache,
    r = s.get(e);
  if (r) return r;
  const o = e.props,
    i = {},
    l = [];
  let c = !1;
  if (!G(e)) {
    const u = (f) => {
      c = !0;
      const [h, _] = ll(f, t, !0);
      (Ne(i, h), _ && l.push(..._));
    };
    (!n && t.mixins.length && t.mixins.forEach(u),
      e.extends && u(e.extends),
      e.mixins && e.mixins.forEach(u));
  }
  if (!o && !c) return (le(e) && s.set(e, tn), tn);
  if (V(o))
    for (let u = 0; u < o.length; u++) {
      const f = je(o[u]);
      uo(f) && (i[f] = fe);
    }
  else if (o)
    for (const u in o) {
      const f = je(u);
      if (uo(f)) {
        const h = o[u],
          _ = (i[f] = V(h) || G(h) ? { type: h } : Ne({}, h)),
          m = _.type;
        let y = !1,
          w = !0;
        if (V(m))
          for (let I = 0; I < m.length; ++I) {
            const C = m[I],
              x = G(C) && C.name;
            if (x === "Boolean") {
              y = !0;
              break;
            } else x === "String" && (w = !1);
          }
        else y = G(m) && m.name === "Boolean";
        ((_[0] = y), (_[1] = w), (y || oe(_, "default")) && l.push(f));
      }
    }
  const a = [i, l];
  return (le(e) && s.set(e, a), a);
}
function uo(e) {
  return e[0] !== "$" && !yn(e);
}
const Dr = (e) => e === "_" || e === "_ctx" || e === "$stable",
  Lr = (e) => (V(e) ? e.map(gt) : [gt(e)]),
  Bc = (e, t, n) => {
    if (t._n) return t;
    const s = vn((...r) => Lr(t(...r)), n);
    return ((s._c = !1), s);
  },
  ul = (e, t, n) => {
    const s = e._ctx;
    for (const r in e) {
      if (Dr(r)) continue;
      const o = e[r];
      if (G(o)) t[r] = Bc(r, o, s);
      else if (o != null) {
        const i = Lr(o);
        t[r] = () => i;
      }
    }
  },
  cl = (e, t) => {
    const n = Lr(t);
    e.slots.default = () => n;
  },
  al = (e, t, n) => {
    for (const s in t) (n || !Dr(s)) && (e[s] = t[s]);
  },
  jc = (e, t, n) => {
    const s = (e.slots = rl());
    if (e.vnode.shapeFlag & 32) {
      const r = t._;
      r ? (al(s, t, n), n && mi(s, "_", r, !0)) : ul(t, s);
    } else t && cl(e, t);
  },
  $c = (e, t, n) => {
    const { vnode: s, slots: r } = e;
    let o = !0,
      i = fe;
    if (s.shapeFlag & 32) {
      const l = t._;
      (l
        ? n && l === 1
          ? (o = !1)
          : al(r, t, n)
        : ((o = !t.$stable), ul(t, r)),
        (i = t));
    } else t && (cl(e, t), (i = { default: 1 }));
    if (o) for (const l in r) !Dr(l) && i[l] == null && delete r[l];
  },
  $e = Wc;
function Vc(e) {
  return Hc(e);
}
function Hc(e, t) {
  const n = ms();
  n.__VUE__ = !0;
  const {
      insert: s,
      remove: r,
      patchProp: o,
      createElement: i,
      createText: l,
      createComment: c,
      setText: a,
      setElementText: u,
      parentNode: f,
      nextSibling: h,
      setScopeId: _ = _t,
      insertStaticContent: m,
    } = e,
    y = (
      d,
      p,
      b,
      E = null,
      A = null,
      R = null,
      D = void 0,
      P = null,
      T = !!p.dynamicChildren,
    ) => {
      if (d === p) return;
      (d && !pn(d, p) && ((E = S(d)), _e(d, A, R, !0), (d = null)),
        p.patchFlag === -2 && ((T = !1), (p.dynamicChildren = null)));
      const { type: O, ref: j, shapeFlag: F } = p;
      switch (O) {
        case ws:
          w(d, p, b, E);
          break;
        case Mt:
          I(d, p, b, E);
          break;
        case ks:
          d == null && C(p, b, E, D);
          break;
        case de:
          Oe(d, p, b, E, A, R, D, P, T);
          break;
        default:
          F & 1
            ? B(d, p, b, E, A, R, D, P, T)
            : F & 6
              ? we(d, p, b, E, A, R, D, P, T)
              : (F & 64 || F & 128) && O.process(d, p, b, E, A, R, D, P, T, M);
      }
      j != null && A
        ? En(j, d && d.ref, R, p || d, !p)
        : j == null && d && d.ref != null && En(d.ref, null, R, d, !0);
    },
    w = (d, p, b, E) => {
      if (d == null) s((p.el = l(p.children)), b, E);
      else {
        const A = (p.el = d.el);
        p.children !== d.children && a(A, p.children);
      }
    },
    I = (d, p, b, E) => {
      d == null ? s((p.el = c(p.children || "")), b, E) : (p.el = d.el);
    },
    C = (d, p, b, E) => {
      [d.el, d.anchor] = m(d.children, p, b, E, d.el, d.anchor);
    },
    x = ({ el: d, anchor: p }, b, E) => {
      let A;
      for (; d && d !== p; ) ((A = h(d)), s(d, b, E), (d = A));
      s(p, b, E);
    },
    N = ({ el: d, anchor: p }) => {
      let b;
      for (; d && d !== p; ) ((b = h(d)), r(d), (d = b));
      r(p);
    },
    B = (d, p, b, E, A, R, D, P, T) => {
      if (
        (p.type === "svg" ? (D = "svg") : p.type === "math" && (D = "mathml"),
        d == null)
      )
        pe(p, b, E, A, R, D, P, T);
      else {
        const O = d.el && d.el._isVueCE ? d.el : null;
        try {
          (O && O._beginPatch(), J(d, p, A, R, D, P, T));
        } finally {
          O && O._endPatch();
        }
      }
    },
    pe = (d, p, b, E, A, R, D, P) => {
      let T, O;
      const { props: j, shapeFlag: F, transition: k, dirs: H } = d;
      if (
        ((T = d.el = i(d.type, R, j && j.is, j)),
        F & 8
          ? u(T, d.children)
          : F & 16 && X(d.children, T, null, E, A, Ms(d, R), D, P),
        H && kt(d, null, E, "created"),
        z(T, d, d.scopeId, D, E),
        j)
      ) {
        for (const ae in j)
          ae !== "value" && !yn(ae) && o(T, ae, null, j[ae], R, E);
        ("value" in j && o(T, "value", null, j.value, R),
          (O = j.onVnodeBeforeMount) && pt(O, E, d));
      }
      H && kt(d, null, E, "beforeMount");
      const ne = qc(A, k);
      (ne && k.beforeEnter(T),
        s(T, p, b),
        ((O = j && j.onVnodeMounted) || ne || H) &&
          $e(() => {
            try {
              (O && pt(O, E, d),
                ne && k.enter(T),
                H && kt(d, null, E, "mounted"));
            } finally {
            }
          }, A));
    },
    z = (d, p, b, E, A) => {
      if ((b && _(d, b), E)) for (let R = 0; R < E.length; R++) _(d, E[R]);
      if (A) {
        let R = A.subTree;
        if (
          p === R ||
          (hl(R.type) && (R.ssContent === p || R.ssFallback === p))
        ) {
          const D = A.vnode;
          z(d, D, D.scopeId, D.slotScopeIds, A.parent);
        }
      }
    },
    X = (d, p, b, E, A, R, D, P, T = 0) => {
      for (let O = T; O < d.length; O++) {
        const j = (d[O] = P ? St(d[O]) : gt(d[O]));
        y(null, j, p, b, E, A, R, D, P);
      }
    },
    J = (d, p, b, E, A, R, D) => {
      const P = (p.el = d.el);
      let { patchFlag: T, dynamicChildren: O, dirs: j } = p;
      T |= d.patchFlag & 16;
      const F = d.props || fe,
        k = p.props || fe;
      let H;
      if (
        (b && Bt(b, !1),
        (H = k.onVnodeBeforeUpdate) && pt(H, b, p, d),
        j && kt(p, d, b, "beforeUpdate"),
        b && Bt(b, !0),
        ((F.innerHTML && k.innerHTML == null) ||
          (F.textContent && k.textContent == null)) &&
          u(P, ""),
        O
          ? he(d.dynamicChildren, O, P, b, E, Ms(p, A), R)
          : D || Z(d, p, P, null, b, E, Ms(p, A), R, !1),
        T > 0)
      ) {
        if (T & 16) xe(P, F, k, b, A);
        else if (
          (T & 2 && F.class !== k.class && o(P, "class", null, k.class, A),
          T & 4 && o(P, "style", F.style, k.style, A),
          T & 8)
        ) {
          const ne = p.dynamicProps;
          for (let ae = 0; ae < ne.length; ae++) {
            const me = ne[ae],
              Ee = F[me],
              Te = k[me];
            (Te !== Ee || me === "value") && o(P, me, Ee, Te, A, b);
          }
        }
        T & 1 && d.children !== p.children && u(P, p.children);
      } else !D && O == null && xe(P, F, k, b, A);
      ((H = k.onVnodeUpdated) || j) &&
        $e(() => {
          (H && pt(H, b, p, d), j && kt(p, d, b, "updated"));
        }, E);
    },
    he = (d, p, b, E, A, R, D) => {
      for (let P = 0; P < p.length; P++) {
        const T = d[P],
          O = p[P],
          j =
            T.el && (T.type === de || !pn(T, O) || T.shapeFlag & 198)
              ? f(T.el)
              : b;
        y(T, O, j, null, E, A, R, D, !0);
      }
    },
    xe = (d, p, b, E, A) => {
      if (p !== b) {
        if (p !== fe)
          for (const R in p) !yn(R) && !(R in b) && o(d, R, p[R], null, A, E);
        for (const R in b) {
          if (yn(R)) continue;
          const D = b[R],
            P = p[R];
          D !== P && R !== "value" && o(d, R, P, D, A, E);
        }
        "value" in b && o(d, "value", p.value, b.value, A);
      }
    },
    Oe = (d, p, b, E, A, R, D, P, T) => {
      const O = (p.el = d ? d.el : l("")),
        j = (p.anchor = d ? d.anchor : l(""));
      let { patchFlag: F, dynamicChildren: k, slotScopeIds: H } = p;
      (H && (P = P ? P.concat(H) : H),
        d == null
          ? (s(O, b, E), s(j, b, E), X(p.children || [], b, j, A, R, D, P, T))
          : F > 0 &&
              F & 64 &&
              k &&
              d.dynamicChildren &&
              d.dynamicChildren.length === k.length
            ? (he(d.dynamicChildren, k, b, A, R, D, P),
              (p.key != null || (A && p === A.subTree)) && fl(d, p, !0))
            : Z(d, p, b, j, A, R, D, P, T));
    },
    we = (d, p, b, E, A, R, D, P, T) => {
      ((p.slotScopeIds = P),
        d == null
          ? p.shapeFlag & 512
            ? A.ctx.activate(p, b, E, D, T)
            : Ue(p, b, E, A, R, D, T)
          : tt(d, p, T));
    },
    Ue = (d, p, b, E, A, R, D) => {
      const P = (d.component = Zc(d, E, A));
      if ((zi(d) && (P.ctx.renderer = M), ea(P, !1, D), P.asyncDep)) {
        if ((A && A.registerDep(P, Y, D), !d.el)) {
          const T = (P.subTree = Ce(Mt));
          (I(null, T, p, b), (d.placeholder = T.el));
        }
      } else Y(P, d, p, b, A, R, D);
    },
    tt = (d, p, b) => {
      const E = (p.component = d.component);
      if (Lc(d, p, b))
        if (E.asyncDep && !E.asyncResolved) {
          K(E, p, b);
          return;
        } else ((E.next = p), E.update());
      else ((p.el = d.el), (E.vnode = p));
    },
    Y = (d, p, b, E, A, R, D) => {
      const P = () => {
        if (d.isMounted) {
          let { next: F, bu: k, u: H, parent: ne, vnode: ae } = d;
          {
            const ft = dl(d);
            if (ft) {
              (F && ((F.el = ae.el), K(d, F, D)),
                ft.asyncDep.then(() => {
                  $e(() => {
                    d.isUnmounted || O();
                  }, A);
                }));
              return;
            }
          }
          let me = F,
            Ee;
          (Bt(d, !1),
            F ? ((F.el = ae.el), K(d, F, D)) : (F = ae),
            k && Gn(k),
            (Ee = F.props && F.props.onVnodeBeforeUpdate) && pt(Ee, ne, F, ae),
            Bt(d, !0));
          const Te = io(d),
            at = d.subTree;
          ((d.subTree = Te),
            y(at, Te, f(at.el), S(at), d, A, R),
            (F.el = Te.el),
            me === null && Fc(d, Te.el),
            H && $e(H, A),
            (Ee = F.props && F.props.onVnodeUpdated) &&
              $e(() => pt(Ee, ne, F, ae), A));
        } else {
          let F;
          const { el: k, props: H } = p,
            { bm: ne, m: ae, parent: me, root: Ee, type: Te } = d,
            at = Rn(p);
          (Bt(d, !1),
            ne && Gn(ne),
            !at && (F = H && H.onVnodeBeforeMount) && pt(F, me, p),
            Bt(d, !0));
          {
            Ee.ce &&
              Ee.ce._hasShadowRoot() &&
              Ee.ce._injectChildStyle(Te, d.parent ? d.parent.type : void 0);
            const ft = (d.subTree = io(d));
            (y(null, ft, b, E, d, A, R), (p.el = ft.el));
          }
          if ((ae && $e(ae, A), !at && (F = H && H.onVnodeMounted))) {
            const ft = p;
            $e(() => pt(F, me, ft), A);
          }
          ((p.shapeFlag & 256 ||
            (me && Rn(me.vnode) && me.vnode.shapeFlag & 256)) &&
            d.a &&
            $e(d.a, A),
            (d.isMounted = !0),
            (p = b = E = null));
        }
      };
      d.scope.on();
      const T = (d.effect = new Ei(P));
      d.scope.off();
      const O = (d.update = T.run.bind(T)),
        j = (d.job = T.runIfDirty.bind(T));
      ((j.i = d), (j.id = d.uid), (T.scheduler = () => Nr(j)), Bt(d, !0), O());
    },
    K = (d, p, b) => {
      p.component = d;
      const E = d.vnode.props;
      ((d.vnode = p),
        (d.next = null),
        Mc(d, p.props, E, b),
        $c(d, p.children, b),
        Ct(),
        Yr(d),
        Tt());
    },
    Z = (d, p, b, E, A, R, D, P, T = !1) => {
      const O = d && d.children,
        j = d ? d.shapeFlag : 0,
        F = p.children,
        { patchFlag: k, shapeFlag: H } = p;
      if (k > 0) {
        if (k & 128) {
          lt(O, F, b, E, A, R, D, P, T);
          return;
        } else if (k & 256) {
          Je(O, F, b, E, A, R, D, P, T);
          return;
        }
      }
      H & 8
        ? (j & 16 && Qe(O, A, R), F !== O && u(b, F))
        : j & 16
          ? H & 16
            ? lt(O, F, b, E, A, R, D, P, T)
            : Qe(O, A, R, !0)
          : (j & 8 && u(b, ""), H & 16 && X(F, b, E, A, R, D, P, T));
    },
    Je = (d, p, b, E, A, R, D, P, T) => {
      ((d = d || tn), (p = p || tn));
      const O = d.length,
        j = p.length,
        F = Math.min(O, j);
      let k;
      for (k = 0; k < F; k++) {
        const H = (p[k] = T ? St(p[k]) : gt(p[k]));
        y(d[k], H, b, null, A, R, D, P, T);
      }
      O > j ? Qe(d, A, R, !0, !1, F) : X(p, b, E, A, R, D, P, T, F);
    },
    lt = (d, p, b, E, A, R, D, P, T) => {
      let O = 0;
      const j = p.length;
      let F = d.length - 1,
        k = j - 1;
      for (; O <= F && O <= k; ) {
        const H = d[O],
          ne = (p[O] = T ? St(p[O]) : gt(p[O]));
        if (pn(H, ne)) y(H, ne, b, null, A, R, D, P, T);
        else break;
        O++;
      }
      for (; O <= F && O <= k; ) {
        const H = d[F],
          ne = (p[k] = T ? St(p[k]) : gt(p[k]));
        if (pn(H, ne)) y(H, ne, b, null, A, R, D, P, T);
        else break;
        (F--, k--);
      }
      if (O > F) {
        if (O <= k) {
          const H = k + 1,
            ne = H < j ? p[H].el : E;
          for (; O <= k; )
            (y(null, (p[O] = T ? St(p[O]) : gt(p[O])), b, ne, A, R, D, P, T),
              O++);
        }
      } else if (O > k) for (; O <= F; ) (_e(d[O], A, R, !0), O++);
      else {
        const H = O,
          ne = O,
          ae = new Map();
        for (O = ne; O <= k; O++) {
          const qe = (p[O] = T ? St(p[O]) : gt(p[O]));
          qe.key != null && ae.set(qe.key, O);
        }
        let me,
          Ee = 0;
        const Te = k - ne + 1;
        let at = !1,
          ft = 0;
        const fn = new Array(Te);
        for (O = 0; O < Te; O++) fn[O] = 0;
        for (O = H; O <= F; O++) {
          const qe = d[O];
          if (Ee >= Te) {
            _e(qe, A, R, !0);
            continue;
          }
          let dt;
          if (qe.key != null) dt = ae.get(qe.key);
          else
            for (me = ne; me <= k; me++)
              if (fn[me - ne] === 0 && pn(qe, p[me])) {
                dt = me;
                break;
              }
          dt === void 0
            ? _e(qe, A, R, !0)
            : ((fn[dt - ne] = O + 1),
              dt >= ft ? (ft = dt) : (at = !0),
              y(qe, p[dt], b, null, A, R, D, P, T),
              Ee++);
        }
        const Kr = at ? Kc(fn) : tn;
        for (me = Kr.length - 1, O = Te - 1; O >= 0; O--) {
          const qe = ne + O,
            dt = p[qe],
            Wr = p[qe + 1],
            Gr = qe + 1 < j ? Wr.el || pl(Wr) : E;
          fn[O] === 0
            ? y(null, dt, b, Gr, A, R, D, P, T)
            : at && (me < 0 || O !== Kr[me] ? Se(dt, b, Gr, 2) : me--);
        }
      }
    },
    Se = (d, p, b, E, A = null) => {
      const { el: R, type: D, transition: P, children: T, shapeFlag: O } = d;
      if (O & 6) {
        Se(d.component.subTree, p, b, E);
        return;
      }
      if (O & 128) {
        d.suspense.move(p, b, E);
        return;
      }
      if (O & 64) {
        D.move(d, p, b, M);
        return;
      }
      if (D === de) {
        s(R, p, b);
        for (let F = 0; F < T.length; F++) Se(T[F], p, b, E);
        s(d.anchor, p, b);
        return;
      }
      if (D === ks) {
        x(d, p, b);
        return;
      }
      if (E !== 2 && O & 1 && P)
        if (E === 0) (P.beforeEnter(R), s(R, p, b), $e(() => P.enter(R), A));
        else {
          const { leave: F, delayLeave: k, afterLeave: H } = P,
            ne = () => {
              d.ctx.isUnmounted ? r(R) : s(R, p, b);
            },
            ae = () => {
              (R._isLeaving && R[ic](!0),
                F(R, () => {
                  (ne(), H && H());
                }));
            };
          k ? k(R, ne, ae) : ae();
        }
      else s(R, p, b);
    },
    _e = (d, p, b, E = !1, A = !1) => {
      const {
        type: R,
        props: D,
        ref: P,
        children: T,
        dynamicChildren: O,
        shapeFlag: j,
        patchFlag: F,
        dirs: k,
        cacheIndex: H,
        memo: ne,
      } = d;
      if (
        (F === -2 && (A = !1),
        P != null && (Ct(), En(P, null, b, d, !0), Tt()),
        H != null && (p.renderCache[H] = void 0),
        j & 256)
      ) {
        p.ctx.deactivate(d);
        return;
      }
      const ae = j & 1 && k,
        me = !Rn(d);
      let Ee;
      if ((me && (Ee = D && D.onVnodeBeforeUnmount) && pt(Ee, p, d), j & 6))
        ct(d.component, b, E);
      else {
        if (j & 128) {
          d.suspense.unmount(b, E);
          return;
        }
        (ae && kt(d, null, p, "beforeUnmount"),
          j & 64
            ? d.type.remove(d, p, b, M, E)
            : O && !O.hasOnce && (R !== de || (F > 0 && F & 64))
              ? Qe(O, p, b, !1, !0)
              : ((R === de && F & 384) || (!A && j & 16)) && Qe(T, p, b),
          E && ut(d));
      }
      const Te = ne != null && H == null;
      ((me && (Ee = D && D.onVnodeUnmounted)) || ae || Te) &&
        $e(() => {
          (Ee && pt(Ee, p, d),
            ae && kt(d, null, p, "unmounted"),
            Te && (d.el = null));
        }, b);
    },
    ut = (d) => {
      const { type: p, el: b, anchor: E, transition: A } = d;
      if (p === de) {
        nt(b, E);
        return;
      }
      if (p === ks) {
        N(d);
        return;
      }
      const R = () => {
        (r(b), A && !A.persisted && A.afterLeave && A.afterLeave());
      };
      if (d.shapeFlag & 1 && A && !A.persisted) {
        const { leave: D, delayLeave: P } = A,
          T = () => D(b, R);
        P ? P(d.el, R, T) : T();
      } else R();
    },
    nt = (d, p) => {
      let b;
      for (; d !== p; ) ((b = h(d)), r(d), (d = b));
      r(p);
    },
    ct = (d, p, b) => {
      const { bum: E, scope: A, job: R, subTree: D, um: P, m: T, a: O } = d;
      (co(T),
        co(O),
        E && Gn(E),
        A.stop(),
        R && ((R.flags |= 8), _e(D, d, p, b)),
        P && $e(P, p),
        $e(() => {
          d.isUnmounted = !0;
        }, p));
    },
    Qe = (d, p, b, E = !1, A = !1, R = 0) => {
      for (let D = R; D < d.length; D++) _e(d[D], p, b, E, A);
    },
    S = (d) => {
      if (d.shapeFlag & 6) return S(d.component.subTree);
      if (d.shapeFlag & 128) return d.suspense.next();
      const p = h(d.anchor || d.el),
        b = p && p[rc];
      return b ? h(b) : p;
    };
  let U = !1;
  const L = (d, p, b) => {
      let E;
      (d == null
        ? p._vnode && (_e(p._vnode, null, null, !0), (E = p._vnode.component))
        : y(p._vnode || null, d, p, null, null, null, b),
        (p._vnode = d),
        U || ((U = !0), Yr(E), $i(), (U = !1)));
    },
    M = {
      p: y,
      um: _e,
      m: Se,
      r: ut,
      mt: Ue,
      mc: X,
      pc: Z,
      pbc: he,
      n: S,
      o: e,
    };
  return { render: L, hydrate: void 0, createApp: Cc(L) };
}
function Ms({ type: e, props: t }, n) {
  return (n === "svg" && e === "foreignObject") ||
    (n === "mathml" &&
      e === "annotation-xml" &&
      t &&
      t.encoding &&
      t.encoding.includes("html"))
    ? void 0
    : n;
}
function Bt({ effect: e, job: t }, n) {
  n ? ((e.flags |= 32), (t.flags |= 4)) : ((e.flags &= -33), (t.flags &= -5));
}
function qc(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
}
function fl(e, t, n = !1) {
  const s = e.children,
    r = t.children;
  if (V(s) && V(r))
    for (let o = 0; o < s.length; o++) {
      const i = s[o];
      let l = r[o];
      (l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = r[o] = St(r[o])), (l.el = i.el)),
        !n && l.patchFlag !== -2 && fl(i, l)),
        l.type === ws &&
          (l.patchFlag === -1 && (l = r[o] = St(l)), (l.el = i.el)),
        l.type === Mt && !l.el && (l.el = i.el));
    }
}
function Kc(e) {
  const t = e.slice(),
    n = [0];
  let s, r, o, i, l;
  const c = e.length;
  for (s = 0; s < c; s++) {
    const a = e[s];
    if (a !== 0) {
      if (((r = n[n.length - 1]), e[r] < a)) {
        ((t[s] = r), n.push(s));
        continue;
      }
      for (o = 0, i = n.length - 1; o < i; )
        ((l = (o + i) >> 1), e[n[l]] < a ? (o = l + 1) : (i = l));
      a < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), (n[o] = s));
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; ) ((n[o] = i), (i = t[i]));
  return n;
}
function dl(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : dl(t);
}
function co(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function pl(e) {
  if (e.placeholder) return e.placeholder;
  const t = e.component;
  return t ? pl(t.subTree) : null;
}
const hl = (e) => e.__isSuspense;
function Wc(e, t) {
  t && t.pendingBranch
    ? V(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : Zu(e);
}
const de = Symbol.for("v-fgt"),
  ws = Symbol.for("v-txt"),
  Mt = Symbol.for("v-cmt"),
  ks = Symbol.for("v-stc"),
  An = [];
let Ge = null;
function q(e = !1) {
  An.push((Ge = e ? null : []));
}
function Gc() {
  (An.pop(), (Ge = An[An.length - 1] || null));
}
let In = 1;
function is(e, t = !1) {
  ((In += e), e < 0 && Ge && t && (Ge.hasOnce = !0));
}
function ml(e) {
  return (
    (e.dynamicChildren = In > 0 ? Ge || tn : null),
    Gc(),
    In > 0 && Ge && Ge.push(e),
    e
  );
}
function W(e, t, n, s, r, o) {
  return ml(g(e, t, n, s, r, o, !0));
}
function gl(e, t, n, s, r) {
  return ml(Ce(e, t, n, s, r, !0));
}
function ls(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function pn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const yl = ({ key: e }) => e ?? null,
  Jn = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? Re(e) || be(e) || G(e)
        ? { i: We, r: e, k: t, f: !!n }
        : e
      : null
  );
function g(
  e,
  t = null,
  n = null,
  s = 0,
  r = null,
  o = e === de ? 0 : 1,
  i = !1,
  l = !1,
) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && yl(t),
    ref: t && Jn(t),
    scopeId: Hi,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: We,
  };
  return (
    l
      ? (Fr(c, n), o & 128 && e.normalize(c))
      : n && (c.shapeFlag |= Re(n) ? 8 : 16),
    In > 0 &&
      !i &&
      Ge &&
      (c.patchFlag > 0 || o & 6) &&
      c.patchFlag !== 32 &&
      Ge.push(c),
    c
  );
}
const Ce = zc;
function zc(e, t = null, n = null, s = 0, r = null, o = !1) {
  if (((!e || e === _c) && (e = Mt), ls(e))) {
    const l = on(e, t, !0);
    return (
      n && Fr(l, n),
      In > 0 &&
        !o &&
        Ge &&
        (l.shapeFlag & 6 ? (Ge[Ge.indexOf(e)] = l) : Ge.push(l)),
      (l.patchFlag = -2),
      l
    );
  }
  if ((oa(e) && (e = e.__vccOpts), t)) {
    t = Jc(t);
    let { class: l, style: c } = t;
    (l && !Re(l) && (t.class = wr(l)),
      le(c) && (ys(c) && !V(c) && (c = Ne({}, c)), (t.style = vr(c))));
  }
  const i = Re(e) ? 1 : hl(e) ? 128 : oc(e) ? 64 : le(e) ? 4 : G(e) ? 2 : 0;
  return g(e, t, n, s, r, i, o, !0);
}
function Jc(e) {
  return e ? (ys(e) || ol(e) ? Ne({}, e) : e) : null;
}
function on(e, t, n = !1, s = !1) {
  const { props: r, ref: o, patchFlag: i, children: l, transition: c } = e,
    a = t ? Qc(r || {}, t) : r,
    u = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e.type,
      props: a,
      key: a && yl(a),
      ref:
        t && t.ref
          ? n && o
            ? V(o)
              ? o.concat(Jn(t))
              : [o, Jn(t)]
            : Jn(t)
          : o,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: l,
      target: e.target,
      targetStart: e.targetStart,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      patchFlag: t && e.type !== de ? (i === -1 ? 16 : i | 16) : i,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: c,
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && on(e.ssContent),
      ssFallback: e.ssFallback && on(e.ssFallback),
      placeholder: e.placeholder,
      el: e.el,
      anchor: e.anchor,
      ctx: e.ctx,
      ce: e.ce,
    };
  return (c && s && Ir(u, c.clone(u)), u);
}
function xn(e = " ", t = 0) {
  return Ce(ws, null, e, t);
}
function Ye(e = "", t = !1) {
  return t ? (q(), gl(Mt, null, e)) : Ce(Mt, null, e);
}
function gt(e) {
  return e == null || typeof e == "boolean"
    ? Ce(Mt)
    : V(e)
      ? Ce(de, null, e.slice())
      : ls(e)
        ? St(e)
        : Ce(ws, null, String(e));
}
function St(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : on(e);
}
function Fr(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null) t = null;
  else if (V(t)) n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Fr(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !ol(t)
        ? (t._ctx = We)
        : r === 3 &&
          We &&
          (We.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    G(t)
      ? ((t = { default: t, _ctx: We }), (n = 32))
      : ((t = String(t)), s & 64 ? ((n = 16), (t = [xn(t)])) : (n = 8));
  ((e.children = t), (e.shapeFlag |= n));
}
function Qc(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = wr([t.class, s.class]));
      else if (r === "style") t.style = vr([t.style, s.style]);
      else if (as(r)) {
        const o = t[r],
          i = s[r];
        i && o !== i && !(V(o) && o.includes(i))
          ? (t[r] = o ? [].concat(o, i) : i)
          : i == null && o == null && !fs(r) && (t[r] = i);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function pt(e, t, n, s = null) {
  vt(e, t, 7, [n, s]);
}
const Xc = el();
let Yc = 0;
function Zc(e, t, n) {
  const s = e.type,
    r = (t ? t.appContext : e.appContext) || Xc,
    o = {
      uid: Yc++,
      vnode: e,
      type: s,
      parent: t,
      appContext: r,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      job: null,
      scope: new _i(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(r.provides),
      ids: t ? t.ids : ["", 0, 0],
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: ll(s, r),
      emitsOptions: tl(s, r),
      emit: null,
      emitted: null,
      propsDefaults: fe,
      inheritAttrs: s.inheritAttrs,
      ctx: fe,
      data: fe,
      props: fe,
      attrs: fe,
      slots: fe,
      refs: fe,
      setupState: fe,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (o.ctx = { _: o }),
    (o.root = t ? t.root : o),
    (o.emit = Pc.bind(null, o)),
    e.ce && e.ce(o),
    o
  );
}
let Le = null;
const bl = () => Le || We;
let us, or;
{
  const e = ms(),
    t = (n, s) => {
      let r;
      return (
        (r = e[n]) || (r = e[n] = []),
        r.push(s),
        (o) => {
          r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
        }
      );
    };
  ((us = t("__VUE_INSTANCE_SETTERS__", (n) => (Le = n))),
    (or = t("__VUE_SSR_SETTERS__", (n) => (Dn = n))));
}
const Mn = (e) => {
    const t = Le;
    return (
      us(e),
      e.scope.on(),
      () => {
        (e.scope.off(), us(t));
      }
    );
  },
  ao = () => {
    (Le && Le.scope.off(), us(null));
  };
function _l(e) {
  return e.vnode.shapeFlag & 4;
}
let Dn = !1;
function ea(e, t = !1, n = !1) {
  t && or(t);
  const { props: s, children: r } = e.vnode,
    o = _l(e);
  (Uc(e, s, o, t), jc(e, r, n || t));
  const i = o ? ta(e, t) : void 0;
  return (t && or(!1), i);
}
function ta(e, t) {
  const n = e.type;
  ((e.accessCache = Object.create(null)), (e.proxy = new Proxy(e.ctx, wc)));
  const { setup: s } = n;
  if (s) {
    Ct();
    const r = (e.setupContext = s.length > 1 ? sa(e) : null),
      o = Mn(e),
      i = Un(s, e, 0, [e.props, r]),
      l = di(i);
    if ((Tt(), o(), (l || e.sp) && !Rn(e) && Gi(e), l)) {
      if ((i.then(ao, ao), t))
        return i
          .then((c) => {
            fo(e, c);
          })
          .catch((c) => {
            bs(c, e, 0);
          });
      e.asyncDep = i;
    } else fo(e, i);
  } else vl(e);
}
function fo(e, t, n) {
  (G(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : le(t) && (e.setupState = ki(t)),
    vl(e));
}
function vl(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || _t);
  {
    const r = Mn(e);
    Ct();
    try {
      Ec(e);
    } finally {
      (Tt(), r());
    }
  }
}
const na = {
  get(e, t) {
    return (De(e, "get", ""), e[t]);
  },
};
function sa(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, na),
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function Es(e) {
  return e.exposed
    ? e.exposeProxy ||
        (e.exposeProxy = new Proxy(ki(Tr(e.exposed)), {
          get(t, n) {
            if (n in t) return t[n];
            if (n in Sn) return Sn[n](e);
          },
          has(t, n) {
            return n in t || n in Sn;
          },
        }))
    : e.proxy;
}
function ra(e, t = !0) {
  return G(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function oa(e) {
  return G(e) && "__vccOpts" in e;
}
const Ke = (e, t) => zu(e, t, Dn);
function wl(e, t, n) {
  try {
    is(-1);
    const s = arguments.length;
    return s === 2
      ? le(t) && !V(t)
        ? ls(t)
          ? Ce(e, null, [t])
          : Ce(e, t)
        : Ce(e, null, t)
      : (s > 3
          ? (n = Array.prototype.slice.call(arguments, 2))
          : s === 3 && ls(n) && (n = [n]),
        Ce(e, t, n));
  } finally {
    is(1);
  }
}
const ia = "3.5.32";
/**
 * @vue/runtime-dom v3.5.32
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let ir;
const po = typeof window < "u" && window.trustedTypes;
if (po)
  try {
    ir = po.createPolicy("vue", { createHTML: (e) => e });
  } catch {}
const El = ir ? (e) => ir.createHTML(e) : (e) => e,
  la = "http://www.w3.org/2000/svg",
  ua = "http://www.w3.org/1998/Math/MathML",
  Rt = typeof document < "u" ? document : null,
  ho = Rt && Rt.createElement("template"),
  ca = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, s) => {
      const r =
        t === "svg"
          ? Rt.createElementNS(la, e)
          : t === "mathml"
            ? Rt.createElementNS(ua, e)
            : n
              ? Rt.createElement(e, { is: n })
              : Rt.createElement(e);
      return (
        e === "select" &&
          s &&
          s.multiple != null &&
          r.setAttribute("multiple", s.multiple),
        r
      );
    },
    createText: (e) => Rt.createTextNode(e),
    createComment: (e) => Rt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Rt.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, s, r, o) {
      const i = n ? n.previousSibling : t.lastChild;
      if (r && (r === o || r.nextSibling))
        for (
          ;
          t.insertBefore(r.cloneNode(!0), n),
            !(r === o || !(r = r.nextSibling));
        );
      else {
        ho.innerHTML = El(
          s === "svg"
            ? `<svg>${e}</svg>`
            : s === "mathml"
              ? `<math>${e}</math>`
              : e,
        );
        const l = ho.content;
        if (s === "svg" || s === "mathml") {
          const c = l.firstChild;
          for (; c.firstChild; ) l.appendChild(c.firstChild);
          l.removeChild(c);
        }
        t.insertBefore(l, n);
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  },
  aa = Symbol("_vtc");
function fa(e, t, n) {
  const s = e[aa];
  (s && (t = (t ? [t, ...s] : [...s]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
        ? e.setAttribute("class", t)
        : (e.className = t));
}
const mo = Symbol("_vod"),
  da = Symbol("_vsh"),
  pa = Symbol(""),
  ha = /(?:^|;)\s*display\s*:/;
function ma(e, t, n) {
  const s = e.style,
    r = Re(n);
  let o = !1;
  if (n && !r) {
    if (t)
      if (Re(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && Qn(s, l, "");
        }
      else for (const i in t) n[i] == null && Qn(s, i, "");
    for (const i in n) (i === "display" && (o = !0), Qn(s, i, n[i]));
  } else if (r) {
    if (t !== n) {
      const i = s[pa];
      (i && (n += ";" + i), (s.cssText = n), (o = ha.test(n)));
    }
  } else t && e.removeAttribute("style");
  mo in e && ((e[mo] = o ? s.display : ""), e[da] && (s.display = "none"));
}
const go = /\s*!important$/;
function Qn(e, t, n) {
  if (V(n)) n.forEach((s) => Qn(e, t, s));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const s = ga(e, t);
    go.test(n)
      ? e.setProperty(Gt(s), n.replace(go, ""), "important")
      : (e[s] = n);
  }
}
const yo = ["Webkit", "Moz", "ms"],
  Bs = {};
function ga(e, t) {
  const n = Bs[t];
  if (n) return n;
  let s = je(t);
  if (s !== "filter" && s in e) return (Bs[t] = s);
  s = hs(s);
  for (let r = 0; r < yo.length; r++) {
    const o = yo[r] + s;
    if (o in e) return (Bs[t] = o);
  }
  return t;
}
const bo = "http://www.w3.org/1999/xlink";
function _o(e, t, n, s, r, o = _u(t)) {
  s && t.startsWith("xlink:")
    ? n == null
      ? e.removeAttributeNS(bo, t.slice(6, t.length))
      : e.setAttributeNS(bo, t, n)
    : n == null || (o && !gi(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, o ? "" : et(n) ? String(n) : n);
}
function vo(e, t, n, s, r) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? El(n) : n);
    return;
  }
  const o = e.tagName;
  if (t === "value" && o !== "PROGRESS" && !o.includes("-")) {
    const l = o === "OPTION" ? e.getAttribute("value") || "" : e.value,
      c = n == null ? (e.type === "checkbox" ? "on" : "") : String(n);
    ((l !== c || !("_value" in e)) && (e.value = c),
      n == null && e.removeAttribute(t),
      (e._value = n));
    return;
  }
  let i = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean"
      ? (n = gi(n))
      : n == null && l === "string"
        ? ((n = ""), (i = !0))
        : l === "number" && ((n = 0), (i = !0));
  }
  try {
    e[t] = n;
  } catch {}
  i && e.removeAttribute(r || t);
}
function Zt(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function ya(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const wo = Symbol("_vei");
function ba(e, t, n, s, r = null) {
  const o = e[wo] || (e[wo] = {}),
    i = o[t];
  if (s && i) i.value = s;
  else {
    const [l, c] = _a(t);
    if (s) {
      const a = (o[t] = Ea(s, r));
      Zt(e, l, a, c);
    } else i && (ya(e, l, i, c), (o[t] = void 0));
  }
}
const Eo = /(?:Once|Passive|Capture)$/;
function _a(e) {
  let t;
  if (Eo.test(e)) {
    t = {};
    let s;
    for (; (s = e.match(Eo)); )
      ((e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0));
  }
  return [e[2] === ":" ? e.slice(3) : Gt(e.slice(2)), t];
}
let js = 0;
const va = Promise.resolve(),
  wa = () => js || (va.then(() => (js = 0)), (js = Date.now()));
function Ea(e, t) {
  const n = (s) => {
    if (!s._vts) s._vts = Date.now();
    else if (s._vts <= n.attached) return;
    vt(Ra(s, n.value), t, 5, [s]);
  };
  return ((n.value = e), (n.attached = wa()), n);
}
function Ra(e, t) {
  if (V(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        (n.call(e), (e._stopped = !0));
      }),
      t.map((s) => (r) => !r._stopped && s && s(r))
    );
  } else return t;
}
const Ro = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    e.charCodeAt(2) > 96 &&
    e.charCodeAt(2) < 123,
  Sa = (e, t, n, s, r, o) => {
    const i = r === "svg";
    t === "class"
      ? fa(e, s, i)
      : t === "style"
        ? ma(e, n, s)
        : as(t)
          ? fs(t) || ba(e, t, n, s, o)
          : (
                t[0] === "."
                  ? ((t = t.slice(1)), !0)
                  : t[0] === "^"
                    ? ((t = t.slice(1)), !1)
                    : Aa(e, t, s, i)
              )
            ? (vo(e, t, s),
              !e.tagName.includes("-") &&
                (t === "value" || t === "checked" || t === "selected") &&
                _o(e, t, s, i, o, t !== "value"))
            : e._isVueCE &&
                (xa(e, t) ||
                  (e._def.__asyncLoader && (/[A-Z]/.test(t) || !Re(s))))
              ? vo(e, je(t), s, o, t)
              : (t === "true-value"
                  ? (e._trueValue = s)
                  : t === "false-value" && (e._falseValue = s),
                _o(e, t, s, i));
  };
function Aa(e, t, n, s) {
  if (s)
    return !!(
      t === "innerHTML" ||
      t === "textContent" ||
      (t in e && Ro(t) && G(n))
    );
  if (
    t === "spellcheck" ||
    t === "draggable" ||
    t === "translate" ||
    t === "autocorrect" ||
    (t === "sandbox" && e.tagName === "IFRAME") ||
    t === "form" ||
    (t === "list" && e.tagName === "INPUT") ||
    (t === "type" && e.tagName === "TEXTAREA")
  )
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Ro(t) && Re(n) ? !1 : t in e;
}
function xa(e, t) {
  const n = e._def.props;
  if (!n) return !1;
  const s = je(t);
  return Array.isArray(n)
    ? n.some((r) => je(r) === s)
    : Object.keys(n).some((r) => je(r) === s);
}
const So = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return V(t) ? (n) => Gn(t, n) : t;
};
function Oa(e) {
  e.target.composing = !0;
}
function Ao(e) {
  const t = e.target;
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")));
}
const $s = Symbol("_assign");
function xo(e, t, n) {
  return (t && (e = e.trim()), n && (e = _r(e)), e);
}
const ce = {
    created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
      e[$s] = So(r);
      const o = s || (r.props && r.props.type === "number");
      (Zt(e, t ? "change" : "input", (i) => {
        i.target.composing || e[$s](xo(e.value, n, o));
      }),
        (n || o) &&
          Zt(e, "change", () => {
            e.value = xo(e.value, n, o);
          }),
        t ||
          (Zt(e, "compositionstart", Oa),
          Zt(e, "compositionend", Ao),
          Zt(e, "change", Ao)));
    },
    mounted(e, { value: t }) {
      e.value = t ?? "";
    },
    beforeUpdate(
      e,
      { value: t, oldValue: n, modifiers: { lazy: s, trim: r, number: o } },
      i,
    ) {
      if (((e[$s] = So(i)), e.composing)) return;
      const l =
          (o || e.type === "number") && !/^0\d/.test(e.value)
            ? _r(e.value)
            : e.value,
        c = t ?? "";
      if (l === c) return;
      const a = e.getRootNode();
      ((a instanceof Document || a instanceof ShadowRoot) &&
        a.activeElement === e &&
        e.type !== "range" &&
        ((s && t === n) || (r && e.value.trim() === c))) ||
        (e.value = c);
    },
  },
  Ca = Ne({ patchProp: Sa }, ca);
let Oo;
function Ta() {
  return Oo || (Oo = Vc(Ca));
}
const Pa = (...e) => {
  const t = Ta().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (s) => {
      const r = Ia(s);
      if (!r) return;
      const o = t._component;
      (!G(o) && !o.render && !o.template && (o.template = r.innerHTML),
        r.nodeType === 1 && (r.textContent = ""));
      const i = n(r, !1, Na(r));
      return (
        r instanceof Element &&
          (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")),
        i
      );
    }),
    t
  );
};
function Na(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Ia(e) {
  return Re(e) ? document.querySelector(e) : e;
}
/*!
 * pinia v3.0.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */ let Rl;
const Rs = (e) => (Rl = e),
  Sl = Symbol();
function lr(e) {
  return (
    e &&
    typeof e == "object" &&
    Object.prototype.toString.call(e) === "[object Object]" &&
    typeof e.toJSON != "function"
  );
}
var On;
(function (e) {
  ((e.direct = "direct"),
    (e.patchObject = "patch object"),
    (e.patchFunction = "patch function"));
})(On || (On = {}));
function Da() {
  const e = vi(!0),
    t = e.run(() => ie({}));
  let n = [],
    s = [];
  const r = Tr({
    install(o) {
      (Rs(r),
        (r._a = o),
        o.provide(Sl, r),
        (o.config.globalProperties.$pinia = r),
        s.forEach((i) => n.push(i)),
        (s = []));
    },
    use(o) {
      return (this._a ? n.push(o) : s.push(o), this);
    },
    _p: n,
    _a: null,
    _e: e,
    _s: new Map(),
    state: t,
  });
  return r;
}
const Al = () => {};
function Co(e, t, n, s = Al) {
  e.add(t);
  const r = () => {
    e.delete(t) && s();
  };
  return (!n && wi() && wu(r), r);
}
function Xt(e, ...t) {
  e.forEach((n) => {
    n(...t);
  });
}
const La = (e) => e(),
  To = Symbol(),
  Vs = Symbol();
function ur(e, t) {
  e instanceof Map && t instanceof Map
    ? t.forEach((n, s) => e.set(s, n))
    : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n)) continue;
    const s = t[n],
      r = e[n];
    lr(r) && lr(s) && e.hasOwnProperty(n) && !be(s) && !Ot(s)
      ? (e[n] = ur(r, s))
      : (e[n] = s);
  }
  return e;
}
const Fa = Symbol();
function Ua(e) {
  return !lr(e) || !Object.prototype.hasOwnProperty.call(e, Fa);
}
const { assign: Lt } = Object;
function Ma(e) {
  return !!(be(e) && e.effect);
}
function ka(e, t, n, s) {
  const { state: r, actions: o, getters: i } = t,
    l = n.state.value[e];
  let c;
  function a() {
    l || (n.state.value[e] = r ? r() : {});
    const u = qu(n.state.value[e]);
    return Lt(
      u,
      o,
      Object.keys(i || {}).reduce(
        (f, h) => (
          (f[h] = Tr(
            Ke(() => {
              Rs(n);
              const _ = n._s.get(e);
              return i[h].call(_, _);
            }),
          )),
          f
        ),
        {},
      ),
    );
  }
  return ((c = xl(e, a, t, n, s, !0)), c);
}
function xl(e, t, n = {}, s, r, o) {
  let i;
  const l = Lt({ actions: {} }, n),
    c = { deep: !0 };
  let a,
    u,
    f = new Set(),
    h = new Set(),
    _;
  const m = s.state.value[e];
  !o && !m && (s.state.value[e] = {});
  let y;
  function w(X) {
    let J;
    ((a = u = !1),
      typeof X == "function"
        ? (X(s.state.value[e]),
          (J = { type: On.patchFunction, storeId: e, events: _ }))
        : (ur(s.state.value[e], X),
          (J = { type: On.patchObject, payload: X, storeId: e, events: _ })));
    const he = (y = Symbol());
    (Pr().then(() => {
      y === he && (a = !0);
    }),
      (u = !0),
      Xt(f, J, s.state.value[e]));
  }
  const I = o
    ? function () {
        const { state: J } = n,
          he = J ? J() : {};
        this.$patch((xe) => {
          Lt(xe, he);
        });
      }
    : Al;
  function C() {
    (i.stop(), f.clear(), h.clear(), s._s.delete(e));
  }
  const x = (X, J = "") => {
      if (To in X) return ((X[Vs] = J), X);
      const he = function () {
        Rs(s);
        const xe = Array.from(arguments),
          Oe = new Set(),
          we = new Set();
        function Ue(K) {
          Oe.add(K);
        }
        function tt(K) {
          we.add(K);
        }
        Xt(h, { args: xe, name: he[Vs], store: B, after: Ue, onError: tt });
        let Y;
        try {
          Y = X.apply(this && this.$id === e ? this : B, xe);
        } catch (K) {
          throw (Xt(we, K), K);
        }
        return Y instanceof Promise
          ? Y.then((K) => (Xt(Oe, K), K)).catch(
              (K) => (Xt(we, K), Promise.reject(K)),
            )
          : (Xt(Oe, Y), Y);
      };
      return ((he[To] = !0), (he[Vs] = J), he);
    },
    N = {
      _p: s,
      $id: e,
      $onAction: Co.bind(null, h),
      $patch: w,
      $reset: I,
      $subscribe(X, J = {}) {
        const he = Co(f, X, J.detached, () => xe()),
          xe = i.run(() =>
            wn(
              () => s.state.value[e],
              (Oe) => {
                (J.flush === "sync" ? u : a) &&
                  X({ storeId: e, type: On.direct, events: _ }, Oe);
              },
              Lt({}, c, J),
            ),
          );
        return he;
      },
      $dispose: C,
    },
    B = Pt(N);
  s._s.set(e, B);
  const z = ((s._a && s._a.runWithContext) || La)(() =>
    s._e.run(() => (i = vi()).run(() => t({ action: x }))),
  );
  for (const X in z) {
    const J = z[X];
    if ((be(J) && !Ma(J)) || Ot(J))
      o ||
        (m && Ua(J) && (be(J) ? (J.value = m[X]) : ur(J, m[X])),
        (s.state.value[e][X] = J));
    else if (typeof J == "function") {
      const he = x(J, X);
      ((z[X] = he), (l.actions[X] = J));
    }
  }
  return (
    Lt(B, z),
    Lt(se(B), z),
    Object.defineProperty(B, "$state", {
      get: () => s.state.value[e],
      set: (X) => {
        w((J) => {
          Lt(J, X);
        });
      },
    }),
    s._p.forEach((X) => {
      Lt(
        B,
        i.run(() => X({ store: B, app: s._a, pinia: s, options: l })),
      );
    }),
    m && o && n.hydrate && n.hydrate(B.$state, m),
    (a = !0),
    (u = !0),
    B
  );
}
/*! #__NO_SIDE_EFFECTS__ */ function Ba(e, t, n) {
  let s;
  const r = typeof t == "function";
  s = r ? n : t;
  function o(i, l) {
    const c = ec();
    return (
      (i = i || (c ? Ze(Sl, null) : null)),
      i && Rs(i),
      (i = Rl),
      i._s.has(e) || (r ? xl(e, t, s, i) : ka(e, s, i)),
      i._s.get(e)
    );
  }
  return ((o.$id = e), o);
}
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */ const en = typeof document < "u";
function Ol(e) {
  return (
    typeof e == "object" ||
    "displayName" in e ||
    "props" in e ||
    "__vccOpts" in e
  );
}
function ja(e) {
  return (
    e.__esModule ||
    e[Symbol.toStringTag] === "Module" ||
    (e.default && Ol(e.default))
  );
}
const re = Object.assign;
function Hs(e, t) {
  const n = {};
  for (const s in t) {
    const r = t[s];
    n[s] = ot(r) ? r.map(e) : e(r);
  }
  return n;
}
const Cn = () => {},
  ot = Array.isArray;
function Po(e, t) {
  const n = {};
  for (const s in e) n[s] = s in t ? t[s] : e[s];
  return n;
}
const Cl = /#/g,
  $a = /&/g,
  Va = /\//g,
  Ha = /=/g,
  qa = /\?/g,
  Tl = /\+/g,
  Ka = /%5B/g,
  Wa = /%5D/g,
  Pl = /%5E/g,
  Ga = /%60/g,
  Nl = /%7B/g,
  za = /%7C/g,
  Il = /%7D/g,
  Ja = /%20/g;
function Ur(e) {
  return e == null
    ? ""
    : encodeURI("" + e)
        .replace(za, "|")
        .replace(Ka, "[")
        .replace(Wa, "]");
}
function Qa(e) {
  return Ur(e).replace(Nl, "{").replace(Il, "}").replace(Pl, "^");
}
function cr(e) {
  return Ur(e)
    .replace(Tl, "%2B")
    .replace(Ja, "+")
    .replace(Cl, "%23")
    .replace($a, "%26")
    .replace(Ga, "`")
    .replace(Nl, "{")
    .replace(Il, "}")
    .replace(Pl, "^");
}
function Xa(e) {
  return cr(e).replace(Ha, "%3D");
}
function Ya(e) {
  return Ur(e).replace(Cl, "%23").replace(qa, "%3F");
}
function Za(e) {
  return Ya(e).replace(Va, "%2F");
}
function Ln(e) {
  if (e == null) return null;
  try {
    return decodeURIComponent("" + e);
  } catch {}
  return "" + e;
}
const ef = /\/$/,
  tf = (e) => e.replace(ef, "");
function qs(e, t, n = "/") {
  let s,
    r = {},
    o = "",
    i = "";
  const l = t.indexOf("#");
  let c = t.indexOf("?");
  return (
    (c = l >= 0 && c > l ? -1 : c),
    c >= 0 &&
      ((s = t.slice(0, c)),
      (o = t.slice(c, l > 0 ? l : t.length)),
      (r = e(o.slice(1)))),
    l >= 0 && ((s = s || t.slice(0, l)), (i = t.slice(l, t.length))),
    (s = of(s ?? t, n)),
    { fullPath: s + o + i, path: s, query: r, hash: Ln(i) }
  );
}
function nf(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function No(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || "/";
}
function sf(e, t, n) {
  const s = t.matched.length - 1,
    r = n.matched.length - 1;
  return (
    s > -1 &&
    s === r &&
    ln(t.matched[s], n.matched[r]) &&
    Dl(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function ln(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function Dl(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (var n in e) if (!rf(e[n], t[n])) return !1;
  return !0;
}
function rf(e, t) {
  return ot(e)
    ? Io(e, t)
    : ot(t)
      ? Io(t, e)
      : (e == null ? void 0 : e.valueOf()) ===
        (t == null ? void 0 : t.valueOf());
}
function Io(e, t) {
  return ot(t)
    ? e.length === t.length && e.every((n, s) => n === t[s])
    : e.length === 1 && e[0] === t;
}
function of(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"),
    s = e.split("/"),
    r = s[s.length - 1];
  (r === ".." || r === ".") && s.push("");
  let o = n.length - 1,
    i,
    l;
  for (i = 0; i < s.length; i++)
    if (((l = s[i]), l !== "."))
      if (l === "..") o > 1 && o--;
      else break;
  return n.slice(0, o).join("/") + "/" + s.slice(i).join("/");
}
const Dt = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0,
};
let ar = (function (e) {
    return ((e.pop = "pop"), (e.push = "push"), e);
  })({}),
  Ks = (function (e) {
    return ((e.back = "back"), (e.forward = "forward"), (e.unknown = ""), e);
  })({});
function lf(e) {
  if (!e)
    if (en) {
      const t = document.querySelector("base");
      ((e = (t && t.getAttribute("href")) || "/"),
        (e = e.replace(/^\w+:\/\/[^\/]+/, "")));
    } else e = "/";
  return (e[0] !== "/" && e[0] !== "#" && (e = "/" + e), tf(e));
}
const uf = /^[^#]+#/;
function cf(e, t) {
  return e.replace(uf, "#") + t;
}
function af(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    s = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: s.left - n.left - (t.left || 0),
    top: s.top - n.top - (t.top || 0),
  };
}
const Ss = () => ({ left: window.scrollX, top: window.scrollY });
function ff(e) {
  let t;
  if ("el" in e) {
    const n = e.el,
      s = typeof n == "string" && n.startsWith("#"),
      r =
        typeof n == "string"
          ? s
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
    if (!r) return;
    t = af(r, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.scrollX,
        t.top != null ? t.top : window.scrollY,
      );
}
function Do(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const fr = new Map();
function df(e, t) {
  fr.set(e, t);
}
function pf(e) {
  const t = fr.get(e);
  return (fr.delete(e), t);
}
function hf(e) {
  return typeof e == "string" || (e && typeof e == "object");
}
function Ll(e) {
  return typeof e == "string" || typeof e == "symbol";
}
let ye = (function (e) {
  return (
    (e[(e.MATCHER_NOT_FOUND = 1)] = "MATCHER_NOT_FOUND"),
    (e[(e.NAVIGATION_GUARD_REDIRECT = 2)] = "NAVIGATION_GUARD_REDIRECT"),
    (e[(e.NAVIGATION_ABORTED = 4)] = "NAVIGATION_ABORTED"),
    (e[(e.NAVIGATION_CANCELLED = 8)] = "NAVIGATION_CANCELLED"),
    (e[(e.NAVIGATION_DUPLICATED = 16)] = "NAVIGATION_DUPLICATED"),
    e
  );
})({});
const Fl = Symbol("");
(ye.MATCHER_NOT_FOUND + "",
  ye.NAVIGATION_GUARD_REDIRECT + "",
  ye.NAVIGATION_ABORTED + "",
  ye.NAVIGATION_CANCELLED + "",
  ye.NAVIGATION_DUPLICATED + "");
function un(e, t) {
  return re(new Error(), { type: e, [Fl]: !0 }, t);
}
function Et(e, t) {
  return e instanceof Error && Fl in e && (t == null || !!(e.type & t));
}
const mf = ["params", "query", "hash"];
function gf(e) {
  if (typeof e == "string") return e;
  if (e.path != null) return e.path;
  const t = {};
  for (const n of mf) n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
function yf(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const n = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let s = 0; s < n.length; ++s) {
    const r = n[s].replace(Tl, " "),
      o = r.indexOf("="),
      i = Ln(o < 0 ? r : r.slice(0, o)),
      l = o < 0 ? null : Ln(r.slice(o + 1));
    if (i in t) {
      let c = t[i];
      (ot(c) || (c = t[i] = [c]), c.push(l));
    } else t[i] = l;
  }
  return t;
}
function Lo(e) {
  let t = "";
  for (let n in e) {
    const s = e[n];
    if (((n = Xa(n)), s == null)) {
      s !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (ot(s) ? s.map((r) => r && cr(r)) : [s && cr(s)]).forEach((r) => {
      r !== void 0 &&
        ((t += (t.length ? "&" : "") + n), r != null && (t += "=" + r));
    });
  }
  return t;
}
function bf(e) {
  const t = {};
  for (const n in e) {
    const s = e[n];
    s !== void 0 &&
      (t[n] = ot(s)
        ? s.map((r) => (r == null ? null : "" + r))
        : s == null
          ? s
          : "" + s);
  }
  return t;
}
const _f = Symbol(""),
  Fo = Symbol(""),
  As = Symbol(""),
  Mr = Symbol(""),
  dr = Symbol("");
function hn() {
  let e = [];
  function t(s) {
    return (
      e.push(s),
      () => {
        const r = e.indexOf(s);
        r > -1 && e.splice(r, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e.slice(), reset: n };
}
function Ut(e, t, n, s, r, o = (i) => i()) {
  const i = s && (s.enterCallbacks[r] = s.enterCallbacks[r] || []);
  return () =>
    new Promise((l, c) => {
      const a = (h) => {
          h === !1
            ? c(un(ye.NAVIGATION_ABORTED, { from: n, to: t }))
            : h instanceof Error
              ? c(h)
              : hf(h)
                ? c(un(ye.NAVIGATION_GUARD_REDIRECT, { from: t, to: h }))
                : (i &&
                    s.enterCallbacks[r] === i &&
                    typeof h == "function" &&
                    i.push(h),
                  l());
        },
        u = o(() => e.call(s && s.instances[r], t, n, a));
      let f = Promise.resolve(u);
      (e.length < 3 && (f = f.then(a)), f.catch((h) => c(h)));
    });
}
function Ws(e, t, n, s, r = (o) => o()) {
  const o = [];
  for (const i of e)
    for (const l in i.components) {
      let c = i.components[l];
      if (!(t !== "beforeRouteEnter" && !i.instances[l]))
        if (Ol(c)) {
          const a = (c.__vccOpts || c)[t];
          a && o.push(Ut(a, n, s, i, l, r));
        } else {
          let a = c();
          o.push(() =>
            a.then((u) => {
              if (!u)
                throw new Error(
                  `Couldn't resolve component "${l}" at "${i.path}"`,
                );
              const f = ja(u) ? u.default : u;
              ((i.mods[l] = u), (i.components[l] = f));
              const h = (f.__vccOpts || f)[t];
              return h && Ut(h, n, s, i, l, r)();
            }),
          );
        }
    }
  return o;
}
function vf(e, t) {
  const n = [],
    s = [],
    r = [],
    o = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < o; i++) {
    const l = t.matched[i];
    l && (e.matched.find((a) => ln(a, l)) ? s.push(l) : n.push(l));
    const c = e.matched[i];
    c && (t.matched.find((a) => ln(a, c)) || r.push(c));
  }
  return [n, s, r];
}
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */ let wf = () => location.protocol + "//" + location.host;
function Ul(e, t) {
  const { pathname: n, search: s, hash: r } = t,
    o = e.indexOf("#");
  if (o > -1) {
    let i = r.includes(e.slice(o)) ? e.slice(o).length : 1,
      l = r.slice(i);
    return (l[0] !== "/" && (l = "/" + l), No(l, ""));
  }
  return No(n, e) + s + r;
}
function Ef(e, t, n, s) {
  let r = [],
    o = [],
    i = null;
  const l = ({ state: h }) => {
    const _ = Ul(e, location),
      m = n.value,
      y = t.value;
    let w = 0;
    if (h) {
      if (((n.value = _), (t.value = h), i && i === m)) {
        i = null;
        return;
      }
      w = y ? h.position - y.position : 0;
    } else s(_);
    r.forEach((I) => {
      I(n.value, m, {
        delta: w,
        type: ar.pop,
        direction: w ? (w > 0 ? Ks.forward : Ks.back) : Ks.unknown,
      });
    });
  };
  function c() {
    i = n.value;
  }
  function a(h) {
    r.push(h);
    const _ = () => {
      const m = r.indexOf(h);
      m > -1 && r.splice(m, 1);
    };
    return (o.push(_), _);
  }
  function u() {
    if (document.visibilityState === "hidden") {
      const { history: h } = window;
      if (!h.state) return;
      h.replaceState(re({}, h.state, { scroll: Ss() }), "");
    }
  }
  function f() {
    for (const h of o) h();
    ((o = []),
      window.removeEventListener("popstate", l),
      window.removeEventListener("pagehide", u),
      document.removeEventListener("visibilitychange", u));
  }
  return (
    window.addEventListener("popstate", l),
    window.addEventListener("pagehide", u),
    document.addEventListener("visibilitychange", u),
    { pauseListeners: c, listen: a, destroy: f }
  );
}
function Uo(e, t, n, s = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: s,
    position: window.history.length,
    scroll: r ? Ss() : null,
  };
}
function Rf(e) {
  const { history: t, location: n } = window,
    s = { value: Ul(e, n) },
    r = { value: t.state };
  r.value ||
    o(
      s.value,
      {
        back: null,
        current: s.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0,
    );
  function o(c, a, u) {
    const f = e.indexOf("#"),
      h =
        f > -1
          ? (n.host && document.querySelector("base") ? e : e.slice(f)) + c
          : wf() + e + c;
    try {
      (t[u ? "replaceState" : "pushState"](a, "", h), (r.value = a));
    } catch (_) {
      (console.error(_), n[u ? "replace" : "assign"](h));
    }
  }
  function i(c, a) {
    (o(
      c,
      re({}, t.state, Uo(r.value.back, c, r.value.forward, !0), a, {
        position: r.value.position,
      }),
      !0,
    ),
      (s.value = c));
  }
  function l(c, a) {
    const u = re({}, r.value, t.state, { forward: c, scroll: Ss() });
    (o(u.current, u, !0),
      o(c, re({}, Uo(s.value, c, null), { position: u.position + 1 }, a), !1),
      (s.value = c));
  }
  return { location: s, state: r, push: l, replace: i };
}
function Sf(e) {
  e = lf(e);
  const t = Rf(e),
    n = Ef(e, t.state, t.location, t.replace);
  function s(o, i = !0) {
    (i || n.pauseListeners(), history.go(o));
  }
  const r = re(
    { location: "", base: e, go: s, createHref: cf.bind(null, e) },
    t,
    n,
  );
  return (
    Object.defineProperty(r, "location", {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(r, "state", {
      enumerable: !0,
      get: () => t.state.value,
    }),
    r
  );
}
let $t = (function (e) {
  return (
    (e[(e.Static = 0)] = "Static"),
    (e[(e.Param = 1)] = "Param"),
    (e[(e.Group = 2)] = "Group"),
    e
  );
})({});
var Ae = (function (e) {
  return (
    (e[(e.Static = 0)] = "Static"),
    (e[(e.Param = 1)] = "Param"),
    (e[(e.ParamRegExp = 2)] = "ParamRegExp"),
    (e[(e.ParamRegExpEnd = 3)] = "ParamRegExpEnd"),
    (e[(e.EscapeNext = 4)] = "EscapeNext"),
    e
  );
})(Ae || {});
const Af = { type: $t.Static, value: "" },
  xf = /[a-zA-Z0-9_]/;
function Of(e) {
  if (!e) return [[]];
  if (e === "/") return [[Af]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(_) {
    throw new Error(`ERR (${n})/"${a}": ${_}`);
  }
  let n = Ae.Static,
    s = n;
  const r = [];
  let o;
  function i() {
    (o && r.push(o), (o = []));
  }
  let l = 0,
    c,
    a = "",
    u = "";
  function f() {
    a &&
      (n === Ae.Static
        ? o.push({ type: $t.Static, value: a })
        : n === Ae.Param || n === Ae.ParamRegExp || n === Ae.ParamRegExpEnd
          ? (o.length > 1 &&
              (c === "*" || c === "+") &&
              t(
                `A repeatable param (${a}) must be alone in its segment. eg: '/:ids+.`,
              ),
            o.push({
              type: $t.Param,
              value: a,
              regexp: u,
              repeatable: c === "*" || c === "+",
              optional: c === "*" || c === "?",
            }))
          : t("Invalid state to consume buffer"),
      (a = ""));
  }
  function h() {
    a += c;
  }
  for (; l < e.length; ) {
    if (((c = e[l++]), c === "\\" && n !== Ae.ParamRegExp)) {
      ((s = n), (n = Ae.EscapeNext));
      continue;
    }
    switch (n) {
      case Ae.Static:
        c === "/" ? (a && f(), i()) : c === ":" ? (f(), (n = Ae.Param)) : h();
        break;
      case Ae.EscapeNext:
        (h(), (n = s));
        break;
      case Ae.Param:
        c === "("
          ? (n = Ae.ParamRegExp)
          : xf.test(c)
            ? h()
            : (f(),
              (n = Ae.Static),
              c !== "*" && c !== "?" && c !== "+" && l--);
        break;
      case Ae.ParamRegExp:
        c === ")"
          ? u[u.length - 1] == "\\"
            ? (u = u.slice(0, -1) + c)
            : (n = Ae.ParamRegExpEnd)
          : (u += c);
        break;
      case Ae.ParamRegExpEnd:
        (f(),
          (n = Ae.Static),
          c !== "*" && c !== "?" && c !== "+" && l--,
          (u = ""));
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return (
    n === Ae.ParamRegExp && t(`Unfinished custom RegExp for param "${a}"`),
    f(),
    i(),
    r
  );
}
const Mo = "[^/]+?",
  Cf = { sensitive: !1, strict: !1, start: !0, end: !0 };
var ke = (function (e) {
  return (
    (e[(e._multiplier = 10)] = "_multiplier"),
    (e[(e.Root = 90)] = "Root"),
    (e[(e.Segment = 40)] = "Segment"),
    (e[(e.SubSegment = 30)] = "SubSegment"),
    (e[(e.Static = 40)] = "Static"),
    (e[(e.Dynamic = 20)] = "Dynamic"),
    (e[(e.BonusCustomRegExp = 10)] = "BonusCustomRegExp"),
    (e[(e.BonusWildcard = -50)] = "BonusWildcard"),
    (e[(e.BonusRepeatable = -20)] = "BonusRepeatable"),
    (e[(e.BonusOptional = -8)] = "BonusOptional"),
    (e[(e.BonusStrict = 0.7000000000000001)] = "BonusStrict"),
    (e[(e.BonusCaseSensitive = 0.25)] = "BonusCaseSensitive"),
    e
  );
})(ke || {});
const Tf = /[.+*?^${}()[\]/\\]/g;
function Pf(e, t) {
  const n = re({}, Cf, t),
    s = [];
  let r = n.start ? "^" : "";
  const o = [];
  for (const a of e) {
    const u = a.length ? [] : [ke.Root];
    n.strict && !a.length && (r += "/");
    for (let f = 0; f < a.length; f++) {
      const h = a[f];
      let _ = ke.Segment + (n.sensitive ? ke.BonusCaseSensitive : 0);
      if (h.type === $t.Static)
        (f || (r += "/"), (r += h.value.replace(Tf, "\\$&")), (_ += ke.Static));
      else if (h.type === $t.Param) {
        const { value: m, repeatable: y, optional: w, regexp: I } = h;
        o.push({ name: m, repeatable: y, optional: w });
        const C = I || Mo;
        if (C !== Mo) {
          _ += ke.BonusCustomRegExp;
          try {
            `${C}`;
          } catch (N) {
            throw new Error(
              `Invalid custom RegExp for param "${m}" (${C}): ` + N.message,
            );
          }
        }
        let x = y ? `((?:${C})(?:/(?:${C}))*)` : `(${C})`;
        (f || (x = w && a.length < 2 ? `(?:/${x})` : "/" + x),
          w && (x += "?"),
          (r += x),
          (_ += ke.Dynamic),
          w && (_ += ke.BonusOptional),
          y && (_ += ke.BonusRepeatable),
          C === ".*" && (_ += ke.BonusWildcard));
      }
      u.push(_);
    }
    s.push(u);
  }
  if (n.strict && n.end) {
    const a = s.length - 1;
    s[a][s[a].length - 1] += ke.BonusStrict;
  }
  (n.strict || (r += "/?"),
    n.end ? (r += "$") : n.strict && !r.endsWith("/") && (r += "(?:/|$)"));
  const i = new RegExp(r, n.sensitive ? "" : "i");
  function l(a) {
    const u = a.match(i),
      f = {};
    if (!u) return null;
    for (let h = 1; h < u.length; h++) {
      const _ = u[h] || "",
        m = o[h - 1];
      f[m.name] = _ && m.repeatable ? _.split("/") : _;
    }
    return f;
  }
  function c(a) {
    let u = "",
      f = !1;
    for (const h of e) {
      ((!f || !u.endsWith("/")) && (u += "/"), (f = !1));
      for (const _ of h)
        if (_.type === $t.Static) u += _.value;
        else if (_.type === $t.Param) {
          const { value: m, repeatable: y, optional: w } = _,
            I = m in a ? a[m] : "";
          if (ot(I) && !y)
            throw new Error(
              `Provided param "${m}" is an array but it is not repeatable (* or + modifiers)`,
            );
          const C = ot(I) ? I.join("/") : I;
          if (!C)
            if (w)
              h.length < 2 &&
                (u.endsWith("/") ? (u = u.slice(0, -1)) : (f = !0));
            else throw new Error(`Missing required param "${m}"`);
          u += C;
        }
    }
    return u || "/";
  }
  return { re: i, score: s, keys: o, parse: l, stringify: c };
}
function Nf(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const s = t[n] - e[n];
    if (s) return s;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === ke.Static + ke.Segment
      ? -1
      : 1
    : e.length > t.length
      ? t.length === 1 && t[0] === ke.Static + ke.Segment
        ? 1
        : -1
      : 0;
}
function Ml(e, t) {
  let n = 0;
  const s = e.score,
    r = t.score;
  for (; n < s.length && n < r.length; ) {
    const o = Nf(s[n], r[n]);
    if (o) return o;
    n++;
  }
  if (Math.abs(r.length - s.length) === 1) {
    if (ko(s)) return 1;
    if (ko(r)) return -1;
  }
  return r.length - s.length;
}
function ko(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const If = { strict: !1, end: !0, sensitive: !1 };
function Df(e, t, n) {
  const s = Pf(Of(e.path), n),
    r = re(s, { record: e, parent: t, children: [], alias: [] });
  return (t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r);
}
function Lf(e, t) {
  const n = [],
    s = new Map();
  t = Po(If, t);
  function r(f) {
    return s.get(f);
  }
  function o(f, h, _) {
    const m = !_,
      y = jo(f);
    y.aliasOf = _ && _.record;
    const w = Po(t, f),
      I = [y];
    if ("alias" in f) {
      const N = typeof f.alias == "string" ? [f.alias] : f.alias;
      for (const B of N)
        I.push(
          jo(
            re({}, y, {
              components: _ ? _.record.components : y.components,
              path: B,
              aliasOf: _ ? _.record : y,
            }),
          ),
        );
    }
    let C, x;
    for (const N of I) {
      const { path: B } = N;
      if (h && B[0] !== "/") {
        const pe = h.record.path,
          z = pe[pe.length - 1] === "/" ? "" : "/";
        N.path = h.record.path + (B && z + B);
      }
      if (
        ((C = Df(N, h, w)),
        _
          ? _.alias.push(C)
          : ((x = x || C),
            x !== C && x.alias.push(C),
            m && f.name && !$o(C) && i(f.name)),
        kl(C) && c(C),
        y.children)
      ) {
        const pe = y.children;
        for (let z = 0; z < pe.length; z++) o(pe[z], C, _ && _.children[z]);
      }
      _ = _ || C;
    }
    return x
      ? () => {
          i(x);
        }
      : Cn;
  }
  function i(f) {
    if (Ll(f)) {
      const h = s.get(f);
      h &&
        (s.delete(f),
        n.splice(n.indexOf(h), 1),
        h.children.forEach(i),
        h.alias.forEach(i));
    } else {
      const h = n.indexOf(f);
      h > -1 &&
        (n.splice(h, 1),
        f.record.name && s.delete(f.record.name),
        f.children.forEach(i),
        f.alias.forEach(i));
    }
  }
  function l() {
    return n;
  }
  function c(f) {
    const h = Mf(f, n);
    (n.splice(h, 0, f), f.record.name && !$o(f) && s.set(f.record.name, f));
  }
  function a(f, h) {
    let _,
      m = {},
      y,
      w;
    if ("name" in f && f.name) {
      if (((_ = s.get(f.name)), !_))
        throw un(ye.MATCHER_NOT_FOUND, { location: f });
      ((w = _.record.name),
        (m = re(
          Bo(
            h.params,
            _.keys
              .filter((x) => !x.optional)
              .concat(_.parent ? _.parent.keys.filter((x) => x.optional) : [])
              .map((x) => x.name),
          ),
          f.params &&
            Bo(
              f.params,
              _.keys.map((x) => x.name),
            ),
        )),
        (y = _.stringify(m)));
    } else if (f.path != null)
      ((y = f.path),
        (_ = n.find((x) => x.re.test(y))),
        _ && ((m = _.parse(y)), (w = _.record.name)));
    else {
      if (((_ = h.name ? s.get(h.name) : n.find((x) => x.re.test(h.path))), !_))
        throw un(ye.MATCHER_NOT_FOUND, { location: f, currentLocation: h });
      ((w = _.record.name),
        (m = re({}, h.params, f.params)),
        (y = _.stringify(m)));
    }
    const I = [];
    let C = _;
    for (; C; ) (I.unshift(C.record), (C = C.parent));
    return { name: w, path: y, params: m, matched: I, meta: Uf(I) };
  }
  e.forEach((f) => o(f));
  function u() {
    ((n.length = 0), s.clear());
  }
  return {
    addRoute: o,
    resolve: a,
    removeRoute: i,
    clearRoutes: u,
    getRoutes: l,
    getRecordMatcher: r,
  };
}
function Bo(e, t) {
  const n = {};
  for (const s of t) s in e && (n[s] = e[s]);
  return n;
}
function jo(e) {
  const t = {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: e.aliasOf,
    beforeEnter: e.beforeEnter,
    props: Ff(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      "components" in e
        ? e.components || null
        : e.component && { default: e.component },
  };
  return (Object.defineProperty(t, "mods", { value: {} }), t);
}
function Ff(e) {
  const t = {},
    n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const s in e.components) t[s] = typeof n == "object" ? n[s] : n;
  return t;
}
function $o(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function Uf(e) {
  return e.reduce((t, n) => re(t, n.meta), {});
}
function Mf(e, t) {
  let n = 0,
    s = t.length;
  for (; n !== s; ) {
    const o = (n + s) >> 1;
    Ml(e, t[o]) < 0 ? (s = o) : (n = o + 1);
  }
  const r = kf(e);
  return (r && (s = t.lastIndexOf(r, s - 1)), s);
}
function kf(e) {
  let t = e;
  for (; (t = t.parent); ) if (kl(t) && Ml(e, t) === 0) return t;
}
function kl({ record: e }) {
  return !!(
    e.name ||
    (e.components && Object.keys(e.components).length) ||
    e.redirect
  );
}
function Vo(e) {
  const t = Ze(As),
    n = Ze(Mr),
    s = Ke(() => {
      const c = Pe(e.to);
      return t.resolve(c);
    }),
    r = Ke(() => {
      const { matched: c } = s.value,
        { length: a } = c,
        u = c[a - 1],
        f = n.matched;
      if (!u || !f.length) return -1;
      const h = f.findIndex(ln.bind(null, u));
      if (h > -1) return h;
      const _ = Ho(c[a - 2]);
      return a > 1 && Ho(u) === _ && f[f.length - 1].path !== _
        ? f.findIndex(ln.bind(null, c[a - 2]))
        : h;
    }),
    o = Ke(() => r.value > -1 && Hf(n.params, s.value.params)),
    i = Ke(
      () =>
        r.value > -1 &&
        r.value === n.matched.length - 1 &&
        Dl(n.params, s.value.params),
    );
  function l(c = {}) {
    if (Vf(c)) {
      const a = t[Pe(e.replace) ? "replace" : "push"](Pe(e.to)).catch(Cn);
      return (
        e.viewTransition &&
          typeof document < "u" &&
          "startViewTransition" in document &&
          document.startViewTransition(() => a),
        a
      );
    }
    return Promise.resolve();
  }
  return {
    route: s,
    href: Ke(() => s.value.href),
    isActive: o,
    isExactActive: i,
    navigate: l,
  };
}
function Bf(e) {
  return e.length === 1 ? e[0] : e;
}
const jf = Wi({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
      viewTransition: Boolean,
    },
    useLink: Vo,
    setup(e, { slots: t }) {
      const n = Pt(Vo(e)),
        { options: s } = Ze(As),
        r = Ke(() => ({
          [qo(e.activeClass, s.linkActiveClass, "router-link-active")]:
            n.isActive,
          [qo(
            e.exactActiveClass,
            s.linkExactActiveClass,
            "router-link-exact-active",
          )]: n.isExactActive,
        }));
      return () => {
        const o = t.default && Bf(t.default(n));
        return e.custom
          ? o
          : wl(
              "a",
              {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: r.value,
              },
              o,
            );
      };
    },
  }),
  $f = jf;
function Vf(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return (e.preventDefault && e.preventDefault(), !0);
  }
}
function Hf(e, t) {
  for (const n in t) {
    const s = t[n],
      r = e[n];
    if (typeof s == "string") {
      if (s !== r) return !1;
    } else if (
      !ot(r) ||
      r.length !== s.length ||
      s.some((o, i) => o.valueOf() !== r[i].valueOf())
    )
      return !1;
  }
  return !0;
}
function Ho(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const qo = (e, t, n) => e ?? t ?? n,
  qf = Wi({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const s = Ze(dr),
        r = Ke(() => e.route || s.value),
        o = Ze(Fo, 0),
        i = Ke(() => {
          let a = Pe(o);
          const { matched: u } = r.value;
          let f;
          for (; (f = u[a]) && !f.components; ) a++;
          return a;
        }),
        l = Ke(() => r.value.matched[i.value]);
      (zn(
        Fo,
        Ke(() => i.value + 1),
      ),
        zn(_f, l),
        zn(dr, r));
      const c = ie();
      return (
        wn(
          () => [c.value, l.value, e.name],
          ([a, u, f], [h, _, m]) => {
            (u &&
              ((u.instances[f] = a),
              _ &&
                _ !== u &&
                a &&
                a === h &&
                (u.leaveGuards.size || (u.leaveGuards = _.leaveGuards),
                u.updateGuards.size || (u.updateGuards = _.updateGuards))),
              a &&
                u &&
                (!_ || !ln(u, _) || !h) &&
                (u.enterCallbacks[f] || []).forEach((y) => y(a)));
          },
          { flush: "post" },
        ),
        () => {
          const a = r.value,
            u = e.name,
            f = l.value,
            h = f && f.components[u];
          if (!h) return Ko(n.default, { Component: h, route: a });
          const _ = f.props[u],
            m = _
              ? _ === !0
                ? a.params
                : typeof _ == "function"
                  ? _(a)
                  : _
              : null,
            w = wl(
              h,
              re({}, m, t, {
                onVnodeUnmounted: (I) => {
                  I.component.isUnmounted && (f.instances[u] = null);
                },
                ref: c,
              }),
            );
          return Ko(n.default, { Component: w, route: a }) || w;
        }
      );
    },
  });
function Ko(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const Bl = qf;
function Kf(e) {
  const t = Lf(e.routes, e),
    n = e.parseQuery || yf,
    s = e.stringifyQuery || Lo,
    r = e.history,
    o = hn(),
    i = hn(),
    l = hn(),
    c = $u(Dt);
  let a = Dt;
  en &&
    e.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual");
  const u = Hs.bind(null, (S) => "" + S),
    f = Hs.bind(null, Za),
    h = Hs.bind(null, Ln);
  function _(S, U) {
    let L, M;
    return (
      Ll(S) ? ((L = t.getRecordMatcher(S)), (M = U)) : (M = S),
      t.addRoute(M, L)
    );
  }
  function m(S) {
    const U = t.getRecordMatcher(S);
    U && t.removeRoute(U);
  }
  function y() {
    return t.getRoutes().map((S) => S.record);
  }
  function w(S) {
    return !!t.getRecordMatcher(S);
  }
  function I(S, U) {
    if (((U = re({}, U || c.value)), typeof S == "string")) {
      const b = qs(n, S, U.path),
        E = t.resolve({ path: b.path }, U),
        A = r.createHref(b.fullPath);
      return re(b, E, {
        params: h(E.params),
        hash: Ln(b.hash),
        redirectedFrom: void 0,
        href: A,
      });
    }
    let L;
    if (S.path != null) L = re({}, S, { path: qs(n, S.path, U.path).path });
    else {
      const b = re({}, S.params);
      for (const E in b) b[E] == null && delete b[E];
      ((L = re({}, S, { params: f(b) })), (U.params = f(U.params)));
    }
    const M = t.resolve(L, U),
      ee = S.hash || "";
    M.params = u(h(M.params));
    const d = nf(s, re({}, S, { hash: Qa(ee), path: M.path })),
      p = r.createHref(d);
    return re(
      { fullPath: d, hash: ee, query: s === Lo ? bf(S.query) : S.query || {} },
      M,
      { redirectedFrom: void 0, href: p },
    );
  }
  function C(S) {
    return typeof S == "string" ? qs(n, S, c.value.path) : re({}, S);
  }
  function x(S, U) {
    if (a !== S) return un(ye.NAVIGATION_CANCELLED, { from: U, to: S });
  }
  function N(S) {
    return z(S);
  }
  function B(S) {
    return N(re(C(S), { replace: !0 }));
  }
  function pe(S, U) {
    const L = S.matched[S.matched.length - 1];
    if (L && L.redirect) {
      const { redirect: M } = L;
      let ee = typeof M == "function" ? M(S, U) : M;
      return (
        typeof ee == "string" &&
          ((ee =
            ee.includes("?") || ee.includes("#") ? (ee = C(ee)) : { path: ee }),
          (ee.params = {})),
        re(
          {
            query: S.query,
            hash: S.hash,
            params: ee.path != null ? {} : S.params,
          },
          ee,
        )
      );
    }
  }
  function z(S, U) {
    const L = (a = I(S)),
      M = c.value,
      ee = S.state,
      d = S.force,
      p = S.replace === !0,
      b = pe(L, M);
    if (b)
      return z(
        re(C(b), {
          state: typeof b == "object" ? re({}, ee, b.state) : ee,
          force: d,
          replace: p,
        }),
        U || L,
      );
    const E = L;
    E.redirectedFrom = U;
    let A;
    return (
      !d &&
        sf(s, M, L) &&
        ((A = un(ye.NAVIGATION_DUPLICATED, { to: E, from: M })),
        Se(M, M, !0, !1)),
      (A ? Promise.resolve(A) : he(E, M))
        .catch((R) =>
          Et(R)
            ? Et(R, ye.NAVIGATION_GUARD_REDIRECT)
              ? R
              : lt(R)
            : Z(R, E, M),
        )
        .then((R) => {
          if (R) {
            if (Et(R, ye.NAVIGATION_GUARD_REDIRECT))
              return z(
                re({ replace: p }, C(R.to), {
                  state: typeof R.to == "object" ? re({}, ee, R.to.state) : ee,
                  force: d,
                }),
                U || E,
              );
          } else R = Oe(E, M, !0, p, ee);
          return (xe(E, M, R), R);
        })
    );
  }
  function X(S, U) {
    const L = x(S, U);
    return L ? Promise.reject(L) : Promise.resolve();
  }
  function J(S) {
    const U = nt.values().next().value;
    return U && typeof U.runWithContext == "function"
      ? U.runWithContext(S)
      : S();
  }
  function he(S, U) {
    let L;
    const [M, ee, d] = vf(S, U);
    L = Ws(M.reverse(), "beforeRouteLeave", S, U);
    for (const b of M)
      b.leaveGuards.forEach((E) => {
        L.push(Ut(E, S, U));
      });
    const p = X.bind(null, S, U);
    return (
      L.push(p),
      Qe(L)
        .then(() => {
          L = [];
          for (const b of o.list()) L.push(Ut(b, S, U));
          return (L.push(p), Qe(L));
        })
        .then(() => {
          L = Ws(ee, "beforeRouteUpdate", S, U);
          for (const b of ee)
            b.updateGuards.forEach((E) => {
              L.push(Ut(E, S, U));
            });
          return (L.push(p), Qe(L));
        })
        .then(() => {
          L = [];
          for (const b of d)
            if (b.beforeEnter)
              if (ot(b.beforeEnter))
                for (const E of b.beforeEnter) L.push(Ut(E, S, U));
              else L.push(Ut(b.beforeEnter, S, U));
          return (L.push(p), Qe(L));
        })
        .then(
          () => (
            S.matched.forEach((b) => (b.enterCallbacks = {})),
            (L = Ws(d, "beforeRouteEnter", S, U, J)),
            L.push(p),
            Qe(L)
          ),
        )
        .then(() => {
          L = [];
          for (const b of i.list()) L.push(Ut(b, S, U));
          return (L.push(p), Qe(L));
        })
        .catch((b) => (Et(b, ye.NAVIGATION_CANCELLED) ? b : Promise.reject(b)))
    );
  }
  function xe(S, U, L) {
    l.list().forEach((M) => J(() => M(S, U, L)));
  }
  function Oe(S, U, L, M, ee) {
    const d = x(S, U);
    if (d) return d;
    const p = U === Dt,
      b = en ? history.state : {};
    (L &&
      (M || p
        ? r.replace(S.fullPath, re({ scroll: p && b && b.scroll }, ee))
        : r.push(S.fullPath, ee)),
      (c.value = S),
      Se(S, U, L, p),
      lt());
  }
  let we;
  function Ue() {
    we ||
      (we = r.listen((S, U, L) => {
        if (!ct.listening) return;
        const M = I(S),
          ee = pe(M, ct.currentRoute.value);
        if (ee) {
          z(re(ee, { replace: !0, force: !0 }), M).catch(Cn);
          return;
        }
        a = M;
        const d = c.value;
        (en && df(Do(d.fullPath, L.delta), Ss()),
          he(M, d)
            .catch((p) =>
              Et(p, ye.NAVIGATION_ABORTED | ye.NAVIGATION_CANCELLED)
                ? p
                : Et(p, ye.NAVIGATION_GUARD_REDIRECT)
                  ? (z(re(C(p.to), { force: !0 }), M)
                      .then((b) => {
                        Et(
                          b,
                          ye.NAVIGATION_ABORTED | ye.NAVIGATION_DUPLICATED,
                        ) &&
                          !L.delta &&
                          L.type === ar.pop &&
                          r.go(-1, !1);
                      })
                      .catch(Cn),
                    Promise.reject())
                  : (L.delta && r.go(-L.delta, !1), Z(p, M, d)),
            )
            .then((p) => {
              ((p = p || Oe(M, d, !1)),
                p &&
                  (L.delta && !Et(p, ye.NAVIGATION_CANCELLED)
                    ? r.go(-L.delta, !1)
                    : L.type === ar.pop &&
                      Et(p, ye.NAVIGATION_ABORTED | ye.NAVIGATION_DUPLICATED) &&
                      r.go(-1, !1)),
                xe(M, d, p));
            })
            .catch(Cn));
      }));
  }
  let tt = hn(),
    Y = hn(),
    K;
  function Z(S, U, L) {
    lt(S);
    const M = Y.list();
    return (
      M.length ? M.forEach((ee) => ee(S, U, L)) : console.error(S),
      Promise.reject(S)
    );
  }
  function Je() {
    return K && c.value !== Dt
      ? Promise.resolve()
      : new Promise((S, U) => {
          tt.add([S, U]);
        });
  }
  function lt(S) {
    return (
      K ||
        ((K = !S),
        Ue(),
        tt.list().forEach(([U, L]) => (S ? L(S) : U())),
        tt.reset()),
      S
    );
  }
  function Se(S, U, L, M) {
    const { scrollBehavior: ee } = e;
    if (!en || !ee) return Promise.resolve();
    const d =
      (!L && pf(Do(S.fullPath, 0))) ||
      ((M || !L) && history.state && history.state.scroll) ||
      null;
    return Pr()
      .then(() => ee(S, U, d))
      .then((p) => p && ff(p))
      .catch((p) => Z(p, S, U));
  }
  const _e = (S) => r.go(S);
  let ut;
  const nt = new Set(),
    ct = {
      currentRoute: c,
      listening: !0,
      addRoute: _,
      removeRoute: m,
      clearRoutes: t.clearRoutes,
      hasRoute: w,
      getRoutes: y,
      resolve: I,
      options: e,
      push: N,
      replace: B,
      go: _e,
      back: () => _e(-1),
      forward: () => _e(1),
      beforeEach: o.add,
      beforeResolve: i.add,
      afterEach: l.add,
      onError: Y.add,
      isReady: Je,
      install(S) {
        (S.component("RouterLink", $f),
          S.component("RouterView", Bl),
          (S.config.globalProperties.$router = ct),
          Object.defineProperty(S.config.globalProperties, "$route", {
            enumerable: !0,
            get: () => Pe(c),
          }),
          en &&
            !ut &&
            c.value === Dt &&
            ((ut = !0), N(r.location).catch((M) => {})));
        const U = {};
        for (const M in Dt)
          Object.defineProperty(U, M, {
            get: () => c.value[M],
            enumerable: !0,
          });
        (S.provide(As, ct), S.provide(Mr, Ui(U)), S.provide(dr, c));
        const L = S.unmount;
        (nt.add(S),
          (S.unmount = function () {
            (nt.delete(S),
              nt.size < 1 &&
                ((a = Dt),
                we && we(),
                (we = null),
                (c.value = Dt),
                (ut = !1),
                (K = !1)),
              L());
          }));
      },
    };
  function Qe(S) {
    return S.reduce((U, L) => U.then(() => J(L)), Promise.resolve());
  }
  return ct;
}
function kr() {
  return Ze(As);
}
function Wf(e) {
  return Ze(Mr);
}
function jl(e, t) {
  return function () {
    return e.apply(t, arguments);
  };
}
const { toString: Gf } = Object.prototype,
  { getPrototypeOf: Br } = Object,
  { iterator: xs, toStringTag: $l } = Symbol,
  Os = ((e) => (t) => {
    const n = Gf.call(t);
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  it = (e) => ((e = e.toLowerCase()), (t) => Os(t) === e),
  Cs = (e) => (t) => typeof t === e,
  { isArray: an } = Array,
  cn = Cs("undefined");
function kn(e) {
  return (
    e !== null &&
    !cn(e) &&
    e.constructor !== null &&
    !cn(e.constructor) &&
    Ve(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  );
}
const Vl = it("ArrayBuffer");
function zf(e) {
  let t;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && Vl(e.buffer)),
    t
  );
}
const Jf = Cs("string"),
  Ve = Cs("function"),
  Hl = Cs("number"),
  Bn = (e) => e !== null && typeof e == "object",
  Qf = (e) => e === !0 || e === !1,
  Xn = (e) => {
    if (Os(e) !== "object") return !1;
    const t = Br(e);
    return (
      (t === null ||
        t === Object.prototype ||
        Object.getPrototypeOf(t) === null) &&
      !($l in e) &&
      !(xs in e)
    );
  },
  Xf = (e) => {
    if (!Bn(e) || kn(e)) return !1;
    try {
      return (
        Object.keys(e).length === 0 &&
        Object.getPrototypeOf(e) === Object.prototype
      );
    } catch {
      return !1;
    }
  },
  Yf = it("Date"),
  Zf = it("File"),
  ed = (e) => !!(e && typeof e.uri < "u"),
  td = (e) => e && typeof e.getParts < "u",
  nd = it("Blob"),
  sd = it("FileList"),
  rd = (e) => Bn(e) && Ve(e.pipe);
function od() {
  return typeof globalThis < "u"
    ? globalThis
    : typeof self < "u"
      ? self
      : typeof window < "u"
        ? window
        : typeof global < "u"
          ? global
          : {};
}
const Wo = od(),
  Go = typeof Wo.FormData < "u" ? Wo.FormData : void 0,
  id = (e) => {
    let t;
    return (
      e &&
      ((Go && e instanceof Go) ||
        (Ve(e.append) &&
          ((t = Os(e)) === "formdata" ||
            (t === "object" &&
              Ve(e.toString) &&
              e.toString() === "[object FormData]"))))
    );
  },
  ld = it("URLSearchParams"),
  [ud, cd, ad, fd] = ["ReadableStream", "Request", "Response", "Headers"].map(
    it,
  ),
  dd = (e) =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function jn(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u") return;
  let s, r;
  if ((typeof e != "object" && (e = [e]), an(e)))
    for (s = 0, r = e.length; s < r; s++) t.call(null, e[s], s, e);
  else {
    if (kn(e)) return;
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
      i = o.length;
    let l;
    for (s = 0; s < i; s++) ((l = o[s]), t.call(null, e[l], l, e));
  }
}
function ql(e, t) {
  if (kn(e)) return null;
  t = t.toLowerCase();
  const n = Object.keys(e);
  let s = n.length,
    r;
  for (; s-- > 0; ) if (((r = n[s]), t === r.toLowerCase())) return r;
  return null;
}
const Vt =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : global,
  Kl = (e) => !cn(e) && e !== Vt;
function pr() {
  const { caseless: e, skipUndefined: t } = (Kl(this) && this) || {},
    n = {},
    s = (r, o) => {
      if (o === "__proto__" || o === "constructor" || o === "prototype") return;
      const i = (e && ql(n, o)) || o;
      Xn(n[i]) && Xn(r)
        ? (n[i] = pr(n[i], r))
        : Xn(r)
          ? (n[i] = pr({}, r))
          : an(r)
            ? (n[i] = r.slice())
            : (!t || !cn(r)) && (n[i] = r);
    };
  for (let r = 0, o = arguments.length; r < o; r++)
    arguments[r] && jn(arguments[r], s);
  return n;
}
const pd = (e, t, n, { allOwnKeys: s } = {}) => (
    jn(
      t,
      (r, o) => {
        n && Ve(r)
          ? Object.defineProperty(e, o, {
              value: jl(r, n),
              writable: !0,
              enumerable: !0,
              configurable: !0,
            })
          : Object.defineProperty(e, o, {
              value: r,
              writable: !0,
              enumerable: !0,
              configurable: !0,
            });
      },
      { allOwnKeys: s },
    ),
    e
  ),
  hd = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  md = (e, t, n, s) => {
    ((e.prototype = Object.create(t.prototype, s)),
      Object.defineProperty(e.prototype, "constructor", {
        value: e,
        writable: !0,
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e, "super", { value: t.prototype }),
      n && Object.assign(e.prototype, n));
  },
  gd = (e, t, n, s) => {
    let r, o, i;
    const l = {};
    if (((t = t || {}), e == null)) return t;
    do {
      for (r = Object.getOwnPropertyNames(e), o = r.length; o-- > 0; )
        ((i = r[o]),
          (!s || s(i, e, t)) && !l[i] && ((t[i] = e[i]), (l[i] = !0)));
      e = n !== !1 && Br(e);
    } while (e && (!n || n(e, t)) && e !== Object.prototype);
    return t;
  },
  yd = (e, t, n) => {
    ((e = String(e)),
      (n === void 0 || n > e.length) && (n = e.length),
      (n -= t.length));
    const s = e.indexOf(t, n);
    return s !== -1 && s === n;
  },
  bd = (e) => {
    if (!e) return null;
    if (an(e)) return e;
    let t = e.length;
    if (!Hl(t)) return null;
    const n = new Array(t);
    for (; t-- > 0; ) n[t] = e[t];
    return n;
  },
  _d = (
    (e) => (t) =>
      e && t instanceof e
  )(typeof Uint8Array < "u" && Br(Uint8Array)),
  vd = (e, t) => {
    const s = (e && e[xs]).call(e);
    let r;
    for (; (r = s.next()) && !r.done; ) {
      const o = r.value;
      t.call(e, o[0], o[1]);
    }
  },
  wd = (e, t) => {
    let n;
    const s = [];
    for (; (n = e.exec(t)) !== null; ) s.push(n);
    return s;
  },
  Ed = it("HTMLFormElement"),
  Rd = (e) =>
    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, s, r) {
      return s.toUpperCase() + r;
    }),
  zo = (
    ({ hasOwnProperty: e }) =>
    (t, n) =>
      e.call(t, n)
  )(Object.prototype),
  Sd = it("RegExp"),
  Wl = (e, t) => {
    const n = Object.getOwnPropertyDescriptors(e),
      s = {};
    (jn(n, (r, o) => {
      let i;
      (i = t(r, o, e)) !== !1 && (s[o] = i || r);
    }),
      Object.defineProperties(e, s));
  },
  Ad = (e) => {
    Wl(e, (t, n) => {
      if (Ve(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
        return !1;
      const s = e[n];
      if (Ve(s)) {
        if (((t.enumerable = !1), "writable" in t)) {
          t.writable = !1;
          return;
        }
        t.set ||
          (t.set = () => {
            throw Error("Can not rewrite read-only method '" + n + "'");
          });
      }
    });
  },
  xd = (e, t) => {
    const n = {},
      s = (r) => {
        r.forEach((o) => {
          n[o] = !0;
        });
      };
    return (an(e) ? s(e) : s(String(e).split(t)), n);
  },
  Od = () => {},
  Cd = (e, t) => (e != null && Number.isFinite((e = +e)) ? e : t);
function Td(e) {
  return !!(e && Ve(e.append) && e[$l] === "FormData" && e[xs]);
}
const Pd = (e) => {
    const t = new Array(10),
      n = (s, r) => {
        if (Bn(s)) {
          if (t.indexOf(s) >= 0) return;
          if (kn(s)) return s;
          if (!("toJSON" in s)) {
            t[r] = s;
            const o = an(s) ? [] : {};
            return (
              jn(s, (i, l) => {
                const c = n(i, r + 1);
                !cn(c) && (o[l] = c);
              }),
              (t[r] = void 0),
              o
            );
          }
        }
        return s;
      };
    return n(e, 0);
  },
  Nd = it("AsyncFunction"),
  Id = (e) => e && (Bn(e) || Ve(e)) && Ve(e.then) && Ve(e.catch),
  Gl = ((e, t) =>
    e
      ? setImmediate
      : t
        ? ((n, s) => (
            Vt.addEventListener(
              "message",
              ({ source: r, data: o }) => {
                r === Vt && o === n && s.length && s.shift()();
              },
              !1,
            ),
            (r) => {
              (s.push(r), Vt.postMessage(n, "*"));
            }
          ))(`axios@${Math.random()}`, [])
        : (n) => setTimeout(n))(
    typeof setImmediate == "function",
    Ve(Vt.postMessage),
  ),
  Dd =
    typeof queueMicrotask < "u"
      ? queueMicrotask.bind(Vt)
      : (typeof process < "u" && process.nextTick) || Gl,
  Ld = (e) => e != null && Ve(e[xs]),
  v = {
    isArray: an,
    isArrayBuffer: Vl,
    isBuffer: kn,
    isFormData: id,
    isArrayBufferView: zf,
    isString: Jf,
    isNumber: Hl,
    isBoolean: Qf,
    isObject: Bn,
    isPlainObject: Xn,
    isEmptyObject: Xf,
    isReadableStream: ud,
    isRequest: cd,
    isResponse: ad,
    isHeaders: fd,
    isUndefined: cn,
    isDate: Yf,
    isFile: Zf,
    isReactNativeBlob: ed,
    isReactNative: td,
    isBlob: nd,
    isRegExp: Sd,
    isFunction: Ve,
    isStream: rd,
    isURLSearchParams: ld,
    isTypedArray: _d,
    isFileList: sd,
    forEach: jn,
    merge: pr,
    extend: pd,
    trim: dd,
    stripBOM: hd,
    inherits: md,
    toFlatObject: gd,
    kindOf: Os,
    kindOfTest: it,
    endsWith: yd,
    toArray: bd,
    forEachEntry: vd,
    matchAll: wd,
    isHTMLForm: Ed,
    hasOwnProperty: zo,
    hasOwnProp: zo,
    reduceDescriptors: Wl,
    freezeMethods: Ad,
    toObjectSet: xd,
    toCamelCase: Rd,
    noop: Od,
    toFiniteNumber: Cd,
    findKey: ql,
    global: Vt,
    isContextDefined: Kl,
    isSpecCompliantForm: Td,
    toJSONObject: Pd,
    isAsyncFn: Nd,
    isThenable: Id,
    setImmediate: Gl,
    asap: Dd,
    isIterable: Ld,
  };
let $ = class zl extends Error {
  static from(t, n, s, r, o, i) {
    const l = new zl(t.message, n || t.code, s, r, o);
    return (
      (l.cause = t),
      (l.name = t.name),
      t.status != null && l.status == null && (l.status = t.status),
      i && Object.assign(l, i),
      l
    );
  }
  constructor(t, n, s, r, o) {
    (super(t),
      Object.defineProperty(this, "message", {
        value: t,
        enumerable: !0,
        writable: !0,
        configurable: !0,
      }),
      (this.name = "AxiosError"),
      (this.isAxiosError = !0),
      n && (this.code = n),
      s && (this.config = s),
      r && (this.request = r),
      o && ((this.response = o), (this.status = o.status)));
  }
  toJSON() {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: v.toJSONObject(this.config),
      code: this.code,
      status: this.status,
    };
  }
};
$.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
$.ERR_BAD_OPTION = "ERR_BAD_OPTION";
$.ECONNABORTED = "ECONNABORTED";
$.ETIMEDOUT = "ETIMEDOUT";
$.ERR_NETWORK = "ERR_NETWORK";
$.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
$.ERR_DEPRECATED = "ERR_DEPRECATED";
$.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
$.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
$.ERR_CANCELED = "ERR_CANCELED";
$.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
$.ERR_INVALID_URL = "ERR_INVALID_URL";
const Fd = null;
function hr(e) {
  return v.isPlainObject(e) || v.isArray(e);
}
function Jl(e) {
  return v.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Gs(e, t, n) {
  return e
    ? e
        .concat(t)
        .map(function (r, o) {
          return ((r = Jl(r)), !n && o ? "[" + r + "]" : r);
        })
        .join(n ? "." : "")
    : t;
}
function Ud(e) {
  return v.isArray(e) && !e.some(hr);
}
const Md = v.toFlatObject(v, {}, null, function (t) {
  return /^is[A-Z]/.test(t);
});
function Ts(e, t, n) {
  if (!v.isObject(e)) throw new TypeError("target must be an object");
  ((t = t || new FormData()),
    (n = v.toFlatObject(
      n,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (y, w) {
        return !v.isUndefined(w[y]);
      },
    )));
  const s = n.metaTokens,
    r = n.visitor || u,
    o = n.dots,
    i = n.indexes,
    c = (n.Blob || (typeof Blob < "u" && Blob)) && v.isSpecCompliantForm(t);
  if (!v.isFunction(r)) throw new TypeError("visitor must be a function");
  function a(m) {
    if (m === null) return "";
    if (v.isDate(m)) return m.toISOString();
    if (v.isBoolean(m)) return m.toString();
    if (!c && v.isBlob(m))
      throw new $("Blob is not supported. Use a Buffer instead.");
    return v.isArrayBuffer(m) || v.isTypedArray(m)
      ? c && typeof Blob == "function"
        ? new Blob([m])
        : Buffer.from(m)
      : m;
  }
  function u(m, y, w) {
    let I = m;
    if (v.isReactNative(t) && v.isReactNativeBlob(m))
      return (t.append(Gs(w, y, o), a(m)), !1);
    if (m && !w && typeof m == "object") {
      if (v.endsWith(y, "{}"))
        ((y = s ? y : y.slice(0, -2)), (m = JSON.stringify(m)));
      else if (
        (v.isArray(m) && Ud(m)) ||
        ((v.isFileList(m) || v.endsWith(y, "[]")) && (I = v.toArray(m)))
      )
        return (
          (y = Jl(y)),
          I.forEach(function (x, N) {
            !(v.isUndefined(x) || x === null) &&
              t.append(
                i === !0 ? Gs([y], N, o) : i === null ? y : y + "[]",
                a(x),
              );
          }),
          !1
        );
    }
    return hr(m) ? !0 : (t.append(Gs(w, y, o), a(m)), !1);
  }
  const f = [],
    h = Object.assign(Md, {
      defaultVisitor: u,
      convertValue: a,
      isVisitable: hr,
    });
  function _(m, y) {
    if (!v.isUndefined(m)) {
      if (f.indexOf(m) !== -1)
        throw Error("Circular reference detected in " + y.join("."));
      (f.push(m),
        v.forEach(m, function (I, C) {
          (!(v.isUndefined(I) || I === null) &&
            r.call(t, I, v.isString(C) ? C.trim() : C, y, h)) === !0 &&
            _(I, y ? y.concat(C) : [C]);
        }),
        f.pop());
    }
  }
  if (!v.isObject(e)) throw new TypeError("data must be an object");
  return (_(e), t);
}
function Jo(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (s) {
    return t[s];
  });
}
function jr(e, t) {
  ((this._pairs = []), e && Ts(e, this, t));
}
const Ql = jr.prototype;
Ql.append = function (t, n) {
  this._pairs.push([t, n]);
};
Ql.toString = function (t) {
  const n = t
    ? function (s) {
        return t.call(this, s, Jo);
      }
    : Jo;
  return this._pairs
    .map(function (r) {
      return n(r[0]) + "=" + n(r[1]);
    }, "")
    .join("&");
};
function kd(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+");
}
function Xl(e, t, n) {
  if (!t) return e;
  const s = (n && n.encode) || kd,
    r = v.isFunction(n) ? { serialize: n } : n,
    o = r && r.serialize;
  let i;
  if (
    (o
      ? (i = o(t, r))
      : (i = v.isURLSearchParams(t) ? t.toString() : new jr(t, r).toString(s)),
    i)
  ) {
    const l = e.indexOf("#");
    (l !== -1 && (e = e.slice(0, l)),
      (e += (e.indexOf("?") === -1 ? "?" : "&") + i));
  }
  return e;
}
class Qo {
  constructor() {
    this.handlers = [];
  }
  use(t, n, s) {
    return (
      this.handlers.push({
        fulfilled: t,
        rejected: n,
        synchronous: s ? s.synchronous : !1,
        runWhen: s ? s.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    v.forEach(this.handlers, function (s) {
      s !== null && t(s);
    });
  }
}
const $r = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
    legacyInterceptorReqResOrdering: !0,
  },
  Bd = typeof URLSearchParams < "u" ? URLSearchParams : jr,
  jd = typeof FormData < "u" ? FormData : null,
  $d = typeof Blob < "u" ? Blob : null,
  Vd = {
    isBrowser: !0,
    classes: { URLSearchParams: Bd, FormData: jd, Blob: $d },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  Vr = typeof window < "u" && typeof document < "u",
  mr = (typeof navigator == "object" && navigator) || void 0,
  Hd =
    Vr &&
    (!mr || ["ReactNative", "NativeScript", "NS"].indexOf(mr.product) < 0),
  qd =
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  Kd = (Vr && window.location.href) || "http://localhost",
  Wd = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: Vr,
        hasStandardBrowserEnv: Hd,
        hasStandardBrowserWebWorkerEnv: qd,
        navigator: mr,
        origin: Kd,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  Fe = { ...Wd, ...Vd };
function Gd(e, t) {
  return Ts(e, new Fe.classes.URLSearchParams(), {
    visitor: function (n, s, r, o) {
      return Fe.isNode && v.isBuffer(n)
        ? (this.append(s, n.toString("base64")), !1)
        : o.defaultVisitor.apply(this, arguments);
    },
    ...t,
  });
}
function zd(e) {
  return v
    .matchAll(/\w+|\[(\w*)]/g, e)
    .map((t) => (t[0] === "[]" ? "" : t[1] || t[0]));
}
function Jd(e) {
  const t = {},
    n = Object.keys(e);
  let s;
  const r = n.length;
  let o;
  for (s = 0; s < r; s++) ((o = n[s]), (t[o] = e[o]));
  return t;
}
function Yl(e) {
  function t(n, s, r, o) {
    let i = n[o++];
    if (i === "__proto__") return !0;
    const l = Number.isFinite(+i),
      c = o >= n.length;
    return (
      (i = !i && v.isArray(r) ? r.length : i),
      c
        ? (v.hasOwnProp(r, i) ? (r[i] = [r[i], s]) : (r[i] = s), !l)
        : ((!r[i] || !v.isObject(r[i])) && (r[i] = []),
          t(n, s, r[i], o) && v.isArray(r[i]) && (r[i] = Jd(r[i])),
          !l)
    );
  }
  if (v.isFormData(e) && v.isFunction(e.entries)) {
    const n = {};
    return (
      v.forEachEntry(e, (s, r) => {
        t(zd(s), r, n, 0);
      }),
      n
    );
  }
  return null;
}
function Qd(e, t, n) {
  if (v.isString(e))
    try {
      return ((t || JSON.parse)(e), v.trim(e));
    } catch (s) {
      if (s.name !== "SyntaxError") throw s;
    }
  return (n || JSON.stringify)(e);
}
const $n = {
  transitional: $r,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function (t, n) {
      const s = n.getContentType() || "",
        r = s.indexOf("application/json") > -1,
        o = v.isObject(t);
      if ((o && v.isHTMLForm(t) && (t = new FormData(t)), v.isFormData(t)))
        return r ? JSON.stringify(Yl(t)) : t;
      if (
        v.isArrayBuffer(t) ||
        v.isBuffer(t) ||
        v.isStream(t) ||
        v.isFile(t) ||
        v.isBlob(t) ||
        v.isReadableStream(t)
      )
        return t;
      if (v.isArrayBufferView(t)) return t.buffer;
      if (v.isURLSearchParams(t))
        return (
          n.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1,
          ),
          t.toString()
        );
      let l;
      if (o) {
        if (s.indexOf("application/x-www-form-urlencoded") > -1)
          return Gd(t, this.formSerializer).toString();
        if ((l = v.isFileList(t)) || s.indexOf("multipart/form-data") > -1) {
          const c = this.env && this.env.FormData;
          return Ts(
            l ? { "files[]": t } : t,
            c && new c(),
            this.formSerializer,
          );
        }
      }
      return o || r ? (n.setContentType("application/json", !1), Qd(t)) : t;
    },
  ],
  transformResponse: [
    function (t) {
      const n = this.transitional || $n.transitional,
        s = n && n.forcedJSONParsing,
        r = this.responseType === "json";
      if (v.isResponse(t) || v.isReadableStream(t)) return t;
      if (t && v.isString(t) && ((s && !this.responseType) || r)) {
        const i = !(n && n.silentJSONParsing) && r;
        try {
          return JSON.parse(t, this.parseReviver);
        } catch (l) {
          if (i)
            throw l.name === "SyntaxError"
              ? $.from(l, $.ERR_BAD_RESPONSE, this, null, this.response)
              : l;
        }
      }
      return t;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: Fe.classes.FormData, Blob: Fe.classes.Blob },
  validateStatus: function (t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
v.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  $n.headers[e] = {};
});
const Xd = v.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  Yd = (e) => {
    const t = {};
    let n, s, r;
    return (
      e &&
        e
          .split(
            `
`,
          )
          .forEach(function (i) {
            ((r = i.indexOf(":")),
              (n = i.substring(0, r).trim().toLowerCase()),
              (s = i.substring(r + 1).trim()),
              !(!n || (t[n] && Xd[n])) &&
                (n === "set-cookie"
                  ? t[n]
                    ? t[n].push(s)
                    : (t[n] = [s])
                  : (t[n] = t[n] ? t[n] + ", " + s : s)));
          }),
      t
    );
  },
  Xo = Symbol("internals"),
  Zd = (e) => !/[\r\n]/.test(e);
function Zl(e, t) {
  if (!(e === !1 || e == null)) {
    if (v.isArray(e)) {
      e.forEach((n) => Zl(n, t));
      return;
    }
    if (!Zd(String(e)))
      throw new Error(`Invalid character in header content ["${t}"]`);
  }
}
function mn(e) {
  return e && String(e).trim().toLowerCase();
}
function ep(e) {
  let t = e.length;
  for (; t > 0; ) {
    const n = e.charCodeAt(t - 1);
    if (n !== 10 && n !== 13) break;
    t -= 1;
  }
  return t === e.length ? e : e.slice(0, t);
}
function Yn(e) {
  return e === !1 || e == null ? e : v.isArray(e) ? e.map(Yn) : ep(String(e));
}
function tp(e) {
  const t = Object.create(null),
    n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let s;
  for (; (s = n.exec(e)); ) t[s[1]] = s[2];
  return t;
}
const np = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function zs(e, t, n, s, r) {
  if (v.isFunction(s)) return s.call(this, t, n);
  if ((r && (t = n), !!v.isString(t))) {
    if (v.isString(s)) return t.indexOf(s) !== -1;
    if (v.isRegExp(s)) return s.test(t);
  }
}
function sp(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (t, n, s) => n.toUpperCase() + s);
}
function rp(e, t) {
  const n = v.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((s) => {
    Object.defineProperty(e, s + n, {
      value: function (r, o, i) {
        return this[s].call(this, t, r, o, i);
      },
      configurable: !0,
    });
  });
}
let He = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, s) {
    const r = this;
    function o(l, c, a) {
      const u = mn(c);
      if (!u) throw new Error("header name must be a non-empty string");
      const f = v.findKey(r, u);
      (!f || r[f] === void 0 || a === !0 || (a === void 0 && r[f] !== !1)) &&
        (Zl(l, c), (r[f || c] = Yn(l)));
    }
    const i = (l, c) => v.forEach(l, (a, u) => o(a, u, c));
    if (v.isPlainObject(t) || t instanceof this.constructor) i(t, n);
    else if (v.isString(t) && (t = t.trim()) && !np(t)) i(Yd(t), n);
    else if (v.isObject(t) && v.isIterable(t)) {
      let l = {},
        c,
        a;
      for (const u of t) {
        if (!v.isArray(u))
          throw TypeError("Object iterator must return a key-value pair");
        l[(a = u[0])] = (c = l[a])
          ? v.isArray(c)
            ? [...c, u[1]]
            : [c, u[1]]
          : u[1];
      }
      i(l, n);
    } else t != null && o(n, t, s);
    return this;
  }
  get(t, n) {
    if (((t = mn(t)), t)) {
      const s = v.findKey(this, t);
      if (s) {
        const r = this[s];
        if (!n) return r;
        if (n === !0) return tp(r);
        if (v.isFunction(n)) return n.call(this, r, s);
        if (v.isRegExp(n)) return n.exec(r);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (((t = mn(t)), t)) {
      const s = v.findKey(this, t);
      return !!(s && this[s] !== void 0 && (!n || zs(this, this[s], s, n)));
    }
    return !1;
  }
  delete(t, n) {
    const s = this;
    let r = !1;
    function o(i) {
      if (((i = mn(i)), i)) {
        const l = v.findKey(s, i);
        l && (!n || zs(s, s[l], l, n)) && (delete s[l], (r = !0));
      }
    }
    return (v.isArray(t) ? t.forEach(o) : o(t), r);
  }
  clear(t) {
    const n = Object.keys(this);
    let s = n.length,
      r = !1;
    for (; s--; ) {
      const o = n[s];
      (!t || zs(this, this[o], o, t, !0)) && (delete this[o], (r = !0));
    }
    return r;
  }
  normalize(t) {
    const n = this,
      s = {};
    return (
      v.forEach(this, (r, o) => {
        const i = v.findKey(s, o);
        if (i) {
          ((n[i] = Yn(r)), delete n[o]);
          return;
        }
        const l = t ? sp(o) : String(o).trim();
        (l !== o && delete n[o], (n[l] = Yn(r)), (s[l] = !0));
      }),
      this
    );
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = Object.create(null);
    return (
      v.forEach(this, (s, r) => {
        s != null && s !== !1 && (n[r] = t && v.isArray(s) ? s.join(", ") : s);
      }),
      n
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const s = new this(t);
    return (n.forEach((r) => s.set(r)), s);
  }
  static accessor(t) {
    const s = (this[Xo] = this[Xo] = { accessors: {} }).accessors,
      r = this.prototype;
    function o(i) {
      const l = mn(i);
      s[l] || (rp(r, i), (s[l] = !0));
    }
    return (v.isArray(t) ? t.forEach(o) : o(t), this);
  }
};
He.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
v.reduceDescriptors(He.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(s) {
      this[n] = s;
    },
  };
});
v.freezeMethods(He);
function Js(e, t) {
  const n = this || $n,
    s = t || n,
    r = He.from(s.headers);
  let o = s.data;
  return (
    v.forEach(e, function (l) {
      o = l.call(n, o, r.normalize(), t ? t.status : void 0);
    }),
    r.normalize(),
    o
  );
}
function eu(e) {
  return !!(e && e.__CANCEL__);
}
let Vn = class extends $ {
  constructor(t, n, s) {
    (super(t ?? "canceled", $.ERR_CANCELED, n, s),
      (this.name = "CanceledError"),
      (this.__CANCEL__ = !0));
  }
};
function tu(e, t, n) {
  const s = n.config.validateStatus;
  !n.status || !s || s(n.status)
    ? e(n)
    : t(
        new $(
          "Request failed with status code " + n.status,
          [$.ERR_BAD_REQUEST, $.ERR_BAD_RESPONSE][
            Math.floor(n.status / 100) - 4
          ],
          n.config,
          n.request,
          n,
        ),
      );
}
function op(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return (t && t[1]) || "";
}
function ip(e, t) {
  e = e || 10;
  const n = new Array(e),
    s = new Array(e);
  let r = 0,
    o = 0,
    i;
  return (
    (t = t !== void 0 ? t : 1e3),
    function (c) {
      const a = Date.now(),
        u = s[o];
      (i || (i = a), (n[r] = c), (s[r] = a));
      let f = o,
        h = 0;
      for (; f !== r; ) ((h += n[f++]), (f = f % e));
      if (((r = (r + 1) % e), r === o && (o = (o + 1) % e), a - i < t)) return;
      const _ = u && a - u;
      return _ ? Math.round((h * 1e3) / _) : void 0;
    }
  );
}
function lp(e, t) {
  let n = 0,
    s = 1e3 / t,
    r,
    o;
  const i = (a, u = Date.now()) => {
    ((n = u), (r = null), o && (clearTimeout(o), (o = null)), e(...a));
  };
  return [
    (...a) => {
      const u = Date.now(),
        f = u - n;
      f >= s
        ? i(a, u)
        : ((r = a),
          o ||
            (o = setTimeout(() => {
              ((o = null), i(r));
            }, s - f)));
    },
    () => r && i(r),
  ];
}
const cs = (e, t, n = 3) => {
    let s = 0;
    const r = ip(50, 250);
    return lp((o) => {
      const i = o.loaded,
        l = o.lengthComputable ? o.total : void 0,
        c = i - s,
        a = r(c),
        u = i <= l;
      s = i;
      const f = {
        loaded: i,
        total: l,
        progress: l ? i / l : void 0,
        bytes: c,
        rate: a || void 0,
        estimated: a && l && u ? (l - i) / a : void 0,
        event: o,
        lengthComputable: l != null,
        [t ? "download" : "upload"]: !0,
      };
      e(f);
    }, n);
  },
  Yo = (e, t) => {
    const n = e != null;
    return [(s) => t[0]({ lengthComputable: n, total: e, loaded: s }), t[1]];
  },
  Zo =
    (e) =>
    (...t) =>
      v.asap(() => e(...t)),
  up = Fe.hasStandardBrowserEnv
    ? ((e, t) => (n) => (
        (n = new URL(n, Fe.origin)),
        e.protocol === n.protocol &&
          e.host === n.host &&
          (t || e.port === n.port)
      ))(
        new URL(Fe.origin),
        Fe.navigator && /(msie|trident)/i.test(Fe.navigator.userAgent),
      )
    : () => !0,
  cp = Fe.hasStandardBrowserEnv
    ? {
        write(e, t, n, s, r, o, i) {
          if (typeof document > "u") return;
          const l = [`${e}=${encodeURIComponent(t)}`];
          (v.isNumber(n) && l.push(`expires=${new Date(n).toUTCString()}`),
            v.isString(s) && l.push(`path=${s}`),
            v.isString(r) && l.push(`domain=${r}`),
            o === !0 && l.push("secure"),
            v.isString(i) && l.push(`SameSite=${i}`),
            (document.cookie = l.join("; ")));
        },
        read(e) {
          if (typeof document > "u") return null;
          const t = document.cookie.match(
            new RegExp("(?:^|; )" + e + "=([^;]*)"),
          );
          return t ? decodeURIComponent(t[1]) : null;
        },
        remove(e) {
          this.write(e, "", Date.now() - 864e5, "/");
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function ap(e) {
  return typeof e != "string" ? !1 : /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function fp(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function nu(e, t, n) {
  let s = !ap(t);
  return e && (s || n == !1) ? fp(e, t) : t;
}
const ei = (e) => (e instanceof He ? { ...e } : e);
function Wt(e, t) {
  t = t || {};
  const n = {};
  function s(a, u, f, h) {
    return v.isPlainObject(a) && v.isPlainObject(u)
      ? v.merge.call({ caseless: h }, a, u)
      : v.isPlainObject(u)
        ? v.merge({}, u)
        : v.isArray(u)
          ? u.slice()
          : u;
  }
  function r(a, u, f, h) {
    if (v.isUndefined(u)) {
      if (!v.isUndefined(a)) return s(void 0, a, f, h);
    } else return s(a, u, f, h);
  }
  function o(a, u) {
    if (!v.isUndefined(u)) return s(void 0, u);
  }
  function i(a, u) {
    if (v.isUndefined(u)) {
      if (!v.isUndefined(a)) return s(void 0, a);
    } else return s(void 0, u);
  }
  function l(a, u, f) {
    if (f in t) return s(a, u);
    if (f in e) return s(void 0, a);
  }
  const c = {
    url: o,
    method: o,
    data: o,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    withXSRFToken: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: l,
    headers: (a, u, f) => r(ei(a), ei(u), f, !0),
  };
  return (
    v.forEach(Object.keys({ ...e, ...t }), function (u) {
      if (u === "__proto__" || u === "constructor" || u === "prototype") return;
      const f = v.hasOwnProp(c, u) ? c[u] : r,
        h = f(e[u], t[u], u);
      (v.isUndefined(h) && f !== l) || (n[u] = h);
    }),
    n
  );
}
const su = (e) => {
    const t = Wt({}, e);
    let {
      data: n,
      withXSRFToken: s,
      xsrfHeaderName: r,
      xsrfCookieName: o,
      headers: i,
      auth: l,
    } = t;
    if (
      ((t.headers = i = He.from(i)),
      (t.url = Xl(
        nu(t.baseURL, t.url, t.allowAbsoluteUrls),
        e.params,
        e.paramsSerializer,
      )),
      l &&
        i.set(
          "Authorization",
          "Basic " +
            btoa(
              (l.username || "") +
                ":" +
                (l.password ? unescape(encodeURIComponent(l.password)) : ""),
            ),
        ),
      v.isFormData(n))
    ) {
      if (Fe.hasStandardBrowserEnv || Fe.hasStandardBrowserWebWorkerEnv)
        i.setContentType(void 0);
      else if (v.isFunction(n.getHeaders)) {
        const c = n.getHeaders(),
          a = ["content-type", "content-length"];
        Object.entries(c).forEach(([u, f]) => {
          a.includes(u.toLowerCase()) && i.set(u, f);
        });
      }
    }
    if (
      Fe.hasStandardBrowserEnv &&
      (s && v.isFunction(s) && (s = s(t)), s || (s !== !1 && up(t.url)))
    ) {
      const c = r && o && cp.read(o);
      c && i.set(r, c);
    }
    return t;
  },
  dp = typeof XMLHttpRequest < "u",
  pp =
    dp &&
    function (e) {
      return new Promise(function (n, s) {
        const r = su(e);
        let o = r.data;
        const i = He.from(r.headers).normalize();
        let { responseType: l, onUploadProgress: c, onDownloadProgress: a } = r,
          u,
          f,
          h,
          _,
          m;
        function y() {
          (_ && _(),
            m && m(),
            r.cancelToken && r.cancelToken.unsubscribe(u),
            r.signal && r.signal.removeEventListener("abort", u));
        }
        let w = new XMLHttpRequest();
        (w.open(r.method.toUpperCase(), r.url, !0), (w.timeout = r.timeout));
        function I() {
          if (!w) return;
          const x = He.from(
              "getAllResponseHeaders" in w && w.getAllResponseHeaders(),
            ),
            B = {
              data:
                !l || l === "text" || l === "json"
                  ? w.responseText
                  : w.response,
              status: w.status,
              statusText: w.statusText,
              headers: x,
              config: e,
              request: w,
            };
          (tu(
            function (z) {
              (n(z), y());
            },
            function (z) {
              (s(z), y());
            },
            B,
          ),
            (w = null));
        }
        ("onloadend" in w
          ? (w.onloadend = I)
          : (w.onreadystatechange = function () {
              !w ||
                w.readyState !== 4 ||
                (w.status === 0 &&
                  !(w.responseURL && w.responseURL.indexOf("file:") === 0)) ||
                setTimeout(I);
            }),
          (w.onabort = function () {
            w &&
              (s(new $("Request aborted", $.ECONNABORTED, e, w)), (w = null));
          }),
          (w.onerror = function (N) {
            const B = N && N.message ? N.message : "Network Error",
              pe = new $(B, $.ERR_NETWORK, e, w);
            ((pe.event = N || null), s(pe), (w = null));
          }),
          (w.ontimeout = function () {
            let N = r.timeout
              ? "timeout of " + r.timeout + "ms exceeded"
              : "timeout exceeded";
            const B = r.transitional || $r;
            (r.timeoutErrorMessage && (N = r.timeoutErrorMessage),
              s(
                new $(
                  N,
                  B.clarifyTimeoutError ? $.ETIMEDOUT : $.ECONNABORTED,
                  e,
                  w,
                ),
              ),
              (w = null));
          }),
          o === void 0 && i.setContentType(null),
          "setRequestHeader" in w &&
            v.forEach(i.toJSON(), function (N, B) {
              w.setRequestHeader(B, N);
            }),
          v.isUndefined(r.withCredentials) ||
            (w.withCredentials = !!r.withCredentials),
          l && l !== "json" && (w.responseType = r.responseType),
          a && (([h, m] = cs(a, !0)), w.addEventListener("progress", h)),
          c &&
            w.upload &&
            (([f, _] = cs(c)),
            w.upload.addEventListener("progress", f),
            w.upload.addEventListener("loadend", _)),
          (r.cancelToken || r.signal) &&
            ((u = (x) => {
              w &&
                (s(!x || x.type ? new Vn(null, e, w) : x),
                w.abort(),
                (w = null));
            }),
            r.cancelToken && r.cancelToken.subscribe(u),
            r.signal &&
              (r.signal.aborted
                ? u()
                : r.signal.addEventListener("abort", u))));
        const C = op(r.url);
        if (C && Fe.protocols.indexOf(C) === -1) {
          s(new $("Unsupported protocol " + C + ":", $.ERR_BAD_REQUEST, e));
          return;
        }
        w.send(o || null);
      });
    },
  hp = (e, t) => {
    const { length: n } = (e = e ? e.filter(Boolean) : []);
    if (t || n) {
      let s = new AbortController(),
        r;
      const o = function (a) {
        if (!r) {
          ((r = !0), l());
          const u = a instanceof Error ? a : this.reason;
          s.abort(
            u instanceof $ ? u : new Vn(u instanceof Error ? u.message : u),
          );
        }
      };
      let i =
        t &&
        setTimeout(() => {
          ((i = null), o(new $(`timeout of ${t}ms exceeded`, $.ETIMEDOUT)));
        }, t);
      const l = () => {
        e &&
          (i && clearTimeout(i),
          (i = null),
          e.forEach((a) => {
            a.unsubscribe
              ? a.unsubscribe(o)
              : a.removeEventListener("abort", o);
          }),
          (e = null));
      };
      e.forEach((a) => a.addEventListener("abort", o));
      const { signal: c } = s;
      return ((c.unsubscribe = () => v.asap(l)), c);
    }
  },
  mp = function* (e, t) {
    let n = e.byteLength;
    if (n < t) {
      yield e;
      return;
    }
    let s = 0,
      r;
    for (; s < n; ) ((r = s + t), yield e.slice(s, r), (s = r));
  },
  gp = async function* (e, t) {
    for await (const n of yp(e)) yield* mp(n, t);
  },
  yp = async function* (e) {
    if (e[Symbol.asyncIterator]) {
      yield* e;
      return;
    }
    const t = e.getReader();
    try {
      for (;;) {
        const { done: n, value: s } = await t.read();
        if (n) break;
        yield s;
      }
    } finally {
      await t.cancel();
    }
  },
  ti = (e, t, n, s) => {
    const r = gp(e, t);
    let o = 0,
      i,
      l = (c) => {
        i || ((i = !0), s && s(c));
      };
    return new ReadableStream(
      {
        async pull(c) {
          try {
            const { done: a, value: u } = await r.next();
            if (a) {
              (l(), c.close());
              return;
            }
            let f = u.byteLength;
            if (n) {
              let h = (o += f);
              n(h);
            }
            c.enqueue(new Uint8Array(u));
          } catch (a) {
            throw (l(a), a);
          }
        },
        cancel(c) {
          return (l(c), r.return());
        },
      },
      { highWaterMark: 2 },
    );
  },
  ni = 64 * 1024,
  { isFunction: Wn } = v,
  bp = (({ Request: e, Response: t }) => ({ Request: e, Response: t }))(
    v.global,
  ),
  { ReadableStream: si, TextEncoder: ri } = v.global,
  oi = (e, ...t) => {
    try {
      return !!e(...t);
    } catch {
      return !1;
    }
  },
  _p = (e) => {
    e = v.merge.call({ skipUndefined: !0 }, bp, e);
    const { fetch: t, Request: n, Response: s } = e,
      r = t ? Wn(t) : typeof fetch == "function",
      o = Wn(n),
      i = Wn(s);
    if (!r) return !1;
    const l = r && Wn(si),
      c =
        r &&
        (typeof ri == "function"
          ? (
              (m) => (y) =>
                m.encode(y)
            )(new ri())
          : async (m) => new Uint8Array(await new n(m).arrayBuffer())),
      a =
        o &&
        l &&
        oi(() => {
          let m = !1;
          const y = new si(),
            w = new n(Fe.origin, {
              body: y,
              method: "POST",
              get duplex() {
                return ((m = !0), "half");
              },
            }).headers.has("Content-Type");
          return (y.cancel(), m && !w);
        }),
      u = i && l && oi(() => v.isReadableStream(new s("").body)),
      f = { stream: u && ((m) => m.body) };
    r &&
      ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((m) => {
        !f[m] &&
          (f[m] = (y, w) => {
            let I = y && y[m];
            if (I) return I.call(y);
            throw new $(
              `Response type '${m}' is not supported`,
              $.ERR_NOT_SUPPORT,
              w,
            );
          });
      });
    const h = async (m) => {
        if (m == null) return 0;
        if (v.isBlob(m)) return m.size;
        if (v.isSpecCompliantForm(m))
          return (
            await new n(Fe.origin, { method: "POST", body: m }).arrayBuffer()
          ).byteLength;
        if (v.isArrayBufferView(m) || v.isArrayBuffer(m)) return m.byteLength;
        if ((v.isURLSearchParams(m) && (m = m + ""), v.isString(m)))
          return (await c(m)).byteLength;
      },
      _ = async (m, y) => {
        const w = v.toFiniteNumber(m.getContentLength());
        return w ?? h(y);
      };
    return async (m) => {
      let {
          url: y,
          method: w,
          data: I,
          signal: C,
          cancelToken: x,
          timeout: N,
          onDownloadProgress: B,
          onUploadProgress: pe,
          responseType: z,
          headers: X,
          withCredentials: J = "same-origin",
          fetchOptions: he,
        } = su(m),
        xe = t || fetch;
      z = z ? (z + "").toLowerCase() : "text";
      let Oe = hp([C, x && x.toAbortSignal()], N),
        we = null;
      const Ue =
        Oe &&
        Oe.unsubscribe &&
        (() => {
          Oe.unsubscribe();
        });
      let tt;
      try {
        if (
          pe &&
          a &&
          w !== "get" &&
          w !== "head" &&
          (tt = await _(X, I)) !== 0
        ) {
          let Se = new n(y, { method: "POST", body: I, duplex: "half" }),
            _e;
          if (
            (v.isFormData(I) &&
              (_e = Se.headers.get("content-type")) &&
              X.setContentType(_e),
            Se.body)
          ) {
            const [ut, nt] = Yo(tt, cs(Zo(pe)));
            I = ti(Se.body, ni, ut, nt);
          }
        }
        v.isString(J) || (J = J ? "include" : "omit");
        const Y = o && "credentials" in n.prototype,
          K = {
            ...he,
            signal: Oe,
            method: w.toUpperCase(),
            headers: X.normalize().toJSON(),
            body: I,
            duplex: "half",
            credentials: Y ? J : void 0,
          };
        we = o && new n(y, K);
        let Z = await (o ? xe(we, he) : xe(y, K));
        const Je = u && (z === "stream" || z === "response");
        if (u && (B || (Je && Ue))) {
          const Se = {};
          ["status", "statusText", "headers"].forEach((ct) => {
            Se[ct] = Z[ct];
          });
          const _e = v.toFiniteNumber(Z.headers.get("content-length")),
            [ut, nt] = (B && Yo(_e, cs(Zo(B), !0))) || [];
          Z = new s(
            ti(Z.body, ni, ut, () => {
              (nt && nt(), Ue && Ue());
            }),
            Se,
          );
        }
        z = z || "text";
        let lt = await f[v.findKey(f, z) || "text"](Z, m);
        return (
          !Je && Ue && Ue(),
          await new Promise((Se, _e) => {
            tu(Se, _e, {
              data: lt,
              headers: He.from(Z.headers),
              status: Z.status,
              statusText: Z.statusText,
              config: m,
              request: we,
            });
          })
        );
      } catch (Y) {
        throw (
          Ue && Ue(),
          Y && Y.name === "TypeError" && /Load failed|fetch/i.test(Y.message)
            ? Object.assign(
                new $("Network Error", $.ERR_NETWORK, m, we, Y && Y.response),
                { cause: Y.cause || Y },
              )
            : $.from(Y, Y && Y.code, m, we, Y && Y.response)
        );
      }
    };
  },
  vp = new Map(),
  ru = (e) => {
    let t = (e && e.env) || {};
    const { fetch: n, Request: s, Response: r } = t,
      o = [s, r, n];
    let i = o.length,
      l = i,
      c,
      a,
      u = vp;
    for (; l--; )
      ((c = o[l]),
        (a = u.get(c)),
        a === void 0 && u.set(c, (a = l ? new Map() : _p(t))),
        (u = a));
    return a;
  };
ru();
const Hr = { http: Fd, xhr: pp, fetch: { get: ru } };
v.forEach(Hr, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {}
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const ii = (e) => `- ${e}`,
  wp = (e) => v.isFunction(e) || e === null || e === !1;
function Ep(e, t) {
  e = v.isArray(e) ? e : [e];
  const { length: n } = e;
  let s, r;
  const o = {};
  for (let i = 0; i < n; i++) {
    s = e[i];
    let l;
    if (
      ((r = s),
      !wp(s) && ((r = Hr[(l = String(s)).toLowerCase()]), r === void 0))
    )
      throw new $(`Unknown adapter '${l}'`);
    if (r && (v.isFunction(r) || (r = r.get(t)))) break;
    o[l || "#" + i] = r;
  }
  if (!r) {
    const i = Object.entries(o).map(
      ([c, a]) =>
        `adapter ${c} ` +
        (a === !1
          ? "is not supported by the environment"
          : "is not available in the build"),
    );
    let l = n
      ? i.length > 1
        ? `since :
` +
          i.map(ii).join(`
`)
        : " " + ii(i[0])
      : "as no adapter specified";
    throw new $(
      "There is no suitable adapter to dispatch the request " + l,
      "ERR_NOT_SUPPORT",
    );
  }
  return r;
}
const ou = { getAdapter: Ep, adapters: Hr };
function Qs(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new Vn(null, e);
}
function li(e) {
  return (
    Qs(e),
    (e.headers = He.from(e.headers)),
    (e.data = Js.call(e, e.transformRequest)),
    ["post", "put", "patch"].indexOf(e.method) !== -1 &&
      e.headers.setContentType("application/x-www-form-urlencoded", !1),
    ou
      .getAdapter(
        e.adapter || $n.adapter,
        e,
      )(e)
      .then(
        function (s) {
          return (
            Qs(e),
            (s.data = Js.call(e, e.transformResponse, s)),
            (s.headers = He.from(s.headers)),
            s
          );
        },
        function (s) {
          return (
            eu(s) ||
              (Qs(e),
              s &&
                s.response &&
                ((s.response.data = Js.call(
                  e,
                  e.transformResponse,
                  s.response,
                )),
                (s.response.headers = He.from(s.response.headers)))),
            Promise.reject(s)
          );
        },
      )
  );
}
const iu = "1.15.0",
  Ps = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (e, t) => {
    Ps[e] = function (s) {
      return typeof s === e || "a" + (t < 1 ? "n " : " ") + e;
    };
  },
);
const ui = {};
Ps.transitional = function (t, n, s) {
  function r(o, i) {
    return (
      "[Axios v" +
      iu +
      "] Transitional option '" +
      o +
      "'" +
      i +
      (s ? ". " + s : "")
    );
  }
  return (o, i, l) => {
    if (t === !1)
      throw new $(
        r(i, " has been removed" + (n ? " in " + n : "")),
        $.ERR_DEPRECATED,
      );
    return (
      n &&
        !ui[i] &&
        ((ui[i] = !0),
        console.warn(
          r(
            i,
            " has been deprecated since v" +
              n +
              " and will be removed in the near future",
          ),
        )),
      t ? t(o, i, l) : !0
    );
  };
};
Ps.spelling = function (t) {
  return (n, s) => (console.warn(`${s} is likely a misspelling of ${t}`), !0);
};
function Rp(e, t, n) {
  if (typeof e != "object")
    throw new $("options must be an object", $.ERR_BAD_OPTION_VALUE);
  const s = Object.keys(e);
  let r = s.length;
  for (; r-- > 0; ) {
    const o = s[r],
      i = t[o];
    if (i) {
      const l = e[o],
        c = l === void 0 || i(l, o, e);
      if (c !== !0)
        throw new $("option " + o + " must be " + c, $.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0) throw new $("Unknown option " + o, $.ERR_BAD_OPTION);
  }
}
const Zn = { assertOptions: Rp, validators: Ps },
  Xe = Zn.validators;
let Kt = class {
  constructor(t) {
    ((this.defaults = t || {}),
      (this.interceptors = { request: new Qo(), response: new Qo() }));
  }
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (s) {
      if (s instanceof Error) {
        let r = {};
        Error.captureStackTrace
          ? Error.captureStackTrace(r)
          : (r = new Error());
        const o = (() => {
          if (!r.stack) return "";
          const i = r.stack.indexOf(`
`);
          return i === -1 ? "" : r.stack.slice(i + 1);
        })();
        try {
          if (!s.stack) s.stack = o;
          else if (o) {
            const i = o.indexOf(`
`),
              l =
                i === -1
                  ? -1
                  : o.indexOf(
                      `
`,
                      i + 1,
                    ),
              c = l === -1 ? "" : o.slice(l + 1);
            String(s.stack).endsWith(c) ||
              (s.stack +=
                `
` + o);
          }
        } catch {}
      }
      throw s;
    }
  }
  _request(t, n) {
    (typeof t == "string" ? ((n = n || {}), (n.url = t)) : (n = t || {}),
      (n = Wt(this.defaults, n)));
    const { transitional: s, paramsSerializer: r, headers: o } = n;
    (s !== void 0 &&
      Zn.assertOptions(
        s,
        {
          silentJSONParsing: Xe.transitional(Xe.boolean),
          forcedJSONParsing: Xe.transitional(Xe.boolean),
          clarifyTimeoutError: Xe.transitional(Xe.boolean),
          legacyInterceptorReqResOrdering: Xe.transitional(Xe.boolean),
        },
        !1,
      ),
      r != null &&
        (v.isFunction(r)
          ? (n.paramsSerializer = { serialize: r })
          : Zn.assertOptions(
              r,
              { encode: Xe.function, serialize: Xe.function },
              !0,
            )),
      n.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls !== void 0
          ? (n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
          : (n.allowAbsoluteUrls = !0)),
      Zn.assertOptions(
        n,
        {
          baseUrl: Xe.spelling("baseURL"),
          withXsrfToken: Xe.spelling("withXSRFToken"),
        },
        !0,
      ),
      (n.method = (n.method || this.defaults.method || "get").toLowerCase()));
    let i = o && v.merge(o.common, o[n.method]);
    (o &&
      v.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (m) => {
          delete o[m];
        },
      ),
      (n.headers = He.concat(i, o)));
    const l = [];
    let c = !0;
    this.interceptors.request.forEach(function (y) {
      if (typeof y.runWhen == "function" && y.runWhen(n) === !1) return;
      c = c && y.synchronous;
      const w = n.transitional || $r;
      w && w.legacyInterceptorReqResOrdering
        ? l.unshift(y.fulfilled, y.rejected)
        : l.push(y.fulfilled, y.rejected);
    });
    const a = [];
    this.interceptors.response.forEach(function (y) {
      a.push(y.fulfilled, y.rejected);
    });
    let u,
      f = 0,
      h;
    if (!c) {
      const m = [li.bind(this), void 0];
      for (
        m.unshift(...l), m.push(...a), h = m.length, u = Promise.resolve(n);
        f < h;
      )
        u = u.then(m[f++], m[f++]);
      return u;
    }
    h = l.length;
    let _ = n;
    for (; f < h; ) {
      const m = l[f++],
        y = l[f++];
      try {
        _ = m(_);
      } catch (w) {
        y.call(this, w);
        break;
      }
    }
    try {
      u = li.call(this, _);
    } catch (m) {
      return Promise.reject(m);
    }
    for (f = 0, h = a.length; f < h; ) u = u.then(a[f++], a[f++]);
    return u;
  }
  getUri(t) {
    t = Wt(this.defaults, t);
    const n = nu(t.baseURL, t.url, t.allowAbsoluteUrls);
    return Xl(n, t.params, t.paramsSerializer);
  }
};
v.forEach(["delete", "get", "head", "options"], function (t) {
  Kt.prototype[t] = function (n, s) {
    return this.request(
      Wt(s || {}, { method: t, url: n, data: (s || {}).data }),
    );
  };
});
v.forEach(["post", "put", "patch"], function (t) {
  function n(s) {
    return function (o, i, l) {
      return this.request(
        Wt(l || {}, {
          method: t,
          headers: s ? { "Content-Type": "multipart/form-data" } : {},
          url: o,
          data: i,
        }),
      );
    };
  }
  ((Kt.prototype[t] = n()), (Kt.prototype[t + "Form"] = n(!0)));
});
let Sp = class lu {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function (o) {
      n = o;
    });
    const s = this;
    (this.promise.then((r) => {
      if (!s._listeners) return;
      let o = s._listeners.length;
      for (; o-- > 0; ) s._listeners[o](r);
      s._listeners = null;
    }),
      (this.promise.then = (r) => {
        let o;
        const i = new Promise((l) => {
          (s.subscribe(l), (o = l));
        }).then(r);
        return (
          (i.cancel = function () {
            s.unsubscribe(o);
          }),
          i
        );
      }),
      t(function (o, i, l) {
        s.reason || ((s.reason = new Vn(o, i, l)), n(s.reason));
      }));
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
  }
  unsubscribe(t) {
    if (!this._listeners) return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(),
      n = (s) => {
        t.abort(s);
      };
    return (
      this.subscribe(n),
      (t.signal.unsubscribe = () => this.unsubscribe(n)),
      t.signal
    );
  }
  static source() {
    let t;
    return {
      token: new lu(function (r) {
        t = r;
      }),
      cancel: t,
    };
  }
};
function Ap(e) {
  return function (n) {
    return e.apply(null, n);
  };
}
function xp(e) {
  return v.isObject(e) && e.isAxiosError === !0;
}
const gr = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526,
};
Object.entries(gr).forEach(([e, t]) => {
  gr[t] = e;
});
function uu(e) {
  const t = new Kt(e),
    n = jl(Kt.prototype.request, t);
  return (
    v.extend(n, Kt.prototype, t, { allOwnKeys: !0 }),
    v.extend(n, t, null, { allOwnKeys: !0 }),
    (n.create = function (r) {
      return uu(Wt(e, r));
    }),
    n
  );
}
const ve = uu($n);
ve.Axios = Kt;
ve.CanceledError = Vn;
ve.CancelToken = Sp;
ve.isCancel = eu;
ve.VERSION = iu;
ve.toFormData = Ts;
ve.AxiosError = $;
ve.Cancel = ve.CanceledError;
ve.all = function (t) {
  return Promise.all(t);
};
ve.spread = Ap;
ve.isAxiosError = xp;
ve.mergeConfig = Wt;
ve.AxiosHeaders = He;
ve.formToJSON = (e) => Yl(v.isHTMLForm(e) ? new FormData(e) : e);
ve.getAdapter = ou.getAdapter;
ve.HttpStatusCode = gr;
ve.default = ve;
const {
    Axios: tg,
    AxiosError: ng,
    CanceledError: sg,
    isCancel: rg,
    CancelToken: og,
    VERSION: ig,
    all: lg,
    Cancel: ug,
    isAxiosError: cg,
    spread: ag,
    toFormData: fg,
    AxiosHeaders: dg,
    HttpStatusCode: pg,
    formToJSON: hg,
    getAdapter: mg,
    mergeConfig: gg,
  } = ve,
  Op = ve.create({ withCredentials: !0, timeout: 1e4 });
function Cp(e) {
  var t, n;
  return (n =
    (t = e == null ? void 0 : e.response) == null ? void 0 : t.data) != null &&
    n.message
    ? new Error(e.response.data.message)
    : e != null && e.message
      ? new Error(e.message)
      : new Error("请求失败");
}
async function te(e) {
  try {
    const { data: t } = await Op.request(e);
    if (typeof (t == null ? void 0 : t.code) == "number" && t.code !== 200)
      throw new Error(t.message || "接口返回错误");
    return t == null ? void 0 : t.data;
  } catch (t) {
    throw Cp(t);
  }
}
function Tp(e) {
  return te({ url: "/user/register", method: "post", params: e });
}
function Pp(e) {
  return te({ url: "/user/login", method: "post", params: e });
}
function Np() {
  return te({ url: "/user/logout", method: "post" });
}
function ci() {
  return te({ url: "/user/me", method: "get" });
}
function Ip(e) {
  return te({ url: "/user/update", method: "post", params: e });
}
function Dp(e) {
  return te({ url: "/user/recharge", method: "post", params: { amount: e } });
}
function Lp(e) {
  return te({ url: "/user/search", method: "get", params: { username: e } });
}
function Fp() {
  return te({ url: "/user/follows", method: "get" });
}
function Up() {
  return te({ url: "/user/fans", method: "get" });
}
function Mp(e) {
  return te({ url: "/user/follow", method: "post", params: { followedId: e } });
}
function kp(e) {
  return te({
    url: "/user/unfollow",
    method: "post",
    params: { followedId: e },
  });
}
const Jt = Ba("auth", {
    state: () => ({ user: null, inited: !1, loading: !1 }),
    getters: {
      isLoggedIn: (e) => !!e.user,
      isAdmin: (e) => {
        var t;
        return ((t = e.user) == null ? void 0 : t.role) === "ADMIN";
      },
    },
    actions: {
      async bootstrap() {
        if (!this.inited)
          try {
            this.user = await ci();
          } catch {
            this.user = null;
          } finally {
            this.inited = !0;
          }
      },
      async login(e) {
        this.loading = !0;
        try {
          const t = await Pp(e);
          return ((this.user = t), t);
        } finally {
          this.loading = !1;
        }
      },
      async register(e) {
        this.loading = !0;
        try {
          const t = await Tp(e);
          return ((this.user = t), t);
        } finally {
          this.loading = !1;
        }
      },
      async refreshMe() {
        return ((this.user = await ci()), this.user);
      },
      async logout() {
        try {
          await Np();
        } finally {
          this.user = null;
        }
      },
    },
  }),
  Bp = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [s, r] of t) n[s] = r;
    return n;
  },
  jp = { class: "nav-wrap" },
  $p = { class: "nav-inner" },
  Vp = { class: "row" },
  Hp = { class: "row" },
  qp = {
    __name: "AppNav",
    setup(e) {
      const t = kr(),
        n = Jt(),
        s = Ke(() => {
          const o = [
            { to: "/", label: "首页" },
            { to: "/profile", label: "个人中心" },
            { to: "/my-items", label: "我的商品" },
            { to: "/orders", label: "订单" },
          ];
          return (n.isAdmin && o.push({ to: "/admin", label: "管理端" }), o);
        });
      async function r() {
        (await n.logout(), await t.push("/login"));
      }
      return (o, i) => {
        const l = Xi("RouterLink");
        return (
          q(),
          W("header", jp, [
            g("div", $p, [
              g(
                "div",
                {
                  class: "brand",
                  onClick: i[0] || (i[0] = (c) => o.$router.push("/")),
                },
                "闲鱼平台",
              ),
              g("nav", Vp, [
                (q(!0),
                W(
                  de,
                  null,
                  bt(
                    s.value,
                    (c) => (
                      q(),
                      gl(
                        l,
                        { key: c.to, to: c.to },
                        { default: vn(() => [xn(Q(c.label), 1)]), _: 2 },
                        1032,
                        ["to"],
                      )
                    ),
                  ),
                  128,
                )),
              ]),
              g("div", Hp, [
                Pe(n).isLoggedIn
                  ? (q(),
                    W(
                      de,
                      { key: 0 },
                      [
                        g("span", null, Q(Pe(n).user.username), 1),
                        g(
                          "button",
                          { class: "btn btn-outline", onClick: r },
                          "退出",
                        ),
                      ],
                      64,
                    ))
                  : (q(),
                    W(
                      de,
                      { key: 1 },
                      [
                        Ce(
                          l,
                          { to: "/login" },
                          {
                            default: vn(() => [
                              ...(i[1] || (i[1] = [xn("登录", -1)])),
                            ]),
                            _: 1,
                          },
                        ),
                        Ce(
                          l,
                          { to: "/register" },
                          {
                            default: vn(() => [
                              ...(i[2] || (i[2] = [xn("注册", -1)])),
                            ]),
                            _: 1,
                          },
                        ),
                      ],
                      64,
                    )),
              ]),
            ]),
          ])
        );
      };
    },
  },
  Kp = Bp(qp, [["__scopeId", "data-v-fbfbbf6f"]]),
  Wp = { class: "app-shell" },
  Gp = { class: "page-wrap" },
  zp = {
    __name: "App",
    setup(e) {
      const t = Jt();
      return (
        zt(async () => {
          await t.bootstrap();
        }),
        (n, s) => (q(), W("div", Wp, [Ce(Kp), g("main", Gp, [Ce(Pe(Bl))])]))
      );
    },
  };
function Jp(e) {
  return te({ url: "/admin/register", method: "post", params: e });
}
function Qp(e) {
  return te({ url: "/admin/deleteUser", method: "post", params: { id: e } });
}
function Xp(e) {
  return te({ url: "/admin/deleteItem", method: "post", params: { id: e } });
}
function Yp(e) {
  return te({ url: "/admin/deleteComment", method: "post", params: { id: e } });
}
const Zp = { class: "card" },
  eh = { key: 0, class: "error" },
  th = { class: "grid grid-2" },
  nh = { class: "card" },
  sh = { class: "form-row" },
  rh = { class: "form-row" },
  oh = { class: "card" },
  ih = { class: "form-row" },
  lh = { class: "form-row" },
  uh = { class: "form-row" },
  ch = {
    __name: "AdminView",
    setup(e) {
      const t = ie(""),
        n = Pt({ username: "", password: "" }),
        s = ie(""),
        r = ie(""),
        o = ie("");
      async function i() {
        try {
          (await Jp(n), (t.value = "管理员创建成功"));
        } catch (u) {
          t.value = u.message;
        }
      }
      async function l() {
        try {
          (await Qp(s.value), (t.value = "用户删除成功"));
        } catch (u) {
          t.value = u.message;
        }
      }
      async function c() {
        try {
          (await Xp(r.value), (t.value = "商品删除成功"));
        } catch (u) {
          t.value = u.message;
        }
      }
      async function a() {
        try {
          (await Yp(o.value), (t.value = "评论删除成功"));
        } catch (u) {
          t.value = u.message;
        }
      }
      return (u, f) => (
        q(),
        W(
          de,
          null,
          [
            g("section", Zp, [
              f[5] || (f[5] = g("h1", { class: "title" }, "管理员面板", -1)),
              t.value ? (q(), W("p", eh, Q(t.value), 1)) : Ye("", !0),
            ]),
            g("section", th, [
              g("article", nh, [
                f[8] ||
                  (f[8] = g(
                    "h2",
                    { class: "title", style: { "font-size": "18px" } },
                    "注册管理员",
                    -1,
                  )),
                g("div", sh, [
                  f[6] || (f[6] = g("label", null, "用户名", -1)),
                  ue(
                    g(
                      "input",
                      {
                        "onUpdate:modelValue":
                          f[0] || (f[0] = (h) => (n.username = h)),
                      },
                      null,
                      512,
                    ),
                    [[ce, n.username]],
                  ),
                ]),
                g("div", rh, [
                  f[7] || (f[7] = g("label", null, "密码", -1)),
                  ue(
                    g(
                      "input",
                      {
                        type: "password",
                        "onUpdate:modelValue":
                          f[1] || (f[1] = (h) => (n.password = h)),
                      },
                      null,
                      512,
                    ),
                    [[ce, n.password]],
                  ),
                ]),
                g("button", { class: "btn", onClick: i }, "创建"),
              ]),
              g("article", oh, [
                f[12] ||
                  (f[12] = g(
                    "h2",
                    { class: "title", style: { "font-size": "18px" } },
                    "删除违规内容",
                    -1,
                  )),
                g("div", ih, [
                  f[9] || (f[9] = g("label", null, "用户ID", -1)),
                  ue(
                    g(
                      "input",
                      {
                        "onUpdate:modelValue":
                          f[2] || (f[2] = (h) => (s.value = h)),
                      },
                      null,
                      512,
                    ),
                    [[ce, s.value]],
                  ),
                ]),
                g(
                  "button",
                  { class: "btn btn-outline", onClick: l },
                  "删除用户",
                ),
                g("div", lh, [
                  f[10] || (f[10] = g("label", null, "商品ID", -1)),
                  ue(
                    g(
                      "input",
                      {
                        "onUpdate:modelValue":
                          f[3] || (f[3] = (h) => (r.value = h)),
                      },
                      null,
                      512,
                    ),
                    [[ce, r.value]],
                  ),
                ]),
                g(
                  "button",
                  { class: "btn btn-outline", onClick: c },
                  "删除商品",
                ),
                g("div", uh, [
                  f[11] || (f[11] = g("label", null, "评论ID", -1)),
                  ue(
                    g(
                      "input",
                      {
                        "onUpdate:modelValue":
                          f[4] || (f[4] = (h) => (o.value = h)),
                      },
                      null,
                      512,
                    ),
                    [[ce, o.value]],
                  ),
                ]),
                g(
                  "button",
                  { class: "btn btn-outline", onClick: a },
                  "删除评论",
                ),
              ]),
            ]),
          ],
          64,
        )
      );
    },
  };
function ah() {
  return te({ url: "/items/recommend", method: "get" });
}
function fh(e) {
  return te({ url: "/items/search", method: "get", params: { keyword: e } });
}
function dh(e) {
  return te({ url: "/items/detail", method: "get", params: { id: e } });
}
function ph() {
  return te({ url: "/items/my", method: "get" });
}
function getItemsBySellerId(e) {
  return te({ url: "/items/seller", method: "get", params: { sellerId: e } });
}
function hh(e) {
  return te({ url: "/items/add", method: "post", params: e });
}
function mh(e) {
  return te({ url: "/items/edit", method: "post", params: e });
}
function gh(e) {
  return te({ url: "/items/delete", method: "post", params: { id: e } });
}
function yh(e) {
  return te({ url: "/items/favorite", method: "post", params: { id: e } });
}
function bh(e) {
  return te({ url: "/items/unfavorite", method: "post", params: { id: e } });
}
function _h() {
  return te({ url: "/items/favorite", method: "get" });
}
function vh(e) {
  return te({ url: "/items/comment", method: "get", params: { id: e } });
}
function wh(e, t) {
  return te({
    url: "/items/addComment",
    method: "post",
    params: { id: e, content: t },
  });
}
function deleteItemComment(e) {
  return te({ url: "/items/deleteComment", method: "post", params: { id: e } });
}
const Eh = { class: "card" },
  Rh = { class: "row" },
  Sh = { key: 0, class: "muted" },
  Ah = { key: 1, class: "error" },
  xh = { class: "grid grid-2" },
  Oh = { class: "muted" },
  Ch = { class: "muted" },
  Th = {
    __name: "HomeView",
    setup(e) {
      const t = ie(""),
        n = ie([]),
        s = ie(""),
        r = ie(!1);
      async function o() {
        ((r.value = !0), (s.value = ""));
        try {
          n.value = await ah();
        } catch (l) {
          s.value = l.message;
        } finally {
          r.value = !1;
        }
      }
      async function i() {
        ((r.value = !0), (s.value = ""));
        try {
          n.value = await fh(t.value);
        } catch (l) {
          s.value = l.message;
        } finally {
          r.value = !1;
        }
      }
      return (
        zt(o),
        (l, c) => {
          const a = Xi("RouterLink");
          return (
            q(),
            W(
              de,
              null,
              [
                g("section", Eh, [
                  c[1] || (c[1] = g("h1", { class: "title" }, "商品推荐", -1)),
                  g("div", Rh, [
                    ue(
                      g(
                        "input",
                        {
                          "onUpdate:modelValue":
                            c[0] || (c[0] = (u) => (t.value = u)),
                          placeholder: "搜索商品关键词",
                        },
                        null,
                        512,
                      ),
                      [[ce, t.value, void 0, { trim: !0 }]],
                    ),
                    g("button", { class: "btn", onClick: i }, "搜索"),
                    g(
                      "button",
                      { class: "btn btn-outline", onClick: o },
                      "随机推荐",
                    ),
                  ]),
                  r.value ? (q(), W("p", Sh, "加载中...")) : Ye("", !0),
                  s.value ? (q(), W("p", Ah, Q(s.value), 1)) : Ye("", !0),
                ]),
                g("section", xh, [
                  (q(!0),
                  W(
                    de,
                    null,
                    bt(
                      n.value,
                      (u) => (
                        q(),
                        W("article", { key: u.id, class: "card" }, [
                          g("h3", null, Q(u.title), 1),
                          g("p", Oh, "价格: " + Q(u.price), 1),
                          g("p", Ch, "状态: " + Q(u.status), 1),
                          Ce(
                            a,
                            { to: `/items/${u.id}` },
                            {
                              default: vn(() => [
                                ...(c[2] || (c[2] = [xn("查看详情", -1)])),
                              ]),
                              _: 1,
                            },
                            8,
                            ["to"],
                          ),
                        ])
                      ),
                    ),
                    128,
                  )),
                ]),
              ],
              64,
            )
          );
        }
      );
    },
  };
function Ph() {
  return te({ url: "/orders/buylist", method: "get" });
}
function Nh() {
  return te({ url: "/orders/sellist", method: "get" });
}
function Ih(e) {
  return te({ url: "/orders/create", method: "post", params: e });
}
function Dh(e) {
  return te({ url: "/orders/delete", method: "post", params: { itemId: e } });
}
function Lh(e) {
  return te({ url: "/orders/pay", method: "post", params: { orderId: e } });
}
function Fh(e) {
  return te({ url: "/orders/cancel", method: "post", params: { orderId: e } });
}
const Uh = { key: 0, class: "card" },
  Mh = { class: "title" },
  kh = { class: "muted" },
  Bh = { class: "muted" },
  jh = { key: 0, class: "row" },
  $h = { key: 1, class: "error" },
  Vh = { class: "card" },
  Hh = { key: 0, class: "form-row" },
  qh = { class: "muted" },
  Kh = {
    __name: "ItemDetailView",
    props: { id: { type: [String, Number], required: !0 } },
    setup(e) {
      const t = e,
        n = Jt(),
        s = ie(null),
        r = ie([]),
        o = ie(""),
        i = ie(""),
        E = ie(!1),
        S = ie(!1);
      async function l() {
        i.value = "";
        try {
          if (((s.value = await dh(t.id)), (r.value = await vh(t.id)), n.isLoggedIn)) {
            const [m, y] = await Promise.all([
              _h().catch(() => []),
              Fp().catch(() => []),
            ]);
            ((E.value = Array.isArray(m) && m.some((w) => String(w.id) === String(t.id))),
              (S.value =
                !!s.value &&
                Array.isArray(y) &&
                y.some((w) => String(w.id) === String(s.value.sellerId))));
          } else (E.value = !1), (S.value = !1);
        } catch (m) {
          i.value = m.message;
        }
      }
      async function c() {
        try {
          (await yh(t.id), (E.value = !0), (i.value = "\u6536\u85cf\u6210\u529f"));
        } catch (m) {
          i.value = m.message;
        }
      }
      async function a() {
        try {
          (await bh(t.id),
            (E.value = !1),
            (i.value = "\u53d6\u6d88\u6536\u85cf\u6210\u529f"));
        } catch (m) {
          i.value = m.message;
        }
      }
      async function u() {
        try {
          (await wh(t.id, o.value), (o.value = ""), await l());
        } catch (m) {
          i.value = m.message;
        }
      }
      async function p(m) {
        try {
          (await (n.isAdmin ? Yp(m) : deleteItemComment(m)),
            (i.value = "\u5220\u9664\u8bc4\u8bba\u6210\u529f"),
            await l());
        } catch (y) {
          i.value = y.message;
        }
      }
      async function T() {
        if (!s.value) return;
        try {
          await Xp(s.value.id),
            (i.value = "\u5546\u54c1\u5220\u9664\u6210\u529f"),
            (window.location.href = "/");
        } catch (m) {
          i.value = m.message;
        }
      }
      async function f() {
        if (s.value)
          try {
            (await Mp(s.value.sellerId),
              (S.value = !0),
              (i.value = "\u5173\u6ce8\u6210\u529f"));
          } catch (m) {
            i.value = m.message;
          }
      }
      async function h() {
        if (s.value)
          try {
            (await kp(s.value.sellerId),
              (S.value = !1),
              (i.value = "\u53d6\u6d88\u5173\u6ce8\u6210\u529f"));
          } catch (m) {
            i.value = m.message;
          }
      }
      async function _() {
        if (!(!s.value || !n.user))
          try {
            (await Ih({ itemId: s.value.id, sellerId: s.value.sellerId }),
              (i.value = "下单成功，请到订单页支付"));
          } catch (m) {
            i.value = m.message;
          }
      }
      return (
        zt(l),
        (m, y) => (
          q(),
          W(
            de,
            null,
            [
              s.value
                ? (q(),
                  W("section", Uh, [
                    g("h1", Mh, Q(s.value.title), 1),
                    g("p", null, Q(s.value.description), 1),
                    g("p", kh, "价格: " + Q(s.value.price), 1),
                    g("p", Bh, "??: " + Q(s.value.sellerUsername || s.value.sellerId), 1),
                    Pe(n).isLoggedIn
                      ? (q(),
                        W("div", jh, [
                           E.value
                            ? (q(),
                              W(
                                "button",
                                { class: "btn btn-outline", onClick: a },
                                "\u53d6\u6d88\u6536\u85cf",
                              ))
                            : (q(),
                              W(
                                "button",
                                { class: "btn", onClick: c },
                                "\u6536\u85cf",
                              )),
                          S.value
                            ? (q(),
                              W(
                                "button",
                                { class: "btn btn-outline", onClick: h },
                                "\u53d6\u6d88\u5173\u6ce8",
                              ))
                            : (q(),
                              W(
                                "button",
                                { class: "btn", onClick: f },
                                "\u5173\u6ce8\u5356\u5bb6",
                              )),
                          Pe(n).isAdmin
                            ? (q(),
                              W(
                                "button",
                                { class: "btn btn-outline", onClick: T },
                                "\u5220\u9664\u5546\u54c1",
                              ))
                            : Ye("", !0),
                          g("button", { class: "btn", onClick: _ }, "\u7acb\u5373\u4e0b\u5355"),
                        ]))
                      : Ye("", !0),
                    i.value ? (q(), W("p", $h, Q(i.value), 1)) : Ye("", !0),
                  ]))
                : Ye("", !0),
              g("section", Vh, [
                y[1] ||
                  (y[1] = g(
                    "h2",
                    { class: "title", style: { "font-size": "18px" } },
                    "评论",
                    -1,
                  )),
                Pe(n).isLoggedIn
                  ? (q(),
                    W("div", Hh, [
                      ue(
                        g(
                          "textarea",
                          {
                            "onUpdate:modelValue":
                              y[0] || (y[0] = (w) => (o.value = w)),
                            rows: "3",
                            placeholder: "写点评论",
                          },
                          null,
                          512,
                        ),
                        [[ce, o.value]],
                      ),
                      g("button", { class: "btn", onClick: u }, "提交评论"),
                    ]))
                  : Ye("", !0),
                (q(!0),
                W(
                  de,
                  null,
                  bt(
                    r.value,
                    (w) => (
                      q(),
                      W(
                        "div",
                        {
                          key: w.id,
                          class: "card",
                          style: { margin: "8px 0" },
                        },
                        [
                          g("p", null, Q(w.comment), 1),
                          g(
                            "div",
                            {
                              class: "row",
                              style: {
                                "justify-content": "space-between",
                                "align-items": "center",
                                gap: "8px",
                              },
                            },
                            [
                              g("p", qh, "??: " + Q(w.username || w.userId), 1),
                              Pe(n).isLoggedIn &&
                              (Pe(n).isAdmin ||
                                (Pe(n).user &&
                                  String(Pe(n).user.id) === String(w.userId)))
                                ? (q(),
                                  W(
                                    "button",
                                    {
                                      key: 0,
                                      class: "btn btn-outline",
                                      onClick: (I) => p(w.id),
                                    },
                                    "\u5220\u9664",
                                  ))
                                : Ye("", !0),
                            ],
                          ),
                        ],
                      )
                    ),
                  ),
                  128,
                )),
              ]),
            ],
            64,
          )
        )
      );
    },
  },
  Wh = { class: "card", style: { "max-width": "420px", margin: "30px auto" } },
  Gh = { class: "form-row" },
  zh = { class: "form-row" },
  Jh = { key: 0, class: "error" },
  Qh = ["disabled"],
  Xh = {
    __name: "LoginView",
    setup(e) {
      const t = kr(),
        n = Wf(),
        s = Jt(),
        r = ie({ username: "", password: "" }),
        o = ie("");
      async function i() {
        o.value = "";
        try {
          (await s.login(r.value), await t.push(n.query.redirect || "/"));
        } catch (l) {
          o.value = l.message;
        }
      }
      return (l, c) => (
        q(),
        W("section", Wh, [
          c[4] || (c[4] = g("h1", { class: "title" }, "登录", -1)),
          g("div", Gh, [
            c[2] || (c[2] = g("label", null, "用户名", -1)),
            ue(
              g(
                "input",
                {
                  "onUpdate:modelValue":
                    c[0] || (c[0] = (a) => (r.value.username = a)),
                  placeholder: "请输入用户名",
                },
                null,
                512,
              ),
              [[ce, r.value.username, void 0, { trim: !0 }]],
            ),
          ]),
          g("div", zh, [
            c[3] || (c[3] = g("label", null, "密码", -1)),
            ue(
              g(
                "input",
                {
                  "onUpdate:modelValue":
                    c[1] || (c[1] = (a) => (r.value.password = a)),
                  type: "password",
                  placeholder: "请输入密码",
                },
                null,
                512,
              ),
              [[ce, r.value.password, void 0, { trim: !0 }]],
            ),
          ]),
          o.value ? (q(), W("p", Jh, Q(o.value), 1)) : Ye("", !0),
          g(
            "button",
            { class: "btn", disabled: Pe(s).loading, onClick: i },
            "登录",
            8,
            Qh,
          ),
        ])
      );
    },
  },
  Yh = { class: "card" },
  Zh = { class: "form-row" },
  em = { class: "form-row" },
  tm = { class: "form-row" },
  nm = { class: "form-row" },
  sm = { class: "card" },
  rm = { class: "grid grid-2" },
  om = { class: "form-row" },
  im = { class: "form-row" },
  lm = { class: "form-row" },
  um = { class: "form-row" },
  cm = { class: "form-row" },
  am = { class: "form-row" },
  fm = { class: "form-row" },
  dm = { class: "card" },
  pm = { key: 0, class: "error" },
  hm = ["onClick"],
  mm = {
    __name: "MyItemsView",
    setup(e) {
      const t = ie([]),
        n = ie(""),
        s = Pt({ title: "", description: "", price: 0, coverImage: "" }),
        r = Pt({
          id: "",
          title: "",
          description: "",
          price: 0,
          stock: 1,
          status: "ON_SALE",
          coverImage: "",
        });
      async function o() {
        n.value = "";
        try {
          t.value = await ph();
        } catch (a) {
          n.value = a.message;
        }
      }
      async function i() {
        try {
          const u = "\u53d1\u5e03\u6210\u529f";
          await hh(s);
          n.value = u;
          await o();
          window.alert(u);
        } catch (a) {
          n.value = a.message;
        }
      }
      async function l() {
        try {
          (await mh(r), (n.value = "更新成功"), await o());
        } catch (a) {
          n.value = a.message;
        }
      }
      async function c(a) {
        try {
          (await gh(a), (n.value = "删除成功"), await o());
        } catch (u) {
          n.value = u.message;
        }
      }
      return (
        zt(o),
        (a, u) => (
          q(),
          W(
            de,
            null,
            [
              g("section", Yh, [
                u[15] || (u[15] = g("h1", { class: "title" }, "发布商品", -1)),
                g("div", Zh, [
                  u[11] || (u[11] = g("label", null, "标题", -1)),
                  ue(
                    g(
                      "input",
                      {
                        "onUpdate:modelValue":
                          u[0] || (u[0] = (f) => (s.title = f)),
                      },
                      null,
                      512,
                    ),
                    [[ce, s.title]],
                  ),
                ]),
                g("div", em, [
                  u[12] || (u[12] = g("label", null, "描述", -1)),
                  ue(
                    g(
                      "textarea",
                      {
                        "onUpdate:modelValue":
                          u[1] || (u[1] = (f) => (s.description = f)),
                      },
                      null,
                      512,
                    ),
                    [[ce, s.description]],
                  ),
                ]),
                g("div", tm, [
                  u[13] || (u[13] = g("label", null, "价格", -1)),
                  ue(
                    g(
                      "input",
                      {
                        "onUpdate:modelValue":
                          u[2] || (u[2] = (f) => (s.price = f)),
                        type: "number",
                        min: "0",
                      },
                      null,
                      512,
                    ),
                    [[ce, s.price, void 0, { number: !0 }]],
                  ),
                ]),
                g("div", nm, [
                  u[14] || (u[14] = g("label", null, "封面 URL", -1)),
                  ue(
                    g(
                      "input",
                      {
                        "onUpdate:modelValue":
                          u[3] || (u[3] = (f) => (s.coverImage = f)),
                      },
                      null,
                      512,
                    ),
                    [[ce, s.coverImage]],
                  ),
                ]),
                g("button", { class: "btn", onClick: i }, "发布"),
              ]),
              g("section", sm, [
                u[23] ||
                  (u[23] = g(
                    "h2",
                    { class: "title", style: { "font-size": "18px" } },
                    "编辑商品",
                    -1,
                  )),
                g("div", rm, [
                  g("div", om, [
                    u[16] || (u[16] = g("label", null, "商品ID", -1)),
                    ue(
                      g(
                        "input",
                        {
                          "onUpdate:modelValue":
                            u[4] || (u[4] = (f) => (r.id = f)),
                        },
                        null,
                        512,
                      ),
                      [[ce, r.id]],
                    ),
                  ]),
                  g("div", im, [
                    u[17] || (u[17] = g("label", null, "标题", -1)),
                    ue(
                      g(
                        "input",
                        {
                          "onUpdate:modelValue":
                            u[5] || (u[5] = (f) => (r.title = f)),
                        },
                        null,
                        512,
                      ),
                      [[ce, r.title]],
                    ),
                  ]),
                  g("div", lm, [
                    u[18] || (u[18] = g("label", null, "描述", -1)),
                    ue(
                      g(
                        "input",
                        {
                          "onUpdate:modelValue":
                            u[6] || (u[6] = (f) => (r.description = f)),
                        },
                        null,
                        512,
                      ),
                      [[ce, r.description]],
                    ),
                  ]),
                  g("div", um, [
                    u[19] || (u[19] = g("label", null, "价格", -1)),
                    ue(
                      g(
                        "input",
                        {
                          type: "number",
                          "onUpdate:modelValue":
                            u[7] || (u[7] = (f) => (r.price = f)),
                          min: "0",
                        },
                        null,
                        512,
                      ),
                      [[ce, r.price, void 0, { number: !0 }]],
                    ),
                  ]),
                  g("div", cm, [
                    u[20] || (u[20] = g("label", null, "库存", -1)),
                    ue(
                      g(
                        "input",
                        {
                          type: "number",
                          "onUpdate:modelValue":
                            u[8] || (u[8] = (f) => (r.stock = f)),
                          min: "1",
                        },
                        null,
                        512,
                      ),
                      [[ce, r.stock, void 0, { number: !0 }]],
                    ),
                  ]),
                  g("div", am, [
                    u[21] || (u[21] = g("label", null, "状态", -1)),
                    ue(
                      g(
                        "input",
                        {
                          "onUpdate:modelValue":
                            u[9] || (u[9] = (f) => (r.status = f)),
                          placeholder: "ON_SALE / SOLD",
                        },
                        null,
                        512,
                      ),
                      [[ce, r.status]],
                    ),
                  ]),
                  g("div", fm, [
                    u[22] || (u[22] = g("label", null, "封面 URL", -1)),
                    ue(
                      g(
                        "input",
                        {
                          "onUpdate:modelValue":
                            u[10] || (u[10] = (f) => (r.coverImage = f)),
                        },
                        null,
                        512,
                      ),
                      [[ce, r.coverImage]],
                    ),
                  ]),
                ]),
                g("button", { class: "btn", onClick: l }, "提交编辑"),
              ]),
              g("section", dm, [
                u[24] ||
                  (u[24] = g(
                    "h2",
                    { class: "title", style: { "font-size": "18px" } },
                    "我的商品",
                    -1,
                  )),
                n.value ? (q(), W("p", pm, Q(n.value), 1)) : Ye("", !0),
                (q(!0),
                W(
                  de,
                  null,
                  bt(
                    t.value,
                    (f) => (
                      q(),
                      W(
                        "div",
                        {
                          key: f.id,
                          class: "row",
                          style: {
                            "justify-content": "space-between",
                            margin: "8px 0",
                          },
                        },
                        [
                          g(
                            "span",
                            null,
                            Q(f.id) + " - " + Q(f.title) + " - " + Q(f.price),
                            1,
                          ),
                          g("div", { class: "row", style: { gap: "8px" } }, [
                            g(
                              "button",
                              {
                                class: "btn",
                                onClick: (h) =>
                                  a.$router.push(`/items/${f.id}`),
                              },
                              "\u67e5\u770b\u8be6\u60c5",
                              8,
                              hm,
                            ),
                            g(
                              "button",
                              {
                                class: "btn btn-outline",
                                onClick: (h) => c(f.id),
                              },
                              "\u5220\u9664",
                              8,
                              hm,
                            ),
                          ]),
                        ],
                      )
                    ),
                  ),
                  128,
                )),
              ]),
            ],
            64,
          )
        )
      );
    },
  },
  gm = { class: "card" },
  ym = { key: 0, class: "error" },
  bm = { class: "grid grid-2" },
  _m = { class: "card" },
  vm = { class: "muted" },
  wm = { class: "row" },
  Em = ["onClick"],
  Rm = ["onClick"],
  Sm = ["onClick"],
  Am = { class: "card" },
  xm = { class: "muted" },
  Om = {
    __name: "OrdersView",
    setup(e) {
      const t = ie([]),
        n = ie([]),
        s = ie("");
      async function r() {
        s.value = "";
        try {
          ((t.value = await Ph()), (n.value = await Nh()));
        } catch (c) {
          s.value = c.message;
        }
      }
      async function o(c) {
        try {
          (await Lh(c), await r());
        } catch (a) {
          s.value = a.message;
        }
      }
      async function i(c) {
        try {
          (await Fh(c), await r());
        } catch (a) {
          s.value = a.message;
        }
      }
      async function l(c) {
        try {
          (await Dh(c), await r());
        } catch (a) {
          s.value = a.message;
        }
      }
      return (
        zt(r),
        (c, a) => (
          q(),
          W(
            de,
            null,
            [
              g("section", gm, [
                a[0] || (a[0] = g("h1", { class: "title" }, "订单中心", -1)),
                s.value ? (q(), W("p", ym, Q(s.value), 1)) : Ye("", !0),
              ]),
              g("section", bm, [
                g("article", _m, [
                  a[1] ||
                    (a[1] = g(
                      "h2",
                      { class: "title", style: { "font-size": "18px" } },
                      "我买到的",
                      -1,
                    )),
                  (q(!0),
                  W(
                    de,
                    null,
                    bt(
                      t.value,
                      (u) => (
                        q(),
                        W(
                          "div",
                          {
                            key: u.id,
                            class: "card",
                            style: { margin: "8px 0" },
                          },
                          [
                            g(
                              "p",
                              null,
                              "订单ID: " +
                                Q(u.id) +
                                " | " +
                                Q(u.itemTitle) +
                                " | " +
                                Q(u.amount),
                              1,
                            ),
                            g("p", vm, "状态: " + Q(u.status), 1),
                            g("div", wm, [
                              g(
                                "button",
                                { class: "btn", onClick: (f) => o(u.id) },
                                "支付",
                                8,
                                Em,
                              ),
                              g(
                                "button",
                                {
                                  class: "btn btn-outline",
                                  onClick: (f) => i(u.id),
                                },
                                "取消",
                                8,
                                Rm,
                              ),
                              g(
                                "button",
                                {
                                  class: "btn btn-outline",
                                  onClick: (f) => l(u.itemId),
                                },
                                "删除",
                                8,
                                Sm,
                              ),
                            ]),
                          ],
                        )
                      ),
                    ),
                    128,
                  )),
                ]),
                g("article", Am, [
                  a[2] ||
                    (a[2] = g(
                      "h2",
                      { class: "title", style: { "font-size": "18px" } },
                      "我卖出的",
                      -1,
                    )),
                  (q(!0),
                  W(
                    de,
                    null,
                    bt(
                      n.value,
                      (u) => (
                        q(),
                        W(
                          "div",
                          {
                            key: u.id,
                            class: "card",
                            style: { margin: "8px 0" },
                          },
                          [
                            g(
                              "p",
                              null,
                              "订单ID: " +
                                Q(u.id) +
                                " | " +
                                Q(u.itemTitle) +
                                " | " +
                                Q(u.amount),
                              1,
                            ),
                            g(
                              "p",
                              xm,
                              "买家: " +
                                Q(u.buyerName) +
                                " | 状态: " +
                                Q(u.status),
                              1,
                            ),
                          ],
                        )
                      ),
                    ),
                    128,
                  )),
                ]),
              ]),
            ],
            64,
          )
        )
      );
    },
  },
  Cm = { class: "card" },
  Tm = { key: 0, class: "error" },
  Pm = { class: "card" },
  Nm = { class: "grid grid-2" },
  Im = { class: "form-row" },
  Dm = { class: "form-row" },
  Lm = { class: "form-row" },
  Fm = { class: "form-row" },
  Um = { class: "card" },
  Mm = { class: "row" },
  km = { class: "card" },
  Bm = { class: "row" },
  jm = { class: "grid grid-2" },
  $m = { class: "card" },
  Vm = { class: "card" },
  Hm = { class: "card" },
  udm = { class: "card" },
  udn = { class: "muted" },
  qm = {
    __name: "ProfileView",
    setup(e) {
      const t = Jt(),
        n = ie(""),
        s = Pt({ username: "", email: "", phone: "", information: "" }),
        r = ie([]),
        o = ie([]),
        i = ie([]),
        l = ie(0),
        c = ie(""),
        a = ie([]),
        u = ie(null),
        f = ie([]),
        h = ie(""),
        _ = ie(!1);
      async function m() {
        ((r.value = await Fp()),
          (o.value = await Up()),
          (i.value = await _h()));
      }
      async function y() {
        n.value = "";
        try {
          (await Ip(s), await t.refreshMe(), (n.value = "\u8d44\u6599\u66f4\u65b0\u6210\u529f"));
        } catch (C) {
          n.value = C.message;
        }
      }
      async function w() {
        try {
          (await Dp(l.value),
            await t.refreshMe(),
            (n.value = "\u5145\u503c\u6210\u529f"));
        } catch (C) {
          n.value = C.message;
        }
      }
      async function I() {
        try {
          a.value = await Lp(c.value);
        } catch (C) {
          n.value = C.message;
        }
      }
      async function x(C) {
        if (!C || !C.id) return;
        ((u.value = C), (h.value = ""), (_.value = !0));
        try {
          f.value = await getItemsBySellerId(C.id);
        } catch (j) {
          ((h.value = j.message), (f.value = []));
        } finally {
          _.value = !1;
        }
      }
      async function N() {
        if (!u.value || !u.value.id) return;
        try {
          await Qp(u.value.id),
            (n.value = "\u7528\u6237\u5220\u9664\u6210\u529f"),
            (a.value = a.value.filter((C) => String(C.id) !== String(u.value.id))),
            (r.value = r.value.filter((C) => String(C.id) !== String(u.value.id))),
            (o.value = o.value.filter((C) => String(C.id) !== String(u.value.id))),
            (u.value = null),
            (f.value = []),
            (h.value = ""),
            await m();
        } catch (C) {
          n.value = C.message;
        }
      }
      return (
        zt(async () => {
          var C, j;
          try {
            (await t.refreshMe(),
              (s.username = ((C = t.user) == null ? void 0 : C.username) || ""),
              (s.information =
                ((j = t.user) == null ? void 0 : j.information) || ""),
              await m());
          } catch (k) {
            n.value = k.message;
          }
        }),
        (C, j) => {
          var k, z, O;
          return (
            q(),
            W(
              de,
              null,
              [
                g("section", Cm, [
                  j[6] ||
                    (j[6] = g(
                      "h1",
                      { class: "title" },
                      "\u4e2a\u4eba\u4e2d\u5fc3",
                      -1,
                    )),
                  g(
                    "p",
                    null,
                    "\u5f53\u524d\u7528\u6237: " +
                      Q((k = Pe(t).user) == null ? void 0 : k.username) +
                      " (" +
                      Q((z = Pe(t).user) == null ? void 0 : z.role) +
                      ")",
                    1,
                  ),
                  g(
                    "p",
                    null,
                    "\u94b1\u5305\u4f59\u989d: " +
                      Q((O = Pe(t).user) == null ? void 0 : O.wallet),
                    1,
                  ),
                  n.value ? (q(), W("p", Tm, Q(n.value), 1)) : Ye("", !0),
                ]),
                g("section", Pm, [
                  j[11] ||
                    (j[11] = g(
                      "h2",
                      { class: "title", style: { "font-size": "18px" } },
                      "\u4e2a\u4eba\u8d44\u6599",
                      -1,
                    )),
                  g("div", Nm, [
                    g("div", Im, [
                      j[7] ||
                        (j[7] = g("label", null, "\u7528\u6237\u540d", -1)),
                      ue(
                        g(
                          "input",
                          {
                            "onUpdate:modelValue":
                              j[0] || (j[0] = (A) => (s.username = A)),
                          },
                          null,
                          512,
                        ),
                        [[ce, s.username]],
                      ),
                    ]),
                    g("div", Dm, [
                      j[8] || (j[8] = g("label", null, "\u90ae\u7bb1", -1)),
                      ue(
                        g(
                          "input",
                          {
                            "onUpdate:modelValue":
                              j[1] || (j[1] = (A) => (s.email = A)),
                          },
                          null,
                          512,
                        ),
                        [[ce, s.email]],
                      ),
                    ]),
                    g("div", Lm, [
                      j[9] ||
                        (j[9] = g("label", null, "\u624b\u673a\u53f7", -1)),
                      ue(
                        g(
                          "input",
                          {
                            "onUpdate:modelValue":
                              j[2] || (j[2] = (A) => (s.phone = A)),
                          },
                          null,
                          512,
                        ),
                        [[ce, s.phone]],
                      ),
                    ]),
                    g("div", Fm, [
                      j[10] || (j[10] = g("label", null, "\u7b80\u4ecb", -1)),
                      ue(
                        g(
                          "input",
                          {
                            "onUpdate:modelValue":
                              j[3] || (j[3] = (A) => (s.information = A)),
                          },
                          null,
                          512,
                        ),
                        [[ce, s.information]],
                      ),
                    ]),
                  ]),
                  g(
                    "button",
                    { class: "btn", onClick: y },
                    "\u4fdd\u5b58",
                  ),
                ]),
                g("section", Um, [
                  j[12] ||
                    (j[12] = g(
                      "h2",
                      { class: "title", style: { "font-size": "18px" } },
                      "\u94b1\u5305\u5145\u503c",
                      -1,
                    )),
                  g("div", Mm, [
                    ue(
                      g(
                        "input",
                        {
                          type: "number",
                          min: "0",
                          "onUpdate:modelValue":
                            j[4] || (j[4] = (A) => (l.value = A)),
                        },
                        null,
                        512,
                      ),
                      [[ce, l.value, void 0, { number: !0 }]],
                    ),
                    g(
                      "button",
                      { class: "btn", onClick: w },
                      "\u5145\u503c",
                    ),
                  ]),
                ]),
                g("section", km, [
                  j[13] ||
                    (j[13] = g(
                      "h2",
                      { class: "title", style: { "font-size": "18px" } },
                      "\u641c\u7d22\u7528\u6237",
                      -1,
                    )),
                  g("div", Bm, [
                    ue(
                      g(
                        "input",
                        {
                          "onUpdate:modelValue":
                            j[5] || (j[5] = (A) => (c.value = A)),
                          placeholder: "\u8f93\u5165\u7528\u6237\u540d",
                        },
                        null,
                        512,
                      ),
                      [[ce, c.value]],
                    ),
                    g(
                      "button",
                      { class: "btn", onClick: I },
                      "\u641c\u7d22",
                    ),
                  ]),
                  (q(!0),
                  W(
                    de,
                    null,
                    bt(
                      a.value,
                      (A) => (
                        q(),
                        W(
                          "div",
                          {
                            key: A.id,
                            class: "row",
                            style: {
                              "justify-content": "space-between",
                              margin: "6px 0",
                            },
                          },
                          [
                            g("span", null, Q(A.id) + " - " + Q(A.username), 1),
                            g(
                              "button",
                              {
                                class: "btn btn-outline",
                                onClick: (B) => x(A),
                              },
                              "\u67e5\u770b\u7528\u6237",
                              8,
                              hm,
                            ),
                          ],
                        )
                      ),
                    ),
                    128,
                  )),
                ]),
                g("section", jm, [
                  g("article", $m, [
                    j[14] ||
                      (j[14] = g("h3", null, "\u6211\u7684\u5173\u6ce8", -1)),
                    (q(!0),
                    W(
                      de,
                      null,
                      bt(
                        r.value,
                        (A) => (
                          q(),
                          W(
                            "div",
                            {
                              key: A.id,
                              class: "row",
                              style: {
                                "justify-content": "space-between",
                                margin: "6px 0",
                              },
                            },
                            [
                              g("span", null, Q(A.username), 1),
                              g(
                                "button",
                                {
                                  class: "btn btn-outline",
                                  onClick: (B) => x(A),
                                },
                                "\u67e5\u770b\u8be6\u60c5",
                                8,
                                hm,
                              ),
                            ],
                          )
                        ),
                      ),
                      128,
                    )),
                  ]),
                  g("article", Vm, [
                    j[15] ||
                      (j[15] = g("h3", null, "\u6211\u7684\u7c89\u4e1d", -1)),
                    (q(!0),
                    W(
                      de,
                      null,
                      bt(
                        o.value,
                        (A) => (
                          q(),
                          W(
                            "div",
                            {
                              key: A.id,
                              class: "row",
                              style: {
                                "justify-content": "space-between",
                                margin: "6px 0",
                              },
                            },
                            [
                              g("span", null, Q(A.username), 1),
                              g(
                                "button",
                                {
                                  class: "btn btn-outline",
                                  onClick: (B) => x(A),
                                },
                                "\u67e5\u770b\u8be6\u60c5",
                                8,
                                hm,
                              ),
                            ],
                          )
                        ),
                      ),
                      128,
                    )),
                  ]),
                ]),
                g("section", udm, [
                  j[17] ||
                    (j[17] = g(
                      "h3",
                      null,
                      "\u7528\u6237\u8be6\u60c5",
                      -1,
                    )),
                  u.value
                    ? (q(),
                      W(
                        de,
                        { key: 0 },
                        [
                          g("p", null, "ID: " + Q(u.value.id), 1),
                          g(
                            "p",
                            null,
                            "\u7528\u6237\u540d: " + Q(u.value.username),
                            1,
                          ),
                          g(
                            "p",
                            null,
                            "\u89d2\u8272: " + Q(u.value.role),
                            1,
                          ),
                          g(
                            "p",
                            null,
                            "\u7b80\u4ecb: " + Q(u.value.information || "-"),
                            1,
                          ),
                          Pe(t).isAdmin
                            ? (q(),
                              W(
                                "button",
                                {
                                  key: 1,
                                  class: "btn btn-outline",
                                  onClick: N,
                                },
                                "\u5220\u9664\u7528\u6237",
                              ))
                            : Ye("", !0),
                          _.value
                            ? (q(),
                              W(
                                "p",
                                udn,
                                "\u6b63\u5728\u52a0\u8f7d\u8be5\u7528\u6237\u7684\u5546\u54c1...",
                              ))
                            : Ye("", !0),
                          h.value
                            ? (q(), W("p", Tm, Q(h.value), 1))
                            : Ye("", !0),
                          (q(!0),
                          W(
                            de,
                            null,
                            bt(
                              f.value,
                              (A) => (
                                q(),
                                W(
                                  "div",
                                  {
                                    key: A.id,
                                    class: "row",
                                    style: {
                                      "justify-content": "space-between",
                                      margin: "6px 0",
                                    },
                                  },
                                  [
                                    g(
                                      "span",
                                      null,
                                      Q(A.title) + " - " + Q(A.price),
                                      1,
                                    ),
                                    g(
                                      "button",
                                      {
                                        class: "btn btn-outline",
                                        onClick: (B) =>
                                          C.$router.push("/items/" + A.id),
                                      },
                                      "\u67e5\u770b\u5546\u54c1",
                                      8,
                                      hm,
                                    ),
                                  ],
                                )
                              ),
                            ),
                            128,
                          )),
                        ],
                        64,
                      ))
                    : (q(),
                      W(
                        "p",
                        udn,
                        "\u8bf7\u5148\u4ece\u5173\u6ce8\u3001\u7c89\u4e1d\u6216\u641c\u7d22\u7ed3\u679c\u4e2d\u9009\u62e9\u4e00\u4e2a\u7528\u6237\u3002",
                      )),
                ]),
                g("section", Hm, [
                  j[16] ||
                    (j[16] = g("h3", null, "\u6211\u7684\u6536\u85cf", -1)),
                  (q(!0),
                  W(
                    de,
                    null,
                    bt(
                      i.value,
                      (A) => (
                        q(),
                        W(
                          "div",
                          { key: A.id },
                          Q(A.title) + " - " + Q(A.price),
                          1,
                        )
                      ),
                    ),
                    128,
                  )),
                ]),
              ],
              64,
            )
          );
        }
      );
    },
  },
  Km = { class: "card", style: { "max-width": "420px", margin: "30px auto" } },
  Wm = { class: "form-row" },
  Gm = { class: "form-row" },
  zm = { key: 0, class: "error" },
  Jm = ["disabled"],
  Qm = {
    __name: "RegisterView",
    setup(e) {
      const t = kr(),
        n = Jt(),
        s = ie({ username: "", password: "" }),
        r = ie("");
      async function o() {
        r.value = "";
        try {
          (await n.register(s.value), await t.push("/"));
        } catch (i) {
          r.value = i.message;
        }
      }
      return (i, l) => (
        q(),
        W("section", Km, [
          l[4] || (l[4] = g("h1", { class: "title" }, "注册", -1)),
          g("div", Wm, [
            l[2] || (l[2] = g("label", null, "用户名", -1)),
            ue(
              g(
                "input",
                {
                  "onUpdate:modelValue":
                    l[0] || (l[0] = (c) => (s.value.username = c)),
                  placeholder: "请输入用户名",
                },
                null,
                512,
              ),
              [[ce, s.value.username, void 0, { trim: !0 }]],
            ),
          ]),
          g("div", Gm, [
            l[3] || (l[3] = g("label", null, "密码", -1)),
            ue(
              g(
                "input",
                {
                  "onUpdate:modelValue":
                    l[1] || (l[1] = (c) => (s.value.password = c)),
                  type: "password",
                  placeholder: "请输入密码",
                },
                null,
                512,
              ),
              [[ce, s.value.password, void 0, { trim: !0 }]],
            ),
          ]),
          r.value ? (q(), W("p", zm, Q(r.value), 1)) : Ye("", !0),
          g(
            "button",
            { class: "btn", disabled: Pe(n).loading, onClick: o },
            "注册并登录",
            8,
            Jm,
          ),
        ])
      );
    },
  },
  Xm = [
    { path: "/", name: "home", component: Th },
    { path: "/login", name: "login", component: Xh },
    { path: "/register", name: "register", component: Qm },
    { path: "/items/:id", name: "item-detail", component: Kh, props: !0 },
    {
      path: "/my-items",
      name: "my-items",
      component: mm,
      meta: { requiresAuth: !0 },
    },
    {
      path: "/profile",
      name: "profile",
      component: qm,
      meta: { requiresAuth: !0 },
    },
    {
      path: "/orders",
      name: "orders",
      component: Om,
      meta: { requiresAuth: !0 },
    },
    {
      path: "/admin",
      name: "admin",
      component: ch,
      meta: { requiresAuth: !0, requiresAdmin: !0 },
    },
  ],
  cu = Kf({ history: Sf(), routes: Xm });
cu.beforeEach(async (e) => {
  const t = Jt();
  return (
    t.inited || (await t.bootstrap()),
    e.meta.requiresAuth && !t.isLoggedIn
      ? { name: "login", query: { redirect: e.fullPath } }
      : e.meta.requiresAdmin && !t.isAdmin
        ? { name: "home" }
        : !0
  );
});
const qr = Pa(zp);
qr.use(Da());
qr.use(cu);
qr.mount("#app");

function Lg(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var ku = { exports: {} }, Ho = {};
var Np;
function zb() {
  if (Np) return Ho;
  Np = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), i = /* @__PURE__ */ Symbol.for("react.fragment");
  function o(l, s, d) {
    var m = null;
    if (d !== void 0 && (m = "" + d), s.key !== void 0 && (m = "" + s.key), "key" in s) {
      d = {};
      for (var f in s)
        f !== "key" && (d[f] = s[f]);
    } else d = s;
    return s = d.ref, {
      $$typeof: n,
      type: l,
      key: m,
      ref: s !== void 0 ? s : null,
      props: d
    };
  }
  return Ho.Fragment = i, Ho.jsx = o, Ho.jsxs = o, Ho;
}
var Ap;
function Nb() {
  return Ap || (Ap = 1, ku.exports = zb()), ku.exports;
}
var _ = Nb(), wu = { exports: {} }, ye = {};
var Cp;
function Ab() {
  if (Cp) return ye;
  Cp = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), i = /* @__PURE__ */ Symbol.for("react.portal"), o = /* @__PURE__ */ Symbol.for("react.fragment"), l = /* @__PURE__ */ Symbol.for("react.strict_mode"), s = /* @__PURE__ */ Symbol.for("react.profiler"), d = /* @__PURE__ */ Symbol.for("react.consumer"), m = /* @__PURE__ */ Symbol.for("react.context"), f = /* @__PURE__ */ Symbol.for("react.forward_ref"), p = /* @__PURE__ */ Symbol.for("react.suspense"), g = /* @__PURE__ */ Symbol.for("react.memo"), v = /* @__PURE__ */ Symbol.for("react.lazy"), y = /* @__PURE__ */ Symbol.for("react.activity"), k = Symbol.iterator;
  function S(E) {
    return E === null || typeof E != "object" ? null : (E = k && E[k] || E["@@iterator"], typeof E == "function" ? E : null);
  }
  var w = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, N = Object.assign, M = {};
  function O(E, L, W) {
    this.props = E, this.context = L, this.refs = M, this.updater = W || w;
  }
  O.prototype.isReactComponent = {}, O.prototype.setState = function(E, L) {
    if (typeof E != "object" && typeof E != "function" && E != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, E, L, "setState");
  }, O.prototype.forceUpdate = function(E) {
    this.updater.enqueueForceUpdate(this, E, "forceUpdate");
  };
  function Y() {
  }
  Y.prototype = O.prototype;
  function D(E, L, W) {
    this.props = E, this.context = L, this.refs = M, this.updater = W || w;
  }
  var Z = D.prototype = new Y();
  Z.constructor = D, N(Z, O.prototype), Z.isPureReactComponent = !0;
  var K = Array.isArray;
  function te() {
  }
  var X = { H: null, A: null, T: null, S: null }, ee = Object.prototype.hasOwnProperty;
  function re(E, L, W) {
    var ae = W.ref;
    return {
      $$typeof: n,
      type: E,
      key: L,
      ref: ae !== void 0 ? ae : null,
      props: W
    };
  }
  function me(E, L) {
    return re(E.type, L, E.props);
  }
  function Q(E) {
    return typeof E == "object" && E !== null && E.$$typeof === n;
  }
  function G(E) {
    var L = { "=": "=0", ":": "=2" };
    return "$" + E.replace(/[=:]/g, function(W) {
      return L[W];
    });
  }
  var B = /\/+/g;
  function I(E, L) {
    return typeof E == "object" && E !== null && E.key != null ? G("" + E.key) : L.toString(36);
  }
  function F(E) {
    switch (E.status) {
      case "fulfilled":
        return E.value;
      case "rejected":
        throw E.reason;
      default:
        switch (typeof E.status == "string" ? E.then(te, te) : (E.status = "pending", E.then(
          function(L) {
            E.status === "pending" && (E.status = "fulfilled", E.value = L);
          },
          function(L) {
            E.status === "pending" && (E.status = "rejected", E.reason = L);
          }
        )), E.status) {
          case "fulfilled":
            return E.value;
          case "rejected":
            throw E.reason;
        }
    }
    throw E;
  }
  function T(E, L, W, ae, le) {
    var ge = typeof E;
    (ge === "undefined" || ge === "boolean") && (E = null);
    var ve = !1;
    if (E === null) ve = !0;
    else
      switch (ge) {
        case "bigint":
        case "string":
        case "number":
          ve = !0;
          break;
        case "object":
          switch (E.$$typeof) {
            case n:
            case i:
              ve = !0;
              break;
            case v:
              return ve = E._init, T(
                ve(E._payload),
                L,
                W,
                ae,
                le
              );
          }
      }
    if (ve)
      return le = le(E), ve = ae === "" ? "." + I(E, 0) : ae, K(le) ? (W = "", ve != null && (W = ve.replace(B, "$&/") + "/"), T(le, L, W, "", function(yt) {
        return yt;
      })) : le != null && (Q(le) && (le = me(
        le,
        W + (le.key == null || E && E.key === le.key ? "" : ("" + le.key).replace(
          B,
          "$&/"
        ) + "/") + ve
      )), L.push(le)), 1;
    ve = 0;
    var Ge = ae === "" ? "." : ae + ":";
    if (K(E))
      for (var Ae = 0; Ae < E.length; Ae++)
        ae = E[Ae], ge = Ge + I(ae, Ae), ve += T(
          ae,
          L,
          W,
          ge,
          le
        );
    else if (Ae = S(E), typeof Ae == "function")
      for (E = Ae.call(E), Ae = 0; !(ae = E.next()).done; )
        ae = ae.value, ge = Ge + I(ae, Ae++), ve += T(
          ae,
          L,
          W,
          ge,
          le
        );
    else if (ge === "object") {
      if (typeof E.then == "function")
        return T(
          F(E),
          L,
          W,
          ae,
          le
        );
      throw L = String(E), Error(
        "Objects are not valid as a React child (found: " + (L === "[object Object]" ? "object with keys {" + Object.keys(E).join(", ") + "}" : L) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ve;
  }
  function J(E, L, W) {
    if (E == null) return E;
    var ae = [], le = 0;
    return T(E, ae, "", "", function(ge) {
      return L.call(W, ge, le++);
    }), ae;
  }
  function ne(E) {
    if (E._status === -1) {
      var L = E._result;
      L = L(), L.then(
        function(W) {
          (E._status === 0 || E._status === -1) && (E._status = 1, E._result = W);
        },
        function(W) {
          (E._status === 0 || E._status === -1) && (E._status = 2, E._result = W);
        }
      ), E._status === -1 && (E._status = 0, E._result = L);
    }
    if (E._status === 1) return E._result.default;
    throw E._result;
  }
  var fe = typeof reportError == "function" ? reportError : function(E) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var L = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof E == "object" && E !== null && typeof E.message == "string" ? String(E.message) : String(E),
        error: E
      });
      if (!window.dispatchEvent(L)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", E);
      return;
    }
    console.error(E);
  }, ie = {
    map: J,
    forEach: function(E, L, W) {
      J(
        E,
        function() {
          L.apply(this, arguments);
        },
        W
      );
    },
    count: function(E) {
      var L = 0;
      return J(E, function() {
        L++;
      }), L;
    },
    toArray: function(E) {
      return J(E, function(L) {
        return L;
      }) || [];
    },
    only: function(E) {
      if (!Q(E))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return E;
    }
  };
  return ye.Activity = y, ye.Children = ie, ye.Component = O, ye.Fragment = o, ye.Profiler = s, ye.PureComponent = D, ye.StrictMode = l, ye.Suspense = p, ye.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = X, ye.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(E) {
      return X.H.useMemoCache(E);
    }
  }, ye.cache = function(E) {
    return function() {
      return E.apply(null, arguments);
    };
  }, ye.cacheSignal = function() {
    return null;
  }, ye.cloneElement = function(E, L, W) {
    if (E == null)
      throw Error(
        "The argument must be a React element, but you passed " + E + "."
      );
    var ae = N({}, E.props), le = E.key;
    if (L != null)
      for (ge in L.key !== void 0 && (le = "" + L.key), L)
        !ee.call(L, ge) || ge === "key" || ge === "__self" || ge === "__source" || ge === "ref" && L.ref === void 0 || (ae[ge] = L[ge]);
    var ge = arguments.length - 2;
    if (ge === 1) ae.children = W;
    else if (1 < ge) {
      for (var ve = Array(ge), Ge = 0; Ge < ge; Ge++)
        ve[Ge] = arguments[Ge + 2];
      ae.children = ve;
    }
    return re(E.type, le, ae);
  }, ye.createContext = function(E) {
    return E = {
      $$typeof: m,
      _currentValue: E,
      _currentValue2: E,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, E.Provider = E, E.Consumer = {
      $$typeof: d,
      _context: E
    }, E;
  }, ye.createElement = function(E, L, W) {
    var ae, le = {}, ge = null;
    if (L != null)
      for (ae in L.key !== void 0 && (ge = "" + L.key), L)
        ee.call(L, ae) && ae !== "key" && ae !== "__self" && ae !== "__source" && (le[ae] = L[ae]);
    var ve = arguments.length - 2;
    if (ve === 1) le.children = W;
    else if (1 < ve) {
      for (var Ge = Array(ve), Ae = 0; Ae < ve; Ae++)
        Ge[Ae] = arguments[Ae + 2];
      le.children = Ge;
    }
    if (E && E.defaultProps)
      for (ae in ve = E.defaultProps, ve)
        le[ae] === void 0 && (le[ae] = ve[ae]);
    return re(E, ge, le);
  }, ye.createRef = function() {
    return { current: null };
  }, ye.forwardRef = function(E) {
    return { $$typeof: f, render: E };
  }, ye.isValidElement = Q, ye.lazy = function(E) {
    return {
      $$typeof: v,
      _payload: { _status: -1, _result: E },
      _init: ne
    };
  }, ye.memo = function(E, L) {
    return {
      $$typeof: g,
      type: E,
      compare: L === void 0 ? null : L
    };
  }, ye.startTransition = function(E) {
    var L = X.T, W = {};
    X.T = W;
    try {
      var ae = E(), le = X.S;
      le !== null && le(W, ae), typeof ae == "object" && ae !== null && typeof ae.then == "function" && ae.then(te, fe);
    } catch (ge) {
      fe(ge);
    } finally {
      L !== null && W.types !== null && (L.types = W.types), X.T = L;
    }
  }, ye.unstable_useCacheRefresh = function() {
    return X.H.useCacheRefresh();
  }, ye.use = function(E) {
    return X.H.use(E);
  }, ye.useActionState = function(E, L, W) {
    return X.H.useActionState(E, L, W);
  }, ye.useCallback = function(E, L) {
    return X.H.useCallback(E, L);
  }, ye.useContext = function(E) {
    return X.H.useContext(E);
  }, ye.useDebugValue = function() {
  }, ye.useDeferredValue = function(E, L) {
    return X.H.useDeferredValue(E, L);
  }, ye.useEffect = function(E, L) {
    return X.H.useEffect(E, L);
  }, ye.useEffectEvent = function(E) {
    return X.H.useEffectEvent(E);
  }, ye.useId = function() {
    return X.H.useId();
  }, ye.useImperativeHandle = function(E, L, W) {
    return X.H.useImperativeHandle(E, L, W);
  }, ye.useInsertionEffect = function(E, L) {
    return X.H.useInsertionEffect(E, L);
  }, ye.useLayoutEffect = function(E, L) {
    return X.H.useLayoutEffect(E, L);
  }, ye.useMemo = function(E, L) {
    return X.H.useMemo(E, L);
  }, ye.useOptimistic = function(E, L) {
    return X.H.useOptimistic(E, L);
  }, ye.useReducer = function(E, L, W) {
    return X.H.useReducer(E, L, W);
  }, ye.useRef = function(E) {
    return X.H.useRef(E);
  }, ye.useState = function(E) {
    return X.H.useState(E);
  }, ye.useSyncExternalStore = function(E, L, W) {
    return X.H.useSyncExternalStore(
      E,
      L,
      W
    );
  }, ye.useTransition = function() {
    return X.H.useTransition();
  }, ye.version = "19.2.3", ye;
}
var Mp;
function Wu() {
  return Mp || (Mp = 1, wu.exports = Ab()), wu.exports;
}
var A = Wu();
const Qo = /* @__PURE__ */ Lg(A);
var xu = { exports: {} }, Bo = {}, Eu = { exports: {} }, Tu = {};
var Op;
function Cb() {
  return Op || (Op = 1, (function(n) {
    function i(T, J) {
      var ne = T.length;
      T.push(J);
      e: for (; 0 < ne; ) {
        var fe = ne - 1 >>> 1, ie = T[fe];
        if (0 < s(ie, J))
          T[fe] = J, T[ne] = ie, ne = fe;
        else break e;
      }
    }
    function o(T) {
      return T.length === 0 ? null : T[0];
    }
    function l(T) {
      if (T.length === 0) return null;
      var J = T[0], ne = T.pop();
      if (ne !== J) {
        T[0] = ne;
        e: for (var fe = 0, ie = T.length, E = ie >>> 1; fe < E; ) {
          var L = 2 * (fe + 1) - 1, W = T[L], ae = L + 1, le = T[ae];
          if (0 > s(W, ne))
            ae < ie && 0 > s(le, W) ? (T[fe] = le, T[ae] = ne, fe = ae) : (T[fe] = W, T[L] = ne, fe = L);
          else if (ae < ie && 0 > s(le, ne))
            T[fe] = le, T[ae] = ne, fe = ae;
          else break e;
        }
      }
      return J;
    }
    function s(T, J) {
      var ne = T.sortIndex - J.sortIndex;
      return ne !== 0 ? ne : T.id - J.id;
    }
    if (n.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var d = performance;
      n.unstable_now = function() {
        return d.now();
      };
    } else {
      var m = Date, f = m.now();
      n.unstable_now = function() {
        return m.now() - f;
      };
    }
    var p = [], g = [], v = 1, y = null, k = 3, S = !1, w = !1, N = !1, M = !1, O = typeof setTimeout == "function" ? setTimeout : null, Y = typeof clearTimeout == "function" ? clearTimeout : null, D = typeof setImmediate < "u" ? setImmediate : null;
    function Z(T) {
      for (var J = o(g); J !== null; ) {
        if (J.callback === null) l(g);
        else if (J.startTime <= T)
          l(g), J.sortIndex = J.expirationTime, i(p, J);
        else break;
        J = o(g);
      }
    }
    function K(T) {
      if (N = !1, Z(T), !w)
        if (o(p) !== null)
          w = !0, te || (te = !0, G());
        else {
          var J = o(g);
          J !== null && F(K, J.startTime - T);
        }
    }
    var te = !1, X = -1, ee = 5, re = -1;
    function me() {
      return M ? !0 : !(n.unstable_now() - re < ee);
    }
    function Q() {
      if (M = !1, te) {
        var T = n.unstable_now();
        re = T;
        var J = !0;
        try {
          e: {
            w = !1, N && (N = !1, Y(X), X = -1), S = !0;
            var ne = k;
            try {
              t: {
                for (Z(T), y = o(p); y !== null && !(y.expirationTime > T && me()); ) {
                  var fe = y.callback;
                  if (typeof fe == "function") {
                    y.callback = null, k = y.priorityLevel;
                    var ie = fe(
                      y.expirationTime <= T
                    );
                    if (T = n.unstable_now(), typeof ie == "function") {
                      y.callback = ie, Z(T), J = !0;
                      break t;
                    }
                    y === o(p) && l(p), Z(T);
                  } else l(p);
                  y = o(p);
                }
                if (y !== null) J = !0;
                else {
                  var E = o(g);
                  E !== null && F(
                    K,
                    E.startTime - T
                  ), J = !1;
                }
              }
              break e;
            } finally {
              y = null, k = ne, S = !1;
            }
            J = void 0;
          }
        } finally {
          J ? G() : te = !1;
        }
      }
    }
    var G;
    if (typeof D == "function")
      G = function() {
        D(Q);
      };
    else if (typeof MessageChannel < "u") {
      var B = new MessageChannel(), I = B.port2;
      B.port1.onmessage = Q, G = function() {
        I.postMessage(null);
      };
    } else
      G = function() {
        O(Q, 0);
      };
    function F(T, J) {
      X = O(function() {
        T(n.unstable_now());
      }, J);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(T) {
      T.callback = null;
    }, n.unstable_forceFrameRate = function(T) {
      0 > T || 125 < T ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : ee = 0 < T ? Math.floor(1e3 / T) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return k;
    }, n.unstable_next = function(T) {
      switch (k) {
        case 1:
        case 2:
        case 3:
          var J = 3;
          break;
        default:
          J = k;
      }
      var ne = k;
      k = J;
      try {
        return T();
      } finally {
        k = ne;
      }
    }, n.unstable_requestPaint = function() {
      M = !0;
    }, n.unstable_runWithPriority = function(T, J) {
      switch (T) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          T = 3;
      }
      var ne = k;
      k = T;
      try {
        return J();
      } finally {
        k = ne;
      }
    }, n.unstable_scheduleCallback = function(T, J, ne) {
      var fe = n.unstable_now();
      switch (typeof ne == "object" && ne !== null ? (ne = ne.delay, ne = typeof ne == "number" && 0 < ne ? fe + ne : fe) : ne = fe, T) {
        case 1:
          var ie = -1;
          break;
        case 2:
          ie = 250;
          break;
        case 5:
          ie = 1073741823;
          break;
        case 4:
          ie = 1e4;
          break;
        default:
          ie = 5e3;
      }
      return ie = ne + ie, T = {
        id: v++,
        callback: J,
        priorityLevel: T,
        startTime: ne,
        expirationTime: ie,
        sortIndex: -1
      }, ne > fe ? (T.sortIndex = ne, i(g, T), o(p) === null && T === o(g) && (N ? (Y(X), X = -1) : N = !0, F(K, ne - fe))) : (T.sortIndex = ie, i(p, T), w || S || (w = !0, te || (te = !0, G()))), T;
    }, n.unstable_shouldYield = me, n.unstable_wrapCallback = function(T) {
      var J = k;
      return function() {
        var ne = k;
        k = J;
        try {
          return T.apply(this, arguments);
        } finally {
          k = ne;
        }
      };
    };
  })(Tu)), Tu;
}
var Rp;
function Mb() {
  return Rp || (Rp = 1, Eu.exports = Cb()), Eu.exports;
}
var zu = { exports: {} }, St = {};
var jp;
function Ob() {
  if (jp) return St;
  jp = 1;
  var n = Wu();
  function i(p) {
    var g = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      g += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var v = 2; v < arguments.length; v++)
        g += "&args[]=" + encodeURIComponent(arguments[v]);
    }
    return "Minified React error #" + p + "; visit " + g + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o() {
  }
  var l = {
    d: {
      f: o,
      r: function() {
        throw Error(i(522));
      },
      D: o,
      C: o,
      L: o,
      m: o,
      X: o,
      S: o,
      M: o
    },
    p: 0,
    findDOMNode: null
  }, s = /* @__PURE__ */ Symbol.for("react.portal");
  function d(p, g, v) {
    var y = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: s,
      key: y == null ? null : "" + y,
      children: p,
      containerInfo: g,
      implementation: v
    };
  }
  var m = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function f(p, g) {
    if (p === "font") return "";
    if (typeof g == "string")
      return g === "use-credentials" ? g : "";
  }
  return St.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, St.createPortal = function(p, g) {
    var v = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!g || g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)
      throw Error(i(299));
    return d(p, g, null, v);
  }, St.flushSync = function(p) {
    var g = m.T, v = l.p;
    try {
      if (m.T = null, l.p = 2, p) return p();
    } finally {
      m.T = g, l.p = v, l.d.f();
    }
  }, St.preconnect = function(p, g) {
    typeof p == "string" && (g ? (g = g.crossOrigin, g = typeof g == "string" ? g === "use-credentials" ? g : "" : void 0) : g = null, l.d.C(p, g));
  }, St.prefetchDNS = function(p) {
    typeof p == "string" && l.d.D(p);
  }, St.preinit = function(p, g) {
    if (typeof p == "string" && g && typeof g.as == "string") {
      var v = g.as, y = f(v, g.crossOrigin), k = typeof g.integrity == "string" ? g.integrity : void 0, S = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
      v === "style" ? l.d.S(
        p,
        typeof g.precedence == "string" ? g.precedence : void 0,
        {
          crossOrigin: y,
          integrity: k,
          fetchPriority: S
        }
      ) : v === "script" && l.d.X(p, {
        crossOrigin: y,
        integrity: k,
        fetchPriority: S,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0
      });
    }
  }, St.preinitModule = function(p, g) {
    if (typeof p == "string")
      if (typeof g == "object" && g !== null) {
        if (g.as == null || g.as === "script") {
          var v = f(
            g.as,
            g.crossOrigin
          );
          l.d.M(p, {
            crossOrigin: v,
            integrity: typeof g.integrity == "string" ? g.integrity : void 0,
            nonce: typeof g.nonce == "string" ? g.nonce : void 0
          });
        }
      } else g == null && l.d.M(p);
  }, St.preload = function(p, g) {
    if (typeof p == "string" && typeof g == "object" && g !== null && typeof g.as == "string") {
      var v = g.as, y = f(v, g.crossOrigin);
      l.d.L(p, v, {
        crossOrigin: y,
        integrity: typeof g.integrity == "string" ? g.integrity : void 0,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0,
        type: typeof g.type == "string" ? g.type : void 0,
        fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0,
        referrerPolicy: typeof g.referrerPolicy == "string" ? g.referrerPolicy : void 0,
        imageSrcSet: typeof g.imageSrcSet == "string" ? g.imageSrcSet : void 0,
        imageSizes: typeof g.imageSizes == "string" ? g.imageSizes : void 0,
        media: typeof g.media == "string" ? g.media : void 0
      });
    }
  }, St.preloadModule = function(p, g) {
    if (typeof p == "string")
      if (g) {
        var v = f(g.as, g.crossOrigin);
        l.d.m(p, {
          as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0,
          crossOrigin: v,
          integrity: typeof g.integrity == "string" ? g.integrity : void 0
        });
      } else l.d.m(p);
  }, St.requestFormReset = function(p) {
    l.d.r(p);
  }, St.unstable_batchedUpdates = function(p, g) {
    return p(g);
  }, St.useFormState = function(p, g, v) {
    return m.H.useFormState(p, g, v);
  }, St.useFormStatus = function() {
    return m.H.useHostTransitionStatus();
  }, St.version = "19.2.3", St;
}
var Dp;
function Rb() {
  if (Dp) return zu.exports;
  Dp = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (i) {
        console.error(i);
      }
  }
  return n(), zu.exports = Ob(), zu.exports;
}
var Lp;
function jb() {
  if (Lp) return Bo;
  Lp = 1;
  var n = Mb(), i = Wu(), o = Rb();
  function l(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++)
        t += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function s(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function d(e) {
    var t = e, a = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (a = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? a : null;
  }
  function m(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function f(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function p(e) {
    if (d(e) !== e)
      throw Error(l(188));
  }
  function g(e) {
    var t = e.alternate;
    if (!t) {
      if (t = d(e), t === null) throw Error(l(188));
      return t !== e ? null : e;
    }
    for (var a = e, r = t; ; ) {
      var c = a.return;
      if (c === null) break;
      var u = c.alternate;
      if (u === null) {
        if (r = c.return, r !== null) {
          a = r;
          continue;
        }
        break;
      }
      if (c.child === u.child) {
        for (u = c.child; u; ) {
          if (u === a) return p(c), e;
          if (u === r) return p(c), t;
          u = u.sibling;
        }
        throw Error(l(188));
      }
      if (a.return !== r.return) a = c, r = u;
      else {
        for (var h = !1, b = c.child; b; ) {
          if (b === a) {
            h = !0, a = c, r = u;
            break;
          }
          if (b === r) {
            h = !0, r = c, a = u;
            break;
          }
          b = b.sibling;
        }
        if (!h) {
          for (b = u.child; b; ) {
            if (b === a) {
              h = !0, a = u, r = c;
              break;
            }
            if (b === r) {
              h = !0, r = u, a = c;
              break;
            }
            b = b.sibling;
          }
          if (!h) throw Error(l(189));
        }
      }
      if (a.alternate !== r) throw Error(l(190));
    }
    if (a.tag !== 3) throw Error(l(188));
    return a.stateNode.current === a ? e : t;
  }
  function v(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = v(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var y = Object.assign, k = /* @__PURE__ */ Symbol.for("react.element"), S = /* @__PURE__ */ Symbol.for("react.transitional.element"), w = /* @__PURE__ */ Symbol.for("react.portal"), N = /* @__PURE__ */ Symbol.for("react.fragment"), M = /* @__PURE__ */ Symbol.for("react.strict_mode"), O = /* @__PURE__ */ Symbol.for("react.profiler"), Y = /* @__PURE__ */ Symbol.for("react.consumer"), D = /* @__PURE__ */ Symbol.for("react.context"), Z = /* @__PURE__ */ Symbol.for("react.forward_ref"), K = /* @__PURE__ */ Symbol.for("react.suspense"), te = /* @__PURE__ */ Symbol.for("react.suspense_list"), X = /* @__PURE__ */ Symbol.for("react.memo"), ee = /* @__PURE__ */ Symbol.for("react.lazy"), re = /* @__PURE__ */ Symbol.for("react.activity"), me = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), Q = Symbol.iterator;
  function G(e) {
    return e === null || typeof e != "object" ? null : (e = Q && e[Q] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var B = /* @__PURE__ */ Symbol.for("react.client.reference");
  function I(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === B ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case N:
        return "Fragment";
      case O:
        return "Profiler";
      case M:
        return "StrictMode";
      case K:
        return "Suspense";
      case te:
        return "SuspenseList";
      case re:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case w:
          return "Portal";
        case D:
          return e.displayName || "Context";
        case Y:
          return (e._context.displayName || "Context") + ".Consumer";
        case Z:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case X:
          return t = e.displayName || null, t !== null ? t : I(e.type) || "Memo";
        case ee:
          t = e._payload, e = e._init;
          try {
            return I(e(t));
          } catch {
          }
      }
    return null;
  }
  var F = Array.isArray, T = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, J = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ne = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, fe = [], ie = -1;
  function E(e) {
    return { current: e };
  }
  function L(e) {
    0 > ie || (e.current = fe[ie], fe[ie] = null, ie--);
  }
  function W(e, t) {
    ie++, fe[ie] = e.current, e.current = t;
  }
  var ae = E(null), le = E(null), ge = E(null), ve = E(null);
  function Ge(e, t) {
    switch (W(ge, t), W(le, e), W(ae, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Q_(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Q_(t), e = J_(t, e);
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    L(ae), W(ae, e);
  }
  function Ae() {
    L(ae), L(le), L(ge);
  }
  function yt(e) {
    e.memoizedState !== null && W(ve, e);
    var t = ae.current, a = J_(t, e.type);
    t !== a && (W(le, e), W(ae, a));
  }
  function Dt(e) {
    le.current === e && (L(ae), L(le)), ve.current === e && (L(ve), Lo._currentValue = ne);
  }
  var dn, mn;
  function ct(e) {
    if (dn === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        dn = t && t[1] || "", mn = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + dn + e + mn;
  }
  var Ke = !1;
  function Ie(e, t) {
    if (!e || Ke) return "";
    Ke = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var r = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var P = function() {
                throw Error();
              };
              if (Object.defineProperty(P.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(P, []);
                } catch (H) {
                  var U = H;
                }
                Reflect.construct(e, [], P);
              } else {
                try {
                  P.call();
                } catch (H) {
                  U = H;
                }
                e.call(P.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (H) {
                U = H;
              }
              (P = e()) && typeof P.catch == "function" && P.catch(function() {
              });
            }
          } catch (H) {
            if (H && U && typeof H.stack == "string")
              return [H.stack, U.stack];
          }
          return [null, null];
        }
      };
      r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var c = Object.getOwnPropertyDescriptor(
        r.DetermineComponentFrameRoot,
        "name"
      );
      c && c.configurable && Object.defineProperty(
        r.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var u = r.DetermineComponentFrameRoot(), h = u[0], b = u[1];
      if (h && b) {
        var x = h.split(`
`), j = b.split(`
`);
        for (c = r = 0; r < x.length && !x[r].includes("DetermineComponentFrameRoot"); )
          r++;
        for (; c < j.length && !j[c].includes(
          "DetermineComponentFrameRoot"
        ); )
          c++;
        if (r === x.length || c === j.length)
          for (r = x.length - 1, c = j.length - 1; 1 <= r && 0 <= c && x[r] !== j[c]; )
            c--;
        for (; 1 <= r && 0 <= c; r--, c--)
          if (x[r] !== j[c]) {
            if (r !== 1 || c !== 1)
              do
                if (r--, c--, 0 > c || x[r] !== j[c]) {
                  var q = `
` + x[r].replace(" at new ", " at ");
                  return e.displayName && q.includes("<anonymous>") && (q = q.replace("<anonymous>", e.displayName)), q;
                }
              while (1 <= r && 0 <= c);
            break;
          }
      }
    } finally {
      Ke = !1, Error.prepareStackTrace = a;
    }
    return (a = e ? e.displayName || e.name : "") ? ct(a) : "";
  }
  function rs(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return ct(e.type);
      case 16:
        return ct("Lazy");
      case 13:
        return e.child !== t && t !== null ? ct("Suspense Fallback") : ct("Suspense");
      case 19:
        return ct("SuspenseList");
      case 0:
      case 15:
        return Ie(e.type, !1);
      case 11:
        return Ie(e.type.render, !1);
      case 1:
        return Ie(e.type, !0);
      case 31:
        return ct("Activity");
      default:
        return "";
    }
  }
  function ir(e) {
    try {
      var t = "", a = null;
      do
        t += rs(e, a), a = e, e = e.return;
      while (e);
      return t;
    } catch (r) {
      return `
Error generating stack: ` + r.message + `
` + r.stack;
    }
  }
  var qi = Object.prototype.hasOwnProperty, Vi = n.unstable_scheduleCallback, Xi = n.unstable_cancelCallback, ls = n.unstable_shouldYield, ss = n.unstable_requestPaint, kt = n.unstable_now, cs = n.unstable_getCurrentPriorityLevel, or = n.unstable_ImmediatePriority, $i = n.unstable_UserBlockingPriority, Fa = n.unstable_NormalPriority, rr = n.unstable_LowPriority, Lt = n.unstable_IdlePriority, Ut = n.log, bt = n.unstable_setDisableYieldValue, $n = null, ut = null;
  function Pn(e) {
    if (typeof Ut == "function" && bt(e), ut && typeof ut.setStrictMode == "function")
      try {
        ut.setStrictMode($n, e);
      } catch {
      }
  }
  var Yt = Math.clz32 ? Math.clz32 : fv, dv = Math.log, mv = Math.LN2;
  function fv(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (dv(e) / mv | 0) | 0;
  }
  var lr = 256, sr = 262144, cr = 4194304;
  function za(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function ur(e, t, a) {
    var r = e.pendingLanes;
    if (r === 0) return 0;
    var c = 0, u = e.suspendedLanes, h = e.pingedLanes;
    e = e.warmLanes;
    var b = r & 134217727;
    return b !== 0 ? (r = b & ~u, r !== 0 ? c = za(r) : (h &= b, h !== 0 ? c = za(h) : a || (a = b & ~e, a !== 0 && (c = za(a))))) : (b = r & ~u, b !== 0 ? c = za(b) : h !== 0 ? c = za(h) : a || (a = r & ~e, a !== 0 && (c = za(a)))), c === 0 ? 0 : t !== 0 && t !== c && (t & u) === 0 && (u = c & -c, a = t & -t, u >= a || u === 32 && (a & 4194048) !== 0) ? t : c;
  }
  function Pi(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function _v(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Md() {
    var e = cr;
    return cr <<= 1, (cr & 62914560) === 0 && (cr = 4194304), e;
  }
  function us(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function Ii(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function pv(e, t, a, r, c, u) {
    var h = e.pendingLanes;
    e.pendingLanes = a, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= a, e.entangledLanes &= a, e.errorRecoveryDisabledLanes &= a, e.shellSuspendCounter = 0;
    var b = e.entanglements, x = e.expirationTimes, j = e.hiddenUpdates;
    for (a = h & ~a; 0 < a; ) {
      var q = 31 - Yt(a), P = 1 << q;
      b[q] = 0, x[q] = -1;
      var U = j[q];
      if (U !== null)
        for (j[q] = null, q = 0; q < U.length; q++) {
          var H = U[q];
          H !== null && (H.lane &= -536870913);
        }
      a &= ~P;
    }
    r !== 0 && Od(e, r, 0), u !== 0 && c === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(h & ~t));
  }
  function Od(e, t, a) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var r = 31 - Yt(t);
    e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | a & 261930;
  }
  function Rd(e, t) {
    var a = e.entangledLanes |= t;
    for (e = e.entanglements; a; ) {
      var r = 31 - Yt(a), c = 1 << r;
      c & t | e[r] & t && (e[r] |= t), a &= ~c;
    }
  }
  function jd(e, t) {
    var a = t & -t;
    return a = (a & 42) !== 0 ? 1 : ds(a), (a & (e.suspendedLanes | t)) !== 0 ? 0 : a;
  }
  function ds(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function ms(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Dd() {
    var e = J.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Sp(e.type));
  }
  function Ld(e, t) {
    var a = J.p;
    try {
      return J.p = e, t();
    } finally {
      J.p = a;
    }
  }
  var In = Math.random().toString(36).slice(2), _t = "__reactFiber$" + In, zt = "__reactProps$" + In, Qa = "__reactContainer$" + In, fs = "__reactEvents$" + In, gv = "__reactListeners$" + In, hv = "__reactHandles$" + In, Ud = "__reactResources$" + In, Fi = "__reactMarker$" + In;
  function _s(e) {
    delete e[_t], delete e[zt], delete e[fs], delete e[gv], delete e[hv];
  }
  function Ja(e) {
    var t = e[_t];
    if (t) return t;
    for (var a = e.parentNode; a; ) {
      if (t = a[Qa] || a[_t]) {
        if (a = t.alternate, t.child !== null || a !== null && a.child !== null)
          for (e = op(e); e !== null; ) {
            if (a = e[_t]) return a;
            e = op(e);
          }
        return t;
      }
      e = a, a = e.parentNode;
    }
    return null;
  }
  function Wa(e) {
    if (e = e[_t] || e[Qa]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Qi(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(l(33));
  }
  function ei(e) {
    var t = e[Ud];
    return t || (t = e[Ud] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function mt(e) {
    e[Fi] = !0;
  }
  var Yd = /* @__PURE__ */ new Set(), Zd = {};
  function Na(e, t) {
    ti(e, t), ti(e + "Capture", t);
  }
  function ti(e, t) {
    for (Zd[e] = t, e = 0; e < t.length; e++)
      Yd.add(t[e]);
  }
  var vv = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Hd = {}, Bd = {};
  function yv(e) {
    return qi.call(Bd, e) ? !0 : qi.call(Hd, e) ? !1 : vv.test(e) ? Bd[e] = !0 : (Hd[e] = !0, !1);
  }
  function dr(e, t, a) {
    if (yv(t))
      if (a === null) e.removeAttribute(t);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var r = t.toLowerCase().slice(0, 5);
            if (r !== "data-" && r !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + a);
      }
  }
  function mr(e, t, a) {
    if (a === null) e.removeAttribute(t);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + a);
    }
  }
  function xn(e, t, a, r) {
    if (r === null) e.removeAttribute(a);
    else {
      switch (typeof r) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(a);
          return;
      }
      e.setAttributeNS(t, a, "" + r);
    }
  }
  function Pt(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Gd(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function bv(e, t, a) {
    var r = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof r < "u" && typeof r.get == "function" && typeof r.set == "function") {
      var c = r.get, u = r.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return c.call(this);
        },
        set: function(h) {
          a = "" + h, u.call(this, h);
        }
      }), Object.defineProperty(e, t, {
        enumerable: r.enumerable
      }), {
        getValue: function() {
          return a;
        },
        setValue: function(h) {
          a = "" + h;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function ps(e) {
    if (!e._valueTracker) {
      var t = Gd(e) ? "checked" : "value";
      e._valueTracker = bv(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function Kd(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(), r = "";
    return e && (r = Gd(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== a ? (t.setValue(e), !0) : !1;
  }
  function fr(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Sv = /[\n"\\]/g;
  function It(e) {
    return e.replace(
      Sv,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function gs(e, t, a, r, c, u, h, b) {
    e.name = "", h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? e.type = h : e.removeAttribute("type"), t != null ? h === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Pt(t)) : e.value !== "" + Pt(t) && (e.value = "" + Pt(t)) : h !== "submit" && h !== "reset" || e.removeAttribute("value"), t != null ? hs(e, h, Pt(t)) : a != null ? hs(e, h, Pt(a)) : r != null && e.removeAttribute("value"), c == null && u != null && (e.defaultChecked = !!u), c != null && (e.checked = c && typeof c != "function" && typeof c != "symbol"), b != null && typeof b != "function" && typeof b != "symbol" && typeof b != "boolean" ? e.name = "" + Pt(b) : e.removeAttribute("name");
  }
  function qd(e, t, a, r, c, u, h, b) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (e.type = u), t != null || a != null) {
      if (!(u !== "submit" && u !== "reset" || t != null)) {
        ps(e);
        return;
      }
      a = a != null ? "" + Pt(a) : "", t = t != null ? "" + Pt(t) : a, b || t === e.value || (e.value = t), e.defaultValue = t;
    }
    r = r ?? c, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = b ? e.checked : !!r, e.defaultChecked = !!r, h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (e.name = h), ps(e);
  }
  function hs(e, t, a) {
    t === "number" && fr(e.ownerDocument) === e || e.defaultValue === "" + a || (e.defaultValue = "" + a);
  }
  function ni(e, t, a, r) {
    if (e = e.options, t) {
      t = {};
      for (var c = 0; c < a.length; c++)
        t["$" + a[c]] = !0;
      for (a = 0; a < e.length; a++)
        c = t.hasOwnProperty("$" + e[a].value), e[a].selected !== c && (e[a].selected = c), c && r && (e[a].defaultSelected = !0);
    } else {
      for (a = "" + Pt(a), t = null, c = 0; c < e.length; c++) {
        if (e[c].value === a) {
          e[c].selected = !0, r && (e[c].defaultSelected = !0);
          return;
        }
        t !== null || e[c].disabled || (t = e[c]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Vd(e, t, a) {
    if (t != null && (t = "" + Pt(t), t !== e.value && (e.value = t), a == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? "" + Pt(a) : "";
  }
  function Xd(e, t, a, r) {
    if (t == null) {
      if (r != null) {
        if (a != null) throw Error(l(92));
        if (F(r)) {
          if (1 < r.length) throw Error(l(93));
          r = r[0];
        }
        a = r;
      }
      a == null && (a = ""), t = a;
    }
    a = Pt(t), e.defaultValue = a, r = e.textContent, r === a && r !== "" && r !== null && (e.value = r), ps(e);
  }
  function ai(e, t) {
    if (t) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var kv = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function $d(e, t, a) {
    var r = t.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, a) : typeof a != "number" || a === 0 || kv.has(t) ? t === "float" ? e.cssFloat = a : e[t] = ("" + a).trim() : e[t] = a + "px";
  }
  function Pd(e, t, a) {
    if (t != null && typeof t != "object")
      throw Error(l(62));
    if (e = e.style, a != null) {
      for (var r in a)
        !a.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
      for (var c in t)
        r = t[c], t.hasOwnProperty(c) && a[c] !== r && $d(e, c, r);
    } else
      for (var u in t)
        t.hasOwnProperty(u) && $d(e, u, t[u]);
  }
  function vs(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var wv = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), xv = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function _r(e) {
    return xv.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function En() {
  }
  var ys = null;
  function bs(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var ii = null, oi = null;
  function Id(e) {
    var t = Wa(e);
    if (t && (e = t.stateNode)) {
      var a = e[zt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (gs(
            e,
            a.value,
            a.defaultValue,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name
          ), t = a.name, a.type === "radio" && t != null) {
            for (a = e; a.parentNode; ) a = a.parentNode;
            for (a = a.querySelectorAll(
              'input[name="' + It(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < a.length; t++) {
              var r = a[t];
              if (r !== e && r.form === e.form) {
                var c = r[zt] || null;
                if (!c) throw Error(l(90));
                gs(
                  r,
                  c.value,
                  c.defaultValue,
                  c.defaultValue,
                  c.checked,
                  c.defaultChecked,
                  c.type,
                  c.name
                );
              }
            }
            for (t = 0; t < a.length; t++)
              r = a[t], r.form === e.form && Kd(r);
          }
          break e;
        case "textarea":
          Vd(e, a.value, a.defaultValue);
          break e;
        case "select":
          t = a.value, t != null && ni(e, !!a.multiple, t, !1);
      }
    }
  }
  var Ss = !1;
  function Fd(e, t, a) {
    if (Ss) return e(t, a);
    Ss = !0;
    try {
      var r = e(t);
      return r;
    } finally {
      if (Ss = !1, (ii !== null || oi !== null) && (tl(), ii && (t = ii, e = oi, oi = ii = null, Id(t), e)))
        for (t = 0; t < e.length; t++) Id(e[t]);
    }
  }
  function Ji(e, t) {
    var a = e.stateNode;
    if (a === null) return null;
    var r = a[zt] || null;
    if (r === null) return null;
    a = r[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (a && typeof a != "function")
      throw Error(
        l(231, t, typeof a)
      );
    return a;
  }
  var Tn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ks = !1;
  if (Tn)
    try {
      var Wi = {};
      Object.defineProperty(Wi, "passive", {
        get: function() {
          ks = !0;
        }
      }), window.addEventListener("test", Wi, Wi), window.removeEventListener("test", Wi, Wi);
    } catch {
      ks = !1;
    }
  var Fn = null, ws = null, pr = null;
  function Qd() {
    if (pr) return pr;
    var e, t = ws, a = t.length, r, c = "value" in Fn ? Fn.value : Fn.textContent, u = c.length;
    for (e = 0; e < a && t[e] === c[e]; e++) ;
    var h = a - e;
    for (r = 1; r <= h && t[a - r] === c[u - r]; r++) ;
    return pr = c.slice(e, 1 < r ? 1 - r : void 0);
  }
  function gr(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function hr() {
    return !0;
  }
  function Jd() {
    return !1;
  }
  function Nt(e) {
    function t(a, r, c, u, h) {
      this._reactName = a, this._targetInst = c, this.type = r, this.nativeEvent = u, this.target = h, this.currentTarget = null;
      for (var b in e)
        e.hasOwnProperty(b) && (a = e[b], this[b] = a ? a(u) : u[b]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? hr : Jd, this.isPropagationStopped = Jd, this;
    }
    return y(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var a = this.nativeEvent;
        a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = hr);
      },
      stopPropagation: function() {
        var a = this.nativeEvent;
        a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = hr);
      },
      persist: function() {
      },
      isPersistent: hr
    }), t;
  }
  var Aa = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, vr = Nt(Aa), eo = y({}, Aa, { view: 0, detail: 0 }), Ev = Nt(eo), xs, Es, to, yr = y({}, eo, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: zs,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== to && (to && e.type === "mousemove" ? (xs = e.screenX - to.screenX, Es = e.screenY - to.screenY) : Es = xs = 0, to = e), xs);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Es;
    }
  }), Wd = Nt(yr), Tv = y({}, yr, { dataTransfer: 0 }), zv = Nt(Tv), Nv = y({}, eo, { relatedTarget: 0 }), Ts = Nt(Nv), Av = y({}, Aa, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Cv = Nt(Av), Mv = y({}, Aa, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), Ov = Nt(Mv), Rv = y({}, Aa, { data: 0 }), em = Nt(Rv), jv = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Dv = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Lv = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Uv(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Lv[e]) ? !!t[e] : !1;
  }
  function zs() {
    return Uv;
  }
  var Yv = y({}, eo, {
    key: function(e) {
      if (e.key) {
        var t = jv[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = gr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Dv[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: zs,
    charCode: function(e) {
      return e.type === "keypress" ? gr(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? gr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), Zv = Nt(Yv), Hv = y({}, yr, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), tm = Nt(Hv), Bv = y({}, eo, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: zs
  }), Gv = Nt(Bv), Kv = y({}, Aa, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), qv = Nt(Kv), Vv = y({}, yr, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Xv = Nt(Vv), $v = y({}, Aa, {
    newState: 0,
    oldState: 0
  }), Pv = Nt($v), Iv = [9, 13, 27, 32], Ns = Tn && "CompositionEvent" in window, no = null;
  Tn && "documentMode" in document && (no = document.documentMode);
  var Fv = Tn && "TextEvent" in window && !no, nm = Tn && (!Ns || no && 8 < no && 11 >= no), am = " ", im = !1;
  function om(e, t) {
    switch (e) {
      case "keyup":
        return Iv.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function rm(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var ri = !1;
  function Qv(e, t) {
    switch (e) {
      case "compositionend":
        return rm(t);
      case "keypress":
        return t.which !== 32 ? null : (im = !0, am);
      case "textInput":
        return e = t.data, e === am && im ? null : e;
      default:
        return null;
    }
  }
  function Jv(e, t) {
    if (ri)
      return e === "compositionend" || !Ns && om(e, t) ? (e = Qd(), pr = ws = Fn = null, ri = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length)
            return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return nm && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Wv = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function lm(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Wv[e.type] : t === "textarea";
  }
  function sm(e, t, a, r) {
    ii ? oi ? oi.push(r) : oi = [r] : ii = r, t = sl(t, "onChange"), 0 < t.length && (a = new vr(
      "onChange",
      "change",
      null,
      a,
      r
    ), e.push({ event: a, listeners: t }));
  }
  var ao = null, io = null;
  function ey(e) {
    V_(e, 0);
  }
  function br(e) {
    var t = Qi(e);
    if (Kd(t)) return e;
  }
  function cm(e, t) {
    if (e === "change") return t;
  }
  var um = !1;
  if (Tn) {
    var As;
    if (Tn) {
      var Cs = "oninput" in document;
      if (!Cs) {
        var dm = document.createElement("div");
        dm.setAttribute("oninput", "return;"), Cs = typeof dm.oninput == "function";
      }
      As = Cs;
    } else As = !1;
    um = As && (!document.documentMode || 9 < document.documentMode);
  }
  function mm() {
    ao && (ao.detachEvent("onpropertychange", fm), io = ao = null);
  }
  function fm(e) {
    if (e.propertyName === "value" && br(io)) {
      var t = [];
      sm(
        t,
        io,
        e,
        bs(e)
      ), Fd(ey, t);
    }
  }
  function ty(e, t, a) {
    e === "focusin" ? (mm(), ao = t, io = a, ao.attachEvent("onpropertychange", fm)) : e === "focusout" && mm();
  }
  function ny(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return br(io);
  }
  function ay(e, t) {
    if (e === "click") return br(t);
  }
  function iy(e, t) {
    if (e === "input" || e === "change")
      return br(t);
  }
  function oy(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Zt = typeof Object.is == "function" ? Object.is : oy;
  function oo(e, t) {
    if (Zt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var a = Object.keys(e), r = Object.keys(t);
    if (a.length !== r.length) return !1;
    for (r = 0; r < a.length; r++) {
      var c = a[r];
      if (!qi.call(t, c) || !Zt(e[c], t[c]))
        return !1;
    }
    return !0;
  }
  function _m(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function pm(e, t) {
    var a = _m(e);
    e = 0;
    for (var r; a; ) {
      if (a.nodeType === 3) {
        if (r = e + a.textContent.length, e <= t && r >= t)
          return { node: a, offset: t - e };
        e = r;
      }
      e: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break e;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = _m(a);
    }
  }
  function gm(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? gm(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function hm(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = fr(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = fr(e.document);
    }
    return t;
  }
  function Ms(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var ry = Tn && "documentMode" in document && 11 >= document.documentMode, li = null, Os = null, ro = null, Rs = !1;
  function vm(e, t, a) {
    var r = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    Rs || li == null || li !== fr(r) || (r = li, "selectionStart" in r && Ms(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
      anchorNode: r.anchorNode,
      anchorOffset: r.anchorOffset,
      focusNode: r.focusNode,
      focusOffset: r.focusOffset
    }), ro && oo(ro, r) || (ro = r, r = sl(Os, "onSelect"), 0 < r.length && (t = new vr(
      "onSelect",
      "select",
      null,
      t,
      a
    ), e.push({ event: t, listeners: r }), t.target = li)));
  }
  function Ca(e, t) {
    var a = {};
    return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
  }
  var si = {
    animationend: Ca("Animation", "AnimationEnd"),
    animationiteration: Ca("Animation", "AnimationIteration"),
    animationstart: Ca("Animation", "AnimationStart"),
    transitionrun: Ca("Transition", "TransitionRun"),
    transitionstart: Ca("Transition", "TransitionStart"),
    transitioncancel: Ca("Transition", "TransitionCancel"),
    transitionend: Ca("Transition", "TransitionEnd")
  }, js = {}, ym = {};
  Tn && (ym = document.createElement("div").style, "AnimationEvent" in window || (delete si.animationend.animation, delete si.animationiteration.animation, delete si.animationstart.animation), "TransitionEvent" in window || delete si.transitionend.transition);
  function Ma(e) {
    if (js[e]) return js[e];
    if (!si[e]) return e;
    var t = si[e], a;
    for (a in t)
      if (t.hasOwnProperty(a) && a in ym)
        return js[e] = t[a];
    return e;
  }
  var bm = Ma("animationend"), Sm = Ma("animationiteration"), km = Ma("animationstart"), ly = Ma("transitionrun"), sy = Ma("transitionstart"), cy = Ma("transitioncancel"), wm = Ma("transitionend"), xm = /* @__PURE__ */ new Map(), Ds = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Ds.push("scrollEnd");
  function fn(e, t) {
    xm.set(e, t), Na(t, [e]);
  }
  var Sr = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  }, Ft = [], ci = 0, Ls = 0;
  function kr() {
    for (var e = ci, t = Ls = ci = 0; t < e; ) {
      var a = Ft[t];
      Ft[t++] = null;
      var r = Ft[t];
      Ft[t++] = null;
      var c = Ft[t];
      Ft[t++] = null;
      var u = Ft[t];
      if (Ft[t++] = null, r !== null && c !== null) {
        var h = r.pending;
        h === null ? c.next = c : (c.next = h.next, h.next = c), r.pending = c;
      }
      u !== 0 && Em(a, c, u);
    }
  }
  function wr(e, t, a, r) {
    Ft[ci++] = e, Ft[ci++] = t, Ft[ci++] = a, Ft[ci++] = r, Ls |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
  }
  function Us(e, t, a, r) {
    return wr(e, t, a, r), xr(e);
  }
  function Oa(e, t) {
    return wr(e, null, null, t), xr(e);
  }
  function Em(e, t, a) {
    e.lanes |= a;
    var r = e.alternate;
    r !== null && (r.lanes |= a);
    for (var c = !1, u = e.return; u !== null; )
      u.childLanes |= a, r = u.alternate, r !== null && (r.childLanes |= a), u.tag === 22 && (e = u.stateNode, e === null || e._visibility & 1 || (c = !0)), e = u, u = u.return;
    return e.tag === 3 ? (u = e.stateNode, c && t !== null && (c = 31 - Yt(a), e = u.hiddenUpdates, r = e[c], r === null ? e[c] = [t] : r.push(t), t.lane = a | 536870912), u) : null;
  }
  function xr(e) {
    if (50 < Ao)
      throw Ao = 0, Xc = null, Error(l(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var ui = {};
  function uy(e, t, a, r) {
    this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ht(e, t, a, r) {
    return new uy(e, t, a, r);
  }
  function Ys(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function zn(e, t) {
    var a = e.alternate;
    return a === null ? (a = Ht(
      e.tag,
      t,
      e.key,
      e.mode
    ), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = e.flags & 65011712, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue, t = e.dependencies, a.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.refCleanup = e.refCleanup, a;
  }
  function Tm(e, t) {
    e.flags &= 65011714;
    var a = e.alternate;
    return a === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type, t = a.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Er(e, t, a, r, c, u) {
    var h = 0;
    if (r = e, typeof e == "function") Ys(e) && (h = 1);
    else if (typeof e == "string")
      h = pb(
        e,
        a,
        ae.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case re:
          return e = Ht(31, a, t, c), e.elementType = re, e.lanes = u, e;
        case N:
          return Ra(a.children, c, u, t);
        case M:
          h = 8, c |= 24;
          break;
        case O:
          return e = Ht(12, a, t, c | 2), e.elementType = O, e.lanes = u, e;
        case K:
          return e = Ht(13, a, t, c), e.elementType = K, e.lanes = u, e;
        case te:
          return e = Ht(19, a, t, c), e.elementType = te, e.lanes = u, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case D:
                h = 10;
                break e;
              case Y:
                h = 9;
                break e;
              case Z:
                h = 11;
                break e;
              case X:
                h = 14;
                break e;
              case ee:
                h = 16, r = null;
                break e;
            }
          h = 29, a = Error(
            l(130, e === null ? "null" : typeof e, "")
          ), r = null;
      }
    return t = Ht(h, a, t, c), t.elementType = e, t.type = r, t.lanes = u, t;
  }
  function Ra(e, t, a, r) {
    return e = Ht(7, e, r, t), e.lanes = a, e;
  }
  function Zs(e, t, a) {
    return e = Ht(6, e, null, t), e.lanes = a, e;
  }
  function zm(e) {
    var t = Ht(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Hs(e, t, a) {
    return t = Ht(
      4,
      e.children !== null ? e.children : [],
      e.key,
      t
    ), t.lanes = a, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  var Nm = /* @__PURE__ */ new WeakMap();
  function Qt(e, t) {
    if (typeof e == "object" && e !== null) {
      var a = Nm.get(e);
      return a !== void 0 ? a : (t = {
        value: e,
        source: t,
        stack: ir(t)
      }, Nm.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: ir(t)
    };
  }
  var di = [], mi = 0, Tr = null, lo = 0, Jt = [], Wt = 0, Qn = null, yn = 1, bn = "";
  function Nn(e, t) {
    di[mi++] = lo, di[mi++] = Tr, Tr = e, lo = t;
  }
  function Am(e, t, a) {
    Jt[Wt++] = yn, Jt[Wt++] = bn, Jt[Wt++] = Qn, Qn = e;
    var r = yn;
    e = bn;
    var c = 32 - Yt(r) - 1;
    r &= ~(1 << c), a += 1;
    var u = 32 - Yt(t) + c;
    if (30 < u) {
      var h = c - c % 5;
      u = (r & (1 << h) - 1).toString(32), r >>= h, c -= h, yn = 1 << 32 - Yt(t) + c | a << c | r, bn = u + e;
    } else
      yn = 1 << u | a << c | r, bn = e;
  }
  function Bs(e) {
    e.return !== null && (Nn(e, 1), Am(e, 1, 0));
  }
  function Gs(e) {
    for (; e === Tr; )
      Tr = di[--mi], di[mi] = null, lo = di[--mi], di[mi] = null;
    for (; e === Qn; )
      Qn = Jt[--Wt], Jt[Wt] = null, bn = Jt[--Wt], Jt[Wt] = null, yn = Jt[--Wt], Jt[Wt] = null;
  }
  function Cm(e, t) {
    Jt[Wt++] = yn, Jt[Wt++] = bn, Jt[Wt++] = Qn, yn = t.id, bn = t.overflow, Qn = e;
  }
  var pt = null, qe = null, Te = !1, Jn = null, en = !1, Ks = Error(l(519));
  function Wn(e) {
    var t = Error(
      l(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw so(Qt(t, e)), Ks;
  }
  function Mm(e) {
    var t = e.stateNode, a = e.type, r = e.memoizedProps;
    switch (t[_t] = e, t[zt] = r, a) {
      case "dialog":
        we("cancel", t), we("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        we("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Mo.length; a++)
          we(Mo[a], t);
        break;
      case "source":
        we("error", t);
        break;
      case "img":
      case "image":
      case "link":
        we("error", t), we("load", t);
        break;
      case "details":
        we("toggle", t);
        break;
      case "input":
        we("invalid", t), qd(
          t,
          r.value,
          r.defaultValue,
          r.checked,
          r.defaultChecked,
          r.type,
          r.name,
          !0
        );
        break;
      case "select":
        we("invalid", t);
        break;
      case "textarea":
        we("invalid", t), Xd(t, r.value, r.defaultValue, r.children);
    }
    a = r.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || r.suppressHydrationWarning === !0 || I_(t.textContent, a) ? (r.popover != null && (we("beforetoggle", t), we("toggle", t)), r.onScroll != null && we("scroll", t), r.onScrollEnd != null && we("scrollend", t), r.onClick != null && (t.onclick = En), t = !0) : t = !1, t || Wn(e, !0);
  }
  function Om(e) {
    for (pt = e.return; pt; )
      switch (pt.tag) {
        case 5:
        case 31:
        case 13:
          en = !1;
          return;
        case 27:
        case 3:
          en = !0;
          return;
        default:
          pt = pt.return;
      }
  }
  function fi(e) {
    if (e !== pt) return !1;
    if (!Te) return Om(e), Te = !0, !1;
    var t = e.tag, a;
    if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = e.type, a = !(a !== "form" && a !== "button") || lu(e.type, e.memoizedProps)), a = !a), a && qe && Wn(e), Om(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      qe = ip(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      qe = ip(e);
    } else
      t === 27 ? (t = qe, fa(e.type) ? (e = mu, mu = null, qe = e) : qe = t) : qe = pt ? nn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function ja() {
    qe = pt = null, Te = !1;
  }
  function qs() {
    var e = Jn;
    return e !== null && (Ot === null ? Ot = e : Ot.push.apply(
      Ot,
      e
    ), Jn = null), e;
  }
  function so(e) {
    Jn === null ? Jn = [e] : Jn.push(e);
  }
  var Vs = E(null), Da = null, An = null;
  function ea(e, t, a) {
    W(Vs, t._currentValue), t._currentValue = a;
  }
  function Cn(e) {
    e._currentValue = Vs.current, L(Vs);
  }
  function Xs(e, t, a) {
    for (; e !== null; ) {
      var r = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === a) break;
      e = e.return;
    }
  }
  function $s(e, t, a, r) {
    var c = e.child;
    for (c !== null && (c.return = e); c !== null; ) {
      var u = c.dependencies;
      if (u !== null) {
        var h = c.child;
        u = u.firstContext;
        e: for (; u !== null; ) {
          var b = u;
          u = c;
          for (var x = 0; x < t.length; x++)
            if (b.context === t[x]) {
              u.lanes |= a, b = u.alternate, b !== null && (b.lanes |= a), Xs(
                u.return,
                a,
                e
              ), r || (h = null);
              break e;
            }
          u = b.next;
        }
      } else if (c.tag === 18) {
        if (h = c.return, h === null) throw Error(l(341));
        h.lanes |= a, u = h.alternate, u !== null && (u.lanes |= a), Xs(h, a, e), h = null;
      } else h = c.child;
      if (h !== null) h.return = c;
      else
        for (h = c; h !== null; ) {
          if (h === e) {
            h = null;
            break;
          }
          if (c = h.sibling, c !== null) {
            c.return = h.return, h = c;
            break;
          }
          h = h.return;
        }
      c = h;
    }
  }
  function _i(e, t, a, r) {
    e = null;
    for (var c = t, u = !1; c !== null; ) {
      if (!u) {
        if ((c.flags & 524288) !== 0) u = !0;
        else if ((c.flags & 262144) !== 0) break;
      }
      if (c.tag === 10) {
        var h = c.alternate;
        if (h === null) throw Error(l(387));
        if (h = h.memoizedProps, h !== null) {
          var b = c.type;
          Zt(c.pendingProps.value, h.value) || (e !== null ? e.push(b) : e = [b]);
        }
      } else if (c === ve.current) {
        if (h = c.alternate, h === null) throw Error(l(387));
        h.memoizedState.memoizedState !== c.memoizedState.memoizedState && (e !== null ? e.push(Lo) : e = [Lo]);
      }
      c = c.return;
    }
    e !== null && $s(
      t,
      e,
      a,
      r
    ), t.flags |= 262144;
  }
  function zr(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Zt(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function La(e) {
    Da = e, An = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function gt(e) {
    return Rm(Da, e);
  }
  function Nr(e, t) {
    return Da === null && La(e), Rm(e, t);
  }
  function Rm(e, t) {
    var a = t._currentValue;
    if (t = { context: t, memoizedValue: a, next: null }, An === null) {
      if (e === null) throw Error(l(308));
      An = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else An = An.next = t;
    return a;
  }
  var dy = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(a, r) {
        e.push(r);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(a) {
        return a();
      });
    };
  }, my = n.unstable_scheduleCallback, fy = n.unstable_NormalPriority, at = {
    $$typeof: D,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Ps() {
    return {
      controller: new dy(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function co(e) {
    e.refCount--, e.refCount === 0 && my(fy, function() {
      e.controller.abort();
    });
  }
  var uo = null, Is = 0, pi = 0, gi = null;
  function _y(e, t) {
    if (uo === null) {
      var a = uo = [];
      Is = 0, pi = Jc(), gi = {
        status: "pending",
        value: void 0,
        then: function(r) {
          a.push(r);
        }
      };
    }
    return Is++, t.then(jm, jm), t;
  }
  function jm() {
    if (--Is === 0 && uo !== null) {
      gi !== null && (gi.status = "fulfilled");
      var e = uo;
      uo = null, pi = 0, gi = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function py(e, t) {
    var a = [], r = {
      status: "pending",
      value: null,
      reason: null,
      then: function(c) {
        a.push(c);
      }
    };
    return e.then(
      function() {
        r.status = "fulfilled", r.value = t;
        for (var c = 0; c < a.length; c++) (0, a[c])(t);
      },
      function(c) {
        for (r.status = "rejected", r.reason = c, c = 0; c < a.length; c++)
          (0, a[c])(void 0);
      }
    ), r;
  }
  var Dm = T.S;
  T.S = function(e, t) {
    y_ = kt(), typeof t == "object" && t !== null && typeof t.then == "function" && _y(e, t), Dm !== null && Dm(e, t);
  };
  var Ua = E(null);
  function Fs() {
    var e = Ua.current;
    return e !== null ? e : Be.pooledCache;
  }
  function Ar(e, t) {
    t === null ? W(Ua, Ua.current) : W(Ua, t.pool);
  }
  function Lm() {
    var e = Fs();
    return e === null ? null : { parent: at._currentValue, pool: e };
  }
  var hi = Error(l(460)), Qs = Error(l(474)), Cr = Error(l(542)), Mr = { then: function() {
  } };
  function Um(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Ym(e, t, a) {
    switch (a = e[a], a === void 0 ? e.push(t) : a !== t && (t.then(En, En), t = a), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Hm(e), e;
      default:
        if (typeof t.status == "string") t.then(En, En);
        else {
          if (e = Be, e !== null && 100 < e.shellSuspendCounter)
            throw Error(l(482));
          e = t, e.status = "pending", e.then(
            function(r) {
              if (t.status === "pending") {
                var c = t;
                c.status = "fulfilled", c.value = r;
              }
            },
            function(r) {
              if (t.status === "pending") {
                var c = t;
                c.status = "rejected", c.reason = r;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, Hm(e), e;
        }
        throw Za = t, hi;
    }
  }
  function Ya(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function" ? (Za = a, hi) : a;
    }
  }
  var Za = null;
  function Zm() {
    if (Za === null) throw Error(l(459));
    var e = Za;
    return Za = null, e;
  }
  function Hm(e) {
    if (e === hi || e === Cr)
      throw Error(l(483));
  }
  var vi = null, mo = 0;
  function Or(e) {
    var t = mo;
    return mo += 1, vi === null && (vi = []), Ym(vi, e, t);
  }
  function fo(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Rr(e, t) {
    throw t.$$typeof === k ? Error(l(525)) : (e = Object.prototype.toString.call(t), Error(
      l(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Bm(e) {
    function t(C, z) {
      if (e) {
        var R = C.deletions;
        R === null ? (C.deletions = [z], C.flags |= 16) : R.push(z);
      }
    }
    function a(C, z) {
      if (!e) return null;
      for (; z !== null; )
        t(C, z), z = z.sibling;
      return null;
    }
    function r(C) {
      for (var z = /* @__PURE__ */ new Map(); C !== null; )
        C.key !== null ? z.set(C.key, C) : z.set(C.index, C), C = C.sibling;
      return z;
    }
    function c(C, z) {
      return C = zn(C, z), C.index = 0, C.sibling = null, C;
    }
    function u(C, z, R) {
      return C.index = R, e ? (R = C.alternate, R !== null ? (R = R.index, R < z ? (C.flags |= 67108866, z) : R) : (C.flags |= 67108866, z)) : (C.flags |= 1048576, z);
    }
    function h(C) {
      return e && C.alternate === null && (C.flags |= 67108866), C;
    }
    function b(C, z, R, V) {
      return z === null || z.tag !== 6 ? (z = Zs(R, C.mode, V), z.return = C, z) : (z = c(z, R), z.return = C, z);
    }
    function x(C, z, R, V) {
      var ue = R.type;
      return ue === N ? q(
        C,
        z,
        R.props.children,
        V,
        R.key
      ) : z !== null && (z.elementType === ue || typeof ue == "object" && ue !== null && ue.$$typeof === ee && Ya(ue) === z.type) ? (z = c(z, R.props), fo(z, R), z.return = C, z) : (z = Er(
        R.type,
        R.key,
        R.props,
        null,
        C.mode,
        V
      ), fo(z, R), z.return = C, z);
    }
    function j(C, z, R, V) {
      return z === null || z.tag !== 4 || z.stateNode.containerInfo !== R.containerInfo || z.stateNode.implementation !== R.implementation ? (z = Hs(R, C.mode, V), z.return = C, z) : (z = c(z, R.children || []), z.return = C, z);
    }
    function q(C, z, R, V, ue) {
      return z === null || z.tag !== 7 ? (z = Ra(
        R,
        C.mode,
        V,
        ue
      ), z.return = C, z) : (z = c(z, R), z.return = C, z);
    }
    function P(C, z, R) {
      if (typeof z == "string" && z !== "" || typeof z == "number" || typeof z == "bigint")
        return z = Zs(
          "" + z,
          C.mode,
          R
        ), z.return = C, z;
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case S:
            return R = Er(
              z.type,
              z.key,
              z.props,
              null,
              C.mode,
              R
            ), fo(R, z), R.return = C, R;
          case w:
            return z = Hs(
              z,
              C.mode,
              R
            ), z.return = C, z;
          case ee:
            return z = Ya(z), P(C, z, R);
        }
        if (F(z) || G(z))
          return z = Ra(
            z,
            C.mode,
            R,
            null
          ), z.return = C, z;
        if (typeof z.then == "function")
          return P(C, Or(z), R);
        if (z.$$typeof === D)
          return P(
            C,
            Nr(C, z),
            R
          );
        Rr(C, z);
      }
      return null;
    }
    function U(C, z, R, V) {
      var ue = z !== null ? z.key : null;
      if (typeof R == "string" && R !== "" || typeof R == "number" || typeof R == "bigint")
        return ue !== null ? null : b(C, z, "" + R, V);
      if (typeof R == "object" && R !== null) {
        switch (R.$$typeof) {
          case S:
            return R.key === ue ? x(C, z, R, V) : null;
          case w:
            return R.key === ue ? j(C, z, R, V) : null;
          case ee:
            return R = Ya(R), U(C, z, R, V);
        }
        if (F(R) || G(R))
          return ue !== null ? null : q(C, z, R, V, null);
        if (typeof R.then == "function")
          return U(
            C,
            z,
            Or(R),
            V
          );
        if (R.$$typeof === D)
          return U(
            C,
            z,
            Nr(C, R),
            V
          );
        Rr(C, R);
      }
      return null;
    }
    function H(C, z, R, V, ue) {
      if (typeof V == "string" && V !== "" || typeof V == "number" || typeof V == "bigint")
        return C = C.get(R) || null, b(z, C, "" + V, ue);
      if (typeof V == "object" && V !== null) {
        switch (V.$$typeof) {
          case S:
            return C = C.get(
              V.key === null ? R : V.key
            ) || null, x(z, C, V, ue);
          case w:
            return C = C.get(
              V.key === null ? R : V.key
            ) || null, j(z, C, V, ue);
          case ee:
            return V = Ya(V), H(
              C,
              z,
              R,
              V,
              ue
            );
        }
        if (F(V) || G(V))
          return C = C.get(R) || null, q(z, C, V, ue, null);
        if (typeof V.then == "function")
          return H(
            C,
            z,
            R,
            Or(V),
            ue
          );
        if (V.$$typeof === D)
          return H(
            C,
            z,
            R,
            Nr(z, V),
            ue
          );
        Rr(z, V);
      }
      return null;
    }
    function oe(C, z, R, V) {
      for (var ue = null, Ce = null, se = z, Se = z = 0, Ee = null; se !== null && Se < R.length; Se++) {
        se.index > Se ? (Ee = se, se = null) : Ee = se.sibling;
        var Me = U(
          C,
          se,
          R[Se],
          V
        );
        if (Me === null) {
          se === null && (se = Ee);
          break;
        }
        e && se && Me.alternate === null && t(C, se), z = u(Me, z, Se), Ce === null ? ue = Me : Ce.sibling = Me, Ce = Me, se = Ee;
      }
      if (Se === R.length)
        return a(C, se), Te && Nn(C, Se), ue;
      if (se === null) {
        for (; Se < R.length; Se++)
          se = P(C, R[Se], V), se !== null && (z = u(
            se,
            z,
            Se
          ), Ce === null ? ue = se : Ce.sibling = se, Ce = se);
        return Te && Nn(C, Se), ue;
      }
      for (se = r(se); Se < R.length; Se++)
        Ee = H(
          se,
          C,
          Se,
          R[Se],
          V
        ), Ee !== null && (e && Ee.alternate !== null && se.delete(
          Ee.key === null ? Se : Ee.key
        ), z = u(
          Ee,
          z,
          Se
        ), Ce === null ? ue = Ee : Ce.sibling = Ee, Ce = Ee);
      return e && se.forEach(function(va) {
        return t(C, va);
      }), Te && Nn(C, Se), ue;
    }
    function he(C, z, R, V) {
      if (R == null) throw Error(l(151));
      for (var ue = null, Ce = null, se = z, Se = z = 0, Ee = null, Me = R.next(); se !== null && !Me.done; Se++, Me = R.next()) {
        se.index > Se ? (Ee = se, se = null) : Ee = se.sibling;
        var va = U(C, se, Me.value, V);
        if (va === null) {
          se === null && (se = Ee);
          break;
        }
        e && se && va.alternate === null && t(C, se), z = u(va, z, Se), Ce === null ? ue = va : Ce.sibling = va, Ce = va, se = Ee;
      }
      if (Me.done)
        return a(C, se), Te && Nn(C, Se), ue;
      if (se === null) {
        for (; !Me.done; Se++, Me = R.next())
          Me = P(C, Me.value, V), Me !== null && (z = u(Me, z, Se), Ce === null ? ue = Me : Ce.sibling = Me, Ce = Me);
        return Te && Nn(C, Se), ue;
      }
      for (se = r(se); !Me.done; Se++, Me = R.next())
        Me = H(se, C, Se, Me.value, V), Me !== null && (e && Me.alternate !== null && se.delete(Me.key === null ? Se : Me.key), z = u(Me, z, Se), Ce === null ? ue = Me : Ce.sibling = Me, Ce = Me);
      return e && se.forEach(function(Tb) {
        return t(C, Tb);
      }), Te && Nn(C, Se), ue;
    }
    function He(C, z, R, V) {
      if (typeof R == "object" && R !== null && R.type === N && R.key === null && (R = R.props.children), typeof R == "object" && R !== null) {
        switch (R.$$typeof) {
          case S:
            e: {
              for (var ue = R.key; z !== null; ) {
                if (z.key === ue) {
                  if (ue = R.type, ue === N) {
                    if (z.tag === 7) {
                      a(
                        C,
                        z.sibling
                      ), V = c(
                        z,
                        R.props.children
                      ), V.return = C, C = V;
                      break e;
                    }
                  } else if (z.elementType === ue || typeof ue == "object" && ue !== null && ue.$$typeof === ee && Ya(ue) === z.type) {
                    a(
                      C,
                      z.sibling
                    ), V = c(z, R.props), fo(V, R), V.return = C, C = V;
                    break e;
                  }
                  a(C, z);
                  break;
                } else t(C, z);
                z = z.sibling;
              }
              R.type === N ? (V = Ra(
                R.props.children,
                C.mode,
                V,
                R.key
              ), V.return = C, C = V) : (V = Er(
                R.type,
                R.key,
                R.props,
                null,
                C.mode,
                V
              ), fo(V, R), V.return = C, C = V);
            }
            return h(C);
          case w:
            e: {
              for (ue = R.key; z !== null; ) {
                if (z.key === ue)
                  if (z.tag === 4 && z.stateNode.containerInfo === R.containerInfo && z.stateNode.implementation === R.implementation) {
                    a(
                      C,
                      z.sibling
                    ), V = c(z, R.children || []), V.return = C, C = V;
                    break e;
                  } else {
                    a(C, z);
                    break;
                  }
                else t(C, z);
                z = z.sibling;
              }
              V = Hs(R, C.mode, V), V.return = C, C = V;
            }
            return h(C);
          case ee:
            return R = Ya(R), He(
              C,
              z,
              R,
              V
            );
        }
        if (F(R))
          return oe(
            C,
            z,
            R,
            V
          );
        if (G(R)) {
          if (ue = G(R), typeof ue != "function") throw Error(l(150));
          return R = ue.call(R), he(
            C,
            z,
            R,
            V
          );
        }
        if (typeof R.then == "function")
          return He(
            C,
            z,
            Or(R),
            V
          );
        if (R.$$typeof === D)
          return He(
            C,
            z,
            Nr(C, R),
            V
          );
        Rr(C, R);
      }
      return typeof R == "string" && R !== "" || typeof R == "number" || typeof R == "bigint" ? (R = "" + R, z !== null && z.tag === 6 ? (a(C, z.sibling), V = c(z, R), V.return = C, C = V) : (a(C, z), V = Zs(R, C.mode, V), V.return = C, C = V), h(C)) : a(C, z);
    }
    return function(C, z, R, V) {
      try {
        mo = 0;
        var ue = He(
          C,
          z,
          R,
          V
        );
        return vi = null, ue;
      } catch (se) {
        if (se === hi || se === Cr) throw se;
        var Ce = Ht(29, se, null, C.mode);
        return Ce.lanes = V, Ce.return = C, Ce;
      }
    };
  }
  var Ha = Bm(!0), Gm = Bm(!1), ta = !1;
  function Js(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Ws(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function na(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function aa(e, t, a) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, (Re & 2) !== 0) {
      var c = r.pending;
      return c === null ? t.next = t : (t.next = c.next, c.next = t), r.pending = t, t = xr(e), Em(e, null, a), t;
    }
    return wr(e, r, t, a), xr(e);
  }
  function _o(e, t, a) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
      var r = t.lanes;
      r &= e.pendingLanes, a |= r, t.lanes = a, Rd(e, a);
    }
  }
  function ec(e, t) {
    var a = e.updateQueue, r = e.alternate;
    if (r !== null && (r = r.updateQueue, a === r)) {
      var c = null, u = null;
      if (a = a.firstBaseUpdate, a !== null) {
        do {
          var h = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null
          };
          u === null ? c = u = h : u = u.next = h, a = a.next;
        } while (a !== null);
        u === null ? c = u = t : u = u.next = t;
      } else c = u = t;
      a = {
        baseState: r.baseState,
        firstBaseUpdate: c,
        lastBaseUpdate: u,
        shared: r.shared,
        callbacks: r.callbacks
      }, e.updateQueue = a;
      return;
    }
    e = a.lastBaseUpdate, e === null ? a.firstBaseUpdate = t : e.next = t, a.lastBaseUpdate = t;
  }
  var tc = !1;
  function po() {
    if (tc) {
      var e = gi;
      if (e !== null) throw e;
    }
  }
  function go(e, t, a, r) {
    tc = !1;
    var c = e.updateQueue;
    ta = !1;
    var u = c.firstBaseUpdate, h = c.lastBaseUpdate, b = c.shared.pending;
    if (b !== null) {
      c.shared.pending = null;
      var x = b, j = x.next;
      x.next = null, h === null ? u = j : h.next = j, h = x;
      var q = e.alternate;
      q !== null && (q = q.updateQueue, b = q.lastBaseUpdate, b !== h && (b === null ? q.firstBaseUpdate = j : b.next = j, q.lastBaseUpdate = x));
    }
    if (u !== null) {
      var P = c.baseState;
      h = 0, q = j = x = null, b = u;
      do {
        var U = b.lane & -536870913, H = U !== b.lane;
        if (H ? (xe & U) === U : (r & U) === U) {
          U !== 0 && U === pi && (tc = !0), q !== null && (q = q.next = {
            lane: 0,
            tag: b.tag,
            payload: b.payload,
            callback: null,
            next: null
          });
          e: {
            var oe = e, he = b;
            U = t;
            var He = a;
            switch (he.tag) {
              case 1:
                if (oe = he.payload, typeof oe == "function") {
                  P = oe.call(He, P, U);
                  break e;
                }
                P = oe;
                break e;
              case 3:
                oe.flags = oe.flags & -65537 | 128;
              case 0:
                if (oe = he.payload, U = typeof oe == "function" ? oe.call(He, P, U) : oe, U == null) break e;
                P = y({}, P, U);
                break e;
              case 2:
                ta = !0;
            }
          }
          U = b.callback, U !== null && (e.flags |= 64, H && (e.flags |= 8192), H = c.callbacks, H === null ? c.callbacks = [U] : H.push(U));
        } else
          H = {
            lane: U,
            tag: b.tag,
            payload: b.payload,
            callback: b.callback,
            next: null
          }, q === null ? (j = q = H, x = P) : q = q.next = H, h |= U;
        if (b = b.next, b === null) {
          if (b = c.shared.pending, b === null)
            break;
          H = b, b = H.next, H.next = null, c.lastBaseUpdate = H, c.shared.pending = null;
        }
      } while (!0);
      q === null && (x = P), c.baseState = x, c.firstBaseUpdate = j, c.lastBaseUpdate = q, u === null && (c.shared.lanes = 0), sa |= h, e.lanes = h, e.memoizedState = P;
    }
  }
  function Km(e, t) {
    if (typeof e != "function")
      throw Error(l(191, e));
    e.call(t);
  }
  function qm(e, t) {
    var a = e.callbacks;
    if (a !== null)
      for (e.callbacks = null, e = 0; e < a.length; e++)
        Km(a[e], t);
  }
  var yi = E(null), jr = E(0);
  function Vm(e, t) {
    e = Zn, W(jr, e), W(yi, t), Zn = e | t.baseLanes;
  }
  function nc() {
    W(jr, Zn), W(yi, yi.current);
  }
  function ac() {
    Zn = jr.current, L(yi), L(jr);
  }
  var Bt = E(null), tn = null;
  function ia(e) {
    var t = e.alternate;
    W(et, et.current & 1), W(Bt, e), tn === null && (t === null || yi.current !== null || t.memoizedState !== null) && (tn = e);
  }
  function ic(e) {
    W(et, et.current), W(Bt, e), tn === null && (tn = e);
  }
  function Xm(e) {
    e.tag === 22 ? (W(et, et.current), W(Bt, e), tn === null && (tn = e)) : oa();
  }
  function oa() {
    W(et, et.current), W(Bt, Bt.current);
  }
  function Gt(e) {
    L(Bt), tn === e && (tn = null), L(et);
  }
  var et = E(0);
  function Dr(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && (a = a.dehydrated, a === null || uu(a) || du(a)))
          return t;
      } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var Mn = 0, be = null, Ye = null, it = null, Lr = !1, bi = !1, Ba = !1, Ur = 0, ho = 0, Si = null, gy = 0;
  function Fe() {
    throw Error(l(321));
  }
  function oc(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++)
      if (!Zt(e[a], t[a])) return !1;
    return !0;
  }
  function rc(e, t, a, r, c, u) {
    return Mn = u, be = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, T.H = e === null || e.memoizedState === null ? Cf : Sc, Ba = !1, u = a(r, c), Ba = !1, bi && (u = Pm(
      t,
      a,
      r,
      c
    )), $m(e), u;
  }
  function $m(e) {
    T.H = bo;
    var t = Ye !== null && Ye.next !== null;
    if (Mn = 0, it = Ye = be = null, Lr = !1, ho = 0, Si = null, t) throw Error(l(300));
    e === null || ot || (e = e.dependencies, e !== null && zr(e) && (ot = !0));
  }
  function Pm(e, t, a, r) {
    be = e;
    var c = 0;
    do {
      if (bi && (Si = null), ho = 0, bi = !1, 25 <= c) throw Error(l(301));
      if (c += 1, it = Ye = null, e.updateQueue != null) {
        var u = e.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      T.H = Mf, u = t(a, r);
    } while (bi);
    return u;
  }
  function hy() {
    var e = T.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? vo(t) : t, e = e.useState()[0], (Ye !== null ? Ye.memoizedState : null) !== e && (be.flags |= 1024), t;
  }
  function lc() {
    var e = Ur !== 0;
    return Ur = 0, e;
  }
  function sc(e, t, a) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a;
  }
  function cc(e) {
    if (Lr) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Lr = !1;
    }
    Mn = 0, it = Ye = be = null, bi = !1, ho = Ur = 0, Si = null;
  }
  function wt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return it === null ? be.memoizedState = it = e : it = it.next = e, it;
  }
  function tt() {
    if (Ye === null) {
      var e = be.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ye.next;
    var t = it === null ? be.memoizedState : it.next;
    if (t !== null)
      it = t, Ye = e;
    else {
      if (e === null)
        throw be.alternate === null ? Error(l(467)) : Error(l(310));
      Ye = e, e = {
        memoizedState: Ye.memoizedState,
        baseState: Ye.baseState,
        baseQueue: Ye.baseQueue,
        queue: Ye.queue,
        next: null
      }, it === null ? be.memoizedState = it = e : it = it.next = e;
    }
    return it;
  }
  function Yr() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function vo(e) {
    var t = ho;
    return ho += 1, Si === null && (Si = []), e = Ym(Si, e, t), t = be, (it === null ? t.memoizedState : it.next) === null && (t = t.alternate, T.H = t === null || t.memoizedState === null ? Cf : Sc), e;
  }
  function Zr(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return vo(e);
      if (e.$$typeof === D) return gt(e);
    }
    throw Error(l(438, String(e)));
  }
  function uc(e) {
    var t = null, a = be.updateQueue;
    if (a !== null && (t = a.memoCache), t == null) {
      var r = be.alternate;
      r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
        data: r.data.map(function(c) {
          return c.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), a === null && (a = Yr(), be.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0)
      for (a = t.data[t.index] = Array(e), r = 0; r < e; r++)
        a[r] = me;
    return t.index++, a;
  }
  function On(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Hr(e) {
    var t = tt();
    return dc(t, Ye, e);
  }
  function dc(e, t, a) {
    var r = e.queue;
    if (r === null) throw Error(l(311));
    r.lastRenderedReducer = a;
    var c = e.baseQueue, u = r.pending;
    if (u !== null) {
      if (c !== null) {
        var h = c.next;
        c.next = u.next, u.next = h;
      }
      t.baseQueue = c = u, r.pending = null;
    }
    if (u = e.baseState, c === null) e.memoizedState = u;
    else {
      t = c.next;
      var b = h = null, x = null, j = t, q = !1;
      do {
        var P = j.lane & -536870913;
        if (P !== j.lane ? (xe & P) === P : (Mn & P) === P) {
          var U = j.revertLane;
          if (U === 0)
            x !== null && (x = x.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: j.action,
              hasEagerState: j.hasEagerState,
              eagerState: j.eagerState,
              next: null
            }), P === pi && (q = !0);
          else if ((Mn & U) === U) {
            j = j.next, U === pi && (q = !0);
            continue;
          } else
            P = {
              lane: 0,
              revertLane: j.revertLane,
              gesture: null,
              action: j.action,
              hasEagerState: j.hasEagerState,
              eagerState: j.eagerState,
              next: null
            }, x === null ? (b = x = P, h = u) : x = x.next = P, be.lanes |= U, sa |= U;
          P = j.action, Ba && a(u, P), u = j.hasEagerState ? j.eagerState : a(u, P);
        } else
          U = {
            lane: P,
            revertLane: j.revertLane,
            gesture: j.gesture,
            action: j.action,
            hasEagerState: j.hasEagerState,
            eagerState: j.eagerState,
            next: null
          }, x === null ? (b = x = U, h = u) : x = x.next = U, be.lanes |= P, sa |= P;
        j = j.next;
      } while (j !== null && j !== t);
      if (x === null ? h = u : x.next = b, !Zt(u, e.memoizedState) && (ot = !0, q && (a = gi, a !== null)))
        throw a;
      e.memoizedState = u, e.baseState = h, e.baseQueue = x, r.lastRenderedState = u;
    }
    return c === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
  }
  function mc(e) {
    var t = tt(), a = t.queue;
    if (a === null) throw Error(l(311));
    a.lastRenderedReducer = e;
    var r = a.dispatch, c = a.pending, u = t.memoizedState;
    if (c !== null) {
      a.pending = null;
      var h = c = c.next;
      do
        u = e(u, h.action), h = h.next;
      while (h !== c);
      Zt(u, t.memoizedState) || (ot = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), a.lastRenderedState = u;
    }
    return [u, r];
  }
  function Im(e, t, a) {
    var r = be, c = tt(), u = Te;
    if (u) {
      if (a === void 0) throw Error(l(407));
      a = a();
    } else a = t();
    var h = !Zt(
      (Ye || c).memoizedState,
      a
    );
    if (h && (c.memoizedState = a, ot = !0), c = c.queue, pc(Jm.bind(null, r, c, e), [
      e
    ]), c.getSnapshot !== t || h || it !== null && it.memoizedState.tag & 1) {
      if (r.flags |= 2048, ki(
        9,
        { destroy: void 0 },
        Qm.bind(
          null,
          r,
          c,
          a,
          t
        ),
        null
      ), Be === null) throw Error(l(349));
      u || (Mn & 127) !== 0 || Fm(r, t, a);
    }
    return a;
  }
  function Fm(e, t, a) {
    e.flags |= 16384, e = { getSnapshot: t, value: a }, t = be.updateQueue, t === null ? (t = Yr(), be.updateQueue = t, t.stores = [e]) : (a = t.stores, a === null ? t.stores = [e] : a.push(e));
  }
  function Qm(e, t, a, r) {
    t.value = a, t.getSnapshot = r, Wm(t) && ef(e);
  }
  function Jm(e, t, a) {
    return a(function() {
      Wm(t) && ef(e);
    });
  }
  function Wm(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !Zt(e, a);
    } catch {
      return !0;
    }
  }
  function ef(e) {
    var t = Oa(e, 2);
    t !== null && Rt(t, e, 2);
  }
  function fc(e) {
    var t = wt();
    if (typeof e == "function") {
      var a = e;
      if (e = a(), Ba) {
        Pn(!0);
        try {
          a();
        } finally {
          Pn(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: On,
      lastRenderedState: e
    }, t;
  }
  function tf(e, t, a, r) {
    return e.baseState = a, dc(
      e,
      Ye,
      typeof r == "function" ? r : On
    );
  }
  function vy(e, t, a, r, c) {
    if (Kr(e)) throw Error(l(485));
    if (e = t.action, e !== null) {
      var u = {
        payload: c,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(h) {
          u.listeners.push(h);
        }
      };
      T.T !== null ? a(!0) : u.isTransition = !1, r(u), a = t.pending, a === null ? (u.next = t.pending = u, nf(t, u)) : (u.next = a.next, t.pending = a.next = u);
    }
  }
  function nf(e, t) {
    var a = t.action, r = t.payload, c = e.state;
    if (t.isTransition) {
      var u = T.T, h = {};
      T.T = h;
      try {
        var b = a(c, r), x = T.S;
        x !== null && x(h, b), af(e, t, b);
      } catch (j) {
        _c(e, t, j);
      } finally {
        u !== null && h.types !== null && (u.types = h.types), T.T = u;
      }
    } else
      try {
        u = a(c, r), af(e, t, u);
      } catch (j) {
        _c(e, t, j);
      }
  }
  function af(e, t, a) {
    a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(
      function(r) {
        of(e, t, r);
      },
      function(r) {
        return _c(e, t, r);
      }
    ) : of(e, t, a);
  }
  function of(e, t, a) {
    t.status = "fulfilled", t.value = a, rf(t), e.state = a, t = e.pending, t !== null && (a = t.next, a === t ? e.pending = null : (a = a.next, t.next = a, nf(e, a)));
  }
  function _c(e, t, a) {
    var r = e.pending;
    if (e.pending = null, r !== null) {
      r = r.next;
      do
        t.status = "rejected", t.reason = a, rf(t), t = t.next;
      while (t !== r);
    }
    e.action = null;
  }
  function rf(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function lf(e, t) {
    return t;
  }
  function sf(e, t) {
    if (Te) {
      var a = Be.formState;
      if (a !== null) {
        e: {
          var r = be;
          if (Te) {
            if (qe) {
              t: {
                for (var c = qe, u = en; c.nodeType !== 8; ) {
                  if (!u) {
                    c = null;
                    break t;
                  }
                  if (c = nn(
                    c.nextSibling
                  ), c === null) {
                    c = null;
                    break t;
                  }
                }
                u = c.data, c = u === "F!" || u === "F" ? c : null;
              }
              if (c) {
                qe = nn(
                  c.nextSibling
                ), r = c.data === "F!";
                break e;
              }
            }
            Wn(r);
          }
          r = !1;
        }
        r && (t = a[0]);
      }
    }
    return a = wt(), a.memoizedState = a.baseState = t, r = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: lf,
      lastRenderedState: t
    }, a.queue = r, a = zf.bind(
      null,
      be,
      r
    ), r.dispatch = a, r = fc(!1), u = bc.bind(
      null,
      be,
      !1,
      r.queue
    ), r = wt(), c = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, r.queue = c, a = vy.bind(
      null,
      be,
      c,
      u,
      a
    ), c.dispatch = a, r.memoizedState = e, [t, a, !1];
  }
  function cf(e) {
    var t = tt();
    return uf(t, Ye, e);
  }
  function uf(e, t, a) {
    if (t = dc(
      e,
      t,
      lf
    )[0], e = Hr(On)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var r = vo(t);
      } catch (h) {
        throw h === hi ? Cr : h;
      }
    else r = t;
    t = tt();
    var c = t.queue, u = c.dispatch;
    return a !== t.memoizedState && (be.flags |= 2048, ki(
      9,
      { destroy: void 0 },
      yy.bind(null, c, a),
      null
    )), [r, u, e];
  }
  function yy(e, t) {
    e.action = t;
  }
  function df(e) {
    var t = tt(), a = Ye;
    if (a !== null)
      return uf(t, a, e);
    tt(), t = t.memoizedState, a = tt();
    var r = a.queue.dispatch;
    return a.memoizedState = e, [t, r, !1];
  }
  function ki(e, t, a, r) {
    return e = { tag: e, create: a, deps: r, inst: t, next: null }, t = be.updateQueue, t === null && (t = Yr(), be.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = e.next = e : (r = a.next, a.next = e, e.next = r, t.lastEffect = e), e;
  }
  function mf() {
    return tt().memoizedState;
  }
  function Br(e, t, a, r) {
    var c = wt();
    be.flags |= e, c.memoizedState = ki(
      1 | t,
      { destroy: void 0 },
      a,
      r === void 0 ? null : r
    );
  }
  function Gr(e, t, a, r) {
    var c = tt();
    r = r === void 0 ? null : r;
    var u = c.memoizedState.inst;
    Ye !== null && r !== null && oc(r, Ye.memoizedState.deps) ? c.memoizedState = ki(t, u, a, r) : (be.flags |= e, c.memoizedState = ki(
      1 | t,
      u,
      a,
      r
    ));
  }
  function ff(e, t) {
    Br(8390656, 8, e, t);
  }
  function pc(e, t) {
    Gr(2048, 8, e, t);
  }
  function by(e) {
    be.flags |= 4;
    var t = be.updateQueue;
    if (t === null)
      t = Yr(), be.updateQueue = t, t.events = [e];
    else {
      var a = t.events;
      a === null ? t.events = [e] : a.push(e);
    }
  }
  function _f(e) {
    var t = tt().memoizedState;
    return by({ ref: t, nextImpl: e }), function() {
      if ((Re & 2) !== 0) throw Error(l(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function pf(e, t) {
    return Gr(4, 2, e, t);
  }
  function gf(e, t) {
    return Gr(4, 4, e, t);
  }
  function hf(e, t) {
    if (typeof t == "function") {
      e = e();
      var a = t(e);
      return function() {
        typeof a == "function" ? a() : t(null);
      };
    }
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function vf(e, t, a) {
    a = a != null ? a.concat([e]) : null, Gr(4, 4, hf.bind(null, t, e), a);
  }
  function gc() {
  }
  function yf(e, t) {
    var a = tt();
    t = t === void 0 ? null : t;
    var r = a.memoizedState;
    return t !== null && oc(t, r[1]) ? r[0] : (a.memoizedState = [e, t], e);
  }
  function bf(e, t) {
    var a = tt();
    t = t === void 0 ? null : t;
    var r = a.memoizedState;
    if (t !== null && oc(t, r[1]))
      return r[0];
    if (r = e(), Ba) {
      Pn(!0);
      try {
        e();
      } finally {
        Pn(!1);
      }
    }
    return a.memoizedState = [r, t], r;
  }
  function hc(e, t, a) {
    return a === void 0 || (Mn & 1073741824) !== 0 && (xe & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = a, e = S_(), be.lanes |= e, sa |= e, a);
  }
  function Sf(e, t, a, r) {
    return Zt(a, t) ? a : yi.current !== null ? (e = hc(e, a, r), Zt(e, t) || (ot = !0), e) : (Mn & 42) === 0 || (Mn & 1073741824) !== 0 && (xe & 261930) === 0 ? (ot = !0, e.memoizedState = a) : (e = S_(), be.lanes |= e, sa |= e, t);
  }
  function kf(e, t, a, r, c) {
    var u = J.p;
    J.p = u !== 0 && 8 > u ? u : 8;
    var h = T.T, b = {};
    T.T = b, bc(e, !1, t, a);
    try {
      var x = c(), j = T.S;
      if (j !== null && j(b, x), x !== null && typeof x == "object" && typeof x.then == "function") {
        var q = py(
          x,
          r
        );
        yo(
          e,
          t,
          q,
          Vt(e)
        );
      } else
        yo(
          e,
          t,
          r,
          Vt(e)
        );
    } catch (P) {
      yo(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: P },
        Vt()
      );
    } finally {
      J.p = u, h !== null && b.types !== null && (h.types = b.types), T.T = h;
    }
  }
  function Sy() {
  }
  function vc(e, t, a, r) {
    if (e.tag !== 5) throw Error(l(476));
    var c = wf(e).queue;
    kf(
      e,
      c,
      t,
      ne,
      a === null ? Sy : function() {
        return xf(e), a(r);
      }
    );
  }
  function wf(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: ne,
      baseState: ne,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: On,
        lastRenderedState: ne
      },
      next: null
    };
    var a = {};
    return t.next = {
      memoizedState: a,
      baseState: a,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: On,
        lastRenderedState: a
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function xf(e) {
    var t = wf(e);
    t.next === null && (t = e.alternate.memoizedState), yo(
      e,
      t.next.queue,
      {},
      Vt()
    );
  }
  function yc() {
    return gt(Lo);
  }
  function Ef() {
    return tt().memoizedState;
  }
  function Tf() {
    return tt().memoizedState;
  }
  function ky(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = Vt();
          e = na(a);
          var r = aa(t, e, a);
          r !== null && (Rt(r, t, a), _o(r, t, a)), t = { cache: Ps() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function wy(e, t, a) {
    var r = Vt();
    a = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Kr(e) ? Nf(t, a) : (a = Us(e, t, a, r), a !== null && (Rt(a, e, r), Af(a, t, r)));
  }
  function zf(e, t, a) {
    var r = Vt();
    yo(e, t, a, r);
  }
  function yo(e, t, a, r) {
    var c = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Kr(e)) Nf(t, c);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null))
        try {
          var h = t.lastRenderedState, b = u(h, a);
          if (c.hasEagerState = !0, c.eagerState = b, Zt(b, h))
            return wr(e, t, c, 0), Be === null && kr(), !1;
        } catch {
        }
      if (a = Us(e, t, c, r), a !== null)
        return Rt(a, e, r), Af(a, t, r), !0;
    }
    return !1;
  }
  function bc(e, t, a, r) {
    if (r = {
      lane: 2,
      revertLane: Jc(),
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Kr(e)) {
      if (t) throw Error(l(479));
    } else
      t = Us(
        e,
        a,
        r,
        2
      ), t !== null && Rt(t, e, 2);
  }
  function Kr(e) {
    var t = e.alternate;
    return e === be || t !== null && t === be;
  }
  function Nf(e, t) {
    bi = Lr = !0;
    var a = e.pending;
    a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
  }
  function Af(e, t, a) {
    if ((a & 4194048) !== 0) {
      var r = t.lanes;
      r &= e.pendingLanes, a |= r, t.lanes = a, Rd(e, a);
    }
  }
  var bo = {
    readContext: gt,
    use: Zr,
    useCallback: Fe,
    useContext: Fe,
    useEffect: Fe,
    useImperativeHandle: Fe,
    useLayoutEffect: Fe,
    useInsertionEffect: Fe,
    useMemo: Fe,
    useReducer: Fe,
    useRef: Fe,
    useState: Fe,
    useDebugValue: Fe,
    useDeferredValue: Fe,
    useTransition: Fe,
    useSyncExternalStore: Fe,
    useId: Fe,
    useHostTransitionStatus: Fe,
    useFormState: Fe,
    useActionState: Fe,
    useOptimistic: Fe,
    useMemoCache: Fe,
    useCacheRefresh: Fe
  };
  bo.useEffectEvent = Fe;
  var Cf = {
    readContext: gt,
    use: Zr,
    useCallback: function(e, t) {
      return wt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: gt,
    useEffect: ff,
    useImperativeHandle: function(e, t, a) {
      a = a != null ? a.concat([e]) : null, Br(
        4194308,
        4,
        hf.bind(null, t, e),
        a
      );
    },
    useLayoutEffect: function(e, t) {
      return Br(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Br(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var a = wt();
      t = t === void 0 ? null : t;
      var r = e();
      if (Ba) {
        Pn(!0);
        try {
          e();
        } finally {
          Pn(!1);
        }
      }
      return a.memoizedState = [r, t], r;
    },
    useReducer: function(e, t, a) {
      var r = wt();
      if (a !== void 0) {
        var c = a(t);
        if (Ba) {
          Pn(!0);
          try {
            a(t);
          } finally {
            Pn(!1);
          }
        }
      } else c = t;
      return r.memoizedState = r.baseState = c, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: c
      }, r.queue = e, e = e.dispatch = wy.bind(
        null,
        be,
        e
      ), [r.memoizedState, e];
    },
    useRef: function(e) {
      var t = wt();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = fc(e);
      var t = e.queue, a = zf.bind(null, be, t);
      return t.dispatch = a, [e.memoizedState, a];
    },
    useDebugValue: gc,
    useDeferredValue: function(e, t) {
      var a = wt();
      return hc(a, e, t);
    },
    useTransition: function() {
      var e = fc(!1);
      return e = kf.bind(
        null,
        be,
        e.queue,
        !0,
        !1
      ), wt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, a) {
      var r = be, c = wt();
      if (Te) {
        if (a === void 0)
          throw Error(l(407));
        a = a();
      } else {
        if (a = t(), Be === null)
          throw Error(l(349));
        (xe & 127) !== 0 || Fm(r, t, a);
      }
      c.memoizedState = a;
      var u = { value: a, getSnapshot: t };
      return c.queue = u, ff(Jm.bind(null, r, u, e), [
        e
      ]), r.flags |= 2048, ki(
        9,
        { destroy: void 0 },
        Qm.bind(
          null,
          r,
          u,
          a,
          t
        ),
        null
      ), a;
    },
    useId: function() {
      var e = wt(), t = Be.identifierPrefix;
      if (Te) {
        var a = bn, r = yn;
        a = (r & ~(1 << 32 - Yt(r) - 1)).toString(32) + a, t = "_" + t + "R_" + a, a = Ur++, 0 < a && (t += "H" + a.toString(32)), t += "_";
      } else
        a = gy++, t = "_" + t + "r_" + a.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: yc,
    useFormState: sf,
    useActionState: sf,
    useOptimistic: function(e) {
      var t = wt();
      t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = a, t = bc.bind(
        null,
        be,
        !0,
        a
      ), a.dispatch = t, [e, t];
    },
    useMemoCache: uc,
    useCacheRefresh: function() {
      return wt().memoizedState = ky.bind(
        null,
        be
      );
    },
    useEffectEvent: function(e) {
      var t = wt(), a = { impl: e };
      return t.memoizedState = a, function() {
        if ((Re & 2) !== 0)
          throw Error(l(440));
        return a.impl.apply(void 0, arguments);
      };
    }
  }, Sc = {
    readContext: gt,
    use: Zr,
    useCallback: yf,
    useContext: gt,
    useEffect: pc,
    useImperativeHandle: vf,
    useInsertionEffect: pf,
    useLayoutEffect: gf,
    useMemo: bf,
    useReducer: Hr,
    useRef: mf,
    useState: function() {
      return Hr(On);
    },
    useDebugValue: gc,
    useDeferredValue: function(e, t) {
      var a = tt();
      return Sf(
        a,
        Ye.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Hr(On)[0], t = tt().memoizedState;
      return [
        typeof e == "boolean" ? e : vo(e),
        t
      ];
    },
    useSyncExternalStore: Im,
    useId: Ef,
    useHostTransitionStatus: yc,
    useFormState: cf,
    useActionState: cf,
    useOptimistic: function(e, t) {
      var a = tt();
      return tf(a, Ye, e, t);
    },
    useMemoCache: uc,
    useCacheRefresh: Tf
  };
  Sc.useEffectEvent = _f;
  var Mf = {
    readContext: gt,
    use: Zr,
    useCallback: yf,
    useContext: gt,
    useEffect: pc,
    useImperativeHandle: vf,
    useInsertionEffect: pf,
    useLayoutEffect: gf,
    useMemo: bf,
    useReducer: mc,
    useRef: mf,
    useState: function() {
      return mc(On);
    },
    useDebugValue: gc,
    useDeferredValue: function(e, t) {
      var a = tt();
      return Ye === null ? hc(a, e, t) : Sf(
        a,
        Ye.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = mc(On)[0], t = tt().memoizedState;
      return [
        typeof e == "boolean" ? e : vo(e),
        t
      ];
    },
    useSyncExternalStore: Im,
    useId: Ef,
    useHostTransitionStatus: yc,
    useFormState: df,
    useActionState: df,
    useOptimistic: function(e, t) {
      var a = tt();
      return Ye !== null ? tf(a, Ye, e, t) : (a.baseState = e, [e, a.queue.dispatch]);
    },
    useMemoCache: uc,
    useCacheRefresh: Tf
  };
  Mf.useEffectEvent = _f;
  function kc(e, t, a, r) {
    t = e.memoizedState, a = a(r, t), a = a == null ? t : y({}, t, a), e.memoizedState = a, e.lanes === 0 && (e.updateQueue.baseState = a);
  }
  var wc = {
    enqueueSetState: function(e, t, a) {
      e = e._reactInternals;
      var r = Vt(), c = na(r);
      c.payload = t, a != null && (c.callback = a), t = aa(e, c, r), t !== null && (Rt(t, e, r), _o(t, e, r));
    },
    enqueueReplaceState: function(e, t, a) {
      e = e._reactInternals;
      var r = Vt(), c = na(r);
      c.tag = 1, c.payload = t, a != null && (c.callback = a), t = aa(e, c, r), t !== null && (Rt(t, e, r), _o(t, e, r));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var a = Vt(), r = na(a);
      r.tag = 2, t != null && (r.callback = t), t = aa(e, r, a), t !== null && (Rt(t, e, a), _o(t, e, a));
    }
  };
  function Of(e, t, a, r, c, u, h) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, u, h) : t.prototype && t.prototype.isPureReactComponent ? !oo(a, r) || !oo(c, u) : !0;
  }
  function Rf(e, t, a, r) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, r), t.state !== e && wc.enqueueReplaceState(t, t.state, null);
  }
  function Ga(e, t) {
    var a = t;
    if ("ref" in t) {
      a = {};
      for (var r in t)
        r !== "ref" && (a[r] = t[r]);
    }
    if (e = e.defaultProps) {
      a === t && (a = y({}, a));
      for (var c in e)
        a[c] === void 0 && (a[c] = e[c]);
    }
    return a;
  }
  function jf(e) {
    Sr(e);
  }
  function Df(e) {
    console.error(e);
  }
  function Lf(e) {
    Sr(e);
  }
  function qr(e, t) {
    try {
      var a = e.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (r) {
      setTimeout(function() {
        throw r;
      });
    }
  }
  function Uf(e, t, a) {
    try {
      var r = e.onCaughtError;
      r(a.value, {
        componentStack: a.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (c) {
      setTimeout(function() {
        throw c;
      });
    }
  }
  function xc(e, t, a) {
    return a = na(a), a.tag = 3, a.payload = { element: null }, a.callback = function() {
      qr(e, t);
    }, a;
  }
  function Yf(e) {
    return e = na(e), e.tag = 3, e;
  }
  function Zf(e, t, a, r) {
    var c = a.type.getDerivedStateFromError;
    if (typeof c == "function") {
      var u = r.value;
      e.payload = function() {
        return c(u);
      }, e.callback = function() {
        Uf(t, a, r);
      };
    }
    var h = a.stateNode;
    h !== null && typeof h.componentDidCatch == "function" && (e.callback = function() {
      Uf(t, a, r), typeof c != "function" && (ca === null ? ca = /* @__PURE__ */ new Set([this]) : ca.add(this));
      var b = r.stack;
      this.componentDidCatch(r.value, {
        componentStack: b !== null ? b : ""
      });
    });
  }
  function xy(e, t, a, r, c) {
    if (a.flags |= 32768, r !== null && typeof r == "object" && typeof r.then == "function") {
      if (t = a.alternate, t !== null && _i(
        t,
        a,
        c,
        !0
      ), a = Bt.current, a !== null) {
        switch (a.tag) {
          case 31:
          case 13:
            return tn === null ? nl() : a.alternate === null && Qe === 0 && (Qe = 3), a.flags &= -257, a.flags |= 65536, a.lanes = c, r === Mr ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), Ic(e, r, c)), !1;
          case 22:
            return a.flags |= 65536, r === Mr ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([r])
            }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : a.add(r)), Ic(e, r, c)), !1;
        }
        throw Error(l(435, a.tag));
      }
      return Ic(e, r, c), nl(), !1;
    }
    if (Te)
      return t = Bt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = c, r !== Ks && (e = Error(l(422), { cause: r }), so(Qt(e, a)))) : (r !== Ks && (t = Error(l(423), {
        cause: r
      }), so(
        Qt(t, a)
      )), e = e.current.alternate, e.flags |= 65536, c &= -c, e.lanes |= c, r = Qt(r, a), c = xc(
        e.stateNode,
        r,
        c
      ), ec(e, c), Qe !== 4 && (Qe = 2)), !1;
    var u = Error(l(520), { cause: r });
    if (u = Qt(u, a), No === null ? No = [u] : No.push(u), Qe !== 4 && (Qe = 2), t === null) return !0;
    r = Qt(r, a), a = t;
    do {
      switch (a.tag) {
        case 3:
          return a.flags |= 65536, e = c & -c, a.lanes |= e, e = xc(a.stateNode, r, e), ec(a, e), !1;
        case 1:
          if (t = a.type, u = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (ca === null || !ca.has(u))))
            return a.flags |= 65536, c &= -c, a.lanes |= c, c = Yf(c), Zf(
              c,
              e,
              a,
              r
            ), ec(a, c), !1;
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var Ec = Error(l(461)), ot = !1;
  function ht(e, t, a, r) {
    t.child = e === null ? Gm(t, null, a, r) : Ha(
      t,
      e.child,
      a,
      r
    );
  }
  function Hf(e, t, a, r, c) {
    a = a.render;
    var u = t.ref;
    if ("ref" in r) {
      var h = {};
      for (var b in r)
        b !== "ref" && (h[b] = r[b]);
    } else h = r;
    return La(t), r = rc(
      e,
      t,
      a,
      h,
      u,
      c
    ), b = lc(), e !== null && !ot ? (sc(e, t, c), Rn(e, t, c)) : (Te && b && Bs(t), t.flags |= 1, ht(e, t, r, c), t.child);
  }
  function Bf(e, t, a, r, c) {
    if (e === null) {
      var u = a.type;
      return typeof u == "function" && !Ys(u) && u.defaultProps === void 0 && a.compare === null ? (t.tag = 15, t.type = u, Gf(
        e,
        t,
        u,
        r,
        c
      )) : (e = Er(
        a.type,
        null,
        r,
        t,
        t.mode,
        c
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (u = e.child, !Rc(e, c)) {
      var h = u.memoizedProps;
      if (a = a.compare, a = a !== null ? a : oo, a(h, r) && e.ref === t.ref)
        return Rn(e, t, c);
    }
    return t.flags |= 1, e = zn(u, r), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Gf(e, t, a, r, c) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (oo(u, r) && e.ref === t.ref)
        if (ot = !1, t.pendingProps = r = u, Rc(e, c))
          (e.flags & 131072) !== 0 && (ot = !0);
        else
          return t.lanes = e.lanes, Rn(e, t, c);
    }
    return Tc(
      e,
      t,
      a,
      r,
      c
    );
  }
  function Kf(e, t, a, r) {
    var c = r.children, u = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), r.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | a : a, e !== null) {
          for (r = t.child = e.child, c = 0; r !== null; )
            c = c | r.lanes | r.childLanes, r = r.sibling;
          r = c & ~u;
        } else r = 0, t.child = null;
        return qf(
          e,
          t,
          u,
          a,
          r
        );
      }
      if ((a & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Ar(
          t,
          u !== null ? u.cachePool : null
        ), u !== null ? Vm(t, u) : nc(), Xm(t);
      else
        return r = t.lanes = 536870912, qf(
          e,
          t,
          u !== null ? u.baseLanes | a : a,
          a,
          r
        );
    } else
      u !== null ? (Ar(t, u.cachePool), Vm(t, u), oa(), t.memoizedState = null) : (e !== null && Ar(t, null), nc(), oa());
    return ht(e, t, c, a), t.child;
  }
  function So(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function qf(e, t, a, r, c) {
    var u = Fs();
    return u = u === null ? null : { parent: at._currentValue, pool: u }, t.memoizedState = {
      baseLanes: a,
      cachePool: u
    }, e !== null && Ar(t, null), nc(), Xm(t), e !== null && _i(e, t, r, !0), t.childLanes = c, null;
  }
  function Vr(e, t) {
    return t = $r(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Vf(e, t, a) {
    return Ha(t, e.child, null, a), e = Vr(t, t.pendingProps), e.flags |= 2, Gt(t), t.memoizedState = null, e;
  }
  function Ey(e, t, a) {
    var r = t.pendingProps, c = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (Te) {
        if (r.mode === "hidden")
          return e = Vr(t, r), t.lanes = 536870912, So(null, e);
        if (ic(t), (e = qe) ? (e = ap(
          e,
          en
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Qn !== null ? { id: yn, overflow: bn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = zm(e), a.return = t, t.child = a, pt = t, qe = null)) : e = null, e === null) throw Wn(t);
        return t.lanes = 536870912, null;
      }
      return Vr(t, r);
    }
    var u = e.memoizedState;
    if (u !== null) {
      var h = u.dehydrated;
      if (ic(t), c)
        if (t.flags & 256)
          t.flags &= -257, t = Vf(
            e,
            t,
            a
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(l(558));
      else if (ot || _i(e, t, a, !1), c = (a & e.childLanes) !== 0, ot || c) {
        if (r = Be, r !== null && (h = jd(r, a), h !== 0 && h !== u.retryLane))
          throw u.retryLane = h, Oa(e, h), Rt(r, e, h), Ec;
        nl(), t = Vf(
          e,
          t,
          a
        );
      } else
        e = u.treeContext, qe = nn(h.nextSibling), pt = t, Te = !0, Jn = null, en = !1, e !== null && Cm(t, e), t = Vr(t, r), t.flags |= 4096;
      return t;
    }
    return e = zn(e.child, {
      mode: r.mode,
      children: r.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Xr(e, t) {
    var a = t.ref;
    if (a === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object")
        throw Error(l(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function Tc(e, t, a, r, c) {
    return La(t), a = rc(
      e,
      t,
      a,
      r,
      void 0,
      c
    ), r = lc(), e !== null && !ot ? (sc(e, t, c), Rn(e, t, c)) : (Te && r && Bs(t), t.flags |= 1, ht(e, t, a, c), t.child);
  }
  function Xf(e, t, a, r, c, u) {
    return La(t), t.updateQueue = null, a = Pm(
      t,
      r,
      a,
      c
    ), $m(e), r = lc(), e !== null && !ot ? (sc(e, t, u), Rn(e, t, u)) : (Te && r && Bs(t), t.flags |= 1, ht(e, t, a, u), t.child);
  }
  function $f(e, t, a, r, c) {
    if (La(t), t.stateNode === null) {
      var u = ui, h = a.contextType;
      typeof h == "object" && h !== null && (u = gt(h)), u = new a(r, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = wc, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = r, u.state = t.memoizedState, u.refs = {}, Js(t), h = a.contextType, u.context = typeof h == "object" && h !== null ? gt(h) : ui, u.state = t.memoizedState, h = a.getDerivedStateFromProps, typeof h == "function" && (kc(
        t,
        a,
        h,
        r
      ), u.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (h = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), h !== u.state && wc.enqueueReplaceState(u, u.state, null), go(t, r, u, c), po(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
    } else if (e === null) {
      u = t.stateNode;
      var b = t.memoizedProps, x = Ga(a, b);
      u.props = x;
      var j = u.context, q = a.contextType;
      h = ui, typeof q == "object" && q !== null && (h = gt(q));
      var P = a.getDerivedStateFromProps;
      q = typeof P == "function" || typeof u.getSnapshotBeforeUpdate == "function", b = t.pendingProps !== b, q || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (b || j !== h) && Rf(
        t,
        u,
        r,
        h
      ), ta = !1;
      var U = t.memoizedState;
      u.state = U, go(t, r, u, c), po(), j = t.memoizedState, b || U !== j || ta ? (typeof P == "function" && (kc(
        t,
        a,
        P,
        r
      ), j = t.memoizedState), (x = ta || Of(
        t,
        a,
        x,
        r,
        U,
        j,
        h
      )) ? (q || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = j), u.props = r, u.state = j, u.context = h, r = x) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
    } else {
      u = t.stateNode, Ws(e, t), h = t.memoizedProps, q = Ga(a, h), u.props = q, P = t.pendingProps, U = u.context, j = a.contextType, x = ui, typeof j == "object" && j !== null && (x = gt(j)), b = a.getDerivedStateFromProps, (j = typeof b == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (h !== P || U !== x) && Rf(
        t,
        u,
        r,
        x
      ), ta = !1, U = t.memoizedState, u.state = U, go(t, r, u, c), po();
      var H = t.memoizedState;
      h !== P || U !== H || ta || e !== null && e.dependencies !== null && zr(e.dependencies) ? (typeof b == "function" && (kc(
        t,
        a,
        b,
        r
      ), H = t.memoizedState), (q = ta || Of(
        t,
        a,
        q,
        r,
        U,
        H,
        x
      ) || e !== null && e.dependencies !== null && zr(e.dependencies)) ? (j || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(r, H, x), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        r,
        H,
        x
      )), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || h === e.memoizedProps && U === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || h === e.memoizedProps && U === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = H), u.props = r, u.state = H, u.context = x, r = q) : (typeof u.componentDidUpdate != "function" || h === e.memoizedProps && U === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || h === e.memoizedProps && U === e.memoizedState || (t.flags |= 1024), r = !1);
    }
    return u = r, Xr(e, t), r = (t.flags & 128) !== 0, u || r ? (u = t.stateNode, a = r && typeof a.getDerivedStateFromError != "function" ? null : u.render(), t.flags |= 1, e !== null && r ? (t.child = Ha(
      t,
      e.child,
      null,
      c
    ), t.child = Ha(
      t,
      null,
      a,
      c
    )) : ht(e, t, a, c), t.memoizedState = u.state, e = t.child) : e = Rn(
      e,
      t,
      c
    ), e;
  }
  function Pf(e, t, a, r) {
    return ja(), t.flags |= 256, ht(e, t, a, r), t.child;
  }
  var zc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Nc(e) {
    return { baseLanes: e, cachePool: Lm() };
  }
  function Ac(e, t, a) {
    return e = e !== null ? e.childLanes & ~a : 0, t && (e |= qt), e;
  }
  function If(e, t, a) {
    var r = t.pendingProps, c = !1, u = (t.flags & 128) !== 0, h;
    if ((h = u) || (h = e !== null && e.memoizedState === null ? !1 : (et.current & 2) !== 0), h && (c = !0, t.flags &= -129), h = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (Te) {
        if (c ? ia(t) : oa(), (e = qe) ? (e = ap(
          e,
          en
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Qn !== null ? { id: yn, overflow: bn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = zm(e), a.return = t, t.child = a, pt = t, qe = null)) : e = null, e === null) throw Wn(t);
        return du(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var b = r.children;
      return r = r.fallback, c ? (oa(), c = t.mode, b = $r(
        { mode: "hidden", children: b },
        c
      ), r = Ra(
        r,
        c,
        a,
        null
      ), b.return = t, r.return = t, b.sibling = r, t.child = b, r = t.child, r.memoizedState = Nc(a), r.childLanes = Ac(
        e,
        h,
        a
      ), t.memoizedState = zc, So(null, r)) : (ia(t), Cc(t, b));
    }
    var x = e.memoizedState;
    if (x !== null && (b = x.dehydrated, b !== null)) {
      if (u)
        t.flags & 256 ? (ia(t), t.flags &= -257, t = Mc(
          e,
          t,
          a
        )) : t.memoizedState !== null ? (oa(), t.child = e.child, t.flags |= 128, t = null) : (oa(), b = r.fallback, c = t.mode, r = $r(
          { mode: "visible", children: r.children },
          c
        ), b = Ra(
          b,
          c,
          a,
          null
        ), b.flags |= 2, r.return = t, b.return = t, r.sibling = b, t.child = r, Ha(
          t,
          e.child,
          null,
          a
        ), r = t.child, r.memoizedState = Nc(a), r.childLanes = Ac(
          e,
          h,
          a
        ), t.memoizedState = zc, t = So(null, r));
      else if (ia(t), du(b)) {
        if (h = b.nextSibling && b.nextSibling.dataset, h) var j = h.dgst;
        h = j, r = Error(l(419)), r.stack = "", r.digest = h, so({ value: r, source: null, stack: null }), t = Mc(
          e,
          t,
          a
        );
      } else if (ot || _i(e, t, a, !1), h = (a & e.childLanes) !== 0, ot || h) {
        if (h = Be, h !== null && (r = jd(h, a), r !== 0 && r !== x.retryLane))
          throw x.retryLane = r, Oa(e, r), Rt(h, e, r), Ec;
        uu(b) || nl(), t = Mc(
          e,
          t,
          a
        );
      } else
        uu(b) ? (t.flags |= 192, t.child = e.child, t = null) : (e = x.treeContext, qe = nn(
          b.nextSibling
        ), pt = t, Te = !0, Jn = null, en = !1, e !== null && Cm(t, e), t = Cc(
          t,
          r.children
        ), t.flags |= 4096);
      return t;
    }
    return c ? (oa(), b = r.fallback, c = t.mode, x = e.child, j = x.sibling, r = zn(x, {
      mode: "hidden",
      children: r.children
    }), r.subtreeFlags = x.subtreeFlags & 65011712, j !== null ? b = zn(
      j,
      b
    ) : (b = Ra(
      b,
      c,
      a,
      null
    ), b.flags |= 2), b.return = t, r.return = t, r.sibling = b, t.child = r, So(null, r), r = t.child, b = e.child.memoizedState, b === null ? b = Nc(a) : (c = b.cachePool, c !== null ? (x = at._currentValue, c = c.parent !== x ? { parent: x, pool: x } : c) : c = Lm(), b = {
      baseLanes: b.baseLanes | a,
      cachePool: c
    }), r.memoizedState = b, r.childLanes = Ac(
      e,
      h,
      a
    ), t.memoizedState = zc, So(e.child, r)) : (ia(t), a = e.child, e = a.sibling, a = zn(a, {
      mode: "visible",
      children: r.children
    }), a.return = t, a.sibling = null, e !== null && (h = t.deletions, h === null ? (t.deletions = [e], t.flags |= 16) : h.push(e)), t.child = a, t.memoizedState = null, a);
  }
  function Cc(e, t) {
    return t = $r(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function $r(e, t) {
    return e = Ht(22, e, null, t), e.lanes = 0, e;
  }
  function Mc(e, t, a) {
    return Ha(t, e.child, null, a), e = Cc(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Ff(e, t, a) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), Xs(e.return, t, a);
  }
  function Oc(e, t, a, r, c, u) {
    var h = e.memoizedState;
    h === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: r,
      tail: a,
      tailMode: c,
      treeForkCount: u
    } : (h.isBackwards = t, h.rendering = null, h.renderingStartTime = 0, h.last = r, h.tail = a, h.tailMode = c, h.treeForkCount = u);
  }
  function Qf(e, t, a) {
    var r = t.pendingProps, c = r.revealOrder, u = r.tail;
    r = r.children;
    var h = et.current, b = (h & 2) !== 0;
    if (b ? (h = h & 1 | 2, t.flags |= 128) : h &= 1, W(et, h), ht(e, t, r, a), r = Te ? lo : 0, !b && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Ff(e, a, t);
        else if (e.tag === 19)
          Ff(e, a, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t)
            break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    switch (c) {
      case "forwards":
        for (a = t.child, c = null; a !== null; )
          e = a.alternate, e !== null && Dr(e) === null && (c = a), a = a.sibling;
        a = c, a === null ? (c = t.child, t.child = null) : (c = a.sibling, a.sibling = null), Oc(
          t,
          !1,
          c,
          a,
          u,
          r
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (a = null, c = t.child, t.child = null; c !== null; ) {
          if (e = c.alternate, e !== null && Dr(e) === null) {
            t.child = c;
            break;
          }
          e = c.sibling, c.sibling = a, a = c, c = e;
        }
        Oc(
          t,
          !0,
          a,
          null,
          u,
          r
        );
        break;
      case "together":
        Oc(
          t,
          !1,
          null,
          null,
          void 0,
          r
        );
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Rn(e, t, a) {
    if (e !== null && (t.dependencies = e.dependencies), sa |= t.lanes, (a & t.childLanes) === 0)
      if (e !== null) {
        if (_i(
          e,
          t,
          a,
          !1
        ), (a & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(l(153));
    if (t.child !== null) {
      for (e = t.child, a = zn(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; )
        e = e.sibling, a = a.sibling = zn(e, e.pendingProps), a.return = t;
      a.sibling = null;
    }
    return t.child;
  }
  function Rc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && zr(e)));
  }
  function Ty(e, t, a) {
    switch (t.tag) {
      case 3:
        Ge(t, t.stateNode.containerInfo), ea(t, at, e.memoizedState.cache), ja();
        break;
      case 27:
      case 5:
        yt(t);
        break;
      case 4:
        Ge(t, t.stateNode.containerInfo);
        break;
      case 10:
        ea(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, ic(t), null;
        break;
      case 13:
        var r = t.memoizedState;
        if (r !== null)
          return r.dehydrated !== null ? (ia(t), t.flags |= 128, null) : (a & t.child.childLanes) !== 0 ? If(e, t, a) : (ia(t), e = Rn(
            e,
            t,
            a
          ), e !== null ? e.sibling : null);
        ia(t);
        break;
      case 19:
        var c = (e.flags & 128) !== 0;
        if (r = (a & t.childLanes) !== 0, r || (_i(
          e,
          t,
          a,
          !1
        ), r = (a & t.childLanes) !== 0), c) {
          if (r)
            return Qf(
              e,
              t,
              a
            );
          t.flags |= 128;
        }
        if (c = t.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), W(et, et.current), r) break;
        return null;
      case 22:
        return t.lanes = 0, Kf(
          e,
          t,
          a,
          t.pendingProps
        );
      case 24:
        ea(t, at, e.memoizedState.cache);
    }
    return Rn(e, t, a);
  }
  function Jf(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        ot = !0;
      else {
        if (!Rc(e, a) && (t.flags & 128) === 0)
          return ot = !1, Ty(
            e,
            t,
            a
          );
        ot = (e.flags & 131072) !== 0;
      }
    else
      ot = !1, Te && (t.flags & 1048576) !== 0 && Am(t, lo, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var r = t.pendingProps;
          if (e = Ya(t.elementType), t.type = e, typeof e == "function")
            Ys(e) ? (r = Ga(e, r), t.tag = 1, t = $f(
              null,
              t,
              e,
              r,
              a
            )) : (t.tag = 0, t = Tc(
              null,
              t,
              e,
              r,
              a
            ));
          else {
            if (e != null) {
              var c = e.$$typeof;
              if (c === Z) {
                t.tag = 11, t = Hf(
                  null,
                  t,
                  e,
                  r,
                  a
                );
                break e;
              } else if (c === X) {
                t.tag = 14, t = Bf(
                  null,
                  t,
                  e,
                  r,
                  a
                );
                break e;
              }
            }
            throw t = I(e) || e, Error(l(306, t, ""));
          }
        }
        return t;
      case 0:
        return Tc(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 1:
        return r = t.type, c = Ga(
          r,
          t.pendingProps
        ), $f(
          e,
          t,
          r,
          c,
          a
        );
      case 3:
        e: {
          if (Ge(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(l(387));
          r = t.pendingProps;
          var u = t.memoizedState;
          c = u.element, Ws(e, t), go(t, r, null, a);
          var h = t.memoizedState;
          if (r = h.cache, ea(t, at, r), r !== u.cache && $s(
            t,
            [at],
            a,
            !0
          ), po(), r = h.element, u.isDehydrated)
            if (u = {
              element: r,
              isDehydrated: !1,
              cache: h.cache
            }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
              t = Pf(
                e,
                t,
                r,
                a
              );
              break e;
            } else if (r !== c) {
              c = Qt(
                Error(l(424)),
                t
              ), so(c), t = Pf(
                e,
                t,
                r,
                a
              );
              break e;
            } else
              for (e = t.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, qe = nn(e.firstChild), pt = t, Te = !0, Jn = null, en = !0, a = Gm(
                t,
                null,
                r,
                a
              ), t.child = a; a; )
                a.flags = a.flags & -3 | 4096, a = a.sibling;
          else {
            if (ja(), r === c) {
              t = Rn(
                e,
                t,
                a
              );
              break e;
            }
            ht(e, t, r, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return Xr(e, t), e === null ? (a = cp(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = a : Te || (a = t.type, e = t.pendingProps, r = cl(
          ge.current
        ).createElement(a), r[_t] = t, r[zt] = e, vt(r, a, e), mt(r), t.stateNode = r) : t.memoizedState = cp(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return yt(t), e === null && Te && (r = t.stateNode = rp(
          t.type,
          t.pendingProps,
          ge.current
        ), pt = t, en = !0, c = qe, fa(t.type) ? (mu = c, qe = nn(r.firstChild)) : qe = c), ht(
          e,
          t,
          t.pendingProps.children,
          a
        ), Xr(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && Te && ((c = r = qe) && (r = nb(
          r,
          t.type,
          t.pendingProps,
          en
        ), r !== null ? (t.stateNode = r, pt = t, qe = nn(r.firstChild), en = !1, c = !0) : c = !1), c || Wn(t)), yt(t), c = t.type, u = t.pendingProps, h = e !== null ? e.memoizedProps : null, r = u.children, lu(c, u) ? r = null : h !== null && lu(c, h) && (t.flags |= 32), t.memoizedState !== null && (c = rc(
          e,
          t,
          hy,
          null,
          null,
          a
        ), Lo._currentValue = c), Xr(e, t), ht(e, t, r, a), t.child;
      case 6:
        return e === null && Te && ((e = a = qe) && (a = ab(
          a,
          t.pendingProps,
          en
        ), a !== null ? (t.stateNode = a, pt = t, qe = null, e = !0) : e = !1), e || Wn(t)), null;
      case 13:
        return If(e, t, a);
      case 4:
        return Ge(
          t,
          t.stateNode.containerInfo
        ), r = t.pendingProps, e === null ? t.child = Ha(
          t,
          null,
          r,
          a
        ) : ht(e, t, r, a), t.child;
      case 11:
        return Hf(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 7:
        return ht(
          e,
          t,
          t.pendingProps,
          a
        ), t.child;
      case 8:
        return ht(
          e,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 12:
        return ht(
          e,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 10:
        return r = t.pendingProps, ea(t, t.type, r.value), ht(e, t, r.children, a), t.child;
      case 9:
        return c = t.type._context, r = t.pendingProps.children, La(t), c = gt(c), r = r(c), t.flags |= 1, ht(e, t, r, a), t.child;
      case 14:
        return Bf(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 15:
        return Gf(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 19:
        return Qf(e, t, a);
      case 31:
        return Ey(e, t, a);
      case 22:
        return Kf(
          e,
          t,
          a,
          t.pendingProps
        );
      case 24:
        return La(t), r = gt(at), e === null ? (c = Fs(), c === null && (c = Be, u = Ps(), c.pooledCache = u, u.refCount++, u !== null && (c.pooledCacheLanes |= a), c = u), t.memoizedState = { parent: r, cache: c }, Js(t), ea(t, at, c)) : ((e.lanes & a) !== 0 && (Ws(e, t), go(t, null, null, a), po()), c = e.memoizedState, u = t.memoizedState, c.parent !== r ? (c = { parent: r, cache: r }, t.memoizedState = c, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = c), ea(t, at, r)) : (r = u.cache, ea(t, at, r), r !== c.cache && $s(
          t,
          [at],
          a,
          !0
        ))), ht(
          e,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(l(156, t.tag));
  }
  function jn(e) {
    e.flags |= 4;
  }
  function jc(e, t, a, r, c) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (c & 335544128) === c)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (E_()) e.flags |= 8192;
        else
          throw Za = Mr, Qs;
    } else e.flags &= -16777217;
  }
  function Wf(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !_p(t))
      if (E_()) e.flags |= 8192;
      else
        throw Za = Mr, Qs;
  }
  function Pr(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Md() : 536870912, e.lanes |= t, Ti |= t);
  }
  function ko(e, t) {
    if (!Te)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var a = null; t !== null; )
            t.alternate !== null && (a = t), t = t.sibling;
          a === null ? e.tail = null : a.sibling = null;
          break;
        case "collapsed":
          a = e.tail;
          for (var r = null; a !== null; )
            a.alternate !== null && (r = a), a = a.sibling;
          r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
      }
  }
  function Ve(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, a = 0, r = 0;
    if (t)
      for (var c = e.child; c !== null; )
        a |= c.lanes | c.childLanes, r |= c.subtreeFlags & 65011712, r |= c.flags & 65011712, c.return = e, c = c.sibling;
    else
      for (c = e.child; c !== null; )
        a |= c.lanes | c.childLanes, r |= c.subtreeFlags, r |= c.flags, c.return = e, c = c.sibling;
    return e.subtreeFlags |= r, e.childLanes = a, t;
  }
  function zy(e, t, a) {
    var r = t.pendingProps;
    switch (Gs(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ve(t), null;
      case 1:
        return Ve(t), null;
      case 3:
        return a = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Cn(at), Ae(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (e === null || e.child === null) && (fi(t) ? jn(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, qs())), Ve(t), null;
      case 26:
        var c = t.type, u = t.memoizedState;
        return e === null ? (jn(t), u !== null ? (Ve(t), Wf(t, u)) : (Ve(t), jc(
          t,
          c,
          null,
          r,
          a
        ))) : u ? u !== e.memoizedState ? (jn(t), Ve(t), Wf(t, u)) : (Ve(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== r && jn(t), Ve(t), jc(
          t,
          c,
          e,
          r,
          a
        )), null;
      case 27:
        if (Dt(t), a = ge.current, c = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== r && jn(t);
        else {
          if (!r) {
            if (t.stateNode === null)
              throw Error(l(166));
            return Ve(t), null;
          }
          e = ae.current, fi(t) ? Mm(t) : (e = rp(c, r, a), t.stateNode = e, jn(t));
        }
        return Ve(t), null;
      case 5:
        if (Dt(t), c = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== r && jn(t);
        else {
          if (!r) {
            if (t.stateNode === null)
              throw Error(l(166));
            return Ve(t), null;
          }
          if (u = ae.current, fi(t))
            Mm(t);
          else {
            var h = cl(
              ge.current
            );
            switch (u) {
              case 1:
                u = h.createElementNS(
                  "http://www.w3.org/2000/svg",
                  c
                );
                break;
              case 2:
                u = h.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  c
                );
                break;
              default:
                switch (c) {
                  case "svg":
                    u = h.createElementNS(
                      "http://www.w3.org/2000/svg",
                      c
                    );
                    break;
                  case "math":
                    u = h.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      c
                    );
                    break;
                  case "script":
                    u = h.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof r.is == "string" ? h.createElement("select", {
                      is: r.is
                    }) : h.createElement("select"), r.multiple ? u.multiple = !0 : r.size && (u.size = r.size);
                    break;
                  default:
                    u = typeof r.is == "string" ? h.createElement(c, { is: r.is }) : h.createElement(c);
                }
            }
            u[_t] = t, u[zt] = r;
            e: for (h = t.child; h !== null; ) {
              if (h.tag === 5 || h.tag === 6)
                u.appendChild(h.stateNode);
              else if (h.tag !== 4 && h.tag !== 27 && h.child !== null) {
                h.child.return = h, h = h.child;
                continue;
              }
              if (h === t) break e;
              for (; h.sibling === null; ) {
                if (h.return === null || h.return === t)
                  break e;
                h = h.return;
              }
              h.sibling.return = h.return, h = h.sibling;
            }
            t.stateNode = u;
            e: switch (vt(u, c, r), c) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
            r && jn(t);
          }
        }
        return Ve(t), jc(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          a
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== r && jn(t);
        else {
          if (typeof r != "string" && t.stateNode === null)
            throw Error(l(166));
          if (e = ge.current, fi(t)) {
            if (e = t.stateNode, a = t.memoizedProps, r = null, c = pt, c !== null)
              switch (c.tag) {
                case 27:
                case 5:
                  r = c.memoizedProps;
              }
            e[_t] = t, e = !!(e.nodeValue === a || r !== null && r.suppressHydrationWarning === !0 || I_(e.nodeValue, a)), e || Wn(t, !0);
          } else
            e = cl(e).createTextNode(
              r
            ), e[_t] = t, t.stateNode = e;
        }
        return Ve(t), null;
      case 31:
        if (a = t.memoizedState, e === null || e.memoizedState !== null) {
          if (r = fi(t), a !== null) {
            if (e === null) {
              if (!r) throw Error(l(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(557));
              e[_t] = t;
            } else
              ja(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ve(t), e = !1;
          } else
            a = qs(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), e = !0;
          if (!e)
            return t.flags & 256 ? (Gt(t), t) : (Gt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(l(558));
        }
        return Ve(t), null;
      case 13:
        if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (c = fi(t), r !== null && r.dehydrated !== null) {
            if (e === null) {
              if (!c) throw Error(l(318));
              if (c = t.memoizedState, c = c !== null ? c.dehydrated : null, !c) throw Error(l(317));
              c[_t] = t;
            } else
              ja(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ve(t), c = !1;
          } else
            c = qs(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = c), c = !0;
          if (!c)
            return t.flags & 256 ? (Gt(t), t) : (Gt(t), null);
        }
        return Gt(t), (t.flags & 128) !== 0 ? (t.lanes = a, t) : (a = r !== null, e = e !== null && e.memoizedState !== null, a && (r = t.child, c = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (c = r.alternate.memoizedState.cachePool.pool), u = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (u = r.memoizedState.cachePool.pool), u !== c && (r.flags |= 2048)), a !== e && a && (t.child.flags |= 8192), Pr(t, t.updateQueue), Ve(t), null);
      case 4:
        return Ae(), e === null && nu(t.stateNode.containerInfo), Ve(t), null;
      case 10:
        return Cn(t.type), Ve(t), null;
      case 19:
        if (L(et), r = t.memoizedState, r === null) return Ve(t), null;
        if (c = (t.flags & 128) !== 0, u = r.rendering, u === null)
          if (c) ko(r, !1);
          else {
            if (Qe !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (u = Dr(e), u !== null) {
                  for (t.flags |= 128, ko(r, !1), e = u.updateQueue, t.updateQueue = e, Pr(t, e), t.subtreeFlags = 0, e = a, a = t.child; a !== null; )
                    Tm(a, e), a = a.sibling;
                  return W(
                    et,
                    et.current & 1 | 2
                  ), Te && Nn(t, r.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            r.tail !== null && kt() > Wr && (t.flags |= 128, c = !0, ko(r, !1), t.lanes = 4194304);
          }
        else {
          if (!c)
            if (e = Dr(u), e !== null) {
              if (t.flags |= 128, c = !0, e = e.updateQueue, t.updateQueue = e, Pr(t, e), ko(r, !0), r.tail === null && r.tailMode === "hidden" && !u.alternate && !Te)
                return Ve(t), null;
            } else
              2 * kt() - r.renderingStartTime > Wr && a !== 536870912 && (t.flags |= 128, c = !0, ko(r, !1), t.lanes = 4194304);
          r.isBackwards ? (u.sibling = t.child, t.child = u) : (e = r.last, e !== null ? e.sibling = u : t.child = u, r.last = u);
        }
        return r.tail !== null ? (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = kt(), e.sibling = null, a = et.current, W(
          et,
          c ? a & 1 | 2 : a & 1
        ), Te && Nn(t, r.treeForkCount), e) : (Ve(t), null);
      case 22:
      case 23:
        return Gt(t), ac(), r = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== r && (t.flags |= 8192) : r && (t.flags |= 8192), r ? (a & 536870912) !== 0 && (t.flags & 128) === 0 && (Ve(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ve(t), a = t.updateQueue, a !== null && Pr(t, a.retryQueue), a = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== a && (t.flags |= 2048), e !== null && L(Ua), null;
      case 24:
        return a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Cn(at), Ve(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(l(156, t.tag));
  }
  function Ny(e, t) {
    switch (Gs(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Cn(at), Ae(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Dt(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Gt(t), t.alternate === null)
            throw Error(l(340));
          ja();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (Gt(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(l(340));
          ja();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return L(et), null;
      case 4:
        return Ae(), null;
      case 10:
        return Cn(t.type), null;
      case 22:
      case 23:
        return Gt(t), ac(), e !== null && L(Ua), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return Cn(at), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function e_(e, t) {
    switch (Gs(t), t.tag) {
      case 3:
        Cn(at), Ae();
        break;
      case 26:
      case 27:
      case 5:
        Dt(t);
        break;
      case 4:
        Ae();
        break;
      case 31:
        t.memoizedState !== null && Gt(t);
        break;
      case 13:
        Gt(t);
        break;
      case 19:
        L(et);
        break;
      case 10:
        Cn(t.type);
        break;
      case 22:
      case 23:
        Gt(t), ac(), e !== null && L(Ua);
        break;
      case 24:
        Cn(at);
    }
  }
  function wo(e, t) {
    try {
      var a = t.updateQueue, r = a !== null ? a.lastEffect : null;
      if (r !== null) {
        var c = r.next;
        a = c;
        do {
          if ((a.tag & e) === e) {
            r = void 0;
            var u = a.create, h = a.inst;
            r = u(), h.destroy = r;
          }
          a = a.next;
        } while (a !== c);
      }
    } catch (b) {
      Le(t, t.return, b);
    }
  }
  function ra(e, t, a) {
    try {
      var r = t.updateQueue, c = r !== null ? r.lastEffect : null;
      if (c !== null) {
        var u = c.next;
        r = u;
        do {
          if ((r.tag & e) === e) {
            var h = r.inst, b = h.destroy;
            if (b !== void 0) {
              h.destroy = void 0, c = t;
              var x = a, j = b;
              try {
                j();
              } catch (q) {
                Le(
                  c,
                  x,
                  q
                );
              }
            }
          }
          r = r.next;
        } while (r !== u);
      }
    } catch (q) {
      Le(t, t.return, q);
    }
  }
  function t_(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        qm(t, a);
      } catch (r) {
        Le(e, e.return, r);
      }
    }
  }
  function n_(e, t, a) {
    a.props = Ga(
      e.type,
      e.memoizedProps
    ), a.state = e.memoizedState;
    try {
      a.componentWillUnmount();
    } catch (r) {
      Le(e, t, r);
    }
  }
  function xo(e, t) {
    try {
      var a = e.ref;
      if (a !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var r = e.stateNode;
            break;
          case 30:
            r = e.stateNode;
            break;
          default:
            r = e.stateNode;
        }
        typeof a == "function" ? e.refCleanup = a(r) : a.current = r;
      }
    } catch (c) {
      Le(e, t, c);
    }
  }
  function Sn(e, t) {
    var a = e.ref, r = e.refCleanup;
    if (a !== null)
      if (typeof r == "function")
        try {
          r();
        } catch (c) {
          Le(e, t, c);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (c) {
          Le(e, t, c);
        }
      else a.current = null;
  }
  function a_(e) {
    var t = e.type, a = e.memoizedProps, r = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && r.focus();
          break e;
        case "img":
          a.src ? r.src = a.src : a.srcSet && (r.srcset = a.srcSet);
      }
    } catch (c) {
      Le(e, e.return, c);
    }
  }
  function Dc(e, t, a) {
    try {
      var r = e.stateNode;
      Fy(r, e.type, a, t), r[zt] = t;
    } catch (c) {
      Le(e, e.return, c);
    }
  }
  function i_(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && fa(e.type) || e.tag === 4;
  }
  function Lc(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || i_(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && fa(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Uc(e, t, a) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(e, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(e), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = En));
    else if (r !== 4 && (r === 27 && fa(e.type) && (a = e.stateNode, t = null), e = e.child, e !== null))
      for (Uc(e, t, a), e = e.sibling; e !== null; )
        Uc(e, t, a), e = e.sibling;
  }
  function Ir(e, t, a) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, t ? a.insertBefore(e, t) : a.appendChild(e);
    else if (r !== 4 && (r === 27 && fa(e.type) && (a = e.stateNode), e = e.child, e !== null))
      for (Ir(e, t, a), e = e.sibling; e !== null; )
        Ir(e, t, a), e = e.sibling;
  }
  function o_(e) {
    var t = e.stateNode, a = e.memoizedProps;
    try {
      for (var r = e.type, c = t.attributes; c.length; )
        t.removeAttributeNode(c[0]);
      vt(t, r, a), t[_t] = e, t[zt] = a;
    } catch (u) {
      Le(e, e.return, u);
    }
  }
  var Dn = !1, rt = !1, Yc = !1, r_ = typeof WeakSet == "function" ? WeakSet : Set, ft = null;
  function Ay(e, t) {
    if (e = e.containerInfo, ou = gl, e = hm(e), Ms(e)) {
      if ("selectionStart" in e)
        var a = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          a = (a = e.ownerDocument) && a.defaultView || window;
          var r = a.getSelection && a.getSelection();
          if (r && r.rangeCount !== 0) {
            a = r.anchorNode;
            var c = r.anchorOffset, u = r.focusNode;
            r = r.focusOffset;
            try {
              a.nodeType, u.nodeType;
            } catch {
              a = null;
              break e;
            }
            var h = 0, b = -1, x = -1, j = 0, q = 0, P = e, U = null;
            t: for (; ; ) {
              for (var H; P !== a || c !== 0 && P.nodeType !== 3 || (b = h + c), P !== u || r !== 0 && P.nodeType !== 3 || (x = h + r), P.nodeType === 3 && (h += P.nodeValue.length), (H = P.firstChild) !== null; )
                U = P, P = H;
              for (; ; ) {
                if (P === e) break t;
                if (U === a && ++j === c && (b = h), U === u && ++q === r && (x = h), (H = P.nextSibling) !== null) break;
                P = U, U = P.parentNode;
              }
              P = H;
            }
            a = b === -1 || x === -1 ? null : { start: b, end: x };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (ru = { focusedElem: e, selectionRange: a }, gl = !1, ft = t; ft !== null; )
      if (t = ft, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, ft = e;
      else
        for (; ft !== null; ) {
          switch (t = ft, u = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (a = 0; a < e.length; a++)
                  c = e[a], c.ref.impl = c.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && u !== null) {
                e = void 0, a = t, c = u.memoizedProps, u = u.memoizedState, r = a.stateNode;
                try {
                  var oe = Ga(
                    a.type,
                    c
                  );
                  e = r.getSnapshotBeforeUpdate(
                    oe,
                    u
                  ), r.__reactInternalSnapshotBeforeUpdate = e;
                } catch (he) {
                  Le(
                    a,
                    a.return,
                    he
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, a = e.nodeType, a === 9)
                  cu(e);
                else if (a === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      cu(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(l(163));
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, ft = e;
            break;
          }
          ft = t.return;
        }
  }
  function l_(e, t, a) {
    var r = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        Un(e, a), r & 4 && wo(5, a);
        break;
      case 1:
        if (Un(e, a), r & 4)
          if (e = a.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (h) {
              Le(a, a.return, h);
            }
          else {
            var c = Ga(
              a.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                c,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (h) {
              Le(
                a,
                a.return,
                h
              );
            }
          }
        r & 64 && t_(a), r & 512 && xo(a, a.return);
        break;
      case 3:
        if (Un(e, a), r & 64 && (e = a.updateQueue, e !== null)) {
          if (t = null, a.child !== null)
            switch (a.child.tag) {
              case 27:
              case 5:
                t = a.child.stateNode;
                break;
              case 1:
                t = a.child.stateNode;
            }
          try {
            qm(e, t);
          } catch (h) {
            Le(a, a.return, h);
          }
        }
        break;
      case 27:
        t === null && r & 4 && o_(a);
      case 26:
      case 5:
        Un(e, a), t === null && r & 4 && a_(a), r & 512 && xo(a, a.return);
        break;
      case 12:
        Un(e, a);
        break;
      case 31:
        Un(e, a), r & 4 && u_(e, a);
        break;
      case 13:
        Un(e, a), r & 4 && d_(e, a), r & 64 && (e = a.memoizedState, e !== null && (e = e.dehydrated, e !== null && (a = Yy.bind(
          null,
          a
        ), ib(e, a))));
        break;
      case 22:
        if (r = a.memoizedState !== null || Dn, !r) {
          t = t !== null && t.memoizedState !== null || rt, c = Dn;
          var u = rt;
          Dn = r, (rt = t) && !u ? Yn(
            e,
            a,
            (a.subtreeFlags & 8772) !== 0
          ) : Un(e, a), Dn = c, rt = u;
        }
        break;
      case 30:
        break;
      default:
        Un(e, a);
    }
  }
  function s_(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, s_(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && _s(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Xe = null, At = !1;
  function Ln(e, t, a) {
    for (a = a.child; a !== null; )
      c_(e, t, a), a = a.sibling;
  }
  function c_(e, t, a) {
    if (ut && typeof ut.onCommitFiberUnmount == "function")
      try {
        ut.onCommitFiberUnmount($n, a);
      } catch {
      }
    switch (a.tag) {
      case 26:
        rt || Sn(a, t), Ln(
          e,
          t,
          a
        ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
        break;
      case 27:
        rt || Sn(a, t);
        var r = Xe, c = At;
        fa(a.type) && (Xe = a.stateNode, At = !1), Ln(
          e,
          t,
          a
        ), Ro(a.stateNode), Xe = r, At = c;
        break;
      case 5:
        rt || Sn(a, t);
      case 6:
        if (r = Xe, c = At, Xe = null, Ln(
          e,
          t,
          a
        ), Xe = r, At = c, Xe !== null)
          if (At)
            try {
              (Xe.nodeType === 9 ? Xe.body : Xe.nodeName === "HTML" ? Xe.ownerDocument.body : Xe).removeChild(a.stateNode);
            } catch (u) {
              Le(
                a,
                t,
                u
              );
            }
          else
            try {
              Xe.removeChild(a.stateNode);
            } catch (u) {
              Le(
                a,
                t,
                u
              );
            }
        break;
      case 18:
        Xe !== null && (At ? (e = Xe, tp(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          a.stateNode
        ), ji(e)) : tp(Xe, a.stateNode));
        break;
      case 4:
        r = Xe, c = At, Xe = a.stateNode.containerInfo, At = !0, Ln(
          e,
          t,
          a
        ), Xe = r, At = c;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ra(2, a, t), rt || ra(4, a, t), Ln(
          e,
          t,
          a
        );
        break;
      case 1:
        rt || (Sn(a, t), r = a.stateNode, typeof r.componentWillUnmount == "function" && n_(
          a,
          t,
          r
        )), Ln(
          e,
          t,
          a
        );
        break;
      case 21:
        Ln(
          e,
          t,
          a
        );
        break;
      case 22:
        rt = (r = rt) || a.memoizedState !== null, Ln(
          e,
          t,
          a
        ), rt = r;
        break;
      default:
        Ln(
          e,
          t,
          a
        );
    }
  }
  function u_(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        ji(e);
      } catch (a) {
        Le(t, t.return, a);
      }
    }
  }
  function d_(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        ji(e);
      } catch (a) {
        Le(t, t.return, a);
      }
  }
  function Cy(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new r_()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new r_()), t;
      default:
        throw Error(l(435, e.tag));
    }
  }
  function Fr(e, t) {
    var a = Cy(e);
    t.forEach(function(r) {
      if (!a.has(r)) {
        a.add(r);
        var c = Zy.bind(null, e, r);
        r.then(c, c);
      }
    });
  }
  function Ct(e, t) {
    var a = t.deletions;
    if (a !== null)
      for (var r = 0; r < a.length; r++) {
        var c = a[r], u = e, h = t, b = h;
        e: for (; b !== null; ) {
          switch (b.tag) {
            case 27:
              if (fa(b.type)) {
                Xe = b.stateNode, At = !1;
                break e;
              }
              break;
            case 5:
              Xe = b.stateNode, At = !1;
              break e;
            case 3:
            case 4:
              Xe = b.stateNode.containerInfo, At = !0;
              break e;
          }
          b = b.return;
        }
        if (Xe === null) throw Error(l(160));
        c_(u, h, c), Xe = null, At = !1, u = c.alternate, u !== null && (u.return = null), c.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        m_(t, e), t = t.sibling;
  }
  var _n = null;
  function m_(e, t) {
    var a = e.alternate, r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Ct(t, e), Mt(e), r & 4 && (ra(3, e, e.return), wo(3, e), ra(5, e, e.return));
        break;
      case 1:
        Ct(t, e), Mt(e), r & 512 && (rt || a === null || Sn(a, a.return)), r & 64 && Dn && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (a = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = a === null ? r : a.concat(r))));
        break;
      case 26:
        var c = _n;
        if (Ct(t, e), Mt(e), r & 512 && (rt || a === null || Sn(a, a.return)), r & 4) {
          var u = a !== null ? a.memoizedState : null;
          if (r = e.memoizedState, a === null)
            if (r === null)
              if (e.stateNode === null) {
                e: {
                  r = e.type, a = e.memoizedProps, c = c.ownerDocument || c;
                  t: switch (r) {
                    case "title":
                      u = c.getElementsByTagName("title")[0], (!u || u[Fi] || u[_t] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = c.createElement(r), c.head.insertBefore(
                        u,
                        c.querySelector("head > title")
                      )), vt(u, r, a), u[_t] = e, mt(u), r = u;
                      break e;
                    case "link":
                      var h = mp(
                        "link",
                        "href",
                        c
                      ).get(r + (a.href || ""));
                      if (h) {
                        for (var b = 0; b < h.length; b++)
                          if (u = h[b], u.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && u.getAttribute("rel") === (a.rel == null ? null : a.rel) && u.getAttribute("title") === (a.title == null ? null : a.title) && u.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                            h.splice(b, 1);
                            break t;
                          }
                      }
                      u = c.createElement(r), vt(u, r, a), c.head.appendChild(u);
                      break;
                    case "meta":
                      if (h = mp(
                        "meta",
                        "content",
                        c
                      ).get(r + (a.content || ""))) {
                        for (b = 0; b < h.length; b++)
                          if (u = h[b], u.getAttribute("content") === (a.content == null ? null : "" + a.content) && u.getAttribute("name") === (a.name == null ? null : a.name) && u.getAttribute("property") === (a.property == null ? null : a.property) && u.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && u.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                            h.splice(b, 1);
                            break t;
                          }
                      }
                      u = c.createElement(r), vt(u, r, a), c.head.appendChild(u);
                      break;
                    default:
                      throw Error(l(468, r));
                  }
                  u[_t] = e, mt(u), r = u;
                }
                e.stateNode = r;
              } else
                fp(
                  c,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = dp(
                c,
                r,
                e.memoizedProps
              );
          else
            u !== r ? (u === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : u.count--, r === null ? fp(
              c,
              e.type,
              e.stateNode
            ) : dp(
              c,
              r,
              e.memoizedProps
            )) : r === null && e.stateNode !== null && Dc(
              e,
              e.memoizedProps,
              a.memoizedProps
            );
        }
        break;
      case 27:
        Ct(t, e), Mt(e), r & 512 && (rt || a === null || Sn(a, a.return)), a !== null && r & 4 && Dc(
          e,
          e.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (Ct(t, e), Mt(e), r & 512 && (rt || a === null || Sn(a, a.return)), e.flags & 32) {
          c = e.stateNode;
          try {
            ai(c, "");
          } catch (oe) {
            Le(e, e.return, oe);
          }
        }
        r & 4 && e.stateNode != null && (c = e.memoizedProps, Dc(
          e,
          c,
          a !== null ? a.memoizedProps : c
        )), r & 1024 && (Yc = !0);
        break;
      case 6:
        if (Ct(t, e), Mt(e), r & 4) {
          if (e.stateNode === null)
            throw Error(l(162));
          r = e.memoizedProps, a = e.stateNode;
          try {
            a.nodeValue = r;
          } catch (oe) {
            Le(e, e.return, oe);
          }
        }
        break;
      case 3:
        if (ml = null, c = _n, _n = ul(t.containerInfo), Ct(t, e), _n = c, Mt(e), r & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            ji(t.containerInfo);
          } catch (oe) {
            Le(e, e.return, oe);
          }
        Yc && (Yc = !1, f_(e));
        break;
      case 4:
        r = _n, _n = ul(
          e.stateNode.containerInfo
        ), Ct(t, e), Mt(e), _n = r;
        break;
      case 12:
        Ct(t, e), Mt(e);
        break;
      case 31:
        Ct(t, e), Mt(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, Fr(e, r)));
        break;
      case 13:
        Ct(t, e), Mt(e), e.child.flags & 8192 && e.memoizedState !== null != (a !== null && a.memoizedState !== null) && (Jr = kt()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, Fr(e, r)));
        break;
      case 22:
        c = e.memoizedState !== null;
        var x = a !== null && a.memoizedState !== null, j = Dn, q = rt;
        if (Dn = j || c, rt = q || x, Ct(t, e), rt = q, Dn = j, Mt(e), r & 8192)
          e: for (t = e.stateNode, t._visibility = c ? t._visibility & -2 : t._visibility | 1, c && (a === null || x || Dn || rt || Ka(e)), a = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                x = a = t;
                try {
                  if (u = x.stateNode, c)
                    h = u.style, typeof h.setProperty == "function" ? h.setProperty("display", "none", "important") : h.display = "none";
                  else {
                    b = x.stateNode;
                    var P = x.memoizedProps.style, U = P != null && P.hasOwnProperty("display") ? P.display : null;
                    b.style.display = U == null || typeof U == "boolean" ? "" : ("" + U).trim();
                  }
                } catch (oe) {
                  Le(x, x.return, oe);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                x = t;
                try {
                  x.stateNode.nodeValue = c ? "" : x.memoizedProps;
                } catch (oe) {
                  Le(x, x.return, oe);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                x = t;
                try {
                  var H = x.stateNode;
                  c ? np(H, !0) : np(x.stateNode, !1);
                } catch (oe) {
                  Le(x, x.return, oe);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              a === t && (a = null), t = t.return;
            }
            a === t && (a = null), t.sibling.return = t.return, t = t.sibling;
          }
        r & 4 && (r = e.updateQueue, r !== null && (a = r.retryQueue, a !== null && (r.retryQueue = null, Fr(e, a))));
        break;
      case 19:
        Ct(t, e), Mt(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, Fr(e, r)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Ct(t, e), Mt(e);
    }
  }
  function Mt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var a, r = e.return; r !== null; ) {
          if (i_(r)) {
            a = r;
            break;
          }
          r = r.return;
        }
        if (a == null) throw Error(l(160));
        switch (a.tag) {
          case 27:
            var c = a.stateNode, u = Lc(e);
            Ir(e, u, c);
            break;
          case 5:
            var h = a.stateNode;
            a.flags & 32 && (ai(h, ""), a.flags &= -33);
            var b = Lc(e);
            Ir(e, b, h);
            break;
          case 3:
          case 4:
            var x = a.stateNode.containerInfo, j = Lc(e);
            Uc(
              e,
              j,
              x
            );
            break;
          default:
            throw Error(l(161));
        }
      } catch (q) {
        Le(e, e.return, q);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function f_(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        f_(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function Un(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        l_(e, t.alternate, t), t = t.sibling;
  }
  function Ka(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ra(4, t, t.return), Ka(t);
          break;
        case 1:
          Sn(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && n_(
            t,
            t.return,
            a
          ), Ka(t);
          break;
        case 27:
          Ro(t.stateNode);
        case 26:
        case 5:
          Sn(t, t.return), Ka(t);
          break;
        case 22:
          t.memoizedState === null && Ka(t);
          break;
        case 30:
          Ka(t);
          break;
        default:
          Ka(t);
      }
      e = e.sibling;
    }
  }
  function Yn(e, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var r = t.alternate, c = e, u = t, h = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          Yn(
            c,
            u,
            a
          ), wo(4, u);
          break;
        case 1:
          if (Yn(
            c,
            u,
            a
          ), r = u, c = r.stateNode, typeof c.componentDidMount == "function")
            try {
              c.componentDidMount();
            } catch (j) {
              Le(r, r.return, j);
            }
          if (r = u, c = r.updateQueue, c !== null) {
            var b = r.stateNode;
            try {
              var x = c.shared.hiddenCallbacks;
              if (x !== null)
                for (c.shared.hiddenCallbacks = null, c = 0; c < x.length; c++)
                  Km(x[c], b);
            } catch (j) {
              Le(r, r.return, j);
            }
          }
          a && h & 64 && t_(u), xo(u, u.return);
          break;
        case 27:
          o_(u);
        case 26:
        case 5:
          Yn(
            c,
            u,
            a
          ), a && r === null && h & 4 && a_(u), xo(u, u.return);
          break;
        case 12:
          Yn(
            c,
            u,
            a
          );
          break;
        case 31:
          Yn(
            c,
            u,
            a
          ), a && h & 4 && u_(c, u);
          break;
        case 13:
          Yn(
            c,
            u,
            a
          ), a && h & 4 && d_(c, u);
          break;
        case 22:
          u.memoizedState === null && Yn(
            c,
            u,
            a
          ), xo(u, u.return);
          break;
        case 30:
          break;
        default:
          Yn(
            c,
            u,
            a
          );
      }
      t = t.sibling;
    }
  }
  function Zc(e, t) {
    var a = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (e != null && e.refCount++, a != null && co(a));
  }
  function Hc(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && co(e));
  }
  function pn(e, t, a, r) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        __(
          e,
          t,
          a,
          r
        ), t = t.sibling;
  }
  function __(e, t, a, r) {
    var c = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        pn(
          e,
          t,
          a,
          r
        ), c & 2048 && wo(9, t);
        break;
      case 1:
        pn(
          e,
          t,
          a,
          r
        );
        break;
      case 3:
        pn(
          e,
          t,
          a,
          r
        ), c & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && co(e)));
        break;
      case 12:
        if (c & 2048) {
          pn(
            e,
            t,
            a,
            r
          ), e = t.stateNode;
          try {
            var u = t.memoizedProps, h = u.id, b = u.onPostCommit;
            typeof b == "function" && b(
              h,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (x) {
            Le(t, t.return, x);
          }
        } else
          pn(
            e,
            t,
            a,
            r
          );
        break;
      case 31:
        pn(
          e,
          t,
          a,
          r
        );
        break;
      case 13:
        pn(
          e,
          t,
          a,
          r
        );
        break;
      case 23:
        break;
      case 22:
        u = t.stateNode, h = t.alternate, t.memoizedState !== null ? u._visibility & 2 ? pn(
          e,
          t,
          a,
          r
        ) : Eo(e, t) : u._visibility & 2 ? pn(
          e,
          t,
          a,
          r
        ) : (u._visibility |= 2, wi(
          e,
          t,
          a,
          r,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), c & 2048 && Zc(h, t);
        break;
      case 24:
        pn(
          e,
          t,
          a,
          r
        ), c & 2048 && Hc(t.alternate, t);
        break;
      default:
        pn(
          e,
          t,
          a,
          r
        );
    }
  }
  function wi(e, t, a, r, c) {
    for (c = c && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = e, h = t, b = a, x = r, j = h.flags;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          wi(
            u,
            h,
            b,
            x,
            c
          ), wo(8, h);
          break;
        case 23:
          break;
        case 22:
          var q = h.stateNode;
          h.memoizedState !== null ? q._visibility & 2 ? wi(
            u,
            h,
            b,
            x,
            c
          ) : Eo(
            u,
            h
          ) : (q._visibility |= 2, wi(
            u,
            h,
            b,
            x,
            c
          )), c && j & 2048 && Zc(
            h.alternate,
            h
          );
          break;
        case 24:
          wi(
            u,
            h,
            b,
            x,
            c
          ), c && j & 2048 && Hc(h.alternate, h);
          break;
        default:
          wi(
            u,
            h,
            b,
            x,
            c
          );
      }
      t = t.sibling;
    }
  }
  function Eo(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = e, r = t, c = r.flags;
        switch (r.tag) {
          case 22:
            Eo(a, r), c & 2048 && Zc(
              r.alternate,
              r
            );
            break;
          case 24:
            Eo(a, r), c & 2048 && Hc(r.alternate, r);
            break;
          default:
            Eo(a, r);
        }
        t = t.sibling;
      }
  }
  var To = 8192;
  function xi(e, t, a) {
    if (e.subtreeFlags & To)
      for (e = e.child; e !== null; )
        p_(
          e,
          t,
          a
        ), e = e.sibling;
  }
  function p_(e, t, a) {
    switch (e.tag) {
      case 26:
        xi(
          e,
          t,
          a
        ), e.flags & To && e.memoizedState !== null && gb(
          a,
          _n,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        xi(
          e,
          t,
          a
        );
        break;
      case 3:
      case 4:
        var r = _n;
        _n = ul(e.stateNode.containerInfo), xi(
          e,
          t,
          a
        ), _n = r;
        break;
      case 22:
        e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = To, To = 16777216, xi(
          e,
          t,
          a
        ), To = r) : xi(
          e,
          t,
          a
        ));
        break;
      default:
        xi(
          e,
          t,
          a
        );
    }
  }
  function g_(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function zo(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var r = t[a];
          ft = r, v_(
            r,
            e
          );
        }
      g_(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        h_(e), e = e.sibling;
  }
  function h_(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        zo(e), e.flags & 2048 && ra(9, e, e.return);
        break;
      case 3:
        zo(e);
        break;
      case 12:
        zo(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Qr(e)) : zo(e);
        break;
      default:
        zo(e);
    }
  }
  function Qr(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var r = t[a];
          ft = r, v_(
            r,
            e
          );
        }
      g_(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          ra(8, t, t.return), Qr(t);
          break;
        case 22:
          a = t.stateNode, a._visibility & 2 && (a._visibility &= -3, Qr(t));
          break;
        default:
          Qr(t);
      }
      e = e.sibling;
    }
  }
  function v_(e, t) {
    for (; ft !== null; ) {
      var a = ft;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          ra(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var r = a.memoizedState.cachePool.pool;
            r != null && r.refCount++;
          }
          break;
        case 24:
          co(a.memoizedState.cache);
      }
      if (r = a.child, r !== null) r.return = a, ft = r;
      else
        e: for (a = e; ft !== null; ) {
          r = ft;
          var c = r.sibling, u = r.return;
          if (s_(r), r === a) {
            ft = null;
            break e;
          }
          if (c !== null) {
            c.return = u, ft = c;
            break e;
          }
          ft = u;
        }
    }
  }
  var My = {
    getCacheForType: function(e) {
      var t = gt(at), a = t.data.get(e);
      return a === void 0 && (a = e(), t.data.set(e, a)), a;
    },
    cacheSignal: function() {
      return gt(at).controller.signal;
    }
  }, Oy = typeof WeakMap == "function" ? WeakMap : Map, Re = 0, Be = null, ke = null, xe = 0, De = 0, Kt = null, la = !1, Ei = !1, Bc = !1, Zn = 0, Qe = 0, sa = 0, qa = 0, Gc = 0, qt = 0, Ti = 0, No = null, Ot = null, Kc = !1, Jr = 0, y_ = 0, Wr = 1 / 0, el = null, ca = null, dt = 0, ua = null, zi = null, Hn = 0, qc = 0, Vc = null, b_ = null, Ao = 0, Xc = null;
  function Vt() {
    return (Re & 2) !== 0 && xe !== 0 ? xe & -xe : T.T !== null ? Jc() : Dd();
  }
  function S_() {
    if (qt === 0)
      if ((xe & 536870912) === 0 || Te) {
        var e = sr;
        sr <<= 1, (sr & 3932160) === 0 && (sr = 262144), qt = e;
      } else qt = 536870912;
    return e = Bt.current, e !== null && (e.flags |= 32), qt;
  }
  function Rt(e, t, a) {
    (e === Be && (De === 2 || De === 9) || e.cancelPendingCommit !== null) && (Ni(e, 0), da(
      e,
      xe,
      qt,
      !1
    )), Ii(e, a), ((Re & 2) === 0 || e !== Be) && (e === Be && ((Re & 2) === 0 && (qa |= a), Qe === 4 && da(
      e,
      xe,
      qt,
      !1
    )), kn(e));
  }
  function k_(e, t, a) {
    if ((Re & 6) !== 0) throw Error(l(327));
    var r = !a && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Pi(e, t), c = r ? Dy(e, t) : Pc(e, t, !0), u = r;
    do {
      if (c === 0) {
        Ei && !r && da(e, t, 0, !1);
        break;
      } else {
        if (a = e.current.alternate, u && !Ry(a)) {
          c = Pc(e, t, !1), u = !1;
          continue;
        }
        if (c === 2) {
          if (u = t, e.errorRecoveryDisabledLanes & u)
            var h = 0;
          else
            h = e.pendingLanes & -536870913, h = h !== 0 ? h : h & 536870912 ? 536870912 : 0;
          if (h !== 0) {
            t = h;
            e: {
              var b = e;
              c = No;
              var x = b.current.memoizedState.isDehydrated;
              if (x && (Ni(b, h).flags |= 256), h = Pc(
                b,
                h,
                !1
              ), h !== 2) {
                if (Bc && !x) {
                  b.errorRecoveryDisabledLanes |= u, qa |= u, c = 4;
                  break e;
                }
                u = Ot, Ot = c, u !== null && (Ot === null ? Ot = u : Ot.push.apply(
                  Ot,
                  u
                ));
              }
              c = h;
            }
            if (u = !1, c !== 2) continue;
          }
        }
        if (c === 1) {
          Ni(e, 0), da(e, t, 0, !0);
          break;
        }
        e: {
          switch (r = e, u = c, u) {
            case 0:
            case 1:
              throw Error(l(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              da(
                r,
                t,
                qt,
                !la
              );
              break e;
            case 2:
              Ot = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(l(329));
          }
          if ((t & 62914560) === t && (c = Jr + 300 - kt(), 10 < c)) {
            if (da(
              r,
              t,
              qt,
              !la
            ), ur(r, 0, !0) !== 0) break e;
            Hn = t, r.timeoutHandle = W_(
              w_.bind(
                null,
                r,
                a,
                Ot,
                el,
                Kc,
                t,
                qt,
                qa,
                Ti,
                la,
                u,
                "Throttled",
                -0,
                0
              ),
              c
            );
            break e;
          }
          w_(
            r,
            a,
            Ot,
            el,
            Kc,
            t,
            qt,
            qa,
            Ti,
            la,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    kn(e);
  }
  function w_(e, t, a, r, c, u, h, b, x, j, q, P, U, H) {
    if (e.timeoutHandle = -1, P = t.subtreeFlags, P & 8192 || (P & 16785408) === 16785408) {
      P = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: En
      }, p_(
        t,
        u,
        P
      );
      var oe = (u & 62914560) === u ? Jr - kt() : (u & 4194048) === u ? y_ - kt() : 0;
      if (oe = hb(
        P,
        oe
      ), oe !== null) {
        Hn = u, e.cancelPendingCommit = oe(
          M_.bind(
            null,
            e,
            t,
            u,
            a,
            r,
            c,
            h,
            b,
            x,
            q,
            P,
            null,
            U,
            H
          )
        ), da(e, u, h, !j);
        return;
      }
    }
    M_(
      e,
      t,
      u,
      a,
      r,
      c,
      h,
      b,
      x
    );
  }
  function Ry(e) {
    for (var t = e; ; ) {
      var a = t.tag;
      if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null)))
        for (var r = 0; r < a.length; r++) {
          var c = a[r], u = c.getSnapshot;
          c = c.value;
          try {
            if (!Zt(u(), c)) return !1;
          } catch {
            return !1;
          }
        }
      if (a = t.child, t.subtreeFlags & 16384 && a !== null)
        a.return = t, t = a;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function da(e, t, a, r) {
    t &= ~Gc, t &= ~qa, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
    for (var c = t; 0 < c; ) {
      var u = 31 - Yt(c), h = 1 << u;
      r[u] = -1, c &= ~h;
    }
    a !== 0 && Od(e, a, t);
  }
  function tl() {
    return (Re & 6) === 0 ? (Co(0), !1) : !0;
  }
  function $c() {
    if (ke !== null) {
      if (De === 0)
        var e = ke.return;
      else
        e = ke, An = Da = null, cc(e), vi = null, mo = 0, e = ke;
      for (; e !== null; )
        e_(e.alternate, e), e = e.return;
      ke = null;
    }
  }
  function Ni(e, t) {
    var a = e.timeoutHandle;
    a !== -1 && (e.timeoutHandle = -1, Wy(a)), a = e.cancelPendingCommit, a !== null && (e.cancelPendingCommit = null, a()), Hn = 0, $c(), Be = e, ke = a = zn(e.current, null), xe = t, De = 0, Kt = null, la = !1, Ei = Pi(e, t), Bc = !1, Ti = qt = Gc = qa = sa = Qe = 0, Ot = No = null, Kc = !1, (t & 8) !== 0 && (t |= t & 32);
    var r = e.entangledLanes;
    if (r !== 0)
      for (e = e.entanglements, r &= t; 0 < r; ) {
        var c = 31 - Yt(r), u = 1 << c;
        t |= e[c], r &= ~u;
      }
    return Zn = t, kr(), a;
  }
  function x_(e, t) {
    be = null, T.H = bo, t === hi || t === Cr ? (t = Zm(), De = 3) : t === Qs ? (t = Zm(), De = 4) : De = t === Ec ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Kt = t, ke === null && (Qe = 1, qr(
      e,
      Qt(t, e.current)
    ));
  }
  function E_() {
    var e = Bt.current;
    return e === null ? !0 : (xe & 4194048) === xe ? tn === null : (xe & 62914560) === xe || (xe & 536870912) !== 0 ? e === tn : !1;
  }
  function T_() {
    var e = T.H;
    return T.H = bo, e === null ? bo : e;
  }
  function z_() {
    var e = T.A;
    return T.A = My, e;
  }
  function nl() {
    Qe = 4, la || (xe & 4194048) !== xe && Bt.current !== null || (Ei = !0), (sa & 134217727) === 0 && (qa & 134217727) === 0 || Be === null || da(
      Be,
      xe,
      qt,
      !1
    );
  }
  function Pc(e, t, a) {
    var r = Re;
    Re |= 2;
    var c = T_(), u = z_();
    (Be !== e || xe !== t) && (el = null, Ni(e, t)), t = !1;
    var h = Qe;
    e: do
      try {
        if (De !== 0 && ke !== null) {
          var b = ke, x = Kt;
          switch (De) {
            case 8:
              $c(), h = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Bt.current === null && (t = !0);
              var j = De;
              if (De = 0, Kt = null, Ai(e, b, x, j), a && Ei) {
                h = 0;
                break e;
              }
              break;
            default:
              j = De, De = 0, Kt = null, Ai(e, b, x, j);
          }
        }
        jy(), h = Qe;
        break;
      } catch (q) {
        x_(e, q);
      }
    while (!0);
    return t && e.shellSuspendCounter++, An = Da = null, Re = r, T.H = c, T.A = u, ke === null && (Be = null, xe = 0, kr()), h;
  }
  function jy() {
    for (; ke !== null; ) N_(ke);
  }
  function Dy(e, t) {
    var a = Re;
    Re |= 2;
    var r = T_(), c = z_();
    Be !== e || xe !== t ? (el = null, Wr = kt() + 500, Ni(e, t)) : Ei = Pi(
      e,
      t
    );
    e: do
      try {
        if (De !== 0 && ke !== null) {
          t = ke;
          var u = Kt;
          t: switch (De) {
            case 1:
              De = 0, Kt = null, Ai(e, t, u, 1);
              break;
            case 2:
            case 9:
              if (Um(u)) {
                De = 0, Kt = null, A_(t);
                break;
              }
              t = function() {
                De !== 2 && De !== 9 || Be !== e || (De = 7), kn(e);
              }, u.then(t, t);
              break e;
            case 3:
              De = 7;
              break e;
            case 4:
              De = 5;
              break e;
            case 7:
              Um(u) ? (De = 0, Kt = null, A_(t)) : (De = 0, Kt = null, Ai(e, t, u, 7));
              break;
            case 5:
              var h = null;
              switch (ke.tag) {
                case 26:
                  h = ke.memoizedState;
                case 5:
                case 27:
                  var b = ke;
                  if (h ? _p(h) : b.stateNode.complete) {
                    De = 0, Kt = null;
                    var x = b.sibling;
                    if (x !== null) ke = x;
                    else {
                      var j = b.return;
                      j !== null ? (ke = j, al(j)) : ke = null;
                    }
                    break t;
                  }
              }
              De = 0, Kt = null, Ai(e, t, u, 5);
              break;
            case 6:
              De = 0, Kt = null, Ai(e, t, u, 6);
              break;
            case 8:
              $c(), Qe = 6;
              break e;
            default:
              throw Error(l(462));
          }
        }
        Ly();
        break;
      } catch (q) {
        x_(e, q);
      }
    while (!0);
    return An = Da = null, T.H = r, T.A = c, Re = a, ke !== null ? 0 : (Be = null, xe = 0, kr(), Qe);
  }
  function Ly() {
    for (; ke !== null && !ls(); )
      N_(ke);
  }
  function N_(e) {
    var t = Jf(e.alternate, e, Zn);
    e.memoizedProps = e.pendingProps, t === null ? al(e) : ke = t;
  }
  function A_(e) {
    var t = e, a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Xf(
          a,
          t,
          t.pendingProps,
          t.type,
          void 0,
          xe
        );
        break;
      case 11:
        t = Xf(
          a,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          xe
        );
        break;
      case 5:
        cc(t);
      default:
        e_(a, t), t = ke = Tm(t, Zn), t = Jf(a, t, Zn);
    }
    e.memoizedProps = e.pendingProps, t === null ? al(e) : ke = t;
  }
  function Ai(e, t, a, r) {
    An = Da = null, cc(t), vi = null, mo = 0;
    var c = t.return;
    try {
      if (xy(
        e,
        c,
        t,
        a,
        xe
      )) {
        Qe = 1, qr(
          e,
          Qt(a, e.current)
        ), ke = null;
        return;
      }
    } catch (u) {
      if (c !== null) throw ke = c, u;
      Qe = 1, qr(
        e,
        Qt(a, e.current)
      ), ke = null;
      return;
    }
    t.flags & 32768 ? (Te || r === 1 ? e = !0 : Ei || (xe & 536870912) !== 0 ? e = !1 : (la = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = Bt.current, r !== null && r.tag === 13 && (r.flags |= 16384))), C_(t, e)) : al(t);
  }
  function al(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        C_(
          t,
          la
        );
        return;
      }
      e = t.return;
      var a = zy(
        t.alternate,
        t,
        Zn
      );
      if (a !== null) {
        ke = a;
        return;
      }
      if (t = t.sibling, t !== null) {
        ke = t;
        return;
      }
      ke = t = e;
    } while (t !== null);
    Qe === 0 && (Qe = 5);
  }
  function C_(e, t) {
    do {
      var a = Ny(e.alternate, e);
      if (a !== null) {
        a.flags &= 32767, ke = a;
        return;
      }
      if (a = e.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !t && (e = e.sibling, e !== null)) {
        ke = e;
        return;
      }
      ke = e = a;
    } while (e !== null);
    Qe = 6, ke = null;
  }
  function M_(e, t, a, r, c, u, h, b, x) {
    e.cancelPendingCommit = null;
    do
      il();
    while (dt !== 0);
    if ((Re & 6) !== 0) throw Error(l(327));
    if (t !== null) {
      if (t === e.current) throw Error(l(177));
      if (u = t.lanes | t.childLanes, u |= Ls, pv(
        e,
        a,
        u,
        h,
        b,
        x
      ), e === Be && (ke = Be = null, xe = 0), zi = t, ua = e, Hn = a, qc = u, Vc = c, b_ = r, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Hy(Fa, function() {
        return L_(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || r) {
        r = T.T, T.T = null, c = J.p, J.p = 2, h = Re, Re |= 4;
        try {
          Ay(e, t, a);
        } finally {
          Re = h, J.p = c, T.T = r;
        }
      }
      dt = 1, O_(), R_(), j_();
    }
  }
  function O_() {
    if (dt === 1) {
      dt = 0;
      var e = ua, t = zi, a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        a = T.T, T.T = null;
        var r = J.p;
        J.p = 2;
        var c = Re;
        Re |= 4;
        try {
          m_(t, e);
          var u = ru, h = hm(e.containerInfo), b = u.focusedElem, x = u.selectionRange;
          if (h !== b && b && b.ownerDocument && gm(
            b.ownerDocument.documentElement,
            b
          )) {
            if (x !== null && Ms(b)) {
              var j = x.start, q = x.end;
              if (q === void 0 && (q = j), "selectionStart" in b)
                b.selectionStart = j, b.selectionEnd = Math.min(
                  q,
                  b.value.length
                );
              else {
                var P = b.ownerDocument || document, U = P && P.defaultView || window;
                if (U.getSelection) {
                  var H = U.getSelection(), oe = b.textContent.length, he = Math.min(x.start, oe), He = x.end === void 0 ? he : Math.min(x.end, oe);
                  !H.extend && he > He && (h = He, He = he, he = h);
                  var C = pm(
                    b,
                    he
                  ), z = pm(
                    b,
                    He
                  );
                  if (C && z && (H.rangeCount !== 1 || H.anchorNode !== C.node || H.anchorOffset !== C.offset || H.focusNode !== z.node || H.focusOffset !== z.offset)) {
                    var R = P.createRange();
                    R.setStart(C.node, C.offset), H.removeAllRanges(), he > He ? (H.addRange(R), H.extend(z.node, z.offset)) : (R.setEnd(z.node, z.offset), H.addRange(R));
                  }
                }
              }
            }
            for (P = [], H = b; H = H.parentNode; )
              H.nodeType === 1 && P.push({
                element: H,
                left: H.scrollLeft,
                top: H.scrollTop
              });
            for (typeof b.focus == "function" && b.focus(), b = 0; b < P.length; b++) {
              var V = P[b];
              V.element.scrollLeft = V.left, V.element.scrollTop = V.top;
            }
          }
          gl = !!ou, ru = ou = null;
        } finally {
          Re = c, J.p = r, T.T = a;
        }
      }
      e.current = t, dt = 2;
    }
  }
  function R_() {
    if (dt === 2) {
      dt = 0;
      var e = ua, t = zi, a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        a = T.T, T.T = null;
        var r = J.p;
        J.p = 2;
        var c = Re;
        Re |= 4;
        try {
          l_(e, t.alternate, t);
        } finally {
          Re = c, J.p = r, T.T = a;
        }
      }
      dt = 3;
    }
  }
  function j_() {
    if (dt === 4 || dt === 3) {
      dt = 0, ss();
      var e = ua, t = zi, a = Hn, r = b_;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? dt = 5 : (dt = 0, zi = ua = null, D_(e, e.pendingLanes));
      var c = e.pendingLanes;
      if (c === 0 && (ca = null), ms(a), t = t.stateNode, ut && typeof ut.onCommitFiberRoot == "function")
        try {
          ut.onCommitFiberRoot(
            $n,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (r !== null) {
        t = T.T, c = J.p, J.p = 2, T.T = null;
        try {
          for (var u = e.onRecoverableError, h = 0; h < r.length; h++) {
            var b = r[h];
            u(b.value, {
              componentStack: b.stack
            });
          }
        } finally {
          T.T = t, J.p = c;
        }
      }
      (Hn & 3) !== 0 && il(), kn(e), c = e.pendingLanes, (a & 261930) !== 0 && (c & 42) !== 0 ? e === Xc ? Ao++ : (Ao = 0, Xc = e) : Ao = 0, Co(0);
    }
  }
  function D_(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, co(t)));
  }
  function il() {
    return O_(), R_(), j_(), L_();
  }
  function L_() {
    if (dt !== 5) return !1;
    var e = ua, t = qc;
    qc = 0;
    var a = ms(Hn), r = T.T, c = J.p;
    try {
      J.p = 32 > a ? 32 : a, T.T = null, a = Vc, Vc = null;
      var u = ua, h = Hn;
      if (dt = 0, zi = ua = null, Hn = 0, (Re & 6) !== 0) throw Error(l(331));
      var b = Re;
      if (Re |= 4, h_(u.current), __(
        u,
        u.current,
        h,
        a
      ), Re = b, Co(0, !1), ut && typeof ut.onPostCommitFiberRoot == "function")
        try {
          ut.onPostCommitFiberRoot($n, u);
        } catch {
        }
      return !0;
    } finally {
      J.p = c, T.T = r, D_(e, t);
    }
  }
  function U_(e, t, a) {
    t = Qt(a, t), t = xc(e.stateNode, t, 2), e = aa(e, t, 2), e !== null && (Ii(e, 2), kn(e));
  }
  function Le(e, t, a) {
    if (e.tag === 3)
      U_(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          U_(
            t,
            e,
            a
          );
          break;
        } else if (t.tag === 1) {
          var r = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (ca === null || !ca.has(r))) {
            e = Qt(a, e), a = Yf(2), r = aa(t, a, 2), r !== null && (Zf(
              a,
              r,
              t,
              e
            ), Ii(r, 2), kn(r));
            break;
          }
        }
        t = t.return;
      }
  }
  function Ic(e, t, a) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new Oy();
      var c = /* @__PURE__ */ new Set();
      r.set(t, c);
    } else
      c = r.get(t), c === void 0 && (c = /* @__PURE__ */ new Set(), r.set(t, c));
    c.has(a) || (Bc = !0, c.add(a), e = Uy.bind(null, e, t, a), t.then(e, e));
  }
  function Uy(e, t, a) {
    var r = e.pingCache;
    r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & a, e.warmLanes &= ~a, Be === e && (xe & a) === a && (Qe === 4 || Qe === 3 && (xe & 62914560) === xe && 300 > kt() - Jr ? (Re & 2) === 0 && Ni(e, 0) : Gc |= a, Ti === xe && (Ti = 0)), kn(e);
  }
  function Y_(e, t) {
    t === 0 && (t = Md()), e = Oa(e, t), e !== null && (Ii(e, t), kn(e));
  }
  function Yy(e) {
    var t = e.memoizedState, a = 0;
    t !== null && (a = t.retryLane), Y_(e, a);
  }
  function Zy(e, t) {
    var a = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var r = e.stateNode, c = e.memoizedState;
        c !== null && (a = c.retryLane);
        break;
      case 19:
        r = e.stateNode;
        break;
      case 22:
        r = e.stateNode._retryCache;
        break;
      default:
        throw Error(l(314));
    }
    r !== null && r.delete(t), Y_(e, a);
  }
  function Hy(e, t) {
    return Vi(e, t);
  }
  var ol = null, Ci = null, Fc = !1, rl = !1, Qc = !1, ma = 0;
  function kn(e) {
    e !== Ci && e.next === null && (Ci === null ? ol = Ci = e : Ci = Ci.next = e), rl = !0, Fc || (Fc = !0, Gy());
  }
  function Co(e, t) {
    if (!Qc && rl) {
      Qc = !0;
      do
        for (var a = !1, r = ol; r !== null; ) {
          if (e !== 0) {
            var c = r.pendingLanes;
            if (c === 0) var u = 0;
            else {
              var h = r.suspendedLanes, b = r.pingedLanes;
              u = (1 << 31 - Yt(42 | e) + 1) - 1, u &= c & ~(h & ~b), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (a = !0, G_(r, u));
          } else
            u = xe, u = ur(
              r,
              r === Be ? u : 0,
              r.cancelPendingCommit !== null || r.timeoutHandle !== -1
            ), (u & 3) === 0 || Pi(r, u) || (a = !0, G_(r, u));
          r = r.next;
        }
      while (a);
      Qc = !1;
    }
  }
  function By() {
    Z_();
  }
  function Z_() {
    rl = Fc = !1;
    var e = 0;
    ma !== 0 && Jy() && (e = ma);
    for (var t = kt(), a = null, r = ol; r !== null; ) {
      var c = r.next, u = H_(r, t);
      u === 0 ? (r.next = null, a === null ? ol = c : a.next = c, c === null && (Ci = a)) : (a = r, (e !== 0 || (u & 3) !== 0) && (rl = !0)), r = c;
    }
    dt !== 0 && dt !== 5 || Co(e), ma !== 0 && (ma = 0);
  }
  function H_(e, t) {
    for (var a = e.suspendedLanes, r = e.pingedLanes, c = e.expirationTimes, u = e.pendingLanes & -62914561; 0 < u; ) {
      var h = 31 - Yt(u), b = 1 << h, x = c[h];
      x === -1 ? ((b & a) === 0 || (b & r) !== 0) && (c[h] = _v(b, t)) : x <= t && (e.expiredLanes |= b), u &= ~b;
    }
    if (t = Be, a = xe, a = ur(
      e,
      e === t ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), r = e.callbackNode, a === 0 || e === t && (De === 2 || De === 9) || e.cancelPendingCommit !== null)
      return r !== null && r !== null && Xi(r), e.callbackNode = null, e.callbackPriority = 0;
    if ((a & 3) === 0 || Pi(e, a)) {
      if (t = a & -a, t === e.callbackPriority) return t;
      switch (r !== null && Xi(r), ms(a)) {
        case 2:
        case 8:
          a = $i;
          break;
        case 32:
          a = Fa;
          break;
        case 268435456:
          a = Lt;
          break;
        default:
          a = Fa;
      }
      return r = B_.bind(null, e), a = Vi(a, r), e.callbackPriority = t, e.callbackNode = a, t;
    }
    return r !== null && r !== null && Xi(r), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function B_(e, t) {
    if (dt !== 0 && dt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var a = e.callbackNode;
    if (il() && e.callbackNode !== a)
      return null;
    var r = xe;
    return r = ur(
      e,
      e === Be ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), r === 0 ? null : (k_(e, r, t), H_(e, kt()), e.callbackNode != null && e.callbackNode === a ? B_.bind(null, e) : null);
  }
  function G_(e, t) {
    if (il()) return null;
    k_(e, t, !0);
  }
  function Gy() {
    eb(function() {
      (Re & 6) !== 0 ? Vi(
        or,
        By
      ) : Z_();
    });
  }
  function Jc() {
    if (ma === 0) {
      var e = pi;
      e === 0 && (e = lr, lr <<= 1, (lr & 261888) === 0 && (lr = 256)), ma = e;
    }
    return ma;
  }
  function K_(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : _r("" + e);
  }
  function q_(e, t) {
    var a = t.ownerDocument.createElement("input");
    return a.name = t.name, a.value = t.value, e.id && a.setAttribute("form", e.id), t.parentNode.insertBefore(a, t), e = new FormData(e), a.parentNode.removeChild(a), e;
  }
  function Ky(e, t, a, r, c) {
    if (t === "submit" && a && a.stateNode === c) {
      var u = K_(
        (c[zt] || null).action
      ), h = r.submitter;
      h && (t = (t = h[zt] || null) ? K_(t.formAction) : h.getAttribute("formAction"), t !== null && (u = t, h = null));
      var b = new vr(
        "action",
        "action",
        null,
        r,
        c
      );
      e.push({
        event: b,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (r.defaultPrevented) {
                if (ma !== 0) {
                  var x = h ? q_(c, h) : new FormData(c);
                  vc(
                    a,
                    {
                      pending: !0,
                      data: x,
                      method: c.method,
                      action: u
                    },
                    null,
                    x
                  );
                }
              } else
                typeof u == "function" && (b.preventDefault(), x = h ? q_(c, h) : new FormData(c), vc(
                  a,
                  {
                    pending: !0,
                    data: x,
                    method: c.method,
                    action: u
                  },
                  u,
                  x
                ));
            },
            currentTarget: c
          }
        ]
      });
    }
  }
  for (var Wc = 0; Wc < Ds.length; Wc++) {
    var eu = Ds[Wc], qy = eu.toLowerCase(), Vy = eu[0].toUpperCase() + eu.slice(1);
    fn(
      qy,
      "on" + Vy
    );
  }
  fn(bm, "onAnimationEnd"), fn(Sm, "onAnimationIteration"), fn(km, "onAnimationStart"), fn("dblclick", "onDoubleClick"), fn("focusin", "onFocus"), fn("focusout", "onBlur"), fn(ly, "onTransitionRun"), fn(sy, "onTransitionStart"), fn(cy, "onTransitionCancel"), fn(wm, "onTransitionEnd"), ti("onMouseEnter", ["mouseout", "mouseover"]), ti("onMouseLeave", ["mouseout", "mouseover"]), ti("onPointerEnter", ["pointerout", "pointerover"]), ti("onPointerLeave", ["pointerout", "pointerover"]), Na(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Na(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Na("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Na(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Na(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Na(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Mo = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Xy = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Mo)
  );
  function V_(e, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var r = e[a], c = r.event;
      r = r.listeners;
      e: {
        var u = void 0;
        if (t)
          for (var h = r.length - 1; 0 <= h; h--) {
            var b = r[h], x = b.instance, j = b.currentTarget;
            if (b = b.listener, x !== u && c.isPropagationStopped())
              break e;
            u = b, c.currentTarget = j;
            try {
              u(c);
            } catch (q) {
              Sr(q);
            }
            c.currentTarget = null, u = x;
          }
        else
          for (h = 0; h < r.length; h++) {
            if (b = r[h], x = b.instance, j = b.currentTarget, b = b.listener, x !== u && c.isPropagationStopped())
              break e;
            u = b, c.currentTarget = j;
            try {
              u(c);
            } catch (q) {
              Sr(q);
            }
            c.currentTarget = null, u = x;
          }
      }
    }
  }
  function we(e, t) {
    var a = t[fs];
    a === void 0 && (a = t[fs] = /* @__PURE__ */ new Set());
    var r = e + "__bubble";
    a.has(r) || (X_(t, e, 2, !1), a.add(r));
  }
  function tu(e, t, a) {
    var r = 0;
    t && (r |= 4), X_(
      a,
      e,
      r,
      t
    );
  }
  var ll = "_reactListening" + Math.random().toString(36).slice(2);
  function nu(e) {
    if (!e[ll]) {
      e[ll] = !0, Yd.forEach(function(a) {
        a !== "selectionchange" && (Xy.has(a) || tu(a, !1, e), tu(a, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[ll] || (t[ll] = !0, tu("selectionchange", !1, t));
    }
  }
  function X_(e, t, a, r) {
    switch (Sp(t)) {
      case 2:
        var c = bb;
        break;
      case 8:
        c = Sb;
        break;
      default:
        c = hu;
    }
    a = c.bind(
      null,
      t,
      a,
      e
    ), c = void 0, !ks || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (c = !0), r ? c !== void 0 ? e.addEventListener(t, a, {
      capture: !0,
      passive: c
    }) : e.addEventListener(t, a, !0) : c !== void 0 ? e.addEventListener(t, a, {
      passive: c
    }) : e.addEventListener(t, a, !1);
  }
  function au(e, t, a, r, c) {
    var u = r;
    if ((t & 1) === 0 && (t & 2) === 0 && r !== null)
      e: for (; ; ) {
        if (r === null) return;
        var h = r.tag;
        if (h === 3 || h === 4) {
          var b = r.stateNode.containerInfo;
          if (b === c) break;
          if (h === 4)
            for (h = r.return; h !== null; ) {
              var x = h.tag;
              if ((x === 3 || x === 4) && h.stateNode.containerInfo === c)
                return;
              h = h.return;
            }
          for (; b !== null; ) {
            if (h = Ja(b), h === null) return;
            if (x = h.tag, x === 5 || x === 6 || x === 26 || x === 27) {
              r = u = h;
              continue e;
            }
            b = b.parentNode;
          }
        }
        r = r.return;
      }
    Fd(function() {
      var j = u, q = bs(a), P = [];
      e: {
        var U = xm.get(e);
        if (U !== void 0) {
          var H = vr, oe = e;
          switch (e) {
            case "keypress":
              if (gr(a) === 0) break e;
            case "keydown":
            case "keyup":
              H = Zv;
              break;
            case "focusin":
              oe = "focus", H = Ts;
              break;
            case "focusout":
              oe = "blur", H = Ts;
              break;
            case "beforeblur":
            case "afterblur":
              H = Ts;
              break;
            case "click":
              if (a.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              H = Wd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              H = zv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              H = Gv;
              break;
            case bm:
            case Sm:
            case km:
              H = Cv;
              break;
            case wm:
              H = qv;
              break;
            case "scroll":
            case "scrollend":
              H = Ev;
              break;
            case "wheel":
              H = Xv;
              break;
            case "copy":
            case "cut":
            case "paste":
              H = Ov;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              H = tm;
              break;
            case "toggle":
            case "beforetoggle":
              H = Pv;
          }
          var he = (t & 4) !== 0, He = !he && (e === "scroll" || e === "scrollend"), C = he ? U !== null ? U + "Capture" : null : U;
          he = [];
          for (var z = j, R; z !== null; ) {
            var V = z;
            if (R = V.stateNode, V = V.tag, V !== 5 && V !== 26 && V !== 27 || R === null || C === null || (V = Ji(z, C), V != null && he.push(
              Oo(z, V, R)
            )), He) break;
            z = z.return;
          }
          0 < he.length && (U = new H(
            U,
            oe,
            null,
            a,
            q
          ), P.push({ event: U, listeners: he }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (U = e === "mouseover" || e === "pointerover", H = e === "mouseout" || e === "pointerout", U && a !== ys && (oe = a.relatedTarget || a.fromElement) && (Ja(oe) || oe[Qa]))
            break e;
          if ((H || U) && (U = q.window === q ? q : (U = q.ownerDocument) ? U.defaultView || U.parentWindow : window, H ? (oe = a.relatedTarget || a.toElement, H = j, oe = oe ? Ja(oe) : null, oe !== null && (He = d(oe), he = oe.tag, oe !== He || he !== 5 && he !== 27 && he !== 6) && (oe = null)) : (H = null, oe = j), H !== oe)) {
            if (he = Wd, V = "onMouseLeave", C = "onMouseEnter", z = "mouse", (e === "pointerout" || e === "pointerover") && (he = tm, V = "onPointerLeave", C = "onPointerEnter", z = "pointer"), He = H == null ? U : Qi(H), R = oe == null ? U : Qi(oe), U = new he(
              V,
              z + "leave",
              H,
              a,
              q
            ), U.target = He, U.relatedTarget = R, V = null, Ja(q) === j && (he = new he(
              C,
              z + "enter",
              oe,
              a,
              q
            ), he.target = R, he.relatedTarget = He, V = he), He = V, H && oe)
              t: {
                for (he = $y, C = H, z = oe, R = 0, V = C; V; V = he(V))
                  R++;
                V = 0;
                for (var ue = z; ue; ue = he(ue))
                  V++;
                for (; 0 < R - V; )
                  C = he(C), R--;
                for (; 0 < V - R; )
                  z = he(z), V--;
                for (; R--; ) {
                  if (C === z || z !== null && C === z.alternate) {
                    he = C;
                    break t;
                  }
                  C = he(C), z = he(z);
                }
                he = null;
              }
            else he = null;
            H !== null && $_(
              P,
              U,
              H,
              he,
              !1
            ), oe !== null && He !== null && $_(
              P,
              He,
              oe,
              he,
              !0
            );
          }
        }
        e: {
          if (U = j ? Qi(j) : window, H = U.nodeName && U.nodeName.toLowerCase(), H === "select" || H === "input" && U.type === "file")
            var Ce = cm;
          else if (lm(U))
            if (um)
              Ce = iy;
            else {
              Ce = ny;
              var se = ty;
            }
          else
            H = U.nodeName, !H || H.toLowerCase() !== "input" || U.type !== "checkbox" && U.type !== "radio" ? j && vs(j.elementType) && (Ce = cm) : Ce = ay;
          if (Ce && (Ce = Ce(e, j))) {
            sm(
              P,
              Ce,
              a,
              q
            );
            break e;
          }
          se && se(e, U, j), e === "focusout" && j && U.type === "number" && j.memoizedProps.value != null && hs(U, "number", U.value);
        }
        switch (se = j ? Qi(j) : window, e) {
          case "focusin":
            (lm(se) || se.contentEditable === "true") && (li = se, Os = j, ro = null);
            break;
          case "focusout":
            ro = Os = li = null;
            break;
          case "mousedown":
            Rs = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Rs = !1, vm(P, a, q);
            break;
          case "selectionchange":
            if (ry) break;
          case "keydown":
          case "keyup":
            vm(P, a, q);
        }
        var Se;
        if (Ns)
          e: {
            switch (e) {
              case "compositionstart":
                var Ee = "onCompositionStart";
                break e;
              case "compositionend":
                Ee = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Ee = "onCompositionUpdate";
                break e;
            }
            Ee = void 0;
          }
        else
          ri ? om(e, a) && (Ee = "onCompositionEnd") : e === "keydown" && a.keyCode === 229 && (Ee = "onCompositionStart");
        Ee && (nm && a.locale !== "ko" && (ri || Ee !== "onCompositionStart" ? Ee === "onCompositionEnd" && ri && (Se = Qd()) : (Fn = q, ws = "value" in Fn ? Fn.value : Fn.textContent, ri = !0)), se = sl(j, Ee), 0 < se.length && (Ee = new em(
          Ee,
          e,
          null,
          a,
          q
        ), P.push({ event: Ee, listeners: se }), Se ? Ee.data = Se : (Se = rm(a), Se !== null && (Ee.data = Se)))), (Se = Fv ? Qv(e, a) : Jv(e, a)) && (Ee = sl(j, "onBeforeInput"), 0 < Ee.length && (se = new em(
          "onBeforeInput",
          "beforeinput",
          null,
          a,
          q
        ), P.push({
          event: se,
          listeners: Ee
        }), se.data = Se)), Ky(
          P,
          e,
          j,
          a,
          q
        );
      }
      V_(P, t);
    });
  }
  function Oo(e, t, a) {
    return {
      instance: e,
      listener: t,
      currentTarget: a
    };
  }
  function sl(e, t) {
    for (var a = t + "Capture", r = []; e !== null; ) {
      var c = e, u = c.stateNode;
      if (c = c.tag, c !== 5 && c !== 26 && c !== 27 || u === null || (c = Ji(e, a), c != null && r.unshift(
        Oo(e, c, u)
      ), c = Ji(e, t), c != null && r.push(
        Oo(e, c, u)
      )), e.tag === 3) return r;
      e = e.return;
    }
    return [];
  }
  function $y(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function $_(e, t, a, r, c) {
    for (var u = t._reactName, h = []; a !== null && a !== r; ) {
      var b = a, x = b.alternate, j = b.stateNode;
      if (b = b.tag, x !== null && x === r) break;
      b !== 5 && b !== 26 && b !== 27 || j === null || (x = j, c ? (j = Ji(a, u), j != null && h.unshift(
        Oo(a, j, x)
      )) : c || (j = Ji(a, u), j != null && h.push(
        Oo(a, j, x)
      ))), a = a.return;
    }
    h.length !== 0 && e.push({ event: t, listeners: h });
  }
  var Py = /\r\n?/g, Iy = /\u0000|\uFFFD/g;
  function P_(e) {
    return (typeof e == "string" ? e : "" + e).replace(Py, `
`).replace(Iy, "");
  }
  function I_(e, t) {
    return t = P_(t), P_(e) === t;
  }
  function Ze(e, t, a, r, c, u) {
    switch (a) {
      case "children":
        typeof r == "string" ? t === "body" || t === "textarea" && r === "" || ai(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && ai(e, "" + r);
        break;
      case "className":
        mr(e, "class", r);
        break;
      case "tabIndex":
        mr(e, "tabindex", r);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        mr(e, a, r);
        break;
      case "style":
        Pd(e, r, u);
        break;
      case "data":
        if (t !== "object") {
          mr(e, "data", r);
          break;
        }
      case "src":
      case "href":
        if (r === "" && (t !== "a" || a !== "href")) {
          e.removeAttribute(a);
          break;
        }
        if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
          e.removeAttribute(a);
          break;
        }
        r = _r("" + r), e.setAttribute(a, r);
        break;
      case "action":
      case "formAction":
        if (typeof r == "function") {
          e.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" && (a === "formAction" ? (t !== "input" && Ze(e, t, "name", c.name, c, null), Ze(
            e,
            t,
            "formEncType",
            c.formEncType,
            c,
            null
          ), Ze(
            e,
            t,
            "formMethod",
            c.formMethod,
            c,
            null
          ), Ze(
            e,
            t,
            "formTarget",
            c.formTarget,
            c,
            null
          )) : (Ze(e, t, "encType", c.encType, c, null), Ze(e, t, "method", c.method, c, null), Ze(e, t, "target", c.target, c, null)));
        if (r == null || typeof r == "symbol" || typeof r == "boolean") {
          e.removeAttribute(a);
          break;
        }
        r = _r("" + r), e.setAttribute(a, r);
        break;
      case "onClick":
        r != null && (e.onclick = En);
        break;
      case "onScroll":
        r != null && we("scroll", e);
        break;
      case "onScrollEnd":
        r != null && we("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (r != null) {
          if (typeof r != "object" || !("__html" in r))
            throw Error(l(61));
          if (a = r.__html, a != null) {
            if (c.children != null) throw Error(l(60));
            e.innerHTML = a;
          }
        }
        break;
      case "multiple":
        e.multiple = r && typeof r != "function" && typeof r != "symbol";
        break;
      case "muted":
        e.muted = r && typeof r != "function" && typeof r != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        a = _r("" + r), e.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          a
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(a, "" + r) : e.removeAttribute(a);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(a, "") : e.removeAttribute(a);
        break;
      case "capture":
      case "download":
        r === !0 ? e.setAttribute(a, "") : r !== !1 && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(a, r) : e.removeAttribute(a);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(a, r) : e.removeAttribute(a);
        break;
      case "rowSpan":
      case "start":
        r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(a) : e.setAttribute(a, r);
        break;
      case "popover":
        we("beforetoggle", e), we("toggle", e), dr(e, "popover", r);
        break;
      case "xlinkActuate":
        xn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          r
        );
        break;
      case "xlinkArcrole":
        xn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          r
        );
        break;
      case "xlinkRole":
        xn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          r
        );
        break;
      case "xlinkShow":
        xn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          r
        );
        break;
      case "xlinkTitle":
        xn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          r
        );
        break;
      case "xlinkType":
        xn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          r
        );
        break;
      case "xmlBase":
        xn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          r
        );
        break;
      case "xmlLang":
        xn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          r
        );
        break;
      case "xmlSpace":
        xn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          r
        );
        break;
      case "is":
        dr(e, "is", r);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (a = wv.get(a) || a, dr(e, a, r));
    }
  }
  function iu(e, t, a, r, c, u) {
    switch (a) {
      case "style":
        Pd(e, r, u);
        break;
      case "dangerouslySetInnerHTML":
        if (r != null) {
          if (typeof r != "object" || !("__html" in r))
            throw Error(l(61));
          if (a = r.__html, a != null) {
            if (c.children != null) throw Error(l(60));
            e.innerHTML = a;
          }
        }
        break;
      case "children":
        typeof r == "string" ? ai(e, r) : (typeof r == "number" || typeof r == "bigint") && ai(e, "" + r);
        break;
      case "onScroll":
        r != null && we("scroll", e);
        break;
      case "onScrollEnd":
        r != null && we("scrollend", e);
        break;
      case "onClick":
        r != null && (e.onclick = En);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Zd.hasOwnProperty(a))
          e: {
            if (a[0] === "o" && a[1] === "n" && (c = a.endsWith("Capture"), t = a.slice(2, c ? a.length - 7 : void 0), u = e[zt] || null, u = u != null ? u[a] : null, typeof u == "function" && e.removeEventListener(t, u, c), typeof r == "function")) {
              typeof u != "function" && u !== null && (a in e ? e[a] = null : e.hasAttribute(a) && e.removeAttribute(a)), e.addEventListener(t, r, c);
              break e;
            }
            a in e ? e[a] = r : r === !0 ? e.setAttribute(a, "") : dr(e, a, r);
          }
    }
  }
  function vt(e, t, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        we("error", e), we("load", e);
        var r = !1, c = !1, u;
        for (u in a)
          if (a.hasOwnProperty(u)) {
            var h = a[u];
            if (h != null)
              switch (u) {
                case "src":
                  r = !0;
                  break;
                case "srcSet":
                  c = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(l(137, t));
                default:
                  Ze(e, t, u, h, a, null);
              }
          }
        c && Ze(e, t, "srcSet", a.srcSet, a, null), r && Ze(e, t, "src", a.src, a, null);
        return;
      case "input":
        we("invalid", e);
        var b = u = h = c = null, x = null, j = null;
        for (r in a)
          if (a.hasOwnProperty(r)) {
            var q = a[r];
            if (q != null)
              switch (r) {
                case "name":
                  c = q;
                  break;
                case "type":
                  h = q;
                  break;
                case "checked":
                  x = q;
                  break;
                case "defaultChecked":
                  j = q;
                  break;
                case "value":
                  u = q;
                  break;
                case "defaultValue":
                  b = q;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (q != null)
                    throw Error(l(137, t));
                  break;
                default:
                  Ze(e, t, r, q, a, null);
              }
          }
        qd(
          e,
          u,
          b,
          x,
          j,
          h,
          c,
          !1
        );
        return;
      case "select":
        we("invalid", e), r = h = u = null;
        for (c in a)
          if (a.hasOwnProperty(c) && (b = a[c], b != null))
            switch (c) {
              case "value":
                u = b;
                break;
              case "defaultValue":
                h = b;
                break;
              case "multiple":
                r = b;
              default:
                Ze(e, t, c, b, a, null);
            }
        t = u, a = h, e.multiple = !!r, t != null ? ni(e, !!r, t, !1) : a != null && ni(e, !!r, a, !0);
        return;
      case "textarea":
        we("invalid", e), u = c = r = null;
        for (h in a)
          if (a.hasOwnProperty(h) && (b = a[h], b != null))
            switch (h) {
              case "value":
                r = b;
                break;
              case "defaultValue":
                c = b;
                break;
              case "children":
                u = b;
                break;
              case "dangerouslySetInnerHTML":
                if (b != null) throw Error(l(91));
                break;
              default:
                Ze(e, t, h, b, a, null);
            }
        Xd(e, r, c, u);
        return;
      case "option":
        for (x in a)
          a.hasOwnProperty(x) && (r = a[x], r != null) && (x === "selected" ? e.selected = r && typeof r != "function" && typeof r != "symbol" : Ze(e, t, x, r, a, null));
        return;
      case "dialog":
        we("beforetoggle", e), we("toggle", e), we("cancel", e), we("close", e);
        break;
      case "iframe":
      case "object":
        we("load", e);
        break;
      case "video":
      case "audio":
        for (r = 0; r < Mo.length; r++)
          we(Mo[r], e);
        break;
      case "image":
        we("error", e), we("load", e);
        break;
      case "details":
        we("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        we("error", e), we("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (j in a)
          if (a.hasOwnProperty(j) && (r = a[j], r != null))
            switch (j) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(l(137, t));
              default:
                Ze(e, t, j, r, a, null);
            }
        return;
      default:
        if (vs(t)) {
          for (q in a)
            a.hasOwnProperty(q) && (r = a[q], r !== void 0 && iu(
              e,
              t,
              q,
              r,
              a,
              void 0
            ));
          return;
        }
    }
    for (b in a)
      a.hasOwnProperty(b) && (r = a[b], r != null && Ze(e, t, b, r, a, null));
  }
  function Fy(e, t, a, r) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var c = null, u = null, h = null, b = null, x = null, j = null, q = null;
        for (H in a) {
          var P = a[H];
          if (a.hasOwnProperty(H) && P != null)
            switch (H) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                x = P;
              default:
                r.hasOwnProperty(H) || Ze(e, t, H, null, r, P);
            }
        }
        for (var U in r) {
          var H = r[U];
          if (P = a[U], r.hasOwnProperty(U) && (H != null || P != null))
            switch (U) {
              case "type":
                u = H;
                break;
              case "name":
                c = H;
                break;
              case "checked":
                j = H;
                break;
              case "defaultChecked":
                q = H;
                break;
              case "value":
                h = H;
                break;
              case "defaultValue":
                b = H;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (H != null)
                  throw Error(l(137, t));
                break;
              default:
                H !== P && Ze(
                  e,
                  t,
                  U,
                  H,
                  r,
                  P
                );
            }
        }
        gs(
          e,
          h,
          b,
          x,
          j,
          q,
          u,
          c
        );
        return;
      case "select":
        H = h = b = U = null;
        for (u in a)
          if (x = a[u], a.hasOwnProperty(u) && x != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                H = x;
              default:
                r.hasOwnProperty(u) || Ze(
                  e,
                  t,
                  u,
                  null,
                  r,
                  x
                );
            }
        for (c in r)
          if (u = r[c], x = a[c], r.hasOwnProperty(c) && (u != null || x != null))
            switch (c) {
              case "value":
                U = u;
                break;
              case "defaultValue":
                b = u;
                break;
              case "multiple":
                h = u;
              default:
                u !== x && Ze(
                  e,
                  t,
                  c,
                  u,
                  r,
                  x
                );
            }
        t = b, a = h, r = H, U != null ? ni(e, !!a, U, !1) : !!r != !!a && (t != null ? ni(e, !!a, t, !0) : ni(e, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        H = U = null;
        for (b in a)
          if (c = a[b], a.hasOwnProperty(b) && c != null && !r.hasOwnProperty(b))
            switch (b) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ze(e, t, b, null, r, c);
            }
        for (h in r)
          if (c = r[h], u = a[h], r.hasOwnProperty(h) && (c != null || u != null))
            switch (h) {
              case "value":
                U = c;
                break;
              case "defaultValue":
                H = c;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (c != null) throw Error(l(91));
                break;
              default:
                c !== u && Ze(e, t, h, c, r, u);
            }
        Vd(e, U, H);
        return;
      case "option":
        for (var oe in a)
          U = a[oe], a.hasOwnProperty(oe) && U != null && !r.hasOwnProperty(oe) && (oe === "selected" ? e.selected = !1 : Ze(
            e,
            t,
            oe,
            null,
            r,
            U
          ));
        for (x in r)
          U = r[x], H = a[x], r.hasOwnProperty(x) && U !== H && (U != null || H != null) && (x === "selected" ? e.selected = U && typeof U != "function" && typeof U != "symbol" : Ze(
            e,
            t,
            x,
            U,
            r,
            H
          ));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var he in a)
          U = a[he], a.hasOwnProperty(he) && U != null && !r.hasOwnProperty(he) && Ze(e, t, he, null, r, U);
        for (j in r)
          if (U = r[j], H = a[j], r.hasOwnProperty(j) && U !== H && (U != null || H != null))
            switch (j) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (U != null)
                  throw Error(l(137, t));
                break;
              default:
                Ze(
                  e,
                  t,
                  j,
                  U,
                  r,
                  H
                );
            }
        return;
      default:
        if (vs(t)) {
          for (var He in a)
            U = a[He], a.hasOwnProperty(He) && U !== void 0 && !r.hasOwnProperty(He) && iu(
              e,
              t,
              He,
              void 0,
              r,
              U
            );
          for (q in r)
            U = r[q], H = a[q], !r.hasOwnProperty(q) || U === H || U === void 0 && H === void 0 || iu(
              e,
              t,
              q,
              U,
              r,
              H
            );
          return;
        }
    }
    for (var C in a)
      U = a[C], a.hasOwnProperty(C) && U != null && !r.hasOwnProperty(C) && Ze(e, t, C, null, r, U);
    for (P in r)
      U = r[P], H = a[P], !r.hasOwnProperty(P) || U === H || U == null && H == null || Ze(e, t, P, U, r, H);
  }
  function F_(e) {
    switch (e) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function Qy() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, a = performance.getEntriesByType("resource"), r = 0; r < a.length; r++) {
        var c = a[r], u = c.transferSize, h = c.initiatorType, b = c.duration;
        if (u && b && F_(h)) {
          for (h = 0, b = c.responseEnd, r += 1; r < a.length; r++) {
            var x = a[r], j = x.startTime;
            if (j > b) break;
            var q = x.transferSize, P = x.initiatorType;
            q && F_(P) && (x = x.responseEnd, h += q * (x < b ? 1 : (b - j) / (x - j)));
          }
          if (--r, t += 8 * (u + h) / (c.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var ou = null, ru = null;
  function cl(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Q_(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function J_(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function lu(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var su = null;
  function Jy() {
    var e = window.event;
    return e && e.type === "popstate" ? e === su ? !1 : (su = e, !0) : (su = null, !1);
  }
  var W_ = typeof setTimeout == "function" ? setTimeout : void 0, Wy = typeof clearTimeout == "function" ? clearTimeout : void 0, ep = typeof Promise == "function" ? Promise : void 0, eb = typeof queueMicrotask == "function" ? queueMicrotask : typeof ep < "u" ? function(e) {
    return ep.resolve(null).then(e).catch(tb);
  } : W_;
  function tb(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function fa(e) {
    return e === "head";
  }
  function tp(e, t) {
    var a = t, r = 0;
    do {
      var c = a.nextSibling;
      if (e.removeChild(a), c && c.nodeType === 8)
        if (a = c.data, a === "/$" || a === "/&") {
          if (r === 0) {
            e.removeChild(c), ji(t);
            return;
          }
          r--;
        } else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&")
          r++;
        else if (a === "html")
          Ro(e.ownerDocument.documentElement);
        else if (a === "head") {
          a = e.ownerDocument.head, Ro(a);
          for (var u = a.firstChild; u; ) {
            var h = u.nextSibling, b = u.nodeName;
            u[Fi] || b === "SCRIPT" || b === "STYLE" || b === "LINK" && u.rel.toLowerCase() === "stylesheet" || a.removeChild(u), u = h;
          }
        } else
          a === "body" && Ro(e.ownerDocument.body);
      a = c;
    } while (a);
    ji(t);
  }
  function np(e, t) {
    var a = e;
    e = 0;
    do {
      var r = a.nextSibling;
      if (a.nodeType === 1 ? t ? (a._stashedDisplay = a.style.display, a.style.display = "none") : (a.style.display = a._stashedDisplay || "", a.getAttribute("style") === "" && a.removeAttribute("style")) : a.nodeType === 3 && (t ? (a._stashedText = a.nodeValue, a.nodeValue = "") : a.nodeValue = a._stashedText || ""), r && r.nodeType === 8)
        if (a = r.data, a === "/$") {
          if (e === 0) break;
          e--;
        } else
          a !== "$" && a !== "$?" && a !== "$~" && a !== "$!" || e++;
      a = r;
    } while (a);
  }
  function cu(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (t = t.nextSibling, a.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          cu(a), _s(a);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (a.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(a);
    }
  }
  function nb(e, t, a, r) {
    for (; e.nodeType === 1; ) {
      var c = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (r) {
        if (!e[Fi])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (u = e.getAttribute("rel"), u === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (u !== c.rel || e.getAttribute("href") !== (c.href == null || c.href === "" ? null : c.href) || e.getAttribute("crossorigin") !== (c.crossOrigin == null ? null : c.crossOrigin) || e.getAttribute("title") !== (c.title == null ? null : c.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (u = e.getAttribute("src"), (u !== (c.src == null ? null : c.src) || e.getAttribute("type") !== (c.type == null ? null : c.type) || e.getAttribute("crossorigin") !== (c.crossOrigin == null ? null : c.crossOrigin)) && u && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var u = c.name == null ? null : "" + c.name;
        if (c.type === "hidden" && e.getAttribute("name") === u)
          return e;
      } else return e;
      if (e = nn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function ab(e, t, a) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = nn(e.nextSibling), e === null)) return null;
    return e;
  }
  function ap(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = nn(e.nextSibling), e === null)) return null;
    return e;
  }
  function uu(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function du(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function ib(e, t) {
    var a = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || a.readyState !== "loading")
      t();
    else {
      var r = function() {
        t(), a.removeEventListener("DOMContentLoaded", r);
      };
      a.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
    }
  }
  function nn(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return e;
  }
  var mu = null;
  function ip(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === "/$" || a === "/&") {
          if (t === 0)
            return nn(e.nextSibling);
          t--;
        } else
          a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function op(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
          if (t === 0) return e;
          t--;
        } else a !== "/$" && a !== "/&" || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function rp(e, t, a) {
    switch (t = cl(a), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(l(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(l(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(l(454));
        return e;
      default:
        throw Error(l(451));
    }
  }
  function Ro(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    _s(e);
  }
  var an = /* @__PURE__ */ new Map(), lp = /* @__PURE__ */ new Set();
  function ul(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Bn = J.d;
  J.d = {
    f: ob,
    r: rb,
    D: lb,
    C: sb,
    L: cb,
    m: ub,
    X: mb,
    S: db,
    M: fb
  };
  function ob() {
    var e = Bn.f(), t = tl();
    return e || t;
  }
  function rb(e) {
    var t = Wa(e);
    t !== null && t.tag === 5 && t.type === "form" ? xf(t) : Bn.r(e);
  }
  var Mi = typeof document > "u" ? null : document;
  function sp(e, t, a) {
    var r = Mi;
    if (r && typeof t == "string" && t) {
      var c = It(t);
      c = 'link[rel="' + e + '"][href="' + c + '"]', typeof a == "string" && (c += '[crossorigin="' + a + '"]'), lp.has(c) || (lp.add(c), e = { rel: e, crossOrigin: a, href: t }, r.querySelector(c) === null && (t = r.createElement("link"), vt(t, "link", e), mt(t), r.head.appendChild(t)));
    }
  }
  function lb(e) {
    Bn.D(e), sp("dns-prefetch", e, null);
  }
  function sb(e, t) {
    Bn.C(e, t), sp("preconnect", e, t);
  }
  function cb(e, t, a) {
    Bn.L(e, t, a);
    var r = Mi;
    if (r && e && t) {
      var c = 'link[rel="preload"][as="' + It(t) + '"]';
      t === "image" && a && a.imageSrcSet ? (c += '[imagesrcset="' + It(
        a.imageSrcSet
      ) + '"]', typeof a.imageSizes == "string" && (c += '[imagesizes="' + It(
        a.imageSizes
      ) + '"]')) : c += '[href="' + It(e) + '"]';
      var u = c;
      switch (t) {
        case "style":
          u = Oi(e);
          break;
        case "script":
          u = Ri(e);
      }
      an.has(u) || (e = y(
        {
          rel: "preload",
          href: t === "image" && a && a.imageSrcSet ? void 0 : e,
          as: t
        },
        a
      ), an.set(u, e), r.querySelector(c) !== null || t === "style" && r.querySelector(jo(u)) || t === "script" && r.querySelector(Do(u)) || (t = r.createElement("link"), vt(t, "link", e), mt(t), r.head.appendChild(t)));
    }
  }
  function ub(e, t) {
    Bn.m(e, t);
    var a = Mi;
    if (a && e) {
      var r = t && typeof t.as == "string" ? t.as : "script", c = 'link[rel="modulepreload"][as="' + It(r) + '"][href="' + It(e) + '"]', u = c;
      switch (r) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Ri(e);
      }
      if (!an.has(u) && (e = y({ rel: "modulepreload", href: e }, t), an.set(u, e), a.querySelector(c) === null)) {
        switch (r) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(Do(u)))
              return;
        }
        r = a.createElement("link"), vt(r, "link", e), mt(r), a.head.appendChild(r);
      }
    }
  }
  function db(e, t, a) {
    Bn.S(e, t, a);
    var r = Mi;
    if (r && e) {
      var c = ei(r).hoistableStyles, u = Oi(e);
      t = t || "default";
      var h = c.get(u);
      if (!h) {
        var b = { loading: 0, preload: null };
        if (h = r.querySelector(
          jo(u)
        ))
          b.loading = 5;
        else {
          e = y(
            { rel: "stylesheet", href: e, "data-precedence": t },
            a
          ), (a = an.get(u)) && fu(e, a);
          var x = h = r.createElement("link");
          mt(x), vt(x, "link", e), x._p = new Promise(function(j, q) {
            x.onload = j, x.onerror = q;
          }), x.addEventListener("load", function() {
            b.loading |= 1;
          }), x.addEventListener("error", function() {
            b.loading |= 2;
          }), b.loading |= 4, dl(h, t, r);
        }
        h = {
          type: "stylesheet",
          instance: h,
          count: 1,
          state: b
        }, c.set(u, h);
      }
    }
  }
  function mb(e, t) {
    Bn.X(e, t);
    var a = Mi;
    if (a && e) {
      var r = ei(a).hoistableScripts, c = Ri(e), u = r.get(c);
      u || (u = a.querySelector(Do(c)), u || (e = y({ src: e, async: !0 }, t), (t = an.get(c)) && _u(e, t), u = a.createElement("script"), mt(u), vt(u, "link", e), a.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, r.set(c, u));
    }
  }
  function fb(e, t) {
    Bn.M(e, t);
    var a = Mi;
    if (a && e) {
      var r = ei(a).hoistableScripts, c = Ri(e), u = r.get(c);
      u || (u = a.querySelector(Do(c)), u || (e = y({ src: e, async: !0, type: "module" }, t), (t = an.get(c)) && _u(e, t), u = a.createElement("script"), mt(u), vt(u, "link", e), a.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, r.set(c, u));
    }
  }
  function cp(e, t, a, r) {
    var c = (c = ge.current) ? ul(c) : null;
    if (!c) throw Error(l(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string" ? (t = Oi(a.href), a = ei(
          c
        ).hoistableStyles, r = a.get(t), r || (r = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, a.set(t, r)), r) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
          e = Oi(a.href);
          var u = ei(
            c
          ).hoistableStyles, h = u.get(e);
          if (h || (c = c.ownerDocument || c, h = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(e, h), (u = c.querySelector(
            jo(e)
          )) && !u._p && (h.instance = u, h.state.loading = 5), an.has(e) || (a = {
            rel: "preload",
            as: "style",
            href: a.href,
            crossOrigin: a.crossOrigin,
            integrity: a.integrity,
            media: a.media,
            hrefLang: a.hrefLang,
            referrerPolicy: a.referrerPolicy
          }, an.set(e, a), u || _b(
            c,
            e,
            a,
            h.state
          ))), t && r === null)
            throw Error(l(528, ""));
          return h;
        }
        if (t && r !== null)
          throw Error(l(529, ""));
        return null;
      case "script":
        return t = a.async, a = a.src, typeof a == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Ri(a), a = ei(
          c
        ).hoistableScripts, r = a.get(t), r || (r = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, a.set(t, r)), r) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(l(444, e));
    }
  }
  function Oi(e) {
    return 'href="' + It(e) + '"';
  }
  function jo(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function up(e) {
    return y({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function _b(e, t, a, r) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
      return r.loading |= 1;
    }), t.addEventListener("error", function() {
      return r.loading |= 2;
    }), vt(t, "link", a), mt(t), e.head.appendChild(t));
  }
  function Ri(e) {
    return '[src="' + It(e) + '"]';
  }
  function Do(e) {
    return "script[async]" + e;
  }
  function dp(e, t, a) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var r = e.querySelector(
            'style[data-href~="' + It(a.href) + '"]'
          );
          if (r)
            return t.instance = r, mt(r), r;
          var c = y({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null
          });
          return r = (e.ownerDocument || e).createElement(
            "style"
          ), mt(r), vt(r, "style", c), dl(r, a.precedence, e), t.instance = r;
        case "stylesheet":
          c = Oi(a.href);
          var u = e.querySelector(
            jo(c)
          );
          if (u)
            return t.state.loading |= 4, t.instance = u, mt(u), u;
          r = up(a), (c = an.get(c)) && fu(r, c), u = (e.ownerDocument || e).createElement("link"), mt(u);
          var h = u;
          return h._p = new Promise(function(b, x) {
            h.onload = b, h.onerror = x;
          }), vt(u, "link", r), t.state.loading |= 4, dl(u, a.precedence, e), t.instance = u;
        case "script":
          return u = Ri(a.src), (c = e.querySelector(
            Do(u)
          )) ? (t.instance = c, mt(c), c) : (r = a, (c = an.get(u)) && (r = y({}, a), _u(r, c)), e = e.ownerDocument || e, c = e.createElement("script"), mt(c), vt(c, "link", r), e.head.appendChild(c), t.instance = c);
        case "void":
          return null;
        default:
          throw Error(l(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (r = t.instance, t.state.loading |= 4, dl(r, a.precedence, e));
    return t.instance;
  }
  function dl(e, t, a) {
    for (var r = a.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), c = r.length ? r[r.length - 1] : null, u = c, h = 0; h < r.length; h++) {
      var b = r[h];
      if (b.dataset.precedence === t) u = b;
      else if (u !== c) break;
    }
    u ? u.parentNode.insertBefore(e, u.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(e, t.firstChild));
  }
  function fu(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function _u(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var ml = null;
  function mp(e, t, a) {
    if (ml === null) {
      var r = /* @__PURE__ */ new Map(), c = ml = /* @__PURE__ */ new Map();
      c.set(a, r);
    } else
      c = ml, r = c.get(a), r || (r = /* @__PURE__ */ new Map(), c.set(a, r));
    if (r.has(e)) return r;
    for (r.set(e, null), a = a.getElementsByTagName(e), c = 0; c < a.length; c++) {
      var u = a[c];
      if (!(u[Fi] || u[_t] || e === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var h = u.getAttribute(t) || "";
        h = e + h;
        var b = r.get(h);
        b ? b.push(u) : r.set(h, [u]);
      }
    }
    return r;
  }
  function fp(e, t, a) {
    e = e.ownerDocument || e, e.head.insertBefore(
      a,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function pb(e, t, a) {
    if (a === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
          break;
        return !0;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
          break;
        return t.rel === "stylesheet" ? (e = t.disabled, typeof t.precedence == "string" && e == null) : !0;
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function _p(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function gb(e, t, a, r) {
    if (a.type === "stylesheet" && (typeof r.media != "string" || matchMedia(r.media).matches !== !1) && (a.state.loading & 4) === 0) {
      if (a.instance === null) {
        var c = Oi(r.href), u = t.querySelector(
          jo(c)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = fl.bind(e), t.then(e, e)), a.state.loading |= 4, a.instance = u, mt(u);
          return;
        }
        u = t.ownerDocument || t, r = up(r), (c = an.get(c)) && fu(r, c), u = u.createElement("link"), mt(u);
        var h = u;
        h._p = new Promise(function(b, x) {
          h.onload = b, h.onerror = x;
        }), vt(u, "link", r), a.instance = u;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(a, t), (t = a.state.preload) && (a.state.loading & 3) === 0 && (e.count++, a = fl.bind(e), t.addEventListener("load", a), t.addEventListener("error", a));
    }
  }
  var pu = 0;
  function hb(e, t) {
    return e.stylesheets && e.count === 0 && pl(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(a) {
      var r = setTimeout(function() {
        if (e.stylesheets && pl(e, e.stylesheets), e.unsuspend) {
          var u = e.unsuspend;
          e.unsuspend = null, u();
        }
      }, 6e4 + t);
      0 < e.imgBytes && pu === 0 && (pu = 62500 * Qy());
      var c = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && pl(e, e.stylesheets), e.unsuspend)) {
            var u = e.unsuspend;
            e.unsuspend = null, u();
          }
        },
        (e.imgBytes > pu ? 50 : 800) + t
      );
      return e.unsuspend = a, function() {
        e.unsuspend = null, clearTimeout(r), clearTimeout(c);
      };
    } : null;
  }
  function fl() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) pl(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var _l = null;
  function pl(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, _l = /* @__PURE__ */ new Map(), t.forEach(vb, e), _l = null, fl.call(e));
  }
  function vb(e, t) {
    if (!(t.state.loading & 4)) {
      var a = _l.get(e);
      if (a) var r = a.get(null);
      else {
        a = /* @__PURE__ */ new Map(), _l.set(e, a);
        for (var c = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < c.length; u++) {
          var h = c[u];
          (h.nodeName === "LINK" || h.getAttribute("media") !== "not all") && (a.set(h.dataset.precedence, h), r = h);
        }
        r && a.set(null, r);
      }
      c = t.instance, h = c.getAttribute("data-precedence"), u = a.get(h) || r, u === r && a.set(null, c), a.set(h, c), this.count++, r = fl.bind(this), c.addEventListener("load", r), c.addEventListener("error", r), u ? u.parentNode.insertBefore(c, u.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(c, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Lo = {
    $$typeof: D,
    Provider: null,
    Consumer: null,
    _currentValue: ne,
    _currentValue2: ne,
    _threadCount: 0
  };
  function yb(e, t, a, r, c, u, h, b, x) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = us(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = us(0), this.hiddenUpdates = us(null), this.identifierPrefix = r, this.onUncaughtError = c, this.onCaughtError = u, this.onRecoverableError = h, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = x, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function pp(e, t, a, r, c, u, h, b, x, j, q, P) {
    return e = new yb(
      e,
      t,
      a,
      h,
      x,
      j,
      q,
      P,
      b
    ), t = 1, u === !0 && (t |= 24), u = Ht(3, null, null, t), e.current = u, u.stateNode = e, t = Ps(), t.refCount++, e.pooledCache = t, t.refCount++, u.memoizedState = {
      element: r,
      isDehydrated: a,
      cache: t
    }, Js(u), e;
  }
  function gp(e) {
    return e ? (e = ui, e) : ui;
  }
  function hp(e, t, a, r, c, u) {
    c = gp(c), r.context === null ? r.context = c : r.pendingContext = c, r = na(t), r.payload = { element: a }, u = u === void 0 ? null : u, u !== null && (r.callback = u), a = aa(e, r, t), a !== null && (Rt(a, e, t), _o(a, e, t));
  }
  function vp(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function gu(e, t) {
    vp(e, t), (e = e.alternate) && vp(e, t);
  }
  function yp(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Oa(e, 67108864);
      t !== null && Rt(t, e, 67108864), gu(e, 67108864);
    }
  }
  function bp(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Vt();
      t = ds(t);
      var a = Oa(e, t);
      a !== null && Rt(a, e, t), gu(e, t);
    }
  }
  var gl = !0;
  function bb(e, t, a, r) {
    var c = T.T;
    T.T = null;
    var u = J.p;
    try {
      J.p = 2, hu(e, t, a, r);
    } finally {
      J.p = u, T.T = c;
    }
  }
  function Sb(e, t, a, r) {
    var c = T.T;
    T.T = null;
    var u = J.p;
    try {
      J.p = 8, hu(e, t, a, r);
    } finally {
      J.p = u, T.T = c;
    }
  }
  function hu(e, t, a, r) {
    if (gl) {
      var c = vu(r);
      if (c === null)
        au(
          e,
          t,
          r,
          hl,
          a
        ), kp(e, r);
      else if (wb(
        c,
        e,
        t,
        a,
        r
      ))
        r.stopPropagation();
      else if (kp(e, r), t & 4 && -1 < kb.indexOf(e)) {
        for (; c !== null; ) {
          var u = Wa(c);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var h = za(u.pendingLanes);
                  if (h !== 0) {
                    var b = u;
                    for (b.pendingLanes |= 2, b.entangledLanes |= 2; h; ) {
                      var x = 1 << 31 - Yt(h);
                      b.entanglements[1] |= x, h &= ~x;
                    }
                    kn(u), (Re & 6) === 0 && (Wr = kt() + 500, Co(0));
                  }
                }
                break;
              case 31:
              case 13:
                b = Oa(u, 2), b !== null && Rt(b, u, 2), tl(), gu(u, 2);
            }
          if (u = vu(r), u === null && au(
            e,
            t,
            r,
            hl,
            a
          ), u === c) break;
          c = u;
        }
        c !== null && r.stopPropagation();
      } else
        au(
          e,
          t,
          r,
          null,
          a
        );
    }
  }
  function vu(e) {
    return e = bs(e), yu(e);
  }
  var hl = null;
  function yu(e) {
    if (hl = null, e = Ja(e), e !== null) {
      var t = d(e);
      if (t === null) e = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (e = m(t), e !== null) return e;
          e = null;
        } else if (a === 31) {
          if (e = f(t), e !== null) return e;
          e = null;
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return hl = e, null;
  }
  function Sp(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (cs()) {
          case or:
            return 2;
          case $i:
            return 8;
          case Fa:
          case rr:
            return 32;
          case Lt:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var bu = !1, _a = null, pa = null, ga = null, Uo = /* @__PURE__ */ new Map(), Yo = /* @__PURE__ */ new Map(), ha = [], kb = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function kp(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        _a = null;
        break;
      case "dragenter":
      case "dragleave":
        pa = null;
        break;
      case "mouseover":
      case "mouseout":
        ga = null;
        break;
      case "pointerover":
      case "pointerout":
        Uo.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Yo.delete(t.pointerId);
    }
  }
  function Zo(e, t, a, r, c, u) {
    return e === null || e.nativeEvent !== u ? (e = {
      blockedOn: t,
      domEventName: a,
      eventSystemFlags: r,
      nativeEvent: u,
      targetContainers: [c]
    }, t !== null && (t = Wa(t), t !== null && yp(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, c !== null && t.indexOf(c) === -1 && t.push(c), e);
  }
  function wb(e, t, a, r, c) {
    switch (t) {
      case "focusin":
        return _a = Zo(
          _a,
          e,
          t,
          a,
          r,
          c
        ), !0;
      case "dragenter":
        return pa = Zo(
          pa,
          e,
          t,
          a,
          r,
          c
        ), !0;
      case "mouseover":
        return ga = Zo(
          ga,
          e,
          t,
          a,
          r,
          c
        ), !0;
      case "pointerover":
        var u = c.pointerId;
        return Uo.set(
          u,
          Zo(
            Uo.get(u) || null,
            e,
            t,
            a,
            r,
            c
          )
        ), !0;
      case "gotpointercapture":
        return u = c.pointerId, Yo.set(
          u,
          Zo(
            Yo.get(u) || null,
            e,
            t,
            a,
            r,
            c
          )
        ), !0;
    }
    return !1;
  }
  function wp(e) {
    var t = Ja(e.target);
    if (t !== null) {
      var a = d(t);
      if (a !== null) {
        if (t = a.tag, t === 13) {
          if (t = m(a), t !== null) {
            e.blockedOn = t, Ld(e.priority, function() {
              bp(a);
            });
            return;
          }
        } else if (t === 31) {
          if (t = f(a), t !== null) {
            e.blockedOn = t, Ld(e.priority, function() {
              bp(a);
            });
            return;
          }
        } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function vl(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = vu(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var r = new a.constructor(
          a.type,
          a
        );
        ys = r, a.target.dispatchEvent(r), ys = null;
      } else
        return t = Wa(a), t !== null && yp(t), e.blockedOn = a, !1;
      t.shift();
    }
    return !0;
  }
  function xp(e, t, a) {
    vl(e) && a.delete(t);
  }
  function xb() {
    bu = !1, _a !== null && vl(_a) && (_a = null), pa !== null && vl(pa) && (pa = null), ga !== null && vl(ga) && (ga = null), Uo.forEach(xp), Yo.forEach(xp);
  }
  function yl(e, t) {
    e.blockedOn === t && (e.blockedOn = null, bu || (bu = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      xb
    )));
  }
  var bl = null;
  function Ep(e) {
    bl !== e && (bl = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        bl === e && (bl = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t], r = e[t + 1], c = e[t + 2];
          if (typeof r != "function") {
            if (yu(r || a) === null)
              continue;
            break;
          }
          var u = Wa(a);
          u !== null && (e.splice(t, 3), t -= 3, vc(
            u,
            {
              pending: !0,
              data: c,
              method: a.method,
              action: r
            },
            r,
            c
          ));
        }
      }
    ));
  }
  function ji(e) {
    function t(x) {
      return yl(x, e);
    }
    _a !== null && yl(_a, e), pa !== null && yl(pa, e), ga !== null && yl(ga, e), Uo.forEach(t), Yo.forEach(t);
    for (var a = 0; a < ha.length; a++) {
      var r = ha[a];
      r.blockedOn === e && (r.blockedOn = null);
    }
    for (; 0 < ha.length && (a = ha[0], a.blockedOn === null); )
      wp(a), a.blockedOn === null && ha.shift();
    if (a = (e.ownerDocument || e).$$reactFormReplay, a != null)
      for (r = 0; r < a.length; r += 3) {
        var c = a[r], u = a[r + 1], h = c[zt] || null;
        if (typeof u == "function")
          h || Ep(a);
        else if (h) {
          var b = null;
          if (u && u.hasAttribute("formAction")) {
            if (c = u, h = u[zt] || null)
              b = h.formAction;
            else if (yu(c) !== null) continue;
          } else b = h.action;
          typeof b == "function" ? a[r + 1] = b : (a.splice(r, 3), r -= 3), Ep(a);
        }
      }
  }
  function Tp() {
    function e(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(h) {
            return c = h;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      c !== null && (c(), c = null), r || setTimeout(a, 20);
    }
    function a() {
      if (!r && !navigation.transition) {
        var u = navigation.currentEntry;
        u && u.url != null && navigation.navigate(u.url, {
          state: u.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var r = !1, c = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(a, 100), function() {
        r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), c !== null && (c(), c = null);
      };
    }
  }
  function Su(e) {
    this._internalRoot = e;
  }
  Sl.prototype.render = Su.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(l(409));
    var a = t.current, r = Vt();
    hp(a, r, e, t, null, null);
  }, Sl.prototype.unmount = Su.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      hp(e.current, 2, null, e, null, null), tl(), t[Qa] = null;
    }
  };
  function Sl(e) {
    this._internalRoot = e;
  }
  Sl.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Dd();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < ha.length && t !== 0 && t < ha[a].priority; a++) ;
      ha.splice(a, 0, e), a === 0 && wp(e);
    }
  };
  var zp = i.version;
  if (zp !== "19.2.3")
    throw Error(
      l(
        527,
        zp,
        "19.2.3"
      )
    );
  J.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(l(188)) : (e = Object.keys(e).join(","), Error(l(268, e)));
    return e = g(t), e = e !== null ? v(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var Eb = {
    bundleType: 0,
    version: "19.2.3",
    rendererPackageName: "react-dom",
    currentDispatcherRef: T,
    reconcilerVersion: "19.2.3"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var kl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!kl.isDisabled && kl.supportsFiber)
      try {
        $n = kl.inject(
          Eb
        ), ut = kl;
      } catch {
      }
  }
  return Bo.createRoot = function(e, t) {
    if (!s(e)) throw Error(l(299));
    var a = !1, r = "", c = jf, u = Df, h = Lf;
    return t != null && (t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (c = t.onUncaughtError), t.onCaughtError !== void 0 && (u = t.onCaughtError), t.onRecoverableError !== void 0 && (h = t.onRecoverableError)), t = pp(
      e,
      1,
      !1,
      null,
      null,
      a,
      r,
      null,
      c,
      u,
      h,
      Tp
    ), e[Qa] = t.current, nu(e), new Su(t);
  }, Bo.hydrateRoot = function(e, t, a) {
    if (!s(e)) throw Error(l(299));
    var r = !1, c = "", u = jf, h = Df, b = Lf, x = null;
    return a != null && (a.unstable_strictMode === !0 && (r = !0), a.identifierPrefix !== void 0 && (c = a.identifierPrefix), a.onUncaughtError !== void 0 && (u = a.onUncaughtError), a.onCaughtError !== void 0 && (h = a.onCaughtError), a.onRecoverableError !== void 0 && (b = a.onRecoverableError), a.formState !== void 0 && (x = a.formState)), t = pp(
      e,
      1,
      !0,
      t,
      a ?? null,
      r,
      c,
      x,
      u,
      h,
      b,
      Tp
    ), t.context = gp(null), a = t.current, r = Vt(), r = ds(r), c = na(r), c.callback = null, aa(a, c, r), a = r, t.current.lanes = a, Ii(t, a), kn(t), e[Qa] = t.current, nu(e), new Sl(t);
  }, Bo.version = "19.2.3", Bo;
}
var Up;
function Db() {
  if (Up) return xu.exports;
  Up = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (i) {
        console.error(i);
      }
  }
  return n(), xu.exports = jb(), xu.exports;
}
var Lb = Db();
const Ub = /* @__PURE__ */ Lg(Lb);
const Ug = (...n) => n.filter((i, o, l) => !!i && i.trim() !== "" && l.indexOf(i) === o).join(" ").trim();
const Yb = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const Zb = (n) => n.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (i, o, l) => l ? l.toUpperCase() : o.toLowerCase()
);
const Yp = (n) => {
  const i = Zb(n);
  return i.charAt(0).toUpperCase() + i.slice(1);
};
var Hb = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const Bb = (n) => {
  for (const i in n)
    if (i.startsWith("aria-") || i === "role" || i === "title")
      return !0;
  return !1;
};
const Gb = A.forwardRef(
  ({
    color: n = "currentColor",
    size: i = 24,
    strokeWidth: o = 2,
    absoluteStrokeWidth: l,
    className: s = "",
    children: d,
    iconNode: m,
    ...f
  }, p) => A.createElement(
    "svg",
    {
      ref: p,
      ...Hb,
      width: i,
      height: i,
      stroke: n,
      strokeWidth: l ? Number(o) * 24 / Number(i) : o,
      className: Ug("lucide", s),
      ...!d && !Bb(f) && { "aria-hidden": "true" },
      ...f
    },
    [
      ...m.map(([g, v]) => A.createElement(g, v)),
      ...Array.isArray(d) ? d : [d]
    ]
  )
);
const ce = (n, i) => {
  const o = A.forwardRef(
    ({ className: l, ...s }, d) => A.createElement(Gb, {
      ref: d,
      iconNode: i,
      className: Ug(
        `lucide-${Yb(Yp(n))}`,
        `lucide-${n}`,
        l
      ),
      ...s
    })
  );
  return o.displayName = Yp(n), o;
};
const Kb = [
  [
    "path",
    {
      d: "M11 9a1 1 0 0 0 1-1V5.061a1 1 0 0 1 1.811-.75l6.836 6.836a1.207 1.207 0 0 1 0 1.707l-6.836 6.835a1 1 0 0 1-1.811-.75V16a1 1 0 0 0-1-1H9a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z",
      key: "67vhrh"
    }
  ],
  ["path", { d: "M4 9v6", key: "bns7oa" }]
], qb = ce("arrow-big-right-dash", Kb);
const Vb = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
], Xb = ce("arrow-left", Vb);
const $b = [
  ["path", { d: "m11 7-3 5h4l-3 5", key: "b4a64w" }],
  ["path", { d: "M14.856 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.935", key: "lre1cr" }],
  ["path", { d: "M22 14v-4", key: "14q9d5" }],
  ["path", { d: "M5.14 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.936", key: "13q5k0" }]
];
ce("battery-charging", $b);
const Pb = [
  ["path", { d: "M10 10v4", key: "1mb2ec" }],
  ["path", { d: "M14 10v4", key: "1nt88p" }],
  ["path", { d: "M22 14v-4", key: "14q9d5" }],
  ["path", { d: "M6 10v4", key: "1n77qd" }],
  ["rect", { x: "2", y: "6", width: "16", height: "12", rx: "2", key: "13zb55" }]
], Ib = ce("battery-full", Pb);
const Fb = [
  ["path", { d: "M22 14v-4", key: "14q9d5" }],
  ["path", { d: "M6 14v-4", key: "14a6bd" }],
  ["rect", { x: "2", y: "6", width: "16", height: "12", rx: "2", key: "13zb55" }]
], Qb = ce("battery-low", Fb);
const Jb = [
  ["path", { d: "M10 14v-4", key: "suye4c" }],
  ["path", { d: "M22 14v-4", key: "14q9d5" }],
  ["path", { d: "M6 14v-4", key: "14a6bd" }],
  ["rect", { x: "2", y: "6", width: "16", height: "12", rx: "2", key: "13zb55" }]
], Wb = ce("battery-medium", Jb);
const e0 = [
  ["path", { d: "M 22 14 L 22 10", key: "nqc4tb" }],
  ["rect", { x: "2", y: "6", width: "16", height: "12", rx: "2", key: "13zb55" }]
], t0 = ce("battery", e0);
const n0 = [
  [
    "path",
    {
      d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
      key: "oz39mx"
    }
  ]
];
ce("bookmark", n0);
const a0 = [
  ["path", { d: "M12 18V5", key: "adv99a" }],
  ["path", { d: "M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4", key: "1e3is1" }],
  ["path", { d: "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5", key: "1gqd8o" }],
  ["path", { d: "M17.997 5.125a4 4 0 0 1 2.526 5.77", key: "iwvgf7" }],
  ["path", { d: "M18 18a4 4 0 0 0 2-7.464", key: "efp6ie" }],
  ["path", { d: "M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517", key: "1gq6am" }],
  ["path", { d: "M6 18a4 4 0 0 1-2-7.464", key: "k1g0md" }],
  ["path", { d: "M6.003 5.125a4 4 0 0 0-2.526 5.77", key: "q97ue3" }]
], i0 = ce("brain", a0);
const o0 = [
  ["path", { d: "m16 22-1-4", key: "1ow2iv" }],
  [
    "path",
    {
      d: "M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1",
      key: "11gii7"
    }
  ],
  ["path", { d: "M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z", key: "bju7h4" }],
  ["path", { d: "m8 22 1-4", key: "s3unb" }]
], ed = ce("brush-cleaning", o0);
const r0 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], Yg = ce("check", r0);
const l0 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], td = ce("chevron-down", l0);
const s0 = [
  ["path", { d: "m15 10 5 5-5 5", key: "qqa56n" }],
  ["path", { d: "M4 4v7a4 4 0 0 0 4 4h12", key: "z08zvw" }]
], c0 = ce("corner-down-right", s0);
const u0 = [
  ["path", { d: "M2 8h20", key: "d11cs7" }],
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }],
  ["path", { d: "M6 16h12", key: "u522kt" }]
], d0 = ce("dock", u0);
const m0 = [
  [
    "path",
    {
      d: "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z",
      key: "c7niix"
    }
  ]
], Fl = ce("droplet", m0);
const f0 = [
  [
    "path",
    {
      d: "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",
      key: "1ptgy4"
    }
  ],
  [
    "path",
    {
      d: "M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",
      key: "1sl1rz"
    }
  ]
], _0 = ce("droplets", f0);
const p0 = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
  ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }]
], g0 = ce("ellipsis-vertical", p0);
const h0 = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
  ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
], v0 = ce("ellipsis", h0);
const y0 = [
  [
    "path",
    {
      d: "M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z",
      key: "1dudjm"
    }
  ],
  [
    "path",
    {
      d: "M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z",
      key: "l2t8xc"
    }
  ],
  ["path", { d: "M16 17h4", key: "1dejxt" }],
  ["path", { d: "M4 13h4", key: "1bwh8b" }]
], b0 = ce("footprints", y0);
const S0 = [
  ["path", { d: "m12 14 4-4", key: "9kzdfg" }],
  ["path", { d: "M3.34 19a10 10 0 1 1 17.32 0", key: "19p75a" }]
], k0 = ce("gauge", S0);
const w0 = [
  [
    "path",
    {
      d: "M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3",
      key: "11za1p"
    }
  ],
  ["path", { d: "m16 19 2 2 4-4", key: "1b14m6" }]
], x0 = ce("grid-2x2-check", w0);
const E0 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
], T0 = ce("history", E0);
const z0 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
], N0 = ce("info", z0);
const A0 = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
], C0 = ce("layers", A0);
const M0 = [
  ["path", { d: "M3 5h.01", key: "18ugdj" }],
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M3 19h.01", key: "noohij" }],
  ["path", { d: "M8 5h13", key: "1pao27" }],
  ["path", { d: "M8 12h13", key: "1za7za" }],
  ["path", { d: "M8 19h13", key: "m83p4d" }]
], O0 = ce("list", M0);
const R0 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], Zg = ce("loader-circle", R0);
const j0 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 9.9-1", key: "1mm8w8" }]
], D0 = ce("lock-open", j0);
const L0 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
], U0 = ce("lock", L0);
const Y0 = [
  [
    "path",
    {
      d: "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",
      key: "169xi5"
    }
  ],
  ["path", { d: "M15 5.764v15", key: "1pn4in" }],
  ["path", { d: "M9 3.236v15", key: "1uimfh" }]
], Ql = ce("map", Y0);
const Z0 = [["path", { d: "M5 12h14", key: "1ays0h" }]], H0 = ce("minus", Z0);
const B0 = [
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  [
    "path",
    {
      d: "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",
      key: "2d38gg"
    }
  ],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
], G0 = ce("octagon-x", B0);
const K0 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 15h18", key: "5xshup" }],
  ["path", { d: "m15 8-3 3-3-3", key: "1oxy1z" }]
], q0 = ce("panel-bottom-close", K0);
const V0 = [
  ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1", key: "kaeet6" }],
  ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1", key: "1wsw3u" }]
], X0 = ce("pause", V0);
const $0 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
], P0 = ce("pencil", $0);
const I0 = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
], Gu = ce("play", I0);
const F0 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], Hg = ce("plus", F0);
const Q0 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
], J0 = ce("refresh-cw", Q0);
const W0 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
], e1 = ce("rotate-ccw", W0);
const t1 = [
  ["circle", { cx: "6", cy: "19", r: "3", key: "1kj8tv" }],
  ["path", { d: "M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15", key: "1d8sl" }],
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }]
], n1 = ce("route", t1);
const a1 = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }]
], Bg = ce("scan", a1);
const i1 = [
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["path", { d: "M19 7h-9", key: "6i9tg" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
], o1 = ce("settings-2", i1);
const r1 = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], l1 = ce("settings", r1);
const s1 = [
  [
    "path",
    {
      d: "M14 11a2 2 0 1 1-4 0 4 4 0 0 1 8 0 6 6 0 0 1-12 0 8 8 0 0 1 16 0 10 10 0 1 1-20 0 11.93 11.93 0 0 1 2.42-7.22 2 2 0 1 1 3.16 2.44",
      key: "1cn552"
    }
  ]
], c1 = ce("shell", s1);
const u1 = [
  ["path", { d: "M2 20h.01", key: "4haj6o" }],
  ["path", { d: "M7 20v-4", key: "j294jx" }],
  ["path", { d: "M12 20v-8", key: "i3yub9" }],
  ["path", { d: "M17 20V8", key: "1tkaf5" }]
], d1 = ce("signal-high", u1);
const m1 = [
  ["path", { d: "M2 20h.01", key: "4haj6o" }],
  ["path", { d: "M7 20v-4", key: "j294jx" }]
], f1 = ce("signal-low", m1);
const _1 = [
  ["path", { d: "M2 20h.01", key: "4haj6o" }],
  ["path", { d: "M7 20v-4", key: "j294jx" }],
  ["path", { d: "M12 20v-8", key: "i3yub9" }]
], p1 = ce("signal-medium", _1);
const g1 = [
  ["path", { d: "M2 20h.01", key: "4haj6o" }],
  ["path", { d: "M7 20v-4", key: "j294jx" }],
  ["path", { d: "M12 20v-8", key: "i3yub9" }],
  ["path", { d: "M17 20V8", key: "1tkaf5" }],
  ["path", { d: "M22 4v16", key: "sih9yq" }]
], h1 = ce("signal", g1);
const v1 = [
  ["path", { d: "M10 5H3", key: "1qgfaw" }],
  ["path", { d: "M12 19H3", key: "yhmn1j" }],
  ["path", { d: "M14 3v4", key: "1sua03" }],
  ["path", { d: "M16 17v4", key: "1q0r14" }],
  ["path", { d: "M21 12h-9", key: "1o4lsq" }],
  ["path", { d: "M21 19h-5", key: "1rlt1p" }],
  ["path", { d: "M21 5h-7", key: "1oszz2" }],
  ["path", { d: "M8 10v4", key: "tgpxqk" }],
  ["path", { d: "M8 12H3", key: "a7s4jb" }]
], y1 = ce("sliders-horizontal", v1);
const b1 = [
  [
    "path",
    {
      d: "M10.029 4.285A2 2 0 0 0 7 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",
      key: "1ystz2"
    }
  ],
  ["path", { d: "M3 4v16", key: "1ph11n" }]
], S1 = ce("step-forward", b1);
const k1 = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
], w1 = ce("sun", k1);
const x1 = [
  ["line", { x1: "10", x2: "14", y1: "2", y2: "2", key: "14vaq8" }],
  ["line", { x1: "12", x2: "15", y1: "14", y2: "11", key: "17fdiu" }],
  ["circle", { cx: "12", cy: "14", r: "8", key: "1e1u0o" }]
], E1 = ce("timer", x1);
const T1 = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
], Hl = ce("trash-2", T1);
const z1 = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }],
  ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }]
], N1 = ce("volume-2", z1);
const A1 = [
  ["path", { d: "M12 10L12 2", key: "jvb0aw" }],
  ["path", { d: "M16 6L12 10L8 6", key: "9j6vje" }],
  [
    "path",
    {
      d: "M2 15C2.6 15.5 3.2 16 4.5 16C7 16 7 14 9.5 14C12.1 14 11.9 16 14.5 16C17 16 17 14 19.5 14C20.8 14 21.4 14.5 22 15",
      key: "s2zepw"
    }
  ],
  [
    "path",
    {
      d: "M2 21C2.6 21.5 3.2 22 4.5 22C7 22 7 20 9.5 20C12.1 20 11.9 22 14.5 22C17 22 17 20 19.5 20C20.8 20 21.4 20.5 22 21",
      key: "u68omc"
    }
  ]
], C1 = ce("waves-arrow-down", A1);
const M1 = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Ku = ce("x", M1);
const O1 = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
], R1 = ce("zap", O1), ze = {
  STATE: { key: "state" },
  MAIN_BRUSH_LEFT: { key: "main_brush_left" },
  MAIN_BRUSH_TIME_LEFT: {
    key: "main_brush_time_left"
  },
  SIDE_BRUSH_LEFT: { key: "side_brush_left" },
  SIDE_BRUSH_TIME_LEFT: {
    key: "side_brush_time_left"
  },
  FILTER_LEFT: { key: "filter_left" },
  FILTER_TIME_LEFT: { key: "filter_time_left" },
  SENSOR_DIRTY_LEFT: { key: "sensor_dirty_left" },
  SENSOR_DIRTY_TIME_LEFT: {
    key: "sensor_dirty_time_left"
  },
  TANK_FILTER_LEFT: { key: "tank_filter_left" },
  TANK_FILTER_TIME_LEFT: {
    key: "tank_filter_time_left"
  },
  MOP_PAD_LEFT: { key: "mop_pad_left" },
  MOP_PAD_TIME_LEFT: { key: "mop_pad_time_left" },
  SILVER_ION_LEFT: { key: "silver_ion_left" },
  SILVER_ION_TIME_LEFT: {
    key: "silver_ion_time_left"
  },
  DETERGENT_LEFT: { key: "detergent_left" },
  DETERGENT_TIME_LEFT: {
    key: "detergent_time_left"
  },
  SQUEEGEE_LEFT: { key: "squeegee_left" },
  SQUEEGEE_TIME_LEFT: { key: "squeegee_time_left" },
  ONBOARD_DIRTY_WATER_TANK_LEFT: {
    key: "onboard_dirty_water_tank_left"
  },
  ONBOARD_DIRTY_WATER_TANK_TIME_LEFT: {
    key: "onboard_dirty_water_tank_time_left"
  },
  DIRTY_WATER_CHANNEL_DIRTY_LEFT: {
    key: "dirty_water_channel_dirty_left"
  },
  DIRTY_WATER_CHANNEL_DIRTY_TIME_LEFT: {
    key: "dirty_water_channel_dirty_time_left"
  },
  DEODORIZER_LEFT: { key: "deodorizer_left" },
  DEODORIZER_TIME_LEFT: { key: "deodorizer_time_left" },
  WHEEL_DIRTY_LEFT: { key: "wheel_dirty_left" },
  WHEEL_DIRTY_TIME_LEFT: { key: "wheel_dirty_time_left" },
  SCALE_INHIBITOR_LEFT: { key: "scale_inhibitor_left" },
  SCALE_INHIBITOR_TIME_LEFT: {
    key: "scale_inhibitor_time_left"
  },
  FLUFFING_ROLLER_DIRTY_LEFT: {
    key: "fluffing_roller_dirty_left"
  },
  FLUFFING_ROLLER_DIRTY_TIME_LEFT: {
    key: "fluffing_roller_dirty_time_left"
  },
  ROLLER_MOP_FILTER_DIRTY_LEFT: {
    key: "roller_mop_filter_dirty_left"
  },
  ROLLER_MOP_FILTER_DIRTY_TIME_LEFT: {
    key: "roller_mop_filter_dirty_time_left"
  },
  WATER_OUTLET_FILTER_DIRTY_LEFT: {
    key: "water_outlet_filter_dirty_left"
  },
  WATER_OUTLET_FILTER_DIRTY_TIME_LEFT: {
    key: "water_outlet_filter_dirty_time_left"
  }
}, qu = {
  RESUME_CLEANING: { key: "resume_cleaning", platform: "switch" },
  CARPET_BOOST: { key: "carpet_boost", platform: "switch", category: "config" },
  OBSTACLE_AVOIDANCE: { key: "obstacle_avoidance", platform: "switch", category: "config" },
  CUSTOMIZED_CLEANING: { key: "customized_cleaning", platform: "switch", icon: "mdi:home-search" },
  CHILD_LOCK: { key: "child_lock", platform: "switch", category: "config" },
  TIGHT_MOPPING: { key: "tight_mopping", platform: "switch", icon: "mdi:heating-coil", category: "config" },
  DND: { key: "dnd", platform: "switch", category: "config", name: "DnD" },
  DND_DISABLE_RESUME_CLEANING: {
    key: "dnd_disable_resume_cleaning",
    platform: "switch",
    icon: "mdi:pause-box",
    category: "config"
  },
  DND_DISABLE_AUTO_EMPTY: {
    key: "dnd_disable_auto_empty",
    platform: "switch",
    icon: "mdi:delete-off",
    category: "config"
  },
  DND_REDUCE_VOLUME: { key: "dnd_reduce_volume", platform: "switch", icon: "mdi:volume-minus", category: "config" },
  MULTI_FLOOR_MAP: { key: "multi_floor_map", platform: "switch", category: "config" },
  AUTO_DUST_COLLECTING: { key: "auto_dust_collecting", platform: "switch" },
  CARPET_RECOGNITION: { key: "carpet_recognition", platform: "switch", icon: "mdi:rug", category: "config" },
  SELF_CLEAN: { key: "self_clean", platform: "switch" },
  WATER_ELECTROLYSIS: { key: "water_electrolysis", platform: "switch", category: "config" },
  AUTO_WATER_REFILLING: { key: "auto_water_refilling", platform: "switch", category: "config" },
  INTELLIGENT_RECOGNITION: { key: "intelligent_recognition", platform: "switch", category: "config" },
  AUTO_DRYING: { key: "auto_drying", platform: "switch" },
  CARPET_AVOIDANCE: { key: "carpet_avoidance", platform: "switch", icon: "mdi:close-box-outline", category: "config" },
  AUTO_ADD_DETERGENT: { key: "auto_add_detergent", platform: "switch", icon: "mdi:chart-bubble", category: "config" },
  MOP_WASHING_WITH_DETERGENT: {
    key: "mop_washing_with_detergent",
    platform: "switch",
    icon: "mdi:hand-wash",
    category: "config",
    name: "Mop Washing With Detergent"
  },
  MOPPING_WITH_DETERGENT: {
    key: "mopping_with_detergent",
    platform: "switch",
    icon: "mdi:hand-wash",
    category: "config"
  },
  MAP_SAVING: { key: "map_saving", platform: "switch", icon: "mdi:map-legend", category: "config" },
  AUTO_MOUNT_MOP: { key: "auto_mount_mop", platform: "switch", icon: "mdi:google-circles-group", category: "config" },
  AUTO_CHANGE_MOP: { key: "auto_change_mop", platform: "switch", icon: "mdi:domain-switch", category: "config" },
  VOICE_ASSISTANT: { key: "voice_assistant", platform: "switch", category: "config" },
  CLEANING_SEQUENCE: { key: "cleaning_sequence", platform: "switch", icon: "mdi:order-numeric-ascending" },
  SELF_CLEAN_BY_ZONE: { key: "self_clean_by_zone", platform: "switch" },
  AI_OBSTACLE_DETECTION: { key: "ai_obstacle_detection", platform: "switch", category: "config" },
  AI_OBSTACLE_IMAGE_UPLOAD: {
    key: "ai_obstacle_image_upload",
    platform: "switch",
    icon: "mdi:cloud-upload",
    category: "config"
  },
  AI_OBSTACLE_PICTURE: { key: "ai_obstacle_picture", platform: "switch", category: "config" },
  AI_PET_DETECTION: { key: "ai_pet_detection", platform: "switch", category: "config" },
  AI_HUMAN_DETECTION: { key: "ai_human_detection", platform: "switch", category: "config" },
  AI_FURNITURE_DETECTION: {
    key: "ai_furniture_detection",
    platform: "switch",
    icon: "mdi:table-furniture",
    category: "config"
  },
  AI_FLUID_DETECTION: { key: "ai_fluid_detection", platform: "switch" },
  FUZZY_OBSTACLE_DETECTION: {
    key: "fuzzy_obstacle_detection",
    platform: "switch",
    icon: "mdi:blur-linear",
    category: "config"
  },
  AI_PET_AVOIDANCE: { key: "ai_pet_avoidance", platform: "switch", icon: "mdi:dog-service" },
  PET_PICTURE: { key: "pet_picture", platform: "switch", icon: "mdi:cat", category: "config" },
  PET_FOCUSED_DETECTION: { key: "pet_focused_detection", platform: "switch", icon: "mdi:dog" },
  LARGE_PARTICLES_BOOST: { key: "large_particles_boost", platform: "switch", icon: "mdi:weather-dust" },
  FILL_LIGHT: { key: "fill_light", platform: "switch" },
  COLLISION_AVOIDANCE: { key: "collision_avoidance", platform: "switch", category: "config" },
  STAIN_AVOIDANCE: { key: "stain_avoidance", platform: "switch", icon: "mdi:liquid-spot" },
  FLOOR_DIRECTION_CLEANING: {
    key: "floor_direction_cleaning",
    platform: "switch",
    icon: "mdi:arrow-decision-auto",
    category: "config"
  },
  PET_FOCUSED_CLEANING: { key: "pet_focused_cleaning", platform: "switch", icon: "mdi:paw", category: "config" },
  INTENSIVE_CARPET_CLEANING: {
    key: "intensive_carpet_cleaning",
    platform: "switch",
    icon: "mdi:creation",
    category: "config"
  },
  SIDE_REACH: { key: "side_reach", platform: "switch", icon: "mdi:selection-ellipse-arrow-inside", category: "config" },
  MOP_EXTEND: { key: "mop_extend", platform: "switch", icon: "mdi:waves-arrow-right" },
  GAP_CLEANING_EXTENSION: {
    key: "gap_cleaning_extension",
    platform: "switch",
    icon: "mdi:plus-circle-multiple",
    category: "config"
  },
  MOPPING_UNDER_FURNITURES: {
    key: "mopping_under_furnitures",
    platform: "switch",
    icon: "mdi:table-picnic",
    category: "config"
  },
  OFF_PEAK_CHARGING: { key: "off_peak_charging", platform: "switch", icon: "mdi:battery-clock", category: "config" },
  AUTO_CHARGING: { key: "auto_charging", platform: "switch", icon: "mdi:battery-sync" },
  HUMAN_FOLLOW: { key: "human_follow", platform: "switch" },
  MAX_SUCTION_POWER: { key: "max_suction_power", platform: "switch", icon: "mdi:weather-windy" },
  SMART_DRYING: { key: "smart_drying", platform: "switch", icon: "mdi:clock-fast" },
  HOT_WASHING: { key: "hot_washing", platform: "switch", icon: "mdi:sun-thermometer" },
  UV_STERILIZATION: { key: "uv_sterilization", platform: "switch", icon: "mdi:sun-wireless" },
  ULTRA_CLEAN_MODE: { key: "ultra_clean_mode", platform: "switch", icon: "mdi:silverware-clean" },
  STREAMING_VOICE_PROMPT: { key: "streaming_voice_prompt", platform: "switch" },
  CLEAN_CARPETS_FIRST: {
    key: "clean_carpets_first",
    platform: "switch",
    icon: "mdi:order-bool-descending-variant",
    category: "config"
  },
  SMART_MOP_WASHING: { key: "smart_mop_washing", platform: "switch", icon: "mdi:hand-water", category: "config" },
  SILENT_DRYING: { key: "silent_drying", platform: "switch", icon: "mdi:volume-mute" },
  HAIR_COMPRESSION: {
    key: "hair_compression",
    platform: "switch",
    icon: "mdi:arrow-collapse-vertical",
    category: "config"
  },
  SIDE_BRUSH_CARPET_ROTATE: {
    key: "side_brush_carpet_rotate",
    platform: "switch",
    icon: "mdi:format-rotate-90",
    category: "config"
  },
  LIFT_CHASSIS_ON_CARPET: {
    key: "lift_chassis_on_carpet",
    platform: "switch",
    icon: "mdi:weather-moonset-up",
    category: "config"
  },
  CLOSE_ROLLER_COVER_ON_CARPET: {
    key: "close_roller_cover_on_carpet",
    platform: "switch",
    icon: "mdi:circle-off-outline",
    category: "config"
  },
  DUST_BAG_DRYING: { key: "dust_bag_drying", platform: "switch", icon: "mdi:fire-circle", category: "config" },
  RING_LIGHT_ALWAYS_ON: {
    key: "ring_light_always_on",
    platform: "switch",
    icon: "mdi:light-recessed",
    category: "config"
  },
  OBSTACLE_CROSSING: {
    key: "obstacle_crossing",
    platform: "switch",
    icon: "mdi:boom-gate-arrow-up",
    category: "config",
    name: "Synchronized Obstacle Crossing"
  },
  ACTIVE_SUSPENSION_CROSSING: {
    key: "active_suspension_crossing",
    platform: "switch",
    icon: "mdi:weather-moonset-up",
    category: "config"
  },
  DYNAMIC_OBSTACLE_CLEANING: {
    key: "dynamic_obstacle_cleaning",
    platform: "switch",
    icon: "mdi:map-marker-circle",
    category: "config"
  },
  PRESSURIZED_CLEANING: {
    key: "pressurized_cleaning",
    platform: "switch",
    icon: "mdi:car-brake-low-pressure",
    category: "config"
  },
  LDS_STATE: { key: "lds_state", platform: "switch", name: "LDS State" },
  CAMERA_LIGHT_BRIGHTNESS_AUTO: { key: "camera_light_brightness_auto", platform: "switch" }
}, gn = {
  SUCTION_LEVEL: { key: "suction_level", platform: "select" },
  WATER_VOLUME: { key: "water_volume", platform: "select" },
  CLEANING_MODE: { key: "cleaning_mode", platform: "select" },
  CARPET_SENSITIVITY: { key: "carpet_sensitivity", platform: "select", icon: "mdi:rug" },
  CARPET_CLEANING: { key: "carpet_cleaning", platform: "select", icon: "mdi:close-box-outline" },
  AUTO_EMPTY_FREQUENCY: { key: "auto_empty_frequency", platform: "select" },
  DRYING_TIME: { key: "drying_time", platform: "select", icon: "mdi:sun-clock" },
  MOP_WASH_LEVEL: { key: "mop_wash_level", platform: "select", icon: "mdi:water-opacity" },
  VOICE_ASSISTANT_LANGUAGE: {
    key: "voice_assistant_language",
    platform: "select",
    icon: "mdi:translate-variant",
    category: "config"
  },
  MOP_PRESSURE: { key: "mop_pressure", platform: "select", icon: "mdi:car-brake-low-pressure" },
  MOP_TEMPERATURE: { key: "mop_temperature", platform: "select", icon: "mdi:thermometer-water" },
  LOW_LYING_AREA_FREQUENCY: {
    key: "low_lying_area_frequency",
    platform: "select",
    icon: "mdi:priority-high",
    category: "config"
  },
  SCRAPER_FREQUENCY: { key: "scraper_frequency", platform: "select", icon: "mdi:squeegee", category: "config" },
  MOP_PAD_HUMIDITY: { key: "mop_pad_humidity", platform: "select" },
  MOPPING_TYPE: { key: "mopping_type", platform: "select", icon: "mdi:spray-bottle", category: "config" },
  CUSTOM_MOPPING_ROUTE: { key: "custom_mopping_route", platform: "select" },
  WIDER_CORNER_COVERAGE: {
    key: "wider_corner_coverage",
    platform: "select",
    icon: "mdi:rounded-corner",
    category: "config"
  },
  MOP_PAD_SWING: { key: "mop_pad_swing", platform: "select", icon: "mdi:arrow-split-vertical", category: "config" },
  MOP_EXTEND_FREQUENCY: {
    key: "mop_extend_frequency",
    platform: "select",
    icon: "mdi:waves-arrow-right",
    category: "config"
  },
  SELF_CLEAN_FREQUENCY: { key: "self_clean_frequency", platform: "select" },
  AUTO_RECLEANING: { key: "auto_recleaning", platform: "select", icon: "mdi:repeat-variant" },
  AUTO_REWASHING: { key: "auto_rewashing", platform: "select" },
  CLEANING_ROUTE: { key: "cleaning_route", platform: "select" },
  BATTERY_CHARGE_LEVEL: {
    key: "battery_charge_level",
    platform: "select",
    icon: "mdi:battery-heart-variant",
    category: "config"
  },
  CLEANGENIUS: { key: "cleangenius", platform: "select", icon: "mdi:atom" },
  CLEANGENIUS_MODE: { key: "cleangenius_mode", platform: "select", icon: "mdi:atom" },
  WATER_TEMPERATURE: { key: "water_temperature", platform: "select", icon: "mdi:water-thermometer" },
  AUTO_LDS_COVERAGE: { key: "auto_lds_coverage", platform: "select", icon: "mdi:elevator", category: "config" },
  AUTO_EMPTY_MODE: { key: "auto_empty_mode", platform: "select" },
  MOP_CLEAN_FREQUENCY: { key: "mop_clean_frequency", platform: "select" },
  WASHING_MODE: { key: "washing_mode", platform: "select", icon: "mdi:water-opacity" },
  MAP_ROTATION: { key: "map_rotation", platform: "select", icon: "mdi:crop-rotate", category: "config" },
  SELECTED_MAP: { key: "selected_map", platform: "select", icon: "mdi:map-check" },
  CLEANING_TIMES: { key: "cleaning_times", platform: "select" },
  MOP_TYPE: { key: "mop_type", platform: "select", category: "config" },
  ORDER: { key: "order", platform: "select" },
  FLOOR_MATERIAL: { key: "floor_material", platform: "select" },
  FLOOR_MATERIAL_DIRECTION: { key: "floor_material_direction", platform: "select" },
  VISIBILITY: { key: "visibility", platform: "select" },
  NAME: { key: "name", platform: "select", category: "config" }
}, j1 = {
  RESET_MAIN_BRUSH: {
    key: "reset_main_brush",
    platform: "button",
    icon: "mdi:car-turbocharger",
    category: "diagnostic"
  },
  RESET_SIDE_BRUSH: {
    key: "reset_side_brush",
    platform: "button",
    icon: "mdi:pinwheel-outline",
    category: "diagnostic"
  },
  RESET_FILTER: { key: "reset_filter", platform: "button", icon: "mdi:air-filter", category: "diagnostic" },
  RESET_SENSOR: { key: "reset_sensor", platform: "button", icon: "mdi:radar", category: "diagnostic" },
  RESET_MOP_PAD: { key: "reset_mop_pad", platform: "button", icon: "mdi:hydro-power", category: "diagnostic" },
  RESET_SILVER_ION: { key: "reset_silver_ion", platform: "button", icon: "mdi:shimmer", category: "diagnostic" },
  RESET_DETERGENT: { key: "reset_detergent", platform: "button", icon: "mdi:chart-bubble", category: "diagnostic" },
  RESET_SQUEEGEE: { key: "reset_squeegee", platform: "button", icon: "mdi:squeegee", category: "diagnostic" },
  RESET_ONBOARD_DIRTY_WATER_TANK: {
    key: "reset_onboard_dirty_water_tank",
    platform: "button",
    icon: "mdi:train-car-tank",
    category: "diagnostic"
  },
  RESET_DIRTY_WATER_CHANNEL: {
    key: "reset_dirty_water_channel",
    platform: "button",
    icon: "mdi:cup",
    category: "diagnostic"
  },
  RESET_DEODORIZER: { key: "reset_deodorizer", platform: "button", icon: "mdi:scent", category: "diagnostic" },
  RESET_SCALE_INHIBITOR: { key: "reset_scale_inhibitor", platform: "button", icon: "mdi:pipe", category: "diagnostic" },
  RESET_WHEEL: { key: "reset_wheel", platform: "button", icon: "mdi:tire", category: "diagnostic" },
  RESET_FLUFFING_ROLLER: {
    key: "reset_fluffing_roller",
    platform: "button",
    icon: "mdi:blinds-open",
    category: "diagnostic"
  },
  RESET_ROLLER_MOP_FILTER: {
    key: "reset_roller_mop_filter",
    platform: "button",
    icon: "mdi:filter-settings",
    category: "diagnostic"
  },
  RESET_WATER_OUTLET_FILTER: {
    key: "reset_water_outlet_filter",
    platform: "button",
    icon: "mdi:filter-settings",
    category: "diagnostic"
  },
  START_AUTO_EMPTY: { key: "start_auto_empty", platform: "button" },
  CLEAR_WARNING: {
    key: "clear_warning",
    platform: "button",
    icon: "mdi:clipboard-check-outline",
    category: "diagnostic"
  },
  START_FAST_MAPPING: { key: "start_fast_mapping", platform: "button", icon: "mdi:map-plus", category: "config" },
  START_MAPPING: { key: "start_mapping", platform: "button", icon: "mdi:broom", category: "config" },
  SELF_CLEAN: { key: "self_clean", platform: "button" },
  MANUAL_DRYING: { key: "manual_drying", platform: "button" },
  MANUAL_DUST_BAG_DRYING: { key: "manual_dust_bag_drying", platform: "button" },
  WATER_TANK_DRAINING: { key: "water_tank_draining", platform: "button", icon: "mdi:pump", category: "diagnostic" },
  EMPTY_WATER_TANK: { key: "empty_water_tank", platform: "button", icon: "mdi:waves-arrow-up", category: "diagnostic" },
  BASE_STATION_SELF_REPAIR: { key: "base_station_self_repair", platform: "button", category: "diagnostic" },
  BASE_STATION_CLEANING: {
    key: "base_station_cleaning",
    platform: "button",
    icon: "mdi:car-wash",
    category: "diagnostic"
  },
  START_RECLEANING: {
    key: "start_recleaning",
    platform: "button",
    icon: "mdi:refresh-circle",
    name: "Start Re-Cleaning"
  },
  RELOAD_SHORTCUTS: {
    key: "reload_shortcuts",
    platform: "button",
    icon: "mdi:motion-play-outline",
    category: "diagnostic"
  },
  BACKUP_SAVED_MAP: { key: "backup_saved_map", platform: "button", icon: "mdi:cloud-upload", category: "diagnostic" },
  SHORTCUT: { key: "shortcut", platform: "button", icon: "mdi:play-speed" }
}, Ul = {
  VOLUME: { key: "volume", platform: "number" },
  MOP_CLEANING_REMAINDER: {
    key: "mop_cleaning_remainder",
    platform: "number",
    icon: "mdi:alarm-check",
    category: "config"
  },
  SELF_CLEAN_AREA: { key: "self_clean_area", platform: "number" },
  SELF_CLEAN_TIME: { key: "self_clean_time", platform: "number", icon: "mdi:table-clock" },
  CAMERA_LIGHT_BRIGHTNESS: {
    key: "camera_light_brightness",
    platform: "number",
    icon: "mdi:brightness-percent",
    category: "config"
  },
  WETNESS_LEVEL: { key: "wetness_level", platform: "number" },
  DRYING_TIME: { key: "drying_time", platform: "number", icon: "mdi:sun-clock" },
  AUTO_EMPTY_AREA: { key: "auto_empty_area", platform: "number", icon: "mdi:recycle" }
}, D1 = {
  DND_START: { key: "dnd_start", platform: "time", icon: "mdi:clock-start", category: "config", name: "DnD Start" },
  DND_END: { key: "dnd_end", platform: "time", icon: "mdi:clock-end", category: "config", name: "DnD End" },
  OFF_PEAK_CHARGING_START: {
    key: "off_peak_charging_start",
    platform: "time",
    icon: "mdi:battery-lock-open",
    category: "config",
    name: "Off-Peak Charging Start"
  },
  OFF_PEAK_CHARGING_END: {
    key: "off_peak_charging_end",
    platform: "time",
    icon: "mdi:battery-lock",
    category: "config",
    name: "Off-Peak Charging End"
  }
};
function pe(n, i, o, l) {
  return {
    key: qu[n].key,
    platform: "switch",
    labelKey: i,
    descriptionKey: o,
    ...l
  };
}
function Et(n, i, o, l) {
  return {
    key: gn[n].key,
    platform: "select",
    labelKey: i,
    descriptionKey: o,
    ...l
  };
}
function Gg(n, i, o, l) {
  return {
    key: Ul[n].key,
    platform: "number",
    labelKey: i,
    descriptionKey: o,
    ...l
  };
}
function ln(n, i, o, l) {
  return {
    key: j1[n].key,
    platform: "button",
    labelKey: i,
    descriptionKey: o,
    ...l
  };
}
function Bl(n, i, o, l) {
  return {
    key: D1[n].key,
    platform: "time",
    labelKey: i,
    descriptionKey: o,
    ...l
  };
}
const nd = {
  key: "quick_settings",
  titleKey: "settings.quick_settings.title",
  order: 1,
  entities: [
    pe("CHILD_LOCK", "settings.quick_settings.child_lock", "settings.quick_settings.child_lock_desc"),
    pe("RESUME_CLEANING", "settings.quick_settings.resume_cleaning", "settings.quick_settings.resume_cleaning_desc"),
    pe("DND", "settings.quick_settings.dnd", "settings.quick_settings.dnd_desc"),
    Bl("DND_START", "settings.quick_settings.dnd_start", void 0, { parentKey: "dnd" }),
    Bl("DND_END", "settings.quick_settings.dnd_end", void 0, { parentKey: "dnd" }),
    pe(
      "DND_DISABLE_RESUME_CLEANING",
      "settings.quick_settings.dnd_disable_resume",
      "settings.quick_settings.dnd_disable_resume_desc",
      { parentKey: "dnd" }
    ),
    pe(
      "DND_DISABLE_AUTO_EMPTY",
      "settings.quick_settings.dnd_disable_auto_empty",
      "settings.quick_settings.dnd_disable_auto_empty_desc",
      { parentKey: "dnd" }
    ),
    pe(
      "DND_REDUCE_VOLUME",
      "settings.quick_settings.dnd_reduce_volume",
      "settings.quick_settings.dnd_reduce_volume_desc",
      { parentKey: "dnd" }
    )
  ]
}, ad = {
  key: "quick_actions",
  titleKey: "settings.station_controls.title",
  order: 2,
  entities: [
    ln("SELF_CLEAN", "settings.station_controls.self_clean", "settings.station_controls.self_clean_desc"),
    ln("MANUAL_DRYING", "settings.station_controls.manual_drying", "settings.station_controls.manual_drying_desc"),
    ln(
      "WATER_TANK_DRAINING",
      "settings.station_controls.water_tank_draining",
      "settings.station_controls.water_tank_draining_desc"
    ),
    ln(
      "BASE_STATION_CLEANING",
      "settings.station_controls.base_station_cleaning",
      "settings.station_controls.base_station_cleaning_desc"
    ),
    ln(
      "EMPTY_WATER_TANK",
      "settings.station_controls.empty_water_tank",
      "settings.station_controls.empty_water_tank_desc"
    ),
    ln(
      "START_AUTO_EMPTY",
      "settings.station_controls.start_auto_empty",
      "settings.station_controls.start_auto_empty_desc"
    ),
    ln(
      "START_RECLEANING",
      "settings.station_controls.start_recleaning",
      "settings.station_controls.start_recleaning_desc"
    ),
    ln("CLEAR_WARNING", "settings.station_controls.clear_warning", "settings.station_controls.clear_warning_desc")
  ]
}, id = {
  key: "carpet_settings",
  titleKey: "settings.carpet.title",
  order: 3,
  entities: [
    pe("CARPET_RECOGNITION", "settings.carpet.carpet_recognition", "settings.carpet.carpet_recognition_desc"),
    pe("CARPET_AVOIDANCE", "settings.carpet.carpet_avoidance", "settings.carpet.carpet_avoidance_desc"),
    Et("CARPET_CLEANING", "settings.carpet.cleaning_mode", "settings.carpet.cleaning_mode_desc"),
    pe("CLEAN_CARPETS_FIRST", "settings.carpet.clean_carpets_first", "settings.carpet.clean_carpets_first_desc"),
    pe("CARPET_BOOST", "settings.carpet.carpet_boost", "settings.carpet.carpet_boost_desc"),
    pe("INTENSIVE_CARPET_CLEANING", "settings.carpet.intensive_cleaning", "settings.carpet.intensive_cleaning_desc"),
    pe("SIDE_BRUSH_CARPET_ROTATE", "settings.carpet.side_brush_rotate", "settings.carpet.side_brush_rotate_desc"),
    Et("CARPET_SENSITIVITY", "settings.carpet.sensitivity", "settings.carpet.sensitivity_desc")
  ]
}, od = {
  key: "floor_settings",
  titleKey: "settings.floor.title",
  order: 4,
  entities: [
    pe("OBSTACLE_AVOIDANCE", "settings.floor.obstacle_avoidance", "settings.floor.obstacle_avoidance_desc"),
    pe("COLLISION_AVOIDANCE", "settings.floor.collision_avoidance", "settings.floor.collision_avoidance_desc"),
    pe("AUTO_MOUNT_MOP", "settings.floor.auto_mount_mop", "settings.floor.auto_mount_mop_desc"),
    pe("TIGHT_MOPPING", "settings.floor.tight_mopping", "settings.floor.tight_mopping_desc"),
    pe("STAIN_AVOIDANCE", "settings.floor.stain_avoidance", "settings.floor.stain_avoidance_desc"),
    pe(
      "FLOOR_DIRECTION_CLEANING",
      "settings.floor.floor_direction_cleaning",
      "settings.floor.floor_direction_cleaning_desc"
    ),
    pe("LARGE_PARTICLES_BOOST", "settings.floor.large_particles_boost", "settings.floor.large_particles_boost_desc"),
    pe("PET_FOCUSED_CLEANING", "settings.floor.pet_focused_cleaning", "settings.floor.pet_focused_cleaning_desc"),
    Et("AUTO_RECLEANING", "settings.floor.auto_recleaning", "settings.floor.auto_recleaning_desc"),
    Et(
      "LOW_LYING_AREA_FREQUENCY",
      "settings.floor.low_lying_area_frequency",
      "settings.floor.low_lying_area_frequency_desc"
    )
  ]
}, rd = {
  key: "edge_corner",
  titleKey: "settings.edge_corner.title",
  order: 5,
  entities: [
    pe("SIDE_REACH", "settings.edge_corner.side_reach", "settings.edge_corner.side_reach_desc"),
    pe("MOP_EXTEND", "settings.edge_corner.mop_extend", "settings.edge_corner.mop_extend_desc"),
    pe("GAP_CLEANING_EXTENSION", "settings.edge_corner.gap_cleaning", "settings.edge_corner.gap_cleaning_desc", {
      parentKey: "mop_extend"
    }),
    pe("MOPPING_UNDER_FURNITURES", "settings.edge_corner.mopping_under", "settings.edge_corner.mopping_under_desc", {
      parentKey: "mop_extend"
    }),
    Et("MOP_EXTEND_FREQUENCY", "settings.edge_corner.extend_frequency", "settings.edge_corner.extend_frequency_desc")
  ]
}, ld = {
  key: "volume",
  titleKey: "settings.volume.title",
  order: 6,
  entities: [
    Gg("VOLUME", "settings.volume.volume", void 0, { renderHint: "volume", min: 0, max: 100 }),
    pe("VOICE_ASSISTANT", "settings.volume.voice_assistant", "settings.volume.voice_assistant_desc"),
    Et("VOICE_ASSISTANT_LANGUAGE", "settings.volume.voice_language", "settings.volume.voice_language_desc", {
      parentKey: "voice_assistant"
    }),
    pe(
      "STREAMING_VOICE_PROMPT",
      "settings.volume.streaming_voice_prompt",
      "settings.volume.streaming_voice_prompt_desc"
    )
  ]
}, sd = {
  key: "dock_settings",
  titleKey: "settings.dock.title",
  order: 7,
  entities: [
    pe("SELF_CLEAN", "settings.dock.self_clean", "settings.dock.self_clean_desc"),
    pe("AUTO_DUST_COLLECTING", "settings.dock.auto_dust_collecting", "settings.dock.auto_dust_collecting_desc"),
    Et("AUTO_EMPTY_MODE", "settings.dock.auto_empty_mode", "settings.dock.auto_empty_mode_desc"),
    Et("AUTO_EMPTY_FREQUENCY", "settings.dock.auto_empty_frequency", "settings.dock.auto_empty_frequency_desc"),
    pe("AUTO_ADD_DETERGENT", "settings.dock.auto_detergent", "settings.dock.auto_detergent_desc"),
    pe(
      "MOP_WASHING_WITH_DETERGENT",
      "settings.dock.mop_washing_with_detergent",
      "settings.dock.mop_washing_with_detergent_desc"
    ),
    pe("MOPPING_WITH_DETERGENT", "settings.dock.mopping_with_detergent", "settings.dock.mopping_with_detergent_desc"),
    pe("WATER_ELECTROLYSIS", "settings.dock.water_electrolysis", "settings.dock.water_electrolysis_desc"),
    pe("AUTO_WATER_REFILLING", "settings.dock.auto_water_refilling", "settings.dock.auto_water_refilling_desc"),
    pe("SMART_MOP_WASHING", "settings.dock.smart_washing", "settings.dock.smart_washing_desc"),
    Et("MOP_WASH_LEVEL", "settings.dock.mop_wash_level", "settings.dock.mop_wash_level_desc"),
    Et("WASHING_MODE", "settings.dock.washing_mode", "settings.dock.washing_mode_desc"),
    Et("WATER_TEMPERATURE", "settings.dock.water_temperature", "settings.dock.water_temperature_desc"),
    pe("AUTO_DRYING", "settings.dock.auto_drying", "settings.dock.auto_drying_desc"),
    Et("DRYING_TIME", "settings.dock.drying_time", "settings.dock.drying_time_desc", { useSegmentedControl: !0 }),
    Et("AUTO_REWASHING", "settings.dock.auto_rewashing", "settings.dock.auto_rewashing_desc"),
    pe("OFF_PEAK_CHARGING", "settings.dock.off_peak_charging", "settings.dock.off_peak_charging_desc"),
    Bl("OFF_PEAK_CHARGING_START", "settings.dock.off_peak_charging_start", void 0, {
      parentKey: "off_peak_charging"
    }),
    Bl("OFF_PEAK_CHARGING_END", "settings.dock.off_peak_charging_end", void 0, {
      parentKey: "off_peak_charging"
    }),
    ln("BASE_STATION_CLEANING", "settings.dock.station_cleaning", "settings.dock.station_cleaning_desc"),
    ln("BASE_STATION_SELF_REPAIR", "settings.dock.self_repair", "settings.dock.self_repair_desc"),
    Et("SCRAPER_FREQUENCY", "settings.dock.scraper_frequency", "settings.dock.scraper_frequency_desc")
  ]
}, cd = {
  key: "ai_detection",
  titleKey: "settings.ai_detection.title",
  order: 8,
  entities: [
    pe(
      "INTELLIGENT_RECOGNITION",
      "settings.ai_detection.intelligent_recognition",
      "settings.ai_detection.intelligent_recognition_desc"
    ),
    pe(
      "AI_OBSTACLE_DETECTION",
      "settings.ai_detection.ai_obstacle_detection",
      "settings.ai_detection.ai_obstacle_detection_desc"
    ),
    pe(
      "FUZZY_OBSTACLE_DETECTION",
      "settings.ai_detection.fuzzy_obstacle_detection",
      "settings.ai_detection.fuzzy_obstacle_detection_desc"
    ),
    pe(
      "AI_OBSTACLE_IMAGE_UPLOAD",
      "settings.ai_detection.ai_obstacle_image_upload",
      "settings.ai_detection.ai_obstacle_image_upload_desc"
    ),
    pe(
      "AI_OBSTACLE_PICTURE",
      "settings.ai_detection.ai_obstacle_picture",
      "settings.ai_detection.ai_obstacle_picture_desc"
    ),
    pe("AI_PET_DETECTION", "settings.ai_detection.ai_pet_detection", "settings.ai_detection.ai_pet_detection_desc"),
    pe("AI_PET_AVOIDANCE", "settings.ai_detection.ai_pet_avoidance", "settings.ai_detection.ai_pet_avoidance_desc"),
    pe(
      "PET_FOCUSED_DETECTION",
      "settings.ai_detection.pet_focused_detection",
      "settings.ai_detection.pet_focused_detection_desc"
    ),
    pe("PET_PICTURE", "settings.ai_detection.pet_picture", "settings.ai_detection.pet_picture_desc"),
    pe(
      "AI_HUMAN_DETECTION",
      "settings.ai_detection.ai_human_detection",
      "settings.ai_detection.ai_human_detection_desc"
    ),
    pe("HUMAN_FOLLOW", "settings.ai_detection.human_follow", "settings.ai_detection.human_follow_desc"),
    pe(
      "AI_FURNITURE_DETECTION",
      "settings.ai_detection.ai_furniture_detection",
      "settings.ai_detection.ai_furniture_detection_desc"
    ),
    pe(
      "AI_FLUID_DETECTION",
      "settings.ai_detection.ai_fluid_detection",
      "settings.ai_detection.ai_fluid_detection_desc"
    ),
    pe("FILL_LIGHT", "settings.ai_detection.fill_light", "settings.ai_detection.fill_light_desc"),
    pe(
      "CAMERA_LIGHT_BRIGHTNESS_AUTO",
      "settings.ai_detection.camera_light_auto",
      "settings.ai_detection.camera_light_auto_desc"
    ),
    Gg(
      "CAMERA_LIGHT_BRIGHTNESS",
      "settings.ai_detection.camera_light_brightness",
      "settings.ai_detection.camera_light_brightness_desc",
      {
        renderHint: "brightness",
        parentKey: "camera_light_brightness_auto",
        parentOff: !0
      }
    )
  ]
}, ud = {
  key: "map_settings",
  titleKey: "settings.map.title",
  order: 9,
  entities: [
    pe("MULTI_FLOOR_MAP", "settings.map.multi_floor", "settings.map.multi_floor_desc"),
    Et("MAP_ROTATION", "settings.map.rotation", "settings.map.rotation_desc"),
    ln("START_MAPPING", "settings.map.start_mapping", void 0, { confirm: !0 }),
    ln("START_FAST_MAPPING", "settings.map.start_fast_mapping", void 0, { confirm: !0 })
  ]
}, L1 = [
  nd,
  ad,
  id,
  od,
  rd,
  ld,
  sd,
  cd,
  ud
].sort((n, i) => n.order - i.order), Gl = {
  cleaningMode: { platform: "select", key: gn.CLEANING_MODE.key },
  cleangeniusMode: { platform: "select", key: gn.CLEANGENIUS_MODE.key },
  cleangenius: { platform: "select", key: gn.CLEANGENIUS.key },
  suctionLevel: { platform: "select", key: gn.SUCTION_LEVEL.key },
  waterVolume: { platform: "select", key: gn.WATER_VOLUME.key },
  mopPadHumidity: { platform: "select", key: gn.MOP_PAD_HUMIDITY.key },
  cleaningRoute: { platform: "select", key: gn.CLEANING_ROUTE.key },
  maxSuctionPower: { platform: "switch", key: qu.MAX_SUCTION_POWER.key },
  wetnessLevel: { platform: "number", key: Ul.WETNESS_LEVEL.key },
  selfCleanFrequency: { platform: "select", key: gn.SELF_CLEAN_FREQUENCY.key },
  selfCleanArea: { platform: "number", key: Ul.SELF_CLEAN_AREA.key },
  selfCleanTime: { platform: "number", key: Ul.SELF_CLEAN_TIME.key },
  stateSensor: { platform: "sensor", key: ze.STATE.key },
  errorCodeSensor: { platform: "sensor", key: "error_code" },
  customizedCleaning: { platform: "switch", key: qu.CUSTOMIZED_CLEANING.key },
  selectedMap: { platform: "select", key: gn.SELECTED_MAP.key }
};
function U1() {
  const n = [
    ...L1.flatMap((o) => o.entities),
    ...Object.values(Gl)
  ], i = /* @__PURE__ */ new Set();
  for (const { platform: o, key: l } of n)
    o !== "attribute" && i.add(`${o}:${l}`);
  return i;
}
const Y1 = /* @__PURE__ */ _.jsx(t0, {}), Z1 = /* @__PURE__ */ _.jsx(Qb, {}), H1 = /* @__PURE__ */ _.jsx(Wb, {}), B1 = /* @__PURE__ */ _.jsx(Ib, {}), G1 = /* @__PURE__ */ _.jsx(T0, {}), K1 = /* @__PURE__ */ _.jsx(Bg, {}), q1 = /* @__PURE__ */ _.jsx(Gu, {}), V1 = /* @__PURE__ */ _.jsx(X0, {}), X1 = /* @__PURE__ */ _.jsx(S1, {}), $1 = /* @__PURE__ */ _.jsx(G0, {}), P1 = /* @__PURE__ */ _.jsx(q0, {}), I1 = /* @__PURE__ */ _.jsx(ed, {}), F1 = /* @__PURE__ */ _.jsx(Fl, {}), Kg = /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
  /* @__PURE__ */ _.jsx(ed, {}),
  /* @__PURE__ */ _.jsx(Hg, {}),
  /* @__PURE__ */ _.jsx(Fl, {})
] }), Q1 = /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
  /* @__PURE__ */ _.jsx(ed, {}),
  /* @__PURE__ */ _.jsx(qb, {}),
  /* @__PURE__ */ _.jsx(Fl, {})
] }), J1 = /* @__PURE__ */ _.jsx(f1, {}), W1 = /* @__PURE__ */ _.jsx(p1, {}), eS = /* @__PURE__ */ _.jsx(d1, {}), tS = /* @__PURE__ */ _.jsx(h1, {}), nS = /* @__PURE__ */ _.jsx(Bg, {}), aS = /* @__PURE__ */ _.jsx(E1, {}), iS = /* @__PURE__ */ _.jsx(x0, {}), oS = /* @__PURE__ */ _.jsx(R1, {}), rS = /* @__PURE__ */ _.jsx(n1, {}), lS = /* @__PURE__ */ _.jsx(c1, {}), sS = /* @__PURE__ */ _.jsx(C1, {}), qg = /* @__PURE__ */ _.jsx(y1, {}), Vg = /* @__PURE__ */ _.jsx(Fl, {}), cS = {
  // Idle states
  idle: "idle",
  charging: "idle",
  charging_completed: "idle",
  // Cleaning states
  sweeping: "cleaning",
  mopping: "cleaning",
  sweeping_and_mopping: "cleaning",
  second_cleaning: "cleaning",
  spot_cleaning: "cleaning",
  extra_cleaning: "cleaning",
  initial_deep_cleaning: "cleaning",
  floor_maintaining: "cleaning",
  // Paused states
  paused: "paused",
  washing_paused: "paused",
  monitoring_paused: "paused",
  dust_bag_drying_paused: "paused",
  finding_pet_paused: "paused",
  initial_deep_cleaning_paused: "paused",
  changing_mop_paused: "paused",
  floor_maintaining_paused: "paused",
  // Returning states
  returning: "returning",
  returning_to_wash: "returning",
  returning_install_mop: "returning",
  returning_remove_mop: "returning",
  returning_auto_empty: "returning",
  returning_to_drain: "returning",
  heading_to_extra_cleaning: "returning",
  // Maintenance states
  washing: "maintenance",
  drying: "maintenance",
  auto_emptying: "maintenance",
  station_cleaning: "maintenance",
  draining: "maintenance",
  auto_water_draining: "maintenance",
  emptying: "maintenance",
  dust_bag_drying: "maintenance",
  water_check: "maintenance",
  clean_add_water: "maintenance",
  sanitizing: "maintenance",
  sanitizing_with_dry: "maintenance",
  changing_mop: "maintenance",
  // Error state
  error: "error",
  // Other states. `unknown` is deliberately unmapped so the vacuum entity's state decides the phase.
  building: "other",
  upgrading: "other",
  remote_control: "other",
  monitoring: "other",
  shortcut: "other",
  human_following: "other",
  finding_pet: "other",
  waiting_for_task: "other",
  smart_charging: "other",
  station_reset: "other",
  clean_summon: "other"
}, Zp = {
  sweeping: "vacuuming",
  spot_cleaning: "vacuuming",
  mopping: "mopping",
  second_cleaning: "mopping",
  // Mopping phase of "mop after vac"
  sweeping_and_mopping: "vacuuming_and_mopping",
  extra_cleaning: "vacuuming",
  initial_deep_cleaning: "vacuuming_and_mopping",
  floor_maintaining: "mopping"
}, uS = {
  cleaning: "cleaning",
  docked: "idle",
  idle: "idle",
  paused: "paused",
  returning: "returning",
  error: "error"
}, dS = "idle", mS = /* @__PURE__ */ new Set(["cleaning", "paused", "returning"]);
function Xg(n, i) {
  return n === "cleaning" || n === "paused" || n === "returning" ? !0 : mS.has(i ?? "");
}
const fS = "none", _S = {
  SHORTCUTS: "shortcuts"
}, pS = {
  WETNESS: {
    MIN: 1,
    MAX: 32
  }
}, wl = {
  SELECT: "select",
  SWITCH: "switch",
  NUMBER: "number",
  VACUUM: "vacuum"
}, Go = {
  SELECT_OPTION: "select_option",
  TURN_ON: "turn_on",
  TURN_OFF: "turn_off",
  SET_VALUE: "set_value",
  SET_FAN_SPEED: "set_fan_speed"
}, gS = {
  ALL: "all"
}, Hp = "Customize", Vu = {
  MAP_LOCKED: "dreame-vacuum-map-locked",
  AREA_SELECTION_MODE: "dreame-vacuum-card:area_selection_mode",
  REPEAT_COUNT: "dreame-vacuum-card:repeat_count"
};
function Xu(n, i) {
  return `${n}:${i}`;
}
const Kn = {
  MODE: gS.ALL,
  WETNESS_LEVEL: 20,
  MAX_SUCTION_POWER: !1,
  SELF_CLEAN_AREA: 20,
  SELF_CLEAN_AREA_MIN: 10,
  SELF_CLEAN_AREA_MAX: 35,
  SELF_CLEAN_TIME: 25,
  SELF_CLEAN_TIME_MIN: 10,
  SELF_CLEAN_TIME_MAX: 50
};
let Nu = !1;
const _e = {
  /** Enable or disable debug logging */
  setDebug: (n) => {
    Nu = n;
  },
  /** Check if debug logging is enabled */
  isDebugEnabled: () => Nu,
  /** Log debug message (only when debug is enabled) */
  debug: (n, ...i) => {
    Nu && console.debug(`[Dreame][${n}]`, ...i);
  },
  /** Log info message (always logged) */
  info: (...n) => {
    console.info("[Dreame]", ...n);
  },
  /** Log warning message (always logged) */
  warn: (...n) => {
    console.warn("[Dreame]", ...n);
  },
  /** Log error message (always logged) */
  error: (...n) => {
    console.error("[Dreame]", ...n);
  }
};
function hS() {
  const n = {
    enableDebug: () => {
      _e.setDebug(!0), _e.info("Debug logging enabled");
    },
    disableDebug: () => {
      _e.setDebug(!1), _e.info("Debug logging disabled");
    },
    isDebugEnabled: () => _e.isDebugEnabled()
  };
  window.dreameVacuum = n;
}
function vS(n) {
  const i = A.useCallback(
    (m, f, p) => {
      _e.debug("HA", "Service call:", m, f, p), n.callService(m, f, p);
    },
    [n]
  ), o = A.useCallback(
    (m, f) => {
      _e.debug("HA", "Select:", m, "→", f);
      const p = {
        entity_id: m,
        option: f
      };
      i(wl.SELECT, Go.SELECT_OPTION, p);
    },
    [i]
  ), l = A.useCallback(
    (m, f) => {
      _e.debug("HA", "Switch:", m, "→", f ? "ON" : "OFF");
      const p = f ? Go.TURN_ON : Go.TURN_OFF;
      i(wl.SWITCH, p, { entity_id: m });
    },
    [i]
  ), s = A.useCallback(
    (m, f) => {
      _e.debug("HA", "Number:", m, "→", f);
      const p = {
        entity_id: m,
        value: f
      };
      i(wl.NUMBER, Go.SET_VALUE, p);
    },
    [i]
  ), d = A.useCallback(
    (m, f) => {
      _e.debug("HA", "Vacuum Set fan speed:", m, "→", f), i(wl.VACUUM, Go.SET_FAN_SPEED, {
        entity_id: m,
        fan_speed: f
      });
    },
    [i]
  );
  return {
    setSelectOption: o,
    setSwitch: l,
    setNumber: s,
    setFanSpeed: d,
    callService: i
  };
}
const yS = /* @__PURE__ */ new Set(["switch", "select", "number", "button", "time"]), bS = /* @__PURE__ */ new Set(["saved_map", "wifi_map"]), SS = /_room_(\d+)_/;
function dd(n, i) {
  return `${n}:${i}`;
}
function $g(n, i, o) {
  return `${n}:${dd(i, o)}`;
}
function kS(n, i, o) {
  const l = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), d = [];
  for (const m of n) {
    if (m.device_id !== i || m.disabled_by || !m.translation_key || bS.has(m.translation_key) || m.unique_id.includes("_shortcut_"))
      continue;
    const f = m.entity_id.split(".")[0];
    if (!f)
      continue;
    const p = m.unique_id.match(SS);
    if (p) {
      s.set($g(Number(p[1]), f, m.translation_key), m.entity_id);
      continue;
    }
    const g = dd(f, m.translation_key);
    if (l.has(g)) {
      _e.warn("Duplicate companion entity ignored:", g, m.entity_id);
      continue;
    }
    l.set(g, m.entity_id);
    const v = m.entity_category ?? null;
    yS.has(f) && (v === null || v === "config") && !o.has(g) && d.push({ entityId: m.entity_id, domain: f, translationKey: m.translation_key });
  }
  return { entities: l, rooms: s, extras: d };
}
const Au = { entities: /* @__PURE__ */ new Map(), rooms: /* @__PURE__ */ new Map(), extras: [] };
function wS(n, i) {
  const o = n?.attributes.friendly_name;
  return typeof o == "string" && o.length > 0 ? o : i.replaceAll("_", " ");
}
function xS(n, i) {
  const [o, l] = A.useState(() => ({
    vacuumEntityId: i,
    status: "loading",
    index: Au
  })), s = A.useRef(n), d = A.useRef(!1);
  A.useEffect(() => {
    s.current = n;
  }), A.useEffect(() => {
    let g = !0, v;
    d.current = !1;
    async function y() {
      const k = s.current;
      try {
        const S = await k.callWS({
          type: "config/entity_registry/get",
          entity_id: i
        });
        if (!S.device_id)
          throw new Error(`Vacuum ${i} is not attached to a device`);
        const w = await k.callWS({ type: "config/entity_registry/list" });
        if (!g) return;
        l({
          vacuumEntityId: i,
          status: "ready",
          index: kS(w, S.device_id, U1())
        }), d.current = !1;
      } catch (S) {
        if (!g) return;
        d.current || (_e.error(
          "Entity discovery failed. Companion controls stay hidden until the entity registry can be read.",
          S
        ), d.current = !0), l({
          vacuumEntityId: i,
          status: "error",
          index: Au
        });
      }
    }
    return y().then(async () => {
      const k = s.current.connection;
      !g || !k || (v = await k.subscribeEvents(() => {
        y();
      }, "entity_registry_updated"), g || v());
    }), () => {
      g = !1, v?.();
    };
  }, [i]);
  const m = o.vacuumEntityId === i, f = m ? o.status : "loading", p = m ? o.index : Au;
  return A.useMemo(() => {
    const g = f === "ready";
    return {
      status: f,
      get: (v, y) => g ? p.entities.get(dd(v, y)) : void 0,
      getRoom: (v, y, k) => g ? p.rooms.get($g(v, y, k)) : void 0,
      extras: g ? p.extras.flatMap((v) => {
        const y = n.states[v.entityId];
        return y ? [{ ...v, friendlyName: wS(y, v.translationKey) }] : [];
      }) : []
    };
  }, [n.states, p, f]);
}
const md = A.createContext(null);
function Gi() {
  const n = A.useContext(md);
  if (!n)
    throw new Error("useVacuumCardContext must be used within VacuumCardProvider");
  return n;
}
function st() {
  return Gi().hass;
}
function Xt() {
  return Gi().entity;
}
function Jl() {
  return Gi().config;
}
function fd() {
  return st().config?.unit_system?.area ?? "m²";
}
function _d() {
  return Gi().isRtl;
}
function Xn() {
  return Gi().machineState;
}
function $t() {
  return Gi().deviceEntities;
}
function pd() {
  const { get: n } = $t();
  return A.useMemo(() => {
    const i = {};
    for (const [o, { platform: l, key: s }] of Object.entries(Gl))
      i[o] = n(l, s);
    return i;
  }, [n]);
}
function ES(n) {
  return n === "no_go" || n === "no_mop" ? n : "zone";
}
function TS(n) {
  try {
    return ES(localStorage.getItem(n));
  } catch {
    return "zone";
  }
}
function zS(n, i) {
  try {
    localStorage.setItem(n, i);
  } catch {
  }
}
function NS(n) {
  try {
    const i = localStorage.getItem(n);
    if (i) {
      const o = parseInt(i, 10);
      if (o >= 1 && o <= 3)
        return o;
    }
  } catch {
  }
  return 1;
}
function AS(n, i) {
  try {
    localStorage.setItem(n, String(i));
  } catch {
  }
}
function CS(n) {
  try {
    localStorage.removeItem(n);
  } catch {
  }
}
function MS({ vacuumEntityId: n, defaultMode: i = Kn.MODE }) {
  const o = Xu(Vu.AREA_SELECTION_MODE, n), l = Xu(Vu.REPEAT_COUNT, n), [s, d] = A.useState(i), [m, f] = A.useState(
    () => TS(o)
  ), [p, g] = A.useState(/* @__PURE__ */ new Map()), [v, y] = A.useState([]), [k, S] = A.useState(!1), [w, N] = A.useState(!1), [M, O] = A.useState(!1), [Y, D] = A.useState(() => NS(l)), Z = A.useCallback((B) => {
    _e.debug("UI", "Mode changed:", B), d(B), g(/* @__PURE__ */ new Map()), y([]);
  }, []), K = A.useCallback(
    (B) => {
      _e.debug("UI", "Area selection mode changed:", B), f(B), zS(o, B), y([]);
    },
    [o]
  ), te = A.useCallback((B, I) => {
    g((F) => {
      const T = new Map(F);
      return F.has(B) ? (_e.debug("UI", "Room deselected:", { roomId: B, roomName: I }), T.delete(B)) : (_e.debug("UI", "Room selected:", { roomId: B, roomName: I }), T.set(B, I)), T;
    });
  }, []), X = A.useCallback((B) => {
    _e.debug("UI", "Cleaning mode modal:", B ? "opened" : "closed"), S(B);
  }, []), ee = A.useCallback((B) => {
    _e.debug("UI", "Shortcuts modal:", B ? "opened" : "closed"), N(B);
  }, []), re = A.useCallback((B) => {
    _e.debug("UI", "Settings panel:", B ? "opened" : "closed"), O(B);
  }, []), me = A.useCallback((B) => {
    _e.debug("UI", "Zones changed:", B), y(B);
  }, []), Q = A.useCallback(() => {
    D((B) => {
      const I = B % 3 + 1;
      return AS(l, I), _e.debug("UI", "Repeat count cycled to", I), I;
    });
  }, [l]), G = A.useCallback(() => {
    D(1), CS(l), _e.debug("UI", "Repeat count reset to 1");
  }, [l]);
  return {
    selectedMode: s,
    areaSelectionMode: m,
    selectedRooms: p,
    selectedZones: v,
    modalOpened: k,
    shortcutsModalOpened: w,
    settingsPanelOpened: M,
    repeatCount: Y,
    setSelectedMode: d,
    setSelectedRooms: g,
    setSelectedZones: me,
    setModalOpened: X,
    setShortcutsModalOpened: ee,
    setSettingsPanelOpened: re,
    handleModeChange: Z,
    handleAreaSelectionModeChange: K,
    handleRoomToggle: te,
    cycleRepeatCount: Q,
    resetRepeatCount: G
  };
}
const OS = {
  // Common
  common: {
    run: "Run",
    start: "Start",
    stop: "Return to Dock",
    cancel: "Cancel",
    save: "Save",
    apply: "Apply",
    reset: "Reset",
    confirm_tap: "Tap again to confirm"
  },
  // Room Selector
  room_selector: {
    title: "Select Rooms",
    selected_count: "{{count}} selected"
  },
  // Map Selector
  map_selector: {
    unknown: "Unknown Map",
    sync_map: "Sync map",
    switching: "Switching…",
    floors_count: "{{count}} floors"
  },
  // Vacuum Map
  vacuum_map: {
    no_map: "No map available",
    diagnostic_no_camera: "Map camera is missing",
    diagnostic_no_rooms: "This map has no rooms",
    diagnostic_bad_calibration: "Map calibration is missing",
    diagnostic_image_failed: "The map image failed to load",
    looking_for: "Looking for: {{entity}}",
    room_overlay: "Click on room numbers to select rooms for cleaning",
    zone_overlay_create: "Drag on the map to draw a cleaning zone, or tap to place one",
    zone_overlay_resize: "Drag to move, use corners or edges to resize, or draw another zone",
    nogo_overlay_create: "Drag on the map to draw a forbidden zone, or tap to place one",
    nogo_overlay_resize: "Drag to move or resize the forbidden zone, then save",
    nomop_overlay_create: "Drag on the map to draw a no-mop zone, or tap to place one",
    nomop_overlay_resize: "Drag to move or resize the no-mop zone, then save",
    clear_zone: "Remove zone",
    clear_all_zones: "Clear all",
    zones_selected: "{{count}} zone",
    zones_selected_plural: "{{count}} zones",
    max_zones_reached: "Maximum {{count}} zones reached",
    switch_to_list: "Switch to list view",
    switch_to_map: "Switch to map view",
    room_list_overlay: "Tap rooms to select for cleaning",
    no_rooms: "No rooms available",
    zoom_in: "Zoom in",
    zoom_out: "Zoom out",
    zoom_reset: "Reset zoom",
    lock_map: "Lock map",
    unlock_map: "Unlock map",
    no_go: "No-Go",
    no_mop: "No-Mop",
    virtual_wall: "Virtual Wall",
    delete_zone: "Delete Restricted Zone",
    switching_floor: "Loading floor map…"
  },
  // Mode Tabs
  modes: {
    room: "Room",
    all: "All",
    zone: "Zone",
    no_go: "No-Go Zone",
    no_mop: "No-Mop Zone"
  },
  // Action Buttons
  actions: {
    clean: "Clean",
    clean_all: "Clean All",
    clean_rooms: "Clean {{count}} Room",
    clean_rooms_plural: "Clean {{count}} Rooms",
    select_rooms: "Select Rooms",
    select_zone: "Select Zone",
    zone_clean: "Zone Clean",
    clean_zones: "Clean {{count}} Zone",
    clean_zones_plural: "Clean {{count}} Zones",
    save_no_go: "Save No-Go Zone",
    save_no_go_plural: "Save {{count}} No-Go Zones",
    save_no_mop: "Save No-Mop Zone",
    save_no_mop_plural: "Save {{count}} No-Mop Zones",
    pause: "Pause",
    resume: "Resume",
    stop: "Return to Dock",
    stop_and_dock: "Return to Dock",
    dock: "Dock"
  },
  // Toast Messages
  toast: {
    selected_room: "Selected {{name}}",
    deselected_room: "Deselected {{name}}",
    paused: "Paused cleaning",
    stopped: "Stopped cleaning",
    docked: "Returning to dock",
    cleaning_started: "Cleaning started",
    resuming: "Resuming cleaning",
    starting_full_clean: "Starting full house cleaning",
    pausing_vacuum: "Pausing vacuum",
    stopping_vacuum: "Stopping vacuum",
    stopping_and_docking: "Stopping and returning to dock",
    vacuum_docking: "Vacuum returning to dock",
    starting_room_clean: "Starting cleaning for {{count}} selected room",
    starting_room_clean_plural: "Starting cleaning for {{count}} selected rooms",
    starting_zone_clean: "Starting zone cleaning",
    select_rooms_first: "Please select rooms to clean first",
    cannot_determine_map: "Cannot determine map dimensions",
    select_zone_first: "Please select a zone on the map",
    zone_saved: "Restricted zone saved",
    no_mop_zone_saved: "No-mop zone saved",
    wall_saved: "Virtual wall saved",
    zone_deleted: "Restricted zone deleted",
    syncing_map: "Syncing map from vacuum…",
    switching_map: "Switching map to {{name}}…",
    map_switch_failed: "Could not switch map",
    map_sync_failed: "Could not sync map",
    operation_failed: "Operation failed: {{error}}"
  },
  // Room Selection Display
  room_display: {
    selected_rooms: "Selected Rooms:",
    selected_label: "Selected:"
  },
  // Cleaning Mode Button
  cleaning_mode_button: {
    prefix_custom: "Custom: ",
    prefix_cleangenius: "CleanGenius: ",
    view_shortcuts: "View shortcuts",
    repeats_tooltip: "Cleaning passes",
    vac_and_mop: "Vac & Mop",
    mop_after_vac: "Mop after Vac",
    vacuum: "Vacuum",
    mop: "Mop"
  },
  // Cleaning Mode Modal
  cleaning_mode: {
    title: "Cleaning Mode",
    clean_genius: "CleanGenius",
    custom: "Custom"
  },
  // Shortcuts Modal
  shortcuts: {
    title: "Shortcuts",
    no_shortcuts: "No shortcuts available",
    create_hint: "Create shortcuts in the Dreame app to quickly start your favorite cleaning routines",
    count: "{{count}} shortcuts",
    start: "Start",
    manage: "Manage {{name}}",
    rename: "Rename",
    delete: "Delete",
    name: "Shortcut name",
    cancel: "Cancel",
    save: "Save",
    working: "Working…",
    action_failed: "The shortcut action failed. Please try again.",
    delete_confirmation: "Delete “{{name}}”? This cannot be undone.",
    unavailable: "Shortcuts are unavailable while the vacuum is offline."
  },
  dock_popup: {
    information: "Dock Information",
    tasks: "Dock Tasks",
    clean_water_tank: "Clean Water Tank",
    used_water_tank: "Used Water Tank",
    dust_bag: "Dust Bag",
    detergent: "Detergent"
  },
  // Custom Mode
  custom_mode: {
    cleaning_mode_title: "Cleaning Mode",
    suction_power_title: "Suction Power",
    max_plus_description: "The suction power will be increased to the highest level, which is a single-use mode.",
    wetness_title: "Wetness",
    mop_pad_humidity_title: "Mop Pad Humidity",
    slightly_dry: "Slightly dry",
    moist: "Moist",
    wet: "Wet",
    water_volume_title: "Water Volume",
    water_low: "Low",
    water_medium: "Medium",
    water_high: "High",
    mop_washing_frequency_title: "Mop-washing frequency",
    route_title: "Route",
    mop_pressure_title: "Mop Pressure",
    mop_temperature_title: "Water Temperature"
  },
  // Mop pressure levels
  mop_pressure: {
    light: "Light",
    normal: "Normal"
  },
  // Mop temperature levels
  mop_temperature: {
    normal: "Normal",
    warm: "Warm"
  },
  // Customize Cleaning Mode
  customize: {
    title: "Customize",
    description: "Set personalized suction and mopping preferences for each area.",
    set_button: "Set",
    vacuum: "Vacuum",
    mop: "Mop",
    vac_and_mop: "Vac & Mop",
    cycles: "Cycles",
    apply_to_all: "Apply to All Rooms",
    click_room_hint: "Click the single area to change the mode.",
    intelligent_recommendation: "Intelligent Recommendation",
    select_room: "Select Room",
    settings_for: "{{room}} Settings",
    no_rooms: "No rooms available"
  },
  // CleanGenius Mode
  cleangenius_mode: {
    cleaning_mode_title: "Cleaning Mode",
    deep_cleaning: "Deep Cleaning"
  },
  // Header
  header: {
    battery: "Battery",
    status: "Status",
    area: "Area",
    time: "Time"
  },
  // Units
  units: {
    square_meters: "m²",
    minutes: "min",
    minutes_short: "m",
    percent: "%",
    decibels: "dBm"
  },
  // Suction Levels (friendly names)
  suction_levels: {
    quiet: "Quiet",
    standard: "Standard",
    strong: "Turbo",
    turbo: "Max"
  },
  // Mop Washing Frequency
  mop_washing_frequency: {
    by_room: "By room",
    by_area: "By area",
    by_time: "By time"
  },
  // Cleaning Routes
  cleaning_routes: {
    quick: "Quick",
    standard: "Standard",
    intensive: "Intensive",
    deep: "Deep"
  },
  // Errors
  errors: {
    entity_not_found: "Entity not found: {{entity}}",
    failed_to_load: "Failed to load entity data",
    service_call_failed: "Failed to send command to vacuum",
    map_transform_unavailable: "Map coordinates are unavailable. Zone cleaning was not started.",
    entity_unavailable: "Vacuum is unavailable",
    entity_discovery_failed: "Couldn't load this vacuum's entities from Home Assistant. Some controls are hidden."
  },
  // Settings Panel
  settings: {
    title: "Settings",
    consumables: {
      title: "Consumables",
      main_brush: "Main Brush",
      side_brush: "Side Brush",
      filter: "Filter",
      sensor: "Sensor",
      mop_pad: "Mop Pad",
      silver_ion: "Silver Ion",
      detergent: "Detergent",
      squeegee: "Squeegee",
      tank_filter: "Tank Filter",
      onboard_dirty_water_tank: "Onboard Dirty Water Tank",
      dirty_water_channel: "Dirty Water Channel",
      deodorizer: "Deodorizer",
      wheel: "Wheel",
      scale_inhibitor: "Scale Inhibitor",
      fluffing_roller: "Fluffing Roller",
      roller_mop_filter: "Roller Mop Filter",
      water_outlet_filter: "Water Outlet Filter",
      remaining: "remaining",
      reset: "Reset"
    },
    more: {
      title: "More"
    },
    device_info: {
      title: "Device Info",
      firmware: "Firmware",
      total_area: "Total Cleaned Area",
      total_time: "Total Cleaning Time",
      total_cleans: "Total Cleanings",
      wifi_ssid: "Wi-Fi Network",
      wifi_signal: "Signal Strength",
      ip_address: "IP Address"
    },
    quick_settings: {
      title: "Quick Settings",
      child_lock: "Child Lock",
      child_lock_desc: "Disable physical buttons on device",
      resume_cleaning: "Resume Cleaning",
      resume_cleaning_desc: "Automatically resume cleaning after charging",
      dnd: "Do Not Disturb",
      dnd_desc: "Quiet hours with reduced activity",
      dnd_start: "Start Time",
      dnd_end: "End Time",
      dnd_disable_resume: "Disable Resume",
      dnd_disable_resume_desc: "Do not resume cleaning during DND",
      dnd_disable_auto_empty: "Disable Auto Empty",
      dnd_disable_auto_empty_desc: "Do not auto empty during DND",
      dnd_reduce_volume: "Reduce Volume",
      dnd_reduce_volume_desc: "Lower device volume during DND"
    },
    volume: {
      title: "Volume & Sound",
      volume: "Volume",
      test_sound: "Locate",
      muted: "Muted",
      voice_assistant: "Voice Assistant",
      voice_assistant_desc: "Enable voice announcements and feedback",
      voice_language: "Voice Language",
      voice_language_desc: "Language for voice announcements",
      streaming_voice_prompt: "Streaming Voice Prompt",
      streaming_voice_prompt_desc: "Real-time voice feedback during cleaning"
    },
    carpet: {
      title: "Carpet Settings",
      carpet_recognition: "Carpet Recognition",
      carpet_recognition_desc: "Detect carpets automatically",
      carpet_avoidance: "Carpet Avoidance",
      carpet_avoidance_desc: "Avoid carpets while mopping",
      clean_carpets_first: "Clean Carpets First",
      clean_carpets_first_desc: "Vacuum carpets before mopping floors",
      carpet_boost: "Carpet Boost",
      carpet_boost_desc: "Increase suction power on carpets",
      intensive_cleaning: "Intensive Cleaning",
      intensive_cleaning_desc: "Deep clean carpets with extra passes",
      side_brush_rotate: "Side Brush Rotate",
      side_brush_rotate_desc: "Rotate side brush on carpets",
      sensitivity: "Carpet Sensitivity",
      sensitivity_desc: "Detection sensitivity level",
      sensitivity_low: "Low",
      sensitivity_medium: "Medium",
      sensitivity_high: "High",
      cleaning_mode: "Carpet Cleaning",
      cleaning_mode_desc: "How to handle carpets during cleaning",
      mode_vacuum: "Vacuum",
      mode_vacuum_and_mop: "Vac & Mop",
      mode_avoidance: "Avoid",
      mode_ignore: "Ignore",
      vacuum_mode: "Vacuum Mode",
      vacuum_adaptation: "Mop Lift",
      vacuum_remove_mop: "Remove Mop"
    },
    floor: {
      title: "Floor Settings",
      obstacle_avoidance: "Obstacle Avoidance",
      obstacle_avoidance_desc: "Use sensors to avoid obstacles",
      collision_avoidance: "Collision Avoidance",
      collision_avoidance_desc: "Slow down near walls and furniture",
      auto_mount_mop: "Auto Mount Mop",
      auto_mount_mop_desc: "Automatically attach mop pad when needed",
      auto_recleaning: "Auto Re-Cleaning",
      auto_recleaning_desc: "Automatically re-clean missed areas",
      recleaning_off: "Off",
      recleaning_in_deep_mode: "In Deep Mode",
      recleaning_in_all_modes: "In All Modes",
      stain_avoidance: "Stain Avoidance",
      stain_avoidance_desc: "Avoid detected stains",
      tight_mopping: "Tight Mopping",
      tight_mopping_desc: "Mop closer to walls and edges",
      floor_direction_cleaning: "Floor Direction Cleaning",
      floor_direction_cleaning_desc: "Clean along the floor grain direction",
      large_particles_boost: "Large Particles Boost",
      large_particles_boost_desc: "Increase suction for large debris",
      pet_focused_cleaning: "Pet Focused Cleaning",
      pet_focused_cleaning_desc: "Extra cleaning in pet areas",
      low_lying_area_frequency: "Low-Lying Area Frequency",
      low_lying_area_frequency_desc: "How often to clean low-lying areas under furniture"
    },
    edge_corner: {
      title: "Edge & Corner",
      side_reach: "Side Reach",
      side_reach_desc: "Extend side brush to reach edges",
      mop_extend: "Mop Extend",
      mop_extend_desc: "Extend mop pad to clean edges and corners",
      gap_cleaning: "Gap Cleaning",
      gap_cleaning_desc: "Clean narrow gaps between furniture",
      mopping_under: "Mop Under Furniture",
      mopping_under_desc: "Extend mop to clean under low furniture",
      extend_frequency: "Extend Frequency",
      extend_frequency_desc: "How often to extend mop for edge cleaning",
      frequency_standard: "Standard",
      frequency_intelligent: "Intelligent",
      frequency_high: "High"
    },
    dock: {
      title: "Dock Settings",
      self_clean: "Self Clean",
      self_clean_desc: "Auto wash mop after cleaning",
      auto_empty_mode: "Auto Empty Mode",
      auto_empty_mode_desc: "When to automatically empty the dustbin",
      auto_empty_frequency: "Auto Empty Frequency",
      auto_empty_frequency_desc: "How many cleanings before auto-emptying",
      empty_off: "Off",
      empty_standard: "Standard",
      empty_high_frequency: "High Frequency",
      empty_low_frequency: "Low Frequency",
      auto_detergent: "Auto Add Detergent",
      auto_detergent_desc: "Automatically add detergent when washing",
      mop_washing_with_detergent: "Mop Washing With Detergent",
      mop_washing_with_detergent_desc: "Use detergent when washing mop pad",
      mopping_with_detergent: "Mopping With Detergent",
      mopping_with_detergent_desc: "Use detergent while mopping floors",
      water_electrolysis: "Water Electrolysis",
      water_electrolysis_desc: "Sterilize water using electrolysis",
      auto_water_refilling: "Auto Water Refilling",
      auto_water_refilling_desc: "Automatically refill clean water tank",
      auto_dust_collecting: "Auto Dust Collecting",
      auto_dust_collecting_desc: "Automatically empty dustbin after cleaning",
      smart_washing: "Smart Mop Washing",
      smart_washing_desc: "Intelligently adjust washing based on dirt level",
      mop_wash_level: "Mop Wash Level",
      mop_wash_level_desc: "Intensity of mop pad washing",
      washing_mode: "Washing Mode",
      washing_mode_desc: "Intensity of mop pad washing",
      washing_light: "Light",
      washing_standard: "Standard",
      washing_deep: "Deep",
      water_temperature: "Water Temperature",
      water_temperature_desc: "Temperature for mop washing",
      temp_normal: "Normal",
      temp_mild: "Mild",
      temp_warm: "Warm",
      temp_hot: "Hot",
      auto_drying: "Auto Drying",
      auto_drying_desc: "Automatically dry mop pad after cleaning",
      drying_time: "Drying Time",
      drying_time_desc: "Duration for mop pad drying",
      auto_rewashing: "Auto Rewashing",
      auto_rewashing_desc: "Automatically rewash mop when dirty",
      rewashing_off: "Off",
      rewashing_in_deep_mode: "In Deep Mode",
      rewashing_in_all_modes: "In All Modes",
      off_peak_charging: "Off-Peak Charging",
      off_peak_charging_desc: "Charge during off-peak hours to save energy",
      off_peak_charging_start: "Start Time",
      off_peak_charging_end: "End Time",
      station_cleaning: "Station Cleaning",
      station_cleaning_desc: "Clean the base station",
      clean_now: "Clean Now",
      self_repair: "Self Repair",
      self_repair_desc: "Run station self-repair diagnostics",
      repair_now: "Repair",
      scraper_frequency: "Scraper Frequency",
      scraper_frequency_desc: "How often to clean the rubber scraper"
    },
    ai_detection: {
      title: "AI & Detection",
      intelligent_recognition: "Intelligent Recognition",
      intelligent_recognition_desc: "AI-powered environment recognition",
      ai_obstacle_detection: "AI Obstacle Detection",
      ai_obstacle_detection_desc: "Use AI to identify and avoid obstacles",
      fuzzy_obstacle_detection: "Fuzzy Obstacle Detection",
      fuzzy_obstacle_detection_desc: "Detect soft or unclear obstacles",
      ai_obstacle_image_upload: "Obstacle Image Upload",
      ai_obstacle_image_upload_desc: "Upload obstacle images for analysis",
      ai_obstacle_picture: "Obstacle Picture",
      ai_obstacle_picture_desc: "Take pictures of detected obstacles",
      ai_pet_detection: "Pet Detection",
      ai_pet_detection_desc: "Detect and avoid pets",
      ai_pet_avoidance: "Pet Avoidance",
      ai_pet_avoidance_desc: "Actively avoid detected pets",
      pet_focused_detection: "Pet Focused Detection",
      pet_focused_detection_desc: "Enhanced detection for pet areas",
      pet_picture: "Pet Picture",
      pet_picture_desc: "Take pictures of detected pets",
      ai_human_detection: "Human Detection",
      ai_human_detection_desc: "Detect and avoid humans",
      human_follow: "Human Follow",
      human_follow_desc: "Follow humans for interactive cleaning",
      ai_furniture_detection: "Furniture Detection",
      ai_furniture_detection_desc: "Detect and navigate around furniture",
      ai_fluid_detection: "Fluid Detection",
      ai_fluid_detection_desc: "Detect and avoid liquids",
      fill_light: "Fill Light",
      fill_light_desc: "Use fill light for better detection",
      camera_light_auto: "Auto Camera Brightness",
      camera_light_auto_desc: "Automatically adjust camera light brightness",
      camera_light_brightness: "Camera Light Brightness",
      camera_light_brightness_desc: "Manual camera light brightness level"
    },
    station_controls: {
      title: "Station Controls",
      self_clean: "Self Clean",
      self_clean_desc: "Start mop pad washing cycle",
      manual_drying: "Manual Drying",
      manual_drying_desc: "Start mop pad drying cycle",
      water_tank_draining: "Drain Water Tank",
      water_tank_draining_desc: "Drain dirty water from tank",
      base_station_cleaning: "Clean Station",
      base_station_cleaning_desc: "Clean the base station",
      empty_water_tank: "Empty Water Tank",
      empty_water_tank_desc: "Empty the water collection tank",
      start_auto_empty: "Auto Empty",
      start_auto_empty_desc: "Start automatic dustbin emptying",
      start_recleaning: "Reclean",
      start_recleaning_desc: "Start recleaning missed areas",
      clear_warning: "Clear Warning",
      clear_warning_desc: "Clear current warning messages"
    },
    map: {
      title: "Map Settings",
      multi_floor: "Multi-Floor Map",
      multi_floor_desc: "Enable support for multiple floor maps",
      rotation: "Map Rotation",
      rotation_desc: "Rotate map orientation",
      mapping_actions: "Mapping Actions",
      start_mapping: "Start Mapping",
      start_fast_mapping: "Fast Mapping"
    }
  }
}, RS = {
  // Common
  common: {
    run: "Çalıştır",
    start: "Başlat",
    stop: "Şarja Dön",
    cancel: "İptal",
    save: "Kaydet",
    apply: "Uygula",
    reset: "Sıfırla",
    confirm_tap: "Onaylamak için tekrar dokunun"
  },
  // Room Selector
  room_selector: {
    title: "Oda Seçimi",
    selected_count: "{{count}} seçildi"
  },
  // Map Selector
  map_selector: {
    unknown: "Bilinmeyen Harita",
    sync_map: "Haritayı yenile",
    switching: "Değiştiriliyor…",
    floors_count: "{{count}} kat"
  },
  // Vacuum Map
  vacuum_map: {
    no_map: "Harita bulunamadı",
    diagnostic_no_camera: "Harita kamerası eksik",
    diagnostic_no_rooms: "Bu haritada oda bulunmuyor",
    diagnostic_bad_calibration: "Harita kalibrasyonu eksik",
    diagnostic_image_failed: "Harita görseli yüklenemedi",
    looking_for: "Aranan: {{entity}}",
    room_overlay: "Temizlenecek odaları seçmek için oda numaralarına dokunun",
    zone_overlay_create: "Temizlik bölgesi çizmek için haritada sürükleyin veya dokunun",
    zone_overlay_resize: "Taşımak için sürükleyin, köşe veya kenarlardan boyutlandırın",
    nogo_overlay_create: "Yasak alan çizmek için haritada sürükleyin veya dokunun",
    nogo_overlay_resize: "Yasak alanı taşıyın veya boyutlandırın, ardından kaydedin",
    nomop_overlay_create: "Paspas yasak alanı çizmek için sürükleyin veya dokunun",
    nomop_overlay_resize: "Paspas yasak alanı taşıyın veya boyutlandırın, ardından kaydedin",
    clear_zone: "Bölgeyi kaldır",
    clear_all_zones: "Tümünü temizle",
    zones_selected: "{{count}} bölge",
    zones_selected_plural: "{{count}} bölge",
    max_zones_reached: "En fazla {{count}} bölge seçilebilir",
    switch_to_list: "Liste görünümüne geç",
    switch_to_map: "Harita görünümüne geç",
    room_list_overlay: "Temizlenecek odaları seçmek için dokunun",
    no_rooms: "Kullanılabilir oda yok",
    zoom_in: "Yakınlaştır",
    zoom_out: "Uzaklaştır",
    zoom_reset: "Yakınlaştırmayı sıfırla",
    lock_map: "Haritayı kilitle",
    unlock_map: "Harita kilidini aç",
    no_go: "Yasak Alan",
    no_mop: "Paspas Yasak",
    virtual_wall: "Sanal Duvar",
    delete_zone: "Yasak Alanı Sil",
    switching_floor: "Kat haritası yükleniyor…"
  },
  // Mode Tabs
  modes: {
    room: "Oda",
    all: "Tümü",
    zone: "Bölge",
    no_go: "Yasak Alan",
    no_mop: "Paspas Yasak"
  },
  // Action Buttons
  actions: {
    clean: "Temizle",
    clean_all: "Tümünü Temizle",
    clean_rooms: "{{count}} Odayı Temizle",
    clean_rooms_plural: "{{count}} Odayı Temizle",
    select_rooms: "Oda Seç",
    select_zone: "Bölge Seç",
    zone_clean: "Bölge Temizliği",
    clean_zones: "{{count}} Bölgeyi Temizle",
    clean_zones_plural: "{{count}} Bölgeyi Temizle",
    save_no_go: "Yasak Alanı Kaydet",
    save_no_go_plural: "{{count}} Yasak Alanı Kaydet",
    save_no_mop: "Paspas Yasak Alanı Kaydet",
    save_no_mop_plural: "{{count}} Paspas Yasak Alanı Kaydet",
    pause: "Duraklat",
    resume: "Devam Et",
    stop: "Şarja Dön",
    stop_and_dock: "Şarja Dön",
    dock: "Şarja Dön"
  },
  // Toast Messages
  toast: {
    selected_room: "{{name}} seçildi",
    deselected_room: "{{name}} seçimi kaldırıldı",
    paused: "Temizlik duraklatıldı",
    stopped: "Temizlik durduruldu",
    docked: "Şarj istasyonuna dönülüyor",
    cleaning_started: "Temizlik başladı",
    resuming: "Temizliğe devam ediliyor",
    starting_full_clean: "Tüm ev temizliği başlatılıyor",
    pausing_vacuum: "Süpürge duraklatılıyor",
    stopping_vacuum: "Süpürge durduruluyor",
    stopping_and_docking: "Durduruluyor ve şarj istasyonuna dönülüyor",
    vacuum_docking: "Süpürge şarj istasyonuna dönüyor",
    starting_room_clean: "Seçili {{count}} oda için temizlik başlatılıyor",
    starting_room_clean_plural: "Seçili {{count}} oda için temizlik başlatılıyor",
    starting_zone_clean: "Bölge temizliği başlatılıyor",
    select_rooms_first: "Lütfen önce temizlenecek odaları seçin",
    cannot_determine_map: "Harita boyutları belirlenemedi",
    select_zone_first: "Lütfen önce haritadan bir bölge seçin",
    zone_saved: "Yasaklı alan kaydedildi",
    no_mop_zone_saved: "Paspas yasak alanı kaydedildi",
    wall_saved: "Sanal duvar kaydedildi",
    zone_deleted: "Yasaklı alan silindi",
    syncing_map: "Harita süpürgeden güncelleniyor…",
    switching_map: "Harita {{name}} olarak değiştiriliyor…",
    map_switch_failed: "Harita değiştirilemedi",
    map_sync_failed: "Harita güncellenemedi",
    operation_failed: "İşlem başarısız: {{error}}"
  },
  // Room Selection Display
  room_display: {
    selected_rooms: "Seçili Odalar:",
    selected_label: "Seçili:"
  },
  // Cleaning Mode Button
  cleaning_mode_button: {
    prefix_custom: "Özel: ",
    prefix_cleangenius: "Özel: ",
    view_shortcuts: "Kısayolları görüntüle",
    repeats_tooltip: "Temizlik tur sayısı",
    vac_and_mop: "Süpür & Paspasla",
    mop_after_vac: "Süpürdükten sonra Paspasla",
    vacuum: "Süpür",
    mop: "Paspasla"
  },
  // Cleaning Mode Modal
  cleaning_mode: {
    title: "Temizlik Modu",
    clean_genius: "Standart",
    custom: "Oda Ayarları"
  },
  // Shortcuts Modal
  shortcuts: {
    title: "Kısayollar",
    no_shortcuts: "Kısayol bulunamadı",
    create_hint: "Botslab uygulamasında favori temizlik rutinleriniz için kısayollar oluşturun",
    count: "{{count}} kısayol",
    start: "Başlat",
    manage: "{{name}} Yönet",
    rename: "Yeniden Adlandır",
    delete: "Sil",
    name: "Kısayol adı",
    cancel: "İptal",
    save: "Kaydet",
    working: "İşleniyor…",
    action_failed: "Kısayol işlemi başarısız oldu. Lütfen tekrar deneyin.",
    delete_confirmation: "“{{name}}” silinsin mi? Bu işlem geri alınamaz.",
    unavailable: "Süpürge çevrimdışıyken kısayollar kullanılamaz."
  },
  dock_popup: {
    information: "İstasyon Bilgisi",
    tasks: "İstasyon Görevleri",
    clean_water_tank: "Temiz Su Deposu",
    used_water_tank: "Kirli Su Deposu",
    dust_bag: "Toz Torbası",
    detergent: "Deterjan"
  },
  // Custom Mode
  custom_mode: {
    cleaning_mode_title: "Temizlik Modu",
    suction_power_title: "Emiş Gücü",
    max_plus_description: "Emiş gücü en yüksek seviyeye çıkarılacaktır.",
    wetness_title: "Su Seviyesi",
    mop_pad_humidity_title: "Paspas Nem Seviyesi",
    slightly_dry: "Hafif Kuru",
    moist: "Nemli",
    wet: "Islak",
    water_volume_title: "Su Miktarı",
    water_low: "Düşük",
    water_medium: "Orta",
    water_high: "Yüksek",
    mop_washing_frequency_title: "Paspas yıkama sıklığı",
    route_title: "Rota",
    mop_pressure_title: "Paspas Basıncı",
    mop_temperature_title: "Su Sıcaklığı"
  },
  // Mop pressure levels
  mop_pressure: {
    light: "Hafif",
    normal: "Normal"
  },
  // Mop temperature levels
  mop_temperature: {
    normal: "Normal",
    warm: "Ilık"
  },
  // Customize Cleaning Mode
  customize: {
    title: "Özelleştir",
    description: "Her oda için emiş gücü, su seviyesi ve tur sayısını özelleştirin.",
    set_button: "Ayarla",
    vacuum: "Süpür",
    mop: "Paspas",
    vac_and_mop: "Süpür & Paspas",
    cycles: "Tur",
    apply_to_all: "Tüm Odalara Uygula",
    click_room_hint: "Ayarları değiştirmek için odaya dokunun.",
    intelligent_recommendation: "Akıllı Öneri",
    select_room: "Oda Seç",
    settings_for: "{{room}} Ayarları",
    no_rooms: "Kullanılabilir oda yok"
  },
  // CleanGenius Mode
  cleangenius_mode: {
    cleaning_mode_title: "Temizlik Modu",
    deep_cleaning: "Derinlemesine Temizlik"
  },
  // Header
  header: {
    battery: "Pil",
    status: "Durum",
    area: "Alan",
    time: "Süre"
  },
  // Units
  units: {
    square_meters: "m²",
    minutes: "dk",
    minutes_short: "d",
    percent: "%",
    decibels: "dBm"
  },
  // Suction Levels
  suction_levels: {
    quiet: "Sessiz",
    standard: "Standart",
    strong: "Güçlü",
    turbo: "Maksimum"
  },
  // Mop Washing Frequency
  mop_washing_frequency: {
    by_room: "Oda başına",
    by_area: "Alana göre",
    by_time: "Süreye göre"
  },
  // Cleaning Routes
  cleaning_routes: {
    quick: "Hızlı",
    standard: "Standart",
    intensive: "Yoğun",
    deep: "Derin"
  },
  // Errors
  errors: {
    entity_not_found: "Varlık bulunamadı: {{entity}}",
    failed_to_load: "Varlık verileri yüklenemedi",
    service_call_failed: "Süpürgeye komut gönderilemedi",
    map_transform_unavailable: "Harita koordinatları kullanılamıyor. Bölge temizliği başlatılamadı.",
    entity_unavailable: "Süpürge kullanılamıyor",
    entity_discovery_failed: "Bu süpürgenin Home Assistant varlıkları yüklenemedi. Bazı kontroller gizlendi."
  },
  // Settings Panel
  settings: {
    title: "Ayarlar",
    consumables: {
      title: "Sarf Malzemeleri",
      main_brush: "Ana Fırça",
      side_brush: "Yan Fırça",
      filter: "Filtre",
      sensor: "Sensör",
      mop_pad: "Paspas Bezi",
      silver_ion: "Gümüş İyon",
      detergent: "Deterjan",
      squeegee: "Silecek",
      tank_filter: "Depo Filtresi",
      onboard_dirty_water_tank: "Dahili Kirli Su Deposu",
      dirty_water_channel: "Kirli Su Kanalı",
      deodorizer: "Koku Giderici",
      wheel: "Tekerlek",
      scale_inhibitor: "Kireç Önleyici",
      fluffing_roller: "Kabarık Silindir",
      roller_mop_filter: "Silindir Paspas Filtresi",
      water_outlet_filter: "Su Çıkış Filtresi",
      remaining: "kaldı",
      reset: "Sıfırla"
    },
    more: {
      title: "Daha Fazla"
    },
    device_info: {
      title: "Cihaz Bilgisi",
      firmware: "Yazılım Sürümü",
      total_area: "Toplam Temizlenen Alan",
      total_time: "Toplam Temizlik Süresi",
      total_cleans: "Toplam Temizlik Sayısı",
      wifi_ssid: "Wi-Fi Ağı",
      wifi_signal: "Sinyal Gücü",
      ip_address: "IP Adresi"
    },
    quick_settings: {
      title: "Hızlı Ayarlar",
      child_lock: "Çocuk Kilidi",
      child_lock_desc: "Cihaz üzerindeki fiziksel tuşları devre dışı bırakır",
      resume_cleaning: "Temizliğe Devam Et",
      resume_cleaning_desc: "Şarj olduktan sonra temizliğe otomatik devam eder",
      dnd: "Rahatsız Etmeyin (DND)",
      dnd_desc: "Belirli saatlerde ses ve ışığı kısar",
      dnd_start: "Başlangıç Saati",
      dnd_end: "Bitiş Saati",
      dnd_disable_resume: "Devam Etmeyi Engelle",
      dnd_disable_resume_desc: "DND sırasında temizliğe devam etmez",
      dnd_disable_auto_empty: "Otomatik Boşaltmayı Engelle",
      dnd_disable_auto_empty_desc: "DND sırasında otomatik toz boşaltmaz",
      dnd_reduce_volume: "Sesi Azalt",
      dnd_reduce_volume_desc: "DND sırasında cihaz sesini düşürür"
    },
    volume: {
      title: "Ses & Bildirim",
      volume: "Ses Seviyesi",
      test_sound: "Konum Bul",
      muted: "Sessiz",
      voice_assistant: "Sesli Bildirim",
      voice_assistant_desc: "Sesli uyarı ve bildirimleri etkinleştir",
      voice_language: "Ses Dili",
      voice_language_desc: "Sesli uyarıların dili",
      streaming_voice_prompt: "Canlı Sesli Bildirim",
      streaming_voice_prompt_desc: "Temizlik sırasında anlık sesli geri bildirim"
    },
    carpet: {
      title: "Halı Ayarları",
      carpet_recognition: "Halı Algılama",
      carpet_recognition_desc: "Halıları otomatik olarak algılar",
      carpet_avoidance: "Halıdan Kaçınma",
      carpet_avoidance_desc: "Paspas yaparken halılardan uzak durur",
      clean_carpets_first: "Önce Halıları Temizle",
      clean_carpets_first_desc: "Paspaslamadan önce halıları süpürür",
      carpet_boost: "Halı Güçlendirici",
      carpet_boost_desc: "Halılarda emiş gücünü otomatik artırır",
      intensive_cleaning: "Yoğun Temizlik",
      intensive_cleaning_desc: "Halılarda ekstra tur ile derinlemesine temizlik",
      side_brush_rotate: "Yan Fırça Dönüşü",
      side_brush_rotate_desc: "Halılarda yan fırçayı döndürür",
      sensitivity: "Halı Algılama Hassasiyeti",
      sensitivity_desc: "Halı algılama hassasiyet düzeyi",
      sensitivity_low: "Düşük",
      sensitivity_medium: "Orta",
      sensitivity_high: "Yüksek",
      cleaning_mode: "Halı Temizlik Modu",
      cleaning_mode_desc: "Temizlik sırasında halılara uygulanacak işlem",
      mode_vacuum: "Süpür",
      mode_vacuum_and_mop: "Süpür & Paspas",
      mode_avoidance: "Kaçın",
      mode_ignore: "Yok Say",
      vacuum_mode: "Süpürme Modu",
      vacuum_adaptation: "Paspası Kaldır",
      vacuum_remove_mop: "Paspası Çıkar"
    },
    floor: {
      title: "Zemin Ayarları",
      obstacle_avoidance: "Engel Kaçınma",
      obstacle_avoidance_desc: "Engellerden kaçınmak için sensörleri kullanır",
      collision_avoidance: "Çarpışma Önleme",
      collision_avoidance_desc: "Duvar ve mobilyaların yakınında yavaşlar",
      auto_mount_mop: "Otomatik Paspas Takma",
      auto_mount_mop_desc: "Gerektiğinde paspas aparatını otomatik takar",
      auto_recleaning: "Otomatik Yeniden Temizleme",
      auto_recleaning_desc: "Gerektiğinde kaçırılan bölgeleri tekrar temizler",
      recleaning_off: "Kapalı",
      recleaning_in_deep_mode: "Derin Modda",
      recleaning_in_all_modes: "Tüm Modlarda",
      stain_avoidance: "Leke Kaçınma",
      stain_avoidance_desc: "Algılanan lekelerden kaçınır",
      tight_mopping: "Kenar Paspaslama",
      tight_mopping_desc: "Duvar ve kenarlara daha yakın paspaslar",
      floor_direction_cleaning: "Zemin Yönünde Temizlik",
      floor_direction_cleaning_desc: "Parke çizgileri boyunca temizler",
      large_particles_boost: "Büyük Parçacık Güçlendirici",
      large_particles_boost_desc: "Büyük kırıntılar için emişi artırır",
      pet_focused_cleaning: "Evcil Hayvan Odaklı Temizlik",
      pet_focused_cleaning_desc: "Evcil hayvan alanlarında ekstra temizlik",
      low_lying_area_frequency: "Alçak Alan Sıklığı",
      low_lying_area_frequency_desc: "Mobilya altı gibi alçak alanları temizleme sıklığı"
    },
    edge_corner: {
      title: "Kenar & Köşe",
      side_reach: "Kenara Ulaşma",
      side_reach_desc: "Kenarlara ulaşmak için yan fırçayı uzatır",
      mop_extend: "Paspas Uzatma",
      mop_extend_desc: "Kenar ve köşeleri temizlemek için paspası dışa uzatır",
      gap_cleaning: "Boşluk Temizliği",
      gap_cleaning_desc: "Mobilyalar arasındaki dar boşlukları temizler",
      mopping_under: "Mobilya Altı Paspaslama",
      mopping_under_desc: "Alçak mobilyaların altını temizlemek için paspası uzatır",
      extend_frequency: "Uzatma Sıklığı",
      extend_frequency_desc: "Kenar temizliği için paspasın ne sıklıkla uzatılacağı",
      frequency_standard: "Standart",
      frequency_intelligent: "Akıllı",
      frequency_high: "Yüksek"
    },
    dock: {
      title: "İstasyon Ayarları",
      self_clean: "Kendi Kendini Temizleme",
      self_clean_desc: "Temizlik sonrası paspası otomatik yıkar",
      auto_empty_mode: "Otomatik Boşaltma Modu",
      auto_empty_mode_desc: "Toz haznesinin ne zaman otomatik boşaltılacağı",
      auto_empty_frequency: "Otomatik Boşaltma Sıklığı",
      auto_empty_frequency_desc: "Kaç temizlikte bir boşaltılacağı",
      empty_off: "Kapalı",
      empty_standard: "Standart",
      empty_high_frequency: "Yüksek Sıklık",
      empty_low_frequency: "Düşük Sıklık",
      auto_detergent: "Otomatik Deterjan Ekleme",
      auto_detergent_desc: "Yıkama sırasında otomatik deterjan ekler",
      mop_washing_with_detergent: "Deterjanlı Paspas Yıkama",
      mop_washing_with_detergent_desc: "Paspası yıkarken deterjan kullanır",
      mopping_with_detergent: "Deterjanlı Paspaslama",
      mopping_with_detergent_desc: "Paspas yaparken deterjan kullanır",
      water_electrolysis: "Su Elektrolizi",
      water_electrolysis_desc: "Elektroliz ile suyu sterilize eder",
      auto_water_refilling: "Otomatik Su Doldurma",
      auto_water_refilling_desc: "Temiz su tankını otomatik doldurur",
      auto_dust_collecting: "Otomatik Toz Toplama",
      auto_dust_collecting_desc: "Temizlikten sonra toz haznesini otomatik boşaltır",
      smart_washing: "Akıllı Paspas Yıkama",
      smart_washing_desc: "Kirlilik seviyesine göre yıkamayı ayarlar",
      mop_wash_level: "Paspas Yıkama Seviyesi",
      mop_wash_level_desc: "Paspas bezi yıkama yoğunluğu",
      washing_mode: "Yıkama Modu",
      washing_mode_desc: "Paspas bezi yıkama yoğunluğu",
      washing_light: "Hafif",
      washing_standard: "Standart",
      washing_deep: "Derin",
      water_temperature: "Su Sıcaklığı",
      water_temperature_desc: "Paspas yıkama suyu sıcaklığı",
      temp_normal: "Normal",
      temp_mild: "Ilık",
      temp_warm: "Sıcak",
      temp_hot: "Çok Sıcak",
      auto_drying: "Otomatik Kurutma",
      auto_drying_desc: "Temizlik sonrasında paspası otomatik kurutur",
      drying_time: "Kurutma Süresi",
      drying_time_desc: "Paspas kurutma süresi",
      auto_rewashing: "Otomatik Yeniden Yıkama",
      auto_rewashing_desc: "Paspas kirliyse otomatik olarak tekrar yıkar",
      rewashing_off: "Kapalı",
      rewashing_in_deep_mode: "Derin Modda",
      rewashing_in_all_modes: "Tüm Modlarda",
      off_peak_charging: "Yoğun Olmayan Saatlerde Şarj",
      off_peak_charging_desc: "Enerji tasarrufu için yoğun olmayan saatlerde şarj eder",
      off_peak_charging_start: "Başlangıç Saati",
      off_peak_charging_end: "Bitiş Saati",
      station_cleaning: "İstasyon Temizliği",
      station_cleaning_desc: "Ana istasyonu temizler",
      clean_now: "Şimdi Temizle",
      self_repair: "Kendi Kendini Onarma",
      self_repair_desc: "İstasyon arıza tespitini çalıştırır",
      repair_now: "Onar",
      scraper_frequency: "Sıyırıcı Sıklığı",
      scraper_frequency_desc: "Kauçuk sıyırıcının ne sıklıkla temizleneceği"
    },
    ai_detection: {
      title: "Yapay Zeka & Algılama",
      intelligent_recognition: "Akıllı Tanıma",
      intelligent_recognition_desc: "Yapay zeka destekli ortam algılama",
      ai_obstacle_detection: "Yapay Zeka Engel Algılama",
      ai_obstacle_detection_desc: "Engelleri tanımak ve kaçınmak için yapay zeka kullanır",
      fuzzy_obstacle_detection: "Belirsiz Engel Algılama",
      fuzzy_obstacle_detection_desc: "Yumuşak veya net olmayan engelleri algılar",
      ai_obstacle_image_upload: "Engel Görseli Yükleme",
      ai_obstacle_image_upload_desc: "Analiz için engel görselleri yükler",
      ai_obstacle_picture: "Engel Fotoğrafı",
      ai_obstacle_picture_desc: "Algılanan engellerin fotoğrafını çeker",
      ai_pet_detection: "Evcil Hayvan Algılama",
      ai_pet_detection_desc: "Evcil hayvanları algılar ve onlardan kaçınır",
      ai_pet_avoidance: "Evcil Hayvandan Kaçınma",
      ai_pet_avoidance_desc: "Algılanan evcil hayvanlardan aktif olarak kaçınır",
      pet_focused_detection: "Evcil Hayvan Odaklı Algılama",
      pet_focused_detection_desc: "Evcil hayvan alanları için gelişmiş algılama",
      pet_picture: "Evcil Hayvan Fotoğrafı",
      pet_picture_desc: "Algılanan evcil hayvanların fotoğrafını çeker",
      ai_human_detection: "İnsan Algılama",
      ai_human_detection_desc: "İnsanları algılar ve onlardan kaçınır",
      human_follow: "İnsan Takibi",
      human_follow_desc: "İnteraktif temizlik için insanları takip eder",
      ai_furniture_detection: "Mobilya Algılama",
      ai_furniture_detection_desc: "Mobilyaları algılar ve etrafında dolaşır",
      ai_fluid_detection: "Sıvı Algılama",
      ai_fluid_detection_desc: "Sıvıları algılar ve onlardan kaçınır",
      fill_light: "Dolgu Işığı",
      fill_light_desc: "Daha iyi algılama için dolgu ışığı kullanır",
      camera_light_auto: "Otomatik Kamera Işığı",
      camera_light_auto_desc: "Kamera ışığı parlaklığını otomatik ayarlar",
      camera_light_brightness: "Kamera Işığı Parlaklığı",
      camera_light_brightness_desc: "Manuel kamera ışığı parlaklık seviyesi"
    },
    station_controls: {
      title: "İstasyon Kontrolleri",
      self_clean: "Kendi Kendini Temizleme",
      self_clean_desc: "Paspas yıkama döngüsünü başlat",
      manual_drying: "Manuel Kurutma",
      manual_drying_desc: "Paspas kurutma döngüsünü başlat",
      water_tank_draining: "Su Deposunu Boşalt",
      water_tank_draining_desc: "Kirli suyu depodan tahliye et",
      base_station_cleaning: "İstasyonu Temizle",
      base_station_cleaning_desc: "Ana istasyonu temizle",
      empty_water_tank: "Su Tankını Boşalt",
      empty_water_tank_desc: "Su toplama tankını boşalt",
      start_auto_empty: "Otomatik Boşalt",
      start_auto_empty_desc: "Otomatik toz boşaltmayı başlat",
      start_recleaning: "Yeniden Temizle",
      start_recleaning_desc: "Kaçırılan alanları yeniden temizlemeyi başlat",
      clear_warning: "Uyarıyı Temizle",
      clear_warning_desc: "Mevcut uyarı mesajlarını temizle"
    },
    map: {
      title: "Harita Ayarları",
      multi_floor: "Çok Katlı Harita",
      multi_floor_desc: "Çoklu kat harita desteğini etkinleştir",
      rotation: "Harita Döndürme",
      rotation_desc: "Harita yönünü döndür",
      mapping_actions: "Haritalama İşlemleri",
      start_mapping: "Haritalamayı Başlat",
      start_fast_mapping: "Hızlı Haritalama"
    }
  }
}, Yl = {
  en: OS,
  tr: RS
}, Bp = new Set(Object.keys(Yl)), jS = {
  en: "en",
  tr: "tr"
};
function DS(n) {
  return n.trim().toLowerCase().replace(/_/g, "-");
}
function $u(n) {
  if (!n) return "en";
  const i = DS(n);
  if (Bp.has(i)) return i;
  const o = i.split("-")[0];
  return Bp.has(o) ? o : "en";
}
function LS(n, i) {
  return $u(n && n !== "auto" ? n : i);
}
function US(n, i) {
  return !n || n === "auto" ? i?.trim() ? i : "en" : jS[$u(n)];
}
const Wl = "botslab_vacuum";
function YS(n) {
  return `component.${Wl}.entity.sensor.state.state.${n}`;
}
function Gp(n) {
  return `component.${Wl}.entity.sensor.error_code.state.${n}`;
}
function ZS(n, i) {
  return `component.${Wl}.entity.${n}.${i}.name`;
}
function Pg(n) {
  return n ? n.charAt(0).toUpperCase() + n.slice(1).replace(/_/g, " ") : "";
}
function Kl(n, i) {
  const o = n[i];
  return typeof o == "string" && o.length > 0 ? o : null;
}
function HS(n, i) {
  return Kl(n, YS(i)) ?? Pg(i);
}
function BS(n, i, o) {
  if (i && i !== "0" && i !== "unknown") {
    const l = Kl(n, Gp(i));
    if (l) return l;
  }
  return typeof o == "string" && o.trim() && o !== "Normal" ? o.trim() : i && i !== "0" ? Kl(n, Gp(i)) ?? Pg(i) : null;
}
function GS({
  resources: n,
  platform: i,
  key: o,
  friendlyName: l,
  chromeLabel: s
}) {
  const d = i === "attribute" ? null : Kl(n, ZS(i, o)), m = l?.trim() ? l : null;
  return d ?? m ?? s;
}
async function KS(n, i) {
  return (await n({
    type: "frontend/get_translations",
    language: i,
    category: "entity",
    integration: [Wl]
  })).resources ?? {};
}
function qS(n, i) {
  return i ? Object.entries(i).reduce((o, [l, s]) => o.replace(new RegExp(`{{${l}}}`, "g"), String(s)), n) : n;
}
function Kp(n, i) {
  return i.split(".").reduce((o, l) => {
    if (o && typeof o == "object" && l in o)
      return o[l];
  }, n);
}
function VS(n = "en") {
  const i = Yl[n] || Yl.en, o = Yl.en;
  return function(s, d) {
    let m = Kp(i, s);
    return typeof m != "string" && (m = Kp(o, s)), typeof m != "string" ? (_e.warn(`Translation key not found: ${s}`), s) : qS(m, d);
  };
}
function XS(n, i) {
  return i === 0 ? n("actions.select_rooms") : n(i === 1 ? "actions.clean_rooms" : "actions.clean_rooms_plural", { count: String(i) });
}
const $S = [];
function Ig(n) {
  return $S.includes(n);
}
function je(n) {
  const i = A.useContext(md), o = n ?? i?.language ?? "en", l = A.useMemo(() => VS(o), [o]);
  return {
    t: l,
    getRoomCountTranslation: (s) => XS(l, s)
  };
}
function PS(n, i, o, l) {
  if (![n, i, o, l].every((f) => Number.isFinite(f) && f > 0))
    return null;
  const s = Math.min(n / o, i / l), d = o * s, m = l * s;
  return { left: (n - d) / 2, top: (i - m) / 2, width: d, height: m };
}
const qp = 5e4;
function gd(n, i, o, l) {
  if (!i)
    return { ok: !1, reason: "no_transform" };
  if (!i.commandSafe)
    return { ok: !1, reason: "estimated_transform" };
  if (!Number.isFinite(o) || !Number.isFinite(l) || o <= 0 || l <= 0)
    return { ok: !1, reason: "invalid_coordinates" };
  const s = Math.min(n.x1, n.x2) / 100 * o, d = Math.max(n.x1, n.x2) / 100 * o, m = Math.min(n.y1, n.y2) / 100 * l, f = Math.max(n.y1, n.y2) / 100 * l, p = [
    i.mapToVacuum({ x: s, y: m }),
    i.mapToVacuum({ x: d, y: m }),
    i.mapToVacuum({ x: d, y: f }),
    i.mapToVacuum({ x: s, y: f })
  ];
  if (p.some((N) => !Number.isFinite(N.x) || !Number.isFinite(N.y)))
    return { ok: !1, reason: "invalid_coordinates" };
  const g = Math.round(Math.min(...p.map((N) => N.x))), v = Math.round(Math.min(...p.map((N) => N.y))), y = Math.round(Math.max(...p.map((N) => N.x))), k = Math.round(Math.max(...p.map((N) => N.y))), S = y - g, w = k - v;
  return S <= 0 || w <= 0 || S > qp || w > qp ? { ok: !1, reason: "unsafe_zone" } : { ok: !0, zone: { x1: g, y1: v, x2: y, y2: k } };
}
function IS(n, i, o, l) {
  const s = [];
  for (const d of n) {
    const m = gd(d, i, o, l);
    if (!m.ok) return m;
    s.push([m.zone.x1, m.zone.y1, m.zone.x2, m.zone.y2]);
  }
  return { ok: !0, zones: s };
}
async function ya(n, i, o, l, s, d) {
  try {
    return await n.callService(i, o, l), !0;
  } catch (m) {
    return _e.error(`Service call failed: ${i}.${o}`, m), s && d && s(d), !1;
  }
}
function FS({
  hass: n,
  entityId: i,
  mapEntityId: o,
  mapTransform: l,
  onSuccess: s,
  onError: d
}) {
  const { t: m } = je(), f = A.useCallback(async () => {
    _e.debug("Vacuum", "Start full clean", i), await ya(
      n,
      "vacuum",
      "start",
      { entity_id: i },
      d,
      m("errors.service_call_failed")
    ) && s?.(m("toast.starting_full_clean"));
  }, [n, i, s, d, m]), p = A.useCallback(async () => {
    _e.debug("Vacuum", "Resume", i), await ya(
      n,
      "vacuum",
      "start",
      { entity_id: i },
      d,
      m("errors.service_call_failed")
    ) && s?.(m("toast.resuming"));
  }, [n, i, s, d, m]), g = A.useCallback(async () => {
    _e.debug("Vacuum", "Pause", i), await ya(
      n,
      "vacuum",
      "pause",
      { entity_id: i },
      d,
      m("errors.service_call_failed")
    ) && s?.(m("toast.pausing_vacuum"));
  }, [n, i, s, d, m]), v = A.useCallback(
    async (M = "stop_and_dock") => {
      _e.debug("Vacuum", "Stop & Return to dock", { entityId: i }), await ya(
        n,
        "vacuum",
        "return_to_base",
        { entity_id: i },
        d,
        m("errors.service_call_failed")
      ) && s?.(m("toast.stopping_and_docking"));
    },
    [n, i, s, d, m]
  ), y = A.useCallback(async () => {
    _e.debug("Vacuum", "Return to dock", i), await ya(
      n,
      "vacuum",
      "return_to_base",
      { entity_id: i },
      d,
      m("errors.service_call_failed")
    ) && s?.(m("toast.vacuum_docking"));
  }, [n, i, s, d, m]), k = A.useCallback(
    async (M, O, Y = 1, D) => {
      _e.debug("Vacuum", "Clean segments", { entityId: i, segments: M, count: O, repeats: Y, roomsConfig: D });
      const Z = {
        entity_id: i,
        room_ids: M,
        repeat_times: Y
      };
      D && Object.keys(D).length > 0 && (Z.rooms_config = D), await ya(
        n,
        "botslab_vacuum",
        "clean_rooms",
        Z,
        d,
        m("errors.service_call_failed")
      ) && s?.(m(O === 1 ? "toast.starting_room_clean" : "toast.starting_room_clean_plural", { count: String(O) }));
    },
    [n, i, s, d, m]
  ), S = A.useCallback(
    async (M, O, Y, D = 1) => {
      _e.debug("Vacuum", "Clean zones - input:", {
        uiZones: M,
        imageWidth: O,
        imageHeight: Y,
        mapEntityId: o,
        repeats: D,
        transformSource: l?.source
      });
      const Z = IS(M, l, O, Y);
      if (!Z.ok) {
        _e.warn("Vacuum", "Zone conversion blocked", {
          reason: Z.reason,
          mapEntityId: o,
          transformSource: l?.source
        }), d?.(m("errors.map_transform_unavailable"));
        return;
      }
      _e.debug("Vacuum", "Clean zones - converted:", Z.zones), await ya(
        n,
        "botslab_vacuum",
        "clean_zone",
        {
          entity_id: i,
          zones: Z.zones,
          repeat_times: D
        },
        d,
        m("errors.service_call_failed")
      ) && s?.(m("toast.starting_zone_clean"));
    },
    [n, i, o, l, s, d, m]
  ), w = A.useCallback(
    async (M, O, Y, D) => {
      if (M.length === 0)
        return d?.(m("toast.select_zone_first")), !1;
      for (const Z of M) {
        const K = gd(Z, l, O, Y);
        if (!K.ok)
          return d?.(m("errors.map_transform_unavailable")), !1;
        if (!await ya(
          n,
          "botslab_vacuum",
          "add_no_go_zone",
          {
            entity_id: i,
            zone_type: D,
            x1: K.zone.x1,
            y1: K.zone.y1,
            x2: K.zone.x2,
            y2: K.zone.y2
          },
          d,
          m("errors.service_call_failed")
        )) return !1;
      }
      return s?.(m(D === "mop" ? "toast.no_mop_zone_saved" : "toast.zone_saved")), !0;
    },
    [n, i, l, s, d, m]
  ), N = A.useCallback(
    async (M, O, Y, D, Z, K = 1, te) => {
      switch (_e.debug("Vacuum", "Handle clean", {
        mode: M,
        selectedRooms: Array.from(O.entries()),
        selectedZones: Y,
        imageWidth: D,
        imageHeight: Z,
        repeats: K,
        roomsConfig: te
      }), M) {
        case "all":
          await f();
          break;
        case "room":
          O.size > 0 ? await k(Array.from(O.keys()), O.size, K, te) : (_e.debug("Vacuum", "No rooms selected"), s?.(m("toast.select_rooms_first")));
          break;
        case "zone":
          Y.length > 0 && D && Z ? await S(Y, D, Z, K) : Y.length > 0 ? (_e.debug("Vacuum", "Zones selected but no image dimensions"), s?.(m("toast.cannot_determine_map"))) : (_e.debug("Vacuum", "No zone selected"), s?.(m("toast.select_zone_first")));
          break;
      }
    },
    [f, k, S, s, m]
  );
  return {
    handleStart: f,
    handleResume: p,
    handlePause: g,
    handleStop: v,
    handleDock: y,
    handleCleanSegments: k,
    handleCleanZone: S,
    handleSaveNoGoZone: w,
    handleClean: N
  };
}
function QS(n = 3e3) {
  const [i, o] = A.useState(null);
  A.useEffect(() => {
    if (i) {
      const d = setTimeout(() => o(null), n);
      return () => clearTimeout(d);
    }
  }, [i, n]);
  const l = A.useCallback((d) => {
    o(d);
  }, []), s = A.useCallback(() => {
    o(null);
  }, []);
  return {
    toast: i,
    showToast: l,
    hideToast: s
  };
}
const JS = /* @__PURE__ */ new Set(["unknown", "unavailable", "none"]);
function Fg(n) {
  return JS.has(n.trim().toLowerCase());
}
function wn(n) {
  return Array.isArray(n) ? n.filter((i) => typeof i == "string" && !Fg(i)) : [];
}
function Qg(n, i) {
  return n.length === i.length && n.every((o, l) => o === i[l]);
}
function Jg(n) {
  const i = wn(n.selectOptions);
  if (i.length > 0)
    return { options: i, clicksEnabled: !0, rememberedOptions: i };
  const o = n.rememberedOptions.length > 0 ? [...n.rememberedOptions] : wn(n.attributeList);
  return { options: o, clicksEnabled: !1, rememberedOptions: o };
}
function WS(n) {
  const i = Jg(n);
  if (n.cleaning) {
    const o = wn(n.fanSpeedList);
    return {
      options: o,
      clicksEnabled: o.length > 0,
      rememberedOptions: i.rememberedOptions,
      highlight: n.fanSpeed,
      sendFanSpeed: !0
    };
  }
  return {
    ...i,
    highlight: n.maxSuctionPower ? "" : n.suctionLevel,
    sendFanSpeed: !1
  };
}
function Jo(n) {
  return n ? {
    value: Fg(n.state) ? null : n.state,
    options: wn(n.attributes.options)
  } : { value: null, options: [] };
}
function cn(n, i) {
  const o = i ? n.states[i] : void 0, l = !!o, s = o ? o.state !== "unavailable" : !1, d = l && !s;
  return {
    entity: o,
    exists: l,
    available: s,
    state: o?.state,
    isOn: o?.state === "on",
    disabled: !l || !s,
    unavailable: d,
    attributes: o?.attributes ?? {}
  };
}
function Tt(n) {
  return n.trim().toLowerCase().replace(/[\s-]+/g, "_");
}
function qn(n) {
  return n.trim().split(/[_\s-]+/).filter(Boolean).map((i) => i.charAt(0).toUpperCase() + i.slice(1).toLowerCase()).join(" ");
}
const Vp = {
  sweeping_and_mopping: "cleaning_mode_button.vac_and_mop",
  mopping_after_sweeping: "cleaning_mode_button.mop_after_vac",
  sweeping: "cleaning_mode_button.vacuum",
  mopping: "cleaning_mode_button.mop",
  customize: "customize.title"
}, ek = {
  sweeping_and_mopping: "Vac & Mop",
  mopping_after_sweeping: "Mop after Vac",
  sweeping: "Vac",
  mopping: "Mop",
  customize: "Customize"
};
function Wg(n, i) {
  const o = Tt(n);
  return i && Vp[o] ? i(Vp[o]) : ek[o] ?? qn(n);
}
const tk = {
  quiet: { key: "suction_levels.quiet", fallback: "Quiet" },
  silent: { key: "suction_levels.quiet", fallback: "Quiet" },
  standard: { key: "suction_levels.standard", fallback: "Standard" },
  strong: { key: "suction_levels.strong", fallback: "Turbo" },
  turbo: { key: "suction_levels.turbo", fallback: "Max" }
};
function eh(n, i) {
  const o = tk[Tt(n)];
  return o ? i ? i(o.key) : o.fallback : qn(n);
}
function th(n) {
  switch (Tt(n)) {
    case "sweeping":
      return I1;
    case "mopping":
      return F1;
    case "sweeping_and_mopping":
      return Kg;
    case "mopping_after_sweeping":
      return Q1;
    case "customize":
      return qg;
    default:
      return "";
  }
}
function nh(n) {
  switch (Tt(n)) {
    case "quiet":
    case "silent":
      return J1;
    case "standard":
      return W1;
    case "strong":
      return eS;
    case "turbo":
      return tS;
    default:
      return "";
  }
}
function nk(n) {
  switch (Tt(n)) {
    case "quick":
      return oS;
    case "standard":
      return rS;
    case "intensive":
      return lS;
    case "deep":
      return sS;
    default:
      return "";
  }
}
function ak(n) {
  switch (Tt(n)) {
    case "by_area":
      return nS;
    case "by_time":
      return aS;
    case "by_room":
      return iS;
    default:
      return "⚙️";
  }
}
function ik(n) {
  return Vg;
}
function ok(n, i) {
  const o = Tt(n);
  if (i)
    switch (o) {
      case "low":
        return i("custom_mode.water_low");
      case "medium":
        return i("custom_mode.water_medium");
      case "high":
        return i("custom_mode.water_high");
    }
  return qn(n);
}
function rk(n) {
  return Vg;
}
function lk(n, i) {
  const o = Tt(n);
  if (i)
    switch (o) {
      case "slightly_dry":
        return i("custom_mode.slightly_dry");
      case "moist":
        return i("custom_mode.moist");
      case "wet":
        return i("custom_mode.wet");
    }
  return qn(n);
}
function $(n, i, o) {
  function l(f, p) {
    if (f._zod || Object.defineProperty(f, "_zod", {
      value: {
        def: p,
        constr: m,
        traits: /* @__PURE__ */ new Set()
      },
      enumerable: !1
    }), f._zod.traits.has(n))
      return;
    f._zod.traits.add(n), i(f, p);
    const g = m.prototype, v = Object.keys(g);
    for (let y = 0; y < v.length; y++) {
      const k = v[y];
      k in f || (f[k] = g[k].bind(f));
    }
  }
  const s = o?.Parent ?? Object;
  class d extends s {
  }
  Object.defineProperty(d, "name", { value: n });
  function m(f) {
    var p;
    const g = o?.Parent ? new d() : this;
    l(g, f), (p = g._zod).deferred ?? (p.deferred = []);
    for (const v of g._zod.deferred)
      v();
    return g;
  }
  return Object.defineProperty(m, "init", { value: l }), Object.defineProperty(m, Symbol.hasInstance, {
    value: (f) => o?.Parent && f instanceof o.Parent ? !0 : f?._zod?.traits?.has(n)
  }), Object.defineProperty(m, "name", { value: n }), m;
}
class Yi extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
class ah extends Error {
  constructor(i) {
    super(`Encountered unidirectional transform during encode: ${i}`), this.name = "ZodEncodeError";
  }
}
const ih = {};
function Sa(n) {
  return ih;
}
function oh(n) {
  const i = Object.values(n).filter((l) => typeof l == "number");
  return Object.entries(n).filter(([l, s]) => i.indexOf(+l) === -1).map(([l, s]) => s);
}
function Pu(n, i) {
  return typeof i == "bigint" ? i.toString() : i;
}
function hd(n) {
  return {
    get value() {
      {
        const i = n();
        return Object.defineProperty(this, "value", { value: i }), i;
      }
    }
  };
}
function vd(n) {
  return n == null;
}
function yd(n) {
  const i = n.startsWith("^") ? 1 : 0, o = n.endsWith("$") ? n.length - 1 : n.length;
  return n.slice(i, o);
}
function sk(n, i) {
  const o = (n.toString().split(".")[1] || "").length, l = i.toString();
  let s = (l.split(".")[1] || "").length;
  if (s === 0 && /\d?e-\d?/.test(l)) {
    const p = l.match(/\d?e-(\d?)/);
    p?.[1] && (s = Number.parseInt(p[1]));
  }
  const d = o > s ? o : s, m = Number.parseInt(n.toFixed(d).replace(".", "")), f = Number.parseInt(i.toFixed(d).replace(".", ""));
  return m % f / 10 ** d;
}
const Xp = /* @__PURE__ */ Symbol("evaluating");
function Ue(n, i, o) {
  let l;
  Object.defineProperty(n, i, {
    get() {
      if (l !== Xp)
        return l === void 0 && (l = Xp, l = o()), l;
    },
    set(s) {
      Object.defineProperty(n, i, {
        value: s
        // configurable: true,
      });
    },
    configurable: !0
  });
}
function Pa(n, i, o) {
  Object.defineProperty(n, i, {
    value: o,
    writable: !0,
    enumerable: !0,
    configurable: !0
  });
}
function xa(...n) {
  const i = {};
  for (const o of n) {
    const l = Object.getOwnPropertyDescriptors(o);
    Object.assign(i, l);
  }
  return Object.defineProperties({}, i);
}
function $p(n) {
  return JSON.stringify(n);
}
function ck(n) {
  return n.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const rh = "captureStackTrace" in Error ? Error.captureStackTrace : (...n) => {
};
function ql(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n);
}
const uk = hd(() => {
  if (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))
    return !1;
  try {
    const n = Function;
    return new n(""), !0;
  } catch {
    return !1;
  }
});
function Zi(n) {
  if (ql(n) === !1)
    return !1;
  const i = n.constructor;
  if (i === void 0 || typeof i != "function")
    return !0;
  const o = i.prototype;
  return !(ql(o) === !1 || Object.prototype.hasOwnProperty.call(o, "isPrototypeOf") === !1);
}
function lh(n) {
  return Zi(n) ? { ...n } : Array.isArray(n) ? [...n] : n;
}
const dk = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function Hi(n) {
  return n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Ea(n, i, o) {
  const l = new n._zod.constr(i ?? n._zod.def);
  return (!i || o?.parent) && (l._zod.parent = n), l;
}
function de(n) {
  const i = n;
  if (!i)
    return {};
  if (typeof i == "string")
    return { error: () => i };
  if (i?.message !== void 0) {
    if (i?.error !== void 0)
      throw new Error("Cannot specify both `message` and `error` params");
    i.error = i.message;
  }
  return delete i.message, typeof i.error == "string" ? { ...i, error: () => i.error } : i;
}
function mk(n) {
  return Object.keys(n).filter((i) => n[i]._zod.optin === "optional" && n[i]._zod.optout === "optional");
}
const fk = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function _k(n, i) {
  const o = n._zod.def, l = o.checks;
  if (l && l.length > 0)
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  const d = xa(n._zod.def, {
    get shape() {
      const m = {};
      for (const f in i) {
        if (!(f in o.shape))
          throw new Error(`Unrecognized key: "${f}"`);
        i[f] && (m[f] = o.shape[f]);
      }
      return Pa(this, "shape", m), m;
    },
    checks: []
  });
  return Ea(n, d);
}
function pk(n, i) {
  const o = n._zod.def, l = o.checks;
  if (l && l.length > 0)
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  const d = xa(n._zod.def, {
    get shape() {
      const m = { ...n._zod.def.shape };
      for (const f in i) {
        if (!(f in o.shape))
          throw new Error(`Unrecognized key: "${f}"`);
        i[f] && delete m[f];
      }
      return Pa(this, "shape", m), m;
    },
    checks: []
  });
  return Ea(n, d);
}
function gk(n, i) {
  if (!Zi(i))
    throw new Error("Invalid input to extend: expected a plain object");
  const o = n._zod.def.checks;
  if (o && o.length > 0) {
    const d = n._zod.def.shape;
    for (const m in i)
      if (Object.getOwnPropertyDescriptor(d, m) !== void 0)
        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
  }
  const s = xa(n._zod.def, {
    get shape() {
      const d = { ...n._zod.def.shape, ...i };
      return Pa(this, "shape", d), d;
    }
  });
  return Ea(n, s);
}
function hk(n, i) {
  if (!Zi(i))
    throw new Error("Invalid input to safeExtend: expected a plain object");
  const o = xa(n._zod.def, {
    get shape() {
      const l = { ...n._zod.def.shape, ...i };
      return Pa(this, "shape", l), l;
    }
  });
  return Ea(n, o);
}
function vk(n, i) {
  const o = xa(n._zod.def, {
    get shape() {
      const l = { ...n._zod.def.shape, ...i._zod.def.shape };
      return Pa(this, "shape", l), l;
    },
    get catchall() {
      return i._zod.def.catchall;
    },
    checks: []
    // delete existing checks
  });
  return Ea(n, o);
}
function yk(n, i, o) {
  const s = i._zod.def.checks;
  if (s && s.length > 0)
    throw new Error(".partial() cannot be used on object schemas containing refinements");
  const m = xa(i._zod.def, {
    get shape() {
      const f = i._zod.def.shape, p = { ...f };
      if (o)
        for (const g in o) {
          if (!(g in f))
            throw new Error(`Unrecognized key: "${g}"`);
          o[g] && (p[g] = n ? new n({
            type: "optional",
            innerType: f[g]
          }) : f[g]);
        }
      else
        for (const g in f)
          p[g] = n ? new n({
            type: "optional",
            innerType: f[g]
          }) : f[g];
      return Pa(this, "shape", p), p;
    },
    checks: []
  });
  return Ea(i, m);
}
function bk(n, i, o) {
  const l = xa(i._zod.def, {
    get shape() {
      const s = i._zod.def.shape, d = { ...s };
      if (o)
        for (const m in o) {
          if (!(m in d))
            throw new Error(`Unrecognized key: "${m}"`);
          o[m] && (d[m] = new n({
            type: "nonoptional",
            innerType: s[m]
          }));
        }
      else
        for (const m in s)
          d[m] = new n({
            type: "nonoptional",
            innerType: s[m]
          });
      return Pa(this, "shape", d), d;
    }
  });
  return Ea(i, l);
}
function Li(n, i = 0) {
  if (n.aborted === !0)
    return !0;
  for (let o = i; o < n.issues.length; o++)
    if (n.issues[o]?.continue !== !0)
      return !0;
  return !1;
}
function Ui(n, i) {
  return i.map((o) => {
    var l;
    return (l = o).path ?? (l.path = []), o.path.unshift(n), o;
  });
}
function xl(n) {
  return typeof n == "string" ? n : n?.message;
}
function ka(n, i, o) {
  const l = { ...n, path: n.path ?? [] };
  if (!n.message) {
    const s = xl(n.inst?._zod.def?.error?.(n)) ?? xl(i?.error?.(n)) ?? xl(o.customError?.(n)) ?? xl(o.localeError?.(n)) ?? "Invalid input";
    l.message = s;
  }
  return delete l.inst, delete l.continue, i?.reportInput || delete l.input, l;
}
function bd(n) {
  return Array.isArray(n) ? "array" : typeof n == "string" ? "string" : "unknown";
}
function $o(...n) {
  const [i, o, l] = n;
  return typeof i == "string" ? {
    message: i,
    code: "custom",
    input: o,
    inst: l
  } : { ...i };
}
const sh = (n, i) => {
  n.name = "$ZodError", Object.defineProperty(n, "_zod", {
    value: n._zod,
    enumerable: !1
  }), Object.defineProperty(n, "issues", {
    value: i,
    enumerable: !1
  }), n.message = JSON.stringify(i, Pu, 2), Object.defineProperty(n, "toString", {
    value: () => n.message,
    enumerable: !1
  });
}, ch = $("$ZodError", sh), uh = $("$ZodError", sh, { Parent: Error });
function Sk(n, i = (o) => o.message) {
  const o = {}, l = [];
  for (const s of n.issues)
    s.path.length > 0 ? (o[s.path[0]] = o[s.path[0]] || [], o[s.path[0]].push(i(s))) : l.push(i(s));
  return { formErrors: l, fieldErrors: o };
}
function kk(n, i = (o) => o.message) {
  const o = { _errors: [] }, l = (s) => {
    for (const d of s.issues)
      if (d.code === "invalid_union" && d.errors.length)
        d.errors.map((m) => l({ issues: m }));
      else if (d.code === "invalid_key")
        l({ issues: d.issues });
      else if (d.code === "invalid_element")
        l({ issues: d.issues });
      else if (d.path.length === 0)
        o._errors.push(i(d));
      else {
        let m = o, f = 0;
        for (; f < d.path.length; ) {
          const p = d.path[f];
          f === d.path.length - 1 ? (m[p] = m[p] || { _errors: [] }, m[p]._errors.push(i(d))) : m[p] = m[p] || { _errors: [] }, m = m[p], f++;
        }
      }
  };
  return l(n), o;
}
const Sd = (n) => (i, o, l, s) => {
  const d = l ? Object.assign(l, { async: !1 }) : { async: !1 }, m = i._zod.run({ value: o, issues: [] }, d);
  if (m instanceof Promise)
    throw new Yi();
  if (m.issues.length) {
    const f = new (s?.Err ?? n)(m.issues.map((p) => ka(p, d, Sa())));
    throw rh(f, s?.callee), f;
  }
  return m.value;
}, kd = (n) => async (i, o, l, s) => {
  const d = l ? Object.assign(l, { async: !0 }) : { async: !0 };
  let m = i._zod.run({ value: o, issues: [] }, d);
  if (m instanceof Promise && (m = await m), m.issues.length) {
    const f = new (s?.Err ?? n)(m.issues.map((p) => ka(p, d, Sa())));
    throw rh(f, s?.callee), f;
  }
  return m.value;
}, es = (n) => (i, o, l) => {
  const s = l ? { ...l, async: !1 } : { async: !1 }, d = i._zod.run({ value: o, issues: [] }, s);
  if (d instanceof Promise)
    throw new Yi();
  return d.issues.length ? {
    success: !1,
    error: new (n ?? ch)(d.issues.map((m) => ka(m, s, Sa())))
  } : { success: !0, data: d.value };
}, wk = /* @__PURE__ */ es(uh), ts = (n) => async (i, o, l) => {
  const s = l ? Object.assign(l, { async: !0 }) : { async: !0 };
  let d = i._zod.run({ value: o, issues: [] }, s);
  return d instanceof Promise && (d = await d), d.issues.length ? {
    success: !1,
    error: new n(d.issues.map((m) => ka(m, s, Sa())))
  } : { success: !0, data: d.value };
}, xk = /* @__PURE__ */ ts(uh), Ek = (n) => (i, o, l) => {
  const s = l ? Object.assign(l, { direction: "backward" }) : { direction: "backward" };
  return Sd(n)(i, o, s);
}, Tk = (n) => (i, o, l) => Sd(n)(i, o, l), zk = (n) => async (i, o, l) => {
  const s = l ? Object.assign(l, { direction: "backward" }) : { direction: "backward" };
  return kd(n)(i, o, s);
}, Nk = (n) => async (i, o, l) => kd(n)(i, o, l), Ak = (n) => (i, o, l) => {
  const s = l ? Object.assign(l, { direction: "backward" }) : { direction: "backward" };
  return es(n)(i, o, s);
}, Ck = (n) => (i, o, l) => es(n)(i, o, l), Mk = (n) => async (i, o, l) => {
  const s = l ? Object.assign(l, { direction: "backward" }) : { direction: "backward" };
  return ts(n)(i, o, s);
}, Ok = (n) => async (i, o, l) => ts(n)(i, o, l), Rk = /^[cC][^\s-]{8,}$/, jk = /^[0-9a-z]+$/, Dk = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, Lk = /^[0-9a-vA-V]{20}$/, Uk = /^[A-Za-z0-9]{27}$/, Yk = /^[a-zA-Z0-9_-]{21}$/, Zk = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, Hk = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, Pp = (n) => n ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${n}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, Bk = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, Gk = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function Kk() {
  return new RegExp(Gk, "u");
}
const qk = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Vk = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, Xk = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, $k = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Pk = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, dh = /^[A-Za-z0-9_-]*$/, Ik = /^\+[1-9]\d{6,14}$/, mh = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", Fk = /* @__PURE__ */ new RegExp(`^${mh}$`);
function fh(n) {
  const i = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof n.precision == "number" ? n.precision === -1 ? `${i}` : n.precision === 0 ? `${i}:[0-5]\\d` : `${i}:[0-5]\\d\\.\\d{${n.precision}}` : `${i}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function Qk(n) {
  return new RegExp(`^${fh(n)}$`);
}
function Jk(n) {
  const i = fh({ precision: n.precision }), o = ["Z"];
  n.local && o.push(""), n.offset && o.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  const l = `${i}(?:${o.join("|")})`;
  return new RegExp(`^${mh}T(?:${l})$`);
}
const Wk = (n) => {
  const i = n ? `[\\s\\S]{${n?.minimum ?? 0},${n?.maximum ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${i}$`);
}, e2 = /^-?\d+$/, _h = /^-?\d+(?:\.\d+)?$/, t2 = /^[^A-Z]*$/, n2 = /^[^a-z]*$/, jt = /* @__PURE__ */ $("$ZodCheck", (n, i) => {
  var o;
  n._zod ?? (n._zod = {}), n._zod.def = i, (o = n._zod).onattach ?? (o.onattach = []);
}), ph = {
  number: "number",
  bigint: "bigint",
  object: "date"
}, gh = /* @__PURE__ */ $("$ZodCheckLessThan", (n, i) => {
  jt.init(n, i);
  const o = ph[typeof i.value];
  n._zod.onattach.push((l) => {
    const s = l._zod.bag, d = (i.inclusive ? s.maximum : s.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    i.value < d && (i.inclusive ? s.maximum = i.value : s.exclusiveMaximum = i.value);
  }), n._zod.check = (l) => {
    (i.inclusive ? l.value <= i.value : l.value < i.value) || l.issues.push({
      origin: o,
      code: "too_big",
      maximum: typeof i.value == "object" ? i.value.getTime() : i.value,
      input: l.value,
      inclusive: i.inclusive,
      inst: n,
      continue: !i.abort
    });
  };
}), hh = /* @__PURE__ */ $("$ZodCheckGreaterThan", (n, i) => {
  jt.init(n, i);
  const o = ph[typeof i.value];
  n._zod.onattach.push((l) => {
    const s = l._zod.bag, d = (i.inclusive ? s.minimum : s.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    i.value > d && (i.inclusive ? s.minimum = i.value : s.exclusiveMinimum = i.value);
  }), n._zod.check = (l) => {
    (i.inclusive ? l.value >= i.value : l.value > i.value) || l.issues.push({
      origin: o,
      code: "too_small",
      minimum: typeof i.value == "object" ? i.value.getTime() : i.value,
      input: l.value,
      inclusive: i.inclusive,
      inst: n,
      continue: !i.abort
    });
  };
}), a2 = /* @__PURE__ */ $("$ZodCheckMultipleOf", (n, i) => {
  jt.init(n, i), n._zod.onattach.push((o) => {
    var l;
    (l = o._zod.bag).multipleOf ?? (l.multipleOf = i.value);
  }), n._zod.check = (o) => {
    if (typeof o.value != typeof i.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    (typeof o.value == "bigint" ? o.value % i.value === BigInt(0) : sk(o.value, i.value) === 0) || o.issues.push({
      origin: typeof o.value,
      code: "not_multiple_of",
      divisor: i.value,
      input: o.value,
      inst: n,
      continue: !i.abort
    });
  };
}), i2 = /* @__PURE__ */ $("$ZodCheckNumberFormat", (n, i) => {
  jt.init(n, i), i.format = i.format || "float64";
  const o = i.format?.includes("int"), l = o ? "int" : "number", [s, d] = fk[i.format];
  n._zod.onattach.push((m) => {
    const f = m._zod.bag;
    f.format = i.format, f.minimum = s, f.maximum = d, o && (f.pattern = e2);
  }), n._zod.check = (m) => {
    const f = m.value;
    if (o) {
      if (!Number.isInteger(f)) {
        m.issues.push({
          expected: l,
          format: i.format,
          code: "invalid_type",
          continue: !1,
          input: f,
          inst: n
        });
        return;
      }
      if (!Number.isSafeInteger(f)) {
        f > 0 ? m.issues.push({
          input: f,
          code: "too_big",
          maximum: Number.MAX_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: n,
          origin: l,
          inclusive: !0,
          continue: !i.abort
        }) : m.issues.push({
          input: f,
          code: "too_small",
          minimum: Number.MIN_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: n,
          origin: l,
          inclusive: !0,
          continue: !i.abort
        });
        return;
      }
    }
    f < s && m.issues.push({
      origin: "number",
      input: f,
      code: "too_small",
      minimum: s,
      inclusive: !0,
      inst: n,
      continue: !i.abort
    }), f > d && m.issues.push({
      origin: "number",
      input: f,
      code: "too_big",
      maximum: d,
      inclusive: !0,
      inst: n,
      continue: !i.abort
    });
  };
}), o2 = /* @__PURE__ */ $("$ZodCheckMaxLength", (n, i) => {
  var o;
  jt.init(n, i), (o = n._zod.def).when ?? (o.when = (l) => {
    const s = l.value;
    return !vd(s) && s.length !== void 0;
  }), n._zod.onattach.push((l) => {
    const s = l._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    i.maximum < s && (l._zod.bag.maximum = i.maximum);
  }), n._zod.check = (l) => {
    const s = l.value;
    if (s.length <= i.maximum)
      return;
    const m = bd(s);
    l.issues.push({
      origin: m,
      code: "too_big",
      maximum: i.maximum,
      inclusive: !0,
      input: s,
      inst: n,
      continue: !i.abort
    });
  };
}), r2 = /* @__PURE__ */ $("$ZodCheckMinLength", (n, i) => {
  var o;
  jt.init(n, i), (o = n._zod.def).when ?? (o.when = (l) => {
    const s = l.value;
    return !vd(s) && s.length !== void 0;
  }), n._zod.onattach.push((l) => {
    const s = l._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    i.minimum > s && (l._zod.bag.minimum = i.minimum);
  }), n._zod.check = (l) => {
    const s = l.value;
    if (s.length >= i.minimum)
      return;
    const m = bd(s);
    l.issues.push({
      origin: m,
      code: "too_small",
      minimum: i.minimum,
      inclusive: !0,
      input: s,
      inst: n,
      continue: !i.abort
    });
  };
}), l2 = /* @__PURE__ */ $("$ZodCheckLengthEquals", (n, i) => {
  var o;
  jt.init(n, i), (o = n._zod.def).when ?? (o.when = (l) => {
    const s = l.value;
    return !vd(s) && s.length !== void 0;
  }), n._zod.onattach.push((l) => {
    const s = l._zod.bag;
    s.minimum = i.length, s.maximum = i.length, s.length = i.length;
  }), n._zod.check = (l) => {
    const s = l.value, d = s.length;
    if (d === i.length)
      return;
    const m = bd(s), f = d > i.length;
    l.issues.push({
      origin: m,
      ...f ? { code: "too_big", maximum: i.length } : { code: "too_small", minimum: i.length },
      inclusive: !0,
      exact: !0,
      input: l.value,
      inst: n,
      continue: !i.abort
    });
  };
}), ns = /* @__PURE__ */ $("$ZodCheckStringFormat", (n, i) => {
  var o, l;
  jt.init(n, i), n._zod.onattach.push((s) => {
    const d = s._zod.bag;
    d.format = i.format, i.pattern && (d.patterns ?? (d.patterns = /* @__PURE__ */ new Set()), d.patterns.add(i.pattern));
  }), i.pattern ? (o = n._zod).check ?? (o.check = (s) => {
    i.pattern.lastIndex = 0, !i.pattern.test(s.value) && s.issues.push({
      origin: "string",
      code: "invalid_format",
      format: i.format,
      input: s.value,
      ...i.pattern ? { pattern: i.pattern.toString() } : {},
      inst: n,
      continue: !i.abort
    });
  }) : (l = n._zod).check ?? (l.check = () => {
  });
}), s2 = /* @__PURE__ */ $("$ZodCheckRegex", (n, i) => {
  ns.init(n, i), n._zod.check = (o) => {
    i.pattern.lastIndex = 0, !i.pattern.test(o.value) && o.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: o.value,
      pattern: i.pattern.toString(),
      inst: n,
      continue: !i.abort
    });
  };
}), c2 = /* @__PURE__ */ $("$ZodCheckLowerCase", (n, i) => {
  i.pattern ?? (i.pattern = t2), ns.init(n, i);
}), u2 = /* @__PURE__ */ $("$ZodCheckUpperCase", (n, i) => {
  i.pattern ?? (i.pattern = n2), ns.init(n, i);
}), d2 = /* @__PURE__ */ $("$ZodCheckIncludes", (n, i) => {
  jt.init(n, i);
  const o = Hi(i.includes), l = new RegExp(typeof i.position == "number" ? `^.{${i.position}}${o}` : o);
  i.pattern = l, n._zod.onattach.push((s) => {
    const d = s._zod.bag;
    d.patterns ?? (d.patterns = /* @__PURE__ */ new Set()), d.patterns.add(l);
  }), n._zod.check = (s) => {
    s.value.includes(i.includes, i.position) || s.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: i.includes,
      input: s.value,
      inst: n,
      continue: !i.abort
    });
  };
}), m2 = /* @__PURE__ */ $("$ZodCheckStartsWith", (n, i) => {
  jt.init(n, i);
  const o = new RegExp(`^${Hi(i.prefix)}.*`);
  i.pattern ?? (i.pattern = o), n._zod.onattach.push((l) => {
    const s = l._zod.bag;
    s.patterns ?? (s.patterns = /* @__PURE__ */ new Set()), s.patterns.add(o);
  }), n._zod.check = (l) => {
    l.value.startsWith(i.prefix) || l.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: i.prefix,
      input: l.value,
      inst: n,
      continue: !i.abort
    });
  };
}), f2 = /* @__PURE__ */ $("$ZodCheckEndsWith", (n, i) => {
  jt.init(n, i);
  const o = new RegExp(`.*${Hi(i.suffix)}$`);
  i.pattern ?? (i.pattern = o), n._zod.onattach.push((l) => {
    const s = l._zod.bag;
    s.patterns ?? (s.patterns = /* @__PURE__ */ new Set()), s.patterns.add(o);
  }), n._zod.check = (l) => {
    l.value.endsWith(i.suffix) || l.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: i.suffix,
      input: l.value,
      inst: n,
      continue: !i.abort
    });
  };
}), _2 = /* @__PURE__ */ $("$ZodCheckOverwrite", (n, i) => {
  jt.init(n, i), n._zod.check = (o) => {
    o.value = i.tx(o.value);
  };
});
class p2 {
  constructor(i = []) {
    this.content = [], this.indent = 0, this && (this.args = i);
  }
  indented(i) {
    this.indent += 1, i(this), this.indent -= 1;
  }
  write(i) {
    if (typeof i == "function") {
      i(this, { execution: "sync" }), i(this, { execution: "async" });
      return;
    }
    const l = i.split(`
`).filter((m) => m), s = Math.min(...l.map((m) => m.length - m.trimStart().length)), d = l.map((m) => m.slice(s)).map((m) => " ".repeat(this.indent * 2) + m);
    for (const m of d)
      this.content.push(m);
  }
  compile() {
    const i = Function, o = this?.args, s = [...(this?.content ?? [""]).map((d) => `  ${d}`)];
    return new i(...o, s.join(`
`));
  }
}
const g2 = {
  major: 4,
  minor: 3,
  patch: 6
}, Je = /* @__PURE__ */ $("$ZodType", (n, i) => {
  var o;
  n ?? (n = {}), n._zod.def = i, n._zod.bag = n._zod.bag || {}, n._zod.version = g2;
  const l = [...n._zod.def.checks ?? []];
  n._zod.traits.has("$ZodCheck") && l.unshift(n);
  for (const s of l)
    for (const d of s._zod.onattach)
      d(n);
  if (l.length === 0)
    (o = n._zod).deferred ?? (o.deferred = []), n._zod.deferred?.push(() => {
      n._zod.run = n._zod.parse;
    });
  else {
    const s = (m, f, p) => {
      let g = Li(m), v;
      for (const y of f) {
        if (y._zod.def.when) {
          if (!y._zod.def.when(m))
            continue;
        } else if (g)
          continue;
        const k = m.issues.length, S = y._zod.check(m);
        if (S instanceof Promise && p?.async === !1)
          throw new Yi();
        if (v || S instanceof Promise)
          v = (v ?? Promise.resolve()).then(async () => {
            await S, m.issues.length !== k && (g || (g = Li(m, k)));
          });
        else {
          if (m.issues.length === k)
            continue;
          g || (g = Li(m, k));
        }
      }
      return v ? v.then(() => m) : m;
    }, d = (m, f, p) => {
      if (Li(m))
        return m.aborted = !0, m;
      const g = s(f, l, p);
      if (g instanceof Promise) {
        if (p.async === !1)
          throw new Yi();
        return g.then((v) => n._zod.parse(v, p));
      }
      return n._zod.parse(g, p);
    };
    n._zod.run = (m, f) => {
      if (f.skipChecks)
        return n._zod.parse(m, f);
      if (f.direction === "backward") {
        const g = n._zod.parse({ value: m.value, issues: [] }, { ...f, skipChecks: !0 });
        return g instanceof Promise ? g.then((v) => d(v, m, f)) : d(g, m, f);
      }
      const p = n._zod.parse(m, f);
      if (p instanceof Promise) {
        if (f.async === !1)
          throw new Yi();
        return p.then((g) => s(g, l, f));
      }
      return s(p, l, f);
    };
  }
  Ue(n, "~standard", () => ({
    validate: (s) => {
      try {
        const d = wk(n, s);
        return d.success ? { value: d.data } : { issues: d.error?.issues };
      } catch {
        return xk(n, s).then((m) => m.success ? { value: m.data } : { issues: m.error?.issues });
      }
    },
    vendor: "zod",
    version: 1
  }));
}), wd = /* @__PURE__ */ $("$ZodString", (n, i) => {
  Je.init(n, i), n._zod.pattern = [...n?._zod.bag?.patterns ?? []].pop() ?? Wk(n._zod.bag), n._zod.parse = (o, l) => {
    if (i.coerce)
      try {
        o.value = String(o.value);
      } catch {
      }
    return typeof o.value == "string" || o.issues.push({
      expected: "string",
      code: "invalid_type",
      input: o.value,
      inst: n
    }), o;
  };
}), $e = /* @__PURE__ */ $("$ZodStringFormat", (n, i) => {
  ns.init(n, i), wd.init(n, i);
}), h2 = /* @__PURE__ */ $("$ZodGUID", (n, i) => {
  i.pattern ?? (i.pattern = Hk), $e.init(n, i);
}), v2 = /* @__PURE__ */ $("$ZodUUID", (n, i) => {
  if (i.version) {
    const l = {
      v1: 1,
      v2: 2,
      v3: 3,
      v4: 4,
      v5: 5,
      v6: 6,
      v7: 7,
      v8: 8
    }[i.version];
    if (l === void 0)
      throw new Error(`Invalid UUID version: "${i.version}"`);
    i.pattern ?? (i.pattern = Pp(l));
  } else
    i.pattern ?? (i.pattern = Pp());
  $e.init(n, i);
}), y2 = /* @__PURE__ */ $("$ZodEmail", (n, i) => {
  i.pattern ?? (i.pattern = Bk), $e.init(n, i);
}), b2 = /* @__PURE__ */ $("$ZodURL", (n, i) => {
  $e.init(n, i), n._zod.check = (o) => {
    try {
      const l = o.value.trim(), s = new URL(l);
      i.hostname && (i.hostname.lastIndex = 0, i.hostname.test(s.hostname) || o.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid hostname",
        pattern: i.hostname.source,
        input: o.value,
        inst: n,
        continue: !i.abort
      })), i.protocol && (i.protocol.lastIndex = 0, i.protocol.test(s.protocol.endsWith(":") ? s.protocol.slice(0, -1) : s.protocol) || o.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid protocol",
        pattern: i.protocol.source,
        input: o.value,
        inst: n,
        continue: !i.abort
      })), i.normalize ? o.value = s.href : o.value = l;
      return;
    } catch {
      o.issues.push({
        code: "invalid_format",
        format: "url",
        input: o.value,
        inst: n,
        continue: !i.abort
      });
    }
  };
}), S2 = /* @__PURE__ */ $("$ZodEmoji", (n, i) => {
  i.pattern ?? (i.pattern = Kk()), $e.init(n, i);
}), k2 = /* @__PURE__ */ $("$ZodNanoID", (n, i) => {
  i.pattern ?? (i.pattern = Yk), $e.init(n, i);
}), w2 = /* @__PURE__ */ $("$ZodCUID", (n, i) => {
  i.pattern ?? (i.pattern = Rk), $e.init(n, i);
}), x2 = /* @__PURE__ */ $("$ZodCUID2", (n, i) => {
  i.pattern ?? (i.pattern = jk), $e.init(n, i);
}), E2 = /* @__PURE__ */ $("$ZodULID", (n, i) => {
  i.pattern ?? (i.pattern = Dk), $e.init(n, i);
}), T2 = /* @__PURE__ */ $("$ZodXID", (n, i) => {
  i.pattern ?? (i.pattern = Lk), $e.init(n, i);
}), z2 = /* @__PURE__ */ $("$ZodKSUID", (n, i) => {
  i.pattern ?? (i.pattern = Uk), $e.init(n, i);
}), N2 = /* @__PURE__ */ $("$ZodISODateTime", (n, i) => {
  i.pattern ?? (i.pattern = Jk(i)), $e.init(n, i);
}), A2 = /* @__PURE__ */ $("$ZodISODate", (n, i) => {
  i.pattern ?? (i.pattern = Fk), $e.init(n, i);
}), C2 = /* @__PURE__ */ $("$ZodISOTime", (n, i) => {
  i.pattern ?? (i.pattern = Qk(i)), $e.init(n, i);
}), M2 = /* @__PURE__ */ $("$ZodISODuration", (n, i) => {
  i.pattern ?? (i.pattern = Zk), $e.init(n, i);
}), O2 = /* @__PURE__ */ $("$ZodIPv4", (n, i) => {
  i.pattern ?? (i.pattern = qk), $e.init(n, i), n._zod.bag.format = "ipv4";
}), R2 = /* @__PURE__ */ $("$ZodIPv6", (n, i) => {
  i.pattern ?? (i.pattern = Vk), $e.init(n, i), n._zod.bag.format = "ipv6", n._zod.check = (o) => {
    try {
      new URL(`http://[${o.value}]`);
    } catch {
      o.issues.push({
        code: "invalid_format",
        format: "ipv6",
        input: o.value,
        inst: n,
        continue: !i.abort
      });
    }
  };
}), j2 = /* @__PURE__ */ $("$ZodCIDRv4", (n, i) => {
  i.pattern ?? (i.pattern = Xk), $e.init(n, i);
}), D2 = /* @__PURE__ */ $("$ZodCIDRv6", (n, i) => {
  i.pattern ?? (i.pattern = $k), $e.init(n, i), n._zod.check = (o) => {
    const l = o.value.split("/");
    try {
      if (l.length !== 2)
        throw new Error();
      const [s, d] = l;
      if (!d)
        throw new Error();
      const m = Number(d);
      if (`${m}` !== d)
        throw new Error();
      if (m < 0 || m > 128)
        throw new Error();
      new URL(`http://[${s}]`);
    } catch {
      o.issues.push({
        code: "invalid_format",
        format: "cidrv6",
        input: o.value,
        inst: n,
        continue: !i.abort
      });
    }
  };
});
function vh(n) {
  if (n === "")
    return !0;
  if (n.length % 4 !== 0)
    return !1;
  try {
    return atob(n), !0;
  } catch {
    return !1;
  }
}
const L2 = /* @__PURE__ */ $("$ZodBase64", (n, i) => {
  i.pattern ?? (i.pattern = Pk), $e.init(n, i), n._zod.bag.contentEncoding = "base64", n._zod.check = (o) => {
    vh(o.value) || o.issues.push({
      code: "invalid_format",
      format: "base64",
      input: o.value,
      inst: n,
      continue: !i.abort
    });
  };
});
function U2(n) {
  if (!dh.test(n))
    return !1;
  const i = n.replace(/[-_]/g, (l) => l === "-" ? "+" : "/"), o = i.padEnd(Math.ceil(i.length / 4) * 4, "=");
  return vh(o);
}
const Y2 = /* @__PURE__ */ $("$ZodBase64URL", (n, i) => {
  i.pattern ?? (i.pattern = dh), $e.init(n, i), n._zod.bag.contentEncoding = "base64url", n._zod.check = (o) => {
    U2(o.value) || o.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: o.value,
      inst: n,
      continue: !i.abort
    });
  };
}), Z2 = /* @__PURE__ */ $("$ZodE164", (n, i) => {
  i.pattern ?? (i.pattern = Ik), $e.init(n, i);
});
function H2(n, i = null) {
  try {
    const o = n.split(".");
    if (o.length !== 3)
      return !1;
    const [l] = o;
    if (!l)
      return !1;
    const s = JSON.parse(atob(l));
    return !("typ" in s && s?.typ !== "JWT" || !s.alg || i && (!("alg" in s) || s.alg !== i));
  } catch {
    return !1;
  }
}
const B2 = /* @__PURE__ */ $("$ZodJWT", (n, i) => {
  $e.init(n, i), n._zod.check = (o) => {
    H2(o.value, i.alg) || o.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: o.value,
      inst: n,
      continue: !i.abort
    });
  };
}), yh = /* @__PURE__ */ $("$ZodNumber", (n, i) => {
  Je.init(n, i), n._zod.pattern = n._zod.bag.pattern ?? _h, n._zod.parse = (o, l) => {
    if (i.coerce)
      try {
        o.value = Number(o.value);
      } catch {
      }
    const s = o.value;
    if (typeof s == "number" && !Number.isNaN(s) && Number.isFinite(s))
      return o;
    const d = typeof s == "number" ? Number.isNaN(s) ? "NaN" : Number.isFinite(s) ? void 0 : "Infinity" : void 0;
    return o.issues.push({
      expected: "number",
      code: "invalid_type",
      input: s,
      inst: n,
      ...d ? { received: d } : {}
    }), o;
  };
}), G2 = /* @__PURE__ */ $("$ZodNumberFormat", (n, i) => {
  i2.init(n, i), yh.init(n, i);
}), K2 = /* @__PURE__ */ $("$ZodUnknown", (n, i) => {
  Je.init(n, i), n._zod.parse = (o) => o;
}), q2 = /* @__PURE__ */ $("$ZodNever", (n, i) => {
  Je.init(n, i), n._zod.parse = (o, l) => (o.issues.push({
    expected: "never",
    code: "invalid_type",
    input: o.value,
    inst: n
  }), o);
});
function Ip(n, i, o) {
  n.issues.length && i.issues.push(...Ui(o, n.issues)), i.value[o] = n.value;
}
const V2 = /* @__PURE__ */ $("$ZodArray", (n, i) => {
  Je.init(n, i), n._zod.parse = (o, l) => {
    const s = o.value;
    if (!Array.isArray(s))
      return o.issues.push({
        expected: "array",
        code: "invalid_type",
        input: s,
        inst: n
      }), o;
    o.value = Array(s.length);
    const d = [];
    for (let m = 0; m < s.length; m++) {
      const f = s[m], p = i.element._zod.run({
        value: f,
        issues: []
      }, l);
      p instanceof Promise ? d.push(p.then((g) => Ip(g, o, m))) : Ip(p, o, m);
    }
    return d.length ? Promise.all(d).then(() => o) : o;
  };
});
function Vl(n, i, o, l, s) {
  if (n.issues.length) {
    if (s && !(o in l))
      return;
    i.issues.push(...Ui(o, n.issues));
  }
  n.value === void 0 ? o in l && (i.value[o] = void 0) : i.value[o] = n.value;
}
function bh(n) {
  const i = Object.keys(n.shape);
  for (const l of i)
    if (!n.shape?.[l]?._zod?.traits?.has("$ZodType"))
      throw new Error(`Invalid element at key "${l}": expected a Zod schema`);
  const o = mk(n.shape);
  return {
    ...n,
    keys: i,
    keySet: new Set(i),
    numKeys: i.length,
    optionalKeys: new Set(o)
  };
}
function Sh(n, i, o, l, s, d) {
  const m = [], f = s.keySet, p = s.catchall._zod, g = p.def.type, v = p.optout === "optional";
  for (const y in i) {
    if (f.has(y))
      continue;
    if (g === "never") {
      m.push(y);
      continue;
    }
    const k = p.run({ value: i[y], issues: [] }, l);
    k instanceof Promise ? n.push(k.then((S) => Vl(S, o, y, i, v))) : Vl(k, o, y, i, v);
  }
  return m.length && o.issues.push({
    code: "unrecognized_keys",
    keys: m,
    input: i,
    inst: d
  }), n.length ? Promise.all(n).then(() => o) : o;
}
const X2 = /* @__PURE__ */ $("$ZodObject", (n, i) => {
  if (Je.init(n, i), !Object.getOwnPropertyDescriptor(i, "shape")?.get) {
    const f = i.shape;
    Object.defineProperty(i, "shape", {
      get: () => {
        const p = { ...f };
        return Object.defineProperty(i, "shape", {
          value: p
        }), p;
      }
    });
  }
  const l = hd(() => bh(i));
  Ue(n._zod, "propValues", () => {
    const f = i.shape, p = {};
    for (const g in f) {
      const v = f[g]._zod;
      if (v.values) {
        p[g] ?? (p[g] = /* @__PURE__ */ new Set());
        for (const y of v.values)
          p[g].add(y);
      }
    }
    return p;
  });
  const s = ql, d = i.catchall;
  let m;
  n._zod.parse = (f, p) => {
    m ?? (m = l.value);
    const g = f.value;
    if (!s(g))
      return f.issues.push({
        expected: "object",
        code: "invalid_type",
        input: g,
        inst: n
      }), f;
    f.value = {};
    const v = [], y = m.shape;
    for (const k of m.keys) {
      const S = y[k], w = S._zod.optout === "optional", N = S._zod.run({ value: g[k], issues: [] }, p);
      N instanceof Promise ? v.push(N.then((M) => Vl(M, f, k, g, w))) : Vl(N, f, k, g, w);
    }
    return d ? Sh(v, g, f, p, l.value, n) : v.length ? Promise.all(v).then(() => f) : f;
  };
}), $2 = /* @__PURE__ */ $("$ZodObjectJIT", (n, i) => {
  X2.init(n, i);
  const o = n._zod.parse, l = hd(() => bh(i)), s = (k) => {
    const S = new p2(["shape", "payload", "ctx"]), w = l.value, N = (D) => {
      const Z = $p(D);
      return `shape[${Z}]._zod.run({ value: input[${Z}], issues: [] }, ctx)`;
    };
    S.write("const input = payload.value;");
    const M = /* @__PURE__ */ Object.create(null);
    let O = 0;
    for (const D of w.keys)
      M[D] = `key_${O++}`;
    S.write("const newResult = {};");
    for (const D of w.keys) {
      const Z = M[D], K = $p(D), X = k[D]?._zod?.optout === "optional";
      S.write(`const ${Z} = ${N(D)};`), X ? S.write(`
        if (${Z}.issues.length) {
          if (${K} in input) {
            payload.issues = payload.issues.concat(${Z}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${K}, ...iss.path] : [${K}]
            })));
          }
        }
        
        if (${Z}.value === undefined) {
          if (${K} in input) {
            newResult[${K}] = undefined;
          }
        } else {
          newResult[${K}] = ${Z}.value;
        }
        
      `) : S.write(`
        if (${Z}.issues.length) {
          payload.issues = payload.issues.concat(${Z}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${K}, ...iss.path] : [${K}]
          })));
        }
        
        if (${Z}.value === undefined) {
          if (${K} in input) {
            newResult[${K}] = undefined;
          }
        } else {
          newResult[${K}] = ${Z}.value;
        }
        
      `);
    }
    S.write("payload.value = newResult;"), S.write("return payload;");
    const Y = S.compile();
    return (D, Z) => Y(k, D, Z);
  };
  let d;
  const m = ql, f = !ih.jitless, g = f && uk.value, v = i.catchall;
  let y;
  n._zod.parse = (k, S) => {
    y ?? (y = l.value);
    const w = k.value;
    return m(w) ? f && g && S?.async === !1 && S.jitless !== !0 ? (d || (d = s(i.shape)), k = d(k, S), v ? Sh([], w, k, S, y, n) : k) : o(k, S) : (k.issues.push({
      expected: "object",
      code: "invalid_type",
      input: w,
      inst: n
    }), k);
  };
});
function Fp(n, i, o, l) {
  for (const d of n)
    if (d.issues.length === 0)
      return i.value = d.value, i;
  const s = n.filter((d) => !Li(d));
  return s.length === 1 ? (i.value = s[0].value, s[0]) : (i.issues.push({
    code: "invalid_union",
    input: i.value,
    inst: o,
    errors: n.map((d) => d.issues.map((m) => ka(m, l, Sa())))
  }), i);
}
const P2 = /* @__PURE__ */ $("$ZodUnion", (n, i) => {
  Je.init(n, i), Ue(n._zod, "optin", () => i.options.some((s) => s._zod.optin === "optional") ? "optional" : void 0), Ue(n._zod, "optout", () => i.options.some((s) => s._zod.optout === "optional") ? "optional" : void 0), Ue(n._zod, "values", () => {
    if (i.options.every((s) => s._zod.values))
      return new Set(i.options.flatMap((s) => Array.from(s._zod.values)));
  }), Ue(n._zod, "pattern", () => {
    if (i.options.every((s) => s._zod.pattern)) {
      const s = i.options.map((d) => d._zod.pattern);
      return new RegExp(`^(${s.map((d) => yd(d.source)).join("|")})$`);
    }
  });
  const o = i.options.length === 1, l = i.options[0]._zod.run;
  n._zod.parse = (s, d) => {
    if (o)
      return l(s, d);
    let m = !1;
    const f = [];
    for (const p of i.options) {
      const g = p._zod.run({
        value: s.value,
        issues: []
      }, d);
      if (g instanceof Promise)
        f.push(g), m = !0;
      else {
        if (g.issues.length === 0)
          return g;
        f.push(g);
      }
    }
    return m ? Promise.all(f).then((p) => Fp(p, s, n, d)) : Fp(f, s, n, d);
  };
}), I2 = /* @__PURE__ */ $("$ZodIntersection", (n, i) => {
  Je.init(n, i), n._zod.parse = (o, l) => {
    const s = o.value, d = i.left._zod.run({ value: s, issues: [] }, l), m = i.right._zod.run({ value: s, issues: [] }, l);
    return d instanceof Promise || m instanceof Promise ? Promise.all([d, m]).then(([p, g]) => Qp(o, p, g)) : Qp(o, d, m);
  };
});
function Iu(n, i) {
  if (n === i)
    return { valid: !0, data: n };
  if (n instanceof Date && i instanceof Date && +n == +i)
    return { valid: !0, data: n };
  if (Zi(n) && Zi(i)) {
    const o = Object.keys(i), l = Object.keys(n).filter((d) => o.indexOf(d) !== -1), s = { ...n, ...i };
    for (const d of l) {
      const m = Iu(n[d], i[d]);
      if (!m.valid)
        return {
          valid: !1,
          mergeErrorPath: [d, ...m.mergeErrorPath]
        };
      s[d] = m.data;
    }
    return { valid: !0, data: s };
  }
  if (Array.isArray(n) && Array.isArray(i)) {
    if (n.length !== i.length)
      return { valid: !1, mergeErrorPath: [] };
    const o = [];
    for (let l = 0; l < n.length; l++) {
      const s = n[l], d = i[l], m = Iu(s, d);
      if (!m.valid)
        return {
          valid: !1,
          mergeErrorPath: [l, ...m.mergeErrorPath]
        };
      o.push(m.data);
    }
    return { valid: !0, data: o };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function Qp(n, i, o) {
  const l = /* @__PURE__ */ new Map();
  let s;
  for (const f of i.issues)
    if (f.code === "unrecognized_keys") {
      s ?? (s = f);
      for (const p of f.keys)
        l.has(p) || l.set(p, {}), l.get(p).l = !0;
    } else
      n.issues.push(f);
  for (const f of o.issues)
    if (f.code === "unrecognized_keys")
      for (const p of f.keys)
        l.has(p) || l.set(p, {}), l.get(p).r = !0;
    else
      n.issues.push(f);
  const d = [...l].filter(([, f]) => f.l && f.r).map(([f]) => f);
  if (d.length && s && n.issues.push({ ...s, keys: d }), Li(n))
    return n;
  const m = Iu(i.value, o.value);
  if (!m.valid)
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(m.mergeErrorPath)}`);
  return n.value = m.data, n;
}
const F2 = /* @__PURE__ */ $("$ZodRecord", (n, i) => {
  Je.init(n, i), n._zod.parse = (o, l) => {
    const s = o.value;
    if (!Zi(s))
      return o.issues.push({
        expected: "record",
        code: "invalid_type",
        input: s,
        inst: n
      }), o;
    const d = [], m = i.keyType._zod.values;
    if (m) {
      o.value = {};
      const f = /* @__PURE__ */ new Set();
      for (const g of m)
        if (typeof g == "string" || typeof g == "number" || typeof g == "symbol") {
          f.add(typeof g == "number" ? g.toString() : g);
          const v = i.valueType._zod.run({ value: s[g], issues: [] }, l);
          v instanceof Promise ? d.push(v.then((y) => {
            y.issues.length && o.issues.push(...Ui(g, y.issues)), o.value[g] = y.value;
          })) : (v.issues.length && o.issues.push(...Ui(g, v.issues)), o.value[g] = v.value);
        }
      let p;
      for (const g in s)
        f.has(g) || (p = p ?? [], p.push(g));
      p && p.length > 0 && o.issues.push({
        code: "unrecognized_keys",
        input: s,
        inst: n,
        keys: p
      });
    } else {
      o.value = {};
      for (const f of Reflect.ownKeys(s)) {
        if (f === "__proto__")
          continue;
        let p = i.keyType._zod.run({ value: f, issues: [] }, l);
        if (p instanceof Promise)
          throw new Error("Async schemas not supported in object keys currently");
        if (typeof f == "string" && _h.test(f) && p.issues.length) {
          const y = i.keyType._zod.run({ value: Number(f), issues: [] }, l);
          if (y instanceof Promise)
            throw new Error("Async schemas not supported in object keys currently");
          y.issues.length === 0 && (p = y);
        }
        if (p.issues.length) {
          i.mode === "loose" ? o.value[f] = s[f] : o.issues.push({
            code: "invalid_key",
            origin: "record",
            issues: p.issues.map((y) => ka(y, l, Sa())),
            input: f,
            path: [f],
            inst: n
          });
          continue;
        }
        const v = i.valueType._zod.run({ value: s[f], issues: [] }, l);
        v instanceof Promise ? d.push(v.then((y) => {
          y.issues.length && o.issues.push(...Ui(f, y.issues)), o.value[p.value] = y.value;
        })) : (v.issues.length && o.issues.push(...Ui(f, v.issues)), o.value[p.value] = v.value);
      }
    }
    return d.length ? Promise.all(d).then(() => o) : o;
  };
}), Q2 = /* @__PURE__ */ $("$ZodEnum", (n, i) => {
  Je.init(n, i);
  const o = oh(i.entries), l = new Set(o);
  n._zod.values = l, n._zod.pattern = new RegExp(`^(${o.filter((s) => dk.has(typeof s)).map((s) => typeof s == "string" ? Hi(s) : s.toString()).join("|")})$`), n._zod.parse = (s, d) => {
    const m = s.value;
    return l.has(m) || s.issues.push({
      code: "invalid_value",
      values: o,
      input: m,
      inst: n
    }), s;
  };
}), J2 = /* @__PURE__ */ $("$ZodLiteral", (n, i) => {
  if (Je.init(n, i), i.values.length === 0)
    throw new Error("Cannot create literal schema with no valid values");
  const o = new Set(i.values);
  n._zod.values = o, n._zod.pattern = new RegExp(`^(${i.values.map((l) => typeof l == "string" ? Hi(l) : l ? Hi(l.toString()) : String(l)).join("|")})$`), n._zod.parse = (l, s) => {
    const d = l.value;
    return o.has(d) || l.issues.push({
      code: "invalid_value",
      values: i.values,
      input: d,
      inst: n
    }), l;
  };
}), W2 = /* @__PURE__ */ $("$ZodTransform", (n, i) => {
  Je.init(n, i), n._zod.parse = (o, l) => {
    if (l.direction === "backward")
      throw new ah(n.constructor.name);
    const s = i.transform(o.value, o);
    if (l.async)
      return (s instanceof Promise ? s : Promise.resolve(s)).then((m) => (o.value = m, o));
    if (s instanceof Promise)
      throw new Yi();
    return o.value = s, o;
  };
});
function Jp(n, i) {
  return n.issues.length && i === void 0 ? { issues: [], value: void 0 } : n;
}
const kh = /* @__PURE__ */ $("$ZodOptional", (n, i) => {
  Je.init(n, i), n._zod.optin = "optional", n._zod.optout = "optional", Ue(n._zod, "values", () => i.innerType._zod.values ? /* @__PURE__ */ new Set([...i.innerType._zod.values, void 0]) : void 0), Ue(n._zod, "pattern", () => {
    const o = i.innerType._zod.pattern;
    return o ? new RegExp(`^(${yd(o.source)})?$`) : void 0;
  }), n._zod.parse = (o, l) => {
    if (i.innerType._zod.optin === "optional") {
      const s = i.innerType._zod.run(o, l);
      return s instanceof Promise ? s.then((d) => Jp(d, o.value)) : Jp(s, o.value);
    }
    return o.value === void 0 ? o : i.innerType._zod.run(o, l);
  };
}), ew = /* @__PURE__ */ $("$ZodExactOptional", (n, i) => {
  kh.init(n, i), Ue(n._zod, "values", () => i.innerType._zod.values), Ue(n._zod, "pattern", () => i.innerType._zod.pattern), n._zod.parse = (o, l) => i.innerType._zod.run(o, l);
}), tw = /* @__PURE__ */ $("$ZodNullable", (n, i) => {
  Je.init(n, i), Ue(n._zod, "optin", () => i.innerType._zod.optin), Ue(n._zod, "optout", () => i.innerType._zod.optout), Ue(n._zod, "pattern", () => {
    const o = i.innerType._zod.pattern;
    return o ? new RegExp(`^(${yd(o.source)}|null)$`) : void 0;
  }), Ue(n._zod, "values", () => i.innerType._zod.values ? /* @__PURE__ */ new Set([...i.innerType._zod.values, null]) : void 0), n._zod.parse = (o, l) => o.value === null ? o : i.innerType._zod.run(o, l);
}), nw = /* @__PURE__ */ $("$ZodDefault", (n, i) => {
  Je.init(n, i), n._zod.optin = "optional", Ue(n._zod, "values", () => i.innerType._zod.values), n._zod.parse = (o, l) => {
    if (l.direction === "backward")
      return i.innerType._zod.run(o, l);
    if (o.value === void 0)
      return o.value = i.defaultValue, o;
    const s = i.innerType._zod.run(o, l);
    return s instanceof Promise ? s.then((d) => Wp(d, i)) : Wp(s, i);
  };
});
function Wp(n, i) {
  return n.value === void 0 && (n.value = i.defaultValue), n;
}
const aw = /* @__PURE__ */ $("$ZodPrefault", (n, i) => {
  Je.init(n, i), n._zod.optin = "optional", Ue(n._zod, "values", () => i.innerType._zod.values), n._zod.parse = (o, l) => (l.direction === "backward" || o.value === void 0 && (o.value = i.defaultValue), i.innerType._zod.run(o, l));
}), iw = /* @__PURE__ */ $("$ZodNonOptional", (n, i) => {
  Je.init(n, i), Ue(n._zod, "values", () => {
    const o = i.innerType._zod.values;
    return o ? new Set([...o].filter((l) => l !== void 0)) : void 0;
  }), n._zod.parse = (o, l) => {
    const s = i.innerType._zod.run(o, l);
    return s instanceof Promise ? s.then((d) => eg(d, n)) : eg(s, n);
  };
});
function eg(n, i) {
  return !n.issues.length && n.value === void 0 && n.issues.push({
    code: "invalid_type",
    expected: "nonoptional",
    input: n.value,
    inst: i
  }), n;
}
const ow = /* @__PURE__ */ $("$ZodCatch", (n, i) => {
  Je.init(n, i), Ue(n._zod, "optin", () => i.innerType._zod.optin), Ue(n._zod, "optout", () => i.innerType._zod.optout), Ue(n._zod, "values", () => i.innerType._zod.values), n._zod.parse = (o, l) => {
    if (l.direction === "backward")
      return i.innerType._zod.run(o, l);
    const s = i.innerType._zod.run(o, l);
    return s instanceof Promise ? s.then((d) => (o.value = d.value, d.issues.length && (o.value = i.catchValue({
      ...o,
      error: {
        issues: d.issues.map((m) => ka(m, l, Sa()))
      },
      input: o.value
    }), o.issues = []), o)) : (o.value = s.value, s.issues.length && (o.value = i.catchValue({
      ...o,
      error: {
        issues: s.issues.map((d) => ka(d, l, Sa()))
      },
      input: o.value
    }), o.issues = []), o);
  };
}), rw = /* @__PURE__ */ $("$ZodPipe", (n, i) => {
  Je.init(n, i), Ue(n._zod, "values", () => i.in._zod.values), Ue(n._zod, "optin", () => i.in._zod.optin), Ue(n._zod, "optout", () => i.out._zod.optout), Ue(n._zod, "propValues", () => i.in._zod.propValues), n._zod.parse = (o, l) => {
    if (l.direction === "backward") {
      const d = i.out._zod.run(o, l);
      return d instanceof Promise ? d.then((m) => El(m, i.in, l)) : El(d, i.in, l);
    }
    const s = i.in._zod.run(o, l);
    return s instanceof Promise ? s.then((d) => El(d, i.out, l)) : El(s, i.out, l);
  };
});
function El(n, i, o) {
  return n.issues.length ? (n.aborted = !0, n) : i._zod.run({ value: n.value, issues: n.issues }, o);
}
const lw = /* @__PURE__ */ $("$ZodReadonly", (n, i) => {
  Je.init(n, i), Ue(n._zod, "propValues", () => i.innerType._zod.propValues), Ue(n._zod, "values", () => i.innerType._zod.values), Ue(n._zod, "optin", () => i.innerType?._zod?.optin), Ue(n._zod, "optout", () => i.innerType?._zod?.optout), n._zod.parse = (o, l) => {
    if (l.direction === "backward")
      return i.innerType._zod.run(o, l);
    const s = i.innerType._zod.run(o, l);
    return s instanceof Promise ? s.then(tg) : tg(s);
  };
});
function tg(n) {
  return n.value = Object.freeze(n.value), n;
}
const sw = /* @__PURE__ */ $("$ZodCustom", (n, i) => {
  jt.init(n, i), Je.init(n, i), n._zod.parse = (o, l) => o, n._zod.check = (o) => {
    const l = o.value, s = i.fn(l);
    if (s instanceof Promise)
      return s.then((d) => ng(d, o, l, n));
    ng(s, o, l, n);
  };
});
function ng(n, i, o, l) {
  if (!n) {
    const s = {
      code: "custom",
      input: o,
      inst: l,
      // incorporates params.error into issue reporting
      path: [...l._zod.def.path ?? []],
      // incorporates params.error into issue reporting
      continue: !l._zod.def.abort
      // params: inst._zod.def.params,
    };
    l._zod.def.params && (s.params = l._zod.def.params), i.issues.push($o(s));
  }
}
var ag;
class cw {
  constructor() {
    this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
  }
  add(i, ...o) {
    const l = o[0];
    return this._map.set(i, l), l && typeof l == "object" && "id" in l && this._idmap.set(l.id, i), this;
  }
  clear() {
    return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
  }
  remove(i) {
    const o = this._map.get(i);
    return o && typeof o == "object" && "id" in o && this._idmap.delete(o.id), this._map.delete(i), this;
  }
  get(i) {
    const o = i._zod.parent;
    if (o) {
      const l = { ...this.get(o) ?? {} };
      delete l.id;
      const s = { ...l, ...this._map.get(i) };
      return Object.keys(s).length ? s : void 0;
    }
    return this._map.get(i);
  }
  has(i) {
    return this._map.has(i);
  }
}
function uw() {
  return new cw();
}
(ag = globalThis).__zod_globalRegistry ?? (ag.__zod_globalRegistry = uw());
const qo = globalThis.__zod_globalRegistry;
// @__NO_SIDE_EFFECTS__
function dw(n, i) {
  return new n({
    type: "string",
    ...de(i)
  });
}
// @__NO_SIDE_EFFECTS__
function mw(n, i) {
  return new n({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...de(i)
  });
}
// @__NO_SIDE_EFFECTS__
function ig(n, i) {
  return new n({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...de(i)
  });
}
// @__NO_SIDE_EFFECTS__
function fw(n, i) {
  return new n({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ...de(i)
  });
}
// @__NO_SIDE_EFFECTS__
function _w(n, i) {
  return new n({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v4",
    ...de(i)
  });
}
// @__NO_SIDE_EFFECTS__
function pw(n, i) {
  return new n({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v6",
    ...de(i)
  });
}
// @__NO_SIDE_EFFECTS__
function gw(n, i) {
  return new n({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v7",
    ...de(i)
  });
}
// @__NO_SIDE_EFFECTS__
function hw(n, i) {
  return new n({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...de(i)
  });
}
// @__NO_SIDE_EFFECTS__
function vw(n, i) {
  return new n({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...de(i)
  });
}
// @__NO_SIDE_EFFECTS__
function yw(n, i) {
  return new n({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...de(i)
  });
}
// @__NO_SIDE_EFFECTS__
function bw(n, i) {
  return new n({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...de(i)
  });
}
// @__NO_SIDE_EFFECTS__
function Sw(n, i) {
  return new n({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...de(i)
  });
}
// @__NO_SIDE_EFFECTS__
function kw(n, i) {
  return new n({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...de(i)
  });
}
// @__NO_SIDE_EFFECTS__
function ww(n, i) {
  return new n({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...de(i)
  });
}
// @__NO_SIDE_EFFECTS__
function xw(n, i) {
  return new n({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...de(i)
  });
}
// @__NO_SIDE_EFFECTS__
function Ew(n, i) {
  return new n({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...de(i)
  });
}
// @__NO_SIDE_EFFECTS__
function Tw(n, i) {
  return new n({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...de(i)
  });
}
// @__NO_SIDE_EFFECTS__
function zw(n, i) {
  return new n({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...de(i)
  });
}
// @__NO_SIDE_EFFECTS__
function Nw(n, i) {
  return new n({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...de(i)
  });
}
// @__NO_SIDE_EFFECTS__
function Aw(n, i) {
  return new n({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...de(i)
  });
}
// @__NO_SIDE_EFFECTS__
function Cw(n, i) {
  return new n({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...de(i)
  });
}
// @__NO_SIDE_EFFECTS__
function Mw(n, i) {
  return new n({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...de(i)
  });
}
// @__NO_SIDE_EFFECTS__
function Ow(n, i) {
  return new n({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...de(i)
  });
}
// @__NO_SIDE_EFFECTS__
function Rw(n, i) {
  return new n({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...de(i)
  });
}
// @__NO_SIDE_EFFECTS__
function jw(n, i) {
  return new n({
    type: "string",
    format: "date",
    check: "string_format",
    ...de(i)
  });
}
// @__NO_SIDE_EFFECTS__
function Dw(n, i) {
  return new n({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...de(i)
  });
}
// @__NO_SIDE_EFFECTS__
function Lw(n, i) {
  return new n({
    type: "string",
    format: "duration",
    check: "string_format",
    ...de(i)
  });
}
// @__NO_SIDE_EFFECTS__
function Uw(n, i) {
  return new n({
    type: "number",
    checks: [],
    ...de(i)
  });
}
// @__NO_SIDE_EFFECTS__
function Yw(n, i) {
  return new n({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "safeint",
    ...de(i)
  });
}
// @__NO_SIDE_EFFECTS__
function Zw(n) {
  return new n({
    type: "unknown"
  });
}
// @__NO_SIDE_EFFECTS__
function Hw(n, i) {
  return new n({
    type: "never",
    ...de(i)
  });
}
// @__NO_SIDE_EFFECTS__
function og(n, i) {
  return new gh({
    check: "less_than",
    ...de(i),
    value: n,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function Cu(n, i) {
  return new gh({
    check: "less_than",
    ...de(i),
    value: n,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function rg(n, i) {
  return new hh({
    check: "greater_than",
    ...de(i),
    value: n,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function Mu(n, i) {
  return new hh({
    check: "greater_than",
    ...de(i),
    value: n,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function lg(n, i) {
  return new a2({
    check: "multiple_of",
    ...de(i),
    value: n
  });
}
// @__NO_SIDE_EFFECTS__
function wh(n, i) {
  return new o2({
    check: "max_length",
    ...de(i),
    maximum: n
  });
}
// @__NO_SIDE_EFFECTS__
function Xl(n, i) {
  return new r2({
    check: "min_length",
    ...de(i),
    minimum: n
  });
}
// @__NO_SIDE_EFFECTS__
function xh(n, i) {
  return new l2({
    check: "length_equals",
    ...de(i),
    length: n
  });
}
// @__NO_SIDE_EFFECTS__
function Bw(n, i) {
  return new s2({
    check: "string_format",
    format: "regex",
    ...de(i),
    pattern: n
  });
}
// @__NO_SIDE_EFFECTS__
function Gw(n) {
  return new c2({
    check: "string_format",
    format: "lowercase",
    ...de(n)
  });
}
// @__NO_SIDE_EFFECTS__
function Kw(n) {
  return new u2({
    check: "string_format",
    format: "uppercase",
    ...de(n)
  });
}
// @__NO_SIDE_EFFECTS__
function qw(n, i) {
  return new d2({
    check: "string_format",
    format: "includes",
    ...de(i),
    includes: n
  });
}
// @__NO_SIDE_EFFECTS__
function Vw(n, i) {
  return new m2({
    check: "string_format",
    format: "starts_with",
    ...de(i),
    prefix: n
  });
}
// @__NO_SIDE_EFFECTS__
function Xw(n, i) {
  return new f2({
    check: "string_format",
    format: "ends_with",
    ...de(i),
    suffix: n
  });
}
// @__NO_SIDE_EFFECTS__
function Ki(n) {
  return new _2({
    check: "overwrite",
    tx: n
  });
}
// @__NO_SIDE_EFFECTS__
function $w(n) {
  return /* @__PURE__ */ Ki((i) => i.normalize(n));
}
// @__NO_SIDE_EFFECTS__
function Pw() {
  return /* @__PURE__ */ Ki((n) => n.trim());
}
// @__NO_SIDE_EFFECTS__
function Iw() {
  return /* @__PURE__ */ Ki((n) => n.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function Fw() {
  return /* @__PURE__ */ Ki((n) => n.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function Qw() {
  return /* @__PURE__ */ Ki((n) => ck(n));
}
// @__NO_SIDE_EFFECTS__
function Jw(n, i, o) {
  return new n({
    type: "array",
    element: i,
    // get element() {
    //   return element;
    // },
    ...de(o)
  });
}
// @__NO_SIDE_EFFECTS__
function Ww(n, i, o) {
  return new n({
    type: "custom",
    check: "custom",
    fn: i,
    ...de(o)
  });
}
// @__NO_SIDE_EFFECTS__
function ex(n) {
  const i = /* @__PURE__ */ tx((o) => (o.addIssue = (l) => {
    if (typeof l == "string")
      o.issues.push($o(l, o.value, i._zod.def));
    else {
      const s = l;
      s.fatal && (s.continue = !1), s.code ?? (s.code = "custom"), s.input ?? (s.input = o.value), s.inst ?? (s.inst = i), s.continue ?? (s.continue = !i._zod.def.abort), o.issues.push($o(s));
    }
  }, n(o.value, o)));
  return i;
}
// @__NO_SIDE_EFFECTS__
function tx(n, i) {
  const o = new jt({
    check: "custom",
    ...de(i)
  });
  return o._zod.check = n, o;
}
function Eh(n) {
  let i = n?.target ?? "draft-2020-12";
  return i === "draft-4" && (i = "draft-04"), i === "draft-7" && (i = "draft-07"), {
    processors: n.processors ?? {},
    metadataRegistry: n?.metadata ?? qo,
    target: i,
    unrepresentable: n?.unrepresentable ?? "throw",
    override: n?.override ?? (() => {
    }),
    io: n?.io ?? "output",
    counter: 0,
    seen: /* @__PURE__ */ new Map(),
    cycles: n?.cycles ?? "ref",
    reused: n?.reused ?? "inline",
    external: n?.external ?? void 0
  };
}
function lt(n, i, o = { path: [], schemaPath: [] }) {
  var l;
  const s = n._zod.def, d = i.seen.get(n);
  if (d)
    return d.count++, o.schemaPath.includes(n) && (d.cycle = o.path), d.schema;
  const m = { schema: {}, count: 1, cycle: void 0, path: o.path };
  i.seen.set(n, m);
  const f = n._zod.toJSONSchema?.();
  if (f)
    m.schema = f;
  else {
    const v = {
      ...o,
      schemaPath: [...o.schemaPath, n],
      path: o.path
    };
    if (n._zod.processJSONSchema)
      n._zod.processJSONSchema(i, m.schema, v);
    else {
      const k = m.schema, S = i.processors[s.type];
      if (!S)
        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${s.type}`);
      S(n, i, k, v);
    }
    const y = n._zod.parent;
    y && (m.ref || (m.ref = y), lt(y, i, v), i.seen.get(y).isParent = !0);
  }
  const p = i.metadataRegistry.get(n);
  return p && Object.assign(m.schema, p), i.io === "input" && xt(n) && (delete m.schema.examples, delete m.schema.default), i.io === "input" && m.schema._prefault && ((l = m.schema).default ?? (l.default = m.schema._prefault)), delete m.schema._prefault, i.seen.get(n).schema;
}
function Th(n, i) {
  const o = n.seen.get(i);
  if (!o)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const l = /* @__PURE__ */ new Map();
  for (const m of n.seen.entries()) {
    const f = n.metadataRegistry.get(m[0])?.id;
    if (f) {
      const p = l.get(f);
      if (p && p !== m[0])
        throw new Error(`Duplicate schema id "${f}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      l.set(f, m[0]);
    }
  }
  const s = (m) => {
    const f = n.target === "draft-2020-12" ? "$defs" : "definitions";
    if (n.external) {
      const y = n.external.registry.get(m[0])?.id, k = n.external.uri ?? ((w) => w);
      if (y)
        return { ref: k(y) };
      const S = m[1].defId ?? m[1].schema.id ?? `schema${n.counter++}`;
      return m[1].defId = S, { defId: S, ref: `${k("__shared")}#/${f}/${S}` };
    }
    if (m[1] === o)
      return { ref: "#" };
    const g = `#/${f}/`, v = m[1].schema.id ?? `__schema${n.counter++}`;
    return { defId: v, ref: g + v };
  }, d = (m) => {
    if (m[1].schema.$ref)
      return;
    const f = m[1], { ref: p, defId: g } = s(m);
    f.def = { ...f.schema }, g && (f.defId = g);
    const v = f.schema;
    for (const y in v)
      delete v[y];
    v.$ref = p;
  };
  if (n.cycles === "throw")
    for (const m of n.seen.entries()) {
      const f = m[1];
      if (f.cycle)
        throw new Error(`Cycle detected: #/${f.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
    }
  for (const m of n.seen.entries()) {
    const f = m[1];
    if (i === m[0]) {
      d(m);
      continue;
    }
    if (n.external) {
      const g = n.external.registry.get(m[0])?.id;
      if (i !== m[0] && g) {
        d(m);
        continue;
      }
    }
    if (n.metadataRegistry.get(m[0])?.id) {
      d(m);
      continue;
    }
    if (f.cycle) {
      d(m);
      continue;
    }
    if (f.count > 1 && n.reused === "ref") {
      d(m);
      continue;
    }
  }
}
function zh(n, i) {
  const o = n.seen.get(i);
  if (!o)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const l = (m) => {
    const f = n.seen.get(m);
    if (f.ref === null)
      return;
    const p = f.def ?? f.schema, g = { ...p }, v = f.ref;
    if (f.ref = null, v) {
      l(v);
      const k = n.seen.get(v), S = k.schema;
      if (S.$ref && (n.target === "draft-07" || n.target === "draft-04" || n.target === "openapi-3.0") ? (p.allOf = p.allOf ?? [], p.allOf.push(S)) : Object.assign(p, S), Object.assign(p, g), m._zod.parent === v)
        for (const N in p)
          N === "$ref" || N === "allOf" || N in g || delete p[N];
      if (S.$ref && k.def)
        for (const N in p)
          N === "$ref" || N === "allOf" || N in k.def && JSON.stringify(p[N]) === JSON.stringify(k.def[N]) && delete p[N];
    }
    const y = m._zod.parent;
    if (y && y !== v) {
      l(y);
      const k = n.seen.get(y);
      if (k?.schema.$ref && (p.$ref = k.schema.$ref, k.def))
        for (const S in p)
          S === "$ref" || S === "allOf" || S in k.def && JSON.stringify(p[S]) === JSON.stringify(k.def[S]) && delete p[S];
    }
    n.override({
      zodSchema: m,
      jsonSchema: p,
      path: f.path ?? []
    });
  };
  for (const m of [...n.seen.entries()].reverse())
    l(m[0]);
  const s = {};
  if (n.target === "draft-2020-12" ? s.$schema = "https://json-schema.org/draft/2020-12/schema" : n.target === "draft-07" ? s.$schema = "http://json-schema.org/draft-07/schema#" : n.target === "draft-04" ? s.$schema = "http://json-schema.org/draft-04/schema#" : n.target, n.external?.uri) {
    const m = n.external.registry.get(i)?.id;
    if (!m)
      throw new Error("Schema is missing an `id` property");
    s.$id = n.external.uri(m);
  }
  Object.assign(s, o.def ?? o.schema);
  const d = n.external?.defs ?? {};
  for (const m of n.seen.entries()) {
    const f = m[1];
    f.def && f.defId && (d[f.defId] = f.def);
  }
  n.external || Object.keys(d).length > 0 && (n.target === "draft-2020-12" ? s.$defs = d : s.definitions = d);
  try {
    const m = JSON.parse(JSON.stringify(s));
    return Object.defineProperty(m, "~standard", {
      value: {
        ...i["~standard"],
        jsonSchema: {
          input: $l(i, "input", n.processors),
          output: $l(i, "output", n.processors)
        }
      },
      enumerable: !1,
      writable: !1
    }), m;
  } catch {
    throw new Error("Error converting schema to JSON.");
  }
}
function xt(n, i) {
  const o = i ?? { seen: /* @__PURE__ */ new Set() };
  if (o.seen.has(n))
    return !1;
  o.seen.add(n);
  const l = n._zod.def;
  if (l.type === "transform")
    return !0;
  if (l.type === "array")
    return xt(l.element, o);
  if (l.type === "set")
    return xt(l.valueType, o);
  if (l.type === "lazy")
    return xt(l.getter(), o);
  if (l.type === "promise" || l.type === "optional" || l.type === "nonoptional" || l.type === "nullable" || l.type === "readonly" || l.type === "default" || l.type === "prefault")
    return xt(l.innerType, o);
  if (l.type === "intersection")
    return xt(l.left, o) || xt(l.right, o);
  if (l.type === "record" || l.type === "map")
    return xt(l.keyType, o) || xt(l.valueType, o);
  if (l.type === "pipe")
    return xt(l.in, o) || xt(l.out, o);
  if (l.type === "object") {
    for (const s in l.shape)
      if (xt(l.shape[s], o))
        return !0;
    return !1;
  }
  if (l.type === "union") {
    for (const s of l.options)
      if (xt(s, o))
        return !0;
    return !1;
  }
  if (l.type === "tuple") {
    for (const s of l.items)
      if (xt(s, o))
        return !0;
    return !!(l.rest && xt(l.rest, o));
  }
  return !1;
}
const nx = (n, i = {}) => (o) => {
  const l = Eh({ ...o, processors: i });
  return lt(n, l), Th(l, n), zh(l, n);
}, $l = (n, i, o = {}) => (l) => {
  const { libraryOptions: s, target: d } = l ?? {}, m = Eh({ ...s ?? {}, target: d, io: i, processors: o });
  return lt(n, m), Th(m, n), zh(m, n);
}, ax = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
  // do not set
}, ix = (n, i, o, l) => {
  const s = o;
  s.type = "string";
  const { minimum: d, maximum: m, format: f, patterns: p, contentEncoding: g } = n._zod.bag;
  if (typeof d == "number" && (s.minLength = d), typeof m == "number" && (s.maxLength = m), f && (s.format = ax[f] ?? f, s.format === "" && delete s.format, f === "time" && delete s.format), g && (s.contentEncoding = g), p && p.size > 0) {
    const v = [...p];
    v.length === 1 ? s.pattern = v[0].source : v.length > 1 && (s.allOf = [
      ...v.map((y) => ({
        ...i.target === "draft-07" || i.target === "draft-04" || i.target === "openapi-3.0" ? { type: "string" } : {},
        pattern: y.source
      }))
    ]);
  }
}, ox = (n, i, o, l) => {
  const s = o, { minimum: d, maximum: m, format: f, multipleOf: p, exclusiveMaximum: g, exclusiveMinimum: v } = n._zod.bag;
  typeof f == "string" && f.includes("int") ? s.type = "integer" : s.type = "number", typeof v == "number" && (i.target === "draft-04" || i.target === "openapi-3.0" ? (s.minimum = v, s.exclusiveMinimum = !0) : s.exclusiveMinimum = v), typeof d == "number" && (s.minimum = d, typeof v == "number" && i.target !== "draft-04" && (v >= d ? delete s.minimum : delete s.exclusiveMinimum)), typeof g == "number" && (i.target === "draft-04" || i.target === "openapi-3.0" ? (s.maximum = g, s.exclusiveMaximum = !0) : s.exclusiveMaximum = g), typeof m == "number" && (s.maximum = m, typeof g == "number" && i.target !== "draft-04" && (g <= m ? delete s.maximum : delete s.exclusiveMaximum)), typeof p == "number" && (s.multipleOf = p);
}, rx = (n, i, o, l) => {
  o.not = {};
}, lx = (n, i, o, l) => {
}, sx = (n, i, o, l) => {
  const s = n._zod.def, d = oh(s.entries);
  d.every((m) => typeof m == "number") && (o.type = "number"), d.every((m) => typeof m == "string") && (o.type = "string"), o.enum = d;
}, cx = (n, i, o, l) => {
  const s = n._zod.def, d = [];
  for (const m of s.values)
    if (m === void 0) {
      if (i.unrepresentable === "throw")
        throw new Error("Literal `undefined` cannot be represented in JSON Schema");
    } else if (typeof m == "bigint") {
      if (i.unrepresentable === "throw")
        throw new Error("BigInt literals cannot be represented in JSON Schema");
      d.push(Number(m));
    } else
      d.push(m);
  if (d.length !== 0) if (d.length === 1) {
    const m = d[0];
    o.type = m === null ? "null" : typeof m, i.target === "draft-04" || i.target === "openapi-3.0" ? o.enum = [m] : o.const = m;
  } else
    d.every((m) => typeof m == "number") && (o.type = "number"), d.every((m) => typeof m == "string") && (o.type = "string"), d.every((m) => typeof m == "boolean") && (o.type = "boolean"), d.every((m) => m === null) && (o.type = "null"), o.enum = d;
}, ux = (n, i, o, l) => {
  if (i.unrepresentable === "throw")
    throw new Error("Custom types cannot be represented in JSON Schema");
}, dx = (n, i, o, l) => {
  if (i.unrepresentable === "throw")
    throw new Error("Transforms cannot be represented in JSON Schema");
}, mx = (n, i, o, l) => {
  const s = o, d = n._zod.def, { minimum: m, maximum: f } = n._zod.bag;
  typeof m == "number" && (s.minItems = m), typeof f == "number" && (s.maxItems = f), s.type = "array", s.items = lt(d.element, i, { ...l, path: [...l.path, "items"] });
}, fx = (n, i, o, l) => {
  const s = o, d = n._zod.def;
  s.type = "object", s.properties = {};
  const m = d.shape;
  for (const g in m)
    s.properties[g] = lt(m[g], i, {
      ...l,
      path: [...l.path, "properties", g]
    });
  const f = new Set(Object.keys(m)), p = new Set([...f].filter((g) => {
    const v = d.shape[g]._zod;
    return i.io === "input" ? v.optin === void 0 : v.optout === void 0;
  }));
  p.size > 0 && (s.required = Array.from(p)), d.catchall?._zod.def.type === "never" ? s.additionalProperties = !1 : d.catchall ? d.catchall && (s.additionalProperties = lt(d.catchall, i, {
    ...l,
    path: [...l.path, "additionalProperties"]
  })) : i.io === "output" && (s.additionalProperties = !1);
}, _x = (n, i, o, l) => {
  const s = n._zod.def, d = s.inclusive === !1, m = s.options.map((f, p) => lt(f, i, {
    ...l,
    path: [...l.path, d ? "oneOf" : "anyOf", p]
  }));
  d ? o.oneOf = m : o.anyOf = m;
}, px = (n, i, o, l) => {
  const s = n._zod.def, d = lt(s.left, i, {
    ...l,
    path: [...l.path, "allOf", 0]
  }), m = lt(s.right, i, {
    ...l,
    path: [...l.path, "allOf", 1]
  }), f = (g) => "allOf" in g && Object.keys(g).length === 1, p = [
    ...f(d) ? d.allOf : [d],
    ...f(m) ? m.allOf : [m]
  ];
  o.allOf = p;
}, gx = (n, i, o, l) => {
  const s = o, d = n._zod.def;
  s.type = "object";
  const m = d.keyType, p = m._zod.bag?.patterns;
  if (d.mode === "loose" && p && p.size > 0) {
    const v = lt(d.valueType, i, {
      ...l,
      path: [...l.path, "patternProperties", "*"]
    });
    s.patternProperties = {};
    for (const y of p)
      s.patternProperties[y.source] = v;
  } else
    (i.target === "draft-07" || i.target === "draft-2020-12") && (s.propertyNames = lt(d.keyType, i, {
      ...l,
      path: [...l.path, "propertyNames"]
    })), s.additionalProperties = lt(d.valueType, i, {
      ...l,
      path: [...l.path, "additionalProperties"]
    });
  const g = m._zod.values;
  if (g) {
    const v = [...g].filter((y) => typeof y == "string" || typeof y == "number");
    v.length > 0 && (s.required = v);
  }
}, hx = (n, i, o, l) => {
  const s = n._zod.def, d = lt(s.innerType, i, l), m = i.seen.get(n);
  i.target === "openapi-3.0" ? (m.ref = s.innerType, o.nullable = !0) : o.anyOf = [d, { type: "null" }];
}, vx = (n, i, o, l) => {
  const s = n._zod.def;
  lt(s.innerType, i, l);
  const d = i.seen.get(n);
  d.ref = s.innerType;
}, yx = (n, i, o, l) => {
  const s = n._zod.def;
  lt(s.innerType, i, l);
  const d = i.seen.get(n);
  d.ref = s.innerType, o.default = JSON.parse(JSON.stringify(s.defaultValue));
}, bx = (n, i, o, l) => {
  const s = n._zod.def;
  lt(s.innerType, i, l);
  const d = i.seen.get(n);
  d.ref = s.innerType, i.io === "input" && (o._prefault = JSON.parse(JSON.stringify(s.defaultValue)));
}, Sx = (n, i, o, l) => {
  const s = n._zod.def;
  lt(s.innerType, i, l);
  const d = i.seen.get(n);
  d.ref = s.innerType;
  let m;
  try {
    m = s.catchValue(void 0);
  } catch {
    throw new Error("Dynamic catch values are not supported in JSON Schema");
  }
  o.default = m;
}, kx = (n, i, o, l) => {
  const s = n._zod.def, d = i.io === "input" ? s.in._zod.def.type === "transform" ? s.out : s.in : s.out;
  lt(d, i, l);
  const m = i.seen.get(n);
  m.ref = d;
}, wx = (n, i, o, l) => {
  const s = n._zod.def;
  lt(s.innerType, i, l);
  const d = i.seen.get(n);
  d.ref = s.innerType, o.readOnly = !0;
}, Nh = (n, i, o, l) => {
  const s = n._zod.def;
  lt(s.innerType, i, l);
  const d = i.seen.get(n);
  d.ref = s.innerType;
}, xx = /* @__PURE__ */ $("ZodISODateTime", (n, i) => {
  N2.init(n, i), Pe.init(n, i);
});
function Ex(n) {
  return /* @__PURE__ */ Rw(xx, n);
}
const Tx = /* @__PURE__ */ $("ZodISODate", (n, i) => {
  A2.init(n, i), Pe.init(n, i);
});
function zx(n) {
  return /* @__PURE__ */ jw(Tx, n);
}
const Nx = /* @__PURE__ */ $("ZodISOTime", (n, i) => {
  C2.init(n, i), Pe.init(n, i);
});
function Ax(n) {
  return /* @__PURE__ */ Dw(Nx, n);
}
const Cx = /* @__PURE__ */ $("ZodISODuration", (n, i) => {
  M2.init(n, i), Pe.init(n, i);
});
function Mx(n) {
  return /* @__PURE__ */ Lw(Cx, n);
}
const Ox = (n, i) => {
  ch.init(n, i), n.name = "ZodError", Object.defineProperties(n, {
    format: {
      value: (o) => kk(n, o)
      // enumerable: false,
    },
    flatten: {
      value: (o) => Sk(n, o)
      // enumerable: false,
    },
    addIssue: {
      value: (o) => {
        n.issues.push(o), n.message = JSON.stringify(n.issues, Pu, 2);
      }
      // enumerable: false,
    },
    addIssues: {
      value: (o) => {
        n.issues.push(...o), n.message = JSON.stringify(n.issues, Pu, 2);
      }
      // enumerable: false,
    },
    isEmpty: {
      get() {
        return n.issues.length === 0;
      }
      // enumerable: false,
    }
  });
}, un = $("ZodError", Ox, {
  Parent: Error
}), Rx = /* @__PURE__ */ Sd(un), jx = /* @__PURE__ */ kd(un), Dx = /* @__PURE__ */ es(un), Lx = /* @__PURE__ */ ts(un), Ux = /* @__PURE__ */ Ek(un), Yx = /* @__PURE__ */ Tk(un), Zx = /* @__PURE__ */ zk(un), Hx = /* @__PURE__ */ Nk(un), Bx = /* @__PURE__ */ Ak(un), Gx = /* @__PURE__ */ Ck(un), Kx = /* @__PURE__ */ Mk(un), qx = /* @__PURE__ */ Ok(un), We = /* @__PURE__ */ $("ZodType", (n, i) => (Je.init(n, i), Object.assign(n["~standard"], {
  jsonSchema: {
    input: $l(n, "input"),
    output: $l(n, "output")
  }
}), n.toJSONSchema = nx(n, {}), n.def = i, n.type = i.type, Object.defineProperty(n, "_def", { value: i }), n.check = (...o) => n.clone(xa(i, {
  checks: [
    ...i.checks ?? [],
    ...o.map((l) => typeof l == "function" ? { _zod: { check: l, def: { check: "custom" }, onattach: [] } } : l)
  ]
}), {
  parent: !0
}), n.with = n.check, n.clone = (o, l) => Ea(n, o, l), n.brand = () => n, n.register = ((o, l) => (o.add(n, l), n)), n.parse = (o, l) => Rx(n, o, l, { callee: n.parse }), n.safeParse = (o, l) => Dx(n, o, l), n.parseAsync = async (o, l) => jx(n, o, l, { callee: n.parseAsync }), n.safeParseAsync = async (o, l) => Lx(n, o, l), n.spa = n.safeParseAsync, n.encode = (o, l) => Ux(n, o, l), n.decode = (o, l) => Yx(n, o, l), n.encodeAsync = async (o, l) => Zx(n, o, l), n.decodeAsync = async (o, l) => Hx(n, o, l), n.safeEncode = (o, l) => Bx(n, o, l), n.safeDecode = (o, l) => Gx(n, o, l), n.safeEncodeAsync = async (o, l) => Kx(n, o, l), n.safeDecodeAsync = async (o, l) => qx(n, o, l), n.refine = (o, l) => n.check(YE(o, l)), n.superRefine = (o) => n.check(ZE(o)), n.overwrite = (o) => n.check(/* @__PURE__ */ Ki(o)), n.optional = () => mg(n), n.exactOptional = () => EE(n), n.nullable = () => fg(n), n.nullish = () => mg(fg(n)), n.nonoptional = (o) => ME(n, o), n.array = () => Fu(n), n.or = (o) => Oh([n, o]), n.and = (o) => hE(n, o), n.transform = (o) => _g(n, wE(o)), n.default = (o) => NE(n, o), n.prefault = (o) => CE(n, o), n.catch = (o) => RE(n, o), n.pipe = (o) => _g(n, o), n.readonly = () => LE(n), n.describe = (o) => {
  const l = n.clone();
  return qo.add(l, { description: o }), l;
}, Object.defineProperty(n, "description", {
  get() {
    return qo.get(n)?.description;
  },
  configurable: !0
}), n.meta = (...o) => {
  if (o.length === 0)
    return qo.get(n);
  const l = n.clone();
  return qo.add(l, o[0]), l;
}, n.isOptional = () => n.safeParse(void 0).success, n.isNullable = () => n.safeParse(null).success, n.apply = (o) => o(n), n)), Ah = /* @__PURE__ */ $("_ZodString", (n, i) => {
  wd.init(n, i), We.init(n, i), n._zod.processJSONSchema = (l, s, d) => ix(n, l, s);
  const o = n._zod.bag;
  n.format = o.format ?? null, n.minLength = o.minimum ?? null, n.maxLength = o.maximum ?? null, n.regex = (...l) => n.check(/* @__PURE__ */ Bw(...l)), n.includes = (...l) => n.check(/* @__PURE__ */ qw(...l)), n.startsWith = (...l) => n.check(/* @__PURE__ */ Vw(...l)), n.endsWith = (...l) => n.check(/* @__PURE__ */ Xw(...l)), n.min = (...l) => n.check(/* @__PURE__ */ Xl(...l)), n.max = (...l) => n.check(/* @__PURE__ */ wh(...l)), n.length = (...l) => n.check(/* @__PURE__ */ xh(...l)), n.nonempty = (...l) => n.check(/* @__PURE__ */ Xl(1, ...l)), n.lowercase = (l) => n.check(/* @__PURE__ */ Gw(l)), n.uppercase = (l) => n.check(/* @__PURE__ */ Kw(l)), n.trim = () => n.check(/* @__PURE__ */ Pw()), n.normalize = (...l) => n.check(/* @__PURE__ */ $w(...l)), n.toLowerCase = () => n.check(/* @__PURE__ */ Iw()), n.toUpperCase = () => n.check(/* @__PURE__ */ Fw()), n.slugify = () => n.check(/* @__PURE__ */ Qw());
}), Vx = /* @__PURE__ */ $("ZodString", (n, i) => {
  wd.init(n, i), Ah.init(n, i), n.email = (o) => n.check(/* @__PURE__ */ mw(Xx, o)), n.url = (o) => n.check(/* @__PURE__ */ hw($x, o)), n.jwt = (o) => n.check(/* @__PURE__ */ Ow(sE, o)), n.emoji = (o) => n.check(/* @__PURE__ */ vw(Px, o)), n.guid = (o) => n.check(/* @__PURE__ */ ig(sg, o)), n.uuid = (o) => n.check(/* @__PURE__ */ fw(Tl, o)), n.uuidv4 = (o) => n.check(/* @__PURE__ */ _w(Tl, o)), n.uuidv6 = (o) => n.check(/* @__PURE__ */ pw(Tl, o)), n.uuidv7 = (o) => n.check(/* @__PURE__ */ gw(Tl, o)), n.nanoid = (o) => n.check(/* @__PURE__ */ yw(Ix, o)), n.guid = (o) => n.check(/* @__PURE__ */ ig(sg, o)), n.cuid = (o) => n.check(/* @__PURE__ */ bw(Fx, o)), n.cuid2 = (o) => n.check(/* @__PURE__ */ Sw(Qx, o)), n.ulid = (o) => n.check(/* @__PURE__ */ kw(Jx, o)), n.base64 = (o) => n.check(/* @__PURE__ */ Aw(oE, o)), n.base64url = (o) => n.check(/* @__PURE__ */ Cw(rE, o)), n.xid = (o) => n.check(/* @__PURE__ */ ww(Wx, o)), n.ksuid = (o) => n.check(/* @__PURE__ */ xw(eE, o)), n.ipv4 = (o) => n.check(/* @__PURE__ */ Ew(tE, o)), n.ipv6 = (o) => n.check(/* @__PURE__ */ Tw(nE, o)), n.cidrv4 = (o) => n.check(/* @__PURE__ */ zw(aE, o)), n.cidrv6 = (o) => n.check(/* @__PURE__ */ Nw(iE, o)), n.e164 = (o) => n.check(/* @__PURE__ */ Mw(lE, o)), n.datetime = (o) => n.check(Ex(o)), n.date = (o) => n.check(zx(o)), n.time = (o) => n.check(Ax(o)), n.duration = (o) => n.check(Mx(o));
});
function Va(n) {
  return /* @__PURE__ */ dw(Vx, n);
}
const Pe = /* @__PURE__ */ $("ZodStringFormat", (n, i) => {
  $e.init(n, i), Ah.init(n, i);
}), Xx = /* @__PURE__ */ $("ZodEmail", (n, i) => {
  y2.init(n, i), Pe.init(n, i);
}), sg = /* @__PURE__ */ $("ZodGUID", (n, i) => {
  h2.init(n, i), Pe.init(n, i);
}), Tl = /* @__PURE__ */ $("ZodUUID", (n, i) => {
  v2.init(n, i), Pe.init(n, i);
}), $x = /* @__PURE__ */ $("ZodURL", (n, i) => {
  b2.init(n, i), Pe.init(n, i);
}), Px = /* @__PURE__ */ $("ZodEmoji", (n, i) => {
  S2.init(n, i), Pe.init(n, i);
}), Ix = /* @__PURE__ */ $("ZodNanoID", (n, i) => {
  k2.init(n, i), Pe.init(n, i);
}), Fx = /* @__PURE__ */ $("ZodCUID", (n, i) => {
  w2.init(n, i), Pe.init(n, i);
}), Qx = /* @__PURE__ */ $("ZodCUID2", (n, i) => {
  x2.init(n, i), Pe.init(n, i);
}), Jx = /* @__PURE__ */ $("ZodULID", (n, i) => {
  E2.init(n, i), Pe.init(n, i);
}), Wx = /* @__PURE__ */ $("ZodXID", (n, i) => {
  T2.init(n, i), Pe.init(n, i);
}), eE = /* @__PURE__ */ $("ZodKSUID", (n, i) => {
  z2.init(n, i), Pe.init(n, i);
}), tE = /* @__PURE__ */ $("ZodIPv4", (n, i) => {
  O2.init(n, i), Pe.init(n, i);
}), nE = /* @__PURE__ */ $("ZodIPv6", (n, i) => {
  R2.init(n, i), Pe.init(n, i);
}), aE = /* @__PURE__ */ $("ZodCIDRv4", (n, i) => {
  j2.init(n, i), Pe.init(n, i);
}), iE = /* @__PURE__ */ $("ZodCIDRv6", (n, i) => {
  D2.init(n, i), Pe.init(n, i);
}), oE = /* @__PURE__ */ $("ZodBase64", (n, i) => {
  L2.init(n, i), Pe.init(n, i);
}), rE = /* @__PURE__ */ $("ZodBase64URL", (n, i) => {
  Y2.init(n, i), Pe.init(n, i);
}), lE = /* @__PURE__ */ $("ZodE164", (n, i) => {
  Z2.init(n, i), Pe.init(n, i);
}), sE = /* @__PURE__ */ $("ZodJWT", (n, i) => {
  B2.init(n, i), Pe.init(n, i);
}), Ch = /* @__PURE__ */ $("ZodNumber", (n, i) => {
  yh.init(n, i), We.init(n, i), n._zod.processJSONSchema = (l, s, d) => ox(n, l, s), n.gt = (l, s) => n.check(/* @__PURE__ */ rg(l, s)), n.gte = (l, s) => n.check(/* @__PURE__ */ Mu(l, s)), n.min = (l, s) => n.check(/* @__PURE__ */ Mu(l, s)), n.lt = (l, s) => n.check(/* @__PURE__ */ og(l, s)), n.lte = (l, s) => n.check(/* @__PURE__ */ Cu(l, s)), n.max = (l, s) => n.check(/* @__PURE__ */ Cu(l, s)), n.int = (l) => n.check(ug(l)), n.safe = (l) => n.check(ug(l)), n.positive = (l) => n.check(/* @__PURE__ */ rg(0, l)), n.nonnegative = (l) => n.check(/* @__PURE__ */ Mu(0, l)), n.negative = (l) => n.check(/* @__PURE__ */ og(0, l)), n.nonpositive = (l) => n.check(/* @__PURE__ */ Cu(0, l)), n.multipleOf = (l, s) => n.check(/* @__PURE__ */ lg(l, s)), n.step = (l, s) => n.check(/* @__PURE__ */ lg(l, s)), n.finite = () => n;
  const o = n._zod.bag;
  n.minValue = Math.max(o.minimum ?? Number.NEGATIVE_INFINITY, o.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null, n.maxValue = Math.min(o.maximum ?? Number.POSITIVE_INFINITY, o.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null, n.isInt = (o.format ?? "").includes("int") || Number.isSafeInteger(o.multipleOf ?? 0.5), n.isFinite = !0, n.format = o.format ?? null;
});
function cg(n) {
  return /* @__PURE__ */ Uw(Ch, n);
}
const cE = /* @__PURE__ */ $("ZodNumberFormat", (n, i) => {
  G2.init(n, i), Ch.init(n, i);
});
function ug(n) {
  return /* @__PURE__ */ Yw(cE, n);
}
const uE = /* @__PURE__ */ $("ZodUnknown", (n, i) => {
  K2.init(n, i), We.init(n, i), n._zod.processJSONSchema = (o, l, s) => lx();
});
function dg() {
  return /* @__PURE__ */ Zw(uE);
}
const dE = /* @__PURE__ */ $("ZodNever", (n, i) => {
  q2.init(n, i), We.init(n, i), n._zod.processJSONSchema = (o, l, s) => rx(n, o, l);
});
function mE(n) {
  return /* @__PURE__ */ Hw(dE, n);
}
const fE = /* @__PURE__ */ $("ZodArray", (n, i) => {
  V2.init(n, i), We.init(n, i), n._zod.processJSONSchema = (o, l, s) => mx(n, o, l, s), n.element = i.element, n.min = (o, l) => n.check(/* @__PURE__ */ Xl(o, l)), n.nonempty = (o) => n.check(/* @__PURE__ */ Xl(1, o)), n.max = (o, l) => n.check(/* @__PURE__ */ wh(o, l)), n.length = (o, l) => n.check(/* @__PURE__ */ xh(o, l)), n.unwrap = () => n.element;
});
function Fu(n, i) {
  return /* @__PURE__ */ Jw(fE, n, i);
}
const _E = /* @__PURE__ */ $("ZodObject", (n, i) => {
  $2.init(n, i), We.init(n, i), n._zod.processJSONSchema = (o, l, s) => fx(n, o, l, s), Ue(n, "shape", () => i.shape), n.keyof = () => Xo(Object.keys(n._zod.def.shape)), n.catchall = (o) => n.clone({ ...n._zod.def, catchall: o }), n.passthrough = () => n.clone({ ...n._zod.def, catchall: dg() }), n.loose = () => n.clone({ ...n._zod.def, catchall: dg() }), n.strict = () => n.clone({ ...n._zod.def, catchall: mE() }), n.strip = () => n.clone({ ...n._zod.def, catchall: void 0 }), n.extend = (o) => gk(n, o), n.safeExtend = (o) => hk(n, o), n.merge = (o) => vk(n, o), n.pick = (o) => _k(n, o), n.omit = (o) => pk(n, o), n.partial = (...o) => yk(Rh, n, o[0]), n.required = (...o) => bk(jh, n, o[0]);
});
function Mh(n, i) {
  const o = {
    type: "object",
    shape: n ?? {},
    ...de(i)
  };
  return new _E(o);
}
const pE = /* @__PURE__ */ $("ZodUnion", (n, i) => {
  P2.init(n, i), We.init(n, i), n._zod.processJSONSchema = (o, l, s) => _x(n, o, l, s), n.options = i.options;
});
function Oh(n, i) {
  return new pE({
    type: "union",
    options: n,
    ...de(i)
  });
}
const gE = /* @__PURE__ */ $("ZodIntersection", (n, i) => {
  I2.init(n, i), We.init(n, i), n._zod.processJSONSchema = (o, l, s) => px(n, o, l, s);
});
function hE(n, i) {
  return new gE({
    type: "intersection",
    left: n,
    right: i
  });
}
const vE = /* @__PURE__ */ $("ZodRecord", (n, i) => {
  F2.init(n, i), We.init(n, i), n._zod.processJSONSchema = (o, l, s) => gx(n, o, l, s), n.keyType = i.keyType, n.valueType = i.valueType;
});
function yE(n, i, o) {
  return new vE({
    type: "record",
    keyType: n,
    valueType: i,
    ...de(o)
  });
}
const Qu = /* @__PURE__ */ $("ZodEnum", (n, i) => {
  Q2.init(n, i), We.init(n, i), n._zod.processJSONSchema = (l, s, d) => sx(n, l, s), n.enum = i.entries, n.options = Object.values(i.entries);
  const o = new Set(Object.keys(i.entries));
  n.extract = (l, s) => {
    const d = {};
    for (const m of l)
      if (o.has(m))
        d[m] = i.entries[m];
      else
        throw new Error(`Key ${m} not found in enum`);
    return new Qu({
      ...i,
      checks: [],
      ...de(s),
      entries: d
    });
  }, n.exclude = (l, s) => {
    const d = { ...i.entries };
    for (const m of l)
      if (o.has(m))
        delete d[m];
      else
        throw new Error(`Key ${m} not found in enum`);
    return new Qu({
      ...i,
      checks: [],
      ...de(s),
      entries: d
    });
  };
});
function Xo(n, i) {
  const o = Array.isArray(n) ? Object.fromEntries(n.map((l) => [l, l])) : n;
  return new Qu({
    type: "enum",
    entries: o,
    ...de(i)
  });
}
const bE = /* @__PURE__ */ $("ZodLiteral", (n, i) => {
  J2.init(n, i), We.init(n, i), n._zod.processJSONSchema = (o, l, s) => cx(n, o, l), n.values = new Set(i.values), Object.defineProperty(n, "value", {
    get() {
      if (i.values.length > 1)
        throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
      return i.values[0];
    }
  });
});
function SE(n, i) {
  return new bE({
    type: "literal",
    values: Array.isArray(n) ? n : [n],
    ...de(i)
  });
}
const kE = /* @__PURE__ */ $("ZodTransform", (n, i) => {
  W2.init(n, i), We.init(n, i), n._zod.processJSONSchema = (o, l, s) => dx(n, o), n._zod.parse = (o, l) => {
    if (l.direction === "backward")
      throw new ah(n.constructor.name);
    o.addIssue = (d) => {
      if (typeof d == "string")
        o.issues.push($o(d, o.value, i));
      else {
        const m = d;
        m.fatal && (m.continue = !1), m.code ?? (m.code = "custom"), m.input ?? (m.input = o.value), m.inst ?? (m.inst = n), o.issues.push($o(m));
      }
    };
    const s = i.transform(o.value, o);
    return s instanceof Promise ? s.then((d) => (o.value = d, o)) : (o.value = s, o);
  };
});
function wE(n) {
  return new kE({
    type: "transform",
    transform: n
  });
}
const Rh = /* @__PURE__ */ $("ZodOptional", (n, i) => {
  kh.init(n, i), We.init(n, i), n._zod.processJSONSchema = (o, l, s) => Nh(n, o, l, s), n.unwrap = () => n._zod.def.innerType;
});
function mg(n) {
  return new Rh({
    type: "optional",
    innerType: n
  });
}
const xE = /* @__PURE__ */ $("ZodExactOptional", (n, i) => {
  ew.init(n, i), We.init(n, i), n._zod.processJSONSchema = (o, l, s) => Nh(n, o, l, s), n.unwrap = () => n._zod.def.innerType;
});
function EE(n) {
  return new xE({
    type: "optional",
    innerType: n
  });
}
const TE = /* @__PURE__ */ $("ZodNullable", (n, i) => {
  tw.init(n, i), We.init(n, i), n._zod.processJSONSchema = (o, l, s) => hx(n, o, l, s), n.unwrap = () => n._zod.def.innerType;
});
function fg(n) {
  return new TE({
    type: "nullable",
    innerType: n
  });
}
const zE = /* @__PURE__ */ $("ZodDefault", (n, i) => {
  nw.init(n, i), We.init(n, i), n._zod.processJSONSchema = (o, l, s) => yx(n, o, l, s), n.unwrap = () => n._zod.def.innerType, n.removeDefault = n.unwrap;
});
function NE(n, i) {
  return new zE({
    type: "default",
    innerType: n,
    get defaultValue() {
      return typeof i == "function" ? i() : lh(i);
    }
  });
}
const AE = /* @__PURE__ */ $("ZodPrefault", (n, i) => {
  aw.init(n, i), We.init(n, i), n._zod.processJSONSchema = (o, l, s) => bx(n, o, l, s), n.unwrap = () => n._zod.def.innerType;
});
function CE(n, i) {
  return new AE({
    type: "prefault",
    innerType: n,
    get defaultValue() {
      return typeof i == "function" ? i() : lh(i);
    }
  });
}
const jh = /* @__PURE__ */ $("ZodNonOptional", (n, i) => {
  iw.init(n, i), We.init(n, i), n._zod.processJSONSchema = (o, l, s) => vx(n, o, l, s), n.unwrap = () => n._zod.def.innerType;
});
function ME(n, i) {
  return new jh({
    type: "nonoptional",
    innerType: n,
    ...de(i)
  });
}
const OE = /* @__PURE__ */ $("ZodCatch", (n, i) => {
  ow.init(n, i), We.init(n, i), n._zod.processJSONSchema = (o, l, s) => Sx(n, o, l, s), n.unwrap = () => n._zod.def.innerType, n.removeCatch = n.unwrap;
});
function RE(n, i) {
  return new OE({
    type: "catch",
    innerType: n,
    catchValue: typeof i == "function" ? i : () => i
  });
}
const jE = /* @__PURE__ */ $("ZodPipe", (n, i) => {
  rw.init(n, i), We.init(n, i), n._zod.processJSONSchema = (o, l, s) => kx(n, o, l, s), n.in = i.in, n.out = i.out;
});
function _g(n, i) {
  return new jE({
    type: "pipe",
    in: n,
    out: i
    // ...util.normalizeParams(params),
  });
}
const DE = /* @__PURE__ */ $("ZodReadonly", (n, i) => {
  lw.init(n, i), We.init(n, i), n._zod.processJSONSchema = (o, l, s) => wx(n, o, l, s), n.unwrap = () => n._zod.def.innerType;
});
function LE(n) {
  return new DE({
    type: "readonly",
    innerType: n
  });
}
const UE = /* @__PURE__ */ $("ZodCustom", (n, i) => {
  sw.init(n, i), We.init(n, i), n._zod.processJSONSchema = (o, l, s) => ux(n, o);
});
function YE(n, i = {}) {
  return /* @__PURE__ */ Ww(UE, n, i);
}
function ZE(n) {
  return /* @__PURE__ */ ex(n);
}
function nt(n, i) {
  return typeof n == typeof i ? n : i;
}
function zl(n) {
  return typeof n == "string";
}
function Vo(n) {
  return typeof n == "number";
}
const HE = /^[a-z][a-z0-9_]*\.[a-z0-9][a-z0-9_]*$/, Dh = Va().regex(HE, "Invalid entity ID format. Expected: domain.object_id"), BE = Dh.refine((n) => n.startsWith("vacuum."), {
  message: "Expected vacuum.* entity"
}), GE = Dh.refine((n) => n.startsWith("camera."), {
  message: "Expected camera.* entity"
}), KE = Mh({
  type: SE("stop"),
  action: Xo(["stop", "stop_and_dock"])
}), qE = ["theme", "custom_theme"], VE = Mh({
  type: Va(),
  entity: BE,
  map_entity: GE.optional(),
  title: Va().optional(),
  language: Va().optional(),
  default_mode: Xo(["room", "all", "zone"]).optional(),
  default_room_view: Xo(["map", "list"]).optional(),
  buttons: Fu(KE).optional(),
  map_overlays: Fu(Xo(["vacuum", "charger", "room_labels"])).optional(),
  room_names: yE(Va(), Va()).optional(),
  room_label_scale: cg().positive().optional(),
  map_height: Oh([Va(), cg().positive()]).optional()
}).passthrough();
function XE(n) {
  const i = VE.safeParse(n);
  return i.success ? {
    valid: !0,
    errors: [],
    warnings: qE.filter((l) => l in i.data).map(
      (l) => `${l} is ignored; the card follows the active Home Assistant theme`
    ),
    data: i.data
  } : {
    valid: !1,
    errors: i.error.issues.map((l) => {
      const s = l.path.join(".");
      return s ? `${s}: ${l.message}` : l.message;
    }),
    warnings: []
  };
}
function pg(n) {
  if (typeof n == "string") return n;
  if (n && typeof n == "object" && typeof n.name == "string") return n.name;
}
const $E = 1e-6;
function gg(n) {
  return typeof n == "number" && Number.isFinite(n);
}
function Pl(n) {
  if (!Array.isArray(n))
    return null;
  const i = n.flatMap((o) => !Array.isArray(o) || o.length !== 2 || !gg(o[0]) || !gg(o[1]) ? [] : [{ x: o[0], y: o[1] }]);
  return i.length >= 3 ? i : null;
}
function PE(n) {
  if (Array.isArray(n.outlines)) {
    const o = n.outlines.flatMap((l) => {
      const s = Pl(l);
      return s ? [s] : [];
    });
    if (o.length > 0)
      return o;
  }
  const i = Pl(n.outline);
  return i ? [i] : void 0;
}
function IE(n) {
  return Math.abs(
    n.reduce((i, o, l) => {
      const s = n[(l + 1) % n.length];
      return i + o.x * s.y - s.x * o.y;
    }, 0) / 2
  );
}
function Ou(n, i) {
  const o = n.map(({ x: l, y: s }) => i.vacuumToMap({ x: l, y: s }));
  return o.every(({ x: l, y: s }) => Number.isFinite(l) && Number.isFinite(s)) && IE(o) > $E ? o : null;
}
function Ru(n) {
  return n.map(
    (i) => `M ${i[0].x} ${i[0].y} ${i.slice(1).map(({ x: o, y: l }) => `L ${o} ${l}`).join(" ")} Z`
  ).join(" ");
}
function hg(n, i, o) {
  return o ? o[String(n)] ?? o[i] ?? i : i;
}
function xd(n, i) {
  return n ? Array.isArray(n) ? n.map((o) => {
    const l = Number(o.id ?? o.room_id ?? 0), s = hg(l, o.name ?? `Room ${l}`, i), d = o.outline ?? o.vertexs, m = Pl(d), f = m && m.length >= 3 ? [m] : void 0;
    return {
      id: l,
      name: s,
      icon: pg(o.icon),
      visibility: o.visibility,
      rings: f,
      outline: d,
      x: o.label?.x ?? o.centroid?.[0] ?? o.x,
      y: o.label?.y ?? o.centroid?.[1] ?? o.y,
      x0: o.x0,
      y0: o.y0,
      x1: o.x1,
      y1: o.y1
    };
  }) : typeof n == "object" ? Object.values(n).map((l) => {
    const s = Number(l.room_id ?? l.id ?? 0);
    return {
      id: s,
      name: hg(s, l.name ?? `Room ${s}`, i),
      icon: pg(l.icon),
      visibility: l.visibility,
      rings: PE(l),
      outline: l.outline,
      x0: l.x0,
      y0: l.y0,
      x1: l.x1,
      y1: l.y1,
      x: l.x,
      y: l.y
    };
  }) : [] : [];
}
function FE(n, i, o) {
  const l = n.states[i];
  return l?.attributes?.rooms ? xd(l.attributes.rooms, o) : (_e.debug("RoomParser", "No rooms found in camera entity:", i), []);
}
function QE(n, i) {
  if (n.rings?.length) {
    const s = n.rings.flatMap((d) => {
      const m = Ou(d, i);
      return m ? [m] : [];
    });
    return s.length > 0 ? Ru(s) : "";
  }
  const o = n.outline;
  if (o && Array.isArray(o) && o.length >= 3) {
    const s = Pl(o);
    if (s) {
      const d = Ou(s, i);
      if (d) return Ru([d]);
    }
  }
  if (n.x0 === void 0 || n.y0 === void 0 || n.x1 === void 0 || n.y1 === void 0)
    return _e.warn("Room missing coordinates:", n), "";
  const l = Ou(
    [
      { x: n.x0, y: n.y0 },
      { x: n.x1, y: n.y0 },
      { x: n.x1, y: n.y1 },
      { x: n.x0, y: n.y1 }
    ],
    i
  );
  return l ? Ru([l]) : "";
}
function Lh(n, i, o, l) {
  if (n) return n;
  if (i) return i;
  if (!o || !l) return "";
  const s = l.replace(/^vacuum\./, "");
  return Object.keys(o.states).find(
    (m) => m.startsWith("camera.") && (m.includes(s) || m.includes("cleaning_map") || m.includes("map"))
  ) || "";
}
function JE(n, i) {
  const o = nt(n.attributes.status, ""), l = n.attributes.segment_cleaning || !1, s = n.attributes.zone_cleaning || !1;
  if (n.attributes.started) {
    if (l || o.toLowerCase().includes("room"))
      return "room";
    if (s || o.toLowerCase().includes("zone"))
      return "zone";
  }
  return i;
}
function WE(n, i, o, l) {
  const s = n.states[i], d = n.states[o], m = /* @__PURE__ */ new Map();
  if (!s) return m;
  const f = s.attributes.segment_cleaning === !0, p = s.attributes.active_segments;
  if (!f || !p || !Array.isArray(p))
    return m;
  const g = /* @__PURE__ */ new Map();
  if (d?.attributes?.rooms) {
    const v = xd(d.attributes.rooms, l);
    for (const y of v)
      g.set(y.id, y.name);
  }
  return p.forEach((v) => {
    const y = g.get(v) || `Room ${v}`;
    m.set(v, y);
  }), m;
}
const Uh = 1e-9, vg = 1e-6, Nl = 0.05;
function yg(n) {
  return Number.isFinite(n.x) && Number.isFinite(n.y);
}
function Ed(n, i, o, l) {
  return n * l - o * i;
}
function bg(n, i, o, l) {
  const s = Math.abs(Ed(n, i, o, l)), d = Math.max(Math.hypot(n, i) * Math.hypot(o, l), 1);
  return s <= Uh * d;
}
function Al(n, i) {
  return {
    x: n.a * i.x + n.b * i.y + n.c,
    y: n.d * i.x + n.e * i.y + n.f
  };
}
function e5(n) {
  const i = Ed(n.a, n.d, n.b, n.e), o = Math.max(Math.hypot(n.a, n.d) * Math.hypot(n.b, n.e), 1);
  if (Math.abs(i) <= Uh * o)
    return null;
  const l = n.e / i, s = -n.b / i, d = -n.d / i, m = n.a / i;
  return {
    a: l,
    b: s,
    c: -(l * n.c + s * n.f),
    d,
    e: m,
    f: -(d * n.c + m * n.f)
  };
}
function Sg(n, i) {
  return Math.hypot(n.x - i.x, n.y - i.y);
}
function Td(n, i, o) {
  const l = n.filter((s) => yg(s.vacuum) && yg(s.map));
  if (l.length < 3)
    return null;
  for (let s = 0; s < l.length - 2; s += 1)
    for (let d = s + 1; d < l.length - 1; d += 1)
      for (let m = d + 1; m < l.length; m += 1) {
        const f = l[s], p = l[d], g = l[m], v = p.vacuum.x - f.vacuum.x, y = p.vacuum.y - f.vacuum.y, k = g.vacuum.x - f.vacuum.x, S = g.vacuum.y - f.vacuum.y, w = p.map.x - f.map.x, N = p.map.y - f.map.y, M = g.map.x - f.map.x, O = g.map.y - f.map.y;
        if (bg(v, y, k, S) || bg(w, N, M, O))
          continue;
        const Y = Ed(v, y, k, S), D = {
          a: S / Y,
          b: -k / Y,
          d: -y / Y,
          e: v / Y
        }, Z = {
          a: w * D.a + M * D.d,
          b: w * D.b + M * D.e,
          c: 0,
          d: N * D.a + O * D.d,
          e: N * D.b + O * D.e,
          f: 0
        };
        Z.c = f.map.x - Z.a * f.vacuum.x - Z.b * f.vacuum.y, Z.f = f.map.y - Z.d * f.vacuum.x - Z.e * f.vacuum.y;
        const K = e5(Z);
        if (!(!K || l.some((X) => {
          const ee = Al(Z, X.vacuum), re = Al(K, ee);
          return Sg(ee, X.map) > vg || Sg(re, X.vacuum) > vg;
        })))
          return {
            source: i,
            commandSafe: o,
            vacuumToMap: (X) => Al(Z, X),
            mapToVacuum: (X) => Al(K, X)
          };
      }
  return null;
}
function t5(n) {
  return Td(n, "calibration", !0);
}
function n5(n, i, o) {
  let l = Math.trunc(
    i.width * i.scale + i.padding[0] + i.padding[2] - i.crop[0] - i.crop[2]
  ), s = Math.trunc(
    i.height * i.scale + i.padding[1] + i.padding[3] - i.crop[1] - i.crop[3]
  ), { x: d, y: m } = n;
  for (let f = o; f > 0; f -= 90) {
    const p = m, g = l - d;
    d = p, m = g, [l, s] = [s, l];
  }
  return { x: d, y: m };
}
function a5(n, i, o) {
  const l = {
    x: (n.x - i.left) / i.gridSize * i.scale + i.padding[0] - i.crop[0],
    y: (i.height * i.gridSize - 1 - (n.y - i.top)) / i.gridSize * i.scale + i.padding[1] - i.crop[1]
  };
  return n5(l, i, o);
}
function i5(n, i) {
  const l = [
    { x: 0, y: 0 },
    { x: 1e3, y: 0 },
    { x: 0, y: 1e3 }
  ].map((s) => ({
    vacuum: s,
    map: a5(s, n, i)
  }));
  return Td(l, "dimensions", !0);
}
function o5(n, i, o, l) {
  const s = n.flatMap((N) => N.x0 === void 0 || N.y0 === void 0 || N.x1 === void 0 || N.y1 === void 0 ? [] : [
    { x: N.x0, y: N.y0 },
    { x: N.x1, y: N.y1 }
  ]);
  if (s.length === 0 || i <= 0 || o <= 0)
    return null;
  const d = Math.min(...s.map((N) => N.x)), m = Math.max(...s.map((N) => N.x)), f = Math.min(...s.map((N) => N.y)), p = Math.max(...s.map((N) => N.y));
  if (d === m || f === p)
    return null;
  const g = i * Nl, v = i * (1 - Nl), y = o * Nl, k = o * (1 - Nl), S = [
    { x: d, y: f },
    { x: m, y: f },
    { x: d, y: p }
  ], w = {
    0: [
      { x: g, y: k },
      { x: v, y: k },
      { x: g, y }
    ],
    90: [
      { x: g, y },
      { x: g, y: k },
      { x: v, y }
    ],
    180: [
      { x: v, y },
      { x: g, y },
      { x: v, y: k }
    ],
    270: [
      { x: v, y: k },
      { x: v, y },
      { x: g, y: k }
    ]
  };
  return Td(
    S.map((N, M) => ({ vacuum: N, map: w[l][M] })),
    "room_estimate",
    !1
  );
}
function r5({
  calibrationPoints: n,
  dimensions: i,
  rooms: o,
  rotation: l,
  imageWidth: s,
  imageHeight: d
}) {
  if (n) {
    const m = t5(n);
    if (m)
      return m;
  }
  if (i) {
    const m = i5(i, l);
    if (m)
      return m;
  }
  return o5(o, s, d, l);
}
function ju(n) {
  if (n == null) return null;
  const i = String(n).trim();
  return i.length > 0 && i !== "0" && i !== "null" && i !== "undefined" ? i : null;
}
function l5(n, i, o = null) {
  const l = ju(n), s = ju(i?.map_id), d = ju(i?.saved_map_id), m = i?.entity_picture, f = typeof m == "string" && m.length > 0 ? m : null, p = f === null ? null : `${s || "live"}:${d || "live"}`, g = !!(l === null || s === null || d === l || s === l || s && l && String(s) === String(l));
  return {
    floorId: l === null ? null : Number.isFinite(Number(l)) ? Number(l) : l,
    floorReady: g,
    imageToken: f,
    imageKey: p,
    // A picture only counts as ready when it was loaded for this exact map key.
    // Comparing the cache-busting token instead would mark a previous floor's picture
    // as ready; comparing the key keeps same-map token refreshes ready.
    imageReady: p !== null && p === o
  };
}
function s5(n, i) {
  if (n.size !== i.size) return !1;
  const o = [...n.keys()].sort(), l = [...i.keys()].sort();
  return o.every((s, d) => s === l[d]);
}
function c5({
  floorChanged: n,
  mapReady: i,
  isSegmentCleaning: o,
  selectedRooms: l,
  activeSegments: s
}) {
  if (!i || !o || s.size === 0)
    return { rooms: n ? /* @__PURE__ */ new Map() : null, clearZone: n, selectRoomMode: !1 };
  const d = n || !s5(l, s);
  return {
    rooms: d ? s : null,
    clearZone: n,
    selectRoomMode: d
  };
}
function u5({
  hasCamera: n,
  imageFailed: i,
  floorReady: o,
  imageReady: l,
  roomCount: s,
  hasTransform: d
}) {
  return n ? i ? "image_failed" : !o || !l ? null : s === 0 ? "no_rooms" : d ? null : "bad_calibration" : "no_camera";
}
const d5 = [
  { key: "start_auto_empty", labelKey: "settings.station_controls.start_auto_empty" },
  { key: "self_clean", labelKey: "settings.station_controls.self_clean" },
  { key: "manual_drying", labelKey: "settings.station_controls.manual_drying" }
];
function m5(n, i) {
  return !1;
}
function f5(n, i = !1) {
  return "good";
}
function _5(n, i) {
  const o = n ? cS[n] : void 0, l = i ? uS[i] : void 0;
  return o && o !== "other" ? o : l === "cleaning" || l === "paused" || l === "returning" ? l : o ?? l ?? dS;
}
function p5(n) {
  return n && Zp[n] ? Zp[n] : fS;
}
function g5(n, i, o) {
  const l = n === "cleaning", s = n === "paused", d = l || s, m = Tt(i), f = m === "mopping", p = m === "sweeping", g = m === "mopping_after_sweeping";
  return {
    canChangeCleaningMode: n === "idle" || d && !g,
    canChangeSuctionPower: !f && !o,
    canChangeWetness: !p && !o,
    canChangeRoute: !d,
    canChangeMopFrequency: !d,
    canToggleMaxPower: (p || g) && !o,
    canStartCleaning: !d && n !== "returning" && n !== "error",
    canPause: l,
    canResume: s,
    canStop: d,
    canDock: n !== "returning" && n !== "maintenance"
  };
}
function h5(n, i) {
  return n || (typeof i == "string" ? i : "");
}
function v5(n, i, o, l) {
  return A.useMemo(() => {
    const s = cn(n, o), d = s.state ?? i.state ?? "unknown", m = _5(s.state, i.state), f = p5(s.state), p = i.attributes.customized_cleaning === !0, g = g5(m, l, p);
    return {
      phase: m,
      task: f,
      rawState: d,
      cleaningMode: l,
      isCustomizedCleaning: p,
      controls: g
    };
  }, [n, i, o, l]);
}
function y5({
  hass: n,
  entity: i,
  config: o,
  language: l,
  deviceEntities: s,
  children: d
}) {
  const m = A.useMemo(() => Ig(l), [l]), f = s.get("select", gn.CLEANING_MODE.key), p = h5(
    Jo(f ? n.states[f] : void 0).value,
    i.attributes.cleaning_mode
  ), g = v5(n, i, s.get("sensor", "state"), p), v = A.useMemo(
    () => ({ hass: n, entity: i, config: o, language: l, isRtl: m, machineState: g, deviceEntities: s }),
    [n, i, o, l, m, g, s]
  );
  return /* @__PURE__ */ _.jsx(md.Provider, { value: v, children: d });
}
function b5() {
  const n = Jl();
  return { getStopAction: A.useCallback(() => n.buttons?.find((l) => l.type === "stop")?.action ?? "stop_and_dock", [n.buttons]) };
}
const kg = "standard", wg = 2, xg = "1", S5 = ["quiet", "standard", "powerful", "max"], k5 = ["1", "2"];
function Yh(n) {
  return `botslab_room_settings_${n}`;
}
function Zl(n) {
  try {
    const i = localStorage.getItem(Yh(n));
    return i ? JSON.parse(i) : {};
  } catch {
    return {};
  }
}
function w5(n, i) {
  try {
    localStorage.setItem(Yh(n), JSON.stringify(i));
  } catch {
  }
}
function x5({
  hass: n,
  vacuumEntityId: i,
  rooms: o
}) {
  const [l, s] = A.useState(() => ({
    entityId: i,
    configs: Zl(i)
  })), d = l.entityId === i ? l.configs : Zl(i), m = A.useCallback(
    (S, w) => {
      s((N) => {
        const M = N.entityId === i ? N.configs : Zl(i), O = M[S] || {
          suctionLevel: kg,
          wetnessLevel: wg,
          cleaningTimes: xg
        }, Y = { ...M, [S]: { ...O, ...w } };
        return w5(i, Y), _e.debug("RoomSettings", "Updated room config:", S, w), { entityId: i, configs: Y };
      });
    },
    [i]
  ), f = A.useCallback(
    (S, w) => {
      m(S, { suctionLevel: w });
    },
    [m]
  ), p = A.useCallback(
    (S, w) => {
      m(S, { wetnessLevel: w });
    },
    [m]
  ), g = A.useCallback(
    (S, w) => {
      m(S, { cleaningTimes: w });
    },
    [m]
  ), v = A.useCallback((S, w) => {
  }, []), y = A.useCallback((S, w) => {
  }, []), k = /* @__PURE__ */ new Map();
  for (const S of o) {
    const w = d[S.id] || {
      suctionLevel: kg,
      wetnessLevel: wg,
      cleaningTimes: xg
    };
    k.set(S.id, {
      roomId: S.id,
      roomName: S.name,
      suctionLevel: w.suctionLevel,
      suctionLevelOptions: S5,
      wetnessLevel: w.wetnessLevel,
      wetnessMin: 1,
      wetnessMax: 3,
      cleaningTimes: w.cleaningTimes,
      cleaningTimesOptions: k5,
      mopPressure: null,
      mopPressureOptions: [],
      mopTemperature: null,
      mopTemperatureOptions: [],
      hasEntities: !0
    });
  }
  return {
    roomSettings: k,
    setSuctionLevel: f,
    setWetnessLevel: p,
    setCleaningTimes: g,
    setMopPressure: v,
    setMopTemperature: y
  };
}
const E5 = 4e3;
function Zh() {
  const [n, i] = A.useState(null);
  return A.useEffect(() => {
    if (n === null) return;
    const l = window.setTimeout(() => i(null), E5);
    return () => window.clearTimeout(l);
  }, [n]), { armedKey: n, tap: (l, s) => {
    if (n !== l) {
      i(l);
      return;
    }
    i(null), s();
  } };
}
function Cl(n, i = []) {
  const [o, l] = A.useState([]), s = Jg({ selectOptions: n, attributeList: i, rememberedOptions: o });
  return Qg(o, s.rememberedOptions) || l(s.rememberedOptions), s;
}
function hn(n) {
  return typeof n == "number" && Number.isFinite(n);
}
function Eg(n) {
  return !Array.isArray(n) || n.length !== 4 || !n.every(hn) ? null : [n[0], n[1], n[2], n[3]];
}
function T5(n) {
  if (!Array.isArray(n))
    return null;
  const i = [];
  for (const o of n) {
    if (typeof o != "object" || o === null)
      return null;
    const l = o;
    if (!hn(l.vacuum?.x) || !hn(l.vacuum.y) || !hn(l.map?.x) || !hn(l.map.y))
      return null;
    i.push({
      vacuum: { x: l.vacuum.x, y: l.vacuum.y },
      map: { x: l.map.x, y: l.map.y }
    });
  }
  return i.length >= 3 ? i : null;
}
function z5(n) {
  const { top: i, left: o, height: l, width: s, grid_size: d } = n;
  if (!hn(i) || !hn(o) || !hn(l) || !hn(s) || !hn(d) || l <= 0 || s <= 0 || d <= 0)
    return null;
  const m = n.scale === void 0 ? 1 : n.scale;
  if (!hn(m) || m <= 0)
    return null;
  const f = n.padding === void 0 ? [0, 0, 0, 0] : Eg(n.padding), p = n.crop === void 0 ? [0, 0, 0, 0] : Eg(n.crop);
  return !f || !p ? null : { top: i, left: o, height: l, width: s, gridSize: d, scale: m, padding: f, crop: p };
}
function N5(n) {
  return n === 90 || n === 180 || n === 270 ? n : 0;
}
function A5({
  hass: n,
  mapEntityId: i,
  imageWidth: o,
  imageHeight: l,
  roomNames: s
}) {
  const m = n.states[i]?.attributes;
  return A.useMemo(() => {
    const f = xd(m?.rooms, s), p = N5(m?.rotation), g = r5({
      calibrationPoints: T5(m?.calibration_points),
      dimensions: z5(m ?? {}),
      rooms: f,
      rotation: p,
      imageWidth: o,
      imageHeight: l
    });
    return { rooms: f, rotation: p, transform: g };
  }, [m, o, l, s]);
}
const Ml = /* @__PURE__ */ new Map(), Ol = /* @__PURE__ */ new Map();
function Hh() {
  const n = st(), i = Jl(), o = US(i.language, n.language), l = Ml.get(o), [s, d] = A.useState(l ?? {}), [m, f] = A.useState(l ? o : null);
  return l && m !== o && (f(o), d(l)), A.useEffect(() => {
    if (Ml.has(o)) return;
    let p = !0;
    const g = Ol.get(o) ?? KS((v) => n.callWS(v), o);
    return Ol.set(o, g), g.then((v) => {
      Ml.set(o, v), Ol.delete(o), p && (f(o), d(v));
    }).catch(() => {
      Ml.set(o, {}), Ol.delete(o), p && (f(o), d({}));
    }), () => {
      p = !1;
    };
  }, [o, n]), s;
}
function Wo(n, i) {
  const { t: o } = je(), l = st(), { get: s } = $t(), d = Hh();
  if (i) return i;
  const m = n.platform === "attribute" ? void 0 : s(n.platform, n.key), f = m ? l.states[m]?.attributes.friendly_name : void 0;
  return GS({
    resources: d,
    platform: n.platform,
    key: n.key,
    friendlyName: f,
    chromeLabel: o(n.labelKey)
  });
}
function C5({ deviceName: n, onSettingsClick: i }) {
  const { t: o } = je(), l = fd(), s = st(), d = Xt(), { get: m } = $t(), { phase: f, rawState: p } = Xn(), g = Hh(), v = HS(g, p), y = m("sensor", "error_code"), k = y ? s.states[y]?.state : void 0, S = d.attributes.error_code, w = typeof S == "number" && S > 0 ? String(S) : f === "error" ? "in_trouble" : void 0, N = f === "error" || p === "error" ? BS(g, k ?? w, d.attributes.error_type) : null, M = N ? `${v} — ${N}` : v, O = nt(d.attributes.cleaned_area ?? d.attributes.cleaning_area ?? d.attributes.cleaned_area_sqm, 0), Y = nt(d.attributes.cleaning_time ?? d.attributes.cleaning_time_minutes, 0), D = d.attributes.battery ?? d.attributes.battery_level, Z = nt(D, 0), K = () => {
    const X = D;
    return Vo(X) ? X >= 80 ? B1 : X >= 60 ? H1 : X >= 20 ? Z1 : Y1 : null;
  }, te = nt(d.attributes.cleaning_progress, 0) || nt(d.attributes.drying_progress, 0);
  return /* @__PURE__ */ _.jsxs("div", { className: "header", children: [
    /* @__PURE__ */ _.jsxs("div", { className: "header__top", children: [
      /* @__PURE__ */ _.jsxs("div", { className: "header__title-wrapper", children: [
        /* @__PURE__ */ _.jsx("h2", { className: "header__title", children: n }),
        /* @__PURE__ */ _.jsx("p", { className: `header__status ${N ? "header__status--error" : ""}`, children: M })
      ] }),
      i && /* @__PURE__ */ _.jsx("button", { className: "header__settings-btn", onClick: i, type: "button", "aria-label": "Settings", children: /* @__PURE__ */ _.jsx(l1, {}) })
    ] }),
    p !== "sleeping" && te > 0 && /* @__PURE__ */ _.jsx("div", { className: "header__progress", children: /* @__PURE__ */ _.jsx("div", { className: "header__progress-bar", children: /* @__PURE__ */ _.jsx("div", { className: "header__progress-fill", style: { width: `${te}%` } }) }) }),
    /* @__PURE__ */ _.jsxs("div", { className: "header__stats", children: [
      /* @__PURE__ */ _.jsxs("div", { className: "header__stat", children: [
        /* @__PURE__ */ _.jsx("span", { className: "header__stat-icon", children: K1 }),
        /* @__PURE__ */ _.jsxs("span", { className: "header__stat-value", children: [
          O,
          " ",
          l
        ] })
      ] }),
      /* @__PURE__ */ _.jsxs("div", { className: "header__stat", children: [
        /* @__PURE__ */ _.jsx("span", { className: "header__stat-icon", children: G1 }),
        /* @__PURE__ */ _.jsxs("span", { className: "header__stat-value header__stat-value--cleaning-time", children: [
          Y,
          " ",
          o("units.minutes")
        ] })
      ] }),
      /* @__PURE__ */ _.jsxs("div", { className: "header__stat", children: [
        /* @__PURE__ */ _.jsx("span", { className: "header__stat-icon", children: K() }),
        /* @__PURE__ */ _.jsxs("span", { className: "header__stat-value", children: [
          Z,
          " ",
          o("units.percent")
        ] })
      ] })
    ] })
  ] });
}
function M5(n, i) {
  if (n.custom_name && i.includes(n.custom_name)) return n.custom_name;
  if (i.includes(n.name)) return n.name;
  const o = `Map ${n.id}`;
  if (i.includes(o)) return o;
  const l = i.find((s) => s.startsWith(`${n.name} (`) || s.startsWith(`${o} (`));
  return l || (i.length === 1 ? i[0] : n.custom_name || n.name);
}
function Rl(n, i) {
  if (n == null || i === void 0 || i === null) return !1;
  const o = String(n).trim(), l = String(i).trim();
  return o.length > 0 && o === l;
}
function O5({ onToast: n, isSwitchingFloor: i = !1 }) {
  const { t: o } = je(), l = Xt(), s = st(), [d, m] = A.useState(!1), [f, p] = A.useState(!1), [g, v] = A.useState(!1), y = A.useRef(null), { get: k } = $t(), S = l.attributes, w = A.useMemo(() => {
    const Q = k(Gl.selectedMap.platform, Gl.selectedMap.key) ?? k("select", "active_floor");
    if (Q) return Q;
    const G = l.entity_id.replace(/^vacuum\./, "");
    return Object.keys(s.states).find(
      (B) => B.startsWith("select.") && (B.includes(G) || G.length === 0) && (B.endsWith("_selected_map") || B.endsWith("_active_floor") || B.includes("selected_map"))
    );
  }, [l.entity_id, k, s.states]), N = A.useMemo(() => {
    const Q = k("button", "sync_map");
    if (Q) return Q;
    const G = l.entity_id.replace(/^vacuum\./, "");
    return Object.keys(s.states).find(
      (B) => B.startsWith("button.") && B.includes(G) && B.includes("sync_map")
    );
  }, [l.entity_id, k, s.states]), M = cn(s, w), O = A.useMemo(() => Jo(M.entity), [M.entity]), Y = A.useMemo(() => {
    const Q = S.maps;
    return Array.isArray(Q) && Q.length > 0 ? Q.map((G, B) => {
      const I = G.id ?? G.map_id ?? G.clean_id ?? B, F = String(G.custom_name || G.name || `Map ${I}`), T = typeof G.custom_name == "string" && G.custom_name.trim() ? G.custom_name : null;
      return { id: I, name: F, custom_name: T };
    }).filter((G) => String(G.id).trim().length > 0) : O.options.length > 0 ? O.options.map((G) => ({
      id: G,
      name: G
    })) : [];
  }, [S.maps, O.options]), D = S.selected_map_id ?? S.selected_map, Z = f || i, K = M.unavailable && Y.length === 0, te = Y.length > 1, X = A.useMemo(() => {
    const Q = Y.find((G) => Rl(G.id, D));
    if (Q) return Q;
    if (O.value)
      return Y.find((G) => G.name === O.value || G.custom_name === O.value);
  }, [Y, D, O.value]), ee = X?.custom_name || X?.name || O.value || typeof S.selected_map == "string" && S.selected_map || o("map_selector.unknown"), re = A.useCallback(
    async (Q) => {
      if (m(!1), X && Rl(X.id, Q.id))
        return;
      const G = Q.custom_name || Q.name;
      p(!0), n?.(o("toast.switching_map", { name: G }));
      try {
        w && s.states[w] && O.options.length > 0 ? await s.callService("select", "select_option", {
          entity_id: w,
          option: M5(Q, O.options)
        }) : await s.callService("botslab_vacuum", "switch_floor_map", {
          entity_id: l.entity_id,
          map_id: String(Q.id)
        });
      } catch (B) {
        _e.error("MapSelector", "Failed to switch floor map", B), n?.(o("toast.map_switch_failed"));
      } finally {
        p(!1);
      }
    },
    [l.entity_id, s, n, O.options, w, X, o]
  ), me = A.useCallback(async () => {
    if (!g) {
      v(!0), n?.(o("toast.syncing_map"));
      try {
        N && s.states[N] ? await s.callService("button", "press", { entity_id: N }) : await s.callService("botslab_vacuum", "sync_map", { entity_id: l.entity_id });
      } catch (Q) {
        _e.error("MapSelector", "Failed to sync map", Q), n?.(o("toast.map_sync_failed"));
      } finally {
        window.setTimeout(() => v(!1), 900);
      }
    }
  }, [l.entity_id, s, g, n, N, o]);
  return A.useEffect(() => {
    function Q(G) {
      const B = G.composedPath();
      y.current && !B.includes(y.current) && m(!1);
    }
    if (d)
      return document.addEventListener("mousedown", Q), () => document.removeEventListener("mousedown", Q);
  }, [d]), A.useEffect(() => {
    function Q(G) {
      G.key === "Escape" && m(!1);
    }
    if (d)
      return document.addEventListener("keydown", Q), () => document.removeEventListener("keydown", Q);
  }, [d]), /* @__PURE__ */ _.jsx("div", { className: "map-selector", ref: y, children: /* @__PURE__ */ _.jsxs("div", { className: "map-selector__bar", children: [
    /* @__PURE__ */ _.jsxs("div", { className: "map-selector__picker", children: [
      /* @__PURE__ */ _.jsxs(
        "button",
        {
          className: `map-selector__button ${d ? "map-selector__button--open" : ""} ${K ? "map-selector__button--disabled" : ""} ${te ? "" : "map-selector__button--static"}`,
          onClick: () => te && !K && !f && m((Q) => !Q),
          type: "button",
          disabled: K || !te,
          "aria-expanded": te ? d : void 0,
          "aria-haspopup": te ? "listbox" : void 0,
          children: [
            /* @__PURE__ */ _.jsx("span", { className: "map-selector__icon", children: Z ? /* @__PURE__ */ _.jsx(Zg, { size: 15, className: "map-selector__spinner" }) : /* @__PURE__ */ _.jsx(Ql, { size: 15 }) }),
            /* @__PURE__ */ _.jsx("span", { className: "map-selector__label", children: f ? o("map_selector.switching") : ee }),
            te && /* @__PURE__ */ _.jsx(
              td,
              {
                size: 15,
                className: `map-selector__chevron ${d ? "map-selector__chevron--open" : ""}`
              }
            )
          ]
        }
      ),
      d && te && /* @__PURE__ */ _.jsx("div", { className: "map-selector__dropdown", role: "listbox", children: Y.map((Q) => {
        const G = X ? Rl(Q.id, X.id) : Rl(Q.id, D), B = Q.custom_name || Q.name;
        return /* @__PURE__ */ _.jsxs(
          "button",
          {
            className: `map-selector__option ${G ? "map-selector__option--selected" : ""}`,
            onClick: () => {
              re(Q);
            },
            type: "button",
            role: "option",
            "aria-selected": G,
            children: [
              /* @__PURE__ */ _.jsx("span", { className: "map-selector__option-name", children: B }),
              G && /* @__PURE__ */ _.jsx(Yg, { size: 15, className: "map-selector__option-check" })
            ]
          },
          String(Q.id)
        );
      }) })
    ] }),
    /* @__PURE__ */ _.jsx(
      "button",
      {
        className: `map-selector__sync-btn ${g ? "map-selector__sync-btn--syncing" : ""}`,
        onClick: () => {
          me();
        },
        type: "button",
        disabled: g,
        "aria-label": o("map_selector.sync_map"),
        title: o("map_selector.sync_map"),
        children: /* @__PURE__ */ _.jsx(J0, { size: 15, className: g ? "map-selector__spinner" : void 0 })
      }
    )
  ] }) });
}
function R5({
  cleaningMode: n,
  onClick: i,
  onRepeatClick: o,
  repeatCount: l = 1
}) {
  const { t: s } = je(), { phase: d, isCustomizedCleaning: m } = Xn(), p = d === "cleaning" || d === "paused", g = (k) => m ? qg : th(k) || Kg, v = (k) => m ? s("customize.title") : Wg(k, s) || s("cleaning_mode.custom"), y = (k) => {
    k.stopPropagation(), o?.();
  };
  return /* @__PURE__ */ _.jsxs("div", { className: "cleaning-mode-button-wrapper", children: [
    /* @__PURE__ */ _.jsxs("button", { onClick: i, className: "cleaning-mode-button", type: "button", children: [
      /* @__PURE__ */ _.jsxs("div", { className: "cleaning-mode-button__content", children: [
        /* @__PURE__ */ _.jsx("span", { className: "cleaning-mode-button__icon", children: g(n) }),
        /* @__PURE__ */ _.jsx("span", { className: "cleaning-mode-button__text", children: v(n) })
      ] }),
      /* @__PURE__ */ _.jsx("span", { className: "cleaning-mode-button__arrow", children: "›" })
    ] }),
    o && /* @__PURE__ */ _.jsxs(
      "button",
      {
        type: "button",
        className: `cleaning-mode-button-wrapper__repeats ${p ? "cleaning-mode-button-wrapper__repeats--disabled" : ""}`,
        onClick: y,
        title: s("cleaning_mode_button.repeats_tooltip"),
        disabled: p,
        children: [
          "x",
          l
        ]
      }
    )
  ] });
}
var $a = function(n, i) {
  return Number(n.toFixed(i));
}, j5 = function(n, i) {
  return i;
}, Oe = function(n, i, o) {
  o && typeof o == "function" && o(n, i);
}, D5 = function(n) {
  return -Math.cos(n * Math.PI) / 2 + 0.5;
}, L5 = function(n) {
  return n;
}, U5 = function(n) {
  return n * n;
}, Y5 = function(n) {
  return n * (2 - n);
}, Z5 = function(n) {
  return n < 0.5 ? 2 * n * n : -1 + (4 - 2 * n) * n;
}, H5 = function(n) {
  return n * n * n;
}, B5 = function(n) {
  return --n * n * n + 1;
}, G5 = function(n) {
  return n < 0.5 ? 4 * n * n * n : (n - 1) * (2 * n - 2) * (2 * n - 2) + 1;
}, K5 = function(n) {
  return n * n * n * n;
}, q5 = function(n) {
  return 1 - --n * n * n * n;
}, V5 = function(n) {
  return n < 0.5 ? 8 * n * n * n * n : 1 - 8 * --n * n * n * n;
}, X5 = function(n) {
  return n * n * n * n * n;
}, $5 = function(n) {
  return 1 + --n * n * n * n * n;
}, P5 = function(n) {
  return n < 0.5 ? 16 * n * n * n * n * n : 1 + 16 * --n * n * n * n * n;
}, Bh = {
  easeOut: D5,
  linear: L5,
  easeInQuad: U5,
  easeOutQuad: Y5,
  easeInOutQuad: Z5,
  easeInCubic: H5,
  easeOutCubic: B5,
  easeInOutCubic: G5,
  easeInQuart: K5,
  easeOutQuart: q5,
  easeInOutQuart: V5,
  easeInQuint: X5,
  easeOutQuint: $5,
  easeInOutQuint: P5
}, Gh = function(n) {
  typeof n == "number" && cancelAnimationFrame(n);
}, vn = function(n) {
  n.mounted && (Gh(n.animation), n.isAnimating = !1, n.animation = null, n.velocity = null);
};
function Kh(n, i, o, l) {
  if (n.mounted) {
    var s = (/* @__PURE__ */ new Date()).getTime(), d = 1;
    vn(n), n.animation = function() {
      if (!n.mounted)
        return Gh(n.animation);
      var m = (/* @__PURE__ */ new Date()).getTime() - s, f = m / o, p = Bh[i], g = p(f);
      m >= o ? (l(d), n.animation = null) : n.animation && (l(g), requestAnimationFrame(n.animation));
    }, requestAnimationFrame(n.animation);
  }
}
function I5(n) {
  var i = n.scale, o = n.positionX, l = n.positionY;
  return !(Number.isNaN(i) || Number.isNaN(o) || Number.isNaN(l));
}
function Ta(n, i, o, l) {
  var s = I5(i);
  if (!(!n.mounted || !s)) {
    var d = n.setState, m = n.state, f = m.scale, p = m.positionX, g = m.positionY, v = i.scale - f, y = i.positionX - p, k = i.positionY - g;
    o === 0 ? d(i.scale, i.positionX, i.positionY) : Kh(n, l, o, function(S) {
      S !== 1 ? n.isAnimating = !0 : n.isAnimating = !1;
      var w = f + v * S, N = p + y * S, M = g + k * S;
      d(w, N, M);
    });
  }
}
function F5(n, i, o) {
  var l = n.offsetWidth, s = n.offsetHeight, d = i.offsetWidth, m = i.offsetHeight, f = d * o, p = m * o, g = l - f, v = s - p;
  return {
    wrapperWidth: l,
    wrapperHeight: s,
    newContentWidth: f,
    newDiffWidth: g,
    newContentHeight: p,
    newDiffHeight: v
  };
}
var Q5 = function(n, i, o, l, s, d, m) {
  var f = n > i ? o * (m ? 0.5 : 1) : 0, p = l > s ? d * (m ? 0.5 : 1) : 0, g = n - i - f, v = f, y = l - s - p, k = p;
  return {
    minPositionX: g,
    maxPositionX: v,
    minPositionY: y,
    maxPositionY: k,
    scaleWidthFactor: f,
    scaleHeightFactor: p
  };
}, zd = function(n, i) {
  var o = n.wrapperComponent, l = n.contentComponent, s = n.setup, d = s.centerZoomedOut, m = s.disablePadding;
  if (!o || !l)
    throw new Error("Components are not mounted");
  var f = F5(o, l, i), p = f.wrapperWidth, g = f.wrapperHeight, v = f.newContentWidth, y = f.newContentHeight, k = f.newDiffWidth, S = f.newDiffHeight, w = Q5(p, v, k, g, y, S, !!d), N = p >= v && g >= y;
  m && N && !d && (w.minPositionX = 0, w.maxPositionX = 0, w.minPositionY = 0, w.maxPositionY = 0);
  var M = n.setup, O = M.minPositionX, Y = M.maxPositionX, D = M.minPositionY, Z = M.maxPositionY;
  return O != null && (w.minPositionX = p * (1 - i) + O * i), Y != null && (w.maxPositionX = Y * i), D != null && (w.minPositionY = g * (1 - i) + D * i), Z != null && (w.maxPositionY = Z * i), w;
}, Po = function(n, i, o, l) {
  return l ? n < i ? $a(i, 2) : n > o ? $a(o, 2) : $a(n, 2) : $a(n, 2);
}, Bi = function(n, i) {
  var o = zd(n, i);
  return n.bounds = o, o;
};
function er(n, i, o, l, s, d, m) {
  var f = o.minPositionX, p = o.minPositionY, g = o.maxPositionX, v = o.maxPositionY, y = 0, k = 0;
  m && (y = s, k = d);
  var S = Po(n, f - y, g + y, l), w = Po(i, p - k, v + k, l);
  return { x: S, y: w };
}
function as(n, i, o, l, s, d) {
  var m = n.state, f = m.scale, p = m.positionX, g = m.positionY, v = l - f;
  if (typeof i != "number" || typeof o != "number")
    return console.error("Mouse X and Y position were not provided!"), { x: p, y: g };
  var y = p - i * v, k = g - o * v, S = er(y, k, s, d, 0, 0, null);
  return S;
}
var Tg = 1e-7;
function tr(n, i, o, l, s) {
  var d = s ? l : 0, m = Math.max(i - d, Tg), f = o + d;
  return !Number.isNaN(o) && n >= f ? f : !Number.isNaN(i) && n <= m ? m : Math.max(n, Tg);
}
var zg = function(n, i) {
  var o = n.setup.panning.excluded, l = n.isInitialized, s = n.wrapperComponent, d = i.target, m = "shadowRoot" in d && "composedPath" in i, f = m ? i.composedPath().some(function(v) {
    return v instanceof Element ? s?.contains(v) : !1;
  }) : s?.contains(d), p = l && d && f;
  if (!p)
    return !1;
  var g = nr(d, o);
  return !(g || d.getAttribute("draggable") === "true" || d.getAttribute("contenteditable") === "true" || d.isContentEditable);
}, Ng = function(n) {
  var i = n.isInitialized, o = n.isPanning, l = n.setup, s = l.panning.disabled, d = i && o && !s;
  return !!d;
}, J5 = function(n, i) {
  var o = n.state, l = o.positionX, s = o.positionY;
  n.isPanning = !0;
  var d = i.clientX, m = i.clientY;
  n.startCoords = { x: d - l, y: m - s };
}, W5 = function(n, i) {
  var o = i.touches, l = n.state, s = l.positionX, d = l.positionY;
  n.isPanning = !0;
  var m = o.length === 1;
  if (m) {
    var f = o[0].clientX, p = o[0].clientY;
    n.startCoords = { x: f - s, y: p - d };
  }
};
function eT(n) {
  var i = n.state, o = i.positionX, l = i.positionY, s = i.scale, d = n.setup, m = d.disabled, f = d.limitToBounds, p = d.centerZoomedOut, g = n.wrapperComponent;
  if (!(m || !g || !n.bounds)) {
    var v = n.bounds, y = v.maxPositionX, k = v.minPositionX, S = v.maxPositionY, w = v.minPositionY, N = o > y || o < k, M = l > S || l < w, O = o > y ? g.offsetWidth : n.setup.minPositionX || 0, Y = l > S ? g.offsetHeight : n.setup.minPositionY || 0, D = as(n, O, Y, s, n.bounds, f || p), Z = D.x, K = D.y;
    return {
      scale: s,
      positionX: N ? Z : o,
      positionY: M ? K : l
    };
  }
}
function qh(n, i, o, l, s) {
  var d = n.setup.limitToBounds, m = n.wrapperComponent, f = n.bounds, p = n.state, g = p.scale, v = p.positionX, y = p.positionY;
  if (!(m === null || f === null || i === v && o === y)) {
    var k = er(i, o, f, d, l, s, m), S = k.x, w = k.y;
    n.setState(g, S, w);
  }
}
var tT = function(n, i, o) {
  var l = n.startCoords, s = n.state, d = n.setup.panning, m = d.lockAxisX, f = d.lockAxisY, p = s.positionX, g = s.positionY;
  if (!l)
    return { x: p, y: g };
  var v = i - l.x, y = o - l.y, k = m ? p : v, S = f ? g : y;
  return { x: k, y: S };
}, wa = function(n, i, o) {
  var l = n.setup, s = n.state, d = l.minScale, m = l.disablePadding, f = l.centerZoomedOut, p = o ?? s.scale;
  return i > 0 && p >= d && !m && !f ? i : 0;
}, ba;
(function(n) {
  n.TRACK_PAD = "track_pad", n.MOUSE = "mouse", n.TOUCH = "touch";
})(ba || (ba = {}));
var nT = function(n) {
  var i = n.mounted, o = n.wrapperComponent, l = n.contentComponent, s = n.setup, d = s.disabled, m = s.velocityAnimation, f = s.limitToBounds, p = n.state.scale, g = m.disabled;
  if (g || d || !i || !o || !l)
    return !1;
  if (!f)
    return !0;
  var v = o.offsetWidth < l.offsetWidth * p || o.offsetHeight < l.offsetHeight * p;
  return v;
}, aT = function(n) {
  var i = n.mounted, o = n.velocity, l = n.bounds, s = n.setup, d = s.disabled, m = s.velocityAnimation, f = m.disabled, p = !f && !d && i;
  return !(!p || !o || !l);
};
function iT(n, i) {
  var o = n.setup.velocityAnimation, l = o.animationTime, s = o.maxAnimationTime, d = o.inertia;
  return Math.min(l * Math.max(1, Math.abs(i / d)), s);
}
function Ag(n, i, o, l, s, d, m, f, p, g) {
  if (s) {
    if (i > m && o > m) {
      var v = m + (n - m) * g;
      return v > p ? p : v < m ? m : v;
    }
    if (i < d && o < d) {
      var v = d + (n - d) * g;
      return v < f ? f : v > d ? d : v;
    }
  }
  return l ? i : Po(n, d, m, s);
}
function oT(n) {
  var i = 1, o = n.offsetWidth / window.innerWidth;
  return Number.isNaN(o) ? i : Math.min(i, o);
}
var Du = function(n, i, o) {
  var l = 0, s = n * o;
  return Number.isNaN(s) ? l : n < 0 ? Math.max(s, -i) : Math.min(s, i);
};
function rT(n, i, o) {
  var l, s, d = nT(n);
  if (d) {
    var m = n.lastMousePosition, f = n.velocityTime, p = n.setup, g = n.wrapperComponent, v = p.velocityAnimation, y = v.maxStrengthMouse, k = v.maxStrengthTouch, S = v.sensitivityTouch, w = v.sensitivityMouse, N = Date.now();
    if (m && f && g) {
      var M = oT(g), O = (l = {}, l[ba.TOUCH] = S, l[ba.MOUSE] = w, l)[o], Y = (s = {}, s[ba.TOUCH] = k, s[ba.MOUSE] = y, s)[o], D = i.x - m.x, Z = i.y - m.y, K = Du(D / M, Y, O), te = Du(Z / M, Y, O), X = N - f, ee = D * D + Z * Z, re = Du(Math.sqrt(ee) / X, Y, O);
      n.velocity = { velocityX: K, velocityY: te, total: re };
    }
    n.lastMousePosition = i, n.velocityTime = N;
  }
}
function lT(n) {
  var i = n.velocity, o = n.bounds, l = n.setup, s = n.wrapperComponent, d = aT(n);
  if (!(!d || !i || !o || !s)) {
    var m = i.velocityX, f = i.velocityY, p = i.total, g = o.maxPositionX, v = o.minPositionX, y = o.maxPositionY, k = o.minPositionY, S = l.limitToBounds, w = l.autoAlignment, N = l.zoomAnimation, M = l.panning, O = M.lockAxisY, Y = M.lockAxisX, D = N.animationType, Z = w.sizeX, K = w.sizeY, te = w.velocityAlignmentTime, X = te, ee = iT(n, p), re = Math.max(ee, X), me = wa(n, Z), Q = wa(n, K), G = me * s.offsetWidth / 100, B = Q * s.offsetHeight / 100, I = g + G, F = v - G, T = y + B, J = k - B, ne = n.state, fe = (/* @__PURE__ */ new Date()).getTime();
    Kh(n, D, re, function(ie) {
      var E = n.state, L = E.scale, W = E.positionX, ae = E.positionY, le = (/* @__PURE__ */ new Date()).getTime() - fe, ge = le / X, ve = Bh[w.animationType], Ge = 1 - ve(Math.min(1, ge)), Ae = 1 - ie, yt = W + m * Ae, Dt = ae + f * Ae, dn = Ag(yt, ne.positionX, W, Y, S, v, g, F, I, Ge), mn = Ag(Dt, ne.positionY, ae, O, S, k, y, J, T, Ge);
      if (W !== yt || ae !== Dt) {
        n.setState(L, dn, mn);
        var ct = n.props.onPanning;
        ct && ct(Ne(n), {});
      }
    });
  }
}
function Cg(n, i) {
  var o = n.state, l = o.scale, s = o.positionX, d = o.positionY;
  n.panStartPosition = { x: s, y: d }, vn(n), Bi(n, l), window.TouchEvent !== void 0 && i instanceof TouchEvent ? W5(n, i) : J5(n, i);
}
function Vh(n, i) {
  var o = n.state.scale, l = n.setup, s = l.minScale, d = l.autoAlignment, m = d.disabled, f = d.sizeX, p = d.sizeY, g = d.animationTime, v = d.animationType, y = m || o < s || !f && !p;
  if (!y) {
    var k = eT(n);
    k && Ta(n, k, g, v);
  }
}
function Mg(n, i, o, l) {
  var s = n.startCoords, d = n.setup, m = d.autoAlignment, f = m.sizeX, p = m.sizeY;
  if (s) {
    var g = tT(n, i, o), v = g.x, y = g.y, k = wa(n, f), S = wa(n, p);
    rT(n, { x: v, y }, l), qh(n, v, y, k, S);
  }
}
function sT(n, i) {
  if (n.isPanning) {
    var o = n.velocity, l = n.wrapperComponent, s = n.contentComponent;
    n.isPanning = !1;
    var d = n.state, m = d.positionX, f = d.positionY, p = d.scale, g = n.panStartPosition;
    if (n.panStartPosition = null, g) {
      var v = m - g.x, y = f - g.y;
      if (v * v + y * y <= 25)
        return;
    }
    n.isAnimating = !1, n.animation = null;
    var k = l?.offsetWidth || 0, S = l?.offsetHeight || 0, w = (s?.offsetWidth || 0) * p, N = (s?.offsetHeight || 0) * p, M = !n.setup.limitToBounds || k < w || S < N, O = !i && o && o.total > 0.1 && M;
    O ? lT(n) : Vh(n);
  }
}
function Nd(n, i, o, l) {
  var s = n.setup, d = s.minScale, m = s.maxScale, f = s.limitToBounds, p = tr($a(i, 2), d, m, 0, !1), g = Bi(n, p), v = as(n, o, l, p, g, f), y = v.x, k = v.y;
  return { scale: p, positionX: y, positionY: k };
}
function Ad(n, i, o) {
  var l = n.state.scale, s = n.wrapperComponent, d = n.setup, m = d.minScale, f = d.maxScale, p = d.limitToBounds, g = d.zoomAnimation, v = g.disabled, y = g.animationTime, k = g.animationType, S = l >= m && l <= f, w = v || S;
  if ((l >= 1 || p) && Vh(n), !(w || !s || !n.mounted)) {
    var N = i || s.offsetWidth / 2, M = o || s.offsetHeight / 2, O = l < m ? m : f, Y = Nd(n, O, N, M);
    Y && Ta(n, Y, y, k);
  }
}
var sn = function() {
  return sn = Object.assign || function(i) {
    for (var o, l = 1, s = arguments.length; l < s; l++) {
      o = arguments[l];
      for (var d in o) Object.prototype.hasOwnProperty.call(o, d) && (i[d] = o[d]);
    }
    return i;
  }, sn.apply(this, arguments);
};
function Og(n, i, o) {
  for (var l = 0, s = i.length, d; l < s; l++)
    (d || !(l in i)) && (d || (d = Array.prototype.slice.call(i, 0, l)), d[l] = i[l]);
  return n.concat(d || Array.prototype.slice.call(i));
}
var Lu = {
  scale: 1,
  positionX: 0,
  positionY: 0
}, Xa = {
  disabled: !1,
  minPositionX: null,
  maxPositionX: null,
  minPositionY: null,
  maxPositionY: null,
  minScale: 1,
  maxScale: 8,
  limitToBounds: !0,
  centerZoomedOut: !1,
  centerOnInit: !1,
  disablePadding: !1,
  smooth: !0,
  detached: !1,
  wheel: {
    step: 0.015,
    disabled: !1,
    wheelDisabled: !1,
    touchPadDisabled: !1,
    activationKeys: [],
    excluded: []
  },
  trackPadPanning: {
    disabled: !0,
    velocityDisabled: !1,
    lockAxisX: !1,
    lockAxisY: !1,
    activationKeys: [],
    excluded: []
  },
  panning: {
    disabled: !1,
    velocityDisabled: !1,
    lockAxisX: !1,
    lockAxisY: !1,
    allowLeftClickPan: !0,
    allowMiddleClickPan: !0,
    allowRightClickPan: !0,
    activationKeys: [],
    excluded: []
  },
  pinch: {
    step: 5,
    disabled: !1,
    allowPanning: !0,
    excluded: []
  },
  doubleClick: {
    disabled: !1,
    step: 0.7,
    mode: "zoomIn",
    animationType: "easeOut",
    animationTime: 200,
    excluded: []
  },
  zoomAnimation: {
    disabled: !1,
    size: 0.4,
    animationTime: 200,
    animationType: "easeOut"
  },
  autoAlignment: {
    disabled: !1,
    sizeX: 100,
    sizeY: 100,
    animationTime: 200,
    velocityAlignmentTime: 400,
    animationType: "easeOut"
  },
  velocityAnimation: {
    disabled: !1,
    sensitivityMouse: 1,
    sensitivityTouch: 1.2,
    maxStrengthMouse: 20,
    maxStrengthTouch: 40,
    inertia: 1,
    animationTime: 300,
    maxAnimationTime: 800,
    animationType: "easeOut"
  }
}, Ju = {
  wrapperClass: "react-transform-wrapper",
  contentClass: "react-transform-component"
}, Xh = function(n) {
  var i, o, l, s, d, m, f, p, g, v = Math.max((i = n.minScale) !== null && i !== void 0 ? i : Xa.minScale, 1e-7), y = (o = n.maxScale) !== null && o !== void 0 ? o : Xa.maxScale, k = (l = n.initialScale) !== null && l !== void 0 ? l : Lu.scale, S = Math.min(Math.max(k, v), y), w = Po((s = n.initialPositionX) !== null && s !== void 0 ? s : Lu.positionX, (d = n.minPositionX) !== null && d !== void 0 ? d : -1 / 0, (m = n.maxPositionX) !== null && m !== void 0 ? m : 1 / 0, n.minPositionX != null || n.maxPositionX != null), N = Po((f = n.initialPositionY) !== null && f !== void 0 ? f : Lu.positionY, (p = n.minPositionY) !== null && p !== void 0 ? p : -1 / 0, (g = n.maxPositionY) !== null && g !== void 0 ? g : 1 / 0, n.minPositionY != null || n.maxPositionY != null);
  return {
    previousScale: S,
    scale: S,
    positionX: w,
    positionY: N
  };
}, Rg = function(n) {
  var i = sn({}, Xa);
  return Object.keys(n).forEach(function(o) {
    var l = o, s = typeof n[l] < "u", d = typeof Xa[l] < "u";
    if (d && s) {
      var m = Object.prototype.toString.call(Xa[l]), f = m === "[object Object]", p = m === "[object Array]";
      f ? i[l] = sn(sn({}, Xa[l]), n[l]) : p ? i[l] = Og(Og([], Xa[l], !0), n[l]) : i[l] = n[l];
    }
  }), i.minScale <= 0 && (i.minScale = 1e-7), i;
}, $h = function(n, i, o) {
  var l = n.state.scale, s = n.wrapperComponent, d = n.setup, m = d.maxScale, f = d.minScale, p = d.zoomAnimation, g = d.smooth, v = p.size;
  if (!s)
    throw new Error("Wrapper is not mounted");
  var y = g ? l * Math.exp(i * o) : l + i * o, k = tr($a(y, 3), f, m, v, !1);
  return k;
};
function Ph(n, i, o, l, s) {
  var d, m, f = n.wrapperComponent, p = n.state, g = p.scale, v = p.positionX, y = p.positionY, k = n.setup.zoomAnimation;
  if (!f)
    return console.error("No WrapperComponent found");
  var S = k.disabled ? 0 : l, w = f.offsetWidth, N = f.offsetHeight, M = (w / 2 - v) / g, O = (N / 2 - y) / g, Y = $h(n, i, o), D = Nd(n, Y, M, O);
  if (!D)
    return console.error("Error during zoom event. New transformation state was not calculated.");
  var Z = n.props, K = Z.onZoomStart, te = Z.onZoom, X = Z.onZoomStop, ee = new MouseEvent("mousemove", { bubbles: !0 }), re = Ne(n);
  Oe(re, ee, K), Oe(re, ee, te), Ta(n, D, S, s);
  var me = (m = (d = f.ownerDocument) === null || d === void 0 ? void 0 : d.defaultView) !== null && m !== void 0 ? m : typeof window < "u" ? window : null;
  me && me.setTimeout(function() {
    n.mounted && Oe(Ne(n), ee, X);
  }, S);
}
function Ih(n, i, o, l) {
  var s, d, m = n.setup, f = n.wrapperComponent, p = n.contentComponent, g = m.limitToBounds, v = m.centerOnInit, y = Xh(n.props), k = n.state, S = k.scale, w = k.positionX, N = k.positionY;
  if (f) {
    var M = y.positionX, O = y.positionY;
    if (v && p) {
      var Y = Cd(y.scale, f, p);
      M = Y.positionX, O = Y.positionY;
    }
    var D = zd(n, y.scale), Z = er(M, O, D, g, 0, 0, f), K = {
      scale: y.scale,
      positionX: Z.x,
      positionY: Z.y
    };
    if (!(S === y.scale && w === y.positionX && N === y.positionY)) {
      l?.();
      var te = n.props, X = te.onZoomStart, ee = te.onZoom, re = te.onZoomStop, me = new MouseEvent("mousemove", { bubbles: !0 }), Q = Ne(n);
      Oe(Q, me, X), Oe(Q, me, ee), Ta(n, K, i, o);
      var G = (d = (s = f.ownerDocument) === null || s === void 0 ? void 0 : s.defaultView) !== null && d !== void 0 ? d : typeof window < "u" ? window : null;
      G && G.setTimeout(function() {
        n.mounted && Oe(Ne(n), me, re);
      }, i);
    }
  }
}
function cT(n, i, o, l) {
  var s = n.getBoundingClientRect(), d = i.getBoundingClientRect(), m = o.getBoundingClientRect(), f = d.x * l.scale, p = d.y * l.scale;
  return {
    x: (s.x - m.x + f) / l.scale,
    y: (s.y - m.y + p) / l.scale
  };
}
function uT(n, i, o, l, s) {
  l === void 0 && (l = 0), s === void 0 && (s = 0);
  var d = n.wrapperComponent, m = n.contentComponent, f = n.state, p = n.setup, g = p.limitToBounds, v = p.minScale, y = p.maxScale;
  if (!d || !m)
    return f;
  var k = d.getBoundingClientRect(), S = i.getBoundingClientRect(), w = cT(i, d, m, f), N = w.x, M = w.y, O = S.width / f.scale, Y = S.height / f.scale, D = d.offsetWidth / O, Z = d.offsetHeight / Y, K = tr(o || Math.min(D, Z), v, y, 0, !1), te = (k.width - O * K) / 2, X = (k.height - Y * K) / 2, ee = (k.left - N) * K + te + l, re = (k.top - M) * K + X + s, me = zd(n, K), Q = er(ee, re, me, g, 0, 0, d), G = Q.x, B = Q.y;
  return { positionX: G, positionY: B, scale: K };
}
var dT = function(n) {
  return function(i, o, l) {
    i === void 0 && (i = 0.5), o === void 0 && (o = 300), l === void 0 && (l = "easeOut"), Ph(n, 1, i, o, l);
  };
}, mT = function(n) {
  return function(i, o, l) {
    i === void 0 && (i = 0.5), o === void 0 && (o = 300), l === void 0 && (l = "easeOut"), Ph(n, -1, i, o, l);
  };
}, fT = function(n) {
  return function(i, o, l, s, d) {
    s === void 0 && (s = 300), d === void 0 && (d = "easeOut");
    var m = n.state, f = m.positionX, p = m.positionY, g = m.scale, v = n.wrapperComponent, y = n.contentComponent, k = n.setup.disabled;
    if (!(k || !v || !y)) {
      var S = {
        positionX: Number.isNaN(i) ? f : i,
        positionY: Number.isNaN(o) ? p : o,
        scale: Number.isNaN(l) ? g : l
      };
      Ta(n, S, s, d);
    }
  };
}, _T = function(n) {
  return function(i, o) {
    i === void 0 && (i = 200), o === void 0 && (o = "easeOut"), Ih(n, i, o);
  };
}, pT = function(n) {
  return function(i, o, l) {
    o === void 0 && (o = 200), l === void 0 && (l = "easeOut");
    var s = n.state, d = n.wrapperComponent, m = n.contentComponent;
    if (d && m) {
      var f = Cd(i || s.scale, d, m);
      Ta(n, f, o, l);
    }
  };
}, gT = function(n) {
  return function(i, o, l, s, d, m) {
    l === void 0 && (l = 600), s === void 0 && (s = "easeOut"), d === void 0 && (d = 0), m === void 0 && (m = 0), vn(n);
    var f = n.wrapperComponent, p = typeof i == "string" ? document.getElementById(i) : i;
    if (f && p && f.contains(p)) {
      var g = uT(n, p, o, d, m);
      Ta(n, g, l, s);
    }
  };
}, Il = function(n) {
  return {
    instance: n,
    state: n.state,
    zoomIn: dT(n),
    zoomOut: mT(n),
    setTransform: fT(n),
    resetTransform: _T(n),
    centerView: pT(n),
    zoomToElement: gT(n)
  };
}, Fh = function(n) {
  return {
    instance: n,
    state: n.state
  };
}, Ne = function(n) {
  var i = {};
  return Object.assign(i, Fh(n)), Object.assign(i, Il(n)), i;
}, Uu = !1;
function Yu() {
  try {
    var n = {
      get passive() {
        return Uu = !0, !1;
      }
    };
    return n;
  } catch {
    return Uu = !1, Uu;
  }
}
var jl = ".".concat(Ju.wrapperClass), nr = function(n, i) {
  return i.some(function(o) {
    return n.matches("".concat(jl, " ").concat(o, ", ").concat(jl, " .").concat(o, ", ").concat(jl, " ").concat(o, " *, ").concat(jl, " .").concat(o, " *"));
  });
}, Io = function(n) {
  n && clearTimeout(n);
}, hT = function(n) {
  return Number.parseFloat(n.toFixed(8));
}, Qh = function(n, i, o) {
  var l = hT(o);
  return "translate(".concat(n, "px, ").concat(i, "px) scale(").concat(l, ")");
}, Cd = function(n, i, o) {
  var l = o.offsetWidth * n, s = o.offsetHeight * n, d = (i.offsetWidth - l) / 2, m = (i.offsetHeight - s) / 2;
  return {
    scale: n,
    positionX: d,
    positionY: m
  };
};
function vT(n, i) {
  n != null && (typeof n == "function" ? n(i) : n.current = i);
}
function yT(n) {
  return function(i) {
    n.forEach(function(o) {
      typeof o == "function" ? o(i) : o != null && (o.current = i);
    });
  };
}
var Jh = function(n, i) {
  var o = n.setup.wheel, l = o.disabled, s = o.wheelDisabled, d = o.touchPadDisabled, m = o.excluded, f = n.isInitialized, p = n.isPanning, g = i.target, v = f && !p && !l && g;
  if (!v || s && !i.ctrlKey || d && i.ctrlKey)
    return !1;
  var y = nr(g, m);
  if (y)
    return !1;
  var k = n.isPressingKeys(n.setup.wheel.activationKeys);
  return !!k;
}, bT = function(n, i) {
  var o = n.setup, l = o.disabled, s = o.trackPadPanning, d = s.activationKeys, m = s.excluded;
  if (!n.wrapperComponent || !n.contentComponent || l || s.disabled || i.ctrlKey)
    return !1;
  var f = Jh(n, i);
  if (f)
    return !1;
  var p = i.target, g = nr(p, m);
  if (g)
    return !1;
  var v = n.isPressingKeys(d);
  return !!v;
}, ST = function(n) {
  return n ? n.deltaY < 0 ? 1 : -1 : 0;
};
function kT(n, i) {
  var o = ST(n), l = j5(i, o);
  return l;
}
function Wh(n, i, o) {
  var l = i.getBoundingClientRect(), s = 0, d = 0;
  if ("clientX" in n)
    s = (n.clientX - l.left) / o, d = (n.clientY - l.top) / o;
  else {
    var m = n.touches[0];
    s = (m.clientX - l.left) / o, d = (m.clientY - l.top) / o;
  }
  return (Number.isNaN(s) || Number.isNaN(d)) && console.error("No mouse or touch offset found"), {
    x: s,
    y: d
  };
}
var wT = function(n, i, o, l, s) {
  var d = n.state.scale, m = n.wrapperComponent, f = n.setup, p = f.maxScale, g = f.minScale, v = f.zoomAnimation, y = f.disablePadding, k = v.size, S = v.disabled;
  if (!m)
    throw new Error("Wrapper is not mounted");
  var w = d + i * o, N = l ? !1 : !S, M = tr(w, g, p, k, N && !y);
  return M;
}, ev = function(n, i) {
  var o = n.previousWheelEvent, l = n.state.scale, s = n.setup, d = s.maxScale, m = s.minScale;
  return o ? l < d || l > m || Math.sign(o.deltaY) !== Math.sign(i.deltaY) || o.deltaY > 0 && o.deltaY < i.deltaY || o.deltaY < 0 && o.deltaY > i.deltaY || Math.sign(o.deltaY) !== Math.sign(i.deltaY) : !1;
}, xT = function(n, i) {
  var o = n.setup.pinch, l = o.disabled, s = o.excluded, d = n.isInitialized, m = i.target, f = d && !l && m;
  if (!f)
    return !1;
  var p = nr(m, s);
  return !p;
}, ET = function(n) {
  var i = n.setup.pinch.disabled, o = n.isInitialized, l = n.pinchStartDistance, s = o && !i && l !== null;
  return !!s;
}, TT = function(n, i, o) {
  var l = o.getBoundingClientRect(), s = n.touches, d = s[0].clientX - l.left, m = s[0].clientY - l.top, f = s[1].clientX - l.left, p = s[1].clientY - l.top;
  return {
    x: (d + f) / 2 / i,
    y: (m + p) / 2 / i
  };
}, tv = function(n) {
  return Math.sqrt(Math.pow(n.touches[0].pageX - n.touches[1].pageX, 2) + Math.pow(n.touches[0].pageY - n.touches[1].pageY, 2));
}, zT = 5, NT = function(n, i) {
  var o = n.pinchStartScale, l = n.pinchStartDistance, s = n.setup, d = s.maxScale, m = s.minScale, f = s.zoomAnimation, p = s.disablePadding, g = s.pinch, v = f.size, y = f.disabled, k = g.step;
  if (!o || l === null)
    throw new Error("Pinch touches distance was not provided");
  if (i < 0)
    return n.state.scale;
  var S = i / l, w = S * o, N = (w - o) * (k / zT), M = o + N, O = M === 1 / 0 ? 0 : $a(M, 10);
  return tr(O, m, d, v, !y && !p);
}, nv = 160, av = 100, AT = function(n, i) {
  var o = n.props, l = o.onWheelStart, s = o.onZoomStart;
  n.wheelStopEventTimer || (vn(n), Oe(Ne(n), i, l), Oe(Ne(n), i, s));
}, CT = function(n, i) {
  var o = n.props, l = o.onWheel, s = o.onZoom, d = n.contentComponent, m = n.setup, f = n.state, p = f.scale, g = m.limitToBounds, v = m.centerZoomedOut, y = m.zoomAnimation, k = m.wheel, S = m.disablePadding, w = m.smooth, N = y.size, M = y.disabled, O = k.step;
  if (!d)
    throw new Error("Component not mounted");
  i.preventDefault(), i.stopPropagation();
  var Y = kT(i, null), D = w ? O * Math.abs(i.deltaY) : O, Z = wT(n, Y, D, !i.ctrlKey);
  if (p !== Z) {
    var K = Bi(n, Z), te = Wh(i, d, p), X = M || N === 0 || v || S, ee = g && X, re = as(n, te.x, te.y, Z, K, ee), me = re.x, Q = re.y;
    n.previousWheelEvent = i, n.setState(Z, me, Q), Oe(Ne(n), i, l), Oe(Ne(n), i, s);
  }
}, MT = function(n, i) {
  var o = n.props, l = o.onWheelStop, s = o.onZoomStop;
  Io(n.wheelAnimationTimer), n.wheelAnimationTimer = setTimeout(function() {
    n.mounted && (Ad(n, i.x, i.y), n.wheelAnimationTimer = null);
  }, av);
  var d = ev(n, i);
  d && (Io(n.wheelStopEventTimer), n.wheelStopEventTimer = setTimeout(function() {
    n.mounted && (n.wheelStopEventTimer = null, Oe(Ne(n), i, l), Oe(Ne(n), i, s));
  }, nv));
}, OT = function(n, i) {
  var o = n.props, l = o.onWheelStart, s = o.onPanningStart;
  n.wheelStopEventTimer || (vn(n), Oe(Ne(n), i, l), Oe(Ne(n), i, s));
}, RT = function(n, i) {
  var o = n.props, l = o.onWheelStop, s = o.onPanningStop;
  Io(n.wheelAnimationTimer), n.wheelAnimationTimer = setTimeout(function() {
    n.mounted && (Ad(n, i.x, i.y), n.wheelAnimationTimer = null);
  }, av);
  var d = ev(n, i);
  d && (Io(n.wheelStopEventTimer), n.wheelStopEventTimer = setTimeout(function() {
    n.mounted && (n.wheelStopEventTimer = null, Oe(Ne(n), i, l), Oe(Ne(n), i, s));
  }, nv));
}, iv = function(n) {
  for (var i = 0, o = 0, l = 0; l < 2; l += 1)
    i += n.touches[l].clientX, o += n.touches[l].clientY;
  var s = i / 2, d = o / 2;
  return { x: s, y: d };
}, jT = function(n, i) {
  var o = tv(i);
  n.pinchStartDistance = o, n.lastDistance = o, n.pinchStartScale = n.state.scale, n.isPanning = !1, n.isPinching = !0, n.pinchPreviousCenter = iv(i), vn(n);
}, DT = function(n, i) {
  var o = n.contentComponent, l = n.pinchStartDistance, s = n.wrapperComponent, d = n.pinchPreviousCenter, m = n.state.scale, f = n.setup, p = f.limitToBounds, g = f.centerZoomedOut, v = f.zoomAnimation, y = f.autoAlignment, k = f.pinch, S = f.panning, w = v.disabled, N = v.size, M = k.allowPanning;
  if (!(l === null || !o)) {
    var O = TT(i, m, o);
    if (!(!Number.isFinite(O.x) || !Number.isFinite(O.y))) {
      var Y = tv(i), D = NT(n, Y), Z = iv(i), K = m / D, te = (Z.x - (d?.x || 0)) * K, X = (Z.y - (d?.y || 0)) * K;
      if (!(D === m && te === 0 && X === 0)) {
        n.pinchPreviousCenter = Z;
        var ee = Bi(n, D), re = w || N === 0 || g, me = p && re, Q = as(n, O.x, O.y, D, ee, me), G = Q.x, B = Q.y;
        if (n.pinchMidpoint = O, n.lastDistance = Y, S.disabled || !M)
          n.setState(D, G, B);
        else {
          var I = y.sizeX, F = y.sizeY, T = wa(n, I, D), J = wa(n, F, D), ne = G + te, fe = B + X, ie = er(ne, fe, ee, p, T, J, s), E = ie.x, L = ie.y;
          n.setState(D, E, L);
        }
      }
    }
  }
}, LT = function(n) {
  var i = n.pinchMidpoint;
  n.velocity = null, n.lastDistance = null, n.pinchMidpoint = null, n.pinchStartScale = null, n.pinchStartDistance = null, n.isPinching = !1, Ad(n, i?.x, i?.y);
}, ov = function(n, i) {
  var o = n.props.onZoomStop, l = n.setup.doubleClick.animationTime;
  Io(n.doubleClickStopEventTimer), n.doubleClickStopEventTimer = setTimeout(function() {
    n.doubleClickStopEventTimer = null, Oe(Ne(n), i, o);
  }, l);
}, UT = function(n, i) {
  var o = n.props, l = o.onZoomStart, s = o.onZoom, d = n.setup.doubleClick, m = d.animationTime, f = d.animationType;
  Oe(Ne(n), i, l), Ih(n, m, f, function() {
    return Oe(Ne(n), i, s);
  }), ov(n, i);
};
function YT(n, i) {
  return n === "toggle" ? i === 1 ? 1 : -1 : n === "zoomOut" ? -1 : 1;
}
function ZT(n, i) {
  var o = n.setup, l = n.doubleClickStopEventTimer, s = n.state, d = n.contentComponent, m = s.scale, f = n.props, p = f.onZoomStart, g = f.onZoom, v = o.doubleClick, y = v.disabled, k = v.mode, S = v.step, w = v.animationTime, N = v.animationType;
  if (!y && !l) {
    if (k === "reset")
      return UT(n, i);
    if (!d)
      return console.error("No ContentComponent found");
    var M = YT(k, n.state.scale), O = $h(n, M, S);
    if (m !== O) {
      Oe(Ne(n), i, p);
      var Y = Wh(i, d, m), D = Nd(n, O, Y.x, Y.y);
      if (!D)
        return console.error("Error during zoom event. New transformation state was not calculated.");
      Oe(Ne(n), i, g), Ta(n, D, w, N), ov(n, i);
    }
  }
}
var HT = function(n, i) {
  var o = n.isInitialized, l = n.setup, s = n.wrapperComponent, d = l.doubleClick, m = d.disabled, f = d.excluded, p = i.target, g = s?.contains(p), v = o && p && g && !m;
  if (!v)
    return !1;
  var y = nr(p, f);
  return !y;
}, BT = (
  /** @class */
  /* @__PURE__ */ (function() {
    function n(i) {
      var o = this;
      this.mounted = !0, this.onChangeCallbacks = /* @__PURE__ */ new Set(), this.onInitCallbacks = /* @__PURE__ */ new Set(), this.onTransformCallbacks = /* @__PURE__ */ new Set(), this.wrapperComponent = null, this.contentComponent = null, this.isInitialized = !1, this.bounds = null, this.previousWheelEvent = null, this.wheelStopEventTimer = null, this.wheelAnimationTimer = null, this.isPanning = !1, this.isWheelPanning = !1, this.startCoords = null, this.panStartPosition = null, this.lastTouch = null, this.isPinching = !1, this.distance = null, this.lastDistance = null, this.pinchStartDistance = null, this.pinchStartScale = null, this.pinchMidpoint = null, this.pinchPreviousCenter = null, this.doubleClickStopEventTimer = null, this.velocity = null, this.velocityTime = null, this.lastMousePosition = null, this.isAnimating = !1, this.animation = null, this.pressedKeys = {}, this.mount = function() {
        o.initializeWindowEvents();
      }, this.unmount = function() {
        o.cleanupWindowEvents();
      }, this.update = function(l) {
        o.props = l, o.wrapperComponent && o.contentComponent && Bi(o, o.state.scale), o.setup = Rg(l);
      }, this.initializeWindowEvents = function() {
        var l, s, d, m, f = Yu(), p = (l = o.wrapperComponent) === null || l === void 0 ? void 0 : l.ownerDocument, g = p?.defaultView;
        (s = o.wrapperComponent) === null || s === void 0 || s.addEventListener("wheel", o.onWheelPanning, f), (d = o.wrapperComponent) === null || d === void 0 || d.addEventListener("keyup", o.setKeyUnPressed, f), (m = o.wrapperComponent) === null || m === void 0 || m.addEventListener("keydown", o.setKeyPressed, f), g?.addEventListener("mousedown", o.onPanningStart, f), g?.addEventListener("mousemove", o.onPanning, f), g?.addEventListener("mouseup", o.onPanningStop, f), p?.addEventListener("mouseleave", o.clearPanning, f), g?.addEventListener("keyup", o.setKeyUnPressed, f), g?.addEventListener("keydown", o.setKeyPressed, f), g?.addEventListener("blur", o.handleWindowBlur);
      }, this.cleanupWindowEvents = function() {
        var l, s, d, m, f, p = Yu(), g = (l = o.wrapperComponent) === null || l === void 0 ? void 0 : l.ownerDocument, v = g?.defaultView;
        v?.removeEventListener("mousedown", o.onPanningStart, p), v?.removeEventListener("mousemove", o.onPanning, p), v?.removeEventListener("mouseup", o.onPanningStop, p), g?.removeEventListener("mouseleave", o.clearPanning, p), v?.removeEventListener("keyup", o.setKeyUnPressed, p), v?.removeEventListener("keydown", o.setKeyPressed, p), v?.removeEventListener("blur", o.handleWindowBlur), document.removeEventListener("mouseleave", o.clearPanning, p), (s = o.wrapperComponent) === null || s === void 0 || s.removeEventListener("wheel", o.onWheelPanning, p), (d = o.wrapperComponent) === null || d === void 0 || d.removeEventListener("keyup", o.setKeyUnPressed, p), (m = o.wrapperComponent) === null || m === void 0 || m.removeEventListener("keydown", o.setKeyPressed, p), vn(o), (f = o.observer) === null || f === void 0 || f.disconnect();
      }, this.handleInitializeWrapperEvents = function(l) {
        var s = Yu();
        l.addEventListener("wheel", o.onWheelZoom, s), l.addEventListener("dblclick", o.onDoubleClick, s), l.addEventListener("touchstart", o.onTouchPanningStart, s), l.addEventListener("touchmove", o.onTouchPanning, s), l.addEventListener("touchend", o.onTouchPanningStop, s);
      }, this.handleInitialize = function(l) {
        var s = o.setup.centerOnInit;
        o.applyTransformation(), o.onInitCallbacks.forEach(function(d) {
          return d(Ne(o));
        }), s && (o.setCenter(), o.observer = new ResizeObserver(function() {
          var d, m = l.offsetWidth, f = l.offsetHeight;
          (m > 0 || f > 0) && (o.onInitCallbacks.forEach(function(p) {
            return p(Ne(o));
          }), o.setCenter(), (d = o.observer) === null || d === void 0 || d.disconnect());
        }), setTimeout(function() {
          var d;
          (d = o.observer) === null || d === void 0 || d.disconnect();
        }, 5e3), o.observer.observe(l));
      }, this.onWheelZoom = function(l) {
        var s = o.setup.disabled;
        if (!s) {
          o.syncModifierKeys(l);
          var d = Jh(o, l);
          d && (AT(o, l), CT(o, l), MT(o, l));
        }
      }, this.onWheelPanning = function(l) {
        var s = o.props.onPanning, d = o.setup.trackPadPanning, m = d.lockAxisX, f = d.lockAxisY;
        o.syncModifierKeys(l);
        var p = bT(o, l);
        if (p) {
          l.preventDefault(), l.stopPropagation();
          var g = o.state, v = g.positionX, y = g.positionY, k = v - l.deltaX, S = y - l.deltaY, w = m ? v : k, N = f ? y : S, M = o.setup.autoAlignment, O = M.sizeX, Y = M.sizeY, D = wa(o, O), Z = wa(o, Y);
          w === v && N === y || (OT(o, l), qh(o, w, N, D, Z), Oe(Ne(o), l, s), RT(o, l));
        }
      }, this.onPanningStart = function(l) {
        var s = o.setup.disabled, d = o.props.onPanningStart;
        if (!s) {
          o.syncModifierKeys(l);
          var m = zg(o, l);
          if (m) {
            var f = o.isPressingKeys(o.setup.panning.activationKeys);
            f && (l.button === 0 && !o.setup.panning.allowLeftClickPan || l.button === 1 && !o.setup.panning.allowMiddleClickPan || l.button === 2 && !o.setup.panning.allowRightClickPan || (l.preventDefault(), l.stopPropagation(), vn(o), Cg(o, l), Oe(Ne(o), l, d)));
          }
        }
      }, this.onPanning = function(l) {
        var s = o.setup.disabled, d = o.props.onPanning;
        if (!s) {
          if (o.syncModifierKeys(l), o.isPanning && l.buttons === 0) {
            o.clearPanning(l);
            return;
          }
          var m = Ng(o);
          if (m) {
            var f = o.isPressingKeys(o.setup.panning.activationKeys);
            f && (l.preventDefault(), l.stopPropagation(), Mg(o, l.clientX, l.clientY, ba.MOUSE), Oe(Ne(o), l, d));
          }
        }
      }, this.onPanningStop = function(l) {
        var s = o.setup.panning.velocityDisabled, d = o.props.onPanningStop;
        o.isPanning && (sT(o, s), Oe(Ne(o), l, d));
      }, this.onPinchStart = function(l) {
        var s = o.setup.disabled, d = o.props.onPinchStart;
        if (!s) {
          var m = xT(o, l);
          m && (jT(o, l), vn(o), Oe(Ne(o), l, d));
        }
      }, this.onPinch = function(l) {
        var s = o.setup.disabled, d = o.props.onPinch;
        if (!s) {
          var m = ET(o);
          m && (l.preventDefault(), l.stopPropagation(), DT(o, l), Oe(Ne(o), l, d));
        }
      }, this.onPinchStop = function(l) {
        var s = o.props.onPinchStop;
        o.pinchStartScale && (LT(o), Oe(Ne(o), l, s));
      }, this.onTouchPanningStart = function(l) {
        var s = o.setup, d = s.disabled, m = s.doubleClick, f = o.props.onPanningStart;
        if (!d) {
          var p = !m?.disabled, g = o.lastTouch && +/* @__PURE__ */ new Date() - o.lastTouch < 200;
          if (p && g && l.touches.length === 1)
            o.onDoubleClick(l);
          else {
            o.lastTouch = +/* @__PURE__ */ new Date(), vn(o);
            var v = l.touches, y = v.length === 1, k = v.length === 2, S = zg(o, l);
            if (y) {
              if (!S)
                return;
              vn(o), Cg(o, l), Oe(Ne(o), l, f);
            }
            k && o.onPinchStart(l);
          }
        }
      }, this.onTouchPanning = function(l) {
        var s = o.setup.disabled, d = o.props.onPanning;
        if (o.isPanning && l.touches.length === 1) {
          if (s)
            return;
          var m = Ng(o);
          if (!m)
            return;
          l.cancelable && l.preventDefault(), l.stopPropagation();
          var f = l.touches[0];
          Mg(o, f.clientX, f.clientY, ba.TOUCH), Oe(Ne(o), l, d);
        } else l.touches.length > 1 && o.onPinch(l);
      }, this.onTouchPanningStop = function(l) {
        o.onPanningStop(l), o.onPinchStop(l);
      }, this.onDoubleClick = function(l) {
        var s = o.setup.disabled;
        if (!s) {
          var d = HT(o, l);
          d && ZT(o, l);
        }
      }, this.clearPanning = function(l) {
        o.isPanning && o.onPanningStop(l);
      }, this.handleWindowBlur = function() {
        o.pressedKeys = {}, o.isPanning && (o.isPanning = !1, o.startCoords = null);
      }, this.syncModifierKeys = function(l) {
        var s = l.ctrlKey, d = l.metaKey, m = l.shiftKey, f = l.altKey;
        typeof s == "boolean" && (o.pressedKeys.Control = s), typeof d == "boolean" && (o.pressedKeys.Meta = d), typeof m == "boolean" && (o.pressedKeys.Shift = m), typeof f == "boolean" && (o.pressedKeys.Alt = f);
      }, this.setKeyPressed = function(l) {
        o.pressedKeys[l.key] = !0;
      }, this.setKeyUnPressed = function(l) {
        o.pressedKeys[l.key] = !1;
      }, this.isPressingKeys = function(l) {
        return typeof l == "function" ? l(Object.entries(o.pressedKeys).filter(function(s) {
          var d = s[1];
          return d;
        }).map(function(s) {
          var d = s[0];
          return d;
        })) : l.length ? !!l.every(function(s) {
          return o.pressedKeys[s];
        }) : !0;
      }, this.setCenter = function() {
        if (o.wrapperComponent && o.contentComponent) {
          var l = Cd(o.state.scale, o.wrapperComponent, o.contentComponent);
          o.setState(l.scale, l.positionX, l.positionY);
        }
      }, this.handleTransformStyles = function(l, s, d) {
        return o.props.customTransform ? o.props.customTransform(l, s, d) : Qh(l, s, d);
      }, this.getContext = function() {
        return Ne(o);
      }, this.applyTransformation = function() {
        if (!(!o.mounted || !o.contentComponent)) {
          var l = o.state, s = l.scale, d = l.positionX, m = l.positionY, f = o.handleTransformStyles(d, m, s);
          o.props.detached || (o.contentComponent.style.transform = f), o.onTransformCallbacks.forEach(function(p) {
            return p({
              scale: s,
              positionX: d,
              positionY: m,
              previousScale: o.state.previousScale,
              ref: Ne(o)
            });
          });
        }
      }, this.setState = function(l, s, d) {
        var m = o.props.onTransform;
        if (!Number.isNaN(l) && !Number.isNaN(s) && !Number.isNaN(d)) {
          var f = Math.max(l, 1e-7);
          f !== o.state.scale && (o.state.previousScale = o.state.scale, o.state.scale = f), o.state.positionX = s, o.state.positionY = d, o.applyTransformation();
          var p = Ne(o);
          o.onChangeCallbacks.forEach(function(g) {
            return g(p);
          }), Oe(p, { scale: o.state.scale, positionX: s, positionY: d }, m);
        } else
          console.error("Detected NaN set state values");
      }, this.onTransform = function(l) {
        return o.onTransformCallbacks.has(l) || o.onTransformCallbacks.add(l), function() {
          o.onTransformCallbacks.delete(l);
        };
      }, this.onChange = function(l) {
        return o.onChangeCallbacks.has(l) || o.onChangeCallbacks.add(l), function() {
          o.onChangeCallbacks.delete(l);
        };
      }, this.onInit = function(l) {
        return o.onInitCallbacks.has(l) || o.onInitCallbacks.add(l), function() {
          o.onInitCallbacks.delete(l);
        };
      }, this.init = function(l, s) {
        o.cleanupWindowEvents(), o.wrapperComponent = l, o.contentComponent = s, Bi(o, o.state.scale), o.handleInitializeWrapperEvents(l), o.handleInitialize(s), o.initializeWindowEvents(), o.isInitialized = !0;
        var d = Ne(o);
        Oe(d, void 0, o.props.onInit), vT(o.props.ref, d);
      }, this.props = i, this.setup = Rg(this.props), this.state = Xh(this.props);
    }
    return n;
  })()
), ar = Qo.createContext(null), GT = function(n, i) {
  return typeof n == "function" ? n(i) : n;
}, KT = Qo.forwardRef(function(n, i) {
  var o = A.useRef(new BT(n)).current, l = GT(n.children, Il(o));
  return A.useImperativeHandle(i, function() {
    return Il(o);
  }, [o]), A.useEffect(function() {
    o.update(n);
  }, [o, n]), _.jsx(ar.Provider, sn({ value: o }, { children: l }));
});
Qo.forwardRef(function(n, i) {
  var o = A.useRef(null), l = A.useContext(ar);
  return A.useEffect(function() {
    return l.onChange(function(s) {
      if (o.current) {
        var d = 0, m = 0;
        o.current.style.transform = l.handleTransformStyles(d, m, 1 / s.instance.state.scale);
      }
    });
  }, [l]), _.jsx("div", sn({}, n, { ref: yT([o, i]) }));
});
function qT(n, i) {
  i === void 0 && (i = {});
  var o = i.insertAt;
  if (!(typeof document > "u")) {
    var l = document.head || document.getElementsByTagName("head")[0], s = document.createElement("style");
    s.type = "text/css", o === "top" && l.firstChild ? l.insertBefore(s, l.firstChild) : l.appendChild(s), s.styleSheet ? s.styleSheet.cssText = n : s.appendChild(document.createTextNode(n));
  }
}
var VT = `.transform-component-module_wrapper__SPB86 {
  position: relative;
  width: -moz-fit-content;
  width: fit-content;
  height: -moz-fit-content;
  height: fit-content;
  overflow: hidden;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  margin: 0;
  padding: 0;
  transform: translate3d(0, 0, 0);
}
.transform-component-module_content__FBWxo {
  display: flex;
  flex-wrap: wrap;
  width: -moz-fit-content;
  width: fit-content;
  height: -moz-fit-content;
  height: fit-content;
  margin: 0;
  padding: 0;
  transform-origin: 0% 0%;
}
.transform-component-module_content__FBWxo img {
  pointer-events: none;
}
.transform-component-module_infiniteGrid__Z-aP3 {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: radial-gradient(
    circle,
    rgba(0, 0, 0, 0.12) 1px,
    transparent 1px
  );
  background-size: 20px 20px;
  background-position: 0 0;
}
`, Zu = { wrapper: "transform-component-module_wrapper__SPB86", content: "transform-component-module_content__FBWxo", infiniteGrid: "transform-component-module_infiniteGrid__Z-aP3" };
qT(VT);
var XT = function(n) {
  var i = n.children, o = n.wrapperClass, l = o === void 0 ? "" : o, s = n.contentClass, d = s === void 0 ? "" : s, m = n.wrapperStyle, f = n.contentStyle, p = n.wrapperProps, g = p === void 0 ? {} : p, v = n.contentProps, y = v === void 0 ? {} : v, k = n.infinite, S = k === void 0 ? !1 : k, w = A.useContext(ar), N = w.init, M = w.cleanupWindowEvents, O = A.useRef(null), Y = A.useRef(null), D = A.useRef(null);
  return A.useEffect(function() {
    var Z = O.current, K = Y.current;
    return Z !== null && K !== null && N && N?.(Z, K), function() {
      M?.();
    };
  }, []), A.useEffect(function() {
    if (S) {
      var Z = D.current;
      if (Z) {
        var K = function() {
          var te = w.state, X = te.positionX, ee = te.positionY;
          Z.style.backgroundPosition = "".concat(X, "px ").concat(ee, "px");
        };
        return K(), w.onChange(K);
      }
    }
  }, [S, w]), _.jsxs("div", sn({}, g, { ref: O, className: "".concat(Ju.wrapperClass, " ").concat(Zu.wrapper, " ").concat(l), style: m }, { children: [S && _.jsx("div", { ref: D, className: Zu.infiniteGrid, "aria-hidden": !0 }), _.jsx("div", sn({}, y, { ref: Y, className: "".concat(Ju.contentClass, " ").concat(Zu.content, " ").concat(d), style: sn(sn({}, f), { transform: Qh(w.state.positionX, w.state.positionY, w.state.scale) }) }, { children: i }))] }));
};
function $T(n, i) {
  var o = Math.max(0, Math.min(n.x + n.width, i.x + i.width) - Math.max(n.x, i.x)), l = Math.max(0, Math.min(n.y + n.height, i.y + i.height) - Math.max(n.y, i.y));
  return o * l;
}
function PT(n) {
  var i = n.elementX, o = n.elementY, l = n.elementWidth, s = n.elementHeight, d = n.scale, m = n.positionX, f = n.positionY, p = n.viewportWidth, g = n.viewportHeight, v = n.margin, y = v === void 0 ? 0 : v, k = n.threshold, S = k === void 0 ? 0 : k, w = {
    x: -y,
    y: -y,
    width: p + 2 * y,
    height: g + 2 * y
  }, N = {
    x: i * d + m,
    y: o * d + f,
    width: l * d,
    height: s * d
  };
  if (S <= 0) {
    var M = N.x < w.x + w.width && N.x + N.width > w.x, O = N.y < w.y + w.height && N.y + N.height > w.y;
    return M && O;
  }
  var Y = N.width * N.height;
  if (Y <= 0)
    return !1;
  var D = $T(w, N);
  return D / Y >= S;
}
Qo.forwardRef(function(n, i) {
  var o = n.x, l = n.y, s = n.width, d = n.height, m = n.margin, f = m === void 0 ? 0 : m, p = n.threshold, g = p === void 0 ? 0 : p, v = n.placeholder, y = v === void 0 ? null : v, k = n.onShow, S = n.onHide, w = n.children, N = n.className, M = n.style, O = A.useContext(ar), Y = A.useState(!1), D = Y[0], Z = Y[1], K = A.useRef(!1), te = A.useRef(k), X = A.useRef(S);
  return te.current = k, X.current = S, A.useEffect(function() {
    var ee = function() {
      var Q, G, B = O.wrapperComponent;
      if (B) {
        var I = PT({
          elementX: o,
          elementY: l,
          elementWidth: s,
          elementHeight: d,
          scale: O.state.scale,
          positionX: O.state.positionX,
          positionY: O.state.positionY,
          viewportWidth: B.offsetWidth,
          viewportHeight: B.offsetHeight,
          margin: f,
          threshold: g
        });
        I !== K.current && (K.current = I, Z(I), I ? (Q = te.current) === null || Q === void 0 || Q.call(te) : (G = X.current) === null || G === void 0 || G.call(X));
      }
    };
    ee();
    var re = O.onChange(ee), me;
    return O.wrapperComponent || (me = O.onInit(function() {
      return ee();
    })), function() {
      re(), me?.();
    };
  }, [O, o, l, s, d, f, g]), D ? _.jsx("div", sn({ ref: i, className: N, style: M }, { children: w })) : y ? _.jsx(_.Fragment, { children: y }) : null;
});
var is = function() {
  var n = A.useContext(ar);
  if (!n)
    throw new Error("Transform context must be placed inside TransformWrapper");
  return n;
}, IT = function() {
  var n = is();
  return Il(n);
}, rv = function(n) {
  var i = is();
  A.useEffect(function() {
    var o, l = i.onChange(function(s) {
      o = n(Fh(s.instance));
    });
    return function() {
      l(), o?.();
    };
  }, [n, i]);
};
const FT = 10;
function QT({ room: n, path: i, isSelected: o, isBusy: l, onRoomToggle: s }) {
  const d = A.useRef(null), m = (y, k) => {
    d.current = null, y.hasPointerCapture(k) && y.releasePointerCapture(k);
  }, f = (y) => {
    !y.isPrimary || y.pointerType === "mouse" && y.button !== 0 || (d.current = { id: y.pointerId, x: y.clientX, y: y.clientY }, y.currentTarget.setPointerCapture(y.pointerId));
  }, p = (y) => {
    const k = d.current;
    if (!k || k.id !== y.pointerId)
      return;
    const S = Math.hypot(y.clientX - k.x, y.clientY - k.y) < FT;
    m(y.currentTarget, y.pointerId), S && !l && (_e.debug("RoomSegments", "Tap on room:", n.id, n.name), s(n.id, n.name));
  }, g = (y) => {
    d.current?.id === y.pointerId && m(y.currentTarget, y.pointerId);
  }, v = (y) => {
    d.current?.id === y.pointerId && (d.current = null);
  };
  return /* @__PURE__ */ _.jsx(
    "path",
    {
      d: i,
      className: `vacuum-map__room-segment ${o ? "vacuum-map__room-segment--selected" : ""}`,
      fill: o ? "var(--accent-bg, rgba(212, 175, 55, 0.3))" : "transparent",
      fillRule: "evenodd",
      clipRule: "evenodd",
      stroke: !l && o ? "var(--accent-color, #D4AF37)" : "rgba(255, 255, 255, 0.2)",
      strokeWidth: "2",
      style: { cursor: l ? "default" : "pointer", pointerEvents: l ? "none" : "auto" },
      "data-room-id": n.id,
      "data-room-name": n.name,
      onPointerDown: f,
      onPointerUp: p,
      onPointerCancel: g,
      onLostPointerCapture: v,
      children: /* @__PURE__ */ _.jsx("title", { children: n.name })
    }
  );
}
function JT({
  rooms: n,
  selectedRooms: i,
  onRoomToggle: o,
  transform: l,
  imageWidth: s,
  imageHeight: d
}) {
  const { phase: m } = Xn(), f = Xt(), p = Xg(m, f.state);
  _e.debug("RoomSegments", "Render, selectedRooms:", Array.from(i.keys()));
  const g = A.useMemo(() => n.filter((v) => v.visibility !== "Hidden").sort((v, y) => {
    const k = Math.abs(((v.x1 ?? 0) - (v.x0 ?? 0)) * ((v.y1 ?? 0) - (v.y0 ?? 0)));
    return Math.abs(((y.x1 ?? 0) - (y.x0 ?? 0)) * ((y.y1 ?? 0) - (y.y0 ?? 0))) - k;
  }).map((v) => ({
    room: v,
    path: QE(v, l)
  })), [n, l]);
  return !s || !d ? null : /* @__PURE__ */ _.jsx(
    "svg",
    {
      className: "vacuum-map__room-segments",
      viewBox: `0 0 ${s} ${d}`,
      preserveAspectRatio: "xMidYMid meet",
      children: g.map(({ room: v, path: y }) => {
        const k = i.has(v.id);
        return y ? /* @__PURE__ */ _.jsx(
          QT,
          {
            room: v,
            path: y,
            isSelected: k,
            isBusy: p,
            onRoomToggle: o
          },
          v.id
        ) : (_e.warn("No path for room:", v.id, v.name), null);
      })
    }
  );
}
const WT = A.memo(JT);
function ez({
  viewMode: n,
  onViewToggle: i,
  onZoomIn: o,
  onZoomOut: l,
  onZoomReset: s,
  showViewToggle: d = !1,
  showZoomControls: m = !0,
  isMapLocked: f,
  onToggleLock: p
}) {
  const { t: g } = je(), v = n === "map", y = n === "list", k = g(v ? "vacuum_map.switch_to_list" : "vacuum_map.switch_to_map"), S = v ? O0 : Ql, w = g(f ? "vacuum_map.unlock_map" : "vacuum_map.lock_map"), N = f ? U0 : D0;
  return /* @__PURE__ */ _.jsxs("div", { className: "map-controls", children: [
    d && i && /* @__PURE__ */ _.jsx("button", { className: "map-controls__button", onClick: i, "aria-label": k, title: k, children: /* @__PURE__ */ _.jsx(S, { size: 18 }) }),
    m && !f && !y && /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
      /* @__PURE__ */ _.jsx(
        "button",
        {
          className: "map-controls__button",
          onClick: o,
          "aria-label": g("vacuum_map.zoom_in"),
          title: g("vacuum_map.zoom_in"),
          children: /* @__PURE__ */ _.jsx(Hg, { size: 18 })
        }
      ),
      /* @__PURE__ */ _.jsx(
        "button",
        {
          className: "map-controls__button",
          onClick: l,
          "aria-label": g("vacuum_map.zoom_out"),
          title: g("vacuum_map.zoom_out"),
          children: /* @__PURE__ */ _.jsx(H0, { size: 18 })
        }
      ),
      /* @__PURE__ */ _.jsx(
        "button",
        {
          className: "map-controls__button",
          onClick: s,
          "aria-label": g("vacuum_map.zoom_reset"),
          title: g("vacuum_map.zoom_reset"),
          children: /* @__PURE__ */ _.jsx(e1, { size: 16 })
        }
      )
    ] }),
    !y && /* @__PURE__ */ _.jsx(
      "button",
      {
        className: `map-controls__button map-controls__button--lock${f ? " map-controls__button--locked" : ""}`,
        onClick: p,
        "aria-label": w,
        title: w,
        children: /* @__PURE__ */ _.jsx(N, { size: 16 })
      }
    )
  ] });
}
function tz({ rooms: n, selectedRooms: i, onRoomToggle: o }) {
  const { t: l } = je();
  return n.length === 0 ? /* @__PURE__ */ _.jsx("div", { className: "room-list-view", children: /* @__PURE__ */ _.jsx("div", { className: "room-list-view__empty", children: l("vacuum_map.no_rooms") }) }) : /* @__PURE__ */ _.jsxs("div", { className: "room-list-view", children: [
    /* @__PURE__ */ _.jsx("div", { className: "room-list-view__header", children: l("vacuum_map.room_list_overlay") }),
    /* @__PURE__ */ _.jsx("div", { className: "room-list-view__list", children: n.map((s) => {
      const d = i.has(s.id);
      return /* @__PURE__ */ _.jsxs(
        "button",
        {
          className: `room-list-view__item ${d ? "room-list-view__item--selected" : ""}`,
          onClick: () => o(s.id, s.name),
          children: [
            /* @__PURE__ */ _.jsx("span", { className: "room-list-view__item-name", children: s.name }),
            /* @__PURE__ */ _.jsx("span", { className: "room-list-view__item-check", children: d && /* @__PURE__ */ _.jsx(Yg, { size: 18 }) })
          ]
        },
        s.id
      );
    }) })
  ] });
}
const Di = 5, Ko = 18, Dl = 2.5, nz = 5;
function on(n, i, o) {
  return Math.max(i, Math.min(o, n));
}
function Hu(n, i, o, l) {
  if (!i || !o || !l) return null;
  const s = gd(n, i, o, l);
  if (!s.ok) return null;
  const d = Math.abs(s.zone.x2 - s.zone.x1) / 1e3, m = Math.abs(s.zone.y2 - s.zone.y1) / 1e3;
  return !Number.isFinite(d) || !Number.isFinite(m) || d <= 0 || m <= 0 ? null : `${d.toFixed(1)}×${m.toFixed(1)}m`;
}
function az({
  zones: n,
  onZonesChange: i,
  clearZoneLabel: o,
  mode: l = "zone",
  transform: s = null,
  imageWidth: d = 0,
  imageHeight: m = 0,
  maxZones: f = nz
}) {
  const p = is(), g = A.useRef(null), { phase: v } = Xn(), y = v !== "cleaning" && v !== "paused", [k, S] = A.useState(null), w = A.useRef(null), [N, M] = A.useState(p.state.scale);
  rv(
    A.useCallback((G) => {
      M(G.state.scale);
    }, [])
  );
  const O = 1 / N, Y = A.useCallback((G) => {
    w.current = G, S(G);
  }, []), D = A.useCallback((G, B) => {
    const I = g.current;
    if (!I) return null;
    const F = I.getBoundingClientRect();
    return F.width <= 0 || F.height <= 0 ? null : {
      x: on((G - F.left) / F.width * 100, 0, 100),
      y: on((B - F.top) / F.height * 100, 0, 100)
    };
  }, []), Z = A.useCallback(
    (G) => {
      if (!y || G.button !== 0 || n.length >= f) return;
      const B = D(G.clientX, G.clientY);
      B && (G.stopPropagation(), G.currentTarget.setPointerCapture(G.pointerId), Y({
        kind: "draw",
        pointerId: G.pointerId,
        startX: B.x,
        startY: B.y,
        currentX: B.x,
        currentY: B.y
      }));
    },
    [D, y, f, Y, n.length]
  ), K = A.useCallback(
    (G, B) => {
      if (!y || G.button !== 0) return;
      const I = n[B], F = D(G.clientX, G.clientY);
      !I || !F || (G.stopPropagation(), g.current?.setPointerCapture(G.pointerId), Y({
        kind: "move",
        pointerId: G.pointerId,
        index: B,
        startX: F.x,
        startY: F.y,
        originZone: I
      }));
    },
    [D, y, Y, n]
  ), te = A.useCallback(
    (G, B, I) => {
      if (!y || G.button !== 0) return;
      const F = n[B];
      F && (G.stopPropagation(), G.preventDefault(), g.current?.setPointerCapture(G.pointerId), Y({
        kind: "resize",
        pointerId: G.pointerId,
        index: B,
        handle: I,
        originZone: F
      }));
    },
    [y, Y, n]
  ), X = A.useCallback(
    (G) => {
      const B = w.current;
      if (!B || B.pointerId !== G.pointerId) return;
      const I = D(G.clientX, G.clientY);
      if (I) {
        if (B.kind === "draw") {
          Y({
            ...B,
            currentX: I.x,
            currentY: I.y
          });
          return;
        }
        if (B.kind === "move") {
          const F = B.originZone.x2 - B.originZone.x1, T = B.originZone.y2 - B.originZone.y1, J = I.x - B.startX, ne = I.y - B.startY, fe = on(B.originZone.x1 + J, 0, 100 - F), ie = on(B.originZone.y1 + ne, 0, 100 - T), E = {
            x1: fe,
            y1: ie,
            x2: fe + F,
            y2: ie + T
          };
          i(n.map((L, W) => W === B.index ? E : L));
          return;
        }
        if (B.kind === "resize") {
          const F = { ...B.originZone }, { handle: T } = B;
          (T === "top" || T === "nw" || T === "ne") && (F.y1 = on(I.y, 0, B.originZone.y2 - Di)), (T === "bottom" || T === "sw" || T === "se") && (F.y2 = on(I.y, B.originZone.y1 + Di, 100)), (T === "left" || T === "nw" || T === "sw") && (F.x1 = on(I.x, 0, B.originZone.x2 - Di)), (T === "right" || T === "ne" || T === "se") && (F.x2 = on(I.x, B.originZone.x1 + Di, 100)), i(n.map((J, ne) => ne === B.index ? F : J));
        }
      }
    },
    [D, i, Y, n]
  ), ee = A.useCallback(
    (G, B) => {
      const I = w.current;
      if (!(!I || I.pointerId !== G.pointerId)) {
        if (G.currentTarget.hasPointerCapture(G.pointerId) && G.currentTarget.releasePointerCapture(G.pointerId), !B && I.kind === "draw" && n.length < f) {
          const F = Math.abs(I.currentX - I.startX), T = Math.abs(I.currentY - I.startY);
          let J;
          if (F >= Dl || T >= Dl) {
            const ne = Math.min(I.startX, I.currentX), fe = Math.max(I.startX, I.currentX), ie = Math.min(I.startY, I.currentY), E = Math.max(I.startY, I.currentY), L = Math.max(Di, fe - ne), W = Math.max(Di, E - ie), ae = on(ne, 0, 100 - L), le = on(ie, 0, 100 - W);
            J = {
              x1: ae,
              y1: le,
              x2: ae + L,
              y2: le + W
            };
          } else {
            const ne = Ko / 2, fe = on(I.startX - ne, 0, 100 - Ko), ie = on(I.startY - ne, 0, 100 - Ko);
            J = {
              x1: fe,
              y1: ie,
              x2: fe + Ko,
              y2: ie + Ko
            };
          }
          _e.debug("Zone", "Created zone:", J), i([...n, J]);
        }
        Y(null);
      }
    },
    [f, i, Y, n]
  ), re = (G, B) => {
    G.stopPropagation(), i(n.filter((I, F) => F !== B)), Y(null);
  }, me = l === "no_go" ? "vacuum-map__zone--nogo" : l === "no_mop" ? "vacuum-map__zone--nomop" : "", Q = k?.kind === "draw" && (Math.abs(k.currentX - k.startX) >= Dl || Math.abs(k.currentY - k.startY) >= Dl) ? {
    x1: Math.min(k.startX, k.currentX),
    y1: Math.min(k.startY, k.currentY),
    x2: Math.max(k.startX, k.currentX),
    y2: Math.max(k.startY, k.currentY)
  } : null;
  return /* @__PURE__ */ _.jsxs(
    "div",
    {
      ref: g,
      className: `vacuum-map__zone-container ${y && n.length < f ? "vacuum-map__zone-container--drawable" : ""}`,
      onPointerDown: Z,
      onPointerMove: X,
      onPointerUp: (G) => ee(G, !1),
      onPointerCancel: (G) => ee(G, !0),
      children: [
        n.map((G, B) => {
          const I = (k?.kind === "move" || k?.kind === "resize") && k.index === B, F = Hu(G, s, d, m);
          return /* @__PURE__ */ _.jsxs(
            "div",
            {
              className: `vacuum-map__zone ${me} ${I ? "vacuum-map__zone--active" : ""} ${y ? "vacuum-map__zone--movable" : ""}`,
              style: {
                left: `${G.x1}%`,
                top: `${G.y1}%`,
                width: `${G.x2 - G.x1}%`,
                height: `${G.y2 - G.y1}%`
              },
              onPointerDown: (T) => K(T, B),
              onClick: (T) => T.stopPropagation(),
              children: [
                /* @__PURE__ */ _.jsxs(
                  "div",
                  {
                    className: "vacuum-map__zone-badge",
                    style: { transform: `scale(${O})` },
                    children: [
                      /* @__PURE__ */ _.jsxs("span", { className: "vacuum-map__zone-badge-index", children: [
                        "#",
                        B + 1
                      ] }),
                      F && /* @__PURE__ */ _.jsx("span", { className: "vacuum-map__zone-badge-size", children: F })
                    ]
                  }
                ),
                y && /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
                  /* @__PURE__ */ _.jsx(
                    "div",
                    {
                      className: "vacuum-map__zone-handle vacuum-map__zone-handle--top",
                      style: { transform: `translateX(-50%) scale(${O})` },
                      onPointerDown: (T) => te(T, B, "top")
                    }
                  ),
                  /* @__PURE__ */ _.jsx(
                    "div",
                    {
                      className: "vacuum-map__zone-handle vacuum-map__zone-handle--right",
                      style: { transform: `translateY(-50%) scale(${O})` },
                      onPointerDown: (T) => te(T, B, "right")
                    }
                  ),
                  /* @__PURE__ */ _.jsx(
                    "div",
                    {
                      className: "vacuum-map__zone-handle vacuum-map__zone-handle--bottom",
                      style: { transform: `translateX(-50%) scale(${O})` },
                      onPointerDown: (T) => te(T, B, "bottom")
                    }
                  ),
                  /* @__PURE__ */ _.jsx(
                    "div",
                    {
                      className: "vacuum-map__zone-handle vacuum-map__zone-handle--left",
                      style: { transform: `translateY(-50%) scale(${O})` },
                      onPointerDown: (T) => te(T, B, "left")
                    }
                  ),
                  /* @__PURE__ */ _.jsx(
                    "div",
                    {
                      className: "vacuum-map__zone-corner vacuum-map__zone-corner--nw",
                      style: { transform: `scale(${O})` },
                      onPointerDown: (T) => te(T, B, "nw")
                    }
                  ),
                  /* @__PURE__ */ _.jsx(
                    "div",
                    {
                      className: "vacuum-map__zone-corner vacuum-map__zone-corner--sw",
                      style: { transform: `scale(${O})` },
                      onPointerDown: (T) => te(T, B, "sw")
                    }
                  ),
                  /* @__PURE__ */ _.jsx(
                    "div",
                    {
                      className: "vacuum-map__zone-corner vacuum-map__zone-corner--se",
                      style: { transform: `scale(${O})` },
                      onPointerDown: (T) => te(T, B, "se")
                    }
                  ),
                  /* @__PURE__ */ _.jsx(
                    "button",
                    {
                      type: "button",
                      className: "vacuum-map__zone-clear",
                      style: { transform: `scale(${O})` },
                      onPointerDown: (T) => T.stopPropagation(),
                      onClick: (T) => re(T, B),
                      title: o,
                      "aria-label": o,
                      children: /* @__PURE__ */ _.jsx(Ku, { size: 13, strokeWidth: 2.5 })
                    }
                  )
                ] })
              ]
            },
            `zone-${B}`
          );
        }),
        Q && /* @__PURE__ */ _.jsx(
          "div",
          {
            className: `vacuum-map__zone vacuum-map__zone--draft ${me}`,
            style: {
              left: `${Q.x1}%`,
              top: `${Q.y1}%`,
              width: `${Q.x2 - Q.x1}%`,
              height: `${Q.y2 - Q.y1}%`
            },
            children: Hu(Q, s, d, m) && /* @__PURE__ */ _.jsx("div", { className: "vacuum-map__zone-badge", style: { transform: `scale(${O})` }, children: /* @__PURE__ */ _.jsx("span", { className: "vacuum-map__zone-badge-size", children: Hu(Q, s, d, m) }) })
          }
        )
      ]
    }
  );
}
const iz = "M12,2C14.65,2 17.19,3.06 19.07,4.93L17.65,6.35C16.15,4.85 14.12,4 12,4C9.88,4 7.84,4.84 6.35,6.35L4.93,4.93C6.81,3.06 9.35,2 12,2M3.66,6.5L5.11,7.94C4.39,9.17 4,10.57 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,10.57 19.61,9.17 18.88,7.94L20.34,6.5C21.42,8.12 22,10.04 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12C2,10.04 2.58,8.12 3.66,6.5M12,6A6,6 0 0,1 18,12C18,13.59 17.37,15.12 16.24,16.24L14.83,14.83C14.08,15.58 13.06,16 12,16C10.94,16 9.92,15.58 9.17,14.83L7.76,16.24C6.63,15.12 6,13.59 6,12A6,6 0 0,1 12,6M12,8A1,1 0 0,0 11,9A1,1 0 0,0 12,10A1,1 0 0,0 13,9A1,1 0 0,0 12,8Z";
function oz({
  position: n,
  transform: i,
  imageWidth: o,
  imageHeight: l,
  isCleaning: s = !1
}) {
  const d = A.useMemo(() => i.vacuumToMap({ x: n.x, y: n.y }), [n.x, n.y, i]), m = Math.max(o, l) * 0.05, f = m / 2;
  return /* @__PURE__ */ _.jsx(
    "svg",
    {
      className: `vacuum-position-marker${s ? " vacuum-position-marker--cleaning" : ""}`,
      viewBox: `0 0 ${o} ${l}`,
      preserveAspectRatio: "xMidYMid meet",
      children: /* @__PURE__ */ _.jsxs("g", { transform: `translate(${d.x - f}, ${d.y - f})`, children: [
        /* @__PURE__ */ _.jsx("circle", { cx: f, cy: f, r: f * 0.9, className: "vacuum-position-marker__bg" }),
        /* @__PURE__ */ _.jsx("g", { transform: `scale(${m / 24})`, children: /* @__PURE__ */ _.jsx("path", { d: iz, className: "vacuum-position-marker__icon" }) })
      ] })
    }
  );
}
const rz = "M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.66C6,21.4 6.6,22 7.33,22H16.66C17.4,22 18,21.4 18,20.67V5.33C18,4.6 17.4,4 16.67,4M11,20V14.5H9L13,7V12.5H15";
function lz({ position: n, transform: i, imageWidth: o, imageHeight: l }) {
  const s = A.useMemo(() => i.vacuumToMap({ x: n.x, y: n.y }), [n.x, n.y, i]), d = Math.max(o, l) * 0.04, m = d / 2;
  return /* @__PURE__ */ _.jsx("svg", { className: "charger-marker", viewBox: `0 0 ${o} ${l}`, preserveAspectRatio: "xMidYMid meet", children: /* @__PURE__ */ _.jsxs("g", { transform: `translate(${s.x - m}, ${s.y - m})`, children: [
    /* @__PURE__ */ _.jsx("circle", { cx: m, cy: m, r: m * 0.9, className: "charger-marker__bg" }),
    /* @__PURE__ */ _.jsx("g", { transform: `scale(${d / 24})`, children: /* @__PURE__ */ _.jsx("path", { d: rz, className: "charger-marker__icon" }) })
  ] }) });
}
const sz = 0.025, cz = 0.2, uz = 3;
function dz({ rooms: n, transform: i, imageWidth: o, imageHeight: l, scale: s = 1 }) {
  const d = Number.isFinite(s) ? Math.min(Math.max(s, cz), uz) : 1, m = Math.max(o, l) * sz * d, f = m * 0.6, p = m * 0.4, g = m * 0.5, v = A.useMemo(() => n.filter((y) => y.visibility !== "Hidden").filter((y) => {
    const k = y.x !== void 0 && y.y !== void 0, S = y.x0 !== void 0 && y.y0 !== void 0 && y.x1 !== void 0 && y.y1 !== void 0;
    return k || S;
  }).map((y) => {
    const k = y.x ?? (y.x0 + y.x1) / 2, S = y.y ?? (y.y0 + y.y1) / 2, w = i.vacuumToMap({ x: k, y: S });
    return { id: y.id, name: y.name, x: w.x, y: w.y };
  }), [n, i]);
  return /* @__PURE__ */ _.jsx("svg", { className: "room-labels", viewBox: `0 0 ${o} ${l}`, preserveAspectRatio: "xMidYMid meet", children: v.map((y) => {
    const S = y.name.length * m * 0.6 + f * 2, w = m + p * 2;
    return /* @__PURE__ */ _.jsxs("g", { transform: `translate(${y.x}, ${y.y})`, children: [
      /* @__PURE__ */ _.jsx(
        "rect",
        {
          className: "room-labels__bg",
          x: -S / 2,
          y: -w / 2,
          width: S,
          height: w,
          rx: g
        }
      ),
      /* @__PURE__ */ _.jsx("text", { className: "room-labels__text", textAnchor: "middle", dominantBaseline: "middle", fontSize: m, children: y.name })
    ] }, y.id);
  }) });
}
function mz(n) {
  const i = String(n.type ?? "").toLowerCase();
  return i === "line" || i === "wall" || i === "virtual_wall" ? "wall" : i === "mop" || i === "no_mop" || i === "nomop" ? "nomop" : String(n.active ?? "").toLowerCase() === "line" ? "wall" : String(n.forbidType ?? "").toLowerCase() === "mop" ? "nomop" : "nogo";
}
function fz({
  noGoZones: n,
  transform: i,
  imageWidth: o,
  imageHeight: l,
  editable: s,
  onZoneDeleted: d
}) {
  const m = st(), f = Xt(), { t: p } = je(), g = is(), [v, y] = A.useState(null), [k, S] = A.useState(g.state.scale);
  rv(
    A.useCallback((M) => {
      S(M.state.scale);
    }, [])
  );
  const w = 1 / k, N = A.useCallback(
    async (M, O, Y) => {
      if (Y.stopPropagation(), Y.preventDefault(), v !== null) return;
      const D = Array.isArray(M.points) && M.points.length >= 4 ? M.points : M.x1 !== void 0 && M.y1 !== void 0 && M.x2 !== void 0 && M.y2 !== void 0 ? [Number(M.x1), Number(M.y1), Number(M.x2), Number(M.y2)] : void 0, Z = {
        entity_id: f.entity_id,
        zone_type: M.type,
        index: O
      };
      D && (Z.points = D), y(O);
      try {
        await m.callService("botslab_vacuum", "delete_no_go_zone", Z), d?.(p("toast.zone_deleted"));
      } catch (K) {
        _e.error("Failed to delete no-go zone", K);
        const te = K instanceof Error ? K.message : String(K);
        d?.(p("toast.operation_failed", { error: te }));
      } finally {
        y(null);
      }
    },
    [v, m, f.entity_id, d, p]
  );
  return !i || !o || !l || !Array.isArray(n) || n.length === 0 ? null : /* @__PURE__ */ _.jsx("div", { className: "vacuum-map__saved-zones-layer", children: n.map((M, O) => {
    const Y = mz(M), D = Y === "wall";
    let Z = 0, K = 0, te = 0, X = 0;
    if (Array.isArray(M.points) && M.points.length >= 4)
      Z = M.points[0], K = M.points[1], te = M.points[2], X = M.points[3];
    else if (Array.isArray(M.vertexs) && M.vertexs.length >= 2) {
      const ie = M.vertexs.map((L) => Array.isArray(L) ? L[0] : 0), E = M.vertexs.map((L) => Array.isArray(L) ? L[1] : 0);
      Z = Math.min(...ie), K = Math.min(...E), te = Math.max(...ie), X = Math.max(...E);
    } else if (M.x1 !== void 0 && M.y1 !== void 0)
      Z = Number(M.x1), K = Number(M.y1), te = Number(M.x2 ?? Z), X = Number(M.y2 ?? K);
    else
      return null;
    if (D && Array.isArray(M.vertexs) && M.vertexs.length >= 2) {
      const ie = M.vertexs[0], E = M.vertexs[1];
      Array.isArray(ie) && Array.isArray(E) && (Z = Number(ie[0]), K = Number(ie[1]), te = Number(E[0]), X = Number(E[1]));
    }
    const ee = i.vacuumToMap({ x: Z, y: K }), re = i.vacuumToMap({ x: te, y: X });
    if (!Number.isFinite(ee.x) || !Number.isFinite(ee.y) || !Number.isFinite(re.x) || !Number.isFinite(re.y))
      return null;
    if (D) {
      const ie = Math.hypot(re.x - ee.x, re.y - ee.y);
      if (!Number.isFinite(ie) || ie <= 0)
        return null;
      const E = Math.atan2(re.y - ee.y, re.x - ee.x) * 180 / Math.PI;
      return /* @__PURE__ */ _.jsx(
        "div",
        {
          className: "vacuum-map__saved-zone vacuum-map__saved-zone--wall",
          style: {
            left: `${ee.x / o * 100}%`,
            top: `${ee.y / l * 100}%`,
            width: `${ie / o * 100}%`,
            transform: `rotate(${E}deg)`,
            // Used by the badge to cancel the line rotation so the text stays flat.
            "--wall-angle": `${E}deg`
          },
          children: s && /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
            /* @__PURE__ */ _.jsx(
              "span",
              {
                className: "vacuum-map__saved-zone-badge",
                style: { transform: `translateX(-50%) rotate(calc(-1 * var(--wall-angle, 0deg))) scale(${w})` },
                children: p("vacuum_map.virtual_wall")
              }
            ),
            /* @__PURE__ */ _.jsx(
              "button",
              {
                type: "button",
                className: "vacuum-map__saved-zone-delete",
                style: { transform: `translate(-50%, -50%) scale(${w})` },
                disabled: v === O,
                onPointerDown: (L) => L.stopPropagation(),
                onClick: (L) => N(M, O, L),
                title: p("vacuum_map.delete_zone"),
                "aria-label": p("vacuum_map.delete_zone"),
                children: /* @__PURE__ */ _.jsx(Ku, { size: 12, strokeWidth: 2.5 })
              }
            )
          ] })
        },
        `saved-wall-${O}-${Z}-${K}`
      );
    }
    const me = Math.min(ee.x, re.x), Q = Math.max(ee.x, re.x), G = Math.min(ee.y, re.y), B = Math.max(ee.y, re.y), I = me / o * 100, F = G / l * 100, T = (Q - me) / o * 100, J = (B - G) / l * 100, ne = Y === "nomop", fe = p(ne ? "vacuum_map.no_mop" : "vacuum_map.no_go");
    return /* @__PURE__ */ _.jsx(
      "div",
      {
        className: `vacuum-map__saved-zone ${ne ? "vacuum-map__saved-zone--nomop" : "vacuum-map__saved-zone--nogo"}`,
        style: {
          left: `${I}%`,
          top: `${F}%`,
          width: `${Math.max(T, 2)}%`,
          height: `${Math.max(J, 2)}%`
        },
        children: s && /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
          /* @__PURE__ */ _.jsx(
            "span",
            {
              className: "vacuum-map__saved-zone-badge",
              style: { transform: `scale(${w})`, transformOrigin: "top left" },
              children: fe
            }
          ),
          /* @__PURE__ */ _.jsx(
            "button",
            {
              type: "button",
              className: "vacuum-map__saved-zone-delete",
              style: { transform: `scale(${w})`, transformOrigin: "top right" },
              disabled: v === O,
              onPointerDown: (ie) => ie.stopPropagation(),
              onClick: (ie) => N(M, O, ie),
              title: p("vacuum_map.delete_zone"),
              "aria-label": p("vacuum_map.delete_zone"),
              children: /* @__PURE__ */ _.jsx(Ku, { size: 12, strokeWidth: 2.5 })
            }
          )
        ] })
      },
      `saved-nogo-${O}-${I}-${F}`
    );
  }) });
}
function jg(n) {
  const i = PS(n.offsetWidth, n.offsetHeight, n.naturalWidth, n.naturalHeight);
  return i && { ...i, left: n.offsetLeft + i.left, top: n.offsetTop + i.top };
}
function _z({
  showViewToggle: n,
  showZoomControls: i,
  viewMode: o,
  onViewToggle: l,
  isMapLocked: s,
  onToggleLock: d,
  onResetTransformReady: m
}) {
  const { zoomIn: f, zoomOut: p, resetTransform: g } = IT();
  return A.useEffect(() => {
    m(g);
  }, [g, m]), /* @__PURE__ */ _.jsx(
    ez,
    {
      showViewToggle: n,
      showZoomControls: i,
      viewMode: o,
      onViewToggle: l,
      onZoomIn: () => f(),
      onZoomOut: () => p(),
      onZoomReset: () => g(),
      isMapLocked: s,
      onToggleLock: d
    }
  );
}
function pz({
  mapEntityId: n,
  geometry: i,
  selectedMode: o,
  areaSelectionMode: l,
  selectedRooms: s,
  onRoomToggle: d,
  zone: m,
  onZoneChange: f,
  onImageDimensionsChange: p,
  onImageError: g,
  defaultRoomView: v = "map",
  onZoneDeleted: y,
  isFloorSwitching: k = !1
}) {
  const { t: S } = je(), w = st(), N = Jl(), { phase: M } = Xn(), O = Xt(), Y = !Xg(M, O.state), D = w.states[n], Z = D?.attributes?.entity_picture, K = typeof Z == "string" ? Z : void 0, te = A.useRef(null), X = A.useRef(null), [ee, re] = A.useState({ width: 0, height: 0 }), [me, Q] = A.useState(null), G = A.useCallback((Ke) => {
    if (!Ke) return;
    const Ie = new ResizeObserver(() => Q(jg(Ke)));
    return Ie.observe(Ke), Ke.parentElement && Ie.observe(Ke.parentElement), () => Ie.disconnect();
  }, []), [B, I] = A.useState(v), F = Xu(Vu.MAP_LOCKED, N.entity), [T, J] = A.useState(() => {
    try {
      const Ke = localStorage.getItem(F);
      return Ke === null ? !0 : Ke === "true";
    } catch {
      return !0;
    }
  }), ne = A.useCallback((Ke) => {
    X.current = Ke;
  }, []), fe = A.useCallback(() => {
    const Ke = !T;
    Ke && X.current && X.current(), J(Ke);
    try {
      localStorage.setItem(F, String(Ke));
    } catch {
    }
  }, [T, F]), ie = o === "room" ? B : v, { rooms: E, transform: L } = i, W = D?.attributes?.vacuum_position, ae = D?.attributes?.charger_position, le = M === "cleaning", ge = N.map_overlays ?? [], ve = ee.width > 0 && ee.height > 0, Ge = ge.includes("vacuum") && W && ve && L, Ae = ge.includes("charger") && ae && ve && L, yt = ge.includes("room_labels") && ve && L, Dt = A.useCallback(
    (Ke) => {
      const Ie = Ke.currentTarget;
      !K || !Ie.naturalWidth || !Ie.naturalHeight || (re({ width: Ie.naturalWidth, height: Ie.naturalHeight }), Q(jg(Ie)), p?.(Ie.naturalWidth, Ie.naturalHeight, K));
    },
    [K, p]
  ), dn = A.useCallback(() => {
    K && g?.(K);
  }, [K, g]), mn = !T && o !== "zone", ct = `vacuum-map${T ? " vacuum-map--locked" : ""}`;
  return /* @__PURE__ */ _.jsxs("div", { className: ct, ref: te, children: [
    D && K ? /* @__PURE__ */ _.jsxs(
      KT,
      {
        initialScale: 1,
        minScale: 0.5,
        maxScale: 4,
        centerOnInit: !0,
        centerZoomedOut: !1,
        limitToBounds: !1,
        wheel: {
          step: 0.05,
          disabled: T
        },
        pinch: {
          step: 0.5,
          disabled: T
        },
        panning: {
          disabled: !mn,
          velocityDisabled: !0
        },
        doubleClick: { disabled: !0 },
        children: [
          /* @__PURE__ */ _.jsx(
            _z,
            {
              showViewToggle: o === "room",
              showZoomControls: o !== "room" || ie === "map",
              viewMode: ie,
              onViewToggle: () => I((Ke) => Ke === "map" ? "list" : "map"),
              isMapLocked: T,
              onToggleLock: fe,
              onResetTransformReady: ne
            }
          ),
          /* @__PURE__ */ _.jsx(
            XT,
            {
              wrapperStyle: {
                width: "100%",
                height: "100%"
              },
              contentStyle: {
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              },
              children: /* @__PURE__ */ _.jsxs("div", { className: "vacuum-map__content", children: [
                /* @__PURE__ */ _.jsx(
                  "img",
                  {
                    ref: G,
                    src: w.hassUrl(K),
                    alt: "Vacuum Map",
                    className: `vacuum-map__image ${k ? "vacuum-map__image--switching" : ""}`,
                    onLoad: Dt,
                    onError: dn,
                    draggable: !1
                  }
                ),
                me && /* @__PURE__ */ _.jsxs("div", { className: "vacuum-map__picture-frame", style: me, children: [
                  Ae && /* @__PURE__ */ _.jsx(
                    lz,
                    {
                      position: ae,
                      transform: L,
                      imageWidth: ee.width,
                      imageHeight: ee.height
                    }
                  ),
                  Ge && /* @__PURE__ */ _.jsx(
                    oz,
                    {
                      position: W,
                      transform: L,
                      imageWidth: ee.width,
                      imageHeight: ee.height,
                      isCleaning: le
                    }
                  ),
                  yt && /* @__PURE__ */ _.jsx(
                    dz,
                    {
                      rooms: E,
                      transform: L,
                      imageWidth: ee.width,
                      imageHeight: ee.height,
                      scale: N.room_label_scale
                    }
                  ),
                  o === "room" && ie === "map" && Y && ee.width > 0 && ee.height > 0 && L && /* @__PURE__ */ _.jsx(
                    WT,
                    {
                      rooms: E,
                      selectedRooms: s,
                      onRoomToggle: d,
                      transform: L,
                      imageWidth: ee.width,
                      imageHeight: ee.height
                    }
                  ),
                  /* @__PURE__ */ _.jsx(
                    fz,
                    {
                      noGoZones: D?.attributes?.no_go_zones || O?.attributes?.no_go_zones || [],
                      transform: L,
                      imageWidth: ee.width,
                      imageHeight: ee.height,
                      editable: o === "zone" && (l === "no_go" || l === "no_mop"),
                      onZoneDeleted: y
                    }
                  ),
                  o === "zone" && /* @__PURE__ */ _.jsx(
                    az,
                    {
                      zones: m,
                      onZonesChange: f,
                      clearZoneLabel: S("vacuum_map.clear_zone"),
                      mode: l,
                      transform: L,
                      imageWidth: ee.width,
                      imageHeight: ee.height
                    }
                  )
                ] })
              ] })
            }
          )
        ]
      }
    ) : /* @__PURE__ */ _.jsxs("div", { className: "vacuum-map__placeholder", children: [
      /* @__PURE__ */ _.jsx(Ql, { size: 32, className: "vacuum-map__placeholder-icon" }),
      /* @__PURE__ */ _.jsx("p", { className: "vacuum-map__placeholder-title", children: S("vacuum_map.no_map") }),
      n && /* @__PURE__ */ _.jsx("small", { children: S("vacuum_map.looking_for", { entity: n }) })
    ] }),
    k && D && K && /* @__PURE__ */ _.jsxs("div", { className: "vacuum-map__switching", role: "status", "aria-live": "polite", children: [
      /* @__PURE__ */ _.jsx(Zg, { size: 16, className: "vacuum-map__switching-spinner" }),
      /* @__PURE__ */ _.jsx("span", { children: S("vacuum_map.switching_floor") })
    ] }),
    o === "room" && /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
      ie === "map" && Y && /* @__PURE__ */ _.jsx("div", { className: "vacuum-map__overlay", children: S("vacuum_map.room_overlay") }),
      ie === "list" && Y && /* @__PURE__ */ _.jsx(tz, { rooms: E, selectedRooms: s, onRoomToggle: d })
    ] }),
    o === "zone" && /* @__PURE__ */ _.jsxs("div", { className: "vacuum-map__zone-bar", children: [
      /* @__PURE__ */ _.jsx("span", { className: "vacuum-map__zone-bar-hint", children: l === "no_go" ? m.length > 0 ? S("vacuum_map.nogo_overlay_resize") : S("vacuum_map.nogo_overlay_create") : l === "no_mop" ? m.length > 0 ? S("vacuum_map.nomop_overlay_resize") : S("vacuum_map.nomop_overlay_create") : m.length > 0 ? S("vacuum_map.zone_overlay_resize") : S("vacuum_map.zone_overlay_create") }),
      m.length > 0 && Y && /* @__PURE__ */ _.jsxs(
        "button",
        {
          type: "button",
          className: "vacuum-map__zone-bar-clear",
          onClick: () => f([]),
          title: S("vacuum_map.clear_all_zones"),
          children: [
            /* @__PURE__ */ _.jsx(Hl, { size: 13 }),
            /* @__PURE__ */ _.jsx("span", { children: S("vacuum_map.clear_all_zones") })
          ]
        }
      )
    ] })
  ] });
}
function gz({ selectedMode: n, areaSelectionMode: i = "zone", onModeChange: o, onAreaSelectionModeChange: l }) {
  const { t: s } = je(), { phase: d } = Xn(), [m, f] = A.useState(!1), p = A.useRef(null), g = d === "cleaning" || d === "paused", v = [
    { value: "room", label: s("modes.room") },
    { value: "all", label: s("modes.all") }
  ];
  A.useEffect(() => {
    if (!m) return;
    const S = (N) => {
      (!p.current || !N.composedPath().includes(p.current)) && f(!1);
    }, w = (N) => {
      N.key === "Escape" && f(!1);
    };
    return document.addEventListener("mousedown", S), document.addEventListener("keydown", w), () => {
      document.removeEventListener("mousedown", S), document.removeEventListener("keydown", w);
    };
  }, [m]);
  const y = (S) => {
    l && S !== i && l(S), n !== "zone" && o("zone"), f(!1);
  }, k = (S) => s(S === "no_go" ? "modes.no_go" : S === "no_mop" ? "modes.no_mop" : "modes.zone");
  return /* @__PURE__ */ _.jsxs("div", { className: `mode-tabs ${g ? "mode-tabs--disabled" : ""}`, children: [
    v.map((S) => /* @__PURE__ */ _.jsx(
      "button",
      {
        onClick: () => o(S.value),
        className: `mode-tabs__button ${n === S.value ? "mode-tabs__button--active" : ""}`,
        disabled: g,
        children: S.label
      },
      S.value
    )),
    /* @__PURE__ */ _.jsxs("div", { className: "mode-tabs__area-select", ref: p, children: [
      /* @__PURE__ */ _.jsxs(
        "button",
        {
          type: "button",
          onClick: () => f((S) => !S),
          className: `mode-tabs__button ${n === "zone" ? "mode-tabs__button--active" : ""}`,
          disabled: g,
          "aria-haspopup": "menu",
          "aria-expanded": m,
          children: [
            k(i),
            /* @__PURE__ */ _.jsx(td, { className: `mode-tabs__chevron ${m ? "mode-tabs__chevron--open" : ""}` })
          ]
        }
      ),
      m && /* @__PURE__ */ _.jsx("div", { className: "mode-tabs__menu", role: "menu", children: ["zone", "no_go", "no_mop"].map((S) => /* @__PURE__ */ _.jsx(
        "button",
        {
          type: "button",
          role: "menuitemradio",
          "aria-checked": i === S,
          className: `mode-tabs__menu-item ${i === S ? "mode-tabs__menu-item--active" : ""}`,
          onClick: () => y(S),
          children: k(S)
        },
        S
      )) })
    ] })
  ] });
}
function rn({ title: n, icon: i, defaultOpen: o = !1, children: l }) {
  const [s, d] = A.useState(o), m = A.useCallback(() => {
    d((f) => !f);
  }, []);
  return /* @__PURE__ */ _.jsxs("div", { className: `accordion ${s ? "accordion--open" : ""}`, children: [
    /* @__PURE__ */ _.jsxs("button", { className: "accordion__header", onClick: m, type: "button", children: [
      /* @__PURE__ */ _.jsxs("div", { className: "accordion__title-wrapper", children: [
        i && /* @__PURE__ */ _.jsx("span", { className: "accordion__icon", children: i }),
        /* @__PURE__ */ _.jsx("span", { className: "accordion__title", children: n })
      ] }),
      /* @__PURE__ */ _.jsx(td, { className: "accordion__chevron" })
    ] }),
    /* @__PURE__ */ _.jsx("div", { className: "accordion__content", children: /* @__PURE__ */ _.jsx("div", { className: "accordion__content-inner", children: l }) })
  ] });
}
function lv({ checked: n = !1, onChange: i, disabled: o = !1 }) {
  const l = (s) => {
    i && !o && i(s.target.checked);
  };
  return /* @__PURE__ */ _.jsxs("label", { className: `toggle ${o ? "toggle--disabled" : ""}`, children: [
    /* @__PURE__ */ _.jsx("input", { type: "checkbox", className: "toggle__input", checked: n, onChange: l, disabled: o }),
    /* @__PURE__ */ _.jsx("span", { className: "toggle__slider", children: /* @__PURE__ */ _.jsx("span", { className: "toggle__knob" }) })
  ] });
}
function Ia({
  icon: n,
  label: i,
  selected: o = !1,
  onClick: l,
  size: s = "medium",
  iconStyle: d,
  disabled: m = !1
}) {
  return /* @__PURE__ */ _.jsxs("div", { className: `circular-button ${m ? "circular-button--disabled" : ""}`, children: [
    /* @__PURE__ */ _.jsx(
      "button",
      {
        className: `circular-button__circle circular-button__circle--${s} ${o ? "circular-button__circle--selected" : ""}`,
        onClick: l,
        disabled: m,
        children: typeof n == "string" ? /* @__PURE__ */ _.jsx("span", { className: "circular-button__icon", style: d, children: n }) : n
      }
    ),
    i && /* @__PURE__ */ _.jsx("span", { className: "circular-button__label", children: i })
  ] });
}
function os({ opened: n, onClose: i, children: o, className: l }) {
  return A.useEffect(() => {
    if (!n) return;
    const s = (d) => {
      d.key === "Escape" && !d.defaultPrevented && i();
    };
    return document.addEventListener("keydown", s), () => document.removeEventListener("keydown", s);
  }, [n, i]), n ? /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
    /* @__PURE__ */ _.jsx("div", { className: `modal__backdrop${l ? ` ${l}__backdrop` : ""}`, onClick: i }),
    /* @__PURE__ */ _.jsxs("div", { className: `modal${l ? ` ${l}` : ""}`, role: "dialog", "aria-modal": "true", children: [
      /* @__PURE__ */ _.jsx("div", { className: "modal__handle" }),
      /* @__PURE__ */ _.jsx("div", { className: "modal__content", children: o })
    ] })
  ] }) : null;
}
function sv({ options: n, value: i, onChange: o, disabled: l = !1 }) {
  return /* @__PURE__ */ _.jsx("div", { className: `segmented-control ${l ? "segmented-control--disabled" : ""}`, children: n.map((s) => /* @__PURE__ */ _.jsx(
    "button",
    {
      className: `segmented-control__button ${i === s.value ? "segmented-control__button--active" : ""}`,
      onClick: () => !l && o(s.value),
      disabled: l,
      children: s.label
    },
    s.value
  )) });
}
function hz({ message: n, onClose: i }) {
  return /* @__PURE__ */ _.jsxs("div", { className: "toast", children: [
    /* @__PURE__ */ _.jsx("span", { className: "toast__message", children: n }),
    /* @__PURE__ */ _.jsx("button", { className: "toast__close", onClick: i, "aria-label": "Close", children: "×" })
  ] });
}
class vz extends A.Component {
  constructor(i) {
    super(i), this.state = { hasError: !1, error: null };
  }
  static getDerivedStateFromError(i) {
    return { hasError: !0, error: i };
  }
  componentDidCatch(i, o) {
    _e.error("Caught error:", i), _e.error("Component stack:", o.componentStack);
  }
  handleRetry = () => {
    this.setState({ hasError: !1, error: null });
  };
  render() {
    return this.state.hasError ? this.props.fallback ? this.props.fallback : /* @__PURE__ */ _.jsx("div", { className: "error-boundary", children: /* @__PURE__ */ _.jsxs("div", { className: "error-boundary__content", children: [
      /* @__PURE__ */ _.jsx("div", { className: "error-boundary__icon", children: "!" }),
      /* @__PURE__ */ _.jsx("h3", { className: "error-boundary__title", children: "Something went wrong" }),
      /* @__PURE__ */ _.jsx("p", { className: "error-boundary__message", children: "The card encountered an error. Try refreshing the page." }),
      /* @__PURE__ */ _.jsx("button", { className: "error-boundary__retry", onClick: this.handleRetry, children: "Try Again" })
    ] }) }) : this.props.children;
  }
}
const yz = {
  start_auto_empty: Hl,
  self_clean: _0,
  manual_drying: w1
}, bz = [
  { key: "clean_water_tank_status", labelKey: "dock_popup.clean_water_tank", warnWhenLow: !0 },
  { key: "dirty_water_tank_status", labelKey: "dock_popup.used_water_tank", warnWhenLow: !1 },
  { key: "dust_bag_status", labelKey: "dock_popup.dust_bag", warnWhenLow: !1 },
  { key: "detergent_status", labelKey: "dock_popup.detergent", warnWhenLow: !1 }
];
function Sz({ opened: n, onClose: i }) {
  const o = st(), { get: l } = $t(), { t: s } = je(), d = d5.flatMap((f) => {
    const p = l("button", f.key);
    return p ? [{ ...f, entityId: p, state: cn(o, p) }] : [];
  }), m = (f) => {
    o.callService("button", "press", { entity_id: f }), i();
  };
  return /* @__PURE__ */ _.jsx(os, { opened: n, onClose: i, className: "dock-popup-modal", children: /* @__PURE__ */ _.jsxs("section", { className: "dock-popup", children: [
    /* @__PURE__ */ _.jsx("h2", { className: "dock-popup__title", children: s("dock_popup.information") }),
    /* @__PURE__ */ _.jsx("div", { className: "dock-popup__status-grid", children: bz.map((f) => {
      const p = l("sensor", f.key), g = cn(o, p).state, v = f5(g, f.warnWhenLow);
      return /* @__PURE__ */ _.jsxs("div", { className: "dock-popup__status", children: [
        /* @__PURE__ */ _.jsx("span", { className: `dock-popup__status-dot dock-popup__status-dot--${v}` }),
        /* @__PURE__ */ _.jsxs("div", { children: [
          /* @__PURE__ */ _.jsx("span", { className: "dock-popup__status-label", children: s(f.labelKey) }),
          /* @__PURE__ */ _.jsx("span", { className: `dock-popup__status-value dock-popup__status-value--${v}`, children: g })
        ] })
      ] }, f.key);
    }) }),
    d.length > 0 && /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
      /* @__PURE__ */ _.jsx("div", { className: "dock-popup__divider" }),
      /* @__PURE__ */ _.jsx("h2", { className: "dock-popup__title", children: s("dock_popup.tasks") }),
      /* @__PURE__ */ _.jsx("div", { className: "dock-popup__tasks", children: d.map((f) => {
        const p = yz[f.key];
        return /* @__PURE__ */ _.jsxs(
          "button",
          {
            className: "dock-popup__task",
            disabled: f.state.unavailable,
            onClick: () => m(f.entityId),
            children: [
              /* @__PURE__ */ _.jsx(p, { className: "dock-popup__task-icon", "aria-hidden": "true" }),
              /* @__PURE__ */ _.jsx("span", { children: s(f.labelKey) })
            ]
          },
          f.key
        );
      }) })
    ] })
  ] }) });
}
function kz({ onClick: n, text: i, disabled: o = !1 }) {
  return /* @__PURE__ */ _.jsxs(
    "button",
    {
      onClick: n,
      className: `action-buttons__clean ${o ? "action-buttons__clean--disabled" : ""}`,
      disabled: o,
      children: [
        /* @__PURE__ */ _.jsx("span", { className: "action-buttons__icon", children: q1 }),
        /* @__PURE__ */ _.jsx("span", { children: i })
      ]
    }
  );
}
function wz({ onClick: n, disabled: i = !1 }) {
  const { t: o } = je();
  return /* @__PURE__ */ _.jsxs(
    "button",
    {
      onClick: n,
      className: `action-buttons__pause ${i ? "action-buttons__pause--disabled" : ""}`,
      disabled: i,
      children: [
        /* @__PURE__ */ _.jsx("span", { className: "action-buttons__icon", children: V1 }),
        /* @__PURE__ */ _.jsx("span", { children: o("actions.pause") })
      ]
    }
  );
}
function xz({ onClick: n, disabled: i = !1 }) {
  const { t: o } = je();
  return /* @__PURE__ */ _.jsxs(
    "button",
    {
      onClick: n,
      className: `action-buttons__resume ${i ? "action-buttons__resume--disabled" : ""}`,
      disabled: i,
      children: [
        /* @__PURE__ */ _.jsx("span", { className: "action-buttons__icon", children: X1 }),
        /* @__PURE__ */ _.jsx("span", { children: o("actions.resume") })
      ]
    }
  );
}
function Dg({ onClick: n, action: i, disabled: o = !1 }) {
  const { t: l } = je(), s = l(i === "stop_and_dock" ? "actions.stop_and_dock" : "actions.stop");
  return /* @__PURE__ */ _.jsxs(
    "button",
    {
      onClick: n,
      className: `action-buttons__stop ${o ? "action-buttons__stop--disabled" : ""}`,
      disabled: o,
      children: [
        /* @__PURE__ */ _.jsx("span", { className: "action-buttons__icon", children: $1 }),
        /* @__PURE__ */ _.jsx("span", { children: s })
      ]
    }
  );
}
function Ez({ onClick: n, disabled: i = !1 }) {
  const { t: o } = je();
  return /* @__PURE__ */ _.jsxs(
    "button",
    {
      onClick: n,
      className: `action-buttons__dock ${i ? "action-buttons__dock--disabled" : ""}`,
      disabled: i,
      children: [
        /* @__PURE__ */ _.jsx("span", { className: "action-buttons__icon", children: P1 }),
        /* @__PURE__ */ _.jsx("span", { children: o("actions.dock") })
      ]
    }
  );
}
function Tz({
  selectedMode: n,
  areaSelectionMode: i,
  selectedRoomsCount: o,
  selectedZonesCount: l = 0,
  onClean: s,
  onPause: d,
  onResume: m,
  onStop: f,
  onDock: p
}) {
  const { t: g, getRoomCountTranslation: v } = je(), { getStopAction: y } = b5(), k = Xt(), { phase: S, controls: w } = Xn(), [N, M] = A.useState(!1), O = y();
  m5(S, k.state);
  const Y = () => {
    switch (n) {
      case "room":
        return v(o);
      case "all":
        return g("actions.clean_all");
      case "zone":
        return i === "no_go" ? l > 1 ? g("actions.save_no_go_plural", { count: String(l) }) : g("actions.save_no_go") : i === "no_mop" ? l > 1 ? g("actions.save_no_mop_plural", { count: String(l) }) : g("actions.save_no_mop") : l === 0 ? g("actions.select_zone") : l === 1 ? g("actions.clean_zones", { count: "1" }) : g("actions.clean_zones_plural", { count: String(l) });
      default:
        return g("actions.clean");
    }
  }, D = () => f(O), Z = n !== "zone" || l > 0, K = () => {
    p();
  };
  return S === "cleaning" ? /* @__PURE__ */ _.jsxs("div", { className: "action-buttons", children: [
    /* @__PURE__ */ _.jsx(wz, { onClick: d, disabled: !w.canPause }),
    /* @__PURE__ */ _.jsx(Dg, { onClick: D, action: O, disabled: !w.canStop })
  ] }) : S === "paused" ? /* @__PURE__ */ _.jsxs("div", { className: "action-buttons", children: [
    /* @__PURE__ */ _.jsx(xz, { onClick: m, disabled: !w.canResume }),
    /* @__PURE__ */ _.jsx(Dg, { onClick: D, action: O, disabled: !w.canStop })
  ] }) : /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
    /* @__PURE__ */ _.jsxs("div", { className: "action-buttons", children: [
      /* @__PURE__ */ _.jsx(
        kz,
        {
          onClick: s,
          text: Y(),
          disabled: !w.canStartCleaning || !Z
        }
      ),
      /* @__PURE__ */ _.jsx(Ez, { onClick: K, disabled: !w.canDock && !0 })
    ] }),
    /* @__PURE__ */ _.jsx(Sz, { opened: N, onClose: () => M(!1) })
  ] });
}
function zz({
  cleaningMode: n,
  cleaningModeList: i,
  onSelect: o,
  entityId: l,
  t: s,
  disabled: d = !1,
  customizeSelected: m = !1,
  hideCustomize: f = !1
}) {
  const p = f ? i.filter((g) => g !== Hp) : i;
  return /* @__PURE__ */ _.jsx("div", { className: `cleaning-mode-modal__power-grid ${d ? "cleaning-mode-modal__power-grid--disabled" : ""}`, children: p.map((g) => {
    const v = g === Hp ? m : g === n && !m;
    return /* @__PURE__ */ _.jsxs("div", { className: "cleaning-mode-modal__mode-option", children: [
      /* @__PURE__ */ _.jsx(
        Ia,
        {
          size: "small",
          selected: v,
          onClick: () => {
            d || o(l, g);
          },
          icon: th(g)
        }
      ),
      /* @__PURE__ */ _.jsx("span", { className: "cleaning-mode-modal__mode-option-label", children: Wg(g, s) })
    ] }, g);
  }) });
}
function Nz({
  suctionLevel: n,
  suctionLevelList: i,
  attributeList: o,
  fanSpeedList: l,
  fanSpeed: s,
  cleaning: d,
  maxSuctionPower: m,
  onSelectSuctionLevel: f,
  onToggleMaxPower: p,
  suctionLevelEntityId: g,
  maxSuctionPowerEntityId: v,
  maxPlusDescription: y,
  t: k,
  suctionLevelDisabled: S = !1,
  maxPowerDisabled: w = !1,
  hideMaxPower: N = !1
}) {
  const [M, O] = A.useState([]), Y = WS({
    cleaning: d,
    selectOptions: i,
    attributeList: o,
    rememberedOptions: M,
    fanSpeedList: l,
    fanSpeed: s,
    suctionLevel: n,
    maxSuctionPower: !N && m
  });
  Qg(M, Y.rememberedOptions) || O(Y.rememberedOptions);
  const D = !Y.clicksEnabled || S || !Y.sendFanSpeed && !N && m;
  return /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
    /* @__PURE__ */ _.jsx(
      "div",
      {
        className: `cleaning-mode-modal__power-grid ${D ? "cleaning-mode-modal__power-grid--disabled" : ""}`,
        children: Y.options.map((Z) => /* @__PURE__ */ _.jsxs("div", { className: "cleaning-mode-modal__power-option", children: [
          /* @__PURE__ */ _.jsx(
            Ia,
            {
              size: "small",
              selected: Z === Y.highlight,
              onClick: () => !D && f(g, Z),
              icon: nh(Z),
              disabled: D
            }
          ),
          /* @__PURE__ */ _.jsx("span", { className: "cleaning-mode-modal__power-label", children: eh(Z, k) })
        ] }, Z))
      }
    ),
    !N && /* @__PURE__ */ _.jsxs("div", { className: "cleaning-mode-modal__max-plus", children: [
      /* @__PURE__ */ _.jsxs("div", { className: "cleaning-mode-modal__max-plus-header", children: [
        /* @__PURE__ */ _.jsx("span", { className: "cleaning-mode-modal__max-plus-title", children: "Max+" }),
        /* @__PURE__ */ _.jsx(
          lv,
          {
            checked: m,
            disabled: w,
            onChange: (Z) => p(v, Z)
          }
        )
      ] }),
      /* @__PURE__ */ _.jsx("p", { className: "cleaning-mode-modal__max-plus-description", children: y })
    ] })
  ] });
}
function Az({
  wetnessLevel: n,
  mopPadHumidity: i,
  onChangeWetness: o,
  entityId: l,
  slightlyDryLabel: s,
  moistLabel: d,
  wetLabel: m,
  disabled: f = !1
}) {
  const [p, g] = A.useState(null), v = p ?? n, y = _d(), { MIN: k, MAX: S } = pS.WETNESS, w = (v - k) / (S - k) * 100, N = 20, M = `calc(${w}% + ${N / 2 - w * N / 100}px)`, O = (K) => {
    f || g(parseInt(K.target.value, 10));
  }, Y = () => {
    !f && p !== null && p !== n && o(l, p), g(null);
  }, D = y ? "to left" : "to right", Z = [
    { humidity: "slightly_dry", text: s },
    { humidity: "moist", text: d },
    { humidity: "wet", text: m }
  ];
  return /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
    /* @__PURE__ */ _.jsx(
      "div",
      {
        className: `cleaning-mode-modal__slider-container ${f ? "cleaning-mode-modal__slider-container--disabled" : ""}`,
        children: /* @__PURE__ */ _.jsxs("div", { className: "cleaning-mode-modal__slider-wrapper", children: [
          /* @__PURE__ */ _.jsx(
            "input",
            {
              type: "range",
              min: k,
              max: S,
              value: v,
              onChange: O,
              onMouseUp: Y,
              onTouchEnd: Y,
              onBlur: Y,
              disabled: f,
              className: "cleaning-mode-modal__slider",
              style: {
                background: `linear-gradient(${D}, var(--accent-bg-secondary) 0%, var(--accent-bg-secondary) ${w}%, var(--accent-bg-secondary-hover) ${w}%, var(--accent-bg-secondary-hover) 100%)`
              }
            }
          ),
          /* @__PURE__ */ _.jsx(
            "div",
            {
              className: "cleaning-mode-modal__slider-tooltip",
              style: y ? { right: M } : { left: M },
              children: v
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ _.jsx("div", { className: "cleaning-mode-modal__slider-labels", children: Z.map(({ humidity: K, text: te }) => /* @__PURE__ */ _.jsx(
      "span",
      {
        className: `cleaning-mode-modal__slider-label cleaning-mode-modal__slider-label--${Tt(i) === K ? "active" : "inactive"}`,
        children: te
      },
      K
    )) })
  ] });
}
function Cz({
  waterVolume: n,
  waterVolumeList: i,
  onSelect: o,
  entityId: l,
  t: s,
  disabled: d = !1
}) {
  return /* @__PURE__ */ _.jsx("div", { className: `cleaning-mode-modal__power-grid ${d ? "cleaning-mode-modal__power-grid--disabled" : ""}`, children: i.map((m) => /* @__PURE__ */ _.jsxs("div", { className: "cleaning-mode-modal__power-option", children: [
    /* @__PURE__ */ _.jsx(
      Ia,
      {
        size: "small",
        selected: m === n,
        onClick: () => !d && o(l, m),
        icon: ik(),
        disabled: d
      }
    ),
    /* @__PURE__ */ _.jsx("span", { className: "cleaning-mode-modal__power-label", children: ok(m, s) })
  ] }, m)) });
}
function Mz({
  mopPadHumidity: n,
  mopPadHumidityList: i,
  onSelect: o,
  entityId: l,
  t: s,
  disabled: d = !1
}) {
  return /* @__PURE__ */ _.jsx("div", { className: `cleaning-mode-modal__power-grid ${d ? "cleaning-mode-modal__power-grid--disabled" : ""}`, children: i.map((m) => /* @__PURE__ */ _.jsxs("div", { className: "cleaning-mode-modal__power-option", children: [
    /* @__PURE__ */ _.jsx(
      Ia,
      {
        size: "small",
        selected: m === n,
        onClick: () => !d && o(l, m),
        icon: rk(),
        disabled: d
      }
    ),
    /* @__PURE__ */ _.jsx("span", { className: "cleaning-mode-modal__power-label", children: lk(m, s) })
  ] }, m)) });
}
function Oz(n, i) {
  if (!i) return qn(n);
  const o = `mop_washing_frequency.${Tt(n)}`, l = i(o);
  return l === o ? qn(n) : l;
}
function Rz({
  selfCleanFrequency: n,
  selfCleanFrequencyList: i,
  selfCleanArea: o,
  selfCleanAreaMin: l,
  selfCleanAreaMax: s,
  selfCleanTime: d,
  selfCleanTimeMin: m,
  selfCleanTimeMax: f,
  onSelectFrequency: p,
  onChangeArea: g,
  onChangeTime: v,
  frequencyEntityId: y,
  areaEntityId: k,
  timeEntityId: S,
  t: w,
  frequencyDisabled: N = !1,
  areaDisabled: M = !1,
  timeDisabled: O = !1
}) {
  const [Y, D] = A.useState(null), [Z, K] = A.useState(null), te = Y ?? o, X = Z ?? d, ee = fd(), re = _d(), me = Tt(n), Q = me === "by_area", G = me === "by_time", B = Q || G, I = Q ? te : X, F = Q ? l : m, T = Q ? s : f, J = (I - F) / (T - F) * 100, ne = 20, fe = `calc(${J}% + ${ne / 2 - J * ne / 100}px)`, ie = w ? w("units.minutes_short") : "m", E = re ? "to left" : "to right", L = Q ? M : O, W = (le) => {
    if (L) return;
    const ge = parseInt(le.target.value, 10);
    Q ? D(ge) : K(ge);
  }, ae = () => {
    L || (Q ? (Y !== null && Y !== o && g(k, Y), D(null)) : G && (Z !== null && Z !== d && v(S, Z), K(null)));
  };
  return /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
    /* @__PURE__ */ _.jsx(
      "div",
      {
        className: `cleaning-mode-modal__horizontal-scroll ${N ? "cleaning-mode-modal__horizontal-scroll--disabled" : ""}`,
        children: i.map((le) => /* @__PURE__ */ _.jsxs("div", { className: "cleaning-mode-modal__mode-option", children: [
          /* @__PURE__ */ _.jsx(
            Ia,
            {
              size: "small",
              selected: le === n,
              onClick: () => !N && p(y, le),
              icon: ak(le),
              disabled: N
            }
          ),
          /* @__PURE__ */ _.jsx("span", { className: "cleaning-mode-modal__mode-option-label", children: Oz(le, w) })
        ] }, le))
      }
    ),
    B && /* @__PURE__ */ _.jsx(
      "div",
      {
        className: `cleaning-mode-modal__slider-container ${L ? "cleaning-mode-modal__slider-container--disabled" : ""}`,
        style: { marginTop: "1rem" },
        children: /* @__PURE__ */ _.jsxs("div", { className: "cleaning-mode-modal__slider-wrapper", children: [
          /* @__PURE__ */ _.jsx(
            "input",
            {
              type: "range",
              min: F,
              max: T,
              value: I,
              onChange: W,
              onMouseUp: ae,
              onTouchEnd: ae,
              onBlur: ae,
              disabled: L,
              className: "cleaning-mode-modal__slider",
              style: {
                background: `linear-gradient(${E}, var(--accent-bg-secondary) 0%, var(--accent-bg-secondary) ${J}%, var(--accent-bg-secondary-hover) ${J}%, var(--accent-bg-secondary-hover) 100%)`
              }
            }
          ),
          /* @__PURE__ */ _.jsx(
            "div",
            {
              className: "cleaning-mode-modal__slider-tooltip",
              style: re ? { right: fe } : { left: fe },
              children: Q ? `${te}${ee}` : `${X}${ie}`
            }
          )
        ] })
      }
    )
  ] });
}
function jz(n, i) {
  const o = `cleaning_routes.${Tt(n)}`, l = i(o);
  return l === o ? qn(n) : l;
}
function Dz({
  cleaningRoute: n,
  cleaningRouteList: i,
  onSelect: o,
  entityId: l,
  disabled: s = !1
}) {
  const { t: d } = je();
  return /* @__PURE__ */ _.jsx("div", { className: `cleaning-mode-modal__route-grid ${s ? "cleaning-mode-modal__route-grid--disabled" : ""}`, children: i.map((m) => /* @__PURE__ */ _.jsxs("div", { className: "cleaning-mode-modal__route-option", children: [
    /* @__PURE__ */ _.jsx(
      Ia,
      {
        size: "small",
        selected: m === n,
        onClick: () => !s && o(l, m),
        icon: nk(m),
        disabled: s
      }
    ),
    /* @__PURE__ */ _.jsx("span", { className: "cleaning-mode-modal__route-label", children: jz(m, d) })
  ] }, m)) });
}
function Lz({
  cleaningMode: n,
  cleaningModeList: i,
  suctionLevel: o,
  suctionLevelList: l,
  wetnessLevel: s,
  mopPadHumidity: d,
  mopPadHumidityList: m,
  waterVolume: f,
  waterVolumeList: p,
  cleaningRoute: g,
  cleaningRouteList: v,
  maxSuctionPower: y,
  selfCleanArea: k,
  selfCleanFrequency: S,
  selfCleanFrequencyList: w,
  selfCleanAreaMin: N,
  selfCleanAreaMax: M,
  selfCleanTime: O,
  selfCleanTimeMin: Y,
  selfCleanTimeMax: D,
  onCleaningModeSelect: Z,
  showOnlyCleaningModeSelector: K = !1
}) {
  const te = st(), X = Xt(), { controls: ee, phase: re, isCustomizedCleaning: me } = Xn(), { setSelectOption: Q, setSwitch: G, setNumber: B, setFanSpeed: I } = vS(te), F = pd(), { t: T } = je(), J = !!F.wetnessLevel, ne = !!F.mopPadHumidity, fe = !!F.waterVolume && !J && !ne, ie = !!F.selfCleanFrequency, E = !!F.cleaningRoute, L = cn(te, F.cleaningMode), W = re === "cleaning" || re === "paused", ae = wn(X.attributes.suction_level_list), le = wn(X.attributes.fan_speed_list), ge = typeof X.attributes.fan_speed == "string" ? X.attributes.fan_speed : "", ve = Cl(p, wn(X.attributes.water_volume_list)), Ge = Cl(
    m,
    wn(X.attributes.mop_pad_humidity_list)
  ), Ae = Cl(
    v,
    wn(X.attributes.cleaning_route_list)
  ), yt = Cl(
    w,
    wn(X.attributes.self_clean_frequency_list)
  ), Dt = Z ?? Q, dn = A.useCallback(
    (Ke, Ie) => {
      W && !me ? I(X.entity_id, Ie) : !W && F.suctionLevel && Q(F.suctionLevel, Ie);
    },
    [W, me, I, Q, X.entity_id, F.suctionLevel]
  ), mn = W || !K && L.unavailable, ct = Tt(n) === "sweeping";
  return /* @__PURE__ */ _.jsxs("div", { className: "cleaning-mode-modal__content", children: [
    /* @__PURE__ */ _.jsxs("section", { className: "cleaning-mode-modal__section", children: [
      /* @__PURE__ */ _.jsx("h3", { className: "cleaning-mode-modal__section-title", children: T("custom_mode.cleaning_mode_title") }),
      F.cleaningMode && /* @__PURE__ */ _.jsx(
        zz,
        {
          cleaningMode: n,
          cleaningModeList: i,
          onSelect: Dt,
          entityId: F.cleaningMode,
          t: T,
          customizeSelected: K,
          hideCustomize: W,
          disabled: mn
        }
      )
    ] }),
    !K && /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
      F.suctionLevel && /* @__PURE__ */ _.jsxs("section", { className: "cleaning-mode-modal__section", children: [
        /* @__PURE__ */ _.jsx("h3", { className: "cleaning-mode-modal__section-title", children: T("custom_mode.suction_power_title") }),
        /* @__PURE__ */ _.jsx(
          Nz,
          {
            suctionLevel: o,
            suctionLevelList: l,
            attributeList: ae,
            fanSpeedList: le,
            fanSpeed: ge,
            cleaning: W,
            maxSuctionPower: y,
            onSelectSuctionLevel: dn,
            onToggleMaxPower: G,
            suctionLevelEntityId: F.suctionLevel,
            maxSuctionPowerEntityId: F.maxSuctionPower ?? F.suctionLevel,
            maxPlusDescription: T("custom_mode.max_plus_description"),
            t: T,
            suctionLevelDisabled: !ee.canChangeSuctionPower,
            maxPowerDisabled: !ee.canToggleMaxPower,
            hideMaxPower: !F.maxSuctionPower
          }
        )
      ] }),
      fe && F.waterVolume && !ct && ve.options.length > 0 && /* @__PURE__ */ _.jsxs("section", { className: "cleaning-mode-modal__section", children: [
        /* @__PURE__ */ _.jsx("h3", { className: "cleaning-mode-modal__section-title", children: T("custom_mode.water_volume_title") }),
        /* @__PURE__ */ _.jsx(
          Cz,
          {
            waterVolume: f,
            waterVolumeList: ve.options,
            onSelect: Q,
            entityId: F.waterVolume,
            t: T,
            disabled: !ve.clicksEnabled || !ee.canChangeWetness
          }
        )
      ] }),
      J && F.wetnessLevel && !ct && /* @__PURE__ */ _.jsxs("section", { className: "cleaning-mode-modal__section", children: [
        /* @__PURE__ */ _.jsx("h3", { className: "cleaning-mode-modal__section-title", children: T("custom_mode.wetness_title") }),
        /* @__PURE__ */ _.jsx(
          Az,
          {
            wetnessLevel: s,
            mopPadHumidity: d,
            onChangeWetness: B,
            entityId: F.wetnessLevel,
            slightlyDryLabel: T("custom_mode.slightly_dry"),
            moistLabel: T("custom_mode.moist"),
            wetLabel: T("custom_mode.wet"),
            disabled: !ee.canChangeWetness
          }
        )
      ] }),
      ne && F.mopPadHumidity && !ct && Ge.options.length > 0 && /* @__PURE__ */ _.jsxs("section", { className: "cleaning-mode-modal__section", children: [
        /* @__PURE__ */ _.jsx("h3", { className: "cleaning-mode-modal__section-title", children: T("custom_mode.mop_pad_humidity_title") }),
        /* @__PURE__ */ _.jsx(
          Mz,
          {
            mopPadHumidity: d,
            mopPadHumidityList: Ge.options,
            onSelect: Q,
            entityId: F.mopPadHumidity,
            t: T,
            disabled: !Ge.clicksEnabled || !ee.canChangeWetness
          }
        )
      ] }),
      ie && F.selfCleanFrequency && F.selfCleanArea && F.selfCleanTime && yt.options.length > 0 && /* @__PURE__ */ _.jsxs("section", { className: "cleaning-mode-modal__section", children: [
        /* @__PURE__ */ _.jsx("h3", { className: "cleaning-mode-modal__section-title", children: T("custom_mode.mop_washing_frequency_title") }),
        /* @__PURE__ */ _.jsx(
          Rz,
          {
            selfCleanFrequency: S,
            selfCleanFrequencyList: yt.options,
            selfCleanArea: k,
            selfCleanAreaMin: N,
            selfCleanAreaMax: M,
            selfCleanTime: O,
            selfCleanTimeMin: Y,
            selfCleanTimeMax: D,
            onSelectFrequency: Q,
            onChangeArea: B,
            onChangeTime: B,
            frequencyEntityId: F.selfCleanFrequency,
            areaEntityId: F.selfCleanArea,
            timeEntityId: F.selfCleanTime,
            t: T,
            frequencyDisabled: !yt.clicksEnabled || !ee.canChangeMopFrequency,
            areaDisabled: !1,
            timeDisabled: !1
          }
        )
      ] }),
      E && F.cleaningRoute && Ae.options.length > 0 && /* @__PURE__ */ _.jsxs("section", { className: "cleaning-mode-modal__section", children: [
        /* @__PURE__ */ _.jsx("div", { className: "cleaning-mode-modal__section-header", children: /* @__PURE__ */ _.jsx("h3", { className: "cleaning-mode-modal__section-title", children: T("custom_mode.route_title") }) }),
        /* @__PURE__ */ _.jsx(
          Dz,
          {
            cleaningRoute: g,
            cleaningRouteList: Ae.options,
            onSelect: Q,
            entityId: F.cleaningRoute,
            disabled: !Ae.clicksEnabled || !ee.canChangeRoute
          }
        )
      ] })
    ] })
  ] });
}
const Uz = {
  quiet: "Q",
  silent: "Q",
  standard: "S",
  strong: "P",
  powerful: "P",
  turbo: "P",
  max: "M"
};
function Yz(n) {
  return n ? Uz[Tt(n)] ?? n.charAt(0).toUpperCase() : "-";
}
function Zz(n) {
  return n === null || !Number.isFinite(n) ? "-" : n <= 1 ? "L" : n === 2 ? "M" : "H";
}
function Hz({
  value: n,
  min: i,
  max: o,
  onChange: l,
  slightlyDryLabel: s,
  moistLabel: d,
  wetLabel: m,
  disabled: f = !1
}) {
  const [p, g] = A.useState(null), v = p ?? n, y = _d(), k = (v - i) / (o - i) * 100, S = 20, w = `calc(${k}% + ${S / 2 - k * S / 100}px)`, N = (D) => {
    f || g(parseInt(D.target.value, 10));
  }, M = () => {
    !f && p !== null && p !== n && l(p), g(null);
  }, O = y ? "to left" : "to right", Y = [
    { key: 1, text: s },
    { key: 2, text: d },
    { key: 3, text: m }
  ];
  return /* @__PURE__ */ _.jsxs("div", { className: `customize-mode__wetness-slider ${f ? "customize-mode__wetness-slider--disabled" : ""}`, children: [
    /* @__PURE__ */ _.jsx("div", { className: "cleaning-mode-modal__slider-container", children: /* @__PURE__ */ _.jsxs("div", { className: "cleaning-mode-modal__slider-wrapper", children: [
      /* @__PURE__ */ _.jsx(
        "input",
        {
          type: "range",
          min: i,
          max: o,
          step: 1,
          value: v,
          onChange: N,
          onMouseUp: M,
          onTouchEnd: M,
          onBlur: M,
          disabled: f,
          className: "cleaning-mode-modal__slider",
          style: {
            background: `linear-gradient(${O}, var(--accent-bg-secondary) 0%, var(--accent-bg-secondary) ${k}%, var(--accent-bg-secondary-hover) ${k}%, var(--accent-bg-secondary-hover) 100%)`
          }
        }
      ),
      /* @__PURE__ */ _.jsx(
        "div",
        {
          className: "cleaning-mode-modal__slider-tooltip",
          style: y ? { right: w } : { left: w },
          children: v
        }
      )
    ] }) }),
    /* @__PURE__ */ _.jsx("div", { className: "cleaning-mode-modal__slider-labels", children: Y.map(({ key: D, text: Z }) => /* @__PURE__ */ _.jsx(
      "span",
      {
        className: `cleaning-mode-modal__slider-label cleaning-mode-modal__slider-label--${v === D ? "active" : "inactive"}`,
        onClick: () => !f && l(D),
        style: { cursor: f ? "default" : "pointer" },
        children: Z
      },
      D
    )) })
  ] });
}
function Bz({
  setting: n,
  setSuctionLevel: i,
  setWetnessLevel: o,
  setCleaningTimes: l,
  t: s
}) {
  return /* @__PURE__ */ _.jsxs("div", { className: "customize-mode__room-settings-content", children: [
    n.suctionLevelOptions.length > 0 && /* @__PURE__ */ _.jsxs("div", { className: "customize-mode__setting-group", children: [
      /* @__PURE__ */ _.jsx("span", { className: "customize-mode__setting-label", children: s("custom_mode.suction_power_title") }),
      /* @__PURE__ */ _.jsx("div", { className: "customize-mode__options", children: n.suctionLevelOptions.map((d) => /* @__PURE__ */ _.jsxs("div", { className: "customize-mode__option", children: [
        /* @__PURE__ */ _.jsx(
          Ia,
          {
            size: "small",
            selected: n.suctionLevel === d,
            onClick: () => i(n.roomId, d),
            icon: nh(d)
          }
        ),
        /* @__PURE__ */ _.jsx("span", { className: "customize-mode__option-label", children: eh(d, s) })
      ] }, d)) })
    ] }),
    n.wetnessLevel !== null && Number.isFinite(n.wetnessLevel) && /* @__PURE__ */ _.jsxs("div", { className: "customize-mode__setting-group", children: [
      /* @__PURE__ */ _.jsx("span", { className: "customize-mode__setting-label", children: s("custom_mode.wetness_title") }),
      /* @__PURE__ */ _.jsx(
        Hz,
        {
          value: n.wetnessLevel,
          min: n.wetnessMin,
          max: n.wetnessMax,
          onChange: (d) => o(n.roomId, d),
          slightlyDryLabel: s("custom_mode.slightly_dry"),
          moistLabel: s("custom_mode.moist"),
          wetLabel: s("custom_mode.wet")
        }
      )
    ] }),
    n.cleaningTimesOptions.length > 0 && /* @__PURE__ */ _.jsxs("div", { className: "customize-mode__setting-group", children: [
      /* @__PURE__ */ _.jsx("span", { className: "customize-mode__setting-label", children: s("customize.cycles") }),
      /* @__PURE__ */ _.jsx("div", { className: "customize-mode__options customize-mode__options--pills", children: n.cleaningTimesOptions.map((d) => /* @__PURE__ */ _.jsx(
        "button",
        {
          type: "button",
          className: `customize-mode__pill customize-mode__pill--cycle ${n.cleaningTimes === d ? "customize-mode__pill--selected" : ""}`,
          onClick: () => l(n.roomId, d),
          children: d
        },
        d
      )) })
    ] })
  ] });
}
function Gz() {
  const { t: n } = je(), i = st(), o = Jl(), { get: l } = $t(), s = Lh(
    o.map_entity,
    l("camera", "cleaning_map") ?? l("camera", "map"),
    i,
    o.entity
  ), d = s ? FE(i, s, o.room_names) : [], { roomSettings: m, setSuctionLevel: f, setWetnessLevel: p, setCleaningTimes: g } = x5({
    hass: i,
    vacuumEntityId: o.entity,
    rooms: d.map((v) => ({ id: v.id, name: v.name }))
  });
  return d.length === 0 ? /* @__PURE__ */ _.jsx("div", { className: "customize-mode", children: /* @__PURE__ */ _.jsx("div", { className: "customize-mode__empty", children: /* @__PURE__ */ _.jsx("p", { children: n("customize.no_rooms") }) }) }) : /* @__PURE__ */ _.jsx("div", { className: "customize-mode", children: /* @__PURE__ */ _.jsx("div", { className: "customize-mode__room-accordions", children: d.map((v) => {
    const y = m.get(v.id);
    if (!y) return null;
    const k = [];
    return y.suctionLevel && k.push(Yz(y.suctionLevel)), y.wetnessLevel !== null && Number.isFinite(y.wetnessLevel) && k.push(Zz(y.wetnessLevel)), y.cleaningTimes && k.push(`${y.cleaningTimes}x`), /* @__PURE__ */ _.jsx(
      rn,
      {
        title: v.name,
        icon: /* @__PURE__ */ _.jsx("span", { className: "customize-mode__badges", children: k.map((S, w) => /* @__PURE__ */ _.jsx("span", { className: "customize-mode__badge", children: S }, w)) }),
        children: /* @__PURE__ */ _.jsx(
          Bz,
          {
            setting: y,
            setSuctionLevel: f,
            setWetnessLevel: p,
            setCleaningTimes: g,
            t: n
          }
        )
      },
      v.id
    );
  }) }) });
}
function Kz({ opened: n, onClose: i }) {
  const { t: o } = je(), l = Xt(), s = st(), { phase: d } = Xn(), m = pd(), f = d === "cleaning" || d === "paused", p = (T) => Jo(T ? s.states[T] : void 0), g = p(m.cleaningMode), v = p(m.suctionLevel), y = p(m.waterVolume), k = p(m.mopPadHumidity), S = p(m.cleaningRoute), w = p(m.selfCleanFrequency), N = g.value ?? nt(l.attributes.cleaning_mode, ""), M = v.value ?? "", O = nt(l.attributes.wetness_level, Kn.WETNESS_LEVEL), Y = y.value ?? "", D = S.value ?? "", Z = nt(l.attributes.max_suction_power, Kn.MAX_SUCTION_POWER), K = nt(l.attributes.self_clean_area, Kn.SELF_CLEAN_AREA), te = w.value ?? "", X = k.value ?? "", ee = nt(l.attributes.self_clean_area_min, Kn.SELF_CLEAN_AREA_MIN), re = nt(l.attributes.self_clean_area_max, Kn.SELF_CLEAN_AREA_MAX), me = nt(l.attributes.previous_self_clean_time, Kn.SELF_CLEAN_TIME), Q = nt(l.attributes.self_clean_time_min, Kn.SELF_CLEAN_TIME_MIN), G = nt(l.attributes.self_clean_time_max, Kn.SELF_CLEAN_TIME_MAX), [B, I] = A.useState("standard"), F = [
    { value: "standard", label: o("cleaning_mode.custom") || "Standard" },
    { value: "room", label: o("customize.title") || "Room Customized" }
  ];
  return /* @__PURE__ */ _.jsx(os, { opened: n, onClose: i, children: /* @__PURE__ */ _.jsxs("div", { className: "cleaning-mode-modal", children: [
    /* @__PURE__ */ _.jsx("div", { className: "cleaning-mode-modal__header", children: /* @__PURE__ */ _.jsx(
      sv,
      {
        value: B,
        onChange: (T) => I(T),
        options: F,
        disabled: f
      }
    ) }),
    /* @__PURE__ */ _.jsx("div", { className: "cleaning-mode-modal__content-wrapper", children: B === "standard" ? /* @__PURE__ */ _.jsx(
      Lz,
      {
        cleaningMode: N,
        cleaningModeList: g.options,
        suctionLevel: M,
        suctionLevelList: v.options,
        wetnessLevel: O,
        mopPadHumidity: X,
        mopPadHumidityList: k.options,
        waterVolume: Y,
        waterVolumeList: y.options,
        cleaningRoute: D,
        cleaningRouteList: S.options,
        maxSuctionPower: Z,
        selfCleanArea: K,
        selfCleanFrequency: te,
        selfCleanFrequencyList: w.options,
        selfCleanAreaMin: ee,
        selfCleanAreaMax: re,
        selfCleanTime: me,
        selfCleanTimeMin: Q,
        selfCleanTimeMax: G
      }
    ) : /* @__PURE__ */ _.jsx(Gz, {}) })
  ] }) });
}
function qz(n) {
  return !n || typeof n != "object" || Array.isArray(n) ? [] : Object.entries(n).flatMap(([i, o]) => {
    const l = Number(i);
    if (!Number.isSafeInteger(l) || l <= 0 || !o || typeof o != "object") return [];
    const s = "name" in o && typeof o.name == "string" ? o.name.trim() : "";
    return s ? [{ id: l, name: s }] : [];
  });
}
function Vz({ opened: n, onClose: i }) {
  const { t: o } = je(), l = Xt(), s = st(), d = qz(l.attributes.shortcuts), [m, f] = A.useState("list"), [p, g] = A.useState(null), [v, y] = A.useState(null), [k, S] = A.useState(""), [w, N] = A.useState(!1), [M, O] = A.useState(null), Y = A.useRef(null), D = cn(s, l.entity_id).disabled;
  A.useEffect(() => {
    if (v === null) return;
    const I = (T) => {
      (!Y.current || !T.composedPath().includes(Y.current)) && y(null);
    }, F = (T) => {
      T.key === "Escape" && (T.preventDefault(), y(null));
    };
    return document.addEventListener("mousedown", I), document.addEventListener("keydown", F, !0), () => {
      document.removeEventListener("mousedown", I), document.removeEventListener("keydown", F, !0);
    };
  }, [v]);
  const Z = () => {
    f("list"), g(null), y(null), S(""), N(!1), O(null), i();
  }, K = () => {
    w || (f("list"), g(null), S(""), O(null));
  }, te = async (I) => {
    if (!(D || w)) {
      g(I), N(!0), O(null);
      try {
        await s.callService("dreame_vacuum", "vacuum_start_shortcut", {
          entity_id: l.entity_id,
          shortcut_id: I.id
        }), Z();
      } catch {
        O(o("shortcuts.action_failed")), N(!1);
      }
    }
  }, X = (I) => {
    g(I), S(I.name), y(null), O(null), f("rename");
  }, ee = (I) => {
    g(I), y(null), O(null), f("delete");
  }, re = async (I) => {
    I.preventDefault();
    const F = k.trim();
    if (!(!p || !F || F === p.name || w)) {
      N(!0), O(null);
      try {
        await s.callService("dreame_vacuum", "vacuum_rename_shortcut", {
          entity_id: l.entity_id,
          shortcut_id: p.id,
          shortcut_name: F
        }), N(!1), K();
      } catch {
        O(o("shortcuts.action_failed")), N(!1);
      }
    }
  }, me = async () => {
    if (!(!p || w)) {
      N(!0), O(null);
      try {
        await s.callService("dreame_vacuum", "vacuum_delete_shortcut", {
          entity_id: l.entity_id,
          shortcut_id: p.id
        }), N(!1), K();
      } catch {
        O(o("shortcuts.action_failed")), N(!1);
      }
    }
  }, Q = o(m === "list" ? "shortcuts.title" : `shortcuts.${m}`), G = k.trim(), B = w || !G || !p || G === p.name || D;
  return /* @__PURE__ */ _.jsx(os, { opened: n, onClose: w ? () => {
  } : Z, className: "shortcuts-modal-sheet", children: /* @__PURE__ */ _.jsxs("div", { className: "shortcuts-modal", children: [
    /* @__PURE__ */ _.jsxs("header", { className: "shortcuts-modal__header", children: [
      m !== "list" && /* @__PURE__ */ _.jsx(
        "button",
        {
          type: "button",
          className: "shortcuts-modal__back",
          onClick: K,
          disabled: w,
          "aria-label": o("shortcuts.cancel"),
          children: /* @__PURE__ */ _.jsx(Xb, {})
        }
      ),
      /* @__PURE__ */ _.jsxs("div", { children: [
        /* @__PURE__ */ _.jsx("h2", { className: "shortcuts-modal__title", children: Q }),
        m === "list" && d.length > 0 && /* @__PURE__ */ _.jsx("p", { className: "shortcuts-modal__count", children: o("shortcuts.count", { count: d.length }) })
      ] })
    ] }),
    m === "list" && d.length === 0 ? /* @__PURE__ */ _.jsxs("div", { className: "shortcuts-modal__empty", children: [
      /* @__PURE__ */ _.jsx("p", { children: o("shortcuts.no_shortcuts") }),
      /* @__PURE__ */ _.jsx("p", { className: "shortcuts-modal__empty-hint", children: o("shortcuts.create_hint") })
    ] }) : m === "list" ? /* @__PURE__ */ _.jsx("div", { className: "shortcuts-modal__grid", children: d.map((I) => /* @__PURE__ */ _.jsxs("article", { className: "shortcuts-modal__card", children: [
      /* @__PURE__ */ _.jsxs("div", { className: "shortcuts-modal__menu-wrapper", ref: v === I.id ? Y : void 0, children: [
        /* @__PURE__ */ _.jsx(
          "button",
          {
            type: "button",
            className: "shortcuts-modal__menu-toggle",
            onClick: () => y((F) => F === I.id ? null : I.id),
            disabled: D || w,
            "aria-label": o("shortcuts.manage", { name: I.name }),
            "aria-expanded": v === I.id,
            children: /* @__PURE__ */ _.jsx(g0, {})
          }
        ),
        v === I.id && /* @__PURE__ */ _.jsxs("div", { className: "shortcuts-modal__menu", role: "menu", children: [
          /* @__PURE__ */ _.jsxs("button", { type: "button", role: "menuitem", onClick: () => X(I), children: [
            /* @__PURE__ */ _.jsx(P0, {}),
            o("shortcuts.rename")
          ] }),
          /* @__PURE__ */ _.jsxs(
            "button",
            {
              type: "button",
              role: "menuitem",
              className: "shortcuts-modal__menu-delete",
              onClick: () => ee(I),
              children: [
                /* @__PURE__ */ _.jsx(Hl, {}),
                o("shortcuts.delete")
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ _.jsx("span", { className: "shortcuts-modal__card-icon", children: /* @__PURE__ */ _.jsx(Gu, {}) }),
      /* @__PURE__ */ _.jsx("h3", { className: "shortcuts-modal__card-name", children: I.name }),
      /* @__PURE__ */ _.jsxs(
        "button",
        {
          type: "button",
          className: "shortcuts-modal__start",
          onClick: () => {
            te(I);
          },
          disabled: D || w,
          children: [
            /* @__PURE__ */ _.jsx(Gu, {}),
            w && p?.id === I.id ? o("shortcuts.working") : o("shortcuts.start")
          ]
        }
      )
    ] }, I.id)) }) : m === "rename" && p ? /* @__PURE__ */ _.jsxs("form", { className: "shortcuts-modal__form", onSubmit: (I) => {
      re(I);
    }, children: [
      /* @__PURE__ */ _.jsx("label", { htmlFor: "shortcut-name", children: o("shortcuts.name") }),
      /* @__PURE__ */ _.jsx(
        "input",
        {
          id: "shortcut-name",
          value: k,
          onChange: (I) => S(I.target.value),
          disabled: w,
          autoFocus: !0,
          maxLength: 100
        }
      ),
      M && /* @__PURE__ */ _.jsx("p", { className: "shortcuts-modal__error", children: M }),
      /* @__PURE__ */ _.jsxs("div", { className: "shortcuts-modal__form-actions", children: [
        /* @__PURE__ */ _.jsx("button", { type: "button", onClick: K, disabled: w, children: o("shortcuts.cancel") }),
        /* @__PURE__ */ _.jsx("button", { type: "submit", className: "shortcuts-modal__primary", disabled: B, children: o(w ? "shortcuts.working" : "shortcuts.save") })
      ] })
    ] }) : p ? /* @__PURE__ */ _.jsxs("div", { className: "shortcuts-modal__confirmation", children: [
      /* @__PURE__ */ _.jsx("span", { className: "shortcuts-modal__confirmation-icon", children: /* @__PURE__ */ _.jsx(Hl, {}) }),
      /* @__PURE__ */ _.jsx("p", { children: o("shortcuts.delete_confirmation", { name: p.name }) }),
      M && /* @__PURE__ */ _.jsx("p", { className: "shortcuts-modal__error", children: M }),
      /* @__PURE__ */ _.jsxs("div", { className: "shortcuts-modal__form-actions", children: [
        /* @__PURE__ */ _.jsx("button", { type: "button", onClick: K, disabled: w, children: o("shortcuts.cancel") }),
        /* @__PURE__ */ _.jsx(
          "button",
          {
            type: "button",
            className: "shortcuts-modal__danger",
            onClick: () => {
              me();
            },
            disabled: w || D,
            children: o(w ? "shortcuts.working" : "shortcuts.delete")
          }
        )
      ] })
    ] }) : null,
    m === "list" && M && /* @__PURE__ */ _.jsx("p", { className: "shortcuts-modal__error", children: M }),
    m === "list" && D && /* @__PURE__ */ _.jsx("p", { className: "shortcuts-modal__disabled", children: o("shortcuts.unavailable") })
  ] }) });
}
function Xz({ definition: n, isChild: i = !1, label: o }) {
  const { t: l } = je(), s = Wo(n, o), d = st(), { get: m } = $t(), f = m(n.platform, n.key), p = cn(d, f), g = A.useCallback(
    (v) => {
      f && d.callService("switch", v ? "turn_on" : "turn_off", {
        entity_id: f
      });
    },
    [f, d]
  );
  return !f || p.disabled ? null : /* @__PURE__ */ _.jsxs("div", { className: `entity-item ${i ? "entity-item--child" : ""}`, children: [
    /* @__PURE__ */ _.jsxs("div", { className: "entity-item__info", children: [
      /* @__PURE__ */ _.jsx("span", { className: "entity-item__label", children: s }),
      n.descriptionKey && /* @__PURE__ */ _.jsx("span", { className: "entity-item__description", children: l(n.descriptionKey) })
    ] }),
    /* @__PURE__ */ _.jsx(lv, { checked: p.isOn, disabled: p.unavailable, onChange: g })
  ] });
}
function $z({ definition: n, isChild: i = !1, label: o }) {
  const { t: l } = je(), s = Wo(n, o), d = st(), { get: m } = $t(), f = m(n.platform, n.key), p = cn(d, f), { value: g, options: v } = Jo(p.entity);
  function y(S) {
    f && d.callService("select", "select_option", {
      entity_id: f,
      option: S
    });
  }
  if (!f || p.disabled || v.length === 0) return null;
  const k = g ?? "";
  if (n.useSegmentedControl) {
    const S = v.map((w) => ({
      value: w,
      label: qn(w)
    }));
    return /* @__PURE__ */ _.jsxs("div", { className: `entity-item entity-item--segmented ${i ? "entity-item--child" : ""}`, children: [
      /* @__PURE__ */ _.jsxs("div", { className: "entity-item__info", children: [
        /* @__PURE__ */ _.jsx("span", { className: "entity-item__label", children: s }),
        n.descriptionKey && /* @__PURE__ */ _.jsx("span", { className: "entity-item__description", children: l(n.descriptionKey) })
      ] }),
      /* @__PURE__ */ _.jsx(
        sv,
        {
          options: S,
          value: k,
          onChange: y,
          disabled: p.unavailable
        }
      )
    ] });
  }
  return /* @__PURE__ */ _.jsxs("div", { className: `entity-item entity-item--select ${i ? "entity-item--child" : ""}`, children: [
    /* @__PURE__ */ _.jsxs("div", { className: "entity-item__info", children: [
      /* @__PURE__ */ _.jsx("span", { className: "entity-item__label", children: s }),
      n.descriptionKey && /* @__PURE__ */ _.jsx("span", { className: "entity-item__description", children: l(n.descriptionKey) })
    ] }),
    /* @__PURE__ */ _.jsx(
      "select",
      {
        className: "entity-item__select",
        value: k,
        disabled: p.unavailable,
        onChange: (S) => y(S.target.value),
        children: v.map((S) => /* @__PURE__ */ _.jsx("option", { value: S, children: qn(S) }, S))
      }
    )
  ] });
}
function Ll(n) {
  if (typeof n == "number") return Number.isFinite(n) ? n : null;
  if (typeof n != "string" || n.trim() === "") return null;
  const i = Number(n);
  return Number.isFinite(i) ? i : null;
}
function Pz({ definition: n, isChild: i = !1, label: o }) {
  const { t: l } = je(), s = Wo(n, o), d = st(), { get: m } = $t(), f = m(n.platform, n.key), p = cn(d, f), g = Ll(p.state), v = n.min ?? Ll(p.attributes.min) ?? 0, y = n.max ?? Ll(p.attributes.max) ?? 100, k = n.step ?? Ll(p.attributes.step) ?? 1, [S, w] = A.useState(g ?? v), [N, M] = A.useState(g);
  Object.is(g, N) || (M(g), w(g ?? v));
  const O = A.useCallback(() => {
    !f || g === null || S === g || d.callService("number", "set_value", {
      entity_id: f,
      value: S
    });
  }, [f, d, S, g]);
  if (!f || p.disabled) return null;
  const Y = n.renderHint ?? "slider", D = Y === "volume" ? "entity-item__slider--volume" : Y === "brightness" ? "entity-item__slider--brightness" : "";
  return /* @__PURE__ */ _.jsxs("div", { className: `entity-item entity-item--slider ${i ? "entity-item--child" : ""}`, children: [
    /* @__PURE__ */ _.jsxs("div", { className: "entity-item__info", children: [
      /* @__PURE__ */ _.jsx("span", { className: "entity-item__label", children: s }),
      n.descriptionKey && /* @__PURE__ */ _.jsx("span", { className: "entity-item__description", children: l(n.descriptionKey) })
    ] }),
    /* @__PURE__ */ _.jsxs("div", { className: `entity-item__slider-container ${D}`, children: [
      /* @__PURE__ */ _.jsx(
        "input",
        {
          type: "range",
          className: "entity-item__slider",
          min: v,
          max: y,
          step: k,
          value: S,
          disabled: p.unavailable || g === null,
          onChange: (Z) => w(Number(Z.target.value)),
          onMouseUp: O,
          onTouchEnd: O,
          onKeyUp: O,
          onBlur: O
        }
      ),
      /* @__PURE__ */ _.jsxs("span", { className: "entity-item__slider-value", children: [
        Math.round(S),
        Y === "volume" || Y === "brightness" ? "%" : ""
      ] })
    ] })
  ] });
}
function Iz({ definition: n, isChild: i = !1, buttonLabel: o, label: l }) {
  const { t: s } = je(), d = Wo(n, l), m = st(), { get: f } = $t(), { armedKey: p, tap: g } = Zh(), v = f(n.platform, n.key), y = cn(m, v), k = A.useCallback(() => {
    v && m.callService("button", "press", {
      entity_id: v
    });
  }, [v, m]);
  if (!v || y.disabled) return null;
  const S = p === v, w = n.confirm ? () => g(v, k) : k;
  return /* @__PURE__ */ _.jsxs("div", { className: `entity-item ${i ? "entity-item--child" : ""}`, children: [
    /* @__PURE__ */ _.jsxs("div", { className: "entity-item__info", children: [
      /* @__PURE__ */ _.jsx("span", { className: "entity-item__label", children: d }),
      n.descriptionKey && /* @__PURE__ */ _.jsx("span", { className: "entity-item__description", children: s(n.descriptionKey) })
    ] }),
    /* @__PURE__ */ _.jsx(
      "button",
      {
        className: `entity-item__button ${S ? "entity-item__button--armed" : ""}`,
        disabled: y.unavailable,
        onClick: w,
        children: S ? s("common.confirm_tap") : o ?? s("common.run")
      }
    )
  ] });
}
const Fz = /^\d{2}:\d{2}/;
function Qz({ definition: n, isChild: i = !1, label: o }) {
  const { t: l } = je(), s = Wo(n, o), d = st(), { get: m } = $t(), f = m(n.platform, n.key), p = cn(d, f), g = p.state?.match(Fz)?.[0] ?? "", v = A.useCallback(
    (y) => {
      f && d.callService("time", "set_value", {
        entity_id: f,
        time: y
      });
    },
    [f, d]
  );
  return !f || p.disabled ? null : /* @__PURE__ */ _.jsxs("div", { className: `entity-item entity-item--time ${i ? "entity-item--child" : ""}`, children: [
    /* @__PURE__ */ _.jsxs("div", { className: "entity-item__info", children: [
      /* @__PURE__ */ _.jsx("span", { className: "entity-item__label", children: s }),
      n.descriptionKey && /* @__PURE__ */ _.jsx("span", { className: "entity-item__description", children: l(n.descriptionKey) })
    ] }),
    /* @__PURE__ */ _.jsx(
      "input",
      {
        type: "time",
        className: "entity-item__time-input",
        value: g,
        disabled: p.unavailable,
        onChange: (y) => v(y.target.value)
      }
    )
  ] });
}
function cv({ definition: n, isChild: i = !1, label: o }) {
  const l = st(), { get: s } = $t();
  if (n.parentKey && cn(l, s("switch", n.parentKey)).isOn === !!n.parentOff)
    return null;
  const d = i || !!n.parentKey;
  switch (n.platform) {
    case "switch":
      return /* @__PURE__ */ _.jsx(Xz, { definition: n, isChild: d, label: o });
    case "select":
      return /* @__PURE__ */ _.jsx($z, { definition: n, isChild: d, label: o });
    case "number":
      return /* @__PURE__ */ _.jsx(Pz, { definition: n, isChild: d, label: o });
    case "button":
      return /* @__PURE__ */ _.jsx(Iz, { definition: n, isChild: d, label: o });
    case "time":
      return /* @__PURE__ */ _.jsx(Qz, { definition: n, isChild: d, label: o });
    default:
      return null;
  }
}
function Vn({ section: n, className: i }) {
  return /* @__PURE__ */ _.jsx("div", { className: `data-driven-section ${i ?? ""}`, children: n.entities.map((o) => /* @__PURE__ */ _.jsx(cv, { definition: o }, o.key)) });
}
function Jz() {
  return /* @__PURE__ */ _.jsx(Vn, { section: cd, className: "ai-detection-section" });
}
function Wz() {
  return /* @__PURE__ */ _.jsx(Vn, { section: id, className: "carpet-settings-section" });
}
const eN = [
  {
    key: "main_brush",
    labelKey: "settings.consumables.main_brush",
    percentKey: ze.MAIN_BRUSH_LEFT.key,
    hoursKey: ze.MAIN_BRUSH_TIME_LEFT.key,
    consumableKey: "main_brush"
  },
  {
    key: "side_brush",
    labelKey: "settings.consumables.side_brush",
    percentKey: ze.SIDE_BRUSH_LEFT.key,
    hoursKey: ze.SIDE_BRUSH_TIME_LEFT.key,
    consumableKey: "side_brush"
  },
  {
    key: "filter",
    labelKey: "settings.consumables.filter",
    percentKey: ze.FILTER_LEFT.key,
    hoursKey: ze.FILTER_TIME_LEFT.key,
    consumableKey: "filter"
  },
  {
    key: "sensor",
    labelKey: "settings.consumables.sensor",
    percentKey: ze.SENSOR_DIRTY_LEFT.key,
    hoursKey: ze.SENSOR_DIRTY_TIME_LEFT.key,
    consumableKey: "sensor"
  },
  {
    key: "mop_pad",
    labelKey: "settings.consumables.mop_pad",
    percentKey: ze.MOP_PAD_LEFT.key,
    hoursKey: ze.MOP_PAD_TIME_LEFT.key,
    consumableKey: "mop_pad"
  },
  {
    key: "silver_ion",
    labelKey: "settings.consumables.silver_ion",
    percentKey: ze.SILVER_ION_LEFT.key,
    hoursKey: ze.SILVER_ION_TIME_LEFT.key,
    consumableKey: "silver_ion"
  },
  {
    key: "detergent",
    labelKey: "settings.consumables.detergent",
    percentKey: ze.DETERGENT_LEFT.key,
    hoursKey: ze.DETERGENT_TIME_LEFT.key,
    consumableKey: "detergent"
  },
  {
    key: "squeegee",
    labelKey: "settings.consumables.squeegee",
    percentKey: ze.SQUEEGEE_LEFT.key,
    hoursKey: ze.SQUEEGEE_TIME_LEFT.key,
    consumableKey: "squeegee"
  },
  {
    key: "tank_filter",
    labelKey: "settings.consumables.tank_filter",
    percentKey: ze.TANK_FILTER_LEFT.key,
    hoursKey: ze.TANK_FILTER_TIME_LEFT.key,
    consumableKey: "tank_filter"
  },
  {
    key: "onboard_dirty_water_tank",
    labelKey: "settings.consumables.onboard_dirty_water_tank",
    percentKey: ze.ONBOARD_DIRTY_WATER_TANK_LEFT.key,
    hoursKey: ze.ONBOARD_DIRTY_WATER_TANK_TIME_LEFT.key,
    consumableKey: "onboard_dirty_water_tank"
  },
  {
    key: "dirty_water_channel",
    labelKey: "settings.consumables.dirty_water_channel",
    percentKey: ze.DIRTY_WATER_CHANNEL_DIRTY_LEFT.key,
    hoursKey: ze.DIRTY_WATER_CHANNEL_DIRTY_TIME_LEFT.key,
    consumableKey: "dirty_water_channel"
  },
  {
    key: "deodorizer",
    labelKey: "settings.consumables.deodorizer",
    percentKey: ze.DEODORIZER_LEFT.key,
    hoursKey: ze.DEODORIZER_TIME_LEFT.key,
    consumableKey: "deodorizer"
  },
  {
    key: "wheel",
    labelKey: "settings.consumables.wheel",
    percentKey: ze.WHEEL_DIRTY_LEFT.key,
    hoursKey: ze.WHEEL_DIRTY_TIME_LEFT.key,
    consumableKey: "wheel"
  },
  {
    key: "scale_inhibitor",
    labelKey: "settings.consumables.scale_inhibitor",
    percentKey: ze.SCALE_INHIBITOR_LEFT.key,
    hoursKey: ze.SCALE_INHIBITOR_TIME_LEFT.key,
    consumableKey: "scale_inhibitor"
  },
  {
    key: "fluffing_roller",
    labelKey: "settings.consumables.fluffing_roller",
    percentKey: ze.FLUFFING_ROLLER_DIRTY_LEFT.key,
    hoursKey: ze.FLUFFING_ROLLER_DIRTY_TIME_LEFT.key,
    consumableKey: "fluffing_roller"
  },
  {
    key: "roller_mop_filter",
    labelKey: "settings.consumables.roller_mop_filter",
    percentKey: ze.ROLLER_MOP_FILTER_DIRTY_LEFT.key,
    hoursKey: ze.ROLLER_MOP_FILTER_DIRTY_TIME_LEFT.key,
    consumableKey: "roller_mop_filter"
  },
  {
    key: "water_outlet_filter",
    labelKey: "settings.consumables.water_outlet_filter",
    percentKey: ze.WATER_OUTLET_FILTER_DIRTY_LEFT.key,
    hoursKey: ze.WATER_OUTLET_FILTER_DIRTY_TIME_LEFT.key,
    consumableKey: "water_outlet_filter"
  }
];
function uv(n) {
  return eN.filter((i) => {
    const o = n[i.percentKey];
    return o != null;
  });
}
function tN() {
  const { t: n } = je(), i = Xt(), o = st(), { armedKey: l, tap: s } = Zh(), d = i.attributes, m = A.useCallback(
    (p) => {
      o.callService("botslab_vacuum", "reset_consumable", {
        entity_id: i.entity_id,
        consumable_type: p,
        consumable: p
      });
    },
    [o, i.entity_id]
  ), f = (p) => p >= 50 ? "var(--consumable-good, #34c759)" : p >= 20 ? "var(--consumable-warning, #ff9500)" : "var(--consumable-critical, #ff3b30)";
  return /* @__PURE__ */ _.jsx("div", { className: "consumables-section", children: uv(d).map((p) => {
    const g = nt(d[p.percentKey] ?? d[`${p.key}_life_pct`], 0), v = Math.min(100, Math.max(0, g)), y = nt(
      d[p.hoursKey] ?? d[`${p.key}_left_hours`] ?? d[`${p.key}_time_left`],
      0
    ), k = f(v), S = l === p.key;
    return /* @__PURE__ */ _.jsxs("div", { className: "consumables-section__item", children: [
      /* @__PURE__ */ _.jsxs("div", { className: "consumables-section__info", children: [
        /* @__PURE__ */ _.jsx("span", { className: "consumables-section__label", children: n(p.labelKey) }),
        /* @__PURE__ */ _.jsxs("span", { className: "consumables-section__stats", children: [
          v,
          "% · ",
          y,
          "h ",
          n("settings.consumables.remaining")
        ] })
      ] }),
      /* @__PURE__ */ _.jsx("div", { className: "consumables-section__progress", children: /* @__PURE__ */ _.jsx(
        "div",
        {
          className: "consumables-section__progress-bar",
          style: {
            width: `${v}%`,
            backgroundColor: k
          }
        }
      ) }),
      /* @__PURE__ */ _.jsx(
        "button",
        {
          className: `consumables-section__reset ${S ? "consumables-section__reset--armed" : ""}`,
          onClick: () => s(p.key, () => m(p.consumableKey)),
          type: "button",
          children: n(S ? "common.confirm_tap" : "settings.consumables.reset")
        }
      )
    ] }, p.key);
  }) });
}
function nN() {
  const { t: n } = je(), i = fd(), l = Xt().attributes, s = l.firmware_version ?? l.sw_version ?? l.version, d = zl(s) || Vo(s) ? s : "-", m = nt(l.total_cleaned_area ?? l.total_cleaning_area_sqm, 0), f = nt(l.total_cleaning_time ?? l.total_cleaning_time_minutes, 0), p = nt(l.cleaning_count ?? l.tasks_total_count, 0), g = l.ap && typeof l.ap == "object" ? l.ap : void 0, v = g?.ssid && g.ssid !== "-" ? g.ssid : l.wifi_ssid ?? l.ssid ?? "-", y = zl(v) || Vo(v) ? v : "-", k = g?.rssi !== void 0 && g.rssi !== "-" ? g.rssi : l.wifi_rssi ?? l.rssi ?? "-", S = zl(k) || Vo(k) ? k : "-", w = g?.ip && g.ip !== "-" ? g.ip : l.ip_address ?? l.ip ?? "-", N = zl(w) || Vo(w) ? w : "-", M = S !== "-" && S !== "" && S !== void 0 && S !== null, O = [
    { labelKey: "settings.device_info.firmware", value: d },
    { labelKey: "settings.device_info.total_area", value: m, unit: i },
    { labelKey: "settings.device_info.total_time", value: f, unit: n("units.minutes") },
    { labelKey: "settings.device_info.total_cleans", value: p },
    { labelKey: "settings.device_info.wifi_ssid", value: y },
    { labelKey: "settings.device_info.wifi_signal", value: S, unit: M ? n("units.decibels") : void 0 },
    { labelKey: "settings.device_info.ip_address", value: N }
  ];
  return /* @__PURE__ */ _.jsx("div", { className: "device-info-section", children: O.map((Y) => /* @__PURE__ */ _.jsxs("div", { className: "device-info-section__item", children: [
    /* @__PURE__ */ _.jsx("span", { className: "device-info-section__label", children: n(Y.labelKey) }),
    /* @__PURE__ */ _.jsxs("span", { className: "device-info-section__value", children: [
      Y.value,
      Y.unit && ` ${Y.unit}`
    ] })
  ] }, Y.labelKey)) });
}
function aN() {
  return /* @__PURE__ */ _.jsx(Vn, { section: sd, className: "dock-settings-section" });
}
function iN() {
  return /* @__PURE__ */ _.jsx(Vn, { section: rd, className: "edge-corner-section" });
}
function oN() {
  return /* @__PURE__ */ _.jsx(Vn, { section: od, className: "floor-settings-section" });
}
function rN() {
  return /* @__PURE__ */ _.jsx(Vn, { section: ud, className: "map-settings-section" });
}
function lN() {
  return /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
    /* @__PURE__ */ _.jsx(Vn, { section: nd, className: "quick-settings-section" }),
    /* @__PURE__ */ _.jsx(
      Vn,
      {
        section: ad,
        className: "quick-settings-section quick-settings-section--actions"
      }
    )
  ] });
}
function sN() {
  return /* @__PURE__ */ _.jsx(Vn, { section: ld, className: "volume-section" });
}
function Gn(n, i) {
  return n.entities.some((o) => i(o.platform, o.key));
}
function cN({ opened: n, onClose: i }) {
  const { t: o } = je(), l = Xt(), { status: s, get: d, extras: m } = $t(), f = s === "ready";
  return /* @__PURE__ */ _.jsx(os, { opened: n, onClose: i, children: /* @__PURE__ */ _.jsxs("div", { className: "settings-panel", children: [
    /* @__PURE__ */ _.jsx("h2", { className: "settings-panel__title", children: o("settings.title") }),
    /* @__PURE__ */ _.jsx("div", { className: "settings-panel__scroll-wrapper", children: /* @__PURE__ */ _.jsxs("div", { className: "settings-panel__sections", children: [
      uv(l.attributes).length > 0 && /* @__PURE__ */ _.jsx(rn, { title: o("settings.consumables.title"), icon: /* @__PURE__ */ _.jsx(k0, {}), children: /* @__PURE__ */ _.jsx(tN, {}) }),
      f && (Gn(nd, d) || Gn(ad, d)) && /* @__PURE__ */ _.jsx(rn, { title: o("settings.quick_settings.title"), icon: /* @__PURE__ */ _.jsx(o1, {}), children: /* @__PURE__ */ _.jsx(lN, {}) }),
      f && Gn(id, d) && /* @__PURE__ */ _.jsx(rn, { title: o("settings.carpet.title"), icon: /* @__PURE__ */ _.jsx(C0, {}), children: /* @__PURE__ */ _.jsx(Wz, {}) }),
      f && Gn(od, d) && /* @__PURE__ */ _.jsx(rn, { title: o("settings.floor.title"), icon: /* @__PURE__ */ _.jsx(b0, {}), children: /* @__PURE__ */ _.jsx(oN, {}) }),
      f && Gn(rd, d) && /* @__PURE__ */ _.jsx(rn, { title: o("settings.edge_corner.title"), icon: /* @__PURE__ */ _.jsx(c0, {}), children: /* @__PURE__ */ _.jsx(iN, {}) }),
      f && Gn(ld, d) && /* @__PURE__ */ _.jsx(rn, { title: o("settings.volume.title"), icon: /* @__PURE__ */ _.jsx(N1, {}), children: /* @__PURE__ */ _.jsx(sN, {}) }),
      f && Gn(sd, d) && /* @__PURE__ */ _.jsx(rn, { title: o("settings.dock.title"), icon: /* @__PURE__ */ _.jsx(d0, {}), children: /* @__PURE__ */ _.jsx(aN, {}) }),
      f && Gn(cd, d) && /* @__PURE__ */ _.jsx(rn, { title: o("settings.ai_detection.title"), icon: /* @__PURE__ */ _.jsx(i0, {}), children: /* @__PURE__ */ _.jsx(Jz, {}) }),
      f && Gn(ud, d) && /* @__PURE__ */ _.jsx(rn, { title: o("settings.map.title"), icon: /* @__PURE__ */ _.jsx(Ql, {}), children: /* @__PURE__ */ _.jsx(rN, {}) }),
      m.length > 0 && /* @__PURE__ */ _.jsx(rn, { title: o("settings.more.title"), icon: /* @__PURE__ */ _.jsx(v0, {}), children: m.map((p) => /* @__PURE__ */ _.jsx(
        cv,
        {
          label: p.friendlyName,
          definition: {
            key: p.translationKey,
            platform: p.domain,
            labelKey: "settings.more.title"
          }
        },
        p.entityId
      )) }),
      /* @__PURE__ */ _.jsx(rn, { title: o("settings.device_info.title"), icon: /* @__PURE__ */ _.jsx(N0, {}), children: /* @__PURE__ */ _.jsx(nN, {}) })
    ] }) })
  ] }) });
}
function uN({ selectedRooms: n }) {
  const { t: i } = je();
  if (n.size === 0)
    return null;
  const o = Array.from(n.values()).join(", ");
  return /* @__PURE__ */ _.jsxs("div", { className: "room-selection-display", children: [
    /* @__PURE__ */ _.jsx("span", { className: "room-selection-display__label", children: i("room_display.selected_label") }),
    /* @__PURE__ */ _.jsx("span", { className: "room-selection-display__rooms", children: o })
  ] });
}
function Bu(n, i, o) {
  const l = Jo(i ? n.states[i] : void 0).value;
  return l || (typeof o == "string" ? o : "");
}
function dN({
  onClick: n,
  onShortcutsClick: i,
  onRepeatClick: o,
  repeatCount: l
}) {
  const s = st(), d = Xt(), m = pd();
  return /* @__PURE__ */ _.jsx(
    R5,
    {
      cleanGeniusMode: Bu(s, m.cleangeniusMode, d.attributes.cleangenius_mode),
      cleaningMode: Bu(s, m.cleaningMode, d.attributes.cleaning_mode),
      cleangenius: Bu(s, m.cleangenius, d.attributes.cleangenius),
      onClick: n,
      onShortcutsClick: i,
      onRepeatClick: o,
      repeatCount: l
    }
  );
}
function mN({ hass: n, config: i }) {
  const o = n.states[i.entity], l = xS(n, i.entity);
  _e.debug("DreameVacuumCard", "Loaded entity", o);
  const s = LS(i.language, n.language), d = Ig(s), { t: m } = je(s), [f, p] = A.useState(null), [g, v] = A.useState(null), [y, k] = A.useState(null), {
    selectedMode: S,
    areaSelectionMode: w,
    selectedRooms: N,
    selectedZones: M,
    modalOpened: O,
    shortcutsModalOpened: Y,
    settingsPanelOpened: D,
    repeatCount: Z,
    setSelectedMode: K,
    setSelectedRooms: te,
    setSelectedZones: X,
    setModalOpened: ee,
    setShortcutsModalOpened: re,
    setSettingsPanelOpened: me,
    handleModeChange: Q,
    handleAreaSelectionModeChange: G,
    handleRoomToggle: B,
    cycleRepeatCount: I,
    resetRepeatCount: F
  } = MS({ vacuumEntityId: i.entity, defaultMode: i.default_mode }), T = Lh(
    i.map_entity,
    l.get("camera", "cleaning_map") ?? l.get("camera", "map"),
    n,
    i.entity
  ), J = T ? n.states[T]?.attributes : void 0, ne = l5(o?.attributes.selected_map_id, J, g), fe = ne.floorReady && ne.imageReady, ie = ne.imageKey === g ? f : null, E = A5({
    hass: n,
    mapEntityId: T,
    imageWidth: ie?.width ?? 0,
    imageHeight: ie?.height ?? 0,
    roomNames: i.room_names
  }), L = fe ? E : { rooms: [], rotation: E.rotation, transform: null }, W = o ? o.state === "cleaning" || nt(o.attributes.started, !1) : !1, ae = o ? o.attributes.segment_cleaning === !0 : !1, le = A.useRef(void 0);
  A.useEffect(() => {
    const Lt = le.current !== void 0 && le.current !== ne.floorId;
    (le.current === void 0 || Lt) && (le.current = ne.floorId);
    const Ut = WE(n, i.entity, T, i.room_names), bt = c5({
      floorChanged: Lt,
      mapReady: fe,
      isSegmentCleaning: ae,
      selectedRooms: N,
      activeSegments: Ut
    });
    bt.clearZone && X([]), bt.rooms && (_e.debug("DreameVacuumCard", "Updating room selection for the current floor", [...bt.rooms.keys()]), te(bt.rooms)), bt.selectRoomMode && K("room");
  }, [
    ne.floorId,
    fe,
    ae,
    n,
    i.entity,
    i.room_names,
    T,
    N,
    te,
    X,
    K
  ]), A.useEffect(() => {
    W || F();
  }, [W, F]);
  const { toast: ge, showToast: ve, hideToast: Ge } = QS(), { handlePause: Ae, handleResume: yt, handleStop: Dt, handleDock: dn, handleClean: mn, handleSaveNoGoZone: ct } = FS({
    hass: n,
    entityId: i.entity,
    mapEntityId: T,
    mapTransform: L.transform,
    onSuccess: ve,
    onError: ve
  }), Ke = A.useCallback(
    (Lt, Ut) => {
      const bt = N.has(Lt);
      B(Lt, Ut), ve(
        bt ? m("toast.deselected_room", { name: Ut }) : m("toast.selected_room", { name: Ut })
      );
    },
    [N, B, ve, m]
  ), Ie = A.useRef(!1), rs = A.useCallback(async () => {
    if (!Ie.current) {
      Ie.current = !0;
      try {
        if (S === "zone" && (w === "no_go" || w === "no_mop")) {
          const Ut = w === "no_mop" ? "mop" : "forbid";
          await ct(
            M,
            ie?.width ?? 0,
            ie?.height ?? 0,
            Ut
          ) && X([]);
          return;
        }
        let Lt;
        if (S === "room") {
          const Ut = Zl(i.entity), bt = {};
          for (const $n of N.keys()) {
            const ut = Ut[$n];
            ut && (bt[String($n)] = {
              fan_speed: ut.suctionLevel,
              water_level: ut.wetnessLevel === 1 ? "low" : ut.wetnessLevel === 2 ? "medium" : "high",
              repeat_times: Number(ut.cleaningTimes || 1)
            });
          }
          Object.keys(bt).length > 0 && (Lt = bt);
        }
        await mn(
          S,
          N,
          M,
          ie?.width,
          ie?.height,
          Z,
          Lt
        );
      } finally {
        Ie.current = !1;
      }
    }
  }, [
    S,
    w,
    N,
    M,
    ie,
    Z,
    i.entity,
    mn,
    ct,
    X
  ]), ir = A.useCallback(() => me(!0), [me]), qi = A.useCallback(() => me(!1), [me]), Vi = A.useCallback(() => ee(!0), [ee]), Xi = A.useCallback(() => ee(!1), [ee]), ls = A.useCallback(() => re(!0), [re]), ss = A.useCallback(() => re(!1), [re]), kt = A.useCallback(
    (Lt, Ut, bt) => {
      bt === ne.imageToken && (v(ne.imageKey), p({ width: Lt, height: Ut }));
    },
    [ne.imageToken, ne.imageKey]
  );
  if (!o)
    return /* @__PURE__ */ _.jsx("div", { className: "dreame-vacuum-card__error", children: m("errors.entity_not_found", { entity: i.entity }) });
  if (o.state === "unavailable" || o.state === "unknown")
    return /* @__PURE__ */ _.jsx("div", { className: "dreame-vacuum-card__error dreame-vacuum-card__error--unavailable", children: m("errors.entity_unavailable") });
  const cs = i.title || o.attributes.friendly_name || "Dreame Vacuum", or = JE(o, S), $i = typeof i.map_height == "number" ? `${i.map_height}px` : i.map_height, Fa = (o.attributes.capabilities ?? []).includes(_S.SHORTCUTS), rr = u5({
    hasCamera: !!(T && n.states[T]),
    imageFailed: ne.imageToken !== null && y === ne.imageToken,
    floorReady: ne.floorReady,
    imageReady: ne.imageReady,
    roomCount: L.rooms.length,
    hasTransform: L.transform !== null
  });
  return /* @__PURE__ */ _.jsx(y5, { hass: n, entity: o, config: i, language: s, deviceEntities: l, children: /* @__PURE__ */ _.jsxs(
    "div",
    {
      className: "dreame-vacuum-card",
      dir: d ? "rtl" : "ltr",
      style: $i ? { "--map-max-height": $i } : void 0,
      children: [
        /* @__PURE__ */ _.jsxs("div", { className: "dreame-vacuum-card__container", children: [
          /* @__PURE__ */ _.jsxs("div", { className: "dreame-vacuum-card__header", children: [
            /* @__PURE__ */ _.jsx(C5, { deviceName: cs, onSettingsClick: ir }),
            /* @__PURE__ */ _.jsx(O5, { onToast: ve, isSwitchingFloor: !ne.floorReady }),
            l.status === "error" && /* @__PURE__ */ _.jsx("p", { className: "dreame-vacuum-card__diagnostic", children: m("errors.entity_discovery_failed") }),
            rr && /* @__PURE__ */ _.jsx("p", { className: "dreame-vacuum-card__diagnostic", children: m(`vacuum_map.diagnostic_${rr}`) })
          ] }),
          /* @__PURE__ */ _.jsx("div", { className: "dreame-vacuum-card__map", children: /* @__PURE__ */ _.jsx(
            pz,
            {
              mapEntityId: T,
              geometry: L,
              selectedMode: S,
              areaSelectionMode: w,
              selectedRooms: N,
              onRoomToggle: Ke,
              zone: fe ? M : [],
              onZoneChange: X,
              onImageDimensionsChange: kt,
              onImageError: k,
              defaultRoomView: i.default_room_view,
              onZoneDeleted: ve,
              isFloorSwitching: !ne.floorReady
            }
          ) }),
          /* @__PURE__ */ _.jsxs("div", { className: "dreame-vacuum-card__footer", children: [
            /* @__PURE__ */ _.jsx(
              dN,
              {
                onClick: Vi,
                onShortcutsClick: Fa ? ls : void 0,
                onRepeatClick: I,
                repeatCount: Z
              }
            ),
            /* @__PURE__ */ _.jsxs("div", { className: "dreame-vacuum-card__controls", children: [
              S === "room" && /* @__PURE__ */ _.jsx(uN, { selectedRooms: N }),
              /* @__PURE__ */ _.jsx(
                gz,
                {
                  selectedMode: or,
                  areaSelectionMode: w,
                  onModeChange: Q,
                  onAreaSelectionModeChange: G
                }
              ),
              /* @__PURE__ */ _.jsx(
                Tz,
                {
                  selectedMode: S,
                  areaSelectionMode: w,
                  selectedRoomsCount: N.size,
                  selectedZonesCount: M.length,
                  onClean: rs,
                  onPause: Ae,
                  onResume: yt,
                  onStop: Dt,
                  onDock: dn
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ _.jsx(Kz, { opened: O, onClose: Xi }),
        /* @__PURE__ */ _.jsx(Vz, { opened: Y, onClose: ss }),
        /* @__PURE__ */ _.jsx(cN, { opened: D, onClose: qi }),
        ge && /* @__PURE__ */ _.jsx(hz, { message: ge, onClose: Ge })
      ]
    }
  ) });
}
const fN = `.accordion{border-radius:.75rem;background:var(--card-bg, rgba(255, 255, 255, .8));overflow:hidden;margin-bottom:.5rem}.accordion__header{display:flex;align-items:center;justify-content:space-between;width:100%;padding:.875rem 1rem;background:none;border:none;cursor:pointer;color:var(--text-primary, #000);font-size:.9375rem;font-weight:500;text-align:left}[dir=rtl] .accordion__header{text-align:right}.accordion__header{transition:background-color .2s ease}.accordion__header:hover{background:var(--hover-bg, rgba(0, 0, 0, .03))}.accordion__header:active{background:var(--active-bg, rgba(0, 0, 0, .06))}.accordion__title-wrapper{display:flex;align-items:center;gap:.625rem}.accordion__icon{display:flex;align-items:center;justify-content:center;color:var(--accent-color, #007aff)}.accordion__icon svg{width:1.25rem;height:1.25rem}.accordion__title{font-weight:500}.accordion__chevron{width:1.25rem;height:1.25rem;color:var(--text-secondary, #666);transition:transform .3s ease}.accordion__content{max-height:0;overflow:hidden;transition:max-height .3s ease}.accordion__content-inner{padding:0 1rem 1rem}.accordion--open .accordion__chevron{transform:rotate(180deg)}.accordion--open .accordion__content{max-height:1000px}.toggle{position:relative;display:inline-block;width:3.1875rem;height:1.9375rem}.toggle__input{opacity:0;width:0;height:0}.toggle__slider{position:absolute;cursor:pointer;inset:0;background-color:var(--surface-tertiary, #e0e0e0);transition:.4s;border-radius:1.9375rem}.toggle__knob{position:absolute;height:1.6875rem;width:1.6875rem;left:.125rem}[dir=rtl] .toggle__knob{left:auto;right:.125rem}.toggle__knob{bottom:.125rem;background-color:var(--surface-bg, white);transition:.4s;border-radius:50%;box-shadow:0 .125rem .25rem var(--card-shadow, rgba(0, 0, 0, .2))}.toggle__input:checked+.toggle__slider{background-color:var(--toggle-active);border:.125rem solid var(--toggle-active-border);box-shadow:0 0 0 .25rem var(--toggle-active-shadow-color)}.toggle__input:checked+.toggle__slider .toggle__knob{transform:translate(1.25rem)}[dir=rtl] .toggle__input:checked+.toggle__slider .toggle__knob{transform:translate(-1.25rem)}.toggle--disabled{opacity:.5;pointer-events:none}.circular-button{display:flex;flex-direction:column;align-items:center;gap:.5rem}.circular-button:hover:not(.circular-button--disabled){transform:translateY(-.125rem)}.circular-button--disabled{opacity:.5;pointer-events:none}.circular-button__circle{border-radius:50%;background:var(--surface-secondary, #f5f5f5);display:flex;align-items:center;justify-content:center;cursor:pointer;border:.0625rem solid var(--text-primary, black);transition:all .2s ease;color:var(--text-primary)}[dir=rtl] .circular-button__circle>:nth-child(2):not(:last-child){rotate:180deg}.circular-button__circle--small{width:3.5rem;height:3.5rem;font-size:1.5rem}.circular-button__circle--medium{width:4.5rem;height:4.5rem;font-size:1.75rem}.circular-button__circle--large{width:5.5rem;height:5.5rem;font-size:2rem}.circular-button__circle--selected{background:var(--toggle-active);border:.1875rem solid var(--toggle-active-border);box-shadow:0 0 0 .25rem var(--toggle-active-shadow-color);color:var(--text-primary)}.circular-button__circle:hover:not(.circular-button__circle--selected){background:var(--surface-tertiary, #ebebeb)}.circular-button__circle:active{transform:scale(.95)}.circular-button__icon{display:flex;align-items:center;justify-content:center}.circular-button__icon--svg{width:100%;height:100%;color:var(--text-primary, #1a1a1a)}.circular-button__icon--svg svg{width:100%;height:100%;display:block}.circular-button__circle--selected .circular-button__icon--svg{color:var(--text-primary-invert)}.circular-button__label{font-size:.8125rem;color:var(--text-primary, #1a1a1a);text-align:center;line-height:1.2}.modal{position:absolute;inset:20% 0 0;background:var(--surface-bg);border-top:1px solid var(--border-color);border-radius:1.125rem 1.125rem 0 0;padding:0 1.25rem 1.25rem;z-index:1000;max-height:80vh;overflow-y:hidden;color:var(--text-primary);box-shadow:0 -.5rem 1.5rem var(--card-shadow)}.modal::-webkit-scrollbar{display:none}.modal__backdrop{position:absolute;inset:0;background:var(--backdrop-bg);z-index:999;border-radius:var(--ha-card-border-radius, 1rem)}.modal__handle{width:2.25rem;height:.25rem;background:var(--handle-bg);border-radius:.125rem;margin:.75rem auto 1.125rem}.modal__content{height:90%}.segmented-control{display:flex;gap:.5rem;background:var(--surface-tertiary, #e8e8e8);border-radius:.75rem;padding:.25rem}.segmented-control--disabled{opacity:.5;pointer-events:none}.segmented-control__button{flex:1;border:none;border-radius:.625rem;padding:.75rem;font-size:.9375rem;font-weight:500;cursor:pointer;background-color:transparent;color:var(--text-primary, #1a1a1a);transition:all .2s}.segmented-control__button--active{background-color:var(--surface-bg, white);box-shadow:0 .125rem .25rem var(--card-shadow, rgba(0, 0, 0, .08))}.segmented-control__button:hover:not(.segmented-control__button--active){background-color:var(--surface-bg-hover, rgba(255, 255, 255, .5))}.toast{position:absolute;top:1rem;left:50%;transform:translate(-50%);background:var(--surface-bg);border:1px solid var(--border-color);border-radius:.625rem;padding:.625rem .875rem;display:flex;align-items:center;gap:.75rem;box-shadow:0 .25rem .75rem var(--card-shadow-hover);animation:toast-slide-down .18s ease-out;z-index:1000;max-width:90%}@keyframes toast-slide-down{0%{transform:translate(-50%) translateY(-.75rem);opacity:0}to{transform:translate(-50%) translateY(0);opacity:1}}.toast__message{color:var(--text-primary);font-size:.875rem;line-height:1.35}.toast__close{background:none;border:none;border-radius:.375rem;color:var(--text-secondary);font-size:1.25rem;cursor:pointer;padding:0;width:1.75rem;height:1.75rem;display:flex;align-items:center;justify-content:center;line-height:1;transition:color .16s ease,background-color .16s ease}.toast__close:hover{color:var(--text-primary);background:var(--surface-secondary)}.toast__close:focus-visible{outline:2px solid var(--accent-color);outline-offset:2px}.error-boundary{display:flex;align-items:center;justify-content:center;min-height:200px;padding:1.5rem;background:var(--surface-bg, #f5f5f5);border-radius:.75rem}.error-boundary__content{text-align:center;max-width:300px}.error-boundary__icon{width:48px;height:48px;margin:0 auto 1rem;background:var(--error-color, #ff3b30);color:var(--text-primary-invert, #fff);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.5rem;font-weight:700}.error-boundary__title{margin:0 0 .5rem;font-size:1.125rem;font-weight:600;color:var(--text-primary, #1a1a1a)}.error-boundary__message{margin:0 0 1rem;font-size:.875rem;color:var(--text-secondary, #666);line-height:1.4}.error-boundary__retry{padding:.5rem 1rem;background:var(--accent-color, #007aff);color:var(--text-primary-invert, #fff);border:none;border-radius:.5rem;font-size:.875rem;font-weight:500;cursor:pointer;transition:background .2s ease}.error-boundary__retry:hover{background:var(--accent-color-hover, #0056b3)}.header{padding:1.125rem 1.25rem 0;text-align:center}.header__top{display:flex;justify-content:space-between;align-items:center;gap:.5rem}.header__title-wrapper{flex:1;min-width:0;text-align:center;padding-left:2.5rem}[dir=rtl] .header__title-wrapper{padding-left:0;padding-right:2.5rem}.header__settings-btn{display:flex;align-items:center;justify-content:center;width:2.5rem;height:2.5rem;flex-shrink:0;padding:0;background:transparent;border:1px solid transparent;color:var(--text-secondary, #64748b);cursor:pointer;border-radius:.625rem;transition:background .15s ease,border-color .15s ease,color .15s ease}.header__settings-btn svg{width:1.1875rem;height:1.1875rem}.header__settings-btn:hover{background:var(--surface-bg-hover);color:var(--text-primary, #111827)}.header__settings-btn:focus-visible{outline:none;border-color:var(--accent-color);box-shadow:0 0 0 2px var(--focus-ring)}.header__settings-btn:active{background:var(--surface-tertiary)}.header__title{margin:0;font-size:1.0625rem;font-weight:600;letter-spacing:-.015em;line-height:1.3;color:var(--text-primary, #111827);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.header__status{margin:.125rem 0 0;font-size:.8125rem;font-weight:500;line-height:1.3;color:var(--text-secondary, #64748b)}.header__status--error{color:var(--error-color, #ef4444)}.header__progress{margin:.625rem auto 0;max-width:13.5rem}.header__progress-bar{width:100%;height:.25rem;background-color:var(--surface-tertiary, #e8e8e8);border-radius:.25rem;overflow:hidden}.header__progress-fill{height:100%;background-color:var(--accent-color, #03a9f4);transition:width .25s ease}.header__progress-text{margin:.25rem 0 0;font-size:.75rem;color:var(--text-tertiary, #94a3b8);font-variant-numeric:tabular-nums}.header__stats{display:flex;justify-content:center;align-items:center;gap:1rem;padding:.5rem .75rem;margin-top:.75rem;border-radius:.75rem;background:var(--surface-secondary);border:1px solid var(--border-color);font-size:.875rem;color:var(--text-primary, #111827)}.header__stat{display:flex;align-items:center;gap:.3125rem;white-space:nowrap}.header__stat-icon{display:flex;align-items:center;color:var(--accent-color)}.header__stat-icon svg{width:1.125rem;height:1.125rem}.header__stat-icon--cleaning-time,.header__stat-icon--area{display:flex}.header__stat-value{display:flex;font-weight:600;font-variant-numeric:tabular-nums;unicode-bidi:plaintext}.header__stat-value--cleaning-time{unicode-bidi:unset}.map-selector{display:flex;justify-content:center;padding:0 1.25rem}.map-selector__bar{display:inline-flex;align-items:center;gap:.375rem;max-width:100%}.map-selector__picker{position:relative;min-width:0}.map-selector__button{display:inline-flex;align-items:center;gap:.4375rem;min-height:2.25rem;padding:.375rem .75rem;background:var(--surface-secondary);border:1px solid var(--border-color);border-radius:.625rem;color:var(--text-primary);font-size:.8125rem;font-weight:500;white-space:nowrap;cursor:pointer;transition:background .15s ease,border-color .15s ease,box-shadow .15s ease}.map-selector__button:hover:not(:disabled){background:var(--surface-bg-hover);border-color:color-mix(in srgb,var(--accent-color) 45%,var(--border-color))}.map-selector__button:focus-visible{outline:none;border-color:var(--accent-color);box-shadow:0 0 0 2px var(--focus-ring)}.map-selector__button--open{background:var(--surface-bg-hover);border-color:var(--accent-color)}.map-selector__button--static{cursor:default;opacity:1}.map-selector__button--disabled{opacity:.55;cursor:not-allowed}.map-selector__sync-btn{display:inline-flex;align-items:center;justify-content:center;width:2.25rem;height:2.25rem;padding:0;flex-shrink:0;background:var(--surface-secondary);border:1px solid var(--border-color);border-radius:.625rem;color:var(--text-secondary);cursor:pointer;transition:background .15s ease,border-color .15s ease,color .15s ease}.map-selector__sync-btn:hover:not(:disabled){background:var(--surface-bg-hover);border-color:color-mix(in srgb,var(--accent-color) 45%,var(--border-color));color:var(--accent-color)}.map-selector__sync-btn:focus-visible{outline:none;border-color:var(--accent-color);box-shadow:0 0 0 2px var(--focus-ring)}.map-selector__sync-btn--syncing,.map-selector__sync-btn:disabled{color:var(--accent-color);cursor:default}.map-selector__icon{display:flex;align-items:center;color:var(--accent-color);flex-shrink:0}.map-selector__spinner{animation:map-selector-spin .85s linear infinite}.map-selector__label{max-width:11rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.map-selector__chevron{color:var(--text-secondary);flex-shrink:0;transition:transform .15s ease}.map-selector__chevron--open{transform:rotate(180deg)}.map-selector__dropdown{position:absolute;top:calc(100% + .375rem);left:50%;transform:translate(-50%);min-width:11.5rem;max-width:16rem;padding:.25rem;background:var(--surface-bg);border:1px solid var(--border-color);border-radius:.75rem;box-shadow:0 8px 24px var(--card-shadow-hover);overflow:hidden;z-index:100;animation:map-selector-dropdown-fade-in .14s ease}.map-selector__option{display:flex;align-items:center;justify-content:space-between;width:100%;padding:.5625rem .75rem;background:transparent;border:none;border-radius:.5rem;color:var(--text-primary);font-size:.875rem;text-align:start;cursor:pointer;transition:background .14s ease,color .14s ease}.map-selector__option:hover{background:var(--surface-bg-hover)}.map-selector__option:focus-visible{outline:none;box-shadow:inset 0 0 0 2px var(--focus-ring)}.map-selector__option--selected{background:var(--accent-bg-secondary);color:var(--accent-color);font-weight:600}.map-selector__option-name{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-right:.5rem}[dir=rtl] .map-selector__option-name{padding-right:0;padding-left:.5rem}.map-selector__option-check{color:var(--accent-color);flex-shrink:0}@keyframes map-selector-dropdown-fade-in{0%{opacity:0;transform:translate(-50%) translateY(-.25rem)}to{opacity:1;transform:translate(-50%) translateY(0)}}@keyframes map-selector-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.mode-tabs{display:flex;gap:.25rem;background:var(--surface-secondary);border:1px solid var(--border-color);border-radius:.75rem;padding:.25rem;margin-bottom:.75rem}.mode-tabs--disabled{opacity:.5;pointer-events:none}.mode-tabs__button{flex:1;display:flex;align-items:center;justify-content:center;min-height:2.375rem;border:1px solid transparent;border-radius:.5625rem;padding:.5rem .625rem;font-weight:500;font-size:.875rem;white-space:nowrap;cursor:pointer;transition:background-color .15s ease,color .15s ease,border-color .15s ease,box-shadow .15s ease;background-color:transparent;color:var(--text-secondary)}.mode-tabs__button-icon svg{scale:.5;color:var(--text-secondary)}.mode-tabs__button--active{background-color:var(--surface-bg);border-color:var(--border-color);color:var(--text-primary);font-weight:600;box-shadow:0 1px 3px var(--card-shadow)}.mode-tabs__button:hover:not(.mode-tabs__button--active):not(:disabled){background-color:var(--surface-bg-hover);color:var(--text-primary)}.mode-tabs__button:focus-visible{outline:none;border-color:var(--accent-color);box-shadow:0 0 0 2px var(--focus-ring)}.mode-tabs__button:disabled{cursor:not-allowed}.mode-tabs__area-select{position:relative;flex:1}.mode-tabs__area-select .mode-tabs__button{width:100%;gap:.25rem}.mode-tabs__chevron{width:.9375rem;height:.9375rem;transition:transform .15s ease}.mode-tabs__chevron--open{transform:rotate(180deg)}.mode-tabs__menu{position:absolute;inset-block-end:calc(100% + .375rem);inset-inline-end:0;z-index:20;min-width:9rem;padding:.25rem;border:1px solid var(--border-color);border-radius:.75rem;background:var(--surface-bg);box-shadow:0 8px 24px var(--card-shadow-hover)}.mode-tabs__menu-item{width:100%;padding:.5625rem .75rem;border:0;border-radius:.5rem;background:transparent;color:var(--text-primary);font:inherit;font-size:.875rem;text-align:start;white-space:nowrap;cursor:pointer;transition:background .14s ease}.mode-tabs__menu-item:hover{background:var(--surface-bg-hover)}.mode-tabs__menu-item--active{background:var(--accent-bg-secondary);color:var(--accent-color);font-weight:600}.action-buttons{display:flex;gap:.625rem;margin-top:.75rem}.action-buttons__clean,.action-buttons__dock,.action-buttons__pause,.action-buttons__resume,.action-buttons__stop{flex:1;min-height:2.75rem;background:var(--surface-secondary);border:1px solid var(--border-color);border-radius:.75rem;padding:.625rem .875rem;font-size:.9375rem;font-weight:600;white-space:nowrap;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:.4375rem;transition:background .15s ease,border-color .15s ease,transform .15s ease,box-shadow .15s ease;color:var(--text-primary)}.action-buttons__clean:hover:not(:disabled),.action-buttons__dock:hover:not(:disabled),.action-buttons__pause:hover:not(:disabled),.action-buttons__resume:hover:not(:disabled),.action-buttons__stop:hover:not(:disabled){transform:translateY(-1px)}.action-buttons__clean:active:not(:disabled),.action-buttons__dock:active:not(:disabled),.action-buttons__pause:active:not(:disabled),.action-buttons__resume:active:not(:disabled),.action-buttons__stop:active:not(:disabled){transform:translateY(0)}.action-buttons__clean:focus-visible,.action-buttons__dock:focus-visible,.action-buttons__pause:focus-visible,.action-buttons__resume:focus-visible,.action-buttons__stop:focus-visible{outline:none;box-shadow:0 0 0 2px var(--focus-ring)}.action-buttons__clean:disabled,.action-buttons__dock:disabled,.action-buttons__pause:disabled,.action-buttons__resume:disabled,.action-buttons__stop:disabled{opacity:.5;cursor:not-allowed}.action-buttons__clean--selected,.action-buttons__dock--selected,.action-buttons__pause--selected,.action-buttons__resume--selected,.action-buttons__stop--selected{border-color:var(--toggle-active-border);box-shadow:0 4px 12px var(--accent-color-shadow-color)}.action-buttons__clean{color:var(--text-primary-invert);background:var(--accent-color);border-color:var(--accent-color)}.action-buttons__clean:hover:not(:disabled){background:var(--accent-color-hover);border-color:var(--accent-color-hover)}.action-buttons__pause{background:var(--accent-bg-secondary);color:var(--accent-color);border-color:color-mix(in srgb,var(--accent-color) 40%,transparent)}.action-buttons__pause:hover:not(:disabled){background:var(--accent-bg)}.action-buttons__resume{background:color-mix(in srgb,var(--success-color, #22c55e) 12%,transparent);color:var(--success-color, #22c55e);border-color:color-mix(in srgb,var(--success-color, #22c55e) 40%,transparent)}.action-buttons__resume:hover:not(:disabled){background:color-mix(in srgb,var(--success-color, #22c55e) 20%,transparent)}.action-buttons__stop{background:color-mix(in srgb,var(--error-color, #ef4444) 10%,transparent);color:var(--error-color, #ef4444);border-color:color-mix(in srgb,var(--error-color, #ef4444) 38%,transparent)}.action-buttons__stop:hover:not(:disabled){background:color-mix(in srgb,var(--error-color, #ef4444) 18%,transparent)}.action-buttons__dock{background:var(--surface-secondary);color:var(--text-primary);border-color:var(--border-color)}.action-buttons__dock:hover:not(:disabled){background:var(--surface-bg-hover)}.cleaning-mode-button-wrapper{margin:.25rem 1.25rem 0;width:calc(100% - 2.5rem);display:flex;align-items:center;gap:.5rem}.cleaning-mode-button-wrapper__repeats,.cleaning-mode-button-wrapper__shortcuts{background:var(--surface-secondary);color:var(--accent-color);border:1px solid var(--border-color);border-radius:.75rem;width:2.75rem;height:2.75rem;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:.875rem;font-weight:600;font-variant-numeric:tabular-nums;flex-shrink:0;transition:background .15s ease,border-color .15s ease,transform .15s ease}.cleaning-mode-button-wrapper__repeats:hover:not(:disabled),.cleaning-mode-button-wrapper__shortcuts:hover:not(:disabled){background:var(--accent-bg-secondary);border-color:color-mix(in srgb,var(--accent-color) 45%,var(--border-color))}.cleaning-mode-button-wrapper__repeats:focus-visible,.cleaning-mode-button-wrapper__shortcuts:focus-visible{outline:none;border-color:var(--accent-color);box-shadow:0 0 0 2px var(--focus-ring)}.cleaning-mode-button-wrapper__repeats:active:not(:disabled),.cleaning-mode-button-wrapper__shortcuts:active:not(:disabled){transform:scale(.96)}.cleaning-mode-button-wrapper__repeats:disabled,.cleaning-mode-button-wrapper__shortcuts:disabled{opacity:.5;cursor:not-allowed}.cleaning-mode-button-wrapper__shortcuts{font-size:1rem}.cleaning-mode-button-wrapper__shortcuts svg{scale:.8}.cleaning-mode-button{flex:1;min-width:0;min-height:2.75rem;background:var(--surface-secondary);border:1px solid var(--border-color);border-radius:.75rem;padding:.5rem .875rem .5rem .5rem;color:var(--text-primary);font-weight:500;font-size:.875rem;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:.5rem;transition:background .15s ease,border-color .15s ease,transform .15s ease}.cleaning-mode-button:hover:not(:disabled){background:var(--surface-bg-hover);border-color:color-mix(in srgb,var(--accent-color) 40%,var(--border-color))}.cleaning-mode-button:focus-visible{outline:none;border-color:var(--accent-color);box-shadow:0 0 0 2px var(--focus-ring)}.cleaning-mode-button:active:not(:disabled){transform:scale(.99)}.cleaning-mode-button--disabled,.cleaning-mode-button:disabled{opacity:.5;cursor:not-allowed;pointer-events:none}.cleaning-mode-button__content{display:flex;align-items:center;min-width:0}.cleaning-mode-button__icon{scale:.7;display:flex;flex-shrink:0}.cleaning-mode-button__text{font-weight:500;font-size:.8125rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.cleaning-mode-button__arrow{font-size:1.125rem;color:var(--text-tertiary);flex-shrink:0}.vacuum-position-marker{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:10}.vacuum-position-marker__bg{fill:var(--vacuum-marker-bg, rgba(255, 255, 255, .9));stroke:var(--vacuum-marker-stroke, #4caf50);stroke-width:2;filter:drop-shadow(0 2px 4px rgba(0,0,0,.3))}.vacuum-position-marker__icon{fill:var(--vacuum-marker-color, #4caf50)}.vacuum-position-marker--cleaning .vacuum-position-marker__bg{animation:vacuum-pulse 1.5s ease-in-out infinite}.charger-marker{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:5}.charger-marker__bg{fill:var(--charger-marker-bg, rgba(255, 255, 255, .9));stroke:var(--charger-marker-stroke, #ffc107);stroke-width:2;filter:drop-shadow(0 1px 3px rgba(0,0,0,.25))}.charger-marker__icon{fill:var(--charger-marker-color, #ffc107)}@keyframes vacuum-pulse{0%{opacity:1}50%{opacity:.7}to{opacity:1}}.vacuum-map{position:relative;margin:0 1.25rem;border-radius:.875rem;overflow:hidden;background:var(--surface-secondary);border:1px solid var(--border-color);min-height:18.75rem;display:flex;align-items:center;justify-content:center;--map-max-height-fallback: none}.vacuum-map--locked .react-transform-wrapper{touch-action:pan-y}.vacuum-map__content{position:relative;display:flex;align-items:center;justify-content:center;width:100%;height:100%}.vacuum-map__image{display:block;width:100%;height:auto;max-height:var(--map-max-height, var(--map-max-height-fallback, none));object-fit:contain;border-radius:.875rem;-webkit-user-select:none;user-select:none;-webkit-user-drag:none;transition:opacity .18s ease}.vacuum-map__image--switching{opacity:.45}.vacuum-map__placeholder{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.5rem;padding:2rem 1.25rem;color:var(--text-secondary);text-align:center;font-size:.875rem}.vacuum-map__placeholder-icon{color:var(--text-tertiary)}.vacuum-map__placeholder-title{margin:0;font-weight:500;color:var(--text-primary)}.vacuum-map__placeholder small{font-size:.75rem;color:var(--text-tertiary)}.vacuum-map__switching{position:absolute;inset-inline-start:50%;top:50%;transform:translate(-50%,-50%);display:inline-flex;align-items:center;gap:.5rem;padding:.5rem .875rem;border-radius:.625rem;background:color-mix(in srgb,var(--surface-bg) 92%,transparent);border:1px solid var(--border-color);box-shadow:0 4px 16px var(--card-shadow-hover);color:var(--text-primary);font-size:.8125rem;font-weight:500;white-space:nowrap;pointer-events:none;z-index:12}.vacuum-map__switching-spinner{color:var(--accent-color);animation:vacuum-map-spin .85s linear infinite}.vacuum-map__overlay{position:absolute;inset-inline:.75rem;bottom:.75rem;background:color-mix(in srgb,var(--surface-bg) 88%,transparent);border:1px solid var(--border-color);border-radius:.625rem;padding:.375rem .75rem;width:fit-content;max-width:calc(100% - 1.5rem);margin:0 auto;display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:500;color:var(--text-secondary);text-align:center;pointer-events:none;z-index:4}.vacuum-map__zone-bar{position:absolute;inset-inline:.75rem;bottom:.75rem;background:color-mix(in srgb,var(--surface-bg) 92%,transparent);border:1px solid var(--border-color);border-radius:.625rem;padding:.375rem .625rem;width:fit-content;max-width:calc(100% - 1.5rem);margin:0 auto;display:flex;align-items:center;justify-content:center;gap:.625rem;box-shadow:0 2px 10px var(--card-shadow);z-index:12}.vacuum-map__zone-bar-hint{font-size:.75rem;font-weight:500;color:var(--text-secondary);text-align:center;line-height:1.3}.vacuum-map__zone-bar-clear{display:inline-flex;align-items:center;gap:.25rem;padding:.25rem .5rem;border-radius:.375rem;border:1px solid color-mix(in srgb,var(--error-color, #ef4444) 35%,transparent);background:color-mix(in srgb,var(--error-color, #ef4444) 10%,transparent);color:var(--error-color, #ef4444);font-size:.75rem;font-weight:600;white-space:nowrap;cursor:pointer;transition:background .15s ease,border-color .15s ease}.vacuum-map__zone-bar-clear:hover{background:color-mix(in srgb,var(--error-color, #ef4444) 18%,transparent);border-color:color-mix(in srgb,var(--error-color, #ef4444) 55%,transparent)}.vacuum-map__zone-bar-clear:focus-visible{outline:2px solid var(--error-color, #ef4444);outline-offset:2px}.vacuum-map__cycles{position:absolute;right:1rem}[dir=rtl] .vacuum-map__cycles{right:auto;left:1rem}.vacuum-map__cycles{bottom:1rem;width:2.5rem;height:2.5rem;border-radius:.375rem}.vacuum-map__zone{position:absolute;border:2px solid var(--accent-color);background:repeating-linear-gradient(45deg,color-mix(in srgb,var(--accent-color) 20%,transparent),color-mix(in srgb,var(--accent-color) 20%,transparent) .5rem,color-mix(in srgb,var(--accent-color) 6%,transparent) .5rem 1rem);pointer-events:auto;border-radius:.5rem;box-shadow:0 2px 10px var(--accent-shadow);touch-action:none;-webkit-user-select:none;user-select:none;box-sizing:border-box}.vacuum-map__zone--movable{cursor:grab}.vacuum-map__zone--active{cursor:grabbing;border-width:2.5px;box-shadow:0 4px 16px var(--accent-shadow);z-index:6}.vacuum-map__zone--draft{border-style:dashed;pointer-events:none;opacity:.9}.vacuum-map__zone--nogo{border-color:var(--error-color, #ef4444);background:repeating-linear-gradient(45deg,#ef444438,#ef444438 .5rem,#ef44440f .5rem 1rem);box-shadow:0 2px 10px #ef44444d}.vacuum-map__zone--nogo .vacuum-map__zone-handle,.vacuum-map__zone--nogo .vacuum-map__zone-corner{background:var(--error-color, #ef4444)}.vacuum-map__zone--nogo .vacuum-map__zone-badge{background:color-mix(in srgb,var(--error-color, #ef4444) 88%,#000)}.vacuum-map__zone--nomop{border-color:var(--warning-color, #f59e0b);background:repeating-linear-gradient(45deg,#f59e0b38,#f59e0b38 .5rem,#f59e0b0f .5rem 1rem);box-shadow:0 2px 10px #f59e0b4d}.vacuum-map__zone--nomop .vacuum-map__zone-handle,.vacuum-map__zone--nomop .vacuum-map__zone-corner{background:var(--warning-color, #f59e0b)}.vacuum-map__zone--nomop .vacuum-map__zone-badge{background:color-mix(in srgb,var(--warning-color, #f59e0b) 88%,#000)}.vacuum-map__zone-badge{position:absolute;top:.375rem;left:.375rem}[dir=rtl] .vacuum-map__zone-badge{left:auto;right:.375rem}.vacuum-map__zone-badge{transform-origin:top left;display:inline-flex;align-items:center;gap:.3125rem;padding:.125rem .4375rem;border-radius:.3125rem;background:color-mix(in srgb,var(--accent-color) 90%,#000);color:var(--text-primary-invert);font-size:.6875rem;font-weight:600;font-variant-numeric:tabular-nums;line-height:1.25;white-space:nowrap;pointer-events:none;box-shadow:0 1px 4px #00000040}.vacuum-map__zone-badge-index{font-weight:700}.vacuum-map__zone-badge-size{opacity:.92;font-weight:500}.vacuum-map__picture-frame{position:absolute;pointer-events:none}.vacuum-map__zone-container{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:auto;touch-action:none}.vacuum-map__zone-container--drawable{cursor:crosshair}.vacuum-map__zone-handle{position:absolute;background:var(--accent-color);border:2px solid var(--text-primary-invert);border-radius:.25rem;pointer-events:auto;box-shadow:0 1px 4px var(--handle-shadow);transition:background .15s ease;z-index:10;touch-action:none}.vacuum-map__zone-handle:before{content:"";position:absolute;inset:-.625rem}.vacuum-map__zone-handle:hover,.vacuum-map__zone-handle:active{background:var(--accent-color-hover)}.vacuum-map__zone-handle--top,.vacuum-map__zone-handle--bottom{width:2rem;height:.4375rem;left:50%;cursor:ns-resize}.vacuum-map__zone-handle--top{top:-.25rem}.vacuum-map__zone-handle--bottom{bottom:-.25rem}.vacuum-map__zone-handle--left,.vacuum-map__zone-handle--right{width:.4375rem;height:2rem;top:50%;cursor:ew-resize}.vacuum-map__zone-handle--left{left:-.25rem}[dir=rtl] .vacuum-map__zone-handle--left{left:auto;right:-.25rem}.vacuum-map__zone-handle--right{right:-.25rem}[dir=rtl] .vacuum-map__zone-handle--right{right:auto;left:-.25rem}.vacuum-map__zone-corner{position:absolute;width:.75rem;height:.75rem;border-radius:50%;background:var(--accent-color);border:2px solid var(--text-primary-invert);box-shadow:0 1px 4px var(--handle-shadow);pointer-events:auto;touch-action:none;z-index:11;transition:background .15s ease}.vacuum-map__zone-corner:before{content:"";position:absolute;inset:-.625rem}.vacuum-map__zone-corner:hover,.vacuum-map__zone-corner:active{background:var(--accent-color-hover)}.vacuum-map__zone-corner--nw{top:-.4375rem;left:-.4375rem}[dir=rtl] .vacuum-map__zone-corner--nw{left:auto;right:-.4375rem}.vacuum-map__zone-corner--nw{cursor:nwse-resize}.vacuum-map__zone-corner--sw{bottom:-.4375rem;left:-.4375rem}[dir=rtl] .vacuum-map__zone-corner--sw{left:auto;right:-.4375rem}.vacuum-map__zone-corner--sw{cursor:nesw-resize}.vacuum-map__zone-corner--se{bottom:-.4375rem;right:-.4375rem}[dir=rtl] .vacuum-map__zone-corner--se{right:auto;left:-.4375rem}.vacuum-map__zone-corner--se{cursor:nwse-resize}.vacuum-map__zone-clear{position:absolute;top:-.75rem;right:-.75rem}[dir=rtl] .vacuum-map__zone-clear{right:auto;left:-.75rem}.vacuum-map__zone-clear{width:1.5rem;height:1.5rem;border-radius:50%;background:var(--error-color, #ef4444);color:var(--text-primary-invert);border:2px solid var(--text-primary-invert);cursor:pointer;pointer-events:auto;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px var(--error-shadow);transition:background .15s ease;line-height:1;padding:0;z-index:12}.vacuum-map__zone-clear:before{content:"";position:absolute;inset:-.5rem}.vacuum-map__zone-clear:hover,.vacuum-map__zone-clear:active{background:var(--error-color-hover)}.vacuum-map__zone-clear:focus-visible{outline:2px solid var(--accent-color);outline-offset:2px}.vacuum-map__room-segments{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.vacuum-map__room-segments path{pointer-events:auto}.vacuum-map__room-segment{cursor:pointer;transition:fill .15s ease,stroke .15s ease}.vacuum-map__room-segment:hover:not(.vacuum-map__room-segment--selected){fill:#ffffff2e;stroke:#ffffffe6;stroke-width:3}.vacuum-map__room-segment--selected{fill:var(--accent-bg);stroke:var(--accent-color);stroke-width:3}.vacuum-map__room-segment--selected:hover{fill:var(--accent-bg-hover)}.vacuum-map__rooms{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.vacuum-map__room{position:absolute;transform:translate(-50%,-50%);width:2rem;height:2rem;border-radius:50%;background:var(--surface-bg);border:2px solid var(--border-color);display:flex;align-items:center;justify-content:center;font-size:.8125rem;font-weight:600;font-variant-numeric:tabular-nums;color:var(--text-primary);cursor:pointer;pointer-events:auto;transition:transform .15s ease,background .15s ease,border-color .15s ease;box-shadow:0 2px 6px var(--card-shadow);z-index:2}.vacuum-map__room:hover{transform:translate(-50%,-50%) scale(1.08);border-color:var(--accent-color)}.vacuum-map__room--selected{background:var(--accent-color);color:var(--text-primary-invert);border-color:var(--accent-color);box-shadow:0 2px 8px var(--accent-shadow)}.vacuum-map__room--selected:hover{transform:translate(-50%,-50%) scale(1.08)}.vacuum-map__saved-zones-layer{position:absolute;inset:0;pointer-events:none;z-index:9}.vacuum-map__saved-zone{position:absolute;border-radius:.375rem;pointer-events:none;display:flex;align-items:flex-start;justify-content:space-between;padding:.25rem;box-sizing:border-box}.vacuum-map__saved-zone--nogo{border:2px dashed var(--error-color, #ef4444);background:repeating-linear-gradient(45deg,#ef44442e,#ef44442e .5rem,#ef44440a .5rem 1rem)}.vacuum-map__saved-zone--nomop{border:2px dashed var(--warning-color, #f59e0b);background:repeating-linear-gradient(45deg,#f59e0b2e,#f59e0b2e .5rem,#f59e0b0a .5rem 1rem)}.vacuum-map__saved-zone--wall{height:0;padding:0;border:0;border-top:3px dashed #3b82f6;border-radius:0;background:none;transform-origin:0 50%;justify-content:center}.vacuum-map__saved-zone--wall .vacuum-map__saved-zone-badge{position:absolute;left:50%;bottom:.25rem;pointer-events:none}.vacuum-map__saved-zone--wall .vacuum-map__saved-zone-delete{position:absolute;left:50%;top:0}.vacuum-map__saved-zone-badge{font-size:.6875rem;font-weight:700;padding:.125rem .375rem;border-radius:.25rem;background:#0f172ac7;color:#fff;-webkit-user-select:none;user-select:none;line-height:1.25;white-space:nowrap}.vacuum-map__saved-zone-delete{position:relative;width:1.375rem;height:1.375rem;border-radius:50%;background:var(--error-color, #ef4444);color:#fff;border:1.5px solid #fff;cursor:pointer;pointer-events:auto;display:flex;align-items:center;justify-content:center;line-height:1;padding:0;transition:background .15s ease,opacity .15s ease;box-shadow:0 1px 4px #00000059}.vacuum-map__saved-zone-delete:before{content:"";position:absolute;inset:-.5rem}.vacuum-map__saved-zone-delete:hover{background:var(--error-color-hover, #dc2626)}.vacuum-map__saved-zone-delete:disabled{opacity:.5;cursor:wait}.vacuum-map__saved-zone-delete:focus-visible{outline:2px solid var(--accent-color);outline-offset:2px}@keyframes vacuum-map-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.room-list-view{position:absolute;inset:0;background:var(--surface-bg);border-radius:.75rem;display:flex;flex-direction:column;overflow:hidden}.room-list-view__header{padding:.75rem 3.5rem .75rem 1rem}[dir=rtl] .room-list-view__header{padding-right:0;padding-left:3.5rem}.room-list-view__header{padding-left:1rem}[dir=rtl] .room-list-view__header{padding-left:0;padding-right:1rem}.room-list-view__header{font-size:.8125rem;font-weight:500;color:var(--text-secondary);background:var(--surface-secondary);border-bottom:1px solid var(--border-color);flex-shrink:0}.room-list-view__list{flex:1;overflow-y:auto;padding:.5rem;display:flex;flex-direction:column;gap:.375rem}.room-list-view__list::-webkit-scrollbar{width:.25rem}.room-list-view__list::-webkit-scrollbar-track{background:transparent}.room-list-view__list::-webkit-scrollbar-thumb{background:var(--scrollbar-thumb);border-radius:.125rem}.room-list-view__empty{flex:1;display:flex;align-items:center;justify-content:center;color:var(--text-tertiary);font-size:.875rem}.room-list-view__item{display:flex;align-items:center;gap:.75rem;min-height:2.75rem;padding:.625rem .875rem;background:var(--surface-secondary);border:1px solid var(--border-color);border-radius:.625rem;cursor:pointer;transition:background-color .16s ease,border-color .16s ease,transform .12s ease;width:100%;text-align:left}[dir=rtl] .room-list-view__item{text-align:right}.room-list-view__item:hover{background:var(--surface-tertiary);border-color:var(--text-tertiary)}.room-list-view__item:focus-visible{outline:2px solid var(--accent-color);outline-offset:2px}.room-list-view__item:active{transform:scale(.99)}.room-list-view__item--selected,.room-list-view__item--selected:hover{background:var(--accent-bg-transparent);border-color:var(--accent-color)}.room-list-view__item-name{flex:1;font-size:.875rem;font-weight:500;color:var(--text-primary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.room-list-view__item-check{width:1.375rem;height:1.375rem;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--accent-color)}.map-controls{position:absolute;top:.625rem;right:.625rem}[dir=rtl] .map-controls{right:auto;left:.625rem}.map-controls{display:flex;flex-direction:column;gap:.3125rem;z-index:3}.map-controls__button{width:2.375rem;height:2.375rem;border-radius:.625rem;background:color-mix(in srgb,var(--surface-bg, #fff) 94%,transparent);border:1px solid var(--border-color);display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--text-primary);box-shadow:0 2px 8px var(--card-shadow);transition:background .15s ease,border-color .15s ease,color .15s ease,transform .15s ease}.map-controls__button:hover{background:var(--surface-secondary);border-color:color-mix(in srgb,var(--accent-color) 45%,var(--border-color))}.map-controls__button:focus-visible{outline:none;border-color:var(--accent-color);box-shadow:0 0 0 2px var(--focus-ring)}.map-controls__button:active{transform:scale(.95)}.map-controls__button svg{transition:transform .15s ease}.map-controls__button--lock{margin-top:.1875rem}.map-controls__button--locked{background:var(--accent-color);border-color:var(--accent-color);color:var(--text-primary-invert)}.map-controls__button--locked:hover{background:var(--accent-color-hover);border-color:var(--accent-color-hover)}.room-labels{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:8}.room-labels__bg{fill:var(--room-label-bg, rgba(15, 23, 42, .78))}.room-labels__text{fill:var(--room-label-color, #ffffff);font-weight:600;font-family:inherit}.cleaning-mode-modal{height:100%}.cleaning-mode-modal__header{margin-bottom:1.25rem}.cleaning-mode-modal__content-wrapper{height:calc(100% - 4rem);overflow-y:auto;width:100%;overflow-x:hidden}.cleaning-mode-modal__content-wrapper::-webkit-scrollbar{display:none}.cleaning-mode-modal__section{margin-bottom:1.375rem}.cleaning-mode-modal__section-title{font-size:.9375rem;color:var(--text-primary);font-weight:600;margin:0 0 .75rem}.cleaning-mode-modal__section-header{display:flex;align-items:center;gap:.375rem;margin-bottom:.75rem}.cleaning-mode-modal__help-icon{display:inline-flex;align-items:center;justify-content:center;width:1rem;height:1rem;border-radius:50%;border:1px solid var(--text-tertiary);font-size:.6875rem;color:var(--text-tertiary);font-weight:600}.cleaning-mode-modal__room-map{background:var(--surface-secondary);border:1px solid var(--border-color);border-radius:.75rem;padding:1rem;display:flex;align-items:center;justify-content:center;min-height:7.5rem}.cleaning-mode-modal__placeholder{font-size:.8125rem;color:var(--text-tertiary)}.cleaning-mode-modal__mode-grid{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}.cleaning-mode-modal__mode-grid--disabled{opacity:.5;pointer-events:none}.cleaning-mode-modal__mode-card{position:relative;border:1px solid var(--border-color);border-radius:.75rem;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;background:var(--surface-secondary);padding:1.25rem .875rem;transition:border-color .16s ease,background-color .16s ease,box-shadow .16s ease}.cleaning-mode-modal__mode-card:hover:not(.cleaning-mode-modal__mode-card--disabled){border-color:var(--text-tertiary);background:var(--surface-tertiary)}.cleaning-mode-modal__mode-card:focus-visible{outline:2px solid var(--accent-color);outline-offset:2px}.cleaning-mode-modal__mode-card--selected{border:2px solid var(--accent-color);background:var(--accent-bg-transparent);box-shadow:0 0 0 2px var(--accent-color-shadow-color)}.cleaning-mode-modal__mode-card--selected:hover:not(.cleaning-mode-modal__mode-card--disabled){border-color:var(--accent-color);background:var(--accent-bg-transparent)}.cleaning-mode-modal__mode-card--disabled{cursor:not-allowed;opacity:.5}.cleaning-mode-modal__mode-icon{border-radius:50%;margin-bottom:.625rem;display:flex;align-items:center;justify-content:center;font-size:1.625rem}[dir=rtl] .cleaning-mode-modal__mode-icon--mop-after>:nth-child(2),[dir=rtl] .cleaning-mode-modal__mode-icon--vac-mop>:nth-child(2){rotate:180deg}.cleaning-mode-modal__mode-label{font-size:.875rem;font-weight:500;color:var(--text-primary)}.cleaning-mode-modal__mode-checkmark{position:absolute;top:.625rem;right:.625rem}[dir=rtl] .cleaning-mode-modal__mode-checkmark{right:auto;left:.625rem}.cleaning-mode-modal__mode-checkmark{width:1.375rem;height:1.375rem;border-radius:50%;background:var(--accent-color);display:flex;align-items:center;justify-content:center;box-shadow:0 .125rem .25rem var(--handle-shadow);color:var(--text-primary-invert);font-size:.8125rem}.cleaning-mode-modal__horizontal-scroll{display:flex;justify-content:flex-start;overflow-x:auto;padding-bottom:.5rem;padding-top:.5rem;gap:1.5rem}.cleaning-mode-modal__horizontal-scroll::-webkit-scrollbar{height:.25rem}.cleaning-mode-modal__horizontal-scroll::-webkit-scrollbar-track{background:var(--surface-secondary);border-radius:.125rem}.cleaning-mode-modal__horizontal-scroll::-webkit-scrollbar-thumb{background:var(--scrollbar-thumb);border-radius:.125rem}.cleaning-mode-modal__horizontal-scroll::-webkit-scrollbar-thumb:hover{background:var(--border-color)}.cleaning-mode-modal__mode-option{min-width:4.375rem;display:flex;flex-direction:column;align-items:center;gap:.375rem}.cleaning-mode-modal__mode-option-label{font-size:.75rem;color:var(--text-secondary);text-align:center;line-height:1.2}.cleaning-mode-modal__power-grid{display:flex;justify-content:flex-start;gap:1.5rem;overflow-x:auto;padding:.5rem 0}.cleaning-mode-modal__power-grid--disabled{opacity:.5;pointer-events:none}.cleaning-mode-modal__power-option{min-width:4.375rem;display:flex;flex-direction:column;align-items:center;gap:.375rem}.cleaning-mode-modal__power-label{font-size:.8125rem;color:var(--text-primary);text-align:center}.cleaning-mode-modal__max-plus{background:var(--surface-secondary);border:1px solid var(--border-color);border-radius:.75rem;padding:.875rem 1rem}.cleaning-mode-modal__max-plus-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:.375rem}.cleaning-mode-modal__max-plus-title{font-size:.9375rem;color:var(--text-primary);font-weight:500}.cleaning-mode-modal__max-plus-description{font-size:.8125rem;color:var(--text-tertiary);margin:0;line-height:1.4}.cleaning-mode-modal__slider-container{position:relative;padding:0 .5rem;margin-bottom:.75rem}.cleaning-mode-modal__slider-container--disabled{opacity:.5;pointer-events:none}.cleaning-mode-modal__slider-wrapper{position:relative;padding-top:2rem}.cleaning-mode-modal__slider{width:100%;height:.375rem;border-radius:.1875rem;outline:none;-webkit-appearance:none;appearance:none;cursor:pointer}.cleaning-mode-modal__slider:focus-visible{outline:2px solid var(--accent-color);outline-offset:4px}.cleaning-mode-modal__slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:1.25rem;height:1.25rem;border-radius:50%;background:var(--accent-color);cursor:pointer;box-shadow:0 .125rem .25rem var(--handle-shadow)}.cleaning-mode-modal__slider::-moz-range-thumb{width:1.25rem;height:1.25rem;border-radius:50%;background:var(--accent-color);cursor:pointer;border:none;box-shadow:0 .125rem .25rem var(--handle-shadow)}.cleaning-mode-modal__slider-tooltip{position:absolute;top:-.5rem;transform:translate(-50%);background:var(--accent-color);color:var(--text-primary-invert);padding:.25rem .5rem;border-radius:.375rem;font-size:.8125rem;font-weight:600;font-variant-numeric:tabular-nums;white-space:nowrap;pointer-events:none;box-shadow:0 .125rem .375rem var(--handle-shadow)}[dir=rtl] .cleaning-mode-modal__slider-tooltip{transform:translate(50%)}.cleaning-mode-modal__slider-tooltip:after{content:"";position:absolute;top:100%;left:50%;transform:translate(-50%);width:0;height:0;border-left:.3125rem solid transparent;border-right:.3125rem solid transparent;border-top:.3125rem solid var(--accent-color)}.cleaning-mode-modal__slider-value{position:absolute;top:-2rem;transform:translate(-50%);background:var(--accent-color);border-radius:50%;width:2.25rem;height:2.25rem;display:flex;align-items:center;justify-content:center;font-size:.8125rem;font-weight:600;font-variant-numeric:tabular-nums;color:var(--text-primary-invert);box-shadow:0 .125rem .375rem var(--accent-color-shadow-color);pointer-events:none}.cleaning-mode-modal__slider-labels{display:flex;justify-content:space-between;padding:0 .5rem;margin-top:1.25rem}.cleaning-mode-modal__slider-label{font-size:.8125rem}.cleaning-mode-modal__slider-label--inactive{color:var(--text-tertiary)}.cleaning-mode-modal__slider-label--active{color:var(--text-primary);font-weight:500}.cleaning-mode-modal__setting{display:flex;align-items:center;justify-content:space-between;padding:.875rem 1rem;background:var(--surface-secondary);border:1px solid var(--border-color);border-radius:.75rem;margin-bottom:.75rem}.cleaning-mode-modal__setting--disabled{opacity:.5;pointer-events:none}.cleaning-mode-modal__setting--clickable{cursor:pointer;transition:background-color .16s ease,border-color .16s ease}.cleaning-mode-modal__setting--clickable:hover{background:var(--surface-tertiary)}.cleaning-mode-modal__setting--clickable:focus-visible{outline:2px solid var(--accent-color);outline-offset:2px}.cleaning-mode-modal__setting--clickable:active{background:var(--surface-tertiary)}.cleaning-mode-modal__setting-label{font-size:.9375rem;color:var(--text-primary)}.cleaning-mode-modal__setting-value{display:flex;align-items:center;gap:.5rem;font-size:.875rem;color:var(--text-secondary)}.cleaning-mode-modal__setting-arrow{font-size:1.125rem;color:var(--text-tertiary)}.cleaning-mode-modal__route-grid{display:flex;justify-content:flex-start;overflow-x:auto;padding-bottom:.5rem;padding-top:.5rem;gap:1.5rem}.cleaning-mode-modal__route-grid--disabled{opacity:.5;pointer-events:none}.cleaning-mode-modal__route-option{min-width:4.375rem;display:flex;flex-direction:column;align-items:center;gap:.375rem}.cleaning-mode-modal__route-label{font-size:.8125rem;color:var(--text-primary);text-align:center}.customize-mode{display:flex;flex-direction:column;gap:.5rem}.customize-mode__empty{display:flex;align-items:center;justify-content:center;padding:2rem;color:var(--text-secondary);font-size:.875rem}.customize-mode__empty p{margin:0}.customize-mode__room-accordions{display:flex;flex-direction:column;gap:.25rem}.customize-mode__badges{display:flex;gap:.25rem}.customize-mode__badge{display:inline-flex;align-items:center;justify-content:center;min-width:1.25rem;padding:.125rem .25rem;border-radius:.25rem;background:var(--accent-bg);font-size:.8rem;font-weight:600;color:var(--accent-color);text-transform:uppercase}.customize-mode__badge:nth-child(3){text-transform:unset}.customize-mode__room-settings-content{display:flex;flex-direction:column;gap:1rem}.customize-mode__setting-group{display:flex;flex-direction:column;gap:.5rem}.customize-mode__setting-label{font-size:.75rem;font-weight:500;color:var(--text-secondary)}.customize-mode__options{display:flex;justify-content:flex-start;overflow-x:auto;padding-bottom:.5rem;padding-top:.5rem;gap:2rem}.customize-mode__options--pills{gap:1rem}.customize-mode__option{display:flex;flex-direction:column;align-items:center;gap:2rem}.customize-mode__option-label{font-size:.8rem;color:var(--text-secondary);text-align:center}.customize-mode__pill{padding:.375rem .75rem;border:1.5px solid var(--surface-border);border-radius:1.25rem;background:var(--surface-bg);color:var(--text-secondary);font-size:1rem;font-weight:500;cursor:pointer;transition:all .15s ease;min-width:3.5rem}.customize-mode__pill:hover{border-color:var(--accent-color);background:var(--accent-bg-secondary)}.customize-mode__pill--selected{border-color:var(--accent-color);background:var(--accent-color);color:var(--text-primary-invert)}.customize-mode__pill--cycle{font-weight:600}.customize-mode__wetness-slider{display:flex;flex-direction:column;gap:.25rem}.room-selection-display{padding:.625rem .875rem;background:var(--accent-bg-transparent);border:1px solid color-mix(in srgb,var(--accent-color) 28%,transparent);border-radius:.625rem;margin-bottom:.75rem;font-size:.8125rem;line-height:1.4;color:var(--text-primary)}.room-selection-display__label{font-weight:600;margin-right:.375rem}[dir=rtl] .room-selection-display__label{margin-right:0;margin-left:.375rem}.room-selection-display__label{color:var(--accent-color)}.room-selection-display__rooms{color:var(--text-secondary)}.shortcuts-modal{display:flex;flex-direction:column;min-height:0;height:100%}.shortcuts-modal-sheet{top:auto;height:min(80vh,34rem);min-height:22rem}.shortcuts-modal-sheet .modal__content{min-height:0}.shortcuts-modal__header{display:flex;align-items:center;gap:.75rem;margin-bottom:1rem}.shortcuts-modal__title,.shortcuts-modal__count{margin:0}.shortcuts-modal__title{color:var(--text-primary);font-size:1.25rem;font-weight:650}.shortcuts-modal__count{margin-top:.125rem;color:var(--text-tertiary);font-size:.75rem}.shortcuts-modal__back,.shortcuts-modal__menu-toggle{display:grid;place-items:center;padding:0;border:0;background:transparent;color:var(--text-secondary);cursor:pointer}.shortcuts-modal__back:hover:not(:disabled),.shortcuts-modal__menu-toggle:hover:not(:disabled){color:var(--text-primary);background:var(--surface-bg-hover)}.shortcuts-modal__back:disabled,.shortcuts-modal__menu-toggle:disabled{cursor:not-allowed;opacity:.45}.shortcuts-modal__back svg,.shortcuts-modal__menu-toggle svg{width:1.125rem;height:1.125rem}.shortcuts-modal__back{width:2rem;height:2rem;border-radius:50%}[dir=rtl] .shortcuts-modal__back svg{transform:rotate(180deg)}.shortcuts-modal__empty{display:grid;place-items:center;min-height:12rem;padding:2rem 1.5rem;text-align:center;color:var(--text-secondary)}.shortcuts-modal__empty p{margin:0;color:var(--text-primary)}.shortcuts-modal__empty-hint{max-width:24rem;font-size:.8125rem;color:var(--text-tertiary)}.shortcuts-modal__grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(10rem,1fr));gap:.75rem;min-height:0;padding:.125rem;overflow-y:auto}.shortcuts-modal__card{position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:.75rem;min-width:0;padding:1rem;border:.0625rem solid var(--border-color);border-radius:.75rem;background:var(--surface-secondary);transition:border-color .2s ease,transform .2s ease,box-shadow .2s ease}.shortcuts-modal__card:hover{border-color:var(--accent-color);transform:translateY(-.0625rem);box-shadow:0 .25rem .75rem var(--card-shadow)}.shortcuts-modal__card-icon{display:grid;place-items:center;width:2.5rem;height:2.5rem;border-radius:.75rem;background:var(--accent-bg);color:var(--accent-color)}.shortcuts-modal__card-icon svg{width:1.25rem;height:1.25rem;fill:currentcolor}.shortcuts-modal__card-name{min-height:2.5em;margin:0;overflow-wrap:anywhere;color:var(--text-primary);font-size:.9375rem;font-weight:600;line-height:1.25}.shortcuts-modal__start{display:flex;align-items:center;justify-content:center;gap:.375rem;width:100%;margin-top:auto;padding:.5rem .75rem;border:0;border-radius:.625rem;background:var(--accent-color);color:var(--text-primary-invert);font:inherit;font-size:.8125rem;font-weight:600;cursor:pointer}.shortcuts-modal__start:hover:not(:disabled){background:var(--accent-color-hover)}.shortcuts-modal__start:disabled{cursor:not-allowed;opacity:.5}.shortcuts-modal__start svg{width:.875rem;height:.875rem;fill:currentcolor}.shortcuts-modal__menu-wrapper{position:absolute;inset-block-start:.625rem;inset-inline-end:.625rem}.shortcuts-modal__menu-toggle{width:1.875rem;height:1.875rem;border-radius:50%}.shortcuts-modal__menu{position:absolute;inset-block-start:calc(100% + .25rem);inset-inline-end:0;z-index:2;min-width:8.5rem;padding:.25rem;border:.0625rem solid var(--border-color);border-radius:.625rem;background:var(--surface-bg);box-shadow:0 .375rem 1rem var(--card-shadow-hover)}.shortcuts-modal__menu button{display:flex;align-items:center;gap:.5rem;width:100%;padding:.5rem .625rem;border:0;border-radius:.375rem;background:transparent;color:var(--text-primary);font:inherit;font-size:.8125rem;text-align:start;cursor:pointer}.shortcuts-modal__menu button:hover{background:var(--surface-bg-hover)}.shortcuts-modal__menu button svg{width:.875rem;height:.875rem}.shortcuts-modal__menu .shortcuts-modal__menu-delete{color:var(--error-color)}.shortcuts-modal__form,.shortcuts-modal__confirmation{max-width:28rem;margin:auto;padding:1.25rem 0}.shortcuts-modal__form label{display:block;margin-bottom:.5rem;color:var(--text-secondary);font-size:.8125rem;font-weight:500}.shortcuts-modal__form input{box-sizing:border-box;width:100%;padding:.7rem .75rem;border:.0625rem solid var(--border-color);border-radius:.625rem;outline:none;background:var(--surface-secondary);color:var(--text-primary);font:inherit}.shortcuts-modal__form input:focus{border-color:var(--accent-color);box-shadow:0 0 0 .1875rem var(--accent-bg)}.shortcuts-modal__confirmation{text-align:center}.shortcuts-modal__confirmation p{color:var(--text-primary);line-height:1.45}.shortcuts-modal__confirmation-icon{display:grid;place-items:center;width:3rem;height:3rem;margin:0 auto;border-radius:50%;background:color-mix(in srgb,var(--error-color) 15%,transparent);color:var(--error-color)}.shortcuts-modal__form-actions{display:flex;justify-content:flex-end;gap:.5rem;margin-top:1.25rem}.shortcuts-modal__form-actions button{padding:.575rem .875rem;border:0;border-radius:.625rem;background:var(--surface-secondary);color:var(--text-primary);font:inherit;font-size:.8125rem;font-weight:600;cursor:pointer}.shortcuts-modal__form-actions button:disabled{cursor:not-allowed;opacity:.5}.shortcuts-modal__form-actions .shortcuts-modal__primary{background:var(--accent-color);color:var(--text-primary-invert)}.shortcuts-modal__form-actions .shortcuts-modal__danger{background:var(--error-color);color:var(--text-primary-invert)}.shortcuts-modal__error,.shortcuts-modal__disabled{margin:.75rem 0 0;font-size:.75rem;text-align:center}.shortcuts-modal__error{color:var(--error-color)}.shortcuts-modal__disabled{color:var(--text-tertiary)}.dock-popup-modal{top:auto;height:fit-content}.dock-popup-modal .modal__content{height:auto}.dock-popup__title{margin:0 0 1rem;color:var(--text-primary);font-size:1.0625rem;font-weight:600;letter-spacing:-.015em}.dock-popup__status-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.875rem}.dock-popup__status{display:flex;align-items:flex-start;gap:.625rem;min-width:0}.dock-popup__status-dot{width:.5625rem;height:.5625rem;margin-top:.25rem;border-radius:50%;flex:0 0 auto;background:var(--text-tertiary)}.dock-popup__status-dot--good{background:var(--success-color, #43a047)}.dock-popup__status-dot--warning{background:var(--warning-color, #ffa600)}.dock-popup__status-dot--bad{background:var(--error-color, #db4437)}.dock-popup__status-label,.dock-popup__status-value{display:block}.dock-popup__status-label{color:var(--text-primary);font-size:.8125rem;font-weight:500}.dock-popup__status-value{margin-top:.125rem;color:var(--text-secondary);font-size:.75rem;text-transform:capitalize}.dock-popup__status-value--good{color:var(--success-color, #43a047)}.dock-popup__status-value--warning{color:var(--warning-color, #ffa600)}.dock-popup__status-value--bad{color:var(--error-color, #db4437)}.dock-popup__divider{height:1px;margin:1.125rem 0;background:var(--border-color)}.dock-popup__tasks{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.625rem}.dock-popup__task{display:flex;align-items:center;justify-content:center;flex-direction:column;gap:.5rem;min-width:0;min-height:4.75rem;padding:.75rem .5rem;border:1px solid var(--border-color);border-radius:.75rem;background:var(--surface-secondary);color:var(--text-primary);font:inherit;font-size:.75rem;font-weight:500;cursor:pointer;transition:background-color .16s ease,border-color .16s ease,transform .12s ease}.dock-popup__task:hover:not(:disabled){background:var(--surface-tertiary);border-color:var(--text-tertiary)}.dock-popup__task:focus-visible{outline:2px solid var(--accent-color);outline-offset:2px}.dock-popup__task:active:not(:disabled){transform:scale(.98)}.dock-popup__task:disabled{cursor:not-allowed;opacity:.5}.dock-popup__task-icon{width:1.625rem;height:1.625rem;stroke-width:1.75}.entity-item{display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid var(--divider-color, rgba(0, 0, 0, .1));gap:16px}.entity-item:last-child{border-bottom:none}.entity-item--child{padding-left:16px;opacity:.9}.entity-item__info{display:flex;flex-direction:column;flex:1;min-width:0}.entity-item__label{font-size:14px;font-weight:500;color:var(--text-primary, #000)}.entity-item__description{font-size:12px;color:var(--text-secondary, #666);margin-top:2px}.entity-item--select{flex-direction:column;align-items:stretch;gap:8px}.entity-item--select .entity-item__info{flex:none}.entity-item--segmented{flex-direction:column;align-items:stretch;gap:8px}.entity-item--segmented .entity-item__info{flex:none}.entity-item--slider{flex-direction:column;align-items:stretch;gap:8px}.entity-item--slider .entity-item__info{flex:none}.entity-item__select{padding:8px 12px;border-radius:8px;border:1px solid var(--divider-color, rgba(0, 0, 0, .2));background:var(--surface-bg, #fff);color:var(--text-primary, #000);font-size:14px;cursor:pointer;min-width:120px}.entity-item__select:disabled{opacity:.5;cursor:not-allowed}.entity-item__button{padding:8px 16px;border-radius:8px;border:none;background:var(--accent-color, #007aff);color:var(--text-primary-invert);font-size:14px;font-weight:500;cursor:pointer;transition:opacity .2s ease}.entity-item__button:hover:not(:disabled){opacity:.9}.entity-item__button:active:not(:disabled){opacity:.8}.entity-item__button:disabled{opacity:.5;cursor:not-allowed}.entity-item__button--armed{background:var(--error-color, #db4437)}.entity-item__slider-container{display:flex;align-items:center;gap:12px}.entity-item__slider{flex:1;height:6px;border-radius:3px;appearance:none;background:var(--divider-color, rgba(0, 0, 0, .2));cursor:pointer}.entity-item__slider::-webkit-slider-thumb{appearance:none;width:18px;height:18px;border-radius:50%;background:var(--accent-color, #007aff);cursor:pointer}.entity-item__slider::-moz-range-thumb{width:18px;height:18px;border-radius:50%;background:var(--accent-color, #007aff);border:none;cursor:pointer}.entity-item__slider:disabled{opacity:.5;cursor:not-allowed}.entity-item__slider:disabled::-webkit-slider-thumb{cursor:not-allowed}.entity-item__slider:disabled::-moz-range-thumb{cursor:not-allowed}.entity-item__slider-value{font-size:14px;font-weight:500;color:var(--text-primary, #000);min-width:40px;text-align:right}.entity-item__slider--volume .entity-item__slider::-webkit-slider-thumb,.entity-item__slider--brightness .entity-item__slider::-webkit-slider-thumb{background:var(--accent-color, #007aff)}.entity-item__time-input{padding:8px 12px;border-radius:8px;border:1px solid var(--divider-color, rgba(0, 0, 0, .2));background:var(--surface-bg, #fff);color:var(--text-primary, #000);font-size:14px;font-family:inherit;cursor:pointer;min-width:100px}.entity-item__time-input:disabled{opacity:.5;cursor:not-allowed}.entity-item__time-input::-webkit-calendar-picker-indicator{cursor:pointer;filter:var(--time-picker-filter, none)}.ai-detection-section{display:flex;flex-direction:column;gap:.75rem}.ai-detection-section__item{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.5rem 0}.ai-detection-section__item--slider{flex-direction:column;align-items:stretch;gap:.5rem}.ai-detection-section__info{display:flex;flex-direction:column;gap:.125rem;flex:1;min-width:0}.ai-detection-section__label{font-size:.875rem;font-weight:500;color:var(--text-primary, #333)}.ai-detection-section__description{font-size:.75rem;color:var(--text-secondary, #666);line-height:1.3}.ai-detection-section__slider-container{display:flex;align-items:center;gap:.75rem}.ai-detection-section__slider{flex:1;height:4px;appearance:none;background:var(--surface-secondary, #e0e0e0);border-radius:2px;cursor:pointer}.ai-detection-section__slider::-webkit-slider-thumb{appearance:none;width:16px;height:16px;background:var(--accent-color, #007aff);border-radius:50%;cursor:pointer}.ai-detection-section__slider:disabled{opacity:.5;cursor:not-allowed}.ai-detection-section__slider-value{font-size:.75rem;font-weight:500;color:var(--text-primary, #333);min-width:36px;text-align:right}.carpet-settings-section{display:flex;flex-direction:column;gap:.75rem}.carpet-settings-section__mode-selector{display:flex;flex-direction:column;gap:.75rem;padding-bottom:.5rem;border-bottom:1px solid var(--border-color, #e0e0e0);margin-bottom:.25rem}.carpet-settings-section__sub-options{display:flex;flex-direction:column;gap:.5rem;padding-left:.25rem}.carpet-settings-section__sub-label{font-size:.75rem;color:var(--text-secondary, #666);font-weight:500}.carpet-settings-section__sub-buttons{display:flex;gap:.5rem}.carpet-settings-section__sub-button{flex:1;padding:.5rem .75rem;font-size:.8125rem;font-weight:500;border:1px solid var(--border-color, #e0e0e0);border-radius:.5rem;background:var(--surface-secondary, #f5f5f5);color:var(--text-primary, #333);cursor:pointer;transition:all .2s ease}.carpet-settings-section__sub-button:hover:not(.carpet-settings-section__sub-button--active){background:var(--surface-tertiary, #eee)}.carpet-settings-section__sub-button--active{background:var(--accent-color, #007aff);border-color:var(--accent-color, #007aff);color:var(--text-primary-invert)}.carpet-settings-section__sub-button:disabled{opacity:.5;cursor:not-allowed}.carpet-settings-section__item{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.5rem 0}.carpet-settings-section__item--select{flex-direction:column;align-items:stretch;gap:.5rem}.carpet-settings-section__info{display:flex;flex-direction:column;gap:.125rem;flex:1;min-width:0}.carpet-settings-section__label{font-size:.875rem;font-weight:500;color:var(--text-primary, #333)}.carpet-settings-section__description{font-size:.75rem;color:var(--text-secondary, #666);line-height:1.3}.carpet-settings-section__select{width:100%;padding:.625rem .75rem;font-size:.875rem;color:var(--text-primary, #333);background:var(--surface-secondary, #f5f5f5);border:1px solid var(--border-color, #e0e0e0);border-radius:8px;cursor:pointer;outline:none;transition:border-color .2s ease}.carpet-settings-section__select:focus{border-color:var(--accent-color, #007aff)}.carpet-settings-section__select:hover{background:var(--surface-tertiary, #eee)}.carpet-settings-section__select:disabled{opacity:.5;cursor:not-allowed}.consumables-section{display:flex;flex-direction:column;gap:1rem}.consumables-section__item{display:flex;flex-direction:column;gap:.375rem}.consumables-section__info{display:flex;justify-content:space-between;align-items:center}.consumables-section__label{font-size:.875rem;font-weight:500;color:var(--text-primary, #000)}.consumables-section__stats{font-size:.75rem;color:var(--text-secondary, #666)}.consumables-section__progress{height:.375rem;background:var(--progress-bg, rgba(0, 0, 0, .1));border-radius:.1875rem;overflow:hidden}.consumables-section__progress-bar{height:100%;border-radius:.1875rem;transition:width .3s ease}.consumables-section__reset{align-self:flex-end;padding:.25rem .75rem;font-size:.75rem;font-weight:500;color:var(--accent-color, #007aff);background:none;border:1px solid var(--accent-color, #007aff);border-radius:.375rem;cursor:pointer;transition:all .2s ease}.consumables-section__reset:hover{background:var(--accent-color, #007aff);color:var(--text-primary-invert)}.consumables-section__reset:active{opacity:.8}.consumables-section__reset--armed,.consumables-section__reset--armed:hover{color:var(--text-primary-invert);background:var(--error-color, #db4437);border-color:var(--error-color, #db4437)}.device-info-section{display:flex;flex-direction:column;gap:.75rem}.device-info-section__item{display:flex;justify-content:space-between;align-items:center;padding:.25rem 0;border-bottom:1px solid var(--divider-color, rgba(0, 0, 0, .06))}.device-info-section__item:last-child{border-bottom:none}.device-info-section__label{font-size:.875rem;color:var(--text-secondary, #666)}.device-info-section__value{font-size:.875rem;font-weight:500;color:var(--text-primary, #000);unicode-bidi:plaintext}.quick-settings-section{display:flex;flex-direction:column;gap:.75rem}.quick-settings-section__item{display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:.5rem 0}.quick-settings-section__item--child{margin-left:1rem;padding-left:.75rem;border-left:2px solid var(--accent-color, #007aff)}.quick-settings-section__info{display:flex;flex-direction:column;gap:.125rem;flex:1;min-width:0}.quick-settings-section__label{font-size:.875rem;font-weight:500;color:var(--text-primary, #333)}.quick-settings-section__description{font-size:.75rem;color:var(--text-secondary, #666);line-height:1.3}.quick-settings-section__actions{display:flex;flex-direction:column;gap:.5rem;margin-top:.5rem;padding-top:.75rem;border-top:1px solid var(--border-color, #e0e0e0)}.quick-settings-section__actions-label{font-size:.75rem;font-weight:500;color:var(--text-secondary, #666);text-transform:uppercase;letter-spacing:.5px}.quick-settings-section__actions-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(80px,1fr));gap:.5rem}.quick-settings-section__action-button{display:flex;flex-direction:column;align-items:center;gap:.375rem;padding:.75rem .5rem;background:var(--surface-secondary, #f5f5f5);border:1px solid var(--border-color, #e0e0e0);border-radius:.5rem;cursor:pointer;transition:all .2s ease}.quick-settings-section__action-button:hover{background:var(--surface-tertiary, #eee);border-color:var(--accent-color, #007aff)}.quick-settings-section__action-button:active{transform:scale(.98)}.quick-settings-section__action-icon{display:flex;align-items:center;justify-content:center;color:var(--accent-color, #007aff)}.quick-settings-section__action-label{font-size:.75rem;font-weight:500;color:var(--text-primary, #333);text-align:center;line-height:1.2}.volume-section{display:flex;flex-direction:column;gap:.75rem}.volume-section__row{display:flex;flex-direction:row;gap:1rem}.volume-section__item{display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:.5rem 0}.volume-section__item--select{flex-direction:column;align-items:stretch;gap:.5rem}.volume-section__info{display:flex;flex-direction:column;gap:.125rem;flex:1;min-width:0}.volume-section__label{font-size:.875rem;font-weight:500;color:var(--text-primary, #333)}.volume-section__description{font-size:.75rem;color:var(--text-secondary, #666);line-height:1.3}.volume-section__select{width:100%;padding:.5rem 2.5rem .5rem .75rem;font-size:.875rem;font-weight:500;color:var(--text-primary, #333);background:var(--surface-secondary, #f5f5f5);border:1px solid var(--border-color, #e0e0e0);border-radius:.5rem;cursor:pointer;appearance:none;background-image:url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");background-repeat:no-repeat;background-position:right .75rem center;background-size:1rem}.volume-section__select:hover{border-color:var(--accent-color, #007aff)}.volume-section__select:focus{outline:none;border-color:var(--accent-color, #007aff);box-shadow:0 0 0 2px #007aff33}.volume-section__select:disabled{opacity:.5;cursor:not-allowed}.volume-section__control{display:flex;align-items:center;gap:.75rem;flex:1}.volume-section__icon{display:flex;align-items:center;justify-content:center;color:var(--text-secondary, #666);flex-shrink:0}.volume-section__slider-container{flex:1;padding-top:1.5rem;margin-top:1rem}.volume-section__slider-wrapper{position:relative;width:100%}.volume-section__slider{-webkit-appearance:none;appearance:none;width:100%;height:6px;border-radius:3px;outline:none;cursor:pointer}.volume-section__slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:20px;height:20px;border-radius:50%;background:var(--accent-color, #007aff);cursor:pointer;box-shadow:0 2px 4px #0003;transition:transform .1s ease}.volume-section__slider::-webkit-slider-thumb:hover{transform:scale(1.1)}.volume-section__slider::-moz-range-thumb{width:20px;height:20px;border-radius:50%;background:var(--accent-color, #007aff);cursor:pointer;border:none;box-shadow:0 2px 4px #0003;transition:transform .1s ease}.volume-section__slider::-moz-range-thumb:hover{transform:scale(1.1)}.volume-section__tooltip{position:absolute;top:-1.75rem;transform:translate(-50%);background:var(--accent-color, #007aff);color:var(--text-primary-invert);padding:.25rem .5rem;border-radius:4px;font-size:.75rem;font-weight:500;white-space:nowrap;pointer-events:none}[dir=rtl] .volume-section__tooltip{transform:translate(50%)}.volume-section__tooltip:after{content:"";position:absolute;top:100%;left:50%;transform:translate(-50%);border:4px solid transparent;border-top-color:var(--accent-color, #007aff)}.volume-section__test-button{display:flex;align-items:center;justify-content:center;gap:.5rem;padding:.625rem 1rem;background:var(--surface-secondary, #f5f5f5);border:1px solid var(--border-color, #e0e0e0);border-radius:8px;color:var(--text-primary, #333);font-size:.875rem;font-weight:500;cursor:pointer;transition:all .2s ease}.volume-section__test-button:hover{background:var(--surface-tertiary, #eee)}.volume-section__test-button:active{transform:scale(.98)}.volume-section__test-button svg{color:var(--accent-color, #007aff)}.floor-settings-section{display:flex;flex-direction:column;gap:.75rem}.floor-settings-section__item{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.5rem 0}.floor-settings-section__item--select{flex-direction:column;align-items:stretch;gap:.5rem}.floor-settings-section__info{display:flex;flex-direction:column;gap:.125rem;flex:1;min-width:0}.floor-settings-section__label{font-size:.875rem;font-weight:500;color:var(--text-primary, #333)}.floor-settings-section__description{font-size:.75rem;color:var(--text-secondary, #666);line-height:1.3}.floor-settings-section__select{width:100%;padding:.625rem .75rem;font-size:.875rem;color:var(--text-primary, #333);background:var(--surface-secondary, #f5f5f5);border:1px solid var(--border-color, #e0e0e0);border-radius:8px;cursor:pointer;outline:none;transition:border-color .2s ease}.floor-settings-section__select:focus{border-color:var(--accent-color, #007aff)}.floor-settings-section__select:hover{background:var(--surface-tertiary, #eee)}.floor-settings-section__select:disabled{opacity:.5;cursor:not-allowed}.edge-corner-section{display:flex;flex-direction:column;gap:.75rem}.edge-corner-section__sub-settings{display:flex;flex-direction:column;gap:.5rem;margin-top:-.25rem}.edge-corner-section__item{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.5rem 0}.edge-corner-section__item--indented{padding-left:1rem;border-left:2px solid var(--border-color, #e0e0e0);margin-left:.5rem}.edge-corner-section__item--select{flex-direction:column;align-items:stretch;gap:.5rem}.edge-corner-section__info{display:flex;flex-direction:column;gap:.125rem;flex:1;min-width:0}.edge-corner-section__label{font-size:.875rem;font-weight:500;color:var(--text-primary, #333)}.edge-corner-section__description{font-size:.75rem;color:var(--text-secondary, #666);line-height:1.3}.edge-corner-section__select{width:100%;padding:.625rem .75rem;font-size:.875rem;color:var(--text-primary, #333);background:var(--surface-secondary, #f5f5f5);border:1px solid var(--border-color, #e0e0e0);border-radius:8px;cursor:pointer;outline:none;transition:border-color .2s ease}.edge-corner-section__select:focus{border-color:var(--accent-color, #007aff)}.edge-corner-section__select:hover{background:var(--surface-tertiary, #eee)}.edge-corner-section__select:disabled{opacity:.5;cursor:not-allowed}.dock-settings-section{display:flex;flex-direction:column;gap:.75rem}.dock-settings-section__item{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.5rem 0}.dock-settings-section__item--select,.dock-settings-section__item--segmented{flex-direction:column;align-items:stretch;gap:.5rem}.dock-settings-section__info{display:flex;flex-direction:column;gap:.125rem;flex:1;min-width:0}.dock-settings-section__label{font-size:.875rem;font-weight:500;color:var(--text-primary, #333)}.dock-settings-section__description{font-size:.75rem;color:var(--text-secondary, #666);line-height:1.3}.dock-settings-section__select{width:100%;padding:.625rem .75rem;font-size:.875rem;color:var(--text-primary, #333);background:var(--surface-secondary, #f5f5f5);border:1px solid var(--border-color, #e0e0e0);border-radius:8px;cursor:pointer;outline:none;transition:border-color .2s ease}.dock-settings-section__select:focus{border-color:var(--accent-color, #007aff)}.dock-settings-section__select:hover{background:var(--surface-tertiary, #eee)}.dock-settings-section__select:disabled{opacity:.5;cursor:not-allowed}.dock-settings-section__button{padding:.5rem 1rem;font-size:.8125rem;font-weight:500;border:1px solid var(--accent-color, #007aff);border-radius:.5rem;background:var(--accent-color, #007aff);color:var(--text-primary-invert);cursor:pointer;transition:all .2s ease;white-space:nowrap}.dock-settings-section__button:hover:not(:disabled){background:var(--accent-color-hover, #0056b3)}.dock-settings-section__button:disabled{opacity:.5;cursor:not-allowed}.map-settings-section{display:flex;flex-direction:column;gap:.75rem}.map-settings-section__item{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.5rem 0}.map-settings-section__item--select{flex-direction:column;align-items:stretch;gap:.5rem}.map-settings-section__info{display:flex;flex-direction:column;gap:.125rem;flex:1;min-width:0}.map-settings-section__label{font-size:.875rem;font-weight:500;color:var(--text-primary, #333)}.map-settings-section__description{font-size:.75rem;color:var(--text-secondary, #666);line-height:1.3}.map-settings-section__select{width:100%;padding:.625rem .75rem;font-size:.875rem;color:var(--text-primary, #333);background:var(--surface-secondary, #f5f5f5);border:1px solid var(--border-color, #e0e0e0);border-radius:8px;cursor:pointer;outline:none;transition:border-color .2s ease}.map-settings-section__select:focus{border-color:var(--accent-color, #007aff)}.map-settings-section__select:hover{background:var(--surface-tertiary, #eee)}.map-settings-section__select:disabled{opacity:.5;cursor:not-allowed}.map-settings-section__actions{display:flex;flex-direction:column;gap:.5rem;margin-top:.5rem;padding-top:.75rem;border-top:1px solid var(--border-color, #e0e0e0)}.map-settings-section__actions-label{font-size:.75rem;font-weight:500;color:var(--text-secondary, #666);text-transform:uppercase;letter-spacing:.5px}.map-settings-section__actions-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:.5rem}.map-settings-section__action-button{display:flex;flex-direction:column;align-items:center;gap:.375rem;padding:.75rem .5rem;background:var(--surface-secondary, #f5f5f5);border:1px solid var(--border-color, #e0e0e0);border-radius:.5rem;cursor:pointer;transition:all .2s ease}.map-settings-section__action-button:hover{background:var(--surface-tertiary, #eee);border-color:var(--accent-color, #007aff)}.map-settings-section__action-button:active{transform:scale(.98)}.map-settings-section__action-button:disabled{opacity:.5;cursor:not-allowed}.map-settings-section__action-icon{display:flex;align-items:center;justify-content:center;color:var(--accent-color, #007aff)}.map-settings-section__action-label{font-size:.75rem;font-weight:500;color:var(--text-primary, #333);text-align:center;line-height:1.2}.settings-panel{height:100%}.settings-panel__title{font-size:1.125rem;font-weight:600;letter-spacing:-.015em;margin:0 0 1rem;text-align:center;color:var(--text-primary)}.settings-panel__scroll-wrapper{height:90%;overflow-y:auto}.settings-panel__sections{display:flex;flex-direction:column;gap:.25rem;padding-right:.25rem}[dir=rtl] .settings-panel__sections{padding-right:0;padding-left:.25rem}.settings-panel__sections::-webkit-scrollbar{width:4px}.settings-panel__sections::-webkit-scrollbar-track{background:transparent}.settings-panel__sections::-webkit-scrollbar-thumb{background:var(--scrollbar-thumb);border-radius:2px}.dreame-vacuum-card{--card-bg: var(--ha-card-background, var(--card-background-color, #fff));--surface-bg: var(--card-background-color, #fff);--surface-elevated: color-mix(in srgb, var(--card-background-color, #fff) 96%, var(--primary-text-color, #000));--surface-secondary: var(--secondary-background-color, #f4f5f7);--surface-tertiary: color-mix(in srgb, var(--primary-text-color, #000) 6%, var(--card-background-color, #fff));--surface-bg-hover: color-mix(in srgb, var(--primary-text-color, #000) 7%, transparent);--text-primary: var(--primary-text-color, #111827);--text-primary-invert: var(--text-primary-color, #fff);--text-secondary: var(--secondary-text-color, #64748b);--text-tertiary: var(--disabled-text-color, #94a3b8);--accent-color: var(--primary-color, #03a9f4);--accent-color-hover: color-mix(in srgb, var(--accent-color) 86%, var(--primary-text-color, #000));--accent-bg: color-mix(in srgb, var(--accent-color) 16%, transparent);--accent-bg-hover: color-mix(in srgb, var(--accent-color) 26%, transparent);--accent-bg-secondary: color-mix(in srgb, var(--accent-color) 10%, transparent);--accent-bg-secondary-hover: color-mix(in srgb, var(--accent-color) 18%, transparent);--accent-bg-transparent: color-mix(in srgb, var(--accent-color) 16%, transparent);--accent-shadow: color-mix(in srgb, var(--accent-color) 32%, transparent);--accent-color-shadow-color: color-mix(in srgb, var(--accent-color) 22%, transparent);--warning-shadow: color-mix(in srgb, var(--warning-color, #f59e0b) 35%, transparent);--error-color-hover: color-mix(in srgb, var(--error-color, #ef4444) 85%, var(--primary-text-color, #000));--error-shadow: color-mix(in srgb, var(--error-color, #ef4444) 35%, transparent);--border-color: color-mix(in srgb, var(--divider-color, #cbd5e1) 75%, transparent);--focus-ring: color-mix(in srgb, var(--accent-color) 45%, transparent);--overlay-bg: transparent;--card-shadow: rgba(0, 0, 0, .09);--card-shadow-hover: rgba(0, 0, 0, .15);--handle-shadow: rgba(0, 0, 0, .2);--handle-bg: color-mix(in srgb, var(--primary-text-color, #000) 15%, transparent);--backdrop-bg: rgba(0, 0, 0, .5);--toggle-active: color-mix(in srgb, var(--accent-color) 22%, transparent);--toggle-active-border: var(--accent-color);--toggle-active-shadow-color: var(--accent-color-shadow-color);position:relative;container-name:dreame-card;container-type:inline-size;background:var(--card-bg);color:var(--text-primary);border:var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--border-color));border-radius:var(--ha-card-border-radius, 1rem);overflow:hidden;box-shadow:var(--ha-card-box-shadow, 0 1px 2px rgba(0, 0, 0, .04));font-family:inherit;-webkit-font-smoothing:antialiased}.dreame-vacuum-card__error{padding:1.5rem 1.25rem;color:var(--error-color, #ef4444);text-align:center;font-size:.875rem;font-weight:500}.dreame-vacuum-card__diagnostic{margin:0 1.25rem;padding:.5rem .75rem;border-radius:.625rem;background:var(--surface-secondary);border:1px solid var(--border-color);color:var(--text-secondary);font-size:.8125rem;line-height:1.35;text-align:center}.dreame-vacuum-card__container{display:flex;flex-direction:column;gap:.875rem}.dreame-vacuum-card__header,.dreame-vacuum-card__footer{display:flex;flex-direction:column;gap:.75rem;min-width:0}.dreame-vacuum-card__map{min-width:0}.dreame-vacuum-card__controls{padding:0 1.25rem 1.25rem}@container dreame-card (min-width: 48rem){.dreame-vacuum-card__container{--wide-max-height: calc(100dvh - var(--header-height, 56px) - 1rem);display:grid;grid-template-columns:minmax(19rem,26rem) minmax(0,1fr);grid-template-rows:auto minmax(0,1fr);grid-template-areas:"header map" "footer map";align-items:stretch;max-height:var(--wide-max-height)}.dreame-vacuum-card__header{grid-area:header;align-self:start}.dreame-vacuum-card__footer{grid-area:footer;justify-content:safe flex-end;min-height:0;overflow-y:auto}.dreame-vacuum-card__map{display:flex;grid-area:map;padding-block:1.25rem;padding-inline-end:1.25rem}.dreame-vacuum-card__map .vacuum-map{flex:1;margin:0}.dreame-vacuum-card__map .vacuum-map__image{max-height:min(var(--map-max-height, 100dvh),var(--wide-max-height) - 2.5rem)}}`;
hS();
const Fo = "botslab-vacuum-map-card", _N = [
  { name: "entity", required: !0, selector: { entity: { domain: "vacuum" } } },
  { name: "map_entity", selector: { entity: { domain: "camera" } } },
  { name: "title", selector: { text: {} } },
  {
    name: "default_mode",
    selector: {
      select: {
        mode: "dropdown",
        options: [
          { value: "all", label: "All" },
          { value: "room", label: "Rooms" },
          { value: "zone", label: "Zone" }
        ]
      }
    }
  },
  {
    name: "default_room_view",
    selector: {
      select: {
        mode: "dropdown",
        options: [
          { value: "map", label: "Map" },
          { value: "list", label: "List" }
        ]
      }
    }
  },
  {
    name: "map_overlays",
    selector: {
      select: {
        multiple: !0,
        options: [
          { value: "vacuum", label: "Vacuum position" },
          { value: "charger", label: "Charger" },
          { value: "room_labels", label: "Room labels" }
        ]
      }
    }
  },
  { name: "room_label_scale", selector: { number: { min: 0.1, max: 3, step: 0.1, mode: "box" } } },
  { name: "map_height", selector: { text: {} } },
  { name: "language", selector: { text: {} } }
], pN = {
  entity: "Vacuum",
  map_entity: "Map camera (found automatically when empty)",
  title: "Title",
  default_mode: "Default cleaning mode",
  default_room_view: "Default room view",
  map_overlays: "Map overlays",
  room_label_scale: "Room label scale",
  map_height: "Map height (CSS length or pixels)",
  language: "Language (auto follows Home Assistant)"
};
class gN extends HTMLElement {
  _root = null;
  _unmountTimer;
  _hass;
  _config;
  constructor() {
    super(), this.attachShadow({ mode: "open" });
    const i = document.createElement("style");
    i.textContent = fN, this.shadowRoot.appendChild(i);
  }
  setConfig(i) {
    const o = XE(i);
    if (!o.valid)
      throw new Error(`Invalid configuration: ${o.errors.join("; ")}`);
    o.warnings.length > 0 && _e.warn("Configuration warnings:", o.warnings), this._config = i, this.render();
  }
  set hass(i) {
    this._hass = i, this.render();
  }
  connectedCallback() {
    window.clearTimeout(this._unmountTimer), this.render();
  }
  disconnectedCallback() {
    this._unmountTimer = window.setTimeout(() => {
      this._root?.unmount(), this._root = null;
    });
  }
  render() {
    if (!this._hass || !this._config || !this.shadowRoot || !this.isConnected) return;
    let i = this.shadowRoot.querySelector("#react-root");
    i || (i = document.createElement("div"), i.id = "react-root", this.shadowRoot.appendChild(i)), this._root || (this._root = Ub.createRoot(i)), this._root.render(
      /* @__PURE__ */ _.jsx(Qo.StrictMode, { children: /* @__PURE__ */ _.jsx(vz, { children: /* @__PURE__ */ _.jsx(mN, { hass: this._hass, config: this._config }, this._config.entity) }) })
    );
  }
  getCardSize() {
    return 4;
  }
  static getStubConfig(i) {
    const o = Object.keys(i?.states ?? {}).find((l) => l.startsWith("vacuum."));
    return {
      type: `custom:${Fo}`,
      entity: o ?? "vacuum.botslab_vacuum",
      title: "Botslab Vacuum"
    };
  }
  static getConfigForm() {
    return {
      schema: _N,
      computeLabel: (i) => pN[i.name]
    };
  }
}
customElements.get(Fo) || customElements.define(Fo, gN);
window.customCards = window.customCards || [];
window.customCards.some((n) => n.type === Fo) || window.customCards.push({
  type: Fo,
  name: "Botslab Vacuum Map Card",
  description: "Interactive map card for Botslab & 360 robot vacuums with room and zone cleaning"
});
_e.info("Botslab Vacuum Map Card (React) loaded");
export {
  gN as default
};

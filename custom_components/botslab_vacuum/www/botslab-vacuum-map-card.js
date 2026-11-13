function Ag(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var du = { exports: {} }, Yo = {};
var bp;
function yb() {
  if (bp) return Yo;
  bp = 1;
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
  return Yo.Fragment = i, Yo.jsx = o, Yo.jsxs = o, Yo;
}
var Sp;
function bb() {
  return Sp || (Sp = 1, du.exports = yb()), du.exports;
}
var g = bb(), mu = { exports: {} }, he = {};
var kp;
function Sb() {
  if (kp) return he;
  kp = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), i = /* @__PURE__ */ Symbol.for("react.portal"), o = /* @__PURE__ */ Symbol.for("react.fragment"), l = /* @__PURE__ */ Symbol.for("react.strict_mode"), s = /* @__PURE__ */ Symbol.for("react.profiler"), d = /* @__PURE__ */ Symbol.for("react.consumer"), m = /* @__PURE__ */ Symbol.for("react.context"), f = /* @__PURE__ */ Symbol.for("react.forward_ref"), p = /* @__PURE__ */ Symbol.for("react.suspense"), _ = /* @__PURE__ */ Symbol.for("react.memo"), v = /* @__PURE__ */ Symbol.for("react.lazy"), y = /* @__PURE__ */ Symbol.for("react.activity"), S = Symbol.iterator;
  function k(T) {
    return T === null || typeof T != "object" ? null : (T = S && T[S] || T["@@iterator"], typeof T == "function" ? T : null);
  }
  var E = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, z = Object.assign, R = {};
  function D(T, Z, P) {
    this.props = T, this.context = Z, this.refs = R, this.updater = P || E;
  }
  D.prototype.isReactComponent = {}, D.prototype.setState = function(T, Z) {
    if (typeof T != "object" && typeof T != "function" && T != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, T, Z, "setState");
  }, D.prototype.forceUpdate = function(T) {
    this.updater.enqueueForceUpdate(this, T, "forceUpdate");
  };
  function Y() {
  }
  Y.prototype = D.prototype;
  function L(T, Z, P) {
    this.props = T, this.context = Z, this.refs = R, this.updater = P || E;
  }
  var H = L.prototype = new Y();
  H.constructor = L, z(H, D.prototype), H.isPureReactComponent = !0;
  var X = Array.isArray;
  function ie() {
  }
  var $ = { H: null, A: null, T: null, S: null }, V = Object.prototype.hasOwnProperty;
  function F(T, Z, P) {
    var te = P.ref;
    return {
      $$typeof: n,
      type: T,
      key: Z,
      ref: te !== void 0 ? te : null,
      props: P
    };
  }
  function W(T, Z) {
    return F(T.type, Z, T.props);
  }
  function ae(T) {
    return typeof T == "object" && T !== null && T.$$typeof === n;
  }
  function ce(T) {
    var Z = { "=": "=0", ":": "=2" };
    return "$" + T.replace(/[=:]/g, function(P) {
      return Z[P];
    });
  }
  var Q = /\/+/g;
  function ee(T, Z) {
    return typeof T == "object" && T !== null && T.key != null ? ce("" + T.key) : Z.toString(36);
  }
  function J(T) {
    switch (T.status) {
      case "fulfilled":
        return T.value;
      case "rejected":
        throw T.reason;
      default:
        switch (typeof T.status == "string" ? T.then(ie, ie) : (T.status = "pending", T.then(
          function(Z) {
            T.status === "pending" && (T.status = "fulfilled", T.value = Z);
          },
          function(Z) {
            T.status === "pending" && (T.status = "rejected", T.reason = Z);
          }
        )), T.status) {
          case "fulfilled":
            return T.value;
          case "rejected":
            throw T.reason;
        }
    }
    throw T;
  }
  function A(T, Z, P, te, me) {
    var fe = typeof T;
    (fe === "undefined" || fe === "boolean") && (T = null);
    var ye = !1;
    if (T === null) ye = !0;
    else
      switch (fe) {
        case "bigint":
        case "string":
        case "number":
          ye = !0;
          break;
        case "object":
          switch (T.$$typeof) {
            case n:
            case i:
              ye = !0;
              break;
            case v:
              return ye = T._init, A(
                ye(T._payload),
                Z,
                P,
                te,
                me
              );
          }
      }
    if (ye)
      return me = me(T), ye = te === "" ? "." + ee(T, 0) : te, X(me) ? (P = "", ye != null && (P = ye.replace(Q, "$&/") + "/"), A(me, Z, P, "", function(vt) {
        return vt;
      })) : me != null && (ae(me) && (me = W(
        me,
        P + (me.key == null || T && T.key === me.key ? "" : ("" + me.key).replace(
          Q,
          "$&/"
        ) + "/") + ye
      )), Z.push(me)), 1;
    ye = 0;
    var Ge = te === "" ? "." : te + ":";
    if (X(T))
      for (var Ne = 0; Ne < T.length; Ne++)
        te = T[Ne], fe = Ge + ee(te, Ne), ye += A(
          te,
          Z,
          P,
          fe,
          me
        );
    else if (Ne = k(T), typeof Ne == "function")
      for (T = Ne.call(T), Ne = 0; !(te = T.next()).done; )
        te = te.value, fe = Ge + ee(te, Ne++), ye += A(
          te,
          Z,
          P,
          fe,
          me
        );
    else if (fe === "object") {
      if (typeof T.then == "function")
        return A(
          J(T),
          Z,
          P,
          te,
          me
        );
      throw Z = String(T), Error(
        "Objects are not valid as a React child (found: " + (Z === "[object Object]" ? "object with keys {" + Object.keys(T).join(", ") + "}" : Z) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ye;
  }
  function I(T, Z, P) {
    if (T == null) return T;
    var te = [], me = 0;
    return A(T, te, "", "", function(fe) {
      return Z.call(P, fe, me++);
    }), te;
  }
  function ne(T) {
    if (T._status === -1) {
      var Z = T._result;
      Z = Z(), Z.then(
        function(P) {
          (T._status === 0 || T._status === -1) && (T._status = 1, T._result = P);
        },
        function(P) {
          (T._status === 0 || T._status === -1) && (T._status = 2, T._result = P);
        }
      ), T._status === -1 && (T._status = 0, T._result = Z);
    }
    if (T._status === 1) return T._result.default;
    throw T._result;
  }
  var ve = typeof reportError == "function" ? reportError : function(T) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var Z = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof T == "object" && T !== null && typeof T.message == "string" ? String(T.message) : String(T),
        error: T
      });
      if (!window.dispatchEvent(Z)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", T);
      return;
    }
    console.error(T);
  }, ge = {
    map: I,
    forEach: function(T, Z, P) {
      I(
        T,
        function() {
          Z.apply(this, arguments);
        },
        P
      );
    },
    count: function(T) {
      var Z = 0;
      return I(T, function() {
        Z++;
      }), Z;
    },
    toArray: function(T) {
      return I(T, function(Z) {
        return Z;
      }) || [];
    },
    only: function(T) {
      if (!ae(T))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return T;
    }
  };
  return he.Activity = y, he.Children = ge, he.Component = D, he.Fragment = o, he.Profiler = s, he.PureComponent = L, he.StrictMode = l, he.Suspense = p, he.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = $, he.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(T) {
      return $.H.useMemoCache(T);
    }
  }, he.cache = function(T) {
    return function() {
      return T.apply(null, arguments);
    };
  }, he.cacheSignal = function() {
    return null;
  }, he.cloneElement = function(T, Z, P) {
    if (T == null)
      throw Error(
        "The argument must be a React element, but you passed " + T + "."
      );
    var te = z({}, T.props), me = T.key;
    if (Z != null)
      for (fe in Z.key !== void 0 && (me = "" + Z.key), Z)
        !V.call(Z, fe) || fe === "key" || fe === "__self" || fe === "__source" || fe === "ref" && Z.ref === void 0 || (te[fe] = Z[fe]);
    var fe = arguments.length - 2;
    if (fe === 1) te.children = P;
    else if (1 < fe) {
      for (var ye = Array(fe), Ge = 0; Ge < fe; Ge++)
        ye[Ge] = arguments[Ge + 2];
      te.children = ye;
    }
    return F(T.type, me, te);
  }, he.createContext = function(T) {
    return T = {
      $$typeof: m,
      _currentValue: T,
      _currentValue2: T,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, T.Provider = T, T.Consumer = {
      $$typeof: d,
      _context: T
    }, T;
  }, he.createElement = function(T, Z, P) {
    var te, me = {}, fe = null;
    if (Z != null)
      for (te in Z.key !== void 0 && (fe = "" + Z.key), Z)
        V.call(Z, te) && te !== "key" && te !== "__self" && te !== "__source" && (me[te] = Z[te]);
    var ye = arguments.length - 2;
    if (ye === 1) me.children = P;
    else if (1 < ye) {
      for (var Ge = Array(ye), Ne = 0; Ne < ye; Ne++)
        Ge[Ne] = arguments[Ne + 2];
      me.children = Ge;
    }
    if (T && T.defaultProps)
      for (te in ye = T.defaultProps, ye)
        me[te] === void 0 && (me[te] = ye[te]);
    return F(T, fe, me);
  }, he.createRef = function() {
    return { current: null };
  }, he.forwardRef = function(T) {
    return { $$typeof: f, render: T };
  }, he.isValidElement = ae, he.lazy = function(T) {
    return {
      $$typeof: v,
      _payload: { _status: -1, _result: T },
      _init: ne
    };
  }, he.memo = function(T, Z) {
    return {
      $$typeof: _,
      type: T,
      compare: Z === void 0 ? null : Z
    };
  }, he.startTransition = function(T) {
    var Z = $.T, P = {};
    $.T = P;
    try {
      var te = T(), me = $.S;
      me !== null && me(P, te), typeof te == "object" && te !== null && typeof te.then == "function" && te.then(ie, ve);
    } catch (fe) {
      ve(fe);
    } finally {
      Z !== null && P.types !== null && (Z.types = P.types), $.T = Z;
    }
  }, he.unstable_useCacheRefresh = function() {
    return $.H.useCacheRefresh();
  }, he.use = function(T) {
    return $.H.use(T);
  }, he.useActionState = function(T, Z, P) {
    return $.H.useActionState(T, Z, P);
  }, he.useCallback = function(T, Z) {
    return $.H.useCallback(T, Z);
  }, he.useContext = function(T) {
    return $.H.useContext(T);
  }, he.useDebugValue = function() {
  }, he.useDeferredValue = function(T, Z) {
    return $.H.useDeferredValue(T, Z);
  }, he.useEffect = function(T, Z) {
    return $.H.useEffect(T, Z);
  }, he.useEffectEvent = function(T) {
    return $.H.useEffectEvent(T);
  }, he.useId = function() {
    return $.H.useId();
  }, he.useImperativeHandle = function(T, Z, P) {
    return $.H.useImperativeHandle(T, Z, P);
  }, he.useInsertionEffect = function(T, Z) {
    return $.H.useInsertionEffect(T, Z);
  }, he.useLayoutEffect = function(T, Z) {
    return $.H.useLayoutEffect(T, Z);
  }, he.useMemo = function(T, Z) {
    return $.H.useMemo(T, Z);
  }, he.useOptimistic = function(T, Z) {
    return $.H.useOptimistic(T, Z);
  }, he.useReducer = function(T, Z, P) {
    return $.H.useReducer(T, Z, P);
  }, he.useRef = function(T) {
    return $.H.useRef(T);
  }, he.useState = function(T) {
    return $.H.useState(T);
  }, he.useSyncExternalStore = function(T, Z, P) {
    return $.H.useSyncExternalStore(
      T,
      Z,
      P
    );
  }, he.useTransition = function() {
    return $.H.useTransition();
  }, he.version = "19.2.3", he;
}
var Ep;
function Gu() {
  return Ep || (Ep = 1, mu.exports = Sb()), mu.exports;
}
var C = Gu();
const Po = /* @__PURE__ */ Ag(C);
var fu = { exports: {} }, Ho = {}, _u = { exports: {} }, pu = {};
var wp;
function kb() {
  return wp || (wp = 1, (function(n) {
    function i(A, I) {
      var ne = A.length;
      A.push(I);
      e: for (; 0 < ne; ) {
        var ve = ne - 1 >>> 1, ge = A[ve];
        if (0 < s(ge, I))
          A[ve] = I, A[ne] = ge, ne = ve;
        else break e;
      }
    }
    function o(A) {
      return A.length === 0 ? null : A[0];
    }
    function l(A) {
      if (A.length === 0) return null;
      var I = A[0], ne = A.pop();
      if (ne !== I) {
        A[0] = ne;
        e: for (var ve = 0, ge = A.length, T = ge >>> 1; ve < T; ) {
          var Z = 2 * (ve + 1) - 1, P = A[Z], te = Z + 1, me = A[te];
          if (0 > s(P, ne))
            te < ge && 0 > s(me, P) ? (A[ve] = me, A[te] = ne, ve = te) : (A[ve] = P, A[Z] = ne, ve = Z);
          else if (te < ge && 0 > s(me, ne))
            A[ve] = me, A[te] = ne, ve = te;
          else break e;
        }
      }
      return I;
    }
    function s(A, I) {
      var ne = A.sortIndex - I.sortIndex;
      return ne !== 0 ? ne : A.id - I.id;
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
    var p = [], _ = [], v = 1, y = null, S = 3, k = !1, E = !1, z = !1, R = !1, D = typeof setTimeout == "function" ? setTimeout : null, Y = typeof clearTimeout == "function" ? clearTimeout : null, L = typeof setImmediate < "u" ? setImmediate : null;
    function H(A) {
      for (var I = o(_); I !== null; ) {
        if (I.callback === null) l(_);
        else if (I.startTime <= A)
          l(_), I.sortIndex = I.expirationTime, i(p, I);
        else break;
        I = o(_);
      }
    }
    function X(A) {
      if (z = !1, H(A), !E)
        if (o(p) !== null)
          E = !0, ie || (ie = !0, ce());
        else {
          var I = o(_);
          I !== null && J(X, I.startTime - A);
        }
    }
    var ie = !1, $ = -1, V = 5, F = -1;
    function W() {
      return R ? !0 : !(n.unstable_now() - F < V);
    }
    function ae() {
      if (R = !1, ie) {
        var A = n.unstable_now();
        F = A;
        var I = !0;
        try {
          e: {
            E = !1, z && (z = !1, Y($), $ = -1), k = !0;
            var ne = S;
            try {
              t: {
                for (H(A), y = o(p); y !== null && !(y.expirationTime > A && W()); ) {
                  var ve = y.callback;
                  if (typeof ve == "function") {
                    y.callback = null, S = y.priorityLevel;
                    var ge = ve(
                      y.expirationTime <= A
                    );
                    if (A = n.unstable_now(), typeof ge == "function") {
                      y.callback = ge, H(A), I = !0;
                      break t;
                    }
                    y === o(p) && l(p), H(A);
                  } else l(p);
                  y = o(p);
                }
                if (y !== null) I = !0;
                else {
                  var T = o(_);
                  T !== null && J(
                    X,
                    T.startTime - A
                  ), I = !1;
                }
              }
              break e;
            } finally {
              y = null, S = ne, k = !1;
            }
            I = void 0;
          }
        } finally {
          I ? ce() : ie = !1;
        }
      }
    }
    var ce;
    if (typeof L == "function")
      ce = function() {
        L(ae);
      };
    else if (typeof MessageChannel < "u") {
      var Q = new MessageChannel(), ee = Q.port2;
      Q.port1.onmessage = ae, ce = function() {
        ee.postMessage(null);
      };
    } else
      ce = function() {
        D(ae, 0);
      };
    function J(A, I) {
      $ = D(function() {
        A(n.unstable_now());
      }, I);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(A) {
      A.callback = null;
    }, n.unstable_forceFrameRate = function(A) {
      0 > A || 125 < A ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : V = 0 < A ? Math.floor(1e3 / A) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, n.unstable_next = function(A) {
      switch (S) {
        case 1:
        case 2:
        case 3:
          var I = 3;
          break;
        default:
          I = S;
      }
      var ne = S;
      S = I;
      try {
        return A();
      } finally {
        S = ne;
      }
    }, n.unstable_requestPaint = function() {
      R = !0;
    }, n.unstable_runWithPriority = function(A, I) {
      switch (A) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          A = 3;
      }
      var ne = S;
      S = A;
      try {
        return I();
      } finally {
        S = ne;
      }
    }, n.unstable_scheduleCallback = function(A, I, ne) {
      var ve = n.unstable_now();
      switch (typeof ne == "object" && ne !== null ? (ne = ne.delay, ne = typeof ne == "number" && 0 < ne ? ve + ne : ve) : ne = ve, A) {
        case 1:
          var ge = -1;
          break;
        case 2:
          ge = 250;
          break;
        case 5:
          ge = 1073741823;
          break;
        case 4:
          ge = 1e4;
          break;
        default:
          ge = 5e3;
      }
      return ge = ne + ge, A = {
        id: v++,
        callback: I,
        priorityLevel: A,
        startTime: ne,
        expirationTime: ge,
        sortIndex: -1
      }, ne > ve ? (A.sortIndex = ne, i(_, A), o(p) === null && A === o(_) && (z ? (Y($), $ = -1) : z = !0, J(X, ne - ve))) : (A.sortIndex = ge, i(p, A), E || k || (E = !0, ie || (ie = !0, ce()))), A;
    }, n.unstable_shouldYield = W, n.unstable_wrapCallback = function(A) {
      var I = S;
      return function() {
        var ne = S;
        S = I;
        try {
          return A.apply(this, arguments);
        } finally {
          S = ne;
        }
      };
    };
  })(pu)), pu;
}
var Tp;
function Eb() {
  return Tp || (Tp = 1, _u.exports = kb()), _u.exports;
}
var gu = { exports: {} }, bt = {};
var xp;
function wb() {
  if (xp) return bt;
  xp = 1;
  var n = Gu();
  function i(p) {
    var _ = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      _ += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var v = 2; v < arguments.length; v++)
        _ += "&args[]=" + encodeURIComponent(arguments[v]);
    }
    return "Minified React error #" + p + "; visit " + _ + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  function d(p, _, v) {
    var y = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: s,
      key: y == null ? null : "" + y,
      children: p,
      containerInfo: _,
      implementation: v
    };
  }
  var m = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function f(p, _) {
    if (p === "font") return "";
    if (typeof _ == "string")
      return _ === "use-credentials" ? _ : "";
  }
  return bt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, bt.createPortal = function(p, _) {
    var v = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!_ || _.nodeType !== 1 && _.nodeType !== 9 && _.nodeType !== 11)
      throw Error(i(299));
    return d(p, _, null, v);
  }, bt.flushSync = function(p) {
    var _ = m.T, v = l.p;
    try {
      if (m.T = null, l.p = 2, p) return p();
    } finally {
      m.T = _, l.p = v, l.d.f();
    }
  }, bt.preconnect = function(p, _) {
    typeof p == "string" && (_ ? (_ = _.crossOrigin, _ = typeof _ == "string" ? _ === "use-credentials" ? _ : "" : void 0) : _ = null, l.d.C(p, _));
  }, bt.prefetchDNS = function(p) {
    typeof p == "string" && l.d.D(p);
  }, bt.preinit = function(p, _) {
    if (typeof p == "string" && _ && typeof _.as == "string") {
      var v = _.as, y = f(v, _.crossOrigin), S = typeof _.integrity == "string" ? _.integrity : void 0, k = typeof _.fetchPriority == "string" ? _.fetchPriority : void 0;
      v === "style" ? l.d.S(
        p,
        typeof _.precedence == "string" ? _.precedence : void 0,
        {
          crossOrigin: y,
          integrity: S,
          fetchPriority: k
        }
      ) : v === "script" && l.d.X(p, {
        crossOrigin: y,
        integrity: S,
        fetchPriority: k,
        nonce: typeof _.nonce == "string" ? _.nonce : void 0
      });
    }
  }, bt.preinitModule = function(p, _) {
    if (typeof p == "string")
      if (typeof _ == "object" && _ !== null) {
        if (_.as == null || _.as === "script") {
          var v = f(
            _.as,
            _.crossOrigin
          );
          l.d.M(p, {
            crossOrigin: v,
            integrity: typeof _.integrity == "string" ? _.integrity : void 0,
            nonce: typeof _.nonce == "string" ? _.nonce : void 0
          });
        }
      } else _ == null && l.d.M(p);
  }, bt.preload = function(p, _) {
    if (typeof p == "string" && typeof _ == "object" && _ !== null && typeof _.as == "string") {
      var v = _.as, y = f(v, _.crossOrigin);
      l.d.L(p, v, {
        crossOrigin: y,
        integrity: typeof _.integrity == "string" ? _.integrity : void 0,
        nonce: typeof _.nonce == "string" ? _.nonce : void 0,
        type: typeof _.type == "string" ? _.type : void 0,
        fetchPriority: typeof _.fetchPriority == "string" ? _.fetchPriority : void 0,
        referrerPolicy: typeof _.referrerPolicy == "string" ? _.referrerPolicy : void 0,
        imageSrcSet: typeof _.imageSrcSet == "string" ? _.imageSrcSet : void 0,
        imageSizes: typeof _.imageSizes == "string" ? _.imageSizes : void 0,
        media: typeof _.media == "string" ? _.media : void 0
      });
    }
  }, bt.preloadModule = function(p, _) {
    if (typeof p == "string")
      if (_) {
        var v = f(_.as, _.crossOrigin);
        l.d.m(p, {
          as: typeof _.as == "string" && _.as !== "script" ? _.as : void 0,
          crossOrigin: v,
          integrity: typeof _.integrity == "string" ? _.integrity : void 0
        });
      } else l.d.m(p);
  }, bt.requestFormReset = function(p) {
    l.d.r(p);
  }, bt.unstable_batchedUpdates = function(p, _) {
    return p(_);
  }, bt.useFormState = function(p, _, v) {
    return m.H.useFormState(p, _, v);
  }, bt.useFormStatus = function() {
    return m.H.useHostTransitionStatus();
  }, bt.version = "19.2.3", bt;
}
var zp;
function Tb() {
  if (zp) return gu.exports;
  zp = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (i) {
        console.error(i);
      }
  }
  return n(), gu.exports = wb(), gu.exports;
}
var Ap;
function xb() {
  if (Ap) return Ho;
  Ap = 1;
  var n = Eb(), i = Gu(), o = Tb();
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
  function _(e) {
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
  var y = Object.assign, S = /* @__PURE__ */ Symbol.for("react.element"), k = /* @__PURE__ */ Symbol.for("react.transitional.element"), E = /* @__PURE__ */ Symbol.for("react.portal"), z = /* @__PURE__ */ Symbol.for("react.fragment"), R = /* @__PURE__ */ Symbol.for("react.strict_mode"), D = /* @__PURE__ */ Symbol.for("react.profiler"), Y = /* @__PURE__ */ Symbol.for("react.consumer"), L = /* @__PURE__ */ Symbol.for("react.context"), H = /* @__PURE__ */ Symbol.for("react.forward_ref"), X = /* @__PURE__ */ Symbol.for("react.suspense"), ie = /* @__PURE__ */ Symbol.for("react.suspense_list"), $ = /* @__PURE__ */ Symbol.for("react.memo"), V = /* @__PURE__ */ Symbol.for("react.lazy"), F = /* @__PURE__ */ Symbol.for("react.activity"), W = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), ae = Symbol.iterator;
  function ce(e) {
    return e === null || typeof e != "object" ? null : (e = ae && e[ae] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Q = /* @__PURE__ */ Symbol.for("react.client.reference");
  function ee(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Q ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case z:
        return "Fragment";
      case D:
        return "Profiler";
      case R:
        return "StrictMode";
      case X:
        return "Suspense";
      case ie:
        return "SuspenseList";
      case F:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case E:
          return "Portal";
        case L:
          return e.displayName || "Context";
        case Y:
          return (e._context.displayName || "Context") + ".Consumer";
        case H:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case $:
          return t = e.displayName || null, t !== null ? t : ee(e.type) || "Memo";
        case V:
          t = e._payload, e = e._init;
          try {
            return ee(e(t));
          } catch {
          }
      }
    return null;
  }
  var J = Array.isArray, A = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, I = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ne = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ve = [], ge = -1;
  function T(e) {
    return { current: e };
  }
  function Z(e) {
    0 > ge || (e.current = ve[ge], ve[ge] = null, ge--);
  }
  function P(e, t) {
    ge++, ve[ge] = e.current, e.current = t;
  }
  var te = T(null), me = T(null), fe = T(null), ye = T(null);
  function Ge(e, t) {
    switch (P(fe, t), P(me, e), P(te, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? K_(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = K_(t), e = q_(t, e);
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
    Z(te), P(te, e);
  }
  function Ne() {
    Z(te), Z(me), Z(fe);
  }
  function vt(e) {
    e.memoizedState !== null && P(ye, e);
    var t = te.current, a = q_(t, e.type);
    t !== a && (P(me, e), P(te, a));
  }
  function jt(e) {
    me.current === e && (Z(te), Z(me)), ye.current === e && (Z(ye), Do._currentValue = ne);
  }
  var Xt, dn;
  function ut(e) {
    if (Xt === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        Xt = t && t[1] || "", dn = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Xt + e + dn;
  }
  var Ke = !1;
  function lt(e, t) {
    if (!e || Ke) return "";
    Ke = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var r = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var q = function() {
                throw Error();
              };
              if (Object.defineProperty(q.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(q, []);
                } catch (U) {
                  var j = U;
                }
                Reflect.construct(e, [], q);
              } else {
                try {
                  q.call();
                } catch (U) {
                  j = U;
                }
                e.call(q.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (U) {
                j = U;
              }
              (q = e()) && typeof q.catch == "function" && q.catch(function() {
              });
            }
          } catch (U) {
            if (U && j && typeof U.stack == "string")
              return [U.stack, j.stack];
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
        var w = h.split(`
`), M = b.split(`
`);
        for (c = r = 0; r < w.length && !w[r].includes("DetermineComponentFrameRoot"); )
          r++;
        for (; c < M.length && !M[c].includes(
          "DetermineComponentFrameRoot"
        ); )
          c++;
        if (r === w.length || c === M.length)
          for (r = w.length - 1, c = M.length - 1; 1 <= r && 0 <= c && w[r] !== M[c]; )
            c--;
        for (; 1 <= r && 0 <= c; r--, c--)
          if (w[r] !== M[c]) {
            if (r !== 1 || c !== 1)
              do
                if (r--, c--, 0 > c || w[r] !== M[c]) {
                  var B = `
` + w[r].replace(" at new ", " at ");
                  return e.displayName && B.includes("<anonymous>") && (B = B.replace("<anonymous>", e.displayName)), B;
                }
              while (1 <= r && 0 <= c);
            break;
          }
      }
    } finally {
      Ke = !1, Error.prepareStackTrace = a;
    }
    return (a = e ? e.displayName || e.name : "") ? ut(a) : "";
  }
  function Il(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return ut(e.type);
      case 16:
        return ut("Lazy");
      case 13:
        return e.child !== t && t !== null ? ut("Suspense Fallback") : ut("Suspense");
      case 19:
        return ut("SuspenseList");
      case 0:
      case 15:
        return lt(e.type, !1);
      case 11:
        return lt(e.type.render, !1);
      case 1:
        return lt(e.type, !0);
      case 31:
        return ut("Activity");
      default:
        return "";
    }
  }
  function er(e) {
    try {
      var t = "", a = null;
      do
        t += Il(e, a), a = e, e = e.return;
      while (e);
      return t;
    } catch (r) {
      return `
Error generating stack: ` + r.message + `
` + r.stack;
    }
  }
  var Gi = Object.prototype.hasOwnProperty, Ki = n.unstable_scheduleCallback, qi = n.unstable_cancelCallback, Fl = n.unstable_shouldYield, Ql = n.unstable_requestPaint, St = n.unstable_now, Jl = n.unstable_getCurrentPriorityLevel, Vi = n.unstable_ImmediatePriority, tr = n.unstable_UserBlockingPriority, xa = n.unstable_NormalPriority, $t = n.unstable_LowPriority, xt = n.unstable_IdlePriority, yt = n.log, nr = n.unstable_setDisableYieldValue, mn = null, Lt = null;
  function $n(e) {
    if (typeof yt == "function" && nr(e), Lt && typeof Lt.setStrictMode == "function")
      try {
        Lt.setStrictMode(mn, e);
      } catch {
      }
  }
  var Ut = Math.clz32 ? Math.clz32 : ov, av = Math.log, iv = Math.LN2;
  function ov(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (av(e) / iv | 0) | 0;
  }
  var ar = 256, ir = 262144, or = 4194304;
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
  function rr(e, t, a) {
    var r = e.pendingLanes;
    if (r === 0) return 0;
    var c = 0, u = e.suspendedLanes, h = e.pingedLanes;
    e = e.warmLanes;
    var b = r & 134217727;
    return b !== 0 ? (r = b & ~u, r !== 0 ? c = za(r) : (h &= b, h !== 0 ? c = za(h) : a || (a = b & ~e, a !== 0 && (c = za(a))))) : (b = r & ~u, b !== 0 ? c = za(b) : h !== 0 ? c = za(h) : a || (a = r & ~e, a !== 0 && (c = za(a)))), c === 0 ? 0 : t !== 0 && t !== c && (t & u) === 0 && (u = c & -c, a = t & -t, u >= a || u === 32 && (a & 4194048) !== 0) ? t : c;
  }
  function Xi(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function rv(e, t) {
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
  function Ed() {
    var e = or;
    return or <<= 1, (or & 62914560) === 0 && (or = 4194304), e;
  }
  function Wl(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function $i(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function lv(e, t, a, r, c, u) {
    var h = e.pendingLanes;
    e.pendingLanes = a, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= a, e.entangledLanes &= a, e.errorRecoveryDisabledLanes &= a, e.shellSuspendCounter = 0;
    var b = e.entanglements, w = e.expirationTimes, M = e.hiddenUpdates;
    for (a = h & ~a; 0 < a; ) {
      var B = 31 - Ut(a), q = 1 << B;
      b[B] = 0, w[B] = -1;
      var j = M[B];
      if (j !== null)
        for (M[B] = null, B = 0; B < j.length; B++) {
          var U = j[B];
          U !== null && (U.lane &= -536870913);
        }
      a &= ~q;
    }
    r !== 0 && wd(e, r, 0), u !== 0 && c === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(h & ~t));
  }
  function wd(e, t, a) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var r = 31 - Ut(t);
    e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | a & 261930;
  }
  function Td(e, t) {
    var a = e.entangledLanes |= t;
    for (e = e.entanglements; a; ) {
      var r = 31 - Ut(a), c = 1 << r;
      c & t | e[r] & t && (e[r] |= t), a &= ~c;
    }
  }
  function xd(e, t) {
    var a = t & -t;
    return a = (a & 42) !== 0 ? 1 : es(a), (a & (e.suspendedLanes | t)) !== 0 ? 0 : a;
  }
  function es(e) {
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
  function ts(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function zd() {
    var e = I.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : fp(e.type));
  }
  function Ad(e, t) {
    var a = I.p;
    try {
      return I.p = e, t();
    } finally {
      I.p = a;
    }
  }
  var Pn = Math.random().toString(36).slice(2), ft = "__reactFiber$" + Pn, zt = "__reactProps$" + Pn, Qa = "__reactContainer$" + Pn, ns = "__reactEvents$" + Pn, sv = "__reactListeners$" + Pn, cv = "__reactHandles$" + Pn, Nd = "__reactResources$" + Pn, Pi = "__reactMarker$" + Pn;
  function as(e) {
    delete e[ft], delete e[zt], delete e[ns], delete e[sv], delete e[cv];
  }
  function Ja(e) {
    var t = e[ft];
    if (t) return t;
    for (var a = e.parentNode; a; ) {
      if (t = a[Qa] || a[ft]) {
        if (a = t.alternate, t.child !== null || a !== null && a.child !== null)
          for (e = Q_(e); e !== null; ) {
            if (a = e[ft]) return a;
            e = Q_(e);
          }
        return t;
      }
      e = a, a = e.parentNode;
    }
    return null;
  }
  function Wa(e) {
    if (e = e[ft] || e[Qa]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Ii(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(l(33));
  }
  function ei(e) {
    var t = e[Nd];
    return t || (t = e[Nd] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function dt(e) {
    e[Pi] = !0;
  }
  var Cd = /* @__PURE__ */ new Set(), Od = {};
  function Aa(e, t) {
    ti(e, t), ti(e + "Capture", t);
  }
  function ti(e, t) {
    for (Od[e] = t, e = 0; e < t.length; e++)
      Cd.add(t[e]);
  }
  var uv = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Md = {}, Rd = {};
  function dv(e) {
    return Gi.call(Rd, e) ? !0 : Gi.call(Md, e) ? !1 : uv.test(e) ? Rd[e] = !0 : (Md[e] = !0, !1);
  }
  function lr(e, t, a) {
    if (dv(t))
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
  function sr(e, t, a) {
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
  function wn(e, t, a, r) {
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
  function Dd(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function mv(e, t, a) {
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
  function is(e) {
    if (!e._valueTracker) {
      var t = Dd(e) ? "checked" : "value";
      e._valueTracker = mv(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function jd(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(), r = "";
    return e && (r = Dd(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== a ? (t.setValue(e), !0) : !1;
  }
  function cr(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var fv = /[\n"\\]/g;
  function It(e) {
    return e.replace(
      fv,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function os(e, t, a, r, c, u, h, b) {
    e.name = "", h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? e.type = h : e.removeAttribute("type"), t != null ? h === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Pt(t)) : e.value !== "" + Pt(t) && (e.value = "" + Pt(t)) : h !== "submit" && h !== "reset" || e.removeAttribute("value"), t != null ? rs(e, h, Pt(t)) : a != null ? rs(e, h, Pt(a)) : r != null && e.removeAttribute("value"), c == null && u != null && (e.defaultChecked = !!u), c != null && (e.checked = c && typeof c != "function" && typeof c != "symbol"), b != null && typeof b != "function" && typeof b != "symbol" && typeof b != "boolean" ? e.name = "" + Pt(b) : e.removeAttribute("name");
  }
  function Ld(e, t, a, r, c, u, h, b) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (e.type = u), t != null || a != null) {
      if (!(u !== "submit" && u !== "reset" || t != null)) {
        is(e);
        return;
      }
      a = a != null ? "" + Pt(a) : "", t = t != null ? "" + Pt(t) : a, b || t === e.value || (e.value = t), e.defaultValue = t;
    }
    r = r ?? c, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = b ? e.checked : !!r, e.defaultChecked = !!r, h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (e.name = h), is(e);
  }
  function rs(e, t, a) {
    t === "number" && cr(e.ownerDocument) === e || e.defaultValue === "" + a || (e.defaultValue = "" + a);
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
  function Ud(e, t, a) {
    if (t != null && (t = "" + Pt(t), t !== e.value && (e.value = t), a == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? "" + Pt(a) : "";
  }
  function Yd(e, t, a, r) {
    if (t == null) {
      if (r != null) {
        if (a != null) throw Error(l(92));
        if (J(r)) {
          if (1 < r.length) throw Error(l(93));
          r = r[0];
        }
        a = r;
      }
      a == null && (a = ""), t = a;
    }
    a = Pt(t), e.defaultValue = a, r = e.textContent, r === a && r !== "" && r !== null && (e.value = r), is(e);
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
  var _v = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Hd(e, t, a) {
    var r = t.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, a) : typeof a != "number" || a === 0 || _v.has(t) ? t === "float" ? e.cssFloat = a : e[t] = ("" + a).trim() : e[t] = a + "px";
  }
  function Zd(e, t, a) {
    if (t != null && typeof t != "object")
      throw Error(l(62));
    if (e = e.style, a != null) {
      for (var r in a)
        !a.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
      for (var c in t)
        r = t[c], t.hasOwnProperty(c) && a[c] !== r && Hd(e, c, r);
    } else
      for (var u in t)
        t.hasOwnProperty(u) && Hd(e, u, t[u]);
  }
  function ls(e) {
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
  var pv = /* @__PURE__ */ new Map([
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
  ]), gv = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function ur(e) {
    return gv.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Tn() {
  }
  var ss = null;
  function cs(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var ii = null, oi = null;
  function Bd(e) {
    var t = Wa(e);
    if (t && (e = t.stateNode)) {
      var a = e[zt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (os(
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
                os(
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
              r = a[t], r.form === e.form && jd(r);
          }
          break e;
        case "textarea":
          Ud(e, a.value, a.defaultValue);
          break e;
        case "select":
          t = a.value, t != null && ni(e, !!a.multiple, t, !1);
      }
    }
  }
  var us = !1;
  function Gd(e, t, a) {
    if (us) return e(t, a);
    us = !0;
    try {
      var r = e(t);
      return r;
    } finally {
      if (us = !1, (ii !== null || oi !== null) && (Qr(), ii && (t = ii, e = oi, oi = ii = null, Bd(t), e)))
        for (t = 0; t < e.length; t++) Bd(e[t]);
    }
  }
  function Fi(e, t) {
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
  var xn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ds = !1;
  if (xn)
    try {
      var Qi = {};
      Object.defineProperty(Qi, "passive", {
        get: function() {
          ds = !0;
        }
      }), window.addEventListener("test", Qi, Qi), window.removeEventListener("test", Qi, Qi);
    } catch {
      ds = !1;
    }
  var In = null, ms = null, dr = null;
  function Kd() {
    if (dr) return dr;
    var e, t = ms, a = t.length, r, c = "value" in In ? In.value : In.textContent, u = c.length;
    for (e = 0; e < a && t[e] === c[e]; e++) ;
    var h = a - e;
    for (r = 1; r <= h && t[a - r] === c[u - r]; r++) ;
    return dr = c.slice(e, 1 < r ? 1 - r : void 0);
  }
  function mr(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function fr() {
    return !0;
  }
  function qd() {
    return !1;
  }
  function At(e) {
    function t(a, r, c, u, h) {
      this._reactName = a, this._targetInst = c, this.type = r, this.nativeEvent = u, this.target = h, this.currentTarget = null;
      for (var b in e)
        e.hasOwnProperty(b) && (a = e[b], this[b] = a ? a(u) : u[b]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? fr : qd, this.isPropagationStopped = qd, this;
    }
    return y(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var a = this.nativeEvent;
        a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = fr);
      },
      stopPropagation: function() {
        var a = this.nativeEvent;
        a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = fr);
      },
      persist: function() {
      },
      isPersistent: fr
    }), t;
  }
  var Na = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, _r = At(Na), Ji = y({}, Na, { view: 0, detail: 0 }), hv = At(Ji), fs, _s, Wi, pr = y({}, Ji, {
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
    getModifierState: gs,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Wi && (Wi && e.type === "mousemove" ? (fs = e.screenX - Wi.screenX, _s = e.screenY - Wi.screenY) : _s = fs = 0, Wi = e), fs);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : _s;
    }
  }), Vd = At(pr), vv = y({}, pr, { dataTransfer: 0 }), yv = At(vv), bv = y({}, Ji, { relatedTarget: 0 }), ps = At(bv), Sv = y({}, Na, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), kv = At(Sv), Ev = y({}, Na, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), wv = At(Ev), Tv = y({}, Na, { data: 0 }), Xd = At(Tv), xv = {
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
  }, zv = {
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
  }, Av = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Nv(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Av[e]) ? !!t[e] : !1;
  }
  function gs() {
    return Nv;
  }
  var Cv = y({}, Ji, {
    key: function(e) {
      if (e.key) {
        var t = xv[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = mr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? zv[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: gs,
    charCode: function(e) {
      return e.type === "keypress" ? mr(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? mr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), Ov = At(Cv), Mv = y({}, pr, {
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
  }), $d = At(Mv), Rv = y({}, Ji, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: gs
  }), Dv = At(Rv), jv = y({}, Na, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Lv = At(jv), Uv = y({}, pr, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Yv = At(Uv), Hv = y({}, Na, {
    newState: 0,
    oldState: 0
  }), Zv = At(Hv), Bv = [9, 13, 27, 32], hs = xn && "CompositionEvent" in window, eo = null;
  xn && "documentMode" in document && (eo = document.documentMode);
  var Gv = xn && "TextEvent" in window && !eo, Pd = xn && (!hs || eo && 8 < eo && 11 >= eo), Id = " ", Fd = !1;
  function Qd(e, t) {
    switch (e) {
      case "keyup":
        return Bv.indexOf(t.keyCode) !== -1;
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
  function Jd(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var ri = !1;
  function Kv(e, t) {
    switch (e) {
      case "compositionend":
        return Jd(t);
      case "keypress":
        return t.which !== 32 ? null : (Fd = !0, Id);
      case "textInput":
        return e = t.data, e === Id && Fd ? null : e;
      default:
        return null;
    }
  }
  function qv(e, t) {
    if (ri)
      return e === "compositionend" || !hs && Qd(e, t) ? (e = Kd(), dr = ms = In = null, ri = !1, e) : null;
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
        return Pd && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Vv = {
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
  function Wd(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Vv[e.type] : t === "textarea";
  }
  function em(e, t, a, r) {
    ii ? oi ? oi.push(r) : oi = [r] : ii = r, t = il(t, "onChange"), 0 < t.length && (a = new _r(
      "onChange",
      "change",
      null,
      a,
      r
    ), e.push({ event: a, listeners: t }));
  }
  var to = null, no = null;
  function Xv(e) {
    U_(e, 0);
  }
  function gr(e) {
    var t = Ii(e);
    if (jd(t)) return e;
  }
  function tm(e, t) {
    if (e === "change") return t;
  }
  var nm = !1;
  if (xn) {
    var vs;
    if (xn) {
      var ys = "oninput" in document;
      if (!ys) {
        var am = document.createElement("div");
        am.setAttribute("oninput", "return;"), ys = typeof am.oninput == "function";
      }
      vs = ys;
    } else vs = !1;
    nm = vs && (!document.documentMode || 9 < document.documentMode);
  }
  function im() {
    to && (to.detachEvent("onpropertychange", om), no = to = null);
  }
  function om(e) {
    if (e.propertyName === "value" && gr(no)) {
      var t = [];
      em(
        t,
        no,
        e,
        cs(e)
      ), Gd(Xv, t);
    }
  }
  function $v(e, t, a) {
    e === "focusin" ? (im(), to = t, no = a, to.attachEvent("onpropertychange", om)) : e === "focusout" && im();
  }
  function Pv(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return gr(no);
  }
  function Iv(e, t) {
    if (e === "click") return gr(t);
  }
  function Fv(e, t) {
    if (e === "input" || e === "change")
      return gr(t);
  }
  function Qv(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Yt = typeof Object.is == "function" ? Object.is : Qv;
  function ao(e, t) {
    if (Yt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var a = Object.keys(e), r = Object.keys(t);
    if (a.length !== r.length) return !1;
    for (r = 0; r < a.length; r++) {
      var c = a[r];
      if (!Gi.call(t, c) || !Yt(e[c], t[c]))
        return !1;
    }
    return !0;
  }
  function rm(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function lm(e, t) {
    var a = rm(e);
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
      a = rm(a);
    }
  }
  function sm(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? sm(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function cm(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = cr(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = cr(e.document);
    }
    return t;
  }
  function bs(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var Jv = xn && "documentMode" in document && 11 >= document.documentMode, li = null, Ss = null, io = null, ks = !1;
  function um(e, t, a) {
    var r = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    ks || li == null || li !== cr(r) || (r = li, "selectionStart" in r && bs(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
      anchorNode: r.anchorNode,
      anchorOffset: r.anchorOffset,
      focusNode: r.focusNode,
      focusOffset: r.focusOffset
    }), io && ao(io, r) || (io = r, r = il(Ss, "onSelect"), 0 < r.length && (t = new _r(
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
  }, Es = {}, dm = {};
  xn && (dm = document.createElement("div").style, "AnimationEvent" in window || (delete si.animationend.animation, delete si.animationiteration.animation, delete si.animationstart.animation), "TransitionEvent" in window || delete si.transitionend.transition);
  function Oa(e) {
    if (Es[e]) return Es[e];
    if (!si[e]) return e;
    var t = si[e], a;
    for (a in t)
      if (t.hasOwnProperty(a) && a in dm)
        return Es[e] = t[a];
    return e;
  }
  var mm = Oa("animationend"), fm = Oa("animationiteration"), _m = Oa("animationstart"), Wv = Oa("transitionrun"), ey = Oa("transitionstart"), ty = Oa("transitioncancel"), pm = Oa("transitionend"), gm = /* @__PURE__ */ new Map(), ws = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  ws.push("scrollEnd");
  function fn(e, t) {
    gm.set(e, t), Aa(t, [e]);
  }
  var hr = typeof reportError == "function" ? reportError : function(e) {
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
  }, Ft = [], ci = 0, Ts = 0;
  function vr() {
    for (var e = ci, t = Ts = ci = 0; t < e; ) {
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
      u !== 0 && hm(a, c, u);
    }
  }
  function yr(e, t, a, r) {
    Ft[ci++] = e, Ft[ci++] = t, Ft[ci++] = a, Ft[ci++] = r, Ts |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
  }
  function xs(e, t, a, r) {
    return yr(e, t, a, r), br(e);
  }
  function Ma(e, t) {
    return yr(e, null, null, t), br(e);
  }
  function hm(e, t, a) {
    e.lanes |= a;
    var r = e.alternate;
    r !== null && (r.lanes |= a);
    for (var c = !1, u = e.return; u !== null; )
      u.childLanes |= a, r = u.alternate, r !== null && (r.childLanes |= a), u.tag === 22 && (e = u.stateNode, e === null || e._visibility & 1 || (c = !0)), e = u, u = u.return;
    return e.tag === 3 ? (u = e.stateNode, c && t !== null && (c = 31 - Ut(a), e = u.hiddenUpdates, r = e[c], r === null ? e[c] = [t] : r.push(t), t.lane = a | 536870912), u) : null;
  }
  function br(e) {
    if (50 < zo)
      throw zo = 0, jc = null, Error(l(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var ui = {};
  function ny(e, t, a, r) {
    this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ht(e, t, a, r) {
    return new ny(e, t, a, r);
  }
  function zs(e) {
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
  function vm(e, t) {
    e.flags &= 65011714;
    var a = e.alternate;
    return a === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type, t = a.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Sr(e, t, a, r, c, u) {
    var h = 0;
    if (r = e, typeof e == "function") zs(e) && (h = 1);
    else if (typeof e == "string")
      h = lb(
        e,
        a,
        te.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case F:
          return e = Ht(31, a, t, c), e.elementType = F, e.lanes = u, e;
        case z:
          return Ra(a.children, c, u, t);
        case R:
          h = 8, c |= 24;
          break;
        case D:
          return e = Ht(12, a, t, c | 2), e.elementType = D, e.lanes = u, e;
        case X:
          return e = Ht(13, a, t, c), e.elementType = X, e.lanes = u, e;
        case ie:
          return e = Ht(19, a, t, c), e.elementType = ie, e.lanes = u, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case L:
                h = 10;
                break e;
              case Y:
                h = 9;
                break e;
              case H:
                h = 11;
                break e;
              case $:
                h = 14;
                break e;
              case V:
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
  function As(e, t, a) {
    return e = Ht(6, e, null, t), e.lanes = a, e;
  }
  function ym(e) {
    var t = Ht(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Ns(e, t, a) {
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
  var bm = /* @__PURE__ */ new WeakMap();
  function Qt(e, t) {
    if (typeof e == "object" && e !== null) {
      var a = bm.get(e);
      return a !== void 0 ? a : (t = {
        value: e,
        source: t,
        stack: er(t)
      }, bm.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: er(t)
    };
  }
  var di = [], mi = 0, kr = null, oo = 0, Jt = [], Wt = 0, Fn = null, yn = 1, bn = "";
  function An(e, t) {
    di[mi++] = oo, di[mi++] = kr, kr = e, oo = t;
  }
  function Sm(e, t, a) {
    Jt[Wt++] = yn, Jt[Wt++] = bn, Jt[Wt++] = Fn, Fn = e;
    var r = yn;
    e = bn;
    var c = 32 - Ut(r) - 1;
    r &= ~(1 << c), a += 1;
    var u = 32 - Ut(t) + c;
    if (30 < u) {
      var h = c - c % 5;
      u = (r & (1 << h) - 1).toString(32), r >>= h, c -= h, yn = 1 << 32 - Ut(t) + c | a << c | r, bn = u + e;
    } else
      yn = 1 << u | a << c | r, bn = e;
  }
  function Cs(e) {
    e.return !== null && (An(e, 1), Sm(e, 1, 0));
  }
  function Os(e) {
    for (; e === kr; )
      kr = di[--mi], di[mi] = null, oo = di[--mi], di[mi] = null;
    for (; e === Fn; )
      Fn = Jt[--Wt], Jt[Wt] = null, bn = Jt[--Wt], Jt[Wt] = null, yn = Jt[--Wt], Jt[Wt] = null;
  }
  function km(e, t) {
    Jt[Wt++] = yn, Jt[Wt++] = bn, Jt[Wt++] = Fn, yn = t.id, bn = t.overflow, Fn = e;
  }
  var _t = null, qe = null, xe = !1, Qn = null, en = !1, Ms = Error(l(519));
  function Jn(e) {
    var t = Error(
      l(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw ro(Qt(t, e)), Ms;
  }
  function Em(e) {
    var t = e.stateNode, a = e.type, r = e.memoizedProps;
    switch (t[ft] = e, t[zt] = r, a) {
      case "dialog":
        Ee("cancel", t), Ee("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        Ee("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < No.length; a++)
          Ee(No[a], t);
        break;
      case "source":
        Ee("error", t);
        break;
      case "img":
      case "image":
      case "link":
        Ee("error", t), Ee("load", t);
        break;
      case "details":
        Ee("toggle", t);
        break;
      case "input":
        Ee("invalid", t), Ld(
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
        Ee("invalid", t);
        break;
      case "textarea":
        Ee("invalid", t), Yd(t, r.value, r.defaultValue, r.children);
    }
    a = r.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || r.suppressHydrationWarning === !0 || B_(t.textContent, a) ? (r.popover != null && (Ee("beforetoggle", t), Ee("toggle", t)), r.onScroll != null && Ee("scroll", t), r.onScrollEnd != null && Ee("scrollend", t), r.onClick != null && (t.onclick = Tn), t = !0) : t = !1, t || Jn(e, !0);
  }
  function wm(e) {
    for (_t = e.return; _t; )
      switch (_t.tag) {
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
          _t = _t.return;
      }
  }
  function fi(e) {
    if (e !== _t) return !1;
    if (!xe) return wm(e), xe = !0, !1;
    var t = e.tag, a;
    if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = e.type, a = !(a !== "form" && a !== "button") || Fc(e.type, e.memoizedProps)), a = !a), a && qe && Jn(e), wm(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      qe = F_(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      qe = F_(e);
    } else
      t === 27 ? (t = qe, ma(e.type) ? (e = tu, tu = null, qe = e) : qe = t) : qe = _t ? nn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Da() {
    qe = _t = null, xe = !1;
  }
  function Rs() {
    var e = Qn;
    return e !== null && (Mt === null ? Mt = e : Mt.push.apply(
      Mt,
      e
    ), Qn = null), e;
  }
  function ro(e) {
    Qn === null ? Qn = [e] : Qn.push(e);
  }
  var Ds = T(null), ja = null, Nn = null;
  function Wn(e, t, a) {
    P(Ds, t._currentValue), t._currentValue = a;
  }
  function Cn(e) {
    e._currentValue = Ds.current, Z(Ds);
  }
  function js(e, t, a) {
    for (; e !== null; ) {
      var r = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === a) break;
      e = e.return;
    }
  }
  function Ls(e, t, a, r) {
    var c = e.child;
    for (c !== null && (c.return = e); c !== null; ) {
      var u = c.dependencies;
      if (u !== null) {
        var h = c.child;
        u = u.firstContext;
        e: for (; u !== null; ) {
          var b = u;
          u = c;
          for (var w = 0; w < t.length; w++)
            if (b.context === t[w]) {
              u.lanes |= a, b = u.alternate, b !== null && (b.lanes |= a), js(
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
        h.lanes |= a, u = h.alternate, u !== null && (u.lanes |= a), js(h, a, e), h = null;
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
          Yt(c.pendingProps.value, h.value) || (e !== null ? e.push(b) : e = [b]);
        }
      } else if (c === ye.current) {
        if (h = c.alternate, h === null) throw Error(l(387));
        h.memoizedState.memoizedState !== c.memoizedState.memoizedState && (e !== null ? e.push(Do) : e = [Do]);
      }
      c = c.return;
    }
    e !== null && Ls(
      t,
      e,
      a,
      r
    ), t.flags |= 262144;
  }
  function Er(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Yt(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function La(e) {
    ja = e, Nn = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function pt(e) {
    return Tm(ja, e);
  }
  function wr(e, t) {
    return ja === null && La(e), Tm(e, t);
  }
  function Tm(e, t) {
    var a = t._currentValue;
    if (t = { context: t, memoizedValue: a, next: null }, Nn === null) {
      if (e === null) throw Error(l(308));
      Nn = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Nn = Nn.next = t;
    return a;
  }
  var ay = typeof AbortController < "u" ? AbortController : function() {
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
  }, iy = n.unstable_scheduleCallback, oy = n.unstable_NormalPriority, nt = {
    $$typeof: L,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Us() {
    return {
      controller: new ay(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function lo(e) {
    e.refCount--, e.refCount === 0 && iy(oy, function() {
      e.controller.abort();
    });
  }
  var so = null, Ys = 0, pi = 0, gi = null;
  function ry(e, t) {
    if (so === null) {
      var a = so = [];
      Ys = 0, pi = Bc(), gi = {
        status: "pending",
        value: void 0,
        then: function(r) {
          a.push(r);
        }
      };
    }
    return Ys++, t.then(xm, xm), t;
  }
  function xm() {
    if (--Ys === 0 && so !== null) {
      gi !== null && (gi.status = "fulfilled");
      var e = so;
      so = null, pi = 0, gi = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function ly(e, t) {
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
  var zm = A.S;
  A.S = function(e, t) {
    d_ = St(), typeof t == "object" && t !== null && typeof t.then == "function" && ry(e, t), zm !== null && zm(e, t);
  };
  var Ua = T(null);
  function Hs() {
    var e = Ua.current;
    return e !== null ? e : Be.pooledCache;
  }
  function Tr(e, t) {
    t === null ? P(Ua, Ua.current) : P(Ua, t.pool);
  }
  function Am() {
    var e = Hs();
    return e === null ? null : { parent: nt._currentValue, pool: e };
  }
  var hi = Error(l(460)), Zs = Error(l(474)), xr = Error(l(542)), zr = { then: function() {
  } };
  function Nm(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Cm(e, t, a) {
    switch (a = e[a], a === void 0 ? e.push(t) : a !== t && (t.then(Tn, Tn), t = a), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Mm(e), e;
      default:
        if (typeof t.status == "string") t.then(Tn, Tn);
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
            throw e = t.reason, Mm(e), e;
        }
        throw Ha = t, hi;
    }
  }
  function Ya(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function" ? (Ha = a, hi) : a;
    }
  }
  var Ha = null;
  function Om() {
    if (Ha === null) throw Error(l(459));
    var e = Ha;
    return Ha = null, e;
  }
  function Mm(e) {
    if (e === hi || e === xr)
      throw Error(l(483));
  }
  var vi = null, co = 0;
  function Ar(e) {
    var t = co;
    return co += 1, vi === null && (vi = []), Cm(vi, e, t);
  }
  function uo(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Nr(e, t) {
    throw t.$$typeof === S ? Error(l(525)) : (e = Object.prototype.toString.call(t), Error(
      l(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Rm(e) {
    function t(N, x) {
      if (e) {
        var O = N.deletions;
        O === null ? (N.deletions = [x], N.flags |= 16) : O.push(x);
      }
    }
    function a(N, x) {
      if (!e) return null;
      for (; x !== null; )
        t(N, x), x = x.sibling;
      return null;
    }
    function r(N) {
      for (var x = /* @__PURE__ */ new Map(); N !== null; )
        N.key !== null ? x.set(N.key, N) : x.set(N.index, N), N = N.sibling;
      return x;
    }
    function c(N, x) {
      return N = zn(N, x), N.index = 0, N.sibling = null, N;
    }
    function u(N, x, O) {
      return N.index = O, e ? (O = N.alternate, O !== null ? (O = O.index, O < x ? (N.flags |= 67108866, x) : O) : (N.flags |= 67108866, x)) : (N.flags |= 1048576, x);
    }
    function h(N) {
      return e && N.alternate === null && (N.flags |= 67108866), N;
    }
    function b(N, x, O, G) {
      return x === null || x.tag !== 6 ? (x = As(O, N.mode, G), x.return = N, x) : (x = c(x, O), x.return = N, x);
    }
    function w(N, x, O, G) {
      var le = O.type;
      return le === z ? B(
        N,
        x,
        O.props.children,
        G,
        O.key
      ) : x !== null && (x.elementType === le || typeof le == "object" && le !== null && le.$$typeof === V && Ya(le) === x.type) ? (x = c(x, O.props), uo(x, O), x.return = N, x) : (x = Sr(
        O.type,
        O.key,
        O.props,
        null,
        N.mode,
        G
      ), uo(x, O), x.return = N, x);
    }
    function M(N, x, O, G) {
      return x === null || x.tag !== 4 || x.stateNode.containerInfo !== O.containerInfo || x.stateNode.implementation !== O.implementation ? (x = Ns(O, N.mode, G), x.return = N, x) : (x = c(x, O.children || []), x.return = N, x);
    }
    function B(N, x, O, G, le) {
      return x === null || x.tag !== 7 ? (x = Ra(
        O,
        N.mode,
        G,
        le
      ), x.return = N, x) : (x = c(x, O), x.return = N, x);
    }
    function q(N, x, O) {
      if (typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint")
        return x = As(
          "" + x,
          N.mode,
          O
        ), x.return = N, x;
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case k:
            return O = Sr(
              x.type,
              x.key,
              x.props,
              null,
              N.mode,
              O
            ), uo(O, x), O.return = N, O;
          case E:
            return x = Ns(
              x,
              N.mode,
              O
            ), x.return = N, x;
          case V:
            return x = Ya(x), q(N, x, O);
        }
        if (J(x) || ce(x))
          return x = Ra(
            x,
            N.mode,
            O,
            null
          ), x.return = N, x;
        if (typeof x.then == "function")
          return q(N, Ar(x), O);
        if (x.$$typeof === L)
          return q(
            N,
            wr(N, x),
            O
          );
        Nr(N, x);
      }
      return null;
    }
    function j(N, x, O, G) {
      var le = x !== null ? x.key : null;
      if (typeof O == "string" && O !== "" || typeof O == "number" || typeof O == "bigint")
        return le !== null ? null : b(N, x, "" + O, G);
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case k:
            return O.key === le ? w(N, x, O, G) : null;
          case E:
            return O.key === le ? M(N, x, O, G) : null;
          case V:
            return O = Ya(O), j(N, x, O, G);
        }
        if (J(O) || ce(O))
          return le !== null ? null : B(N, x, O, G, null);
        if (typeof O.then == "function")
          return j(
            N,
            x,
            Ar(O),
            G
          );
        if (O.$$typeof === L)
          return j(
            N,
            x,
            wr(N, O),
            G
          );
        Nr(N, O);
      }
      return null;
    }
    function U(N, x, O, G, le) {
      if (typeof G == "string" && G !== "" || typeof G == "number" || typeof G == "bigint")
        return N = N.get(O) || null, b(x, N, "" + G, le);
      if (typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case k:
            return N = N.get(
              G.key === null ? O : G.key
            ) || null, w(x, N, G, le);
          case E:
            return N = N.get(
              G.key === null ? O : G.key
            ) || null, M(x, N, G, le);
          case V:
            return G = Ya(G), U(
              N,
              x,
              O,
              G,
              le
            );
        }
        if (J(G) || ce(G))
          return N = N.get(O) || null, B(x, N, G, le, null);
        if (typeof G.then == "function")
          return U(
            N,
            x,
            O,
            Ar(G),
            le
          );
        if (G.$$typeof === L)
          return U(
            N,
            x,
            O,
            wr(x, G),
            le
          );
        Nr(x, G);
      }
      return null;
    }
    function oe(N, x, O, G) {
      for (var le = null, Ce = null, re = x, Se = x = 0, Te = null; re !== null && Se < O.length; Se++) {
        re.index > Se ? (Te = re, re = null) : Te = re.sibling;
        var Oe = j(
          N,
          re,
          O[Se],
          G
        );
        if (Oe === null) {
          re === null && (re = Te);
          break;
        }
        e && re && Oe.alternate === null && t(N, re), x = u(Oe, x, Se), Ce === null ? le = Oe : Ce.sibling = Oe, Ce = Oe, re = Te;
      }
      if (Se === O.length)
        return a(N, re), xe && An(N, Se), le;
      if (re === null) {
        for (; Se < O.length; Se++)
          re = q(N, O[Se], G), re !== null && (x = u(
            re,
            x,
            Se
          ), Ce === null ? le = re : Ce.sibling = re, Ce = re);
        return xe && An(N, Se), le;
      }
      for (re = r(re); Se < O.length; Se++)
        Te = U(
          re,
          N,
          Se,
          O[Se],
          G
        ), Te !== null && (e && Te.alternate !== null && re.delete(
          Te.key === null ? Se : Te.key
        ), x = u(
          Te,
          x,
          Se
        ), Ce === null ? le = Te : Ce.sibling = Te, Ce = Te);
      return e && re.forEach(function(ha) {
        return t(N, ha);
      }), xe && An(N, Se), le;
    }
    function _e(N, x, O, G) {
      if (O == null) throw Error(l(151));
      for (var le = null, Ce = null, re = x, Se = x = 0, Te = null, Oe = O.next(); re !== null && !Oe.done; Se++, Oe = O.next()) {
        re.index > Se ? (Te = re, re = null) : Te = re.sibling;
        var ha = j(N, re, Oe.value, G);
        if (ha === null) {
          re === null && (re = Te);
          break;
        }
        e && re && ha.alternate === null && t(N, re), x = u(ha, x, Se), Ce === null ? le = ha : Ce.sibling = ha, Ce = ha, re = Te;
      }
      if (Oe.done)
        return a(N, re), xe && An(N, Se), le;
      if (re === null) {
        for (; !Oe.done; Se++, Oe = O.next())
          Oe = q(N, Oe.value, G), Oe !== null && (x = u(Oe, x, Se), Ce === null ? le = Oe : Ce.sibling = Oe, Ce = Oe);
        return xe && An(N, Se), le;
      }
      for (re = r(re); !Oe.done; Se++, Oe = O.next())
        Oe = U(re, N, Se, Oe.value, G), Oe !== null && (e && Oe.alternate !== null && re.delete(Oe.key === null ? Se : Oe.key), x = u(Oe, x, Se), Ce === null ? le = Oe : Ce.sibling = Oe, Ce = Oe);
      return e && re.forEach(function(vb) {
        return t(N, vb);
      }), xe && An(N, Se), le;
    }
    function Ze(N, x, O, G) {
      if (typeof O == "object" && O !== null && O.type === z && O.key === null && (O = O.props.children), typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case k:
            e: {
              for (var le = O.key; x !== null; ) {
                if (x.key === le) {
                  if (le = O.type, le === z) {
                    if (x.tag === 7) {
                      a(
                        N,
                        x.sibling
                      ), G = c(
                        x,
                        O.props.children
                      ), G.return = N, N = G;
                      break e;
                    }
                  } else if (x.elementType === le || typeof le == "object" && le !== null && le.$$typeof === V && Ya(le) === x.type) {
                    a(
                      N,
                      x.sibling
                    ), G = c(x, O.props), uo(G, O), G.return = N, N = G;
                    break e;
                  }
                  a(N, x);
                  break;
                } else t(N, x);
                x = x.sibling;
              }
              O.type === z ? (G = Ra(
                O.props.children,
                N.mode,
                G,
                O.key
              ), G.return = N, N = G) : (G = Sr(
                O.type,
                O.key,
                O.props,
                null,
                N.mode,
                G
              ), uo(G, O), G.return = N, N = G);
            }
            return h(N);
          case E:
            e: {
              for (le = O.key; x !== null; ) {
                if (x.key === le)
                  if (x.tag === 4 && x.stateNode.containerInfo === O.containerInfo && x.stateNode.implementation === O.implementation) {
                    a(
                      N,
                      x.sibling
                    ), G = c(x, O.children || []), G.return = N, N = G;
                    break e;
                  } else {
                    a(N, x);
                    break;
                  }
                else t(N, x);
                x = x.sibling;
              }
              G = Ns(O, N.mode, G), G.return = N, N = G;
            }
            return h(N);
          case V:
            return O = Ya(O), Ze(
              N,
              x,
              O,
              G
            );
        }
        if (J(O))
          return oe(
            N,
            x,
            O,
            G
          );
        if (ce(O)) {
          if (le = ce(O), typeof le != "function") throw Error(l(150));
          return O = le.call(O), _e(
            N,
            x,
            O,
            G
          );
        }
        if (typeof O.then == "function")
          return Ze(
            N,
            x,
            Ar(O),
            G
          );
        if (O.$$typeof === L)
          return Ze(
            N,
            x,
            wr(N, O),
            G
          );
        Nr(N, O);
      }
      return typeof O == "string" && O !== "" || typeof O == "number" || typeof O == "bigint" ? (O = "" + O, x !== null && x.tag === 6 ? (a(N, x.sibling), G = c(x, O), G.return = N, N = G) : (a(N, x), G = As(O, N.mode, G), G.return = N, N = G), h(N)) : a(N, x);
    }
    return function(N, x, O, G) {
      try {
        co = 0;
        var le = Ze(
          N,
          x,
          O,
          G
        );
        return vi = null, le;
      } catch (re) {
        if (re === hi || re === xr) throw re;
        var Ce = Ht(29, re, null, N.mode);
        return Ce.lanes = G, Ce.return = N, Ce;
      }
    };
  }
  var Za = Rm(!0), Dm = Rm(!1), ea = !1;
  function Bs(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Gs(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function ta(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function na(e, t, a) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, (Re & 2) !== 0) {
      var c = r.pending;
      return c === null ? t.next = t : (t.next = c.next, c.next = t), r.pending = t, t = br(e), hm(e, null, a), t;
    }
    return yr(e, r, t, a), br(e);
  }
  function mo(e, t, a) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
      var r = t.lanes;
      r &= e.pendingLanes, a |= r, t.lanes = a, Td(e, a);
    }
  }
  function Ks(e, t) {
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
  var qs = !1;
  function fo() {
    if (qs) {
      var e = gi;
      if (e !== null) throw e;
    }
  }
  function _o(e, t, a, r) {
    qs = !1;
    var c = e.updateQueue;
    ea = !1;
    var u = c.firstBaseUpdate, h = c.lastBaseUpdate, b = c.shared.pending;
    if (b !== null) {
      c.shared.pending = null;
      var w = b, M = w.next;
      w.next = null, h === null ? u = M : h.next = M, h = w;
      var B = e.alternate;
      B !== null && (B = B.updateQueue, b = B.lastBaseUpdate, b !== h && (b === null ? B.firstBaseUpdate = M : b.next = M, B.lastBaseUpdate = w));
    }
    if (u !== null) {
      var q = c.baseState;
      h = 0, B = M = w = null, b = u;
      do {
        var j = b.lane & -536870913, U = j !== b.lane;
        if (U ? (we & j) === j : (r & j) === j) {
          j !== 0 && j === pi && (qs = !0), B !== null && (B = B.next = {
            lane: 0,
            tag: b.tag,
            payload: b.payload,
            callback: null,
            next: null
          });
          e: {
            var oe = e, _e = b;
            j = t;
            var Ze = a;
            switch (_e.tag) {
              case 1:
                if (oe = _e.payload, typeof oe == "function") {
                  q = oe.call(Ze, q, j);
                  break e;
                }
                q = oe;
                break e;
              case 3:
                oe.flags = oe.flags & -65537 | 128;
              case 0:
                if (oe = _e.payload, j = typeof oe == "function" ? oe.call(Ze, q, j) : oe, j == null) break e;
                q = y({}, q, j);
                break e;
              case 2:
                ea = !0;
            }
          }
          j = b.callback, j !== null && (e.flags |= 64, U && (e.flags |= 8192), U = c.callbacks, U === null ? c.callbacks = [j] : U.push(j));
        } else
          U = {
            lane: j,
            tag: b.tag,
            payload: b.payload,
            callback: b.callback,
            next: null
          }, B === null ? (M = B = U, w = q) : B = B.next = U, h |= j;
        if (b = b.next, b === null) {
          if (b = c.shared.pending, b === null)
            break;
          U = b, b = U.next, U.next = null, c.lastBaseUpdate = U, c.shared.pending = null;
        }
      } while (!0);
      B === null && (w = q), c.baseState = w, c.firstBaseUpdate = M, c.lastBaseUpdate = B, u === null && (c.shared.lanes = 0), la |= h, e.lanes = h, e.memoizedState = q;
    }
  }
  function jm(e, t) {
    if (typeof e != "function")
      throw Error(l(191, e));
    e.call(t);
  }
  function Lm(e, t) {
    var a = e.callbacks;
    if (a !== null)
      for (e.callbacks = null, e = 0; e < a.length; e++)
        jm(a[e], t);
  }
  var yi = T(null), Cr = T(0);
  function Um(e, t) {
    e = Hn, P(Cr, e), P(yi, t), Hn = e | t.baseLanes;
  }
  function Vs() {
    P(Cr, Hn), P(yi, yi.current);
  }
  function Xs() {
    Hn = Cr.current, Z(yi), Z(Cr);
  }
  var Zt = T(null), tn = null;
  function aa(e) {
    var t = e.alternate;
    P(We, We.current & 1), P(Zt, e), tn === null && (t === null || yi.current !== null || t.memoizedState !== null) && (tn = e);
  }
  function $s(e) {
    P(We, We.current), P(Zt, e), tn === null && (tn = e);
  }
  function Ym(e) {
    e.tag === 22 ? (P(We, We.current), P(Zt, e), tn === null && (tn = e)) : ia();
  }
  function ia() {
    P(We, We.current), P(Zt, Zt.current);
  }
  function Bt(e) {
    Z(Zt), tn === e && (tn = null), Z(We);
  }
  var We = T(0);
  function Or(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && (a = a.dehydrated, a === null || Wc(a) || eu(a)))
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
  var On = 0, be = null, Ye = null, at = null, Mr = !1, bi = !1, Ba = !1, Rr = 0, po = 0, Si = null, sy = 0;
  function Ie() {
    throw Error(l(321));
  }
  function Ps(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++)
      if (!Yt(e[a], t[a])) return !1;
    return !0;
  }
  function Is(e, t, a, r, c, u) {
    return On = u, be = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, A.H = e === null || e.memoizedState === null ? kf : uc, Ba = !1, u = a(r, c), Ba = !1, bi && (u = Zm(
      t,
      a,
      r,
      c
    )), Hm(e), u;
  }
  function Hm(e) {
    A.H = vo;
    var t = Ye !== null && Ye.next !== null;
    if (On = 0, at = Ye = be = null, Mr = !1, po = 0, Si = null, t) throw Error(l(300));
    e === null || it || (e = e.dependencies, e !== null && Er(e) && (it = !0));
  }
  function Zm(e, t, a, r) {
    be = e;
    var c = 0;
    do {
      if (bi && (Si = null), po = 0, bi = !1, 25 <= c) throw Error(l(301));
      if (c += 1, at = Ye = null, e.updateQueue != null) {
        var u = e.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      A.H = Ef, u = t(a, r);
    } while (bi);
    return u;
  }
  function cy() {
    var e = A.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? go(t) : t, e = e.useState()[0], (Ye !== null ? Ye.memoizedState : null) !== e && (be.flags |= 1024), t;
  }
  function Fs() {
    var e = Rr !== 0;
    return Rr = 0, e;
  }
  function Qs(e, t, a) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a;
  }
  function Js(e) {
    if (Mr) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Mr = !1;
    }
    On = 0, at = Ye = be = null, bi = !1, po = Rr = 0, Si = null;
  }
  function kt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return at === null ? be.memoizedState = at = e : at = at.next = e, at;
  }
  function et() {
    if (Ye === null) {
      var e = be.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ye.next;
    var t = at === null ? be.memoizedState : at.next;
    if (t !== null)
      at = t, Ye = e;
    else {
      if (e === null)
        throw be.alternate === null ? Error(l(467)) : Error(l(310));
      Ye = e, e = {
        memoizedState: Ye.memoizedState,
        baseState: Ye.baseState,
        baseQueue: Ye.baseQueue,
        queue: Ye.queue,
        next: null
      }, at === null ? be.memoizedState = at = e : at = at.next = e;
    }
    return at;
  }
  function Dr() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function go(e) {
    var t = po;
    return po += 1, Si === null && (Si = []), e = Cm(Si, e, t), t = be, (at === null ? t.memoizedState : at.next) === null && (t = t.alternate, A.H = t === null || t.memoizedState === null ? kf : uc), e;
  }
  function jr(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return go(e);
      if (e.$$typeof === L) return pt(e);
    }
    throw Error(l(438, String(e)));
  }
  function Ws(e) {
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
    if (t == null && (t = { data: [], index: 0 }), a === null && (a = Dr(), be.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0)
      for (a = t.data[t.index] = Array(e), r = 0; r < e; r++)
        a[r] = W;
    return t.index++, a;
  }
  function Mn(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Lr(e) {
    var t = et();
    return ec(t, Ye, e);
  }
  function ec(e, t, a) {
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
      var b = h = null, w = null, M = t, B = !1;
      do {
        var q = M.lane & -536870913;
        if (q !== M.lane ? (we & q) === q : (On & q) === q) {
          var j = M.revertLane;
          if (j === 0)
            w !== null && (w = w.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: M.action,
              hasEagerState: M.hasEagerState,
              eagerState: M.eagerState,
              next: null
            }), q === pi && (B = !0);
          else if ((On & j) === j) {
            M = M.next, j === pi && (B = !0);
            continue;
          } else
            q = {
              lane: 0,
              revertLane: M.revertLane,
              gesture: null,
              action: M.action,
              hasEagerState: M.hasEagerState,
              eagerState: M.eagerState,
              next: null
            }, w === null ? (b = w = q, h = u) : w = w.next = q, be.lanes |= j, la |= j;
          q = M.action, Ba && a(u, q), u = M.hasEagerState ? M.eagerState : a(u, q);
        } else
          j = {
            lane: q,
            revertLane: M.revertLane,
            gesture: M.gesture,
            action: M.action,
            hasEagerState: M.hasEagerState,
            eagerState: M.eagerState,
            next: null
          }, w === null ? (b = w = j, h = u) : w = w.next = j, be.lanes |= q, la |= q;
        M = M.next;
      } while (M !== null && M !== t);
      if (w === null ? h = u : w.next = b, !Yt(u, e.memoizedState) && (it = !0, B && (a = gi, a !== null)))
        throw a;
      e.memoizedState = u, e.baseState = h, e.baseQueue = w, r.lastRenderedState = u;
    }
    return c === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
  }
  function tc(e) {
    var t = et(), a = t.queue;
    if (a === null) throw Error(l(311));
    a.lastRenderedReducer = e;
    var r = a.dispatch, c = a.pending, u = t.memoizedState;
    if (c !== null) {
      a.pending = null;
      var h = c = c.next;
      do
        u = e(u, h.action), h = h.next;
      while (h !== c);
      Yt(u, t.memoizedState) || (it = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), a.lastRenderedState = u;
    }
    return [u, r];
  }
  function Bm(e, t, a) {
    var r = be, c = et(), u = xe;
    if (u) {
      if (a === void 0) throw Error(l(407));
      a = a();
    } else a = t();
    var h = !Yt(
      (Ye || c).memoizedState,
      a
    );
    if (h && (c.memoizedState = a, it = !0), c = c.queue, ic(qm.bind(null, r, c, e), [
      e
    ]), c.getSnapshot !== t || h || at !== null && at.memoizedState.tag & 1) {
      if (r.flags |= 2048, ki(
        9,
        { destroy: void 0 },
        Km.bind(
          null,
          r,
          c,
          a,
          t
        ),
        null
      ), Be === null) throw Error(l(349));
      u || (On & 127) !== 0 || Gm(r, t, a);
    }
    return a;
  }
  function Gm(e, t, a) {
    e.flags |= 16384, e = { getSnapshot: t, value: a }, t = be.updateQueue, t === null ? (t = Dr(), be.updateQueue = t, t.stores = [e]) : (a = t.stores, a === null ? t.stores = [e] : a.push(e));
  }
  function Km(e, t, a, r) {
    t.value = a, t.getSnapshot = r, Vm(t) && Xm(e);
  }
  function qm(e, t, a) {
    return a(function() {
      Vm(t) && Xm(e);
    });
  }
  function Vm(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !Yt(e, a);
    } catch {
      return !0;
    }
  }
  function Xm(e) {
    var t = Ma(e, 2);
    t !== null && Rt(t, e, 2);
  }
  function nc(e) {
    var t = kt();
    if (typeof e == "function") {
      var a = e;
      if (e = a(), Ba) {
        $n(!0);
        try {
          a();
        } finally {
          $n(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Mn,
      lastRenderedState: e
    }, t;
  }
  function $m(e, t, a, r) {
    return e.baseState = a, ec(
      e,
      Ye,
      typeof r == "function" ? r : Mn
    );
  }
  function uy(e, t, a, r, c) {
    if (Hr(e)) throw Error(l(485));
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
      A.T !== null ? a(!0) : u.isTransition = !1, r(u), a = t.pending, a === null ? (u.next = t.pending = u, Pm(t, u)) : (u.next = a.next, t.pending = a.next = u);
    }
  }
  function Pm(e, t) {
    var a = t.action, r = t.payload, c = e.state;
    if (t.isTransition) {
      var u = A.T, h = {};
      A.T = h;
      try {
        var b = a(c, r), w = A.S;
        w !== null && w(h, b), Im(e, t, b);
      } catch (M) {
        ac(e, t, M);
      } finally {
        u !== null && h.types !== null && (u.types = h.types), A.T = u;
      }
    } else
      try {
        u = a(c, r), Im(e, t, u);
      } catch (M) {
        ac(e, t, M);
      }
  }
  function Im(e, t, a) {
    a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(
      function(r) {
        Fm(e, t, r);
      },
      function(r) {
        return ac(e, t, r);
      }
    ) : Fm(e, t, a);
  }
  function Fm(e, t, a) {
    t.status = "fulfilled", t.value = a, Qm(t), e.state = a, t = e.pending, t !== null && (a = t.next, a === t ? e.pending = null : (a = a.next, t.next = a, Pm(e, a)));
  }
  function ac(e, t, a) {
    var r = e.pending;
    if (e.pending = null, r !== null) {
      r = r.next;
      do
        t.status = "rejected", t.reason = a, Qm(t), t = t.next;
      while (t !== r);
    }
    e.action = null;
  }
  function Qm(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Jm(e, t) {
    return t;
  }
  function Wm(e, t) {
    if (xe) {
      var a = Be.formState;
      if (a !== null) {
        e: {
          var r = be;
          if (xe) {
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
            Jn(r);
          }
          r = !1;
        }
        r && (t = a[0]);
      }
    }
    return a = kt(), a.memoizedState = a.baseState = t, r = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Jm,
      lastRenderedState: t
    }, a.queue = r, a = yf.bind(
      null,
      be,
      r
    ), r.dispatch = a, r = nc(!1), u = cc.bind(
      null,
      be,
      !1,
      r.queue
    ), r = kt(), c = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, r.queue = c, a = uy.bind(
      null,
      be,
      c,
      u,
      a
    ), c.dispatch = a, r.memoizedState = e, [t, a, !1];
  }
  function ef(e) {
    var t = et();
    return tf(t, Ye, e);
  }
  function tf(e, t, a) {
    if (t = ec(
      e,
      t,
      Jm
    )[0], e = Lr(Mn)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var r = go(t);
      } catch (h) {
        throw h === hi ? xr : h;
      }
    else r = t;
    t = et();
    var c = t.queue, u = c.dispatch;
    return a !== t.memoizedState && (be.flags |= 2048, ki(
      9,
      { destroy: void 0 },
      dy.bind(null, c, a),
      null
    )), [r, u, e];
  }
  function dy(e, t) {
    e.action = t;
  }
  function nf(e) {
    var t = et(), a = Ye;
    if (a !== null)
      return tf(t, a, e);
    et(), t = t.memoizedState, a = et();
    var r = a.queue.dispatch;
    return a.memoizedState = e, [t, r, !1];
  }
  function ki(e, t, a, r) {
    return e = { tag: e, create: a, deps: r, inst: t, next: null }, t = be.updateQueue, t === null && (t = Dr(), be.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = e.next = e : (r = a.next, a.next = e, e.next = r, t.lastEffect = e), e;
  }
  function af() {
    return et().memoizedState;
  }
  function Ur(e, t, a, r) {
    var c = kt();
    be.flags |= e, c.memoizedState = ki(
      1 | t,
      { destroy: void 0 },
      a,
      r === void 0 ? null : r
    );
  }
  function Yr(e, t, a, r) {
    var c = et();
    r = r === void 0 ? null : r;
    var u = c.memoizedState.inst;
    Ye !== null && r !== null && Ps(r, Ye.memoizedState.deps) ? c.memoizedState = ki(t, u, a, r) : (be.flags |= e, c.memoizedState = ki(
      1 | t,
      u,
      a,
      r
    ));
  }
  function of(e, t) {
    Ur(8390656, 8, e, t);
  }
  function ic(e, t) {
    Yr(2048, 8, e, t);
  }
  function my(e) {
    be.flags |= 4;
    var t = be.updateQueue;
    if (t === null)
      t = Dr(), be.updateQueue = t, t.events = [e];
    else {
      var a = t.events;
      a === null ? t.events = [e] : a.push(e);
    }
  }
  function rf(e) {
    var t = et().memoizedState;
    return my({ ref: t, nextImpl: e }), function() {
      if ((Re & 2) !== 0) throw Error(l(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function lf(e, t) {
    return Yr(4, 2, e, t);
  }
  function sf(e, t) {
    return Yr(4, 4, e, t);
  }
  function cf(e, t) {
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
  function uf(e, t, a) {
    a = a != null ? a.concat([e]) : null, Yr(4, 4, cf.bind(null, t, e), a);
  }
  function oc() {
  }
  function df(e, t) {
    var a = et();
    t = t === void 0 ? null : t;
    var r = a.memoizedState;
    return t !== null && Ps(t, r[1]) ? r[0] : (a.memoizedState = [e, t], e);
  }
  function mf(e, t) {
    var a = et();
    t = t === void 0 ? null : t;
    var r = a.memoizedState;
    if (t !== null && Ps(t, r[1]))
      return r[0];
    if (r = e(), Ba) {
      $n(!0);
      try {
        e();
      } finally {
        $n(!1);
      }
    }
    return a.memoizedState = [r, t], r;
  }
  function rc(e, t, a) {
    return a === void 0 || (On & 1073741824) !== 0 && (we & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = a, e = f_(), be.lanes |= e, la |= e, a);
  }
  function ff(e, t, a, r) {
    return Yt(a, t) ? a : yi.current !== null ? (e = rc(e, a, r), Yt(e, t) || (it = !0), e) : (On & 42) === 0 || (On & 1073741824) !== 0 && (we & 261930) === 0 ? (it = !0, e.memoizedState = a) : (e = f_(), be.lanes |= e, la |= e, t);
  }
  function _f(e, t, a, r, c) {
    var u = I.p;
    I.p = u !== 0 && 8 > u ? u : 8;
    var h = A.T, b = {};
    A.T = b, cc(e, !1, t, a);
    try {
      var w = c(), M = A.S;
      if (M !== null && M(b, w), w !== null && typeof w == "object" && typeof w.then == "function") {
        var B = ly(
          w,
          r
        );
        ho(
          e,
          t,
          B,
          qt(e)
        );
      } else
        ho(
          e,
          t,
          r,
          qt(e)
        );
    } catch (q) {
      ho(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: q },
        qt()
      );
    } finally {
      I.p = u, h !== null && b.types !== null && (h.types = b.types), A.T = h;
    }
  }
  function fy() {
  }
  function lc(e, t, a, r) {
    if (e.tag !== 5) throw Error(l(476));
    var c = pf(e).queue;
    _f(
      e,
      c,
      t,
      ne,
      a === null ? fy : function() {
        return gf(e), a(r);
      }
    );
  }
  function pf(e) {
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
        lastRenderedReducer: Mn,
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
        lastRenderedReducer: Mn,
        lastRenderedState: a
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function gf(e) {
    var t = pf(e);
    t.next === null && (t = e.alternate.memoizedState), ho(
      e,
      t.next.queue,
      {},
      qt()
    );
  }
  function sc() {
    return pt(Do);
  }
  function hf() {
    return et().memoizedState;
  }
  function vf() {
    return et().memoizedState;
  }
  function _y(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = qt();
          e = ta(a);
          var r = na(t, e, a);
          r !== null && (Rt(r, t, a), mo(r, t, a)), t = { cache: Us() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function py(e, t, a) {
    var r = qt();
    a = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Hr(e) ? bf(t, a) : (a = xs(e, t, a, r), a !== null && (Rt(a, e, r), Sf(a, t, r)));
  }
  function yf(e, t, a) {
    var r = qt();
    ho(e, t, a, r);
  }
  function ho(e, t, a, r) {
    var c = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Hr(e)) bf(t, c);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null))
        try {
          var h = t.lastRenderedState, b = u(h, a);
          if (c.hasEagerState = !0, c.eagerState = b, Yt(b, h))
            return yr(e, t, c, 0), Be === null && vr(), !1;
        } catch {
        }
      if (a = xs(e, t, c, r), a !== null)
        return Rt(a, e, r), Sf(a, t, r), !0;
    }
    return !1;
  }
  function cc(e, t, a, r) {
    if (r = {
      lane: 2,
      revertLane: Bc(),
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Hr(e)) {
      if (t) throw Error(l(479));
    } else
      t = xs(
        e,
        a,
        r,
        2
      ), t !== null && Rt(t, e, 2);
  }
  function Hr(e) {
    var t = e.alternate;
    return e === be || t !== null && t === be;
  }
  function bf(e, t) {
    bi = Mr = !0;
    var a = e.pending;
    a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
  }
  function Sf(e, t, a) {
    if ((a & 4194048) !== 0) {
      var r = t.lanes;
      r &= e.pendingLanes, a |= r, t.lanes = a, Td(e, a);
    }
  }
  var vo = {
    readContext: pt,
    use: jr,
    useCallback: Ie,
    useContext: Ie,
    useEffect: Ie,
    useImperativeHandle: Ie,
    useLayoutEffect: Ie,
    useInsertionEffect: Ie,
    useMemo: Ie,
    useReducer: Ie,
    useRef: Ie,
    useState: Ie,
    useDebugValue: Ie,
    useDeferredValue: Ie,
    useTransition: Ie,
    useSyncExternalStore: Ie,
    useId: Ie,
    useHostTransitionStatus: Ie,
    useFormState: Ie,
    useActionState: Ie,
    useOptimistic: Ie,
    useMemoCache: Ie,
    useCacheRefresh: Ie
  };
  vo.useEffectEvent = Ie;
  var kf = {
    readContext: pt,
    use: jr,
    useCallback: function(e, t) {
      return kt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: pt,
    useEffect: of,
    useImperativeHandle: function(e, t, a) {
      a = a != null ? a.concat([e]) : null, Ur(
        4194308,
        4,
        cf.bind(null, t, e),
        a
      );
    },
    useLayoutEffect: function(e, t) {
      return Ur(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Ur(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var a = kt();
      t = t === void 0 ? null : t;
      var r = e();
      if (Ba) {
        $n(!0);
        try {
          e();
        } finally {
          $n(!1);
        }
      }
      return a.memoizedState = [r, t], r;
    },
    useReducer: function(e, t, a) {
      var r = kt();
      if (a !== void 0) {
        var c = a(t);
        if (Ba) {
          $n(!0);
          try {
            a(t);
          } finally {
            $n(!1);
          }
        }
      } else c = t;
      return r.memoizedState = r.baseState = c, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: c
      }, r.queue = e, e = e.dispatch = py.bind(
        null,
        be,
        e
      ), [r.memoizedState, e];
    },
    useRef: function(e) {
      var t = kt();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = nc(e);
      var t = e.queue, a = yf.bind(null, be, t);
      return t.dispatch = a, [e.memoizedState, a];
    },
    useDebugValue: oc,
    useDeferredValue: function(e, t) {
      var a = kt();
      return rc(a, e, t);
    },
    useTransition: function() {
      var e = nc(!1);
      return e = _f.bind(
        null,
        be,
        e.queue,
        !0,
        !1
      ), kt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, a) {
      var r = be, c = kt();
      if (xe) {
        if (a === void 0)
          throw Error(l(407));
        a = a();
      } else {
        if (a = t(), Be === null)
          throw Error(l(349));
        (we & 127) !== 0 || Gm(r, t, a);
      }
      c.memoizedState = a;
      var u = { value: a, getSnapshot: t };
      return c.queue = u, of(qm.bind(null, r, u, e), [
        e
      ]), r.flags |= 2048, ki(
        9,
        { destroy: void 0 },
        Km.bind(
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
      var e = kt(), t = Be.identifierPrefix;
      if (xe) {
        var a = bn, r = yn;
        a = (r & ~(1 << 32 - Ut(r) - 1)).toString(32) + a, t = "_" + t + "R_" + a, a = Rr++, 0 < a && (t += "H" + a.toString(32)), t += "_";
      } else
        a = sy++, t = "_" + t + "r_" + a.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: sc,
    useFormState: Wm,
    useActionState: Wm,
    useOptimistic: function(e) {
      var t = kt();
      t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = a, t = cc.bind(
        null,
        be,
        !0,
        a
      ), a.dispatch = t, [e, t];
    },
    useMemoCache: Ws,
    useCacheRefresh: function() {
      return kt().memoizedState = _y.bind(
        null,
        be
      );
    },
    useEffectEvent: function(e) {
      var t = kt(), a = { impl: e };
      return t.memoizedState = a, function() {
        if ((Re & 2) !== 0)
          throw Error(l(440));
        return a.impl.apply(void 0, arguments);
      };
    }
  }, uc = {
    readContext: pt,
    use: jr,
    useCallback: df,
    useContext: pt,
    useEffect: ic,
    useImperativeHandle: uf,
    useInsertionEffect: lf,
    useLayoutEffect: sf,
    useMemo: mf,
    useReducer: Lr,
    useRef: af,
    useState: function() {
      return Lr(Mn);
    },
    useDebugValue: oc,
    useDeferredValue: function(e, t) {
      var a = et();
      return ff(
        a,
        Ye.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Lr(Mn)[0], t = et().memoizedState;
      return [
        typeof e == "boolean" ? e : go(e),
        t
      ];
    },
    useSyncExternalStore: Bm,
    useId: hf,
    useHostTransitionStatus: sc,
    useFormState: ef,
    useActionState: ef,
    useOptimistic: function(e, t) {
      var a = et();
      return $m(a, Ye, e, t);
    },
    useMemoCache: Ws,
    useCacheRefresh: vf
  };
  uc.useEffectEvent = rf;
  var Ef = {
    readContext: pt,
    use: jr,
    useCallback: df,
    useContext: pt,
    useEffect: ic,
    useImperativeHandle: uf,
    useInsertionEffect: lf,
    useLayoutEffect: sf,
    useMemo: mf,
    useReducer: tc,
    useRef: af,
    useState: function() {
      return tc(Mn);
    },
    useDebugValue: oc,
    useDeferredValue: function(e, t) {
      var a = et();
      return Ye === null ? rc(a, e, t) : ff(
        a,
        Ye.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = tc(Mn)[0], t = et().memoizedState;
      return [
        typeof e == "boolean" ? e : go(e),
        t
      ];
    },
    useSyncExternalStore: Bm,
    useId: hf,
    useHostTransitionStatus: sc,
    useFormState: nf,
    useActionState: nf,
    useOptimistic: function(e, t) {
      var a = et();
      return Ye !== null ? $m(a, Ye, e, t) : (a.baseState = e, [e, a.queue.dispatch]);
    },
    useMemoCache: Ws,
    useCacheRefresh: vf
  };
  Ef.useEffectEvent = rf;
  function dc(e, t, a, r) {
    t = e.memoizedState, a = a(r, t), a = a == null ? t : y({}, t, a), e.memoizedState = a, e.lanes === 0 && (e.updateQueue.baseState = a);
  }
  var mc = {
    enqueueSetState: function(e, t, a) {
      e = e._reactInternals;
      var r = qt(), c = ta(r);
      c.payload = t, a != null && (c.callback = a), t = na(e, c, r), t !== null && (Rt(t, e, r), mo(t, e, r));
    },
    enqueueReplaceState: function(e, t, a) {
      e = e._reactInternals;
      var r = qt(), c = ta(r);
      c.tag = 1, c.payload = t, a != null && (c.callback = a), t = na(e, c, r), t !== null && (Rt(t, e, r), mo(t, e, r));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var a = qt(), r = ta(a);
      r.tag = 2, t != null && (r.callback = t), t = na(e, r, a), t !== null && (Rt(t, e, a), mo(t, e, a));
    }
  };
  function wf(e, t, a, r, c, u, h) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, u, h) : t.prototype && t.prototype.isPureReactComponent ? !ao(a, r) || !ao(c, u) : !0;
  }
  function Tf(e, t, a, r) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, r), t.state !== e && mc.enqueueReplaceState(t, t.state, null);
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
  function xf(e) {
    hr(e);
  }
  function zf(e) {
    console.error(e);
  }
  function Af(e) {
    hr(e);
  }
  function Zr(e, t) {
    try {
      var a = e.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (r) {
      setTimeout(function() {
        throw r;
      });
    }
  }
  function Nf(e, t, a) {
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
  function fc(e, t, a) {
    return a = ta(a), a.tag = 3, a.payload = { element: null }, a.callback = function() {
      Zr(e, t);
    }, a;
  }
  function Cf(e) {
    return e = ta(e), e.tag = 3, e;
  }
  function Of(e, t, a, r) {
    var c = a.type.getDerivedStateFromError;
    if (typeof c == "function") {
      var u = r.value;
      e.payload = function() {
        return c(u);
      }, e.callback = function() {
        Nf(t, a, r);
      };
    }
    var h = a.stateNode;
    h !== null && typeof h.componentDidCatch == "function" && (e.callback = function() {
      Nf(t, a, r), typeof c != "function" && (sa === null ? sa = /* @__PURE__ */ new Set([this]) : sa.add(this));
      var b = r.stack;
      this.componentDidCatch(r.value, {
        componentStack: b !== null ? b : ""
      });
    });
  }
  function gy(e, t, a, r, c) {
    if (a.flags |= 32768, r !== null && typeof r == "object" && typeof r.then == "function") {
      if (t = a.alternate, t !== null && _i(
        t,
        a,
        c,
        !0
      ), a = Zt.current, a !== null) {
        switch (a.tag) {
          case 31:
          case 13:
            return tn === null ? Jr() : a.alternate === null && Fe === 0 && (Fe = 3), a.flags &= -257, a.flags |= 65536, a.lanes = c, r === zr ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), Yc(e, r, c)), !1;
          case 22:
            return a.flags |= 65536, r === zr ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([r])
            }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : a.add(r)), Yc(e, r, c)), !1;
        }
        throw Error(l(435, a.tag));
      }
      return Yc(e, r, c), Jr(), !1;
    }
    if (xe)
      return t = Zt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = c, r !== Ms && (e = Error(l(422), { cause: r }), ro(Qt(e, a)))) : (r !== Ms && (t = Error(l(423), {
        cause: r
      }), ro(
        Qt(t, a)
      )), e = e.current.alternate, e.flags |= 65536, c &= -c, e.lanes |= c, r = Qt(r, a), c = fc(
        e.stateNode,
        r,
        c
      ), Ks(e, c), Fe !== 4 && (Fe = 2)), !1;
    var u = Error(l(520), { cause: r });
    if (u = Qt(u, a), xo === null ? xo = [u] : xo.push(u), Fe !== 4 && (Fe = 2), t === null) return !0;
    r = Qt(r, a), a = t;
    do {
      switch (a.tag) {
        case 3:
          return a.flags |= 65536, e = c & -c, a.lanes |= e, e = fc(a.stateNode, r, e), Ks(a, e), !1;
        case 1:
          if (t = a.type, u = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (sa === null || !sa.has(u))))
            return a.flags |= 65536, c &= -c, a.lanes |= c, c = Cf(c), Of(
              c,
              e,
              a,
              r
            ), Ks(a, c), !1;
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var _c = Error(l(461)), it = !1;
  function gt(e, t, a, r) {
    t.child = e === null ? Dm(t, null, a, r) : Za(
      t,
      e.child,
      a,
      r
    );
  }
  function Mf(e, t, a, r, c) {
    a = a.render;
    var u = t.ref;
    if ("ref" in r) {
      var h = {};
      for (var b in r)
        b !== "ref" && (h[b] = r[b]);
    } else h = r;
    return La(t), r = Is(
      e,
      t,
      a,
      h,
      u,
      c
    ), b = Fs(), e !== null && !it ? (Qs(e, t, c), Rn(e, t, c)) : (xe && b && Cs(t), t.flags |= 1, gt(e, t, r, c), t.child);
  }
  function Rf(e, t, a, r, c) {
    if (e === null) {
      var u = a.type;
      return typeof u == "function" && !zs(u) && u.defaultProps === void 0 && a.compare === null ? (t.tag = 15, t.type = u, Df(
        e,
        t,
        u,
        r,
        c
      )) : (e = Sr(
        a.type,
        null,
        r,
        t,
        t.mode,
        c
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (u = e.child, !kc(e, c)) {
      var h = u.memoizedProps;
      if (a = a.compare, a = a !== null ? a : ao, a(h, r) && e.ref === t.ref)
        return Rn(e, t, c);
    }
    return t.flags |= 1, e = zn(u, r), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Df(e, t, a, r, c) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (ao(u, r) && e.ref === t.ref)
        if (it = !1, t.pendingProps = r = u, kc(e, c))
          (e.flags & 131072) !== 0 && (it = !0);
        else
          return t.lanes = e.lanes, Rn(e, t, c);
    }
    return pc(
      e,
      t,
      a,
      r,
      c
    );
  }
  function jf(e, t, a, r) {
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
        return Lf(
          e,
          t,
          u,
          a,
          r
        );
      }
      if ((a & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Tr(
          t,
          u !== null ? u.cachePool : null
        ), u !== null ? Um(t, u) : Vs(), Ym(t);
      else
        return r = t.lanes = 536870912, Lf(
          e,
          t,
          u !== null ? u.baseLanes | a : a,
          a,
          r
        );
    } else
      u !== null ? (Tr(t, u.cachePool), Um(t, u), ia(), t.memoizedState = null) : (e !== null && Tr(t, null), Vs(), ia());
    return gt(e, t, c, a), t.child;
  }
  function yo(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Lf(e, t, a, r, c) {
    var u = Hs();
    return u = u === null ? null : { parent: nt._currentValue, pool: u }, t.memoizedState = {
      baseLanes: a,
      cachePool: u
    }, e !== null && Tr(t, null), Vs(), Ym(t), e !== null && _i(e, t, r, !0), t.childLanes = c, null;
  }
  function Br(e, t) {
    return t = Kr(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Uf(e, t, a) {
    return Za(t, e.child, null, a), e = Br(t, t.pendingProps), e.flags |= 2, Bt(t), t.memoizedState = null, e;
  }
  function hy(e, t, a) {
    var r = t.pendingProps, c = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (xe) {
        if (r.mode === "hidden")
          return e = Br(t, r), t.lanes = 536870912, yo(null, e);
        if ($s(t), (e = qe) ? (e = I_(
          e,
          en
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Fn !== null ? { id: yn, overflow: bn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = ym(e), a.return = t, t.child = a, _t = t, qe = null)) : e = null, e === null) throw Jn(t);
        return t.lanes = 536870912, null;
      }
      return Br(t, r);
    }
    var u = e.memoizedState;
    if (u !== null) {
      var h = u.dehydrated;
      if ($s(t), c)
        if (t.flags & 256)
          t.flags &= -257, t = Uf(
            e,
            t,
            a
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(l(558));
      else if (it || _i(e, t, a, !1), c = (a & e.childLanes) !== 0, it || c) {
        if (r = Be, r !== null && (h = xd(r, a), h !== 0 && h !== u.retryLane))
          throw u.retryLane = h, Ma(e, h), Rt(r, e, h), _c;
        Jr(), t = Uf(
          e,
          t,
          a
        );
      } else
        e = u.treeContext, qe = nn(h.nextSibling), _t = t, xe = !0, Qn = null, en = !1, e !== null && km(t, e), t = Br(t, r), t.flags |= 4096;
      return t;
    }
    return e = zn(e.child, {
      mode: r.mode,
      children: r.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Gr(e, t) {
    var a = t.ref;
    if (a === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object")
        throw Error(l(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function pc(e, t, a, r, c) {
    return La(t), a = Is(
      e,
      t,
      a,
      r,
      void 0,
      c
    ), r = Fs(), e !== null && !it ? (Qs(e, t, c), Rn(e, t, c)) : (xe && r && Cs(t), t.flags |= 1, gt(e, t, a, c), t.child);
  }
  function Yf(e, t, a, r, c, u) {
    return La(t), t.updateQueue = null, a = Zm(
      t,
      r,
      a,
      c
    ), Hm(e), r = Fs(), e !== null && !it ? (Qs(e, t, u), Rn(e, t, u)) : (xe && r && Cs(t), t.flags |= 1, gt(e, t, a, u), t.child);
  }
  function Hf(e, t, a, r, c) {
    if (La(t), t.stateNode === null) {
      var u = ui, h = a.contextType;
      typeof h == "object" && h !== null && (u = pt(h)), u = new a(r, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = mc, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = r, u.state = t.memoizedState, u.refs = {}, Bs(t), h = a.contextType, u.context = typeof h == "object" && h !== null ? pt(h) : ui, u.state = t.memoizedState, h = a.getDerivedStateFromProps, typeof h == "function" && (dc(
        t,
        a,
        h,
        r
      ), u.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (h = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), h !== u.state && mc.enqueueReplaceState(u, u.state, null), _o(t, r, u, c), fo(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
    } else if (e === null) {
      u = t.stateNode;
      var b = t.memoizedProps, w = Ga(a, b);
      u.props = w;
      var M = u.context, B = a.contextType;
      h = ui, typeof B == "object" && B !== null && (h = pt(B));
      var q = a.getDerivedStateFromProps;
      B = typeof q == "function" || typeof u.getSnapshotBeforeUpdate == "function", b = t.pendingProps !== b, B || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (b || M !== h) && Tf(
        t,
        u,
        r,
        h
      ), ea = !1;
      var j = t.memoizedState;
      u.state = j, _o(t, r, u, c), fo(), M = t.memoizedState, b || j !== M || ea ? (typeof q == "function" && (dc(
        t,
        a,
        q,
        r
      ), M = t.memoizedState), (w = ea || wf(
        t,
        a,
        w,
        r,
        j,
        M,
        h
      )) ? (B || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = M), u.props = r, u.state = M, u.context = h, r = w) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
    } else {
      u = t.stateNode, Gs(e, t), h = t.memoizedProps, B = Ga(a, h), u.props = B, q = t.pendingProps, j = u.context, M = a.contextType, w = ui, typeof M == "object" && M !== null && (w = pt(M)), b = a.getDerivedStateFromProps, (M = typeof b == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (h !== q || j !== w) && Tf(
        t,
        u,
        r,
        w
      ), ea = !1, j = t.memoizedState, u.state = j, _o(t, r, u, c), fo();
      var U = t.memoizedState;
      h !== q || j !== U || ea || e !== null && e.dependencies !== null && Er(e.dependencies) ? (typeof b == "function" && (dc(
        t,
        a,
        b,
        r
      ), U = t.memoizedState), (B = ea || wf(
        t,
        a,
        B,
        r,
        j,
        U,
        w
      ) || e !== null && e.dependencies !== null && Er(e.dependencies)) ? (M || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(r, U, w), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        r,
        U,
        w
      )), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || h === e.memoizedProps && j === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || h === e.memoizedProps && j === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = U), u.props = r, u.state = U, u.context = w, r = B) : (typeof u.componentDidUpdate != "function" || h === e.memoizedProps && j === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || h === e.memoizedProps && j === e.memoizedState || (t.flags |= 1024), r = !1);
    }
    return u = r, Gr(e, t), r = (t.flags & 128) !== 0, u || r ? (u = t.stateNode, a = r && typeof a.getDerivedStateFromError != "function" ? null : u.render(), t.flags |= 1, e !== null && r ? (t.child = Za(
      t,
      e.child,
      null,
      c
    ), t.child = Za(
      t,
      null,
      a,
      c
    )) : gt(e, t, a, c), t.memoizedState = u.state, e = t.child) : e = Rn(
      e,
      t,
      c
    ), e;
  }
  function Zf(e, t, a, r) {
    return Da(), t.flags |= 256, gt(e, t, a, r), t.child;
  }
  var gc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function hc(e) {
    return { baseLanes: e, cachePool: Am() };
  }
  function vc(e, t, a) {
    return e = e !== null ? e.childLanes & ~a : 0, t && (e |= Kt), e;
  }
  function Bf(e, t, a) {
    var r = t.pendingProps, c = !1, u = (t.flags & 128) !== 0, h;
    if ((h = u) || (h = e !== null && e.memoizedState === null ? !1 : (We.current & 2) !== 0), h && (c = !0, t.flags &= -129), h = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (xe) {
        if (c ? aa(t) : ia(), (e = qe) ? (e = I_(
          e,
          en
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Fn !== null ? { id: yn, overflow: bn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = ym(e), a.return = t, t.child = a, _t = t, qe = null)) : e = null, e === null) throw Jn(t);
        return eu(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var b = r.children;
      return r = r.fallback, c ? (ia(), c = t.mode, b = Kr(
        { mode: "hidden", children: b },
        c
      ), r = Ra(
        r,
        c,
        a,
        null
      ), b.return = t, r.return = t, b.sibling = r, t.child = b, r = t.child, r.memoizedState = hc(a), r.childLanes = vc(
        e,
        h,
        a
      ), t.memoizedState = gc, yo(null, r)) : (aa(t), yc(t, b));
    }
    var w = e.memoizedState;
    if (w !== null && (b = w.dehydrated, b !== null)) {
      if (u)
        t.flags & 256 ? (aa(t), t.flags &= -257, t = bc(
          e,
          t,
          a
        )) : t.memoizedState !== null ? (ia(), t.child = e.child, t.flags |= 128, t = null) : (ia(), b = r.fallback, c = t.mode, r = Kr(
          { mode: "visible", children: r.children },
          c
        ), b = Ra(
          b,
          c,
          a,
          null
        ), b.flags |= 2, r.return = t, b.return = t, r.sibling = b, t.child = r, Za(
          t,
          e.child,
          null,
          a
        ), r = t.child, r.memoizedState = hc(a), r.childLanes = vc(
          e,
          h,
          a
        ), t.memoizedState = gc, t = yo(null, r));
      else if (aa(t), eu(b)) {
        if (h = b.nextSibling && b.nextSibling.dataset, h) var M = h.dgst;
        h = M, r = Error(l(419)), r.stack = "", r.digest = h, ro({ value: r, source: null, stack: null }), t = bc(
          e,
          t,
          a
        );
      } else if (it || _i(e, t, a, !1), h = (a & e.childLanes) !== 0, it || h) {
        if (h = Be, h !== null && (r = xd(h, a), r !== 0 && r !== w.retryLane))
          throw w.retryLane = r, Ma(e, r), Rt(h, e, r), _c;
        Wc(b) || Jr(), t = bc(
          e,
          t,
          a
        );
      } else
        Wc(b) ? (t.flags |= 192, t.child = e.child, t = null) : (e = w.treeContext, qe = nn(
          b.nextSibling
        ), _t = t, xe = !0, Qn = null, en = !1, e !== null && km(t, e), t = yc(
          t,
          r.children
        ), t.flags |= 4096);
      return t;
    }
    return c ? (ia(), b = r.fallback, c = t.mode, w = e.child, M = w.sibling, r = zn(w, {
      mode: "hidden",
      children: r.children
    }), r.subtreeFlags = w.subtreeFlags & 65011712, M !== null ? b = zn(
      M,
      b
    ) : (b = Ra(
      b,
      c,
      a,
      null
    ), b.flags |= 2), b.return = t, r.return = t, r.sibling = b, t.child = r, yo(null, r), r = t.child, b = e.child.memoizedState, b === null ? b = hc(a) : (c = b.cachePool, c !== null ? (w = nt._currentValue, c = c.parent !== w ? { parent: w, pool: w } : c) : c = Am(), b = {
      baseLanes: b.baseLanes | a,
      cachePool: c
    }), r.memoizedState = b, r.childLanes = vc(
      e,
      h,
      a
    ), t.memoizedState = gc, yo(e.child, r)) : (aa(t), a = e.child, e = a.sibling, a = zn(a, {
      mode: "visible",
      children: r.children
    }), a.return = t, a.sibling = null, e !== null && (h = t.deletions, h === null ? (t.deletions = [e], t.flags |= 16) : h.push(e)), t.child = a, t.memoizedState = null, a);
  }
  function yc(e, t) {
    return t = Kr(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Kr(e, t) {
    return e = Ht(22, e, null, t), e.lanes = 0, e;
  }
  function bc(e, t, a) {
    return Za(t, e.child, null, a), e = yc(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Gf(e, t, a) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), js(e.return, t, a);
  }
  function Sc(e, t, a, r, c, u) {
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
  function Kf(e, t, a) {
    var r = t.pendingProps, c = r.revealOrder, u = r.tail;
    r = r.children;
    var h = We.current, b = (h & 2) !== 0;
    if (b ? (h = h & 1 | 2, t.flags |= 128) : h &= 1, P(We, h), gt(e, t, r, a), r = xe ? oo : 0, !b && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Gf(e, a, t);
        else if (e.tag === 19)
          Gf(e, a, t);
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
          e = a.alternate, e !== null && Or(e) === null && (c = a), a = a.sibling;
        a = c, a === null ? (c = t.child, t.child = null) : (c = a.sibling, a.sibling = null), Sc(
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
          if (e = c.alternate, e !== null && Or(e) === null) {
            t.child = c;
            break;
          }
          e = c.sibling, c.sibling = a, a = c, c = e;
        }
        Sc(
          t,
          !0,
          a,
          null,
          u,
          r
        );
        break;
      case "together":
        Sc(
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
    if (e !== null && (t.dependencies = e.dependencies), la |= t.lanes, (a & t.childLanes) === 0)
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
  function kc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Er(e)));
  }
  function vy(e, t, a) {
    switch (t.tag) {
      case 3:
        Ge(t, t.stateNode.containerInfo), Wn(t, nt, e.memoizedState.cache), Da();
        break;
      case 27:
      case 5:
        vt(t);
        break;
      case 4:
        Ge(t, t.stateNode.containerInfo);
        break;
      case 10:
        Wn(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, $s(t), null;
        break;
      case 13:
        var r = t.memoizedState;
        if (r !== null)
          return r.dehydrated !== null ? (aa(t), t.flags |= 128, null) : (a & t.child.childLanes) !== 0 ? Bf(e, t, a) : (aa(t), e = Rn(
            e,
            t,
            a
          ), e !== null ? e.sibling : null);
        aa(t);
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
            return Kf(
              e,
              t,
              a
            );
          t.flags |= 128;
        }
        if (c = t.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), P(We, We.current), r) break;
        return null;
      case 22:
        return t.lanes = 0, jf(
          e,
          t,
          a,
          t.pendingProps
        );
      case 24:
        Wn(t, nt, e.memoizedState.cache);
    }
    return Rn(e, t, a);
  }
  function qf(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        it = !0;
      else {
        if (!kc(e, a) && (t.flags & 128) === 0)
          return it = !1, vy(
            e,
            t,
            a
          );
        it = (e.flags & 131072) !== 0;
      }
    else
      it = !1, xe && (t.flags & 1048576) !== 0 && Sm(t, oo, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var r = t.pendingProps;
          if (e = Ya(t.elementType), t.type = e, typeof e == "function")
            zs(e) ? (r = Ga(e, r), t.tag = 1, t = Hf(
              null,
              t,
              e,
              r,
              a
            )) : (t.tag = 0, t = pc(
              null,
              t,
              e,
              r,
              a
            ));
          else {
            if (e != null) {
              var c = e.$$typeof;
              if (c === H) {
                t.tag = 11, t = Mf(
                  null,
                  t,
                  e,
                  r,
                  a
                );
                break e;
              } else if (c === $) {
                t.tag = 14, t = Rf(
                  null,
                  t,
                  e,
                  r,
                  a
                );
                break e;
              }
            }
            throw t = ee(e) || e, Error(l(306, t, ""));
          }
        }
        return t;
      case 0:
        return pc(
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
        ), Hf(
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
          c = u.element, Gs(e, t), _o(t, r, null, a);
          var h = t.memoizedState;
          if (r = h.cache, Wn(t, nt, r), r !== u.cache && Ls(
            t,
            [nt],
            a,
            !0
          ), fo(), r = h.element, u.isDehydrated)
            if (u = {
              element: r,
              isDehydrated: !1,
              cache: h.cache
            }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
              t = Zf(
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
              ), ro(c), t = Zf(
                e,
                t,
                r,
                a
              );
              break e;
            } else
              for (e = t.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, qe = nn(e.firstChild), _t = t, xe = !0, Qn = null, en = !0, a = Dm(
                t,
                null,
                r,
                a
              ), t.child = a; a; )
                a.flags = a.flags & -3 | 4096, a = a.sibling;
          else {
            if (Da(), r === c) {
              t = Rn(
                e,
                t,
                a
              );
              break e;
            }
            gt(e, t, r, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return Gr(e, t), e === null ? (a = tp(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = a : xe || (a = t.type, e = t.pendingProps, r = ol(
          fe.current
        ).createElement(a), r[ft] = t, r[zt] = e, ht(r, a, e), dt(r), t.stateNode = r) : t.memoizedState = tp(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return vt(t), e === null && xe && (r = t.stateNode = J_(
          t.type,
          t.pendingProps,
          fe.current
        ), _t = t, en = !0, c = qe, ma(t.type) ? (tu = c, qe = nn(r.firstChild)) : qe = c), gt(
          e,
          t,
          t.pendingProps.children,
          a
        ), Gr(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && xe && ((c = r = qe) && (r = Py(
          r,
          t.type,
          t.pendingProps,
          en
        ), r !== null ? (t.stateNode = r, _t = t, qe = nn(r.firstChild), en = !1, c = !0) : c = !1), c || Jn(t)), vt(t), c = t.type, u = t.pendingProps, h = e !== null ? e.memoizedProps : null, r = u.children, Fc(c, u) ? r = null : h !== null && Fc(c, h) && (t.flags |= 32), t.memoizedState !== null && (c = Is(
          e,
          t,
          cy,
          null,
          null,
          a
        ), Do._currentValue = c), Gr(e, t), gt(e, t, r, a), t.child;
      case 6:
        return e === null && xe && ((e = a = qe) && (a = Iy(
          a,
          t.pendingProps,
          en
        ), a !== null ? (t.stateNode = a, _t = t, qe = null, e = !0) : e = !1), e || Jn(t)), null;
      case 13:
        return Bf(e, t, a);
      case 4:
        return Ge(
          t,
          t.stateNode.containerInfo
        ), r = t.pendingProps, e === null ? t.child = Za(
          t,
          null,
          r,
          a
        ) : gt(e, t, r, a), t.child;
      case 11:
        return Mf(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 7:
        return gt(
          e,
          t,
          t.pendingProps,
          a
        ), t.child;
      case 8:
        return gt(
          e,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 12:
        return gt(
          e,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 10:
        return r = t.pendingProps, Wn(t, t.type, r.value), gt(e, t, r.children, a), t.child;
      case 9:
        return c = t.type._context, r = t.pendingProps.children, La(t), c = pt(c), r = r(c), t.flags |= 1, gt(e, t, r, a), t.child;
      case 14:
        return Rf(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 15:
        return Df(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 19:
        return Kf(e, t, a);
      case 31:
        return hy(e, t, a);
      case 22:
        return jf(
          e,
          t,
          a,
          t.pendingProps
        );
      case 24:
        return La(t), r = pt(nt), e === null ? (c = Hs(), c === null && (c = Be, u = Us(), c.pooledCache = u, u.refCount++, u !== null && (c.pooledCacheLanes |= a), c = u), t.memoizedState = { parent: r, cache: c }, Bs(t), Wn(t, nt, c)) : ((e.lanes & a) !== 0 && (Gs(e, t), _o(t, null, null, a), fo()), c = e.memoizedState, u = t.memoizedState, c.parent !== r ? (c = { parent: r, cache: r }, t.memoizedState = c, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = c), Wn(t, nt, r)) : (r = u.cache, Wn(t, nt, r), r !== c.cache && Ls(
          t,
          [nt],
          a,
          !0
        ))), gt(
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
  function Dn(e) {
    e.flags |= 4;
  }
  function Ec(e, t, a, r, c) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (c & 335544128) === c)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (h_()) e.flags |= 8192;
        else
          throw Ha = zr, Zs;
    } else e.flags &= -16777217;
  }
  function Vf(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !rp(t))
      if (h_()) e.flags |= 8192;
      else
        throw Ha = zr, Zs;
  }
  function qr(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Ed() : 536870912, e.lanes |= t, xi |= t);
  }
  function bo(e, t) {
    if (!xe)
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
  function yy(e, t, a) {
    var r = t.pendingProps;
    switch (Os(t), t.tag) {
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
        return a = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Cn(nt), Ne(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (e === null || e.child === null) && (fi(t) ? Dn(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Rs())), Ve(t), null;
      case 26:
        var c = t.type, u = t.memoizedState;
        return e === null ? (Dn(t), u !== null ? (Ve(t), Vf(t, u)) : (Ve(t), Ec(
          t,
          c,
          null,
          r,
          a
        ))) : u ? u !== e.memoizedState ? (Dn(t), Ve(t), Vf(t, u)) : (Ve(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== r && Dn(t), Ve(t), Ec(
          t,
          c,
          e,
          r,
          a
        )), null;
      case 27:
        if (jt(t), a = fe.current, c = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== r && Dn(t);
        else {
          if (!r) {
            if (t.stateNode === null)
              throw Error(l(166));
            return Ve(t), null;
          }
          e = te.current, fi(t) ? Em(t) : (e = J_(c, r, a), t.stateNode = e, Dn(t));
        }
        return Ve(t), null;
      case 5:
        if (jt(t), c = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== r && Dn(t);
        else {
          if (!r) {
            if (t.stateNode === null)
              throw Error(l(166));
            return Ve(t), null;
          }
          if (u = te.current, fi(t))
            Em(t);
          else {
            var h = ol(
              fe.current
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
            u[ft] = t, u[zt] = r;
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
            e: switch (ht(u, c, r), c) {
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
            r && Dn(t);
          }
        }
        return Ve(t), Ec(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          a
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== r && Dn(t);
        else {
          if (typeof r != "string" && t.stateNode === null)
            throw Error(l(166));
          if (e = fe.current, fi(t)) {
            if (e = t.stateNode, a = t.memoizedProps, r = null, c = _t, c !== null)
              switch (c.tag) {
                case 27:
                case 5:
                  r = c.memoizedProps;
              }
            e[ft] = t, e = !!(e.nodeValue === a || r !== null && r.suppressHydrationWarning === !0 || B_(e.nodeValue, a)), e || Jn(t, !0);
          } else
            e = ol(e).createTextNode(
              r
            ), e[ft] = t, t.stateNode = e;
        }
        return Ve(t), null;
      case 31:
        if (a = t.memoizedState, e === null || e.memoizedState !== null) {
          if (r = fi(t), a !== null) {
            if (e === null) {
              if (!r) throw Error(l(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(557));
              e[ft] = t;
            } else
              Da(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ve(t), e = !1;
          } else
            a = Rs(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), e = !0;
          if (!e)
            return t.flags & 256 ? (Bt(t), t) : (Bt(t), null);
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
              c[ft] = t;
            } else
              Da(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ve(t), c = !1;
          } else
            c = Rs(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = c), c = !0;
          if (!c)
            return t.flags & 256 ? (Bt(t), t) : (Bt(t), null);
        }
        return Bt(t), (t.flags & 128) !== 0 ? (t.lanes = a, t) : (a = r !== null, e = e !== null && e.memoizedState !== null, a && (r = t.child, c = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (c = r.alternate.memoizedState.cachePool.pool), u = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (u = r.memoizedState.cachePool.pool), u !== c && (r.flags |= 2048)), a !== e && a && (t.child.flags |= 8192), qr(t, t.updateQueue), Ve(t), null);
      case 4:
        return Ne(), e === null && Vc(t.stateNode.containerInfo), Ve(t), null;
      case 10:
        return Cn(t.type), Ve(t), null;
      case 19:
        if (Z(We), r = t.memoizedState, r === null) return Ve(t), null;
        if (c = (t.flags & 128) !== 0, u = r.rendering, u === null)
          if (c) bo(r, !1);
          else {
            if (Fe !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (u = Or(e), u !== null) {
                  for (t.flags |= 128, bo(r, !1), e = u.updateQueue, t.updateQueue = e, qr(t, e), t.subtreeFlags = 0, e = a, a = t.child; a !== null; )
                    vm(a, e), a = a.sibling;
                  return P(
                    We,
                    We.current & 1 | 2
                  ), xe && An(t, r.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            r.tail !== null && St() > Ir && (t.flags |= 128, c = !0, bo(r, !1), t.lanes = 4194304);
          }
        else {
          if (!c)
            if (e = Or(u), e !== null) {
              if (t.flags |= 128, c = !0, e = e.updateQueue, t.updateQueue = e, qr(t, e), bo(r, !0), r.tail === null && r.tailMode === "hidden" && !u.alternate && !xe)
                return Ve(t), null;
            } else
              2 * St() - r.renderingStartTime > Ir && a !== 536870912 && (t.flags |= 128, c = !0, bo(r, !1), t.lanes = 4194304);
          r.isBackwards ? (u.sibling = t.child, t.child = u) : (e = r.last, e !== null ? e.sibling = u : t.child = u, r.last = u);
        }
        return r.tail !== null ? (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = St(), e.sibling = null, a = We.current, P(
          We,
          c ? a & 1 | 2 : a & 1
        ), xe && An(t, r.treeForkCount), e) : (Ve(t), null);
      case 22:
      case 23:
        return Bt(t), Xs(), r = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== r && (t.flags |= 8192) : r && (t.flags |= 8192), r ? (a & 536870912) !== 0 && (t.flags & 128) === 0 && (Ve(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ve(t), a = t.updateQueue, a !== null && qr(t, a.retryQueue), a = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== a && (t.flags |= 2048), e !== null && Z(Ua), null;
      case 24:
        return a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Cn(nt), Ve(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(l(156, t.tag));
  }
  function by(e, t) {
    switch (Os(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Cn(nt), Ne(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return jt(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Bt(t), t.alternate === null)
            throw Error(l(340));
          Da();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (Bt(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(l(340));
          Da();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return Z(We), null;
      case 4:
        return Ne(), null;
      case 10:
        return Cn(t.type), null;
      case 22:
      case 23:
        return Bt(t), Xs(), e !== null && Z(Ua), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return Cn(nt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Xf(e, t) {
    switch (Os(t), t.tag) {
      case 3:
        Cn(nt), Ne();
        break;
      case 26:
      case 27:
      case 5:
        jt(t);
        break;
      case 4:
        Ne();
        break;
      case 31:
        t.memoizedState !== null && Bt(t);
        break;
      case 13:
        Bt(t);
        break;
      case 19:
        Z(We);
        break;
      case 10:
        Cn(t.type);
        break;
      case 22:
      case 23:
        Bt(t), Xs(), e !== null && Z(Ua);
        break;
      case 24:
        Cn(nt);
    }
  }
  function So(e, t) {
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
  function oa(e, t, a) {
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
              var w = a, M = b;
              try {
                M();
              } catch (B) {
                Le(
                  c,
                  w,
                  B
                );
              }
            }
          }
          r = r.next;
        } while (r !== u);
      }
    } catch (B) {
      Le(t, t.return, B);
    }
  }
  function $f(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        Lm(t, a);
      } catch (r) {
        Le(e, e.return, r);
      }
    }
  }
  function Pf(e, t, a) {
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
  function ko(e, t) {
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
  function If(e) {
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
  function wc(e, t, a) {
    try {
      var r = e.stateNode;
      Gy(r, e.type, a, t), r[zt] = t;
    } catch (c) {
      Le(e, e.return, c);
    }
  }
  function Ff(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && ma(e.type) || e.tag === 4;
  }
  function Tc(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Ff(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && ma(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function xc(e, t, a) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(e, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(e), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = Tn));
    else if (r !== 4 && (r === 27 && ma(e.type) && (a = e.stateNode, t = null), e = e.child, e !== null))
      for (xc(e, t, a), e = e.sibling; e !== null; )
        xc(e, t, a), e = e.sibling;
  }
  function Vr(e, t, a) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, t ? a.insertBefore(e, t) : a.appendChild(e);
    else if (r !== 4 && (r === 27 && ma(e.type) && (a = e.stateNode), e = e.child, e !== null))
      for (Vr(e, t, a), e = e.sibling; e !== null; )
        Vr(e, t, a), e = e.sibling;
  }
  function Qf(e) {
    var t = e.stateNode, a = e.memoizedProps;
    try {
      for (var r = e.type, c = t.attributes; c.length; )
        t.removeAttributeNode(c[0]);
      ht(t, r, a), t[ft] = e, t[zt] = a;
    } catch (u) {
      Le(e, e.return, u);
    }
  }
  var jn = !1, ot = !1, zc = !1, Jf = typeof WeakSet == "function" ? WeakSet : Set, mt = null;
  function Sy(e, t) {
    if (e = e.containerInfo, Pc = ml, e = cm(e), bs(e)) {
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
            var h = 0, b = -1, w = -1, M = 0, B = 0, q = e, j = null;
            t: for (; ; ) {
              for (var U; q !== a || c !== 0 && q.nodeType !== 3 || (b = h + c), q !== u || r !== 0 && q.nodeType !== 3 || (w = h + r), q.nodeType === 3 && (h += q.nodeValue.length), (U = q.firstChild) !== null; )
                j = q, q = U;
              for (; ; ) {
                if (q === e) break t;
                if (j === a && ++M === c && (b = h), j === u && ++B === r && (w = h), (U = q.nextSibling) !== null) break;
                q = j, j = q.parentNode;
              }
              q = U;
            }
            a = b === -1 || w === -1 ? null : { start: b, end: w };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Ic = { focusedElem: e, selectionRange: a }, ml = !1, mt = t; mt !== null; )
      if (t = mt, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, mt = e;
      else
        for (; mt !== null; ) {
          switch (t = mt, u = t.alternate, e = t.flags, t.tag) {
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
                } catch (_e) {
                  Le(
                    a,
                    a.return,
                    _e
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, a = e.nodeType, a === 9)
                  Jc(e);
                else if (a === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Jc(e);
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
            e.return = t.return, mt = e;
            break;
          }
          mt = t.return;
        }
  }
  function Wf(e, t, a) {
    var r = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        Un(e, a), r & 4 && So(5, a);
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
        r & 64 && $f(a), r & 512 && ko(a, a.return);
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
            Lm(e, t);
          } catch (h) {
            Le(a, a.return, h);
          }
        }
        break;
      case 27:
        t === null && r & 4 && Qf(a);
      case 26:
      case 5:
        Un(e, a), t === null && r & 4 && If(a), r & 512 && ko(a, a.return);
        break;
      case 12:
        Un(e, a);
        break;
      case 31:
        Un(e, a), r & 4 && n_(e, a);
        break;
      case 13:
        Un(e, a), r & 4 && a_(e, a), r & 64 && (e = a.memoizedState, e !== null && (e = e.dehydrated, e !== null && (a = Cy.bind(
          null,
          a
        ), Fy(e, a))));
        break;
      case 22:
        if (r = a.memoizedState !== null || jn, !r) {
          t = t !== null && t.memoizedState !== null || ot, c = jn;
          var u = ot;
          jn = r, (ot = t) && !u ? Yn(
            e,
            a,
            (a.subtreeFlags & 8772) !== 0
          ) : Un(e, a), jn = c, ot = u;
        }
        break;
      case 30:
        break;
      default:
        Un(e, a);
    }
  }
  function e_(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, e_(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && as(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Xe = null, Nt = !1;
  function Ln(e, t, a) {
    for (a = a.child; a !== null; )
      t_(e, t, a), a = a.sibling;
  }
  function t_(e, t, a) {
    if (Lt && typeof Lt.onCommitFiberUnmount == "function")
      try {
        Lt.onCommitFiberUnmount(mn, a);
      } catch {
      }
    switch (a.tag) {
      case 26:
        ot || Sn(a, t), Ln(
          e,
          t,
          a
        ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
        break;
      case 27:
        ot || Sn(a, t);
        var r = Xe, c = Nt;
        ma(a.type) && (Xe = a.stateNode, Nt = !1), Ln(
          e,
          t,
          a
        ), Oo(a.stateNode), Xe = r, Nt = c;
        break;
      case 5:
        ot || Sn(a, t);
      case 6:
        if (r = Xe, c = Nt, Xe = null, Ln(
          e,
          t,
          a
        ), Xe = r, Nt = c, Xe !== null)
          if (Nt)
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
        Xe !== null && (Nt ? (e = Xe, $_(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          a.stateNode
        ), Di(e)) : $_(Xe, a.stateNode));
        break;
      case 4:
        r = Xe, c = Nt, Xe = a.stateNode.containerInfo, Nt = !0, Ln(
          e,
          t,
          a
        ), Xe = r, Nt = c;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        oa(2, a, t), ot || oa(4, a, t), Ln(
          e,
          t,
          a
        );
        break;
      case 1:
        ot || (Sn(a, t), r = a.stateNode, typeof r.componentWillUnmount == "function" && Pf(
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
        ot = (r = ot) || a.memoizedState !== null, Ln(
          e,
          t,
          a
        ), ot = r;
        break;
      default:
        Ln(
          e,
          t,
          a
        );
    }
  }
  function n_(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Di(e);
      } catch (a) {
        Le(t, t.return, a);
      }
    }
  }
  function a_(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Di(e);
      } catch (a) {
        Le(t, t.return, a);
      }
  }
  function ky(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Jf()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Jf()), t;
      default:
        throw Error(l(435, e.tag));
    }
  }
  function Xr(e, t) {
    var a = ky(e);
    t.forEach(function(r) {
      if (!a.has(r)) {
        a.add(r);
        var c = Oy.bind(null, e, r);
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
              if (ma(b.type)) {
                Xe = b.stateNode, Nt = !1;
                break e;
              }
              break;
            case 5:
              Xe = b.stateNode, Nt = !1;
              break e;
            case 3:
            case 4:
              Xe = b.stateNode.containerInfo, Nt = !0;
              break e;
          }
          b = b.return;
        }
        if (Xe === null) throw Error(l(160));
        t_(u, h, c), Xe = null, Nt = !1, u = c.alternate, u !== null && (u.return = null), c.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        i_(t, e), t = t.sibling;
  }
  var _n = null;
  function i_(e, t) {
    var a = e.alternate, r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Ct(t, e), Ot(e), r & 4 && (oa(3, e, e.return), So(3, e), oa(5, e, e.return));
        break;
      case 1:
        Ct(t, e), Ot(e), r & 512 && (ot || a === null || Sn(a, a.return)), r & 64 && jn && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (a = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = a === null ? r : a.concat(r))));
        break;
      case 26:
        var c = _n;
        if (Ct(t, e), Ot(e), r & 512 && (ot || a === null || Sn(a, a.return)), r & 4) {
          var u = a !== null ? a.memoizedState : null;
          if (r = e.memoizedState, a === null)
            if (r === null)
              if (e.stateNode === null) {
                e: {
                  r = e.type, a = e.memoizedProps, c = c.ownerDocument || c;
                  t: switch (r) {
                    case "title":
                      u = c.getElementsByTagName("title")[0], (!u || u[Pi] || u[ft] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = c.createElement(r), c.head.insertBefore(
                        u,
                        c.querySelector("head > title")
                      )), ht(u, r, a), u[ft] = e, dt(u), r = u;
                      break e;
                    case "link":
                      var h = ip(
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
                      u = c.createElement(r), ht(u, r, a), c.head.appendChild(u);
                      break;
                    case "meta":
                      if (h = ip(
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
                      u = c.createElement(r), ht(u, r, a), c.head.appendChild(u);
                      break;
                    default:
                      throw Error(l(468, r));
                  }
                  u[ft] = e, dt(u), r = u;
                }
                e.stateNode = r;
              } else
                op(
                  c,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = ap(
                c,
                r,
                e.memoizedProps
              );
          else
            u !== r ? (u === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : u.count--, r === null ? op(
              c,
              e.type,
              e.stateNode
            ) : ap(
              c,
              r,
              e.memoizedProps
            )) : r === null && e.stateNode !== null && wc(
              e,
              e.memoizedProps,
              a.memoizedProps
            );
        }
        break;
      case 27:
        Ct(t, e), Ot(e), r & 512 && (ot || a === null || Sn(a, a.return)), a !== null && r & 4 && wc(
          e,
          e.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (Ct(t, e), Ot(e), r & 512 && (ot || a === null || Sn(a, a.return)), e.flags & 32) {
          c = e.stateNode;
          try {
            ai(c, "");
          } catch (oe) {
            Le(e, e.return, oe);
          }
        }
        r & 4 && e.stateNode != null && (c = e.memoizedProps, wc(
          e,
          c,
          a !== null ? a.memoizedProps : c
        )), r & 1024 && (zc = !0);
        break;
      case 6:
        if (Ct(t, e), Ot(e), r & 4) {
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
        if (sl = null, c = _n, _n = rl(t.containerInfo), Ct(t, e), _n = c, Ot(e), r & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            Di(t.containerInfo);
          } catch (oe) {
            Le(e, e.return, oe);
          }
        zc && (zc = !1, o_(e));
        break;
      case 4:
        r = _n, _n = rl(
          e.stateNode.containerInfo
        ), Ct(t, e), Ot(e), _n = r;
        break;
      case 12:
        Ct(t, e), Ot(e);
        break;
      case 31:
        Ct(t, e), Ot(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, Xr(e, r)));
        break;
      case 13:
        Ct(t, e), Ot(e), e.child.flags & 8192 && e.memoizedState !== null != (a !== null && a.memoizedState !== null) && (Pr = St()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, Xr(e, r)));
        break;
      case 22:
        c = e.memoizedState !== null;
        var w = a !== null && a.memoizedState !== null, M = jn, B = ot;
        if (jn = M || c, ot = B || w, Ct(t, e), ot = B, jn = M, Ot(e), r & 8192)
          e: for (t = e.stateNode, t._visibility = c ? t._visibility & -2 : t._visibility | 1, c && (a === null || w || jn || ot || Ka(e)), a = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                w = a = t;
                try {
                  if (u = w.stateNode, c)
                    h = u.style, typeof h.setProperty == "function" ? h.setProperty("display", "none", "important") : h.display = "none";
                  else {
                    b = w.stateNode;
                    var q = w.memoizedProps.style, j = q != null && q.hasOwnProperty("display") ? q.display : null;
                    b.style.display = j == null || typeof j == "boolean" ? "" : ("" + j).trim();
                  }
                } catch (oe) {
                  Le(w, w.return, oe);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                w = t;
                try {
                  w.stateNode.nodeValue = c ? "" : w.memoizedProps;
                } catch (oe) {
                  Le(w, w.return, oe);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                w = t;
                try {
                  var U = w.stateNode;
                  c ? P_(U, !0) : P_(w.stateNode, !1);
                } catch (oe) {
                  Le(w, w.return, oe);
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
        r & 4 && (r = e.updateQueue, r !== null && (a = r.retryQueue, a !== null && (r.retryQueue = null, Xr(e, a))));
        break;
      case 19:
        Ct(t, e), Ot(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, Xr(e, r)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Ct(t, e), Ot(e);
    }
  }
  function Ot(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var a, r = e.return; r !== null; ) {
          if (Ff(r)) {
            a = r;
            break;
          }
          r = r.return;
        }
        if (a == null) throw Error(l(160));
        switch (a.tag) {
          case 27:
            var c = a.stateNode, u = Tc(e);
            Vr(e, u, c);
            break;
          case 5:
            var h = a.stateNode;
            a.flags & 32 && (ai(h, ""), a.flags &= -33);
            var b = Tc(e);
            Vr(e, b, h);
            break;
          case 3:
          case 4:
            var w = a.stateNode.containerInfo, M = Tc(e);
            xc(
              e,
              M,
              w
            );
            break;
          default:
            throw Error(l(161));
        }
      } catch (B) {
        Le(e, e.return, B);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function o_(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        o_(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function Un(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Wf(e, t.alternate, t), t = t.sibling;
  }
  function Ka(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          oa(4, t, t.return), Ka(t);
          break;
        case 1:
          Sn(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && Pf(
            t,
            t.return,
            a
          ), Ka(t);
          break;
        case 27:
          Oo(t.stateNode);
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
          ), So(4, u);
          break;
        case 1:
          if (Yn(
            c,
            u,
            a
          ), r = u, c = r.stateNode, typeof c.componentDidMount == "function")
            try {
              c.componentDidMount();
            } catch (M) {
              Le(r, r.return, M);
            }
          if (r = u, c = r.updateQueue, c !== null) {
            var b = r.stateNode;
            try {
              var w = c.shared.hiddenCallbacks;
              if (w !== null)
                for (c.shared.hiddenCallbacks = null, c = 0; c < w.length; c++)
                  jm(w[c], b);
            } catch (M) {
              Le(r, r.return, M);
            }
          }
          a && h & 64 && $f(u), ko(u, u.return);
          break;
        case 27:
          Qf(u);
        case 26:
        case 5:
          Yn(
            c,
            u,
            a
          ), a && r === null && h & 4 && If(u), ko(u, u.return);
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
          ), a && h & 4 && n_(c, u);
          break;
        case 13:
          Yn(
            c,
            u,
            a
          ), a && h & 4 && a_(c, u);
          break;
        case 22:
          u.memoizedState === null && Yn(
            c,
            u,
            a
          ), ko(u, u.return);
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
  function Ac(e, t) {
    var a = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (e != null && e.refCount++, a != null && lo(a));
  }
  function Nc(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && lo(e));
  }
  function pn(e, t, a, r) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        r_(
          e,
          t,
          a,
          r
        ), t = t.sibling;
  }
  function r_(e, t, a, r) {
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
        ), c & 2048 && So(9, t);
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
        ), c & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && lo(e)));
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
          } catch (w) {
            Le(t, t.return, w);
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
        ) : (u._visibility |= 2, Ei(
          e,
          t,
          a,
          r,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), c & 2048 && Ac(h, t);
        break;
      case 24:
        pn(
          e,
          t,
          a,
          r
        ), c & 2048 && Nc(t.alternate, t);
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
  function Ei(e, t, a, r, c) {
    for (c = c && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = e, h = t, b = a, w = r, M = h.flags;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          Ei(
            u,
            h,
            b,
            w,
            c
          ), So(8, h);
          break;
        case 23:
          break;
        case 22:
          var B = h.stateNode;
          h.memoizedState !== null ? B._visibility & 2 ? Ei(
            u,
            h,
            b,
            w,
            c
          ) : Eo(
            u,
            h
          ) : (B._visibility |= 2, Ei(
            u,
            h,
            b,
            w,
            c
          )), c && M & 2048 && Ac(
            h.alternate,
            h
          );
          break;
        case 24:
          Ei(
            u,
            h,
            b,
            w,
            c
          ), c && M & 2048 && Nc(h.alternate, h);
          break;
        default:
          Ei(
            u,
            h,
            b,
            w,
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
            Eo(a, r), c & 2048 && Ac(
              r.alternate,
              r
            );
            break;
          case 24:
            Eo(a, r), c & 2048 && Nc(r.alternate, r);
            break;
          default:
            Eo(a, r);
        }
        t = t.sibling;
      }
  }
  var wo = 8192;
  function wi(e, t, a) {
    if (e.subtreeFlags & wo)
      for (e = e.child; e !== null; )
        l_(
          e,
          t,
          a
        ), e = e.sibling;
  }
  function l_(e, t, a) {
    switch (e.tag) {
      case 26:
        wi(
          e,
          t,
          a
        ), e.flags & wo && e.memoizedState !== null && sb(
          a,
          _n,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        wi(
          e,
          t,
          a
        );
        break;
      case 3:
      case 4:
        var r = _n;
        _n = rl(e.stateNode.containerInfo), wi(
          e,
          t,
          a
        ), _n = r;
        break;
      case 22:
        e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = wo, wo = 16777216, wi(
          e,
          t,
          a
        ), wo = r) : wi(
          e,
          t,
          a
        ));
        break;
      default:
        wi(
          e,
          t,
          a
        );
    }
  }
  function s_(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function To(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var r = t[a];
          mt = r, u_(
            r,
            e
          );
        }
      s_(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        c_(e), e = e.sibling;
  }
  function c_(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        To(e), e.flags & 2048 && oa(9, e, e.return);
        break;
      case 3:
        To(e);
        break;
      case 12:
        To(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, $r(e)) : To(e);
        break;
      default:
        To(e);
    }
  }
  function $r(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var r = t[a];
          mt = r, u_(
            r,
            e
          );
        }
      s_(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          oa(8, t, t.return), $r(t);
          break;
        case 22:
          a = t.stateNode, a._visibility & 2 && (a._visibility &= -3, $r(t));
          break;
        default:
          $r(t);
      }
      e = e.sibling;
    }
  }
  function u_(e, t) {
    for (; mt !== null; ) {
      var a = mt;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          oa(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var r = a.memoizedState.cachePool.pool;
            r != null && r.refCount++;
          }
          break;
        case 24:
          lo(a.memoizedState.cache);
      }
      if (r = a.child, r !== null) r.return = a, mt = r;
      else
        e: for (a = e; mt !== null; ) {
          r = mt;
          var c = r.sibling, u = r.return;
          if (e_(r), r === a) {
            mt = null;
            break e;
          }
          if (c !== null) {
            c.return = u, mt = c;
            break e;
          }
          mt = u;
        }
    }
  }
  var Ey = {
    getCacheForType: function(e) {
      var t = pt(nt), a = t.data.get(e);
      return a === void 0 && (a = e(), t.data.set(e, a)), a;
    },
    cacheSignal: function() {
      return pt(nt).controller.signal;
    }
  }, wy = typeof WeakMap == "function" ? WeakMap : Map, Re = 0, Be = null, ke = null, we = 0, je = 0, Gt = null, ra = !1, Ti = !1, Cc = !1, Hn = 0, Fe = 0, la = 0, qa = 0, Oc = 0, Kt = 0, xi = 0, xo = null, Mt = null, Mc = !1, Pr = 0, d_ = 0, Ir = 1 / 0, Fr = null, sa = null, st = 0, ca = null, zi = null, Zn = 0, Rc = 0, Dc = null, m_ = null, zo = 0, jc = null;
  function qt() {
    return (Re & 2) !== 0 && we !== 0 ? we & -we : A.T !== null ? Bc() : zd();
  }
  function f_() {
    if (Kt === 0)
      if ((we & 536870912) === 0 || xe) {
        var e = ir;
        ir <<= 1, (ir & 3932160) === 0 && (ir = 262144), Kt = e;
      } else Kt = 536870912;
    return e = Zt.current, e !== null && (e.flags |= 32), Kt;
  }
  function Rt(e, t, a) {
    (e === Be && (je === 2 || je === 9) || e.cancelPendingCommit !== null) && (Ai(e, 0), ua(
      e,
      we,
      Kt,
      !1
    )), $i(e, a), ((Re & 2) === 0 || e !== Be) && (e === Be && ((Re & 2) === 0 && (qa |= a), Fe === 4 && ua(
      e,
      we,
      Kt,
      !1
    )), kn(e));
  }
  function __(e, t, a) {
    if ((Re & 6) !== 0) throw Error(l(327));
    var r = !a && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Xi(e, t), c = r ? zy(e, t) : Uc(e, t, !0), u = r;
    do {
      if (c === 0) {
        Ti && !r && ua(e, t, 0, !1);
        break;
      } else {
        if (a = e.current.alternate, u && !Ty(a)) {
          c = Uc(e, t, !1), u = !1;
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
              c = xo;
              var w = b.current.memoizedState.isDehydrated;
              if (w && (Ai(b, h).flags |= 256), h = Uc(
                b,
                h,
                !1
              ), h !== 2) {
                if (Cc && !w) {
                  b.errorRecoveryDisabledLanes |= u, qa |= u, c = 4;
                  break e;
                }
                u = Mt, Mt = c, u !== null && (Mt === null ? Mt = u : Mt.push.apply(
                  Mt,
                  u
                ));
              }
              c = h;
            }
            if (u = !1, c !== 2) continue;
          }
        }
        if (c === 1) {
          Ai(e, 0), ua(e, t, 0, !0);
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
              ua(
                r,
                t,
                Kt,
                !ra
              );
              break e;
            case 2:
              Mt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(l(329));
          }
          if ((t & 62914560) === t && (c = Pr + 300 - St(), 10 < c)) {
            if (ua(
              r,
              t,
              Kt,
              !ra
            ), rr(r, 0, !0) !== 0) break e;
            Zn = t, r.timeoutHandle = V_(
              p_.bind(
                null,
                r,
                a,
                Mt,
                Fr,
                Mc,
                t,
                Kt,
                qa,
                xi,
                ra,
                u,
                "Throttled",
                -0,
                0
              ),
              c
            );
            break e;
          }
          p_(
            r,
            a,
            Mt,
            Fr,
            Mc,
            t,
            Kt,
            qa,
            xi,
            ra,
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
  function p_(e, t, a, r, c, u, h, b, w, M, B, q, j, U) {
    if (e.timeoutHandle = -1, q = t.subtreeFlags, q & 8192 || (q & 16785408) === 16785408) {
      q = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Tn
      }, l_(
        t,
        u,
        q
      );
      var oe = (u & 62914560) === u ? Pr - St() : (u & 4194048) === u ? d_ - St() : 0;
      if (oe = cb(
        q,
        oe
      ), oe !== null) {
        Zn = u, e.cancelPendingCommit = oe(
          E_.bind(
            null,
            e,
            t,
            u,
            a,
            r,
            c,
            h,
            b,
            w,
            B,
            q,
            null,
            j,
            U
          )
        ), ua(e, u, h, !M);
        return;
      }
    }
    E_(
      e,
      t,
      u,
      a,
      r,
      c,
      h,
      b,
      w
    );
  }
  function Ty(e) {
    for (var t = e; ; ) {
      var a = t.tag;
      if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null)))
        for (var r = 0; r < a.length; r++) {
          var c = a[r], u = c.getSnapshot;
          c = c.value;
          try {
            if (!Yt(u(), c)) return !1;
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
  function ua(e, t, a, r) {
    t &= ~Oc, t &= ~qa, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
    for (var c = t; 0 < c; ) {
      var u = 31 - Ut(c), h = 1 << u;
      r[u] = -1, c &= ~h;
    }
    a !== 0 && wd(e, a, t);
  }
  function Qr() {
    return (Re & 6) === 0 ? (Ao(0), !1) : !0;
  }
  function Lc() {
    if (ke !== null) {
      if (je === 0)
        var e = ke.return;
      else
        e = ke, Nn = ja = null, Js(e), vi = null, co = 0, e = ke;
      for (; e !== null; )
        Xf(e.alternate, e), e = e.return;
      ke = null;
    }
  }
  function Ai(e, t) {
    var a = e.timeoutHandle;
    a !== -1 && (e.timeoutHandle = -1, Vy(a)), a = e.cancelPendingCommit, a !== null && (e.cancelPendingCommit = null, a()), Zn = 0, Lc(), Be = e, ke = a = zn(e.current, null), we = t, je = 0, Gt = null, ra = !1, Ti = Xi(e, t), Cc = !1, xi = Kt = Oc = qa = la = Fe = 0, Mt = xo = null, Mc = !1, (t & 8) !== 0 && (t |= t & 32);
    var r = e.entangledLanes;
    if (r !== 0)
      for (e = e.entanglements, r &= t; 0 < r; ) {
        var c = 31 - Ut(r), u = 1 << c;
        t |= e[c], r &= ~u;
      }
    return Hn = t, vr(), a;
  }
  function g_(e, t) {
    be = null, A.H = vo, t === hi || t === xr ? (t = Om(), je = 3) : t === Zs ? (t = Om(), je = 4) : je = t === _c ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Gt = t, ke === null && (Fe = 1, Zr(
      e,
      Qt(t, e.current)
    ));
  }
  function h_() {
    var e = Zt.current;
    return e === null ? !0 : (we & 4194048) === we ? tn === null : (we & 62914560) === we || (we & 536870912) !== 0 ? e === tn : !1;
  }
  function v_() {
    var e = A.H;
    return A.H = vo, e === null ? vo : e;
  }
  function y_() {
    var e = A.A;
    return A.A = Ey, e;
  }
  function Jr() {
    Fe = 4, ra || (we & 4194048) !== we && Zt.current !== null || (Ti = !0), (la & 134217727) === 0 && (qa & 134217727) === 0 || Be === null || ua(
      Be,
      we,
      Kt,
      !1
    );
  }
  function Uc(e, t, a) {
    var r = Re;
    Re |= 2;
    var c = v_(), u = y_();
    (Be !== e || we !== t) && (Fr = null, Ai(e, t)), t = !1;
    var h = Fe;
    e: do
      try {
        if (je !== 0 && ke !== null) {
          var b = ke, w = Gt;
          switch (je) {
            case 8:
              Lc(), h = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Zt.current === null && (t = !0);
              var M = je;
              if (je = 0, Gt = null, Ni(e, b, w, M), a && Ti) {
                h = 0;
                break e;
              }
              break;
            default:
              M = je, je = 0, Gt = null, Ni(e, b, w, M);
          }
        }
        xy(), h = Fe;
        break;
      } catch (B) {
        g_(e, B);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Nn = ja = null, Re = r, A.H = c, A.A = u, ke === null && (Be = null, we = 0, vr()), h;
  }
  function xy() {
    for (; ke !== null; ) b_(ke);
  }
  function zy(e, t) {
    var a = Re;
    Re |= 2;
    var r = v_(), c = y_();
    Be !== e || we !== t ? (Fr = null, Ir = St() + 500, Ai(e, t)) : Ti = Xi(
      e,
      t
    );
    e: do
      try {
        if (je !== 0 && ke !== null) {
          t = ke;
          var u = Gt;
          t: switch (je) {
            case 1:
              je = 0, Gt = null, Ni(e, t, u, 1);
              break;
            case 2:
            case 9:
              if (Nm(u)) {
                je = 0, Gt = null, S_(t);
                break;
              }
              t = function() {
                je !== 2 && je !== 9 || Be !== e || (je = 7), kn(e);
              }, u.then(t, t);
              break e;
            case 3:
              je = 7;
              break e;
            case 4:
              je = 5;
              break e;
            case 7:
              Nm(u) ? (je = 0, Gt = null, S_(t)) : (je = 0, Gt = null, Ni(e, t, u, 7));
              break;
            case 5:
              var h = null;
              switch (ke.tag) {
                case 26:
                  h = ke.memoizedState;
                case 5:
                case 27:
                  var b = ke;
                  if (h ? rp(h) : b.stateNode.complete) {
                    je = 0, Gt = null;
                    var w = b.sibling;
                    if (w !== null) ke = w;
                    else {
                      var M = b.return;
                      M !== null ? (ke = M, Wr(M)) : ke = null;
                    }
                    break t;
                  }
              }
              je = 0, Gt = null, Ni(e, t, u, 5);
              break;
            case 6:
              je = 0, Gt = null, Ni(e, t, u, 6);
              break;
            case 8:
              Lc(), Fe = 6;
              break e;
            default:
              throw Error(l(462));
          }
        }
        Ay();
        break;
      } catch (B) {
        g_(e, B);
      }
    while (!0);
    return Nn = ja = null, A.H = r, A.A = c, Re = a, ke !== null ? 0 : (Be = null, we = 0, vr(), Fe);
  }
  function Ay() {
    for (; ke !== null && !Fl(); )
      b_(ke);
  }
  function b_(e) {
    var t = qf(e.alternate, e, Hn);
    e.memoizedProps = e.pendingProps, t === null ? Wr(e) : ke = t;
  }
  function S_(e) {
    var t = e, a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Yf(
          a,
          t,
          t.pendingProps,
          t.type,
          void 0,
          we
        );
        break;
      case 11:
        t = Yf(
          a,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          we
        );
        break;
      case 5:
        Js(t);
      default:
        Xf(a, t), t = ke = vm(t, Hn), t = qf(a, t, Hn);
    }
    e.memoizedProps = e.pendingProps, t === null ? Wr(e) : ke = t;
  }
  function Ni(e, t, a, r) {
    Nn = ja = null, Js(t), vi = null, co = 0;
    var c = t.return;
    try {
      if (gy(
        e,
        c,
        t,
        a,
        we
      )) {
        Fe = 1, Zr(
          e,
          Qt(a, e.current)
        ), ke = null;
        return;
      }
    } catch (u) {
      if (c !== null) throw ke = c, u;
      Fe = 1, Zr(
        e,
        Qt(a, e.current)
      ), ke = null;
      return;
    }
    t.flags & 32768 ? (xe || r === 1 ? e = !0 : Ti || (we & 536870912) !== 0 ? e = !1 : (ra = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = Zt.current, r !== null && r.tag === 13 && (r.flags |= 16384))), k_(t, e)) : Wr(t);
  }
  function Wr(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        k_(
          t,
          ra
        );
        return;
      }
      e = t.return;
      var a = yy(
        t.alternate,
        t,
        Hn
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
    Fe === 0 && (Fe = 5);
  }
  function k_(e, t) {
    do {
      var a = by(e.alternate, e);
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
    Fe = 6, ke = null;
  }
  function E_(e, t, a, r, c, u, h, b, w) {
    e.cancelPendingCommit = null;
    do
      el();
    while (st !== 0);
    if ((Re & 6) !== 0) throw Error(l(327));
    if (t !== null) {
      if (t === e.current) throw Error(l(177));
      if (u = t.lanes | t.childLanes, u |= Ts, lv(
        e,
        a,
        u,
        h,
        b,
        w
      ), e === Be && (ke = Be = null, we = 0), zi = t, ca = e, Zn = a, Rc = u, Dc = c, m_ = r, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, My(xa, function() {
        return A_(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || r) {
        r = A.T, A.T = null, c = I.p, I.p = 2, h = Re, Re |= 4;
        try {
          Sy(e, t, a);
        } finally {
          Re = h, I.p = c, A.T = r;
        }
      }
      st = 1, w_(), T_(), x_();
    }
  }
  function w_() {
    if (st === 1) {
      st = 0;
      var e = ca, t = zi, a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        a = A.T, A.T = null;
        var r = I.p;
        I.p = 2;
        var c = Re;
        Re |= 4;
        try {
          i_(t, e);
          var u = Ic, h = cm(e.containerInfo), b = u.focusedElem, w = u.selectionRange;
          if (h !== b && b && b.ownerDocument && sm(
            b.ownerDocument.documentElement,
            b
          )) {
            if (w !== null && bs(b)) {
              var M = w.start, B = w.end;
              if (B === void 0 && (B = M), "selectionStart" in b)
                b.selectionStart = M, b.selectionEnd = Math.min(
                  B,
                  b.value.length
                );
              else {
                var q = b.ownerDocument || document, j = q && q.defaultView || window;
                if (j.getSelection) {
                  var U = j.getSelection(), oe = b.textContent.length, _e = Math.min(w.start, oe), Ze = w.end === void 0 ? _e : Math.min(w.end, oe);
                  !U.extend && _e > Ze && (h = Ze, Ze = _e, _e = h);
                  var N = lm(
                    b,
                    _e
                  ), x = lm(
                    b,
                    Ze
                  );
                  if (N && x && (U.rangeCount !== 1 || U.anchorNode !== N.node || U.anchorOffset !== N.offset || U.focusNode !== x.node || U.focusOffset !== x.offset)) {
                    var O = q.createRange();
                    O.setStart(N.node, N.offset), U.removeAllRanges(), _e > Ze ? (U.addRange(O), U.extend(x.node, x.offset)) : (O.setEnd(x.node, x.offset), U.addRange(O));
                  }
                }
              }
            }
            for (q = [], U = b; U = U.parentNode; )
              U.nodeType === 1 && q.push({
                element: U,
                left: U.scrollLeft,
                top: U.scrollTop
              });
            for (typeof b.focus == "function" && b.focus(), b = 0; b < q.length; b++) {
              var G = q[b];
              G.element.scrollLeft = G.left, G.element.scrollTop = G.top;
            }
          }
          ml = !!Pc, Ic = Pc = null;
        } finally {
          Re = c, I.p = r, A.T = a;
        }
      }
      e.current = t, st = 2;
    }
  }
  function T_() {
    if (st === 2) {
      st = 0;
      var e = ca, t = zi, a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        a = A.T, A.T = null;
        var r = I.p;
        I.p = 2;
        var c = Re;
        Re |= 4;
        try {
          Wf(e, t.alternate, t);
        } finally {
          Re = c, I.p = r, A.T = a;
        }
      }
      st = 3;
    }
  }
  function x_() {
    if (st === 4 || st === 3) {
      st = 0, Ql();
      var e = ca, t = zi, a = Zn, r = m_;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? st = 5 : (st = 0, zi = ca = null, z_(e, e.pendingLanes));
      var c = e.pendingLanes;
      if (c === 0 && (sa = null), ts(a), t = t.stateNode, Lt && typeof Lt.onCommitFiberRoot == "function")
        try {
          Lt.onCommitFiberRoot(
            mn,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (r !== null) {
        t = A.T, c = I.p, I.p = 2, A.T = null;
        try {
          for (var u = e.onRecoverableError, h = 0; h < r.length; h++) {
            var b = r[h];
            u(b.value, {
              componentStack: b.stack
            });
          }
        } finally {
          A.T = t, I.p = c;
        }
      }
      (Zn & 3) !== 0 && el(), kn(e), c = e.pendingLanes, (a & 261930) !== 0 && (c & 42) !== 0 ? e === jc ? zo++ : (zo = 0, jc = e) : zo = 0, Ao(0);
    }
  }
  function z_(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, lo(t)));
  }
  function el() {
    return w_(), T_(), x_(), A_();
  }
  function A_() {
    if (st !== 5) return !1;
    var e = ca, t = Rc;
    Rc = 0;
    var a = ts(Zn), r = A.T, c = I.p;
    try {
      I.p = 32 > a ? 32 : a, A.T = null, a = Dc, Dc = null;
      var u = ca, h = Zn;
      if (st = 0, zi = ca = null, Zn = 0, (Re & 6) !== 0) throw Error(l(331));
      var b = Re;
      if (Re |= 4, c_(u.current), r_(
        u,
        u.current,
        h,
        a
      ), Re = b, Ao(0, !1), Lt && typeof Lt.onPostCommitFiberRoot == "function")
        try {
          Lt.onPostCommitFiberRoot(mn, u);
        } catch {
        }
      return !0;
    } finally {
      I.p = c, A.T = r, z_(e, t);
    }
  }
  function N_(e, t, a) {
    t = Qt(a, t), t = fc(e.stateNode, t, 2), e = na(e, t, 2), e !== null && ($i(e, 2), kn(e));
  }
  function Le(e, t, a) {
    if (e.tag === 3)
      N_(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          N_(
            t,
            e,
            a
          );
          break;
        } else if (t.tag === 1) {
          var r = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (sa === null || !sa.has(r))) {
            e = Qt(a, e), a = Cf(2), r = na(t, a, 2), r !== null && (Of(
              a,
              r,
              t,
              e
            ), $i(r, 2), kn(r));
            break;
          }
        }
        t = t.return;
      }
  }
  function Yc(e, t, a) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new wy();
      var c = /* @__PURE__ */ new Set();
      r.set(t, c);
    } else
      c = r.get(t), c === void 0 && (c = /* @__PURE__ */ new Set(), r.set(t, c));
    c.has(a) || (Cc = !0, c.add(a), e = Ny.bind(null, e, t, a), t.then(e, e));
  }
  function Ny(e, t, a) {
    var r = e.pingCache;
    r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & a, e.warmLanes &= ~a, Be === e && (we & a) === a && (Fe === 4 || Fe === 3 && (we & 62914560) === we && 300 > St() - Pr ? (Re & 2) === 0 && Ai(e, 0) : Oc |= a, xi === we && (xi = 0)), kn(e);
  }
  function C_(e, t) {
    t === 0 && (t = Ed()), e = Ma(e, t), e !== null && ($i(e, t), kn(e));
  }
  function Cy(e) {
    var t = e.memoizedState, a = 0;
    t !== null && (a = t.retryLane), C_(e, a);
  }
  function Oy(e, t) {
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
    r !== null && r.delete(t), C_(e, a);
  }
  function My(e, t) {
    return Ki(e, t);
  }
  var tl = null, Ci = null, Hc = !1, nl = !1, Zc = !1, da = 0;
  function kn(e) {
    e !== Ci && e.next === null && (Ci === null ? tl = Ci = e : Ci = Ci.next = e), nl = !0, Hc || (Hc = !0, Dy());
  }
  function Ao(e, t) {
    if (!Zc && nl) {
      Zc = !0;
      do
        for (var a = !1, r = tl; r !== null; ) {
          if (e !== 0) {
            var c = r.pendingLanes;
            if (c === 0) var u = 0;
            else {
              var h = r.suspendedLanes, b = r.pingedLanes;
              u = (1 << 31 - Ut(42 | e) + 1) - 1, u &= c & ~(h & ~b), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (a = !0, D_(r, u));
          } else
            u = we, u = rr(
              r,
              r === Be ? u : 0,
              r.cancelPendingCommit !== null || r.timeoutHandle !== -1
            ), (u & 3) === 0 || Xi(r, u) || (a = !0, D_(r, u));
          r = r.next;
        }
      while (a);
      Zc = !1;
    }
  }
  function Ry() {
    O_();
  }
  function O_() {
    nl = Hc = !1;
    var e = 0;
    da !== 0 && qy() && (e = da);
    for (var t = St(), a = null, r = tl; r !== null; ) {
      var c = r.next, u = M_(r, t);
      u === 0 ? (r.next = null, a === null ? tl = c : a.next = c, c === null && (Ci = a)) : (a = r, (e !== 0 || (u & 3) !== 0) && (nl = !0)), r = c;
    }
    st !== 0 && st !== 5 || Ao(e), da !== 0 && (da = 0);
  }
  function M_(e, t) {
    for (var a = e.suspendedLanes, r = e.pingedLanes, c = e.expirationTimes, u = e.pendingLanes & -62914561; 0 < u; ) {
      var h = 31 - Ut(u), b = 1 << h, w = c[h];
      w === -1 ? ((b & a) === 0 || (b & r) !== 0) && (c[h] = rv(b, t)) : w <= t && (e.expiredLanes |= b), u &= ~b;
    }
    if (t = Be, a = we, a = rr(
      e,
      e === t ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), r = e.callbackNode, a === 0 || e === t && (je === 2 || je === 9) || e.cancelPendingCommit !== null)
      return r !== null && r !== null && qi(r), e.callbackNode = null, e.callbackPriority = 0;
    if ((a & 3) === 0 || Xi(e, a)) {
      if (t = a & -a, t === e.callbackPriority) return t;
      switch (r !== null && qi(r), ts(a)) {
        case 2:
        case 8:
          a = tr;
          break;
        case 32:
          a = xa;
          break;
        case 268435456:
          a = xt;
          break;
        default:
          a = xa;
      }
      return r = R_.bind(null, e), a = Ki(a, r), e.callbackPriority = t, e.callbackNode = a, t;
    }
    return r !== null && r !== null && qi(r), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function R_(e, t) {
    if (st !== 0 && st !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var a = e.callbackNode;
    if (el() && e.callbackNode !== a)
      return null;
    var r = we;
    return r = rr(
      e,
      e === Be ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), r === 0 ? null : (__(e, r, t), M_(e, St()), e.callbackNode != null && e.callbackNode === a ? R_.bind(null, e) : null);
  }
  function D_(e, t) {
    if (el()) return null;
    __(e, t, !0);
  }
  function Dy() {
    Xy(function() {
      (Re & 6) !== 0 ? Ki(
        Vi,
        Ry
      ) : O_();
    });
  }
  function Bc() {
    if (da === 0) {
      var e = pi;
      e === 0 && (e = ar, ar <<= 1, (ar & 261888) === 0 && (ar = 256)), da = e;
    }
    return da;
  }
  function j_(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : ur("" + e);
  }
  function L_(e, t) {
    var a = t.ownerDocument.createElement("input");
    return a.name = t.name, a.value = t.value, e.id && a.setAttribute("form", e.id), t.parentNode.insertBefore(a, t), e = new FormData(e), a.parentNode.removeChild(a), e;
  }
  function jy(e, t, a, r, c) {
    if (t === "submit" && a && a.stateNode === c) {
      var u = j_(
        (c[zt] || null).action
      ), h = r.submitter;
      h && (t = (t = h[zt] || null) ? j_(t.formAction) : h.getAttribute("formAction"), t !== null && (u = t, h = null));
      var b = new _r(
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
                if (da !== 0) {
                  var w = h ? L_(c, h) : new FormData(c);
                  lc(
                    a,
                    {
                      pending: !0,
                      data: w,
                      method: c.method,
                      action: u
                    },
                    null,
                    w
                  );
                }
              } else
                typeof u == "function" && (b.preventDefault(), w = h ? L_(c, h) : new FormData(c), lc(
                  a,
                  {
                    pending: !0,
                    data: w,
                    method: c.method,
                    action: u
                  },
                  u,
                  w
                ));
            },
            currentTarget: c
          }
        ]
      });
    }
  }
  for (var Gc = 0; Gc < ws.length; Gc++) {
    var Kc = ws[Gc], Ly = Kc.toLowerCase(), Uy = Kc[0].toUpperCase() + Kc.slice(1);
    fn(
      Ly,
      "on" + Uy
    );
  }
  fn(mm, "onAnimationEnd"), fn(fm, "onAnimationIteration"), fn(_m, "onAnimationStart"), fn("dblclick", "onDoubleClick"), fn("focusin", "onFocus"), fn("focusout", "onBlur"), fn(Wv, "onTransitionRun"), fn(ey, "onTransitionStart"), fn(ty, "onTransitionCancel"), fn(pm, "onTransitionEnd"), ti("onMouseEnter", ["mouseout", "mouseover"]), ti("onMouseLeave", ["mouseout", "mouseover"]), ti("onPointerEnter", ["pointerout", "pointerover"]), ti("onPointerLeave", ["pointerout", "pointerover"]), Aa(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Aa(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Aa("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Aa(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Aa(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Aa(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var No = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Yy = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(No)
  );
  function U_(e, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var r = e[a], c = r.event;
      r = r.listeners;
      e: {
        var u = void 0;
        if (t)
          for (var h = r.length - 1; 0 <= h; h--) {
            var b = r[h], w = b.instance, M = b.currentTarget;
            if (b = b.listener, w !== u && c.isPropagationStopped())
              break e;
            u = b, c.currentTarget = M;
            try {
              u(c);
            } catch (B) {
              hr(B);
            }
            c.currentTarget = null, u = w;
          }
        else
          for (h = 0; h < r.length; h++) {
            if (b = r[h], w = b.instance, M = b.currentTarget, b = b.listener, w !== u && c.isPropagationStopped())
              break e;
            u = b, c.currentTarget = M;
            try {
              u(c);
            } catch (B) {
              hr(B);
            }
            c.currentTarget = null, u = w;
          }
      }
    }
  }
  function Ee(e, t) {
    var a = t[ns];
    a === void 0 && (a = t[ns] = /* @__PURE__ */ new Set());
    var r = e + "__bubble";
    a.has(r) || (Y_(t, e, 2, !1), a.add(r));
  }
  function qc(e, t, a) {
    var r = 0;
    t && (r |= 4), Y_(
      a,
      e,
      r,
      t
    );
  }
  var al = "_reactListening" + Math.random().toString(36).slice(2);
  function Vc(e) {
    if (!e[al]) {
      e[al] = !0, Cd.forEach(function(a) {
        a !== "selectionchange" && (Yy.has(a) || qc(a, !1, e), qc(a, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[al] || (t[al] = !0, qc("selectionchange", !1, t));
    }
  }
  function Y_(e, t, a, r) {
    switch (fp(t)) {
      case 2:
        var c = mb;
        break;
      case 8:
        c = fb;
        break;
      default:
        c = ru;
    }
    a = c.bind(
      null,
      t,
      a,
      e
    ), c = void 0, !ds || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (c = !0), r ? c !== void 0 ? e.addEventListener(t, a, {
      capture: !0,
      passive: c
    }) : e.addEventListener(t, a, !0) : c !== void 0 ? e.addEventListener(t, a, {
      passive: c
    }) : e.addEventListener(t, a, !1);
  }
  function Xc(e, t, a, r, c) {
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
              var w = h.tag;
              if ((w === 3 || w === 4) && h.stateNode.containerInfo === c)
                return;
              h = h.return;
            }
          for (; b !== null; ) {
            if (h = Ja(b), h === null) return;
            if (w = h.tag, w === 5 || w === 6 || w === 26 || w === 27) {
              r = u = h;
              continue e;
            }
            b = b.parentNode;
          }
        }
        r = r.return;
      }
    Gd(function() {
      var M = u, B = cs(a), q = [];
      e: {
        var j = gm.get(e);
        if (j !== void 0) {
          var U = _r, oe = e;
          switch (e) {
            case "keypress":
              if (mr(a) === 0) break e;
            case "keydown":
            case "keyup":
              U = Ov;
              break;
            case "focusin":
              oe = "focus", U = ps;
              break;
            case "focusout":
              oe = "blur", U = ps;
              break;
            case "beforeblur":
            case "afterblur":
              U = ps;
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
              U = Vd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              U = yv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              U = Dv;
              break;
            case mm:
            case fm:
            case _m:
              U = kv;
              break;
            case pm:
              U = Lv;
              break;
            case "scroll":
            case "scrollend":
              U = hv;
              break;
            case "wheel":
              U = Yv;
              break;
            case "copy":
            case "cut":
            case "paste":
              U = wv;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              U = $d;
              break;
            case "toggle":
            case "beforetoggle":
              U = Zv;
          }
          var _e = (t & 4) !== 0, Ze = !_e && (e === "scroll" || e === "scrollend"), N = _e ? j !== null ? j + "Capture" : null : j;
          _e = [];
          for (var x = M, O; x !== null; ) {
            var G = x;
            if (O = G.stateNode, G = G.tag, G !== 5 && G !== 26 && G !== 27 || O === null || N === null || (G = Fi(x, N), G != null && _e.push(
              Co(x, G, O)
            )), Ze) break;
            x = x.return;
          }
          0 < _e.length && (j = new U(
            j,
            oe,
            null,
            a,
            B
          ), q.push({ event: j, listeners: _e }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (j = e === "mouseover" || e === "pointerover", U = e === "mouseout" || e === "pointerout", j && a !== ss && (oe = a.relatedTarget || a.fromElement) && (Ja(oe) || oe[Qa]))
            break e;
          if ((U || j) && (j = B.window === B ? B : (j = B.ownerDocument) ? j.defaultView || j.parentWindow : window, U ? (oe = a.relatedTarget || a.toElement, U = M, oe = oe ? Ja(oe) : null, oe !== null && (Ze = d(oe), _e = oe.tag, oe !== Ze || _e !== 5 && _e !== 27 && _e !== 6) && (oe = null)) : (U = null, oe = M), U !== oe)) {
            if (_e = Vd, G = "onMouseLeave", N = "onMouseEnter", x = "mouse", (e === "pointerout" || e === "pointerover") && (_e = $d, G = "onPointerLeave", N = "onPointerEnter", x = "pointer"), Ze = U == null ? j : Ii(U), O = oe == null ? j : Ii(oe), j = new _e(
              G,
              x + "leave",
              U,
              a,
              B
            ), j.target = Ze, j.relatedTarget = O, G = null, Ja(B) === M && (_e = new _e(
              N,
              x + "enter",
              oe,
              a,
              B
            ), _e.target = O, _e.relatedTarget = Ze, G = _e), Ze = G, U && oe)
              t: {
                for (_e = Hy, N = U, x = oe, O = 0, G = N; G; G = _e(G))
                  O++;
                G = 0;
                for (var le = x; le; le = _e(le))
                  G++;
                for (; 0 < O - G; )
                  N = _e(N), O--;
                for (; 0 < G - O; )
                  x = _e(x), G--;
                for (; O--; ) {
                  if (N === x || x !== null && N === x.alternate) {
                    _e = N;
                    break t;
                  }
                  N = _e(N), x = _e(x);
                }
                _e = null;
              }
            else _e = null;
            U !== null && H_(
              q,
              j,
              U,
              _e,
              !1
            ), oe !== null && Ze !== null && H_(
              q,
              Ze,
              oe,
              _e,
              !0
            );
          }
        }
        e: {
          if (j = M ? Ii(M) : window, U = j.nodeName && j.nodeName.toLowerCase(), U === "select" || U === "input" && j.type === "file")
            var Ce = tm;
          else if (Wd(j))
            if (nm)
              Ce = Fv;
            else {
              Ce = Pv;
              var re = $v;
            }
          else
            U = j.nodeName, !U || U.toLowerCase() !== "input" || j.type !== "checkbox" && j.type !== "radio" ? M && ls(M.elementType) && (Ce = tm) : Ce = Iv;
          if (Ce && (Ce = Ce(e, M))) {
            em(
              q,
              Ce,
              a,
              B
            );
            break e;
          }
          re && re(e, j, M), e === "focusout" && M && j.type === "number" && M.memoizedProps.value != null && rs(j, "number", j.value);
        }
        switch (re = M ? Ii(M) : window, e) {
          case "focusin":
            (Wd(re) || re.contentEditable === "true") && (li = re, Ss = M, io = null);
            break;
          case "focusout":
            io = Ss = li = null;
            break;
          case "mousedown":
            ks = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ks = !1, um(q, a, B);
            break;
          case "selectionchange":
            if (Jv) break;
          case "keydown":
          case "keyup":
            um(q, a, B);
        }
        var Se;
        if (hs)
          e: {
            switch (e) {
              case "compositionstart":
                var Te = "onCompositionStart";
                break e;
              case "compositionend":
                Te = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Te = "onCompositionUpdate";
                break e;
            }
            Te = void 0;
          }
        else
          ri ? Qd(e, a) && (Te = "onCompositionEnd") : e === "keydown" && a.keyCode === 229 && (Te = "onCompositionStart");
        Te && (Pd && a.locale !== "ko" && (ri || Te !== "onCompositionStart" ? Te === "onCompositionEnd" && ri && (Se = Kd()) : (In = B, ms = "value" in In ? In.value : In.textContent, ri = !0)), re = il(M, Te), 0 < re.length && (Te = new Xd(
          Te,
          e,
          null,
          a,
          B
        ), q.push({ event: Te, listeners: re }), Se ? Te.data = Se : (Se = Jd(a), Se !== null && (Te.data = Se)))), (Se = Gv ? Kv(e, a) : qv(e, a)) && (Te = il(M, "onBeforeInput"), 0 < Te.length && (re = new Xd(
          "onBeforeInput",
          "beforeinput",
          null,
          a,
          B
        ), q.push({
          event: re,
          listeners: Te
        }), re.data = Se)), jy(
          q,
          e,
          M,
          a,
          B
        );
      }
      U_(q, t);
    });
  }
  function Co(e, t, a) {
    return {
      instance: e,
      listener: t,
      currentTarget: a
    };
  }
  function il(e, t) {
    for (var a = t + "Capture", r = []; e !== null; ) {
      var c = e, u = c.stateNode;
      if (c = c.tag, c !== 5 && c !== 26 && c !== 27 || u === null || (c = Fi(e, a), c != null && r.unshift(
        Co(e, c, u)
      ), c = Fi(e, t), c != null && r.push(
        Co(e, c, u)
      )), e.tag === 3) return r;
      e = e.return;
    }
    return [];
  }
  function Hy(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function H_(e, t, a, r, c) {
    for (var u = t._reactName, h = []; a !== null && a !== r; ) {
      var b = a, w = b.alternate, M = b.stateNode;
      if (b = b.tag, w !== null && w === r) break;
      b !== 5 && b !== 26 && b !== 27 || M === null || (w = M, c ? (M = Fi(a, u), M != null && h.unshift(
        Co(a, M, w)
      )) : c || (M = Fi(a, u), M != null && h.push(
        Co(a, M, w)
      ))), a = a.return;
    }
    h.length !== 0 && e.push({ event: t, listeners: h });
  }
  var Zy = /\r\n?/g, By = /\u0000|\uFFFD/g;
  function Z_(e) {
    return (typeof e == "string" ? e : "" + e).replace(Zy, `
`).replace(By, "");
  }
  function B_(e, t) {
    return t = Z_(t), Z_(e) === t;
  }
  function He(e, t, a, r, c, u) {
    switch (a) {
      case "children":
        typeof r == "string" ? t === "body" || t === "textarea" && r === "" || ai(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && ai(e, "" + r);
        break;
      case "className":
        sr(e, "class", r);
        break;
      case "tabIndex":
        sr(e, "tabindex", r);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        sr(e, a, r);
        break;
      case "style":
        Zd(e, r, u);
        break;
      case "data":
        if (t !== "object") {
          sr(e, "data", r);
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
        r = ur("" + r), e.setAttribute(a, r);
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
          typeof u == "function" && (a === "formAction" ? (t !== "input" && He(e, t, "name", c.name, c, null), He(
            e,
            t,
            "formEncType",
            c.formEncType,
            c,
            null
          ), He(
            e,
            t,
            "formMethod",
            c.formMethod,
            c,
            null
          ), He(
            e,
            t,
            "formTarget",
            c.formTarget,
            c,
            null
          )) : (He(e, t, "encType", c.encType, c, null), He(e, t, "method", c.method, c, null), He(e, t, "target", c.target, c, null)));
        if (r == null || typeof r == "symbol" || typeof r == "boolean") {
          e.removeAttribute(a);
          break;
        }
        r = ur("" + r), e.setAttribute(a, r);
        break;
      case "onClick":
        r != null && (e.onclick = Tn);
        break;
      case "onScroll":
        r != null && Ee("scroll", e);
        break;
      case "onScrollEnd":
        r != null && Ee("scrollend", e);
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
        a = ur("" + r), e.setAttributeNS(
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
        Ee("beforetoggle", e), Ee("toggle", e), lr(e, "popover", r);
        break;
      case "xlinkActuate":
        wn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          r
        );
        break;
      case "xlinkArcrole":
        wn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          r
        );
        break;
      case "xlinkRole":
        wn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          r
        );
        break;
      case "xlinkShow":
        wn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          r
        );
        break;
      case "xlinkTitle":
        wn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          r
        );
        break;
      case "xlinkType":
        wn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          r
        );
        break;
      case "xmlBase":
        wn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          r
        );
        break;
      case "xmlLang":
        wn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          r
        );
        break;
      case "xmlSpace":
        wn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          r
        );
        break;
      case "is":
        lr(e, "is", r);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (a = pv.get(a) || a, lr(e, a, r));
    }
  }
  function $c(e, t, a, r, c, u) {
    switch (a) {
      case "style":
        Zd(e, r, u);
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
        r != null && Ee("scroll", e);
        break;
      case "onScrollEnd":
        r != null && Ee("scrollend", e);
        break;
      case "onClick":
        r != null && (e.onclick = Tn);
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
        if (!Od.hasOwnProperty(a))
          e: {
            if (a[0] === "o" && a[1] === "n" && (c = a.endsWith("Capture"), t = a.slice(2, c ? a.length - 7 : void 0), u = e[zt] || null, u = u != null ? u[a] : null, typeof u == "function" && e.removeEventListener(t, u, c), typeof r == "function")) {
              typeof u != "function" && u !== null && (a in e ? e[a] = null : e.hasAttribute(a) && e.removeAttribute(a)), e.addEventListener(t, r, c);
              break e;
            }
            a in e ? e[a] = r : r === !0 ? e.setAttribute(a, "") : lr(e, a, r);
          }
    }
  }
  function ht(e, t, a) {
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
        Ee("error", e), Ee("load", e);
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
                  He(e, t, u, h, a, null);
              }
          }
        c && He(e, t, "srcSet", a.srcSet, a, null), r && He(e, t, "src", a.src, a, null);
        return;
      case "input":
        Ee("invalid", e);
        var b = u = h = c = null, w = null, M = null;
        for (r in a)
          if (a.hasOwnProperty(r)) {
            var B = a[r];
            if (B != null)
              switch (r) {
                case "name":
                  c = B;
                  break;
                case "type":
                  h = B;
                  break;
                case "checked":
                  w = B;
                  break;
                case "defaultChecked":
                  M = B;
                  break;
                case "value":
                  u = B;
                  break;
                case "defaultValue":
                  b = B;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (B != null)
                    throw Error(l(137, t));
                  break;
                default:
                  He(e, t, r, B, a, null);
              }
          }
        Ld(
          e,
          u,
          b,
          w,
          M,
          h,
          c,
          !1
        );
        return;
      case "select":
        Ee("invalid", e), r = h = u = null;
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
                He(e, t, c, b, a, null);
            }
        t = u, a = h, e.multiple = !!r, t != null ? ni(e, !!r, t, !1) : a != null && ni(e, !!r, a, !0);
        return;
      case "textarea":
        Ee("invalid", e), u = c = r = null;
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
                He(e, t, h, b, a, null);
            }
        Yd(e, r, c, u);
        return;
      case "option":
        for (w in a)
          a.hasOwnProperty(w) && (r = a[w], r != null) && (w === "selected" ? e.selected = r && typeof r != "function" && typeof r != "symbol" : He(e, t, w, r, a, null));
        return;
      case "dialog":
        Ee("beforetoggle", e), Ee("toggle", e), Ee("cancel", e), Ee("close", e);
        break;
      case "iframe":
      case "object":
        Ee("load", e);
        break;
      case "video":
      case "audio":
        for (r = 0; r < No.length; r++)
          Ee(No[r], e);
        break;
      case "image":
        Ee("error", e), Ee("load", e);
        break;
      case "details":
        Ee("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Ee("error", e), Ee("load", e);
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
        for (M in a)
          if (a.hasOwnProperty(M) && (r = a[M], r != null))
            switch (M) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(l(137, t));
              default:
                He(e, t, M, r, a, null);
            }
        return;
      default:
        if (ls(t)) {
          for (B in a)
            a.hasOwnProperty(B) && (r = a[B], r !== void 0 && $c(
              e,
              t,
              B,
              r,
              a,
              void 0
            ));
          return;
        }
    }
    for (b in a)
      a.hasOwnProperty(b) && (r = a[b], r != null && He(e, t, b, r, a, null));
  }
  function Gy(e, t, a, r) {
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
        var c = null, u = null, h = null, b = null, w = null, M = null, B = null;
        for (U in a) {
          var q = a[U];
          if (a.hasOwnProperty(U) && q != null)
            switch (U) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                w = q;
              default:
                r.hasOwnProperty(U) || He(e, t, U, null, r, q);
            }
        }
        for (var j in r) {
          var U = r[j];
          if (q = a[j], r.hasOwnProperty(j) && (U != null || q != null))
            switch (j) {
              case "type":
                u = U;
                break;
              case "name":
                c = U;
                break;
              case "checked":
                M = U;
                break;
              case "defaultChecked":
                B = U;
                break;
              case "value":
                h = U;
                break;
              case "defaultValue":
                b = U;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (U != null)
                  throw Error(l(137, t));
                break;
              default:
                U !== q && He(
                  e,
                  t,
                  j,
                  U,
                  r,
                  q
                );
            }
        }
        os(
          e,
          h,
          b,
          w,
          M,
          B,
          u,
          c
        );
        return;
      case "select":
        U = h = b = j = null;
        for (u in a)
          if (w = a[u], a.hasOwnProperty(u) && w != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                U = w;
              default:
                r.hasOwnProperty(u) || He(
                  e,
                  t,
                  u,
                  null,
                  r,
                  w
                );
            }
        for (c in r)
          if (u = r[c], w = a[c], r.hasOwnProperty(c) && (u != null || w != null))
            switch (c) {
              case "value":
                j = u;
                break;
              case "defaultValue":
                b = u;
                break;
              case "multiple":
                h = u;
              default:
                u !== w && He(
                  e,
                  t,
                  c,
                  u,
                  r,
                  w
                );
            }
        t = b, a = h, r = U, j != null ? ni(e, !!a, j, !1) : !!r != !!a && (t != null ? ni(e, !!a, t, !0) : ni(e, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        U = j = null;
        for (b in a)
          if (c = a[b], a.hasOwnProperty(b) && c != null && !r.hasOwnProperty(b))
            switch (b) {
              case "value":
                break;
              case "children":
                break;
              default:
                He(e, t, b, null, r, c);
            }
        for (h in r)
          if (c = r[h], u = a[h], r.hasOwnProperty(h) && (c != null || u != null))
            switch (h) {
              case "value":
                j = c;
                break;
              case "defaultValue":
                U = c;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (c != null) throw Error(l(91));
                break;
              default:
                c !== u && He(e, t, h, c, r, u);
            }
        Ud(e, j, U);
        return;
      case "option":
        for (var oe in a)
          j = a[oe], a.hasOwnProperty(oe) && j != null && !r.hasOwnProperty(oe) && (oe === "selected" ? e.selected = !1 : He(
            e,
            t,
            oe,
            null,
            r,
            j
          ));
        for (w in r)
          j = r[w], U = a[w], r.hasOwnProperty(w) && j !== U && (j != null || U != null) && (w === "selected" ? e.selected = j && typeof j != "function" && typeof j != "symbol" : He(
            e,
            t,
            w,
            j,
            r,
            U
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
        for (var _e in a)
          j = a[_e], a.hasOwnProperty(_e) && j != null && !r.hasOwnProperty(_e) && He(e, t, _e, null, r, j);
        for (M in r)
          if (j = r[M], U = a[M], r.hasOwnProperty(M) && j !== U && (j != null || U != null))
            switch (M) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (j != null)
                  throw Error(l(137, t));
                break;
              default:
                He(
                  e,
                  t,
                  M,
                  j,
                  r,
                  U
                );
            }
        return;
      default:
        if (ls(t)) {
          for (var Ze in a)
            j = a[Ze], a.hasOwnProperty(Ze) && j !== void 0 && !r.hasOwnProperty(Ze) && $c(
              e,
              t,
              Ze,
              void 0,
              r,
              j
            );
          for (B in r)
            j = r[B], U = a[B], !r.hasOwnProperty(B) || j === U || j === void 0 && U === void 0 || $c(
              e,
              t,
              B,
              j,
              r,
              U
            );
          return;
        }
    }
    for (var N in a)
      j = a[N], a.hasOwnProperty(N) && j != null && !r.hasOwnProperty(N) && He(e, t, N, null, r, j);
    for (q in r)
      j = r[q], U = a[q], !r.hasOwnProperty(q) || j === U || j == null && U == null || He(e, t, q, j, r, U);
  }
  function G_(e) {
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
  function Ky() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, a = performance.getEntriesByType("resource"), r = 0; r < a.length; r++) {
        var c = a[r], u = c.transferSize, h = c.initiatorType, b = c.duration;
        if (u && b && G_(h)) {
          for (h = 0, b = c.responseEnd, r += 1; r < a.length; r++) {
            var w = a[r], M = w.startTime;
            if (M > b) break;
            var B = w.transferSize, q = w.initiatorType;
            B && G_(q) && (w = w.responseEnd, h += B * (w < b ? 1 : (b - M) / (w - M)));
          }
          if (--r, t += 8 * (u + h) / (c.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Pc = null, Ic = null;
  function ol(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function K_(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function q_(e, t) {
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
  function Fc(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Qc = null;
  function qy() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Qc ? !1 : (Qc = e, !0) : (Qc = null, !1);
  }
  var V_ = typeof setTimeout == "function" ? setTimeout : void 0, Vy = typeof clearTimeout == "function" ? clearTimeout : void 0, X_ = typeof Promise == "function" ? Promise : void 0, Xy = typeof queueMicrotask == "function" ? queueMicrotask : typeof X_ < "u" ? function(e) {
    return X_.resolve(null).then(e).catch($y);
  } : V_;
  function $y(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function ma(e) {
    return e === "head";
  }
  function $_(e, t) {
    var a = t, r = 0;
    do {
      var c = a.nextSibling;
      if (e.removeChild(a), c && c.nodeType === 8)
        if (a = c.data, a === "/$" || a === "/&") {
          if (r === 0) {
            e.removeChild(c), Di(t);
            return;
          }
          r--;
        } else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&")
          r++;
        else if (a === "html")
          Oo(e.ownerDocument.documentElement);
        else if (a === "head") {
          a = e.ownerDocument.head, Oo(a);
          for (var u = a.firstChild; u; ) {
            var h = u.nextSibling, b = u.nodeName;
            u[Pi] || b === "SCRIPT" || b === "STYLE" || b === "LINK" && u.rel.toLowerCase() === "stylesheet" || a.removeChild(u), u = h;
          }
        } else
          a === "body" && Oo(e.ownerDocument.body);
      a = c;
    } while (a);
    Di(t);
  }
  function P_(e, t) {
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
  function Jc(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (t = t.nextSibling, a.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Jc(a), as(a);
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
  function Py(e, t, a, r) {
    for (; e.nodeType === 1; ) {
      var c = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (r) {
        if (!e[Pi])
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
  function Iy(e, t, a) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = nn(e.nextSibling), e === null)) return null;
    return e;
  }
  function I_(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = nn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Wc(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function eu(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Fy(e, t) {
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
  var tu = null;
  function F_(e) {
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
  function Q_(e) {
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
  function J_(e, t, a) {
    switch (t = ol(a), e) {
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
  function Oo(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    as(e);
  }
  var an = /* @__PURE__ */ new Map(), W_ = /* @__PURE__ */ new Set();
  function rl(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Bn = I.d;
  I.d = {
    f: Qy,
    r: Jy,
    D: Wy,
    C: eb,
    L: tb,
    m: nb,
    X: ib,
    S: ab,
    M: ob
  };
  function Qy() {
    var e = Bn.f(), t = Qr();
    return e || t;
  }
  function Jy(e) {
    var t = Wa(e);
    t !== null && t.tag === 5 && t.type === "form" ? gf(t) : Bn.r(e);
  }
  var Oi = typeof document > "u" ? null : document;
  function ep(e, t, a) {
    var r = Oi;
    if (r && typeof t == "string" && t) {
      var c = It(t);
      c = 'link[rel="' + e + '"][href="' + c + '"]', typeof a == "string" && (c += '[crossorigin="' + a + '"]'), W_.has(c) || (W_.add(c), e = { rel: e, crossOrigin: a, href: t }, r.querySelector(c) === null && (t = r.createElement("link"), ht(t, "link", e), dt(t), r.head.appendChild(t)));
    }
  }
  function Wy(e) {
    Bn.D(e), ep("dns-prefetch", e, null);
  }
  function eb(e, t) {
    Bn.C(e, t), ep("preconnect", e, t);
  }
  function tb(e, t, a) {
    Bn.L(e, t, a);
    var r = Oi;
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
          u = Mi(e);
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
      ), an.set(u, e), r.querySelector(c) !== null || t === "style" && r.querySelector(Mo(u)) || t === "script" && r.querySelector(Ro(u)) || (t = r.createElement("link"), ht(t, "link", e), dt(t), r.head.appendChild(t)));
    }
  }
  function nb(e, t) {
    Bn.m(e, t);
    var a = Oi;
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
            if (a.querySelector(Ro(u)))
              return;
        }
        r = a.createElement("link"), ht(r, "link", e), dt(r), a.head.appendChild(r);
      }
    }
  }
  function ab(e, t, a) {
    Bn.S(e, t, a);
    var r = Oi;
    if (r && e) {
      var c = ei(r).hoistableStyles, u = Mi(e);
      t = t || "default";
      var h = c.get(u);
      if (!h) {
        var b = { loading: 0, preload: null };
        if (h = r.querySelector(
          Mo(u)
        ))
          b.loading = 5;
        else {
          e = y(
            { rel: "stylesheet", href: e, "data-precedence": t },
            a
          ), (a = an.get(u)) && nu(e, a);
          var w = h = r.createElement("link");
          dt(w), ht(w, "link", e), w._p = new Promise(function(M, B) {
            w.onload = M, w.onerror = B;
          }), w.addEventListener("load", function() {
            b.loading |= 1;
          }), w.addEventListener("error", function() {
            b.loading |= 2;
          }), b.loading |= 4, ll(h, t, r);
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
  function ib(e, t) {
    Bn.X(e, t);
    var a = Oi;
    if (a && e) {
      var r = ei(a).hoistableScripts, c = Ri(e), u = r.get(c);
      u || (u = a.querySelector(Ro(c)), u || (e = y({ src: e, async: !0 }, t), (t = an.get(c)) && au(e, t), u = a.createElement("script"), dt(u), ht(u, "link", e), a.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, r.set(c, u));
    }
  }
  function ob(e, t) {
    Bn.M(e, t);
    var a = Oi;
    if (a && e) {
      var r = ei(a).hoistableScripts, c = Ri(e), u = r.get(c);
      u || (u = a.querySelector(Ro(c)), u || (e = y({ src: e, async: !0, type: "module" }, t), (t = an.get(c)) && au(e, t), u = a.createElement("script"), dt(u), ht(u, "link", e), a.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, r.set(c, u));
    }
  }
  function tp(e, t, a, r) {
    var c = (c = fe.current) ? rl(c) : null;
    if (!c) throw Error(l(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string" ? (t = Mi(a.href), a = ei(
          c
        ).hoistableStyles, r = a.get(t), r || (r = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, a.set(t, r)), r) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
          e = Mi(a.href);
          var u = ei(
            c
          ).hoistableStyles, h = u.get(e);
          if (h || (c = c.ownerDocument || c, h = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(e, h), (u = c.querySelector(
            Mo(e)
          )) && !u._p && (h.instance = u, h.state.loading = 5), an.has(e) || (a = {
            rel: "preload",
            as: "style",
            href: a.href,
            crossOrigin: a.crossOrigin,
            integrity: a.integrity,
            media: a.media,
            hrefLang: a.hrefLang,
            referrerPolicy: a.referrerPolicy
          }, an.set(e, a), u || rb(
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
  function Mi(e) {
    return 'href="' + It(e) + '"';
  }
  function Mo(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function np(e) {
    return y({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function rb(e, t, a, r) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
      return r.loading |= 1;
    }), t.addEventListener("error", function() {
      return r.loading |= 2;
    }), ht(t, "link", a), dt(t), e.head.appendChild(t));
  }
  function Ri(e) {
    return '[src="' + It(e) + '"]';
  }
  function Ro(e) {
    return "script[async]" + e;
  }
  function ap(e, t, a) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var r = e.querySelector(
            'style[data-href~="' + It(a.href) + '"]'
          );
          if (r)
            return t.instance = r, dt(r), r;
          var c = y({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null
          });
          return r = (e.ownerDocument || e).createElement(
            "style"
          ), dt(r), ht(r, "style", c), ll(r, a.precedence, e), t.instance = r;
        case "stylesheet":
          c = Mi(a.href);
          var u = e.querySelector(
            Mo(c)
          );
          if (u)
            return t.state.loading |= 4, t.instance = u, dt(u), u;
          r = np(a), (c = an.get(c)) && nu(r, c), u = (e.ownerDocument || e).createElement("link"), dt(u);
          var h = u;
          return h._p = new Promise(function(b, w) {
            h.onload = b, h.onerror = w;
          }), ht(u, "link", r), t.state.loading |= 4, ll(u, a.precedence, e), t.instance = u;
        case "script":
          return u = Ri(a.src), (c = e.querySelector(
            Ro(u)
          )) ? (t.instance = c, dt(c), c) : (r = a, (c = an.get(u)) && (r = y({}, a), au(r, c)), e = e.ownerDocument || e, c = e.createElement("script"), dt(c), ht(c, "link", r), e.head.appendChild(c), t.instance = c);
        case "void":
          return null;
        default:
          throw Error(l(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (r = t.instance, t.state.loading |= 4, ll(r, a.precedence, e));
    return t.instance;
  }
  function ll(e, t, a) {
    for (var r = a.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), c = r.length ? r[r.length - 1] : null, u = c, h = 0; h < r.length; h++) {
      var b = r[h];
      if (b.dataset.precedence === t) u = b;
      else if (u !== c) break;
    }
    u ? u.parentNode.insertBefore(e, u.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(e, t.firstChild));
  }
  function nu(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function au(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var sl = null;
  function ip(e, t, a) {
    if (sl === null) {
      var r = /* @__PURE__ */ new Map(), c = sl = /* @__PURE__ */ new Map();
      c.set(a, r);
    } else
      c = sl, r = c.get(a), r || (r = /* @__PURE__ */ new Map(), c.set(a, r));
    if (r.has(e)) return r;
    for (r.set(e, null), a = a.getElementsByTagName(e), c = 0; c < a.length; c++) {
      var u = a[c];
      if (!(u[Pi] || u[ft] || e === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var h = u.getAttribute(t) || "";
        h = e + h;
        var b = r.get(h);
        b ? b.push(u) : r.set(h, [u]);
      }
    }
    return r;
  }
  function op(e, t, a) {
    e = e.ownerDocument || e, e.head.insertBefore(
      a,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function lb(e, t, a) {
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
  function rp(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function sb(e, t, a, r) {
    if (a.type === "stylesheet" && (typeof r.media != "string" || matchMedia(r.media).matches !== !1) && (a.state.loading & 4) === 0) {
      if (a.instance === null) {
        var c = Mi(r.href), u = t.querySelector(
          Mo(c)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = cl.bind(e), t.then(e, e)), a.state.loading |= 4, a.instance = u, dt(u);
          return;
        }
        u = t.ownerDocument || t, r = np(r), (c = an.get(c)) && nu(r, c), u = u.createElement("link"), dt(u);
        var h = u;
        h._p = new Promise(function(b, w) {
          h.onload = b, h.onerror = w;
        }), ht(u, "link", r), a.instance = u;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(a, t), (t = a.state.preload) && (a.state.loading & 3) === 0 && (e.count++, a = cl.bind(e), t.addEventListener("load", a), t.addEventListener("error", a));
    }
  }
  var iu = 0;
  function cb(e, t) {
    return e.stylesheets && e.count === 0 && dl(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(a) {
      var r = setTimeout(function() {
        if (e.stylesheets && dl(e, e.stylesheets), e.unsuspend) {
          var u = e.unsuspend;
          e.unsuspend = null, u();
        }
      }, 6e4 + t);
      0 < e.imgBytes && iu === 0 && (iu = 62500 * Ky());
      var c = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && dl(e, e.stylesheets), e.unsuspend)) {
            var u = e.unsuspend;
            e.unsuspend = null, u();
          }
        },
        (e.imgBytes > iu ? 50 : 800) + t
      );
      return e.unsuspend = a, function() {
        e.unsuspend = null, clearTimeout(r), clearTimeout(c);
      };
    } : null;
  }
  function cl() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) dl(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var ul = null;
  function dl(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, ul = /* @__PURE__ */ new Map(), t.forEach(ub, e), ul = null, cl.call(e));
  }
  function ub(e, t) {
    if (!(t.state.loading & 4)) {
      var a = ul.get(e);
      if (a) var r = a.get(null);
      else {
        a = /* @__PURE__ */ new Map(), ul.set(e, a);
        for (var c = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < c.length; u++) {
          var h = c[u];
          (h.nodeName === "LINK" || h.getAttribute("media") !== "not all") && (a.set(h.dataset.precedence, h), r = h);
        }
        r && a.set(null, r);
      }
      c = t.instance, h = c.getAttribute("data-precedence"), u = a.get(h) || r, u === r && a.set(null, c), a.set(h, c), this.count++, r = cl.bind(this), c.addEventListener("load", r), c.addEventListener("error", r), u ? u.parentNode.insertBefore(c, u.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(c, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Do = {
    $$typeof: L,
    Provider: null,
    Consumer: null,
    _currentValue: ne,
    _currentValue2: ne,
    _threadCount: 0
  };
  function db(e, t, a, r, c, u, h, b, w) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Wl(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Wl(0), this.hiddenUpdates = Wl(null), this.identifierPrefix = r, this.onUncaughtError = c, this.onCaughtError = u, this.onRecoverableError = h, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = w, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function lp(e, t, a, r, c, u, h, b, w, M, B, q) {
    return e = new db(
      e,
      t,
      a,
      h,
      w,
      M,
      B,
      q,
      b
    ), t = 1, u === !0 && (t |= 24), u = Ht(3, null, null, t), e.current = u, u.stateNode = e, t = Us(), t.refCount++, e.pooledCache = t, t.refCount++, u.memoizedState = {
      element: r,
      isDehydrated: a,
      cache: t
    }, Bs(u), e;
  }
  function sp(e) {
    return e ? (e = ui, e) : ui;
  }
  function cp(e, t, a, r, c, u) {
    c = sp(c), r.context === null ? r.context = c : r.pendingContext = c, r = ta(t), r.payload = { element: a }, u = u === void 0 ? null : u, u !== null && (r.callback = u), a = na(e, r, t), a !== null && (Rt(a, e, t), mo(a, e, t));
  }
  function up(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function ou(e, t) {
    up(e, t), (e = e.alternate) && up(e, t);
  }
  function dp(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ma(e, 67108864);
      t !== null && Rt(t, e, 67108864), ou(e, 67108864);
    }
  }
  function mp(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = qt();
      t = es(t);
      var a = Ma(e, t);
      a !== null && Rt(a, e, t), ou(e, t);
    }
  }
  var ml = !0;
  function mb(e, t, a, r) {
    var c = A.T;
    A.T = null;
    var u = I.p;
    try {
      I.p = 2, ru(e, t, a, r);
    } finally {
      I.p = u, A.T = c;
    }
  }
  function fb(e, t, a, r) {
    var c = A.T;
    A.T = null;
    var u = I.p;
    try {
      I.p = 8, ru(e, t, a, r);
    } finally {
      I.p = u, A.T = c;
    }
  }
  function ru(e, t, a, r) {
    if (ml) {
      var c = lu(r);
      if (c === null)
        Xc(
          e,
          t,
          r,
          fl,
          a
        ), _p(e, r);
      else if (pb(
        c,
        e,
        t,
        a,
        r
      ))
        r.stopPropagation();
      else if (_p(e, r), t & 4 && -1 < _b.indexOf(e)) {
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
                      var w = 1 << 31 - Ut(h);
                      b.entanglements[1] |= w, h &= ~w;
                    }
                    kn(u), (Re & 6) === 0 && (Ir = St() + 500, Ao(0));
                  }
                }
                break;
              case 31:
              case 13:
                b = Ma(u, 2), b !== null && Rt(b, u, 2), Qr(), ou(u, 2);
            }
          if (u = lu(r), u === null && Xc(
            e,
            t,
            r,
            fl,
            a
          ), u === c) break;
          c = u;
        }
        c !== null && r.stopPropagation();
      } else
        Xc(
          e,
          t,
          r,
          null,
          a
        );
    }
  }
  function lu(e) {
    return e = cs(e), su(e);
  }
  var fl = null;
  function su(e) {
    if (fl = null, e = Ja(e), e !== null) {
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
    return fl = e, null;
  }
  function fp(e) {
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
        switch (Jl()) {
          case Vi:
            return 2;
          case tr:
            return 8;
          case xa:
          case $t:
            return 32;
          case xt:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var cu = !1, fa = null, _a = null, pa = null, jo = /* @__PURE__ */ new Map(), Lo = /* @__PURE__ */ new Map(), ga = [], _b = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function _p(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        fa = null;
        break;
      case "dragenter":
      case "dragleave":
        _a = null;
        break;
      case "mouseover":
      case "mouseout":
        pa = null;
        break;
      case "pointerover":
      case "pointerout":
        jo.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Lo.delete(t.pointerId);
    }
  }
  function Uo(e, t, a, r, c, u) {
    return e === null || e.nativeEvent !== u ? (e = {
      blockedOn: t,
      domEventName: a,
      eventSystemFlags: r,
      nativeEvent: u,
      targetContainers: [c]
    }, t !== null && (t = Wa(t), t !== null && dp(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, c !== null && t.indexOf(c) === -1 && t.push(c), e);
  }
  function pb(e, t, a, r, c) {
    switch (t) {
      case "focusin":
        return fa = Uo(
          fa,
          e,
          t,
          a,
          r,
          c
        ), !0;
      case "dragenter":
        return _a = Uo(
          _a,
          e,
          t,
          a,
          r,
          c
        ), !0;
      case "mouseover":
        return pa = Uo(
          pa,
          e,
          t,
          a,
          r,
          c
        ), !0;
      case "pointerover":
        var u = c.pointerId;
        return jo.set(
          u,
          Uo(
            jo.get(u) || null,
            e,
            t,
            a,
            r,
            c
          )
        ), !0;
      case "gotpointercapture":
        return u = c.pointerId, Lo.set(
          u,
          Uo(
            Lo.get(u) || null,
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
  function pp(e) {
    var t = Ja(e.target);
    if (t !== null) {
      var a = d(t);
      if (a !== null) {
        if (t = a.tag, t === 13) {
          if (t = m(a), t !== null) {
            e.blockedOn = t, Ad(e.priority, function() {
              mp(a);
            });
            return;
          }
        } else if (t === 31) {
          if (t = f(a), t !== null) {
            e.blockedOn = t, Ad(e.priority, function() {
              mp(a);
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
  function _l(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = lu(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var r = new a.constructor(
          a.type,
          a
        );
        ss = r, a.target.dispatchEvent(r), ss = null;
      } else
        return t = Wa(a), t !== null && dp(t), e.blockedOn = a, !1;
      t.shift();
    }
    return !0;
  }
  function gp(e, t, a) {
    _l(e) && a.delete(t);
  }
  function gb() {
    cu = !1, fa !== null && _l(fa) && (fa = null), _a !== null && _l(_a) && (_a = null), pa !== null && _l(pa) && (pa = null), jo.forEach(gp), Lo.forEach(gp);
  }
  function pl(e, t) {
    e.blockedOn === t && (e.blockedOn = null, cu || (cu = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      gb
    )));
  }
  var gl = null;
  function hp(e) {
    gl !== e && (gl = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        gl === e && (gl = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t], r = e[t + 1], c = e[t + 2];
          if (typeof r != "function") {
            if (su(r || a) === null)
              continue;
            break;
          }
          var u = Wa(a);
          u !== null && (e.splice(t, 3), t -= 3, lc(
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
  function Di(e) {
    function t(w) {
      return pl(w, e);
    }
    fa !== null && pl(fa, e), _a !== null && pl(_a, e), pa !== null && pl(pa, e), jo.forEach(t), Lo.forEach(t);
    for (var a = 0; a < ga.length; a++) {
      var r = ga[a];
      r.blockedOn === e && (r.blockedOn = null);
    }
    for (; 0 < ga.length && (a = ga[0], a.blockedOn === null); )
      pp(a), a.blockedOn === null && ga.shift();
    if (a = (e.ownerDocument || e).$$reactFormReplay, a != null)
      for (r = 0; r < a.length; r += 3) {
        var c = a[r], u = a[r + 1], h = c[zt] || null;
        if (typeof u == "function")
          h || hp(a);
        else if (h) {
          var b = null;
          if (u && u.hasAttribute("formAction")) {
            if (c = u, h = u[zt] || null)
              b = h.formAction;
            else if (su(c) !== null) continue;
          } else b = h.action;
          typeof b == "function" ? a[r + 1] = b : (a.splice(r, 3), r -= 3), hp(a);
        }
      }
  }
  function vp() {
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
  function uu(e) {
    this._internalRoot = e;
  }
  hl.prototype.render = uu.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(l(409));
    var a = t.current, r = qt();
    cp(a, r, e, t, null, null);
  }, hl.prototype.unmount = uu.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      cp(e.current, 2, null, e, null, null), Qr(), t[Qa] = null;
    }
  };
  function hl(e) {
    this._internalRoot = e;
  }
  hl.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = zd();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < ga.length && t !== 0 && t < ga[a].priority; a++) ;
      ga.splice(a, 0, e), a === 0 && pp(e);
    }
  };
  var yp = i.version;
  if (yp !== "19.2.3")
    throw Error(
      l(
        527,
        yp,
        "19.2.3"
      )
    );
  I.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(l(188)) : (e = Object.keys(e).join(","), Error(l(268, e)));
    return e = _(t), e = e !== null ? v(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var hb = {
    bundleType: 0,
    version: "19.2.3",
    rendererPackageName: "react-dom",
    currentDispatcherRef: A,
    reconcilerVersion: "19.2.3"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!vl.isDisabled && vl.supportsFiber)
      try {
        mn = vl.inject(
          hb
        ), Lt = vl;
      } catch {
      }
  }
  return Ho.createRoot = function(e, t) {
    if (!s(e)) throw Error(l(299));
    var a = !1, r = "", c = xf, u = zf, h = Af;
    return t != null && (t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (c = t.onUncaughtError), t.onCaughtError !== void 0 && (u = t.onCaughtError), t.onRecoverableError !== void 0 && (h = t.onRecoverableError)), t = lp(
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
      vp
    ), e[Qa] = t.current, Vc(e), new uu(t);
  }, Ho.hydrateRoot = function(e, t, a) {
    if (!s(e)) throw Error(l(299));
    var r = !1, c = "", u = xf, h = zf, b = Af, w = null;
    return a != null && (a.unstable_strictMode === !0 && (r = !0), a.identifierPrefix !== void 0 && (c = a.identifierPrefix), a.onUncaughtError !== void 0 && (u = a.onUncaughtError), a.onCaughtError !== void 0 && (h = a.onCaughtError), a.onRecoverableError !== void 0 && (b = a.onRecoverableError), a.formState !== void 0 && (w = a.formState)), t = lp(
      e,
      1,
      !0,
      t,
      a ?? null,
      r,
      c,
      w,
      u,
      h,
      b,
      vp
    ), t.context = sp(null), a = t.current, r = qt(), r = es(r), c = ta(r), c.callback = null, na(a, c, r), a = r, t.current.lanes = a, $i(t, a), kn(t), e[Qa] = t.current, Vc(e), new hl(t);
  }, Ho.version = "19.2.3", Ho;
}
var Np;
function zb() {
  if (Np) return fu.exports;
  Np = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (i) {
        console.error(i);
      }
  }
  return n(), fu.exports = xb(), fu.exports;
}
var Ab = zb();
const Nb = /* @__PURE__ */ Ag(Ab);
const Ng = (...n) => n.filter((i, o, l) => !!i && i.trim() !== "" && l.indexOf(i) === o).join(" ").trim();
const Cb = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const Ob = (n) => n.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (i, o, l) => l ? l.toUpperCase() : o.toLowerCase()
);
const Cp = (n) => {
  const i = Ob(n);
  return i.charAt(0).toUpperCase() + i.slice(1);
};
var Mb = {
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
const Rb = (n) => {
  for (const i in n)
    if (i.startsWith("aria-") || i === "role" || i === "title")
      return !0;
  return !1;
};
const Db = C.forwardRef(
  ({
    color: n = "currentColor",
    size: i = 24,
    strokeWidth: o = 2,
    absoluteStrokeWidth: l,
    className: s = "",
    children: d,
    iconNode: m,
    ...f
  }, p) => C.createElement(
    "svg",
    {
      ref: p,
      ...Mb,
      width: i,
      height: i,
      stroke: n,
      strokeWidth: l ? Number(o) * 24 / Number(i) : o,
      className: Ng("lucide", s),
      ...!d && !Rb(f) && { "aria-hidden": "true" },
      ...f
    },
    [
      ...m.map(([_, v]) => C.createElement(_, v)),
      ...Array.isArray(d) ? d : [d]
    ]
  )
);
const ue = (n, i) => {
  const o = C.forwardRef(
    ({ className: l, ...s }, d) => C.createElement(Db, {
      ref: d,
      iconNode: i,
      className: Ng(
        `lucide-${Cb(Cp(n))}`,
        `lucide-${n}`,
        l
      ),
      ...s
    })
  );
  return o.displayName = Cp(n), o;
};
const jb = [
  [
    "path",
    {
      d: "M11 9a1 1 0 0 0 1-1V5.061a1 1 0 0 1 1.811-.75l6.836 6.836a1.207 1.207 0 0 1 0 1.707l-6.836 6.835a1 1 0 0 1-1.811-.75V16a1 1 0 0 0-1-1H9a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z",
      key: "67vhrh"
    }
  ],
  ["path", { d: "M4 9v6", key: "bns7oa" }]
], Lb = ue("arrow-big-right-dash", jb);
const Ub = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
], Yb = ue("arrow-left", Ub);
const Hb = [
  ["path", { d: "m11 7-3 5h4l-3 5", key: "b4a64w" }],
  ["path", { d: "M14.856 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.935", key: "lre1cr" }],
  ["path", { d: "M22 14v-4", key: "14q9d5" }],
  ["path", { d: "M5.14 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.936", key: "13q5k0" }]
];
ue("battery-charging", Hb);
const Zb = [
  ["path", { d: "M10 10v4", key: "1mb2ec" }],
  ["path", { d: "M14 10v4", key: "1nt88p" }],
  ["path", { d: "M22 14v-4", key: "14q9d5" }],
  ["path", { d: "M6 10v4", key: "1n77qd" }],
  ["rect", { x: "2", y: "6", width: "16", height: "12", rx: "2", key: "13zb55" }]
], Bb = ue("battery-full", Zb);
const Gb = [
  ["path", { d: "M22 14v-4", key: "14q9d5" }],
  ["path", { d: "M6 14v-4", key: "14a6bd" }],
  ["rect", { x: "2", y: "6", width: "16", height: "12", rx: "2", key: "13zb55" }]
], Kb = ue("battery-low", Gb);
const qb = [
  ["path", { d: "M10 14v-4", key: "suye4c" }],
  ["path", { d: "M22 14v-4", key: "14q9d5" }],
  ["path", { d: "M6 14v-4", key: "14a6bd" }],
  ["rect", { x: "2", y: "6", width: "16", height: "12", rx: "2", key: "13zb55" }]
], Vb = ue("battery-medium", qb);
const Xb = [
  ["path", { d: "M 22 14 L 22 10", key: "nqc4tb" }],
  ["rect", { x: "2", y: "6", width: "16", height: "12", rx: "2", key: "13zb55" }]
], $b = ue("battery", Xb);
const Pb = [
  [
    "path",
    {
      d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
      key: "oz39mx"
    }
  ]
];
ue("bookmark", Pb);
const Ib = [
  ["path", { d: "M12 18V5", key: "adv99a" }],
  ["path", { d: "M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4", key: "1e3is1" }],
  ["path", { d: "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5", key: "1gqd8o" }],
  ["path", { d: "M17.997 5.125a4 4 0 0 1 2.526 5.77", key: "iwvgf7" }],
  ["path", { d: "M18 18a4 4 0 0 0 2-7.464", key: "efp6ie" }],
  ["path", { d: "M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517", key: "1gq6am" }],
  ["path", { d: "M6 18a4 4 0 0 1-2-7.464", key: "k1g0md" }],
  ["path", { d: "M6.003 5.125a4 4 0 0 0-2.526 5.77", key: "q97ue3" }]
], Fb = ue("brain", Ib);
const Qb = [
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
], Ku = ue("brush-cleaning", Qb);
const Jb = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], Cg = ue("check", Jb);
const Wb = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], qu = ue("chevron-down", Wb);
const e0 = [
  ["path", { d: "m15 10 5 5-5 5", key: "qqa56n" }],
  ["path", { d: "M4 4v7a4 4 0 0 0 4 4h12", key: "z08zvw" }]
], t0 = ue("corner-down-right", e0);
const n0 = [
  ["path", { d: "M2 8h20", key: "d11cs7" }],
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }],
  ["path", { d: "M6 16h12", key: "u522kt" }]
], a0 = ue("dock", n0);
const i0 = [
  [
    "path",
    {
      d: "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z",
      key: "c7niix"
    }
  ]
], Bl = ue("droplet", i0);
const o0 = [
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
], r0 = ue("droplets", o0);
const l0 = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
  ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }]
], s0 = ue("ellipsis-vertical", l0);
const c0 = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
  ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
], u0 = ue("ellipsis", c0);
const d0 = [
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
], m0 = ue("footprints", d0);
const f0 = [
  ["path", { d: "m12 14 4-4", key: "9kzdfg" }],
  ["path", { d: "M3.34 19a10 10 0 1 1 17.32 0", key: "19p75a" }]
], _0 = ue("gauge", f0);
const p0 = [
  [
    "path",
    {
      d: "M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3",
      key: "11za1p"
    }
  ],
  ["path", { d: "m16 19 2 2 4-4", key: "1b14m6" }]
], g0 = ue("grid-2x2-check", p0);
const h0 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
], v0 = ue("history", h0);
const y0 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
], b0 = ue("info", y0);
const S0 = [
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
], k0 = ue("layers", S0);
const E0 = [
  ["path", { d: "M3 5h.01", key: "18ugdj" }],
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M3 19h.01", key: "noohij" }],
  ["path", { d: "M8 5h13", key: "1pao27" }],
  ["path", { d: "M8 12h13", key: "1za7za" }],
  ["path", { d: "M8 19h13", key: "m83p4d" }]
], w0 = ue("list", E0);
const T0 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 9.9-1", key: "1mm8w8" }]
], x0 = ue("lock-open", T0);
const z0 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
], A0 = ue("lock", z0);
const N0 = [
  [
    "path",
    {
      d: "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",
      key: "169xi5"
    }
  ],
  ["path", { d: "M15 5.764v15", key: "1pn4in" }],
  ["path", { d: "M9 3.236v15", key: "1uimfh" }]
], Vu = ue("map", N0);
const C0 = [["path", { d: "M5 12h14", key: "1ays0h" }]], O0 = ue("minus", C0);
const M0 = [
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  [
    "path",
    {
      d: "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",
      key: "2d38gg"
    }
  ],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
], R0 = ue("octagon-x", M0);
const D0 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 15h18", key: "5xshup" }],
  ["path", { d: "m15 8-3 3-3-3", key: "1oxy1z" }]
], j0 = ue("panel-bottom-close", D0);
const L0 = [
  ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1", key: "kaeet6" }],
  ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1", key: "1wsw3u" }]
], U0 = ue("pause", L0);
const Y0 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
], H0 = ue("pencil", Y0);
const Z0 = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
], Cu = ue("play", Z0);
const B0 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], Og = ue("plus", B0);
const G0 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
], K0 = ue("rotate-ccw", G0);
const q0 = [
  ["circle", { cx: "6", cy: "19", r: "3", key: "1kj8tv" }],
  ["path", { d: "M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15", key: "1d8sl" }],
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }]
], V0 = ue("route", q0);
const X0 = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }]
], Mg = ue("scan", X0);
const $0 = [
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["path", { d: "M19 7h-9", key: "6i9tg" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
], P0 = ue("settings-2", $0);
const I0 = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], F0 = ue("settings", I0);
const Q0 = [
  [
    "path",
    {
      d: "M14 11a2 2 0 1 1-4 0 4 4 0 0 1 8 0 6 6 0 0 1-12 0 8 8 0 0 1 16 0 10 10 0 1 1-20 0 11.93 11.93 0 0 1 2.42-7.22 2 2 0 1 1 3.16 2.44",
      key: "1cn552"
    }
  ]
], J0 = ue("shell", Q0);
const W0 = [
  ["path", { d: "M2 20h.01", key: "4haj6o" }],
  ["path", { d: "M7 20v-4", key: "j294jx" }],
  ["path", { d: "M12 20v-8", key: "i3yub9" }],
  ["path", { d: "M17 20V8", key: "1tkaf5" }]
], e1 = ue("signal-high", W0);
const t1 = [
  ["path", { d: "M2 20h.01", key: "4haj6o" }],
  ["path", { d: "M7 20v-4", key: "j294jx" }]
], n1 = ue("signal-low", t1);
const a1 = [
  ["path", { d: "M2 20h.01", key: "4haj6o" }],
  ["path", { d: "M7 20v-4", key: "j294jx" }],
  ["path", { d: "M12 20v-8", key: "i3yub9" }]
], i1 = ue("signal-medium", a1);
const o1 = [
  ["path", { d: "M2 20h.01", key: "4haj6o" }],
  ["path", { d: "M7 20v-4", key: "j294jx" }],
  ["path", { d: "M12 20v-8", key: "i3yub9" }],
  ["path", { d: "M17 20V8", key: "1tkaf5" }],
  ["path", { d: "M22 4v16", key: "sih9yq" }]
], r1 = ue("signal", o1);
const l1 = [
  ["path", { d: "M10 5H3", key: "1qgfaw" }],
  ["path", { d: "M12 19H3", key: "yhmn1j" }],
  ["path", { d: "M14 3v4", key: "1sua03" }],
  ["path", { d: "M16 17v4", key: "1q0r14" }],
  ["path", { d: "M21 12h-9", key: "1o4lsq" }],
  ["path", { d: "M21 19h-5", key: "1rlt1p" }],
  ["path", { d: "M21 5h-7", key: "1oszz2" }],
  ["path", { d: "M8 10v4", key: "tgpxqk" }],
  ["path", { d: "M8 12H3", key: "a7s4jb" }]
], s1 = ue("sliders-horizontal", l1);
const c1 = [
  [
    "path",
    {
      d: "M10.029 4.285A2 2 0 0 0 7 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",
      key: "1ystz2"
    }
  ],
  ["path", { d: "M3 4v16", key: "1ph11n" }]
], u1 = ue("step-forward", c1);
const d1 = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
], m1 = ue("sun", d1);
const f1 = [
  ["line", { x1: "10", x2: "14", y1: "2", y2: "2", key: "14vaq8" }],
  ["line", { x1: "12", x2: "15", y1: "14", y2: "11", key: "17fdiu" }],
  ["circle", { cx: "12", cy: "14", r: "8", key: "1e1u0o" }]
], _1 = ue("timer", f1);
const p1 = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
], Ou = ue("trash-2", p1);
const g1 = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }],
  ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }]
], h1 = ue("volume-2", g1);
const v1 = [
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
], y1 = ue("waves-arrow-down", v1);
const b1 = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
], S1 = ue("zap", b1), ze = {
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
}, Mu = {
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
}, k1 = {
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
}, Ol = {
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
}, E1 = {
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
function de(n, i, o, l) {
  return {
    key: Mu[n].key,
    platform: "switch",
    labelKey: i,
    descriptionKey: o,
    ...l
  };
}
function wt(n, i, o, l) {
  return {
    key: gn[n].key,
    platform: "select",
    labelKey: i,
    descriptionKey: o,
    ...l
  };
}
function Rg(n, i, o, l) {
  return {
    key: Ol[n].key,
    platform: "number",
    labelKey: i,
    descriptionKey: o,
    ...l
  };
}
function rn(n, i, o, l) {
  return {
    key: k1[n].key,
    platform: "button",
    labelKey: i,
    descriptionKey: o,
    ...l
  };
}
function Rl(n, i, o, l) {
  return {
    key: E1[n].key,
    platform: "time",
    labelKey: i,
    descriptionKey: o,
    ...l
  };
}
const Xu = {
  key: "quick_settings",
  titleKey: "settings.quick_settings.title",
  order: 1,
  entities: [
    de("CHILD_LOCK", "settings.quick_settings.child_lock", "settings.quick_settings.child_lock_desc"),
    de("RESUME_CLEANING", "settings.quick_settings.resume_cleaning", "settings.quick_settings.resume_cleaning_desc"),
    de("DND", "settings.quick_settings.dnd", "settings.quick_settings.dnd_desc"),
    Rl("DND_START", "settings.quick_settings.dnd_start", void 0, { parentKey: "dnd" }),
    Rl("DND_END", "settings.quick_settings.dnd_end", void 0, { parentKey: "dnd" }),
    de(
      "DND_DISABLE_RESUME_CLEANING",
      "settings.quick_settings.dnd_disable_resume",
      "settings.quick_settings.dnd_disable_resume_desc",
      { parentKey: "dnd" }
    ),
    de(
      "DND_DISABLE_AUTO_EMPTY",
      "settings.quick_settings.dnd_disable_auto_empty",
      "settings.quick_settings.dnd_disable_auto_empty_desc",
      { parentKey: "dnd" }
    ),
    de(
      "DND_REDUCE_VOLUME",
      "settings.quick_settings.dnd_reduce_volume",
      "settings.quick_settings.dnd_reduce_volume_desc",
      { parentKey: "dnd" }
    )
  ]
}, $u = {
  key: "quick_actions",
  titleKey: "settings.station_controls.title",
  order: 2,
  entities: [
    rn("SELF_CLEAN", "settings.station_controls.self_clean", "settings.station_controls.self_clean_desc"),
    rn("MANUAL_DRYING", "settings.station_controls.manual_drying", "settings.station_controls.manual_drying_desc"),
    rn(
      "WATER_TANK_DRAINING",
      "settings.station_controls.water_tank_draining",
      "settings.station_controls.water_tank_draining_desc"
    ),
    rn(
      "BASE_STATION_CLEANING",
      "settings.station_controls.base_station_cleaning",
      "settings.station_controls.base_station_cleaning_desc"
    ),
    rn(
      "EMPTY_WATER_TANK",
      "settings.station_controls.empty_water_tank",
      "settings.station_controls.empty_water_tank_desc"
    ),
    rn(
      "START_AUTO_EMPTY",
      "settings.station_controls.start_auto_empty",
      "settings.station_controls.start_auto_empty_desc"
    ),
    rn(
      "START_RECLEANING",
      "settings.station_controls.start_recleaning",
      "settings.station_controls.start_recleaning_desc"
    ),
    rn("CLEAR_WARNING", "settings.station_controls.clear_warning", "settings.station_controls.clear_warning_desc")
  ]
}, Pu = {
  key: "carpet_settings",
  titleKey: "settings.carpet.title",
  order: 3,
  entities: [
    de("CARPET_RECOGNITION", "settings.carpet.carpet_recognition", "settings.carpet.carpet_recognition_desc"),
    de("CARPET_AVOIDANCE", "settings.carpet.carpet_avoidance", "settings.carpet.carpet_avoidance_desc"),
    wt("CARPET_CLEANING", "settings.carpet.cleaning_mode", "settings.carpet.cleaning_mode_desc"),
    de("CLEAN_CARPETS_FIRST", "settings.carpet.clean_carpets_first", "settings.carpet.clean_carpets_first_desc"),
    de("CARPET_BOOST", "settings.carpet.carpet_boost", "settings.carpet.carpet_boost_desc"),
    de("INTENSIVE_CARPET_CLEANING", "settings.carpet.intensive_cleaning", "settings.carpet.intensive_cleaning_desc"),
    de("SIDE_BRUSH_CARPET_ROTATE", "settings.carpet.side_brush_rotate", "settings.carpet.side_brush_rotate_desc"),
    wt("CARPET_SENSITIVITY", "settings.carpet.sensitivity", "settings.carpet.sensitivity_desc")
  ]
}, Iu = {
  key: "floor_settings",
  titleKey: "settings.floor.title",
  order: 4,
  entities: [
    de("OBSTACLE_AVOIDANCE", "settings.floor.obstacle_avoidance", "settings.floor.obstacle_avoidance_desc"),
    de("COLLISION_AVOIDANCE", "settings.floor.collision_avoidance", "settings.floor.collision_avoidance_desc"),
    de("AUTO_MOUNT_MOP", "settings.floor.auto_mount_mop", "settings.floor.auto_mount_mop_desc"),
    de("TIGHT_MOPPING", "settings.floor.tight_mopping", "settings.floor.tight_mopping_desc"),
    de("STAIN_AVOIDANCE", "settings.floor.stain_avoidance", "settings.floor.stain_avoidance_desc"),
    de(
      "FLOOR_DIRECTION_CLEANING",
      "settings.floor.floor_direction_cleaning",
      "settings.floor.floor_direction_cleaning_desc"
    ),
    de("LARGE_PARTICLES_BOOST", "settings.floor.large_particles_boost", "settings.floor.large_particles_boost_desc"),
    de("PET_FOCUSED_CLEANING", "settings.floor.pet_focused_cleaning", "settings.floor.pet_focused_cleaning_desc"),
    wt("AUTO_RECLEANING", "settings.floor.auto_recleaning", "settings.floor.auto_recleaning_desc"),
    wt(
      "LOW_LYING_AREA_FREQUENCY",
      "settings.floor.low_lying_area_frequency",
      "settings.floor.low_lying_area_frequency_desc"
    )
  ]
}, Fu = {
  key: "edge_corner",
  titleKey: "settings.edge_corner.title",
  order: 5,
  entities: [
    de("SIDE_REACH", "settings.edge_corner.side_reach", "settings.edge_corner.side_reach_desc"),
    de("MOP_EXTEND", "settings.edge_corner.mop_extend", "settings.edge_corner.mop_extend_desc"),
    de("GAP_CLEANING_EXTENSION", "settings.edge_corner.gap_cleaning", "settings.edge_corner.gap_cleaning_desc", {
      parentKey: "mop_extend"
    }),
    de("MOPPING_UNDER_FURNITURES", "settings.edge_corner.mopping_under", "settings.edge_corner.mopping_under_desc", {
      parentKey: "mop_extend"
    }),
    wt("MOP_EXTEND_FREQUENCY", "settings.edge_corner.extend_frequency", "settings.edge_corner.extend_frequency_desc")
  ]
}, Qu = {
  key: "volume",
  titleKey: "settings.volume.title",
  order: 6,
  entities: [
    Rg("VOLUME", "settings.volume.volume", void 0, { renderHint: "volume", min: 0, max: 100 }),
    de("VOICE_ASSISTANT", "settings.volume.voice_assistant", "settings.volume.voice_assistant_desc"),
    wt("VOICE_ASSISTANT_LANGUAGE", "settings.volume.voice_language", "settings.volume.voice_language_desc", {
      parentKey: "voice_assistant"
    }),
    de(
      "STREAMING_VOICE_PROMPT",
      "settings.volume.streaming_voice_prompt",
      "settings.volume.streaming_voice_prompt_desc"
    )
  ]
}, Ju = {
  key: "dock_settings",
  titleKey: "settings.dock.title",
  order: 7,
  entities: [
    de("SELF_CLEAN", "settings.dock.self_clean", "settings.dock.self_clean_desc"),
    de("AUTO_DUST_COLLECTING", "settings.dock.auto_dust_collecting", "settings.dock.auto_dust_collecting_desc"),
    wt("AUTO_EMPTY_MODE", "settings.dock.auto_empty_mode", "settings.dock.auto_empty_mode_desc"),
    wt("AUTO_EMPTY_FREQUENCY", "settings.dock.auto_empty_frequency", "settings.dock.auto_empty_frequency_desc"),
    de("AUTO_ADD_DETERGENT", "settings.dock.auto_detergent", "settings.dock.auto_detergent_desc"),
    de(
      "MOP_WASHING_WITH_DETERGENT",
      "settings.dock.mop_washing_with_detergent",
      "settings.dock.mop_washing_with_detergent_desc"
    ),
    de("MOPPING_WITH_DETERGENT", "settings.dock.mopping_with_detergent", "settings.dock.mopping_with_detergent_desc"),
    de("WATER_ELECTROLYSIS", "settings.dock.water_electrolysis", "settings.dock.water_electrolysis_desc"),
    de("AUTO_WATER_REFILLING", "settings.dock.auto_water_refilling", "settings.dock.auto_water_refilling_desc"),
    de("SMART_MOP_WASHING", "settings.dock.smart_washing", "settings.dock.smart_washing_desc"),
    wt("MOP_WASH_LEVEL", "settings.dock.mop_wash_level", "settings.dock.mop_wash_level_desc"),
    wt("WASHING_MODE", "settings.dock.washing_mode", "settings.dock.washing_mode_desc"),
    wt("WATER_TEMPERATURE", "settings.dock.water_temperature", "settings.dock.water_temperature_desc"),
    de("AUTO_DRYING", "settings.dock.auto_drying", "settings.dock.auto_drying_desc"),
    wt("DRYING_TIME", "settings.dock.drying_time", "settings.dock.drying_time_desc", { useSegmentedControl: !0 }),
    wt("AUTO_REWASHING", "settings.dock.auto_rewashing", "settings.dock.auto_rewashing_desc"),
    de("OFF_PEAK_CHARGING", "settings.dock.off_peak_charging", "settings.dock.off_peak_charging_desc"),
    Rl("OFF_PEAK_CHARGING_START", "settings.dock.off_peak_charging_start", void 0, {
      parentKey: "off_peak_charging"
    }),
    Rl("OFF_PEAK_CHARGING_END", "settings.dock.off_peak_charging_end", void 0, {
      parentKey: "off_peak_charging"
    }),
    rn("BASE_STATION_CLEANING", "settings.dock.station_cleaning", "settings.dock.station_cleaning_desc"),
    rn("BASE_STATION_SELF_REPAIR", "settings.dock.self_repair", "settings.dock.self_repair_desc"),
    wt("SCRAPER_FREQUENCY", "settings.dock.scraper_frequency", "settings.dock.scraper_frequency_desc")
  ]
}, Wu = {
  key: "ai_detection",
  titleKey: "settings.ai_detection.title",
  order: 8,
  entities: [
    de(
      "INTELLIGENT_RECOGNITION",
      "settings.ai_detection.intelligent_recognition",
      "settings.ai_detection.intelligent_recognition_desc"
    ),
    de(
      "AI_OBSTACLE_DETECTION",
      "settings.ai_detection.ai_obstacle_detection",
      "settings.ai_detection.ai_obstacle_detection_desc"
    ),
    de(
      "FUZZY_OBSTACLE_DETECTION",
      "settings.ai_detection.fuzzy_obstacle_detection",
      "settings.ai_detection.fuzzy_obstacle_detection_desc"
    ),
    de(
      "AI_OBSTACLE_IMAGE_UPLOAD",
      "settings.ai_detection.ai_obstacle_image_upload",
      "settings.ai_detection.ai_obstacle_image_upload_desc"
    ),
    de(
      "AI_OBSTACLE_PICTURE",
      "settings.ai_detection.ai_obstacle_picture",
      "settings.ai_detection.ai_obstacle_picture_desc"
    ),
    de("AI_PET_DETECTION", "settings.ai_detection.ai_pet_detection", "settings.ai_detection.ai_pet_detection_desc"),
    de("AI_PET_AVOIDANCE", "settings.ai_detection.ai_pet_avoidance", "settings.ai_detection.ai_pet_avoidance_desc"),
    de(
      "PET_FOCUSED_DETECTION",
      "settings.ai_detection.pet_focused_detection",
      "settings.ai_detection.pet_focused_detection_desc"
    ),
    de("PET_PICTURE", "settings.ai_detection.pet_picture", "settings.ai_detection.pet_picture_desc"),
    de(
      "AI_HUMAN_DETECTION",
      "settings.ai_detection.ai_human_detection",
      "settings.ai_detection.ai_human_detection_desc"
    ),
    de("HUMAN_FOLLOW", "settings.ai_detection.human_follow", "settings.ai_detection.human_follow_desc"),
    de(
      "AI_FURNITURE_DETECTION",
      "settings.ai_detection.ai_furniture_detection",
      "settings.ai_detection.ai_furniture_detection_desc"
    ),
    de(
      "AI_FLUID_DETECTION",
      "settings.ai_detection.ai_fluid_detection",
      "settings.ai_detection.ai_fluid_detection_desc"
    ),
    de("FILL_LIGHT", "settings.ai_detection.fill_light", "settings.ai_detection.fill_light_desc"),
    de(
      "CAMERA_LIGHT_BRIGHTNESS_AUTO",
      "settings.ai_detection.camera_light_auto",
      "settings.ai_detection.camera_light_auto_desc"
    ),
    Rg(
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
}, ed = {
  key: "map_settings",
  titleKey: "settings.map.title",
  order: 9,
  entities: [
    de("MULTI_FLOOR_MAP", "settings.map.multi_floor", "settings.map.multi_floor_desc"),
    wt("MAP_ROTATION", "settings.map.rotation", "settings.map.rotation_desc"),
    rn("START_MAPPING", "settings.map.start_mapping", void 0, { confirm: !0 }),
    rn("START_FAST_MAPPING", "settings.map.start_fast_mapping", void 0, { confirm: !0 })
  ]
}, w1 = [
  Xu,
  $u,
  Pu,
  Iu,
  Fu,
  Qu,
  Ju,
  Wu,
  ed
].sort((n, i) => n.order - i.order), Dl = {
  cleaningMode: { platform: "select", key: gn.CLEANING_MODE.key },
  cleangeniusMode: { platform: "select", key: gn.CLEANGENIUS_MODE.key },
  cleangenius: { platform: "select", key: gn.CLEANGENIUS.key },
  suctionLevel: { platform: "select", key: gn.SUCTION_LEVEL.key },
  waterVolume: { platform: "select", key: gn.WATER_VOLUME.key },
  mopPadHumidity: { platform: "select", key: gn.MOP_PAD_HUMIDITY.key },
  cleaningRoute: { platform: "select", key: gn.CLEANING_ROUTE.key },
  maxSuctionPower: { platform: "switch", key: Mu.MAX_SUCTION_POWER.key },
  wetnessLevel: { platform: "number", key: Ol.WETNESS_LEVEL.key },
  selfCleanFrequency: { platform: "select", key: gn.SELF_CLEAN_FREQUENCY.key },
  selfCleanArea: { platform: "number", key: Ol.SELF_CLEAN_AREA.key },
  selfCleanTime: { platform: "number", key: Ol.SELF_CLEAN_TIME.key },
  stateSensor: { platform: "sensor", key: ze.STATE.key },
  customizedCleaning: { platform: "switch", key: Mu.CUSTOMIZED_CLEANING.key },
  selectedMap: { platform: "select", key: gn.SELECTED_MAP.key }
};
function T1() {
  const n = [
    ...w1.flatMap((o) => o.entities),
    ...Object.values(Dl)
  ], i = /* @__PURE__ */ new Set();
  for (const { platform: o, key: l } of n)
    o !== "attribute" && i.add(`${o}:${l}`);
  return i;
}
const x1 = /* @__PURE__ */ g.jsx($b, {}), z1 = /* @__PURE__ */ g.jsx(Kb, {}), A1 = /* @__PURE__ */ g.jsx(Vb, {}), N1 = /* @__PURE__ */ g.jsx(Bb, {}), C1 = /* @__PURE__ */ g.jsx(v0, {}), O1 = /* @__PURE__ */ g.jsx(Mg, {}), M1 = /* @__PURE__ */ g.jsx(Cu, {}), R1 = /* @__PURE__ */ g.jsx(U0, {}), D1 = /* @__PURE__ */ g.jsx(u1, {}), j1 = /* @__PURE__ */ g.jsx(R0, {}), L1 = /* @__PURE__ */ g.jsx(j0, {}), U1 = /* @__PURE__ */ g.jsx(Ku, {}), Y1 = /* @__PURE__ */ g.jsx(Bl, {}), Dg = /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
  /* @__PURE__ */ g.jsx(Ku, {}),
  /* @__PURE__ */ g.jsx(Og, {}),
  /* @__PURE__ */ g.jsx(Bl, {})
] }), H1 = /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
  /* @__PURE__ */ g.jsx(Ku, {}),
  /* @__PURE__ */ g.jsx(Lb, {}),
  /* @__PURE__ */ g.jsx(Bl, {})
] }), Z1 = /* @__PURE__ */ g.jsx(n1, {}), B1 = /* @__PURE__ */ g.jsx(i1, {}), G1 = /* @__PURE__ */ g.jsx(e1, {}), K1 = /* @__PURE__ */ g.jsx(r1, {}), q1 = /* @__PURE__ */ g.jsx(Mg, {}), V1 = /* @__PURE__ */ g.jsx(_1, {}), X1 = /* @__PURE__ */ g.jsx(g0, {}), $1 = /* @__PURE__ */ g.jsx(S1, {}), P1 = /* @__PURE__ */ g.jsx(V0, {}), I1 = /* @__PURE__ */ g.jsx(J0, {}), F1 = /* @__PURE__ */ g.jsx(y1, {}), jg = /* @__PURE__ */ g.jsx(s1, {}), Lg = /* @__PURE__ */ g.jsx(Bl, {}), Q1 = {
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
}, Op = {
  sweeping: "vacuuming",
  spot_cleaning: "vacuuming",
  mopping: "mopping",
  second_cleaning: "mopping",
  // Mopping phase of "mop after vac"
  sweeping_and_mopping: "vacuuming_and_mopping",
  extra_cleaning: "vacuuming",
  initial_deep_cleaning: "vacuuming_and_mopping",
  floor_maintaining: "mopping"
}, J1 = {
  cleaning: "cleaning",
  docked: "idle",
  idle: "idle",
  paused: "paused",
  returning: "returning",
  error: "error"
}, W1 = "idle", eS = /* @__PURE__ */ new Set(["cleaning", "paused", "returning"]);
function Ug(n, i) {
  return n === "cleaning" || n === "paused" || n === "returning" ? !0 : eS.has(i ?? "");
}
const tS = "none", nS = {
  SHORTCUTS: "shortcuts"
}, aS = {
  WETNESS: {
    MIN: 1,
    MAX: 32
  }
}, yl = {
  SELECT: "select",
  SWITCH: "switch",
  NUMBER: "number",
  VACUUM: "vacuum"
}, Zo = {
  SELECT_OPTION: "select_option",
  TURN_ON: "turn_on",
  TURN_OFF: "turn_off",
  SET_VALUE: "set_value",
  SET_FAN_SPEED: "set_fan_speed"
}, iS = {
  ALL: "all"
}, Mp = "Customize", Ru = {
  MAP_LOCKED: "dreame-vacuum-map-locked",
  AREA_SELECTION_MODE: "dreame-vacuum-card:area_selection_mode",
  REPEAT_COUNT: "dreame-vacuum-card:repeat_count"
};
function Du(n, i) {
  return `${n}:${i}`;
}
const Kn = {
  MODE: iS.ALL,
  WETNESS_LEVEL: 20,
  MAX_SUCTION_POWER: !1,
  SELF_CLEAN_AREA: 20,
  SELF_CLEAN_AREA_MIN: 10,
  SELF_CLEAN_AREA_MAX: 35,
  SELF_CLEAN_TIME: 25,
  SELF_CLEAN_TIME_MIN: 10,
  SELF_CLEAN_TIME_MAX: 50
};
let hu = !1;
const pe = {
  /** Enable or disable debug logging */
  setDebug: (n) => {
    hu = n;
  },
  /** Check if debug logging is enabled */
  isDebugEnabled: () => hu,
  /** Log debug message (only when debug is enabled) */
  debug: (n, ...i) => {
    hu && console.debug(`[Dreame][${n}]`, ...i);
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
function oS() {
  const n = {
    enableDebug: () => {
      pe.setDebug(!0), pe.info("Debug logging enabled");
    },
    disableDebug: () => {
      pe.setDebug(!1), pe.info("Debug logging disabled");
    },
    isDebugEnabled: () => pe.isDebugEnabled()
  };
  window.dreameVacuum = n;
}
function rS(n) {
  const i = C.useCallback(
    (m, f, p) => {
      pe.debug("HA", "Service call:", m, f, p), n.callService(m, f, p);
    },
    [n]
  ), o = C.useCallback(
    (m, f) => {
      pe.debug("HA", "Select:", m, "→", f);
      const p = {
        entity_id: m,
        option: f
      };
      i(yl.SELECT, Zo.SELECT_OPTION, p);
    },
    [i]
  ), l = C.useCallback(
    (m, f) => {
      pe.debug("HA", "Switch:", m, "→", f ? "ON" : "OFF");
      const p = f ? Zo.TURN_ON : Zo.TURN_OFF;
      i(yl.SWITCH, p, { entity_id: m });
    },
    [i]
  ), s = C.useCallback(
    (m, f) => {
      pe.debug("HA", "Number:", m, "→", f);
      const p = {
        entity_id: m,
        value: f
      };
      i(yl.NUMBER, Zo.SET_VALUE, p);
    },
    [i]
  ), d = C.useCallback(
    (m, f) => {
      pe.debug("HA", "Vacuum Set fan speed:", m, "→", f), i(yl.VACUUM, Zo.SET_FAN_SPEED, {
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
const lS = /* @__PURE__ */ new Set(["switch", "select", "number", "button", "time"]), sS = /* @__PURE__ */ new Set(["saved_map", "wifi_map"]), cS = /_room_(\d+)_/;
function td(n, i) {
  return `${n}:${i}`;
}
function Yg(n, i, o) {
  return `${n}:${td(i, o)}`;
}
function uS(n, i, o) {
  const l = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), d = [];
  for (const m of n) {
    if (m.device_id !== i || m.disabled_by || !m.translation_key || sS.has(m.translation_key) || m.unique_id.includes("_shortcut_"))
      continue;
    const f = m.entity_id.split(".")[0];
    if (!f)
      continue;
    const p = m.unique_id.match(cS);
    if (p) {
      s.set(Yg(Number(p[1]), f, m.translation_key), m.entity_id);
      continue;
    }
    const _ = td(f, m.translation_key);
    if (l.has(_)) {
      pe.warn("Duplicate companion entity ignored:", _, m.entity_id);
      continue;
    }
    l.set(_, m.entity_id);
    const v = m.entity_category ?? null;
    lS.has(f) && (v === null || v === "config") && !o.has(_) && d.push({ entityId: m.entity_id, domain: f, translationKey: m.translation_key });
  }
  return { entities: l, rooms: s, extras: d };
}
const vu = { entities: /* @__PURE__ */ new Map(), rooms: /* @__PURE__ */ new Map(), extras: [] };
function dS(n, i) {
  const o = n?.attributes.friendly_name;
  return typeof o == "string" && o.length > 0 ? o : i.replaceAll("_", " ");
}
function mS(n, i) {
  const [o, l] = C.useState("loading"), [s, d] = C.useState(vu), m = C.useRef(n), f = C.useRef(!1);
  return m.current = n, C.useEffect(() => {
    let p = !0, _;
    f.current = !1, l("loading"), d(vu);
    async function v() {
      const y = m.current;
      try {
        const S = await y.callWS({
          type: "config/entity_registry/get",
          entity_id: i
        });
        if (!S.device_id)
          throw new Error(`Vacuum ${i} is not attached to a device`);
        const k = await y.callWS({ type: "config/entity_registry/list" });
        if (!p) return;
        d(uS(k, S.device_id, T1())), l("ready"), f.current = !1;
      } catch (S) {
        if (!p) return;
        f.current || (pe.error(
          "Entity discovery failed. Companion controls stay hidden until the entity registry can be read.",
          S
        ), f.current = !0), d(vu), l("error");
      }
    }
    return v().then(async () => {
      const y = m.current.connection;
      !p || !y || (_ = await y.subscribeEvents(() => {
        v();
      }, "entity_registry_updated"), p || _());
    }), () => {
      p = !1, _?.();
    };
  }, [i]), C.useMemo(() => {
    const p = o === "ready";
    return {
      status: o,
      get: (_, v) => p ? s.entities.get(td(_, v)) : void 0,
      getRoom: (_, v, y) => p ? s.rooms.get(Yg(_, v, y)) : void 0,
      extras: p ? s.extras.flatMap((_) => {
        const v = n.states[_.entityId];
        return v ? [{ ..._, friendlyName: dS(v, _.translationKey) }] : [];
      }) : []
    };
  }, [n.states, s, o]);
}
const nd = C.createContext(null);
function Pa() {
  const n = C.useContext(nd);
  if (!n)
    throw new Error("useVacuumCardContext must be used within VacuumCardProvider");
  return n;
}
function ct() {
  return Pa().hass;
}
function Vt() {
  return Pa().entity;
}
function Gl() {
  return Pa().config;
}
function ad() {
  return Pa().language;
}
function id() {
  return ct().config?.unit_system?.area ?? "m²";
}
function od() {
  return Pa().isRtl;
}
function Xn() {
  return Pa().machineState;
}
function cn() {
  return Pa().deviceEntities;
}
function rd() {
  const { get: n } = cn();
  return C.useMemo(() => {
    const i = {};
    for (const [o, { platform: l, key: s }] of Object.entries(Dl))
      i[o] = n(l, s);
    return i;
  }, [n]);
}
function fS(n) {
  return n === "no_go" || n === "no_mop" ? n : "zone";
}
function _S(n) {
  try {
    return fS(localStorage.getItem(n));
  } catch {
    return "zone";
  }
}
function pS(n, i) {
  try {
    localStorage.setItem(n, i);
  } catch {
  }
}
function gS(n) {
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
function hS(n, i) {
  try {
    localStorage.setItem(n, String(i));
  } catch {
  }
}
function vS(n) {
  try {
    localStorage.removeItem(n);
  } catch {
  }
}
function yS({ vacuumEntityId: n, defaultMode: i = Kn.MODE }) {
  const o = Du(Ru.AREA_SELECTION_MODE, n), l = Du(Ru.REPEAT_COUNT, n), [s, d] = C.useState(i), [m, f] = C.useState(
    () => _S(o)
  ), [p, _] = C.useState(/* @__PURE__ */ new Map()), [v, y] = C.useState([]), [S, k] = C.useState(!1), [E, z] = C.useState(!1), [R, D] = C.useState(!1), [Y, L] = C.useState(() => gS(l)), H = C.useCallback((Q) => {
    pe.debug("UI", "Mode changed:", Q), d(Q), _(/* @__PURE__ */ new Map()), y([]);
  }, []), X = C.useCallback(
    (Q) => {
      pe.debug("UI", "Area selection mode changed:", Q), f(Q), pS(o, Q), y([]);
    },
    [o]
  ), ie = C.useCallback((Q, ee) => {
    _((J) => {
      const A = new Map(J);
      return J.has(Q) ? (pe.debug("UI", "Room deselected:", { roomId: Q, roomName: ee }), A.delete(Q)) : (pe.debug("UI", "Room selected:", { roomId: Q, roomName: ee }), A.set(Q, ee)), A;
    });
  }, []), $ = C.useCallback((Q) => {
    pe.debug("UI", "Cleaning mode modal:", Q ? "opened" : "closed"), k(Q);
  }, []), V = C.useCallback((Q) => {
    pe.debug("UI", "Shortcuts modal:", Q ? "opened" : "closed"), z(Q);
  }, []), F = C.useCallback((Q) => {
    pe.debug("UI", "Settings panel:", Q ? "opened" : "closed"), D(Q);
  }, []), W = C.useCallback((Q) => {
    pe.debug("UI", "Zones changed:", Q), y(Q);
  }, []), ae = C.useCallback(() => {
    L((Q) => {
      const ee = Q % 3 + 1;
      return hS(l, ee), pe.debug("UI", "Repeat count cycled to", ee), ee;
    });
  }, [l]), ce = C.useCallback(() => {
    L(1), vS(l), pe.debug("UI", "Repeat count reset to 1");
  }, [l]);
  return {
    selectedMode: s,
    areaSelectionMode: m,
    selectedRooms: p,
    selectedZones: v,
    modalOpened: S,
    shortcutsModalOpened: E,
    settingsPanelOpened: R,
    repeatCount: Y,
    setSelectedMode: d,
    setSelectedRooms: _,
    setSelectedZones: W,
    setModalOpened: $,
    setShortcutsModalOpened: V,
    setSettingsPanelOpened: F,
    handleModeChange: H,
    handleAreaSelectionModeChange: X,
    handleRoomToggle: ie,
    cycleRepeatCount: ae,
    resetRepeatCount: ce
  };
}
const bS = {
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
    unknown: "Unknown Map"
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
    zone_overlay_create: "Click on the map to place a cleaning zone",
    zone_overlay_resize: "Drag edges to resize. Click the map to add another zone.",
    clear_zone: "Clear zone",
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
    delete_zone: "Delete Restricted Zone"
  },
  // Mode Tabs
  modes: {
    room: "Room",
    all: "All",
    zone: "Zone"
  },
  // Action Buttons
  actions: {
    clean: "Clean",
    clean_all: "Clean All",
    clean_rooms: "Clean {{count}} Room",
    clean_rooms_plural: "Clean {{count}} Rooms",
    select_rooms: "Select Rooms",
    zone_clean: "Zone Clean",
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
}, SS = {
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
    unknown: "Bilinmeyen Harita"
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
    zone_overlay_create: "Temizlik bölgesi oluşturmak için haritaya dokunun",
    zone_overlay_resize: "Yeniden boyutlandırmak için kenarları sürükleyin. Yeni bölge eklemek için haritaya dokunun.",
    clear_zone: "Bölgeyi temizle",
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
    delete_zone: "Yasak Alanı Sil"
  },
  // Mode Tabs
  modes: {
    room: "Oda",
    all: "Tümü",
    zone: "Bölge"
  },
  // Action Buttons
  actions: {
    clean: "Temizle",
    clean_all: "Tümünü Temizle",
    clean_rooms: "{{count}} Odayı Temizle",
    clean_rooms_plural: "{{count}} Odayı Temizle",
    select_rooms: "Oda Seç",
    zone_clean: "Bölge Temizliği",
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
}, Ml = {
  en: bS,
  tr: SS
}, Rp = new Set(Object.keys(Ml)), kS = {
  en: "en",
  tr: "tr"
};
function ES(n) {
  return n.trim().toLowerCase().replace(/_/g, "-");
}
function ju(n) {
  if (!n) return "en";
  const i = ES(n);
  if (Rp.has(i)) return i;
  const o = i.split("-")[0];
  return Rp.has(o) ? o : "en";
}
function wS(n, i) {
  return ju(n && n !== "auto" ? n : i);
}
function TS(n, i) {
  return !n || n === "auto" ? i?.trim() ? i : "en" : kS[ju(n)];
}
const ld = "botslab_vacuum";
function xS(n) {
  return `component.${ld}.entity.sensor.state.state.${n}`;
}
function zS(n, i) {
  return `component.${ld}.entity.${n}.${i}.name`;
}
function AS(n) {
  return n ? n.charAt(0).toUpperCase() + n.slice(1).replace(/_/g, " ") : "";
}
function Hg(n, i) {
  const o = n[i];
  return typeof o == "string" && o.length > 0 ? o : null;
}
function NS(n, i) {
  return Hg(n, xS(i)) ?? AS(i);
}
function CS({
  resources: n,
  platform: i,
  key: o,
  friendlyName: l,
  chromeLabel: s
}) {
  const d = i === "attribute" ? null : Hg(n, zS(i, o)), m = l?.trim() ? l : null;
  return d ?? m ?? s;
}
async function OS(n, i) {
  return (await n({
    type: "frontend/get_translations",
    language: i,
    category: "entity",
    integration: [ld]
  })).resources ?? {};
}
function MS(n, i) {
  return i ? Object.entries(i).reduce((o, [l, s]) => o.replace(new RegExp(`{{${l}}}`, "g"), String(s)), n) : n;
}
function Dp(n, i) {
  return i.split(".").reduce((o, l) => {
    if (o && typeof o == "object" && l in o)
      return o[l];
  }, n);
}
function RS(n = "en") {
  const i = Ml[n] || Ml.en, o = Ml.en;
  return function(s, d) {
    let m = Dp(i, s);
    return typeof m != "string" && (m = Dp(o, s)), typeof m != "string" ? (pe.warn(`Translation key not found: ${s}`), s) : MS(m, d);
  };
}
function DS(n, i) {
  return i === 0 ? n("actions.select_rooms") : n(i === 1 ? "actions.clean_rooms" : "actions.clean_rooms_plural", { count: String(i) });
}
const jS = [];
function Zg(n) {
  return jS.includes(n);
}
function De(n) {
  const i = C.useContext(nd), o = n ?? i?.language ?? "en", l = C.useMemo(() => RS(o), [o]);
  return {
    t: l,
    getRoomCountTranslation: (s) => DS(l, s)
  };
}
function LS(n, i, o, l) {
  if (![n, i, o, l].every((f) => Number.isFinite(f) && f > 0))
    return null;
  const s = Math.min(n / o, i / l), d = o * s, m = l * s;
  return { left: (n - d) / 2, top: (i - m) / 2, width: d, height: m };
}
const jp = 5e4;
function Bg(n, i, o, l) {
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
  if (p.some((z) => !Number.isFinite(z.x) || !Number.isFinite(z.y)))
    return { ok: !1, reason: "invalid_coordinates" };
  const _ = Math.round(Math.min(...p.map((z) => z.x))), v = Math.round(Math.min(...p.map((z) => z.y))), y = Math.round(Math.max(...p.map((z) => z.x))), S = Math.round(Math.max(...p.map((z) => z.y))), k = y - _, E = S - v;
  return k <= 0 || E <= 0 || k > jp || E > jp ? { ok: !1, reason: "unsafe_zone" } : { ok: !0, zone: { x1: _, y1: v, x2: y, y2: S } };
}
function US(n, i, o, l) {
  const s = [];
  for (const d of n) {
    const m = Bg(d, i, o, l);
    if (!m.ok) return m;
    s.push([m.zone.x1, m.zone.y1, m.zone.x2, m.zone.y2]);
  }
  return { ok: !0, zones: s };
}
async function va(n, i, o, l, s, d) {
  try {
    return await n.callService(i, o, l), !0;
  } catch (m) {
    return pe.error(`Service call failed: ${i}.${o}`, m), s && d && s(d), !1;
  }
}
function YS({
  hass: n,
  entityId: i,
  mapEntityId: o,
  mapTransform: l,
  onSuccess: s,
  onError: d
}) {
  const { t: m } = De(), f = C.useCallback(async () => {
    pe.debug("Vacuum", "Start full clean", i), await va(
      n,
      "vacuum",
      "start",
      { entity_id: i },
      d,
      m("errors.service_call_failed")
    ) && s?.(m("toast.starting_full_clean"));
  }, [n, i, s, d, m]), p = C.useCallback(async () => {
    pe.debug("Vacuum", "Resume", i), await va(
      n,
      "vacuum",
      "start",
      { entity_id: i },
      d,
      m("errors.service_call_failed")
    ) && s?.(m("toast.resuming"));
  }, [n, i, s, d, m]), _ = C.useCallback(async () => {
    pe.debug("Vacuum", "Pause", i), await va(
      n,
      "vacuum",
      "pause",
      { entity_id: i },
      d,
      m("errors.service_call_failed")
    ) && s?.(m("toast.pausing_vacuum"));
  }, [n, i, s, d, m]), v = C.useCallback(
    async (R = "stop_and_dock") => {
      pe.debug("Vacuum", "Stop & Return to dock", { entityId: i }), await va(
        n,
        "vacuum",
        "return_to_base",
        { entity_id: i },
        d,
        m("errors.service_call_failed")
      ) && s?.(m("toast.stopping_and_docking"));
    },
    [n, i, s, d, m]
  ), y = C.useCallback(async () => {
    pe.debug("Vacuum", "Return to dock", i), await va(
      n,
      "vacuum",
      "return_to_base",
      { entity_id: i },
      d,
      m("errors.service_call_failed")
    ) && s?.(m("toast.vacuum_docking"));
  }, [n, i, s, d, m]), S = C.useCallback(
    async (R, D, Y = 1, L) => {
      pe.debug("Vacuum", "Clean segments", { entityId: i, segments: R, count: D, repeats: Y, roomsConfig: L });
      const H = {
        entity_id: i,
        room_ids: R,
        repeat_times: Y
      };
      L && Object.keys(L).length > 0 && (H.rooms_config = L), await va(
        n,
        "botslab_vacuum",
        "clean_rooms",
        H,
        d,
        m("errors.service_call_failed")
      ) && s?.(m(D === 1 ? "toast.starting_room_clean" : "toast.starting_room_clean_plural", { count: String(D) }));
    },
    [n, i, s, d, m]
  ), k = C.useCallback(
    async (R, D, Y, L = 1) => {
      pe.debug("Vacuum", "Clean zones - input:", {
        uiZones: R,
        imageWidth: D,
        imageHeight: Y,
        mapEntityId: o,
        repeats: L,
        transformSource: l?.source
      });
      const H = US(R, l, D, Y);
      if (!H.ok) {
        pe.warn("Vacuum", "Zone conversion blocked", {
          reason: H.reason,
          mapEntityId: o,
          transformSource: l?.source
        }), d?.(m("errors.map_transform_unavailable"));
        return;
      }
      pe.debug("Vacuum", "Clean zones - converted:", H.zones), await va(
        n,
        "botslab_vacuum",
        "clean_zone",
        {
          entity_id: i,
          zones: H.zones,
          repeat_times: L
        },
        d,
        m("errors.service_call_failed")
      ) && s?.(m("toast.starting_zone_clean"));
    },
    [n, i, o, l, s, d, m]
  ), E = C.useCallback(
    async (R, D, Y, L) => {
      if (R.length === 0)
        return d?.(m("toast.select_zone_first")), !1;
      for (const H of R) {
        const X = Bg(H, l, D, Y);
        if (!X.ok)
          return d?.(m("errors.map_transform_unavailable")), !1;
        if (!await va(
          n,
          "botslab_vacuum",
          "add_no_go_zone",
          {
            entity_id: i,
            zone_type: L,
            x1: X.zone.x1,
            y1: X.zone.y1,
            x2: X.zone.x2,
            y2: X.zone.y2
          },
          d,
          m("errors.service_call_failed")
        )) return !1;
      }
      return s?.(m(L === "mop" ? "toast.no_mop_zone_saved" : "toast.zone_saved")), !0;
    },
    [n, i, l, s, d, m]
  ), z = C.useCallback(
    async (R, D, Y, L, H, X = 1, ie) => {
      switch (pe.debug("Vacuum", "Handle clean", {
        mode: R,
        selectedRooms: Array.from(D.entries()),
        selectedZones: Y,
        imageWidth: L,
        imageHeight: H,
        repeats: X,
        roomsConfig: ie
      }), R) {
        case "all":
          await f();
          break;
        case "room":
          D.size > 0 ? await S(Array.from(D.keys()), D.size, X, ie) : (pe.debug("Vacuum", "No rooms selected"), s?.(m("toast.select_rooms_first")));
          break;
        case "zone":
          Y.length > 0 && L && H ? await k(Y, L, H, X) : Y.length > 0 ? (pe.debug("Vacuum", "Zones selected but no image dimensions"), s?.(m("toast.cannot_determine_map"))) : (pe.debug("Vacuum", "No zone selected"), s?.(m("toast.select_zone_first")));
          break;
      }
    },
    [f, S, k, s, m]
  );
  return {
    handleStart: f,
    handleResume: p,
    handlePause: _,
    handleStop: v,
    handleDock: y,
    handleCleanSegments: S,
    handleCleanZone: k,
    handleSaveNoGoZone: E,
    handleClean: z
  };
}
function HS(n = 3e3) {
  const [i, o] = C.useState(null);
  C.useEffect(() => {
    if (i) {
      const d = setTimeout(() => o(null), n);
      return () => clearTimeout(d);
    }
  }, [i, n]);
  const l = C.useCallback((d) => {
    o(d);
  }, []), s = C.useCallback(() => {
    o(null);
  }, []);
  return {
    toast: i,
    showToast: l,
    hideToast: s
  };
}
const ZS = /* @__PURE__ */ new Set(["unknown", "unavailable", "none"]);
function Gg(n) {
  return ZS.has(n.trim().toLowerCase());
}
function En(n) {
  return Array.isArray(n) ? n.filter((i) => typeof i == "string" && !Gg(i)) : [];
}
function Kg(n, i) {
  return n.length === i.length && n.every((o, l) => o === i[l]);
}
function qg(n) {
  const i = En(n.selectOptions);
  if (i.length > 0)
    return { options: i, clicksEnabled: !0, rememberedOptions: i };
  const o = n.rememberedOptions.length > 0 ? [...n.rememberedOptions] : En(n.attributeList);
  return { options: o, clicksEnabled: !1, rememberedOptions: o };
}
function BS(n) {
  const i = qg(n);
  if (n.cleaning) {
    const o = En(n.fanSpeedList);
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
function Kl(n) {
  return n ? {
    value: Gg(n.state) ? null : n.state,
    options: En(n.attributes.options)
  } : { value: null, options: [] };
}
function sn(n, i) {
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
const Lp = {
  sweeping_and_mopping: "cleaning_mode_button.vac_and_mop",
  mopping_after_sweeping: "cleaning_mode_button.mop_after_vac",
  sweeping: "cleaning_mode_button.vacuum",
  mopping: "cleaning_mode_button.mop",
  customize: "customize.title"
}, GS = {
  sweeping_and_mopping: "Vac & Mop",
  mopping_after_sweeping: "Mop after Vac",
  sweeping: "Vac",
  mopping: "Mop",
  customize: "Customize"
};
function Vg(n, i) {
  const o = Tt(n);
  return i && Lp[o] ? i(Lp[o]) : GS[o] ?? qn(n);
}
const KS = {
  quiet: { key: "suction_levels.quiet", fallback: "Quiet" },
  silent: { key: "suction_levels.quiet", fallback: "Quiet" },
  standard: { key: "suction_levels.standard", fallback: "Standard" },
  strong: { key: "suction_levels.strong", fallback: "Turbo" },
  turbo: { key: "suction_levels.turbo", fallback: "Max" }
};
function Xg(n, i) {
  const o = KS[Tt(n)];
  return o ? i ? i(o.key) : o.fallback : qn(n);
}
function $g(n) {
  switch (Tt(n)) {
    case "sweeping":
      return U1;
    case "mopping":
      return Y1;
    case "sweeping_and_mopping":
      return Dg;
    case "mopping_after_sweeping":
      return H1;
    case "customize":
      return jg;
    default:
      return "";
  }
}
function Pg(n) {
  switch (Tt(n)) {
    case "quiet":
    case "silent":
      return Z1;
    case "standard":
      return B1;
    case "strong":
      return G1;
    case "turbo":
      return K1;
    default:
      return "";
  }
}
function qS(n) {
  switch (Tt(n)) {
    case "quick":
      return $1;
    case "standard":
      return P1;
    case "intensive":
      return I1;
    case "deep":
      return F1;
    default:
      return "";
  }
}
function VS(n) {
  switch (Tt(n)) {
    case "by_area":
      return q1;
    case "by_time":
      return V1;
    case "by_room":
      return X1;
    default:
      return "⚙️";
  }
}
function XS(n) {
  return Lg;
}
function $S(n, i) {
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
function PS(n) {
  return Lg;
}
function IS(n, i) {
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
function K(n, i, o) {
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
    const _ = m.prototype, v = Object.keys(_);
    for (let y = 0; y < v.length; y++) {
      const S = v[y];
      S in f || (f[S] = _[S].bind(f));
    }
  }
  const s = o?.Parent ?? Object;
  class d extends s {
  }
  Object.defineProperty(d, "name", { value: n });
  function m(f) {
    var p;
    const _ = o?.Parent ? new d() : this;
    l(_, f), (p = _._zod).deferred ?? (p.deferred = []);
    for (const v of _._zod.deferred)
      v();
    return _;
  }
  return Object.defineProperty(m, "init", { value: l }), Object.defineProperty(m, Symbol.hasInstance, {
    value: (f) => o?.Parent && f instanceof o.Parent ? !0 : f?._zod?.traits?.has(n)
  }), Object.defineProperty(m, "name", { value: n }), m;
}
class Ui extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
class Ig extends Error {
  constructor(i) {
    super(`Encountered unidirectional transform during encode: ${i}`), this.name = "ZodEncodeError";
  }
}
const Fg = {};
function ba(n) {
  return Fg;
}
function Qg(n) {
  const i = Object.values(n).filter((l) => typeof l == "number");
  return Object.entries(n).filter(([l, s]) => i.indexOf(+l) === -1).map(([l, s]) => s);
}
function Lu(n, i) {
  return typeof i == "bigint" ? i.toString() : i;
}
function sd(n) {
  return {
    get value() {
      {
        const i = n();
        return Object.defineProperty(this, "value", { value: i }), i;
      }
    }
  };
}
function cd(n) {
  return n == null;
}
function ud(n) {
  const i = n.startsWith("^") ? 1 : 0, o = n.endsWith("$") ? n.length - 1 : n.length;
  return n.slice(i, o);
}
function FS(n, i) {
  const o = (n.toString().split(".")[1] || "").length, l = i.toString();
  let s = (l.split(".")[1] || "").length;
  if (s === 0 && /\d?e-\d?/.test(l)) {
    const p = l.match(/\d?e-(\d?)/);
    p?.[1] && (s = Number.parseInt(p[1]));
  }
  const d = o > s ? o : s, m = Number.parseInt(n.toFixed(d).replace(".", "")), f = Number.parseInt(i.toFixed(d).replace(".", ""));
  return m % f / 10 ** d;
}
const Up = /* @__PURE__ */ Symbol("evaluating");
function Ue(n, i, o) {
  let l;
  Object.defineProperty(n, i, {
    get() {
      if (l !== Up)
        return l === void 0 && (l = Up, l = o()), l;
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
function Ia(n, i, o) {
  Object.defineProperty(n, i, {
    value: o,
    writable: !0,
    enumerable: !0,
    configurable: !0
  });
}
function Ea(...n) {
  const i = {};
  for (const o of n) {
    const l = Object.getOwnPropertyDescriptors(o);
    Object.assign(i, l);
  }
  return Object.defineProperties({}, i);
}
function Yp(n) {
  return JSON.stringify(n);
}
function QS(n) {
  return n.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const Jg = "captureStackTrace" in Error ? Error.captureStackTrace : (...n) => {
};
function jl(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n);
}
const JS = sd(() => {
  if (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))
    return !1;
  try {
    const n = Function;
    return new n(""), !0;
  } catch {
    return !1;
  }
});
function Yi(n) {
  if (jl(n) === !1)
    return !1;
  const i = n.constructor;
  if (i === void 0 || typeof i != "function")
    return !0;
  const o = i.prototype;
  return !(jl(o) === !1 || Object.prototype.hasOwnProperty.call(o, "isPrototypeOf") === !1);
}
function Wg(n) {
  return Yi(n) ? { ...n } : Array.isArray(n) ? [...n] : n;
}
const WS = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function Hi(n) {
  return n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function wa(n, i, o) {
  const l = new n._zod.constr(i ?? n._zod.def);
  return (!i || o?.parent) && (l._zod.parent = n), l;
}
function se(n) {
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
function e2(n) {
  return Object.keys(n).filter((i) => n[i]._zod.optin === "optional" && n[i]._zod.optout === "optional");
}
const t2 = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function n2(n, i) {
  const o = n._zod.def, l = o.checks;
  if (l && l.length > 0)
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  const d = Ea(n._zod.def, {
    get shape() {
      const m = {};
      for (const f in i) {
        if (!(f in o.shape))
          throw new Error(`Unrecognized key: "${f}"`);
        i[f] && (m[f] = o.shape[f]);
      }
      return Ia(this, "shape", m), m;
    },
    checks: []
  });
  return wa(n, d);
}
function a2(n, i) {
  const o = n._zod.def, l = o.checks;
  if (l && l.length > 0)
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  const d = Ea(n._zod.def, {
    get shape() {
      const m = { ...n._zod.def.shape };
      for (const f in i) {
        if (!(f in o.shape))
          throw new Error(`Unrecognized key: "${f}"`);
        i[f] && delete m[f];
      }
      return Ia(this, "shape", m), m;
    },
    checks: []
  });
  return wa(n, d);
}
function i2(n, i) {
  if (!Yi(i))
    throw new Error("Invalid input to extend: expected a plain object");
  const o = n._zod.def.checks;
  if (o && o.length > 0) {
    const d = n._zod.def.shape;
    for (const m in i)
      if (Object.getOwnPropertyDescriptor(d, m) !== void 0)
        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
  }
  const s = Ea(n._zod.def, {
    get shape() {
      const d = { ...n._zod.def.shape, ...i };
      return Ia(this, "shape", d), d;
    }
  });
  return wa(n, s);
}
function o2(n, i) {
  if (!Yi(i))
    throw new Error("Invalid input to safeExtend: expected a plain object");
  const o = Ea(n._zod.def, {
    get shape() {
      const l = { ...n._zod.def.shape, ...i };
      return Ia(this, "shape", l), l;
    }
  });
  return wa(n, o);
}
function r2(n, i) {
  const o = Ea(n._zod.def, {
    get shape() {
      const l = { ...n._zod.def.shape, ...i._zod.def.shape };
      return Ia(this, "shape", l), l;
    },
    get catchall() {
      return i._zod.def.catchall;
    },
    checks: []
    // delete existing checks
  });
  return wa(n, o);
}
function l2(n, i, o) {
  const s = i._zod.def.checks;
  if (s && s.length > 0)
    throw new Error(".partial() cannot be used on object schemas containing refinements");
  const m = Ea(i._zod.def, {
    get shape() {
      const f = i._zod.def.shape, p = { ...f };
      if (o)
        for (const _ in o) {
          if (!(_ in f))
            throw new Error(`Unrecognized key: "${_}"`);
          o[_] && (p[_] = n ? new n({
            type: "optional",
            innerType: f[_]
          }) : f[_]);
        }
      else
        for (const _ in f)
          p[_] = n ? new n({
            type: "optional",
            innerType: f[_]
          }) : f[_];
      return Ia(this, "shape", p), p;
    },
    checks: []
  });
  return wa(i, m);
}
function s2(n, i, o) {
  const l = Ea(i._zod.def, {
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
      return Ia(this, "shape", d), d;
    }
  });
  return wa(i, l);
}
function ji(n, i = 0) {
  if (n.aborted === !0)
    return !0;
  for (let o = i; o < n.issues.length; o++)
    if (n.issues[o]?.continue !== !0)
      return !0;
  return !1;
}
function Li(n, i) {
  return i.map((o) => {
    var l;
    return (l = o).path ?? (l.path = []), o.path.unshift(n), o;
  });
}
function bl(n) {
  return typeof n == "string" ? n : n?.message;
}
function Sa(n, i, o) {
  const l = { ...n, path: n.path ?? [] };
  if (!n.message) {
    const s = bl(n.inst?._zod.def?.error?.(n)) ?? bl(i?.error?.(n)) ?? bl(o.customError?.(n)) ?? bl(o.localeError?.(n)) ?? "Invalid input";
    l.message = s;
  }
  return delete l.inst, delete l.continue, i?.reportInput || delete l.input, l;
}
function dd(n) {
  return Array.isArray(n) ? "array" : typeof n == "string" ? "string" : "unknown";
}
function qo(...n) {
  const [i, o, l] = n;
  return typeof i == "string" ? {
    message: i,
    code: "custom",
    input: o,
    inst: l
  } : { ...i };
}
const eh = (n, i) => {
  n.name = "$ZodError", Object.defineProperty(n, "_zod", {
    value: n._zod,
    enumerable: !1
  }), Object.defineProperty(n, "issues", {
    value: i,
    enumerable: !1
  }), n.message = JSON.stringify(i, Lu, 2), Object.defineProperty(n, "toString", {
    value: () => n.message,
    enumerable: !1
  });
}, th = K("$ZodError", eh), nh = K("$ZodError", eh, { Parent: Error });
function c2(n, i = (o) => o.message) {
  const o = {}, l = [];
  for (const s of n.issues)
    s.path.length > 0 ? (o[s.path[0]] = o[s.path[0]] || [], o[s.path[0]].push(i(s))) : l.push(i(s));
  return { formErrors: l, fieldErrors: o };
}
function u2(n, i = (o) => o.message) {
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
const md = (n) => (i, o, l, s) => {
  const d = l ? Object.assign(l, { async: !1 }) : { async: !1 }, m = i._zod.run({ value: o, issues: [] }, d);
  if (m instanceof Promise)
    throw new Ui();
  if (m.issues.length) {
    const f = new (s?.Err ?? n)(m.issues.map((p) => Sa(p, d, ba())));
    throw Jg(f, s?.callee), f;
  }
  return m.value;
}, fd = (n) => async (i, o, l, s) => {
  const d = l ? Object.assign(l, { async: !0 }) : { async: !0 };
  let m = i._zod.run({ value: o, issues: [] }, d);
  if (m instanceof Promise && (m = await m), m.issues.length) {
    const f = new (s?.Err ?? n)(m.issues.map((p) => Sa(p, d, ba())));
    throw Jg(f, s?.callee), f;
  }
  return m.value;
}, ql = (n) => (i, o, l) => {
  const s = l ? { ...l, async: !1 } : { async: !1 }, d = i._zod.run({ value: o, issues: [] }, s);
  if (d instanceof Promise)
    throw new Ui();
  return d.issues.length ? {
    success: !1,
    error: new (n ?? th)(d.issues.map((m) => Sa(m, s, ba())))
  } : { success: !0, data: d.value };
}, d2 = /* @__PURE__ */ ql(nh), Vl = (n) => async (i, o, l) => {
  const s = l ? Object.assign(l, { async: !0 }) : { async: !0 };
  let d = i._zod.run({ value: o, issues: [] }, s);
  return d instanceof Promise && (d = await d), d.issues.length ? {
    success: !1,
    error: new n(d.issues.map((m) => Sa(m, s, ba())))
  } : { success: !0, data: d.value };
}, m2 = /* @__PURE__ */ Vl(nh), f2 = (n) => (i, o, l) => {
  const s = l ? Object.assign(l, { direction: "backward" }) : { direction: "backward" };
  return md(n)(i, o, s);
}, _2 = (n) => (i, o, l) => md(n)(i, o, l), p2 = (n) => async (i, o, l) => {
  const s = l ? Object.assign(l, { direction: "backward" }) : { direction: "backward" };
  return fd(n)(i, o, s);
}, g2 = (n) => async (i, o, l) => fd(n)(i, o, l), h2 = (n) => (i, o, l) => {
  const s = l ? Object.assign(l, { direction: "backward" }) : { direction: "backward" };
  return ql(n)(i, o, s);
}, v2 = (n) => (i, o, l) => ql(n)(i, o, l), y2 = (n) => async (i, o, l) => {
  const s = l ? Object.assign(l, { direction: "backward" }) : { direction: "backward" };
  return Vl(n)(i, o, s);
}, b2 = (n) => async (i, o, l) => Vl(n)(i, o, l), S2 = /^[cC][^\s-]{8,}$/, k2 = /^[0-9a-z]+$/, E2 = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, w2 = /^[0-9a-vA-V]{20}$/, T2 = /^[A-Za-z0-9]{27}$/, x2 = /^[a-zA-Z0-9_-]{21}$/, z2 = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, A2 = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, Hp = (n) => n ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${n}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, N2 = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, C2 = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function O2() {
  return new RegExp(C2, "u");
}
const M2 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, R2 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, D2 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, j2 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, L2 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, ah = /^[A-Za-z0-9_-]*$/, U2 = /^\+[1-9]\d{6,14}$/, ih = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", Y2 = /* @__PURE__ */ new RegExp(`^${ih}$`);
function oh(n) {
  const i = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof n.precision == "number" ? n.precision === -1 ? `${i}` : n.precision === 0 ? `${i}:[0-5]\\d` : `${i}:[0-5]\\d\\.\\d{${n.precision}}` : `${i}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function H2(n) {
  return new RegExp(`^${oh(n)}$`);
}
function Z2(n) {
  const i = oh({ precision: n.precision }), o = ["Z"];
  n.local && o.push(""), n.offset && o.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  const l = `${i}(?:${o.join("|")})`;
  return new RegExp(`^${ih}T(?:${l})$`);
}
const B2 = (n) => {
  const i = n ? `[\\s\\S]{${n?.minimum ?? 0},${n?.maximum ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${i}$`);
}, G2 = /^-?\d+$/, rh = /^-?\d+(?:\.\d+)?$/, K2 = /^[^A-Z]*$/, q2 = /^[^a-z]*$/, Dt = /* @__PURE__ */ K("$ZodCheck", (n, i) => {
  var o;
  n._zod ?? (n._zod = {}), n._zod.def = i, (o = n._zod).onattach ?? (o.onattach = []);
}), lh = {
  number: "number",
  bigint: "bigint",
  object: "date"
}, sh = /* @__PURE__ */ K("$ZodCheckLessThan", (n, i) => {
  Dt.init(n, i);
  const o = lh[typeof i.value];
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
}), ch = /* @__PURE__ */ K("$ZodCheckGreaterThan", (n, i) => {
  Dt.init(n, i);
  const o = lh[typeof i.value];
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
}), V2 = /* @__PURE__ */ K("$ZodCheckMultipleOf", (n, i) => {
  Dt.init(n, i), n._zod.onattach.push((o) => {
    var l;
    (l = o._zod.bag).multipleOf ?? (l.multipleOf = i.value);
  }), n._zod.check = (o) => {
    if (typeof o.value != typeof i.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    (typeof o.value == "bigint" ? o.value % i.value === BigInt(0) : FS(o.value, i.value) === 0) || o.issues.push({
      origin: typeof o.value,
      code: "not_multiple_of",
      divisor: i.value,
      input: o.value,
      inst: n,
      continue: !i.abort
    });
  };
}), X2 = /* @__PURE__ */ K("$ZodCheckNumberFormat", (n, i) => {
  Dt.init(n, i), i.format = i.format || "float64";
  const o = i.format?.includes("int"), l = o ? "int" : "number", [s, d] = t2[i.format];
  n._zod.onattach.push((m) => {
    const f = m._zod.bag;
    f.format = i.format, f.minimum = s, f.maximum = d, o && (f.pattern = G2);
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
}), $2 = /* @__PURE__ */ K("$ZodCheckMaxLength", (n, i) => {
  var o;
  Dt.init(n, i), (o = n._zod.def).when ?? (o.when = (l) => {
    const s = l.value;
    return !cd(s) && s.length !== void 0;
  }), n._zod.onattach.push((l) => {
    const s = l._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    i.maximum < s && (l._zod.bag.maximum = i.maximum);
  }), n._zod.check = (l) => {
    const s = l.value;
    if (s.length <= i.maximum)
      return;
    const m = dd(s);
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
}), P2 = /* @__PURE__ */ K("$ZodCheckMinLength", (n, i) => {
  var o;
  Dt.init(n, i), (o = n._zod.def).when ?? (o.when = (l) => {
    const s = l.value;
    return !cd(s) && s.length !== void 0;
  }), n._zod.onattach.push((l) => {
    const s = l._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    i.minimum > s && (l._zod.bag.minimum = i.minimum);
  }), n._zod.check = (l) => {
    const s = l.value;
    if (s.length >= i.minimum)
      return;
    const m = dd(s);
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
}), I2 = /* @__PURE__ */ K("$ZodCheckLengthEquals", (n, i) => {
  var o;
  Dt.init(n, i), (o = n._zod.def).when ?? (o.when = (l) => {
    const s = l.value;
    return !cd(s) && s.length !== void 0;
  }), n._zod.onattach.push((l) => {
    const s = l._zod.bag;
    s.minimum = i.length, s.maximum = i.length, s.length = i.length;
  }), n._zod.check = (l) => {
    const s = l.value, d = s.length;
    if (d === i.length)
      return;
    const m = dd(s), f = d > i.length;
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
}), Xl = /* @__PURE__ */ K("$ZodCheckStringFormat", (n, i) => {
  var o, l;
  Dt.init(n, i), n._zod.onattach.push((s) => {
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
}), F2 = /* @__PURE__ */ K("$ZodCheckRegex", (n, i) => {
  Xl.init(n, i), n._zod.check = (o) => {
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
}), Q2 = /* @__PURE__ */ K("$ZodCheckLowerCase", (n, i) => {
  i.pattern ?? (i.pattern = K2), Xl.init(n, i);
}), J2 = /* @__PURE__ */ K("$ZodCheckUpperCase", (n, i) => {
  i.pattern ?? (i.pattern = q2), Xl.init(n, i);
}), W2 = /* @__PURE__ */ K("$ZodCheckIncludes", (n, i) => {
  Dt.init(n, i);
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
}), ek = /* @__PURE__ */ K("$ZodCheckStartsWith", (n, i) => {
  Dt.init(n, i);
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
}), tk = /* @__PURE__ */ K("$ZodCheckEndsWith", (n, i) => {
  Dt.init(n, i);
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
}), nk = /* @__PURE__ */ K("$ZodCheckOverwrite", (n, i) => {
  Dt.init(n, i), n._zod.check = (o) => {
    o.value = i.tx(o.value);
  };
});
class ak {
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
const ik = {
  major: 4,
  minor: 3,
  patch: 6
}, Qe = /* @__PURE__ */ K("$ZodType", (n, i) => {
  var o;
  n ?? (n = {}), n._zod.def = i, n._zod.bag = n._zod.bag || {}, n._zod.version = ik;
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
      let _ = ji(m), v;
      for (const y of f) {
        if (y._zod.def.when) {
          if (!y._zod.def.when(m))
            continue;
        } else if (_)
          continue;
        const S = m.issues.length, k = y._zod.check(m);
        if (k instanceof Promise && p?.async === !1)
          throw new Ui();
        if (v || k instanceof Promise)
          v = (v ?? Promise.resolve()).then(async () => {
            await k, m.issues.length !== S && (_ || (_ = ji(m, S)));
          });
        else {
          if (m.issues.length === S)
            continue;
          _ || (_ = ji(m, S));
        }
      }
      return v ? v.then(() => m) : m;
    }, d = (m, f, p) => {
      if (ji(m))
        return m.aborted = !0, m;
      const _ = s(f, l, p);
      if (_ instanceof Promise) {
        if (p.async === !1)
          throw new Ui();
        return _.then((v) => n._zod.parse(v, p));
      }
      return n._zod.parse(_, p);
    };
    n._zod.run = (m, f) => {
      if (f.skipChecks)
        return n._zod.parse(m, f);
      if (f.direction === "backward") {
        const _ = n._zod.parse({ value: m.value, issues: [] }, { ...f, skipChecks: !0 });
        return _ instanceof Promise ? _.then((v) => d(v, m, f)) : d(_, m, f);
      }
      const p = n._zod.parse(m, f);
      if (p instanceof Promise) {
        if (f.async === !1)
          throw new Ui();
        return p.then((_) => s(_, l, f));
      }
      return s(p, l, f);
    };
  }
  Ue(n, "~standard", () => ({
    validate: (s) => {
      try {
        const d = d2(n, s);
        return d.success ? { value: d.data } : { issues: d.error?.issues };
      } catch {
        return m2(n, s).then((m) => m.success ? { value: m.data } : { issues: m.error?.issues });
      }
    },
    vendor: "zod",
    version: 1
  }));
}), _d = /* @__PURE__ */ K("$ZodString", (n, i) => {
  Qe.init(n, i), n._zod.pattern = [...n?._zod.bag?.patterns ?? []].pop() ?? B2(n._zod.bag), n._zod.parse = (o, l) => {
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
}), $e = /* @__PURE__ */ K("$ZodStringFormat", (n, i) => {
  Xl.init(n, i), _d.init(n, i);
}), ok = /* @__PURE__ */ K("$ZodGUID", (n, i) => {
  i.pattern ?? (i.pattern = A2), $e.init(n, i);
}), rk = /* @__PURE__ */ K("$ZodUUID", (n, i) => {
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
    i.pattern ?? (i.pattern = Hp(l));
  } else
    i.pattern ?? (i.pattern = Hp());
  $e.init(n, i);
}), lk = /* @__PURE__ */ K("$ZodEmail", (n, i) => {
  i.pattern ?? (i.pattern = N2), $e.init(n, i);
}), sk = /* @__PURE__ */ K("$ZodURL", (n, i) => {
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
}), ck = /* @__PURE__ */ K("$ZodEmoji", (n, i) => {
  i.pattern ?? (i.pattern = O2()), $e.init(n, i);
}), uk = /* @__PURE__ */ K("$ZodNanoID", (n, i) => {
  i.pattern ?? (i.pattern = x2), $e.init(n, i);
}), dk = /* @__PURE__ */ K("$ZodCUID", (n, i) => {
  i.pattern ?? (i.pattern = S2), $e.init(n, i);
}), mk = /* @__PURE__ */ K("$ZodCUID2", (n, i) => {
  i.pattern ?? (i.pattern = k2), $e.init(n, i);
}), fk = /* @__PURE__ */ K("$ZodULID", (n, i) => {
  i.pattern ?? (i.pattern = E2), $e.init(n, i);
}), _k = /* @__PURE__ */ K("$ZodXID", (n, i) => {
  i.pattern ?? (i.pattern = w2), $e.init(n, i);
}), pk = /* @__PURE__ */ K("$ZodKSUID", (n, i) => {
  i.pattern ?? (i.pattern = T2), $e.init(n, i);
}), gk = /* @__PURE__ */ K("$ZodISODateTime", (n, i) => {
  i.pattern ?? (i.pattern = Z2(i)), $e.init(n, i);
}), hk = /* @__PURE__ */ K("$ZodISODate", (n, i) => {
  i.pattern ?? (i.pattern = Y2), $e.init(n, i);
}), vk = /* @__PURE__ */ K("$ZodISOTime", (n, i) => {
  i.pattern ?? (i.pattern = H2(i)), $e.init(n, i);
}), yk = /* @__PURE__ */ K("$ZodISODuration", (n, i) => {
  i.pattern ?? (i.pattern = z2), $e.init(n, i);
}), bk = /* @__PURE__ */ K("$ZodIPv4", (n, i) => {
  i.pattern ?? (i.pattern = M2), $e.init(n, i), n._zod.bag.format = "ipv4";
}), Sk = /* @__PURE__ */ K("$ZodIPv6", (n, i) => {
  i.pattern ?? (i.pattern = R2), $e.init(n, i), n._zod.bag.format = "ipv6", n._zod.check = (o) => {
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
}), kk = /* @__PURE__ */ K("$ZodCIDRv4", (n, i) => {
  i.pattern ?? (i.pattern = D2), $e.init(n, i);
}), Ek = /* @__PURE__ */ K("$ZodCIDRv6", (n, i) => {
  i.pattern ?? (i.pattern = j2), $e.init(n, i), n._zod.check = (o) => {
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
function uh(n) {
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
const wk = /* @__PURE__ */ K("$ZodBase64", (n, i) => {
  i.pattern ?? (i.pattern = L2), $e.init(n, i), n._zod.bag.contentEncoding = "base64", n._zod.check = (o) => {
    uh(o.value) || o.issues.push({
      code: "invalid_format",
      format: "base64",
      input: o.value,
      inst: n,
      continue: !i.abort
    });
  };
});
function Tk(n) {
  if (!ah.test(n))
    return !1;
  const i = n.replace(/[-_]/g, (l) => l === "-" ? "+" : "/"), o = i.padEnd(Math.ceil(i.length / 4) * 4, "=");
  return uh(o);
}
const xk = /* @__PURE__ */ K("$ZodBase64URL", (n, i) => {
  i.pattern ?? (i.pattern = ah), $e.init(n, i), n._zod.bag.contentEncoding = "base64url", n._zod.check = (o) => {
    Tk(o.value) || o.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: o.value,
      inst: n,
      continue: !i.abort
    });
  };
}), zk = /* @__PURE__ */ K("$ZodE164", (n, i) => {
  i.pattern ?? (i.pattern = U2), $e.init(n, i);
});
function Ak(n, i = null) {
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
const Nk = /* @__PURE__ */ K("$ZodJWT", (n, i) => {
  $e.init(n, i), n._zod.check = (o) => {
    Ak(o.value, i.alg) || o.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: o.value,
      inst: n,
      continue: !i.abort
    });
  };
}), dh = /* @__PURE__ */ K("$ZodNumber", (n, i) => {
  Qe.init(n, i), n._zod.pattern = n._zod.bag.pattern ?? rh, n._zod.parse = (o, l) => {
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
}), Ck = /* @__PURE__ */ K("$ZodNumberFormat", (n, i) => {
  X2.init(n, i), dh.init(n, i);
}), Ok = /* @__PURE__ */ K("$ZodUnknown", (n, i) => {
  Qe.init(n, i), n._zod.parse = (o) => o;
}), Mk = /* @__PURE__ */ K("$ZodNever", (n, i) => {
  Qe.init(n, i), n._zod.parse = (o, l) => (o.issues.push({
    expected: "never",
    code: "invalid_type",
    input: o.value,
    inst: n
  }), o);
});
function Zp(n, i, o) {
  n.issues.length && i.issues.push(...Li(o, n.issues)), i.value[o] = n.value;
}
const Rk = /* @__PURE__ */ K("$ZodArray", (n, i) => {
  Qe.init(n, i), n._zod.parse = (o, l) => {
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
      p instanceof Promise ? d.push(p.then((_) => Zp(_, o, m))) : Zp(p, o, m);
    }
    return d.length ? Promise.all(d).then(() => o) : o;
  };
});
function Ll(n, i, o, l, s) {
  if (n.issues.length) {
    if (s && !(o in l))
      return;
    i.issues.push(...Li(o, n.issues));
  }
  n.value === void 0 ? o in l && (i.value[o] = void 0) : i.value[o] = n.value;
}
function mh(n) {
  const i = Object.keys(n.shape);
  for (const l of i)
    if (!n.shape?.[l]?._zod?.traits?.has("$ZodType"))
      throw new Error(`Invalid element at key "${l}": expected a Zod schema`);
  const o = e2(n.shape);
  return {
    ...n,
    keys: i,
    keySet: new Set(i),
    numKeys: i.length,
    optionalKeys: new Set(o)
  };
}
function fh(n, i, o, l, s, d) {
  const m = [], f = s.keySet, p = s.catchall._zod, _ = p.def.type, v = p.optout === "optional";
  for (const y in i) {
    if (f.has(y))
      continue;
    if (_ === "never") {
      m.push(y);
      continue;
    }
    const S = p.run({ value: i[y], issues: [] }, l);
    S instanceof Promise ? n.push(S.then((k) => Ll(k, o, y, i, v))) : Ll(S, o, y, i, v);
  }
  return m.length && o.issues.push({
    code: "unrecognized_keys",
    keys: m,
    input: i,
    inst: d
  }), n.length ? Promise.all(n).then(() => o) : o;
}
const Dk = /* @__PURE__ */ K("$ZodObject", (n, i) => {
  if (Qe.init(n, i), !Object.getOwnPropertyDescriptor(i, "shape")?.get) {
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
  const l = sd(() => mh(i));
  Ue(n._zod, "propValues", () => {
    const f = i.shape, p = {};
    for (const _ in f) {
      const v = f[_]._zod;
      if (v.values) {
        p[_] ?? (p[_] = /* @__PURE__ */ new Set());
        for (const y of v.values)
          p[_].add(y);
      }
    }
    return p;
  });
  const s = jl, d = i.catchall;
  let m;
  n._zod.parse = (f, p) => {
    m ?? (m = l.value);
    const _ = f.value;
    if (!s(_))
      return f.issues.push({
        expected: "object",
        code: "invalid_type",
        input: _,
        inst: n
      }), f;
    f.value = {};
    const v = [], y = m.shape;
    for (const S of m.keys) {
      const k = y[S], E = k._zod.optout === "optional", z = k._zod.run({ value: _[S], issues: [] }, p);
      z instanceof Promise ? v.push(z.then((R) => Ll(R, f, S, _, E))) : Ll(z, f, S, _, E);
    }
    return d ? fh(v, _, f, p, l.value, n) : v.length ? Promise.all(v).then(() => f) : f;
  };
}), jk = /* @__PURE__ */ K("$ZodObjectJIT", (n, i) => {
  Dk.init(n, i);
  const o = n._zod.parse, l = sd(() => mh(i)), s = (S) => {
    const k = new ak(["shape", "payload", "ctx"]), E = l.value, z = (L) => {
      const H = Yp(L);
      return `shape[${H}]._zod.run({ value: input[${H}], issues: [] }, ctx)`;
    };
    k.write("const input = payload.value;");
    const R = /* @__PURE__ */ Object.create(null);
    let D = 0;
    for (const L of E.keys)
      R[L] = `key_${D++}`;
    k.write("const newResult = {};");
    for (const L of E.keys) {
      const H = R[L], X = Yp(L), $ = S[L]?._zod?.optout === "optional";
      k.write(`const ${H} = ${z(L)};`), $ ? k.write(`
        if (${H}.issues.length) {
          if (${X} in input) {
            payload.issues = payload.issues.concat(${H}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${X}, ...iss.path] : [${X}]
            })));
          }
        }
        
        if (${H}.value === undefined) {
          if (${X} in input) {
            newResult[${X}] = undefined;
          }
        } else {
          newResult[${X}] = ${H}.value;
        }
        
      `) : k.write(`
        if (${H}.issues.length) {
          payload.issues = payload.issues.concat(${H}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${X}, ...iss.path] : [${X}]
          })));
        }
        
        if (${H}.value === undefined) {
          if (${X} in input) {
            newResult[${X}] = undefined;
          }
        } else {
          newResult[${X}] = ${H}.value;
        }
        
      `);
    }
    k.write("payload.value = newResult;"), k.write("return payload;");
    const Y = k.compile();
    return (L, H) => Y(S, L, H);
  };
  let d;
  const m = jl, f = !Fg.jitless, _ = f && JS.value, v = i.catchall;
  let y;
  n._zod.parse = (S, k) => {
    y ?? (y = l.value);
    const E = S.value;
    return m(E) ? f && _ && k?.async === !1 && k.jitless !== !0 ? (d || (d = s(i.shape)), S = d(S, k), v ? fh([], E, S, k, y, n) : S) : o(S, k) : (S.issues.push({
      expected: "object",
      code: "invalid_type",
      input: E,
      inst: n
    }), S);
  };
});
function Bp(n, i, o, l) {
  for (const d of n)
    if (d.issues.length === 0)
      return i.value = d.value, i;
  const s = n.filter((d) => !ji(d));
  return s.length === 1 ? (i.value = s[0].value, s[0]) : (i.issues.push({
    code: "invalid_union",
    input: i.value,
    inst: o,
    errors: n.map((d) => d.issues.map((m) => Sa(m, l, ba())))
  }), i);
}
const Lk = /* @__PURE__ */ K("$ZodUnion", (n, i) => {
  Qe.init(n, i), Ue(n._zod, "optin", () => i.options.some((s) => s._zod.optin === "optional") ? "optional" : void 0), Ue(n._zod, "optout", () => i.options.some((s) => s._zod.optout === "optional") ? "optional" : void 0), Ue(n._zod, "values", () => {
    if (i.options.every((s) => s._zod.values))
      return new Set(i.options.flatMap((s) => Array.from(s._zod.values)));
  }), Ue(n._zod, "pattern", () => {
    if (i.options.every((s) => s._zod.pattern)) {
      const s = i.options.map((d) => d._zod.pattern);
      return new RegExp(`^(${s.map((d) => ud(d.source)).join("|")})$`);
    }
  });
  const o = i.options.length === 1, l = i.options[0]._zod.run;
  n._zod.parse = (s, d) => {
    if (o)
      return l(s, d);
    let m = !1;
    const f = [];
    for (const p of i.options) {
      const _ = p._zod.run({
        value: s.value,
        issues: []
      }, d);
      if (_ instanceof Promise)
        f.push(_), m = !0;
      else {
        if (_.issues.length === 0)
          return _;
        f.push(_);
      }
    }
    return m ? Promise.all(f).then((p) => Bp(p, s, n, d)) : Bp(f, s, n, d);
  };
}), Uk = /* @__PURE__ */ K("$ZodIntersection", (n, i) => {
  Qe.init(n, i), n._zod.parse = (o, l) => {
    const s = o.value, d = i.left._zod.run({ value: s, issues: [] }, l), m = i.right._zod.run({ value: s, issues: [] }, l);
    return d instanceof Promise || m instanceof Promise ? Promise.all([d, m]).then(([p, _]) => Gp(o, p, _)) : Gp(o, d, m);
  };
});
function Uu(n, i) {
  if (n === i)
    return { valid: !0, data: n };
  if (n instanceof Date && i instanceof Date && +n == +i)
    return { valid: !0, data: n };
  if (Yi(n) && Yi(i)) {
    const o = Object.keys(i), l = Object.keys(n).filter((d) => o.indexOf(d) !== -1), s = { ...n, ...i };
    for (const d of l) {
      const m = Uu(n[d], i[d]);
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
      const s = n[l], d = i[l], m = Uu(s, d);
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
function Gp(n, i, o) {
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
  if (d.length && s && n.issues.push({ ...s, keys: d }), ji(n))
    return n;
  const m = Uu(i.value, o.value);
  if (!m.valid)
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(m.mergeErrorPath)}`);
  return n.value = m.data, n;
}
const Yk = /* @__PURE__ */ K("$ZodRecord", (n, i) => {
  Qe.init(n, i), n._zod.parse = (o, l) => {
    const s = o.value;
    if (!Yi(s))
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
      for (const _ of m)
        if (typeof _ == "string" || typeof _ == "number" || typeof _ == "symbol") {
          f.add(typeof _ == "number" ? _.toString() : _);
          const v = i.valueType._zod.run({ value: s[_], issues: [] }, l);
          v instanceof Promise ? d.push(v.then((y) => {
            y.issues.length && o.issues.push(...Li(_, y.issues)), o.value[_] = y.value;
          })) : (v.issues.length && o.issues.push(...Li(_, v.issues)), o.value[_] = v.value);
        }
      let p;
      for (const _ in s)
        f.has(_) || (p = p ?? [], p.push(_));
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
        if (typeof f == "string" && rh.test(f) && p.issues.length) {
          const y = i.keyType._zod.run({ value: Number(f), issues: [] }, l);
          if (y instanceof Promise)
            throw new Error("Async schemas not supported in object keys currently");
          y.issues.length === 0 && (p = y);
        }
        if (p.issues.length) {
          i.mode === "loose" ? o.value[f] = s[f] : o.issues.push({
            code: "invalid_key",
            origin: "record",
            issues: p.issues.map((y) => Sa(y, l, ba())),
            input: f,
            path: [f],
            inst: n
          });
          continue;
        }
        const v = i.valueType._zod.run({ value: s[f], issues: [] }, l);
        v instanceof Promise ? d.push(v.then((y) => {
          y.issues.length && o.issues.push(...Li(f, y.issues)), o.value[p.value] = y.value;
        })) : (v.issues.length && o.issues.push(...Li(f, v.issues)), o.value[p.value] = v.value);
      }
    }
    return d.length ? Promise.all(d).then(() => o) : o;
  };
}), Hk = /* @__PURE__ */ K("$ZodEnum", (n, i) => {
  Qe.init(n, i);
  const o = Qg(i.entries), l = new Set(o);
  n._zod.values = l, n._zod.pattern = new RegExp(`^(${o.filter((s) => WS.has(typeof s)).map((s) => typeof s == "string" ? Hi(s) : s.toString()).join("|")})$`), n._zod.parse = (s, d) => {
    const m = s.value;
    return l.has(m) || s.issues.push({
      code: "invalid_value",
      values: o,
      input: m,
      inst: n
    }), s;
  };
}), Zk = /* @__PURE__ */ K("$ZodLiteral", (n, i) => {
  if (Qe.init(n, i), i.values.length === 0)
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
}), Bk = /* @__PURE__ */ K("$ZodTransform", (n, i) => {
  Qe.init(n, i), n._zod.parse = (o, l) => {
    if (l.direction === "backward")
      throw new Ig(n.constructor.name);
    const s = i.transform(o.value, o);
    if (l.async)
      return (s instanceof Promise ? s : Promise.resolve(s)).then((m) => (o.value = m, o));
    if (s instanceof Promise)
      throw new Ui();
    return o.value = s, o;
  };
});
function Kp(n, i) {
  return n.issues.length && i === void 0 ? { issues: [], value: void 0 } : n;
}
const _h = /* @__PURE__ */ K("$ZodOptional", (n, i) => {
  Qe.init(n, i), n._zod.optin = "optional", n._zod.optout = "optional", Ue(n._zod, "values", () => i.innerType._zod.values ? /* @__PURE__ */ new Set([...i.innerType._zod.values, void 0]) : void 0), Ue(n._zod, "pattern", () => {
    const o = i.innerType._zod.pattern;
    return o ? new RegExp(`^(${ud(o.source)})?$`) : void 0;
  }), n._zod.parse = (o, l) => {
    if (i.innerType._zod.optin === "optional") {
      const s = i.innerType._zod.run(o, l);
      return s instanceof Promise ? s.then((d) => Kp(d, o.value)) : Kp(s, o.value);
    }
    return o.value === void 0 ? o : i.innerType._zod.run(o, l);
  };
}), Gk = /* @__PURE__ */ K("$ZodExactOptional", (n, i) => {
  _h.init(n, i), Ue(n._zod, "values", () => i.innerType._zod.values), Ue(n._zod, "pattern", () => i.innerType._zod.pattern), n._zod.parse = (o, l) => i.innerType._zod.run(o, l);
}), Kk = /* @__PURE__ */ K("$ZodNullable", (n, i) => {
  Qe.init(n, i), Ue(n._zod, "optin", () => i.innerType._zod.optin), Ue(n._zod, "optout", () => i.innerType._zod.optout), Ue(n._zod, "pattern", () => {
    const o = i.innerType._zod.pattern;
    return o ? new RegExp(`^(${ud(o.source)}|null)$`) : void 0;
  }), Ue(n._zod, "values", () => i.innerType._zod.values ? /* @__PURE__ */ new Set([...i.innerType._zod.values, null]) : void 0), n._zod.parse = (o, l) => o.value === null ? o : i.innerType._zod.run(o, l);
}), qk = /* @__PURE__ */ K("$ZodDefault", (n, i) => {
  Qe.init(n, i), n._zod.optin = "optional", Ue(n._zod, "values", () => i.innerType._zod.values), n._zod.parse = (o, l) => {
    if (l.direction === "backward")
      return i.innerType._zod.run(o, l);
    if (o.value === void 0)
      return o.value = i.defaultValue, o;
    const s = i.innerType._zod.run(o, l);
    return s instanceof Promise ? s.then((d) => qp(d, i)) : qp(s, i);
  };
});
function qp(n, i) {
  return n.value === void 0 && (n.value = i.defaultValue), n;
}
const Vk = /* @__PURE__ */ K("$ZodPrefault", (n, i) => {
  Qe.init(n, i), n._zod.optin = "optional", Ue(n._zod, "values", () => i.innerType._zod.values), n._zod.parse = (o, l) => (l.direction === "backward" || o.value === void 0 && (o.value = i.defaultValue), i.innerType._zod.run(o, l));
}), Xk = /* @__PURE__ */ K("$ZodNonOptional", (n, i) => {
  Qe.init(n, i), Ue(n._zod, "values", () => {
    const o = i.innerType._zod.values;
    return o ? new Set([...o].filter((l) => l !== void 0)) : void 0;
  }), n._zod.parse = (o, l) => {
    const s = i.innerType._zod.run(o, l);
    return s instanceof Promise ? s.then((d) => Vp(d, n)) : Vp(s, n);
  };
});
function Vp(n, i) {
  return !n.issues.length && n.value === void 0 && n.issues.push({
    code: "invalid_type",
    expected: "nonoptional",
    input: n.value,
    inst: i
  }), n;
}
const $k = /* @__PURE__ */ K("$ZodCatch", (n, i) => {
  Qe.init(n, i), Ue(n._zod, "optin", () => i.innerType._zod.optin), Ue(n._zod, "optout", () => i.innerType._zod.optout), Ue(n._zod, "values", () => i.innerType._zod.values), n._zod.parse = (o, l) => {
    if (l.direction === "backward")
      return i.innerType._zod.run(o, l);
    const s = i.innerType._zod.run(o, l);
    return s instanceof Promise ? s.then((d) => (o.value = d.value, d.issues.length && (o.value = i.catchValue({
      ...o,
      error: {
        issues: d.issues.map((m) => Sa(m, l, ba()))
      },
      input: o.value
    }), o.issues = []), o)) : (o.value = s.value, s.issues.length && (o.value = i.catchValue({
      ...o,
      error: {
        issues: s.issues.map((d) => Sa(d, l, ba()))
      },
      input: o.value
    }), o.issues = []), o);
  };
}), Pk = /* @__PURE__ */ K("$ZodPipe", (n, i) => {
  Qe.init(n, i), Ue(n._zod, "values", () => i.in._zod.values), Ue(n._zod, "optin", () => i.in._zod.optin), Ue(n._zod, "optout", () => i.out._zod.optout), Ue(n._zod, "propValues", () => i.in._zod.propValues), n._zod.parse = (o, l) => {
    if (l.direction === "backward") {
      const d = i.out._zod.run(o, l);
      return d instanceof Promise ? d.then((m) => Sl(m, i.in, l)) : Sl(d, i.in, l);
    }
    const s = i.in._zod.run(o, l);
    return s instanceof Promise ? s.then((d) => Sl(d, i.out, l)) : Sl(s, i.out, l);
  };
});
function Sl(n, i, o) {
  return n.issues.length ? (n.aborted = !0, n) : i._zod.run({ value: n.value, issues: n.issues }, o);
}
const Ik = /* @__PURE__ */ K("$ZodReadonly", (n, i) => {
  Qe.init(n, i), Ue(n._zod, "propValues", () => i.innerType._zod.propValues), Ue(n._zod, "values", () => i.innerType._zod.values), Ue(n._zod, "optin", () => i.innerType?._zod?.optin), Ue(n._zod, "optout", () => i.innerType?._zod?.optout), n._zod.parse = (o, l) => {
    if (l.direction === "backward")
      return i.innerType._zod.run(o, l);
    const s = i.innerType._zod.run(o, l);
    return s instanceof Promise ? s.then(Xp) : Xp(s);
  };
});
function Xp(n) {
  return n.value = Object.freeze(n.value), n;
}
const Fk = /* @__PURE__ */ K("$ZodCustom", (n, i) => {
  Dt.init(n, i), Qe.init(n, i), n._zod.parse = (o, l) => o, n._zod.check = (o) => {
    const l = o.value, s = i.fn(l);
    if (s instanceof Promise)
      return s.then((d) => $p(d, o, l, n));
    $p(s, o, l, n);
  };
});
function $p(n, i, o, l) {
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
    l._zod.def.params && (s.params = l._zod.def.params), i.issues.push(qo(s));
  }
}
var Pp;
class Qk {
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
function Jk() {
  return new Qk();
}
(Pp = globalThis).__zod_globalRegistry ?? (Pp.__zod_globalRegistry = Jk());
const Bo = globalThis.__zod_globalRegistry;
// @__NO_SIDE_EFFECTS__
function Wk(n, i) {
  return new n({
    type: "string",
    ...se(i)
  });
}
// @__NO_SIDE_EFFECTS__
function eE(n, i) {
  return new n({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...se(i)
  });
}
// @__NO_SIDE_EFFECTS__
function Ip(n, i) {
  return new n({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...se(i)
  });
}
// @__NO_SIDE_EFFECTS__
function tE(n, i) {
  return new n({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ...se(i)
  });
}
// @__NO_SIDE_EFFECTS__
function nE(n, i) {
  return new n({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v4",
    ...se(i)
  });
}
// @__NO_SIDE_EFFECTS__
function aE(n, i) {
  return new n({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v6",
    ...se(i)
  });
}
// @__NO_SIDE_EFFECTS__
function iE(n, i) {
  return new n({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v7",
    ...se(i)
  });
}
// @__NO_SIDE_EFFECTS__
function oE(n, i) {
  return new n({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...se(i)
  });
}
// @__NO_SIDE_EFFECTS__
function rE(n, i) {
  return new n({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...se(i)
  });
}
// @__NO_SIDE_EFFECTS__
function lE(n, i) {
  return new n({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...se(i)
  });
}
// @__NO_SIDE_EFFECTS__
function sE(n, i) {
  return new n({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...se(i)
  });
}
// @__NO_SIDE_EFFECTS__
function cE(n, i) {
  return new n({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...se(i)
  });
}
// @__NO_SIDE_EFFECTS__
function uE(n, i) {
  return new n({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...se(i)
  });
}
// @__NO_SIDE_EFFECTS__
function dE(n, i) {
  return new n({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...se(i)
  });
}
// @__NO_SIDE_EFFECTS__
function mE(n, i) {
  return new n({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...se(i)
  });
}
// @__NO_SIDE_EFFECTS__
function fE(n, i) {
  return new n({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...se(i)
  });
}
// @__NO_SIDE_EFFECTS__
function _E(n, i) {
  return new n({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...se(i)
  });
}
// @__NO_SIDE_EFFECTS__
function pE(n, i) {
  return new n({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...se(i)
  });
}
// @__NO_SIDE_EFFECTS__
function gE(n, i) {
  return new n({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...se(i)
  });
}
// @__NO_SIDE_EFFECTS__
function hE(n, i) {
  return new n({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...se(i)
  });
}
// @__NO_SIDE_EFFECTS__
function vE(n, i) {
  return new n({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...se(i)
  });
}
// @__NO_SIDE_EFFECTS__
function yE(n, i) {
  return new n({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...se(i)
  });
}
// @__NO_SIDE_EFFECTS__
function bE(n, i) {
  return new n({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...se(i)
  });
}
// @__NO_SIDE_EFFECTS__
function SE(n, i) {
  return new n({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...se(i)
  });
}
// @__NO_SIDE_EFFECTS__
function kE(n, i) {
  return new n({
    type: "string",
    format: "date",
    check: "string_format",
    ...se(i)
  });
}
// @__NO_SIDE_EFFECTS__
function EE(n, i) {
  return new n({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...se(i)
  });
}
// @__NO_SIDE_EFFECTS__
function wE(n, i) {
  return new n({
    type: "string",
    format: "duration",
    check: "string_format",
    ...se(i)
  });
}
// @__NO_SIDE_EFFECTS__
function TE(n, i) {
  return new n({
    type: "number",
    checks: [],
    ...se(i)
  });
}
// @__NO_SIDE_EFFECTS__
function xE(n, i) {
  return new n({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "safeint",
    ...se(i)
  });
}
// @__NO_SIDE_EFFECTS__
function zE(n) {
  return new n({
    type: "unknown"
  });
}
// @__NO_SIDE_EFFECTS__
function AE(n, i) {
  return new n({
    type: "never",
    ...se(i)
  });
}
// @__NO_SIDE_EFFECTS__
function Fp(n, i) {
  return new sh({
    check: "less_than",
    ...se(i),
    value: n,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function yu(n, i) {
  return new sh({
    check: "less_than",
    ...se(i),
    value: n,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function Qp(n, i) {
  return new ch({
    check: "greater_than",
    ...se(i),
    value: n,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function bu(n, i) {
  return new ch({
    check: "greater_than",
    ...se(i),
    value: n,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function Jp(n, i) {
  return new V2({
    check: "multiple_of",
    ...se(i),
    value: n
  });
}
// @__NO_SIDE_EFFECTS__
function ph(n, i) {
  return new $2({
    check: "max_length",
    ...se(i),
    maximum: n
  });
}
// @__NO_SIDE_EFFECTS__
function Ul(n, i) {
  return new P2({
    check: "min_length",
    ...se(i),
    minimum: n
  });
}
// @__NO_SIDE_EFFECTS__
function gh(n, i) {
  return new I2({
    check: "length_equals",
    ...se(i),
    length: n
  });
}
// @__NO_SIDE_EFFECTS__
function NE(n, i) {
  return new F2({
    check: "string_format",
    format: "regex",
    ...se(i),
    pattern: n
  });
}
// @__NO_SIDE_EFFECTS__
function CE(n) {
  return new Q2({
    check: "string_format",
    format: "lowercase",
    ...se(n)
  });
}
// @__NO_SIDE_EFFECTS__
function OE(n) {
  return new J2({
    check: "string_format",
    format: "uppercase",
    ...se(n)
  });
}
// @__NO_SIDE_EFFECTS__
function ME(n, i) {
  return new W2({
    check: "string_format",
    format: "includes",
    ...se(i),
    includes: n
  });
}
// @__NO_SIDE_EFFECTS__
function RE(n, i) {
  return new ek({
    check: "string_format",
    format: "starts_with",
    ...se(i),
    prefix: n
  });
}
// @__NO_SIDE_EFFECTS__
function DE(n, i) {
  return new tk({
    check: "string_format",
    format: "ends_with",
    ...se(i),
    suffix: n
  });
}
// @__NO_SIDE_EFFECTS__
function Bi(n) {
  return new nk({
    check: "overwrite",
    tx: n
  });
}
// @__NO_SIDE_EFFECTS__
function jE(n) {
  return /* @__PURE__ */ Bi((i) => i.normalize(n));
}
// @__NO_SIDE_EFFECTS__
function LE() {
  return /* @__PURE__ */ Bi((n) => n.trim());
}
// @__NO_SIDE_EFFECTS__
function UE() {
  return /* @__PURE__ */ Bi((n) => n.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function YE() {
  return /* @__PURE__ */ Bi((n) => n.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function HE() {
  return /* @__PURE__ */ Bi((n) => QS(n));
}
// @__NO_SIDE_EFFECTS__
function ZE(n, i, o) {
  return new n({
    type: "array",
    element: i,
    // get element() {
    //   return element;
    // },
    ...se(o)
  });
}
// @__NO_SIDE_EFFECTS__
function BE(n, i, o) {
  return new n({
    type: "custom",
    check: "custom",
    fn: i,
    ...se(o)
  });
}
// @__NO_SIDE_EFFECTS__
function GE(n) {
  const i = /* @__PURE__ */ KE((o) => (o.addIssue = (l) => {
    if (typeof l == "string")
      o.issues.push(qo(l, o.value, i._zod.def));
    else {
      const s = l;
      s.fatal && (s.continue = !1), s.code ?? (s.code = "custom"), s.input ?? (s.input = o.value), s.inst ?? (s.inst = i), s.continue ?? (s.continue = !i._zod.def.abort), o.issues.push(qo(s));
    }
  }, n(o.value, o)));
  return i;
}
// @__NO_SIDE_EFFECTS__
function KE(n, i) {
  const o = new Dt({
    check: "custom",
    ...se(i)
  });
  return o._zod.check = n, o;
}
function hh(n) {
  let i = n?.target ?? "draft-2020-12";
  return i === "draft-4" && (i = "draft-04"), i === "draft-7" && (i = "draft-07"), {
    processors: n.processors ?? {},
    metadataRegistry: n?.metadata ?? Bo,
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
function rt(n, i, o = { path: [], schemaPath: [] }) {
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
      const S = m.schema, k = i.processors[s.type];
      if (!k)
        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${s.type}`);
      k(n, i, S, v);
    }
    const y = n._zod.parent;
    y && (m.ref || (m.ref = y), rt(y, i, v), i.seen.get(y).isParent = !0);
  }
  const p = i.metadataRegistry.get(n);
  return p && Object.assign(m.schema, p), i.io === "input" && Et(n) && (delete m.schema.examples, delete m.schema.default), i.io === "input" && m.schema._prefault && ((l = m.schema).default ?? (l.default = m.schema._prefault)), delete m.schema._prefault, i.seen.get(n).schema;
}
function vh(n, i) {
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
      const y = n.external.registry.get(m[0])?.id, S = n.external.uri ?? ((E) => E);
      if (y)
        return { ref: S(y) };
      const k = m[1].defId ?? m[1].schema.id ?? `schema${n.counter++}`;
      return m[1].defId = k, { defId: k, ref: `${S("__shared")}#/${f}/${k}` };
    }
    if (m[1] === o)
      return { ref: "#" };
    const _ = `#/${f}/`, v = m[1].schema.id ?? `__schema${n.counter++}`;
    return { defId: v, ref: _ + v };
  }, d = (m) => {
    if (m[1].schema.$ref)
      return;
    const f = m[1], { ref: p, defId: _ } = s(m);
    f.def = { ...f.schema }, _ && (f.defId = _);
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
      const _ = n.external.registry.get(m[0])?.id;
      if (i !== m[0] && _) {
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
function yh(n, i) {
  const o = n.seen.get(i);
  if (!o)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const l = (m) => {
    const f = n.seen.get(m);
    if (f.ref === null)
      return;
    const p = f.def ?? f.schema, _ = { ...p }, v = f.ref;
    if (f.ref = null, v) {
      l(v);
      const S = n.seen.get(v), k = S.schema;
      if (k.$ref && (n.target === "draft-07" || n.target === "draft-04" || n.target === "openapi-3.0") ? (p.allOf = p.allOf ?? [], p.allOf.push(k)) : Object.assign(p, k), Object.assign(p, _), m._zod.parent === v)
        for (const z in p)
          z === "$ref" || z === "allOf" || z in _ || delete p[z];
      if (k.$ref && S.def)
        for (const z in p)
          z === "$ref" || z === "allOf" || z in S.def && JSON.stringify(p[z]) === JSON.stringify(S.def[z]) && delete p[z];
    }
    const y = m._zod.parent;
    if (y && y !== v) {
      l(y);
      const S = n.seen.get(y);
      if (S?.schema.$ref && (p.$ref = S.schema.$ref, S.def))
        for (const k in p)
          k === "$ref" || k === "allOf" || k in S.def && JSON.stringify(p[k]) === JSON.stringify(S.def[k]) && delete p[k];
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
          input: Yl(i, "input", n.processors),
          output: Yl(i, "output", n.processors)
        }
      },
      enumerable: !1,
      writable: !1
    }), m;
  } catch {
    throw new Error("Error converting schema to JSON.");
  }
}
function Et(n, i) {
  const o = i ?? { seen: /* @__PURE__ */ new Set() };
  if (o.seen.has(n))
    return !1;
  o.seen.add(n);
  const l = n._zod.def;
  if (l.type === "transform")
    return !0;
  if (l.type === "array")
    return Et(l.element, o);
  if (l.type === "set")
    return Et(l.valueType, o);
  if (l.type === "lazy")
    return Et(l.getter(), o);
  if (l.type === "promise" || l.type === "optional" || l.type === "nonoptional" || l.type === "nullable" || l.type === "readonly" || l.type === "default" || l.type === "prefault")
    return Et(l.innerType, o);
  if (l.type === "intersection")
    return Et(l.left, o) || Et(l.right, o);
  if (l.type === "record" || l.type === "map")
    return Et(l.keyType, o) || Et(l.valueType, o);
  if (l.type === "pipe")
    return Et(l.in, o) || Et(l.out, o);
  if (l.type === "object") {
    for (const s in l.shape)
      if (Et(l.shape[s], o))
        return !0;
    return !1;
  }
  if (l.type === "union") {
    for (const s of l.options)
      if (Et(s, o))
        return !0;
    return !1;
  }
  if (l.type === "tuple") {
    for (const s of l.items)
      if (Et(s, o))
        return !0;
    return !!(l.rest && Et(l.rest, o));
  }
  return !1;
}
const qE = (n, i = {}) => (o) => {
  const l = hh({ ...o, processors: i });
  return rt(n, l), vh(l, n), yh(l, n);
}, Yl = (n, i, o = {}) => (l) => {
  const { libraryOptions: s, target: d } = l ?? {}, m = hh({ ...s ?? {}, target: d, io: i, processors: o });
  return rt(n, m), vh(m, n), yh(m, n);
}, VE = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
  // do not set
}, XE = (n, i, o, l) => {
  const s = o;
  s.type = "string";
  const { minimum: d, maximum: m, format: f, patterns: p, contentEncoding: _ } = n._zod.bag;
  if (typeof d == "number" && (s.minLength = d), typeof m == "number" && (s.maxLength = m), f && (s.format = VE[f] ?? f, s.format === "" && delete s.format, f === "time" && delete s.format), _ && (s.contentEncoding = _), p && p.size > 0) {
    const v = [...p];
    v.length === 1 ? s.pattern = v[0].source : v.length > 1 && (s.allOf = [
      ...v.map((y) => ({
        ...i.target === "draft-07" || i.target === "draft-04" || i.target === "openapi-3.0" ? { type: "string" } : {},
        pattern: y.source
      }))
    ]);
  }
}, $E = (n, i, o, l) => {
  const s = o, { minimum: d, maximum: m, format: f, multipleOf: p, exclusiveMaximum: _, exclusiveMinimum: v } = n._zod.bag;
  typeof f == "string" && f.includes("int") ? s.type = "integer" : s.type = "number", typeof v == "number" && (i.target === "draft-04" || i.target === "openapi-3.0" ? (s.minimum = v, s.exclusiveMinimum = !0) : s.exclusiveMinimum = v), typeof d == "number" && (s.minimum = d, typeof v == "number" && i.target !== "draft-04" && (v >= d ? delete s.minimum : delete s.exclusiveMinimum)), typeof _ == "number" && (i.target === "draft-04" || i.target === "openapi-3.0" ? (s.maximum = _, s.exclusiveMaximum = !0) : s.exclusiveMaximum = _), typeof m == "number" && (s.maximum = m, typeof _ == "number" && i.target !== "draft-04" && (_ <= m ? delete s.maximum : delete s.exclusiveMaximum)), typeof p == "number" && (s.multipleOf = p);
}, PE = (n, i, o, l) => {
  o.not = {};
}, IE = (n, i, o, l) => {
}, FE = (n, i, o, l) => {
  const s = n._zod.def, d = Qg(s.entries);
  d.every((m) => typeof m == "number") && (o.type = "number"), d.every((m) => typeof m == "string") && (o.type = "string"), o.enum = d;
}, QE = (n, i, o, l) => {
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
}, JE = (n, i, o, l) => {
  if (i.unrepresentable === "throw")
    throw new Error("Custom types cannot be represented in JSON Schema");
}, WE = (n, i, o, l) => {
  if (i.unrepresentable === "throw")
    throw new Error("Transforms cannot be represented in JSON Schema");
}, ew = (n, i, o, l) => {
  const s = o, d = n._zod.def, { minimum: m, maximum: f } = n._zod.bag;
  typeof m == "number" && (s.minItems = m), typeof f == "number" && (s.maxItems = f), s.type = "array", s.items = rt(d.element, i, { ...l, path: [...l.path, "items"] });
}, tw = (n, i, o, l) => {
  const s = o, d = n._zod.def;
  s.type = "object", s.properties = {};
  const m = d.shape;
  for (const _ in m)
    s.properties[_] = rt(m[_], i, {
      ...l,
      path: [...l.path, "properties", _]
    });
  const f = new Set(Object.keys(m)), p = new Set([...f].filter((_) => {
    const v = d.shape[_]._zod;
    return i.io === "input" ? v.optin === void 0 : v.optout === void 0;
  }));
  p.size > 0 && (s.required = Array.from(p)), d.catchall?._zod.def.type === "never" ? s.additionalProperties = !1 : d.catchall ? d.catchall && (s.additionalProperties = rt(d.catchall, i, {
    ...l,
    path: [...l.path, "additionalProperties"]
  })) : i.io === "output" && (s.additionalProperties = !1);
}, nw = (n, i, o, l) => {
  const s = n._zod.def, d = s.inclusive === !1, m = s.options.map((f, p) => rt(f, i, {
    ...l,
    path: [...l.path, d ? "oneOf" : "anyOf", p]
  }));
  d ? o.oneOf = m : o.anyOf = m;
}, aw = (n, i, o, l) => {
  const s = n._zod.def, d = rt(s.left, i, {
    ...l,
    path: [...l.path, "allOf", 0]
  }), m = rt(s.right, i, {
    ...l,
    path: [...l.path, "allOf", 1]
  }), f = (_) => "allOf" in _ && Object.keys(_).length === 1, p = [
    ...f(d) ? d.allOf : [d],
    ...f(m) ? m.allOf : [m]
  ];
  o.allOf = p;
}, iw = (n, i, o, l) => {
  const s = o, d = n._zod.def;
  s.type = "object";
  const m = d.keyType, p = m._zod.bag?.patterns;
  if (d.mode === "loose" && p && p.size > 0) {
    const v = rt(d.valueType, i, {
      ...l,
      path: [...l.path, "patternProperties", "*"]
    });
    s.patternProperties = {};
    for (const y of p)
      s.patternProperties[y.source] = v;
  } else
    (i.target === "draft-07" || i.target === "draft-2020-12") && (s.propertyNames = rt(d.keyType, i, {
      ...l,
      path: [...l.path, "propertyNames"]
    })), s.additionalProperties = rt(d.valueType, i, {
      ...l,
      path: [...l.path, "additionalProperties"]
    });
  const _ = m._zod.values;
  if (_) {
    const v = [..._].filter((y) => typeof y == "string" || typeof y == "number");
    v.length > 0 && (s.required = v);
  }
}, ow = (n, i, o, l) => {
  const s = n._zod.def, d = rt(s.innerType, i, l), m = i.seen.get(n);
  i.target === "openapi-3.0" ? (m.ref = s.innerType, o.nullable = !0) : o.anyOf = [d, { type: "null" }];
}, rw = (n, i, o, l) => {
  const s = n._zod.def;
  rt(s.innerType, i, l);
  const d = i.seen.get(n);
  d.ref = s.innerType;
}, lw = (n, i, o, l) => {
  const s = n._zod.def;
  rt(s.innerType, i, l);
  const d = i.seen.get(n);
  d.ref = s.innerType, o.default = JSON.parse(JSON.stringify(s.defaultValue));
}, sw = (n, i, o, l) => {
  const s = n._zod.def;
  rt(s.innerType, i, l);
  const d = i.seen.get(n);
  d.ref = s.innerType, i.io === "input" && (o._prefault = JSON.parse(JSON.stringify(s.defaultValue)));
}, cw = (n, i, o, l) => {
  const s = n._zod.def;
  rt(s.innerType, i, l);
  const d = i.seen.get(n);
  d.ref = s.innerType;
  let m;
  try {
    m = s.catchValue(void 0);
  } catch {
    throw new Error("Dynamic catch values are not supported in JSON Schema");
  }
  o.default = m;
}, uw = (n, i, o, l) => {
  const s = n._zod.def, d = i.io === "input" ? s.in._zod.def.type === "transform" ? s.out : s.in : s.out;
  rt(d, i, l);
  const m = i.seen.get(n);
  m.ref = d;
}, dw = (n, i, o, l) => {
  const s = n._zod.def;
  rt(s.innerType, i, l);
  const d = i.seen.get(n);
  d.ref = s.innerType, o.readOnly = !0;
}, bh = (n, i, o, l) => {
  const s = n._zod.def;
  rt(s.innerType, i, l);
  const d = i.seen.get(n);
  d.ref = s.innerType;
}, mw = /* @__PURE__ */ K("ZodISODateTime", (n, i) => {
  gk.init(n, i), Pe.init(n, i);
});
function fw(n) {
  return /* @__PURE__ */ SE(mw, n);
}
const _w = /* @__PURE__ */ K("ZodISODate", (n, i) => {
  hk.init(n, i), Pe.init(n, i);
});
function pw(n) {
  return /* @__PURE__ */ kE(_w, n);
}
const gw = /* @__PURE__ */ K("ZodISOTime", (n, i) => {
  vk.init(n, i), Pe.init(n, i);
});
function hw(n) {
  return /* @__PURE__ */ EE(gw, n);
}
const vw = /* @__PURE__ */ K("ZodISODuration", (n, i) => {
  yk.init(n, i), Pe.init(n, i);
});
function yw(n) {
  return /* @__PURE__ */ wE(vw, n);
}
const bw = (n, i) => {
  th.init(n, i), n.name = "ZodError", Object.defineProperties(n, {
    format: {
      value: (o) => u2(n, o)
      // enumerable: false,
    },
    flatten: {
      value: (o) => c2(n, o)
      // enumerable: false,
    },
    addIssue: {
      value: (o) => {
        n.issues.push(o), n.message = JSON.stringify(n.issues, Lu, 2);
      }
      // enumerable: false,
    },
    addIssues: {
      value: (o) => {
        n.issues.push(...o), n.message = JSON.stringify(n.issues, Lu, 2);
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
}, un = K("ZodError", bw, {
  Parent: Error
}), Sw = /* @__PURE__ */ md(un), kw = /* @__PURE__ */ fd(un), Ew = /* @__PURE__ */ ql(un), ww = /* @__PURE__ */ Vl(un), Tw = /* @__PURE__ */ f2(un), xw = /* @__PURE__ */ _2(un), zw = /* @__PURE__ */ p2(un), Aw = /* @__PURE__ */ g2(un), Nw = /* @__PURE__ */ h2(un), Cw = /* @__PURE__ */ v2(un), Ow = /* @__PURE__ */ y2(un), Mw = /* @__PURE__ */ b2(un), Je = /* @__PURE__ */ K("ZodType", (n, i) => (Qe.init(n, i), Object.assign(n["~standard"], {
  jsonSchema: {
    input: Yl(n, "input"),
    output: Yl(n, "output")
  }
}), n.toJSONSchema = qE(n, {}), n.def = i, n.type = i.type, Object.defineProperty(n, "_def", { value: i }), n.check = (...o) => n.clone(Ea(i, {
  checks: [
    ...i.checks ?? [],
    ...o.map((l) => typeof l == "function" ? { _zod: { check: l, def: { check: "custom" }, onattach: [] } } : l)
  ]
}), {
  parent: !0
}), n.with = n.check, n.clone = (o, l) => wa(n, o, l), n.brand = () => n, n.register = ((o, l) => (o.add(n, l), n)), n.parse = (o, l) => Sw(n, o, l, { callee: n.parse }), n.safeParse = (o, l) => Ew(n, o, l), n.parseAsync = async (o, l) => kw(n, o, l, { callee: n.parseAsync }), n.safeParseAsync = async (o, l) => ww(n, o, l), n.spa = n.safeParseAsync, n.encode = (o, l) => Tw(n, o, l), n.decode = (o, l) => xw(n, o, l), n.encodeAsync = async (o, l) => zw(n, o, l), n.decodeAsync = async (o, l) => Aw(n, o, l), n.safeEncode = (o, l) => Nw(n, o, l), n.safeDecode = (o, l) => Cw(n, o, l), n.safeEncodeAsync = async (o, l) => Ow(n, o, l), n.safeDecodeAsync = async (o, l) => Mw(n, o, l), n.refine = (o, l) => n.check(xT(o, l)), n.superRefine = (o) => n.check(zT(o)), n.overwrite = (o) => n.check(/* @__PURE__ */ Bi(o)), n.optional = () => ag(n), n.exactOptional = () => fT(n), n.nullable = () => ig(n), n.nullish = () => ag(ig(n)), n.nonoptional = (o) => yT(n, o), n.array = () => Yu(n), n.or = (o) => wh([n, o]), n.and = (o) => oT(n, o), n.transform = (o) => og(n, dT(o)), n.default = (o) => gT(n, o), n.prefault = (o) => vT(n, o), n.catch = (o) => ST(n, o), n.pipe = (o) => og(n, o), n.readonly = () => wT(n), n.describe = (o) => {
  const l = n.clone();
  return Bo.add(l, { description: o }), l;
}, Object.defineProperty(n, "description", {
  get() {
    return Bo.get(n)?.description;
  },
  configurable: !0
}), n.meta = (...o) => {
  if (o.length === 0)
    return Bo.get(n);
  const l = n.clone();
  return Bo.add(l, o[0]), l;
}, n.isOptional = () => n.safeParse(void 0).success, n.isNullable = () => n.safeParse(null).success, n.apply = (o) => o(n), n)), Sh = /* @__PURE__ */ K("_ZodString", (n, i) => {
  _d.init(n, i), Je.init(n, i), n._zod.processJSONSchema = (l, s, d) => XE(n, l, s);
  const o = n._zod.bag;
  n.format = o.format ?? null, n.minLength = o.minimum ?? null, n.maxLength = o.maximum ?? null, n.regex = (...l) => n.check(/* @__PURE__ */ NE(...l)), n.includes = (...l) => n.check(/* @__PURE__ */ ME(...l)), n.startsWith = (...l) => n.check(/* @__PURE__ */ RE(...l)), n.endsWith = (...l) => n.check(/* @__PURE__ */ DE(...l)), n.min = (...l) => n.check(/* @__PURE__ */ Ul(...l)), n.max = (...l) => n.check(/* @__PURE__ */ ph(...l)), n.length = (...l) => n.check(/* @__PURE__ */ gh(...l)), n.nonempty = (...l) => n.check(/* @__PURE__ */ Ul(1, ...l)), n.lowercase = (l) => n.check(/* @__PURE__ */ CE(l)), n.uppercase = (l) => n.check(/* @__PURE__ */ OE(l)), n.trim = () => n.check(/* @__PURE__ */ LE()), n.normalize = (...l) => n.check(/* @__PURE__ */ jE(...l)), n.toLowerCase = () => n.check(/* @__PURE__ */ UE()), n.toUpperCase = () => n.check(/* @__PURE__ */ YE()), n.slugify = () => n.check(/* @__PURE__ */ HE());
}), Rw = /* @__PURE__ */ K("ZodString", (n, i) => {
  _d.init(n, i), Sh.init(n, i), n.email = (o) => n.check(/* @__PURE__ */ eE(Dw, o)), n.url = (o) => n.check(/* @__PURE__ */ oE(jw, o)), n.jwt = (o) => n.check(/* @__PURE__ */ bE(Fw, o)), n.emoji = (o) => n.check(/* @__PURE__ */ rE(Lw, o)), n.guid = (o) => n.check(/* @__PURE__ */ Ip(Wp, o)), n.uuid = (o) => n.check(/* @__PURE__ */ tE(kl, o)), n.uuidv4 = (o) => n.check(/* @__PURE__ */ nE(kl, o)), n.uuidv6 = (o) => n.check(/* @__PURE__ */ aE(kl, o)), n.uuidv7 = (o) => n.check(/* @__PURE__ */ iE(kl, o)), n.nanoid = (o) => n.check(/* @__PURE__ */ lE(Uw, o)), n.guid = (o) => n.check(/* @__PURE__ */ Ip(Wp, o)), n.cuid = (o) => n.check(/* @__PURE__ */ sE(Yw, o)), n.cuid2 = (o) => n.check(/* @__PURE__ */ cE(Hw, o)), n.ulid = (o) => n.check(/* @__PURE__ */ uE(Zw, o)), n.base64 = (o) => n.check(/* @__PURE__ */ hE($w, o)), n.base64url = (o) => n.check(/* @__PURE__ */ vE(Pw, o)), n.xid = (o) => n.check(/* @__PURE__ */ dE(Bw, o)), n.ksuid = (o) => n.check(/* @__PURE__ */ mE(Gw, o)), n.ipv4 = (o) => n.check(/* @__PURE__ */ fE(Kw, o)), n.ipv6 = (o) => n.check(/* @__PURE__ */ _E(qw, o)), n.cidrv4 = (o) => n.check(/* @__PURE__ */ pE(Vw, o)), n.cidrv6 = (o) => n.check(/* @__PURE__ */ gE(Xw, o)), n.e164 = (o) => n.check(/* @__PURE__ */ yE(Iw, o)), n.datetime = (o) => n.check(fw(o)), n.date = (o) => n.check(pw(o)), n.time = (o) => n.check(hw(o)), n.duration = (o) => n.check(yw(o));
});
function Va(n) {
  return /* @__PURE__ */ Wk(Rw, n);
}
const Pe = /* @__PURE__ */ K("ZodStringFormat", (n, i) => {
  $e.init(n, i), Sh.init(n, i);
}), Dw = /* @__PURE__ */ K("ZodEmail", (n, i) => {
  lk.init(n, i), Pe.init(n, i);
}), Wp = /* @__PURE__ */ K("ZodGUID", (n, i) => {
  ok.init(n, i), Pe.init(n, i);
}), kl = /* @__PURE__ */ K("ZodUUID", (n, i) => {
  rk.init(n, i), Pe.init(n, i);
}), jw = /* @__PURE__ */ K("ZodURL", (n, i) => {
  sk.init(n, i), Pe.init(n, i);
}), Lw = /* @__PURE__ */ K("ZodEmoji", (n, i) => {
  ck.init(n, i), Pe.init(n, i);
}), Uw = /* @__PURE__ */ K("ZodNanoID", (n, i) => {
  uk.init(n, i), Pe.init(n, i);
}), Yw = /* @__PURE__ */ K("ZodCUID", (n, i) => {
  dk.init(n, i), Pe.init(n, i);
}), Hw = /* @__PURE__ */ K("ZodCUID2", (n, i) => {
  mk.init(n, i), Pe.init(n, i);
}), Zw = /* @__PURE__ */ K("ZodULID", (n, i) => {
  fk.init(n, i), Pe.init(n, i);
}), Bw = /* @__PURE__ */ K("ZodXID", (n, i) => {
  _k.init(n, i), Pe.init(n, i);
}), Gw = /* @__PURE__ */ K("ZodKSUID", (n, i) => {
  pk.init(n, i), Pe.init(n, i);
}), Kw = /* @__PURE__ */ K("ZodIPv4", (n, i) => {
  bk.init(n, i), Pe.init(n, i);
}), qw = /* @__PURE__ */ K("ZodIPv6", (n, i) => {
  Sk.init(n, i), Pe.init(n, i);
}), Vw = /* @__PURE__ */ K("ZodCIDRv4", (n, i) => {
  kk.init(n, i), Pe.init(n, i);
}), Xw = /* @__PURE__ */ K("ZodCIDRv6", (n, i) => {
  Ek.init(n, i), Pe.init(n, i);
}), $w = /* @__PURE__ */ K("ZodBase64", (n, i) => {
  wk.init(n, i), Pe.init(n, i);
}), Pw = /* @__PURE__ */ K("ZodBase64URL", (n, i) => {
  xk.init(n, i), Pe.init(n, i);
}), Iw = /* @__PURE__ */ K("ZodE164", (n, i) => {
  zk.init(n, i), Pe.init(n, i);
}), Fw = /* @__PURE__ */ K("ZodJWT", (n, i) => {
  Nk.init(n, i), Pe.init(n, i);
}), kh = /* @__PURE__ */ K("ZodNumber", (n, i) => {
  dh.init(n, i), Je.init(n, i), n._zod.processJSONSchema = (l, s, d) => $E(n, l, s), n.gt = (l, s) => n.check(/* @__PURE__ */ Qp(l, s)), n.gte = (l, s) => n.check(/* @__PURE__ */ bu(l, s)), n.min = (l, s) => n.check(/* @__PURE__ */ bu(l, s)), n.lt = (l, s) => n.check(/* @__PURE__ */ Fp(l, s)), n.lte = (l, s) => n.check(/* @__PURE__ */ yu(l, s)), n.max = (l, s) => n.check(/* @__PURE__ */ yu(l, s)), n.int = (l) => n.check(tg(l)), n.safe = (l) => n.check(tg(l)), n.positive = (l) => n.check(/* @__PURE__ */ Qp(0, l)), n.nonnegative = (l) => n.check(/* @__PURE__ */ bu(0, l)), n.negative = (l) => n.check(/* @__PURE__ */ Fp(0, l)), n.nonpositive = (l) => n.check(/* @__PURE__ */ yu(0, l)), n.multipleOf = (l, s) => n.check(/* @__PURE__ */ Jp(l, s)), n.step = (l, s) => n.check(/* @__PURE__ */ Jp(l, s)), n.finite = () => n;
  const o = n._zod.bag;
  n.minValue = Math.max(o.minimum ?? Number.NEGATIVE_INFINITY, o.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null, n.maxValue = Math.min(o.maximum ?? Number.POSITIVE_INFINITY, o.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null, n.isInt = (o.format ?? "").includes("int") || Number.isSafeInteger(o.multipleOf ?? 0.5), n.isFinite = !0, n.format = o.format ?? null;
});
function eg(n) {
  return /* @__PURE__ */ TE(kh, n);
}
const Qw = /* @__PURE__ */ K("ZodNumberFormat", (n, i) => {
  Ck.init(n, i), kh.init(n, i);
});
function tg(n) {
  return /* @__PURE__ */ xE(Qw, n);
}
const Jw = /* @__PURE__ */ K("ZodUnknown", (n, i) => {
  Ok.init(n, i), Je.init(n, i), n._zod.processJSONSchema = (o, l, s) => IE();
});
function ng() {
  return /* @__PURE__ */ zE(Jw);
}
const Ww = /* @__PURE__ */ K("ZodNever", (n, i) => {
  Mk.init(n, i), Je.init(n, i), n._zod.processJSONSchema = (o, l, s) => PE(n, o, l);
});
function eT(n) {
  return /* @__PURE__ */ AE(Ww, n);
}
const tT = /* @__PURE__ */ K("ZodArray", (n, i) => {
  Rk.init(n, i), Je.init(n, i), n._zod.processJSONSchema = (o, l, s) => ew(n, o, l, s), n.element = i.element, n.min = (o, l) => n.check(/* @__PURE__ */ Ul(o, l)), n.nonempty = (o) => n.check(/* @__PURE__ */ Ul(1, o)), n.max = (o, l) => n.check(/* @__PURE__ */ ph(o, l)), n.length = (o, l) => n.check(/* @__PURE__ */ gh(o, l)), n.unwrap = () => n.element;
});
function Yu(n, i) {
  return /* @__PURE__ */ ZE(tT, n, i);
}
const nT = /* @__PURE__ */ K("ZodObject", (n, i) => {
  jk.init(n, i), Je.init(n, i), n._zod.processJSONSchema = (o, l, s) => tw(n, o, l, s), Ue(n, "shape", () => i.shape), n.keyof = () => Ko(Object.keys(n._zod.def.shape)), n.catchall = (o) => n.clone({ ...n._zod.def, catchall: o }), n.passthrough = () => n.clone({ ...n._zod.def, catchall: ng() }), n.loose = () => n.clone({ ...n._zod.def, catchall: ng() }), n.strict = () => n.clone({ ...n._zod.def, catchall: eT() }), n.strip = () => n.clone({ ...n._zod.def, catchall: void 0 }), n.extend = (o) => i2(n, o), n.safeExtend = (o) => o2(n, o), n.merge = (o) => r2(n, o), n.pick = (o) => n2(n, o), n.omit = (o) => a2(n, o), n.partial = (...o) => l2(Th, n, o[0]), n.required = (...o) => s2(xh, n, o[0]);
});
function Eh(n, i) {
  const o = {
    type: "object",
    shape: n ?? {},
    ...se(i)
  };
  return new nT(o);
}
const aT = /* @__PURE__ */ K("ZodUnion", (n, i) => {
  Lk.init(n, i), Je.init(n, i), n._zod.processJSONSchema = (o, l, s) => nw(n, o, l, s), n.options = i.options;
});
function wh(n, i) {
  return new aT({
    type: "union",
    options: n,
    ...se(i)
  });
}
const iT = /* @__PURE__ */ K("ZodIntersection", (n, i) => {
  Uk.init(n, i), Je.init(n, i), n._zod.processJSONSchema = (o, l, s) => aw(n, o, l, s);
});
function oT(n, i) {
  return new iT({
    type: "intersection",
    left: n,
    right: i
  });
}
const rT = /* @__PURE__ */ K("ZodRecord", (n, i) => {
  Yk.init(n, i), Je.init(n, i), n._zod.processJSONSchema = (o, l, s) => iw(n, o, l, s), n.keyType = i.keyType, n.valueType = i.valueType;
});
function lT(n, i, o) {
  return new rT({
    type: "record",
    keyType: n,
    valueType: i,
    ...se(o)
  });
}
const Hu = /* @__PURE__ */ K("ZodEnum", (n, i) => {
  Hk.init(n, i), Je.init(n, i), n._zod.processJSONSchema = (l, s, d) => FE(n, l, s), n.enum = i.entries, n.options = Object.values(i.entries);
  const o = new Set(Object.keys(i.entries));
  n.extract = (l, s) => {
    const d = {};
    for (const m of l)
      if (o.has(m))
        d[m] = i.entries[m];
      else
        throw new Error(`Key ${m} not found in enum`);
    return new Hu({
      ...i,
      checks: [],
      ...se(s),
      entries: d
    });
  }, n.exclude = (l, s) => {
    const d = { ...i.entries };
    for (const m of l)
      if (o.has(m))
        delete d[m];
      else
        throw new Error(`Key ${m} not found in enum`);
    return new Hu({
      ...i,
      checks: [],
      ...se(s),
      entries: d
    });
  };
});
function Ko(n, i) {
  const o = Array.isArray(n) ? Object.fromEntries(n.map((l) => [l, l])) : n;
  return new Hu({
    type: "enum",
    entries: o,
    ...se(i)
  });
}
const sT = /* @__PURE__ */ K("ZodLiteral", (n, i) => {
  Zk.init(n, i), Je.init(n, i), n._zod.processJSONSchema = (o, l, s) => QE(n, o, l), n.values = new Set(i.values), Object.defineProperty(n, "value", {
    get() {
      if (i.values.length > 1)
        throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
      return i.values[0];
    }
  });
});
function cT(n, i) {
  return new sT({
    type: "literal",
    values: Array.isArray(n) ? n : [n],
    ...se(i)
  });
}
const uT = /* @__PURE__ */ K("ZodTransform", (n, i) => {
  Bk.init(n, i), Je.init(n, i), n._zod.processJSONSchema = (o, l, s) => WE(n, o), n._zod.parse = (o, l) => {
    if (l.direction === "backward")
      throw new Ig(n.constructor.name);
    o.addIssue = (d) => {
      if (typeof d == "string")
        o.issues.push(qo(d, o.value, i));
      else {
        const m = d;
        m.fatal && (m.continue = !1), m.code ?? (m.code = "custom"), m.input ?? (m.input = o.value), m.inst ?? (m.inst = n), o.issues.push(qo(m));
      }
    };
    const s = i.transform(o.value, o);
    return s instanceof Promise ? s.then((d) => (o.value = d, o)) : (o.value = s, o);
  };
});
function dT(n) {
  return new uT({
    type: "transform",
    transform: n
  });
}
const Th = /* @__PURE__ */ K("ZodOptional", (n, i) => {
  _h.init(n, i), Je.init(n, i), n._zod.processJSONSchema = (o, l, s) => bh(n, o, l, s), n.unwrap = () => n._zod.def.innerType;
});
function ag(n) {
  return new Th({
    type: "optional",
    innerType: n
  });
}
const mT = /* @__PURE__ */ K("ZodExactOptional", (n, i) => {
  Gk.init(n, i), Je.init(n, i), n._zod.processJSONSchema = (o, l, s) => bh(n, o, l, s), n.unwrap = () => n._zod.def.innerType;
});
function fT(n) {
  return new mT({
    type: "optional",
    innerType: n
  });
}
const _T = /* @__PURE__ */ K("ZodNullable", (n, i) => {
  Kk.init(n, i), Je.init(n, i), n._zod.processJSONSchema = (o, l, s) => ow(n, o, l, s), n.unwrap = () => n._zod.def.innerType;
});
function ig(n) {
  return new _T({
    type: "nullable",
    innerType: n
  });
}
const pT = /* @__PURE__ */ K("ZodDefault", (n, i) => {
  qk.init(n, i), Je.init(n, i), n._zod.processJSONSchema = (o, l, s) => lw(n, o, l, s), n.unwrap = () => n._zod.def.innerType, n.removeDefault = n.unwrap;
});
function gT(n, i) {
  return new pT({
    type: "default",
    innerType: n,
    get defaultValue() {
      return typeof i == "function" ? i() : Wg(i);
    }
  });
}
const hT = /* @__PURE__ */ K("ZodPrefault", (n, i) => {
  Vk.init(n, i), Je.init(n, i), n._zod.processJSONSchema = (o, l, s) => sw(n, o, l, s), n.unwrap = () => n._zod.def.innerType;
});
function vT(n, i) {
  return new hT({
    type: "prefault",
    innerType: n,
    get defaultValue() {
      return typeof i == "function" ? i() : Wg(i);
    }
  });
}
const xh = /* @__PURE__ */ K("ZodNonOptional", (n, i) => {
  Xk.init(n, i), Je.init(n, i), n._zod.processJSONSchema = (o, l, s) => rw(n, o, l, s), n.unwrap = () => n._zod.def.innerType;
});
function yT(n, i) {
  return new xh({
    type: "nonoptional",
    innerType: n,
    ...se(i)
  });
}
const bT = /* @__PURE__ */ K("ZodCatch", (n, i) => {
  $k.init(n, i), Je.init(n, i), n._zod.processJSONSchema = (o, l, s) => cw(n, o, l, s), n.unwrap = () => n._zod.def.innerType, n.removeCatch = n.unwrap;
});
function ST(n, i) {
  return new bT({
    type: "catch",
    innerType: n,
    catchValue: typeof i == "function" ? i : () => i
  });
}
const kT = /* @__PURE__ */ K("ZodPipe", (n, i) => {
  Pk.init(n, i), Je.init(n, i), n._zod.processJSONSchema = (o, l, s) => uw(n, o, l, s), n.in = i.in, n.out = i.out;
});
function og(n, i) {
  return new kT({
    type: "pipe",
    in: n,
    out: i
    // ...util.normalizeParams(params),
  });
}
const ET = /* @__PURE__ */ K("ZodReadonly", (n, i) => {
  Ik.init(n, i), Je.init(n, i), n._zod.processJSONSchema = (o, l, s) => dw(n, o, l, s), n.unwrap = () => n._zod.def.innerType;
});
function wT(n) {
  return new ET({
    type: "readonly",
    innerType: n
  });
}
const TT = /* @__PURE__ */ K("ZodCustom", (n, i) => {
  Fk.init(n, i), Je.init(n, i), n._zod.processJSONSchema = (o, l, s) => JE(n, o);
});
function xT(n, i = {}) {
  return /* @__PURE__ */ BE(TT, n, i);
}
function zT(n) {
  return /* @__PURE__ */ GE(n);
}
function tt(n, i) {
  return typeof n == typeof i ? n : i;
}
function El(n) {
  return typeof n == "string";
}
function Go(n) {
  return typeof n == "number";
}
const AT = /^[a-z][a-z0-9_]*\.[a-z0-9][a-z0-9_]*$/, zh = Va().regex(AT, "Invalid entity ID format. Expected: domain.object_id"), NT = zh.refine((n) => n.startsWith("vacuum."), {
  message: "Expected vacuum.* entity"
}), CT = zh.refine((n) => n.startsWith("camera."), {
  message: "Expected camera.* entity"
}), OT = Eh({
  type: cT("stop"),
  action: Ko(["stop", "stop_and_dock"])
}), MT = ["theme", "custom_theme"], RT = Eh({
  type: Va(),
  entity: NT,
  map_entity: CT.optional(),
  title: Va().optional(),
  language: Va().optional(),
  default_mode: Ko(["room", "all", "zone"]).optional(),
  default_room_view: Ko(["map", "list"]).optional(),
  buttons: Yu(OT).optional(),
  map_overlays: Yu(Ko(["vacuum", "charger", "room_labels"])).optional(),
  room_names: lT(Va(), Va()).optional(),
  room_label_scale: eg().positive().optional(),
  map_height: wh([Va(), eg().positive()]).optional()
}).passthrough();
function DT(n) {
  const i = RT.safeParse(n);
  return i.success ? {
    valid: !0,
    errors: [],
    warnings: MT.filter((l) => l in i.data).map(
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
function rg(n) {
  if (typeof n == "string") return n;
  if (n && typeof n == "object" && typeof n.name == "string") return n.name;
}
const jT = 1e-6;
function lg(n) {
  return typeof n == "number" && Number.isFinite(n);
}
function Hl(n) {
  if (!Array.isArray(n))
    return null;
  const i = n.flatMap((o) => !Array.isArray(o) || o.length !== 2 || !lg(o[0]) || !lg(o[1]) ? [] : [{ x: o[0], y: o[1] }]);
  return i.length >= 3 ? i : null;
}
function LT(n) {
  if (Array.isArray(n.outlines)) {
    const o = n.outlines.flatMap((l) => {
      const s = Hl(l);
      return s ? [s] : [];
    });
    if (o.length > 0)
      return o;
  }
  const i = Hl(n.outline);
  return i ? [i] : void 0;
}
function UT(n) {
  return Math.abs(
    n.reduce((i, o, l) => {
      const s = n[(l + 1) % n.length];
      return i + o.x * s.y - s.x * o.y;
    }, 0) / 2
  );
}
function Su(n, i) {
  const o = n.map(({ x: l, y: s }) => i.vacuumToMap({ x: l, y: s }));
  return o.every(({ x: l, y: s }) => Number.isFinite(l) && Number.isFinite(s)) && UT(o) > jT ? o : null;
}
function ku(n) {
  return n.map(
    (i) => `M ${i[0].x} ${i[0].y} ${i.slice(1).map(({ x: o, y: l }) => `L ${o} ${l}`).join(" ")} Z`
  ).join(" ");
}
function sg(n, i, o) {
  return o ? o[String(n)] ?? o[i] ?? i : i;
}
function pd(n, i) {
  return n ? Array.isArray(n) ? n.map((o) => {
    const l = Number(o.id ?? o.room_id ?? 0), s = sg(l, o.name ?? `Room ${l}`, i), d = o.outline ?? o.vertexs, m = Hl(d), f = m && m.length >= 3 ? [m] : void 0;
    return {
      id: l,
      name: s,
      icon: rg(o.icon),
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
      name: sg(s, l.name ?? `Room ${s}`, i),
      icon: rg(l.icon),
      visibility: l.visibility,
      rings: LT(l),
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
function YT(n, i, o) {
  const l = n.states[i];
  return l?.attributes?.rooms ? pd(l.attributes.rooms, o) : (pe.debug("RoomParser", "No rooms found in camera entity:", i), []);
}
function HT(n, i) {
  if (n.rings?.length) {
    const s = n.rings.flatMap((d) => {
      const m = Su(d, i);
      return m ? [m] : [];
    });
    return s.length > 0 ? ku(s) : "";
  }
  const o = n.outline;
  if (o && Array.isArray(o) && o.length >= 3) {
    const s = Hl(o);
    if (s) {
      const d = Su(s, i);
      if (d) return ku([d]);
    }
  }
  if (n.x0 === void 0 || n.y0 === void 0 || n.x1 === void 0 || n.y1 === void 0)
    return pe.warn("Room missing coordinates:", n), "";
  const l = Su(
    [
      { x: n.x0, y: n.y0 },
      { x: n.x1, y: n.y0 },
      { x: n.x1, y: n.y1 },
      { x: n.x0, y: n.y1 }
    ],
    i
  );
  return l ? ku([l]) : "";
}
function Ah(n, i, o, l) {
  if (n) return n;
  if (i) return i;
  if (!o || !l) return "";
  const s = l.replace(/^vacuum\./, "");
  return Object.keys(o.states).find(
    (m) => m.startsWith("camera.") && (m.includes(s) || m.includes("cleaning_map") || m.includes("map"))
  ) || "";
}
function ZT(n, i) {
  const o = tt(n.attributes.status, ""), l = n.attributes.segment_cleaning || !1, s = n.attributes.zone_cleaning || !1;
  if (n.attributes.started) {
    if (l || o.toLowerCase().includes("room"))
      return "room";
    if (s || o.toLowerCase().includes("zone"))
      return "zone";
  }
  return i;
}
function BT(n, i, o, l) {
  const s = n.states[i], d = n.states[o], m = /* @__PURE__ */ new Map();
  if (!s) return m;
  const f = s.attributes.segment_cleaning === !0, p = s.attributes.active_segments;
  if (!f || !p || !Array.isArray(p))
    return m;
  const _ = /* @__PURE__ */ new Map();
  if (d?.attributes?.rooms) {
    const v = pd(d.attributes.rooms, l);
    for (const y of v)
      _.set(y.id, y.name);
  }
  return p.forEach((v) => {
    const y = _.get(v) || `Room ${v}`;
    m.set(v, y);
  }), m;
}
const Nh = 1e-9, cg = 1e-6, wl = 0.05;
function ug(n) {
  return Number.isFinite(n.x) && Number.isFinite(n.y);
}
function gd(n, i, o, l) {
  return n * l - o * i;
}
function dg(n, i, o, l) {
  const s = Math.abs(gd(n, i, o, l)), d = Math.max(Math.hypot(n, i) * Math.hypot(o, l), 1);
  return s <= Nh * d;
}
function Tl(n, i) {
  return {
    x: n.a * i.x + n.b * i.y + n.c,
    y: n.d * i.x + n.e * i.y + n.f
  };
}
function GT(n) {
  const i = gd(n.a, n.d, n.b, n.e), o = Math.max(Math.hypot(n.a, n.d) * Math.hypot(n.b, n.e), 1);
  if (Math.abs(i) <= Nh * o)
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
function mg(n, i) {
  return Math.hypot(n.x - i.x, n.y - i.y);
}
function hd(n, i, o) {
  const l = n.filter((s) => ug(s.vacuum) && ug(s.map));
  if (l.length < 3)
    return null;
  for (let s = 0; s < l.length - 2; s += 1)
    for (let d = s + 1; d < l.length - 1; d += 1)
      for (let m = d + 1; m < l.length; m += 1) {
        const f = l[s], p = l[d], _ = l[m], v = p.vacuum.x - f.vacuum.x, y = p.vacuum.y - f.vacuum.y, S = _.vacuum.x - f.vacuum.x, k = _.vacuum.y - f.vacuum.y, E = p.map.x - f.map.x, z = p.map.y - f.map.y, R = _.map.x - f.map.x, D = _.map.y - f.map.y;
        if (dg(v, y, S, k) || dg(E, z, R, D))
          continue;
        const Y = gd(v, y, S, k), L = {
          a: k / Y,
          b: -S / Y,
          d: -y / Y,
          e: v / Y
        }, H = {
          a: E * L.a + R * L.d,
          b: E * L.b + R * L.e,
          c: 0,
          d: z * L.a + D * L.d,
          e: z * L.b + D * L.e,
          f: 0
        };
        H.c = f.map.x - H.a * f.vacuum.x - H.b * f.vacuum.y, H.f = f.map.y - H.d * f.vacuum.x - H.e * f.vacuum.y;
        const X = GT(H);
        if (!(!X || l.some(($) => {
          const V = Tl(H, $.vacuum), F = Tl(X, V);
          return mg(V, $.map) > cg || mg(F, $.vacuum) > cg;
        })))
          return {
            source: i,
            commandSafe: o,
            vacuumToMap: ($) => Tl(H, $),
            mapToVacuum: ($) => Tl(X, $)
          };
      }
  return null;
}
function KT(n) {
  return hd(n, "calibration", !0);
}
function qT(n, i, o) {
  let l = Math.trunc(
    i.width * i.scale + i.padding[0] + i.padding[2] - i.crop[0] - i.crop[2]
  ), s = Math.trunc(
    i.height * i.scale + i.padding[1] + i.padding[3] - i.crop[1] - i.crop[3]
  ), { x: d, y: m } = n;
  for (let f = o; f > 0; f -= 90) {
    const p = m, _ = l - d;
    d = p, m = _, [l, s] = [s, l];
  }
  return { x: d, y: m };
}
function VT(n, i, o) {
  const l = {
    x: (n.x - i.left) / i.gridSize * i.scale + i.padding[0] - i.crop[0],
    y: (i.height * i.gridSize - 1 - (n.y - i.top)) / i.gridSize * i.scale + i.padding[1] - i.crop[1]
  };
  return qT(l, i, o);
}
function XT(n, i) {
  const l = [
    { x: 0, y: 0 },
    { x: 1e3, y: 0 },
    { x: 0, y: 1e3 }
  ].map((s) => ({
    vacuum: s,
    map: VT(s, n, i)
  }));
  return hd(l, "dimensions", !0);
}
function $T(n, i, o, l) {
  const s = n.flatMap((z) => z.x0 === void 0 || z.y0 === void 0 || z.x1 === void 0 || z.y1 === void 0 ? [] : [
    { x: z.x0, y: z.y0 },
    { x: z.x1, y: z.y1 }
  ]);
  if (s.length === 0 || i <= 0 || o <= 0)
    return null;
  const d = Math.min(...s.map((z) => z.x)), m = Math.max(...s.map((z) => z.x)), f = Math.min(...s.map((z) => z.y)), p = Math.max(...s.map((z) => z.y));
  if (d === m || f === p)
    return null;
  const _ = i * wl, v = i * (1 - wl), y = o * wl, S = o * (1 - wl), k = [
    { x: d, y: f },
    { x: m, y: f },
    { x: d, y: p }
  ], E = {
    0: [
      { x: _, y: S },
      { x: v, y: S },
      { x: _, y }
    ],
    90: [
      { x: _, y },
      { x: _, y: S },
      { x: v, y }
    ],
    180: [
      { x: v, y },
      { x: _, y },
      { x: v, y: S }
    ],
    270: [
      { x: v, y: S },
      { x: v, y },
      { x: _, y: S }
    ]
  };
  return hd(
    k.map((z, R) => ({ vacuum: z, map: E[l][R] })),
    "room_estimate",
    !1
  );
}
function PT({
  calibrationPoints: n,
  dimensions: i,
  rooms: o,
  rotation: l,
  imageWidth: s,
  imageHeight: d
}) {
  if (n) {
    const m = KT(n);
    if (m)
      return m;
  }
  if (i) {
    const m = XT(i, l);
    if (m)
      return m;
  }
  return $T(o, s, d, l);
}
function Eu(n) {
  if (n == null) return null;
  const i = String(n).trim();
  return i.length > 0 && i !== "0" && i !== "null" && i !== "undefined" ? i : null;
}
function IT(n, i, o = null) {
  const l = Eu(n), s = Eu(i?.map_id), d = Eu(i?.saved_map_id), m = i?.entity_picture, f = typeof m == "string" && m.length > 0 ? m : null, p = f === null ? null : `${s || "live"}:${d || "live"}`, _ = !!(l === null || s === null || d === l || s === l || s && l && String(s) === String(l));
  return {
    floorId: l && Number.isFinite(Number(l)) ? Number(l) : null,
    floorReady: _,
    imageToken: f,
    imageKey: p,
    // A picture only counts as ready when it was loaded for this exact map key.
    // Comparing the cache-busting token instead would mark a previous floor's picture
    // as ready; comparing the key keeps same-map token refreshes ready.
    imageReady: p !== null && p === o
  };
}
function FT(n, i) {
  if (n.size !== i.size) return !1;
  const o = [...n.keys()].sort(), l = [...i.keys()].sort();
  return o.every((s, d) => s === l[d]);
}
function QT({
  floorChanged: n,
  mapReady: i,
  isSegmentCleaning: o,
  selectedRooms: l,
  activeSegments: s
}) {
  if (!i || !o || s.size === 0)
    return { rooms: n ? /* @__PURE__ */ new Map() : null, clearZone: n, selectRoomMode: !1 };
  const d = n || !FT(l, s);
  return {
    rooms: d ? s : null,
    clearZone: n,
    selectRoomMode: d
  };
}
function JT({
  hasCamera: n,
  imageFailed: i,
  floorReady: o,
  imageReady: l,
  roomCount: s,
  hasTransform: d
}) {
  return n ? i ? "image_failed" : !o || !l ? null : s === 0 ? "no_rooms" : d ? null : "bad_calibration" : "no_camera";
}
const WT = [
  { key: "start_auto_empty", labelKey: "settings.station_controls.start_auto_empty" },
  { key: "self_clean", labelKey: "settings.station_controls.self_clean" },
  { key: "manual_drying", labelKey: "settings.station_controls.manual_drying" }
];
function ex(n, i) {
  return !1;
}
function tx(n, i = !1) {
  return "good";
}
function nx(n, i) {
  const o = n ? Q1[n] : void 0, l = i ? J1[i] : void 0;
  return o && o !== "other" ? o : l === "cleaning" || l === "paused" || l === "returning" ? l : o ?? l ?? W1;
}
function ax(n) {
  return n && Op[n] ? Op[n] : tS;
}
function ix(n, i, o) {
  const l = n === "cleaning", s = n === "paused", d = l || s, m = Tt(i), f = m === "mopping", p = m === "sweeping", _ = m === "mopping_after_sweeping";
  return {
    canChangeCleaningMode: n === "idle" || d && !_,
    canChangeSuctionPower: !f && !o,
    canChangeWetness: !p && !o,
    canChangeRoute: !d,
    canChangeMopFrequency: !d,
    canToggleMaxPower: (p || _) && !o,
    canStartCleaning: !d && n !== "returning" && n !== "error",
    canPause: l,
    canResume: s,
    canStop: d,
    canDock: n !== "returning" && n !== "maintenance"
  };
}
function ox(n, i) {
  return n || (typeof i == "string" ? i : "");
}
function rx(n, i, o, l) {
  return C.useMemo(() => {
    const s = sn(n, o), d = s.state ?? i.state ?? "unknown", m = nx(s.state, i.state), f = ax(s.state), p = i.attributes.customized_cleaning === !0, _ = ix(m, l, p);
    return {
      phase: m,
      task: f,
      rawState: d,
      cleaningMode: l,
      isCustomizedCleaning: p,
      controls: _
    };
  }, [n, i, o, l]);
}
function lx({
  hass: n,
  entity: i,
  config: o,
  language: l,
  deviceEntities: s,
  children: d
}) {
  const m = C.useMemo(() => Zg(l), [l]), f = s.get("select", gn.CLEANING_MODE.key), p = ox(
    Kl(f ? n.states[f] : void 0).value,
    i.attributes.cleaning_mode
  ), _ = rx(n, i, s.get("sensor", "state"), p), v = C.useMemo(
    () => ({ hass: n, entity: i, config: o, language: l, isRtl: m, machineState: _, deviceEntities: s }),
    [n, i, o, l, m, _, s]
  );
  return /* @__PURE__ */ g.jsx(nd.Provider, { value: v, children: d });
}
function sx() {
  const n = Gl();
  return { getStopAction: C.useCallback(() => n.buttons?.find((l) => l.type === "stop")?.action ?? "stop_and_dock", [n.buttons]) };
}
const fg = "standard", _g = 2, pg = "1", cx = ["quiet", "standard", "powerful", "max"], ux = ["1", "2"];
function Ch(n) {
  return `botslab_room_settings_${n}`;
}
function Zu(n) {
  try {
    const i = localStorage.getItem(Ch(n));
    return i ? JSON.parse(i) : {};
  } catch {
    return {};
  }
}
function dx(n, i) {
  try {
    localStorage.setItem(Ch(n), JSON.stringify(i));
  } catch {
  }
}
function mx({
  hass: n,
  vacuumEntityId: i,
  rooms: o
}) {
  const [l, s] = C.useState(
    () => Zu(i)
  );
  C.useEffect(() => {
    s(Zu(i));
  }, [i]);
  const d = C.useCallback(
    (S, k) => {
      s((E) => {
        const z = E[S] || {
          suctionLevel: fg,
          wetnessLevel: _g,
          cleaningTimes: pg
        }, R = { ...E, [S]: { ...z, ...k } };
        return dx(i, R), pe.debug("RoomSettings", "Updated room config:", S, k), R;
      });
    },
    [i]
  ), m = C.useCallback(
    (S, k) => {
      d(S, { suctionLevel: k });
    },
    [d]
  ), f = C.useCallback(
    (S, k) => {
      d(S, { wetnessLevel: k });
    },
    [d]
  ), p = C.useCallback(
    (S, k) => {
      d(S, { cleaningTimes: k });
    },
    [d]
  ), _ = C.useCallback((S, k) => {
  }, []), v = C.useCallback((S, k) => {
  }, []), y = /* @__PURE__ */ new Map();
  for (const S of o) {
    const k = l[S.id] || {
      suctionLevel: fg,
      wetnessLevel: _g,
      cleaningTimes: pg
    };
    y.set(S.id, {
      roomId: S.id,
      roomName: S.name,
      suctionLevel: k.suctionLevel,
      suctionLevelOptions: cx,
      wetnessLevel: k.wetnessLevel,
      wetnessMin: 1,
      wetnessMax: 3,
      cleaningTimes: k.cleaningTimes,
      cleaningTimesOptions: ux,
      mopPressure: null,
      mopPressureOptions: [],
      mopTemperature: null,
      mopTemperatureOptions: [],
      hasEntities: !0
    });
  }
  return {
    roomSettings: y,
    setSuctionLevel: m,
    setWetnessLevel: f,
    setCleaningTimes: p,
    setMopPressure: _,
    setMopTemperature: v
  };
}
const fx = 4e3;
function Oh() {
  const [n, i] = C.useState(null);
  return C.useEffect(() => {
    if (n === null) return;
    const l = window.setTimeout(() => i(null), fx);
    return () => window.clearTimeout(l);
  }, [n]), { armedKey: n, tap: (l, s) => {
    if (n !== l) {
      i(l);
      return;
    }
    i(null), s();
  } };
}
function xl(n, i = []) {
  const [o, l] = C.useState([]), s = qg({ selectOptions: n, attributeList: i, rememberedOptions: o });
  return Kg(o, s.rememberedOptions) || l(s.rememberedOptions), s;
}
function hn(n) {
  return typeof n == "number" && Number.isFinite(n);
}
function gg(n) {
  return !Array.isArray(n) || n.length !== 4 || !n.every(hn) ? null : [n[0], n[1], n[2], n[3]];
}
function _x(n) {
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
function px(n) {
  const { top: i, left: o, height: l, width: s, grid_size: d } = n;
  if (!hn(i) || !hn(o) || !hn(l) || !hn(s) || !hn(d) || l <= 0 || s <= 0 || d <= 0)
    return null;
  const m = n.scale === void 0 ? 1 : n.scale;
  if (!hn(m) || m <= 0)
    return null;
  const f = n.padding === void 0 ? [0, 0, 0, 0] : gg(n.padding), p = n.crop === void 0 ? [0, 0, 0, 0] : gg(n.crop);
  return !f || !p ? null : { top: i, left: o, height: l, width: s, gridSize: d, scale: m, padding: f, crop: p };
}
function gx(n) {
  return n === 90 || n === 180 || n === 270 ? n : 0;
}
function hx({
  hass: n,
  mapEntityId: i,
  imageWidth: o,
  imageHeight: l,
  roomNames: s
}) {
  const m = n.states[i]?.attributes;
  return C.useMemo(() => {
    const f = pd(m?.rooms, s), p = gx(m?.rotation), _ = PT({
      calibrationPoints: _x(m?.calibration_points),
      dimensions: px(m ?? {}),
      rooms: f,
      rotation: p,
      imageWidth: o,
      imageHeight: l
    });
    return { rooms: f, rotation: p, transform: _ };
  }, [m, o, l, s]);
}
const zl = /* @__PURE__ */ new Map(), Al = /* @__PURE__ */ new Map();
function Mh() {
  const n = ct(), i = Gl(), o = TS(i.language, n.language), l = zl.get(o), [s, d] = C.useState(l ?? {}), [m, f] = C.useState(l ? o : null);
  return l && m !== o && (f(o), d(l)), C.useEffect(() => {
    if (zl.has(o)) return;
    let p = !0;
    const _ = Al.get(o) ?? OS((v) => n.callWS(v), o);
    return Al.set(o, _), _.then((v) => {
      zl.set(o, v), Al.delete(o), p && (f(o), d(v));
    }).catch(() => {
      zl.set(o, {}), Al.delete(o), p && (f(o), d({}));
    }), () => {
      p = !1;
    };
  }, [o, n]), s;
}
function Io(n, i) {
  const { t: o } = De(), l = ct(), { get: s } = cn(), d = Mh();
  if (i) return i;
  const m = n.platform === "attribute" ? void 0 : s(n.platform, n.key), f = m ? l.states[m]?.attributes.friendly_name : void 0;
  return CS({
    resources: d,
    platform: n.platform,
    key: n.key,
    friendlyName: f,
    chromeLabel: o(n.labelKey)
  });
}
function vx({ deviceName: n, onSettingsClick: i }) {
  const { t: o } = De(), l = id(), s = Vt(), { rawState: d } = Xn(), m = Mh(), f = NS(m, d), p = tt(s.attributes.cleaned_area ?? s.attributes.cleaning_area ?? s.attributes.cleaned_area_sqm, 0), _ = tt(s.attributes.cleaning_time ?? s.attributes.cleaning_time_minutes, 0), v = s.attributes.battery ?? s.attributes.battery_level, y = tt(v, 0), S = () => {
    const E = v;
    return Go(E) ? E >= 80 ? N1 : E >= 60 ? A1 : E >= 20 ? z1 : x1 : null;
  }, k = tt(s.attributes.cleaning_progress, 0) || tt(s.attributes.drying_progress, 0);
  return /* @__PURE__ */ g.jsxs("div", { className: "header", children: [
    /* @__PURE__ */ g.jsxs("div", { className: "header__top", children: [
      /* @__PURE__ */ g.jsxs("div", { className: "header__title-wrapper", children: [
        /* @__PURE__ */ g.jsx("h2", { className: "header__title", children: n }),
        /* @__PURE__ */ g.jsx("p", { className: "header__status", children: f })
      ] }),
      i && /* @__PURE__ */ g.jsx("button", { className: "header__settings-btn", onClick: i, type: "button", "aria-label": "Settings", children: /* @__PURE__ */ g.jsx(F0, {}) })
    ] }),
    d !== "sleeping" && k > 0 && /* @__PURE__ */ g.jsx("div", { className: "header__progress", children: /* @__PURE__ */ g.jsx("div", { className: "header__progress-bar", children: /* @__PURE__ */ g.jsx("div", { className: "header__progress-fill", style: { width: `${k}%` } }) }) }),
    /* @__PURE__ */ g.jsxs("div", { className: "header__stats", children: [
      /* @__PURE__ */ g.jsxs("div", { className: "header__stat", children: [
        /* @__PURE__ */ g.jsx("span", { className: "header__stat-icon", children: O1 }),
        /* @__PURE__ */ g.jsxs("span", { className: "header__stat-value", children: [
          p,
          " ",
          l
        ] })
      ] }),
      /* @__PURE__ */ g.jsxs("div", { className: "header__stat", children: [
        /* @__PURE__ */ g.jsx("span", { className: "header__stat-icon", children: C1 }),
        /* @__PURE__ */ g.jsxs("span", { className: "header__stat-value--cleaning-time", children: [
          _,
          " ",
          o("units.minutes")
        ] })
      ] }),
      /* @__PURE__ */ g.jsxs("div", { className: "header__stat", children: [
        /* @__PURE__ */ g.jsx("span", { className: "header__stat-icon", children: S() }),
        /* @__PURE__ */ g.jsxs("span", { className: "header__stat-value", children: [
          y,
          " ",
          o("units.percent")
        ] })
      ] })
    ] })
  ] });
}
function yx() {
  const { t: n } = De(), i = Vt(), o = ct(), [l, s] = C.useState(!1), d = C.useRef(null), { get: m } = cn(), f = i.attributes, p = C.useMemo(() => f.maps ?? [], [f.maps]), _ = f.selected_map_id ?? f.selected_map, v = m(Dl.selectedMap.platform, Dl.selectedMap.key), S = sn(o, v).unavailable, k = C.useMemo(() => p.find((R) => R.id === _), [p, _]), E = k?.custom_name || k?.name || n("map_selector.unknown"), z = C.useCallback(
    (R) => {
      v && (o.callService("select", "select_option", {
        entity_id: v,
        option: R.name
      }), s(!1));
    },
    [o, v]
  );
  return C.useEffect(() => {
    function R(D) {
      const Y = D.composedPath();
      d.current && !Y.includes(d.current) && s(!1);
    }
    if (l)
      return document.addEventListener("mousedown", R), () => document.removeEventListener("mousedown", R);
  }, [l]), C.useEffect(() => {
    function R(D) {
      D.key === "Escape" && s(!1);
    }
    if (l)
      return document.addEventListener("keydown", R), () => document.removeEventListener("keydown", R);
  }, [l]), /* @__PURE__ */ g.jsxs("div", { className: "map-selector", ref: d, children: [
    /* @__PURE__ */ g.jsxs(
      "button",
      {
        className: `map-selector__button ${l ? "map-selector__button--open" : ""} ${S ? "map-selector__button--disabled" : ""}`,
        onClick: () => !S && s(!l),
        type: "button",
        disabled: S,
        "aria-expanded": l,
        "aria-haspopup": "listbox",
        children: [
          /* @__PURE__ */ g.jsx("span", { className: "map-selector__icon", children: /* @__PURE__ */ g.jsx(Vu, { size: 16 }) }),
          /* @__PURE__ */ g.jsx("span", { className: "map-selector__label", children: E }),
          /* @__PURE__ */ g.jsx(qu, { className: `map-selector__chevron ${l ? "map-selector__chevron--open" : ""}` })
        ]
      }
    ),
    l && /* @__PURE__ */ g.jsx("div", { className: "map-selector__dropdown", role: "listbox", children: p.map((R) => {
      const D = R.id === _, Y = R.custom_name || R.name;
      return /* @__PURE__ */ g.jsxs(
        "button",
        {
          className: `map-selector__option ${D ? "map-selector__option--selected" : ""}`,
          onClick: () => z(R),
          type: "button",
          role: "option",
          "aria-selected": D,
          children: [
            /* @__PURE__ */ g.jsx("span", { className: "map-selector__option-name", children: Y }),
            D && /* @__PURE__ */ g.jsx(Cg, { className: "map-selector__option-check" })
          ]
        },
        R.id
      );
    }) })
  ] });
}
function bx({
  cleaningMode: n,
  onClick: i,
  onRepeatClick: o,
  repeatCount: l = 1
}) {
  const { t: s } = De(), { phase: d, isCustomizedCleaning: m } = Xn(), p = d === "cleaning" || d === "paused", _ = (S) => m ? jg : $g(S) || Dg, v = (S) => m ? s("customize.title") : Vg(S, s) || s("cleaning_mode.custom"), y = (S) => {
    S.stopPropagation(), o?.();
  };
  return /* @__PURE__ */ g.jsxs("div", { className: "cleaning-mode-button-wrapper", children: [
    /* @__PURE__ */ g.jsxs("button", { onClick: i, className: "cleaning-mode-button", type: "button", children: [
      /* @__PURE__ */ g.jsxs("div", { className: "cleaning-mode-button__content", children: [
        /* @__PURE__ */ g.jsx("span", { className: "cleaning-mode-button__icon", children: _(n) }),
        /* @__PURE__ */ g.jsx("span", { className: "cleaning-mode-button__text", children: v(n) })
      ] }),
      /* @__PURE__ */ g.jsx("span", { className: "cleaning-mode-button__arrow", children: "›" })
    ] }),
    o && /* @__PURE__ */ g.jsxs(
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
}, Sx = function(n, i) {
  return i;
}, Me = function(n, i, o) {
  o && typeof o == "function" && o(n, i);
}, kx = function(n) {
  return -Math.cos(n * Math.PI) / 2 + 0.5;
}, Ex = function(n) {
  return n;
}, wx = function(n) {
  return n * n;
}, Tx = function(n) {
  return n * (2 - n);
}, xx = function(n) {
  return n < 0.5 ? 2 * n * n : -1 + (4 - 2 * n) * n;
}, zx = function(n) {
  return n * n * n;
}, Ax = function(n) {
  return --n * n * n + 1;
}, Nx = function(n) {
  return n < 0.5 ? 4 * n * n * n : (n - 1) * (2 * n - 2) * (2 * n - 2) + 1;
}, Cx = function(n) {
  return n * n * n * n;
}, Ox = function(n) {
  return 1 - --n * n * n * n;
}, Mx = function(n) {
  return n < 0.5 ? 8 * n * n * n * n : 1 - 8 * --n * n * n * n;
}, Rx = function(n) {
  return n * n * n * n * n;
}, Dx = function(n) {
  return 1 + --n * n * n * n * n;
}, jx = function(n) {
  return n < 0.5 ? 16 * n * n * n * n * n : 1 + 16 * --n * n * n * n * n;
}, Rh = {
  easeOut: kx,
  linear: Ex,
  easeInQuad: wx,
  easeOutQuad: Tx,
  easeInOutQuad: xx,
  easeInCubic: zx,
  easeOutCubic: Ax,
  easeInOutCubic: Nx,
  easeInQuart: Cx,
  easeOutQuart: Ox,
  easeInOutQuart: Mx,
  easeInQuint: Rx,
  easeOutQuint: Dx,
  easeInOutQuint: jx
}, Dh = function(n) {
  typeof n == "number" && cancelAnimationFrame(n);
}, vn = function(n) {
  n.mounted && (Dh(n.animation), n.isAnimating = !1, n.animation = null, n.velocity = null);
};
function jh(n, i, o, l) {
  if (n.mounted) {
    var s = (/* @__PURE__ */ new Date()).getTime(), d = 1;
    vn(n), n.animation = function() {
      if (!n.mounted)
        return Dh(n.animation);
      var m = (/* @__PURE__ */ new Date()).getTime() - s, f = m / o, p = Rh[i], _ = p(f);
      m >= o ? (l(d), n.animation = null) : n.animation && (l(_), requestAnimationFrame(n.animation));
    }, requestAnimationFrame(n.animation);
  }
}
function Lx(n) {
  var i = n.scale, o = n.positionX, l = n.positionY;
  return !(Number.isNaN(i) || Number.isNaN(o) || Number.isNaN(l));
}
function Ta(n, i, o, l) {
  var s = Lx(i);
  if (!(!n.mounted || !s)) {
    var d = n.setState, m = n.state, f = m.scale, p = m.positionX, _ = m.positionY, v = i.scale - f, y = i.positionX - p, S = i.positionY - _;
    o === 0 ? d(i.scale, i.positionX, i.positionY) : jh(n, l, o, function(k) {
      k !== 1 ? n.isAnimating = !0 : n.isAnimating = !1;
      var E = f + v * k, z = p + y * k, R = _ + S * k;
      d(E, z, R);
    });
  }
}
function Ux(n, i, o) {
  var l = n.offsetWidth, s = n.offsetHeight, d = i.offsetWidth, m = i.offsetHeight, f = d * o, p = m * o, _ = l - f, v = s - p;
  return {
    wrapperWidth: l,
    wrapperHeight: s,
    newContentWidth: f,
    newDiffWidth: _,
    newContentHeight: p,
    newDiffHeight: v
  };
}
var Yx = function(n, i, o, l, s, d, m) {
  var f = n > i ? o * (m ? 0.5 : 1) : 0, p = l > s ? d * (m ? 0.5 : 1) : 0, _ = n - i - f, v = f, y = l - s - p, S = p;
  return {
    minPositionX: _,
    maxPositionX: v,
    minPositionY: y,
    maxPositionY: S,
    scaleWidthFactor: f,
    scaleHeightFactor: p
  };
}, vd = function(n, i) {
  var o = n.wrapperComponent, l = n.contentComponent, s = n.setup, d = s.centerZoomedOut, m = s.disablePadding;
  if (!o || !l)
    throw new Error("Components are not mounted");
  var f = Ux(o, l, i), p = f.wrapperWidth, _ = f.wrapperHeight, v = f.newContentWidth, y = f.newContentHeight, S = f.newDiffWidth, k = f.newDiffHeight, E = Yx(p, v, S, _, y, k, !!d), z = p >= v && _ >= y;
  m && z && !d && (E.minPositionX = 0, E.maxPositionX = 0, E.minPositionY = 0, E.maxPositionY = 0);
  var R = n.setup, D = R.minPositionX, Y = R.maxPositionX, L = R.minPositionY, H = R.maxPositionY;
  return D != null && (E.minPositionX = p * (1 - i) + D * i), Y != null && (E.maxPositionX = Y * i), L != null && (E.minPositionY = _ * (1 - i) + L * i), H != null && (E.maxPositionY = H * i), E;
}, Vo = function(n, i, o, l) {
  return l ? n < i ? $a(i, 2) : n > o ? $a(o, 2) : $a(n, 2) : $a(n, 2);
}, Zi = function(n, i) {
  var o = vd(n, i);
  return n.bounds = o, o;
};
function Fo(n, i, o, l, s, d, m) {
  var f = o.minPositionX, p = o.minPositionY, _ = o.maxPositionX, v = o.maxPositionY, y = 0, S = 0;
  m && (y = s, S = d);
  var k = Vo(n, f - y, _ + y, l), E = Vo(i, p - S, v + S, l);
  return { x: k, y: E };
}
function $l(n, i, o, l, s, d) {
  var m = n.state, f = m.scale, p = m.positionX, _ = m.positionY, v = l - f;
  if (typeof i != "number" || typeof o != "number")
    return console.error("Mouse X and Y position were not provided!"), { x: p, y: _ };
  var y = p - i * v, S = _ - o * v, k = Fo(y, S, s, d, 0, 0, null);
  return k;
}
var hg = 1e-7;
function Qo(n, i, o, l, s) {
  var d = s ? l : 0, m = Math.max(i - d, hg), f = o + d;
  return !Number.isNaN(o) && n >= f ? f : !Number.isNaN(i) && n <= m ? m : Math.max(n, hg);
}
var vg = function(n, i) {
  var o = n.setup.panning.excluded, l = n.isInitialized, s = n.wrapperComponent, d = i.target, m = "shadowRoot" in d && "composedPath" in i, f = m ? i.composedPath().some(function(v) {
    return v instanceof Element ? s?.contains(v) : !1;
  }) : s?.contains(d), p = l && d && f;
  if (!p)
    return !1;
  var _ = Jo(d, o);
  return !(_ || d.getAttribute("draggable") === "true" || d.getAttribute("contenteditable") === "true" || d.isContentEditable);
}, yg = function(n) {
  var i = n.isInitialized, o = n.isPanning, l = n.setup, s = l.panning.disabled, d = i && o && !s;
  return !!d;
}, Hx = function(n, i) {
  var o = n.state, l = o.positionX, s = o.positionY;
  n.isPanning = !0;
  var d = i.clientX, m = i.clientY;
  n.startCoords = { x: d - l, y: m - s };
}, Zx = function(n, i) {
  var o = i.touches, l = n.state, s = l.positionX, d = l.positionY;
  n.isPanning = !0;
  var m = o.length === 1;
  if (m) {
    var f = o[0].clientX, p = o[0].clientY;
    n.startCoords = { x: f - s, y: p - d };
  }
};
function Bx(n) {
  var i = n.state, o = i.positionX, l = i.positionY, s = i.scale, d = n.setup, m = d.disabled, f = d.limitToBounds, p = d.centerZoomedOut, _ = n.wrapperComponent;
  if (!(m || !_ || !n.bounds)) {
    var v = n.bounds, y = v.maxPositionX, S = v.minPositionX, k = v.maxPositionY, E = v.minPositionY, z = o > y || o < S, R = l > k || l < E, D = o > y ? _.offsetWidth : n.setup.minPositionX || 0, Y = l > k ? _.offsetHeight : n.setup.minPositionY || 0, L = $l(n, D, Y, s, n.bounds, f || p), H = L.x, X = L.y;
    return {
      scale: s,
      positionX: z ? H : o,
      positionY: R ? X : l
    };
  }
}
function Lh(n, i, o, l, s) {
  var d = n.setup.limitToBounds, m = n.wrapperComponent, f = n.bounds, p = n.state, _ = p.scale, v = p.positionX, y = p.positionY;
  if (!(m === null || f === null || i === v && o === y)) {
    var S = Fo(i, o, f, d, l, s, m), k = S.x, E = S.y;
    n.setState(_, k, E);
  }
}
var Gx = function(n, i, o) {
  var l = n.startCoords, s = n.state, d = n.setup.panning, m = d.lockAxisX, f = d.lockAxisY, p = s.positionX, _ = s.positionY;
  if (!l)
    return { x: p, y: _ };
  var v = i - l.x, y = o - l.y, S = m ? p : v, k = f ? _ : y;
  return { x: S, y: k };
}, ka = function(n, i, o) {
  var l = n.setup, s = n.state, d = l.minScale, m = l.disablePadding, f = l.centerZoomedOut, p = o ?? s.scale;
  return i > 0 && p >= d && !m && !f ? i : 0;
}, ya;
(function(n) {
  n.TRACK_PAD = "track_pad", n.MOUSE = "mouse", n.TOUCH = "touch";
})(ya || (ya = {}));
var Kx = function(n) {
  var i = n.mounted, o = n.wrapperComponent, l = n.contentComponent, s = n.setup, d = s.disabled, m = s.velocityAnimation, f = s.limitToBounds, p = n.state.scale, _ = m.disabled;
  if (_ || d || !i || !o || !l)
    return !1;
  if (!f)
    return !0;
  var v = o.offsetWidth < l.offsetWidth * p || o.offsetHeight < l.offsetHeight * p;
  return v;
}, qx = function(n) {
  var i = n.mounted, o = n.velocity, l = n.bounds, s = n.setup, d = s.disabled, m = s.velocityAnimation, f = m.disabled, p = !f && !d && i;
  return !(!p || !o || !l);
};
function Vx(n, i) {
  var o = n.setup.velocityAnimation, l = o.animationTime, s = o.maxAnimationTime, d = o.inertia;
  return Math.min(l * Math.max(1, Math.abs(i / d)), s);
}
function bg(n, i, o, l, s, d, m, f, p, _) {
  if (s) {
    if (i > m && o > m) {
      var v = m + (n - m) * _;
      return v > p ? p : v < m ? m : v;
    }
    if (i < d && o < d) {
      var v = d + (n - d) * _;
      return v < f ? f : v > d ? d : v;
    }
  }
  return l ? i : Vo(n, d, m, s);
}
function Xx(n) {
  var i = 1, o = n.offsetWidth / window.innerWidth;
  return Number.isNaN(o) ? i : Math.min(i, o);
}
var wu = function(n, i, o) {
  var l = 0, s = n * o;
  return Number.isNaN(s) ? l : n < 0 ? Math.max(s, -i) : Math.min(s, i);
};
function $x(n, i, o) {
  var l, s, d = Kx(n);
  if (d) {
    var m = n.lastMousePosition, f = n.velocityTime, p = n.setup, _ = n.wrapperComponent, v = p.velocityAnimation, y = v.maxStrengthMouse, S = v.maxStrengthTouch, k = v.sensitivityTouch, E = v.sensitivityMouse, z = Date.now();
    if (m && f && _) {
      var R = Xx(_), D = (l = {}, l[ya.TOUCH] = k, l[ya.MOUSE] = E, l)[o], Y = (s = {}, s[ya.TOUCH] = S, s[ya.MOUSE] = y, s)[o], L = i.x - m.x, H = i.y - m.y, X = wu(L / R, Y, D), ie = wu(H / R, Y, D), $ = z - f, V = L * L + H * H, F = wu(Math.sqrt(V) / $, Y, D);
      n.velocity = { velocityX: X, velocityY: ie, total: F };
    }
    n.lastMousePosition = i, n.velocityTime = z;
  }
}
function Px(n) {
  var i = n.velocity, o = n.bounds, l = n.setup, s = n.wrapperComponent, d = qx(n);
  if (!(!d || !i || !o || !s)) {
    var m = i.velocityX, f = i.velocityY, p = i.total, _ = o.maxPositionX, v = o.minPositionX, y = o.maxPositionY, S = o.minPositionY, k = l.limitToBounds, E = l.autoAlignment, z = l.zoomAnimation, R = l.panning, D = R.lockAxisY, Y = R.lockAxisX, L = z.animationType, H = E.sizeX, X = E.sizeY, ie = E.velocityAlignmentTime, $ = ie, V = Vx(n, p), F = Math.max(V, $), W = ka(n, H), ae = ka(n, X), ce = W * s.offsetWidth / 100, Q = ae * s.offsetHeight / 100, ee = _ + ce, J = v - ce, A = y + Q, I = S - Q, ne = n.state, ve = (/* @__PURE__ */ new Date()).getTime();
    jh(n, L, F, function(ge) {
      var T = n.state, Z = T.scale, P = T.positionX, te = T.positionY, me = (/* @__PURE__ */ new Date()).getTime() - ve, fe = me / $, ye = Rh[E.animationType], Ge = 1 - ye(Math.min(1, fe)), Ne = 1 - ge, vt = P + m * Ne, jt = te + f * Ne, Xt = bg(vt, ne.positionX, P, Y, k, v, _, J, ee, Ge), dn = bg(jt, ne.positionY, te, D, k, S, y, I, A, Ge);
      if (P !== vt || te !== jt) {
        n.setState(Z, Xt, dn);
        var ut = n.props.onPanning;
        ut && ut(Ae(n), {});
      }
    });
  }
}
function Sg(n, i) {
  var o = n.state, l = o.scale, s = o.positionX, d = o.positionY;
  n.panStartPosition = { x: s, y: d }, vn(n), Zi(n, l), window.TouchEvent !== void 0 && i instanceof TouchEvent ? Zx(n, i) : Hx(n, i);
}
function Uh(n, i) {
  var o = n.state.scale, l = n.setup, s = l.minScale, d = l.autoAlignment, m = d.disabled, f = d.sizeX, p = d.sizeY, _ = d.animationTime, v = d.animationType, y = m || o < s || !f && !p;
  if (!y) {
    var S = Bx(n);
    S && Ta(n, S, _, v);
  }
}
function kg(n, i, o, l) {
  var s = n.startCoords, d = n.setup, m = d.autoAlignment, f = m.sizeX, p = m.sizeY;
  if (s) {
    var _ = Gx(n, i, o), v = _.x, y = _.y, S = ka(n, f), k = ka(n, p);
    $x(n, { x: v, y }, l), Lh(n, v, y, S, k);
  }
}
function Ix(n, i) {
  if (n.isPanning) {
    var o = n.velocity, l = n.wrapperComponent, s = n.contentComponent;
    n.isPanning = !1;
    var d = n.state, m = d.positionX, f = d.positionY, p = d.scale, _ = n.panStartPosition;
    if (n.panStartPosition = null, _) {
      var v = m - _.x, y = f - _.y;
      if (v * v + y * y <= 25)
        return;
    }
    n.isAnimating = !1, n.animation = null;
    var S = l?.offsetWidth || 0, k = l?.offsetHeight || 0, E = (s?.offsetWidth || 0) * p, z = (s?.offsetHeight || 0) * p, R = !n.setup.limitToBounds || S < E || k < z, D = !i && o && o.total > 0.1 && R;
    D ? Px(n) : Uh(n);
  }
}
function yd(n, i, o, l) {
  var s = n.setup, d = s.minScale, m = s.maxScale, f = s.limitToBounds, p = Qo($a(i, 2), d, m, 0, !1), _ = Zi(n, p), v = $l(n, o, l, p, _, f), y = v.x, S = v.y;
  return { scale: p, positionX: y, positionY: S };
}
function bd(n, i, o) {
  var l = n.state.scale, s = n.wrapperComponent, d = n.setup, m = d.minScale, f = d.maxScale, p = d.limitToBounds, _ = d.zoomAnimation, v = _.disabled, y = _.animationTime, S = _.animationType, k = l >= m && l <= f, E = v || k;
  if ((l >= 1 || p) && Uh(n), !(E || !s || !n.mounted)) {
    var z = i || s.offsetWidth / 2, R = o || s.offsetHeight / 2, D = l < m ? m : f, Y = yd(n, D, z, R);
    Y && Ta(n, Y, y, S);
  }
}
var ln = function() {
  return ln = Object.assign || function(i) {
    for (var o, l = 1, s = arguments.length; l < s; l++) {
      o = arguments[l];
      for (var d in o) Object.prototype.hasOwnProperty.call(o, d) && (i[d] = o[d]);
    }
    return i;
  }, ln.apply(this, arguments);
};
function Eg(n, i, o) {
  for (var l = 0, s = i.length, d; l < s; l++)
    (d || !(l in i)) && (d || (d = Array.prototype.slice.call(i, 0, l)), d[l] = i[l]);
  return n.concat(d || Array.prototype.slice.call(i));
}
var Tu = {
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
}, Bu = {
  wrapperClass: "react-transform-wrapper",
  contentClass: "react-transform-component"
}, Yh = function(n) {
  var i, o, l, s, d, m, f, p, _, v = Math.max((i = n.minScale) !== null && i !== void 0 ? i : Xa.minScale, 1e-7), y = (o = n.maxScale) !== null && o !== void 0 ? o : Xa.maxScale, S = (l = n.initialScale) !== null && l !== void 0 ? l : Tu.scale, k = Math.min(Math.max(S, v), y), E = Vo((s = n.initialPositionX) !== null && s !== void 0 ? s : Tu.positionX, (d = n.minPositionX) !== null && d !== void 0 ? d : -1 / 0, (m = n.maxPositionX) !== null && m !== void 0 ? m : 1 / 0, n.minPositionX != null || n.maxPositionX != null), z = Vo((f = n.initialPositionY) !== null && f !== void 0 ? f : Tu.positionY, (p = n.minPositionY) !== null && p !== void 0 ? p : -1 / 0, (_ = n.maxPositionY) !== null && _ !== void 0 ? _ : 1 / 0, n.minPositionY != null || n.maxPositionY != null);
  return {
    previousScale: k,
    scale: k,
    positionX: E,
    positionY: z
  };
}, wg = function(n) {
  var i = ln({}, Xa);
  return Object.keys(n).forEach(function(o) {
    var l = o, s = typeof n[l] < "u", d = typeof Xa[l] < "u";
    if (d && s) {
      var m = Object.prototype.toString.call(Xa[l]), f = m === "[object Object]", p = m === "[object Array]";
      f ? i[l] = ln(ln({}, Xa[l]), n[l]) : p ? i[l] = Eg(Eg([], Xa[l], !0), n[l]) : i[l] = n[l];
    }
  }), i.minScale <= 0 && (i.minScale = 1e-7), i;
}, Hh = function(n, i, o) {
  var l = n.state.scale, s = n.wrapperComponent, d = n.setup, m = d.maxScale, f = d.minScale, p = d.zoomAnimation, _ = d.smooth, v = p.size;
  if (!s)
    throw new Error("Wrapper is not mounted");
  var y = _ ? l * Math.exp(i * o) : l + i * o, S = Qo($a(y, 3), f, m, v, !1);
  return S;
};
function Zh(n, i, o, l, s) {
  var d, m, f = n.wrapperComponent, p = n.state, _ = p.scale, v = p.positionX, y = p.positionY, S = n.setup.zoomAnimation;
  if (!f)
    return console.error("No WrapperComponent found");
  var k = S.disabled ? 0 : l, E = f.offsetWidth, z = f.offsetHeight, R = (E / 2 - v) / _, D = (z / 2 - y) / _, Y = Hh(n, i, o), L = yd(n, Y, R, D);
  if (!L)
    return console.error("Error during zoom event. New transformation state was not calculated.");
  var H = n.props, X = H.onZoomStart, ie = H.onZoom, $ = H.onZoomStop, V = new MouseEvent("mousemove", { bubbles: !0 }), F = Ae(n);
  Me(F, V, X), Me(F, V, ie), Ta(n, L, k, s);
  var W = (m = (d = f.ownerDocument) === null || d === void 0 ? void 0 : d.defaultView) !== null && m !== void 0 ? m : typeof window < "u" ? window : null;
  W && W.setTimeout(function() {
    n.mounted && Me(Ae(n), V, $);
  }, k);
}
function Bh(n, i, o, l) {
  var s, d, m = n.setup, f = n.wrapperComponent, p = n.contentComponent, _ = m.limitToBounds, v = m.centerOnInit, y = Yh(n.props), S = n.state, k = S.scale, E = S.positionX, z = S.positionY;
  if (f) {
    var R = y.positionX, D = y.positionY;
    if (v && p) {
      var Y = Sd(y.scale, f, p);
      R = Y.positionX, D = Y.positionY;
    }
    var L = vd(n, y.scale), H = Fo(R, D, L, _, 0, 0, f), X = {
      scale: y.scale,
      positionX: H.x,
      positionY: H.y
    };
    if (!(k === y.scale && E === y.positionX && z === y.positionY)) {
      l?.();
      var ie = n.props, $ = ie.onZoomStart, V = ie.onZoom, F = ie.onZoomStop, W = new MouseEvent("mousemove", { bubbles: !0 }), ae = Ae(n);
      Me(ae, W, $), Me(ae, W, V), Ta(n, X, i, o);
      var ce = (d = (s = f.ownerDocument) === null || s === void 0 ? void 0 : s.defaultView) !== null && d !== void 0 ? d : typeof window < "u" ? window : null;
      ce && ce.setTimeout(function() {
        n.mounted && Me(Ae(n), W, F);
      }, i);
    }
  }
}
function Fx(n, i, o, l) {
  var s = n.getBoundingClientRect(), d = i.getBoundingClientRect(), m = o.getBoundingClientRect(), f = d.x * l.scale, p = d.y * l.scale;
  return {
    x: (s.x - m.x + f) / l.scale,
    y: (s.y - m.y + p) / l.scale
  };
}
function Qx(n, i, o, l, s) {
  l === void 0 && (l = 0), s === void 0 && (s = 0);
  var d = n.wrapperComponent, m = n.contentComponent, f = n.state, p = n.setup, _ = p.limitToBounds, v = p.minScale, y = p.maxScale;
  if (!d || !m)
    return f;
  var S = d.getBoundingClientRect(), k = i.getBoundingClientRect(), E = Fx(i, d, m, f), z = E.x, R = E.y, D = k.width / f.scale, Y = k.height / f.scale, L = d.offsetWidth / D, H = d.offsetHeight / Y, X = Qo(o || Math.min(L, H), v, y, 0, !1), ie = (S.width - D * X) / 2, $ = (S.height - Y * X) / 2, V = (S.left - z) * X + ie + l, F = (S.top - R) * X + $ + s, W = vd(n, X), ae = Fo(V, F, W, _, 0, 0, d), ce = ae.x, Q = ae.y;
  return { positionX: ce, positionY: Q, scale: X };
}
var Jx = function(n) {
  return function(i, o, l) {
    i === void 0 && (i = 0.5), o === void 0 && (o = 300), l === void 0 && (l = "easeOut"), Zh(n, 1, i, o, l);
  };
}, Wx = function(n) {
  return function(i, o, l) {
    i === void 0 && (i = 0.5), o === void 0 && (o = 300), l === void 0 && (l = "easeOut"), Zh(n, -1, i, o, l);
  };
}, e5 = function(n) {
  return function(i, o, l, s, d) {
    s === void 0 && (s = 300), d === void 0 && (d = "easeOut");
    var m = n.state, f = m.positionX, p = m.positionY, _ = m.scale, v = n.wrapperComponent, y = n.contentComponent, S = n.setup.disabled;
    if (!(S || !v || !y)) {
      var k = {
        positionX: Number.isNaN(i) ? f : i,
        positionY: Number.isNaN(o) ? p : o,
        scale: Number.isNaN(l) ? _ : l
      };
      Ta(n, k, s, d);
    }
  };
}, t5 = function(n) {
  return function(i, o) {
    i === void 0 && (i = 200), o === void 0 && (o = "easeOut"), Bh(n, i, o);
  };
}, n5 = function(n) {
  return function(i, o, l) {
    o === void 0 && (o = 200), l === void 0 && (l = "easeOut");
    var s = n.state, d = n.wrapperComponent, m = n.contentComponent;
    if (d && m) {
      var f = Sd(i || s.scale, d, m);
      Ta(n, f, o, l);
    }
  };
}, a5 = function(n) {
  return function(i, o, l, s, d, m) {
    l === void 0 && (l = 600), s === void 0 && (s = "easeOut"), d === void 0 && (d = 0), m === void 0 && (m = 0), vn(n);
    var f = n.wrapperComponent, p = typeof i == "string" ? document.getElementById(i) : i;
    if (f && p && f.contains(p)) {
      var _ = Qx(n, p, o, d, m);
      Ta(n, _, l, s);
    }
  };
}, Zl = function(n) {
  return {
    instance: n,
    state: n.state,
    zoomIn: Jx(n),
    zoomOut: Wx(n),
    setTransform: e5(n),
    resetTransform: t5(n),
    centerView: n5(n),
    zoomToElement: a5(n)
  };
}, Gh = function(n) {
  return {
    instance: n,
    state: n.state
  };
}, Ae = function(n) {
  var i = {};
  return Object.assign(i, Gh(n)), Object.assign(i, Zl(n)), i;
}, xu = !1;
function zu() {
  try {
    var n = {
      get passive() {
        return xu = !0, !1;
      }
    };
    return n;
  } catch {
    return xu = !1, xu;
  }
}
var Nl = ".".concat(Bu.wrapperClass), Jo = function(n, i) {
  return i.some(function(o) {
    return n.matches("".concat(Nl, " ").concat(o, ", ").concat(Nl, " .").concat(o, ", ").concat(Nl, " ").concat(o, " *, ").concat(Nl, " .").concat(o, " *"));
  });
}, Xo = function(n) {
  n && clearTimeout(n);
}, i5 = function(n) {
  return Number.parseFloat(n.toFixed(8));
}, Kh = function(n, i, o) {
  var l = i5(o);
  return "translate(".concat(n, "px, ").concat(i, "px) scale(").concat(l, ")");
}, Sd = function(n, i, o) {
  var l = o.offsetWidth * n, s = o.offsetHeight * n, d = (i.offsetWidth - l) / 2, m = (i.offsetHeight - s) / 2;
  return {
    scale: n,
    positionX: d,
    positionY: m
  };
};
function o5(n, i) {
  n != null && (typeof n == "function" ? n(i) : n.current = i);
}
function r5(n) {
  return function(i) {
    n.forEach(function(o) {
      typeof o == "function" ? o(i) : o != null && (o.current = i);
    });
  };
}
var qh = function(n, i) {
  var o = n.setup.wheel, l = o.disabled, s = o.wheelDisabled, d = o.touchPadDisabled, m = o.excluded, f = n.isInitialized, p = n.isPanning, _ = i.target, v = f && !p && !l && _;
  if (!v || s && !i.ctrlKey || d && i.ctrlKey)
    return !1;
  var y = Jo(_, m);
  if (y)
    return !1;
  var S = n.isPressingKeys(n.setup.wheel.activationKeys);
  return !!S;
}, l5 = function(n, i) {
  var o = n.setup, l = o.disabled, s = o.trackPadPanning, d = s.activationKeys, m = s.excluded;
  if (!n.wrapperComponent || !n.contentComponent || l || s.disabled || i.ctrlKey)
    return !1;
  var f = qh(n, i);
  if (f)
    return !1;
  var p = i.target, _ = Jo(p, m);
  if (_)
    return !1;
  var v = n.isPressingKeys(d);
  return !!v;
}, s5 = function(n) {
  return n ? n.deltaY < 0 ? 1 : -1 : 0;
};
function c5(n, i) {
  var o = s5(n), l = Sx(i, o);
  return l;
}
function Vh(n, i, o) {
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
var u5 = function(n, i, o, l, s) {
  var d = n.state.scale, m = n.wrapperComponent, f = n.setup, p = f.maxScale, _ = f.minScale, v = f.zoomAnimation, y = f.disablePadding, S = v.size, k = v.disabled;
  if (!m)
    throw new Error("Wrapper is not mounted");
  var E = d + i * o, z = l ? !1 : !k, R = Qo(E, _, p, S, z && !y);
  return R;
}, Xh = function(n, i) {
  var o = n.previousWheelEvent, l = n.state.scale, s = n.setup, d = s.maxScale, m = s.minScale;
  return o ? l < d || l > m || Math.sign(o.deltaY) !== Math.sign(i.deltaY) || o.deltaY > 0 && o.deltaY < i.deltaY || o.deltaY < 0 && o.deltaY > i.deltaY || Math.sign(o.deltaY) !== Math.sign(i.deltaY) : !1;
}, d5 = function(n, i) {
  var o = n.setup.pinch, l = o.disabled, s = o.excluded, d = n.isInitialized, m = i.target, f = d && !l && m;
  if (!f)
    return !1;
  var p = Jo(m, s);
  return !p;
}, m5 = function(n) {
  var i = n.setup.pinch.disabled, o = n.isInitialized, l = n.pinchStartDistance, s = o && !i && l !== null;
  return !!s;
}, f5 = function(n, i, o) {
  var l = o.getBoundingClientRect(), s = n.touches, d = s[0].clientX - l.left, m = s[0].clientY - l.top, f = s[1].clientX - l.left, p = s[1].clientY - l.top;
  return {
    x: (d + f) / 2 / i,
    y: (m + p) / 2 / i
  };
}, $h = function(n) {
  return Math.sqrt(Math.pow(n.touches[0].pageX - n.touches[1].pageX, 2) + Math.pow(n.touches[0].pageY - n.touches[1].pageY, 2));
}, _5 = 5, p5 = function(n, i) {
  var o = n.pinchStartScale, l = n.pinchStartDistance, s = n.setup, d = s.maxScale, m = s.minScale, f = s.zoomAnimation, p = s.disablePadding, _ = s.pinch, v = f.size, y = f.disabled, S = _.step;
  if (!o || l === null)
    throw new Error("Pinch touches distance was not provided");
  if (i < 0)
    return n.state.scale;
  var k = i / l, E = k * o, z = (E - o) * (S / _5), R = o + z, D = R === 1 / 0 ? 0 : $a(R, 10);
  return Qo(D, m, d, v, !y && !p);
}, Ph = 160, Ih = 100, g5 = function(n, i) {
  var o = n.props, l = o.onWheelStart, s = o.onZoomStart;
  n.wheelStopEventTimer || (vn(n), Me(Ae(n), i, l), Me(Ae(n), i, s));
}, h5 = function(n, i) {
  var o = n.props, l = o.onWheel, s = o.onZoom, d = n.contentComponent, m = n.setup, f = n.state, p = f.scale, _ = m.limitToBounds, v = m.centerZoomedOut, y = m.zoomAnimation, S = m.wheel, k = m.disablePadding, E = m.smooth, z = y.size, R = y.disabled, D = S.step;
  if (!d)
    throw new Error("Component not mounted");
  i.preventDefault(), i.stopPropagation();
  var Y = c5(i, null), L = E ? D * Math.abs(i.deltaY) : D, H = u5(n, Y, L, !i.ctrlKey);
  if (p !== H) {
    var X = Zi(n, H), ie = Vh(i, d, p), $ = R || z === 0 || v || k, V = _ && $, F = $l(n, ie.x, ie.y, H, X, V), W = F.x, ae = F.y;
    n.previousWheelEvent = i, n.setState(H, W, ae), Me(Ae(n), i, l), Me(Ae(n), i, s);
  }
}, v5 = function(n, i) {
  var o = n.props, l = o.onWheelStop, s = o.onZoomStop;
  Xo(n.wheelAnimationTimer), n.wheelAnimationTimer = setTimeout(function() {
    n.mounted && (bd(n, i.x, i.y), n.wheelAnimationTimer = null);
  }, Ih);
  var d = Xh(n, i);
  d && (Xo(n.wheelStopEventTimer), n.wheelStopEventTimer = setTimeout(function() {
    n.mounted && (n.wheelStopEventTimer = null, Me(Ae(n), i, l), Me(Ae(n), i, s));
  }, Ph));
}, y5 = function(n, i) {
  var o = n.props, l = o.onWheelStart, s = o.onPanningStart;
  n.wheelStopEventTimer || (vn(n), Me(Ae(n), i, l), Me(Ae(n), i, s));
}, b5 = function(n, i) {
  var o = n.props, l = o.onWheelStop, s = o.onPanningStop;
  Xo(n.wheelAnimationTimer), n.wheelAnimationTimer = setTimeout(function() {
    n.mounted && (bd(n, i.x, i.y), n.wheelAnimationTimer = null);
  }, Ih);
  var d = Xh(n, i);
  d && (Xo(n.wheelStopEventTimer), n.wheelStopEventTimer = setTimeout(function() {
    n.mounted && (n.wheelStopEventTimer = null, Me(Ae(n), i, l), Me(Ae(n), i, s));
  }, Ph));
}, Fh = function(n) {
  for (var i = 0, o = 0, l = 0; l < 2; l += 1)
    i += n.touches[l].clientX, o += n.touches[l].clientY;
  var s = i / 2, d = o / 2;
  return { x: s, y: d };
}, S5 = function(n, i) {
  var o = $h(i);
  n.pinchStartDistance = o, n.lastDistance = o, n.pinchStartScale = n.state.scale, n.isPanning = !1, n.isPinching = !0, n.pinchPreviousCenter = Fh(i), vn(n);
}, k5 = function(n, i) {
  var o = n.contentComponent, l = n.pinchStartDistance, s = n.wrapperComponent, d = n.pinchPreviousCenter, m = n.state.scale, f = n.setup, p = f.limitToBounds, _ = f.centerZoomedOut, v = f.zoomAnimation, y = f.autoAlignment, S = f.pinch, k = f.panning, E = v.disabled, z = v.size, R = S.allowPanning;
  if (!(l === null || !o)) {
    var D = f5(i, m, o);
    if (!(!Number.isFinite(D.x) || !Number.isFinite(D.y))) {
      var Y = $h(i), L = p5(n, Y), H = Fh(i), X = m / L, ie = (H.x - (d?.x || 0)) * X, $ = (H.y - (d?.y || 0)) * X;
      if (!(L === m && ie === 0 && $ === 0)) {
        n.pinchPreviousCenter = H;
        var V = Zi(n, L), F = E || z === 0 || _, W = p && F, ae = $l(n, D.x, D.y, L, V, W), ce = ae.x, Q = ae.y;
        if (n.pinchMidpoint = D, n.lastDistance = Y, k.disabled || !R)
          n.setState(L, ce, Q);
        else {
          var ee = y.sizeX, J = y.sizeY, A = ka(n, ee, L), I = ka(n, J, L), ne = ce + ie, ve = Q + $, ge = Fo(ne, ve, V, p, A, I, s), T = ge.x, Z = ge.y;
          n.setState(L, T, Z);
        }
      }
    }
  }
}, E5 = function(n) {
  var i = n.pinchMidpoint;
  n.velocity = null, n.lastDistance = null, n.pinchMidpoint = null, n.pinchStartScale = null, n.pinchStartDistance = null, n.isPinching = !1, bd(n, i?.x, i?.y);
}, Qh = function(n, i) {
  var o = n.props.onZoomStop, l = n.setup.doubleClick.animationTime;
  Xo(n.doubleClickStopEventTimer), n.doubleClickStopEventTimer = setTimeout(function() {
    n.doubleClickStopEventTimer = null, Me(Ae(n), i, o);
  }, l);
}, w5 = function(n, i) {
  var o = n.props, l = o.onZoomStart, s = o.onZoom, d = n.setup.doubleClick, m = d.animationTime, f = d.animationType;
  Me(Ae(n), i, l), Bh(n, m, f, function() {
    return Me(Ae(n), i, s);
  }), Qh(n, i);
};
function T5(n, i) {
  return n === "toggle" ? i === 1 ? 1 : -1 : n === "zoomOut" ? -1 : 1;
}
function x5(n, i) {
  var o = n.setup, l = n.doubleClickStopEventTimer, s = n.state, d = n.contentComponent, m = s.scale, f = n.props, p = f.onZoomStart, _ = f.onZoom, v = o.doubleClick, y = v.disabled, S = v.mode, k = v.step, E = v.animationTime, z = v.animationType;
  if (!y && !l) {
    if (S === "reset")
      return w5(n, i);
    if (!d)
      return console.error("No ContentComponent found");
    var R = T5(S, n.state.scale), D = Hh(n, R, k);
    if (m !== D) {
      Me(Ae(n), i, p);
      var Y = Vh(i, d, m), L = yd(n, D, Y.x, Y.y);
      if (!L)
        return console.error("Error during zoom event. New transformation state was not calculated.");
      Me(Ae(n), i, _), Ta(n, L, E, z), Qh(n, i);
    }
  }
}
var z5 = function(n, i) {
  var o = n.isInitialized, l = n.setup, s = n.wrapperComponent, d = l.doubleClick, m = d.disabled, f = d.excluded, p = i.target, _ = s?.contains(p), v = o && p && _ && !m;
  if (!v)
    return !1;
  var y = Jo(p, f);
  return !y;
}, A5 = (
  /** @class */
  /* @__PURE__ */ (function() {
    function n(i) {
      var o = this;
      this.mounted = !0, this.onChangeCallbacks = /* @__PURE__ */ new Set(), this.onInitCallbacks = /* @__PURE__ */ new Set(), this.onTransformCallbacks = /* @__PURE__ */ new Set(), this.wrapperComponent = null, this.contentComponent = null, this.isInitialized = !1, this.bounds = null, this.previousWheelEvent = null, this.wheelStopEventTimer = null, this.wheelAnimationTimer = null, this.isPanning = !1, this.isWheelPanning = !1, this.startCoords = null, this.panStartPosition = null, this.lastTouch = null, this.isPinching = !1, this.distance = null, this.lastDistance = null, this.pinchStartDistance = null, this.pinchStartScale = null, this.pinchMidpoint = null, this.pinchPreviousCenter = null, this.doubleClickStopEventTimer = null, this.velocity = null, this.velocityTime = null, this.lastMousePosition = null, this.isAnimating = !1, this.animation = null, this.pressedKeys = {}, this.mount = function() {
        o.initializeWindowEvents();
      }, this.unmount = function() {
        o.cleanupWindowEvents();
      }, this.update = function(l) {
        o.props = l, o.wrapperComponent && o.contentComponent && Zi(o, o.state.scale), o.setup = wg(l);
      }, this.initializeWindowEvents = function() {
        var l, s, d, m, f = zu(), p = (l = o.wrapperComponent) === null || l === void 0 ? void 0 : l.ownerDocument, _ = p?.defaultView;
        (s = o.wrapperComponent) === null || s === void 0 || s.addEventListener("wheel", o.onWheelPanning, f), (d = o.wrapperComponent) === null || d === void 0 || d.addEventListener("keyup", o.setKeyUnPressed, f), (m = o.wrapperComponent) === null || m === void 0 || m.addEventListener("keydown", o.setKeyPressed, f), _?.addEventListener("mousedown", o.onPanningStart, f), _?.addEventListener("mousemove", o.onPanning, f), _?.addEventListener("mouseup", o.onPanningStop, f), p?.addEventListener("mouseleave", o.clearPanning, f), _?.addEventListener("keyup", o.setKeyUnPressed, f), _?.addEventListener("keydown", o.setKeyPressed, f), _?.addEventListener("blur", o.handleWindowBlur);
      }, this.cleanupWindowEvents = function() {
        var l, s, d, m, f, p = zu(), _ = (l = o.wrapperComponent) === null || l === void 0 ? void 0 : l.ownerDocument, v = _?.defaultView;
        v?.removeEventListener("mousedown", o.onPanningStart, p), v?.removeEventListener("mousemove", o.onPanning, p), v?.removeEventListener("mouseup", o.onPanningStop, p), _?.removeEventListener("mouseleave", o.clearPanning, p), v?.removeEventListener("keyup", o.setKeyUnPressed, p), v?.removeEventListener("keydown", o.setKeyPressed, p), v?.removeEventListener("blur", o.handleWindowBlur), document.removeEventListener("mouseleave", o.clearPanning, p), (s = o.wrapperComponent) === null || s === void 0 || s.removeEventListener("wheel", o.onWheelPanning, p), (d = o.wrapperComponent) === null || d === void 0 || d.removeEventListener("keyup", o.setKeyUnPressed, p), (m = o.wrapperComponent) === null || m === void 0 || m.removeEventListener("keydown", o.setKeyPressed, p), vn(o), (f = o.observer) === null || f === void 0 || f.disconnect();
      }, this.handleInitializeWrapperEvents = function(l) {
        var s = zu();
        l.addEventListener("wheel", o.onWheelZoom, s), l.addEventListener("dblclick", o.onDoubleClick, s), l.addEventListener("touchstart", o.onTouchPanningStart, s), l.addEventListener("touchmove", o.onTouchPanning, s), l.addEventListener("touchend", o.onTouchPanningStop, s);
      }, this.handleInitialize = function(l) {
        var s = o.setup.centerOnInit;
        o.applyTransformation(), o.onInitCallbacks.forEach(function(d) {
          return d(Ae(o));
        }), s && (o.setCenter(), o.observer = new ResizeObserver(function() {
          var d, m = l.offsetWidth, f = l.offsetHeight;
          (m > 0 || f > 0) && (o.onInitCallbacks.forEach(function(p) {
            return p(Ae(o));
          }), o.setCenter(), (d = o.observer) === null || d === void 0 || d.disconnect());
        }), setTimeout(function() {
          var d;
          (d = o.observer) === null || d === void 0 || d.disconnect();
        }, 5e3), o.observer.observe(l));
      }, this.onWheelZoom = function(l) {
        var s = o.setup.disabled;
        if (!s) {
          o.syncModifierKeys(l);
          var d = qh(o, l);
          d && (g5(o, l), h5(o, l), v5(o, l));
        }
      }, this.onWheelPanning = function(l) {
        var s = o.props.onPanning, d = o.setup.trackPadPanning, m = d.lockAxisX, f = d.lockAxisY;
        o.syncModifierKeys(l);
        var p = l5(o, l);
        if (p) {
          l.preventDefault(), l.stopPropagation();
          var _ = o.state, v = _.positionX, y = _.positionY, S = v - l.deltaX, k = y - l.deltaY, E = m ? v : S, z = f ? y : k, R = o.setup.autoAlignment, D = R.sizeX, Y = R.sizeY, L = ka(o, D), H = ka(o, Y);
          E === v && z === y || (y5(o, l), Lh(o, E, z, L, H), Me(Ae(o), l, s), b5(o, l));
        }
      }, this.onPanningStart = function(l) {
        var s = o.setup.disabled, d = o.props.onPanningStart;
        if (!s) {
          o.syncModifierKeys(l);
          var m = vg(o, l);
          if (m) {
            var f = o.isPressingKeys(o.setup.panning.activationKeys);
            f && (l.button === 0 && !o.setup.panning.allowLeftClickPan || l.button === 1 && !o.setup.panning.allowMiddleClickPan || l.button === 2 && !o.setup.panning.allowRightClickPan || (l.preventDefault(), l.stopPropagation(), vn(o), Sg(o, l), Me(Ae(o), l, d)));
          }
        }
      }, this.onPanning = function(l) {
        var s = o.setup.disabled, d = o.props.onPanning;
        if (!s) {
          if (o.syncModifierKeys(l), o.isPanning && l.buttons === 0) {
            o.clearPanning(l);
            return;
          }
          var m = yg(o);
          if (m) {
            var f = o.isPressingKeys(o.setup.panning.activationKeys);
            f && (l.preventDefault(), l.stopPropagation(), kg(o, l.clientX, l.clientY, ya.MOUSE), Me(Ae(o), l, d));
          }
        }
      }, this.onPanningStop = function(l) {
        var s = o.setup.panning.velocityDisabled, d = o.props.onPanningStop;
        o.isPanning && (Ix(o, s), Me(Ae(o), l, d));
      }, this.onPinchStart = function(l) {
        var s = o.setup.disabled, d = o.props.onPinchStart;
        if (!s) {
          var m = d5(o, l);
          m && (S5(o, l), vn(o), Me(Ae(o), l, d));
        }
      }, this.onPinch = function(l) {
        var s = o.setup.disabled, d = o.props.onPinch;
        if (!s) {
          var m = m5(o);
          m && (l.preventDefault(), l.stopPropagation(), k5(o, l), Me(Ae(o), l, d));
        }
      }, this.onPinchStop = function(l) {
        var s = o.props.onPinchStop;
        o.pinchStartScale && (E5(o), Me(Ae(o), l, s));
      }, this.onTouchPanningStart = function(l) {
        var s = o.setup, d = s.disabled, m = s.doubleClick, f = o.props.onPanningStart;
        if (!d) {
          var p = !m?.disabled, _ = o.lastTouch && +/* @__PURE__ */ new Date() - o.lastTouch < 200;
          if (p && _ && l.touches.length === 1)
            o.onDoubleClick(l);
          else {
            o.lastTouch = +/* @__PURE__ */ new Date(), vn(o);
            var v = l.touches, y = v.length === 1, S = v.length === 2, k = vg(o, l);
            if (y) {
              if (!k)
                return;
              vn(o), Sg(o, l), Me(Ae(o), l, f);
            }
            S && o.onPinchStart(l);
          }
        }
      }, this.onTouchPanning = function(l) {
        var s = o.setup.disabled, d = o.props.onPanning;
        if (o.isPanning && l.touches.length === 1) {
          if (s)
            return;
          var m = yg(o);
          if (!m)
            return;
          l.cancelable && l.preventDefault(), l.stopPropagation();
          var f = l.touches[0];
          kg(o, f.clientX, f.clientY, ya.TOUCH), Me(Ae(o), l, d);
        } else l.touches.length > 1 && o.onPinch(l);
      }, this.onTouchPanningStop = function(l) {
        o.onPanningStop(l), o.onPinchStop(l);
      }, this.onDoubleClick = function(l) {
        var s = o.setup.disabled;
        if (!s) {
          var d = z5(o, l);
          d && x5(o, l);
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
          var l = Sd(o.state.scale, o.wrapperComponent, o.contentComponent);
          o.setState(l.scale, l.positionX, l.positionY);
        }
      }, this.handleTransformStyles = function(l, s, d) {
        return o.props.customTransform ? o.props.customTransform(l, s, d) : Kh(l, s, d);
      }, this.getContext = function() {
        return Ae(o);
      }, this.applyTransformation = function() {
        if (!(!o.mounted || !o.contentComponent)) {
          var l = o.state, s = l.scale, d = l.positionX, m = l.positionY, f = o.handleTransformStyles(d, m, s);
          o.props.detached || (o.contentComponent.style.transform = f), o.onTransformCallbacks.forEach(function(p) {
            return p({
              scale: s,
              positionX: d,
              positionY: m,
              previousScale: o.state.previousScale,
              ref: Ae(o)
            });
          });
        }
      }, this.setState = function(l, s, d) {
        var m = o.props.onTransform;
        if (!Number.isNaN(l) && !Number.isNaN(s) && !Number.isNaN(d)) {
          var f = Math.max(l, 1e-7);
          f !== o.state.scale && (o.state.previousScale = o.state.scale, o.state.scale = f), o.state.positionX = s, o.state.positionY = d, o.applyTransformation();
          var p = Ae(o);
          o.onChangeCallbacks.forEach(function(_) {
            return _(p);
          }), Me(p, { scale: o.state.scale, positionX: s, positionY: d }, m);
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
        o.cleanupWindowEvents(), o.wrapperComponent = l, o.contentComponent = s, Zi(o, o.state.scale), o.handleInitializeWrapperEvents(l), o.handleInitialize(s), o.initializeWindowEvents(), o.isInitialized = !0;
        var d = Ae(o);
        Me(d, void 0, o.props.onInit), o5(o.props.ref, d);
      }, this.props = i, this.setup = wg(this.props), this.state = Yh(this.props);
    }
    return n;
  })()
), Wo = Po.createContext(null), N5 = function(n, i) {
  return typeof n == "function" ? n(i) : n;
}, C5 = Po.forwardRef(function(n, i) {
  var o = C.useRef(new A5(n)).current, l = N5(n.children, Zl(o));
  return C.useImperativeHandle(i, function() {
    return Zl(o);
  }, [o]), C.useEffect(function() {
    o.update(n);
  }, [o, n]), g.jsx(Wo.Provider, ln({ value: o }, { children: l }));
});
Po.forwardRef(function(n, i) {
  var o = C.useRef(null), l = C.useContext(Wo);
  return C.useEffect(function() {
    return l.onChange(function(s) {
      if (o.current) {
        var d = 0, m = 0;
        o.current.style.transform = l.handleTransformStyles(d, m, 1 / s.instance.state.scale);
      }
    });
  }, [l]), g.jsx("div", ln({}, n, { ref: r5([o, i]) }));
});
function O5(n, i) {
  i === void 0 && (i = {});
  var o = i.insertAt;
  if (!(typeof document > "u")) {
    var l = document.head || document.getElementsByTagName("head")[0], s = document.createElement("style");
    s.type = "text/css", o === "top" && l.firstChild ? l.insertBefore(s, l.firstChild) : l.appendChild(s), s.styleSheet ? s.styleSheet.cssText = n : s.appendChild(document.createTextNode(n));
  }
}
var M5 = `.transform-component-module_wrapper__SPB86 {
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
`, Au = { wrapper: "transform-component-module_wrapper__SPB86", content: "transform-component-module_content__FBWxo", infiniteGrid: "transform-component-module_infiniteGrid__Z-aP3" };
O5(M5);
var R5 = function(n) {
  var i = n.children, o = n.wrapperClass, l = o === void 0 ? "" : o, s = n.contentClass, d = s === void 0 ? "" : s, m = n.wrapperStyle, f = n.contentStyle, p = n.wrapperProps, _ = p === void 0 ? {} : p, v = n.contentProps, y = v === void 0 ? {} : v, S = n.infinite, k = S === void 0 ? !1 : S, E = C.useContext(Wo), z = E.init, R = E.cleanupWindowEvents, D = C.useRef(null), Y = C.useRef(null), L = C.useRef(null);
  return C.useEffect(function() {
    var H = D.current, X = Y.current;
    return H !== null && X !== null && z && z?.(H, X), function() {
      R?.();
    };
  }, []), C.useEffect(function() {
    if (k) {
      var H = L.current;
      if (H) {
        var X = function() {
          var ie = E.state, $ = ie.positionX, V = ie.positionY;
          H.style.backgroundPosition = "".concat($, "px ").concat(V, "px");
        };
        return X(), E.onChange(X);
      }
    }
  }, [k, E]), g.jsxs("div", ln({}, _, { ref: D, className: "".concat(Bu.wrapperClass, " ").concat(Au.wrapper, " ").concat(l), style: m }, { children: [k && g.jsx("div", { ref: L, className: Au.infiniteGrid, "aria-hidden": !0 }), g.jsx("div", ln({}, y, { ref: Y, className: "".concat(Bu.contentClass, " ").concat(Au.content, " ").concat(d), style: ln(ln({}, f), { transform: Kh(E.state.positionX, E.state.positionY, E.state.scale) }) }, { children: i }))] }));
};
function D5(n, i) {
  var o = Math.max(0, Math.min(n.x + n.width, i.x + i.width) - Math.max(n.x, i.x)), l = Math.max(0, Math.min(n.y + n.height, i.y + i.height) - Math.max(n.y, i.y));
  return o * l;
}
function j5(n) {
  var i = n.elementX, o = n.elementY, l = n.elementWidth, s = n.elementHeight, d = n.scale, m = n.positionX, f = n.positionY, p = n.viewportWidth, _ = n.viewportHeight, v = n.margin, y = v === void 0 ? 0 : v, S = n.threshold, k = S === void 0 ? 0 : S, E = {
    x: -y,
    y: -y,
    width: p + 2 * y,
    height: _ + 2 * y
  }, z = {
    x: i * d + m,
    y: o * d + f,
    width: l * d,
    height: s * d
  };
  if (k <= 0) {
    var R = z.x < E.x + E.width && z.x + z.width > E.x, D = z.y < E.y + E.height && z.y + z.height > E.y;
    return R && D;
  }
  var Y = z.width * z.height;
  if (Y <= 0)
    return !1;
  var L = D5(E, z);
  return L / Y >= k;
}
Po.forwardRef(function(n, i) {
  var o = n.x, l = n.y, s = n.width, d = n.height, m = n.margin, f = m === void 0 ? 0 : m, p = n.threshold, _ = p === void 0 ? 0 : p, v = n.placeholder, y = v === void 0 ? null : v, S = n.onShow, k = n.onHide, E = n.children, z = n.className, R = n.style, D = C.useContext(Wo), Y = C.useState(!1), L = Y[0], H = Y[1], X = C.useRef(!1), ie = C.useRef(S), $ = C.useRef(k);
  return ie.current = S, $.current = k, C.useEffect(function() {
    var V = function() {
      var ae, ce, Q = D.wrapperComponent;
      if (Q) {
        var ee = j5({
          elementX: o,
          elementY: l,
          elementWidth: s,
          elementHeight: d,
          scale: D.state.scale,
          positionX: D.state.positionX,
          positionY: D.state.positionY,
          viewportWidth: Q.offsetWidth,
          viewportHeight: Q.offsetHeight,
          margin: f,
          threshold: _
        });
        ee !== X.current && (X.current = ee, H(ee), ee ? (ae = ie.current) === null || ae === void 0 || ae.call(ie) : (ce = $.current) === null || ce === void 0 || ce.call($));
      }
    };
    V();
    var F = D.onChange(V), W;
    return D.wrapperComponent || (W = D.onInit(function() {
      return V();
    })), function() {
      F(), W?.();
    };
  }, [D, o, l, s, d, f, _]), L ? g.jsx("div", ln({ ref: i, className: z, style: R }, { children: E })) : y ? g.jsx(g.Fragment, { children: y }) : null;
});
var kd = function() {
  var n = C.useContext(Wo);
  if (!n)
    throw new Error("Transform context must be placed inside TransformWrapper");
  return n;
}, L5 = function() {
  var n = kd();
  return Zl(n);
}, U5 = function(n) {
  var i = kd();
  C.useEffect(function() {
    var o, l = i.onChange(function(s) {
      o = n(Gh(s.instance));
    });
    return function() {
      l(), o?.();
    };
  }, [n, i]);
};
const Y5 = 10;
function H5({ room: n, path: i, isSelected: o, isBusy: l, onRoomToggle: s }) {
  const d = C.useRef(null), m = (y, S) => {
    d.current = null, y.hasPointerCapture(S) && y.releasePointerCapture(S);
  }, f = (y) => {
    !y.isPrimary || y.pointerType === "mouse" && y.button !== 0 || (d.current = { id: y.pointerId, x: y.clientX, y: y.clientY }, y.currentTarget.setPointerCapture(y.pointerId));
  }, p = (y) => {
    const S = d.current;
    if (!S || S.id !== y.pointerId)
      return;
    const k = Math.hypot(y.clientX - S.x, y.clientY - S.y) < Y5;
    m(y.currentTarget, y.pointerId), k && !l && (pe.debug("RoomSegments", "Tap on room:", n.id, n.name), s(n.id, n.name));
  }, _ = (y) => {
    d.current?.id === y.pointerId && m(y.currentTarget, y.pointerId);
  }, v = (y) => {
    d.current?.id === y.pointerId && (d.current = null);
  };
  return /* @__PURE__ */ g.jsx(
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
      onPointerCancel: _,
      onLostPointerCapture: v,
      children: /* @__PURE__ */ g.jsx("title", { children: n.name })
    }
  );
}
function Z5({
  rooms: n,
  selectedRooms: i,
  onRoomToggle: o,
  transform: l,
  imageWidth: s,
  imageHeight: d
}) {
  const { phase: m } = Xn(), f = Vt(), p = Ug(m, f.state);
  pe.debug("RoomSegments", "Render, selectedRooms:", Array.from(i.keys()));
  const _ = C.useMemo(() => n.filter((v) => v.visibility !== "Hidden").sort((v, y) => {
    const S = Math.abs(((v.x1 ?? 0) - (v.x0 ?? 0)) * ((v.y1 ?? 0) - (v.y0 ?? 0)));
    return Math.abs(((y.x1 ?? 0) - (y.x0 ?? 0)) * ((y.y1 ?? 0) - (y.y0 ?? 0))) - S;
  }).map((v) => ({
    room: v,
    path: HT(v, l)
  })), [n, l]);
  return !s || !d ? null : /* @__PURE__ */ g.jsx(
    "svg",
    {
      className: "vacuum-map__room-segments",
      viewBox: `0 0 ${s} ${d}`,
      preserveAspectRatio: "xMidYMid meet",
      children: _.map(({ room: v, path: y }) => {
        const S = i.has(v.id);
        return y ? /* @__PURE__ */ g.jsx(
          H5,
          {
            room: v,
            path: y,
            isSelected: S,
            isBusy: p,
            onRoomToggle: o
          },
          v.id
        ) : (pe.warn("No path for room:", v.id, v.name), null);
      })
    }
  );
}
const B5 = C.memo(Z5);
function G5({
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
  const { t: _ } = De(), v = n === "map", y = n === "list", S = _(v ? "vacuum_map.switch_to_list" : "vacuum_map.switch_to_map"), k = v ? w0 : Vu, E = _(f ? "vacuum_map.unlock_map" : "vacuum_map.lock_map"), z = f ? A0 : x0;
  return /* @__PURE__ */ g.jsxs("div", { className: "map-controls", children: [
    d && i && /* @__PURE__ */ g.jsx("button", { className: "map-controls__button", onClick: i, "aria-label": S, title: S, children: /* @__PURE__ */ g.jsx(k, { size: 18 }) }),
    m && !f && !y && /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
      /* @__PURE__ */ g.jsx(
        "button",
        {
          className: "map-controls__button",
          onClick: o,
          "aria-label": _("vacuum_map.zoom_in"),
          title: _("vacuum_map.zoom_in"),
          children: /* @__PURE__ */ g.jsx(Og, { size: 18 })
        }
      ),
      /* @__PURE__ */ g.jsx(
        "button",
        {
          className: "map-controls__button",
          onClick: l,
          "aria-label": _("vacuum_map.zoom_out"),
          title: _("vacuum_map.zoom_out"),
          children: /* @__PURE__ */ g.jsx(O0, { size: 18 })
        }
      ),
      /* @__PURE__ */ g.jsx(
        "button",
        {
          className: "map-controls__button",
          onClick: s,
          "aria-label": _("vacuum_map.zoom_reset"),
          title: _("vacuum_map.zoom_reset"),
          children: /* @__PURE__ */ g.jsx(K0, { size: 16 })
        }
      )
    ] }),
    !y && /* @__PURE__ */ g.jsx(
      "button",
      {
        className: `map-controls__button map-controls__button--lock${f ? " map-controls__button--locked" : ""}`,
        onClick: p,
        "aria-label": E,
        title: E,
        children: /* @__PURE__ */ g.jsx(z, { size: 16 })
      }
    )
  ] });
}
function K5({ rooms: n, selectedRooms: i, onRoomToggle: o }) {
  const { t: l } = De();
  return n.length === 0 ? /* @__PURE__ */ g.jsx("div", { className: "room-list-view", children: /* @__PURE__ */ g.jsx("div", { className: "room-list-view__empty", children: l("vacuum_map.no_rooms") }) }) : /* @__PURE__ */ g.jsxs("div", { className: "room-list-view", children: [
    /* @__PURE__ */ g.jsx("div", { className: "room-list-view__header", children: l("vacuum_map.room_list_overlay") }),
    /* @__PURE__ */ g.jsx("div", { className: "room-list-view__list", children: n.map((s) => {
      const d = i.has(s.id);
      return /* @__PURE__ */ g.jsxs(
        "button",
        {
          className: `room-list-view__item ${d ? "room-list-view__item--selected" : ""}`,
          onClick: () => o(s.id, s.name),
          children: [
            /* @__PURE__ */ g.jsx("span", { className: "room-list-view__item-name", children: s.name }),
            /* @__PURE__ */ g.jsx("span", { className: "room-list-view__item-check", children: d && /* @__PURE__ */ g.jsx(Cg, { size: 18 }) })
          ]
        },
        s.id
      );
    }) })
  ] });
}
function q5({ zones: n, onZonesChange: i, clearZoneLabel: o, mode: l = "zone" }) {
  const s = kd(), d = C.useRef(null), { phase: m } = Xn(), f = m === "cleaning" || m === "paused", [p, _] = C.useState(null), [v, y] = C.useState(null), [S, k] = C.useState(s.state.scale);
  U5(
    C.useCallback((V) => {
      k(V.state.scale);
    }, [])
  );
  const E = 1 / S, [z, R] = C.useState(null), D = C.useCallback((V, F) => {
    const W = d.current;
    if (!W) return null;
    const ae = W.getBoundingClientRect();
    return ae.width <= 0 || ae.height <= 0 ? null : {
      x: Math.max(0, Math.min(100, (V - ae.left) / ae.width * 100)),
      y: Math.max(0, Math.min(100, (F - ae.top) / ae.height * 100))
    };
  }, []), Y = C.useCallback(
    (V) => {
      if (p) return;
      V.stopPropagation();
      const F = D(V.clientX, V.clientY);
      if (!F) return;
      const W = 15, ae = {
        x1: Math.max(0, F.x - W / 2),
        y1: Math.max(0, F.y - W / 2),
        x2: Math.min(100, F.x + W / 2),
        y2: Math.min(100, F.y + W / 2)
      };
      pe.debug("Zone", "Created at click:", F, ae), i([...n, ae]);
    },
    [D, i, p, n]
  ), L = (V, F, W) => {
    V.stopPropagation(), V.preventDefault();
    const ae = n[F];
    ae && (y(F), _(W), R(ae));
  }, H = (V) => "touches" in V && V.touches.length > 0 ? { clientX: V.touches[0].clientX, clientY: V.touches[0].clientY } : { clientX: V.clientX, clientY: V.clientY }, X = C.useCallback(
    (V) => {
      if (!p || !z) return;
      const { clientX: F, clientY: W } = H(V), ae = D(F, W);
      if (!ae) return;
      const ce = { ...z }, Q = 5;
      switch (p) {
        case "top":
          ce.y1 = Math.min(ae.y, z.y2 - Q);
          break;
        case "bottom":
          ce.y2 = Math.max(ae.y, z.y1 + Q);
          break;
        case "left":
          ce.x1 = Math.min(ae.x, z.x2 - Q);
          break;
        case "right":
          ce.x2 = Math.max(ae.x, z.x1 + Q);
          break;
      }
      v !== null && i(n.map((ee, J) => J === v ? ce : ee));
    },
    [p, v, z, D, i, n]
  ), ie = C.useCallback(() => {
    _(null), y(null), R(null);
  }, []), $ = (V, F) => {
    V.stopPropagation(), i(n.filter((W, ae) => ae !== F)), _(null), y(null), R(null);
  };
  return /* @__PURE__ */ g.jsx(
    "div",
    {
      ref: d,
      className: "vacuum-map__zone-container",
      onClick: Y,
      onMouseMove: X,
      onMouseUp: ie,
      onMouseLeave: ie,
      onTouchMove: X,
      onTouchEnd: ie,
      onTouchCancel: ie,
      children: n.map((V, F) => /* @__PURE__ */ g.jsx(
        "div",
        {
          className: `vacuum-map__zone ${l === "no_go" ? "vacuum-map__zone--nogo" : l === "no_mop" ? "vacuum-map__zone--nomop" : ""}`,
          style: {
            left: `${V.x1}%`,
            top: `${V.y1}%`,
            width: `${V.x2 - V.x1}%`,
            height: `${V.y2 - V.y1}%`
          },
          onClick: (W) => W.stopPropagation(),
          children: !f && /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
            /* @__PURE__ */ g.jsx(
              "div",
              {
                className: "vacuum-map__zone-handle vacuum-map__zone-handle--top",
                style: { transform: `translateX(-50%) scale(${E})` },
                onMouseDown: (W) => L(W, F, "top"),
                onTouchStart: (W) => L(W, F, "top"),
                title: "Resize"
              }
            ),
            /* @__PURE__ */ g.jsx(
              "div",
              {
                className: "vacuum-map__zone-handle vacuum-map__zone-handle--right",
                style: { transform: `translateY(-50%) scale(${E})` },
                onMouseDown: (W) => L(W, F, "right"),
                onTouchStart: (W) => L(W, F, "right"),
                title: "Resize"
              }
            ),
            /* @__PURE__ */ g.jsx(
              "div",
              {
                className: "vacuum-map__zone-handle vacuum-map__zone-handle--bottom",
                style: { transform: `translateX(-50%) scale(${E})` },
                onMouseDown: (W) => L(W, F, "bottom"),
                onTouchStart: (W) => L(W, F, "bottom"),
                title: "Resize"
              }
            ),
            /* @__PURE__ */ g.jsx(
              "div",
              {
                className: "vacuum-map__zone-handle vacuum-map__zone-handle--left",
                style: { transform: `translateY(-50%) scale(${E})` },
                onMouseDown: (W) => L(W, F, "left"),
                onTouchStart: (W) => L(W, F, "left"),
                title: "Resize"
              }
            ),
            /* @__PURE__ */ g.jsx(
              "button",
              {
                className: "vacuum-map__zone-clear",
                style: { transform: `scale(${E})` },
                onClick: (W) => $(W, F),
                title: o,
                children: "×"
              }
            )
          ] })
        },
        `${V.x1}-${V.y1}-${V.x2}-${V.y2}-${F}`
      ))
    }
  );
}
const V5 = "M12,2C14.65,2 17.19,3.06 19.07,4.93L17.65,6.35C16.15,4.85 14.12,4 12,4C9.88,4 7.84,4.84 6.35,6.35L4.93,4.93C6.81,3.06 9.35,2 12,2M3.66,6.5L5.11,7.94C4.39,9.17 4,10.57 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,10.57 19.61,9.17 18.88,7.94L20.34,6.5C21.42,8.12 22,10.04 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12C2,10.04 2.58,8.12 3.66,6.5M12,6A6,6 0 0,1 18,12C18,13.59 17.37,15.12 16.24,16.24L14.83,14.83C14.08,15.58 13.06,16 12,16C10.94,16 9.92,15.58 9.17,14.83L7.76,16.24C6.63,15.12 6,13.59 6,12A6,6 0 0,1 12,6M12,8A1,1 0 0,0 11,9A1,1 0 0,0 12,10A1,1 0 0,0 13,9A1,1 0 0,0 12,8Z";
function X5({
  position: n,
  transform: i,
  imageWidth: o,
  imageHeight: l,
  isCleaning: s = !1
}) {
  const d = C.useMemo(() => i.vacuumToMap({ x: n.x, y: n.y }), [n.x, n.y, i]), m = Math.max(o, l) * 0.05, f = m / 2;
  return /* @__PURE__ */ g.jsx(
    "svg",
    {
      className: `vacuum-position-marker${s ? " vacuum-position-marker--cleaning" : ""}`,
      viewBox: `0 0 ${o} ${l}`,
      preserveAspectRatio: "xMidYMid meet",
      children: /* @__PURE__ */ g.jsxs("g", { transform: `translate(${d.x - f}, ${d.y - f})`, children: [
        /* @__PURE__ */ g.jsx("circle", { cx: f, cy: f, r: f * 0.9, className: "vacuum-position-marker__bg" }),
        /* @__PURE__ */ g.jsx("g", { transform: `scale(${m / 24})`, children: /* @__PURE__ */ g.jsx("path", { d: V5, className: "vacuum-position-marker__icon" }) })
      ] })
    }
  );
}
const $5 = "M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.66C6,21.4 6.6,22 7.33,22H16.66C17.4,22 18,21.4 18,20.67V5.33C18,4.6 17.4,4 16.67,4M11,20V14.5H9L13,7V12.5H15";
function P5({ position: n, transform: i, imageWidth: o, imageHeight: l }) {
  const s = C.useMemo(() => i.vacuumToMap({ x: n.x, y: n.y }), [n.x, n.y, i]), d = Math.max(o, l) * 0.04, m = d / 2;
  return /* @__PURE__ */ g.jsx("svg", { className: "charger-marker", viewBox: `0 0 ${o} ${l}`, preserveAspectRatio: "xMidYMid meet", children: /* @__PURE__ */ g.jsxs("g", { transform: `translate(${s.x - m}, ${s.y - m})`, children: [
    /* @__PURE__ */ g.jsx("circle", { cx: m, cy: m, r: m * 0.9, className: "charger-marker__bg" }),
    /* @__PURE__ */ g.jsx("g", { transform: `scale(${d / 24})`, children: /* @__PURE__ */ g.jsx("path", { d: $5, className: "charger-marker__icon" }) })
  ] }) });
}
const I5 = 0.025, F5 = 0.2, Q5 = 3;
function J5({ rooms: n, transform: i, imageWidth: o, imageHeight: l, scale: s = 1 }) {
  const d = Number.isFinite(s) ? Math.min(Math.max(s, F5), Q5) : 1, m = Math.max(o, l) * I5 * d, f = m * 0.6, p = m * 0.4, _ = m * 0.5, v = C.useMemo(() => n.filter((y) => y.visibility !== "Hidden").filter((y) => {
    const S = y.x !== void 0 && y.y !== void 0, k = y.x0 !== void 0 && y.y0 !== void 0 && y.x1 !== void 0 && y.y1 !== void 0;
    return S || k;
  }).map((y) => {
    const S = y.x ?? (y.x0 + y.x1) / 2, k = y.y ?? (y.y0 + y.y1) / 2, E = i.vacuumToMap({ x: S, y: k });
    return { id: y.id, name: y.name, x: E.x, y: E.y };
  }), [n, i]);
  return /* @__PURE__ */ g.jsx("svg", { className: "room-labels", viewBox: `0 0 ${o} ${l}`, preserveAspectRatio: "xMidYMid meet", children: v.map((y) => {
    const k = y.name.length * m * 0.6 + f * 2, E = m + p * 2;
    return /* @__PURE__ */ g.jsxs("g", { transform: `translate(${y.x}, ${y.y})`, children: [
      /* @__PURE__ */ g.jsx(
        "rect",
        {
          className: "room-labels__bg",
          x: -k / 2,
          y: -E / 2,
          width: k,
          height: E,
          rx: _
        }
      ),
      /* @__PURE__ */ g.jsx("text", { className: "room-labels__text", textAnchor: "middle", dominantBaseline: "middle", fontSize: m, children: y.name })
    ] }, y.id);
  }) });
}
function W5(n) {
  const i = String(n.type ?? "").toLowerCase();
  return i === "line" || i === "wall" || i === "virtual_wall" ? "wall" : i === "mop" || i === "no_mop" || i === "nomop" ? "nomop" : String(n.active ?? "").toLowerCase() === "line" ? "wall" : String(n.forbidType ?? "").toLowerCase() === "mop" ? "nomop" : "nogo";
}
function ez({
  noGoZones: n,
  transform: i,
  imageWidth: o,
  imageHeight: l,
  onZoneDeleted: s
}) {
  const d = ct(), m = Vt(), { t: f } = De(), p = C.useCallback(
    async (_, v, y) => {
      y.stopPropagation(), y.preventDefault();
      const S = {
        entity_id: m.entity_id,
        zone_type: _.type,
        points: _.points
      };
      (!Array.isArray(_.points) || _.points.length < 4) && (S.index = v);
      try {
        await d.callService("botslab_vacuum", "delete_no_go_zone", S), s?.(f("toast.zone_deleted"));
      } catch (k) {
        pe.error("Failed to delete no-go zone", k);
        const E = k instanceof Error ? k.message : String(k);
        s?.(f("toast.operation_failed", { error: E }));
      }
    },
    [d, m.entity_id, s, f]
  );
  return !i || !o || !l || !Array.isArray(n) || n.length === 0 ? null : /* @__PURE__ */ g.jsx("div", { className: "vacuum-map__saved-zones-layer", children: n.map((_, v) => {
    const y = W5(_), S = y === "wall";
    let k = 0, E = 0, z = 0, R = 0;
    if (Array.isArray(_.points) && _.points.length >= 4)
      k = _.points[0], E = _.points[1], z = _.points[2], R = _.points[3];
    else if (Array.isArray(_.vertexs) && _.vertexs.length >= 2) {
      const Q = _.vertexs.map((J) => Array.isArray(J) ? J[0] : 0), ee = _.vertexs.map((J) => Array.isArray(J) ? J[1] : 0);
      k = Math.min(...Q), E = Math.min(...ee), z = Math.max(...Q), R = Math.max(...ee);
    } else if (_.x1 !== void 0 && _.y1 !== void 0)
      k = Number(_.x1), E = Number(_.y1), z = Number(_.x2 ?? k), R = Number(_.y2 ?? E);
    else
      return null;
    if (S && Array.isArray(_.vertexs) && _.vertexs.length >= 2) {
      const Q = _.vertexs[0], ee = _.vertexs[1];
      Array.isArray(Q) && Array.isArray(ee) && (k = Number(Q[0]), E = Number(Q[1]), z = Number(ee[0]), R = Number(ee[1]));
    }
    const D = i.vacuumToMap({ x: k, y: E }), Y = i.vacuumToMap({ x: z, y: R });
    if (!Number.isFinite(D.x) || !Number.isFinite(D.y) || !Number.isFinite(Y.x) || !Number.isFinite(Y.y))
      return null;
    if (S) {
      const Q = Math.hypot(Y.x - D.x, Y.y - D.y);
      if (!Number.isFinite(Q) || Q <= 0)
        return null;
      const ee = Math.atan2(Y.y - D.y, Y.x - D.x) * 180 / Math.PI;
      return /* @__PURE__ */ g.jsxs(
        "div",
        {
          className: "vacuum-map__saved-zone vacuum-map__saved-zone--wall",
          style: {
            left: `${D.x / o * 100}%`,
            top: `${D.y / l * 100}%`,
            width: `${Q / o * 100}%`,
            transform: `rotate(${ee}deg)`,
            // Used by the badge to cancel the line rotation so the text stays flat.
            "--wall-angle": `${ee}deg`
          },
          children: [
            /* @__PURE__ */ g.jsx("span", { className: "vacuum-map__saved-zone-badge", children: f("map.virtual_wall") }),
            /* @__PURE__ */ g.jsx(
              "button",
              {
                type: "button",
                className: "vacuum-map__saved-zone-delete",
                onClick: (J) => p(_, v, J),
                title: f("map.delete_zone"),
                children: "×"
              }
            )
          ]
        },
        `saved-wall-${v}-${k}-${E}`
      );
    }
    const L = Math.min(D.x, Y.x), H = Math.max(D.x, Y.x), X = Math.min(D.y, Y.y), ie = Math.max(D.y, Y.y), $ = L / o * 100, V = X / l * 100, F = (H - L) / o * 100, W = (ie - X) / l * 100, ae = y === "nomop", ce = f(ae ? "map.no_mop" : "map.no_go");
    return /* @__PURE__ */ g.jsxs(
      "div",
      {
        className: `vacuum-map__saved-zone ${ae ? "vacuum-map__saved-zone--nomop" : "vacuum-map__saved-zone--nogo"}`,
        style: {
          left: `${$}%`,
          top: `${V}%`,
          width: `${Math.max(F, 2)}%`,
          height: `${Math.max(W, 2)}%`
        },
        children: [
          /* @__PURE__ */ g.jsx("span", { className: "vacuum-map__saved-zone-badge", children: ce }),
          /* @__PURE__ */ g.jsx(
            "button",
            {
              type: "button",
              className: "vacuum-map__saved-zone-delete",
              onClick: (Q) => p(_, v, Q),
              title: f("map.delete_zone"),
              children: "×"
            }
          )
        ]
      },
      `saved-nogo-${v}-${$}-${V}`
    );
  }) });
}
function Tg(n) {
  const i = LS(n.offsetWidth, n.offsetHeight, n.naturalWidth, n.naturalHeight);
  return i && { ...i, left: n.offsetLeft + i.left, top: n.offsetTop + i.top };
}
function tz({
  showViewToggle: n,
  showZoomControls: i,
  viewMode: o,
  onViewToggle: l,
  isMapLocked: s,
  onToggleLock: d,
  onResetTransformReady: m
}) {
  const { zoomIn: f, zoomOut: p, resetTransform: _ } = L5();
  return C.useEffect(() => {
    m(_);
  }, [_, m]), /* @__PURE__ */ g.jsx(
    G5,
    {
      showViewToggle: n,
      showZoomControls: i,
      viewMode: o,
      onViewToggle: l,
      onZoomIn: () => f(),
      onZoomOut: () => p(),
      onZoomReset: () => _(),
      isMapLocked: s,
      onToggleLock: d
    }
  );
}
function nz({
  mapEntityId: n,
  geometry: i,
  selectedMode: o,
  areaSelectionMode: l,
  selectedRooms: s,
  onRoomToggle: d,
  zone: m,
  onZoneChange: f,
  onImageDimensionsChange: p,
  onImageError: _,
  defaultRoomView: v = "map",
  onZoneDeleted: y
}) {
  const { t: S } = De(), k = ct(), E = ad(), z = Gl(), { phase: R } = Xn(), D = Vt(), Y = !Ug(R, D.state), L = k.states[n], H = L?.attributes?.entity_picture, X = typeof H == "string" ? H : void 0, ie = C.useRef(null), $ = C.useRef(null), [V, F] = C.useState({ width: 0, height: 0 }), [W, ae] = C.useState(null), ce = C.useCallback((Ke) => {
    if (!Ke) return;
    const lt = new ResizeObserver(() => ae(Tg(Ke)));
    return lt.observe(Ke), () => lt.disconnect();
  }, []), [Q, ee] = C.useState(v), J = Du(Ru.MAP_LOCKED, z.entity), [A, I] = C.useState(() => {
    try {
      const Ke = localStorage.getItem(J);
      return Ke === null ? !0 : Ke === "true";
    } catch {
      return !0;
    }
  }), ne = C.useCallback((Ke) => {
    $.current = Ke;
  }, []), ve = C.useCallback(() => {
    const Ke = !A;
    Ke && $.current && $.current(), I(Ke);
    try {
      localStorage.setItem(J, String(Ke));
    } catch {
    }
  }, [A, J]), ge = o === "room" ? Q : v, { rooms: T, transform: Z } = i, P = L?.attributes?.vacuum_position, te = L?.attributes?.charger_position, me = R === "cleaning", fe = z.map_overlays ?? [], ye = V.width > 0 && V.height > 0, Ge = fe.includes("vacuum") && P && ye && Z, Ne = fe.includes("charger") && te && ye && Z, vt = fe.includes("room_labels") && ye && Z, jt = C.useCallback(
    (Ke) => {
      const lt = Ke.currentTarget;
      !X || !lt.naturalWidth || !lt.naturalHeight || (F({ width: lt.naturalWidth, height: lt.naturalHeight }), ae(Tg(lt)), p?.(lt.naturalWidth, lt.naturalHeight, X));
    },
    [X, p]
  ), Xt = C.useCallback(() => {
    X && _?.(X);
  }, [X, _]), dn = !A && o !== "zone", ut = `vacuum-map${A ? " vacuum-map--locked" : ""}`;
  return /* @__PURE__ */ g.jsxs("div", { className: ut, ref: ie, children: [
    L && X ? /* @__PURE__ */ g.jsxs(
      C5,
      {
        initialScale: 1,
        minScale: 0.5,
        maxScale: 4,
        centerOnInit: !0,
        centerZoomedOut: !1,
        limitToBounds: !1,
        wheel: {
          step: 0.05,
          disabled: A
        },
        pinch: {
          step: 0.5,
          disabled: A
        },
        panning: {
          disabled: !dn,
          velocityDisabled: !0
        },
        doubleClick: { disabled: !0 },
        children: [
          /* @__PURE__ */ g.jsx(
            tz,
            {
              showViewToggle: o === "room",
              showZoomControls: o !== "room" || ge === "map",
              viewMode: ge,
              onViewToggle: () => ee((Ke) => Ke === "map" ? "list" : "map"),
              isMapLocked: A,
              onToggleLock: ve,
              onResetTransformReady: ne
            }
          ),
          /* @__PURE__ */ g.jsx(
            R5,
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
              children: /* @__PURE__ */ g.jsxs("div", { className: "vacuum-map__content", children: [
                /* @__PURE__ */ g.jsx(
                  "img",
                  {
                    ref: ce,
                    src: k.hassUrl(X),
                    alt: "Vacuum Map",
                    className: "vacuum-map__image",
                    onLoad: jt,
                    onError: Xt,
                    draggable: !1
                  }
                ),
                Ne && /* @__PURE__ */ g.jsx(
                  P5,
                  {
                    position: te,
                    transform: Z,
                    imageWidth: V.width,
                    imageHeight: V.height
                  }
                ),
                Ge && /* @__PURE__ */ g.jsx(
                  X5,
                  {
                    position: P,
                    transform: Z,
                    imageWidth: V.width,
                    imageHeight: V.height,
                    isCleaning: me
                  }
                ),
                vt && /* @__PURE__ */ g.jsx(
                  J5,
                  {
                    rooms: T,
                    transform: Z,
                    imageWidth: V.width,
                    imageHeight: V.height,
                    scale: z.room_label_scale
                  }
                ),
                o === "room" && ge === "map" && Y && V.width > 0 && V.height > 0 && Z && /* @__PURE__ */ g.jsx(
                  B5,
                  {
                    rooms: T,
                    selectedRooms: s,
                    onRoomToggle: d,
                    transform: Z,
                    imageWidth: V.width,
                    imageHeight: V.height
                  }
                ),
                W && /* @__PURE__ */ g.jsxs("div", { className: "vacuum-map__picture-frame", style: W, children: [
                  /* @__PURE__ */ g.jsx(
                    ez,
                    {
                      noGoZones: L?.attributes?.no_go_zones || D?.attributes?.no_go_zones || [],
                      transform: Z,
                      imageWidth: V.width,
                      imageHeight: V.height,
                      onZoneDeleted: y
                    }
                  ),
                  o === "zone" && /* @__PURE__ */ g.jsx(
                    q5,
                    {
                      zones: m,
                      onZonesChange: f,
                      clearZoneLabel: S("vacuum_map.clear_zone"),
                      mode: l
                    }
                  )
                ] })
              ] })
            }
          )
        ]
      }
    ) : /* @__PURE__ */ g.jsxs("div", { className: "vacuum-map__placeholder", children: [
      S("vacuum_map.no_map"),
      /* @__PURE__ */ g.jsx("br", {}),
      /* @__PURE__ */ g.jsx("small", { children: S("vacuum_map.looking_for", { entity: n }) })
    ] }),
    o === "room" && /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
      ge === "map" && Y && /* @__PURE__ */ g.jsx("div", { className: "vacuum-map__overlay", children: S("vacuum_map.room_overlay") }),
      ge === "list" && Y && /* @__PURE__ */ g.jsx(K5, { rooms: T, selectedRooms: s, onRoomToggle: d })
    ] }),
    o === "zone" && l === "zone" && /* @__PURE__ */ g.jsx("div", { className: "vacuum-map__overlay", children: m.length > 0 ? S("vacuum_map.zone_overlay_resize") : S("vacuum_map.zone_overlay_create") }),
    o === "zone" && l === "no_go" && /* @__PURE__ */ g.jsx("div", { className: "vacuum-map__overlay", children: m.length > 0 ? E === "tr" ? "Yasak alanı boyutlandırmak için kenarları sürükleyin" : "Drag edges to resize forbidden zone" : E === "tr" ? "Yasak alan eklemek için haritaya dokunun" : "Tap the map to create a forbidden zone" }),
    o === "zone" && l === "no_mop" && /* @__PURE__ */ g.jsx("div", { className: "vacuum-map__overlay", children: m.length > 0 ? E === "tr" ? "Paspas yasak alanı boyutlandırmak için kenarları sürükleyin" : "Drag edges to resize no-mop zone" : E === "tr" ? "Paspas yasak alan eklemek için haritaya dokunun" : "Tap the map to create a no-mop zone" })
  ] });
}
function az({ selectedMode: n, areaSelectionMode: i = "zone", onModeChange: o, onAreaSelectionModeChange: l }) {
  const { t: s } = De(), { phase: d } = Xn(), m = ad(), [f, p] = C.useState(!1), _ = C.useRef(null), v = d === "cleaning" || d === "paused", y = [
    { value: "room", label: s("modes.room") },
    { value: "all", label: s("modes.all") }
  ];
  C.useEffect(() => {
    if (!f) return;
    const E = (R) => {
      (!_.current || !R.composedPath().includes(_.current)) && p(!1);
    }, z = (R) => {
      R.key === "Escape" && p(!1);
    };
    return document.addEventListener("mousedown", E), document.addEventListener("keydown", z), () => {
      document.removeEventListener("mousedown", E), document.removeEventListener("keydown", z);
    };
  }, [f]);
  const S = (E) => {
    l && E !== i && l(E), n !== "zone" && o("zone"), p(!1);
  }, k = (E) => E === "zone" ? s("modes.zone") : E === "no_go" ? m === "tr" ? "Yasak Alan" : "No-Go Zone" : E === "no_mop" ? m === "tr" ? "Paspas Yasak" : "No-Mop Zone" : s("modes.zone");
  return /* @__PURE__ */ g.jsxs("div", { className: `mode-tabs ${v ? "mode-tabs--disabled" : ""}`, children: [
    y.map((E) => /* @__PURE__ */ g.jsx(
      "button",
      {
        onClick: () => o(E.value),
        className: `mode-tabs__button ${n === E.value ? "mode-tabs__button--active" : ""}`,
        disabled: v,
        children: E.label
      },
      E.value
    )),
    /* @__PURE__ */ g.jsxs("div", { className: "mode-tabs__area-select", ref: _, children: [
      /* @__PURE__ */ g.jsxs(
        "button",
        {
          type: "button",
          onClick: () => p((E) => !E),
          className: `mode-tabs__button ${n === "zone" ? "mode-tabs__button--active" : ""}`,
          disabled: v,
          "aria-haspopup": "menu",
          "aria-expanded": f,
          children: [
            k(i),
            /* @__PURE__ */ g.jsx(qu, { className: `mode-tabs__chevron ${f ? "mode-tabs__chevron--open" : ""}` })
          ]
        }
      ),
      f && /* @__PURE__ */ g.jsx("div", { className: "mode-tabs__menu", role: "menu", children: ["zone", "no_go", "no_mop"].map((E) => /* @__PURE__ */ g.jsx(
        "button",
        {
          type: "button",
          role: "menuitemradio",
          "aria-checked": i === E,
          className: `mode-tabs__menu-item ${i === E ? "mode-tabs__menu-item--active" : ""}`,
          onClick: () => S(E),
          children: k(E)
        },
        E
      )) })
    ] })
  ] });
}
function on({ title: n, icon: i, defaultOpen: o = !1, children: l }) {
  const [s, d] = C.useState(o), m = C.useCallback(() => {
    d((f) => !f);
  }, []);
  return /* @__PURE__ */ g.jsxs("div", { className: `accordion ${s ? "accordion--open" : ""}`, children: [
    /* @__PURE__ */ g.jsxs("button", { className: "accordion__header", onClick: m, type: "button", children: [
      /* @__PURE__ */ g.jsxs("div", { className: "accordion__title-wrapper", children: [
        i && /* @__PURE__ */ g.jsx("span", { className: "accordion__icon", children: i }),
        /* @__PURE__ */ g.jsx("span", { className: "accordion__title", children: n })
      ] }),
      /* @__PURE__ */ g.jsx(qu, { className: "accordion__chevron" })
    ] }),
    /* @__PURE__ */ g.jsx("div", { className: "accordion__content", children: /* @__PURE__ */ g.jsx("div", { className: "accordion__content-inner", children: l }) })
  ] });
}
function Jh({ checked: n = !1, onChange: i, disabled: o = !1 }) {
  const l = (s) => {
    i && !o && i(s.target.checked);
  };
  return /* @__PURE__ */ g.jsxs("label", { className: `toggle ${o ? "toggle--disabled" : ""}`, children: [
    /* @__PURE__ */ g.jsx("input", { type: "checkbox", className: "toggle__input", checked: n, onChange: l, disabled: o }),
    /* @__PURE__ */ g.jsx("span", { className: "toggle__slider", children: /* @__PURE__ */ g.jsx("span", { className: "toggle__knob" }) })
  ] });
}
function Fa({
  icon: n,
  label: i,
  selected: o = !1,
  onClick: l,
  size: s = "medium",
  iconStyle: d,
  disabled: m = !1
}) {
  return /* @__PURE__ */ g.jsxs("div", { className: `circular-button ${m ? "circular-button--disabled" : ""}`, children: [
    /* @__PURE__ */ g.jsx(
      "button",
      {
        className: `circular-button__circle circular-button__circle--${s} ${o ? "circular-button__circle--selected" : ""}`,
        onClick: l,
        disabled: m,
        children: typeof n == "string" ? /* @__PURE__ */ g.jsx("span", { className: "circular-button__icon", style: d, children: n }) : n
      }
    ),
    i && /* @__PURE__ */ g.jsx("span", { className: "circular-button__label", children: i })
  ] });
}
function Pl({ opened: n, onClose: i, children: o, className: l }) {
  return C.useEffect(() => {
    if (!n) return;
    const s = (d) => {
      d.key === "Escape" && !d.defaultPrevented && i();
    };
    return document.addEventListener("keydown", s), () => document.removeEventListener("keydown", s);
  }, [n, i]), n ? /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
    /* @__PURE__ */ g.jsx("div", { className: `modal__backdrop${l ? ` ${l}__backdrop` : ""}`, onClick: i }),
    /* @__PURE__ */ g.jsxs("div", { className: `modal${l ? ` ${l}` : ""}`, role: "dialog", "aria-modal": "true", children: [
      /* @__PURE__ */ g.jsx("div", { className: "modal__handle" }),
      /* @__PURE__ */ g.jsx("div", { className: "modal__content", children: o })
    ] })
  ] }) : null;
}
function Wh({ options: n, value: i, onChange: o, disabled: l = !1 }) {
  return /* @__PURE__ */ g.jsx("div", { className: `segmented-control ${l ? "segmented-control--disabled" : ""}`, children: n.map((s) => /* @__PURE__ */ g.jsx(
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
function iz({ message: n, onClose: i }) {
  return /* @__PURE__ */ g.jsxs("div", { className: "toast", children: [
    /* @__PURE__ */ g.jsx("span", { className: "toast__message", children: n }),
    /* @__PURE__ */ g.jsx("button", { className: "toast__close", onClick: i, "aria-label": "Close", children: "×" })
  ] });
}
class oz extends C.Component {
  constructor(i) {
    super(i), this.state = { hasError: !1, error: null };
  }
  static getDerivedStateFromError(i) {
    return { hasError: !0, error: i };
  }
  componentDidCatch(i, o) {
    pe.error("Caught error:", i), pe.error("Component stack:", o.componentStack);
  }
  handleRetry = () => {
    this.setState({ hasError: !1, error: null });
  };
  render() {
    return this.state.hasError ? this.props.fallback ? this.props.fallback : /* @__PURE__ */ g.jsx("div", { className: "error-boundary", children: /* @__PURE__ */ g.jsxs("div", { className: "error-boundary__content", children: [
      /* @__PURE__ */ g.jsx("div", { className: "error-boundary__icon", children: "!" }),
      /* @__PURE__ */ g.jsx("h3", { className: "error-boundary__title", children: "Something went wrong" }),
      /* @__PURE__ */ g.jsx("p", { className: "error-boundary__message", children: "The card encountered an error. Try refreshing the page." }),
      /* @__PURE__ */ g.jsx("button", { className: "error-boundary__retry", onClick: this.handleRetry, children: "Try Again" })
    ] }) }) : this.props.children;
  }
}
const rz = {
  start_auto_empty: Ou,
  self_clean: r0,
  manual_drying: m1
}, lz = [
  { key: "clean_water_tank_status", labelKey: "dock_popup.clean_water_tank", warnWhenLow: !0 },
  { key: "dirty_water_tank_status", labelKey: "dock_popup.used_water_tank", warnWhenLow: !1 },
  { key: "dust_bag_status", labelKey: "dock_popup.dust_bag", warnWhenLow: !1 },
  { key: "detergent_status", labelKey: "dock_popup.detergent", warnWhenLow: !1 }
];
function sz({ opened: n, onClose: i }) {
  const o = ct(), { get: l } = cn(), { t: s } = De(), d = WT.flatMap((f) => {
    const p = l("button", f.key);
    return p ? [{ ...f, entityId: p, state: sn(o, p) }] : [];
  }), m = (f) => {
    o.callService("button", "press", { entity_id: f }), i();
  };
  return /* @__PURE__ */ g.jsx(Pl, { opened: n, onClose: i, className: "dock-popup-modal", children: /* @__PURE__ */ g.jsxs("section", { className: "dock-popup", children: [
    /* @__PURE__ */ g.jsx("h2", { className: "dock-popup__title", children: s("dock_popup.information") }),
    /* @__PURE__ */ g.jsx("div", { className: "dock-popup__status-grid", children: lz.map((f) => {
      const p = l("sensor", f.key), _ = sn(o, p).state, v = tx(_, f.warnWhenLow);
      return /* @__PURE__ */ g.jsxs("div", { className: "dock-popup__status", children: [
        /* @__PURE__ */ g.jsx("span", { className: `dock-popup__status-dot dock-popup__status-dot--${v}` }),
        /* @__PURE__ */ g.jsxs("div", { children: [
          /* @__PURE__ */ g.jsx("span", { className: "dock-popup__status-label", children: s(f.labelKey) }),
          /* @__PURE__ */ g.jsx("span", { className: `dock-popup__status-value dock-popup__status-value--${v}`, children: _ })
        ] })
      ] }, f.key);
    }) }),
    d.length > 0 && /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
      /* @__PURE__ */ g.jsx("div", { className: "dock-popup__divider" }),
      /* @__PURE__ */ g.jsx("h2", { className: "dock-popup__title", children: s("dock_popup.tasks") }),
      /* @__PURE__ */ g.jsx("div", { className: "dock-popup__tasks", children: d.map((f) => {
        const p = rz[f.key];
        return /* @__PURE__ */ g.jsxs(
          "button",
          {
            className: "dock-popup__task",
            disabled: f.state.unavailable,
            onClick: () => m(f.entityId),
            children: [
              /* @__PURE__ */ g.jsx(p, { className: "dock-popup__task-icon", "aria-hidden": "true" }),
              /* @__PURE__ */ g.jsx("span", { children: s(f.labelKey) })
            ]
          },
          f.key
        );
      }) })
    ] })
  ] }) });
}
function cz({ onClick: n, text: i, disabled: o = !1 }) {
  return /* @__PURE__ */ g.jsxs(
    "button",
    {
      onClick: n,
      className: `action-buttons__clean ${o ? "action-buttons__clean--disabled" : ""}`,
      disabled: o,
      children: [
        /* @__PURE__ */ g.jsx("span", { className: "action-buttons__icon", children: M1 }),
        /* @__PURE__ */ g.jsx("span", { children: i })
      ]
    }
  );
}
function uz({ onClick: n, disabled: i = !1 }) {
  const { t: o } = De();
  return /* @__PURE__ */ g.jsxs(
    "button",
    {
      onClick: n,
      className: `action-buttons__pause ${i ? "action-buttons__pause--disabled" : ""}`,
      disabled: i,
      children: [
        /* @__PURE__ */ g.jsx("span", { className: "action-buttons__icon", children: R1 }),
        /* @__PURE__ */ g.jsx("span", { children: o("actions.pause") })
      ]
    }
  );
}
function dz({ onClick: n, disabled: i = !1 }) {
  const { t: o } = De();
  return /* @__PURE__ */ g.jsxs(
    "button",
    {
      onClick: n,
      className: `action-buttons__resume ${i ? "action-buttons__resume--disabled" : ""}`,
      disabled: i,
      children: [
        /* @__PURE__ */ g.jsx("span", { className: "action-buttons__icon", children: D1 }),
        /* @__PURE__ */ g.jsx("span", { children: o("actions.resume") })
      ]
    }
  );
}
function xg({ onClick: n, action: i, disabled: o = !1 }) {
  const { t: l } = De(), s = l(i === "stop_and_dock" ? "actions.stop_and_dock" : "actions.stop");
  return /* @__PURE__ */ g.jsxs(
    "button",
    {
      onClick: n,
      className: `action-buttons__stop ${o ? "action-buttons__stop--disabled" : ""}`,
      disabled: o,
      children: [
        /* @__PURE__ */ g.jsx("span", { className: "action-buttons__icon", children: j1 }),
        /* @__PURE__ */ g.jsx("span", { children: s })
      ]
    }
  );
}
function mz({ onClick: n, disabled: i = !1 }) {
  const { t: o } = De();
  return /* @__PURE__ */ g.jsxs(
    "button",
    {
      onClick: n,
      className: `action-buttons__dock ${i ? "action-buttons__dock--disabled" : ""}`,
      disabled: i,
      children: [
        /* @__PURE__ */ g.jsx("span", { className: "action-buttons__icon", children: L1 }),
        /* @__PURE__ */ g.jsx("span", { children: o("actions.dock") })
      ]
    }
  );
}
function fz({
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
  const { t: _, getRoomCountTranslation: v } = De(), { getStopAction: y } = sx(), S = Vt(), k = ad(), { phase: E, controls: z } = Xn(), [R, D] = C.useState(!1), Y = y();
  ex(E, S.state);
  const L = () => {
    switch (n) {
      case "room":
        return v(o);
      case "all":
        return _("actions.clean_all");
      case "zone":
        return i === "no_go" ? k === "tr" ? "Yasak Alanı Kaydet" : "Save No-Go Zone" : i === "no_mop" ? k === "tr" ? "Paspas Yasak Alanı Kaydet" : "Save No-Mop Zone" : _("actions.zone_clean");
      default:
        return _("actions.clean");
    }
  }, H = () => f(Y), X = n !== "zone" || (i === "no_go" || i === "no_mop" ? l > 0 : !0), ie = () => {
    p();
  };
  return E === "cleaning" ? /* @__PURE__ */ g.jsxs("div", { className: "action-buttons", children: [
    /* @__PURE__ */ g.jsx(uz, { onClick: d, disabled: !z.canPause }),
    /* @__PURE__ */ g.jsx(xg, { onClick: H, action: Y, disabled: !z.canStop })
  ] }) : E === "paused" ? /* @__PURE__ */ g.jsxs("div", { className: "action-buttons", children: [
    /* @__PURE__ */ g.jsx(dz, { onClick: m, disabled: !z.canResume }),
    /* @__PURE__ */ g.jsx(xg, { onClick: H, action: Y, disabled: !z.canStop })
  ] }) : /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
    /* @__PURE__ */ g.jsxs("div", { className: "action-buttons", children: [
      /* @__PURE__ */ g.jsx(
        cz,
        {
          onClick: s,
          text: L(),
          disabled: !z.canStartCleaning || !X
        }
      ),
      /* @__PURE__ */ g.jsx(mz, { onClick: ie, disabled: !z.canDock && !0 })
    ] }),
    /* @__PURE__ */ g.jsx(sz, { opened: R, onClose: () => D(!1) })
  ] });
}
function _z({
  cleaningMode: n,
  cleaningModeList: i,
  onSelect: o,
  entityId: l,
  t: s,
  disabled: d = !1,
  customizeSelected: m = !1,
  hideCustomize: f = !1
}) {
  const p = f ? i.filter((_) => _ !== Mp) : i;
  return /* @__PURE__ */ g.jsx("div", { className: `cleaning-mode-modal__power-grid ${d ? "cleaning-mode-modal__power-grid--disabled" : ""}`, children: p.map((_) => {
    const v = _ === Mp ? m : _ === n && !m;
    return /* @__PURE__ */ g.jsxs("div", { className: "cleaning-mode-modal__mode-option", children: [
      /* @__PURE__ */ g.jsx(
        Fa,
        {
          size: "small",
          selected: v,
          onClick: () => {
            d || o(l, _);
          },
          icon: $g(_)
        }
      ),
      /* @__PURE__ */ g.jsx("span", { className: "cleaning-mode-modal__mode-option-label", children: Vg(_, s) })
    ] }, _);
  }) });
}
function pz({
  suctionLevel: n,
  suctionLevelList: i,
  attributeList: o,
  fanSpeedList: l,
  fanSpeed: s,
  cleaning: d,
  maxSuctionPower: m,
  onSelectSuctionLevel: f,
  onToggleMaxPower: p,
  suctionLevelEntityId: _,
  maxSuctionPowerEntityId: v,
  maxPlusDescription: y,
  t: S,
  suctionLevelDisabled: k = !1,
  maxPowerDisabled: E = !1,
  hideMaxPower: z = !1
}) {
  const [R, D] = C.useState([]), Y = BS({
    cleaning: d,
    selectOptions: i,
    attributeList: o,
    rememberedOptions: R,
    fanSpeedList: l,
    fanSpeed: s,
    suctionLevel: n,
    maxSuctionPower: !z && m
  });
  Kg(R, Y.rememberedOptions) || D(Y.rememberedOptions);
  const L = !Y.clicksEnabled || k || !Y.sendFanSpeed && !z && m;
  return /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
    /* @__PURE__ */ g.jsx(
      "div",
      {
        className: `cleaning-mode-modal__power-grid ${L ? "cleaning-mode-modal__power-grid--disabled" : ""}`,
        children: Y.options.map((H) => /* @__PURE__ */ g.jsxs("div", { className: "cleaning-mode-modal__power-option", children: [
          /* @__PURE__ */ g.jsx(
            Fa,
            {
              size: "small",
              selected: H === Y.highlight,
              onClick: () => !L && f(_, H),
              icon: Pg(H),
              disabled: L
            }
          ),
          /* @__PURE__ */ g.jsx("span", { className: "cleaning-mode-modal__power-label", children: Xg(H, S) })
        ] }, H))
      }
    ),
    !z && /* @__PURE__ */ g.jsxs("div", { className: "cleaning-mode-modal__max-plus", children: [
      /* @__PURE__ */ g.jsxs("div", { className: "cleaning-mode-modal__max-plus-header", children: [
        /* @__PURE__ */ g.jsx("span", { className: "cleaning-mode-modal__max-plus-title", children: "Max+" }),
        /* @__PURE__ */ g.jsx(
          Jh,
          {
            checked: m,
            disabled: E,
            onChange: (H) => p(v, H)
          }
        )
      ] }),
      /* @__PURE__ */ g.jsx("p", { className: "cleaning-mode-modal__max-plus-description", children: y })
    ] })
  ] });
}
function gz({
  wetnessLevel: n,
  mopPadHumidity: i,
  onChangeWetness: o,
  entityId: l,
  slightlyDryLabel: s,
  moistLabel: d,
  wetLabel: m,
  disabled: f = !1
}) {
  const [p, _] = C.useState(n), v = od();
  C.useEffect(() => {
    _(n);
  }, [n]);
  const { MIN: y, MAX: S } = aS.WETNESS, k = (p - y) / (S - y) * 100, E = 20, z = `calc(${k}% + ${E / 2 - k * E / 100}px)`, R = (H) => {
    f || _(parseInt(H.target.value));
  }, D = () => {
    !f && p !== n && o(l, p);
  }, Y = v ? "to left" : "to right", L = [
    { humidity: "slightly_dry", text: s },
    { humidity: "moist", text: d },
    { humidity: "wet", text: m }
  ];
  return /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
    /* @__PURE__ */ g.jsx(
      "div",
      {
        className: `cleaning-mode-modal__slider-container ${f ? "cleaning-mode-modal__slider-container--disabled" : ""}`,
        children: /* @__PURE__ */ g.jsxs("div", { className: "cleaning-mode-modal__slider-wrapper", children: [
          /* @__PURE__ */ g.jsx(
            "input",
            {
              type: "range",
              min: y,
              max: S,
              value: p,
              onChange: R,
              onMouseUp: D,
              onTouchEnd: D,
              disabled: f,
              className: "cleaning-mode-modal__slider",
              style: {
                background: `linear-gradient(${Y}, var(--accent-bg-secondary) 0%, var(--accent-bg-secondary) ${k}%, var(--accent-bg-secondary-hover) ${k}%, var(--accent-bg-secondary-hover) 100%)`
              }
            }
          ),
          /* @__PURE__ */ g.jsx(
            "div",
            {
              className: "cleaning-mode-modal__slider-tooltip",
              style: v ? { right: z } : { left: z },
              children: p
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ g.jsx("div", { className: "cleaning-mode-modal__slider-labels", children: L.map(({ humidity: H, text: X }) => /* @__PURE__ */ g.jsx(
      "span",
      {
        className: `cleaning-mode-modal__slider-label cleaning-mode-modal__slider-label--${Tt(i) === H ? "active" : "inactive"}`,
        children: X
      },
      H
    )) })
  ] });
}
function hz({
  waterVolume: n,
  waterVolumeList: i,
  onSelect: o,
  entityId: l,
  t: s,
  disabled: d = !1
}) {
  return /* @__PURE__ */ g.jsx("div", { className: `cleaning-mode-modal__power-grid ${d ? "cleaning-mode-modal__power-grid--disabled" : ""}`, children: i.map((m) => /* @__PURE__ */ g.jsxs("div", { className: "cleaning-mode-modal__power-option", children: [
    /* @__PURE__ */ g.jsx(
      Fa,
      {
        size: "small",
        selected: m === n,
        onClick: () => !d && o(l, m),
        icon: XS(),
        disabled: d
      }
    ),
    /* @__PURE__ */ g.jsx("span", { className: "cleaning-mode-modal__power-label", children: $S(m, s) })
  ] }, m)) });
}
function vz({
  mopPadHumidity: n,
  mopPadHumidityList: i,
  onSelect: o,
  entityId: l,
  t: s,
  disabled: d = !1
}) {
  return /* @__PURE__ */ g.jsx("div", { className: `cleaning-mode-modal__power-grid ${d ? "cleaning-mode-modal__power-grid--disabled" : ""}`, children: i.map((m) => /* @__PURE__ */ g.jsxs("div", { className: "cleaning-mode-modal__power-option", children: [
    /* @__PURE__ */ g.jsx(
      Fa,
      {
        size: "small",
        selected: m === n,
        onClick: () => !d && o(l, m),
        icon: PS(),
        disabled: d
      }
    ),
    /* @__PURE__ */ g.jsx("span", { className: "cleaning-mode-modal__power-label", children: IS(m, s) })
  ] }, m)) });
}
function yz(n, i) {
  if (!i) return qn(n);
  const o = `mop_washing_frequency.${Tt(n)}`, l = i(o);
  return l === o ? qn(n) : l;
}
function bz({
  selfCleanFrequency: n,
  selfCleanFrequencyList: i,
  selfCleanArea: o,
  selfCleanAreaMin: l,
  selfCleanAreaMax: s,
  selfCleanTime: d,
  selfCleanTimeMin: m,
  selfCleanTimeMax: f,
  onSelectFrequency: p,
  onChangeArea: _,
  onChangeTime: v,
  frequencyEntityId: y,
  areaEntityId: S,
  timeEntityId: k,
  t: E,
  frequencyDisabled: z = !1,
  areaDisabled: R = !1,
  timeDisabled: D = !1
}) {
  const [Y, L] = C.useState(o), [H, X] = C.useState(d), ie = id(), $ = od();
  C.useEffect(() => {
    L(o);
  }, [o]), C.useEffect(() => {
    X(d);
  }, [d]);
  const V = Tt(n), F = V === "by_area", W = V === "by_time", ae = F || W, ce = F ? Y : H, Q = F ? l : m, ee = F ? s : f, J = (ce - Q) / (ee - Q) * 100, A = 20, I = `calc(${J}% + ${A / 2 - J * A / 100}px)`, ne = E ? E("units.minutes_short") : "m", ve = $ ? "to left" : "to right", ge = F ? R : D, T = (P) => {
    if (ge) return;
    const te = parseInt(P.target.value);
    F ? L(te) : X(te);
  }, Z = () => {
    ge || (F && Y !== o ? _(S, Y) : W && H !== d && v(k, H));
  };
  return /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
    /* @__PURE__ */ g.jsx(
      "div",
      {
        className: `cleaning-mode-modal__horizontal-scroll ${z ? "cleaning-mode-modal__horizontal-scroll--disabled" : ""}`,
        children: i.map((P) => /* @__PURE__ */ g.jsxs("div", { className: "cleaning-mode-modal__mode-option", children: [
          /* @__PURE__ */ g.jsx(
            Fa,
            {
              size: "small",
              selected: P === n,
              onClick: () => !z && p(y, P),
              icon: VS(P),
              disabled: z
            }
          ),
          /* @__PURE__ */ g.jsx("span", { className: "cleaning-mode-modal__mode-option-label", children: yz(P, E) })
        ] }, P))
      }
    ),
    ae && /* @__PURE__ */ g.jsx(
      "div",
      {
        className: `cleaning-mode-modal__slider-container ${ge ? "cleaning-mode-modal__slider-container--disabled" : ""}`,
        style: { marginTop: "1rem" },
        children: /* @__PURE__ */ g.jsxs("div", { className: "cleaning-mode-modal__slider-wrapper", children: [
          /* @__PURE__ */ g.jsx(
            "input",
            {
              type: "range",
              min: Q,
              max: ee,
              value: ce,
              onChange: T,
              onMouseUp: Z,
              onTouchEnd: Z,
              disabled: ge,
              className: "cleaning-mode-modal__slider",
              style: {
                background: `linear-gradient(${ve}, var(--accent-bg-secondary) 0%, var(--accent-bg-secondary) ${J}%, var(--accent-bg-secondary-hover) ${J}%, var(--accent-bg-secondary-hover) 100%)`
              }
            }
          ),
          /* @__PURE__ */ g.jsx(
            "div",
            {
              className: "cleaning-mode-modal__slider-tooltip",
              style: $ ? { right: I } : { left: I },
              children: F ? `${Y}${ie}` : `${H}${ne}`
            }
          )
        ] })
      }
    )
  ] });
}
function Sz(n, i) {
  const o = `cleaning_routes.${Tt(n)}`, l = i(o);
  return l === o ? qn(n) : l;
}
function kz({
  cleaningRoute: n,
  cleaningRouteList: i,
  onSelect: o,
  entityId: l,
  disabled: s = !1
}) {
  const { t: d } = De();
  return /* @__PURE__ */ g.jsx("div", { className: `cleaning-mode-modal__route-grid ${s ? "cleaning-mode-modal__route-grid--disabled" : ""}`, children: i.map((m) => /* @__PURE__ */ g.jsxs("div", { className: "cleaning-mode-modal__route-option", children: [
    /* @__PURE__ */ g.jsx(
      Fa,
      {
        size: "small",
        selected: m === n,
        onClick: () => !s && o(l, m),
        icon: qS(m),
        disabled: s
      }
    ),
    /* @__PURE__ */ g.jsx("span", { className: "cleaning-mode-modal__route-label", children: Sz(m, d) })
  ] }, m)) });
}
function Ez({
  cleaningMode: n,
  cleaningModeList: i,
  suctionLevel: o,
  suctionLevelList: l,
  wetnessLevel: s,
  mopPadHumidity: d,
  mopPadHumidityList: m,
  waterVolume: f,
  waterVolumeList: p,
  cleaningRoute: _,
  cleaningRouteList: v,
  maxSuctionPower: y,
  selfCleanArea: S,
  selfCleanFrequency: k,
  selfCleanFrequencyList: E,
  selfCleanAreaMin: z,
  selfCleanAreaMax: R,
  selfCleanTime: D,
  selfCleanTimeMin: Y,
  selfCleanTimeMax: L,
  onCleaningModeSelect: H,
  showOnlyCleaningModeSelector: X = !1
}) {
  const ie = ct(), $ = Vt(), { controls: V, phase: F, isCustomizedCleaning: W } = Xn(), { setSelectOption: ae, setSwitch: ce, setNumber: Q, setFanSpeed: ee } = rS(ie), J = rd(), { t: A } = De(), I = !!J.wetnessLevel, ne = !!J.mopPadHumidity, ve = !!J.waterVolume && !I && !ne, ge = !!J.selfCleanFrequency, T = !!J.cleaningRoute, Z = sn(ie, J.cleaningMode), P = F === "cleaning" || F === "paused", te = En($.attributes.suction_level_list), me = En($.attributes.fan_speed_list), fe = typeof $.attributes.fan_speed == "string" ? $.attributes.fan_speed : "", ye = xl(p, En($.attributes.water_volume_list)), Ge = xl(
    m,
    En($.attributes.mop_pad_humidity_list)
  ), Ne = xl(
    v,
    En($.attributes.cleaning_route_list)
  ), vt = xl(
    E,
    En($.attributes.self_clean_frequency_list)
  ), jt = H ?? ae, Xt = C.useCallback(
    (Ke, lt) => {
      P && !W ? ee($.entity_id, lt) : !P && J.suctionLevel && ae(J.suctionLevel, lt);
    },
    [P, W, ee, ae, $.entity_id, J.suctionLevel]
  ), dn = P || !X && Z.unavailable, ut = Tt(n) === "sweeping";
  return /* @__PURE__ */ g.jsxs("div", { className: "cleaning-mode-modal__content", children: [
    /* @__PURE__ */ g.jsxs("section", { className: "cleaning-mode-modal__section", children: [
      /* @__PURE__ */ g.jsx("h3", { className: "cleaning-mode-modal__section-title", children: A("custom_mode.cleaning_mode_title") }),
      J.cleaningMode && /* @__PURE__ */ g.jsx(
        _z,
        {
          cleaningMode: n,
          cleaningModeList: i,
          onSelect: jt,
          entityId: J.cleaningMode,
          t: A,
          customizeSelected: X,
          hideCustomize: P,
          disabled: dn
        }
      )
    ] }),
    !X && /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
      J.suctionLevel && /* @__PURE__ */ g.jsxs("section", { className: "cleaning-mode-modal__section", children: [
        /* @__PURE__ */ g.jsx("h3", { className: "cleaning-mode-modal__section-title", children: A("custom_mode.suction_power_title") }),
        /* @__PURE__ */ g.jsx(
          pz,
          {
            suctionLevel: o,
            suctionLevelList: l,
            attributeList: te,
            fanSpeedList: me,
            fanSpeed: fe,
            cleaning: P,
            maxSuctionPower: y,
            onSelectSuctionLevel: Xt,
            onToggleMaxPower: ce,
            suctionLevelEntityId: J.suctionLevel,
            maxSuctionPowerEntityId: J.maxSuctionPower ?? J.suctionLevel,
            maxPlusDescription: A("custom_mode.max_plus_description"),
            t: A,
            suctionLevelDisabled: !V.canChangeSuctionPower,
            maxPowerDisabled: !V.canToggleMaxPower,
            hideMaxPower: !J.maxSuctionPower
          }
        )
      ] }),
      ve && J.waterVolume && !ut && ye.options.length > 0 && /* @__PURE__ */ g.jsxs("section", { className: "cleaning-mode-modal__section", children: [
        /* @__PURE__ */ g.jsx("h3", { className: "cleaning-mode-modal__section-title", children: A("custom_mode.water_volume_title") }),
        /* @__PURE__ */ g.jsx(
          hz,
          {
            waterVolume: f,
            waterVolumeList: ye.options,
            onSelect: ae,
            entityId: J.waterVolume,
            t: A,
            disabled: !ye.clicksEnabled || !V.canChangeWetness
          }
        )
      ] }),
      I && J.wetnessLevel && !ut && /* @__PURE__ */ g.jsxs("section", { className: "cleaning-mode-modal__section", children: [
        /* @__PURE__ */ g.jsx("h3", { className: "cleaning-mode-modal__section-title", children: A("custom_mode.wetness_title") }),
        /* @__PURE__ */ g.jsx(
          gz,
          {
            wetnessLevel: s,
            mopPadHumidity: d,
            onChangeWetness: Q,
            entityId: J.wetnessLevel,
            slightlyDryLabel: A("custom_mode.slightly_dry"),
            moistLabel: A("custom_mode.moist"),
            wetLabel: A("custom_mode.wet"),
            disabled: !V.canChangeWetness
          }
        )
      ] }),
      ne && J.mopPadHumidity && !ut && Ge.options.length > 0 && /* @__PURE__ */ g.jsxs("section", { className: "cleaning-mode-modal__section", children: [
        /* @__PURE__ */ g.jsx("h3", { className: "cleaning-mode-modal__section-title", children: A("custom_mode.mop_pad_humidity_title") }),
        /* @__PURE__ */ g.jsx(
          vz,
          {
            mopPadHumidity: d,
            mopPadHumidityList: Ge.options,
            onSelect: ae,
            entityId: J.mopPadHumidity,
            t: A,
            disabled: !Ge.clicksEnabled || !V.canChangeWetness
          }
        )
      ] }),
      ge && J.selfCleanFrequency && J.selfCleanArea && J.selfCleanTime && vt.options.length > 0 && /* @__PURE__ */ g.jsxs("section", { className: "cleaning-mode-modal__section", children: [
        /* @__PURE__ */ g.jsx("h3", { className: "cleaning-mode-modal__section-title", children: A("custom_mode.mop_washing_frequency_title") }),
        /* @__PURE__ */ g.jsx(
          bz,
          {
            selfCleanFrequency: k,
            selfCleanFrequencyList: vt.options,
            selfCleanArea: S,
            selfCleanAreaMin: z,
            selfCleanAreaMax: R,
            selfCleanTime: D,
            selfCleanTimeMin: Y,
            selfCleanTimeMax: L,
            onSelectFrequency: ae,
            onChangeArea: Q,
            onChangeTime: Q,
            frequencyEntityId: J.selfCleanFrequency,
            areaEntityId: J.selfCleanArea,
            timeEntityId: J.selfCleanTime,
            t: A,
            frequencyDisabled: !vt.clicksEnabled || !V.canChangeMopFrequency,
            areaDisabled: !1,
            timeDisabled: !1
          }
        )
      ] }),
      T && J.cleaningRoute && Ne.options.length > 0 && /* @__PURE__ */ g.jsxs("section", { className: "cleaning-mode-modal__section", children: [
        /* @__PURE__ */ g.jsx("div", { className: "cleaning-mode-modal__section-header", children: /* @__PURE__ */ g.jsx("h3", { className: "cleaning-mode-modal__section-title", children: A("custom_mode.route_title") }) }),
        /* @__PURE__ */ g.jsx(
          kz,
          {
            cleaningRoute: _,
            cleaningRouteList: Ne.options,
            onSelect: ae,
            entityId: J.cleaningRoute,
            disabled: !Ne.clicksEnabled || !V.canChangeRoute
          }
        )
      ] })
    ] })
  ] });
}
const wz = {
  quiet: "Q",
  silent: "Q",
  standard: "S",
  strong: "P",
  powerful: "P",
  turbo: "P",
  max: "M"
};
function Tz(n) {
  return n ? wz[Tt(n)] ?? n.charAt(0).toUpperCase() : "-";
}
function xz(n) {
  return n === null || !Number.isFinite(n) ? "-" : n <= 1 ? "L" : n === 2 ? "M" : "H";
}
function zz({
  value: n,
  min: i,
  max: o,
  onChange: l,
  slightlyDryLabel: s,
  moistLabel: d,
  wetLabel: m,
  disabled: f = !1
}) {
  const [p, _] = C.useState(n), v = od();
  C.useEffect(() => {
    _(n);
  }, [n]);
  const y = (p - i) / (o - i) * 100, S = 20, k = `calc(${y}% + ${S / 2 - y * S / 100}px)`, E = (Y) => {
    f || _(parseInt(Y.target.value));
  }, z = () => {
    !f && p !== n && l(p);
  }, R = v ? "to left" : "to right", D = [
    { key: 1, text: s },
    { key: 2, text: d },
    { key: 3, text: m }
  ];
  return /* @__PURE__ */ g.jsxs("div", { className: `customize-mode__wetness-slider ${f ? "customize-mode__wetness-slider--disabled" : ""}`, children: [
    /* @__PURE__ */ g.jsx("div", { className: "cleaning-mode-modal__slider-container", children: /* @__PURE__ */ g.jsxs("div", { className: "cleaning-mode-modal__slider-wrapper", children: [
      /* @__PURE__ */ g.jsx(
        "input",
        {
          type: "range",
          min: i,
          max: o,
          step: 1,
          value: p,
          onChange: E,
          onMouseUp: z,
          onTouchEnd: z,
          disabled: f,
          className: "cleaning-mode-modal__slider",
          style: {
            background: `linear-gradient(${R}, var(--accent-bg-secondary) 0%, var(--accent-bg-secondary) ${y}%, var(--accent-bg-secondary-hover) ${y}%, var(--accent-bg-secondary-hover) 100%)`
          }
        }
      ),
      /* @__PURE__ */ g.jsx(
        "div",
        {
          className: "cleaning-mode-modal__slider-tooltip",
          style: v ? { right: k } : { left: k },
          children: p
        }
      )
    ] }) }),
    /* @__PURE__ */ g.jsx("div", { className: "cleaning-mode-modal__slider-labels", children: D.map(({ key: Y, text: L }) => /* @__PURE__ */ g.jsx(
      "span",
      {
        className: `cleaning-mode-modal__slider-label cleaning-mode-modal__slider-label--${p === Y ? "active" : "inactive"}`,
        onClick: () => !f && l(Y),
        style: { cursor: f ? "default" : "pointer" },
        children: L
      },
      Y
    )) })
  ] });
}
function Az({
  setting: n,
  setSuctionLevel: i,
  setWetnessLevel: o,
  setCleaningTimes: l,
  t: s
}) {
  return /* @__PURE__ */ g.jsxs("div", { className: "customize-mode__room-settings-content", children: [
    n.suctionLevelOptions.length > 0 && /* @__PURE__ */ g.jsxs("div", { className: "customize-mode__setting-group", children: [
      /* @__PURE__ */ g.jsx("span", { className: "customize-mode__setting-label", children: s("custom_mode.suction_power_title") }),
      /* @__PURE__ */ g.jsx("div", { className: "customize-mode__options", children: n.suctionLevelOptions.map((d) => /* @__PURE__ */ g.jsxs("div", { className: "customize-mode__option", children: [
        /* @__PURE__ */ g.jsx(
          Fa,
          {
            size: "small",
            selected: n.suctionLevel === d,
            onClick: () => i(n.roomId, d),
            icon: Pg(d)
          }
        ),
        /* @__PURE__ */ g.jsx("span", { className: "customize-mode__option-label", children: Xg(d, s) })
      ] }, d)) })
    ] }),
    n.wetnessLevel !== null && Number.isFinite(n.wetnessLevel) && /* @__PURE__ */ g.jsxs("div", { className: "customize-mode__setting-group", children: [
      /* @__PURE__ */ g.jsx("span", { className: "customize-mode__setting-label", children: s("custom_mode.wetness_title") }),
      /* @__PURE__ */ g.jsx(
        zz,
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
    n.cleaningTimesOptions.length > 0 && /* @__PURE__ */ g.jsxs("div", { className: "customize-mode__setting-group", children: [
      /* @__PURE__ */ g.jsx("span", { className: "customize-mode__setting-label", children: s("customize.cycles") }),
      /* @__PURE__ */ g.jsx("div", { className: "customize-mode__options customize-mode__options--pills", children: n.cleaningTimesOptions.map((d) => /* @__PURE__ */ g.jsx(
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
function Nz() {
  const { t: n } = De(), i = ct(), o = Gl(), { get: l } = cn(), s = Ah(o.map_entity, l("camera", "map"), i, o.entity), d = s ? YT(i, s, o.room_names) : [], { roomSettings: m, setSuctionLevel: f, setWetnessLevel: p, setCleaningTimes: _ } = mx({
    hass: i,
    vacuumEntityId: o.entity,
    rooms: d.map((v) => ({ id: v.id, name: v.name }))
  });
  return d.length === 0 ? /* @__PURE__ */ g.jsx("div", { className: "customize-mode", children: /* @__PURE__ */ g.jsx("div", { className: "customize-mode__empty", children: /* @__PURE__ */ g.jsx("p", { children: n("customize.no_rooms") }) }) }) : /* @__PURE__ */ g.jsx("div", { className: "customize-mode", children: /* @__PURE__ */ g.jsx("div", { className: "customize-mode__room-accordions", children: d.map((v) => {
    const y = m.get(v.id);
    if (!y) return null;
    const S = [];
    return y.suctionLevel && S.push(Tz(y.suctionLevel)), y.wetnessLevel !== null && Number.isFinite(y.wetnessLevel) && S.push(xz(y.wetnessLevel)), y.cleaningTimes && S.push(`${y.cleaningTimes}x`), /* @__PURE__ */ g.jsx(
      on,
      {
        title: v.name,
        icon: /* @__PURE__ */ g.jsx("span", { className: "customize-mode__badges", children: S.map((k, E) => /* @__PURE__ */ g.jsx("span", { className: "customize-mode__badge", children: k }, E)) }),
        children: /* @__PURE__ */ g.jsx(
          Az,
          {
            setting: y,
            setSuctionLevel: f,
            setWetnessLevel: p,
            setCleaningTimes: _,
            t: n
          }
        )
      },
      v.id
    );
  }) }) });
}
function Cz({ opened: n, onClose: i }) {
  const { t: o } = De(), l = Vt(), s = ct(), { phase: d } = Xn(), m = rd(), f = d === "cleaning" || d === "paused", p = (A) => Kl(A ? s.states[A] : void 0), _ = p(m.cleaningMode), v = p(m.suctionLevel), y = p(m.waterVolume), S = p(m.mopPadHumidity), k = p(m.cleaningRoute), E = p(m.selfCleanFrequency), z = _.value ?? tt(l.attributes.cleaning_mode, ""), R = v.value ?? "", D = tt(l.attributes.wetness_level, Kn.WETNESS_LEVEL), Y = y.value ?? "", L = k.value ?? "", H = tt(l.attributes.max_suction_power, Kn.MAX_SUCTION_POWER), X = tt(l.attributes.self_clean_area, Kn.SELF_CLEAN_AREA), ie = E.value ?? "", $ = S.value ?? "", V = tt(l.attributes.self_clean_area_min, Kn.SELF_CLEAN_AREA_MIN), F = tt(l.attributes.self_clean_area_max, Kn.SELF_CLEAN_AREA_MAX), W = tt(l.attributes.previous_self_clean_time, Kn.SELF_CLEAN_TIME), ae = tt(l.attributes.self_clean_time_min, Kn.SELF_CLEAN_TIME_MIN), ce = tt(l.attributes.self_clean_time_max, Kn.SELF_CLEAN_TIME_MAX), [Q, ee] = C.useState("standard"), J = [
    { value: "standard", label: o("cleaning_mode.custom") || "Standard" },
    { value: "room", label: o("customize.title") || "Room Customized" }
  ];
  return /* @__PURE__ */ g.jsx(Pl, { opened: n, onClose: i, children: /* @__PURE__ */ g.jsxs("div", { className: "cleaning-mode-modal", children: [
    /* @__PURE__ */ g.jsx("div", { className: "cleaning-mode-modal__header", children: /* @__PURE__ */ g.jsx(
      Wh,
      {
        value: Q,
        onChange: (A) => ee(A),
        options: J,
        disabled: f
      }
    ) }),
    /* @__PURE__ */ g.jsx("div", { className: "cleaning-mode-modal__content-wrapper", children: Q === "standard" ? /* @__PURE__ */ g.jsx(
      Ez,
      {
        cleaningMode: z,
        cleaningModeList: _.options,
        suctionLevel: R,
        suctionLevelList: v.options,
        wetnessLevel: D,
        mopPadHumidity: $,
        mopPadHumidityList: S.options,
        waterVolume: Y,
        waterVolumeList: y.options,
        cleaningRoute: L,
        cleaningRouteList: k.options,
        maxSuctionPower: H,
        selfCleanArea: X,
        selfCleanFrequency: ie,
        selfCleanFrequencyList: E.options,
        selfCleanAreaMin: V,
        selfCleanAreaMax: F,
        selfCleanTime: W,
        selfCleanTimeMin: ae,
        selfCleanTimeMax: ce
      }
    ) : /* @__PURE__ */ g.jsx(Nz, {}) })
  ] }) });
}
function Oz(n) {
  return !n || typeof n != "object" || Array.isArray(n) ? [] : Object.entries(n).flatMap(([i, o]) => {
    const l = Number(i);
    if (!Number.isSafeInteger(l) || l <= 0 || !o || typeof o != "object") return [];
    const s = "name" in o && typeof o.name == "string" ? o.name.trim() : "";
    return s ? [{ id: l, name: s }] : [];
  });
}
function Mz({ opened: n, onClose: i }) {
  const { t: o } = De(), l = Vt(), s = ct(), d = Oz(l.attributes.shortcuts), [m, f] = C.useState("list"), [p, _] = C.useState(null), [v, y] = C.useState(null), [S, k] = C.useState(""), [E, z] = C.useState(!1), [R, D] = C.useState(null), Y = C.useRef(null), L = sn(s, l.entity_id).disabled;
  C.useEffect(() => {
    if (v === null) return;
    const ee = (A) => {
      (!Y.current || !A.composedPath().includes(Y.current)) && y(null);
    }, J = (A) => {
      A.key === "Escape" && (A.preventDefault(), y(null));
    };
    return document.addEventListener("mousedown", ee), document.addEventListener("keydown", J, !0), () => {
      document.removeEventListener("mousedown", ee), document.removeEventListener("keydown", J, !0);
    };
  }, [v]);
  const H = () => {
    f("list"), _(null), y(null), k(""), z(!1), D(null), i();
  }, X = () => {
    E || (f("list"), _(null), k(""), D(null));
  }, ie = async (ee) => {
    if (!(L || E)) {
      _(ee), z(!0), D(null);
      try {
        await s.callService("dreame_vacuum", "vacuum_start_shortcut", {
          entity_id: l.entity_id,
          shortcut_id: ee.id
        }), H();
      } catch {
        D(o("shortcuts.action_failed")), z(!1);
      }
    }
  }, $ = (ee) => {
    _(ee), k(ee.name), y(null), D(null), f("rename");
  }, V = (ee) => {
    _(ee), y(null), D(null), f("delete");
  }, F = async (ee) => {
    ee.preventDefault();
    const J = S.trim();
    if (!(!p || !J || J === p.name || E)) {
      z(!0), D(null);
      try {
        await s.callService("dreame_vacuum", "vacuum_rename_shortcut", {
          entity_id: l.entity_id,
          shortcut_id: p.id,
          shortcut_name: J
        }), z(!1), X();
      } catch {
        D(o("shortcuts.action_failed")), z(!1);
      }
    }
  }, W = async () => {
    if (!(!p || E)) {
      z(!0), D(null);
      try {
        await s.callService("dreame_vacuum", "vacuum_delete_shortcut", {
          entity_id: l.entity_id,
          shortcut_id: p.id
        }), z(!1), X();
      } catch {
        D(o("shortcuts.action_failed")), z(!1);
      }
    }
  }, ae = o(m === "list" ? "shortcuts.title" : `shortcuts.${m}`), ce = S.trim(), Q = E || !ce || !p || ce === p.name || L;
  return /* @__PURE__ */ g.jsx(Pl, { opened: n, onClose: E ? () => {
  } : H, className: "shortcuts-modal-sheet", children: /* @__PURE__ */ g.jsxs("div", { className: "shortcuts-modal", children: [
    /* @__PURE__ */ g.jsxs("header", { className: "shortcuts-modal__header", children: [
      m !== "list" && /* @__PURE__ */ g.jsx(
        "button",
        {
          type: "button",
          className: "shortcuts-modal__back",
          onClick: X,
          disabled: E,
          "aria-label": o("shortcuts.cancel"),
          children: /* @__PURE__ */ g.jsx(Yb, {})
        }
      ),
      /* @__PURE__ */ g.jsxs("div", { children: [
        /* @__PURE__ */ g.jsx("h2", { className: "shortcuts-modal__title", children: ae }),
        m === "list" && d.length > 0 && /* @__PURE__ */ g.jsx("p", { className: "shortcuts-modal__count", children: o("shortcuts.count", { count: d.length }) })
      ] })
    ] }),
    m === "list" && d.length === 0 ? /* @__PURE__ */ g.jsxs("div", { className: "shortcuts-modal__empty", children: [
      /* @__PURE__ */ g.jsx("p", { children: o("shortcuts.no_shortcuts") }),
      /* @__PURE__ */ g.jsx("p", { className: "shortcuts-modal__empty-hint", children: o("shortcuts.create_hint") })
    ] }) : m === "list" ? /* @__PURE__ */ g.jsx("div", { className: "shortcuts-modal__grid", children: d.map((ee) => /* @__PURE__ */ g.jsxs("article", { className: "shortcuts-modal__card", children: [
      /* @__PURE__ */ g.jsxs("div", { className: "shortcuts-modal__menu-wrapper", ref: v === ee.id ? Y : void 0, children: [
        /* @__PURE__ */ g.jsx(
          "button",
          {
            type: "button",
            className: "shortcuts-modal__menu-toggle",
            onClick: () => y((J) => J === ee.id ? null : ee.id),
            disabled: L || E,
            "aria-label": o("shortcuts.manage", { name: ee.name }),
            "aria-expanded": v === ee.id,
            children: /* @__PURE__ */ g.jsx(s0, {})
          }
        ),
        v === ee.id && /* @__PURE__ */ g.jsxs("div", { className: "shortcuts-modal__menu", role: "menu", children: [
          /* @__PURE__ */ g.jsxs("button", { type: "button", role: "menuitem", onClick: () => $(ee), children: [
            /* @__PURE__ */ g.jsx(H0, {}),
            o("shortcuts.rename")
          ] }),
          /* @__PURE__ */ g.jsxs(
            "button",
            {
              type: "button",
              role: "menuitem",
              className: "shortcuts-modal__menu-delete",
              onClick: () => V(ee),
              children: [
                /* @__PURE__ */ g.jsx(Ou, {}),
                o("shortcuts.delete")
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ g.jsx("span", { className: "shortcuts-modal__card-icon", children: /* @__PURE__ */ g.jsx(Cu, {}) }),
      /* @__PURE__ */ g.jsx("h3", { className: "shortcuts-modal__card-name", children: ee.name }),
      /* @__PURE__ */ g.jsxs(
        "button",
        {
          type: "button",
          className: "shortcuts-modal__start",
          onClick: () => {
            ie(ee);
          },
          disabled: L || E,
          children: [
            /* @__PURE__ */ g.jsx(Cu, {}),
            E && p?.id === ee.id ? o("shortcuts.working") : o("shortcuts.start")
          ]
        }
      )
    ] }, ee.id)) }) : m === "rename" && p ? /* @__PURE__ */ g.jsxs("form", { className: "shortcuts-modal__form", onSubmit: (ee) => {
      F(ee);
    }, children: [
      /* @__PURE__ */ g.jsx("label", { htmlFor: "shortcut-name", children: o("shortcuts.name") }),
      /* @__PURE__ */ g.jsx(
        "input",
        {
          id: "shortcut-name",
          value: S,
          onChange: (ee) => k(ee.target.value),
          disabled: E,
          autoFocus: !0,
          maxLength: 100
        }
      ),
      R && /* @__PURE__ */ g.jsx("p", { className: "shortcuts-modal__error", children: R }),
      /* @__PURE__ */ g.jsxs("div", { className: "shortcuts-modal__form-actions", children: [
        /* @__PURE__ */ g.jsx("button", { type: "button", onClick: X, disabled: E, children: o("shortcuts.cancel") }),
        /* @__PURE__ */ g.jsx("button", { type: "submit", className: "shortcuts-modal__primary", disabled: Q, children: o(E ? "shortcuts.working" : "shortcuts.save") })
      ] })
    ] }) : p ? /* @__PURE__ */ g.jsxs("div", { className: "shortcuts-modal__confirmation", children: [
      /* @__PURE__ */ g.jsx("span", { className: "shortcuts-modal__confirmation-icon", children: /* @__PURE__ */ g.jsx(Ou, {}) }),
      /* @__PURE__ */ g.jsx("p", { children: o("shortcuts.delete_confirmation", { name: p.name }) }),
      R && /* @__PURE__ */ g.jsx("p", { className: "shortcuts-modal__error", children: R }),
      /* @__PURE__ */ g.jsxs("div", { className: "shortcuts-modal__form-actions", children: [
        /* @__PURE__ */ g.jsx("button", { type: "button", onClick: X, disabled: E, children: o("shortcuts.cancel") }),
        /* @__PURE__ */ g.jsx(
          "button",
          {
            type: "button",
            className: "shortcuts-modal__danger",
            onClick: () => {
              W();
            },
            disabled: E || L,
            children: o(E ? "shortcuts.working" : "shortcuts.delete")
          }
        )
      ] })
    ] }) : null,
    m === "list" && R && /* @__PURE__ */ g.jsx("p", { className: "shortcuts-modal__error", children: R }),
    m === "list" && L && /* @__PURE__ */ g.jsx("p", { className: "shortcuts-modal__disabled", children: o("shortcuts.unavailable") })
  ] }) });
}
function Rz({ definition: n, isChild: i = !1, label: o }) {
  const { t: l } = De(), s = Io(n, o), d = ct(), { get: m } = cn(), f = m(n.platform, n.key), p = sn(d, f), _ = C.useCallback(
    (v) => {
      f && d.callService("switch", v ? "turn_on" : "turn_off", {
        entity_id: f
      });
    },
    [f, d]
  );
  return !f || p.disabled ? null : /* @__PURE__ */ g.jsxs("div", { className: `entity-item ${i ? "entity-item--child" : ""}`, children: [
    /* @__PURE__ */ g.jsxs("div", { className: "entity-item__info", children: [
      /* @__PURE__ */ g.jsx("span", { className: "entity-item__label", children: s }),
      n.descriptionKey && /* @__PURE__ */ g.jsx("span", { className: "entity-item__description", children: l(n.descriptionKey) })
    ] }),
    /* @__PURE__ */ g.jsx(Jh, { checked: p.isOn, disabled: p.unavailable, onChange: _ })
  ] });
}
function Dz({ definition: n, isChild: i = !1, label: o }) {
  const { t: l } = De(), s = Io(n, o), d = ct(), { get: m } = cn(), f = m(n.platform, n.key), p = sn(d, f), { value: _, options: v } = Kl(p.entity);
  function y(k) {
    f && d.callService("select", "select_option", {
      entity_id: f,
      option: k
    });
  }
  if (!f || p.disabled || v.length === 0) return null;
  const S = _ ?? "";
  if (n.useSegmentedControl) {
    const k = v.map((E) => ({
      value: E,
      label: qn(E)
    }));
    return /* @__PURE__ */ g.jsxs("div", { className: `entity-item entity-item--segmented ${i ? "entity-item--child" : ""}`, children: [
      /* @__PURE__ */ g.jsxs("div", { className: "entity-item__info", children: [
        /* @__PURE__ */ g.jsx("span", { className: "entity-item__label", children: s }),
        n.descriptionKey && /* @__PURE__ */ g.jsx("span", { className: "entity-item__description", children: l(n.descriptionKey) })
      ] }),
      /* @__PURE__ */ g.jsx(
        Wh,
        {
          options: k,
          value: S,
          onChange: y,
          disabled: p.unavailable
        }
      )
    ] });
  }
  return /* @__PURE__ */ g.jsxs("div", { className: `entity-item entity-item--select ${i ? "entity-item--child" : ""}`, children: [
    /* @__PURE__ */ g.jsxs("div", { className: "entity-item__info", children: [
      /* @__PURE__ */ g.jsx("span", { className: "entity-item__label", children: s }),
      n.descriptionKey && /* @__PURE__ */ g.jsx("span", { className: "entity-item__description", children: l(n.descriptionKey) })
    ] }),
    /* @__PURE__ */ g.jsx(
      "select",
      {
        className: "entity-item__select",
        value: S,
        disabled: p.unavailable,
        onChange: (k) => y(k.target.value),
        children: v.map((k) => /* @__PURE__ */ g.jsx("option", { value: k, children: qn(k) }, k))
      }
    )
  ] });
}
function Cl(n) {
  if (typeof n == "number") return Number.isFinite(n) ? n : null;
  if (typeof n != "string" || n.trim() === "") return null;
  const i = Number(n);
  return Number.isFinite(i) ? i : null;
}
function jz({ definition: n, isChild: i = !1, label: o }) {
  const { t: l } = De(), s = Io(n, o), d = ct(), { get: m } = cn(), f = m(n.platform, n.key), p = sn(d, f), _ = Cl(p.state), v = n.min ?? Cl(p.attributes.min) ?? 0, y = n.max ?? Cl(p.attributes.max) ?? 100, S = n.step ?? Cl(p.attributes.step) ?? 1, [k, E] = C.useState(_ ?? v), [z, R] = C.useState(_);
  Object.is(_, z) || (R(_), E(_ ?? v));
  const D = C.useCallback(() => {
    !f || _ === null || k === _ || d.callService("number", "set_value", {
      entity_id: f,
      value: k
    });
  }, [f, d, k, _]);
  if (!f || p.disabled) return null;
  const Y = n.renderHint ?? "slider", L = Y === "volume" ? "entity-item__slider--volume" : Y === "brightness" ? "entity-item__slider--brightness" : "";
  return /* @__PURE__ */ g.jsxs("div", { className: `entity-item entity-item--slider ${i ? "entity-item--child" : ""}`, children: [
    /* @__PURE__ */ g.jsxs("div", { className: "entity-item__info", children: [
      /* @__PURE__ */ g.jsx("span", { className: "entity-item__label", children: s }),
      n.descriptionKey && /* @__PURE__ */ g.jsx("span", { className: "entity-item__description", children: l(n.descriptionKey) })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: `entity-item__slider-container ${L}`, children: [
      /* @__PURE__ */ g.jsx(
        "input",
        {
          type: "range",
          className: "entity-item__slider",
          min: v,
          max: y,
          step: S,
          value: k,
          disabled: p.unavailable || _ === null,
          onChange: (H) => E(Number(H.target.value)),
          onMouseUp: D,
          onTouchEnd: D,
          onKeyUp: D,
          onBlur: D
        }
      ),
      /* @__PURE__ */ g.jsxs("span", { className: "entity-item__slider-value", children: [
        Math.round(k),
        Y === "volume" || Y === "brightness" ? "%" : ""
      ] })
    ] })
  ] });
}
function Lz({ definition: n, isChild: i = !1, buttonLabel: o, label: l }) {
  const { t: s } = De(), d = Io(n, l), m = ct(), { get: f } = cn(), { armedKey: p, tap: _ } = Oh(), v = f(n.platform, n.key), y = sn(m, v), S = C.useCallback(() => {
    v && m.callService("button", "press", {
      entity_id: v
    });
  }, [v, m]);
  if (!v || y.disabled) return null;
  const k = p === v, E = n.confirm ? () => _(v, S) : S;
  return /* @__PURE__ */ g.jsxs("div", { className: `entity-item ${i ? "entity-item--child" : ""}`, children: [
    /* @__PURE__ */ g.jsxs("div", { className: "entity-item__info", children: [
      /* @__PURE__ */ g.jsx("span", { className: "entity-item__label", children: d }),
      n.descriptionKey && /* @__PURE__ */ g.jsx("span", { className: "entity-item__description", children: s(n.descriptionKey) })
    ] }),
    /* @__PURE__ */ g.jsx(
      "button",
      {
        className: `entity-item__button ${k ? "entity-item__button--armed" : ""}`,
        disabled: y.unavailable,
        onClick: E,
        children: k ? s("common.confirm_tap") : o ?? s("common.run")
      }
    )
  ] });
}
const Uz = /^\d{2}:\d{2}/;
function Yz({ definition: n, isChild: i = !1, label: o }) {
  const { t: l } = De(), s = Io(n, o), d = ct(), { get: m } = cn(), f = m(n.platform, n.key), p = sn(d, f), _ = p.state?.match(Uz)?.[0] ?? "", v = C.useCallback(
    (y) => {
      f && d.callService("time", "set_value", {
        entity_id: f,
        time: y
      });
    },
    [f, d]
  );
  return !f || p.disabled ? null : /* @__PURE__ */ g.jsxs("div", { className: `entity-item entity-item--time ${i ? "entity-item--child" : ""}`, children: [
    /* @__PURE__ */ g.jsxs("div", { className: "entity-item__info", children: [
      /* @__PURE__ */ g.jsx("span", { className: "entity-item__label", children: s }),
      n.descriptionKey && /* @__PURE__ */ g.jsx("span", { className: "entity-item__description", children: l(n.descriptionKey) })
    ] }),
    /* @__PURE__ */ g.jsx(
      "input",
      {
        type: "time",
        className: "entity-item__time-input",
        value: _,
        disabled: p.unavailable,
        onChange: (y) => v(y.target.value)
      }
    )
  ] });
}
function ev({ definition: n, isChild: i = !1, label: o }) {
  const l = ct(), { get: s } = cn();
  if (n.parentKey && sn(l, s("switch", n.parentKey)).isOn === !!n.parentOff)
    return null;
  const d = i || !!n.parentKey;
  switch (n.platform) {
    case "switch":
      return /* @__PURE__ */ g.jsx(Rz, { definition: n, isChild: d, label: o });
    case "select":
      return /* @__PURE__ */ g.jsx(Dz, { definition: n, isChild: d, label: o });
    case "number":
      return /* @__PURE__ */ g.jsx(jz, { definition: n, isChild: d, label: o });
    case "button":
      return /* @__PURE__ */ g.jsx(Lz, { definition: n, isChild: d, label: o });
    case "time":
      return /* @__PURE__ */ g.jsx(Yz, { definition: n, isChild: d, label: o });
    default:
      return null;
  }
}
function Vn({ section: n, className: i }) {
  return /* @__PURE__ */ g.jsx("div", { className: `data-driven-section ${i ?? ""}`, children: n.entities.map((o) => /* @__PURE__ */ g.jsx(ev, { definition: o }, o.key)) });
}
function Hz() {
  return /* @__PURE__ */ g.jsx(Vn, { section: Wu, className: "ai-detection-section" });
}
function Zz() {
  return /* @__PURE__ */ g.jsx(Vn, { section: Pu, className: "carpet-settings-section" });
}
const Bz = [
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
function tv(n) {
  return Bz.filter((i) => {
    const o = n[i.percentKey];
    return o != null;
  });
}
function Gz() {
  const { t: n } = De(), i = Vt(), o = ct(), { armedKey: l, tap: s } = Oh(), d = i.attributes, m = C.useCallback(
    (p) => {
      o.callService("botslab_vacuum", "reset_consumable", {
        entity_id: i.entity_id,
        consumable_type: p,
        consumable: p
      });
    },
    [o, i.entity_id]
  ), f = (p) => p >= 50 ? "var(--consumable-good, #34c759)" : p >= 20 ? "var(--consumable-warning, #ff9500)" : "var(--consumable-critical, #ff3b30)";
  return /* @__PURE__ */ g.jsx("div", { className: "consumables-section", children: tv(d).map((p) => {
    const _ = tt(d[p.percentKey] ?? d[`${p.key}_life_pct`], 0), v = Math.min(100, Math.max(0, _)), y = tt(
      d[p.hoursKey] ?? d[`${p.key}_left_hours`] ?? d[`${p.key}_time_left`],
      0
    ), S = f(v), k = l === p.key;
    return /* @__PURE__ */ g.jsxs("div", { className: "consumables-section__item", children: [
      /* @__PURE__ */ g.jsxs("div", { className: "consumables-section__info", children: [
        /* @__PURE__ */ g.jsx("span", { className: "consumables-section__label", children: n(p.labelKey) }),
        /* @__PURE__ */ g.jsxs("span", { className: "consumables-section__stats", children: [
          v,
          "% · ",
          y,
          "h ",
          n("settings.consumables.remaining")
        ] })
      ] }),
      /* @__PURE__ */ g.jsx("div", { className: "consumables-section__progress", children: /* @__PURE__ */ g.jsx(
        "div",
        {
          className: "consumables-section__progress-bar",
          style: {
            width: `${v}%`,
            backgroundColor: S
          }
        }
      ) }),
      /* @__PURE__ */ g.jsx(
        "button",
        {
          className: `consumables-section__reset ${k ? "consumables-section__reset--armed" : ""}`,
          onClick: () => s(p.key, () => m(p.consumableKey)),
          type: "button",
          children: n(k ? "common.confirm_tap" : "settings.consumables.reset")
        }
      )
    ] }, p.key);
  }) });
}
function Kz() {
  const { t: n } = De(), i = id(), l = Vt().attributes, s = l.firmware_version ?? l.sw_version ?? l.version, d = El(s) || Go(s) ? s : "-", m = tt(l.total_cleaned_area ?? l.total_cleaning_area_sqm, 0), f = tt(l.total_cleaning_time ?? l.total_cleaning_time_minutes, 0), p = tt(l.cleaning_count ?? l.tasks_total_count, 0), _ = l.ap && typeof l.ap == "object" ? l.ap : void 0, v = _?.ssid && _.ssid !== "-" ? _.ssid : l.wifi_ssid ?? l.ssid ?? "-", y = El(v) || Go(v) ? v : "-", S = _?.rssi !== void 0 && _.rssi !== "-" ? _.rssi : l.wifi_rssi ?? l.rssi ?? "-", k = El(S) || Go(S) ? S : "-", E = _?.ip && _.ip !== "-" ? _.ip : l.ip_address ?? l.ip ?? "-", z = El(E) || Go(E) ? E : "-", R = k !== "-" && k !== "" && k !== void 0 && k !== null, D = [
    { labelKey: "settings.device_info.firmware", value: d },
    { labelKey: "settings.device_info.total_area", value: m, unit: i },
    { labelKey: "settings.device_info.total_time", value: f, unit: n("units.minutes") },
    { labelKey: "settings.device_info.total_cleans", value: p },
    { labelKey: "settings.device_info.wifi_ssid", value: y },
    { labelKey: "settings.device_info.wifi_signal", value: k, unit: R ? n("units.decibels") : void 0 },
    { labelKey: "settings.device_info.ip_address", value: z }
  ];
  return /* @__PURE__ */ g.jsx("div", { className: "device-info-section", children: D.map((Y) => /* @__PURE__ */ g.jsxs("div", { className: "device-info-section__item", children: [
    /* @__PURE__ */ g.jsx("span", { className: "device-info-section__label", children: n(Y.labelKey) }),
    /* @__PURE__ */ g.jsxs("span", { className: "device-info-section__value", children: [
      Y.value,
      Y.unit && ` ${Y.unit}`
    ] })
  ] }, Y.labelKey)) });
}
function qz() {
  return /* @__PURE__ */ g.jsx(Vn, { section: Ju, className: "dock-settings-section" });
}
function Vz() {
  return /* @__PURE__ */ g.jsx(Vn, { section: Fu, className: "edge-corner-section" });
}
function Xz() {
  return /* @__PURE__ */ g.jsx(Vn, { section: Iu, className: "floor-settings-section" });
}
function $z() {
  return /* @__PURE__ */ g.jsx(Vn, { section: ed, className: "map-settings-section" });
}
function Pz() {
  return /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
    /* @__PURE__ */ g.jsx(Vn, { section: Xu, className: "quick-settings-section" }),
    /* @__PURE__ */ g.jsx(
      Vn,
      {
        section: $u,
        className: "quick-settings-section quick-settings-section--actions"
      }
    )
  ] });
}
function Iz() {
  return /* @__PURE__ */ g.jsx(Vn, { section: Qu, className: "volume-section" });
}
function Gn(n, i) {
  return n.entities.some((o) => i(o.platform, o.key));
}
function Fz({ opened: n, onClose: i }) {
  const { t: o } = De(), l = Vt(), { status: s, get: d, extras: m } = cn(), f = s === "ready";
  return /* @__PURE__ */ g.jsx(Pl, { opened: n, onClose: i, children: /* @__PURE__ */ g.jsxs("div", { className: "settings-panel", children: [
    /* @__PURE__ */ g.jsx("h2", { className: "settings-panel__title", children: o("settings.title") }),
    /* @__PURE__ */ g.jsx("div", { className: "settings-panel__scroll-wrapper", children: /* @__PURE__ */ g.jsxs("div", { className: "settings-panel__sections", children: [
      tv(l.attributes).length > 0 && /* @__PURE__ */ g.jsx(on, { title: o("settings.consumables.title"), icon: /* @__PURE__ */ g.jsx(_0, {}), children: /* @__PURE__ */ g.jsx(Gz, {}) }),
      f && (Gn(Xu, d) || Gn($u, d)) && /* @__PURE__ */ g.jsx(on, { title: o("settings.quick_settings.title"), icon: /* @__PURE__ */ g.jsx(P0, {}), children: /* @__PURE__ */ g.jsx(Pz, {}) }),
      f && Gn(Pu, d) && /* @__PURE__ */ g.jsx(on, { title: o("settings.carpet.title"), icon: /* @__PURE__ */ g.jsx(k0, {}), children: /* @__PURE__ */ g.jsx(Zz, {}) }),
      f && Gn(Iu, d) && /* @__PURE__ */ g.jsx(on, { title: o("settings.floor.title"), icon: /* @__PURE__ */ g.jsx(m0, {}), children: /* @__PURE__ */ g.jsx(Xz, {}) }),
      f && Gn(Fu, d) && /* @__PURE__ */ g.jsx(on, { title: o("settings.edge_corner.title"), icon: /* @__PURE__ */ g.jsx(t0, {}), children: /* @__PURE__ */ g.jsx(Vz, {}) }),
      f && Gn(Qu, d) && /* @__PURE__ */ g.jsx(on, { title: o("settings.volume.title"), icon: /* @__PURE__ */ g.jsx(h1, {}), children: /* @__PURE__ */ g.jsx(Iz, {}) }),
      f && Gn(Ju, d) && /* @__PURE__ */ g.jsx(on, { title: o("settings.dock.title"), icon: /* @__PURE__ */ g.jsx(a0, {}), children: /* @__PURE__ */ g.jsx(qz, {}) }),
      f && Gn(Wu, d) && /* @__PURE__ */ g.jsx(on, { title: o("settings.ai_detection.title"), icon: /* @__PURE__ */ g.jsx(Fb, {}), children: /* @__PURE__ */ g.jsx(Hz, {}) }),
      f && Gn(ed, d) && /* @__PURE__ */ g.jsx(on, { title: o("settings.map.title"), icon: /* @__PURE__ */ g.jsx(Vu, {}), children: /* @__PURE__ */ g.jsx($z, {}) }),
      m.length > 0 && /* @__PURE__ */ g.jsx(on, { title: o("settings.more.title"), icon: /* @__PURE__ */ g.jsx(u0, {}), children: m.map((p) => /* @__PURE__ */ g.jsx(
        ev,
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
      /* @__PURE__ */ g.jsx(on, { title: o("settings.device_info.title"), icon: /* @__PURE__ */ g.jsx(b0, {}), children: /* @__PURE__ */ g.jsx(Kz, {}) })
    ] }) })
  ] }) });
}
function Qz({ selectedRooms: n }) {
  const { t: i } = De();
  if (n.size === 0)
    return null;
  const o = Array.from(n.values()).join(", ");
  return /* @__PURE__ */ g.jsxs("div", { className: "room-selection-display", children: [
    /* @__PURE__ */ g.jsx("span", { className: "room-selection-display__label", children: i("room_display.selected_label") }),
    /* @__PURE__ */ g.jsx("span", { className: "room-selection-display__rooms", children: o })
  ] });
}
function Nu(n, i, o) {
  const l = Kl(i ? n.states[i] : void 0).value;
  return l || (typeof o == "string" ? o : "");
}
function Jz({
  onClick: n,
  onShortcutsClick: i,
  onRepeatClick: o,
  repeatCount: l
}) {
  const s = ct(), d = Vt(), m = rd();
  return /* @__PURE__ */ g.jsx(
    bx,
    {
      cleanGeniusMode: Nu(s, m.cleangeniusMode, d.attributes.cleangenius_mode),
      cleaningMode: Nu(s, m.cleaningMode, d.attributes.cleaning_mode),
      cleangenius: Nu(s, m.cleangenius, d.attributes.cleangenius),
      onClick: n,
      onShortcutsClick: i,
      onRepeatClick: o,
      repeatCount: l
    }
  );
}
function Wz({ hass: n, config: i }) {
  const o = n.states[i.entity], l = mS(n, i.entity);
  pe.debug("DreameVacuumCard", "Loaded entity", o);
  const s = wS(i.language, n.language), d = Zg(s), { t: m } = De(s), [f, p] = C.useState(null), [_, v] = C.useState(null), [y, S] = C.useState(null), {
    selectedMode: k,
    areaSelectionMode: E,
    selectedRooms: z,
    selectedZones: R,
    modalOpened: D,
    shortcutsModalOpened: Y,
    settingsPanelOpened: L,
    repeatCount: H,
    setSelectedMode: X,
    setSelectedRooms: ie,
    setSelectedZones: $,
    setModalOpened: V,
    setShortcutsModalOpened: F,
    setSettingsPanelOpened: W,
    handleModeChange: ae,
    handleAreaSelectionModeChange: ce,
    handleRoomToggle: Q,
    cycleRepeatCount: ee,
    resetRepeatCount: J
  } = yS({ vacuumEntityId: i.entity, defaultMode: i.default_mode }), A = Ah(i.map_entity, l.get("camera", "map")), I = A ? n.states[A]?.attributes : void 0, ne = IT(o?.attributes.selected_map_id, I, _), ve = ne.floorReady && ne.imageReady;
  f && ne.imageKey !== _ && p(null);
  const ge = hx({
    hass: n,
    mapEntityId: A,
    imageWidth: f?.width ?? 0,
    imageHeight: f?.height ?? 0,
    roomNames: i.room_names
  }), T = ve ? ge : { rooms: [], rotation: ge.rotation, transform: null }, Z = o ? o.state === "cleaning" || tt(o.attributes.started, !1) : !1, P = o ? o.attributes.segment_cleaning === !0 : !1, te = C.useRef(void 0);
  C.useEffect(() => {
    const $t = te.current !== void 0 && te.current !== ne.floorId;
    (te.current === void 0 || $t) && (te.current = ne.floorId);
    const xt = BT(n, i.entity, A, i.room_names), yt = QT({
      floorChanged: $t,
      mapReady: ve,
      isSegmentCleaning: P,
      selectedRooms: z,
      activeSegments: xt
    });
    yt.clearZone && $([]), yt.rooms && (pe.debug("DreameVacuumCard", "Updating room selection for the current floor", [...yt.rooms.keys()]), ie(yt.rooms)), yt.selectRoomMode && X("room");
  }, [
    ne.floorId,
    ve,
    P,
    n,
    i.entity,
    i.room_names,
    A,
    z,
    ie,
    $,
    X
  ]), C.useEffect(() => {
    Z || J();
  }, [Z, J]);
  const { toast: me, showToast: fe, hideToast: ye } = HS(), { handlePause: Ge, handleResume: Ne, handleStop: vt, handleDock: jt, handleClean: Xt, handleSaveNoGoZone: dn } = YS({
    hass: n,
    entityId: i.entity,
    mapEntityId: A,
    mapTransform: T.transform,
    onSuccess: fe,
    onError: fe
  }), ut = C.useCallback(
    ($t, xt) => {
      const yt = z.has($t);
      Q($t, xt), fe(
        yt ? m("toast.deselected_room", { name: xt }) : m("toast.selected_room", { name: xt })
      );
    },
    [z, Q, fe, m]
  ), Ke = C.useRef(!1), lt = C.useCallback(async () => {
    if (!Ke.current) {
      Ke.current = !0;
      try {
        if (k === "zone" && (E === "no_go" || E === "no_mop")) {
          const xt = E === "no_mop" ? "mop" : "forbid";
          await dn(
            R,
            f?.width ?? 0,
            f?.height ?? 0,
            xt
          ) && $([]);
          return;
        }
        let $t;
        if (k === "room") {
          const xt = Zu(i.entity), yt = {};
          for (const nr of z.keys()) {
            const mn = xt[nr];
            mn && (yt[String(nr)] = {
              fan_speed: mn.suctionLevel,
              water_level: mn.wetnessLevel === 1 ? "low" : mn.wetnessLevel === 2 ? "medium" : "high",
              repeat_times: Number(mn.cleaningTimes || 1)
            });
          }
          Object.keys(yt).length > 0 && ($t = yt);
        }
        await Xt(
          k,
          z,
          R,
          f?.width,
          f?.height,
          H,
          $t
        );
      } finally {
        Ke.current = !1;
      }
    }
  }, [
    k,
    E,
    z,
    R,
    f,
    H,
    i.entity,
    Xt,
    dn,
    $
  ]), Il = C.useCallback(() => W(!0), [W]), er = C.useCallback(() => W(!1), [W]), Gi = C.useCallback(() => V(!0), [V]), Ki = C.useCallback(() => V(!1), [V]), qi = C.useCallback(() => F(!0), [F]), Fl = C.useCallback(() => F(!1), [F]), Ql = C.useCallback(
    ($t, xt, yt) => {
      yt === ne.imageToken && (v(ne.imageKey), p({ width: $t, height: xt }));
    },
    [ne.imageToken, ne.imageKey]
  );
  if (!o)
    return /* @__PURE__ */ g.jsx("div", { className: "dreame-vacuum-card__error", children: m("errors.entity_not_found", { entity: i.entity }) });
  if (o.state === "unavailable" || o.state === "unknown")
    return /* @__PURE__ */ g.jsx("div", { className: "dreame-vacuum-card__error dreame-vacuum-card__error--unavailable", children: m("errors.entity_unavailable") });
  const St = i.title || o.attributes.friendly_name || "Dreame Vacuum", Jl = ZT(o, k), Vi = typeof i.map_height == "number" ? `${i.map_height}px` : i.map_height, tr = (o.attributes.capabilities ?? []).includes(nS.SHORTCUTS), xa = JT({
    hasCamera: !!(A && n.states[A]),
    imageFailed: ne.imageToken !== null && y === ne.imageToken,
    floorReady: ne.floorReady,
    imageReady: ne.imageReady,
    roomCount: T.rooms.length,
    hasTransform: T.transform !== null
  });
  return /* @__PURE__ */ g.jsx(lx, { hass: n, entity: o, config: i, language: s, deviceEntities: l, children: /* @__PURE__ */ g.jsxs(
    "div",
    {
      className: "dreame-vacuum-card",
      dir: d ? "rtl" : "ltr",
      style: Vi ? { "--map-max-height": Vi } : void 0,
      children: [
        /* @__PURE__ */ g.jsxs("div", { className: "dreame-vacuum-card__container", children: [
          /* @__PURE__ */ g.jsxs("div", { className: "dreame-vacuum-card__header", children: [
            /* @__PURE__ */ g.jsx(vx, { deviceName: St, onSettingsClick: Il }),
            /* @__PURE__ */ g.jsx(yx, {}),
            l.status === "error" && /* @__PURE__ */ g.jsx("p", { className: "dreame-vacuum-card__diagnostic", children: m("errors.entity_discovery_failed") }),
            xa && /* @__PURE__ */ g.jsx("p", { className: "dreame-vacuum-card__diagnostic", children: m(`vacuum_map.diagnostic_${xa}`) })
          ] }),
          /* @__PURE__ */ g.jsx("div", { className: "dreame-vacuum-card__map", children: /* @__PURE__ */ g.jsx(
            nz,
            {
              mapEntityId: A,
              geometry: T,
              selectedMode: k,
              areaSelectionMode: E,
              selectedRooms: z,
              onRoomToggle: ut,
              zone: ve ? R : [],
              onZoneChange: $,
              onImageDimensionsChange: Ql,
              onImageError: S,
              defaultRoomView: i.default_room_view,
              onZoneDeleted: fe
            }
          ) }),
          /* @__PURE__ */ g.jsxs("div", { className: "dreame-vacuum-card__footer", children: [
            /* @__PURE__ */ g.jsx(
              Jz,
              {
                onClick: Gi,
                onShortcutsClick: tr ? qi : void 0,
                onRepeatClick: ee,
                repeatCount: H
              }
            ),
            /* @__PURE__ */ g.jsxs("div", { className: "dreame-vacuum-card__controls", children: [
              k === "room" && /* @__PURE__ */ g.jsx(Qz, { selectedRooms: z }),
              /* @__PURE__ */ g.jsx(
                az,
                {
                  selectedMode: Jl,
                  areaSelectionMode: E,
                  onModeChange: ae,
                  onAreaSelectionModeChange: ce
                }
              ),
              /* @__PURE__ */ g.jsx(
                fz,
                {
                  selectedMode: k,
                  areaSelectionMode: E,
                  selectedRoomsCount: z.size,
                  selectedZonesCount: R.length,
                  onClean: lt,
                  onPause: Ge,
                  onResume: Ne,
                  onStop: vt,
                  onDock: jt
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ g.jsx(Cz, { opened: D, onClose: Ki }),
        /* @__PURE__ */ g.jsx(Mz, { opened: Y, onClose: Fl }),
        /* @__PURE__ */ g.jsx(Fz, { opened: L, onClose: er }),
        me && /* @__PURE__ */ g.jsx(iz, { message: me, onClose: ye })
      ]
    }
  ) });
}
const eA = `.accordion{border-radius:.75rem;background:var(--card-bg, rgba(255, 255, 255, .8));overflow:hidden;margin-bottom:.5rem}.accordion__header{display:flex;align-items:center;justify-content:space-between;width:100%;padding:.875rem 1rem;background:none;border:none;cursor:pointer;color:var(--text-primary, #000);font-size:.9375rem;font-weight:500;text-align:left}[dir=rtl] .accordion__header{text-align:right}.accordion__header{transition:background-color .2s ease}.accordion__header:hover{background:var(--hover-bg, rgba(0, 0, 0, .03))}.accordion__header:active{background:var(--active-bg, rgba(0, 0, 0, .06))}.accordion__title-wrapper{display:flex;align-items:center;gap:.625rem}.accordion__icon{display:flex;align-items:center;justify-content:center;color:var(--accent-color, #007aff)}.accordion__icon svg{width:1.25rem;height:1.25rem}.accordion__title{font-weight:500}.accordion__chevron{width:1.25rem;height:1.25rem;color:var(--text-secondary, #666);transition:transform .3s ease}.accordion__content{max-height:0;overflow:hidden;transition:max-height .3s ease}.accordion__content-inner{padding:0 1rem 1rem}.accordion--open .accordion__chevron{transform:rotate(180deg)}.accordion--open .accordion__content{max-height:1000px}.toggle{position:relative;display:inline-block;width:3.1875rem;height:1.9375rem}.toggle__input{opacity:0;width:0;height:0}.toggle__slider{position:absolute;cursor:pointer;inset:0;background-color:var(--surface-tertiary, #e0e0e0);transition:.4s;border-radius:1.9375rem}.toggle__knob{position:absolute;height:1.6875rem;width:1.6875rem;left:.125rem}[dir=rtl] .toggle__knob{left:auto;right:.125rem}.toggle__knob{bottom:.125rem;background-color:var(--surface-bg, white);transition:.4s;border-radius:50%;box-shadow:0 .125rem .25rem var(--card-shadow, rgba(0, 0, 0, .2))}.toggle__input:checked+.toggle__slider{background-color:var(--toggle-active);border:.125rem solid var(--toggle-active-border);box-shadow:0 0 0 .25rem var(--toggle-active-shadow-color)}.toggle__input:checked+.toggle__slider .toggle__knob{transform:translate(1.25rem)}[dir=rtl] .toggle__input:checked+.toggle__slider .toggle__knob{transform:translate(-1.25rem)}.toggle--disabled{opacity:.5;pointer-events:none}.circular-button{display:flex;flex-direction:column;align-items:center;gap:.5rem}.circular-button:hover:not(.circular-button--disabled){transform:translateY(-.125rem)}.circular-button--disabled{opacity:.5;pointer-events:none}.circular-button__circle{border-radius:50%;background:var(--surface-secondary, #f5f5f5);display:flex;align-items:center;justify-content:center;cursor:pointer;border:.0625rem solid var(--text-primary, black);transition:all .2s ease;color:var(--text-primary)}[dir=rtl] .circular-button__circle>:nth-child(2):not(:last-child){rotate:180deg}.circular-button__circle--small{width:3.5rem;height:3.5rem;font-size:1.5rem}.circular-button__circle--medium{width:4.5rem;height:4.5rem;font-size:1.75rem}.circular-button__circle--large{width:5.5rem;height:5.5rem;font-size:2rem}.circular-button__circle--selected{background:var(--toggle-active);border:.1875rem solid var(--toggle-active-border);box-shadow:0 0 0 .25rem var(--toggle-active-shadow-color);color:var(--text-primary)}.circular-button__circle:hover:not(.circular-button__circle--selected){background:var(--surface-tertiary, #ebebeb)}.circular-button__circle:active{transform:scale(.95)}.circular-button__icon{display:flex;align-items:center;justify-content:center}.circular-button__icon--svg{width:100%;height:100%;color:var(--text-primary, #1a1a1a)}.circular-button__icon--svg svg{width:100%;height:100%;display:block}.circular-button__circle--selected .circular-button__icon--svg{color:var(--text-primary-invert)}.circular-button__label{font-size:.8125rem;color:var(--text-primary, #1a1a1a);text-align:center;line-height:1.2}.modal{position:absolute;inset:20% 0 0;background:var(--surface-bg, #f5f5f7);border-radius:1.25rem 1.25rem 0 0;padding:0 1.25rem 1.25rem;z-index:1000;max-height:80vh;overflow-y:hidden;color:var(--text-primary, black)}.modal::-webkit-scrollbar{display:none}.modal__backdrop{position:absolute;inset:0;background:var(--backdrop-bg, rgba(0, 0, 0, .4));z-index:999;border-radius:1.25rem}.modal__handle{width:2.25rem;height:.3125rem;background:var(--handle-bg, rgba(0, 0, 0, .15));border-radius:.1875rem;margin:.75rem auto 1.25rem}.modal__content{height:90%}.segmented-control{display:flex;gap:.5rem;background:var(--surface-tertiary, #e8e8e8);border-radius:.75rem;padding:.25rem}.segmented-control--disabled{opacity:.5;pointer-events:none}.segmented-control__button{flex:1;border:none;border-radius:.625rem;padding:.75rem;font-size:.9375rem;font-weight:500;cursor:pointer;background-color:transparent;color:var(--text-primary, #1a1a1a);transition:all .2s}.segmented-control__button--active{background-color:var(--surface-bg, white);box-shadow:0 .125rem .25rem var(--card-shadow, rgba(0, 0, 0, .08))}.segmented-control__button:hover:not(.segmented-control__button--active){background-color:var(--surface-bg-hover, rgba(255, 255, 255, .5))}.toast{position:absolute;top:1.25rem;left:50%;transform:translate(-50%);background:var(--surface-bg, #ffffff);border:.0625rem solid var(--border-color, #e0e0e0);border-radius:.5rem;padding:.75rem 1rem;display:flex;align-items:center;gap:.75rem;box-shadow:0 .25rem .75rem var(--card-shadow-hover, rgba(0, 0, 0, .12));animation:toast-slide-down .3s ease-out;z-index:1000;max-width:90%}@keyframes toast-slide-down{0%{transform:translate(-50%) translateY(-1.25rem);opacity:0}to{transform:translate(-50%) translateY(0);opacity:1}}.toast__message{color:var(--text-primary, #1a1a1a);font-size:.875rem}.toast__close{background:none;border:none;color:var(--text-secondary, #666666);font-size:1.5rem;cursor:pointer;padding:0;width:1.5rem;height:1.5rem;display:flex;align-items:center;justify-content:center;line-height:1;transition:color .2s}.toast__close:hover{color:var(--text-primary, #1a1a1a)}.error-boundary{display:flex;align-items:center;justify-content:center;min-height:200px;padding:1.5rem;background:var(--surface-bg, #f5f5f5);border-radius:.75rem}.error-boundary__content{text-align:center;max-width:300px}.error-boundary__icon{width:48px;height:48px;margin:0 auto 1rem;background:var(--error-color, #ff3b30);color:var(--text-primary-invert, #fff);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.5rem;font-weight:700}.error-boundary__title{margin:0 0 .5rem;font-size:1.125rem;font-weight:600;color:var(--text-primary, #1a1a1a)}.error-boundary__message{margin:0 0 1rem;font-size:.875rem;color:var(--text-secondary, #666);line-height:1.4}.error-boundary__retry{padding:.5rem 1rem;background:var(--accent-color, #007aff);color:var(--text-primary-invert, #fff);border:none;border-radius:.5rem;font-size:.875rem;font-weight:500;cursor:pointer;transition:background .2s ease}.error-boundary__retry:hover{background:var(--accent-color-hover, #0056b3)}.header{padding:1.25rem 1.25rem .625rem;text-align:center;padding-bottom:unset}.header__top{display:flex;justify-content:space-between;align-items:flex-start}.header__title-wrapper{flex:1;text-align:center;padding-left:2rem}[dir=rtl] .header__title-wrapper{padding-left:0;padding-right:2rem}.header__settings-btn{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;padding:0;background:none;border:none;color:var(--text-secondary, #666);cursor:pointer;border-radius:.5rem;transition:all .2s ease}.header__settings-btn svg{width:1.25rem;height:1.25rem}.header__settings-btn:hover{background:var(--hover-bg, rgba(0, 0, 0, .05));color:var(--text-primary, #1a1a1a)}.header__settings-btn:active{background:var(--active-bg, rgba(0, 0, 0, .1))}.header__title{margin:0;font-size:1rem;font-weight:600;color:var(--text-primary, #1a1a1a)}.header__status{margin:0;font-size:.875rem;color:var(--text-secondary, #666)}.header__progress{margin:0 auto;max-width:12.5rem}.header__progress-bar{width:100%;height:.25rem;background-color:var(--surface-tertiary, #e8e8e8);border-radius:.25rem;overflow:hidden}.header__progress-fill{height:100%;background-color:var(--accent-color, #007aff);transition:width .3s ease}.header__progress-text{margin:.25rem 0 0;font-size:.75rem;color:var(--text-tertiary, #999)}.header__stats{display:flex;justify-content:center;gap:1.25rem;font-size:1rem;color:var(--text-primary, #1a1a1a);margin-top:.875rem;align-items:center}.header__stat{display:flex;align-items:center;gap:.25rem}.header__stat-icon{display:flex;color:var(--accent-color)}.header__stat-icon--cleaning-time,.header__stat-icon--area{display:flex}.header__stat-icon--cleaning-time svg,.header__stat-icon--area svg{scale:.8}.header__stat-value{display:flex;font-weight:500;unicode-bidi:plaintext}.header__stat-value--cleaning-time{unicode-bidi:unset}.map-selector{position:relative;display:flex;justify-content:center}.map-selector__button{display:inline-flex;align-items:center;gap:.375rem;padding:.375rem .75rem;background:var(--surface-bg, #f5f5f5);border:1px solid var(--border-color, #e0e0e0);border-radius:1.25rem;color:var(--text-primary, #1a1a1a);font-size:.8125rem;font-weight:500;cursor:pointer;transition:all .2s ease}.map-selector__button:hover{background:var(--surface-bg-hover, #ebebeb)}.map-selector__button--open{background:var(--surface-bg-hover, #ebebeb);border-color:var(--accent-color, #007aff)}.map-selector__button--disabled,.map-selector__button:disabled{opacity:.5;cursor:not-allowed}.map-selector__icon{display:flex;align-items:center;color:var(--text-secondary, #666)}.map-selector__icon svg{width:1rem;height:1rem}.map-selector__label{max-width:8rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.map-selector__chevron{width:1rem;height:1rem;color:var(--text-secondary, #666);transition:transform .2s ease}.map-selector__chevron--open{transform:rotate(180deg)}.map-selector__dropdown{position:absolute;top:calc(100% + .25rem);left:50%;transform:translate(-50%);min-width:10rem;max-width:14rem;background:var(--surface-bg, #fff);border:1px solid var(--border-color, #e0e0e0);border-radius:.75rem;box-shadow:var(--card-shadow, 0 4px 12px rgba(0, 0, 0, .1));overflow:hidden;z-index:100;animation:map-selector-dropdown-fade-in .15s ease}.map-selector__option{display:flex;align-items:center;justify-content:space-between;width:100%;padding:.625rem .875rem;background:transparent;border:none;color:var(--text-primary, #1a1a1a);font-size:.875rem;text-align:start;cursor:pointer;transition:background .15s ease}.map-selector__option:hover{background:var(--surface-bg-hover, #f5f5f5)}.map-selector__option--selected{color:var(--accent-color, #007aff);font-weight:500}.map-selector__option:not(:last-child){border-bottom:1px solid var(--border-color, #e8e8e8)}.map-selector__option-name{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-right:.5rem}[dir=rtl] .map-selector__option-name{padding-right:0;padding-left:.5rem}.map-selector__option-check{width:1rem;height:1rem;color:var(--accent-color, #007aff);flex-shrink:0}@keyframes map-selector-dropdown-fade-in{0%{opacity:0;transform:translate(-50%) translateY(-.25rem)}to{opacity:1;transform:translate(-50%) translateY(0)}}.mode-tabs{display:flex;gap:.25rem;background:var(--surface-tertiary, #e8e8e8);border-radius:.9375rem;padding:.25rem;margin-bottom:.9375rem}.mode-tabs--disabled{opacity:.5;pointer-events:none}.mode-tabs__button{flex:1;display:flex;align-items:center;justify-content:center;border:none;border-radius:.6875rem;padding:.625rem;font-weight:500;font-size:.875rem;cursor:pointer;transition:all .2s;background-color:transparent;color:var(--text-secondary, #666)}.mode-tabs__button-icon svg{scale:.5;color:var(--text-secondary, #666)}.mode-tabs__button--active{background-color:var(--surface-bg, white);color:var(--text-primary, #000);box-shadow:0 .125rem .25rem var(--card-shadow, rgba(0, 0, 0, .1))}.mode-tabs__button:hover:not(.mode-tabs__button--active):not(:disabled){background-color:var(--surface-bg-hover, rgba(255, 255, 255, .5))}.mode-tabs__button:disabled{cursor:not-allowed}.mode-tabs__area-select{position:relative;flex:1}.mode-tabs__area-select .mode-tabs__button{width:100%;gap:.25rem}.mode-tabs__chevron{width:1rem;height:1rem;transition:transform .2s ease}.mode-tabs__chevron--open{transform:rotate(180deg)}.mode-tabs__menu{position:absolute;inset-block-end:calc(100% + .375rem);inset-inline-end:0;z-index:20;min-width:8rem;padding:.25rem;border:.0625rem solid var(--border-color, #e0e0e0);border-radius:.6875rem;background:var(--surface-bg, white);box-shadow:0 .375rem 1rem var(--card-shadow, rgba(0, 0, 0, .18))}.mode-tabs__menu-item{width:100%;padding:.625rem .75rem;border:0;border-radius:.5rem;background:transparent;color:var(--text-primary, #000);font:inherit;text-align:start;cursor:pointer}.mode-tabs__menu-item:hover,.mode-tabs__menu-item--active{background:var(--surface-bg-hover, rgba(0, 0, 0, .06))}.mode-tabs__menu-item--active{color:var(--accent-color, #d4af37);font-weight:600}.action-buttons{display:flex;gap:.75rem;margin-top:.9375rem}.action-buttons__clean,.action-buttons__dock,.action-buttons__pause,.action-buttons__resume,.action-buttons__stop{flex:1;background:var(--accent-bg);border:.0625rem solid var(--accent-bg);border-radius:.875rem;padding:.575rem;font-size:.9375rem;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:.5rem;transition:all .3s cubic-bezier(.16,1,.3,1);color:var(--text-primary)}.action-buttons__clean--selected,.action-buttons__dock--selected,.action-buttons__pause--selected,.action-buttons__resume--selected,.action-buttons__stop--selected{transform:translateY(-.125rem);border:.0625rem solid var(--toggle-active-border);box-shadow:0 .625rem 1.25rem var(--card-shadow-hover),0 0 .75rem var(--accent-color-shadow-color)!important}.action-buttons__clean{color:var(--text-primary-invert);background:var(--accent-color)}.action-buttons__pause{color:var(--accent-color);border-color:var(--accent-color-hover)}.action-buttons__resume{color:var(--success-color, #43a047);border-color:color-mix(in srgb,var(--success-color, #43a047) 50%,transparent)}.action-buttons__stop{color:var(--error-color, #db4437);border-color:color-mix(in srgb,var(--error-color, #db4437) 50%,transparent)}.action-buttons__dock{background:var(--surface-secondary);color:var(--text-secondary)}.cleaning-mode-button-wrapper{margin:.625rem 1.25rem;width:calc(100% - 2.5rem);display:flex;align-items:center;gap:.5rem;margin-bottom:unset}.cleaning-mode-button-wrapper__repeats{background:var(--accent-color, #007aff);color:var(--text-primary-invert);border:none;border-radius:50%;width:3rem;height:3rem;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:.9rem;font-weight:600;flex-shrink:0;transition:transform .2s,opacity .2s;box-shadow:0 .125rem .5rem var(--card-shadow, rgba(0, 0, 0, .08))}.cleaning-mode-button-wrapper__repeats:hover:not(:disabled){transform:scale(1.1);opacity:.9;box-shadow:0 .25rem .75rem var(--card-shadow-hover, rgba(0, 0, 0, .12))}.cleaning-mode-button-wrapper__repeats:active:not(:disabled){transform:scale(.95)}.cleaning-mode-button-wrapper__repeats:disabled{opacity:.5;cursor:not-allowed}.cleaning-mode-button-wrapper__shortcuts{background:var(--accent-color, #007aff);color:var(--text-primary-invert);border:none;border-radius:50%;width:3rem;height:3rem;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:1.1rem;flex-shrink:0;transition:transform .2s,opacity .2s;box-shadow:0 .125rem .5rem var(--card-shadow, rgba(0, 0, 0, .08))}.cleaning-mode-button-wrapper__shortcuts svg{scale:.8}.cleaning-mode-button-wrapper__shortcuts:hover:not(:disabled){transform:scale(1.1);opacity:.9;box-shadow:0 .25rem .75rem var(--card-shadow-hover, rgba(0, 0, 0, .12))}.cleaning-mode-button-wrapper__shortcuts:active:not(:disabled){transform:scale(.95)}.cleaning-mode-button-wrapper__shortcuts:disabled{opacity:.5;cursor:not-allowed}.cleaning-mode-button{flex:1;background:var(--surface-bg, #fff);border:none;border-radius:.75rem;padding:.75rem 1rem .75rem .5rem;box-shadow:0 .125rem .5rem var(--card-shadow, rgba(0, 0, 0, .08));color:var(--text-primary, #1a1a1a);font-weight:400;font-size:.9375rem;cursor:pointer;display:flex;justify-content:space-between;align-items:center;transition:transform .1s ease}.cleaning-mode-button:hover:not(:disabled){box-shadow:0 .25rem .75rem var(--card-shadow-hover, rgba(0, 0, 0, .12))}.cleaning-mode-button:active:not(:disabled){transform:scale(.98)}.cleaning-mode-button--disabled,.cleaning-mode-button:disabled{opacity:.5;cursor:not-allowed;pointer-events:none}.cleaning-mode-button__content{display:flex;align-items:center}.cleaning-mode-button__icon{scale:.7;display:flex}.cleaning-mode-button__text{font-weight:400;font-size:.8rem}.cleaning-mode-button__arrow{font-size:1.25rem;color:var(--text-tertiary, #999)}.vacuum-position-marker{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:10}.vacuum-position-marker__bg{fill:var(--vacuum-marker-bg, rgba(255, 255, 255, .9));stroke:var(--vacuum-marker-stroke, #4caf50);stroke-width:2;filter:drop-shadow(0 2px 4px rgba(0,0,0,.3))}.vacuum-position-marker__icon{fill:var(--vacuum-marker-color, #4caf50)}.vacuum-position-marker--cleaning .vacuum-position-marker__bg{animation:vacuum-pulse 1.5s ease-in-out infinite}.charger-marker{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:5}.charger-marker__bg{fill:var(--charger-marker-bg, rgba(255, 255, 255, .9));stroke:var(--charger-marker-stroke, #ffc107);stroke-width:2;filter:drop-shadow(0 1px 3px rgba(0,0,0,.25))}.charger-marker__icon{fill:var(--charger-marker-color, #ffc107)}@keyframes vacuum-pulse{0%{opacity:1}50%{opacity:.7}to{opacity:1}}.vacuum-map{position:relative;margin:0 1.25rem;border-radius:.9375rem;overflow:hidden;background:transparent!important;box-shadow:none!important;min-height:18.75rem;--map-max-height-fallback: none}.vacuum-map--locked .react-transform-wrapper{touch-action:pan-y}.vacuum-map__content{position:relative;display:inline-block;width:100%;height:100%}.vacuum-map__image{display:block;width:100%;height:auto;max-height:var(--map-max-height, var(--map-max-height-fallback, none));object-fit:contain;border-radius:.9375rem;-webkit-user-select:none;user-select:none;-webkit-user-drag:none}.vacuum-map__placeholder{color:var(--text-secondary);text-align:center;font-size:.875rem}.vacuum-map__placeholder small{font-size:.75rem;color:var(--text-tertiary)}.vacuum-map__overlay{position:absolute;inset:0;background:transparent;border-radius:.9375rem;display:flex;align-items:center;justify-content:center;font-size:.875rem;color:var(--text-secondary);pointer-events:none}.vacuum-map__cycles{position:absolute;right:1rem}[dir=rtl] .vacuum-map__cycles{right:auto;left:1rem}.vacuum-map__cycles{bottom:1rem;width:2.5rem;height:2.5rem;border-radius:25%;border-radius:.375rem}.vacuum-map__zone{position:absolute;border:.1875rem solid var(--accent-color);background:repeating-linear-gradient(45deg,var(--accent-bg-secondary),var(--accent-bg-secondary) .625rem,color-mix(in srgb,var(--accent-color) 5%,transparent) .625rem,color-mix(in srgb,var(--accent-color) 5%,transparent) 1.25rem);pointer-events:auto;border-radius:.5rem;box-shadow:0 .125rem .75rem var(--accent-shadow)}.vacuum-map__zone--nogo{border-color:#ef4444;background:repeating-linear-gradient(45deg,#ef444440,#ef444440 .625rem,#ef444414 .625rem 1.25rem);box-shadow:0 .125rem .75rem #ef444466}.vacuum-map__zone--nogo .vacuum-map__zone-handle{background:#ef4444}.vacuum-map__zone--nomop{border-color:#f59e0b;background:repeating-linear-gradient(45deg,#f59e0b40,#f59e0b40 .625rem,#f59e0b14 .625rem 1.25rem);box-shadow:0 .125rem .75rem #f59e0b66}.vacuum-map__zone--nomop .vacuum-map__zone-handle{background:#f59e0b}.vacuum-map__picture-frame{position:absolute}.vacuum-map__zone-container{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:auto}.vacuum-map__zone-handle{position:absolute;background:var(--accent-color);border:.125rem solid var(--text-primary-invert);border-radius:.25rem;pointer-events:auto;box-shadow:0 .125rem .25rem var(--handle-shadow);transition:background .2s ease;z-index:10;touch-action:none}.vacuum-map__zone-handle:before{content:"";position:absolute;inset:-.5rem}.vacuum-map__zone-handle:hover,.vacuum-map__zone-handle:active{background:var(--accent-color-hover)}.vacuum-map__zone-handle--top,.vacuum-map__zone-handle--bottom{width:2.5rem;height:.5rem;left:50%;cursor:ns-resize}.vacuum-map__zone-handle--top{top:-.25rem}.vacuum-map__zone-handle--bottom{bottom:-.25rem}.vacuum-map__zone-handle--left,.vacuum-map__zone-handle--right{width:.5rem;height:2.5rem;top:50%;cursor:ew-resize}.vacuum-map__zone-handle--left{left:-.25rem}[dir=rtl] .vacuum-map__zone-handle--left{left:auto;right:-.25rem}.vacuum-map__zone-handle--right{right:-.25rem}[dir=rtl] .vacuum-map__zone-handle--right{right:auto;left:-.25rem}.vacuum-map__zone-clear{position:absolute;top:-.75rem;right:-.75rem}[dir=rtl] .vacuum-map__zone-clear{right:auto;left:-.75rem}.vacuum-map__zone-clear{width:1.5rem;height:1.5rem;border-radius:50%;background:var(--error-color, #db4437);color:var(--text-primary-invert);border:.125rem solid var(--text-primary-invert);font-size:1.125rem;font-weight:700;cursor:pointer;pointer-events:auto;display:flex;align-items:center;justify-content:center;box-shadow:0 .125rem .5rem var(--error-shadow);transition:background .2s ease;line-height:1;padding:0;z-index:11}.vacuum-map__zone-clear:hover,.vacuum-map__zone-clear:active{background:var(--error-color-hover)}.vacuum-map__room-segments{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.vacuum-map__room-segments path{pointer-events:auto}.vacuum-map__room-segment{cursor:pointer;transition:all .2s ease}.vacuum-map__room-segment:hover:not(.vacuum-map__room-segment--selected){fill:#ffffff26;stroke:#ffffffe6;stroke-width:3;filter:drop-shadow(0 0 8px rgba(255,255,255,.6))}.vacuum-map__room-segment--selected{fill:var(--accent-bg, rgba(212, 175, 55, .3));stroke:var(--accent-color, #d4af37);stroke-width:3}.vacuum-map__room-segment--selected:hover{fill:var(--accent-bg-hover, rgba(212, 175, 55, .45));filter:drop-shadow(0 0 6px var(--accent-color-shadow-color, rgba(212, 175, 55, .5)))}.vacuum-map__rooms{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.vacuum-map__room{position:absolute;transform:translate(-50%,-50%);width:2rem;height:2rem;border-radius:50%;background:#ffffffe6;border:.125rem solid var(--border-color, #e0e0e0);display:flex;align-items:center;justify-content:center;font-size:.875rem;font-weight:600;color:var(--text-primary, #1a1a1a);cursor:pointer;pointer-events:auto;transition:all .2s ease;box-shadow:0 .125rem .25rem #0000001a;z-index:2}.vacuum-map__room:hover{transform:translate(-50%,-50%) scale(1.1);background:#fff;box-shadow:0 .25rem .5rem #00000026}.vacuum-map__room--selected{background:var(--accent-color);color:var(--text-primary-invert);border-color:var(--accent-color, #d4af37);box-shadow:0 .125rem .5rem var(--accent-color-shadow-color, rgba(212, 175, 55, .4))}.vacuum-map__room--selected:hover{transform:translate(-50%,-50%) scale(1.1);box-shadow:0 .25rem .75rem var(--accent-color-shadow-color, rgba(212, 175, 55, .5))}.vacuum-map__saved-zones-layer{position:absolute;inset:0;pointer-events:none;z-index:9}.vacuum-map__saved-zone{position:absolute;border-radius:.375rem;pointer-events:auto;display:flex;align-items:flex-start;justify-content:space-between;padding:.25rem;box-sizing:border-box}.vacuum-map__saved-zone--nogo{border:.125rem dashed #ef4444;background:repeating-linear-gradient(45deg,#ef444433,#ef444433 .5rem,#ef44440d .5rem 1rem);box-shadow:0 0 8px #ef44444d}.vacuum-map__saved-zone--nomop{border:.125rem dashed #f59e0b;background:repeating-linear-gradient(45deg,#f59e0b33,#f59e0b33 .5rem,#f59e0b0d .5rem 1rem);box-shadow:0 0 8px #f59e0b4d}.vacuum-map__saved-zone--wall{height:0;padding:0;border:0;border-top:.1875rem dashed #3b82f6;border-radius:0;background:none;box-shadow:0 0 6px #3b82f680;transform-origin:0 50%;justify-content:center}.vacuum-map__saved-zone--wall .vacuum-map__saved-zone-badge{position:absolute;left:50%;bottom:.25rem;transform:translate(-50%) rotate(calc(-1 * var(--wall-angle, 0deg)));pointer-events:none}.vacuum-map__saved-zone--wall .vacuum-map__saved-zone-delete{position:absolute;left:50%;top:0;transform:translate(-50%,-50%)}.vacuum-map__saved-zone-badge{font-size:.6875rem;font-weight:700;padding:.125rem .375rem;border-radius:.25rem;background:#000000a6;color:#fff;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);-webkit-user-select:none;user-select:none;line-height:1.2}.vacuum-map__saved-zone-delete{width:1.25rem;height:1.25rem;border-radius:50%;background:#ef4444;color:#fff;border:1px solid rgba(255,255,255,.8);font-size:.875rem;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;padding:0;transition:transform .15s ease,background .15s ease;box-shadow:0 1px 4px #0006}.vacuum-map__saved-zone-delete:hover{transform:scale(1.15);background:#dc2626}.room-list-view{position:absolute;inset:0;background:var(--surface-bg, #fff);border-radius:.9375rem;display:flex;flex-direction:column;overflow:hidden}.room-list-view__header{padding:.75rem 3.5rem .75rem 1rem}[dir=rtl] .room-list-view__header{padding-right:0;padding-left:3.5rem}.room-list-view__header{padding-left:1rem}[dir=rtl] .room-list-view__header{padding-left:0;padding-right:1rem}.room-list-view__header{font-size:.875rem;color:var(--text-secondary, #666);background:var(--surface-secondary, #f5f5f5);border-bottom:1px solid var(--border-color, #e0e0e0);flex-shrink:0}.room-list-view__list{flex:1;overflow-y:auto;padding:.5rem;display:flex;flex-direction:column;gap:.5rem}.room-list-view__list::-webkit-scrollbar{width:.25rem}.room-list-view__list::-webkit-scrollbar-track{background:transparent}.room-list-view__list::-webkit-scrollbar-thumb{background:var(--surface-tertiary, #ccc);border-radius:.125rem}.room-list-view__empty{flex:1;display:flex;align-items:center;justify-content:center;color:var(--text-tertiary, #999);font-size:.875rem}.room-list-view__item{display:flex;align-items:center;gap:.75rem;padding:.75rem 1rem;background:var(--surface-secondary, #f5f5f5);border:2px solid transparent;border-radius:.75rem;cursor:pointer;transition:all .2s ease;width:100%;text-align:left}[dir=rtl] .room-list-view__item{text-align:right}.room-list-view__item:hover{background:var(--surface-tertiary, #ebebeb)}.room-list-view__item:active{transform:scale(.98)}.room-list-view__item--selected{background:var(--accent-bg-transparent, rgba(212, 175, 55, .1));border-color:var(--accent-color, #d4af37)}.room-list-view__item--selected:hover{background:var(--accent-bg-transparent, rgba(212, 175, 55, .15))}.room-list-view__item-name{flex:1;font-size:.9375rem;font-weight:500;color:var(--text-primary, #1a1a1a);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.room-list-view__item-check{width:1.5rem;height:1.5rem;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--accent-color, #d4af37)}.map-controls{position:absolute;top:.75rem;right:.75rem}[dir=rtl] .map-controls{right:auto;left:.75rem}.map-controls{display:flex;flex-direction:column;gap:.25rem;z-index:3}.map-controls__button{width:2.25rem;height:2.25rem;border-radius:.5rem;background:var(--surface-bg, #fff);border:1px solid var(--border-color, #e0e0e0);display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--text-primary, #1a1a1a);box-shadow:0 .125rem .5rem var(--card-shadow, rgba(0, 0, 0, .1));transition:all .2s ease}.map-controls__button:hover{background:var(--surface-secondary, #f5f5f5);transform:scale(1.05)}.map-controls__button:active{transform:scale(.95)}.map-controls__button svg{transition:transform .2s ease}.map-controls__button--lock{margin-top:.25rem}.map-controls__button--locked{background:var(--accent-color);border-color:var(--accent-color);color:var(--text-primary-invert)}.map-controls__button--locked:hover{background:var(--accent-color-hover);border-color:var(--accent-color-hover)}.room-labels{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:8}.room-labels__bg{fill:var(--room-label-bg, rgba(0, 0, 0, .7))}.room-labels__text{fill:var(--room-label-color, #fff);font-weight:500;font-family:inherit}.cleaning-mode-modal{height:100%}.cleaning-mode-modal__header{margin-bottom:1.5rem}.cleaning-mode-modal__content-wrapper{height:calc(100% - 4rem);overflow-y:auto;width:100%;overflow-x:hidden}.cleaning-mode-modal__content-wrapper::-webkit-scrollbar{display:none}.cleaning-mode-modal__section{margin-bottom:1.5rem}.cleaning-mode-modal__section-title{font-size:.9375rem;color:var(--text-primary, #1a1a1a);font-weight:500;margin:0 0 .75rem}.cleaning-mode-modal__section-header{display:flex;align-items:center;gap:.375rem;margin-bottom:.75rem}.cleaning-mode-modal__help-icon{display:inline-flex;align-items:center;justify-content:center;width:1rem;height:1rem;border-radius:50%;border:.09375rem solid var(--text-tertiary, #999);font-size:.6875rem;color:var(--text-tertiary, #999);font-weight:600}.cleaning-mode-modal__room-map{background:var(--surface-bg, white);border-radius:.75rem;padding:1rem;display:flex;align-items:center;justify-content:center;min-height:7.5rem}.cleaning-mode-modal__placeholder{font-size:.8125rem;color:var(--text-tertiary, #999)}.cleaning-mode-modal__mode-grid{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}.cleaning-mode-modal__mode-grid--disabled{opacity:.5;pointer-events:none}.cleaning-mode-modal__mode-card{position:relative;border:.125rem solid var(--border-color, #e0e0e0);border-radius:1rem;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;background:var(--surface-bg, white);padding:1.5rem 1rem;transition:all .2s ease}.cleaning-mode-modal__mode-card:hover:not(.cleaning-mode-modal__mode-card--disabled){transform:translateY(-.125rem);box-shadow:0 .25rem .75rem var(--card-shadow, rgba(0, 0, 0, .08))}.cleaning-mode-modal__mode-card--selected{border:.1875rem solid var(--accent-color, #d4af37);box-shadow:0 0 0 .25rem var(--accent-color-shadow-color, rgba(212, 175, 55, .15))}.cleaning-mode-modal__mode-card--selected:hover:not(.cleaning-mode-modal__mode-card--disabled){transform:translateY(-.125rem);box-shadow:0 0 0 .25rem var(--accent-color-shadow-color, rgba(88, 101, 242, .25)),0 .25rem .75rem var(--card-shadow, rgba(0, 0, 0, .08))}.cleaning-mode-modal__mode-card--disabled{cursor:not-allowed;opacity:.5}.cleaning-mode-modal__mode-icon{border-radius:50%;margin-bottom:.75rem;display:flex;align-items:center;justify-content:center;font-size:1.75rem}[dir=rtl] .cleaning-mode-modal__mode-icon--mop-after>:nth-child(2),[dir=rtl] .cleaning-mode-modal__mode-icon--vac-mop>:nth-child(2){rotate:180deg}.cleaning-mode-modal__mode-label{font-size:.875rem;font-weight:500;color:var(--text-primary, #1a1a1a)}.cleaning-mode-modal__mode-checkmark{position:absolute;top:.75rem;right:.75rem}[dir=rtl] .cleaning-mode-modal__mode-checkmark{right:auto;left:.75rem}.cleaning-mode-modal__mode-checkmark{width:1.5rem;height:1.5rem;border-radius:50%;background:var(--accent-color, #d4af37);display:flex;align-items:center;justify-content:center;box-shadow:0 .125rem .25rem var(--handle-shadow, rgba(0, 0, 0, .15));color:var(--text-primary-invert);font-size:.875rem}.cleaning-mode-modal__horizontal-scroll{display:flex;justify-content:flex-start;overflow-x:auto;padding-bottom:.5rem;padding-top:.5rem;gap:2rem}.cleaning-mode-modal__horizontal-scroll::-webkit-scrollbar{height:.25rem}.cleaning-mode-modal__horizontal-scroll::-webkit-scrollbar-track{background:var(--surface-secondary, #f1f1f1);border-radius:.125rem}.cleaning-mode-modal__horizontal-scroll::-webkit-scrollbar-thumb{background:var(--surface-tertiary, #ccc);border-radius:.125rem}.cleaning-mode-modal__horizontal-scroll::-webkit-scrollbar-thumb:hover{background:var(--border-color, #bbb)}.cleaning-mode-modal__mode-option{min-width:4.375rem;display:flex;flex-direction:column;align-items:center;gap:.375rem}.cleaning-mode-modal__mode-option-label{font-size:.75rem;color:var(--text-secondary, #666);text-align:center;line-height:1.2}.cleaning-mode-modal__power-grid{display:flex;justify-content:flex-start;gap:2rem;overflow-x:auto;padding:.5rem 0}.cleaning-mode-modal__power-grid--disabled{opacity:.5;pointer-events:none}.cleaning-mode-modal__power-option{min-width:4.375rem;display:flex;flex-direction:column;align-items:center;gap:.375rem}.cleaning-mode-modal__power-label{font-size:.8125rem;color:var(--text-primary, #1a1a1a);text-align:center}.cleaning-mode-modal__max-plus{background:var(--surface-bg, white);border-radius:.75rem;padding:1rem}.cleaning-mode-modal__max-plus-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:.5rem}.cleaning-mode-modal__max-plus-title{font-size:.9375rem;color:var(--text-primary, #1a1a1a);font-weight:500}.cleaning-mode-modal__max-plus-description{font-size:.8125rem;color:var(--text-tertiary, #999);margin:0;line-height:1.4}.cleaning-mode-modal__slider-container{position:relative;padding:0 .5rem;margin-bottom:.75rem}.cleaning-mode-modal__slider-container--disabled{opacity:.5;pointer-events:none}.cleaning-mode-modal__slider-wrapper{position:relative;padding-top:2rem}.cleaning-mode-modal__slider{width:100%;height:.375rem;border-radius:.1875rem;outline:none;-webkit-appearance:none;appearance:none;cursor:pointer}.cleaning-mode-modal__slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:1.25rem;height:1.25rem;border-radius:50%;background:var(--accent-color, #d4af37);cursor:pointer;box-shadow:0 .125rem .25rem var(--handle-shadow, rgba(0, 0, 0, .2))}.cleaning-mode-modal__slider::-moz-range-thumb{width:1.25rem;height:1.25rem;border-radius:50%;background:var(--accent-color, #d4af37);cursor:pointer;border:none;box-shadow:0 .125rem .25rem var(--handle-shadow, rgba(0, 0, 0, .2))}.cleaning-mode-modal__slider-tooltip{position:absolute;top:-.5rem;transform:translate(-50%);background:var(--accent-color, #d4af37);color:var(--text-primary-invert);padding:.25rem .5rem;border-radius:.375rem;font-size:.85rem;font-weight:600;white-space:nowrap;pointer-events:none;box-shadow:0 .125rem .375rem var(--accent-shadow, rgba(0, 0, 0, .2))}[dir=rtl] .cleaning-mode-modal__slider-tooltip{transform:translate(50%)}.cleaning-mode-modal__slider-tooltip:after{content:"";position:absolute;top:100%;left:50%;transform:translate(-50%);width:0;height:0;border-left:.3125rem solid transparent;border-right:.3125rem solid transparent;border-top:.3125rem solid var(--accent-color, #d4af37)}.cleaning-mode-modal__slider-value{position:absolute;top:-2rem;transform:translate(-50%);background:var(--accent-color, #d4af37);border-radius:50%;width:2.5rem;height:2.5rem;display:flex;align-items:center;justify-content:center;font-size:.875rem;font-weight:600;color:var(--text-primary-invert);box-shadow:0 .125rem .5rem var(--accent-color-shadow-color, rgba(88, 101, 242, .25));pointer-events:none}.cleaning-mode-modal__slider-labels{display:flex;justify-content:space-between;padding:0 .5rem;margin-top:1.5rem}.cleaning-mode-modal__slider-label{font-size:.8125rem}.cleaning-mode-modal__slider-label--inactive{color:var(--text-tertiary, #999)}.cleaning-mode-modal__slider-label--active{color:var(--text-primary, #1a1a1a);font-weight:500}.cleaning-mode-modal__setting{display:flex;align-items:center;justify-content:space-between;padding:1rem;background:var(--surface-bg, white);border-radius:.75rem;margin-bottom:1rem}.cleaning-mode-modal__setting--disabled{opacity:.5;pointer-events:none}.cleaning-mode-modal__setting--clickable{cursor:pointer;transition:background .2s ease}.cleaning-mode-modal__setting--clickable:hover{background:var(--surface-secondary, #f8f8f8)}.cleaning-mode-modal__setting--clickable:active{background:var(--surface-tertiary, #f0f0f0)}.cleaning-mode-modal__setting-label{font-size:.9375rem;color:var(--text-primary, #1a1a1a)}.cleaning-mode-modal__setting-value{display:flex;align-items:center;gap:.5rem;font-size:.875rem;color:var(--text-tertiary, #999)}.cleaning-mode-modal__setting-arrow{font-size:1.125rem;color:var(--text-tertiary, #999)}.cleaning-mode-modal__route-grid{display:flex;justify-content:flex-start;overflow-x:auto;padding-bottom:.5rem;padding-top:.5rem;gap:2rem}.cleaning-mode-modal__route-grid--disabled{opacity:.5;pointer-events:none}.cleaning-mode-modal__route-option{min-width:4.375rem;display:flex;flex-direction:column;align-items:center;gap:.375rem}.cleaning-mode-modal__route-label{font-size:.8125rem;color:var(--text-primary, #1a1a1a);text-align:center}.customize-mode{display:flex;flex-direction:column;gap:.5rem}.customize-mode__empty{display:flex;align-items:center;justify-content:center;padding:2rem;color:var(--text-secondary);font-size:.875rem}.customize-mode__empty p{margin:0}.customize-mode__room-accordions{display:flex;flex-direction:column;gap:.25rem}.customize-mode__badges{display:flex;gap:.25rem}.customize-mode__badge{display:inline-flex;align-items:center;justify-content:center;min-width:1.25rem;padding:.125rem .25rem;border-radius:.25rem;background:var(--accent-bg);font-size:.8rem;font-weight:600;color:var(--accent-color);text-transform:uppercase}.customize-mode__badge:nth-child(3){text-transform:unset}.customize-mode__room-settings-content{display:flex;flex-direction:column;gap:1rem}.customize-mode__setting-group{display:flex;flex-direction:column;gap:.5rem}.customize-mode__setting-label{font-size:.75rem;font-weight:500;color:var(--text-secondary)}.customize-mode__options{display:flex;justify-content:flex-start;overflow-x:auto;padding-bottom:.5rem;padding-top:.5rem;gap:2rem}.customize-mode__options--pills{gap:1rem}.customize-mode__option{display:flex;flex-direction:column;align-items:center;gap:2rem}.customize-mode__option-label{font-size:.8rem;color:var(--text-secondary);text-align:center}.customize-mode__pill{padding:.375rem .75rem;border:1.5px solid var(--surface-border);border-radius:1.25rem;background:var(--surface-bg);color:var(--text-secondary);font-size:1rem;font-weight:500;cursor:pointer;transition:all .15s ease;min-width:3.5rem}.customize-mode__pill:hover{border-color:var(--accent-color);background:var(--accent-bg-secondary)}.customize-mode__pill--selected{border-color:var(--accent-color);background:var(--accent-color);color:var(--text-primary-invert)}.customize-mode__pill--cycle{font-weight:600}.customize-mode__wetness-slider{display:flex;flex-direction:column;gap:.25rem}.room-selection-display{padding:.75rem 1rem;background:var(--accent-bg, #e3f2fd);border-radius:.5rem;margin-bottom:.75rem;font-size:.875rem;color:var(--text-primary, #1a1a1a)}.room-selection-display__label{font-weight:600;margin-right:.5rem}[dir=rtl] .room-selection-display__label{margin-right:0;margin-left:.5rem}.room-selection-display__label{color:var(--accent-color, #007aff)}.room-selection-display__rooms{color:var(--text-secondary, #666666)}.shortcuts-modal{display:flex;flex-direction:column;min-height:0;height:100%}.shortcuts-modal-sheet{top:auto;height:min(80vh,34rem);min-height:22rem}.shortcuts-modal-sheet .modal__content{min-height:0}.shortcuts-modal__header{display:flex;align-items:center;gap:.75rem;margin-bottom:1rem}.shortcuts-modal__title,.shortcuts-modal__count{margin:0}.shortcuts-modal__title{color:var(--text-primary);font-size:1.25rem;font-weight:650}.shortcuts-modal__count{margin-top:.125rem;color:var(--text-tertiary);font-size:.75rem}.shortcuts-modal__back,.shortcuts-modal__menu-toggle{display:grid;place-items:center;padding:0;border:0;background:transparent;color:var(--text-secondary);cursor:pointer}.shortcuts-modal__back:hover:not(:disabled),.shortcuts-modal__menu-toggle:hover:not(:disabled){color:var(--text-primary);background:var(--surface-bg-hover)}.shortcuts-modal__back:disabled,.shortcuts-modal__menu-toggle:disabled{cursor:not-allowed;opacity:.45}.shortcuts-modal__back svg,.shortcuts-modal__menu-toggle svg{width:1.125rem;height:1.125rem}.shortcuts-modal__back{width:2rem;height:2rem;border-radius:50%}[dir=rtl] .shortcuts-modal__back svg{transform:rotate(180deg)}.shortcuts-modal__empty{display:grid;place-items:center;min-height:12rem;padding:2rem 1.5rem;text-align:center;color:var(--text-secondary)}.shortcuts-modal__empty p{margin:0;color:var(--text-primary)}.shortcuts-modal__empty-hint{max-width:24rem;font-size:.8125rem;color:var(--text-tertiary)}.shortcuts-modal__grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(10rem,1fr));gap:.75rem;min-height:0;padding:.125rem;overflow-y:auto}.shortcuts-modal__card{position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:.75rem;min-width:0;padding:1rem;border:.0625rem solid var(--border-color);border-radius:.75rem;background:var(--surface-secondary);transition:border-color .2s ease,transform .2s ease,box-shadow .2s ease}.shortcuts-modal__card:hover{border-color:var(--accent-color);transform:translateY(-.0625rem);box-shadow:0 .25rem .75rem var(--card-shadow)}.shortcuts-modal__card-icon{display:grid;place-items:center;width:2.5rem;height:2.5rem;border-radius:.75rem;background:var(--accent-bg);color:var(--accent-color)}.shortcuts-modal__card-icon svg{width:1.25rem;height:1.25rem;fill:currentcolor}.shortcuts-modal__card-name{min-height:2.5em;margin:0;overflow-wrap:anywhere;color:var(--text-primary);font-size:.9375rem;font-weight:600;line-height:1.25}.shortcuts-modal__start{display:flex;align-items:center;justify-content:center;gap:.375rem;width:100%;margin-top:auto;padding:.5rem .75rem;border:0;border-radius:.625rem;background:var(--accent-color);color:var(--text-primary-invert);font:inherit;font-size:.8125rem;font-weight:600;cursor:pointer}.shortcuts-modal__start:hover:not(:disabled){background:var(--accent-color-hover)}.shortcuts-modal__start:disabled{cursor:not-allowed;opacity:.5}.shortcuts-modal__start svg{width:.875rem;height:.875rem;fill:currentcolor}.shortcuts-modal__menu-wrapper{position:absolute;inset-block-start:.625rem;inset-inline-end:.625rem}.shortcuts-modal__menu-toggle{width:1.875rem;height:1.875rem;border-radius:50%}.shortcuts-modal__menu{position:absolute;inset-block-start:calc(100% + .25rem);inset-inline-end:0;z-index:2;min-width:8.5rem;padding:.25rem;border:.0625rem solid var(--border-color);border-radius:.625rem;background:var(--surface-bg);box-shadow:0 .375rem 1rem var(--card-shadow-hover)}.shortcuts-modal__menu button{display:flex;align-items:center;gap:.5rem;width:100%;padding:.5rem .625rem;border:0;border-radius:.375rem;background:transparent;color:var(--text-primary);font:inherit;font-size:.8125rem;text-align:start;cursor:pointer}.shortcuts-modal__menu button:hover{background:var(--surface-bg-hover)}.shortcuts-modal__menu button svg{width:.875rem;height:.875rem}.shortcuts-modal__menu .shortcuts-modal__menu-delete{color:var(--error-color)}.shortcuts-modal__form,.shortcuts-modal__confirmation{max-width:28rem;margin:auto;padding:1.25rem 0}.shortcuts-modal__form label{display:block;margin-bottom:.5rem;color:var(--text-secondary);font-size:.8125rem;font-weight:500}.shortcuts-modal__form input{box-sizing:border-box;width:100%;padding:.7rem .75rem;border:.0625rem solid var(--border-color);border-radius:.625rem;outline:none;background:var(--surface-secondary);color:var(--text-primary);font:inherit}.shortcuts-modal__form input:focus{border-color:var(--accent-color);box-shadow:0 0 0 .1875rem var(--accent-bg)}.shortcuts-modal__confirmation{text-align:center}.shortcuts-modal__confirmation p{color:var(--text-primary);line-height:1.45}.shortcuts-modal__confirmation-icon{display:grid;place-items:center;width:3rem;height:3rem;margin:0 auto;border-radius:50%;background:color-mix(in srgb,var(--error-color) 15%,transparent);color:var(--error-color)}.shortcuts-modal__form-actions{display:flex;justify-content:flex-end;gap:.5rem;margin-top:1.25rem}.shortcuts-modal__form-actions button{padding:.575rem .875rem;border:0;border-radius:.625rem;background:var(--surface-secondary);color:var(--text-primary);font:inherit;font-size:.8125rem;font-weight:600;cursor:pointer}.shortcuts-modal__form-actions button:disabled{cursor:not-allowed;opacity:.5}.shortcuts-modal__form-actions .shortcuts-modal__primary{background:var(--accent-color);color:var(--text-primary-invert)}.shortcuts-modal__form-actions .shortcuts-modal__danger{background:var(--error-color);color:var(--text-primary-invert)}.shortcuts-modal__error,.shortcuts-modal__disabled{margin:.75rem 0 0;font-size:.75rem;text-align:center}.shortcuts-modal__error{color:var(--error-color)}.shortcuts-modal__disabled{color:var(--text-tertiary)}.dock-popup-modal{top:auto;height:fit-content}.dock-popup-modal .modal__content{height:auto}.dock-popup__title{margin:0 0 1rem;color:var(--text-primary);font-size:1rem;font-weight:600}.dock-popup__status-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}.dock-popup__status{display:flex;align-items:flex-start;gap:.625rem;min-width:0}.dock-popup__status-dot{width:.625rem;height:.625rem;margin-top:.25rem;border-radius:50%;flex:0 0 auto;background:var(--text-tertiary)}.dock-popup__status-dot--good{background:var(--success-color, #43a047)}.dock-popup__status-dot--warning{background:var(--warning-color, #ffa600)}.dock-popup__status-dot--bad{background:var(--error-color, #db4437)}.dock-popup__status-label,.dock-popup__status-value{display:block}.dock-popup__status-label{color:var(--text-primary);font-size:.8125rem;font-weight:500}.dock-popup__status-value{margin-top:.125rem;color:var(--text-tertiary);font-size:.75rem;text-transform:capitalize}.dock-popup__status-value--good{color:var(--success-color, #43a047)}.dock-popup__status-value--warning{color:var(--warning-color, #ffa600)}.dock-popup__status-value--bad{color:var(--error-color, #db4437)}.dock-popup__divider{height:1px;margin:1.25rem 0;background:var(--border-color, rgba(0, 0, 0, .08))}.dock-popup__tasks{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.75rem}.dock-popup__task{display:flex;align-items:center;justify-content:center;flex-direction:column;gap:.5rem;min-width:0;min-height:5rem;padding:.75rem .5rem;border:0;border-radius:1rem;background:var(--surface-secondary);color:var(--text-primary);font:inherit;font-size:.75rem;cursor:pointer}.dock-popup__task:disabled{cursor:not-allowed;opacity:.5}.dock-popup__task-icon{width:1.75rem;height:1.75rem;stroke-width:1.75}.entity-item{display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid var(--divider-color, rgba(0, 0, 0, .1));gap:16px}.entity-item:last-child{border-bottom:none}.entity-item--child{padding-left:16px;opacity:.9}.entity-item__info{display:flex;flex-direction:column;flex:1;min-width:0}.entity-item__label{font-size:14px;font-weight:500;color:var(--text-primary, #000)}.entity-item__description{font-size:12px;color:var(--text-secondary, #666);margin-top:2px}.entity-item--select{flex-direction:column;align-items:stretch;gap:8px}.entity-item--select .entity-item__info{flex:none}.entity-item--segmented{flex-direction:column;align-items:stretch;gap:8px}.entity-item--segmented .entity-item__info{flex:none}.entity-item--slider{flex-direction:column;align-items:stretch;gap:8px}.entity-item--slider .entity-item__info{flex:none}.entity-item__select{padding:8px 12px;border-radius:8px;border:1px solid var(--divider-color, rgba(0, 0, 0, .2));background:var(--surface-bg, #fff);color:var(--text-primary, #000);font-size:14px;cursor:pointer;min-width:120px}.entity-item__select:disabled{opacity:.5;cursor:not-allowed}.entity-item__button{padding:8px 16px;border-radius:8px;border:none;background:var(--accent-color, #007aff);color:var(--text-primary-invert);font-size:14px;font-weight:500;cursor:pointer;transition:opacity .2s ease}.entity-item__button:hover:not(:disabled){opacity:.9}.entity-item__button:active:not(:disabled){opacity:.8}.entity-item__button:disabled{opacity:.5;cursor:not-allowed}.entity-item__button--armed{background:var(--error-color, #db4437)}.entity-item__slider-container{display:flex;align-items:center;gap:12px}.entity-item__slider{flex:1;height:6px;border-radius:3px;appearance:none;background:var(--divider-color, rgba(0, 0, 0, .2));cursor:pointer}.entity-item__slider::-webkit-slider-thumb{appearance:none;width:18px;height:18px;border-radius:50%;background:var(--accent-color, #007aff);cursor:pointer}.entity-item__slider::-moz-range-thumb{width:18px;height:18px;border-radius:50%;background:var(--accent-color, #007aff);border:none;cursor:pointer}.entity-item__slider:disabled{opacity:.5;cursor:not-allowed}.entity-item__slider:disabled::-webkit-slider-thumb{cursor:not-allowed}.entity-item__slider:disabled::-moz-range-thumb{cursor:not-allowed}.entity-item__slider-value{font-size:14px;font-weight:500;color:var(--text-primary, #000);min-width:40px;text-align:right}.entity-item__slider--volume .entity-item__slider::-webkit-slider-thumb,.entity-item__slider--brightness .entity-item__slider::-webkit-slider-thumb{background:var(--accent-color, #007aff)}.entity-item__time-input{padding:8px 12px;border-radius:8px;border:1px solid var(--divider-color, rgba(0, 0, 0, .2));background:var(--surface-bg, #fff);color:var(--text-primary, #000);font-size:14px;font-family:inherit;cursor:pointer;min-width:100px}.entity-item__time-input:disabled{opacity:.5;cursor:not-allowed}.entity-item__time-input::-webkit-calendar-picker-indicator{cursor:pointer;filter:var(--time-picker-filter, none)}.ai-detection-section{display:flex;flex-direction:column;gap:.75rem}.ai-detection-section__item{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.5rem 0}.ai-detection-section__item--slider{flex-direction:column;align-items:stretch;gap:.5rem}.ai-detection-section__info{display:flex;flex-direction:column;gap:.125rem;flex:1;min-width:0}.ai-detection-section__label{font-size:.875rem;font-weight:500;color:var(--text-primary, #333)}.ai-detection-section__description{font-size:.75rem;color:var(--text-secondary, #666);line-height:1.3}.ai-detection-section__slider-container{display:flex;align-items:center;gap:.75rem}.ai-detection-section__slider{flex:1;height:4px;appearance:none;background:var(--surface-secondary, #e0e0e0);border-radius:2px;cursor:pointer}.ai-detection-section__slider::-webkit-slider-thumb{appearance:none;width:16px;height:16px;background:var(--accent-color, #007aff);border-radius:50%;cursor:pointer}.ai-detection-section__slider:disabled{opacity:.5;cursor:not-allowed}.ai-detection-section__slider-value{font-size:.75rem;font-weight:500;color:var(--text-primary, #333);min-width:36px;text-align:right}.carpet-settings-section{display:flex;flex-direction:column;gap:.75rem}.carpet-settings-section__mode-selector{display:flex;flex-direction:column;gap:.75rem;padding-bottom:.5rem;border-bottom:1px solid var(--border-color, #e0e0e0);margin-bottom:.25rem}.carpet-settings-section__sub-options{display:flex;flex-direction:column;gap:.5rem;padding-left:.25rem}.carpet-settings-section__sub-label{font-size:.75rem;color:var(--text-secondary, #666);font-weight:500}.carpet-settings-section__sub-buttons{display:flex;gap:.5rem}.carpet-settings-section__sub-button{flex:1;padding:.5rem .75rem;font-size:.8125rem;font-weight:500;border:1px solid var(--border-color, #e0e0e0);border-radius:.5rem;background:var(--surface-secondary, #f5f5f5);color:var(--text-primary, #333);cursor:pointer;transition:all .2s ease}.carpet-settings-section__sub-button:hover:not(.carpet-settings-section__sub-button--active){background:var(--surface-tertiary, #eee)}.carpet-settings-section__sub-button--active{background:var(--accent-color, #007aff);border-color:var(--accent-color, #007aff);color:var(--text-primary-invert)}.carpet-settings-section__sub-button:disabled{opacity:.5;cursor:not-allowed}.carpet-settings-section__item{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.5rem 0}.carpet-settings-section__item--select{flex-direction:column;align-items:stretch;gap:.5rem}.carpet-settings-section__info{display:flex;flex-direction:column;gap:.125rem;flex:1;min-width:0}.carpet-settings-section__label{font-size:.875rem;font-weight:500;color:var(--text-primary, #333)}.carpet-settings-section__description{font-size:.75rem;color:var(--text-secondary, #666);line-height:1.3}.carpet-settings-section__select{width:100%;padding:.625rem .75rem;font-size:.875rem;color:var(--text-primary, #333);background:var(--surface-secondary, #f5f5f5);border:1px solid var(--border-color, #e0e0e0);border-radius:8px;cursor:pointer;outline:none;transition:border-color .2s ease}.carpet-settings-section__select:focus{border-color:var(--accent-color, #007aff)}.carpet-settings-section__select:hover{background:var(--surface-tertiary, #eee)}.carpet-settings-section__select:disabled{opacity:.5;cursor:not-allowed}.consumables-section{display:flex;flex-direction:column;gap:1rem}.consumables-section__item{display:flex;flex-direction:column;gap:.375rem}.consumables-section__info{display:flex;justify-content:space-between;align-items:center}.consumables-section__label{font-size:.875rem;font-weight:500;color:var(--text-primary, #000)}.consumables-section__stats{font-size:.75rem;color:var(--text-secondary, #666)}.consumables-section__progress{height:.375rem;background:var(--progress-bg, rgba(0, 0, 0, .1));border-radius:.1875rem;overflow:hidden}.consumables-section__progress-bar{height:100%;border-radius:.1875rem;transition:width .3s ease}.consumables-section__reset{align-self:flex-end;padding:.25rem .75rem;font-size:.75rem;font-weight:500;color:var(--accent-color, #007aff);background:none;border:1px solid var(--accent-color, #007aff);border-radius:.375rem;cursor:pointer;transition:all .2s ease}.consumables-section__reset:hover{background:var(--accent-color, #007aff);color:var(--text-primary-invert)}.consumables-section__reset:active{opacity:.8}.consumables-section__reset--armed,.consumables-section__reset--armed:hover{color:var(--text-primary-invert);background:var(--error-color, #db4437);border-color:var(--error-color, #db4437)}.device-info-section{display:flex;flex-direction:column;gap:.75rem}.device-info-section__item{display:flex;justify-content:space-between;align-items:center;padding:.25rem 0;border-bottom:1px solid var(--divider-color, rgba(0, 0, 0, .06))}.device-info-section__item:last-child{border-bottom:none}.device-info-section__label{font-size:.875rem;color:var(--text-secondary, #666)}.device-info-section__value{font-size:.875rem;font-weight:500;color:var(--text-primary, #000);unicode-bidi:plaintext}.quick-settings-section{display:flex;flex-direction:column;gap:.75rem}.quick-settings-section__item{display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:.5rem 0}.quick-settings-section__item--child{margin-left:1rem;padding-left:.75rem;border-left:2px solid var(--accent-color, #007aff)}.quick-settings-section__info{display:flex;flex-direction:column;gap:.125rem;flex:1;min-width:0}.quick-settings-section__label{font-size:.875rem;font-weight:500;color:var(--text-primary, #333)}.quick-settings-section__description{font-size:.75rem;color:var(--text-secondary, #666);line-height:1.3}.quick-settings-section__actions{display:flex;flex-direction:column;gap:.5rem;margin-top:.5rem;padding-top:.75rem;border-top:1px solid var(--border-color, #e0e0e0)}.quick-settings-section__actions-label{font-size:.75rem;font-weight:500;color:var(--text-secondary, #666);text-transform:uppercase;letter-spacing:.5px}.quick-settings-section__actions-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(80px,1fr));gap:.5rem}.quick-settings-section__action-button{display:flex;flex-direction:column;align-items:center;gap:.375rem;padding:.75rem .5rem;background:var(--surface-secondary, #f5f5f5);border:1px solid var(--border-color, #e0e0e0);border-radius:.5rem;cursor:pointer;transition:all .2s ease}.quick-settings-section__action-button:hover{background:var(--surface-tertiary, #eee);border-color:var(--accent-color, #007aff)}.quick-settings-section__action-button:active{transform:scale(.98)}.quick-settings-section__action-icon{display:flex;align-items:center;justify-content:center;color:var(--accent-color, #007aff)}.quick-settings-section__action-label{font-size:.75rem;font-weight:500;color:var(--text-primary, #333);text-align:center;line-height:1.2}.volume-section{display:flex;flex-direction:column;gap:.75rem}.volume-section__row{display:flex;flex-direction:row;gap:1rem}.volume-section__item{display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:.5rem 0}.volume-section__item--select{flex-direction:column;align-items:stretch;gap:.5rem}.volume-section__info{display:flex;flex-direction:column;gap:.125rem;flex:1;min-width:0}.volume-section__label{font-size:.875rem;font-weight:500;color:var(--text-primary, #333)}.volume-section__description{font-size:.75rem;color:var(--text-secondary, #666);line-height:1.3}.volume-section__select{width:100%;padding:.5rem 2.5rem .5rem .75rem;font-size:.875rem;font-weight:500;color:var(--text-primary, #333);background:var(--surface-secondary, #f5f5f5);border:1px solid var(--border-color, #e0e0e0);border-radius:.5rem;cursor:pointer;appearance:none;background-image:url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");background-repeat:no-repeat;background-position:right .75rem center;background-size:1rem}.volume-section__select:hover{border-color:var(--accent-color, #007aff)}.volume-section__select:focus{outline:none;border-color:var(--accent-color, #007aff);box-shadow:0 0 0 2px #007aff33}.volume-section__select:disabled{opacity:.5;cursor:not-allowed}.volume-section__control{display:flex;align-items:center;gap:.75rem;flex:1}.volume-section__icon{display:flex;align-items:center;justify-content:center;color:var(--text-secondary, #666);flex-shrink:0}.volume-section__slider-container{flex:1;padding-top:1.5rem;margin-top:1rem}.volume-section__slider-wrapper{position:relative;width:100%}.volume-section__slider{-webkit-appearance:none;appearance:none;width:100%;height:6px;border-radius:3px;outline:none;cursor:pointer}.volume-section__slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:20px;height:20px;border-radius:50%;background:var(--accent-color, #007aff);cursor:pointer;box-shadow:0 2px 4px #0003;transition:transform .1s ease}.volume-section__slider::-webkit-slider-thumb:hover{transform:scale(1.1)}.volume-section__slider::-moz-range-thumb{width:20px;height:20px;border-radius:50%;background:var(--accent-color, #007aff);cursor:pointer;border:none;box-shadow:0 2px 4px #0003;transition:transform .1s ease}.volume-section__slider::-moz-range-thumb:hover{transform:scale(1.1)}.volume-section__tooltip{position:absolute;top:-1.75rem;transform:translate(-50%);background:var(--accent-color, #007aff);color:var(--text-primary-invert);padding:.25rem .5rem;border-radius:4px;font-size:.75rem;font-weight:500;white-space:nowrap;pointer-events:none}[dir=rtl] .volume-section__tooltip{transform:translate(50%)}.volume-section__tooltip:after{content:"";position:absolute;top:100%;left:50%;transform:translate(-50%);border:4px solid transparent;border-top-color:var(--accent-color, #007aff)}.volume-section__test-button{display:flex;align-items:center;justify-content:center;gap:.5rem;padding:.625rem 1rem;background:var(--surface-secondary, #f5f5f5);border:1px solid var(--border-color, #e0e0e0);border-radius:8px;color:var(--text-primary, #333);font-size:.875rem;font-weight:500;cursor:pointer;transition:all .2s ease}.volume-section__test-button:hover{background:var(--surface-tertiary, #eee)}.volume-section__test-button:active{transform:scale(.98)}.volume-section__test-button svg{color:var(--accent-color, #007aff)}.floor-settings-section{display:flex;flex-direction:column;gap:.75rem}.floor-settings-section__item{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.5rem 0}.floor-settings-section__item--select{flex-direction:column;align-items:stretch;gap:.5rem}.floor-settings-section__info{display:flex;flex-direction:column;gap:.125rem;flex:1;min-width:0}.floor-settings-section__label{font-size:.875rem;font-weight:500;color:var(--text-primary, #333)}.floor-settings-section__description{font-size:.75rem;color:var(--text-secondary, #666);line-height:1.3}.floor-settings-section__select{width:100%;padding:.625rem .75rem;font-size:.875rem;color:var(--text-primary, #333);background:var(--surface-secondary, #f5f5f5);border:1px solid var(--border-color, #e0e0e0);border-radius:8px;cursor:pointer;outline:none;transition:border-color .2s ease}.floor-settings-section__select:focus{border-color:var(--accent-color, #007aff)}.floor-settings-section__select:hover{background:var(--surface-tertiary, #eee)}.floor-settings-section__select:disabled{opacity:.5;cursor:not-allowed}.edge-corner-section{display:flex;flex-direction:column;gap:.75rem}.edge-corner-section__sub-settings{display:flex;flex-direction:column;gap:.5rem;margin-top:-.25rem}.edge-corner-section__item{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.5rem 0}.edge-corner-section__item--indented{padding-left:1rem;border-left:2px solid var(--border-color, #e0e0e0);margin-left:.5rem}.edge-corner-section__item--select{flex-direction:column;align-items:stretch;gap:.5rem}.edge-corner-section__info{display:flex;flex-direction:column;gap:.125rem;flex:1;min-width:0}.edge-corner-section__label{font-size:.875rem;font-weight:500;color:var(--text-primary, #333)}.edge-corner-section__description{font-size:.75rem;color:var(--text-secondary, #666);line-height:1.3}.edge-corner-section__select{width:100%;padding:.625rem .75rem;font-size:.875rem;color:var(--text-primary, #333);background:var(--surface-secondary, #f5f5f5);border:1px solid var(--border-color, #e0e0e0);border-radius:8px;cursor:pointer;outline:none;transition:border-color .2s ease}.edge-corner-section__select:focus{border-color:var(--accent-color, #007aff)}.edge-corner-section__select:hover{background:var(--surface-tertiary, #eee)}.edge-corner-section__select:disabled{opacity:.5;cursor:not-allowed}.dock-settings-section{display:flex;flex-direction:column;gap:.75rem}.dock-settings-section__item{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.5rem 0}.dock-settings-section__item--select,.dock-settings-section__item--segmented{flex-direction:column;align-items:stretch;gap:.5rem}.dock-settings-section__info{display:flex;flex-direction:column;gap:.125rem;flex:1;min-width:0}.dock-settings-section__label{font-size:.875rem;font-weight:500;color:var(--text-primary, #333)}.dock-settings-section__description{font-size:.75rem;color:var(--text-secondary, #666);line-height:1.3}.dock-settings-section__select{width:100%;padding:.625rem .75rem;font-size:.875rem;color:var(--text-primary, #333);background:var(--surface-secondary, #f5f5f5);border:1px solid var(--border-color, #e0e0e0);border-radius:8px;cursor:pointer;outline:none;transition:border-color .2s ease}.dock-settings-section__select:focus{border-color:var(--accent-color, #007aff)}.dock-settings-section__select:hover{background:var(--surface-tertiary, #eee)}.dock-settings-section__select:disabled{opacity:.5;cursor:not-allowed}.dock-settings-section__button{padding:.5rem 1rem;font-size:.8125rem;font-weight:500;border:1px solid var(--accent-color, #007aff);border-radius:.5rem;background:var(--accent-color, #007aff);color:var(--text-primary-invert);cursor:pointer;transition:all .2s ease;white-space:nowrap}.dock-settings-section__button:hover:not(:disabled){background:var(--accent-color-hover, #0056b3)}.dock-settings-section__button:disabled{opacity:.5;cursor:not-allowed}.map-settings-section{display:flex;flex-direction:column;gap:.75rem}.map-settings-section__item{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.5rem 0}.map-settings-section__item--select{flex-direction:column;align-items:stretch;gap:.5rem}.map-settings-section__info{display:flex;flex-direction:column;gap:.125rem;flex:1;min-width:0}.map-settings-section__label{font-size:.875rem;font-weight:500;color:var(--text-primary, #333)}.map-settings-section__description{font-size:.75rem;color:var(--text-secondary, #666);line-height:1.3}.map-settings-section__select{width:100%;padding:.625rem .75rem;font-size:.875rem;color:var(--text-primary, #333);background:var(--surface-secondary, #f5f5f5);border:1px solid var(--border-color, #e0e0e0);border-radius:8px;cursor:pointer;outline:none;transition:border-color .2s ease}.map-settings-section__select:focus{border-color:var(--accent-color, #007aff)}.map-settings-section__select:hover{background:var(--surface-tertiary, #eee)}.map-settings-section__select:disabled{opacity:.5;cursor:not-allowed}.map-settings-section__actions{display:flex;flex-direction:column;gap:.5rem;margin-top:.5rem;padding-top:.75rem;border-top:1px solid var(--border-color, #e0e0e0)}.map-settings-section__actions-label{font-size:.75rem;font-weight:500;color:var(--text-secondary, #666);text-transform:uppercase;letter-spacing:.5px}.map-settings-section__actions-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:.5rem}.map-settings-section__action-button{display:flex;flex-direction:column;align-items:center;gap:.375rem;padding:.75rem .5rem;background:var(--surface-secondary, #f5f5f5);border:1px solid var(--border-color, #e0e0e0);border-radius:.5rem;cursor:pointer;transition:all .2s ease}.map-settings-section__action-button:hover{background:var(--surface-tertiary, #eee);border-color:var(--accent-color, #007aff)}.map-settings-section__action-button:active{transform:scale(.98)}.map-settings-section__action-button:disabled{opacity:.5;cursor:not-allowed}.map-settings-section__action-icon{display:flex;align-items:center;justify-content:center;color:var(--accent-color, #007aff)}.map-settings-section__action-label{font-size:.75rem;font-weight:500;color:var(--text-primary, #333);text-align:center;line-height:1.2}.settings-panel{height:100%}.settings-panel__title{font-size:1.25rem;font-weight:600;margin:0 0 1rem;text-align:center;color:var(--text-primary, #000)}.settings-panel__scroll-wrapper{height:90%;overflow-y:auto}.settings-panel__sections{display:flex;flex-direction:column;gap:.25rem;padding-right:.25rem}[dir=rtl] .settings-panel__sections{padding-right:0;padding-left:.25rem}.settings-panel__sections::-webkit-scrollbar{width:4px}.settings-panel__sections::-webkit-scrollbar-track{background:transparent}.settings-panel__sections::-webkit-scrollbar-thumb{background:var(--scrollbar-thumb, rgba(0, 0, 0, .2));border-radius:2px}.dreame-vacuum-card{--card-bg: var(--ha-card-background, var(--card-background-color, #fff));--surface-bg: var(--card-background-color, #fff);--surface-secondary: var(--secondary-background-color, #f0f0f0);--surface-tertiary: var(--secondary-background-color, #e8e8e8);--surface-bg-hover: color-mix(in srgb, var(--primary-text-color, #000) 8%, transparent);--text-primary: var(--primary-text-color, #1a1a1a);--text-primary-invert: var(--text-primary-color, #fff);--text-secondary: var(--secondary-text-color, #666);--text-tertiary: var(--disabled-text-color, #999);--accent-color: var(--primary-color, #03a9f4);--accent-color-hover: color-mix(in srgb, var(--accent-color) 85%, var(--primary-text-color, #000));--accent-bg: color-mix(in srgb, var(--accent-color) 20%, transparent);--accent-bg-hover: color-mix(in srgb, var(--accent-color) 30%, transparent);--accent-bg-secondary: color-mix(in srgb, var(--accent-color) 10%, transparent);--accent-bg-secondary-hover: color-mix(in srgb, var(--accent-color) 20%, transparent);--accent-bg-transparent: color-mix(in srgb, var(--accent-color) 20%, transparent);--accent-shadow: color-mix(in srgb, var(--accent-color) 40%, transparent);--accent-color-shadow-color: color-mix(in srgb, var(--accent-color) 25%, transparent);--warning-shadow: color-mix(in srgb, var(--warning-color, #ffa600) 40%, transparent);--error-color-hover: color-mix(in srgb, var(--error-color, #db4437) 85%, var(--primary-text-color, #000));--error-shadow: color-mix(in srgb, var(--error-color, #db4437) 40%, transparent);--border-color: var(--divider-color, #e0e0e0);--overlay-bg: transparent;--card-shadow: rgba(0, 0, 0, .12);--card-shadow-hover: rgba(0, 0, 0, .18);--handle-shadow: rgba(0, 0, 0, .2);--handle-bg: color-mix(in srgb, var(--primary-text-color, #000) 15%, transparent);--backdrop-bg: rgba(0, 0, 0, .5);--toggle-active: color-mix(in srgb, var(--accent-color) 25%, transparent);--toggle-active-border: var(--accent-color);--toggle-active-shadow-color: var(--accent-color-shadow-color);position:relative;container-name:dreame-card;container-type:inline-size;background:var(--card-bg);color:var(--text-primary);border:var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--border-color));border-radius:var(--ha-card-border-radius, .75rem);overflow:hidden;box-shadow:var(--ha-card-box-shadow, none);font-family:inherit}.dreame-vacuum-card__error{padding:1.25rem;color:var(--error-color, #db4437);text-align:center;font-size:.875rem}.dreame-vacuum-card__diagnostic{margin:0 1.25rem;padding:.5rem .75rem;border-radius:.5rem;background:var(--surface-secondary);color:var(--text-secondary);font-size:.8125rem;text-align:center}.dreame-vacuum-card__container{display:flex;flex-direction:column;gap:1rem}.dreame-vacuum-card__header,.dreame-vacuum-card__footer{display:flex;flex-direction:column;gap:1rem;min-width:0}.dreame-vacuum-card__map{min-width:0}.dreame-vacuum-card__controls{padding:0 1.25rem 1.25rem}@container dreame-card (min-width: 48rem){.dreame-vacuum-card__container{--wide-max-height: calc(100dvh - var(--header-height, 56px) - 1rem);display:grid;grid-template-columns:minmax(18rem,28rem) minmax(0,1fr);grid-template-rows:auto minmax(0,1fr);grid-template-areas:"header map" "footer map";align-items:stretch;max-height:var(--wide-max-height)}.dreame-vacuum-card__header{grid-area:header;align-self:start}.dreame-vacuum-card__footer{grid-area:footer;justify-content:safe flex-end;min-height:0;overflow-y:auto}.dreame-vacuum-card__map{display:flex;grid-area:map;padding-block:1.25rem;padding-inline-end:1.25rem}.dreame-vacuum-card__map .vacuum-map{flex:1;margin:0}.dreame-vacuum-card__map .vacuum-map__image{max-height:min(var(--map-max-height, 100dvh),var(--wide-max-height) - 2.5rem)}}`;
oS();
const $o = "botslab-vacuum-map-card", zg = "dreame-vacuum-map-card", tA = [
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
], nA = {
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
class nv extends HTMLElement {
  _root = null;
  _unmountTimer;
  _hass;
  _config;
  constructor() {
    super(), this.attachShadow({ mode: "open" });
    const i = document.createElement("style");
    i.textContent = eA, this.shadowRoot.appendChild(i);
  }
  setConfig(i) {
    const o = DT(i);
    if (!o.valid)
      throw new Error(`Invalid configuration: ${o.errors.join("; ")}`);
    o.warnings.length > 0 && pe.warn("Configuration warnings:", o.warnings), this._config = i, this.render();
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
    i || (i = document.createElement("div"), i.id = "react-root", this.shadowRoot.appendChild(i)), this._root || (this._root = Nb.createRoot(i)), this._root.render(
      /* @__PURE__ */ g.jsx(Po.StrictMode, { children: /* @__PURE__ */ g.jsx(oz, { children: /* @__PURE__ */ g.jsx(Wz, { hass: this._hass, config: this._config }, this._config.entity) }) })
    );
  }
  getCardSize() {
    return 4;
  }
  static getStubConfig(i) {
    const o = Object.keys(i?.states ?? {}).find((l) => l.startsWith("vacuum."));
    return {
      type: `custom:${$o}`,
      entity: o ?? "vacuum.botslab_vacuum",
      title: "Botslab Vacuum"
    };
  }
  static getConfigForm() {
    return {
      schema: tA,
      computeLabel: (i) => nA[i.name]
    };
  }
}
customElements.get($o) || customElements.define($o, nv);
customElements.get(zg) || customElements.define(zg, class extends nv {
});
window.customCards = window.customCards || [];
window.customCards.some((n) => n.type === $o) || window.customCards.push({
  type: $o,
  name: "Botslab Vacuum Map Card",
  description: "Interactive map card for Botslab & 360 robot vacuums with room and zone cleaning"
});
pe.info("Botslab Vacuum Map Card (React) loaded");
export {
  nv as default
};

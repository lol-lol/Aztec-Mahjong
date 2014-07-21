// Inspired by base2 and Prototype
(function () {
    var a = !1;
    this.Class = function () {}, Class.extend = function (b) {
        function h(b) {
            if (!(this instanceof arguments.callee)) return new arguments.callee(arguments);
            !a && this.init && this.init.apply(this, b.callee ? b : arguments)
        }
        var c = this.prototype,
            d, e, f, g;
        a = !0, d = new this, a = !1;
        for (e in b) d[e] = typeof b[e] == "function" && typeof c[e] == "function" ? function (a, b) {
            return function () {
                return f = this._super, this._super = c[a], g = b.apply(this, arguments), this._super = f, g
            }
        }(e, b[e]) : b[e];
        return h.prototype = d, h.constructor = h, h.extend = arguments.callee, h
    }
})(),
function () {
    function O(a, b) {
        var c = k.exec(a);
        return function (d, e) {
            (c && this[c[1]] === c[2] || a === "*") && b.call(this, d, e)
        }
    }
    var a = this,
        b = a.document,
        c = Object.prototype.toString,
        d = "function",
        e = "string",
        f = "array",
        g = "object",
        h = "ontouchstart" in a || a.DocumentTouch && document instanceof DocumentTouch,
        j = /webkit|msie/i.exec(a.navigator.userAgent),
        k = /^([#]?)([a-z][\w\-]*)$/,
        l = ["", "LEFT", "CENTER", "RIGHT"],
        m = [],
        n = null,
        o = null,
        p = !1,
        q = "Cevent" + (new Date).getTime(),
        r = 0,
        s = {},
        t = function () {
            return a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || a.oRequestAnimationFrame || a.msRequestAnimationFrame || function (b, c) {
                a.setTimeout(b, 1e3 / 60)
            }
        }(),
        u = function (a, b) {
            return c.call(a).slice(8, -1).toLowerCase() == b
        },
        v = function (a, b) {
            var c, d = 0;
            if (u(a, f))
                for (;
                    (c = a[d++]) && b(c, d) !== !1;);
        },
        w = function () {
            return document.addEventListener ? function (a, b, c) {
                a.addEventListener(b, c, !1)
            } : function (a, b, c) {
                a.attachEvent("on" + b, function (a) {
                    var a = a || event;
                    return a.preventDefault = a.preventDefault || function () {
                        this.returnValue = !1
                    }, a.stopPropagation = a.stopPropagation || function () {
                        this.cancelBubble = !0
                    }, c(a)
                })
            }
        }(),
        x = function () {
            return [].indexOf ? function (a, b) {
                return a.indexOf(b)
            } : function (a, b) {
                for (var c = 0, d = a.length; c < d; c++)
                    if (b === a[c]) return c;
                return -1
            }
        }(),
        y = function (a) {
            var b = 0,
                c = 0;
            if (a.offsetParent)
                do b += a.offsetLeft, c += a.offsetTop; while (a = a.offsetParent);
            return {
                x: b,
                y: c
            }
        },
        z = function (a, b, c) {
            var d = a[q],
                e;
            return d || (d = a[q] = ++r), e = s[d], e || (e = s[d] = {}), b && c !== undefined && (e[b] = c), b ? e[b] : e
        },
        A = function (a, b) {
            if (!a) return;
            var c = a[q];
            c && s[c] && (b ? delete s[c][b] : delete s[c])
        },
        B = function (a, b, c) {
            var d = z(a),
                e;
            v(b.split(" "), function (a) {
                e = d[a] = d[a] || [], e.push(c)
            })
        },
        C = function (a, b, c, d) {
            var e, f = 0,
                g = !0;
            c.ctx.save(), c.ctx.scale(c.__zoom, c.__zoom);
            for (; e = b[f++];) e.call(a, c, d) === !1 && (g = !1);
            return c.ctx.restore(), g || d.preventDefault(), g
        },
        D = function (a, b, c, d) {
            var e = z(a, b),
                f = z(d.cv, b);
            e && e.length && m.push(a, e), f && f.length && m.push(a, f)
        },
        E = function (a, b) {
            var c, d;
            a.clear();
            for (c = 0, d = m.length; c < d; c += 2) C(m[c], m[c + 1], a, b);
            m = [], a.draw()
        },
        F, G = function (b, c) {
            b.preventDefault(), b = b.touches ? b.touches[0] : b, c.x = ((b && b.pageX - c._pos.x + 1 || a.event.offsetX + 1) - 1) / c.__zoom, c.y = ((b && b.pageY - c._pos.y + 1 || a.event.offsetY + 1) - 1) / c.__zoom;
            var d, e = c._shapes,
                f = e.length;
            while (d = e[--f])
                if (d.hitTest(c)) return d
        },
        H = function (b, c) {
            return i = 0,
                function (c) {
                    var d = c.touches ? c.touches[0] : c;
                    c.preventDefault(), b.lastX = b.x, b.lastY = b.y, b.x = ((c && d.pageX - b._pos.x + 1 || a.event.offsetX + 1) - 1) / b.__zoom, b.y = ((c && d.pageY - b._pos.y + 1 || a.event.offsetY + 1) - 1) / b.__zoom, !!b._clicked, b._curHover && D(b._curHover, "mousemove", c, b), F = !0, m.length && E(b, c)
                }
        },
        I = function (a) {
            return function (b) {
                var c = a._curHover = G(b, a),
                    d = l[b.which];
                a._clicked = !0, n = a.cv, a[d] = !0, c ? (D(c, "mousedown", b, a), c !== a.focused && (D(c, "focus", b, a), a.focused && D(a.focused, "blur", b, a)), a.focused = c) : a.focused && (D(a.focused, "blur", b, a), a.focused = null), m.length && E(a, b), a.LEFT = a.CENTER = a.RIGHT = undefined
            }
        },
        J = function (a) {
            return function (b) {
                a._clicked = !1, a._curHover && (D(a._curHover, "mouseup", b, a), !F && h && D(a._curHover, "click", b, a)), F = !1, m.length && E(a, b), a._curHover = null
            }
        },
        K = function (a) {
            return function (b) {
                a._curHover && D(a._curHover, "click", b, a), m.length && E(a, b)
            }
        },
        L = function (a) {
            return function (b) {
                a._curHover && D(a._curHover, "dblclick", b, a), m.length && E(a, b)
            }
        },
        M = function () {
            var a = {
                    specialKeys: {
                        27: "esc",
                        9: "tab",
                        32: "space",
                        13: "return",
                        8: "backspace",
                        145: "scroll",
                        20: "capslock",
                        144: "numlock",
                        19: "pause",
                        45: "insert",
                        36: "home",
                        46: "del",
                        35: "end",
                        33: "pageup",
                        34: "pagedown",
                        37: "left",
                        38: "up",
                        39: "right",
                        40: "down",
                        109: "-",
                        112: "f1",
                        113: "f2",
                        114: "f3",
                        115: "f4",
                        116: "f5",
                        117: "f6",
                        118: "f7",
                        119: "f8",
                        120: "f9",
                        121: "f10",
                        122: "f11",
                        123: "f12",
                        191: "/",
                        96: "0",
                        97: "1",
                        98: "2",
                        99: "3",
                        100: "4",
                        101: "5",
                        102: "6",
                        103: "7",
                        104: "8",
                        105: "9",
                        106: "*",
                        107: "+",
                        110: ".",
                        111: "/",
                        187: "+",
                        189: "-"
                    },
                    shiftNums: {
                        "`": "~",
                        1: "!",
                        2: "@",
                        3: "#",
                        4: "$",
                        5: "%",
                        6: "^",
                        7: "&",
                        8: "*",
                        9: "(",
                        0: ")",
                        "-": "_",
                        "=": "+",
                        ";": ":",
                        "'": '"',
                        ",": "<",
                        ".": ">",
                        "/": "?",
                        "\\": "|"
                    }
                },
                b;
            return function (c, d) {
                var e = z(d.cv, c, {}),
                    f = z(e);
                return function (e) {
                    if (n !== d.cv && !d.__globalkeyevents) return;
                    b = c == "keydown" ? e.keyCode : b;
                    var g = a.specialKeys[b],
                        h = g || String.fromCharCode(b || e.charCode).toLowerCase(),
                        i = "",
                        j;
                    e.altKey && (i += "alt+");
                    if (e.ctrlKey || e.metaKey) i += "ctrl+";
                    e.shiftKey && (i += "shift+"), j = f[i + h] || f[i + a.shiftNums[h]] || i === "shift+" && f[a.shiftNums[h]] || f.any;
                    if (j) {
                        var k = C(d, j, d, e);
                        return d.play || d.redraw(), k
                    }
                }
            }
        }(),
        N = function (c, d) {
            c = u(c, e) ? b.getElementById(c) : c;
            if (c.getContext || a.G_vmlCanvasManager) return new N.fn.init(c, d);
            throw Error("Your browser sucks")
        };
    N.all_instances = [], N.forse_redraw = function () {
        for (var a = 0; a < N.all_instances.length; a++) N.all_instances[a].redraw()
    }, N.fn = N.prototype = {
        init: function (a, c) {
            this.cv = a, a.getContext || G_vmlCanvasManager.initElement(a), this.ctx = a.getContext("2d"), this.width = a.width, this.height = a.height, this.__zoom = 1, this.x = 0, this.y = 0, this.cv[q] ? (this._shapes = z(a, "shapes"), this._last = c) : (N.all_instances.push(this), this._shapes = z(a, "shapes", []), this._last = null, this.calcCanvasPosition(), /mobile/i.exec(navigator.userAgent) || (w(a, "mousemove", H(this), !1), w(a, "dblclick", L(this), !1), w(a, "click", K(this), !1), w(a, "mouseup", J(this), !1), w(a, "mousedown", I(this), !1), w(b, "keydown", M("keydown", this), !1), w(b, "keyup", M("keyup", this), !1), j || w(b, "keypress", M("keypress", this), !1), "onselectstart" in a && (a.onselectstart = function () {
                return !1
            }, a.onmousedown = function () {
                return !1
            })), h && (w(a, "touchmove", H(this), !1), w(a, "touchend", J(this), !1), w(a, "touchstart", I(this), !1)))
        },
        calcCanvasPosition: function () {
            return this._pos = y(this.cv), this
        },
        get: function (a) {
            return a = a < 0 ? this._shapes.length + a : a, this._shapes[a] || this._shapes
        },
        getAll: function (a) {
            var b = [],
                c = k.exec(a),
                d, e;
            return a === "*" ? b = this._shapes.slice(0) : c && (d = c[1], e = c[2], v(this._shapes, function (a) {
                a[d] === e && b.push(a)
            })), b
        },
        remove: function (a) {
            var b = x(this._shapes, a);
            b >= 0 && this._shapes.splice(b, 1);
            return b
        },
        addId: function (a) {
            var b = k.exec(a),
                c = this._last;
            return b && !b[1] && c && (c.length ? v(c, function (b) {
                b["#"] = a
            }) : c["#"] = a), this
        },
        removeId: function () {
            var a = this._last;
            return a && !a.length ? a["#"] = "" : v(a, function (a) {
                a["#"] = ""
            }), this
        },
        find: function (a) {
            var b = this.getAll(a);
            return N(this.cv, b.length == 1 ? b[0] : b)
        },
        attr: function (a, b) {
            var c = this._last;
            return c && c.attr ? c.attr(a, b) : v(c, function (c) {
                c.attr(a, b)
            }), this
        },
        rotate: function (a) {
            return this.attr({
                rotation: a
            })
        },
        translate: function (a, b) {
            return this.attr({
                tx: a,
                ty: b
            })
        },
        scale: function (a, b) {
            return this.attr({
                scaleX: a,
                scaleY: b
            })
        },
        skewX: function (a) {
            return this.attr({
                skewX: a
            })
        },
        skewY: function (a) {
            return this.attr({
                skewY: a
            })
        },
        zoomTo: function (a) {
            return u(a, "number") && (this.__zoom = a), this
        },
        zoomIn: function () {
            return this.zoomTo(this.__zoom + .1), !1
        },
        zoomOut: function () {
            return this.zoomTo(this.__zoom - .1), !1
        },
        setGlobalKeyEvents: function (a) {
            return this.__globalkeyevents = a, this
        },
        bind: function (a, b, c) {
            var d = c || this._last,
                f;
            if (u(a, e) && u(b, g))
                for (f in b) this[f](a, b[f]);
            else if (u(a, g))
                for (f in a) this[f](a[f]);
            else d && !d.length ? B(d, a, b) : v(d, function (c) {
                B(c, a, b)
            });
            return this
        },
        beforeDraw: function (a) {
            return u(a, d) && (this.__beforeDraw = a), this
        },
        afterDraw: function (a) {
            return u(a, d) && (this.__afterDraw = a), this
        },
        clear: function (a, b, c, d) {
            return a = a || 0, b = b || 0, c = c || this.cv.width, d = d || this.cv.height, this.ctx.clearRect(a, b, c / this.__zoom, d / this.__zoom), this
        },
        draw: function () {
            var a, b = 0,
                c = this._shapes;
            this.ctx.save(), N.__zoom = this.__zoom;
            for (; a = c[b++];) a.draw(this.ctx);
            return N.__zoom = 1, this.ctx.restore(), this
        },
        redraw: function () {
            return this.clear().draw()
        },
        loop: function (a) {
            var b = this,
                c = z(this.cv),
                e;
            return u(a, d) && (c.loop = a), a = c.loop, e = this.play = ++r,
                function () {
                    if (e !== b.play) return;
                    t(arguments.callee), b.redraw(), a && (b.ctx.save(), a.call(b, b), b.ctx.restore()), b.frameCount += 1
                }(), this
        },
        frameCount: 0,
        stop: function () {
            return delete this.play, this
        }
    }, N.fn.init.prototype = N.prototype, N.addEventListener = w, v("mousemove mouseover mouseout mousedown mouseup click dblclick focus blur".split(" "), function (a) {
        N.fn[a] = function (b, c) {
            var e;
            return u(c, d) && (b = O(b, c), e = this.cv), this.bind(a, b, e)
        }
    }), v("keydown keypress keyup".split(" "), function (a) {
        N.fn[a] = function (b, c) {
            return !c && u(b, d) && (c = b, b = "any"), b = (b + "").toLowerCase(), this.bind(b, c, z(this.cv, a))
        }
    }), j && (N.fn.keypress = N.fn.keydown), N.fn.drag = function (a) {
        var b, c, d, e, f = [],
            g = "Cevent-drag" + q,
            h = this._last;
        return h && !h.length && (h = [h]), v(h, function (a) {
            z(a, g) || (z(a, g, !0), f.push(a))
        }), e = N(this.cv, f), a && (b = a.start, c = a.move, d = a.end), e.bind({
            mousedown: function (a, b) {
                a.LEFT && (o = this)
            },
            mousemove: function (a, d) {
                this === o && (this.rmove(a.x - a.lastX, a.y - a.lastY), p || (p = !0, b && b.call(this, a, d)), c && c.call(this, a, d))
            },
            mouseup: function (a, b) {
                this === o && (o = p = null, d && d.call(this, a, b))
            }
        }), this
    }, N.registre = N.register = function (a, b) {
        a = a.toLowerCase();
        var c = a.charAt(0).toUpperCase() + a.substring(1);
        this[c] = b, this.prototype[a] = function () {
            var c = b.apply(this, arguments);
            return c[""] = a, this._shapes.push(c), this._last = c, this
        }
    }, w(b, "mousedown", function (a) {
        var b = a.target || a.srcElement;
        b = b.nodeName == "OBJECT" ? b.parentNode : b, b[q] || (n = b)
    }, !1), a.Cevent = N
}(),
function (a, b) {
    var c = Math,
        d = c.PI,
        e = 2 * d,
        f = d / 180,
        g = c.sqrt,
        h = c.pow,
        i = c.cos,
        j = c.sin,
        k = c.round,
        l = c.abs,
        m = c.acos,
        n = c.atan2,
        o, p = Object.prototype.hasOwnProperty,
        q = Array.prototype.slice,
        r = {
            tx: 0,
            ty: 0,
            scaleX: 1,
            scaleY: 1,
            skewX: 0,
            skewY: 0,
            fill: "#000",
            stroke: "",
            lineWidth: 1,
            lineJoin: "miter",
            lineCap: "butt",
            alpha: 1,
            rotation: 0,
            composite: "source-over",
            shadowColor: "rgba(0, 0, 0, 0.0)",
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 0,
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: 10,
            fontFamily: "Arial"
        },
        s = document.createElement("canvas"),
        t = s.getContext && s.getContext("2d"),
        u = function (a, b) {
            return g(h(a.x - b.x, 2) + h(a.y - b.y, 2))
        },
        v = function (a, b, c, d, e) {
            var f = c - a,
                g = d - b,
                h = {},
                i;
            if (f === 0 && g === 0) return;
            return i = ((e.x - a) * f + (e.y - b) * g) / (f * f + g * g), i < 0 ? h = {
                x: a,
                y: b
            } : i > 1 ? h = {
                x: c,
                y: c
            } : h = {
                x: a + i * f,
                y: b + i * g
            }, u(h, e)
        },
        w = function (a, b, c) {
            return c = f * c, {
                x: a * i(c) - b * j(c),
                y: a * j(c) + b * i(c)
            }
        },
        x = function (a, b) {
            var c;
            for (c in b) p.call(b, c) && (a[c] = b[c])
        },
        y = Class.extend({
            init: function (a, b) {
                this.x = a || 0, this.y = b || 0, x(this, r)
            },
            position: function () {
                var a = w(this.x * this.scaleX, this.y * this.scaleY, this.rotation);
                return {
                    x: a.x + this.tx,
                    y: a.y + this.ty
                }
            },
            rmove: function (a, b) {
                this.tx += a, this.ty += b
            },
            attr: function (a, b) {
                var c;
                if (p.call(r, a)) this[a] = b;
                else
                    for (c in a) this[c] = a[c];
                return this
            },
            applyStyle: function (a) {
                var b = this.shadowBlur,
                    c = this.shadowOffsetX,
                    d = this.shadowOffsetY;
                a.fillStyle = this.fill, a.globalAlpha = this.alpha, a.globalCompositeOperation = this.composite, this.stroke && (a.strokeStyle = this.stroke, a.lineWidth = this.lineWidth);
                if (c || d || b) a.shadowColor = this.shadowColor, a.shadowOffsetX = c, a.shadowOffsetY = d, a.shadowBlur = b
            },
            setTransform: function (b) {
                var c = a.__zoom,
                    d = this.scaleX * c,
                    e = this.scaleY * c,
                    g = this.skewX * c,
                    h = this.skewY * c,
                    k = this.rotation * f,
                    l = j(k),
                    m = i(k),
                    n = this.tx * c,
                    o = this.ty * c,
                    p = m * d - l * h,
                    q = m * g - l * e,
                    r = l * d + m * h,
                    s = l * g + m * e;
                b.setTransform(p, r, q, s, n, o)
            },
            draw: function (a) {
                throw new Error("El método draw no se ha implementado")
            },
            fill_or_stroke: function (a) {
                this.fill && a.fill(), this.stroke && a.stroke()
            },
            hitTest: function (a) {
                if (t && t.isPointInPath) return this.draw(t), t.setTransform(1, 0, 0, 1, 0, 0), t.isPointInPath(a.x, a.y);
                throw Error("Método isPointInPath no soportado: Necesita FlashCanvasPro")
            }
        }),
        z = y.extend({
            init: function (a, b, c, d, e) {
                this.r = e || 0, this.w = c || 5, this.h = d || c, this._super(a, b)
            },
            draw: function (b) {
                var c = this.x,
                    d = this.y,
                    e = this.w,
                    f = this.h;
                this.applyStyle(b), this.setTransform(b), b.beginPath(), this.r ? a.setContext(b).polygon(c, d, c + e, d, c + e, d + f, c, d + f, this.r) : b.rect(c, d, k(e), k(f)), b.closePath(), this.fill && b.fill(), this.stroke && b.stroke()
            },
            hitTest: function (a) {
                if (this.skewX || this.skewY || this.r) return this._super(a);
                var b = this.position(),
                    c = w(a.x - b.x, a.y - b.y, -this.rotation);
                return c.x >= 0 && c.x <= this.w * this.scaleX && c.y >= 0 && c.y <= this.h * this.scaleY
            }
        }),
        A = z.extend({
            init: function (a, b, c) {
                this.setText(c), this._super(a, b, this.w, this.h)
            },
            applyStyle: function (a) {
                a.font = this.fontStyle + " " + this.fontWeight + " " + this.fontSize + "px " + this.fontFamily, this.h = this.fontSize, this.w = a.measureText(this.text).width, this._super(a)
            },
            setText: function (a) {
                this.text = a + ""
            },
            draw: function (a) {
                this.applyStyle(a), this.setTransform(a), this.fill && a.fillText(this.text, this.x, this.y + this.h), this.stroke && a.strokeText(this.text, this.x, this.y + this.h)
            },
            hitTest: function (a) {
                return this.skewX || this.skewY && t && t.isPointInPath ? (this.setTransform(t), t.beginPath(), t.rect(this.x, this.y, this.w, this.h), t.closePath(), t.isPointInPath(a.x, a.y)) : this._super(a)
            }
        }),
        B = z.extend({
            init: function (b, c, d) {
                this.setImg(d), this._super(b, c, this.img.width, this.img.height);
                if (!this.img.complete) {
                    var e = this;
                    this.img.onload = function () {
                        e.w = this.width, e.h = this.height, a.forse_redraw()
                    }
                } else this.w = this.img.width, this.h = this.img.height
            },
            setImg: function (a) {
                a.nodeName == "IMG" ? this.img = a : (this.img = new Image, this.img.src = a + ""), this.src = this.img.src
            },
            draw: function (a) {
                var b = this.x,
                    c = this.y;
                this.applyStyle(a), this.setTransform(a), a === t ? (a.beginPath(), a.rect(b, c, k(this.w), k(this.h)), a.closePath()) : a.drawImage(this.img, b, c)
            }
        }),
        C = z.extend({
            draw: function (a) {
                var b = this.x,
                    c = this.y,
                    d = this.w,
                    e = this.h,
                    f = .5522847498307933,
                    g = f * d,
                    h = f * e;
                this.applyStyle(a), this.setTransform(a), a.beginPath(), a.moveTo(b + d, c), a.bezierCurveTo(b + d, c - h, b + g, c - e, b, c - e), a.bezierCurveTo(b - g, c - e, b - d, c - h, b - d, c), a.bezierCurveTo(b - d, c + h, b - g, c + e, b, c + e), a.bezierCurveTo(b + g, c + e, b + d, c + h, b + d, c), a.closePath(), this.fill && a.fill(), this.stroke && a.stroke()
            },
            hitTest: y.prototype.hitTest
        }),
        D = y.extend({
            init: function (a, b, c, d, e, f) {
                this.clockwise = f, this.endAngle = e, this.startAngle = d, this.r = c, this._super(a, b)
            },
            draw: function (a) {
                var b = this.x,
                    c = this.y;
                this.applyStyle(a), this.setTransform(a), a.beginPath(), a.arc(b, c, k(this.r), this.startAngle || d * 2, this.endAngle || 0, !!this.clockwise), a.lineTo(b, c), a.closePath(), this.fill && a.fill(), this.stroke && a.stroke()
            }
        }),
        E = y.extend({
            init: function (a, b, c) {
                this.r = c || 5, this._super(a, b)
            },
            draw: function (a) {
                var b = this.x,
                    c = this.y;
                this.applyStyle(a), this.setTransform(a), a.beginPath(), a.arc(b, c, k(this.r), 0, d * 2, !0), a.closePath(), this.fill && a.fill(), this.stroke && a.stroke()
            },
            hitTest: function (a) {
                if (this.skewX || this.skewY || this.scaleX !== this.scaleY) return this._super(a);
                var b = !!this.stroke && this.lineWidth,
                    c = this.position();
                return u(a, c) <= (this.r + b) * this.scaleX
            }
        }),
        F = y.extend({
            init: function (a, b, c, d) {
                this.x2 = c, this.y2 = d, this._super(a, b), this.stroke = "#000"
            },
            rmove: function (a, b) {
                this.x += a, this.y += b, this.x2 += a, this.y2 += b
            },
            applyStyle: function (a) {
                a.lineJoin = this.lineJoin, a.lineCap = this.lineCap, this._super(a)
            },
            draw: function (a) {
                var b = this.x,
                    c = this.y;
                this.applyStyle(a), this.setTransform(a), a.beginPath(), a.moveTo(b, c), a.lineTo(this.x2, this.y2), a.stroke()
            },
            hitTest: function (a) {
                return v(this.x, this.y, this.x2, this.y2, a) <= this.lineWidth + 2
            }
        }),
        G, H, I, J, K = null,
        L = null,
        M = !1,
        N = /[MmLlZzHhVvCcQqSsTtAa]\s*([\-+]?(?:\d+[.]?\d*|[.]\d+)(?:[Ee][\-+]?\d+)?[,\s]*)*/g,
        O = /[\-+]?(?:\d+[.]?\d*|[.]\d+)(?:[Ee][\-+]?\d+)?/g,
        P = function (a, b, c, d) {
            var e = a * c + b * d,
                f = g(a * a + b * b),
                h = g(c * c + d * d),
                i = e / (f * h),
                j, k;
            return i > 1 ? i = 1 : i < -1 && (i = -1), j = l(m(i)), k = a * d - b * c, k === l(k) ? j : -j
        },
        Q = function (a, b, c) {
            return [a * i(c) - b * j(c), b * i(c) + a * j(c)]
        },
        R = function (a, b, c) {
            M && a.ctx.moveTo(b, c)
        },
        S = function (a, b) {
            G = a, H = b, K = null, L = null, M = !1
        },
        T = function () {
            if (G === o) throw new Error("No current point; can't use relative coordinates")
        },
        U = function (a, b, c, d) {
            if (b !== (c ? a.length % c : a.length) || a.length < d) throw new Error("wrong number of arguments")
        },
        V = function (a, b) {
            return this.ctx.moveTo(a, b), S(a, b), I = a, J = b, arguments.length > 2 && X.apply(this, q.call(arguments, 2)), this
        },
        W = function (a, b) {
            return M && (G = H = 0), T(), a += G, b += H, this.ctx.moveTo(a, b), S(a, b), I = a, J = b, arguments.length > 2 && Y.apply(this, q.call(arguments, 2)), this
        },
        X = function (a, b) {
            var c, d = arguments.length;
            U(arguments, 0, 2, 2), R(this, a, b), this.ctx.lineTo(a, b);
            for (c = 2; c < d; c += 2) this.ctx.lineTo(a = arguments[c], b = arguments[c + 1]);
            return S(a, b), this
        },
        Y = function (a, b) {
            var c, d = G,
                e = H,
                f = arguments.length;
            U(arguments, 0, 2, 2), T();
            for (c = 0; c < f; c += 2) this.ctx.lineTo(d += arguments[c], e += arguments[c + 1]);
            return S(d, e), this
        },
        Z = function () {
            return this.ctx.closePath(), S(this, I, J), this
        },
        $ = function (a) {
            var b, c = arguments.length;
            T();
            for (b = 0; b < c; b++) X.call(this, arguments[b], H);
            return this
        },
        _ = function (a) {
            var b, c = arguments.length;
            for (b = 0; b < c; b++) Y.call(this, arguments[b], 0);
            return this
        },
        ab = function (a) {
            var b, c = arguments.length;
            T();
            for (b = 0; b < c; b++) X.call(this, G, arguments[b]);
            return this
        },
        bb = function (a) {
            var b, c = arguments.length;
            for (b = 0; b < c; b++) Y.call(this, 0, arguments[b]);
            return this
        },
        cb = function (a, b, c, d, e, f) {
            var g, h = arguments,
                i = arguments.length;
            U(h, 0, 6, 6), R(this, a, c), this.ctx.bezierCurveTo(a, b, c, d, e, f);
            for (g = 6; g < i; g += 6) this.ctx.bezierCurveTo(h[g], h[g + 1], c = h[g + 2], d = h[g + 3], e = h[g + 4], f = h[g + 5]);
            return S(e, f), K = [c, d], this
        },
        db = function (a, b, c, d, e, f) {
            var g, h = arguments,
                i = h.length,
                j = G,
                k = H;
            U(h, 0, 6, 6), T();
            for (g = 0; g < i; g += 6) this.ctx.bezierCurveTo(j + h[g], k + h[g + 1], c = j + h[g + 2], d = k + h[g + 3], j += h[g + 4], k += h[g + 5]);
            return S(j, k), K = [c, d], this
        },
        eb = function (a, b, c, d) {
            var e, f = arguments,
                g = f.length;
            U(arguments, 0, 4, 4), R(this, a, b), this.ctx.quadraticCurveTo(a, b, c, d);
            for (e = 4; e < g; e += 4) this.ctx.quadraticCurveTo(a = f[e], b = f[e + 1], c = f[e + 2], d = f[e + 3]);
            return S(c, d), L = [a, b], this
        },
        fb = function (a, b, c, d) {
            var e, f = arguments,
                g = f.length,
                h = G,
                i = H;
            U(arguments, 0, 4, 4), T();
            for (e = 0; e < g; e += 4) this.ctx.quadraticCurveTo(a = h + f[e], b = i + f[e + 1], h += f[e + 2], i += f[e + 3]);
            return S(h, i), L = [a, b], this
        },
        gb = function () {
            if (!K) throw new Error("Last command was not a cubic bezier");
            var a, b = arguments,
                c = b.length,
                d = G,
                e = H,
                f = K[0],
                g = K[1],
                h, i, j, k, l, m;
            U(arguments, 0, 4, 4), T();
            for (a = 0; a < c; a += 4) h = d + (d - f), j = e + (e - g), i = b[a], k = b[a + 1], l = b[a + 2], m = b[a + 3], this.ctx.bezierCurveTo(h, j, i, k, l, m), d = l, e = m, f = i, g = k;
            return S(d, e), K = [f, g], this
        },
        hb = function () {
            if (!K) throw new Error("Last command was not a cubic bezier");
            var a, b = arguments,
                c = b.length,
                d = G,
                e = H,
                f = K[0],
                g = K[1],
                h, i, j, k, l, m;
            U(arguments, 0, 4, 4), T();
            for (a = 0; a < c; a += 4) h = d + (d - f), j = e + (e - g), i = d + b[a], k = e + b[a + 1], l = d + b[a + 2], m = e + b[a + 3], this.ctx.bezierCurveTo(h, j, i, k, l, m), d = l, e = m, f = i, g = k;
            return S(d, e), K = [f, g], this
        },
        ib = function () {
            if (!L) throw new Error("Last command was not a cubic bezier");
            var a, b = arguments,
                c = arguments.length,
                d = G,
                e = H,
                f = L[0],
                g = L[1],
                h, i, j, k;
            U(arguments, 0, 2, 2), T();
            for (a = 0; a < c; a += 2) h = d + (d - f), i = e + (e - g), j = arguments[a], k = arguments[a + 1], this.ctx.quadraticCurveTo(h, i, j, k), d = j, e = k, f = h, g = i;
            return S(d, e), L = [f, g], this
        },
        jb = function () {
            if (!L) throw new Error("Last command was not a cubic bezier");
            var a, b = arguments,
                c = b.length,
                d = G,
                e = H,
                f = L[0],
                g = L[1],
                h, i, j, k;
            U(arguments, 0, 2, 2), T();
            for (a = 0; a < c; a += 2) h = d + (d - f), i = e + (e - g), j = d + arguments[a], k = e + arguments[a + 1], this.ctx.quadraticCurveTo(h, i, j, k), d = j, e = k, f = h, g = i;
            return S(d, e), L = [f, g], this
        },
        kb = function (a, b, c, d, h, k, m) {
            if (!a || !b) return X.call(this, k, m);
            d = !!d, h = !!h, T();
            var n = G,
                o = H,
                p = k,
                q = m,
                r = c * f,
                s = j(r),
                t = i(r),
                u = (n - p) / 2,
                v = (o - q) / 2,
                w = t * u + s * v,
                x = -s * u + t * v,
                y, z, A, B, C, D, E, F;
            a = l(a), b = l(b), y = w * w / (a * a) + x * x / (b * b);
            if (y > 1) a *= g(y), b *= g(y), z = A = 0;
            else {
                var I = a * a,
                    J = b * b,
                    K = w * w,
                    L = x * x,
                    M = I * L + J * K;
                M = g(I * J / M - 1), d === h && (M = -M), z = M * a * x / b, A = -M * b * w / a
            }
            return B = t * (z - s) * (A + (n + p) / 2), C = s * (z + t) * (A + (o + q) / 2), u = (w - z) / a, v = (x - A) / b, D = P(1, 0, u, v), F = P(u, v, (-w - z) / a, (-x - A) / b), h && F < 0 ? F += e : !h && F > 0 && (F -= e), E = D + F, this.ellipse(B, C, a, b, r, D, E, !h), this
        },
        lb = function (a, b, c, d, e, f, g) {
            return T(), kb.call(this, a, b, c, d, e, f + G, g + H), this
        },
        mb = function (a, b, c, d, f, g, h, k) {
            f = f || 0, g = g || 0, h = h === o ? e : h;
            var l = Q(c * i(g), d * j(g), f),
                m = a + l[0],
                n = b + l[1],
                p = Q(c * i(h), d * j(h), f),
                q = a + p[0],
                r = b + p[1];
            return R(this, m, n), this.ctx.translate(a, b), this.ctx.rotate(f), this.ctx.scale(c / d, 1), this.ctx.arc(0, 0, d, g, h, !!k), this.ctx.scale(d / c, 1), this.ctx.rotate(-f), this.ctx.translate(-a, -b), S(q, r), this
        },
        nb = function () {
            var a, b = arguments,
                c = b.length;
            if (c < 6) throw new Error("not enough arguments");
            if (c % 2 === 0) {
                this.ctx.moveTo(b[0], b[1]);
                for (a = 2; a < c; a += 2) this.ctx.lineTo(b[a], b[a + 1])
            } else {
                var d = b[c - 1],
                    e = (c - 1) / 2,
                    f = (b[e * 2 - 2] + b[0]) / 2,
                    g = (b[e * 2 - 1] + b[1]) / 2,
                    h, i;
                this.ctx.moveTo(f, g);
                for (a = 0; a < e - 1; a++) this.ctx.arcTo(h = b[a * 2], i = b[a * 2 + 1], b[a * 2 + 2], b[a * 2 + 3], d, f, g), f = h, g = i;
                this.ctx.arcTo(b[e * 2 - 2], b[e * 2 - 1], b[0], b[1], d, f, g)
            }
            return this
        },
        ob = function (a) {
            var b = a.match(N),
                c, d, e, f, g, h = [];
            if (!b) throw new Error("Bad path: " + a);
            for (f = 0; c = b[f]; f++) {
                e = [], e.cmd = c.charAt(0), d = c.match(O) || [];
                for (g = 0; g < d.length; g++) e[g] = +d[g];
                h.push(e)
            }
            return h
        },
        pb = y.extend({
            init: function (a) {
                this.svgpath = ob(a), this._super(0, 0), this.svgpath[0].cmd.toLowerCase() == "m" && (this.x = this.svgpath[0][0], this.y = this.svgpath[0][1])
            },
            draw: function (b) {
                var c = this.svgpath,
                    d, e;
                this.applyStyle(b), this.setTransform(b), b.beginPath(), a.setContext(b);
                for (d = 0, e = c.length; d < e; d++) a[c[d].cmd].apply(a, c[d]);
                this.fill && b.fill(), this.stroke && b.stroke()
            }
        });
    x(a, {
            distance: u,
            __zoom: 1,
            Shape: y,
            setContext: function (a) {
                return this.ctx = a, S(0, 0), a.beginPath(), this
            },
            polygon: nb,
            ellipse: mb,
            M: V,
            m: W,
            L: X,
            l: Y,
            H: $,
            h: _,
            V: ab,
            v: bb,
            C: cb,
            c: db,
            S: gb,
            s: hb,
            Q: eb,
            q: fb,
            T: ib,
            t: jb,
            A: kb,
            a: lb,
            Z: Z,
            z: Z
        }),
        function () {
            if (!t) return;
            t.moveTo(30, 30), t.arcTo(60, 30, 60, 60, 30), t.lineTo(60, 60), t.fill();
            if (t.getImageData(58, 31, 1, 1).data[3]) {
                var a = CanvasRenderingContext2D.prototype.arcTo;

                function b(a, b, c, d) {
                    return (a - c) * (a - c) + (b - d) * (b - d)
                }
                CanvasRenderingContext2D.prototype.arcTo = function (c, d, e, f, h, i, j) {
                    if (isNaN(i + j)) return a.apply(this, arguments);
                    var k, l, m, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E;
                    if (c == i && d == j || c == e && d == f || h == 0) {
                        this.lineTo(c, d);
                        return
                    }
                    k = (e - c) * (j - d) + (f - d) * (c - i);
                    if (k == 0) {
                        this.lineTo(c, d);
                        return
                    }
                    l = b(i, j, c, d), m = b(c, d, e, f), o = b(i, j, e, f), p = (l + m - o) / (2 * g(l * m)), l = g(l), m = g(m), q = g(1 - p * p), r = h * q / (1 - p), s = (c - i) / l, t = (d - j) / l, u = (c - e) / m, v = (d - f) / m, w = c - s * r, x = d - t * r, y = c - u * r, z = d - v * r, A = k < 0, B = w + t * h * (A ? 1 : -1), C = x - s * h * (A ? 1 : -1), D = n(x - C, w - B), E = n(z - C, y - B), this.lineTo(w, x), this.arc(B, C, h, D, E, A)
                }
            }
        }(), b.FlashCanvas && (document.body.appendChild(s), FlashCanvas.initElement(s), t = s.getContext("2d"), s.style.display = "none"), t && (t.fill = t.stroke = function () {}), a.register("image", B), a.register("circle", E), a.register("arc", D), a.register("ellipse", C), a.register("rect", z), a.register("text", A), a.register("line", F), a.register("path", pb)
}(Cevent, this);
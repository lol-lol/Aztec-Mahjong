(function (a) {
    function c(a, c) {
        return b.call(a, c || 0)
    }

    function d(b) {
        return function () {
            (this._JQ || (this._JQ = a(this)))[b].apply(this._JQ, arguments)
        }
    }
    var b = [].slice;
    Function.prototype.bind || (Function.prototype.bind = function () {
        var a = this,
            b = arguments[0],
            d = c(arguments, 1);
        return function () {
            return a.apply(b, d.concat(c(arguments)))
        }
    }), a.shuffle = function (a) {
        var b, c, d = a.length;
        if (d)
            while (--d) c = ~~(Math.random() * (d + 1)), b = a[c], a[c] = a[d], a[d] = b;
        return a
    }, a.fullScreen = function () {
        document.documentElement.scrollHeight < window.outerHeight / window.devicePixelRatio ? (document.body.style.height = window.outerHeight / window.devicePixelRatio + 1 + "px", setTimeout(function () {
            window.scrollTo(1, 1)
        }, 0)) : window.scrollTo(1, 1)
    }, a.tmpl = function (a, b) {
        var c = document.getElementById(a).innerHTML;
        for (var d in b) b.hasOwnProperty(d) && (c = c.replace(new RegExp("{" + d + "}", "g"), b[d]));
        return c
    }, a.eventEmitter = {
        emit: d("trigger"),
        once: d("one"),
        on: d("on"),
        off: d("off")
    }
})(jQuery),
function (a, b, c, d) {
    function o(a) {
        function f() {
            s(this.map, this.image), this.$$loaded = !0, this.view.clear(), this.start()
        }
        var b = this,
            d = c("#modal");
        this.opts = c.extend(n, a), this.view = new Cevent("canvas"), this.timer = new game.Timer("game-time"), this.cmdManager = new game.CommandManager(this.opts.maxUndo), c("#toolbar").bind("touchmove", function (a) {
            a.preventDefault()
        }), c("#restart").click(this.restart.bind(this)), c("#shuffle").click(p.bind(this)), c("#undo").click(this.undo.bind(this)), c("#options-button").click(function () {
            game.Modal.open("options"), c("#tile-style").attr("value", b.opts.sprite)
        }), d.on("click", "button.shuffle", function () {
            p.call(b), game.Modal.close()
        }), d.on("click", "button.restart", function () {
            b.restart.call(b), game.Modal.close()
        }), this.on("gameover", function () {
            i || (i = !0, game.Modal.open("gameover"))
        }), this.on("shuffle", this.timer.addTime.bind(this.timer, this.opts.timePenalty));
        var e = {
            images: {
                image: this.opts.sprite
            },
            ajax: {
                map: "maps/" + this.opts.map + ".txt"
            },
            context: this
        };
        d.on("click", "#maps img", function (a) {
            b.$$loaded = !1, e.ajax.map = "maps/" + c(this).data("map") + ".txt", game.loadResources(e, f)
        }), d.on("change", "select", function (a) {
            e.images.image = b.opts.sprite = this.value, game.loadResources(e, b.view.redraw.bind(b.view))
        }), game.loadResources(e, f), v.call(this)
    }

    function p() {
        var a = this.view.getAll("tile"),
            b = c.map(a, function (a) {
                return a.imgx
            });
        c.each(c.shuffle(b), function (b, c) {
            a[b].imgx = c
        }), this.emit("shuffle"), this.view.redraw(), setTimeout(r.bind(this), 100)
    }

    function q(a) {
        var b = a.layer + "," + (a.col - 1) + "," + a.row,
            c = a.layer + "," + (a.col + 1) + "," + a.row,
            d = a.layer + 1 + "," + a.col + "," + a.row;
        return l[b] && l[c] || l[d] ? null : a
    }

    function r() {
        var a = c.map(this.view.get(), function (a) {
                return q(a)
            }),
            b = {},
            d = 0,
            e = a.length;
        while (e) b[a[--e].imgx] ? (d++, b[a[e].imgx] = 0) : b[a[e].imgx] = 1;
        !d && m != f.length && this.emit("gameover"), g.innerHTML = d + (d == 1 ? " pair" : " pairs") + " remaining"
    }

    function s(a, b) {
        var c = a.match(/:/g).length,
            d = b.width / 64,
            e;
        if (c % 2) throw new Error("The number number of tiles should be even");
        f = [];
        do e = ~~(Math.random() * d), f.push(e, e); while (c -= 2)
    }

    function t() {
        var a = this.map.split(/#.*\n/);
        l = this.view.CACHE = {}, e = c.shuffle(f.slice(0)), c.each(a, u.bind(this)), this.view.find("tile").translate(40, 20), this.view.draw(), setTimeout(r.bind(this), 100)
    }

    function u(a, b) {
        var d = a * 7,
            f, g, h, i;
        b = b.split("\n"), c.each(b, function (b, c) {
            for (i = c.length - 1; f = c.charAt(i); i--) f == ":" && (g = a + "," + i + "," + b, h = e.pop(), this.view.tile(56 * i + d, 80 * b - d, 64, 88, this, 64 * h, 0).attr({
                layer: a,
                col: i,
                row: b,
                id: g
            }).addId("r" + b), l[g] = this.view.get(-1))
        }.bind(this))
    }

    function v() {
        var a = null,
            c = this;
        this.view.mousedown("tile", function (b, d) {
            if (a === this) {
                a.selected = !1, a = null, b.redraw();
                return
            }
            if (!q(this)) return;
            if (a) {
                if (a.imgx == this.imgx) {
                    m += 2, c.cmdManager.exec(new game.RemoveCommand(b, this, a)), a = null, m == f.length && (c.timer.stop(), c.emit("finish", c.timer.time()), game.Modal.open("congrat", {
                        time: c.timer.time()
                    })), b.redraw(), setTimeout(r.bind(c), 100);
                    return
                }
                a.selected = !1
            }
            this.selected = !this.selected, a = this, b.redraw()
        }), this.view.keydown("ctrl+z", this.undo.bind(this)).setGlobalKeyEvents(!0);
        var d = w.bind(this);
        b.onload = d, b.onresize = d, "onorientationchange" in b && (b.onorientationchange = d)
    }

    function w(b) {
        var d = a.documentElement.clientWidth,
            e = a.documentElement.clientHeight - 20,
            f = 1;
        d > 320 && d <= 480 ? d -= 100 : d > 480 && (d -= 200), e < j || d < k ? (f = Math.min(e / j, d / k), this.view.zoomTo(f)) : this.view.zoomTo(1), this.view.cv.width = k * f, this.view.cv.height = (j + 80) * f, this.view.cv.style.marginLeft = (d - this.view.cv.width) / 2 + "px", this.view.calcCanvasPosition(), this.view.redraw(), h && c.fullScreen()
    }
    game = {};
    var e, f = [],
        g = a.getElementById("pairs"),
        h = "ontouchstart" in b && /mobile/i.exec(navigator.userAgent),
        i = !1,
        j = 648,
        k = 832,
        l = {},
        m = 0,
        n = {
            sprite: "images/smooth.png",
            map: "space",
            maxUndo: 30,
            timePenalty: 6e4
        };
    jQuery.extend(o.prototype, jQuery.eventEmitter), o.prototype.start = function () {
        if (!this.$$loaded) return;
        this.cmdManager.reset(), this.timer.restart(), i = !1, m = 0, this.view._shapes.length = 0, t.call(this)
    }, o.prototype.restart = o.prototype.start, o.prototype.undo = function () {
        this.cmdManager.undo() && (m -= 2)
    }, game.Mahjong = o
}(document, window, jQuery),
function (a, b, c, d) {
    function e(a) {
        this.undoStack = [], this.redoStack = [], this.maxUndo = a || 20
    }

    function f(a, b, c) {
        this.ctx = a, this.item1 = b, this.item2 = c, b.selected = c.selected = !1, delete a.CACHE[b.id], delete a.CACHE[c.id]
    }

    function g(a, b) {
        var c, d = this.length;
        for (; a <= d; a++) c = this[a], this[a] = b, b = c
    }
    e.prototype.reset = function () {
        this.undoStack.length = 0, this.redoStack.length = 0
    }, e.prototype.exec = function (a) {
        a.execute(), this.undoStack.length > this.maxUndo && this.undoStack.shift(), this.undoStack.push(a), this.redoStack.splice(0, this.redoStack.length)
    }, e.prototype.undo = function () {
        if (!this.undoStack.length) return;
        var a = this.undoStack.pop();
        return a.undo(), this.redoStack.unshift(a)
    }, e.prototype.redo = function () {
        if (!this.redoStack.length) return;
        var a = this.redoStack.shift();
        a.redo(), this.undoStack.push(a)
    }, f.prototype.execute = function () {
        this.index1 = this.ctx.remove(this.item1), this.index2 = this.ctx.remove(this.item2)
    }, f.prototype.undo = function () {
        g.call(this.ctx._shapes, this.index2, this.item2), g.call(this.ctx._shapes, this.index1, this.item1), this.ctx.CACHE[this.item2.id] = this.item2, this.ctx.CACHE[this.item1.id] = this.item2, this.ctx.redraw()
    }, c.CommandManager = e, c.RemoveCommand = f
}(document, window, game),
function (a, b, c) {
    var d = Cevent.Rect.extend({
        init: function (a, b, c, d, e, f, g) {
            this._super(a, b, c, d), this.image = e, this.imgx = f, this.imgy = g, this.selected = !1
        },
        draw: function (a) {
            this.setTransform(a), a.drawImage(this.image.image, this.imgx, this.imgy + this.selected * this.h, this.w, this.h, this.x, this.y, this.w, this.h)
        }
    });
    Cevent.register("tile", d)
}(document, window),
function (a) {
    function b(a) {
        return document.getElementById(a)
    }

    function f(a) {
        this.e_timer = b(a), this.restart()
    }
    var c = 0,
        d, e;
    f.prototype.now = function () {
        return (new Date).getTime()
    }, f.prototype.restart = function () {
        d = e = this.now(), this.startTime()
    }, f.prototype.addTime = function (a) {
        typeof a == "number" && (d -= Math.abs(a))
    }, f.prototype.startTime = function () {
        var a = this;
        this.uuid = c,
            function () {
                if (a.uuid == c) {
                    var b = e = a.now();
                    a.e_timer.innerHTML = a.time(), setTimeout(arguments.callee, 1e3)
                }
            }()
    }, f.prototype.stop = function () {
        ++c
    }, f.prototype.getTime = function () {
        return e - d
    }, f.prototype.time = function () {
        var a = ~~((e - d) / 1e3),
            b = a % 60,
            c = ~~(a / 60),
            f = ~~(c / 60);
        return c %= 60, (f > 9 ? f : "0" + f) + ":" + (c > 9 ? c : "0" + c % 60) + ":" + (b > 9 ? b : "0" + b)
    }, a.Timer = f
}(game),
function (a, b, c, d) {
    function e(a, b, c) {
        $.ajax({
            url: a,
            success: function (a) {
                c[b] = a
            }
        })
    }

    function f(c) {
        var d = b.Image ? new Image : a.createElement("img");
        return d.src = c, d
    }

    function g(a, b) {
        var c, d;
        setTimeout(function () {
            var e = a.context,
                f = !0;
            for (d in a.images)
                if (!e[d].complete) {
                    f = !1;
                    break
                }
            for (c in a.ajax)
                if (!e[c]) {
                    f = !1;
                    break
                }
            f ? b.call(e) : setTimeout(arguments.callee, 500)
        }, 500)
    }

    function h(a, b) {
        var c, d;
        for (c in a.images) a.context[c] = f(a.images[c]);
        for (d in a.ajax) e(a.ajax[d], d, a.context);
        g(a, b)
    }
    c.loadResources = h
}(document, window, game),
function (a, b, c, d) {
    function i(a, b) {
        f.html($.tmpl(a, b));
        var c = e.width() + (parseInt(e.css("padding-left"), 10) || 0) * 2 + (parseInt(e.css("border-width"), 10) || 0) * 2;
        e.css("margin-left", -c / 2), e.removeClass("hide"), h.show()
    }

    function j() {
        e.addClass("hide"), h.hide()
    }
    var e = $("#modal"),
        f = $("#modal-msg"),
        g = $("#close-modal"),
        h = $("#overlay");
    h.click(j), g.click(function () {
        return j(), !1
    }), c.Modal = {
        open: i,
        close: j
    }
}(document, window, game);
bb = {scroller: null, screens: [], dropdownScrollers: [], windowListeners: [], documentListeners: [], transparentPixel: "data:image/png;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==", imageList: null, activityIndicator: null, fileInput: null, button: null, scrollPanel: null, bbmBubble: null, dropdown: null, textInput: null, roundPanel: null, grid: null, pillButtons: null, labelControlContainers: null, slider: null, radio: null, progress: null, checkbox: null, toggle: null, init: function(e) {
        if (e) {
            for (var t in e)
                bb.options[t] = e[t]
        }
        bb.device.isRipple = navigator.userAgent.indexOf("Ripple") >= 0 || window.tinyHippos;
        bb.device.isPlayBook = navigator.userAgent.indexOf("PlayBook") >= 0 || window.innerWidth == 1024 && window.innerHeight == 600 || window.innerWidth == 600 && window.innerHeight == 1024;
        bb.device.isBB10 = true;
        bb.device.requiresScrollingHack = navigator.userAgent.toLowerCase().indexOf("version/10.0") >= 0 || navigator.userAgent.toLowerCase().indexOf("version/10.1") >= 0;
        bb.device.is10dot2 = navigator.userAgent.toLowerCase().indexOf("version/10.2") >= 0;
        bb.device.is10dot1 = navigator.userAgent.toLowerCase().indexOf("version/10.1") >= 0;
        bb.device.is10dot0 = navigator.userAgent.toLowerCase().indexOf("version/10.0") >= 0;
        bb.device.newerThan10dot0 = bb.device.is10dot1 || bb.device.is10dot2;
        bb.device.newerThan10dot1 = bb.device.is10dot2;
        bb.device.newerThan10dot2 = false;
        bb.device.is1024x600 = bb.device.isPlayBook;
        bb.device.is1280x768 = window.innerWidth == 1280 && window.innerHeight == 768 || window.innerWidth == 768 && window.innerHeight == 1280;
        bb.device.is720x720 = window.innerWidth == 720 && window.innerHeight == 720;
        bb.device.is1280x720 = window.innerWidth == 1280 && window.innerHeight == 720 || window.innerWidth == 720 && window.innerHeight == 1280;
        var n = document.head.querySelectorAll("meta[name=viewport]"), t;
        for (t = 0; t < n.length; t++) {
            try {
                document.head.removeChild(n[t])
            } catch (r) {
            }
        }
        var i = document.createElement("meta");
        i.setAttribute("name", "viewport");
        if (!bb.device.is1024x600) {
            i.setAttribute("content", "initial-scale=" + 1 / window.devicePixelRatio + ",user-scalable=no")
        } else {
            i.setAttribute("content", "initial-scale=1.0,width=device-width,user-scalable=no,target-densitydpi=device-dpi")
        }
        document.head.appendChild(i);
        var s = parseInt(bb.cutHex(bb.options.highlightColor).substring(0, 2), 16), o = parseInt(bb.cutHex(bb.options.highlightColor).substring(2, 4), 16), u = parseInt(bb.cutHex(bb.options.highlightColor).substring(4, 6), 16);
        bb.options.shades = {R: s, G: o, B: u, darkHighlight: "rgb(" + (s - 120) + ", " + (o - 120) + ", " + (u - 120) + ")", mediumHighlight: "rgb(" + (s - 60) + ", " + (o - 60) + ", " + (u - 60) + ")", darkOutline: "rgb(" + (s - 32) + ", " + (o - 32) + ", " + (u - 32) + ")", darkDarkHighlight: "rgb(" + (s - 140) + ", " + (o - 140) + ", " + (u - 140) + ")"};
        if (document.styleSheets && document.styleSheets.length) {
            try {
                document.styleSheets[0].insertRule(".bb10Highlight {background-color:" + bb.options.highlightColor + ";background-image:none;}", 0);
                document.styleSheets[0].insertRule(".bbProgressHighlight {background-color:#92B43B;background-image:none;}", 0);
                document.styleSheets[0].insertRule(".bb10-button-highlight {color:White;background-image: -webkit-gradient(linear, center top, center bottom, from(" + bb.options.shades.darkHighlight + "), to(" + bb.options.highlightColor + "));border-color:#53514F;}", 0);
                document.styleSheets[0].insertRule(".pb-button-light-highlight {color:" + bb.options.shades.darkHighlight + ";background-image: -webkit-gradient(linear, center top, center bottom, from(" + bb.options.highlightColor + "), to(" + bb.options.shades.darkHighlight + "));}", 0);
                document.styleSheets[0].insertRule(".pb-button-dark-highlight {color:" + bb.options.highlightColor + ";background-image: -webkit-gradient(linear, center top, center bottom, from(" + bb.options.highlightColor + "), to(" + bb.options.shades.darkHighlight + "));}", 0);
                document.styleSheets[0].insertRule(".bb10Accent {background-color:" + bb.options.shades.darkHighlight + ";}", 0);
                document.styleSheets[0].insertRule(".bb10-title-colored {color:white;border-color: " + bb.options.shades.mediumHighlight + ";text-shadow: 0px 2px black;background-image: -webkit-gradient(linear, center top, center bottom, from(" + bb.options.highlightColor + "), to(" + bb.options.shades.darkHighlight + "));}", 0);
                document.styleSheets[0].insertRule(".bb10-title-button-container-colored {color:white;text-shadow: 0px 2px black;border-color: " + bb.options.shades.darkDarkHighlight + ";background-color: " + bb.options.shades.darkHighlight + ";}", 0);
                document.styleSheets[0].insertRule(".bb10-title-button-colored {border-color: " + bb.options.shades.darkDarkHighlight + ";background-image: -webkit-gradient(linear, center top, center bottom, from(" + bb.options.highlightColor + "), to(" + bb.options.shades.mediumHighlight + "));}", 0);
                document.styleSheets[0].insertRule(".bb10-title-button-colored-highlight {border-color: " + bb.options.shades.darkDarkHighlight + ";background-color: " + bb.options.shades.darkHighlight + ";}", 0)
            } catch (r) {
                console.log(r.message)
            }
        }
        bb.screen.controlColor = bb.options.controlsDark ? "dark" : "light";
        bb.screen.listColor = bb.options.listsDark ? "dark" : "light";
        bb.imageList = _bb10_imageList;
        bb.activityIndicator = _bb10_activityIndicator;
        bb.fileInput = _bb10_fileInput;
        bb.button = _bb10_button;
        bb.scrollPanel = _bb_PlayBook_10_scrollPanel;
        bb.bbmBubble = _bb_bbmBubble;
        bb.dropdown = _bb10_dropdown;
        bb.textInput = _bb10_textInput;
        bb.roundPanel = _bb10_roundPanel;
        bb.grid = _bb10_grid;
        bb.pillButtons = _bb10_pillButtons;
        bb.labelControlContainers = _bb10_labelControlContainers;
        bb.slider = _bb10_slider;
        bb.radio = _bb10_radio;
        bb.progress = _bb_progress;
        bb.checkbox = _bb10_checkbox;
        bb.toggle = _bb10_toggle;
        bb.contextMenu = bb.device.isPlayBook || bb.device.isRipple ? _PlayBook_contextMenu : _bb10_contextMenu;
        bb.actionOverflow = _PlayBook_contextMenu;
        if (!bb.device.isPlayBook && !bb.device.isRipple) {
            blackberry.event.addEventListener("keyboardOpening", function() {
                if (bb.screen.currentScreen.actionBar) {
                    bb.screen.currentScreen.actionBar.hide()
                }
            });
            blackberry.event.addEventListener("keyboardOpened", function() {
                if (bb.screen.currentScreen.actionBar) {
                    if (bb.screen.focusedInput) {
                        if (bb.screen.focusedInput.container) {
                            bb.screen.focusedInput.container.scrollIntoView(false)
                        } else {
                            bb.screen.focusedInput.scrollIntoView(false)
                        }
                    }
                }
            });
            blackberry.event.addEventListener("keyboardClosed", function() {
                if (bb.screen.currentScreen.actionBar) {
                    bb.screen.currentScreen.actionBar.show()
                }
            })
        }
        if (!bb.device.isPlayBook && !bb.device.isRipple) {
            if (blackberry.ui && blackberry.ui.contextmenu) {
                blackberry.ui.contextmenu.enabled = true;
                if (blackberry.bbui) {
                    blackberry.bbui.initContext({highlightColor: bb.options.highlightColor})
                }
            }
        }
    }, doLoad: function(e) {
        var t = e || document.body;
        bb.screen.apply(t.querySelectorAll("[data-bb-type=screen]"));
        bb.style(t)
    }, style: function(e) {
        if (bb.scrollPanel)
            bb.scrollPanel.apply(e.querySelectorAll("[data-bb-type=scroll-panel]"));
        if (bb.textInput)
            bb.textInput.apply(e.querySelectorAll("input[type=text], [type=password], [type=tel], [type=url], [type=email], [type=number], [type=date], [type=time], [type=datetime], [type=month], [type=datetime-local], [type=color], [type=search]"));
        if (bb.dropdown)
            bb.dropdown.apply(e.querySelectorAll("select"));
        if (bb.roundPanel)
            bb.roundPanel.apply(e.querySelectorAll("[data-bb-type=round-panel]"));
        if (bb.imageList)
            bb.imageList.apply(e.querySelectorAll("[data-bb-type=image-list]"));
        if (bb.grid)
            bb.grid.apply(e.querySelectorAll("[data-bb-type=grid-layout]"));
        if (bb.bbmBubble)
            bb.bbmBubble.apply(e.querySelectorAll("[data-bb-type=bbm-bubble]"));
        if (bb.pillButtons)
            bb.pillButtons.apply(e.querySelectorAll("[data-bb-type=pill-buttons]"));
        if (bb.labelControlContainers)
            bb.labelControlContainers.apply(e.querySelectorAll("[data-bb-type=label-control-container]"));
        if (bb.button)
            bb.button.apply(e.querySelectorAll("[data-bb-type=button]"));
        if (bb.fileInput)
            bb.fileInput.apply(e.querySelectorAll("input[type=file]"));
        if (bb.slider)
            bb.slider.apply(e.querySelectorAll("input[type=range]"));
        if (bb.progress)
            bb.progress.apply(e.querySelectorAll("progress"));
        if (bb.radio)
            bb.radio.apply(e.querySelectorAll("input[type=radio]"));
        if (bb.activityIndicator)
            bb.activityIndicator.apply(e.querySelectorAll("[data-bb-type=activity-indicator]"));
        if (bb.checkbox)
            bb.checkbox.apply(e.querySelectorAll("input[type=checkbox]"));
        if (bb.toggle)
            bb.toggle.apply(e.querySelectorAll("[data-bb-type=toggle]"))
    }, getCurScreen: function() {
        return document.querySelector("[data-bb-type=screen]")
    }, device: {isBB10: false, isPlayBook: false, isRipple: false, requiresScrollingHack: false, is1024x600: false, is1280x768: false, is720x720: false, is1280x720: false, is10dot2: false, is10dot1: false, is10dot0: false, newerThan10dot0: false, newerThan10dot1: false, newerThan10dot2: false}, options: {onscreenready: null, ondomready: null, controlsDark: false, coloredTitleBar: false, listsDark: false, highlightColor: "#00A8DF"}, loadScreen: function(e, t, n, r, i, s) {
        var o = new XMLHttpRequest, u = document.createElement("div"), a = function(e, t, n) {
            var r = n;
            Array.prototype.forEach.apply(e, [function(e) {
                    r = t(r, e)
                }]);
            return r
        }, f = function(e, t) {
            if (t.nodeName === "SCRIPT") {
                e.push(t)
            }
            return a(t.childNodes, f, e)
        }, l, c = [], h = [];
        o.open("GET", e, false);
        o.send();
        u.setAttribute("id", r);
        u.innerHTML = o.responseText;
        c = a(u.childNodes, f, []), u.scriptIds = [];
        if (s) {
            s.scripts = []
        }
        c.forEach(function(e) {
            var t = document.createElement("script"), n = e.getAttribute("type");
            if (!n || n.toLowerCase() == "text/javascript") {
                var r = bb.guidGenerator();
                if (s) {
                    s.scripts.push({id: r, onunload: e.getAttribute("onunload")})
                } else {
                    u.scriptIds.push({id: r, onunload: e.getAttribute("onunload")})
                }
                t.setAttribute("type", "text/javascript");
                if (e.text) {
                    t.innerHTML = e.text;
                    t.inline = true
                } else {
                    t.setAttribute("src", e.getAttribute("src"))
                }
                t.setAttribute("id", r);
                h.push(t);
                e.parentNode.removeChild(e)
            }
        });
        u.getElementById = function(e, t) {
            var n = null;
            if (!t) {
                t = this
            }
            if (t.getAttribute("id") == e)
                return t;
            for (var r = 0; r < t.childNodes.length; r++) {
                var i = t.childNodes[r];
                if (i.nodeType == 1) {
                    n = this.getElementById(e, i);
                    if (n)
                        break
                }
            }
            return n
        };
        bb.screen.scriptCounter = 0;
        bb.screen.totalScripts = h.length;
        var p;
        for (var l = 0; l < h.length; l++) {
            p = h[l];
            document.body.appendChild(p);
            p.onload = function() {
                bb.screen.scriptCounter++;
                if (bb.screen.scriptCounter == bb.screen.totalScripts) {
                    bb.initContainer(u, t, n, i)
                }
            };
            if (p.inline == true) {
                setTimeout(p.onload, 0)
            }
        }
        if (bb.screen.totalScripts === 0) {
            setTimeout(function() {
                bb.initContainer(u, t, n, i)
            }, 0)
        }
        return u
    }, initContainer: function(e, t, n, r) {
        if (bb.options.onscreenready) {
            bb.options.onscreenready(e, t, r)
        }
        bb.doLoad(e);
        document.body.appendChild(e);
        var i = e.querySelectorAll("[data-bb-type=screen]"), s, o, u = null, a;
        if (i.length > 0) {
            i = i[0];
            if (n) {
                var f = bb.screens[bb.screens.length - 1].container, l;
                s = f.querySelectorAll("[data-bb-type=screen]")[0];
                l = s.hasAttribute("data-bb-effect") ? s.getAttribute("data-bb-effect") : undefined;
                if (l) {
                    i.style["z-index"] = "-100";
                    if (l.toLowerCase() == "fade") {
                        s.setAttribute("data-bb-effect", "fade-out")
                    } else if (l.toLowerCase() == "slide-left") {
                        s.setAttribute("data-bb-effect", "slide-out-right")
                    } else if (l.toLowerCase() == "slide-right") {
                        s.setAttribute("data-bb-effect", "slide-out-left")
                    } else if (l.toLowerCase() == "slide-up") {
                        s.setAttribute("data-bb-effect", "slide-out-down")
                    } else if (l.toLowerCase() == "slide-down") {
                        s.setAttribute("data-bb-effect", "slide-out-up")
                    }
                }
            } else {
                s = i
            }
            s.popping = n;
            if (s.hasAttribute("data-bb-effect")) {
                o = s.getAttribute("data-bb-effect");
                if (o) {
                    o = o.toLowerCase();
                    if (o == "fade") {
                        u = bb.screen.fadeIn
                    } else if (o == "fade-out") {
                        u = bb.screen.fadeOut
                    } else {
                        switch (o) {
                            case"slide-left":
                                u = bb.screen.slideLeft;
                                break;
                            case"slide-out-left":
                                u = bb.screen.slideOutLeft;
                                break;
                            case"slide-right":
                                u = bb.screen.slideRight;
                                break;
                            case"slide-out-right":
                                u = bb.screen.slideOutRight;
                                break;
                            case"slide-up":
                                u = bb.screen.slideUp;
                                break;
                            case"slide-out-up":
                                u = bb.screen.slideOutUp;
                                break;
                            case"slide-down":
                                u = bb.screen.slideDown;
                                break;
                            case"slide-out-down":
                                u = bb.screen.slideOutDown;
                                break
                        }
                    }
                    s.style.display = "inline";
                    if (u) {
                        a = document.createElement("div");
                        s.overlay = a;
                        a.setAttribute("class", "bb-transition-overlay");
                        document.body.appendChild(a);
                        bb.screen.animating = true;
                        s.doEndAnimation = function() {
                            var t = this.style;
                            bb.screen.animating = false;
                            document.body.removeChild(this.overlay);
                            this.overlay = null;
                            if (bb.screens.length > 1) {
                                if (!this.popping) {
                                    bb.removePreviousScreenFromDom();
                                    t.left = "";
                                    t.right = "";
                                    t.top = "";
                                    t.bottom = "";
                                    t.width = "";
                                    t.height = "";
                                    t["-webkit-animation-name"] = "";
                                    t["-webkit-animation-duration"] = "";
                                    t["-webkit-animation-timing-function"] = "";
                                    t["-webkit-transform"] = ""
                                } else {
                                    this.style.display = "none";
                                    this.parentNode.parentNode.removeChild(this.parentNode);
                                    bb.screens.pop();
                                    i.style["z-index"] = "";
                                    bb.screens[bb.screens.length - 1].container = e
                                }
                            } else if (bb.screens.length <= 1) {
                                t.left = "";
                                t.right = "";
                                t.top = "";
                                t.bottom = "";
                                t.width = "";
                                t.height = "";
                                t["-webkit-animation-name"] = "";
                                t["-webkit-animation-duration"] = "";
                                t["-webkit-animation-timing-function"] = "";
                                t["-webkit-transform"] = ""
                            }
                            this.removeEventListener("webkitAnimationEnd", this.doEndAnimation);
                            bb.createScreenScroller(i)
                        };
                        s.doEndAnimation = s.doEndAnimation.bind(s);
                        s.addEventListener("webkitAnimationEnd", s.doEndAnimation);
                        u.call(this, s)
                    }
                }
            }
        }
        if (bb.options.ondomready) {
            bb.domready.container = e;
            bb.domready.id = t;
            bb.domready.params = r;
            setTimeout(bb.domready.fire, 1)
        } else {
            setTimeout(bb.domready.fireEventsOnly, 1)
        }
        if (!u) {
            if (!n) {
                if (bb.screens.length > 1) {
                    bb.removePreviousScreenFromDom()
                }
            } else if (n) {
                i.style["z-index"] = "";
                var c = bb.screens[bb.screens.length - 1].container;
                c.parentNode.removeChild(c);
                bb.screens.pop();
                bb.screens[bb.screens.length - 1].container = e
            }
            bb.createScreenScroller(i)
        }
    }, domready: {container: null, id: null, params: null, fire: function() {
            if (bb.screen.animating) {
                setTimeout(bb.domready.fire, 250);
                return
            }
            var e = document.createEvent("Events");
            e.initEvent("bbuidomready", true, true);
            document.dispatchEvent(e);
            e = document.createEvent("Events");
            e.initEvent("bbuilistready", true, true);
            document.dispatchEvent(e);
            bb.options.ondomready(bb.domready.container, bb.domready.id, bb.domready.params);
            bb.domready.container = null;
            bb.domready.id = null;
            bb.domready.params = null;
            e = document.createEvent("Events");
            e.initEvent("bbuidomprocessed", true, true);
            document.dispatchEvent(e)
        }, fireEventsOnly: function() {
            if (bb.screen.animating) {
                setTimeout(bb.domready.fireEventsOnly, 250);
                return
            }
            var e = document.createEvent("Events");
            e.initEvent("bbuidomready", true, true);
            document.dispatchEvent(e);
            e = document.createEvent("Events");
            e.initEvent("bbuilistready", true, true);
            document.dispatchEvent(e);
            e = document.createEvent("Events");
            e.initEvent("bbuidomprocessed", true, true);
            document.dispatchEvent(e)
        }}, createScreenScroller: function(e) {
        var t = e.bbUIscrollWrapper;
        if (t) {
            if (bb.device.isPlayBook) {
                var n = {hideScrollbar: true, fadeScrollbar: true, onBeforeScrollStart: function(e) {
                        var t = e.target;
                        if (t.parentNode && t.parentNode.getAttribute("class") == "bb-bb10-dropdown-items") {
                            return
                        }
                        while (t.nodeType != 1)
                            t = t.parentNode;
                        if (t.tagName != "SELECT" && t.tagName != "INPUT" && t.tagName != "TEXTAREA" && t.tagName != "AUDIO" && t.tagName != "VIDEO") {
                            e.preventDefault();
                            var n = document.activeElement;
                            if (n) {
                                if (n.tagName == "SELECT" || n.tagName == "INPUT" || n.tagName == "TEXTAREA" || n.tagName == "AUDIO" || n.tagName == "VIDEO") {
                                    n.blur()
                                }
                            }
                        }
                    }, onScrollEnd: function(e) {
                        evt = document.createEvent("Events");
                        evt.initEvent("bbuiscrolling", true, true);
                        document.dispatchEvent(evt)
                    }, onScrollMove: function(t) {
                        if (e.onscroll) {
                            e.onscroll(t)
                        }
                        evt = document.createEvent("Events");
                        evt.initEvent("bbuiscrolling", true, true);
                        document.dispatchEvent(evt)
                    }};
                bb.scroller = new iScroll(t, n)
            } else {
                bb.scroller = null;
                t.style["-webkit-overflow-scrolling"] = "-blackberry-touch";
                t.onscroll = function(t) {
                    if (e.onscroll) {
                        e.onscroll(t)
                    }
                }
            }
        }
    }, clearScrollers: function() {
        var e;
        for (var t = bb.dropdownScrollers - 1; t > -1; t--) {
            e = bb.dropdownScrollers[t];
            e.destroy();
            e = null;
            bb.dropdownScrollers.pop()
        }
    }, removeTopMostScreenFromDom: function() {
        var e = bb.screens.length, t = document.getElementById(bb.screens[e - 1].guid);
        document.body.removeChild(t)
    }, removePreviousScreenFromDom: function() {
        var e = bb.screens.length, t, n;
        if (e == 1)
            return;
        n = e > 1 ? 2 : 1;
        t = document.getElementById(bb.screens[e - n].guid);
        if (t) {
            document.body.removeChild(t)
        }
    }, pushScreen: function(e, t, n) {
        var r, i;
        bb.removeLoadedScripts();
        for (r = 0; r < bb.windowListeners.length; r++) {
            i = bb.windowListeners[r];
            window.removeEventListener(i.name, i.eventHandler, false)
        }
        bb.windowListeners = [];
        for (r = 0; r < bb.documentListeners.length; r++) {
            i = bb.documentListeners[r];
            document.removeEventListener(i.name, i.eventHandler, false)
        }
        bb.documentListeners = [];
        bb.menuBar.clearMenu();
        var s = bb.screens.length, o;
        if (s > 0) {
            bb.screen.overlay = null;
            bb.screen.tabOverlay = null;
            bb.clearScrollers();
            if (bb.screen.contextMenu) {
                bb.screen.contextMenu = null
            }
        }
        var u = bb.guidGenerator(), a = bb.loadScreen(e, t, false, u, n);
        bb.screens.push({id: t, url: e, scripts: a.scriptIds, container: a, guid: u, params: n})
    }, popScreen: function() {
        var e = bb.screens.length, t, n;
        if (e > 1) {
            bb.removeLoadedScripts();
            bb.clearScrollers();
            bb.menuBar.clearMenu();
            bb.screen.overlay = null;
            bb.screen.tabOverlay = null;
            for (t = 0; t < bb.windowListeners.length; t++) {
                n = bb.windowListeners[t];
                window.removeEventListener(n.name, n.eventHandler, false)
            }
            bb.windowListeners = [];
            for (t = 0; t < bb.documentListeners.length; t++) {
                n = bb.documentListeners[t];
                document.removeEventListener(n.name, n.eventHandler, false)
            }
            bb.documentListeners = [];
            var r = bb.screens[e - 2], i = bb.loadScreen(r.url, r.id, true, r.guid, r.params, r)
        } else {
            if (blackberry) {
                blackberry.app.exit()
            }
        }
    }, removeLoadedScripts: function() {
        var numItems = bb.screens.length;
        if (numItems > 0) {
            var currentStackItem = bb.screens[numItems - 1], current = document.getElementById(currentStackItem.guid);
            for (var i = 0; i < currentStackItem.scripts.length; i++) {
                var bbScript = currentStackItem.scripts[i], scriptTag = document.getElementById(bbScript.id);
                if (bbScript.onunload) {
                    eval(bbScript.onunload)
                }
                if (scriptTag) {
                    document.body.removeChild(scriptTag)
                }
            }
        }
    }, innerHeight: function() {
        if (bb.device.isPlayBook) {
            if (!window.orientation) {
                return window.innerHeight
            } else if (window.orientation == 0 || window.orientation == 180) {
                return 600
            } else if (window.orientation == -90 || window.orientation == 90) {
                return 1024
            }
        } else {
            return window.innerHeight
        }
    }, innerWidth: function() {
        if (bb.device.isPlayBook) {
            if (!window.orientation) {
                return window.innerWidth
            } else if (window.orientation == 0 || window.orientation == 180) {
                return 1024
            } else if (window.orientation == -90 || window.orientation == 90) {
                return 600
            }
        } else {
            return window.innerWidth
        }
    }, getOrientation: function() {
        if (bb.device.is720x720)
            return"portrait";
        if (bb.device.isPlayBook) {
            if (!window.orientation) {
                return window.innerWidth > window.innerHeight ? "landscape" : "portrait"
            } else if (window.orientation == 0 || window.orientation == 180) {
                return"landscape"
            } else if (window.orientation == -90 || window.orientation == 90) {
                return"portrait"
            }
        } else {
            if (window.orientation == undefined) {
                return window.innerWidth > window.innerHeight ? "landscape" : "portrait"
            } else if (window.orientation == 0 || window.orientation == 180) {
                return"portrait"
            } else if (window.orientation == -90 || window.orientation == 90) {
                return"landscape"
            }
        }
    }, cutHex: function(e) {
        return e.charAt(0) == "#" ? e.substring(1, 7) : e
    }, guidGenerator: function() {
        var e = function() {
            return((1 + Math.random()) * 65536 | 0).toString(16).substring(1)
        };
        return e() + e() + e() + e() + e() + e() + e() + e()
    }, refresh: function() {
        if (bb.scroller) {
            bb.scroller.refresh()
        }
    }, isScrolledIntoView: function(e) {
        var t = 0, n = e;
        if (n.offsetParent) {
            do {
                t += n.offsetTop;
                if (n.scrollTop) {
                    t -= n.scrollTop
                }
                if (bb.device.isPlayBook) {
                    if (n.scroller) {
                        t += n.scroller.y
                    } else if (n.bbUIscrollWrapper) {
                        t += bb.scroller.y
                    }
                }
            } while (n = n.offsetParent)
        }
        return t < bb.innerHeight()
    }};
Function.prototype.bind = function(e) {
    var t = this;
    return function() {
        return t.apply(e, arguments)
    }
};
bb.actionBar = {apply: function(e, t) {
        var n = e.querySelectorAll("[data-bb-type=action]"), r = [], i = [], s = [], o = [], u, a, f, l, c, h, p, d, v = e, m, g, y, b = bb.getOrientation(), w = document.createElement("div"), E = document.createElement("div");
        e.isVisible = true;
        e.setAttribute("class", "bb-action-bar bb-action-bar-" + b + " bb-action-bar-dark");
        e.mainBarTabs = s;
        e.mainBarButtons = r;
        e.overflowButtons = i;
        e.overflowTabs = o;
        e.dropShadow = document.createElement("div");
        e.dropShadow.setAttribute("class", "bb-action-bar-drop-shadow");
        t.appendChild(e.dropShadow);
        e.oncontextmenu = function(e) {
            var t = e.srcElement, n = t.parentNode;
            if (!n)
                return;
            while (n) {
                if (n == this) {
                    e.preventDefault();
                    break
                }
                n = n.parentNode
            }
        };
        e.oncontextmenu = e.oncontextmenu.bind(e);
        window.addEventListener("contextmenu", e.oncontextmenu);
        bb.windowListeners.push({name: "contextmenu", eventHandler: e.oncontextmenu});
        w.setAttribute("class", "bb-action-bar-slide-label");
        e.slideLabel = w;
        E.setAttribute("class", "bb-action-bar-slide-label-text");
        e.slideText = E;
        e.parentNode.appendChild(w);
        e.parentNode.appendChild(E);
        e.slideUpShown = false;
        e.doLabelTimer = function() {
            this.slideUpShown = true;
            this.slideLabel.style.height = "48px";
            this.slideText.style.height = "48px";
            this.slideText.style.visibility = "visible"
        };
        e.doLabelTimer = e.doLabelTimer.bind(e);
        e.doTouchEnd = function() {
            if (this.timer)
                clearTimeout(this.timer);
            if (this.slideUpShown) {
                this.slideUpShown = false;
                this.slideLabel.style.height = "0px";
                this.slideText.style.visibility = "hidden";
                this.slideText.style.height = "0px"
            }
        };
        e.doTouchEnd = e.doTouchEnd.bind(e);
        e.showLabel = function(e, t) {
            if (bb.device.is720x720) {
                var n = window.getComputedStyle(e);
                this.slideText.innerHTML = t;
                this.slideText.style.width = parseInt(n.width) + "px";
                this.slideText.style["margin-left"] = bb.actionBar.getBackBtnWidth(this.backBtn) + e.offsetLeft + "px";
                this.timer = setTimeout(this.doLabelTimer, 1e3)
            }
        };
        e.showLabel = e.showLabel.bind(e);
        for (y = 0; y < n.length; y++) {
            u = n[y];
            if (u.hasAttribute("data-bb-style")) {
                c = u.getAttribute("data-bb-style").toLowerCase();
                if (c == "button") {
                    if (u.hasAttribute("data-bb-overflow") && u.getAttribute("data-bb-overflow").toLowerCase() == "true") {
                        i.push(u)
                    } else {
                        r.push(u)
                    }
                } else {
                    if (u.hasAttribute("data-bb-overflow") && u.getAttribute("data-bb-overflow").toLowerCase() == "true") {
                        o.push(u)
                    } else {
                        s.push(u)
                    }
                }
            }
        }
        if (e.hasAttribute("data-bb-back-caption") && e.querySelectorAll("[data-bb-style=tab]").length == 0) {
            var S, x, T, N, C = "bb-action-bar-back-button-dark";
            if (bb.device.is10dot2) {
                C += "-10dot2"
            }
            d = document.createElement("div");
            d.setAttribute("class", "bb-action-bar-back-button " + C + " bb-action-bar-back-button-" + b);
            d.onclick = function() {
                window.setTimeout(bb.popScreen, 0)
            };
            e.backBtn = d;
            S = document.createElement("div");
            S.setAttribute("class", "bb-action-bar-back-chevron-dark");
            d.appendChild(S);
            x = document.createElement("div");
            x.setAttribute("class", "bb-action-bar-back-text bb-action-bar-back-text-" + b);
            x.innerHTML = e.getAttribute("data-bb-back-caption");
            d.backCaption = x;
            d.appendChild(x);
            N = document.createElement("div");
            N.setAttribute("class", "bb-action-bar-back-button-highlight");
            N.style["position"] = "absolute";
            N.style["width"] = bb.device.is1024x600 ? "4px" : "8px";
            N.style["background-color"] = "transparent";
            d.updateHighlightDimensions = function(e) {
                if (bb.device.is1024x600) {
                    N.style["height"] = e == "portrait" ? "57px" : "57px";
                    N.style["top"] = "8px"
                } else if (bb.device.is720x720) {
                    N.style["height"] = "78px";
                    N.style["top"] = "15px"
                } else if (bb.device.is1280x720) {
                    N.style["height"] = e == "portrait" ? "84px" : "70px";
                    N.style["top"] = "15px"
                } else {
                    N.style["height"] = e == "portrait" ? "110px" : "70px";
                    N.style["top"] = "15px"
                }
            };
            d.updateHighlightDimensions = d.updateHighlightDimensions.bind(d);
            d.backHighlight = N;
            d.updateHighlightDimensions(b);
            d.appendChild(N);
            d.ontouchstart = function() {
                this.backHighlight.style["background-color"] = bb.options.highlightColor
            };
            d.ontouchend = function() {
                this.backHighlight.style["background-color"] = "transparent"
            };
            T = document.createElement("div");
            C = "bb-action-bar-back-slash-dark";
            if (bb.device.is10dot2) {
                C += "-10dot2"
            }
            T.setAttribute("class", C + " bb-action-bar-back-slash-" + b);
            d.backslash = T;
            var k = document.createElement("table"), L = document.createElement("tr"), A = document.createElement("td");
            e.appendChild(k);
            k.appendChild(L);
            k.setAttribute("class", "bb-action-bar-table");
            if (bb.device.is1024x600) {
                A.style.width = bb.actionBar.getBackBtnWidth(d) - 16 + "px"
            } else {
                A.style.width = bb.actionBar.getBackBtnWidth(d) - 33 + "px"
            }
            L.appendChild(A);
            d.innerChevron = A;
            A.appendChild(d);
            A = document.createElement("td");
            A.style.width = bb.device.is1024x600 ? 16 + "px" : 33 + "px";
            T.style["background-color"] = bb.options.shades.darkOutline;
            L.appendChild(A);
            A.appendChild(T);
            A = document.createElement("td");
            A.style.width = "100%";
            L.appendChild(A);
            v = A;
            for (y = 0; y < n.length; y++) {
                u = n[y];
                A.appendChild(u)
            }
        }
        if (o.length > 0) {
            e.tabOverflowMenu = bb.tabOverflow.create(t);
            e.tabOverflowMenu.actionBar = e;
            u = document.createElement("div");
            u.actionBar = e;
            u.tabOverflowMenu = e.tabOverflowMenu;
            u.setAttribute("data-bb-type", "action");
            u.setAttribute("data-bb-style", "tab");
            u.setAttribute("data-bb-img", "overflow");
            u.onclick = function() {
                this.tabOverflowMenu.show()
            };
            e.tabOverflowBtn = u;
            v.insertBefore(u, v.firstChild)
        }
        if (i.length > 0) {
            e.menu = bb.actionOverflow.create(t);
            e.appendChild(e.menu);
            e.moreCaption = e.hasAttribute("data-bb-more-caption") ? e.getAttribute("data-bb-more-caption") : "More";
            u = document.createElement("div");
            u.menu = e.menu;
            u.menu.actionBar = e;
            u.setAttribute("data-bb-type", "action");
            u.setAttribute("data-bb-style", "button");
            u.setAttribute("data-bb-img", "overflow");
            u.onclick = function() {
                this.menu.show()
            };
            e.actionOverflowBtn = u;
            v.appendChild(u)
        }
        e.getUsableWidth = function() {
            return bb.innerWidth() - bb.actionBar.getBackBtnWidth(this.backBtn) - bb.actionBar.getActionOverflowBtnWidth(this.actionOverflowBtn) - bb.actionBar.getTabOverflowBtnWidth(this.tabOverflowBtn)
        };
        e.getUsableWidth = e.getUsableWidth.bind(e);
        e.switchOrientationCSS = function(e) {
            if (e) {
                var t = bb.getOrientation();
                if (t == "portrait") {
                    e = e.replace("landscape", "portrait")
                } else {
                    e = e.replace("portrait", "landscape")
                }
            }
            return e
        };
        e.switchOrientationCSS = e.switchOrientationCSS.bind(e);
        e.reLayoutActionBar = function(t) {
            var n, r, i, s = "button", o = 0, u = 2, a, f = 5, l = 0, c = 0, h = 0, p = bb.getOrientation();
            this.dropShadow.style.bottom = bb.screen.getActionBarHeight() - 1 + "px";
            this.dropShadow.style.display = e.isVisible ? "block" : "";
            if (this.actionOverflowBtn)
                f--;
            if (this.backBtn)
                f--;
            if (this.tabOverflowBtn) {
                f--;
                this.tabOverflowBtn.dropShadow.style.display = "";
                this.tabOverflowBtn.dropShadow.style.height = bb.screen.getActionBarHeight() + "px"
            }
            for (n = 0; n < this.mainBarTabs.length; n++) {
                if (l == f)
                    break;
                i = this.mainBarTabs[n];
                if (i.visible == true) {
                    l++
                }
            }
            for (n = 0; n < this.mainBarButtons.length; n++) {
                if (l == f)
                    break;
                r = this.mainBarButtons[n];
                if (r.visible == true) {
                    l++
                }
            }
            l = l == 0 ? 1 : l;
            o = Math.floor(this.getUsableWidth() / l);
            a = this.getAttribute("class");
            a = this.switchOrientationCSS(a);
            this.setAttribute("class", a);
            if (this.isVisible) {
                bb.screen.currentScreen.outerScrollArea.style["bottom"] = bb.screen.getActionBarHeight() + "px";
                if (bb.scroller) {
                    bb.scroller.refresh()
                }
            }
            if (this.backBtn) {
                a = this.backBtn.getAttribute("class");
                a = this.switchOrientationCSS(a);
                this.backBtn.setAttribute("class", a);
                this.backBtn.updateHighlightDimensions(p);
                a = this.backBtn.backCaption.getAttribute("class");
                a = this.switchOrientationCSS(a);
                this.backBtn.backCaption.setAttribute("class", a);
                a = this.backBtn.backslash.getAttribute("class");
                a = this.switchOrientationCSS(a);
                this.backBtn.backslash.setAttribute("class", a);
                if (bb.device.is1024x600) {
                    this.backBtn.innerChevron.style.width = bb.actionBar.getBackBtnWidth(this.backBtn) - 16 + "px"
                } else {
                    this.backBtn.innerChevron.style.width = bb.actionBar.getBackBtnWidth(this.backBtn) - 33 + "px"
                }
            }
            l = 0;
            h = o - 2;
            for (n = 0; n < this.mainBarTabs.length; n++) {
                i = this.mainBarTabs[n];
                if (l < f && i.visible == true) {
                    c += h + 2;
                    i.style.width = h + "px";
                    i.normal = this.switchOrientationCSS(i.normal);
                    i.highlight = this.switchOrientationCSS(i.highlight);
                    a = i.tabInner.getAttribute("class");
                    a = this.switchOrientationCSS(a);
                    i.tabInner.setAttribute("class", a);
                    a = i.display.getAttribute("class");
                    a = this.switchOrientationCSS(a);
                    i.display.setAttribute("class", a);
                    s = "tab";
                    l++
                } else {
                    i.style.display = "none";
                    i.visible = false
                }
            }
            h = o - 1;
            for (n = 0; n < this.mainBarButtons.length; n++) {
                r = this.mainBarButtons[n];
                if (l < f && r.visible == true) {
                    c += h + 1;
                    r.style.width = h + "px";
                    r.highlight.style["width"] = o * .6 + "px";
                    r.highlight.style["margin-left"] = o * .2 + "px";
                    if (s == "tab") {
                        r.normal = "bb-action-bar-action bb-action-bar-action-" + p + " bb-action-bar-button-dark bb-action-bar-button-tab-left-dark"
                    } else {
                        r.normal = "bb-action-bar-action bb-action-bar-action-" + p + " bb-action-bar-button-dark"
                    }
                    r.setAttribute("class", r.normal);
                    r.normal = this.switchOrientationCSS(r.normal);
                    a = r.getAttribute("class");
                    a = this.switchOrientationCSS(a);
                    r.setAttribute("class", a);
                    s = "button";
                    l++
                } else {
                    r.style.display = "none";
                    r.visible = false
                }
            }
            if (this.tabOverflowBtn) {
                var d = bb.actionBar.getTabOverflowBtnWidth(this.tabOverflowBtn) - 1;
                c += d + 2;
                this.tabOverflowBtn.style.width = d + "px";
                this.tabOverflowBtn.normal = this.switchOrientationCSS(this.tabOverflowBtn.normal);
                this.tabOverflowBtn.highlight = this.switchOrientationCSS(this.tabOverflowBtn.highlight);
                a = this.tabOverflowBtn.getAttribute("class");
                a = this.switchOrientationCSS(a);
                this.tabOverflowBtn.setAttribute("class", a);
                a = this.tabOverflowBtn.tabHighlight.getAttribute("class");
                a = this.switchOrientationCSS(a);
                this.tabOverflowBtn.tabHighlight.setAttribute("class", a);
                a = this.tabOverflowBtn.display.getAttribute("class");
                a = this.switchOrientationCSS(a);
                this.tabOverflowBtn.display.setAttribute("class", a);
                this.tabOverflowBtn.icon.normal = this.switchOrientationCSS(this.tabOverflowBtn.icon.normal);
                a = this.tabOverflowBtn.icon.getAttribute("class");
                a = this.switchOrientationCSS(a);
                this.tabOverflowBtn.icon.setAttribute("class", a);
                if (this.mainBarTabs.length == 0 && this.mainBarButtons == 0) {
                    this.tabOverflowBtn.dropShadow.style.display = "block"
                }
            }
            if (this.actionOverflowBtn) {
                if (s == "tab") {
                    this.actionOverflowBtn.normal = "bb-action-bar-action bb-action-bar-action-" + p + " bb-action-bar-button-dark bb-action-bar-button-tab-left-dark";
                    this.actionOverflowBtn.style.width = bb.innerWidth() - c + "px"
                } else {
                    this.actionOverflowBtn.normal = "bb-action-bar-action bb-action-bar-action-" + p + " bb-action-bar-button-dark";
                    this.actionOverflowBtn.style.width = bb.actionBar.getActionOverflowBtnWidth(this.actionOverflowBtn) - 1 + "px"
                }
                this.actionOverflowBtn.highlight.style["width"] = bb.actionBar.getActionOverflowBtnWidth(this.actionOverflowBtn) * .6 + "px";
                this.actionOverflowBtn.highlight.style["margin-left"] = bb.actionBar.getActionOverflowBtnWidth(this.actionOverflowBtn) * .2 + "px";
                this.actionOverflowBtn.style.float = "right";
                this.actionOverflowBtn.setAttribute("class", this.actionOverflowBtn.normal);
                this.actionOverflowBtn.normal = this.switchOrientationCSS(this.actionOverflowBtn.normal);
                a = this.actionOverflowBtn.getAttribute("class");
                a = this.switchOrientationCSS(a);
                this.actionOverflowBtn.setAttribute("class", a);
                a = this.actionOverflowBtn.icon.getAttribute("class");
                a = this.switchOrientationCSS(a);
                this.actionOverflowBtn.icon.setAttribute("class", a)
            }
        };
        e.reLayoutActionBar = e.reLayoutActionBar.bind(e);
        window.addEventListener("orientationchange", e.reLayoutActionBar, false);
        bb.windowListeners.push({name: "orientationchange", eventHandler: e.reLayoutActionBar});
        e.setBackCaption = function(e) {
            this.setAttribute("data-bb-back-caption", e);
            x.innerHTML = e
        };
        e.setBackCaption = e.setBackCaption.bind(e);
        e.setSelectedTab = function(e) {
            if (e.getAttribute("data-bb-style") != "tab")
                return;
            bb.actionBar.highlightAction(e);
            if (e.onclick) {
                e.onclick()
            }
        };
        e.setSelectedTab = e.setSelectedTab.bind(e);
        e.hide = function(e) {
            if (!this.isVisible)
                return;
            this.style.display = "none";
            this.dropShadow.style.display = "none";
            this.slideLabel.style.display = "none";
            bb.screen.currentScreen.outerScrollArea.style["bottom"] = "0px";
            this.isVisible = false;
            if (bb.scroller) {
                bb.scroller.refresh()
            }
        };
        e.hide = e.hide.bind(e);
        e.show = function(e) {
            if (this.isVisible)
                return;
            this.style.display = "";
            this.dropShadow.style.display = "block";
            this.slideLabel.style.display = "";
            bb.screen.currentScreen.outerScrollArea.style["bottom"] = bb.screen.getActionBarHeight() + "px";
            this.isVisible = true;
            if (bb.scroller) {
                bb.scroller.refresh()
            }
        };
        e.show = e.show.bind(e);
        if (o.length > 0) {
            var O;
            for (y = 0; y < s.length; y++) {
                u = s[y];
                if (u.getAttribute("data-bb-img") != "overflow") {
                    O = u.cloneNode(true);
                    O.visibleTab = u;
                    O.actionBar = e;
                    e.tabOverflowMenu.add(O)
                }
            }
            for (y = 0; y < o.length; y++) {
                u = o[y];
                u.actionBar = e;
                e.tabOverflowMenu.add(u)
            }
        }
        for (y = 0; y < i.length; y++) {
            u = i[y];
            e.menu.add(u)
        }
        var M, _;
        for (y = 0; y < s.length; y++) {
            M = s[y];
            f = M.innerHTML;
            M.actionBar = e;
            M.visible = true;
            M.innerHTML = "";
            _ = document.createElement("div");
            M.tabInner = _;
            M.appendChild(_);
            M.setAttribute("class", "bb-action-bar-tab-outer");
            M.normal = "bb-action-bar-action bb-action-bar-action-" + b + " bb-action-bar-tab-dark bb-action-bar-tab-normal-dark";
            M.highlight = M.normal + " bb-action-bar-tab-selected-dark";
            _.setAttribute("class", M.normal);
            M.visible = true;
            if (M.hasAttribute("data-bb-visible") && M.getAttribute("data-bb-visible").toLowerCase() == "false") {
                M.visible = false
            }
            g = document.createElement("img");
            g.setAttribute("class", "bb-action-bar-icon");
            g.setAttribute("src", M.getAttribute("data-bb-img"));
            M.icon = g;
            _.appendChild(g);
            l = document.createElement("div");
            l.setAttribute("class", "bb-action-bar-action-display bb-action-bar-action-display-" + b);
            l.innerHTML = f;
            M.display = l;
            _.appendChild(l);
            if (M.hasAttribute("data-bb-selected") && M.getAttribute("data-bb-selected").toLowerCase() == "true") {
                bb.actionBar.highlightAction(M)
            }
            M.addEventListener("click", function(e) {
                bb.actionBar.highlightAction(this)
            }, false);
            M.setCaption = function(e) {
                this.display.innerHTML = e;
                if (this.actionBar.tabOverflowMenu) {
                    var t = this.actionBar.tabOverflowMenu.actions, n, r;
                    for (n = 0; n < t.length; n++) {
                        r = t[n];
                        if (r.visibleTab == this) {
                            r.setCaption(e)
                        }
                    }
                }
            };
            M.setCaption = M.setCaption.bind(M);
            M.getCaption = function() {
                return this.display.innerHTML
            };
            M.getCaption = M.getCaption.bind(M);
            M.setImage = function(e) {
                this.icon.setAttribute("src", e);
                if (this.actionBar.tabOverflowMenu) {
                    var t = this.actionBar.tabOverflowMenu.actions, n, r;
                    for (n = 0; n < t.length; n++) {
                        r = t[n];
                        if (r.visibleTab == this) {
                            r.setImage(e)
                        }
                    }
                }
            };
            M.setImage = M.setImage.bind(M);
            M.getImage = function() {
                return this.icon.getAttribute("src")
            };
            M.getImage = M.getImage.bind(M);
            M.hide = bb.actionBar.actionHide;
            M.hide = M.hide.bind(M);
            M.show = bb.actionBar.actionShow;
            M.show = M.show.bind(M);
            M.ontouchstart = function() {
                this.actionBar.showLabel(this, this.display.innerHTML)
            };
            M.ontouchend = function() {
                this.actionBar.doTouchEnd()
            }
        }
        var D;
        if (e.tabOverflowBtn) {
            D = e.tabOverflowBtn;
            f = D.innerHTML;
            D.actionBar = e;
            D.visible = true;
            D.innerHTML = "";
            _ = document.createElement("div");
            D.tabInner = _;
            D.appendChild(_);
            D.setAttribute("class", "bb-action-bar-tab-outer");
            D.normal = "bb-action-bar-action bb-action-bar-action-" + b + " bb-action-bar-tab-dark bb-action-bar-tab-normal-dark";
            D.highlight = D.normal + " bb-action-bar-tab-selected-dark";
            _.setAttribute("class", D.normal);
            D.dropShadow = document.createElement("div");
            D.dropShadow.setAttribute("class", "bb-action-bar-button-tab-left-dark bb-action-bar-button-tab-overflow-only-shadow");
            D.parentNode.appendChild(D.dropShadow);
            g = document.createElement("img");
            g.setAttribute("class", "bb-action-bar-icon");
            g.setAttribute("src", bb.transparentPixel);
            g.normal = "bb-action-bar-icon bb-action-bar-tab-overflow-dark bb-action-bar-tab-overflow-" + b;
            g.highlight = "bb-action-bar-icon";
            g.setAttribute("class", g.normal);
            _.appendChild(g);
            l = document.createElement("div");
            l.setAttribute("class", "bb-action-bar-action-display bb-action-bar-action-display-" + b);
            l.innerHTML = f;
            D.display = l;
            _.appendChild(l);
            D.icon = g;
            l.innerHTML = "&nbsp;";
            D.display = l;
            D.tabHighlight = document.createElement("div");
            D.tabHighlight.setAttribute("class", "bb-action-bar-tab-overflow-dark bb-action-bar-tab-overflow-highlight bb-action-bar-tab-overflow-highlight-" + b);
            _.appendChild(D.tabHighlight);
            D.style.width = bb.actionBar.getTabOverflowBtnWidth(D) - 1 + "px";
            D.reset = function() {
                this.icon.setAttribute("src", bb.transparentPixel);
                this.icon.setAttribute("class", this.icon.normal);
                this.tabHighlight.style.display = "none";
                this.display.innerHTML = "&nbsp;"
            };
            D.reset = D.reset.bind(D);
            D.ontouchstart = function() {
                var e = this.display.innerHTML == "" || this.display.innerHTML == "&nbsp;" ? this.actionBar.moreCaption : this.display.innerHTML;
                this.actionBar.showLabel(this, e)
            };
            D.ontouchend = function() {
                this.actionBar.doTouchEnd()
            }
        }
        var P;
        for (y = 0; y < r.length; y++) {
            P = r[y];
            P.actionBar = e;
            f = P.innerHTML;
            g = document.createElement("img");
            g.setAttribute("src", P.getAttribute("data-bb-img"));
            g.setAttribute("class", "bb-action-bar-icon");
            P.normal = "bb-action-bar-action bb-action-bar-action-" + b + " bb-action-bar-button-dark";
            P.visible = true;
            if (P.hasAttribute("data-bb-visible") && P.getAttribute("data-bb-visible").toLowerCase() == "false") {
                P.visible = false
            }
            P.icon = g;
            P.innerHTML = "";
            P.setAttribute("class", P.normal);
            P.appendChild(g);
            l = document.createElement("div");
            l.setAttribute("class", "bb-action-bar-action-display");
            l.innerHTML = f;
            P.display = l;
            P.appendChild(l);
            P.highlight = document.createElement("div");
            P.highlight.setAttribute("class", "bb-action-bar-action-highlight");
            P.highlight.style["height"] = bb.device.is1024x600 ? "4px" : "8px";
            P.highlight.style["background-color"] = "transparent";
            P.appendChild(P.highlight);
            P.setCaption = function(e) {
                this.display.innerHTML = e
            };
            P.setCaption = P.setCaption.bind(P);
            P.getCaption = function() {
                return this.display.innerHTML
            };
            P.getCaption = P.getCaption.bind(P);
            P.setImage = function(e) {
                this.icon.setAttribute("src", e)
            };
            P.setImage = P.setImage.bind(P);
            P.getImage = function() {
                return this.icon.getAttribute("src")
            };
            P.getImage = P.getImage.bind(P);
            P.hide = bb.actionBar.actionHide;
            P.hide = P.hide.bind(P);
            P.show = bb.actionBar.actionShow;
            P.show = P.show.bind(P);
            P.ontouchstart = function() {
                this.highlight.style["background-color"] = bb.options.highlightColor;
                this.actionBar.showLabel(this, this.display.innerHTML)
            };
            P.ontouchend = function() {
                this.highlight.style["background-color"] = "transparent";
                this.actionBar.doTouchEnd()
            }
        }
        if (e.actionOverflowBtn) {
            actionOverflow = e.actionOverflowBtn;
            actionOverflow.actionBar = e;
            actionOverflow.visible = true;
            f = actionOverflow.innerHTML;
            g = document.createElement("img");
            g.setAttribute("src", bb.transparentPixel);
            var H;
            if (bb.device.is10dot2 && b.toLowerCase() == "portrait") {
                H = "portait-10dot2"
            } else {
                H = b
            }
            g.setAttribute("class", "bb-action-bar-icon bb-action-bar-overflow-button-dark bb-action-bar-overflow-button-" + H);
            actionOverflow.icon = g;
            actionOverflow.normal = "bb-action-bar-action bb-action-bar-action-" + b + " bb-action-bar-button-dark";
            actionOverflow.innerHTML = "";
            actionOverflow.setAttribute("class", actionOverflow.normal);
            actionOverflow.appendChild(g);
            var l = document.createElement("div");
            l.setAttribute("class", "bb-action-bar-action-display");
            l.innerHTML = bb.device.is10dot2 ? e.moreCaption : f;
            actionOverflow.display = l;
            actionOverflow.appendChild(l);
            actionOverflow.highlight = document.createElement("div");
            actionOverflow.highlight.setAttribute("class", "bb-action-bar-action-highlight");
            actionOverflow.highlight.style["height"] = bb.device.is1024x600 ? "4px" : "8px";
            actionOverflow.highlight.style["background-color"] = "transparent";
            actionOverflow.appendChild(actionOverflow.highlight);
            actionOverflow.ontouchstart = function() {
                this.highlight.style["background-color"] = bb.options.highlightColor;
                this.actionBar.showLabel(this, this.actionBar.moreCaption)
            };
            actionOverflow.ontouchend = function() {
                this.highlight.style["background-color"] = "transparent";
                this.actionBar.doTouchEnd()
            }
        }
        if (e.menu) {
            e.menu.centerMenuItems()
        }
        if (e.tabOverflowMenu) {
            e.tabOverflowMenu.centerMenuItems();
            e.tabOverflowMenu.initSelected()
        }
        e.reLayoutActionBar()
    }, actionShow: function() {
        if (this.visible)
            return;
        this.style.display = "";
        this.visible = true;
        this.actionBar.reLayoutActionBar()
    }, actionHide: function() {
        if (!this.visible)
            return;
        this.style.display = "none";
        this.visible = false;
        this.actionBar.reLayoutActionBar()
    }, getTabOverflowBtnWidth: function(e) {
        if (!e)
            return 0;
        if (bb.device.is1024x600) {
            return bb.getOrientation() == "portrait" ? 77 : 123
        } else if (bb.device.is720x720) {
            return 144
        } else {
            return bb.getOrientation() == "portrait" ? 154 : 256
        }
    }, getActionOverflowBtnWidth: function(e) {
        if (!e)
            return 0;
        if (bb.device.is1024x600) {
            return bb.getOrientation() == "portrait" ? 77 : 123
        } else if (bb.device.is720x720) {
            return 144
        } else {
            return bb.getOrientation() == "portrait" ? 154 : 256
        }
    }, getBackBtnWidth: function(e) {
        if (!e)
            return 0;
        if (bb.device.is1024x600) {
            return bb.getOrientation() == "portrait" ? 93 : 150
        } else if (bb.device.is720x720) {
            return 174
        } else if (bb.device.is1280x720) {
            return bb.getOrientation() == "portrait" ? 179 : 300
        } else {
            return bb.getOrientation() == "portrait" ? 187 : 300
        }
    }, highlightAction: function(e, t) {
        var n, r, i = e.actionBar.mainBarTabs;
        for (n = 0; n < i.length; n++) {
            r = i[n];
            if (r != e) {
                bb.actionBar.unhighlightAction(r)
            }
        }
        if (e.actionBar.tabOverflowMenu) {
            i = e.actionBar.tabOverflowMenu.actions;
            for (n = 0; n < i.length; n++) {
                r = i[n];
                if (r != t) {
                    bb.actionBar.unhighlightAction(r)
                }
            }
            if (e.actionBar.tabOverflowBtn.tabInner) {
                e.actionBar.tabOverflowBtn.tabInner.style["border-top-color"] = "";
                e.actionBar.tabOverflowBtn.tabInner.setAttribute("class", e.actionBar.tabOverflowBtn.normal)
            }
        }
        if (e.tabInner) {
            e.tabInner.style["border-top-color"] = bb.options.highlightColor;
            e.tabInner.setAttribute("class", e.highlight)
        } else {
            e.style["border-top-color"] = bb.options.highlightColor;
            e.setAttribute("class", e.highlight)
        }
        e.selected = true;
        if (t) {
            t.setAttribute("class", t.normal + " bb10Highlight");
            t.selected = true
        }
        if (e.actionBar.tabOverflowMenu && !t) {
            if (e.actionBar.tabOverflowBtn && e == e.actionBar.tabOverflowBtn) {
                t.setAttribute("class", t.normal + " bb10Highlight")
            } else {
                i = e.actionBar.tabOverflowMenu.actions;
                for (n = 0; n < i.length; n++) {
                    r = i[n];
                    if (r.visibleTab == e) {
                        r.setAttribute("class", r.normal + " bb10Highlight")
                    }
                }
            }
        }
        if (e.actionBar.tabOverflowBtn && e.actionBar.tabOverflowBtn.reset) {
            e.actionBar.tabOverflowBtn.reset()
        }
    }, unhighlightAction: function(e) {
        var t;
        if (e.tabInner) {
            e.tabInner.style["border-top-color"] = "";
            e.tabInner.setAttribute("class", e.normal)
        } else {
            e.style["border-top-color"] = "";
            e.setAttribute("class", e.normal)
        }
        if (e.actionBar && e.actionBar.tabOverflowMenu) {
            tabs = e.actionBar.tabOverflowMenu.actions;
            for (i = 0; i < tabs.length; i++) {
                t = tabs[i];
                if (t.tabInner) {
                    t.tabInner.setAttribute("class", t.normal)
                } else {
                    t.setAttribute("class", t.normal)
                }
                t.selected = false
            }
        }
    }};
_bb_bbmBubble = {apply: function(e) {
        for (var t = 0; t < e.length; t++) {
            bb.bbmBubble.style(e[t])
        }
    }, style: function(e) {
        var t, n, r, i, s;
        e.styleItem = function(t) {
            r = document.createElement("img");
            r.setAttribute("src", t.getAttribute("data-bb-img"));
            s = document.createElement("div");
            s.setAttribute("class", "details");
            s.innerHTML = t.innerHTML;
            t.innerHTML = "";
            t.appendChild(r);
            t.appendChild(s);
            t.image = r;
            t.details = s;
            t.outerElement = e;
            t.getCaption = function() {
                return this.details.innerText
            };
            t.getCaption = t.getCaption.bind(t);
            t.setCaption = function(e) {
                this.details.innerHTML = e;
                bb.refresh()
            };
            t.setCaption = t.setCaption.bind(t);
            t.getImage = function() {
                return this.image.src
            };
            t.getImage = t.getImage.bind(t);
            t.setImage = function(e) {
                this.image.setAttribute("src", e);
                bb.refresh()
            };
            t.setImage = t.setImage.bind(t);
            t.remove = function(e) {
                this.outerHTML = "";
                bb.refresh()
            };
            t.remove = t.remove.bind(t);
            return t
        };
        e.styleItem = e.styleItem.bind(e);
        if (e.hasAttribute("data-bb-style")) {
            var o = e.getAttribute("data-bb-style").toLowerCase(), u;
            if (o == "left") {
                e.setAttribute("class", "bb-bbm-bubble-left")
            } else {
                e.setAttribute("class", "bb-bbm-bubble-right")
            }
            var a = e.querySelectorAll("[data-bb-type=item]");
            for (u = 0; u > a.length; u++) {
                e.removeChild(a[u])
            }
            t = document.createElement("div");
            t.setAttribute("class", "top-left image");
            e.appendChild(t);
            t = document.createElement("div");
            t.setAttribute("class", "top-right image");
            e.appendChild(t);
            t = document.createElement("div");
            t.setAttribute("class", "inside");
            e.appendChild(t);
            insidePanel = document.createElement("div");
            insidePanel.setAttribute("class", "nogap");
            t.appendChild(insidePanel);
            e.insidePanel = insidePanel;
            t = document.createElement("div");
            t.setAttribute("class", "bottom-left image");
            e.appendChild(t);
            t = document.createElement("div");
            t.setAttribute("class", "bottom-right image");
            e.appendChild(t);
            for (u = 0; u < a.length; u++) {
                i = a[u];
                insidePanel.appendChild(e.styleItem(i))
            }
        }
        e.getStyle = function() {
            return this.getAttribute("data-bb-style")
        };
        e.getStyle = e.getStyle.bind(e);
        e.setStyle = function(e) {
            if (e == "left") {
                this.setAttribute("data-bb-style", e);
                this.setAttribute("class", "bb-bbm-bubble-left")
            } else if (e == "right") {
                this.setAttribute("data-bb-style", e);
                this.setAttribute("class", "bb-bbm-bubble-right")
            }
            bb.refresh()
        };
        e.setStyle = e.setStyle.bind(e);
        e.show = function() {
            this.style.display = "block";
            bb.refresh()
        };
        e.show = e.show.bind(e);
        e.hide = function() {
            this.style.display = "none";
            bb.refresh()
        };
        e.hide = e.hide.bind(e);
        e.remove = function() {
            this.parentNode.removeChild(this);
            bb.refresh()
        };
        e.remove = e.remove.bind(e);
        e.clear = function() {
            this.insidePanel.innerHTML = "";
            bb.refresh()
        };
        e.clear = e.clear.bind(e);
        e.getItems = function() {
            return this.querySelectorAll("[data-bb-type=item]")
        };
        e.getItems = e.getItems.bind(e);
        return e
    }};
(function() {
    var e = Math, t = function(e) {
        return e >> 0
    }, n = /webkit/i.test(navigator.appVersion) ? "webkit" : /firefox/i.test(navigator.userAgent) ? "Moz" : /trident/i.test(navigator.userAgent) ? "ms" : "opera"in window ? "O" : "", r = /android/gi.test(navigator.appVersion), i = /iphone|ipad/gi.test(navigator.appVersion), s = /playbook/gi.test(navigator.appVersion), o = /hp-tablet/gi.test(navigator.appVersion), u = "WebKitCSSMatrix"in window && "m11"in new WebKitCSSMatrix, a = "ontouchstart"in window && !o, f = n + "Transform"in document.documentElement.style, l = i || s, c = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
            return setTimeout(e, 1)
        }
    }(), h = function() {
        return window.cancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout
    }(), p = "onorientationchange"in window ? "orientationchange" : "resize", d = a ? "touchstart" : "mousedown", v = a ? "touchmove" : "mousemove", m = a ? "touchend" : "mouseup", g = a ? "touchcancel" : "mouseup", y = n == "Moz" ? "DOMMouseScroll" : "mousewheel", b = "translate" + (u ? "3d(" : "("), w = u ? ",0)" : ")", E = function(e, t) {
        var s = this, o = document, c;
        s.wrapper = typeof e == "object" ? e : o.getElementById(e);
        s.wrapper.style.overflow = "hidden";
        s.scroller = s.wrapper.children[0];
        s.options = {hScroll: true, vScroll: true, x: 0, y: 0, bounce: true, bounceLock: false, momentum: true, lockDirection: true, useTransform: true, useTransition: false, topOffset: 0, checkDOMChanges: false, hScrollbar: true, vScrollbar: true, fixedScrollbar: r, hideScrollbar: i, fadeScrollbar: i && u, scrollbarClass: "", zoom: false, zoomMin: 1, zoomMax: 4, doubleTapZoom: 2, wheelAction: "scroll", snap: false, snapThreshold: 1, onRefresh: null, onBeforeScrollStart: function(e) {
                e.preventDefault()
            }, onScrollStart: null, onBeforeScrollMove: null, onScrollMove: null, onBeforeScrollEnd: null, onScrollEnd: null, onTouchEnd: null, onDestroy: null, onZoomStart: null, onZoom: null, onZoomEnd: null};
        for (c in t)
            s.options[c] = t[c];
        s.x = s.options.x;
        s.y = s.options.y;
        s.options.useTransform = f ? s.options.useTransform : false;
        s.options.hScrollbar = s.options.hScroll && s.options.hScrollbar;
        s.options.vScrollbar = s.options.vScroll && s.options.vScrollbar;
        s.options.zoom = s.options.useTransform && s.options.zoom;
        s.options.useTransition = l && s.options.useTransition;
        if (s.options.zoom && r) {
            b = "translate(";
            w = ")"
        }
        s.scroller.style[n + "TransitionProperty"] = s.options.useTransform ? "-" + n.toLowerCase() + "-transform" : "top left";
        s.scroller.style[n + "TransitionDuration"] = "0";
        s.scroller.style[n + "TransformOrigin"] = "0 0";
        if (s.options.useTransition)
            s.scroller.style[n + "TransitionTimingFunction"] = "cubic-bezier(0.33,0.66,0.66,1)";
        if (s.options.useTransform)
            s.scroller.style[n + "Transform"] = b + s.x + "px," + s.y + "px" + w;
        else
            s.scroller.style.cssText += ";position:absolute;top:" + s.y + "px;left:" + s.x + "px";
        if (s.options.useTransition)
            s.options.fixedScrollbar = true;
        s.refresh();
        s._bind(p, window);
        s._bind(d);
        if (!a) {
            s._bind("mouseout", s.wrapper);
            if (s.options.wheelAction != "none")
                s._bind(y)
        }
        if (s.options.checkDOMChanges)
            s.checkDOMTime = setInterval(function() {
                s._checkDOMChanges()
            }, 500)
    };
    E.prototype = {enabled: true, x: 0, y: 0, steps: [], scale: 1, currPageX: 0, currPageY: 0, pagesX: [], pagesY: [], aniTime: null, wheelZoomCount: 0, handleEvent: function(e) {
            var t = this;
            switch (e.type) {
                case d:
                    if (!a && e.button !== 0)
                        return;
                    t._start(e);
                    break;
                case v:
                    t._move(e);
                    break;
                case m:
                case g:
                    t._end(e);
                    break;
                case p:
                    t._resize();
                    break;
                case y:
                    t._wheel(e);
                    break;
                case"mouseout":
                    t._mouseout(e);
                    break;
                case"webkitTransitionEnd":
                    t._transitionEnd(e);
                    break
            }
        }, _checkDOMChanges: function() {
            if (this.moved || this.zoomed || this.animating || this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale)
                return;
            this.refresh()
        }, _scrollbar: function(r) {
            var i = this, s = document, o;
            if (!i[r + "Scrollbar"]) {
                if (i[r + "ScrollbarWrapper"]) {
                    if (f)
                        i[r + "ScrollbarIndicator"].style[n + "Transform"] = "";
                    i[r + "ScrollbarWrapper"].parentNode.removeChild(i[r + "ScrollbarWrapper"]);
                    i[r + "ScrollbarWrapper"] = null;
                    i[r + "ScrollbarIndicator"] = null
                }
                return
            }
            if (!i[r + "ScrollbarWrapper"]) {
                o = s.createElement("div");
                if (i.options.scrollbarClass)
                    o.className = i.options.scrollbarClass + r.toUpperCase();
                else
                    o.style.cssText = "position:absolute;z-index:100;" + (r == "h" ? "height:7px;bottom:1px;left:2px;right:" + (i.vScrollbar ? "7" : "2") + "px" : "width:7px;bottom:" + (i.hScrollbar ? "7" : "2") + "px;top:2px;right:1px");
                o.style.cssText += ";pointer-events:none;-" + n + "-transition-property:opacity;-" + n + "-transition-duration:" + (i.options.fadeScrollbar ? "350ms" : "0") + ";overflow:hidden;opacity:" + (i.options.hideScrollbar ? "0" : "1");
                i.wrapper.appendChild(o);
                i[r + "ScrollbarWrapper"] = o;
                o = s.createElement("div");
                if (!i.options.scrollbarClass) {
                    o.style.cssText = "position:absolute;z-index:100;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.9);-" + n + "-background-clip:padding-box;-" + n + "-box-sizing:border-box;" + (r == "h" ? "height:100%" : "width:100%") + ";-" + n + "-border-radius:3px;border-radius:3px"
                }
                o.style.cssText += ";pointer-events:none;-" + n + "-transition-property:-" + n + "-transform;-" + n + "-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);-" + n + "-transition-duration:0;-" + n + "-transform:" + b + "0,0" + w;
                if (i.options.useTransition)
                    o.style.cssText += ";-" + n + "-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)";
                i[r + "ScrollbarWrapper"].appendChild(o);
                i[r + "ScrollbarIndicator"] = o
            }
            if (r == "h") {
                i.hScrollbarSize = i.hScrollbarWrapper.clientWidth;
                i.hScrollbarIndicatorSize = e.max(t(i.hScrollbarSize * i.hScrollbarSize / i.scrollerW), 8);
                i.hScrollbarIndicator.style.width = i.hScrollbarIndicatorSize + "px";
                i.hScrollbarMaxScroll = i.hScrollbarSize - i.hScrollbarIndicatorSize;
                i.hScrollbarProp = i.hScrollbarMaxScroll / i.maxScrollX
            } else {
                i.vScrollbarSize = i.vScrollbarWrapper.clientHeight;
                i.vScrollbarIndicatorSize = e.max(t(i.vScrollbarSize * i.vScrollbarSize / i.scrollerH), 8);
                i.vScrollbarIndicator.style.height = i.vScrollbarIndicatorSize + "px";
                i.vScrollbarMaxScroll = i.vScrollbarSize - i.vScrollbarIndicatorSize;
                i.vScrollbarProp = i.vScrollbarMaxScroll / i.maxScrollY
            }
            i._scrollbarPos(r, true)
        }, _resize: function() {
            var e = this;
            setTimeout(function() {
                e.refresh()
            }, r ? 200 : 0)
        }, _pos: function(e, r) {
            e = this.hScroll ? e : 0;
            r = this.vScroll ? r : 0;
            if (this.options.useTransform) {
                this.scroller.style[n + "Transform"] = b + e + "px," + r + "px" + w + " scale(" + this.scale + ")"
            } else {
                e = t(e);
                r = t(r);
                this.scroller.style.left = e + "px";
                this.scroller.style.top = r + "px"
            }
            this.x = e;
            this.y = r;
            this._scrollbarPos("h");
            this._scrollbarPos("v")
        }, _scrollbarPos: function(e, r) {
            var i = this, s = e == "h" ? i.x : i.y, o;
            if (!i[e + "Scrollbar"])
                return;
            s = i[e + "ScrollbarProp"] * s;
            if (s < 0) {
                if (!i.options.fixedScrollbar) {
                    o = i[e + "ScrollbarIndicatorSize"] + t(s * 3);
                    if (o < 8)
                        o = 8;
                    i[e + "ScrollbarIndicator"].style[e == "h" ? "width" : "height"] = o + "px"
                }
                s = 0
            } else if (s > i[e + "ScrollbarMaxScroll"]) {
                if (!i.options.fixedScrollbar) {
                    o = i[e + "ScrollbarIndicatorSize"] - t((s - i[e + "ScrollbarMaxScroll"]) * 3);
                    if (o < 8)
                        o = 8;
                    i[e + "ScrollbarIndicator"].style[e == "h" ? "width" : "height"] = o + "px";
                    s = i[e + "ScrollbarMaxScroll"] + (i[e + "ScrollbarIndicatorSize"] - o)
                } else {
                    s = i[e + "ScrollbarMaxScroll"]
                }
            }
            i[e + "ScrollbarWrapper"].style[n + "TransitionDelay"] = "0";
            i[e + "ScrollbarWrapper"].style.opacity = r && i.options.hideScrollbar ? "0" : "1";
            i[e + "ScrollbarIndicator"].style[n + "Transform"] = b + (e == "h" ? s + "px,0" : "0," + s + "px") + w
        }, _start: function(t) {
            var r = this, i = a ? t.touches[0] : t, s, o, u, f, l;
            if (!r.enabled)
                return;
            if (r.options.onBeforeScrollStart)
                r.options.onBeforeScrollStart.call(r, t);
            if (r.options.useTransition || r.options.zoom)
                r._transitionTime(0);
            r.moved = false;
            r.animating = false;
            r.zoomed = false;
            r.distX = 0;
            r.distY = 0;
            r.absDistX = 0;
            r.absDistY = 0;
            r.dirX = 0;
            r.dirY = 0;
            if (r.options.zoom && a && t.touches.length > 1) {
                f = e.abs(t.touches[0].pageX - t.touches[1].pageX);
                l = e.abs(t.touches[0].pageY - t.touches[1].pageY);
                r.touchesDistStart = e.sqrt(f * f + l * l);
                r.originX = e.abs(t.touches[0].pageX + t.touches[1].pageX - r.wrapperOffsetLeft * 2) / 2 - r.x;
                r.originY = e.abs(t.touches[0].pageY + t.touches[1].pageY - r.wrapperOffsetTop * 2) / 2 - r.y;
                if (r.options.onZoomStart)
                    r.options.onZoomStart.call(r, t)
            }
            if (r.options.momentum) {
                if (r.options.useTransform) {
                    s = getComputedStyle(r.scroller, null)[n + "Transform"].replace(/[^0-9-.,]/g, "").split(",");
                    o = s[4] * 1;
                    u = s[5] * 1
                } else {
                    o = getComputedStyle(r.scroller, null).left.replace(/[^0-9-]/g, "") * 1;
                    u = getComputedStyle(r.scroller, null).top.replace(/[^0-9-]/g, "") * 1
                }
                if (o != r.x || u != r.y) {
                    if (r.options.useTransition)
                        r._unbind("webkitTransitionEnd");
                    else
                        h(r.aniTime);
                    r.steps = [];
                    r._pos(o, u)
                }
            }
            r.absStartX = r.x;
            r.absStartY = r.y;
            r.startX = r.x;
            r.startY = r.y;
            r.pointX = i.pageX;
            r.pointY = i.pageY;
            r.startTime = t.timeStamp || Date.now();
            if (r.options.onScrollStart)
                r.options.onScrollStart.call(r, t);
            r._bind(v);
            r._bind(m);
            r._bind(g)
        }, _move: function(t) {
            var r = this, i = a ? t.touches[0] : t, s = i.pageX - r.pointX, o = i.pageY - r.pointY, u = r.x + s, f = r.y + o, l, c, h, p = t.timeStamp || Date.now();
            if (r.options.onBeforeScrollMove)
                r.options.onBeforeScrollMove.call(r, t);
            if (r.options.zoom && a && t.touches.length > 1) {
                l = e.abs(t.touches[0].pageX - t.touches[1].pageX);
                c = e.abs(t.touches[0].pageY - t.touches[1].pageY);
                r.touchesDist = e.sqrt(l * l + c * c);
                r.zoomed = true;
                h = 1 / r.touchesDistStart * r.touchesDist * this.scale;
                if (h < r.options.zoomMin)
                    h = .5 * r.options.zoomMin * Math.pow(2, h / r.options.zoomMin);
                else if (h > r.options.zoomMax)
                    h = 2 * r.options.zoomMax * Math.pow(.5, r.options.zoomMax / h);
                r.lastScale = h / this.scale;
                u = this.originX - this.originX * r.lastScale + this.x, f = this.originY - this.originY * r.lastScale + this.y;
                this.scroller.style[n + "Transform"] = b + u + "px," + f + "px" + w + " scale(" + h + ")";
                if (r.options.onZoom)
                    r.options.onZoom.call(r, t);
                return
            }
            r.pointX = i.pageX;
            r.pointY = i.pageY;
            if (u > 0 || u < r.maxScrollX) {
                u = r.options.bounce ? r.x + s / 2 : u >= 0 || r.maxScrollX >= 0 ? 0 : r.maxScrollX
            }
            if (f > r.minScrollY || f < r.maxScrollY) {
                f = r.options.bounce ? r.y + o / 2 : f >= r.minScrollY || r.maxScrollY >= 0 ? r.minScrollY : r.maxScrollY
            }
            r.distX += s;
            r.distY += o;
            r.absDistX = e.abs(r.distX);
            r.absDistY = e.abs(r.distY);
            if (r.absDistX < 6 && r.absDistY < 6) {
                return
            }
            if (r.options.lockDirection) {
                if (r.absDistX > r.absDistY + 5) {
                    f = r.y;
                    o = 0
                } else if (r.absDistY > r.absDistX + 5) {
                    u = r.x;
                    s = 0
                }
            }
            r.moved = true;
            r._pos(u, f);
            r.dirX = s > 0 ? -1 : s < 0 ? 1 : 0;
            r.dirY = o > 0 ? -1 : o < 0 ? 1 : 0;
            if (p - r.startTime > 300) {
                r.startTime = p;
                r.startX = r.x;
                r.startY = r.y
            }
            if (r.options.onScrollMove)
                r.options.onScrollMove.call(r, t)
        }, _end: function(r) {
            if (a && r.touches.length != 0)
                return;
            var i = this, s = a ? r.changedTouches[0] : r, o, u, f = {dist: 0, time: 0}, l = {dist: 0, time: 0}, c = (r.timeStamp || Date.now()) - i.startTime, h = i.x, p = i.y, d, y, E, S, x;
            i._unbind(v);
            i._unbind(m);
            i._unbind(g);
            if (i.options.onBeforeScrollEnd)
                i.options.onBeforeScrollEnd.call(i, r);
            if (i.zoomed) {
                x = i.scale * i.lastScale;
                x = Math.max(i.options.zoomMin, x);
                x = Math.min(i.options.zoomMax, x);
                i.lastScale = x / i.scale;
                i.scale = x;
                i.x = i.originX - i.originX * i.lastScale + i.x;
                i.y = i.originY - i.originY * i.lastScale + i.y;
                i.scroller.style[n + "TransitionDuration"] = "200ms";
                i.scroller.style[n + "Transform"] = b + i.x + "px," + i.y + "px" + w + " scale(" + i.scale + ")";
                i.zoomed = false;
                i.refresh();
                if (i.options.onZoomEnd)
                    i.options.onZoomEnd.call(i, r);
                return
            }
            if (!i.moved) {
                if (a) {
                    if (i.doubleTapTimer && i.options.zoom) {
                        clearTimeout(i.doubleTapTimer);
                        i.doubleTapTimer = null;
                        if (i.options.onZoomStart)
                            i.options.onZoomStart.call(i, r);
                        i.zoom(i.pointX, i.pointY, i.scale == 1 ? i.options.doubleTapZoom : 1);
                        if (i.options.onZoomEnd) {
                            setTimeout(function() {
                                i.options.onZoomEnd.call(i, r)
                            }, 200)
                        }
                    } else {
                        i.doubleTapTimer = setTimeout(function() {
                            i.doubleTapTimer = null;
                            o = s.target;
                            while (o.nodeType != 1)
                                o = o.parentNode;
                            if (o.tagName != "SELECT" && o.tagName != "INPUT" && o.tagName != "TEXTAREA") {
                                u = document.createEvent("MouseEvents");
                                u.initMouseEvent("click", true, true, r.view, 1, s.screenX, s.screenY, s.clientX, s.clientY, r.ctrlKey, r.altKey, r.shiftKey, r.metaKey, 0, null);
                                u._fake = true;
                                o.dispatchEvent(u)
                            }
                        }, i.options.zoom ? 250 : 0)
                    }
                }
                i._resetPos(200);
                if (i.options.onTouchEnd)
                    i.options.onTouchEnd.call(i, r);
                return
            }
            if (c < 300 && i.options.momentum) {
                f = h ? i._momentum(h - i.startX, c, -i.x, i.scrollerW - i.wrapperW + i.x, i.options.bounce ? i.wrapperW : 0) : f;
                l = p ? i._momentum(p - i.startY, c, -i.y, i.maxScrollY < 0 ? i.scrollerH - i.wrapperH + i.y - i.minScrollY : 0, i.options.bounce ? i.wrapperH : 0) : l;
                h = i.x + f.dist;
                p = i.y + l.dist;
                if (i.x > 0 && h > 0 || i.x < i.maxScrollX && h < i.maxScrollX)
                    f = {dist: 0, time: 0};
                if (i.y > i.minScrollY && p > i.minScrollY || i.y < i.maxScrollY && p < i.maxScrollY)
                    l = {dist: 0, time: 0}
            }
            if (f.dist || l.dist) {
                E = e.max(e.max(f.time, l.time), 10);
                if (i.options.snap) {
                    d = h - i.absStartX;
                    y = p - i.absStartY;
                    if (e.abs(d) < i.options.snapThreshold && e.abs(y) < i.options.snapThreshold) {
                        i.scrollTo(i.absStartX, i.absStartY, 200)
                    } else {
                        S = i._snap(h, p);
                        h = S.x;
                        p = S.y;
                        E = e.max(S.time, E)
                    }
                }
                i.scrollTo(t(h), t(p), E);
                if (i.options.onTouchEnd)
                    i.options.onTouchEnd.call(i, r);
                return
            }
            if (i.options.snap) {
                d = h - i.absStartX;
                y = p - i.absStartY;
                if (e.abs(d) < i.options.snapThreshold && e.abs(y) < i.options.snapThreshold)
                    i.scrollTo(i.absStartX, i.absStartY, 200);
                else {
                    S = i._snap(i.x, i.y);
                    if (S.x != i.x || S.y != i.y)
                        i.scrollTo(S.x, S.y, S.time)
                }
                if (i.options.onTouchEnd)
                    i.options.onTouchEnd.call(i, r);
                return
            }
            i._resetPos(200);
            if (i.options.onTouchEnd)
                i.options.onTouchEnd.call(i, r)
        }, _resetPos: function(e) {
            var t = this, r = t.x >= 0 ? 0 : t.x < t.maxScrollX ? t.maxScrollX : t.x, i = t.y >= t.minScrollY || t.maxScrollY > 0 ? t.minScrollY : t.y < t.maxScrollY ? t.maxScrollY : t.y;
            if (r == t.x && i == t.y) {
                if (t.moved) {
                    t.moved = false;
                    if (t.options.onScrollEnd)
                        t.options.onScrollEnd.call(t)
                }
                if (t.hScrollbar && t.options.hideScrollbar) {
                    if (n == "webkit")
                        t.hScrollbarWrapper.style[n + "TransitionDelay"] = "300ms";
                    t.hScrollbarWrapper.style.opacity = "0"
                }
                if (t.vScrollbar && t.options.hideScrollbar) {
                    if (n == "webkit")
                        t.vScrollbarWrapper.style[n + "TransitionDelay"] = "300ms";
                    t.vScrollbarWrapper.style.opacity = "0"
                }
                return
            }
            t.scrollTo(r, i, e || 0)
        }, _wheel: function(e) {
            var t = this, n, r, i, s, o;
            if ("wheelDeltaX"in e) {
                n = e.wheelDeltaX / 12;
                r = e.wheelDeltaY / 12
            } else if ("wheelDelta"in e) {
                n = r = e.wheelDelta / 12
            } else if ("detail"in e) {
                n = r = -e.detail * 3
            } else {
                return
            }
            if (t.options.wheelAction == "zoom") {
                o = t.scale * Math.pow(2, 1 / 3 * (r ? r / Math.abs(r) : 0));
                if (o < t.options.zoomMin)
                    o = t.options.zoomMin;
                if (o > t.options.zoomMax)
                    o = t.options.zoomMax;
                if (o != t.scale) {
                    if (!t.wheelZoomCount && t.options.onZoomStart)
                        t.options.onZoomStart.call(t, e);
                    t.wheelZoomCount++;
                    t.zoom(e.pageX, e.pageY, o, 400);
                    setTimeout(function() {
                        t.wheelZoomCount--;
                        if (!t.wheelZoomCount && t.options.onZoomEnd)
                            t.options.onZoomEnd.call(t, e)
                    }, 400)
                }
                return
            }
            i = t.x + n;
            s = t.y + r;
            if (i > 0)
                i = 0;
            else if (i < t.maxScrollX)
                i = t.maxScrollX;
            if (s > t.minScrollY)
                s = t.minScrollY;
            else if (s < t.maxScrollY)
                s = t.maxScrollY;
            t.scrollTo(i, s, 0)
        }, _mouseout: function(e) {
            var t = e.relatedTarget;
            if (!t) {
                this._end(e);
                return
            }
            while (t = t.parentNode)
                if (t == this.wrapper)
                    return;
            this._end(e)
        }, _transitionEnd: function(e) {
            var t = this;
            if (e.target != t.scroller)
                return;
            t._unbind("webkitTransitionEnd");
            t._startAni()
        }, _startAni: function() {
            var t = this, n = t.x, r = t.y, i = Date.now(), s, o, u;
            if (t.animating)
                return;
            if (!t.steps.length) {
                t._resetPos(400);
                return
            }
            s = t.steps.shift();
            if (s.x == n && s.y == r)
                s.time = 0;
            t.animating = true;
            t.moved = true;
            if (t.options.useTransition) {
                t._transitionTime(s.time);
                t._pos(s.x, s.y);
                t.animating = false;
                if (s.time)
                    t._bind("webkitTransitionEnd");
                else
                    t._resetPos(0);
                return
            }
            u = function() {
                var a = Date.now(), f, l;
                if (a >= i + s.time) {
                    t._pos(s.x, s.y);
                    t.animating = false;
                    if (t.options.onAnimationEnd)
                        t.options.onAnimationEnd.call(t);
                    t._startAni();
                    return
                }
                a = (a - i) / s.time - 1;
                o = e.sqrt(1 - a * a);
                f = (s.x - n) * o + n;
                l = (s.y - r) * o + r;
                t._pos(f, l);
                if (t.animating)
                    t.aniTime = c(u)
            };
            u()
        }, _transitionTime: function(e) {
            e += "ms";
            this.scroller.style[n + "TransitionDuration"] = e;
            if (this.hScrollbar)
                this.hScrollbarIndicator.style[n + "TransitionDuration"] = e;
            if (this.vScrollbar)
                this.vScrollbarIndicator.style[n + "TransitionDuration"] = e
        }, _momentum: function(n, r, i, s, o) {
            var u = 6e-4, a = e.abs(n) / r, f = a * a / (2 * u), l = 0, c = 0;
            if (n > 0 && f > i) {
                c = o / (6 / (f / a * u));
                i = i + c;
                a = a * i / f;
                f = i
            } else if (n < 0 && f > s) {
                c = o / (6 / (f / a * u));
                s = s + c;
                a = a * s / f;
                f = s
            }
            f = f * (n < 0 ? -1 : 1);
            l = a / u;
            return{dist: f, time: t(l)}
        }, _offset: function(e) {
            var t = -e.offsetLeft, n = -e.offsetTop;
            while (e = e.offsetParent) {
                t -= e.offsetLeft;
                n -= e.offsetTop
            }
            if (e != this.wrapper) {
                t *= this.scale;
                n *= this.scale
            }
            return{left: t, top: n}
        }, _snap: function(n, r) {
            var i = this, s, o, u, a, f, l;
            u = i.pagesX.length - 1;
            for (s = 0, o = i.pagesX.length; s < o; s++) {
                if (n >= i.pagesX[s]) {
                    u = s;
                    break
                }
            }
            if (u == i.currPageX && u > 0 && i.dirX < 0)
                u--;
            n = i.pagesX[u];
            f = e.abs(n - i.pagesX[i.currPageX]);
            f = f ? e.abs(i.x - n) / f * 500 : 0;
            i.currPageX = u;
            u = i.pagesY.length - 1;
            for (s = 0; s < u; s++) {
                if (r >= i.pagesY[s]) {
                    u = s;
                    break
                }
            }
            if (u == i.currPageY && u > 0 && i.dirY < 0)
                u--;
            r = i.pagesY[u];
            l = e.abs(r - i.pagesY[i.currPageY]);
            l = l ? e.abs(i.y - r) / l * 500 : 0;
            i.currPageY = u;
            a = t(e.max(f, l)) || 200;
            return{x: n, y: r, time: a}
        }, _bind: function(e, t, n) {
            (t || this.scroller).addEventListener(e, this, !!n)
        }, _unbind: function(e, t, n) {
            (t || this.scroller).removeEventListener(e, this, !!n)
        }, destroy: function() {
            var e = this;
            e.scroller.style[n + "Transform"] = "";
            e.hScrollbar = false;
            e.vScrollbar = false;
            e._scrollbar("h");
            e._scrollbar("v");
            e._unbind(p, window);
            e._unbind(d);
            e._unbind(v);
            e._unbind(m);
            e._unbind(g);
            if (!e.options.hasTouch) {
                e._unbind("mouseout", e.wrapper);
                e._unbind(y)
            }
            if (e.options.useTransition)
                e._unbind("webkitTransitionEnd");
            if (e.options.checkDOMChanges)
                clearInterval(e.checkDOMTime);
            if (e.options.onDestroy)
                e.options.onDestroy.call(e)
        }, refresh: function() {
            var e = this, r, i, s, o, u = 0, a = 0;
            if (e.scale < e.options.zoomMin)
                e.scale = e.options.zoomMin;
            e.wrapperW = e.wrapper.clientWidth || 1;
            e.wrapperH = e.wrapper.clientHeight || 1;
            e.minScrollY = -e.options.topOffset || 0;
            e.scrollerW = t(e.scroller.offsetWidth * e.scale);
            e.scrollerH = t((e.scroller.offsetHeight + e.minScrollY) * e.scale);
            e.maxScrollX = e.wrapperW - e.scrollerW;
            e.maxScrollY = e.wrapperH - e.scrollerH + e.minScrollY;
            e.dirX = 0;
            e.dirY = 0;
            if (e.options.onRefresh)
                e.options.onRefresh.call(e);
            e.hScroll = e.options.hScroll && e.maxScrollX < 0;
            e.vScroll = e.options.vScroll && (!e.options.bounceLock && !e.hScroll || e.scrollerH > e.wrapperH);
            e.hScrollbar = e.hScroll && e.options.hScrollbar;
            e.vScrollbar = e.vScroll && e.options.vScrollbar && e.scrollerH > e.wrapperH;
            r = e._offset(e.wrapper);
            e.wrapperOffsetLeft = -r.left;
            e.wrapperOffsetTop = -r.top;
            if (typeof e.options.snap == "string") {
                e.pagesX = [];
                e.pagesY = [];
                o = e.scroller.querySelectorAll(e.options.snap);
                for (i = 0, s = o.length; i < s; i++) {
                    u = e._offset(o[i]);
                    u.left += e.wrapperOffsetLeft;
                    u.top += e.wrapperOffsetTop;
                    e.pagesX[i] = u.left < e.maxScrollX ? e.maxScrollX : u.left * e.scale;
                    e.pagesY[i] = u.top < e.maxScrollY ? e.maxScrollY : u.top * e.scale
                }
            } else if (e.options.snap) {
                e.pagesX = [];
                while (u >= e.maxScrollX) {
                    e.pagesX[a] = u;
                    u = u - e.wrapperW;
                    a++
                }
                if (e.maxScrollX % e.wrapperW)
                    e.pagesX[e.pagesX.length] = e.maxScrollX - e.pagesX[e.pagesX.length - 1] + e.pagesX[e.pagesX.length - 1];
                u = 0;
                a = 0;
                e.pagesY = [];
                while (u >= e.maxScrollY) {
                    e.pagesY[a] = u;
                    u = u - e.wrapperH;
                    a++
                }
                if (e.maxScrollY % e.wrapperH)
                    e.pagesY[e.pagesY.length] = e.maxScrollY - e.pagesY[e.pagesY.length - 1] + e.pagesY[e.pagesY.length - 1]
            }
            e._scrollbar("h");
            e._scrollbar("v");
            if (!e.zoomed) {
                e.scroller.style[n + "TransitionDuration"] = "0";
                e._resetPos(200)
            }
        }, scrollTo: function(e, t, n, r) {
            var i = this, s = e, o, u;
            i.stop();
            if (!s.length)
                s = [{x: e, y: t, time: n, relative: r}];
            for (o = 0, u = s.length; o < u; o++) {
                if (s[o].relative) {
                    s[o].x = i.x - s[o].x;
                    s[o].y = i.y - s[o].y
                }
                i.steps.push({x: s[o].x, y: s[o].y, time: s[o].time || 0})
            }
            i._startAni()
        }, scrollToElement: function(t, n) {
            var r = this, i;
            t = t.nodeType ? t : r.scroller.querySelector(t);
            if (!t)
                return;
            i = r._offset(t);
            i.left += r.wrapperOffsetLeft;
            i.top += r.wrapperOffsetTop;
            i.left = i.left > 0 ? 0 : i.left < r.maxScrollX ? r.maxScrollX : i.left;
            i.top = i.top > r.minScrollY ? r.minScrollY : i.top < r.maxScrollY ? r.maxScrollY : i.top;
            n = n === undefined ? e.max(e.abs(i.left) * 2, e.abs(i.top) * 2) : n;
            r.scrollTo(i.left, i.top, n)
        }, scrollToPage: function(e, t, n) {
            var r = this, i, s;
            n = n === undefined ? 400 : n;
            if (r.options.onScrollStart)
                r.options.onScrollStart.call(r);
            if (r.options.snap) {
                e = e == "next" ? r.currPageX + 1 : e == "prev" ? r.currPageX - 1 : e;
                t = t == "next" ? r.currPageY + 1 : t == "prev" ? r.currPageY - 1 : t;
                e = e < 0 ? 0 : e > r.pagesX.length - 1 ? r.pagesX.length - 1 : e;
                t = t < 0 ? 0 : t > r.pagesY.length - 1 ? r.pagesY.length - 1 : t;
                r.currPageX = e;
                r.currPageY = t;
                i = r.pagesX[e];
                s = r.pagesY[t]
            } else {
                i = -r.wrapperW * e;
                s = -r.wrapperH * t;
                if (i < r.maxScrollX)
                    i = r.maxScrollX;
                if (s < r.maxScrollY)
                    s = r.maxScrollY
            }
            r.scrollTo(i, s, n)
        }, disable: function() {
            this.stop();
            this._resetPos(0);
            this.enabled = false;
            this._unbind(v);
            this._unbind(m);
            this._unbind(g)
        }, enable: function() {
            this.enabled = true
        }, stop: function() {
            if (this.options.useTransition)
                this._unbind("webkitTransitionEnd");
            else
                h(this.aniTime);
            this.steps = [];
            this.moved = false;
            this.animating = false
        }, zoom: function(e, t, r, i) {
            var s = this, o = r / s.scale;
            if (!s.options.useTransform)
                return;
            s.zoomed = true;
            i = i === undefined ? 200 : i;
            e = e - s.wrapperOffsetLeft - s.x;
            t = t - s.wrapperOffsetTop - s.y;
            s.x = e - e * o + s.x;
            s.y = t - t * o + s.y;
            s.scale = r;
            s.refresh();
            s.x = s.x > 0 ? 0 : s.x < s.maxScrollX ? s.maxScrollX : s.x;
            s.y = s.y > s.minScrollY ? s.minScrollY : s.y < s.maxScrollY ? s.maxScrollY : s.y;
            s.scroller.style[n + "TransitionDuration"] = i + "ms";
            s.scroller.style[n + "Transform"] = b + s.x + "px," + s.y + "px" + w + " scale(" + r + ")";
            s.zoomed = false
        }, isReady: function() {
            return!this.moved && !this.zoomed && !this.animating
        }};
    if (typeof exports !== "undefined")
        exports.iScroll = E;
    else
        window.iScroll = E
})();
bb.menuBar = {height: 140, itemWidth: 143, visible: false, menu: false, screen: false, apply: function(e, t) {
        if (bb.device.isPlayBook || bb.device.isBB10) {
            bb.menuBar.createSwipeMenu(e, t);
            e.parentNode.removeChild(e);
            if (window.blackberry) {
                if (bb.device.isPlayBook && blackberry.app.event) {
                    blackberry.app.event.onSwipeDown(bb.menuBar.showMenuBar)
                } else if (bb.device.isBB10 && blackberry.app) {
                    blackberry.event.addEventListener("swipedown", bb.menuBar.showMenuBar)
                }
            }
        } else {
            console.log("Unable to create Application/onSwipeDown menu.")
        }
    }, createSwipeMenu: function(e, t) {
        bb.menuBar.screen = t;
        var n = document.createElement("div"), r = 5, i, s, o, u, a = false, f = false, l = [], c, h, p, d, v, m, g;
        if (bb.device.is1024x600) {
            bb.menuBar.height = 100;
            bb.menuBar.itemWidth = 96
        } else if (bb.device.is720x720) {
            bb.menuBar.height = 110;
            bb.menuBar.itemWidth = 143
        } else if (bb.device.is1280x720) {
            bb.menuBar.height = 116;
            bb.menuBar.itemWidth = 113
        } else {
            bb.menuBar.height = 140;
            bb.menuBar.itemWidth = 143
        }
        n.oncontextmenu = function(e) {
            var t = e.srcElement, n = t.parentNode;
            if (!n)
                return;
            while (n) {
                if (n == this) {
                    e.preventDefault();
                    break
                }
                n = n.parentNode
            }
        };
        n.oncontextmenu = n.oncontextmenu.bind(n);
        window.addEventListener("contextmenu", n.oncontextmenu);
        bb.windowListeners.push({name: "contextmenu", eventHandler: n.oncontextmenu});
        n.setAttribute("class", "bb-menu-bar bb-menu-bar-dark");
        items = e.querySelectorAll("[data-bb-type=menu-item]");
        if (items.length > 0) {
            for (i = 0, s = items.length; i < items.length; i++) {
                u = items[i];
                o = u.hasAttribute("data-bb-type") ? u.getAttribute("data-bb-type").toLowerCase() : undefined;
                if (o == "menu-item") {
                    p = u.innerHTML;
                    h = u.getAttribute("data-bb-img");
                    if (p && h) {
                        if (u.hasAttribute("data-bb-pin")) {
                            pinType = u.getAttribute("data-bb-pin").toLowerCase();
                            if (pinType === "left" && !a) {
                                a = u;
                                r--
                            } else if (pinType === "right" && !f) {
                                f = u;
                                r--
                            } else {
                                console.log("Unknown value from menu-item data-bb-pin: " + pinType + " or value already defined.");
                                l.push(u)
                            }
                        } else {
                            l.push(u)
                        }
                    } else {
                        console.log("missing menu item caption or image.")
                    }
                } else {
                    console.log("invalid menu item type for bb10")
                }
            }
            if (l.length >= r) {
                l = l.slice(0, r)
            }
            if (a) {
                l.unshift(a)
            }
            if (f) {
                l.push(f)
            }
            v = bb.menuBar.itemWidth + "px";
            m = Math.floor((window.innerWidth - bb.menuBar.itemWidth * l.length) / (l.length - 1)) + "px";
            for (i = 0, s = l.length; i < s; i++) {
                u = l[i];
                p = u.innerHTML;
                h = u.getAttribute("data-bb-img");
                g = document.createElement("div");
                g.setAttribute("class", "bb-menu-bar-item");
                u.innerHTML = "";
                c = document.createElement("img");
                c.setAttribute("src", h);
                g.appendChild(c);
                d = document.createElement("div");
                d.setAttribute("class", "bb-menu-bar-item-caption");
                d.innerHTML = p;
                g.appendChild(d);
                g.onclick = u.onclick;
                g.style.width = v;
                if (i == l.length - 1 && l.length > 1 || l.length === 1 && !a) {
                    g.style.marginRight = 0;
                    g.style.float = "right"
                } else {
                    g.style.marginRight = m
                }
                n.appendChild(g);
                g.ontouchstart = function() {
                    this.style["border-top-color"] = bb.options.highlightColor
                };
                g.ontouchend = function() {
                    this.style["border-top-color"] = "transparent"
                }
            }
        } else {
            n.style.display = "none";
            bb.menuBar.menu = null
        }
        n.addEventListener("click", bb.menuBar.onMenuBarClicked, false);
        t.parentNode.appendChild(n);
        bb.menuBar.menu = n;
        bb.menuBar.menu.style["z-index"] = "-100";
        bb.menuBar.menu.style.display = "none";
        bb.menuBar.menu.style.height = bb.menuBar.menu.height + "px";
        bb.menuBar.menu.doOrientationChange = function() {
            var e, t, n = bb.menuBar.menu.getElementsByClassName("bb-menu-bar-item"), r = Math.floor((window.innerWidth - bb.menuBar.itemWidth * n.length) / (n.length - 1)) + "px";
            for (e = 0, t = n.length; e < t; e++) {
                if (e == n.length - 1) {
                    n[e].style.marginRight = 0;
                    n[e].style.float = "right"
                } else {
                    n[e].style.marginRight = r
                }
            }
        };
        bb.menuBar.menu.doOrientationChange = bb.menuBar.menu.doOrientationChange.bind(bb.menuBar);
        window.addEventListener("resize", bb.menuBar.menu.doOrientationChange, false);
        bb.windowListeners.push({name: "resize", eventHandler: bb.menuBar.menu.doOrientationChange});
        if (!bb.screen.overlay) {
            bb.screen.overlay = document.createElement("div");
            bb.screen.overlay.setAttribute("class", "bb-menu-bar-overlay")
        }
        t.appendChild(bb.screen.overlay);
        bb.menuBar.menu.overlay = bb.screen.overlay
    }, doEndTransition: function() {
        if (bb.menuBar.visible) {
            bb.menuBar.menu.style["z-index"] = ""
        } else {
            if (typeof bb.menuBar.menu.style !== "undefined") {
                bb.menuBar.menu.style.display = "none";
                bb.menuBar.menu.style.height = "0px"
            }
            bb.menuBar.screen.removeEventListener("webkitTransitionEnd", bb.menuBar.doEndTransition);
            bb.menuBar.screen.style["-webkit-transition"] = "";
            bb.menuBar.screen.style["-webkit-transform"] = "";
            bb.menuBar.screen.style["-webkit-backface-visibility"] = ""
        }
    }, setDimensions: function() {
        bb.menuBar.menu.style.display = "";
        bb.menuBar.menu.style.height = bb.menuBar.height + "px";
        bb.menuBar.screen.parentNode.style.position = "absolute";
        bb.menuBar.screen.parentNode.style.left = "0px";
        bb.menuBar.screen.parentNode.style.top = "0px";
        bb.menuBar.screen.parentNode.style.bottom = "0px";
        bb.menuBar.screen.parentNode.style.right = "0px";
        bb.menuBar.screen.parentNode.style.width = "100%";
        bb.menuBar.screen.parentNode.style["overflow"] = "hidden";
        bb.menuBar.menu.overlay.style.display = "block";
        bb.menuBar.screen.style["-webkit-transition"] = "0.2s ease-out";
        bb.menuBar.screen.style["-webkit-transform"] = "translate3d(0px," + bb.menuBar.height + "px,0px)";
        bb.menuBar.screen.style["-webkit-backface-visibility"] = "hidden"
    }, showMenuBar: function() {
        if (!bb.menuBar.visible && !bb.screen.animating) {
            bb.menuBar.visible = true;
            if (bb.device.isPlayBook) {
                blackberry.app.event.onSwipeDown(bb.menuBar.hideMenuBar)
            } else if (bb.device.isBB10) {
                blackberry.event.removeEventListener("swipedown", bb.menuBar.showMenuBar);
                blackberry.event.addEventListener("swipedown", bb.menuBar.hideMenuBar)
            }
            if (bb.device.isBB10) {
                bb.menuBar.screen.addEventListener("webkitTransitionEnd", bb.menuBar.doEndTransition);
                bb.menuBar.setDimensions()
            } else if (bb.device.isPlayBook) {
                bb.menuBar.menu.style["-webkit-transition"] = "all 0.5s ease-in-out";
                bb.menuBar.menu.style["-webkit-transform"] = "translate3d(0, " + (bb.menuBar.height + 3) + "px,0px)"
            }
            bb.menuBar.visible = true;
            bb.menuBar.menu.overlay.addEventListener("touchstart", bb.menuBar.overlayTouchHandler, false)
        }
    }, hideMenuBar: function() {
        if (bb.menuBar.visible) {
            bb.menuBar.visible = false;
            if (bb.device.isPlayBook) {
                blackberry.app.event.onSwipeDown(bb.menuBar.showMenuBar)
            } else if (bb.device.isBB10) {
                blackberry.event.removeEventListener("swipedown", bb.menuBar.hideMenuBar);
                blackberry.event.addEventListener("swipedown", bb.menuBar.showMenuBar)
            }
            if (bb.device.isBB10) {
                bb.menuBar.menu.style["z-index"] = "-100";
                bb.menuBar.screen.style["-webkit-transform"] = "translate3d(0px,0px,0px)";
                bb.menuBar.menu.overlay.style.display = "none"
            } else if (bb.device.isPlayBook) {
                bb.menuBar.menu.style["-webkit-transition"] = "all 0.5s ease-in-out";
                bb.menuBar.menu.style["-webkit-transform"] = "translate3d(0, -" + (bb.menuBar.height + 3) + "px,0px)"
            }
            bb.menuBar.menu.overlay.removeEventListener("touchstart", bb.menuBar.overlayTouchHandler, false)
        }
    }, overlayTouchHandler: function(e) {
        e.preventDefault();
        e.stopPropagation();
        bb.menuBar.hideMenuBar()
    }, onMenuBarClicked: function() {
        bb.menuBar.hideMenuBar()
    }, clearMenu: function() {
        if (window.blackberry) {
            if (bb.menuBar.menu && (bb.device.isPlayBook || bb.device.isBB10)) {
                if (bb.menuBar.visible) {
                    bb.menuBar.hideMenuBar()
                }
                if (bb.device.isPlayBook && blackberry.app.event) {
                    blackberry.app.event.onSwipeDown("")
                } else if (bb.device.isBB10 && blackberry.app) {
                    blackberry.event.removeEventListener("swipedown", bb.menuBar.showMenuBar);
                    blackberry.event.removeEventListener("swipedown", bb.menuBar.hideMenuBar)
                }
                bb.menuBar.menu.parentNode.removeChild(bb.menuBar.menu);
                bb.menuBar.menu = false;
                bb.menuBar.visible = false
            }
        }
    }};
_bb_progress = {NORMAL: 0, PAUSED: 1, ERROR: 2, apply: function(e) {
        for (var t = 0; t < e.length; t++) {
            bb.progress.style(e[t], true)
        }
    }, style: function(e, t) {
        var n = bb.screen.controlColor, r = bb.options.highlightColor, i = bb.options.shades.darkHighlight, s = 0, o = 1, u = 2;
        outerElement = document.createElement("div");
        outerElement.progress = e;
        outerElement.state = bb.progress.NORMAL;
        if (e.parentNode) {
            e.parentNode.insertBefore(outerElement, e)
        }
        e.style.display = "none";
        outerElement.appendChild(e);
        outerElement.maxValue = e.hasAttribute("max") ? parseInt(e.getAttribute("max")) : 0;
        outerElement.value = e.hasAttribute("value") ? parseInt(e.getAttribute("value")) : 0;
        outerElement.className = "bb-progress";
        outerElement.outer = document.createElement("div");
        outerElement.outer.setAttribute("class", "outer bb-progress-outer-" + n + " bb-progress-outer-idle-background-" + n);
        outerElement.appendChild(outerElement.outer);
        outerElement.fill = document.createElement("div");
        outerElement.fill.normal = "bb-progress-fill bb10Highlight";
        outerElement.fill.setAttribute("class", outerElement.fill.normal);
        outerElement.outer.appendChild(outerElement.fill);
        outerElement.inner = document.createElement("div");
        outerElement.inner.className = "inner";
        outerElement.outer.appendChild(outerElement.inner);
        e.outerElement = outerElement;
        e.setValue = function(e) {
            var t = 0, s, o;
            if (e && e < 0 || e && e > parseInt(this.outerElement.maxValue)) {
                return
            } else if (e) {
                this.outerElement.value = e;
                this.value = e
            } else if (e == 0) {
                this.outerElement.value = 0;
                this.value = 0
            } else {
                e = parseInt(this.outerElement.value)
            }
            if (e == this.outerElement.maxValue) {
                this.outerElement.fill.style.background = "-webkit-gradient(linear, center top, center bottom, from(" + i + "), to(" + r + "))";
                t = 1
            } else if (e == 0) {
                this.outerElement.outer.setAttribute("class", "outer bb-progress-outer-" + n + " bb-progress-outer-idle-background-" + n)
            } else {
                if (this.outerElement.state == bb.progress.PAUSED) {
                    this.outerElement.fill.style.background = "-webkit-gradient(linear, center top, center bottom, from(#EDC842), to(#BA991E))"
                } else if (this.outerElement.state == bb.progress.ERROR) {
                    this.outerElement.fill.style.background = "-webkit-gradient(linear, center top, center bottom, from( #E04242), to(#D91111))"
                } else {
                    this.outerElement.outer.setAttribute("class", "outer bb-progress-outer-" + n);
                    this.outerElement.fill.setAttribute("class", this.outerElement.fill.normal);
                    this.outerElement.fill.style.background = ""
                }
                t = this.outerElement.value / parseInt(this.outerElement.maxValue)
            }
            o = Math.floor(parseInt(window.getComputedStyle(this.outerElement.outer).width) * t);
            this.outerElement.fill.style.width = o + "px"
        };
        e.setValue = e.setValue.bind(e);
        e.setState = function(e) {
            this.outerElement.state = e;
            this.setValue()
        };
        e.setState = e.setState.bind(e);
        e.show = function() {
            this.outerElement.style.display = "block";
            bb.refresh()
        };
        e.show = e.show.bind(e);
        e.hide = function() {
            this.outerElement.style.display = "none";
            bb.refresh()
        };
        e.hide = e.hide.bind(e);
        e.remove = function() {
            this.outerElement.parentNode.removeChild(this.outerElement);
            bb.refresh()
        };
        e.remove = e.remove.bind(e);
        e.setMax = function(e) {
            if (!e || e < 0 || e == this.max)
                return;
            this.max = e;
            this.outerElement.maxValue = e
        };
        e.setMax = e.setMax.bind(e);
        if (t) {
            e.onbbuidomready = function() {
                this.setValue();
                document.removeEventListener("bbuidomready", this.onbbuidomready, false)
            };
            e.onbbuidomready = e.onbbuidomready.bind(e);
            document.addEventListener("bbuidomready", e.onbbuidomready, false)
        } else {
            window.setTimeout(e.setValue, 0)
        }
        outerElement.doOrientationChange = function() {
            window.setTimeout(this.progress.setValue, 0)
        };
        outerElement.doOrientationChange = outerElement.doOrientationChange.bind(outerElement);
        window.addEventListener("resize", outerElement.doOrientationChange, false);
        bb.windowListeners.push({name: "resize", eventHandler: outerElement.doOrientationChange});
        return outerElement
    }};
bb.screen = {scriptCounter: 0, totalScripts: 0, controlColor: "light", listColor: "light", overlay: null, tabOverlay: null, contextMenu: null, currentScreen: null, focusedInput: null, animating: false, apply: function(e) {
        var t;
        bb.screen.contextMenu = null;
        for (var n = 0; n < e.length; n++) {
            t = e[n];
            bb.screen.currentScreen = t;
            t.setAttribute("class", "bb-screen");
            var r = t.querySelectorAll("[data-bb-type=menu]"), i = t.querySelectorAll("[data-bb-type=title]"), s = t.querySelectorAll("[data-bb-type=action-bar]"), o = t.querySelectorAll("[data-bb-type=context-menu]"), u, a, f = [], l = null, c, h = bb.screen.getMenuBarHeight(), p = bb.screen.getActionBarHeight(), d = bb.screen.getTitleBarHeight();
            if (r.length > 0) {
                r = r[0];
                t.menuBar = r
            } else {
                r = null
            }
            if (i.length > 0) {
                i = i[0];
                t.titleBar = i
            } else {
                i = null
            }
            if (s.length > 0) {
                s = s[0];
                t.actionBar = s
            } else {
                s = null
            }
            u = document.createElement("div");
            t.appendChild(u);
            if (!t.hasAttribute("data-bb-scroll-effect") || t.getAttribute("data-bb-scroll-effect").toLowerCase() != "off") {
                t.bbUIscrollWrapper = u
            }
            a = document.createElement("div");
            u.appendChild(a);
            for (c = 0; c < t.childNodes.length - 1; c++) {
                l = t.childNodes[c];
                if (l != s && l != r && l != i) {
                    f.push(l)
                }
            }
            for (c = 0; c < f.length; c++) {
                a.appendChild(f[c])
            }
            t.menuBarHeight = h;
            t.actionBarHeight = p;
            t.titleBarHeight = d;
            t.outerScrollArea = u;
            u.addEventListener("scroll", function() {
                evt = document.createEvent("Events");
                evt.initEvent("bbuiscrolling", true, true);
                document.dispatchEvent(evt);
                if (bb.device.requiresScrollingHack) {
                    if (this.timeout) {
                        clearTimeout(this.timeout)
                    } else {
                        this.style["padding-right"] = "1px"
                    }
                    this.timeout = setTimeout(this.resetPadding, 20)
                }
            }, false);
            u.resetPadding = function() {
                this.style["padding-right"] = "0px";
                this.timeout = null
            };
            u.resetPadding = u.resetPadding.bind(u);
            if (t.getAttribute("data-bb-indicator")) {
                var v = document.createElement("div"), m = document.createElement("div");
                u.scrollArea = a;
                u.overlay = v;
                v.style["position"] = "absolute";
                v.style["bottom"] = "0px";
                v.style["top"] = "0px";
                v.style["left"] = "0px";
                v.style["right"] = "0px";
                v.touchstart = function(e) {
                    e.preventDefault();
                    e.stopPropagation()
                };
                v.touchend = function(e) {
                    e.preventDefault();
                    e.stopPropagation()
                };
                v.click = function(e) {
                    e.preventDefault();
                    e.stopPropagation()
                };
                u.appendChild(v);
                a.style.display = "none";
                m.setAttribute("data-bb-type", "activity-indicator");
                m.setAttribute("data-bb-size", "large");
                if (bb.device.is720x720) {
                    m.style.margin = "30% auto 0px auto"
                } else if (bb.getOrientation().toLowerCase() == "landscape") {
                    m.style.margin = "20% auto 0px auto"
                } else {
                    m.style.margin = "60% auto 0px auto"
                }
                v.appendChild(m);
                u.bbuidomprocessed = function() {
                    this.scrollArea.style.display = "";
                    this.removeChild(this.overlay);
                    document.removeEventListener("bbuidomprocessed", this.bbuidomprocessed, false);
                    if (bb.device.isPlayBook && bb.scroller) {
                        bb.scroller.refresh()
                    }
                };
                u.bbuidomprocessed = u.bbuidomprocessed.bind(u);
                document.addEventListener("bbuidomprocessed", u.bbuidomprocessed, false)
            }
            if (i && s) {
                u.style["overflow"] = "auto";
                u.style["position"] = "absolute";
                u.style["bottom"] = p + "px";
                u.style["top"] = d + "px";
                u.style["left"] = "0px";
                u.style["right"] = "0px"
            } else if (i) {
                u.style["overflow"] = "auto";
                u.style["position"] = "absolute";
                u.style["bottom"] = "0px";
                u.style["top"] = d + "px";
                u.style["left"] = "0px";
                u.style["right"] = "0px"
            } else if (s) {
                u.style["overflow"] = "auto";
                u.style["position"] = "absolute";
                u.style["bottom"] = p + "px";
                u.style["top"] = "0px";
                u.style["left"] = "0px";
                u.style["right"] = "0px"
            } else {
                u.setAttribute("style", "overflow:auto;bottom:0px;position:absolute;top:0px;left:0px;right:0px;");
                u.style["overflow"] = "auto";
                u.style["position"] = "absolute";
                u.style["bottom"] = "0px";
                u.style["top"] = "0px";
                u.style["left"] = "0px";
                u.style["right"] = "0px"
            }
            if (r) {
                bb.menuBar.apply(r, t)
            }
            if (i) {
                bb.titleBar.apply(i)
            }
            if (s) {
                bb.actionBar.apply(s, t)
            }
            if (o.length > 0) {
                bb.screen.processContext(o[0], t)
            } else {
                o = null
            }
            t.refresh = function() {
                if (!bb.scroller)
                    return;
                bb.scroller.refresh()
            };
            t.refresh = t.refresh.bind(t);
            t.scrollTo = function(e, t) {
                if (bb.scroller) {
                    bb.scroller.scrollTo(e, t)
                } else if (bb.device.isBB10) {
                    this.bbUIscrollWrapper.scrollTop = e
                }
            };
            t.scrollTo = t.scrollTo.bind(t);
            t.scrollToElement = function(e) {
                if (bb.scroller) {
                    bb.scroller.scrollToElement(e)
                } else if (bb.device.isBB10) {
                    if (!e)
                        return;
                    var t = 0, n = e;
                    if (n.offsetParent) {
                        do {
                            t += n.offsetTop
                        } while (n = n.offsetParent)
                    }
                    if (bb.screen.currentScreen.titleBar) {
                        t -= bb.screen.currentScreen.titleBarHeight
                    }
                    if (bb.screen.currentScreen.actionBar) {
                        t -= bb.screen.getActionBarHeight()
                    }
                    this.scrollTo(t)
                }
            };
            t.scrollToElement = t.scrollToElement.bind(t)
        }
    }, processContext: function(e, t) {
        if (!bb.device.isPlayBook && !bb.device.isRipple) {
            if (blackberry.ui && blackberry.ui.contextmenu) {
                blackberry.ui.contextmenu.enabled = true
            }
        }
        t.appendChild(e);
        e.menu = bb.contextMenu.create(t);
        e.appendChild(e.menu);
        bb.screen.contextMenu = e.menu;
        var n = e.querySelectorAll("[data-bb-type=action]"), r;
        for (r = 0; r < n.length; r++) {
            e.menu.add(n[r])
        }
        e.menu.centerMenuItems()
    }, fadeIn: function(e) {
        var t = .3, n = "ease-out", r = e.style;
        r["-webkit-animation-name"] = "bbUI-fade-in";
        r["-webkit-animation-duration"] = t + "s";
        r["-webkit-animation-timing-function"] = n;
        r["-webkit-transform"] = "translate3d(0,0,0)";
        r["-webkit-backface-visibility"] = "hidden"
    }, fadeOut: function(e) {
        var t = .3, n = "ease-out", r = e.style;
        r["-webkit-animation-name"] = "bbUI-fade-out";
        r["-webkit-animation-duration"] = t + "s";
        r["-webkit-animation-timing-function"] = n;
        r["-webkit-transform"] = "translate3d(0,0,0)";
        r["-webkit-backface-visibility"] = "hidden"
    }, slideLeft: function(e) {
        var t = .2, n = "ease-out", r = e.style;
        r.width = bb.innerWidth() + "px";
        r["-webkit-animation-name"] = "bbUI-slide-left";
        r["-webkit-animation-duration"] = t + "s";
        r["-webkit-animation-timing-function"] = n;
        r["-webkit-transform"] = "translate3d(0,0,0)";
        r["-webkit-backface-visibility"] = "hidden"
    }, slideOutLeft: function(e) {
        var t = .3, n = "ease-out", r = e.style;
        r.width = bb.innerWidth() + "px";
        r["-webkit-animation-name"] = "bbUI-slide-out-left";
        r["-webkit-animation-duration"] = t + "s";
        r["-webkit-animation-timing-function"] = n;
        r["-webkit-transform"] = "translate3d(0,0,0)";
        r["-webkit-backface-visibility"] = "hidden"
    }, slideRight: function(e) {
        var t = .3, n = "ease-out", r = e.style;
        r.width = bb.innerWidth() + "px";
        r["-webkit-animation-name"] = "bbUI-slide-right";
        r["-webkit-animation-duration"] = t + "s";
        r["-webkit-animation-timing-function"] = n;
        r["-webkit-transform"] = "translate3d(0,0,0)";
        r["-webkit-backface-visibility"] = "hidden"
    }, slideOutRight: function(e) {
        var t = .3, n = "ease-out", r = e.style;
        r.width = bb.innerWidth() + "px";
        r["-webkit-animation-name"] = "bbUI-slide-out-right";
        r["-webkit-animation-duration"] = t + "s";
        r["-webkit-animation-timing-function"] = n;
        r["-webkit-transform"] = "translate3d(0,0,0)";
        r["-webkit-backface-visibility"] = "hidden"
    }, slideUp: function(e) {
        var t = .3, n = "ease-out", r = e.style;
        r.height = bb.innerHeight() + "px";
        r["-webkit-animation-name"] = "bbUI-slide-up";
        r["-webkit-animation-duration"] = t + "s";
        r["-webkit-animation-timing-function"] = n;
        r["-webkit-transform"] = "translate3d(0,0,0)";
        r["-webkit-backface-visibility"] = "hidden"
    }, slideOutUp: function(e) {
        var t = .3, n = "ease-out", r = e.style;
        r.height = bb.innerHeight() + "px";
        r["-webkit-animation-name"] = "bbUI-slide-out-up";
        r["-webkit-animation-duration"] = t + "s";
        r["-webkit-animation-timing-function"] = n;
        r["-webkit-transform"] = "translate3d(0,0,0)";
        r["-webkit-backface-visibility"] = "hidden"
    }, slideDown: function(e) {
        var t = .3, n = "ease-out", r = e.style;
        r.height = bb.innerHeight() + "px";
        r["-webkit-animation-name"] = "bbUI-slide-down";
        r["-webkit-animation-duration"] = t + "s";
        r["-webkit-animation-timing-function"] = n;
        r["-webkit-transform"] = "translate3d(0,0,0)";
        r["-webkit-backface-visibility"] = "hidden"
    }, slideOutDown: function(e) {
        var t = .3, n = "ease-out", r = e.style;
        r.height = bb.innerHeight() + "px";
        r["-webkit-animation-name"] = "bbUI-slide-out-down";
        r["-webkit-animation-duration"] = t + "s";
        r["-webkit-animation-timing-function"] = n;
        r["-webkit-transform"] = "translate3d(0,0,0)";
        r["-webkit-backface-visibility"] = "hidden"
    }, getMenuBarHeight: function() {
        if (bb.device.is1024x600) {
            return bb.getOrientation().toLowerCase() == "portrait" ? 73 : 73
        } else if (bb.device.is1280x768 || bb.device.is1280x720) {
            return bb.getOrientation().toLowerCase() == "portrait" ? 140 : 111
        } else {
            return bb.getOrientation().toLowerCase() == "portrait" ? 140 : 111
        }
    }, getActionBarHeight: function() {
        if (bb.device.is1024x600) {
            return bb.getOrientation().toLowerCase() == "portrait" ? 73 : 73
        } else if (bb.device.is1280x768) {
            return bb.getOrientation().toLowerCase() == "portrait" ? 139 : 99
        } else if (bb.device.is1280x720) {
            return bb.getOrientation().toLowerCase() == "portrait" ? 116 : 92
        } else if (bb.device.is720x720) {
            return 109
        } else {
            return bb.getOrientation().toLowerCase() == "portrait" ? 139 : 99
        }
    }, getTitleBarHeight: function() {
        if (bb.device.is1024x600) {
            return 65
        } else if (bb.device.is1280x768 || bb.device.is1280x720) {
            return 111
        } else if (bb.device.is720x720) {
            return 92
        } else {
            return 111
        }
    }};
bb.tabOverflow = {create: function(e) {
        var t = document.createElement("div"), n;
        t.screen = e;
        t.itemClicked = false;
        t.visible = false;
        t.actions = [];
        t.tabOverflowState = {display: undefined, img: undefined, style: undefined, caption: undefined};
        t.setAttribute("class", "bb-tab-overflow-menu bb-tab-overflow-menu-dark");
        e.parentNode.appendChild(t);
        t.style["z-index"] = "-100";
        t.style.display = "none";
        t.style.width = t.width + "px";
        t.oncontextmenu = function(e) {
            var t = e.srcElement, n = t.parentNode;
            if (!n)
                return;
            while (n) {
                if (n == this) {
                    e.preventDefault();
                    break
                }
                n = n.parentNode
            }
        };
        t.oncontextmenu = t.oncontextmenu.bind(t);
        window.addEventListener("contextmenu", t.oncontextmenu);
        bb.windowListeners.push({name: "contextmenu", eventHandler: t.oncontextmenu});
        if (!bb.screen.tabOverlay) {
            n = document.createElement("div");
            n.menu = t;
            bb.screen.tabOverlay = n;
            n.setAttribute("class", "bb-tab-overflow-menu-overlay ");
            e.appendChild(n);
            n.ontouchstart = function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.menu.hide()
            }
        }
        t.overlay = bb.screen.tabOverlay;
        t.doEndTransition = function() {
            if (this.visible) {
                this.style["z-index"] = ""
            } else {
                this.style.display = "none";
                this.style.width = "0px";
                this.screen.removeEventListener("webkitTransitionEnd", t.doEndTransition);
                this.screen.style["-webkit-transition"] = "";
                this.screen.style["-webkit-transform"] = "";
                this.screen.style["-webkit-backface-visibility"] = ""
            }
        };
        t.doEndTransition = t.doEndTransition.bind(t);
        t.show = function() {
            this.itemClicked = false;
            this.visible = true;
            var e = this.actionBar.tabOverflowBtn;
            this.tabOverflowState.display = e.tabHighlight.style.display;
            this.tabOverflowState.img = e.icon.src;
            this.tabOverflowState.caption = e.display.innerHTML;
            this.tabOverflowState.style = e.icon.getAttribute("class");
            this.screen.addEventListener("webkitTransitionEnd", t.doEndTransition);
            this.setDimensions();
            e.reset();
            if (bb.device.isPlayBook) {
                blackberry.app.event.onSwipeDown()
            } else {
                blackberry.event.removeEventListener("swipedown", bb.menuBar.showMenuBar)
            }
        };
        t.show = t.show.bind(t);
        t.setDimensions = function() {
            this.style.display = "";
            this.style.width = bb.tabOverflow.getWidth() + "px";
            this.screen.parentNode.style.position = "absolute";
            this.screen.parentNode.style.left = "0px";
            this.screen.parentNode.style.top = "0px";
            this.screen.parentNode.style.bottom = "0px";
            this.screen.parentNode.style.right = "0px";
            this.screen.parentNode.style.width = "100%";
            this.screen.parentNode.style["overflow"] = "hidden";
            this.overlay.style.display = "block";
            this.screen.style["-webkit-transition"] = "0.2s ease-out";
            this.screen.style["-webkit-transform"] = "translate3d(" + bb.tabOverflow.getWidth() + "px,0px,0px)";
            this.screen.style["-webkit-backface-visibility"] = "hidden"
        };
        t.setDimensions = t.setDimensions.bind(t);
        t.hide = function() {
            this.visible = false;
            this.style["z-index"] = "-100";
            this.screen.style["-webkit-transform"] = "translate3d(0px,0px,0px)";
            this.overlay.style.display = "none";
            if (!this.itemClicked) {
                var e = this.actionBar.tabOverflowBtn;
                e.icon.setAttribute("src", this.tabOverflowState.img);
                e.icon.setAttribute("class", this.tabOverflowState.style);
                e.tabHighlight.style.display = this.tabOverflowState.display;
                e.display.innerHTML = this.tabOverflowState.caption
            }
            if (bb.device.isPlayBook) {
                blackberry.app.event.onSwipeDown(bb.menuBar.showMenuBar)
            } else {
                blackberry.event.addEventListener("swipedown", bb.menuBar.showMenuBar)
            }
        };
        t.hide = t.hide.bind(t);
        t.onclick = function() {
            this.hide()
        };
        t.centerMenuItems = function() {
            var e = bb.innerHeight(), t = 111, n;
            if (bb.device.is1024x600) {
                t = 53
            } else if (bb.device.is720x720) {
                t = 80
            } else if (bb.device.is1280x720) {
                t = 91
            } else {
                t = 111
            }
            n = e - Math.floor(e / 2) - Math.floor(this.actions.length * t / 2) - t;
            if (n < 0)
                n = 0;
            this.actions[0].style["margin-top"] = n + "px"
        };
        t.centerMenuItems = t.centerMenuItems.bind(t);
        t.initSelected = function() {
            var e, t;
            for (e = 0; e < this.actions.length; e++) {
                t = this.actions[e];
                if (t.initialSelected) {
                    t.setOverflowTab(true);
                    break
                }
            }
        };
        t.initSelected = t.initSelected.bind(t);
        t.orientationChanged = function(e) {
            this.centerMenuItems();
            if (this.visible) {
                this.setDimensions()
            }
        };
        t.orientationChanged = t.orientationChanged.bind(t);
        window.addEventListener("orientationchange", t.orientationChanged, false);
        bb.windowListeners.push({name: "orientationchange", eventHandler: t.orientationChanged});
        t.add = function(e) {
            var t, n = e.innerHTML, r = e.getAttribute("data-bb-accent-text"), i = document.createElement("div"), s = "bb-tab-overflow-menu-item-inner", o = document.createElement("img"), u, a, f;
            t = "bb-tab-overflow-menu-item bb-tab-overflow-menu-item-dark";
            this.appendChild(e);
            if (e.hasAttribute("data-bb-visible") && e.getAttribute("data-bb-visible").toLowerCase() == "false") {
                e.visible = false;
                e.style.display = "none"
            } else {
                e.visible = true;
                this.actions.push(e)
            }
            if (this.actions.length == 1) {
                t = t + " bb-tab-overflow-menu-item-first-dark"
            }
            e.normal = t;
            e.accentText = null;
            e.menu = this;
            e.caption = n;
            e.setAttribute("class", e.normal);
            e.innerHTML = "";
            if (!e.visibleTab) {
                e.visibleTab = e.actionBar.tabOverflowBtn
            }
            u = document.createElement("table");
            a = document.createElement("tr");
            u.appendChild(a);
            e.appendChild(u);
            f = document.createElement("td");
            o.setAttribute("src", e.getAttribute("data-bb-img"));
            o.setAttribute("class", "bb-tab-overflow-menu-item-image");
            e.img = o;
            f.appendChild(o);
            a.appendChild(f);
            f = document.createElement("td");
            i.innerHTML = n;
            e.display = i;
            f.appendChild(i);
            if (r) {
                e.accentText = document.createElement("div");
                e.accentText.innerHTML = r;
                e.accentText.setAttribute("class", "tab-accent-text");
                f.appendChild(e.accentText);
                s = s + " bb-tab-overflow-menu-item-double"
            } else {
                s = s + " bb-tab-overflow-menu-item-single"
            }
            i.setAttribute("class", s);
            a.appendChild(f);
            e.setOverflowTab = function(e) {
                var t = this.actionBar.tabOverflowBtn;
                if (e) {
                    bb.actionBar.highlightAction(this.visibleTab, this)
                }
                if (this.visibleTab == t) {
                    t.icon.setAttribute("src", this.img.src);
                    t.icon.setAttribute("class", t.icon.highlight);
                    t.tabHighlight.style.display = "block";
                    t.display.innerHTML = this.caption
                }
            };
            e.setOverflowTab = e.setOverflowTab.bind(e);
            e.initialSelected = e.hasAttribute("data-bb-selected") && e.getAttribute("data-bb-selected").toLowerCase() == "true";
            e.selected = e.initialSelected;
            e.oldClick = e.onclick;
            e.onclick = function() {
                var e = this.actionBar.tabOverflowBtn;
                this.menu.itemClicked = true;
                bb.actionBar.highlightAction(this.visibleTab, this);
                if (this.visibleTab == e) {
                    this.setOverflowTab(false)
                }
                if (this.oldClick) {
                    this.oldClick()
                }
            };
            e.setCaption = function(e) {
                this.display.innerHTML = e;
                this.caption = e;
                var t = this.actionBar.tabOverflowBtn;
                if (this.visibleTab == t && this.selected == true) {
                    t.display.innerHTML = this.caption
                }
            };
            e.setCaption = e.setCaption.bind(e);
            e.setImage = function(e) {
                this.img.setAttribute("src", e)
            };
            e.setImage = e.setImage.bind(e);
            e.show = function() {
                if (this.visible)
                    return;
                this.visible = true;
                this.menu.actions.push(this);
                this.style.display = "";
                this.menu.centerMenuItems()
            };
            e.show = e.show.bind(e);
            e.hide = function() {
                if (!this.visible)
                    return;
                this.visible = false;
                var e = this.menu.actions.indexOf(this);
                this.menu.actions.splice(e, 1);
                this.style.display = "none";
                this.menu.centerMenuItems()
            };
            e.hide = e.hide.bind(e)
        };
        t.add = t.add.bind(t);
        return t
    }, getWidth: function() {
        if (bb.device.is1024x600) {
            return bb.getOrientation() == "portrait" ? bb.innerWidth() - 77 : 400
        } else if (bb.device.is720x720) {
            return bb.innerWidth() - 143
        } else {
            return bb.getOrientation() == "portrait" ? bb.innerWidth() - 154 : 700
        }
    }};
bb.titleBar = {apply: function(titleBar) {
        var orientation = bb.getOrientation(), button, caption, titleBarClass, details, topTitleArea = document.createElement("div"), img, accentText;
        titleBar.topTitleArea = topTitleArea;
        titleBar.appendChild(topTitleArea);
        if (titleBar.parentNode) {
            titleBar.dropShadow = document.createElement("div");
            titleBar.dropShadow.setAttribute("class", "bb-title-bar-drop-shadow");
            titleBar.dropShadow.style.top = bb.screen.getTitleBarHeight() - 1 + "px";
            titleBar.parentNode.appendChild(titleBar.dropShadow)
        }
        if (bb.options.coloredTitleBar) {
            titleBarClass = "bb-title-bar bb-title-bar-" + orientation + " bb10-title-colored"
        } else {
            titleBarClass = "bb-title-bar bb-title-bar-" + orientation + " bb-title-bar-" + bb.screen.controlColor
        }
        topTitleArea.setAttribute("class", titleBarClass);
        caption = document.createElement("div");
        titleBar.caption = caption;
        caption.setAttribute("class", "bb-title-bar-caption bb-title-bar-caption-" + orientation);
        caption.innerHTML = titleBar.getAttribute("data-bb-caption");
        topTitleArea.appendChild(caption);
        if (titleBar.hasAttribute("data-bb-back-caption")) {
            button = document.createElement("div");
            button.innerHTML = titleBar.getAttribute("data-bb-back-caption");
            topTitleArea.appendChild(button);
            titleBar.backButton = button;
            button.onclick = bb.popScreen;
            bb.titleBar.styleBB10Button(button);
            button.style.left = "0px"
        }
        if (titleBar.hasAttribute("data-bb-action-caption")) {
            button = document.createElement("div");
            button.innerHTML = titleBar.getAttribute("data-bb-action-caption");
            if (titleBar.hasAttribute("onactionclick")) {
                button.titleBar = titleBar;
                button.onactionclick = titleBar.getAttribute("onactionclick");
                titleBar.onactionclick = function() {
                    eval(this.actionButton.onactionclick)
                };
                button.onclick = function() {
                    if (this.titleBar.onactionclick) {
                        this.titleBar.onactionclick()
                    }
                }
            } else if (titleBar.onactionclick) {
                button.onclick = titleBar.onactionclick
            }
            bb.titleBar.styleBB10Button(button);
            button.style.right = "0px";
            topTitleArea.appendChild(button);
            titleBar.actionButton = button
        }
        if (titleBar.actionButton || titleBar.backButton) {
            titleBar.evenButtonWidths = function() {
                var e = this.backButton ? parseInt(window.getComputedStyle(this.backButton).width) : 0, t = this.actionButton ? parseInt(window.getComputedStyle(this.actionButton).width) : 0, n;
                if (this.actionButton && this.backButton) {
                    n = e > t ? e : t;
                    this.backButton.style.width = n + "px";
                    this.actionButton.style.width = n + "px";
                    this.caption.style["margin-left"] = n + 24 + "px";
                    this.caption.style["margin-right"] = n + 24 + "px"
                } else if (this.actionButton) {
                    this.caption.style["margin-left"] = "0px";
                    this.caption.style["margin-left"] = t + 24 + "px";
                    this.caption.style["margin-right"] = t + 24 + "px"
                } else if (this.backButton) {
                    this.caption.style["margin-right"] = "0px";
                    this.caption.style["margin-left"] = e + 24 + "px";
                    this.caption.style["margin-right"] = e + 24 + "px"
                }
            };
            titleBar.evenButtonWidths = titleBar.evenButtonWidths.bind(titleBar);
            window.setTimeout(titleBar.evenButtonWidths, 0)
        }
        if (!titleBar.actionButton && !titleBar.backButton && (titleBar.hasAttribute("data-bb-img") || titleBar.hasAttribute("data-bb-accent-text"))) {
            caption.setAttribute("class", "bb-title-bar-caption-left");
            details = document.createElement("div");
            titleBar.details = details;
            topTitleArea.appendChild(details);
            details.appendChild(caption);
            if (titleBar.hasAttribute("data-bb-img")) {
                img = document.createElement("img");
                titleBar.img = img;
                topTitleArea.insertBefore(img, details);
                details.setAttribute("class", "bb-title-bar-caption-details-img");
                img.style.opacity = "0";
                img.style["-webkit-transition"] = "opacity 0.5s linear";
                img.style["-webkit-backface-visibility"] = "hidden";
                img.style["-webkit-perspective"] = 1e3;
                img.style["-webkit-transform"] = "translate3d(0,0,0)";
                titleBar.onbbuidomready = function() {
                    this.img.onload = function() {
                        this.style.opacity = "1.0"
                    };
                    this.img.src = this.getAttribute("data-bb-img");
                    document.removeEventListener("bbuidomready", this.onbbuidomready, false)
                };
                titleBar.onbbuidomready = titleBar.onbbuidomready.bind(titleBar);
                document.addEventListener("bbuidomready", titleBar.onbbuidomready, false)
            }
            if (titleBar.hasAttribute("data-bb-accent-text")) {
                if (bb.device.is1024x600) {
                    caption.style["line-height"] = "40px"
                } else if (bb.device.is1280x768 || bb.device.is1280x720) {
                    caption.style["line-height"] = "70px"
                } else if (bb.device.is720x720) {
                    caption.style["line-height"] = "55px"
                } else {
                    caption.style["line-height"] = "70px"
                }
                accentText = document.createElement("div");
                accentText.setAttribute("class", "bb-title-bar-accent-text");
                if (bb.options.coloredTitleBar) {
                    accentText.style.color = "silver"
                }
                titleBar.accentText = accentText;
                accentText.innerHTML = titleBar.getAttribute("data-bb-accent-text");
                details.appendChild(accentText)
            }
        }
        titleBar.setCaption = function(e) {
            this.caption.innerHTML = e
        };
        titleBar.setCaption = titleBar.setCaption.bind(titleBar);
        titleBar.getCaption = function() {
            return this.caption.innerHTML
        };
        titleBar.getCaption = titleBar.getCaption.bind(titleBar);
        titleBar.setBackCaption = function(e) {
            this.backButton.firstChild.innerHTML = e;
            if (this.actionButton) {
                this.backButton.style.width = "";
                this.evenButtonWidths()
            }
        };
        titleBar.setBackCaption = titleBar.setBackCaption.bind(titleBar);
        titleBar.getBackCaption = function() {
            return this.backButton.firstChild.innerHTML
        };
        titleBar.getBackCaption = titleBar.getBackCaption.bind(titleBar);
        titleBar.setActionCaption = function(e) {
            this.actionButton.firstChild.innerHTML = e;
            if (this.backButton) {
                this.actionButton.style.width = "";
                this.evenButtonWidths()
            }
        };
        titleBar.setActionCaption = titleBar.setActionCaption.bind(titleBar);
        titleBar.getActionCaption = function() {
            return this.actionButton.firstChild.innerHTML
        };
        titleBar.getActionCaption = titleBar.getActionCaption.bind(titleBar);
        titleBar.getAccentText = function() {
            return this.accentText.innerHTML
        };
        titleBar.getAccentText = titleBar.getAccentText.bind(titleBar);
        titleBar.setAccentText = function(e) {
            this.accentText.innerHTML = e
        };
        titleBar.setAccentText = titleBar.setAccentText.bind(titleBar);
        titleBar.setImage = function(e) {
            this.img.src = e
        };
        titleBar.setImage = titleBar.setImage.bind(titleBar)
    }, styleBB10Button: function(e) {
        var t = document.createElement("div"), n, r, i;
        if (bb.options.coloredTitleBar) {
            n = "bb-titlebar-button bb10-title-button-colored";
            r = "bb-titlebar-button bb10-title-button-colored-highlight";
            i = "bb-titlebar-button-container bb10-title-button-container-colored"
        } else {
            n = "bb-titlebar-button bb-titlebar-button-" + bb.screen.controlColor;
            r = "bb-titlebar-button bb-titlebar-button-highlight-" + bb.screen.controlColor;
            i = "bb-titlebar-button-container bb-titlebar-button-container-" + bb.screen.controlColor
        }
        if (bb.device.is10dot2) {
            i += " bb-titlebar-button-container-10dot2"
        }
        e.enabled = true;
        t.innerHTML = e.innerHTML;
        e.innerHTML = "";
        e.appendChild(t);
        t.setAttribute("class", n);
        e.setAttribute("class", i);
        e.outerNormal = i;
        e.innerElement = t;
        t.normal = n;
        t.highlight = r;
        e.ontouchstart = function() {
            this.innerElement.setAttribute("class", this.innerElement.highlight)
        };
        e.ontouchend = function() {
            this.innerElement.setAttribute("class", this.innerElement.normal)
        };
        e.trappedClick = e.onclick;
        e.onclick = undefined;
        if (e.trappedClick !== null) {
            e.addEventListener("click", function(e) {
                if (this.enabled) {
                    this.trappedClick()
                }
            }, false)
        }
    }};
_bb10_activityIndicator = {apply: function(e) {
        var t, n, r, i, s = bb.screen.controlColor, o, u, a;
        if (!bb.device.newerThan10dot1) {
            if (e.length > 0) {
                var f = document.createElement("canvas"), l, c;
                f.setAttribute("height", "184px");
                f.setAttribute("width", "184px");
                l = f.getContext("2d");
                l.beginPath();
                l.moveTo(92, 154);
                l.arcTo(154, 154, 154, 92, 62);
                l.arcTo(154, 30, 92, 30, 62);
                l.arcTo(81, 30, 81, 20, 10);
                l.arcTo(81, 10, 91, 10, 10);
                l.arcTo(173, 10, 173, 92, 82);
                l.arcTo(173, 173, 92, 173, 82);
                l.arcTo(81, 173, 81, 164, 10);
                l.arcTo(81, 154, 92, 154, 10);
                l.closePath();
                l.strokeStyle = "transparent";
                l.stroke();
                var c = l.createLinearGradient(0, 50, 0, 154);
                c.addColorStop(0, "transparent");
                c.addColorStop(1, bb.options.highlightColor);
                l.fillStyle = c;
                l.fill();
                a = f.toDataURL()
            }
        }
        for (t = 0; t < e.length; t++) {
            n = e[t];
            o = n.hasAttribute("data-bb-size") ? n.getAttribute("data-bb-size").toLowerCase() : "medium";
            if (o == "large") {
                if (bb.device.is1024x600) {
                    u = "93px"
                } else if (bb.device.is1280x768) {
                    u = "184px"
                } else if (bb.device.is1280x720) {
                    u = "135px"
                } else if (bb.device.is720x720) {
                    u = "170px"
                } else {
                    u = "184px"
                }
            } else if (o == "small") {
                if (bb.device.is1024x600) {
                    u = "21px"
                } else if (bb.device.is1280x768) {
                    u = "41px"
                } else if (bb.device.is1280x720) {
                    u = "35px"
                } else {
                    u = "41px"
                }
            } else {
                o = "medium";
                if (bb.device.is1024x600) {
                    u = "46px"
                } else if (bb.device.is1280x768) {
                    u = "93px"
                } else if (bb.device.is1280x720) {
                    u = "69px"
                } else if (bb.device.is720x720) {
                    u = "88px"
                } else {
                    u = "93px"
                }
            }
            n.style.width = u;
            i = document.createElement("div");
            if (bb.device.newerThan10dot1) {
                i.setAttribute("class", "bb-activity-margin bb-activity-" + o);
                n.appendChild(i);
                r = document.createElement("div");
                r.setAttribute("class", "bb-activity-" + o + " bb-activity-" + s + "-10dot2");
                i.appendChild(r)
            } else {
                i.setAttribute("class", "bb-activity-margin bb-activity-" + o + " bb-activity-" + s);
                n.appendChild(i);
                r = document.createElement("div");
                r.setAttribute("class", "bb-activity-" + o);
                r.style["background-image"] = 'url("' + a + '")';
                i.appendChild(r)
            }
            r.style["-webkit-animation-name"] = "activity-rotate";
            r.style["-webkit-animation-duration"] = "0.8s";
            r.style["-webkit-animation-iteration-count"] = "infinite";
            r.style["-webkit-animation-timing-function"] = "linear";
            n.show = function() {
                this.style.display = "";
                bb.refresh()
            };
            n.show = n.show.bind(n);
            n.hide = function() {
                this.style.display = "none";
                bb.refresh()
            };
            n.hide = n.hide.bind(n);
            n.remove = function() {
                this.parentNode.removeChild(this);
                bb.refresh()
            };
            n.remove = n.remove.bind(n)
        }
    }};
_bb10_button = {apply: function(e) {
        for (var t = 0; t < e.length; t++) {
            bb.button.style(e[t])
        }
    }, style: function(e) {
        var t, n, r, i, s, o, u = document.createElement("div"), a = document.createElement("div");
        disabled = e.hasAttribute("data-bb-disabled"), normal = "bb-button", outerNormal = "bb-button-container bb-button-container-" + bb.screen.controlColor;
        if (bb.device.newerThan10dot1) {
            normal += " bb-button-10dot2";
            outerNormal += " bb-button-container-10dot2";
            o = "bb-button bb-button-10dot2 bb-button-" + bb.screen.controlColor + " bb-button-" + bb.screen.controlColor + "-highlight-10dot2"
        } else {
            o = "bb-button bb10-button-highlight"
        }
        s = outerNormal;
        e.isImageOnly = false;
        e.enabled = !disabled;
        r = e.innerHTML;
        u.innerHTML = r;
        e.innerHTML = "";
        e.stretched = false;
        e.captionElement = u;
        e.appendChild(a);
        e.innerElement = a;
        if (e.hasAttribute("data-bb-style")) {
            var f = e.getAttribute("data-bb-style");
            if (f == "stretch") {
                outerNormal = outerNormal + " bb-button-stretch";
                e.stretched = true
            }
        }
        n = e.hasAttribute("data-bb-img") ? e.getAttribute("data-bb-img") : undefined;
        if (n) {
            if (!r || r.length == 0) {
                if (bb.device.newerThan10dot1) {
                    outerNormal = outerNormal + " bb-button-container-image-only bb-button-caption-with-image-only_10dot2";
                    u.setAttribute("class", "bb-button-caption-with-image-only bb-button-caption-with-image-only_10dot2")
                } else {
                    outerNormal = outerNormal + " bb-button-container-image-only";
                    u.setAttribute("class", "bb-button-caption-with-image-only")
                }
                u.style["background-image"] = 'url("' + n + '")';
                e.style["line-height"] = "0px";
                e.isImageOnly = true
            } else {
                u.setAttribute("class", "bb-button-caption-with-image");
                i = document.createElement("div");
                e.imgElement = i;
                if (bb.device.newerThan10dot1) {
                    i.setAttribute("class", "bb-button-image bb-button-image-10dot2")
                } else {
                    i.setAttribute("class", "bb-button-image")
                }
                i.style["background-image"] = 'url("' + n + '")';
                a.appendChild(i)
            }
        }
        a.appendChild(u);
        t = normal + " bb-button-disabled-" + bb.screen.controlColor;
        normal = normal + " bb-button-" + bb.screen.controlColor;
        if (disabled) {
            e.removeAttribute("data-bb-disabled");
            a.setAttribute("class", t)
        } else {
            a.setAttribute("class", normal)
        }
        e.setAttribute("class", outerNormal);
        e.outerNormal = outerNormal;
        e.outerNormalWithoutImageOnly = s;
        e.innerElement = a;
        a.normal = normal;
        a.highlight = o;
        a.disabledStyle = t;
        if (!disabled) {
            e.ontouchstart = function() {
                this.innerElement.setAttribute("class", this.innerElement.highlight)
            };
            e.ontouchend = function() {
                this.innerElement.setAttribute("class", this.innerElement.normal)
            }
        }
        e.trappedClick = e.onclick;
        e.onclick = undefined;
        if (e.trappedClick !== null) {
            e.addEventListener("click", function(e) {
                if (this.enabled) {
                    this.trappedClick()
                }
            }, false)
        }
        e.setCaption = function(e) {
            if (this.isImageOnly && e.length > 0) {
                this.captionElement.setAttribute("class", "bb-button-caption-with-image");
                var t = document.createElement("div");
                this.imgElement = t;
                t.setAttribute("class", "bb-button-image");
                t.style["background-image"] = this.captionElement.style["background-image"];
                this.innerElement.removeChild(this.captionElement);
                this.innerElement.appendChild(t);
                this.innerElement.appendChild(this.captionElement);
                this.setAttribute("class", this.outerNormalWithoutImageOnly);
                this.captionElement.style["background-image"] = "";
                this.isImageOnly = false
            } else if (e.length == 0 && this.imgElement) {
                this.captionElement.setAttribute("class", "bb-button-caption-with-image-only");
                this.setAttribute("class", this.outerNormalWithoutImageOnly + " bb-button-container-image-only");
                this.captionElement.style["background-image"] = this.imgElement.style["background-image"];
                this.isImageOnly = true;
                this.innerElement.removeChild(this.imgElement);
                this.imgElement = null
            }
            this.captionElement.innerHTML = e
        };
        e.getCaption = function() {
            return this.captionElement.innerHTML
        };
        e.getCaption = e.getCaption.bind(e);
        e.setImage = function(e) {
            if (this.isImageOnly) {
                this.captionElement.style["background-image"] = 'url("' + e + '")'
            } else if (this.imgElement && e.length > 0) {
                this.imgElement.style["background-image"] = 'url("' + e + '")'
            } else if (e.length > 0) {
                this.captionElement.setAttribute("class", "bb-button-caption-with-image");
                var t = document.createElement("div");
                this.imgElement = t;
                t.setAttribute("class", "bb-button-image");
                t.style["background-image"] = 'url("' + e + '")';
                this.innerElement.removeChild(this.captionElement);
                this.innerElement.appendChild(t);
                this.innerElement.appendChild(this.captionElement)
            } else if (this.imgElement && e.length == 0) {
                this.innerElement.removeChild(this.imgElement);
                this.imgElement = null;
                this.captionElement.setAttribute("class", "")
            }
        };
        e.getImage = function() {
            if (this.isImageOnly) {
                return this.captionElement.style["background-image"].slice(4, -1)
            } else if (this.imgElement) {
                return this.imgElement.style["background-image"].slice(4, -1)
            } else {
                return""
            }
        };
        e.getImage = e.getImage.bind(e);
        e.enable = function() {
            if (this.enabled)
                return;
            this.innerElement.setAttribute("class", this.innerElement.normal);
            this.ontouchstart = function() {
                this.innerElement.setAttribute("class", this.innerElement.highlight)
            };
            this.ontouchend = function() {
                this.innerElement.setAttribute("class", this.innerElement.normal)
            };
            this.enabled = true
        };
        e.enable = e.enable.bind(e);
        e.disable = function() {
            if (!this.enabled)
                return;
            this.innerElement.setAttribute("class", this.innerElement.disabledStyle);
            this.ontouchstart = null;
            this.ontouchend = null;
            this.enabled = false
        };
        e.disable = e.disable.bind(e);
        e.show = function() {
            this.style.display = this.stretched ? "block" : "inline-block";
            bb.refresh()
        };
        e.show = e.show.bind(e);
        e.hide = function() {
            this.style.display = "none";
            bb.refresh()
        };
        e.hide = e.hide.bind(e);
        e.remove = function() {
            this.parentNode.removeChild(this);
            bb.refresh()
        };
        e.remove = e.remove.bind(e);
        return e
    }};
_bb10_checkbox = {apply: function(e) {
        for (var t = 0; t < e.length; t++) {
            bb.checkbox.style(e[t])
        }
    }, style: function(e) {
        var t, n, r, i, s = bb.screen.controlColor;
        t = document.createElement("div");
        t.setAttribute("class", "bb-checkbox-target");
        if (e.parentNode) {
            e.parentNode.insertBefore(t, e)
        }
        e.style.display = "none";
        t.appendChild(e);
        t.input = e;
        e.touchTarget = t;
        n = document.createElement("div");
        n.setAttribute("class", "bb-checkbox-outer bb-checkbox-outer-" + s);
        t.appendChild(n);
        r = document.createElement("div");
        r.normal = "bb-checkbox-inner bb-checkbox-inner-" + s;
        r.setAttribute("class", r.normal);
        n.appendChild(r);
        i = document.createElement("div");
        i.hiddenClass = "bb-checkbox-check-hidden bb-checkbox-check-image";
        i.displayClass = "bb-checkbox-check-display bb-checkbox-check-image";
        i.setAttribute("class", i.hiddenClass);
        i.style["-webkit-transition-property"] = "all";
        i.style["-webkit-transition-duration"] = "0.1s";
        r.appendChild(i);
        t.checkElement = i;
        t.innerElement = r;
        t.highlight = "-webkit-linear-gradient(top,  rgb(" + (bb.options.shades.R + 32) + ", " + (bb.options.shades.G + 32) + ", " + (bb.options.shades.B + 32) + ") 0%, rgb(" + bb.options.shades.R + ", " + bb.options.shades.G + ", " + bb.options.shades.B + ") 100%)";
        t.touchHighlight = "-webkit-linear-gradient(top,  rgba(" + (bb.options.shades.R - 64) + ", " + (bb.options.shades.G - 64) + ", " + (bb.options.shades.B - 64) + ",0.25) 0%, rgba(" + bb.options.shades.R + ", " + bb.options.shades.G + ", " + bb.options.shades.B + ",0.25) 100%)";
        t.ontouchstart = function() {
            if (!this.input.checked && !this.input.disabled) {
                this.innerElement.style.background = this.touchHighlight
            }
        };
        t.ontouchend = function() {
            if (!this.input.checked && !this.input.disabled) {
                this.innerElement.style.background = ""
            }
        };
        t.onclick = function() {
            if (!this.input.disabled) {
                var e = document.createEvent("HTMLEvents");
                e.initEvent("change", false, true);
                this.input.checked = !this.input.checked;
                this.drawChecked();
                this.input.dispatchEvent(e)
            }
        };
        t.drawChecked = function() {
            if (this.input.checked) {
                this.checkElement.setAttribute("class", this.checkElement.displayClass);
                this.innerElement.style["background-image"] = t.highlight
            } else {
                this.checkElement.setAttribute("class", this.checkElement.hiddenClass);
                this.innerElement.style["background-image"] = ""
            }
            if (this.input.disabled) {
                this.innerElement.parentNode.setAttribute("class", "bb-checkbox-outer bb-checkbox-outer-disabled-" + s);
                this.innerElement.setAttribute("class", "bb-checkbox-inner bb-checkbox-inner-disabled-" + s);
                this.innerElement.style.background = "#c0c0c0"
            } else {
                this.innerElement.parentNode.setAttribute("class", "bb-checkbox-outer bb-checkbox-outer-" + s);
                this.innerElement.setAttribute("class", "bb-checkbox-inner bb-checkbox-inner-" + s)
            }
        };
        t.drawChecked = t.drawChecked.bind(t);
        e.setChecked = function(e) {
            if (e == this.checked)
                return;
            this.checked = e;
            this.touchTarget.drawChecked()
        };
        e.setChecked = e.setChecked.bind(e);
        e.getChecked = function() {
            return this.checked
        };
        e.getChecked = e.getChecked.bind(e);
        e.enable = function() {
            this.removeAttribute("disabled");
            this.enabled = true;
            this.touchTarget.drawChecked()
        };
        e.enable = e.enable.bind(e);
        e.disable = function() {
            this.enabled = false;
            this.setAttribute("disabled", "disabled");
            this.touchTarget.drawChecked()
        };
        e.disable = e.disable.bind(e);
        e.show = function() {
            this.touchTarget.style.display = "block";
            bb.refresh()
        };
        e.show = e.show.bind(e);
        e.hide = function() {
            this.touchTarget.style.display = "none";
            bb.refresh()
        };
        e.hide = e.hide.bind(e);
        e.remove = function() {
            this.touchTarget.parentNode.removeChild(this.touchTarget);
            bb.refresh()
        };
        e.remove = e.remove.bind(e);
        t.drawChecked();
        return t
    }};
_bb10_contextMenu = {actionIds: [], create: function(e) {
        var t = document.createElement("div");
        t.style.display = "none";
        t.actions = [];
        t.oncontextmenu = function(e) {
            this.centerMenuItems();
            var t = e.srcElement, n = false, r = "", i;
            while (t) {
                if (t.hasAttribute) {
                    r = t.hasAttribute("data-bb-type") ? t.getAttribute("data-bb-type").toLowerCase() : undefined;
                    if (r == "item") {
                        n = t.hasAttribute("data-webworks-context");
                        break
                    }
                }
                t = t.parentNode
            }
            if (n) {
                t.drawSelected();
                i = t.getAttribute("data-webworks-context");
                i = JSON.parse(i);
                this.selected = {title: i.header, description: i.subheader, selected: t}
            } else {
                e.preventDefault()
            }
            blackberry.event.removeEventListener("swipedown", bb.menuBar.showMenuBar)
        };
        t.oncontextmenu = t.oncontextmenu.bind(t);
        window.addEventListener("contextmenu", t.oncontextmenu);
        bb.windowListeners.push({name: "contextmenu", eventHandler: t.oncontextmenu});
        t.oncontextmenuclosed = function(e) {
            if (this.selected && this.selected.selected) {
                this.selected.selected.drawUnselected()
            }
            blackberry.event.addEventListener("swipedown", bb.menuBar.showMenuBar)
        };
        t.oncontextmenuclosed = t.oncontextmenuclosed.bind(t);
        document.addEventListener("bbui.contextClosed", t.oncontextmenuclosed);
        bb.documentListeners.push({name: "bbui.contextClosed", eventHandler: t.oncontextmenuclosed});
        t.add = function(e) {
            this.actions.push(e);
            this.appendChild(e);
            var t = {actionId: bb.guidGenerator(), label: e.innerHTML, icon: e.getAttribute("data-bb-img")};
            bb.contextMenu.actionIds.push(t.actionId);
            e.pinned = false;
            e.menuItem = t;
            e.menu = this;
            e.visible = e.hasAttribute("data-bb-visible") ? e.getAttribute("data-bb-visible").toLowerCase() != "false" : true;
            if (e.hasAttribute("data-bb-pin") && e.getAttribute("data-bb-pin").toLowerCase() == "true") {
                e.pinned = true
            }
            e.doclick = function(t) {
                var n = document.querySelectorAll("[data-bb-context-menu-id=" + t + "]"), r;
                if (n.length > 0) {
                    n = n[0];
                    r = n.getAttribute("data-webworks-context");
                    r = JSON.parse(r);
                    this.menu.selected = {title: r.header, description: r.subheader, selected: n};
                    var i = document.createEvent("MouseEvents");
                    i.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    e.dispatchEvent(i)
                }
            };
            e.doclick = e.doclick.bind(e);
            e.show = function() {
                if (this.visible)
                    return;
                this.visible = true;
                this.removeAttribute("data-bb-visible")
            };
            e.show = e.show.bind(e);
            e.hide = function() {
                if (!this.visible)
                    return;
                this.visible = false;
                this.setAttribute("data-bb-visible", "false")
            };
            e.hide = e.hide.bind(e)
        };
        t.add = t.add.bind(t);
        t.centerMenuItems = function() {
            var e = [blackberry.ui.contextmenu.CONTEXT_ALL], t, n = false, r, i = {includeContextItems: [blackberry.ui.contextmenu.CONTEXT_ALL], includePlatformItems: false, includeMenuServiceItems: false};
            for (t = 0; t < this.actions.length; t++) {
                r = this.actions[t];
                if (r.visible && r.pinned) {
                    i.pinnedItemId = r.menuItem.actionId
                }
            }
            this.clearWWcontextMenu();
            blackberry.ui.contextmenu.defineCustomContext("bbui-context", i);
            for (t = this.actions.length - 1; t >= 0; t--) {
                r = this.actions[t];
                if (r.visible) {
                    blackberry.ui.contextmenu.addItem(e, r.menuItem, r.doclick)
                }
            }
        };
        t.centerMenuItems = t.centerMenuItems.bind(t);
        t.clearWWcontextMenu = function() {
            var e = [blackberry.ui.contextmenu.CONTEXT_ALL], t, n;
            for (t = 0; t < bb.contextMenu.actionIds.length; t++) {
                blackberry.ui.contextmenu.removeItem(e, bb.contextMenu.actionIds[t])
            }
        };
        t.centerMenuItems = t.centerMenuItems.bind(t);
        t.show = function() {
        };
        t.show = t.show.bind(t);
        t.peek = function() {
        };
        t.peek = t.peek.bind(t);
        return t
    }};
_bb10_dropdown = {apply: function(e) {
        for (i = 0; i < e.length; i++) {
            bb.dropdown.style(e[i])
        }
    }, style: function(e) {
        var t, n, r, i, s, o, u, a, f, l, c, h = !e.hasAttribute("disabled"), p = "bb-dropdown bb-dropdown-" + bb.screen.controlColor, d = "bb-dropdown bb-dropdown-highlight-" + bb.screen.controlColor, v = "bb-dropdown-container bb-dropdown-container-" + bb.screen.controlColor, m = "bb-dropdown-container-inner bb-dropdown-container-inner-" + bb.screen.controlColor, g = "bb-dropdown-inner bb-dropdown-inner-" + bb.screen.controlColor;
        if (bb.device.newerThan10dot1) {
            v += " bb-dropdown-container-10dot2";
            m += " bb-dropdown-container-inner-10dot2";
            g += " bb-dropdown-inner-10dot2";
            c = d + " bb10Highlight";
            d += " bb-dropdown-" + bb.screen.controlColor + "-highlight-10dot2"
        } else {
            d += " bb10Highlight"
        }
        e.style.display = "none";
        e.enabled = h;
        u = document.createElement("div");
        u.select = e;
        u.items = [];
        u.setAttribute("data-bb-type", "dropdown");
        e.dropdown = u;
        if (e.parentNode) {
            e.parentNode.insertBefore(u, e)
        }
        u.appendChild(e);
        s = document.createElement("div");
        s.setAttribute("class", m);
        u.appendChild(s);
        if (e.hasAttribute("data-bb-style")) {
            var y = e.getAttribute("data-bb-style");
            if (y == "stretch") {
                p = p + " bb-dropdown-stretch";
                d = d + " bb-dropdown-stretch"
            }
        }
        o = document.createElement("div");
        if (e.enabled) {
            o.setAttribute("class", p)
        } else {
            o.setAttribute("class", p + " bb-dropdown-disabled-" + bb.screen.controlColor)
        }
        s.appendChild(o);
        i = document.createElement("div");
        i.setAttribute("class", g);
        o.appendChild(i);
        a = document.createElement("div");
        u.labelElement = a;
        a.setAttribute("class", "bb-dropdown-label");
        if (e.hasAttribute("data-bb-label")) {
            a.innerHTML = e.getAttribute("data-bb-label")
        }
        i.appendChild(a);
        t = document.createElement("div");
        if (bb.device.newerThan10dot1) {
            t.normal = "bb-dropdown-arrow-" + bb.screen.controlColor + " bb-dropdown-arrow-10dot2";
            t.highlight = "bb-dropdown-arrow-dark bb-dropdown-arrow-10dot2"
        } else {
            t.normal = "bb-dropdown-arrow-" + bb.screen.controlColor
        }
        t.setAttribute("class", t.normal);
        i.appendChild(t);
        u.img = t;
        f = document.createElement("div");
        u.captionElement = f;
        if (bb.device.newerThan10dot1) {
            f.setAttribute("class", "bb-dropdown-caption bb-dropdown-caption-10dot2")
        } else {
            f.setAttribute("class", "bb-dropdown-caption")
        }
        i.appendChild(f);
        var b = document.createElement("div");
        b.style.position = "relative";
        b.style["margin-top"] = "10px";
        b.style.overflow = "hidden";
        s.appendChild(b);
        var w = document.createElement("div");
        b.appendChild(w);
        l = document.createElement("div");
        u.itemsElement = l;
        l.setAttribute("class", "bb-dropdown-items");
        w.appendChild(l);
        u.refreshOptions = function() {
            var n = e.getElementsByTagName("option"), i = "", s, o, u, a, l, c;
            this.itemsElement.innerHTML = "";
            this.items = [];
            this.options = n;
            for (r = 0; r < n.length; r++) {
                s = n[r];
                o = document.createElement("div");
                this.items.push(o);
                o.selectedStyle = "bb-dropdown-item bb-dropdown-item-" + bb.screen.controlColor + " bb-dropdown-item-selected-" + bb.screen.controlColor;
                o.normalStyle = "bb-dropdown-item bb-dropdown-item-" + bb.screen.controlColor;
                o.index = r;
                o.select = this.select;
                o.dropdown = this;
                if (!o.dropdown.selected) {
                    o.dropdown.selected = o
                }
                l = document.createElement("div");
                l.setAttribute("class", "primary-text");
                l.innerHTML = s.innerHTML;
                u = document.createElement("div");
                u.setAttribute("class", "text-container");
                u.appendChild(l);
                a = document.createElement("span");
                a.setAttribute("class", "text-align");
                o.appendChild(a);
                o.appendChild(u);
                this.itemsElement.appendChild(o);
                if (s.hasAttribute("data-bb-accent-text")) {
                    c = document.createElement("div");
                    c.setAttribute("class", "accent-text");
                    c.innerHTML = s.getAttribute("data-bb-accent-text");
                    o.accentText = c;
                    u.appendChild(c)
                }
                t = document.createElement("div");
                t.setAttribute("class", "bb-dropdown-selected-image-" + bb.screen.controlColor);
                o.img = t;
                o.appendChild(t);
                if (s.hasAttribute("selected") || s.selected) {
                    i = s.innerHTML;
                    o.setAttribute("class", o.selectedStyle);
                    t.style.visibility = "visible";
                    o.dropdown.selected = o
                } else {
                    o.setAttribute("class", o.normalStyle)
                }
                o.ontouchstart = function(e) {
                    this.style["background-color"] = bb.options.highlightColor;
                    this.style["color"] = "white";
                    if (this.accentText) {
                        this.accentText.style["color"] = "white"
                    }
                };
                o.ontouchend = function(e) {
                    this.style["background-color"] = "transparent";
                    this.style["color"] = "";
                    if (this.accentText) {
                        this.accentText.style["color"] = ""
                    }
                };
                o.onclick = function() {
                    this.select.setSelectedItem(this.index)
                }
            }
            if (i == "" && n.length > 0) {
                i = n[0].innerHTML
            }
            if (i != "") {
                f.innerHTML = i
            }
        };
        u.refreshOptions = u.refreshOptions.bind(u);
        u.refreshOptions();
        u.setAttribute("class", v);
        u.buttonOuter = o;
        u.isRefreshed = false;
        u.caption = f;
        o.dropdown = u;
        u.open = false;
        o.normal = p;
        o.highlight = d;
        o.focusedHighlight = c;
        u.scroller = new iScroll(b, {vScrollbar: false, onBeforeScrollStart: function(e) {
                if (bb.scroller) {
                    bb.scroller.disable()
                }
                e.preventDefault()
            }, onBeforeScrollEnd: function(e) {
                if (bb.scroller) {
                    bb.scroller.enable()
                }
            }});
        bb.dropdownScrollers.push(u.scroller);
        u.scrollArea = b;
        o.dotouchstart = function(e) {
            this.setAttribute("class", this.highlight)
        };
        o.dotouchend = function(e) {
            this.setAttribute("class", this.normal)
        };
        o.doclick = function(e) {
            if (!this.dropdown.open) {
                this.dropdown.internalShow()
            } else {
                this.dropdown.internalHide()
            }
        };
        if (e.enabled) {
            o.ontouchstart = o.dotouchstart;
            o.ontouchend = o.dotouchend;
            o.onclick = o.doclick
        }
        u.internalShow = function() {
            var e;
            this.open = true;
            if (bb.device.is720x720 && this.options.length > 4) {
                this.numItems = 3
            } else if (this.options.length > 5) {
                this.numItems = 5
            } else {
                this.numItems = this.options.length
            }
            if (bb.device.is1024x600) {
                e = this.numItems * 43;
                this.style.height = 45 + e + "px"
            } else if (bb.device.is1280x768 || bb.device.is1280x720) {
                e = this.numItems * 99;
                this.style.height = 95 + e + "px"
            } else if (bb.device.is720x720) {
                e = this.numItems * 85;
                this.style.height = 77 + e + "px"
            } else {
                e = this.numItems * 99;
                this.style.height = 95 + e + "px"
            }
            this.scrollArea.style.height = e - 10 + "px";
            if (!this.isRefreshed) {
                this.scroller.refresh();
                this.isRefreshed = true
            }
            this.scroller.scrollToElement(this.selected, 0);
            this.caption.style.opacity = "0.0";
            this.caption.style["-webkit-transition"] = "opacity 0.5s linear";
            this.caption.style["-webkit-backface-visibility"] = "hidden";
            this.caption.style["-webkit-perspective"] = 1e3;
            this.caption.style["-webkit-transform"] = "translate3d(0,0,0)";
            this.img.style.opacity = "1.0";
            if (bb.device.newerThan10dot1) {
                this.img.setAttribute("class", this.img.highlight);
                this.img.style["-webkit-transition"] = "all 0.2s linear";
                this.img.style["-webkit-transform"] = "rotate(-360deg)";
                this.buttonOuter.setAttribute("class", this.buttonOuter.focusedHighlight);
                this.buttonOuter.style.color = "white"
            } else {
                this.img.style["-webkit-transform"] = "rotate(-360deg)";
                this.img.style["-webkit-transition"] = "all 0.5s ease-in-out"
            }
            if (bb.scroller) {
                bb.scroller.refresh()
            }
            this.scrollIntoView(false)
        };
        u.internalShow = u.internalShow.bind(u);
        u.internalHide = function() {
            this.open = false;
            this.style.height = "59px";
            if (bb.device.is1024x600) {
                this.style.height = "43px"
            } else if (bb.device.is1280x768) {
                this.style.height = bb.device.newerThan10dot1 ? "88px" : "95px"
            } else if (bb.device.is720x720) {
                this.style.height = bb.device.newerThan10dot1 ? "70px" : "77px"
            } else if (bb.device.is1280x720 && bb.device.newerThan10dot1 && window.devicePixelRatio < 1.9) {
                this.style.height = "76px"
            } else {
                this.style.height = "95px"
            }
            this.caption.style.opacity = "1.0";
            this.caption.style["-webkit-transition"] = "opacity 0.5s linear";
            this.caption.style["-webkit-backface-visibility"] = "hidden";
            this.caption.style["-webkit-perspective"] = 1e3;
            if (bb.device.newerThan10dot1) {
                this.img.setAttribute("class", this.img.normal);
                this.img.style["-webkit-transform"] = "rotate(-180deg)";
                this.img.style["-webkit-transition"] = "all 0.2s linear";
                this.buttonOuter.setAttribute("class", this.buttonOuter.normal);
                this.buttonOuter.style.color = ""
            } else {
                this.img.style.opacity = "0.0";
                this.img.style["-webkit-transform"] = "rotate(0deg)";
                this.img.style["-webkit-transition"] = "all 0.5s ease-in-out"
            }
            if (bb.scroller) {
                bb.scroller.refresh()
            }
        };
        u.internalHide = u.internalHide.bind(u);
        e.setSelectedItem = function(e) {
            if (this.selectedIndex != e) {
                var t = this.dropdown.items[e];
                if (!t)
                    return;
                if (this.dropdown.selected) {
                    this.dropdown.selected.setAttribute("class", t.normalStyle);
                    this.dropdown.selected.img.style.visibility = "hidden"
                }
                t.setAttribute("class", t.selectedStyle);
                t.img.style.visibility = "visible";
                this.dropdown.selected = t;
                this.selectedIndex = e;
                this.dropdown.caption.innerHTML = this.options[e].text;
                this.dropdown.internalHide();
                window.setTimeout(this.fireEvent, 0)
            }
        };
        e.setSelectedItem = e.setSelectedItem.bind(e);
        e.setSelectedText = function(e) {
            for (var t = 0; t < this.options.length; t++) {
                if (this.options[t].text == e) {
                    this.setSelectedItem(t);
                    return
                }
            }
        };
        e.setSelectedText = e.setSelectedText.bind(e);
        e.fireEvent = function() {
            var e = document.createEvent("HTMLEvents");
            e.initEvent("change", false, true);
            this.dispatchEvent(e)
        };
        e.fireEvent = e.fireEvent.bind(e);
        e.enable = function() {
            if (this.enabled)
                return;
            this.dropdown.buttonOuter.ontouchstart = this.dropdown.buttonOuter.dotouchstart;
            this.dropdown.buttonOuter.ontouchend = this.dropdown.buttonOuter.dotouchend;
            this.dropdown.buttonOuter.onclick = this.dropdown.buttonOuter.doclick;
            this.dropdown.buttonOuter.setAttribute("class", p);
            this.removeAttribute("disabled");
            this.enabled = true
        };
        e.enable = e.enable.bind(e);
        e.disable = function() {
            if (!e.enabled)
                return;
            this.dropdown.internalHide();
            this.dropdown.buttonOuter.ontouchstart = null;
            this.dropdown.buttonOuter.ontouchend = null;
            this.dropdown.buttonOuter.onclick = null;
            this.dropdown.buttonOuter.setAttribute("class", p + " bb-dropdown-disabled-" + bb.screen.controlColor);
            this.enabled = false;
            this.setAttribute("disabled", "disabled")
        };
        e.disable = e.disable.bind(e);
        e.show = function() {
            this.dropdown.style.display = "block";
            bb.refresh()
        };
        e.show = e.show.bind(e);
        e.hide = function() {
            this.dropdown.style.display = "none";
            bb.refresh()
        };
        e.hide = e.hide.bind(e);
        e.remove = function() {
            this.dropdown.parentNode.removeChild(this.dropdown);
            bb.refresh()
        };
        e.remove = e.remove.bind(e);
        e.refresh = function() {
            this.dropdown.internalHide();
            this.dropdown.isRefreshed = false;
            this.dropdown.refreshOptions()
        };
        e.refresh = e.refresh.bind(e);
        e.setCaption = function(e) {
            this.dropdown.labelElement.innerHTML = e;
            this.setAttribute("data-bb-label", e)
        };
        e.setCaption = e.setCaption.bind(e);
        e.getCaption = function() {
            return this.dropdown.labelElement.innerHTML
        };
        e.getCaption = e.getCaption.bind(e);
        return u
    }};
_bb10_fileInput = {apply: function(e) {
        var t, n, r, i;
        for (t = 0; t < e.length; t++) {
            n = e[t];
            n.setAttribute("class", "bb-file-button");
            r = document.createElement("div");
            r.setAttribute("data-bb-type", "button");
            r.innerHTML = n.hasAttribute("data-bb-caption") ? n.getAttribute("data-bb-caption") : "Choose File";
            r.origCaption = r.innerHTML;
            bb.button.apply([r]);
            r.input = n;
            n.parentNode.insertBefore(r, n);
            r.appendChild(n);
            r.handleChange = function() {
                if (this.input.value) {
                    this.setCaption(this.input.value.replace(/^.*[\\\/]/, ""))
                } else {
                    this.setCaption(this.origCaption)
                }
            };
            r.handleChange = r.handleChange.bind(r);
            n.addEventListener("change", r.handleChange, false)
        }
    }};
_bb10_grid = {apply: function(e) {
        var t = false, n;
        for (var r = 0; r < e.length; r++) {
            var i, s, o, u, a, f, l = e[r];
            l.setAttribute("class", "bb-grid");
            l.isSquare = l.hasAttribute("data-bb-style") && l.getAttribute("data-bb-style").toLowerCase() == "square";
            t = l.hasAttribute("data-bb-header-style") ? l.getAttribute("data-bb-header-style").toLowerCase() == "solid" : false;
            n = l.hasAttribute("data-bb-header-justify") ? l.getAttribute("data-bb-header-justify").toLowerCase() : "center";
            if (l.hasAttribute("data-bb-context") && l.getAttribute("data-bb-context").toLowerCase() == "true") {
                f = bb.screen.contextMenu
            }
            s = l.querySelectorAll("[data-bb-type=group], [data-bb-type=row]");
            for (i = 0; i < s.length; i++) {
                a = s[i];
                if (a.hasAttribute("data-bb-type")) {
                    o = a.getAttribute("data-bb-type").toLowerCase();
                    if (o == "group" && a.hasAttribute("data-bb-title")) {
                        u = document.createElement("div");
                        u.normal = "bb-grid-header";
                        u.innerHTML = "<p>" + a.getAttribute("data-bb-title") + "</p>";
                        if (t) {
                            u.normal = u.normal + " bb10Accent";
                            u.style.color = "white";
                            u.style["border-bottom-color"] = "transparent"
                        } else {
                            u.normal = u.normal + " bb-grid-header-normal-" + bb.screen.listColor;
                            u.style["border-bottom-color"] = bb.options.shades.darkOutline
                        }
                        if (n == "left") {
                            u.normal = u.normal + " bb-grid-header-left"
                        } else if (n == "right") {
                            u.normal = u.normal + " bb-grid-header-right"
                        } else {
                            u.normal = u.normal + " bb-grid-header-center"
                        }
                        u.setAttribute("class", u.normal);
                        if (a.firstChild) {
                            a.insertBefore(u, a.firstChild)
                        } else {
                            a.appendChild(u)
                        }
                    } else if (o == "row") {
                        var c, h, p = 0, d, v, m, g, y, b, w, y, E, S, x, T = -1, N = a.querySelectorAll("[data-bb-type=item]"), C;
                        m = N.length;
                        if (m == 0)
                            continue;
                        if (a.hasAttribute("data-bb-columns")) {
                            T = a.getAttribute("data-bb-columns")
                        }
                        h = document.createElement("table");
                        h.style.width = "100%";
                        a.appendChild(h);
                        d = document.createElement("tr");
                        h.appendChild(d);
                        if (T > 0) {
                            if (N.length > T && !bb.device.isPlayBook) {
                                a.style["overflow-y"] = "hidden";
                                a.style["overflow-x"] = "scroll";
                                S = window.innerWidth / (parseInt(T) + .5)
                            } else {
                                S = window.innerWidth / T - 6
                            }
                        } else {
                            S = window.innerWidth / m - 6
                        }
                        for (c = 0; c < m; c++) {
                            g = N[c];
                            if (bb.device.isPlayBook && T > 0 && c > T - 1) {
                                g.style.display = "none";
                                continue
                            }
                            y = g.innerHTML;
                            u = g.getAttribute("data-bb-title");
                            x = y || u;
                            g.innerHTML = "";
                            v = document.createElement("td");
                            d.appendChild(v);
                            v.appendChild(g);
                            p++;
                            if (l.isSquare) {
                                E = S
                            } else {
                                E = Math.ceil(S * .5625)
                            }
                            g.style.width = S + "px";
                            g.style.height = E + "px";
                            b = document.createElement("img");
                            b.style.height = E + "px";
                            b.style.width = S + "px";
                            b.style.opacity = "0";
                            b.style["-webkit-transition"] = "opacity 0.5s linear";
                            b.style["-webkit-transform"] = "translate3d(0,0,0)";
                            b.itemNode = g;
                            g.image = b;
                            g.appendChild(b);
                            g.onbbuidomready = function() {
                                if (bb.isScrolledIntoView(this)) {
                                    this.image.onload = function() {
                                        this.style.opacity = "1.0"
                                    };
                                    this.image.src = this.getAttribute("data-bb-img")
                                } else {
                                    document.addEventListener("bbuiscrolling", this.onbbuiscrolling, false);
                                    this.listener = {name: "bbuiscrolling", eventHandler: this.onbbuiscrolling};
                                    bb.documentListeners.push(this.listener)
                                }
                                document.removeEventListener("bbuidomready", this.onbbuidomready, false)
                            };
                            g.onbbuidomready = g.onbbuidomready.bind(g);
                            document.addEventListener("bbuidomready", g.onbbuidomready, false);
                            g.onbbuiscrolling = function() {
                                if (bb.isScrolledIntoView(this)) {
                                    this.image.onload = function() {
                                        this.style.opacity = "1.0"
                                    };
                                    this.image.src = this.getAttribute("data-bb-img");
                                    document.removeEventListener("bbuiscrolling", this.onbbuiscrolling, false);
                                    var e = bb.documentListeners.indexOf(this.listener);
                                    if (e >= 0) {
                                        bb.documentListeners.splice(e, 1)
                                    }
                                }
                            };
                            g.onbbuiscrolling = g.onbbuiscrolling.bind(g);
                            if (x) {
                                w = document.createElement("div");
                                if (u && y) {
                                    w.setAttribute("class", "bb-grid-item-overlay bb-grid-item-overlay-two-rows");
                                    w.innerHTML = '<div><p class="title title-two-rows">' + u + "<br/>" + y + "</p></div>"
                                } else if (u) {
                                    w.setAttribute("class", "bb-grid-item-overlay bb-grid-item-overlay-one-row");
                                    w.innerHTML = '<div><p class="title title-one-row">' + u + "</p></div>"
                                } else if (y) {
                                    w.setAttribute("class", "bb-grid-item-overlay bb-grid-item-overlay-one-row");
                                    w.innerHTML = '<div><p class="title title-one-row">' + y + "</p></div>"
                                }
                                g.appendChild(w)
                            } else {
                                w = null
                            }
                            g.overlay = w;
                            g.title = u;
                            g.description = y;
                            g.fingerDown = false;
                            g.contextShown = false;
                            g.contextMenu = f;
                            if (g.contextMenu) {
                                g.guid = "bbui" + bb.guidGenerator();
                                g.setAttribute("data-bb-context-menu-id", g.guid);
                                C = new Object;
                                C.id = g.guid;
                                C.type = "bbui-context";
                                C.header = g.title;
                                C.subheader = g.description;
                                g.setAttribute("data-webworks-context", JSON.stringify(C))
                            }
                            g.ontouchstart = function() {
                                if (this.overlay) {
                                    this.overlay.style["opacity"] = "1.0";
                                    this.overlay.style["background-color"] = bb.options.highlightColor
                                }
                                g.fingerDown = true;
                                g.contextShown = false;
                                if (g.contextMenu && (bb.device.isPlayBook || bb.device.isRipple)) {
                                    window.setTimeout(this.touchTimer, 667);
                                    var e = bb.getCurScreen();
                                    g.touchstartx = e.bbUIscrollWrapper.scrollTop
                                }
                            };
                            g.ontouchend = function() {
                                if (this.overlay) {
                                    this.overlay.style["opacity"] = "";
                                    this.overlay.style["background-color"] = ""
                                }
                                g.fingerDown = false;
                                if (g.contextShown) {
                                    event.preventDefault();
                                    event.stopPropagation()
                                }
                            };
                            g.touchTimer = function() {
                                if (bb.device.isPlayBook || bb.device.isRipple) {
                                    var e = bb.getCurScreen();
                                    var t = e.bbUIscrollWrapper.scrollTop;
                                    if (g.fingerDown && Math.abs(g.touchstartx - t) < 50) {
                                        g.contextShown = true;
                                        g.contextMenu.peek({title: this.title, description: this.description, selected: this})
                                    }
                                }
                            };
                            g.touchTimer = g.touchTimer.bind(g);
                            g.drawSelected = function() {
                                if (this.overlay) {
                                    this.overlay.style["opacity"] = "1.0";
                                    this.overlay.style["background-color"] = bb.options.highlightColor
                                }
                            };
                            g.drawSelected = g.drawSelected.bind(g);
                            g.drawUnselected = function() {
                                if (this.overlay) {
                                    this.overlay.style["opacity"] = "";
                                    this.overlay.style["background-color"] = ""
                                }
                            };
                            g.drawUnselected = g.drawUnselected.bind(g)
                        }
                        if (T > 0 && p < T) {
                            var k = T - p;
                            a.extraColumns = [];
                            for (c = 0; c < k; c++) {
                                v = document.createElement("td");
                                d.appendChild(v);
                                v.style.width = S + "px";
                                a.extraColumns.push(v)
                            }
                        }
                    }
                }
            }
            l.orientationChanged = function(e) {
                var t = this.querySelectorAll("[data-bb-type=row]"), n, r, i, s, o, u, a, f;
                for (n = 0; n < t.length; n++) {
                    var c = -1;
                    s = t[n];
                    i = s.querySelectorAll("[data-bb-type=item]");
                    o = i.length;
                    if (s.hasAttribute("data-bb-columns")) {
                        c = s.getAttribute("data-bb-columns")
                    }
                    if (c > 0) {
                        if (i.length > c && !bb.device.isPlayBook) {
                            a = window.innerWidth / (parseInt(c) + .5)
                        } else {
                            a = window.innerWidth / c - 6
                        }
                    } else {
                        a = window.innerWidth / o - 6
                    }
                    for (r = 0; r < o; r++) {
                        u = i[r];
                        if (l.isSquare) {
                            f = a
                        } else {
                            f = Math.ceil(a * .5625)
                        }
                        u.image.style.height = f + "px";
                        u.image.style.width = a + "px";
                        u.image.style["-webkit-transition-property"] = "all";
                        u.image.style["-webkit-transition-duration"] = "0.2s";
                        u.image.style["-webkit-transition-timing-function"] = "linear";
                        u.image.style["-webkit-transform"] = "translate3d(0,0,0)";
                        u.style.width = a + "px";
                        u.style.height = f + "px";
                        u.style["-webkit-transition-property"] = "all";
                        u.style["-webkit-transition-duration"] = "0.2s";
                        u.style["-webkit-transition-timing-function"] = "linear";
                        u.style["-webkit-transform"] = "translate3d(0,0,0)"
                    }
                    if (s.extraColumns) {
                        for (r = 0; r < s.extraColumns.length; r++) {
                            s.extraColumns[r].style.width = a + "px"
                        }
                    }
                }
            };
            l.orientationChanged = l.orientationChanged.bind(l);
            window.addEventListener("resize", l.orientationChanged, false);
            bb.windowListeners.push({name: "resize", eventHandler: l.orientationChanged});
            l.show = function() {
                this.style.display = "block";
                bb.refresh()
            };
            l.show = l.show.bind(l);
            l.hide = function() {
                this.style.display = "none";
                bb.refresh()
            };
            l.hide = l.hide.bind(l);
            l.remove = function() {
                this.parentNode.removeChild(this);
                bb.refresh()
            };
            l.remove = l.remove.bind(l)
        }
    }};
_bb10_imageList = {apply: function(elements) {
        var i, j, outerElement, items;
        for (i = 0; i < elements.length; i++) {
            outerElement = elements[i];
            outerElement.items = [];
            outerElement.setAttribute("class", "bb-image-list");
            outerElement.hideImages = outerElement.hasAttribute("data-bb-images") ? outerElement.getAttribute("data-bb-images").toLowerCase() == "none" : false;
            if (!outerElement.hideImages) {
                outerElement.imagePlaceholder = outerElement.hasAttribute("data-bb-image-placeholder") ? outerElement.getAttribute("data-bb-image-placeholder") : undefined;
                outerElement.imageLoading = outerElement.hasAttribute("data-bb-image-loading") ? outerElement.getAttribute("data-bb-image-loading") : undefined
            }
            outerElement.listStyle = outerElement.hasAttribute("data-bb-style") ? outerElement.getAttribute("data-bb-style").toLowerCase() : "default";
            outerElement.solidHeader = outerElement.hasAttribute("data-bb-header-style") ? outerElement.getAttribute("data-bb-header-style").toLowerCase() == "solid" : false;
            outerElement.headerJustify = outerElement.hasAttribute("data-bb-header-justify") ? outerElement.getAttribute("data-bb-header-justify").toLowerCase() : "center";
            if (outerElement.hasAttribute("data-bb-context") && outerElement.getAttribute("data-bb-context").toLowerCase() == "true") {
                outerElement.contextMenu = bb.screen.contextMenu
            }
            outerElement.styleItem = function(innerChildNode) {
                if (innerChildNode.hasAttribute("data-bb-type")) {
                    var type = innerChildNode.getAttribute("data-bb-type").toLowerCase(), description = innerChildNode.innerHTML, title, overlay, accentText, img, details, detailsClass, descriptionDiv, btn, btnBorder, highlight, normal, btnInner, json;
                    innerChildNode.btn = undefined;
                    if (type == "header") {
                        normal = "bb-image-list-header";
                        if (this.solidHeader) {
                            normal = normal + " bb10Accent";
                            innerChildNode.style.color = "white";
                            innerChildNode.style["border-bottom-color"] = "transparent"
                        } else {
                            normal = normal + " bb-image-list-header-normal-" + bb.screen.listColor;
                            innerChildNode.style["border-bottom-color"] = bb.options.shades.darkOutline
                        }
                        if (this.headerJustify == "left") {
                            normal = normal + " bb-image-list-header-left"
                        } else if (this.headerJustify == "right") {
                            normal = normal + " bb-image-list-header-right"
                        } else {
                            normal = normal + " bb-image-list-header-center"
                        }
                        innerChildNode.normal = normal;
                        innerChildNode.innerHTML = "<p>" + description + "</p>";
                        innerChildNode.setAttribute("class", normal)
                    } else if (type == "item") {
                        normal = "bb-image-list-item bb-image-list-item-" + bb.screen.listColor;
                        highlight = normal + " bb-image-list-item-hover bb10Highlight";
                        innerChildNode.normal = normal;
                        innerChildNode.highlight = highlight;
                        innerChildNode.setAttribute("class", normal);
                        innerChildNode.innerHTML = "";
                        img = undefined;
                        details = document.createElement("div");
                        details.innerChildNode = innerChildNode;
                        innerChildNode.details = details;
                        innerChildNode.appendChild(details);
                        detailsClass = "bb-image-list-item-details";
                        if (this.hideImages) {
                            detailsClass = detailsClass + " bb-image-list-item-noimage"
                        } else {
                            img = new Image;
                            innerChildNode.img = img;
                            if (this.imagePlaceholder) {
                                img.placeholder = this.imagePlaceholder;
                                img.path = innerChildNode.hasAttribute("data-bb-img") ? innerChildNode.getAttribute("data-bb-img") : this.imagePlaceholder
                            } else {
                                img.path = innerChildNode.getAttribute("data-bb-img")
                            }
                            innerChildNode.onimageload = function() {
                                this.details.style["background-image"] = 'url("' + this.img.src + '")';
                                innerChildNode.details.style["background-size"] = "";
                                this.img = this.img.src
                            };
                            innerChildNode.onimageload = innerChildNode.onimageload.bind(innerChildNode);
                            img.onload = innerChildNode.onimageload;
                            if (this.imagePlaceholder) {
                                innerChildNode.onimageerror = function() {
                                    if (this.img.src == this.img.placeholder)
                                        return;
                                    this.img.src = this.img.placeholder
                                };
                                innerChildNode.onimageerror = innerChildNode.onimageerror.bind(innerChildNode);
                                img.onerror = innerChildNode.onimageerror
                            }
                            if (this.imageLoading) {
                                innerChildNode.details.style["background-image"] = 'url("' + this.imageLoading + '")';
                                if (bb.device.is1024x600) {
                                    innerChildNode.details.style["background-size"] = "64px 65px"
                                } else if (bb.device.is1280x768 || bb.device.is1280x720) {
                                    innerChildNode.details.style["background-size"] = "109px 110px"
                                } else if (bb.device.is720x720) {
                                    innerChildNode.details.style["background-size"] = "92px 93px"
                                } else {
                                    innerChildNode.details.style["background-size"] = "109px 110px"
                                }
                            }
                            img.src = img.path
                        }
                        title = document.createElement("div");
                        title.setAttribute("class", "title");
                        title.innerHTML = innerChildNode.getAttribute("data-bb-title");
                        details.title = title;
                        if (title.innerHTML.length == 0) {
                            title.innerHTML = "&nbsp;"
                        }
                        details.appendChild(title);
                        descriptionDiv = document.createElement("div");
                        descriptionDiv.setAttribute("class", "description bb-image-list-description-" + bb.screen.listColor);
                        details.description = descriptionDiv;
                        details.appendChild(descriptionDiv);
                        overlay = document.createElement("div");
                        overlay.setAttribute("class", "bb-image-list-item-overlay");
                        innerChildNode.appendChild(overlay);
                        if (this.listStyle == "arrowlist" || this.listStyle == "arrowbuttons" || this.listStyle == "addbuttons" || this.listStyle == "removebuttons") {
                            btn = document.createElement("div");
                            innerChildNode.appendChild(btn);
                            innerChildNode.btn = btn;
                            btn.outerElement = this;
                            btn.innerChildNode = innerChildNode;
                            if (innerChildNode.onbtnclick) {
                                btn.onbtnclick = innerChildNode.onbtnclick
                            } else if (innerChildNode.hasAttribute("onbtnclick")) {
                                innerChildNode.onbtnclick = innerChildNode.getAttribute("onbtnclick");
                                btn.onbtnclick = function() {
                                    eval(this.innerChildNode.onbtnclick)
                                }
                            }
                            detailsClass = detailsClass + " details-button-margin";
                            btn.setAttribute("class", "button");
                            btnBorder = document.createElement("div");
                            btnBorder.normal = "bb-image-list-item-button-border bb-image-list-item-button-" + bb.screen.listColor;
                            btnBorder.setAttribute("class", btnBorder.normal);
                            btn.btnBorder = btnBorder;
                            btn.appendChild(btnBorder);
                            btnInner = document.createElement("div");
                            btnInner.normal = "bb-image-list-item-button-inner";
                            btnInner.highlight = btnInner.normal;
                            btn.btnInner = btnInner;
                            btnBorder.appendChild(btnInner);
                            if (this.listStyle !== "arrowlist") {
                                if (this.listStyle == "arrowbuttons") {
                                    btnInner.normal = btnInner.normal + " bb-image-list-item-chevron-" + bb.screen.listColor;
                                    btnInner.highlight = btnInner.highlight + " bb-image-list-item-chevron-dark"
                                } else if (this.listStyle == "addbuttons") {
                                    btnInner.normal = btnInner.normal + " bb-image-list-item-add-" + bb.screen.listColor;
                                    btnInner.highlight = btnInner.highlight + " bb-image-list-item-add-dark"
                                } else if (this.listStyle == "removebuttons") {
                                    btnInner.normal = btnInner.normal + " bb-image-list-item-remove-" + bb.screen.listColor;
                                    btnInner.highlight = btnInner.highlight + " bb-image-list-item-remove-dark"
                                }
                                btn.ontouchstart = function() {
                                    if (!this.onbtnclick)
                                        return;
                                    this.btnInner.setAttribute("class", this.btnInner.highlight);
                                    this.btnBorder.style.background = "-webkit-gradient(linear, center top, center bottom, from(rgb(" + (bb.options.shades.R + 32) + "," + (bb.options.shades.G + 32) + "," + (bb.options.shades.B + 32) + ")), to(" + bb.options.highlightColor + "))"
                                };
                                btn.ontouchend = function() {
                                    if (!this.onbtnclick)
                                        return;
                                    this.btnBorder.style.background = "";
                                    this.btnInner.setAttribute("class", this.btnInner.normal)
                                };
                                btn.onclick = function(e) {
                                    e.stopPropagation();
                                    if (this.onbtnclick) {
                                        this.outerElement.selected = this.innerChildNode;
                                        this.onbtnclick()
                                    }
                                }
                            } else {
                                btnInner.normal = btnInner.normal + " bb-image-list-item-chevron-" + bb.screen.listColor;
                                btnBorder.style["background"] = "transparent";
                                btnBorder.style["border-color"] = "transparent"
                            }
                            btnInner.setAttribute("class", btnInner.normal)
                        } else {
                            if (innerChildNode.hasAttribute("data-bb-accent-text")) {
                                accentText = document.createElement("div");
                                accentText.setAttribute("class", "accent-text bb-image-list-accent-text-" + bb.screen.listColor);
                                accentText.innerHTML = innerChildNode.getAttribute("data-bb-accent-text");
                                details.appendChild(accentText);
                                details.accentText = accentText
                            }
                        }
                        if (description.length == 0) {
                            description = "&nbsp;";
                            descriptionDiv.style.visibilty = "hidden";
                            detailsClass = detailsClass + " bb-image-list-item-details-nodescription";
                            if (bb.device.is1024x600) {
                                title.style["margin-top"] = "16px";
                                title.style["padding-top"] = "28px";
                                overlay.style["margin-top"] = "-94px";
                                if (innerChildNode.btn) {
                                    innerChildNode.btn.style["margin-top"] = "-59px"
                                }
                            } else if (bb.device.is1280x768 || bb.device.is1280x720) {
                                title.style["margin-top"] = "-7px";
                                title.style["padding-top"] = "20px";
                                overlay.style["margin-top"] = "-140px";
                                if (innerChildNode.btn) {
                                    innerChildNode.btn.style["margin-top"] = "-102px"
                                }
                            } else if (bb.device.is720x720) {
                                title.style["margin-top"] = "-14px";
                                title.style["padding-top"] = "20px";
                                overlay.style["margin-top"] = "-133px";
                                if (innerChildNode.btn) {
                                    innerChildNode.btn.style["margin-top"] = "-89px"
                                }
                            } else {
                                title.style["margin-top"] = "-7px";
                                title.style["padding-top"] = "20px";
                                overlay.style["margin-top"] = "-121px";
                                if (innerChildNode.btn) {
                                    innerChildNode.btn.style["margin-top"] = "-102px"
                                }
                            }
                            if (accentText) {
                                if (bb.device.is1024x600) {
                                    accentText.style["margin-top"] = "-52px"
                                } else if (bb.device.is1280x768 || bb.device.is1280x720) {
                                    accentText.style["margin-top"] = "-82px"
                                } else if (bb.device.is720x720) {
                                    accentText.style["margin-top"] = "-75px"
                                } else {
                                    accentText.style["margin-top"] = "-82px"
                                }
                            }
                        }
                        descriptionDiv.innerHTML = description;
                        details.setAttribute("class", detailsClass);
                        innerChildNode.fingerDown = false;
                        innerChildNode.contextShown = false;
                        innerChildNode.overlay = overlay;
                        innerChildNode.contextMenu = this.contextMenu;
                        innerChildNode.description = description;
                        innerChildNode.title = title.innerHTML;
                        innerChildNode.ontouchstart = function() {
                            if (bb.device.isPlayBook) {
                                if (!innerChildNode.trappedClick && !this.contextMenu)
                                    return;
                                innerChildNode.fingerDown = true;
                                innerChildNode.contextShown = false;
                                this.overlay.style["visibility"] = "visible";
                                if (innerChildNode.contextMenu) {
                                    window.setTimeout(this.touchTimer, 667);
                                    var e = bb.getCurScreen();
                                    innerChildNode.touchstartx = e.bbUIscrollWrapper.scrollTop
                                }
                            }
                        };
                        innerChildNode.ontouchend = function(e) {
                            if (bb.device.isPlayBook) {
                                if (!innerChildNode.trappedClick && !this.contextMenu)
                                    return;
                                this.overlay.style["visibility"] = "hidden";
                                innerChildNode.fingerDown = false;
                                if (innerChildNode.contextShown) {
                                    e.preventDefault();
                                    e.stopPropagation()
                                }
                            }
                        };
                        innerChildNode.touchTimer = function() {
                            if (bb.device.isPlayBook) {
                                var e = bb.getCurScreen();
                                var t = e.bbUIscrollWrapper.scrollTop;
                                if (innerChildNode.fingerDown && Math.abs(innerChildNode.touchstartx - t) < 50) {
                                    innerChildNode.contextShown = true;
                                    this.drawSelected();
                                    innerChildNode.contextMenu.hideEvents.push(this.finishHighlight);
                                    innerChildNode.contextMenu.peek({title: this.title, description: this.description, selected: this})
                                }
                            }
                        };
                        innerChildNode.touchTimer = innerChildNode.touchTimer.bind(innerChildNode);
                        innerChildNode.drawSelected = function() {
                            this.setAttribute("class", this.highlight);
                            this.overlay.style["visibility"] = "visible";
                            this.overlay.style["border-color"] = bb.options.shades.darkOutline
                        };
                        innerChildNode.drawSelected = innerChildNode.drawSelected.bind(innerChildNode);
                        innerChildNode.drawUnselected = function() {
                            this.setAttribute("class", this.normal);
                            this.overlay.style["visibility"] = "hidden";
                            this.overlay.style["border-color"] = "transparent"
                        };
                        innerChildNode.drawUnselected = innerChildNode.drawUnselected.bind(innerChildNode);
                        if (this.contextMenu) {
                            innerChildNode.guid = "bbui" + bb.guidGenerator();
                            innerChildNode.setAttribute("data-bb-context-menu-id", innerChildNode.guid);
                            json = new Object;
                            json.id = innerChildNode.guid;
                            json.type = "bbui-context";
                            json.header = innerChildNode.title;
                            if (innerChildNode.description && innerChildNode.description != "&nbsp;") {
                                json.subheader = innerChildNode.description
                            }
                            innerChildNode.setAttribute("data-webworks-context", JSON.stringify(json))
                        }
                        innerChildNode.trappedClick = innerChildNode.onclick;
                        innerChildNode.onclick = undefined;
                        innerChildNode.outerElement = this;
                        innerChildNode.addEventListener("click", function(e) {
                            if (!innerChildNode.trappedClick)
                                return;
                            this.outerElement.selected = this;
                            if (this.trappedClick) {
                                setTimeout(this.trappedClick, 0)
                            }
                        }, false);
                        innerChildNode.finishHighlight = function() {
                            if (bb.screen.animating) {
                                setTimeout(this.finishHighlight, 250)
                            } else {
                                this.setAttribute("class", this.normal)
                            }
                        };
                        innerChildNode.finishHighlight = innerChildNode.finishHighlight.bind(innerChildNode);
                        innerChildNode.parentList = this;
                        innerChildNode.remove = function() {

                            var t = this;
                            window.webkitRequestAnimationFrame(function() {
                                t.style.height = "0px";
                                t.style.opacity = "0.0";
                                t.style["-webkit-transition-property"] = "all";
                                t.style["-webkit-transition-duration"] = "0.1s";
                                t.style["-webkit-transition-timing-function"] = "linear";
                                t.style["-webkit-transform"] = "translate3d(0,0,0)";
                            });
                            window.setTimeout(t.details.performRemove, 100);
                            if (bb.scroller) {
                                bb.scroller.refresh();
                            }
                        };
                        innerChildNode.remove = innerChildNode.remove.bind(innerChildNode);
                        details.performRemove = function() {
                            var e = this.innerChildNode.parentList,
                                    t = e.items.indexOf(this.innerChildNode),
                                    n = this.innerChildNode.parentNode;
                            e.items.splice(t, 1);
                            n.removeChild(this.innerChildNode);
                        };
                        details.performRemove = details.performRemove.bind(details);
                        innerChildNode.getTitle = function() {
                            return this.title
                        };
                        innerChildNode.getTitle = innerChildNode.getTitle.bind(innerChildNode);
                        innerChildNode.getDescription = function() {
                            return this.details.description.innerHTML
                        };
                        innerChildNode.getDescription = innerChildNode.getDescription.bind(innerChildNode);
                        innerChildNode.getAccentText = function() {
                            return this.details.accentText ? this.details.accentText.innerHTML : undefined
                        };
                        innerChildNode.getAccentText = innerChildNode.getAccentText.bind(innerChildNode);
                        innerChildNode.getImage = function() {
                            return this.img
                        };
                        innerChildNode.getImage = innerChildNode.getImage.bind(innerChildNode)
                    }
                }
            };
            outerElement.styleItem = outerElement.styleItem.bind(outerElement);
            outerElement.appendItem = function(e) {
                this.styleItem(e);
                this.appendChild(e);
                this.items.push(e);
                var t = document.createEvent("Events");
                t.initEvent("bbuilistready", true, true);
                document.dispatchEvent(t);
                if (bb.scroller) {
                    bb.scroller.refresh()
                }
            };
            outerElement.appendItem = outerElement.appendItem.bind(outerElement);
            outerElement.resetPadding = function() {
                this.style["padding-right"] = "0px";
                this.timeout = null
            };
            outerElement.resetPadding = outerElement.resetPadding.bind(outerElement);
            outerElement.refresh = function(e) {
                if (!e || !e.length || e.length <= 0)
                    return;
                var t, n, r = document.createElement("div");
                this.items = [];
                for (t = 0; t < e.length; t++) {
                    n = e[t];
                    this.styleItem(n);
                    this.items.push(n);
                    r.appendChild(n)
                }
                this.innerHTML = "";
                this.appendChild(r);
                var i = document.createEvent("Events");
                i.initEvent("bbuilistready", true, true);
                document.dispatchEvent(i);
                if (bb.device.requiresScrollingHack) {
                    if (this.timeout) {
                        clearTimeout(this.timeout)
                    } else {
                        this.style["padding-right"] = "1px"
                    }
                    this.timeout = setTimeout(this.resetPadding, 20)
                }
            };
            outerElement.refresh = outerElement.refresh.bind(outerElement);
            outerElement.insertItemBefore = function(e, t) {
                this.styleItem(e);
                t.parentNode.insertBefore(e, t);
                this.items.splice(this.items.indexOf(t), 0, e);
                var n = document.createEvent("Events");
                n.initEvent("bbuilistready", true, true);
                document.dispatchEvent(n);
                if (bb.scroller) {
                    bb.scroller.refresh()
                }
            };
            outerElement.insertItemBefore = outerElement.insertItemBefore.bind(outerElement);
            outerElement.getItems = function() {
                var e, t = [];
                for (e = 0; e < this.items.length; e++) {
                    t.push(this.items[e])
                }
                return t
            };
            outerElement.getItems = outerElement.getItems.bind(outerElement);
            outerElement.clear = function() {
                this.items = [];
                outerElement.innerHTML = "";
                if (bb.scroller) {
                    bb.scroller.refresh()
                }
            };
            outerElement.clear = outerElement.clear.bind(outerElement);
            outerElement.show = function() {
                this.style.display = "block";
                bb.refresh()
            };
            outerElement.show = outerElement.show.bind(outerElement);
            outerElement.hide = function() {
                this.style.display = "none";
                bb.refresh()
            };
            outerElement.hide = outerElement.hide.bind(outerElement);
            outerElement.remove = function() {
                this.parentNode.removeChild(this);
                bb.refresh()
            };
            outerElement.remove = outerElement.remove.bind(outerElement);
            items = outerElement.querySelectorAll("[data-bb-type=item], [data-bb-type=header]");
            var item;
            for (j = 0; j < items.length; j++) {
                item = items[j];
                outerElement.styleItem(item);
                outerElement.items.push(item)
            }
        }
    }};
_bb10_labelControlContainers = {apply: function(e) {
        var t, n, r, i, s, o, u, a, f, l, c, h;
        for (t = 0; t < e.length; t++) {
            n = e[t];
            r = n.querySelectorAll("[data-bb-type=row]");
            if (r.length > 0) {
                i = document.createElement("table");
                i.setAttribute("class", "bb-label-control-rows");
                n.insertBefore(i, r[0]);
                for (s = 0; s < r.length; s++) {
                    o = r[s];
                    u = document.createElement("tr");
                    u.setAttribute("class", "bb-label-control-label-row");
                    i.appendChild(u);
                    a = document.createElement("td");
                    u.appendChild(a);
                    f = o.querySelectorAll("[data-bb-type=label]")[0];
                    f.setAttribute("class", "bb-label-control-label");
                    o.removeChild(f);
                    a.appendChild(f);
                    u = document.createElement("tr");
                    i.appendChild(u);
                    l = document.createElement("td");
                    u.appendChild(l);
                    c = o.querySelectorAll("[data-bb-type=button],[data-bb-type=input],[data-bb-type=dropdown],textarea,input[type=file]")[0];
                    if (c) {
                        o.removeChild(c);
                        l.appendChild(c)
                    }
                    n.removeChild(o)
                }
            }
            n.show = function() {
                this.style.display = "block";
                bb.refresh()
            };
            n.show = n.show.bind(n);
            n.hide = function() {
                this.style.display = "none";
                bb.refresh()
            };
            n.hide = n.hide.bind(n);
            n.remove = function() {
                this.parentNode.removeChild(this);
                bb.refresh()
            };
            n.remove = n.remove.bind(n)
        }
    }};
_bb10_pillButtons = {apply: function(e) {
        var t, n;
        for (t = 0; t < e.length; t++) {
            n = e[t];
            bb.pillButtons.style(n, true)
        }
    }, style: function(e, t) {
        var n, r = "bb-pill-buttons-container bb-pill-buttons-container-" + bb.screen.controlColor, i = "bb-pill-button", s, o, u = e.querySelectorAll("[data-bb-type=pill-button]"), a = Math.floor(100 / u.length), f = 10, l, c, h, p, d;
        e.sidePadding = f;
        e.setAttribute("class", "bb-pill-buttons");
        s = document.createElement("div");
        e.appendChild(s);
        s.setAttribute("class", r);
        e.selectedColor = bb.screen.controlColor == "dark" ? "#909090" : "#555555";
        pill = document.createElement("div");
        pillInner = document.createElement("div");
        pill.appendChild(pillInner);
        pill.setAttribute("class", i + " bb-pill-button-selected-" + bb.screen.controlColor + " bb-pill-buttons-pill");
        pillInner.setAttribute("class", "bb-pill-button-inner bb-pill-button-inner-selected-" + bb.screen.controlColor);
        pill.style.opacity = "0";
        e.pill = pill;
        s.appendChild(pill);
        e.style["padding-left"] = f + "px";
        e.style["padding-right"] = f + "px";
        c = document.createElement("table");
        e.table = c;
        h = document.createElement("tr");
        c.tr = h;
        c.appendChild(h);
        c.setAttribute("class", "bb-pill-buttons-table");
        c.style.opacity = "0";
        s.appendChild(c);
        e.styleButton = function(t) {
            t.isSelected = false;
            o = document.createElement("div");
            o.innerHTML = t.innerHTML;
            t.innerHTML = "";
            t.appendChild(o);
            t.border = o;
            t.outerElement = e;
            if (t.getAttribute("data-bb-selected") == "true") {
                t.isSelected = true;
                e.selected = t;
                t.style.color = e.selectedColor
            }
            t.setAttribute("class", i);
            o.setAttribute("class", "bb-pill-button-inner");
            t.style["z-index"] = 4;
            t.style.width = "100%";
            t.dotouchstart = function(e) {
                if (this.isSelected)
                    return;
                var t = this.outerElement.selected;
                t.style.color = "";
                if (bb.screen.controlColor == "light") {
                    this.outerElement.pill.style["background-color"] = "#DDDDDD"
                }
                this.outerElement.setPillLeft(this)
            };
            t.dotouchstart = t.dotouchstart.bind(t);
            t.dotouchend = function(e) {
                if (this.isSelected)
                    return;
                var t = this.outerElement.selected;
                t.isSelected = false;
                this.isSelected = true;
                this.outerElement.selected = this;
                this.style.color = this.outerElement.selectedColor;
                if (bb.screen.controlColor == "light") {
                    this.outerElement.pill.style["background-color"] = ""
                }
                var n = document.createEvent("MouseEvents");
                n.initMouseEvent("click", true, true);
                n.doClick = true;
                this.dispatchEvent(n)
            };
            t.dotouchend = t.dotouchend.bind(t);
            if (bb.device.isRipple) {
                t.onmousedown = t.dotouchstart;
                t.onmouseup = t.dotouchend
            } else {
                t.ontouchstart = t.dotouchstart;
                t.ontouchend = t.dotouchend
            }
            t.addEventListener("click", function(e) {
                e.stopPropagation()
            }, true);
            t.setCaption = function(e) {
                this.border.innerHTML = e
            };
            t.setCaption = t.setCaption.bind(t);
            t.getCaption = function() {
                return this.border.innerHTML
            };
            t.getCaption = t.getCaption.bind(t);
            return t
        };
        e.styleButton = e.styleButton.bind(e);
        for (d = 0; d < u.length; d++) {
            l = u[d];
            l = e.styleButton(l);
            p = document.createElement("td");
            h.appendChild(p);
            p.appendChild(l);
            p.style.width = a + "%"
        }
        e.recalculateSize = function() {
            var e = this.table.querySelectorAll("td"), t = parseInt(window.getComputedStyle(this).width) - this.sidePadding, n = Math.floor((t - e.length * 4) / e.length) + "px", r;
            for (r = 0; r < e.length; r++) {
                e[r].style.width = n
            }
            this.table.style.width = t + "px";
            this.pill.style.width = n
        };
        e.recalculateSize = e.recalculateSize.bind(e);
        e.setPillLeft = function(e) {
            if (!e) {
                e = this.selected;
                if (!e) {
                    var t = this.table.querySelectorAll("[data-bb-type=pill-button]");
                    if (t.length > 0) {
                        e = t[0];
                        this.selected = e
                    }
                }
            }
            if (e) {
                this.pill.style["-webkit-transform"] = "translate3d(" + e.parentNode.offsetLeft + "px,0px,0px)"
            }
        };
        e.setPillLeft = e.setPillLeft.bind(e);
        e.initialize = function() {
            this.recalculateSize();
            this.setPillLeft();
            this.table.style.opacity = "1";
            this.table.style["-webkit-transition"] = "opacity 0.1s linear";
            this.pill.style.opacity = "1"
        };
        e.initialize = e.initialize.bind(e);
        if (t) {
            e.onbbuidomready = function() {
                this.initialize();
                document.removeEventListener("bbuidomprocessed", this.onbbuidomready, false)
            };
            e.onbbuidomready = e.onbbuidomready.bind(e);
            document.addEventListener("bbuidomprocessed", e.onbbuidomready, false)
        } else {
            window.setTimeout(e.initialize, 0)
        }
        e.doOrientationChange = function() {
            this.recalculateSize();
            this.setPillLeft()
        };
        e.doOrientationChange = e.doOrientationChange.bind(e);
        window.addEventListener("resize", e.doOrientationChange, false);
        bb.windowListeners.push({name: "resize", eventHandler: e.doOrientationChange});
        e.show = function() {
            this.style.display = "block";
            this.recalculateSize();
            this.setPillLeft();
            bb.refresh()
        };
        e.show = e.show.bind(e);
        e.hide = function() {
            this.style.display = "none";
            bb.refresh()
        };
        e.hide = e.hide.bind(e);
        e.remove = function() {
            this.parentNode.removeChild(this);
            bb.refresh()
        };
        e.remove = e.remove.bind(e);
        e.clear = function() {
            var e = this.table.querySelectorAll("td"), t;
            for (t = 0; t < e.length; t++) {
                this.table.tr.removeChild(e[t])
            }
            this.pill.style.opacity = "0"
        };
        e.clear = e.clear.bind(e);
        e.appendButton = function(t) {
            t = e.styleButton(t);
            var n = document.createElement("td");
            this.table.tr.appendChild(n);
            n.appendChild(t);
            this.initialize()
        };
        e.appendButton = e.appendButton.bind(e);
        e.getButtons = function() {
            var e = this.parentNode.querySelectorAll("[data-bb-type=pill-button]");
            var t = new Array;
            for (var n = 0; n < e.length; n++) {
                t[n] = e[n].firstChild.innerHTML
            }
            return t
        };
        e.getButtons = e.getButtons.bind(e);
        return e
    }};
_bb10_radio = {apply: function(e) {
        for (var t = 0; t < e.length; t++) {
            bb.radio.style(e[t])
        }
    }, style: function(e) {
        var e, t, n, r, i, s = bb.screen.controlColor, o = e;
        e = document.createElement("div");
        e.setAttribute("class", "bb-radio-container-" + s);
        e.input = o;
        o.outerElement = e;
        o.style.display = "none";
        o.radio = e;
        if (o.parentNode) {
            o.parentNode.insertBefore(e, o)
        }
        e.appendChild(o);
        n = document.createElement("div");
        n.setAttribute("class", "bb-radio-dot");
        n.highlight = "-webkit-linear-gradient(top,  rgb(" + (bb.options.shades.R + 32) + ", " + (bb.options.shades.G + 32) + ", " + (bb.options.shades.B + 32) + ") 0%, rgb(" + bb.options.shades.R + ", " + bb.options.shades.G + ", " + bb.options.shades.B + ") 100%)";
        n.touchHighlight = "-webkit-linear-gradient(top,  rgba(" + (bb.options.shades.R - 64) + ", " + (bb.options.shades.G - 64) + ", " + (bb.options.shades.B - 64) + ",0.25) 0%, rgba(" + bb.options.shades.R + ", " + bb.options.shades.G + ", " + bb.options.shades.B + ",0.25) 100%)";
        if (o.checked) {
            n.style.background = n.highlight
        }
        e.dotDiv = n;
        e.appendChild(n);
        r = document.createElement("div");
        r.setAttribute("class", "bb-radio-dot-center");
        if (!o.checked) {
            bb.radio.resetDot(r)
        }
        n.appendChild(r);
        n.centerDotDiv = r;
        n.slideOutUp = function() {
            if (bb.device.is1024x600) {
                this.style.height = "0px";
                this.style.width = "10px";
                this.style.top = "9px";
                this.style.left = "15px"
            } else {
                this.style.height = "0px";
                this.style.width = "20px";
                this.style.top = "18px";
                this.style.left = "30px"
            }
            bb.radio.resetDot(this.centerDotDiv);
            this.style["-webkit-transition-property"] = "all";
            this.style["-webkit-transition-duration"] = "0.1s";
            this.style["-webkit-transition-timing-function"] = "linear";
            this.style["-webkit-backface-visibility"] = "hidden";
            this.style["-webkit-perspective"] = 1e3;
            this.style["-webkit-transform"] = "translate3d(0,0,0)"
        };
        n.slideOutUp = n.slideOutUp.bind(n);
        n.slideOutDown = function() {
            if (bb.device.is1024x600) {
                this.style.height = "0px";
                this.style.width = "10px";
                this.style.top = "30px";
                this.style.left = "15px"
            } else {
                this.style.height = "0px";
                this.style.width = "20px";
                this.style.top = "60px";
                this.style.left = "30px"
            }
            bb.radio.resetDot(this.centerDotDiv);
            this.style["-webkit-transition-property"] = "all";
            this.style["-webkit-transition-duration"] = "0.1s";
            this.style["-webkit-transition-timing-function"] = "linear";
            this.style["-webkit-backface-visibility"] = "hidden";
            this.style["-webkit-perspective"] = 1e3;
            this.style["-webkit-transform"] = "translate3d(0,0,0)"
        };
        n.slideOutDown = n.slideOutDown.bind(n);
        n.slideIn = function() {
            if (bb.device.is1024x600) {
                this.style.height = "20px";
                this.style.width = "20px";
                this.style.top = "10px";
                this.style.left = "9px";
                this.centerDotDiv.style.height = "10px";
                this.centerDotDiv.style.width = "10px";
                this.centerDotDiv.style.top = "5px";
                this.centerDotDiv.style.left = "5px"
            } else {
                this.style.height = "40px";
                this.style.width = "40px";
                this.style.top = "19px";
                this.style.left = "19px";
                this.centerDotDiv.style.height = "18px";
                this.centerDotDiv.style.width = "18px";
                this.centerDotDiv.style.top = "11px";
                this.centerDotDiv.style.left = "11px"
            }
            this.style["-webkit-transition-property"] = "all";
            this.style["-webkit-transition-duration"] = "0.1s";
            this.style["-webkit-transition-timing-function"] = "ease-in";
            this.style["-webkit-backface-visibility"] = "hidden";
            this.style["-webkit-perspective"] = 1e3;
            this.style["-webkit-transform"] = "translate3d(0,0,0)";
            this.centerDotDiv.style["-webkit-transition-delay"] = "0.1s";
            this.centerDotDiv.style["-webkit-transition-property"] = "all";
            this.centerDotDiv.style["-webkit-transition-duration"] = "0.1s";
            this.centerDotDiv.style["-webkit-transition-timing-function"] = "ease-in";
            this.centerDotDiv.style["-webkit-perspective"] = 1e3;
            this.centerDotDiv.style["-webkit-transform"] = "translate3d(0,0,0)"
        };
        n.slideIn = n.slideIn.bind(n);
        e.selectedRadio = undefined;
        e.slideFromTop = true;
        e.ontouchstart = function() {
            if (!this.input.checked) {
                this.slideFromTop = true;
                this.selectedRadio = this.getCurrentlyChecked();
                if (this.selectedRadio) {
                    if (this.getTop(this.selectedRadio.radio) >= this.getTop(this)) {
                        this.slideFromTop = false
                    }
                }
                this.dotDiv.style["-webkit-transition"] = "none";
                if (bb.device.is1024x600) {
                    this.dotDiv.style.height = "20px";
                    this.dotDiv.style.width = "20px";
                    this.dotDiv.style.top = "10px";
                    this.dotDiv.style.left = "9px"
                } else {
                    this.dotDiv.style.height = "40px";
                    this.dotDiv.style.width = "40px";
                    this.dotDiv.style.top = "19px";
                    this.dotDiv.style.left = "19px"
                }
                bb.radio.resetDot(this.dotDiv.centerDotDiv);
                this.dotDiv.style.background = this.dotDiv.touchHighlight
            }
        };
        e.ontouchend = function() {
            if (!this.input.checked) {
                this.dotDiv.style["-webkit-transition"] = "none";
                if (bb.device.is1024x600) {
                    this.dotDiv.style.height = "0px";
                    this.dotDiv.style.width = "9px";
                    this.dotDiv.style.left = "16px"
                } else {
                    this.dotDiv.style.height = "0px";
                    this.dotDiv.style.width = "18px";
                    this.dotDiv.style.left = "32px"
                }
                if (this.slideFromTop) {
                    this.dotDiv.style.top = bb.device.is1024x600 ? "9px" : "18px"
                } else {
                    this.dotDiv.style.top = bb.device.is1024x600 ? "30px" : "60px"
                }
                window.setTimeout(this.doclick, 0)
            }
        };
        e.doclick = function() {
            if (!this.input.checked && !this.input.disabled) {
                var e = document.createEvent("HTMLEvents");
                e.initEvent("change", false, true);
                this.dotDiv.style.background = this.dotDiv.highlight;
                this.dotDiv.slideIn();
                if (this.selectedRadio) {
                    this.selectedRadio.removeAttribute("checked");
                    this.selectedRadio.dispatchEvent(e);
                    if (this.slideFromTop) {
                        this.selectedRadio.radio.dotDiv.slideOutDown()
                    } else {
                        this.selectedRadio.radio.dotDiv.slideOutUp()
                    }
                }
                this.input.setAttribute("checked", "true");
                this.input.dispatchEvent(e)
            }
        };
        e.doclick = e.doclick.bind(e);
        e.getCurrentlyChecked = function() {
            var e = document.querySelectorAll("input[type=radio][name=" + this.input.name + "][checked=true]");
            if (e.length > 0) {
                return e[0]
            } else {
                return undefined
            }
        };
        e.getCurrentlyChecked = e.getCurrentlyChecked.bind(e);
        e.getTop = function(e) {
            var t = 0;
            while (e) {
                t = t + e.offsetTop;
                e = e.offsetParent
            }
            return t
        };
        o.setChecked = function() {
            if (!this.checked) {
                this.slideFromTop = true;
                this.outerElement.selectedRadio = this.outerElement.getCurrentlyChecked();
                if (this.outerElement.selectedRadio) {
                    if (this.outerElement.getTop(this.outerElement.selectedRadio.radio) >= this.outerElement.getTop(this.outerElement)) {
                        this.outerElement.slideFromTop = false
                    }
                }
                this.outerElement.dotDiv.style["-webkit-transition"] = "none";
                if (bb.device.is1024x600) {
                    this.outerElement.dotDiv.style.height = "0px";
                    this.outerElement.dotDiv.style.width = "9px";
                    this.outerElement.dotDiv.style.left = "16px"
                } else {
                    this.outerElement.dotDiv.style.height = "0px";
                    this.outerElement.dotDiv.style.width = "18px";
                    this.outerElement.dotDiv.style.left = "32px"
                }
                if (this.outerElement.slideFromTop) {
                    this.outerElement.dotDiv.style.top = bb.device.is1024x600 ? "9px" : "18px"
                } else {
                    this.outerElement.dotDiv.style.top = bb.device.is1024x600 ? "30px" : "60px"
                }
                window.setTimeout(this.outerElement.doclick, 0)
            }
        };
        o.setChecked = o.setChecked.bind(o);
        o.getChecked = function() {
            return this.checked
        };
        o.setChecked = o.setChecked.bind(o);
        o.enable = function() {
            if (!this.disabled)
                return;
            this.disabled = false;
            this.outerElement.dotDiv.setAttribute("class", "bb-radio-dot")
        };
        o.enable = o.enable.bind(o);
        o.disable = function() {
            if (this.disabled)
                return;
            this.disabled = true;
            this.outerElement.dotDiv.setAttribute("class", "bb-radio-dot-disabled")
        };
        o.disable = o.disable.bind(o);
        o.isEnabled = function() {
            return!this.disabled
        };
        o.isEnabled = o.isEnabled.bind(o);
        o.show = function() {
            this.outerElement.style.display = "block";
            bb.refresh()
        };
        o.show = o.show.bind(o);
        o.hide = function() {
            this.outerElement.style.display = "none";
            bb.refresh()
        };
        o.hide = o.hide.bind(o);
        o.remove = function() {
            this.outerElement.parentNode.removeChild(this.outerElement);
            bb.refresh()
        };
        o.remove = o.remove.bind(o);
        return e
    }, resetDot: function(e) {
        e.style["-webkit-transition"] = "none";
        if (bb.device.is1024x600) {
            e.style.height = "0px";
            e.style.width = "0px";
            e.style.top = "10px";
            e.style.left = "9px"
        } else {
            e.style.height = "0px";
            e.style.width = "0px";
            e.style.top = "20px";
            e.style.left = "20px"
        }
    }, enableGroup: function(e) {
        var t = document.getElementsByName(e);
        for (i = 0; i < t.length; i++) {
            if (t[i].type === "radio")
                t[i].enable()
        }
    }, disableGroup: function(e) {
        var t = document.getElementsByName(e);
        for (i = 0; i < t.length; i++) {
            if (t[i].type === "radio")
                t[i].disable()
        }
    }};
_bb10_roundPanel = {apply: function(e) {
        var t, n, r, i, s, o = bb.screen.listColor;
        for (t = 0; t < e.length; t++) {
            r = e[t];
            r.setAttribute("class", "bb-round-panel");
            i = r.querySelectorAll("[data-bb-type=panel-header]");
            for (n = 0; n < i.length; n++) {
                s = i[n];
                s.setAttribute("class", "bb-panel-header bb-panel-header-" + o);
                s.style["border-bottom-color"] = bb.options.shades.darkOutline
            }
            r.show = function() {
                this.style.display = "block";
                bb.refresh()
            };
            r.show = r.show.bind(r);
            r.hide = function() {
                this.style.display = "none";
                bb.refresh()
            };
            r.hide = r.hide.bind(r);
            r.remove = function() {
                this.parentNode.removeChild(this);
                bb.refresh()
            };
            r.remove = r.remove.bind(r)
        }
    }};
_bb10_slider = {apply: function(e) {
        var t, n, r = bb.screen.controlColor;
        for (t = 0; t < e.length; t++) {
            n = e[t];
            outerElement = document.createElement("div");
            outerElement.range = n;
            n.parentNode.insertBefore(outerElement, n);
            n.style.display = "none";
            outerElement.appendChild(n);
            outerElement.minValue = n.hasAttribute("min") ? parseInt(n.getAttribute("min")) : 0;
            outerElement.maxValue = n.hasAttribute("max") ? parseInt(n.getAttribute("max")) : 0;
            outerElement.value = n.hasAttribute("value") ? parseInt(n.getAttribute("value")) : 0;
            outerElement.step = n.hasAttribute("step") ? parseInt(n.getAttribute("step")) : 0;
            outerElement.isActivated = false;
            outerElement.initialXPos = 0;
            outerElement.currentXPos = 0;
            outerElement.transientXPos = 0;
            outerElement.className = "bb-slider";
            outerElement.outer = document.createElement("div");
            outerElement.outer.setAttribute("class", "outer bb-slider-outer-" + r);
            outerElement.appendChild(outerElement.outer);
            outerElement.fill = document.createElement("div");
            outerElement.fill.className = "fill";
            outerElement.fill.active = "-webkit-linear-gradient(top, rgb(" + bb.options.shades.R + ", " + bb.options.shades.G + ", " + bb.options.shades.B + ") 0%, rgb(" + (bb.options.shades.R + 16) + ", " + (bb.options.shades.G + 16) + ", " + (bb.options.shades.B + 16) + ") 100%)";
            outerElement.fill.dormant = "-webkit-linear-gradient(top, " + bb.options.highlightColor + " 0%, " + bb.options.shades.darkHighlight + " 100%)";
            outerElement.fill.style.background = outerElement.fill.dormant;
            outerElement.outer.appendChild(outerElement.fill);
            outerElement.inner = document.createElement("div");
            outerElement.inner.className = "inner";
            outerElement.inner.outerElement = outerElement;
            outerElement.outer.appendChild(outerElement.inner);
            outerElement.halo = document.createElement("div");
            outerElement.halo.className = "halo";
            outerElement.halo.style.background = "-webkit-gradient(radial, 50% 50%, 0, 50% 50%, 43, from(rgba(" + bb.options.shades.R + ", " + bb.options.shades.G + ", " + bb.options.shades.B + ", 0.15)), color-stop(0.8, rgba(" + bb.options.shades.R + ", " + bb.options.shades.G + ", " + bb.options.shades.B + ", 0.15)), to(rgba(" + bb.options.shades.R + ", " + bb.options.shades.G + ", " + bb.options.shades.B + ", 0.7)))";
            outerElement.inner.appendChild(outerElement.halo);
            outerElement.indicator = document.createElement("div");
            outerElement.indicator.setAttribute("class", "indicator bb-slider-indicator-" + r);
            outerElement.inner.appendChild(outerElement.indicator);
            n.outerElement = outerElement;
            n.setValue = function(e) {
                var t = 0, n, r;
                if (e && (e < parseInt(this.outerElement.minValue) || e > parseInt(this.outerElement.maxValue))) {
                    return
                } else if (e) {
                    this.outerElement.value = e;
                    this.value = e;
                    r = document.createEvent("HTMLEvents");
                    r.initEvent("change", false, true);
                    this.dispatchEvent(r)
                }
                if (this.outerElement.value == this.outerElement.maxValue) {
                    t = 1
                } else {
                    t = this.outerElement.value / (parseInt(this.outerElement.maxValue) + parseInt(this.outerElement.minValue))
                }
                this.outerElement.currentXPos = Math.floor(parseInt(window.getComputedStyle(this.outerElement.outer).width) * t);
                this.outerElement.fill.style.width = this.outerElement.currentXPos + "px";
                this.outerElement.inner.style["-webkit-transform"] = "translate3d(" + this.outerElement.currentXPos + "px,0px,0px)"
            };
            n.setValue = n.setValue.bind(n);
            window.setTimeout(n.setValue, 0);
            outerElement.inner.animateBegin = function(e) {
                if (this.outerElement.isActivated === false) {
                    this.outerElement.isActivated = true;
                    this.outerElement.initialXPos = e.touches[0].pageX;
                    this.outerElement.halo.style["-webkit-transform"] = "scale(1)";
                    this.outerElement.halo.style["-webkit-animation-name"] = "explode";
                    this.outerElement.indicator.setAttribute("class", "indicator bb-slider-indicator-" + r + " indicator-hover-" + r);
                    this.outerElement.indicator.style.background = "-webkit-linear-gradient(top, rgb(" + bb.options.shades.R + ", " + bb.options.shades.G + ", " + bb.options.shades.B + ") 0%, rgb(" + (bb.options.shades.R + 16) + ", " + (bb.options.shades.G + 16) + ", " + (bb.options.shades.B + 16) + ") 100%)";
                    this.outerElement.fill.style.background = this.outerElement.fill.active
                }
            };
            outerElement.inner.animateBegin = outerElement.inner.animateBegin.bind(outerElement.inner);
            outerElement.inner.addEventListener("touchstart", outerElement.inner.animateBegin, false);
            outerElement.inner.animateEnd = function() {
                if (this.outerElement.isActivated === true) {
                    this.outerElement.isActivated = false;
                    this.outerElement.currentXPos = this.outerElement.transientXPos;
                    this.outerElement.value = parseInt(this.outerElement.range.value);
                    this.outerElement.halo.style["-webkit-transform"] = "scale(0)";
                    this.outerElement.halo.style["-webkit-animation-name"] = "implode";
                    this.outerElement.indicator.setAttribute("class", "indicator bb-slider-indicator-" + r);
                    this.outerElement.indicator.style.background = "";
                    this.outerElement.fill.style.background = this.outerElement.fill.dormant
                }
            };
            outerElement.inner.animateEnd = outerElement.inner.animateEnd.bind(outerElement.inner);
            outerElement.inner.addEventListener("touchend", outerElement.inner.animateEnd, false);
            outerElement.moveSlider = function(e) {
                if (this.isActivated === true) {
                    e.stopPropagation();
                    e.preventDefault();
                    this.transientXPos = this.currentXPos + e.touches[0].pageX - this.initialXPos;
                    this.transientXPos = Math.max(0, Math.min(this.transientXPos, parseInt(window.getComputedStyle(this.outer).width)));
                    this.notifyUpdated();
                    this.fill.style.width = this.transientXPos + "px";
                    this.inner.style["-webkit-transform"] = "translate3d(" + this.transientXPos + "px,0px,0px)"
                }
            };
            outerElement.moveSlider = outerElement.moveSlider.bind(outerElement);
            outerElement.notifyUpdated = function() {
                var e = this.transientXPos / parseInt(window.getComputedStyle(this.outer).width), t = Math.ceil((parseInt(this.minValue) + parseInt(this.maxValue)) * e);
                if (Math.abs(t - parseInt(this.range.value)) > this.step) {
                    this.range.value = t;
                    var n = document.createEvent("HTMLEvents");
                    n.initEvent("change", false, true);
                    this.range.dispatchEvent(n)
                }
            };
            outerElement.notifyUpdated = outerElement.notifyUpdated.bind(outerElement);
            outerElement.doOrientationChange = function() {
                window.setTimeout(outerElement.range.setValue, 0)
            };
            outerElement.doOrientationChange = outerElement.doOrientationChange.bind(outerElement);
            document.addEventListener("touchmove", outerElement.moveSlider, false);
            bb.documentListeners.push({name: "touchmove", eventHandler: outerElement.moveSlider});
            document.addEventListener("touchend", outerElement.inner.animateEnd, false);
            bb.documentListeners.push({name: "touchend", eventHandler: outerElement.inner.animateEnd});
            window.addEventListener("resize", outerElement.doOrientationChange, false);
            bb.windowListeners.push({name: "resize", eventHandler: outerElement.doOrientationChange})
        }
    }};
_bb10_textInput = {apply: function(e) {
        for (var t = 0; t < e.length; t++) {
            bb.textInput.style(e[t])
        }
    }, style: function(e) {
        var t = "", n = document.createElement("div");
        if (e.hasAttribute("class")) {
            t = e.getAttribute("class")
        }
        if (e.parentNode) {
            e.parentNode.insertBefore(n, e)
        }
        n.appendChild(e);
        n.input = e;
        n.setAttribute("data-bb-type", "input");
        n.normal = "bb-input-container";
        e.normal = t + " bb-input";
        e.focused = t + " bb-input bb-input-focused";
        if (e.disabled) {
            e.setAttribute("class", e.normal + " bb-input-disabled")
        } else {
            e.setAttribute("class", e.normal)
        }
        e.isFocused = false;
        e.clickCount = 0;
        e.container = n;
        e.clearBtn = e.getAttribute("data-bb-clear") != "none";
        e.hasClearBtn = false;
        if (e.type) {
            var r = e.type.toLowerCase();
            if (r == "date" || r == "time" || r == "datetime" || r == "month" || r == "datetime-local" || r == "color" || r == "search") {
                e.clearBtn = false;
                if (bb.device.newerThan10dot1) {
                    n.style.padding = "0px";
                    n.style["border-width"] = "0px";
                    n.style["background-color"] = "transparent"
                }
            }
        }
        if (e.disabled) {
            n.setAttribute("class", n.normal + " bb-input-container-disabled")
        } else {
            n.setAttribute("class", n.normal)
        }
        e.doFocus = function() {
            if (this.readOnly == false) {
                this.container.setAttribute("class", this.container.normal + " bb-input-cancel-button bb-input-container-focused");
                if (this.clearBtn && this.value) {
                    this.setAttribute("class", this.focused);
                    this.hasClearBtn = true
                } else {
                    this.setAttribute("class", this.normal);
                    this.hasClearBtn = false
                }
                this.container.style["border-color"] = bb.options.highlightColor;
                this.isFocused = true;
                this.clickCount = 0;
                bb.screen.focusedInput = this
            }
        };
        e.doFocus = e.doFocus.bind(e);
        e.addEventListener("focus", e.doFocus, false);
        e.doBlur = function() {
            this.container.setAttribute("class", this.container.normal);
            if (this.clearBtn) {
                this.setAttribute("class", this.normal)
            }
            this.container.style["border-color"] = "";
            this.isFocused = false;
            bb.screen.focusedInput = null
        };
        e.doBlur = e.doBlur.bind(e);
        e.addEventListener("blur", e.doBlur, false);
        e.updateClearButton = function() {
            if (this.clearBtn) {
                if (this.value.length == 0 && this.hasClearBtn || this.value.length > 0 && !this.hasClearBtn)
                    e.doFocus()
            }
        };
        e.updateClearButton = e.updateClearButton.bind(e);
        e.addEventListener("input", e.updateClearButton, false);
        if (e.clearBtn) {
            e.container.ontouchstart = function(t) {
                if (t.target == this) {
                    t.preventDefault();
                    t.stopPropagation();
                    this.input.value = "";
                    e.doFocus();
                    var n = document.createEvent("HTMLEvents");
                    n.initEvent("change", false, true);
                    this.input.dispatchEvent(n)
                }
            }
        }
        e.show = function() {
            this.container.style.display = ""
        };
        e.show = e.show.bind(e);
        e.hide = function() {
            this.container.style.display = "none"
        };
        e.hide = e.hide.bind(e);
        e.remove = function() {
            if (this.container.parentNode) {
                this.container.parentNode.removeChild(this.container)
            }
        };
        e.remove = e.remove.bind(e);
        e.enable = function() {
            if (!this.disabled)
                return;
            this.disabled = false;
            this.container.setAttribute("class", this.container.normal);
            this.setAttribute("class", this.normal)
        };
        e.enable = e.enable.bind(e);
        e.disable = function() {
            if (this.disabled)
                return;
            this.disabled = true;
            this.container.setAttribute("class", this.container.normal + " bb-input-container-disabled");
            this.setAttribute("class", this.normal + " bb-input-disabled")
        };
        e.disable = e.disable.bind(e);
        return n
    }};
_bb10_toggle = {apply: function(e) {
        for (var t = 0; t < e.length; t++) {
            bb.toggle.style(e[t], true)
        }
    }, style: function(outerElement, offdom) {
        var table, tr, td, color = bb.screen.controlColor;
        outerElement.checked = false;
        outerElement.enabled = true;
        outerElement.buffer = bb.device.is1024x600 ? 35 : 70;
        outerElement.isActivated = false;
        outerElement.initialXPos = 0;
        outerElement.currentXPos = 0;
        outerElement.transientXPos = 0;
        outerElement.movedWithSlider = false;
        outerElement.startValue = false;
        if (outerElement.hasAttribute("data-bb-disabled")) {
            outerElement.enabled = !(outerElement.getAttribute("data-bb-disabled").toLowerCase() == "true")
        }
        outerElement.className = "bb-toggle";
        outerElement.outer = document.createElement("div");
        if (outerElement.enabled) {
            if (bb.device.newerThan10dot1) {
                outerElement.normal = "outer bb-toggle-outer-" + color + "-10dot2 bb-toggle-outer-enabled-" + color
            } else {
                outerElement.normal = "outer bb-toggle-outer-" + color + " bb-toggle-outer-enabled-" + color
            }
        } else {
            outerElement.normal = "outer bb-toggle-outer-" + color + " bb-toggle-outer-disabled"
        }
        outerElement.outer.setAttribute("class", outerElement.normal);
        outerElement.appendChild(outerElement.outer);
        outerElement.fill = document.createElement("div");
        outerElement.fill.className = "fill";
        outerElement.fill.style.background = outerElement.fill.dormant;
        outerElement.outer.appendChild(outerElement.fill);
        outerElement.inner = document.createElement("div");
        outerElement.inner.className = "inner";
        outerElement.inner.outerElement = outerElement;
        outerElement.fill.appendChild(outerElement.inner);
        table = document.createElement("table");
        table.className = "table";
        tr = document.createElement("tr");
        table.appendChild(tr);
        outerElement.inner.appendChild(table);
        td = document.createElement("td");
        td.className = "left";
        tr.appendChild(td);
        outerElement.yes = document.createElement("div");
        outerElement.yes.className = "yes";
        outerElement.yes.innerHTML = outerElement.getAttribute("data-bb-on");
        td.appendChild(outerElement.yes);
        td = document.createElement("td");
        td.className = "center";
        tr.appendChild(td);
        td = document.createElement("td");
        td.className = "right";
        tr.appendChild(td);
        outerElement.no = document.createElement("div");
        outerElement.no.className = "no";
        outerElement.no.innerHTML = outerElement.getAttribute("data-bb-off");
        td.appendChild(outerElement.no);
        outerElement.container = document.createElement("div");
        outerElement.container.className = "indicator-container";
        outerElement.appendChild(outerElement.container);
        outerElement.halo = document.createElement("div");
        outerElement.halo.className = "halo";
        outerElement.halo.style.background = "-webkit-gradient(radial, 50% 50%, 0, 50% 50%, 43, from(rgba(" + bb.options.shades.R + ", " + bb.options.shades.G + ", " + bb.options.shades.B + ", 0.15)), color-stop(0.8, rgba(" + bb.options.shades.R + ", " + bb.options.shades.G + ", " + bb.options.shades.B + ", 0.15)), to(rgba(" + bb.options.shades.R + ", " + bb.options.shades.G + ", " + bb.options.shades.B + ", 0.7)))";
        outerElement.container.appendChild(outerElement.halo);
        outerElement.indicator = document.createElement("div");
        if (outerElement.enabled) {
            outerElement.indicator.normal = "indicator bb-toggle-indicator-enabled-" + color
        } else {
            outerElement.indicator.normal = "indicator bb-toggle-indicator-disabled-" + color
        }
        outerElement.indicator.setAttribute("class", outerElement.indicator.normal);
        outerElement.container.appendChild(outerElement.indicator);
        if (outerElement.hasAttribute("onchange")) {
            outerElement.onchangeEval = outerElement.getAttribute("onchange");
            outerElement.onchange = function() {
                eval(this.onchangeEval)
            }
        }
        outerElement.inner.animateBegin = function(e) {
            if (!this.outerElement.enabled)
                return;
            if (this.outerElement.isActivated === false) {
                this.outerElement.startValue = this.outerElement.checked;
                this.outerElement.movedWithSlider = false;
                this.outerElement.isActivated = true;
                this.outerElement.initialXPos = e.touches[0].pageX;
                this.outerElement.halo.style["-webkit-transform"] = "scale(1)";
                this.outerElement.halo.style["-webkit-animation-name"] = "explode";
                this.outerElement.indicator.setAttribute("class", "indicator bb-toggle-indicator-enabled-" + color + " indicator-hover-" + color);
                this.outerElement.indicator.style.background = "-webkit-linear-gradient(top, rgb(" + bb.options.shades.R + ", " + bb.options.shades.G + ", " + bb.options.shades.B + ") 0%, rgb(" + (bb.options.shades.R + 16) + ", " + (bb.options.shades.G + 16) + ", " + (bb.options.shades.B + 16) + ") 100%)"
            }
        };
        outerElement.inner.animateBegin = outerElement.inner.animateBegin.bind(outerElement.inner);
        outerElement.inner.addEventListener("touchstart", outerElement.inner.animateBegin, false);
        outerElement.container.addEventListener("touchstart", outerElement.inner.animateBegin, false);
        outerElement.inner.animateEnd = function() {
            if (!this.outerElement.enabled)
                return;
            if (this.outerElement.isActivated === true) {
                this.outerElement.isActivated = false;
                this.outerElement.currentXPos = this.outerElement.transientXPos;
                this.outerElement.halo.style["-webkit-transform"] = "scale(0)";
                this.outerElement.halo.style["-webkit-animation-name"] = "implode";
                this.outerElement.indicator.setAttribute("class", "indicator bb-toggle-indicator-enabled-" + color);
                this.outerElement.indicator.style.background = "";
                this.outerElement.positionButton();
                if (this.outerElement.movedWithSlider) {
                    if (this.outerElement.startValue != this.outerElement.checked) {
                        if (this.outerElement.onchange) {
                            this.outerElement.onchange()
                        }
                    }
                }
            }
        };
        outerElement.inner.animateEnd = outerElement.inner.animateEnd.bind(outerElement.inner);
        outerElement.addEventListener("touchend", outerElement.inner.animateEnd, false);
        outerElement.moveToggle = function(e) {
            if (!this.enabled)
                return;
            if (this.isActivated === true) {
                this.movedWithSlider = true;
                e.stopPropagation();
                e.preventDefault();
                var t = parseInt(window.getComputedStyle(this.fill).width) - this.buffer, n;
                this.transientXPos = this.currentXPos + e.touches[0].pageX - this.initialXPos;
                this.transientXPos = Math.max(0, Math.min(this.transientXPos, t));
                this.inner.style["-webkit-transform"] = "translate3d(" + this.transientXPos + "px,0px,0px)";
                this.container.style["-webkit-transform"] = "translate3d(" + this.transientXPos + "px,0px,0px)";
                n = this.transientXPos / t;
                this.checked = n > .5
            }
        };
        outerElement.moveToggle = outerElement.moveToggle.bind(outerElement);
        outerElement.doClick = function() {
            if (!this.enabled)
                return;
            if (!this.movedWithSlider) {
                this.setChecked(!this.checked)
            }
        };
        outerElement.doClick = outerElement.doClick.bind(outerElement);
        outerElement.addEventListener("click", outerElement.doClick, false);
        outerElement.positionButton = function() {
            var e = this.checked ? parseInt(window.getComputedStyle(this.fill).width) - this.buffer : 0;
            this.inner.style["-webkit-transform"] = "translate3d(" + e + "px,0px,0px)";
            this.inner.style["-webkit-transition-duration"] = "0.1s";
            this.inner.style["-webkit-transition-timing-function"] = "linear";
            this.inner.addEventListener("webkitTransitionEnd", function() {
                this.style["-webkit-transition"] = ""
            });
            this.container.style["-webkit-transform"] = "translate3d(" + e + "px,0px,0px)";
            this.container.style["-webkit-transition-duration"] = "0.1s";
            this.container.style["-webkit-transition-timing-function"] = "linear";
            this.container.addEventListener("webkitTransitionEnd", function() {
                this.style["-webkit-transition"] = ""
            });
            if (this.checked && this.enabled) {
                this.indicator.style["background-image"] = "-webkit-linear-gradient(top, " + bb.options.highlightColor + " 0%, " + bb.options.shades.darkHighlight + " 100%)"
            } else {
                this.indicator.style["background-image"] = ""
            }
            this.currentXPos = e
        };
        outerElement.positionButton = outerElement.positionButton.bind(outerElement);
        outerElement.setChecked = function(e) {
            if (e != this.checked) {
                this.checked = e;
                if (this.onchange) {
                    this.onchange()
                }
            }
            this.positionButton()
        };
        outerElement.setChecked = outerElement.setChecked.bind(outerElement);
        outerElement.getChecked = function() {
            return this.checked
        };
        outerElement.getChecked = outerElement.getChecked.bind(outerElement);
        outerElement.show = function() {
            this.style.display = "block";
            bb.refresh()
        };
        outerElement.show = outerElement.show.bind(outerElement);
        outerElement.hide = function() {
            this.style.display = "none";
            bb.refresh()
        };
        outerElement.hide = outerElement.hide.bind(outerElement);
        outerElement.remove = function() {
            this.parentNode.removeChild(this);
            bb.refresh()
        };
        outerElement.remove = outerElement.remove.bind(outerElement);
        outerElement.setOnCaption = function(e) {
            this.yes.innerHTML = e
        };
        outerElement.setOnCaption = outerElement.setOnCaption.bind(outerElement);
        outerElement.setOffCaption = function(e) {
            this.no.innerHTML = e
        };
        outerElement.setOffCaption = outerElement.setOffCaption.bind(outerElement);
        outerElement.getOnCaption = function() {
            return this.yes.innerHTML
        };
        outerElement.getOnCaption = outerElement.getOnCaption.bind(outerElement);
        outerElement.getOffCaption = function() {
            return this.no.innerHTML
        };
        outerElement.getOffCaption = outerElement.getOffCaption.bind(outerElement);
        outerElement.enable = function() {
            if (this.enabled)
                return;
            this.enabled = true;
            this.indicator.normal = "indicator bb-toggle-indicator-enabled-" + color;
            this.indicator.setAttribute("class", this.indicator.normal);
            if (bb.device.newerThan10dot1) {
                this.normal = "outer bb-toggle-outer-" + color + "-10dot2 bb-toggle-outer-enabled-" + color
            } else {
                this.normal = "outer bb-toggle-outer-" + color + " bb-toggle-outer-enabled-" + color
            }
            this.outer.setAttribute("class", this.normal);
            this.positionButton()
        };
        outerElement.enable = outerElement.enable.bind(outerElement);
        outerElement.disable = function() {
            if (!this.enabled)
                return;
            this.enabled = false;
            this.indicator.normal = "indicator bb-toggle-indicator-disabled-" + color;
            this.indicator.setAttribute("class", this.indicator.normal);
            this.normal = "outer bb-toggle-outer-" + color + " bb-toggle-outer-disabled";
            this.outer.setAttribute("class", this.normal);
            this.positionButton()
        };
        outerElement.disable = outerElement.disable.bind(outerElement);
        outerElement.checked = outerElement.hasAttribute("data-bb-checked") ? outerElement.getAttribute("data-bb-checked").toLowerCase() == "true" : false;
        if (offdom) {
            outerElement.onbbuidomready = function() {
                this.positionButton();
                document.removeEventListener("bbuidomready", this.onbbuidomready, false)
            };
            outerElement.onbbuidomready = outerElement.onbbuidomready.bind(outerElement);
            document.addEventListener("bbuidomready", outerElement.onbbuidomready, false)
        } else {
            setTimeout(outerElement.positionButton, 0)
        }
        document.addEventListener("touchmove", outerElement.moveToggle, false);
        bb.documentListeners.push({name: "touchmove", eventHandler: outerElement.moveToggle});
        document.addEventListener("touchend", outerElement.inner.animateEnd, false);
        bb.documentListeners.push({name: "touchend", eventHandler: outerElement.inner.animateEnd});
        return outerElement
    }};
_bb_PlayBook_10_scrollPanel = {apply: function(e) {
        var t, n, r, i, s, o;
        for (t = 0; t < e.length; t++) {
            r = e[t];
            o = [];
            s = document.createElement("div");
            r.appendChild(s);
            for (n = 0; n < r.childNodes.length - 1; n++) {
                o.push(r.childNodes[n])
            }
            for (n = 0; n < o.length; n++) {
                s.appendChild(o[n])
            }
            if (bb.device.isPlayBook) {
                r.scroller = new iScroll(r, {vScrollbar: true, hideScrollbar: true, fadeScrollbar: true, onBeforeScrollStart: function(e) {
                        if (bb.scroller) {
                            bb.scroller.disable()
                        }
                        e.preventDefault()
                    }, onBeforeScrollEnd: function(e) {
                        if (bb.scroller) {
                            bb.scroller.enable()
                        }
                    }, onScrollEnd: function(e) {
                        evt = document.createEvent("Events");
                        evt.initEvent("bbuiscrolling", true, true);
                        document.dispatchEvent(evt)
                    }, onScrollMove: function(e) {
                        if (r.onscroll) {
                            r.onscroll(e)
                        }
                        evt = document.createEvent("Events");
                        evt.initEvent("bbuiscrolling", true, true);
                        document.dispatchEvent(evt)
                    }})
            } else {
                r.scroller = null;
                r.style["-webkit-overflow-scrolling"] = "-blackberry-touch";
                r.addEventListener("scroll", function() {
                    evt = document.createEvent("Events");
                    evt.initEvent("bbuiscrolling", true, true);
                    document.dispatchEvent(evt);
                    if (this.timeout) {
                        clearTimeout(this.timeout)
                    } else {
                        this.style["padding-right"] = "1px"
                    }
                    this.timeout = setTimeout(this.resetPadding, 20)
                }, false);
                r.resetPadding = function() {
                    this.style["padding-right"] = "0px";
                    this.timeout = null
                };
                r.resetPadding = r.resetPadding.bind(r)
            }
            r.show = function() {
                this.style.display = "block";
                bb.refresh()
            };
            r.show = r.show.bind(r);
            r.hide = function() {
                this.style.display = "none";
                bb.refresh()
            };
            r.hide = r.hide.bind(r);
            r.remove = function() {
                this.parentNode.removeChild(this);
                bb.refresh()
            };
            r.remove = r.remove.bind(r);
            r.refresh = function() {
                if (this.scroller) {
                    this.scroller.refresh()
                }
            };
            r.refresh = r.refresh.bind(r);
            setTimeout(r.refresh, 0);
            r.scrollTo = function(e, t) {
                if (this.scroller) {
                    this.scroller.scrollTo(e, t)
                } else {
                    this.scrollTop = e
                }
            };
            r.scrollTo = r.scrollTo.bind(r);
            r.scrollToElement = function(e) {
                if (this.scroller) {
                    this.scroller.scrollToElement(e)
                } else {
                    if (!e)
                        return;
                    var t = 0, n = e;
                    if (n.offsetParent) {
                        do {
                            t += n.offsetTop
                        } while (n = n.offsetParent)
                    }
                    this.scrollTo(t, 0)
                }
            };
            r.scrollToElement = r.scrollToElement.bind(r);
            r.setAttribute("class", "bb-scroll-panel")
        }
    }};
_PlayBook_contextMenu = {create: function(e) {
        var t = 300;
        if (bb.device.is1024x600) {
            t = 100
        } else if (bb.device.is720x720) {
            t = 300
        }
        var n = document.createElement("div"), r = document.createElement("div"), i = document.createElement("div"), s;
        n.setAttribute("class", "bb-context-menu bb-context-menu-dark");
        n.actions = [];
        n.hideEvents = [];
        n.threshold = t;
        n.visible = false;
        n.overlay = document.createElement("div");
        n.overlay.threshold = t;
        n.overlay.setAttribute("class", "bb-context-menu-overlay");
        n.overlay.menu = n;
        e.appendChild(n.overlay);
        n.overlay.ontouchmove = function(e) {
            if (!this.menu.peeking)
                return;
            var t = e.touches[0];
            if (this.startPos && this.startPos - t.pageX > this.threshold) {
                this.menu.show(this.menu.selected);
                this.closeMenu = false
            }
        };
        n.overlay.ontouchend = function() {
            if (this.closeMenu) {
                this.menu.hide();
                event.preventDefault()
            }
        };
        n.overlay.ontouchstart = function(e) {
            this.closeMenu = true;
            if (!this.menu.peeking && this.menu.visible) {
                e.preventDefault()
            } else if (!this.menu.peeking)
                return;
            var t = e.touches[0];
            this.startPos = t.pageX;
            e.preventDefault()
        };
        s = document.createElement("div");
        s.setAttribute("class", "bb-context-menu-item bb-context-menu-header-dark");
        n.header = s;
        n.appendChild(s);
        r.setAttribute("class", "bb-context-menu-header-title bb-context-menu-header-title-dark");
        r.style.width = _PlayBook_contextMenu.getWidth() - 20 + "px";
        n.topTitle = r;
        s.appendChild(r);
        i.setAttribute("class", "bb-context-menu-header-description");
        i.style.width = _PlayBook_contextMenu.getWidth() - 20 + "px";
        n.description = i;
        s.appendChild(i);
        n.scrollContainer = document.createElement("div");
        n.scrollContainer.setAttribute("class", "bb-context-menu-scroller");
        n.appendChild(n.scrollContainer);
        n.style.left = _PlayBook_contextMenu.getLeft();
        n.show = function(e) {
            if (e) {
                this.header.style.display = "";
                this.header.style.visibility = "";
                if (e.title) {
                    this.topTitle.innerHTML = e.title
                }
                if (e.description) {
                    this.description.innerHTML = e.description
                }
                this.selected = e;
                n.scrollContainer.style.top = bb.device.isPlayBook ? "64px" : "130px"
            } else {
                this.header.style.display = "none";
                this.selected = undefined;
                n.scrollContainer.style.top = "0px"
            }
            n.scrollContainer.style["overflow-y"] = "scroll";
            n.scrollContainer.style["overflow-x"] = "hidden";
            n.scrollContainer.style["-webkit-overflow-scrolling"] = "-blackberry-touch";
            this.peeking = false;
            this.overlay.style.display = "inline";
            this.style["-webkit-transition"] = "all 0.3s ease-in-out";
            this.style["-webkit-transform"] = "translate(-" + _PlayBook_contextMenu.getWidth() + "px, 0)";
            this.style["-webkit-backface-visibility"] = "hidden";
            this.style["-webkit-perspective"] = "1000";
            this.addEventListener("touchstart", this.touchHandler, false);
            this.onclick = function() {
                this.hide()
            };
            this.header.addEventListener("click", this.hide, false);
            this.style.visibility = "visible";
            this.visible = true;
            if (bb.device.isPlayBook) {
                blackberry.app.event.onSwipeDown("")
            } else {
                blackberry.event.removeEventListener("swipedown", bb.menuBar.showMenuBar)
            }
        };
        n.show = n.show.bind(n);
        n.hide = function() {
            this.overlay.style.display = "none";
            this.removeEventListener("touchstart", this.touchHandler, false);
            this.removeEventListener("touchmove", this.touchMoveHandler, false);
            this.style["-webkit-transition"] = "all 0.5s ease-in-out";
            this.style["-webkit-transform"] = "translate(" + _PlayBook_contextMenu.getWidth() + "px, 0px)";
            this.style["-webkit-backface-visibility"] = "hidden";
            this.style["-webkit-perspective"] = "1000";
            if (!this.peeking) {
                this.header.removeEventListener("click", this.hide, false)
            }
            this.peeking = false;
            this.visible = false;
            n.scrollContainer.style["overflow-y"] = "";
            n.scrollContainer.style["overflow-x"] = "";
            n.scrollContainer.style["-webkit-overflow-scrolling"] = "";
            for (var e = n.hideEvents.length - 1; e >= 0; e--) {
                n.hideEvents[e]();
                n.hideEvents.pop()
            }
            if (bb.device.isPlayBook) {
                for (var e = 0; e < this.actions.length; e++) {
                    this.actions[e].ontouchend()
                }
            }
            if (bb.device.isPlayBook) {
                blackberry.app.event.onSwipeDown(bb.menuBar.showMenuBar)
            } else {
                blackberry.event.addEventListener("swipedown", bb.menuBar.showMenuBar)
            }
        };
        n.hide = n.hide.bind(n);
        n.peek = function(e) {
            if (e) {
                this.header.style.display = "";
                if (e.title) {
                    this.topTitle.innerHTML = e.title
                }
                if (e.description) {
                    this.description.innerHTML = e.description
                }
                this.selected = e;
                n.scrollContainer.style.top = bb.device.isPlayBook ? "64px" : "130px"
            } else {
                n.scrollContainer.style.top = "0px"
            }
            this.header.style.visibility = "hidden";
            this.header.style["margin-bottom"] = "-" + Math.floor(this.header.offsetHeight / 2) + "px";
            this.peeking = true;
            this.overlay.style.display = "inline";
            this.style["-webkit-transition"] = "all 0.3s ease-in-out";
            this.style["-webkit-transform"] = "translate(-" + _PlayBook_contextMenu.getPeekWidth() + ", 0)";
            this.style["-webkit-backface-visibility"] = "hidden";
            this.style["-webkit-perspective"] = "1000";
            this.addEventListener("touchstart", this.touchHandler, false);
            this.addEventListener("touchmove", this.touchMoveHandler, false);
            this.onclick = function(e) {
                if (e.target == this || e.target == this.scrollContainer) {
                    this.show(this.selected)
                }
            };
            this.header.removeEventListener("click", this.hide, false);
            this.style.visibility = "visible";
            this.visible = true;
            if (bb.device.isPlayBook) {
                blackberry.app.event.onSwipeDown("")
            } else {
                blackberry.event.removeEventListener("swipedown", bb.menuBar.showMenuBar)
            }
        };
        n.peek = n.peek.bind(n);
        n.clearWWcontextMenu = function() {
        };
        n.clearWWcontextMenu = n.clearWWcontextMenu.bind(n);
        n.touchHandler = function(e) {
            if (this.peeking) {
                var t = e.touches[0];
                this.startPos = t.pageX;
                if (e.target == this.scrollContainer) {
                } else if (e.target.parentNode == this.scrollContainer && e.target != this.header) {
                    e.preventDefault();
                    e.stopPropagation()
                }
            }
        };
        n.touchHandler = n.touchHandler.bind(n);
        n.touchMoveHandler = function(e) {
            if (!this.peeking)
                return;
            var t = e.touches[0];
            if (this.startPos && this.startPos - t.pageX > this.threshold) {
                this.show(this.selected)
            }
        };
        n.touchMoveHandler = n.touchMoveHandler.bind(n);
        n.onclick = function(e) {
            if (this.peeking) {
                this.show(this.selected);
                e.stopPropagation()
            }
        };
        n.centerMenuItems = function() {
            var e = bb.innerHeight(), t = 111, n, r = 0, i = 0, s, o = true, u;
            if (bb.device.isPlayBook) {
                t = 53
            } else if (bb.device.is720x720) {
                t = 80
            } else if (bb.device.is1280x720) {
                t = 91
            }
            i = this.actionBar == undefined ? t : 0;
            for (s = 0; s < this.actions.length; s++) {
                u = this.actions[s];
                if (u.visible == true) {
                    r++;
                    if (o && this.pinnedAction != u) {
                        o = false;
                        u.setAttribute("class", u.normal + " bb-context-menu-item-first-dark");
                        u.isFirst = true
                    } else if (this.pinnedAction != u) {
                        u.setAttribute("class", u.normal)
                    }
                }
            }
            r = this.pinnedAction ? r - 1 : r;
            n = e - Math.floor(e / 2) - Math.floor(r * t / 2) - i;
            if (n < 0)
                n = 0;
            this.scrollContainer.style["padding-top"] = n + "px"
        };
        n.centerMenuItems = n.centerMenuItems.bind(n);
        n.orientationChanged = function(e) {
            this.style["-webkit-transition"] = "";
            this.style.left = bb.innerWidth() + "px";
            this.style.height = bb.innerHeight() + "px";
            this.centerMenuItems()
        };
        n.orientationChanged = n.orientationChanged.bind(n);
        window.addEventListener("orientationchange", n.orientationChanged, false);
        bb.windowListeners.push({name: "orientationchange", eventHandler: n.orientationChanged});
        n.addEventListener("webkitTransitionEnd", function() {
            if (!this.visible) {
                this.style.visibility = "hidden"
            }
        });
        n.add = function(e) {
            var t, n, r = e.innerHTML, i = false;
            t = "bb-context-menu-item bb-context-menu-item-dark";
            if (e.hasAttribute("data-bb-visible") && e.getAttribute("data-bb-visible").toLowerCase() == "false") {
                e.visible = false;
                e.style.display = "none"
            } else {
                e.visible = true
            }
            this.actions.push(e);
            i = e.hasAttribute("data-bb-pin") && e.getAttribute("data-bb-pin").toLowerCase() == "true";
            if (i && !this.pinnedAction) {
                t = t + " bb-context-menu-item-first-dark";
                e.style["bottom"] = "-2px";
                e.style.position = "absolute";
                e.style.width = "100%";
                this.pinnedAction = e;
                this.appendChild(e);
                if (bb.device.isPlayBook) {
                    this.scrollContainer.style.bottom = "64px"
                } else if (bb.device.is720x720) {
                    this.scrollContainer.style.bottom = "95px"
                } else {
                    this.scrollContainer.style.bottom = "130px"
                }
            } else {
                this.scrollContainer.appendChild(e)
            }
            n = t + " bb-context-menu-item-hover";
            e.normal = t;
            e.highlight = n;
            e.innerHTML = "";
            var s = document.createElement("div"), o = document.createElement("img");
            o.setAttribute("src", e.getAttribute("data-bb-img"));
            o.setAttribute("class", "bb-context-menu-item-image");
            e.img = o;
            e.appendChild(o);
            s.setAttribute("class", "bb-context-menu-item-inner");
            e.appendChild(s);
            s.innerHTML = r;
            e.display = s;
            e.menu = this;
            e.setAttribute("class", t);
            e.ontouchstart = function(e) {
                if (this.menu.peeking) {
                    this.style["border-left-color"] = bb.options.highlightColor
                } else {
                    this.style["background-color"] = bb.options.highlightColor
                }
                e.stopPropagation();
                if (bb.device.isPlayBook) {
                    var t, n;
                    for (n = 0; n < this.menu.actions.length; n++) {
                        t = this.menu.actions[n];
                        if (t != this) {
                            t.ontouchend()
                        }
                    }
                }
            };
            e.ontouchend = function() {
                if (this.menu.peeking) {
                    this.style["border-left-color"] = "transparent"
                } else {
                    this.style["background-color"] = ""
                }
            };
            e.addEventListener("click", this.hide, false);
            e.setCaption = function(e) {
                this.display.innerHTML = e
            };
            e.setCaption = e.setCaption.bind(e);
            e.setImage = function(e) {
                this.img.setAttribute("src", e)
            };
            e.setImage = e.setImage.bind(e);
            e.hide = function() {
                if (!this.visible)
                    return;
                this.visible = false;
                this.style.display = "none";
                this.menu.centerMenuItems()
            };
            e.hide = e.hide.bind(e);
            e.show = function() {
                if (this.visible)
                    return;
                this.visible = true;
                this.style.display = "";
                this.menu.centerMenuItems()
            };
            e.show = e.show.bind(e)
        };
        n.add = n.add.bind(n);
        return n
    }, getWidth: function() {
        if (bb.device.isPlayBook) {
            return"300"
        } else {
            return"563"
        }
    }, getPeekWidth: function() {
        if (bb.device.isPlayBook) {
            return"55px"
        } else {
            return"121px"
        }
    }, getLeft: function() {
        return window.innerWidth + 3 + "px"
    }}
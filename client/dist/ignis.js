/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 99:
/***/ (function() {

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
System.register("I_life_hooks", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            ;
        }
    };
});
System.register("Manager", ["morphdom"], function (exports_2, context_2) {
    "use strict";
    var morphdom_1, Manager, ATTR_USE_PREV_VALUE, options, D, getById, H, El;
    var __moduleName = context_2 && context_2.id;
    function crEl(t, a, s, e) { e = D.createElement(t); setArray(a, function (i, v) { e[v[0]] = v[1]; }); if (s) {
        e.appendChild(D.createTextNode(s));
    } return e; }
    function setArray(a, f) { for (var i = 0, l = a.length; i < l; i++) {
        if (a[i] !== undefined) {
            f(i, a[i]);
        }
    } }
    function addCss(code, file_url) {
        if (code) {
            H.appendChild(crEl('style', [], code));
        }
        if (file_url) {
            var link = D.createElement('link');
            // link.id   = cssId;
            link.rel = 'stylesheet';
            // link.type = 'text/css';
            link.href = file_url;
            // link.media = 'all';
            H.appendChild(link);
        }
    }
    return {
        setters: [
            function (morphdom_1_1) {
                morphdom_1 = morphdom_1_1;
            }
        ],
        execute: function () {
            Manager = /** @class */ (function () {
                function Manager(life_hooks) {
                    this.life_hooks = life_hooks;
                }
                Manager.prototype.get_target = function (e) { return e && e.target || e.srcElement; };
                Manager.prototype.append = function ($els) {
                    var _this = this;
                    this.list = this.list.concat($els.map(function ($el) { return _this._add_listener($el); }));
                };
                Manager.prototype._add_listener = function ($el) {
                    this._subscribe($el);
                    return new El($el);
                };
                Manager.prototype._subscribe = function ($el) {
                    var _this = this;
                    var event_name = $el.getAttribute('data-i-ev').split('->')[0];
                    var cb;
                    if (event_name === 'submit') {
                        cb = function (e) {
                            _this._cb_form(e, $el);
                        };
                    }
                    else {
                        cb = function (e) {
                            _this._cb_el(e, $el);
                        };
                    }
                    $el.addEventListener(event_name, cb);
                };
                Manager.prototype._cb_form = function (e, $el) {
                };
                Manager.prototype._cb_el = function (e, $el) {
                };
                Manager.prototype.add_special_params = function (url, _a) {
                    var id = _a.id, output_id = _a.output_id;
                    var url_obj = this._create_url_obj(url);
                    if (id) {
                        url_obj.searchParams.append('__self_id', id);
                    }
                    if (output_id) {
                        url_obj.searchParams.append('__output_id', output_id);
                    }
                    return url_obj.href;
                };
                Manager.prototype.form_add_to_url = function (url, data) {
                    var url_obj = this._create_url_obj(url);
                    Object.keys(data).forEach(function (k) {
                        url_obj.searchParams.append(k, data[k]);
                    });
                    return url_obj.href;
                };
                Manager.prototype._exec = function (_a, url) {
                    var ev = _a.ev, data = _a.data;
                    if (ev === 'update') {
                        var html = data.html, css = data.css;
                        var id = this._extract_id(html);
                        console.log({ id: id, html: html });
                        this._apply_css(css, url);
                        // this._list.find(({ el }) => el === $el).unsubscribe();
                        // this._list = this._list.filter(({ el }) => el !== $el);
                        this.render(id, html);
                        // this._list.push(this._add_listener(document.getElementById(id)));
                    }
                    else if (ev === 'remove') {
                        getById(data.id).outerHTML = '';
                    }
                    else if (ev === 'append_to_top') {
                        var id = data.id, html = data.html, css = data.css;
                        this._apply_css(css, url);
                        getById(id).insertAdjacentHTML('afterbegin', html);
                    }
                    else if (ev === 'append_to_end') {
                        var id = data.id, html = data.html, css = data.css;
                        this._apply_css(css, url);
                        getById(id).insertAdjacentHTML('beforeend', html);
                    }
                    else {
                        throw new Error('Invalid command ' + JSON.stringify({ ev: ev, data: data }));
                    }
                };
                Manager.prototype.handle_response = function (_a) {
                    var _this = this;
                    var config = _a.config, data = _a.data;
                    var url_obj = new URL(config.url);
                    var url = url_obj.origin + url_obj.pathname;
                    if (data instanceof Array) {
                        data.forEach(function (cmd) { return _this._exec(cmd, url); });
                    }
                    else if (data) {
                        this._exec({ ev: 'update', data: { html: data, css: null } }, url);
                    }
                    // We store requested url for avoid repeat adding css
                    // this._hash_requested_url[url] = true;
                };
                Manager.prototype.handler_error = function (err) {
                    this.life_hooks.onError(err);
                };
                Manager.prototype.render = function (id, html) {
                    morphdom_1.default(getById(id), html, options);
                };
                Manager.prototype._is_absolute_url = function (url) {
                    return new RegExp('^(https?:)?//').test(url);
                };
                Manager.prototype._create_url_obj = function (url) {
                    return this._is_absolute_url(url) ? new URL(url) : new URL(url, document.baseURI);
                };
                Manager.prototype._apply_css = function (css, _url) {
                    // if (css && !this._hash_requested_url[url]) {
                    if (css) {
                        addCss(css);
                    }
                };
                Manager.prototype._extract_id = function (html) {
                    var m = html.match(/d=([^>\s]+)/);
                    var id = m[1];
                    if (!id) {
                        throw new Error('Not found id in html: ' + html);
                    }
                    return id;
                };
                return Manager;
            }());
            exports_2("default", Manager);
            ATTR_USE_PREV_VALUE = 'data-i-preserve';
            options = {
                onBeforeElUpdated: function (fromEl, toEl) {
                    if (toEl.tagName === 'INPUT') {
                        var use_prev_value = toEl.hasAttribute(ATTR_USE_PREV_VALUE);
                        if ((toEl.type === 'checkbox' || toEl.type === 'radio') && use_prev_value) {
                            toEl.checked = fromEl.checked;
                        }
                        else if (toEl.type === 'file' && use_prev_value) {
                            toEl.files = fromEl.files;
                        }
                        else if (use_prev_value) {
                            toEl.value = fromEl.value;
                        }
                    }
                    else if (toEl.tagName === 'SELECT' && toEl.hasAttribute(ATTR_USE_PREV_VALUE)) {
                        toEl.value = fromEl.value;
                    }
                }
            };
            D = document;
            getById = function (id) { return document.getElementById(id); };
            H = D.getElementsByTagName('head')[0];
            El = /** @class */ (function () {
                function El($el) {
                    this.$el = $el;
                }
                return El;
            }());
        }
    };
});
System.register("Manager_El", ["forms_to_json", "Manager", "./Manager_Long_Request"], function (exports_3, context_3) {
    "use strict";
    var forms_to_json_1, Manager_1, Manager_Long_Request_1, Manager_Form;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (forms_to_json_1_1) {
                forms_to_json_1 = forms_to_json_1_1;
            },
            function (Manager_1_1) {
                Manager_1 = Manager_1_1;
            },
            function (Manager_Long_Request_1_1) {
                Manager_Long_Request_1 = Manager_Long_Request_1_1;
            }
        ],
        execute: function () {
            Manager_Form = /** @class */ (function (_super) {
                __extends(Manager_Form, _super);
                function Manager_Form(life_hooks, axios) {
                    var _this = _super.call(this, life_hooks) || this;
                    _this.axios = axios;
                    return _this;
                }
                Manager_Form.get_selector = function () {
                    return '[data-i-ev]';
                };
                Manager_Form.get_els = function (node) {
                    if (node === void 0) { node = document; }
                    return Array.from(node.querySelectorAll(Manager_Form.get_selector()));
                };
                Manager_Form.prototype.start = function () {
                    var $els = Manager_Form.get_els();
                    this.append($els);
                    // this._list = this.$els.map($el => this._add_listener($el));
                    return this;
                };
                // _add_listener($el) {
                //   this._subscribe($el);
                //   return new El_form($el);
                // }
                Manager_Form.prototype._cb_form = function (e, $el) {
                    var _a;
                    e.preventDefault();
                    var axios = this.axios;
                    var id = $el.id;
                    var output_id = $el.getAttribute('data-i-output-id');
                    var _b = $el.getAttribute('data-i-ev').split('->'), method = _b[0], url = _b[1];
                    var enctype = (_a = $el.getAttribute('data-i-enctype')) === null || _a === void 0 ? void 0 : _a.trim();
                    method = method.trim();
                    if (!output_id) {
                        throw new Error('Not found id = ' + output_id);
                    }
                    if (!['GET', 'DELETE', 'POST', 'PUT'].includes(method)) {
                        throw new Error('Not valid method ' + method);
                    }
                    var $form = this.get_target(e);
                    var req;
                    url = this.add_special_params(url, { id: id, output_id: output_id });
                    if (method === 'GET' || method === 'DELETE') {
                        // TODO: encode query params
                        var json = new forms_to_json_1.default($form).parse();
                        console.log(json, method, url);
                        url = this.form_add_to_url(url, json);
                        req = axios[method.toLowerCase()](url);
                    }
                    else { // POST, PUT
                        if (enctype === 'multipart/form-data') {
                            var formdata = new FormData($form);
                            console.log(formdata, method, url, output_id);
                            req = axios[method.toLowerCase()](url, formdata);
                        }
                        else {
                            var json = new forms_to_json_1.default($form).parse();
                            console.log(json, method, url, output_id);
                            req = axios[method.toLowerCase()](url, json);
                        }
                    }
                    var manager_long_request = new Manager_Long_Request_1.default(this.life_hooks.longRequest).start();
                    req.then(this.handle_response.bind(this)).catch(this.handler_error.bind(this)).finally(manager_long_request.end.bind(manager_long_request));
                };
                Manager_Form.prototype._cb_el = function (e, $el) {
                    e.preventDefault();
                    var axios = this.axios;
                    var id = $el.id;
                    var output_id = $el.getAttribute('data-i-output-id');
                    var _a = $el.getAttribute('data-i-ev').split('->'), _ = _a[0], method = _a[1], url = _a[2];
                    if (!['GET', 'POST', 'PUT', 'DELETE'].includes(method)) {
                        throw new Error('Not valid method ' + method);
                    }
                    console.log(method, url, output_id);
                    url = this.add_special_params(url, { id: id, output_id: output_id });
                    var req;
                    var str_data = $el.getAttribute('data-i-data');
                    var json = str_data ? JSON.parse(str_data) : {};
                    if (method === 'GET' || method === 'DELETE') {
                        console.log(json, method, url);
                        url = this.form_add_to_url(url, json);
                        req = axios[method.toLowerCase()](url);
                    }
                    else if (method === 'POST' || method === 'PUT') {
                        req = axios[method.toLowerCase()](url, json);
                    }
                    var manager_long_request = new Manager_Long_Request_1.default(this.life_hooks.longRequest).start();
                    req.then(this.handle_response.bind(this)).catch(this.handler_error.bind(this)).finally(manager_long_request.end.bind(manager_long_request));
                };
                return Manager_Form;
            }(Manager_1.default));
            exports_3("default", Manager_Form);
        }
    };
});
System.register("ignis", ["axios", "Manager_El"], function (exports_4, context_4) {
    "use strict";
    var axios_1, Manager_El_1;
    var __moduleName = context_4 && context_4.id;
    function start(options) {
        var _a;
        if (options === void 0) { options = {}; }
        var life_hooks = {
            onError: options.onError || function () { },
            longRequest: options.longRequest || {
                start: function () { },
                end: function () { }
            },
        };
        var timeout = (_a = options.requestTimeout) !== null && _a !== void 0 ? _a : 0;
        var req = axios_1.default.create({ timeout: timeout });
        var manager_el = new Manager_El_1.default(life_hooks, req).start();
        // const manager_event = new Manager_Event(life_hooks, req).start();
        var observer = new MutationObserver(function (mutationRecords) {
            for (var _i = 0, mutationRecords_1 = mutationRecords; _i < mutationRecords_1.length; _i++) {
                var mutation = mutationRecords_1[_i];
                // console.log(mutation);
                for (var _a = 0, _b = Array.from(mutation.addedNodes); _a < _b.length; _a++) {
                    var node = _b[_a];
                    // отслеживаем только узлы-элементы, другие (текстовые) пропускаем
                    if (!(node instanceof HTMLElement)) {
                        continue;
                    }
                    // проверить, не является ли вставленный элемент примером кода
                    if (node.matches(Manager_El_1.default.get_selector())) {
                        manager_el.append([node]);
                    }
                    // if (node.matches(Manager_Event.get_selector())) {
                    //   manager_event.append([ node ]);
                    // }
                    // или, может быть, пример кода есть в его поддереве?
                    manager_el.append(Manager_El_1.default.get_els(node));
                    // manager_event.append(Manager_Event.get_els(node));
                }
            }
        });
        // наблюдать за всем, кроме атрибутов
        observer.observe(document.body, {
            childList: true,
            subtree: true, // и более глубокими потомками
            // attributes: true,
        });
    }
    return {
        setters: [
            function (axios_1_1) {
                axios_1 = axios_1_1;
            },
            function (Manager_El_1_1) {
                Manager_El_1 = Manager_El_1_1;
            }
        ],
        execute: function () {
            exports_4("default", { start: start });
        }
    };
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/
/************************************************************************/
/******/
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__[99]();
/******/ 	module.exports = __webpack_exports__;
/******/
/******/ })()
;
(()=>{var e={669:(e,t,r)=>{e.exports=r(609)},448:(e,t,r)=>{"use strict";var n=r(867),o=r(26),s=r(372),i=r(327),a=r(97),u=r(109),c=r(985),l=r(61),f=r(655),d=r(263);e.exports=function(e){return new Promise((function(t,r){var h,p=e.data,m=e.headers,v=e.responseType;function g(){e.cancelToken&&e.cancelToken.unsubscribe(h),e.signal&&e.signal.removeEventListener("abort",h)}n.isFormData(p)&&delete m["Content-Type"];var b=new XMLHttpRequest;if(e.auth){var _=e.auth.username||"",y=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";m.Authorization="Basic "+btoa(_+":"+y)}var w=a(e.baseURL,e.url);function E(){if(b){var n="getAllResponseHeaders"in b?u(b.getAllResponseHeaders()):null,s={data:v&&"text"!==v&&"json"!==v?b.response:b.responseText,status:b.status,statusText:b.statusText,headers:n,config:e,request:b};o((function(e){t(e),g()}),(function(e){r(e),g()}),s),b=null}}if(b.open(e.method.toUpperCase(),i(w,e.params,e.paramsSerializer),!0),b.timeout=e.timeout,"onloadend"in b?b.onloadend=E:b.onreadystatechange=function(){b&&4===b.readyState&&(0!==b.status||b.responseURL&&0===b.responseURL.indexOf("file:"))&&setTimeout(E)},b.onabort=function(){b&&(r(l("Request aborted",e,"ECONNABORTED",b)),b=null)},b.onerror=function(){r(l("Network Error",e,null,b)),b=null},b.ontimeout=function(){var t=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded",n=e.transitional||f.transitional;e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),r(l(t,e,n.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED",b)),b=null},n.isStandardBrowserEnv()){var x=(e.withCredentials||c(w))&&e.xsrfCookieName?s.read(e.xsrfCookieName):void 0;x&&(m[e.xsrfHeaderName]=x)}"setRequestHeader"in b&&n.forEach(m,(function(e,t){void 0===p&&"content-type"===t.toLowerCase()?delete m[t]:b.setRequestHeader(t,e)})),n.isUndefined(e.withCredentials)||(b.withCredentials=!!e.withCredentials),v&&"json"!==v&&(b.responseType=e.responseType),"function"==typeof e.onDownloadProgress&&b.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&b.upload&&b.upload.addEventListener("progress",e.onUploadProgress),(e.cancelToken||e.signal)&&(h=function(e){b&&(r(!e||e&&e.type?new d("canceled"):e),b.abort(),b=null)},e.cancelToken&&e.cancelToken.subscribe(h),e.signal&&(e.signal.aborted?h():e.signal.addEventListener("abort",h))),p||(p=null),b.send(p)}))}},609:(e,t,r)=>{"use strict";var n=r(867),o=r(849),s=r(321),i=r(185),a=function e(t){var r=new s(t),a=o(s.prototype.request,r);return n.extend(a,s.prototype,r),n.extend(a,r),a.create=function(r){return e(i(t,r))},a}(r(655));a.Axios=s,a.Cancel=r(263),a.CancelToken=r(972),a.isCancel=r(502),a.VERSION=r(288).version,a.all=function(e){return Promise.all(e)},a.spread=r(713),a.isAxiosError=r(268),e.exports=a,e.exports.default=a},263:e=>{"use strict";function t(e){this.message=e}t.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},t.prototype.__CANCEL__=!0,e.exports=t},972:(e,t,r)=>{"use strict";var n=r(263);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var r=this;this.promise.then((function(e){if(r._listeners){var t,n=r._listeners.length;for(t=0;t<n;t++)r._listeners[t](e);r._listeners=null}})),this.promise.then=function(e){var t,n=new Promise((function(e){r.subscribe(e),t=e})).then(e);return n.cancel=function(){r.unsubscribe(t)},n},e((function(e){r.reason||(r.reason=new n(e),t(r.reason))}))}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.prototype.subscribe=function(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e]},o.prototype.unsubscribe=function(e){if(this._listeners){var t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1)}},o.source=function(){var e;return{token:new o((function(t){e=t})),cancel:e}},e.exports=o},502:e=>{"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},321:(e,t,r)=>{"use strict";var n=r(867),o=r(327),s=r(782),i=r(572),a=r(185),u=r(875),c=u.validators;function l(e){this.defaults=e,this.interceptors={request:new s,response:new s}}l.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=a(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=e.transitional;void 0!==t&&u.assertOptions(t,{silentJSONParsing:c.transitional(c.boolean),forcedJSONParsing:c.transitional(c.boolean),clarifyTimeoutError:c.transitional(c.boolean)},!1);var r=[],n=!0;this.interceptors.request.forEach((function(t){"function"==typeof t.runWhen&&!1===t.runWhen(e)||(n=n&&t.synchronous,r.unshift(t.fulfilled,t.rejected))}));var o,s=[];if(this.interceptors.response.forEach((function(e){s.push(e.fulfilled,e.rejected)})),!n){var l=[i,void 0];for(Array.prototype.unshift.apply(l,r),l=l.concat(s),o=Promise.resolve(e);l.length;)o=o.then(l.shift(),l.shift());return o}for(var f=e;r.length;){var d=r.shift(),h=r.shift();try{f=d(f)}catch(e){h(e);break}}try{o=i(f)}catch(e){return Promise.reject(e)}for(;s.length;)o=o.then(s.shift(),s.shift());return o},l.prototype.getUri=function(e){return e=a(this.defaults,e),o(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},n.forEach(["delete","get","head","options"],(function(e){l.prototype[e]=function(t,r){return this.request(a(r||{},{method:e,url:t,data:(r||{}).data}))}})),n.forEach(["post","put","patch"],(function(e){l.prototype[e]=function(t,r,n){return this.request(a(n||{},{method:e,url:t,data:r}))}})),e.exports=l},782:(e,t,r)=>{"use strict";var n=r(867);function o(){this.handlers=[]}o.prototype.use=function(e,t,r){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!r&&r.synchronous,runWhen:r?r.runWhen:null}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){n.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=o},97:(e,t,r)=>{"use strict";var n=r(793),o=r(303);e.exports=function(e,t){return e&&!n(t)?o(e,t):t}},61:(e,t,r)=>{"use strict";var n=r(481);e.exports=function(e,t,r,o,s){var i=new Error(e);return n(i,t,r,o,s)}},572:(e,t,r)=>{"use strict";var n=r(867),o=r(527),s=r(502),i=r(655),a=r(263);function u(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new a("canceled")}e.exports=function(e){return u(e),e.headers=e.headers||{},e.data=o.call(e,e.data,e.headers,e.transformRequest),e.headers=n.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),n.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||i.adapter)(e).then((function(t){return u(e),t.data=o.call(e,t.data,t.headers,e.transformResponse),t}),(function(t){return s(t)||(u(e),t&&t.response&&(t.response.data=o.call(e,t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},481:e=>{"use strict";e.exports=function(e,t,r,n,o){return e.config=t,r&&(e.code=r),e.request=n,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}},e}},185:(e,t,r)=>{"use strict";var n=r(867);e.exports=function(e,t){t=t||{};var r={};function o(e,t){return n.isPlainObject(e)&&n.isPlainObject(t)?n.merge(e,t):n.isPlainObject(t)?n.merge({},t):n.isArray(t)?t.slice():t}function s(r){return n.isUndefined(t[r])?n.isUndefined(e[r])?void 0:o(void 0,e[r]):o(e[r],t[r])}function i(e){if(!n.isUndefined(t[e]))return o(void 0,t[e])}function a(r){return n.isUndefined(t[r])?n.isUndefined(e[r])?void 0:o(void 0,e[r]):o(void 0,t[r])}function u(r){return r in t?o(e[r],t[r]):r in e?o(void 0,e[r]):void 0}var c={url:i,method:i,data:i,baseURL:a,transformRequest:a,transformResponse:a,paramsSerializer:a,timeout:a,timeoutMessage:a,withCredentials:a,adapter:a,responseType:a,xsrfCookieName:a,xsrfHeaderName:a,onUploadProgress:a,onDownloadProgress:a,decompress:a,maxContentLength:a,maxBodyLength:a,transport:a,httpAgent:a,httpsAgent:a,cancelToken:a,socketPath:a,responseEncoding:a,validateStatus:u};return n.forEach(Object.keys(e).concat(Object.keys(t)),(function(e){var t=c[e]||s,o=t(e);n.isUndefined(o)&&t!==u||(r[e]=o)})),r}},26:(e,t,r)=>{"use strict";var n=r(61);e.exports=function(e,t,r){var o=r.config.validateStatus;r.status&&o&&!o(r.status)?t(n("Request failed with status code "+r.status,r.config,null,r.request,r)):e(r)}},527:(e,t,r)=>{"use strict";var n=r(867),o=r(655);e.exports=function(e,t,r){var s=this||o;return n.forEach(r,(function(r){e=r.call(s,e,t)})),e}},655:(e,t,r)=>{"use strict";var n=r(867),o=r(16),s=r(481),i={"Content-Type":"application/x-www-form-urlencoded"};function a(e,t){!n.isUndefined(e)&&n.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var u,c={transitional:{silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(u=r(448)),u),transformRequest:[function(e,t){return o(t,"Accept"),o(t,"Content-Type"),n.isFormData(e)||n.isArrayBuffer(e)||n.isBuffer(e)||n.isStream(e)||n.isFile(e)||n.isBlob(e)?e:n.isArrayBufferView(e)?e.buffer:n.isURLSearchParams(e)?(a(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):n.isObject(e)||t&&"application/json"===t["Content-Type"]?(a(t,"application/json"),function(e,t,r){if(n.isString(e))try{return(0,JSON.parse)(e),n.trim(e)}catch(e){if("SyntaxError"!==e.name)throw e}return(0,JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){var t=this.transitional||c.transitional,r=t&&t.silentJSONParsing,o=t&&t.forcedJSONParsing,i=!r&&"json"===this.responseType;if(i||o&&n.isString(e)&&e.length)try{return JSON.parse(e)}catch(e){if(i){if("SyntaxError"===e.name)throw s(e,this,"E_JSON_PARSE");throw e}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};n.forEach(["delete","get","head"],(function(e){c.headers[e]={}})),n.forEach(["post","put","patch"],(function(e){c.headers[e]=n.merge(i)})),e.exports=c},288:e=>{e.exports={version:"0.24.0"}},849:e=>{"use strict";e.exports=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}}},327:(e,t,r)=>{"use strict";var n=r(867);function o(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,r){if(!t)return e;var s;if(r)s=r(t);else if(n.isURLSearchParams(t))s=t.toString();else{var i=[];n.forEach(t,(function(e,t){null!=e&&(n.isArray(e)?t+="[]":e=[e],n.forEach(e,(function(e){n.isDate(e)?e=e.toISOString():n.isObject(e)&&(e=JSON.stringify(e)),i.push(o(t)+"="+o(e))})))})),s=i.join("&")}if(s){var a=e.indexOf("#");-1!==a&&(e=e.slice(0,a)),e+=(-1===e.indexOf("?")?"?":"&")+s}return e}},303:e=>{"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},372:(e,t,r)=>{"use strict";var n=r(867);e.exports=n.isStandardBrowserEnv()?{write:function(e,t,r,o,s,i){var a=[];a.push(e+"="+encodeURIComponent(t)),n.isNumber(r)&&a.push("expires="+new Date(r).toGMTString()),n.isString(o)&&a.push("path="+o),n.isString(s)&&a.push("domain="+s),!0===i&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},793:e=>{"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},268:e=>{"use strict";e.exports=function(e){return"object"==typeof e&&!0===e.isAxiosError}},985:(e,t,r)=>{"use strict";var n=r(867);e.exports=n.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function o(e){var n=e;return t&&(r.setAttribute("href",n),n=r.href),r.setAttribute("href",n),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return e=o(window.location.href),function(t){var r=n.isString(t)?o(t):t;return r.protocol===e.protocol&&r.host===e.host}}():function(){return!0}},16:(e,t,r)=>{"use strict";var n=r(867);e.exports=function(e,t){n.forEach(e,(function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])}))}},109:(e,t,r)=>{"use strict";var n=r(867),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,r,s,i={};return e?(n.forEach(e.split("\n"),(function(e){if(s=e.indexOf(":"),t=n.trim(e.substr(0,s)).toLowerCase(),r=n.trim(e.substr(s+1)),t){if(i[t]&&o.indexOf(t)>=0)return;i[t]="set-cookie"===t?(i[t]?i[t]:[]).concat([r]):i[t]?i[t]+", "+r:r}})),i):i}},713:e=>{"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},875:(e,t,r)=>{"use strict";var n=r(288).version,o={};["object","boolean","number","function","string","symbol"].forEach((function(e,t){o[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}}));var s={};o.transitional=function(e,t,r){function o(e,t){return"[Axios v"+n+"] Transitional option '"+e+"'"+t+(r?". "+r:"")}return function(r,n,i){if(!1===e)throw new Error(o(n," has been removed"+(t?" in "+t:"")));return t&&!s[n]&&(s[n]=!0,console.warn(o(n," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(r,n,i)}},e.exports={assertOptions:function(e,t,r){if("object"!=typeof e)throw new TypeError("options must be an object");for(var n=Object.keys(e),o=n.length;o-- >0;){var s=n[o],i=t[s];if(i){var a=e[s],u=void 0===a||i(a,s,e);if(!0!==u)throw new TypeError("option "+s+" must be "+u)}else if(!0!==r)throw Error("Unknown option "+s)}},validators:o}},867:(e,t,r)=>{"use strict";var n=r(849),o=Object.prototype.toString;function s(e){return"[object Array]"===o.call(e)}function i(e){return void 0===e}function a(e){return null!==e&&"object"==typeof e}function u(e){if("[object Object]"!==o.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function c(e){return"[object Function]"===o.call(e)}function l(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),s(e))for(var r=0,n=e.length;r<n;r++)t.call(null,e[r],r,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray:s,isArrayBuffer:function(e){return"[object ArrayBuffer]"===o.call(e)},isBuffer:function(e){return null!==e&&!i(e)&&null!==e.constructor&&!i(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:a,isPlainObject:u,isUndefined:i,isDate:function(e){return"[object Date]"===o.call(e)},isFile:function(e){return"[object File]"===o.call(e)},isBlob:function(e){return"[object Blob]"===o.call(e)},isFunction:c,isStream:function(e){return a(e)&&c(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:l,merge:function e(){var t={};function r(r,n){u(t[n])&&u(r)?t[n]=e(t[n],r):u(r)?t[n]=e({},r):s(r)?t[n]=r.slice():t[n]=r}for(var n=0,o=arguments.length;n<o;n++)l(arguments[n],r);return t},extend:function(e,t,r){return l(t,(function(t,o){e[o]=r&&"function"==typeof t?n(t,r):t})),e},trim:function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}}},739:(e,t,r)=>{"use strict";const n=e.exports;n.foreach=n.forEach=r(885),n.map=r(214),n.filter=r(429),n.find=r(954),n.reduce=r(990),n.transform=r(534),n.async_while=n.asyncWhile=r(498),n.parallel=r(353),n.all=r(469),n.setImmediate=n.set_immediate=r(352)},469:e=>{"use strict";e.exports=function(e){if(e instanceof Array)return Promise.all(e);var t=Object.keys(e),r=t.map((t=>e[t])),n={};return Promise.all(r).then((e=>(e.forEach(((e,r)=>n[t[r]]=e)),n)))}},498:e=>{function t(e,t,{limit:r=1/0}){const n=e();let o=1;if(!n)return;const s=()=>{if(o>r)throw new Error("Too many iterations for. Limit - "+r);return e()?(o++,t().then(s)):void 0};return t().then(s)}function r(e,{limit:t=1/0}){let r=1;const n=o=>{if(r>t)throw new Error("Too many iterations for. Limit - "+t);return o?(r++,e().then(n)):void 0};return e().then(n)}e.exports=function(){return 3===arguments.length&&"object"==typeof arguments[arguments.length-1]||2===arguments.length&&"function"==typeof arguments[arguments.length-1]?t(arguments[0],arguments[1],arguments[2]||{number:1/0}):r(arguments[0],arguments[1]||{number:1/0})}},429:e=>{"use strict";e.exports=function(e,t){var r=[],n=Promise.resolve();for(let o=0,s=e.length;o<s;o++){let s=e[o];n=n.then((()=>t(s,o))).then((e=>{e&&r.push(s)}))}return n.then((()=>r))}},954:e=>{"use strict";e.exports=function(e,r){var n=Promise.resolve();for(let o=0,s=e.length;o<s;o++){let s=e[o];n=n.then((()=>r(s,o))).then((e=>{if(e)throw new t(s)}))}return n.then((()=>list)).catch((e=>{if(e instanceof t)return e.value;throw e}))};class t extends Error{constructor(e){super(e),this._val=e}get value(){return this._val}}},885:e=>{"use strict";e.exports=function(e,t){var r=Promise.resolve();for(let n=0,o=e.length;n<o;n++)r=r.then((()=>t(e[n],n)));return r}},214:e=>{"use strict";e.exports=function(e,t){var r=[],n=Promise.resolve();for(let o=0,s=e.length;o<s;o++)n=n.then((()=>t(e[o],o))).then((e=>r.push(e)));return n.then((()=>r))}},353:e=>{"use strict";e.exports=function(e,t,r){let n;if("number"==typeof t?(console.warn("Warning: You shoulds use { pool: "+t+" } instead of simple number"),n=t):n=t.pool,!n)throw new Error("required pool");var o=()=>{if(e[s]){var t=e[s];return s++,r(t,s).then(o)}},s=n,i=[];for(let t=0,s=e.length;t<s;t++)t<n&&i.push(Promise.resolve().then((()=>r(e[t],t))).then(o));return Promise.all(i)}},990:e=>{"use strict";e.exports=function(e,t,r){var n=r,o=Promise.resolve();for(let r=0,s=e.length;r<s;r++)o=o.then((()=>t(n,e[r],r,e))).then((e=>n=e));return o.then((()=>n))}},352:e=>{"use strict";e.exports=function(){return new Promise(((e,t)=>{setImmediate(e)}))}},534:e=>{"use strict";e.exports=function(e,t){var r=[],n=Promise.resolve();for(let o=0,s=e.length;o<s;o++)n=n.then((()=>t(e[o],o))).then((e=>{null!=e&&r.push(e)}));return n.then((()=>r))}}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var s=t[n]={exports:{}};return e[n](s,s.exports,r),s.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var n={};(()=>{"use strict";r.d(n,{default:()=>O});var e,t=r(669),o=r.n(t),s=r(739),i=r.n(s);class a{constructor(e){this.$elements=e.elements,this.elements=Array.prototype.slice.call(this.$elements)}parse(){const e={},t=this.$elements;return this.elements.forEach((r=>{if(this.isValidElement(r)&&this.isValidValue(r)&&!this.isFile(r))if(this.isCheckbox(r)){const n=r.name,o=t[n].length>1;!e[n]&&o&&(e[n]=[]),o?e[n].push(r.value):e[n]=r.value}else this.isMultiSelect(r)?e[r.name]=this.getSelectValues(r):e[r.name]=r.value})),e}parseWithFiles(){const e=this.parse(),t=this.elements.filter((e=>this.isValidElement(e)&&this.isFile(e))),r=this._createStoreForFiles();return i().forEach(t,(function(e){const t=e.name;return e.multiple?i().forEach(e.files,(e=>r.add({name:t,file:e}))):r.add({name:t,file:e.files[0]})})).then((()=>r.mergeTo(e)))}_createStoreForFiles(){const e={};return{add:({name:t,file:r})=>function(e){return new Promise(((t,r)=>{var n=new FileReader;n.readAsDataURL(e),n.onload=function(){t(n.result)},n.onerror=function(e){r(e)}}))}(r).then((r=>{!e[t]||e[t]instanceof Array?e[t]?e[t].push(r):e[t]=r:e[t]=[e[t],r]})),mergeTo(e){const t=this.get();return Object.keys(t).forEach((r=>e[r]=t[r])),e},get:()=>e}}isValidElement(e){return e.name&&e.value}isValidValue(e){return!["checkbox","radio"].includes(e.type)||e.checked}isCheckbox(e){return"checkbox"===e.type}isMultiSelect(e){return e.options&&e.multiple}isFile(e){return"file"===e.type}getSelectValues(e){return[].reduce.call(e,((e,t)=>t.selected?e.concat(t.value):e),[])}}var u="undefined"==typeof document?void 0:document,c=!!u&&"content"in u.createElement("template"),l=!!u&&u.createRange&&"createContextualFragment"in u.createRange();function f(e,t){var r,n,o=e.nodeName,s=t.nodeName;return o===s||(r=o.charCodeAt(0),n=s.charCodeAt(0),r<=90&&n>=97?o===s.toUpperCase():n<=90&&r>=97&&s===o.toUpperCase())}function d(e,t,r){e[r]!==t[r]&&(e[r]=t[r],e[r]?e.setAttribute(r,""):e.removeAttribute(r))}var h={OPTION:function(e,t){var r=e.parentNode;if(r){var n=r.nodeName.toUpperCase();"OPTGROUP"===n&&(n=(r=r.parentNode)&&r.nodeName.toUpperCase()),"SELECT"!==n||r.hasAttribute("multiple")||(e.hasAttribute("selected")&&!t.selected&&(e.setAttribute("selected","selected"),e.removeAttribute("selected")),r.selectedIndex=-1)}d(e,t,"selected")},INPUT:function(e,t){d(e,t,"checked"),d(e,t,"disabled"),e.value!==t.value&&(e.value=t.value),t.hasAttribute("value")||e.removeAttribute("value")},TEXTAREA:function(e,t){var r=t.value;e.value!==r&&(e.value=r);var n=e.firstChild;if(n){var o=n.nodeValue;if(o==r||!r&&o==e.placeholder)return;n.nodeValue=r}},SELECT:function(e,t){if(!t.hasAttribute("multiple")){for(var r,n,o=-1,s=0,i=e.firstChild;i;)if("OPTGROUP"===(n=i.nodeName&&i.nodeName.toUpperCase()))i=(r=i).firstChild;else{if("OPTION"===n){if(i.hasAttribute("selected")){o=s;break}s++}!(i=i.nextSibling)&&r&&(i=r.nextSibling,r=null)}e.selectedIndex=o}}};function p(){}function m(e){if(e)return e.getAttribute&&e.getAttribute("id")||e.id}var v=function(t,r,n){if(n||(n={}),"string"==typeof r)if("#document"===t.nodeName||"HTML"===t.nodeName||"BODY"===t.nodeName){var o=r;(r=u.createElement("html")).innerHTML=o}else s=(s=r).trim(),r=c?function(e){var t=u.createElement("template");return t.innerHTML=e,t.content.childNodes[0]}(s):l?function(t){return e||(e=u.createRange()).selectNode(u.body),e.createContextualFragment(t).childNodes[0]}(s):function(e){var t=u.createElement("body");return t.innerHTML=e,t.childNodes[0]}(s);var s,i=n.getNodeKey||m,a=n.onBeforeNodeAdded||p,d=n.onNodeAdded||p,v=n.onBeforeElUpdated||p,g=n.onElUpdated||p,b=n.onBeforeNodeDiscarded||p,_=n.onNodeDiscarded||p,y=n.onBeforeElChildrenUpdated||p,w=!0===n.childrenOnly,E=Object.create(null),x=[];function N(e){x.push(e)}function T(e,t){if(1===e.nodeType)for(var r=e.firstChild;r;){var n=void 0;t&&(n=i(r))?N(n):(_(r),r.firstChild&&T(r,t)),r=r.nextSibling}}function A(e,t,r){!1!==b(e)&&(t&&t.removeChild(e),_(e),T(e,r))}function S(e){d(e);for(var t=e.firstChild;t;){var r=t.nextSibling,n=i(t);if(n){var o=E[n];o&&f(t,o)?(t.parentNode.replaceChild(o,t),C(o,t)):S(t)}else S(t);t=r}}function C(e,t,r){var n=i(t);if(n&&delete E[n],!r){if(!1===v(e,t))return;if(function(e,t){var r,n,o,s,i=t.attributes;if(11!==t.nodeType&&11!==e.nodeType){for(var a=i.length-1;a>=0;a--)n=(r=i[a]).name,o=r.namespaceURI,s=r.value,o?(n=r.localName||n,e.getAttributeNS(o,n)!==s&&("xmlns"===r.prefix&&(n=r.name),e.setAttributeNS(o,n,s))):e.getAttribute(n)!==s&&e.setAttribute(n,s);for(var u=e.attributes,c=u.length-1;c>=0;c--)n=(r=u[c]).name,(o=r.namespaceURI)?(n=r.localName||n,t.hasAttributeNS(o,n)||e.removeAttributeNS(o,n)):t.hasAttribute(n)||e.removeAttribute(n)}}(e,t),g(e),!1===y(e,t))return}"TEXTAREA"!==e.nodeName?function(e,t){var r,n,o,s,c,l=t.firstChild,d=e.firstChild;e:for(;l;){for(s=l.nextSibling,r=i(l);d;){if(o=d.nextSibling,l.isSameNode&&l.isSameNode(d)){l=s,d=o;continue e}n=i(d);var p=d.nodeType,m=void 0;if(p===l.nodeType&&(1===p?(r?r!==n&&((c=E[r])?o===c?m=!1:(e.insertBefore(c,d),n?N(n):A(d,e,!0),d=c):m=!1):n&&(m=!1),(m=!1!==m&&f(d,l))&&C(d,l)):3!==p&&8!=p||(m=!0,d.nodeValue!==l.nodeValue&&(d.nodeValue=l.nodeValue))),m){l=s,d=o;continue e}n?N(n):A(d,e,!0),d=o}if(r&&(c=E[r])&&f(c,l))e.appendChild(c),C(c,l);else{var v=a(l);!1!==v&&(v&&(l=v),l.actualize&&(l=l.actualize(e.ownerDocument||u)),e.appendChild(l),S(l))}l=s,d=o}!function(e,t,r){for(;t;){var n=t.nextSibling;(r=i(t))?N(r):A(t,e,!0),t=n}}(e,d,n);var g=h[e.nodeName];g&&g(e,t)}(e,t):h.TEXTAREA(e,t)}!function e(t){if(1===t.nodeType||11===t.nodeType)for(var r=t.firstChild;r;){var n=i(r);n&&(E[n]=r),e(r),r=r.nextSibling}}(t);var O,R,P=t,j=P.nodeType,U=r.nodeType;if(!w)if(1===j)1===U?f(t,r)||(_(t),P=function(e,t){for(var r=e.firstChild;r;){var n=r.nextSibling;t.appendChild(r),r=n}return t}(t,(O=r.nodeName,(R=r.namespaceURI)&&"http://www.w3.org/1999/xhtml"!==R?u.createElementNS(R,O):u.createElement(O)))):P=r;else if(3===j||8===j){if(U===j)return P.nodeValue!==r.nodeValue&&(P.nodeValue=r.nodeValue),P;P=r}if(P===r)_(t);else{if(r.isSameNode&&r.isSameNode(P))return;if(C(P,r,w),x)for(var L=0,k=x.length;L<k;L++){var q=E[x[L]];q&&A(q,q.parentNode,!1)}}return!w&&P!==t&&t.parentNode&&(P.actualize&&(P=P.actualize(t.ownerDocument||u)),t.parentNode.replaceChild(P,t)),P};const g=v;class b{constructor(e,t){this.$els=e,this.life_hooks=t}get_target(e){return e&&e.target||e.srcElement}append(e){this._list=this._list.concat(e.map((e=>this._add_listener(e))))}add_special_params(e,{id:t,output_id:r}){const n=this._create_url_obj(e);return t&&n.searchParams.append("__self_id",t),r&&n.searchParams.append("__output_id",r),n.href}form_add_to_url(e,t){const r=this._create_url_obj(e);return Object.keys(t).forEach((e=>{r.searchParams.append(e,t[e])})),r.href}_exec({ev:e,data:t},r){if("update"===e){const{html:e,css:n}=t,o=this._extract_id(e);console.log({id:o,html:e}),this._apply_css(n,r),this.render(o,e)}else if("remove"===e)E(t.id).outerHTML="";else if("append_to_top"===e){const{id:e,html:n,css:o}=t;this._apply_css(o,r),E(e).insertAdjacentHTML("afterBegin",n)}else{if("append_to_end"!==e)throw new Error("Invalid command "+JSON.stringify({ev:e,data:t}));{const{id:e,html:n,css:o}=t;this._apply_css(o,r),E(e).insertAdjacentHTML("beforeEnd",n)}}}handle_response({config:e,data:t}){const r=new URL(e.url),n=r.origin+r.pathname;t instanceof Array?t.forEach((e=>this._exec(e,n))):t&&this._exec({ev:"update",data:{html:t,css:null}},n)}handler_error(e){this.life_hooks.onError(e)}render(e,t){g(document.getElementById(e),t,y)}_is_absolute_url(e){return new RegExp("^(https?:)?//").test(e)}_create_url_obj(e){return this._is_absolute_url(e)?new URL(e):new URL(e,document.baseURI)}_apply_css(e,t){var r,n,o;e&&((r=e)&&x.appendChild((n=r,o=w.createElement("style"),function(e,t){for(var r=0,n=e.length;r<n;r++)void 0!==e[r]&&(s=e[r],o[s[0]]=s[1]);var s}([]),n&&o.appendChild(w.createTextNode(n)),o)))}_extract_id(e){const t=e.match(/d=([^>\s]+)/)[1];if(!t)throw new Error("Not found id in html: "+e);return t}}const _="data-ignis-use-prev-value",y={onBeforeElUpdated:function(e,t){if("INPUT"===t.tagName){const r=t.hasAttribute(_);"checkbox"!==t.type&&"radio"!==t.type||!r?"file"===t.type&&r?t.files=e.files:r&&(t.value=e.value):t.checked=e.checked}else"SELECT"===t.tagName&&t.hasAttribute(_)&&(t.value=e.value)}},w=document,E=e=>document.getElementById(e),x=w.getElementsByTagName("head")[0];class N{constructor(e){this._longRequest=e,this._is_finished=!1,this._is_long_request=!1,this._delay=400,this._min_diff_between_start_stop=1e3-this._delay}start(){this._start_request=Date.now();const e=setInterval((()=>{const t=Date.now();!this._is_finished&&t-this._start_request>this._delay?(this._is_long_request=!0,this._longRequest.start(),clearInterval(e)):this._is_finished&&clearInterval(e)}),100);return this}end(){this._is_finished=!0;const e=this._delay;if(!this._is_long_request)return;const t=this._start_request,r=Date.now()-t-e;if(r<this._min_diff_between_start_stop){const e=this._min_diff_between_start_stop-r;setTimeout((()=>{this._longRequest.end()}),e)}else this._longRequest.end()}}class T extends b{static get_selector(){return"[data-ignis-form]"}static get_els(e=document){return Array.from(e.querySelectorAll(T.get_selector()))}constructor(e,t,r=T.get_els()){super(r,e),this.axios=t}start(){return this._list=this.$els.map((e=>this._add_listener(e))),this}_add_listener(e){return this._subscribe(e),new A(e)}_cb(e,t){e.preventDefault();const r=this.axios,n=t.id,o=t.getAttribute("data-ignis-output-id");let[s,i]=t.getAttribute("data-ignis-form").split("->");const u=t.getAttribute("data-ignis-enctype")?.trim();if(s=s.trim(),!o)throw new Error("Not found id = "+o);if(!["GET","DELETE","POST","PUT"].includes(s))throw new Error("Not valid method "+s);const c=this.get_target(e);let l;if(i=this.add_special_params(i,{id:n,output_id:o}),"GET"===s||"DELETE"===s){const e=new a(c).parse();console.log(e,s,i),i=this.form_add_to_url(i,e),l=r[s.toLowerCase()](i)}else if("multipart/form-data"===u){const e=new FormData(c);console.log(e,s,i,o),l=r[s.toLowerCase()](i,e)}else{const e=new a(c).parse();console.log(e,s,i,o),l=r[s.toLowerCase()](i,e)}const f=new N(this.life_hooks.longRequest).start();l.then(this.handle_response.bind(this)).catch(this.handler_error.bind(this)).finally(f.end.bind(f))}_subscribe(e){e.addEventListener("submit",(t=>{this._cb(t,e)}))}}class A{constructor(e){this.el=e}}class S extends b{static get_selector(){return"[data-ignis-event]"}static get_els(e=document){return Array.from(e.querySelectorAll(S.get_selector()))}constructor(e,t,r=S.get_els()){super(r,e),this.axios=t}start(){return this._list=this.$els.map((e=>this._add_listener(e))),this}_add_listener(e){const t=this._subscribe(e);return new C(e,t)}_cb(e,t){e.preventDefault();const r=this.axios,n=t.id,o=t.getAttribute("data-ignis-output-id");let s,[i,a,u]=t.getAttribute("data-ignis-event").split("->");if(!["GET","POST","PUT","DELETE"].includes(a))throw new Error("Not valid method "+a);console.log(a,u,o),u=this.add_special_params(u,{id:n,output_id:o});const c=t.getAttribute("data-ignis-data"),l=c?JSON.parse(c):{};"GET"===a||"DELETE"===a?(console.log(l,a,u),u=this.form_add_to_url(u,l),s=r[a.toLowerCase()](u)):"POST"!==a&&"PUT"!==a||(s=r[a.toLowerCase()](u,l));const f=new N(this.life_hooks.longRequest).start();s.then(this.handle_response.bind(this)).catch(this.handler_error.bind(this)).finally(f.end.bind(f))}_subscribe(e){const t=e.getAttribute("data-ignis-event").split("->")[0];e.addEventListener(t,(t=>{this._cb(t,e)}))}}class C{constructor(e,t){this.el=e,this._unsubscribe=t}unsubscribe(){this._unsubscribe()}}const O={start:function(e={}){const t={onError:e.onError||function(){},longRequest:e.longRequest||{start(){},end(){}}},r=e.requestTimeout??0,n=o().create({timeout:r}),s=new T(t,n).start(),i=new S(t,n).start();new MutationObserver((e=>{for(let t of e)for(let e of t.addedNodes)e instanceof HTMLElement&&(e.matches(T.get_selector())&&s.append([e]),e.matches(S.get_selector())&&i.append([e]),s.append(T.get_els(e)),i.append(S.get_els(e)))})).observe(document.body,{childList:!0,subtree:!0})}}})(),window.Ignis=n.default})();
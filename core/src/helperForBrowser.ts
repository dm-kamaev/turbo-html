const D = document;
export const getById = id => document.getElementById(id) as HTMLElement;

const H = D.getElementsByTagName('head')[0];
function crEl(t, a, s, e?: any) { e = D.createElement(t); setArray(a, function (i, v) { e[v[0]] = v[1]; }); if (s) { e.appendChild(D.createTextNode(s)); } return e; }
function setArray(a, f) { for (var i = 0, l = a.length; i < l; i++) { if (a[i] !== undefined) { f(i, a[i]); } } }

export function addCss(code: string, file_url?: string) {
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

export function getTarget(e) { return e && e.target || e.srcElement; }

export function debounce(cb: (...arg: any) => any, ms: number) {
  let idTime: number | null = null;
  return function () {
    if (idTime) {
      clearTimeout(idTime);
    }
    idTime = setTimeout(cb, ms);
  };
}


export const get_uid = (function () {
  var IDX = 36, HEX = '';
  while (IDX--) {
    HEX += IDX.toString(36);
  }

  return function (len?: number) {
    var str = '';
    var num = len || 11;
    while (num--) {
      str += HEX[Math.random() * 36 | 0];
    }
    return str;
  };
}());


/**
 * function for add js, css or link to head
 * @param content {string}
 */
export function addToHead(content: string) {
  const fragment = document.createRange().createContextualFragment(content);
  document.head.append(fragment);
}

export function createFakeEvent(eventName: string, target: HTMLElement) {
  const fake_event = new Event(eventName);
  Object.defineProperty(fake_event, 'target', { writable: false, value: target });
  return fake_event;
}

export const logger = window['__turboHTML_DEBUG__'] ? (...arg) => console.log.apply(console, arg) : () => { };
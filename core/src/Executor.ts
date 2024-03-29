import { Axios, AxiosError, AxiosResponse } from 'axios';
import FormToJSON from 'forms_to_json';

import morphdom from 'morphdom';

import { getById, addToHead, getTarget, logger } from './helperForBrowser';
// import unescape from './util/unescape';

import LifeHookManager from './LifeHookManager';
import ManagerLongRequest from './ManagerLongRequest';
import Animation from './Animation';
import { ILifeHooks, ICmd, ITurboHtmlOptions } from './type';
import enumAttr from './enumAttr';
import type El from './El';
import Url from './Url';
import HttpError from './HttpError';

// set state for current page
history.replaceState({ v: 'turbo-html:1', url: document.location.href }, '', document.location.href);
window.addEventListener('popstate', function(ev) {
  if (ev.state && ev.state.v === 'turbo-html:1' && ev.state.url) {
    window.location.href = ev.state.url;
  }
});

const animation = new Animation();


export default class Executor {
  private readonly $el: HTMLElement;
  private _lifeHookManager: LifeHookManager;

  constructor(private readonly _globaLifeHooks: ILifeHooks, private _globalHeaders: ITurboHtmlOptions['headers'], private readonly el: El, private readonly _axios: Axios) {
    this.$el = el.$el;
  }

  runAsForm(e: Event, cmd: ICmd, { spinner }: { spinner: boolean }) {
    this._exec(() => {
      e.preventDefault();
      const $form: HTMLFormElement = getTarget(e);
      this._runAsForm($form, cmd, { spinner });
    });
  }

  runAsEl(e: Event, cmd: ICmd, settings: { spinner: boolean }) {
    this._exec(() => {
      // e.preventDefault();
      e.stopPropagation();
      this._run(cmd, settings);
    });
  }

  runAsEvery(cmd: ICmd, settings: { spinner: boolean }) {
    this._exec(() => {
      this._run(cmd, settings);
    });
  }

  runAsExec(cmd: ICmd, settings: { spinner: boolean }) {
    this._exec(() => {
      if (this.$el.tagName === 'FORM') {
        const $form = this.$el as HTMLFormElement;
        this._runAsForm($form, cmd, settings);
      } else {
        this._run(cmd, settings);
      }
    });
  }

  private _runAsForm($form: HTMLFormElement, cmd: ICmd, { spinner }: { spinner: boolean }) {
      const axios = this._axios;
      const $el = this.$el;

      const id = $el.id;
      const output_id = $el.getAttribute('data-i-output-id');
      const url = new Url(cmd.url);
      const origin_url = cmd.url;
      const enctype = $el.getAttribute('enctype')?.trim() || $el.getAttribute('data-i-enctype')?.trim();
      const method = cmd.method;

      if (!id && !output_id) {
        throw new Error('[turbo-html]: Set "id" or "data-i-output-id" for <form>');
      }

      if (!['GET', 'DELETE', 'POST', 'PUT'].includes(method)) {
        throw new Error(`[turbo-html]: Not valid method ${method} for element ${$el.outerHTML}`);
      }

      let req;
      const method_name = method.toLowerCase();
      const stringHeadersOfEl = $el.getAttribute('data-i-headers');
      const headers = this._build_headers({ id, output_id, request_id: this.el.set_request_id(), }, stringHeadersOfEl);

      if (method === 'GET' || method === 'DELETE') {
        const json = new FormToJSON($form).parse();
        const str_url = url.form_add_to_url(json);
        logger(json, method, str_url);
        req = axios[method.toLowerCase()](str_url, { headers });
      } else { // POST, PUT
        if (enctype === 'multipart/form-data') {
          const formdata = new FormData($form);
          // console.log('Content of FormData', Array.from(new this._FormData($form) as any));
          const str_url = url.get();
          logger(formdata, method, str_url, output_id);
          req = axios[method_name](str_url, formdata, { headers });
        } else {
          const json = new FormToJSON($form).parse();
          const str_url = url.get();
          logger(json, method, str_url, output_id);
          req = axios[method_name](str_url, json, { headers });
        }
      }

      this._make_request(req, $el, cmd, spinner, origin_url);
  }


  private _run(cmd: ICmd, { spinner }: { spinner: boolean }) {
    const axios = this._axios;
    const $el = this.$el;

    const id = $el.id;
    const output_id = $el.getAttribute('data-i-output-id');

    const method = cmd.method;
    const url = new Url(cmd.url);
    const origin_url = cmd.url;

    if (!['GET', 'POST', 'PUT','DELETE'].includes(method)) {
      throw new Error(`[turbo-html]: Not valid method ${method} for element ${$el.outerHTML}`);
    }

    const method_name = method.toLowerCase();
    const stringHeadersOfEl = $el.getAttribute('data-i-headers');
    const headers = this._build_headers({ id, output_id, request_id: this.el.set_request_id(), }, stringHeadersOfEl);

    let req;
    const json = this._extract_data($el, cmd.name);
    if (method === 'GET' || method === 'DELETE') {
      const str_url = url.form_add_to_url(json);
      logger(json, method, str_url);
      req = axios[method_name](str_url, { headers });
    } else if (method === 'POST' || method === 'PUT') {
      const str_url = url.get();
      req = axios[method_name](str_url, json, { headers });
    }

    this._make_request(req, $el, cmd, spinner, origin_url);
  }

  private _extract_data($el: HTMLElement, name: string): Record<string, any> {
    const obj: { attr: string; isJs: boolean } =
      $el.hasAttribute(`data-i-info-${name}-js`) ? { attr: `data-i-info-${name}-js`, isJs: true } :
      $el.hasAttribute(`data-i-info-${name}`) ? { attr: `data-i-info-${name}`, isJs: false } :
      $el.hasAttribute('data-i-info-js') ? { attr: 'data-i-info-js', isJs: true } :
      { attr: 'data-i-info', isJs: false };
    if (obj.isJs) {
      const expr = $el.getAttribute(obj.attr);
      if (!expr) {
        throw new Error(`[turbo-html]: Not found expression for element: ${$el.outerHTML}`);
      }
      const code = `with(this){${`return ${expr}`}}`;
      const fn = new Function(code).bind($el);
      return fn();
    } else {
      const str_data = $el.getAttribute(obj.attr);
      if (!str_data) {
        return {};
      }
      return JSON.parse(str_data);
    }
  }

  private _make_request(req: Promise<AxiosResponse>, $el: HTMLElement, cmd: ICmd, spinner: boolean, url: string) {
    const manager_long_request = spinner ? new ManagerLongRequest(this._globaLifeHooks.onLongRequest, $el).start() : { end: () => {} };
    this._lifeHookManager.callOnStartRequest(cmd);
    req
      .then((resp: AxiosResponse) => {
        this._lifeHookManager.callOnEndRequest(cmd);
        return this._handle_response(resp, url);
      })
      .catch((err) => this._handlerError(err, cmd))
      .finally(() => {
        manager_long_request.end();
        document.body.dispatchEvent(new Event('turbo-html:garbage_collector', {
          bubbles: true,
          cancelable: true,
          composed: false
        }));
      });
  }

  private _handle_response(resp: AxiosResponse, url: string) {
    const { config: _, headers, data } = resp;
    const status = resp.status;
    // const url_obj = new URL(config.url as string);
    // const url = url_obj.origin + url_obj.pathname;

    // We are syncing response, discard outdated response by header
    if (headers['x-i-request-id'] && this.el.get_request_id() !== headers['x-i-request-id']) {
      return;
    }

    // Abort polling
    // https://en.wikipedia.org/wiki/86_(term)
    if (status === 286) {
      return this.el.revoke_cmd('@every');
    }

    if (data instanceof Array) {
      data.forEach(cmd => this._apply_response(cmd));
    } else if (data) {
      const html = data;
      this._apply_response({ ev: 'update', data: { html } });
    } else if (headers['x-i-redirect-to']) {
      window.location.href = headers['x-i-redirect-to'];
    }

    // push url if has attribute
    if (headers['x-i-push-url'] || this.el.$el.hasAttribute(enumAttr['push-url'])) {
      const newUrl = headers['x-i-push-url'] || url;
      history.pushState({ v:'turbo-html:1', url: newUrl }, '', newUrl);
    }
  }

  private _handlerError(err: AxiosError, cmd: ICmd) {
    const error = err.name === 'AxiosError' ? new HttpError(err) : err;
    this._lifeHookManager.callOnError(error);
    this._lifeHookManager.callOnEndRequest(cmd, error);
    return error;
  }

  private _exec(cb: () => void) {
    try {
      this._lifeHookManager = new LifeHookManager(this._globaLifeHooks, this.$el);
      cb();
    } catch (err) {
      this._globaLifeHooks.onError(err, this.$el);
    }
  }


  private _apply_response(
    resp: { ev: 'update', data: { id?: string; html: string, css?: string; js?: string } } |
          { ev: 'remove', data: { id: string } } |
          { ev: 'append_to_top' | 'append_to_end', data: { id: string, html: string, css?: string; js?: string }
  }) {
    if (resp.ev === 'update') {
      const { html, css, js } = resp.data;
      const id = resp.data.id || this._extract_id(resp.data.html);
      this._apply_css(css);
      this._render(id, html);
      this._apply_js(js);
    } else if (resp.ev === 'remove') {
      const $el = getById(resp.data.id);
      if (!$el) {
        throw new Error('[turbo-html]: Not found element with id "#' + resp.data.id+'" for "remove"');
      }
      animation.on_remove($el, () => $el.outerHTML = '');
    } else if (resp.ev === 'append_to_top') {
      const { id, html, css, js } = resp.data;

      this._apply_css(css);

      const $el = getById(id);
      if (!$el) {
        throw new Error('[turbo-html]: Not found element with id "#' + id +'" for "append_to_top"');
      }
      $el.insertAdjacentHTML('afterbegin', html);
      this._apply_js(js);
    } else if (resp.ev === 'append_to_end') {
      const { id, html, css, js } = resp.data;

      this._apply_css(css);

      const $el = getById(id);
      if (!$el) {
        throw new Error('[turbo-html]: Not found element with id "#' + id +'" for "append_to_end"');
      }
      $el.insertAdjacentHTML('beforeend', html);
      this._apply_js(js);
    } else {
      throw new Error('[turbo-html]: Invalid command ' + JSON.stringify(resp));
    }
  }

  private _render(id: string, html: string) {
    const target = getById(id);
    if (!target) {
      throw new Error(`Not found element with id: #${id}`);
    }
    morphdom(target, html, optionsForRender);
  }

  private _apply_css(css?: string) {
    if (css) {
      addToHead(css);
    }
  }

  private _apply_js(js?: string) {
    if (js) {
      addToHead(js);
    }
  }

  private _extract_id(html: string): string {
    const m = html.match(/id=([^>\s]+)/);
    if (!m) {
      throw new Error('[turbo-html]: Not found id in html - ' + html);
    }
    let id = m[1];
    if (!id) {
      throw new Error('[turbo-html]: Not found id in html - ' + html);
    }
    id = id.replace(/"/g, '').replace(/'/g, '').trim(); // remove quote
    if (!id) {
      throw new Error('[turbo-html]: Not found id in html - ' + html);
    }
    return id;
  }

  private _build_headers({ id, output_id, request_id }: { id: string, output_id: string | null, request_id: string }, stringHeadersOfEl: string | null) {
    let localHeaders: ITurboHtmlOptions['headers'];
    if (stringHeadersOfEl) {
      try {
        localHeaders = JSON.parse(stringHeadersOfEl);
      } catch (err) {
        throw new Error('[turbo-html]: Invalid json - ' + stringHeadersOfEl);
      }
    }
    return Object.assign({}, this._globalHeaders, localHeaders, {
      'X-I-Request': 'true',
      'X-I-Id': id,
      'X-I-Output-Id': output_id,
      'X-I-Request-Id': request_id,
    });
  }

}



const optionsForRender = {
  onBeforeElUpdated: function (fromEl, toEl) {
    if (toEl.tagName === 'INPUT' || toEl.tagName === 'TEXTAREA') {
      const use_prev_value = toEl.hasAttribute(enumAttr.PRESERVE);
      if ((toEl.type === 'checkbox' || toEl.type === 'radio') && use_prev_value) {
        toEl.checked = fromEl.checked;
      } else if (toEl.type === 'file' && use_prev_value) {
        toEl.files = fromEl.files;
      } else if (use_prev_value) {
        toEl.value = fromEl.value;
      }
    } else if (toEl.tagName === 'SELECT' && toEl.hasAttribute(enumAttr.PRESERVE)) {
      toEl.value = fromEl.value;
    }
    return true;
  },
  onElUpdated($el: HTMLElement) {
    animation.on_update($el);
  },
} as const;




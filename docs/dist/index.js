// docs/_snowpack/pkg/common/index-c1417be6.js
function noop() {
}
function assign(tar, src) {
  for (const k in src)
    tar[k] = src[k];
  return tar;
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
var src_url_equal_anchor;
function src_url_equal(element_src, url) {
  if (!src_url_equal_anchor) {
    src_url_equal_anchor = document.createElement("a");
  }
  src_url_equal_anchor.href = url;
  return element_src === src_url_equal_anchor.href;
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function component_subscribe(component, store, callback) {
  component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}
function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    const lets = definition[2](fn(dirty));
    if ($$scope.dirty === void 0) {
      return lets;
    }
    if (typeof lets === "object") {
      const merged = [];
      const len = Math.max($$scope.dirty.length, lets.length);
      for (let i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }
      return merged;
    }
    return $$scope.dirty | lets;
  }
  return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
  if (slot_changes) {
    const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}
function get_all_dirty_from_scope($$scope) {
  if ($$scope.ctx.length > 32) {
    const dirty = [];
    const length = $$scope.ctx.length / 32;
    for (let i = 0; i < length; i++) {
      dirty[i] = -1;
    }
    return dirty;
  }
  return -1;
}
function exclude_internal_props(props) {
  const result = {};
  for (const k in props)
    if (k[0] !== "$")
      result[k] = props[k];
  return result;
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k in props)
    if (!keys.has(k) && k[0] !== "$")
      rest[k] = props[k];
  return rest;
}
function compute_slots(slots) {
  const result = {};
  for (const key in slots) {
    result[key] = true;
  }
  return result;
}
function action_destroyer(action_result) {
  return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}
function append(target, node) {
  target.appendChild(node);
}
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}
function detach(node) {
  node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
  for (let i = 0; i < iterations.length; i += 1) {
    if (iterations[i])
      iterations[i].d(detaching);
  }
}
function element(name) {
  return document.createElement(name);
}
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(" ");
}
function empty() {
  return text("");
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
  if (value == null)
    node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value)
    node.setAttribute(attribute, value);
}
function set_attributes(node, attributes) {
  const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
  for (const key in attributes) {
    if (attributes[key] == null) {
      node.removeAttribute(key);
    } else if (key === "style") {
      node.style.cssText = attributes[key];
    } else if (key === "__value") {
      node.value = node[key] = attributes[key];
    } else if (descriptors[key] && descriptors[key].set) {
      node[key] = attributes[key];
    } else {
      attr(node, key, attributes[key]);
    }
  }
}
function to_number(value) {
  return value === "" ? null : +value;
}
function children(element2) {
  return Array.from(element2.childNodes);
}
function set_data(text2, data) {
  data = "" + data;
  if (text2.wholeText !== data)
    text2.data = data;
}
function set_input_value(input, value) {
  input.value = value == null ? "" : value;
}
function select_option(select, value) {
  for (let i = 0; i < select.options.length; i += 1) {
    const option = select.options[i];
    if (option.__value === value) {
      option.selected = true;
      return;
    }
  }
  select.selectedIndex = -1;
}
function select_options(select, value) {
  for (let i = 0; i < select.options.length; i += 1) {
    const option = select.options[i];
    option.selected = ~value.indexOf(option.__value);
  }
}
function select_value(select) {
  const selected_option = select.querySelector(":checked") || select.options[0];
  return selected_option && selected_option.__value;
}
function custom_event(type, detail, bubbles = false) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, bubbles, false, detail);
  return e;
}
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail);
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
    }
  };
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
function bubble(component, event) {
  const callbacks = component.$$.callbacks[event.type];
  if (callbacks) {
    callbacks.slice().forEach((fn) => fn.call(this, event));
  }
}
var dirty_components = [];
var binding_callbacks = [];
var render_callbacks = [];
var flush_callbacks = [];
var resolved_promise = Promise.resolve();
var update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
function add_flush_callback(fn) {
  flush_callbacks.push(fn);
}
var seen_callbacks = new Set();
var flushidx = 0;
function flush() {
  const saved_component = current_component;
  do {
    while (flushidx < dirty_components.length) {
      const component = dirty_components[flushidx];
      flushidx++;
      set_current_component(component);
      update(component.$$);
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
var outroing = new Set();
var outros;
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros
  };
}
function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block))
      return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach2)
          block.d(1);
        callback();
      }
    });
    block.o(local);
  }
}
var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
function get_spread_update(levels, updates) {
  const update2 = {};
  const to_null_out = {};
  const accounted_for = {$$scope: 1};
  let i = levels.length;
  while (i--) {
    const o = levels[i];
    const n = updates[i];
    if (n) {
      for (const key in o) {
        if (!(key in n))
          to_null_out[key] = 1;
      }
      for (const key in n) {
        if (!accounted_for[key]) {
          update2[key] = n[key];
          accounted_for[key] = 1;
        }
      }
      levels[i] = n;
    } else {
      for (const key in o) {
        accounted_for[key] = 1;
      }
    }
  }
  for (const key in to_null_out) {
    if (!(key in update2))
      update2[key] = void 0;
  }
  return update2;
}
function get_spread_object(spread_props) {
  return typeof spread_props === "object" && spread_props !== null ? spread_props : {};
}
function bind(component, name, callback) {
  const index = component.$$.props[name];
  if (index !== void 0) {
    component.$$.bound[index] = callback;
    callback(component.$$.ctx[index]);
  }
}
function create_component(block) {
  block && block.c();
}
function mount_component(component, target, anchor, customElement) {
  const {fragment, on_mount, on_destroy: on_destroy2, after_update} = component.$$;
  fragment && fragment.m(target, anchor);
  if (!customElement) {
    add_render_callback(() => {
      const new_on_destroy = on_mount.map(run).filter(is_function);
      if (on_destroy2) {
        on_destroy2.push(...new_on_destroy);
      } else {
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
  }
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(component, options, instance11, create_fragment13, not_equal2, props, append_styles2, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: null,
    props,
    update: noop,
    not_equal: not_equal2,
    bound: blank_object(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles2 && append_styles2($$.root);
  let ready = false;
  $$.ctx = instance11 ? instance11(component, options.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal2($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i])
        $$.bound[i](value);
      if (ready)
        make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment13 ? create_fragment13($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro)
      transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor, options.customElement);
    flush();
  }
  set_current_component(parent_component);
}
var SvelteComponent = class {
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
  $on(type, callback) {
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1)
        callbacks.splice(index, 1);
    };
  }
  $set($$props) {
    if (this.$$set && !is_empty($$props)) {
      this.$$.skip_bound = true;
      this.$$set($$props);
      this.$$.skip_bound = false;
    }
  }
};

// docs/_snowpack/pkg/common/index-082f43a7.js
var subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return {set, update: update2, subscribe: subscribe2};
}

// docs/_snowpack/pkg/sveltestrap.js
function isObject(value) {
  const type = typeof value;
  return value != null && (type == "object" || type == "function");
}
function getColumnSizeClass(isXs, colWidth, colSize) {
  if (colSize === true || colSize === "") {
    return isXs ? "col" : `col-${colWidth}`;
  } else if (colSize === "auto") {
    return isXs ? "col-auto" : `col-${colWidth}-auto`;
  }
  return isXs ? `col-${colSize}` : `col-${colWidth}-${colSize}`;
}
function toClassName(value) {
  let result = "";
  if (typeof value === "string" || typeof value === "number") {
    result += value;
  } else if (typeof value === "object") {
    if (Array.isArray(value)) {
      result = value.map(toClassName).filter(Boolean).join(" ");
    } else {
      for (let key in value) {
        if (value[key]) {
          result && (result += " ");
          result += key;
        }
      }
    }
  }
  return result;
}
function classnames(...args) {
  return args.map(toClassName).filter(Boolean).join(" ");
}
function create_else_block_1(ctx) {
  let button;
  let button_aria_label_value;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = ctx[19].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[18], null);
  const default_slot_or_fallback = default_slot || fallback_block(ctx);
  let button_levels = [
    ctx[9],
    {class: ctx[7]},
    {disabled: ctx[2]},
    {value: ctx[5]},
    {
      "aria-label": button_aria_label_value = ctx[8] || ctx[6]
    },
    {style: ctx[4]}
  ];
  let button_data = {};
  for (let i = 0; i < button_levels.length; i += 1) {
    button_data = assign(button_data, button_levels[i]);
  }
  return {
    c() {
      button = element("button");
      if (default_slot_or_fallback)
        default_slot_or_fallback.c();
      set_attributes(button, button_data);
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (default_slot_or_fallback) {
        default_slot_or_fallback.m(button, null);
      }
      if (button.autofocus)
        button.focus();
      ctx[23](button);
      current = true;
      if (!mounted) {
        dispose = listen(button, "click", ctx[21]);
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 262144)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[18], !current ? get_all_dirty_from_scope(ctx2[18]) : get_slot_changes(default_slot_template, ctx2[18], dirty, null), null);
        }
      } else {
        if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & 262146)) {
          default_slot_or_fallback.p(ctx2, !current ? -1 : dirty);
        }
      }
      set_attributes(button, button_data = get_spread_update(button_levels, [
        dirty & 512 && ctx2[9],
        (!current || dirty & 128) && {class: ctx2[7]},
        (!current || dirty & 4) && {disabled: ctx2[2]},
        (!current || dirty & 32) && {value: ctx2[5]},
        (!current || dirty & 320 && button_aria_label_value !== (button_aria_label_value = ctx2[8] || ctx2[6])) && {"aria-label": button_aria_label_value},
        (!current || dirty & 16) && {style: ctx2[4]}
      ]));
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot_or_fallback, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot_or_fallback, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(button);
      if (default_slot_or_fallback)
        default_slot_or_fallback.d(detaching);
      ctx[23](null);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block(ctx) {
  let a;
  let current_block_type_index;
  let if_block;
  let a_aria_label_value;
  let current;
  let mounted;
  let dispose;
  const if_block_creators = [create_if_block_1, create_else_block];
  const if_blocks = [];
  function select_block_type_1(ctx2, dirty) {
    if (ctx2[1])
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type_1(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  let a_levels = [
    ctx[9],
    {class: ctx[7]},
    {disabled: ctx[2]},
    {href: ctx[3]},
    {
      "aria-label": a_aria_label_value = ctx[8] || ctx[6]
    },
    {style: ctx[4]}
  ];
  let a_data = {};
  for (let i = 0; i < a_levels.length; i += 1) {
    a_data = assign(a_data, a_levels[i]);
  }
  return {
    c() {
      a = element("a");
      if_block.c();
      set_attributes(a, a_data);
    },
    m(target, anchor) {
      insert(target, a, anchor);
      if_blocks[current_block_type_index].m(a, null);
      ctx[22](a);
      current = true;
      if (!mounted) {
        dispose = listen(a, "click", ctx[20]);
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_1(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(a, null);
      }
      set_attributes(a, a_data = get_spread_update(a_levels, [
        dirty & 512 && ctx2[9],
        (!current || dirty & 128) && {class: ctx2[7]},
        (!current || dirty & 4) && {disabled: ctx2[2]},
        (!current || dirty & 8) && {href: ctx2[3]},
        (!current || dirty & 320 && a_aria_label_value !== (a_aria_label_value = ctx2[8] || ctx2[6])) && {"aria-label": a_aria_label_value},
        (!current || dirty & 16) && {style: ctx2[4]}
      ]));
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(a);
      if_blocks[current_block_type_index].d();
      ctx[22](null);
      mounted = false;
      dispose();
    }
  };
}
function create_else_block_2(ctx) {
  let current;
  const default_slot_template = ctx[19].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[18], null);
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 262144)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[18], !current ? get_all_dirty_from_scope(ctx2[18]) : get_slot_changes(default_slot_template, ctx2[18], dirty, null), null);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_if_block_2(ctx) {
  let t;
  return {
    c() {
      t = text(ctx[1]);
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 2)
        set_data(t, ctx2[1]);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function fallback_block(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block_2, create_else_block_2];
  const if_blocks = [];
  function select_block_type_2(ctx2, dirty) {
    if (ctx2[1])
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type_2(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_2(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_else_block(ctx) {
  let current;
  const default_slot_template = ctx[19].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[18], null);
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 262144)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[18], !current ? get_all_dirty_from_scope(ctx2[18]) : get_slot_changes(default_slot_template, ctx2[18], dirty, null), null);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_if_block_1(ctx) {
  let t;
  return {
    c() {
      t = text(ctx[1]);
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 2)
        set_data(t, ctx2[1]);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_fragment(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block, create_else_block_1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (ctx2[3])
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let ariaLabel;
  let classes;
  let defaultAriaLabel;
  const omit_props_names = [
    "class",
    "active",
    "block",
    "children",
    "close",
    "color",
    "disabled",
    "href",
    "inner",
    "outline",
    "size",
    "style",
    "value",
    "white"
  ];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let {$$slots: slots = {}, $$scope} = $$props;
  let {class: className2 = ""} = $$props;
  let {active = false} = $$props;
  let {block = false} = $$props;
  let {children: children2 = void 0} = $$props;
  let {close = false} = $$props;
  let {color = "secondary"} = $$props;
  let {disabled = false} = $$props;
  let {href = ""} = $$props;
  let {inner = void 0} = $$props;
  let {outline = false} = $$props;
  let {size = null} = $$props;
  let {style = ""} = $$props;
  let {value = ""} = $$props;
  let {white = false} = $$props;
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function click_handler_1(event) {
    bubble.call(this, $$self, event);
  }
  function a_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      inner = $$value;
      $$invalidate(0, inner);
    });
  }
  function button_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      inner = $$value;
      $$invalidate(0, inner);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$invalidate(24, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    $$invalidate(9, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(10, className2 = $$new_props.class);
    if ("active" in $$new_props)
      $$invalidate(11, active = $$new_props.active);
    if ("block" in $$new_props)
      $$invalidate(12, block = $$new_props.block);
    if ("children" in $$new_props)
      $$invalidate(1, children2 = $$new_props.children);
    if ("close" in $$new_props)
      $$invalidate(13, close = $$new_props.close);
    if ("color" in $$new_props)
      $$invalidate(14, color = $$new_props.color);
    if ("disabled" in $$new_props)
      $$invalidate(2, disabled = $$new_props.disabled);
    if ("href" in $$new_props)
      $$invalidate(3, href = $$new_props.href);
    if ("inner" in $$new_props)
      $$invalidate(0, inner = $$new_props.inner);
    if ("outline" in $$new_props)
      $$invalidate(15, outline = $$new_props.outline);
    if ("size" in $$new_props)
      $$invalidate(16, size = $$new_props.size);
    if ("style" in $$new_props)
      $$invalidate(4, style = $$new_props.style);
    if ("value" in $$new_props)
      $$invalidate(5, value = $$new_props.value);
    if ("white" in $$new_props)
      $$invalidate(17, white = $$new_props.white);
    if ("$$scope" in $$new_props)
      $$invalidate(18, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    $$invalidate(8, ariaLabel = $$props["aria-label"]);
    if ($$self.$$.dirty & 261120) {
      $$invalidate(7, classes = classnames(className2, close ? "btn-close" : "btn", close || `btn${outline ? "-outline" : ""}-${color}`, size ? `btn-${size}` : false, block ? "d-block w-100" : false, {
        active,
        "btn-close-white": close && white
      }));
    }
    if ($$self.$$.dirty & 8192) {
      $$invalidate(6, defaultAriaLabel = close ? "Close" : null);
    }
  };
  $$props = exclude_internal_props($$props);
  return [
    inner,
    children2,
    disabled,
    href,
    style,
    value,
    defaultAriaLabel,
    classes,
    ariaLabel,
    $$restProps,
    className2,
    active,
    block,
    close,
    color,
    outline,
    size,
    white,
    $$scope,
    slots,
    click_handler,
    click_handler_1,
    a_binding,
    button_binding
  ];
}
var Button = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {
      class: 10,
      active: 11,
      block: 12,
      children: 1,
      close: 13,
      color: 14,
      disabled: 2,
      href: 3,
      inner: 0,
      outline: 15,
      size: 16,
      style: 4,
      value: 5,
      white: 17
    });
  }
};
function create_fragment$1(ctx) {
  let div;
  let div_class_value;
  let current;
  const default_slot_template = ctx[10].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[9], null);
  let div_levels = [
    ctx[1],
    {
      class: div_class_value = ctx[0].join(" ")
    }
  ];
  let div_data = {};
  for (let i = 0; i < div_levels.length; i += 1) {
    div_data = assign(div_data, div_levels[i]);
  }
  return {
    c() {
      div = element("div");
      if (default_slot)
        default_slot.c();
      set_attributes(div, div_data);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 512)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[9], !current ? get_all_dirty_from_scope(ctx2[9]) : get_slot_changes(default_slot_template, ctx2[9], dirty, null), null);
        }
      }
      set_attributes(div, div_data = get_spread_update(div_levels, [
        dirty & 2 && ctx2[1],
        {class: div_class_value}
      ]));
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "xs", "sm", "md", "lg", "xl", "xxl"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let {$$slots: slots = {}, $$scope} = $$props;
  let {class: className2 = ""} = $$props;
  let {xs = void 0} = $$props;
  let {sm = void 0} = $$props;
  let {md = void 0} = $$props;
  let {lg = void 0} = $$props;
  let {xl = void 0} = $$props;
  let {xxl = void 0} = $$props;
  const colClasses = [];
  const lookup = {xs, sm, md, lg, xl, xxl};
  Object.keys(lookup).forEach((colWidth) => {
    const columnProp = lookup[colWidth];
    if (!columnProp && columnProp !== "") {
      return;
    }
    const isXs = colWidth === "xs";
    if (isObject(columnProp)) {
      const colSizeInterfix = isXs ? "-" : `-${colWidth}-`;
      const colClass = getColumnSizeClass(isXs, colWidth, columnProp.size);
      if (columnProp.size || columnProp.size === "") {
        colClasses.push(colClass);
      }
      if (columnProp.push) {
        colClasses.push(`push${colSizeInterfix}${columnProp.push}`);
      }
      if (columnProp.pull) {
        colClasses.push(`pull${colSizeInterfix}${columnProp.pull}`);
      }
      if (columnProp.offset) {
        colClasses.push(`offset${colSizeInterfix}${columnProp.offset}`);
      }
      if (columnProp.order) {
        colClasses.push(`order${colSizeInterfix}${columnProp.order}`);
      }
    } else {
      colClasses.push(getColumnSizeClass(isXs, colWidth, columnProp));
    }
  });
  if (!colClasses.length) {
    colClasses.push("col");
  }
  if (className2) {
    colClasses.push(className2);
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(2, className2 = $$new_props.class);
    if ("xs" in $$new_props)
      $$invalidate(3, xs = $$new_props.xs);
    if ("sm" in $$new_props)
      $$invalidate(4, sm = $$new_props.sm);
    if ("md" in $$new_props)
      $$invalidate(5, md = $$new_props.md);
    if ("lg" in $$new_props)
      $$invalidate(6, lg = $$new_props.lg);
    if ("xl" in $$new_props)
      $$invalidate(7, xl = $$new_props.xl);
    if ("xxl" in $$new_props)
      $$invalidate(8, xxl = $$new_props.xxl);
    if ("$$scope" in $$new_props)
      $$invalidate(9, $$scope = $$new_props.$$scope);
  };
  return [colClasses, $$restProps, className2, xs, sm, md, lg, xl, xxl, $$scope, slots];
}
var Col = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {
      class: 2,
      xs: 3,
      sm: 4,
      md: 5,
      lg: 6,
      xl: 7,
      xxl: 8
    });
  }
};
function create_fragment$2(ctx) {
  let div;
  let current;
  const default_slot_template = ctx[10].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[9], null);
  let div_levels = [ctx[1], {class: ctx[0]}];
  let div_data = {};
  for (let i = 0; i < div_levels.length; i += 1) {
    div_data = assign(div_data, div_levels[i]);
  }
  return {
    c() {
      div = element("div");
      if (default_slot)
        default_slot.c();
      set_attributes(div, div_data);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 512)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[9], !current ? get_all_dirty_from_scope(ctx2[9]) : get_slot_changes(default_slot_template, ctx2[9], dirty, null), null);
        }
      }
      set_attributes(div, div_data = get_spread_update(div_levels, [
        dirty & 2 && ctx2[1],
        (!current || dirty & 1) && {class: ctx2[0]}
      ]));
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let classes;
  const omit_props_names = ["class", "sm", "md", "lg", "xl", "xxl", "fluid"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let {$$slots: slots = {}, $$scope} = $$props;
  let {class: className2 = ""} = $$props;
  let {sm = void 0} = $$props;
  let {md = void 0} = $$props;
  let {lg = void 0} = $$props;
  let {xl = void 0} = $$props;
  let {xxl = void 0} = $$props;
  let {fluid = false} = $$props;
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(2, className2 = $$new_props.class);
    if ("sm" in $$new_props)
      $$invalidate(3, sm = $$new_props.sm);
    if ("md" in $$new_props)
      $$invalidate(4, md = $$new_props.md);
    if ("lg" in $$new_props)
      $$invalidate(5, lg = $$new_props.lg);
    if ("xl" in $$new_props)
      $$invalidate(6, xl = $$new_props.xl);
    if ("xxl" in $$new_props)
      $$invalidate(7, xxl = $$new_props.xxl);
    if ("fluid" in $$new_props)
      $$invalidate(8, fluid = $$new_props.fluid);
    if ("$$scope" in $$new_props)
      $$invalidate(9, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 508) {
      $$invalidate(0, classes = classnames(className2, {
        "container-sm": sm,
        "container-md": md,
        "container-lg": lg,
        "container-xl": xl,
        "container-xxl": xxl,
        "container-fluid": fluid,
        container: !sm && !md && !lg && !xl && !xxl && !fluid
      }));
    }
  };
  return [classes, $$restProps, className2, sm, md, lg, xl, xxl, fluid, $$scope, slots];
}
var Container = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, {
      class: 2,
      sm: 3,
      md: 4,
      lg: 5,
      xl: 6,
      xxl: 7,
      fluid: 8
    });
  }
};
var get_label_slot_changes = (dirty) => ({});
var get_label_slot_context = (ctx) => ({});
function create_else_block$1(ctx) {
  let input;
  let mounted;
  let dispose;
  let input_levels = [
    ctx[11],
    {class: ctx[9]},
    {id: ctx[8]},
    {type: "checkbox"},
    {disabled: ctx[3]},
    {name: ctx[5]},
    {__value: ctx[7]}
  ];
  let input_data = {};
  for (let i = 0; i < input_levels.length; i += 1) {
    input_data = assign(input_data, input_levels[i]);
  }
  return {
    c() {
      input = element("input");
      set_attributes(input, input_data);
    },
    m(target, anchor) {
      insert(target, input, anchor);
      if (input.autofocus)
        input.focus();
      input.checked = ctx[0];
      ctx[38](input);
      if (!mounted) {
        dispose = [
          listen(input, "blur", ctx[28]),
          listen(input, "change", ctx[29]),
          listen(input, "focus", ctx[30]),
          listen(input, "input", ctx[31]),
          listen(input, "change", ctx[37])
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      set_attributes(input, input_data = get_spread_update(input_levels, [
        dirty[0] & 2048 && ctx2[11],
        dirty[0] & 512 && {class: ctx2[9]},
        dirty[0] & 256 && {id: ctx2[8]},
        {type: "checkbox"},
        dirty[0] & 8 && {disabled: ctx2[3]},
        dirty[0] & 32 && {name: ctx2[5]},
        dirty[0] & 128 && {__value: ctx2[7]}
      ]));
      if (dirty[0] & 1) {
        input.checked = ctx2[0];
      }
    },
    d(detaching) {
      if (detaching)
        detach(input);
      ctx[38](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_2$1(ctx) {
  let input;
  let mounted;
  let dispose;
  let input_levels = [
    ctx[11],
    {class: ctx[9]},
    {id: ctx[8]},
    {type: "checkbox"},
    {disabled: ctx[3]},
    {name: ctx[5]},
    {__value: ctx[7]}
  ];
  let input_data = {};
  for (let i = 0; i < input_levels.length; i += 1) {
    input_data = assign(input_data, input_levels[i]);
  }
  return {
    c() {
      input = element("input");
      set_attributes(input, input_data);
    },
    m(target, anchor) {
      insert(target, input, anchor);
      if (input.autofocus)
        input.focus();
      input.checked = ctx[0];
      ctx[36](input);
      if (!mounted) {
        dispose = [
          listen(input, "blur", ctx[24]),
          listen(input, "change", ctx[25]),
          listen(input, "focus", ctx[26]),
          listen(input, "input", ctx[27]),
          listen(input, "change", ctx[35])
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      set_attributes(input, input_data = get_spread_update(input_levels, [
        dirty[0] & 2048 && ctx2[11],
        dirty[0] & 512 && {class: ctx2[9]},
        dirty[0] & 256 && {id: ctx2[8]},
        {type: "checkbox"},
        dirty[0] & 8 && {disabled: ctx2[3]},
        dirty[0] & 32 && {name: ctx2[5]},
        dirty[0] & 128 && {__value: ctx2[7]}
      ]));
      if (dirty[0] & 1) {
        input.checked = ctx2[0];
      }
    },
    d(detaching) {
      if (detaching)
        detach(input);
      ctx[36](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_1$1(ctx) {
  let input;
  let mounted;
  let dispose;
  let input_levels = [
    ctx[11],
    {class: ctx[9]},
    {id: ctx[8]},
    {type: "radio"},
    {disabled: ctx[3]},
    {name: ctx[5]},
    {__value: ctx[7]}
  ];
  let input_data = {};
  for (let i = 0; i < input_levels.length; i += 1) {
    input_data = assign(input_data, input_levels[i]);
  }
  return {
    c() {
      input = element("input");
      set_attributes(input, input_data);
      ctx[33][0].push(input);
    },
    m(target, anchor) {
      insert(target, input, anchor);
      if (input.autofocus)
        input.focus();
      input.checked = input.__value === ctx[1];
      ctx[34](input);
      if (!mounted) {
        dispose = [
          listen(input, "blur", ctx[20]),
          listen(input, "change", ctx[21]),
          listen(input, "focus", ctx[22]),
          listen(input, "input", ctx[23]),
          listen(input, "change", ctx[32])
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      set_attributes(input, input_data = get_spread_update(input_levels, [
        dirty[0] & 2048 && ctx2[11],
        dirty[0] & 512 && {class: ctx2[9]},
        dirty[0] & 256 && {id: ctx2[8]},
        {type: "radio"},
        dirty[0] & 8 && {disabled: ctx2[3]},
        dirty[0] & 32 && {name: ctx2[5]},
        dirty[0] & 128 && {__value: ctx2[7]}
      ]));
      if (dirty[0] & 2) {
        input.checked = input.__value === ctx2[1];
      }
    },
    d(detaching) {
      if (detaching)
        detach(input);
      ctx[33][0].splice(ctx[33][0].indexOf(input), 1);
      ctx[34](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block$1(ctx) {
  let label_1;
  let current;
  const label_slot_template = ctx[19].label;
  const label_slot = create_slot(label_slot_template, ctx, ctx[18], get_label_slot_context);
  const label_slot_or_fallback = label_slot || fallback_block$1(ctx);
  return {
    c() {
      label_1 = element("label");
      if (label_slot_or_fallback)
        label_slot_or_fallback.c();
      attr(label_1, "class", "form-check-label");
      attr(label_1, "for", ctx[8]);
    },
    m(target, anchor) {
      insert(target, label_1, anchor);
      if (label_slot_or_fallback) {
        label_slot_or_fallback.m(label_1, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (label_slot) {
        if (label_slot.p && (!current || dirty[0] & 262144)) {
          update_slot_base(label_slot, label_slot_template, ctx2, ctx2[18], !current ? get_all_dirty_from_scope(ctx2[18]) : get_slot_changes(label_slot_template, ctx2[18], dirty, get_label_slot_changes), get_label_slot_context);
        }
      } else {
        if (label_slot_or_fallback && label_slot_or_fallback.p && (!current || dirty[0] & 16)) {
          label_slot_or_fallback.p(ctx2, !current ? [-1, -1] : dirty);
        }
      }
      if (!current || dirty[0] & 256) {
        attr(label_1, "for", ctx2[8]);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(label_slot_or_fallback, local);
      current = true;
    },
    o(local) {
      transition_out(label_slot_or_fallback, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(label_1);
      if (label_slot_or_fallback)
        label_slot_or_fallback.d(detaching);
    }
  };
}
function fallback_block$1(ctx) {
  let t;
  return {
    c() {
      t = text(ctx[4]);
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty[0] & 16)
        set_data(t, ctx2[4]);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_fragment$3(ctx) {
  let div;
  let t;
  let current;
  function select_block_type(ctx2, dirty) {
    if (ctx2[6] === "radio")
      return create_if_block_1$1;
    if (ctx2[6] === "switch")
      return create_if_block_2$1;
    return create_else_block$1;
  }
  let current_block_type = select_block_type(ctx);
  let if_block0 = current_block_type(ctx);
  let if_block1 = ctx[4] && create_if_block$1(ctx);
  return {
    c() {
      div = element("div");
      if_block0.c();
      t = space();
      if (if_block1)
        if_block1.c();
      attr(div, "class", ctx[10]);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if_block0.m(div, null);
      append(div, t);
      if (if_block1)
        if_block1.m(div, null);
      current = true;
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block0) {
        if_block0.p(ctx2, dirty);
      } else {
        if_block0.d(1);
        if_block0 = current_block_type(ctx2);
        if (if_block0) {
          if_block0.c();
          if_block0.m(div, t);
        }
      }
      if (ctx2[4]) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty[0] & 16) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block$1(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      if (!current || dirty[0] & 1024) {
        attr(div, "class", ctx2[10]);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if_block0.d();
      if (if_block1)
        if_block1.d();
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  let classes;
  let inputClasses;
  let idFor;
  const omit_props_names = [
    "class",
    "checked",
    "disabled",
    "group",
    "id",
    "inline",
    "inner",
    "invalid",
    "label",
    "name",
    "size",
    "type",
    "valid",
    "value"
  ];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let {$$slots: slots = {}, $$scope} = $$props;
  let {class: className2 = ""} = $$props;
  let {checked = false} = $$props;
  let {disabled = false} = $$props;
  let {group = void 0} = $$props;
  let {id = void 0} = $$props;
  let {inline = false} = $$props;
  let {inner = void 0} = $$props;
  let {invalid = false} = $$props;
  let {label = ""} = $$props;
  let {name = ""} = $$props;
  let {size = ""} = $$props;
  let {type = "checkbox"} = $$props;
  let {valid = false} = $$props;
  let {value = void 0} = $$props;
  const $$binding_groups = [[]];
  function blur_handler(event) {
    bubble.call(this, $$self, event);
  }
  function change_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler(event) {
    bubble.call(this, $$self, event);
  }
  function input_handler(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler_1(event) {
    bubble.call(this, $$self, event);
  }
  function change_handler_1(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler_1(event) {
    bubble.call(this, $$self, event);
  }
  function input_handler_1(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler_2(event) {
    bubble.call(this, $$self, event);
  }
  function change_handler_2(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler_2(event) {
    bubble.call(this, $$self, event);
  }
  function input_handler_2(event) {
    bubble.call(this, $$self, event);
  }
  function input_change_handler() {
    group = this.__value;
    $$invalidate(1, group);
  }
  function input_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      inner = $$value;
      $$invalidate(2, inner);
    });
  }
  function input_change_handler_1() {
    checked = this.checked;
    $$invalidate(0, checked);
  }
  function input_binding_1($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      inner = $$value;
      $$invalidate(2, inner);
    });
  }
  function input_change_handler_2() {
    checked = this.checked;
    $$invalidate(0, checked);
  }
  function input_binding_2($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      inner = $$value;
      $$invalidate(2, inner);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(11, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(12, className2 = $$new_props.class);
    if ("checked" in $$new_props)
      $$invalidate(0, checked = $$new_props.checked);
    if ("disabled" in $$new_props)
      $$invalidate(3, disabled = $$new_props.disabled);
    if ("group" in $$new_props)
      $$invalidate(1, group = $$new_props.group);
    if ("id" in $$new_props)
      $$invalidate(13, id = $$new_props.id);
    if ("inline" in $$new_props)
      $$invalidate(14, inline = $$new_props.inline);
    if ("inner" in $$new_props)
      $$invalidate(2, inner = $$new_props.inner);
    if ("invalid" in $$new_props)
      $$invalidate(15, invalid = $$new_props.invalid);
    if ("label" in $$new_props)
      $$invalidate(4, label = $$new_props.label);
    if ("name" in $$new_props)
      $$invalidate(5, name = $$new_props.name);
    if ("size" in $$new_props)
      $$invalidate(16, size = $$new_props.size);
    if ("type" in $$new_props)
      $$invalidate(6, type = $$new_props.type);
    if ("valid" in $$new_props)
      $$invalidate(17, valid = $$new_props.valid);
    if ("value" in $$new_props)
      $$invalidate(7, value = $$new_props.value);
    if ("$$scope" in $$new_props)
      $$invalidate(18, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & 86080) {
      $$invalidate(10, classes = classnames(className2, "form-check", {
        "form-switch": type === "switch",
        "form-check-inline": inline,
        [`form-control-${size}`]: size
      }));
    }
    if ($$self.$$.dirty[0] & 163840) {
      $$invalidate(9, inputClasses = classnames("form-check-input", {"is-invalid": invalid, "is-valid": valid}));
    }
    if ($$self.$$.dirty[0] & 8208) {
      $$invalidate(8, idFor = id || label);
    }
  };
  return [
    checked,
    group,
    inner,
    disabled,
    label,
    name,
    type,
    value,
    idFor,
    inputClasses,
    classes,
    $$restProps,
    className2,
    id,
    inline,
    invalid,
    size,
    valid,
    $$scope,
    slots,
    blur_handler,
    change_handler,
    focus_handler,
    input_handler,
    blur_handler_1,
    change_handler_1,
    focus_handler_1,
    input_handler_1,
    blur_handler_2,
    change_handler_2,
    focus_handler_2,
    input_handler_2,
    input_change_handler,
    $$binding_groups,
    input_binding,
    input_change_handler_1,
    input_binding_1,
    input_change_handler_2,
    input_binding_2
  ];
}
var FormCheck = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, {
      class: 12,
      checked: 0,
      disabled: 3,
      group: 1,
      id: 13,
      inline: 14,
      inner: 2,
      invalid: 15,
      label: 4,
      name: 5,
      size: 16,
      type: 6,
      valid: 17,
      value: 7
    }, null, [-1, -1]);
  }
};
function create_fragment$4(ctx) {
  let div;
  let current;
  const default_slot_template = ctx[6].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[5], null);
  let div_levels = [ctx[1], {class: ctx[0]}];
  let div_data = {};
  for (let i = 0; i < div_levels.length; i += 1) {
    div_data = assign(div_data, div_levels[i]);
  }
  return {
    c() {
      div = element("div");
      if (default_slot)
        default_slot.c();
      set_attributes(div, div_data);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 32)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[5], !current ? get_all_dirty_from_scope(ctx2[5]) : get_slot_changes(default_slot_template, ctx2[5], dirty, null), null);
        }
      }
      set_attributes(div, div_data = get_spread_update(div_levels, [
        dirty & 2 && ctx2[1],
        (!current || dirty & 1) && {class: ctx2[0]}
      ]));
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function instance$4($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "valid", "tooltip"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let {$$slots: slots = {}, $$scope} = $$props;
  let {class: className2 = ""} = $$props;
  let {valid = void 0} = $$props;
  let {tooltip = false} = $$props;
  let classes;
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(2, className2 = $$new_props.class);
    if ("valid" in $$new_props)
      $$invalidate(3, valid = $$new_props.valid);
    if ("tooltip" in $$new_props)
      $$invalidate(4, tooltip = $$new_props.tooltip);
    if ("$$scope" in $$new_props)
      $$invalidate(5, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 28) {
      {
        const validMode = tooltip ? "tooltip" : "feedback";
        $$invalidate(0, classes = classnames(className2, valid ? `valid-${validMode}` : `invalid-${validMode}`));
      }
    }
  };
  return [classes, $$restProps, className2, valid, tooltip, $$scope, slots];
}
var FormFeedback = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$4, safe_not_equal, {class: 2, valid: 3, tooltip: 4});
  }
};
var get_label_slot_changes_1 = (dirty) => ({});
var get_label_slot_context_1 = (ctx) => ({});
var get_label_slot_changes$1 = (dirty) => ({});
var get_label_slot_context$1 = (ctx) => ({});
function create_else_block$2(ctx) {
  let div;
  let t;
  let current;
  const default_slot_template = ctx[12].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[11], null);
  let if_block = (ctx[0] || ctx[4].label) && create_if_block_2$2(ctx);
  let div_levels = [ctx[3], {class: ctx[2]}];
  let div_data = {};
  for (let i = 0; i < div_levels.length; i += 1) {
    div_data = assign(div_data, div_levels[i]);
  }
  return {
    c() {
      div = element("div");
      if (default_slot)
        default_slot.c();
      t = space();
      if (if_block)
        if_block.c();
      set_attributes(div, div_data);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      append(div, t);
      if (if_block)
        if_block.m(div, null);
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 2048)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[11], !current ? get_all_dirty_from_scope(ctx2[11]) : get_slot_changes(default_slot_template, ctx2[11], dirty, null), null);
        }
      }
      if (ctx2[0] || ctx2[4].label) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 17) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_2$2(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      set_attributes(div, div_data = get_spread_update(div_levels, [
        dirty & 8 && ctx2[3],
        (!current || dirty & 4) && {class: ctx2[2]}
      ]));
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (default_slot)
        default_slot.d(detaching);
      if (if_block)
        if_block.d();
    }
  };
}
function create_if_block$2(ctx) {
  let fieldset;
  let t;
  let current;
  const default_slot_template = ctx[12].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[11], null);
  let if_block = (ctx[0] || ctx[4].label) && create_if_block_1$2(ctx);
  let fieldset_levels = [ctx[3], {class: ctx[2]}];
  let fieldset_data = {};
  for (let i = 0; i < fieldset_levels.length; i += 1) {
    fieldset_data = assign(fieldset_data, fieldset_levels[i]);
  }
  return {
    c() {
      fieldset = element("fieldset");
      if (default_slot)
        default_slot.c();
      t = space();
      if (if_block)
        if_block.c();
      set_attributes(fieldset, fieldset_data);
    },
    m(target, anchor) {
      insert(target, fieldset, anchor);
      if (default_slot) {
        default_slot.m(fieldset, null);
      }
      append(fieldset, t);
      if (if_block)
        if_block.m(fieldset, null);
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 2048)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[11], !current ? get_all_dirty_from_scope(ctx2[11]) : get_slot_changes(default_slot_template, ctx2[11], dirty, null), null);
        }
      }
      if (ctx2[0] || ctx2[4].label) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 17) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_1$2(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(fieldset, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      set_attributes(fieldset, fieldset_data = get_spread_update(fieldset_levels, [
        dirty & 8 && ctx2[3],
        (!current || dirty & 4) && {class: ctx2[2]}
      ]));
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(fieldset);
      if (default_slot)
        default_slot.d(detaching);
      if (if_block)
        if_block.d();
    }
  };
}
function create_if_block_2$2(ctx) {
  let label_1;
  let t0;
  let t1;
  let current;
  const label_slot_template = ctx[12].label;
  const label_slot = create_slot(label_slot_template, ctx, ctx[11], get_label_slot_context_1);
  return {
    c() {
      label_1 = element("label");
      t0 = text(ctx[0]);
      t1 = space();
      if (label_slot)
        label_slot.c();
    },
    m(target, anchor) {
      insert(target, label_1, anchor);
      append(label_1, t0);
      append(label_1, t1);
      if (label_slot) {
        label_slot.m(label_1, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (!current || dirty & 1)
        set_data(t0, ctx2[0]);
      if (label_slot) {
        if (label_slot.p && (!current || dirty & 2048)) {
          update_slot_base(label_slot, label_slot_template, ctx2, ctx2[11], !current ? get_all_dirty_from_scope(ctx2[11]) : get_slot_changes(label_slot_template, ctx2[11], dirty, get_label_slot_changes_1), get_label_slot_context_1);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(label_slot, local);
      current = true;
    },
    o(local) {
      transition_out(label_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(label_1);
      if (label_slot)
        label_slot.d(detaching);
    }
  };
}
function create_if_block_1$2(ctx) {
  let label_1;
  let t0;
  let t1;
  let current;
  const label_slot_template = ctx[12].label;
  const label_slot = create_slot(label_slot_template, ctx, ctx[11], get_label_slot_context$1);
  return {
    c() {
      label_1 = element("label");
      t0 = text(ctx[0]);
      t1 = space();
      if (label_slot)
        label_slot.c();
    },
    m(target, anchor) {
      insert(target, label_1, anchor);
      append(label_1, t0);
      append(label_1, t1);
      if (label_slot) {
        label_slot.m(label_1, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (!current || dirty & 1)
        set_data(t0, ctx2[0]);
      if (label_slot) {
        if (label_slot.p && (!current || dirty & 2048)) {
          update_slot_base(label_slot, label_slot_template, ctx2, ctx2[11], !current ? get_all_dirty_from_scope(ctx2[11]) : get_slot_changes(label_slot_template, ctx2[11], dirty, get_label_slot_changes$1), get_label_slot_context$1);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(label_slot, local);
      current = true;
    },
    o(local) {
      transition_out(label_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(label_1);
      if (label_slot)
        label_slot.d(detaching);
    }
  };
}
function create_fragment$5(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block$2, create_else_block$2];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (ctx2[1] === "fieldset")
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance$5($$self, $$props, $$invalidate) {
  let classes;
  const omit_props_names = ["class", "check", "disabled", "floating", "inline", "label", "row", "tag"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let {$$slots: slots = {}, $$scope} = $$props;
  const $$slots = compute_slots(slots);
  let {class: className2 = ""} = $$props;
  let {check = false} = $$props;
  let {disabled = false} = $$props;
  let {floating = false} = $$props;
  let {inline = false} = $$props;
  let {label = ""} = $$props;
  let {row = false} = $$props;
  let {tag = null} = $$props;
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(5, className2 = $$new_props.class);
    if ("check" in $$new_props)
      $$invalidate(6, check = $$new_props.check);
    if ("disabled" in $$new_props)
      $$invalidate(7, disabled = $$new_props.disabled);
    if ("floating" in $$new_props)
      $$invalidate(8, floating = $$new_props.floating);
    if ("inline" in $$new_props)
      $$invalidate(9, inline = $$new_props.inline);
    if ("label" in $$new_props)
      $$invalidate(0, label = $$new_props.label);
    if ("row" in $$new_props)
      $$invalidate(10, row = $$new_props.row);
    if ("tag" in $$new_props)
      $$invalidate(1, tag = $$new_props.tag);
    if ("$$scope" in $$new_props)
      $$invalidate(11, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 2016) {
      $$invalidate(2, classes = classnames(className2, "mb-3", {
        row,
        "form-check": check,
        "form-check-inline": check && inline,
        "form-floating": floating,
        disabled: check && disabled
      }));
    }
  };
  return [
    label,
    tag,
    classes,
    $$restProps,
    $$slots,
    className2,
    check,
    disabled,
    floating,
    inline,
    row,
    $$scope,
    slots
  ];
}
var FormGroup = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$5, create_fragment$5, safe_not_equal, {
      class: 5,
      check: 6,
      disabled: 7,
      floating: 8,
      inline: 9,
      label: 0,
      row: 10,
      tag: 1
    });
  }
};
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[210] = list[i];
  return child_ctx;
}
function create_if_block_22(ctx) {
  let select;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = ctx[24].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[209], null);
  let select_levels = [
    ctx[21],
    {class: ctx[18]},
    {name: ctx[13]},
    {disabled: ctx[8]},
    {readonly: ctx[15]}
  ];
  let select_data = {};
  for (let i = 0; i < select_levels.length; i += 1) {
    select_data = assign(select_data, select_levels[i]);
  }
  return {
    c() {
      select = element("select");
      if (default_slot)
        default_slot.c();
      set_attributes(select, select_data);
      if (ctx[6] === void 0)
        add_render_callback(() => ctx[207].call(select));
    },
    m(target, anchor) {
      insert(target, select, anchor);
      if (default_slot) {
        default_slot.m(select, null);
      }
      (select_data.multiple ? select_options : select_option)(select, select_data.value);
      if (select.autofocus)
        select.focus();
      select_option(select, ctx[6]);
      ctx[208](select);
      current = true;
      if (!mounted) {
        dispose = [
          listen(select, "blur", ctx[156]),
          listen(select, "change", ctx[157]),
          listen(select, "focus", ctx[158]),
          listen(select, "input", ctx[159]),
          listen(select, "change", ctx[207])
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty[6] & 8388608)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[209], !current ? get_all_dirty_from_scope(ctx2[209]) : get_slot_changes(default_slot_template, ctx2[209], dirty, null), null);
        }
      }
      set_attributes(select, select_data = get_spread_update(select_levels, [
        dirty[0] & 2097152 && ctx2[21],
        (!current || dirty[0] & 262144) && {class: ctx2[18]},
        (!current || dirty[0] & 8192) && {name: ctx2[13]},
        (!current || dirty[0] & 256) && {disabled: ctx2[8]},
        (!current || dirty[0] & 32768) && {readonly: ctx2[15]}
      ]));
      if (dirty[0] & 2400512 && "value" in select_data)
        (select_data.multiple ? select_options : select_option)(select, select_data.value);
      if (dirty[0] & 64) {
        select_option(select, ctx2[6]);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(select);
      if (default_slot)
        default_slot.d(detaching);
      ctx[208](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_21(ctx) {
  let textarea;
  let mounted;
  let dispose;
  let textarea_levels = [
    ctx[21],
    {class: ctx[18]},
    {disabled: ctx[8]},
    {name: ctx[13]},
    {placeholder: ctx[14]},
    {readOnly: ctx[15]}
  ];
  let textarea_data = {};
  for (let i = 0; i < textarea_levels.length; i += 1) {
    textarea_data = assign(textarea_data, textarea_levels[i]);
  }
  return {
    c() {
      textarea = element("textarea");
      set_attributes(textarea, textarea_data);
    },
    m(target, anchor) {
      insert(target, textarea, anchor);
      if (textarea.autofocus)
        textarea.focus();
      set_input_value(textarea, ctx[6]);
      ctx[206](textarea);
      if (!mounted) {
        dispose = [
          listen(textarea, "blur", ctx[149]),
          listen(textarea, "change", ctx[150]),
          listen(textarea, "focus", ctx[151]),
          listen(textarea, "input", ctx[152]),
          listen(textarea, "keydown", ctx[153]),
          listen(textarea, "keypress", ctx[154]),
          listen(textarea, "keyup", ctx[155]),
          listen(textarea, "input", ctx[205])
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      set_attributes(textarea, textarea_data = get_spread_update(textarea_levels, [
        dirty[0] & 2097152 && ctx2[21],
        dirty[0] & 262144 && {class: ctx2[18]},
        dirty[0] & 256 && {disabled: ctx2[8]},
        dirty[0] & 8192 && {name: ctx2[13]},
        dirty[0] & 16384 && {placeholder: ctx2[14]},
        dirty[0] & 32768 && {readOnly: ctx2[15]}
      ]));
      if (dirty[0] & 64) {
        set_input_value(textarea, ctx2[6]);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(textarea);
      ctx[206](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_2$3(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [
    create_if_block_3,
    create_if_block_4,
    create_if_block_5,
    create_if_block_6,
    create_if_block_7,
    create_if_block_8,
    create_if_block_9,
    create_if_block_10,
    create_if_block_11,
    create_if_block_12,
    create_if_block_13,
    create_if_block_14,
    create_if_block_15,
    create_if_block_16,
    create_if_block_17,
    create_if_block_18,
    create_if_block_19,
    create_if_block_20,
    create_else_block_1$1
  ];
  const if_blocks = [];
  function select_block_type_1(ctx2, dirty) {
    if (ctx2[16] === "text")
      return 0;
    if (ctx2[16] === "password")
      return 1;
    if (ctx2[16] === "color")
      return 2;
    if (ctx2[16] === "email")
      return 3;
    if (ctx2[16] === "file")
      return 4;
    if (ctx2[16] === "checkbox" || ctx2[16] === "radio" || ctx2[16] === "switch")
      return 5;
    if (ctx2[16] === "url")
      return 6;
    if (ctx2[16] === "number")
      return 7;
    if (ctx2[16] === "date")
      return 8;
    if (ctx2[16] === "time")
      return 9;
    if (ctx2[16] === "datetime")
      return 10;
    if (ctx2[16] === "datetime-local")
      return 11;
    if (ctx2[16] === "month")
      return 12;
    if (ctx2[16] === "color")
      return 13;
    if (ctx2[16] === "range")
      return 14;
    if (ctx2[16] === "search")
      return 15;
    if (ctx2[16] === "tel")
      return 16;
    if (ctx2[16] === "week")
      return 17;
    return 18;
  }
  current_block_type_index = select_block_type_1(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_1(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_else_block_1$1(ctx) {
  let input;
  let mounted;
  let dispose;
  let input_levels = [
    ctx[21],
    {type: ctx[16]},
    {readOnly: ctx[15]},
    {class: ctx[18]},
    {name: ctx[13]},
    {disabled: ctx[8]},
    {placeholder: ctx[14]},
    {value: ctx[6]}
  ];
  let input_data = {};
  for (let i = 0; i < input_levels.length; i += 1) {
    input_data = assign(input_data, input_levels[i]);
  }
  return {
    c() {
      input = element("input");
      set_attributes(input, input_data);
    },
    m(target, anchor) {
      insert(target, input, anchor);
      input.value = input_data.value;
      if (input.autofocus)
        input.focus();
      if (!mounted) {
        dispose = [
          listen(input, "blur", ctx[144]),
          listen(input, "change", ctx[20]),
          listen(input, "focus", ctx[145]),
          listen(input, "input", ctx[20]),
          listen(input, "keydown", ctx[146]),
          listen(input, "keypress", ctx[147]),
          listen(input, "keyup", ctx[148])
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      set_attributes(input, input_data = get_spread_update(input_levels, [
        dirty[0] & 2097152 && ctx2[21],
        dirty[0] & 65536 && {type: ctx2[16]},
        dirty[0] & 32768 && {readOnly: ctx2[15]},
        dirty[0] & 262144 && {class: ctx2[18]},
        dirty[0] & 8192 && {name: ctx2[13]},
        dirty[0] & 256 && {disabled: ctx2[8]},
        dirty[0] & 16384 && {placeholder: ctx2[14]},
        dirty[0] & 64 && input.value !== ctx2[6] && {value: ctx2[6]}
      ]));
      if ("value" in input_data) {
        input.value = input_data.value;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(input);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_20(ctx) {
  let input;
  let mounted;
  let dispose;
  let input_levels = [
    ctx[21],
    {class: ctx[18]},
    {type: "week"},
    {disabled: ctx[8]},
    {name: ctx[13]},
    {placeholder: ctx[14]},
    {readOnly: ctx[15]}
  ];
  let input_data = {};
  for (let i = 0; i < input_levels.length; i += 1) {
    input_data = assign(input_data, input_levels[i]);
  }
  return {
    c() {
      input = element("input");
      set_attributes(input, input_data);
    },
    m(target, anchor) {
      insert(target, input, anchor);
      if (input.autofocus)
        input.focus();
      set_input_value(input, ctx[6]);
      ctx[204](input);
      if (!mounted) {
        dispose = [
          listen(input, "blur", ctx[137]),
          listen(input, "change", ctx[138]),
          listen(input, "focus", ctx[139]),
          listen(input, "input", ctx[140]),
          listen(input, "keydown", ctx[141]),
          listen(input, "keypress", ctx[142]),
          listen(input, "keyup", ctx[143]),
          listen(input, "input", ctx[203])
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      set_attributes(input, input_data = get_spread_update(input_levels, [
        dirty[0] & 2097152 && ctx2[21],
        dirty[0] & 262144 && {class: ctx2[18]},
        {type: "week"},
        dirty[0] & 256 && {disabled: ctx2[8]},
        dirty[0] & 8192 && {name: ctx2[13]},
        dirty[0] & 16384 && {placeholder: ctx2[14]},
        dirty[0] & 32768 && {readOnly: ctx2[15]}
      ]));
      if (dirty[0] & 64) {
        set_input_value(input, ctx2[6]);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(input);
      ctx[204](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_19(ctx) {
  let input;
  let mounted;
  let dispose;
  let input_levels = [
    ctx[21],
    {class: ctx[18]},
    {type: "tel"},
    {disabled: ctx[8]},
    {name: ctx[13]},
    {placeholder: ctx[14]},
    {readOnly: ctx[15]},
    {size: ctx[1]}
  ];
  let input_data = {};
  for (let i = 0; i < input_levels.length; i += 1) {
    input_data = assign(input_data, input_levels[i]);
  }
  return {
    c() {
      input = element("input");
      set_attributes(input, input_data);
    },
    m(target, anchor) {
      insert(target, input, anchor);
      if (input.autofocus)
        input.focus();
      set_input_value(input, ctx[6]);
      ctx[202](input);
      if (!mounted) {
        dispose = [
          listen(input, "blur", ctx[130]),
          listen(input, "change", ctx[131]),
          listen(input, "focus", ctx[132]),
          listen(input, "input", ctx[133]),
          listen(input, "keydown", ctx[134]),
          listen(input, "keypress", ctx[135]),
          listen(input, "keyup", ctx[136]),
          listen(input, "input", ctx[201])
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      set_attributes(input, input_data = get_spread_update(input_levels, [
        dirty[0] & 2097152 && ctx2[21],
        dirty[0] & 262144 && {class: ctx2[18]},
        {type: "tel"},
        dirty[0] & 256 && {disabled: ctx2[8]},
        dirty[0] & 8192 && {name: ctx2[13]},
        dirty[0] & 16384 && {placeholder: ctx2[14]},
        dirty[0] & 32768 && {readOnly: ctx2[15]},
        dirty[0] & 2 && {size: ctx2[1]}
      ]));
      if (dirty[0] & 64) {
        set_input_value(input, ctx2[6]);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(input);
      ctx[202](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_18(ctx) {
  let input;
  let mounted;
  let dispose;
  let input_levels = [
    ctx[21],
    {class: ctx[18]},
    {type: "search"},
    {disabled: ctx[8]},
    {name: ctx[13]},
    {placeholder: ctx[14]},
    {readOnly: ctx[15]},
    {size: ctx[1]}
  ];
  let input_data = {};
  for (let i = 0; i < input_levels.length; i += 1) {
    input_data = assign(input_data, input_levels[i]);
  }
  return {
    c() {
      input = element("input");
      set_attributes(input, input_data);
    },
    m(target, anchor) {
      insert(target, input, anchor);
      if (input.autofocus)
        input.focus();
      set_input_value(input, ctx[6]);
      ctx[200](input);
      if (!mounted) {
        dispose = [
          listen(input, "blur", ctx[123]),
          listen(input, "change", ctx[124]),
          listen(input, "focus", ctx[125]),
          listen(input, "input", ctx[126]),
          listen(input, "keydown", ctx[127]),
          listen(input, "keypress", ctx[128]),
          listen(input, "keyup", ctx[129]),
          listen(input, "input", ctx[199])
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      set_attributes(input, input_data = get_spread_update(input_levels, [
        dirty[0] & 2097152 && ctx2[21],
        dirty[0] & 262144 && {class: ctx2[18]},
        {type: "search"},
        dirty[0] & 256 && {disabled: ctx2[8]},
        dirty[0] & 8192 && {name: ctx2[13]},
        dirty[0] & 16384 && {placeholder: ctx2[14]},
        dirty[0] & 32768 && {readOnly: ctx2[15]},
        dirty[0] & 2 && {size: ctx2[1]}
      ]));
      if (dirty[0] & 64) {
        set_input_value(input, ctx2[6]);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(input);
      ctx[200](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_17(ctx) {
  let input;
  let mounted;
  let dispose;
  let input_levels = [
    ctx[21],
    {type: "range"},
    {readOnly: ctx[15]},
    {class: ctx[18]},
    {name: ctx[13]},
    {disabled: ctx[8]},
    {placeholder: ctx[14]}
  ];
  let input_data = {};
  for (let i = 0; i < input_levels.length; i += 1) {
    input_data = assign(input_data, input_levels[i]);
  }
  return {
    c() {
      input = element("input");
      set_attributes(input, input_data);
    },
    m(target, anchor) {
      insert(target, input, anchor);
      if (input.autofocus)
        input.focus();
      set_input_value(input, ctx[6]);
      ctx[198](input);
      if (!mounted) {
        dispose = [
          listen(input, "blur", ctx[116]),
          listen(input, "change", ctx[117]),
          listen(input, "focus", ctx[118]),
          listen(input, "input", ctx[119]),
          listen(input, "keydown", ctx[120]),
          listen(input, "keypress", ctx[121]),
          listen(input, "keyup", ctx[122]),
          listen(input, "change", ctx[197]),
          listen(input, "input", ctx[197])
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      set_attributes(input, input_data = get_spread_update(input_levels, [
        dirty[0] & 2097152 && ctx2[21],
        {type: "range"},
        dirty[0] & 32768 && {readOnly: ctx2[15]},
        dirty[0] & 262144 && {class: ctx2[18]},
        dirty[0] & 8192 && {name: ctx2[13]},
        dirty[0] & 256 && {disabled: ctx2[8]},
        dirty[0] & 16384 && {placeholder: ctx2[14]}
      ]));
      if (dirty[0] & 64) {
        set_input_value(input, ctx2[6]);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(input);
      ctx[198](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_16(ctx) {
  let input;
  let mounted;
  let dispose;
  let input_levels = [
    ctx[21],
    {type: "color"},
    {readOnly: ctx[15]},
    {class: ctx[18]},
    {name: ctx[13]},
    {disabled: ctx[8]},
    {placeholder: ctx[14]}
  ];
  let input_data = {};
  for (let i = 0; i < input_levels.length; i += 1) {
    input_data = assign(input_data, input_levels[i]);
  }
  return {
    c() {
      input = element("input");
      set_attributes(input, input_data);
    },
    m(target, anchor) {
      insert(target, input, anchor);
      if (input.autofocus)
        input.focus();
      set_input_value(input, ctx[6]);
      ctx[196](input);
      if (!mounted) {
        dispose = [
          listen(input, "blur", ctx[109]),
          listen(input, "change", ctx[110]),
          listen(input, "focus", ctx[111]),
          listen(input, "input", ctx[112]),
          listen(input, "keydown", ctx[113]),
          listen(input, "keypress", ctx[114]),
          listen(input, "keyup", ctx[115]),
          listen(input, "input", ctx[195])
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      set_attributes(input, input_data = get_spread_update(input_levels, [
        dirty[0] & 2097152 && ctx2[21],
        {type: "color"},
        dirty[0] & 32768 && {readOnly: ctx2[15]},
        dirty[0] & 262144 && {class: ctx2[18]},
        dirty[0] & 8192 && {name: ctx2[13]},
        dirty[0] & 256 && {disabled: ctx2[8]},
        dirty[0] & 16384 && {placeholder: ctx2[14]}
      ]));
      if (dirty[0] & 64) {
        set_input_value(input, ctx2[6]);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(input);
      ctx[196](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_15(ctx) {
  let input;
  let mounted;
  let dispose;
  let input_levels = [
    ctx[21],
    {class: ctx[18]},
    {type: "month"},
    {disabled: ctx[8]},
    {name: ctx[13]},
    {placeholder: ctx[14]},
    {readOnly: ctx[15]}
  ];
  let input_data = {};
  for (let i = 0; i < input_levels.length; i += 1) {
    input_data = assign(input_data, input_levels[i]);
  }
  return {
    c() {
      input = element("input");
      set_attributes(input, input_data);
    },
    m(target, anchor) {
      insert(target, input, anchor);
      if (input.autofocus)
        input.focus();
      set_input_value(input, ctx[6]);
      ctx[194](input);
      if (!mounted) {
        dispose = [
          listen(input, "blur", ctx[102]),
          listen(input, "change", ctx[103]),
          listen(input, "focus", ctx[104]),
          listen(input, "input", ctx[105]),
          listen(input, "keydown", ctx[106]),
          listen(input, "keypress", ctx[107]),
          listen(input, "keyup", ctx[108]),
          listen(input, "input", ctx[193])
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      set_attributes(input, input_data = get_spread_update(input_levels, [
        dirty[0] & 2097152 && ctx2[21],
        dirty[0] & 262144 && {class: ctx2[18]},
        {type: "month"},
        dirty[0] & 256 && {disabled: ctx2[8]},
        dirty[0] & 8192 && {name: ctx2[13]},
        dirty[0] & 16384 && {placeholder: ctx2[14]},
        dirty[0] & 32768 && {readOnly: ctx2[15]}
      ]));
      if (dirty[0] & 64) {
        set_input_value(input, ctx2[6]);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(input);
      ctx[194](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_14(ctx) {
  let input;
  let mounted;
  let dispose;
  let input_levels = [
    ctx[21],
    {class: ctx[18]},
    {type: "datetime-local"},
    {disabled: ctx[8]},
    {name: ctx[13]},
    {placeholder: ctx[14]},
    {readOnly: ctx[15]}
  ];
  let input_data = {};
  for (let i = 0; i < input_levels.length; i += 1) {
    input_data = assign(input_data, input_levels[i]);
  }
  return {
    c() {
      input = element("input");
      set_attributes(input, input_data);
    },
    m(target, anchor) {
      insert(target, input, anchor);
      if (input.autofocus)
        input.focus();
      set_input_value(input, ctx[6]);
      ctx[192](input);
      if (!mounted) {
        dispose = [
          listen(input, "blur", ctx[95]),
          listen(input, "change", ctx[96]),
          listen(input, "focus", ctx[97]),
          listen(input, "input", ctx[98]),
          listen(input, "keydown", ctx[99]),
          listen(input, "keypress", ctx[100]),
          listen(input, "keyup", ctx[101]),
          listen(input, "input", ctx[191])
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      set_attributes(input, input_data = get_spread_update(input_levels, [
        dirty[0] & 2097152 && ctx2[21],
        dirty[0] & 262144 && {class: ctx2[18]},
        {type: "datetime-local"},
        dirty[0] & 256 && {disabled: ctx2[8]},
        dirty[0] & 8192 && {name: ctx2[13]},
        dirty[0] & 16384 && {placeholder: ctx2[14]},
        dirty[0] & 32768 && {readOnly: ctx2[15]}
      ]));
      if (dirty[0] & 64) {
        set_input_value(input, ctx2[6]);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(input);
      ctx[192](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_13(ctx) {
  let input;
  let mounted;
  let dispose;
  let input_levels = [
    ctx[21],
    {type: "datetime"},
    {readOnly: ctx[15]},
    {class: ctx[18]},
    {name: ctx[13]},
    {disabled: ctx[8]},
    {placeholder: ctx[14]}
  ];
  let input_data = {};
  for (let i = 0; i < input_levels.length; i += 1) {
    input_data = assign(input_data, input_levels[i]);
  }
  return {
    c() {
      input = element("input");
      set_attributes(input, input_data);
    },
    m(target, anchor) {
      insert(target, input, anchor);
      if (input.autofocus)
        input.focus();
      set_input_value(input, ctx[6]);
      ctx[190](input);
      if (!mounted) {
        dispose = [
          listen(input, "blur", ctx[88]),
          listen(input, "change", ctx[89]),
          listen(input, "focus", ctx[90]),
          listen(input, "input", ctx[91]),
          listen(input, "keydown", ctx[92]),
          listen(input, "keypress", ctx[93]),
          listen(input, "keyup", ctx[94]),
          listen(input, "input", ctx[189])
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      set_attributes(input, input_data = get_spread_update(input_levels, [
        dirty[0] & 2097152 && ctx2[21],
        {type: "datetime"},
        dirty[0] & 32768 && {readOnly: ctx2[15]},
        dirty[0] & 262144 && {class: ctx2[18]},
        dirty[0] & 8192 && {name: ctx2[13]},
        dirty[0] & 256 && {disabled: ctx2[8]},
        dirty[0] & 16384 && {placeholder: ctx2[14]}
      ]));
      if (dirty[0] & 64) {
        set_input_value(input, ctx2[6]);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(input);
      ctx[190](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_12(ctx) {
  let input;
  let mounted;
  let dispose;
  let input_levels = [
    ctx[21],
    {class: ctx[18]},
    {type: "time"},
    {disabled: ctx[8]},
    {name: ctx[13]},
    {placeholder: ctx[14]},
    {readOnly: ctx[15]}
  ];
  let input_data = {};
  for (let i = 0; i < input_levels.length; i += 1) {
    input_data = assign(input_data, input_levels[i]);
  }
  return {
    c() {
      input = element("input");
      set_attributes(input, input_data);
    },
    m(target, anchor) {
      insert(target, input, anchor);
      if (input.autofocus)
        input.focus();
      set_input_value(input, ctx[6]);
      ctx[188](input);
      if (!mounted) {
        dispose = [
          listen(input, "blur", ctx[81]),
          listen(input, "change", ctx[82]),
          listen(input, "focus", ctx[83]),
          listen(input, "input", ctx[84]),
          listen(input, "keydown", ctx[85]),
          listen(input, "keypress", ctx[86]),
          listen(input, "keyup", ctx[87]),
          listen(input, "input", ctx[187])
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      set_attributes(input, input_data = get_spread_update(input_levels, [
        dirty[0] & 2097152 && ctx2[21],
        dirty[0] & 262144 && {class: ctx2[18]},
        {type: "time"},
        dirty[0] & 256 && {disabled: ctx2[8]},
        dirty[0] & 8192 && {name: ctx2[13]},
        dirty[0] & 16384 && {placeholder: ctx2[14]},
        dirty[0] & 32768 && {readOnly: ctx2[15]}
      ]));
      if (dirty[0] & 64) {
        set_input_value(input, ctx2[6]);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(input);
      ctx[188](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_11(ctx) {
  let input;
  let mounted;
  let dispose;
  let input_levels = [
    ctx[21],
    {class: ctx[18]},
    {type: "date"},
    {disabled: ctx[8]},
    {name: ctx[13]},
    {placeholder: ctx[14]},
    {readOnly: ctx[15]}
  ];
  let input_data = {};
  for (let i = 0; i < input_levels.length; i += 1) {
    input_data = assign(input_data, input_levels[i]);
  }
  return {
    c() {
      input = element("input");
      set_attributes(input, input_data);
    },
    m(target, anchor) {
      insert(target, input, anchor);
      if (input.autofocus)
        input.focus();
      set_input_value(input, ctx[6]);
      ctx[186](input);
      if (!mounted) {
        dispose = [
          listen(input, "blur", ctx[74]),
          listen(input, "change", ctx[75]),
          listen(input, "focus", ctx[76]),
          listen(input, "input", ctx[77]),
          listen(input, "keydown", ctx[78]),
          listen(input, "keypress", ctx[79]),
          listen(input, "keyup", ctx[80]),
          listen(input, "input", ctx[185])
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      set_attributes(input, input_data = get_spread_update(input_levels, [
        dirty[0] & 2097152 && ctx2[21],
        dirty[0] & 262144 && {class: ctx2[18]},
        {type: "date"},
        dirty[0] & 256 && {disabled: ctx2[8]},
        dirty[0] & 8192 && {name: ctx2[13]},
        dirty[0] & 16384 && {placeholder: ctx2[14]},
        dirty[0] & 32768 && {readOnly: ctx2[15]}
      ]));
      if (dirty[0] & 64) {
        set_input_value(input, ctx2[6]);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(input);
      ctx[186](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_10(ctx) {
  let input;
  let mounted;
  let dispose;
  let input_levels = [
    ctx[21],
    {class: ctx[18]},
    {type: "number"},
    {readOnly: ctx[15]},
    {name: ctx[13]},
    {disabled: ctx[8]},
    {placeholder: ctx[14]}
  ];
  let input_data = {};
  for (let i = 0; i < input_levels.length; i += 1) {
    input_data = assign(input_data, input_levels[i]);
  }
  return {
    c() {
      input = element("input");
      set_attributes(input, input_data);
    },
    m(target, anchor) {
      insert(target, input, anchor);
      if (input.autofocus)
        input.focus();
      set_input_value(input, ctx[6]);
      ctx[184](input);
      if (!mounted) {
        dispose = [
          listen(input, "blur", ctx[67]),
          listen(input, "change", ctx[68]),
          listen(input, "focus", ctx[69]),
          listen(input, "input", ctx[70]),
          listen(input, "keydown", ctx[71]),
          listen(input, "keypress", ctx[72]),
          listen(input, "keyup", ctx[73]),
          listen(input, "input", ctx[183])
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      set_attributes(input, input_data = get_spread_update(input_levels, [
        dirty[0] & 2097152 && ctx2[21],
        dirty[0] & 262144 && {class: ctx2[18]},
        {type: "number"},
        dirty[0] & 32768 && {readOnly: ctx2[15]},
        dirty[0] & 8192 && {name: ctx2[13]},
        dirty[0] & 256 && {disabled: ctx2[8]},
        dirty[0] & 16384 && {placeholder: ctx2[14]}
      ]));
      if (dirty[0] & 64 && to_number(input.value) !== ctx2[6]) {
        set_input_value(input, ctx2[6]);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(input);
      ctx[184](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_9(ctx) {
  let input;
  let mounted;
  let dispose;
  let input_levels = [
    ctx[21],
    {class: ctx[18]},
    {type: "url"},
    {disabled: ctx[8]},
    {name: ctx[13]},
    {placeholder: ctx[14]},
    {readOnly: ctx[15]},
    {size: ctx[1]}
  ];
  let input_data = {};
  for (let i = 0; i < input_levels.length; i += 1) {
    input_data = assign(input_data, input_levels[i]);
  }
  return {
    c() {
      input = element("input");
      set_attributes(input, input_data);
    },
    m(target, anchor) {
      insert(target, input, anchor);
      if (input.autofocus)
        input.focus();
      set_input_value(input, ctx[6]);
      ctx[182](input);
      if (!mounted) {
        dispose = [
          listen(input, "blur", ctx[60]),
          listen(input, "change", ctx[61]),
          listen(input, "focus", ctx[62]),
          listen(input, "input", ctx[63]),
          listen(input, "keydown", ctx[64]),
          listen(input, "keypress", ctx[65]),
          listen(input, "keyup", ctx[66]),
          listen(input, "input", ctx[181])
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      set_attributes(input, input_data = get_spread_update(input_levels, [
        dirty[0] & 2097152 && ctx2[21],
        dirty[0] & 262144 && {class: ctx2[18]},
        {type: "url"},
        dirty[0] & 256 && {disabled: ctx2[8]},
        dirty[0] & 8192 && {name: ctx2[13]},
        dirty[0] & 16384 && {placeholder: ctx2[14]},
        dirty[0] & 32768 && {readOnly: ctx2[15]},
        dirty[0] & 2 && {size: ctx2[1]}
      ]));
      if (dirty[0] & 64) {
        set_input_value(input, ctx2[6]);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(input);
      ctx[182](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_8(ctx) {
  let formcheck;
  let updating_checked;
  let updating_inner;
  let updating_group;
  let updating_value;
  let current;
  const formcheck_spread_levels = [
    ctx[21],
    {class: ctx[7]},
    {size: ctx[0]},
    {type: ctx[16]},
    {disabled: ctx[8]},
    {invalid: ctx[10]},
    {label: ctx[11]},
    {name: ctx[13]},
    {placeholder: ctx[14]},
    {readonly: ctx[15]},
    {valid: ctx[17]}
  ];
  function formcheck_checked_binding(value) {
    ctx[170](value);
  }
  function formcheck_inner_binding(value) {
    ctx[171](value);
  }
  function formcheck_group_binding(value) {
    ctx[172](value);
  }
  function formcheck_value_binding(value) {
    ctx[173](value);
  }
  let formcheck_props = {};
  for (let i = 0; i < formcheck_spread_levels.length; i += 1) {
    formcheck_props = assign(formcheck_props, formcheck_spread_levels[i]);
  }
  if (ctx[2] !== void 0) {
    formcheck_props.checked = ctx[2];
  }
  if (ctx[5] !== void 0) {
    formcheck_props.inner = ctx[5];
  }
  if (ctx[4] !== void 0) {
    formcheck_props.group = ctx[4];
  }
  if (ctx[6] !== void 0) {
    formcheck_props.value = ctx[6];
  }
  formcheck = new FormCheck({props: formcheck_props});
  binding_callbacks.push(() => bind(formcheck, "checked", formcheck_checked_binding));
  binding_callbacks.push(() => bind(formcheck, "inner", formcheck_inner_binding));
  binding_callbacks.push(() => bind(formcheck, "group", formcheck_group_binding));
  binding_callbacks.push(() => bind(formcheck, "value", formcheck_value_binding));
  formcheck.$on("blur", ctx[174]);
  formcheck.$on("change", ctx[175]);
  formcheck.$on("focus", ctx[176]);
  formcheck.$on("input", ctx[177]);
  formcheck.$on("keydown", ctx[178]);
  formcheck.$on("keypress", ctx[179]);
  formcheck.$on("keyup", ctx[180]);
  return {
    c() {
      create_component(formcheck.$$.fragment);
    },
    m(target, anchor) {
      mount_component(formcheck, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const formcheck_changes = dirty[0] & 2354561 ? get_spread_update(formcheck_spread_levels, [
        dirty[0] & 2097152 && get_spread_object(ctx2[21]),
        dirty[0] & 128 && {class: ctx2[7]},
        dirty[0] & 1 && {size: ctx2[0]},
        dirty[0] & 65536 && {type: ctx2[16]},
        dirty[0] & 256 && {disabled: ctx2[8]},
        dirty[0] & 1024 && {invalid: ctx2[10]},
        dirty[0] & 2048 && {label: ctx2[11]},
        dirty[0] & 8192 && {name: ctx2[13]},
        dirty[0] & 16384 && {placeholder: ctx2[14]},
        dirty[0] & 32768 && {readonly: ctx2[15]},
        dirty[0] & 131072 && {valid: ctx2[17]}
      ]) : {};
      if (!updating_checked && dirty[0] & 4) {
        updating_checked = true;
        formcheck_changes.checked = ctx2[2];
        add_flush_callback(() => updating_checked = false);
      }
      if (!updating_inner && dirty[0] & 32) {
        updating_inner = true;
        formcheck_changes.inner = ctx2[5];
        add_flush_callback(() => updating_inner = false);
      }
      if (!updating_group && dirty[0] & 16) {
        updating_group = true;
        formcheck_changes.group = ctx2[4];
        add_flush_callback(() => updating_group = false);
      }
      if (!updating_value && dirty[0] & 64) {
        updating_value = true;
        formcheck_changes.value = ctx2[6];
        add_flush_callback(() => updating_value = false);
      }
      formcheck.$set(formcheck_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(formcheck.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(formcheck.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(formcheck, detaching);
    }
  };
}
function create_if_block_7(ctx) {
  let input;
  let mounted;
  let dispose;
  let input_levels = [
    ctx[21],
    {class: ctx[18]},
    {type: "file"},
    {disabled: ctx[8]},
    {invalid: ctx[10]},
    {multiple: ctx[12]},
    {name: ctx[13]},
    {placeholder: ctx[14]},
    {readOnly: ctx[15]},
    {valid: ctx[17]}
  ];
  let input_data = {};
  for (let i = 0; i < input_levels.length; i += 1) {
    input_data = assign(input_data, input_levels[i]);
  }
  return {
    c() {
      input = element("input");
      set_attributes(input, input_data);
    },
    m(target, anchor) {
      insert(target, input, anchor);
      if (input.autofocus)
        input.focus();
      ctx[169](input);
      if (!mounted) {
        dispose = [
          listen(input, "blur", ctx[53]),
          listen(input, "change", ctx[54]),
          listen(input, "focus", ctx[55]),
          listen(input, "input", ctx[56]),
          listen(input, "keydown", ctx[57]),
          listen(input, "keypress", ctx[58]),
          listen(input, "keyup", ctx[59]),
          listen(input, "change", ctx[168])
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      set_attributes(input, input_data = get_spread_update(input_levels, [
        dirty[0] & 2097152 && ctx2[21],
        dirty[0] & 262144 && {class: ctx2[18]},
        {type: "file"},
        dirty[0] & 256 && {disabled: ctx2[8]},
        dirty[0] & 1024 && {invalid: ctx2[10]},
        dirty[0] & 4096 && {multiple: ctx2[12]},
        dirty[0] & 8192 && {name: ctx2[13]},
        dirty[0] & 16384 && {placeholder: ctx2[14]},
        dirty[0] & 32768 && {readOnly: ctx2[15]},
        dirty[0] & 131072 && {valid: ctx2[17]}
      ]));
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(input);
      ctx[169](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_6(ctx) {
  let input;
  let mounted;
  let dispose;
  let input_levels = [
    ctx[21],
    {class: ctx[18]},
    {type: "email"},
    {disabled: ctx[8]},
    {multiple: ctx[12]},
    {name: ctx[13]},
    {placeholder: ctx[14]},
    {readOnly: ctx[15]},
    {size: ctx[1]}
  ];
  let input_data = {};
  for (let i = 0; i < input_levels.length; i += 1) {
    input_data = assign(input_data, input_levels[i]);
  }
  return {
    c() {
      input = element("input");
      set_attributes(input, input_data);
    },
    m(target, anchor) {
      insert(target, input, anchor);
      if (input.autofocus)
        input.focus();
      set_input_value(input, ctx[6]);
      ctx[167](input);
      if (!mounted) {
        dispose = [
          listen(input, "blur", ctx[46]),
          listen(input, "change", ctx[47]),
          listen(input, "focus", ctx[48]),
          listen(input, "input", ctx[49]),
          listen(input, "keydown", ctx[50]),
          listen(input, "keypress", ctx[51]),
          listen(input, "keyup", ctx[52]),
          listen(input, "input", ctx[166])
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      set_attributes(input, input_data = get_spread_update(input_levels, [
        dirty[0] & 2097152 && ctx2[21],
        dirty[0] & 262144 && {class: ctx2[18]},
        {type: "email"},
        dirty[0] & 256 && {disabled: ctx2[8]},
        dirty[0] & 4096 && {multiple: ctx2[12]},
        dirty[0] & 8192 && {name: ctx2[13]},
        dirty[0] & 16384 && {placeholder: ctx2[14]},
        dirty[0] & 32768 && {readOnly: ctx2[15]},
        dirty[0] & 2 && {size: ctx2[1]}
      ]));
      if (dirty[0] & 64 && input.value !== ctx2[6]) {
        set_input_value(input, ctx2[6]);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(input);
      ctx[167](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_5(ctx) {
  let input;
  let mounted;
  let dispose;
  let input_levels = [
    ctx[21],
    {class: ctx[18]},
    {type: "color"},
    {disabled: ctx[8]},
    {name: ctx[13]},
    {placeholder: ctx[14]},
    {readOnly: ctx[15]}
  ];
  let input_data = {};
  for (let i = 0; i < input_levels.length; i += 1) {
    input_data = assign(input_data, input_levels[i]);
  }
  return {
    c() {
      input = element("input");
      set_attributes(input, input_data);
    },
    m(target, anchor) {
      insert(target, input, anchor);
      if (input.autofocus)
        input.focus();
      set_input_value(input, ctx[6]);
      ctx[165](input);
      if (!mounted) {
        dispose = [
          listen(input, "blur", ctx[39]),
          listen(input, "change", ctx[40]),
          listen(input, "focus", ctx[41]),
          listen(input, "input", ctx[42]),
          listen(input, "keydown", ctx[43]),
          listen(input, "keypress", ctx[44]),
          listen(input, "keyup", ctx[45]),
          listen(input, "input", ctx[164])
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      set_attributes(input, input_data = get_spread_update(input_levels, [
        dirty[0] & 2097152 && ctx2[21],
        dirty[0] & 262144 && {class: ctx2[18]},
        {type: "color"},
        dirty[0] & 256 && {disabled: ctx2[8]},
        dirty[0] & 8192 && {name: ctx2[13]},
        dirty[0] & 16384 && {placeholder: ctx2[14]},
        dirty[0] & 32768 && {readOnly: ctx2[15]}
      ]));
      if (dirty[0] & 64) {
        set_input_value(input, ctx2[6]);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(input);
      ctx[165](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_4(ctx) {
  let input;
  let mounted;
  let dispose;
  let input_levels = [
    ctx[21],
    {class: ctx[18]},
    {type: "password"},
    {disabled: ctx[8]},
    {name: ctx[13]},
    {placeholder: ctx[14]},
    {readOnly: ctx[15]},
    {size: ctx[1]}
  ];
  let input_data = {};
  for (let i = 0; i < input_levels.length; i += 1) {
    input_data = assign(input_data, input_levels[i]);
  }
  return {
    c() {
      input = element("input");
      set_attributes(input, input_data);
    },
    m(target, anchor) {
      insert(target, input, anchor);
      if (input.autofocus)
        input.focus();
      set_input_value(input, ctx[6]);
      ctx[163](input);
      if (!mounted) {
        dispose = [
          listen(input, "blur", ctx[32]),
          listen(input, "change", ctx[33]),
          listen(input, "focus", ctx[34]),
          listen(input, "input", ctx[35]),
          listen(input, "keydown", ctx[36]),
          listen(input, "keypress", ctx[37]),
          listen(input, "keyup", ctx[38]),
          listen(input, "input", ctx[162])
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      set_attributes(input, input_data = get_spread_update(input_levels, [
        dirty[0] & 2097152 && ctx2[21],
        dirty[0] & 262144 && {class: ctx2[18]},
        {type: "password"},
        dirty[0] & 256 && {disabled: ctx2[8]},
        dirty[0] & 8192 && {name: ctx2[13]},
        dirty[0] & 16384 && {placeholder: ctx2[14]},
        dirty[0] & 32768 && {readOnly: ctx2[15]},
        dirty[0] & 2 && {size: ctx2[1]}
      ]));
      if (dirty[0] & 64 && input.value !== ctx2[6]) {
        set_input_value(input, ctx2[6]);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(input);
      ctx[163](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_3(ctx) {
  let input;
  let mounted;
  let dispose;
  let input_levels = [
    ctx[21],
    {class: ctx[18]},
    {type: "text"},
    {disabled: ctx[8]},
    {name: ctx[13]},
    {placeholder: ctx[14]},
    {readOnly: ctx[15]},
    {size: ctx[1]}
  ];
  let input_data = {};
  for (let i = 0; i < input_levels.length; i += 1) {
    input_data = assign(input_data, input_levels[i]);
  }
  return {
    c() {
      input = element("input");
      set_attributes(input, input_data);
    },
    m(target, anchor) {
      insert(target, input, anchor);
      if (input.autofocus)
        input.focus();
      set_input_value(input, ctx[6]);
      ctx[161](input);
      if (!mounted) {
        dispose = [
          listen(input, "blur", ctx[25]),
          listen(input, "change", ctx[26]),
          listen(input, "focus", ctx[27]),
          listen(input, "input", ctx[28]),
          listen(input, "keydown", ctx[29]),
          listen(input, "keypress", ctx[30]),
          listen(input, "keyup", ctx[31]),
          listen(input, "input", ctx[160])
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      set_attributes(input, input_data = get_spread_update(input_levels, [
        dirty[0] & 2097152 && ctx2[21],
        dirty[0] & 262144 && {class: ctx2[18]},
        {type: "text"},
        dirty[0] & 256 && {disabled: ctx2[8]},
        dirty[0] & 8192 && {name: ctx2[13]},
        dirty[0] & 16384 && {placeholder: ctx2[14]},
        dirty[0] & 32768 && {readOnly: ctx2[15]},
        dirty[0] & 2 && {size: ctx2[1]}
      ]));
      if (dirty[0] & 64 && input.value !== ctx2[6]) {
        set_input_value(input, ctx2[6]);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(input);
      ctx[161](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block$3(ctx) {
  let show_if;
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block_1$3, create_else_block$3];
  const if_blocks = [];
  function select_block_type_2(ctx2, dirty) {
    if (dirty[0] & 512)
      show_if = null;
    if (show_if == null)
      show_if = !!Array.isArray(ctx2[9]);
    if (show_if)
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type_2(ctx, [-1, -1, -1, -1, -1, -1, -1]);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_2(ctx2, dirty);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_else_block$3(ctx) {
  let formfeedback;
  let current;
  formfeedback = new FormFeedback({
    props: {
      valid: ctx[17],
      $$slots: {default: [create_default_slot_1]},
      $$scope: {ctx}
    }
  });
  return {
    c() {
      create_component(formfeedback.$$.fragment);
    },
    m(target, anchor) {
      mount_component(formfeedback, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const formfeedback_changes = {};
      if (dirty[0] & 131072)
        formfeedback_changes.valid = ctx2[17];
      if (dirty[0] & 512 | dirty[6] & 8388608) {
        formfeedback_changes.$$scope = {dirty, ctx: ctx2};
      }
      formfeedback.$set(formfeedback_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(formfeedback.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(formfeedback.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(formfeedback, detaching);
    }
  };
}
function create_if_block_1$3(ctx) {
  let each_1_anchor;
  let current;
  let each_value = ctx[9];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(target, anchor);
      }
      insert(target, each_1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty[0] & 131584) {
        each_value = ctx2[9];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching)
        detach(each_1_anchor);
    }
  };
}
function create_default_slot_1(ctx) {
  let t;
  return {
    c() {
      t = text(ctx[9]);
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty[0] & 512)
        set_data(t, ctx2[9]);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot(ctx) {
  let t_value = ctx[210] + "";
  let t;
  return {
    c() {
      t = text(t_value);
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty[0] & 512 && t_value !== (t_value = ctx2[210] + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_each_block(ctx) {
  let formfeedback;
  let current;
  formfeedback = new FormFeedback({
    props: {
      valid: ctx[17],
      $$slots: {default: [create_default_slot]},
      $$scope: {ctx}
    }
  });
  return {
    c() {
      create_component(formfeedback.$$.fragment);
    },
    m(target, anchor) {
      mount_component(formfeedback, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const formfeedback_changes = {};
      if (dirty[0] & 131072)
        formfeedback_changes.valid = ctx2[17];
      if (dirty[0] & 512 | dirty[6] & 8388608) {
        formfeedback_changes.$$scope = {dirty, ctx: ctx2};
      }
      formfeedback.$set(formfeedback_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(formfeedback.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(formfeedback.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(formfeedback, detaching);
    }
  };
}
function create_fragment$6(ctx) {
  let current_block_type_index;
  let if_block0;
  let t;
  let if_block1_anchor;
  let current;
  const if_block_creators = [create_if_block_2$3, create_if_block_21, create_if_block_22];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (ctx2[19] === "input")
      return 0;
    if (ctx2[19] === "textarea")
      return 1;
    if (ctx2[19] === "select" && !ctx2[12])
      return 2;
    return -1;
  }
  if (~(current_block_type_index = select_block_type(ctx))) {
    if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  let if_block1 = ctx[9] && create_if_block$3(ctx);
  return {
    c() {
      if (if_block0)
        if_block0.c();
      t = space();
      if (if_block1)
        if_block1.c();
      if_block1_anchor = empty();
    },
    m(target, anchor) {
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(target, anchor);
      }
      insert(target, t, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert(target, if_block1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        }
      } else {
        if (if_block0) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
        }
        if (~current_block_type_index) {
          if_block0 = if_blocks[current_block_type_index];
          if (!if_block0) {
            if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block0.c();
          } else {
            if_block0.p(ctx2, dirty);
          }
          transition_in(if_block0, 1);
          if_block0.m(t.parentNode, t);
        } else {
          if_block0 = null;
        }
      }
      if (ctx2[9]) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty[0] & 512) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block$3(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d(detaching);
      }
      if (detaching)
        detach(t);
      if (if_block1)
        if_block1.d(detaching);
      if (detaching)
        detach(if_block1_anchor);
    }
  };
}
function instance$6($$self, $$props, $$invalidate) {
  const omit_props_names = [
    "class",
    "bsSize",
    "checked",
    "color",
    "disabled",
    "feedback",
    "files",
    "group",
    "inner",
    "invalid",
    "label",
    "multiple",
    "name",
    "placeholder",
    "plaintext",
    "readonly",
    "size",
    "type",
    "valid",
    "value"
  ];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let {$$slots: slots = {}, $$scope} = $$props;
  let {class: className2 = ""} = $$props;
  let {bsSize = void 0} = $$props;
  let {checked = false} = $$props;
  let {color = void 0} = $$props;
  let {disabled = void 0} = $$props;
  let {feedback = void 0} = $$props;
  let {files = void 0} = $$props;
  let {group = void 0} = $$props;
  let {inner = void 0} = $$props;
  let {invalid = false} = $$props;
  let {label = void 0} = $$props;
  let {multiple = void 0} = $$props;
  let {name = ""} = $$props;
  let {placeholder = ""} = $$props;
  let {plaintext = false} = $$props;
  let {readonly = void 0} = $$props;
  let {size = void 0} = $$props;
  let {type = "text"} = $$props;
  let {valid = false} = $$props;
  let {value = ""} = $$props;
  let classes;
  let tag;
  const handleInput = (event) => {
    $$invalidate(6, value = event.target.value);
  };
  function blur_handler(event) {
    bubble.call(this, $$self, event);
  }
  function change_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler(event) {
    bubble.call(this, $$self, event);
  }
  function input_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keypress_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler_1(event) {
    bubble.call(this, $$self, event);
  }
  function change_handler_1(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler_1(event) {
    bubble.call(this, $$self, event);
  }
  function input_handler_1(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler_1(event) {
    bubble.call(this, $$self, event);
  }
  function keypress_handler_1(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler_1(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler_2(event) {
    bubble.call(this, $$self, event);
  }
  function change_handler_2(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler_2(event) {
    bubble.call(this, $$self, event);
  }
  function input_handler_2(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler_2(event) {
    bubble.call(this, $$self, event);
  }
  function keypress_handler_2(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler_2(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler_3(event) {
    bubble.call(this, $$self, event);
  }
  function change_handler_3(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler_3(event) {
    bubble.call(this, $$self, event);
  }
  function input_handler_3(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler_3(event) {
    bubble.call(this, $$self, event);
  }
  function keypress_handler_3(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler_3(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler_4(event) {
    bubble.call(this, $$self, event);
  }
  function change_handler_4(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler_4(event) {
    bubble.call(this, $$self, event);
  }
  function input_handler_4(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler_4(event) {
    bubble.call(this, $$self, event);
  }
  function keypress_handler_4(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler_4(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler_6(event) {
    bubble.call(this, $$self, event);
  }
  function change_handler_6(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler_6(event) {
    bubble.call(this, $$self, event);
  }
  function input_handler_6(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler_6(event) {
    bubble.call(this, $$self, event);
  }
  function keypress_handler_6(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler_6(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler_7(event) {
    bubble.call(this, $$self, event);
  }
  function change_handler_7(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler_7(event) {
    bubble.call(this, $$self, event);
  }
  function input_handler_7(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler_7(event) {
    bubble.call(this, $$self, event);
  }
  function keypress_handler_7(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler_7(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler_8(event) {
    bubble.call(this, $$self, event);
  }
  function change_handler_8(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler_8(event) {
    bubble.call(this, $$self, event);
  }
  function input_handler_8(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler_8(event) {
    bubble.call(this, $$self, event);
  }
  function keypress_handler_8(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler_8(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler_9(event) {
    bubble.call(this, $$self, event);
  }
  function change_handler_9(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler_9(event) {
    bubble.call(this, $$self, event);
  }
  function input_handler_9(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler_9(event) {
    bubble.call(this, $$self, event);
  }
  function keypress_handler_9(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler_9(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler_10(event) {
    bubble.call(this, $$self, event);
  }
  function change_handler_10(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler_10(event) {
    bubble.call(this, $$self, event);
  }
  function input_handler_10(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler_10(event) {
    bubble.call(this, $$self, event);
  }
  function keypress_handler_10(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler_10(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler_11(event) {
    bubble.call(this, $$self, event);
  }
  function change_handler_11(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler_11(event) {
    bubble.call(this, $$self, event);
  }
  function input_handler_11(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler_11(event) {
    bubble.call(this, $$self, event);
  }
  function keypress_handler_11(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler_11(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler_12(event) {
    bubble.call(this, $$self, event);
  }
  function change_handler_12(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler_12(event) {
    bubble.call(this, $$self, event);
  }
  function input_handler_12(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler_12(event) {
    bubble.call(this, $$self, event);
  }
  function keypress_handler_12(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler_12(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler_13(event) {
    bubble.call(this, $$self, event);
  }
  function change_handler_13(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler_13(event) {
    bubble.call(this, $$self, event);
  }
  function input_handler_13(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler_13(event) {
    bubble.call(this, $$self, event);
  }
  function keypress_handler_13(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler_13(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler_14(event) {
    bubble.call(this, $$self, event);
  }
  function change_handler_14(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler_14(event) {
    bubble.call(this, $$self, event);
  }
  function input_handler_14(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler_14(event) {
    bubble.call(this, $$self, event);
  }
  function keypress_handler_14(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler_14(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler_15(event) {
    bubble.call(this, $$self, event);
  }
  function change_handler_15(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler_15(event) {
    bubble.call(this, $$self, event);
  }
  function input_handler_15(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler_15(event) {
    bubble.call(this, $$self, event);
  }
  function keypress_handler_15(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler_15(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler_16(event) {
    bubble.call(this, $$self, event);
  }
  function change_handler_16(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler_16(event) {
    bubble.call(this, $$self, event);
  }
  function input_handler_16(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler_16(event) {
    bubble.call(this, $$self, event);
  }
  function keypress_handler_16(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler_16(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler_17(event) {
    bubble.call(this, $$self, event);
  }
  function change_handler_17(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler_17(event) {
    bubble.call(this, $$self, event);
  }
  function input_handler_17(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler_17(event) {
    bubble.call(this, $$self, event);
  }
  function keypress_handler_17(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler_17(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler_18(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler_18(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler_18(event) {
    bubble.call(this, $$self, event);
  }
  function keypress_handler_18(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler_18(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler_19(event) {
    bubble.call(this, $$self, event);
  }
  function change_handler_18(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler_19(event) {
    bubble.call(this, $$self, event);
  }
  function input_handler_18(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler_19(event) {
    bubble.call(this, $$self, event);
  }
  function keypress_handler_19(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler_19(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler_20(event) {
    bubble.call(this, $$self, event);
  }
  function change_handler_19(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler_20(event) {
    bubble.call(this, $$self, event);
  }
  function input_handler_19(event) {
    bubble.call(this, $$self, event);
  }
  function input_input_handler() {
    value = this.value;
    $$invalidate(6, value);
  }
  function input_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      inner = $$value;
      $$invalidate(5, inner);
    });
  }
  function input_input_handler_1() {
    value = this.value;
    $$invalidate(6, value);
  }
  function input_binding_1($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      inner = $$value;
      $$invalidate(5, inner);
    });
  }
  function input_input_handler_2() {
    value = this.value;
    $$invalidate(6, value);
  }
  function input_binding_2($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      inner = $$value;
      $$invalidate(5, inner);
    });
  }
  function input_input_handler_3() {
    value = this.value;
    $$invalidate(6, value);
  }
  function input_binding_3($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      inner = $$value;
      $$invalidate(5, inner);
    });
  }
  function input_change_handler() {
    files = this.files;
    value = this.value;
    $$invalidate(3, files);
    $$invalidate(6, value);
  }
  function input_binding_4($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      inner = $$value;
      $$invalidate(5, inner);
    });
  }
  function formcheck_checked_binding(value2) {
    checked = value2;
    $$invalidate(2, checked);
  }
  function formcheck_inner_binding(value2) {
    inner = value2;
    $$invalidate(5, inner);
  }
  function formcheck_group_binding(value2) {
    group = value2;
    $$invalidate(4, group);
  }
  function formcheck_value_binding(value$1) {
    value = value$1;
    $$invalidate(6, value);
  }
  function blur_handler_5(event) {
    bubble.call(this, $$self, event);
  }
  function change_handler_5(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler_5(event) {
    bubble.call(this, $$self, event);
  }
  function input_handler_5(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler_5(event) {
    bubble.call(this, $$self, event);
  }
  function keypress_handler_5(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler_5(event) {
    bubble.call(this, $$self, event);
  }
  function input_input_handler_4() {
    value = this.value;
    $$invalidate(6, value);
  }
  function input_binding_5($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      inner = $$value;
      $$invalidate(5, inner);
    });
  }
  function input_input_handler_5() {
    value = to_number(this.value);
    $$invalidate(6, value);
  }
  function input_binding_6($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      inner = $$value;
      $$invalidate(5, inner);
    });
  }
  function input_input_handler_6() {
    value = this.value;
    $$invalidate(6, value);
  }
  function input_binding_7($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      inner = $$value;
      $$invalidate(5, inner);
    });
  }
  function input_input_handler_7() {
    value = this.value;
    $$invalidate(6, value);
  }
  function input_binding_8($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      inner = $$value;
      $$invalidate(5, inner);
    });
  }
  function input_input_handler_8() {
    value = this.value;
    $$invalidate(6, value);
  }
  function input_binding_9($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      inner = $$value;
      $$invalidate(5, inner);
    });
  }
  function input_input_handler_9() {
    value = this.value;
    $$invalidate(6, value);
  }
  function input_binding_10($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      inner = $$value;
      $$invalidate(5, inner);
    });
  }
  function input_input_handler_10() {
    value = this.value;
    $$invalidate(6, value);
  }
  function input_binding_11($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      inner = $$value;
      $$invalidate(5, inner);
    });
  }
  function input_input_handler_11() {
    value = this.value;
    $$invalidate(6, value);
  }
  function input_binding_12($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      inner = $$value;
      $$invalidate(5, inner);
    });
  }
  function input_change_input_handler() {
    value = to_number(this.value);
    $$invalidate(6, value);
  }
  function input_binding_13($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      inner = $$value;
      $$invalidate(5, inner);
    });
  }
  function input_input_handler_12() {
    value = this.value;
    $$invalidate(6, value);
  }
  function input_binding_14($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      inner = $$value;
      $$invalidate(5, inner);
    });
  }
  function input_input_handler_13() {
    value = this.value;
    $$invalidate(6, value);
  }
  function input_binding_15($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      inner = $$value;
      $$invalidate(5, inner);
    });
  }
  function input_input_handler_14() {
    value = this.value;
    $$invalidate(6, value);
  }
  function input_binding_16($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      inner = $$value;
      $$invalidate(5, inner);
    });
  }
  function textarea_input_handler() {
    value = this.value;
    $$invalidate(6, value);
  }
  function textarea_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      inner = $$value;
      $$invalidate(5, inner);
    });
  }
  function select_change_handler() {
    value = select_value(this);
    $$invalidate(6, value);
  }
  function select_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      inner = $$value;
      $$invalidate(5, inner);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(21, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(7, className2 = $$new_props.class);
    if ("bsSize" in $$new_props)
      $$invalidate(0, bsSize = $$new_props.bsSize);
    if ("checked" in $$new_props)
      $$invalidate(2, checked = $$new_props.checked);
    if ("color" in $$new_props)
      $$invalidate(22, color = $$new_props.color);
    if ("disabled" in $$new_props)
      $$invalidate(8, disabled = $$new_props.disabled);
    if ("feedback" in $$new_props)
      $$invalidate(9, feedback = $$new_props.feedback);
    if ("files" in $$new_props)
      $$invalidate(3, files = $$new_props.files);
    if ("group" in $$new_props)
      $$invalidate(4, group = $$new_props.group);
    if ("inner" in $$new_props)
      $$invalidate(5, inner = $$new_props.inner);
    if ("invalid" in $$new_props)
      $$invalidate(10, invalid = $$new_props.invalid);
    if ("label" in $$new_props)
      $$invalidate(11, label = $$new_props.label);
    if ("multiple" in $$new_props)
      $$invalidate(12, multiple = $$new_props.multiple);
    if ("name" in $$new_props)
      $$invalidate(13, name = $$new_props.name);
    if ("placeholder" in $$new_props)
      $$invalidate(14, placeholder = $$new_props.placeholder);
    if ("plaintext" in $$new_props)
      $$invalidate(23, plaintext = $$new_props.plaintext);
    if ("readonly" in $$new_props)
      $$invalidate(15, readonly = $$new_props.readonly);
    if ("size" in $$new_props)
      $$invalidate(1, size = $$new_props.size);
    if ("type" in $$new_props)
      $$invalidate(16, type = $$new_props.type);
    if ("valid" in $$new_props)
      $$invalidate(17, valid = $$new_props.valid);
    if ("value" in $$new_props)
      $$invalidate(6, value = $$new_props.value);
    if ("$$scope" in $$new_props)
      $$invalidate(209, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & 12780675) {
      {
        const isNotaNumber = new RegExp("\\D", "g");
        let isBtn = false;
        let formControlClass = "form-control";
        $$invalidate(19, tag = "input");
        switch (type) {
          case "color":
            formControlClass = `form-control form-control-color`;
            break;
          case "range":
            formControlClass = "form-range";
            break;
          case "select":
            formControlClass = `form-select`;
            $$invalidate(19, tag = "select");
            break;
          case "textarea":
            $$invalidate(19, tag = "textarea");
            break;
          case "button":
          case "reset":
          case "submit":
            formControlClass = `btn btn-${color || "secondary"}`;
            isBtn = true;
            break;
          case "hidden":
          case "image":
            formControlClass = void 0;
            break;
          default:
            formControlClass = "form-control";
            $$invalidate(19, tag = "input");
        }
        if (plaintext) {
          formControlClass = `${formControlClass}-plaintext`;
          $$invalidate(19, tag = "input");
        }
        if (size && isNotaNumber.test(size)) {
          console.warn(`Please use the prop "bsSize" instead of the "size" to bootstrap's input sizing.`);
          $$invalidate(0, bsSize = size);
          $$invalidate(1, size = void 0);
        }
        $$invalidate(18, classes = classnames(className2, formControlClass, {
          "is-invalid": invalid,
          "is-valid": valid,
          [`form-control-${bsSize}`]: bsSize && !isBtn,
          [`btn-${bsSize}`]: bsSize && isBtn
        }));
      }
    }
  };
  return [
    bsSize,
    size,
    checked,
    files,
    group,
    inner,
    value,
    className2,
    disabled,
    feedback,
    invalid,
    label,
    multiple,
    name,
    placeholder,
    readonly,
    type,
    valid,
    classes,
    tag,
    handleInput,
    $$restProps,
    color,
    plaintext,
    slots,
    blur_handler,
    change_handler,
    focus_handler,
    input_handler,
    keydown_handler,
    keypress_handler,
    keyup_handler,
    blur_handler_1,
    change_handler_1,
    focus_handler_1,
    input_handler_1,
    keydown_handler_1,
    keypress_handler_1,
    keyup_handler_1,
    blur_handler_2,
    change_handler_2,
    focus_handler_2,
    input_handler_2,
    keydown_handler_2,
    keypress_handler_2,
    keyup_handler_2,
    blur_handler_3,
    change_handler_3,
    focus_handler_3,
    input_handler_3,
    keydown_handler_3,
    keypress_handler_3,
    keyup_handler_3,
    blur_handler_4,
    change_handler_4,
    focus_handler_4,
    input_handler_4,
    keydown_handler_4,
    keypress_handler_4,
    keyup_handler_4,
    blur_handler_6,
    change_handler_6,
    focus_handler_6,
    input_handler_6,
    keydown_handler_6,
    keypress_handler_6,
    keyup_handler_6,
    blur_handler_7,
    change_handler_7,
    focus_handler_7,
    input_handler_7,
    keydown_handler_7,
    keypress_handler_7,
    keyup_handler_7,
    blur_handler_8,
    change_handler_8,
    focus_handler_8,
    input_handler_8,
    keydown_handler_8,
    keypress_handler_8,
    keyup_handler_8,
    blur_handler_9,
    change_handler_9,
    focus_handler_9,
    input_handler_9,
    keydown_handler_9,
    keypress_handler_9,
    keyup_handler_9,
    blur_handler_10,
    change_handler_10,
    focus_handler_10,
    input_handler_10,
    keydown_handler_10,
    keypress_handler_10,
    keyup_handler_10,
    blur_handler_11,
    change_handler_11,
    focus_handler_11,
    input_handler_11,
    keydown_handler_11,
    keypress_handler_11,
    keyup_handler_11,
    blur_handler_12,
    change_handler_12,
    focus_handler_12,
    input_handler_12,
    keydown_handler_12,
    keypress_handler_12,
    keyup_handler_12,
    blur_handler_13,
    change_handler_13,
    focus_handler_13,
    input_handler_13,
    keydown_handler_13,
    keypress_handler_13,
    keyup_handler_13,
    blur_handler_14,
    change_handler_14,
    focus_handler_14,
    input_handler_14,
    keydown_handler_14,
    keypress_handler_14,
    keyup_handler_14,
    blur_handler_15,
    change_handler_15,
    focus_handler_15,
    input_handler_15,
    keydown_handler_15,
    keypress_handler_15,
    keyup_handler_15,
    blur_handler_16,
    change_handler_16,
    focus_handler_16,
    input_handler_16,
    keydown_handler_16,
    keypress_handler_16,
    keyup_handler_16,
    blur_handler_17,
    change_handler_17,
    focus_handler_17,
    input_handler_17,
    keydown_handler_17,
    keypress_handler_17,
    keyup_handler_17,
    blur_handler_18,
    focus_handler_18,
    keydown_handler_18,
    keypress_handler_18,
    keyup_handler_18,
    blur_handler_19,
    change_handler_18,
    focus_handler_19,
    input_handler_18,
    keydown_handler_19,
    keypress_handler_19,
    keyup_handler_19,
    blur_handler_20,
    change_handler_19,
    focus_handler_20,
    input_handler_19,
    input_input_handler,
    input_binding,
    input_input_handler_1,
    input_binding_1,
    input_input_handler_2,
    input_binding_2,
    input_input_handler_3,
    input_binding_3,
    input_change_handler,
    input_binding_4,
    formcheck_checked_binding,
    formcheck_inner_binding,
    formcheck_group_binding,
    formcheck_value_binding,
    blur_handler_5,
    change_handler_5,
    focus_handler_5,
    input_handler_5,
    keydown_handler_5,
    keypress_handler_5,
    keyup_handler_5,
    input_input_handler_4,
    input_binding_5,
    input_input_handler_5,
    input_binding_6,
    input_input_handler_6,
    input_binding_7,
    input_input_handler_7,
    input_binding_8,
    input_input_handler_8,
    input_binding_9,
    input_input_handler_9,
    input_binding_10,
    input_input_handler_10,
    input_binding_11,
    input_input_handler_11,
    input_binding_12,
    input_change_input_handler,
    input_binding_13,
    input_input_handler_12,
    input_binding_14,
    input_input_handler_13,
    input_binding_15,
    input_input_handler_14,
    input_binding_16,
    textarea_input_handler,
    textarea_binding,
    select_change_handler,
    select_binding,
    $$scope
  ];
}
var Input = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$6, create_fragment$6, safe_not_equal, {
      class: 7,
      bsSize: 0,
      checked: 2,
      color: 22,
      disabled: 8,
      feedback: 9,
      files: 3,
      group: 4,
      inner: 5,
      invalid: 10,
      label: 11,
      multiple: 12,
      name: 13,
      placeholder: 14,
      plaintext: 23,
      readonly: 15,
      size: 1,
      type: 16,
      valid: 17,
      value: 6
    }, null, [-1, -1, -1, -1, -1, -1, -1]);
  }
};
function create_fragment$7(ctx) {
  let label;
  let current;
  const default_slot_template = ctx[15].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[14], null);
  let label_levels = [
    ctx[2],
    {class: ctx[1]},
    {for: ctx[0]}
  ];
  let label_data = {};
  for (let i = 0; i < label_levels.length; i += 1) {
    label_data = assign(label_data, label_levels[i]);
  }
  return {
    c() {
      label = element("label");
      if (default_slot)
        default_slot.c();
      set_attributes(label, label_data);
    },
    m(target, anchor) {
      insert(target, label, anchor);
      if (default_slot) {
        default_slot.m(label, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 16384)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[14], !current ? get_all_dirty_from_scope(ctx2[14]) : get_slot_changes(default_slot_template, ctx2[14], dirty, null), null);
        }
      }
      set_attributes(label, label_data = get_spread_update(label_levels, [
        dirty & 4 && ctx2[2],
        (!current || dirty & 2) && {class: ctx2[1]},
        (!current || dirty & 1) && {for: ctx2[0]}
      ]));
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(label);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function instance$7($$self, $$props, $$invalidate) {
  let classes;
  const omit_props_names = ["class", "hidden", "check", "size", "for", "xs", "sm", "md", "lg", "xl", "xxl", "widths"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let {$$slots: slots = {}, $$scope} = $$props;
  let {class: className2 = ""} = $$props;
  let {hidden = false} = $$props;
  let {check = false} = $$props;
  let {size = ""} = $$props;
  let {for: fore = null} = $$props;
  let {xs = ""} = $$props;
  let {sm = ""} = $$props;
  let {md = ""} = $$props;
  let {lg = ""} = $$props;
  let {xl = ""} = $$props;
  let {xxl = ""} = $$props;
  const colWidths = {xs, sm, md, lg, xl, xxl};
  let {widths = Object.keys(colWidths)} = $$props;
  const colClasses = [];
  widths.forEach((colWidth) => {
    let columnProp = $$props[colWidth];
    if (!columnProp && columnProp !== "") {
      return;
    }
    const isXs = colWidth === "xs";
    let colClass;
    if (isObject(columnProp)) {
      const colSizeInterfix = isXs ? "-" : `-${colWidth}-`;
      colClass = getColumnSizeClass(isXs, colWidth, columnProp.size);
      colClasses.push(classnames({
        [colClass]: columnProp.size || columnProp.size === "",
        [`order${colSizeInterfix}${columnProp.order}`]: columnProp.order || columnProp.order === 0,
        [`offset${colSizeInterfix}${columnProp.offset}`]: columnProp.offset || columnProp.offset === 0
      }));
    } else {
      colClass = getColumnSizeClass(isXs, colWidth, columnProp);
      colClasses.push(colClass);
    }
  });
  $$self.$$set = ($$new_props) => {
    $$invalidate(18, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    $$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(3, className2 = $$new_props.class);
    if ("hidden" in $$new_props)
      $$invalidate(4, hidden = $$new_props.hidden);
    if ("check" in $$new_props)
      $$invalidate(5, check = $$new_props.check);
    if ("size" in $$new_props)
      $$invalidate(6, size = $$new_props.size);
    if ("for" in $$new_props)
      $$invalidate(0, fore = $$new_props.for);
    if ("xs" in $$new_props)
      $$invalidate(7, xs = $$new_props.xs);
    if ("sm" in $$new_props)
      $$invalidate(8, sm = $$new_props.sm);
    if ("md" in $$new_props)
      $$invalidate(9, md = $$new_props.md);
    if ("lg" in $$new_props)
      $$invalidate(10, lg = $$new_props.lg);
    if ("xl" in $$new_props)
      $$invalidate(11, xl = $$new_props.xl);
    if ("xxl" in $$new_props)
      $$invalidate(12, xxl = $$new_props.xxl);
    if ("widths" in $$new_props)
      $$invalidate(13, widths = $$new_props.widths);
    if ("$$scope" in $$new_props)
      $$invalidate(14, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 120) {
      $$invalidate(1, classes = classnames(className2, hidden ? "visually-hidden" : false, check ? "form-check-label" : false, size ? `col-form-label-${size}` : false, colClasses, colClasses.length ? "col-form-label" : "form-label"));
    }
  };
  $$props = exclude_internal_props($$props);
  return [
    fore,
    classes,
    $$restProps,
    className2,
    hidden,
    check,
    size,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    widths,
    $$scope,
    slots
  ];
}
var Label = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$7, create_fragment$7, safe_not_equal, {
      class: 3,
      hidden: 4,
      check: 5,
      size: 6,
      for: 0,
      xs: 7,
      sm: 8,
      md: 9,
      lg: 10,
      xl: 11,
      xxl: 12,
      widths: 13
    });
  }
};
function create_fragment$8(ctx) {
  let ul;
  let current;
  const default_slot_template = ctx[12].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[11], null);
  let ul_levels = [ctx[1], {class: ctx[0]}];
  let ul_data = {};
  for (let i = 0; i < ul_levels.length; i += 1) {
    ul_data = assign(ul_data, ul_levels[i]);
  }
  return {
    c() {
      ul = element("ul");
      if (default_slot)
        default_slot.c();
      set_attributes(ul, ul_data);
    },
    m(target, anchor) {
      insert(target, ul, anchor);
      if (default_slot) {
        default_slot.m(ul, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 2048)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[11], !current ? get_all_dirty_from_scope(ctx2[11]) : get_slot_changes(default_slot_template, ctx2[11], dirty, null), null);
        }
      }
      set_attributes(ul, ul_data = get_spread_update(ul_levels, [
        dirty & 2 && ctx2[1],
        (!current || dirty & 1) && {class: ctx2[0]}
      ]));
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(ul);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function getVerticalClass(vertical) {
  if (vertical === false) {
    return false;
  } else if (vertical === true || vertical === "xs") {
    return "flex-column";
  }
  return `flex-${vertical}-column`;
}
function instance$8($$self, $$props, $$invalidate) {
  let classes;
  const omit_props_names = [
    "class",
    "tabs",
    "pills",
    "vertical",
    "horizontal",
    "justified",
    "fill",
    "navbar",
    "card"
  ];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let {$$slots: slots = {}, $$scope} = $$props;
  let {class: className2 = ""} = $$props;
  let {tabs = false} = $$props;
  let {pills = false} = $$props;
  let {vertical = false} = $$props;
  let {horizontal = ""} = $$props;
  let {justified = false} = $$props;
  let {fill = false} = $$props;
  let {navbar = false} = $$props;
  let {card = false} = $$props;
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(2, className2 = $$new_props.class);
    if ("tabs" in $$new_props)
      $$invalidate(3, tabs = $$new_props.tabs);
    if ("pills" in $$new_props)
      $$invalidate(4, pills = $$new_props.pills);
    if ("vertical" in $$new_props)
      $$invalidate(5, vertical = $$new_props.vertical);
    if ("horizontal" in $$new_props)
      $$invalidate(6, horizontal = $$new_props.horizontal);
    if ("justified" in $$new_props)
      $$invalidate(7, justified = $$new_props.justified);
    if ("fill" in $$new_props)
      $$invalidate(8, fill = $$new_props.fill);
    if ("navbar" in $$new_props)
      $$invalidate(9, navbar = $$new_props.navbar);
    if ("card" in $$new_props)
      $$invalidate(10, card = $$new_props.card);
    if ("$$scope" in $$new_props)
      $$invalidate(11, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 2044) {
      $$invalidate(0, classes = classnames(className2, navbar ? "navbar-nav" : "nav", horizontal ? `justify-content-${horizontal}` : false, getVerticalClass(vertical), {
        "nav-tabs": tabs,
        "card-header-tabs": card && tabs,
        "nav-pills": pills,
        "card-header-pills": card && pills,
        "nav-justified": justified,
        "nav-fill": fill
      }));
    }
  };
  return [
    classes,
    $$restProps,
    className2,
    tabs,
    pills,
    vertical,
    horizontal,
    justified,
    fill,
    navbar,
    card,
    $$scope,
    slots
  ];
}
var Nav = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$8, create_fragment$8, safe_not_equal, {
      class: 2,
      tabs: 3,
      pills: 4,
      vertical: 5,
      horizontal: 6,
      justified: 7,
      fill: 8,
      navbar: 9,
      card: 10
    });
  }
};
function create_else_block$4(ctx) {
  let current;
  const default_slot_template = ctx[10].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[11], null);
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 2048)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[11], !current ? get_all_dirty_from_scope(ctx2[11]) : get_slot_changes(default_slot_template, ctx2[11], dirty, null), null);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_if_block$4(ctx) {
  let container_1;
  let current;
  container_1 = new Container({
    props: {
      fluid: ctx[0] === "fluid",
      $$slots: {default: [create_default_slot$1]},
      $$scope: {ctx}
    }
  });
  return {
    c() {
      create_component(container_1.$$.fragment);
    },
    m(target, anchor) {
      mount_component(container_1, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const container_1_changes = {};
      if (dirty & 1)
        container_1_changes.fluid = ctx2[0] === "fluid";
      if (dirty & 2048) {
        container_1_changes.$$scope = {dirty, ctx: ctx2};
      }
      container_1.$set(container_1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(container_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(container_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(container_1, detaching);
    }
  };
}
function create_default_slot$1(ctx) {
  let current;
  const default_slot_template = ctx[10].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[11], null);
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 2048)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[11], !current ? get_all_dirty_from_scope(ctx2[11]) : get_slot_changes(default_slot_template, ctx2[11], dirty, null), null);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_fragment$9(ctx) {
  let nav;
  let current_block_type_index;
  let if_block;
  let current;
  const if_block_creators = [create_if_block$4, create_else_block$4];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (ctx2[0])
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  let nav_levels = [ctx[2], {class: ctx[1]}];
  let nav_data = {};
  for (let i = 0; i < nav_levels.length; i += 1) {
    nav_data = assign(nav_data, nav_levels[i]);
  }
  return {
    c() {
      nav = element("nav");
      if_block.c();
      set_attributes(nav, nav_data);
    },
    m(target, anchor) {
      insert(target, nav, anchor);
      if_blocks[current_block_type_index].m(nav, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(nav, null);
      }
      set_attributes(nav, nav_data = get_spread_update(nav_levels, [
        dirty & 4 && ctx2[2],
        (!current || dirty & 2) && {class: ctx2[1]}
      ]));
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(nav);
      if_blocks[current_block_type_index].d();
    }
  };
}
function getExpandClass(expand) {
  if (expand === false) {
    return false;
  } else if (expand === true || expand === "xs") {
    return "navbar-expand";
  }
  return `navbar-expand-${expand}`;
}
function instance$9($$self, $$props, $$invalidate) {
  let classes;
  const omit_props_names = ["class", "container", "color", "dark", "expand", "fixed", "light", "sticky"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let {$$slots: slots = {}, $$scope} = $$props;
  setContext("navbar", {inNavbar: true});
  let {class: className2 = ""} = $$props;
  let {container = "fluid"} = $$props;
  let {color = ""} = $$props;
  let {dark = false} = $$props;
  let {expand = ""} = $$props;
  let {fixed = ""} = $$props;
  let {light = false} = $$props;
  let {sticky = ""} = $$props;
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(3, className2 = $$new_props.class);
    if ("container" in $$new_props)
      $$invalidate(0, container = $$new_props.container);
    if ("color" in $$new_props)
      $$invalidate(4, color = $$new_props.color);
    if ("dark" in $$new_props)
      $$invalidate(5, dark = $$new_props.dark);
    if ("expand" in $$new_props)
      $$invalidate(6, expand = $$new_props.expand);
    if ("fixed" in $$new_props)
      $$invalidate(7, fixed = $$new_props.fixed);
    if ("light" in $$new_props)
      $$invalidate(8, light = $$new_props.light);
    if ("sticky" in $$new_props)
      $$invalidate(9, sticky = $$new_props.sticky);
    if ("$$scope" in $$new_props)
      $$invalidate(11, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 1016) {
      $$invalidate(1, classes = classnames(className2, "navbar", getExpandClass(expand), {
        "navbar-light": light,
        "navbar-dark": dark,
        [`bg-${color}`]: color,
        [`fixed-${fixed}`]: fixed,
        [`sticky-${sticky}`]: sticky
      }));
    }
  };
  return [
    container,
    classes,
    $$restProps,
    className2,
    color,
    dark,
    expand,
    fixed,
    light,
    sticky,
    slots,
    $$scope
  ];
}
var Navbar = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$9, create_fragment$9, safe_not_equal, {
      class: 3,
      container: 0,
      color: 4,
      dark: 5,
      expand: 6,
      fixed: 7,
      light: 8,
      sticky: 9
    });
  }
};
function create_fragment$a(ctx) {
  let li;
  let current;
  const default_slot_template = ctx[5].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[4], null);
  let li_levels = [ctx[1], {class: ctx[0]}];
  let li_data = {};
  for (let i = 0; i < li_levels.length; i += 1) {
    li_data = assign(li_data, li_levels[i]);
  }
  return {
    c() {
      li = element("li");
      if (default_slot)
        default_slot.c();
      set_attributes(li, li_data);
    },
    m(target, anchor) {
      insert(target, li, anchor);
      if (default_slot) {
        default_slot.m(li, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 16)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[4], !current ? get_all_dirty_from_scope(ctx2[4]) : get_slot_changes(default_slot_template, ctx2[4], dirty, null), null);
        }
      }
      set_attributes(li, li_data = get_spread_update(li_levels, [
        dirty & 2 && ctx2[1],
        (!current || dirty & 1) && {class: ctx2[0]}
      ]));
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(li);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function instance$a($$self, $$props, $$invalidate) {
  let classes;
  const omit_props_names = ["class", "active"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let {$$slots: slots = {}, $$scope} = $$props;
  let {class: className2 = ""} = $$props;
  let {active = false} = $$props;
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(2, className2 = $$new_props.class);
    if ("active" in $$new_props)
      $$invalidate(3, active = $$new_props.active);
    if ("$$scope" in $$new_props)
      $$invalidate(4, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 12) {
      $$invalidate(0, classes = classnames(className2, "nav-item", active ? "active" : false));
    }
  };
  return [classes, $$restProps, className2, active, $$scope, slots];
}
var NavItem = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$a, create_fragment$a, safe_not_equal, {class: 2, active: 3});
  }
};
function create_fragment$b(ctx) {
  let a;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = ctx[8].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[7], null);
  let a_levels = [
    ctx[3],
    {href: ctx[0]},
    {class: ctx[1]}
  ];
  let a_data = {};
  for (let i = 0; i < a_levels.length; i += 1) {
    a_data = assign(a_data, a_levels[i]);
  }
  return {
    c() {
      a = element("a");
      if (default_slot)
        default_slot.c();
      set_attributes(a, a_data);
    },
    m(target, anchor) {
      insert(target, a, anchor);
      if (default_slot) {
        default_slot.m(a, null);
      }
      current = true;
      if (!mounted) {
        dispose = [
          listen(a, "click", ctx[9]),
          listen(a, "click", ctx[2])
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 128)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[7], !current ? get_all_dirty_from_scope(ctx2[7]) : get_slot_changes(default_slot_template, ctx2[7], dirty, null), null);
        }
      }
      set_attributes(a, a_data = get_spread_update(a_levels, [
        dirty & 8 && ctx2[3],
        (!current || dirty & 1) && {href: ctx2[0]},
        (!current || dirty & 2) && {class: ctx2[1]}
      ]));
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(a);
      if (default_slot)
        default_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$b($$self, $$props, $$invalidate) {
  let classes;
  const omit_props_names = ["class", "disabled", "active", "href"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let {$$slots: slots = {}, $$scope} = $$props;
  let {class: className2 = ""} = $$props;
  let {disabled = false} = $$props;
  let {active = false} = $$props;
  let {href = "#"} = $$props;
  function handleClick(e) {
    if (disabled) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }
    if (href === "#") {
      e.preventDefault();
    }
  }
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(4, className2 = $$new_props.class);
    if ("disabled" in $$new_props)
      $$invalidate(5, disabled = $$new_props.disabled);
    if ("active" in $$new_props)
      $$invalidate(6, active = $$new_props.active);
    if ("href" in $$new_props)
      $$invalidate(0, href = $$new_props.href);
    if ("$$scope" in $$new_props)
      $$invalidate(7, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 112) {
      $$invalidate(1, classes = classnames(className2, "nav-link", {disabled, active}));
    }
  };
  return [
    href,
    classes,
    handleClick,
    $$restProps,
    className2,
    disabled,
    active,
    $$scope,
    slots,
    click_handler
  ];
}
var NavLink = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$b, create_fragment$b, safe_not_equal, {
      class: 4,
      disabled: 5,
      active: 6,
      href: 0
    });
  }
};
function create_fragment$c(ctx) {
  let a;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = ctx[5].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[4], null);
  let a_levels = [
    ctx[2],
    {class: ctx[1]},
    {href: ctx[0]}
  ];
  let a_data = {};
  for (let i = 0; i < a_levels.length; i += 1) {
    a_data = assign(a_data, a_levels[i]);
  }
  return {
    c() {
      a = element("a");
      if (default_slot)
        default_slot.c();
      set_attributes(a, a_data);
    },
    m(target, anchor) {
      insert(target, a, anchor);
      if (default_slot) {
        default_slot.m(a, null);
      }
      current = true;
      if (!mounted) {
        dispose = listen(a, "click", ctx[6]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 16)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[4], !current ? get_all_dirty_from_scope(ctx2[4]) : get_slot_changes(default_slot_template, ctx2[4], dirty, null), null);
        }
      }
      set_attributes(a, a_data = get_spread_update(a_levels, [
        dirty & 4 && ctx2[2],
        (!current || dirty & 2) && {class: ctx2[1]},
        (!current || dirty & 1) && {href: ctx2[0]}
      ]));
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(a);
      if (default_slot)
        default_slot.d(detaching);
      mounted = false;
      dispose();
    }
  };
}
function instance$c($$self, $$props, $$invalidate) {
  let classes;
  const omit_props_names = ["class", "href"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let {$$slots: slots = {}, $$scope} = $$props;
  let {class: className2 = ""} = $$props;
  let {href = "/"} = $$props;
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(3, className2 = $$new_props.class);
    if ("href" in $$new_props)
      $$invalidate(0, href = $$new_props.href);
    if ("$$scope" in $$new_props)
      $$invalidate(4, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 8) {
      $$invalidate(1, classes = classnames(className2, "navbar-brand"));
    }
  };
  return [href, classes, $$restProps, className2, $$scope, slots, click_handler];
}
var NavbarBrand = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$c, create_fragment$c, safe_not_equal, {class: 3, href: 0});
  }
};
function create_fragment$d(ctx) {
  let div;
  let current;
  const default_slot_template = ctx[8].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[7], null);
  let div_levels = [ctx[2], {class: ctx[1]}];
  let div_data = {};
  for (let i = 0; i < div_levels.length; i += 1) {
    div_data = assign(div_data, div_levels[i]);
  }
  return {
    c() {
      div = element("div");
      if (default_slot)
        default_slot.c();
      set_attributes(div, div_data);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      ctx[9](div);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 128)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[7], !current ? get_all_dirty_from_scope(ctx2[7]) : get_slot_changes(default_slot_template, ctx2[7], dirty, null), null);
        }
      }
      set_attributes(div, div_data = get_spread_update(div_levels, [
        dirty & 4 && ctx2[2],
        (!current || dirty & 2) && {class: ctx2[1]}
      ]));
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (default_slot)
        default_slot.d(detaching);
      ctx[9](null);
    }
  };
}
function getCols(cols) {
  const colsValue = parseInt(cols);
  if (!isNaN(colsValue)) {
    if (colsValue > 0) {
      return [`row-cols-${colsValue}`];
    }
  } else if (typeof cols === "object") {
    return ["xs", "sm", "md", "lg", "xl"].map((colWidth) => {
      const isXs = colWidth === "xs";
      const colSizeInterfix = isXs ? "-" : `-${colWidth}-`;
      const value = cols[colWidth];
      if (typeof value === "number" && value > 0) {
        return `row-cols${colSizeInterfix}${value}`;
      }
      return null;
    }).filter((value) => !!value);
  }
  return [];
}
function instance$d($$self, $$props, $$invalidate) {
  let classes;
  const omit_props_names = ["class", "noGutters", "form", "cols", "inner"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let {$$slots: slots = {}, $$scope} = $$props;
  let {class: className2 = ""} = $$props;
  let {noGutters = false} = $$props;
  let {form = false} = $$props;
  let {cols = 0} = $$props;
  let {inner = void 0} = $$props;
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      inner = $$value;
      $$invalidate(0, inner);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(3, className2 = $$new_props.class);
    if ("noGutters" in $$new_props)
      $$invalidate(4, noGutters = $$new_props.noGutters);
    if ("form" in $$new_props)
      $$invalidate(5, form = $$new_props.form);
    if ("cols" in $$new_props)
      $$invalidate(6, cols = $$new_props.cols);
    if ("inner" in $$new_props)
      $$invalidate(0, inner = $$new_props.inner);
    if ("$$scope" in $$new_props)
      $$invalidate(7, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 120) {
      $$invalidate(1, classes = classnames(className2, noGutters ? "gx-0" : null, form ? "form-row" : "row", ...getCols(cols)));
    }
  };
  return [
    inner,
    classes,
    $$restProps,
    className2,
    noGutters,
    form,
    cols,
    $$scope,
    slots,
    div_binding
  ];
}
var Row = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$d, create_fragment$d, safe_not_equal, {
      class: 3,
      noGutters: 4,
      form: 5,
      cols: 6,
      inner: 0
    });
  }
};
function create_fragment$e(ctx) {
  let colgroup;
  let current;
  const default_slot_template = ctx[1].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[0], null);
  return {
    c() {
      colgroup = element("colgroup");
      if (default_slot)
        default_slot.c();
    },
    m(target, anchor) {
      insert(target, colgroup, anchor);
      if (default_slot) {
        default_slot.m(colgroup, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 1)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[0], !current ? get_all_dirty_from_scope(ctx2[0]) : get_slot_changes(default_slot_template, ctx2[0], dirty, null), null);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(colgroup);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function instance$e($$self, $$props, $$invalidate) {
  let {$$slots: slots = {}, $$scope} = $$props;
  setContext("colgroup", true);
  $$self.$$set = ($$props2) => {
    if ("$$scope" in $$props2)
      $$invalidate(0, $$scope = $$props2.$$scope);
  };
  return [$$scope, slots];
}
var Colgroup = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$e, create_fragment$e, safe_not_equal, {});
  }
};
function create_else_block$5(ctx) {
  let current;
  const default_slot_template = ctx[3].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[2], null);
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 4)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[2], !current ? get_all_dirty_from_scope(ctx2[2]) : get_slot_changes(default_slot_template, ctx2[2], dirty, null), null);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_if_block$5(ctx) {
  let div;
  let current;
  const default_slot_template = ctx[3].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[2], null);
  return {
    c() {
      div = element("div");
      if (default_slot)
        default_slot.c();
      attr(div, "class", ctx[1]);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 4)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[2], !current ? get_all_dirty_from_scope(ctx2[2]) : get_slot_changes(default_slot_template, ctx2[2], dirty, null), null);
        }
      }
      if (!current || dirty & 2) {
        attr(div, "class", ctx2[1]);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_fragment$f(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block$5, create_else_block$5];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (ctx2[0])
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
var className = "";
function instance$f($$self, $$props, $$invalidate) {
  let responsiveClassName;
  let {$$slots: slots = {}, $$scope} = $$props;
  let {responsive = false} = $$props;
  $$self.$$set = ($$props2) => {
    if ("responsive" in $$props2)
      $$invalidate(0, responsive = $$props2.responsive);
    if ("$$scope" in $$props2)
      $$invalidate(2, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 1) {
      $$invalidate(1, responsiveClassName = classnames(className, {
        "table-responsive": responsive === true,
        [`table-responsive-${responsive}`]: typeof responsive === "string"
      }));
    }
  };
  return [responsive, responsiveClassName, $$scope, slots];
}
var ResponsiveContainer = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$f, create_fragment$f, safe_not_equal, {responsive: 0});
  }
};
function create_fragment$g(ctx) {
  let tfoot;
  let tr;
  let current;
  const default_slot_template = ctx[2].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[1], null);
  let tfoot_levels = [ctx[0]];
  let tfoot_data = {};
  for (let i = 0; i < tfoot_levels.length; i += 1) {
    tfoot_data = assign(tfoot_data, tfoot_levels[i]);
  }
  return {
    c() {
      tfoot = element("tfoot");
      tr = element("tr");
      if (default_slot)
        default_slot.c();
      set_attributes(tfoot, tfoot_data);
    },
    m(target, anchor) {
      insert(target, tfoot, anchor);
      append(tfoot, tr);
      if (default_slot) {
        default_slot.m(tr, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 2)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[1], !current ? get_all_dirty_from_scope(ctx2[1]) : get_slot_changes(default_slot_template, ctx2[1], dirty, null), null);
        }
      }
      set_attributes(tfoot, tfoot_data = get_spread_update(tfoot_levels, [dirty & 1 && ctx2[0]]));
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(tfoot);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function instance$g($$self, $$props, $$invalidate) {
  const omit_props_names = [];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let {$$slots: slots = {}, $$scope} = $$props;
  setContext("footer", true);
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("$$scope" in $$new_props)
      $$invalidate(1, $$scope = $$new_props.$$scope);
  };
  return [$$restProps, $$scope, slots];
}
var TableFooter = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$g, create_fragment$g, safe_not_equal, {});
  }
};
function create_fragment$h(ctx) {
  let thead;
  let tr;
  let current;
  const default_slot_template = ctx[2].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[1], null);
  let thead_levels = [ctx[0]];
  let thead_data = {};
  for (let i = 0; i < thead_levels.length; i += 1) {
    thead_data = assign(thead_data, thead_levels[i]);
  }
  return {
    c() {
      thead = element("thead");
      tr = element("tr");
      if (default_slot)
        default_slot.c();
      set_attributes(thead, thead_data);
    },
    m(target, anchor) {
      insert(target, thead, anchor);
      append(thead, tr);
      if (default_slot) {
        default_slot.m(tr, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 2)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[1], !current ? get_all_dirty_from_scope(ctx2[1]) : get_slot_changes(default_slot_template, ctx2[1], dirty, null), null);
        }
      }
      set_attributes(thead, thead_data = get_spread_update(thead_levels, [dirty & 1 && ctx2[0]]));
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(thead);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function instance$h($$self, $$props, $$invalidate) {
  const omit_props_names = [];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let {$$slots: slots = {}, $$scope} = $$props;
  setContext("header", true);
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("$$scope" in $$new_props)
      $$invalidate(1, $$scope = $$new_props.$$scope);
  };
  return [$$restProps, $$scope, slots];
}
var TableHeader = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$h, create_fragment$h, safe_not_equal, {});
  }
};
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[13] = list[i];
  return child_ctx;
}
var get_default_slot_changes_1 = (dirty) => ({row: dirty & 2});
var get_default_slot_context_1 = (ctx) => ({row: ctx[13]});
var get_default_slot_changes = (dirty) => ({row: dirty & 2});
var get_default_slot_context = (ctx) => ({row: ctx[13]});
function create_else_block$6(ctx) {
  let current;
  const default_slot_template = ctx[11].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[12], null);
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 4096)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[12], !current ? get_all_dirty_from_scope(ctx2[12]) : get_slot_changes(default_slot_template, ctx2[12], dirty, null), null);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_if_block$6(ctx) {
  let colgroup;
  let t0;
  let tableheader;
  let t1;
  let tbody;
  let t2;
  let tablefooter;
  let current;
  colgroup = new Colgroup({
    props: {
      $$slots: {default: [create_default_slot_3]},
      $$scope: {ctx}
    }
  });
  tableheader = new TableHeader({
    props: {
      $$slots: {default: [create_default_slot_2]},
      $$scope: {ctx}
    }
  });
  let each_value = ctx[1];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  tablefooter = new TableFooter({
    props: {
      $$slots: {default: [create_default_slot_1$1]},
      $$scope: {ctx}
    }
  });
  return {
    c() {
      create_component(colgroup.$$.fragment);
      t0 = space();
      create_component(tableheader.$$.fragment);
      t1 = space();
      tbody = element("tbody");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t2 = space();
      create_component(tablefooter.$$.fragment);
    },
    m(target, anchor) {
      mount_component(colgroup, target, anchor);
      insert(target, t0, anchor);
      mount_component(tableheader, target, anchor);
      insert(target, t1, anchor);
      insert(target, tbody, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(tbody, null);
      }
      insert(target, t2, anchor);
      mount_component(tablefooter, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const colgroup_changes = {};
      if (dirty & 4096) {
        colgroup_changes.$$scope = {dirty, ctx: ctx2};
      }
      colgroup.$set(colgroup_changes);
      const tableheader_changes = {};
      if (dirty & 4098) {
        tableheader_changes.$$scope = {dirty, ctx: ctx2};
      }
      tableheader.$set(tableheader_changes);
      if (dirty & 4098) {
        each_value = ctx2[1];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$1(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$1(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(tbody, null);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
      const tablefooter_changes = {};
      if (dirty & 4096) {
        tablefooter_changes.$$scope = {dirty, ctx: ctx2};
      }
      tablefooter.$set(tablefooter_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(colgroup.$$.fragment, local);
      transition_in(tableheader.$$.fragment, local);
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      transition_in(tablefooter.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(colgroup.$$.fragment, local);
      transition_out(tableheader.$$.fragment, local);
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      transition_out(tablefooter.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(colgroup, detaching);
      if (detaching)
        detach(t0);
      destroy_component(tableheader, detaching);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(tbody);
      destroy_each(each_blocks, detaching);
      if (detaching)
        detach(t2);
      destroy_component(tablefooter, detaching);
    }
  };
}
function create_default_slot_3(ctx) {
  let current;
  const default_slot_template = ctx[11].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[12], null);
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 4096)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[12], !current ? get_all_dirty_from_scope(ctx2[12]) : get_slot_changes(default_slot_template, ctx2[12], dirty, null), null);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_default_slot_2(ctx) {
  let current;
  const default_slot_template = ctx[11].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[12], get_default_slot_context);
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 4098)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[12], !current ? get_all_dirty_from_scope(ctx2[12]) : get_slot_changes(default_slot_template, ctx2[12], dirty, get_default_slot_changes), get_default_slot_context);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_each_block$1(ctx) {
  let tr;
  let t;
  let current;
  const default_slot_template = ctx[11].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[12], get_default_slot_context_1);
  return {
    c() {
      tr = element("tr");
      if (default_slot)
        default_slot.c();
      t = space();
    },
    m(target, anchor) {
      insert(target, tr, anchor);
      if (default_slot) {
        default_slot.m(tr, null);
      }
      append(tr, t);
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 4098)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[12], !current ? get_all_dirty_from_scope(ctx2[12]) : get_slot_changes(default_slot_template, ctx2[12], dirty, get_default_slot_changes_1), get_default_slot_context_1);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(tr);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_default_slot_1$1(ctx) {
  let current;
  const default_slot_template = ctx[11].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[12], null);
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 4096)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[12], !current ? get_all_dirty_from_scope(ctx2[12]) : get_slot_changes(default_slot_template, ctx2[12], dirty, null), null);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_default_slot$2(ctx) {
  let table;
  let current_block_type_index;
  let if_block;
  let current;
  const if_block_creators = [create_if_block$6, create_else_block$6];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (ctx2[1])
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  let table_levels = [ctx[3], {class: ctx[2]}];
  let table_data = {};
  for (let i = 0; i < table_levels.length; i += 1) {
    table_data = assign(table_data, table_levels[i]);
  }
  return {
    c() {
      table = element("table");
      if_block.c();
      set_attributes(table, table_data);
    },
    m(target, anchor) {
      insert(target, table, anchor);
      if_blocks[current_block_type_index].m(table, null);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(table, null);
      }
      set_attributes(table, table_data = get_spread_update(table_levels, [
        dirty & 8 && ctx2[3],
        (!current || dirty & 4) && {class: ctx2[2]}
      ]));
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(table);
      if_blocks[current_block_type_index].d();
    }
  };
}
function create_fragment$i(ctx) {
  let responsivecontainer;
  let current;
  responsivecontainer = new ResponsiveContainer({
    props: {
      responsive: ctx[0],
      $$slots: {default: [create_default_slot$2]},
      $$scope: {ctx}
    }
  });
  return {
    c() {
      create_component(responsivecontainer.$$.fragment);
    },
    m(target, anchor) {
      mount_component(responsivecontainer, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const responsivecontainer_changes = {};
      if (dirty & 1)
        responsivecontainer_changes.responsive = ctx2[0];
      if (dirty & 4110) {
        responsivecontainer_changes.$$scope = {dirty, ctx: ctx2};
      }
      responsivecontainer.$set(responsivecontainer_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(responsivecontainer.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(responsivecontainer.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(responsivecontainer, detaching);
    }
  };
}
function instance$i($$self, $$props, $$invalidate) {
  let classes;
  const omit_props_names = [
    "class",
    "size",
    "bordered",
    "borderless",
    "striped",
    "dark",
    "hover",
    "responsive",
    "rows"
  ];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let {$$slots: slots = {}, $$scope} = $$props;
  let {class: className2 = ""} = $$props;
  let {size = ""} = $$props;
  let {bordered = false} = $$props;
  let {borderless = false} = $$props;
  let {striped = false} = $$props;
  let {dark = false} = $$props;
  let {hover = false} = $$props;
  let {responsive = false} = $$props;
  let {rows = void 0} = $$props;
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(4, className2 = $$new_props.class);
    if ("size" in $$new_props)
      $$invalidate(5, size = $$new_props.size);
    if ("bordered" in $$new_props)
      $$invalidate(6, bordered = $$new_props.bordered);
    if ("borderless" in $$new_props)
      $$invalidate(7, borderless = $$new_props.borderless);
    if ("striped" in $$new_props)
      $$invalidate(8, striped = $$new_props.striped);
    if ("dark" in $$new_props)
      $$invalidate(9, dark = $$new_props.dark);
    if ("hover" in $$new_props)
      $$invalidate(10, hover = $$new_props.hover);
    if ("responsive" in $$new_props)
      $$invalidate(0, responsive = $$new_props.responsive);
    if ("rows" in $$new_props)
      $$invalidate(1, rows = $$new_props.rows);
    if ("$$scope" in $$new_props)
      $$invalidate(12, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 2032) {
      $$invalidate(2, classes = classnames(className2, "table", size ? "table-" + size : false, bordered ? "table-bordered" : false, borderless ? "table-borderless" : false, striped ? "table-striped" : false, dark ? "table-dark" : false, hover ? "table-hover" : false));
    }
  };
  return [
    responsive,
    rows,
    classes,
    $$restProps,
    className2,
    size,
    bordered,
    borderless,
    striped,
    dark,
    hover,
    slots,
    $$scope
  ];
}
var Table = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$i, create_fragment$i, safe_not_equal, {
      class: 4,
      size: 5,
      bordered: 6,
      borderless: 7,
      striped: 8,
      dark: 9,
      hover: 10,
      responsive: 0,
      rows: 1
    });
  }
};
function create_default_slot$3(ctx) {
  let current;
  const default_slot_template = ctx[1].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[2], null);
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 4)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[2], !current ? get_all_dirty_from_scope(ctx2[2]) : get_slot_changes(default_slot_template, ctx2[2], dirty, null), null);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_fragment$j(ctx) {
  let nav;
  let current;
  const nav_spread_levels = [ctx[0]];
  let nav_props = {
    $$slots: {default: [create_default_slot$3]},
    $$scope: {ctx}
  };
  for (let i = 0; i < nav_spread_levels.length; i += 1) {
    nav_props = assign(nav_props, nav_spread_levels[i]);
  }
  nav = new Nav({props: nav_props});
  return {
    c() {
      create_component(nav.$$.fragment);
    },
    m(target, anchor) {
      mount_component(nav, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const nav_changes = dirty & 1 ? get_spread_update(nav_spread_levels, [get_spread_object(ctx2[0])]) : {};
      if (dirty & 4) {
        nav_changes.$$scope = {dirty, ctx: ctx2};
      }
      nav.$set(nav_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(nav.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(nav.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(nav, detaching);
    }
  };
}
function instance$j($$self, $$props, $$invalidate) {
  const omit_props_names = [];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let {$$slots: slots = {}, $$scope} = $$props;
  setContext("tabs", true);
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("$$scope" in $$new_props)
      $$invalidate(2, $$scope = $$new_props.$$scope);
  };
  return [$$restProps, slots, $$scope];
}
var TabHeader = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$j, create_fragment$j, safe_not_equal, {});
  }
};
function create_default_slot$4(ctx) {
  let current;
  const default_slot_template = ctx[5].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[6], null);
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 64)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[6], !current ? get_all_dirty_from_scope(ctx2[6]) : get_slot_changes(default_slot_template, ctx2[6], dirty, null), null);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_fragment$k(ctx) {
  let div;
  let tabheader;
  let t;
  let current;
  tabheader = new TabHeader({
    props: {
      class: classnames({"me-3": ctx[1]}),
      pills: ctx[0],
      tabs: !ctx[0],
      vertical: ctx[1],
      $$slots: {default: [create_default_slot$4]},
      $$scope: {ctx}
    }
  });
  const default_slot_template = ctx[5].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[6], null);
  let div_levels = [ctx[3], {class: ctx[2]}];
  let div_data = {};
  for (let i = 0; i < div_levels.length; i += 1) {
    div_data = assign(div_data, div_levels[i]);
  }
  return {
    c() {
      div = element("div");
      create_component(tabheader.$$.fragment);
      t = space();
      if (default_slot)
        default_slot.c();
      set_attributes(div, div_data);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(tabheader, div, null);
      append(div, t);
      if (default_slot) {
        default_slot.m(div, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      const tabheader_changes = {};
      if (dirty & 2)
        tabheader_changes.class = classnames({"me-3": ctx2[1]});
      if (dirty & 1)
        tabheader_changes.pills = ctx2[0];
      if (dirty & 1)
        tabheader_changes.tabs = !ctx2[0];
      if (dirty & 2)
        tabheader_changes.vertical = ctx2[1];
      if (dirty & 64) {
        tabheader_changes.$$scope = {dirty, ctx: ctx2};
      }
      tabheader.$set(tabheader_changes);
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 64)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[6], !current ? get_all_dirty_from_scope(ctx2[6]) : get_slot_changes(default_slot_template, ctx2[6], dirty, null), null);
        }
      }
      set_attributes(div, div_data = get_spread_update(div_levels, [
        dirty & 8 && ctx2[3],
        (!current || dirty & 4) && {class: ctx2[2]}
      ]));
    },
    i(local) {
      if (current)
        return;
      transition_in(tabheader.$$.fragment, local);
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(tabheader.$$.fragment, local);
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_component(tabheader);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function instance$k($$self, $$props, $$invalidate) {
  let classes;
  const omit_props_names = ["class", "pills", "vertical"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let {$$slots: slots = {}, $$scope} = $$props;
  const dispatch = createEventDispatcher();
  let {class: className2 = ""} = $$props;
  let {pills = false} = $$props;
  let {vertical = false} = $$props;
  const activeTabId = writable();
  setContext("tabContent", {
    activeTabId,
    setActiveTab: (tabId) => {
      activeTabId.set(tabId);
      dispatch("tab", tabId);
    }
  });
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(4, className2 = $$new_props.class);
    if ("pills" in $$new_props)
      $$invalidate(0, pills = $$new_props.pills);
    if ("vertical" in $$new_props)
      $$invalidate(1, vertical = $$new_props.vertical);
    if ("$$scope" in $$new_props)
      $$invalidate(6, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 18) {
      $$invalidate(2, classes = classnames("tab-content", className2, {"d-flex align-items-start": vertical}));
    }
  };
  return [pills, vertical, classes, $$restProps, className2, slots, $$scope];
}
var TabContent = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$k, create_fragment$k, safe_not_equal, {class: 4, pills: 0, vertical: 1});
  }
};
var get_tab_slot_changes = (dirty) => ({});
var get_tab_slot_context = (ctx) => ({});
function create_else_block$7(ctx) {
  let div;
  let current;
  const default_slot_template = ctx[12].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[14], null);
  let div_levels = [ctx[8], {class: ctx[4]}];
  let div_data = {};
  for (let i = 0; i < div_levels.length; i += 1) {
    div_data = assign(div_data, div_levels[i]);
  }
  return {
    c() {
      div = element("div");
      if (default_slot)
        default_slot.c();
      set_attributes(div, div_data);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 16384)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[14], !current ? get_all_dirty_from_scope(ctx2[14]) : get_slot_changes(default_slot_template, ctx2[14], dirty, null), null);
        }
      }
      set_attributes(div, div_data = get_spread_update(div_levels, [
        dirty & 256 && ctx2[8],
        (!current || dirty & 16) && {class: ctx2[4]}
      ]));
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_if_block$7(ctx) {
  let navitem;
  let current;
  navitem = new NavItem({
    props: {
      $$slots: {default: [create_default_slot$5]},
      $$scope: {ctx}
    }
  });
  return {
    c() {
      create_component(navitem.$$.fragment);
    },
    m(target, anchor) {
      mount_component(navitem, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const navitem_changes = {};
      if (dirty & 16399) {
        navitem_changes.$$scope = {dirty, ctx: ctx2};
      }
      navitem.$set(navitem_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(navitem.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(navitem.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(navitem, detaching);
    }
  };
}
function create_if_block_1$4(ctx) {
  let t;
  return {
    c() {
      t = text(ctx[1]);
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 2)
        set_data(t, ctx2[1]);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_1$2(ctx) {
  let t;
  let current;
  let if_block = ctx[1] && create_if_block_1$4(ctx);
  const tab_slot_template = ctx[12].tab;
  const tab_slot = create_slot(tab_slot_template, ctx, ctx[14], get_tab_slot_context);
  return {
    c() {
      if (if_block)
        if_block.c();
      t = space();
      if (tab_slot)
        tab_slot.c();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, t, anchor);
      if (tab_slot) {
        tab_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (ctx2[1]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_1$4(ctx2);
          if_block.c();
          if_block.m(t.parentNode, t);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (tab_slot) {
        if (tab_slot.p && (!current || dirty & 16384)) {
          update_slot_base(tab_slot, tab_slot_template, ctx2, ctx2[14], !current ? get_all_dirty_from_scope(ctx2[14]) : get_slot_changes(tab_slot_template, ctx2[14], dirty, get_tab_slot_changes), get_tab_slot_context);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(tab_slot, local);
      current = true;
    },
    o(local) {
      transition_out(tab_slot, local);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(t);
      if (tab_slot)
        tab_slot.d(detaching);
    }
  };
}
function create_default_slot$5(ctx) {
  let navlink;
  let current;
  navlink = new NavLink({
    props: {
      active: ctx[3],
      disabled: ctx[0],
      $$slots: {default: [create_default_slot_1$2]},
      $$scope: {ctx}
    }
  });
  navlink.$on("click", ctx[13]);
  return {
    c() {
      create_component(navlink.$$.fragment);
    },
    m(target, anchor) {
      mount_component(navlink, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const navlink_changes = {};
      if (dirty & 8)
        navlink_changes.active = ctx2[3];
      if (dirty & 1)
        navlink_changes.disabled = ctx2[0];
      if (dirty & 16386) {
        navlink_changes.$$scope = {dirty, ctx: ctx2};
      }
      navlink.$set(navlink_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(navlink.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(navlink.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(navlink, detaching);
    }
  };
}
function create_fragment$l(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block$7, create_else_block$7];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (ctx2[5])
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if_block.p(ctx2, dirty);
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance$l($$self, $$props, $$invalidate) {
  let classes;
  const omit_props_names = ["class", "active", "disabled", "tab", "tabId"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let $activeTabId;
  let {$$slots: slots = {}, $$scope} = $$props;
  let {class: className2 = ""} = $$props;
  let {active = false} = $$props;
  let {disabled = false} = $$props;
  let {tab = void 0} = $$props;
  let {tabId = void 0} = $$props;
  const tabs = getContext("tabs");
  const {activeTabId, setActiveTab} = getContext("tabContent");
  component_subscribe($$self, activeTabId, (value) => $$invalidate(11, $activeTabId = value));
  onMount(() => {
    if (active)
      setActiveTab(tabId);
  });
  let tabOpen = active;
  const click_handler = () => setActiveTab(tabId);
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(8, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(9, className2 = $$new_props.class);
    if ("active" in $$new_props)
      $$invalidate(10, active = $$new_props.active);
    if ("disabled" in $$new_props)
      $$invalidate(0, disabled = $$new_props.disabled);
    if ("tab" in $$new_props)
      $$invalidate(1, tab = $$new_props.tab);
    if ("tabId" in $$new_props)
      $$invalidate(2, tabId = $$new_props.tabId);
    if ("$$scope" in $$new_props)
      $$invalidate(14, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 2052) {
      if ($activeTabId !== void 0)
        $$invalidate(3, tabOpen = $activeTabId === tabId);
    }
    if ($$self.$$.dirty & 520) {
      $$invalidate(4, classes = classnames("tab-pane", className2, {active: tabOpen, show: tabOpen}));
    }
  };
  return [
    disabled,
    tab,
    tabId,
    tabOpen,
    classes,
    tabs,
    activeTabId,
    setActiveTab,
    $$restProps,
    className2,
    active,
    $activeTabId,
    slots,
    click_handler,
    $$scope
  ];
}
var TabPane = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$l, create_fragment$l, safe_not_equal, {
      class: 9,
      active: 10,
      disabled: 0,
      tab: 1,
      tabId: 2
    });
  }
};

// docs/dist/ts/stores.js
var title = writable("");
var publication = writable("");
var authors = writable([]);
var keywords = writable([]);
var abstract = writable("");
var content = writable("");
var media = writable({});
var references = writable({});
var contentScrollPosition = writable(0);

// docs/dist/components/Authors.svelte.js
function get_each_context2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[8] = list[i];
  child_ctx[10] = i;
  return child_ctx;
}
function create_default_slot_8(ctx) {
  let t;
  return {
    c() {
      t = text("Authors");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_7(ctx) {
  let input;
  let updating_value;
  let current;
  function input_value_binding(value) {
    ctx[5](value);
  }
  let input_props = {type: "text", placeholder: "Name"};
  if (ctx[0] !== void 0) {
    input_props.value = ctx[0];
  }
  input = new Input({props: input_props});
  binding_callbacks.push(() => bind(input, "value", input_value_binding));
  return {
    c() {
      create_component(input.$$.fragment);
    },
    m(target, anchor) {
      mount_component(input, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const input_changes = {};
      if (!updating_value && dirty & 1) {
        updating_value = true;
        input_changes.value = ctx2[0];
        add_flush_callback(() => updating_value = false);
      }
      input.$set(input_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(input.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(input.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(input, detaching);
    }
  };
}
function create_default_slot_6(ctx) {
  let input;
  let updating_value;
  let current;
  function input_value_binding_1(value) {
    ctx[6](value);
  }
  let input_props = {type: "text", placeholder: "ORCID"};
  if (ctx[1] !== void 0) {
    input_props.value = ctx[1];
  }
  input = new Input({props: input_props});
  binding_callbacks.push(() => bind(input, "value", input_value_binding_1));
  return {
    c() {
      create_component(input.$$.fragment);
    },
    m(target, anchor) {
      mount_component(input, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const input_changes = {};
      if (!updating_value && dirty & 2) {
        updating_value = true;
        input_changes.value = ctx2[1];
        add_flush_callback(() => updating_value = false);
      }
      input.$set(input_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(input.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(input.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(input, detaching);
    }
  };
}
function create_default_slot_5(ctx) {
  let t;
  return {
    c() {
      t = text("Add");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_4(ctx) {
  let button;
  let current;
  button = new Button({
    props: {
      $$slots: {default: [create_default_slot_5]},
      $$scope: {ctx}
    }
  });
  button.$on("click", ctx[3]);
  return {
    c() {
      create_component(button.$$.fragment);
    },
    m(target, anchor) {
      mount_component(button, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const button_changes = {};
      if (dirty & 2048) {
        button_changes.$$scope = {dirty, ctx: ctx2};
      }
      button.$set(button_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(button.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(button, detaching);
    }
  };
}
function create_default_slot_32(ctx) {
  let col0;
  let t0;
  let col1;
  let t1;
  let col2;
  let current;
  col0 = new Col({
    props: {
      class: "col-5",
      $$slots: {default: [create_default_slot_7]},
      $$scope: {ctx}
    }
  });
  col1 = new Col({
    props: {
      class: "col-5",
      $$slots: {default: [create_default_slot_6]},
      $$scope: {ctx}
    }
  });
  col2 = new Col({
    props: {
      class: "col-1",
      $$slots: {default: [create_default_slot_4]},
      $$scope: {ctx}
    }
  });
  return {
    c() {
      create_component(col0.$$.fragment);
      t0 = space();
      create_component(col1.$$.fragment);
      t1 = space();
      create_component(col2.$$.fragment);
    },
    m(target, anchor) {
      mount_component(col0, target, anchor);
      insert(target, t0, anchor);
      mount_component(col1, target, anchor);
      insert(target, t1, anchor);
      mount_component(col2, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const col0_changes = {};
      if (dirty & 2049) {
        col0_changes.$$scope = {dirty, ctx: ctx2};
      }
      col0.$set(col0_changes);
      const col1_changes = {};
      if (dirty & 2050) {
        col1_changes.$$scope = {dirty, ctx: ctx2};
      }
      col1.$set(col1_changes);
      const col2_changes = {};
      if (dirty & 2048) {
        col2_changes.$$scope = {dirty, ctx: ctx2};
      }
      col2.$set(col2_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(col0.$$.fragment, local);
      transition_in(col1.$$.fragment, local);
      transition_in(col2.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(col0.$$.fragment, local);
      transition_out(col1.$$.fragment, local);
      transition_out(col2.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(col0, detaching);
      if (detaching)
        detach(t0);
      destroy_component(col1, detaching);
      if (detaching)
        detach(t1);
      destroy_component(col2, detaching);
    }
  };
}
function create_default_slot_22(ctx) {
  let label;
  let t;
  let row;
  let current;
  label = new Label({
    props: {
      $$slots: {default: [create_default_slot_8]},
      $$scope: {ctx}
    }
  });
  row = new Row({
    props: {
      $$slots: {default: [create_default_slot_32]},
      $$scope: {ctx}
    }
  });
  return {
    c() {
      create_component(label.$$.fragment);
      t = space();
      create_component(row.$$.fragment);
    },
    m(target, anchor) {
      mount_component(label, target, anchor);
      insert(target, t, anchor);
      mount_component(row, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const label_changes = {};
      if (dirty & 2048) {
        label_changes.$$scope = {dirty, ctx: ctx2};
      }
      label.$set(label_changes);
      const row_changes = {};
      if (dirty & 2051) {
        row_changes.$$scope = {dirty, ctx: ctx2};
      }
      row.$set(row_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(label.$$.fragment, local);
      transition_in(row.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(label.$$.fragment, local);
      transition_out(row.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(label, detaching);
      if (detaching)
        detach(t);
      destroy_component(row, detaching);
    }
  };
}
function create_default_slot_12(ctx) {
  let t;
  return {
    c() {
      t = text("Remove");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_each_block2(ctx) {
  let tr;
  let td0;
  let t0_value = ctx[8].name + "";
  let t0;
  let t1;
  let td1;
  let t2_value = ctx[8].orcid + "";
  let t2;
  let t3;
  let td2;
  let button;
  let t4;
  let current;
  function click_handler() {
    return ctx[7](ctx[10]);
  }
  button = new Button({
    props: {
      size: "sm",
      $$slots: {default: [create_default_slot_12]},
      $$scope: {ctx}
    }
  });
  button.$on("click", click_handler);
  return {
    c() {
      tr = element("tr");
      td0 = element("td");
      t0 = text(t0_value);
      t1 = space();
      td1 = element("td");
      t2 = text(t2_value);
      t3 = space();
      td2 = element("td");
      create_component(button.$$.fragment);
      t4 = space();
    },
    m(target, anchor) {
      insert(target, tr, anchor);
      append(tr, td0);
      append(td0, t0);
      append(tr, t1);
      append(tr, td1);
      append(td1, t2);
      append(tr, t3);
      append(tr, td2);
      mount_component(button, td2, null);
      append(tr, t4);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if ((!current || dirty & 4) && t0_value !== (t0_value = ctx[8].name + ""))
        set_data(t0, t0_value);
      if ((!current || dirty & 4) && t2_value !== (t2_value = ctx[8].orcid + ""))
        set_data(t2, t2_value);
      const button_changes = {};
      if (dirty & 2048) {
        button_changes.$$scope = {dirty, ctx};
      }
      button.$set(button_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(button.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(tr);
      destroy_component(button);
    }
  };
}
function create_default_slot2(ctx) {
  let thead;
  let t5;
  let tbody;
  let current;
  let each_value = ctx[2];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block2(get_each_context2(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      thead = element("thead");
      thead.innerHTML = `<tr><th>Name</th> 
			<th>ORCID</th> 
			<th>Actions</th></tr>`;
      t5 = space();
      tbody = element("tbody");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
    },
    m(target, anchor) {
      insert(target, thead, anchor);
      insert(target, t5, anchor);
      insert(target, tbody, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(tbody, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & 20) {
        each_value = ctx2[2];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context2(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block2(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(tbody, null);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(thead);
      if (detaching)
        detach(t5);
      if (detaching)
        detach(tbody);
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_fragment2(ctx) {
  let formgroup;
  let t;
  let table;
  let current;
  formgroup = new FormGroup({
    props: {
      $$slots: {default: [create_default_slot_22]},
      $$scope: {ctx}
    }
  });
  table = new Table({
    props: {
      bordered: true,
      striped: true,
      size: "sm",
      $$slots: {default: [create_default_slot2]},
      $$scope: {ctx}
    }
  });
  return {
    c() {
      create_component(formgroup.$$.fragment);
      t = space();
      create_component(table.$$.fragment);
    },
    m(target, anchor) {
      mount_component(formgroup, target, anchor);
      insert(target, t, anchor);
      mount_component(table, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const formgroup_changes = {};
      if (dirty & 2051) {
        formgroup_changes.$$scope = {dirty, ctx: ctx2};
      }
      formgroup.$set(formgroup_changes);
      const table_changes = {};
      if (dirty & 2052) {
        table_changes.$$scope = {dirty, ctx: ctx2};
      }
      table.$set(table_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(formgroup.$$.fragment, local);
      transition_in(table.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(formgroup.$$.fragment, local);
      transition_out(table.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(formgroup, detaching);
      if (detaching)
        detach(t);
      destroy_component(table, detaching);
    }
  };
}
function instance2($$self, $$props, $$invalidate) {
  let $authors;
  component_subscribe($$self, authors, ($$value) => $$invalidate(2, $authors = $$value));
  let name = "";
  let orcid = "";
  const addAuthor = () => {
    console.log("Adding Author", name);
    authors.update((value) => {
      value.push({name, orcid});
      return value;
    });
    $$invalidate(0, name = "");
    $$invalidate(1, orcid = "");
  };
  const removeAuthor = (idx) => {
    console.log(idx);
    authors.update((value) => {
      value.splice(idx, 1);
      return value;
    });
  };
  function input_value_binding(value) {
    name = value;
    $$invalidate(0, name);
  }
  function input_value_binding_1(value) {
    orcid = value;
    $$invalidate(1, orcid);
  }
  const click_handler = (i) => removeAuthor(i);
  return [
    name,
    orcid,
    $authors,
    addAuthor,
    removeAuthor,
    input_value_binding,
    input_value_binding_1,
    click_handler
  ];
}
var Authors = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance2, create_fragment2, safe_not_equal, {});
  }
};
var Authors_svelte_default = Authors;

// docs/dist/components/Abstract.svelte.js
function create_default_slot_13(ctx) {
  let t;
  return {
    c() {
      t = text("Abstract");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot3(ctx) {
  let label;
  let t;
  let input;
  let updating_inner;
  let updating_value;
  let current;
  label = new Label({
    props: {
      $$slots: {default: [create_default_slot_13]},
      $$scope: {ctx}
    }
  });
  function input_inner_binding(value) {
    ctx[3](value);
  }
  function input_value_binding(value) {
    ctx[4](value);
  }
  let input_props = {rows: 5, type: "textarea"};
  if (ctx[0] !== void 0) {
    input_props.inner = ctx[0];
  }
  if (ctx[1] !== void 0) {
    input_props.value = ctx[1];
  }
  input = new Input({props: input_props});
  binding_callbacks.push(() => bind(input, "inner", input_inner_binding));
  binding_callbacks.push(() => bind(input, "value", input_value_binding));
  input.$on("input", ctx[2]);
  return {
    c() {
      create_component(label.$$.fragment);
      t = space();
      create_component(input.$$.fragment);
    },
    m(target, anchor) {
      mount_component(label, target, anchor);
      insert(target, t, anchor);
      mount_component(input, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const label_changes = {};
      if (dirty & 32) {
        label_changes.$$scope = {dirty, ctx: ctx2};
      }
      label.$set(label_changes);
      const input_changes = {};
      if (!updating_inner && dirty & 1) {
        updating_inner = true;
        input_changes.inner = ctx2[0];
        add_flush_callback(() => updating_inner = false);
      }
      if (!updating_value && dirty & 2) {
        updating_value = true;
        input_changes.value = ctx2[1];
        add_flush_callback(() => updating_value = false);
      }
      input.$set(input_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(label.$$.fragment, local);
      transition_in(input.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(label.$$.fragment, local);
      transition_out(input.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(label, detaching);
      if (detaching)
        detach(t);
      destroy_component(input, detaching);
    }
  };
}
function create_fragment3(ctx) {
  let formgroup;
  let current;
  formgroup = new FormGroup({
    props: {
      $$slots: {default: [create_default_slot3]},
      $$scope: {ctx}
    }
  });
  return {
    c() {
      create_component(formgroup.$$.fragment);
    },
    m(target, anchor) {
      mount_component(formgroup, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const formgroup_changes = {};
      if (dirty & 35) {
        formgroup_changes.$$scope = {dirty, ctx: ctx2};
      }
      formgroup.$set(formgroup_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(formgroup.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(formgroup.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(formgroup, detaching);
    }
  };
}
function instance3($$self, $$props, $$invalidate) {
  let $abstract;
  component_subscribe($$self, abstract, ($$value) => $$invalidate(1, $abstract = $$value));
  let inner;
  const resize = () => {
    $$invalidate(0, inner.style.height = "auto", inner);
    $$invalidate(0, inner.style.height = 4 + inner.scrollHeight + "px", inner);
  };
  function input_inner_binding(value) {
    inner = value;
    $$invalidate(0, inner);
  }
  function input_value_binding(value) {
    $abstract = value;
    abstract.set($abstract);
  }
  return [inner, $abstract, resize, input_inner_binding, input_value_binding];
}
var Abstract = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance3, create_fragment3, safe_not_equal, {});
  }
};
var Abstract_svelte_default = Abstract;

// docs/dist/components/Keywords.svelte.js
function get_each_context3(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[1] = list[i];
  child_ctx[7] = i;
  return child_ctx;
}
function create_default_slot_72(ctx) {
  let t;
  return {
    c() {
      t = text("Keywords");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_62(ctx) {
  let input;
  let updating_value;
  let current;
  function input_value_binding(value) {
    ctx[4](value);
  }
  let input_props = {type: "text", placeholder: "Name"};
  if (ctx[1] !== void 0) {
    input_props.value = ctx[1];
  }
  input = new Input({props: input_props});
  binding_callbacks.push(() => bind(input, "value", input_value_binding));
  return {
    c() {
      create_component(input.$$.fragment);
    },
    m(target, anchor) {
      mount_component(input, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const input_changes = {};
      if (!updating_value && dirty & 2) {
        updating_value = true;
        input_changes.value = ctx2[1];
        add_flush_callback(() => updating_value = false);
      }
      input.$set(input_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(input.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(input.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(input, detaching);
    }
  };
}
function create_default_slot_52(ctx) {
  let t;
  return {
    c() {
      t = text("Add");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_42(ctx) {
  let button;
  let current;
  button = new Button({
    props: {
      $$slots: {default: [create_default_slot_52]},
      $$scope: {ctx}
    }
  });
  button.$on("click", ctx[2]);
  return {
    c() {
      create_component(button.$$.fragment);
    },
    m(target, anchor) {
      mount_component(button, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const button_changes = {};
      if (dirty & 256) {
        button_changes.$$scope = {dirty, ctx: ctx2};
      }
      button.$set(button_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(button.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(button, detaching);
    }
  };
}
function create_default_slot_33(ctx) {
  let col0;
  let t;
  let col1;
  let current;
  col0 = new Col({
    props: {
      class: "col-5",
      $$slots: {default: [create_default_slot_62]},
      $$scope: {ctx}
    }
  });
  col1 = new Col({
    props: {
      class: "col-1",
      $$slots: {default: [create_default_slot_42]},
      $$scope: {ctx}
    }
  });
  return {
    c() {
      create_component(col0.$$.fragment);
      t = space();
      create_component(col1.$$.fragment);
    },
    m(target, anchor) {
      mount_component(col0, target, anchor);
      insert(target, t, anchor);
      mount_component(col1, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const col0_changes = {};
      if (dirty & 258) {
        col0_changes.$$scope = {dirty, ctx: ctx2};
      }
      col0.$set(col0_changes);
      const col1_changes = {};
      if (dirty & 256) {
        col1_changes.$$scope = {dirty, ctx: ctx2};
      }
      col1.$set(col1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(col0.$$.fragment, local);
      transition_in(col1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(col0.$$.fragment, local);
      transition_out(col1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(col0, detaching);
      if (detaching)
        detach(t);
      destroy_component(col1, detaching);
    }
  };
}
function create_default_slot_23(ctx) {
  let label;
  let t;
  let row;
  let current;
  label = new Label({
    props: {
      $$slots: {default: [create_default_slot_72]},
      $$scope: {ctx}
    }
  });
  row = new Row({
    props: {
      $$slots: {default: [create_default_slot_33]},
      $$scope: {ctx}
    }
  });
  return {
    c() {
      create_component(label.$$.fragment);
      t = space();
      create_component(row.$$.fragment);
    },
    m(target, anchor) {
      mount_component(label, target, anchor);
      insert(target, t, anchor);
      mount_component(row, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const label_changes = {};
      if (dirty & 256) {
        label_changes.$$scope = {dirty, ctx: ctx2};
      }
      label.$set(label_changes);
      const row_changes = {};
      if (dirty & 258) {
        row_changes.$$scope = {dirty, ctx: ctx2};
      }
      row.$set(row_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(label.$$.fragment, local);
      transition_in(row.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(label.$$.fragment, local);
      transition_out(row.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(label, detaching);
      if (detaching)
        detach(t);
      destroy_component(row, detaching);
    }
  };
}
function create_default_slot_14(ctx) {
  let t;
  return {
    c() {
      t = text("Remove");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_each_block3(ctx) {
  let tr;
  let td0;
  let t0_value = ctx[1] + "";
  let t0;
  let t1;
  let td1;
  let button;
  let t2;
  let current;
  function click_handler() {
    return ctx[5](ctx[7]);
  }
  button = new Button({
    props: {
      size: "sm",
      $$slots: {default: [create_default_slot_14]},
      $$scope: {ctx}
    }
  });
  button.$on("click", click_handler);
  return {
    c() {
      tr = element("tr");
      td0 = element("td");
      t0 = text(t0_value);
      t1 = space();
      td1 = element("td");
      create_component(button.$$.fragment);
      t2 = space();
    },
    m(target, anchor) {
      insert(target, tr, anchor);
      append(tr, td0);
      append(td0, t0);
      append(tr, t1);
      append(tr, td1);
      mount_component(button, td1, null);
      append(tr, t2);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if ((!current || dirty & 1) && t0_value !== (t0_value = ctx[1] + ""))
        set_data(t0, t0_value);
      const button_changes = {};
      if (dirty & 256) {
        button_changes.$$scope = {dirty, ctx};
      }
      button.$set(button_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(button.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(tr);
      destroy_component(button);
    }
  };
}
function create_default_slot4(ctx) {
  let thead;
  let t3;
  let tbody;
  let current;
  let each_value = ctx[0];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block3(get_each_context3(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      thead = element("thead");
      thead.innerHTML = `<tr><th>Keyword</th> 
			<th>Actions</th></tr>`;
      t3 = space();
      tbody = element("tbody");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
    },
    m(target, anchor) {
      insert(target, thead, anchor);
      insert(target, t3, anchor);
      insert(target, tbody, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(tbody, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & 9) {
        each_value = ctx2[0];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context3(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block3(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(tbody, null);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(thead);
      if (detaching)
        detach(t3);
      if (detaching)
        detach(tbody);
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_fragment4(ctx) {
  let formgroup;
  let t;
  let table;
  let current;
  formgroup = new FormGroup({
    props: {
      $$slots: {default: [create_default_slot_23]},
      $$scope: {ctx}
    }
  });
  table = new Table({
    props: {
      bordered: true,
      striped: true,
      size: "sm",
      $$slots: {default: [create_default_slot4]},
      $$scope: {ctx}
    }
  });
  return {
    c() {
      create_component(formgroup.$$.fragment);
      t = space();
      create_component(table.$$.fragment);
    },
    m(target, anchor) {
      mount_component(formgroup, target, anchor);
      insert(target, t, anchor);
      mount_component(table, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const formgroup_changes = {};
      if (dirty & 258) {
        formgroup_changes.$$scope = {dirty, ctx: ctx2};
      }
      formgroup.$set(formgroup_changes);
      const table_changes = {};
      if (dirty & 257) {
        table_changes.$$scope = {dirty, ctx: ctx2};
      }
      table.$set(table_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(formgroup.$$.fragment, local);
      transition_in(table.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(formgroup.$$.fragment, local);
      transition_out(table.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(formgroup, detaching);
      if (detaching)
        detach(t);
      destroy_component(table, detaching);
    }
  };
}
function instance4($$self, $$props, $$invalidate) {
  let $keywords;
  component_subscribe($$self, keywords, ($$value) => $$invalidate(0, $keywords = $$value));
  let keyword = "";
  const addKeyword = () => {
    keywords.update((value) => {
      value.push(keyword);
      return value;
    });
    $$invalidate(1, keyword = "");
  };
  const removeKeyword = (idx) => {
    keywords.update((value) => {
      value.splice(idx, 1);
      return value;
    });
  };
  function input_value_binding(value) {
    keyword = value;
    $$invalidate(1, keyword);
  }
  const click_handler = (i) => removeKeyword(i);
  return [
    $keywords,
    keyword,
    addKeyword,
    removeKeyword,
    input_value_binding,
    click_handler
  ];
}
var Keywords = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance4, create_fragment4, safe_not_equal, {});
  }
};
var Keywords_svelte_default = Keywords;

// docs/dist/components/Summary.svelte.js
function create_default_slot_34(ctx) {
  let t;
  return {
    c() {
      t = text("Title");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_24(ctx) {
  let label;
  let t;
  let input;
  let updating_value;
  let current;
  label = new Label({
    props: {
      $$slots: {default: [create_default_slot_34]},
      $$scope: {ctx}
    }
  });
  function input_value_binding(value) {
    ctx[2](value);
  }
  let input_props = {type: "text"};
  if (ctx[0] !== void 0) {
    input_props.value = ctx[0];
  }
  input = new Input({props: input_props});
  binding_callbacks.push(() => bind(input, "value", input_value_binding));
  return {
    c() {
      create_component(label.$$.fragment);
      t = space();
      create_component(input.$$.fragment);
    },
    m(target, anchor) {
      mount_component(label, target, anchor);
      insert(target, t, anchor);
      mount_component(input, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const label_changes = {};
      if (dirty & 16) {
        label_changes.$$scope = {dirty, ctx: ctx2};
      }
      label.$set(label_changes);
      const input_changes = {};
      if (!updating_value && dirty & 1) {
        updating_value = true;
        input_changes.value = ctx2[0];
        add_flush_callback(() => updating_value = false);
      }
      input.$set(input_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(label.$$.fragment, local);
      transition_in(input.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(label.$$.fragment, local);
      transition_out(input.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(label, detaching);
      if (detaching)
        detach(t);
      destroy_component(input, detaching);
    }
  };
}
function create_default_slot_15(ctx) {
  let t;
  return {
    c() {
      t = text("Publication");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot5(ctx) {
  let label;
  let t;
  let input;
  let updating_value;
  let current;
  label = new Label({
    props: {
      $$slots: {default: [create_default_slot_15]},
      $$scope: {ctx}
    }
  });
  function input_value_binding_1(value) {
    ctx[3](value);
  }
  let input_props = {type: "text"};
  if (ctx[1] !== void 0) {
    input_props.value = ctx[1];
  }
  input = new Input({props: input_props});
  binding_callbacks.push(() => bind(input, "value", input_value_binding_1));
  return {
    c() {
      create_component(label.$$.fragment);
      t = space();
      create_component(input.$$.fragment);
    },
    m(target, anchor) {
      mount_component(label, target, anchor);
      insert(target, t, anchor);
      mount_component(input, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const label_changes = {};
      if (dirty & 16) {
        label_changes.$$scope = {dirty, ctx: ctx2};
      }
      label.$set(label_changes);
      const input_changes = {};
      if (!updating_value && dirty & 2) {
        updating_value = true;
        input_changes.value = ctx2[1];
        add_flush_callback(() => updating_value = false);
      }
      input.$set(input_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(label.$$.fragment, local);
      transition_in(input.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(label.$$.fragment, local);
      transition_out(input.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(label, detaching);
      if (detaching)
        detach(t);
      destroy_component(input, detaching);
    }
  };
}
function create_fragment5(ctx) {
  let formgroup0;
  let t0;
  let formgroup1;
  let t1;
  let authors2;
  let t2;
  let abstract2;
  let t3;
  let keywords2;
  let current;
  formgroup0 = new FormGroup({
    props: {
      $$slots: {default: [create_default_slot_24]},
      $$scope: {ctx}
    }
  });
  formgroup1 = new FormGroup({
    props: {
      $$slots: {default: [create_default_slot5]},
      $$scope: {ctx}
    }
  });
  authors2 = new Authors_svelte_default({});
  abstract2 = new Abstract_svelte_default({});
  keywords2 = new Keywords_svelte_default({});
  return {
    c() {
      create_component(formgroup0.$$.fragment);
      t0 = space();
      create_component(formgroup1.$$.fragment);
      t1 = space();
      create_component(authors2.$$.fragment);
      t2 = space();
      create_component(abstract2.$$.fragment);
      t3 = space();
      create_component(keywords2.$$.fragment);
    },
    m(target, anchor) {
      mount_component(formgroup0, target, anchor);
      insert(target, t0, anchor);
      mount_component(formgroup1, target, anchor);
      insert(target, t1, anchor);
      mount_component(authors2, target, anchor);
      insert(target, t2, anchor);
      mount_component(abstract2, target, anchor);
      insert(target, t3, anchor);
      mount_component(keywords2, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const formgroup0_changes = {};
      if (dirty & 17) {
        formgroup0_changes.$$scope = {dirty, ctx: ctx2};
      }
      formgroup0.$set(formgroup0_changes);
      const formgroup1_changes = {};
      if (dirty & 18) {
        formgroup1_changes.$$scope = {dirty, ctx: ctx2};
      }
      formgroup1.$set(formgroup1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(formgroup0.$$.fragment, local);
      transition_in(formgroup1.$$.fragment, local);
      transition_in(authors2.$$.fragment, local);
      transition_in(abstract2.$$.fragment, local);
      transition_in(keywords2.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(formgroup0.$$.fragment, local);
      transition_out(formgroup1.$$.fragment, local);
      transition_out(authors2.$$.fragment, local);
      transition_out(abstract2.$$.fragment, local);
      transition_out(keywords2.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(formgroup0, detaching);
      if (detaching)
        detach(t0);
      destroy_component(formgroup1, detaching);
      if (detaching)
        detach(t1);
      destroy_component(authors2, detaching);
      if (detaching)
        detach(t2);
      destroy_component(abstract2, detaching);
      if (detaching)
        detach(t3);
      destroy_component(keywords2, detaching);
    }
  };
}
function instance5($$self, $$props, $$invalidate) {
  let $title;
  let $publication;
  component_subscribe($$self, title, ($$value) => $$invalidate(0, $title = $$value));
  component_subscribe($$self, publication, ($$value) => $$invalidate(1, $publication = $$value));
  function input_value_binding(value) {
    $title = value;
    title.set($title);
  }
  function input_value_binding_1(value) {
    $publication = value;
    publication.set($publication);
  }
  return [$title, $publication, input_value_binding, input_value_binding_1];
}
var Summary = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance5, create_fragment5, safe_not_equal, {});
  }
};
var Summary_svelte_default = Summary;

// docs/dist/ts/template.js
var template = `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta
			name="viewport"
			content="width=device-width, initial-scale=1, shrink-to-fit=no"
		/>
		<meta name="description" content="Research for the Web">
		<title>{{title}}</title>
		<style>
			* {
				/* font-family: Helvetica, sans-serif; */
				font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
				margin: 0 0;
				padding: 0 0;
			}
			
			p {
				margin-bottom: 1em;
				/* text-indent: 1em; */
				line-height: 1.4em;
				text-align: justify;
			}

			ul, ol {
				margin-bottom: 1em;
			}

			li {
				list-style-position: inside;
				font-size: 1em;
				line-height: 1.4em;
			} 
			
			body {
				max-width: 650px;
				margin: 0 auto;
				margin-bottom: 50px;
				padding-left: 10px;
				padding-right: 10px;
			}
			
			.created-by {
				margin-top: 0px;
				margin-bottom: 0px;
				text-align: left;
				font-size: 0.8em;
				color: rgb(169, 169, 169);
				font-family: Helvetica, sans-serif;
			}
			
			.published-in, .created-by {
				color: rgb(169, 169, 169);
				font-size: 0.8em;
				text-indent: 0em !important;
				font-family: Helvetica, sans-serif;
				margin-top: 0px;
				margin-bottom: 0px;
			}
			
			.title {
				margin-bottom: 25px;
				margin-top: 25px;
			}
			
			.authors,
			.keywords-list {
				list-style: none;
				padding-left: 0;
				margin-bottom: 25px;
				font-size: 0.9em;
			}
			
			.keywords-list li {
				display: inline;
				text-decoration: none;
				padding-right: 10px;
			}
			
			.abstract,
			.keywords {
				margin-bottom: 5px;
			}
			
			h1,
			h2,
			h3,
			h4 {
				margin-bottom: 20px;
				margin-top: 20px;
			}

			h1, h2, h3 {
				font-size: 1.4em;
			}
			
			a {
				text-decoration: none;
				color: rgb(51, 102, 187);
			}

			a:hover {
				text-decoration: underline;
			}
			
			figure {
				text-align: center;
			}
			
			figcaption,
			.paper-media-caption,
			caption {
				font-size: 0.9em;
				text-align: center;
				margin-top: 5px;
				margin-bottom: 10px;
			}
			
			/*
			.paper-equation {
				text-align: center;
				float: left;
				width: 95%;
				font-size: 1.2em;
			}
			
			.paper-equation-caption {
				text-align: right;
				font-size: 1em;
				width: 4%;
				float: right;
			}
			*/
			
			img {
				max-width: 90%;
				max-height: 300px;
			}
			
			video {
				width: 100%;
			}
			
			audio {
				width: 100%;
			}
			
			.paper-data {
				text-align: center;
			}
			
			.paper-display-equation {
				width: 100%;
				margin-bottom: 10px;
			}
			.paper-equation {
				width: 95% !important;
			}
			.paper-equation-label {
				width: 5%;
			}
			
			/*
			table {
				margin: 0 auto;
				margin-bottom: 10px;
				max-width: 100%;
				border-top: 2px solid black;
				border-bottom: 2px solid black;
				border-collapse: collapse;
			}
			*/
			
			th {
				border-bottom: 1px solid black;
			}
			
			th,
			td {
				padding: 2px;
			}
			
			.citations {
				list-style-position: inside;
				font-size: 1em;
			}

			.MathJax {
				font-size: 1em !important;
			}
		</style>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.0.7/dist/css/splide.min.css"></link>
		<style>
			.splide__slide {
				text-align: center;
			}
			.splide__slide img {
				width: auto;
				height: 400px;
			}
		</style>
	</head>
	<body>
		<p class="published-in">{{publication}}</p>
		<p class="created-by">
			Created using
			<a href="http://jamesgopsill.github.io/manu-script">ManuScript</a>
		</p>
		<h1 class="title">{{title}}</h1>

		<ul class="authors">
			{{authors}}
		</ul>

		<h4 class="abstract">Abstract</h4>

		{{abstract}}

		<h4 class="keywords">Keywords</h4>

		<ul class="keywords-list">
			{{keywords}}
		</ul>

		{{content}}

		<h4 class="references">References</h4>

		<ol class="citations">
			{{citations}}
		</ol>

		<script>
			MathJax = {
				tex: {
					inlineMath: [['$', '$']]
				}
			};
		</script>
		<script
			id="MathJax-script"
			async
			src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"
		>
		</script>
		<script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.0.7/dist/js/splide.min.js"></script>
		<script>
			const carousels = document.getElementsByClassName("splide")
			for (const c of carousels) {
				const options = {
					pagination: false
				}
				new Splide(c, options).mount()
			}
		</script>
	</body>
</html>
`;

// docs/dist/ts/manuscript-parser-fcns.js
var removeTags = (tag, s) => {
  s = s.replace(`<${tag}>`, "");
  s = s.replace(`</${tag}>`, "");
  s = s.trim();
  return s;
};
var replaceWithHTMLEntities = (s) => {
  s = s.replaceAll("&", "&amp;");
  s = s.replaceAll("''", "&rdquo;");
  s = s.replaceAll("``", "&ldquo;");
  s = s.replaceAll("'", "&rsquo;");
  s = s.replaceAll("`", "&lsquo;");
  return s;
};
var processTitle = (title2) => {
  let html = title2.trim();
  html = replaceWithHTMLEntities(html);
  return html;
};
var processPublication = (publication2) => {
  let html = publication2.trim();
  html = replaceWithHTMLEntities(html);
  return html;
};
var processAuthors = (authors2) => {
  let html = "";
  for (const author of authors2) {
    if (author.orcid) {
      html += `<li>${author.name} [<a href="https://orcid.org/${author.orcid}">${author.orcid}</a>]</li>`;
    } else {
      html += `<li>${author.name}</li>`;
    }
  }
  return html;
};
var processReferences = (references2) => {
  let html = "";
  for (const [_, v] of Object.entries(references2)) {
    if (v.length < 50) {
      html += `<li><a href="${v}">${v}</a></li>`;
    } else {
      html += `<li><a href="${v}">${v.substring(0, 50) + "..."}</a></li>`;
    }
  }
  return html;
};
var processKeywords = (keywords2) => {
  let html = "";
  for (const k of keywords2) {
    html += `<li>${k}</li>`;
  }
  return html;
};
var processAbstract = (abstract2) => {
  let html = "";
  let lines = abstract2.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (line && /^[a-z0-9]+$/i.test(line[0])) {
      html += `<p>${line}</p>`;
    }
  }
  html = replaceWithHTMLEntities(html);
  return html;
};
var processContent = (content2, media2, references2) => {
  content2 = processHeadings(content2);
  content2 = processCitations(content2, references2);
  content2 = processFigures(content2, media2);
  content2 = processTables(content2, media2);
  content2 = processSlideshows(content2, media2);
  content2 = processVideos(content2, media2);
  content2 = processDatasets(content2, media2);
  content2 = processEquations(content2);
  content2 = processCode(content2);
  content2 = content2.replaceAll("\r", "");
  let lines = content2.split("\n");
  for (var i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (line && /^[a-z0-9]+$/i.test(line[0])) {
      line = replaceWithHTMLEntities(line);
      content2 = content2.replace(lines[i], `<p>${line}</p>`);
    }
  }
  return content2;
};
var processHeadings = (s) => {
  let headings = s.match(/(<Section>|<SubSection>|<SubSubSection>)([\s\S]*?)(<\/Section>|<\/SubSection>|<\/SubSubSection>)/gm);
  let h1Increment = 0;
  let h2Increment = 0;
  let h3Increment = 0;
  if (!headings) {
    return s;
  }
  for (let i = 0; i < headings.length; i++) {
    let heading = headings[i];
    let newHeading = "";
    if (heading.indexOf("<Section>") === 0) {
      h1Increment++;
      h2Increment = 0;
      h3Increment = 0;
      newHeading += "<h1>";
      newHeading += h1Increment + ". ";
      newHeading += removeTags("Section", heading);
      newHeading += "</h1>";
    }
    if (heading.indexOf("<SubSection>") === 0) {
      h2Increment++;
      h3Increment = 0;
      newHeading += "<h2>";
      newHeading += h1Increment + "." + h2Increment + ". ";
      newHeading += removeTags("SubSection", heading);
      newHeading += "</h2>";
    }
    if (heading.indexOf("<SubSubSection>") === 0) {
      h3Increment++;
      newHeading += "<h3>";
      newHeading += h1Increment + "." + h2Increment + "." + h3Increment + ". ";
      newHeading += removeTags("SubSubSection", heading);
      newHeading += "</h3>";
    }
    newHeading = replaceWithHTMLEntities(newHeading);
    s = s.replace(heading, newHeading);
  }
  return s;
};
var processCitations = (c, references2) => {
  let n = 0;
  for (const [k, v] of Object.entries(references2)) {
    n++;
    c = c.replaceAll(k, `<a href="${v}">${n}</a>`);
  }
  c = c.replaceAll("<Cite>", "[");
  c = c.replaceAll("</Cite>", "]");
  return c;
};
var processFigures = (s, fileData) => {
  let figures = s.match(/(<Figure>)([\s\S]*?)(<\/Figure>)/gm);
  if (!figures) {
    return s;
  }
  let n = 0;
  for (let figXML of figures) {
    n++;
    let figReplacementXML = "<Figure>";
    let figMatches = figXML.match(/<Key>([\s\S]*?)<\/Key>/m);
    if (figMatches) {
      let figFile = figMatches[1];
      figFile = figFile.trim();
      if (fileData[figFile]) {
        figReplacementXML += `<img class="paper-img" src="${fileData[figFile]}" />`;
      } else {
        figReplacementXML += "NO IMAGE FOUND";
      }
    }
    let captionMatches = figXML.match(/<Caption>([\s\S]*?)<\/Caption>/m);
    let caption = "";
    if (captionMatches != null) {
      caption = captionMatches[1];
      caption = caption.trim();
    } else {
      caption = "No Caption Detected";
    }
    figReplacementXML += `<figcaption><strong>Figure ${n}.</strong> ${caption}</figcaption>`;
    figReplacementXML += "</figure>";
    s = s.replace(figXML, figReplacementXML);
    let labelMatch = figXML.match(/<Label>([\s\S]*?)<\/Label>/m);
    if (labelMatch) {
      let label = labelMatch[1];
      label = label.trim();
      if (label) {
        s = s.replaceAll(label, n.toString());
      }
    }
  }
  return s;
};
var processTables = (s, fileData) => {
  const tables = s.match(/(<Table>)([\s\S]*?)(<\/Table>)/gm);
  if (!tables) {
    return s;
  }
  let n = 0;
  for (const table of tables) {
    n++;
    let tableHTML = "<figure>";
    let captionMatches = table.match(/<Caption>([\s\S]*?)<\/Caption>/m);
    let caption = "";
    if (captionMatches != null) {
      caption = captionMatches[1];
      caption = caption.trim();
      tableHTML += `<figcaption><strong>Table ${n}:</strong> ${caption}</figcaption>`;
    } else {
      tableHTML += `<p class="paper-alert"><b>Warning:</b>No Caption Detected</p>`;
    }
    const keys = table.match(/<Key>([\s\S]*?)<\/Key>/m);
    if (keys) {
      let k = keys[1];
      k = k.trim();
      if (fileData[k]) {
        tableHTML += `<img class="paper-img" src="${fileData[k]}" />`;
      } else {
        tableHTML += `<p class="paper-alert"><b>Warning:</b> No image of table could be found.</p>`;
      }
    } else {
      tableHTML += `<p class="paper-alert"><b>Warning:</b> <Key> element could not be found</p>`;
    }
    tableHTML += `</figure>`;
    s = s.replace(table, tableHTML);
    let labelMatch = table.match(/<Label>([\s\S]*?)<\/Label>/m);
    if (labelMatch) {
      let label = labelMatch[1];
      label = label.trim();
      if (label) {
        s = s.replaceAll(label, n.toString());
      }
    }
  }
  return s;
};
var processSlideshows = (s, files) => {
  const slideshows = s.match(/(<Slideshow>)([\s\S]*?)(<\/Slideshow>)/gm);
  if (!slideshows) {
    return s;
  }
  let n = 0;
  for (const slideshow of slideshows) {
    n++;
    let replacementHTML = `
			<section class="splide">
			<div class="splide__track">
			<ul class="splide__list">`;
    const slides = s.match(/(<Slide>)([\s\S]*?)(<\/Slide>)/gm);
    const abc = "abcdefghijklmnopqrstuvwxyz";
    let m = -1;
    for (const slide of slides) {
      m++;
      replacementHTML += '<li class="splide__slide">';
      let key = slide.match(/<Key>([\s\S]*?)<\/Key>/m);
      if (key) {
        let k = key[1];
        k = k.trim();
        if (files[k]) {
          replacementHTML += `<img src="${files[k]}" />`;
        }
      }
      let caption2 = slide.match(/<Caption>([\s\S]*?)<\/Caption>/m);
      if (caption2) {
        let c = caption2[1];
        c = c.trim();
        if (c) {
          replacementHTML += `<div class="paper-media-caption">(${abc[m]}) ${c}</div>`;
        }
      }
      replacementHTML += "</li>";
    }
    let captionMatches = slideshow.match(/<Caption>([\s\S]*?)<\/Caption>/gm);
    let caption = "";
    console.log(captionMatches);
    if (captionMatches != null) {
      caption = captionMatches[captionMatches.length - 1];
      caption = caption.trim();
    } else {
      caption = "No Caption Detected";
    }
    replacementHTML += `
			</ul>
			</div>
			</section>
			<p class="paper-media-caption"><strong>Slideshow ${n}.</strong> ${caption}</p>
			`;
    s = s.replace(slideshow, replacementHTML);
    let labelMatch = slideshow.match(/<Label>([\s\S]*?)<\/Label>/m);
    if (labelMatch) {
      let label = labelMatch[1];
      label = label.trim();
      if (label) {
        s = s.replaceAll(label, n.toString());
      }
    }
  }
  return s;
};
var processVideos = (s, files) => {
  const videos = s.match(/(<Video>)([\s\S]*?)(<\/Video>)/gm);
  if (!videos) {
    return s;
  }
  let n = 0;
  for (const video of videos) {
    n++;
    let videoHTML = "<div>";
    let key = video.match(/<Key>([\s\S]*?)<\/Key>/m);
    if (key) {
      let k = key[1];
      k = k.trim();
      if (files[k]) {
        videoHTML += `
					<video controls>
						<source src=${files[k]} type="video/mp4">
					</video>`;
      }
    }
    let captionMatches = video.match(/<Caption>([\s\S]*?)<\/Caption>/m);
    let caption = "";
    if (captionMatches != null) {
      caption = captionMatches[1];
      caption = caption.trim();
    } else {
      caption = "No Caption Detected";
    }
    videoHTML += `<p class="paper-media-caption"><strong>Video ${n}.</strong> ${caption}</p></div>`;
    s = s.replace(video, videoHTML);
    let labelMatch = video.match(/<Label>([\s\S]*?)<\/Label>/m);
    if (labelMatch) {
      let label = labelMatch[1];
      label = label.trim();
      if (label) {
        s = s.replaceAll(label, n.toString());
      }
    }
  }
  return s;
};
var processDatasets = (s, files) => {
  const datasets = s.match(/(<Dataset>)([\s\S]*?)(<\/Dataset>)/gm);
  if (!datasets) {
    return s;
  }
  let n = 0;
  for (const dataset of datasets) {
    n++;
    let datasetHTML = "";
    let key = dataset.match(/<Key>([\s\S]*?)<\/Key>/m);
    if (key) {
      let k = key[1];
      k = k.trim();
      if (files[k]) {
        datasetHTML += `<p class="paper-data"><a href="${files[k]}"  download="dataset" >Download Data File</a></p>`;
      } else {
        datasetHTML += `<p class="paper-alert"><b>Warning:</b> Data file could not be found</p>`;
      }
    } else {
      datasetHTML += `<p class="paper-alert"><b>Warning:</b> <Key> element could not be found</p>`;
    }
    let captionMatches = dataset.match(/<Caption>([\s\S]*?)<\/Caption>/m);
    let caption = "";
    if (captionMatches != null) {
      caption = captionMatches[1];
      caption = caption.trim();
    } else {
      caption = `<p class="paper-alert"><b>Warning:</b>No Caption Detected</p>`;
    }
    datasetHTML += `<p class="paper-media-caption"><strong>Video ${n}.</strong> ${caption}</p></div>`;
    s = s.replace(dataset, datasetHTML);
    let labelMatch = dataset.match(/<Label>([\s\S]*?)<\/Label>/m);
    if (labelMatch) {
      let label = labelMatch[1];
      label = label.trim();
      if (label) {
        s = s.replaceAll(label, n.toString());
      }
    }
  }
  return s;
};
var processEquations = (s) => {
  let tokens = s.match(/<Equation>([\s\S]*?)<\/Equation>/g);
  if (tokens != null) {
    for (let i = 0; i < tokens.length; i++) {
      let maths = removeTags("Equation", tokens[i]);
      let label = maths.match(/<Label>([\s\S]*?)<\/Label>/m);
      if (label != null) {
        maths = maths.replace(label[0], "");
      }
      s = s.replace(tokens[i], `<table class="paper-display-equation">
				<tbody class="paper-display-equation">
				<tr>
				<td class="paper-equation">$$${maths}$$</td>
				<td  class="paper-equation-label">(${i + 1})</td>
				</tr>
				</tbody>
				</table>`);
      if (label != null && label[1]) {
        s = s.replaceAll(label[1], (i + 1).toString());
      }
    }
  }
  return s;
};
var processCode = (s) => {
  let tokens = s.match(/<Code>([\s\S]*?)<\/Code>/g);
  if (tokens != null) {
    for (let i = 0; i < tokens.length; i++) {
      let code = removeTags("Code", tokens[i]);
      s = s.replace(tokens[i], `<pre>${code}</pre>`);
    }
  }
  return s;
};

// docs/dist/components/Preview.svelte.js
function create_default_slot6(ctx) {
  let t;
  return {
    c() {
      t = text("Download");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_fragment6(ctx) {
  let div;
  let button;
  let t;
  let iframe;
  let current;
  let mounted;
  let dispose;
  button = new Button({
    props: {
      size: "sm",
      $$slots: {default: [create_default_slot6]},
      $$scope: {ctx}
    }
  });
  button.$on("click", ctx[1]);
  return {
    c() {
      div = element("div");
      create_component(button.$$.fragment);
      t = space();
      iframe = element("iframe");
      attr(div, "class", "text-center mb-2");
      attr(iframe, "id", "iframe");
      attr(iframe, "class", "preview svelte-12aupns");
      attr(iframe, "title", "preview");
      attr(iframe, "srcdoc", ctx[0]);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(button, div, null);
      insert(target, t, anchor);
      insert(target, iframe, anchor);
      current = true;
      if (!mounted) {
        dispose = listen(iframe, "load", ctx[2]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      const button_changes = {};
      if (dirty & 32768) {
        button_changes.$$scope = {dirty, ctx: ctx2};
      }
      button.$set(button_changes);
      if (!current || dirty & 1) {
        attr(iframe, "srcdoc", ctx2[0]);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(button.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_component(button);
      if (detaching)
        detach(t);
      if (detaching)
        detach(iframe);
      mounted = false;
      dispose();
    }
  };
}
function instance6($$self, $$props, $$invalidate) {
  let $contentScrollPosition;
  let $keywords;
  let $references;
  let $media;
  let $content;
  let $publication;
  let $authors;
  let $abstract;
  let $title;
  component_subscribe($$self, contentScrollPosition, ($$value) => $$invalidate(3, $contentScrollPosition = $$value));
  component_subscribe($$self, keywords, ($$value) => $$invalidate(4, $keywords = $$value));
  component_subscribe($$self, references, ($$value) => $$invalidate(5, $references = $$value));
  component_subscribe($$self, media, ($$value) => $$invalidate(6, $media = $$value));
  component_subscribe($$self, content, ($$value) => $$invalidate(7, $content = $$value));
  component_subscribe($$self, publication, ($$value) => $$invalidate(8, $publication = $$value));
  component_subscribe($$self, authors, ($$value) => $$invalidate(9, $authors = $$value));
  component_subscribe($$self, abstract, ($$value) => $$invalidate(10, $abstract = $$value));
  component_subscribe($$self, title, ($$value) => $$invalidate(11, $title = $$value));
  let html = "";
  let refresh;
  const downloadHTML = async () => {
    const newFileHandle = await window.showSaveFilePicker({
      types: [
        {
          description: "ManuScript HTML",
          accept: {"text/plain": [".html"]}
        }
      ]
    });
    if (newFileHandle) {
      const writable2 = await newFileHandle.createWritable();
      await writable2.write(html);
      await writable2.close();
    }
  };
  const compile = async () => {
    console.log("hello");
    $$invalidate(0, html = (" " + template).slice(1));
    $$invalidate(0, html = html.replaceAll("{{title}}", processTitle($title)));
    $$invalidate(0, html = html.replaceAll("{{authors}}", processAuthors($authors)));
    $$invalidate(0, html = html.replace("{{publication}}", processPublication($publication)));
    $$invalidate(0, html = html.replace("{{keywords}}", processKeywords($keywords)));
    $$invalidate(0, html = html.replace("{{abstract}}", processAbstract($abstract)));
    $$invalidate(0, html = html.replace("{{content}}", processContent($content, $media, $references)));
    $$invalidate(0, html = html.replace("{{citations}}", processReferences($references)));
  };
  const setCompileTimer = () => {
    if (refresh == void 0) {
      refresh = setTimeout(() => {
        console.log("Timeout");
        compile();
        refresh = void 0;
      }, 2e3);
    } else {
      clearTimeout(refresh);
      refresh = setTimeout(() => {
        console.log("Timeout");
        compile();
        refresh = void 0;
      }, 2e3);
    }
  };
  const scrollInView = () => {
    const iframe = document.getElementById("iframe");
    if (iframe && iframe.contentWindow.document.body.offsetHeight) {
      const pos = $contentScrollPosition * iframe.contentWindow.document.body.offsetHeight;
      iframe.contentWindow.scrollTo(0, pos);
    }
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 4080) {
      $: {
        $title;
        $abstract;
        $authors;
        $publication;
        $content;
        $media;
        $references;
        $keywords;
        setCompileTimer();
      }
    }
    if ($$self.$$.dirty & 8) {
      $: {
        $contentScrollPosition;
        scrollInView();
      }
    }
  };
  return [
    html,
    downloadHTML,
    scrollInView,
    $contentScrollPosition,
    $keywords,
    $references,
    $media,
    $content,
    $publication,
    $authors,
    $abstract,
    $title
  ];
}
var Preview = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance6, create_fragment6, safe_not_equal, {});
  }
};
var Preview_svelte_default = Preview;

// docs/dist/ts/use-viewport.js
var intersectionObserver;
function ensureIntersectionObserver() {
  if (intersectionObserver)
    return;
  intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const eventName = entry.isIntersecting ? "enterViewport" : "exitViewport";
      entry.target.dispatchEvent(new CustomEvent(eventName));
    });
  });
}
function viewport(element2) {
  ensureIntersectionObserver();
  intersectionObserver.observe(element2);
  return {
    destroy() {
      intersectionObserver.unobserve(element2);
    }
  };
}

// docs/dist/components/Content.svelte.js
var {document: document_1, window: window_1} = globals;
function create_fragment7(ctx) {
  let link0;
  let link1;
  let t;
  let div;
  let viewport_action;
  let mounted;
  let dispose;
  add_render_callback(ctx[3]);
  return {
    c() {
      link0 = element("link");
      link1 = element("link");
      t = space();
      div = element("div");
      attr(link0, "rel", "stylesheet");
      attr(link0, "href", "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.3/codemirror.min.css");
      attr(link0, "integrity", "sha512-uf06llspW44/LZpHzHT6qBOIVODjWtv4MxCricRxkzvopAlSWnTf6hpZTFxuuZcuNE9CBQhqE0Seu1CoRk84nQ==");
      attr(link0, "crossorigin", "anonymous");
      attr(link0, "referrerpolicy", "no-referrer");
      attr(link1, "rel", "stylesheet");
      attr(link1, "href", "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.3/theme/idea.min.css");
      attr(link1, "integrity", "sha512-N+NJU9LvDmlEQyb3xDkcXPOR8SDXQGx4kRs9wCi/U6GPfN/FSsfjIzY61Svd8eg4Y1VcbBL1XhuC3VzzQYmcJg==");
      attr(link1, "crossorigin", "anonymous");
      attr(link1, "referrerpolicy", "no-referrer");
      attr(div, "id", "code-editor");
      attr(div, "class", "svelte-vy32du");
    },
    m(target, anchor) {
      append(document_1.head, link0);
      append(document_1.head, link1);
      insert(target, t, anchor);
      insert(target, div, anchor);
      if (!mounted) {
        dispose = [
          listen(window_1, "resize", ctx[3]),
          action_destroyer(viewport_action = viewport.call(null, div)),
          listen(div, "enterViewport", ctx[4])
        ];
        mounted = true;
      }
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      detach(link0);
      detach(link1);
      if (detaching)
        detach(t);
      if (detaching)
        detach(div);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance7($$self, $$props, $$invalidate) {
  let $content;
  component_subscribe($$self, content, ($$value) => $$invalidate(2, $content = $$value));
  let editor = null;
  let innerHeight = window.innerHeight;
  onMount(() => {
    const config = {
      lineNumbers: true,
      theme: "idea",
      mode: "xml",
      lineWrapping: true
    };
    $$invalidate(0, editor = CodeMirror(document.getElementById("code-editor"), config));
    editor.on("changes", () => {
      content.update((value) => editor.getValue());
    });
    editor.on("scroll", (v) => {
      const scrollInfo = editor.getScrollInfo();
      const percent = scrollInfo.top / scrollInfo.height;
      contentScrollPosition.update((v2) => percent);
    });
  });
  function onwindowresize() {
    $$invalidate(1, innerHeight = window_1.innerHeight);
  }
  const enterViewport_handler = () => editor.refresh();
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 7) {
      $: {
        if (editor) {
          if (editor.getValue() != $content) {
            editor.setValue($content);
          }
          editor.setSize(null, innerHeight - 120);
        }
      }
    }
  };
  return [editor, innerHeight, $content, onwindowresize, enterViewport_handler];
}
var Content = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance7, create_fragment7, safe_not_equal, {});
  }
};
var Content_svelte_default = Content;

// docs/dist/components/References.svelte.js
function get_each_context4(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[8] = list[i][0];
  child_ctx[9] = list[i][1];
  return child_ctx;
}
function create_default_slot_73(ctx) {
  let input;
  let updating_value;
  let current;
  function input_value_binding(value) {
    ctx[5](value);
  }
  let input_props = {
    type: "text",
    placeholder: "Citation Key"
  };
  if (ctx[0] !== void 0) {
    input_props.value = ctx[0];
  }
  input = new Input({props: input_props});
  binding_callbacks.push(() => bind(input, "value", input_value_binding));
  return {
    c() {
      create_component(input.$$.fragment);
    },
    m(target, anchor) {
      mount_component(input, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const input_changes = {};
      if (!updating_value && dirty & 1) {
        updating_value = true;
        input_changes.value = ctx2[0];
        add_flush_callback(() => updating_value = false);
      }
      input.$set(input_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(input.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(input.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(input, detaching);
    }
  };
}
function create_default_slot_63(ctx) {
  let input;
  let updating_value;
  let current;
  function input_value_binding_1(value) {
    ctx[6](value);
  }
  let input_props = {type: "text", placeholder: "URL"};
  if (ctx[1] !== void 0) {
    input_props.value = ctx[1];
  }
  input = new Input({props: input_props});
  binding_callbacks.push(() => bind(input, "value", input_value_binding_1));
  return {
    c() {
      create_component(input.$$.fragment);
    },
    m(target, anchor) {
      mount_component(input, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const input_changes = {};
      if (!updating_value && dirty & 2) {
        updating_value = true;
        input_changes.value = ctx2[1];
        add_flush_callback(() => updating_value = false);
      }
      input.$set(input_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(input.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(input.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(input, detaching);
    }
  };
}
function create_default_slot_53(ctx) {
  let t;
  return {
    c() {
      t = text("Add");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_43(ctx) {
  let button;
  let current;
  button = new Button({
    props: {
      $$slots: {default: [create_default_slot_53]},
      $$scope: {ctx}
    }
  });
  button.$on("click", ctx[3]);
  return {
    c() {
      create_component(button.$$.fragment);
    },
    m(target, anchor) {
      mount_component(button, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const button_changes = {};
      if (dirty & 4096) {
        button_changes.$$scope = {dirty, ctx: ctx2};
      }
      button.$set(button_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(button.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(button, detaching);
    }
  };
}
function create_default_slot_35(ctx) {
  let col0;
  let t0;
  let col1;
  let t1;
  let col2;
  let current;
  col0 = new Col({
    props: {
      class: "col-5",
      $$slots: {default: [create_default_slot_73]},
      $$scope: {ctx}
    }
  });
  col1 = new Col({
    props: {
      class: "col-5",
      $$slots: {default: [create_default_slot_63]},
      $$scope: {ctx}
    }
  });
  col2 = new Col({
    props: {
      class: "col-1",
      $$slots: {default: [create_default_slot_43]},
      $$scope: {ctx}
    }
  });
  return {
    c() {
      create_component(col0.$$.fragment);
      t0 = space();
      create_component(col1.$$.fragment);
      t1 = space();
      create_component(col2.$$.fragment);
    },
    m(target, anchor) {
      mount_component(col0, target, anchor);
      insert(target, t0, anchor);
      mount_component(col1, target, anchor);
      insert(target, t1, anchor);
      mount_component(col2, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const col0_changes = {};
      if (dirty & 4097) {
        col0_changes.$$scope = {dirty, ctx: ctx2};
      }
      col0.$set(col0_changes);
      const col1_changes = {};
      if (dirty & 4098) {
        col1_changes.$$scope = {dirty, ctx: ctx2};
      }
      col1.$set(col1_changes);
      const col2_changes = {};
      if (dirty & 4096) {
        col2_changes.$$scope = {dirty, ctx: ctx2};
      }
      col2.$set(col2_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(col0.$$.fragment, local);
      transition_in(col1.$$.fragment, local);
      transition_in(col2.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(col0.$$.fragment, local);
      transition_out(col1.$$.fragment, local);
      transition_out(col2.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(col0, detaching);
      if (detaching)
        detach(t0);
      destroy_component(col1, detaching);
      if (detaching)
        detach(t1);
      destroy_component(col2, detaching);
    }
  };
}
function create_default_slot_25(ctx) {
  let row;
  let current;
  row = new Row({
    props: {
      $$slots: {default: [create_default_slot_35]},
      $$scope: {ctx}
    }
  });
  return {
    c() {
      create_component(row.$$.fragment);
    },
    m(target, anchor) {
      mount_component(row, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const row_changes = {};
      if (dirty & 4099) {
        row_changes.$$scope = {dirty, ctx: ctx2};
      }
      row.$set(row_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(row.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(row.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(row, detaching);
    }
  };
}
function create_else_block2(ctx) {
  let td;
  let a;
  let t_value = ctx[9] + "";
  let t;
  let a_href_value;
  return {
    c() {
      td = element("td");
      a = element("a");
      t = text(t_value);
      attr(a, "href", a_href_value = ctx[9]);
    },
    m(target, anchor) {
      insert(target, td, anchor);
      append(td, a);
      append(a, t);
    },
    p(ctx2, dirty) {
      if (dirty & 4 && t_value !== (t_value = ctx2[9] + ""))
        set_data(t, t_value);
      if (dirty & 4 && a_href_value !== (a_href_value = ctx2[9])) {
        attr(a, "href", a_href_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(td);
    }
  };
}
function create_if_block2(ctx) {
  let td;
  let a;
  let t_value = ctx[9].substring(0, 50) + "...";
  let t;
  let a_href_value;
  return {
    c() {
      td = element("td");
      a = element("a");
      t = text(t_value);
      attr(a, "href", a_href_value = ctx[9]);
    },
    m(target, anchor) {
      insert(target, td, anchor);
      append(td, a);
      append(a, t);
    },
    p(ctx2, dirty) {
      if (dirty & 4 && t_value !== (t_value = ctx2[9].substring(0, 50) + "..."))
        set_data(t, t_value);
      if (dirty & 4 && a_href_value !== (a_href_value = ctx2[9])) {
        attr(a, "href", a_href_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(td);
    }
  };
}
function create_default_slot_16(ctx) {
  let t;
  return {
    c() {
      t = text("Remove");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_each_block4(ctx) {
  let tr;
  let td0;
  let t0_value = ctx[8] + "";
  let t0;
  let t1;
  let t2;
  let td1;
  let button;
  let t3;
  let current;
  function select_block_type(ctx2, dirty) {
    if (ctx2[9].length > 50)
      return create_if_block2;
    return create_else_block2;
  }
  let current_block_type = select_block_type(ctx, -1);
  let if_block = current_block_type(ctx);
  function click_handler() {
    return ctx[7](ctx[8]);
  }
  button = new Button({
    props: {
      size: "sm",
      $$slots: {default: [create_default_slot_16]},
      $$scope: {ctx}
    }
  });
  button.$on("click", click_handler);
  return {
    c() {
      tr = element("tr");
      td0 = element("td");
      t0 = text(t0_value);
      t1 = space();
      if_block.c();
      t2 = space();
      td1 = element("td");
      create_component(button.$$.fragment);
      t3 = space();
    },
    m(target, anchor) {
      insert(target, tr, anchor);
      append(tr, td0);
      append(td0, t0);
      append(tr, t1);
      if_block.m(tr, null);
      append(tr, t2);
      append(tr, td1);
      mount_component(button, td1, null);
      append(tr, t3);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if ((!current || dirty & 4) && t0_value !== (t0_value = ctx[8] + ""))
        set_data(t0, t0_value);
      if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block) {
        if_block.p(ctx, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx);
        if (if_block) {
          if_block.c();
          if_block.m(tr, t2);
        }
      }
      const button_changes = {};
      if (dirty & 4096) {
        button_changes.$$scope = {dirty, ctx};
      }
      button.$set(button_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(button.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(tr);
      if_block.d();
      destroy_component(button);
    }
  };
}
function create_default_slot7(ctx) {
  let thead;
  let t5;
  let tbody;
  let current;
  let each_value = Object.entries(ctx[2]);
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block4(get_each_context4(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      thead = element("thead");
      thead.innerHTML = `<tr><th>Key</th> 
			<th>URL</th> 
			<th>Actions</th></tr>`;
      t5 = space();
      tbody = element("tbody");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
    },
    m(target, anchor) {
      insert(target, thead, anchor);
      insert(target, t5, anchor);
      insert(target, tbody, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(tbody, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & 20) {
        each_value = Object.entries(ctx2[2]);
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context4(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block4(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(tbody, null);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(thead);
      if (detaching)
        detach(t5);
      if (detaching)
        detach(tbody);
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_fragment8(ctx) {
  let formgroup;
  let t;
  let table;
  let current;
  formgroup = new FormGroup({
    props: {
      $$slots: {default: [create_default_slot_25]},
      $$scope: {ctx}
    }
  });
  table = new Table({
    props: {
      bordered: true,
      striped: true,
      size: "sm",
      $$slots: {default: [create_default_slot7]},
      $$scope: {ctx}
    }
  });
  return {
    c() {
      create_component(formgroup.$$.fragment);
      t = space();
      create_component(table.$$.fragment);
    },
    m(target, anchor) {
      mount_component(formgroup, target, anchor);
      insert(target, t, anchor);
      mount_component(table, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const formgroup_changes = {};
      if (dirty & 4099) {
        formgroup_changes.$$scope = {dirty, ctx: ctx2};
      }
      formgroup.$set(formgroup_changes);
      const table_changes = {};
      if (dirty & 4100) {
        table_changes.$$scope = {dirty, ctx: ctx2};
      }
      table.$set(table_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(formgroup.$$.fragment, local);
      transition_in(table.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(formgroup.$$.fragment, local);
      transition_out(table.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(formgroup, detaching);
      if (detaching)
        detach(t);
      destroy_component(table, detaching);
    }
  };
}
function instance8($$self, $$props, $$invalidate) {
  let $references;
  component_subscribe($$self, references, ($$value) => $$invalidate(2, $references = $$value));
  let key = "";
  let url = "";
  const addReference = () => {
    references.update((dict) => {
      dict[key] = url;
      return dict;
    });
    $$invalidate(0, key = "");
    $$invalidate(1, url = "");
  };
  const removeReference = (k) => {
    delete $references[k];
    references.set($references);
  };
  function input_value_binding(value) {
    key = value;
    $$invalidate(0, key);
  }
  function input_value_binding_1(value) {
    url = value;
    $$invalidate(1, url);
  }
  const click_handler = (k) => removeReference(k);
  return [
    key,
    url,
    $references,
    addReference,
    removeReference,
    input_value_binding,
    input_value_binding_1,
    click_handler
  ];
}
var References = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance8, create_fragment8, safe_not_equal, {});
  }
};
var References_svelte_default = References;

// docs/dist/components/Media.svelte.js
function get_each_context5(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[10] = list[i][0];
  child_ctx[11] = list[i][1];
  return child_ctx;
}
function create_default_slot_74(ctx) {
  let input_1;
  let updating_value;
  let current;
  function input_1_value_binding(value) {
    ctx[6](value);
  }
  let input_1_props = {type: "text", placeholder: "Media Key"};
  if (ctx[0] !== void 0) {
    input_1_props.value = ctx[0];
  }
  input_1 = new Input({props: input_1_props});
  binding_callbacks.push(() => bind(input_1, "value", input_1_value_binding));
  return {
    c() {
      create_component(input_1.$$.fragment);
    },
    m(target, anchor) {
      mount_component(input_1, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const input_1_changes = {};
      if (!updating_value && dirty & 1) {
        updating_value = true;
        input_1_changes.value = ctx2[0];
        add_flush_callback(() => updating_value = false);
      }
      input_1.$set(input_1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(input_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(input_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(input_1, detaching);
    }
  };
}
function create_default_slot_64(ctx) {
  let input_1;
  let mounted;
  let dispose;
  return {
    c() {
      input_1 = element("input");
      attr(input_1, "class", "form-control");
      attr(input_1, "type", "file");
    },
    m(target, anchor) {
      insert(target, input_1, anchor);
      ctx[8](input_1);
      if (!mounted) {
        dispose = listen(input_1, "change", ctx[7]);
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(input_1);
      ctx[8](null);
      mounted = false;
      dispose();
    }
  };
}
function create_default_slot_54(ctx) {
  let t;
  return {
    c() {
      t = text("Add");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_44(ctx) {
  let button;
  let current;
  button = new Button({
    props: {
      $$slots: {default: [create_default_slot_54]},
      $$scope: {ctx}
    }
  });
  button.$on("click", ctx[4]);
  return {
    c() {
      create_component(button.$$.fragment);
    },
    m(target, anchor) {
      mount_component(button, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const button_changes = {};
      if (dirty & 16384) {
        button_changes.$$scope = {dirty, ctx: ctx2};
      }
      button.$set(button_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(button.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(button, detaching);
    }
  };
}
function create_default_slot_36(ctx) {
  let col0;
  let t0;
  let col1;
  let t1;
  let col2;
  let current;
  col0 = new Col({
    props: {
      class: "col-5",
      $$slots: {default: [create_default_slot_74]},
      $$scope: {ctx}
    }
  });
  col1 = new Col({
    props: {
      class: "col-5",
      $$slots: {default: [create_default_slot_64]},
      $$scope: {ctx}
    }
  });
  col2 = new Col({
    props: {
      class: "col-1",
      $$slots: {default: [create_default_slot_44]},
      $$scope: {ctx}
    }
  });
  return {
    c() {
      create_component(col0.$$.fragment);
      t0 = space();
      create_component(col1.$$.fragment);
      t1 = space();
      create_component(col2.$$.fragment);
    },
    m(target, anchor) {
      mount_component(col0, target, anchor);
      insert(target, t0, anchor);
      mount_component(col1, target, anchor);
      insert(target, t1, anchor);
      mount_component(col2, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const col0_changes = {};
      if (dirty & 16385) {
        col0_changes.$$scope = {dirty, ctx: ctx2};
      }
      col0.$set(col0_changes);
      const col1_changes = {};
      if (dirty & 16390) {
        col1_changes.$$scope = {dirty, ctx: ctx2};
      }
      col1.$set(col1_changes);
      const col2_changes = {};
      if (dirty & 16384) {
        col2_changes.$$scope = {dirty, ctx: ctx2};
      }
      col2.$set(col2_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(col0.$$.fragment, local);
      transition_in(col1.$$.fragment, local);
      transition_in(col2.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(col0.$$.fragment, local);
      transition_out(col1.$$.fragment, local);
      transition_out(col2.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(col0, detaching);
      if (detaching)
        detach(t0);
      destroy_component(col1, detaching);
      if (detaching)
        detach(t1);
      destroy_component(col2, detaching);
    }
  };
}
function create_default_slot_26(ctx) {
  let row;
  let current;
  row = new Row({
    props: {
      $$slots: {default: [create_default_slot_36]},
      $$scope: {ctx}
    }
  });
  return {
    c() {
      create_component(row.$$.fragment);
    },
    m(target, anchor) {
      mount_component(row, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const row_changes = {};
      if (dirty & 16391) {
        row_changes.$$scope = {dirty, ctx: ctx2};
      }
      row.$set(row_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(row.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(row.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(row, detaching);
    }
  };
}
function create_else_block3(ctx) {
  let a;
  let t;
  let a_href_value;
  return {
    c() {
      a = element("a");
      t = text("Download");
      attr(a, "href", a_href_value = ctx[11]);
      attr(a, "download", "dataset");
    },
    m(target, anchor) {
      insert(target, a, anchor);
      append(a, t);
    },
    p(ctx2, dirty) {
      if (dirty & 8 && a_href_value !== (a_href_value = ctx2[11])) {
        attr(a, "href", a_href_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(a);
    }
  };
}
function create_if_block_110(ctx) {
  let video;
  let source;
  let source_src_value;
  return {
    c() {
      video = element("video");
      source = element("source");
      if (!src_url_equal(source.src, source_src_value = ctx[11]))
        attr(source, "src", source_src_value);
      attr(source, "type", "video/mp4");
      attr(video, "width", "150");
      video.controls = true;
    },
    m(target, anchor) {
      insert(target, video, anchor);
      append(video, source);
    },
    p(ctx2, dirty) {
      if (dirty & 8 && !src_url_equal(source.src, source_src_value = ctx2[11])) {
        attr(source, "src", source_src_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(video);
    }
  };
}
function create_if_block3(ctx) {
  let img;
  let img_src_value;
  return {
    c() {
      img = element("img");
      attr(img, "alt", "");
      if (!src_url_equal(img.src, img_src_value = ctx[11]))
        attr(img, "src", img_src_value);
      attr(img, "width", "150");
    },
    m(target, anchor) {
      insert(target, img, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 8 && !src_url_equal(img.src, img_src_value = ctx2[11])) {
        attr(img, "src", img_src_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(img);
    }
  };
}
function create_default_slot_17(ctx) {
  let t;
  return {
    c() {
      t = text("Remove");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_each_block5(ctx) {
  let tr;
  let td0;
  let t0_value = ctx[10] + "";
  let t0;
  let t1;
  let td1;
  let show_if;
  let show_if_1;
  let t2;
  let td2;
  let button;
  let t3;
  let current;
  function select_block_type(ctx2, dirty) {
    if (dirty & 8)
      show_if = null;
    if (dirty & 8)
      show_if_1 = null;
    if (show_if == null)
      show_if = !!(ctx2[11].includes("image/jpeg") || ctx2[11].includes("image/png"));
    if (show_if)
      return create_if_block3;
    if (show_if_1 == null)
      show_if_1 = !!ctx2[11].includes("video/mp4");
    if (show_if_1)
      return create_if_block_110;
    return create_else_block3;
  }
  let current_block_type = select_block_type(ctx, -1);
  let if_block = current_block_type(ctx);
  function click_handler() {
    return ctx[9](ctx[10]);
  }
  button = new Button({
    props: {
      size: "sm",
      $$slots: {default: [create_default_slot_17]},
      $$scope: {ctx}
    }
  });
  button.$on("click", click_handler);
  return {
    c() {
      tr = element("tr");
      td0 = element("td");
      t0 = text(t0_value);
      t1 = space();
      td1 = element("td");
      if_block.c();
      t2 = space();
      td2 = element("td");
      create_component(button.$$.fragment);
      t3 = space();
    },
    m(target, anchor) {
      insert(target, tr, anchor);
      append(tr, td0);
      append(td0, t0);
      append(tr, t1);
      append(tr, td1);
      if_block.m(td1, null);
      append(tr, t2);
      append(tr, td2);
      mount_component(button, td2, null);
      append(tr, t3);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if ((!current || dirty & 8) && t0_value !== (t0_value = ctx[10] + ""))
        set_data(t0, t0_value);
      if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block) {
        if_block.p(ctx, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx);
        if (if_block) {
          if_block.c();
          if_block.m(td1, null);
        }
      }
      const button_changes = {};
      if (dirty & 16384) {
        button_changes.$$scope = {dirty, ctx};
      }
      button.$set(button_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(button.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(tr);
      if_block.d();
      destroy_component(button);
    }
  };
}
function create_default_slot8(ctx) {
  let thead;
  let t5;
  let tbody;
  let current;
  let each_value = Object.entries(ctx[3]);
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block5(get_each_context5(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      thead = element("thead");
      thead.innerHTML = `<tr><th>Key</th> 
			<th>Preview</th> 
			<th>Actions</th></tr>`;
      t5 = space();
      tbody = element("tbody");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
    },
    m(target, anchor) {
      insert(target, thead, anchor);
      insert(target, t5, anchor);
      insert(target, tbody, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(tbody, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & 40) {
        each_value = Object.entries(ctx2[3]);
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context5(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block5(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(tbody, null);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(thead);
      if (detaching)
        detach(t5);
      if (detaching)
        detach(tbody);
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_fragment9(ctx) {
  let formgroup;
  let t;
  let table;
  let current;
  formgroup = new FormGroup({
    props: {
      $$slots: {default: [create_default_slot_26]},
      $$scope: {ctx}
    }
  });
  table = new Table({
    props: {
      bordered: true,
      striped: true,
      size: "sm",
      $$slots: {default: [create_default_slot8]},
      $$scope: {ctx}
    }
  });
  return {
    c() {
      create_component(formgroup.$$.fragment);
      t = space();
      create_component(table.$$.fragment);
    },
    m(target, anchor) {
      mount_component(formgroup, target, anchor);
      insert(target, t, anchor);
      mount_component(table, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const formgroup_changes = {};
      if (dirty & 16391) {
        formgroup_changes.$$scope = {dirty, ctx: ctx2};
      }
      formgroup.$set(formgroup_changes);
      const table_changes = {};
      if (dirty & 16392) {
        table_changes.$$scope = {dirty, ctx: ctx2};
      }
      table.$set(table_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(formgroup.$$.fragment, local);
      transition_in(table.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(formgroup.$$.fragment, local);
      transition_out(table.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(formgroup, detaching);
      if (detaching)
        detach(t);
      destroy_component(table, detaching);
    }
  };
}
function instance9($$self, $$props, $$invalidate) {
  let $media;
  component_subscribe($$self, media, ($$value) => $$invalidate(3, $media = $$value));
  let key = "";
  let files;
  let input;
  const addMedia = async () => {
    if (key && files[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        media.update((dict) => {
          dict[key] = reader.result.toString();
          return dict;
        });
        $$invalidate(0, key = "");
        $$invalidate(2, input.value = "", input);
        $$invalidate(1, files = null);
      });
      reader.readAsDataURL(files[0]);
    } else {
      $$invalidate(0, key = "");
      $$invalidate(2, input.value = "", input);
      $$invalidate(1, files = null);
    }
  };
  const removeMedia = (k) => {
    delete $media[k];
    media.set($media);
  };
  function input_1_value_binding(value) {
    key = value;
    $$invalidate(0, key);
  }
  function input_1_change_handler() {
    files = this.files;
    $$invalidate(1, files);
  }
  function input_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      input = $$value;
      $$invalidate(2, input);
    });
  }
  const click_handler = (k) => removeMedia(k);
  return [
    key,
    files,
    input,
    $media,
    addMedia,
    removeMedia,
    input_1_value_binding,
    input_1_change_handler,
    input_1_binding,
    click_handler
  ];
}
var Media = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance9, create_fragment9, safe_not_equal, {});
  }
};
var Media_svelte_default = Media;

// docs/dist/components/Syntax.svelte.js
function create_fragment10(ctx) {
  let h30;
  let t1;
  let pre0;
  let t4;
  let h31;
  let t6;
  let h40;
  let t8;
  let pre1;
  let t11;
  let h41;
  let t13;
  let pre2;
  let t16;
  let h42;
  let t18;
  let pre3;
  let t21;
  let h43;
  let t23;
  let pre4;
  let t26;
  let h32;
  let t28;
  let pre5;
  let t31;
  let h33;
  let t33;
  let pre6;
  let t36;
  let h34;
  let t38;
  let pre7;
  let t41;
  let h35;
  let t43;
  let p;
  let t45;
  let pre8;
  let t48;
  let h36;
  let t50;
  let pre9;
  let t53;
  let h37;
  let t55;
  let pre10;
  return {
    c() {
      h30 = element("h3");
      h30.textContent = "Section";
      t1 = space();
      pre0 = element("pre");
      pre0.textContent = `${"<Section></Section>"}
`;
      t4 = space();
      h31 = element("h3");
      h31.textContent = "Typography";
      t6 = space();
      h40 = element("h4");
      h40.textContent = "Bold";
      t8 = space();
      pre1 = element("pre");
      pre1.textContent = `${`<b></b>`}
`;
      t11 = space();
      h41 = element("h4");
      h41.textContent = "Italics";
      t13 = space();
      pre2 = element("pre");
      pre2.textContent = `${`<i></i>`}
`;
      t16 = space();
      h42 = element("h4");
      h42.textContent = "Numbered List";
      t18 = space();
      pre3 = element("pre");
      pre3.textContent = `${`<ol>
  <li></li>
  <li></li>
</ol>`}
`;
      t21 = space();
      h43 = element("h4");
      h43.textContent = "Ordered List";
      t23 = space();
      pre4 = element("pre");
      pre4.textContent = `${`<ul>
  <li></li>
  <li></li>
</ul>`}
`;
      t26 = space();
      h32 = element("h3");
      h32.textContent = "Citation";
      t28 = space();
      pre5 = element("pre");
      pre5.textContent = `${"<Cite></Cite>"}
`;
      t31 = space();
      h33 = element("h3");
      h33.textContent = "Figure";
      t33 = space();
      pre6 = element("pre");
      pre6.textContent = `${`<Figure>
  <Key></Key>
  <Caption></Caption>
  <Label></Label>
</Figure>`}
`;
      t36 = space();
      h34 = element("h3");
      h34.textContent = "Slideshow";
      t38 = space();
      pre7 = element("pre");
      pre7.textContent = `${`<Slideshow>
  <Slide>
    <Key></Key>
    <Caption></Caption>
  </Slide>
  <Slide>
	<Key></Key>
	<Caption></Caption>
  </Slide>
  <Caption></Caption>
  <Label></Label>
</Slideshow>`}
`;
      t41 = space();
      h35 = element("h3");
      h35.textContent = "Table";
      t43 = space();
      p = element("p");
      p.textContent = "Note: Tables are added as images at the moment.";
      t45 = space();
      pre8 = element("pre");
      pre8.textContent = `${`<Table>
  <Key></Key>
  <Caption></Caption>
  <Label></Label>
</Table>`}
`;
      t48 = space();
      h36 = element("h3");
      h36.textContent = "Video";
      t50 = space();
      pre9 = element("pre");
      pre9.textContent = `${`<Video>
  <Key></Key>
  <Caption></Caption>
  <Label></Label>
</Video>`}
`;
      t53 = space();
      h37 = element("h3");
      h37.textContent = "Dataset";
      t55 = space();
      pre10 = element("pre");
      pre10.textContent = `${`<Dataset>
  <Key></Key>
  <Caption></Caption>
  <Label></Label>
</Dataset>`}
`;
      attr(pre0, "class", "svelte-d3x5xb");
      attr(pre1, "class", "svelte-d3x5xb");
      attr(pre2, "class", "svelte-d3x5xb");
      attr(pre3, "class", "svelte-d3x5xb");
      attr(pre4, "class", "svelte-d3x5xb");
      attr(pre5, "class", "svelte-d3x5xb");
      attr(pre6, "class", "svelte-d3x5xb");
      attr(pre7, "class", "svelte-d3x5xb");
      attr(pre8, "class", "svelte-d3x5xb");
      attr(pre9, "class", "svelte-d3x5xb");
      attr(pre10, "class", "svelte-d3x5xb");
    },
    m(target, anchor) {
      insert(target, h30, anchor);
      insert(target, t1, anchor);
      insert(target, pre0, anchor);
      insert(target, t4, anchor);
      insert(target, h31, anchor);
      insert(target, t6, anchor);
      insert(target, h40, anchor);
      insert(target, t8, anchor);
      insert(target, pre1, anchor);
      insert(target, t11, anchor);
      insert(target, h41, anchor);
      insert(target, t13, anchor);
      insert(target, pre2, anchor);
      insert(target, t16, anchor);
      insert(target, h42, anchor);
      insert(target, t18, anchor);
      insert(target, pre3, anchor);
      insert(target, t21, anchor);
      insert(target, h43, anchor);
      insert(target, t23, anchor);
      insert(target, pre4, anchor);
      insert(target, t26, anchor);
      insert(target, h32, anchor);
      insert(target, t28, anchor);
      insert(target, pre5, anchor);
      insert(target, t31, anchor);
      insert(target, h33, anchor);
      insert(target, t33, anchor);
      insert(target, pre6, anchor);
      insert(target, t36, anchor);
      insert(target, h34, anchor);
      insert(target, t38, anchor);
      insert(target, pre7, anchor);
      insert(target, t41, anchor);
      insert(target, h35, anchor);
      insert(target, t43, anchor);
      insert(target, p, anchor);
      insert(target, t45, anchor);
      insert(target, pre8, anchor);
      insert(target, t48, anchor);
      insert(target, h36, anchor);
      insert(target, t50, anchor);
      insert(target, pre9, anchor);
      insert(target, t53, anchor);
      insert(target, h37, anchor);
      insert(target, t55, anchor);
      insert(target, pre10, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(h30);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(pre0);
      if (detaching)
        detach(t4);
      if (detaching)
        detach(h31);
      if (detaching)
        detach(t6);
      if (detaching)
        detach(h40);
      if (detaching)
        detach(t8);
      if (detaching)
        detach(pre1);
      if (detaching)
        detach(t11);
      if (detaching)
        detach(h41);
      if (detaching)
        detach(t13);
      if (detaching)
        detach(pre2);
      if (detaching)
        detach(t16);
      if (detaching)
        detach(h42);
      if (detaching)
        detach(t18);
      if (detaching)
        detach(pre3);
      if (detaching)
        detach(t21);
      if (detaching)
        detach(h43);
      if (detaching)
        detach(t23);
      if (detaching)
        detach(pre4);
      if (detaching)
        detach(t26);
      if (detaching)
        detach(h32);
      if (detaching)
        detach(t28);
      if (detaching)
        detach(pre5);
      if (detaching)
        detach(t31);
      if (detaching)
        detach(h33);
      if (detaching)
        detach(t33);
      if (detaching)
        detach(pre6);
      if (detaching)
        detach(t36);
      if (detaching)
        detach(h34);
      if (detaching)
        detach(t38);
      if (detaching)
        detach(pre7);
      if (detaching)
        detach(t41);
      if (detaching)
        detach(h35);
      if (detaching)
        detach(t43);
      if (detaching)
        detach(p);
      if (detaching)
        detach(t45);
      if (detaching)
        detach(pre8);
      if (detaching)
        detach(t48);
      if (detaching)
        detach(h36);
      if (detaching)
        detach(t50);
      if (detaching)
        detach(pre9);
      if (detaching)
        detach(t53);
      if (detaching)
        detach(h37);
      if (detaching)
        detach(t55);
      if (detaching)
        detach(pre10);
    }
  };
}
var Syntax = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment10, safe_not_equal, {});
  }
};
var Syntax_svelte_default = Syntax;

// docs/dist/components/About.svelte.js
function create_fragment11(ctx) {
  let h1;
  let t1;
  return {
    c() {
      h1 = element("h1");
      h1.textContent = "Welcome to ManuScript";
      t1 = text("\n\n[To Do]");
    },
    m(target, anchor) {
      insert(target, h1, anchor);
      insert(target, t1, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(h1);
      if (detaching)
        detach(t1);
    }
  };
}
var About = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment11, safe_not_equal, {});
  }
};
var About_svelte_default = About;

// docs/dist/App.svelte.js
function create_default_slot_18(ctx) {
  let t;
  return {
    c() {
      t = text("ManuScript");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_else_block4(ctx) {
  let t;
  return {
    c() {
      t = text("No File Selected");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_if_block4(ctx) {
  let t_value = ctx[0].name + "";
  let t;
  return {
    c() {
      t = text(t_value);
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 1 && t_value !== (t_value = ctx2[0].name + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_172(ctx) {
  let t;
  return {
    c() {
      t = text("Sponsor");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_162(ctx) {
  let navlink;
  let current;
  navlink = new NavLink({
    props: {
      href: "https://github.com/jamesgopsill/manuscript-webapp",
      $$slots: {default: [create_default_slot_172]},
      $$scope: {ctx}
    }
  });
  return {
    c() {
      create_component(navlink.$$.fragment);
    },
    m(target, anchor) {
      mount_component(navlink, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const navlink_changes = {};
      if (dirty & 4096) {
        navlink_changes.$$scope = {dirty, ctx: ctx2};
      }
      navlink.$set(navlink_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(navlink.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(navlink.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(navlink, detaching);
    }
  };
}
function create_default_slot_152(ctx) {
  let t;
  return {
    c() {
      t = text("Open");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_142(ctx) {
  let navlink;
  let current;
  navlink = new NavLink({
    props: {
      href: "#",
      $$slots: {default: [create_default_slot_152]},
      $$scope: {ctx}
    }
  });
  navlink.$on("click", ctx[1]);
  return {
    c() {
      create_component(navlink.$$.fragment);
    },
    m(target, anchor) {
      mount_component(navlink, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const navlink_changes = {};
      if (dirty & 4096) {
        navlink_changes.$$scope = {dirty, ctx: ctx2};
      }
      navlink.$set(navlink_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(navlink.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(navlink.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(navlink, detaching);
    }
  };
}
function create_default_slot_132(ctx) {
  let t;
  return {
    c() {
      t = text("Save");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_122(ctx) {
  let navlink;
  let current;
  navlink = new NavLink({
    props: {
      href: "#",
      $$slots: {default: [create_default_slot_132]},
      $$scope: {ctx}
    }
  });
  navlink.$on("click", ctx[2]);
  return {
    c() {
      create_component(navlink.$$.fragment);
    },
    m(target, anchor) {
      mount_component(navlink, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const navlink_changes = {};
      if (dirty & 4096) {
        navlink_changes.$$scope = {dirty, ctx: ctx2};
      }
      navlink.$set(navlink_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(navlink.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(navlink.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(navlink, detaching);
    }
  };
}
function create_default_slot_11(ctx) {
  let navitem0;
  let t0;
  let navitem1;
  let t1;
  let navitem2;
  let current;
  navitem0 = new NavItem({
    props: {
      $$slots: {default: [create_default_slot_162]},
      $$scope: {ctx}
    }
  });
  navitem1 = new NavItem({
    props: {
      $$slots: {default: [create_default_slot_142]},
      $$scope: {ctx}
    }
  });
  navitem2 = new NavItem({
    props: {
      $$slots: {default: [create_default_slot_122]},
      $$scope: {ctx}
    }
  });
  return {
    c() {
      create_component(navitem0.$$.fragment);
      t0 = space();
      create_component(navitem1.$$.fragment);
      t1 = space();
      create_component(navitem2.$$.fragment);
    },
    m(target, anchor) {
      mount_component(navitem0, target, anchor);
      insert(target, t0, anchor);
      mount_component(navitem1, target, anchor);
      insert(target, t1, anchor);
      mount_component(navitem2, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const navitem0_changes = {};
      if (dirty & 4096) {
        navitem0_changes.$$scope = {dirty, ctx: ctx2};
      }
      navitem0.$set(navitem0_changes);
      const navitem1_changes = {};
      if (dirty & 4096) {
        navitem1_changes.$$scope = {dirty, ctx: ctx2};
      }
      navitem1.$set(navitem1_changes);
      const navitem2_changes = {};
      if (dirty & 4096) {
        navitem2_changes.$$scope = {dirty, ctx: ctx2};
      }
      navitem2.$set(navitem2_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(navitem0.$$.fragment, local);
      transition_in(navitem1.$$.fragment, local);
      transition_in(navitem2.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(navitem0.$$.fragment, local);
      transition_out(navitem1.$$.fragment, local);
      transition_out(navitem2.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(navitem0, detaching);
      if (detaching)
        detach(t0);
      destroy_component(navitem1, detaching);
      if (detaching)
        detach(t1);
      destroy_component(navitem2, detaching);
    }
  };
}
function create_default_slot_10(ctx) {
  let navbarbrand;
  let t0;
  let span;
  let t1;
  let t2;
  let nav;
  let current;
  navbarbrand = new NavbarBrand({
    props: {
      href: "#",
      $$slots: {default: [create_default_slot_18]},
      $$scope: {ctx}
    }
  });
  function select_block_type(ctx2, dirty) {
    if (ctx2[0])
      return create_if_block4;
    return create_else_block4;
  }
  let current_block_type = select_block_type(ctx, -1);
  let if_block = current_block_type(ctx);
  nav = new Nav({
    props: {
      class: "ms-auto",
      navbar: true,
      $$slots: {default: [create_default_slot_11]},
      $$scope: {ctx}
    }
  });
  return {
    c() {
      create_component(navbarbrand.$$.fragment);
      t0 = space();
      span = element("span");
      if_block.c();
      t1 = text("\n		(Works on Chrome and Edge)");
      t2 = space();
      create_component(nav.$$.fragment);
      attr(span, "class", "navbar-text");
    },
    m(target, anchor) {
      mount_component(navbarbrand, target, anchor);
      insert(target, t0, anchor);
      insert(target, span, anchor);
      if_block.m(span, null);
      append(span, t1);
      insert(target, t2, anchor);
      mount_component(nav, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const navbarbrand_changes = {};
      if (dirty & 4096) {
        navbarbrand_changes.$$scope = {dirty, ctx: ctx2};
      }
      navbarbrand.$set(navbarbrand_changes);
      if (current_block_type === (current_block_type = select_block_type(ctx2, dirty)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(span, t1);
        }
      }
      const nav_changes = {};
      if (dirty & 4096) {
        nav_changes.$$scope = {dirty, ctx: ctx2};
      }
      nav.$set(nav_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(navbarbrand.$$.fragment, local);
      transition_in(nav.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(navbarbrand.$$.fragment, local);
      transition_out(nav.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(navbarbrand, detaching);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(span);
      if_block.d();
      if (detaching)
        detach(t2);
      destroy_component(nav, detaching);
    }
  };
}
function create_default_slot_9(ctx) {
  let summary;
  let current;
  summary = new Summary_svelte_default({});
  return {
    c() {
      create_component(summary.$$.fragment);
    },
    m(target, anchor) {
      mount_component(summary, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(summary.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(summary.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(summary, detaching);
    }
  };
}
function create_default_slot_82(ctx) {
  let content_1;
  let current;
  content_1 = new Content_svelte_default({});
  return {
    c() {
      create_component(content_1.$$.fragment);
    },
    m(target, anchor) {
      mount_component(content_1, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(content_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(content_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(content_1, detaching);
    }
  };
}
function create_default_slot_75(ctx) {
  let media_1;
  let current;
  media_1 = new Media_svelte_default({});
  return {
    c() {
      create_component(media_1.$$.fragment);
    },
    m(target, anchor) {
      mount_component(media_1, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(media_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(media_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(media_1, detaching);
    }
  };
}
function create_default_slot_65(ctx) {
  let references_1;
  let current;
  references_1 = new References_svelte_default({});
  return {
    c() {
      create_component(references_1.$$.fragment);
    },
    m(target, anchor) {
      mount_component(references_1, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(references_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(references_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(references_1, detaching);
    }
  };
}
function create_default_slot_55(ctx) {
  let syntax;
  let current;
  syntax = new Syntax_svelte_default({});
  return {
    c() {
      create_component(syntax.$$.fragment);
    },
    m(target, anchor) {
      mount_component(syntax, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(syntax.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(syntax.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(syntax, detaching);
    }
  };
}
function create_default_slot_45(ctx) {
  let about;
  let current;
  about = new About_svelte_default({});
  return {
    c() {
      create_component(about.$$.fragment);
    },
    m(target, anchor) {
      mount_component(about, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(about.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(about.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(about, detaching);
    }
  };
}
function create_default_slot_37(ctx) {
  let tabpane0;
  let t0;
  let tabpane1;
  let t1;
  let tabpane2;
  let t2;
  let tabpane3;
  let t3;
  let tabpane4;
  let t4;
  let tabpane5;
  let current;
  tabpane0 = new TabPane({
    props: {
      class: "mt-1",
      tabId: "summary",
      tab: "Summary",
      active: true,
      $$slots: {default: [create_default_slot_9]},
      $$scope: {ctx}
    }
  });
  tabpane1 = new TabPane({
    props: {
      class: "mt-1",
      tabId: "content",
      tab: "Content",
      $$slots: {default: [create_default_slot_82]},
      $$scope: {ctx}
    }
  });
  tabpane2 = new TabPane({
    props: {
      class: "mt-1",
      tabId: "media",
      tab: "Media",
      $$slots: {default: [create_default_slot_75]},
      $$scope: {ctx}
    }
  });
  tabpane3 = new TabPane({
    props: {
      class: "mt-1",
      tabId: "references",
      tab: "References",
      $$slots: {default: [create_default_slot_65]},
      $$scope: {ctx}
    }
  });
  tabpane4 = new TabPane({
    props: {
      class: "mt-1",
      tabId: "syntax",
      tab: "Syntax",
      $$slots: {default: [create_default_slot_55]},
      $$scope: {ctx}
    }
  });
  tabpane5 = new TabPane({
    props: {
      class: "mt-1",
      tabId: "about",
      tab: "About",
      $$slots: {default: [create_default_slot_45]},
      $$scope: {ctx}
    }
  });
  return {
    c() {
      create_component(tabpane0.$$.fragment);
      t0 = space();
      create_component(tabpane1.$$.fragment);
      t1 = space();
      create_component(tabpane2.$$.fragment);
      t2 = space();
      create_component(tabpane3.$$.fragment);
      t3 = space();
      create_component(tabpane4.$$.fragment);
      t4 = space();
      create_component(tabpane5.$$.fragment);
    },
    m(target, anchor) {
      mount_component(tabpane0, target, anchor);
      insert(target, t0, anchor);
      mount_component(tabpane1, target, anchor);
      insert(target, t1, anchor);
      mount_component(tabpane2, target, anchor);
      insert(target, t2, anchor);
      mount_component(tabpane3, target, anchor);
      insert(target, t3, anchor);
      mount_component(tabpane4, target, anchor);
      insert(target, t4, anchor);
      mount_component(tabpane5, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const tabpane0_changes = {};
      if (dirty & 4096) {
        tabpane0_changes.$$scope = {dirty, ctx: ctx2};
      }
      tabpane0.$set(tabpane0_changes);
      const tabpane1_changes = {};
      if (dirty & 4096) {
        tabpane1_changes.$$scope = {dirty, ctx: ctx2};
      }
      tabpane1.$set(tabpane1_changes);
      const tabpane2_changes = {};
      if (dirty & 4096) {
        tabpane2_changes.$$scope = {dirty, ctx: ctx2};
      }
      tabpane2.$set(tabpane2_changes);
      const tabpane3_changes = {};
      if (dirty & 4096) {
        tabpane3_changes.$$scope = {dirty, ctx: ctx2};
      }
      tabpane3.$set(tabpane3_changes);
      const tabpane4_changes = {};
      if (dirty & 4096) {
        tabpane4_changes.$$scope = {dirty, ctx: ctx2};
      }
      tabpane4.$set(tabpane4_changes);
      const tabpane5_changes = {};
      if (dirty & 4096) {
        tabpane5_changes.$$scope = {dirty, ctx: ctx2};
      }
      tabpane5.$set(tabpane5_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(tabpane0.$$.fragment, local);
      transition_in(tabpane1.$$.fragment, local);
      transition_in(tabpane2.$$.fragment, local);
      transition_in(tabpane3.$$.fragment, local);
      transition_in(tabpane4.$$.fragment, local);
      transition_in(tabpane5.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(tabpane0.$$.fragment, local);
      transition_out(tabpane1.$$.fragment, local);
      transition_out(tabpane2.$$.fragment, local);
      transition_out(tabpane3.$$.fragment, local);
      transition_out(tabpane4.$$.fragment, local);
      transition_out(tabpane5.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(tabpane0, detaching);
      if (detaching)
        detach(t0);
      destroy_component(tabpane1, detaching);
      if (detaching)
        detach(t1);
      destroy_component(tabpane2, detaching);
      if (detaching)
        detach(t2);
      destroy_component(tabpane3, detaching);
      if (detaching)
        detach(t3);
      destroy_component(tabpane4, detaching);
      if (detaching)
        detach(t4);
      destroy_component(tabpane5, detaching);
    }
  };
}
function create_default_slot_27(ctx) {
  let tabcontent;
  let current;
  tabcontent = new TabContent({
    props: {
      $$slots: {default: [create_default_slot_37]},
      $$scope: {ctx}
    }
  });
  return {
    c() {
      create_component(tabcontent.$$.fragment);
    },
    m(target, anchor) {
      mount_component(tabcontent, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const tabcontent_changes = {};
      if (dirty & 4096) {
        tabcontent_changes.$$scope = {dirty, ctx: ctx2};
      }
      tabcontent.$set(tabcontent_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(tabcontent.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(tabcontent.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(tabcontent, detaching);
    }
  };
}
function create_default_slot_19(ctx) {
  let preview;
  let current;
  preview = new Preview_svelte_default({});
  return {
    c() {
      create_component(preview.$$.fragment);
    },
    m(target, anchor) {
      mount_component(preview, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(preview.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(preview.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(preview, detaching);
    }
  };
}
function create_default_slot9(ctx) {
  let col0;
  let t;
  let col1;
  let current;
  col0 = new Col({
    props: {
      $$slots: {default: [create_default_slot_27]},
      $$scope: {ctx}
    }
  });
  col1 = new Col({
    props: {
      $$slots: {default: [create_default_slot_19]},
      $$scope: {ctx}
    }
  });
  return {
    c() {
      create_component(col0.$$.fragment);
      t = space();
      create_component(col1.$$.fragment);
    },
    m(target, anchor) {
      mount_component(col0, target, anchor);
      insert(target, t, anchor);
      mount_component(col1, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const col0_changes = {};
      if (dirty & 4096) {
        col0_changes.$$scope = {dirty, ctx: ctx2};
      }
      col0.$set(col0_changes);
      const col1_changes = {};
      if (dirty & 4096) {
        col1_changes.$$scope = {dirty, ctx: ctx2};
      }
      col1.$set(col1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(col0.$$.fragment, local);
      transition_in(col1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(col0.$$.fragment, local);
      transition_out(col1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(col0, detaching);
      if (detaching)
        detach(t);
      destroy_component(col1, detaching);
    }
  };
}
function create_fragment12(ctx) {
  let link;
  let t0;
  let navbar;
  let t1;
  let row;
  let current;
  navbar = new Navbar({
    props: {
      color: "light",
      light: true,
      expand: "md",
      class: "mb-1",
      $$slots: {default: [create_default_slot_10]},
      $$scope: {ctx}
    }
  });
  row = new Row({
    props: {
      class: "my-row",
      $$slots: {default: [create_default_slot9]},
      $$scope: {ctx}
    }
  });
  return {
    c() {
      link = element("link");
      t0 = space();
      create_component(navbar.$$.fragment);
      t1 = space();
      create_component(row.$$.fragment);
      attr(link, "rel", "stylesheet");
      attr(link, "href", "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css");
    },
    m(target, anchor) {
      append(document.head, link);
      insert(target, t0, anchor);
      mount_component(navbar, target, anchor);
      insert(target, t1, anchor);
      mount_component(row, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const navbar_changes = {};
      if (dirty & 4097) {
        navbar_changes.$$scope = {dirty, ctx: ctx2};
      }
      navbar.$set(navbar_changes);
      const row_changes = {};
      if (dirty & 4096) {
        row_changes.$$scope = {dirty, ctx: ctx2};
      }
      row.$set(row_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(navbar.$$.fragment, local);
      transition_in(row.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(navbar.$$.fragment, local);
      transition_out(row.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      detach(link);
      if (detaching)
        detach(t0);
      destroy_component(navbar, detaching);
      if (detaching)
        detach(t1);
      destroy_component(row, detaching);
    }
  };
}
function instance10($$self, $$props, $$invalidate) {
  let $references;
  let $media;
  let $content;
  let $abstract;
  let $keywords;
  let $authors;
  let $publication;
  let $title;
  component_subscribe($$self, references, ($$value) => $$invalidate(3, $references = $$value));
  component_subscribe($$self, media, ($$value) => $$invalidate(4, $media = $$value));
  component_subscribe($$self, content, ($$value) => $$invalidate(5, $content = $$value));
  component_subscribe($$self, abstract, ($$value) => $$invalidate(6, $abstract = $$value));
  component_subscribe($$self, keywords, ($$value) => $$invalidate(7, $keywords = $$value));
  component_subscribe($$self, authors, ($$value) => $$invalidate(8, $authors = $$value));
  component_subscribe($$self, publication, ($$value) => $$invalidate(9, $publication = $$value));
  component_subscribe($$self, title, ($$value) => $$invalidate(10, $title = $$value));
  let fileHandle;
  const onOpen = async () => {
    console.log("Open Clicked");
    if (window.showSaveFilePicker) {
      const config = {
        types: [
          {
            description: "ManuScript JSON",
            accept: {"text/plain": [".json"]}
          }
        ],
        excludeAcceptAllOption: true,
        multiple: false
      };
      $$invalidate(0, fileHandle = await window.showOpenFilePicker(config));
      $$invalidate(0, fileHandle = fileHandle[0]);
      const file = await fileHandle.getFile();
      const text2 = await file.text();
      const manuscript = JSON.parse(text2);
      title.set(manuscript.title);
      publication.set(manuscript.publication);
      authors.set(manuscript.authors);
      keywords.set(manuscript.keywords);
      abstract.set(manuscript.abstract);
      content.set(manuscript.content);
      media.set(manuscript.media);
      references.set(manuscript.references);
    } else {
      console.log("Unsupported browser");
    }
  };
  const onSave = async () => {
    console.log("Save Clicked");
    if (fileHandle) {
      const writable2 = await fileHandle.createWritable();
      const json = {
        title: $title,
        publication: $publication,
        authors: $authors,
        keywords: $keywords,
        abstract: $abstract,
        content: $content,
        media: $media,
        references: $references
      };
      await writable2.write(JSON.stringify(json));
      await writable2.close();
    } else {
      saveNewFile();
    }
  };
  const saveNewFile = async () => {
    if (window.showSaveFilePicker) {
      const config = {
        types: [
          {
            description: "ManuScript JSON",
            accept: {"text/plain": [".json"]}
          }
        ]
      };
      $$invalidate(0, fileHandle = await window.showSaveFilePicker(config));
      if (fileHandle) {
        const writable2 = await fileHandle.createWritable();
        const json = {
          title: $title,
          publication: $publication,
          authors: $authors,
          keywords: $keywords,
          abstract: $abstract,
          content: $content,
          media: $media,
          references: $references
        };
        await writable2.write(JSON.stringify(json));
        await writable2.close();
      }
    } else {
      console.log("Unsupported browser");
    }
  };
  return [fileHandle, onOpen, onSave];
}
var App = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance10, create_fragment12, safe_not_equal, {});
  }
};
var App_svelte_default = App;

// docs/dist/index.js
new App_svelte_default({
  target: document.body
});
//# sourceMappingURL=index.js.map

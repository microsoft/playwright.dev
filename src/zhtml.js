/**
 * ZHTML 1.3.0
 * https://github.com/mezzoeditor/zhtml
 */
const templateCache = new Map();

const BOOLEAN_ATTRS = new Set([
  'async', 'autofocus', 'autoplay', 'checked', 'contenteditable', 'controls',
  'default', 'defer', 'disabled', 'formNoValidate', 'frameborder', 'hidden',
  'ismap', 'itemscope', 'loop', 'multiple', 'muted', 'nomodule', 'novalidate',
  'open', 'readonly', 'required', 'reversed', 'scoped', 'selected', 'typemustmatch',
]);

export function html(strings, ...values) {
  let cache = templateCache.get(strings);
  if (!cache) {
    cache = prepareTemplate(strings);
    templateCache.set(strings, cache);
  }
  const node = renderTemplate(cache.template, cache.subs, values);
  if (node.querySelector) {
    node.$ = node.querySelector.bind(node);
    node.$$ = node.querySelectorAll.bind(node);
  }
  return node;
}

const SPACE_REGEX = /^\s*\n\s*$/;
const MARKER_REGEX = /z-t-e-\d+-m-p-l-a-t-e/;

function prepareTemplate(strings) {
  const template = document.createElement('template');
  let html = ''
  for (let i = 0; i < strings.length - 1; ++i) {
    html += strings[i];
    html += `z-t-e-${i}-m-p-l-a-t-e`;
  }
  html += strings[strings.length - 1];
  template.innerHTML = html;

  const walker = template.ownerDocument.createTreeWalker(
      template.content, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null, false);
  let valueIndex = 0;
  const emptyTextNodes = [];
  const subs = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.nodeType === Node.ELEMENT_NODE && MARKER_REGEX.test(node.tagName))
      throw new Error('Should not use a parameter as an html tag');

    if (node.nodeType === Node.ELEMENT_NODE && node.hasAttributes()) {
      for (let i = 0; i < node.attributes.length; i++) {
        const name = node.attributes[i].name;

        const nameParts = name.split(MARKER_REGEX);
        const valueParts = node.attributes[i].value.split(MARKER_REGEX);
        if (nameParts.length > 1 || valueParts.length > 1)
          subs.push({ node, nameParts, valueParts, attr: name});
      }
    } else if (node.nodeType === Node.TEXT_NODE && MARKER_REGEX.test(node.data)) {
      const texts = node.data.split(MARKER_REGEX);
      node.data = texts[0];
      const anchor = node.nextSibling;
      for (let i = 1; i < texts.length; ++i) {
        const span = document.createElement('span');
        node.parentNode.insertBefore(span, anchor);
        node.parentNode.insertBefore(document.createTextNode(texts[i]), anchor);
        subs.push({
          node: span,
          type: 'replace-node',
        });
      }
      if (shouldRemoveTextNode(node))
        emptyTextNodes.push(node);
    } else if (node.nodeType === Node.TEXT_NODE && shouldRemoveTextNode(node)) {
      emptyTextNodes.push(node);
    }
  }

  for (const emptyTextNode of emptyTextNodes)
    emptyTextNode.remove();

  const markedNodes = new Map();
  for (const sub of subs) {
    let index = markedNodes.get(sub.node);
    if (index === undefined) {
      index = markedNodes.size;
      sub.node.setAttribute('z-framework-marked-node', true);
      markedNodes.set(sub.node, index);
    }
    sub.nodeIndex = index;
  }
  return {template, subs};
}

function shouldRemoveTextNode(node) {
  if (!node.previousSibling && !node.nextSibling)
    return !node.data.length;
  return (!node.previousSibling || node.previousSibling.nodeType === Node.ELEMENT_NODE) &&
         (!node.nextSibling || node.nextSibling.nodeType === Node.ELEMENT_NODE) &&
         (!node.data.length || SPACE_REGEX.test(node.data));
}

function renderTemplate(template, subs, values) {
  const content = template.ownerDocument.importNode(template.content, true);
  const boundElements = Array.from(content.querySelectorAll('[z-framework-marked-node]'));
  for (const node of boundElements)
    node.removeAttribute('z-framework-marked-node');

  let valueIndex = 0;
  const interpolateText = (texts) => {
    if (texts.length === 2 && texts[0] === '' && texts[1] === '')
      return values[valueIndex++];
    let newText = texts[0];
    for (let i = 1; i < texts.length; ++i) {
      newText += values[valueIndex++];
      newText += texts[i];
    }
    return newText;
  }

  for (const sub of subs) {
    const node = boundElements[sub.nodeIndex];
    if (sub.attr) {
      node.removeAttribute(sub.attr);
      let name = interpolateText(sub.nameParts);
      let value = interpolateText(sub.valueParts);
      if (name) {
        if (name.includes('=') && !value) {
          const index = name.indexOf('=');
          value = name.substring(index + 1);
          name = name.substring(0, index);
        }
        if (BOOLEAN_ATTRS.has(name))
          node.toggleAttribute(name, !!value);
        else
          node.setAttribute(name, value);
      }
    } else if (sub.type === 'replace-node') {
      const replacement = values[valueIndex++];
      if (replacement === undefined || replacement === null || replacement === false) {
        node.remove();
      } else if (Array.isArray(replacement)) {
        const fragment = document.createDocumentFragment();
        for (const node of replacement)
          fragment.appendChild(node);
        node.replaceWith(fragment);
      } else if (replacement instanceof Node) {
        node.replaceWith(replacement);
      } else {
        node.replaceWith(document.createTextNode(replacement));
      }
    }
  }
  return content.firstChild && content.firstChild === content.lastChild ? content.firstChild : content;
}

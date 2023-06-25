'use strict';

var md = require('markdown-it')('commonmark');

hexo.extend.filter.register('before_post_render', function (data) {
  let strRegExp = /&gt; \[\!(note|info|todo|warning|attention|caution|failure|missing|fail|error)\]((?:.|\n)*?)(\n|$)/g;
  let admonitionRegExp = new RegExp(strRegExp, 'gmi');

  let strData;
  if (admonitionRegExp.test(data.content)) {
    strData = data.content.replace(admonitionRegExp, function (matchStr, p1, p2) {
      let admonitionLines = p2.trim().split('\n');
      let admonitionTitle = admonitionLines[0].replace(/^\s*>\s*/, '');
      let admonitionContent = admonitionLines.slice(1).join('\n');
      const className = `admonition admonition-${p1.toLowerCase()}`;

      let html = `<div class="${className}">`;

      if (admonitionTitle) {
        html += `<p class="admonition-title">${md.renderInline(admonitionTitle)}</p>`;
      }

      html += `${md.render(admonitionContent)}</div>\n\n`;
      return html;
    });
    data.content = strData;
  }

  return data;
});


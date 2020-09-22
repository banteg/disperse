(function () {
  'use strict';

  function styleInject(css, ref) {
    if ( ref === void 0 ) { ref = {}; }
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css = "/*! normalize.css v8.0.0 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\n html {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n[hidden] {\n  display: none;\n}\n";
  styleInject(css);

  var css$1 = "@charset \"UTF-8\";\n\n/* Import ET Book styles\n   adapted from https://github.com/edwardtufte/et-book/blob/gh-pages/et-book.css */\n\n@font-face { font-family: \"et-book\";\n             src: url(\"et-book/et-book-roman-line-figures/et-book-roman-line-figures.eot\");\n             src: url(\"et-book/et-book-roman-line-figures/et-book-roman-line-figures.eot?#iefix\") format(\"embedded-opentype\"), url(\"et-book/et-book-roman-line-figures/et-book-roman-line-figures.woff\") format(\"woff\"), url(\"et-book/et-book-roman-line-figures/et-book-roman-line-figures.ttf\") format(\"truetype\"), url(\"et-book/et-book-roman-line-figures/et-book-roman-line-figures.svg#etbookromanosf\") format(\"svg\");\n             font-weight: normal;\n             font-style: normal; }\n\n@font-face { font-family: \"et-book\";\n             src: url(\"et-book/et-book-display-italic-old-style-figures/et-book-display-italic-old-style-figures.eot\");\n             src: url(\"et-book/et-book-display-italic-old-style-figures/et-book-display-italic-old-style-figures.eot?#iefix\") format(\"embedded-opentype\"), url(\"et-book/et-book-display-italic-old-style-figures/et-book-display-italic-old-style-figures.woff\") format(\"woff\"), url(\"et-book/et-book-display-italic-old-style-figures/et-book-display-italic-old-style-figures.ttf\") format(\"truetype\"), url(\"et-book/et-book-display-italic-old-style-figures/et-book-display-italic-old-style-figures.svg#etbookromanosf\") format(\"svg\");\n             font-weight: normal;\n             font-style: italic; }\n\n@font-face { font-family: \"et-book\";\n             src: url(\"et-book/et-book-bold-line-figures/et-book-bold-line-figures.eot\");\n             src: url(\"et-book/et-book-bold-line-figures/et-book-bold-line-figures.eot?#iefix\") format(\"embedded-opentype\"), url(\"et-book/et-book-bold-line-figures/et-book-bold-line-figures.woff\") format(\"woff\"), url(\"et-book/et-book-bold-line-figures/et-book-bold-line-figures.ttf\") format(\"truetype\"), url(\"et-book/et-book-bold-line-figures/et-book-bold-line-figures.svg#etbookromanosf\") format(\"svg\");\n             font-weight: bold;\n             font-style: normal; }\n\n@font-face { font-family: \"et-book-roman-old-style\";\n             src: url(\"et-book/et-book-roman-old-style-figures/et-book-roman-old-style-figures.eot\");\n             src: url(\"et-book/et-book-roman-old-style-figures/et-book-roman-old-style-figures.eot?#iefix\") format(\"embedded-opentype\"), url(\"et-book/et-book-roman-old-style-figures/et-book-roman-old-style-figures.woff\") format(\"woff\"), url(\"et-book/et-book-roman-old-style-figures/et-book-roman-old-style-figures.ttf\") format(\"truetype\"), url(\"et-book/et-book-roman-old-style-figures/et-book-roman-old-style-figures.svg#etbookromanosf\") format(\"svg\");\n             font-weight: normal;\n             font-style: normal; }\n\n/* Tufte CSS styles */\nhtml { font-size: 14px; }\n\nbody { width: 87.5%;\n       margin-left: auto;\n       margin-right: auto;\n       padding-left: 12.5%;\n       font-family: et-book, Palatino, \"Palatino Linotype\", \"Palatino LT STD\", \"Book Antiqua\", Georgia, serif;\n       background-color: #fffff8;\n       color: #111;\n       max-width: 1400px;\n       counter-reset: sidenote-counter; }\n\nh1 { font-weight: 400;\n     margin-top: 4rem;\n     margin-bottom: 1.5rem;\n     font-size: 3.2rem;\n     line-height: 1; }\n\nh2 { font-style: italic;\n     font-weight: 400;\n     margin-top: 2.1rem;\n     margin-bottom: 1.4rem;\n     font-size: 2.2rem;\n     line-height: 1; }\n\nh3 { font-style: italic;\n     font-weight: 400;\n     font-size: 1.7rem;\n     margin-top: 2rem;\n     margin-bottom: 1.4rem;\n     line-height: 1; }\n\nhr { display: block;\n     height: 1px;\n     width: 55%;\n     border: 0;\n     border-top: 1px solid #ccc;\n     margin: 1em 0;\n     padding: 0; }\n\np.subtitle { font-style: italic;\n             margin-top: 1rem;\n             margin-bottom: 1rem;\n             font-size: 1.8rem;\n             display: block;\n             line-height: 1; }\n\n.numeral { font-family: et-book-roman-old-style; }\n\n.danger { color: red; }\n\narticle { position: relative;\n          padding: 5rem 0rem; }\n\nsection { padding-top: 1rem;\n          padding-bottom: 1rem; }\n\np, ol, ul { font-size: 1.4rem;\n            line-height: 2rem; }\n\np { margin-top: 1.4rem;\n    margin-bottom: 1.4rem;\n    padding-right: 0;\n    vertical-align: baseline; }\n\n/* Chapter Epigraphs */\ndiv.epigraph { margin: 5em 0; }\n\ndiv.epigraph > blockquote { margin-top: 3em;\n                            margin-bottom: 3em; }\n\ndiv.epigraph > blockquote, div.epigraph > blockquote > p { font-style: italic; }\n\ndiv.epigraph > blockquote > footer { font-style: normal; }\n\ndiv.epigraph > blockquote > footer > cite { font-style: italic; }\n/* end chapter epigraphs styles */\n\nblockquote { font-size: 1.4rem; }\n\nblockquote p { width: 55%;\n               margin-right: 40px; }\n\nblockquote footer { width: 55%;\n                    font-size: 1.1rem;\n                    text-align: right; }\n\n/* section > p, section > footer, section > table { width: 55%; } */\n\n/* 50 + 5 == 55, to be the same width as paragraph */\n/* section > ol, section > ul { width: 50%; */\n                             /* -webkit-padding-start: 5%; } */\n\nli:not(:first-child) { margin-top: 0.25rem; }\n\nfigure { padding: 0;\n         border: 0;\n         font-size: 100%;\n         font: inherit;\n         vertical-align: baseline;\n         max-width: 55%;\n         -webkit-margin-start: 0;\n         -webkit-margin-end: 0;\n         margin: 0 0 3em 0; }\n\nfigcaption { float: right;\n             clear: right;\n             margin-top: 0;\n             margin-bottom: 0;\n             font-size: 1.1rem;\n             line-height: 1.6;\n             vertical-align: baseline;\n             position: relative;\n             max-width: 40%; }\n\nfigure.fullwidth figcaption { margin-right: 24%; }\n\n/* Links: replicate underline that clears descenders */\na:link, a:visited { color: inherit; }\n\na:link { text-decoration: none;\n         background: -webkit-linear-gradient(#fffff8, #fffff8), -webkit-linear-gradient(#fffff8, #fffff8), -webkit-linear-gradient(#333, #333);\n         background: linear-gradient(#fffff8, #fffff8), linear-gradient(#fffff8, #fffff8), linear-gradient(#333, #333);\n         -webkit-background-size: 0.05em 1px, 0.05em 1px, 1px 1px;\n         -moz-background-size: 0.05em 1px, 0.05em 1px, 1px 1px;\n         background-size: 0.05em 1px, 0.05em 1px, 1px 1px;\n         background-repeat: no-repeat, no-repeat, repeat-x;\n         text-shadow: 0.03em 0 #fffff8, -0.03em 0 #fffff8, 0 0.03em #fffff8, 0 -0.03em #fffff8, 0.06em 0 #fffff8, -0.06em 0 #fffff8, 0.09em 0 #fffff8, -0.09em 0 #fffff8, 0.12em 0 #fffff8, -0.12em 0 #fffff8, 0.15em 0 #fffff8, -0.15em 0 #fffff8;\n         background-position: 0% 93%, 100% 93%, 0% 93%; }\n\n@media screen and (-webkit-min-device-pixel-ratio: 0) { a:link { background-position-y: 87%, 87%, 87%; } }\n\na:link::selection { text-shadow: 0.03em 0 #b4d5fe, -0.03em 0 #b4d5fe, 0 0.03em #b4d5fe, 0 -0.03em #b4d5fe, 0.06em 0 #b4d5fe, -0.06em 0 #b4d5fe, 0.09em 0 #b4d5fe, -0.09em 0 #b4d5fe, 0.12em 0 #b4d5fe, -0.12em 0 #b4d5fe, 0.15em 0 #b4d5fe, -0.15em 0 #b4d5fe;\n                    background: #b4d5fe; }\n\na:link::-moz-selection { text-shadow: 0.03em 0 #b4d5fe, -0.03em 0 #b4d5fe, 0 0.03em #b4d5fe, 0 -0.03em #b4d5fe, 0.06em 0 #b4d5fe, -0.06em 0 #b4d5fe, 0.09em 0 #b4d5fe, -0.09em 0 #b4d5fe, 0.12em 0 #b4d5fe, -0.12em 0 #b4d5fe, 0.15em 0 #b4d5fe, -0.15em 0 #b4d5fe;\n                         background: #b4d5fe; }\n\n/* Sidenotes, margin notes, figures, captions */\nimg { max-width: 100%; }\n\n.sidenote, .marginnote { float: right;\n                         clear: right;\n                         margin-right: -60%;\n                         width: 50%;\n                         margin-top: 0;\n                         margin-bottom: 0;\n                         font-size: 1.1rem;\n                         line-height: 1.3;\n                         vertical-align: baseline;\n                         position: relative; }\n\n.sidenote-number { counter-increment: sidenote-counter; }\n\n.sidenote-number:after, .sidenote:before { font-family: et-book-roman-old-style;\n                                           position: relative;\n                                           vertical-align: baseline; }\n\n.sidenote-number:after { content: counter(sidenote-counter);\n                         font-size: 1rem;\n                         top: -0.5rem;\n                         left: 0.1rem; }\n\n.sidenote:before { content: counter(sidenote-counter) \" \";\n                   font-size: 1rem;\n                   top: -0.5rem; }\n\nblockquote .sidenote, blockquote .marginnote { margin-right: -82%;\n                                               min-width: 59%;\n                                               text-align: left; }\n\ndiv.fullwidth, table.fullwidth { width: 100%; }\n\ndiv.table-wrapper { overflow-x: auto;\n                    font-family: \"Trebuchet MS\", \"Gill Sans\", \"Gill Sans MT\", sans-serif; }\n\n.sans { font-family: \"Gill Sans\", \"Gill Sans MT\", Calibri, sans-serif;\n        letter-spacing: .03em; }\n\ncode { font-family: Consolas, \"Liberation Mono\", Menlo, Courier, monospace;\n       font-size: 1.0rem;\n       line-height: 1.42; }\n\n.sans > code { font-size: 1.2rem; }\n\nh1 > code, h2 > code, h3 > code { font-size: 0.80em; }\n\n.marginnote > code, .sidenote > code { font-size: 1rem; }\n\npre.code { font-size: 0.9rem;\n           width: 52.5%;\n           margin-left: 2.5%;\n           overflow-x: auto; }\n\npre.code.fullwidth { width: 90%; }\n\n.fullwidth { max-width: 90%;\n             clear:both; }\n\nspan.newthought { font-variant: small-caps;\n                  font-size: 1.2em; }\n\ninput.margin-toggle { display: none; }\n\nlabel.sidenote-number { display: inline; }\n\nlabel.margin-toggle:not(.sidenote-number) { display: none; }\n\n.iframe-wrapper { position: relative;\n                  padding-bottom: 56.25%; /* 16:9 */\n                  padding-top: 25px;\n                  height: 0; }\n\n.iframe-wrapper iframe { position: absolute;\n                         top: 0;\n                         left: 0;\n                         width: 100%;\n                         height: 100%; }\n\n@media (max-width: 760px) { body { width: 84%;\n                                   padding-left: 8%;\n                                   padding-right: 8%; }\n                            hr, section > p, section > footer, section > table { width: 100%; }\n                            pre.code { width: 97%; }\n                            section > ol { width: 90%; }\n                            section > ul { width: 90%; }\n                            figure { max-width: 90%; }\n                            figcaption, figure.fullwidth figcaption { margin-right: 0%;\n                                                                      max-width: none; }\n                            blockquote { margin-left: 1.5em;\n                                         margin-right: 0em; }\n                            blockquote p, blockquote footer { width: 100%; }\n                            label.margin-toggle:not(.sidenote-number) { display: inline; }\n                            .sidenote, .marginnote { display: none; }\n                            .margin-toggle:checked + .sidenote,\n                            .margin-toggle:checked + .marginnote { display: block;\n                                                                   float: left;\n                                                                   left: 1rem;\n                                                                   clear: both;\n                                                                   width: 95%;\n                                                                   margin: 1rem 2.5%;\n                                                                   vertical-align: baseline;\n                                                                   position: relative; }\n                            label { cursor: pointer; }\n                            div.table-wrapper, table { width: 85%; }\n                            img { width: 100%; } }\n";
  styleInject(css$1);

  var css$2 = "body {\n  padding-left: 0 !important; }\n\narticle {\n  margin: auto;\n  max-width: 600px; }\n\n.row {\n  padding-bottom: 1em; }\n\n.inline {\n  display: inline-block; }\n\n.block {\n  display: block; }\n\n.pr {\n  padding-right: 1em; }\n\n.pb {\n  padding-bottom: 1em; }\n\n.flex {\n  display: flex;\n  /* border: 1px goldenrod solid */\n  width: 100%; }\n\n.fg {\n  flex-grow: 1; }\n\n.bar {\n  flex-grow: 1;\n  margin: auto 0.3em;\n  border-bottom: 1px black solid; }\n\n.end-bar {\n  flex-grow: 1;\n  margin: auto 0;\n  height: 1.4rem;\n  border-bottom: 1px black solid; }\n\n.eth {\n  display: inline-block;\n  position: relative;\n  margin-left: -50px;\n  bottom: 20px; }\n\ninput, label {\n  font-size: 1.4rem;\n  line-height: 2rem; }\n\nul {\n  list-style: none;\n  padding-left: 0; }\n\n.shadow {\n  width: 100%;\n  padding-right: 6px; }\n\ntextarea {\n  display: block;\n  border: none;\n  border-bottom: 2px #111111 solid;\n  background: aquamarine;\n  padding: .7rem;\n  font-size: 1.4rem;\n  width: 100%;\n  position: relative;\n  height: 8.4rem;\n  resize: none;\n  margin-bottom: 1.4rem; }\n\ntextarea:focus {\n  outline: none; }\n\ninput[type=\"submit\"] {\n  border: none;\n  font-style: italic;\n  padding: .7rem;\n  background: aquamarine;\n  box-shadow: 6px 6px crimson; }\n\ninput[type=\"submit\"]:focus {\n  outline: none; }\n\n.red {\n  color: crimson; }\n\n.info {\n  display: flex;\n  align-items: baseline; }\n\n.info > div {\n  font-size: 1.4rem;\n  margin-left: 1.4rem; }\n\n.rows > * {\n  padding-bottom: 1rem; }\n\n.error {\n  font-style: italic;\n  color: crimson; }\n\n.pending {\n  font-style: italic;\n  color: rgba(0, 0, 0, 0.6); }\n\n.expand {\n  flex-grow: 1; }\n";
  styleInject(css$2);

  /**
   * Shorter and fast way to select a single node in the DOM
   * @param   { String } selector - unique dom selector
   * @param   { Object } ctx - DOM node where the target of our search will is located
   * @returns { Object } dom node found
   */
  function $(selector, ctx) {
    return (ctx || document).querySelector(selector)
  }

  var
    // be aware, internal usage
    // ATTENTION: prefix the global dynamic variables with `__`
    // tags instances cache
    __TAGS_CACHE = [],
    // tags implementation cache
    __TAG_IMPL = {},
    YIELD_TAG = 'yield',

    /**
     * Const
     */
    GLOBAL_MIXIN = '__global_mixin',

    // riot specific prefixes or attributes
    ATTRS_PREFIX = 'riot-',

    // Riot Directives
    REF_DIRECTIVES = ['ref', 'data-ref'],
    IS_DIRECTIVE = 'data-is',
    CONDITIONAL_DIRECTIVE = 'if',
    LOOP_DIRECTIVE = 'each',
    LOOP_NO_REORDER_DIRECTIVE = 'no-reorder',
    SHOW_DIRECTIVE = 'show',
    HIDE_DIRECTIVE = 'hide',
    KEY_DIRECTIVE = 'key',
    RIOT_EVENTS_KEY = '__riot-events__',

    // for typeof == '' comparisons
    T_STRING = 'string',
    T_OBJECT = 'object',
    T_UNDEF  = 'undefined',
    T_FUNCTION = 'function',

    XLINK_NS = 'http://www.w3.org/1999/xlink',
    SVG_NS = 'http://www.w3.org/2000/svg',
    XLINK_REGEX = /^xlink:(\w+)/,

    WIN = typeof window === T_UNDEF ? /* istanbul ignore next */ undefined : window,

    // special native tags that cannot be treated like the others
    RE_SPECIAL_TAGS = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?|opt(?:ion|group))$/,
    RE_SPECIAL_TAGS_NO_OPTION = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?)$/,
    RE_EVENTS_PREFIX = /^on/,
    RE_HTML_ATTRS = /([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g,
    // some DOM attributes must be normalized
    CASE_SENSITIVE_ATTRIBUTES = {
      'viewbox': 'viewBox',
      'preserveaspectratio': 'preserveAspectRatio'
    },
    /**
     * Matches boolean HTML attributes in the riot tag definition.
     * With a long list like this, a regex is faster than `[].indexOf` in most browsers.
     * @const {RegExp}
     * @see [attributes.md](https://github.com/riot/compiler/blob/dev/doc/attributes.md)
     */
    RE_BOOL_ATTRS = /^(?:disabled|checked|readonly|required|allowfullscreen|auto(?:focus|play)|compact|controls|default|formnovalidate|hidden|ismap|itemscope|loop|multiple|muted|no(?:resize|shade|validate|wrap)?|open|reversed|seamless|selected|sortable|truespeed|typemustmatch)$/,
    // version# for IE 8-11, 0 for others
    IE_VERSION = (WIN && WIN.document || /* istanbul ignore next */ {}).documentMode | 0;

  /**
   * Create a generic DOM node
   * @param   { String } name - name of the DOM node we want to create
   * @returns { Object } DOM node just created
   */
  function makeElement(name) {
    return name === 'svg' ? document.createElementNS(SVG_NS, name) : document.createElement(name)
  }

  /**
   * Set any DOM attribute
   * @param { Object } dom - DOM node we want to update
   * @param { String } name - name of the property we want to set
   * @param { String } val - value of the property we want to set
   */
  function setAttribute(dom, name, val) {
    var xlink = XLINK_REGEX.exec(name);
    if (xlink && xlink[1])
      { dom.setAttributeNS(XLINK_NS, xlink[1], val); }
    else
      { dom.setAttribute(name, val); }
  }

  var styleNode;
  // Create cache and shortcut to the correct property
  var cssTextProp;
  var byName = {};
  var needsInject = false;

  // skip the following code on the server
  if (WIN) {
    styleNode = ((function () {
      // create a new style element with the correct type
      var newNode = makeElement('style');
      // replace any user node or insert the new one into the head
      var userNode = $('style[type=riot]');

      setAttribute(newNode, 'type', 'text/css');
      /* istanbul ignore next */
      if (userNode) {
        if (userNode.id) { newNode.id = userNode.id; }
        userNode.parentNode.replaceChild(newNode, userNode);
      } else { document.head.appendChild(newNode); }

      return newNode
    }))();
    cssTextProp = styleNode.styleSheet;
  }

  /**
   * Object that will be used to inject and manage the css of every tag instance
   */
  var styleManager = {
    styleNode: styleNode,
    /**
     * Save a tag style to be later injected into DOM
     * @param { String } css - css string
     * @param { String } name - if it's passed we will map the css to a tagname
     */
    add: function add(css, name) {
      byName[name] = css;
      needsInject = true;
    },
    /**
     * Inject all previously saved tag styles into DOM
     * innerHTML seems slow: http://jsperf.com/riot-insert-style
     */
    inject: function inject() {
      if (!WIN || !needsInject) { return }
      needsInject = false;
      var style = Object.keys(byName)
        .map(function (k) { return byName[k]; })
        .join('\n');
      /* istanbul ignore next */
      if (cssTextProp) { cssTextProp.cssText = style; }
      else { styleNode.innerHTML = style; }
    },

    /**
     * Remove a tag style of injected DOM later.
     * @param {String} name a registered tagname
     */
    remove: function remove(name) {
      delete byName[name];
      needsInject = true;
    }
  };

  /**
   * The riot template engine
   * @version v3.0.8
   */

  var skipRegex = (function () { //eslint-disable-line no-unused-vars

    var beforeReChars = '[{(,;:?=|&!^~>%*/';

    var beforeReWords = [
      'case',
      'default',
      'do',
      'else',
      'in',
      'instanceof',
      'prefix',
      'return',
      'typeof',
      'void',
      'yield'
    ];

    var wordsLastChar = beforeReWords.reduce(function (s, w) {
      return s + w.slice(-1)
    }, '');

    var RE_REGEX = /^\/(?=[^*>/])[^[/\\]*(?:(?:\\.|\[(?:\\.|[^\]\\]*)*\])[^[\\/]*)*?\/[gimuy]*/;
    var RE_VN_CHAR = /[$\w]/;

    function prev (code, pos) {
      while (--pos >= 0 && /\s/.test(code[pos])){ }
      return pos
    }

    function _skipRegex (code, start) {

      var re = /.*/g;
      var pos = re.lastIndex = start++;
      var match = re.exec(code)[0].match(RE_REGEX);

      if (match) {
        var next = pos + match[0].length;

        pos = prev(code, pos);
        var c = code[pos];

        if (pos < 0 || ~beforeReChars.indexOf(c)) {
          return next
        }

        if (c === '.') {

          if (code[pos - 1] === '.') {
            start = next;
          }

        } else if (c === '+' || c === '-') {

          if (code[--pos] !== c ||
              (pos = prev(code, pos)) < 0 ||
              !RE_VN_CHAR.test(code[pos])) {
            start = next;
          }

        } else if (~wordsLastChar.indexOf(c)) {

          var end = pos + 1;

          while (--pos >= 0 && RE_VN_CHAR.test(code[pos])){ }
          if (~beforeReWords.indexOf(code.slice(pos + 1, end))) {
            start = next;
          }
        }
      }

      return start
    }

    return _skipRegex

  })();

  /**
   * riot.util.brackets
   *
   * - `brackets    ` - Returns a string or regex based on its parameter
   * - `brackets.set` - Change the current riot brackets
   *
   * @module
   */

  /* global riot */

  var brackets = (function (UNDEF) {

    var
      REGLOB = 'g',

      R_MLCOMMS = /\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\//g,

      R_STRINGS = /"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'|`[^`\\]*(?:\\[\S\s][^`\\]*)*`/g,

      S_QBLOCKS = R_STRINGS.source + '|' +
        /(?:\breturn\s+|(?:[$\w\)\]]|\+\+|--)\s*(\/)(?![*\/]))/.source + '|' +
        /\/(?=[^*\/])[^[\/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[\/\\]*)*?([^<]\/)[gim]*/.source,

      UNSUPPORTED = RegExp('[\\' + 'x00-\\x1F<>a-zA-Z0-9\'",;\\\\]'),

      NEED_ESCAPE = /(?=[[\]()*+?.^$|])/g,

      S_QBLOCK2 = R_STRINGS.source + '|' + /(\/)(?![*\/])/.source,

      FINDBRACES = {
        '(': RegExp('([()])|'   + S_QBLOCK2, REGLOB),
        '[': RegExp('([[\\]])|' + S_QBLOCK2, REGLOB),
        '{': RegExp('([{}])|'   + S_QBLOCK2, REGLOB)
      },

      DEFAULT = '{ }';

    var _pairs = [
      '{', '}',
      '{', '}',
      /{[^}]*}/,
      /\\([{}])/g,
      /\\({)|{/g,
      RegExp('\\\\(})|([[({])|(})|' + S_QBLOCK2, REGLOB),
      DEFAULT,
      /^\s*{\^?\s*([$\w]+)(?:\s*,\s*(\S+))?\s+in\s+(\S.*)\s*}/,
      /(^|[^\\]){=[\S\s]*?}/
    ];

    var
      cachedBrackets = UNDEF,
      _regex,
      _cache = [],
      _settings;

    function _loopback (re) { return re }

    function _rewrite (re, bp) {
      if (!bp) { bp = _cache; }
      return new RegExp(
        re.source.replace(/{/g, bp[2]).replace(/}/g, bp[3]), re.global ? REGLOB : ''
      )
    }

    function _create (pair) {
      if (pair === DEFAULT) { return _pairs }

      var arr = pair.split(' ');

      if (arr.length !== 2 || UNSUPPORTED.test(pair)) {
        throw new Error('Unsupported brackets "' + pair + '"')
      }
      arr = arr.concat(pair.replace(NEED_ESCAPE, '\\').split(' '));

      arr[4] = _rewrite(arr[1].length > 1 ? /{[\S\s]*?}/ : _pairs[4], arr);
      arr[5] = _rewrite(pair.length > 3 ? /\\({|})/g : _pairs[5], arr);
      arr[6] = _rewrite(_pairs[6], arr);
      arr[7] = RegExp('\\\\(' + arr[3] + ')|([[({])|(' + arr[3] + ')|' + S_QBLOCK2, REGLOB);
      arr[8] = pair;
      return arr
    }

    function _brackets (reOrIdx) {
      return reOrIdx instanceof RegExp ? _regex(reOrIdx) : _cache[reOrIdx]
    }

    _brackets.split = function split (str, tmpl, _bp) {
      // istanbul ignore next: _bp is for the compiler
      if (!_bp) { _bp = _cache; }

      var
        parts = [],
        match,
        isexpr,
        start,
        pos,
        re = _bp[6];

      var qblocks = [];
      var prevStr = '';
      var mark, lastIndex;

      isexpr = start = re.lastIndex = 0;

      while ((match = re.exec(str))) {

        lastIndex = re.lastIndex;
        pos = match.index;

        if (isexpr) {

          if (match[2]) {

            var ch = match[2];
            var rech = FINDBRACES[ch];
            var ix = 1;

            rech.lastIndex = lastIndex;
            while ((match = rech.exec(str))) {
              if (match[1]) {
                if (match[1] === ch) { ++ix; }
                else if (!--ix) { break }
              } else {
                rech.lastIndex = pushQBlock(match.index, rech.lastIndex, match[2]);
              }
            }
            re.lastIndex = ix ? str.length : rech.lastIndex;
            continue
          }

          if (!match[3]) {
            re.lastIndex = pushQBlock(pos, lastIndex, match[4]);
            continue
          }
        }

        if (!match[1]) {
          unescapeStr(str.slice(start, pos));
          start = re.lastIndex;
          re = _bp[6 + (isexpr ^= 1)];
          re.lastIndex = start;
        }
      }

      if (str && start < str.length) {
        unescapeStr(str.slice(start));
      }

      parts.qblocks = qblocks;

      return parts

      function unescapeStr (s) {
        if (prevStr) {
          s = prevStr + s;
          prevStr = '';
        }
        if (tmpl || isexpr) {
          parts.push(s && s.replace(_bp[5], '$1'));
        } else {
          parts.push(s);
        }
      }

      function pushQBlock(_pos, _lastIndex, slash) { //eslint-disable-line
        if (slash) {
          _lastIndex = skipRegex(str, _pos);
        }

        if (tmpl && _lastIndex > _pos + 2) {
          mark = '\u2057' + qblocks.length + '~';
          qblocks.push(str.slice(_pos, _lastIndex));
          prevStr += str.slice(start, _pos) + mark;
          start = _lastIndex;
        }
        return _lastIndex
      }
    };

    _brackets.hasExpr = function hasExpr (str) {
      return _cache[4].test(str)
    };

    _brackets.loopKeys = function loopKeys (expr) {
      var m = expr.match(_cache[9]);

      return m
        ? { key: m[1], pos: m[2], val: _cache[0] + m[3].trim() + _cache[1] }
        : { val: expr.trim() }
    };

    _brackets.array = function array (pair) {
      return pair ? _create(pair) : _cache
    };

    function _reset (pair) {
      if ((pair || (pair = DEFAULT)) !== _cache[8]) {
        _cache = _create(pair);
        _regex = pair === DEFAULT ? _loopback : _rewrite;
        _cache[9] = _regex(_pairs[9]);
      }
      cachedBrackets = pair;
    }

    function _setSettings (o) {
      var b;

      o = o || {};
      b = o.brackets;
      Object.defineProperty(o, 'brackets', {
        set: _reset,
        get: function () { return cachedBrackets },
        enumerable: true
      });
      _settings = o;
      _reset(b);
    }

    Object.defineProperty(_brackets, 'settings', {
      set: _setSettings,
      get: function () { return _settings }
    });

    /* istanbul ignore next: in the browser riot is always in the scope */
    _brackets.settings = typeof riot !== 'undefined' && riot.settings || {};
    _brackets.set = _reset;
    _brackets.skipRegex = skipRegex;

    _brackets.R_STRINGS = R_STRINGS;
    _brackets.R_MLCOMMS = R_MLCOMMS;
    _brackets.S_QBLOCKS = S_QBLOCKS;
    _brackets.S_QBLOCK2 = S_QBLOCK2;

    return _brackets

  })();

  /**
   * @module tmpl
   *
   * tmpl          - Root function, returns the template value, render with data
   * tmpl.hasExpr  - Test the existence of a expression inside a string
   * tmpl.loopKeys - Get the keys for an 'each' loop (used by `_each`)
   */

  var tmpl = (function () {

    var _cache = {};

    function _tmpl (str, data) {
      if (!str) { return str }

      return (_cache[str] || (_cache[str] = _create(str))).call(
        data, _logErr.bind({
          data: data,
          tmpl: str
        })
      )
    }

    _tmpl.hasExpr = brackets.hasExpr;

    _tmpl.loopKeys = brackets.loopKeys;

    // istanbul ignore next
    _tmpl.clearCache = function () { _cache = {}; };

    _tmpl.errorHandler = null;

    function _logErr (err, ctx) {

      err.riotData = {
        tagName: ctx && ctx.__ && ctx.__.tagName,
        _riot_id: ctx && ctx._riot_id  //eslint-disable-line camelcase
      };

      if (_tmpl.errorHandler) { _tmpl.errorHandler(err); }
      else if (
        typeof console !== 'undefined' &&
        typeof console.error === 'function'
      ) {
        console.error(err.message);
        console.log('<%s> %s', err.riotData.tagName || 'Unknown tag', this.tmpl); // eslint-disable-line
        console.log(this.data); // eslint-disable-line
      }
    }

    function _create (str) {
      var expr = _getTmpl(str);

      if (expr.slice(0, 11) !== 'try{return ') { expr = 'return ' + expr; }

      return new Function('E', expr + ';')    // eslint-disable-line no-new-func
    }

    var RE_DQUOTE = /\u2057/g;
    var RE_QBMARK = /\u2057(\d+)~/g;

    function _getTmpl (str) {
      var parts = brackets.split(str.replace(RE_DQUOTE, '"'), 1);
      var qstr = parts.qblocks;
      var expr;

      if (parts.length > 2 || parts[0]) {
        var i, j, list = [];

        for (i = j = 0; i < parts.length; ++i) {

          expr = parts[i];

          if (expr && (expr = i & 1

              ? _parseExpr(expr, 1, qstr)

              : '"' + expr
                  .replace(/\\/g, '\\\\')
                  .replace(/\r\n?|\n/g, '\\n')
                  .replace(/"/g, '\\"') +
                '"'

            )) { list[j++] = expr; }

        }

        expr = j < 2 ? list[0]
             : '[' + list.join(',') + '].join("")';

      } else {

        expr = _parseExpr(parts[1], 0, qstr);
      }

      if (qstr.length) {
        expr = expr.replace(RE_QBMARK, function (_, pos) {
          return qstr[pos]
            .replace(/\r/g, '\\r')
            .replace(/\n/g, '\\n')
        });
      }
      return expr
    }

    var RE_CSNAME = /^(?:(-?[_A-Za-z\xA0-\xFF][-\w\xA0-\xFF]*)|\u2057(\d+)~):/;
    var
      RE_BREND = {
        '(': /[()]/g,
        '[': /[[\]]/g,
        '{': /[{}]/g
      };

    function _parseExpr (expr, asText, qstr) {

      expr = expr
        .replace(/\s+/g, ' ').trim()
        .replace(/\ ?([[\({},?\.:])\ ?/g, '$1');

      if (expr) {
        var
          list = [],
          cnt = 0,
          match;

        while (expr &&
              (match = expr.match(RE_CSNAME)) &&
              !match.index
          ) {
          var
            key,
            jsb,
            re = /,|([[{(])|$/g;

          expr = RegExp.rightContext;
          key  = match[2] ? qstr[match[2]].slice(1, -1).trim().replace(/\s+/g, ' ') : match[1];

          while (jsb = (match = re.exec(expr))[1]) { skipBraces(jsb, re); }

          jsb  = expr.slice(0, match.index);
          expr = RegExp.rightContext;

          list[cnt++] = _wrapExpr(jsb, 1, key);
        }

        expr = !cnt ? _wrapExpr(expr, asText)
             : cnt > 1 ? '[' + list.join(',') + '].join(" ").trim()' : list[0];
      }
      return expr

      function skipBraces (ch, re) {
        var
          mm,
          lv = 1,
          ir = RE_BREND[ch];

        ir.lastIndex = re.lastIndex;
        while (mm = ir.exec(expr)) {
          if (mm[0] === ch) { ++lv; }
          else if (!--lv) { break }
        }
        re.lastIndex = lv ? expr.length : ir.lastIndex;
      }
    }

    // istanbul ignore next: not both
    var // eslint-disable-next-line max-len
      JS_CONTEXT = '"in this?this:' + (typeof window !== 'object' ? 'global' : 'window') + ').',
      JS_VARNAME = /[,{][\$\w]+(?=:)|(^ *|[^$\w\.{])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g,
      JS_NOPROPS = /^(?=(\.[$\w]+))\1(?:[^.[(]|$)/;

    function _wrapExpr (expr, asText, key) {
      var tb;

      expr = expr.replace(JS_VARNAME, function (match, p, mvar, pos, s) {
        if (mvar) {
          pos = tb ? 0 : pos + match.length;

          if (mvar !== 'this' && mvar !== 'global' && mvar !== 'window') {
            match = p + '("' + mvar + JS_CONTEXT + mvar;
            if (pos) { tb = (s = s[pos]) === '.' || s === '(' || s === '['; }
          } else if (pos) {
            tb = !JS_NOPROPS.test(s.slice(pos));
          }
        }
        return match
      });

      if (tb) {
        expr = 'try{return ' + expr + '}catch(e){E(e,this)}';
      }

      if (key) {

        expr = (tb
            ? 'function(){' + expr + '}.call(this)' : '(' + expr + ')'
          ) + '?"' + key + '":""';

      } else if (asText) {

        expr = 'function(v){' + (tb
            ? expr.replace('return ', 'v=') : 'v=(' + expr + ')'
          ) + ';return v||v===0?v:""}.call(this)';
      }

      return expr
    }

    _tmpl.version = brackets.version = 'v3.0.8';

    return _tmpl

  })();

  var observable = function(el) {

    /**
     * Extend the original object or create a new empty one
     * @type { Object }
     */

    el = el || {};

    /**
     * Private variables
     */
    var callbacks = {},
      slice = Array.prototype.slice;

    /**
     * Public Api
     */

    // extend the el object adding the observable methods
    Object.defineProperties(el, {
      /**
       * Listen to the given `event` ands
       * execute the `callback` each time an event is triggered.
       * @param  { String } event - event id
       * @param  { Function } fn - callback function
       * @returns { Object } el
       */
      on: {
        value: function(event, fn) {
          if (typeof fn == 'function')
            { (callbacks[event] = callbacks[event] || []).push(fn); }
          return el
        },
        enumerable: false,
        writable: false,
        configurable: false
      },

      /**
       * Removes the given `event` listeners
       * @param   { String } event - event id
       * @param   { Function } fn - callback function
       * @returns { Object } el
       */
      off: {
        value: function(event, fn) {
          if (event == '*' && !fn) { callbacks = {}; }
          else {
            if (fn) {
              var arr = callbacks[event];
              for (var i = 0, cb; cb = arr && arr[i]; ++i) {
                if (cb == fn) { arr.splice(i--, 1); }
              }
            } else { delete callbacks[event]; }
          }
          return el
        },
        enumerable: false,
        writable: false,
        configurable: false
      },

      /**
       * Listen to the given `event` and
       * execute the `callback` at most once
       * @param   { String } event - event id
       * @param   { Function } fn - callback function
       * @returns { Object } el
       */
      one: {
        value: function(event, fn) {
          function on() {
            el.off(event, on);
            fn.apply(el, arguments);
          }
          return el.on(event, on)
        },
        enumerable: false,
        writable: false,
        configurable: false
      },

      /**
       * Execute all callback functions that listen to
       * the given `event`
       * @param   { String } event - event id
       * @returns { Object } el
       */
      trigger: {
        value: function(event) {
          var arguments$1 = arguments;


          // getting the arguments
          var arglen = arguments.length - 1,
            args = new Array(arglen),
            fns,
            fn,
            i;

          for (i = 0; i < arglen; i++) {
            args[i] = arguments$1[i + 1]; // skip first argument
          }

          fns = slice.call(callbacks[event] || [], 0);

          for (i = 0; fn = fns[i]; ++i) {
            fn.apply(el, args);
          }

          if (callbacks['*'] && event != '*')
            { el.trigger.apply(el, ['*', event].concat(args)); }

          return el
        },
        enumerable: false,
        writable: false,
        configurable: false
      }
    });

    return el

  };

  /**
   * Short alias for Object.getOwnPropertyDescriptor
   */
  function getPropDescriptor (o, k) {
    return Object.getOwnPropertyDescriptor(o, k)
  }

  /**
   * Check if passed argument is undefined
   * @param   { * } value -
   * @returns { Boolean } -
   */
  function isUndefined(value) {
    return typeof value === T_UNDEF
  }

  /**
   * Check whether object's property could be overridden
   * @param   { Object }  obj - source object
   * @param   { String }  key - object property
   * @returns { Boolean } true if writable
   */
  function isWritable(obj, key) {
    var descriptor = getPropDescriptor(obj, key);
    return isUndefined(obj[key]) || descriptor && descriptor.writable
  }

  /**
   * Extend any object with other properties
   * @param   { Object } src - source object
   * @returns { Object } the resulting extended object
   *
   * var obj = { foo: 'baz' }
   * extend(obj, {bar: 'bar', foo: 'bar'})
   * console.log(obj) => {bar: 'bar', foo: 'bar'}
   *
   */
  function extend(src) {
    var obj;
    var i = 1;
    var args = arguments;
    var l = args.length;

    for (; i < l; i++) {
      if (obj = args[i]) {
        for (var key in obj) {
          // check if this property of the source object could be overridden
          if (isWritable(src, key))
            { src[key] = obj[key]; }
        }
      }
    }
    return src
  }

  /**
   * Alias for Object.create
   */
  function create(src) {
    return Object.create(src)
  }

  var settings = extend(create(brackets.settings), {
    skipAnonymousTags: true,
    // the "value" attributes will be preserved
    keepValueAttributes: false,
    // handle the auto updates on any DOM event
    autoUpdate: true
  });

  /**
   * Shorter and fast way to select multiple nodes in the DOM
   * @param   { String } selector - DOM selector
   * @param   { Object } ctx - DOM node where the targets of our search will is located
   * @returns { Object } dom nodes found
   */
  function $$(selector, ctx) {
    return [].slice.call((ctx || document).querySelectorAll(selector))
  }

  /**
   * Create a document text node
   * @returns { Object } create a text node to use as placeholder
   */
  function createDOMPlaceholder() {
    return document.createTextNode('')
  }

  /**
   * Toggle the visibility of any DOM node
   * @param   { Object }  dom - DOM node we want to hide
   * @param   { Boolean } show - do we want to show it?
   */

  function toggleVisibility(dom, show) {
    dom.style.display = show ? '' : 'none';
    dom.hidden = show ? false : true;
  }

  /**
   * Get the value of any DOM attribute on a node
   * @param   { Object } dom - DOM node we want to parse
   * @param   { String } name - name of the attribute we want to get
   * @returns { String | undefined } name of the node attribute whether it exists
   */
  function getAttribute(dom, name) {
    return dom.getAttribute(name)
  }

  /**
   * Remove any DOM attribute from a node
   * @param   { Object } dom - DOM node we want to update
   * @param   { String } name - name of the property we want to remove
   */
  function removeAttribute(dom, name) {
    dom.removeAttribute(name);
  }

  /**
   * Set the inner html of any DOM node SVGs included
   * @param { Object } container - DOM node where we'll inject new html
   * @param { String } html - html to inject
   * @param { Boolean } isSvg - svg tags should be treated a bit differently
   */
  /* istanbul ignore next */
  function setInnerHTML(container, html, isSvg) {
    // innerHTML is not supported on svg tags so we neet to treat them differently
    if (isSvg) {
      var node = container.ownerDocument.importNode(
        new DOMParser()
          .parseFromString(("<svg xmlns=\"" + SVG_NS + "\">" + html + "</svg>"), 'application/xml')
          .documentElement,
        true
      );

      container.appendChild(node);
    } else {
      container.innerHTML = html;
    }
  }

  /**
   * Minimize risk: only zero or one _space_ between attr & value
   * @param   { String }   html - html string we want to parse
   * @param   { Function } fn - callback function to apply on any attribute found
   */
  function walkAttributes(html, fn) {
    if (!html) { return }
    var m;
    while (m = RE_HTML_ATTRS.exec(html))
      { fn(m[1].toLowerCase(), m[2] || m[3] || m[4]); }
  }

  /**
   * Create a document fragment
   * @returns { Object } document fragment
   */
  function createFragment() {
    return document.createDocumentFragment()
  }

  /**
   * Insert safely a tag to fix #1962 #1649
   * @param   { HTMLElement } root - children container
   * @param   { HTMLElement } curr - node to insert
   * @param   { HTMLElement } next - node that should preceed the current node inserted
   */
  function safeInsert(root, curr, next) {
    root.insertBefore(curr, next.parentNode && next);
  }

  /**
   * Convert a style object to a string
   * @param   { Object } style - style object we need to parse
   * @returns { String } resulting css string
   * @example
   * styleObjectToString({ color: 'red', height: '10px'}) // => 'color: red; height: 10px'
   */
  function styleObjectToString(style) {
    return Object.keys(style).reduce(function (acc, prop) {
      return (acc + " " + prop + ": " + (style[prop]) + ";")
    }, '')
  }

  /**
   * Walk down recursively all the children tags starting dom node
   * @param   { Object }   dom - starting node where we will start the recursion
   * @param   { Function } fn - callback to transform the child node just found
   * @param   { Object }   context - fn can optionally return an object, which is passed to children
   */
  function walkNodes(dom, fn, context) {
    if (dom) {
      var res = fn(dom, context);
      var next;
      // stop the recursion
      if (res === false) { return }

      dom = dom.firstChild;

      while (dom) {
        next = dom.nextSibling;
        walkNodes(dom, fn, res);
        dom = next;
      }
    }
  }



  var dom = /*#__PURE__*/Object.freeze({
    $$: $$,
    $: $,
    createDOMPlaceholder: createDOMPlaceholder,
    mkEl: makeElement,
    setAttr: setAttribute,
    toggleVisibility: toggleVisibility,
    getAttr: getAttribute,
    remAttr: removeAttribute,
    setInnerHTML: setInnerHTML,
    walkAttrs: walkAttributes,
    createFrag: createFragment,
    safeInsert: safeInsert,
    styleObjectToString: styleObjectToString,
    walkNodes: walkNodes
  });

  /**
   * Check against the null and undefined values
   * @param   { * }  value -
   * @returns {Boolean} -
   */
  function isNil(value) {
    return isUndefined(value) || value === null
  }

  /**
   * Check if passed argument is empty. Different from falsy, because we dont consider 0 or false to be blank
   * @param { * } value -
   * @returns { Boolean } -
   */
  function isBlank(value) {
    return isNil(value) || value === ''
  }

  /**
   * Check if passed argument is a function
   * @param   { * } value -
   * @returns { Boolean } -
   */
  function isFunction(value) {
    return typeof value === T_FUNCTION
  }

  /**
   * Check if passed argument is an object, exclude null
   * NOTE: use isObject(x) && !isArray(x) to excludes arrays.
   * @param   { * } value -
   * @returns { Boolean } -
   */
  function isObject(value) {
    return value && typeof value === T_OBJECT // typeof null is 'object'
  }

  /**
   * Check if a DOM node is an svg tag or part of an svg
   * @param   { HTMLElement }  el - node we want to test
   * @returns {Boolean} true if it's an svg node
   */
  function isSvg(el) {
    var owner = el.ownerSVGElement;
    return !!owner || owner === null
  }

  /**
   * Check if passed argument is a kind of array
   * @param   { * } value -
   * @returns { Boolean } -
   */
  function isArray(value) {
    return Array.isArray(value) || value instanceof Array
  }

  /**
   * Check if the passed argument is a boolean attribute
   * @param   { String } value -
   * @returns { Boolean } -
   */
  function isBoolAttr(value) {
    return RE_BOOL_ATTRS.test(value)
  }

  /**
   * Check if passed argument is a string
   * @param   { * } value -
   * @returns { Boolean } -
   */
  function isString(value) {
    return typeof value === T_STRING
  }



  var check = /*#__PURE__*/Object.freeze({
    isBlank: isBlank,
    isFunction: isFunction,
    isObject: isObject,
    isSvg: isSvg,
    isWritable: isWritable,
    isArray: isArray,
    isBoolAttr: isBoolAttr,
    isNil: isNil,
    isString: isString,
    isUndefined: isUndefined
  });

  /**
   * Check whether an array contains an item
   * @param   { Array } array - target array
   * @param   { * } item - item to test
   * @returns { Boolean } -
   */
  function contains(array, item) {
    return array.indexOf(item) !== -1
  }

  /**
   * Specialized function for looping an array-like collection with `each={}`
   * @param   { Array } list - collection of items
   * @param   {Function} fn - callback function
   * @returns { Array } the array looped
   */
  function each(list, fn) {
    var len = list ? list.length : 0;
    var i = 0;
    for (; i < len; i++) { fn(list[i], i); }
    return list
  }

  /**
   * Faster String startsWith alternative
   * @param   { String } str - source string
   * @param   { String } value - test string
   * @returns { Boolean } -
   */
  function startsWith(str, value) {
    return str.slice(0, value.length) === value
  }

  /**
   * Function returning always a unique identifier
   * @returns { Number } - number from 0...n
   */
  var uid = (function uid() {
    var i = -1;
    return function () { return ++i; }
  })();

  /**
   * Helper function to set an immutable property
   * @param   { Object } el - object where the new property will be set
   * @param   { String } key - object key where the new property will be stored
   * @param   { * } value - value of the new property
   * @param   { Object } options - set the propery overriding the default options
   * @returns { Object } - the initial object
   */
  function define(el, key, value, options) {
    Object.defineProperty(el, key, extend({
      value: value,
      enumerable: false,
      writable: false,
      configurable: true
    }, options));
    return el
  }

  /**
   * Convert a string containing dashes to camel case
   * @param   { String } str - input string
   * @returns { String } my-string -> myString
   */
  function toCamel(str) {
    return str.replace(/-(\w)/g, function (_, c) { return c.toUpperCase(); })
  }

  /**
   * Warn a message via console
   * @param   {String} message - warning message
   */
  function warn(message) {
    if (console && console.warn) { console.warn(message); }
  }



  var misc = /*#__PURE__*/Object.freeze({
    contains: contains,
    each: each,
    getPropDescriptor: getPropDescriptor,
    startsWith: startsWith,
    uid: uid,
    defineProperty: define,
    objectCreate: create,
    extend: extend,
    toCamel: toCamel,
    warn: warn
  });

  /**
   * Set the property of an object for a given key. If something already
   * exists there, then it becomes an array containing both the old and new value.
   * @param { Object } obj - object on which to set the property
   * @param { String } key - property name
   * @param { Object } value - the value of the property to be set
   * @param { Boolean } ensureArray - ensure that the property remains an array
   * @param { Number } index - add the new item in a certain array position
   */
  function arrayishAdd(obj, key, value, ensureArray, index) {
    var dest = obj[key];
    var isArr = isArray(dest);
    var hasIndex = !isUndefined(index);

    if (dest && dest === value) { return }

    // if the key was never set, set it once
    if (!dest && ensureArray) { obj[key] = [value]; }
    else if (!dest) { obj[key] = value; }
    // if it was an array and not yet set
    else {
      if (isArr) {
        var oldIndex = dest.indexOf(value);
        // this item never changed its position
        if (oldIndex === index) { return }
        // remove the item from its old position
        if (oldIndex !== -1) { dest.splice(oldIndex, 1); }
        // move or add the item
        if (hasIndex) {
          dest.splice(index, 0, value);
        } else {
          dest.push(value);
        }
      } else { obj[key] = [dest, value]; }
    }
  }

  /**
   * Detect the tag implementation by a DOM node
   * @param   { Object } dom - DOM node we need to parse to get its tag implementation
   * @returns { Object } it returns an object containing the implementation of a custom tag (template and boot function)
   */
  function get(dom) {
    return dom.tagName && __TAG_IMPL[getAttribute(dom, IS_DIRECTIVE) ||
      getAttribute(dom, IS_DIRECTIVE) || dom.tagName.toLowerCase()]
  }

  /**
   * Get the tag name of any DOM node
   * @param   { Object } dom - DOM node we want to parse
   * @param   { Boolean } skipDataIs - hack to ignore the data-is attribute when attaching to parent
   * @returns { String } name to identify this dom node in riot
   */
  function getName(dom, skipDataIs) {
    var child = get(dom);
    var namedTag = !skipDataIs && getAttribute(dom, IS_DIRECTIVE);
    return namedTag && !tmpl.hasExpr(namedTag) ?
      namedTag : child ? child.name : dom.tagName.toLowerCase()
  }

  /**
   * Return a temporary context containing also the parent properties
   * @this Tag
   * @param { Tag } - temporary tag context containing all the parent properties
   */
  function inheritParentProps() {
    if (this.parent) { return extend(create(this), this.parent) }
    return this
  }

  /*
    Includes hacks needed for the Internet Explorer version 9 and below
    See: http://kangax.github.io/compat-table/es5/#ie8
         http://codeplanet.io/dropping-ie8/
  */

  var
    reHasYield  = /<yield\b/i,
    reYieldAll  = /<yield\s*(?:\/>|>([\S\s]*?)<\/yield\s*>|>)/ig,
    reYieldSrc  = /<yield\s+to=['"]([^'">]*)['"]\s*>([\S\s]*?)<\/yield\s*>/ig,
    reYieldDest = /<yield\s+from=['"]?([-\w]+)['"]?\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/ig,
    rootEls = { tr: 'tbody', th: 'tr', td: 'tr', col: 'colgroup' },
    tblTags = IE_VERSION && IE_VERSION < 10 ? RE_SPECIAL_TAGS : RE_SPECIAL_TAGS_NO_OPTION,
    GENERIC = 'div',
    SVG = 'svg';


  /*
    Creates the root element for table or select child elements:
    tr/th/td/thead/tfoot/tbody/caption/col/colgroup/option/optgroup
  */
  function specialTags(el, tmpl, tagName) {

    var
      select = tagName[0] === 'o',
      parent = select ? 'select>' : 'table>';

    // trim() is important here, this ensures we don't have artifacts,
    // so we can check if we have only one element inside the parent
    el.innerHTML = '<' + parent + tmpl.trim() + '</' + parent;
    parent = el.firstChild;

    // returns the immediate parent if tr/th/td/col is the only element, if not
    // returns the whole tree, as this can include additional elements
    /* istanbul ignore next */
    if (select) {
      parent.selectedIndex = -1;  // for IE9, compatible w/current riot behavior
    } else {
      // avoids insertion of cointainer inside container (ex: tbody inside tbody)
      var tname = rootEls[tagName];
      if (tname && parent.childElementCount === 1) { parent = $(tname, parent); }
    }
    return parent
  }

  /*
    Replace the yield tag from any tag template with the innerHTML of the
    original tag in the page
  */
  function replaceYield(tmpl, html) {
    // do nothing if no yield
    if (!reHasYield.test(tmpl)) { return tmpl }

    // be careful with #1343 - string on the source having `$1`
    var src = {};

    html = html && html.replace(reYieldSrc, function (_, ref, text) {
      src[ref] = src[ref] || text;   // preserve first definition
      return ''
    }).trim();

    return tmpl
      .replace(reYieldDest, function (_, ref, def) {  // yield with from - to attrs
        return src[ref] || def || ''
      })
      .replace(reYieldAll, function (_, def) {        // yield without any "from"
        return html || def || ''
      })
  }

  /**
   * Creates a DOM element to wrap the given content. Normally an `DIV`, but can be
   * also a `TABLE`, `SELECT`, `TBODY`, `TR`, or `COLGROUP` element.
   *
   * @param   { String } tmpl  - The template coming from the custom tag definition
   * @param   { String } html - HTML content that comes from the DOM element where you
   *           will mount the tag, mostly the original tag in the page
   * @param   { Boolean } isSvg - true if the root node is an svg
   * @returns { HTMLElement } DOM element with _tmpl_ merged through `YIELD` with the _html_.
   */
  function mkdom(tmpl, html, isSvg) {
    var match   = tmpl && tmpl.match(/^\s*<([-\w]+)/);
    var  tagName = match && match[1].toLowerCase();
    var el = makeElement(isSvg ? SVG : GENERIC);

    // replace all the yield tags with the tag inner html
    tmpl = replaceYield(tmpl, html);

    /* istanbul ignore next */
    if (tblTags.test(tagName))
      { el = specialTags(el, tmpl, tagName); }
    else
      { setInnerHTML(el, tmpl, isSvg); }

    return el
  }

  var EVENT_ATTR_RE = /^on/;

  /**
   * True if the event attribute starts with 'on'
   * @param   { String } attribute - event attribute
   * @returns { Boolean }
   */
  function isEventAttribute(attribute) {
    return EVENT_ATTR_RE.test(attribute)
  }

  /**
   * Loop backward all the parents tree to detect the first custom parent tag
   * @param   { Object } tag - a Tag instance
   * @returns { Object } the instance of the first custom parent tag found
   */
  function getImmediateCustomParent(tag) {
    var ptag = tag;
    while (ptag.__.isAnonymous) {
      if (!ptag.parent) { break }
      ptag = ptag.parent;
    }
    return ptag
  }

  /**
   * Trigger DOM events
   * @param   { HTMLElement } dom - dom element target of the event
   * @param   { Function } handler - user function
   * @param   { Object } e - event object
   */
  function handleEvent(dom, handler, e) {
    var ptag = this.__.parent;
    var item = this.__.item;

    if (!item)
      { while (ptag && !item) {
        item = ptag.__.item;
        ptag = ptag.__.parent;
      } }

    // override the event properties
    /* istanbul ignore next */
    if (isWritable(e, 'currentTarget')) { e.currentTarget = dom; }
    /* istanbul ignore next */
    if (isWritable(e, 'target')) { e.target = e.srcElement; }
    /* istanbul ignore next */
    if (isWritable(e, 'which')) { e.which = e.charCode || e.keyCode; }

    e.item = item;

    handler.call(this, e);

    // avoid auto updates
    if (!settings.autoUpdate) { return }

    if (!e.preventUpdate) {
      var p = getImmediateCustomParent(this);
      // fixes #2083
      if (p.isMounted) { p.update(); }
    }
  }

  /**
   * Attach an event to a DOM node
   * @param { String } name - event name
   * @param { Function } handler - event callback
   * @param { Object } dom - dom node
   * @param { Tag } tag - tag instance
   */
  function setEventHandler(name, handler, dom, tag) {
    var eventName;
    var cb = handleEvent.bind(tag, dom, handler);

    // avoid to bind twice the same event
    // possible fix for #2332
    dom[name] = null;

    // normalize event name
    eventName = name.replace(RE_EVENTS_PREFIX, '');

    // cache the listener into the listeners array
    if (!contains(tag.__.listeners, dom)) { tag.__.listeners.push(dom); }
    if (!dom[RIOT_EVENTS_KEY]) { dom[RIOT_EVENTS_KEY] = {}; }
    if (dom[RIOT_EVENTS_KEY][name]) { dom.removeEventListener(eventName, dom[RIOT_EVENTS_KEY][name]); }

    dom[RIOT_EVENTS_KEY][name] = cb;
    dom.addEventListener(eventName, cb, false);
  }

  /**
   * Create a new child tag including it correctly into its parent
   * @param   { Object } child - child tag implementation
   * @param   { Object } opts - tag options containing the DOM node where the tag will be mounted
   * @param   { String } innerHTML - inner html of the child node
   * @param   { Object } parent - instance of the parent tag including the child custom tag
   * @returns { Object } instance of the new child tag just created
   */
  function initChild(child, opts, innerHTML, parent) {
    var tag = createTag(child, opts, innerHTML);
    var tagName = opts.tagName || getName(opts.root, true);
    var ptag = getImmediateCustomParent(parent);
    // fix for the parent attribute in the looped elements
    define(tag, 'parent', ptag);
    // store the real parent tag
    // in some cases this could be different from the custom parent tag
    // for example in nested loops
    tag.__.parent = parent;

    // add this tag to the custom parent tag
    arrayishAdd(ptag.tags, tagName, tag);

    // and also to the real parent tag
    if (ptag !== parent)
      { arrayishAdd(parent.tags, tagName, tag); }

    return tag
  }

  /**
   * Removes an item from an object at a given key. If the key points to an array,
   * then the item is just removed from the array.
   * @param { Object } obj - object on which to remove the property
   * @param { String } key - property name
   * @param { Object } value - the value of the property to be removed
   * @param { Boolean } ensureArray - ensure that the property remains an array
  */
  function arrayishRemove(obj, key, value, ensureArray) {
    if (isArray(obj[key])) {
      var index = obj[key].indexOf(value);
      if (index !== -1) { obj[key].splice(index, 1); }
      if (!obj[key].length) { delete obj[key]; }
      else if (obj[key].length === 1 && !ensureArray) { obj[key] = obj[key][0]; }
    } else if (obj[key] === value)
      { delete obj[key]; } // otherwise just delete the key
  }

  /**
   * Adds the elements for a virtual tag
   * @this Tag
   * @param { Node } src - the node that will do the inserting or appending
   * @param { Tag } target - only if inserting, insert before this tag's first child
   */
  function makeVirtual(src, target) {
    var head = createDOMPlaceholder();
    var tail = createDOMPlaceholder();
    var frag = createFragment();
    var sib;
    var el;

    this.root.insertBefore(head, this.root.firstChild);
    this.root.appendChild(tail);

    this.__.head = el = head;
    this.__.tail = tail;

    while (el) {
      sib = el.nextSibling;
      frag.appendChild(el);
      this.__.virts.push(el); // hold for unmounting
      el = sib;
    }

    if (target)
      { src.insertBefore(frag, target.__.head); }
    else
      { src.appendChild(frag); }
  }

  /**
   * makes a tag virtual and replaces a reference in the dom
   * @this Tag
   * @param { tag } the tag to make virtual
   * @param { ref } the dom reference location
   */
  function makeReplaceVirtual(tag, ref) {
    if (!ref.parentNode) { return }
    var frag = createFragment();
    makeVirtual.call(tag, frag);
    ref.parentNode.replaceChild(frag, ref);
  }

  /**
   * Update dynamically created data-is tags with changing expressions
   * @param { Object } expr - expression tag and expression info
   * @param { Tag }    parent - parent for tag creation
   * @param { String } tagName - tag implementation we want to use
   */
  function updateDataIs(expr, parent, tagName) {
    var tag = expr.tag || expr.dom._tag;
    var ref;

    var ref$1 = tag ? tag.__ : {};
    var head = ref$1.head;
    var isVirtual = expr.dom.tagName === 'VIRTUAL';

    if (tag && expr.tagName === tagName) {
      tag.update();
      return
    }

    // sync _parent to accommodate changing tagnames
    if (tag) {
      // need placeholder before unmount
      if(isVirtual) {
        ref = createDOMPlaceholder();
        head.parentNode.insertBefore(ref, head);
      }

      tag.unmount(true);
    }

    // unable to get the tag name
    if (!isString(tagName)) { return }

    expr.impl = __TAG_IMPL[tagName];

    // unknown implementation
    if (!expr.impl) { return }

    expr.tag = tag = initChild(
      expr.impl, {
        root: expr.dom,
        parent: parent,
        tagName: tagName
      },
      expr.dom.innerHTML,
      parent
    );

    each(expr.attrs, function (a) { return setAttribute(tag.root, a.name, a.value); });
    expr.tagName = tagName;
    tag.mount();

    // root exist first time, after use placeholder
    if (isVirtual) { makeReplaceVirtual(tag, ref || tag.root); }

    // parent is the placeholder tag, not the dynamic tag so clean up
    parent.__.onUnmount = function () {
      var delName = tag.opts.dataIs;
      arrayishRemove(tag.parent.tags, delName, tag);
      arrayishRemove(tag.__.parent.tags, delName, tag);
      tag.unmount();
    };
  }

  /**
   * Nomalize any attribute removing the "riot-" prefix
   * @param   { String } attrName - original attribute name
   * @returns { String } valid html attribute name
   */
  function normalizeAttrName(attrName) {
    if (!attrName) { return null }
    attrName = attrName.replace(ATTRS_PREFIX, '');
    if (CASE_SENSITIVE_ATTRIBUTES[attrName]) { attrName = CASE_SENSITIVE_ATTRIBUTES[attrName]; }
    return attrName
  }

  /**
   * Update on single tag expression
   * @this Tag
   * @param { Object } expr - expression logic
   * @returns { undefined }
   */
  function updateExpression(expr) {
    if (this.root && getAttribute(this.root,'virtualized')) { return }

    var dom = expr.dom;
    // remove the riot- prefix
    var attrName = normalizeAttrName(expr.attr);
    var isToggle = contains([SHOW_DIRECTIVE, HIDE_DIRECTIVE], attrName);
    var isVirtual = expr.root && expr.root.tagName === 'VIRTUAL';
    var ref = this.__;
    var isAnonymous = ref.isAnonymous;
    var parent = dom && (expr.parent || dom.parentNode);
    var keepValueAttributes = settings.keepValueAttributes;
    // detect the style attributes
    var isStyleAttr = attrName === 'style';
    var isClassAttr = attrName === 'class';
    var isValueAttr = attrName === 'value';

    var value;

    // if it's a tag we could totally skip the rest
    if (expr._riot_id) {
      if (expr.__.wasCreated) {
        expr.update();
      // if it hasn't been mounted yet, do that now.
      } else {
        expr.mount();
        if (isVirtual) {
          makeReplaceVirtual(expr, expr.root);
        }
      }
      return
    }

    // if this expression has the update method it means it can handle the DOM changes by itself
    if (expr.update) { return expr.update() }

    var context = isToggle && !isAnonymous ? inheritParentProps.call(this) : this;

    // ...it seems to be a simple expression so we try to calculate its value
    value = tmpl(expr.expr, context);

    var hasValue = !isBlank(value);
    var isObj = isObject(value);

    // convert the style/class objects to strings
    if (isObj) {
      if (isClassAttr) {
        value = tmpl(JSON.stringify(value), this);
      } else if (isStyleAttr) {
        value = styleObjectToString(value);
      }
    }

    // remove original attribute
    if (expr.attr &&
        (
          // the original attribute can be removed only if we are parsing the original expression
          !expr.wasParsedOnce ||
          // or its value is false
          value === false ||
          // or if its value is currently falsy...
          // We will keep the "value" attributes if the "keepValueAttributes"
          // is enabled though
          (!hasValue && (!isValueAttr || isValueAttr && !keepValueAttributes))
        )
    ) {
      // remove either riot-* attributes or just the attribute name
      removeAttribute(dom, getAttribute(dom, expr.attr) ? expr.attr : attrName);
    }

    // for the boolean attributes we don't need the value
    // we can convert it to checked=true to checked=checked
    if (expr.bool) { value = value ? attrName : false; }
    if (expr.isRtag) { return updateDataIs(expr, this, value) }
    if (expr.wasParsedOnce && expr.value === value) { return }

    // update the expression value
    expr.value = value;
    expr.wasParsedOnce = true;

    // if the value is an object (and it's not a style or class attribute) we can not do much more with it
    if (isObj && !isClassAttr && !isStyleAttr && !isToggle) { return }
    // avoid to render undefined/null values
    if (!hasValue) { value = ''; }

    // textarea and text nodes have no attribute name
    if (!attrName) {
      // about #815 w/o replace: the browser converts the value to a string,
      // the comparison by "==" does too, but not in the server
      value += '';
      // test for parent avoids error with invalid assignment to nodeValue
      if (parent) {
        // cache the parent node because somehow it will become null on IE
        // on the next iteration
        expr.parent = parent;
        if (parent.tagName === 'TEXTAREA') {
          parent.value = value;                    // #1113
          if (!IE_VERSION) { dom.nodeValue = value; }  // #1625 IE throws here, nodeValue
        }                                         // will be available on 'updated'
        else { dom.nodeValue = value; }
      }
      return
    }

    switch (true) {
    // handle events binding
    case isFunction(value):
      if (isEventAttribute(attrName)) {
        setEventHandler(attrName, value, dom, this);
      }
      break
    // show / hide
    case isToggle:
      toggleVisibility(dom, attrName === HIDE_DIRECTIVE ? !value : value);
      break
    // handle attributes
    default:
      if (expr.bool) {
        dom[attrName] = value;
      }

      if (isValueAttr && dom.value !== value) {
        dom.value = value;
      } else if (hasValue && value !== false) {
        setAttribute(dom, attrName, value);
      }

      // make sure that in case of style changes
      // the element stays hidden
      if (isStyleAttr && dom.hidden) { toggleVisibility(dom, false); }
    }
  }

  /**
   * Update all the expressions in a Tag instance
   * @this Tag
   * @param { Array } expressions - expression that must be re evaluated
   */
  function update(expressions) {
    each(expressions, updateExpression.bind(this));
  }

  /**
   * We need to update opts for this tag. That requires updating the expressions
   * in any attributes on the tag, and then copying the result onto opts.
   * @this Tag
   * @param   {Boolean} isLoop - is it a loop tag?
   * @param   { Tag }  parent - parent tag node
   * @param   { Boolean }  isAnonymous - is it a tag without any impl? (a tag not registered)
   * @param   { Object }  opts - tag options
   * @param   { Array }  instAttrs - tag attributes array
   */
  function updateOpts(isLoop, parent, isAnonymous, opts, instAttrs) {
    // isAnonymous `each` tags treat `dom` and `root` differently. In this case
    // (and only this case) we don't need to do updateOpts, because the regular parse
    // will update those attrs. Plus, isAnonymous tags don't need opts anyway
    if (isLoop && isAnonymous) { return }
    var ctx = isLoop ? inheritParentProps.call(this) : parent || this;

    each(instAttrs, function (attr) {
      if (attr.expr) { updateExpression.call(ctx, attr.expr); }
      // normalize the attribute names
      opts[toCamel(attr.name).replace(ATTRS_PREFIX, '')] = attr.expr ? attr.expr.value : attr.value;
    });
  }

  /**
   * Update the tag expressions and options
   * @param { Tag } tag - tag object
   * @param { * } data - data we want to use to extend the tag properties
   * @param { Array } expressions - component expressions array
   * @returns { Tag } the current tag instance
   */
  function componentUpdate(tag, data, expressions) {
    var __ = tag.__;
    var nextOpts = {};
    var canTrigger = tag.isMounted && !__.skipAnonymous;

    // inherit properties from the parent tag
    if (__.isAnonymous && __.parent) { extend(tag, __.parent); }
    extend(tag, data);

    updateOpts.apply(tag, [__.isLoop, __.parent, __.isAnonymous, nextOpts, __.instAttrs]);

    if (
      canTrigger &&
      tag.isMounted &&
      isFunction(tag.shouldUpdate) && !tag.shouldUpdate(data, nextOpts)
    ) {
      return tag
    }

    extend(tag.opts, nextOpts);

    if (canTrigger) { tag.trigger('update', data); }
    update.call(tag, expressions);
    if (canTrigger) { tag.trigger('updated'); }

    return tag
  }

  /**
   * Get selectors for tags
   * @param   { Array } tags - tag names to select
   * @returns { String } selector
   */
  function query(tags) {
    // select all tags
    if (!tags) {
      var keys = Object.keys(__TAG_IMPL);
      return keys + query(keys)
    }

    return tags
      .filter(function (t) { return !/[^-\w]/.test(t); })
      .reduce(function (list, t) {
        var name = t.trim().toLowerCase();
        return list + ",[" + IS_DIRECTIVE + "=\"" + name + "\"]"
      }, '')
  }

  /**
   * Another way to create a riot tag a bit more es6 friendly
   * @param { HTMLElement } el - tag DOM selector or DOM node/s
   * @param { Object } opts - tag logic
   * @returns { Tag } new riot tag instance
   */
  function Tag(el, opts) {
    // get the tag properties from the class constructor
    var ref = this;
    var name = ref.name;
    var tmpl = ref.tmpl;
    var css = ref.css;
    var attrs = ref.attrs;
    var onCreate = ref.onCreate;
    // register a new tag and cache the class prototype
    if (!__TAG_IMPL[name]) {
      tag(name, tmpl, css, attrs, onCreate);
      // cache the class constructor
      __TAG_IMPL[name].class = this.constructor;
    }

    // mount the tag using the class instance
    mount$1(el, name, opts, this);
    // inject the component css
    if (css) { styleManager.inject(); }

    return this
  }

  /**
   * Create a new riot tag implementation
   * @param   { String }   name - name/id of the new riot tag
   * @param   { String }   tmpl - tag template
   * @param   { String }   css - custom tag css
   * @param   { String }   attrs - root tag attributes
   * @param   { Function } fn - user function
   * @returns { String } name/id of the tag just created
   */
  function tag(name, tmpl, css, attrs, fn) {
    if (isFunction(attrs)) {
      fn = attrs;

      if (/^[\w-]+\s?=/.test(css)) {
        attrs = css;
        css = '';
      } else
        { attrs = ''; }
    }

    if (css) {
      if (isFunction(css))
        { fn = css; }
      else
        { styleManager.add(css, name); }
    }

    name = name.toLowerCase();
    __TAG_IMPL[name] = { name: name, tmpl: tmpl, attrs: attrs, fn: fn };

    return name
  }

  /**
   * Create a new riot tag implementation (for use by the compiler)
   * @param   { String }   name - name/id of the new riot tag
   * @param   { String }   tmpl - tag template
   * @param   { String }   css - custom tag css
   * @param   { String }   attrs - root tag attributes
   * @param   { Function } fn - user function
   * @returns { String } name/id of the tag just created
   */
  function tag2(name, tmpl, css, attrs, fn) {
    if (css) { styleManager.add(css, name); }

    __TAG_IMPL[name] = { name: name, tmpl: tmpl, attrs: attrs, fn: fn };

    return name
  }

  /**
   * Mount a tag using a specific tag implementation
   * @param   { * } selector - tag DOM selector or DOM node/s
   * @param   { String } tagName - tag implementation name
   * @param   { Object } opts - tag logic
   * @returns { Array } new tags instances
   */
  function mount(selector, tagName, opts) {
    var tags = [];
    var elem, allTags;

    function pushTagsTo(root) {
      if (root.tagName) {
        var riotTag = getAttribute(root, IS_DIRECTIVE), tag;

        // have tagName? force riot-tag to be the same
        if (tagName && riotTag !== tagName) {
          riotTag = tagName;
          setAttribute(root, IS_DIRECTIVE, tagName);
        }

        tag = mount$1(
          root,
          riotTag || root.tagName.toLowerCase(),
          isFunction(opts) ? opts() : opts
        );

        if (tag)
          { tags.push(tag); }
      } else if (root.length)
        { each(root, pushTagsTo); } // assume nodeList
    }

    // inject styles into DOM
    styleManager.inject();

    if (isObject(tagName) || isFunction(tagName)) {
      opts = tagName;
      tagName = 0;
    }

    // crawl the DOM to find the tag
    if (isString(selector)) {
      selector = selector === '*' ?
        // select all registered tags
        // & tags found with the riot-tag attribute set
        allTags = query() :
        // or just the ones named like the selector
        selector + query(selector.split(/, */));

      // make sure to pass always a selector
      // to the querySelectorAll function
      elem = selector ? $$(selector) : [];
    }
    else
      // probably you have passed already a tag or a NodeList
      { elem = selector; }

    // select all the registered and mount them inside their root elements
    if (tagName === '*') {
      // get all custom tags
      tagName = allTags || query();
      // if the root els it's just a single tag
      if (elem.tagName)
        { elem = $$(tagName, elem); }
      else {
        // select all the children for all the different root elements
        var nodeList = [];

        each(elem, function (_el) { return nodeList.push($$(tagName, _el)); });

        elem = nodeList;
      }
      // get rid of the tagName
      tagName = 0;
    }

    pushTagsTo(elem);

    return tags
  }

  // Create a mixin that could be globally shared across all the tags
  var mixins = {};
  var globals = mixins[GLOBAL_MIXIN] = {};
  var mixins_id = 0;

  /**
   * Create/Return a mixin by its name
   * @param   { String }  name - mixin name (global mixin if object)
   * @param   { Object }  mix - mixin logic
   * @param   { Boolean } g - is global?
   * @returns { Object }  the mixin logic
   */
  function mixin(name, mix, g) {
    // Unnamed global
    if (isObject(name)) {
      mixin(("__" + (mixins_id++) + "__"), name, true);
      return
    }

    var store = g ? globals : mixins;

    // Getter
    if (!mix) {
      if (isUndefined(store[name]))
        { throw new Error(("Unregistered mixin: " + name)) }

      return store[name]
    }

    // Setter
    store[name] = isFunction(mix) ?
      extend(mix.prototype, store[name] || {}) && mix :
      extend(store[name] || {}, mix);
  }

  /**
   * Update all the tags instances created
   * @returns { Array } all the tags instances
   */
  function update$1() {
    return each(__TAGS_CACHE, function (tag) { return tag.update(); })
  }

  function unregister(name) {
    styleManager.remove(name);
    return delete __TAG_IMPL[name]
  }

  var version = 'WIP';

  var core = /*#__PURE__*/Object.freeze({
    Tag: Tag,
    tag: tag,
    tag2: tag2,
    mount: mount,
    mixin: mixin,
    update: update$1,
    unregister: unregister,
    version: version
  });

  /**
   * Add a mixin to this tag
   * @returns { Tag } the current tag instance
   */
  function componentMixin(tag$$1) {
    var mixins = [], len = arguments.length - 1;
    while ( len-- > 0 ) mixins[ len ] = arguments[ len + 1 ];

    each(mixins, function (mix) {
      var instance;
      var obj;
      var props = [];

      // properties blacklisted and will not be bound to the tag instance
      var propsBlacklist = ['init', '__proto__'];

      mix = isString(mix) ? mixin(mix) : mix;

      // check if the mixin is a function
      if (isFunction(mix)) {
        // create the new mixin instance
        instance = new mix();
      } else { instance = mix; }

      var proto = Object.getPrototypeOf(instance);

      // build multilevel prototype inheritance chain property list
      do { props = props.concat(Object.getOwnPropertyNames(obj || instance)); }
      while (obj = Object.getPrototypeOf(obj || instance))

      // loop the keys in the function prototype or the all object keys
      each(props, function (key) {
        // bind methods to tag
        // allow mixins to override other properties/parent mixins
        if (!contains(propsBlacklist, key)) {
          // check for getters/setters
          var descriptor = getPropDescriptor(instance, key) || getPropDescriptor(proto, key);
          var hasGetterSetter = descriptor && (descriptor.get || descriptor.set);

          // apply method only if it does not already exist on the instance
          if (!tag$$1.hasOwnProperty(key) && hasGetterSetter) {
            Object.defineProperty(tag$$1, key, descriptor);
          } else {
            tag$$1[key] = isFunction(instance[key]) ?
              instance[key].bind(tag$$1) :
              instance[key];
          }
        }
      });

      // init method will be called automatically
      if (instance.init)
        { instance.init.bind(tag$$1)(tag$$1.opts); }
    });

    return tag$$1
  }

  /**
   * Move the position of a custom tag in its parent tag
   * @this Tag
   * @param   { String } tagName - key where the tag was stored
   * @param   { Number } newPos - index where the new tag will be stored
   */
  function moveChild(tagName, newPos) {
    var parent = this.parent;
    var tags;
    // no parent no move
    if (!parent) { return }

    tags = parent.tags[tagName];

    if (isArray(tags))
      { tags.splice(newPos, 0, tags.splice(tags.indexOf(this), 1)[0]); }
    else { arrayishAdd(parent.tags, tagName, this); }
  }

  /**
   * Move virtual tag and all child nodes
   * @this Tag
   * @param { Node } src  - the node that will do the inserting
   * @param { Tag } target - insert before this tag's first child
   */
  function moveVirtual(src, target) {
    var el = this.__.head;
    var sib;
    var frag = createFragment();

    while (el) {
      sib = el.nextSibling;
      frag.appendChild(el);
      el = sib;
      if (el === this.__.tail) {
        frag.appendChild(el);
        src.insertBefore(frag, target.__.head);
        break
      }
    }
  }

  /**
   * Convert the item looped into an object used to extend the child tag properties
   * @param   { Object } expr - object containing the keys used to extend the children tags
   * @param   { * } key - value to assign to the new object returned
   * @param   { * } val - value containing the position of the item in the array
   * @returns { Object } - new object containing the values of the original item
   *
   * The variables 'key' and 'val' are arbitrary.
   * They depend on the collection type looped (Array, Object)
   * and on the expression used on the each tag
   *
   */
  function mkitem(expr, key, val) {
    var item = {};
    item[expr.key] = key;
    if (expr.pos) { item[expr.pos] = val; }
    return item
  }

  /**
   * Unmount the redundant tags
   * @param   { Array } items - array containing the current items to loop
   * @param   { Array } tags - array containing all the children tags
   */
  function unmountRedundant(items, tags, filteredItemsCount) {
    var i = tags.length;
    var j = items.length - filteredItemsCount;

    while (i > j) {
      i--;
      remove.apply(tags[i], [tags, i]);
    }
  }


  /**
   * Remove a child tag
   * @this Tag
   * @param   { Array } tags - tags collection
   * @param   { Number } i - index of the tag to remove
   */
  function remove(tags, i) {
    tags.splice(i, 1);
    this.unmount();
    arrayishRemove(this.parent, this, this.__.tagName, true);
  }

  /**
   * Move the nested custom tags in non custom loop tags
   * @this Tag
   * @param   { Number } i - current position of the loop tag
   */
  function moveNestedTags(i) {
    var this$1 = this;

    each(Object.keys(this.tags), function (tagName) {
      moveChild.apply(this$1.tags[tagName], [tagName, i]);
    });
  }

  /**
   * Move a child tag
   * @this Tag
   * @param   { HTMLElement } root - dom node containing all the loop children
   * @param   { Tag } nextTag - instance of the next tag preceding the one we want to move
   * @param   { Boolean } isVirtual - is it a virtual tag?
   */
  function move(root, nextTag, isVirtual) {
    if (isVirtual)
      { moveVirtual.apply(this, [root, nextTag]); }
    else
      { safeInsert(root, this.root, nextTag.root); }
  }

  /**
   * Insert and mount a child tag
   * @this Tag
   * @param   { HTMLElement } root - dom node containing all the loop children
   * @param   { Tag } nextTag - instance of the next tag preceding the one we want to insert
   * @param   { Boolean } isVirtual - is it a virtual tag?
   */
  function insert(root, nextTag, isVirtual) {
    if (isVirtual)
      { makeVirtual.apply(this, [root, nextTag]); }
    else
      { safeInsert(root, this.root, nextTag.root); }
  }

  /**
   * Append a new tag into the DOM
   * @this Tag
   * @param   { HTMLElement } root - dom node containing all the loop children
   * @param   { Boolean } isVirtual - is it a virtual tag?
   */
  function append(root, isVirtual) {
    if (isVirtual)
      { makeVirtual.call(this, root); }
    else
      { root.appendChild(this.root); }
  }

  /**
   * Return the value we want to use to lookup the postion of our items in the collection
   * @param   { String }  keyAttr         - lookup string or expression
   * @param   { * }       originalItem    - original item from the collection
   * @param   { Object }  keyedItem       - object created by riot via { item, i in collection }
   * @param   { Boolean } hasKeyAttrExpr  - flag to check whether the key is an expression
   * @returns { * } value that we will use to figure out the item position via collection.indexOf
   */
  function getItemId(keyAttr, originalItem, keyedItem, hasKeyAttrExpr) {
    if (keyAttr) {
      return hasKeyAttrExpr ?  tmpl(keyAttr, keyedItem) :  originalItem[keyAttr]
    }

    return originalItem
  }

  /**
   * Manage tags having the 'each'
   * @param   { HTMLElement } dom - DOM node we need to loop
   * @param   { Tag } parent - parent tag instance where the dom node is contained
   * @param   { String } expr - string contained in the 'each' attribute
   * @returns { Object } expression object for this each loop
   */
  function _each(dom, parent, expr) {
    var mustReorder = typeof getAttribute(dom, LOOP_NO_REORDER_DIRECTIVE) !== T_STRING || removeAttribute(dom, LOOP_NO_REORDER_DIRECTIVE);
    var keyAttr = getAttribute(dom, KEY_DIRECTIVE);
    var hasKeyAttrExpr = keyAttr ? tmpl.hasExpr(keyAttr) : false;
    var tagName = getName(dom);
    var impl = __TAG_IMPL[tagName];
    var parentNode = dom.parentNode;
    var placeholder = createDOMPlaceholder();
    var child = get(dom);
    var ifExpr = getAttribute(dom, CONDITIONAL_DIRECTIVE);
    var tags = [];
    var isLoop = true;
    var innerHTML = dom.innerHTML;
    var isAnonymous = !__TAG_IMPL[tagName];
    var isVirtual = dom.tagName === 'VIRTUAL';
    var oldItems = [];

    // remove the each property from the original tag
    removeAttribute(dom, LOOP_DIRECTIVE);
    removeAttribute(dom, KEY_DIRECTIVE);

    // parse the each expression
    expr = tmpl.loopKeys(expr);
    expr.isLoop = true;

    if (ifExpr) { removeAttribute(dom, CONDITIONAL_DIRECTIVE); }

    // insert a marked where the loop tags will be injected
    parentNode.insertBefore(placeholder, dom);
    parentNode.removeChild(dom);

    expr.update = function updateEach() {
      // get the new items collection
      expr.value = tmpl(expr.val, parent);

      var items = expr.value;
      var frag = createFragment();
      var isObject = !isArray(items) && !isString(items);
      var root = placeholder.parentNode;
      var tmpItems = [];
      var hasKeys = isObject && !!items;

      // if this DOM was removed the update here is useless
      // this condition fixes also a weird async issue on IE in our unit test
      if (!root) { return }

      // object loop. any changes cause full redraw
      if (isObject) {
        items = items ? Object.keys(items).map(function (key) { return mkitem(expr, items[key], key); }) : [];
      }

      // store the amount of filtered items
      var filteredItemsCount = 0;

      // loop all the new items
      each(items, function (_item, index) {
        var i = index - filteredItemsCount;
        var item = !hasKeys && expr.key ? mkitem(expr, _item, index) : _item;

        // skip this item because it must be filtered
        if (ifExpr && !tmpl(ifExpr, extend(create(parent), item))) {
          filteredItemsCount ++;
          return
        }

        var itemId = getItemId(keyAttr, _item, item, hasKeyAttrExpr);
        // reorder only if the items are not objects
        // or a key attribute has been provided
        var doReorder = !isObject && mustReorder && typeof _item === T_OBJECT || keyAttr;
        var oldPos = oldItems.indexOf(itemId);
        var isNew = oldPos === -1;
        var pos = !isNew && doReorder ? oldPos : i;
        // does a tag exist in this position?
        var tag = tags[pos];
        var mustAppend = i >= oldItems.length;
        var mustCreate = doReorder && isNew || !doReorder && !tag || !tags[i];

        // new tag
        if (mustCreate) {
          tag = createTag(impl, {
            parent: parent,
            isLoop: isLoop,
            isAnonymous: isAnonymous,
            tagName: tagName,
            root: dom.cloneNode(isAnonymous),
            item: item,
            index: i,
          }, innerHTML);

          // mount the tag
          tag.mount();

          if (mustAppend)
            { append.apply(tag, [frag || root, isVirtual]); }
          else
            { insert.apply(tag, [root, tags[i], isVirtual]); }

          if (!mustAppend) { oldItems.splice(i, 0, item); }
          tags.splice(i, 0, tag);
          if (child) { arrayishAdd(parent.tags, tagName, tag, true); }
        } else if (pos !== i && doReorder) {
          // move
          if (keyAttr || contains(items, oldItems[pos])) {
            move.apply(tag, [root, tags[i], isVirtual]);
            // move the old tag instance
            tags.splice(i, 0, tags.splice(pos, 1)[0]);
            // move the old item
            oldItems.splice(i, 0, oldItems.splice(pos, 1)[0]);
          }

          // update the position attribute if it exists
          if (expr.pos) { tag[expr.pos] = i; }

          // if the loop tags are not custom
          // we need to move all their custom tags into the right position
          if (!child && tag.tags) { moveNestedTags.call(tag, i); }
        }

        // cache the original item to use it in the events bound to this node
        // and its children
        extend(tag.__, {
          item: item,
          index: i,
          parent: parent
        });

        tmpItems[i] = itemId;

        if (!mustCreate) { tag.update(item); }
      });

      // remove the redundant tags
      unmountRedundant(items, tags, filteredItemsCount);

      // clone the items array
      oldItems = tmpItems.slice();

      root.insertBefore(frag, placeholder);
    };

    expr.unmount = function () {
      each(tags, function (t) { t.unmount(); });
    };

    return expr
  }

  var RefExpr = {
    init: function init(dom, parent, attrName, attrValue) {
      this.dom = dom;
      this.attr = attrName;
      this.rawValue = attrValue;
      this.parent = parent;
      this.hasExp = tmpl.hasExpr(attrValue);
      return this
    },
    update: function update() {
      var old = this.value;
      var customParent = this.parent && getImmediateCustomParent(this.parent);
      // if the referenced element is a custom tag, then we set the tag itself, rather than DOM
      var tagOrDom = this.dom.__ref || this.tag || this.dom;

      this.value = this.hasExp ? tmpl(this.rawValue, this.parent) : this.rawValue;

      // the name changed, so we need to remove it from the old key (if present)
      if (!isBlank(old) && customParent) { arrayishRemove(customParent.refs, old, tagOrDom); }
      if (!isBlank(this.value) && isString(this.value)) {
        // add it to the refs of parent tag (this behavior was changed >=3.0)
        if (customParent) { arrayishAdd(
          customParent.refs,
          this.value,
          tagOrDom,
          // use an array if it's a looped node and the ref is not an expression
          null,
          this.parent.__.index
        ); }

        if (this.value !== old) {
          setAttribute(this.dom, this.attr, this.value);
        }
      } else {
        removeAttribute(this.dom, this.attr);
      }

      // cache the ref bound to this dom node
      // to reuse it in future (see also #2329)
      if (!this.dom.__ref) { this.dom.__ref = tagOrDom; }
    },
    unmount: function unmount() {
      var tagOrDom = this.tag || this.dom;
      var customParent = this.parent && getImmediateCustomParent(this.parent);
      if (!isBlank(this.value) && customParent)
        { arrayishRemove(customParent.refs, this.value, tagOrDom); }
    }
  };

  /**
   * Create a new ref directive
   * @param   { HTMLElement } dom - dom node having the ref attribute
   * @param   { Tag } context - tag instance where the DOM node is located
   * @param   { String } attrName - either 'ref' or 'data-ref'
   * @param   { String } attrValue - value of the ref attribute
   * @returns { RefExpr } a new RefExpr object
   */
  function createRefDirective(dom, tag, attrName, attrValue) {
    return create(RefExpr).init(dom, tag, attrName, attrValue)
  }

  /**
   * Trigger the unmount method on all the expressions
   * @param   { Array } expressions - DOM expressions
   */
  function unmountAll(expressions) {
    each(expressions, function (expr) {
      if (expr.unmount) { expr.unmount(true); }
      else if (expr.tagName) { expr.tag.unmount(true); }
      else if (expr.unmount) { expr.unmount(); }
    });
  }

  var IfExpr = {
    init: function init(dom, tag, expr) {
      removeAttribute(dom, CONDITIONAL_DIRECTIVE);
      extend(this, { tag: tag, expr: expr, stub: createDOMPlaceholder(), pristine: dom });
      var p = dom.parentNode;
      p.insertBefore(this.stub, dom);
      p.removeChild(dom);

      return this
    },
    update: function update$$1() {
      this.value = tmpl(this.expr, this.tag);

      if (!this.stub.parentNode) { return }

      if (this.value && !this.current) { // insert
        this.current = this.pristine.cloneNode(true);
        this.stub.parentNode.insertBefore(this.current, this.stub);
        this.expressions = parseExpressions.apply(this.tag, [this.current, true]);
      } else if (!this.value && this.current) { // remove
        this.unmount();
        this.current = null;
        this.expressions = [];
      }

      if (this.value) { update.call(this.tag, this.expressions); }
    },
    unmount: function unmount() {
      if (this.current) {
        if (this.current._tag) {
          this.current._tag.unmount();
        } else if (this.current.parentNode) {
          this.current.parentNode.removeChild(this.current);
        }
      }

      unmountAll(this.expressions || []);
    }
  };

  /**
   * Create a new if directive
   * @param   { HTMLElement } dom - if root dom node
   * @param   { Tag } context - tag instance where the DOM node is located
   * @param   { String } attr - if expression
   * @returns { IFExpr } a new IfExpr object
   */
  function createIfDirective(dom, tag, attr) {
    return create(IfExpr).init(dom, tag, attr)
  }

  /**
   * Walk the tag DOM to detect the expressions to evaluate
   * @this Tag
   * @param   { HTMLElement } root - root tag where we will start digging the expressions
   * @param   { Boolean } mustIncludeRoot - flag to decide whether the root must be parsed as well
   * @returns { Array } all the expressions found
   */
  function parseExpressions(root, mustIncludeRoot) {
    var this$1 = this;

    var expressions = [];

    walkNodes(root, function (dom) {
      var type = dom.nodeType;
      var attr;
      var tagImpl;

      if (!mustIncludeRoot && dom === root) { return }

      // text node
      if (type === 3 && dom.parentNode.tagName !== 'STYLE' && tmpl.hasExpr(dom.nodeValue))
        { expressions.push({dom: dom, expr: dom.nodeValue}); }

      if (type !== 1) { return }

      var isVirtual = dom.tagName === 'VIRTUAL';

      // loop. each does it's own thing (for now)
      if (attr = getAttribute(dom, LOOP_DIRECTIVE)) {
        if(isVirtual) { setAttribute(dom, 'loopVirtual', true); } // ignore here, handled in _each
        expressions.push(_each(dom, this$1, attr));
        return false
      }

      // if-attrs become the new parent. Any following expressions (either on the current
      // element, or below it) become children of this expression.
      if (attr = getAttribute(dom, CONDITIONAL_DIRECTIVE)) {
        expressions.push(createIfDirective(dom, this$1, attr));
        return false
      }

      if (attr = getAttribute(dom, IS_DIRECTIVE)) {
        if (tmpl.hasExpr(attr)) {
          expressions.push({
            isRtag: true,
            expr: attr,
            dom: dom,
            attrs: [].slice.call(dom.attributes)
          });

          return false
        }
      }

      // if this is a tag, stop traversing here.
      // we ignore the root, since parseExpressions is called while we're mounting that root
      tagImpl = get(dom);

      if(isVirtual) {
        if(getAttribute(dom, 'virtualized')) {dom.parentElement.removeChild(dom); } // tag created, remove from dom
        if(!tagImpl && !getAttribute(dom, 'virtualized') && !getAttribute(dom, 'loopVirtual'))  // ok to create virtual tag
          { tagImpl = { tmpl: dom.outerHTML }; }
      }

      if (tagImpl && (dom !== root || mustIncludeRoot)) {
        var hasIsDirective = getAttribute(dom, IS_DIRECTIVE);
        if(isVirtual && !hasIsDirective) { // handled in update
          // can not remove attribute like directives
          // so flag for removal after creation to prevent maximum stack error
          setAttribute(dom, 'virtualized', true);
          var tag = createTag(
            {tmpl: dom.outerHTML},
            {root: dom, parent: this$1},
            dom.innerHTML
          );

          expressions.push(tag); // no return, anonymous tag, keep parsing
        } else {
          if (hasIsDirective && isVirtual)
            { warn(("Virtual tags shouldn't be used together with the \"" + IS_DIRECTIVE + "\" attribute - https://github.com/riot/riot/issues/2511")); }

          expressions.push(
            initChild(
              tagImpl,
              {
                root: dom,
                parent: this$1
              },
              dom.innerHTML,
              this$1
            )
          );
          return false
        }
      }

      // attribute expressions
      parseAttributes.apply(this$1, [dom, dom.attributes, function (attr, expr) {
        if (!expr) { return }
        expressions.push(expr);
      }]);
    });

    return expressions
  }

  /**
   * Calls `fn` for every attribute on an element. If that attr has an expression,
   * it is also passed to fn.
   * @this Tag
   * @param   { HTMLElement } dom - dom node to parse
   * @param   { Array } attrs - array of attributes
   * @param   { Function } fn - callback to exec on any iteration
   */
  function parseAttributes(dom, attrs, fn) {
    var this$1 = this;

    each(attrs, function (attr) {
      if (!attr) { return false }

      var name = attr.name;
      var bool = isBoolAttr(name);
      var expr;

      if (contains(REF_DIRECTIVES, name) && dom.tagName.toLowerCase() !== YIELD_TAG) {
        expr =  createRefDirective(dom, this$1, name, attr.value);
      } else if (tmpl.hasExpr(attr.value)) {
        expr = {dom: dom, expr: attr.value, attr: name, bool: bool};
      }

      fn(attr, expr);
    });
  }

  /**
   * Manage the mount state of a tag triggering also the observable events
   * @this Tag
   * @param { Boolean } value - ..of the isMounted flag
   */
  function setMountState(value) {
    var ref = this.__;
    var isAnonymous = ref.isAnonymous;
    var skipAnonymous = ref.skipAnonymous;

    define(this, 'isMounted', value);

    if (!isAnonymous || !skipAnonymous) {
      if (value) { this.trigger('mount'); }
      else {
        this.trigger('unmount');
        this.off('*');
        this.__.wasCreated = false;
      }
    }
  }

  /**
   * Mount the current tag instance
   * @returns { Tag } the current tag instance
   */
  function componentMount(tag$$1, dom, expressions, opts) {
    var __ = tag$$1.__;
    var root = __.root;
    root._tag = tag$$1; // keep a reference to the tag just created

    // Read all the attrs on this instance. This give us the info we need for updateOpts
    parseAttributes.apply(__.parent, [root, root.attributes, function (attr, expr) {
      if (!__.isAnonymous && RefExpr.isPrototypeOf(expr)) { expr.tag = tag$$1; }
      attr.expr = expr;
      __.instAttrs.push(attr);
    }]);

    // update the root adding custom attributes coming from the compiler
    walkAttributes(__.impl.attrs, function (k, v) { __.implAttrs.push({name: k, value: v}); });
    parseAttributes.apply(tag$$1, [root, __.implAttrs, function (attr, expr) {
      if (expr) { expressions.push(expr); }
      else { setAttribute(root, attr.name, attr.value); }
    }]);

    // initialiation
    updateOpts.apply(tag$$1, [__.isLoop, __.parent, __.isAnonymous, opts, __.instAttrs]);

    // add global mixins
    var globalMixin = mixin(GLOBAL_MIXIN);

    if (globalMixin && !__.skipAnonymous) {
      for (var i in globalMixin) {
        if (globalMixin.hasOwnProperty(i)) {
          tag$$1.mixin(globalMixin[i]);
        }
      }
    }

    if (__.impl.fn) { __.impl.fn.call(tag$$1, opts); }

    if (!__.skipAnonymous) { tag$$1.trigger('before-mount'); }

    // parse layout after init. fn may calculate args for nested custom tags
    each(parseExpressions.apply(tag$$1, [dom, __.isAnonymous]), function (e) { return expressions.push(e); });

    tag$$1.update(__.item);

    if (!__.isAnonymous && !__.isInline) {
      while (dom.firstChild) { root.appendChild(dom.firstChild); }
    }

    define(tag$$1, 'root', root);

    // if we need to wait that the parent "mount" or "updated" event gets triggered
    if (!__.skipAnonymous && tag$$1.parent) {
      var p = getImmediateCustomParent(tag$$1.parent);
      p.one(!p.isMounted ? 'mount' : 'updated', function () {
        setMountState.call(tag$$1, true);
      });
    } else {
      // otherwise it's not a child tag we can trigger its mount event
      setMountState.call(tag$$1, true);
    }

    tag$$1.__.wasCreated = true;

    return tag$$1
  }

  /**
   * Unmount the tag instance
   * @param { Boolean } mustKeepRoot - if it's true the root node will not be removed
   * @returns { Tag } the current tag instance
   */
  function tagUnmount(tag, mustKeepRoot, expressions) {
    var __ = tag.__;
    var root = __.root;
    var tagIndex = __TAGS_CACHE.indexOf(tag);
    var p = root.parentNode;

    if (!__.skipAnonymous) { tag.trigger('before-unmount'); }

    // clear all attributes coming from the mounted tag
    walkAttributes(__.impl.attrs, function (name) {
      if (startsWith(name, ATTRS_PREFIX))
        { name = name.slice(ATTRS_PREFIX.length); }

      removeAttribute(root, name);
    });

    // remove all the event listeners
    tag.__.listeners.forEach(function (dom) {
      Object.keys(dom[RIOT_EVENTS_KEY]).forEach(function (eventName) {
        dom.removeEventListener(eventName, dom[RIOT_EVENTS_KEY][eventName]);
      });
    });

    // remove tag instance from the global tags cache collection
    if (tagIndex !== -1) { __TAGS_CACHE.splice(tagIndex, 1); }

    // clean up the parent tags object
    if (__.parent && !__.isAnonymous) {
      var ptag = getImmediateCustomParent(__.parent);

      if (__.isVirtual) {
        Object
          .keys(tag.tags)
          .forEach(function (tagName) { return arrayishRemove(ptag.tags, tagName, tag.tags[tagName]); });
      } else {
        arrayishRemove(ptag.tags, __.tagName, tag);
      }
    }

    // unmount all the virtual directives
    if (tag.__.virts) {
      each(tag.__.virts, function (v) {
        if (v.parentNode) { v.parentNode.removeChild(v); }
      });
    }

    // allow expressions to unmount themselves
    unmountAll(expressions);
    each(__.instAttrs, function (a) { return a.expr && a.expr.unmount && a.expr.unmount(); });

    // clear the tag html if it's necessary
    if (mustKeepRoot) { setInnerHTML(root, ''); }
    // otherwise detach the root tag from the DOM
    else if (p) { p.removeChild(root); }

    // custom internal unmount function to avoid relying on the observable
    if (__.onUnmount) { __.onUnmount(); }

    // weird fix for a weird edge case #2409 and #2436
    // some users might use your software not as you've expected
    // so I need to add these dirty hacks to mitigate unexpected issues
    if (!tag.isMounted) { setMountState.call(tag, true); }

    setMountState.call(tag, false);

    delete root._tag;

    return tag
  }

  /**
   * Tag creation factory function
   * @constructor
   * @param { Object } impl - it contains the tag template, and logic
   * @param { Object } conf - tag options
   * @param { String } innerHTML - html that eventually we need to inject in the tag
   */
  function createTag(impl, conf, innerHTML) {
    if ( impl === void 0 ) impl = {};
    if ( conf === void 0 ) conf = {};

    var tag = conf.context || {};
    var opts = conf.opts || {};
    var parent = conf.parent;
    var isLoop = conf.isLoop;
    var isAnonymous = !!conf.isAnonymous;
    var skipAnonymous = settings.skipAnonymousTags && isAnonymous;
    var item = conf.item;
    // available only for the looped nodes
    var index = conf.index;
    // All attributes on the Tag when it's first parsed
    var instAttrs = [];
    // expressions on this type of Tag
    var implAttrs = [];
    var tmpl = impl.tmpl;
    var expressions = [];
    var root = conf.root;
    var tagName = conf.tagName || getName(root);
    var isVirtual = tagName === 'virtual';
    var isInline = !isVirtual && !tmpl;
    var dom;

    if (isInline || isLoop && isAnonymous) {
      dom = root;
    } else {
      if (!isVirtual) { root.innerHTML = ''; }
      dom = mkdom(tmpl, innerHTML, isSvg(root));
    }

    // make this tag observable
    if (!skipAnonymous) { observable(tag); }

    // only call unmount if we have a valid __TAG_IMPL (has name property)
    if (impl.name && root._tag) { root._tag.unmount(true); }

    define(tag, '__', {
      impl: impl,
      root: root,
      skipAnonymous: skipAnonymous,
      implAttrs: implAttrs,
      isAnonymous: isAnonymous,
      instAttrs: instAttrs,
      innerHTML: innerHTML,
      tagName: tagName,
      index: index,
      isLoop: isLoop,
      isInline: isInline,
      item: item,
      parent: parent,
      // tags having event listeners
      // it would be better to use weak maps here but we can not introduce breaking changes now
      listeners: [],
      // these vars will be needed only for the virtual tags
      virts: [],
      wasCreated: false,
      tail: null,
      head: null
    });

    // tag protected properties
    return [
      ['isMounted', false],
      // create a unique id to this tag
      // it could be handy to use it also to improve the virtual dom rendering speed
      ['_riot_id', uid()],
      ['root', root],
      ['opts', opts, { writable: true, enumerable: true }],
      ['parent', parent || null],
      // protect the "tags" and "refs" property from being overridden
      ['tags', {}],
      ['refs', {}],
      ['update', function (data) { return componentUpdate(tag, data, expressions); }],
      ['mixin', function () {
        var mixins = [], len = arguments.length;
        while ( len-- ) mixins[ len ] = arguments[ len ];

        return componentMixin.apply(void 0, [ tag ].concat( mixins ));
    }],
      ['mount', function () { return componentMount(tag, dom, expressions, opts); }],
      ['unmount', function (mustKeepRoot) { return tagUnmount(tag, mustKeepRoot, expressions); }]
    ].reduce(function (acc, ref) {
      var key = ref[0];
      var value = ref[1];
      var opts = ref[2];

      define(tag, key, value, opts);
      return acc
    }, extend(tag, item))
  }

  /**
   * Mount a tag creating new Tag instance
   * @param   { Object } root - dom node where the tag will be mounted
   * @param   { String } tagName - name of the riot tag we want to mount
   * @param   { Object } opts - options to pass to the Tag instance
   * @param   { Object } ctx - optional context that will be used to extend an existing class ( used in riot.Tag )
   * @returns { Tag } a new Tag instance
   */
  function mount$1(root, tagName, opts, ctx) {
    var impl = __TAG_IMPL[tagName];
    var implClass = __TAG_IMPL[tagName].class;
    var context = ctx || (implClass ? create(implClass.prototype) : {});
    // cache the inner HTML to fix #855
    var innerHTML = root._innerHTML = root._innerHTML || root.innerHTML;
    var conf = extend({ root: root, opts: opts, context: context }, { parent: opts ? opts.parent : null });
    var tag;

    if (impl && root) { tag = createTag(impl, conf, innerHTML); }

    if (tag && tag.mount) {
      tag.mount(true);
      // add this tag to the virtualDom variable
      if (!contains(__TAGS_CACHE, tag)) { __TAGS_CACHE.push(tag); }
    }

    return tag
  }



  var tags = /*#__PURE__*/Object.freeze({
    arrayishAdd: arrayishAdd,
    getTagName: getName,
    inheritParentProps: inheritParentProps,
    mountTo: mount$1,
    selectTags: query,
    arrayishRemove: arrayishRemove,
    getTag: get,
    initChildTag: initChild,
    moveChildTag: moveChild,
    makeReplaceVirtual: makeReplaceVirtual,
    getImmediateCustomParentTag: getImmediateCustomParent,
    makeVirtual: makeVirtual,
    moveVirtual: moveVirtual,
    unmountAll: unmountAll,
    createIfDirective: createIfDirective,
    createRefDirective: createRefDirective
  });

  /**
   * Riot public api
   */
  var settings$1 = settings;
  var util = {
    tmpl: tmpl,
    brackets: brackets,
    styleManager: styleManager,
    vdom: __TAGS_CACHE,
    styleNode: styleManager.styleNode,
    // export the riot internal utils as well
    dom: dom,
    check: check,
    misc: misc,
    tags: tags
  };

  var riot$1 = extend({}, core, {
    observable: observable,
    settings: settings$1,
    util: util,
  });

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function commonjsRequire () {
  	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
  }

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var ethers_min = createCommonjsModule(function (module, exports) {
  !function(e){{ module.exports=e(); }}(function(){return function o(s,a,u){function l(t,e){if(!a[t]){if(!s[t]){var r="function"==typeof commonjsRequire&&commonjsRequire;if(!e&&r){ return r(t,!0); }if(h){ return h(t,!0); }var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var i=a[t]={exports:{}};s[t][0].call(i.exports,function(e){return l(s[t][1][e]||e)},i,i.exports,o,s,a,u);}return a[t].exports}for(var h="function"==typeof commonjsRequire&&commonjsRequire,e=0;e<u.length;e++){ l(u[e]); }return l}({1:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0}),r.version="4.0.33";},{}],2:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0});var n=e("./utils/properties"),i=(o.isSigner=function(e){return n.isType(e,"Signer")},o);function o(){n.setType(this,"Signer");}r.Signer=i;},{"./utils/properties":73}],3:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0});var n=e("./utils/bignumber");r.AddressZero="0x0000000000000000000000000000000000000000";r.HashZero="0x0000000000000000000000000000000000000000000000000000000000000000";r.EtherSymbol="\u039e";var i=n.bigNumberify(-1);r.NegativeOne=i;var o=n.bigNumberify(0);r.Zero=o;var s=n.bigNumberify(1);r.One=s;var a=n.bigNumberify(2);r.Two=a;var u=n.bigNumberify("1000000000000000000");r.WeiPerEther=u;var l=n.bigNumberify("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");r.MaxUint256=l;},{"./utils/bignumber":62}],4:[function(e,t,r){var n,i=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t;}||function(e,t){for(var r in t){ t.hasOwnProperty(r)&&(e[r]=t[r]); }},function(e,t){function r(){this.constructor=e;}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r);}),o=this&&this.__importStar||function(e){if(e&&e.__esModule){ return e; }var t={};if(null!=e){ for(var r in e){ Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]); } }return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var s,u=e("./constants"),l=o(e("./errors")),h=e("./utils/abi-coder"),a=e("./utils/address"),f=e("./utils/bignumber"),c=e("./utils/bytes"),d=e("./utils/interface"),p=e("./utils/properties"),v=e("./providers/abstract-provider"),y=e("./abstract-signer"),m=(s=y.Signer,i(g,s),g.prototype.getAddress=function(){return Promise.resolve(this.address)},g.prototype._fail=function(e,t){return Promise.resolve().then(function(){l.throwError(e,l.UNSUPPORTED_OPERATION,{operation:t});})},g.prototype.signMessage=function(e){return this._fail("VoidSigner cannot sign messages","signMessage")},g.prototype.sendTransaction=function(e){return this._fail("VoidSigner cannot sign transactions","sendTransaction")},g.prototype.connect=function(e){return new g(this.address,e)},g);function g(e,t){var r=s.call(this)||this;return p.defineReadOnly(r,"address",e),p.defineReadOnly(r,"provider",t),r}r.VoidSigner=m;var b={chainId:!0,data:!0,from:!0,gasLimit:!0,gasPrice:!0,nonce:!0,to:!0,value:!0};function w(o,e,s){var a=o.interface.functions[e];return function(){
  var arguments$1 = arguments;
  for(var e=[],t=0;t<arguments.length;t++){ e[t]=arguments$1[t]; }var i={},r=null;if(e.length===a.inputs.length+1&&"object"==typeof e[e.length-1]){ for(var n in null!=(i=p.shallowCopy(e.pop())).blockTag&&(r=i.blockTag),delete i.blockTag,i){ if(!b[n]){ throw new Error("unknown transaction override "+n); } } }if(e.length!=a.inputs.length){ throw new Error("incorrect number of arguments"); }return ["data","to"].forEach(function(e){null!=i[e]&&l.throwError("cannot override "+e,l.UNSUPPORTED_OPERATION,{operation:e});}),i.to=o._deployed(r).then(function(){return o.addressPromise}),function n(i,o,e){if(Array.isArray(e)){var s=[];return e.forEach(function(e,t){var r=null;r=Array.isArray(o)?o[t]:o[e.name],s.push(n(i,r,e));}),Promise.all(s)}if("address"===e.type){ return i.resolveName(o); }if("tuple"===e.type){ return n(i,o,e.components); }var t=e.type.match(/(.*)(\[[0-9]*\]$)/);if(t){if(!Array.isArray(o)){ throw new Error("invalid value for array"); }var r=[],a={components:e.components,type:t[1]};return o.forEach(function(e){r.push(n(i,e,a));}),Promise.all(r)}return Promise.resolve(o)}(o.provider,e,a.inputs).then(function(n){if(i.data=a.encode(n),"call"===a.type){ return s?Promise.resolve(u.Zero):(o.provider||l.throwError("call (constant functions) require a provider or a signer with a provider",l.UNSUPPORTED_OPERATION,{operation:"call"}),["gasLimit","gasPrice","value"].forEach(function(e){if(null!=i[e]){ throw new Error("call cannot override "+e) }}),null==i.from&&o.signer&&(i.from=o.signer.getAddress()),o.provider.call(i,r).then(function(t){if(c.hexDataLength(t)%32==4&&"0x08c379a0"===c.hexDataSlice(t,0,4)){var e=h.defaultAbiCoder.decode(["string"],c.hexDataSlice(t,4));l.throwError("call revert exception",l.CALL_EXCEPTION,{address:o.address,args:n,method:a.signature,errorSignature:"Error(string)",errorArgs:[e],reason:e,transaction:i});}try{var r=a.decode(t);return 1===a.outputs.length&&(r=r[0]),r}catch(e){throw"0x"===t&&0<a.outputs.length&&l.throwError("call exception",l.CALL_EXCEPTION,{address:o.address,method:a.signature,args:n}),e}})); }if("transaction"===a.type){ return s?(o.provider||l.throwError("estimate gas require a provider or a signer with a provider",l.UNSUPPORTED_OPERATION,{operation:"estimateGas"}),null==i.from&&o.signer&&(i.from=o.signer.getAddress()),o.provider.estimateGas(i)):(null==i.gasLimit&&null!=a.gas&&(i.gasLimit=f.bigNumberify(a.gas).add(21e3)),o.signer||l.throwError("sending a transaction require a signer",l.UNSUPPORTED_OPERATION,{operation:"sendTransaction"}),null!=i.from&&l.throwError("cannot override from in a transaction",l.UNSUPPORTED_OPERATION,{operation:"sendTransaction"}),o.signer.sendTransaction(i).then(function(e){var t=e.wait.bind(e);return e.wait=function(e){return t(e).then(function(n){return n.events=n.logs.map(function(e){var t=p.deepCopy(e),r=o.interface.parseLog(e);return r&&(t.args=r.values,t.decode=r.decode,t.event=r.name,t.eventSignature=r.signature),t.removeListener=function(){return o.provider},t.getBlock=function(){return o.provider.getBlock(n.blockHash)},t.getTransaction=function(){return o.provider.getTransaction(n.transactionHash)},t.getTransactionReceipt=function(){return Promise.resolve(n)},t}),n})},e})); }throw new Error("invalid type - "+a.type)})}}function _(e){return !e.address||null!=e.topics&&0!==e.topics.length?(e.address||"*")+"@"+(e.topics?e.topics.join(":"):""):"*"}var M=(A.prototype.deployed=function(){return this._deployed()},A.prototype._deployed=function(e){var t=this;return this._deployedPromise||(this.deployTransaction?this._deployedPromise=this.deployTransaction.wait().then(function(){return t}):this._deployedPromise=this.provider.getCode(this.address,e).then(function(e){return "0x"===e&&l.throwError("contract not deployed",l.UNSUPPORTED_OPERATION,{contractAddress:t.address,operation:"getDeployed"}),t})),this._deployedPromise},A.prototype.fallback=function(e){var t=this;this.signer||l.throwError("sending a transaction require a signer",l.UNSUPPORTED_OPERATION,{operation:"sendTransaction(fallback)"});var r=p.shallowCopy(e||{});return ["from","to"].forEach(function(e){null!=r[e]&&l.throwError("cannot override "+e,l.UNSUPPORTED_OPERATION,{operation:e});}),r.to=this.addressPromise,this.deployed().then(function(){return t.signer.sendTransaction(r)})},A.prototype.connect=function(e){"string"==typeof e&&(e=new m(e,this.provider));var t=new A(this.address,this.interface,e);return this.deployTransaction&&p.defineReadOnly(t,"deployTransaction",this.deployTransaction),t},A.prototype.attach=function(e){return new A(e,this.interface,this.signer||this.provider)},A.isIndexed=function(e){return d.Interface.isIndexed(e)},A.prototype._getEventFilter=function(e){var r=this;if("string"==typeof e){if("*"===e){ return {prepareEvent:function(e){var t=r.interface.parseLog(e);return t&&(e.args=t.values,e.decode=t.decode,e.event=t.name,e.eventSignature=t.signature),[e]},eventTag:"*",filter:{address:this.address}}; }-1!==e.indexOf("(")&&(e=h.formatSignature(h.parseSignature("event "+e)));var n=this.interface.events[e];n||l.throwError("unknown event - "+e,l.INVALID_ARGUMENT,{argumnet:"eventName",value:e});var t={address:this.address,topics:[n.topic]};return {prepareEvent:function(e){var t=n.decode(e.data,e.topics);e.args=t;var r=Array.prototype.slice.call(t);return r.push(e),r},event:n,eventTag:_(t),filter:t}}var i={address:this.address},o=null;if(e.topics&&e.topics[0]){ for(var s in i.topics=e.topics,this.interface.events){ if(-1!==s.indexOf("(")){var a=this.interface.events[s];if(a.topic===e.topics[0].toLowerCase()){o=a;break}} } }return {prepareEvent:function(e){if(!o){ return [e]; }var t=o.decode(e.data,e.topics);e.args=t;var r=Array.prototype.slice.call(t);return r.push(e),r},event:o,eventTag:_(i),filter:i}},A.prototype._addEventListener=function(n,i,e){var o=this;function t(e){var t=p.deepCopy(e),r=n.prepareEvent(t);n.event&&(t.decode=n.event.decode,t.event=n.event.name,t.eventSignature=n.event.signature),t.removeListener=function(){o.removeListener(n.filter,i);},t.getBlock=function(){return o.provider.getBlock(e.blockHash)},t.getTransaction=function(){return o.provider.getTransaction(e.transactionHash)},t.getTransactionReceipt=function(){return o.provider.getTransactionReceipt(e.transactionHash)},o.emit.apply(o,[n.filter].concat(r));}this.provider||l.throwError("events require a provider or a signer with a provider",l.UNSUPPORTED_OPERATION,{operation:"once"}),this.provider.on(n.filter,t),this._events.push({eventFilter:n,listener:i,wrappedListener:t,once:e});},A.prototype.on=function(e,t){return this._addEventListener(this._getEventFilter(e),t,!1),this},A.prototype.once=function(e,t){return this._addEventListener(this._getEventFilter(e),t,!0),this},A.prototype.addListener=function(e,t){return this.on(e,t)},A.prototype.emit=function(e){
  var arguments$1 = arguments;
  for(var t=this,r=[],n=1;n<arguments.length;n++){ r[n-1]=arguments$1[n]; }if(!this.provider){ return !1; }var i=!1,o=this._getEventFilter(e);return this._events=this._events.filter(function(e){return e.eventFilter.eventTag!==o.eventTag||(setTimeout(function(){e.listener.apply(t,r);},0),i=!0,!e.once)}),i},A.prototype.listenerCount=function(e){if(!this.provider){ return 0; }var t=this._getEventFilter(e);return this._events.filter(function(e){return e.eventFilter.eventTag===t.eventTag}).length},A.prototype.listeners=function(e){if(!this.provider){ return []; }var t=this._getEventFilter(e);return this._events.filter(function(e){return e.eventFilter.eventTag===t.eventTag}).map(function(e){return e.listener})},A.prototype.removeAllListeners=function(e){var t=this;if(!this.provider){ return this; }var r=this._getEventFilter(e);return this._events=this._events.filter(function(e){return e.eventFilter.eventTag!==r.eventTag||(t.provider.removeListener(e.eventFilter.filter,e.wrappedListener),!1)}),this},A.prototype.removeListener=function(e,t){var r=this;if(!this.provider){ return this; }var n=!1,i=this._getEventFilter(e);return this._events=this._events.filter(function(e){return e.eventFilter.eventTag!==i.eventTag||e.listener!==t||(r.provider.removeListener(e.eventFilter.filter,e.wrappedListener),!!n||!(n=!0))}),this},A);function A(t,e,r){var n=this;if(l.checkNew(this,A),d.Interface.isInterface(e)?p.defineReadOnly(this,"interface",e):p.defineReadOnly(this,"interface",new d.Interface(e)),y.Signer.isSigner(r)?(p.defineReadOnly(this,"provider",r.provider),p.defineReadOnly(this,"signer",r)):v.Provider.isProvider(r)?(p.defineReadOnly(this,"provider",r),p.defineReadOnly(this,"signer",null)):l.throwError("invalid signer or provider",l.INVALID_ARGUMENT,{arg:"signerOrProvider",value:r}),p.defineReadOnly(this,"estimate",{}),p.defineReadOnly(this,"functions",{}),p.defineReadOnly(this,"filters",{}),Object.keys(this.interface.events).forEach(function(e){var r=n.interface.events[e];p.defineReadOnly(n.filters,e,function(){
  var arguments$1 = arguments;
  for(var e=[],t=0;t<arguments.length;t++){ e[t]=arguments$1[t]; }return {address:n.address,topics:r.encodeTopics(e)}});}),this._events=[],p.defineReadOnly(this,"address",t),this.provider){ p.defineReadOnly(this,"addressPromise",this.provider.resolveName(t).then(function(e){if(null==e){ throw new Error("name not found"); }return e}).catch(function(e){throw e})); }else { try{p.defineReadOnly(this,"addressPromise",Promise.resolve(a.getAddress(t)));}catch(e){l.throwError("provider is required to use non-address contract address",l.INVALID_ARGUMENT,{argument:"addressOrName",value:t});} }Object.keys(this.interface.functions).forEach(function(e){var t=w(n,e,!1);null==n[e]?p.defineReadOnly(n,e,t):l.warn("WARNING: Multiple definitions for "+e),null==n.functions[e]&&(p.defineReadOnly(n.functions,e,t),p.defineReadOnly(n.estimate,e,w(n,e,!0)));});}r.Contract=M;var E=(S.prototype.getDeployTransaction=function(){
  var arguments$1 = arguments;
  for(var e=[],t=0;t<arguments.length;t++){ e[t]=arguments$1[t]; }var r={};if(e.length===this.interface.deployFunction.inputs.length+1){ for(var n in r=p.shallowCopy(e.pop())){ if(!b[n]){ throw new Error("unknown transaction override "+n); } } }return ["data","from","to"].forEach(function(e){null!=r[e]&&l.throwError("cannot override "+e,l.UNSUPPORTED_OPERATION,{operation:e});}),l.checkArgumentCount(e.length,this.interface.deployFunction.inputs.length," in Contract constructor"),r.data=this.interface.deployFunction.encode(this.bytecode,e),r},S.prototype.deploy=function(){
  var arguments$1 = arguments;
  for(var r=this,e=[],t=0;t<arguments.length;t++){ e[t]=arguments$1[t]; }var n=this.getDeployTransaction.apply(this,e);return this.signer.sendTransaction(n).then(function(e){var t=new M(a.getContractAddress(e),r.interface,r.signer);return p.defineReadOnly(t,"deployTransaction",e),t})},S.prototype.attach=function(e){return new M(e,this.interface,this.signer)},S.prototype.connect=function(e){return new S(this.interface,this.bytecode,e)},S.fromSolidity=function(e,t){null==e&&l.throwError("missing compiler output",l.MISSING_ARGUMENT,{argument:"compilerOutput"}),"string"==typeof e&&(e=JSON.parse(e));var r=e.abi,n=null;return e.bytecode?n=e.bytecode:e.evm&&e.evm.bytecode&&(n=e.evm.bytecode),new S(r,n,t)},S);function S(e,t,r){var n=null;"string"==typeof t?n=t:c.isArrayish(t)?n=c.hexlify(t):"string"==typeof t.object?n=t.object:l.throwError("bytecode must be a valid hex string",l.INVALID_ARGUMENT,{arg:"bytecode",value:t}),"0x"!==n.substring(0,2)&&(n="0x"+n),c.isHexString(n)||l.throwError("bytecode must be a valid hex string",l.INVALID_ARGUMENT,{arg:"bytecode",value:t}),n.length%2!=0&&l.throwError("bytecode must be valid data (even length)",l.INVALID_ARGUMENT,{arg:"bytecode",value:t}),p.defineReadOnly(this,"bytecode",n),d.Interface.isInterface(e)?p.defineReadOnly(this,"interface",e):p.defineReadOnly(this,"interface",new d.Interface(e)),r&&!y.Signer.isSigner(r)&&l.throwError("invalid signer",l.INVALID_ARGUMENT,{arg:"signer",value:null}),p.defineReadOnly(this,"signer",r||null);}r.ContractFactory=E;},{"./abstract-signer":2,"./constants":3,"./errors":5,"./providers/abstract-provider":49,"./utils/abi-coder":58,"./utils/address":59,"./utils/bignumber":62,"./utils/bytes":63,"./utils/interface":68,"./utils/properties":73}],5:[function(e,t,s){Object.defineProperty(s,"__esModule",{value:!0});var a=e("./_version");s.UNKNOWN_ERROR="UNKNOWN_ERROR",s.NOT_IMPLEMENTED="NOT_IMPLEMENTED",s.MISSING_NEW="MISSING_NEW",s.CALL_EXCEPTION="CALL_EXCEPTION",s.INVALID_ARGUMENT="INVALID_ARGUMENT",s.MISSING_ARGUMENT="MISSING_ARGUMENT",s.UNEXPECTED_ARGUMENT="UNEXPECTED_ARGUMENT",s.NUMERIC_FAULT="NUMERIC_FAULT",s.INSUFFICIENT_FUNDS="INSUFFICIENT_FUNDS",s.NONCE_EXPIRED="NONCE_EXPIRED",s.REPLACEMENT_UNDERPRICED="REPLACEMENT_UNDERPRICED";var r=!(s.UNSUPPORTED_OPERATION="UNSUPPORTED_OPERATION"),u=!1;function n(e,t,r){if(u){ throw new Error("unknown error"); }t=t||s.UNKNOWN_ERROR,r=r||{};var n=[];Object.keys(r).forEach(function(t){try{n.push(t+"="+JSON.stringify(r[t]));}catch(e){n.push(t+"="+JSON.stringify(r[t].toString()));}}),n.push("version="+a.version);var i=e;n.length&&(e+=" ("+n.join(", ")+")");var o=new Error(e);throw o.reason=i,o.code=t,Object.keys(r).forEach(function(e){o[e]=r[e];}),o}s.throwError=n,s.checkNew=function(e,t){e instanceof t||n("missing new",s.MISSING_NEW,{name:t.name});},s.checkArgumentCount=function(e,t,r){r=r||"",e<t&&n("missing argument"+r,s.MISSING_ARGUMENT,{count:e,expectedCount:t}),t<e&&n("too many arguments"+r,s.UNEXPECTED_ARGUMENT,{count:e,expectedCount:t});},s.setCensorship=function(e,t){r&&n("error censorship permanent",s.UNSUPPORTED_OPERATION,{operation:"setCensorship"}),u=!!e,r=!!t;},s.checkNormalize=function(){try{if(["NFD","NFC","NFKD","NFKC"].forEach(function(t){try{}catch(e){throw new Error("missing "+t)}}),String.fromCharCode(233).normalize("NFD")!==String.fromCharCode(101,769)){ throw new Error("broken implementation") }}catch(e){n("platform missing String.prototype.normalize",s.UNSUPPORTED_OPERATION,{operation:"String.prototype.normalize",form:e.message});}};var i={debug:1,default:2,info:2,warn:3,error:4,off:5},o=i.default;function l(e,t){o>i[e]||console.log.apply(console,t);}function h(){
  var arguments$1 = arguments;
  for(var e=[],t=0;t<arguments.length;t++){ e[t]=arguments$1[t]; }l("warn",e);}s.setLogLevel=function(e){var t=i[e];null!=t?o=t:h("invliad log level - "+e);},s.warn=h,s.info=function(){
  var arguments$1 = arguments;
  for(var e=[],t=0;t<arguments.length;t++){ e[t]=arguments$1[t]; }l("info",e);};},{"./_version":1}],6:[function(e,t,r){var n=this&&this.__importStar||function(e){if(e&&e.__esModule){ return e; }var t={};if(null!=e){ for(var r in e){ Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]); } }return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var i=e("./contract");r.Contract=i.Contract,r.ContractFactory=i.ContractFactory,r.VoidSigner=i.VoidSigner;var o=e("./abstract-signer");r.Signer=o.Signer;var s=e("./wallet");r.Wallet=s.Wallet;var a=n(e("./constants"));r.constants=a;var u=n(e("./errors"));r.errors=u;var l=n(e("./providers"));r.providers=l;var h=n(e("./utils"));r.utils=h;var f=n(e("./wordlists"));r.wordlists=f;var c=e("./utils/shims");r.platform=c.platform;var d=e("./_version");r.version=d.version,r.getDefaultProvider=function(e){null==e&&(e="homestead");var t=h.getNetwork(e);return t&&t._defaultProvider||u.throwError("unsupported getDefaultProvider network",u.UNSUPPORTED_OPERATION,{operation:"getDefaultProvider",network:e}),t._defaultProvider(l)};},{"./_version":1,"./abstract-signer":2,"./constants":3,"./contract":4,"./errors":5,"./providers":53,"./utils":67,"./utils/shims":79,"./wallet":87,"./wordlists":88}],7:[function(e,t,r){var n=this&&this.__importStar||function(e){if(e&&e.__esModule){ return e; }var t={};if(null!=e){ for(var r in e){ Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]); } }return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var i=n(e("./ethers"));r.ethers=i,function(e){for(var t in e){ r.hasOwnProperty(t)||(r[t]=e[t]); }}(e("./ethers"));},{"./ethers":6}],8:[function(e,C,B){!function(e){function r(e){return parseInt(e)===e}function n(e){if(!r(e.length)){ return !1; }for(var t=0;t<e.length;t++){ if(!r(e[t])||e[t]<0||255<e[t]){ return !1; } }return !0}function o(e,t){if(e.buffer&&ArrayBuffer.isView(e)&&"Uint8Array"===e.name){ return t&&(e=e.slice?e.slice():Array.prototype.slice.call(e)),e; }if(Array.isArray(e)){if(!n(e)){ throw new Error("Array contains invalid value: "+e); }return new Uint8Array(e)}if(r(e.length)&&n(e)){ return new Uint8Array(e); }throw new Error("unsupported array-like object")}function u(e){return new Uint8Array(e)}function s(e,t,r,n,i){null==n&&null==i||(e=e.slice?e.slice(n,i):Array.prototype.slice.call(e,n,i)),t.set(e,r);}var i,t={toBytes:function(e){var t=[],r=0;for(e=encodeURI(e);r<e.length;){var n=e.charCodeAt(r++);37===n?(t.push(parseInt(e.substr(r,2),16)),r+=2):t.push(n);}return o(t)},fromBytes:function(e){for(var t=[],r=0;r<e.length;){var n=e[r];n<128?(t.push(String.fromCharCode(n)),r++):191<n&&n<224?(t.push(String.fromCharCode((31&n)<<6|63&e[r+1])),r+=2):(t.push(String.fromCharCode((15&n)<<12|(63&e[r+1])<<6|63&e[r+2])),r+=3);}return t.join("")}},a=(i="0123456789abcdef",{toBytes:function(e){for(var t=[],r=0;r<e.length;r+=2){ t.push(parseInt(e.substr(r,2),16)); }return t},fromBytes:function(e){for(var t=[],r=0;r<e.length;r++){var n=e[r];t.push(i[(240&n)>>4]+i[15&n]);}return t.join("")}}),f={16:10,24:12,32:14},c=[1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145],d=[99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22],l=[82,9,106,213,48,54,165,56,191,64,163,158,129,243,215,251,124,227,57,130,155,47,255,135,52,142,67,68,196,222,233,203,84,123,148,50,166,194,35,61,238,76,149,11,66,250,195,78,8,46,161,102,40,217,36,178,118,91,162,73,109,139,209,37,114,248,246,100,134,104,152,22,212,164,92,204,93,101,182,146,108,112,72,80,253,237,185,218,94,21,70,87,167,141,157,132,144,216,171,0,140,188,211,10,247,228,88,5,184,179,69,6,208,44,30,143,202,63,15,2,193,175,189,3,1,19,138,107,58,145,17,65,79,103,220,234,151,242,207,206,240,180,230,115,150,172,116,34,231,173,53,133,226,249,55,232,28,117,223,110,71,241,26,113,29,41,197,137,111,183,98,14,170,24,190,27,252,86,62,75,198,210,121,32,154,219,192,254,120,205,90,244,31,221,168,51,136,7,199,49,177,18,16,89,39,128,236,95,96,81,127,169,25,181,74,13,45,229,122,159,147,201,156,239,160,224,59,77,174,42,245,176,200,235,187,60,131,83,153,97,23,43,4,126,186,119,214,38,225,105,20,99,85,33,12,125],h=[3328402341,4168907908,4000806809,4135287693,4294111757,3597364157,3731845041,2445657428,1613770832,33620227,3462883241,1445669757,3892248089,3050821474,1303096294,3967186586,2412431941,528646813,2311702848,4202528135,4026202645,2992200171,2387036105,4226871307,1101901292,3017069671,1604494077,1169141738,597466303,1403299063,3832705686,2613100635,1974974402,3791519004,1033081774,1277568618,1815492186,2118074177,4126668546,2211236943,1748251740,1369810420,3521504564,4193382664,3799085459,2883115123,1647391059,706024767,134480908,2512897874,1176707941,2646852446,806885416,932615841,168101135,798661301,235341577,605164086,461406363,3756188221,3454790438,1311188841,2142417613,3933566367,302582043,495158174,1479289972,874125870,907746093,3698224818,3025820398,1537253627,2756858614,1983593293,3084310113,2108928974,1378429307,3722699582,1580150641,327451799,2790478837,3117535592,0,3253595436,1075847264,3825007647,2041688520,3059440621,3563743934,2378943302,1740553945,1916352843,2487896798,2555137236,2958579944,2244988746,3151024235,3320835882,1336584933,3992714006,2252555205,2588757463,1714631509,293963156,2319795663,3925473552,67240454,4269768577,2689618160,2017213508,631218106,1269344483,2723238387,1571005438,2151694528,93294474,1066570413,563977660,1882732616,4059428100,1673313503,2008463041,2950355573,1109467491,537923632,3858759450,4260623118,3218264685,2177748300,403442708,638784309,3287084079,3193921505,899127202,2286175436,773265209,2479146071,1437050866,4236148354,2050833735,3362022572,3126681063,840505643,3866325909,3227541664,427917720,2655997905,2749160575,1143087718,1412049534,999329963,193497219,2353415882,3354324521,1807268051,672404540,2816401017,3160301282,369822493,2916866934,3688947771,1681011286,1949973070,336202270,2454276571,201721354,1210328172,3093060836,2680341085,3184776046,1135389935,3294782118,965841320,831886756,3554993207,4068047243,3588745010,2345191491,1849112409,3664604599,26054028,2983581028,2622377682,1235855840,3630984372,2891339514,4092916743,3488279077,3395642799,4101667470,1202630377,268961816,1874508501,4034427016,1243948399,1546530418,941366308,1470539505,1941222599,2546386513,3421038627,2715671932,3899946140,1042226977,2521517021,1639824860,227249030,260737669,3765465232,2084453954,1907733956,3429263018,2420656344,100860677,4160157185,470683154,3261161891,1781871967,2924959737,1773779408,394692241,2579611992,974986535,664706745,3655459128,3958962195,731420851,571543859,3530123707,2849626480,126783113,865375399,765172662,1008606754,361203602,3387549984,2278477385,2857719295,1344809080,2782912378,59542671,1503764984,160008576,437062935,1707065306,3622233649,2218934982,3496503480,2185314755,697932208,1512910199,504303377,2075177163,2824099068,1841019862,739644986],p=[2781242211,2230877308,2582542199,2381740923,234877682,3184946027,2984144751,1418839493,1348481072,50462977,2848876391,2102799147,434634494,1656084439,3863849899,2599188086,1167051466,2636087938,1082771913,2281340285,368048890,3954334041,3381544775,201060592,3963727277,1739838676,4250903202,3930435503,3206782108,4149453988,2531553906,1536934080,3262494647,484572669,2923271059,1783375398,1517041206,1098792767,49674231,1334037708,1550332980,4098991525,886171109,150598129,2481090929,1940642008,1398944049,1059722517,201851908,1385547719,1699095331,1587397571,674240536,2704774806,252314885,3039795866,151914247,908333586,2602270848,1038082786,651029483,1766729511,3447698098,2682942837,454166793,2652734339,1951935532,775166490,758520603,3000790638,4004797018,4217086112,4137964114,1299594043,1639438038,3464344499,2068982057,1054729187,1901997871,2534638724,4121318227,1757008337,0,750906861,1614815264,535035132,3363418545,3988151131,3201591914,1183697867,3647454910,1265776953,3734260298,3566750796,3903871064,1250283471,1807470800,717615087,3847203498,384695291,3313910595,3617213773,1432761139,2484176261,3481945413,283769337,100925954,2180939647,4037038160,1148730428,3123027871,3813386408,4087501137,4267549603,3229630528,2315620239,2906624658,3156319645,1215313976,82966005,3747855548,3245848246,1974459098,1665278241,807407632,451280895,251524083,1841287890,1283575245,337120268,891687699,801369324,3787349855,2721421207,3431482436,959321879,1469301956,4065699751,2197585534,1199193405,2898814052,3887750493,724703513,2514908019,2696962144,2551808385,3516813135,2141445340,1715741218,2119445034,2872807568,2198571144,3398190662,700968686,3547052216,1009259540,2041044702,3803995742,487983883,1991105499,1004265696,1449407026,1316239930,504629770,3683797321,168560134,1816667172,3837287516,1570751170,1857934291,4014189740,2797888098,2822345105,2754712981,936633572,2347923833,852879335,1133234376,1500395319,3084545389,2348912013,1689376213,3533459022,3762923945,3034082412,4205598294,133428468,634383082,2949277029,2398386810,3913789102,403703816,3580869306,2297460856,1867130149,1918643758,607656988,4049053350,3346248884,1368901318,600565992,2090982877,2632479860,557719327,3717614411,3697393085,2249034635,2232388234,2430627952,1115438654,3295786421,2865522278,3633334344,84280067,33027830,303828494,2747425121,1600795957,4188952407,3496589753,2434238086,1486471617,658119965,3106381470,953803233,334231800,3005978776,857870609,3151128937,1890179545,2298973838,2805175444,3056442267,574365214,2450884487,550103529,1233637070,4289353045,2018519080,2057691103,2399374476,4166623649,2148108681,387583245,3664101311,836232934,3330556482,3100665960,3280093505,2955516313,2002398509,287182607,3413881008,4238890068,3597515707,975967766],v=[1671808611,2089089148,2006576759,2072901243,4061003762,1807603307,1873927791,3310653893,810573872,16974337,1739181671,729634347,4263110654,3613570519,2883997099,1989864566,3393556426,2191335298,3376449993,2106063485,4195741690,1508618841,1204391495,4027317232,2917941677,3563566036,2734514082,2951366063,2629772188,2767672228,1922491506,3227229120,3082974647,4246528509,2477669779,644500518,911895606,1061256767,4144166391,3427763148,878471220,2784252325,3845444069,4043897329,1905517169,3631459288,827548209,356461077,67897348,3344078279,593839651,3277757891,405286936,2527147926,84871685,2595565466,118033927,305538066,2157648768,3795705826,3945188843,661212711,2999812018,1973414517,152769033,2208177539,745822252,439235610,455947803,1857215598,1525593178,2700827552,1391895634,994932283,3596728278,3016654259,695947817,3812548067,795958831,2224493444,1408607827,3513301457,0,3979133421,543178784,4229948412,2982705585,1542305371,1790891114,3410398667,3201918910,961245753,1256100938,1289001036,1491644504,3477767631,3496721360,4012557807,2867154858,4212583931,1137018435,1305975373,861234739,2241073541,1171229253,4178635257,33948674,2139225727,1357946960,1011120188,2679776671,2833468328,1374921297,2751356323,1086357568,2408187279,2460827538,2646352285,944271416,4110742005,3168756668,3066132406,3665145818,560153121,271589392,4279952895,4077846003,3530407890,3444343245,202643468,322250259,3962553324,1608629855,2543990167,1154254916,389623319,3294073796,2817676711,2122513534,1028094525,1689045092,1575467613,422261273,1939203699,1621147744,2174228865,1339137615,3699352540,577127458,712922154,2427141008,2290289544,1187679302,3995715566,3100863416,339486740,3732514782,1591917662,186455563,3681988059,3762019296,844522546,978220090,169743370,1239126601,101321734,611076132,1558493276,3260915650,3547250131,2901361580,1655096418,2443721105,2510565781,3828863972,2039214713,3878868455,3359869896,928607799,1840765549,2374762893,3580146133,1322425422,2850048425,1823791212,1459268694,4094161908,3928346602,1706019429,2056189050,2934523822,135794696,3134549946,2022240376,628050469,779246638,472135708,2800834470,3032970164,3327236038,3894660072,3715932637,1956440180,522272287,1272813131,3185336765,2340818315,2323976074,1888542832,1044544574,3049550261,1722469478,1222152264,50660867,4127324150,236067854,1638122081,895445557,1475980887,3117443513,2257655686,3243809217,489110045,2662934430,3778599393,4162055160,2561878936,288563729,1773916777,3648039385,2391345038,2493985684,2612407707,505560094,2274497927,3911240169,3460925390,1442818645,678973480,3749357023,2358182796,2717407649,2306869641,219617805,3218761151,3862026214,1120306242,1756942440,1103331905,2578459033,762796589,252780047,2966125488,1425844308,3151392187,372911126],y=[1667474886,2088535288,2004326894,2071694838,4075949567,1802223062,1869591006,3318043793,808472672,16843522,1734846926,724270422,4278065639,3621216949,2880169549,1987484396,3402253711,2189597983,3385409673,2105378810,4210693615,1499065266,1195886990,4042263547,2913856577,3570689971,2728590687,2947541573,2627518243,2762274643,1920112356,3233831835,3082273397,4261223649,2475929149,640051788,909531756,1061110142,4160160501,3435941763,875846760,2779116625,3857003729,4059105529,1903268834,3638064043,825316194,353713962,67374088,3351728789,589522246,3284360861,404236336,2526454071,84217610,2593830191,117901582,303183396,2155911963,3806477791,3958056653,656894286,2998062463,1970642922,151591698,2206440989,741110872,437923380,454765878,1852748508,1515908788,2694904667,1381168804,993742198,3604373943,3014905469,690584402,3823320797,791638366,2223281939,1398011302,3520161977,0,3991743681,538992704,4244381667,2981218425,1532751286,1785380564,3419096717,3200178535,960056178,1246420628,1280103576,1482221744,3486468741,3503319995,4025428677,2863326543,4227536621,1128514950,1296947098,859002214,2240123921,1162203018,4193849577,33687044,2139062782,1347481760,1010582648,2678045221,2829640523,1364325282,2745433693,1077985408,2408548869,2459086143,2644360225,943212656,4126475505,3166494563,3065430391,3671750063,555836226,269496352,4294908645,4092792573,3537006015,3452783745,202118168,320025894,3974901699,1600119230,2543297077,1145359496,387397934,3301201811,2812801621,2122220284,1027426170,1684319432,1566435258,421079858,1936954854,1616945344,2172753945,1330631070,3705438115,572679748,707427924,2425400123,2290647819,1179044492,4008585671,3099120491,336870440,3739122087,1583276732,185277718,3688593069,3772791771,842159716,976899700,168435220,1229577106,101059084,606366792,1549591736,3267517855,3553849021,2897014595,1650632388,2442242105,2509612081,3840161747,2038008818,3890688725,3368567691,926374254,1835907034,2374863873,3587531953,1313788572,2846482505,1819063512,1448540844,4109633523,3941213647,1701162954,2054852340,2930698567,134748176,3132806511,2021165296,623210314,774795868,471606328,2795958615,3031746419,3334885783,3907527627,3722280097,1953799400,522133822,1263263126,3183336545,2341176845,2324333839,1886425312,1044267644,3048588401,1718004428,1212733584,50529542,4143317495,235803164,1633788866,892690282,1465383342,3115962473,2256965911,3250673817,488449850,2661202215,3789633753,4177007595,2560144171,286339874,1768537042,3654906025,2391705863,2492770099,2610673197,505291324,2273808917,3924369609,3469625735,1431699370,673740880,3755965093,2358021891,2711746649,2307489801,218961690,3217021541,3873845719,1111672452,1751693520,1094828930,2576986153,757954394,252645662,2964376443,1414855848,3149649517,370555436],m=[1374988112,2118214995,437757123,975658646,1001089995,530400753,2902087851,1273168787,540080725,2910219766,2295101073,4110568485,1340463100,3307916247,641025152,3043140495,3736164937,632953703,1172967064,1576976609,3274667266,2169303058,2370213795,1809054150,59727847,361929877,3211623147,2505202138,3569255213,1484005843,1239443753,2395588676,1975683434,4102977912,2572697195,666464733,3202437046,4035489047,3374361702,2110667444,1675577880,3843699074,2538681184,1649639237,2976151520,3144396420,4269907996,4178062228,1883793496,2403728665,2497604743,1383856311,2876494627,1917518562,3810496343,1716890410,3001755655,800440835,2261089178,3543599269,807962610,599762354,33778362,3977675356,2328828971,2809771154,4077384432,1315562145,1708848333,101039829,3509871135,3299278474,875451293,2733856160,92987698,2767645557,193195065,1080094634,1584504582,3178106961,1042385657,2531067453,3711829422,1306967366,2438237621,1908694277,67556463,1615861247,429456164,3602770327,2302690252,1742315127,2968011453,126454664,3877198648,2043211483,2709260871,2084704233,4169408201,0,159417987,841739592,504459436,1817866830,4245618683,260388950,1034867998,908933415,168810852,1750902305,2606453969,607530554,202008497,2472011535,3035535058,463180190,2160117071,1641816226,1517767529,470948374,3801332234,3231722213,1008918595,303765277,235474187,4069246893,766945465,337553864,1475418501,2943682380,4003061179,2743034109,4144047775,1551037884,1147550661,1543208500,2336434550,3408119516,3069049960,3102011747,3610369226,1113818384,328671808,2227573024,2236228733,3535486456,2935566865,3341394285,496906059,3702665459,226906860,2009195472,733156972,2842737049,294930682,1206477858,2835123396,2700099354,1451044056,573804783,2269728455,3644379585,2362090238,2564033334,2801107407,2776292904,3669462566,1068351396,742039012,1350078989,1784663195,1417561698,4136440770,2430122216,775550814,2193862645,2673705150,1775276924,1876241833,3475313331,3366754619,270040487,3902563182,3678124923,3441850377,1851332852,3969562369,2203032232,3868552805,2868897406,566021896,4011190502,3135740889,1248802510,3936291284,699432150,832877231,708780849,3332740144,899835584,1951317047,4236429990,3767586992,866637845,4043610186,1106041591,2144161806,395441711,1984812685,1139781709,3433712980,3835036895,2664543715,1282050075,3240894392,1181045119,2640243204,25965917,4203181171,4211818798,3009879386,2463879762,3910161971,1842759443,2597806476,933301370,1509430414,3943906441,3467192302,3076639029,3776767469,2051518780,2631065433,1441952575,404016761,1942435775,1408749034,1610459739,3745345300,2017778566,3400528769,3110650942,941896748,3265478751,371049330,3168937228,675039627,4279080257,967311729,135050206,3635733660,1683407248,2076935265,3576870512,1215061108,3501741890],g=[1347548327,1400783205,3273267108,2520393566,3409685355,4045380933,2880240216,2471224067,1428173050,4138563181,2441661558,636813900,4233094615,3620022987,2149987652,2411029155,1239331162,1730525723,2554718734,3781033664,46346101,310463728,2743944855,3328955385,3875770207,2501218972,3955191162,3667219033,768917123,3545789473,692707433,1150208456,1786102409,2029293177,1805211710,3710368113,3065962831,401639597,1724457132,3028143674,409198410,2196052529,1620529459,1164071807,3769721975,2226875310,486441376,2499348523,1483753576,428819965,2274680428,3075636216,598438867,3799141122,1474502543,711349675,129166120,53458370,2592523643,2782082824,4063242375,2988687269,3120694122,1559041666,730517276,2460449204,4042459122,2706270690,3446004468,3573941694,533804130,2328143614,2637442643,2695033685,839224033,1973745387,957055980,2856345839,106852767,1371368976,4181598602,1033297158,2933734917,1179510461,3046200461,91341917,1862534868,4284502037,605657339,2547432937,3431546947,2003294622,3182487618,2282195339,954669403,3682191598,1201765386,3917234703,3388507166,0,2198438022,1211247597,2887651696,1315723890,4227665663,1443857720,507358933,657861945,1678381017,560487590,3516619604,975451694,2970356327,261314535,3535072918,2652609425,1333838021,2724322336,1767536459,370938394,182621114,3854606378,1128014560,487725847,185469197,2918353863,3106780840,3356761769,2237133081,1286567175,3152976349,4255350624,2683765030,3160175349,3309594171,878443390,1988838185,3704300486,1756818940,1673061617,3403100636,272786309,1075025698,545572369,2105887268,4174560061,296679730,1841768865,1260232239,4091327024,3960309330,3497509347,1814803222,2578018489,4195456072,575138148,3299409036,446754879,3629546796,4011996048,3347532110,3252238545,4270639778,915985419,3483825537,681933534,651868046,2755636671,3828103837,223377554,2607439820,1649704518,3270937875,3901806776,1580087799,4118987695,3198115200,2087309459,2842678573,3016697106,1003007129,2802849917,1860738147,2077965243,164439672,4100872472,32283319,2827177882,1709610350,2125135846,136428751,3874428392,3652904859,3460984630,3572145929,3593056380,2939266226,824852259,818324884,3224740454,930369212,2801566410,2967507152,355706840,1257309336,4148292826,243256656,790073846,2373340630,1296297904,1422699085,3756299780,3818836405,457992840,3099667487,2135319889,77422314,1560382517,1945798516,788204353,1521706781,1385356242,870912086,325965383,2358957921,2050466060,2388260884,2313884476,4006521127,901210569,3990953189,1014646705,1503449823,1062597235,2031621326,3212035895,3931371469,1533017514,350174575,2256028891,2177544179,1052338372,741876788,1606591296,1914052035,213705253,2334669897,1107234197,1899603969,3725069491,2631447780,2422494913,1635502980,1893020342,1950903388,1120974935],b=[2807058932,1699970625,2764249623,1586903591,1808481195,1173430173,1487645946,59984867,4199882800,1844882806,1989249228,1277555970,3623636965,3419915562,1149249077,2744104290,1514790577,459744698,244860394,3235995134,1963115311,4027744588,2544078150,4190530515,1608975247,2627016082,2062270317,1507497298,2200818878,567498868,1764313568,3359936201,2305455554,2037970062,1047239e3,1910319033,1337376481,2904027272,2892417312,984907214,1243112415,830661914,861968209,2135253587,2011214180,2927934315,2686254721,731183368,1750626376,4246310725,1820824798,4172763771,3542330227,48394827,2404901663,2871682645,671593195,3254988725,2073724613,145085239,2280796200,2779915199,1790575107,2187128086,472615631,3029510009,4075877127,3802222185,4107101658,3201631749,1646252340,4270507174,1402811438,1436590835,3778151818,3950355702,3963161475,4020912224,2667994737,273792366,2331590177,104699613,95345982,3175501286,2377486676,1560637892,3564045318,369057872,4213447064,3919042237,1137477952,2658625497,1119727848,2340947849,1530455833,4007360968,172466556,266959938,516552836,0,2256734592,3980931627,1890328081,1917742170,4294704398,945164165,3575528878,958871085,3647212047,2787207260,1423022939,775562294,1739656202,3876557655,2530391278,2443058075,3310321856,547512796,1265195639,437656594,3121275539,719700128,3762502690,387781147,218828297,3350065803,2830708150,2848461854,428169201,122466165,3720081049,1627235199,648017665,4122762354,1002783846,2117360635,695634755,3336358691,4234721005,4049844452,3704280881,2232435299,574624663,287343814,612205898,1039717051,840019705,2708326185,793451934,821288114,1391201670,3822090177,376187827,3113855344,1224348052,1679968233,2361698556,1058709744,752375421,2431590963,1321699145,3519142200,2734591178,188127444,2177869557,3727205754,2384911031,3215212461,2648976442,2450346104,3432737375,1180849278,331544205,3102249176,4150144569,2952102595,2159976285,2474404304,766078933,313773861,2570832044,2108100632,1668212892,3145456443,2013908262,418672217,3070356634,2594734927,1852171925,3867060991,3473416636,3907448597,2614737639,919489135,164948639,2094410160,2997825956,590424639,2486224549,1723872674,3157750862,3399941250,3501252752,3625268135,2555048196,3673637356,1343127501,4130281361,3599595085,2957853679,1297403050,81781910,3051593425,2283490410,532201772,1367295589,3926170974,895287692,1953757831,1093597963,492483431,3528626907,1446242576,1192455638,1636604631,209336225,344873464,1015671571,669961897,3375740769,3857572124,2973530695,3747192018,1933530610,3464042516,935293895,3454686199,2858115069,1863638845,3683022916,4085369519,3292445032,875313188,1080017571,3279033885,621591778,1233856572,2504130317,24197544,3017672716,3835484340,3247465558,2220981195,3060847922,1551124588,1463996600],w=[4104605777,1097159550,396673818,660510266,2875968315,2638606623,4200115116,3808662347,821712160,1986918061,3430322568,38544885,3856137295,718002117,893681702,1654886325,2975484382,3122358053,3926825029,4274053469,796197571,1290801793,1184342925,3556361835,2405426947,2459735317,1836772287,1381620373,3196267988,1948373848,3764988233,3385345166,3263785589,2390325492,1480485785,3111247143,3780097726,2293045232,548169417,3459953789,3746175075,439452389,1362321559,1400849762,1685577905,1806599355,2174754046,137073913,1214797936,1174215055,3731654548,2079897426,1943217067,1258480242,529487843,1437280870,3945269170,3049390895,3313212038,923313619,679998e3,3215307299,57326082,377642221,3474729866,2041877159,133361907,1776460110,3673476453,96392454,878845905,2801699524,777231668,4082475170,2330014213,4142626212,2213296395,1626319424,1906247262,1846563261,562755902,3708173718,1040559837,3871163981,1418573201,3294430577,114585348,1343618912,2566595609,3186202582,1078185097,3651041127,3896688048,2307622919,425408743,3371096953,2081048481,1108339068,2216610296,0,2156299017,736970802,292596766,1517440620,251657213,2235061775,2933202493,758720310,265905162,1554391400,1532285339,908999204,174567692,1474760595,4002861748,2610011675,3234156416,3693126241,2001430874,303699484,2478443234,2687165888,585122620,454499602,151849742,2345119218,3064510765,514443284,4044981591,1963412655,2581445614,2137062819,19308535,1928707164,1715193156,4219352155,1126790795,600235211,3992742070,3841024952,836553431,1669664834,2535604243,3323011204,1243905413,3141400786,4180808110,698445255,2653899549,2989552604,2253581325,3252932727,3004591147,1891211689,2487810577,3915653703,4237083816,4030667424,2100090966,865136418,1229899655,953270745,3399679628,3557504664,4118925222,2061379749,3079546586,2915017791,983426092,2022837584,1607244650,2118541908,2366882550,3635996816,972512814,3283088770,1568718495,3499326569,3576539503,621982671,2895723464,410887952,2623762152,1002142683,645401037,1494807662,2595684844,1335535747,2507040230,4293295786,3167684641,367585007,3885750714,1865862730,2668221674,2960971305,2763173681,1059270954,2777952454,2724642869,1320957812,2194319100,2429595872,2815956275,77089521,3973773121,3444575871,2448830231,1305906550,4021308739,2857194700,2516901860,3518358430,1787304780,740276417,1699839814,1592394909,2352307457,2272556026,188821243,1729977011,3687994002,274084841,3594982253,3613494426,2701949495,4162096729,322734571,2837966542,1640576439,484830689,1202797690,3537852828,4067639125,349075736,3342319475,4157467219,4255800159,1030690015,1155237496,2951971274,1757691577,607398968,2738905026,499347990,3794078908,1011452712,227885567,2818666809,213114376,3034881240,1455525988,3414450555,850817237,1817998408,3092726480],_=[0,235474187,470948374,303765277,941896748,908933415,607530554,708780849,1883793496,2118214995,1817866830,1649639237,1215061108,1181045119,1417561698,1517767529,3767586992,4003061179,4236429990,4069246893,3635733660,3602770327,3299278474,3400528769,2430122216,2664543715,2362090238,2193862645,2835123396,2801107407,3035535058,3135740889,3678124923,3576870512,3341394285,3374361702,3810496343,3977675356,4279080257,4043610186,2876494627,2776292904,3076639029,3110650942,2472011535,2640243204,2403728665,2169303058,1001089995,899835584,666464733,699432150,59727847,226906860,530400753,294930682,1273168787,1172967064,1475418501,1509430414,1942435775,2110667444,1876241833,1641816226,2910219766,2743034109,2976151520,3211623147,2505202138,2606453969,2302690252,2269728455,3711829422,3543599269,3240894392,3475313331,3843699074,3943906441,4178062228,4144047775,1306967366,1139781709,1374988112,1610459739,1975683434,2076935265,1775276924,1742315127,1034867998,866637845,566021896,800440835,92987698,193195065,429456164,395441711,1984812685,2017778566,1784663195,1683407248,1315562145,1080094634,1383856311,1551037884,101039829,135050206,437757123,337553864,1042385657,807962610,573804783,742039012,2531067453,2564033334,2328828971,2227573024,2935566865,2700099354,3001755655,3168937228,3868552805,3902563182,4203181171,4102977912,3736164937,3501741890,3265478751,3433712980,1106041591,1340463100,1576976609,1408749034,2043211483,2009195472,1708848333,1809054150,832877231,1068351396,766945465,599762354,159417987,126454664,361929877,463180190,2709260871,2943682380,3178106961,3009879386,2572697195,2538681184,2236228733,2336434550,3509871135,3745345300,3441850377,3274667266,3910161971,3877198648,4110568485,4211818798,2597806476,2497604743,2261089178,2295101073,2733856160,2902087851,3202437046,2968011453,3936291284,3835036895,4136440770,4169408201,3535486456,3702665459,3467192302,3231722213,2051518780,1951317047,1716890410,1750902305,1113818384,1282050075,1584504582,1350078989,168810852,67556463,371049330,404016761,841739592,1008918595,775550814,540080725,3969562369,3801332234,4035489047,4269907996,3569255213,3669462566,3366754619,3332740144,2631065433,2463879762,2160117071,2395588676,2767645557,2868897406,3102011747,3069049960,202008497,33778362,270040487,504459436,875451293,975658646,675039627,641025152,2084704233,1917518562,1615861247,1851332852,1147550661,1248802510,1484005843,1451044056,933301370,967311729,733156972,632953703,260388950,25965917,328671808,496906059,1206477858,1239443753,1543208500,1441952575,2144161806,1908694277,1675577880,1842759443,3610369226,3644379585,3408119516,3307916247,4011190502,3776767469,4077384432,4245618683,2809771154,2842737049,3144396420,3043140495,2673705150,2438237621,2203032232,2370213795],M=[0,185469197,370938394,487725847,741876788,657861945,975451694,824852259,1483753576,1400783205,1315723890,1164071807,1950903388,2135319889,1649704518,1767536459,2967507152,3152976349,2801566410,2918353863,2631447780,2547432937,2328143614,2177544179,3901806776,3818836405,4270639778,4118987695,3299409036,3483825537,3535072918,3652904859,2077965243,1893020342,1841768865,1724457132,1474502543,1559041666,1107234197,1257309336,598438867,681933534,901210569,1052338372,261314535,77422314,428819965,310463728,3409685355,3224740454,3710368113,3593056380,3875770207,3960309330,4045380933,4195456072,2471224067,2554718734,2237133081,2388260884,3212035895,3028143674,2842678573,2724322336,4138563181,4255350624,3769721975,3955191162,3667219033,3516619604,3431546947,3347532110,2933734917,2782082824,3099667487,3016697106,2196052529,2313884476,2499348523,2683765030,1179510461,1296297904,1347548327,1533017514,1786102409,1635502980,2087309459,2003294622,507358933,355706840,136428751,53458370,839224033,957055980,605657339,790073846,2373340630,2256028891,2607439820,2422494913,2706270690,2856345839,3075636216,3160175349,3573941694,3725069491,3273267108,3356761769,4181598602,4063242375,4011996048,3828103837,1033297158,915985419,730517276,545572369,296679730,446754879,129166120,213705253,1709610350,1860738147,1945798516,2029293177,1239331162,1120974935,1606591296,1422699085,4148292826,4233094615,3781033664,3931371469,3682191598,3497509347,3446004468,3328955385,2939266226,2755636671,3106780840,2988687269,2198438022,2282195339,2501218972,2652609425,1201765386,1286567175,1371368976,1521706781,1805211710,1620529459,2105887268,1988838185,533804130,350174575,164439672,46346101,870912086,954669403,636813900,788204353,2358957921,2274680428,2592523643,2441661558,2695033685,2880240216,3065962831,3182487618,3572145929,3756299780,3270937875,3388507166,4174560061,4091327024,4006521127,3854606378,1014646705,930369212,711349675,560487590,272786309,457992840,106852767,223377554,1678381017,1862534868,1914052035,2031621326,1211247597,1128014560,1580087799,1428173050,32283319,182621114,401639597,486441376,768917123,651868046,1003007129,818324884,1503449823,1385356242,1333838021,1150208456,1973745387,2125135846,1673061617,1756818940,2970356327,3120694122,2802849917,2887651696,2637442643,2520393566,2334669897,2149987652,3917234703,3799141122,4284502037,4100872472,3309594171,3460984630,3545789473,3629546796,2050466060,1899603969,1814803222,1730525723,1443857720,1560382517,1075025698,1260232239,575138148,692707433,878443390,1062597235,243256656,91341917,409198410,325965383,3403100636,3252238545,3704300486,3620022987,3874428392,3990953189,4042459122,4227665663,2460449204,2578018489,2226875310,2411029155,3198115200,3046200461,2827177882,2743944855],A=[0,218828297,437656594,387781147,875313188,958871085,775562294,590424639,1750626376,1699970625,1917742170,2135253587,1551124588,1367295589,1180849278,1265195639,3501252752,3720081049,3399941250,3350065803,3835484340,3919042237,4270507174,4085369519,3102249176,3051593425,2734591178,2952102595,2361698556,2177869557,2530391278,2614737639,3145456443,3060847922,2708326185,2892417312,2404901663,2187128086,2504130317,2555048196,3542330227,3727205754,3375740769,3292445032,3876557655,3926170974,4246310725,4027744588,1808481195,1723872674,1910319033,2094410160,1608975247,1391201670,1173430173,1224348052,59984867,244860394,428169201,344873464,935293895,984907214,766078933,547512796,1844882806,1627235199,2011214180,2062270317,1507497298,1423022939,1137477952,1321699145,95345982,145085239,532201772,313773861,830661914,1015671571,731183368,648017665,3175501286,2957853679,2807058932,2858115069,2305455554,2220981195,2474404304,2658625497,3575528878,3625268135,3473416636,3254988725,3778151818,3963161475,4213447064,4130281361,3599595085,3683022916,3432737375,3247465558,3802222185,4020912224,4172763771,4122762354,3201631749,3017672716,2764249623,2848461854,2331590177,2280796200,2431590963,2648976442,104699613,188127444,472615631,287343814,840019705,1058709744,671593195,621591778,1852171925,1668212892,1953757831,2037970062,1514790577,1463996600,1080017571,1297403050,3673637356,3623636965,3235995134,3454686199,4007360968,3822090177,4107101658,4190530515,2997825956,3215212461,2830708150,2779915199,2256734592,2340947849,2627016082,2443058075,172466556,122466165,273792366,492483431,1047239e3,861968209,612205898,695634755,1646252340,1863638845,2013908262,1963115311,1446242576,1530455833,1277555970,1093597963,1636604631,1820824798,2073724613,1989249228,1436590835,1487645946,1337376481,1119727848,164948639,81781910,331544205,516552836,1039717051,821288114,669961897,719700128,2973530695,3157750862,2871682645,2787207260,2232435299,2283490410,2667994737,2450346104,3647212047,3564045318,3279033885,3464042516,3980931627,3762502690,4150144569,4199882800,3070356634,3121275539,2904027272,2686254721,2200818878,2384911031,2570832044,2486224549,3747192018,3528626907,3310321856,3359936201,3950355702,3867060991,4049844452,4234721005,1739656202,1790575107,2108100632,1890328081,1402811438,1586903591,1233856572,1149249077,266959938,48394827,369057872,418672217,1002783846,919489135,567498868,752375421,209336225,24197544,376187827,459744698,945164165,895287692,574624663,793451934,1679968233,1764313568,2117360635,1933530610,1343127501,1560637892,1243112415,1192455638,3704280881,3519142200,3336358691,3419915562,3907448597,3857572124,4075877127,4294704398,3029510009,3113855344,2927934315,2744104290,2159976285,2377486676,2594734927,2544078150],E=[0,151849742,303699484,454499602,607398968,758720310,908999204,1059270954,1214797936,1097159550,1517440620,1400849762,1817998408,1699839814,2118541908,2001430874,2429595872,2581445614,2194319100,2345119218,3034881240,3186202582,2801699524,2951971274,3635996816,3518358430,3399679628,3283088770,4237083816,4118925222,4002861748,3885750714,1002142683,850817237,698445255,548169417,529487843,377642221,227885567,77089521,1943217067,2061379749,1640576439,1757691577,1474760595,1592394909,1174215055,1290801793,2875968315,2724642869,3111247143,2960971305,2405426947,2253581325,2638606623,2487810577,3808662347,3926825029,4044981591,4162096729,3342319475,3459953789,3576539503,3693126241,1986918061,2137062819,1685577905,1836772287,1381620373,1532285339,1078185097,1229899655,1040559837,923313619,740276417,621982671,439452389,322734571,137073913,19308535,3871163981,4021308739,4104605777,4255800159,3263785589,3414450555,3499326569,3651041127,2933202493,2815956275,3167684641,3049390895,2330014213,2213296395,2566595609,2448830231,1305906550,1155237496,1607244650,1455525988,1776460110,1626319424,2079897426,1928707164,96392454,213114376,396673818,514443284,562755902,679998e3,865136418,983426092,3708173718,3557504664,3474729866,3323011204,4180808110,4030667424,3945269170,3794078908,2507040230,2623762152,2272556026,2390325492,2975484382,3092726480,2738905026,2857194700,3973773121,3856137295,4274053469,4157467219,3371096953,3252932727,3673476453,3556361835,2763173681,2915017791,3064510765,3215307299,2156299017,2307622919,2459735317,2610011675,2081048481,1963412655,1846563261,1729977011,1480485785,1362321559,1243905413,1126790795,878845905,1030690015,645401037,796197571,274084841,425408743,38544885,188821243,3613494426,3731654548,3313212038,3430322568,4082475170,4200115116,3780097726,3896688048,2668221674,2516901860,2366882550,2216610296,3141400786,2989552604,2837966542,2687165888,1202797690,1320957812,1437280870,1554391400,1669664834,1787304780,1906247262,2022837584,265905162,114585348,499347990,349075736,736970802,585122620,972512814,821712160,2595684844,2478443234,2293045232,2174754046,3196267988,3079546586,2895723464,2777952454,3537852828,3687994002,3234156416,3385345166,4142626212,4293295786,3841024952,3992742070,174567692,57326082,410887952,292596766,777231668,660510266,1011452712,893681702,1108339068,1258480242,1343618912,1494807662,1715193156,1865862730,1948373848,2100090966,2701949495,2818666809,3004591147,3122358053,2235061775,2352307457,2535604243,2653899549,3915653703,3764988233,4219352155,4067639125,3444575871,3294430577,3746175075,3594982253,836553431,953270745,600235211,718002117,367585007,484830689,133361907,251657213,2041877159,1891211689,1806599355,1654886325,1568718495,1418573201,1335535747,1184342925];function S(e){for(var t=[],r=0;r<e.length;r+=4){ t.push(e[r]<<24|e[r+1]<<16|e[r+2]<<8|e[r+3]); }return t}var k=function(e){if(!(this instanceof k)){ throw Error("AES must be instanitated with `new`"); }Object.defineProperty(this,"key",{value:o(e,!0)}),this._prepare();};k.prototype._prepare=function(){var e=f[this.key.length];if(null==e){ throw new Error("invalid key size (must be 16, 24 or 32 bytes)"); }this._Ke=[],this._Kd=[];for(var t=0;t<=e;t++){ this._Ke.push([0,0,0,0]),this._Kd.push([0,0,0,0]); }var r,n=4*(e+1),i=this.key.length/4,o=S(this.key);for(t=0;t<i;t++){ r=t>>2,this._Ke[r][t%4]=o[t],this._Kd[e-r][t%4]=o[t]; }for(var s,a=0,u=i;u<n;){if(s=o[i-1],o[0]^=d[s>>16&255]<<24^d[s>>8&255]<<16^d[255&s]<<8^d[s>>24&255]^c[a]<<24,a+=1,8!=i){ for(t=1;t<i;t++){ o[t]^=o[t-1]; } }else{for(t=1;t<i/2;t++){ o[t]^=o[t-1]; }s=o[i/2-1],o[i/2]^=d[255&s]^d[s>>8&255]<<8^d[s>>16&255]<<16^d[s>>24&255]<<24;for(t=i/2+1;t<i;t++){ o[t]^=o[t-1]; }}for(t=0;t<i&&u<n;){ l=u>>2,h=u%4,this._Ke[l][h]=o[t],this._Kd[e-l][h]=o[t++],u++; }}for(var l=1;l<e;l++){ for(var h=0;h<4;h++){ s=this._Kd[l][h],this._Kd[l][h]=_[s>>24&255]^M[s>>16&255]^A[s>>8&255]^E[255&s]; } }},k.prototype.encrypt=function(e){if(16!=e.length){ throw new Error("invalid plaintext size (must be 16 bytes)"); }for(var t=this._Ke.length-1,r=[0,0,0,0],n=S(e),i=0;i<4;i++){ n[i]^=this._Ke[0][i]; }for(var o=1;o<t;o++){for(i=0;i<4;i++){ r[i]=h[n[i]>>24&255]^p[n[(i+1)%4]>>16&255]^v[n[(i+2)%4]>>8&255]^y[255&n[(i+3)%4]]^this._Ke[o][i]; }n=r.slice();}var s,a=u(16);for(i=0;i<4;i++){ s=this._Ke[t][i],a[4*i]=255&(d[n[i]>>24&255]^s>>24),a[4*i+1]=255&(d[n[(i+1)%4]>>16&255]^s>>16),a[4*i+2]=255&(d[n[(i+2)%4]>>8&255]^s>>8),a[4*i+3]=255&(d[255&n[(i+3)%4]]^s); }return a},k.prototype.decrypt=function(e){if(16!=e.length){ throw new Error("invalid ciphertext size (must be 16 bytes)"); }for(var t=this._Kd.length-1,r=[0,0,0,0],n=S(e),i=0;i<4;i++){ n[i]^=this._Kd[0][i]; }for(var o=1;o<t;o++){for(i=0;i<4;i++){ r[i]=m[n[i]>>24&255]^g[n[(i+3)%4]>>16&255]^b[n[(i+2)%4]>>8&255]^w[255&n[(i+1)%4]]^this._Kd[o][i]; }n=r.slice();}var s,a=u(16);for(i=0;i<4;i++){ s=this._Kd[t][i],a[4*i]=255&(l[n[i]>>24&255]^s>>24),a[4*i+1]=255&(l[n[(i+3)%4]>>16&255]^s>>16),a[4*i+2]=255&(l[n[(i+2)%4]>>8&255]^s>>8),a[4*i+3]=255&(l[255&n[(i+1)%4]]^s); }return a};var N=function(e){if(!(this instanceof N)){ throw Error("AES must be instanitated with `new`"); }this.description="Electronic Code Block",this.name="ecb",this._aes=new k(e);};N.prototype.encrypt=function(e){if((e=o(e)).length%16!=0){ throw new Error("invalid plaintext size (must be multiple of 16 bytes)"); }for(var t=u(e.length),r=u(16),n=0;n<e.length;n+=16){ s(e,r,0,n,n+16),s(r=this._aes.encrypt(r),t,n); }return t},N.prototype.decrypt=function(e){if((e=o(e)).length%16!=0){ throw new Error("invalid ciphertext size (must be multiple of 16 bytes)"); }for(var t=u(e.length),r=u(16),n=0;n<e.length;n+=16){ s(e,r,0,n,n+16),s(r=this._aes.decrypt(r),t,n); }return t};var P=function(e,t){if(!(this instanceof P)){ throw Error("AES must be instanitated with `new`"); }if(this.description="Cipher Block Chaining",this.name="cbc",t){if(16!=t.length){ throw new Error("invalid initialation vector size (must be 16 bytes)") }}else { t=u(16); }this._lastCipherblock=o(t,!0),this._aes=new k(e);};P.prototype.encrypt=function(e){if((e=o(e)).length%16!=0){ throw new Error("invalid plaintext size (must be multiple of 16 bytes)"); }for(var t=u(e.length),r=u(16),n=0;n<e.length;n+=16){s(e,r,0,n,n+16);for(var i=0;i<16;i++){ r[i]^=this._lastCipherblock[i]; }this._lastCipherblock=this._aes.encrypt(r),s(this._lastCipherblock,t,n);}return t},P.prototype.decrypt=function(e){if((e=o(e)).length%16!=0){ throw new Error("invalid ciphertext size (must be multiple of 16 bytes)"); }for(var t=u(e.length),r=u(16),n=0;n<e.length;n+=16){s(e,r,0,n,n+16),r=this._aes.decrypt(r);for(var i=0;i<16;i++){ t[n+i]=r[i]^this._lastCipherblock[i]; }s(e,this._lastCipherblock,0,n,n+16);}return t};var x=function(e,t,r){if(!(this instanceof x)){ throw Error("AES must be instanitated with `new`"); }if(this.description="Cipher Feedback",this.name="cfb",t){if(16!=t.length){ throw new Error("invalid initialation vector size (must be 16 size)") }}else { t=u(16); }r=r||1,this.segmentSize=r,this._shiftRegister=o(t,!0),this._aes=new k(e);};x.prototype.encrypt=function(e){if(e.length%this.segmentSize!=0){ throw new Error("invalid plaintext size (must be segmentSize bytes)"); }for(var t,r=o(e,!0),n=0;n<r.length;n+=this.segmentSize){t=this._aes.encrypt(this._shiftRegister);for(var i=0;i<this.segmentSize;i++){ r[n+i]^=t[i]; }s(this._shiftRegister,this._shiftRegister,0,this.segmentSize),s(r,this._shiftRegister,16-this.segmentSize,n,n+this.segmentSize);}return r},x.prototype.decrypt=function(e){if(e.length%this.segmentSize!=0){ throw new Error("invalid ciphertext size (must be segmentSize bytes)"); }for(var t,r=o(e,!0),n=0;n<r.length;n+=this.segmentSize){t=this._aes.encrypt(this._shiftRegister);for(var i=0;i<this.segmentSize;i++){ r[n+i]^=t[i]; }s(this._shiftRegister,this._shiftRegister,0,this.segmentSize),s(e,this._shiftRegister,16-this.segmentSize,n,n+this.segmentSize);}return r};var I=function(e,t){if(!(this instanceof I)){ throw Error("AES must be instanitated with `new`"); }if(this.description="Output Feedback",this.name="ofb",t){if(16!=t.length){ throw new Error("invalid initialation vector size (must be 16 bytes)") }}else { t=u(16); }this._lastPrecipher=o(t,!0),this._lastPrecipherIndex=16,this._aes=new k(e);};I.prototype.encrypt=function(e){for(var t=o(e,!0),r=0;r<t.length;r++){ 16===this._lastPrecipherIndex&&(this._lastPrecipher=this._aes.encrypt(this._lastPrecipher),this._lastPrecipherIndex=0),t[r]^=this._lastPrecipher[this._lastPrecipherIndex++]; }return t},I.prototype.decrypt=I.prototype.encrypt;var T=function(e){if(!(this instanceof T)){ throw Error("Counter must be instanitated with `new`"); }0===e||e||(e=1),"number"==typeof e?(this._counter=u(16),this.setValue(e)):this.setBytes(e);};T.prototype.setValue=function(e){if("number"!=typeof e||parseInt(e)!=e){ throw new Error("invalid counter value (must be an integer)"); }for(var t=15;0<=t;--t){ this._counter[t]=e%256,e>>=8; }},T.prototype.setBytes=function(e){if(16!=(e=o(e,!0)).length){ throw new Error("invalid counter bytes size (must be 16 bytes)"); }this._counter=e;},T.prototype.increment=function(){for(var e=15;0<=e;e--){if(255!==this._counter[e]){this._counter[e]++;break}this._counter[e]=0;}};var R=function(e,t){if(!(this instanceof R)){ throw Error("AES must be instanitated with `new`"); }this.description="Counter",this.name="ctr",t instanceof T||(t=new T(t)),this._counter=t,this._remainingCounter=null,this._remainingCounterIndex=16,this._aes=new k(e);};R.prototype.encrypt=function(e){for(var t=o(e,!0),r=0;r<t.length;r++){ 16===this._remainingCounterIndex&&(this._remainingCounter=this._aes.encrypt(this._counter._counter),this._remainingCounterIndex=0,this._counter.increment()),t[r]^=this._remainingCounter[this._remainingCounterIndex++]; }return t},R.prototype.decrypt=R.prototype.encrypt;var O={AES:k,Counter:T,ModeOfOperation:{ecb:N,cbc:P,cfb:x,ofb:I,ctr:R},utils:{hex:a,utf8:t},padding:{pkcs7:{pad:function(e){var t=16-(e=o(e,!0)).length%16,r=u(e.length+t);s(e,r);for(var n=e.length;n<r.length;n++){ r[n]=t; }return r},strip:function(e){if((e=o(e,!0)).length<16){ throw new Error("PKCS#7 invalid length"); }var t=e[e.length-1];if(16<t){ throw new Error("PKCS#7 padding byte out of range"); }for(var r=e.length-t,n=0;n<t;n++){ if(e[r+n]!==t){ throw new Error("PKCS#7 invalid padding byte"); } }var i=u(r);return s(e,i,0,0,r),i}}},_arrayTest:{coerceArray:o,createArray:u,copyArray:s}};void 0!==B?C.exports=O:(e.aesjs&&(O._aesjs=e.aesjs),e.aesjs=O);}(this);},{}],9:[function(A,e,t){!function(e,t){function y(e,t){if(!e){ throw new Error(t||"Assertion failed") }}function r(e,t){e.super_=t;function r(){}r.prototype=t.prototype,e.prototype=new r,e.prototype.constructor=e;}function m(e,t,r){if(m.isBN(e)){ return e; }this.negative=0,this.words=null,this.length=0,(this.red=null)!==e&&("le"!==t&&"be"!==t||(r=t,t=10),this._init(e||0,t||10,r||"be"));}var n;"object"==typeof e?e.exports=m:t.BN=m,(m.BN=m).wordSize=26;try{n=A("buffer").Buffer;}catch(e){}function s(e,t,r){for(var n=0,i=Math.min(e.length,r),o=t;o<i;o++){var s=e.charCodeAt(o)-48;n<<=4,n|=49<=s&&s<=54?s-49+10:17<=s&&s<=22?s-17+10:15&s;}return n}function f(e,t,r,n){for(var i=0,o=Math.min(e.length,r),s=t;s<o;s++){var a=e.charCodeAt(s)-48;i*=n,i+=49<=a?a-49+10:17<=a?a-17+10:a;}return i}m.isBN=function(e){return e instanceof m||null!==e&&"object"==typeof e&&e.constructor.wordSize===m.wordSize&&Array.isArray(e.words)},m.max=function(e,t){return 0<e.cmp(t)?e:t},m.min=function(e,t){return e.cmp(t)<0?e:t},m.prototype._init=function(e,t,r){if("number"==typeof e){ return this._initNumber(e,t,r); }if("object"==typeof e){ return this._initArray(e,t,r); }"hex"===t&&(t=16),y(t===(0|t)&&2<=t&&t<=36);var n=0;"-"===(e=e.toString().replace(/\s+/g,""))[0]&&n++,16===t?this._parseHex(e,n):this._parseBase(e,t,n),"-"===e[0]&&(this.negative=1),this.strip(),"le"===r&&this._initArray(this.toArray(),t,r);},m.prototype._initNumber=function(e,t,r){e<0&&(this.negative=1,e=-e),e<67108864?(this.words=[67108863&e],this.length=1):e<4503599627370496?(this.words=[67108863&e,e/67108864&67108863],this.length=2):(y(e<9007199254740992),this.words=[67108863&e,e/67108864&67108863,1],this.length=3),"le"===r&&this._initArray(this.toArray(),t,r);},m.prototype._initArray=function(e,t,r){if(y("number"==typeof e.length),e.length<=0){ return this.words=[0],this.length=1,this; }this.length=Math.ceil(e.length/3),this.words=new Array(this.length);for(var n=0;n<this.length;n++){ this.words[n]=0; }var i,o,s=0;if("be"===r){ for(n=e.length-1,i=0;0<=n;n-=3){ o=e[n]|e[n-1]<<8|e[n-2]<<16,this.words[i]|=o<<s&67108863,this.words[i+1]=o>>>26-s&67108863,26<=(s+=24)&&(s-=26,i++); } }else if("le"===r){ for(i=n=0;n<e.length;n+=3){ o=e[n]|e[n+1]<<8|e[n+2]<<16,this.words[i]|=o<<s&67108863,this.words[i+1]=o>>>26-s&67108863,26<=(s+=24)&&(s-=26,i++); } }return this.strip()},m.prototype._parseHex=function(e,t){this.length=Math.ceil((e.length-t)/6),this.words=new Array(this.length);for(var r=0;r<this.length;r++){ this.words[r]=0; }var n,i,o=0;for(r=e.length-6,n=0;t<=r;r-=6){ i=s(e,r,r+6),this.words[n]|=i<<o&67108863,this.words[n+1]|=i>>>26-o&4194303,26<=(o+=24)&&(o-=26,n++); }r+6!==t&&(i=s(e,t,r+6),this.words[n]|=i<<o&67108863,this.words[n+1]|=i>>>26-o&4194303),this.strip();},m.prototype._parseBase=function(e,t,r){this.words=[0];for(var n=0,i=this.length=1;i<=67108863;i*=t){ n++; }n--,i=i/t|0;for(var o=e.length-r,s=o%n,a=Math.min(o,o-s)+r,u=0,l=r;l<a;l+=n){ u=f(e,l,l+n,t),this.imuln(i),this.words[0]+u<67108864?this.words[0]+=u:this._iaddn(u); }if(0!=s){var h=1;for(u=f(e,l,e.length,t),l=0;l<s;l++){ h*=t; }this.imuln(h),this.words[0]+u<67108864?this.words[0]+=u:this._iaddn(u);}},m.prototype.copy=function(e){e.words=new Array(this.length);for(var t=0;t<this.length;t++){ e.words[t]=this.words[t]; }e.length=this.length,e.negative=this.negative,e.red=this.red;},m.prototype.clone=function(){var e=new m(null);return this.copy(e),e},m.prototype._expand=function(e){for(;this.length<e;){ this.words[this.length++]=0; }return this},m.prototype.strip=function(){for(;1<this.length&&0===this.words[this.length-1];){ this.length--; }return this._normSign()},m.prototype._normSign=function(){return 1===this.length&&0===this.words[0]&&(this.negative=0),this},m.prototype.inspect=function(){return (this.red?"<BN-R: ":"<BN: ")+this.toString(16)+">"};var c=["","0","00","000","0000","00000","000000","0000000","00000000","000000000","0000000000","00000000000","000000000000","0000000000000","00000000000000","000000000000000","0000000000000000","00000000000000000","000000000000000000","0000000000000000000","00000000000000000000","000000000000000000000","0000000000000000000000","00000000000000000000000","000000000000000000000000","0000000000000000000000000"],d=[0,0,25,16,12,11,10,9,8,8,7,7,7,7,6,6,6,6,6,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],p=[0,0,33554432,43046721,16777216,48828125,60466176,40353607,16777216,43046721,1e7,19487171,35831808,62748517,7529536,11390625,16777216,24137569,34012224,47045881,64e6,4084101,5153632,6436343,7962624,9765625,11881376,14348907,17210368,20511149,243e5,28629151,33554432,39135393,45435424,52521875,60466176];function i(e,t,r){r.negative=t.negative^e.negative;var n=e.length+t.length|0;n=(r.length=n)-1|0;var i=0|e.words[0],o=0|t.words[0],s=i*o,a=67108863&s,u=s/67108864|0;r.words[0]=a;for(var l=1;l<n;l++){for(var h=u>>>26,f=67108863&u,c=Math.min(l,t.length-1),d=Math.max(0,l-e.length+1);d<=c;d++){var p=l-d|0;h+=(s=(i=0|e.words[p])*(o=0|t.words[d])+f)/67108864|0,f=67108863&s;}r.words[l]=0|f,u=0|h;}return 0!==u?r.words[l]=0|u:r.length--,r.strip()}m.prototype.toString=function(e,t){var r;if(t=0|t||1,16===(e=e||10)||"hex"===e){r="";for(var n=0,i=0,o=0;o<this.length;o++){var s=this.words[o],a=(16777215&(s<<n|i)).toString(16);r=0!==(i=s>>>24-n&16777215)||o!==this.length-1?c[6-a.length]+a+r:a+r,26<=(n+=2)&&(n-=26,o--);}for(0!==i&&(r=i.toString(16)+r);r.length%t!=0;){ r="0"+r; }return 0!==this.negative&&(r="-"+r),r}if(e===(0|e)&&2<=e&&e<=36){var u=d[e],l=p[e];r="";var h=this.clone();for(h.negative=0;!h.isZero();){var f=h.modn(l).toString(e);r=(h=h.idivn(l)).isZero()?f+r:c[u-f.length]+f+r;}for(this.isZero()&&(r="0"+r);r.length%t!=0;){ r="0"+r; }return 0!==this.negative&&(r="-"+r),r}y(!1,"Base should be between 2 and 36");},m.prototype.toNumber=function(){var e=this.words[0];return 2===this.length?e+=67108864*this.words[1]:3===this.length&&1===this.words[2]?e+=4503599627370496+67108864*this.words[1]:2<this.length&&y(!1,"Number can only safely store up to 53 bits"),0!==this.negative?-e:e},m.prototype.toJSON=function(){return this.toString(16)},m.prototype.toBuffer=function(e,t){return y(void 0!==n),this.toArrayLike(n,e,t)},m.prototype.toArray=function(e,t){return this.toArrayLike(Array,e,t)},m.prototype.toArrayLike=function(e,t,r){var n=this.byteLength(),i=r||Math.max(1,n);y(n<=i,"byte array longer than desired length"),y(0<i,"Requested array length <= 0"),this.strip();var o,s,a="le"===t,u=new e(i),l=this.clone();if(a){for(s=0;!l.isZero();s++){ o=l.andln(255),l.iushrn(8),u[s]=o; }for(;s<i;s++){ u[s]=0; }}else{for(s=0;s<i-n;s++){ u[s]=0; }for(s=0;!l.isZero();s++){ o=l.andln(255),l.iushrn(8),u[i-s-1]=o; }}return u},m.prototype._countBits=Math.clz32?function(e){return 32-Math.clz32(e)}:function(e){var t=e,r=0;return 4096<=t&&(r+=13,t>>>=13),64<=t&&(r+=7,t>>>=7),8<=t&&(r+=4,t>>>=4),2<=t&&(r+=2,t>>>=2),r+t},m.prototype._zeroBits=function(e){if(0===e){ return 26; }var t=e,r=0;return 0==(8191&t)&&(r+=13,t>>>=13),0==(127&t)&&(r+=7,t>>>=7),0==(15&t)&&(r+=4,t>>>=4),0==(3&t)&&(r+=2,t>>>=2),0==(1&t)&&r++,r},m.prototype.bitLength=function(){var e=this.words[this.length-1],t=this._countBits(e);return 26*(this.length-1)+t},m.prototype.zeroBits=function(){if(this.isZero()){ return 0; }for(var e=0,t=0;t<this.length;t++){var r=this._zeroBits(this.words[t]);if(e+=r,26!==r){ break }}return e},m.prototype.byteLength=function(){return Math.ceil(this.bitLength()/8)},m.prototype.toTwos=function(e){return 0!==this.negative?this.abs().inotn(e).iaddn(1):this.clone()},m.prototype.fromTwos=function(e){return this.testn(e-1)?this.notn(e).iaddn(1).ineg():this.clone()},m.prototype.isNeg=function(){return 0!==this.negative},m.prototype.neg=function(){return this.clone().ineg()},m.prototype.ineg=function(){return this.isZero()||(this.negative^=1),this},m.prototype.iuor=function(e){for(;this.length<e.length;){ this.words[this.length++]=0; }for(var t=0;t<e.length;t++){ this.words[t]=this.words[t]|e.words[t]; }return this.strip()},m.prototype.ior=function(e){return y(0==(this.negative|e.negative)),this.iuor(e)},m.prototype.or=function(e){return this.length>e.length?this.clone().ior(e):e.clone().ior(this)},m.prototype.uor=function(e){return this.length>e.length?this.clone().iuor(e):e.clone().iuor(this)},m.prototype.iuand=function(e){var t;t=this.length>e.length?e:this;for(var r=0;r<t.length;r++){ this.words[r]=this.words[r]&e.words[r]; }return this.length=t.length,this.strip()},m.prototype.iand=function(e){return y(0==(this.negative|e.negative)),this.iuand(e)},m.prototype.and=function(e){return this.length>e.length?this.clone().iand(e):e.clone().iand(this)},m.prototype.uand=function(e){return this.length>e.length?this.clone().iuand(e):e.clone().iuand(this)},m.prototype.iuxor=function(e){var t,r;r=this.length>e.length?(t=this,e):(t=e,this);for(var n=0;n<r.length;n++){ this.words[n]=t.words[n]^r.words[n]; }if(this!==t){ for(;n<t.length;n++){ this.words[n]=t.words[n]; } }return this.length=t.length,this.strip()},m.prototype.ixor=function(e){return y(0==(this.negative|e.negative)),this.iuxor(e)},m.prototype.xor=function(e){return this.length>e.length?this.clone().ixor(e):e.clone().ixor(this)},m.prototype.uxor=function(e){return this.length>e.length?this.clone().iuxor(e):e.clone().iuxor(this)},m.prototype.inotn=function(e){y("number"==typeof e&&0<=e);var t=0|Math.ceil(e/26),r=e%26;this._expand(t),0<r&&t--;for(var n=0;n<t;n++){ this.words[n]=67108863&~this.words[n]; }return 0<r&&(this.words[n]=~this.words[n]&67108863>>26-r),this.strip()},m.prototype.notn=function(e){return this.clone().inotn(e)},m.prototype.setn=function(e,t){y("number"==typeof e&&0<=e);var r=e/26|0,n=e%26;return this._expand(1+r),this.words[r]=t?this.words[r]|1<<n:this.words[r]&~(1<<n),this.strip()},m.prototype.iadd=function(e){var t,r,n;if(0!==this.negative&&0===e.negative){ return this.negative=0,t=this.isub(e),this.negative^=1,this._normSign(); }if(0===this.negative&&0!==e.negative){ return e.negative=0,t=this.isub(e),e.negative=1,t._normSign(); }n=this.length>e.length?(r=this,e):(r=e,this);for(var i=0,o=0;o<n.length;o++){ t=(0|r.words[o])+(0|n.words[o])+i,this.words[o]=67108863&t,i=t>>>26; }for(;0!==i&&o<r.length;o++){ t=(0|r.words[o])+i,this.words[o]=67108863&t,i=t>>>26; }if(this.length=r.length,0!==i){ this.words[this.length]=i,this.length++; }else if(r!==this){ for(;o<r.length;o++){ this.words[o]=r.words[o]; } }return this},m.prototype.add=function(e){var t;return 0!==e.negative&&0===this.negative?(e.negative=0,t=this.sub(e),e.negative^=1,t):0===e.negative&&0!==this.negative?(this.negative=0,t=e.sub(this),this.negative=1,t):this.length>e.length?this.clone().iadd(e):e.clone().iadd(this)},m.prototype.isub=function(e){if(0!==e.negative){e.negative=0;var t=this.iadd(e);return e.negative=1,t._normSign()}if(0!==this.negative){ return this.negative=0,this.iadd(e),this.negative=1,this._normSign(); }var r,n,i=this.cmp(e);if(0===i){ return this.negative=0,this.length=1,this.words[0]=0,this; }n=0<i?(r=this,e):(r=e,this);for(var o=0,s=0;s<n.length;s++){ o=(t=(0|r.words[s])-(0|n.words[s])+o)>>26,this.words[s]=67108863&t; }for(;0!==o&&s<r.length;s++){ o=(t=(0|r.words[s])+o)>>26,this.words[s]=67108863&t; }if(0===o&&s<r.length&&r!==this){ for(;s<r.length;s++){ this.words[s]=r.words[s]; } }return this.length=Math.max(this.length,s),r!==this&&(this.negative=1),this.strip()},m.prototype.sub=function(e){return this.clone().isub(e)};var o=function(e,t,r){var n,i,o,s=e.words,a=t.words,u=r.words,l=0,h=0|s[0],f=8191&h,c=h>>>13,d=0|s[1],p=8191&d,v=d>>>13,y=0|s[2],m=8191&y,g=y>>>13,b=0|s[3],w=8191&b,_=b>>>13,M=0|s[4],A=8191&M,E=M>>>13,S=0|s[5],k=8191&S,N=S>>>13,P=0|s[6],x=8191&P,I=P>>>13,T=0|s[7],R=8191&T,O=T>>>13,C=0|s[8],B=8191&C,D=C>>>13,L=0|s[9],U=8191&L,F=L>>>13,j=0|a[0],G=8191&j,H=j>>>13,z=0|a[1],V=8191&z,K=z>>>13,q=0|a[2],W=8191&q,Z=q>>>13,J=0|a[3],X=8191&J,$=J>>>13,Q=0|a[4],Y=8191&Q,ee=Q>>>13,te=0|a[5],re=8191&te,ne=te>>>13,ie=0|a[6],oe=8191&ie,se=ie>>>13,ae=0|a[7],ue=8191&ae,le=ae>>>13,he=0|a[8],fe=8191&he,ce=he>>>13,de=0|a[9],pe=8191&de,ve=de>>>13;r.negative=e.negative^t.negative,r.length=19;var ye=(l+(n=Math.imul(f,G))|0)+((8191&(i=(i=Math.imul(f,H))+Math.imul(c,G)|0))<<13)|0;l=((o=Math.imul(c,H))+(i>>>13)|0)+(ye>>>26)|0,ye&=67108863,n=Math.imul(p,G),i=(i=Math.imul(p,H))+Math.imul(v,G)|0,o=Math.imul(v,H);var me=(l+(n=n+Math.imul(f,V)|0)|0)+((8191&(i=(i=i+Math.imul(f,K)|0)+Math.imul(c,V)|0))<<13)|0;l=((o=o+Math.imul(c,K)|0)+(i>>>13)|0)+(me>>>26)|0,me&=67108863,n=Math.imul(m,G),i=(i=Math.imul(m,H))+Math.imul(g,G)|0,o=Math.imul(g,H),n=n+Math.imul(p,V)|0,i=(i=i+Math.imul(p,K)|0)+Math.imul(v,V)|0,o=o+Math.imul(v,K)|0;var ge=(l+(n=n+Math.imul(f,W)|0)|0)+((8191&(i=(i=i+Math.imul(f,Z)|0)+Math.imul(c,W)|0))<<13)|0;l=((o=o+Math.imul(c,Z)|0)+(i>>>13)|0)+(ge>>>26)|0,ge&=67108863,n=Math.imul(w,G),i=(i=Math.imul(w,H))+Math.imul(_,G)|0,o=Math.imul(_,H),n=n+Math.imul(m,V)|0,i=(i=i+Math.imul(m,K)|0)+Math.imul(g,V)|0,o=o+Math.imul(g,K)|0,n=n+Math.imul(p,W)|0,i=(i=i+Math.imul(p,Z)|0)+Math.imul(v,W)|0,o=o+Math.imul(v,Z)|0;var be=(l+(n=n+Math.imul(f,X)|0)|0)+((8191&(i=(i=i+Math.imul(f,$)|0)+Math.imul(c,X)|0))<<13)|0;l=((o=o+Math.imul(c,$)|0)+(i>>>13)|0)+(be>>>26)|0,be&=67108863,n=Math.imul(A,G),i=(i=Math.imul(A,H))+Math.imul(E,G)|0,o=Math.imul(E,H),n=n+Math.imul(w,V)|0,i=(i=i+Math.imul(w,K)|0)+Math.imul(_,V)|0,o=o+Math.imul(_,K)|0,n=n+Math.imul(m,W)|0,i=(i=i+Math.imul(m,Z)|0)+Math.imul(g,W)|0,o=o+Math.imul(g,Z)|0,n=n+Math.imul(p,X)|0,i=(i=i+Math.imul(p,$)|0)+Math.imul(v,X)|0,o=o+Math.imul(v,$)|0;var we=(l+(n=n+Math.imul(f,Y)|0)|0)+((8191&(i=(i=i+Math.imul(f,ee)|0)+Math.imul(c,Y)|0))<<13)|0;l=((o=o+Math.imul(c,ee)|0)+(i>>>13)|0)+(we>>>26)|0,we&=67108863,n=Math.imul(k,G),i=(i=Math.imul(k,H))+Math.imul(N,G)|0,o=Math.imul(N,H),n=n+Math.imul(A,V)|0,i=(i=i+Math.imul(A,K)|0)+Math.imul(E,V)|0,o=o+Math.imul(E,K)|0,n=n+Math.imul(w,W)|0,i=(i=i+Math.imul(w,Z)|0)+Math.imul(_,W)|0,o=o+Math.imul(_,Z)|0,n=n+Math.imul(m,X)|0,i=(i=i+Math.imul(m,$)|0)+Math.imul(g,X)|0,o=o+Math.imul(g,$)|0,n=n+Math.imul(p,Y)|0,i=(i=i+Math.imul(p,ee)|0)+Math.imul(v,Y)|0,o=o+Math.imul(v,ee)|0;var _e=(l+(n=n+Math.imul(f,re)|0)|0)+((8191&(i=(i=i+Math.imul(f,ne)|0)+Math.imul(c,re)|0))<<13)|0;l=((o=o+Math.imul(c,ne)|0)+(i>>>13)|0)+(_e>>>26)|0,_e&=67108863,n=Math.imul(x,G),i=(i=Math.imul(x,H))+Math.imul(I,G)|0,o=Math.imul(I,H),n=n+Math.imul(k,V)|0,i=(i=i+Math.imul(k,K)|0)+Math.imul(N,V)|0,o=o+Math.imul(N,K)|0,n=n+Math.imul(A,W)|0,i=(i=i+Math.imul(A,Z)|0)+Math.imul(E,W)|0,o=o+Math.imul(E,Z)|0,n=n+Math.imul(w,X)|0,i=(i=i+Math.imul(w,$)|0)+Math.imul(_,X)|0,o=o+Math.imul(_,$)|0,n=n+Math.imul(m,Y)|0,i=(i=i+Math.imul(m,ee)|0)+Math.imul(g,Y)|0,o=o+Math.imul(g,ee)|0,n=n+Math.imul(p,re)|0,i=(i=i+Math.imul(p,ne)|0)+Math.imul(v,re)|0,o=o+Math.imul(v,ne)|0;var Me=(l+(n=n+Math.imul(f,oe)|0)|0)+((8191&(i=(i=i+Math.imul(f,se)|0)+Math.imul(c,oe)|0))<<13)|0;l=((o=o+Math.imul(c,se)|0)+(i>>>13)|0)+(Me>>>26)|0,Me&=67108863,n=Math.imul(R,G),i=(i=Math.imul(R,H))+Math.imul(O,G)|0,o=Math.imul(O,H),n=n+Math.imul(x,V)|0,i=(i=i+Math.imul(x,K)|0)+Math.imul(I,V)|0,o=o+Math.imul(I,K)|0,n=n+Math.imul(k,W)|0,i=(i=i+Math.imul(k,Z)|0)+Math.imul(N,W)|0,o=o+Math.imul(N,Z)|0,n=n+Math.imul(A,X)|0,i=(i=i+Math.imul(A,$)|0)+Math.imul(E,X)|0,o=o+Math.imul(E,$)|0,n=n+Math.imul(w,Y)|0,i=(i=i+Math.imul(w,ee)|0)+Math.imul(_,Y)|0,o=o+Math.imul(_,ee)|0,n=n+Math.imul(m,re)|0,i=(i=i+Math.imul(m,ne)|0)+Math.imul(g,re)|0,o=o+Math.imul(g,ne)|0,n=n+Math.imul(p,oe)|0,i=(i=i+Math.imul(p,se)|0)+Math.imul(v,oe)|0,o=o+Math.imul(v,se)|0;var Ae=(l+(n=n+Math.imul(f,ue)|0)|0)+((8191&(i=(i=i+Math.imul(f,le)|0)+Math.imul(c,ue)|0))<<13)|0;l=((o=o+Math.imul(c,le)|0)+(i>>>13)|0)+(Ae>>>26)|0,Ae&=67108863,n=Math.imul(B,G),i=(i=Math.imul(B,H))+Math.imul(D,G)|0,o=Math.imul(D,H),n=n+Math.imul(R,V)|0,i=(i=i+Math.imul(R,K)|0)+Math.imul(O,V)|0,o=o+Math.imul(O,K)|0,n=n+Math.imul(x,W)|0,i=(i=i+Math.imul(x,Z)|0)+Math.imul(I,W)|0,o=o+Math.imul(I,Z)|0,n=n+Math.imul(k,X)|0,i=(i=i+Math.imul(k,$)|0)+Math.imul(N,X)|0,o=o+Math.imul(N,$)|0,n=n+Math.imul(A,Y)|0,i=(i=i+Math.imul(A,ee)|0)+Math.imul(E,Y)|0,o=o+Math.imul(E,ee)|0,n=n+Math.imul(w,re)|0,i=(i=i+Math.imul(w,ne)|0)+Math.imul(_,re)|0,o=o+Math.imul(_,ne)|0,n=n+Math.imul(m,oe)|0,i=(i=i+Math.imul(m,se)|0)+Math.imul(g,oe)|0,o=o+Math.imul(g,se)|0,n=n+Math.imul(p,ue)|0,i=(i=i+Math.imul(p,le)|0)+Math.imul(v,ue)|0,o=o+Math.imul(v,le)|0;var Ee=(l+(n=n+Math.imul(f,fe)|0)|0)+((8191&(i=(i=i+Math.imul(f,ce)|0)+Math.imul(c,fe)|0))<<13)|0;l=((o=o+Math.imul(c,ce)|0)+(i>>>13)|0)+(Ee>>>26)|0,Ee&=67108863,n=Math.imul(U,G),i=(i=Math.imul(U,H))+Math.imul(F,G)|0,o=Math.imul(F,H),n=n+Math.imul(B,V)|0,i=(i=i+Math.imul(B,K)|0)+Math.imul(D,V)|0,o=o+Math.imul(D,K)|0,n=n+Math.imul(R,W)|0,i=(i=i+Math.imul(R,Z)|0)+Math.imul(O,W)|0,o=o+Math.imul(O,Z)|0,n=n+Math.imul(x,X)|0,i=(i=i+Math.imul(x,$)|0)+Math.imul(I,X)|0,o=o+Math.imul(I,$)|0,n=n+Math.imul(k,Y)|0,i=(i=i+Math.imul(k,ee)|0)+Math.imul(N,Y)|0,o=o+Math.imul(N,ee)|0,n=n+Math.imul(A,re)|0,i=(i=i+Math.imul(A,ne)|0)+Math.imul(E,re)|0,o=o+Math.imul(E,ne)|0,n=n+Math.imul(w,oe)|0,i=(i=i+Math.imul(w,se)|0)+Math.imul(_,oe)|0,o=o+Math.imul(_,se)|0,n=n+Math.imul(m,ue)|0,i=(i=i+Math.imul(m,le)|0)+Math.imul(g,ue)|0,o=o+Math.imul(g,le)|0,n=n+Math.imul(p,fe)|0,i=(i=i+Math.imul(p,ce)|0)+Math.imul(v,fe)|0,o=o+Math.imul(v,ce)|0;var Se=(l+(n=n+Math.imul(f,pe)|0)|0)+((8191&(i=(i=i+Math.imul(f,ve)|0)+Math.imul(c,pe)|0))<<13)|0;l=((o=o+Math.imul(c,ve)|0)+(i>>>13)|0)+(Se>>>26)|0,Se&=67108863,n=Math.imul(U,V),i=(i=Math.imul(U,K))+Math.imul(F,V)|0,o=Math.imul(F,K),n=n+Math.imul(B,W)|0,i=(i=i+Math.imul(B,Z)|0)+Math.imul(D,W)|0,o=o+Math.imul(D,Z)|0,n=n+Math.imul(R,X)|0,i=(i=i+Math.imul(R,$)|0)+Math.imul(O,X)|0,o=o+Math.imul(O,$)|0,n=n+Math.imul(x,Y)|0,i=(i=i+Math.imul(x,ee)|0)+Math.imul(I,Y)|0,o=o+Math.imul(I,ee)|0,n=n+Math.imul(k,re)|0,i=(i=i+Math.imul(k,ne)|0)+Math.imul(N,re)|0,o=o+Math.imul(N,ne)|0,n=n+Math.imul(A,oe)|0,i=(i=i+Math.imul(A,se)|0)+Math.imul(E,oe)|0,o=o+Math.imul(E,se)|0,n=n+Math.imul(w,ue)|0,i=(i=i+Math.imul(w,le)|0)+Math.imul(_,ue)|0,o=o+Math.imul(_,le)|0,n=n+Math.imul(m,fe)|0,i=(i=i+Math.imul(m,ce)|0)+Math.imul(g,fe)|0,o=o+Math.imul(g,ce)|0;var ke=(l+(n=n+Math.imul(p,pe)|0)|0)+((8191&(i=(i=i+Math.imul(p,ve)|0)+Math.imul(v,pe)|0))<<13)|0;l=((o=o+Math.imul(v,ve)|0)+(i>>>13)|0)+(ke>>>26)|0,ke&=67108863,n=Math.imul(U,W),i=(i=Math.imul(U,Z))+Math.imul(F,W)|0,o=Math.imul(F,Z),n=n+Math.imul(B,X)|0,i=(i=i+Math.imul(B,$)|0)+Math.imul(D,X)|0,o=o+Math.imul(D,$)|0,n=n+Math.imul(R,Y)|0,i=(i=i+Math.imul(R,ee)|0)+Math.imul(O,Y)|0,o=o+Math.imul(O,ee)|0,n=n+Math.imul(x,re)|0,i=(i=i+Math.imul(x,ne)|0)+Math.imul(I,re)|0,o=o+Math.imul(I,ne)|0,n=n+Math.imul(k,oe)|0,i=(i=i+Math.imul(k,se)|0)+Math.imul(N,oe)|0,o=o+Math.imul(N,se)|0,n=n+Math.imul(A,ue)|0,i=(i=i+Math.imul(A,le)|0)+Math.imul(E,ue)|0,o=o+Math.imul(E,le)|0,n=n+Math.imul(w,fe)|0,i=(i=i+Math.imul(w,ce)|0)+Math.imul(_,fe)|0,o=o+Math.imul(_,ce)|0;var Ne=(l+(n=n+Math.imul(m,pe)|0)|0)+((8191&(i=(i=i+Math.imul(m,ve)|0)+Math.imul(g,pe)|0))<<13)|0;l=((o=o+Math.imul(g,ve)|0)+(i>>>13)|0)+(Ne>>>26)|0,Ne&=67108863,n=Math.imul(U,X),i=(i=Math.imul(U,$))+Math.imul(F,X)|0,o=Math.imul(F,$),n=n+Math.imul(B,Y)|0,i=(i=i+Math.imul(B,ee)|0)+Math.imul(D,Y)|0,o=o+Math.imul(D,ee)|0,n=n+Math.imul(R,re)|0,i=(i=i+Math.imul(R,ne)|0)+Math.imul(O,re)|0,o=o+Math.imul(O,ne)|0,n=n+Math.imul(x,oe)|0,i=(i=i+Math.imul(x,se)|0)+Math.imul(I,oe)|0,o=o+Math.imul(I,se)|0,n=n+Math.imul(k,ue)|0,i=(i=i+Math.imul(k,le)|0)+Math.imul(N,ue)|0,o=o+Math.imul(N,le)|0,n=n+Math.imul(A,fe)|0,i=(i=i+Math.imul(A,ce)|0)+Math.imul(E,fe)|0,o=o+Math.imul(E,ce)|0;var Pe=(l+(n=n+Math.imul(w,pe)|0)|0)+((8191&(i=(i=i+Math.imul(w,ve)|0)+Math.imul(_,pe)|0))<<13)|0;l=((o=o+Math.imul(_,ve)|0)+(i>>>13)|0)+(Pe>>>26)|0,Pe&=67108863,n=Math.imul(U,Y),i=(i=Math.imul(U,ee))+Math.imul(F,Y)|0,o=Math.imul(F,ee),n=n+Math.imul(B,re)|0,i=(i=i+Math.imul(B,ne)|0)+Math.imul(D,re)|0,o=o+Math.imul(D,ne)|0,n=n+Math.imul(R,oe)|0,i=(i=i+Math.imul(R,se)|0)+Math.imul(O,oe)|0,o=o+Math.imul(O,se)|0,n=n+Math.imul(x,ue)|0,i=(i=i+Math.imul(x,le)|0)+Math.imul(I,ue)|0,o=o+Math.imul(I,le)|0,n=n+Math.imul(k,fe)|0,i=(i=i+Math.imul(k,ce)|0)+Math.imul(N,fe)|0,o=o+Math.imul(N,ce)|0;var xe=(l+(n=n+Math.imul(A,pe)|0)|0)+((8191&(i=(i=i+Math.imul(A,ve)|0)+Math.imul(E,pe)|0))<<13)|0;l=((o=o+Math.imul(E,ve)|0)+(i>>>13)|0)+(xe>>>26)|0,xe&=67108863,n=Math.imul(U,re),i=(i=Math.imul(U,ne))+Math.imul(F,re)|0,o=Math.imul(F,ne),n=n+Math.imul(B,oe)|0,i=(i=i+Math.imul(B,se)|0)+Math.imul(D,oe)|0,o=o+Math.imul(D,se)|0,n=n+Math.imul(R,ue)|0,i=(i=i+Math.imul(R,le)|0)+Math.imul(O,ue)|0,o=o+Math.imul(O,le)|0,n=n+Math.imul(x,fe)|0,i=(i=i+Math.imul(x,ce)|0)+Math.imul(I,fe)|0,o=o+Math.imul(I,ce)|0;var Ie=(l+(n=n+Math.imul(k,pe)|0)|0)+((8191&(i=(i=i+Math.imul(k,ve)|0)+Math.imul(N,pe)|0))<<13)|0;l=((o=o+Math.imul(N,ve)|0)+(i>>>13)|0)+(Ie>>>26)|0,Ie&=67108863,n=Math.imul(U,oe),i=(i=Math.imul(U,se))+Math.imul(F,oe)|0,o=Math.imul(F,se),n=n+Math.imul(B,ue)|0,i=(i=i+Math.imul(B,le)|0)+Math.imul(D,ue)|0,o=o+Math.imul(D,le)|0,n=n+Math.imul(R,fe)|0,i=(i=i+Math.imul(R,ce)|0)+Math.imul(O,fe)|0,o=o+Math.imul(O,ce)|0;var Te=(l+(n=n+Math.imul(x,pe)|0)|0)+((8191&(i=(i=i+Math.imul(x,ve)|0)+Math.imul(I,pe)|0))<<13)|0;l=((o=o+Math.imul(I,ve)|0)+(i>>>13)|0)+(Te>>>26)|0,Te&=67108863,n=Math.imul(U,ue),i=(i=Math.imul(U,le))+Math.imul(F,ue)|0,o=Math.imul(F,le),n=n+Math.imul(B,fe)|0,i=(i=i+Math.imul(B,ce)|0)+Math.imul(D,fe)|0,o=o+Math.imul(D,ce)|0;var Re=(l+(n=n+Math.imul(R,pe)|0)|0)+((8191&(i=(i=i+Math.imul(R,ve)|0)+Math.imul(O,pe)|0))<<13)|0;l=((o=o+Math.imul(O,ve)|0)+(i>>>13)|0)+(Re>>>26)|0,Re&=67108863,n=Math.imul(U,fe),i=(i=Math.imul(U,ce))+Math.imul(F,fe)|0,o=Math.imul(F,ce);var Oe=(l+(n=n+Math.imul(B,pe)|0)|0)+((8191&(i=(i=i+Math.imul(B,ve)|0)+Math.imul(D,pe)|0))<<13)|0;l=((o=o+Math.imul(D,ve)|0)+(i>>>13)|0)+(Oe>>>26)|0,Oe&=67108863;var Ce=(l+(n=Math.imul(U,pe))|0)+((8191&(i=(i=Math.imul(U,ve))+Math.imul(F,pe)|0))<<13)|0;return l=((o=Math.imul(F,ve))+(i>>>13)|0)+(Ce>>>26)|0,Ce&=67108863,u[0]=ye,u[1]=me,u[2]=ge,u[3]=be,u[4]=we,u[5]=_e,u[6]=Me,u[7]=Ae,u[8]=Ee,u[9]=Se,u[10]=ke,u[11]=Ne,u[12]=Pe,u[13]=xe,u[14]=Ie,u[15]=Te,u[16]=Re,u[17]=Oe,u[18]=Ce,0!==l&&(u[19]=l,r.length++),r};function a(e,t,r){return (new u).mulp(e,t,r)}function u(e,t){this.x=e,this.y=t;}Math.imul||(o=i),m.prototype.mulTo=function(e,t){var r=this.length+e.length;return 10===this.length&&10===e.length?o(this,e,t):r<63?i(this,e,t):r<1024?function(e,t,r){r.negative=t.negative^e.negative,r.length=e.length+t.length;for(var n=0,i=0,o=0;o<r.length-1;o++){var s=i;i=0;for(var a=67108863&n,u=Math.min(o,t.length-1),l=Math.max(0,o-e.length+1);l<=u;l++){var h=o-l,f=(0|e.words[h])*(0|t.words[l]),c=67108863&f;a=67108863&(c=c+a|0),i+=(s=(s=s+(f/67108864|0)|0)+(c>>>26)|0)>>>26,s&=67108863;}r.words[o]=a,n=s,s=i;}return 0!==n?r.words[o]=n:r.length--,r.strip()}(this,e,t):a(this,e,t)},u.prototype.makeRBT=function(e){for(var t=new Array(e),r=m.prototype._countBits(e)-1,n=0;n<e;n++){ t[n]=this.revBin(n,r,e); }return t},u.prototype.revBin=function(e,t,r){if(0===e||e===r-1){ return e; }for(var n=0,i=0;i<t;i++){ n|=(1&e)<<t-i-1,e>>=1; }return n},u.prototype.permute=function(e,t,r,n,i,o){for(var s=0;s<o;s++){ n[s]=t[e[s]],i[s]=r[e[s]]; }},u.prototype.transform=function(e,t,r,n,i,o){this.permute(o,e,t,r,n,i);for(var s=1;s<i;s<<=1){ for(var a=s<<1,u=Math.cos(2*Math.PI/a),l=Math.sin(2*Math.PI/a),h=0;h<i;h+=a){ for(var f=u,c=l,d=0;d<s;d++){var p=r[h+d],v=n[h+d],y=r[h+d+s],m=n[h+d+s],g=f*y-c*m;m=f*m+c*y,y=g,r[h+d]=p+y,n[h+d]=v+m,r[h+d+s]=p-y,n[h+d+s]=v-m,d!==a&&(g=u*f-l*c,c=u*c+l*f,f=g);} } }},u.prototype.guessLen13b=function(e,t){var r=1|Math.max(t,e),n=1&r,i=0;for(r=r/2|0;r;r>>>=1){ i++; }return 1<<i+1+n},u.prototype.conjugate=function(e,t,r){if(!(r<=1)){ for(var n=0;n<r/2;n++){var i=e[n];e[n]=e[r-n-1],e[r-n-1]=i,i=t[n],t[n]=-t[r-n-1],t[r-n-1]=-i;} }},u.prototype.normalize13b=function(e,t){for(var r=0,n=0;n<t/2;n++){var i=8192*Math.round(e[2*n+1]/t)+Math.round(e[2*n]/t)+r;e[n]=67108863&i,r=i<67108864?0:i/67108864|0;}return e},u.prototype.convert13b=function(e,t,r,n){for(var i=0,o=0;o<t;o++){ i+=0|e[o],r[2*o]=8191&i,i>>>=13,r[2*o+1]=8191&i,i>>>=13; }for(o=2*t;o<n;++o){ r[o]=0; }y(0===i),y(0==(-8192&i));},u.prototype.stub=function(e){for(var t=new Array(e),r=0;r<e;r++){ t[r]=0; }return t},u.prototype.mulp=function(e,t,r){var n=2*this.guessLen13b(e.length,t.length),i=this.makeRBT(n),o=this.stub(n),s=new Array(n),a=new Array(n),u=new Array(n),l=new Array(n),h=new Array(n),f=new Array(n),c=r.words;c.length=n,this.convert13b(e.words,e.length,s,n),this.convert13b(t.words,t.length,l,n),this.transform(s,o,a,u,n,i),this.transform(l,o,h,f,n,i);for(var d=0;d<n;d++){var p=a[d]*h[d]-u[d]*f[d];u[d]=a[d]*f[d]+u[d]*h[d],a[d]=p;}return this.conjugate(a,u,n),this.transform(a,u,c,o,n,i),this.conjugate(c,o,n),this.normalize13b(c,n),r.negative=e.negative^t.negative,r.length=e.length+t.length,r.strip()},m.prototype.mul=function(e){var t=new m(null);return t.words=new Array(this.length+e.length),this.mulTo(e,t)},m.prototype.mulf=function(e){var t=new m(null);return t.words=new Array(this.length+e.length),a(this,e,t)},m.prototype.imul=function(e){return this.clone().mulTo(e,this)},m.prototype.imuln=function(e){y("number"==typeof e),y(e<67108864);for(var t=0,r=0;r<this.length;r++){var n=(0|this.words[r])*e,i=(67108863&n)+(67108863&t);t>>=26,t+=n/67108864|0,t+=i>>>26,this.words[r]=67108863&i;}return 0!==t&&(this.words[r]=t,this.length++),this},m.prototype.muln=function(e){return this.clone().imuln(e)},m.prototype.sqr=function(){return this.mul(this)},m.prototype.isqr=function(){return this.imul(this.clone())},m.prototype.pow=function(e){var t=function(e){for(var t=new Array(e.bitLength()),r=0;r<t.length;r++){var n=r/26|0,i=r%26;t[r]=(e.words[n]&1<<i)>>>i;}return t}(e);if(0===t.length){ return new m(1); }for(var r=this,n=0;n<t.length&&0===t[n];n++,r=r.sqr()){ }if(++n<t.length){ for(var i=r.sqr();n<t.length;n++,i=i.sqr()){ 0!==t[n]&&(r=r.mul(i)); } }return r},m.prototype.iushln=function(e){y("number"==typeof e&&0<=e);var t,r=e%26,n=(e-r)/26,i=67108863>>>26-r<<26-r;if(0!=r){var o=0;for(t=0;t<this.length;t++){var s=this.words[t]&i,a=(0|this.words[t])-s<<r;this.words[t]=a|o,o=s>>>26-r;}o&&(this.words[t]=o,this.length++);}if(0!=n){for(t=this.length-1;0<=t;t--){ this.words[t+n]=this.words[t]; }for(t=0;t<n;t++){ this.words[t]=0; }this.length+=n;}return this.strip()},m.prototype.ishln=function(e){return y(0===this.negative),this.iushln(e)},m.prototype.iushrn=function(e,t,r){var n;y("number"==typeof e&&0<=e),n=t?(t-t%26)/26:0;var i=e%26,o=Math.min((e-i)/26,this.length),s=67108863^67108863>>>i<<i,a=r;if(n-=o,n=Math.max(0,n),a){for(var u=0;u<o;u++){ a.words[u]=this.words[u]; }a.length=o;}if(0===o);else if(this.length>o){ for(this.length-=o,u=0;u<this.length;u++){ this.words[u]=this.words[u+o]; } }else { this.words[0]=0,this.length=1; }var l=0;for(u=this.length-1;0<=u&&(0!==l||n<=u);u--){var h=0|this.words[u];this.words[u]=l<<26-i|h>>>i,l=h&s;}return a&&0!==l&&(a.words[a.length++]=l),0===this.length&&(this.words[0]=0,this.length=1),this.strip()},m.prototype.ishrn=function(e,t,r){return y(0===this.negative),this.iushrn(e,t,r)},m.prototype.shln=function(e){return this.clone().ishln(e)},m.prototype.ushln=function(e){return this.clone().iushln(e)},m.prototype.shrn=function(e){return this.clone().ishrn(e)},m.prototype.ushrn=function(e){return this.clone().iushrn(e)},m.prototype.testn=function(e){y("number"==typeof e&&0<=e);var t=e%26,r=(e-t)/26,n=1<<t;return !(this.length<=r)&&!!(this.words[r]&n)},m.prototype.imaskn=function(e){y("number"==typeof e&&0<=e);var t=e%26,r=(e-t)/26;if(y(0===this.negative,"imaskn works only with positive numbers"),this.length<=r){ return this; }if(0!=t&&r++,this.length=Math.min(r,this.length),0!=t){var n=67108863^67108863>>>t<<t;this.words[this.length-1]&=n;}return this.strip()},m.prototype.maskn=function(e){return this.clone().imaskn(e)},m.prototype.iaddn=function(e){return y("number"==typeof e),y(e<67108864),e<0?this.isubn(-e):0!==this.negative?(1===this.length&&(0|this.words[0])<e?(this.words[0]=e-(0|this.words[0]),this.negative=0):(this.negative=0,this.isubn(e),this.negative=1),this):this._iaddn(e)},m.prototype._iaddn=function(e){this.words[0]+=e;for(var t=0;t<this.length&&67108864<=this.words[t];t++){ this.words[t]-=67108864,t===this.length-1?this.words[t+1]=1:this.words[t+1]++; }return this.length=Math.max(this.length,t+1),this},m.prototype.isubn=function(e){if(y("number"==typeof e),y(e<67108864),e<0){ return this.iaddn(-e); }if(0!==this.negative){ return this.negative=0,this.iaddn(e),this.negative=1,this; }if(this.words[0]-=e,1===this.length&&this.words[0]<0){ this.words[0]=-this.words[0],this.negative=1; }else { for(var t=0;t<this.length&&this.words[t]<0;t++){ this.words[t]+=67108864,this.words[t+1]-=1; } }return this.strip()},m.prototype.addn=function(e){return this.clone().iaddn(e)},m.prototype.subn=function(e){return this.clone().isubn(e)},m.prototype.iabs=function(){return this.negative=0,this},m.prototype.abs=function(){return this.clone().iabs()},m.prototype._ishlnsubmul=function(e,t,r){var n,i,o=e.length+r;this._expand(o);var s=0;for(n=0;n<e.length;n++){i=(0|this.words[n+r])+s;var a=(0|e.words[n])*t;s=((i-=67108863&a)>>26)-(a/67108864|0),this.words[n+r]=67108863&i;}for(;n<this.length-r;n++){ s=(i=(0|this.words[n+r])+s)>>26,this.words[n+r]=67108863&i; }if(0===s){ return this.strip(); }for(y(-1===s),n=s=0;n<this.length;n++){ s=(i=-(0|this.words[n])+s)>>26,this.words[n]=67108863&i; }return this.negative=1,this.strip()},m.prototype._wordDiv=function(e,t){var r=(this.length,e.length),n=this.clone(),i=e,o=0|i.words[i.length-1];0!=(r=26-this._countBits(o))&&(i=i.ushln(r),n.iushln(r),o=0|i.words[i.length-1]);var s,a=n.length-i.length;if("mod"!==t){(s=new m(null)).length=1+a,s.words=new Array(s.length);for(var u=0;u<s.length;u++){ s.words[u]=0; }}var l=n.clone()._ishlnsubmul(i,1,a);0===l.negative&&(n=l,s&&(s.words[a]=1));for(var h=a-1;0<=h;h--){var f=67108864*(0|n.words[i.length+h])+(0|n.words[i.length+h-1]);for(f=Math.min(f/o|0,67108863),n._ishlnsubmul(i,f,h);0!==n.negative;){ f--,n.negative=0,n._ishlnsubmul(i,1,h),n.isZero()||(n.negative^=1); }s&&(s.words[h]=f);}return s&&s.strip(),n.strip(),"div"!==t&&0!=r&&n.iushrn(r),{div:s||null,mod:n}},m.prototype.divmod=function(e,t,r){return y(!e.isZero()),this.isZero()?{div:new m(0),mod:new m(0)}:0!==this.negative&&0===e.negative?(o=this.neg().divmod(e,t),"mod"!==t&&(n=o.div.neg()),"div"!==t&&(i=o.mod.neg(),r&&0!==i.negative&&i.iadd(e)),{div:n,mod:i}):0===this.negative&&0!==e.negative?(o=this.divmod(e.neg(),t),"mod"!==t&&(n=o.div.neg()),{div:n,mod:o.mod}):0!=(this.negative&e.negative)?(o=this.neg().divmod(e.neg(),t),"div"!==t&&(i=o.mod.neg(),r&&0!==i.negative&&i.isub(e)),{div:o.div,mod:i}):e.length>this.length||this.cmp(e)<0?{div:new m(0),mod:this}:1===e.length?"div"===t?{div:this.divn(e.words[0]),mod:null}:"mod"===t?{div:null,mod:new m(this.modn(e.words[0]))}:{div:this.divn(e.words[0]),mod:new m(this.modn(e.words[0]))}:this._wordDiv(e,t);var n,i,o;},m.prototype.div=function(e){return this.divmod(e,"div",!1).div},m.prototype.mod=function(e){return this.divmod(e,"mod",!1).mod},m.prototype.umod=function(e){return this.divmod(e,"mod",!0).mod},m.prototype.divRound=function(e){var t=this.divmod(e);if(t.mod.isZero()){ return t.div; }var r=0!==t.div.negative?t.mod.isub(e):t.mod,n=e.ushrn(1),i=e.andln(1),o=r.cmp(n);return o<0||1===i&&0===o?t.div:0!==t.div.negative?t.div.isubn(1):t.div.iaddn(1)},m.prototype.modn=function(e){y(e<=67108863);for(var t=(1<<26)%e,r=0,n=this.length-1;0<=n;n--){ r=(t*r+(0|this.words[n]))%e; }return r},m.prototype.idivn=function(e){y(e<=67108863);for(var t=0,r=this.length-1;0<=r;r--){var n=(0|this.words[r])+67108864*t;this.words[r]=n/e|0,t=n%e;}return this.strip()},m.prototype.divn=function(e){return this.clone().idivn(e)},m.prototype.egcd=function(e){y(0===e.negative),y(!e.isZero());var t=this,r=e.clone();t=0!==t.negative?t.umod(e):t.clone();for(var n=new m(1),i=new m(0),o=new m(0),s=new m(1),a=0;t.isEven()&&r.isEven();){ t.iushrn(1),r.iushrn(1),++a; }for(var u=r.clone(),l=t.clone();!t.isZero();){for(var h=0,f=1;0==(t.words[0]&f)&&h<26;++h,f<<=1){ }if(0<h){ for(t.iushrn(h);0<h--;){ (n.isOdd()||i.isOdd())&&(n.iadd(u),i.isub(l)),n.iushrn(1),i.iushrn(1); } }for(var c=0,d=1;0==(r.words[0]&d)&&c<26;++c,d<<=1){ }if(0<c){ for(r.iushrn(c);0<c--;){ (o.isOdd()||s.isOdd())&&(o.iadd(u),s.isub(l)),o.iushrn(1),s.iushrn(1); } }0<=t.cmp(r)?(t.isub(r),n.isub(o),i.isub(s)):(r.isub(t),o.isub(n),s.isub(i));}return {a:o,b:s,gcd:r.iushln(a)}},m.prototype._invmp=function(e){y(0===e.negative),y(!e.isZero());var t=this,r=e.clone();t=0!==t.negative?t.umod(e):t.clone();for(var n,i=new m(1),o=new m(0),s=r.clone();0<t.cmpn(1)&&0<r.cmpn(1);){for(var a=0,u=1;0==(t.words[0]&u)&&a<26;++a,u<<=1){ }if(0<a){ for(t.iushrn(a);0<a--;){ i.isOdd()&&i.iadd(s),i.iushrn(1); } }for(var l=0,h=1;0==(r.words[0]&h)&&l<26;++l,h<<=1){ }if(0<l){ for(r.iushrn(l);0<l--;){ o.isOdd()&&o.iadd(s),o.iushrn(1); } }0<=t.cmp(r)?(t.isub(r),i.isub(o)):(r.isub(t),o.isub(i));}return (n=0===t.cmpn(1)?i:o).cmpn(0)<0&&n.iadd(e),n},m.prototype.gcd=function(e){if(this.isZero()){ return e.abs(); }if(e.isZero()){ return this.abs(); }var t=this.clone(),r=e.clone();t.negative=0;for(var n=r.negative=0;t.isEven()&&r.isEven();n++){ t.iushrn(1),r.iushrn(1); }for(;;){for(;t.isEven();){ t.iushrn(1); }for(;r.isEven();){ r.iushrn(1); }var i=t.cmp(r);if(i<0){var o=t;t=r,r=o;}else if(0===i||0===r.cmpn(1)){ break; }t.isub(r);}return r.iushln(n)},m.prototype.invm=function(e){return this.egcd(e).a.umod(e)},m.prototype.isEven=function(){return 0==(1&this.words[0])},m.prototype.isOdd=function(){return 1==(1&this.words[0])},m.prototype.andln=function(e){return this.words[0]&e},m.prototype.bincn=function(e){y("number"==typeof e);var t=e%26,r=(e-t)/26,n=1<<t;if(this.length<=r){ return this._expand(1+r),this.words[r]|=n,this; }for(var i=n,o=r;0!==i&&o<this.length;o++){var s=0|this.words[o];i=(s+=i)>>>26,s&=67108863,this.words[o]=s;}return 0!==i&&(this.words[o]=i,this.length++),this},m.prototype.isZero=function(){return 1===this.length&&0===this.words[0]},m.prototype.cmpn=function(e){var t,r=e<0;if(0!==this.negative&&!r){ return -1; }if(0===this.negative&&r){ return 1; }if(this.strip(),1<this.length){ t=1; }else{r&&(e=-e),y(e<=67108863,"Number is too big");var n=0|this.words[0];t=n===e?0:n<e?-1:1;}return 0!==this.negative?0|-t:t},m.prototype.cmp=function(e){if(0!==this.negative&&0===e.negative){ return -1; }if(0===this.negative&&0!==e.negative){ return 1; }var t=this.ucmp(e);return 0!==this.negative?0|-t:t},m.prototype.ucmp=function(e){if(this.length>e.length){ return 1; }if(this.length<e.length){ return -1; }for(var t=0,r=this.length-1;0<=r;r--){var n=0|this.words[r],i=0|e.words[r];if(n!=i){n<i?t=-1:i<n&&(t=1);break}}return t},m.prototype.gtn=function(e){return 1===this.cmpn(e)},m.prototype.gt=function(e){return 1===this.cmp(e)},m.prototype.gten=function(e){return 0<=this.cmpn(e)},m.prototype.gte=function(e){return 0<=this.cmp(e)},m.prototype.ltn=function(e){return -1===this.cmpn(e)},m.prototype.lt=function(e){return -1===this.cmp(e)},m.prototype.lten=function(e){return this.cmpn(e)<=0},m.prototype.lte=function(e){return this.cmp(e)<=0},m.prototype.eqn=function(e){return 0===this.cmpn(e)},m.prototype.eq=function(e){return 0===this.cmp(e)},m.red=function(e){return new _(e)},m.prototype.toRed=function(e){return y(!this.red,"Already a number in reduction context"),y(0===this.negative,"red works only with positives"),e.convertTo(this)._forceRed(e)},m.prototype.fromRed=function(){return y(this.red,"fromRed works only with numbers in reduction context"),this.red.convertFrom(this)},m.prototype._forceRed=function(e){return this.red=e,this},m.prototype.forceRed=function(e){return y(!this.red,"Already a number in reduction context"),this._forceRed(e)},m.prototype.redAdd=function(e){return y(this.red,"redAdd works only with red numbers"),this.red.add(this,e)},m.prototype.redIAdd=function(e){return y(this.red,"redIAdd works only with red numbers"),this.red.iadd(this,e)},m.prototype.redSub=function(e){return y(this.red,"redSub works only with red numbers"),this.red.sub(this,e)},m.prototype.redISub=function(e){return y(this.red,"redISub works only with red numbers"),this.red.isub(this,e)},m.prototype.redShl=function(e){return y(this.red,"redShl works only with red numbers"),this.red.shl(this,e)},m.prototype.redMul=function(e){return y(this.red,"redMul works only with red numbers"),this.red._verify2(this,e),this.red.mul(this,e)},m.prototype.redIMul=function(e){return y(this.red,"redMul works only with red numbers"),this.red._verify2(this,e),this.red.imul(this,e)},m.prototype.redSqr=function(){return y(this.red,"redSqr works only with red numbers"),this.red._verify1(this),this.red.sqr(this)},m.prototype.redISqr=function(){return y(this.red,"redISqr works only with red numbers"),this.red._verify1(this),this.red.isqr(this)},m.prototype.redSqrt=function(){return y(this.red,"redSqrt works only with red numbers"),this.red._verify1(this),this.red.sqrt(this)},m.prototype.redInvm=function(){return y(this.red,"redInvm works only with red numbers"),this.red._verify1(this),this.red.invm(this)},m.prototype.redNeg=function(){return y(this.red,"redNeg works only with red numbers"),this.red._verify1(this),this.red.neg(this)},m.prototype.redPow=function(e){return y(this.red&&!e.red,"redPow(normalNum)"),this.red._verify1(this),this.red.pow(this,e)};var l={k256:null,p224:null,p192:null,p25519:null};function h(e,t){this.name=e,this.p=new m(t,16),this.n=this.p.bitLength(),this.k=new m(1).iushln(this.n).isub(this.p),this.tmp=this._tmp();}function v(){h.call(this,"k256","ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f");}function g(){h.call(this,"p224","ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001");}function b(){h.call(this,"p192","ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff");}function w(){h.call(this,"25519","7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed");}function _(e){if("string"==typeof e){var t=m._prime(e);this.m=t.p,this.prime=t;}else { y(e.gtn(1),"modulus must be greater than 1"),this.m=e,this.prime=null; }}function M(e){_.call(this,e),this.shift=this.m.bitLength(),this.shift%26!=0&&(this.shift+=26-this.shift%26),this.r=new m(1).iushln(this.shift),this.r2=this.imod(this.r.sqr()),this.rinv=this.r._invmp(this.m),this.minv=this.rinv.mul(this.r).isubn(1).div(this.m),this.minv=this.minv.umod(this.r),this.minv=this.r.sub(this.minv);}h.prototype._tmp=function(){var e=new m(null);return e.words=new Array(Math.ceil(this.n/13)),e},h.prototype.ireduce=function(e){for(var t,r=e;this.split(r,this.tmp),(t=(r=(r=this.imulK(r)).iadd(this.tmp)).bitLength())>this.n;){ }var n=t<this.n?-1:r.ucmp(this.p);return 0===n?(r.words[0]=0,r.length=1):0<n?r.isub(this.p):r.strip(),r},h.prototype.split=function(e,t){e.iushrn(this.n,0,t);},h.prototype.imulK=function(e){return e.imul(this.k)},r(v,h),v.prototype.split=function(e,t){for(var r=Math.min(e.length,9),n=0;n<r;n++){ t.words[n]=e.words[n]; }if(t.length=r,e.length<=9){ return e.words[0]=0,void(e.length=1); }var i=e.words[9];for(t.words[t.length++]=4194303&i,n=10;n<e.length;n++){var o=0|e.words[n];e.words[n-10]=(4194303&o)<<4|i>>>22,i=o;}i>>>=22,0===(e.words[n-10]=i)&&10<e.length?e.length-=10:e.length-=9;},v.prototype.imulK=function(e){e.words[e.length]=0,e.words[e.length+1]=0,e.length+=2;for(var t=0,r=0;r<e.length;r++){var n=0|e.words[r];t+=977*n,e.words[r]=67108863&t,t=64*n+(t/67108864|0);}return 0===e.words[e.length-1]&&(e.length--,0===e.words[e.length-1]&&e.length--),e},r(g,h),r(b,h),r(w,h),w.prototype.imulK=function(e){for(var t=0,r=0;r<e.length;r++){var n=19*(0|e.words[r])+t,i=67108863&n;n>>>=26,e.words[r]=i,t=n;}return 0!==t&&(e.words[e.length++]=t),e},m._prime=function(e){if(l[e]){ return l[e]; }var t;if("k256"===e){ t=new v; }else if("p224"===e){ t=new g; }else if("p192"===e){ t=new b; }else{if("p25519"!==e){ throw new Error("Unknown prime "+e); }t=new w;}return l[e]=t},_.prototype._verify1=function(e){y(0===e.negative,"red works only with positives"),y(e.red,"red works only with red numbers");},_.prototype._verify2=function(e,t){y(0==(e.negative|t.negative),"red works only with positives"),y(e.red&&e.red===t.red,"red works only with red numbers");},_.prototype.imod=function(e){return this.prime?this.prime.ireduce(e)._forceRed(this):e.umod(this.m)._forceRed(this)},_.prototype.neg=function(e){return e.isZero()?e.clone():this.m.sub(e)._forceRed(this)},_.prototype.add=function(e,t){this._verify2(e,t);var r=e.add(t);return 0<=r.cmp(this.m)&&r.isub(this.m),r._forceRed(this)},_.prototype.iadd=function(e,t){this._verify2(e,t);var r=e.iadd(t);return 0<=r.cmp(this.m)&&r.isub(this.m),r},_.prototype.sub=function(e,t){this._verify2(e,t);var r=e.sub(t);return r.cmpn(0)<0&&r.iadd(this.m),r._forceRed(this)},_.prototype.isub=function(e,t){this._verify2(e,t);var r=e.isub(t);return r.cmpn(0)<0&&r.iadd(this.m),r},_.prototype.shl=function(e,t){return this._verify1(e),this.imod(e.ushln(t))},_.prototype.imul=function(e,t){return this._verify2(e,t),this.imod(e.imul(t))},_.prototype.mul=function(e,t){return this._verify2(e,t),this.imod(e.mul(t))},_.prototype.isqr=function(e){return this.imul(e,e.clone())},_.prototype.sqr=function(e){return this.mul(e,e)},_.prototype.sqrt=function(e){if(e.isZero()){ return e.clone(); }var t=this.m.andln(3);if(y(t%2==1),3===t){var r=this.m.add(new m(1)).iushrn(2);return this.pow(e,r)}for(var n=this.m.subn(1),i=0;!n.isZero()&&0===n.andln(1);){ i++,n.iushrn(1); }y(!n.isZero());var o=new m(1).toRed(this),s=o.redNeg(),a=this.m.subn(1).iushrn(1),u=this.m.bitLength();for(u=new m(2*u*u).toRed(this);0!==this.pow(u,a).cmp(s);){ u.redIAdd(s); }for(var l=this.pow(u,n),h=this.pow(e,n.addn(1).iushrn(1)),f=this.pow(e,n),c=i;0!==f.cmp(o);){for(var d=f,p=0;0!==d.cmp(o);p++){ d=d.redSqr(); }y(p<c);var v=this.pow(l,new m(1).iushln(c-p-1));h=h.redMul(v),l=v.redSqr(),f=f.redMul(l),c=p;}return h},_.prototype.invm=function(e){var t=e._invmp(this.m);return 0!==t.negative?(t.negative=0,this.imod(t).redNeg()):this.imod(t)},_.prototype.pow=function(e,t){if(t.isZero()){ return new m(1).toRed(this); }if(0===t.cmpn(1)){ return e.clone(); }var r=new Array(16);r[0]=new m(1).toRed(this),r[1]=e;for(var n=2;n<r.length;n++){ r[n]=this.mul(r[n-1],e); }var i=r[0],o=0,s=0,a=t.bitLength()%26;for(0===a&&(a=26),n=t.length-1;0<=n;n--){for(var u=t.words[n],l=a-1;0<=l;l--){var h=u>>l&1;i!==r[0]&&(i=this.sqr(i)),0!=h||0!==o?(o<<=1,o|=h,(4===++s||0===n&&0===l)&&(i=this.mul(i,r[o]),o=s=0)):s=0;}a=26;}return i},_.prototype.convertTo=function(e){var t=e.umod(this.m);return t===e?t.clone():t},_.prototype.convertFrom=function(e){var t=e.clone();return t.red=null,t},m.mont=function(e){return new M(e)},r(M,_),M.prototype.convertTo=function(e){return this.imod(e.ushln(this.shift))},M.prototype.convertFrom=function(e){var t=this.imod(e.mul(this.rinv));return t.red=null,t},M.prototype.imul=function(e,t){if(e.isZero()||t.isZero()){ return e.words[0]=0,e.length=1,e; }var r=e.imul(t),n=r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),i=r.isub(n).iushrn(this.shift),o=i;return 0<=i.cmp(this.m)?o=i.isub(this.m):i.cmpn(0)<0&&(o=i.iadd(this.m)),o._forceRed(this)},M.prototype.mul=function(e,t){if(e.isZero()||t.isZero()){ return new m(0)._forceRed(this); }var r=e.mul(t),n=r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),i=r.isub(n).iushrn(this.shift),o=i;return 0<=i.cmp(this.m)?o=i.isub(this.m):i.cmpn(0)<0&&(o=i.iadd(this.m)),o._forceRed(this)},M.prototype.invm=function(e){return this.imod(e._invmp(this.m).mul(this.r2))._forceRed(this)};}(void 0===e||e,this);},{buffer:11}],10:[function(e,t,r){(function(r){t.exports=function(e){var t=new Uint8Array(e);return (r.crypto||r.msCrypto).getRandomValues(t),t};}).call(this,"undefined"!=typeof commonjsGlobal?commonjsGlobal:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});},{}],11:[function(e,t,r){},{}],12:[function(e,t,r){var n=r;n.version=e("../package.json").version,n.utils=e("./elliptic/utils"),n.rand=e("brorand"),n.hmacDRBG=e("./elliptic/hmac-drbg"),n.curve=e("./elliptic/curve"),n.curves=e("./elliptic/curves"),n.ec=e("./elliptic/ec"),n.eddsa=e("./elliptic/eddsa");},{"../package.json":26,"./elliptic/curve":15,"./elliptic/curves":18,"./elliptic/ec":19,"./elliptic/eddsa":22,"./elliptic/hmac-drbg":23,"./elliptic/utils":25,brorand:10}],13:[function(e,t,r){var n=e("bn.js"),i=e("../../elliptic").utils,S=i.getNAF,k=i.getJSF,f=i.assert;function o(e,t){this.type=e,this.p=new n(t.p,16),this.red=t.prime?n.red(t.prime):n.mont(this.p),this.zero=new n(0).toRed(this.red),this.one=new n(1).toRed(this.red),this.two=new n(2).toRed(this.red),this.n=t.n&&new n(t.n,16),this.g=t.g&&this.pointFromJSON(t.g,t.gRed),this._wnafT1=new Array(4),this._wnafT2=new Array(4),this._wnafT3=new Array(4),this._wnafT4=new Array(4);var r=this.n&&this.p.div(this.n);!r||0<r.cmpn(100)?this.redN=null:(this._maxwellTrick=!0,this.redN=this.n.toRed(this.red));}function s(e,t){this.curve=e,this.type=t,this.precomputed=null;}(t.exports=o).prototype.point=function(){throw new Error("Not implemented")},o.prototype.validate=function(){throw new Error("Not implemented")},o.prototype._fixedNafMul=function(e,t){f(e.precomputed);var r=e._getDoubles(),n=S(t,1),i=(1<<r.step+1)-(r.step%2==0?2:1);i/=3;for(var o=[],s=0;s<n.length;s+=r.step){var a=0;for(t=s+r.step-1;s<=t;t--){ a=(a<<1)+n[t]; }o.push(a);}for(var u=this.jpoint(null,null,null),l=this.jpoint(null,null,null),h=i;0<h;h--){for(s=0;s<o.length;s++){(a=o[s])===h?l=l.mixedAdd(r.points[s]):a===-h&&(l=l.mixedAdd(r.points[s].neg()));}u=u.add(l);}return u.toP()},o.prototype._wnafMul=function(e,t){var r=4,n=e._getNAFPoints(r);r=n.wnd;for(var i=n.points,o=S(t,r),s=this.jpoint(null,null,null),a=o.length-1;0<=a;a--){for(t=0;0<=a&&0===o[a];a--){ t++; }if(0<=a&&t++,s=s.dblp(t),a<0){ break; }var u=o[a];f(0!==u),s="affine"===e.type?0<u?s.mixedAdd(i[u-1>>1]):s.mixedAdd(i[-u-1>>1].neg()):0<u?s.add(i[u-1>>1]):s.add(i[-u-1>>1].neg());}return "affine"===e.type?s.toP():s},o.prototype._wnafMulAdd=function(e,t,r,n,i){for(var o=this._wnafT1,s=this._wnafT2,a=this._wnafT3,u=0,l=0;l<n;l++){var h=(A=t[l])._getNAFPoints(e);o[l]=h.wnd,s[l]=h.points;}for(l=n-1;1<=l;l-=2){var f=l-1,c=l;if(1===o[f]&&1===o[c]){var d=[t[f],null,null,t[c]];0===t[f].y.cmp(t[c].y)?(d[1]=t[f].add(t[c]),d[2]=t[f].toJ().mixedAdd(t[c].neg())):0===t[f].y.cmp(t[c].y.redNeg())?(d[1]=t[f].toJ().mixedAdd(t[c]),d[2]=t[f].add(t[c].neg())):(d[1]=t[f].toJ().mixedAdd(t[c]),d[2]=t[f].toJ().mixedAdd(t[c].neg()));var p=[-3,-1,-5,-7,0,7,5,1,3],v=k(r[f],r[c]);u=Math.max(v[0].length,u),a[f]=new Array(u),a[c]=new Array(u);for(var y=0;y<u;y++){var m=0|v[0][y],g=0|v[1][y];a[f][y]=p[3*(1+m)+(1+g)],a[c][y]=0,s[f]=d;}}else { a[f]=S(r[f],o[f]),a[c]=S(r[c],o[c]),u=Math.max(a[f].length,u),u=Math.max(a[c].length,u); }}var b=this.jpoint(null,null,null),w=this._wnafT4;for(l=u;0<=l;l--){for(var _=0;0<=l;){var M=!0;for(y=0;y<n;y++){ w[y]=0|a[y][l],0!==w[y]&&(M=!1); }if(!M){ break; }_++,l--;}if(0<=l&&_++,b=b.dblp(_),l<0){ break; }for(y=0;y<n;y++){var A,E=w[y];0!==E&&(0<E?A=s[y][E-1>>1]:E<0&&(A=s[y][-E-1>>1].neg()),b="affine"===A.type?b.mixedAdd(A):b.add(A));}}for(l=0;l<n;l++){ s[l]=null; }return i?b:b.toP()},(o.BasePoint=s).prototype.eq=function(){throw new Error("Not implemented")},s.prototype.validate=function(){return this.curve.validate(this)},o.prototype.decodePoint=function(e,t){e=i.toArray(e,t);var r=this.p.byteLength();if((4===e[0]||6===e[0]||7===e[0])&&e.length-1==2*r){ return 6===e[0]?f(e[e.length-1]%2==0):7===e[0]&&f(e[e.length-1]%2==1),this.point(e.slice(1,1+r),e.slice(1+r,1+2*r)); }if((2===e[0]||3===e[0])&&e.length-1===r){ return this.pointFromX(e.slice(1,1+r),3===e[0]); }throw new Error("Unknown point format")},s.prototype.encodeCompressed=function(e){return this.encode(e,!0)},s.prototype._encode=function(e){var t=this.curve.p.byteLength(),r=this.getX().toArray("be",t);return e?[this.getY().isEven()?2:3].concat(r):[4].concat(r,this.getY().toArray("be",t))},s.prototype.encode=function(e,t){return i.encode(this._encode(t),e)},s.prototype.precompute=function(e){if(this.precomputed){ return this; }var t={doubles:null,naf:null,beta:null};return t.naf=this._getNAFPoints(8),t.doubles=this._getDoubles(4,e),t.beta=this._getBeta(),this.precomputed=t,this},s.prototype._hasDoubles=function(e){if(!this.precomputed){ return !1; }var t=this.precomputed.doubles;return !!t&&t.points.length>=Math.ceil((e.bitLength()+1)/t.step)},s.prototype._getDoubles=function(e,t){if(this.precomputed&&this.precomputed.doubles){ return this.precomputed.doubles; }for(var r=[this],n=this,i=0;i<t;i+=e){for(var o=0;o<e;o++){ n=n.dbl(); }r.push(n);}return {step:e,points:r}},s.prototype._getNAFPoints=function(e){if(this.precomputed&&this.precomputed.naf){ return this.precomputed.naf; }for(var t=[this],r=(1<<e)-1,n=1==r?null:this.dbl(),i=1;i<r;i++){ t[i]=t[i-1].add(n); }return {wnd:e,points:t}},s.prototype._getBeta=function(){return null},s.prototype.dblp=function(e){for(var t=this,r=0;r<e;r++){ t=t.dbl(); }return t};},{"../../elliptic":12,"bn.js":9}],14:[function(e,t,r){t.exports={};},{}],15:[function(e,t,r){var n=r;n.base=e("./base"),n.short=e("./short"),n.mont=e("./mont"),n.edwards=e("./edwards");},{"./base":13,"./edwards":14,"./mont":16,"./short":17}],16:[function(e,t,r){arguments[4][14][0].apply(r,arguments);},{dup:14}],17:[function(e,t,r){var n=e("../curve"),i=e("../../elliptic"),_=e("bn.js"),o=e("inherits"),s=n.base,a=i.utils.assert;function u(e){s.call(this,"short",e),this.a=new _(e.a,16).toRed(this.red),this.b=new _(e.b,16).toRed(this.red),this.tinv=this.two.redInvm(),this.zeroA=0===this.a.fromRed().cmpn(0),this.threeA=0===this.a.fromRed().sub(this.p).cmpn(-3),this.endo=this._getEndomorphism(e),this._endoWnafT1=new Array(4),this._endoWnafT2=new Array(4);}function l(e,t,r,n){s.BasePoint.call(this,e,"affine"),null===t&&null===r?(this.x=null,this.y=null,this.inf=!0):(this.x=new _(t,16),this.y=new _(r,16),n&&(this.x.forceRed(this.curve.red),this.y.forceRed(this.curve.red)),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.inf=!1);}function h(e,t,r,n){s.BasePoint.call(this,e,"jacobian"),null===t&&null===r&&null===n?(this.x=this.curve.one,this.y=this.curve.one,this.z=new _(0)):(this.x=new _(t,16),this.y=new _(r,16),this.z=new _(n,16)),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.z.red||(this.z=this.z.toRed(this.curve.red)),this.zOne=this.z===this.curve.one;}o(u,s),(t.exports=u).prototype._getEndomorphism=function(e){if(this.zeroA&&this.g&&this.n&&1===this.p.modn(3)){var t,r;if(e.beta){ t=new _(e.beta,16).toRed(this.red); }else{var n=this._getEndoRoots(this.p);t=(t=n[0].cmp(n[1])<0?n[0]:n[1]).toRed(this.red);}if(e.lambda){ r=new _(e.lambda,16); }else{var i=this._getEndoRoots(this.n);0===this.g.mul(i[0]).x.cmp(this.g.x.redMul(t))?r=i[0]:(r=i[1],a(0===this.g.mul(r).x.cmp(this.g.x.redMul(t))));}return {beta:t,lambda:r,basis:e.basis?e.basis.map(function(e){return {a:new _(e.a,16),b:new _(e.b,16)}}):this._getEndoBasis(r)}}},u.prototype._getEndoRoots=function(e){var t=e===this.p?this.red:_.mont(e),r=new _(2).toRed(t).redInvm(),n=r.redNeg(),i=new _(3).toRed(t).redNeg().redSqrt().redMul(r);return [n.redAdd(i).fromRed(),n.redSub(i).fromRed()]},u.prototype._getEndoBasis=function(e){for(var t,r,n,i,o,s,a,u,l,h=this.n.ushrn(Math.floor(this.n.bitLength()/2)),f=e,c=this.n.clone(),d=new _(1),p=new _(0),v=new _(0),y=new _(1),m=0;0!==f.cmpn(0);){var g=c.div(f);u=c.sub(g.mul(f)),l=v.sub(g.mul(d));var b=y.sub(g.mul(p));if(!n&&u.cmp(h)<0){ t=a.neg(),r=d,n=u.neg(),i=l; }else if(n&&2==++m){ break; }c=f,f=a=u,v=d,d=l,y=p,p=b;}o=u.neg(),s=l;var w=n.sqr().add(i.sqr());return 0<=o.sqr().add(s.sqr()).cmp(w)&&(o=t,s=r),n.negative&&(n=n.neg(),i=i.neg()),o.negative&&(o=o.neg(),s=s.neg()),[{a:n,b:i},{a:o,b:s}]},u.prototype._endoSplit=function(e){var t=this.endo.basis,r=t[0],n=t[1],i=n.b.mul(e).divRound(this.n),o=r.b.neg().mul(e).divRound(this.n),s=i.mul(r.a),a=o.mul(n.a),u=i.mul(r.b),l=o.mul(n.b);return {k1:e.sub(s).sub(a),k2:u.add(l).neg()}},u.prototype.pointFromX=function(e,t){(e=new _(e,16)).red||(e=e.toRed(this.red));var r=e.redSqr().redMul(e).redIAdd(e.redMul(this.a)).redIAdd(this.b),n=r.redSqrt();if(0!==n.redSqr().redSub(r).cmp(this.zero)){ throw new Error("invalid point"); }var i=n.fromRed().isOdd();return (t&&!i||!t&&i)&&(n=n.redNeg()),this.point(e,n)},u.prototype.validate=function(e){if(e.inf){ return !0; }var t=e.x,r=e.y,n=this.a.redMul(t),i=t.redSqr().redMul(t).redIAdd(n).redIAdd(this.b);return 0===r.redSqr().redISub(i).cmpn(0)},u.prototype._endoWnafMulAdd=function(e,t,r){for(var n=this._endoWnafT1,i=this._endoWnafT2,o=0;o<e.length;o++){var s=this._endoSplit(t[o]),a=e[o],u=a._getBeta();s.k1.negative&&(s.k1.ineg(),a=a.neg(!0)),s.k2.negative&&(s.k2.ineg(),u=u.neg(!0)),n[2*o]=a,n[2*o+1]=u,i[2*o]=s.k1,i[2*o+1]=s.k2;}for(var l=this._wnafMulAdd(1,n,i,2*o,r),h=0;h<2*o;h++){ n[h]=null,i[h]=null; }return l},o(l,s.BasePoint),u.prototype.point=function(e,t,r){return new l(this,e,t,r)},u.prototype.pointFromJSON=function(e,t){return l.fromJSON(this,e,t)},l.prototype._getBeta=function(){if(this.curve.endo){var e=this.precomputed;if(e&&e.beta){ return e.beta; }var t=this.curve.point(this.x.redMul(this.curve.endo.beta),this.y);if(e){var r=this.curve,n=function(e){return r.point(e.x.redMul(r.endo.beta),e.y)};(e.beta=t).precomputed={beta:null,naf:e.naf&&{wnd:e.naf.wnd,points:e.naf.points.map(n)},doubles:e.doubles&&{step:e.doubles.step,points:e.doubles.points.map(n)}};}return t}},l.prototype.toJSON=function(){return this.precomputed?[this.x,this.y,this.precomputed&&{doubles:this.precomputed.doubles&&{step:this.precomputed.doubles.step,points:this.precomputed.doubles.points.slice(1)},naf:this.precomputed.naf&&{wnd:this.precomputed.naf.wnd,points:this.precomputed.naf.points.slice(1)}}]:[this.x,this.y]},l.fromJSON=function(t,e,r){"string"==typeof e&&(e=JSON.parse(e));var n=t.point(e[0],e[1],r);if(!e[2]){ return n; }function i(e){return t.point(e[0],e[1],r)}var o=e[2];return n.precomputed={beta:null,doubles:o.doubles&&{step:o.doubles.step,points:[n].concat(o.doubles.points.map(i))},naf:o.naf&&{wnd:o.naf.wnd,points:[n].concat(o.naf.points.map(i))}},n},l.prototype.inspect=function(){return this.isInfinity()?"<EC Point Infinity>":"<EC Point x: "+this.x.fromRed().toString(16,2)+" y: "+this.y.fromRed().toString(16,2)+">"},l.prototype.isInfinity=function(){return this.inf},l.prototype.add=function(e){if(this.inf){ return e; }if(e.inf){ return this; }if(this.eq(e)){ return this.dbl(); }if(this.neg().eq(e)){ return this.curve.point(null,null); }if(0===this.x.cmp(e.x)){ return this.curve.point(null,null); }var t=this.y.redSub(e.y);0!==t.cmpn(0)&&(t=t.redMul(this.x.redSub(e.x).redInvm()));var r=t.redSqr().redISub(this.x).redISub(e.x),n=t.redMul(this.x.redSub(r)).redISub(this.y);return this.curve.point(r,n)},l.prototype.dbl=function(){if(this.inf){ return this; }var e=this.y.redAdd(this.y);if(0===e.cmpn(0)){ return this.curve.point(null,null); }var t=this.curve.a,r=this.x.redSqr(),n=e.redInvm(),i=r.redAdd(r).redIAdd(r).redIAdd(t).redMul(n),o=i.redSqr().redISub(this.x.redAdd(this.x)),s=i.redMul(this.x.redSub(o)).redISub(this.y);return this.curve.point(o,s)},l.prototype.getX=function(){return this.x.fromRed()},l.prototype.getY=function(){return this.y.fromRed()},l.prototype.mul=function(e){return e=new _(e,16),this._hasDoubles(e)?this.curve._fixedNafMul(this,e):this.curve.endo?this.curve._endoWnafMulAdd([this],[e]):this.curve._wnafMul(this,e)},l.prototype.mulAdd=function(e,t,r){var n=[this,t],i=[e,r];return this.curve.endo?this.curve._endoWnafMulAdd(n,i):this.curve._wnafMulAdd(1,n,i,2)},l.prototype.jmulAdd=function(e,t,r){var n=[this,t],i=[e,r];return this.curve.endo?this.curve._endoWnafMulAdd(n,i,!0):this.curve._wnafMulAdd(1,n,i,2,!0)},l.prototype.eq=function(e){return this===e||this.inf===e.inf&&(this.inf||0===this.x.cmp(e.x)&&0===this.y.cmp(e.y))},l.prototype.neg=function(e){if(this.inf){ return this; }var t=this.curve.point(this.x,this.y.redNeg());if(e&&this.precomputed){var r=this.precomputed,n=function(e){return e.neg()};t.precomputed={naf:r.naf&&{wnd:r.naf.wnd,points:r.naf.points.map(n)},doubles:r.doubles&&{step:r.doubles.step,points:r.doubles.points.map(n)}};}return t},l.prototype.toJ=function(){return this.inf?this.curve.jpoint(null,null,null):this.curve.jpoint(this.x,this.y,this.curve.one)},o(h,s.BasePoint),u.prototype.jpoint=function(e,t,r){return new h(this,e,t,r)},h.prototype.toP=function(){if(this.isInfinity()){ return this.curve.point(null,null); }var e=this.z.redInvm(),t=e.redSqr(),r=this.x.redMul(t),n=this.y.redMul(t).redMul(e);return this.curve.point(r,n)},h.prototype.neg=function(){return this.curve.jpoint(this.x,this.y.redNeg(),this.z)},h.prototype.add=function(e){if(this.isInfinity()){ return e; }if(e.isInfinity()){ return this; }var t=e.z.redSqr(),r=this.z.redSqr(),n=this.x.redMul(t),i=e.x.redMul(r),o=this.y.redMul(t.redMul(e.z)),s=e.y.redMul(r.redMul(this.z)),a=n.redSub(i),u=o.redSub(s);if(0===a.cmpn(0)){ return 0!==u.cmpn(0)?this.curve.jpoint(null,null,null):this.dbl(); }var l=a.redSqr(),h=l.redMul(a),f=n.redMul(l),c=u.redSqr().redIAdd(h).redISub(f).redISub(f),d=u.redMul(f.redISub(c)).redISub(o.redMul(h)),p=this.z.redMul(e.z).redMul(a);return this.curve.jpoint(c,d,p)},h.prototype.mixedAdd=function(e){if(this.isInfinity()){ return e.toJ(); }if(e.isInfinity()){ return this; }var t=this.z.redSqr(),r=this.x,n=e.x.redMul(t),i=this.y,o=e.y.redMul(t).redMul(this.z),s=r.redSub(n),a=i.redSub(o);if(0===s.cmpn(0)){ return 0!==a.cmpn(0)?this.curve.jpoint(null,null,null):this.dbl(); }var u=s.redSqr(),l=u.redMul(s),h=r.redMul(u),f=a.redSqr().redIAdd(l).redISub(h).redISub(h),c=a.redMul(h.redISub(f)).redISub(i.redMul(l)),d=this.z.redMul(s);return this.curve.jpoint(f,c,d)},h.prototype.dblp=function(e){if(0===e){ return this; }if(this.isInfinity()){ return this; }if(!e){ return this.dbl(); }if(this.curve.zeroA||this.curve.threeA){for(var t=this,r=0;r<e;r++){ t=t.dbl(); }return t}var n=this.curve.a,i=this.curve.tinv,o=this.x,s=this.y,a=this.z,u=a.redSqr().redSqr(),l=s.redAdd(s);for(r=0;r<e;r++){var h=o.redSqr(),f=l.redSqr(),c=f.redSqr(),d=h.redAdd(h).redIAdd(h).redIAdd(n.redMul(u)),p=o.redMul(f),v=d.redSqr().redISub(p.redAdd(p)),y=p.redISub(v),m=d.redMul(y);m=m.redIAdd(m).redISub(c);var g=l.redMul(a);r+1<e&&(u=u.redMul(c)),o=v,a=g,l=m;}return this.curve.jpoint(o,l.redMul(i),a)},h.prototype.dbl=function(){return this.isInfinity()?this:this.curve.zeroA?this._zeroDbl():this.curve.threeA?this._threeDbl():this._dbl()},h.prototype._zeroDbl=function(){var e,t,r;if(this.zOne){var n=this.x.redSqr(),i=this.y.redSqr(),o=i.redSqr(),s=this.x.redAdd(i).redSqr().redISub(n).redISub(o);s=s.redIAdd(s);var a=n.redAdd(n).redIAdd(n),u=a.redSqr().redISub(s).redISub(s),l=o.redIAdd(o);l=(l=l.redIAdd(l)).redIAdd(l),e=u,t=a.redMul(s.redISub(u)).redISub(l),r=this.y.redAdd(this.y);}else{var h=this.x.redSqr(),f=this.y.redSqr(),c=f.redSqr(),d=this.x.redAdd(f).redSqr().redISub(h).redISub(c);d=d.redIAdd(d);var p=h.redAdd(h).redIAdd(h),v=p.redSqr(),y=c.redIAdd(c);y=(y=y.redIAdd(y)).redIAdd(y),e=v.redISub(d).redISub(d),t=p.redMul(d.redISub(e)).redISub(y),r=(r=this.y.redMul(this.z)).redIAdd(r);}return this.curve.jpoint(e,t,r)},h.prototype._threeDbl=function(){var e,t,r;if(this.zOne){var n=this.x.redSqr(),i=this.y.redSqr(),o=i.redSqr(),s=this.x.redAdd(i).redSqr().redISub(n).redISub(o);s=s.redIAdd(s);var a=n.redAdd(n).redIAdd(n).redIAdd(this.curve.a),u=a.redSqr().redISub(s).redISub(s);e=u;var l=o.redIAdd(o);l=(l=l.redIAdd(l)).redIAdd(l),t=a.redMul(s.redISub(u)).redISub(l),r=this.y.redAdd(this.y);}else{var h=this.z.redSqr(),f=this.y.redSqr(),c=this.x.redMul(f),d=this.x.redSub(h).redMul(this.x.redAdd(h));d=d.redAdd(d).redIAdd(d);var p=c.redIAdd(c),v=(p=p.redIAdd(p)).redAdd(p);e=d.redSqr().redISub(v),r=this.y.redAdd(this.z).redSqr().redISub(f).redISub(h);var y=f.redSqr();y=(y=(y=y.redIAdd(y)).redIAdd(y)).redIAdd(y),t=d.redMul(p.redISub(e)).redISub(y);}return this.curve.jpoint(e,t,r)},h.prototype._dbl=function(){var e=this.curve.a,t=this.x,r=this.y,n=this.z,i=n.redSqr().redSqr(),o=t.redSqr(),s=r.redSqr(),a=o.redAdd(o).redIAdd(o).redIAdd(e.redMul(i)),u=t.redAdd(t),l=(u=u.redIAdd(u)).redMul(s),h=a.redSqr().redISub(l.redAdd(l)),f=l.redISub(h),c=s.redSqr();c=(c=(c=c.redIAdd(c)).redIAdd(c)).redIAdd(c);var d=a.redMul(f).redISub(c),p=r.redAdd(r).redMul(n);return this.curve.jpoint(h,d,p)},h.prototype.trpl=function(){if(!this.curve.zeroA){ return this.dbl().add(this); }var e=this.x.redSqr(),t=this.y.redSqr(),r=this.z.redSqr(),n=t.redSqr(),i=e.redAdd(e).redIAdd(e),o=i.redSqr(),s=this.x.redAdd(t).redSqr().redISub(e).redISub(n),a=(s=(s=(s=s.redIAdd(s)).redAdd(s).redIAdd(s)).redISub(o)).redSqr(),u=n.redIAdd(n);u=(u=(u=u.redIAdd(u)).redIAdd(u)).redIAdd(u);var l=i.redIAdd(s).redSqr().redISub(o).redISub(a).redISub(u),h=t.redMul(l);h=(h=h.redIAdd(h)).redIAdd(h);var f=this.x.redMul(a).redISub(h);f=(f=f.redIAdd(f)).redIAdd(f);var c=this.y.redMul(l.redMul(u.redISub(l)).redISub(s.redMul(a)));c=(c=(c=c.redIAdd(c)).redIAdd(c)).redIAdd(c);var d=this.z.redAdd(s).redSqr().redISub(r).redISub(a);return this.curve.jpoint(f,c,d)},h.prototype.mul=function(e,t){return e=new _(e,t),this.curve._wnafMul(this,e)},h.prototype.eq=function(e){if("affine"===e.type){ return this.eq(e.toJ()); }if(this===e){ return !0; }var t=this.z.redSqr(),r=e.z.redSqr();if(0!==this.x.redMul(r).redISub(e.x.redMul(t)).cmpn(0)){ return !1; }var n=t.redMul(this.z),i=r.redMul(e.z);return 0===this.y.redMul(i).redISub(e.y.redMul(n)).cmpn(0)},h.prototype.eqXToP=function(e){var t=this.z.redSqr(),r=e.toRed(this.curve.red).redMul(t);if(0===this.x.cmp(r)){ return !0; }for(var n=e.clone(),i=this.curve.redN.redMul(t);;){if(n.iadd(this.curve.n),0<=n.cmp(this.curve.p)){ return !1; }if(r.redIAdd(i),0===this.x.cmp(r)){ return !0 }}return !1},h.prototype.inspect=function(){return this.isInfinity()?"<EC JPoint Infinity>":"<EC JPoint x: "+this.x.toString(16,2)+" y: "+this.y.toString(16,2)+" z: "+this.z.toString(16,2)+">"},h.prototype.isInfinity=function(){return 0===this.z.cmpn(0)};},{"../../elliptic":12,"../curve":15,"bn.js":9,inherits:39}],18:[function(e,t,r){var n,i=r,o=e("hash.js"),s=e("../elliptic"),a=s.utils.assert;function u(e){"short"===e.type?this.curve=new s.curve.short(e):"edwards"===e.type?this.curve=new s.curve.edwards(e):this.curve=new s.curve.mont(e),this.g=this.curve.g,this.n=this.curve.n,this.hash=e.hash,a(this.g.validate(),"Invalid curve"),a(this.g.mul(this.n).isInfinity(),"Invalid curve, G*N != O");}function l(t,r){Object.defineProperty(i,t,{configurable:!0,enumerable:!0,get:function(){var e=new u(r);return Object.defineProperty(i,t,{configurable:!0,enumerable:!0,value:e}),e}});}i.PresetCurve=u,l("p192",{type:"short",prime:"p192",p:"ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",a:"ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",b:"64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",n:"ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",hash:o.sha256,gRed:!1,g:["188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012","07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"]}),l("p224",{type:"short",prime:"p224",p:"ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",a:"ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",b:"b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",n:"ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",hash:o.sha256,gRed:!1,g:["b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21","bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"]}),l("p256",{type:"short",prime:null,p:"ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",a:"ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",b:"5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",n:"ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",hash:o.sha256,gRed:!1,g:["6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296","4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"]}),l("p384",{type:"short",prime:null,p:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",a:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",b:"b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",n:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",hash:o.sha384,gRed:!1,g:["aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7","3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"]}),l("p521",{type:"short",prime:null,p:"000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",a:"000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",b:"00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",n:"000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",hash:o.sha512,gRed:!1,g:["000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66","00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"]}),l("curve25519",{type:"mont",prime:"p25519",p:"7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",a:"76d06",b:"1",n:"1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",hash:o.sha256,gRed:!1,g:["9"]}),l("ed25519",{type:"edwards",prime:"p25519",p:"7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",a:"-1",c:"1",d:"52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",n:"1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",hash:o.sha256,gRed:!1,g:["216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a","6666666666666666666666666666666666666666666666666666666666666658"]});try{n=e("./precomputed/secp256k1");}catch(e){n=void 0;}l("secp256k1",{type:"short",prime:"k256",p:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",a:"0",b:"7",n:"ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",h:"1",hash:o.sha256,beta:"7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",lambda:"5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",basis:[{a:"3086d221a7d46bcde86c90e49284eb15",b:"-e4437ed6010e88286f547fa90abfe4c3"},{a:"114ca50f7a8e2f3f657c1108d9d44cfd8",b:"3086d221a7d46bcde86c90e49284eb15"}],gRed:!1,g:["79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798","483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",n]});},{"../elliptic":12,"./precomputed/secp256k1":24,"hash.js":27}],19:[function(e,t,r){var y=e("bn.js"),m=e("../../elliptic"),d=m.utils.assert,n=e("./key"),g=e("./signature");function i(e){if(!(this instanceof i)){ return new i(e); }"string"==typeof e&&(d(m.curves.hasOwnProperty(e),"Unknown curve "+e),e=m.curves[e]),e instanceof m.curves.PresetCurve&&(e={curve:e}),this.curve=e.curve.curve,this.n=this.curve.n,this.nh=this.n.ushrn(1),this.g=this.curve.g,this.g=e.curve.g,this.g.precompute(e.curve.n.bitLength()+1),this.hash=e.hash||e.curve.hash;}(t.exports=i).prototype.keyPair=function(e){return new n(this,e)},i.prototype.keyFromPrivate=function(e,t){return n.fromPrivate(this,e,t)},i.prototype.keyFromPublic=function(e,t){return n.fromPublic(this,e,t)},i.prototype.genKeyPair=function(e){e=e||{};for(var t=new m.hmacDRBG({hash:this.hash,pers:e.pers,entropy:e.entropy||m.rand(this.hash.hmacStrength),nonce:this.n.toArray()}),r=this.n.byteLength(),n=this.n.sub(new y(2));;){var i=new y(t.generate(r));if(!(0<i.cmp(n))){ return i.iaddn(1),this.keyFromPrivate(i) }}},i.prototype._truncateToN=function(e,t){var r=8*e.byteLength()-this.n.bitLength();return 0<r&&(e=e.ushrn(r)),!t&&0<=e.cmp(this.n)?e.sub(this.n):e},i.prototype.sign=function(e,t,r,n){"object"==typeof r&&(n=r,r=null),n=n||{},t=this.keyFromPrivate(t,r),e=this._truncateToN(new y(e,16));for(var i=this.n.byteLength(),o=t.getPrivate().toArray("be",i),s=e.toArray("be",i),a=new m.hmacDRBG({hash:this.hash,entropy:o,nonce:s,pers:n.pers,persEnc:n.persEnc}),u=this.n.sub(new y(1)),l=0;;l++){var h=n.k?n.k(l):new y(a.generate(this.n.byteLength()));if(!((h=this._truncateToN(h,!0)).cmpn(1)<=0||0<=h.cmp(u))){var f=this.g.mul(h);if(!f.isInfinity()){var c=f.getX(),d=c.umod(this.n);if(0!==d.cmpn(0)){var p=h.invm(this.n).mul(d.mul(t.getPrivate()).iadd(e));if(0!==(p=p.umod(this.n)).cmpn(0)){var v=(f.getY().isOdd()?1:0)|(0!==c.cmp(d)?2:0);return n.canonical&&0<p.cmp(this.nh)&&(p=this.n.sub(p),v^=1),new g({r:d,s:p,recoveryParam:v})}}}}}},i.prototype.verify=function(e,t,r,n){e=this._truncateToN(new y(e,16)),r=this.keyFromPublic(r,n);var i=(t=new g(t,"hex")).r,o=t.s;if(i.cmpn(1)<0||0<=i.cmp(this.n)){ return !1; }if(o.cmpn(1)<0||0<=o.cmp(this.n)){ return !1; }var s,a=o.invm(this.n),u=a.mul(e).umod(this.n),l=a.mul(i).umod(this.n);return this.curve._maxwellTrick?!(s=this.g.jmulAdd(u,r.getPublic(),l)).isInfinity()&&s.eqXToP(i):!(s=this.g.mulAdd(u,r.getPublic(),l)).isInfinity()&&0===s.getX().umod(this.n).cmp(i)},i.prototype.recoverPubKey=function(e,t,r,n){d((3&r)===r,"The recovery param is more than two bits"),t=new g(t,n);var i=this.n,o=new y(e),s=t.r,a=t.s,u=1&r,l=r>>1;if(0<=s.cmp(this.curve.p.umod(this.curve.n))&&l){ throw new Error("Unable to find sencond key candinate"); }s=l?this.curve.pointFromX(s.add(this.curve.n),u):this.curve.pointFromX(s,u);var h=t.r.invm(i),f=i.sub(o).mul(h).umod(i),c=a.mul(h).umod(i);return this.g.mulAdd(f,s,c)},i.prototype.getKeyRecoveryParam=function(e,t,r,n){if(null!==(t=new g(t,n)).recoveryParam){ return t.recoveryParam; }for(var i=0;i<4;i++){var o;try{o=this.recoverPubKey(e,t,i);}catch(e){continue}if(o.eq(r)){ return i }}throw new Error("Unable to find valid recovery factor")};},{"../../elliptic":12,"./key":20,"./signature":21,"bn.js":9}],20:[function(e,t,r){var n=e("bn.js"),i=e("../../elliptic").utils.assert;function o(e,t){this.ec=e,this.priv=null,this.pub=null,t.priv&&this._importPrivate(t.priv,t.privEnc),t.pub&&this._importPublic(t.pub,t.pubEnc);}(t.exports=o).fromPublic=function(e,t,r){return t instanceof o?t:new o(e,{pub:t,pubEnc:r})},o.fromPrivate=function(e,t,r){return t instanceof o?t:new o(e,{priv:t,privEnc:r})},o.prototype.validate=function(){var e=this.getPublic();return e.isInfinity()?{result:!1,reason:"Invalid public key"}:e.validate()?e.mul(this.ec.curve.n).isInfinity()?{result:!0,reason:null}:{result:!1,reason:"Public key * N != O"}:{result:!1,reason:"Public key is not a point"}},o.prototype.getPublic=function(e,t){return "string"==typeof e&&(t=e,e=null),this.pub||(this.pub=this.ec.g.mul(this.priv)),t?this.pub.encode(t,e):this.pub},o.prototype.getPrivate=function(e){return "hex"===e?this.priv.toString(16,2):this.priv},o.prototype._importPrivate=function(e,t){this.priv=new n(e,t||16),this.priv=this.priv.umod(this.ec.curve.n);},o.prototype._importPublic=function(e,t){if(e.x||e.y){ return "mont"===this.ec.curve.type?i(e.x,"Need x coordinate"):"short"!==this.ec.curve.type&&"edwards"!==this.ec.curve.type||i(e.x&&e.y,"Need both x and y coordinate"),void(this.pub=this.ec.curve.point(e.x,e.y)); }this.pub=this.ec.curve.decodePoint(e,t);},o.prototype.derive=function(e){return e.mul(this.priv).getX()},o.prototype.sign=function(e,t,r){return this.ec.sign(e,this,t,r)},o.prototype.verify=function(e,t){return this.ec.verify(e,t,this)},o.prototype.inspect=function(){return "<Key priv: "+(this.priv&&this.priv.toString(16,2))+" pub: "+(this.pub&&this.pub.inspect())+" >"};},{"../../elliptic":12,"bn.js":9}],21:[function(e,t,r){var a=e("bn.js"),u=e("../../elliptic").utils,n=u.assert;function i(e,t){if(e instanceof i){ return e; }this._importDER(e,t)||(n(e.r&&e.s,"Signature without r or s"),this.r=new a(e.r,16),this.s=new a(e.s,16),void 0===e.recoveryParam?this.recoveryParam=null:this.recoveryParam=e.recoveryParam);}function l(){this.place=0;}function h(e,t){var r=e[t.place++];if(!(128&r)){ return r; }for(var n=15&r,i=0,o=0,s=t.place;o<n;o++,s++){ i<<=8,i|=e[s]; }return t.place=s,i}function s(e){for(var t=0,r=e.length-1;!e[t]&&!(128&e[t+1])&&t<r;){ t++; }return 0===t?e:e.slice(t)}function f(e,t){if(t<128){ e.push(t); }else{var r=1+(Math.log(t)/Math.LN2>>>3);for(e.push(128|r);--r;){ e.push(t>>>(r<<3)&255); }e.push(t);}}(t.exports=i).prototype._importDER=function(e,t){e=u.toArray(e,t);var r=new l;if(48!==e[r.place++]){ return !1; }if(h(e,r)+r.place!==e.length){ return !1; }if(2!==e[r.place++]){ return !1; }var n=h(e,r),i=e.slice(r.place,n+r.place);if(r.place+=n,2!==e[r.place++]){ return !1; }var o=h(e,r);if(e.length!==o+r.place){ return !1; }var s=e.slice(r.place,o+r.place);return 0===i[0]&&128&i[1]&&(i=i.slice(1)),0===s[0]&&128&s[1]&&(s=s.slice(1)),this.r=new a(i),this.s=new a(s),!(this.recoveryParam=null)},i.prototype.toDER=function(e){var t=this.r.toArray(),r=this.s.toArray();for(128&t[0]&&(t=[0].concat(t)),128&r[0]&&(r=[0].concat(r)),t=s(t),r=s(r);!(r[0]||128&r[1]);){ r=r.slice(1); }var n=[2];f(n,t.length),(n=n.concat(t)).push(2),f(n,r.length);var i=n.concat(r),o=[48];return f(o,i.length),o=o.concat(i),u.encode(o,e)};},{"../../elliptic":12,"bn.js":9}],22:[function(e,t,r){arguments[4][14][0].apply(r,arguments);},{dup:14}],23:[function(e,t,r){var n=e("hash.js"),s=e("../elliptic").utils,i=s.assert;function o(e){if(!(this instanceof o)){ return new o(e); }this.hash=e.hash,this.predResist=!!e.predResist,this.outLen=this.hash.outSize,this.minEntropy=e.minEntropy||this.hash.hmacStrength,this.reseed=null,this.reseedInterval=null,this.K=null,this.V=null;var t=s.toArray(e.entropy,e.entropyEnc),r=s.toArray(e.nonce,e.nonceEnc),n=s.toArray(e.pers,e.persEnc);i(t.length>=this.minEntropy/8,"Not enough entropy. Minimum is: "+this.minEntropy+" bits"),this._init(t,r,n);}(t.exports=o).prototype._init=function(e,t,r){var n=e.concat(t).concat(r);this.K=new Array(this.outLen/8),this.V=new Array(this.outLen/8);for(var i=0;i<this.V.length;i++){ this.K[i]=0,this.V[i]=1; }this._update(n),this.reseed=1,this.reseedInterval=281474976710656;},o.prototype._hmac=function(){return new n.hmac(this.hash,this.K)},o.prototype._update=function(e){var t=this._hmac().update(this.V).update([0]);e&&(t=t.update(e)),this.K=t.digest(),this.V=this._hmac().update(this.V).digest(),e&&(this.K=this._hmac().update(this.V).update([1]).update(e).digest(),this.V=this._hmac().update(this.V).digest());},o.prototype.reseed=function(e,t,r,n){"string"!=typeof t&&(n=r,r=t,t=null),e=s.toBuffer(e,t),r=s.toBuffer(r,n),i(e.length>=this.minEntropy/8,"Not enough entropy. Minimum is: "+this.minEntropy+" bits"),this._update(e.concat(r||[])),this.reseed=1;},o.prototype.generate=function(e,t,r,n){if(this.reseed>this.reseedInterval){ throw new Error("Reseed is required"); }"string"!=typeof t&&(n=r,r=t,t=null),r&&(r=s.toArray(r,n),this._update(r));for(var i=[];i.length<e;){ this.V=this._hmac().update(this.V).digest(),i=i.concat(this.V); }var o=i.slice(0,e);return this._update(r),this.reseed++,s.encode(o,t)};},{"../elliptic":12,"hash.js":27}],24:[function(e,t,r){t.exports=void 0;},{}],25:[function(e,t,r){var n=r,i=e("bn.js");function o(e){return 1===e.length?"0"+e:e}function s(e){for(var t="",r=0;r<e.length;r++){ t+=o(e[r].toString(16)); }return t}n.assert=function(e,t){if(!e){ throw new Error(t||"Assertion failed") }},n.toArray=function(e,t){if(Array.isArray(e)){ return e.slice(); }if(!e){ return []; }var r=[];if("string"!=typeof e){for(var n=0;n<e.length;n++){ r[n]=0|e[n]; }return r}if(t){if("hex"===t){(e=e.replace(/[^a-z0-9]+/gi,"")).length%2!=0&&(e="0"+e);for(n=0;n<e.length;n+=2){ r.push(parseInt(e[n]+e[n+1],16)); }}}else { for(var n=0;n<e.length;n++){var i=e.charCodeAt(n),o=i>>8,s=255&i;o?r.push(o,s):r.push(s);} }return r},n.zero2=o,n.toHex=s,n.encode=function(e,t){return "hex"===t?s(e):e},n.getNAF=function(e,t){for(var r=[],n=1<<t+1,i=e.clone();0<=i.cmpn(1);){var o;if(i.isOdd()){var s=i.andln(n-1);o=(n>>1)-1<s?(n>>1)-s:s,i.isubn(o);}else { o=0; }r.push(o);for(var a=0!==i.cmpn(0)&&0===i.andln(n-1)?t+1:1,u=1;u<a;u++){ r.push(0); }i.iushrn(a);}return r},n.getJSF=function(e,t){var r=[[],[]];e=e.clone(),t=t.clone();for(var n=0,i=0;0<e.cmpn(-n)||0<t.cmpn(-i);){var o,s,a,u=e.andln(3)+n&3,l=t.andln(3)+i&3;if(3===u&&(u=-1),3===l&&(l=-1),0==(1&u)){ o=0; }else { o=3!==(a=e.andln(7)+n&7)&&5!==a||2!==l?u:-u; }if(r[0].push(o),0==(1&l)){ s=0; }else { s=3!==(a=t.andln(7)+i&7)&&5!==a||2!==u?l:-l; }r[1].push(s),2*n===o+1&&(n=1-n),2*i===s+1&&(i=1-i),e.iushrn(1),t.iushrn(1);}return r},n.cachedProperty=function(e,t,r){var n="_"+t;e.prototype[t]=function(){return void 0!==this[n]?this[n]:this[n]=r.call(this)};},n.parseBytes=function(e){return "string"==typeof e?n.toArray(e,"hex"):e},n.intFromLE=function(e){return new i(e,"hex","le")};},{"bn.js":9}],26:[function(e,t,r){t.exports={version:"6.3.3"};},{}],27:[function(e,t,r){var n=r;n.utils=e("./hash/utils"),n.common=e("./hash/common"),n.sha=e("./hash/sha"),n.ripemd=e("./hash/ripemd"),n.hmac=e("./hash/hmac"),n.sha1=n.sha.sha1,n.sha256=n.sha.sha256,n.sha224=n.sha.sha224,n.sha384=n.sha.sha384,n.sha512=n.sha.sha512,n.ripemd160=n.ripemd.ripemd160;},{"./hash/common":28,"./hash/hmac":29,"./hash/ripemd":30,"./hash/sha":31,"./hash/utils":38}],28:[function(e,t,r){var i=e("./utils"),n=e("minimalistic-assert");function o(){this.pending=null,this.pendingTotal=0,this.blockSize=this.constructor.blockSize,this.outSize=this.constructor.outSize,this.hmacStrength=this.constructor.hmacStrength,this.padLength=this.constructor.padLength/8,this.endian="big",this._delta8=this.blockSize/8,this._delta32=this.blockSize/32;}(r.BlockHash=o).prototype.update=function(e,t){if(e=i.toArray(e,t),this.pending?this.pending=this.pending.concat(e):this.pending=e,this.pendingTotal+=e.length,this.pending.length>=this._delta8){var r=(e=this.pending).length%this._delta8;this.pending=e.slice(e.length-r,e.length),0===this.pending.length&&(this.pending=null),e=i.join32(e,0,e.length-r,this.endian);for(var n=0;n<e.length;n+=this._delta32){ this._update(e,n,n+this._delta32); }}return this},o.prototype.digest=function(e){return this.update(this._pad()),n(null===this.pending),this._digest(e)},o.prototype._pad=function(){var e=this.pendingTotal,t=this._delta8,r=t-(e+this.padLength)%t,n=new Array(r+this.padLength);n[0]=128;for(var i=1;i<r;i++){ n[i]=0; }if(e<<=3,"big"===this.endian){for(var o=8;o<this.padLength;o++){ n[i++]=0; }n[i++]=0,n[i++]=0,n[i++]=0,n[i++]=0,n[i++]=e>>>24&255,n[i++]=e>>>16&255,n[i++]=e>>>8&255,n[i++]=255&e;}else { for(n[i++]=255&e,n[i++]=e>>>8&255,n[i++]=e>>>16&255,n[i++]=e>>>24&255,n[i++]=0,n[i++]=0,n[i++]=0,n[i++]=0,o=8;o<this.padLength;o++){ n[i++]=0; } }return n};},{"./utils":38,"minimalistic-assert":41}],29:[function(e,t,r){var n=e("./utils"),i=e("minimalistic-assert");function o(e,t,r){if(!(this instanceof o)){ return new o(e,t,r); }this.Hash=e,this.blockSize=e.blockSize/8,this.outSize=e.outSize/8,this.inner=null,this.outer=null,this._init(n.toArray(t,r));}(t.exports=o).prototype._init=function(e){e.length>this.blockSize&&(e=(new this.Hash).update(e).digest()),i(e.length<=this.blockSize);for(var t=e.length;t<this.blockSize;t++){ e.push(0); }for(t=0;t<e.length;t++){ e[t]^=54; }for(this.inner=(new this.Hash).update(e),t=0;t<e.length;t++){ e[t]^=106; }this.outer=(new this.Hash).update(e);},o.prototype.update=function(e,t){return this.inner.update(e,t),this},o.prototype.digest=function(e){return this.outer.update(this.inner.digest()),this.outer.digest(e)};},{"./utils":38,"minimalistic-assert":41}],30:[function(e,t,r){var n=e("./utils"),i=e("./common"),p=n.rotl32,v=n.sum32,y=n.sum32_3,m=n.sum32_4,o=i.BlockHash;function s(){if(!(this instanceof s)){ return new s; }o.call(this),this.h=[1732584193,4023233417,2562383102,271733878,3285377520],this.endian="little";}function g(e,t,r,n){return e<=15?t^r^n:e<=31?t&r|~t&n:e<=47?(t|~r)^n:e<=63?t&n|r&~n:t^(r|~n)}function b(e){return e<=15?0:e<=31?1518500249:e<=47?1859775393:e<=63?2400959708:2840853838}function w(e){return e<=15?1352829926:e<=31?1548603684:e<=47?1836072691:e<=63?2053994217:0}n.inherits(s,o),(r.ripemd160=s).blockSize=512,s.outSize=160,s.hmacStrength=192,s.padLength=64,s.prototype._update=function(e,t){for(var r=this.h[0],n=this.h[1],i=this.h[2],o=this.h[3],s=this.h[4],a=r,u=n,l=i,h=o,f=s,c=0;c<80;c++){var d=v(p(m(r,g(c,n,i,o),e[_[c]+t],b(c)),A[c]),s);r=s,s=o,o=p(i,10),i=n,n=d,d=v(p(m(a,g(79-c,u,l,h),e[M[c]+t],w(c)),E[c]),f),a=f,f=h,h=p(l,10),l=u,u=d;}d=y(this.h[1],i,h),this.h[1]=y(this.h[2],o,f),this.h[2]=y(this.h[3],s,a),this.h[3]=y(this.h[4],r,u),this.h[4]=y(this.h[0],n,l),this.h[0]=d;},s.prototype._digest=function(e){return "hex"===e?n.toHex32(this.h,"little"):n.split32(this.h,"little")};var _=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13],M=[5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11],A=[11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6],E=[8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11];},{"./common":28,"./utils":38}],31:[function(e,t,r){r.sha1=e("./sha/1"),r.sha224=e("./sha/224"),r.sha256=e("./sha/256"),r.sha384=e("./sha/384"),r.sha512=e("./sha/512");},{"./sha/1":32,"./sha/224":33,"./sha/256":34,"./sha/384":35,"./sha/512":36}],32:[function(e,t,r){arguments[4][14][0].apply(r,arguments);},{dup:14}],33:[function(e,t,r){arguments[4][14][0].apply(r,arguments);},{dup:14}],34:[function(e,t,r){var n=e("../utils"),i=e("../common"),o=e("./common"),p=e("minimalistic-assert"),v=n.sum32,y=n.sum32_4,m=n.sum32_5,g=o.ch32,b=o.maj32,w=o.s0_256,_=o.s1_256,M=o.g0_256,A=o.g1_256,s=i.BlockHash,a=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];function u(){if(!(this instanceof u)){ return new u; }s.call(this),this.h=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],this.k=a,this.W=new Array(64);}n.inherits(u,s),(t.exports=u).blockSize=512,u.outSize=256,u.hmacStrength=192,u.padLength=64,u.prototype._update=function(e,t){for(var r=this.W,n=0;n<16;n++){ r[n]=e[t+n]; }for(;n<r.length;n++){ r[n]=y(A(r[n-2]),r[n-7],M(r[n-15]),r[n-16]); }var i=this.h[0],o=this.h[1],s=this.h[2],a=this.h[3],u=this.h[4],l=this.h[5],h=this.h[6],f=this.h[7];for(p(this.k.length===r.length),n=0;n<r.length;n++){var c=m(f,_(u),g(u,l,h),this.k[n],r[n]),d=v(w(i),b(i,o,s));f=h,h=l,l=u,u=v(a,c),a=s,s=o,o=i,i=v(c,d);}this.h[0]=v(this.h[0],i),this.h[1]=v(this.h[1],o),this.h[2]=v(this.h[2],s),this.h[3]=v(this.h[3],a),this.h[4]=v(this.h[4],u),this.h[5]=v(this.h[5],l),this.h[6]=v(this.h[6],h),this.h[7]=v(this.h[7],f);},u.prototype._digest=function(e){return "hex"===e?n.toHex32(this.h,"big"):n.split32(this.h,"big")};},{"../common":28,"../utils":38,"./common":37,"minimalistic-assert":41}],35:[function(e,t,r){arguments[4][14][0].apply(r,arguments);},{dup:14}],36:[function(e,t,r){var n=e("../utils"),i=e("../common"),C=e("minimalistic-assert"),o=n.rotr64_hi,s=n.rotr64_lo,a=n.shr64_hi,u=n.shr64_lo,B=n.sum64,D=n.sum64_hi,L=n.sum64_lo,c=n.sum64_4_hi,d=n.sum64_4_lo,U=n.sum64_5_hi,F=n.sum64_5_lo,l=i.BlockHash,h=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591];function f(){if(!(this instanceof f)){ return new f; }l.call(this),this.h=[1779033703,4089235720,3144134277,2227873595,1013904242,4271175723,2773480762,1595750129,1359893119,2917565137,2600822924,725511199,528734635,4215389547,1541459225,327033209],this.k=h,this.W=new Array(160);}function j(e,t,r,n,i){var o=e&r^~e&i;return o<0&&(o+=4294967296),o}function G(e,t,r,n,i,o){var s=t&n^~t&o;return s<0&&(s+=4294967296),s}function H(e,t,r,n,i){var o=e&r^e&i^r&i;return o<0&&(o+=4294967296),o}function z(e,t,r,n,i,o){var s=t&n^t&o^n&o;return s<0&&(s+=4294967296),s}function V(e,t){var r=o(e,t,28)^o(t,e,2)^o(t,e,7);return r<0&&(r+=4294967296),r}function K(e,t){var r=s(e,t,28)^s(t,e,2)^s(t,e,7);return r<0&&(r+=4294967296),r}function q(e,t){var r=o(e,t,14)^o(e,t,18)^o(t,e,9);return r<0&&(r+=4294967296),r}function W(e,t){var r=s(e,t,14)^s(e,t,18)^s(t,e,9);return r<0&&(r+=4294967296),r}function p(e,t){var r=o(e,t,1)^o(e,t,8)^a(e,t,7);return r<0&&(r+=4294967296),r}function v(e,t){var r=s(e,t,1)^s(e,t,8)^u(e,t,7);return r<0&&(r+=4294967296),r}function y(e,t){var r=o(e,t,19)^o(t,e,29)^a(e,t,6);return r<0&&(r+=4294967296),r}function m(e,t){var r=s(e,t,19)^s(t,e,29)^u(e,t,6);return r<0&&(r+=4294967296),r}n.inherits(f,l),(t.exports=f).blockSize=1024,f.outSize=512,f.hmacStrength=192,f.padLength=128,f.prototype._prepareBlock=function(e,t){for(var r=this.W,n=0;n<32;n++){ r[n]=e[t+n]; }for(;n<r.length;n+=2){var i=y(r[n-4],r[n-3]),o=m(r[n-4],r[n-3]),s=r[n-14],a=r[n-13],u=p(r[n-30],r[n-29]),l=v(r[n-30],r[n-29]),h=r[n-32],f=r[n-31];r[n]=c(i,o,s,a,u,l,h,f),r[n+1]=d(i,o,s,a,u,l,h,f);}},f.prototype._update=function(e,t){this._prepareBlock(e,t);var r=this.W,n=this.h[0],i=this.h[1],o=this.h[2],s=this.h[3],a=this.h[4],u=this.h[5],l=this.h[6],h=this.h[7],f=this.h[8],c=this.h[9],d=this.h[10],p=this.h[11],v=this.h[12],y=this.h[13],m=this.h[14],g=this.h[15];C(this.k.length===r.length);for(var b=0;b<r.length;b+=2){var w=m,_=g,M=q(f,c),A=W(f,c),E=j(f,c,d,p,v),S=G(f,c,d,p,v,y),k=this.k[b],N=this.k[b+1],P=r[b],x=r[b+1],I=U(w,_,M,A,E,S,k,N,P,x),T=F(w,_,M,A,E,S,k,N,P,x);w=V(n,i),_=K(n,i),M=H(n,i,o,s,a),A=z(n,i,o,s,a,u);var R=D(w,_,M,A),O=L(w,_,M,A);m=v,g=y,v=d,y=p,d=f,p=c,f=D(l,h,I,T),c=L(h,h,I,T),l=a,h=u,a=o,u=s,o=n,s=i,n=D(I,T,R,O),i=L(I,T,R,O);}B(this.h,0,n,i),B(this.h,2,o,s),B(this.h,4,a,u),B(this.h,6,l,h),B(this.h,8,f,c),B(this.h,10,d,p),B(this.h,12,v,y),B(this.h,14,m,g);},f.prototype._digest=function(e){return "hex"===e?n.toHex32(this.h,"big"):n.split32(this.h,"big")};},{"../common":28,"../utils":38,"minimalistic-assert":41}],37:[function(e,t,r){var n=e("../utils").rotr32;function i(e,t,r){return e&t^~e&r}function o(e,t,r){return e&t^e&r^t&r}function s(e,t,r){return e^t^r}r.ft_1=function(e,t,r,n){return 0===e?i(t,r,n):1===e||3===e?s(t,r,n):2===e?o(t,r,n):void 0},r.ch32=i,r.maj32=o,r.p32=s,r.s0_256=function(e){return n(e,2)^n(e,13)^n(e,22)},r.s1_256=function(e){return n(e,6)^n(e,11)^n(e,25)},r.g0_256=function(e){return n(e,7)^n(e,18)^e>>>3},r.g1_256=function(e){return n(e,17)^n(e,19)^e>>>10};},{"../utils":38}],38:[function(e,t,r){var l=e("minimalistic-assert"),n=e("inherits");function o(e){return (e>>>24|e>>>8&65280|e<<8&16711680|(255&e)<<24)>>>0}function i(e){return 1===e.length?"0"+e:e}function s(e){return 7===e.length?"0"+e:6===e.length?"00"+e:5===e.length?"000"+e:4===e.length?"0000"+e:3===e.length?"00000"+e:2===e.length?"000000"+e:1===e.length?"0000000"+e:e}r.inherits=n,r.toArray=function(e,t){if(Array.isArray(e)){ return e.slice(); }if(!e){ return []; }var r=[];if("string"==typeof e){ if(t){if("hex"===t){ for((e=e.replace(/[^a-z0-9]+/gi,"")).length%2!=0&&(e="0"+e),n=0;n<e.length;n+=2){ r.push(parseInt(e[n]+e[n+1],16)); } }}else { for(var n=0;n<e.length;n++){var i=e.charCodeAt(n),o=i>>8,s=255&i;o?r.push(o,s):r.push(s);} } }else { for(n=0;n<e.length;n++){ r[n]=0|e[n]; } }return r},r.toHex=function(e){for(var t="",r=0;r<e.length;r++){ t+=i(e[r].toString(16)); }return t},r.htonl=o,r.toHex32=function(e,t){for(var r="",n=0;n<e.length;n++){var i=e[n];"little"===t&&(i=o(i)),r+=s(i.toString(16));}return r},r.zero2=i,r.zero8=s,r.join32=function(e,t,r,n){var i=r-t;l(i%4==0);for(var o=new Array(i/4),s=0,a=t;s<o.length;s++,a+=4){var u;u="big"===n?e[a]<<24|e[a+1]<<16|e[a+2]<<8|e[a+3]:e[a+3]<<24|e[a+2]<<16|e[a+1]<<8|e[a],o[s]=u>>>0;}return o},r.split32=function(e,t){for(var r=new Array(4*e.length),n=0,i=0;n<e.length;n++,i+=4){var o=e[n];"big"===t?(r[i]=o>>>24,r[i+1]=o>>>16&255,r[i+2]=o>>>8&255,r[i+3]=255&o):(r[i+3]=o>>>24,r[i+2]=o>>>16&255,r[i+1]=o>>>8&255,r[i]=255&o);}return r},r.rotr32=function(e,t){return e>>>t|e<<32-t},r.rotl32=function(e,t){return e<<t|e>>>32-t},r.sum32=function(e,t){return e+t>>>0},r.sum32_3=function(e,t,r){return e+t+r>>>0},r.sum32_4=function(e,t,r,n){return e+t+r+n>>>0},r.sum32_5=function(e,t,r,n,i){return e+t+r+n+i>>>0},r.sum64=function(e,t,r,n){var i=e[t],o=n+e[t+1]>>>0,s=(o<n?1:0)+r+i;e[t]=s>>>0,e[t+1]=o;},r.sum64_hi=function(e,t,r,n){return (t+n>>>0<t?1:0)+e+r>>>0},r.sum64_lo=function(e,t,r,n){return t+n>>>0},r.sum64_4_hi=function(e,t,r,n,i,o,s,a){var u=0,l=t;return u+=(l=l+n>>>0)<t?1:0,u+=(l=l+o>>>0)<o?1:0,e+r+i+s+(u+=(l=l+a>>>0)<a?1:0)>>>0},r.sum64_4_lo=function(e,t,r,n,i,o,s,a){return t+n+o+a>>>0},r.sum64_5_hi=function(e,t,r,n,i,o,s,a,u,l){var h=0,f=t;return h+=(f=f+n>>>0)<t?1:0,h+=(f=f+o>>>0)<o?1:0,h+=(f=f+a>>>0)<a?1:0,e+r+i+s+u+(h+=(f=f+l>>>0)<l?1:0)>>>0},r.sum64_5_lo=function(e,t,r,n,i,o,s,a,u,l){return t+n+o+a+l>>>0},r.rotr64_hi=function(e,t,r){return (t<<32-r|e>>>r)>>>0},r.rotr64_lo=function(e,t,r){return (e<<32-r|t>>>r)>>>0},r.shr64_hi=function(e,t,r){return e>>>r},r.shr64_lo=function(e,t,r){return (e<<32-r|t>>>r)>>>0};},{inherits:39,"minimalistic-assert":41}],39:[function(e,t,r){"function"==typeof Object.create?t.exports=function(e,t){t&&(e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}));}:t.exports=function(e,t){if(t){e.super_=t;function r(){}r.prototype=t.prototype,e.prototype=new r,e.prototype.constructor=e;}};},{}],40:[function(e,_,t){(function(b,w){!function(){var e="object"==typeof window?window:{};!e.JS_SHA3_NO_NODE_JS&&"object"==typeof b&&b.versions&&b.versions.node&&(e=w);for(var t=!e.JS_SHA3_NO_COMMON_JS&&"object"==typeof _&&_.exports,u="0123456789abcdef".split(""),h=[0,8,16,24],he=[1,0,32898,0,32906,2147483648,2147516416,2147483648,32907,0,2147483649,0,2147516545,2147483648,32777,2147483648,138,0,136,0,2147516425,0,2147483658,0,2147516555,0,139,2147483648,32905,2147483648,32771,2147483648,32770,2147483648,128,2147483648,32778,0,2147483658,2147483648,2147516545,2147483648,32896,2147483648,2147483649,0,2147516424,2147483648],r=[224,256,384,512],o=["hex","buffer","arrayBuffer","array"],s=function(t,r,n){return function(e){return new m(t,r,t).update(e)[n]()}},a=function(r,n,i){return function(e,t){return new m(r,n,t).update(e)[i]()}},n=function(e,t){var r=s(e,t,"hex");r.create=function(){return new m(e,t,e)},r.update=function(e){return r.create().update(e)};for(var n=0;n<o.length;++n){var i=o[n];r[i]=s(e,t,i);}return r},i=[{name:"keccak",padding:[1,256,65536,16777216],bits:r,createMethod:n},{name:"sha3",padding:[6,1536,393216,100663296],bits:r,createMethod:n},{name:"shake",padding:[31,7936,2031616,520093696],bits:[128,256],createMethod:function(t,r){var n=a(t,r,"hex");n.create=function(e){return new m(t,r,e)},n.update=function(e,t){return n.create(t).update(e)};for(var e=0;e<o.length;++e){var i=o[e];n[i]=a(t,r,i);}return n}}],l={},f=[],c=0;c<i.length;++c){ for(var d=i[c],p=d.bits,v=0;v<p.length;++v){var y=d.name+"_"+p[v];f.push(y),l[y]=d.createMethod(p[v],d.padding);} }function m(e,t,r){this.blocks=[],this.s=[],this.padding=t,this.outputBits=r,this.reset=!0,this.block=0,this.start=0,this.blockCount=1600-(e<<1)>>5,this.byteCount=this.blockCount<<2,this.outputBlocks=r>>5,this.extraBytes=(31&r)>>3;for(var n=0;n<50;++n){ this.s[n]=0; }}m.prototype.update=function(e){var t="string"!=typeof e;t&&e.constructor===ArrayBuffer&&(e=new Uint8Array(e));for(var r,n,i=e.length,o=this.blocks,s=this.byteCount,a=this.blockCount,u=0,l=this.s;u<i;){if(this.reset){ for(this.reset=!1,o[0]=this.block,r=1;r<a+1;++r){ o[r]=0; } }if(t){ for(r=this.start;u<i&&r<s;++u){ o[r>>2]|=e[u]<<h[3&r++]; } }else { for(r=this.start;u<i&&r<s;++u){ (n=e.charCodeAt(u))<128?o[r>>2]|=n<<h[3&r++]:(n<2048?o[r>>2]|=(192|n>>6)<<h[3&r++]:(n<55296||57344<=n?o[r>>2]|=(224|n>>12)<<h[3&r++]:(n=65536+((1023&n)<<10|1023&e.charCodeAt(++u)),o[r>>2]|=(240|n>>18)<<h[3&r++],o[r>>2]|=(128|n>>12&63)<<h[3&r++]),o[r>>2]|=(128|n>>6&63)<<h[3&r++]),o[r>>2]|=(128|63&n)<<h[3&r++]); } }if(s<=(this.lastByteIndex=r)){for(this.start=r-s,this.block=o[a],r=0;r<a;++r){ l[r]^=o[r]; }g(l),this.reset=!0;}else { this.start=r; }}return this},m.prototype.finalize=function(){var e=this.blocks,t=this.lastByteIndex,r=this.blockCount,n=this.s;if(e[t>>2]|=this.padding[3&t],this.lastByteIndex===this.byteCount){ for(e[0]=e[r],t=1;t<r+1;++t){ e[t]=0; } }for(e[r-1]|=2147483648,t=0;t<r;++t){ n[t]^=e[t]; }g(n);},m.prototype.toString=m.prototype.hex=function(){this.finalize();for(var e,t=this.blockCount,r=this.s,n=this.outputBlocks,i=this.extraBytes,o=0,s=0,a="";s<n;){for(o=0;o<t&&s<n;++o,++s){ e=r[o],a+=u[e>>4&15]+u[15&e]+u[e>>12&15]+u[e>>8&15]+u[e>>20&15]+u[e>>16&15]+u[e>>28&15]+u[e>>24&15]; }s%t==0&&(g(r),o=0);}return i&&(e=r[o],0<i&&(a+=u[e>>4&15]+u[15&e]),1<i&&(a+=u[e>>12&15]+u[e>>8&15]),2<i&&(a+=u[e>>20&15]+u[e>>16&15])),a},m.prototype.buffer=m.prototype.arrayBuffer=function(){this.finalize();var e,t=this.blockCount,r=this.s,n=this.outputBlocks,i=this.extraBytes,o=0,s=0,a=this.outputBits>>3;e=i?new ArrayBuffer(n+1<<2):new ArrayBuffer(a);for(var u=new Uint32Array(e);s<n;){for(o=0;o<t&&s<n;++o,++s){ u[s]=r[o]; }s%t==0&&g(r);}return i&&(u[o]=r[o],e=e.slice(0,a)),e},m.prototype.digest=m.prototype.array=function(){this.finalize();for(var e,t,r=this.blockCount,n=this.s,i=this.outputBlocks,o=this.extraBytes,s=0,a=0,u=[];a<i;){for(s=0;s<r&&a<i;++s,++a){ e=a<<2,t=n[s],u[e]=255&t,u[e+1]=t>>8&255,u[e+2]=t>>16&255,u[e+3]=t>>24&255; }a%r==0&&g(n);}return o&&(e=a<<2,t=n[s],0<o&&(u[e]=255&t),1<o&&(u[e+1]=t>>8&255),2<o&&(u[e+2]=t>>16&255)),u};var g=function(e){var t,r,n,i,o,s,a,u,l,h,f,c,d,p,v,y,m,g,b,w,_,M,A,E,S,k,N,P,x,I,T,R,O,C,B,D,L,U,F,j,G,H,z,V,K,q,W,Z,J,X,$,Q,Y,ee,te,re,ne,ie,oe,se,ae,ue,le;for(n=0;n<48;n+=2){ i=e[0]^e[10]^e[20]^e[30]^e[40],o=e[1]^e[11]^e[21]^e[31]^e[41],s=e[2]^e[12]^e[22]^e[32]^e[42],a=e[3]^e[13]^e[23]^e[33]^e[43],u=e[4]^e[14]^e[24]^e[34]^e[44],l=e[5]^e[15]^e[25]^e[35]^e[45],h=e[6]^e[16]^e[26]^e[36]^e[46],f=e[7]^e[17]^e[27]^e[37]^e[47],t=(c=e[8]^e[18]^e[28]^e[38]^e[48])^(s<<1|a>>>31),r=(d=e[9]^e[19]^e[29]^e[39]^e[49])^(a<<1|s>>>31),e[0]^=t,e[1]^=r,e[10]^=t,e[11]^=r,e[20]^=t,e[21]^=r,e[30]^=t,e[31]^=r,e[40]^=t,e[41]^=r,t=i^(u<<1|l>>>31),r=o^(l<<1|u>>>31),e[2]^=t,e[3]^=r,e[12]^=t,e[13]^=r,e[22]^=t,e[23]^=r,e[32]^=t,e[33]^=r,e[42]^=t,e[43]^=r,t=s^(h<<1|f>>>31),r=a^(f<<1|h>>>31),e[4]^=t,e[5]^=r,e[14]^=t,e[15]^=r,e[24]^=t,e[25]^=r,e[34]^=t,e[35]^=r,e[44]^=t,e[45]^=r,t=u^(c<<1|d>>>31),r=l^(d<<1|c>>>31),e[6]^=t,e[7]^=r,e[16]^=t,e[17]^=r,e[26]^=t,e[27]^=r,e[36]^=t,e[37]^=r,e[46]^=t,e[47]^=r,t=h^(i<<1|o>>>31),r=f^(o<<1|i>>>31),e[8]^=t,e[9]^=r,e[18]^=t,e[19]^=r,e[28]^=t,e[29]^=r,e[38]^=t,e[39]^=r,e[48]^=t,e[49]^=r,p=e[0],v=e[1],q=e[11]<<4|e[10]>>>28,W=e[10]<<4|e[11]>>>28,P=e[20]<<3|e[21]>>>29,x=e[21]<<3|e[20]>>>29,se=e[31]<<9|e[30]>>>23,ae=e[30]<<9|e[31]>>>23,H=e[40]<<18|e[41]>>>14,z=e[41]<<18|e[40]>>>14,C=e[2]<<1|e[3]>>>31,B=e[3]<<1|e[2]>>>31,y=e[13]<<12|e[12]>>>20,m=e[12]<<12|e[13]>>>20,Z=e[22]<<10|e[23]>>>22,J=e[23]<<10|e[22]>>>22,I=e[33]<<13|e[32]>>>19,T=e[32]<<13|e[33]>>>19,ue=e[42]<<2|e[43]>>>30,le=e[43]<<2|e[42]>>>30,ee=e[5]<<30|e[4]>>>2,te=e[4]<<30|e[5]>>>2,D=e[14]<<6|e[15]>>>26,L=e[15]<<6|e[14]>>>26,g=e[25]<<11|e[24]>>>21,b=e[24]<<11|e[25]>>>21,X=e[34]<<15|e[35]>>>17,$=e[35]<<15|e[34]>>>17,R=e[45]<<29|e[44]>>>3,O=e[44]<<29|e[45]>>>3,E=e[6]<<28|e[7]>>>4,S=e[7]<<28|e[6]>>>4,re=e[17]<<23|e[16]>>>9,ne=e[16]<<23|e[17]>>>9,U=e[26]<<25|e[27]>>>7,F=e[27]<<25|e[26]>>>7,w=e[36]<<21|e[37]>>>11,_=e[37]<<21|e[36]>>>11,Q=e[47]<<24|e[46]>>>8,Y=e[46]<<24|e[47]>>>8,V=e[8]<<27|e[9]>>>5,K=e[9]<<27|e[8]>>>5,k=e[18]<<20|e[19]>>>12,N=e[19]<<20|e[18]>>>12,ie=e[29]<<7|e[28]>>>25,oe=e[28]<<7|e[29]>>>25,j=e[38]<<8|e[39]>>>24,G=e[39]<<8|e[38]>>>24,M=e[48]<<14|e[49]>>>18,A=e[49]<<14|e[48]>>>18,e[0]=p^~y&g,e[1]=v^~m&b,e[10]=E^~k&P,e[11]=S^~N&x,e[20]=C^~D&U,e[21]=B^~L&F,e[30]=V^~q&Z,e[31]=K^~W&J,e[40]=ee^~re&ie,e[41]=te^~ne&oe,e[2]=y^~g&w,e[3]=m^~b&_,e[12]=k^~P&I,e[13]=N^~x&T,e[22]=D^~U&j,e[23]=L^~F&G,e[32]=q^~Z&X,e[33]=W^~J&$,e[42]=re^~ie&se,e[43]=ne^~oe&ae,e[4]=g^~w&M,e[5]=b^~_&A,e[14]=P^~I&R,e[15]=x^~T&O,e[24]=U^~j&H,e[25]=F^~G&z,e[34]=Z^~X&Q,e[35]=J^~$&Y,e[44]=ie^~se&ue,e[45]=oe^~ae&le,e[6]=w^~M&p,e[7]=_^~A&v,e[16]=I^~R&E,e[17]=T^~O&S,e[26]=j^~H&C,e[27]=G^~z&B,e[36]=X^~Q&V,e[37]=$^~Y&K,e[46]=se^~ue&ee,e[47]=ae^~le&te,e[8]=M^~p&y,e[9]=A^~v&m,e[18]=R^~E&k,e[19]=O^~S&N,e[28]=H^~C&D,e[29]=z^~B&L,e[38]=Q^~V&q,e[39]=Y^~K&W,e[48]=ue^~ee&re,e[49]=le^~te&ne,e[0]^=he[n],e[1]^=he[n+1]; }};if(t){ _.exports=l; }else { for(c=0;c<f.length;++c){ e[f[c]]=l[f[c]]; } }}();}).call(this,e("_process"),"undefined"!=typeof commonjsGlobal?commonjsGlobal:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});},{_process:42}],41:[function(e,t,r){function n(e,t){if(!e){ throw new Error(t||"Assertion failed") }}(t.exports=n).equal=function(e,t,r){if(e!=t){ throw new Error(r||"Assertion failed: "+e+" != "+t) }};},{}],42:[function(e,t,r){t.exports={browser:!0};},{}],43:[function(e,r,o){(function(n){function l(e){var y=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],m=1779033703,g=3144134277,b=1013904242,w=2773480762,_=1359893119,M=2600822924,A=528734635,E=1541459225,S=new Array(64);function t(e){for(var t=0,r=e.length;64<=r;){var n,i,o,s,a,u=m,l=g,h=b,f=w,c=_,d=M,p=A,v=E;for(i=0;i<16;i++){ o=t+4*i,S[i]=(255&e[o])<<24|(255&e[o+1])<<16|(255&e[o+2])<<8|255&e[o+3]; }for(i=16;i<64;i++){ s=((n=S[i-2])>>>17|n<<15)^(n>>>19|n<<13)^n>>>10,a=((n=S[i-15])>>>7|n<<25)^(n>>>18|n<<14)^n>>>3,S[i]=(s+S[i-7]|0)+(a+S[i-16]|0)|0; }for(i=0;i<64;i++){ s=(((c>>>6|c<<26)^(c>>>11|c<<21)^(c>>>25|c<<7))+(c&d^~c&p)|0)+(v+(y[i]+S[i]|0)|0)|0,a=((u>>>2|u<<30)^(u>>>13|u<<19)^(u>>>22|u<<10))+(u&l^u&h^l&h)|0,v=p,p=d,d=c,c=f+s|0,f=h,h=l,l=u,u=s+a|0; }m=m+u|0,g=g+l|0,b=b+h|0,w=w+f|0,_=_+c|0,M=M+d|0,A=A+p|0,E=E+v|0,t+=64,r-=64;}}t(e);var r,n=e.length%64,i=e.length/536870912|0,o=e.length<<3,s=n<56?56:120,a=e.slice(e.length-n,e.length);for(a.push(128),r=1+n;r<s;r++){ a.push(0); }return a.push(i>>>24&255),a.push(i>>>16&255),a.push(i>>>8&255),a.push(i>>>0&255),a.push(o>>>24&255),a.push(o>>>16&255),a.push(o>>>8&255),a.push(o>>>0&255),t(a),[m>>>24&255,m>>>16&255,m>>>8&255,m>>>0&255,g>>>24&255,g>>>16&255,g>>>8&255,g>>>0&255,b>>>24&255,b>>>16&255,b>>>8&255,b>>>0&255,w>>>24&255,w>>>16&255,w>>>8&255,w>>>0&255,_>>>24&255,_>>>16&255,_>>>8&255,_>>>0&255,M>>>24&255,M>>>16&255,M>>>8&255,M>>>0&255,A>>>24&255,A>>>16&255,A>>>8&255,A>>>0&255,E>>>24&255,E>>>16&255,E>>>8&255,E>>>0&255]}function x(e,t,r){var n;e=e.length<=64?e:l(e);var i=64+t.length+4,o=new Array(i),s=new Array(64),a=[];for(n=0;n<64;n++){ o[n]=54; }for(n=0;n<e.length;n++){ o[n]^=e[n]; }for(n=0;n<t.length;n++){ o[64+n]=t[n]; }for(n=i-4;n<i;n++){ o[n]=0; }for(n=0;n<64;n++){ s[n]=92; }for(n=0;n<e.length;n++){ s[n]^=e[n]; }function u(){for(var e=i-1;i-4<=e;e--){if(o[e]++,o[e]<=255){ return; }o[e]=0;}}for(;32<=r;){ u(),a=a.concat(l(s.concat(l(o)))),r-=32; }return 0<r&&(u(),a=a.concat(l(s.concat(l(o))).slice(0,r))),a}function I(e,t,r,n,i){var o;for(R(e,16*(2*r-1),i,0,16),o=0;o<2*r;o++){ T(e,16*o,i,16),s(i,n),R(i,0,e,t+16*o,16); }for(o=0;o<r;o++){ R(e,t+2*o*16,e,16*o,16); }for(o=0;o<r;o++){ R(e,t+16*(2*o+1),e,16*(o+r),16); }}function i(e,t){return e<<t|e>>>32-t}function s(e,t){R(e,0,t,0,16);for(var r=8;0<r;r-=2){ t[4]^=i(t[0]+t[12],7),t[8]^=i(t[4]+t[0],9),t[12]^=i(t[8]+t[4],13),t[0]^=i(t[12]+t[8],18),t[9]^=i(t[5]+t[1],7),t[13]^=i(t[9]+t[5],9),t[1]^=i(t[13]+t[9],13),t[5]^=i(t[1]+t[13],18),t[14]^=i(t[10]+t[6],7),t[2]^=i(t[14]+t[10],9),t[6]^=i(t[2]+t[14],13),t[10]^=i(t[6]+t[2],18),t[3]^=i(t[15]+t[11],7),t[7]^=i(t[3]+t[15],9),t[11]^=i(t[7]+t[3],13),t[15]^=i(t[11]+t[7],18),t[1]^=i(t[0]+t[3],7),t[2]^=i(t[1]+t[0],9),t[3]^=i(t[2]+t[1],13),t[0]^=i(t[3]+t[2],18),t[6]^=i(t[5]+t[4],7),t[7]^=i(t[6]+t[5],9),t[4]^=i(t[7]+t[6],13),t[5]^=i(t[4]+t[7],18),t[11]^=i(t[10]+t[9],7),t[8]^=i(t[11]+t[10],9),t[9]^=i(t[8]+t[11],13),t[10]^=i(t[9]+t[8],18),t[12]^=i(t[15]+t[14],7),t[13]^=i(t[12]+t[15],9),t[14]^=i(t[13]+t[12],13),t[15]^=i(t[14]+t[13],18); }for(r=0;r<16;++r){ e[r]+=t[r]; }}function T(e,t,r,n){for(var i=0;i<n;i++){ r[i]^=e[t+i]; }}function R(e,t,r,n,i){for(;i--;){ r[n++]=e[t++]; }}function O(e){if(!e||"number"!=typeof e.length){ return !1; }for(var t=0;t<e.length;t++){if("number"!=typeof e[t]){ return !1; }var r=parseInt(e[t]);if(r!=e[t]||r<0||256<=r){ return !1 }}return !0}function C(e,t){var r=parseInt(e);if(e!=r){ throw new Error("invalid "+t); }return r}function e(o,e,s,a,u,l,h){if(!h){ throw new Error("missing callback"); }if(s=C(s,"N"),a=C(a,"r"),u=C(u,"p"),l=C(l,"dkLen"),0===s||0!=(s&s-1)){ throw new Error("N must be power of 2"); }if(B/128/a<s){ throw new Error("N too large"); }if(B/128/u<a){ throw new Error("r too large"); }if(!O(o)){ throw new Error("password must be an array or buffer"); }if(o=Array.prototype.slice.call(o),!O(e)){ throw new Error("salt must be an array or buffer"); }e=Array.prototype.slice.call(e);for(var f=x(o,e,128*u*a),c=new Uint32Array(32*u*a),t=0;t<c.length;t++){var r=4*t;c[t]=(255&f[3+r])<<24|(255&f[2+r])<<16|(255&f[1+r])<<8|(255&f[0+r])<<0;}var d,p,v=new Uint32Array(64*a),y=new Uint32Array(32*a*s),m=32*a,g=new Uint32Array(16),b=new Uint32Array(16),w=u*s*2,_=0,M=null,A=!1,E=0,S=0,k=parseInt(1e3/a),N=void 0!==n?n:setTimeout,P=function(){if(A){ return h(new Error("cancelled"),_/w); }switch(E){case 0:R(c,p=32*S*a,v,0,m),E=1,d=0;case 1:k<(t=s-d)&&(t=k);for(var e=0;e<t;e++){ R(v,0,y,(d+e)*m,m),I(v,m,a,g,b); }if(d+=t,_+=t,(r=parseInt(1e3*_/w))!==M){if(A=h(null,_/w)){ break; }M=r;}if(d<s){ break; }d=0,E=2;case 2:var t,r;k<(t=s-d)&&(t=k);for(e=0;e<t;e++){var n=v[16*(2*a-1)]&s-1;T(y,n*m,v,m),I(v,m,a,g,b);}if(d+=t,_+=t,(r=parseInt(1e3*_/w))!==M){if(A=h(null,_/w)){ break; }M=r;}if(d<s){ break; }if(R(v,0,c,p,m),++S<u){E=0;break}f=[];for(e=0;e<c.length;e++){ f.push(c[e]>>0&255),f.push(c[e]>>8&255),f.push(c[e]>>16&255),f.push(c[e]>>24&255); }var i=x(o,f,l);return h(null,1,i)}N(P);};P();}var t,B;t=this,B=2147483647,void 0!==o?r.exports=e:t&&(t.scrypt&&(t._scrypt=t.scrypt),t.scrypt=e);}).call(this,e("timers").setImmediate);},{timers:45}],44:[function(e,t,r){(function(y,e,t){!function(r,n){if(!r.setImmediate){var e,i,t,o,s=1,a={},u=!1,l=r.document,h=Object.getPrototypeOf&&Object.getPrototypeOf(r);h=h&&h.setTimeout?h:r,e="[object process]"==={}.toString.call(r.process)?function(){var e=f(arguments);return y.nextTick(c(d,e)),e}:function(){if(r.postMessage&&!r.importScripts){var e=!0,t=r.onmessage;return r.onmessage=function(){e=!1;},r.postMessage("","*"),r.onmessage=t,e}}()?(o="setImmediate$"+Math.random()+"$",r.addEventListener?r.addEventListener("message",v,!1):r.attachEvent("onmessage",v),function(){var e=f(arguments);return r.postMessage(o+e,"*"),e}):r.MessageChannel?((t=new MessageChannel).port1.onmessage=function(e){d(e.data);},function(){var e=f(arguments);return t.port2.postMessage(e),e}):l&&"onreadystatechange"in l.createElement("script")?(i=l.documentElement,function(){var e=f(arguments),t=l.createElement("script");return t.onreadystatechange=function(){d(e),t.onreadystatechange=null,i.removeChild(t),t=null;},i.appendChild(t),e}):function(){var e=f(arguments);return setTimeout(c(d,e),0),e},h.setImmediate=e,h.clearImmediate=p;}function f(e){return a[s]=c.apply(n,e),s++}function c(e){var t=[].slice.call(arguments,1);return function(){"function"==typeof e?e.apply(n,t):new Function(""+e)();}}function d(e){if(u){ setTimeout(c(d,e),0); }else{var t=a[e];if(t){u=!0;try{t();}finally{p(e),u=!1;}}}}function p(e){delete a[e];}function v(e){e.source===r&&"string"==typeof e.data&&0===e.data.indexOf(o)&&d(+e.data.slice(o.length));}}("undefined"==typeof self?void 0===e?this:e:self);}).call(this,e("_process"),"undefined"!=typeof commonjsGlobal?commonjsGlobal:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("timers").clearImmediate);},{_process:42,timers:45}],45:[function(e,t,r){(function(e){t.exports={setImmediate:e.setImmediate};}).call(this,"undefined"!=typeof commonjsGlobal?commonjsGlobal:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});},{}],46:[function(e,i,t){(function(e){var t;if(e.crypto&&crypto.getRandomValues){var r=new Uint8Array(16);t=function(){return crypto.getRandomValues(r),r};}if(!t){var n=new Array(16);t=function(){for(var e,t=0;t<16;t++){ 0==(3&t)&&(e=4294967296*Math.random()),n[t]=e>>>((3&t)<<3)&255; }return n};}i.exports=t;}).call(this,"undefined"!=typeof commonjsGlobal?commonjsGlobal:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});},{}],47:[function(e,t,r){for(var s=e("./rng"),i=[],o={},n=0;n<256;n++){ i[n]=(n+256).toString(16).substr(1),o[i[n]]=n; }function d(e,t){var r=t||0,n=i;return n[e[r++]]+n[e[r++]]+n[e[r++]]+n[e[r++]]+"-"+n[e[r++]]+n[e[r++]]+"-"+n[e[r++]]+n[e[r++]]+"-"+n[e[r++]]+n[e[r++]]+"-"+n[e[r++]]+n[e[r++]]+n[e[r++]]+n[e[r++]]+n[e[r++]]+n[e[r++]]}var a=s(),p=[1|a[0],a[1],a[2],a[3],a[4],a[5]],v=16383&(a[6]<<8|a[7]),y=0,m=0;function u(e,t,r){var n=t&&r||0;"string"==typeof e&&(t="binary"==e?new Array(16):null,e=null);var i=(e=e||{}).random||(e.rng||s)();if(i[6]=15&i[6]|64,i[8]=63&i[8]|128,t){ for(var o=0;o<16;o++){ t[n+o]=i[o]; } }return t||d(i)}var l=u;l.v1=function(e,t,r){var n=t&&r||0,i=t||[],o=void 0!==(e=e||{}).clockseq?e.clockseq:v,s=void 0!==e.msecs?e.msecs:(new Date).getTime(),a=void 0!==e.nsecs?e.nsecs:m+1,u=s-y+(a-m)/1e4;if(u<0&&void 0===e.clockseq&&(o=o+1&16383),(u<0||y<s)&&void 0===e.nsecs&&(a=0),1e4<=a){ throw new Error("uuid.v1(): Can't create more than 10M uuids/sec"); }y=s,v=o;var l=(1e4*(268435455&(s+=122192928e5))+(m=a))%4294967296;i[n++]=l>>>24&255,i[n++]=l>>>16&255,i[n++]=l>>>8&255,i[n++]=255&l;var h=s/4294967296*1e4&268435455;i[n++]=h>>>8&255,i[n++]=255&h,i[n++]=h>>>24&15|16,i[n++]=h>>>16&255,i[n++]=o>>>8|128,i[n++]=255&o;for(var f=e.node||p,c=0;c<6;c++){ i[n+c]=f[c]; }return t||d(i)},l.v4=u,l.parse=function(e,t,r){var n=t&&r||0,i=0;for(t=t||[],e.toLowerCase().replace(/[0-9a-f]{2}/g,function(e){i<16&&(t[n+i++]=o[e]);});i<16;){ t[n+i++]=0; }return t},l.unparse=d,t.exports=l;},{"./rng":46}],48:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0});try{t.exports.XMLHttpRequest=XMLHttpRequest;}catch(e){console.log("Warning: XMLHttpRequest is not defined"),t.exports.XMLHttpRequest=null;}},{}],49:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0});var n=e("../utils/properties"),i=(o.isProvider=function(e){return n.isType(e,"Provider")},o);function o(){n.setType(this,"Provider");}r.Provider=i;},{"../utils/properties":73}],50:[function(e,t,r){var n,i=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t;}||function(e,t){for(var r in t){ t.hasOwnProperty(r)&&(e[r]=t[r]); }},function(e,t){function r(){this.constructor=e;}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r);}),o=this&&this.__importStar||function(e){if(e&&e.__esModule){ return e; }var t={};if(null!=e){ for(var r in e){ Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]); } }return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var s=e("../utils/address"),a=e("../utils/bignumber"),u=e("../utils/bytes"),l=e("../constants"),h=e("../utils/hash"),f=e("../utils/networks"),c=e("../utils/properties"),d=e("../utils/rlp"),p=e("../utils/transaction"),v=e("../utils/utf8"),y=e("../utils/web"),m=o(e("../errors")),g=e("./abstract-provider");function b(e,t){var r={};for(var n in e){ try{var i=e[n](t[n]);void 0!==i&&(r[n]=i);}catch(e){throw e.checkKey=n,e.checkValue=t[n],e} }return r}function w(t,r){return function(e){return null==e?r:t(e)}}function _(r){return function(e){if(!Array.isArray(e)){ throw new Error("not an array"); }var t=[];return e.forEach(function(e){t.push(r(e));}),t}}function M(e,t){return "string"==typeof e&&(t||"0x"===e.substring(0,2)||(e="0x"+e),32===u.hexDataLength(e))?e.toLowerCase():(m.throwError("invalid hash",m.INVALID_ARGUMENT,{arg:"hash",value:e}),null)}function A(e){return a.bigNumberify(e).toNumber()}function E(e){if(!u.isHexString(e)){ throw new Error("invalid uint256"); }for(;e.length<66;){ e="0x0"+e.substring(2); }return e}function S(e){if(null==e){ return "latest"; }if("earliest"===e){ return "0x0"; }if("latest"===e||"pending"===e){ return e; }if("number"==typeof e){ return u.hexStripZeros(u.hexlify(e)); }if(u.isHexString(e)){ return u.hexStripZeros(e); }throw new Error("invalid blockTag")}var k={hash:M,blockHash:w(M,null),blockNumber:w(A,null),transactionIndex:w(A,null),confirmations:w(A,null),from:s.getAddress,gasPrice:a.bigNumberify,gasLimit:a.bigNumberify,to:w(s.getAddress,null),value:a.bigNumberify,nonce:A,data:u.hexlify,r:w(E),s:w(E),v:w(A),creates:w(s.getAddress,null),raw:w(u.hexlify)};function N(e){if(null!=e.gas&&null==e.gasLimit&&(e.gasLimit=e.gas),e.to&&a.bigNumberify(e.to).isZero()&&(e.to="0x0000000000000000000000000000000000000000"),null!=e.input&&null==e.data&&(e.data=e.input),null==e.to&&null==e.creates&&(e.creates=s.getContractAddress(e)),!e.raw&&e.v&&e.r&&e.s){var t=[u.stripZeros(u.hexlify(e.nonce)),u.stripZeros(u.hexlify(e.gasPrice)),u.stripZeros(u.hexlify(e.gasLimit)),e.to||"0x",u.stripZeros(u.hexlify(e.value||"0x")),u.hexlify(e.data||"0x"),u.stripZeros(u.hexlify(e.v||"0x")),u.stripZeros(u.hexlify(e.r)),u.stripZeros(u.hexlify(e.s))];e.raw=d.encode(t);}var r=b(k,e),n=e.networkId;return null!=e.chainId&&null==n&&null==r.v&&(n=e.chainId),u.isHexString(n)&&(n=a.bigNumberify(n).toNumber()),"number"!=typeof n&&null!=r.v&&((n=(r.v-35)/2)<0&&(n=0),n=parseInt(n)),"number"!=typeof n&&(n=0),r.networkId=n,r.blockHash&&"x"===r.blockHash.replace(/0/g,"")&&(r.blockHash=null),r}var P={hash:M,parentHash:M,number:A,timestamp:A,nonce:w(u.hexlify),difficulty:function(e){var t=a.bigNumberify(e);try{return t.toNumber()}catch(e){}return null},gasLimit:a.bigNumberify,gasUsed:a.bigNumberify,miner:s.getAddress,extraData:u.hexlify,transactions:w(_(M))},x=c.shallowCopy(P);function I(e,t){return null!=e.author&&null==e.miner&&(e.miner=e.author),b(t?x:P,e)}x.transactions=w(_(N));var T={from:w(s.getAddress),nonce:w(A),gasLimit:w(a.bigNumberify),gasPrice:w(a.bigNumberify),to:w(s.getAddress),value:w(a.bigNumberify),data:w(u.hexlify)};function R(e){return b(T,e)}var O={transactionLogIndex:w(A),transactionIndex:A,blockNumber:A,transactionHash:M,address:s.getAddress,topics:_(M),data:u.hexlify,logIndex:A,blockHash:M};var C={to:w(s.getAddress,null),from:w(s.getAddress,null),contractAddress:w(s.getAddress,null),transactionIndex:A,root:w(M),gasUsed:a.bigNumberify,logsBloom:w(u.hexlify),blockHash:M,transactionHash:M,logs:_(function(e){return b(O,e)}),blockNumber:A,confirmations:w(A,null),cumulativeGasUsed:a.bigNumberify,status:w(A)};function B(e){return Array.isArray(e)?e.forEach(function(e){B(e);}):null!=e&&M(e),e}var D={fromBlock:w(S,void 0),toBlock:w(S,void 0),address:w(s.getAddress,void 0),topics:w(B,void 0)},L={blockHash:w(M,void 0),address:w(s.getAddress,void 0),topics:w(B,void 0)};var U,F,j={blockNumber:w(A),blockHash:w(M),transactionIndex:A,removed:w(function(e){if("boolean"==typeof e){ return e; }if("string"==typeof e){if("true"===e){ return !0; }if("false"===e){ return !1 }}throw new Error("invaid boolean - "+e)}),address:s.getAddress,data:(U=u.hexlify,F="0x",function(e){return e?U(e):F}),topics:_(M),transactionHash:M,logIndex:A};function G(e){return b(j,e)}function H(e){return e.map(function(e){return "string"==typeof e?e:Array.isArray(e)?(e.forEach(function(e){null!==e&&32!==u.hexDataLength(e)&&m.throwError("invalid topic",m.INVALID_ARGUMENT,{argument:"topic",value:e});}),e.join(",")):null===e?"":m.throwError("invalid topic value",m.INVALID_ARGUMENT,{argument:"topic",value:e})}).join("&")}function z(e){if("string"==typeof e){if(20===u.hexDataLength(e)){ return "address:"+s.getAddress(e); }if(e=e.toLowerCase(),32===u.hexDataLength(e)){ return "tx:"+e; }if(-1===e.indexOf(":")){ return e }}else{if(Array.isArray(e)){ return "filter::"+H(e); }if(e&&"object"==typeof e){ return "filter:"+(e.address||"")+":"+H(e.topics||[]) }}throw new Error("invalid event - "+e)}function V(){return (new Date).getTime()}var K,q=(K=g.Provider,i(W,K),W.prototype._doPoll=function(){var u=this;this.getBlockNumber().then(function(s){if(u._setFastBlockNumber(s),s!==u._lastBlockNumber){-2===u._emitted.block&&(u._emitted.block=s-1);for(var e=u._emitted.block+1;e<=s;e++){ u.emit("block",e); }u._emitted.block!==s&&(u._emitted.block=s,Object.keys(u._emitted).forEach(function(e){if("block"!==e){var t=u._emitted[e];"pending"!==t&&12<s-t&&delete u._emitted[e];}})),-2===u._lastBlockNumber&&(u._lastBlockNumber=s-1);var a={},t={};return u._events.forEach(function(e){t[e.tag]=!0;}),Object.keys(t).forEach(function(e){var t=e.split(":");switch(t[0]){case"tx":var r=t[1];u.getTransactionReceipt(r).then(function(e){return e&&null!=e.blockNumber&&(u._emitted["t:"+r]=e.blockNumber,u.emit(r,e)),null}).catch(function(e){u.emit("error",e);});break;case"address":var n=t[1];u._balances[n]&&(a[n]=u._balances[n]),u.getBalance(n,"latest").then(function(e){var t=u._balances[n];if(!t||!e.eq(t)){ return u._balances[n]=e,u.emit(n,e),null }}).catch(function(e){u.emit("error",e);});break;case"filter":var i=function(e){return e.split(/&/g).map(function(e){var t=e.split(",");return 1===t.length?""===t[0]?null:e:t.map(function(e){return ""===e?null:e})})}(t[2]),o={address:t[1],fromBlock:u._lastBlockNumber+1,toBlock:s,topics:i};o.address||delete o.address,u.getLogs(o).then(function(e){if(0!==e.length){ return e.forEach(function(e){u._emitted["b:"+e.blockHash]=e.blockNumber,u._emitted["t:"+e.transactionHash]=e.blockNumber,u.emit(o,e);}),null }}).catch(function(e){u.emit("error",e);});}}),u._lastBlockNumber=s,u._balances=a,null}}).catch(function(e){}),this.doPoll();},W.prototype.resetEventsBlock=function(e){this._lastBlockNumber=e-1,this.polling&&this._doPoll();},Object.defineProperty(W.prototype,"network",{get:function(){return this._network},enumerable:!0,configurable:!0}),W.prototype.getNetwork=function(){return this.ready},Object.defineProperty(W.prototype,"blockNumber",{get:function(){return this._fastBlockNumber},enumerable:!0,configurable:!0}),Object.defineProperty(W.prototype,"polling",{get:function(){return null!=this._poller},set:function(e){var t=this;setTimeout(function(){e&&!t._poller?t._poller=setInterval(t._doPoll.bind(t),t.pollingInterval):!e&&t._poller&&(clearInterval(t._poller),t._poller=null);},0);},enumerable:!0,configurable:!0}),Object.defineProperty(W.prototype,"pollingInterval",{get:function(){return this._pollingInterval},set:function(e){var t=this;if("number"!=typeof e||e<=0||parseInt(String(e))!=e){ throw new Error("invalid polling interval"); }this._pollingInterval=e,this._poller&&(clearInterval(this._poller),this._poller=setInterval(function(){t._doPoll();},this._pollingInterval));},enumerable:!0,configurable:!0}),W.prototype._getFastBlockNumber=function(){var t=this,e=V();return e-this._fastQueryDate>2*this._pollingInterval&&(this._fastQueryDate=e,this._fastBlockNumberPromise=this.getBlockNumber().then(function(e){return (null==t._fastBlockNumber||e>t._fastBlockNumber)&&(t._fastBlockNumber=e),t._fastBlockNumber})),this._fastBlockNumberPromise},W.prototype._setFastBlockNumber=function(e){null!=this._fastBlockNumber&&e<this._fastBlockNumber||(this._fastQueryDate=V(),(null==this._fastBlockNumber||e>this._fastBlockNumber)&&(this._fastBlockNumber=e,this._fastBlockNumberPromise=Promise.resolve(e)));},W.prototype.waitForTransaction=function(n,i){var o=this;return null==i&&(i=1),this.getTransactionReceipt(n).then(function(e){return 0===i||e&&e.confirmations>=i?e:new Promise(function(t){var r=function(e){e.confirmations<i||(o.removeListener(n,r),t(e));};o.on(n,r);})})},W.prototype.getBlockNumber=function(){var r=this;return this.ready.then(function(){return r.perform("getBlockNumber",{}).then(function(e){var t=parseInt(e);if(t!=e){ throw new Error("invalid response - getBlockNumber"); }return r._setFastBlockNumber(t),t})})},W.prototype.getGasPrice=function(){var e=this;return this.ready.then(function(){return e.perform("getGasPrice",{}).then(function(e){return a.bigNumberify(e)})})},W.prototype.getBalance=function(e,t){var n=this;return this.ready.then(function(){return c.resolveProperties({addressOrName:e,blockTag:t}).then(function(e){var t=e.addressOrName,r=e.blockTag;return n._getAddress(t).then(function(e){var t={address:e,blockTag:S(r)};return n.perform("getBalance",t).then(function(e){return a.bigNumberify(e)})})})})},W.prototype.getTransactionCount=function(e,t){var n=this;return this.ready.then(function(){return c.resolveProperties({addressOrName:e,blockTag:t}).then(function(e){var t=e.addressOrName,r=e.blockTag;return n._getAddress(t).then(function(e){var t={address:e,blockTag:S(r)};return n.perform("getTransactionCount",t).then(function(e){return a.bigNumberify(e).toNumber()})})})})},W.prototype.getCode=function(e,t){var n=this;return this.ready.then(function(){return c.resolveProperties({addressOrName:e,blockTag:t}).then(function(e){var t=e.addressOrName,r=e.blockTag;return n._getAddress(t).then(function(e){var t={address:e,blockTag:S(r)};return n.perform("getCode",t).then(function(e){return u.hexlify(e)})})})})},W.prototype.getStorageAt=function(e,t,r){var i=this;return this.ready.then(function(){return c.resolveProperties({addressOrName:e,position:t,blockTag:r}).then(function(e){var t=e.addressOrName,r=e.position,n=e.blockTag;return i._getAddress(t).then(function(e){var t={address:e,blockTag:S(n),position:u.hexStripZeros(u.hexlify(r))};return i.perform("getStorageAt",t).then(function(e){return u.hexlify(e)})})})})},W.prototype.sendTransaction=function(e){var n=this;return this.ready.then(function(){return c.resolveProperties({signedTransaction:e}).then(function(e){var t=e.signedTransaction,r={signedTransaction:u.hexlify(t)};return n.perform("sendTransaction",r).then(function(e){return n._wrapTransaction(p.parse(t),e)},function(e){throw e.transaction=p.parse(t),e.transaction.hash&&(e.transactionHash=e.transaction.hash),e})})})},W.prototype._wrapTransaction=function(r,e){var n=this;if(null!=e&&32!==u.hexDataLength(e)){ throw new Error("invalid response - sendTransaction"); }var t=r;return null!=e&&r.hash!==e&&m.throwError("Transaction hash mismatch from Provider.sendTransaction.",m.UNKNOWN_ERROR,{expectedHash:r.hash,returnedHash:e}),t.wait=function(t){return 0!==t&&(n._emitted["t:"+r.hash]="pending"),n.waitForTransaction(r.hash,t).then(function(e){return null==e&&0===t?null:(n._emitted["t:"+r.hash]=e.blockNumber,0===e.status&&m.throwError("transaction failed",m.CALL_EXCEPTION,{transactionHash:r.hash,transaction:r}),e)})},t},W.prototype.call=function(e,t){var n=this,r=c.shallowCopy(e);return this.ready.then(function(){return c.resolveProperties({blockTag:t,tx:r}).then(function(e){var r=e.blockTag,t=e.tx;return n._resolveNames(t,["to","from"]).then(function(e){var t={blockTag:S(r),transaction:R(e)};return n.perform("call",t).then(function(e){return u.hexlify(e)})})})})},W.prototype.estimateGas=function(e){var r=this,t={to:e.to,from:e.from,data:e.data,gasPrice:e.gasPrice,value:e.value};return this.ready.then(function(){return c.resolveProperties(t).then(function(e){return r._resolveNames(e,["to","from"]).then(function(e){var t={transaction:R(e)};return r.perform("estimateGas",t).then(function(e){return a.bigNumberify(e)})})})})},W.prototype.getBlock=function(e,o){var s=this;return this.ready.then(function(){return c.resolveProperties({blockHashOrBlockTag:e}).then(function(e){var t=e.blockHashOrBlockTag;try{var r=u.hexlify(t);if(32===u.hexDataLength(r)){ return y.poll(function(){return s.perform("getBlock",{blockHash:r,includeTransactions:!!o}).then(function(e){return null==e?null==s._emitted["b:"+r]?null:void 0:I(e,o)})},{onceBlock:s}) }}catch(e){}try{var n=-128,i=S(t);return u.isHexString(i)&&(n=parseInt(i.substring(2),16)),y.poll(function(){return s.perform("getBlock",{blockTag:i,includeTransactions:!!o}).then(function(e){return null!=e?I(e,o):n<=s._emitted.block?void 0:null})},{onceBlock:s})}catch(e){}throw new Error("invalid block hash or block tag")})})},W.prototype.getTransaction=function(e){var n=this;return this.ready.then(function(){return c.resolveProperties({transactionHash:e}).then(function(e){var t=e.transactionHash,r={transactionHash:M(t,!0)};return y.poll(function(){return n.perform("getTransaction",r).then(function(e){if(null==e){ return null==n._emitted["t:"+t]?null:void 0; }var r=W.checkTransactionResponse(e);if(null==r.blockNumber){ r.confirmations=0; }else if(null==r.confirmations){ return n._getFastBlockNumber().then(function(e){var t=e-r.blockNumber+1;return t<=0&&(t=1),r.confirmations=t,n._wrapTransaction(r)}); }return n._wrapTransaction(r)})},{onceBlock:n})})})},W.prototype.getTransactionReceipt=function(e){var n=this;return this.ready.then(function(){return c.resolveProperties({transactionHash:e}).then(function(e){var t=e.transactionHash,r={transactionHash:M(t,!0)};return y.poll(function(){return n.perform("getTransactionReceipt",r).then(function(e){if(null==e){ return null==n._emitted["t:"+t]?null:void 0; }if(null!=e.blockHash){var r=function(e){var t=b(C,e);return t.logs.forEach(function(e,t){null==e.transactionLogIndex&&(e.transactionLogIndex=t);}),null!=e.status&&(t.byzantium=!0),t}(e);if(null==r.blockNumber){ r.confirmations=0; }else if(null==r.confirmations){ return n._getFastBlockNumber().then(function(e){var t=e-r.blockNumber+1;return t<=0&&(t=1),r.confirmations=t,r}); }return r}})},{onceBlock:n})})})},W.prototype.getLogs=function(e){var r=this;return this.ready.then(function(){return c.resolveProperties(e).then(function(e){return r._resolveNames(e,["address"]).then(function(e){var t={filter:function(e){return e&&e.blockHash?b(L,e):b(D,e)}(e)};return r.perform("getLogs",t).then(function(e){return _(G)(e)})})})})},W.prototype.getEtherPrice=function(){var e=this;return this.ready.then(function(){return e.perform("getEtherPrice",{}).then(function(e){return e})})},W.prototype._getAddress=function(t){return this.resolveName(t).then(function(e){return null==e&&m.throwError("ENS name not configured",m.UNSUPPORTED_OPERATION,{operation:"resolveName("+JSON.stringify(t)+")"}),e})},W.prototype._resolveNames=function(e,t){var r=[],n=c.shallowCopy(e);return t.forEach(function(t){null!=n[t]&&r.push(this._getAddress(n[t]).then(function(e){n[t]=e;}));},this),Promise.all(r).then(function(){return n})},W.prototype._getResolver=function(n){var i=this;return this.getNetwork().then(function(e){e.ensAddress||m.throwError("network does support ENS",m.UNSUPPORTED_OPERATION,{operation:"ENS",network:e.name});var t="0x0178b8bf"+h.namehash(n).substring(2),r={to:e.ensAddress,data:t};return i.call(r).then(function(e){if(32!==u.hexDataLength(e)){ return null; }var t=s.getAddress(u.hexDataSlice(e,12));return t===l.AddressZero?null:t})})},W.prototype.resolveName=function(e){var t=this;if(e instanceof Promise){ return e.then(function(e){return t.resolveName(e)}); }try{return Promise.resolve(s.getAddress(e))}catch(e){}var r=this,n=h.namehash(e);return this._getResolver(e).then(function(e){if(null==e){ return null; }var t={to:e,data:"0x3b3b57de"+n.substring(2)};return r.call(t)}).then(function(e){if(32!==u.hexDataLength(e)){ return null; }var t=s.getAddress(u.hexDataSlice(e,12));return t===l.AddressZero?null:t})},W.prototype.lookupAddress=function(n){var t=this;if(n instanceof Promise){ return n.then(function(e){return t.lookupAddress(e)}); }var e=(n=s.getAddress(n)).substring(2)+".addr.reverse",r=h.namehash(e),i=this;return this._getResolver(e).then(function(e){if(!e){ return null; }var t={to:e,data:"0x691f3431"+r.substring(2)};return i.call(t)}).then(function(e){if((e=e.substring(2)).length<64){ return null; }if((e=e.substring(64)).length<64){ return null; }var t=a.bigNumberify("0x"+e.substring(0,64)).toNumber();if(2*t>(e=e.substring(64)).length){ return null; }var r=v.toUtf8String("0x"+e.substring(0,2*t));return i.resolveName(r).then(function(e){return e!=n?null:r})})},W.checkTransactionResponse=function(e){return N(e)},W.prototype.doPoll=function(){},W.prototype.perform=function(e,t){return m.throwError(e+" not implemented",m.NOT_IMPLEMENTED,{operation:e}),null},W.prototype._startPending=function(){m.warn("WARNING: this provider does not support pending events");},W.prototype._stopPending=function(){},W.prototype._addEventListener=function(e,t,r){this._events.push({tag:z(e),listener:t,once:r}),"pending"===e&&this._startPending(),this.polling=!0;},W.prototype.on=function(e,t){return this._addEventListener(e,t,!1),this},W.prototype.once=function(e,t){return this._addEventListener(e,t,!0),this},W.prototype.addEventListener=function(e,t){return this.on(e,t)},W.prototype.emit=function(e){
  var arguments$1 = arguments;
  for(var t=this,r=[],n=1;n<arguments.length;n++){ r[n-1]=arguments$1[n]; }var i=!1,o=z(e);return this._events=this._events.filter(function(e){return e.tag!==o||(setTimeout(function(){e.listener.apply(t,r);},0),i=!0,!e.once)}),0===this.listenerCount()&&(this.polling=!1),i},W.prototype.listenerCount=function(e){if(!e){ return this._events.length; }var t=z(e);return this._events.filter(function(e){return e.tag===t}).length},W.prototype.listeners=function(e){var t=z(e);return this._events.filter(function(e){return e.tag===t}).map(function(e){return e.listener})},W.prototype.removeAllListeners=function(e){if(null==e){ this._events=[],this._stopPending(); }else{var t=z(e);this._events=this._events.filter(function(e){return e.tag!==t}),"pending"===e&&this._stopPending();}return 0===this._events.length&&(this.polling=!1),this},W.prototype.removeListener=function(e,t){var r=!1,n=z(e);return this._events=this._events.filter(function(e){return e.tag!==n||e.listener!=t||!!r||!(r=!0)}),"pending"===e&&0===this.listenerCount("pending")&&this._stopPending(),0===this.listenerCount()&&(this.polling=!1),this},W);function W(e){var t=K.call(this)||this;if(m.checkNew(t,g.Provider),e instanceof Promise){ c.defineReadOnly(t,"ready",e.then(function(e){return c.defineReadOnly(t,"_network",e),e})),t.ready.catch(function(e){}); }else{var r=f.getNetwork(null==e?"homestead":e);r?(c.defineReadOnly(t,"_network",r),c.defineReadOnly(t,"ready",Promise.resolve(t._network))):m.throwError("invalid network",m.INVALID_ARGUMENT,{arg:"network",value:e});}return t._lastBlockNumber=-2,t._balances={},t._events=[],t._pollingInterval=4e3,t._emitted={block:-2},t._fastQueryDate=0,t}r.BaseProvider=q,c.defineReadOnly(g.Provider,"inherits",c.inheritable(g.Provider));},{"../constants":3,"../errors":5,"../utils/address":59,"../utils/bignumber":62,"../utils/bytes":63,"../utils/hash":64,"../utils/networks":71,"../utils/properties":73,"../utils/rlp":75,"../utils/transaction":82,"../utils/utf8":84,"../utils/web":85,"./abstract-provider":49}],51:[function(e,t,r){var n,i=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t;}||function(e,t){for(var r in t){ t.hasOwnProperty(r)&&(e[r]=t[r]); }},function(e,t){function r(){this.constructor=e;}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r);}),o=this&&this.__importStar||function(e){if(e&&e.__esModule){ return e; }var t={};if(null!=e){ for(var r in e){ Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]); } }return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var s=e("./base-provider"),a=e("../utils/bytes"),u=e("../utils/properties"),l=e("../utils/web"),h=o(e("../errors"));function f(e){var t=[];for(var r in e){ if(null!=e[r]){var n=a.hexlify(e[r]);!{gasLimit:!0,gasPrice:!0,nonce:!0,value:!0}[r]||(n=a.hexStripZeros(n)),t.push(r+"="+n);} }return t.join("&")}function c(e){if(0==e.status&&("No records found"===e.message||"No transactions found"===e.message)){ return e.result; }if(1==e.status&&"OK"==e.message){ return e.result; }var t=new Error("invalid response");throw t.result=JSON.stringify(e),t}function d(e){if("2.0"!=e.jsonrpc){ throw(t=new Error("invalid response")).result=JSON.stringify(e),t; }if(e.error){var t=new Error(e.error.message||"unknown error");throw e.error.code&&(t.code=e.error.code),e.error.data&&(t.data=e.error.data),t}return e.result}function p(e){if("pending"===e){ throw new Error("pending not supported"); }return "latest"===e?e:parseInt(e.substring(2),16)}var v,y=(v=s.BaseProvider,i(m,v),m.prototype.perform=function(e,t){var r=this,n=this.baseUrl,i="";function o(t,e){return l.fetchJson(t,null,e||d).then(function(e){return r.emit("debug",{action:"perform",request:t,response:e,provider:r}),e})}switch(this.apiKey&&(i+="&apikey="+this.apiKey),e){case"getBlockNumber":return o(n+="/api?module=proxy&action=eth_blockNumber"+i);case"getGasPrice":return o(n+="/api?module=proxy&action=eth_gasPrice"+i);case"getBalance":return n+="/api?module=account&action=balance&address="+t.address,o(n+="&tag="+t.blockTag+i,c);case"getTransactionCount":return n+="/api?module=proxy&action=eth_getTransactionCount&address="+t.address,o(n+="&tag="+t.blockTag+i);case"getCode":return n+="/api?module=proxy&action=eth_getCode&address="+t.address,o(n+="&tag="+t.blockTag+i,d);case"getStorageAt":return n+="/api?module=proxy&action=eth_getStorageAt&address="+t.address,n+="&position="+t.position,o(n+="&tag="+t.blockTag+i,d);case"sendTransaction":return n+="/api?module=proxy&action=eth_sendRawTransaction&hex="+t.signedTransaction,o(n+=i).catch(function(e){throw e.responseText&&(0<=e.responseText.toLowerCase().indexOf("insufficient funds")&&h.throwError("insufficient funds",h.INSUFFICIENT_FUNDS,{}),0<=e.responseText.indexOf("same hash was already imported")&&h.throwError("nonce has already been used",h.NONCE_EXPIRED,{}),0<=e.responseText.indexOf("another transaction with same nonce")&&h.throwError("replacement fee too low",h.REPLACEMENT_UNDERPRICED,{})),e});case"getBlock":if(t.blockTag){ return n+="/api?module=proxy&action=eth_getBlockByNumber&tag="+t.blockTag,t.includeTransactions?n+="&boolean=true":n+="&boolean=false",o(n+=i); }throw new Error("getBlock by blockHash not implmeneted");case"getTransaction":return n+="/api?module=proxy&action=eth_getTransactionByHash&txhash="+t.transactionHash,o(n+=i);case"getTransactionReceipt":return n+="/api?module=proxy&action=eth_getTransactionReceipt&txhash="+t.transactionHash,o(n+=i);case"call":if(n+="/api?module=proxy&action=eth_call"+(s=(s=f(t.transaction))&&"&"+s),"latest"!==t.blockTag){ throw new Error("EtherscanProvider does not support blockTag for call"); }return o(n+=i);case"estimateGas":var s;return n+="/api?module=proxy&action=eth_estimateGas&"+(s=(s=f(t.transaction))&&"&"+s),o(n+=i);case"getLogs":n+="/api?module=logs&action=getLogs";try{if(t.filter.fromBlock&&(n+="&fromBlock="+p(t.filter.fromBlock)),t.filter.toBlock&&(n+="&toBlock="+p(t.filter.toBlock)),t.filter.blockHash){ try{h.throwError("Etherscan does not support blockHash filters",h.UNSUPPORTED_OPERATION,{operation:"getLogs(blockHash)"});}catch(e){return Promise.reject(e)} }if(t.filter.address&&(n+="&address="+t.filter.address),t.filter.topics&&0<t.filter.topics.length){if(1<t.filter.topics.length){ throw new Error("unsupported topic format"); }var a=t.filter.topics[0];if("string"!=typeof a||66!==a.length){ throw new Error("unsupported topic0 format"); }n+="&topic0="+a;}}catch(e){return Promise.reject(e)}var u=this;return o(n+=i,c).then(function(e){var r={},n=Promise.resolve();return e.forEach(function(t){n=n.then(function(){return null!=t.blockHash?null:(t.blockHash=r[t.transactionHash],null==t.blockHash?u.getTransaction(t.transactionHash).then(function(e){return r[t.transactionHash]=e.blockHash,t.blockHash=e.blockHash,null}):null)});}),n.then(function(){return e})});case"getEtherPrice":return "homestead"!==this.network.name?Promise.resolve(0):(n+="/api?module=stats&action=ethprice",o(n+=i,c).then(function(e){return parseFloat(e.ethusd)}))}return v.prototype.perform.call(this,e,t)},m.prototype.getHistory=function(e,t,r){var n=this,i=this.baseUrl,o="";return this.apiKey&&(o+="&apikey="+this.apiKey),null==t&&(t=0),null==r&&(r=99999999),this.resolveName(e).then(function(e){return i+="/api?module=account&action=txlist&address="+e,i+="&startblock="+t,i+="&endblock="+r,i+="&sort=asc"+o,l.fetchJson(i,null,c).then(function(e){n.emit("debug",{action:"getHistory",request:i,response:e,provider:n});var r=[];return e.forEach(function(t){["contractAddress","to"].forEach(function(e){""==t[e]&&delete t[e];}),null==t.creates&&null!=t.contractAddress&&(t.creates=t.contractAddress);var e=s.BaseProvider.checkTransactionResponse(t);t.timeStamp&&(e.timestamp=parseInt(t.timeStamp)),r.push(e);}),r})})},m);function m(e,t){var r=v.call(this,e)||this;h.checkNew(r,m);var n="invalid";r.network&&(n=r.network.name);var i=null;switch(n){case"homestead":i="https://api.etherscan.io";break;case"ropsten":i="https://api-ropsten.etherscan.io";break;case"rinkeby":i="https://api-rinkeby.etherscan.io";break;case"kovan":i="https://api-kovan.etherscan.io";break;case"goerli":i="https://api-goerli.etherscan.io";break;default:throw new Error("unsupported network")}return u.defineReadOnly(r,"baseUrl",i),u.defineReadOnly(r,"apiKey",t),r}r.EtherscanProvider=y;},{"../errors":5,"../utils/bytes":63,"../utils/properties":73,"../utils/web":85,"./base-provider":50}],52:[function(e,t,r){var n,i=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t;}||function(e,t){for(var r in t){ t.hasOwnProperty(r)&&(e[r]=t[r]); }},function(e,t){function r(){this.constructor=e;}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r);}),o=this&&this.__importStar||function(e){if(e&&e.__esModule){ return e; }var t={};if(null!=e){ for(var r in e){ Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]); } }return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var s=e("./base-provider"),a=o(e("../errors"));function u(t){var r=!0,n=null;return t.forEach(function(e){null!=e?null!=n?n.name===e.name&&n.chainId===e.chainId&&(n.ensAddress===e.ensAddress||null==n.ensAddress&&null==e.ensAddress)||a.throwError("provider mismatch",a.INVALID_ARGUMENT,{arg:"networks",value:t}):n=e:r=!1;}),r}var l,h=(l=s.BaseProvider,i(f,l),Object.defineProperty(f.prototype,"providers",{get:function(){return this._providers.slice(0)},enumerable:!0,configurable:!0}),f.prototype.perform=function(i,o){var s=this.providers;return new Promise(function(r,e){var n=null;!function t(){s.length?s.shift().perform(i,o).then(function(e){return r(e)}).catch(function(e){n=n||e,setTimeout(t,0);}):e(n);}();})},f);function f(e){var t=this;if(0===e.length){ throw new Error("no providers"); }if(u(e.map(function(e){return e.network}))){ t=l.call(this,e[0].network)||this; }else{var r=Promise.all(e.map(function(e){return e.getNetwork()})).then(function(e){return u(e)||a.throwError("getNetwork returned null",a.UNKNOWN_ERROR,{}),e[0]});t=l.call(this,r)||this;}return a.checkNew(t,f),t._providers=e.slice(0),t}r.FallbackProvider=h;},{"../errors":5,"./base-provider":50}],53:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0});var n=e("./abstract-provider");r.Provider=n.Provider;var i=e("./base-provider");r.BaseProvider=i.BaseProvider;var o=e("./etherscan-provider");r.EtherscanProvider=o.EtherscanProvider;var s=e("./fallback-provider");r.FallbackProvider=s.FallbackProvider;var a=e("./ipc-provider");r.IpcProvider=a.IpcProvider;var u=e("./infura-provider");r.InfuraProvider=u.InfuraProvider;var l=e("./json-rpc-provider");r.JsonRpcProvider=l.JsonRpcProvider,r.JsonRpcSigner=l.JsonRpcSigner;var h=e("./web3-provider");r.Web3Provider=h.Web3Provider;},{"./abstract-provider":49,"./base-provider":50,"./etherscan-provider":51,"./fallback-provider":52,"./infura-provider":54,"./ipc-provider":55,"./json-rpc-provider":56,"./web3-provider":57}],54:[function(e,t,r){var n,i=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t;}||function(e,t){for(var r in t){ t.hasOwnProperty(r)&&(e[r]=t[r]); }},function(e,t){function r(){this.constructor=e;}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r);}),o=this&&this.__importStar||function(e){if(e&&e.__esModule){ return e; }var t={};if(null!=e){ for(var r in e){ Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]); } }return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var s,a=e("./json-rpc-provider"),u=e("../utils/bytes"),l=e("../utils/networks"),h=e("../utils/properties"),f=o(e("../errors")),c=(s=a.JsonRpcProvider,i(d,s),d.prototype._startPending=function(){f.warn("WARNING: INFURA does not support pending filters");},d.prototype.getSigner=function(e){return f.throwError("INFURA does not support signing",f.UNSUPPORTED_OPERATION,{operation:"getSigner"})},d.prototype.listAccounts=function(){return Promise.resolve([])},d);function d(e,t){var r=this,n=l.getNetwork(null==e?"homestead":e);null==t&&(t="7d0d81d0919f4f05b9ab6634be01ee73");var i=null;switch(n.name){case"homestead":i="mainnet.infura.io";break;case"ropsten":i="ropsten.infura.io";break;case"rinkeby":i="rinkeby.infura.io";break;case"goerli":i="goerli.infura.io";break;case"kovan":i="kovan.infura.io";break;default:f.throwError("unsupported network",f.INVALID_ARGUMENT,{argument:"network",value:e});}return u.isHexString("0x"+t,16)?(r=s.call(this,"https://"+i+"/v3/"+t,n)||this,h.defineReadOnly(r,"apiAccessToken",null),h.defineReadOnly(r,"projectId",t)):(f.warn("The legacy INFURA apiAccesToken API is deprecated; please upgrade to a Project ID instead (see INFURA dshboard; https://infura.io)"),r=s.call(this,"https://"+i+"/"+t,n)||this,h.defineReadOnly(r,"apiAccessToken",t),h.defineReadOnly(r,"projectId",null)),f.checkNew(r,d),r}r.InfuraProvider=c;},{"../errors":5,"../utils/bytes":63,"../utils/networks":71,"../utils/properties":73,"./json-rpc-provider":56}],55:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0});},{}],56:[function(e,t,r){var n,i=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t;}||function(e,t){for(var r in t){ t.hasOwnProperty(r)&&(e[r]=t[r]); }},function(e,t){function r(){this.constructor=e;}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r);}),o=this&&this.__importStar||function(e){if(e&&e.__esModule){ return e; }var t={};if(null!=e){ for(var r in e){ Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]); } }return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var s=e("./base-provider"),a=e("../abstract-signer"),u=o(e("../errors")),l=e("../utils/address"),h=e("../utils/bytes"),f=e("../utils/networks"),c=e("../utils/properties"),d=e("../utils/utf8"),p=e("../utils/web");function v(e){if(e.error){var t=new Error(e.error.message);throw t.code=e.error.code,t.data=e.error.data,t}return e.result}function y(e){return e?e.toLowerCase():e}var m,g={},b=42,w=(m=a.Signer,i(_,m),_.prototype.getAddress=function(){var t=this;return this._address?Promise.resolve(this._address):this.provider.send("eth_accounts",[]).then(function(e){return e.length<=t._index&&u.throwError("unknown account #"+t._index,u.UNSUPPORTED_OPERATION,{operation:"getAddress"}),t._address=l.getAddress(e[t._index]),t._address})},_.prototype.getBalance=function(e){return this.provider.getBalance(this.getAddress(),e)},_.prototype.getTransactionCount=function(e){return this.provider.getTransactionCount(this.getAddress(),e)},_.prototype.sendUncheckedTransaction=function(e){var n=this;e=c.shallowCopy(e);var t=this.getAddress().then(function(e){return e=e&&e.toLowerCase()});if(null==e.gasLimit){var r=c.shallowCopy(e);r.from=t,e.gasLimit=this.provider.estimateGas(r);}return Promise.all([c.resolveProperties(e),t]).then(function(e){var t=e[0],r=E.hexlifyTransaction(t);return r.from=e[1],n.provider.send("eth_sendTransaction",[r]).then(function(e){return e},function(e){throw e.responseText&&(0<=e.responseText.indexOf("insufficient funds")&&u.throwError("insufficient funds",u.INSUFFICIENT_FUNDS,{transaction:t}),0<=e.responseText.indexOf("nonce too low")&&u.throwError("nonce has already been used",u.NONCE_EXPIRED,{transaction:t}),0<=e.responseText.indexOf("replacement transaction underpriced")&&u.throwError("replacement fee too low",u.REPLACEMENT_UNDERPRICED,{transaction:t})),e})})},_.prototype.sendTransaction=function(e){var r=this;return this.sendUncheckedTransaction(e).then(function(t){return p.poll(function(){return r.provider.getTransaction(t).then(function(e){if(null!==e){ return r.provider._wrapTransaction(e,t) }})},{fastRetry:250,onceBlock:r.provider}).catch(function(e){throw e.transactionHash=t,e})})},_.prototype.signMessage=function(e){var t=this,r="string"==typeof e?d.toUtf8Bytes(e):e;return this.getAddress().then(function(e){return t.provider.send("eth_sign",[e.toLowerCase(),h.hexlify(r)])})},_.prototype.unlock=function(t){var r=this.provider;return this.getAddress().then(function(e){return r.send("personal_unlockAccount",[e.toLowerCase(),t,null])})},_);function _(e,t,r){var n=m.call(this)||this;if(u.checkNew(n,_),e!==g){ throw new Error("do not call the JsonRpcSigner constructor directly; use provider.getSigner"); }return c.defineReadOnly(n,"provider",t),r?"string"==typeof r?c.defineReadOnly(n,"_address",l.getAddress(r)):"number"==typeof r?c.defineReadOnly(n,"_index",r):u.throwError("invalid address or index",u.INVALID_ARGUMENT,{argument:"addressOrIndex",value:r}):c.defineReadOnly(n,"_index",0),n}r.JsonRpcSigner=w;var M,A={chainId:!0,data:!0,gasLimit:!0,gasPrice:!0,nonce:!0,to:!0,value:!0},E=(M=s.BaseProvider,i(S,M),S.prototype.getSigner=function(e){return new w(g,this,e)},S.prototype.listAccounts=function(){return this.send("eth_accounts",[]).then(function(e){return e.map(function(e){return l.getAddress(e)})})},S.prototype.send=function(e,t){var r=this,n={method:e,params:t,id:b++,jsonrpc:"2.0"};return p.fetchJson(this.connection,JSON.stringify(n),v).then(function(e){return r.emit("debug",{action:"send",request:n,response:e,provider:r}),e})},S.prototype.perform=function(e,t){switch(e){case"getBlockNumber":return this.send("eth_blockNumber",[]);case"getGasPrice":return this.send("eth_gasPrice",[]);case"getBalance":return this.send("eth_getBalance",[y(t.address),t.blockTag]);case"getTransactionCount":return this.send("eth_getTransactionCount",[y(t.address),t.blockTag]);case"getCode":return this.send("eth_getCode",[y(t.address),t.blockTag]);case"getStorageAt":return this.send("eth_getStorageAt",[y(t.address),t.position,t.blockTag]);case"sendTransaction":return this.send("eth_sendRawTransaction",[t.signedTransaction]).catch(function(e){throw e.responseText&&(0<e.responseText.indexOf("insufficient funds")&&u.throwError("insufficient funds",u.INSUFFICIENT_FUNDS,{}),0<e.responseText.indexOf("nonce too low")&&u.throwError("nonce has already been used",u.NONCE_EXPIRED,{}),0<e.responseText.indexOf("replacement transaction underpriced")&&u.throwError("replacement fee too low",u.REPLACEMENT_UNDERPRICED,{})),e});case"getBlock":return t.blockTag?this.send("eth_getBlockByNumber",[t.blockTag,!!t.includeTransactions]):t.blockHash?this.send("eth_getBlockByHash",[t.blockHash,!!t.includeTransactions]):Promise.reject(new Error("invalid block tag or block hash"));case"getTransaction":return this.send("eth_getTransactionByHash",[t.transactionHash]);case"getTransactionReceipt":return this.send("eth_getTransactionReceipt",[t.transactionHash]);case"call":return this.send("eth_call",[S.hexlifyTransaction(t.transaction,{from:!0}),t.blockTag]);case"estimateGas":return this.send("eth_estimateGas",[S.hexlifyTransaction(t.transaction,{from:!0})]);case"getLogs":return t.filter&&null!=t.filter.address&&(t.filter.address=y(t.filter.address)),this.send("eth_getLogs",[t.filter])}return u.throwError(e+" not implemented",u.NOT_IMPLEMENTED,{operation:e}),null},S.prototype._startPending=function(){if(null==this._pendingFilter){var r=this,n=this.send("eth_newPendingTransactionFilter",[]);(this._pendingFilter=n).then(function(t){return function e(){r.send("eth_getFilterChanges",[t]).then(function(e){if(r._pendingFilter!=n){ return null; }var t=Promise.resolve();return e.forEach(function(e){r._emitted["t:"+e.toLowerCase()]="pending",t=t.then(function(){return r.getTransaction(e).then(function(e){return r.emit("pending",e),null})});}),t.then(function(){return function(t){return new Promise(function(e){setTimeout(function(){e();},t);})}(1e3)})}).then(function(){if(r._pendingFilter==n){ return setTimeout(function(){e();},0),null; }r.send("eth_uninstallFilter",[t]);}).catch(function(e){});}(),t}).catch(function(e){});}},S.prototype._stopPending=function(){this._pendingFilter=null;},S.hexlifyTransaction=function(r,e){var t=c.shallowCopy(A);if(e){ for(var n in e){ e[n]&&(t[n]=!0); } }c.checkProperties(r,t);var i={};return ["gasLimit","gasPrice","nonce","value"].forEach(function(e){if(null!=r[e]){var t=h.hexStripZeros(h.hexlify(r[e]));"gasLimit"===e&&(e="gas"),i[e]=t;}}),["from","to","data"].forEach(function(e){null!=r[e]&&(i[e]=h.hexlify(r[e]));}),i},S);function S(e,t){var n=this;if("string"==typeof e&&null===t&&f.getNetwork(e)&&(t=e,e=null),t){ n=M.call(this,t)||this; }else{var r=new Promise(function(t,r){setTimeout(function(){n.send("net_version",[]).then(function(e){return t(f.getNetwork(parseInt(e)))}).catch(function(e){r(e);});});});n=M.call(this,r)||this;}return u.checkNew(n,S),e=e||"http://localhost:8545",n.connection="string"==typeof e?{url:e}:e,n}r.JsonRpcProvider=E;},{"../abstract-signer":2,"../errors":5,"../utils/address":59,"../utils/bytes":63,"../utils/networks":71,"../utils/properties":73,"../utils/utf8":84,"../utils/web":85,"./base-provider":50}],57:[function(e,t,r){var n,i=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t;}||function(e,t){for(var r in t){ t.hasOwnProperty(r)&&(e[r]=t[r]); }},function(e,t){function r(){this.constructor=e;}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r);}),o=this&&this.__importStar||function(e){if(e&&e.__esModule){ return e; }var t={};if(null!=e){ for(var r in e){ Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]); } }return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var s,a=e("./json-rpc-provider"),u=e("../utils/properties"),l=o(e("../errors")),h=42,f=(s=a.JsonRpcProvider,i(c,s),c.prototype.send=function(t,r){var o=this;return "eth_sign"==t&&this._web3Provider.isMetaMask&&(t="personal_sign",r=[r[1],r[0]]),new Promise(function(n,i){var e={method:t,params:r,id:h++,jsonrpc:"2.0"};o._sendAsync(e,function(e,t){if(e){ i(e); }else{if(t.error){var r=new Error(t.error.message);return r.code=t.error.code,r.data=t.error.data,void i(r)}n(t.result);}});})},c);function c(e,t){var r=s.call(this,e.host||e.path||"",t)||this;return l.checkNew(r,c),e&&(e.sendAsync?r._sendAsync=e.sendAsync.bind(e):e.send&&(r._sendAsync=e.send.bind(e))),e&&r._sendAsync||l.throwError("invalid web3Provider",l.INVALID_ARGUMENT,{arg:"web3Provider",value:e}),u.defineReadOnly(r,"_web3Provider",e),r}r.Web3Provider=f;},{"../errors":5,"../utils/properties":73,"./json-rpc-provider":56}],58:[function(e,t,r){var n,i=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t;}||function(e,t){for(var r in t){ t.hasOwnProperty(r)&&(e[r]=t[r]); }},function(e,t){function r(){this.constructor=e;}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r);}),o=this&&this.__importStar||function(e){if(e&&e.__esModule){ return e; }var t={};if(null!=e){ for(var r in e){ Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]); } }return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var s=e("../constants"),l=o(e("../errors")),a=e("./address"),u=e("./bignumber"),h=e("./bytes"),f=e("./utf8"),c=e("./properties"),d=new RegExp(/^bytes([0-9]*)$/),p=new RegExp(/^(u?int)([0-9]*)$/),v=new RegExp(/^(.*)\[([0-9]*)\]$/);r.defaultCoerceFunc=function(e,t){var r=e.match(p);return r&&parseInt(r[2])<=48?t.toNumber():t};var y=new RegExp("^([^)(]*)\\((.*)\\)([^)(]*)$"),m=new RegExp("^[A-Za-z_][A-Za-z0-9_]*$");function g(e){return e.match(/^uint($|[^1-9])/)?e="uint256"+e.substring(4):e.match(/^int($|[^1-9])/)&&(e="int256"+e.substring(3)),e}function b(e,t){var r=e;function n(e){throw new Error('unexpected character "'+r[e]+'" at position '+e+' in "'+r+'"')}e=e.replace(/\s/g," ");for(var i={type:"",name:"",state:{allowType:!0}},o=i,s=0;s<e.length;s++){var a=e[s];switch(a){case"(":o.state.allowParams||n(s),o.state.allowType=!1,o.type=g(o.type),o.components=[{type:"",name:"",parent:o,state:{allowType:!0}}],o=o.components[0];break;case")":delete o.state,t&&"indexed"===o.name&&(o.indexed=!0,o.name=""),o.type=g(o.type);var u=o;(o=o.parent)||n(s),delete u.parent,o.state.allowParams=!1,o.state.allowName=!0,o.state.allowArray=!0;break;case",":delete o.state,t&&"indexed"===o.name&&(o.indexed=!0,o.name=""),o.type=g(o.type);var l={type:"",name:"",parent:o.parent,state:{allowType:!0}};o.parent.components.push(l),delete o.parent,o=l;break;case" ":o.state.allowType&&""!==o.type&&(o.type=g(o.type),delete o.state.allowType,o.state.allowName=!0,o.state.allowParams=!0),o.state.allowName&&""!==o.name&&(t&&"indexed"===o.name?(o.indexed=!0,o.name=""):o.state.allowName=!1);break;case"[":o.state.allowArray||n(s),o.type+=a,o.state.allowArray=!1,o.state.allowName=!1,o.state.readArray=!0;break;case"]":o.state.readArray||n(s),o.type+=a,o.state.readArray=!1,o.state.allowArray=!0,o.state.allowName=!0;break;default:o.state.allowType?(o.type+=a,o.state.allowParams=!0,o.state.allowArray=!0):o.state.allowName?(o.name+=a,delete o.state.allowArray):o.state.readArray?o.type+=a:n(s);}}if(o.parent){ throw new Error("unexpected eof"); }return delete i.state,t&&"indexed"===o.name&&(o.indexed=!0,o.name=""),i.type=g(i.type),i}function w(e){return se(r.defaultCoerceFunc,e).type}r.parseParamType=function(e){return b(e,!0)},r.formatParamType=w,r.formatSignature=function(e){return e.name+"("+e.inputs.map(function(e){return w(e)}).join(",")+")"},r.parseSignature=function(e){if("string"==typeof e){ return "event "===(e=(e=(e=e.replace(/\s/g," ")).replace(/\(/g," (").replace(/\)/g,") ").replace(/\s+/g," ")).trim()).substring(0,6)?function(e){var t={anonymous:!1,inputs:[],name:"",type:"event"},r=e.match(y);if(!r){ throw new Error("invalid event: "+e); }if(t.name=r[1].trim(),ie(r[2]).forEach(function(e){(e=b(e,!0)).indexed=!!e.indexed,t.inputs.push(e);}),r[3].split(" ").forEach(function(e){switch(e){case"anonymous":t.anonymous=!0;break;case"":break;default:l.info("unknown modifier: "+e);}}),t.name&&!t.name.match(m)){ throw new Error('invalid identifier: "'+t.name+'"'); }return t}(e.substring(6).trim()):("function "===e.substring(0,9)&&(e=e.substring(9)),function(e){var t={constant:!1,gas:null,inputs:[],name:"",outputs:[],payable:!1,stateMutability:null,type:"function"},r=e.split("@");if(1!==r.length){if(2<r.length){ throw new Error("invalid signature"); }if(!r[1].match(/^[0-9]+$/)){ throw new Error("invalid signature gas"); }t.gas=u.bigNumberify(r[1]),e=r[0];}var n=(r=e.split(" returns "))[0].match(y);if(!n){ throw new Error("invalid signature"); }if(t.name=n[1].trim(),!t.name.match(m)){ throw new Error('invalid identifier: "'+n[1]+'"'); }if(ie(n[2]).forEach(function(e){t.inputs.push(b(e));}),n[3].split(" ").forEach(function(e){switch(e){case"constant":t.constant=!0;break;case"payable":t.payable=!0,t.stateMutability="payable";break;case"pure":t.constant=!0,t.stateMutability="pure";break;case"view":t.constant=!0,t.stateMutability="view";break;case"external":case"public":case"":break;default:l.info("unknown modifier: "+e);}}),1<r.length){var i=r[1].match(y);if(""!=i[1].trim()||""!=i[3].trim()){ throw new Error("unexpected tokens"); }ie(i[2]).forEach(function(e){t.outputs.push(b(e));});}if("constructor"===t.name){if(t.type="constructor",t.outputs.length){ throw new Error("constructor may not have outputs"); }delete t.name,delete t.outputs;}return t}(e.trim())); }throw new Error("unknown signature")};function _(e,t,r,n,i){this.coerceFunc=e,this.name=t,this.type=r,this.localName=n,this.dynamic=i;}var M,A=(i(E,M=_),E.prototype.encode=function(e){return this.coder.encode(e)},E.prototype.decode=function(e,t){return this.coder.decode(e,t)},E);function E(e){var t=M.call(this,e.coerceFunc,e.name,e.type,void 0,e.dynamic)||this;return c.defineReadOnly(t,"coder",e),t}var S,k=(i(N,S=_),N.prototype.encode=function(e){return h.arrayify([])},N.prototype.decode=function(e,t){if(t>e.length){ throw new Error("invalid null"); }return {consumed:0,value:this.coerceFunc("null",void 0)}},N);function N(e,t){return S.call(this,e,"null","",t,!1)||this}var P,x=(i(I,P=_),I.prototype.encode=function(t){try{var e=u.bigNumberify(t);if(this.signed){var r=s.MaxUint256.maskn(8*this.size-1);if(e.gt(r)){ throw new Error("out-of-bounds"); }if(r=r.add(s.One).mul(s.NegativeOne),e.lt(r)){ throw new Error("out-of-bounds") }}else if(e.lt(s.Zero)||e.gt(s.MaxUint256.maskn(8*this.size))){ throw new Error("out-of-bounds"); }return e=e.toTwos(8*this.size).maskn(8*this.size),this.signed&&(e=e.fromTwos(8*this.size).toTwos(256)),h.padZeros(h.arrayify(e),32)}catch(e){l.throwError("invalid number value",l.INVALID_ARGUMENT,{arg:this.localName,coderType:this.name,value:t});}return null},I.prototype.decode=function(e,t){e.length<t+32&&l.throwError("insufficient data for "+this.name+" type",l.INVALID_ARGUMENT,{arg:this.localName,coderType:this.name,value:h.hexlify(e.slice(t,t+32))});var r=32-this.size,n=u.bigNumberify(e.slice(t+r,t+32));return n=this.signed?n.fromTwos(8*this.size):n.maskn(8*this.size),{consumed:32,value:this.coerceFunc(this.name,n)}},I);function I(e,t,r,n){var i=this,o=(r?"int":"uint")+8*t;return (i=P.call(this,e,o,o,n,!1)||this).size=t,i.signed=r,i}var T,R=new x(function(e,t){return t},32,!1,"none"),O=(i(C,T=_),C.prototype.encode=function(e){return R.encode(e?1:0)},C.prototype.decode=function(e,t){try{var r=R.decode(e,t);}catch(e){throw"insufficient data for uint256 type"===e.reason&&l.throwError("insufficient data for boolean type",l.INVALID_ARGUMENT,{arg:this.localName,coderType:"boolean",value:e.value}),e}return {consumed:r.consumed,value:this.coerceFunc("bool",!r.value.isZero())}},C);function C(e,t){return T.call(this,e,"bool","bool",t,!1)||this}var B,D=(i(L,B=_),L.prototype.encode=function(t){var e=new Uint8Array(32);try{var r=h.arrayify(t);if(r.length!==this.length){ throw new Error("incorrect data length"); }e.set(r);}catch(e){l.throwError("invalid "+this.name+" value",l.INVALID_ARGUMENT,{arg:this.localName,coderType:this.name,value:e.value||t});}return e},L.prototype.decode=function(e,t){return e.length<t+32&&l.throwError("insufficient data for "+this.name+" type",l.INVALID_ARGUMENT,{arg:this.localName,coderType:this.name,value:h.hexlify(e.slice(t,t+32))}),{consumed:32,value:this.coerceFunc(this.name,h.hexlify(e.slice(t,t+this.length)))}},L);function L(e,t,r){var n=this,i="bytes"+t;return (n=B.call(this,e,i,i,r,!1)||this).length=t,n}var U,F=(i(j,U=_),j.prototype.encode=function(t){var e=new Uint8Array(32);try{e.set(h.arrayify(a.getAddress(t)),12);}catch(e){l.throwError("invalid address",l.INVALID_ARGUMENT,{arg:this.localName,coderType:"address",value:t});}return e},j.prototype.decode=function(e,t){return e.length<t+32&&l.throwError("insufficuent data for address type",l.INVALID_ARGUMENT,{arg:this.localName,coderType:"address",value:h.hexlify(e.slice(t,t+32))}),{consumed:32,value:this.coerceFunc("address",a.getAddress(h.hexlify(e.slice(t+12,t+32))))}},j);function j(e,t){return U.call(this,e,"address","address",t,!1)||this}function G(e){var t=32*Math.ceil(e.length/32),r=new Uint8Array(t-e.length);return h.concat([R.encode(e.length),e,r])}function H(e,t,r){e.length<t+32&&l.throwError("insufficient data for dynamicBytes length",l.INVALID_ARGUMENT,{arg:r,coderType:"dynamicBytes",value:h.hexlify(e.slice(t,t+32))});var n=R.decode(e,t).value;try{n=n.toNumber();}catch(e){l.throwError("dynamic bytes count too large",l.INVALID_ARGUMENT,{arg:r,coderType:"dynamicBytes",value:n.toString()});}return e.length<t+32+n&&l.throwError("insufficient data for dynamicBytes type",l.INVALID_ARGUMENT,{arg:r,coderType:"dynamicBytes",value:h.hexlify(e.slice(t,t+32+n))}),{consumed:32+32*Math.ceil(n/32),value:e.slice(t+32,t+32+n)}}var z,V=(i(K,z=_),K.prototype.encode=function(e){try{return G(h.arrayify(e))}catch(e){l.throwError("invalid bytes value",l.INVALID_ARGUMENT,{arg:this.localName,coderType:"bytes",value:e.value});}return null},K.prototype.decode=function(e,t){var r=H(e,t,this.localName);return r.value=this.coerceFunc("bytes",h.hexlify(r.value)),r},K);function K(e,t){return z.call(this,e,"bytes","bytes",t,!0)||this}var q,W=(i(Z,q=_),Z.prototype.encode=function(e){return "string"!=typeof e&&l.throwError("invalid string value",l.INVALID_ARGUMENT,{arg:this.localName,coderType:"string",value:e}),G(f.toUtf8Bytes(e))},Z.prototype.decode=function(e,t){var r=H(e,t,this.localName);return r.value=this.coerceFunc("string",f.toUtf8String(r.value)),r},Z);function Z(e,t){return q.call(this,e,"string","string",t,!0)||this}function J(e){return 32*Math.ceil(e/32)}function X(e,r){if(Array.isArray(r));else if(r&&"object"==typeof r){var t=[];e.forEach(function(e){t.push(r[e.localName]);}),r=t;}else { l.throwError("invalid tuple value",l.INVALID_ARGUMENT,{coderType:"tuple",value:r}); }e.length!==r.length&&l.throwError("types/value length mismatch",l.INVALID_ARGUMENT,{coderType:"tuple",value:r});var n=[];e.forEach(function(e,t){n.push({dynamic:e.dynamic,value:e.encode(r[t])});});var i=0,o=0;n.forEach(function(e){e.dynamic?(i+=32,o+=J(e.value.length)):i+=J(e.value.length);});var s=0,a=i,u=new Uint8Array(i+o);return n.forEach(function(e){e.dynamic?(u.set(R.encode(a),s),s+=32,u.set(e.value,a),a+=J(e.value.length)):(u.set(e.value,s),s+=J(e.value.length));}),u}function $(e,n,i){var o=i,s=0,a=[];return e.forEach(function(e){if(e.dynamic){var t=R.decode(n,i);(r=e.decode(n,o+t.value.toNumber())).consumed=t.consumed;}else { var r=e.decode(n,i); }null!=r.value&&a.push(r.value),i+=r.consumed,s+=r.consumed;}),e.forEach(function(e,t){var r=e.localName;r&&("length"===r&&(r="_length"),null==a[r]&&(a[r]=a[t]));}),{value:a,consumed:s}}var Q,Y=(i(ee,Q=_),ee.prototype.encode=function(e){Array.isArray(e)||l.throwError("expected array value",l.INVALID_ARGUMENT,{arg:this.localName,coderType:"array",value:e});var t=this.length,r=new Uint8Array(0);-1===t&&(t=e.length,r=R.encode(t)),l.checkArgumentCount(t,e.length," in coder array"+(this.localName?" "+this.localName:""));for(var n=[],i=0;i<e.length;i++){ n.push(this.coder); }return h.concat([r,X(n,e)])},ee.prototype.decode=function(e,t){var r=0,n=this.length;if(-1===n){try{var i=R.decode(e,t);}catch(e){l.throwError("insufficient data for dynamic array length",l.INVALID_ARGUMENT,{arg:this.localName,coderType:"array",value:e.value});}try{n=i.value.toNumber();}catch(e){l.throwError("array count too large",l.INVALID_ARGUMENT,{arg:this.localName,coderType:"array",value:i.value.toString()});}r+=i.consumed,t+=i.consumed;}for(var o=[],s=0;s<n;s++){ o.push(new A(this.coder)); }var a=$(o,e,t);return a.consumed+=r,a.value=this.coerceFunc(this.type,a.value),a},ee);function ee(e,t,r,n){var i=this,o=t.type+"["+(0<=r?r:"")+"]",s=-1===r||t.dynamic;return (i=Q.call(this,e,"array",o,n,s)||this).coder=t,i.length=r,i}var te,re=(i(ne,te=_),ne.prototype.encode=function(e){return X(this.coders,e)},ne.prototype.decode=function(e,t){var r=$(this.coders,e,t);return r.value=this.coerceFunc(this.type,r.value),r},ne);function ne(e,t,r){var n=this,i=!1,o=[];t.forEach(function(e){e.dynamic&&(i=!0),o.push(e.type);});var s="tuple("+o.join(",")+")";return (n=te.call(this,e,"tuple",s,r,i)||this).coders=t,n}function ie(e){e=e.trim();for(var t=[],r="",n=0,i=0;i<e.length;i++){var o=e[i];if(","===o&&0===n){ t.push(r),r=""; }else if(r+=o,"("===o){ n++; }else if(")"===o&&-1===--n){ throw new Error("unbalanced parenthsis") }}return r&&t.push(r),t}var oe={address:F,bool:O,string:W,bytes:V};function se(e,t){var r,n=oe[t.type];if(n){ return new n(e,t.name); }if(r=t.type.match(p)){ return (0===(i=parseInt(r[2]||"256"))||256<i||i%8!=0)&&l.throwError("invalid "+r[1]+" bit length",l.INVALID_ARGUMENT,{arg:"param",value:t}),new x(e,i/8,"int"===r[1],t.name); }if(r=t.type.match(d)){ return (0===(i=parseInt(r[1]))||32<i)&&l.throwError("invalid bytes length",l.INVALID_ARGUMENT,{arg:"param",value:t}),new D(e,i,t.name); }if(r=t.type.match(v)){var i=parseInt(r[2]||"-1");return (t=c.shallowCopy(t)).type=r[1],t=c.deepCopy(t),new Y(e,se(e,t),i,t.name)}return "tuple"===t.type.substring(0,5)?function(t,e,r){var n=[];return (e=e||[]).forEach(function(e){n.push(se(t,e));}),new re(t,n,r)}(e,t.components,t.name):""===t.type?new k(e,t.name):(l.throwError("invalid type",l.INVALID_ARGUMENT,{arg:"type",value:t.type}),null)}var ae=(ue.prototype.encode=function(e,t){e.length!==t.length&&l.throwError("types/values length mismatch",l.INVALID_ARGUMENT,{count:{types:e.length,values:t.length},value:{types:e,values:t}});var r=[];return e.forEach(function(e){var t=null;t="string"==typeof e?b(e):e,r.push(se(this.coerceFunc,t));},this),h.hexlify(new re(this.coerceFunc,r,"_").encode(t))},ue.prototype.decode=function(e,t){var r=[];return e.forEach(function(e){var t=null;t="string"==typeof e?b(e):c.deepCopy(e),r.push(se(this.coerceFunc,t));},this),new re(this.coerceFunc,r,"_").decode(h.arrayify(t),0).value},ue);function ue(e){l.checkNew(this,ue),e=e||r.defaultCoerceFunc,c.defineReadOnly(this,"coerceFunc",e);}r.AbiCoder=ae,r.defaultAbiCoder=new ae;},{"../constants":3,"../errors":5,"./address":59,"./bignumber":62,"./bytes":63,"./properties":73,"./utf8":84}],59:[function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0});var i=n(e("bn.js")),o=e("./bytes"),s=e("./keccak256"),a=e("./rlp"),u=e("../errors");function l(e){"string"==typeof e&&e.match(/^0x[0-9A-Fa-f]{40}$/)||u.throwError("invalid address",u.INVALID_ARGUMENT,{arg:"address",value:e});for(var t=(e=e.toLowerCase()).substring(2).split(""),r=new Uint8Array(40),n=0;n<40;n++){ r[n]=t[n].charCodeAt(0); }r=o.arrayify(s.keccak256(r));for(var i=0;i<40;i+=2){ 8<=r[i>>1]>>4&&(t[i]=t[i].toUpperCase()),8<=(15&r[i>>1])&&(t[i+1]=t[i+1].toUpperCase()); }return "0x"+t.join("")}for(var h={},f=0;f<10;f++){ h[String(f)]=String(f); }for(f=0;f<26;f++){ h[String.fromCharCode(65+f)]=String(10+f); }var c,d=Math.floor((c=9007199254740991,Math.log10?Math.log10(c):Math.log(c)/Math.LN10));function p(e){e=(e=e.toUpperCase()).substring(4)+e.substring(0,2)+"00";var t="";for(e.split("").forEach(function(e){t+=h[e];});t.length>=d;){var r=t.substring(0,d);t=parseInt(r,10)%97+t.substring(r.length);}for(var n=String(98-parseInt(t,10)%97);n.length<2;){ n="0"+n; }return n}function v(e){var t=null;if("string"!=typeof e&&u.throwError("invalid address",u.INVALID_ARGUMENT,{arg:"address",value:e}),e.match(/^(0x)?[0-9a-fA-F]{40}$/)){ "0x"!==e.substring(0,2)&&(e="0x"+e),t=l(e),e.match(/([A-F].*[a-f])|([a-f].*[A-F])/)&&t!==e&&u.throwError("bad address checksum",u.INVALID_ARGUMENT,{arg:"address",value:e}); }else if(e.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)){for(e.substring(2,4)!==p(e)&&u.throwError("bad icap checksum",u.INVALID_ARGUMENT,{arg:"address",value:e}),t=new i.default.BN(e.substring(4),36).toString(16);t.length<40;){ t="0"+t; }t=l("0x"+t);}else { u.throwError("invalid address",u.INVALID_ARGUMENT,{arg:"address",value:e}); }return t}r.getAddress=v,r.getIcapAddress=function(e){for(var t=new i.default.BN(v(e).substring(2),16).toString(36).toUpperCase();t.length<30;){ t="0"+t; }return "XE"+p("XE00"+t)+t},r.getContractAddress=function(e){if(!e.from){ throw new Error("missing from address"); }var t=e.nonce;return v("0x"+s.keccak256(a.encode([v(e.from),o.stripZeros(o.hexlify(t))])).substring(26))};},{"../errors":5,"./bytes":63,"./keccak256":70,"./rlp":75,"bn.js":9}],60:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0});var n=e("../utils/bytes");t.exports={decode:function(e){e=atob(e);for(var t=[],r=0;r<e.length;r++){ t.push(e.charCodeAt(r)); }return n.arrayify(t)},encode:function(e){e=n.arrayify(e);for(var t="",r=0;r<e.length;r++){ t+=String.fromCharCode(e[r]); }return btoa(t)}};},{"../utils/bytes":63}],61:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0});var l=e("./bytes"),n=e("./properties"),i=(o.prototype.encode=function(e){var t=l.arrayify(e);if(0===t.length){ return ""; }for(var r=[0],n=0;n<t.length;++n){for(var i=t[n],o=0;o<r.length;++o){ i+=r[o]<<8,r[o]=i%this.base,i=i/this.base|0; }for(;0<i;){ r.push(i%this.base),i=i/this.base|0; }}for(var s="",a=0;0===t[a]&&a<t.length-1;++a){ s+=this._leader; }for(var u=r.length-1;0<=u;--u){ s+=this.alphabet[r[u]]; }return s},o.prototype.decode=function(e){if("string"!=typeof e){ throw new TypeError("Expected String"); }var t=[];if(0===e.length){ return new Uint8Array(t); }t.push(0);for(var r=0;r<e.length;r++){var n=this._alphabetMap[e[r]];if(void 0===n){ throw new Error("Non-base"+this.base+" character"); }for(var i=n,o=0;o<t.length;++o){ i+=t[o]*this.base,t[o]=255&i,i>>=8; }for(;0<i;){ t.push(255&i),i>>=8; }}for(var s=0;e[s]===this._leader&&s<e.length-1;++s){ t.push(0); }return l.arrayify(new Uint8Array(t.reverse()))},o);function o(e){n.defineReadOnly(this,"alphabet",e),n.defineReadOnly(this,"base",e.length),n.defineReadOnly(this,"_alphabetMap",{}),n.defineReadOnly(this,"_leader",e.charAt(0));for(var t=0;t<e.length;t++){ this._alphabetMap[e.charAt(t)]=t; }}var s=new(r.BaseX=i)("abcdefghijklmnopqrstuvwxyz234567");r.Base32=s;var a=new i("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");r.Base58=a;},{"./bytes":63,"./properties":73}],62:[function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},i=this&&this.__importStar||function(e){if(e&&e.__esModule){ return e; }var t={};if(null!=e){ for(var r in e){ Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]); } }return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var o=n(e("bn.js")),s=e("./bytes"),a=e("./properties"),u=i(e("../errors")),l=new o.default.BN(-1);function h(e){var t=e.toString(16);return "-"===t[0]?t.length%2==0?"-0x0"+t.substring(1):"-0x"+t.substring(1):t.length%2==1?"0x0"+t:"0x"+t}function f(e){return d(y(e))}function c(e){return new p(h(e))}function d(e){var t=e._hex;return "-"===t[0]?new o.default.BN(t.substring(3),16).mul(l):new o.default.BN(t.substring(2),16)}var p=(v.prototype.fromTwos=function(e){return c(d(this).fromTwos(e))},v.prototype.toTwos=function(e){return c(d(this).toTwos(e))},v.prototype.abs=function(){return "-"===this._hex[0]?c(d(this).mul(l)):this},v.prototype.add=function(e){return c(d(this).add(f(e)))},v.prototype.sub=function(e){return c(d(this).sub(f(e)))},v.prototype.div=function(e){return y(e).isZero()&&u.throwError("division by zero",u.NUMERIC_FAULT,{operation:"divide",fault:"division by zero"}),c(d(this).div(f(e)))},v.prototype.mul=function(e){return c(d(this).mul(f(e)))},v.prototype.mod=function(e){return c(d(this).mod(f(e)))},v.prototype.pow=function(e){return c(d(this).pow(f(e)))},v.prototype.maskn=function(e){return c(d(this).maskn(e))},v.prototype.eq=function(e){return d(this).eq(f(e))},v.prototype.lt=function(e){return d(this).lt(f(e))},v.prototype.lte=function(e){return d(this).lte(f(e))},v.prototype.gt=function(e){return d(this).gt(f(e))},v.prototype.gte=function(e){return d(this).gte(f(e))},v.prototype.isZero=function(){return d(this).isZero()},v.prototype.toNumber=function(){try{return d(this).toNumber()}catch(e){u.throwError("overflow",u.NUMERIC_FAULT,{operation:"setValue",fault:"overflow",details:e.message});}return null},v.prototype.toString=function(){return d(this).toString(10)},v.prototype.toHexString=function(){return this._hex},v.isBigNumber=function(e){return a.isType(e,"BigNumber")},v);function v(e){if(u.checkNew(this,v),a.setType(this,"BigNumber"),"string"==typeof e){ s.isHexString(e)?("0x"==e&&(e="0x0"),a.defineReadOnly(this,"_hex",e)):"-"===e[0]&&s.isHexString(e.substring(1))?a.defineReadOnly(this,"_hex",e):e.match(/^-?[0-9]*$/)?(""==e&&(e="0"),a.defineReadOnly(this,"_hex",h(new o.default.BN(e)))):u.throwError("invalid BigNumber string value",u.INVALID_ARGUMENT,{arg:"value",value:e}); }else if("number"==typeof e){parseInt(String(e))!==e&&u.throwError("underflow",u.NUMERIC_FAULT,{operation:"setValue",fault:"underflow",value:e,outputValue:parseInt(String(e))});try{a.defineReadOnly(this,"_hex",h(new o.default.BN(e)));}catch(e){u.throwError("overflow",u.NUMERIC_FAULT,{operation:"setValue",fault:"overflow",details:e.message});}}else { e instanceof v?a.defineReadOnly(this,"_hex",e._hex):e.toHexString?a.defineReadOnly(this,"_hex",h(f(e.toHexString()))):e._hex&&s.isHexString(e._hex)?a.defineReadOnly(this,"_hex",e._hex):s.isArrayish(e)?a.defineReadOnly(this,"_hex",h(new o.default.BN(s.hexlify(e).substring(2),16))):u.throwError("invalid BigNumber value",u.INVALID_ARGUMENT,{arg:"value",value:e}); }}function y(e){return p.isBigNumber(e)?e:new p(e)}r.BigNumber=p,r.bigNumberify=y;},{"../errors":5,"./bytes":63,"./properties":73,"bn.js":9}],63:[function(e,t,r){var n=this&&this.__importStar||function(e){if(e&&e.__esModule){ return e; }var t={};if(null!=e){ for(var r in e){ Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]); } }return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var s=n(e("../errors"));function a(e){return !!e.toHexString}function u(t){return t.slice||(t.slice=function(){var e=Array.prototype.slice.call(arguments);return u(new Uint8Array(Array.prototype.slice.apply(t,e)))}),t}function l(e){if(!e||parseInt(String(e.length))!=e.length||"string"==typeof e){ return !1; }for(var t=0;t<e.length;t++){var r=e[t];if(r<0||256<=r||parseInt(String(r))!=r){ return !1 }}return !0}function h(e){if(null==e&&s.throwError("cannot convert null value to array",s.INVALID_ARGUMENT,{arg:"value",value:e}),a(e)&&(e=e.toHexString()),"string"!=typeof e){ return l(e)?u(new Uint8Array(e)):(s.throwError("invalid arrayify value",null,{arg:"value",value:e,type:typeof e}),null); }var t=e.match(/^(0x)?[0-9a-fA-F]*$/);t||s.throwError("invalid hexidecimal string",s.INVALID_ARGUMENT,{arg:"value",value:e}),"0x"!==t[1]&&s.throwError("hex string must have 0x prefix",s.INVALID_ARGUMENT,{arg:"value",value:e}),(e=e.substring(2)).length%2&&(e="0"+e);for(var r=[],n=0;n<e.length;n+=2){ r.push(parseInt(e.substr(n,2),16)); }return u(new Uint8Array(r))}function i(e){for(var t=[],r=0,n=0;n<e.length;n++){var i=h(e[n]);t.push(i),r+=i.length;}var o=new Uint8Array(r),s=0;for(n=0;n<t.length;n++){ o.set(t[n],s),s+=t[n].length; }return u(o)}function o(e,t){return !("string"!=typeof e||!e.match(/^0x[0-9A-Fa-f]*$/))&&(!t||e.length===2+2*t)}r.isHexable=a,r.isArrayish=l,r.arrayify=h,r.concat=i,r.stripZeros=function(e){var t=h(e);if(0===t.length){ return t; }for(var r=0;0===t[r];){ r++; }return r&&(t=t.slice(r)),t},r.padZeros=function(e,t){if(t<(e=h(e)).length){ throw new Error("cannot pad"); }var r=new Uint8Array(t);return r.set(e,t-e.length),u(r)},r.isHexString=o;var f="0123456789abcdef";function c(e){if(a(e)){ return e.toHexString(); }if("number"==typeof e){e<0&&s.throwError("cannot hexlify negative value",s.INVALID_ARGUMENT,{arg:"value",value:e}),9007199254740991<=e&&s.throwError("out-of-range",s.NUMERIC_FAULT,{operartion:"hexlify",fault:"out-of-safe-range"});for(var t="";e;){ t=f[15&e]+t,e=Math.floor(e/16); }return t.length?(t.length%2&&(t="0"+t),"0x"+t):"0x00"}if("string"==typeof e){var r=e.match(/^(0x)?[0-9a-fA-F]*$/);return r||s.throwError("invalid hexidecimal string",s.INVALID_ARGUMENT,{arg:"value",value:e}),"0x"!==r[1]&&s.throwError("hex string must have 0x prefix",s.INVALID_ARGUMENT,{arg:"value",value:e}),e.length%2&&(e="0x0"+e.substring(2)),e}if(l(e)){for(var n=[],i=0;i<e.length;i++){var o=e[i];n.push(f[(240&o)>>4]+f[15&o]);}return "0x"+n.join("")}return s.throwError("invalid hexlify value",null,{arg:"value",value:e}),"never"}function d(e,t){for(o(e)||s.throwError("invalid hex string",s.INVALID_ARGUMENT,{arg:"value",value:e});e.length<2*t+2;){ e="0x0"+e.substring(2); }return e}function p(e){var t=0,r="0x",n="0x";if(function(e){return e&&null!=e.r&&null!=e.s}(e)){null==e.v&&null==e.recoveryParam&&s.throwError("at least on of recoveryParam or v must be specified",s.INVALID_ARGUMENT,{argument:"signature",value:e}),r=d(e.r,32),n=d(e.s,32),"string"==typeof(t=e.v)&&(t=parseInt(t,16));var i=e.recoveryParam;null==i&&null!=e.v&&(i=1-t%2),t=27+i;}else{var o=h(e);if(65!==o.length){ throw new Error("invalid signature"); }r=c(o.slice(0,32)),n=c(o.slice(32,64)),27!==(t=o[64])&&28!==t&&(t=27+t%2);}return {r:r,s:n,recoveryParam:t-27,v:t}}r.hexlify=c,r.hexDataLength=function(e){return o(e)&&e.length%2==0?(e.length-2)/2:null},r.hexDataSlice=function(e,t,r){return o(e)||s.throwError("invalid hex data",s.INVALID_ARGUMENT,{arg:"value",value:e}),e.length%2!=0&&s.throwError("hex data length must be even",s.INVALID_ARGUMENT,{arg:"value",value:e}),t=2+2*t,null!=r?"0x"+e.substring(t,2+2*r):"0x"+e.substring(t)},r.hexStripZeros=function(e){for(o(e)||s.throwError("invalid hex string",s.INVALID_ARGUMENT,{arg:"value",value:e});3<e.length&&"0x0"===e.substring(0,3);){ e="0x"+e.substring(3); }return e},r.hexZeroPad=d,r.splitSignature=p,r.joinSignature=function(e){return c(i([(e=p(e)).r,e.s,e.recoveryParam?"0x1c":"0x1b"]))};},{"../errors":5}],64:[function(e,t,r){var n=this&&this.__importStar||function(e){if(e&&e.__esModule){ return e; }var t={};if(null!=e){ for(var r in e){ Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]); } }return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var i=n(e("../errors")),o=e("./bytes"),s=e("./utf8"),a=e("./keccak256"),u=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),l=new RegExp("^((.*)\\.)?([^.]+)$"),h=new RegExp("^[a-z0-9.-]*$");r.namehash=function(e){"string"!=typeof e&&i.throwError("invalid address - "+String(e),i.INVALID_ARGUMENT,{argument:"name",value:e}),(e=e.toLowerCase()).match(h)||i.throwError("contains invalid UseSTD3ASCIIRules characters",i.INVALID_ARGUMENT,{argument:"name",value:e});for(var t=u;e.length;){var r=e.match(l),n=s.toUtf8Bytes(r[3]);t=a.keccak256(o.concat([t,a.keccak256(n)])),e=r[2]||"";}return o.hexlify(t)},r.id=function(e){return a.keccak256(s.toUtf8Bytes(e))},r.hashMessage=function(e){return a.keccak256(o.concat([s.toUtf8Bytes("\x19Ethereum Signed Message:\n"),s.toUtf8Bytes(String(e.length)),"string"==typeof e?s.toUtf8Bytes(e):e]))};},{"../errors":5,"./bytes":63,"./keccak256":70,"./utf8":84}],65:[function(e,t,r){var n=this&&this.__importStar||function(e){if(e&&e.__esModule){ return e; }var t={};if(null!=e){ for(var r in e){ Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]); } }return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var f=n(e("../errors")),c=e("../wordlists/lang-en"),a=e("./basex"),d=e("./bytes"),l=e("./bignumber"),i=e("./utf8"),o=e("./pbkdf2"),h=e("./hmac"),p=e("./properties"),v=e("./secp256k1"),y=e("./sha2"),m=l.bigNumberify("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),s=i.toUtf8Bytes("Bitcoin seed"),g=2147483648;function b(e){return (1<<e)-1<<8-e}function w(e){return d.hexZeroPad(d.hexlify(e),32)}function u(e){var t=d.hexDataSlice(y.sha256(y.sha256(e)),0,4);return a.Base58.encode(d.concat([e,t]))}var _={};r.defaultPath="m/44'/60'/0'/0/0";var M=(Object.defineProperty(A.prototype,"extendedKey",{get:function(){if(256<=this.depth){ throw new Error("Depth too large!"); }return u(d.concat([null!=this.privateKey?"0x0488ADE4":"0x0488B21E",d.hexlify(this.depth),this.parentFingerprint,d.hexZeroPad(d.hexlify(this.index),4),this.chainCode,null!=this.privateKey?d.concat(["0x00",this.privateKey]):this.publicKey]))},enumerable:!0,configurable:!0}),A.prototype.neuter=function(){return new A(_,null,this.publicKey,this.parentFingerprint,this.chainCode,this.index,this.depth,null,this.path)},A.prototype._derive=function(e){if(4294967295<e){ throw new Error("invalid index - "+String(e)); }var t=this.path;t&&(t+="/"+(e&~g));var r=new Uint8Array(37);if(e&g){if(!this.privateKey){ throw new Error("cannot derive child of neutered node"); }r.set(d.arrayify(this.privateKey),1),t&&(t+="'");}else { r.set(d.arrayify(this.publicKey)); }for(var n=24;0<=n;n-=8){ r[33+(n>>3)]=e>>24-n&255; }var i=h.computeHmac(h.SupportedAlgorithms.sha512,this.chainCode,r),o=i.slice(0,32),s=i.slice(32),a=null,u=null;return this.privateKey?a=w(l.bigNumberify(o).add(this.privateKey).mod(m)):u=new v.KeyPair(d.hexlify(o))._addPoint(this.publicKey),new A(_,a,u,this.fingerprint,w(s),e,this.depth+1,this.mnemonic,t)},A.prototype.derivePath=function(e){var t=e.split("/");if(0===t.length||"m"===t[0]&&0!==this.depth){ throw new Error("invalid path - "+e); }"m"===t[0]&&t.shift();for(var r=this,n=0;n<t.length;n++){var i=t[n];if(i.match(/^[0-9]+'$/)){var o=parseInt(i.substring(0,i.length-1));if(g<=o){ throw new Error("invalid path index - "+i); }r=r._derive(g+o);}else{if(!i.match(/^[0-9]+$/)){ throw new Error("invlaid path component - "+i); }if(o=parseInt(i),g<=o){ throw new Error("invalid path index - "+i); }r=r._derive(o);}}return r},A.isHDNode=function(e){return p.isType(e,"HDNode")},A);function A(e,t,r,n,i,o,s,a,u){if(f.checkNew(this,A),e!==_){ throw new Error("HDNode constructor cannot be called directly"); }if(t){var l=new v.KeyPair(t);p.defineReadOnly(this,"privateKey",l.privateKey),p.defineReadOnly(this,"publicKey",l.compressedPublicKey);}else { p.defineReadOnly(this,"privateKey",null),p.defineReadOnly(this,"publicKey",d.hexlify(r)); }p.defineReadOnly(this,"parentFingerprint",n),p.defineReadOnly(this,"fingerprint",d.hexDataSlice(y.ripemd160(y.sha256(this.publicKey)),0,4)),p.defineReadOnly(this,"address",v.computeAddress(this.publicKey)),p.defineReadOnly(this,"chainCode",i),p.defineReadOnly(this,"index",o),p.defineReadOnly(this,"depth",s),p.defineReadOnly(this,"mnemonic",a),p.defineReadOnly(this,"path",u),p.setType(this,"HDNode");}function E(e,t){var r=d.arrayify(e);if(r.length<16||64<r.length){ throw new Error("invalid seed"); }var n=d.arrayify(h.computeHmac(h.SupportedAlgorithms.sha512,s,r));return new M(_,w(n.slice(0,32)),null,"0x00000000",w(n.slice(32)),0,0,t,"m")}function S(e,t){t=t||"";var r=i.toUtf8Bytes("mnemonic"+t,i.UnicodeNormalizationForm.NFKD);return d.hexlify(o.pbkdf2(i.toUtf8Bytes(e,i.UnicodeNormalizationForm.NFKD),r,2048,64,"sha512"))}function k(e,t){t=t||c.langEn,f.checkNormalize();var r=t.split(e);if(r.length%3!=0){ throw new Error("invalid mnemonic"); }for(var n=d.arrayify(new Uint8Array(Math.ceil(11*r.length/8))),i=0,o=0;o<r.length;o++){var s=t.getWordIndex(r[o].normalize("NFKD"));if(-1===s){ throw new Error("invalid mnemonic"); }for(var a=0;a<11;a++){ s&1<<10-a&&(n[i>>3]|=1<<7-i%8),i++; }}var u=32*r.length/3,l=b(r.length/3),h=d.arrayify(y.sha256(n.slice(0,u/8)))[0];if((h&=l)!=(n[n.length-1]&l)){ throw new Error("invalid checksum"); }return d.hexlify(n.slice(0,u/8))}function N(e,t){if((e=d.arrayify(e)).length%4!=0||e.length<16||32<e.length){ throw new Error("invalid entropy"); }for(var r=[0],n=11,i=0;i<e.length;i++){ 8<n?(r[r.length-1]<<=8,r[r.length-1]|=e[i],n-=8):(r[r.length-1]<<=n,r[r.length-1]|=e[i]>>8-n,r.push(e[i]&(1<<8-n)-1),n+=3); }var o=d.arrayify(y.sha256(e))[0],s=e.length/4;return o&=b(s),r[r.length-1]<<=s,r[r.length-1]|=o>>8-s,(t=t||c.langEn).join(r.map(function(e){return t.getWord(e)}))}r.HDNode=M,r.fromExtendedKey=function(e){var t=a.Base58.decode(e);82===t.length&&u(t.slice(0,78))===e||f.throwError("invalid extended key",f.INVALID_ARGUMENT,{argument:"extendedKey",value:"[REDACTED]"});var r=t[4],n=d.hexlify(t.slice(5,9)),i=parseInt(d.hexlify(t.slice(9,13)).substring(2),16),o=d.hexlify(t.slice(13,45)),s=t.slice(45,78);switch(d.hexlify(t.slice(0,4))){case"0x0488b21e":case"0x043587cf":return new M(_,null,d.hexlify(s),n,o,i,r,null,null);case"0x0488ade4":case"0x04358394":if(0!==s[0]){ break; }return new M(_,d.hexlify(s.slice(1)),null,n,o,i,r,null,null)}return f.throwError("invalid extended key",f.INVALID_ARGUMENT,{argument:"extendedKey",value:"[REDACTED]"})},r.fromMnemonic=function(e,t,r){return E(S(e=N(k(e,t),t),r),e)},r.fromSeed=function(e){return E(e,null)},r.mnemonicToSeed=S,r.mnemonicToEntropy=k,r.entropyToMnemonic=N,r.isValidMnemonic=function(e,t){try{return k(e,t),!0}catch(e){}return !1};},{"../errors":5,"../wordlists/lang-en":89,"./basex":61,"./bignumber":62,"./bytes":63,"./hmac":66,"./pbkdf2":72,"./properties":73,"./secp256k1":76,"./sha2":78,"./utf8":84}],66:[function(e,t,r){var n=this&&this.__importStar||function(e){if(e&&e.__esModule){ return e; }var t={};if(null!=e){ for(var r in e){ Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]); } }return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var i,o,s=n(e("hash.js")),a=e("../utils/bytes"),u=n(e("../errors"));(o=i=r.SupportedAlgorithms||(r.SupportedAlgorithms={})).sha256="sha256",o.sha512="sha512",r.computeHmac=function(e,t,r){return i[e]||u.throwError("unsupported algorithm "+e,u.UNSUPPORTED_OPERATION,{operation:"hmac",algorithm:e}),a.arrayify(s.hmac(s[e],a.arrayify(t)).update(a.arrayify(r)).digest())};},{"../errors":5,"../utils/bytes":63,"hash.js":27}],67:[function(e,t,r){var n=this&&this.__importStar||function(e){if(e&&e.__esModule){ return e; }var t={};if(null!=e){ for(var r in e){ Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]); } }return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var i=e("./abi-coder");r.AbiCoder=i.AbiCoder,r.defaultAbiCoder=i.defaultAbiCoder,r.formatSignature=i.formatSignature,r.formatParamType=i.formatParamType,r.parseSignature=i.parseSignature,r.parseParamType=i.parseParamType;var o=e("./address");r.getAddress=o.getAddress,r.getContractAddress=o.getContractAddress,r.getIcapAddress=o.getIcapAddress;var s=n(e("./base64"));r.base64=s;var a=e("./bignumber");r.BigNumber=a.BigNumber,r.bigNumberify=a.bigNumberify;var u=e("./bytes");r.arrayify=u.arrayify,r.concat=u.concat,r.hexDataSlice=u.hexDataSlice,r.hexDataLength=u.hexDataLength,r.hexlify=u.hexlify,r.hexStripZeros=u.hexStripZeros,r.hexZeroPad=u.hexZeroPad,r.isHexString=u.isHexString,r.joinSignature=u.joinSignature,r.padZeros=u.padZeros,r.splitSignature=u.splitSignature,r.stripZeros=u.stripZeros;var l=e("./hash");r.hashMessage=l.hashMessage,r.id=l.id,r.namehash=l.namehash;var h=n(e("./hdnode"));r.HDNode=h;var f=e("./interface");r.Interface=f.Interface;var c=e("./json-wallet");r.getJsonWalletAddress=c.getJsonWalletAddress;var d=e("./keccak256");r.keccak256=d.keccak256;var p=e("./sha2");r.sha256=p.sha256;var v=e("./solidity");r.solidityKeccak256=v.keccak256,r.solidityPack=v.pack,r.soliditySha256=v.sha256;var y=e("./random-bytes");r.randomBytes=y.randomBytes;var m=e("./networks");r.getNetwork=m.getNetwork;var g=e("./properties");r.checkProperties=g.checkProperties,r.deepCopy=g.deepCopy,r.defineReadOnly=g.defineReadOnly,r.resolveProperties=g.resolveProperties,r.shallowCopy=g.shallowCopy;var b=n(e("./rlp"));r.RLP=b;var w=e("./secp256k1");r.computeAddress=w.computeAddress,r.computePublicKey=w.computePublicKey,r.recoverAddress=w.recoverAddress,r.recoverPublicKey=w.recoverPublicKey,r.verifyMessage=w.verifyMessage;var _=e("./signing-key");r.SigningKey=_.SigningKey;var M=e("./transaction");r.populateTransaction=M.populateTransaction;var A=e("./transaction");r.parseTransaction=A.parse,r.serializeTransaction=A.serialize;var E=e("./utf8");r.formatBytes32String=E.formatBytes32String,r.parseBytes32String=E.parseBytes32String,r.toUtf8Bytes=E.toUtf8Bytes,r.toUtf8String=E.toUtf8String;var S=e("./units");r.commify=S.commify,r.formatEther=S.formatEther,r.parseEther=S.parseEther,r.formatUnits=S.formatUnits,r.parseUnits=S.parseUnits;var k=e("./web");r.fetchJson=k.fetchJson,r.poll=k.poll;var N=e("./hmac");r.SupportedAlgorithms=N.SupportedAlgorithms;var P=e("./utf8");r.UnicodeNormalizationForm=P.UnicodeNormalizationForm;var x=e("./wordlist");r.Wordlist=x.Wordlist;},{"./abi-coder":58,"./address":59,"./base64":60,"./bignumber":62,"./bytes":63,"./hash":64,"./hdnode":65,"./hmac":66,"./interface":68,"./json-wallet":69,"./keccak256":70,"./networks":71,"./properties":73,"./random-bytes":74,"./rlp":75,"./secp256k1":76,"./sha2":78,"./signing-key":80,"./solidity":81,"./transaction":82,"./units":83,"./utf8":84,"./web":85,"./wordlist":86}],68:[function(e,t,r){var n,i=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t;}||function(e,t){for(var r in t){ t.hasOwnProperty(r)&&(e[r]=t[r]); }},function(e,t){function r(){this.constructor=e;}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r);}),o=this&&this.__importStar||function(e){if(e&&e.__esModule){ return e; }var t={};if(null!=e){ for(var r in e){ Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]); } }return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});function s(e){for(var t in p.setType(this,"Description"),e){ p.defineReadOnly(this,t,p.deepCopy(e[t],!0)); }Object.freeze(this);}var a,u=e("./address"),f=e("./abi-coder"),l=e("./bignumber"),c=e("./bytes"),h=e("./hash"),d=e("./keccak256"),p=e("./properties"),v=o(e("../errors")),y=function(e){p.setType(this,"Indexed"),p.defineReadOnly(this,"hash",e);},m=(i(g,a=s),g.prototype.encode=function(e,t){c.isHexString(e)||v.throwError("invalid contract bytecode",v.INVALID_ARGUMENT,{arg:"bytecode",value:e}),v.checkArgumentCount(t.length,this.inputs.length," in Interface constructor");try{return e+f.defaultAbiCoder.encode(this.inputs,t).substring(2)}catch(e){v.throwError("invalid constructor argument",v.INVALID_ARGUMENT,{arg:e.arg,reason:e.reason,value:e.value});}return null},g);function g(){return null!==a&&a.apply(this,arguments)||this}var b,w=(i(_,b=s),_.prototype.encode=function(e){v.checkArgumentCount(e.length,this.inputs.length," in interface function "+this.name);try{return this.sighash+f.defaultAbiCoder.encode(this.inputs,e).substring(2)}catch(e){v.throwError("invalid input argument",v.INVALID_ARGUMENT,{arg:e.arg,reason:e.reason,value:e.value});}return null},_.prototype.decode=function(t){try{return f.defaultAbiCoder.decode(this.outputs,c.arrayify(t))}catch(e){v.throwError("invalid data for function output",v.INVALID_ARGUMENT,{arg:"data",errorArg:e.arg,errorValue:e.value,value:t,reason:e.reason});}},_);function _(){return null!==b&&b.apply(this,arguments)||this}var M,A=(i(E,M=s),E);function E(){return null!==M&&M.apply(this,arguments)||this}var S,k=(i(N,S=s),N.prototype.encodeTopics=function(e){var n=this;e.length>this.inputs.length&&v.throwError("too many arguments for "+this.name,v.UNEXPECTED_ARGUMENT,{maxCount:e.length,expectedCount:this.inputs.length});var i=[];for(this.anonymous||i.push(this.topic),e.forEach(function(e,t){var r=n.inputs[t];r.indexed?null==e?i.push(null):"string"===r.type?i.push(h.id(e)):"bytes"===r.type?i.push(d.keccak256(e)):-1!==r.type.indexOf("[")||"tuple"===r.type.substring(0,5)?v.throwError("filtering with tuples or arrays not implemented yet; bug us on GitHub",v.NOT_IMPLEMENTED,{operation:"filter(array|tuple)"}):("address"===r.type&&u.getAddress(e),i.push(c.hexZeroPad(c.hexlify(e),32).toLowerCase())):null!=e&&v.throwError("cannot filter non-indexed parameters; must be null",v.INVALID_ARGUMENT,{argument:r.name||t,value:e});});i.length&&null===i[i.length-1];){ i.pop(); }return i},N.prototype.decode=function(e,r){null==r||this.anonymous||(r=r.slice(1));var n=[],i=[],o=[];if(this.inputs.forEach(function(e,t){e.indexed?"string"===e.type||"bytes"===e.type||0<=e.type.indexOf("[")||"tuple"===e.type.substring(0,5)?(n.push({type:"bytes32",name:e.name||""}),o.push(!0)):(n.push(e),o.push(!1)):(i.push(e),o.push(!1));}),null!=r){ var s=f.defaultAbiCoder.decode(n,c.concat(r)); }var a=f.defaultAbiCoder.decode(i,c.arrayify(e)),u={},l=0,h=0;return this.inputs.forEach(function(e,t){e.indexed?null==r?u[t]=new y(null):o[t]?u[t]=new y(s[h++]):u[t]=s[h++]:u[t]=a[l++],e.name&&(u[e.name]=u[t]);}),u.length=this.inputs.length,new A(u)},N);function N(){return null!==S&&S.apply(this,arguments)||this}var P,x=(i(I,P=s),I);function I(){return null!==P&&P.apply(this,arguments)||this}var T,R=(i(O,T=s),O);function O(){return null!==T&&T.apply(this,arguments)||this}function C(e){switch(e.type){case"constructor":var t=new m({inputs:e.inputs,payable:null==e.payable||!!e.payable});this.deployFunction||(this.deployFunction=t);break;case"function":var r=f.formatSignature(e).replace(/tuple/g,""),n=h.id(r).substring(0,10);t=new w({inputs:e.inputs,outputs:e.outputs,gas:e.gas,payable:null==e.payable||!!e.payable,type:e.constant?"call":"transaction",name:e.name,signature:r,sighash:n});e.name&&(null==this.functions[e.name]?p.defineReadOnly(this.functions,e.name,t):v.warn("WARNING: Multiple definitions for "+e.name)),null==this.functions[t.signature]&&p.defineReadOnly(this.functions,t.signature,t);break;case"event":r=f.formatSignature(e).replace(/tuple/g,""),t=new k({name:e.name,signature:r,inputs:e.inputs,topic:h.id(r),anonymous:!!e.anonymous});e.name&&null==this.events[e.name]&&p.defineReadOnly(this.events,e.name,t),null==this.events[t.signature]&&p.defineReadOnly(this.events,t.signature,t);break;case"fallback":break;default:v.warn("WARNING: unsupported ABI type - "+e.type);}}var B=(D.prototype.parseTransaction=function(e){var t=e.data.substring(0,10).toLowerCase();for(var r in this.functions){ if(-1!==r.indexOf("(")){var n=this.functions[r];if(n.sighash===t){var i=f.defaultAbiCoder.decode(n.inputs,"0x"+e.data.substring(10));return new x({args:i,decode:n.decode,name:n.name,signature:n.signature,sighash:n.sighash,value:l.bigNumberify(e.value||"0")})}} }return null},D.prototype.parseLog=function(e){for(var t in this.events){ if(-1!==t.indexOf("(")){var r=this.events[t];if(!r.anonymous&&r.topic===e.topics[0]){ return new R({decode:r.decode,name:r.name,signature:r.signature,topic:r.topic,values:r.decode(e.data,e.topics)}) }} }return null},D.isInterface=function(e){return p.isType(e,"Interface")},D.isIndexed=function(e){return p.isType(e,"Indexed")},D);function D(t){if(v.checkNew(this,D),"string"==typeof t){try{t=JSON.parse(t);}catch(e){v.throwError("could not parse ABI JSON",v.INVALID_ARGUMENT,{arg:"abi",errorMessage:e.message,value:t});}if(!Array.isArray(t)){ return v.throwError("invalid abi",v.INVALID_ARGUMENT,{arg:"abi",value:t}),null }}p.defineReadOnly(this,"functions",{}),p.defineReadOnly(this,"events",{});var r=[];t.forEach(function(e){"string"==typeof e&&(e=f.parseSignature(e)),r.push(e);}),p.defineReadOnly(this,"abi",p.deepCopy(r,!0)),r.forEach(C,this),this.deployFunction||C.call(this,{type:"constructor",inputs:[]}),p.setType(this,"Interface");}r.Interface=B;},{"../errors":5,"./abi-coder":58,"./address":59,"./bignumber":62,"./bytes":63,"./hash":64,"./keccak256":70,"./properties":73}],69:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0});var n=e("./address");function i(e){try{var t=JSON.parse(e);}catch(e){return !1}return t.encseed&&t.ethaddr}function o(e){try{var t=JSON.parse(e);}catch(e){return !1}return !(!t.version||parseInt(t.version)!==t.version||3!==parseInt(t.version))}r.isCrowdsaleWallet=i,r.isSecretStorageWallet=o,r.getJsonWalletAddress=function(e){if(i(e)){ try{return n.getAddress(JSON.parse(e).ethaddr)}catch(e){return null} }if(o(e)){ try{return n.getAddress(JSON.parse(e).address)}catch(e){return null} }return null};},{"./address":59}],70:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0});var n=e("js-sha3"),i=e("./bytes");r.keccak256=function(e){return "0x"+n.keccak_256(i.arrayify(e))};},{"./bytes":63,"js-sha3":40}],71:[function(e,t,r){var n=this&&this.__importStar||function(e){if(e&&e.__esModule){ return e; }var t={};if(null!=e){ for(var r in e){ Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]); } }return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var o=n(e("../errors"));function i(r){return function(e){var t=[];return e.InfuraProvider&&t.push(new e.InfuraProvider(r)),e.EtherscanProvider&&t.push(new e.EtherscanProvider(r)),0===t.length?null:e.FallbackProvider?new e.FallbackProvider(t):t[0]}}function s(t,r){return function(e){return e.JsonRpcProvider?new e.JsonRpcProvider(t,r):null}}var a={chainId:1,ensAddress:"0x314159265dd8dbb310642f98f50c066173c1259b",name:"homestead",_defaultProvider:i("homestead")},u={chainId:3,ensAddress:"0x112234455c3a32fd11230c42e7bccd4a84e02010",name:"ropsten",_defaultProvider:i("ropsten")},l={unspecified:{chainId:0,name:"unspecified"},homestead:a,mainnet:a,morden:{chainId:2,name:"morden"},ropsten:u,testnet:u,rinkeby:{chainId:4,ensAddress:"0xe7410170f87102DF0055eB195163A03B7F2Bff4A",name:"rinkeby",_defaultProvider:i("rinkeby")},goerli:{chainId:5,ensAddress:"0x112234455c3a32fd11230c42e7bccd4a84e02010",name:"goerli",_defaultProvider:i("goerli")},kovan:{chainId:42,name:"kovan",_defaultProvider:i("kovan")},classic:{chainId:61,name:"classic",_defaultProvider:s("https://web3.gastracker.io","classic")},classicTestnet:{chainId:62,name:"classicTestnet",_defaultProvider:s("https://web3.gastracker.io/morden","classicTestnet")}};r.getNetwork=function(e){if(null==e){ return null; }if("number"==typeof e){for(var t in l){var r=l[t];if(r.chainId===e){ return {name:r.name,chainId:r.chainId,ensAddress:r.ensAddress||null,_defaultProvider:r._defaultProvider||null} }}return {chainId:e,name:"unknown"}}if("string"==typeof e){var n=l[e];return null==n?null:{name:n.name,chainId:n.chainId,ensAddress:n.ensAddress,_defaultProvider:n._defaultProvider||null}}var i=l[e.name];return i?(0!==e.chainId&&e.chainId!==i.chainId&&o.throwError("network chainId mismatch",o.INVALID_ARGUMENT,{arg:"network",value:e}),{name:e.name,chainId:i.chainId,ensAddress:e.ensAddress||i.ensAddress||null,_defaultProvider:e._defaultProvider||i._defaultProvider||null}):("number"!=typeof e.chainId&&o.throwError("invalid network chainId",o.INVALID_ARGUMENT,{arg:"network",value:e}),e)};},{"../errors":5}],72:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0});var m=e("../utils/bytes"),g=e("./hmac");r.pbkdf2=function(e,t,r,n,i){var o;e=m.arrayify(e),t=m.arrayify(t);var s,a,u=1,l=new Uint8Array(n),h=new Uint8Array(t.length+4);h.set(t);for(var f=1;f<=u;f++){h[t.length]=f>>24&255,h[t.length+1]=f>>16&255,h[t.length+2]=f>>8&255,h[t.length+3]=255&f;var c=g.computeHmac(i,e,h);o||(o=c.length,a=new Uint8Array(o),s=n-((u=Math.ceil(n/o))-1)*o),a.set(c);for(var d=1;d<r;d++){c=g.computeHmac(i,e,c);for(var p=0;p<o;p++){ a[p]^=c[p]; }}var v=(f-1)*o,y=f===u?s:o;l.set(m.arrayify(a).slice(0,y),v);}return m.arrayify(l)};},{"../utils/bytes":63,"./hmac":66}],73:[function(e,t,r){var n=this&&this.__importStar||function(e){if(e&&e.__esModule){ return e; }var t={};if(null!=e){ for(var r in e){ Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]); } }return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var i=n(e("../errors"));function s(e,t,r){Object.defineProperty(e,t,{enumerable:!0,value:r,writable:!1});}function a(e,t){return e&&e._ethersType===t}r.defineReadOnly=s,r.setType=function(e,t){Object.defineProperty(e,"_ethersType",{configurable:!1,value:t,writable:!1});},r.isType=a,r.resolveProperties=function(r){var n={},i=[];return Object.keys(r).forEach(function(t){var e=r[t];e instanceof Promise?i.push(e.then(function(e){return n[t]=e,null})):n[t]=e;}),Promise.all(i).then(function(){return n})},r.checkProperties=function(t,r){t&&"object"==typeof t||i.throwError("invalid object",i.INVALID_ARGUMENT,{argument:"object",value:t}),Object.keys(t).forEach(function(e){r[e]||i.throwError("invalid object key - "+e,i.INVALID_ARGUMENT,{argument:"transaction",value:t,key:e});});},r.shallowCopy=function(e){var t={};for(var r in e){ t[r]=e[r]; }return t};var u={boolean:!0,number:!0,string:!0};r.deepCopy=function t(e,r){if(null==e||u[typeof e]){ return e; }if(Array.isArray(e)){var n=e.map(function(e){return t(e,r)});return r&&Object.freeze(n),n}if("object"==typeof e){if(a(e,"BigNumber")){ return e; }if(a(e,"Description")){ return e; }if(a(e,"Indexed")){ return e; }for(var i in n={},e){var o=e[i];void 0!==o&&s(n,i,t(o,r));}return r&&Object.freeze(n),n}if("function"==typeof e){ return e; }throw new Error("Cannot deepCopy "+typeof e)},r.inheritable=function t(r){return function(e){!function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}});}(e,r),s(e,"inherits",t(e));}};},{"../errors":5}],74:[function(o,e,s){(function(e){Object.defineProperty(s,"__esModule",{value:!0});var r=o("../utils/bytes"),t=o("../utils/properties"),n=e.crypto||e.msCrypto;function i(e){if(e<=0||1024<e||parseInt(String(e))!=e){ throw new Error("invalid length"); }var t=new Uint8Array(e);return n.getRandomValues(t),r.arrayify(t)}n&&n.getRandomValues||(console.log("WARNING: Missing strong random number source; using weak randomBytes"),n={getRandomValues:function(e){for(var t=0;t<20;t++){ for(var r=0;r<e.length;r++){ t?e[r]^=Math.trunc(256*Math.random()):e[r]=Math.trunc(256*Math.random()); } }return e},_weakCrypto:!0}),s.randomBytes=i,!0===n._weakCrypto&&t.defineReadOnly(i,"_weakCrypto",!0);}).call(this,"undefined"!=typeof commonjsGlobal?commonjsGlobal:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});},{"../utils/bytes":63,"../utils/properties":73}],75:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0});var o=e("./bytes");function s(e){for(var t=[];e;){ t.unshift(255&e),e>>=8; }return t}function i(e,t,r){for(var n=0,i=0;i<r;i++){ n=256*n+e[t+i]; }return n}function a(e,t,r,n){for(var i=[];r<t+1+n;){var o=u(e,r);if(i.push(o.result),t+1+n<(r+=o.consumed)){ throw new Error("invalid rlp") }}return {consumed:1+n,result:i}}function u(e,t){if(0===e.length){ throw new Error("invalid rlp data"); }if(248<=e[t]){if(t+1+(r=e[t]-247)>e.length){ throw new Error("too short"); }if(t+1+r+(n=i(e,t+1,r))>e.length){ throw new Error("to short"); }return a(e,t,t+1+r,r+n)}if(192<=e[t]){if(t+1+(n=e[t]-192)>e.length){ throw new Error("invalid rlp data"); }return a(e,t,t+1,n)}if(184<=e[t]){var r;if(t+1+(r=e[t]-183)>e.length){ throw new Error("invalid rlp data"); }if(t+1+r+(n=i(e,t+1,r))>e.length){ throw new Error("invalid rlp data"); }return {consumed:1+r+n,result:o.hexlify(e.slice(t+1+r,t+1+r+n))}}if(128<=e[t]){var n;if(t+1+(n=e[t]-128)>e.length){ throw new Error("invlaid rlp data"); }return {consumed:1+n,result:o.hexlify(e.slice(t+1,t+1+n))}}return {consumed:1,result:o.hexlify(e[t])}}r.encode=function(e){return o.hexlify(function t(e){if(Array.isArray(e)){var r=[];return e.forEach(function(e){r=r.concat(t(e));}),r.length<=55?(r.unshift(192+r.length),r):((n=s(r.length)).unshift(247+n.length),n.concat(r))}var n,i=Array.prototype.slice.call(o.arrayify(e));return 1===i.length&&i[0]<=127?i:i.length<=55?(i.unshift(128+i.length),i):((n=s(i.length)).unshift(183+n.length),n.concat(i))}(e))},r.decode=function(e){var t=o.arrayify(e),r=u(t,0);if(r.consumed!==t.length){ throw new Error("invalid rlp data"); }return r.result};},{"./bytes":63}],76:[function(e,t,r){var n=this&&this.__importStar||function(e){if(e&&e.__esModule){ return e; }var t={};if(null!=e){ for(var r in e){ Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]); } }return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var i=e("elliptic"),o=e("./address"),s=e("./bytes"),a=e("./hash"),u=e("./keccak256"),l=e("./properties"),h=n(e("../errors")),f=null;function c(){return f=f||new i.ec("secp256k1")}var d=(p.prototype.sign=function(e){var t=c().keyFromPrivate(s.arrayify(this.privateKey)).sign(s.arrayify(e),{canonical:!0});return {recoveryParam:t.recoveryParam,r:s.hexZeroPad("0x"+t.r.toString(16),32),s:s.hexZeroPad("0x"+t.s.toString(16),32),v:27+t.recoveryParam}},p.prototype.computeSharedSecret=function(e){var t=c().keyFromPrivate(s.arrayify(this.privateKey)),r=c().keyFromPublic(s.arrayify(v(e)));return s.hexZeroPad("0x"+t.derive(r.getPublic()).toString(16),32)},p.prototype._addPoint=function(e){var t=c().keyFromPublic(s.arrayify(this.publicKey)),r=c().keyFromPublic(s.arrayify(e));return "0x"+t.pub.add(r.pub).encodeCompressed("hex")},p);function p(e){var t=c().keyFromPrivate(s.arrayify(e));l.defineReadOnly(this,"privateKey",s.hexlify(t.priv.toArray("be",32))),l.defineReadOnly(this,"publicKey","0x"+t.getPublic(!1,"hex")),l.defineReadOnly(this,"compressedPublicKey","0x"+t.getPublic(!0,"hex")),l.defineReadOnly(this,"publicKeyBytes",t.getPublic().encode(null,!0));}function v(e,t){var r=s.arrayify(e);if(32!==r.length){ return 33===r.length?t?s.hexlify(r):"0x"+c().keyFromPublic(r).getPublic(!1,"hex"):65===r.length?t?"0x"+c().keyFromPublic(r).getPublic(!0,"hex"):s.hexlify(r):(h.throwError("invalid public or private key",h.INVALID_ARGUMENT,{arg:"key",value:"[REDACTED]"}),null); }var n=new d(r);return t?n.compressedPublicKey:n.publicKey}function y(e){var t="0x"+v(e).slice(4);return o.getAddress("0x"+u.keccak256(t).substring(26))}function m(e,t){var r=s.splitSignature(t),n={r:s.arrayify(r.r),s:s.arrayify(r.s)};return "0x"+c().recoverPubKey(s.arrayify(e),n,r.recoveryParam).encode("hex",!1)}function g(e,t){return y(m(s.arrayify(e),t))}r.KeyPair=d,r.computePublicKey=v,r.computeAddress=y,r.recoverPublicKey=m,r.recoverAddress=g,r.verifyMessage=function(e,t){return g(a.hashMessage(e),t)};},{"../errors":5,"./address":59,"./bytes":63,"./hash":64,"./keccak256":70,"./properties":73,elliptic:12}],77:[function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},i=this&&this.__importStar||function(e){if(e&&e.__esModule){ return e; }var t={};if(null!=e){ for(var r in e){ Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]); } }return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var T=n(e("aes-js")),m=n(e("scrypt-js")),R=n(e("uuid")),O=e("./signing-key"),g=i(e("./hdnode")),b=e("./address"),C=e("./bytes"),w=e("./pbkdf2"),B=e("./keccak256"),p=e("./utf8"),D=e("./random-bytes");function _(e){return "string"==typeof e&&"0x"!==e.substring(0,2)&&(e="0x"+e),C.arrayify(e)}function L(e,t){for(e=String(e);e.length<t;){ e="0"+e; }return e}function U(e){return "string"==typeof e?p.toUtf8Bytes(e,p.UnicodeNormalizationForm.NFKC):C.arrayify(e)}function M(e,t){for(var r=e,n=t.toLowerCase().split("/"),i=0;i<n.length;i++){var o=null;for(var s in r){ if(s.toLowerCase()===n[i]){o=r[s];break} }if(null===o){ return null; }r=o;}return r}r.decryptCrowdsale=function(e,t){var r=JSON.parse(e);t=U(t);var n=b.getAddress(M(r,"ethaddr")),i=_(M(r,"encseed"));if(!i||i.length%16!=0){ throw new Error("invalid encseed"); }var o=w.pbkdf2(t,t,2e3,32,"sha256").slice(0,16),s=i.slice(0,16),a=i.slice(16),u=new T.default.ModeOfOperation.cbc(o,s),l=C.arrayify(u.decrypt(a));l=T.default.padding.pkcs7.strip(l);for(var h="",f=0;f<l.length;f++){ h+=String.fromCharCode(l[f]); }var c=p.toUtf8Bytes(h),d=new O.SigningKey(B.keccak256(c));if(d.address!==n){ throw new Error("corrupt crowdsale wallet"); }return d},r.decrypt=function(e,t,d){function p(e,t){var r=_(M(v,"crypto/ciphertext"));if(C.hexlify(function(e,t){return B.keccak256(C.concat([e,t]))}(e.slice(16,32),r)).substring(2)!==M(v,"crypto/mac").toLowerCase()){ return t(new Error("invalid password")),null; }var n=function(e,t){if("aes-128-ctr"!==M(v,"crypto/cipher")){ return null; }var r=_(M(v,"crypto/cipherparams/iv")),n=new T.default.Counter(r),i=new T.default.ModeOfOperation.ctr(e,n);return C.arrayify(i.decrypt(t))}(e.slice(0,16),r),i=e.slice(32,64);if(!n){ return t(new Error("unsupported cipher")),null; }var o=new O.SigningKey(n);if(o.address!==b.getAddress(v.address)){ return t(new Error("address mismatch")),null; }if("0.1"===M(v,"x-ethers/version")){var s=_(M(v,"x-ethers/mnemonicCiphertext")),a=_(M(v,"x-ethers/mnemonicCounter")),u=new T.default.Counter(a),l=new T.default.ModeOfOperation.ctr(i,u),h=M(v,"x-ethers/path")||g.defaultPath,f=C.arrayify(l.decrypt(s)),c=g.entropyToMnemonic(f),d=g.fromMnemonic(c).derivePath(h);if(d.privateKey!=C.hexlify(n)){ return t(new Error("mnemonic mismatch")),null; }o=new O.SigningKey(d);}return o}var v=JSON.parse(e),y=U(t);return new Promise(function(i,o){var e=M(v,"crypto/kdf");if(e&&"string"==typeof e){ if("scrypt"===e.toLowerCase()){var t=_(M(v,"crypto/kdfparams/salt")),r=parseInt(M(v,"crypto/kdfparams/n")),n=parseInt(M(v,"crypto/kdfparams/r")),s=parseInt(M(v,"crypto/kdfparams/p"));if(!r||!n||!s){ return void o(new Error("unsupported key-derivation function parameters")); }if(0!=(r&r-1)){ return void o(new Error("unsupported key-derivation function parameter value for N")); }if(32!==(l=parseInt(M(v,"crypto/kdfparams/dklen")))){ return void o(new Error("unsupported key-derivation derived-key length")); }d&&d(0),m.default(y,t,r,n,s,64,function(e,t,r){if(e){ e.progress=t,o(e); }else if(r){r=C.arrayify(r);var n=p(r,o);if(!n){ return; }d&&d(1),i(n);}else if(d){ return d(t) }});}else if("pbkdf2"===e.toLowerCase()){t=_(M(v,"crypto/kdfparams/salt"));var a=null,u=M(v,"crypto/kdfparams/prf");if("hmac-sha256"===u){ a="sha256"; }else{if("hmac-sha512"!==u){ return void o(new Error("unsupported prf")); }a="sha512";}var l,h=parseInt(M(v,"crypto/kdfparams/c"));if(32!==(l=parseInt(M(v,"crypto/kdfparams/dklen")))){ return void o(new Error("unsupported key-derivation derived-key length")); }var f=w.pbkdf2(y,t,h,l,a),c=p(f,o);if(!c){ return; }i(c);}else { o(new Error("unsupported key-derivation function")); } }else { o(new Error("unsupported key-derivation function")); }})},r.encrypt=function(e,t,r,w){"function"!=typeof r||w||(w=r,r={}),r=r||{};var _=null;if(32!==(_=O.SigningKey.isSigningKey(e)?C.arrayify(e.privateKey):C.arrayify(e)).length){ throw new Error("invalid private key"); }var n=U(t),M=null;if(r.entropy&&(M=C.arrayify(r.entropy)),r.mnemonic){ if(M){if(g.entropyToMnemonic(M)!==r.mnemonic){ throw new Error("entropy and mnemonic mismatch") }}else { M=C.arrayify(g.mnemonicToEntropy(r.mnemonic)); } }var A=r.path;M&&!A&&(A=g.defaultPath);var E=r.client;E=E||"ethers.js";var S=null;S=r.salt?C.arrayify(r.salt):D.randomBytes(32);var k=null;if(r.iv){if(16!==(k=C.arrayify(r.iv)).length){ throw new Error("invalid iv") }}else { k=D.randomBytes(16); }var N=null;if(r.uuid){if(16!==(N=C.arrayify(r.uuid)).length){ throw new Error("invalid uuid") }}else { N=D.randomBytes(16); }var P=1<<17,x=8,I=1;return r.scrypt&&(r.scrypt.N&&(P=r.scrypt.N),r.scrypt.r&&(x=r.scrypt.r),r.scrypt.p&&(I=r.scrypt.p)),new Promise(function(g,b){w&&w(0),m.default(n,S,P,x,I,64,function(e,t,r){if(e){ e.progress=t,b(e); }else if(r){var n=(r=C.arrayify(r)).slice(0,16),i=r.slice(16,32),o=r.slice(32,64),s=new O.SigningKey(_).address,a=new T.default.Counter(k),u=new T.default.ModeOfOperation.ctr(n,a),l=C.arrayify(u.encrypt(_)),h=B.keccak256(C.concat([i,l])),f={address:s.substring(2).toLowerCase(),id:R.default.v4({random:N}),version:3,Crypto:{cipher:"aes-128-ctr",cipherparams:{iv:C.hexlify(k).substring(2)},ciphertext:C.hexlify(l).substring(2),kdf:"scrypt",kdfparams:{salt:C.hexlify(S).substring(2),n:P,dklen:32,p:I,r:x},mac:h.substring(2)}};if(M){var c=D.randomBytes(16),d=new T.default.Counter(c),p=new T.default.ModeOfOperation.ctr(o,d),v=C.arrayify(p.encrypt(M)),y=new Date,m=y.getUTCFullYear()+"-"+L(y.getUTCMonth()+1,2)+"-"+L(y.getUTCDate(),2)+"T"+L(y.getUTCHours(),2)+"-"+L(y.getUTCMinutes(),2)+"-"+L(y.getUTCSeconds(),2)+".0Z";f["x-ethers"]={client:E,gethFilename:"UTC--"+m+"--"+f.address,mnemonicCounter:C.hexlify(c).substring(2),mnemonicCiphertext:C.hexlify(v).substring(2),path:A,version:"0.1"};}w&&w(1),g(JSON.stringify(f));}else if(w){ return w(t) }});})};},{"./address":59,"./bytes":63,"./hdnode":65,"./keccak256":70,"./pbkdf2":72,"./random-bytes":74,"./signing-key":80,"./utf8":84,"aes-js":8,"scrypt-js":43,uuid:47}],78:[function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0});var i=n(e("hash.js")),o=e("./bytes");r.ripemd160=function(e){return "0x"+i.default.ripemd160().update(o.arrayify(e)).digest("hex")},r.sha256=function(e){return "0x"+i.default.sha256().update(o.arrayify(e)).digest("hex")},r.sha512=function(e){return "0x"+i.default.sha512().update(o.arrayify(e)).digest("hex")};},{"./bytes":63,"hash.js":27}],79:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0}),e("setimmediate"),r.platform="browser";},{setimmediate:44}],80:[function(e,t,r){var n=this&&this.__importStar||function(e){if(e&&e.__esModule){ return e; }var t={};if(null!=e){ for(var r in e){ Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]); } }return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var i=e("./hdnode"),o=e("./bytes"),s=e("./properties"),a=e("./secp256k1"),u=n(e("../errors")),l=(h.prototype.signDigest=function(e){return this.keyPair.sign(e)},h.prototype.computeSharedSecret=function(e){return this.keyPair.computeSharedSecret(o.arrayify(e))},h.isSigningKey=function(e){return s.isType(e,"SigningKey")},h);function h(e){u.checkNew(this,h);var t=null;t=i.HDNode.isHDNode(e)?(s.defineReadOnly(this,"mnemonic",e.mnemonic),s.defineReadOnly(this,"path",e.path),o.arrayify(e.privateKey)):("string"==typeof e&&e.match(/^[0-9a-f]*$/i)&&64===e.length&&(e="0x"+e),o.arrayify(e));try{32!==t.length&&u.throwError("exactly 32 bytes required",u.INVALID_ARGUMENT,{arg:"privateKey",value:"[REDACTED]"});}catch(e){var r={arg:"privateKey",reason:e.reason,value:"[REDACTED]"};e.value&&("number"==typeof e.value.length&&(r.length=e.value.length),r.type=typeof e.value),u.throwError("invalid private key",e.code,r);}s.defineReadOnly(this,"privateKey",o.hexlify(t)),s.defineReadOnly(this,"keyPair",new a.KeyPair(t)),s.defineReadOnly(this,"publicKey",this.keyPair.publicKey),s.defineReadOnly(this,"address",a.computeAddress(this.keyPair.publicKey)),s.setType(this,"SigningKey");}r.SigningKey=l;},{"../errors":5,"./bytes":63,"./hdnode":65,"./properties":73,"./secp256k1":76}],81:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0});var u=e("./bignumber"),l=e("./bytes"),h=e("./utf8"),n=e("./keccak256"),i=e("./sha2"),f=new RegExp("^bytes([0-9]+)$"),c=new RegExp("^(u?int)([0-9]*)$"),d=new RegExp("^(.*)\\[([0-9]*)\\]$"),p="0000000000000000000000000000000000000000000000000000000000000000";function o(e,r){if(e.length!=r.length){ throw new Error("type/value count mismatch"); }var n=[];return e.forEach(function(e,t){n.push(function t(e,r,n){switch(e){case"address":return n?l.padZeros(r,32):l.arrayify(r);case"string":return h.toUtf8Bytes(r);case"bytes":return l.arrayify(r);case"bool":return r=r?"0x01":"0x00",n?l.padZeros(r,32):l.arrayify(r)}var i=e.match(c);if(i){if((o=parseInt(i[2]||"256"))%8!=0||0===o||256<o){ throw new Error("invalid number type - "+e); }return n&&(o=256),r=u.bigNumberify(r).toTwos(o),l.padZeros(r,o/8)}if(i=e.match(f)){var o=parseInt(i[1]);if(String(o)!=i[1]||0===o||32<o){ throw new Error("invalid number type - "+e); }if(l.arrayify(r).byteLength!==o){ throw new Error("invalid value for "+e); }return n?l.arrayify((r+p).substring(0,66)):r}if((i=e.match(d))&&Array.isArray(r)){var s=i[1];if(parseInt(i[2]||String(r.length))!=r.length){ throw new Error("invalid value for "+e); }var a=[];return r.forEach(function(e){a.push(t(s,e,!0));}),l.concat(a)}throw new Error("unknown type - "+e)}(e,r[t]));}),l.hexlify(l.concat(n))}r.pack=o,r.keccak256=function(e,t){return n.keccak256(o(e,t))},r.sha256=function(e,t){return i.sha256(o(e,t))};},{"./bignumber":62,"./bytes":63,"./keccak256":70,"./sha2":78,"./utf8":84}],82:[function(e,t,r){var n=this&&this.__importStar||function(e){if(e&&e.__esModule){ return e; }var t={};if(null!=e){ for(var r in e){ Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]); } }return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var i=e("../constants"),s=n(e("../errors")),a=e("./secp256k1"),u=e("./address"),l=e("./bignumber"),h=e("./bytes"),f=e("./keccak256"),c=e("./properties"),d=n(e("./rlp")),o=e("../providers/abstract-provider");function p(e){return "0x"===e?i.Zero:l.bigNumberify(e)}var v=[{name:"nonce",maxLength:32},{name:"gasPrice",maxLength:32},{name:"gasLimit",maxLength:32},{name:"to",length:20},{name:"value",maxLength:32},{name:"data"}],y={chainId:!0,data:!0,gasLimit:!0,gasPrice:!0,nonce:!0,to:!0,value:!0};r.serialize=function(r,e){c.checkProperties(r,y);var n=[];v.forEach(function(e){var t=r[e.name]||[];t=h.arrayify(h.hexlify(t)),e.length&&t.length!==e.length&&0<t.length&&s.throwError("invalid length for "+e.name,s.INVALID_ARGUMENT,{arg:"transaction"+e.name,value:t}),e.maxLength&&(t=h.stripZeros(t)).length>e.maxLength&&s.throwError("invalid length for "+e.name,s.INVALID_ARGUMENT,{arg:"transaction"+e.name,value:t}),n.push(h.hexlify(t));}),null!=r.chainId&&0!==r.chainId&&(n.push(h.hexlify(r.chainId)),n.push("0x"),n.push("0x"));var t=d.encode(n);if(!e){ return t; }var i=h.splitSignature(e),o=27+i.recoveryParam;return 9===n.length&&(n.pop(),n.pop(),n.pop(),o+=2*r.chainId+8),n.push(h.hexlify(o)),n.push(h.stripZeros(h.arrayify(i.r))),n.push(h.stripZeros(h.arrayify(i.s))),d.encode(n)},r.parse=function(e){var t=d.decode(e);9!==t.length&&6!==t.length&&s.throwError("invalid raw transaction",s.INVALID_ARGUMENT,{arg:"rawTransactin",value:e});var r={nonce:p(t[0]).toNumber(),gasPrice:p(t[1]),gasLimit:p(t[2]),to:function(e){return "0x"===e?null:u.getAddress(e)}(t[3]),value:p(t[4]),data:t[5],chainId:0};if(6===t.length){ return r; }try{r.v=l.bigNumberify(t[6]).toNumber();}catch(e){return s.info(e),r}if(r.r=h.hexZeroPad(t[7],32),r.s=h.hexZeroPad(t[8],32),l.bigNumberify(r.r).isZero()&&l.bigNumberify(r.s).isZero()){ r.chainId=r.v,r.v=0; }else{r.chainId=Math.floor((r.v-35)/2),r.chainId<0&&(r.chainId=0);var n=r.v-27,i=t.slice(0,6);0!==r.chainId&&(i.push(h.hexlify(r.chainId)),i.push("0x"),i.push("0x"),n-=2*r.chainId+8);var o=f.keccak256(d.encode(i));try{r.from=a.recoverAddress(o,{r:h.hexlify(r.r),s:h.hexlify(r.s),recoveryParam:n});}catch(e){s.info(e);}r.hash=f.keccak256(e);}return r},r.populateTransaction=function(e,t,r){o.Provider.isProvider(t)||s.throwError("missing provider",s.INVALID_ARGUMENT,{argument:"provider",value:t}),c.checkProperties(e,y);var n=c.shallowCopy(e);if(null!=n.to&&(n.to=t.resolveName(n.to)),null==n.gasPrice&&(n.gasPrice=t.getGasPrice()),null==n.nonce&&(n.nonce=t.getTransactionCount(r)),null==n.gasLimit){var i=c.shallowCopy(n);i.from=r,n.gasLimit=t.estimateGas(i);}return null==n.chainId&&(n.chainId=t.getNetwork().then(function(e){return e.chainId})),c.resolveProperties(n)};},{"../constants":3,"../errors":5,"../providers/abstract-provider":49,"./address":59,"./bignumber":62,"./bytes":63,"./keccak256":70,"./properties":73,"./rlp":75,"./secp256k1":76}],83:[function(e,t,r){var n=this&&this.__importStar||function(e){if(e&&e.__esModule){ return e; }var t={};if(null!=e){ for(var r in e){ Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]); } }return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var i,h=e("../constants"),f=n(e("../errors")),c=e("./bignumber"),o={};function s(e){return {decimals:e.length-1,tenPower:c.bigNumberify(e)}}function d(e){var t=o[String(e).toLowerCase()];if(!t&&"number"==typeof e&&parseInt(String(e))==e&&0<=e&&e<=256){for(var r="1",n=0;n<e;n++){ r+="0"; }t=s(r);}return t||f.throwError("invalid unitType",f.INVALID_ARGUMENT,{argument:"name",value:e}),t}function a(e,t){var r=d(t),n=(e=c.bigNumberify(e)).lt(h.Zero);n&&(e=e.mul(h.NegativeOne));for(var i=e.mod(r.tenPower).toString();i.length<r.decimals;){ i="0"+i; }return i=i.match(/^([0-9]*[1-9]|0)(0*)/)[1],e=e.div(r.tenPower).toString()+"."+i,n&&(e="-"+e),e}function u(e,t){null==t&&(t=18);var r=d(t);if("string"==typeof e&&e.match(/^-?[0-9.,]+$/)||f.throwError("invalid decimal value",f.INVALID_ARGUMENT,{arg:"value",value:e}),0===r.decimals){ return c.bigNumberify(e); }var n="-"===e.substring(0,1);n&&(e=e.substring(1)),"."===e&&f.throwError("missing value",f.INVALID_ARGUMENT,{arg:"value",value:e});var i=e.split(".");2<i.length&&f.throwError("too many decimal points",f.INVALID_ARGUMENT,{arg:"value",value:e});var o=i[0],s=i[1];for(o=o||"0",(s=s||"0").length>r.decimals&&f.throwError("underflow occurred",f.NUMERIC_FAULT,{operation:"division",fault:"underflow"});s.length<r.decimals;){ s+="0"; }var a=c.bigNumberify(o),u=c.bigNumberify(s),l=a.mul(r.tenPower).add(u);return n&&(l=l.mul(h.NegativeOne)),l}i="1",["wei","kwei","Mwei","Gwei","szabo","finney","ether"].forEach(function(e){var t=s(i);o[e.toLowerCase()]=t,o[String(t.decimals)]=t,i+="000";}),r.commify=function(e){var t=String(e).split(".");(2<t.length||!t[0].match(/^-?[0-9]*$/)||t[1]&&!t[1].match(/^[0-9]*$/)||"."===e||"-."===e)&&f.throwError("invalid value",f.INVALID_ARGUMENT,{argument:"value",value:e});var r=t[0],n="";for("-"===r.substring(0,1)&&(n="-",r=r.substring(1));"0"===r.substring(0,1);){ r=r.substring(1); }""===r&&(r="0");var i="";2===t.length&&(i="."+(t[1]||"0"));for(var o=[];r.length;){if(r.length<=3){o.unshift(r);break}var s=r.length-3;o.unshift(r.substring(s)),r=r.substring(0,s);}return n+o.join(",")+i},r.formatUnits=a,r.parseUnits=u,r.formatEther=function(e){return a(e,18)},r.parseEther=function(e){return u(e,18)};},{"../constants":3,"../errors":5,"./bignumber":62}],84:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0});var s,n,i=e("../constants"),a=e("../errors"),h=e("./bytes");function o(e,t){void 0===t&&(t=s.current),t!=s.current&&(a.checkNormalize(),e=e.normalize(t));for(var r=[],n=0;n<e.length;n++){var i=e.charCodeAt(n);if(i<128){ r.push(i); }else if(i<2048){ r.push(i>>6|192),r.push(63&i|128); }else if(55296==(64512&i)){n++;var o=e.charCodeAt(n);if(n>=e.length||56320!=(64512&o)){ throw new Error("invalid utf-8 string"); }i=65536+((1023&i)<<10)+(1023&o),r.push(i>>18|240),r.push(i>>12&63|128),r.push(i>>6&63|128),r.push(63&i|128);}else { r.push(i>>12|224),r.push(i>>6&63|128),r.push(63&i|128); }}return h.arrayify(r)}function u(e,t){e=h.arrayify(e);for(var r="",n=0;n<e.length;){var i=e[n++];if(i>>7!=0){var o=null,s=null;if(192==(224&i)){ o=1,s=127; }else if(224==(240&i)){ o=2,s=2047; }else{if(240!=(248&i)){if(t){ continue; }if(128==(192&i)){ throw new Error("invalid utf8 byte sequence; unexpected continuation byte"); }throw new Error("invalid utf8 byte sequence; invalid prefix")}o=3,s=65535;}if(n+o>e.length){if(!t){ throw new Error("invalid utf8 byte sequence; too short"); }for(;n<e.length&&e[n]>>6==2;n++){ }}else{for(var a=i&(1<<8-o-1)-1,u=0;u<o;u++){var l=e[n];if(128!=(192&l)){a=null;break}a=a<<6|63&l,n++;}if(null!==a){ if(a<=s){if(!t){ throw new Error("invalid utf8 byte sequence; overlong") }}else if(1114111<a){if(!t){ throw new Error("invalid utf8 byte sequence; out-of-range") }}else if(55296<=a&&a<=57343){if(!t){ throw new Error("invalid utf8 byte sequence; utf-16 surrogate") }}else { a<=65535?r+=String.fromCharCode(a):(a-=65536,r+=String.fromCharCode(55296+(a>>10&1023),56320+(1023&a))); } }else if(!t){ throw new Error("invalid utf8 byte sequence; invalid continuation byte") }}}else { r+=String.fromCharCode(i); }}return r}(n=s=r.UnicodeNormalizationForm||(r.UnicodeNormalizationForm={})).current="",n.NFC="NFC",n.NFD="NFD",n.NFKC="NFKC",n.NFKD="NFKD",r.toUtf8Bytes=o,r.toUtf8String=u,r.formatBytes32String=function(e){var t=o(e);if(31<t.length){ throw new Error("bytes32 string must be less than 32 bytes"); }return h.hexlify(h.concat([t,i.HashZero]).slice(0,32))},r.parseBytes32String=function(e){var t=h.arrayify(e);if(32!==t.length){ throw new Error("invalid bytes32 - not 32 bytes long"); }if(0!==t[31]){ throw new Error("invalid bytes32 string - no null terminator"); }for(var r=31;0===t[r-1];){ r--; }return u(t.slice(0,r))};},{"../constants":3,"../errors":5,"./bytes":63}],85:[function(e,t,r){var n=this&&this.__importStar||function(e){if(e&&e.__esModule){ return e; }var t={};if(null!=e){ for(var r in e){ Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]); } }return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var f=e("xmlhttprequest"),i=e("./base64"),o=e("./properties"),s=e("./utf8"),c=n(e("../errors"));r.fetchJson=function(e,a,u){var r={},l=null,h=12e4;if("string"==typeof e){ l=e; }else if("object"==typeof e){if(null==e.url&&c.throwError("missing URL",c.MISSING_ARGUMENT,{arg:"url"}),l=e.url,"number"==typeof e.timeout&&0<e.timeout&&(h=e.timeout),e.headers){ for(var t in e.headers){ r[t.toLowerCase()]={key:t,value:String(e.headers[t])}; } }if(null!=e.user&&null!=e.password){"https:"!==l.substring(0,6)&&!0!==e.allowInsecure&&c.throwError("basic authentication requires a secure https url",c.INVALID_ARGUMENT,{arg:"url",url:l,user:e.user,password:"[REDACTED]"});var n=e.user+":"+e.password;r.authorization={key:"Authorization",value:"Basic "+i.encode(s.toUtf8Bytes(n))};}}return new Promise(function(n,i){var o=new f.XMLHttpRequest,e=null;e=setTimeout(function(){null!=e&&(e=null,i(new Error("timeout")),setTimeout(function(){o.abort();},0));},h);function s(){null!=e&&(clearTimeout(e),e=null);}a?(o.open("POST",l,!0),r["content-type"]={key:"Content-Type",value:"application/json"}):o.open("GET",l,!0),Object.keys(r).forEach(function(e){var t=r[e];o.setRequestHeader(t.key,t.value);}),o.onreadystatechange=function(){if(4===o.readyState){if(200!=o.status){s();var e=new Error("invalid response - "+o.status);return e.statusCode=o.status,o.responseText&&(e.responseText=o.responseText),void i(e)}var t=null;try{t=JSON.parse(o.responseText);}catch(e){s();var r=new Error("invalid json response");return r.orginialError=e,r.responseText=o.responseText,null!=a&&(r.requestBody=a),r.url=l,void i(r)}if(u){ try{t=u(t);}catch(e){return s(),e.url=l,e.body=a,e.responseText=o.responseText,void i(e)} }s(),n(t);}},o.onerror=function(e){s(),i(e);};try{null!=a?o.send(a):o.send();}catch(e){s();var t=new Error("connection error");t.error=e,i(t);}})},r.poll=function(u,l){return l=l||{},null==(l=o.shallowCopy(l)).floor&&(l.floor=0),null==l.ceiling&&(l.ceiling=1e4),null==l.interval&&(l.interval=250),new Promise(function(n,t){var e=null,i=!1,o=function(){return !i&&(i=!0,e&&clearTimeout(e),!0)};l.timeout&&(e=setTimeout(function(){o()&&t(new Error("timeout"));},l.timeout));var s=l.fastRetry||null,a=0;!function r(){return u().then(function(e){if(void 0!==e){ o()&&n(e); }else if(l.onceBlock){ l.onceBlock.once("block",r); }else if(!i){a++;var t=l.interval*parseInt(String(Math.random()*Math.pow(2,a)));t<l.floor&&(t=l.floor),t>l.ceiling&&(t=l.ceiling),s&&(a--,t=s,s=null),setTimeout(r,t);}return null},function(e){o()&&t(e);})}();})};},{"../errors":5,"./base64":60,"./properties":73,"./utf8":84,xmlhttprequest:48}],86:[function(o,e,s){(function(e){Object.defineProperty(s,"__esModule",{value:!0});var i=o("../utils/hash"),t=o("../utils/properties");s.check=function(e){for(var t=[],r=0;r<2048;r++){var n=e.getWord(r);if(r!==e.getWordIndex(n)){ return "0x"; }t.push(n);}return i.id(t.join("\n")+"\n")};var r=(n.prototype.split=function(e){return e.toLowerCase().split(/ +/g)},n.prototype.join=function(e){return e.join(" ")},n);function n(e){t.defineReadOnly(this,"locale",e);}s.Wordlist=r,s.register=function(e,t){t=t||e.locale;};}).call(this,"undefined"!=typeof commonjsGlobal?commonjsGlobal:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});},{"../utils/hash":64,"../utils/properties":73}],87:[function(e,t,r){var n,i=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t;}||function(e,t){for(var r in t){ t.hasOwnProperty(r)&&(e[r]=t[r]); }},function(e,t){function r(){this.constructor=e;}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r);}),o=this&&this.__importStar||function(e){if(e&&e.__esModule){ return e; }var t={};if(null!=e){ for(var r in e){ Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]); } }return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var s,a=e("./utils/bytes"),u=e("./utils/hash"),l=e("./utils/hdnode"),h=e("./utils/json-wallet"),f=e("./utils/keccak256"),c=e("./utils/properties"),d=e("./utils/random-bytes"),p=o(e("./utils/secret-storage")),v=e("./utils/signing-key"),y=e("./utils/transaction"),m=e("./abstract-signer"),g=e("./providers/abstract-provider"),b=o(e("./errors")),w=(s=m.Signer,i(_,s),Object.defineProperty(_.prototype,"address",{get:function(){return this.signingKey.address},enumerable:!0,configurable:!0}),Object.defineProperty(_.prototype,"mnemonic",{get:function(){return this.signingKey.mnemonic},enumerable:!0,configurable:!0}),Object.defineProperty(_.prototype,"path",{get:function(){return this.signingKey.path},enumerable:!0,configurable:!0}),Object.defineProperty(_.prototype,"privateKey",{get:function(){return this.signingKey.privateKey},enumerable:!0,configurable:!0}),_.prototype.connect=function(e){return g.Provider.isProvider(e)||b.throwError("invalid provider",b.INVALID_ARGUMENT,{argument:"provider",value:e}),new _(this.signingKey,e)},_.prototype.getAddress=function(){return Promise.resolve(this.address)},_.prototype.sign=function(e){var n=this;return c.resolveProperties(e).then(function(e){var t=y.serialize(e),r=n.signingKey.signDigest(f.keccak256(t));return y.serialize(e,r)})},_.prototype.signMessage=function(e){return Promise.resolve(a.joinSignature(this.signingKey.signDigest(u.hashMessage(e))))},_.prototype.getBalance=function(e){if(!this.provider){ throw new Error("missing provider"); }return this.provider.getBalance(this.address,e)},_.prototype.getTransactionCount=function(e){if(!this.provider){ throw new Error("missing provider"); }return this.provider.getTransactionCount(this.address,e)},_.prototype.sendTransaction=function(e){var t=this;if(!this.provider){ throw new Error("missing provider"); }return null==e.nonce&&((e=c.shallowCopy(e)).nonce=this.getTransactionCount("pending")),y.populateTransaction(e,this.provider,this.address).then(function(e){return t.sign(e).then(function(e){return t.provider.sendTransaction(e)})})},_.prototype.encrypt=function(e,t,r){if("function"!=typeof t||r||(r=t,t={}),r&&"function"!=typeof r){ throw new Error("invalid callback"); }return t=t||{},this.mnemonic&&((t=c.shallowCopy(t)).mnemonic=this.mnemonic,t.path=this.path),p.encrypt(this.privateKey,e,t,r)},_.createRandom=function(e){var t=d.randomBytes(16);(e=e||{}).extraEntropy&&(t=a.arrayify(f.keccak256(a.concat([t,e.extraEntropy])).substring(0,34)));var r=l.entropyToMnemonic(t,e.locale);return _.fromMnemonic(r,e.path,e.locale)},_.fromEncryptedJson=function(e,t,r){if(h.isCrowdsaleWallet(e)){ try{r&&r(0);var n=p.decryptCrowdsale(e,t);return r&&r(1),Promise.resolve(new _(n))}catch(e){return Promise.reject(e)} }else if(h.isSecretStorageWallet(e)){ return p.decrypt(e,t,r).then(function(e){return new _(e)}); }return Promise.reject("invalid wallet JSON")},_.fromMnemonic=function(e,t,r){return t=t||l.defaultPath,new _(l.fromMnemonic(e,r).derivePath(t))},_);function _(e,t){var r=s.call(this)||this;return b.checkNew(r,_),v.SigningKey.isSigningKey(e)?c.defineReadOnly(r,"signingKey",e):c.defineReadOnly(r,"signingKey",new v.SigningKey(e)),c.defineReadOnly(r,"provider",t),r}r.Wallet=w;},{"./abstract-signer":2,"./errors":5,"./providers/abstract-provider":49,"./utils/bytes":63,"./utils/hash":64,"./utils/hdnode":65,"./utils/json-wallet":69,"./utils/keccak256":70,"./utils/properties":73,"./utils/random-bytes":74,"./utils/secret-storage":77,"./utils/signing-key":80,"./utils/transaction":82}],88:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0});var n=e("../wordlists/lang-en").langEn;r.en=n;},{"../wordlists/lang-en":89}],89:[function(e,t,r){var n,i=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t;}||function(e,t){for(var r in t){ t.hasOwnProperty(r)&&(e[r]=t[r]); }},function(e,t){function r(){this.constructor=e;}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r);});Object.defineProperty(r,"__esModule",{value:!0});var o,s=e("../utils/wordlist"),a="AbandonAbilityAbleAboutAboveAbsentAbsorbAbstractAbsurdAbuseAccessAccidentAccountAccuseAchieveAcidAcousticAcquireAcrossActActionActorActressActualAdaptAddAddictAddressAdjustAdmitAdultAdvanceAdviceAerobicAffairAffordAfraidAgainAgeAgentAgreeAheadAimAirAirportAisleAlarmAlbumAlcoholAlertAlienAllAlleyAllowAlmostAloneAlphaAlreadyAlsoAlterAlwaysAmateurAmazingAmongAmountAmusedAnalystAnchorAncientAngerAngleAngryAnimalAnkleAnnounceAnnualAnotherAnswerAntennaAntiqueAnxietyAnyApartApologyAppearAppleApproveAprilArchArcticAreaArenaArgueArmArmedArmorArmyAroundArrangeArrestArriveArrowArtArtefactArtistArtworkAskAspectAssaultAssetAssistAssumeAsthmaAthleteAtomAttackAttendAttitudeAttractAuctionAuditAugustAuntAuthorAutoAutumnAverageAvocadoAvoidAwakeAwareAwayAwesomeAwfulAwkwardAxisBabyBachelorBaconBadgeBagBalanceBalconyBallBambooBananaBannerBarBarelyBargainBarrelBaseBasicBasketBattleBeachBeanBeautyBecauseBecomeBeefBeforeBeginBehaveBehindBelieveBelowBeltBenchBenefitBestBetrayBetterBetweenBeyondBicycleBidBikeBindBiologyBirdBirthBitterBlackBladeBlameBlanketBlastBleakBlessBlindBloodBlossomBlouseBlueBlurBlushBoardBoatBodyBoilBombBoneBonusBookBoostBorderBoringBorrowBossBottomBounceBoxBoyBracketBrainBrandBrassBraveBreadBreezeBrickBridgeBriefBrightBringBriskBroccoliBrokenBronzeBroomBrotherBrownBrushBubbleBuddyBudgetBuffaloBuildBulbBulkBulletBundleBunkerBurdenBurgerBurstBusBusinessBusyButterBuyerBuzzCabbageCabinCableCactusCageCakeCallCalmCameraCampCanCanalCancelCandyCannonCanoeCanvasCanyonCapableCapitalCaptainCarCarbonCardCargoCarpetCarryCartCaseCashCasinoCastleCasualCatCatalogCatchCategoryCattleCaughtCauseCautionCaveCeilingCeleryCementCensusCenturyCerealCertainChairChalkChampionChangeChaosChapterChargeChaseChatCheapCheckCheeseChefCherryChestChickenChiefChildChimneyChoiceChooseChronicChuckleChunkChurnCigarCinnamonCircleCitizenCityCivilClaimClapClarifyClawClayCleanClerkCleverClickClientCliffClimbClinicClipClockClogCloseClothCloudClownClubClumpClusterClutchCoachCoastCoconutCodeCoffeeCoilCoinCollectColorColumnCombineComeComfortComicCommonCompanyConcertConductConfirmCongressConnectConsiderControlConvinceCookCoolCopperCopyCoralCoreCornCorrectCostCottonCouchCountryCoupleCourseCousinCoverCoyoteCrackCradleCraftCramCraneCrashCraterCrawlCrazyCreamCreditCreekCrewCricketCrimeCrispCriticCropCrossCrouchCrowdCrucialCruelCruiseCrumbleCrunchCrushCryCrystalCubeCultureCupCupboardCuriousCurrentCurtainCurveCushionCustomCuteCycleDadDamageDampDanceDangerDaringDashDaughterDawnDayDealDebateDebrisDecadeDecemberDecideDeclineDecorateDecreaseDeerDefenseDefineDefyDegreeDelayDeliverDemandDemiseDenialDentistDenyDepartDependDepositDepthDeputyDeriveDescribeDesertDesignDeskDespairDestroyDetailDetectDevelopDeviceDevoteDiagramDialDiamondDiaryDiceDieselDietDifferDigitalDignityDilemmaDinnerDinosaurDirectDirtDisagreeDiscoverDiseaseDishDismissDisorderDisplayDistanceDivertDivideDivorceDizzyDoctorDocumentDogDollDolphinDomainDonateDonkeyDonorDoorDoseDoubleDoveDraftDragonDramaDrasticDrawDreamDressDriftDrillDrinkDripDriveDropDrumDryDuckDumbDuneDuringDustDutchDutyDwarfDynamicEagerEagleEarlyEarnEarthEasilyEastEasyEchoEcologyEconomyEdgeEditEducateEffortEggEightEitherElbowElderElectricElegantElementElephantElevatorEliteElseEmbarkEmbodyEmbraceEmergeEmotionEmployEmpowerEmptyEnableEnactEndEndlessEndorseEnemyEnergyEnforceEngageEngineEnhanceEnjoyEnlistEnoughEnrichEnrollEnsureEnterEntireEntryEnvelopeEpisodeEqualEquipEraEraseErodeErosionErrorEruptEscapeEssayEssenceEstateEternalEthicsEvidenceEvilEvokeEvolveExactExampleExcessExchangeExciteExcludeExcuseExecuteExerciseExhaustExhibitExileExistExitExoticExpandExpectExpireExplainExposeExpressExtendExtraEyeEyebrowFabricFaceFacultyFadeFaintFaithFallFalseFameFamilyFamousFanFancyFantasyFarmFashionFatFatalFatherFatigueFaultFavoriteFeatureFebruaryFederalFeeFeedFeelFemaleFenceFestivalFetchFeverFewFiberFictionFieldFigureFileFilmFilterFinalFindFineFingerFinishFireFirmFirstFiscalFishFitFitnessFixFlagFlameFlashFlatFlavorFleeFlightFlipFloatFlockFloorFlowerFluidFlushFlyFoamFocusFogFoilFoldFollowFoodFootForceForestForgetForkFortuneForumForwardFossilFosterFoundFoxFragileFrameFrequentFreshFriendFringeFrogFrontFrostFrownFrozenFruitFuelFunFunnyFurnaceFuryFutureGadgetGainGalaxyGalleryGameGapGarageGarbageGardenGarlicGarmentGasGaspGateGatherGaugeGazeGeneralGeniusGenreGentleGenuineGestureGhostGiantGiftGiggleGingerGiraffeGirlGiveGladGlanceGlareGlassGlideGlimpseGlobeGloomGloryGloveGlowGlueGoatGoddessGoldGoodGooseGorillaGospelGossipGovernGownGrabGraceGrainGrantGrapeGrassGravityGreatGreenGridGriefGritGroceryGroupGrowGruntGuardGuessGuideGuiltGuitarGunGymHabitHairHalfHammerHamsterHandHappyHarborHardHarshHarvestHatHaveHawkHazardHeadHealthHeartHeavyHedgehogHeightHelloHelmetHelpHenHeroHiddenHighHillHintHipHireHistoryHobbyHockeyHoldHoleHolidayHollowHomeHoneyHoodHopeHornHorrorHorseHospitalHostHotelHourHoverHubHugeHumanHumbleHumorHundredHungryHuntHurdleHurryHurtHusbandHybridIceIconIdeaIdentifyIdleIgnoreIllIllegalIllnessImageImitateImmenseImmuneImpactImposeImproveImpulseInchIncludeIncomeIncreaseIndexIndicateIndoorIndustryInfantInflictInformInhaleInheritInitialInjectInjuryInmateInnerInnocentInputInquiryInsaneInsectInsideInspireInstallIntactInterestIntoInvestInviteInvolveIronIslandIsolateIssueItemIvoryJacketJaguarJarJazzJealousJeansJellyJewelJobJoinJokeJourneyJoyJudgeJuiceJumpJungleJuniorJunkJustKangarooKeenKeepKetchupKeyKickKidKidneyKindKingdomKissKitKitchenKiteKittenKiwiKneeKnifeKnockKnowLabLabelLaborLadderLadyLakeLampLanguageLaptopLargeLaterLatinLaughLaundryLavaLawLawnLawsuitLayerLazyLeaderLeafLearnLeaveLectureLeftLegLegalLegendLeisureLemonLendLengthLensLeopardLessonLetterLevelLiarLibertyLibraryLicenseLifeLiftLightLikeLimbLimitLinkLionLiquidListLittleLiveLizardLoadLoanLobsterLocalLockLogicLonelyLongLoopLotteryLoudLoungeLoveLoyalLuckyLuggageLumberLunarLunchLuxuryLyricsMachineMadMagicMagnetMaidMailMainMajorMakeMammalManManageMandateMangoMansionManualMapleMarbleMarchMarginMarineMarketMarriageMaskMassMasterMatchMaterialMathMatrixMatterMaximumMazeMeadowMeanMeasureMeatMechanicMedalMediaMelodyMeltMemberMemoryMentionMenuMercyMergeMeritMerryMeshMessageMetalMethodMiddleMidnightMilkMillionMimicMindMinimumMinorMinuteMiracleMirrorMiseryMissMistakeMixMixedMixtureMobileModelModifyMomMomentMonitorMonkeyMonsterMonthMoonMoralMoreMorningMosquitoMotherMotionMotorMountainMouseMoveMovieMuchMuffinMuleMultiplyMuscleMuseumMushroomMusicMustMutualMyselfMysteryMythNaiveNameNapkinNarrowNastyNationNatureNearNeckNeedNegativeNeglectNeitherNephewNerveNestNetNetworkNeutralNeverNewsNextNiceNightNobleNoiseNomineeNoodleNormalNorthNoseNotableNoteNothingNoticeNovelNowNuclearNumberNurseNutOakObeyObjectObligeObscureObserveObtainObviousOccurOceanOctoberOdorOffOfferOfficeOftenOilOkayOldOliveOlympicOmitOnceOneOnionOnlineOnlyOpenOperaOpinionOpposeOptionOrangeOrbitOrchardOrderOrdinaryOrganOrientOriginalOrphanOstrichOtherOutdoorOuterOutputOutsideOvalOvenOverOwnOwnerOxygenOysterOzonePactPaddlePagePairPalacePalmPandaPanelPanicPantherPaperParadeParentParkParrotPartyPassPatchPathPatientPatrolPatternPausePavePaymentPeacePeanutPearPeasantPelicanPenPenaltyPencilPeoplePepperPerfectPermitPersonPetPhonePhotoPhrasePhysicalPianoPicnicPicturePiecePigPigeonPillPilotPinkPioneerPipePistolPitchPizzaPlacePlanetPlasticPlatePlayPleasePledgePluckPlugPlungePoemPoetPointPolarPolePolicePondPonyPoolPopularPortionPositionPossiblePostPotatoPotteryPovertyPowderPowerPracticePraisePredictPreferPreparePresentPrettyPreventPricePridePrimaryPrintPriorityPrisonPrivatePrizeProblemProcessProduceProfitProgramProjectPromoteProofPropertyProsperProtectProudProvidePublicPuddingPullPulpPulsePumpkinPunchPupilPuppyPurchasePurityPurposePursePushPutPuzzlePyramidQualityQuantumQuarterQuestionQuickQuitQuizQuoteRabbitRaccoonRaceRackRadarRadioRailRainRaiseRallyRampRanchRandomRangeRapidRareRateRatherRavenRawRazorReadyRealReasonRebelRebuildRecallReceiveRecipeRecordRecycleReduceReflectReformRefuseRegionRegretRegularRejectRelaxReleaseReliefRelyRemainRememberRemindRemoveRenderRenewRentReopenRepairRepeatReplaceReportRequireRescueResembleResistResourceResponseResultRetireRetreatReturnReunionRevealReviewRewardRhythmRibRibbonRiceRichRideRidgeRifleRightRigidRingRiotRippleRiskRitualRivalRiverRoadRoastRobotRobustRocketRomanceRoofRookieRoomRoseRotateRoughRoundRouteRoyalRubberRudeRugRuleRunRunwayRuralSadSaddleSadnessSafeSailSaladSalmonSalonSaltSaluteSameSampleSandSatisfySatoshiSauceSausageSaveSayScaleScanScareScatterSceneSchemeSchoolScienceScissorsScorpionScoutScrapScreenScriptScrubSeaSearchSeasonSeatSecondSecretSectionSecuritySeedSeekSegmentSelectSellSeminarSeniorSenseSentenceSeriesServiceSessionSettleSetupSevenShadowShaftShallowShareShedShellSheriffShieldShiftShineShipShiverShockShoeShootShopShortShoulderShoveShrimpShrugShuffleShySiblingSickSideSiegeSightSignSilentSilkSillySilverSimilarSimpleSinceSingSirenSisterSituateSixSizeSkateSketchSkiSkillSkinSkirtSkullSlabSlamSleepSlenderSliceSlideSlightSlimSloganSlotSlowSlushSmallSmartSmileSmokeSmoothSnackSnakeSnapSniffSnowSoapSoccerSocialSockSodaSoftSolarSoldierSolidSolutionSolveSomeoneSongSoonSorrySortSoulSoundSoupSourceSouthSpaceSpareSpatialSpawnSpeakSpecialSpeedSpellSpendSphereSpiceSpiderSpikeSpinSpiritSplitSpoilSponsorSpoonSportSpotSpraySpreadSpringSpySquareSqueezeSquirrelStableStadiumStaffStageStairsStampStandStartStateStaySteakSteelStemStepStereoStickStillStingStockStomachStoneStoolStoryStoveStrategyStreetStrikeStrongStruggleStudentStuffStumbleStyleSubjectSubmitSubwaySuccessSuchSuddenSufferSugarSuggestSuitSummerSunSunnySunsetSuperSupplySupremeSureSurfaceSurgeSurpriseSurroundSurveySuspectSustainSwallowSwampSwapSwarmSwearSweetSwiftSwimSwingSwitchSwordSymbolSymptomSyrupSystemTableTackleTagTailTalentTalkTankTapeTargetTaskTasteTattooTaxiTeachTeamTellTenTenantTennisTentTermTestTextThankThatThemeThenTheoryThereTheyThingThisThoughtThreeThriveThrowThumbThunderTicketTideTigerTiltTimberTimeTinyTipTiredTissueTitleToastTobaccoTodayToddlerToeTogetherToiletTokenTomatoTomorrowToneTongueTonightToolToothTopTopicToppleTorchTornadoTortoiseTossTotalTouristTowardTowerTownToyTrackTradeTrafficTragicTrainTransferTrapTrashTravelTrayTreatTreeTrendTrialTribeTrickTriggerTrimTripTrophyTroubleTruckTrueTrulyTrumpetTrustTruthTryTubeTuitionTumbleTunaTunnelTurkeyTurnTurtleTwelveTwentyTwiceTwinTwistTwoTypeTypicalUglyUmbrellaUnableUnawareUncleUncoverUnderUndoUnfairUnfoldUnhappyUniformUniqueUnitUniverseUnknownUnlockUntilUnusualUnveilUpdateUpgradeUpholdUponUpperUpsetUrbanUrgeUsageUseUsedUsefulUselessUsualUtilityVacantVacuumVagueValidValleyValveVanVanishVaporVariousVastVaultVehicleVelvetVendorVentureVenueVerbVerifyVersionVeryVesselVeteranViableVibrantViciousVictoryVideoViewVillageVintageViolinVirtualVirusVisaVisitVisualVitalVividVocalVoiceVoidVolcanoVolumeVoteVoyageWageWagonWaitWalkWallWalnutWantWarfareWarmWarriorWashWaspWasteWaterWaveWayWealthWeaponWearWeaselWeatherWebWeddingWeekendWeirdWelcomeWestWetWhaleWhatWheatWheelWhenWhereWhipWhisperWideWidthWifeWildWillWinWindowWineWingWinkWinnerWinterWireWisdomWiseWishWitnessWolfWomanWonderWoodWoolWordWorkWorldWorryWorthWrapWreckWrestleWristWriteWrongYardYearYellowYouYoungYouthZebraZeroZoneZoo",u=null;function l(e){if(null==u&&(u=a.replace(/([A-Z])/g," $1").toLowerCase().substring(1).split(" "),"0x3c8acc1e7b08d8e76f9fda015ef48dc8c710a73cb7e0f77b2c18a9b5a7adde60"!==s.check(e))){ throw u=null,new Error("BIP39 Wordlist for en (English) FAILED") }}function h(){return o.call(this,"en")||this}var f=new(o=s.Wordlist,i(h,o),h.prototype.getWord=function(e){return l(this),u[e]},h.prototype.getWordIndex=function(e){return l(this),u.indexOf(e)},h);r.langEn=f,s.register(f);},{"../utils/wordlist":86}]},{},[7])(7)});

  });

  var ethers$1 = unwrapExports(ethers_min);

  var disperse = {
    abi: [
      'function disperseEther(address[] recipients, uint256[] values)',
      'function disperseToken(address token, address[] recipients, uint256[] values)',
      'function disperseTokenSimple(address token, address[] recipients, uint256[] values)' ],
    address: {
      1: '0xD152f549545093347A162Dce210e7293f1452150',     // mainnet
      3: '0xD152f549545093347A162Dce210e7293f1452150',     // ropsten
      4: '0xD152f549545093347A162Dce210e7293f1452150',     // rinkeby
      5: '0xD152f549545093347A162Dce210e7293f1452150',     // goerli
      42: '0xD152f549545093347A162Dce210e7293f1452150',    // kovan
      56: '0xD152f549545093347A162Dce210e7293f1452150',    // bsc mainnet
      77: '0xD152f549545093347A162Dce210e7293f1452150',    // poa sokol
      99: '0xD152f549545093347A162Dce210e7293f1452150',    // poa network
      100: '0xD152f549545093347A162Dce210e7293f1452150',   // xdai chain
      136: '0xD152f549545093347A162Dce210e7293f1452150',   // matic
      163: '0xD152f549545093347A162Dce210e7293f1452150',   // lightstreams
      5777: '0x5b1869d9a4c187f2eaa108f3062412ecf0526b24',  // ganache-cli
    },
  };

  var erc20 = {
    abi: [
      'function name() view returns (string)',
      'function symbol() view returns (string)',
      'function decimals() view returns (uint8)',
      'function balanceOf(address) view returns (uint256)',
      'function allowance(address, address) view returns (uint256)',
      'function approve(address, uint256) returns (bool)' ]
  };

  var ds_token = {
    abi: [
      'function name() view returns (bytes32)',
      'function symbol() view returns (bytes32)',
      'function decimals() view returns (uint8)',
      'function balanceOf(address) view returns (uint256)',
      'function allowance(address, address) view returns (uint256)',
      'function approve(address, uint256) returns (bool)' ]
  };

  var networks = {
    1: {
      name: "mainnet",
      symbol: "ETH",
      explorer: {
        name: 'etherscan',
        base: 'https://etherscan.io/',
        tx: function (tx) { return ("tx/" + tx); },
        addr: function (addr) { return ("address/" + addr); },
      },
    },
    3: {
      name: "ropsten",
      symbol: "ETH",
      explorer: {
        name: 'etherscan',
        base: 'https://ropsten.etherscan.io/',
        tx: function (tx) { return ("tx/" + tx); },
        addr: function (addr) { return ("address/" + addr); },
      },
    },
    42: {
      name: "kovan",
      symbol: "KETH",
      explorer: {
        name: 'etherscan',
        base: 'https://kovan.etherscan.io/',
        tx: function (tx) { return ("tx/" + tx); },
        addr: function (addr) { return ("address/" + addr); },
      },
    },
    56: {
      name: "bsc mainnet",
      symbol: "BNB",
      explorer: {
        name: 'bscscan',
        base: 'https://bscscan.com/',
        tx: function (tx) { return ("tx/" + tx); },
        addr: function (addr) { return ("address/" + addr); },
      },
    },
    4: {
      name: "rinkeby",
      symbol: "ETH",
      explorer: {
        name: 'etherscan',
        base: 'https://rinkeby.etherscan.io/',
        tx: function (tx) { return ("tx/" + tx); },
        addr: function (addr) { return ("address/" + addr); },
      },
    },
    5: {
      name: "görli",
      symbol: "ETH",
      explorer: {
        name: 'etherscan',
        base: 'https://goerli.etherscan.io/',
        tx: function (tx) { return ("tx/" + tx); },
        addr: function (addr) { return ("address/" + addr); },
      },
    },
    61: {
      name: "etc mainnet",
      symbol: "ETC",
      explorer: {
        name: 'blockscout',
        base: 'https://blockscout.com/etc/mainnet',
        tx: function (tx) { return ("tx/" + tx); },
        addr: function (addr) { return ("address/" + addr); },
      },
    },
    77: {
      name: "poa sokol",
      symbol: "SPOA",
      explorer: {
        name: 'blockscout',
        base: 'https://blockscout.com/poa/sokol/',
        tx: function (tx) { return ("tx/" + tx); },
        addr: function (addr) { return ("address/" + addr); },
      },
    },
    99: {
      name: "poa network",
      symbol: "POA",
      explorer: {
        name: 'blockscout',
        base: 'https://blockscout.com/poa/core/',
        tx: function (tx) { return ("tx/" + tx); },
        addr: function (addr) { return ("address/" + addr); },
      },
    },
    100: {
      name: "xdai chain",
      symbol: "xDAI",
      explorer: {
        name: 'blockscout',
        base: 'https://blockscout.com/poa/dai/',
        tx: function (tx) { return ("tx/" + tx); },
        addr: function (addr) { return ("address/" + addr); },
      },
    },
    137: {
      name: "matic network",
      symbol: "MATIC",
      explorer: {
        name: 'matic explorer',
        base: 'https://explorer.matic.network/',
        tx: function (tx) { return ("tx/" + tx); },
        addr: function (addr) { return ("address/" + addr); },
      },
    },
    163: {
      name: "lightstreams",
      symbol: "PHT",
      explorer: {
        name: 'explorer',
        base: 'https://explorer.lightstreams.io/',
        tx: function (tx) { return ("tx/" + tx); },
        addr: function (addr) { return ("addr/" + addr); },
      },
    },
    5777: {
      name: "ganache",
      symbol: "ETH",
    }
  };

  function explorer_tx(tx) {
    if (!tx) { return }
    var network = networks[web3.version.network];
    if (network && network.explorer) {
      return  ("" + (network.explorer.base) + (network.explorer.tx(tx)))
    }
  }

  function explorer_addr(addr) {
    if (!addr) { return }
    var network = networks[web3.version.network];
    if (network && network.explorer) {
      return  ("" + (network.explorer.base) + (network.explorer.addr(addr)))
    }
  }

  function explorer_name() {
    var network = networks[web3.version.network];
    if (network && network.explorer) {
      return network.explorer.name
    }
  }

  function network_name() {
    var network = web3.version.network;
    if (!network) { return }
    return networks[network] ? networks[network].name : '🤔'
  }

  function native_symbol() {
    var network = networks[web3.version.network];
    return network ? network.symbol : 'ETH'
  }

  var states = Object.freeze({
      METAMASK_REQUIRED: 1,
      NETWORK_UNAVAILABLE: 2,
      UNLOCK_METAMASK: 3,
      CONNECTED_TO_WALLET: 4,
      SELECTED_CURRENCY: 5,
      ENTERED_AMOUNTS: 6,
  });

  riot$1.tag2('disperse-app', '<section> <disperse-logo state="{state}" disperse="{disperse}"></disperse-logo> </section> <section if="{state === states.METAMASK_REQUIRED}"> <h2>metamask required</h2> <p>non-ethereum browser, consider installing metamask.</p> </section> <section if="{state === states.NETWORK_UNAVAILABLE}"> <h2>network not yet supported</h2> <p>let us know on telegram and we\'ll deploy the contract on this network.</p> <p>network id: {network}</p> </section> <section if="{state &gt;= states.UNLOCK_METAMASK &amp;&amp; wallet.status}"> <h2>connect to wallet</h2> <p>{wallet.status}</p> </section> <section if="{state &gt;= states.CONNECTED_TO_WALLET}"> <disperse-currency on-select="{select_currency}"></disperse-currency> <p if="{sending == &quot;ether&quot;}">you have <disperse-amount amount="{wallet.balance}" symbol="{symbol()}" decimals="{decimals()}"></disperse-amount> </p> </section> <section if="{state &gt;= states.CONNECTED_TO_WALLET &amp;&amp; sending === &quot;token&quot;}"> <disperse-token-loader on-select="{select_token}" on-error="{reset_token}"></disperse-token-loader> </section> <section show="{state &gt;= states.SELECTED_CURRENCY}"> <h2>recipients and amounts</h2> <p>enter one address and amount in {symbol()} on each line. supports any format.</p> <div class="shadow"> <textarea ref="addresses" spellcheck="false" oninput="{check_amounts}"></textarea> </div> </section> <section if="{state &gt;= states.ENTERED_AMOUNTS}"> <h2>confirm</h2> <disperse-addresses addresses="{addresses}" symbol="{symbol()}" decimals="{decimals()}" balance="{balance()}" left="{left()}" total="{total()}"></disperse-addresses> <disperse-transaction show="{sending === &quot;ether&quot;}" disabled="{left() &lt; 0}" title="disperse ether" action="{disperseEther}" message="{disperse_message()}"></disperse-transaction> </section> <div if="{state &gt;= states.ENTERED_AMOUNTS &amp;&amp; sending == &quot;token&quot;}"> <h2>allowance</h2> <p show="{token.allowance.lt(total())}">allow smart contract to transfer tokens on your behalf.</p> <p show="{token.allowance.gte(total())}">disperse contract has allowance, you can send tokens now.</p> <disperse-transaction class="{secondary: token.allowance.gte(total())}" title="{token.allowance.lt(total()) ? &quot;approve&quot; : &quot;revoke&quot;}" action="{token.allowance.lt(total()) ? approve : deny}"></disperse-transaction> <disperse-transaction show="{sending === &quot;token&quot;}" disabled="{left() &lt; 0 || token.allowance.lt(total())}" title="disperse token" action="{disperseToken}" message="{disperse_message()}"></disperse-transaction> </div>', '', '', function(opts) {
      var this$1 = this;


      this.states = states;
      this.state = 0;

      this.info = {
        debug: {},
        token: {},
        approve: {},
        disperse: {},
      };
      this.network = null;
      this.network_unavailable = false;
      this.wallet = {
        address: null,
        status: null,
      };

      this.disperse = {};
      this.token = {};

      this.sending = null;

      this.on('mount', function () {
        this$1.refs.addresses.placeholder = '0x314ab97b76e39d63c78d5c86c2daf8eaa306b182 3.141592\n0x271bffabd0f79b8bd4d7a1c245b7ec5b576ea98a,2.7182\n0x141ca95b6177615fb1417cf70e930e102bf8f584=1.41421';
      });

      this.select_currency =async  function(event) {
        this.sending = event.target.value;
        if (this.sending == 'ether') {
          this.update({state: this.states.SELECTED_CURRENCY});
          this.parse_amounts();
        }
        else if (this.sending == 'token') {
          if (this.token.contract) {
            this.select_token();
          } else {
            this.reset_token();
          }
        }
      }.bind(this);

      this.reset_token =async  function() {
        this.update({state: this.states.CONNECTED_TO_WALLET, token: {}});
      }.bind(this);

      this.select_token =async  function() {
        this.update({state: this.states.SELECTED_CURRENCY});
        await this.update_balance();
        this.parse_amounts();
        console.log(("loaded token " + (this.token.address)));
      }.bind(this);

      this.check_amounts =async  function(e) {
        e.preventDefault();
        this.parse_amounts();
      }.bind(this);

      this.parse_amounts =async  function() {
        var pattern = RegExp(/(0x[0-9a-fA-F]{40}).+?([0-9\.]+)/, 'g');
        this.addresses = [];
        var result;
        while ((result = pattern.exec(this.refs.addresses.value)) !== null) {
          this.addresses.push({
            address: ethers.utils.getAddress(result[1]),
            value: ethers.utils.parseUnits(result[2], this.decimals())
          });
        }
        if (this.addresses.length) {
          this.update({state: this.states.ENTERED_AMOUNTS});
        }
      }.bind(this);

      this.approve =async  function() {

        return this.token.contract.approve(this.disperse.address, ethers.constants.MaxUint256)
      }.bind(this);

      this.deny =async  function() {
        return this.token.contract.approve(this.disperse.address, ethers.constants.Zero)
      }.bind(this);

      this.disperseEther =async  function() {
        var recipients = this.addresses.map(function (e) { return e.address; });
        var values = this.addresses.map(function (e) { return e.value; });
        console.log('disperseEther', recipients, values, this.total().toString());
        return this.disperse.contract.disperseEther(recipients, values, {value: this.total()})
      }.bind(this);

      this.disperseToken =async  function() {
        var recipients = this.addresses.map(function (e) { return e.address; });
        var values = this.addresses.map(function (e) { return e.value; });
        console.log('disperseToken', this.token.address, recipients, values, this.total().toString());
        var transaction = this.disperse.contract.disperseToken(this.token.address, recipients, values);
        return transaction
      }.bind(this);

      this.symbol = function() {
        return this.sending === 'token' ? this.token.symbol : native_symbol()
      }.bind(this);

      this.decimals = function() {
        return this.sending == 'token' ? this.token.decimals :  18
      }.bind(this);

      this.total = function() {
        return this.addresses.reduce(function (t, v) { return t.add(v.value); }, ethers.constants.Zero)
      }.bind(this);

      this.left = function() {
        switch (this.sending) {
          case 'token': return this.token.balance.sub(this.total())
          case 'ether': return this.wallet.balance.sub(this.total())
        }
      }.bind(this);

      this.balance = function() {
        switch (this.sending) {
          case 'token': return this.token.balance
          case 'ether': return this.wallet.balance
        }
      }.bind(this);

      this.disperse_message = function() {
        if (this.sending === 'token' && this.token.allowance.lt(this.total())) { return 'needs allowance' }
        if (this.left() < 0) { return 'total exceeds balance' }
      }.bind(this);

      this.update_balance =async  function() {
        this.wallet.balance = await this.provider.getBalance(this.wallet.address);
        if (this.token.contract) {
          this.token.balance = await this.token.contract.balanceOf(this.wallet.address);
          this.token.allowance = await this.token.contract.allowance(this.wallet.address, this.disperse.address);
        }
        this.update();
      }.bind(this);

      this.watch_account =async  function() {
        var account = web3.eth.accounts[0];
        if (this.wallet.address !== account) {
          this.wallet.address = account;
          this.wallet.status = account ? ("logged in as " + account) : 'please unlock metamask';
          if (account) {
            await this.update_balance();
            if (this.state === this.states.UNLOCK_METAMASK) {
              this.state = this.states.CONNECTED_TO_WALLET;
            }
          } else {
            this.state = this.states.UNLOCK_METAMASK;
          }
          this.update();
        }
      }.bind(this);

      this.watch_network =async  function() {
        var network = web3.version.network;
        if (this.network && this.network !== network) {
          location.reload();
        }
        this.network = this.network ? this.network : network;
      }.bind(this);

      this.afterWeb3 = function() {
        this.provider = new ethers.providers.Web3Provider(web3.currentProvider);
        this.network = web3.version.nework;
        this.load_disperse_contract();
        setInterval(this.watch_account, 100);
        setInterval(this.watch_network, 500);
        if (this.state !== this.states.NETWORK_UNAVAILABLE) {
          this.update({state: this.states.UNLOCK_METAMASK});
        }
      }.bind(this);

      this.load_disperse_contract = function() {
        this.network = web3.version.network;
        console.log(this.network);
        this.disperse.address = disperse.address[this.network];
        if ('disperse' in localStorage) {
          try {
            this.disperse.address = ethers.utils.getAddress(localStorage.getItem('disperse'));
            console.log('disperse address override');
          } catch (e) {
            console.error('failed to override address');
          }
        }
        if (this.disperse.address) {
          this.disperse.contract = new ethers.Contract(
            this.disperse.address,
            disperse.abi,
            this.provider.getSigner()
          );
          console.log(("Disperse contract initialized at " + (this.disperse.address)));
        } else {
          this.update({state: this.states.NETWORK_UNAVAILABLE});
        }
      }.bind(this);

      this.connectWeb3 =async  function() {
          if (window.ethereum) {
              window.web3 = new Web3(ethereum);
              try {
                  await ethereum.enable();
              } catch (error) {
                  this.wallet.status = 'please unlock metamask';
              }
              this.afterWeb3();
          }
          else if (window.web3) {
              window.web3 = new Web3(web3.currentProvider);
              this.afterWeb3();
          }
          else {
            this.update({state: this.states.METAMASK_REQUIRED});
          }
        }.bind(this);

      window.addEventListener('load', this.connectWeb3);
  });

  riot$1.tag2('disperse-logo', '<header> <div class="eth {logo_class()}"><svg id="svg" version="1.1" width="50" height="50" viewbox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: block;"><g id="svgg"><path id="path0" d="M196.423 21.530 C 195.612 23.471,171.105 64.622,141.963 112.977 C 112.821 161.331,88.735 201.528,88.437 202.304 C 88.050 203.313,103.882 213.162,143.951 236.838 L 200.008 269.960 256.049 236.820 C 296.310 213.011,311.937 203.279,311.546 202.259 C 309.521 196.981,200.545 18.000,199.356 18.000 C 198.554 18.000,197.234 19.588,196.423 21.530 M88.570 226.125 C 90.730 229.818,199.545 382.920,200.000 382.906 C 200.752 382.883,312.004 225.671,311.574 225.240 C 311.168 224.835,207.179 286.081,202.841 289.280 L 200.182 291.242 146.341 259.454 C 116.728 241.971,91.406 226.961,90.070 226.100 C 87.855 224.673,87.722 224.675,88.570 226.125 " stroke="none" fill="#cccccc" fill-rule="evenodd"></path></g></svg></div> <h1>disperse<sup>{network_name()}</sup></h1> <div class="expand"></div> <div><a href="{explorer_addr(opts.disperse.address)}" target="_blank">{explorer_name()}</a><a href="https://t.me/disperse" target="_blank">telegram</a></div> </header> <p><em>verb</em><span style="font-style: normal"> distribute ether or tokens to multiple addresses</span></p>', 'disperse-logo header,[data-is="disperse-logo"] header{ display: flex; align-items: baseline; } disperse-logo sup,[data-is="disperse-logo"] sup{ font-size: 1.4rem; margin-left: .7rem; top: -1.4rem; } disperse-logo a,[data-is="disperse-logo"] a{ font-size: 1.4rem; margin-right: 1.4rem; } disperse-logo .eth svg path,[data-is="disperse-logo"] .eth svg path{ transition: fill .3s !important; } disperse-logo .active svg path,[data-is="disperse-logo"] .active svg path{ fill: aquamarine !important; } disperse-logo .inactive svg path,[data-is="disperse-logo"] .inactive svg path{ fill: crimson !important; }', '', function(opts) {

      this.network_name = network_name;
      this.explorer_name = explorer_name;
      this.explorer_addr = explorer_addr;
      this.states = states;

      this.logo_class = function() {
        return this.opts.state >= this.states.CONNECTED_TO_WALLET ? 'active' : 'inactive'
      }.bind(this);

  });

  riot$1.tag2('disperse-currency', '<div class="chooser"> <label>send</label> <input type="radio" value="ether" name="what" id="ether" onchange="{opts.onSelect}"> <label for="ether">ether</label> <label>or</label> <input type="radio" value="token" name="what" id="token" onchange="{opts.onSelect}"> <label for="token">token</label> </div>', 'disperse-currency .chooser,[data-is="disperse-currency"] .chooser{ font-style: italic; margin-top: 2.1rem; margin-bottom: 1.4rem; } disperse-currency label,[data-is="disperse-currency"] label{ margin-right: .25rem; font-size: 2.2rem; } disperse-currency input[type="radio"],[data-is="disperse-currency"] input[type="radio"]{ display: none; color: #111111; } disperse-currency input[type="radio"] + label,[data-is="disperse-currency"] input[type="radio"] + label{ display: inline-block; font-size: 2.2rem; color: rgba(0, 0, 0, 0.5); border-bottom: 2px rgba(0, 0, 0, 0.5) solid; } disperse-currency input[type="radio"]:checked + label,[data-is="disperse-currency"] input[type="radio"]:checked + label{ color: #111111; border-bottom: 2px #111111 solid; background: aquamarine; }', '', function(opts) {
  });

  riot$1.tag2('disperse-addresses', '<ul> <li class="accent"> <div class="flex"> <div>address</div> <div class="expand"></div> <div>amount</div> </div> </li> <li each="{addr in opts.addresses}"> <div class="flex"> <div>{addr.address}</div> <div class="expand bar"></div> <disperse-amount amount="{addr.value}" symbol="{opts.symbol}" decimals="{opts.decimals}"></disperse-amount> </div> </li> </ul> <ul> <li class="accent"> <div class="flex"> <div>total</div> <div class="expand"></div> <disperse-amount amount="{opts.total}" symbol="{opts.symbol}" decimals="{opts.decimals}"></disperse-amount> </div> </li> <li class="accent"> <div class="flex"> <div>your balance</div> <div class="expand"></div> <disperse-amount amount="{opts.balance}" symbol="{opts.symbol}" decimals="{opts.decimals}"></disperse-amount> </div> </li> <li class="accent"> <div class="flex fade {negative: opts.left &lt; 0}"> <div>remaining</div> <div class="expand"></div> <disperse-amount amount="{opts.left}" symbol="{opts.symbol}" decimals="{opts.decimals}"></disperse-amount> </div> </li> </ul>', 'disperse-addresses .accent,[data-is="disperse-addresses"] .accent{ font-style: italic; } disperse-addresses .bar,[data-is="disperse-addresses"] .bar{ margin: auto 0.3em; border-bottom: 1px #111111 solid; } disperse-addresses .fade,[data-is="disperse-addresses"] .fade{ transition: color .3s; } disperse-addresses .negative,[data-is="disperse-addresses"] .negative{ color: crimson; }', '', function(opts) {
  });

  riot$1.tag2('disperse-amount', '<span>{amount()} </span><span class="sc">{opts.symbol}</span>', 'disperse-amount .sc,[data-is="disperse-amount"] .sc{ font-variant: all-small-caps; }', '', function(opts) {
      this.amount = function() {
        return ethers.utils.formatUnits(this.opts.amount, this.opts.decimals)
      }.bind(this);

  });

  riot$1.tag2('disperse-transaction', '<input type="submit" riot-value="{opts.title}" onclick="{submit}" disabled="{opts.disabled}"> <div class="status"> <div show="{opts.message}">{opts.message}</div> <div class="{status}">{message}</div><a class="hash" target="_blank" href="{explorer_tx(hash)}">{hash}</a> </div>', 'disperse-transaction { font-size: 1.4rem; display: flex; align-items: baseline; margin-bottom: 1.4rem; } disperse-transaction .status,[data-is="disperse-transaction"] .status{ margin-left: 1.4rem; font-style: italic; } disperse-transaction .status .pending,[data-is="disperse-transaction"] .status .pending{ animation: pulse 1.5s infinite; animation-direction: alternate; animation-timing-function: ease-in-out; } disperse-transaction .status .success,[data-is="disperse-transaction"] .status .success{ color: #28bd14; } disperse-transaction .status .failed,[data-is="disperse-transaction"] .status .failed{ color: #d43939; } disperse-transaction .hash,[data-is="disperse-transaction"] .hash{ font-style: normal; font-size: 1rem; } disperse-transaction input[type="submit"]:disabled,[data-is="disperse-transaction"] input[type="submit"]:disabled{ opacity: .4; } disperse-transaction.secondary input { background: none; border: 1px crimson solid; } @keyframes pulse { 0% { color: rgba(0, 0, 0, 0.2); } 100% { color: rgba(0, 0, 0, 0.5); } }', '', function(opts) {

      this.explorer_tx = explorer_tx;
      this.status = null;
      this.message = null;
      this.hash = null;
      this.tx = null;

      this.submit =async  function(e) {
        this.update({message: 'sign transaction with metamask', status: 'approve', hash: null, tx: null});

        try {

          this.tx = await this.opts.action();

          this.update({message: 'transaction pending', status: 'pending', hash: this.tx.hash});
          console.log(this.tx);
        } catch(error) {

          this.update({message: 'transaction rejected', status: 'failed'});
          console.log('rejected', error);
          return
        }

        try {

          var receipt = await this.tx.wait();
          console.log(receipt);
          var status = receipt.status ? 'success' : 'failed';
          this.update({message: ("transaction " + status), status: status});
          await this.parent.update_balance();
        } catch(error) {

          this.update({message: 'transaction failed', status: 'failed'});
          console.log('reverted', error);
        }
      }.bind(this);

  });

  riot$1.tag2('disperse-token-loader', '<h2>token address</h2> <form onsubmit="{load_token}"> <div class="flex"> <input type="text" ref="token" placeholder="0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359"> <input type="submit" value="load"> </div> <p class="{status}">{message}</p> <p if="{parent.token.balance}">you have <disperse-amount amount="{parent.token.balance}" symbol="{parent.symbol()}" decimals="{parent.decimals()}"></disperse-amount><span> ({parent.token.name})</span> </p> </form>', 'disperse-token-loader input[type="text"],[data-is="disperse-token-loader"] input[type="text"]{ flex-grow: 1; border: none; border-bottom: 2px #111 solid; padding: .7rem; background: aquamarine; margin-right: 1.4rem; } disperse-token-loader input[type="text"]:focus,[data-is="disperse-token-loader"] input[type="text"]:focus{ outline: none; }', '', function(opts) {
      var this$1 = this;


      this.token = null;
      this.status = null;
      this.message = null;

      this.on('mount', function () {
        this$1.refs.token.value = this$1.parent.token.address ? this$1.parent.token.address : '';
      });

      this.load_token =async  function(e) {
        e.preventDefault();
        var address = this.refs.token.value;
        console.log('load token', address);
        this.update({message: 'loading token info...', status: 'pending'});
        await this.opts.onError();
        if (!address) {
          this.update({message: 'input token address', status: 'error'});
          return
        }
        try {

          address = ethers.utils.getAddress(address);
        } catch (error) {

          console.log(error);
          this.update({message: 'invalid address', status: 'error'});
          await this.opts.onError();
          return
        }
        try {

          var token = new ethers.Contract(address, erc20.abi, this.parent.provider.getSigner());
          this.parent.token = {
            address: address,
            contract: token,
            balance: null,
            name: await token.name(),
            symbol: await token.symbol(),
            decimals: await token.decimals(),
          };
        } catch (error) {
          console.log('token is not erc-20 compatible, assuming ds-token...');

          try {
            var token$1 = new ethers.Contract(address, ds_token.abi, this.parent.provider.getSigner());
            this.parent.token = {
              address: address,
              contract: token$1,
              balance: null,
              name: ethers.utils.parseBytes32String(await token$1.name()),
              symbol: ethers.utils.parseBytes32String(await token$1.symbol()),
              decimals: await token$1.decimals(),
            };
          } catch (error) {

            console.log(error);
            this.update({message: 'unsupported token', status: 'error'});
            await this.opts.onError();
            return
          }
        }
        await this.opts.onSelect();
        this.update({message: null, status: null});
      }.bind(this);

  });

  window.ethers = ethers$1;
  riot$1.mount('*');

}());
//# sourceMappingURL=bundle.js.map

"use strict";

var drop_options = {
  html: ['<div class="st-block__dropzone">',
    '<span class="st-icon"></span>',
    '<p class="st-block__imageText"><%= i18n.t("general:drop", { block: "<span>" + _.result(block, "title").toLowerCase() + "</span>" }) %></p>',
    '<p class="st-block__videoText">YouTube, Vimeo, Instagram, or Vine</p>',
    '</div>'].join('\n'),
    re_render_on_reorder: false
};

var paste_options = {
  html: ['<input type="text" placeholder="<%= i18n.t("general:paste") %>"',
    ' class="st-block__paste-input st-paste-block">'].join('')
};

var upload_options = {
  html: [
    '<div class="st-block__upload-container">',
    '<input type="file" type="st-file-upload">',
    '<button class="st-upload-btn"><%= i18n.t("general:upload") %></button>',
    '</div>'
  ].join('\n')
};

module.exports = {
  debug: false,
  scribeDebug: false,
  skipValidation: false,
  version: "0.4.0",
  language: "en",

  instances: [],

  defaults: {
    defaultType: false,
    Block: {
      drop_options: drop_options,
      paste_options: paste_options,
      upload_options: upload_options,
    },
    blockLimit: 0,
    blockTypeLimits: {},
    required: [],
    uploadUrl: '/attachments',
    baseImageUrl: '/sir-trevor-uploads/',
    errorsContainer: undefined,
    convertFromMarkdown: true,
    formatBar: {
      commands: [
        {
          name: "Bold",
          title: "bold",
          cmd: "bold",
          keyCode: 66,
          text : '<span class="u-vh">bold</span><svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.726 27.666" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="presentation" focusable="false"><path d="M0 0h10.32c1.2 0 2.4.1 3.6.25s2.3.5 3.27 1.02c.96.5 1.74 1.22 2.34 2.13.6.9.9 2.12.9 3.63 0 1.56-.44 2.86-1.3 3.9-.9 1.02-2.04 1.76-3.47 2.2v.08c.9.14 1.74.4 2.48.77.74.38 1.38.86 1.92 1.45.53.58.94 1.27 1.23 2.05.28.78.43 1.6.43 2.5 0 1.46-.32 2.67-.94 3.65-.64.98-1.45 1.76-2.43 2.37-1 .58-2.1 1-3.35 1.27-1.23.26-2.46.4-3.7.4H0V0zm6.1 11.06h4.4c.48 0 .94-.05 1.4-.16.45-.1.86-.27 1.23-.5.36-.24.65-.55.88-.94.23-.4.34-.87.34-1.4 0-.58-.13-1.06-.37-1.44-.25-.38-.57-.67-.96-.88-.38-.2-.82-.35-1.32-.45-.5-.1-.97-.14-1.44-.14H6.1v5.9zm0 11.45h5.47c.46 0 .94-.04 1.42-.15.47-.1.9-.28 1.3-.55.4-.26.7-.6.96-1s.37-.94.37-1.54c0-.65-.16-1.17-.5-1.58-.3-.4-.73-.7-1.22-.92-.48-.2-1.02-.35-1.6-.43-.57-.07-1.1-.1-1.6-.1H6.1v6.28z"/></svg>'
        },
        {
          name: "Italic",
          title: "italic",
          cmd: "italic",
          keyCode: 73,
          text : '<span class="u-vh">italic</span><svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6.94 26.198" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="presentation" focusable="false"><path d="M2.4 8.88h2.9L2.9 26.2H0L2.4 8.88zm.3-6.77c.08-.56.35-1.05.82-1.47.46-.42 1-.63 1.6-.63s1.05.2 1.4.63.48.9.4 1.48c-.1.63-.37 1.13-.8 1.53-.46.4-1 .6-1.6.6-.62 0-1.1-.2-1.45-.6s-.46-.9-.37-1.52z"/></svg>'
        },
        {
          name: "Link",
          title: "link",
          iconName: "link",
          cmd: "linkPrompt",
          text : '<span class="u-vh">link</span><svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.819 32.819" preserveAspectRatio="xMidYMid meet" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" aria-hidden="true" role="presentation" focusable="false"><path d="M15.28 8.56l6.2-6.2c2.47-2.48 6.52-2.48 9 0 2.46 2.46 2.46 6.5 0 8.98l-7.76 7.74c-2.47 2.47-6.5 2.47-8.98 0-.72-.7-1.22-1.56-1.53-2.46"/><path d="M17.54 24.26l-6.2 6.2c-2.47 2.48-6.52 2.48-9 0-2.46-2.46-2.46-6.5 0-8.98l7.76-7.74c2.47-2.47 6.5-2.47 8.98 0 .72.7 1.22 1.56 1.53 2.46"/></svg>',
        },
        {
          name: "Unlink",
          title: "unlink",
          iconName: "link",
          cmd: "unlink",
          text : '<span class="u-vh">unlink</span><svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 32.819" preserveAspectRatio="xMidYMid meet" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" aria-hidden="true" role="presentation" focusable="false"><path d="M17.87 8.56l6.2-6.2c2.47-2.48 6.52-2.48 9 0 2.46 2.46 2.46 6.5 0 8.98l-7.76 7.74c-2.46 2.47-6.5 2.47-8.97 0-.72-.7-1.22-1.56-1.52-2.46"/><path d="M20.13 24.26l-6.2 6.2c-2.47 2.48-6.52 2.48-9 0-2.46-2.46-2.46-6.5 0-8.98l7.76-7.74c2.46-2.47 6.5-2.47 8.97 0 .72.7 1.22 1.56 1.52 2.46M.5 16.4h37"/></svg>',
        },
      ],
    },
    ajaxOptions: {
      headers: {}
    }
  }
};

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
          text : "B"
        },
        {
          name: "Italic",
          title: "italic",
          cmd: "italic",
          keyCode: 73,
          text : "i"
        },
        {
          name: "Link",
          title: "link",
          iconName: "link",
          cmd: "linkPrompt",
          text : "link",
        },
        {
          name: "Unlink",
          title: "unlink",
          iconName: "link",
          cmd: "unlink",
          text : "unlink",
        },
      ],
    },
    ajaxOptions: {
      headers: {}
    }
  }
};

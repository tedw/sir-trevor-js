"use strict";

var _ = require('../lodash');
var utils = require('../utils');
var Block = require('../block');

module.exports = Block.extend({
  // RegEx Reference
  // YouTube   : https://regex101.com/r/rN1qR5/2
  // Vimeo     : https://regex101.com/r/uW5oK9/7
  // Vine      : https://regex101.com/r/tV9cA6/2
  // Instagram : https://regex101.com/r/aF3dM6/1
  providers: {
    youtube: {
      regex: /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/,
      html: '<iframe src="<%= protocol %>//www.youtube.com/embed/<%= remote_id %>" width="580" height="320" frameborder="0" allowfullscreen></iframe>'
    },
    vimeo: {
      regex: /(?:http|https)?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/?|album\/(?:[^\/]*)\/video\/|)(\d+)(?:|\/\?)/,
      html: '<iframe src="<%= protocol %>//player.vimeo.com/video/<%= remote_id %>?title=0&byline=0" width="580" height="320" frameborder="0"></iframe>'
    },
    vine: {
      regex: /(?:http[s]?:\/\/)?(?:www.)?vine.co\/v\/([\w]+)(?:\/.*)?/,
      html: '<iframe class="vine-embed" src="<%= protocol %>//vine.co/v/<%= remote_id %>/embed/simple" width="<%= width %>" height="<%= width %>" frameborder="0"></iframe><script async src="http://platform.vine.co/static/scripts/embed.js" charset="utf-8"></script>',
      square: true
    },
    instagram: {
      regex: /(?:http[s]?:\/\/)?(?:www.)?instagr(?:.am|am.com)\/p\/([\w]+)(?:\/.*)?/,
      html: '<iframe src="https://instagram.com/p/<%= remote_id %>/embed/" frameborder="0" scrolling="no" width="580" height="580"></iframe>',
      square: true
    }
  },

  matchedProvider: false,

  type: 'video',
  title: function() { return i18n.t('blocks:video:title'); },

  droppable: true,
  pastable: true,

  icon_name: 'video',

  loadData: function(data){
    if (!this.providers.hasOwnProperty(data.source)) { return; }

    var source = this.providers[data.source];

    var protocol = window.location.protocol === "file:" ?
      "http:" : window.location.protocol;

    var aspectRatioClass = source.square ?
      'with-square-media' : 'with-sixteen-by-nine-media';

    this.editor.classList.add('st-block__editor--' + aspectRatioClass);
    this.editor.innerHTML = _.template(source.html, {
                                protocol: protocol,
                                remote_id: data.remote_id,
                                width: this.editor.style.width // for videos like vine
                              });
  },

  onContentPasted: function(event){
    this.handleDropPaste(event.target.value);
  },

  matchVideoProvider: function(provider, index, url) {
    var match = provider.regex.exec(url);
    console.log(match);
    if ( match == null || _.isUndefined( match[1] ) ) {
      return false;
    }

    return {
      source: index,
      remote_id: match[1]
    };
  },

  handleDropPaste: function(url){
    if ( !utils.isURI( url ) ) {
      this.resetMessages();
      this.addMessage('Sorry, that URL isn’t recognized.');
      return;
    }

    for ( var key in this.providers ) {
      if ( !this.providers.hasOwnProperty( key ) ) {
        continue;
      }

      var blockData = this.matchVideoProvider( this.providers[key], key, url );

      if ( !!blockData ) {
        this.setAndLoadData( blockData );
        this.matchedProvider = true;
        this.resetMessages();
        break;
      }
    }

    if ( !this.matchedProvider ) {
      this.resetMessages();
      this.addMessage('Sorry, that URL isn’t recognized.');
    }
  },

  onDrop: function(transferData){
    var url = transferData.getData('text/plain');
    this.handleDropPaste(url);
  }
});


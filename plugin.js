CKEDITOR.plugins.add('deckeditor', {
  icons: 'deckeditor',
  init: function(editor) {

    // load JS file
    head        = document.getElementsByTagName('HEAD').item(0);
    script      = document.createElement("script");
    script.type = "text/javascript";
    script.src  = CKEDITOR.plugins.getPath('deckeditor') + "modernizr.custom.js";
    head.appendChild(script);

    head        = document.getElementsByTagName('HEAD').item(0);
    script      = document.createElement("script");
    script.type = "text/javascript";
    script.src  = CKEDITOR.plugins.getPath('deckeditor') + "jquery-1.7.2.min.js";
    head.appendChild(script);

    var head    = document.getElementsByTagName('HEAD').item(0);
    var script  = document.createElement("script");
    script.type = "text/javascript";
    script.src  = CKEDITOR.plugins.getPath('deckeditor') + "core/deck.core.js";
    head.appendChild(script);

    // load CSS file
    var link   = document.createElement('link');
    link.rel   = 'stylesheet';
    link.type  = 'text/css';
    link.href  = CKEDITOR.plugins.getPath('deckeditor') + "themes/style/web-2.0.css";
    link.media = 'all';
    head.appendChild(link);

    link   = document.createElement('link');
    link.rel   = 'stylesheet';
    link.type  = 'text/css';
    link.href  = CKEDITOR.plugins.getPath('deckeditor') + "themes/transition/horizontal-slide.css";
    link.media = 'all';
    head.appendChild(link);

    // Commands
    editor.addCommand('deckeditorAddContainer', {
      exec: function(editor) {
        // We want only one deck-container in the page to avoid conflicts:
        editor.setData('<div class="deck-container" id="deck-container">Deck Editor</div>', function() {
          this.checkDirty();
        });
      }
    });
    editor.addCommand('deckeditorAddSection', {
      exec: function(editor) {
        var sectionElement = CKEDITOR.dom.element.createFromHtml('<section class="slide">{ Write your section here }</section>');
        var selectedElement = editor.getSelection().getStartElement();
        // If we're inside the deck-container, insert the section in here:
        if (selectedElement.hasClass('deck-container')) {
          editor.insertElement(sectionElement);
        }
        else {
          // Else, we only insert sections one after anothers.
          selectedElement.getParents().forEach(function(element, index, array) {
            if (element.getName() == 'section') {
              sectionElement.insertAfter(element);
            }
          });
        }
      }
    });
    editor.addCommand('deckeditorAddSlide', {
      exec: function(editor) {
        editor.getSelection().getStartElement().addClass('slide');
      }
    });
    editor.addCommand('deckeditorRemoveSlide', {
      exec: function(editor) {
        editor.getSelection().getStartElement().removeClass('slide');
      }
    });
    editor.addCommand('deckPreview', new CKEDITOR.dialogCommand('deckPreview'));
    CKEDITOR.dialog.add('deckPreview', this.path + 'dialogs/deckPreview.js');
    editor.addCommand('deckSource', new CKEDITOR.dialogCommand('deckSource'));
    CKEDITOR.dialog.add('deckSource', this.path + 'dialogs/deckSource.js');

    // Buttons:
    editor.ui.addButton('deckAddContainer', {
      label: 'Add a deck container',
      command: 'deckeditorAddContainer',
      icon: this.path + 'icons/deck-container.png',
      toolbar: 'deckecitorGroup'
    });
    editor.ui.addButton('deckAddSection', {
      label: 'Insert a slide section',
      command: 'deckeditorAddSection',
      icon: this.path + 'icons/deck-section.png',
      toolbar: 'deckecitorGroup'
    });
    editor.ui.addButton('deckPreview', {
      label: 'Deck preview',
      command: 'deckPreview',
      icon: this.path + 'icons/deck-preview.png',
      toolbar: 'deckecitorGroup'
    });
    editor.ui.addButton('deckSource', {
      label: 'source',
      command: 'deckSource',
      icon: this.path + 'icons/deck-source.png',
      toolbar: 'deckecitorGroup'
    });

    // Context Menus:
    if (editor.contextMenu) {
      // Section Add
      editor.addMenuGroup('deckeditorGroup');
      editor.addMenuItem('deckeditorSectionItem', {
        label: 'Add Section',
        command: 'deckeditorAddSection',
        group: 'deckeditorGroup',
        icon: this.path + 'icons/deck-section.png'
      });
      editor.contextMenu.addListener( function( element ) {
        return { deckeditorSectionItem: CKEDITOR.TRISTATE_OFF };
      });
      // Slide Add
      editor.addMenuGroup('deckeditorGroup');
      editor.addMenuItem('deckeditorAddSlideItem', {
        label: 'Add slide',
        command: 'deckeditorAddSlide',
        group: 'deckeditorGroup',
        icon: this.path + 'icons/deck-section.png'
      });
      editor.contextMenu.addListener( function( element ) {
        if (!editor.getSelection().getStartElement().hasClass('slide')) {
          return { deckeditorAddSlideItem: CKEDITOR.TRISTATE_OFF };
        };
      });
      // Slide remove
      editor.addMenuGroup('deckeditorGroup');
      editor.addMenuItem('deckeditorRemoveSlideItem', {
        label: 'Remove slide',
        command: 'deckeditorRemoveSlide',
        group: 'deckeditorGroup',
        icon: this.path + 'icons/deck-section.png'
      });
      editor.contextMenu.addListener( function( element ) {
        if (editor.getSelection().getStartElement().hasClass('slide')) {
         return { deckeditorRemoveSlideItem: CKEDITOR.TRISTATE_OFF };
        } 
      });
    }

  }
});

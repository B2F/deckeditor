CKEDITOR.dialog.add('deckPreview', function(editor) {
  return {
    title: 'Deck Preview',
    minHeight: window.innerHeight,
    minWidth: window.innerWidth,
    contents:
    [
      {
        id: 'deckeditor-source',
        label: 'Deck Source',
        elements:
        [{
          type: 'iframeElement',
          setup: function(element) {
            this.getElement().setHtml(element);
          }
        }]
      }
    ],
    onShow: function() {
      if (deckContainerElement = editor.document.getById('deck-container')) {
        this.setupContent('<textarea>' + deckContainerElement.getOuterHtml() + '</textarea>');
      }
      else {
        this.setupContent('No deck container found');
      }
    }
  }
}

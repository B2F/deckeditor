CKEDITOR.dialog.add('deckSource', function(editor) {
  return {
    title: 'Deck Source',
    minHeight: window.innerHeight,
    minWidth: window.innerWidth,
    contents:
    [
      {
        id: 'deckeditor-source',
        label: 'Deck Source',
        elements:
        [{
          type: 'html',
          html:'',
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
})

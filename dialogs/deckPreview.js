var src = CKEDITOR.plugins.getPath('deckeditor') + 'dialogs/deckPreview.html';
CKEDITOR.dialog.addIframe('deckPreview', 'deckPreview', src, 1000, 1000, initDeckPreview);

function initDeckPreview() {
  var outerWidth = $(window).innerWidth();
  var outerHeigth = $(window).innerHeight();
  $('iframe.cke_dialog_ui_iframe').css({'width':outerWidth,'height':outerHeigth});
  var previewContent = 'No deck container found';
  var deckContainer = $('iframe.cke_dialog_ui_iframe')
                      .closest('html')
                      .find('.cke_wysiwyg_frame')
                      .contents()
                      .find('#deck-container');
  if (deckContainer.length != 0) {
    previewContent = deckContainer.html();
  }
  $('iframe.cke_dialog_ui_iframe').contents().find('body').append(previewContent);
}

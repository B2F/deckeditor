$(function() {
  window.setTimeout(function() { initDeck(); }, 1000) ;
});

function initDeck() {
  $.deck('.slide');
}

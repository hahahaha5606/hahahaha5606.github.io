(function insertBookFlip() {
  var pace = document.querySelector('.pace');
  if (pace && !document.querySelector('.book-flip')) {
    var book = document.createElement('div');
    book.className = 'book-flip';
    book.innerHTML = '<div class="book">'
      + '<div class="page"></div>'
      + '<div class="page"></div>'
      + '<div class="page"></div>'
      + '<div class="page"></div>'
      + '</div>';
    pace.insertBefore(book, pace.firstChild);
  } else {
    setTimeout(insertBookFlip, 100); // 100ms后再检查
  }
})();
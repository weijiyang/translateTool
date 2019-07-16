
function getSelectedText() {
  if (window.getSelection) {
    return window.getSelection().toString();
  } else if (document.getSelection) {
    return document.getSelection();
  } else if (document.selection) {
    return document.selection.createRange().text;
  }
}

$(function () {
  let createDiv = document.createElement('div')
  createDiv.title = '便捷翻译'
  createDiv.id = 'translateExtension'
  createDiv.innerHTML = '<span>请使用鼠标选中想要翻译字段</span>'
  $('body').append(createDiv)
  $('body').mouseup(function () {
    let str = getSelectedText()
    if (str) {
      chrome.extension.sendMessage({uri:"translate_id", query: str}, function(response) {
        if (response.length) {
          let str = response.join('<br/>')
          if (response.length) $('#translateExtension').html(str)
        } else {
          $('#translateExtension').html('没有查到翻译哦')
        }
      });
    }
  })
  $('body').keypress(function(e){
    if (e.altKey && e.which == 339) {
      $('#translateExtension').toggle()
    }
  })
})


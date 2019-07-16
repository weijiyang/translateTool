
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
      // translateText(str)
      chrome.extension.sendMessage({uri:"translate_id", query: str}, function(response) {
        console.log('translate 请求成功！', response)
        if (response.length) $('#translateExtension span').html(response.join('、'))
      });
    }
  })
})



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
  if (top.location != location) return
  let createDiv = document.createElement('div')
  createDiv.title = '便捷翻译'
  createDiv.id = 'translateExtension'
  createDiv.innerHTML = '<span>请使用鼠标选中想要翻译字段</span>'
  $('body').append(createDiv)
  chrome.storage.local.get(['showtranslateExtension'], function(result) {
    if (result['showtranslateExtension'] == 'false') {
      console.log('翻译插件保存状态为：隐藏');
      $('#translateExtension').hide()
    } else {
      console.log('翻译插件保存状态为：显示');
      $('#translateExtension').show()
    }
  });
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
      if ($('#translateExtension').attr('style') == "display: none;") {
        chrome.storage.local.set({showtranslateExtension: "false"}, function() {
            console.log('chrome 本地存储翻译插件隐藏状态');
        });
      } else {
        chrome.storage.local.set({showtranslateExtension: "true"}, function() {
          console.log('chrome 本地存储翻译插件显示状态');
        });
      }
    }
  })
})


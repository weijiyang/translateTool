var appid = '20190716000318483';
var key = 'nRE0N04iXwYBRvmYFMUA';
var salt = (new Date).getTime();
// 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
var from = 'en';
var to = 'zh';

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("Request comes from content script " + sender.tab.url);
  translateText(request, sendResponse);
  //由于需要异步调用sendResponse，所以需要加上return true，通知sendResponse函数等待调用
  return true;
});

function translateText(request, sendResponse) {
  if (request.uri == 'translate_id') {
    let str1 = appid + request.query + salt + key;
    let sign = MD5(str1);
    $.ajax({
      url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
      type: 'get',
      dataType: 'jsonp',
      data: {
        q: request.query,
        appid: appid,
        salt: salt,
        from: from,
        to: to,
        sign: sign
      },
      success: function (data) {
        if (data.trans_result) {
          let arr = data.trans_result.map(item => {
              return item.dst
          })
          sendResponse(arr)
        } else {
          sendResponse([])
        }
      },
      error: function (err) {
        sendResponse([])
      }
    });
  }
}
*************************************
脚本说明：登录账号后在我的界面点右上角礼盒进入后退出，点击礼盒右侧的消息进入在退出，然后重新进入礼盒一直重复领取即可（可反复领取,累加天数)；
注意事项：开启脚本时，我的界面右上角的消息只能进去一次，不然会导致会员时间不在累加，且脚本失效
**************************************

[rewrite_local]
^https://dlabel\.ctaiot\.com/api/(welfare/list|push/list) url script-response-body https://raw.githubusercontent.com/Willow-QQ/Script/main/dl.js
[mitm]
hostname = dlabel.ctaiot.com

*************************************/

/*const _0x2691aa = function () {
    const _0x3adfe6 = {};
    _0x3adfe6.GGNRx = "pvgGL";
    let _0x52e4c1 = true;
    return function (_0x41b387, _0x545884) {
      const _0x1e2aec = {
          "LaObN": _0x3adfe6.klFbK
        },
        _0x14e9e3 = _0x52e4c1 ? function () {
          if ("dxKcf" !== _0x1e2aec.LaObN) {
            if (_0x545884) {
              const _0x303a59 = _0x545884.apply(_0x41b387, arguments);
              return _0x545884 = null, _0x303a59;
            }
          } else _0x37e4c9 = _0x148d4d;
        } : function () {};
      _0x52e4c1 = false;
      return _0x14e9e3;
    };
  }(),
  _0x372e20 = _0x2691aa(this, function () {
    const _0xe745c7 = function () {
        let _0x2ce54a;
        try {
          _0x2ce54a = Function("return (function() {}.constructor(\"return this\")( ));")();
        } catch (_0x3e837c) {
          _0x2ce54a = window;
        }
        return _0x2ce54a;
      },
      _0x954054 = _0xe745c7(),
      _0x4c3a45 = _0x954054.console = _0x954054.console || {};
    const _0x17ad8b = ["log", "warn", "info", "error", "exception", "table", "trace"];
    for (let _0x2795b6 = 0; _0x2795b6 < _0x17ad8b.length; _0x2795b6++) {
      const _0x15c12d = _0x2691aa.constructor.prototype.bind(_0x2691aa),
        _0x364864 = _0x17ad8b[_0x2795b6],
        _0x809f6c = _0x4c3a45[_0x364864] || _0x15c12d;
      _0x15c12d["__proto__"] = _0x2691aa.bind(_0x2691aa), _0x15c12d.toString = _0x809f6c.toString.bind(_0x809f6c), _0x4c3a45[_0x364864] = _0x15c12d;
    }
  });
_0x372e20();*/
var url = $request.url;
const vip = "/api/welfare/list",
  vip1 = "/api/push/list";
if (url.indexOf(vip) != -1) {
  var body = $response.body;
  var jsonBody = JSON.parse(body);
  jsonBody.data && jsonBody.data.length > 1 && (jsonBody.data[1].receive = 1, jsonBody.data[1].vipDay = 14);
  var match = body.match(/shareUserId=(\d+)/);
  if (match && match[1]) {
    var shareUserId = match[1];
    $prefs.setValueForKey(shareUserId, "shareUserId");
  } else {}
  body = JSON.stringify(jsonBody);
  $done(body);
}
if (url.indexOf(vip1) != -1) {
  var storedShareUserId = $prefs.valueForKey("shareUserId");
  const url = "https://dlabel.ctaiot.com/api/user/add_welfare_link.json",
    method = "POST",
    _0x2ce702 = {};
  _0x2ce702["Sec-Fetch-Dest"] = "empty", _0x2ce702.Connection = "keep-alive", _0x2ce702["Accept-Encoding"] = "gzip, deflate, br", _0x2ce702.accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkdWRpYW4tYXBwLXNlY3VyaXR5Iiwic3ViIjoiMTg5NzQ5OTY1NTIiLCJhdWQiOiJ1c2VyIiwiZXhwIjoyMDM5NzA0NDY2LCJpYXQiOjE3MjQzNDQ0NjZ9.h9hChzkG53mmmpR8u2G1cdNNdQiom6qpnYnarf44jzs", _0x2ce702["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8", _0x2ce702["Sec-Fetch-Site"] = "same-site", _0x2ce702.Origin = "https://dlabelweb.ctaiot.com", _0x2ce702["User-Agent"] = "Mozilla/5.0 (iPhone; CPU iPhone OS 16_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.50(0x18003239) NetType/4G Language/zh_CN", _0x2ce702["Sec-Fetch-Mode"] = "cors", _0x2ce702.Referer = "https://dlabelweb.ctaiot.com/", _0x2ce702.Host = "dlabel.ctaiot.com", _0x2ce702["Accept-Language"] = "zh-CN,zh-Hans;q=0.9", _0x2ce702.Accept = "*/*";
  const headers = _0x2ce702,
    body = "shareUserId=" + storedShareUserId,
    _0xd1887 = {};
  _0xd1887.url = url, _0xd1887.method = method, _0xd1887.headers = headers, _0xd1887.body = body;
  const myRequest = _0xd1887;
  $task.fetch(myRequest).then(_0x40ae0e => {
    const _0xceeca1 = {};
    console.log(_0x40ae0e.statusCode + "\n\n" + _0x40ae0e.body), $done();
  }, _0x4be4b3 => {
    console.log(_0x4be4b3.error), $done();
  });
}
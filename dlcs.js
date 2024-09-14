*************************************
脚本说明：登录账号后在我的界面点右上角礼盒进入后退出，点击礼盒右侧的消息进入在退出，然后重新进入礼盒一直重复领取即可（可反复领取,累加天数)；
注意事项：开启脚本时，我的界面右上角的消息只能进去一次，不然会导致会员时间不在累加，且脚本失效
**************************************

[rewrite_local]
^https://dlabel\.ctaiot\.com/api/(welfare/list|push/list) url script-response-body https://raw.githubusercontent.com/Willow-QQ/Script/main/dl.js
[mitm]
hostname = dlabel.ctaiot.com

*************************************/

(function () {
  // 获取请求的URL
  var url = $request.url;
  const vip = "/api/welfare/list";
  const vip1 = "/api/push/list";

  // 拦截 /api/welfare/list 请求
  if (url.indexOf(vip) != -1) {
    // 获取响应体
    var body = $response.body;
    
    // 打印响应体以调试 JSON 格式问题
    console.log("Response body: " + body); // 调试用

    try {
      // 解析响应体为 JSON 对象
      var jsonBody = JSON.parse(body);

      // 如果福利数据存在且有至少两个条目，修改第二个条目
      if (jsonBody.data && jsonBody.data.length > 1) {
        // 将 receive 字段设置为 1，表示已领取
        jsonBody.data[1].receive = 1;
        // 将 VIP 天数设置为 14 天
        jsonBody.data[1].vipDay = 14;
        // 将第三个条目的 receive 字段设置为 1，表示已领取
        jsonBody.data[5].receive = 1;
        // 将第三个条目的 count 字段设置为 3
        jsonBody.data[5].count = 3;
      }

      // 匹配 shareUserId 并将其存储到本地
      var match = body.match(/shareUserId=(\d+)/);
      if (match && match[1]) {
        var shareUserId = match[1];

        // 存储 shareUserId
        $prefs.setValueForKey(shareUserId, "shareUserId");
      }

      // 将修改后的 JSON 对象转换回字符串并完成请求
      body = JSON.stringify(jsonBody);
      $done({ body: body });
    } catch (e) {
      // 捕获并处理 JSON 解析错误
      console.log("JSON parse error: " + e.message);
      $done(); // 继续运行，即使解析失败
    }
  }

  // 拦截 /api/push/list 请求
  if (url.indexOf(vip1) != -1) {
    // 获取存储的 shareUserId
    var storedShareUserId = $prefs.valueForKey("shareUserId");

    // 设置 POST 请求的 URL 和方法
    const url = "https://dlabel.ctaiot.com/api/user/add_welfare_link.json";
    const method = "POST";

    // 构建请求头，包含 accessToken
    const headers = {
      "Sec-Fetch-Dest": "empty",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Origin": "https://dlabelweb.ctaiot.com",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      "Connection": "keep-alive",
      "Accept": "*/*",
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.50(0x1800323d) NetType/WIFI Language/zh_CN",
      "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkdWRpYW4tYXBwLXNlY3VyaXR5Iiwic3ViIjoiMTU2MDU4ODQ0NTAiLCJhdWQiOiJ1c2VyIiwiZXhwIjo0ODc5Njc0NTMwLCJpYXQiOjE3MjYwNzQ1MzB9.DE_zzBwQOlG0qxUhr3coyTTXVzymk9KzugqG7A401rs",
    };

    // 构建请求体
    const body = "shareUserId=" + storedShareUserId;

    // 构建完整的请求对象
    const myRequest = {
      url: url,
      method: method,
      headers: headers,
      body: body
    };

    // 发送 POST 请求并处理响应
    $task.fetch(myRequest).then(response => {
      // 输出状态码和响应体
      console.log(response.statusCode + "\n\n" + response.body);

      // 完成请求
      $done();
    }, error => {
      // 输出错误信息
      console.log(error.error);

      // 完成请求
      $done();
    });
  }
})();
*************************************
[rewrite_local]
^https://m.kuaidi100.com/mkt/courier/open/mktcourier/worker.do?method=getLoginInfo url script-response-body https://raw.githubusercontent.com/Willow-QQ/Script/main/dlcs.js

[mitm]
hostname = m.kuaidi100.com
*************************************/
// 原始 JSON 数据
let jsonData = {
  "result" : true,
  "message" : "成功",
  "status" : "200",
  "count" : 0,
  "data" : {
    "mobile" : "13285818801",
    "vipTag" : "NORMAL",
    "vipDeadline" : 1723775698804,
    "workerPosition" : "MANAGER",
    "headImg" : null,
    "name" : "店长",
    "mktName" : "千姿秀"
  },
  "total" : 0
};

// 将 vipTag 改为 VIP
jsonData.data.vipTag = "VIP";

// 设置 vipDeadline 为 1 年后的时间
jsonData.data.vipDeadline = "1755331698804";

// 输出修改后的 JSON 数据
console.log(JSON.stringify(jsonData, null, 2));

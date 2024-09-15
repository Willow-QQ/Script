*************************************
[rewrite_local]
^https://m.kuaidi100.com/mkt/courier/open/mktcourier/worker.do?method=getLoginInfo url script-response-body https://raw.githubusercontent.com/Willow-QQ/Script/main/dlcs.js

[mitm]
hostname = m.kuaidi100.com
*************************************/
// 模拟的原始 JSON 数据
let jsonData = {
    "result": true,
    "message": "成功",
    "status": "200",
    "count": 0,
    "data": {
        "mobile": "13285818801",
        "vipTag": "NORMAL",
        "vipDeadline": 1723775698804,
        "workerPosition": "MANAGER",
        "headImg": null,
        "name": "店长",
        "mktName": "千姿秀"
    },
    "total": 0
};

// 将 VIP 标签更改为 VIP
jsonData.data.vipTag = "VIP";

// 设置一个未来的时间戳（这里设置为当前时间往后 3600000 毫秒，即 1 小时）
let now = new Date();
let newDeadline = new Date(now.getTime() + 3600000);
jsonData.data.vipDeadline = newDeadline.getTime();

// 输出修改后的 JSON 数据
console.log(jsonData);




/*
 * NB实验室
 * 解锁会员
 * 
[rewrite_local]
^https?:\/\/www\.nobook\.com\/passport\/v5\/login\/(check|phone) url script-response-body https://raw.githubusercontent.com/Willow-QQ/Script/refs/heads/main/NBDiy.js

[mitm]
hostname = www.nobook.com
*/

// 核心功能：修改响应JSON，解锁会员
(() => {
  const response = JSON.parse($response.body);
  
  // 递归遍历对象，修改会员相关字段
  function modifyFields(obj) {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        modifyFields(obj[key]); // 递归处理嵌套对象
      } else {
        // 匹配关键字段并修改
        switch (key) {
          case 'isVip':
          case 'vipStatus':
          case 'expireTime':
            obj[key] = 1; // 设置为激活状态
            break;
          case 'validity':
            obj[key] = 9999999999999; // 设置超长有效期
            break;
        }
      }
    }
  }

  modifyFields(response); // 执行修改
  $done({ body: JSON.stringify(response) }); // 返回修改后的响应
})();

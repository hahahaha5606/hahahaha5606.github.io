setInterval(() => {
  let create_time = Math.round(new Date('2023-11-06 00:00:00').getTime() / 1000); //在此行修改为自己的建站时间
  let timestamp = Math.round((new Date().getTime()) / 1000);
  let second = timestamp - create_time;
  let time = new Array(0, 0, 0, 0, 0);
  //格式规范化，个位数前面加0
  var nol = function(h){
    return h>9?h:'0'+h;
  }
  if (second >= 365 * 24 * 3600) {
    time[0] = parseInt(second / (365 * 24 * 3600));
    second %= 365 * 24 * 3600;
  }//年
  if (second >= 24 * 3600) {
    time[1] = parseInt(second / (24 * 3600));
    second %= 24 * 3600;
  }//天
  if (second >= 3600) {
    time[2] = nol(parseInt(second / 3600));
    second %= 3600;
  }//时
  if (second >= 60) {
    time[3] = nol(parseInt(second / 60));
    second %= 60;
  }//分
  if (second > 0) {
    time[4] = nol(second);
  }//秒
  //早上7点到晚上10点营业(这里修改为自己博客信息)
  if ((Number(time[2])<22) && (Number(time[2])>7)){
    currentTimeHtml ="<img class='boardsign' src='https://img.shields.io/badge/开荒中-藕片种植基地?style=social&logo=docsify&label=藕片种植基地' title='哼哧哼哧~'><div id='runtime'>" + '<font style=color:#f391a9>' + time[0] + '</font>' + ' YEAR ' + '<font style=color:#f391a9>' + time[1] + '</font>' + ' DAYS ' + '<font style=color:#a3cf62>' + time[2] + '</font>' + ' : ' + '<font style=color:#a3cf62>' + time[3] + '</font>' + ' : ' + '<font style=color:#a3cf62>' + time[4] + '</font>' + '</div>';
  } //徽标内容参考站内教程
  //其余时间打烊(这里修改为自己博客信息)
  else{
    currentTimeHtml ="<img class='boardsign' src='https://img.shields.io/badge/藕片种植基地-打烊了-6adea8?style=social&logo=coffeescript' title='这个点了应该去睡觉啦，熬夜对身体不好哦'><div id='runtime'>" + '<font style=color:#f391a9>' + time[0] + '</font>' + ' YEAR ' + '<font style=color:#f391a9>' + time[1] + '</font>' + ' DAYS ' + '<font style=color:#a3cf62>' + time[2] + '</font>' + ' : ' + '<font style=color:#a3cf62>' + time[3] + '</font>' + ' : ' + '<font style=color:#a3cf62>' + time[4] + '</font>' + '</div>'; //徽标内容参考站内教程
  }
  //覆写挂载标签的内容
  document.getElementById("workboard").innerHTML = currentTimeHtml;
}, 1000);


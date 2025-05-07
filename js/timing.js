let oSpan = document.getElementsByTagName("timing")[0];
let localhostTime = new Date();//获取页面打开的时间
function tow(n) {
    return n >= 0 && n < 10 ? '0' + n : '' + n;
}
setInterval(function () {
    let goTime = new Date();//获取动态时间
    let diffTime = goTime.getTime() - localhostTime.getTime();
    var second = Math.floor(diffTime / 1000);//未来时间距离现在的秒数
    var day = Math.floor(second / 86400);//整数部分代表的是天；一天有24*60*60=86400秒 ；
    second = second % 86400;//余数代表剩下的秒数；
    var hour = Math.floor(second / 3600);//整数部分代表小时；
    second %= 3600; //余数代表 剩下的秒数；
    var minute = Math.floor(second / 60);
    second %= 60;
    // var str = tow(day) + '<span class="time">天</span>'
    //     + tow(hour) + '<span class="time">小时</span>'
    //     + tow(minute) + '<span class="time">分钟</span>'
    //     + tow(second) + '<span class="time">秒</span>';
    //  "<font size=5px><b>这个人很无聊</b></font>" 
    var str = tow(hour) + '<span class="time" style="color: #ef475d;">小时</span>'
        + tow(minute) + '<span class="time" style="color: #fdb933;">分钟</span>'
        + tow(second) + '<span class="time" style="color: #a3cf62;">秒</span>';
    oSpan.innerHTML = '<span class="time" style="font-family: 华文中宋; font-size: 20px; font-weight: bold;">哼哧哼哧建设小站中</span>'
	//+'<p> </p><span class="time" style="font-family: 华文中宋; font-size: 18px; font-weight: bold;">Twikoo评论功能出了点bug，需要魔法上网使用哦</span>'
	+'<p> </p><span class="time" style="font-family: 华文中宋; font-size: 14px; font-weight: bold;">有问题欢迎加QQ 2754014776 讨论~</span>'+"<p> </p>您已浏览网页" + str
	+'<p> </p><span class="time" style="font-family: 华文中宋; font-size: 14px; font-weight: bold;">《生活与我》</span>'
	+'<img src="/img/lifeAndMe.gif" style="zoom: 36%;">';
}, 1000)


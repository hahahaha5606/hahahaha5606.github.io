const data = [
    { name: '*向前', money: '5.00', date: '2024/01/16'},
    { name: '*kkk', money: '1.00', date: '2024/01/16'},
    { name: '*风一样', money: '1.66', date: '2024/01/15'},
    { name: '*光', money: '6.00', date: '2023/12/30'},
];

(function(){
    const rewardDom = document.getElementById('reward');
    var html = '';
    for(var i = 0; i < data.length; i++) {
        html += `<div class="reward-item-content">
        <div class="reward-item-name">${data[i].name}</div>
        <div class="reward-item-time">
            <div class="reward-item-money">￥${data[i].money}</div>
            <div>${data[i].date}</div>
        </div>
        </div>`;
    };
    rewardDom.innerHTML = html;
})();
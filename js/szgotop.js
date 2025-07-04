$(function() {
    // 创建返回顶部按钮
    var backToTopBtn = $('<div class="back-to-top faa-float animated"></div>');
    $('body').append(backToTopBtn);

    // 监听滚动事件
    $(window).scroll(function() {
        var scroHei = $(window).scrollTop(); // 滚动的高度
        if (scroHei > 500) {
            $('.back-to-top').addClass('cd-is-visible');
        } else {                                                
            $('.back-to-top').removeClass('cd-is-visible');
        }
    });

    // 点击返回顶部
    $('.back-to-top').click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 600);
    });
});



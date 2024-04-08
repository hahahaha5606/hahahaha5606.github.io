// Place the target emoji in a random spot

$(document).ready(function() {
    var docHeight = $(document).height(),
        docWidth = $(document).width(),
        $div = $('#theemoji'),
        divWidth = $div.width(),
        divHeight = $div.height(),
        heightMax = docHeight - divHeight,
        widthMax = docWidth - divWidth;

    $div.css({
        left: Math.floor( Math.random() * widthMax ),
        top: Math.floor( Math.random() * heightMax )
    });
	
});

// Tooltip

$(document).ready(function() {

$('#my-tooltip').tooltipster({
	content: $("<p>Find the only emoji that doesn't move. Click it to level up!</p><p class='credits'>Made by <a href='http://brockkenzler.com/' target='_blank'>Brock Kenzler</a>. Animated with <a href='https://github.com/motyar/firefly' target='_blank'>Firefly</a>. Images from <a href='http://www.reddit.com/r/earthporn' target='_blank'>r/earthporn</a>.</p>"),
	animation: 'swing',
   	delay: 200,
   	theme: 'tooltipster-default',
   	touchDevices: true,
   	trigger: 'hover',
	interactive: true,
	position: 'slide'
}); 

});
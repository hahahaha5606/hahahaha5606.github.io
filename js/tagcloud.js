 function addLoadEvent(func) {
     var oldonload = window.onload;
     if (typeof window.onload != 'function') {
         window.onload = func;
     } else {
         window.onload = function() {
             oldonload();
             func();
         }
     }
 }

 addLoadEvent(function() {
     console.log('tag cloud plugin rock and roll!');
	 
	 //{textColour: 'red', outlineColour: '#0000ff', reverse: true, depth: 0.8, maxSpeed: 0.07, initial: [0.1, -0.1], decel: 0.95, shadow: '#000', shadowBlur: 3, weight: true, weightMode: 'both', weightFrom: 'data-weight', shape: 'vring'}
     try {
         /*TagCanvas.textFont = 'Helvetica';
         TagCanvas.textColour = '#333';
         TagCanvas.textHeight = 15;
         TagCanvas.outlineColour = '#E2E1C1';
         TagCanvas.maxSpeed = 0.03;
         TagCanvas.freezeActive = true;
         TagCanvas.outlineMethod = 'block';
         TagCanvas.minBrightness = 0.2;
         TagCanvas.depth = 0.92;
         TagCanvas.pulsateTo = 0.6;
         TagCanvas.initial = [0.1,-0.1];
         TagCanvas.decel = 0.98;
         TagCanvas.reverse = true;
         TagCanvas.hideTags = false;
         TagCanvas.shadow = '#ccf';
         TagCanvas.shadowBlur = 3;
         TagCanvas.weight = true;
         TagCanvas.weightMode = 'both';
         TagCanvas.imageScale = null;
         TagCanvas.fadeIn = 1000;
         TagCanvas.clickToFront = 600;
         TagCanvas.lock = false;
         TagCanvas.Start('resCanvas');
         TagCanvas.tc['resCanvas'].Wheel(true)*/
     
		TagCanvas.textFont = "'Roboto', sans-serif"; // 使用无衬线字体增加现代感
		TagCanvas.textColour = '#ffffff'; // 白色文字在大多数背景下都清晰可见
		TagCanvas.textHeight = 18; // 稍微增大字体大小以提高可读性
		TagCanvas.outlineColour = 'rgba(255, 255, 255, 0.3)'; // 半透明白色边框，给标签添加柔和的边缘
		TagCanvas.maxSpeed = 0.02; // 减慢最大速度，使得动画更加平滑
		TagCanvas.freezeActive = true;
		TagCanvas.outlineMethod = 'outline'; // 改为'outline'来突出显示选中的标签
		TagCanvas.minBrightness = 0.6; // 提高最低亮度，确保所有标签都能清楚地看到
		TagCanvas.depth = 0.75; // 减少深度值可以让词云显得不那么扁平化
		TagCanvas.pulsateTo = 0.9; // 增加脉冲到的最大透明度，使其更加明显
		TagCanvas.initial = [0, 0]; // 开始时保持静止
		TagCanvas.decel = 0.99; // 提高减速系数，让动画更加流畅自然
		TagCanvas.reverse = false; // 根据需要决定是否反转旋转方向
		TagCanvas.hideTags = false;
		TagCanvas.shadow = 'rgba(0, 0, 0, 0.2)'; // 给标签添加淡淡的阴影，增强立体感
		TagCanvas.shadowBlur = 5; // 增大模糊半径，使阴影效果更柔和
		TagCanvas.weight = true;
		TagCanvas.weightMode = 'size'; // 只根据权重改变大小，这样可以更直观地表示重要性
		TagCanvas.imageScale = 1.5; // 如果使用图片，适当放大它们的比例
		TagCanvas.fadeIn = 2000; // 延长淡入时间，创造出更加优雅的效果
		TagCanvas.clickToFront = 800; // 增加点击至前的时间，使得动画更加顺滑
		TagCanvas.lock = false;

		// 启动
		TagCanvas.Start('resCanvas');
		TagCanvas.tc['resCanvas'].Wheel(true)


     } catch(e) {
         console.log(e);
         document.getElementById('myCanvasContainer').style.display = 'none';
     }
 });
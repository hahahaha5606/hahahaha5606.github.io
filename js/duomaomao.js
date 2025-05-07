 var randomNum = function(minNum, maxNum) {
            switch(arguments.length){
                case 1:
                    return parseInt(Math.random() * minNum + 1, 10);
                    break;
                case 2:
                    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                    break;
                default:
                    return 0;
                    break;
            }
        }
        var duoMaomao = function () {
            var maomao = $('#maomao');
            maomao.css('bottom', randomNum(5, 80) + 'vh');
        }
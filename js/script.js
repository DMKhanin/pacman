$(document).ready(function () {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var positionX = 400;
    var positionY = 300;
    var animation = 0;
    var rotation = 0;

    function game() {
        ctx.clearRect(0, 0, 800, 600);
        if (animation >=0 && animation <= 8) {
            switch (rotation) {
                case 0: drawPackman(ctx, positionX, positionY, 20, (Math.PI) / 6, 5.7); break;
                case 90: break;
                case 180: drawPackman(ctx, positionX, positionY, 20, (Math.PI * 7) / 6, 9); break;
                case 270: break;
            }
            animation++;
        }
        if (animation >= 8 && animation <=16) {
            
            drawPackman(ctx, positionX, positionY, 20, (Math.PI * 7) / 6, 10);
            animation++
            if (animation == 16) {
                animation = 0;
            };
        }
        switch (rotation) {
            case 0: positionX+=4; break;
            case 90: break;
            case 180: positionX-=4; break;
            case 270: break;
        }
        if (positionX==20){
            rotation = 0;
        }
        if (positionX==780){
            rotation = 180;
        }
    }
    /* Функция отрисовка пакмэна
    Вход: [1] - Контекст канваса
          [2] - позиция центра по x
          [3] - позиция центра по y
          [4] - радиус
          [5] - откуда начать окружность
          [6] - где закончить окружность
     */
    function drawPackman(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
        ctx.fillStyle = "Yellow"; //цвет заливки
        ctx.beginPath(); //начинаем рисование
        ctx.moveTo(centerX, centerY); //перемещаемся в позицию
        ctx.arc(centerX, centerY, radius, startAngle, endAngle); //рисуем круг
        ctx.closePath(); // завершаем рисование
        ctx.fill(); //заливаем
    }


    setInterval(game, 1000 / 15);


})
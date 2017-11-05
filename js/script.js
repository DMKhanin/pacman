$(document).ready(function () {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var animation = 0;
    document.addEventListener("keydown",control);
    var packman = {
        positionX: 400,
        positionY: 300,
        rotation: 0
    };

    function control() {
        switch (String.fromCharCode(event.keyCode)) {
            case "A":
                packman.rotation = 180;
                break;
            case "W":
                packman.rotation = 270;
                break;
            case "D":
                packman.rotation = 0;
                break;
            case "S":
                packman.rotation = 90;
                break;
        }
    }
    function game() {
        ctx.clearRect(0, 0, 800, 600);
        if (animation >= 0 && animation <= 8) {
            switch (packman.rotation) {
                case 0: drawPackman(ctx, packman.positionX, packman.positionY, 20, (Math.PI) / 6, 5.7); break;
                case 90: drawPackman(ctx, packman.positionX, packman.positionY, 20, (Math.PI*2) / 3, 7.3); break;
                case 180: drawPackman(ctx, packman.positionX, packman.positionY, 20, (Math.PI * 7) / 6, 9); break;
                case 270: drawPackman(ctx, packman.positionX, packman.positionY, 20, (Math.PI*5) / 3, 10.5); break;
                default: break;
            }
            animation++;
        }
        if (animation >= 8 && animation <= 16) {

            drawPackman(ctx, packman.positionX, packman.positionY, 20, (Math.PI * 7) / 6, 10);
            animation++
            if (animation == 16) {
                animation = 0;
            };
        }
        switch (packman.rotation) {
            case 0: packman.positionX += 4; break;
            case 90: packman.positionY +=4; break;
            case 180: packman.positionX -= 4; break;
            case 270: packman.positionY -=4; break;
            default: break;
        }
        if (packman.positionX == 20) {
            packman.rotation = 0;
        }
        if (packman.positionX == 780) {
            packman.rotation = 180;
        }
        if (packman.positionY == 20) {
            packman.rotation = 90;
        }
        if (packman.positionY == 580) {
            packman.rotation = 270;
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

    $("#hide").click(function(){
        document.getElementById("help").style.display = "none";
    });

})
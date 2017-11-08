$(document).ready(function () {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var animation = 0;
    document.addEventListener("keydown", control);
    var next_ind_x=2;
    var next_ind_y=6;
    var save_position_x = 30;
    var save_position_y = 110;
    var q;
    var e=0;
    var packman = {
        positionX: 30, //        позиция по X
        positionY: 110, //       позиция по y
        rotation: 0, //          направление вправо 
        currentIndX: 1, //       текущий индекс по x
        currentIndY: 5, //       текущий индекс по y
        speed: 4, //             скорость
        save_position_x:30, //   предъидущая позиция по x
        save_position_y: 110,//  предъидущая позиция по x
        lives: 3,
        score: 0
    };
    var timer = {
        s: 0,
        m: 0,
        h: 0,
    }
    //1 - стена
    //2 - точка
    var map = [ //15 20 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 20  0
        [1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1], // 40  1
        [1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1], // 60  2
        [1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1], // 80  3
        [1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 1, 1, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1], //100  4
        [1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1], //120  5
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1, 1, 1, 1, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], //140  6
        [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1], //160  7
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], //180  8
        [1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 2, 1], //200  9
        [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 2, 1], //220 10
        [1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 2, 1], //240 11
        [1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1], //260 12
        [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1], //280 13
        [0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0], //300 14
        [0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0], //320 15
        [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1], //340 16
        [1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1], //360 17
        [1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 2, 1], //380 18
        [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 2, 1], //400 19
        [1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 2, 1], //420 20
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], //440 21
        [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1], //460 22
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1, 1, 1, 1, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], //480 23
        [1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1], //120  5
        [1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 1, 1, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1], //520 25
        [1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1], //120  5
        [1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1], //560 27
        [1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1], //120  5
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]  //600 29
    ];
     /* Объявление пакэмена*/
     /* Функция управления персонажем
        проверяется нажатие клавиши
        изменяется направление игрока в зависимости от нажатой клавиши
     */
    function changeTImer(){
        timer.s++
        if (timer.s==60){
            timer.s-=60;
            timer.m++;
        }
        if (timer.m==60){
            timer.m-=60;
            timer.h++;
        }
        document.getElementById("p_timer").innerText =timer.h +"H, " + timer.m + "M, " + timer.s + "S";  
    }
    function control() {
        switch (String.fromCharCode(event.keyCode)) {
            case "A": 
                packman.rotation = 180; //  влево
                packman.positionX = packman.currentIndX*20+10;
                packman.positionY = packman.currentIndY*20+10;
                if(map[packman.currentIndY][packman.currentIndX-1]==1){packman.lives--;}
                break;
            case "W":
                packman.rotation = 270; //  вверх
                packman.positionX = packman.currentIndX*20+10;
                packman.positionY = packman.currentIndY*20+10;
                if(map[packman.currentIndY-1][packman.currentIndX]==1){packman.lives--;}
                break;
            case "D":
                packman.rotation = 0; //    вправо
                packman.positionX = packman.currentIndX*20+10;
                packman.positionY = packman.currentIndY*20+10;
                if(map[packman.currentIndY][packman.currentIndX+1]==1){packman.lives--;}
                break;
            case "S":
                packman.rotation = 90; //   вниз
                packman.positionX = packman.currentIndX*20+10;
                packman.positionY = packman.currentIndY*20+10;
                if(map[packman.currentIndY+1][packman.currentIndX]==1){packman.lives--;}
                break;
        }
        document.getElementById("p_lives").innerText = "Lives = " + packman.lives;
    }
     /* Функция отрисовки карты
        рисуется карта из массива
     */
    function drawMap() {
        for (var i = 0; i < 30; i++) {
            for (var j = 0; j < 40; j++) {
                if (map[i][j] == 1) {
                    ctx.fillStyle = "Blue"; //цвет заливки
                    ctx.beginPath(); //начинаем рисование
                    ctx.fillRect(j * 20, i * 20, 20, 20);
                    ctx.closePath(); // завершаем рисование
                    ctx.fill(); //заливаем
                }
                if (map[i][j] == 2) {
                    ctx.fillStyle = "White"; //цвет заливки
                    ctx.beginPath(); //начинаем рисование
                    ctx.arc(j * 20 + 10, i * 20 + 10, 5, 0, 10); //рисуем круг
                    ctx.closePath(); // завершаем рисование
                    ctx.fill(); //заливаем
                }
            }
        }

    }
    /* Функция движения
        проверяется отсутстиве стены в зависимости от направления
        изменение текущей позиции в массиве
        проверка наличия монетки на текущей позиции
        выбираем направлеие
            если позиция пакмэна изменилась на 20 переприсваеваем его позицию в следующий элемент
            если на следующем индексе массива находится стена тогда останавливаем
        если на текущей позиции есть монетка добавляем монетку к счётчику и удаляем монетку
     */
    function move(){
        switch (packman.rotation){
            case 0: 
            if (packman.positionX-20 == packman.save_position_x){
                 packman.currentIndX +=1; packman.save_position_x = packman.positionX
                }; 
            if(map[packman.currentIndY][packman.currentIndX+1]==0 || map[packman.currentIndY][packman.currentIndX+1]==2) {
                packman.speed = 4;
            } else {
                packman.speed=0;
               
            };
            break;
            case 180: 
            if (packman.positionX+20 == packman.save_position_x){
                 packman.currentIndX -=1; packman.save_position_x = packman.positionX
                };
            if(map[packman.currentIndY][packman.currentIndX-1]==0 || map[packman.currentIndY][packman.currentIndX-1]==2) {
                     packman.speed = 4;
                    }else {
                        packman.speed=0;
                        document.getElementById("p_lives").innerText = "Lives = " + packman.lives;
                    }; 
           break;
            case 90:
            if (packman.positionY-20 == packman.save_position_y){
                packman.currentIndY +=1; packman.save_position_y = packman.positionY
               };
           if(map[packman.currentIndY+1][packman.currentIndX]==0 || map[packman.currentIndY+1][packman.currentIndX]==2) {
                       packman.speed = 4;
                   }else {
                       packman.speed=0; 
                   }; 
            break;
            case 270:
            if (packman.positionY+20 == packman.save_position_y){
                packman.currentIndY -=1; packman.save_position_y = packman.positionY
               };
            if(map[packman.currentIndY-1][packman.currentIndX]==0 || map[packman.currentIndY-1][packman.currentIndX]==2) {
                packman.speed = 4;
            }else {
                packman.speed=0;       
            }; 
            break;
            
        }
        if (map[packman.currentIndY][packman.currentIndX]==2) {
            packman.score++;
            document.getElementById("p_score").innerText = "Score = " + packman.score;
            console.log(packman.score);
            map[packman.currentIndY][packman.currentIndX]=0;
        }
    }
     /* Функция игры
        проверяется кадр анимации отрисовывается карта и пакмэн
     */
    function game() {
        if (packman.lives<=0){
            document.getElementById("canvas").style.display = "none";
            document.getElementById("modal-loose").style.display = "block";
        };
        ctx.clearRect(0, 0, 800, 600);
        drawMap();
        move();
        if (animation >= 0 && animation <= 8) {
            switch (packman.rotation) {
                case 0: drawPackman(ctx, packman.positionX, packman.positionY, 10, (Math.PI) / 6, 5.7); break;
                case 90: drawPackman(ctx, packman.positionX, packman.positionY, 10, (Math.PI * 2) / 3, 7.3); break;
                case 180: drawPackman(ctx, packman.positionX, packman.positionY, 10, (Math.PI * 7) / 6, 9); break;
                case 270: drawPackman(ctx, packman.positionX, packman.positionY, 10, (Math.PI * 5) / 3, 10.5); break;
                default: break;
            }
            animation++;
        }
        if (animation >= 8 && animation <= 16) {
            drawPackman(ctx, packman.positionX, packman.positionY, 10, (Math.PI * 7) / 6, 10);
            animation++
            if (animation == 16) {
                animation = 0;
            };
        }
        switch (packman.rotation) {
            case 0: packman.positionX += packman.speed; break;
            case 90: packman.positionY += packman.speed; break;
            case 180: packman.positionX -= packman.speed; break;
            case 270: packman.positionY -= packman.speed; break;
            default: break;
        }
        if (packman.positionX <= 20) {
            packman.rotation = 0;
        }
        if (packman.positionX >= 780) {
            packman.rotation = 180;
        }
        if (packman.positionY <= 20) {
            packman.rotation = 90;
        }
        if (packman.positionY >= 580) {
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

    $("#hide").click(function () {
        document.getElementById("help").style.display = "none";
    });
    $("#start").click(function () {
        document.getElementById("modal").style.display = "none";
        document.getElementById("canvas").style.display = "block";
        setInterval(game, 60);
        setInterval(changeTImer, 1000);
    });
    $("#restart").click(function () {
        document.getElementById("canvas").style.display = "none";
        window.location.reload(true);
    });

})

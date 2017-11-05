$(document).ready(function(){
   var canvas = document.getElementById("canvas");
   var ctx = canvas.getContext("2d");

   /* Функция отрисовка пакмэна
   Вход: [1] - Контекст канваса
         [2] - позиция центра по x
         [3] - позиция центра по y
         [4] - радиус
         [5] - уткуда начать окружность
         [6] - где закончить окружность
    */
   function drawPackman(ctx,centerX, centerY, radius, startAngle, endAngle, color ){ 
        ctx.fillStyle = "Yellow"; //цвет заливки
        ctx.beginPath(); //начинаем рисование
        ctx.moveTo(centerX,centerY); //перемещаемся в позицию
        ctx.arc(centerX, centerY, radius, startAngle, endAngle); //рисуем круг
        ctx.closePath(); // завершаем рисование
        ctx.fill(); //заливаем
   }

   drawPackman(ctx, 300, 300, 20 , (Math.PI*7)/6 , 9); 

})
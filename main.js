var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
/*  
var size = {0:'1',1:'2',2:'3',3:'4',4:'5',length:5}
var index = 0
    sl = document.createElement('select')
    body.appendChild(sl)
    sl.name = 'sl'
    sl.id = 'sl'

    while (index < size['length']) {
        opt = document.createElement('option')
        sl.appendChild(opt)
        opt.id = 'size'
        opt.value = size[index]
        opt.textContent = size[index]
        index = index + 1
    }
*/

/**********************创建颜色控制栏*************************/
var colours = {0:'black',1:'blue',2:'green',3:'yellow',4:'red',5:'orange',length:6};
var key = 0;
while (key < colours['length']) {
    color = document.createElement('div')
    colour.appendChild(color)
    if (key === 0) {
        color.className = colours[key] + ' act'
    }else{
    color.className = colours[key]
    }
    color.id = colours[key]
    color.style = 'background: '+ colours[key]
    key = key + 1
}

/**********************初始化值*************************/
var radius = 5;
var linewidth = radius*2;
var click = false;
var 初始坐标 = {"x":undefined, "y":undefined}

    
/***************监听橡皮擦******************************/
var useeraser = false
eraser.onclick = function(){
    useeraser = true
    eraser.classList.add('action')
    brush.classList.remove('action')
}
brush.onclick = function(){
    useeraser = false
    brush.classList.add('action')
    eraser.classList.remove('action')
}

/***************监听颜色******************************/
black.onclick = function(){
    context.strokeStyle = 'black'
    context.fillStyle = 'black'
    black.classList.add('act')
    blue.classList.remove('act')
    green.classList.remove('act')
    yellow.classList.remove('act')
    red.classList.remove('act')
    orange.classList.remove('act')
}
blue.onclick = function(){
    context.strokeStyle = 'blue'
    context.fillStyle = 'blue'
    black.classList.remove('act')
    blue.classList.add('act')
    green.classList.remove('act')
    yellow.classList.remove('act')
    red.classList.remove('act')
    orange.classList.remove('act')
}
green.onclick = function(){
    context.strokeStyle = 'green'
    context.fillStyle = 'green'
    black.classList.remove('act')
    blue.classList.remove('act')
    green.classList.add('act')
    yellow.classList.remove('act')        
    red.classList.remove('act')
    orange.classList.remove('act')
}
yellow.onclick = function(){
    context.strokeStyle = 'yellow'
    context.fillStyle = 'yellow'
    black.classList.remove('act')
    blue.classList.remove('act')
    green.classList.remove('act')
    yellow.classList.add('act')
    red.classList.remove('act')
    orange.classList.remove('act')
}
red.onclick = function(){
    context.strokeStyle = 'red'
    context.fillStyle = 'red'
    black.classList.remove('act')
    blue.classList.remove('act')
    green.classList.remove('act')
    yellow.classList.remove('act')
    red.classList.add('act')
    orange.classList.remove('act')
}
orange.onclick = function(){
    context.strokeStyle = 'orange'
    context.fillStyle = 'orange'
    black.classList.remove('act')
    blue.classList.remove('act')
    green.classList.remove('act')
    yellow.classList.remove('act')
    red.classList.remove('act')
    orange.classList.add('act')
}

/****************调整窗口大小**************/
setcanvassize(canvas);

window.onresize = function() {
    setcanvassize(canvas)
}

/**********************监听用户动作*************************/
if (document.body.ontouchstart !== undefined) {
    canvas.ontouchstart = function(touch){
        click = true
        var x = touch.touches[0].clientX
        var y = touch.touches[0].clientY
        初始坐标 = {"X":x,"Y":y}
        if (useeraser) {
            context.clearRect(x-radius,y-radius,linewidth,linewidth);}
        else{
            doarc(x,y,radius);}
        }
    canvas.ontouchmove = function(touch){
        if (click) {
            var x = touch.touches[0].clientX
            var y = touch.touches[0].clientY
            var 新坐标 = {"X":x,"Y":y}
            if (useeraser) {
                context.clearRect(x-radius,y-radius,linewidth,linewidth);}
            else{
                doarc(x,y,radius);
                doline(初始坐标.X,初始坐标.Y,新坐标.X,新坐标.Y,linewidth);
            }
            初始坐标 = 新坐标
        }
    }
    canvas.ontouchend = function(touch){
        click = false
    }
}
else{
    canvas.onmousedown = function(mouse) {
        click = true
        var x = mouse.clientX
        var y = mouse.clientY
        初始坐标 = {"X":x,"Y":y}
        if (useeraser) {
            context.clearRect(x-radius,y-radius,linewidth,linewidth);}
        else{
            doarc(x,y,radius);}
    }
    canvas.onmousemove = function(mouse){
        if (click) {
            var x = mouse.clientX
            var y = mouse.clientY
            var 新坐标 = {"X":x,"Y":y}
            if (useeraser) {
                context.clearRect(x-radius,y-radius,linewidth,linewidth);}
            else{
                doarc(x,y,radius);
                doline(初始坐标.X,初始坐标.Y,新坐标.X,新坐标.Y,linewidth);
            }
        初始坐标 = 新坐标
        }
    }
    canvas.onmouseup = function(mouse){
        click = false
    }
}

/************函数************/
function setcanvassize(canvas) {
    var height = document.documentElement.clientHeight;
    var width = document.documentElement.clientWidth;
    canvas.height = height;
    canvas.width = width;
}
    
function doarc(x,y,radius) {
    context.beginPath()
    context.arc(x,y,radius,0,Math.PI*2,)
    context.fill()
}

function doline(x1,y1,x2,y2,lineWidth){
    context.beginPath()
    context.lineWidth = lineWidth;
    context.moveTo(x1, y1); //起点
    context.lineTo(x2, y2); //终点
    context.stroke()
    context.closePath()
}

    
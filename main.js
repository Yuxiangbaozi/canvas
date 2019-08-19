var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

/**********************初始化值*************************/
var obj = {
    set current(value) {
        this.radius = value
        this.lineWidth = value*2
        this.lineWidth2 = this.lineWidth + 10
        this.radius2 = this.lineWidth2/2
    },
    radius: 1,
    lineWidth: 2,
    lineWidth2: 12,
    radius2: 6
}
var click = false;
var 初始坐标 = {"x":undefined, "y":undefined}

/**********************创建笔画大小控制栏*************************/


var buts = document.querySelectorAll('.button>button')
buts.forEach((but)=> {
    but.addEventListener('click' , (cl)=> {
        let children = cl.target.parentElement.childNodes
        children.forEach((child)=> {
            child.classList.remove('active')
        })
        obj.current = parseInt(cl.target.innerText) 
        cl.target.classList.add('active')
    })
})

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



/***************监听重置******************************/
clear.onclick = function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

/***************监听下载******************************/
download.onclick = function(){
    let download = canvas.toDataURL('image/png')
    let a = document.createElement('a')
    document.body.appendChild(a)
    a.href = download
    a.download = 'my picture'
    a.click()
}

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
        let x = touch.touches[0].clientX
        let y = touch.touches[0].clientY
        初始坐标 = {"X":x,"Y":y}
        if (useeraser) {
            context.clearRect(x-obj.radius2,y-obj.radius2,obj.lineWidth2,obj.lineWidth2);}
        else{
            doarc(x,y,obj.radius);}
        }
    canvas.ontouchmove = function(touch){
        if (click) {
            let x = touch.touches[0].clientX
            let y = touch.touches[0].clientY
            let 新坐标 = {"X":x,"Y":y}
            if (useeraser) {
                context.clearRect(x-obj.radius2,y-pbj.radius2,obj.lineWidth2,obj.lineWidth2);}
            else{
                doarc(x,y,obj.radius);
                doline(初始坐标.X,初始坐标.Y,新坐标.X,新坐标.Y,obj.lineWidth);
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
        let x = mouse.clientX
        let y = mouse.clientY
        初始坐标 = {"X":x,"Y":y}
        if (useeraser) {
            context.clearRect(x-obj.radius2,y-obj.radius2,obj.lineWidth2,obj.lineWidth2);}
        else{
            doarc(x,y,obj.radius);}
    }
    canvas.onmousemove = function(mouse){
        if (click) {
            let x = mouse.clientX
            let y = mouse.clientY
            let 新坐标 = {"X":x,"Y":y}
            if (useeraser) {
                context.clearRect(x-obj.radius2,y-obj.radius2,obj.lineWidth2,obj.lineWidth2);}
            else{
                doarc(x,y,obj.radius);
                doline(初始坐标.X,初始坐标.Y,新坐标.X,新坐标.Y,obj.lineWidth);
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
    let height = document.documentElement.clientHeight;
    let width = document.documentElement.clientWidth;
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

    
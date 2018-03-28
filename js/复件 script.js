var data = [
    {
         title : "H5",
         author : '张',
         time : "2018-03-03"
     },
     {
         title : "CSS3",
         author : '张',
         time : "2018-03-03"
     },
     {
         title : "JS",
         author : '张',
         time : "2018-03-03"
     },
     {
         title : "VUE",
         author : '张',
         time : "2018-03-03"
     }
];
// var rotateX = 0, rotateY = 0, dx = 0, dy = 0;
function Magic(){
    this.listNum = 125;
    this.oList = document.getElementById('list');
    this.oUl = this.oList.getElementsByTagName('ul')[0];
    this.aLi = this.oUl.getElementsByTagName('li');
    this.aBtn = document.getElementById('btn').getElementsByTagName('li');
}
Magic.prototype = {
    init : function(){
        for(var i = 0; i < this.listNum; i++){
            var oLi = document.createElement('li');
            var d = data[~~(Math.random() * 4)];
            oLi.innerHTML = `
                <b class="liCover"></b>
                <p class="liTitle">${d.title}</p>
                <p class="liAuthor">${d.author}</p>
                <p class="liTime">${d.time}</p>
            `;
            // li初始随机位置
            var rX = Math.random() * 6000 - 3000;
            var rY = Math.random() * 6000 - 3000;
            var rZ = Math.random() * 6000 - 3000;
            oLi.style.transform = `translate3D(${rX}px, ${rY}px, ${rZ}px)`;
            this.oUl.appendChild(oLi);
        }
        this.timer1 = setTimeout(function(){
            this.grid()
        }.bind(this), 200);
        this.clickEvent();
    },
    grid : function(){
        if(this.grid.arr){
            for(var i = 0; i < this.listNum; i++){
                this.aLi[i].style.transform = this.grid.arr[i];
            }
        } else {
            this.grid.arr = [];
            // 每个li xyz三个方向的间距
            var disX = 350;
            var disY = 350;
            var disZ = 800;
            for(var i = 0; i < this.listNum; i++){
                this.aLi.x = i % 5;
                this.aLi.y = ~~(i % 25 / 5);
                this.aLi.z = 4 - ~~(i / 25);
                var x = (this.aLi.x - 2) * disX;
                var y= (this.aLi.y- 2) * disY;
                var z = (this.aLi.z - 2) * disZ;
                var val = `translate3D(${x}px, ${y}px, ${z}px)`;
                this.grid.arr[i] = val;
                this.aLi[i].style.transform = val
            }
        }
    },
    helix : function(){
        if(this.helix.arr){
            for(var i = 0; i < this.listNum; i++){
                this.aLi[i].style.transform = this.helix.arr[i];
            }
        } else {
            this.helix.arr = [];
            var h = 3.7;// 层数
            var num = this.listNum / h;// 每层个数
            var deg = 360 / num;
            var dh = 7;// 每个li高度差
            var mid = ~~(this.listNum / 2);
            for(var i = 0 ; i < this.listNum; i++){
                var val = `rotateY(${i * deg}deg) translateY(${(i - mid) * dh}px) translateZ(800px)`;
                this.helix.arr[i] = val;
                this.aLi[i].style.transform = val;
            }
        }
    },
    sphere : function(){

    },
    reset : function(){
        this.reset.isClick = true
        // this.timer && clearInterval(this.timer);
        this.oUl.style.transform = 'translateZ(-2000px)'
    },
    clickEvent : function(){
        // 按钮效果切换 数组映射
        var arr = [this.grid, this.helix, this.sphere, this.reset];
        for(var i = 0; i < this.aBtn.length; i++){
            this.aBtn[i].onclick = arr[i].bind(this);
        }
        // 页面旋转事件
        var nowX, nowY, lastX, lastY, timer;
        var rotateX = 0, rotateY = 0, dx = 0, dy = 0;
        var oUl = this.oUl;
        var _this = this;
        this.oList.onmousedown = function(e){
            timer && clearInterval(timer);
            lastX = e.clientX;
            lastY = e.clientY;
            this.onmousemove = function(e){
                nowX = e.clientX;
                nowY = e.clientY;
                dx = nowX - lastX;
                dy = nowY - lastY;
                rotateY += dx * 0.2;
                rotateX -= dy * 0.1;
                oUl.style.transform = `translateZ(-2000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                lastX = nowX;
                lastY = nowY;
            }
            this.onmouseup = function(){
                this.onmousemove = null;
                //松开之后有惯性
                timer = setInterval(function(){
                    // dx *= 0.95;
                    // dy *= 0.95;
                    // rotateY += dx * 0.2;
                    // rotateX -= dy * 0.1;
                    // oUl.style.transform = `translateZ(-2000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                    // if(Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1){
                    //     clearInterval(timer);
                    //     timer = null;
                    // }
                    if(!_this.reset.isClick){
                        dx *= 0.95;
                        dy *= 0.95;
                        rotateY += dx * 0.2;
                        rotateX -= dy * 0.1;
                        oUl.style.transform = `translateZ(-2000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                        if(Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1){
                            clearInterval(timer);
                            timer = null;
                        }
                    }
                }, 1000/60);
            }
        }
    }
}

var magic = new Magic();
magic.init();

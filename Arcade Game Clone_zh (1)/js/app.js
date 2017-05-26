// 这是我们的玩家要躲避的敌人 
var Enemy = function(x,y,speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x=x;
    this.y=y;
    this.speed=Math.random()*300;
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};


// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += this.speed*dt;
    //bug从右边消失，从左边循环出现
    if (this.x>=505) {
    this.x=-50;
    };
};


// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player=function(x,y){
    this.x=x;
    this.y=y;
    this.sprite='images/char-boy.png';
};


var count=0;
Player.prototype.update=function(){
    player.checkCollisions();
    if (this.y===-13) {
        count++;
        if (count%3 === 2) {
            alert ('YOU WIN!GET NEXT');
            this.x=202;
            this.y=83*5+50-63;//河上方有50像素的空白，player上方有63像素的空白
        }
    }
};


Player.prototype.handleInput=function(allowedKeys){
    switch(allowedKeys){
        case 'left':this.x -= 101;
        break;
        case 'right':this.x +=101;
        break;
        case 'up':this.y -=83;
        break;
        case 'down':this.y +=83;
        break;
    }

    //防止player超出画布
    if (this.x<0) {
        this.x=0;
    }else if (this.x>404) {
        this.x=404; //宽101*4
    }else if (this.y<-13) {
        this.x=202;
        this.y=402;
    }else if (this.y>83*5) {
        this.y=402; 
    };

};
Player.prototype.render=function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies=[];
for (var i = 0; i < 6; i++) {//随机产生6个enemy，每个enemy的y值不同，速度随机产生
    var enemy=new Enemy(-50,Math.floor(Math.random()*3)*83+61.5); //50-78+6.5+83
    allEnemies.push(enemy); //把实例化的enemy放到allEnemies数组中
};
var player=new Player(202,402);


//检测player和enemy在一个碰撞半径内是否碰撞
Player.prototype.checkCollisions = function(){
    for(var i=0;i<allEnemies.length;i++){
    if(Math.abs(this.x - allEnemies[i].x)<10 && Math.abs(this.y - allEnemies[i].y)<10) {
        alert ('GOTCHA!!!');
        this.x =202;
        this.y =402;
        };
    };
};


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});










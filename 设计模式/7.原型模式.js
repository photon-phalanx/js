/**
 * Created by Administrator on 2017/4/28.
 */
/*
 * 所谓原型模式，类似于原型式继承，吧重复性的东西放在原型里共享
 * 相比工厂模式，他把高消耗的部分放在原型里共享，来减少消耗
 * */

function LoopImages(imgArr, container) {
  this.imagesArray = imgArr;
  this.container = container;
}

LoopImages.prototype = {
  createImage: function () {
    console.log('created');
  }
};

function SlideLoopImg(imgArr, container) {
  LoopImages.call(this, imgArr, container);
}
SlideLoopImg.prototype = new LoopImages();

SlideLoopImg.prototype.createImage = function () {
  console.log('this function is override');
};

// 事实上，在LoopImages.call和new LoopImages上，父类做了2次，如同之前说的组合继承的问题一样，我们有以下解决方法

function getPrototype(SuperClass) {
  var F = function () {
  }
  F.prototype = SuperClass.prototype;
  return new F();
}

// 书上则用了另一种，是直接拿对象的拷贝（例子给的是浅拷贝，当然可以改成深拷贝）来创建
// prototypeExtend接受多个对象，返回这些对象合并后的浅拷贝

function prototypeExtend() {
  var F = function () {
    },
    args = arguments,
    i = 0,
    len = args.length;
  for (; i < len; i++) {
    for (var j in args[i]) {
      F.prototype[j] = args[i][j];
    }
  }
  return new F();
}
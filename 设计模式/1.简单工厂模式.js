/**
 * Created by Administrator on 2017/4/27.
 */
/*
 * 简单工厂模式的理念就是创造对象，至于如何创造，则方法不定
 * 如果类有很多的话，可以用工厂模式包装起来，这样只需要记住工厂函数，而不用记住许多的类
 * 同时，一个对象可能也可以模拟很多类，根据情况来选择如何使用
 * */

// 第一种，工厂模式封装多个类

function Football() {
  this.info = "这是足球";
}
Football.prototype.sayInfo = function () {
  console.log(this.info);
};

function Basketball() {
  this.info = "这是篮球";
}
Basketball.prototype.sayInfo = function () {
  console.log(this.info);
};

function SportFactory(name) {
  switch (name) {
    case "basketball":
      return new Basketball();
      break;
    case "football":
      return new Football();
      break;
  }
}

// 这个SportFactory隐藏了Football和Basketball类，可以用SportFactory创建具体的
var football = SportFactory("football");
football.sayInfo();


// 2.对象来模拟多个类

function createPop(type,text) {
  var o = {};
  o.content = text;
  o.show = function () {
    // something
  };


  switch (type){
    case 'alert' :
      // something
      break;
    case 'prompt' :
      // something
      break;
  }
}

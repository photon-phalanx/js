/**
 * Created by Photon_palanx on 17-5-14.
 */
/*
* 职责链模式（Chain of responsibility）
* 避免请求的发送者和接受者之间的耦合关系
* 将这个对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理他为止。
*
* */

function inheritObj(o) {
  function F() {
  }
  F.prototype = o;
  return new F();
}

function inheritPrototype(SubClass,SuperClass) {
  var p = inheritObj(SuperClass.prototype);
  p.constructor = SubClass;
  SubClass.prototype = p;
}

function Handler (successor) {
  this.successor = successor || null;
}

Handler.prototype.handle = function () {
  // 这是一个默认的handle，即自己不处理，传递给下一个
  // 如果有人要处理的话，需要重写handle方法
  if (this.successor)
    this.successor.handle();
};

function Worker (successor) {
  Handler.call(this, successor);
}
inheritPrototype(Worker, Handler);
Worker.prototype.work = function () {
  console.log('做啊做……');
  console.log('终于做好了,谁来检查啊！');
  this.handle();
};


function Manager (successor) {
  Handler.call(this, successor);
}
inheritPrototype(Manager, Handler);
Manager.prototype.handle = function () {
  console.log('我看过了,但是我还要交给boss检查');
  // 如果不在交给下个人，那么下面这句就不用了
  Handler.prototype.handle.call(this);
};

function Boss (successor) {
  Handler.call(this, successor);
}
inheritPrototype(Boss, Handler);
Boss.prototype.handle = function () {
  console.log('做的蛮好,辛苦了');
  // 这里就没有继续传递，那么处理就终止了
};

var boss = new Boss();
var manager = new Manager(boss);
var worker = new Worker(manager);
worker.work();







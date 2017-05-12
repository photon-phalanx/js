/**
 * Created by Photon_palanx on 2017/5/12.
 */
/*
 * 观察者模式又称发布-订阅者模式，定义了一种依赖关系，解决了主体对象与观察者之间的功能耦合
 * 它可以支持广播通信，通知所有订阅的对象
 * 就如同看电视，电视台播放电视，至于收看的人是谁，并不是那么关心
 * 你可以调到这个台上看，你也可以换到别的台，你可以躺着看也可以坐着看也可以录像
 * 也就是说，发布者维护订阅队列，队列是灵活动态的，也不用关心接受者的逻辑
 * 这就实现了解耦和重用
 *
 * 观察者模式还是解决js异步编程的方法之一
 * 其他还有回调，promise等方法
 * */

// 当然，可以用闭包来实现,也可以用类来实现，这里以类为例子
// 张容铭老师的javascript设计模式使用了闭包

function Observer () {
  this._messages = {};
}

Observer.prototype = {
  regist: function (type, fn) {
    if (!this._messages[type]) this._messages[type] = [fn];
    else this._messages[type].push(fn);
  },
  remove: function (type, fn) {
    if (!this._messages[type]) return;
    var len = this._messages[type].length;
    for (var i = 0; i < len; i++) {
      if (this._messages[type][i] === fn) {
        // 移除掉比iScroll的设置一个off的flag好一点吧
        this._messages[type].splice(i, 1);
      }
    }
  },
  fire: function (type, args) {
    if (!this._messages) return;
    var events = {
      type: type,
      args: args || {}
    };
    var len = this._messages[type].length;
    for (var i = 0; i < len; i++) {
      this._messages[type][i].call(this, events);
    }
  }
};

function Listener () {
}
Listener.prototype = {
  subscribe: function (publisher, type, fn) {
    if (!publisher instanceof Observer) throw new Error('第一个参数不是发布者');
    publisher.regist(type, fn);
  },
  unsubscribe: function (publisher, type, fn) {
    if (!publisher instanceof Observer) throw new Error('第一个参数不是发布者');
    publisher.remove(type, fn);
  }
};


var publisher = new Observer();
var listener1 = new Listener();
var listener2 = new Listener();
function callBack (event) {
  console.log(event.type);
  console.log('事件被listener1处理');
}
function callBack2 (event) {
  console.log(event.type);
  console.log('事件被listener2处理');
}
listener1.subscribe(publisher,'test',callBack);
listener2.subscribe(publisher,'test',callBack2);
publisher.fire('test');
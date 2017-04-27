/**
 * Created by Administrator on 2017/4/27.
 */
/*
 *  js没有传统面向对象的抽象类的容易实现方法,对于这部分内容(如工厂方法模式),我们只需参考核心思想
 *  工厂方法模式的思想是将实际创建对象工作推迟到子类中
 *  为了安全起见(忘记调用new),我们使用安全工厂模式
 *  */

function Factory(type, content) {
  if (!this instanceof Factory) {
    return new Factory(type, content);
  } else {
    return new this[type](content);
  }
}

Factory.prototype = {
  // 基类
  Java: function (content) {
    // ....
  },
  JavaScript: function (content) {
    // ....
  }

  // 共同的函数
};
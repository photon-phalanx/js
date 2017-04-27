/**
 * Created by Administrator on 2017/4/26.
 */
// 寄生式继承扩展了原型式继承，可以添加新属性和方法
// 仍然是一种原型式继承，他是对原型式继承的二次封装
function inheritObj(o) {
  function F() {
  }

  F.prototype = o;
  return new F();
}

function createBook(obj) {
  var o = inheritObj(obj); // new inheritObj ? 不需要new吧？
  o.XXX = function () {
    //添加新方法
  }
  return o;
}

// 这样的新方法依旧不能复用

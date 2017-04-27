/**
 * Created by Administrator on 2017/4/26.
 */
// 原型式继承和类式继承有点不同,但又是一种封装
// 它认为可以基于一个对象来继承
// 这种继承，对引用类型的操作是共享的
function inheritObj(o) {
  function F() {
  }

  F.prototype = o;
  return new F();
}

// 对于这个函数，最后抽象出了Object.create
// 用法: XX.prototype = Object.create(o);
// 同时，Object.create(null) 成为了创建真正干净的对象的方法

var o = {
  className: 1401,
  studentName: ['a', 'b', 'c']
};

var obj1 = inheritObj(o);
var obj2 = inheritObj(o);
obj1.studentName.push('d');
console.log(obj2.studentName[3]);

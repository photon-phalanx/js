/**
 * Created by Administrator on 2017/4/26.
 */
// 从组合继承开始吧，结合了类式继承和构造函数继承
// 纯粹的类式继承，创建超类对象给原型的时候，一般不给参数，同时因为在原型上，引用类型会共享
// 构造继承不会管原型上的东西，不利于函数复用，所以可以组合起来

//组合继承，摆脱了以上缺点，但是仍然有缺点
//首先父类被做了2次，比较浪费
//其次如果父类有写日志等副作用的话，也比较糟糕
function Person(myName, age) {
  this.name = myName;
  this.age = age;
}

Person.prototype.sayName = function () {
  return this.name;
};

Person.prototype.sayAge = function () {
  return this.age;
};

function Student(myName, age, className) {
  Person.call(this, myName, age);
  this.className = className;
}

Student.prototype = new Person();
Student.prototype.sayClassName = function () {
  return this.className;
};

var student = new Student("xt",20,'1401');
console.log(student.sayClassName());
console.log(student.sayAge());
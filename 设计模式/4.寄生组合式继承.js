/**
 * Created by Administrator on 2017/4/26.
 */
function inheritObj(o) {
    function F() {
    }
    F.prototype = o;
    return new F();
}

// 寄生组合式继承和寄生式继承完全不同.相比之下，原型继承，寄生式继承都是拿对象给prototype,但是寄生组合式继承是把构造函数和寄生式继承合在一起
// 这时候的prototype由一个现有的类来给
function inheritPrototype(SubClass,SuperClass) {
    var p = inheritObj(SuperClass.prototype);
    // 这个p是一个对象，已经完成了继承，但是他的原型少了点东西，把它补上去
    p.constructor = SubClass;
    SubClass.prototype = p;
    // 其实寄生组合式继承很常用，只是不知道名字
    // 在组合继承里，父类有一个被执行2次的问题，而在这里很明显看到，只拿了父类的prototype来产生原型对象
}

// 测试
function SuperClass(name) {
    this.name = name;
    this.colors = ["red","blue"];
}
SuperClass.prototype.getName = function () {
    return this.name;
};

function SubClass(name,time) {
    SuperClass.call(this,name);
    this.time = time;
}
inheritPrototype(SubClass,SuperClass);
SubClass.prototype.getTime = function () {
    console.log(this.time);
};

var instance1 = new SubClass("JS BOOK", 2014);
var instance2 = new SubClass("CSS BOOK", 2013);

instance1.colors.push("black");
console.log(instance1.colors);
console.log(instance2.colors);
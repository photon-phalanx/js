/**
 * Created by Photon_palanx on 17-5-15.
 */
/*
* 访问者模式很好的使用了call这个东西
* 访问者模式是表示一个作用于某个对象结构中的各元素的操作。
* 它使可以在不改变各元素的类的前提下定义作用于这些元素的新操作
*
* 通俗的说
* 访问者模式先把一些可复用的行为抽象到一个函数（对象）里，这个函数我们就称为访问者（Visitor）
* 如果另外一些对象要调用这个函数，只需要把那些对象当作参数传给这个函数
* 在js里我们经常通过call或者apply的方式传递this对象给一个Visitor函数
*
* 也就是说，可能A和B两个类都有一样的方法，可以用访问者吧A和B的方法写在里面
* 然后调用的时候只要把A和B的实例交给访问者操作就行了
* 这个时候往往会用到call和apply
* */

// 这里用书本的例子，利用访问者模式实现push和pop的操作，这时候对象就变成了一个类数组
// 当然在传入时，这个对象还是用普通的对象，而push等定义在访问者里

var Visitor = (function () {
    return {
      splice: function () {
        var args = Array.prototype.splice.call(arguments, 1);
        return Array.prototype.splice.apply(arguments[0], args);
      },
      push:function () {
        var len = arguments[0].length || 0;
        var args = this.splice(arguments, 1);
        //arguments[0].length = len + arguments.length -1; 这句没必要而且有逻辑问题吧，push和pop本身会修改长度，不需要手动
        arguments[0].length = len;
        return Array.prototype.push.apply(arguments[0], args);
      },
      pop:function () {
        return Array.prototype.pop.apply(arguments[0]);
      }
    }
  })();

var a = {}
console.log(a.length)
Visitor.push(a,1,2,4,5,7);
console.log(a.length);
console.log(Visitor.pop(a));
console.log(a.length);
/**
 * Created by Photon_palanx on 2017/5/12.
 */
/*
 * 模板方法模式是说父类中定义骨架，而子元素中实现一些特别的步骤的方法
 * 也就是说将不变的部分写在父类，可变的留给子类
 * 这和策略模式就不同了,模板方法模式允许重写父类，但一般会call这个父类的函数
 * 也就是说这个重写不是完全的重写，依然使用了父类函数的一部分
 * 这符合所说的不变的写在父类
 * */

function inheritObj (o) {
  function F () {
  }

  F.prototype = o;
  return new F();
}

function inheritPrototype (SubClass, SuperClass) {
  var p = inheritObj(SuperClass.prototype);
  p.constructor = SubClass;
  SubClass.prototype = p;
}

function MakeDrink () {
  this.boilWater();
  this.brew();
  this.addWater();
}

MakeDrink.prototype = {
  boilWater: function () {
    console.log('烧水')
  },
  brew: function () {
    throw new Error('请重写方法')
  },
  addWater: function () {
    console.log('加水冲泡了！')
  }
};

function MakeCoffee () {
  MakeDrink.call(this);
}

// 为了防止throw语句所在的函数被调用，这个继承不能是MakeCoffee.prototype = new MakeDrink()
// 因为MakeDrink的构造会调用抽象方法
inheritPrototype(MakeCoffee, MakeDrink);
MakeCoffee.prototype.brew = function () {
  console.log('磨好咖啡豆后放在滤纸上');
};


function MakeTea () {
  MakeDrink.call(this)
}

inheritPrototype(MakeTea, MakeDrink);
MakeTea.prototype.brew = function () {
  console.log('将茶叶放入杯子里');
};

var coffee = new MakeCoffee();
var tea = new MakeTea();
/**
 * Created by Administrator on 2017/4/27.
 */
/*虽说没有abstract（不能用的保留字），但是js还是可以模拟抽象类的
 * 手动抛出错误对检查错误（如忘记实现）很有用
 * */

// 这里用到了把函数看作对象的思想
function VehicleFactory(SubType, SuperType) {
  if (typeof VehicleFactory[SubType] === 'function') {
    function F() {}
    F.prototype = new VehicleFactory[SuperType]();
    SubType.constructor = SubType;
    SubType.prototype = new F();
  }else {
    throw new Error('未创建该抽象类');
  }
}

VehicleFactory.Car = function () {
  this.type = 'car';
};

VehicleFactory.Car.prototype = {
  getPrice: function () {
    throw new Error('抽象方法不能调用');
  },
  getSpeed: function () {
    throw new Error('抽象方法不能调用');
  }
};

VehicleFactory.Bus = function () {
  this.type = 'bus';
};

VehicleFactory.Bus.prototype = {
  getPrice: function () {
    throw new Error('抽象方法不能调用');
  },
  getSpeed: function () {
    throw new Error('抽象方法不能调用');
  }
};

function BMW(price,speed) {
  this.price = price;
  this.speed = speed;
}

VehicleFactory(BMW,'Car');
BMW.prototype.getPrice = function () {
  return this.price;
};
BMW.prototype.getSpeed = function () {
  return this.speed;
};

var carObj = new BMW(100000,1000);
console.log(carObj.getPrice());
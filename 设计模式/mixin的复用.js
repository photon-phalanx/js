/**
 * Created by Photon_palanx on 2018/3/19.
 */
/*
 js的复用不一定要通过继承实现，也可以使用mixin的方法
 比如现在有一个圆按钮的类，她有圆的方法，也有按钮的功能方法,这时候就可以用mixin
 */

// 下面是类的形式的mixin
function extend (dest, src) {
  for (let key in src) {
    if (src.hasOwnProperty(key)) {
      dest[key] = src[key]
    }
  }
  return dest
}

let circleFns = {
  area () {
    return Math.PI * this.radius * this.radius
  }
}

let clickableFns = {
  click () {
    console.log('click!')
  }
}

function RoundButton (radius) {
  this.radius = radius
}

extend(RoundButton.prototype, clickableFns)
extend(RoundButton.prototype, circleFns)

let obj = new RoundButton(3)
console.log(obj.area())


/*
 下面是函数形式的mixin
 */

function withCircle () {
  this.area = function () {
    return Math.PI * this.radius * this.radius
  }
}

function withClick () {
  this.click = function () {
    console.log('click!')
  }
}

function RoundButton2 (radius) {
  this.radius = radius
}

withCircle.call(RoundButton2.prototype)
withClick.call(RoundButton2.prototype)

let obj2 = new RoundButton2()
obj2.click()

/*
 虽然混合的过程（XX.call)确实只需要做1次，但是如果有2个类都要用到withCircle.call()，那会发生什么呢
 看到withCircle内部，他被调用的时候，会创建一个新函数，然后赋值给this.area。而事实上这个函数其实是可以复用的
 下面考虑通过闭包复用
*/

let withCircle2= (function () {
  function area () {
    return Math.PI * this.radius * this.radius
  }
  return function () {
    this.area = area
  }
})()

// 函数式的mixin在chrome下比类式的要快一点，虽然时间波动比较大……

// 注意防止同名冲突(可以考虑设置writable)
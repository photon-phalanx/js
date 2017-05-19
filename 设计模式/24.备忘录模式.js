/**
 * Created by Photon_palanx on 2017/5/18.
 */
/*
 * 备忘录模式是说在不破坏对象的封装性的前提下，在对象外捕获并保存内部状态以便日后使用或者恢复使用
 * 关键字 不破坏封装性，也就是说这是内部的，不是对外的接口
 *
 * */

// 以缓存为例

var testMemento = (function () {
  var cache = {}
  return function (key) {
    if (cache[key]) return cache[key]
    else {
      // 模拟高耗时操作
      for (var i = 0; i <= 2000000000; i++);
      // 假设result是最后的结果
      var result = Math.random();
      cache[key] = result;
      return result;
    }
  }
})()

console.log(testMemento(5));
console.log(testMemento(5));
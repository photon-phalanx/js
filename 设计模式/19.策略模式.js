/**
 * Created by Photon_palanx on 2017/5/13.
 */
/*
* 策咯模式:讲定义的一组算法封装起来，使其相互之间可以替换，封装的算法具有一定独立性
* 和状态模式一样，策略模式解决了许多if else ，switch case的问题
* 但是不一样的是，状态模式之间是有联系的，而策略模式之间有一定独立性
* */

// 以书上的打折为例

var priceStrategy = (function () {
  var strategy = {
    return50: function (price) {
      return price - 50;
    },
    // 吧price先变成整数在做乘除来避免精度问题
    persent90: function (price) {
      return price * 100 * 90 / 100 / 100;
    }
    // 这里可以写更多的策略
  }
  return function (algorithm, price) {
    if (strategy[algorithm]) return strategy[algorithm](price);
    else return false;
  }
})();
/**
 * Created by Photon_palanx on 2017/5/24.
 */
/*
* 惰性模式，一个好东西
* 他是说，通过重写等方式，减少每次代码执行时的重复性判断
* 尽管之前的外观模式等已经吧dom操作变好看了，但是每次使用那个函数，总还是要做判断的
* 有没有办法减少判断的成本，那就是惰性模式
* 惰性模式可以一开始就使用，即加载就执行，也可以惰性执行，即第一次调用的时候执行
* */

// 现在实现一个on方法来绑定事件
A = {}
A.prototype.on = (function () {
  if (document.addEventListener) {
    return function (dom, type, fn) {
      dom.addEventListener(type,fn , false);
    }
  } else if (document.attachEvent) {
    return function (dom, type, fn) {
      dom.attachEvent('on' + type, fn);
    }
  } else {
    return function (dom, type, fn) {
      dom['on' + type] = fn;
    }
  }
})();

// 这个on方法，在加载的时候变成了符合浏览器的绑定方法
// 但是如果这个匿名自调用函数的判断非常耗时，那就会增加页面加载时间，所以我们也可以选择惰性执行

A.lazyOn = function (dom, type, fn) {
  if (document.addEventListener) {
    A.lazyOn = function (dom, type, fn) {
      dom.addEventListener(type,fn , false);
    }
  } else if (document.attachEvent) {
    A.lazyOn = function (dom, type, fn) {
      dom.attachEvent('on' + type, fn);
    }
  } else {
    A.lazyOn = function (dom, type, fn) {
      dom['on' + type] = fn;
    }
  }

  // 到此已经重写完了A.lazyOn,以后再用lazyOn就是新方法了,但是这次调用还没有执行哦,所以执行一次
  A.on(dom, type, fn);
};
/**
 * Created by Photon_palanx on 2017/5/24.
 */
/*
 * participator 参与者模式，在特定的作用域中执行给定的函数，并将参数原封不动的传递
 * 一个很常见的功能是，我们希望把额外的数据传入回调函数中
 * 但是毫无疑问，addEventListener并不想管我们
 * 于是我们自己在回调函数中动手解决吧
 *
 * 不过说实话这书上的代码和没说没什么区别………………
 *
 * */
var A = {};
A.event.on = function (dom, type, fn, data) {
  if (dom.addEventListener) {
    dom.addEventListener(type, function (e) {
      fn.call(dom, e, data)
    }, false);
  } else if (dom.attachEvent) {
    // .....
  } else {
    // dom 0级
    // .....
  }
};

// 这样做存在一个问题，就是这是一个匿名函数，所以这个事件无法移除了，这就需要参与者模式了
// 书上的参与者似乎是想用bind函数来搞
function bind (fn, context) {
  var slice = Array.prototype.slice;
  var args = slice.call(arguments, 2);
  return function () {
    var addArgs = slice.call(arguments);
    var allArgs = addArgs.concat(args);
    return fn.apply(context, allArgs);
  }
}

// 书上的polyfill并不好，还是看看文档的吧
// 解析见http://www.cnblogs.com/admos/p/4455922.html
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
      fToBind = this,
      fNOP = function () {},
      fBound = function () {
        return fToBind.apply(this instanceof fNOP && oThis
            ? this
            : oThis || window,
          aArgs.concat(Array.prototype.slice.call(arguments)));
      };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}
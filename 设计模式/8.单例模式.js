/**
 * Created by Administrator on 2017/4/29.
 */
/*
 * 单例是一个非常常见的模式了,所谓单例就是onlyOne,只产生一个实例
 * 同时,单例的别的用法还有用作命名空间
 * 其实在js里,{}出来的一个对象就是一个单例
 * */

// 普通的单例模式比较简单，写一个惰性单例的demo
// 有时候单例对象需要延迟创建，比如为了性能的需要，那么就有了惰性单例

var LazySingle = (function () {
  var _instance = null;
  function Single() {
    return {
      // 这里定义single的部分
    }
  }
  return function () {
    if(!_instance) {
      _instance = Single();
    }
    return _instance;
  }
})();

// 这个LazySingle是一个产生single对象的生成器，他是一个函数，一开始并没有生成，直到第一次调用的时候才生成
// 调用方法： LazySingle().XXXX
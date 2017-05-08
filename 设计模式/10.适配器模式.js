/**
 * Created by Administrator on 2017/5/8.
 */
/*
* 适配器模式将一个类(对象)的接口(方法，属性)转化成另一个接口
* 比如引入新库的时候，保持和旧的一致
* 这个适配包括对方法的封装，对参数的适配等
* */

// 这是对参数的适配
function doSomething(obj) {
  var _adapter = {
    name: 'XXX',
    age: 20,
    title: ''
  };
  for (var i in _adapter) {
    _adapter[i] = obj[i] || _adapter[i];
  }
  // 继续下去
}

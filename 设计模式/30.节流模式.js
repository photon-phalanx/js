/**
 * Created by Administrator on 2017/5/22.
 */
/*
* 节流模式（throttler）对重复的业务做控制，执行最后一次操作，取消其他的操作
*
* */

// 如果第一个参数是boolean 那么表示清除计时器，第二个参数为函数
// 如果第一个参数是函数，第二个参数就是函数执行的参数
function throttle() {
  var isClear = arguments[0];
  var fn;
  var params;
  if (typeof isClear === 'boolean') {
    fn = arguments[1];
    // 有计时器就清掉它
    fn.__throttleID && clearTimeout(fn.__throttleID);
  } else {
    fn = isClear;
    params = arguments[1];
    Object.assign(params, {
      context:this,
      args:[],
      time: 300
    });
    arguments.callee(true, fn);
    fn.__throttleID = setTimeout(function () {
      fn.apply(params.context, params.args);
    },params.time);
  }
}